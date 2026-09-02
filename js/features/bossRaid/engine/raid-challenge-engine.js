/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: CHALLENGE VALIDATION ENGINE
   Validação rápida de código no editor, temporizador e resolução HIT / MISS
   ═══════════════════════════════════════════════════════════════ */

class RaidChallengeEngine {
    constructor() {
        this.currentChallenge = null;
        this.currentActionType = null;
        this.timerSeconds = 0;
        this.timerInterval = null;
        this.onTickCallback = null;
        this.onTimeoutCallback = null;
    }

    /**
     * Inicia um desafio com contagem regressiva
     */
    startChallenge(chapterId, actionType, onTick, onTimeout) {
        this.stopTimer();
        this.currentActionType = actionType;
        this.currentChallenge = RaidChallengeManager.getChallenge(chapterId, actionType);
        this.timerSeconds = RAID_ACTION_TIMERS[actionType] || 20;
        this.onTickCallback = onTick;
        this.onTimeoutCallback = onTimeout;

        if (this.onTickCallback) {
            this.onTickCallback(this.timerSeconds);
        }

        this.timerInterval = setInterval(() => {
            this.timerSeconds--;
            if (this.onTickCallback) {
                this.onTickCallback(this.timerSeconds);
            }

            if (this.timerSeconds <= 0) {
                this.stopTimer();
                if (this.onTimeoutCallback) {
                    this.onTimeoutCallback();
                }
            }
        }, 1000);

        return this.currentChallenge;
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Valida o código submetido pelo jogador
     * Retorna { success: boolean, status: 'HIT' | 'MISS', reason?: string }
     */
    validateSubmission(code) {
        this.stopTimer();
        if (!this.currentChallenge) {
            return { success: false, status: 'MISS', reason: 'Nenhum desafio ativo.' };
        }

        const cleanCode = (code || '').trim();
        if (!cleanCode) {
            return { success: false, status: 'MISS', reason: 'Código em branco.' };
        }

        // 1. Validação pelo padrão regex da solução do desafio
        if (this.currentChallenge.solutionPattern) {
            const pass = this.currentChallenge.solutionPattern.test(cleanCode);
            if (pass) {
                return { success: true, status: 'HIT', challenge: this.currentChallenge };
            }
        }

        // 2. Fallback de validação com o MissionValidator caso exista no escopo global
        if (typeof MissionValidator !== 'undefined' && typeof CInterpreter !== 'undefined') {
            try {
                // Checa regras sintáticas básicas (chaves e main)
                if (cleanCode.includes('main') && (cleanCode.includes('{') && cleanCode.includes('}'))) {
                    // Executa interpretação básica
                    const interp = new CInterpreter();
                    const execResult = interp.run(cleanCode);
                    if (!execResult.error) {
                        return { success: true, status: 'HIT', challenge: this.currentChallenge };
                    }
                }
            } catch (e) {
                // Ignora erro de interpretação e considera MISS
            }
        }

        return {
            success: false,
            status: 'MISS',
            reason: 'A saída ou sintaxe não corresponde ao objetivo da ação.',
            challenge: this.currentChallenge
        };
    }
}

window.RaidChallengeEngine = RaidChallengeEngine;
