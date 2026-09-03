/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   LearningEvents: Registro Estruturado de Eventos e Classificação de Erros
   ═══════════════════════════════════════════════════════════════ */

const PTS_ERROR_TYPES = [
    'syntax_error',
    'compile_error',
    'runtime_error',
    'wrong_output',
    'wrong_algorithm',
    'wrong_type',
    'wrong_condition',
    'wrong_loop',
    'wrong_index',
    'wrong_pointer',
    'wrong_memory',
    'wrong_string',
    'wrong_struct',
    'wrong_file_operation',
    'timeout',
    'empty_submission'
];

class LearningEvents {
    /**
     * Classifica o erro a partir da resposta do compilador / validador / código
     */
    static classifyError(execResult, validatorResult, code) {
        if (!code || code.trim().length === 0) {
            return 'empty_submission';
        }

        if (execResult && execResult.errors && execResult.errors.length > 0) {
            const errStr = execResult.errors.join(' ').toLowerCase();
            if (errStr.includes('syntax') || errStr.includes('expected') || errStr.includes('missing')) {
                return 'syntax_error';
            }
            if (errStr.includes('pointer') || errStr.includes('desreferencia') || errStr.includes('*') || errStr.includes('&')) {
                return 'wrong_pointer';
            }
            if (errStr.includes('type') || errStr.includes('tipo')) {
                return 'wrong_type';
            }
            return 'compile_error';
        }

        if (validatorResult && !validatorResult.pass) {
            const valErr = (validatorResult.errors || []).join(' ').toLowerCase();
            if (valErr.includes('indice') || valErr.includes('index') || valErr.includes('fora dos limites')) {
                return 'wrong_index';
            }
            if (valErr.includes('string') || valErr.includes('\\0')) {
                return 'wrong_string';
            }
            if (valErr.includes('struct')) {
                return 'wrong_struct';
            }
            if (valErr.includes('condicao') || valErr.includes('if') || valErr.includes('else')) {
                return 'wrong_condition';
            }
            if (valErr.includes('loop') || valErr.includes('for') || valErr.includes('while')) {
                return 'wrong_loop';
            }
            return 'wrong_output';
        }

        return 'wrong_algorithm';
    }

    /**
     * Cria um objeto imutável de LearningEvent
     */
    static createEvent({
        sessionId,
        playerId,
        guildId = 'default',
        activityId,
        generatorVersion = '1.0.0',
        seed = 0,
        topic,
        concepts = [],
        difficulty = 'medium',
        result = false,
        attempts = 1,
        timeMs = 0,
        hintsUsed = 0,
        errorType = null,
        compilerErrors = [],
        runtimeErrors = [],
        startedAt = Date.now(),
        submittedAt = Date.now()
    }) {
        return {
            eventId: `evt_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
            sessionId: String(sessionId || 'session_default'),
            playerId: String(playerId),
            guildId: String(guildId),
            activityId: String(activityId),
            generatorVersion: String(generatorVersion),
            seed: Number(seed),
            topic: String(topic),
            concepts: Array.isArray(concepts) ? [...concepts] : [concepts],
            difficulty: String(difficulty),
            result: Boolean(result),
            attempts: Number(attempts),
            timeMs: Number(timeMs),
            hintsUsed: Number(hintsUsed),
            errorType: errorType ? String(errorType) : (result ? null : 'wrong_output'),
            compilerErrors: Array.isArray(compilerErrors) ? compilerErrors : [],
            runtimeErrors: Array.isArray(runtimeErrors) ? runtimeErrors : [],
            startedAt: Number(startedAt),
            submittedAt: Number(submittedAt)
        };
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        PTS_ERROR_TYPES,
        LearningEvents
    };
}
if (typeof window !== 'undefined') {
    window.PTS_ERROR_TYPES = PTS_ERROR_TYPES;
    window.LearningEvents = LearningEvents;
}
