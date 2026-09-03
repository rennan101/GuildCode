/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   PlayerLearningProfile: Gerenciador de Perfil e Histórico do Jogador
   ═══════════════════════════════════════════════════════════════ */

class PlayerLearningProfile {
    constructor(playerId, profileData = {}) {
        this.playerId = String(playerId || 'guest_player');
        this.totalActivities = profileData.totalActivities || 0;
        this.totalCorrect = profileData.totalCorrect || 0;
        this.totalErrors = profileData.totalErrors || 0;
        this.averageTimeMs = profileData.averageTimeMs || 0;
        this.averageAttempts = profileData.averageAttempts || 0;
        this.averageHints = profileData.averageHints || 0;
        
        // Estrutura por conceito: { [conceptId]: { mastery, attempts, correct, errors, averageTimeMs, averageHints, lastPracticedAt, streak, reviewInterval } }
        this.concepts = profileData.concepts || {};

        // Anti-repetição e histórico recente
        this.recentActivityHashes = profileData.recentActivityHashes || [];
        this.recentTemplates = profileData.recentTemplates || [];
        this.recentParameters = profileData.recentParameters || [];
        this.learningEvents = profileData.learningEvents || [];
    }

    /**
     * Obtém as métricas de um conceito específico
     */
    getConceptData(conceptId) {
        if (!this.concepts[conceptId]) {
            this.concepts[conceptId] = {
                mastery: 0.00,
                attempts: 0,
                correct: 0,
                errors: 0,
                averageTimeMs: 0,
                averageHints: 0,
                lastPracticedAt: null,
                streak: 0,
                reviewInterval: 1 // em sessões
            };
        }
        return this.concepts[conceptId];
    }

    /**
     * Registra o resultado de uma tentativa (Learning Event) e atualiza o perfil
     */
    recordAttempt(event, masteryEngine = null) {
        this.totalActivities++;
        if (event.result) {
            this.totalCorrect++;
        } else {
            this.totalErrors++;
        }

        this.learningEvents.push(event);
        if (this.learningEvents.length > 50) {
            this.learningEvents.shift(); // Limite em memória
        }

        // Atualiza métricas por conceito envolvido
        const concepts = event.concepts || [event.topic];
        concepts.forEach(c => {
            const data = this.getConceptData(c);
            data.attempts += event.attempts || 1;
            if (event.result) {
                data.correct++;
                data.streak = (data.streak || 0) + 1;
                // Aumenta intervalo de repetição espaçada se dominado
                if (data.mastery >= 0.70) {
                    data.reviewInterval = Math.min(8, (data.reviewInterval || 1) * 2);
                }
            } else {
                data.errors++;
                data.streak = 0;
                // Reduz intervalo em caso de erro
                data.reviewInterval = 1;
            }

            data.averageTimeMs = data.averageTimeMs 
                ? Math.round((data.averageTimeMs * 0.7) + ((event.timeMs || 0) * 0.3)) 
                : (event.timeMs || 0);

            data.averageHints = data.averageHints
                ? (data.averageHints * 0.7) + ((event.hintsUsed || 0) * 0.3)
                : (event.hintsUsed || 0);

            data.lastPracticedAt = event.submittedAt || Date.now();

            // Recalcula Mastery Score
            if (masteryEngine) {
                const conceptEvents = this.learningEvents.filter(e => (e.concepts || []).includes(c) || e.topic === c);
                data.mastery = masteryEngine.computeMastery(conceptEvents, 60000);
            }
        });

        // Atualiza anti-repetição
        if (event.activityId) {
            this.recentActivityHashes.push(event.activityId);
            if (this.recentActivityHashes.length > 10) this.recentActivityHashes.shift();
        }
    }

    /**
     * Verifica se uma atividade é muito repetitiva com base no histórico recente
     */
    isTooSimilar(templateId, paramHash) {
        if (this.recentTemplates.includes(templateId) && this.recentParameters.includes(paramHash)) {
            return true;
        }
        return false;
    }

    recordTemplateUse(templateId, paramHash) {
        this.recentTemplates.push(templateId);
        if (this.recentTemplates.length > 8) this.recentTemplates.shift();

        if (paramHash) {
            this.recentParameters.push(paramHash);
            if (this.recentParameters.length > 8) this.recentParameters.shift();
        }
    }

    /**
     * Exporta o estado para persistência serializável
     */
    toJSON() {
        return {
            playerId: this.playerId,
            totalActivities: this.totalActivities,
            totalCorrect: this.totalCorrect,
            totalErrors: this.totalErrors,
            averageTimeMs: this.averageTimeMs,
            averageAttempts: this.averageAttempts,
            averageHints: this.averageHints,
            concepts: this.concepts,
            recentActivityHashes: this.recentActivityHashes,
            recentTemplates: this.recentTemplates,
            recentParameters: this.recentParameters
        };
    }
}

if (typeof module !== 'undefined') {
    module.exports = PlayerLearningProfile;
}
if (typeof window !== 'undefined') {
    window.PlayerLearningProfile = PlayerLearningProfile;
}
