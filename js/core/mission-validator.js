/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Mission Validator & Anti-Cheat Dynamic Test Engine
   Executes code with static and random dynamic test cases to prevent hardcoding.
   ═══════════════════════════════════════════════════════════════ */

class MissionValidator {
    constructor(interpreter) {
        this.interpreter = interpreter;
    }

    /**
     * Normaliza strings para comparação tolerante a espaços e quebras de linha
     */
    normalize(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/\r\n/g, '\n')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');
    }

    /**
     * Validação estática de regras no código fonte (palavras-chave e padrões)
     */
    validateCodeRules(code, validationRules = {}) {
        const errors = [];
        const required = validationRules?.requiredPatterns || [];
        const forbidden = validationRules?.forbiddenPatterns || [];

        // Remove comentários e strings para evitar falsos positivos
        const cleanCode = (code || '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*/g, '');

        for (const req of required) {
            if (!code.includes(req)) {
                errors.push(`Seu código precisa utilizar o recurso / padrão: \`${req}\``);
            }
        }

        for (const forb of forbidden) {
            if (cleanCode.includes(forb)) {
                errors.push(`O uso de \`${forb}\` é estritamente proibido nesta missão!`);
            }
        }

        return {
            pass: errors.length === 0,
            errors
        };
    }

    /**
     * Gera e executa casos de testes dinâmicos e randômicos para evitar hardcode (Anti-Cheat)
     */
    generateDynamicTests(activity) {
        const tests = [];
        const staticTests = activity.tests || [];
        // Apenas gera testes dinâmicos com stdin se a atividade tiver casos de teste que usem stdin
        const hasInputInStatic = staticTests.some(t => t.input && String(t.input).trim().length > 0);
        if (!hasInputInStatic) {
            return tests;
        }

        const title = (activity.title || '').toLowerCase();
        const desc = (activity.description || '').toLowerCase();

        // 1. Dobro de um número (ex: ch0_a2)
        if (desc.includes('dobro') && (desc.includes('scanf') || desc.includes('leia'))) {
            for (let i = 0; i < 2; i++) {
                const randVal = Math.floor(Math.random() * 800) + 13;
                tests.push({
                    input: `${randVal}\n`,
                    expected: `${randVal * 2}`,
                    description: `[ANTI-CHEAT] Entrada aleatória: ${randVal}`,
                    isDynamic: true
                });
            }
        }
        // 2. Soma de 2 inteiros
        else if (desc.includes('soma') && desc.includes('dois') && (desc.includes('scanf') || desc.includes('leia'))) {
            for (let i = 0; i < 2; i++) {
                const a = Math.floor(Math.random() * 300) + 7;
                const b = Math.floor(Math.random() * 300) + 11;
                tests.push({
                    input: `${a} ${b}\n`,
                    expected: `${a + b}`,
                    description: `[ANTI-CHEAT] Soma aleatória: ${a} e ${b}`,
                    isDynamic: true
                });
            }
        }
        // 3. Maior entre 2 números
        else if (desc.includes('maior') && (desc.includes('dois') || desc.includes('scanf'))) {
            const a = Math.floor(Math.random() * 500) + 1;
            const b = a + Math.floor(Math.random() * 50) + 1;
            tests.push({
                input: `${a} ${b}\n`,
                expected: `${b}`,
                description: `[ANTI-CHEAT] Maior valor: ${a} vs ${b}`,
                isDynamic: true
            });
        }

        return tests;
    }

    /**
     * Executa a bateria completa de testes de uma atividade
     */
    validateActivity(code, activity) {
        const ruleCheck = this.validateCodeRules(code, activity.validationRules);
        if (!ruleCheck.pass) {
            return {
                pass: false,
                testResults: [],
                errors: ruleCheck.errors
            };
        }

        const staticTests = activity.tests || [];
        const dynamicTests = this.generateDynamicTests(activity);
        const allTests = [...staticTests, ...dynamicTests];

        if (allTests.length === 0) {
            // Atividade sem testes específicos, apenas compilação e execução
            const exec = this.interpreter.execute(code, '');
            if (exec.errors && exec.errors.length > 0) {
                return {
                    pass: false,
                    testResults: [],
                    errors: [`Erro de compilação: ${exec.errors.join('; ')}`]
                };
            }
            return {
                pass: true,
                testResults: [{ description: 'Execução concluída com sucesso', pass: true }],
                errors: []
            };
        }

        let allPassed = true;
        const testResults = [];
        const errors = [];

        for (let i = 0; i < allTests.length; i++) {
            const t = allTests[i];
            const input = t.input || '';
            const isCSharp = (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                             (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
            
            let exec;
            if (isCSharp && typeof window.CSharpInterpreter === 'function') {
                const csInterp = new window.CSharpInterpreter();
                exec = csInterp.executeFormatted ? csInterp.executeFormatted(code) : csInterp.execute(code);
            } else {
                exec = this.interpreter.execute(code, input);
            }

            if (exec.errors && exec.errors.length > 0) {
                allPassed = false;
                testResults.push({
                    description: t.description || `Caso de Teste #${i + 1}`,
                    pass: false,
                    expected: t.expected,
                    got: exec.errors.join('; '),
                    isError: true,
                    isDynamic: !!t.isDynamic
                });
                errors.push(`Erro de compilação no teste #${i + 1}: ${exec.errors.join('; ')}`);
                break; // Interrompe em caso de erro de compilação
            }

            const normOutput = this.normalize(exec.output);
            const normExpected = this.normalize(t.expected);
            
            // Match flexível: contém o valor esperado
            const pass = normOutput.includes(normExpected);

            if (!pass) {
                allPassed = false;
                if (!t.isDynamic) {
                    errors.push(`Saída incorreta no teste: "${t.description}". Esperado: "${t.expected}", Obtido: "${exec.output.trim()}"`);
                } else {
                    errors.push(`Falhou no teste anti-cheat dinâmico com entrada aleatória (${t.input.trim()}). Verifique a lógica do algoritmo!`);
                }
            }

            testResults.push({
                description: t.description || `Caso de Teste #${i + 1}`,
                pass,
                expected: t.expected,
                got: exec.output.trim(),
                isDynamic: !!t.isDynamic
            });
        }

        return {
            pass: allPassed,
            testResults,
            errors
        };
    }
}

if (typeof module !== 'undefined') {
    module.exports = MissionValidator;
}
