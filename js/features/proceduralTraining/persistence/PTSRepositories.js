/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   PTSRepositories: Persistência de Perfil, Guilda e Histórico
   ═══════════════════════════════════════════════════════════════ */

class PTSRepositories {
    constructor() {
        this.storageKeyPrefix = 'guildcode_pts_';
    }

    /**
     * Salva o perfil do jogador no Firestore com fallback em LocalStorage
     */
    async savePlayerProfile(profile) {
        if (!profile || !profile.playerId) return;
        const data = profile.toJSON ? profile.toJSON() : profile;

        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                await db.collection('pts_player_profiles').doc(profile.playerId).set(data, { merge: true });
            }
        } catch (e) {
            console.warn('[PTS Persistence] Erro ao salvar no Firestore, usando fallback local:', e);
        }

        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(`${this.storageKeyPrefix}profile_${profile.playerId}`, JSON.stringify(data));
            }
        } catch (e) {}
    }

    /**
     * Carrega o perfil de aprendizagem do jogador
     */
    async loadPlayerProfile(playerId) {
        if (!playerId) return new PlayerLearningProfile('guest');

        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                const doc = await db.collection('pts_player_profiles').doc(playerId).get();
                if (doc.exists) {
                    return new PlayerLearningProfile(playerId, doc.data());
                }
            }
        } catch (e) {
            console.warn('[PTS Persistence] Erro ao ler do Firestore, buscando localmente:', e);
        }

        try {
            if (typeof localStorage !== 'undefined') {
                const local = localStorage.getItem(`${this.storageKeyPrefix}profile_${playerId}`);
                if (local) {
                    return new PlayerLearningProfile(playerId, JSON.parse(local));
                }
            }
        } catch (e) {}

        return new PlayerLearningProfile(playerId);
    }

    /**
     * Salva a configuração de Guilda
     */
    async saveGuildConfig(guildConfig) {
        if (!guildConfig || !guildConfig.guildId) return;

        try {
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                await db.collection('pts_guild_configs').doc(guildConfig.guildId).set(guildConfig, { merge: true });
            }
        } catch (e) {}

        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(`${this.storageKeyPrefix}guild_${guildConfig.guildId}`, JSON.stringify(guildConfig));
            }
        } catch (e) {}
    }
}

if (typeof module !== 'undefined') {
    module.exports = PTSRepositories;
}
if (typeof window !== 'undefined') {
    window.PTSRepositories = PTSRepositories;
}
