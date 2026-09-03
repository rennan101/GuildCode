/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   BossDifficultyConfig & BossTrainingManager: Fases e Adaptação em Raids
   ═══════════════════════════════════════════════════════════════ */

const BOSS_STAGE_TYPES = {
    1: { name: 'Aquecimento', conceptFocus: 'basic', supportLevel: 'high' },
    2: { name: 'Conceito Principal', conceptFocus: 'core', supportLevel: 'medium' },
    3: { name: 'Combinação', conceptFocus: 'combined', supportLevel: 'medium' },
    4: { name: 'Desafio', conceptFocus: 'challenge', supportLevel: 'low' },
    5: { name: 'Finalização', conceptFocus: 'mastery', supportLevel: 'none' }
};

class BossDifficultyConfig {
    constructor(guildData = {}) {
        this.guildId = guildData.guildId || 'guild_default';
        this.bossDifficulty = guildData.bossDifficulty || 'medium';
        this.minDifficulty = guildData.minDifficulty || 'easy';
        this.maxDifficulty = guildData.maxDifficulty || this.bossDifficulty;
        this.adaptiveLearning = guildData.adaptiveLearning !== false;
        this.allowIndividualAdaptation = guildData.allowIndividualAdaptation !== false;
        this.configVersion = guildData.configVersion || 1;
        this.auditLogs = guildData.auditLogs || [];
    }

    /**
     * Atualização segura de dificuldade por professor ou admin (Seção 32)
     */
    updateDifficulty(newDifficulty, userRole, changedBy = 'teacher') {
        if (userRole !== 'teacher' && userRole !== 'admin') {
            throw new Error('[PTS Security] Apenas professores ou administradores podem alterar a dificuldade da Guilda.');
        }

        const valid = ['easy', 'medium', 'hard', 'expert'];
        if (!valid.includes(newDifficulty)) {
            throw new Error(`[PTS] Dificuldade inválida: ${newDifficulty}`);
        }

        const logEntry = {
            guildId: this.guildId,
            changedBy,
            oldDifficulty: this.bossDifficulty,
            newDifficulty,
            timestamp: Date.now(),
            configVersion: this.configVersion + 1
        };

        this.bossDifficulty = newDifficulty;
        this.configVersion++;
        this.auditLogs.push(logEntry);

        return logEntry;
    }
}

class BossTrainingManager {
    constructor({ orchestrator, difficultyConfig }) {
        this.orchestrator = orchestrator;
        this.config = difficultyConfig;
        this.activeSessions = new Map();
    }

    /**
     * Inicia uma nova sessão de Boss Battle (Seção 34)
     */
    startBossSession({ playerId, guildId, chapterId }) {
        const sessionId = `boss_sess_${Date.now()}_${playerId}`;
        const session = {
            sessionId,
            playerId,
            guildId: guildId || this.config.guildId,
            configVersion: this.config.configVersion,
            bossDifficulty: this.config.bossDifficulty,
            chapterId: Number(chapterId) || 0,
            currentStage: 1,
            totalStages: 5,
            startedAt: Date.now(),
            endedAt: null,
            status: 'ACTIVE',
            activitiesCompleted: 0,
            activitiesCorrect: 0,
            conceptsPracticed: [],
            conceptsImproved: []
        };

        this.activeSessions.set(sessionId, session);
        return session;
    }

    /**
     * Gera a próxima atividade adaptada para a fase do Boss
     */
    getNextStageActivity(sessionId, playerProfile, completedTopics = []) {
        const session = this.activeSessions.get(sessionId);
        if (!session || session.status !== 'ACTIVE') {
            throw new Error(`[PTS] Sessão de Boss ${sessionId} inativa ou não encontrada.`);
        }

        const stage = session.currentStage;
        const seed = Date.now() + stage;

        const activity = this.orchestrator.generateActivity({
            playerProfile,
            completedTopics,
            seed,
            targetFloor: session.chapterId,
            stage
        });

        activity.stageInfo = {
            stageNumber: stage,
            totalStages: session.totalStages,
            stageName: BOSS_STAGE_TYPES[stage]?.name || `Fase ${stage}`
        };

        return activity;
    }

    /**
     * Avança a fase do Boss ou finaliza a sessão
     */
    advanceStage(sessionId, wasSuccess = true) {
        const session = this.activeSessions.get(sessionId);
        if (!session) return null;

        session.activitiesCompleted++;
        if (wasSuccess) {
            session.activitiesCorrect++;
        }

        if (session.currentStage < session.totalStages) {
            session.currentStage++;
        } else {
            session.status = 'COMPLETED';
            session.endedAt = Date.now();
        }

        return session;
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        BOSS_STAGE_TYPES,
        BossDifficultyConfig,
        BossTrainingManager
    };
}
if (typeof window !== 'undefined') {
    window.BOSS_STAGE_TYPES = BOSS_STAGE_TYPES;
    window.BossDifficultyConfig = BossDifficultyConfig;
    window.BossTrainingManager = BossTrainingManager;
}
