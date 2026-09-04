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
     * Gera ID único de sala de raid para uma party ou guilda e capítulo
     */
     generateRaidId(partyId, guildCode, chapterId, uid = null) {
        if (partyId) {
            return `raid_party_${partyId}_ch${chapterId}`;
        }
        if (guildCode) {
            return `raid_guild_${guildCode}_ch${chapterId}`;
        }
        return `raid_solo_${(uid || 'anon').substring(0, 6)}_ch${chapterId}`;
    }

    /**
     * Cria ou entra em uma sala de Raid no Firestore com Transação Atômica
     */
    async joinOrCreateRaidRoom(party, chapterId, currentPlayerData, bossData, guildCode = null) {
        const uid = currentPlayerData.uid;
        const partyId = party ? party.id : null;
        const raidId = this.generateRaidId(partyId, guildCode, chapterId, uid);
        this.currentRaidId = raidId;
        console.log(`[RaidRealtime] Conectando à sala: ${raidId} (Party: ${partyId}, Guild: ${guildCode})`);

        // Se fbDB não estiver disponível, entra em modo local resiliente
        if (typeof fbDB === 'undefined') {
            this.localMode = true;
            this.isHost = true;
            this.currentRaidData = this._createLocalRoomData(raidId, partyId, chapterId, currentPlayerData, bossData);
            return this.currentRaidData;
        }

        try {
            const raidRef = fbDB.collection('raids').doc(raidId);

            // Usa runTransaction para garantir atomicidade no Firestore
            const resultData = await fbDB.runTransaction(async (transaction) => {
                const doc = await transaction.get(raidRef);

                if (!doc.exists) {
                    const initialData = this._createLocalRoomData(raidId, partyId, chapterId, currentPlayerData, bossData);
                    transaction.set(raidRef, initialData);
                    return { data: initialData, isHost: true };
                }

                const data = doc.data();
                const isFinished = data.status === 'VICTORY' || data.status === 'DEFEAT' || data.status === 'FINISHED';
                const isStale = (Date.now() - (data.createdAt || 0)) > 3600000;

                if (isFinished || isStale) {
                    const initialData = this._createLocalRoomData(raidId, partyId, chapterId, currentPlayerData, bossData);
                    transaction.set(raidRef, initialData);
                    return { data: initialData, isHost: true };
                }

                const players = [...(data.players || [])];
                const existingIndex = players.findIndex(p => p.uid === uid);
                const isBattleActive = data.status && data.status !== 'LOBBY' && data.status !== 'COUNTDOWN';

                const getSafeAvatar = (pData) => {
                    const avId = pData.avatarId || '02';
                    if (pData.photoURL && pData.photoURL.startsWith('assets/avatars/')) return pData.photoURL;
                    return `assets/avatars/avatar_${avId}.png`;
                };

                const safePlayerData = {
                    ...currentPlayerData,
                    photoURL: getSafeAvatar(currentPlayerData)
                };

                if (existingIndex >= 0) {
                    const existingPlayer = players[existingIndex];
                    const safeExistingAvatar = getSafeAvatar(existingPlayer);
                    players[existingIndex] = {
                        ...existingPlayer,
                        ...safePlayerData,
                        photoURL: safePlayerData.photoURL || safeExistingAvatar,
                        // Se a batalha já estiver em andamento, mantém o HP e status de combate que ele já tinha
                        currentHp: isBattleActive && existingPlayer.currentHp !== undefined ? existingPlayer.currentHp : (safePlayerData.currentHp || safePlayerData.baseHp || 1200),
                        combatStatus: isBattleActive && existingPlayer.combatStatus ? existingPlayer.combatStatus : 'ACTIVE',
                        damageDealt: existingPlayer.damageDealt || 0,
                        damageTaken: existingPlayer.damageTaken || 0,
                        healingDone: existingPlayer.healingDone || 0,
                        revivesCount: existingPlayer.revivesCount || 0,
                        successfulActions: existingPlayer.successfulActions || 0,
                        lastActive: Date.now()
                    };
                } else if (players.length < 4) {
                    players.push({
                        ...safePlayerData,
                        currentHp: safePlayerData.currentHp || safePlayerData.baseHp || 1200,
                        ready: false,
                        combatStatus: 'ACTIVE',
                        lastActive: Date.now(),
                        damageDealt: 0,
                        damageTaken: 0,
                        healingDone: 0,
                        revivesCount: 0,
                        successfulActions: 0
                    });
                } else {
                    throw new Error('A sala da raid atingiu o limite de 4 jogadores.');
                }

                const updatedData = {
                    ...data,
                    players,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                };

                transaction.update(raidRef, {
                    players,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                return { data: updatedData, isHost: data.hostUid === uid };
            });

            this.isHost = resultData.isHost;
            this.currentRaidData = resultData.data;
            this.startListener(raidId);
            return this.currentRaidData;
        } catch (e) {
            console.warn('[RaidRealtime] Erro na transação inicial, tentando sincronização direta:', e);
            try {
                // Tenta leitura direta sem transação antes de cair para local puro
                const raidRef = fbDB.collection('raids').doc(raidId);
                const snap = await raidRef.get();
                if (snap.exists) {
                    const data = snap.data();
                    const players = [...(data.players || [])];
                    const existingIndex = players.findIndex(p => p.uid === uid);
                    const avId = currentPlayerData.avatarId || '02';
                    const safePhoto = (currentPlayerData.photoURL && currentPlayerData.photoURL.startsWith('assets/avatars/')) 
                        ? currentPlayerData.photoURL 
                        : `assets/avatars/avatar_${avId}.png`;
                    const safeCurrent = { ...currentPlayerData, photoURL: safePhoto };

                    if (existingIndex >= 0) {
                        players[existingIndex] = { ...players[existingIndex], ...safeCurrent, lastActive: Date.now() };
                    } else if (players.length < 4) {
                        players.push({ ...safeCurrent, ready: false, combatStatus: 'ACTIVE', lastActive: Date.now() });
                    }
                    await raidRef.set({ ...data, players, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
                    this.isHost = data.hostUid === uid;
                    this.currentRaidData = { ...data, players };
                    this.startListener(raidId);
                    return this.currentRaidData;
                }
            } catch (err2) {
                console.warn('[RaidRealtime] Fallback direto falhou, operando em modo local resiliente:', err2);
            }

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
                    const data = snap.data() || {};
                    if (data.players && Array.isArray(data.players)) {
                        data.players.forEach(p => {
                            const avId = p.avatarId || (p.photoURL && p.photoURL.match(/avatar_(\d+)\.png/) ? p.photoURL.match(/avatar_(\d+)\.png/)[1] : '02');
                            if (!p.photoURL || !p.photoURL.startsWith('assets/avatars/')) {
                                p.photoURL = `assets/avatars/avatar_${avId}.png`;
                            }
                        });
                    }
                    this.currentRaidData = { id: snap.id, ...data };
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

        // Atualização Otimista Imediata da UI local
        if (this.onRaidUpdateCallback) {
            this.onRaidUpdateCallback(this.currentRaidData);
        }

        if (this.localMode || typeof fbDB === 'undefined' || !this.currentRaidId) {
            return;
        }

        try {
            await fbDB.collection('raids').doc(this.currentRaidId).update({
                players,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.warn('[RaidRealtime] Erro ao sincronizar ready no Firestore:', e);
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
     * Envia a ação ofensiva ou de suporte do jogador na Fase da Party
     */
    async submitPlayerPartyAction(uid, actionData) {
        if (!this.currentRaidData) return;
        if (!this.currentRaidData.partyActions) {
            this.currentRaidData.partyActions = {};
        }
        this.currentRaidData.partyActions[uid] = actionData;

        if (this.localMode || typeof fbDB === 'undefined' || !this.currentRaidId) {
            if (this.onRaidUpdateCallback) this.onRaidUpdateCallback(this.currentRaidData);
            return;
        }

        try {
            const cleanAction = this._sanitizeForFirestore(actionData);
            await fbDB.collection('raids').doc(this.currentRaidId).update({
                [`partyActions.${uid}`]: cleanAction,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.warn('[RaidRealtime] Erro ao submeter ação da party:', e);
        }
    }

    /**
     * Envia a reação defensiva de um jogador (Esquiva, Contra-Golpe, Item)
     */
    async submitPlayerReaction(uid, reactionData) {
        if (!this.currentRaidData) return;
        if (!this.currentRaidData.playerReactions) {
            this.currentRaidData.playerReactions = {};
        }
        this.currentRaidData.playerReactions[uid] = reactionData;

        if (this.localMode || typeof fbDB === 'undefined' || !this.currentRaidId) {
            if (this.onRaidUpdateCallback) this.onRaidUpdateCallback(this.currentRaidData);
            return;
        }

        try {
            const cleanReaction = this._sanitizeForFirestore(reactionData);
            await fbDB.collection('raids').doc(this.currentRaidId).update({
                [`playerReactions.${uid}`]: cleanReaction,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.warn('[RaidRealtime] Erro ao submeter reação defensiva:', e);
        }
    }

    _sanitizeForFirestore(obj) {
        if (obj === null || obj === undefined) return null;
        try {
            return JSON.parse(JSON.stringify(obj, (k, v) => (v === undefined ? null : v)));
        } catch (e) {
            return obj;
        }
    }

    /**
     * Atualiza o estado da Raid (Autoritativo pelo Host)
     */
    async updateRaidState(partialState) {
        if (!this.currentRaidData) return;
        this.currentRaidData = { ...this.currentRaidData, ...partialState };

        if (this.localMode || typeof fbDB === 'undefined' || !this.currentRaidId) {
            if (this.onRaidUpdateCallback) this.onRaidUpdateCallback(this.currentRaidData);
            return;
        }

        try {
            const cleanState = this._sanitizeForFirestore(partialState);
            await fbDB.collection('raids').doc(this.currentRaidId).update({
                ...cleanState,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.warn('[RaidRealtime] Erro ao atualizar estado da raid, tentando set merge:', e);
            try {
                const cleanState = this._sanitizeForFirestore(partialState);
                await fbDB.collection('raids').doc(this.currentRaidId).set({
                    ...cleanState,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            } catch (errSet) {
                console.error('[RaidRealtime] Falha crítica ao persistir estado:', errSet);
            }
        }
    }

    /**
     * Sai da sala de Raid e limpa a sala se estiver vazia
     */
    async leaveRaid(uid) {
        this.stopListener();
        const raidId = this.currentRaidId;
        if (!raidId) return;

        if (!this.localMode && typeof fbDB !== 'undefined') {
            try {
                const raidRef = fbDB.collection('raids').doc(raidId);
                await fbDB.runTransaction(async (transaction) => {
                    const doc = await transaction.get(raidRef);
                    if (!doc.exists) return;

                    const data = doc.data();
                    const players = (data.players || []).filter(p => p.uid !== uid);

                    if (players.length === 0) {
                        // Se não restou nenhum jogador na sala, encerra e remove a sala
                        transaction.delete(raidRef);
                    } else {
                        let hostUid = data.hostUid;
                        if (hostUid === uid) {
                            hostUid = players[0].uid;
                        }
                        transaction.update(raidRef, {
                            players,
                            hostUid,
                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                });
            } catch (e) {
                console.warn('[RaidRealtime] Notice ao sair da raid:', e);
            }
        }

        this.currentRaidId = null;
        this.currentRaidData = null;
    }
}

window.RaidRealtimeService = RaidRealtimeService;
window.raidRealtime = new RaidRealtimeService();
