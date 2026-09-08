/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — Game Engine
   State management, progress tracking, persistence, event bus.
   ═══════════════════════════════════════════════════════════════ */

class GameEngine {
    constructor() {
        this.state = this.getDefaultState();
        this.load();
    }

    getDefaultState() {
        return {
            playerName: "",
            currentScreen: "loading",
            currentChapter: 0,
            currentActivity: -1,
            chapterStep: 0,
            xp: 0,
            level: 1,
            tokens: 100, // Moeda Oficial: Tokens
            streak: {
                current: 0,
                best: 0,
                lastActivityDate: null, // ISO string YYYY-MM-DD
                history: {}, // { 'YYYY-MM-DD': true }
                freezes: 0
            },
            raidInventory: {
                soloPotions: 2, // Poção de Cura Individual da Raid (recupera HP individual)
                groupPotions: 1 // Elixir de Cura Coletiva da Raid (recupera HP de toda a Party)
            },
            redeemedRewards: {
                absences: 0, // Máx 12
                extraPoints: 0.0, // Máx 4.0
                history: []
            },
            renome: 80, // Renome Inicial: 80 (Elo Scriptling 0-99)
            codePower: 1000,
            pvpWins: 0,
            pvpLosses: 0,
            winStreak: 0,
            pvpTierRewardsClaimed: {}, // { [tierName]: true }
            stats: {
                executions: 0,
                activitiesCompleted: 0,
                errorsFixed: 0
            },
            abyss: {
                completedChambers: {}, // { "sq0_1": true, ... }
                claimedRewards: {},   // { "0": true, ... }
                seasonCycle: 1
            },
            notepad: "", // Anotações do jogador (Grimório de Notas)
            subclass: null, // 'hardcoder' | 'analyst' | 'debugger' | 'reviewer' | 'cheatcode'
            skillPoints: 0,
            skillsUnlocked: {}, // { 'skill_id': true }
            chapters: {},
            systems: {},
            tutorialStepsCompleted: {},
            chapterUnlocks: [0],
            prologueStep: 0,
            initialized: false,
            introCompleted: false,
            onboardingCompleted: false,
            storyViewed: {},
            unlockedAvatars: ['02'], // Neon Coder como avatar inicial padrão
            worldId: null, // 'c_lang' | 'csharp_unity'
            statPoints: 0, // Pontos de status disponíveis para distribuir nos avatares
            avatarStats: {}, // { [avatarId]: { hp, atk, def, spd } } pontos distribuídos
            artifacts: [], // Lista de artefatos obtidos pelo jogador [{ id, baseId, name, type, stars, statType, isPercent, value, ... }]
            avatarArtifacts: {} // { [avatarId]: { crown: artId, chalice: artId, ring: artId, anklet: artId } }
        };
    }

    _generateChecksum(state) {
        // Simple fast hash for tamper detection across key state metrics
        const seed = "GC_SECURE_2026";
        const keys = [
            state.playerName || '',
            state.level || 1,
            state.xp || 0,
            Object.keys(state.chapters || {}).length,
            state.stats?.activitiesCompleted || 0,
            seed
        ].join('::');
        let hash = 0;
        for (let i = 0; i < keys.length; i++) {
            const char = keys.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return hash.toString(16);
    }

    _sanitizeState(state) {
        if (!state) return this.getDefaultState();

        // 1. Validação estrita de Capítulos e Atividades Concluídas
        if (!state.chapters || typeof state.chapters !== 'object') {
            state.chapters = {};
        }

        const isCSharp = state.worldId === 'csharp_unity';
        const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : (Array.isArray(CHAPTERS) ? CHAPTERS : []);
        const validChapterIds = activeList.length > 0 ? activeList.map(c => c.id) : (isCSharp ? Array.from({length: 38}, (_, i) => i) : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

        // Se o currentChapter ou level for avançado, auto-preenche capítulos anteriores para evitar inconsistências
        const currentCh = typeof state.currentChapter === 'number' ? state.currentChapter : (typeof state.chapter === 'number' ? state.chapter : 0);
        if (currentCh > 0) {
            validChapterIds.forEach(chId => {
                if (chId < currentCh) {
                    const chapterMeta = activeList.find(c => c.id === chId);
                    const actCount = (chapterMeta && chapterMeta.activities) ? chapterMeta.activities.length : 3;
                    if (!state.chapters[chId]) {
                        const filled = { completed: true };
                        for (let a = 1; a <= actCount; a++) filled[`act${a}`] = true;
                        state.chapters[chId] = filled;
                    } else {
                        state.chapters[chId].completed = true;
                    }
                }
            });
        }

        // Calcula quantas atividades foram concluídas
        let legitCompletedActs = 0;
        let legitCompletedChapters = 0;

        validChapterIds.forEach(chId => {
            const chState = state.chapters[chId];
            if (chState) {
                const chapterMeta = activeList.find(c => c.id === chId);
                const actCount = (chapterMeta && chapterMeta.activities) ? chapterMeta.activities.length : 3;
                let actsDone = 0;
                for (let a = 1; a <= actCount; a++) {
                    if (chState[`act${a}`]) {
                        actsDone++;
                        legitCompletedActs++;
                    }
                }
                if (chState.completed || actsDone >= actCount) {
                    chState.completed = true;
                    legitCompletedChapters++;
                }
            }
        });

        // 2. Validação do Abismo
        if (!state.abyss || typeof state.abyss !== 'object') {
            state.abyss = { completedChambers: {}, claimedRewards: {}, seasonCycle: 1 };
        }

        // 3. Normalização de XP e Level (Não destrutivo para ajustes manuais/recompensas do Mestre)
        if (state.level === undefined || state.level === null || state.level < 1) {
            state.level = 1;
        } else {
            state.level = Math.max(1, Math.min(100, Math.floor(state.level)));
        }

        if (state.xp === undefined || state.xp === null || state.xp < 0) {
            state.xp = 0;
        } else {
            state.xp = Math.max(0, Math.floor(state.xp));
        }

        // 4. Normalização de Tokens da Guilda (Não destrutivo para tokens atribuídos pelo Mestre)
        if (state.tokens === undefined || state.tokens === null || state.tokens < 0) {
            state.tokens = 0;
        } else {
            state.tokens = Math.max(0, Math.floor(state.tokens));
        }

        // 5. Validação de Resgates na Loja e PVP
        if (state.renome === undefined || state.renome === null) {
            state.renome = 80;
        } else {
            state.renome = Math.max(0, Math.floor(state.renome));
        }
        if (!state.redeemedRewards || typeof state.redeemedRewards !== 'object') {
            state.redeemedRewards = { absences: 0, extraPoints: 0.0, history: [] };
        }
        if (!state.pvpTierRewardsClaimed || typeof state.pvpTierRewardsClaimed !== 'object') {
            state.pvpTierRewardsClaimed = {};
        }

        // 6. Cadeia de Desbloqueio de Capítulos
        const legitUnlocks = [0];
        validChapterIds.forEach(id => {
            if (id > 0) {
                const prevDone = state.chapters[id - 1] && state.chapters[id - 1].completed;
                if (prevDone || id <= currentCh) {
                    legitUnlocks.push(id);
                }
            }
        });
        state.chapterUnlocks = legitUnlocks;

        // 7. Stat Points retroativos: concede pontos para jogadores que já tinham nível
        // antes do sistema de stat points existir. Só preenche se statPoints nunca foi inicializado.
        if (!state.avatarStats) state.avatarStats = {};
        if ((state.statPoints === undefined || state.statPoints === null) && state.level > 1) {
            const isCSharp = state.worldId === 'csharp_unity';
            const ptsPerLevel = isCSharp ? 3 : 5;
            // Pontos que o jogador teria ganho do level 2 até o level atual
            const levelsEarned = Math.max(0, (state.level || 1) - 1);
            state.statPoints = levelsEarned * ptsPerLevel;
        } else if (state.statPoints === undefined || state.statPoints === null) {
            state.statPoints = 0;
        }

        // 8. Sistema de Artefatos
        if (!Array.isArray(state.artifacts)) {
            state.artifacts = [];
        }
        if (!state.avatarArtifacts || typeof state.avatarArtifacts !== 'object' || Array.isArray(state.avatarArtifacts)) {
            state.avatarArtifacts = {};
        }

        return state;
    }

    load() {
        // Carrega do cache da sessão atual
        if (typeof authManager !== 'undefined' && typeof authManager.getCurrentUser === 'function' && authManager.getCurrentUser()) {
            const uid = authManager.getCurrentUser().uid;
            try {
                const raw = localStorage.getItem(`gc_save_${uid}`);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed && typeof parsed === 'object') {
                        this.state = { ...this.getDefaultState(), ...parsed };
                        return true;
                    }
                }
            } catch (e) {
                console.warn('[Engine] Cache load error:', e);
            }
        }
        return false;
    }

    save() {
        this.state = this._sanitizeState(this.state);
        
        // Cache isolado por UID do usuário logado (evita qualquer conflito entre contas diferentes no mesmo navegador)
        if (typeof authManager !== 'undefined' && typeof authManager.getCurrentUser === 'function' && authManager.getCurrentUser()) {
            const uid = authManager.getCurrentUser().uid;
            try {
                localStorage.setItem(`gc_save_${uid}`, JSON.stringify(this.state));
            } catch (e) {
                console.warn('[Engine] Cache save error:', e);
            }
        }

        // Sincronização direta e prioritária na nuvem (Firebase Firestore)
        if (typeof authManager !== 'undefined' && typeof authManager.isSignedIn === 'function' && authManager.isSignedIn()) {
            this.saveToCloud();
        }
    }

    resetGame() {
        // Apenas redefine o estado em memória da sessão local do navegador, NUNCA apaga da nuvem no logout
        this.state = this.getDefaultState();
    }

    // ─── CÓDIGO DE RESGATE / BACKUP PORTÁTIL (VINCULADO EXCLUSIVAMENTE À CONTA) ───
    exportSaveCode() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) {
            throw new Error('Você precisa estar autenticado em sua conta para gerar o código de save.');
        }
        const user = authManager.getCurrentUser();
        const uid = user?.uid;
        if (!uid) {
            throw new Error('Identificador da conta não encontrado.');
        }

        const payload = {
            v: 1,
            uid: uid,
            email: user?.email || '',
            exportedAt: Date.now(),
            state: this._sanitizeState(this.state)
        };

        const jsonStr = JSON.stringify(payload);
        // Codifica para Base64 seguro com suporte a Unicode (UTF-8)
        const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
        return `GCSAVE-${encoded}`;
    }

    async importSaveCode(saveCodeStr) {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) {
            throw new Error('Faça login na sua conta antes de importar o código de save.');
        }
        const user = authManager.getCurrentUser();
        const currentUid = user?.uid;
        if (!currentUid) {
            throw new Error('Usuário não autenticado.');
        }

        const raw = String(saveCodeStr || '').trim();
        if (!raw.startsWith('GCSAVE-')) {
            throw new Error('Formato de código inválido! O código deve começar com "GCSAVE-".');
        }

        const base64Data = raw.slice(7).trim();
        let payload;
        try {
            const decodedJson = decodeURIComponent(escape(atob(base64Data)));
            payload = JSON.parse(decodedJson);
        } catch (e) {
            throw new Error('Código corrompido ou ilegível. Verifique se copiou o texto completo.');
        }

        if (!payload || typeof payload !== 'object' || !payload.uid || !payload.state) {
            throw new Error('Estrutura de dados do código inválida ou corrompida.');
        }

        // Validação estrita de posse de conta: o código só pode ser importado na mesma conta
        if (payload.uid !== currentUid) {
            const codeEmail = payload.email ? ` da conta (${payload.email})` : '';
            throw new Error(`Este código de save pertence a outro aventureiro${codeEmail}. Por segurança, ele só pode ser restaurado na mesma conta.`);
        }

        // Aplica o estado higienizado e sincroniza imediatamente com a nuvem e cache local
        this.state = { ...this.getDefaultState(), ...this._sanitizeState(payload.state) };
        this.state.initialized = true;
        this.save();
        await this.saveToCloud(true);
        return true;
    }

    isIntroCompleted() {
        return !!this.state.introCompleted;
    }

    completeIntro() {
        this.state.introCompleted = true;
        this.save();
    }

    // ─── NOTEPAD / GRIMÓRIO DE ANOTAÇÕES ───
    getNotepad() {
        return this.state.notepad || "";
    }

    setNotepad(text) {
        this.state.notepad = String(text || "");
        this.save();
    }

    isOnboardingCompleted() {
        return !!this.state.onboardingCompleted;
    }

    completeOnboarding() {
        this.state.onboardingCompleted = true;
        this.state.introCompleted = true;
        this.save();
    }

    markStoryViewed(chapterId) {
        if (!this.state.storyViewed) this.state.storyViewed = {};
        this.state.storyViewed[chapterId] = true;
        this.save();
    }

    isStoryViewed(chapterId) {
        return !!(this.state.storyViewed && this.state.storyViewed[chapterId]);
    }

    setPlayerName(name) {
        this.state.playerName = name;
        this.state.initialized = true;
        this.save();
    }

    setTheme(themeName) {
        this.state.theme = themeName || 'sololeveling';
        this.save();
    }

    getPlayerName() {
        return this.state.playerName || "Aventureiro";
    }

    // ─── LEVEL & XP ───
    getXP() { return this.state.xp; }
    getLevel() { return this.state.level; }

    addXP(amount) {
        let finalAmount = amount;
        
        // Aplica o bônus passivo EXCLUSIVO do avatar atualmente equipado
        if (typeof getAvatarSkillBonus === 'function') {
            const xpBonusRate = getAvatarSkillBonus('xp_boost');
            if (xpBonusRate > 0) {
                finalAmount = Math.round(finalAmount * (1 + xpBonusRate));
            }
        }

        this.state.xp += finalAmount;
        let leveledUp = false;
        while (this.state.xp >= this.getXPToNextLevel()) {
            this.state.xp -= this.getXPToNextLevel();
            this.state.level++;
            leveledUp = true;
            if (this.state.level >= 5) {
                this.state.skillPoints = (this.state.skillPoints || 0) + 1;
            }
            // Concede pontos de status ao subir de nível
            this._grantStatPoints();
        }
        this.save();
        return leveledUp;
    }

    // ─── SUBCLASSES & SKILL TREE ───
    getSubclass() {
        return this.state.subclass || null;
    }

    getSkillPoints() {
        return this.state.skillPoints || 0;
    }

    hasSkill(skillId, user) {
        if (typeof SkillTreeManager !== 'undefined') {
            return SkillTreeManager.hasSkill(this.state, skillId, user);
        }
        if (this.state.subclass === 'cheatcode') return true;
        return !!(this.state.skillsUnlocked && this.state.skillsUnlocked[skillId]);
    }

    chooseSubclass(subclassId, user) {
        if (typeof SkillTreeManager !== 'undefined') {
            const res = SkillTreeManager.chooseSubclass(this.state, subclassId, user);
            if (res.success) this.save();
            return res;
        }
        this.state.subclass = subclassId;
        this.save();
        return { success: true };
    }

    unlockSkill(skillId, user) {
        if (typeof SkillTreeManager !== 'undefined') {
            const res = SkillTreeManager.unlockSkill(this.state, skillId, user);
            if (res.success) this.save();
            return res;
        }
        return { success: false, reason: "SkillTreeManager não disponível." };
    }

    getXPToNextLevel() {
        return this.state.level * 100;
    }

    getXPPercent() {
        return Math.min(100, Math.round((this.state.xp / this.getXPToNextLevel()) * 100));
    }

    // ─── STAT POINTS (Sistema de Distribuição RPG) ───

    /**
     * Pontos concedidos por level-up.
     * C (c_lang): 5 pontos/nível — menos missões, progressão mais compacta.
     * C# (csharp_unity): 3 pontos/nível — 190 missões, progressão mais granular.
     */
    _grantStatPoints() {
        const isCSharp = this.state.worldId === 'csharp_unity';
        const pointsPerLevel = isCSharp ? 3 : 5;
        this.state.statPoints = (this.state.statPoints || 0) + pointsPerLevel;
    }

    /**
     * Retorna o total de pontos que o jogador conquistou e pode distribuir para CADA personagem.
     * Se o jogador tem 50 pontos, cada personagem tem seu próprio teto de 50 pontos.
     */
    getTotalStatPoints() {
        const isCSharp = this.state.worldId === 'csharp_unity';
        const ptsPerLevel = isCSharp ? 3 : 5;
        const levelsEarned = Math.max(0, (this.state.level || 1) - 1);
        const calculatedPoints = levelsEarned * ptsPerLevel;
        return Math.max(calculatedPoints, this.state.statPoints || 0);
    }

    getAvatarStatPoints(avatarId) {
        if (!this.state.avatarStats) this.state.avatarStats = {};
        const def = { hp: 0, atk: 0, def: 0, spd: 0 };
        return Object.assign({}, def, this.state.avatarStats[avatarId] || {});
    }

    getAvatarAllocatedPoints(avatarId) {
        const pts = this.getAvatarStatPoints(avatarId);
        return (pts.hp || 0) + (pts.atk || 0) + (pts.def || 0) + (pts.spd || 0);
    }

    getAvatarAvailableStatPoints(avatarId) {
        const total = this.getTotalStatPoints();
        const allocated = this.getAvatarAllocatedPoints(avatarId);
        return Math.max(0, total - allocated);
    }

    /**
     * Distribui (+1) ou remove (-1) um ponto de status de um avatar específico.
     * Cada avatar pode receber até o total de pontos conquistados pelo jogador.
     */
    distributeStatPoint(avatarId, stat, delta) {
        const validStats = ['hp', 'atk', 'def', 'spd'];
        if (!validStats.includes(stat)) {
            return { success: false, reason: 'Atributo inválido.' };
        }
        if (!this.state.avatarStats) this.state.avatarStats = {};
        if (!this.state.avatarStats[avatarId]) {
            this.state.avatarStats[avatarId] = { hp: 0, atk: 0, def: 0, spd: 0 };
        }

        const available = this.getAvatarAvailableStatPoints(avatarId);
        const current = this.state.avatarStats[avatarId][stat] || 0;

        if (delta > 0) {
            if (available <= 0) {
                return { success: false, reason: 'Todos os pontos disponíveis deste personagem já foram alocados.' };
            }
            this.state.avatarStats[avatarId][stat] = current + 1;
        } else if (delta < 0) {
            if (current <= 0) {
                return { success: false, reason: 'Nenhum ponto alocado neste atributo.' };
            }
            this.state.avatarStats[avatarId][stat] = current - 1;
        } else {
            return { success: false, reason: 'Delta inválido.' };
        }

        this.save();
        return { success: true };
    }

    /**
     * Devolve todos os pontos distribuídos no avatar especificado para o pool desse avatar.
     */
    resetAvatarStatPoints(avatarId) {
        if (!this.state.avatarStats || !this.state.avatarStats[avatarId]) {
            return { success: true, returned: 0 };
        }
        const pts = this.state.avatarStats[avatarId];
        const total = (pts.hp || 0) + (pts.atk || 0) + (pts.def || 0) + (pts.spd || 0);
        this.state.avatarStats[avatarId] = { hp: 0, atk: 0, def: 0, spd: 0 };
        this.save();
        return { success: true, returned: total };
    }

    // ─── SISTEMA DE ARTEFATOS ───
    getArtifacts() {
        if (!Array.isArray(this.state.artifacts)) {
            this.state.artifacts = [];
        }
        return this.state.artifacts;
    }

    getArtifactsByType(type) {
        return this.getArtifacts().filter(a => a.type === type);
    }

    getArtifactById(artifactId) {
        return this.getArtifacts().find(a => a.id === artifactId) || null;
    }

    isInventoryFull(type = null) {
        const artifacts = this.getArtifacts();
        const maxTotal = (typeof MAX_TOTAL_ARTIFACTS !== 'undefined') ? MAX_TOTAL_ARTIFACTS : 96;
        if (artifacts.length >= maxTotal) return true;

        if (type) {
            const maxPerType = (typeof MAX_ARTIFACTS_PER_TYPE !== 'undefined') ? MAX_ARTIFACTS_PER_TYPE : 24;
            const inType = artifacts.filter(a => a.type === type).length;
            return inType >= maxPerType;
        }
        return false;
    }

    addArtifact(artifact) {
        if (!artifact || !artifact.id) return { success: false, reason: 'Artefato inválido.' };
        if (this.isInventoryFull(artifact.type)) {
            return { success: false, isFull: true, reason: 'Inventário de artefatos lotado.' };
        }

        if (!Array.isArray(this.state.artifacts)) {
            this.state.artifacts = [];
        }
        if (!Array.isArray(this.state.seenArtifactIds)) {
            this.state.seenArtifactIds = [];
        }
        this.state.artifacts.push(artifact);
        this.save();
        return { success: true, artifact };
    }

    hasUnseenArtifacts() {
        if (!Array.isArray(this.state.artifacts) || this.state.artifacts.length === 0) return false;
        const seen = Array.isArray(this.state.seenArtifactIds) ? this.state.seenArtifactIds : [];
        return this.state.artifacts.some(art => art && art.id && !seen.includes(art.id));
    }

    isArtifactNew(artifactId) {
        if (!artifactId) return false;
        const seen = Array.isArray(this.state.seenArtifactIds) ? this.state.seenArtifactIds : [];
        return !seen.includes(artifactId);
    }

    markArtifactAsSeen(artifactId) {
        if (!artifactId) return false;
        if (!Array.isArray(this.state.seenArtifactIds)) {
            this.state.seenArtifactIds = [];
        }
        if (!this.state.seenArtifactIds.includes(artifactId)) {
            this.state.seenArtifactIds.push(artifactId);
            this.save();
            return true;
        }
        return false;
    }

    hasUnseenAbyssFloors() {
        const isCSharp = (this.state && this.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        const total = isCSharp ? 38 : 16;
        const seenFloors = Array.isArray(this.state.seenAbyssFloors) ? this.state.seenAbyssFloors : [];

        for (let i = 0; i < total; i++) {
            if (this.isAbyssFloorUnlocked(i) && !seenFloors.includes(i)) {
                return true;
            }
        }
        return false;
    }

    markAllAbyssFloorsAsSeen() {
        const isCSharp = (this.state && this.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        const total = isCSharp ? 38 : 16;
        if (!Array.isArray(this.state.seenAbyssFloors)) {
            this.state.seenAbyssFloors = [];
        }

        let changed = false;
        for (let i = 0; i < total; i++) {
            if (this.isAbyssFloorUnlocked(i) && !this.state.seenAbyssFloors.includes(i)) {
                this.state.seenAbyssFloors.push(i);
                changed = true;
            }
        }
        if (changed) {
            this.save();
        }
        return changed;
    }

    destroyArtifact(artifactId) {
        if (!artifactId) return { success: false, reason: 'ID inválido.' };

        // Verifica se está equipado em algum avatar
        const equippedIn = this.isArtifactEquipped(artifactId);
        if (equippedIn) {
            return { success: false, reason: 'Desequipe o artefato antes de destruí-lo.' };
        }

        const idx = this.state.artifacts.findIndex(a => a.id === artifactId);
        if (idx === -1) return { success: false, reason: 'Artefato não encontrado.' };

        const removed = this.state.artifacts.splice(idx, 1)[0];
        this.save();
        return { success: true, removed };
    }

    /**
     * Transmuta e aprimora um artefato alvo consumindo materiais
     * @param {string} targetId ID do artefato a ser aprimorado
     * @param {string[]} materialIds IDs dos artefatos a serem consumidos
     */
    transmuteArtifact(targetId, materialIds = []) {
        if (!targetId || !Array.isArray(materialIds) || materialIds.length === 0) {
            return { success: false, reason: 'Nenhum material selecionado para a transmutação.' };
        }

        const target = this.getArtifactById(targetId);
        if (!target) return { success: false, reason: 'Artefato alvo não encontrado.' };

        // Valida se o alvo já atingiu o nível máximo
        const maxLevel = (typeof ArtifactsManager !== 'undefined') ? ArtifactsManager.getMaxLevel(target.stars) : 16;
        if ((target.level || 0) >= maxLevel) {
            return { success: false, reason: 'Este artefato já atingiu seu potencial máximo de aprimoramento.' };
        }

        // Valida materiais
        const materials = [];
        for (const matId of materialIds) {
            if (matId === targetId) {
                return { success: false, reason: 'O artefato principal não pode ser consumido por si mesmo.' };
            }
            const mat = this.getArtifactById(matId);
            if (!mat) {
                return { success: false, reason: `Material ${matId} não encontrado no inventário.` };
            }
            if (this.isArtifactEquipped(matId)) {
                return { success: false, reason: `O artefato "${mat.name}" está equipado em um avatar e não pode ser consumido.` };
            }
            materials.push(mat);
        }

        // Calcula a prévia e o custo
        const preview = (typeof ArtifactsManager !== 'undefined')
            ? ArtifactsManager.previewTransmutation(target, materials)
            : null;

        if (!preview) return { success: false, reason: 'Falha ao calcular a prévia de transmutação.' };

        // Verifica custo em tokens do jogador
        const currentTokens = this.getTokens();
        if (currentTokens < preview.totalTokenCost) {
            return {
                success: false,
                reason: `Tokens insuficientes. Necessário: ${preview.totalTokenCost} Tokens (Disponível: ${currentTokens}).`
            };
        }

        // 1. Deduz os tokens
        if (preview.totalTokenCost > 0) {
            this.state.tokens = Math.max(0, currentTokens - preview.totalTokenCost);
        }

        // 2. Remove os materiais consumidos do inventário
        materialIds.forEach(id => {
            const idx = this.state.artifacts.findIndex(a => a.id === id);
            if (idx !== -1) {
                this.state.artifacts.splice(idx, 1);
            }
        });

        // 3. Atualiza o artefato alvo de forma atômica
        if (target.baseValue === undefined || target.baseValue === null) {
            target.baseValue = target.value;
        }
        target.level = preview.newLevel;
        target.xp = preview.newXp;
        target.value = preview.newValue;
        target.displayValue = preview.newDisplay;

        // Aprimora os substatus proporcionalmente ao novo nível
        if (Array.isArray(target.substats) && target.substats.length > 0) {
            target.substats.forEach(sub => {
                if (sub.baseValue === undefined || sub.baseValue === null) {
                    sub.baseValue = sub.value;
                }
                const newSubVal = (typeof ArtifactsManager !== 'undefined')
                    ? ArtifactsManager.calcEnhancedValue(sub.baseValue, target.level, sub.isPercent)
                    : sub.baseValue;
                sub.value = newSubVal;
                const statLabel = (sub.statType || '').toUpperCase();
                sub.displayValue = sub.isPercent ? `+${newSubVal}% ${statLabel}` : `+${newSubVal} ${statLabel}`;
            });
        }

        target.lastEnhancedAt = Date.now();

        this.save();
        return {
            success: true,
            target,
            consumedCount: materials.length,
            levelsGained: preview.levelsGained,
            oldLevel: preview.currentLevel,
            newLevel: preview.newLevel,
            tokenCost: preview.totalTokenCost,
            newValue: preview.newValue,
            displayValue: preview.newDisplay,
            substats: target.substats || []
        };
    }

    isArtifactEquipped(artifactId) {
        if (!this.state.avatarArtifacts) return null;
        for (const [avId, slots] of Object.entries(this.state.avatarArtifacts)) {
            if (slots && Object.values(slots).includes(artifactId)) {
                return avId;
            }
        }
        return null;
    }

    getEquippedArtifacts(avatarId) {
        if (!this.state.avatarArtifacts || !this.state.avatarArtifacts[avatarId]) {
            return { crown: null, chalice: null, ring: null, anklet: null };
        }
        const slots = this.state.avatarArtifacts[avatarId];
        return {
            crown: slots.crown ? this.getArtifactById(slots.crown) : null,
            chalice: slots.chalice ? this.getArtifactById(slots.chalice) : null,
            ring: slots.ring ? this.getArtifactById(slots.ring) : null,
            anklet: slots.anklet ? this.getArtifactById(slots.anklet) : null
        };
    }

    equipArtifact(avatarId, artifactId) {
        const artifact = this.getArtifactById(artifactId);
        if (!artifact) return { success: false, reason: 'Artefato não encontrado.' };

        const slot = artifact.type; // 'crown', 'chalice', 'ring', 'anklet'
        if (!['crown', 'chalice', 'ring', 'anklet'].includes(slot)) {
            return { success: false, reason: 'Tipo de slot inválido.' };
        }

        // Se este artefato estiver equipado em outro avatar, desequipa de lá
        const currentAv = this.isArtifactEquipped(artifactId);
        if (currentAv && currentAv !== avatarId && this.state.avatarArtifacts[currentAv]) {
            delete this.state.avatarArtifacts[currentAv][slot];
        }

        if (!this.state.avatarArtifacts) this.state.avatarArtifacts = {};
        if (!this.state.avatarArtifacts[avatarId]) {
            this.state.avatarArtifacts[avatarId] = {};
        }

        this.state.avatarArtifacts[avatarId][slot] = artifactId;
        this.save();
        return { success: true, slot, artifact };
    }

    unequipArtifact(avatarId, slot) {
        if (!this.state.avatarArtifacts || !this.state.avatarArtifacts[avatarId]) {
            return { success: true };
        }
        if (this.state.avatarArtifacts[avatarId][slot]) {
            delete this.state.avatarArtifacts[avatarId][slot];
            this.save();
        }
        return { success: true };
    }

    getAvatarArtifactBonuses(avatarId) {
        const equipped = this.getEquippedArtifacts(avatarId);
        const bonuses = {
            hp_flat: 0,
            hp_pct: 0,
            atk_flat: 0,
            atk_pct: 0,
            def_flat: 0,
            def_pct: 0,
            spd_flat: 0,
            spd_pct: 0
        };

        Object.values(equipped).forEach(art => {
            if (!art) return;

            // 1. Atributo primário
            const primKey = `${art.statType}_${art.isPercent ? 'pct' : 'flat'}`;
            if (bonuses[primKey] !== undefined) {
                bonuses[primKey] += Number(art.value) || 0;
            }

            // 2. Substatus secundários
            if (Array.isArray(art.substats)) {
                art.substats.forEach(sub => {
                    if (!sub || !sub.statType) return;
                    const subKey = `${sub.statType}_${sub.isPercent ? 'pct' : 'flat'}`;
                    if (bonuses[subKey] !== undefined) {
                        bonuses[subKey] += Number(sub.value) || 0;
                    }
                });
            }
        });

        return bonuses;
    }


    // ─── TOKENS (MOEDA OFICIAL DA GUILDA) ───
    getTokens() {
        if (typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin())) {
            if (this.state.tokens === undefined || this.state.tokens === null) {
                this.state.tokens = 9999;
                this.save();
            }
        }
        return this.state.tokens !== undefined ? this.state.tokens : 0;
    }

    addTokens(amount) {
        const val = Math.max(0, Number(amount) || 0);
        this.state.tokens = (this.state.tokens !== undefined ? this.state.tokens : 0) + val;
        this.save();
        return this.state.tokens;
    }

    spendTokens(amount) {
        const val = Math.max(0, Number(amount) || 0);
        const current = this.state.tokens !== undefined ? this.state.tokens : 0;
        if (current < val) return false;
        this.state.tokens = current - val;
        this.save();
        return true;
    }

    // ─── UNLOCKED HINTS PERSISTENCE ───
    isHintUnlocked(actId, hintIdx) {
        if (!this.state.unlockedHints) return false;
        if (!this.state.unlockedHints[actId]) return false;
        return !!this.state.unlockedHints[actId][hintIdx];
    }

    unlockHint(actId, hintIdx) {
        if (!this.state.unlockedHints) {
            this.state.unlockedHints = {};
        }
        if (!this.state.unlockedHints[actId]) {
            this.state.unlockedHints[actId] = [false, false, false];
        }
        this.state.unlockedHints[actId][hintIdx] = true;
        this.save();
        return true;
    }

    // ─── STREAK DIÁRIO SEGURO (ANTI-BURLA DE DATA) ───
    getStreak() {
        if (!this.state.streak) {
            this.state.streak = { current: 0, best: 0, lastActivityDate: null, history: {}, freezes: 0 };
        }
        return this.state.streak;
    }

    updateDailyStreak() {
        if (!this.state.streak) {
            this.state.streak = { current: 0, best: 0, lastActivityDate: null, history: {}, freezes: 0 };
        }

        const now = new Date();
        const todayStr = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const lastDateStr = this.state.streak.lastActivityDate;

        if (!lastDateStr) {
            // Primeiro dia de atividade
            this.state.streak.current = 1;
            this.state.streak.best = Math.max(this.state.streak.best || 0, 1);
            this.state.streak.lastActivityDate = todayStr;
            this.state.streak.history[todayStr] = true;
            this.addTokens(15); // Recompensa primeiro dia
            this.save();
            return { updated: true, streak: 1, bonusTokens: 15 };
        }

        if (lastDateStr === todayStr) {
            // Já realizou atividade hoje (não incrementa novamente no mesmo dia)
            return { updated: false, streak: this.state.streak.current, bonusTokens: 0 };
        }

        const lastDate = new Date(lastDateStr + 'T00:00:00');
        const todayDate = new Date(todayStr + 'T00:00:00');
        const diffTime = todayDate.getTime() - lastDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

        if (diffDays === 1) {
            // Dia consecutivo perfeito
            this.state.streak.current = (this.state.streak.current || 0) + 1;
            this.state.streak.best = Math.max(this.state.streak.best || 0, this.state.streak.current);
            this.state.streak.lastActivityDate = todayStr;
            this.state.streak.history[todayStr] = true;
            
            // Bônus progressivo por ofensiva
            const bonus = 10 + Math.min(40, this.state.streak.current * 2);
            this.addTokens(bonus);
            this.save();
            return { updated: true, streak: this.state.streak.current, bonusTokens: bonus };
        } else if (diffDays > 1) {
            // Perdeu um ou mais dias — checa se possui freeze
            if ((this.state.streak.freezes || 0) > 0) {
                this.state.streak.freezes--;
                this.state.streak.lastActivityDate = todayStr;
                this.state.streak.history[todayStr] = true;
                this.save();
                return { updated: true, streak: this.state.streak.current, bonusTokens: 0, protectedByFreeze: true };
            } else {
                // Reinicia a ofensiva para 1
                this.state.streak.current = 1;
                this.state.streak.lastActivityDate = todayStr;
                this.state.streak.history[todayStr] = true;
                this.addTokens(10);
                this.save();
                return { updated: true, streak: 1, bonusTokens: 10, reset: true };
            }
        }

        return { updated: false, streak: this.state.streak.current, bonusTokens: 0 };
    }

    // ─── RESGATE NA LOJA (LIMITES: 12 FALTAS, 4.0 PONTOS EXTRAS) ───
    redeemShopReward(rewardType, cost, amountValue = 1) {
        if (!this.state.redeemedRewards) {
            this.state.redeemedRewards = { absences: 0, extraPoints: 0.0, history: [] };
        }

        if (rewardType === 'absence') {
            const current = this.state.redeemedRewards.absences || 0;
            if (current + amountValue > 12) {
                throw new Error('Limite máximo de 12 Abonos de Falta no semestre atingido!');
            }
            if (!this.spendTokens(cost)) {
                throw new Error('Tokens insuficientes!');
            }
            this.state.redeemedRewards.absences += amountValue;
            this.state.redeemedRewards.history.push({
                type: 'absence',
                name: 'Pergaminho de Justificativa (Abono de Falta)',
                amount: amountValue,
                cost: cost,
                date: new Date().toISOString()
            });
            this.save();
            return { success: true, total: this.state.redeemedRewards.absences, max: 12 };
        } else if (rewardType === 'extra_point') {
            const isCSharp = (this.state && this.state.worldId === 'csharp_unity') ||
                             (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
            const crystalConfig = (typeof app !== 'undefined' && app.getCrystalRewardsConfig)
                ? app.getCrystalRewardsConfig()
                : { shop: 1, lastAbyss: 1, tournament: 4, lastBoss: 2, pvp: 2 };

            const shopCrystals = isCSharp ? (crystalConfig.shop ?? 1) : 3;
            const maxShopPts = Math.round(shopCrystals * 0.5 * 10) / 10;

            // Histórico de pontos conquistados especificamente na loja
            const shopHistory = (this.state.redeemedRewards.history || []).filter(h => h.type === 'extra_point' && h.source !== 'abyss' && h.source !== 'pvp' && h.source !== 'boss' && h.source !== 'tournament');
            const currentShopPoints = shopHistory.reduce((sum, h) => sum + (h.amount || 0), 0);

            if (currentShopPoints + amountValue > maxShopPts + 0.01) {
                throw new Error(`Limite semestral de ${maxShopPts.toFixed(1)} Pontos Extras (${shopCrystals} Cristal${shopCrystals > 1 ? 'is' : ''}) na Loja atingido!`);
            }
            if (!this.spendTokens(cost)) {
                throw new Error('Tokens insuficientes!');
            }
            const currentTotal = this.state.redeemedRewards.extraPoints || 0.0;
            this.state.redeemedRewards.extraPoints = Math.round((currentTotal + amountValue) * 10) / 10;
            this.state.redeemedRewards.history.push({
                type: 'extra_point',
                name: 'Cristal de Ascensão Acadêmica (Mercado da Guilda)',
                source: 'shop',
                amount: amountValue,
                cost: cost,
                date: new Date().toISOString()
            });
            this.save();
            return { success: true, total: this.state.redeemedRewards.extraPoints, max: maxShopPts };
        } else if (rewardType === 'streak_freeze') {
            if ((this.state.streak.freezes || 0) >= 2) {
                throw new Error('Você já possui o limite máximo de 2 Escudos de Streak guardados.');
            }
            if (!this.spendTokens(cost)) {
                throw new Error('Tokens insuficientes!');
            }
            this.state.streak.freezes = (this.state.streak.freezes || 0) + 1;
            this.save();
            return { success: true, freezes: this.state.streak.freezes };
        } else if (rewardType === 'raid_potion') {
            if (!this.state.raidInventory) {
                this.state.raidInventory = { soloPotions: 0, groupPotions: 0 };
            }
            if ((this.state.raidInventory.soloPotions || 0) >= 10) {
                throw new Error('Você já atingiu o limite de 10 Poções Individuais da Raid.');
            }
            if (!this.spendTokens(cost)) {
                throw new Error('Tokens insuficientes!');
            }
            this.state.raidInventory.soloPotions = (this.state.raidInventory.soloPotions || 0) + 1;
            this.save();
            return { success: true, total: this.state.raidInventory.soloPotions, max: 10 };
        } else if (rewardType === 'raid_group_potion') {
            if (!this.state.raidInventory) {
                this.state.raidInventory = { soloPotions: 0, groupPotions: 0 };
            }
            if ((this.state.raidInventory.groupPotions || 0) >= 5) {
                throw new Error('Você já atingiu o limite de 5 Elixires Coletivos da Raid.');
            }
            if (!this.spendTokens(cost)) {
                throw new Error('Tokens insuficientes!');
            }
            this.state.raidInventory.groupPotions = (this.state.raidInventory.groupPotions || 0) + 1;
            this.save();
            return { success: true, total: this.state.raidInventory.groupPotions, max: 5 };
        }

        throw new Error('Tipo de recompensa desconhecido.');
    }

    // ─── RESGATE DE RECOMPENSAS DE ELO PVP ───
    claimPvPTierReward(tierName) {
        if (typeof PVP_TIERS === 'undefined') {
            throw new Error('Configuração de elos do PVP indisponível.');
        }

        const tier = PVP_TIERS.find(t => t.name === tierName);
        if (!tier) {
            throw new Error(`Elo "${tierName}" não encontrado.`);
        }

        const currentRenome = this.state.renome !== undefined ? this.state.renome : 0;
        if (currentRenome < tier.minRenome) {
            throw new Error(`Renome insuficiente! Você precisa de ${tier.minRenome} de Renome para desbloquear as recompensas de ${tier.name}.`);
        }

        if (!this.state.pvpTierRewardsClaimed) {
            this.state.pvpTierRewardsClaimed = {};
        }

        if (this.state.pvpTierRewardsClaimed[tier.name]) {
            throw new Error(`Você já resgatou as recompensas do elo ${tier.name}!`);
        }

        // Concede XP e Tokens
        const xp = tier.rewardXP || 0;
        const tokens = tier.rewardTokens || 0;
        if (xp > 0) this.addXP(xp);
        if (tokens > 0) this.addTokens(tokens);

        let grantedCrystal = false;
        let crystalCountAwarded = 0;
        // Se for o último elo (Legendary CodeMancer), concede Cristais de Ascensão configurados
        if (tier.grantAscensionCrystal) {
            if (!this.state.redeemedRewards) {
                this.state.redeemedRewards = { absences: 0, extraPoints: 0.0, history: [] };
            }
            const isCSharp = (this.state && this.state.worldId === 'csharp_unity') ||
                             (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
            const crystalConfig = (typeof app !== 'undefined' && app.getCrystalRewardsConfig)
                ? app.getCrystalRewardsConfig()
                : { shop: 1, lastAbyss: 1, tournament: 4, lastBoss: 2, pvp: 2 };

            const numCrystals = isCSharp ? (crystalConfig.pvp ?? 2) : 1;
            const pointsToAdd = Math.round(numCrystals * 0.5 * 10) / 10;

            if (pointsToAdd > 0) {
                const currentPoints = this.state.redeemedRewards.extraPoints || 0.0;
                const newPoints = Math.round((currentPoints + pointsToAdd) * 10) / 10;
                this.state.redeemedRewards.extraPoints = newPoints;
                this.state.redeemedRewards.history.push({
                    type: 'extra_point',
                    name: `Cristal de Ascensão Lendário (${numCrystals}x Recompensa de Elo PVP)`,
                    source: 'pvp',
                    amount: pointsToAdd,
                    crystals: numCrystals,
                    cost: 0,
                    date: new Date().toISOString()
                });
                grantedCrystal = true;
                crystalCountAwarded = numCrystals;
            }
        }

        this.state.pvpTierRewardsClaimed[tier.name] = true;
        this.save();

        return {
            success: true,
            tier: tier.name,
            xp,
            tokens,
            grantedCrystal,
            totalExtraPoints: this.state.redeemedRewards ? this.state.redeemedRewards.extraPoints : 0
        };
    }

    // ─── STATISTICS ───
    incrementStat(stat) {
        if (this.state.stats[stat] !== undefined) {
            this.state.stats[stat]++;
            this.save();
        }
    }

    getStats() { return this.state.stats; }

    getGuildPower() {
        let total = (typeof GUILD_SYSTEMS !== 'undefined') ? GUILD_SYSTEMS.length : 16;
        let unlocked = Object.values(this.state.systems).filter(s => s).length;
        return Math.round((unlocked / total) * 100);
    }

    // ─── CHAPTERS ───
    isChapterUnlocked(chapterId) {
        // Chapter 0 is unlocked by default for new players
        if (chapterId === 0) return true;
        // Check admin-controlled unlocks
        const unlocks = this.state.chapterUnlocks || [0];
        if (unlocks.includes(chapterId)) return true;
        // Fallback: unlocked if previous chapter completed
        return this.isChapterCompleted(chapterId - 1);
    }

    isChapterCompleted(chapterId) {
        return this.state.chapters[chapterId] && this.state.chapters[chapterId].completed;
    }

    getChapterProgress(chapterId) {
        if (!this.state.chapters[chapterId]) return 0;
        let ch = this.state.chapters[chapterId];
        const isCSharp = this.state.worldId === 'csharp_unity';
        const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
        const chData = activeList.find(c => c.id === chapterId);
        const actCount = (chData && chData.activities) ? chData.activities.length : 3;

        let steps = ["story", "concept", "example", "experiment", "tutorial"];
        for (let a = 1; a <= actCount; a++) {
            steps.push(`act${a}`);
        }
        let completed = steps.filter(s => ch[s]).length;
        return completed;
    }

    getChapterTotalSteps(chapterId = null) {
        if (chapterId !== null && chapterId !== undefined) {
            const isCSharp = this.state && this.state.worldId === 'csharp_unity';
            const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
            const chData = activeList.find(c => c.id === chapterId);
            if (chData && chData.activities) {
                return 5 + chData.activities.length;
            }
        }
        return 8;
    }

    completeChapterStep(chapterId, step) {
        if (!this.state.chapters[chapterId]) {
            this.state.chapters[chapterId] = { completed: false };
        }
        this.state.chapters[chapterId][step] = true;
        this.save();
    }

    completeChapter(chapterId) {
        if (!this.state.chapters[chapterId]) {
            this.state.chapters[chapterId] = {};
        }
        this.state.chapters[chapterId].completed = true;
        this.completeChapterStep(chapterId, "reward");
        this.unlockSystem(chapterId);
        this.save();
    }

    // ─── SYSTEMS ───
    unlockSystem(chapterId) {
        if (typeof GUILD_SYSTEMS !== 'undefined') {
            let system = GUILD_SYSTEMS.find(s => s.chapter === chapterId);
            if (system) {
                this.state.systems[system.id] = true;
                this.save();
            }
        }
    }

    isSystemUnlocked(systemId) {
        return !!this.state.systems[systemId];
    }

    getUnlockedSystemsCount() {
        return Object.values(this.state.systems).filter(s => s).length;
    }

    getCompletedChaptersCount() {
        return Object.values(this.state.chapters).filter(c => c && c.completed).length;
    }

    // ─── ABYSS METHODS (O ABISMO DO CÓDIGO) ───
    isAbyssFloorUnlocked(chapterId) {
        // Regra estrita: Só desbloqueia o Andar N se o aluno tiver concluído o Capítulo N
        return !!(this.state.chapters && this.state.chapters[chapterId] && this.state.chapters[chapterId].completed);
    }

    getAbyssFloorProgress(chapterId) {
        if (!this.state.abyss) this.state.abyss = { completedChambers: {}, claimedRewards: {} };
        const isCSharp = (this.state && this.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        
        let quests = [];
        if (isCSharp) {
            const csFloors = typeof CSHARP_SIDE_QUESTS !== 'undefined' ? CSHARP_SIDE_QUESTS : {};
            const key = String(chapterId).startsWith('csharp_ch') ? String(chapterId) : `csharp_ch${chapterId}`;
            quests = csFloors[key] || csFloors[chapterId] || [];
        } else {
            quests = (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) || [];
        }

        if (quests.length === 0) return { total: 5, completed: 0, isAllDone: false, claimed: false };

        let done = 0;
        quests.forEach(q => {
            if (this.state.abyss.completedChambers && this.state.abyss.completedChambers[q.id]) {
                done++;
            }
        });

        const claimed = !!(this.state.abyss.claimedRewards && this.state.abyss.claimedRewards[chapterId]);
        return {
            total: quests.length,
            completed: done,
            isAllDone: done >= quests.length,
            claimed: claimed
        };
    }

    completeAbyssChamber(chamberId, xpReward = 20, tokenReward = 10) {
        if (!this.state.abyss) this.state.abyss = { completedChambers: {}, claimedRewards: {} };
        if (!this.state.abyss.completedChambers) this.state.abyss.completedChambers = {};

        const alreadyDone = !!this.state.abyss.completedChambers[chamberId];
        this.state.abyss.completedChambers[chamberId] = true;

        if (!alreadyDone) {
            this.addXP(xpReward);
            this.addTokens(tokenReward);
            if (this.state.stats) this.state.stats.activitiesCompleted = (this.state.stats.activitiesCompleted || 0) + 1;
        }
        this.save();
        return { success: true, firstTime: !alreadyDone, xpGained: alreadyDone ? 0 : xpReward, tokensGained: alreadyDone ? 0 : tokenReward };
    }

    claimAbyssFloorReward(chapterId) {
        const prog = this.getAbyssFloorProgress(chapterId);
        if (!prog.isAllDone) {
            throw new Error("Você precisa concluir todas as 5 câmaras deste andar para resgatar o Baú.");
        }
        if (prog.claimed) {
            throw new Error("A recompensa deste andar já foi resgatada.");
        }

        if (!this.state.abyss.claimedRewards) this.state.abyss.claimedRewards = {};
        this.state.abyss.claimedRewards[chapterId] = true;

        const bonusXP = 100;
        let bonusTokens = 50;
        const bonusRenome = 10;

        // Subclasse Analyst Perk: Cálculo Preciso (an_precise_loot) concede +15% de Tokens nos Baús do Abismo
        const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
        if (this.hasSkill('an_precise_loot', user)) {
            bonusTokens = Math.round(bonusTokens * 1.15);
        }

        this.addXP(bonusXP);
        this.addTokens(bonusTokens);
        const curRenome = (this.state.renome !== undefined && this.state.renome !== null) ? this.state.renome : 80;
        this.state.renome = curRenome + bonusRenome;

        let bonusCrystals = 0;
        const isCSharp = (this.state && this.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        
        // Se for o último andar do Abismo (Capítulo 37 no C#), concede os Cristais de Ascensão configurados
        const isLastAbyssFloor = isCSharp ? (Number(chapterId) === 37) : (Number(chapterId) === 15);
        if (isLastAbyssFloor) {
            const crystalConfig = (typeof app !== 'undefined' && app.getCrystalRewardsConfig)
                ? app.getCrystalRewardsConfig()
                : { shop: 1, lastAbyss: 1, tournament: 4, lastBoss: 2, pvp: 2 };
            
            bonusCrystals = isCSharp ? (crystalConfig.lastAbyss ?? 1) : 0;
            if (bonusCrystals > 0) {
                if (!this.state.redeemedRewards) {
                    this.state.redeemedRewards = { absences: 0, extraPoints: 0.0, history: [] };
                }
                const pointsToAdd = Math.round(bonusCrystals * 0.5 * 10) / 10;
                const currentPoints = this.state.redeemedRewards.extraPoints || 0.0;
                this.state.redeemedRewards.extraPoints = Math.round((currentPoints + pointsToAdd) * 10) / 10;
                this.state.redeemedRewards.history.push({
                    type: 'extra_point',
                    name: `Cristal de Ascensão do Pináculo (${bonusCrystals}x Último Andar do Abismo)`,
                    source: 'abyss',
                    chapterId: chapterId,
                    amount: pointsToAdd,
                    crystals: bonusCrystals,
                    cost: 0,
                    date: new Date().toISOString()
                });
            }
        }

        this.save();

        return {
            success: true,
            bonusXP,
            bonusTokens,
            bonusRenome,
            bonusCrystals
        };
    }

    // ─── TUTORIAL ───
    getTutorialStep(chapterId) {
        return this.state.tutorialStepsCompleted[chapterId] || 0;
    }

    completeTutorialStep(chapterId, step) {
        this.state.tutorialStepsCompleted[chapterId] = step + 1;
        this.save();
    }

    // ─── NAVIGATION ───
    setChapterUnlocks(unlocks) {
        this.state.chapterUnlocks = [0, 1, ...unlocks.filter(id => id !== 0 && id !== 1)];
        this.save();
    }

    getChapterUnlocks() {
        return this.state.chapterUnlocks || [0, 1];
    }

    setScreen(screen) {
        this.state.currentScreen = screen;
        this.save();
    }

    setCurrentChapter(chapterId) {
        this.state.currentChapter = chapterId;
        this.state.chapterStep = 0;
        this.save();
    }

    setCurrentActivity(activityIndex) {
        this.state.currentActivity = activityIndex;
        this.save();
    }

    // ─── FIRESTORE SYNC (AUTORIDADE MÁXIMA DA CONTA) ───
    async loadFromCloud() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) {
            return false;
        }

        const uid = authManager.getCurrentUser()?.uid;
        if (!uid) return false;

        // 1. Carrega imediatamente do cache local para resposta visual instantânea (0ms)
        let localCandidate = null;
        try {
            const raw = localStorage.getItem(`gc_save_${uid}`);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object') {
                    localCandidate = parsed;
                    // Se o estado atual ainda não tem dados sólidos, usa o local provisoriamente
                    if (!this.state || (!this.state.xp && this.state.level <= 1 && !this.state.introCompleted)) {
                        this.state = { ...this.getDefaultState(), ...this._sanitizeState(parsed) };
                    }
                }
            }
        } catch (e) {}

        try {
            // 2. Busca os dados mais atualizados do Firestore
            const cloudData = await authManager.loadProgress();
            
            const hasCloudProgress = cloudData && typeof cloudData === 'object' && (
                cloudData.initialized || 
                cloudData.introCompleted || 
                cloudData.onboardingCompleted || 
                (cloudData.chapters && Object.keys(cloudData.chapters).length > 0) || 
                (cloudData.abyss && Object.keys(cloudData.abyss.completedChambers || {}).length > 0) ||
                cloudData.level > 1 || 
                cloudData.xp > 0 || 
                cloudData.tokens > 0 ||
                (cloudData.unlockedAvatars && cloudData.unlockedAvatars.length > 1)
            );

            if (hasCloudProgress) {
                // Nuvem contém progresso legítimo: mescla com segurança
                this.state = { ...this.getDefaultState(), ...this._sanitizeState(cloudData) };
                this.state.initialized = true;
                this.state.introCompleted = !!cloudData.introCompleted;
                this.state.onboardingCompleted = !!cloudData.onboardingCompleted;
                
                // Atualiza cache local sincronizado
                try { localStorage.setItem(`gc_save_${uid}`, JSON.stringify(this.state)); } catch (e) {}
                return true;
            } else if (localCandidate && (
                localCandidate.level > 1 || 
                localCandidate.introCompleted || 
                localCandidate.xp > 0 || 
                (localCandidate.chapters && Object.keys(localCandidate.chapters).length > 0)
            )) {
                // Caso a nuvem não possua progresso gravado ainda (ex: primeira sincronização pós-cadastro ou offline anterior)
                // mas exista progresso legítimo no cache local deste UID:
                this.state = { ...this.getDefaultState(), ...this._sanitizeState(localCandidate) };
                this.state.initialized = true;
                await this.saveToCloud(true); // Sobe imediatamente para o Firestore
                return true;
            } else {
                // Conta nova sem progresso anterior
                if (!this.state || (!this.state.introCompleted && !this.state.xp && this.state.level <= 1)) {
                    this.state = this.getDefaultState();
                    const userName = authManager.getDisplayName();
                    if (userName) {
                        this.state.playerName = userName;
                    }
                }
                return false;
            }
        } catch (e) {
            console.warn('[Engine] Cloud load fallback to local storage:', e);
            if (localCandidate) {
                this.state = { ...this.getDefaultState(), ...this._sanitizeState(localCandidate) };
                return true;
            }
            return false;
        }
    }

    async saveToCloud(immediate = false) {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) return;
        const uid = authManager.getCurrentUser()?.uid;
        
        // 1. Atualização ultra-rápida no cache local imediato
        if (uid) {
            try {
                localStorage.setItem(`gc_save_${uid}`, JSON.stringify(this.state));
            } catch (e) {}
        }

        // 2. Se for imediato, cancela o debounce pendente e salva agora
        if (immediate) {
            if (this._saveDebounceTimer) {
                clearTimeout(this._saveDebounceTimer);
                this._saveDebounceTimer = null;
            }
            try {
                await authManager.saveProgress(this._sanitizeState(this.state));
            } catch (e) {
                console.warn('[Engine] Cloud immediate save failed:', e);
            }
            return;
        }

        // 3. Debounce inteligente (400ms) para consolidar múltiplos ganhos de XP/tokens em uma única gravação
        if (this._saveDebounceTimer) {
            clearTimeout(this._saveDebounceTimer);
        }

        this._saveDebounceTimer = setTimeout(async () => {
            this._saveDebounceTimer = null;
            try {
                await authManager.saveProgress(this._sanitizeState(this.state));
            } catch (e) {
                console.warn('[Engine] Cloud debounced save failed:', e);
            }
        }, 400);
    }
}
