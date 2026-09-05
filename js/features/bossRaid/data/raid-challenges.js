/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: CODE CHALLENGES REPOSITORY
   Mini-desafios rápidos de programação em C por ação e por capítulo
   ═══════════════════════════════════════════════════════════════ */

const RAID_CHALLENGES = {
    // ─── CAPÍTULO 0: I/O (printf, scanf) ───
    0: {
        attack: [
            {
                id: 'ch0_atk_1',
                title: 'Canalizar Disparo Arcano',
                instruction: 'Imprima o comando rúnico de ataque: `DISPARO ARCANO` usando printf.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    // Escreva sua instrucao abaixo:\n    \n    return 0;\n}',
                solutionPattern: /printf\s*\(\s*["']DISPARO\s+ARCANO/i,
                hint: 'Use: printf("DISPARO ARCANO\\n");'
            },
            {
                id: 'ch0_atk_2',
                title: 'Carga de Mana Máxima',
                instruction: 'Declare a variável `int dano = 150;` e imprima formatada com `%d`.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    // Declare e imprima o dano:\n    \n    return 0;\n}',
                solutionPattern: /int\s+dano\s*=\s*\d+[\s\S]*printf\s*\(\s*["'].*%d.*["']\s*,\s*dano/i,
                hint: 'Declare `int dano = 150;` e depois `printf("%d\\n", dano);`'
            }
        ],
        counter: [
            {
                id: 'ch0_cnt_1',
                title: 'Refletir Eco Sonoro',
                instruction: 'Use `printf` com `%%d` para exibir o valor da defesa `int def = 80;`.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int def = 80;\n    // Imprima a defesa:\n    \n    return 0;\n}',
                solutionPattern: /printf\s*\(\s*["'].*%d.*["']\s*,\s*def/i,
                hint: 'printf("%d\\n", def);'
            }
        ],
        dodge: [
            {
                id: 'ch0_ddg_1',
                title: 'Passo Fantasma',
                instruction: 'Exiba a mensagem `ESQUIVA` na tela usando printf.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
                solutionPattern: /printf\s*\(\s*["']ESQUIVA/i,
                hint: 'printf("ESQUIVA\\n");'
            }
        ],
        item: [
            {
                id: 'ch0_itm_1',
                title: 'Elixir de Restauração',
                instruction: 'Some `vida += 50;` e imprima o resultado.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int vida = 100;\n    // Cure 50 e imprima:\n    \n    return 0;\n}',
                solutionPattern: /vida\s*(\+=|\=)\s*(\w+\s*\+\s*)?50[\s\S]*printf/i,
                hint: 'vida += 50; printf("%d", vida);'
            }
        ],
        revive: [
            {
                id: 'ch0_rev_1',
                title: 'Sopro de Ressurreição',
                instruction: 'Declare `int revivido = 1;` e imprima `REVIVER: %d`.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    // Restaure o aliado:\n    \n    return 0;\n}',
                solutionPattern: /int\s+revivido\s*=\s*1[\s\S]*printf\s*\(\s*["'].*REVIVER.*%d.*["']\s*,\s*revivido/i,
                hint: 'int revivido = 1; printf("REVIVER: %d", revivido);'
            }
        ]
    },

    // ─── CAPÍTULO 1: Tipos Primitivos ───
    1: {
        attack: [
            {
                id: 'ch1_atk_1',
                title: 'Golpe Fracionado',
                instruction: 'Declare um `float poder = 125.5f;` e imprima com `%.1f`.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    // Declare e imprima float poder:\n    \n    return 0;\n}',
                solutionPattern: /float\s+poder\s*=\s*\d+(\.\d+)?f?[\s\S]*printf\s*\(\s*["'].*%\.?[1-9]?f.*["']\s*,\s*poder/i,
                hint: 'float poder = 125.5f; printf("%.1f", poder);'
            }
        ],
        counter: [
            {
                id: 'ch1_cnt_1',
                title: 'Casting Defensivo',
                instruction: 'Faça casting explícito convertendo `float impacto = 79.9;` para `int`.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    float impacto = 79.9f;\n    int reduzido = (int)impacto;\n    printf("%d\\n", reduzido);\n    return 0;\n}',
                solutionPattern: /\(int\)\s*impacto/i,
                hint: 'Use (int)impacto;'
            }
        ],
        dodge: [
            {
                id: 'ch1_ddg_1',
                title: 'Desvio de Ponto Flutuante',
                instruction: 'Declare `char esquiva = \'E\';` e imprima com `%c`.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
                solutionPattern: /char\s+esquiva\s*=\s*['"]E['"][\s\S]*printf\s*\(\s*["'].*%c.*["']\s*,\s*esquiva/i,
                hint: 'char esquiva = \'E\'; printf("%c", esquiva);'
            }
        ],
        item: [
            {
                id: 'ch1_itm_1',
                title: 'Poção Concentrada',
                instruction: 'Declare `double cura = 200.0;` e exiba com `printf("%.0f\\n", cura);`.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
                solutionPattern: /double\s+cura\s*=\s*200[\s\S]*printf/i,
                hint: 'double cura = 200.0; printf("%.0f\\n", cura);'
            }
        ],
        revive: [
            {
                id: 'ch1_rev_1',
                title: 'Reconstituição Celular',
                instruction: 'Converta a energia `float alma = 100.0f;` em inteiro e imprima.',
                starterCode: '#include <stdio.h>\n\nint main() {\n    float alma = 100.0f;\n    int hp = (int)alma;\n    printf("Revivido: %d\\n", hp);\n    return 0;\n}',
                solutionPattern: /\(int\)\s*alma/i,
                hint: 'int hp = (int)alma;'
            }
        ]
    },

    // ─── CAPÍTULO 2: Operadores ───
    2: {
        attack: [
            {
                id: 'ch2_atk_1',
                title: 'Operação de Rompimento',
                instruction: 'Complete a expressão de dano multiplicando `base * combo`:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int base = 40;\n    int combo = 3;\n    int total = /* multiplique aqui */;\n    printf("%d\\n", total);\n    return 0;\n}',
                solutionPattern: /total\s*=\s*base\s*\*\s*combo/i,
                hint: 'int total = base * combo;'
            }
        ],
        counter: [
            {
                id: 'ch2_cnt_1',
                title: 'Condição de Parada',
                instruction: 'Verifique se `danoRecebido > 50 && mana >= 20` para contra-atacar:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int danoRecebido = 80;\n    int mana = 30;\n    if (/* complete a condicao */) {\n        printf("CONTRA-GOLPE ATIVADO\\n");\n    }\n    return 0;\n}',
                solutionPattern: /danoRecebido\s*>\s*50\s*&&\s*mana\s*>=\s*20/i,
                hint: 'danoRecebido > 50 && mana >= 20'
            }
        ],
        dodge: [
            {
                id: 'ch2_ddg_1',
                title: 'Evasão Relacional',
                instruction: 'Complete o if para esquivar se `velocidade >= 100`:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int velocidade = 120;\n    if (/* condicao */) {\n        printf("ESQUIVOU\\n");\n    }\n    return 0;\n}',
                solutionPattern: /velocidade\s*>=\s*100/i,
                hint: 'velocidade >= 100'
            }
        ],
        item: [
            {
                id: 'ch2_itm_1',
                title: 'Multiplicador de Poção',
                instruction: 'Calcule `cura = basePocao * 2;` e imprima:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int basePocao = 60;\n    int cura = basePocao * 2;\n    printf("Cura: %d\\n", cura);\n    return 0;\n}',
                solutionPattern: /basePocao\s*\*\s*2/i,
                hint: 'cura = basePocao * 2;'
            }
        ],
        revive: [
            {
                id: 'ch2_rev_1',
                title: 'Barganha da Alma',
                instruction: 'Complete o cálculo `reviveHp = (maxHp * 30) / 100;`:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int maxHp = 1000;\n    int reviveHp = (maxHp * 30) / 100;\n    printf("%d\\n", reviveHp);\n    return 0;\n}',
                solutionPattern: /maxHp\s*\*\s*30\s*\/\s*100/i,
                hint: '(maxHp * 30) / 100'
            }
        ]
    },

    // ─── CAPÍTULO 3: Condicionais (if / else) ───
    3: {
        attack: [
            {
                id: 'ch3_atk_1',
                title: 'Execução Condicional',
                instruction: 'Se `bossHp > 0`, chame `printf("GOLPE CRITICO\\n");`:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int bossHp = 450;\n    if (/* condicao */) {\n        printf("GOLPE CRITICO\\n");\n    }\n    return 0;\n}',
                solutionPattern: /if\s*\(\s*bossHp\s*>\s*0\s*\)/i,
                hint: 'if (bossHp > 0)'
            }
        ],
        counter: [
            {
                id: 'ch3_cnt_1',
                title: 'Riposte Preciso',
                instruction: 'Verifique se `alvo == 1 && defesa > 30` no if:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int alvo = 1, defesa = 50;\n    if (/* condicao */) {\n        printf("CONTRA-ATAQUE\\n");\n    }\n    return 0;\n}',
                solutionPattern: /alvo\s*==\s*1\s*&&\s*defesa\s*>\s*30/i,
                hint: 'alvo == 1 && defesa > 30'
            }
        ],
        dodge: [
            {
                id: 'ch3_ddg_1',
                title: 'Reflexo Imediato',
                instruction: 'Adicione a cláusula else para imprimir `ESQUIVA` quando não for atingido:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int atingido = 0;\n    if (atingido) {\n        printf("DANO\\n");\n    } else {\n        printf("ESQUIVA\\n");\n    }\n    return 0;\n}',
                solutionPattern: /else\s*\{\s*printf\s*\(\s*["']ESQUIVA/i,
                hint: 'else { printf("ESQUIVA\\n"); }'
            }
        ],
        item: [
            {
                id: 'ch3_itm_1',
                title: 'Triagem Rápida',
                instruction: 'Se `hp < 50`, cure com `hp += 80;`:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int hp = 30;\n    if (hp < 50) {\n        hp += 80;\n    }\n    printf("%d\\n", hp);\n    return 0;\n}',
                solutionPattern: /if\s*\(\s*hp\s*<\s*50\s*\)[\s\S]*hp\s*\+=\s*80/i,
                hint: 'if (hp < 50) { hp += 80; }'
            }
        ],
        revive: [
            {
                id: 'ch3_rev_1',
                title: 'Despertar de Emergência',
                instruction: 'Complete a verificação `if (isDowned == 1)` para reviver:',
                starterCode: '#include <stdio.h>\n\nint main() {\n    int isDowned = 1;\n    if (/* condicao */) {\n        printf("ALIADO REVIVIDO\\n");\n    }\n    return 0;\n}',
                solutionPattern: /isDowned\s*==\s*1/i,
                hint: 'isDowned == 1'
            }
        ]
    }
};

// Gerador inteligente de desafio genérico contextualizado para capítulos 4 a 15
function generateGenericChallenge(chapterId, actionType) {
    const chapterTopics = [
        'I/O Basico', 'Tipos Primitivos', 'Operadores Logicos', 'Condicionais if/else',
        'Switch-Case', 'Laco While', 'Laco Do-While', 'Laco For',
        'Vetores/Arrays', 'Matrizes 2D', 'Strings e Char', 'Funcoes e Escopo',
        'Valor vs Referencia', 'Ponteiros e Enderecos', 'Structs e Registros', 'Alocacao Dinamica'
    ];
    const topic = chapterTopics[chapterId] || 'Programacao em C';

    if (actionType === 'attack') {
        return {
            id: `ch${chapterId}_gen_atk`,
            title: `Golpe Arcano — ${topic}`,
            instruction: `Execute o ataque calculando o dano crítico: declare \`int dano = 180;\` e imprima com printf.`,
            starterCode: `#include <stdio.h>\n\nint main() {\n    // [${topic}]\n    int dano = 180;\n    printf("DANO: %d\\n", dano);\n    return 0;\n}`,
            solutionPattern: /dano\s*=\s*180[\s\S]*printf/i,
            hint: 'int dano = 180; printf("DANO: %d\\n", dano);'
        };
    } else if (actionType === 'counter') {
        return {
            id: `ch${chapterId}_gen_cnt`,
            title: `Contra-Ataque — ${topic}`,
            instruction: `Complete a condição lógica para desferir o contra-ataque: \`if (bossAtaque > 0)\`.`,
            starterCode: `#include <stdio.h>\n\nint main() {\n    int bossAtaque = 150;\n    if (/* condicao */) {\n        printf("CONTRA-GOLPE\\n");\n    }\n    return 0;\n}`,
            solutionPattern: /bossAtaque\s*>\s*0/i,
            hint: 'bossAtaque > 0'
        };
    } else if (actionType === 'dodge') {
        return {
            id: `ch${chapterId}_gen_ddg`,
            title: `Evasão Tática — ${topic}`,
            instruction: `Complete a instrução de esquiva imprimindo \`ESQUIVOU\`.`,
            starterCode: `#include <stdio.h>\n\nint main() {\n    printf("ESQUIVOU\\n");\n    return 0;\n}`,
            solutionPattern: /printf\s*\(\s*["']ESQUIVOU/i,
            hint: 'printf("ESQUIVOU\\n");'
        };
    } else if (actionType === 'item') {
        return {
            id: `ch${chapterId}_gen_itm`,
            title: `Canalizar Item — ${topic}`,
            instruction: `Aplique a cura de poção aumentando o HP em +120 e exibindo com printf.`,
            starterCode: `#include <stdio.h>\n\nint main() {\n    int hp = 80;\n    hp += 120;\n    printf("HP: %d\\n", hp);\n    return 0;\n}`,
            solutionPattern: /hp\s*\+=\s*120[\s\S]*printf/i,
            hint: 'hp += 120; printf("HP: %d\\n", hp);'
        };
    } else { // revive
        return {
            id: `ch${chapterId}_gen_rev`,
            title: `Ressuscitar Aliado — ${topic}`,
            instruction: `Restaure a vida do guerreiro caído com \`int status = 1; printf("REVIVIDO\\n");\`.`,
            starterCode: `#include <stdio.h>\n\nint main() {\n    int status = 1;\n    printf("REVIVIDO\\n");\n    return 0;\n}`,
            solutionPattern: /status\s*=\s*1[\s\S]*printf/i,
            hint: 'int status = 1; printf("REVIVIDO\\n");'
        };
    }
}

class RaidChallengeManager {
    /**
     * Coleta atividades dos Capítulos da Campanha e do Abismo (SIDE_QUESTS),
     * misturando-as aleatoriamente a cada turno.
     */
    static getChallenge(chapterId, actionType = 'attack') {
        const chap = Number(chapterId) || 0;
        const candidates = [];

        const isCSharp = (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');

        // 1. Atividades do Capítulo da História
        const chaptersList = isCSharp && typeof CSHARP_CHAPTERS !== 'undefined' ? CSHARP_CHAPTERS : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
        if (Array.isArray(chaptersList) && chaptersList.length > 0) {
            const chData = chaptersList.find(c => c.id === chap) || chaptersList[chap];
            if (chData && chData.activities && chData.activities.length > 0) {
                chData.activities.forEach(act => {
                    candidates.push({
                        id: act.id,
                        title: act.title,
                        origin: `Capítulo ${chap}`,
                        instruction: act.description,
                        description: act.description,
                        starterCode: act.starterCode || (isCSharp ? 'using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        \n    }\n}' : '#include <stdio.h>\n\nint main() {\n    return 0;\n}'),
                        tests: act.tests || [],
                        hints: act.hints || [],
                        validator: act.validator,
                        rawActivity: act
                    });
                });
            }
        }

        // 2. Atividades do Abismo (SIDE_QUESTS)
        const abyssQuests = (typeof missionsManager !== 'undefined' && missionsManager.getAbyssFloor)
            ? (missionsManager.getAbyssFloor(chap) || [])
            : ((typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chap]) ? SIDE_QUESTS[chap] : []);

        if (Array.isArray(abyssQuests) && abyssQuests.length > 0) {
            abyssQuests.forEach(quest => {
                candidates.push({
                    id: quest.id,
                    title: quest.title,
                    origin: `Abismo • Andar ${chap}`,
                    instruction: quest.description,
                    description: quest.description,
                    starterCode: quest.starterCode || '#include <stdio.h>\n\nint main() {\n    return 0;\n}',
                    tests: quest.tests || [],
                    hints: quest.hints || [],
                    validator: quest.validator,
                    rawActivity: quest
                });
            });
        }

        // 3. Mini-desafios pré-definidos de raid para o tipo de ação
        const group = RAID_CHALLENGES[chap];
        if (group && group[actionType] && group[actionType].length > 0) {
            group[actionType].forEach(raidAct => {
                candidates.push({
                    id: raidAct.id,
                    title: raidAct.title,
                    origin: `Boss Raid`,
                    instruction: raidAct.instruction,
                    description: raidAct.instruction,
                    starterCode: raidAct.starterCode || '#include <stdio.h>\n\nint main() {\n    return 0;\n}',
                    solutionPattern: raidAct.solutionPattern,
                    hints: raidAct.hint ? [{ level: 'I', text: raidAct.hint }] : [],
                    rawActivity: raidAct
                });
            });
        }

        // 4. Procedural Training System (PTS) — Geração Procedural Dinâmica
        if (typeof PTS !== 'undefined' && PTS.generateChallenge) {
            try {
                const proceduralAct = PTS.generateChallenge(chap);
                if (proceduralAct) {
                    candidates.push({
                        id: proceduralAct.id,
                        title: `[PTS] ${proceduralAct.title}`,
                        origin: `Treinamento Procedural • Andar ${chap}`,
                        instruction: proceduralAct.description,
                        description: proceduralAct.description,
                        starterCode: proceduralAct.starterCode,
                        tests: proceduralAct.tests,
                        hints: proceduralAct.hints,
                        validator: proceduralAct.validator,
                        rawActivity: proceduralAct
                    });
                }
            } catch (e) {
                console.warn('[RaidChallengeManager] PTS generation notice:', e);
            }
        }

        // Se houver candidatos coletados, sorteia um aleatório
        if (candidates.length > 0) {
            const randomIndex = Math.floor(Math.random() * candidates.length);
            const chosen = candidates[randomIndex];
            // Garante testes mínimos para exibição no terminal caso não possua
            if (!chosen.tests || chosen.tests.length === 0) {
                chosen.tests = [
                    { input: '', expected: 'Execução sem erros', description: 'Validação de sintaxe e execução' }
                ];
            }
            return chosen;
        }

        // Fallback genérico caso nada esteja carregado
        return generateGenericChallenge(chap, actionType);
    }
}

window.RAID_CHALLENGES = RAID_CHALLENGES;
window.RaidChallengeManager = RaidChallengeManager;

