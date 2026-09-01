/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Real-Time Mini Chat Manager (Guild & Party Channels)
   Partitioned by date (resets daily at 00:00).
   ═══════════════════════════════════════════════════════════════ */

class ChatManager {
    constructor() {
        this.currentChannel = 'guild'; // 'guild' | 'party'
        this.unsubListener = null;
        this.messages = [];
        this.isOpen = false;
        this.unreadCount = 0;
        this.onMessageCallback = null;
        this.currentGuildCode = null;
        this.channelCache = { guild: [], party: [] };
    }

    getTodayKey() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    async resolveTargetId(channel = this.currentChannel) {
        if (channel === 'guild') {
            let code = null;
            if (typeof authManager !== 'undefined') {
                code = authManager.getClassCode();
                if (!code && authManager.getEffectiveGuildCode) {
                    try {
                        code = await authManager.getEffectiveGuildCode();
                    } catch(e){}
                }
                if (!code && authManager.isTeacher()) {
                    code = 'MESTRES_GUILD';
                }
            }
            this.currentGuildCode = code || 'GLOBAL_GUILD';
            return this.currentGuildCode;
        } else if (channel === 'party') {
            if (typeof partyManager !== 'undefined') {
                try {
                    const party = await partyManager.getUserParty();
                    this.currentPartyId = party ? party.id : null;
                } catch(e){}
            }
            return this.currentPartyId;
        }
        return null;
    }

    async checkUserAccess() {
        const guildCode = await this.resolveTargetId('guild');
        const partyId = await this.resolveTargetId('party');
        return {
            hasGuild: !!guildCode,
            hasParty: !!partyId,
            guildCode: guildCode,
            partyId: partyId,
            canAccess: true
        };
    }

    async setChannel(channel) {
        if (this.currentChannel === channel && this.unsubListener) return;
        this.currentChannel = channel;
        
        // Emite imediatamente o conteúdo do cache se houver
        if (this.channelCache[channel] && this.onMessageCallback) {
            this.messages = this.channelCache[channel];
            this.onMessageCallback(this.messages, this.currentChannel, true);
        }

        await this.startListening();
    }

    async startListening(callback = null) {
        if (callback) this.onMessageCallback = callback;
        if (this.unsubListener) {
            this.unsubListener();
            this.unsubListener = null;
        }

        if (typeof fbDB === 'undefined') return;

        const targetId = await this.resolveTargetId(this.currentChannel);
        const todayKey = this.getTodayKey();

        // Se o usuário não tiver afiliação no canal solicitado (sem guilda ou sem party)
        if (!targetId) {
            this.messages = [];
            if (this.onMessageCallback) {
                this.onMessageCallback([], this.currentChannel, false);
            }
            return;
        }

        try {
            // Limpa automaticamente mensagens de dias anteriores do Firestore para não acumular
            this.purgeExpiredMessages(targetId, this.currentChannel, todayKey);

            this.unsubListener = fbDB.collection('chat_messages')
                .where('scope', '==', this.currentChannel)
                .where('targetId', '==', targetId)
                .where('date', '==', todayKey)
                .limit(60)
                .onSnapshot(snap => {
                    const msgs = [];
                    snap.forEach(doc => {
                        msgs.push({ id: doc.id, ...doc.data() });
                    });

                    // Ordena por data de criação crescente
                    msgs.sort((a, b) => {
                        const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.timestamp || 0);
                        const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.timestamp || 0);
                        return tA - tB;
                    });

                    const previousCount = (this.channelCache[this.currentChannel] || []).length;
                    this.messages = msgs;
                    this.channelCache[this.currentChannel] = msgs;

                    // Se a janela estiver fechada e chegar nova mensagem, incrementa não lidas
                    if (!this.isOpen && msgs.length > previousCount && previousCount > 0) {
                        this.unreadCount += (msgs.length - previousCount);
                    }

                    if (this.onMessageCallback) {
                        this.onMessageCallback(this.messages, this.currentChannel, true);
                    }
                }, err => {
                    console.warn('[Chat] Listen error:', err);
                });
        } catch (e) {
            console.warn('[Chat] startListening failed:', e);
        }
    }

    // ─── LIMPEZA AUTOMÁTICA DE MENSAGENS ANTIGAS DO FIREBASE (< 00:00) ───
    async purgeExpiredMessages(targetId, scope, todayKey) {
        if (!targetId || !scope || !todayKey || typeof fbDB === 'undefined') return;
        
        // Evita chamadas repetidas desnecessárias na mesma sessão (throttle)
        const lastPurgeKey = `gc_chat_last_purge_${scope}_${targetId}`;
        const lastPurgeDate = sessionStorage.getItem(lastPurgeKey);
        if (lastPurgeDate === todayKey) return;

        try {
            // Busca mensagens do canal cujo campo 'date' é anterior ao dia atual (evita requirement de índice composto com !=)
            const expiredSnap = await fbDB.collection('chat_messages')
                .where('scope', '==', scope)
                .where('targetId', '==', targetId)
                .where('date', '<', todayKey)
                .limit(50)
                .get();

            if (!expiredSnap.empty) {
                const batch = fbDB.batch();
                expiredSnap.forEach(doc => {
                    batch.delete(doc.ref);
                });
                await batch.commit();
            }

            sessionStorage.setItem(lastPurgeKey, todayKey);
        } catch (e) {
            // Fallback silencioso sem travar o chat
            sessionStorage.setItem(lastPurgeKey, todayKey);
        }
    }

    async sendMessage(text) {
        if (!text || typeof text !== 'string') return false;
        const trimmed = text.trim();
        if (trimmed.length === 0 || trimmed.length > 250) return false;

        if (typeof authManager === 'undefined' || !authManager.currentUser) {
            throw new Error('Você precisa estar logado para enviar mensagens.');
        }

        const targetId = await this.resolveTargetId(this.currentChannel);
        if (!targetId) {
            if (this.currentChannel === 'party') {
                throw new Error('Você não está em nenhuma Party no momento.');
            }
            throw new Error('Você não está vinculado a nenhuma Guilda no momento.');
        }

        const user = authManager.currentUser;
        const isTeacher = authManager.isTeacher();
        const role = isTeacher ? 'teacher' : (authManager.isAdmin() ? 'admin' : 'student');
        const displayName = authManager.getDisplayName() || 'Membro';
        const photoURL = (authManager && authManager.getPhotoURL) ? authManager.getPhotoURL() : (isTeacher ? 'assets/avatars/avatar_01.png' : 'assets/avatars/avatar_02.png');
        const gameProgress = (typeof engine !== 'undefined' && engine.state) ? engine.state : {};
        const level = gameProgress.level || 1;
        const subclass = gameProgress.subclass || (isTeacher ? 'cheatcode' : null);

        const payload = {
            scope: this.currentChannel,
            targetId: targetId,
            date: this.getTodayKey(),
            text: trimmed,
            uid: user.uid,
            displayName: displayName,
            photoURL: photoURL,
            role: role,
            isTeacher: isTeacher,
            subclass: subclass,
            level: level,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            timestamp: Date.now()
        };

        await fbDB.collection('chat_messages').add(payload);
        return true;
    }

    markAsRead() {
        this.unreadCount = 0;
    }
}

const chatManager = new ChatManager();
