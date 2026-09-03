/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Boss Battles
   20 atividades introdutórias de C

   10 — Estrutura Básica de um Programa C
   10 — Variáveis e Tipos Primitivos

   Estrutura Padronizada:
   description + starterCode + hints + tests + validator
   ═══════════════════════════════════════════════════════════════ */

const BOSS_BATTLES = {

    // ═══════════════════════════════════════════════════════════
    // ESTRUTURA BÁSICA DE UM PROGRAMA C
    // ═══════════════════════════════════════════════════════════

    "estrutura-basica": [

        {
            id: "bb_basic_01",
            title: "O Primeiro Programa",
            difficulty: "easy",
            xp: 20,
            description: "Crie um programa em C que imprima a mensagem <code>Ola, Guilda!</code> na tela.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Imprima a mensagem solicitada\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Use a função printf para mostrar uma mensagem."
                },
                {
                    "level": "II",
                    "text": "Escreva: printf(\"Ola, Guilda!\\n\");"
                },
                {
                    "level": "III",
                    "text": "printf(\"Ola, Guilda!\\n\");"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Ola, Guilda!",
                    "description": "O programa deve imprimir a mensagem solicitada."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("#include <stdio.h>"))
                    errors.push("Inclua a biblioteca stdio.h");

                if (!code.includes("main"))
                    errors.push("O programa precisa possuir a função main");

                if (!code.includes("printf"))
                    errors.push("Utilize printf para exibir a mensagem");

                if (!output.includes("Ola, Guilda!"))
                    errors.push("A saída deve conter 'Ola, Guilda!'");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_basic_02",
            title: "Mensagem da Guilda",
            difficulty: "easy",
            xp: 20,
            description: "Faça o programa imprimir <code>Bem-vindo ao Code Leveler!</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Mostre a mensagem da Guilda\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Use printf dentro da função main."
                },
                {
                    "level": "II",
                    "text": "A mensagem deve ser escrita entre aspas."
                },
                {
                    "level": "III",
                    "text": "printf(\"Bem-vindo ao Code Leveler!\\n\");"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Bem-vindo ao Code Leveler!",
                    "description": "Mensagem de boas-vindas."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("printf"))
                    errors.push("Utilize printf");

                if (!output.includes("Bem-vindo ao Code Leveler!"))
                    errors.push("Mensagem incorreta");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_basic_03",
            title: "Nome da Guilda",
            difficulty: "easy",
            xp: 20,
            description: "Crie um programa que mostre apenas o nome <code>GUILDCODE</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Imprima o nome da Guilda\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Você pode usar printf para imprimir texto."
                },
                {
                    "level": "II",
                    "text": "Textos em C ficam entre aspas duplas."
                },
                {
                    "level": "III",
                    "text": "printf(\"GUILDCODE\\n\");"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "GUILDCODE",
                    "description": "Nome da Guilda."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("printf"))
                    errors.push("Utilize printf");

                if (!output.includes("GUILDCODE"))
                    errors.push("A saída deve conter GUILDCODE");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_basic_04",
            title: "Sistema Iniciado",
            difficulty: "easy",
            xp: 20,
            description: "Faça o programa imprimir <code>Sistema iniciado</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Exiba o status do sistema\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "A função printf pode imprimir textos."
                },
                {
                    "level": "II",
                    "text": "Não esqueça o ponto e vírgula no final do comando."
                },
                {
                    "level": "III",
                    "text": "printf(\"Sistema iniciado\\n\");"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Sistema iniciado",
                    "description": "Status inicial do sistema."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("printf"))
                    errors.push("Utilize printf");

                if (!output.includes("Sistema iniciado"))
                    errors.push("Mensagem incorreta");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_basic_05",
            title: "Duas Mensagens",
            difficulty: "easy",
            xp: 20,
            description: "Imprima duas mensagens, uma em cada linha: <code>Nivel 1</code> e <code>Pronto para a missao</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Imprima duas mensagens\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Você pode utilizar printf duas vezes."
                },
                {
                    "level": "II",
                    "text": "Use \\n para quebrar uma linha."
                },
                {
                    "level": "III",
                    "text": "printf(\"Nivel 1\\n\");\nprintf(\"Pronto para a missao\\n\");"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Nivel 1\nPronto para a missao",
                    "description": "As duas mensagens devem aparecer em linhas diferentes."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!output.includes("Nivel 1"))
                    errors.push("Imprima 'Nivel 1'");

                if (!output.includes("Pronto para a missao"))
                    errors.push("Imprima 'Pronto para a missao'");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_basic_06",
            title: "A Quebra de Linha",
            difficulty: "easy",
            xp: 20,
            description: "Imprima <code>Linha 1</code> e <code>Linha 2</code>, cada uma em uma linha diferente.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Mostre duas linhas\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "O caractere \\n representa uma quebra de linha."
                },
                {
                    "level": "II",
                    "text": "Você pode usar um único printf."
                },
                {
                    "level": "III",
                    "text": "printf(\"Linha 1\\nLinha 2\\n\");"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Linha 1\nLinha 2",
                    "description": "Duas linhas de texto."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("\\n"))
                    errors.push("Utilize uma quebra de linha");

                if (!output.includes("Linha 1"))
                    errors.push("Falta Linha 1");

                if (!output.includes("Linha 2"))
                    errors.push("Falta Linha 2");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_basic_07",
            title: "O Portal",
            difficulty: "easy",
            xp: 20,
            description: "Complete a estrutura básica de um programa C e faça o programa imprimir <code>Portal aberto</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Complete o programa\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Todo programa precisa de uma função main."
                },
                {
                    "level": "II",
                    "text": "Use printf dentro de main."
                },
                {
                    "level": "III",
                    "text": "printf(\"Portal aberto\\n\");"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Portal aberto",
                    "description": "O portal deve ser aberto."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("#include <stdio.h>"))
                    errors.push("Inclua stdio.h");

                if (!code.includes("int main"))
                    errors.push("Crie a função main");

                if (!code.includes("return 0"))
                    errors.push("Utilize return 0");

                if (!output.includes("Portal aberto"))
                    errors.push("Saída incorreta");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_basic_08",
            title: "Programa Finalizado",
            difficulty: "easy",
            xp: 20,
            description: "Crie um programa que imprima <code>Programa finalizado</code> e termine corretamente com <code>return 0</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Mostre a mensagem final\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "A função main pode retornar 0 ao terminar."
                },
                {
                    "level": "II",
                    "text": "Use printf antes do return."
                },
                {
                    "level": "III",
                    "text": "printf(\"Programa finalizado\\n\");\nreturn 0;"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Programa finalizado",
                    "description": "Programa encerrado corretamente."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("return 0"))
                    errors.push("O programa deve utilizar return 0");

                if (!output.includes("Programa finalizado"))
                    errors.push("Mensagem incorreta");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_basic_09",
            title: "A Biblioteca da Guilda",
            difficulty: "easy",
            xp: 20,
            description: "Utilize a biblioteca <code>stdio.h</code> e faça o programa imprimir <code>Biblioteca carregada</code>.",
            starterCode: "// Inclua a biblioteca necessária\n\nint main() {\n    // Mostre a mensagem\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "A função printf pertence à biblioteca stdio.h."
                },
                {
                    "level": "II",
                    "text": "Use #include <stdio.h> no início do programa."
                },
                {
                    "level": "III",
                    "text": "#include <stdio.h>\n\nprintf(\"Biblioteca carregada\\n\");"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Biblioteca carregada",
                    "description": "Biblioteca utilizada corretamente."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("#include <stdio.h>"))
                    errors.push("Inclua stdio.h");

                if (!code.includes("printf"))
                    errors.push("Utilize printf");

                if (!output.includes("Biblioteca carregada"))
                    errors.push("Saída incorreta");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_basic_10",
            title: "Mensagem Final",
            difficulty: "easy",
            xp: 20,
            description: "Crie um programa completo que mostre <code>Boss derrotado</code> na tela.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Derrote o Boss\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Você já conhece a estrutura básica de um programa C."
                },
                {
                    "level": "II",
                    "text": "Utilize printf dentro de main."
                },
                {
                    "level": "III",
                    "text": "printf(\"Boss derrotado\\n\");"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Boss derrotado",
                    "description": "Mensagem de vitória."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("#include <stdio.h>"))
                    errors.push("Inclua stdio.h");

                if (!code.includes("int main"))
                    errors.push("Crie a função main");

                if (!code.includes("printf"))
                    errors.push("Utilize printf");

                if (!output.includes("Boss derrotado"))
                    errors.push("O Boss ainda não foi derrotado");

                return { pass: errors.length === 0, errors };
            }
        }
    ],


    // ═══════════════════════════════════════════════════════════
    // VARIÁVEIS E TIPOS PRIMITIVOS
    // ═══════════════════════════════════════════════════════════

    "variaveis-tipos-primitivos": [

        {
            id: "bb_types_01",
            title: "A Mana do Herói",
            difficulty: "easy",
            xp: 20,
            description: "Declare uma variável <code>int mana</code> com valor <code>100</code> e imprima seu valor.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare mana como int\n    \n    // Imprima mana\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Use int para armazenar números inteiros."
                },
                {
                    "level": "II",
                    "text": "Declare: int mana = 100;"
                },
                {
                    "level": "III",
                    "text": "int mana = 100;\nprintf(\"%d\\n\", mana);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "100",
                    "description": "Mana inicial do herói."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("int mana"))
                    errors.push("Declare mana como int");

                if (!output.includes("100"))
                    errors.push("A saída deve ser 100");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_types_02",
            title: "O Nível do Herói",
            difficulty: "easy",
            xp: 20,
            description: "Crie uma variável inteira chamada <code>nivel</code> com valor <code>5</code> e mostre seu valor.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare nivel\n    \n    // Imprima nivel\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Números inteiros podem ser armazenados usando int."
                },
                {
                    "level": "II",
                    "text": "Use int nivel = 5;"
                },
                {
                    "level": "III",
                    "text": "int nivel = 5;\nprintf(\"%d\\n\", nivel);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "5",
                    "description": "Nível atual do herói."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("int nivel"))
                    errors.push("Declare nivel como int");

                if (!output.includes("5"))
                    errors.push("A saída deve ser 5");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_types_03",
            title: "Vida do Guerreiro",
            difficulty: "easy",
            xp: 20,
            description: "Declare <code>int vida = 80</code> e imprima no formato <code>Vida: 80</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare a vida do guerreiro\n    \n    // Imprima no formato solicitado\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Use uma variável int."
                },
                {
                    "level": "II",
                    "text": "Para imprimir um int use %d."
                },
                {
                    "level": "III",
                    "text": "int vida = 80;\nprintf(\"Vida: %d\\n\", vida);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Vida: 80",
                    "description": "Vida inicial do guerreiro."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("int vida"))
                    errors.push("Declare vida como int");

                if (!output.includes("Vida: 80"))
                    errors.push("Formato esperado: Vida: 80");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_types_04",
            title: "A Classe do Herói",
            difficulty: "easy",
            xp: 20,
            description: "Declare uma variável <code>char classe = 'C'</code> e imprima <code>Classe: C</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare a classe como char\n    \n    // Imprima a classe\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "O tipo char armazena um único caractere."
                },
                {
                    "level": "II",
                    "text": "Caracteres utilizam aspas simples."
                },
                {
                    "level": "III",
                    "text": "char classe = 'C';\nprintf(\"Classe: %c\\n\", classe);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Classe: C",
                    "description": "Classe representada por um caractere."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("char classe"))
                    errors.push("Declare classe como char");

                if (!output.includes("Classe: C"))
                    errors.push("Formato esperado: Classe: C");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_types_05",
            title: "A Runa",
            difficulty: "easy",
            xp: 20,
            description: "Crie uma variável <code>char runa</code> contendo o caractere <code>A</code> e imprima seu valor.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare a runa\n    \n    // Imprima a runa\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Use char para representar um caractere."
                },
                {
                    "level": "II",
                    "text": "O valor 'A' deve utilizar aspas simples."
                },
                {
                    "level": "III",
                    "text": "char runa = 'A';\nprintf(\"%c\\n\", runa);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "A",
                    "description": "Runa A."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("char runa"))
                    errors.push("Declare runa como char");

                if (!output.includes("A"))
                    errors.push("A saída deve conter A");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_types_06",
            title: "Poder Mágico",
            difficulty: "easy",
            xp: 20,
            description: "Declare <code>float poder = 10.5</code> e imprima no formato <code>Poder: 10.50</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare o poder como float\n    \n    // Imprima com duas casas decimais\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Use float para armazenar números com casas decimais."
                },
                {
                    "level": "II",
                    "text": "Use %.2f para mostrar duas casas decimais."
                },
                {
                    "level": "III",
                    "text": "float poder = 10.5;\nprintf(\"Poder: %.2f\\n\", poder);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Poder: 10.50",
                    "description": "Poder mágico formatado."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("float poder"))
                    errors.push("Declare poder como float");

                if (!output.includes("Poder: 10.50"))
                    errors.push("Use duas casas decimais");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_types_07",
            title: "O Peso do Equipamento",
            difficulty: "easy",
            xp: 20,
            description: "Declare <code>float peso = 2.5</code> e imprima <code>Peso: 2.50</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare o peso\n    \n    // Imprima o peso\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "O peso possui casas decimais."
                },
                {
                    "level": "II",
                    "text": "Use float e %.2f."
                },
                {
                    "level": "III",
                    "text": "float peso = 2.5;\nprintf(\"Peso: %.2f\\n\", peso);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Peso: 2.50",
                    "description": "Peso formatado com duas casas."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("float peso"))
                    errors.push("Declare peso como float");

                if (!output.includes("Peso: 2.50"))
                    errors.push("Saída esperada: Peso: 2.50");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_types_08",
            title: "O Ouro da Guilda",
            difficulty: "easy",
            xp: 20,
            description: "Declare uma variável <code>double ouro = 125.75</code> e imprima <code>Ouro: 125.75</code>.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare ouro como double\n    \n    // Imprima o valor\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "O tipo double armazena números decimais."
                },
                {
                    "level": "II",
                    "text": "Para printf, use %f."
                },
                {
                    "level": "III",
                    "text": "double ouro = 125.75;\nprintf(\"Ouro: %.2f\\n\", ouro);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Ouro: 125.75",
                    "description": "Quantidade de ouro."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("double ouro"))
                    errors.push("Declare ouro como double");

                if (!output.includes("Ouro: 125.75"))
                    errors.push("Saída esperada: Ouro: 125.75");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_types_09",
            title: "Dois Atributos",
            difficulty: "easy",
            xp: 20,
            description: "Declare <code>int forca = 10</code> e <code>int defesa = 8</code>. Imprima os dois atributos.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare força e defesa\n    \n    // Imprima os dois valores\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Crie duas variáveis do tipo int."
                },
                {
                    "level": "II",
                    "text": "Use %d para imprimir cada variável."
                },
                {
                    "level": "III",
                    "text": "int forca = 10;\nint defesa = 8;\nprintf(\"Forca: %d\\n\", forca);\nprintf(\"Defesa: %d\\n\", defesa);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Forca: 10\nDefesa: 8",
                    "description": "Atributos de força e defesa."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("int forca"))
                    errors.push("Declare forca como int");

                if (!code.includes("int defesa"))
                    errors.push("Declare defesa como int");

                if (!output.includes("Forca: 10"))
                    errors.push("Forca deve ser 10");

                if (!output.includes("Defesa: 8"))
                    errors.push("Defesa deve ser 8");

                return { pass: errors.length === 0, errors };
            }
        },

        {
            id: "bb_types_10",
            title: "Painel de Atributos",
            difficulty: "easy",
            xp: 20,
            description: "Crie três variáveis: <code>int nivel = 3</code>, <code>float poder = 15.5</code> e <code>char classe = 'C'</code>. Imprima os três atributos.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare nivel, poder e classe\n    \n    // Imprima os três atributos\n    \n    return 0;\n}",
            hints: [
                {
                    "level": "I",
                    "text": "Use int para nivel, float para poder e char para classe."
                },
                {
                    "level": "II",
                    "text": "Use %d, %.1f e %c para imprimir os valores."
                },
                {
                    "level": "III",
                    "text": "int nivel = 3;\nfloat poder = 15.5;\nchar classe = 'C';\nprintf(\"Nivel: %d\\n\", nivel);\nprintf(\"Poder: %.1f\\n\", poder);\nprintf(\"Classe: %c\\n\", classe);"
                }
            ],
            tests: [
                {
                    "input": "",
                    "expected": "Nivel: 3\nPoder: 15.5\nClasse: C",
                    "description": "Painel completo de atributos."
                }
            ],
            validator: function(code, output) {
                let errors = [];

                if (!code.includes("int nivel"))
                    errors.push("Declare nivel como int");

                if (!code.includes("float poder"))
                    errors.push("Declare poder como float");

                if (!code.includes("char classe"))
                    errors.push("Declare classe como char");

                if (!output.includes("Nivel: 3"))
                    errors.push("Nivel deve ser 3");

                if (!output.includes("Poder: 15.5"))
                    errors.push("Poder deve ser 15.5");

                if (!output.includes("Classe: C"))
                    errors.push("Classe deve ser C");

                return { pass: errors.length === 0, errors };
            }
        }
    ]
};


// ═══════════════════════════════════════════════════════════════
// TODAS AS BOSS BATTLES
// ═══════════════════════════════════════════════════════════════

const ALL_BOSS_BATTLES = [
    ...BOSS_BATTLES["estrutura-basica"],
    ...BOSS_BATTLES["variaveis-tipos-primitivos"]
];


// ═══════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        BOSS_BATTLES,
        ALL_BOSS_BATTLES
    };
}