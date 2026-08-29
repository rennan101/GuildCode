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
            chapters: {},
            systems: {},
            tutorialStepsCompleted: {},
            chapterUnlocks: [0],
            prologueStep: 0,
            initialized: false,
            introCompleted: false,
            onboardingCompleted: false,
            storyViewed: {}
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
        // Calculate max theoretically possible XP/Level based on completed activities and chapters
        const completedActs = state.stats?.activitiesCompleted || 0;
        const completedChapters = Object.values(state.chapters || {}).filter(c => c && c.completed).length;
        const maxLevelAllowed = Math.max(1, Math.min(50, Math.floor(completedActs / 2) + completedChapters * 2 + 5));

        if (state.level > maxLevelAllowed) {
            console.warn('[Security] Level manipulado detectado. Reajustando para limite seguro.');
            state.level = maxLevelAllowed;
            state.xp = 0;
        }
        if (state.xp < 0 || state.xp > 50000) {
            state.xp = 0;
        }
        // Ensure chapter unlocks don't contain invalid IDs (support 0..20)
        if (Array.isArray(state.chapterUnlocks)) {
            state.chapterUnlocks = state.chapterUnlocks.filter(id => Number.isInteger(id) && id >= 0 && id <= 20);
            if (!state.chapterUnlocks.includes(0)) state.chapterUnlocks.unshift(0);
        }
        return state;
    }

    load() {
        // Only loads from memory/defaults initially. Real user state comes strictly from Firebase per user.
        return false;
    }

    save() {
        this.state = this._sanitizeState(this.state);
        // Direct cloud sync whenever save() is triggered
        if (typeof authManager !== 'undefined' && authManager.isSignedIn()) {
            this.saveToCloud();
        }
    }

    resetGame() {
        this.state = this.getDefaultState();
        if (typeof authManager !== 'undefined' && authManager.isSignedIn()) {
            this.saveToCloud();
        }
    }

    isIntroCompleted() {
        return !!this.state.introCompleted;
    }

    completeIntro() {
        this.state.introCompleted = true;
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
        this.state.xp += amount;
        let leveledUp = false;
        while (this.state.xp >= this.getXPToNextLevel()) {
            this.state.xp -= this.getXPToNextLevel();
            this.state.level++;
            leveledUp = true;
        }
        this.save();
        return leveledUp;
    }

    getXPToNextLevel() {
        return this.state.level * 100;
    }

    getXPPercent() {
        return Math.min(100, Math.round((this.state.xp / this.getXPToNextLevel()) * 100));
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

    // ─── FIRESTORE SYNC ───
    async loadFromCloud() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) {
            this.state = this.getDefaultState();
            return false;
        }
        try {
            const cloudData = await authManager.loadProgress();
            if (cloudData && cloudData.initialized) {
                this.state = { ...this.getDefaultState(), ...this._sanitizeState(cloudData) };
                return true;
            } else {
                // Nova conta ou sem progresso: começar do zero
                this.state = this.getDefaultState();
                const userName = authManager.getDisplayName();
                if (userName) {
                    this.state.playerName = userName;
                }
                return false;
            }
        } catch (e) {
            console.warn('[Engine] Cloud load failed:', e);
            this.state = this.getDefaultState();
        }
        return false;
    }

    async saveToCloud() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) return;
        try {
            await authManager.saveProgress(this._sanitizeState(this.state));
        } catch (e) {
            console.warn('[Engine] Cloud save failed:', e);
        }
    }
}
