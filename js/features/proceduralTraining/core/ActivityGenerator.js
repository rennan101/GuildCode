/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   Templates de Atividades Procedurais em C (Andares 0 a 15)
   ═══════════════════════════════════════════════════════════════ */

if (typeof require !== 'undefined' && typeof SeededRandom === 'undefined') {
    SeededRandom = require('./SeededRandom.js');
}

const PTS_TEMPLATES = [
    // ─── ANDAR 0: ESTRUTURA BÁSICA & I/O ───
    {
        id: 'tpl_io_print_int',
        topic: 'estrutura_basica_io',
        concept: 'printf',
        difficulty: 'easy',
        paramGenerators: {
            attrName: (rng) => rng.choice(['vida', 'mana', 'energia', 'ataque', 'defesa', 'ouro']),
            val: (rng) => rng.range(50, 500, 10)
        },
        build: (params, seed) => {
            const starterCode = `#include <stdio.h>\n\nint main() {\n    // Declare a variavel ${params.attrName} com valor ${params.val} e imprima usando printf com %d\n    \n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nint main() {\n    int ${params.attrName} = ${params.val};\n    printf("%d\\n", ${params.attrName});\n    return 0;\n}`;
            return {
                title: `Registro de Atributo: ${params.attrName.toUpperCase()}`,
                description: `Declare uma variável inteira chamada \`${params.attrName}\` com valor inicial **${params.val}** e exiba o seu valor formatado na saída com \`printf\`.`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `Declare com: int ${params.attrName} = ${params.val};` },
                    { level: 'II', text: `Para imprimir use: printf("%d\\n", ${params.attrName});` }
                ],
                tests: [
                    { input: '', expected: `${params.val}`, description: `Exibição correta do valor ${params.val}` }
                ],
                validator: (code, output) => {
                    const passCode = new RegExp(`int\\s+${params.attrName}\\s*=\\s*${params.val}`).test(code) && /printf/.test(code);
                    const passOut = output && output.includes(String(params.val));
                    return { pass: passCode && passOut };
                }
            };
        }
    },
    {
        id: 'tpl_io_scanf_dobro',
        topic: 'estrutura_basica_io',
        concept: 'scanf',
        difficulty: 'medium',
        paramGenerators: {
            varName: (rng) => rng.choice(['poder', 'cristal', 'essencia', 'pontos']),
            multiplier: (rng) => rng.choice([2, 3, 4])
        },
        build: (params, seed) => {
            const starterCode = `#include <stdio.h>\n\nint main() {\n    int ${params.varName};\n    // Leia o valor de ${params.varName} com scanf e imprima o seu valor multiplicado por ${params.multiplier}\n    \n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nint main() {\n    int ${params.varName};\n    scanf("%d", &${params.varName});\n    printf("%d\\n", ${params.varName} * ${params.multiplier});\n    return 0;\n}`;
            return {
                title: `Canalização e Multiplicação: ${params.varName}`,
                description: `Leia um número inteiro de entrada para a variável \`${params.varName}\` usando \`scanf\` e exiba o resultado de \`${params.varName} * ${params.multiplier}\`.`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `Use scanf("%d", &${params.varName}); para a leitura.` },
                    { level: 'II', text: `Imprima o cálculo com printf("%d\\n", ${params.varName} * ${params.multiplier});` }
                ],
                tests: [
                    { input: '15\n', expected: `${15 * params.multiplier}`, description: `Entrada 15 multiplicada por ${params.multiplier}` },
                    { input: '40\n', expected: `${40 * params.multiplier}`, description: `Entrada 40 multiplicada por ${params.multiplier}` }
                ],
                validator: (code, output) => {
                    const passCode = new RegExp(`scanf\\s*\\(\\s*["'].*%d.*["']\\s*,\\s*&${params.varName}\\s*\\)`).test(code);
                    return { pass: passCode };
                }
            };
        }
    },

    // ─── ANDAR 1: VARIÁVEIS, TIPOS E OPERADORES ───
    {
        id: 'tpl_var_float_calc',
        topic: 'variaveis_tipos',
        concept: 'float',
        difficulty: 'easy',
        paramGenerators: {
            fVal: (rng) => (rng.range(10, 80, 5) + 0.5)
        },
        build: (params, seed) => {
            const starterCode = `#include <stdio.h>\n\nint main() {\n    // Declare float dano = ${params.fVal}f e imprima formatado com uma casa decimal (%.1f)\n    \n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nint main() {\n    float dano = ${params.fVal}f;\n    printf("%.1f\\n", dano);\n    return 0;\n}`;
            return {
                title: `Precisão Rúnica de Ponto Flutuante`,
                description: `Declare uma variável do tipo \`float\` chamada \`dano\` com o valor **${params.fVal}** e exiba formatado com uma casa decimal (\`%.1f\`).`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `float dano = ${params.fVal}f;` },
                    { level: 'II', text: `printf("%.1f\\n", dano);` }
                ],
                tests: [
                    { input: '', expected: `${params.fVal.toFixed(1)}`, description: `Exibe ${params.fVal.toFixed(1)}` }
                ],
                validator: (code, output) => {
                    const passCode = /float\s+dano/.test(code) && /%\.1f/.test(code);
                    return { pass: passCode };
                }
            };
        }
    },

    // ─── ANDAR 2: CONDICIONAIS E REPETIÇÃO ───
    {
        id: 'tpl_cond_boss_shield',
        topic: 'condicionais_repeticao',
        concept: 'if',
        difficulty: 'easy',
        paramGenerators: {
            threshold: (rng) => rng.range(50, 200, 25),
            msgSuccess: (rng) => rng.choice(['ESCUDO_ATIVADO', 'BARREIRA_ARCANA', 'DEFESA_TOTAL'])
        },
        build: (params, seed) => {
            const starterCode = `#include <stdio.h>\n\nint main() {\n    int impacto;\n    scanf("%d", &impacto);\n    // Se impacto >= ${params.threshold}, imprima "${params.msgSuccess}"\n    \n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nint main() {\n    int impacto;\n    scanf("%d", &impacto);\n    if (impacto >= ${params.threshold}) {\n        printf("${params.msgSuccess}\\n");\n    }\n    return 0;\n}`;
            return {
                title: `Barreira Rúnica Condicional`,
                description: `Leia o valor de \`impacto\` e, se o impacto for maior ou igual a **${params.threshold}**, exiba a mensagem \`${params.msgSuccess}\`.`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `Use if (impacto >= ${params.threshold}) { ... }` }
                ],
                tests: [
                    { input: `${params.threshold + 20}\n`, expected: params.msgSuccess, description: `Impacto ${params.threshold + 20} ativa escudo` },
                    { input: `${params.threshold - 10}\n`, expected: '', description: `Impacto ${params.threshold - 10} não imprime nada` }
                ],
                validator: (code, output) => {
                    const passCode = new RegExp(`if\\s*\\(\\s*impacto\\s*>=\\s*${params.threshold}\\s*\\)`).test(code);
                    return { pass: passCode };
                }
            };
        }
    },
    {
        id: 'tpl_loop_turn_sum',
        topic: 'condicionais_repeticao',
        concept: 'for',
        difficulty: 'medium',
        paramGenerators: {
            n: (rng) => rng.range(3, 7, 1),
            baseDmg: (rng) => rng.range(10, 30, 5)
        },
        build: (params, seed) => {
            const total = params.n * params.baseDmg;
            const starterCode = `#include <stdio.h>\n\nint main() {\n    int total = 0;\n    // Use um laco for de 1 ate ${params.n} somando ${params.baseDmg} a cada repeticao no total:\n    \n    printf("%d\\n", total);\n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nint main() {\n    int total = 0;\n    for (int i = 1; i <= ${params.n}; i++) {\n        total += ${params.baseDmg};\n    }\n    printf("%d\\n", total);\n    return 0;\n}`;
            return {
                title: `Combo Sequencial com Laço For`,
                description: `Simule ${params.n} turnos consecutivos acumulando **${params.baseDmg}** de dano em cada turno na variável \`total\` utilizando um laço \`for\`.`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `for (int i = 1; i <= ${params.n}; i++) { total += ${params.baseDmg}; }` }
                ],
                tests: [
                    { input: '', expected: `${total}`, description: `Total calculado: ${total}` }
                ],
                validator: (code, output) => {
                    const passCode = /for\s*\(/.test(code) && new RegExp(`${params.baseDmg}`).test(code);
                    return { pass: passCode };
                }
            };
        }
    },

    // ─── ANDAR 3: FUNÇÕES ───
    {
        id: 'tpl_func_calc_dano',
        topic: 'funcoes',
        concept: 'definicao_funcao',
        difficulty: 'medium',
        paramGenerators: {
            funcName: (rng) => rng.choice(['calcularDano', 'amplificarPoder', 'golpeArcano']),
            bonus: (rng) => rng.range(15, 50, 5)
        },
        build: (params, seed) => {
            const starterCode = `#include <stdio.h>\n\n// Defina a funcao ${params.funcName} que recebe um int base e retorna (base + ${params.bonus}):\n\nint main() {\n    int resultado = ${params.funcName}(100);\n    printf("%d\\n", resultado);\n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nint ${params.funcName}(int base) {\n    return base + ${params.bonus};\n}\n\nint main() {\n    int resultado = ${params.funcName}(100);\n    printf("%d\\n", resultado);\n    return 0;\n}`;
            return {
                title: `Encantamento Modular: ${params.funcName}`,
                description: `Crie a função \`${params.funcName}\` que recebe um parâmetro inteiro \`base\` e retorna a soma de \`base + ${params.bonus}\`.`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `int ${params.funcName}(int base) { return base + ${params.bonus}; }` }
                ],
                tests: [
                    { input: '', expected: `${100 + params.bonus}`, description: `100 + ${params.bonus} = ${100 + params.bonus}` }
                ],
                validator: (code, output) => {
                    const passCode = new RegExp(`int\\s+${params.funcName}\\s*\\(\\s*int\\s+`).test(code);
                    return { pass: passCode };
                }
            };
        }
    },

    // ─── ANDAR 4: VETORES ───
    {
        id: 'tpl_array_sum',
        topic: 'vetores',
        concept: 'soma_vetor',
        difficulty: 'medium',
        paramGenerators: {
            size: (rng) => 5,
            values: (rng) => [rng.range(10, 50, 5), rng.range(10, 50, 5), rng.range(10, 50, 5), rng.range(10, 50, 5), rng.range(10, 50, 5)]
        },
        build: (params, seed) => {
            const sum = params.values.reduce((a, b) => a + b, 0);
            const strVals = params.values.join(', ');
            const starterCode = `#include <stdio.h>\n\nint main() {\n    int itens[5] = {${strVals}};\n    int soma = 0;\n    // Percorra o vetor itens com for e acumule o total em soma:\n    \n    printf("%d\\n", soma);\n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nint main() {\n    int itens[5] = {${strVals}};\n    int soma = 0;\n    for (int i = 0; i < 5; i++) {\n        soma += itens[i];\n    }\n    printf("%d\\n", soma);\n    return 0;\n}`;
            return {
                title: `Inventário Arcano: Soma de Vetor`,
                description: `Percorra o array \`itens\` de 5 elementos utilizando uma estrutura de repetição \`for\` e calcule a soma de todos os elementos.`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `for (int i = 0; i < 5; i++) { soma += itens[i]; }` }
                ],
                tests: [
                    { input: '', expected: `${sum}`, description: `Soma total esperada: ${sum}` }
                ],
                validator: (code, output) => {
                    const passCode = /for\s*\(/.test(code) && /itens\[/.test(code);
                    return { pass: passCode };
                }
            };
        }
    },

    // ─── ANDAR 6: BUSCA LINEAR ───
    {
        id: 'tpl_search_linear',
        topic: 'busca_ocorrencia',
        concept: 'busca_linear',
        difficulty: 'medium',
        paramGenerators: {
            target: (rng) => rng.range(20, 80, 10),
            array: (rng) => [10, 20, 30, 40, 50, 60, 70, 80]
        },
        build: (params, seed) => {
            const expectedIndex = params.array.indexOf(params.target);
            const starterCode = `#include <stdio.h>\n\nint main() {\n    int dados[8] = {10, 20, 30, 40, 50, 60, 70, 80};\n    int alvo = ${params.target};\n    int posicao = -1;\n    // Busque linearmente o alvo no vetor e guarde o indice em posicao:\n    \n    printf("%d\\n", posicao);\n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nint main() {\n    int dados[8] = {10, 20, 30, 40, 50, 60, 70, 80};\n    int alvo = ${params.target};\n    int posicao = -1;\n    for (int i = 0; i < 8; i++) {\n        if (dados[i] == alvo) {\n            posicao = i;\n            break;\n        }\n    }\n    printf("%d\\n", posicao);\n    return 0;\n}`;
            return {
                title: `Localização de Runa: Busca Linear`,
                description: `Realize uma busca linear no array \`dados\` para encontrar o índice onde está armazenado o valor **${params.target}**. Atribua o índice à variável \`posicao\`.`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `Percorra o array com for e verifique com if (dados[i] == alvo)` }
                ],
                tests: [
                    { input: '', expected: `${expectedIndex}`, description: `Índice encontrado: ${expectedIndex}` }
                ],
                validator: (code, output) => {
                    const passCode = /dados\[/.test(code) && /alvo/.test(code);
                    return { pass: passCode };
                }
            };
        }
    },

    // ─── ANDAR 11: PONTEIROS ───
    {
        id: 'tpl_ptr_modifier',
        topic: 'ponteiros',
        concept: 'alteracao_referencia',
        difficulty: 'hard',
        paramGenerators: {
            newVal: (rng) => rng.range(200, 900, 50)
        },
        build: (params, seed) => {
            const starterCode = `#include <stdio.h>\n\nvoid aprimorar(int *ptr) {\n    // Altere o valor apontado por ptr para ${params.newVal}:\n    \n}\n\nint main() {\n    int poder = 50;\n    aprimorar(&poder);\n    printf("%d\\n", poder);\n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nvoid aprimorar(int *ptr) {\n    *ptr = ${params.newVal};\n}\n\nint main() {\n    int poder = 50;\n    aprimorar(&poder);\n    printf("%d\\n", poder);\n    return 0;\n}`;
            return {
                title: `Transmutação Direta por Ponteiro`,
                description: `Na função \`aprimorar\`, utilize o operador de desreferenciação (\`*\`) para atribuir o valor **${params.newVal}** ao endereço de memória apontado por \`ptr\`.`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `Use *ptr = ${params.newVal};` }
                ],
                tests: [
                    { input: '', expected: `${params.newVal}`, description: `Poder alterado para ${params.newVal}` }
                ],
                validator: (code, output) => {
                    const passCode = new RegExp(`\\*ptr\\s*=\\s*${params.newVal}`).test(code);
                    return { pass: passCode };
                }
            };
        }
    },

    // ─── ANDAR 12: STRUCTS ───
    {
        id: 'tpl_struct_hero',
        topic: 'structs',
        concept: 'acesso_ponto',
        difficulty: 'medium',
        paramGenerators: {
            hp: (rng) => rng.range(300, 800, 50),
            mp: (rng) => rng.range(100, 400, 25)
        },
        build: (params, seed) => {
            const starterCode = `#include <stdio.h>\n\nstruct Heroi {\n    int hp;\n    int mp;\n};\n\nint main() {\n    struct Heroi h;\n    // Inicialize h.hp = ${params.hp} e h.mp = ${params.mp}, depois imprima hp + mp:\n    \n    return 0;\n}`;
            const solutionCode = `#include <stdio.h>\n\nstruct Heroi {\n    int hp;\n    int mp;\n};\n\nint main() {\n    struct Heroi h;\n    h.hp = ${params.hp};\n    h.mp = ${params.mp};\n    printf("%d\\n", h.hp + h.mp);\n    return 0;\n}`;
            return {
                title: `Registro de Campeão (Struct)`,
                description: `Defina os campos da estrutura \`h\` com \`hp = ${params.hp}\` e \`mp = ${params.mp}\`. Imprima na saída a soma \`h.hp + h.mp\`.`,
                starterCode,
                solutionCode,
                hints: [
                    { level: 'I', text: `Atribua com h.hp = ${params.hp}; h.mp = ${params.mp};` },
                    { level: 'II', text: `printf("%d\\n", h.hp + h.mp);` }
                ],
                tests: [
                    { input: '', expected: `${params.hp + params.mp}`, description: `Soma esperada: ${params.hp + params.mp}` }
                ],
                validator: (code, output) => {
                    const passCode = /h\.hp/.test(code) && /h\.mp/.test(code);
                    return { pass: passCode };
                }
            };
        }
    }
];

class ActivityGenerator {
    constructor(curriculumGraph, templates = PTS_TEMPLATES) {
        this.graph = curriculumGraph;
        this.templates = templates;
        this.generatorVersion = '1.0.0';
    }

    /**
     * Encontra os templates compatíveis com tópico, conceito e dificuldade
     */
    findTemplates(topic, concept, difficulty) {
        return this.templates.filter(tpl => {
            if (topic && tpl.topic !== topic) return false;
            if (concept && tpl.concept !== concept) return false;
            if (difficulty && tpl.difficulty !== difficulty) return false;
            return true;
        });
    }

    /**
     * Gera uma atividade concreta determinística a partir de uma seed
     */
    generate({ topic, concept, difficulty, seed, playerProfile = null }) {
        const rng = new SeededRandom(seed);
        let matching = this.findTemplates(topic, concept, difficulty);

        // Se não encontrar exato por dificuldade, busca por tópico e conceito
        if (matching.length === 0) {
            matching = this.findTemplates(topic, concept, null);
        }

        // Se ainda não encontrar, busca por tópico
        if (matching.length === 0) {
            matching = this.findTemplates(topic, null, null);
        }

        // Fallback para qualquer template do gerador
        if (matching.length === 0) {
            matching = this.templates;
        }

        const template = rng.choice(matching);

        // Gera parâmetros com o RNG determinístico
        const params = {};
        if (template.paramGenerators) {
            for (const key in template.paramGenerators) {
                params[key] = template.paramGenerators[key](rng);
            }
        }

        const built = template.build(params, seed);
        const paramHash = JSON.stringify(params);

        // Monta o objeto completo da Atividade compatível com o formato Code Leveler
        const activity = {
            id: `pts_${seed}_${template.id}`,
            title: built.title,
            difficulty: template.difficulty || difficulty || 'medium',
            xp: template.difficulty === 'easy' ? 50 : (template.difficulty === 'hard' ? 150 : 100),
            description: built.description,
            starterCode: built.starterCode,
            referenceSolutionCode: built.solutionCode,
            hints: built.hints || [],
            tests: built.tests || [],
            validator: built.validator || ((c, o) => ({ pass: true })),

            // Metadados do PTS
            topic: template.topic,
            concepts: [template.concept],
            templateId: template.id,
            paramHash: paramHash,
            seed: Number(seed),
            generatorVersion: this.generatorVersion,
            prerequisites: this.graph.getFloorByTopicId(template.topic)?.prerequisites || [],
            estimatedTime: template.difficulty === 'easy' ? 45 : 90,
            metadata: {
                generatedAt: Date.now(),
                params
            }
        };

        return activity;
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        PTS_TEMPLATES,
        ActivityGenerator
    };
}
if (typeof window !== 'undefined') {
    window.PTS_TEMPLATES = PTS_TEMPLATES;
    window.ActivityGenerator = ActivityGenerator;
}
