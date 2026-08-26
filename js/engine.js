/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Game Engine
   State management, progression, and localStorage persistence.
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
            stats: {
                executions: 0,
                activitiesCompleted: 0,
                errorsFixed: 0
            },
            chapters: {},
            systems: {},
            tutorialStepsCompleted: {},
            chapterUnlocks: [1],
            prologueStep: 0,
            initialized: false,
            introCompleted: false,
            storyViewed: {}
        };
    }

    load() {
        try {
            const saved = localStorage.getItem('guildcode_save');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.state = { ...this.getDefaultState(), ...parsed };
                return true;
            }
        } catch (e) {
            console.warn('Failed to load save:', e);
        }
        return false;
    }

    save() {
        try {
            localStorage.setItem('guildcode_save', JSON.stringify(this.state));
        } catch (e) {
            console.warn('Failed to save:', e);
        }
    }

    resetGame() {
        this.state = this.getDefaultState();
        this.save();
    }

    isIntroCompleted() {
        return !!this.state.introCompleted;
    }

    completeIntro() {
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

    getPlayerName() {
        return this.state.playerName;
    }

    // ─── XP & LEVELS ───
    getXPForLevel(level) {
        return 100 + (level - 1) * 50;
    }

    getXPToNextLevel() {
        return this.getXPForLevel(this.state.level);
    }

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

    getLevel() { return this.state.level; }
    getXP() { return this.state.xp; }
    getXPPercent() {
        return Math.min(100, (this.state.xp / this.getXPToNextLevel()) * 100);
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
        let unlocked = Object.values(this.state.systems).filter(s => s).length;
        return Math.round((unlocked / 15) * 100);
    }

    // ─── CHAPTERS ───
    isChapterUnlocked(chapterId) {
        // Chapter 1 is always unlocked
        if (chapterId === 1) return true;
        // Check admin-controlled unlocks
        const unlocks = this.state.chapterUnlocks || [1];
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
        let system = GUILD_SYSTEMS.find(s => s.chapter === chapterId);
        if (system) {
            this.state.systems[system.id] = true;
            this.save();
        }
    }

    isSystemUnlocked(systemId) {
        return !!this.state.systems[systemId];
    }

    getUnlockedSystemsCount() {
        return Object.values(this.state.systems).filter(s => s).length;
    }

    getCompletedChaptersCount() {
        return Object.values(this.state.chapters).filter(c => c.completed).length;
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
        this.state.chapterUnlocks = [1, ...unlocks.filter(id => id !== 1)];
        this.save();
    }

    getChapterUnlocks() {
        return this.state.chapterUnlocks || [1];
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
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) return false;
        try {
            const cloudData = await authManager.loadProgress();
            if (cloudData) {
                this.state = { ...this.getDefaultState(), ...cloudData };
                this.save(); // also persist to localStorage
                return true;
            }
        } catch (e) {
            console.warn('[Engine] Cloud load failed:', e);
        }
        return false;
    }

    async saveToCloud() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) return;
        try {
            await authManager.saveProgress(this.state);
        } catch (e) {
            console.warn('[Engine] Cloud save failed:', e);
        }
    }
}
