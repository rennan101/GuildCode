/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   DifficultyEngine: Gerenciamento e Adaptação de Dificuldade
   ═══════════════════════════════════════════════════════════════ */

const PTS_DIFFICULTY_LEVELS = ['easy', 'medium', 'hard', 'expert'];

const PTS_DIFFICULTY_WEIGHTS = {
    easy: 1,
    medium: 2,
    hard: 3,
    expert: 4
};

const PTS_COMPLEXITY_SPECS = {
    easy: {
        maxConcepts: 1,
        maxVariables: 2,
        requiresInput: false,
        requiresComplexLoops: false,
        estimatedTimeSeconds: 45,
        baseXp: 50
    },
    medium: {
        maxConcepts: 2,
        maxVariables: 4,
        requiresInput: true,
        requiresComplexLoops: false,
        estimatedTimeSeconds: 90,
        baseXp: 100
    },
    hard: {
        maxConcepts: 4,
        maxVariables: 6,
        requiresInput: true,
        requiresComplexLoops: true,
        estimatedTimeSeconds: 150,
        baseXp: 180
    },
    expert: {
        maxConcepts: 6,
        maxVariables: 10,
        requiresInput: true,
        requiresComplexLoops: true,
        estimatedTimeSeconds: 240,
        baseXp: 300
    }
};

class DifficultyEngine {
    constructor(guildConfig = {}) {
        this.guildDifficulty = guildConfig.bossDifficulty || 'medium';
        this.minDifficulty = guildConfig.minDifficulty || 'easy';
        this.maxDifficulty = guildConfig.maxDifficulty || this.guildDifficulty;
        this.allowIndividualAdaptation = guildConfig.allowIndividualAdaptation !== false;
    }

    /**
     * Valida se uma string é um nível de dificuldade válido
     */
    isValidDifficulty(diff) {
        return PTS_DIFFICULTY_LEVELS.includes(String(diff).toLowerCase());
    }

    /**
     * Calcula a dificuldade adaptada para uma atividade do jogador
     * @param {number} playerMastery - Pontuação de domínio do jogador para o tópico/conceito (0.00 a 1.00)
     * @param {number} stage - Fase da Boss Battle (1 a 5)
     */
    resolveActivityDifficulty(playerMastery = 0.5, stage = 1) {
        if (!this.allowIndividualAdaptation) {
            return this.guildDifficulty;
        }

        const guildWeight = PTS_DIFFICULTY_WEIGHTS[this.guildDifficulty] || 2;
        const minWeight = PTS_DIFFICULTY_WEIGHTS[this.minDifficulty] || 1;
        const maxWeight = Math.min(PTS_DIFFICULTY_WEIGHTS[this.maxDifficulty] || guildWeight, guildWeight);

        // Ajuste baseado em domínio do jogador:
        // mastery < 0.30 -> reduz em 1 nível se permitido
        // mastery > 0.80 -> pode atingir maxWeight
        let targetWeight = guildWeight;

        if (playerMastery < 0.35) {
            targetWeight = Math.max(minWeight, guildWeight - 1);
        } else if (playerMastery < 0.60) {
            targetWeight = Math.max(minWeight, Math.min(guildWeight, targetWeight));
        } else {
            // Alta maestria
            targetWeight = Math.min(maxWeight, guildWeight);
        }

        // Fases iniciais (1 - Aquecimento) podem ser mais acessíveis
        if (stage === 1 && targetWeight > 1 && playerMastery < 0.70) {
            targetWeight = Math.max(minWeight, targetWeight - 1);
        }

        // Garante que nunca ultrapasse a dificuldade global da Guilda
        targetWeight = Math.min(targetWeight, guildWeight);

        return PTS_DIFFICULTY_LEVELS[targetWeight - 1] || 'easy';
    }

    getComplexitySpec(difficulty) {
        const diff = (difficulty || 'easy').toLowerCase();
        return PTS_COMPLEXITY_SPECS[diff] || PTS_COMPLEXITY_SPECS.easy;
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        PTS_DIFFICULTY_LEVELS,
        PTS_DIFFICULTY_WEIGHTS,
        PTS_COMPLEXITY_SPECS,
        DifficultyEngine
    };
}
if (typeof window !== 'undefined') {
    window.PTS_DIFFICULTY_LEVELS = PTS_DIFFICULTY_LEVELS;
    window.PTS_DIFFICULTY_WEIGHTS = PTS_DIFFICULTY_WEIGHTS;
    window.PTS_COMPLEXITY_SPECS = PTS_COMPLEXITY_SPECS;
    window.DifficultyEngine = DifficultyEngine;
}
