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
        this.onTickCallback = onTick;
        this.onTimeoutCallback = onTimeout;

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
     * Retorna { success: boolean, status: 'HIT' | 'MISS', reason?: string, testResults?: Array }
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

        // 1. Validação com MissionValidator caso haja testes ou rawActivity
        if (typeof MissionValidator !== 'undefined' && this.currentChallenge.tests && this.currentChallenge.tests.length > 0) {
            try {
                const validator = new MissionValidator();
                const validation = validator.validateActivity(cleanCode, this.currentChallenge.rawActivity || this.currentChallenge);
                if (validation.pass) {
                    return { success: true, status: 'HIT', challenge: this.currentChallenge, validation };
                }
            } catch (e) {
                console.warn('Raid challenge validation error:', e);
            }
        }

        // 2. Validação direta pela função validator da atividade
        if (typeof this.currentChallenge.validator === 'function') {
            try {
                let output = '';
                const isCSharp = (typeof app !== 'undefined' && app.ui && typeof app.ui.isCSharpWorld === 'function' && app.ui.isCSharpWorld(cleanCode)) ||
                                 (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                                 (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity') ||
                                 (this.currentChallenge && String(this.currentChallenge.id || '').startsWith('cs_')) ||
                                 (/using\s+UnityEngine|MonoBehaviour|Debug\.Log/.test(cleanCode));

                if (isCSharp && typeof window !== 'undefined' && typeof window.CSharpInterpreter === 'function') {
                    const csInterp = new window.CSharpInterpreter();
                    const r = csInterp.execute(cleanCode);
                    output = Array.isArray(r.output) ? r.output.join('\n') : String(r.output || '');
                } else if (typeof CInterpreter !== 'undefined') {
                    const interp = new CInterpreter();
                    const testIn = (this.currentChallenge.tests && this.currentChallenge.tests[0]) ? this.currentChallenge.tests[0].input : '';
                    const r = interp.execute(cleanCode, testIn);
                    output = r.output || '';
                }
                const vRes = this.currentChallenge.validator(cleanCode, output);
                if (vRes && (vRes.pass || vRes.valid)) {
                    return { success: true, status: 'HIT', challenge: this.currentChallenge };
                }
            } catch (e) {}
        }

        // 3. Validação pelo padrão regex da solução do desafio
        if (this.currentChallenge.solutionPattern) {
            const pass = this.currentChallenge.solutionPattern.test(cleanCode);
            if (pass) {
                return { success: true, status: 'HIT', challenge: this.currentChallenge };
            }
        }

        // 4. Fallback de validação com CSharpInterpreter ou CInterpreter caso exista no escopo global
        const isCSharpFallback = (typeof app !== 'undefined' && app.ui && typeof app.ui.isCSharpWorld === 'function' && app.ui.isCSharpWorld(cleanCode)) ||
                                 (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                                 (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity') ||
                                 (this.currentChallenge && String(this.currentChallenge.id || '').startsWith('cs_')) ||
                                 (/using\s+UnityEngine|MonoBehaviour|Debug\.Log/.test(cleanCode));

        if (isCSharpFallback && typeof window !== 'undefined' && typeof window.CSharpInterpreter === 'function') {
            try {
                const csInterp = new window.CSharpInterpreter();
                const execResult = csInterp.execute(cleanCode);
                if (!execResult.errors || execResult.errors.length === 0) {
                    return { success: true, status: 'HIT', challenge: this.currentChallenge };
                }
            } catch (e) {}
        } else if (typeof CInterpreter !== 'undefined') {
            try {
                if (cleanCode.includes('main') && (cleanCode.includes('{') && cleanCode.includes('}'))) {
                    const interp = new CInterpreter();
                    const execResult = interp.execute ? interp.execute(cleanCode) : interp.run(cleanCode);
                    if (!execResult.errors || execResult.errors.length === 0) {
                        return { success: true, status: 'HIT', challenge: this.currentChallenge };
                    }
                }
            } catch (e) {}
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

