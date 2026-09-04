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
            renome: 100,
            codePower: 1000,
            pvpWins: 0,
            pvpLosses: 0,
            winStreak: 0,
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
            worldId: null // 'c_lang' | 'csharp_unity'
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

        const validChapterIds = Array.isArray(CHAPTERS) ? CHAPTERS.map(c => c.id) : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

        // Se o currentChapter ou level for avançado, auto-preenche capítulos anteriores para evitar inconsistências
        const currentCh = typeof state.currentChapter === 'number' ? state.currentChapter : (typeof state.chapter === 'number' ? state.chapter : 0);
        if (currentCh > 0) {
            validChapterIds.forEach(chId => {
                if (chId < currentCh) {
                    if (!state.chapters[chId]) {
                        state.chapters[chId] = { act1: true, act2: true, act3: true, completed: true };
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
                let actsDone = 0;
                for (let a = 1; a <= 3; a++) {
                    if (chState[`act${a}`]) {
                        actsDone++;
                        legitCompletedActs++;
                    }
                }
                if (chState.completed || actsDone >= 3) {
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

        // 5. Validação de Resgates na Loja
        if (!state.redeemedRewards || typeof state.redeemedRewards !== 'object') {
            state.redeemedRewards = { absences: 0, extraPoints: 0.0, history: [] };
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
            const current = this.state.redeemedRewards.extraPoints || 0.0;
            if (current + amountValue > 4.01) {
                throw new Error('Limite máximo de 4.0 Pontos Extras na média atingido!');
            }
            if (!this.spendTokens(cost)) {
                throw new Error('Tokens insuficientes!');
            }
            this.state.redeemedRewards.extraPoints = Math.round((current + amountValue) * 10) / 10;
            this.state.redeemedRewards.history.push({
                type: 'extra_point',
                name: 'Cristal de Ascensão Acadêmica (+Ponto Extra)',
                amount: amountValue,
                cost: cost,
                date: new Date().toISOString()
            });
            this.save();
            return { success: true, total: this.state.redeemedRewards.extraPoints, max: 4.0 };
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
        let steps = ["story", "concept", "example", "experiment", "tutorial", "act1", "act2", "act3"];
        let completed = steps.filter(s => ch[s]).length;
        return completed;
    }

    getChapterTotalSteps() {
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
        const quests = (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) || [];
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
        this.state.renome = (this.state.renome || 100) + bonusRenome;
        this.save();

        return {
            success: true,
            bonusXP,
            bonusTokens,
            bonusRenome
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
