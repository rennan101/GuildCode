/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: REALTIME SYNC SERVICE
   Gerenciamento de salas, validação de Party, Ready System e Firestore
   (Seções 4, 5, 24 e 26 de CODE_LEVELER_BOSS_BATTLE_RAIDS.md)
   ═══════════════════════════════════════════════════════════════ */

class RaidRealtimeService {
    constructor() {
        this.currentRaidId = null;
        this.currentRaidData = null;
        this.unsubRaidListener = null;
        this.onRaidUpdateCallback = null;
        this.isHost = false;
        this.localMode = false;
    }

    /**
     * Gera ID único de sala de raid para uma party e capítulo
     */
    generateRaidId(partyId, chapterId) {
        return `raid_${partyId || 'solo'}_ch${chapterId}`;
    }

    /**
     * Cria ou entra em uma sala de Raid no Firestore
     */
    async joinOrCreateRaidRoom(party, chapterId, currentPlayerData, bossData) {
        const uid = currentPlayerData.uid;
        const partyId = party ? party.id : `solo_${uid.substring(0, 6)}`;
        const raidId = this.generateRaidId(partyId, chapterId);
        this.currentRaidId = raidId;

        // Se fbDB não estiver disponível, entra em modo local resiliente
        if (typeof fbDB === 'undefined') {
            this.localMode = true;
            this.isHost = true;
            this.currentRaidData = this._createLocalRoomData(raidId, partyId, chapterId, currentPlayerData, bossData);
            return this.currentRaidData;
        }

        try {
            const raidRef = fbDB.collection('raids').doc(raidId);
            const doc = await raidRef.get();

            if (!doc.exists) {
                // Host cria a sala
                this.isHost = true;
                const initialData = this._createLocalRoomData(raidId, partyId, chapterId, currentPlayerData, bossData);
                await raidRef.set(initialData);
                this.currentRaidData = initialData;
            } else {
                const data = doc.data();
                // Se a raid anterior já terminou, reinicia
                if (data.status === 'VICTORY' || data.status === 'DEFEAT' || data.status === 'FINISHED') {
                    this.isHost = true;
                    const initialData = this._createLocalRoomData(raidId, partyId, chapterId, currentPlayerData, bossData);
                    await raidRef.set(initialData);
                    this.currentRaidData = initialData;
                } else {
                    // Entra na sala existente
                    this.isHost = data.hostUid === uid;
                    const players = data.players || [];
                    const existingIndex = players.findIndex(p => p.uid === uid);

                    if (existingIndex >= 0) {
                        players[existingIndex] = {
                            ...players[existingIndex],
                            ...currentPlayerData,
                            combatStatus: 'ACTIVE',
                            lastActive: Date.now()
                        };
                    } else if (players.length < 4) {
                        players.push({
                            ...currentPlayerData,
                            ready: false,
                            combatStatus: 'ACTIVE',
                            lastActive: Date.now()
                        });
                    } else {
                        throw new Error('A sala da raid atingiu o limite de 4 jogadores.');
                    }

                    await raidRef.update({
                        players,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });

                    this.currentRaidData = { ...data, players };
                }
            }

            this.startListener(raidId);
            return this.currentRaidData;
        } catch (e) {
            console.warn('[RaidRealtime] Erro no Firestore, operando em modo local resiliente:', e);
            this.localMode = true;
            this.isHost = true;
            this.currentRaidData = this._createLocalRoomData(raidId, partyId, chapterId, currentPlayerData, bossData);
            return this.currentRaidData;
        }
    }

    _createLocalRoomData(raidId, partyId, chapterId, currentPlayerData, bossData) {
        return {
            id: raidId,
            partyId,
            chapterId,
            hostUid: currentPlayerData.uid,
            status: 'LOBBY',
            bossId: bossData.id,
            bossState: {
                ...bossData,
                currentHp: bossData.baseHp,
                maxHp: bossData.baseHp
            },
            players: [
                {
                    ...currentPlayerData,
                    ready: false,
                    combatStatus: 'ACTIVE',
                    lastActive: Date.now(),
                    damageDealt: 0,
                    damageTaken: 0,
                    healingDone: 0,
                    revivesCount: 0,
                    successfulActions: 0
                }
            ],
            turnState: {
                currentEntityId: null,
                round: 0,
                timeline: []
            },
            createdAt: Date.now(),
            startedAt: null,
            endedAt: null
        };
    }

    /**
     * Inicia o listener de snapshot do Firestore para sincronizar com todos da party
     */
    startListener(raidId) {
        this.stopListener();
        if (typeof fbDB === 'undefined') return;

        try {
            this.unsubRaidListener = fbDB.collection('raids').doc(raidId).onSnapshot(snap => {
                if (snap.exists) {
                    this.currentRaidData = { id: snap.id, ...snap.data() };
                    if (this.onRaidUpdateCallback) {
                        this.onRaidUpdateCallback(this.currentRaidData);
                    }
                }
            }, err => {
                console.warn('[RaidRealtime] Snapshot listener erro:', err);
            });
        } catch (e) {
            console.warn('[RaidRealtime] Falha ao iniciar listener:', e);
        }
    }

    stopListener() {
        if (this.unsubRaidListener) {
            this.unsubRaidListener();
            this.unsubRaidListener = null;
        }
    }

    /**
     * Alterna o estado de Ready do jogador no Lobby
     */
    async toggleReady(uid) {
        if (!this.currentRaidData) return;
        const players = this.currentRaidData.players || [];
        const p = players.find(x => x.uid === uid);
        if (!p) return;

        p.ready = !p.ready;

        if (this.localMode || typeof fbDB === 'undefined') {
            if (this.onRaidUpdateCallback) this.onRaidUpdateCallback(this.currentRaidData);
            return;
        }

        try {
            await fbDB.collection('raids').doc(this.currentRaidId).update({
                players,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.warn('[RaidRealtime] Erro ao alternar ready:', e);
        }
    }

    /**
     * Troca o avatar do jogador no Lobby antes do início da batalha
     */
    async updatePlayerAvatar(uid, avatarId, avatarData, combatStats = null) {
        if (!this.currentRaidData || this.currentRaidData.status !== 'LOBBY') return;
        const players = this.currentRaidData.players || [];
        const p = players.find(x => x.uid === uid);
        if (!p) return;

        p.avatarId = avatarId;
        p.photoURL = `assets/avatars/avatar_${avatarId}.png`;
        p.avatarData = avatarData;
        if (combatStats) {
            Object.assign(p, combatStats);
        }

        if (this.localMode || typeof fbDB === 'undefined') {
            if (this.onRaidUpdateCallback) this.onRaidUpdateCallback(this.currentRaidData);
            return;
        }

        try {
            await fbDB.collection('raids').doc(this.currentRaidId).update({
                players,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.warn('[RaidRealtime] Erro ao atualizar avatar:', e);
        }
    }

    /**
     * Atualiza o estado da Raid (Autoritativo pelo Host)
     */
    async updateRaidState(partialState) {
        if (!this.currentRaidData) return;
        this.currentRaidData = { ...this.currentRaidData, ...partialState };

        if (this.localMode || typeof fbDB === 'undefined') {
            if (this.onRaidUpdateCallback) this.onRaidUpdateCallback(this.currentRaidData);
            return;
        }

        try {
            await fbDB.collection('raids').doc(this.currentRaidId).update({
                ...partialState,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.warn('[RaidRealtime] Erro ao atualizar estado da raid:', e);
        }
    }

    /**
     * Sai da sala de Raid
     */
    async leaveRaid(uid) {
        this.stopListener();
        if (!this.currentRaidData) return;

        const players = (this.currentRaidData.players || []).filter(p => p.uid !== uid);

        if (!this.localMode && typeof fbDB !== 'undefined') {
            try {
                if (players.length === 0) {
                    await fbDB.collection('raids').doc(this.currentRaidId).delete();
                } else {
                    let hostUid = this.currentRaidData.hostUid;
                    if (hostUid === uid) hostUid = players[0].uid;
                    await fbDB.collection('raids').doc(this.currentRaidId).update({
                        players,
                        hostUid,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
            } catch (e) {}
        }

        this.currentRaidId = null;
        this.currentRaidData = null;
    }
}

window.RaidRealtimeService = RaidRealtimeService;
window.raidRealtime = new RaidRealtimeService();
