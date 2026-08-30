/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Party Management Module (Cooperação em Grupos de 4)
   Criação, Convites, Entradas/Saídas Dinâmicas e Buffs Compartilhados
   ═══════════════════════════════════════════════════════════════ */

class PartyManager {
    constructor() {
        this.currentParty = null;
        this.unsubPartyListener = null;
        this.unsubInvitesListener = null;
        this.onPartyUpdateCallback = null;
        this.onInvitesUpdateCallback = null;
    }

    _generatePartyCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = 'PT-';
        for (let i = 0; i < 5; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    // ─── CRIAÇÃO DE PARTY ───
    async createParty(partyName) {
        if (!authManager.currentUser) throw new Error("Você precisa estar autenticado.");
        
        const uid = authManager.currentUser.uid;
        const name = (partyName || "").trim() || `Party de ${authManager.getDisplayName()}`;
        const classCode = await authManager.getEffectiveGuildCode();
        const code = this._generatePartyCode();

        // Se já estiver em uma party, sai da anterior primeiro
        if (this.currentParty) {
            await this.leaveParty();
        }

        const memberInfo = this._buildMemberObject(uid);

        const partyData = {
            id: code,
            code: code,
            name: name,
            leaderUid: uid,
            leaderName: memberInfo.displayName,
            classCode: classCode || "GUILD_DEFAULT",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            members: [memberInfo],
            invites: []
        };

        await fbDB.collection('parties').doc(code).set(partyData);
        await this._setUserPartyId(uid, code);

        this.currentParty = partyData;
        this.startPartyListener(code);

        return partyData;
    }

    // ─── INGRESSAR VIA CÓDIGO ───
    async joinPartyByCode(partyCode) {
        if (!authManager.currentUser) throw new Error("Você precisa estar autenticado.");
        
        const cleanCode = (partyCode || "").trim().toUpperCase();
        if (!cleanCode) throw new Error("Digite o código da Party.");

        const uid = authManager.currentUser.uid;
        const docRef = fbDB.collection('parties').doc(cleanCode);
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new Error(`Party com código "${cleanCode}" não foi encontrada.`);
        }

        const partyData = doc.data();
        const members = partyData.members || [];

        // Verifica se já está na party
        if (members.some(m => m.uid === uid)) {
            this.currentParty = partyData;
            this.startPartyListener(cleanCode);
            return partyData;
        }

        // Verifica limite de 4 integrantes
        if (members.length >= 4) {
            throw new Error("Esta Party já atingiu a capacidade máxima de 4 integrantes.");
        }

        // Se já estiver em outra party, sai dela primeiro
        if (this.currentParty && this.currentParty.id !== cleanCode) {
            await this.leaveParty();
        }

        const memberInfo = this._buildMemberObject(uid);
        members.push(memberInfo);

        // Remove o usuário dos convites pendentes caso estivesse convidado
        const invites = (partyData.invites || []).filter(inv => inv.uid !== uid);

        await docRef.update({
            members: members,
            invites: invites,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        await this._setUserPartyId(uid, cleanCode);

        this.currentParty = { ...partyData, members, invites };
        this.startPartyListener(cleanCode);

        return this.currentParty;
    }

    // ─── SAIR DA PARTY ───
    async leaveParty() {
        if (!authManager.currentUser) return;
        const uid = authManager.currentUser.uid;
        const partyId = this.currentParty ? this.currentParty.id : (authManager.userData?.partyId || null);

        if (!partyId) return;

        try {
            const docRef = fbDB.collection('parties').doc(partyId);
            const doc = await docRef.get();

            if (doc.exists) {
                const partyData = doc.data();
                let members = (partyData.members || []).filter(m => m.uid !== uid);

                if (members.length === 0) {
                    // Party esvaziou: remove do Firestore
                    await docRef.delete();
                } else {
                    let leaderUid = partyData.leaderUid;
                    let leaderName = partyData.leaderName;

                    // Se o líder saiu, transfere a liderança para o membro restante mais antigo
                    if (leaderUid === uid) {
                        leaderUid = members[0].uid;
                        leaderName = members[0].displayName;
                    }

                    await docRef.update({
                        members: members,
                        leaderUid: leaderUid,
                        leaderName: leaderName,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
            }
        } catch (e) {
            console.warn('[Party] Erro ao atualizar documento da party ao sair:', e);
        }

        await this._setUserPartyId(uid, null);
        this.stopPartyListener();
        this.currentParty = null;
    }

    // ─── CONVIDAR JOGADOR ───
    async invitePlayer(targetUid, targetName) {
        if (!this.currentParty) throw new Error("Você não está em uma Party ativa.");
        if ((this.currentParty.members || []).length >= 4) {
            throw new Error("A Party já está lotada com 4 integrantes.");
        }

        const uid = authManager.currentUser.uid;
        const partyId = this.currentParty.id;
        const docRef = fbDB.collection('parties').doc(partyId);

        const inviteItem = {
            uid: targetUid,
            displayName: targetName || "Aprendiz",
            invitedBy: authManager.getDisplayName(),
            invitedByUid: uid,
            partyName: this.currentParty.name,
            partyCode: this.currentParty.code,
            invitedAt: new Date().toISOString()
        };

        await docRef.update({
            invites: firebase.firestore.FieldValue.arrayUnion(inviteItem),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        return true;
    }

    // ─── ACEITAR CONVITE ───
    async acceptInvite(partyCode) {
        return await this.joinPartyByCode(partyCode);
    }

    // ─── RECUSAR CONVITE ───
    async declineInvite(partyCode) {
        if (!authManager.currentUser) return;
        const uid = authManager.currentUser.uid;

        try {
            const docRef = fbDB.collection('parties').doc(partyCode);
            const doc = await docRef.get();
            if (doc.exists) {
                const partyData = doc.data();
                const invites = (partyData.invites || []).filter(inv => inv.uid !== uid);
                await docRef.update({ invites: invites });
            }
        } catch (e) {
            console.warn('[Party] Erro ao recusar convite:', e);
        }
    }

    // ─── EXPULSAR INTEGRANTE (Líder) ───
    async kickMember(targetUid) {
        if (!this.currentParty) throw new Error("Você não está em uma Party.");
        if (this.currentParty.leaderUid !== authManager.currentUser.uid) {
            throw new Error("Apenas o Líder da Party pode expulsar integrantes.");
        }
        if (targetUid === authManager.currentUser.uid) {
            throw new Error("Você não pode se auto-expulsar. Use 'Sair da Party'.");
        }

        const partyId = this.currentParty.id;
        const docRef = fbDB.collection('parties').doc(partyId);
        const members = (this.currentParty.members || []).filter(m => m.uid !== targetUid);

        await docRef.update({
            members: members,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        await this._setUserPartyId(targetUid, null);
        return true;
    }

    // ─── BUSCA DE PARTIES DA GUILDA ───
    async getGuildParties(classCode) {
        const code = classCode || (await authManager.getEffectiveGuildCode());
        if (!code) return [];

        try {
            const snap = await fbDB.collection('parties')
                .where('classCode', '==', code)
                .get();

            const list = [];
            snap.forEach(doc => {
                list.push({ id: doc.id, ...doc.data() });
            });
            return list;
        } catch (e) {
            console.warn('[Party] Falha ao listar parties da guilda:', e);
            return [];
        }
    }

    // ─── LISTENER EM TEMPO REAL DA PARTY ATIVA ───
    startPartyListener(partyId, callback) {
        this.stopPartyListener();
        if (callback) this.onPartyUpdateCallback = callback;

        this.unsubPartyListener = fbDB.collection('parties').doc(partyId).onSnapshot(doc => {
            if (doc.exists) {
                this.currentParty = { id: doc.id, ...doc.data() };
                if (this.onPartyUpdateCallback) {
                    this.onPartyUpdateCallback(this.currentParty);
                }
            } else {
                this.currentParty = null;
                if (this.onPartyUpdateCallback) {
                    this.onPartyUpdateCallback(null);
                }
            }
        }, err => {
            console.warn('[Party] Erro no listener da party:', err);
        });
    }

    stopPartyListener() {
        if (this.unsubPartyListener) {
            this.unsubPartyListener();
            this.unsubPartyListener = null;
        }
    }

    // ─── BUSCA CONVITES PENDENTES PARA O USUÁRIO ───
    async getPendingInvitesForUser() {
        if (!authManager.currentUser) return [];
        const uid = authManager.currentUser.uid;
        const classCode = await authManager.getEffectiveGuildCode();

        try {
            const snap = await fbDB.collection('parties')
                .where('classCode', '==', classCode || "GUILD_DEFAULT")
                .get();

            const invites = [];
            snap.forEach(doc => {
                const data = doc.data();
                const userInv = (data.invites || []).find(inv => inv.uid === uid);
                if (userInv && (data.members || []).length < 4) {
                    invites.push({
                        partyId: doc.id,
                        partyName: data.name,
                        partyCode: data.code,
                        invitedBy: userInv.invitedBy,
                        invitedAt: userInv.invitedAt
                    });
                }
            });
            return invites;
        } catch (e) {
            console.warn('[Party] Erro ao buscar convites pendentes:', e);
            return [];
        }
    }

    // ─── VERIFICAÇÃO DE BUFFS COMPARTILHADOS ───
    hasPartyBuff(skillId) {
        if (!this.currentParty || !this.currentParty.members) return false;
        
        // Se o próprio usuário for professor com CheatCode, sempre retorna true
        if (typeof authManager !== 'undefined' && authManager.isTeacher()) return true;

        // Verifica se qualquer membro da party possui a subclasse e habilidade
        return this.currentParty.members.some(m => {
            if (skillId === 'rv_party_leader') {
                return m.subclass === 'reviewer' && (m.level || 1) >= 10;
            }
            return false;
        });
    }

    // ─── AUXILIARES ───
    _buildMemberObject(uid) {
        const state = typeof app !== 'undefined' && app.engine ? app.engine.state : {};
        return {
            uid: uid,
            displayName: authManager.getDisplayName(),
            photoURL: authManager.getPhotoURL(),
            level: state.level || 1,
            subclass: state.subclass || null,
            renome: state.renome !== undefined ? state.renome : 100,
            joinedAt: new Date().toISOString()
        };
    }

    async _setUserPartyId(uid, partyId) {
        try {
            if (authManager.userData) {
                authManager.userData.partyId = partyId;
            }
            await fbDB.collection('users').doc(uid).update({
                partyId: partyId
            });
        } catch (e) {
            console.warn('[Party] Erro ao atualizar partyId no usuário:', e);
        }
    }
}

let partyManager;
if (typeof window !== 'undefined') {
    partyManager = new PartyManager();
    window.partyManager = partyManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PartyManager };
}
