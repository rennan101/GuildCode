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
     * Serializa array de erros (pode conter strings ou objetos {msg, message, title}) para string legível
     */
    serializeErrors(errors) {
        if (!errors || errors.length === 0) return '';
        return errors.map(e => {
            if (typeof e === 'string') return e;
            if (typeof e === 'object' && e !== null) {
                return e.msg || e.message || e.title || JSON.stringify(e);
            }
            return String(e);
        }).join('; ');
    }

    /**
     * Validação estática de regras no código fonte (palavras-chave e padrões)
     */
    validateCodeRules(code, validationRules = {}) {
        const errors = [];
        const required = validationRules?.requiredPatterns || [];
        const forbidden = validationRules?.forbiddenPatterns || [];

        // Remove comentários
        const cleanCode = (code || '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*/g, '');

        for (const req of required) {
            if (req instanceof RegExp) {
                if (!req.test(code)) {
                    errors.push(`Seu código precisa utilizar o padrão / estrutura esperada.`);
                }
            } else if (typeof req === 'string') {
                if (!code.includes(req)) {
                    errors.push(`Seu código precisa utilizar o recurso / padrão: \`${req}\``);
                }
            }
        }

        for (const forb of forbidden) {
            if (forb instanceof RegExp) {
                if (forb.test(cleanCode)) {
                    errors.push(`O uso deste padrão é estritamente proibido nesta missão!`);
                }
            } else if (typeof forb === 'string') {
                if (cleanCode.includes(forb)) {
                    errors.push(`O uso de \`${forb}\` é estritamente proibido nesta missão!`);
                }
            }
        }

        return {
            pass: errors.length === 0,
            errors
        };
    }

    /**
     * Detecta se o aluno tentou burlar a atividade inserindo a saída esperada
     * como literal dentro de Debug.Log(...) ou printf(...) sem declarar variáveis
     * ou sem realizar as operações lógicas exigidas.
     */
    detectLiteralCheat(code, activity, expectedOutput) {
        if (!code || !expectedOutput) return null;
        const normExp = String(expectedOutput).trim();
        if (normExp.length < 3) return null;

        // Limpa comentários
        const cleanCode = code
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*/g, '');

        // Detecta chamadas de Debug.Log("resposta") ou printf("resposta")
        const debugLogRegex = /Debug\.Log\s*\(\s*["']([^"']+)["']\s*\)/g;
        const printfRegex = /printf\s*\(\s*["']([^"']+)["']\s*\)/g;

        let foundRawLiteral = false;
        let match;

        while ((match = debugLogRegex.exec(cleanCode)) !== null) {
            const literal = match[1].replace(/\\n/g, '\n').trim();
            if (literal === normExp || normExp.includes(literal) && literal.length > 5) {
                foundRawLiteral = true;
                break;
            }
        }

        if (!foundRawLiteral) {
            while ((match = printfRegex.exec(cleanCode)) !== null) {
                const literal = match[1].replace(/\\n/g, '\n').trim();
                if (literal === normExp || normExp.includes(literal) && literal.length > 5) {
                    foundRawLiteral = true;
                    break;
                }
            }
        }

        if (foundRawLiteral) {
            // Se encontrou literal idêntico ao esperado, checa se a atividade exige variáveis ou cálculos
            const desc = (activity.description || '').toLowerCase();
            const requiresVariablesOrCalculation = 
                desc.includes('declare') || desc.includes('calcule') || desc.includes('distancia') ||
                desc.includes('vetor') || desc.includes('vector3') || desc.includes('multiplicador') ||
                desc.includes('velocidade') || desc.includes('int ') || desc.includes('float ') ||
                desc.includes('p1') || desc.includes('p2');

            // Verifica se no código há variáveis declaradas (int, float, string, bool, Vector3, etc.)
            const hasVariableDeclarations = /(?:int|float|double|string|bool|Vector3|Vector2|Transform|Rigidbody|var)\s+[a-zA-Z0-9_]+\s*=/i.test(cleanCode);
            const hasOperationsOrCalls = /[+\-*\/]|\b(?:Vector3|Mathf|Distance|GetComponent|Instantiate)\b/i.test(cleanCode);
            const hasControlFlow = /\b(?:if|else|switch|for|while|foreach)\b/i.test(cleanCode);

            // Trapaça confirmada: a atividade pede variáveis/cálculo e o aluno não declarou NENHUMA variável nem operou nada
            if (requiresVariablesOrCalculation && !hasVariableDeclarations && !hasOperationsOrCalls) {
                return `[ ANTI-TRAPAÇA ] Não é permitido inserir a resposta diretamente como texto estático no Debug.Log/printf. Você deve declarar as variáveis e calcular o resultado via código!`;
            }
        }

        return null;
    }

    /**
     * Gera e executa casos de testes dinâmicos e randômicos para evitar hardcode (Anti-Cheat)
     */
    generateDynamicTests(activity) {
        const tests = [];
        const staticTests = activity.tests || [];
        // Apenas gera testes dinâmicos com stdin se a atividade tiver casos de teste que usem stdin e NÃO for C#
        const isCSharpAct = activity && String(activity.id || '').startsWith('cs_');
        if (isCSharpAct) {
            return tests;
        }

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
        // 2. Maior de dois números (ex: ch1_a1)
        if ((desc.includes('maior') || title.includes('maior')) && (desc.includes('scanf') || desc.includes('leia'))) {
            const a = Math.floor(Math.random() * 50) + 1;
            const b = a + Math.floor(Math.random() * 40) + 5;
            tests.push({
                input: `${a}\n${b}\n`,
                expected: `${b}`,
                description: `[ANTI-CHEAT] Maior valor: ${a} vs ${b}`,
                isDynamic: true
            });
        }
        // 3. Soma de 2 inteiros
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

        const isCSharp = (typeof app !== 'undefined' && app.ui && typeof app.ui.isCSharpWorld === 'function' && app.ui.isCSharpWorld(code)) ||
                         (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity') ||
                         (activity && String(activity.id || '').startsWith('cs_')) ||
                         (activity && typeof CSHARP_CHAPTERS !== 'undefined' && CSHARP_CHAPTERS.some(c => c.activities && c.activities.some(a => a.id === activity.id))) ||
                         (/using\s+UnityEngine|MonoBehaviour|Debug\.Log/.test(code));

        const staticTests = activity.tests || [];
        const dynamicTests = isCSharp ? [] : this.generateDynamicTests(activity);
        const allTests = [...staticTests, ...dynamicTests];

        if (allTests.length === 0) {
            // Atividade sem testes específicos, apenas compilação e execução
            let exec;
            if (isCSharp && typeof window !== 'undefined' && typeof window.CSharpInterpreter === 'function') {
                const csInterp = new window.CSharpInterpreter();
                exec = csInterp.executeFormatted ? csInterp.executeFormatted(code) : csInterp.execute(code);
            } else if (isCSharp && typeof CSharpInterpreter === 'function') {
                const csInterp = new CSharpInterpreter();
                exec = csInterp.executeFormatted ? csInterp.executeFormatted(code) : csInterp.execute(code);
            } else if (!isCSharp) {
                exec = this.interpreter.execute(code, '');
            } else {
                return {
                    pass: false,
                    testResults: [],
                    errors: ['Intérprete C# não disponível. Recarregue a página.']
                };
            }

            if (exec.errors && exec.errors.length > 0) {
                const errMsgs = this.serializeErrors(exec.errors);
                return {
                    pass: false,
                    testResults: [],
                    errors: [`Erro de compilação: ${errMsgs}`]
                };
            }
            
            // Se a atividade possui função personalizada de validação estrutural/lógica
            const outputStr = Array.isArray(exec.output) ? exec.output.join('\n') : (exec.output || '');
            if (typeof activity.validator === 'function') {
                try {
                    const customRes = activity.validator(code, outputStr);
                    if (customRes && (!customRes.pass && !customRes.valid)) {
                        return {
                            pass: false,
                            testResults: [{ description: 'Validação de regras lógicas', pass: false }],
                            errors: customRes.errors || [customRes.reason || 'O código não cumpriu as regras estruturais da atividade.']
                        };
                    }
                } catch (e) {
                    console.warn('[MissionValidator] Erro no validator customizado:', e);
                }
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
            
            let exec;
            if (isCSharp && typeof window !== 'undefined' && typeof window.CSharpInterpreter === 'function') {
                const csInterp = new window.CSharpInterpreter();
                exec = csInterp.executeFormatted ? csInterp.executeFormatted(code) : csInterp.execute(code);
            } else if (isCSharp && typeof CSharpInterpreter === 'function') {
                const csInterp = new CSharpInterpreter();
                exec = csInterp.executeFormatted ? csInterp.executeFormatted(code) : csInterp.execute(code);
            } else if (!isCSharp) {
                exec = this.interpreter.execute(code, input);
            } else {
                allPassed = false;
                errors.push('Intérprete C# não disponível. Recarregue a página.');
                break;
            }

            const outputStr = Array.isArray(exec.output)
                ? exec.output.join('\n')
                : (exec.output || '');

            if (exec.errors && exec.errors.length > 0) {
                allPassed = false;
                const errMsg = this.serializeErrors(exec.errors);
                testResults.push({
                    description: t.description || `Caso de Teste #${i + 1}`,
                    pass: false,
                    expected: t.expected,
                    got: errMsg,
                    isError: true,
                    isDynamic: !!t.isDynamic
                });
                errors.push(`Erro de compilação no teste #${i + 1}: ${errMsg}`);
                break; 
            }

            // Checagem Anti-Trapaça para literais estáticos em Debug.Log / printf
            const cheatError = this.detectLiteralCheat(code, activity, t.expected);
            if (cheatError) {
                allPassed = false;
                testResults.push({
                    description: t.description || `Caso de Teste #${i + 1}`,
                    pass: false,
                    expected: t.expected,
                    got: outputStr.trim(),
                    isDynamic: !!t.isDynamic
                });
                errors.push(cheatError);
                break;
            }

            const normOutput = this.normalize(outputStr);
            const normExpected = this.normalize(t.expected);
            
            // Match flexível: contém o valor esperado
            let pass = normOutput.includes(normExpected);

            // Se passou na saída textual, executa activity.validator(code, outputStr) se existir
            if (pass && typeof activity.validator === 'function') {
                try {
                    const customRes = activity.validator(code, outputStr);
                    if (customRes && (!customRes.pass && !customRes.valid)) {
                        pass = false;
                        const vErrs = customRes.errors || [customRes.reason || 'Validação de código falhou.'];
                        vErrs.forEach(err => errors.push(err));
                    }
                } catch (e) {
                    console.warn('[MissionValidator] Erro no validator customizado:', e);
                }
            }

            if (!pass) {
                allPassed = false;
                if (!t.isDynamic) {
                    if (!errors.some(e => e.includes('Saída incorreta') || e.includes('ANTI-TRAPAÇA'))) {
                        errors.push(`Saída incorreta no teste: "${t.description}". Esperado: "${t.expected}", Obtido: "${outputStr.trim()}"`);
                    }
                } else {
                    errors.push(`Falhou no teste anti-cheat dinâmico com entrada aleatória (${t.input.trim()}). Verifique a lógica do algoritmo!`);
                }
            }

            testResults.push({
                description: t.description || `Caso de Teste #${i + 1}`,
                pass,
                expected: t.expected,
                got: outputStr.trim(),
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
