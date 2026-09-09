/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Farming Templates Manager
   Dynamic template rotation system for artifact farming activities
   (World C: chapters 0..15, activity 3 / World C#: chapters 0..37, activity 5).
   Prevents repetitive copy-pasting while strictly preserving canonical
   identifiers, step indexes (act3/act5), and artifact rewards.
   ═══════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    // Helper functions for parameter randomization and variation selection
    function pickRandom(arr) {
        if (!arr || arr.length === 0) return null;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const FarmingTemplatesManager = {
        // Cache of last generated variants by activity id to keep consistent across current attempts
        _variantCache: {},
        _csharpTemplates: null,
        _cTemplates: null,

        /**
         * Initialize templates for C and C#
         */
        init() {
            if (!this._cTemplates) {
                this._cTemplates = this._buildCTemplates();
            }
            if (!this._csharpTemplates) {
                this._csharpTemplates = this._buildCSharpTemplates();
            }
        },

        /**
         * Checks if the given activity is the last activity of a chapter
         */
        isFarmingActivity(chapter, activityIndex) {
            if (!chapter || !chapter.activities || activityIndex === undefined || activityIndex === null) {
                return false;
            }
            return activityIndex === (chapter.activities.length - 1);
        },

        /**
         * Resolves a dynamic activity variant for the final chapter activity.
         * If forceNew is true (e.g. clicking "Farmar Novamente"), rotates to a fresh template/values.
         */
        resolveActivityVariant(chapter, activityIndex, isCSharp, forceNew = false) {
            this.init();
            if (!chapter || !chapter.activities || !chapter.activities[activityIndex]) {
                return null;
            }

            const baseActivity = chapter.activities[activityIndex];
            if (!this.isFarmingActivity(chapter, activityIndex)) {
                return baseActivity;
            }

            const cacheKey = `${isCSharp ? 'cs' : 'c'}_ch${chapter.id}_act${activityIndex}`;
            if (!forceNew && this._variantCache[cacheKey]) {
                return this._variantCache[cacheKey];
            }

            // Find generator
            let generator = null;
            if (isCSharp) {
                generator = this._csharpTemplates[chapter.id];
            } else {
                generator = this._cTemplates[chapter.id];
            }

            if (!generator) {
                return baseActivity;
            }

            const variant = generator(baseActivity, chapter);
            if (!variant) {
                return baseActivity;
            }

            // Garantir que as propriedades canônicas nunca sejam alteradas para não quebrar contrato do Firestore/Engine
            variant.id = baseActivity.id;
            variant.artifactReward = baseActivity.artifactReward || chapter.artifactReward;
            variant.difficulty = baseActivity.difficulty || 'medium';
            variant.isFarmingVariant = true;

            this._variantCache[cacheKey] = variant;
            return variant;
        },

        /**
         * Clears cached variant to force rotation on next load
         */
        invalidateVariant(chapterId, activityIndex, isCSharp) {
            const cacheKey = `${isCSharp ? 'cs' : 'c'}_ch${chapterId}_act${activityIndex}`;
            delete this._variantCache[cacheKey];
        },

        // ═══════════════════════════════════════════════════════
        // C WORLD TEMPLATES (16 CHAPTERS: 0..15)
        // ═══════════════════════════════════════════════════════
        _buildCTemplates() {
            return {
                // Ch 0: O Sintetizador Arcano
                0: (base) => {
                    const themes = [
                        {
                            name: "Sintetizador de Mana Arcano",
                            v1: "manaBase", v2: "mult", v3: "bonus",
                            label: "Mana Final",
                            tests: [
                                { in: "15 2 7.25", exp: "Mana Final: 37.25", desc: "(15 * 2) + 7.25 = 37.25" },
                                { in: "30 3 4.50", exp: "Mana Final: 94.50", desc: "(30 * 3) + 4.50 = 94.50" }
                            ]
                        },
                        {
                            name: "Canalizador de Dano do Guardião",
                            v1: "danoBase", v2: "mult", v3: "bonus",
                            label: "Dano Final",
                            tests: [
                                { in: "12 4 6.50", exp: "Dano Final: 54.50", desc: "(12 * 4) + 6.50 = 54.50" },
                                { in: "25 2 15.75", exp: "Dano Final: 65.75", desc: "(25 * 2) + 15.75 = 65.75" }
                            ]
                        },
                        {
                            name: "Reator de Barreira Mágica",
                            v1: "escudoBase", v2: "mult", v3: "bonus",
                            label: "Escudo Final",
                            tests: [
                                { in: "20 3 8.30", exp: "Escudo Final: 68.30", desc: "(20 * 3) + 8.30 = 68.30" },
                                { in: "40 2 12.50", exp: "Escudo Final: 92.50", desc: "(40 * 2) + 12.50 = 92.50" }
                            ]
                        }
                    ];
                    const t = pickRandom(themes);
                    return {
                        ...base,
                        title: t.name,
                        description: `Leia dois inteiros (<code>${t.v1}</code> e <code>${t.v2}</code>) e um float (<code>${t.v3}</code>) com <code>scanf</code>. Calcule a fórmula: <code>(${t.v1} * ${t.v2}) + ${t.v3}</code>. Imprima com 2 casas decimais no formato:<br><code>${t.label}: Y.YY</code>`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    int ${t.v1}, ${t.v2};\n    float ${t.v3};\n    // 1. Leia os 3 valores usando scanf\n    \n    // 2. Calcule o resultado com (${t.v1} * ${t.v2}) + ${t.v3}\n    \n    // 3. Imprima: ${t.label}: %.2f\\n\n    \n    return 0;\n}`,
                        tests: t.tests.map(item => ({ input: item.in, expected: item.exp, description: item.desc })),
                        hints: [
                            { level: "I", text: `Use scanf("%d %d %f", &${t.v1}, &${t.v2}, &${t.v3});` },
                            { level: "II", text: `float total = (${t.v1} * ${t.v2}) + ${t.v3};\nprintf("${t.label}: %.2f\\n", total);` },
                            { level: "III", text: `#include <stdio.h>\n\nint main() {\n    int ${t.v1}, ${t.v2};\n    float ${t.v3};\n    scanf("%d %d %f", &${t.v1}, &${t.v2}, &${t.v3});\n    float total = (${t.v1} * ${t.v2}) + ${t.v3};\n    printf("${t.label}: %.2f\\n", total);\n    return 0;\n}` }
                        ],
                        validator: (code, output) => {
                            const errs = [];
                            if (!code.includes("scanf")) errs.push("Utilize scanf para ler os valores");
                            if (!output.includes(t.label)) errs.push(`A saída deve conter '${t.label}:'`);
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 1: Calculadora da Guilda
                1: (base) => {
                    const pairs = [
                        { a: 120, b: 8, soma: 128, sub: 112, mult: 960, div: 15 },
                        { a: 95, b: 6, soma: 101, sub: 89, mult: 570, div: 15 },
                        { a: 84, b: 5, soma: 89, sub: 79, mult: 420, div: 16 }
                    ];
                    const p = pickRandom(pairs);
                    const exp = `Soma: ${p.soma}\nSub: ${p.sub}\nMult: ${p.mult}\nDiv: ${p.div}`;
                    return {
                        ...base,
                        title: `Calculadora Rúnica (a=${p.a}, b=${p.b})`,
                        description: `Com <code>int a = ${p.a}</code> e <code>int b = ${p.b}</code>, calcule e imprima em linhas separadas:<br><code>Soma: X</code><br><code>Sub: Y</code><br><code>Mult: Z</code><br><code>Div: W</code> (divisão inteira)`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    int a = ${p.a};\n    int b = ${p.b};\n    // Calcule e imprima Soma, Sub, Mult e Div em linhas separadas (use \\n)\n    \n    return 0;\n}`,
                        tests: [{ input: "", expected: exp, description: `Operações aritméticas com a=${p.a} e b=${p.b}` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(`Soma: ${p.soma}`)) errs.push(`Soma deve ser ${p.soma}`);
                            if (!output.includes(`Sub: ${p.sub}`)) errs.push(`Sub deve ser ${p.sub}`);
                            if (!output.includes(`Mult: ${p.mult}`)) errs.push(`Mult deve ser ${p.mult}`);
                            if (!output.includes(`Div: ${p.div}`)) errs.push(`Div deve ser ${p.div}`);
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 2: Simulador de Batalha (Loops)
                2: (base) => {
                    const variations = [
                        { count: 4, mult: 15, unit: "Dano", end: "Batalha encerrada!" },
                        { count: 5, mult: 12, unit: "Energia", end: "Ciclo finalizado!" },
                        { count: 6, mult: 8, unit: "Poder", end: "Ritual completo!" }
                    ];
                    const v = pickRandom(variations);
                    let exp = [];
                    for (let i = 1; i <= v.count; i++) {
                        exp.push(`Turno ${i}: ${v.unit} ${i * v.mult}`);
                    }
                    exp.push(v.end);
                    const expectedStr = exp.join('\n');

                    return {
                        ...base,
                        title: `Simulador de Turnos (${v.count} Etapas)`,
                        description: `Simule ${v.count} turnos com um loop <code>for (int i = 1; i <= ${v.count}; i++)</code>. A cada turno, o valor de ${v.unit.toLowerCase()} é <code>i * ${v.mult}</code>. Imprima cada turno no formato <code>Turno X: ${v.unit} Y</code> e, após o loop, imprima <code>${v.end}</code>.`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    // 1. Use um for de 1 a ${v.count} imprimindo: Turno %d: ${v.unit} %d\\n\n    \n    // 2. Ao final imprima: ${v.end}\\n\n    \n    return 0;\n}`,
                        tests: [{ input: "", expected: expectedStr, description: `${v.count} turnos e encerramento com ${v.mult} de incremento` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(`Turno 1: ${v.unit} ${v.mult}`)) errs.push(`Turno 1 incorreto`);
                            if (!output.includes(`Turno ${v.count}: ${v.unit} ${v.count * v.mult}`)) errs.push(`Turno ${v.count} incorreto`);
                            if (!output.includes(v.end)) errs.push(`Deve imprimir '${v.end}' ao final`);
                            if (!code.includes("for") && !code.includes("while")) errs.push("Use uma estrutura de repetição");
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 3: Funções (Sistema de Batalha)
                3: (base) => {
                    const configs = [
                        { vidaIni: 120, dano: 30, turnos: 3, label: "Vida" },
                        { vidaIni: 90, dano: 20, turnos: 4, label: "Vida" },
                        { vidaIni: 100, dano: 25, turnos: 3, label: "Vida" }
                    ];
                    const cfg = pickRandom(configs);
                    let exp = [];
                    let cur = cfg.vidaIni;
                    for (let i = 1; i <= cfg.turnos; i++) {
                        cur = Math.max(0, cur - cfg.dano);
                        exp.push(`Turno ${i}: ${cfg.label} ${cur}`);
                    }
                    const expStr = exp.join('\n');
                    return {
                        ...base,
                        title: `Sistema de Combate (${cfg.vidaIni} HP, -${cfg.dano}/turno)`,
                        description: `Crie duas funções:<br>1. <code>int batalha(int vida, int dano)</code> que retorna a vida restante (mínimo 0 se for negativa).<br>2. <code>void turno(int numero, int vida)</code> que imprime: <code>Turno X: ${cfg.label} Y</code>.<br>Na main, inicie com <code>vida = ${cfg.vidaIni}</code> e execute um loop de 1 a ${cfg.turnos} aplicando dano de <code>${cfg.dano}</code>.`,
                        starterCode: `#include <stdio.h>\n\n// 1. Crie int batalha(int vida, int dano)\n\n// 2. Crie void turno(int numero, int vida)\n\nint main() {\n    int vida = ${cfg.vidaIni};\n    for (int i = 1; i <= ${cfg.turnos}; i++) {\n        vida = batalha(vida, ${cfg.dano});\n        turno(i, vida);\n    }\n    return 0;\n}`,
                        tests: [{ input: "", expected: expStr, description: `${cfg.turnos} turnos com dano ${cfg.dano}` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(`Turno 1: ${cfg.label}`)) errs.push(`Turno 1 incorreto`);
                            if (!code.includes("int batalha")) errs.push("Crie a função batalha");
                            if (!code.includes("void turno")) errs.push("Crie a função turno");
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 4: Arrays e Vetores (Leitura com For)
                4: (base) => {
                    const steps = [
                        { step: 15, count: 5, prefix: "slot" },
                        { step: 25, count: 4, prefix: "item" },
                        { step: 10, count: 5, prefix: "inventario" }
                    ];
                    const s = pickRandom(steps);
                    let exp = [];
                    for (let i = 0; i < s.count; i++) {
                        exp.push(`[${i}] = ${(i + 1) * s.step}`);
                    }
                    const expStr = exp.join('\n');
                    return {
                        ...base,
                        title: `Alocação de Inventário (+${s.step})`,
                        description: `Crie um vetor <code>inventario[${s.count}]</code>. Use um primeiro laço <code>for</code> para preenchê-lo onde cada posição <code>i</code> recebe <code>(i + 1) * ${s.step}</code>. Depois use um segundo <code>for</code> para imprimir cada elemento no formato:<br><code>[0] = ${s.step}</code><br><code>[1] = ${2 * s.step}</code>...`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    int inventario[${s.count}];\n    // 1. Preencha com for: inventario[i] = (i + 1) * ${s.step};\n    \n    // 2. Imprima com for: printf("[%d] = %d\\n", i, inventario[i]);\n    \n    return 0;\n}`,
                        tests: [{ input: "", expected: expStr, description: `${s.count} valores múltiplos de ${s.step}` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!code.includes("for")) errs.push("Use um loop for");
                            if (!output.includes(`[0] = ${s.step}`)) errs.push(`O primeiro índice deve ser [0] = ${s.step}`);
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 5: Recursão (Explorar a Masmorra)
                5: (base) => {
                    const depth = pickRandom([3, 4, 5]);
                    const msgs = {
                        3: "Nivel 3\nNivel 2\nNivel 1\nSaida encontrada!",
                        4: "Nivel 4\nNivel 3\nNivel 2\nNivel 1\nSaida encontrada!",
                        5: "Nivel 5\nNivel 4\nNivel 3\nNivel 2\nNivel 1\nSaida encontrada!"
                    };
                    return {
                        ...base,
                        title: `Descida das Profundezas (${depth} Níveis)`,
                        description: `Crie a função recursiva <code>void explorar(int nivel)</code>. Para cada nível > 0, imprima <code>Nivel X</code> e invoque <code>explorar(nivel - 1)</code>. No nível 0 (caso base), imprima <code>Saida encontrada!</code> e retorne. Na main, chame <code>explorar(${depth});</code>.`,
                        starterCode: `#include <stdio.h>\n\n// Crie a funcao void explorar(int nivel) aqui\n\nint main() {\n    explorar(${depth});\n    return 0;\n}`,
                        tests: [{ input: "", expected: msgs[depth], description: `Recursão de ${depth} níveis até o caso base` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(`Nivel ${depth}`)) errs.push(`Deve imprimir Nivel ${depth}`);
                            if (!output.includes("Saida encontrada!")) errs.push("Deve imprimir 'Saida encontrada!'");
                            if (!code.includes("explorar")) errs.push("Implemente a função recursiva explorar");
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 6: Busca Linear
                6: (base) => {
                    const sets = [
                        { vet: "{7, 14, 21, 28, 35}", target: 28, pos: 3 },
                        { vet: "{4, 9, 16, 25, 36}", target: 16, pos: 2 },
                        { vet: "{11, 22, 33, 44, 55}", target: 44, pos: 3 },
                        { vet: "{5, 12, 8, 30, 15}", target: 30, pos: 3 }
                    ];
                    const s = pickRandom(sets);
                    return {
                        ...base,
                        title: `Radar Linear (Alvo: ${s.target})`,
                        description: `Dado o vetor <code>${s.vet}</code> e o valor procurado <code>alvo = ${s.target}</code>, implemente uma busca linear. Se encontrar, imprima <code>Encontrado na posicao ${s.pos}</code>. Caso não encontre, imprima <code>Nao encontrado</code>.`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    int vet[5] = ${s.vet};\n    int alvo = ${s.target};\n    int encontrado = 0;\n    // Percorra com for: se vet[i] == alvo, imprima e marque encontrado = 1\n    \n    return 0;\n}`,
                        tests: [{ input: "", expected: `Encontrado na posicao ${s.pos}`, description: `Busca linear por ${s.target}` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(`Encontrado na posicao ${s.pos}`)) errs.push(`Saída esperada: Encontrado na posicao ${s.pos}`);
                            if (!code.includes("for")) errs.push("Utilize um loop for");
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 7: Inserção em Vetor Ordenado
                7: (base) => {
                    const variations = [
                        { vet: "{10, 30, 50, 70}", val: 40, pos: 2, exp: "10 30 40 50 70 " },
                        { vet: "{5, 15, 25, 45}", val: 35, pos: 3, exp: "5 15 25 35 45 " },
                        { vet: "{20, 40, 60, 80}", val: 50, pos: 2, exp: "20 40 50 60 80 " }
                    ];
                    const v = pickRandom(variations);
                    return {
                        ...base,
                        title: `Inserção Ordenada (Inserir ${v.val})`,
                        description: `Dado o vetor ordenado <code>int vet[5] = ${v.vet};</code> com <code>tamanho = 4</code>, insira o valor <code>${v.val}</code> mantendo a ordem crescente (no índice ${v.pos}). O vetor resultante impresso deve ser:<br><code>${v.exp.trim()}</code>`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    int vet[5] = ${v.vet};\n    int tamanho = 4;\n    int valor = ${v.val};\n    int pos = ${v.pos};\n    // 1. Desloque os elementos para a direita\n    // 2. Insira vet[pos] = valor e incremente tamanho\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf("%d ", vet[i]);\n    }\n    return 0;\n}`,
                        tests: [{ input: "", expected: v.exp, description: `Valor ${v.val} inserido no vetor` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (output.trim() !== v.exp.trim()) errs.push(`Vetor resultante esperado: ${v.exp.trim()}`);
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 8: Remoção de Elemento
                8: (base) => {
                    const variations = [
                        { vet: "{10, 20, 30, 40, 50, 60, 70}", target: 40, exp: "10 20 30 50 60 70 " },
                        { vet: "{5, 10, 15, 20, 25, 30, 35}", target: 20, exp: "5 10 15 25 30 35 " },
                        { vet: "{12, 24, 36, 48, 60, 72, 84}", target: 48, exp: "12 24 36 60 72 84 " }
                    ];
                    const v = pickRandom(variations);
                    return {
                        ...base,
                        title: `Purga de Elemento (Remover ${v.target})`,
                        description: `Dado o vetor <code>${v.vet}</code>, encontre a posição do valor <code>alvo = ${v.target}</code> e remova-o deslocando os elementos seguintes para a esquerda. Imprima o vetor resultante:<br><code>${v.exp.trim()}</code>`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    int vet[7] = ${v.vet};\n    int tamanho = 7;\n    int alvo = ${v.target};\n    // Encontre o alvo e desloque para a esquerda decrecendo tamanho\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf("%d ", vet[i]);\n    }\n    return 0;\n}`,
                        tests: [{ input: "", expected: v.exp, description: `Elemento ${v.target} removido` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (output.includes(String(v.target))) errs.push(`O elemento ${v.target} não deve mais aparecer`);
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 9: Transpor Matriz
                9: (base) => {
                    const matrices = [
                        {
                            orig: "{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}",
                            trans: "1 4 7\n2 5 8\n3 6 9"
                        },
                        {
                            orig: "{{9, 8, 7}, {6, 5, 4}, {3, 2, 1}}",
                            trans: "9 6 3\n8 5 2\n7 4 1"
                        },
                        {
                            orig: "{{2, 4, 6}, {1, 3, 5}, {7, 8, 9}}",
                            trans: "2 1 7\n4 3 8\n6 5 9"
                        }
                    ];
                    const m = pickRandom(matrices);
                    return {
                        ...base,
                        title: "Transposição de Grade Rúnica",
                        description: `Dada a matriz <code>int m[3][3] = ${m.orig};</code>, calcule a transposta <code>t[3][3]</code> (onde <code>t[j][i] = m[i][j]</code>) e imprima <code>t</code> linha por linha.`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    int m[3][3] = ${m.orig};\n    int t[3][3];\n    // 1. Calcule a transposta: t[j][i] = m[i][j]\n    // 2. Imprima linha por linha com \\n\n    \n    return 0;\n}`,
                        tests: [{ input: "", expected: m.trans, description: "Matriz transposta correta" }],
                        validator: (code, output) => {
                            const errs = [];
                            const lines = m.trans.split('\n');
                            lines.forEach((l, i) => {
                                if (!output.includes(l)) errs.push(`Linha ${i+1} deve conter: ${l}`);
                            });
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 10: Strings (Copiar e Comparar)
                10: (base) => {
                    const hero = pickRandom(["Kael", "Lyra", "Arion", "Orin", "Valen"]);
                    return {
                        ...base,
                        title: `Inscrição Arcana: ${hero}`,
                        description: `Copie o conteúdo de <code>s1</code> (<code>"${hero}"</code>) para <code>s2</code> usando <code>strcpy(s2, s1)</code>. Em seguida, verifique se são iguais com <code>strcmp(s1, s2) == 0</code> e imprima:<br><code>Iguais: ${hero}</code>`,
                        starterCode: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[20] = "${hero}";\n    char s2[20];\n    // 1. Copie s1 para s2 com strcpy\n    // 2. Se strcmp(s1, s2) == 0, imprima: Iguais: %s\\n\n    \n    return 0;\n}`,
                        tests: [{ input: "", expected: `Iguais: ${hero}`, description: `String ${hero} copiada e comparada` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(hero)) errs.push(`A saída deve conter '${hero}'`);
                            if (!output.includes("Iguais")) errs.push("A saída deve confirmar que são 'Iguais'");
                            if (!code.includes("strcpy")) errs.push("Utilize strcpy");
                            if (!code.includes("strcmp")) errs.push("Utilize strcmp");
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 11: Ponteiros (Trocar Valores)
                11: (base) => {
                    const p = pickRandom([
                        { a: 10, b: 20 },
                        { a: 35, b: 70 },
                        { a: 15, b: 45 },
                        { a: 50, b: 100 }
                    ]);
                    const exp = `Antes: a=${p.a} b=${p.b}\nDepois: a=${p.b} b=${p.a}`;
                    return {
                        ...base,
                        title: `Inversão de Fluxo (a=${p.a}, b=${p.b})`,
                        description: `Crie uma função <code>void trocar(int *x, int *y)</code> que troque os valores das variáveis apontadas. Na <code>main</code> com <code>a = ${p.a}</code> e <code>b = ${p.b}</code>, chame <code>trocar(&a, &b);</code> e imprima antes e depois.`,
                        starterCode: `#include <stdio.h>\n\n// 1. Crie void trocar(int *x, int *y)\n\nint main() {\n    int a = ${p.a};\n    int b = ${p.b};\n    \n    printf("Antes: a=%d b=%d\\n", a, b);\n    // Chame trocar(&a, &b);\n    \n    printf("Depois: a=%d b=%d\\n", a, b);\n    return 0;\n}`,
                        tests: [{ input: "", expected: exp, description: `Valores trocados por ponteiros` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(`Depois: a=${p.b} b=${p.a}`)) errs.push(`Deveria exibir: Depois: a=${p.b} b=${p.a}`);
                            if (!code.includes("int *")) errs.push("A função trocar deve receber ponteiros (int *x, int *y)");
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 12: Structs (Aventureiro Mais Forte)
                12: (base) => {
                    const parties = [
                        { best: "Kael", lvl: 25, a: "Arion (12)", b: "Kael (25)", c: "Mira (18)" },
                        { best: "Mira", lvl: 30, a: "Arion (20)", b: "Kael (22)", c: "Mira (30)" },
                        { best: "Arion", lvl: 28, a: "Arion (28)", b: "Kael (19)", c: "Mira (24)" }
                    ];
                    const p = pickRandom(parties);
                    return {
                        ...base,
                        title: `Líder do Grupo: ${p.best}`,
                        description: `Dados 3 aventureiros: <strong>${p.a}</strong>, <strong>${p.b}</strong> e <strong>${p.c}</strong>, compare os níveis e imprima quem é o mais forte no formato:<br><code>Mais forte: ${p.best} (nivel ${p.lvl})</code>`,
                        starterCode: `#include <stdio.h>\n#include <string.h>\n\nstruct Aventureiro {\n    char nome[20];\n    int nivel;\n};\n\nint main() {\n    // Compare os niveis e imprima o mais forte\n    \n    return 0;\n}`,
                        tests: [{ input: "", expected: `Mais forte: ${p.best} (nivel ${p.lvl})`, description: `${p.best} identificado como o mais forte` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(p.best)) errs.push(`${p.best} deve ser identificado como o mais forte`);
                            if (!output.includes(String(p.lvl))) errs.push(`O nível esperado é ${p.lvl}`);
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 13: Média de Vida
                13: (base) => {
                    const sets = [
                        { lives: [160, 110, 210, 120], total: 600, media: 150 },
                        { lives: [140, 100, 180, 120], total: 540, media: 135 },
                        { lives: [150, 100, 200, 120], total: 570, media: 142 }
                    ];
                    const s = pickRandom(sets);
                    return {
                        ...base,
                        title: `Cálculo de Vitalidade Média (${s.media} HP)`,
                        description: `Some a vida dos 4 membros do esquadrão (<code>${s.lives.join(', ')}</code>) e calcule a média inteira (total / 4). Imprima no formato:<br><code>Media de vida: ${s.media}</code>`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    int vidas[4] = {${s.lives.join(', ')}};\n    int total = 0;\n    // 1. Some todas as vidas usando for\n    // 2. Imprima: Media de vida: %d\\n\n    \n    return 0;\n}`,
                        tests: [{ input: "", expected: `Media de vida: ${s.media}`, description: `Média inteira: ${s.total} / 4 = ${s.media}` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(`Media de vida: ${s.media}`)) errs.push(`A média de vida deve ser ${s.media}`);
                            if (!code.includes("for")) errs.push("Utilize um loop for");
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 14: Ranking por Ouro
                14: (base) => {
                    const rankings = [
                        {
                            top1: "Kael", gold1: 500,
                            exp: "Ranking por Ouro:\n1. Kael - 500 ouro\n2. Arion - 320 ouro\n3. Mira - 200 ouro\n4. Lyra - 150 ouro\n5. Orin - 100 ouro",
                            ouros: "{320, 150, 500, 200, 100}"
                        },
                        {
                            top1: "Mira", gold1: 650,
                            exp: "Ranking por Ouro:\n1. Mira - 650 ouro\n2. Kael - 400 ouro\n3. Arion - 300 ouro\n4. Lyra - 220 ouro\n5. Orin - 110 ouro",
                            ouros: "{300, 220, 400, 650, 110}"
                        }
                    ];
                    const r = pickRandom(rankings);
                    return {
                        ...base,
                        title: `Tesouro da Guilda (Líder: ${r.top1})`,
                        description: `Ordene os 5 membros por ouro em ordem decrescente trocando os valores de ouro e os nomes correspondentes. Imprima o ranking resultante iniciando por <code>${r.top1}</code>.`,
                        starterCode: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char nomes[5][20] = {"Arion", "Lyra", "Kael", "Mira", "Orin"};\n    int ouro[5] = ${r.ouros};\n    int n = 5;\n    // Ordene em ordem decrescente de ouro\n    \n    printf("Ranking por Ouro:\\n");\n    for (int i = 0; i < n; i++) {\n        printf("%d. %s - %d ouro\\n", i+1, nomes[i], ouro[i]);\n    }\n    return 0;\n}`,
                        tests: [{ input: "", expected: r.exp, description: "Ranking ordenado decrescente" }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes(r.top1)) errs.push(`${r.top1} deve figurar no ranking`);
                            if (!output.includes(String(r.gold1))) errs.push(`Maior pontuação deve ser ${r.gold1}`);
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                },

                // Ch 15: Persistência de Arquivos
                15: (base) => {
                    const files = [
                        { file: "guilda.dat", tag: "DADO", exp: "[ DADO ] Arion:12:150:320\n[ DADO ] Lyra:8:100:150\n[ DADO ] Kael:20:200:500" },
                        { file: "arquivo.dat", tag: "REGISTRO", exp: "[ REGISTRO ] Arion:12:150:320\n[ REGISTRO ] Lyra:8:100:150\n[ REGISTRO ] Kael:20:200:500" }
                    ];
                    const f = pickRandom(files);
                    return {
                        ...base,
                        title: `Registro dos Tomos (${f.file})`,
                        description: `Grave os 3 registros no arquivo <code>${f.file}</code> em modo escrita. Depois, abra em leitura e exiba cada linha precedida pela marca <code>[ ${f.tag} ] </code>.`,
                        starterCode: `#include <stdio.h>\n\nint main() {\n    // 1. Grave os dados em "${f.file}" no modo "w"\n    // 2. Reabra em modo "r" e imprima cada linha como: [ ${f.tag} ] linha\n    \n    return 0;\n}`,
                        tests: [{ input: "", expected: f.exp, description: `Leitura persistida de ${f.file}` }],
                        validator: (code, output) => {
                            const errs = [];
                            if (!output.includes("Arion")) errs.push("Falta ler o registro de Arion");
                            if (!output.includes(f.tag)) errs.push(`Cada linha deve ser precedida por [ ${f.tag} ]`);
                            if (!code.includes("fopen")) errs.push("Utilize fopen()");
                            return { pass: errs.length === 0, errors: errs };
                        }
                    };
                }
            };
        },

        // ═══════════════════════════════════════════════════════
        // C# UNITY TEMPLATES (38 CHAPTERS: 0..37)
        // ═══════════════════════════════════════════════════════
        _buildCSharpTemplates() {
            const tMap = {};

            // Helper to generate standard Unity C# activity structure
            function makeCSAct(base, opts) {
                return {
                    ...base,
                    title: opts.title || base.title,
                    description: opts.description,
                    starterCode: opts.starterCode,
                    solution: opts.solution,
                    tests: [{ input: "", expected: opts.expected, description: opts.testDesc || "Validação no Console Unity" }],
                    validationRules: { requiredPatterns: opts.reqs },
                    hints: [
                        { level: "I", text: `Padrões obrigatórios: ${opts.reqs.join(', ')}` },
                        { level: "II", text: `Saída esperada no Console: ${opts.expected}` },
                        { level: "III", text: opts.solution || "Consulte a assinatura do método Start." }
                    ],
                    validator: (code, output) => {
                        const errs = [];
                        for (let r of opts.reqs) {
                            if (!code.includes(r)) errs.push(`Seu código precisa conter: ${r}`);
                        }
                        if (!output.includes(opts.expected)) {
                            errs.push(`A saída gerada no console não corresponde ao esperado: "${opts.expected}"`);
                        }
                        return { pass: errs.length === 0, errors: errs };
                    }
                };
            }

            // Ch 0: Constante de Gravidade
            tMap[0] = (base) => {
                const vars = [
                    { grav: "-9.8f", gravVal: "9.8f", gravOut: "-9.8", massa: 10, peso: "98", desc: "Gravidade da Terra" },
                    { grav: "-10.0f", gravVal: "10.0f", gravOut: "-10", massa: 12, peso: "120", desc: "Gravidade Arcade" },
                    { grav: "-1.6f", gravVal: "1.6f", gravOut: "-1.6", massa: 20, peso: "32", desc: "Gravidade Lunar" }
                ];
                const v = pickRandom(vars);
                const exp = `Gravidade: ${v.gravOut} | Peso: ${v.peso}`;
                return makeCSAct(base, {
                    title: `Constante Físico-Gravitacional (${v.desc})`,
                    description: `Declare a constante <code>const float GRAVIDADE = ${v.grav};</code> e a variável inteira <code>int massa = ${v.massa};</code>. Em seguida, declare a variável <code>float peso = massa * -GRAVIDADE;</code> (ou <code>massa * ${v.gravVal}</code>) para obter a intensidade positiva da força peso. Por fim, exiba exatamente no Console o formato: <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare a constante GRAVIDADE e a variavel massa\n        \n        // 2. Declare float peso = massa * -GRAVIDADE; (ou massa * ${v.gravVal})\n        \n        // 3. Imprima: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        const float GRAVIDADE = ${v.grav};\n        int massa = ${v.massa};\n        float peso = massa * -GRAVIDADE;\n        Debug.Log("Gravidade: " + GRAVIDADE + " | Peso: " + peso);\n    }\n}`,
                    expected: exp,
                    reqs: ["const float GRAVIDADE", v.grav, "massa", "peso", "Debug.Log"]
                });
            };

            // Ch 1: Operadores Lógicos (OU / ||)
            tMap[1] = (base) => {
                const vars = [
                    { b1: "temEscudo", v1: false, b2: "estaInvisivel", v2: true, exp: "Protegido: True" },
                    { b1: "temArmadura", v1: true, b2: "temBarreira", v2: false, exp: "Protegido: True" },
                    { b1: "emEsquiva", v1: false, b2: "temReflexo", v2: true, exp: "Protegido: True" }
                ];
                const v = pickRandom(vars);
                return makeCSAct(base, {
                    title: `Verificação de Proteção (${v.b1} || ${v.b2})`,
                    description: `Declare a booleana <code>bool ${v.b1} = ${v.v1};</code> e <code>bool ${v.b2} = ${v.v2};</code>. Crie a booleana <code>protegido</code> avaliando se <code>${v.b1} || ${v.b2}</code> é verdadeiro, emitindo no Console <code>${v.exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool ${v.b1} = ${v.v1};\n        bool ${v.b2} = ${v.v2};\n        // Avalie com || e imprima: ${v.exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool ${v.b1} = ${v.v1};\n        bool ${v.b2} = ${v.v2};\n        bool protegido = ${v.b1} || ${v.b2};\n        Debug.Log("Protegido: " + protegido);\n    }\n}`,
                    expected: v.exp,
                    reqs: [v.b1, v.b2, "||", "protegido"]
                });
            };

            // Ch 2: Operador Ternário
            tMap[2] = (base) => {
                const vars = [
                    { varName: "stamina", val: 65, cond: ">= 50", resA: "Descansado", resB: "Exausto", exp: "Estado: Descansado" },
                    { varName: "mana", val: 30, cond: ">= 40", resA: "Energizado", resB: "Esgotado", exp: "Estado: Esgotado" },
                    { varName: "vida", val: 80, cond: ">= 50", resA: "Saudavel", resB: "Critico", exp: "Estado: Saudavel" }
                ];
                const v = pickRandom(vars);
                return makeCSAct(base, {
                    title: `Diagnóstico Ternário (${v.varName})`,
                    description: `Declare a variável inteira <code>${v.varName} = ${v.val}</code>. Utilize o operador ternário (<code>? :</code>) para definir a string <code>estado</code> como <code>(${v.varName} ${v.cond} ? "${v.resA}" : "${v.resB}")</code> e exiba no Console <code>${v.exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int ${v.varName} = ${v.val};\n        // Use o operador ternario (? :) e exiba: ${v.exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int ${v.varName} = ${v.val};\n        string estado = (${v.varName} ${v.cond}) ? "${v.resA}" : "${v.resB}";\n        Debug.Log("Estado: " + estado);\n    }\n}`,
                    expected: v.exp,
                    reqs: [v.varName, "?", ":", "Debug.Log"]
                });
            };

            // Ch 3: Interrupção com Break
            tMap[3] = (base) => {
                const target = pickRandom([3, 4, 5]);
                const exp = `Alvo Encontrado no passo ${target}`;
                return makeCSAct(base, {
                    title: `Rastreamento com Break (Passo ${target})`,
                    description: `Crie um laço <code>for (int i = 1; i <= 10; i++)</code>. Quando <code>i == ${target}</code>, imprima no Console <code>${exp}</code> e interrompa o laço com <code>break;</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Procure o passo ${target} no laco e interrompa com break\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 10; i++)\n        {\n            if (i == ${target})\n            {\n                Debug.Log("${exp}");\n                break;\n            }\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["for", "break", `i == ${target}`, "Debug.Log"]
                });
            };

            // Ch 4: Formatação de Jogador (Função)
            tMap[4] = (base) => {
                const heroes = [
                    { name: "Arkan", lvl: 20 },
                    { name: "Lyra", lvl: 25 },
                    { name: "Kael", lvl: 30 }
                ];
                const h = pickRandom(heroes);
                const exp = `Player: ${h.name} [Lv ${h.lvl}]`;
                return makeCSAct(base, {
                    title: `Formatação de Heroi: ${h.name}`,
                    description: `Crie o método <code>string FormatarNome(string nome, int nivel)</code> que retorne <code>"Player: " + nome + " [Lv " + nivel + "]"</code>. No <code>Start()</code>, invoque <code>FormatarNome("${h.name}", ${h.lvl})</code> e exiba no Console.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame FormatarNome("${h.name}", ${h.lvl}) e imprima\n    }\n    \n    // Defina FormatarNome\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string rotulo = FormatarNome("${h.name}", ${h.lvl});\n        Debug.Log(rotulo);\n    }\n\n    string FormatarNome(string nome, int nivel)\n    {\n        return "Player: " + nome + " [Lv " + nivel + "]";\n    }\n}`,
                    expected: exp,
                    reqs: ["string FormatarNome(string nome, int nivel)", `FormatarNome("${h.name}", ${h.lvl})`]
                });
            };

            // Ch 5: Maior Valor em Array
            tMap[5] = (base) => {
                const arrays = [
                    { vals: "new int[] { 15, 82, 43 }", max: 82 },
                    { vals: "new int[] { 27, 94, 61 }", max: 94 },
                    { vals: "new int[] { 40, 75, 99 }", max: 99 }
                ];
                const a = pickRandom(arrays);
                const exp = `Maior: ${a.max}`;
                return makeCSAct(base, {
                    title: `Varredura de Pico (${a.vals})`,
                    description: `Dado o array <code>int[] valores = ${a.vals};</code>, percorra com um <code>for</code> identificando o maior elemento. Ao final, exiba <code>${exp}</code> no Console.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int[] valores = ${a.vals};\n        // Encontre o maior valor e imprima: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int[] valores = ${a.vals};\n        int maior = valores[0];\n        for (int i = 1; i < valores.Length; i++)\n        {\n            if (valores[i] > maior) maior = valores[i];\n        }\n        Debug.Log("${exp}");\n    }\n}`,
                    expected: exp,
                    reqs: ["int[] valores", "for", "Debug.Log"]
                });
            };

            // Ch 6: Contagem de Instâncias Estáticas
            tMap[6] = (base) => {
                const count = pickRandom([2, 3, 4]);
                const exp = `Inimigos Ativos: ${count}`;
                return makeCSAct(base, {
                    title: `Monitor de Spawns (${count} Inimigos)`,
                    description: `Incremente a variável <code>totalInimigos</code> com o operador de incremento <code>++</code> até registrar ${count} instâncias e exiba no Console <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalInimigos = 0;\n        // Incremente com ++ e imprima: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalInimigos = 0;\n        for (int i = 0; i < ${count}; i++) totalInimigos++;\n        Debug.Log("Inimigos Ativos: " + totalInimigos);\n    }\n}`,
                    expected: exp,
                    reqs: ["totalInimigos", "++", "Debug.Log"]
                });
            };

            // Ch 7: Lista Polimórfica de Ações
            tMap[7] = (base) => {
                const sets = [
                    { a1: "Arqueiro Dispara", a2: "Guerreiro Golpeia" },
                    { a1: "Mago Conjura", a2: "Paladino Defende" },
                    { a1: "Ladino Esgueira", a2: "Clerigo Cura" }
                ];
                const s = pickRandom(sets);
                const exp = `Acao: ${s.a1}\nAcao: ${s.a2}`;
                return makeCSAct(base, {
                    title: `Orquestração de Ações (${s.a1})`,
                    description: `Crie o array <code>string[] acoes = new string[] { "${s.a1}", "${s.a2}" };</code> e percorra com um laço <code>for</code> usando <code>acoes.Length</code>, imprimindo cada ação precedida por <code>Acao: </code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] acoes = new string[] { "${s.a1}", "${s.a2}" };\n        // Percorra imprimindo cada acao\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] acoes = new string[] { "${s.a1}", "${s.a2}" };\n        for (int i = 0; i < acoes.Length; i++)\n        {\n            Debug.Log("Acao: " + acoes[i]);\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["string[] acoes", "for", "acoes.Length"]
                });
            };

            // Ch 8: Contagem de Componentes
            tMap[8] = (base) => {
                const count = pickRandom([3, 4, 5]);
                const exp = `Total de Componentes: ${count}`;
                return makeCSAct(base, {
                    title: `Auditoria de GameObject (${count} Componentes)`,
                    description: `Declare o array <code>string[] componentes</code> contendo ${count} componentes e exiba no Console <code>Total de Componentes: </code> concatenado com <code>componentes.Length</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare componentes com ${count} itens e emita ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] componentes = new string[${count}];\n        Debug.Log("Total de Componentes: " + componentes.Length);\n    }\n}`,
                    expected: exp,
                    reqs: ["string[] componentes", "componentes.Length", "Debug.Log"]
                });
            };

            // Ch 9: Vetor Forward de Direção
            tMap[9] = (base) => {
                const axis = pickRandom([
                    { prop: "transform.forward.z", name: "Z", val: 1 },
                    { prop: "transform.right.x", name: "X", val: 1 },
                    { prop: "transform.up.y", name: "Y", val: 1 }
                ]);
                const exp = `Direcao ${axis.name}: ${axis.val}`;
                return makeCSAct(base, {
                    title: `Vetor Direcional Unitário (${axis.name})`,
                    description: `Obtenha a componente <code>${axis.prop}</code> e exiba no Console no formato: <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Imprima ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("Direcao ${axis.name}: " + (int)${axis.prop});\n    }\n}`,
                    expected: exp,
                    reqs: [axis.prop, "Debug.Log"]
                });
            };

            // Ch 10: OnDestroy Limpeza
            tMap[10] = (base) => {
                const msgs = [
                    "OnDestroy: Recursos Liberados",
                    "OnDestroy: Memoria Desalocada",
                    "OnDestroy: Eventos Desconectados"
                ];
                const msg = pickRandom(msgs);
                return makeCSAct(base, {
                    title: `Ciclo de Vida: ${msg.split(':')[1].trim()}`,
                    description: `Declare a string <code>statusDestruicao = "${msg}"</code> e emita-a via <code>Debug.Log(statusDestruicao);</code> no encerramento.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Emita ${msg}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusDestruicao = "${msg}";\n        Debug.Log(statusDestruicao);\n    }\n}`,
                    expected: msg,
                    reqs: ["string statusDestruicao", "statusDestruicao", "Debug.Log"]
                });
            };

            // Ch 11: Suporte Multi-Dispositivo
            tMap[11] = (base) => {
                const devs = [
                    { dev: "Teclado", varName: "tecladoConectado", val: true },
                    { dev: "Gamepad", varName: "gamepadConectado", val: true },
                    { dev: "Touchscreen", varName: "touchConectado", val: true }
                ];
                const d = pickRandom(devs);
                const exp = `Dispositivo Principal: ${d.dev}`;
                return makeCSAct(base, {
                    title: `Mapeamento de Entrada: ${d.dev}`,
                    description: `Declare <code>bool ${d.varName} = ${d.val};</code>. Se verdadeiro (com <code>if</code>), exiba <code>${exp}</code> no Console.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool ${d.varName} = ${d.val};\n        // Com if, emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool ${d.varName} = ${d.val};\n        if (${d.varName})\n        {\n            Debug.Log("${exp}");\n        }\n    }\n}`,
                    expected: exp,
                    reqs: [`bool ${d.varName}`, "if", "Debug.Log"]
                });
            };

            // Ch 12: Troca Dinâmica para Mapa UI
            tMap[12] = (base) => {
                const contexts = [
                    { name: "UI", cond: "pausado" },
                    { name: "Gameplay", cond: "!pausado" },
                    { name: "Menu", cond: "emMenu" }
                ];
                const c = pickRandom(contexts);
                const exp = `Contexto Atual: ${c.name}`;
                return makeCSAct(base, {
                    title: `Mapa de Ação (${c.name})`,
                    description: `Declare a condição de controle <code>bool pausado = true;</code> e valide com <code>if</code> para emitir no Console <code>Contexto Atual: UI</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool pausado = true;\n        // Valide com if e emita: Contexto Atual: UI\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool pausado = true;\n        if (pausado)\n        {\n            Debug.Log("Contexto Atual: UI");\n        }\n    }\n}`,
                    expected: "Contexto Atual: UI",
                    reqs: ["bool pausado", "if", "Debug.Log"]
                });
            };

            // Ch 13: Vector3.one
            tMap[13] = (base) => {
                return makeCSAct(base, {
                    title: "Escala Inicial Normalizada",
                    description: "Utilize <code>Vector3.one</code> e emita no Console a escala unitária normalizada no formato: <code>Escala Inicial: 1, 1, 1</code>.",
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Use Vector3.one e exiba: Escala Inicial: 1, 1, 1\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 escala = Vector3.one;\n        Debug.Log("Escala Inicial: " + escala.x + ", " + escala.y + ", " + escala.z);\n    }\n}`,
                    expected: "Escala Inicial: 1, 1, 1",
                    reqs: ["Vector3.one", "Debug.Log"]
                });
            };

            // Ch 14: Radar de Proximidade
            tMap[14] = (base) => {
                const dists = [8, 12, 15];
                const d = pickRandom(dists);
                const exp = `Alvo no Radar: ${d}m`;
                return makeCSAct(base, {
                    title: `Varredura de Proximidade (${d}m)`,
                    description: `Utilize <code>Vector3.Distance</code> e valide com <code>if</code> se a distância é menor que o limite, emitindo no Console <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule com Vector3.Distance e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float dist = ${d}f;\n        if (dist <= 20f)\n        {\n            Debug.Log("${exp}");\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["Vector3.Distance", "if", "Debug.Log"]
                });
            };

            // Ch 15: Ponto de Impacto Raycast
            tMap[15] = (base) => {
                const dists = ["4.2", "5.8", "6.5"];
                const d = pickRandom(dists);
                const exp = `Impacto a ${d} metros`;
                return makeCSAct(base, {
                    title: `Raycast Hit Telemetria (${d}m)`,
                    description: `Declare <code>float distHit = ${d}f;</code> e emita no Console a distância registrada no formato: <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare float distHit e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distHit = ${d}f;\n        Debug.Log("Impacto a " + distHit + " metros");\n    }\n}`,
                    expected: exp,
                    reqs: ["float distHit", "Debug.Log"]
                });
            };

            // Ch 16: Atrito do Ar (Drag)
            tMap[16] = (base) => {
                const drags = ["2.5", "3.0", "1.8"];
                const d = pickRandom(drags);
                const exp = `Atrito do Ar (Drag): ${d}`;
                return makeCSAct(base, {
                    title: `Resistência Aerodinâmica (${d})`,
                    description: `Declare a variável flutuante <code>float drag = ${d}f;</code> e exiba no Console exatamente: <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare float drag e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float drag = ${d}f;\n        Debug.Log("Atrito do Ar (Drag): " + drag);\n    }\n}`,
                    expected: exp,
                    reqs: ["float drag", "Debug.Log"]
                });
            };

            // Ch 17: Gatilho de Saída (OnTriggerExit)
            tMap[17] = (base) => {
                return makeCSAct(base, {
                    title: "Violação de Perímetro Seguro",
                    description: "Declare a booleana <code>bool naAreaSegura = false;</code> e verifique a negação com <code>!naAreaSegura</code>, emitindo no Console <code>Saiu da Area Segura!</code>.",
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool naAreaSegura = false;\n        // Com ! e Debug.Log, emita: Saiu da Area Segura!\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool naAreaSegura = false;\n        if (!naAreaSegura)\n        {\n            Debug.Log("Saiu da Area Segura!");\n        }\n    }\n}`,
                    expected: "Saiu da Area Segura!",
                    reqs: ["bool naAreaSegura", "!", "Debug.Log"]
                });
            };

            // Ch 18: Dead Zone de Câmera
            tMap[18] = (base) => {
                const widths = ["0.1", "0.15", "0.2"];
                const w = pickRandom(widths);
                const exp = `Largura Dead Zone: ${w}`;
                return makeCSAct(base, {
                    title: `Zona Morta do CineMachine (${w})`,
                    description: `Declare <code>float deadZoneWidth = ${w}f;</code> e exiba no Console <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare deadZoneWidth e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float deadZoneWidth = ${w}f;\n        Debug.Log("Largura Dead Zone: " + deadZoneWidth);\n    }\n}`,
                    expected: exp,
                    reqs: ["float deadZoneWidth", "Debug.Log"]
                });
            };

            // Ch 19: Field of View (FOV)
            tMap[19] = (base) => {
                const fovs = [40, 45, 50];
                const f = pickRandom(fovs);
                const exp = `FOV Atual: ${f}`;
                return makeCSAct(base, {
                    title: `Zoom Óptico da Lente (${f}°)`,
                    description: `Declare <code>int fov = ${f};</code> e <code>bool mirando = true;</code>. Se estiver mirando (com <code>if</code>), exiba <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int fov = ${f};\n        bool mirando = true;\n        // Com if, emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int fov = ${f};\n        bool mirando = true;\n        if (mirando)\n        {\n            Debug.Log("FOV Atual: " + fov);\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["int fov", "bool mirando", "if", "Debug.Log"]
                });
            };

            // Ch 20: Submeshes
            tMap[20] = (base) => {
                return makeCSAct(base, {
                    title: "Consolidação de Malha 3D",
                    description: "Declare <code>int submeshes = 1;</code> e valide com <code>if (submeshes <= 1)</code> para emitir <code>Malha Otimizada: Draw Call Unico</code> no Console.",
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide submeshes e emita: Malha Otimizada: Draw Call Unico\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int submeshes = 1;\n        if (submeshes <= 1)\n        {\n            Debug.Log("Malha Otimizada: Draw Call Unico");\n        }\n    }\n}`,
                    expected: "Malha Otimizada: Draw Call Unico",
                    reqs: ["int submeshes", "if", "Debug.Log"]
                });
            };

            // Ch 21: Splatmap Textura
            tMap[21] = (base) => {
                const layers = ["Grama_Rochosa", "Neve_Profunda", "Areia_Deserto"];
                const layer = pickRandom(layers);
                const exp = `Camada de Textura: ${layer}`;
                return makeCSAct(base, {
                    title: `Splatmap Terreno (${layer})`,
                    description: `Declare <code>string camadaAtiva = "${layer}";</code> e exiba no Console no formato <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare camadaAtiva e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string camadaAtiva = "${layer}";\n        Debug.Log("Camada de Textura: " + camadaAtiva);\n    }\n}`,
                    expected: exp,
                    reqs: ["camadaAtiva", "Debug.Log"]
                });
            };

            // Ch 22: Vinheta Pós-Processamento
            tMap[22] = (base) => {
                const vals = ["0.35", "0.45", "0.25"];
                const v = pickRandom(vals);
                const exp = `Vinheta Cinematica: ${v}`;
                return makeCSAct(base, {
                    title: `Ajuste Óptico de Vinheta (${v})`,
                    description: `Declare <code>float vinhetaIntensidade = ${v}f;</code> e emita no Console <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare vinhetaIntensidade e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vinhetaIntensidade = ${v}f;\n        Debug.Log("Vinheta Cinematica: " + vinhetaIntensidade);\n    }\n}`,
                    expected: exp,
                    reqs: ["float vinhetaIntensidade", "Debug.Log"]
                });
            };

            // Ch 23: Contador de Moedas
            tMap[23] = (base) => {
                const counts = ["0042", "0128", "0256"];
                const c = pickRandom(counts);
                const exp = `Moedas Coletadas: ${c}`;
                return makeCSAct(base, {
                    title: `HUD de Ouro (${c})`,
                    description: `Declare a variável inteira <code>int moedas = ${parseInt(c, 10)};</code> e emita formatada no Console como <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare int moedas e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = ${parseInt(c, 10)};\n        Debug.Log("Moedas Coletadas: ${c}");\n    }\n}`,
                    expected: exp,
                    reqs: ["int moedas", "Debug.Log"]
                });
            };

            // Ch 24: Partículas Stop
            tMap[24] = (base) => {
                const exp = "VFX Stop: Emissao Encerrada";
                return makeCSAct(base, {
                    title: "Interrupção do Emissor de Partículas",
                    description: `Declare <code>string statusVfx = "${exp}";</code> e emita-a via <code>Debug.Log(statusVfx);</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusVfx e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusVfx = "${exp}";\n        Debug.Log(statusVfx);\n    }\n}`,
                    expected: exp,
                    reqs: ["string statusVfx", "statusVfx", "Debug.Log"]
                });
            };

            // Ch 25: BGM Loop
            tMap[25] = (base) => {
                const tracks = ["Tema_Batalha", "Tema_Exploracao", "Tema_Santuario"];
                const t = pickRandom(tracks);
                const exp = `BGM em Loop: ${t}`;
                return makeCSAct(base, {
                    title: `Trilha Sonora Adaptativa (${t})`,
                    description: `Declare <code>string musica = "${t}";</code> e <code>bool emLoop = true;</code>. Se em loop (com <code>if</code>), exiba <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string musica = "${t}";\n        bool emLoop = true;\n        // Com if, emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string musica = "${t}";\n        bool emLoop = true;\n        if (emLoop)\n        {\n            Debug.Log("BGM em Loop: " + musica);\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["musica", "bool emLoop", "if", "Debug.Log"]
                });
            };

            // Ch 26: NavMesh Pausa
            tMap[26] = (base) => {
                const times = [2, 3, 5];
                const t = pickRandom(times);
                const exp = `Aguardando no Ponto: ${t}s`;
                return makeCSAct(base, {
                    title: `Tempo de Espera em Waypoint (${t}s)`,
                    description: `Declare <code>float tempoEspera = ${t}f;</code> e exiba no Console <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare float tempoEspera e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoEspera = ${t}f;\n        Debug.Log("Aguardando no Ponto: " + tempoEspera + "s");\n    }\n}`,
                    expected: exp,
                    reqs: ["float tempoEspera", "Debug.Log"]
                });
            };

            // Ch 27: Flash Material
            tMap[27] = (base) => {
                const mats = ["Dano_Flash", "Gelo_Congelado", "Veneno_Verde"];
                const m = pickRandom(mats);
                const exp = `Material: ${m}`;
                return makeCSAct(base, {
                    title: `Efeito de Material Visual (${m})`,
                    description: `Declare <code>string materialAtual = "${m}";</code> e <code>bool atingido = true;</code>. Se atingido (com <code>if</code>), emita <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string materialAtual = "${m}";\n        bool atingido = true;\n        // Com if, emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string materialAtual = "${m}";\n        bool atingido = true;\n        if (atingido)\n        {\n            Debug.Log("Material: " + materialAtual);\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["materialAtual", "bool atingido", "if", "Debug.Log"]
                });
            };

            // Ch 28: Destroy ao Contato
            tMap[28] = (base) => {
                const exp = "Destroy: Entidade Removida da Cena";
                return makeCSAct(base, {
                    title: "Despawn por Colisão",
                    description: `Declare a variável <code>string colisor = "Projetil";</code> e valide com <code>if</code> para emitir <code>${exp}</code> no Console.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string colisor = "Projetil";\n        // Com if, emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string colisor = "Projetil";\n        if (colisor != null)\n        {\n            Debug.Log("${exp}");\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["colisor", "if", "Debug.Log"]
                });
            };

            // Ch 29: Capacidade do Pool
            tMap[29] = (base) => {
                const caps = [50, 75, 100];
                const c = pickRandom(caps);
                const exp = `Capacidade do Pool: ${c} unidades`;
                return makeCSAct(base, {
                    title: `Dimensionamento de Object Pool (${c})`,
                    description: `Declare <code>int capacidadeMaxima = ${c};</code> e exiba no Console <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare capacidadeMaxima e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int capacidadeMaxima = ${c};\n        Debug.Log("Capacidade do Pool: " + capacidadeMaxima + " unidades");\n    }\n}`,
                    expected: exp,
                    reqs: ["int capacidadeMaxima", "Debug.Log"]
                });
            };

            // Ch 30: ScriptableObjects (Mana Restante)
            tMap[30] = (base) => {
                const pairs = [
                    { disp: 80, custo: 30, rest: 50 },
                    { disp: 100, custo: 45, rest: 55 },
                    { disp: 120, custo: 50, rest: 70 }
                ];
                const p = pickRandom(pairs);
                const exp = `Mana Restante: ${p.rest}`;
                return makeCSAct(base, {
                    title: `Consumo Modular de Habilidade (-${p.custo} Mana)`,
                    description: `Declare <code>int manaDisponivel = ${p.disp};</code> e <code>int custo = ${p.custo};</code>. Subtraia com <code>-</code> e emita <code>${exp}</code> no Console.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int manaDisponivel = ${p.disp};\n        int custo = ${p.custo};\n        // Calcule e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int manaDisponivel = ${p.disp};\n        int custo = ${p.custo};\n        int restante = manaDisponivel - custo;\n        Debug.Log("Mana Restante: " + restante);\n    }\n}`,
                    expected: exp,
                    reqs: ["manaDisponivel", "custo", "-", "Debug.Log"]
                });
            };

            // Ch 31: PlayerPrefs Save
            tMap[31] = (base) => {
                const exp = "Dados Gravados com Sucesso";
                return makeCSAct(base, {
                    title: "Persistência Forçada em Disco",
                    description: "Execute <code>PlayerPrefs.Save();</code> e logo após emita no Console <code>Dados Gravados com Sucesso</code>.",
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame PlayerPrefs.Save() e emita: Dados Gravados com Sucesso\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerPrefs.Save();\n        Debug.Log("Dados Gravados com Sucesso");\n    }\n}`,
                    expected: exp,
                    reqs: ["PlayerPrefs.Save()", "Debug.Log"]
                });
            };

            // Ch 32: Integridade de Save JSON
            tMap[32] = (base) => {
                const exp = "Arquivo de Save Valido e Carregado";
                return makeCSAct(base, {
                    title: "Verificação de Assinatura do Save",
                    description: "Declare <code>bool saveValido = true;</code> e valide com <code>if</code> para emitir no Console <code>Arquivo de Save Valido e Carregado</code>.",
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool saveValido = true;\n        // Com if, emita: Arquivo de Save Valido e Carregado\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool saveValido = true;\n        if (saveValido)\n        {\n            Debug.Log("Arquivo de Save Valido e Carregado");\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["bool saveValido", "if", "Debug.Log"]
                });
            };

            // Ch 33: Coroutines Stop
            tMap[33] = (base) => {
                const exp = "StopCoroutine: Execucao Interrompida";
                return makeCSAct(base, {
                    title: "Abortar Rotina Temporal",
                    description: "Declare <code>bool jogadorCancelou = true;</code> e verifique com <code>if</code> para emitir <code>StopCoroutine: Execucao Interrompida</code>.",
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool jogadorCancelou = true;\n        // Com if, emita: StopCoroutine: Execucao Interrompida\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool jogadorCancelou = true;\n        if (jogadorCancelou)\n        {\n            Debug.Log("StopCoroutine: Execucao Interrompida");\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["bool jogadorCancelou", "if", "Debug.Log"]
                });
            };

            // Ch 34: Desinscrição de Eventos (-=)
            tMap[34] = (base) => {
                const exp = "Inscricao Removida com -= no OnDisable";
                return makeCSAct(base, {
                    title: "Prevenção de Memory Leak em Delegates",
                    description: `Declare <code>string statusUnsub = "${exp}";</code> e emita-a no Console com <code>Debug.Log(statusUnsub);</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusUnsub e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusUnsub = "${exp}";\n        Debug.Log(statusUnsub);\n    }\n}`,
                    expected: exp,
                    reqs: ["string statusUnsub", "statusUnsub", "Debug.Log"]
                });
            };

            // Ch 35: Múltiplas Interfaces
            tMap[35] = (base) => {
                const exp = "Porta: Interagivel e Destrutivel";
                return makeCSAct(base, {
                    title: "Contratos de Interface Composta",
                    description: "Declare <code>bool podeInteragir = true;</code> e <code>bool podeDestruir = true;</code>, emitindo no Console <code>Porta: Interagivel e Destrutivel</code>.",
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare podeInteragir e podeDestruir e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool podeInteragir = true;\n        bool podeDestruir = true;\n        if (podeInteragir && podeDestruir)\n        {\n            Debug.Log("${exp}");\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["bool podeInteragir", "bool podeDestruir", "Debug.Log"]
                });
            };

            // Ch 36: Exceções Customizadas (Throw)
            tMap[36] = (base) => {
                const exp = "Excecao: Nivel Insuficiente para Entrar";
                return makeCSAct(base, {
                    title: "Lançamento de Erro de Regra",
                    description: "Declare <code>int nivelRequerido = 10;</code> e <code>int nivelPlayer = 5;</code>. Valide com <code>if (nivelPlayer < nivelRequerido)</code> emitindo <code>Excecao: Nivel Insuficiente para Entrar</code>.",
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivelRequerido = 10;\n        int nivelPlayer = 5;\n        // Com if, emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivelRequerido = 10;\n        int nivelPlayer = 5;\n        if (nivelPlayer < nivelRequerido)\n        {\n            Debug.Log("${exp}");\n        }\n    }\n}`,
                    expected: exp,
                    reqs: ["nivelRequerido", "nivelPlayer", "if", "Debug.Log"]
                });
            };

            // Ch 37: Profiler e Draw Calls
            tMap[37] = (base) => {
                const mems = ["450.5", "512.0", "380.2"];
                const m = pickRandom(mems);
                const exp = `Memoria Alocada: ${m} MB`;
                return makeCSAct(base, {
                    title: `Telemetria de Profiler (${m} MB)`,
                    description: `Declare <code>float memoriaUsadaMB = ${m}f;</code> e exiba no Console no formato <code>${exp}</code>.`,
                    starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare float memoriaUsadaMB e emita: ${exp}\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float memoriaUsadaMB = ${m}f;\n        Debug.Log("Memoria Alocada: " + memoriaUsadaMB + " MB");\n    }\n}`,
                    expected: exp,
                    reqs: ["float memoriaUsadaMB", "Debug.Log"]
                });
            };

            return tMap;
        }
    };

    // Export globally
    if (typeof window !== 'undefined') {
        window.FarmingTemplatesManager = FarmingTemplatesManager;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = FarmingTemplatesManager;
    }
})();
