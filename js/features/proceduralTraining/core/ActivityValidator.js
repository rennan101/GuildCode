/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   ActivityValidator: Validação Estrutural, Pedagógica e Executável
   ═══════════════════════════════════════════════════════════════ */

class ActivityValidator {
    constructor(curriculumGraph, interpreter = null) {
        this.graph = curriculumGraph;
        this.interpreter = interpreter || (typeof CInterpreter !== 'undefined' ? new CInterpreter() : null);
    }

    /**
     * Validação Estrutural Obrigatória (Seção 24)
     */
    validateStructure(activity) {
        const requiredFields = [
            'id', 'title', 'description', 'starterCode',
            'hints', 'tests', 'validator', 'topic',
            'concepts', 'difficulty', 'seed', 'generatorVersion'
        ];

        const missing = [];
        for (const field of requiredFields) {
            if (activity[field] === undefined || activity[field] === null) {
                missing.push(field);
            }
        }

        if (missing.length > 0) {
            return {
                valid: false,
                reason: `Campos estruturais obrigatórios ausentes: ${missing.join(', ')}`
            };
        }

        if (!Array.isArray(activity.concepts) || activity.concepts.length === 0) {
            return {
                valid: false,
                reason: 'A atividade deve conter ao menos 1 conceito associado.'
            };
        }

        if (!Array.isArray(activity.tests) || activity.tests.length === 0) {
            return {
                valid: false,
                reason: 'A atividade deve conter ao menos 1 caso de teste.'
            };
        }

        return { valid: true };
    }

    /**
     * Validação Pedagógica (Seção 25)
     */
    validatePedagogy(activity, allowedConcepts = []) {
        if (!activity || !activity.concepts) {
            return { valid: false, reason: 'Atividade sem conceitos definidos.' };
        }

        // Verifica se todos os conceitos pertencem ao currículo
        for (const concept of activity.concepts) {
            let existsInCurriculum = false;
            for (const fKey in this.graph.floors) {
                if (this.graph.floors[fKey].concepts.includes(concept)) {
                    existsInCurriculum = true;
                    break;
                }
            }
            if (!existsInCurriculum) {
                return {
                    valid: false,
                    reason: `Conceito fora do currículo permitido: "${concept}".`
                };
            }

            // Verifica se está desbloqueado nos conceitos permitidos (se lista fornecida)
            if (allowedConcepts.length > 0 && !allowedConcepts.includes(concept)) {
                return {
                    valid: false,
                    reason: `Conceito "${concept}" não atende aos pré-requisitos atuais do jogador.`
                };
            }
        }

        return { valid: true };
    }

    /**
     * Validação Executável com Código Solução (Seção 26)
     */
    validateExecutable(activity, referenceSolutionCode) {
        if (!referenceSolutionCode) {
            // Se não houver código de referência, apenas valida estrutura do starterCode
            return { valid: true };
        }

        if (!this.interpreter) {
            return { valid: true, warning: 'Compilador C indisponível para validação executável.' };
        }

        try {
            const tests = activity.tests || [];
            for (let i = 0; i < tests.length; i++) {
                const t = tests[i];
                const input = t.input || '';
                const exec = this.interpreter.execute(referenceSolutionCode, input);

                if (exec.errors && exec.errors.length > 0) {
                    return {
                        valid: false,
                        reason: `Erro de compilação da solução de referência no teste #${i + 1}: ${exec.errors.join('; ')}`
                    };
                }

                if (t.expected) {
                    const normOut = String(exec.output || '').trim();
                    const normExp = String(t.expected).trim();
                    if (!normOut.includes(normExp)) {
                        return {
                            valid: false,
                            reason: `Solução de referência falhou no teste #${i + 1}. Esperado: "${normExp}", Obtido: "${normOut}"`
                        };
                    }
                }
            }
            return { valid: true };
        } catch (e) {
            return {
                valid: false,
                reason: `Exceção durante validação executável: ${e.message}`
            };
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = ActivityValidator;
}
if (typeof window !== 'undefined') {
    window.ActivityValidator = ActivityValidator;
}
