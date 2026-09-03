/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   MasteryEngine: Cálculo e Atualização de Domínio Pedagógico
   ═══════════════════════════════════════════════════════════════ */

const MASTERY_TIERS = {
    UNRATED: { min: 0.00, max: 0.00, label: 'Não Avaliado' },
    BEGINNER: { min: 0.01, max: 0.29, label: 'Iniciante' },
    DEVELOPING: { min: 0.30, max: 0.49, label: 'Em Desenvolvimento' },
    FUNCTIONAL: { min: 0.50, max: 0.69, label: 'Funcional' },
    MASTERED: { min: 0.70, max: 0.84, label: 'Dominado' },
    CONSOLIDATED: { min: 0.85, max: 1.00, label: 'Consolidado' }
};

const DEFAULT_MASTERY_WEIGHTS = {
    accuracy: 0.40,
    consistency: 0.20,
    relativeSpeed: 0.15,
    hintIndependence: 0.15,
    difficultyBonus: 0.10
};

class MasteryEngine {
    constructor(weights = DEFAULT_MASTERY_WEIGHTS) {
        this.weights = { ...DEFAULT_MASTERY_WEIGHTS, ...weights };
    }

    /**
     * Retorna a faixa pedagógica para um score (0.00 a 1.00)
     */
    getTier(score) {
        const s = Math.max(0, Math.min(1, Number(score) || 0));
        if (s === 0) return MASTERY_TIERS.UNRATED;
        if (s <= 0.29) return MASTERY_TIERS.BEGINNER;
        if (s <= 0.49) return MASTERY_TIERS.DEVELOPING;
        if (s <= 0.69) return MASTERY_TIERS.FUNCTIONAL;
        if (s <= 0.84) return MASTERY_TIERS.MASTERED;
        return MASTERY_TIERS.CONSOLIDATED;
    }

    /**
     * Calcula o Mastery Score para um conceito com base no histórico de eventos
     * @param {Array<Object>} events - Lista de LearningEvents para aquele conceito
     * @param {number} estimatedTimeMs - Tempo esperado da atividade em ms
     */
    computeMastery(events = [], estimatedTimeMs = 60000) {
        if (!events || events.length === 0) {
            return 0.00;
        }

        const total = events.length;
        const correctEvents = events.filter(e => e.result);
        const correctCount = correctEvents.length;

        // 1. Acurácia ponderada por recência (eventos recentes têm peso maior)
        let weightedScore = 0;
        let totalRecencyWeight = 0;

        events.forEach((ev, idx) => {
            const recency = 1 + (idx / total); // 1.0 -> 2.0
            totalRecencyWeight += recency;
            if (ev.result) {
                weightedScore += recency;
            }
        });

        const accuracyScore = totalRecencyWeight > 0 ? (weightedScore / totalRecencyWeight) : 0;

        // 2. Consistência (streak recente de acertos)
        let recentStreak = 0;
        for (let i = events.length - 1; i >= 0; i--) {
            if (events[i].result) recentStreak++;
            else break;
        }
        const consistencyScore = Math.min(1.0, recentStreak / 3);

        // 3. Velocidade relativa (tempo real vs tempo esperado)
        let speedScores = [];
        correctEvents.forEach(ev => {
            const relTime = (ev.timeMs || estimatedTimeMs) / estimatedTimeMs;
            // relTime <= 0.75 -> 1.0; relTime >= 2.0 -> 0.2; linear interpolation
            let sScore = 1.0;
            if (relTime > 0.75) {
                sScore = Math.max(0.2, 1.0 - ((relTime - 0.75) / 1.25) * 0.8);
            }
            speedScores.push(sScore);
        });
        const relativeSpeedScore = speedScores.length > 0 
            ? (speedScores.reduce((a, b) => a + b, 0) / speedScores.length) 
            : 0.5;

        // 4. Independência de Dicas
        let hintScores = [];
        correctEvents.forEach(ev => {
            const hints = ev.hintsUsed || 0;
            if (hints === 0) hintScores.push(1.0);
            else if (hints === 1) hintScores.push(0.75);
            else if (hints === 2) hintScores.push(0.45);
            else hintScores.push(0.20);
        });
        const hintIndependenceScore = hintScores.length > 0 
            ? (hintScores.reduce((a, b) => a + b, 0) / hintScores.length) 
            : 0.5;

        // 5. Bônus por Dificuldade superada
        const diffMap = { easy: 0.5, medium: 0.75, hard: 0.9, expert: 1.0 };
        let diffScores = correctEvents.map(ev => diffMap[ev.difficulty] || 0.6);
        const difficultyScore = diffScores.length > 0 
            ? (diffScores.reduce((a, b) => a + b, 0) / diffScores.length) 
            : 0.5;

        // Cálculo Final Ponderado
        const rawScore = 
            (accuracyScore * this.weights.accuracy) +
            (consistencyScore * this.weights.consistency) +
            (relativeSpeedScore * this.weights.relativeSpeed) +
            (hintIndependenceScore * this.weights.hintIndependence) +
            (difficultyScore * this.weights.difficultyBonus);

        // Arredonda para 2 casas decimais (0.00 a 1.00)
        return Math.min(1.0, Math.max(0.01, Math.round(rawScore * 100) / 100));
    }

    /**
     * Aplica decaimento controlado (decay) se houver muito tempo sem prática e falha em revisão
     */
    applyDecay(currentMastery, daysSinceLastPractice, failedReview = false) {
        if (currentMastery <= 0.30) return currentMastery;

        let decay = 0;
        if (daysSinceLastPractice > 14) {
            decay += 0.05;
        } else if (daysSinceLastPractice > 7) {
            decay += 0.02;
        }

        if (failedReview) {
            decay += 0.08;
        }

        const newScore = Math.max(0.25, currentMastery - decay);
        return Math.round(newScore * 100) / 100;
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        MASTERY_TIERS,
        DEFAULT_MASTERY_WEIGHTS,
        MasteryEngine
    };
}
if (typeof window !== 'undefined') {
    window.MASTERY_TIERS = MASTERY_TIERS;
    window.DEFAULT_MASTERY_WEIGHTS = DEFAULT_MASTERY_WEIGHTS;
    window.MasteryEngine = MasteryEngine;
}
