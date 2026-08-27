/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — Chapter Content Data
   15 structured C programming chapters with narrative, theory, experiments, activities.
   ═══════════════════════════════════════════════════════════════ */

const CHAPTERS = [
// ═══════════════════════════════════════════════════════
// NEW CHAPTERS 01-03 (prepended before existing chapters)
// ═══════════════════════════════════════════════════════

// CAPÍTULO 01 — O PRIMEIRO CONTATO
// Concept: Revisão C — compilação, tipos, declarações, operadores, atribuições
{
    id: 1,
    title: "O Primeiro Contato",
    theme: "Fundamentos de C",
    unlock: "Terminal Básico",
    unlockIcon: "[>]",
    character: "arkan",
    xpReward: 80,
    story: [
        { type: "system", text: "[ SISTEMA ] Iniciando reconstrucao do modulo: TERMINAL" },
        { type: "narrative", text: "Uma tela holografica surge diante de voce. O GM aparece com sua mascara dourada." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Bem-vindo ao Sistema da Guilda. Eu sou o Game Master -- o guia deste sistema. Meu papel e orienta-lo durante toda a jornada." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "A Guilda esta em colapso. Cada modulo de seu sistema esta danificado. Para restaura-lo, voce precisara dominar as linguagens que mantem estes sistemas funcionando." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "O primeiro modulo a ser restaurado e o TERMINAL. Sem ele, nenhum outro sistema pode ser acessado." },
        { type: "narrative", text: "Arkan Velor, o Mestre da Guilda, se aproxima. Seus olhos refletem a urgencia da situacao." },
        { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Nosso Terminal de comando esta completamente destruido. Sem ele, nao conseguimos nem consultar os registros da Guilda." },
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Os registros mostram que o Terminal era mantido por um tipo de escrita antigo. Um idioma que traduz nossas instrucoes em comandos que a maquina entende." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Esse idioma e chamado <span class='highlight'>C</span>. E a linguagem base de todos os sistemas da Guilda. Voce precisa aprende-la para restaurar cada modulo." },
        { type: "narrative", text: "O GM projeta um painel com simbolos e instrucoes." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Em C, voce escreve instrucoes que o <span class='highlight'>COMPILADOR</span> traduz para a lingua da maquina. Cada programa precisa de um ponto de entrada -- uma funcao especial chamada <code>main()</code>." },
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Os dados sao guardados em recipientes chamados <span class='highlight'>VARIAVEIS</span>. Cada recipiente so aceita um tipo de conteudo: numeros inteiros, caracteres, numeros decimais." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Aprenda a declarar variaveis e operar com elas. Quando estiver pronto, a primeira peca do Terminal sera restaurada." }
    ],
    concept: {
        title: "TIPOS E VARIÁVEIS — Conceito",
        explanation: "Em C, toda variável tem um tipo. Os tipos básicos são: int (número inteiro), char (caractere), float (decimal simples), double (decimal preciso). Declare uma variável antes de usar.",
        code: "int nivel = 1;\nchar classe = 'A';\nfloat poder = 95.5;\ndouble ouro = 1000.00;"
    },
    example: {
        title: "Exemplo — Declarar e Usar Variáveis",
        code: '#include <stdio.h>\n\nint main() {\n    int vida = 150;\n    int dano = 30;\n    int vidaFinal = vida - dano;\n    \n    printf("Vida: %d\\n", vida);\n    printf("Dano: %d\\n", dano);\n    printf("Vida restante: %d\\n", vidaFinal);\n    \n    return 0;\n}',
        output: "Vida: 150\nDano: 30\nVida restante: 120"
    },
    experiment: {
        title: "Experimente",
        description: "Modifique os valores das variáveis e observe como as operações afetam o resultado.",
        starterCode: '#include <stdio.h>\n\nint main() {\n    int vida = 100;\n    int dano = 25;\n    int cura = 10;\n    \n    int resultado = vida - dano + cura;\n    \n    printf("Vida: %d\\n", vida);\n    printf("Dano: %d\\n", dano);\n    printf("Cura: %d\\n", cura);\n    printf("Resultado: %d\\n", resultado);\n    \n    return 0;\n}'
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Declare uma variável inteira chamada 'poder' com valor 50 e imprima:",
                starterCode: '#include <stdio.h>\n\nint main() {\n    // Declare uma variavel int chamada poder com valor 50\n    \n    // Imprima: Poder: 50\n    \n    return 0;\n}',
                solution: '#include <stdio.h>\n\nint main() {\n    int poder = 50;\n    printf("Poder: %d\\n", poder);\n    return 0;\n}',
                hint: "Use: int poder = 50; e printf(\"Poder: %d\", poder);"
            },
            {
                instruction: "Agora crie uma operação de soma e imprima o resultado:",
                starterCode: '#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int b = 20;\n    // Some a e b e imprima o resultado\n    \n    return 0;\n}',
                solution: '#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int b = 20;\n    int soma = a + b;\n    printf("Soma: %d\\n", soma);\n    return 0;\n}',
                hint: "int soma = a + b; printf(\"Soma: %d\", soma);"
            }
        ]
    },
    activities: [
        {
            id: "ch1_a1",
            title: "Declarar Variáveis",
            difficulty: "easy",
            description: "Declare uma variável <code>int</code> chamada <code>poder</code> com valor <code>42</code> e imprima: <code>Poder: 42</code>.",
            starterCode: '#include <stdio.h>\n\nint main() {\n    // Declare uma variavel int chamada poder com valor 42\n    \n    // Imprima: Poder: 42\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "Use: int nome = valor;" },
                { level: "II", text: "int poder = 42; e depois printf(\"Poder: %d\", poder);" },
                { level: "III", text: "int poder = 42;\nprintf(\"Poder: %d\", poder);" }
            ],
            tests: [
                { input: "", expected: "Poder: 42", description: "Variável declarada e impressa" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("int poder")) errors.push("Declare: int poder = 42;");
                if (!output.includes("42")) errors.push("A saída deve conter o valor 42");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "ch1_a2",
            title: "Operações Básicas",
            difficulty: "easy",
            description: "Declare <code>a = 15</code>, <code>b = 7</code>. Calcule e imprima a <strong>soma</strong>, <strong>subtração</strong> e <strong>multiplicação</strong>.",
            starterCode: '#include <stdio.h>\n\nint main() {\n    int a = 15;\n    int b = 7;\n    \n    // Calcule e imprima:\n    // Soma: 22\n    // Sub: 8\n    // Mult: 105\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "Use +, - e * para as operações." },
                { level: "II", text: "printf(\"Soma: %d\", a + b);" },
                { level: "III", text: "printf(\"Soma: %d\\n\", a + b);\nprintf(\"Sub: %d\\n\", a - b);\nprintf(\"Mult: %d\\n\", a * b);" }
            ],
            tests: [
                { input: "", expected: "Soma: 22", description: "Soma correta" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Soma: 22")) errors.push("Soma deve ser 22");
                if (!output.includes("Sub: 8")) errors.push("Subtração deve ser 8");
                if (!output.includes("Mult: 105")) errors.push("Multiplicação deve ser 105");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "ch1_a3",
            title: "Calculadora da Guilda",
            difficulty: "medium",
            description: "Crie um programa que receba dois valores via atribuição (não precisa de scanf), calcule e imprima: <strong>soma</strong>, <strong>subtração</strong>, <strong>multiplicação</strong> e <strong>divisão inteira</strong> entre eles.",
            starterCode: '#include <stdio.h>\n\nint main() {\n    int a = 100;\n    int b = 7;\n    \n    // Calcule e imprima as 4 operacoes:\n    // Soma: ...\n    // Sub: ...\n    // Mult: ...\n    // Div: ...\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "Use +, -, *, / para as 4 operações básicas." },
                { level: "II", text: "A divisão inteira em C entre dois ints trunca o resultado." },
                { level: "III", text: "printf(\"Soma: %d\\n\", a + b);\nprintf(\"Sub: %d\\n\", a - b);\nprintf(\"Mult: %d\\n\", a * b);\nprintf(\"Div: %d\\n\", a / b);" }
            ],
            tests: [
                { input: "", expected: "Div: 14", description: "Divisão inteira correta" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Soma: 107")) errors.push("Soma deve ser 107");
                if (!output.includes("Div: 14")) errors.push("Divisão deve ser 14");
                if (!code.includes("a + b") && !code.includes("a+b")) errors.push("Use operador + para soma");
                if (!code.includes("a / b") && !code.includes("a/b")) errors.push("Use operador / para divisão");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// CAPÍTULO 02 — A VOZ DA GUILDA
// Concept: Entrada (scanf), Saída (printf) e Estruturas de Controle (if/else, while, for)
{
    id: 2,
    title: "A Voz da Guilda",
    theme: "Entrada, Saída e Controle",
    unlock: "Sistema de Comando",
    unlockIcon: "[::]",
    character: "lyra",
    xpReward: 90,
    story: [
        { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: COMANDO" },
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Agora que você sabe criar variáveis, precisamos que o sistema responda a situações diferentes. Nem sempre o código pode seguir um único caminho." },
        { type: "narrative", text: "Lyra mostra um terminal piscando com opções de comando." },
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Com <span class='highlight'>if/else</span>, o programa decide. Com <span class='highlight'>while</span> e <span class='highlight'>for</span>, ele repete. E com <span class='highlight'>printf</span> e <span class='highlight'>scanf</span>, ele se comunica." },
        { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Em C, printf imprime texto na tela. scanf lê dados do teclado. São os olhos e a boca do programa." }
    ],
    concept: {
        title: "CONTROLE DE FLUXO — Conceito",
        explanation: "Estruturas de controle decidem o que o programa faz: if/else escolhe entre caminhos, while repete enquanto uma condição for verdadeira, for repete um número definido de vezes.",
        code: 'int vida = 80;\nif (vida > 50) {\n    printf("Saudavel");\n} else {\n    printf("Ferido");\n}\n\nfor (int i = 0; i < 5; i++) {\n    printf("%d ", i);\n}'
    },
    example: {
        title: "Exemplo — Decisão e Repetição",
        code: '#include <stdio.h>\n\nint main() {\n    int nivel = 15;\n    \n    if (nivel >= 10) {\n        printf("Rank: AVANCADO\\n");\n    } else if (nivel >= 5) {\n        printf("Rank: INTERMEDIARIO\\n");\n    } else {\n        printf("Rank: NOVATO\\n");\n    }\n    \n    printf("Contagem: ");\n    for (int i = 1; i <= 5; i++) {\n        printf("%d ", i);\n    }\n    printf("\\n");\n    \n    return 0;\n}',
        output: "Rank: AVANCADO\nContagem: 1 2 3 4 5"
    },
    experiment: {
        title: "Experimente",
        description: "Altere o nível e observe como a decisão muda. Modifique o loop para contar até 10.",
        starterCode: '#include <stdio.h>\n\nint main() {\n    int vida = 40;\n    \n    if (vida > 50) {\n        printf("Vida alta\\n");\n    } else {\n        printf("Vida baixa - usar pocao!\\n");\n    }\n    \n    for (int i = 0; i < 3; i++) {\n        printf("Turno %d\\n", i + 1);\n    }\n    \n    return 0;\n}'
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Complete o if/else para verificar se um aventureiro pode entrar na Guilda (nivel >= 5):",
                starterCode: '#include <stdio.h>\n\nint main() {\n    int nivel = 3;\n    \n    // Complete: se nivel >= 5, imprima "Acesso permitido"\n    // Senao, imprima "Acesso negado"\n    \n    return 0;\n}',
                solution: '#include <stdio.h>\n\nint main() {\n    int nivel = 3;\n    \n    if (nivel >= 5) {\n        printf("Acesso permitido\\n");\n    } else {\n        printf("Acesso negado\\n");\n    }\n    \n    return 0;\n}',
                hint: "Use: if (nivel >= 5) { ... } else { ... }"
            },
            {
                instruction: "Use um for para imprimir os 5 primeiros números da sequência de dano: 10, 20, 30, 40, 50:",
                starterCode: '#include <stdio.h>\n\nint main() {\n    // Use um for de 1 a 5\n    // Imprima i * 10 em cada iteração\n    \n    return 0;\n}',
                solution: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i * 10);\n    }\n    return 0;\n}',
                hint: "for (int i = 1; i <= 5; i++) { printf(\"%d\", i * 10); }"
            }
        ]
    },
    activities: [
        {
            id: "ch2_a1",
            title: "Decisão de Rank",
            difficulty: "easy",
            description: "Dada uma variável <code>nivel = 12</code>, use <code>if/else if/else</code> para imprimir o rank: >= 10 = \"MESTRE\", >= 5 = \"AVANCADO\", senão = \"NOVATO\".",
            starterCode: '#include <stdio.h>\n\nint main() {\n    int nivel = 12;\n    \n    // Use if/else if/else para classificar:\n    // nivel >= 10 -> MESTRE\n    // nivel >= 5 -> AVANCADO\n    // senao -> NOVATO\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "Use if (nivel >= 10), else if (nivel >= 5), else." },
                { level: "II", text: "if (nivel >= 10) printf(\"MESTRE\");\nelse if (nivel >= 5) printf(\"AVANCADO\");\nelse printf(\"NOVATO\");" },
                { level: "III", text: 'if (nivel >= 10) {\n    printf("MESTRE\\n");\n} else if (nivel >= 5) {\n    printf("AVANCADO\\n");\n} else {\n    printf("NOVATO\\n");\n}' }
            ],
            tests: [
                { input: "", expected: "MESTRE", description: "Rank correto para nivel 12" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("MESTRE")) errors.push("Deve imprimir MESTRE para nivel 12");
                if (!code.includes("if")) errors.push("Use if/else");
                if (!code.includes("else")) errors.push("Use else if/else");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "ch2_a2",
            title: "Contagem Regressiva",
            difficulty: "easy",
            description: "Use um <code>for</code> para imprimir uma contagem regressiva de 10 até 1. Depois imprima \"Ataque!\".",
            starterCode: '#include <stdio.h>\n\nint main() {\n    // Use for para contar de 10 ate 1\n    // Imprima cada numero\n    // Depois imprima "Ataque!"\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "O for deve decrementar: i-- de 10 até 1." },
                { level: "II", text: "for (int i = 10; i >= 1; i--) { printf(\"%d\\n\", i); }" },
                { level: "III", text: 'for (int i = 10; i >= 1; i--) {\n    printf("%d\\n", i);\n}\nprintf("Ataque!\\n");' }
            ],
            tests: [
                { input: "", expected: "10", description: "Contagem começa em 10" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("10")) errors.push("Deve começar em 10");
                if (!output.includes("1")) errors.push("Deve terminar em 1");
                if (!output.includes("Ataque")) errors.push("Deve imprimir Ataque!");
                if (!code.includes("for")) errors.push("Use um loop for");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "ch2_a3",
            title: "Simulador de Batalha",
            difficulty: "medium",
            description: "Simule 5 turnos de batalha. A cada turno, o dano aumenta em 10. Comece com dano 10 e termine com 50. Imprima cada turno.",
            starterCode: '#include <stdio.h>\n\nint main() {\n    // Simule 5 turnos com for\n    // Turno 1: Dano 10\n    // Turno 2: Dano 20\n    // ...\n    // Turno 5: Dano 50\n    // No final, imprima "Batalha encerrada!"\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "Use for de 1 a 5 e multiplique o turno por 10." },
                { level: "II", text: "for (int i = 1; i <= 5; i++) { printf(\"Turno %d: Dano %d\\n\", i, i * 10); }" },
                { level: "III", text: 'for (int i = 1; i <= 5; i++) {\n    printf("Turno %d: Dano %d\\n", i, i * 10);\n}\nprintf("Batalha encerrada!\\n");' }
            ],
            tests: [
                { input: "", expected: "Turno 1: Dano 10", description: "Primeiro turno correto" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Turno 1: Dano 10")) errors.push("Turno 1 deve ser Dano 10");
                if (!output.includes("Turno 5: Dano 50")) errors.push("Turno 5 deve ser Dano 50");
                if (!output.includes("Batalha encerrada")) errors.push("Deve imprimir mensagem final");
                if (!code.includes("for")) errors.push("Use um loop for");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// CAPÍTULO 03 — O ESCRIBA DA GUILDA
// Concept: Funções
{
    id: 3,
    title: "O Escriba da Guilda",
    theme: "Funções",
    unlock: "Sistema de Escrita",
    unlockIcon: "[>>]",
    character: "elion",
    xpReward: 100,
    story: [
        { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: ESCRITA" },
        { type: "character", name: "ELION RAVEN", role: "MESTRE DOS REGISTROS", cssClass: "elion", text: "A Guilda precisa executar tarefas repetidas: calcular poder, verificar nível, formatar fichas. Escrever o mesmo código várias vezes é ineficiente." },
        { type: "narrative", text: "Elion mostra trechos de código repetidos em diferentes partes de um programa." },
        { type: "character", name: "ELION RAVEN", role: "MESTRE DOS REGISTROS", cssClass: "elion", text: "Uma <span class='highlight'>FUNÇÃO</span> é um bloco de código reutilizável. Você a define uma vez e a chama quantas vezes precisar." },
        { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Funções tornam o código organizado, limpo e fácil de manter. Toda função precisa de um TIPO de retorno, um NOME e pode ter PARÂMETROS." }
    ],
    concept: {
        title: "FUNÇÕES — Conceito",
        explanation: "Uma função é um bloco de código com nome que executa uma tarefa específica. Ela pode receber dados (parâmetros) e retornar um resultado.",
        code: 'int somar(int a, int b) {\n    return a + b;\n}\n\nvoid imprimir(char msg[]) {\n    printf("%s\\n", msg);\n}\n\nint main() {\n    int r = somar(10, 20);\n    printf("%d", r);\n    return 0;\n}'
    },
    example: {
        title: "Exemplo — Criar e Chamar Funções",
        code: '#include <stdio.h>\n\nint calcularPoder(int ataque, int defesa) {\n    return ataque * 2 + defesa;\n}\n\nvoid exibirFicha(char nome[], int nivel, int poder) {\n    printf("=== FICHA ===\\n");\n    printf("Nome: %s\\n", nome);\n    printf("Nivel: %d\\n", nivel);\n    printf("Poder: %d\\n", poder);\n}\n\nint main() {\n    int poder = calcularPoder(15, 10);\n    exibirFicha("Arion", 12, poder);\n    return 0;\n}',
        output: "=== FICHA ===\nNome: Arion\nNivel: 12\nPoder: 40"
    },
    experiment: {
        title: "Experimente",
        description: "Modifique os parâmetros da função e observe como o resultado muda.",
        starterCode: '#include <stdio.h>\n\nint multiplicar(int a, int b) {\n    return a * b;\n}\n\nint main() {\n    int r1 = multiplicar(3, 4);\n    int r2 = multiplicar(5, 6);\n    \n    printf("3 x 4 = %d\\n", r1);\n    printf("5 x 6 = %d\\n", r2);\n    \n    return 0;\n}'
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Crie uma função que receba um nível e retorne o dano base (nivel * 10):",
                starterCode: '#include <stdio.h>\n\n// Crie a funcao danoBase aqui\n\nint main() {\n    int d = danoBase(5);\n    printf("Dano: %d\\n", d);\n    return 0;\n}',
                solution: '#include <stdio.h>\n\nint danoBase(int nivel) {\n    return nivel * 10;\n}\n\nint main() {\n    int d = danoBase(5);\n    printf("Dano: %d\\n", d);\n    return 0;\n}',
                hint: "int danoBase(int nivel) { return nivel * 10; }"
            },
            {
                instruction: "Crie uma função que imprima uma mensagem formatada:",
                starterCode: '#include <stdio.h>\n\n// Crie void avisar(char msg[]) que imprima: [AVISO] msg\n\nint main() {\n    avisar("Inimigo detectado!");\n    return 0;\n}',
                solution: '#include <stdio.h>\n\nvoid avisar(char msg[]) {\n    printf("[AVISO] %s\\n", msg);\n}\n\nint main() {\n    avisar("Inimigo detectado!");\n    return 0;\n}',
                hint: 'void avisar(char msg[]) { printf("[AVISO] %s", msg); }'
            }
        ]
    },
    activities: [
        {
            id: "ch3_a1",
            title: "Função de Dano",
            difficulty: "easy",
            description: "Crie uma função <code>int dano(int ataque, int defesa)</code> que retorne <code>ataque - defesa</code>. Chame com ataque=20, defesa=8 e imprima o resultado.",
            starterCode: '#include <stdio.h>\n\n// Crie a funcao dano aqui\n\nint main() {\n    int resultado = dano(20, 8);\n    printf("Dano: %d\\n", resultado);\n    return 0;\n}',
            hints: [
                { level: "I", text: "A função recebe dois int e retorna a subtração." },
                { level: "II", text: "int dano(int ataque, int defesa) { return ataque - defesa; }" },
                { level: "III", text: "int dano(int ataque, int defesa) {\n    return ataque - defesa;\n}" }
            ],
            tests: [
                { input: "", expected: "Dano: 12", description: "Dano correto" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Dano: 12")) errors.push("O dano deve ser 12");
                if (!code.includes("int dano")) errors.push("Crie a função dano");
                if (!code.includes("return")) errors.push("Use return na função");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "ch3_a2",
            title: "Função de Classificação",
            difficulty: "easy",
            description: "Crie uma função <code>void classificar(int nivel)</code> que imprima: >= 20 = \"LENDO\", >= 10 = \"FORTE\", senão = \"FRACO\".",
            starterCode: '#include <stdio.h>\n\n// Crie a funcao classificar aqui\n\nint main() {\n    classificar(15);\n    classificar(25);\n    classificar(3);\n    return 0;\n}',
            hints: [
                { level: "I", text: "Use if/else if/else dentro da função." },
                { level: "II", text: 'void classificar(int nivel) {\n    if (nivel >= 20) printf("LENDO\\n");\n    else if (nivel >= 10) printf("FORTE\\n");\n    else printf("FRACO\\n");\n}' },
                { level: "III", text: 'void classificar(int nivel) {\n    if (nivel >= 20) printf("LENDO\\n");\n    else if (nivel >= 10) printf("FORTE\\n");\n    else printf("FRACO\\n");\n}' }
            ],
            tests: [
                { input: "", expected: "FORTE", description: "Classificação para nivel 15" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("FORTE")) errors.push("Nivel 15 deve ser FORTE");
                if (!output.includes("LENDO")) errors.push("Nivel 25 deve ser LENDO");
                if (!output.includes("FRACO")) errors.push("Nivel 3 deve ser FRACO");
                if (!code.includes("void classificar")) errors.push("Crie a função classificar");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "ch3_a3",
            title: "Sistema de Batalha",
            difficulty: "medium",
            description: "Crie uma função <code>int batalha(int vida, int dano)</code> que retorne a vida após o dano (vida - dano, mínimo 0). Depois crie <code>void turno(int numero, int vida)</code> que imprima o estado. Simule 3 turnos com dano 25 cada.",
            starterCode: '#include <stdio.h>\n\n// Crie a funcao batalha: retorna vida - dano (minimo 0)\n\n// Crie a funcao turno: imprime "Turno X: Vida Y"\n\nint main() {\n    int vida = 100;\n    for (int i = 1; i <= 3; i++) {\n        vida = batalha(vida, 25);\n        turno(i, vida);\n    }\n    return 0;\n}',
            hints: [
                { level: "I", text: "Para o mínimo 0, use: if (resultado < 0) resultado = 0;" },
                { level: "II", text: "int batalha(int vida, int dano) {\n    int resultado = vida - dano;\n    if (resultado < 0) resultado = 0;\n    return resultado;\n}" },
                { level: "III", text: 'int batalha(int vida, int dano) {\n    int resultado = vida - dano;\n    if (resultado < 0) resultado = 0;\n    return resultado;\n}\nvoid turno(int numero, int vida) {\n    printf("Turno %d: Vida %d\\n", numero, vida);\n}' }
            ],
            tests: [
                { input: "", expected: "Turno 1: Vida 75", description: "Primeiro turno" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Turno 1: Vida 75")) errors.push("Turno 1 deve ter vida 75");
                if (!output.includes("Turno 3: Vida 25")) errors.push("Turno 3 deve ter vida 25");
                if (!code.includes("int batalha")) errors.push("Crie a função batalha");
                if (!code.includes("void turno")) errors.push("Crie a função turno");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
}
,
// ═══════════════════════════════════════════════════════

// EXISTING CHAPTERS (shifted from 1-12 to 4-15)
    // ═══════════════════════════════════════════════════════
    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 01 — O PRIMEIRO INVENTÁRIO
    // ═══════════════════════════════════════════════════════
    {
        id: 4,
        title: "O Primeiro Inventário",
        theme: "Vetores",
        unlock: "Inventário I",
        unlockIcon: "[=]",
        character: "lyra",
        xpReward: 100,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: INVENTÁRIO" },
            { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "O sistema de inventário da Guilda foi completamente destruído. Não conseguimos mais rastrear os itens dos aventureiros." },
            { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Precisamos guardar vários itens, mas o sistema atual só consegue salvar um dado de cada vez. Precisamos de uma forma de armazenar múltiplos valores." },
            { type: "narrative", text: "Lyra abre um terminal antigo e mostra a tela piscando." },
            { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Exatamente por isso precisamos de um <span class='highlight'>VETOR</span>." }
        ],
        concept: {
            title: "VETOR — Conceito",
            explanation: "Um vetor é uma estrutura que armazena múltiplos valores do mesmo tipo em posições organizadas. Cada posição é acessada por um índice.",
            code: "int inventario[5];\n// inventario[0] = 10;\n// inventario[1] = 20;\n// inventario[2] = 30;\n// inventario[3] = 40;\n// inventario[4] = 50;"
        },
        example: {
            title: "Exemplo — Criar e Preencher",
            code: "#include <stdio.h>\n\nint main() {\n    int inventario[5];\n    inventario[0] = 100;\n    inventario[1] = 200;\n    inventario[2] = 300;\n    inventario[3] = 400;\n    inventario[4] = 500;\n    \n    printf(\"Inventario criado!\");\n    printf(\"Primeiro item: %d\", inventario[0]);\n    \n    return 0;\n}",
            output: "Inventario criado!\nPrimeiro item: 100"
        },
        experiment: {
            title: "Experimente",
            description: "Modifique os valores do inventário e observe o resultado ao executar.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    int inventario[5];\n    inventario[0] = 10;\n    inventario[1] = 20;\n    inventario[2] = 30;\n    inventario[3] = 40;\n    inventario[4] = 50;\n    \n    printf(\"Item 0: %d\\n\", inventario[0]);\n    printf(\"Item 1: %d\\n\", inventario[1]);\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Crie um vetor de 5 posições para armazenar IDs de itens:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare um vetor de 5 inteiros\n    \n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    int inventario[5];\n    return 0;\n}",
                    hint: "Use: int nome[5];"
                },
                {
                    instruction: "Agora preencha a primeira posição com o valor 42:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    int inventario[5];\n    // Atribua 42 à posição 0\n    \n    printf(\"Item: %d\", inventario[0]);\n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    int inventario[5];\n    inventario[0] = 42;\n    printf(\"Item: %d\", inventario[0]);\n    return 0;\n}",
                    hint: "Use: inventario[0] = 42;"
                }
            ]
        },
        activities: [
            {
                id: "ch1_a1",
                title: "Criar o Inventário",
                difficulty: "easy",
                description: "Crie um vetor chamado <code>inventario</code> com <strong>5 posições</strong> do tipo <code>int</code> e imprima a mensagem \"Inventario criado!\".",
                starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare um vetor de 5 inteiros chamado inventario\n    \n    // Imprima: Inventario criado!\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Um vetor em C se declara com o tipo, seguido do nome e do tamanho entre colchetes." },
                    { level: "II", text: "Pense em: tipo nome[tamanho]; usando int, inventario e 5." },
                    { level: "III", text: "int inventario[5];\nprintf(\"Inventario criado!\");" }
                ],
                tests: [
                    { input: "", expected: "Inventario criado!", description: "Mensagem de criação" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!code.includes("int inventario[5]")) errors.push("Declare o vetor com: int inventario[5];");
                    if (!output.includes("Inventario criado")) errors.push("Imprima: Inventario criado!");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch1_a2",
                title: "Preencher o Inventário",
                difficulty: "easy",
                description: "Preencha o inventário com 5 valores e imprima todos. Use os valores: <code>10, 25, 50, 75, 100</code>.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int inventario[5];\n    \n    // Atribua os valores 10, 25, 50, 75, 100\n    \n    // Imprima cada item no formato:\n    // Item 0: 10\n    // Item 1: 25\n    // Item 2: 50\n    // Item 3: 75\n    // Item 4: 100\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Acesse cada posição com inventario[i] e atribua o valor correspondente." },
                    { level: "II", text: "inventario[0] = 10;\ninventario[1] = 25;\n...e assim por diante." },
                    { level: "III", text: "inventario[0] = 10;\ninventario[1] = 25;\ninventario[2] = 50;\ninventario[3] = 75;\ninventario[4] = 100;\nprintf(\"Item 0: %d\\n\", inventario[0]);\nprintf(\"Item 1: %d\\n\", inventario[1]);\n..." }
                ],
                tests: [
                    { input: "", expected: "Item 0: 10\nItem 1: 25\nItem 2: 50\nItem 3: 75\nItem 4: 100", description: "5 itens impressos" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    let lines = output.split("\n").filter(l => l.trim());
                    if (lines.length < 5) errors.push("Imprima todos os 5 itens");
                    if (!output.includes("10")) errors.push("Valor 10 não encontrado na saída");
                    if (!output.includes("100")) errors.push("Valor 100 não encontrado na saída");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch1_a3",
                title: "Leitura com For",
                difficulty: "medium",
                description: "Crie um vetor de 5 posições e use um <code>for</code> para preenchê-lo com os valores 10, 20, 30, 40, 50. Depois use outro <code>for</code> para imprimir todos.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int inventario[5];\n    \n    // Use um for para atribuir: inventario[i] = (i+1) * 10\n    \n    // Use outro for para imprimir todos no formato:\n    // [0] = 10\n    // [1] = 20\n    ...\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Um for percorre de i=0 até i<5, usando inventario[i] como índice." },
                    { level: "II", text: "Para preencher: inventario[i] = (i + 1) * 10;\nPara imprimir: printf(\"[%d] = %d\\n\", i, inventario[i]);" },
                    { level: "III", text: "for (int i = 0; i < 5; i++) {\n    inventario[i] = (i + 1) * 10;\n}\nfor (int i = 0; i < 5; i++) {\n    printf(\"[%d] = %d\\n\", i, inventario[i]);\n}" }
                ],
                tests: [
                    { input: "", expected: "[0] = 10\n[1] = 20\n[2] = 30\n[3] = 40\n[4] = 50", description: "5 valores com for" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!code.includes("for")) errors.push("Use um loop for");
                    let lines = output.split("\n").filter(l => l.includes("["));
                    if (lines.length < 5) errors.push("Imprima os 5 valores do vetor");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 02 — A MASMORRA SEM FIM
    // ═══════════════════════════════════════════════════════
    {
        id: 5,
        title: "A Masmorra Sem Fim",
        theme: "Recursividade",
        unlock: "Sistema de Exploração",
        unlockIcon: "[#]",
        character: "mira",
        xpReward: 120,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: EXPLORAÇÃO" },
            { type: "character", name: "MIRA SOLENN", role: "CARTÓGRAFA", cssClass: "mira", text: "Há uma masmorra sob a Guilda. Os corredores se repetem — salas dentro de salas. Ninguém conseguiu mapeá-la inteira." },
            { type: "narrative", text: "Mira mostra um mapa parcial. Cada caminho leva a outro caminho, idêntico ao anterior." },
            { type: "character", name: "MIRA SOLENN", role: "CARTÓGRAFA", cssClass: "mira", text: "A única forma de explorar algo dentro de algo... é uma <span class='highlight'>FUNÇÃO QUE CHAMA A SI MESMA</span>." },
            { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Recursividade. Parece perigoso, mas se tiver um caso base, funciona." }
        ],
        concept: {
            title: "RECURSIVIDADE — Conceito",
            explanation: "Uma função recursiva é uma função que chama a si mesma. Ela precisa de um CASO BASE (para parar) e uma CHAMADA RECURSIVA (para continuar).",
            code: "void explorar(int nivel) {\n    if (nivel == 0) {\n        printf(\"Saida encontrada!\\n\");\n        return;\n    }\n    printf(\"Explorando nivel %d\\n\", nivel);\n    explorar(nivel - 1);\n}"
        },
        example: {
            title: "Exemplo — Pilha de Chamadas",
            code: "#include <stdio.h>\n\nvoid explorar(int nivel) {\n    if (nivel == 0) {\n        printf(\"Saida encontrada!\\n\");\n        return;\n    }\n    printf(\"Explorando nivel %d\\n\", nivel);\n    explorar(nivel - 1);\n}\n\nint main() {\n    explorar(3);\n    return 0;\n}",
            output: "Explorando nivel 3\nExplorando nivel 2\nExplorando nivel 1\nSaida encontrada!"
        },
        experiment: {
            title: "Experimente",
            description: "Altere o nível inicial e observe como a recursão se desenrola.",
            starterCode: "#include <stdio.h>\n\nvoid explorar(int nivel) {\n    if (nivel == 0) {\n        printf(\"Saida!\\n\");\n        return;\n    }\n    printf(\"nivel %d -> \", nivel);\n    explorar(nivel - 1);\n}\n\nint main() {\n    explorar(4);\n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Complete o caso base da função recursiva:",
                    starterCode: "#include <stdio.h>\n\nvoid contar(int n) {\n    if (n == 0) {\n        // Complete: imprima \"Fim!\" e retorne\n        \n        return;\n    }\n    printf(\"%d \", n);\n    contar(n - 1);\n}\n\nint main() {\n    contar(3);\n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nvoid contar(int n) {\n    if (n == 0) {\n        printf(\"Fim!\\n\");\n        return;\n    }\n    printf(\"%d \", n);\n    contar(n - 1);\n}\n\nint main() {\n    contar(3);\n    return 0;\n}",
                    hint: "No caso base, imprima \"Fim!\" com printf"
                },
                {
                    instruction: "Adicione a chamada recursiva para decrementar o valor:",
                    starterCode: "#include <stdio.h>\n\nvoid contar(int n) {\n    if (n == 0) {\n        printf(\"Fim!\\n\");\n        return;\n    }\n    printf(\"%d \", n);\n    // Chame contar() com n - 1\n    \n}\n\nint main() {\n    contar(3);\n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nvoid contar(int n) {\n    if (n == 0) {\n        printf(\"Fim!\\n\");\n        return;\n    }\n    printf(\"%d \", n);\n    contar(n - 1);\n}\n\nint main() {\n    contar(3);\n    return 0;\n}",
                    hint: "Chame a própria função: contar(n - 1);"
                }
            ]
        },
        activities: [
            {
                id: "ch2_a1",
                title: "Caso Base",
                difficulty: "easy",
                description: "Complete a função recursiva <code>contar</code>. O caso base deve imprimir <code>\"Parou!\"</code> quando <code>n == 0</code>.",
                starterCode: "#include <stdio.h>\n\nvoid contar(int n) {\n    if (n == 0) {\n        // Imprima \"Parou!\" e retorne\n        \n        return;\n    }\n    printf(\"%d \", n);\n    contar(n - 1);\n}\n\nint main() {\n    contar(4);\n    return 0;\n}",
                hints: [
                    { level: "I", text: "O caso base é quando n chega a 0. Imprima a mensagem e use return." },
                    { level: "II", text: "Use printf(\"Parou!\") no bloco if (n == 0)." },
                    { level: "III", text: "if (n == 0) {\n    printf(\"Parou!\");\n    return;\n}" }
                ],
                tests: [
                    { input: "", expected: "4 3 2 1 Parou!", description: "Contagem com caso base" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Parou")) errors.push("A saída deve conter \"Parou!\"");
                    if (!output.includes("4")) errors.push("Deve imprimir o valor 4");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch2_a2",
                title: "Chamada Recursiva",
                difficulty: "easy",
                description: "Complete a chamada recursiva para que a função <code>fatorial</code> calcule o fatorial de n.",
                starterCode: "#include <stdio.h>\n\nint fatorial(int n) {\n    if (n <= 1) {\n        return 1;\n    }\n    // Retorne n * fatorial(n - 1)\n    \n}\n\nint main() {\n    printf(\"5! = %d\\n\", fatorial(5));\n    return 0;\n}",
                hints: [
                    { level: "I", text: "O fatorial de n é n multiplicado pelo fatorial de n-1." },
                    { level: "II", text: "return n * fatorial(n - 1);" },
                    { level: "III", text: "return n * fatorial(n - 1);" }
                ],
                tests: [
                    { input: "", expected: "5! = 120", description: "Fatorial de 5 = 120" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("120")) errors.push("O resultado deve ser 120");
                    if (!code.includes("fatorial(n - 1)") && !code.includes("fatorial(n-1)")) errors.push("Use chamada recursiva: fatorial(n - 1)");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch2_a3",
                title: "Explorar a Masmorra",
                difficulty: "medium",
                description: "Crie uma função recursiva <code>explorar</code> que receba um nível e imprima <code>\"Nivel X\"</code> para cada chamada, até chegar ao nível 0 e imprimir <code>\"Saida encontrada!\"</code>.",
                starterCode: "#include <stdio.h>\n\n// Crie a funcao explorar aqui\n\nint main() {\n    explorar(3);\n    return 0;\n}",
                hints: [
                    { level: "I", text: "A função precisa de um parâmetro int, um caso base e uma chamada recursiva." },
                    { level: "II", text: "void explorar(int nivel) {\n    if (nivel == 0) { ... return; }\n    printf(\"Nivel %d\\n\", nivel);\n    explorar(nivel - 1);\n}" },
                    { level: "III", text: "void explorar(int nivel) {\n    if (nivel == 0) {\n        printf(\"Saida encontrada!\\n\");\n        return;\n    }\n    printf(\"Nivel %d\\n\", nivel);\n    explorar(nivel - 1);\n}" }
                ],
                tests: [
                    { input: "", expected: "Nivel 3\nNivel 2\nNivel 1\nSaida encontrada!", description: "Exploração recursiva completa" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Nivel 3")) errors.push("Deve imprimir Nivel 3");
                    if (!output.includes("Nivel 1")) errors.push("Deve imprimir Nivel 1");
                    if (!output.includes("Saida encontrada")) errors.push("Deve imprimir Saida encontrada!");
                    if (!code.includes("explorar") || !code.includes("explorar(")) errors.push("Crie a função explorar");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 03 — O DEPÓSITO PERDIDO
    // ═══════════════════════════════════════════════════════
    {
        id: 6,
        title: "O Depósito Perdido",
        theme: "Vetores — Busca",
        unlock: "Sistema de Busca",
        unlockIcon: "[?]",
        character: "lyra",
        xpReward: 120,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: BUSCA" },
            { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "O depósito contém centenas de itens. Quando alguém precisa de algo, fica procurando um por um. Isso é ineficiente." },
            { type: "narrative", text: "Lyra abre um terminal mostrando o inventário: 200 itens, sem organização." },
            { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Precisamos de uma forma de verificar se um item <span class='highlight'>EXISTE</span> no inventário, e informar sua posição." },
            { type: "character", name: "KAEL DRAVEN", role: "MESTRE DO ARSENAL", cssClass: "kael", text: "Na guerra, saber onde está sua arma é questão de vida ou morte." }
        ],
        concept: {
            title: "BUSCA EM VETOR — Conceito",
            explanation: "Percorra o vetor comparando cada elemento com o valor procurado. Se encontrar, retorne o índice.",
            code: "int procurado = 30;\nfor (int i = 0; i < tamanho; i++) {\n    if (inventario[i] == procurado) {\n        printf(\"Item encontrado na posicao %d\\n\", i);\n    }\n}"
        },
        example: {
            title: "Exemplo — Busca Linear",
            code: "#include <stdio.h>\n\nint main() {\n    int inventario[5] = {10, 25, 30, 45, 50};\n    int procurado = 30;\n    \n    for (int i = 0; i < 5; i++) {\n        if (inventario[i] == procurado) {\n            printf(\"Item %d encontrado na posicao %d\\n\", procurado, i);\n        }\n    }\n    \n    return 0;\n}",
            output: "Item 30 encontrado na posicao 2"
        },
        experiment: {
            title: "Experimente",
            description: "Altere o valor procurado e observe como a busca funciona.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    int inventario[5] = {10, 25, 30, 45, 50};\n    int procurado = 45;\n    \n    for (int i = 0; i < 5; i++) {\n        if (inventario[i] == procurado) {\n            printf(\"Encontrado na posicao %d\\n\", i);\n        }\n    }\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Complete a busca para encontrar o valor 25 no vetor:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {10, 25, 30, 45, 50};\n    int alvo = 25;\n    \n    for (int i = 0; i < 5; i++) {\n        // Complete a condicao if\n        \n    }\n    \n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {10, 25, 30, 45, 50};\n    int alvo = 25;\n    \n    for (int i = 0; i < 5; i++) {\n        if (vet[i] == alvo) {\n            printf(\"Encontrado: posicao %d\\n\", i);\n        }\n    }\n    \n    return 0;\n}",
                    hint: "Compare vet[i] com alvo usando =="
                }
            ]
        },
        activities: [
            {
                id: "ch3_a1",
                title: "Preenchimento Automático",
                difficulty: "easy",
                description: "Preencha um vetor de 5 posições com o valor <code>7</code> em cada posição usando um <code>for</code>.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int inventario[5];\n    \n    // Preencha todas as posicoes com o valor 7\n    \n    // Imprima: Inventario preenchido\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use um for de 0 a 4 e atribua 7 a cada posição." },
                    { level: "II", text: "for (int i = 0; i < 5; i++) { inventario[i] = 7; }" },
                    { level: "III", text: "for (int i = 0; i < 5; i++) {\n    inventario[i] = 7;\n}\nprintf(\"Inventario preenchido\\n\");" }
                ],
                tests: [
                    { input: "", expected: "Inventario preenchido", description: "Vetor preenchido com 7" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!code.includes("for")) errors.push("Use um loop for");
                    if (!code.includes("7")) errors.push("O valor deve ser 7");
                    if (!output.includes("Inventario preenchido")) errors.push("Imprima a mensagem");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch3_a2",
                title: "Identificar Elementos",
                difficulty: "easy",
                description: "Dado um vetor, conte quantos elementos são <strong>maiores que 30</strong>. Imprima o resultado.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {10, 35, 40, 25, 50};\n    int contador = 0;\n    \n    // Use um for para percorrer o vetor\n    // Se vet[i] > 30, incremente contador\n    \n    // Imprima: Maior que 30: X (onde X e o contador)\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use um if dentro do for para comparar cada elemento com 30." },
                    { level: "II", text: "if (vet[i] > 30) contador++;" },
                    { level: "III", text: "for (int i = 0; i < 5; i++) {\n    if (vet[i] > 30) contador++;\n}\nprintf(\"Maior que 30: %d\\n\", contador);" }
                ],
                tests: [
                    { input: "", expected: "Maior que 30: 3", description: "Contagem correta" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("3")) errors.push("O resultado deve ser 3");
                    if (!code.includes("> 30")) errors.push("Compare com > 30");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch3_a3",
                title: "Busca Completa",
                difficulty: "medium",
                description: "Implemente uma busca linear. Dado o vetor <code>{5, 12, 8, 30, 15}</code> e o valor procurado <code>30</code>, imprima <code>\"Encontrado na posicao X\"</code>. Se não encontrar, imprima <code>\"Nao encontrado\"</code>.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {5, 12, 8, 30, 15};\n    int alvo = 30;\n    int encontrado = 0;\n    \n    // Implemente a busca linear\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Percorra o vetor e compare cada elemento com alvo." },
                    { level: "II", text: "Use um flag encontrado para controlar se achou ou não." },
                    { level: "III", text: "for (int i = 0; i < 5; i++) {\n    if (vet[i] == alvo) {\n        printf(\"Encontrado na posicao %d\\n\", i);\n        encontrado = 1;\n    }\n}\nif (!encontrado) printf(\"Nao encontrado\\n\");" }
                ],
                tests: [
                    { input: "", expected: "Encontrado na posicao 3", description: "Busca por valor existente" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Encontrado")) errors.push("Deve encontrar o item");
                    if (!output.includes("3")) errors.push("A posição deve ser 3");
                    if (!code.includes("for")) errors.push("Use um loop for");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 04 — O ARSENAL REAL
    // ═══════════════════════════════════════════════════════
    {
        id: 7,
        title: "O Arsenal Real",
        theme: "Inserção Ordenada",
        unlock: "Arsenal Organizado",
        unlockIcon: "[X]",
        character: "kael",
        xpReward: 130,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: ARSENAL" },
            { type: "character", name: "KAEL DRAVEN", role: "MESTRE DO ARSENAL", cssClass: "kael", text: "As armas precisam ficar organizadas por poder. Quando uma nova arma chega, ela precisa ir para a posição correta." },
            { type: "narrative", text: "Kael mostra um inventário desordenado de armas com seus poderes: 10, 20, 30, 40." },
            { type: "character", name: "KAEL DRAVEN", role: "MESTRE DO ARSENAL", cssClass: "kael", text: "Se recebermos uma arma de poder 25, ela precisa ir entre 20 e 30. Para isso, precisamos deslocar os elementos." },
            { type: "narrative", text: "[10] [20] [30] [40] → Inserir 25 → [10] [20] [25] [30] [40]" }
        ],
        concept: {
            title: "INSERÇÃO ORDENADA — Conceito",
            explanation: "Para inserir um elemento mantendo a ordenação, desloque os maiores para a direita e insira na posição correta.",
            code: "// Inserir 25 em vetor ordenado\nint pos = 2; // posicao correta\nfor (int i = tamanho; i > pos; i--) {\n    vet[i] = vet[i-1];\n}\nvet[pos] = 25;\ntamanho++;"
        },
        example: {
            title: "Exemplo — Inserção Ordenada",
            code: "#include <stdio.h>\n\nint main() {\n    int vet[6] = {10, 20, 30, 40, 0, 0};\n    int tamanho = 4;\n    int valor = 25;\n    int pos = 2;\n    \n    for (int i = tamanho; i > pos; i--) {\n        vet[i] = vet[i-1];\n    }\n    vet[pos] = valor;\n    tamanho++;\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}",
            output: "10 20 25 30 40"
        },
        experiment: {
            title: "Experimente",
            description: "Modifique o valor inserido e a posição.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[6] = {10, 20, 30, 40, 0, 0};\n    int tamanho = 4;\n    int valor = 15;\n    int pos = 1;\n    \n    for (int i = tamanho; i > pos; i--) {\n        vet[i] = vet[i-1];\n    }\n    vet[pos] = valor;\n    tamanho++;\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Complete o loop de deslocamento para inserir o valor na posição correta:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[6] = {10, 20, 30, 40};\n    int tamanho = 4;\n    int valor = 25;\n    int pos = 2;\n    \n    // Complete: desloque da posicao tamanho ate pos+1\n    \n    vet[pos] = valor;\n    tamanho++;\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    int vet[6] = {10, 20, 30, 40};\n    int tamanho = 4;\n    int valor = 25;\n    int pos = 2;\n    \n    for (int i = tamanho; i > pos; i--) {\n        vet[i] = vet[i-1];\n    }\n    vet[pos] = valor;\n    tamanho++;\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}",
                    hint: "for (int i = tamanho; i > pos; i--) { vet[i] = vet[i-1]; }"
                }
            ]
        },
        activities: [
            {
                id: "ch4_a1",
                title: "Deslocar Elementos",
                difficulty: "easy",
                description: "Dado um vetor <code>{10, 20, 30, 40}</code>, desloque todos a partir da posição 2 para a direita e insira <code>25</code> na posição 2.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[6] = {10, 20, 30, 40};\n    int tamanho = 4;\n    \n    // Desloque os elementos e insira 25 na posicao 2\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "O loop deve ir de tamanho até pos+1, decrementando." },
                    { level: "II", text: "for (int i = 4; i > 2; i--) { vet[i] = vet[i-1]; }\nvet[2] = 25;" },
                    { level: "III", text: "for (int i = tamanho; i > 2; i--) {\n    vet[i] = vet[i-1];\n}\nvet[2] = 25;\ntamanho = 5;" }
                ],
                tests: [
                    { input: "", expected: "10 20 25 30 40", description: "Inserção ordenada" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("25")) errors.push("O valor 25 deve estar na saída");
                    let parts = output.trim().split(/\s+/);
                    let vals = parts.map(Number).filter(n => !isNaN(n));
                    if (vals.length >= 5) {
                        if (vals[2] !== 25) errors.push("25 deve estar na posição 2");
                        if (vals[0] !== 10 || vals[1] !== 20) errors.push("Elementos anteriores não foram preservados");
                    } else {
                        errors.push("Deve imprimir 5 valores");
                    }
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch4_a2",
                title: "Inserir no Início",
                difficulty: "easy",
                description: "Insira o valor <code>5</code> na posição 0 de um vetor <code>{20, 30, 40}</code>. Desloque todos para a direita.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {20, 30, 40};\n    int tamanho = 3;\n    \n    // Insira 5 na posicao 0\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Desloque todos da última posição até a 1." },
                    { level: "II", text: "for (int i = tamanho; i > 0; i--) { vet[i] = vet[i-1]; }\nvet[0] = 5;" },
                    { level: "III", text: "for (int i = tamanho; i > 0; i--) {\n    vet[i] = vet[i-1];\n}\nvet[0] = 5;\ntamanho = 4;" }
                ],
                tests: [
                    { input: "", expected: "5 20 30 40", description: "Inserção no início" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    let parts = output.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
                    if (parts[0] !== 5) errors.push("5 deve ser o primeiro elemento");
                    if (parts.length < 4) errors.push("Deve imprimir 4 valores");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch4_a3",
                title: "Inserção Completa",
                difficulty: "medium",
                description: "Dado um vetor ordenado <code>{10, 30, 50, 70}</code>, insira o valor <code>40</code> na posição correta mantendo a ordenação. Imprima o vetor resultante.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {10, 30, 50, 70};\n    int tamanho = 4;\n    int valor = 40;\n    \n    // Encontre a posicao correta e insira\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Primeiro encontre a posição: 40 está entre 30 (posição 1) e 50 (posição 2). Logo pos = 2." },
                    { level: "II", text: "int pos = 2;\nfor (int i = tamanho; i > pos; i--) {\n    vet[i] = vet[i-1];\n}\nvet[pos] = 40;" },
                    { level: "III", text: "int pos = 2;\nfor (int i = tamanho; i > pos; i--) {\n    vet[i] = vet[i-1];\n}\nvet[pos] = valor;\ntamanho++;" }
                ],
                tests: [
                    { input: "", expected: "10 30 40 50 70", description: "Inserção na posição correta" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    let parts = output.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
                    if (parts.length < 5) errors.push("Deve imprimir 5 valores");
                    if (parts[0] !== 10 || parts[1] !== 30 || parts[2] !== 40 || parts[3] !== 50 || parts[4] !== 70) {
                        errors.push("Ordem incorreta: espere 10 30 40 50 70");
                    }
                    if (!code.includes("for")) errors.push("Use um loop for");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 05 — A BIBLIOTECA ARCANA
    // ═══════════════════════════════════════════════════════
    {
        id: 8,
        title: "A Biblioteca Arcana",
        theme: "Busca Binária",
        unlock: "Busca Avançada",
        unlockIcon: "[=]",
        character: "lyra",
        xpReward: 140,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: BIBLIOTECA" },
            { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "A biblioteca contém milhares de grimórios. Para encontrar um, precisamos de algo mais rápido que procurar um por um." },
            { type: "narrative", text: "Lyra mostra o grimório organizado por poder. Meio = [10][20][30][40][50][60][70]" },
            { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Se o livro procurado é maior que o meio, descarte a metade esquerda. Se menor, descarte a direita. É assim que funciona a <span class='highlight'>BUSCA BINÁRIA</span>." }
        ],
        concept: {
            title: "BUSCA BINÁRIA — Conceito",
            explanation: "Em um vetor ordenado, compare o alvo com o elemento do meio. Elimine metade a cada passo.",
            code: "int inicio = 0, fim = tamanho - 1;\nwhile (inicio <= fim) {\n    int meio = (inicio + fim) / 2;\n    if (vet[meio] == alvo) break;\n    else if (vet[meio] < alvo) inicio = meio + 1;\n    else fim = meio - 1;\n}"
        },
        example: {
            title: "Exemplo — Busca Binária",
            code: "#include <stdio.h>\n\nint main() {\n    int vet[7] = {10, 20, 30, 40, 50, 60, 70};\n    int alvo = 50;\n    int ini = 0, fim = 6;\n    \n    while (ini <= fim) {\n        int meio = (ini + fim) / 2;\n        if (vet[meio] == alvo) {\n            printf(\"Encontrado: posicao %d\\n\", meio);\n            break;\n        } else if (vet[meio] < alvo) {\n            ini = meio + 1;\n        } else {\n            fim = meio - 1;\n        }\n    }\n    \n    return 0;\n}",
            output: "Encontrado: posicao 4"
        },
        experiment: {
            title: "Experimente",
            description: "Altere o alvo e veja como a busca binária funciona.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[7] = {10, 20, 30, 40, 50, 60, 70};\n    int alvo = 30;\n    int ini = 0, fim = 6;\n    \n    while (ini <= fim) {\n        int meio = (ini + fim) / 2;\n        printf(\"Verificando posicao %d (valor %d)\\n\", meio, vet[meio]);\n        if (vet[meio] == alvo) {\n            printf(\"Encontrado!\\n\");\n            break;\n        } else if (vet[meio] < alvo) {\n            ini = meio + 1;\n        } else {\n            fim = meio - 1;\n        }\n    }\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Complete a busca binária para encontrar o valor 40:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[7] = {10, 20, 30, 40, 50, 60, 70};\n    int alvo = 40;\n    int ini = 0, fim = 6;\n    \n    while (ini <= fim) {\n        int meio = (ini + fim) / 2;\n        if (vet[meio] == alvo) {\n            printf(\"Encontrado: posicao %d\\n\", meio);\n            break;\n        } else if (vet[meio] < alvo) {\n            // Atualize ini\n            \n        } else {\n            // Atualize fim\n            \n        }\n    }\n    \n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    int vet[7] = {10, 20, 30, 40, 50, 60, 70};\n    int alvo = 40;\n    int ini = 0, fim = 6;\n    \n    while (ini <= fim) {\n        int meio = (ini + fim) / 2;\n        if (vet[meio] == alvo) {\n            printf(\"Encontrado: posicao %d\\n\", meio);\n            break;\n        } else if (vet[meio] < alvo) {\n            ini = meio + 1;\n        } else {\n            fim = meio - 1;\n        }\n    }\n    \n    return 0;\n}",
                    hint: "ini = meio + 1; ou fim = meio - 1;"
                }
            ]
        },
        activities: [
            {
                id: "ch5_a1",
                title: "Buscar no Meio",
                difficulty: "easy",
                description: "Implemente uma busca binária para encontrar o valor <code>60</code> no vetor <code>{10, 20, 30, 40, 50, 60, 70}</code>.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[7] = {10, 20, 30, 40, 50, 60, 70};\n    int alvo = 60;\n    int ini = 0, fim = 6;\n    \n    while (ini <= fim) {\n        int meio = (ini + fim) / 2;\n        // Complete a busca binaria\n    }\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Compare vet[meio] com alvo e ajuste ini ou fim." },
                    { level: "II", text: "if (vet[meio] == alvo) { printf(...); break; }\nelse if (vet[meio] < alvo) ini = meio + 1;\nelse fim = meio - 1;" },
                    { level: "III", text: "if (vet[meio] == alvo) {\n    printf(\"Encontrado: posicao %d\\n\", meio);\n    break;\n} else if (vet[meio] < alvo) {\n    ini = meio + 1;\n} else {\n    fim = meio - 1;\n}" }
                ],
                tests: [
                    { input: "", expected: "Encontrado: posicao 5", description: "Busca binária por 60" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Encontrado")) errors.push("Deve encontrar o valor");
                    if (!output.includes("5")) errors.push("A posição deve ser 5");
                    if (!code.includes("while")) errors.push("Use um loop while");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch5_a2",
                title: "Não Encontrado",
                difficulty: "easy",
                description: "Implemente busca binária para o valor <code>25</code> (que não existe). Imprima <code>\"Nao encontrado\"</code>.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[7] = {10, 20, 30, 40, 50, 60, 70};\n    int alvo = 25;\n    int ini = 0, fim = 6;\n    int encontrado = 0;\n    \n    while (ini <= fim) {\n        int meio = (ini + fim) / 2;\n        // Busca binaria aqui\n    }\n    \n    if (!encontrado) printf(\"Nao encontrado\\n\");\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Quando o loop terminar sem encontrar, imprima a mensagem." },
                    { level: "II", text: "Use um flag encontrado que vira 1 quando acha." },
                    { level: "III", text: "if (vet[meio] == alvo) {\n    printf(\"Encontrado\\n\");\n    encontrado = 1;\n    break;\n} else if (vet[meio] < alvo) ini = meio + 1;\nelse fim = meio - 1;" }
                ],
                tests: [
                    { input: "", expected: "Nao encontrado", description: "Valor não encontrado" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Nao encontrado")) errors.push("Deve imprimir Nao encontrado");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch5_a3",
                title: "Remover Elemento",
                difficulty: "medium",
                description: "Implemente busca binária para encontrar o valor <code>40</code>, depois <strong>remova</strong> ele do vetor deslocando os elementos à esquerda. Imprima o vetor resultante.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[7] = {10, 20, 30, 40, 50, 60, 70};\n    int tamanho = 7;\n    int alvo = 40;\n    int ini = 0, fim = 6;\n    int pos = -1;\n    \n    // Busca binaria para encontrar a posicao\n    \n    // Se encontrou, remova deslocando para a esquerda\n    \n    for (int i = 0; i < tamanho; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Primeiro use busca binária para encontrar a posição. Depois desloque da posição encontrada até o final." },
                    { level: "II", text: "for (int i = pos; i < tamanho - 1; i++) {\n    vet[i] = vet[i+1];\n}\ntamanho--;" },
                    { level: "III", text: "// Após encontrar pos:\nfor (int i = pos; i < tamanho - 1; i++) {\n    vet[i] = vet[i+1];\n}\ntamanho--;\n// Imprima tamanho elementos" }
                ],
                tests: [
                    { input: "", expected: "10 20 30 50 60 70", description: "40 removido do vetor" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("50")) errors.push("O elemento 50 deve aparecer");
                    if (output.includes("40")) errors.push("O elemento 40 não deve aparecer");
                    if (output.split(/\s+/).filter(s => s.trim()).length < 6) errors.push("Deve imprimir 6 valores");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 06 — O MAPA DO REINO
    // ═══════════════════════════════════════════════════════
    {
        id: 9,
        title: "O Mapa do Reino",
        theme: "Matriz",
        unlock: "Cartografia da Guilda",
        unlockIcon: "[~]",
        character: "mira",
        xpReward: 130,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: MAPA" },
            { type: "character", name: "MIRA SOLENN", role: "CARTÓGRAFA", cssClass: "mira", text: "O mapa do reino precisa ser digitalizado. Territórios são representados em linhas e colunas — uma grade bidimensional." },
            { type: "narrative", text: "Mira projeta um mapa: uma matriz onde 0 = terra, 1 = água, 2 = floresta." },
            { type: "character", name: "MIRA SOLENN", role: "CARTÓGRAFA", cssClass: "mira", text: "Para acessar um ponto específico, precisamos de dois índices: <span class='highlight'>linha e coluna</span>." }
        ],
        concept: {
            title: "MATRIZ — Conceito",
            explanation: "Uma matriz é um vetor bidimensional. Cada elemento é acessado por dois índices: linha e coluna.",
            code: "int mapa[3][4];\nmapa[0][0] = 1; // linha 0, coluna 0\nmapa[1][2] = 2; // linha 1, coluna 2"
        },
        example: {
            title: "Exemplo — Imprimir Matriz",
            code: "#include <stdio.h>\n\nint main() {\n    int mapa[3][3] = {{1, 0, 1}, {0, 2, 0}, {1, 0, 2}};\n    \n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            printf(\"%d \", mapa[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    \n    return 0;\n}",
            output: "1 0 1\n0 2 0\n1 0 2"
        },
        experiment: {
            title: "Experimente",
            description: "Altere os valores do mapa e observe a saída.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    int mapa[3][3] = {{0, 1, 0}, {1, 0, 1}, {0, 1, 0}};\n    \n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            printf(\"%d \", mapa[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Declare uma matriz 3x3 e imprima todos os elementos com for aninhado:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare uma matriz 3x3 com valores {{1,2,3},{4,5,6},{7,8,9}}\n    \n    // Use for aninhado para imprimir\n    \n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            printf(\"%d \", m[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
                    hint: "int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};"
                }
            ]
        },
        activities: [
            {
                id: "ch6_a1",
                title: "Criar Mapa",
                difficulty: "easy",
                description: "Crie uma matriz 3x3 com valores e imprima-a usando <code>for</code> aninhado.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare e inicialize uma matriz 3x3\n    \n    // Imprima com for aninhado\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Uma matriz se declara: int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};" },
                    { level: "II", text: "Use dois fors: um para linhas (i), outro para colunas (j)." },
                    { level: "III", text: "int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        printf(\"%d \", m[i][j]);\n    }\n    printf(\"\\n\");\n}" }
                ],
                tests: [
                    { input: "", expected: "1 2 3\n4 5 6\n7 8 9", description: "Matriz 3x3 impressa" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("1 2 3")) errors.push("Primeira linha deve ser 1 2 3");
                    if (!output.includes("4 5 6")) errors.push("Segunda linha deve ser 4 5 6");
                    if (!code.includes("[3][3]")) errors.push("Declare uma matriz 3x3");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch6_a2",
                title: "Contar Água",
                difficulty: "easy",
                description: "Dada uma matriz 3x3 representando um mapa (<code>0</code> = terra, <code>1</code> = água), conte quantas células são água.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int mapa[3][3] = {{0, 1, 0}, {1, 0, 1}, {0, 1, 0}};\n    int agua = 0;\n    \n    // Contar celulas com valor 1\n    \n    printf(\"Agua: %d\\n\", agua);\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Percorra a matriz com for aninhado e verifique se o valor é 1." },
                    { level: "II", text: "if (mapa[i][j] == 1) agua++;" },
                    { level: "III", text: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (mapa[i][j] == 1) agua++;\n    }\n}" }
                ],
                tests: [
                    { input: "", expected: "Agua: 4", description: "4 células de água" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Agua: 4")) errors.push("O resultado deve ser Agua: 4");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch6_a3",
                title: "Transpor Mapa",
                difficulty: "medium",
                description: "Dada uma matriz 3x3, crie e imprima a sua <strong>transposta</strong> (troque linhas por colunas).",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n    int t[3][3];\n    \n    // Compute a transposta: t[j][i] = m[i][j]\n    \n    // Imprima a transposta\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "A transposta troca: t[j][i] = m[i][j]" },
                    { level: "II", text: "for (int i = 0; i < 3; i++)\n    for (int j = 0; j < 3; j++)\n        t[j][i] = m[i][j];" },
                    { level: "III", text: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        t[j][i] = m[i][j];\n    }\n}\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        printf(\"%d \", t[i][j]);\n    }\n    printf(\"\\n\");\n}" }
                ],
                tests: [
                    { input: "", expected: "1 4 7\n2 5 8\n3 6 9", description: "Transposta correta" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("1 4 7")) errors.push("Primeira linha da transposta: 1 4 7");
                    if (!output.includes("2 5 8")) errors.push("Segunda linha: 2 5 8");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 07 — O ARQUIVISTA
    // ═══════════════════════════════════════════════════════
    {
        id: 10,
        title: "O Arquivista",
        theme: "Strings",
        unlock: "Cadastro de Registros",
        unlockIcon: "[-]",
        character: "elion",
        xpReward: 130,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: REGISTROS" },
            { type: "character", name: "ELION RAVEN", role: "MESTRE DOS REGISTROS", cssClass: "elion", text: "Para registrar aventureiros, precisamos armazenar seus nomes. Nomes são sequências de caracteres." },
            { type: "narrative", text: "Elion abre um terminal com listas de nomes, cidades e missões." },
            { type: "character", name: "ELION RAVEN", role: "MESTRE DOS REGISTROS", cssClass: "elion", text: "Em C, uma string é um <span class='highlight'>vetor de caracteres</span>. Precisamos saber compará-las, copiá-las e medir seu tamanho." }
        ],
        concept: {
            title: "STRINGS — Conceito",
            explanation: "Uma string em C é um vetor de char terminado por \\0. Use strcmp para comparar, strcpy para copiar, strlen para medir.",
            code: "char nome[20] = \"Arkan\";\nint tam = strlen(nome);\nif (strcmp(nome, \"Arkan\") == 0) {\n    printf(\"Encontrado!\");\n}"
        },
        example: {
            title: "Exemplo — Operações com Strings",
            code: "#include <stdio.h>\n\nint main() {\n    char nome[20] = \"Lyra\";\n    char destino[20];\n    \n    int tam = strlen(nome);\n    \n    strcpy(destino, nome);\n    \n    printf(\"Nome: %s\\n\", nome);\n    printf(\"Tamanho: %d\\n\", tam);\n    printf(\"Copia: %s\\n\", destino);\n    \n    if (strcmp(nome, \"Lyra\") == 0) {\n        printf(\"Confirmado!\");\n    }\n    \n    return 0;\n}",
            output: "Nome: Lyra\nTamanho: 4\nCopia: Lyra\nConfirmado!"
        },
        experiment: {
            title: "Experimente",
            description: "Altere os nomes e veja como as operações funcionam.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    char nome1[20] = \"Kael\";\n    char nome2[20] = \"Mira\";\n    \n    printf(\"Nome 1: %s\\n\", nome1);\n    printf(\"Nome 2: %s\\n\", nome2);\n    \n    int cmp = strcmp(nome1, nome2);\n    if (cmp == 0) printf(\"Iguais\\n\");\n    else if (cmp < 0) printf(\"%s vem primeiro\\n\", nome1);\n    else printf(\"%s vem primeiro\\n\", nome2);\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Declare uma string e imprima seu tamanho:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare uma string com o nome \"Guilda\"\n    \n    // Imprima o nome e o tamanho usando strlen\n    \n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    char nome[20] = \"Guilda\";\n    printf(\"Nome: %s\\n\", nome);\n    printf(\"Tamanho: %d\\n\", strlen(nome));\n    return 0;\n}",
                    hint: "char nome[20] = \"Guilda\";\nstrlen(nome)"
                }
            ]
        },
        activities: [
            {
                id: "ch7_a1",
                title: "Declarar Strings",
                difficulty: "easy",
                description: "Declare duas strings com nomes de aventureiros e imprima ambas.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare uma string com nome \"Arion\"\n    \n    // Declare outra string com nome \"Selene\"\n    \n    // Imprima ambas no formato:\n    // Aventureiro 1: Arion\n    // Aventureiro 2: Selene\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use: char nome[20] = \"Arion\";" },
                    { level: "II", text: "char nome1[20] = \"Arion\";\nchar nome2[20] = \"Selene\";" },
                    { level: "III", text: "char nome1[20] = \"Arion\";\nchar nome2[20] = \"Selene\";\nprintf(\"Aventureiro 1: %s\\n\", nome1);\nprintf(\"Aventureiro 2: %s\\n\", nome2);" }
                ],
                tests: [
                    { input: "", expected: "Aventureiro 1: Arion\nAventureiro 2: Selene", description: "Duas strings impressas" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Arion")) errors.push("Deve imprimir Arion");
                    if (!output.includes("Selene")) errors.push("Deve imprimir Selene");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch7_a2",
                title: "Comparar Nomes",
                difficulty: "easy",
                description: "Compare dois nomes usando <code>strcmp</code> e imprima se são iguais.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    char nome1[20] = \"Arkan\";\n    char nome2[20] = \"Arkan\";\n    \n    // Compare usando strcmp e imprima resultado\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "strcmp retorna 0 se forem iguais." },
                    { level: "II", text: "if (strcmp(nome1, nome2) == 0) printf(\"Iguais\");" },
                    { level: "III", text: "if (strcmp(nome1, nome2) == 0) {\n    printf(\"Iguais\\n\");\n} else {\n    printf(\"Diferentes\\n\");\n}" }
                ],
                tests: [
                    { input: "", expected: "Iguais", description: "Nomes iguais" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Iguais")) errors.push("Deve imprimir Iguais");
                    if (!code.includes("strcmp")) errors.push("Use strcmp");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch7_a3",
                title: "Buscar por Nome",
                difficulty: "medium",
                description: "Dada uma lista de 5 nomes, busque por \"Lyra\" e imprima a posição encontrada. Se não encontrar, imprima \"Nao encontrado\".",
                starterCode: "#include <stdio.h>\n\nint main() {\n    char nomes[5][20] = {\"Arkan\", \"Lyra\", \"Kael\", \"Mira\", \"Orin\"};\n    char busca[20] = \"Lyra\";\n    int encontrado = 0;\n    \n    // Busque por \"Lyra\" usando strcmp\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use strcmp para comparar cada nome com o nome procurado." },
                    { level: "II", text: "for (int i = 0; i < 5; i++) {\n    if (strcmp(nomes[i], busca) == 0) {\n        printf(\"Posicao: %d\\n\", i);\n        encontrado = 1;\n    }\n}" },
                    { level: "III", text: "for (int i = 0; i < 5; i++) {\n    if (strcmp(nomes[i], busca) == 0) {\n        printf(\"Posicao: %d\\n\", i);\n        encontrado = 1;\n    }\n}\nif (!encontrado) printf(\"Nao encontrado\\n\");" }
                ],
                tests: [
                    { input: "", expected: "Posicao: 1", description: "Lyra está na posição 1" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("1")) errors.push("Lyra deve estar na posição 1");
                    if (!code.includes("strcmp")) errors.push("Use strcmp para comparação");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 08 — A CÂMARA DE MEMÓRIA
    // ═══════════════════════════════════════════════════════
    {
        id: 11,
        title: "A Câmara de Memória",
        theme: "Ponteiros",
        unlock: "Memória Expansível",
        unlockIcon: "(*)",
        character: "orin",
        xpReward: 150,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: MEMÓRIA" },
            { type: "character", name: "ORIN VALE", role: "ENGENHEIRO ARCANO", cssClass: "orin", text: "A verdadeira magia por trás do sistema está na memória. Cada dado ocupa um endereço. Para manipular dados diretamente, precisamos de ponteiros." },
            { type: "narrative", text: "Orin projeta um diagrama de memória:\n0x1000 → 10\n0x1004 → 20\n0x1008 → 30" },
            { type: "character", name: "ORIN VALE", role: "ENGENHEIRO ARCANO", cssClass: "orin", text: "Um <span class='highlight'>PONTEIRO</span> é uma variável que armazena o ENDEREÇO de outro dado. Com & você obtém o endereço, com * você acessa o valor." }
        ],
        concept: {
            title: "PONTEIROS — Conceito",
            explanation: "Um ponteiro armazena o endereço de memória de uma variável. & obtém o endereço, * desreferencia (obtém o valor).",
            code: "int x = 10;\nint *p = &x;\nprintf(\"Valor: %d\\n\", *p);\nprintf(\"Endereco: %p\\n\", p);"
        },
        example: {
            title: "Exemplo — Ponteiros",
            code: "#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *p = &x;\n    \n    printf(\"Valor de x: %d\\n\", x);\n    printf(\"Endereco de x: %p\\n\", &x);\n    printf(\"Valor via ponteiro: %d\\n\", *p);\n    \n    *p = 100;\n    printf(\"Novo valor de x: %d\\n\", x);\n    \n    return 0;\n}",
            output: "Valor de x: 42\nValor via ponteiro: 42\nNovo valor de x: 100"
        },
        experiment: {
            title: "Experimente",
            description: "Modifique o valor através do ponteiro e veja o efeito.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    int vida = 100;\n    int *p = &vida;\n    \n    printf(\"Vida inicial: %d\\n\", vida);\n    *p = 75;\n    printf(\"Vida apos dano: %d\\n\", vida);\n    *p = 150;\n    printf(\"Vida apos cura: %d\\n\", vida);\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Declare um ponteiro e use-o para modificar uma variável:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    int poder = 50;\n    // Declare um ponteiro para poder\n    \n    // Use o ponteiro para alterar poder para 99\n    \n    printf(\"Poder: %d\\n\", poder);\n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    int poder = 50;\n    int *p = &poder;\n    *p = 99;\n    printf(\"Poder: %d\\n\", poder);\n    return 0;\n}",
                    hint: "int *p = &poder;\n*p = 99;"
                }
            ]
        },
        activities: [
            {
                id: "ch8_a1",
                title: "Endereço e Valor",
                difficulty: "easy",
                description: "Declare uma variável e um ponteiro. Imprima o valor da variável e o valor acessado pelo ponteiro.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vida = 150;\n    // Declare um ponteiro p apontando para vida\n    \n    printf(\"Vida: %d\\n\", vida);\n    printf(\"Via ponteiro: %d\\n\", *p);\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use int *p = &vida;" },
                    { level: "II", text: "*p acessa o valor, & obtém o endereço." },
                    { level: "III", text: "int *p = &vida;" }
                ],
                tests: [
                    { input: "", expected: "Vida: 150\nVia ponteiro: 150", description: "Ponteiro acessa valor" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("150")) errors.push("Deve imprimir 150");
                    if (!code.includes("&")) errors.push("Use & para obter endereço");
                    if (!code.includes("*p") && !code.includes("*p")) errors.push("Use *p para desreferenciar");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch8_a2",
                title: "Modificar via Ponteiro",
                difficulty: "easy",
                description: "Use um ponteiro para modificar o valor de uma variável. Altere o ouro de 100 para 250.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int ouro = 100;\n    // Declare ponteiro e modifique ouro para 250\n    \n    printf(\"Ouro: %d\\n\", ouro);\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Declare o ponteiro e atribua *p = 250;" },
                    { level: "II", text: "int *p = &ouro;\n*p = 250;" },
                    { level: "III", text: "int *p = &ouro;\n*p = 250;" }
                ],
                tests: [
                    { input: "", expected: "Ouro: 250", description: "Ouro modificado" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("250")) errors.push("Ouro deve ser 250");
                    if (!code.includes("*p")) errors.push("Use *p para modificar");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch8_a3",
                title: "Trocar Valores",
                difficulty: "medium",
                description: "Implemente uma função <code>trocar</code> que receba dois ponteiros e troque seus valores. Em main, declare <code>a=10, b=20</code> e troque.",
                starterCode: "#include <stdio.h>\n\n// Crie a funcao trocar aqui\n\nint main() {\n    int a = 10;\n    int b = 20;\n    \n    printf(\"Antes: a=%d b=%d\\n\", a, b);\n    trocar(&a, &b);\n    printf(\"Depois: a=%d b=%d\\n\", a, b);\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "A função recebe dois int* e usa uma variável temporária para trocar." },
                    { level: "II", text: "void trocar(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}" },
                    { level: "III", text: "void trocar(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}" }
                ],
                tests: [
                    { input: "", expected: "Antes: a=10 b=20\nDepois: a=20 b=10", description: "Valores trocados" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Depois: a=20 b=10")) errors.push("Os valores devem ser trocados");
                    if (!code.includes("int *")) errors.push("Use ponteiros (int *)");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 09 — AS FICHAS DOS AVENTUREIROS
    // ═══════════════════════════════════════════════════════
    {
        id: 12,
        title: "As Fichas dos Aventureiros",
        theme: "Struct",
        unlock: "Cadastro de Aventureiros",
        unlockIcon: "[@]",
        character: "elion",
        xpReward: 140,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: AVENTUREIROS" },
            { type: "character", name: "ELION RAVEN", role: "MESTRE DOS REGISTROS", cssClass: "elion", text: "Cada aventureiro possui várias informações: nome, nível, vida, ouro. Precisamos agrupar dados relacionados." },
            { type: "narrative", text: "Elion mostra uma ficha:\n[ AVENTUREIRO ]\nNome: Arion\nNível: 12\nVida: 150\nOuro: 320" },
            { type: "character", name: "ELION RAVEN", role: "MESTRE DOS REGISTROS", cssClass: "elion", text: "Em C, isso se chama <span class='highlight'>STRUCT</span> — uma estrutura que agrupa diferentes tipos de dados sob um único nome." }
        ],
        concept: {
            title: "STRUCT — Conceito",
            explanation: "Uma struct permite agrupar variáveis de diferentes tipos em uma única estrutura nomeada.",
            code: "struct Aventureiro {\n    char nome[50];\n    int nivel;\n    int vida;\n    int ouro;\n};\n\nstruct Aventureiro a1;\nstrcpy(a1.nome, \"Arion\");\na1.nivel = 12;\na1.vida = 150;\na1.ouro = 320;"
        },
        example: {
            title: "Exemplo — Criar e Usar Struct",
            code: "#include <stdio.h>\n\nint main() {\n    char nome[20] = \"Arion\";\n    int nivel = 12;\n    int vida = 150;\n    int ouro = 320;\n    \n    printf(\"[ AVENTUREIRO ]\\n\");\n    printf(\"Nome: %s\\n\", nome);\n    printf(\"Nivel: %d\\n\", nivel);\n    printf(\"Vida: %d\\n\", vida);\n    printf(\"Ouro: %d\\n\", ouro);\n    \n    return 0;\n}",
            output: "[ AVENTUREIRO ]\nNome: Arion\nNivel: 12\nVida: 150\nOuro: 320"
        },
        experiment: {
            title: "Experimente",
            description: "Modifique os dados do aventureiro e veja a ficha atualizada.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    char nome[20] = \"Lyra\";\n    int nivel = 8;\n    int vida = 100;\n    int ouro = 150;\n    \n    printf(\"[ AVENTUREIRO ]\\n\");\n    printf(\"Nome: %s\\n\", nome);\n    printf(\"Nivel: %d\\n\", nivel);\n    printf(\"Vida: %d\\n\", vida);\n    printf(\"Ouro: %d\\n\", ouro);\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Crie uma struct e preencha os dados de um aventureiro:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    // Crie variaveis para um aventureiro:\n    // nome: \"Kael\", nivel: 15, vida: 200, ouro: 500\n    \n    printf(\"[ AVENTUREIRO ]\\n\");\n    // Imprima os dados\n    \n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    char nome[20] = \"Kael\";\n    int nivel = 15;\n    int vida = 200;\n    int ouro = 500;\n    \n    printf(\"[ AVENTUREIRO ]\\n\");\n    printf(\"Nome: %s\\n\", nome);\n    printf(\"Nivel: %d\\n\", nivel);\n    printf(\"Vida: %d\\n\", vida);\n    printf(\"Ouro: %d\\n\", ouro);\n    \n    return 0;\n}",
                    hint: "char nome[20] = \"Kael\"; int nivel = 15; int vida = 200; int ouro = 500;"
                }
            ]
        },
        activities: [
            {
                id: "ch9_a1",
                title: "Criar Ficha",
                difficulty: "easy",
                description: "Crie uma ficha completa de aventureiro com nome <code>\"Selene\"</code>, nível <code>7</code>, vida <code>80</code> e ouro <code>120</code>.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare e inicialize os dados\n    \n    // Imprima a ficha no formato:\n    // [ AVENTUREIRO ]\n    // Nome: Selene\n    // Nivel: 7\n    // Vida: 80\n    // Ouro: 120\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Crie uma variável char para nome e int para nivel, vida, ouro." },
                    { level: "II", text: "char nome[20] = \"Selene\"; int nivel = 7; int vida = 80; int ouro = 120;" },
                    { level: "III", text: "char nome[20] = \"Selene\";\nint nivel = 7;\nint vida = 80;\nint ouro = 120;\nprintf(\"[ AVENTUREIRO ]\\n\");\nprintf(\"Nome: %s\\n\", nome);\nprintf(\"Nivel: %d\\n\", nivel);\nprintf(\"Vida: %d\\n\", vida);\nprintf(\"Ouro: %d\\n\", ouro);" }
                ],
                tests: [
                    { input: "", expected: "[ AVENTUREIRO ]\nNome: Selene\nNivel: 7\nVida: 80\nOuro: 120", description: "Ficha completa" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Selene")) errors.push("Nome deve ser Selene");
                    if (!output.includes("Nivel: 7")) errors.push("Nível deve ser 7");
                    if (!output.includes("Vida: 80")) errors.push("Vida deve ser 80");
                    if (!output.includes("Ouro: 120")) errors.push("Ouro deve ser 120");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch9_a2",
                title: "Duas Fichas",
                difficulty: "easy",
                description: "Crie duas fichas de aventureiro e imprima ambas, cada uma com seu nome, nível, vida e ouro.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    // Aventureiro 1: Arion, nivel 12, vida 150, ouro 320\n    \n    // Aventureiro 2: Lyra, nivel 8, vida 100, ouro 150\n    \n    // Imprima ambas as fichas\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Crie duas variáveis para cada campo ou use arrays." },
                    { level: "II", text: "Use duas variáveis de cada tipo, ou organize em arrays paralelos." },
                    { level: "III", text: "char n1[20] = \"Arion\"; int nv1 = 12, v1 = 150, o1 = 320;\nchar n2[20] = \"Lyra\"; int nv2 = 8, v2 = 100, o2 = 150;\n// Imprima cada um" }
                ],
                tests: [
                    { input: "", expected: "Nome: Arion\nNome: Lyra", description: "Duas fichas impressas" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Arion")) errors.push("Ficha de Arion não encontrada");
                    if (!output.includes("Lyra")) errors.push("Ficha de Lyra não encontrada");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch9_a3",
                title: "Aventureiro Mais Forte",
                difficulty: "medium",
                description: "Crie 3 aventureiros e encontre quem tem o <strong>maior nível</strong>. Imprima o nome do mais forte.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    // Aventureiro 1: Arion, nivel 12\n    // Aventureiro 2: Kael, nivel 20\n    // Aventureiro 3: Mira, nivel 15\n    \n    // Encontre quem tem maior nivel e imprima\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Compare os níveis usando if para manter o maior." },
                    { level: "II", text: "Use uma string e uma variável para o maior nível atual. Compare cada aventureiro." },
                    { level: "III", text: "char maisForte[20] = \"Arion\";\nint maiorNivel = 12;\nif (20 > maiorNivel) { strcpy(maisForte, \"Kael\"); maiorNivel = 20; }\nif (15 > maiorNivel) { strcpy(maisForte, \"Mira\"); maiorNivel = 15; }\nprintf(\"Mais forte: %s (nivel %d)\\n\", maisForte, maiorNivel);" }
                ],
                tests: [
                    { input: "", expected: "Mais forte: Kael (nivel 20)", description: "Kael tem maior nível" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Kael")) errors.push("Kael deve ser o mais forte");
                    if (!output.includes("20")) errors.push("O nível deve ser 20");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 10 — O REGISTRO DA GUILDA
    // ═══════════════════════════════════════════════════════
    {
        id: 13,
        title: "O Registro da Guilda",
        theme: "Vetores de Struct",
        unlock: "Banco de Aventureiros",
        unlockIcon: "[//]",
        character: "elion",
        xpReward: 150,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: BANCO DE DADOS" },
            { type: "character", name: "ELION RAVEN", role: "MESTRE DOS REGISTROS", cssClass: "elion", text: "Uma ficha é útil, mas a Guilda precisa gerenciar TODOS os aventureiros. Precisamos de um VETOR de structs." },
            { type: "narrative", text: "Elion exibe uma lista:\n[0] Arion - Nivel 12\n[1] Lyra - Nivel 8\n[2] Kael - Nivel 20\n[3] Mira - Nivel 15" },
            { type: "character", name: "ELION RAVEN", role: "MESTRE DOS REGISTROS", cssClass: "elion", text: "Agora precisamos percorrer cada registro com um <span class='highlight'>LOOP</span> para acessar os dados." }
        ],
        concept: {
            title: "VETOR DE STRUCT — Conceito",
            explanation: "Um vetor de structs permite armazenar múltiplas estruturas do mesmo tipo, acessadas por índice.",
            code: "struct Aventureiro guilda[4];\nguilda[0].nivel = 12;\nguilda[1].nivel = 8;\n\nfor (int i = 0; i < 4; i++) {\n    printf(\"%s: nivel %d\\n\", guilda[i].nome, guilda[i].nivel);\n}"
        },
        example: {
            title: "Exemplo — Percorrer Registros",
            code: "#include <stdio.h>\n\nint main() {\n    char nomes[4][20] = {\"Arion\", \"Lyra\", \"Kael\", \"Mira\"};\n    int niveis[4] = {12, 8, 20, 15};\n    \n    for (int i = 0; i < 4; i++) {\n        printf(\"[%d] %s - Nivel %d\\n\", i, nomes[i], niveis[i]);\n    }\n    \n    return 0;\n}",
            output: "[0] Arion - Nivel 12\n[1] Lyra - Nivel 8\n[2] Kael - Nivel 20\n[3] Mira - Nivel 15"
        },
        experiment: {
            title: "Experimente",
            description: "Adicione novos aventureiros e percorra a lista.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    char nomes[5][20] = {\"Arion\", \"Lyra\", \"Kael\", \"Mira\", \"Orin\"};\n    int niveis[5] = {12, 8, 20, 15, 6};\n    \n    for (int i = 0; i < 5; i++) {\n        printf(\"[%d] %s (Nivel %d)\\n\", i, nomes[i], niveis[i]);\n    }\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Crie um registro de aventureiros e imprima todos com um loop:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    char nomes[3][20] = {\"Arkan\", \"Lyra\", \"Kael\"};\n    int niveis[3] = {25, 8, 20};\n    \n    // Use um for para imprimir cada aventureiro\n    \n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    char nomes[3][20] = {\"Arkan\", \"Lyra\", \"Kael\"};\n    int niveis[3] = {25, 8, 20};\n    \n    for (int i = 0; i < 3; i++) {\n        printf(\"[%d] %s - Nivel %d\\n\", i, nomes[i], niveis[i]);\n    }\n    \n    return 0;\n}",
                    hint: "for (int i = 0; i < 3; i++) { printf(\"[%d] %s - Nivel %d\\n\", i, nomes[i], niveis[i]); }"
                }
            ]
        },
        activities: [
            {
                id: "ch10_a1",
                title: "Listar Registros",
                difficulty: "easy",
                description: "Use um <code>for</code> para imprimir todos os 4 aventureiros do registro.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    char nomes[4][20] = {\"Arion\", \"Lyra\", \"Kael\", \"Mira\"};\n    int niveis[4] = {12, 8, 20, 15};\n    int vidas[4] = {150, 100, 200, 120};\n    \n    // Use for para imprimir cada um\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use um loop for de 0 a 3 e acesse os arrays paralelos." },
                    { level: "II", text: "for (int i = 0; i < 4; i++) {\n    printf(\"[%d] %s - Vida: %d\\n\", i, nomes[i], vidas[i]);\n}" },
                    { level: "III", text: "for (int i = 0; i < 4; i++) {\n    printf(\"[%d] %s (Nivel %d) - Vida: %d\\n\", i, nomes[i], niveis[i], vidas[i]);\n}" }
                ],
                tests: [
                    { input: "", expected: "Arion", description: "Todos os aventureiros listados" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Arion")) errors.push("Deve listar Arion");
                    if (!output.includes("Mira")) errors.push("Deve listar Mira");
                    if (!code.includes("for")) errors.push("Use um loop for");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch10_a2",
                title: "Buscar por Nível",
                difficulty: "easy",
                description: "Encontre todos os aventureiros com nível <strong>maior que 10</strong>.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    char nomes[4][20] = {\"Arion\", \"Lyra\", \"Kael\", \"Mira\"};\n    int niveis[4] = {12, 8, 20, 15};\n    \n    printf(\"Aventureiros nivel > 10:\\n\");\n    \n    // Busque e imprima quem tem nivel > 10\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use um if dentro do for para verificar niveis[i] > 10." },
                    { level: "II", text: "for (int i = 0; i < 4; i++) {\n    if (niveis[i] > 10) {\n        printf(\"%s - Nivel %d\\n\", nomes[i], niveis[i]);\n    }\n}" },
                    { level: "III", text: "for (int i = 0; i < 4; i++) {\n    if (niveis[i] > 10) {\n        printf(\"%s - Nivel %d\\n\", nomes[i], niveis[i]);\n    }\n}" }
                ],
                tests: [
                    { input: "", expected: "Arion", description: "3 aventureiros nível > 10" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Arion")) errors.push("Arion deve ser listado");
                    if (!output.includes("Kael")) errors.push("Kael deve ser listado");
                    if (output.includes("Lyra")) errors.push("Lyra não deve ser listada (nível 8)");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch10_a3",
                title: "Calcular Média",
                difficulty: "medium",
                description: "Calcule a <strong>média de vida</strong> de todos os 4 aventureiros e imprima o resultado.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    char nomes[4][20] = {\"Arion\", \"Lyra\", \"Kael\", \"Mira\"};\n    int vidas[4] = {150, 100, 200, 120};\n    int total = 0;\n    \n    // Some todas as vidas\n    \n    // Calcule e imprima a media\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use um for para somar todas as vidas, depois divida por 4." },
                    { level: "II", text: "for (int i = 0; i < 4; i++) total += vidas[i];\nprintf(\"Media de vida: %d\\n\", total / 4);" },
                    { level: "III", text: "for (int i = 0; i < 4; i++) {\n    total += vidas[i];\n}\nprintf(\"Media de vida: %d\\n\", total / 4);" }
                ],
                tests: [
                    { input: "", expected: "Media de vida: 142", description: "Média = (150+100+200+120)/4 = 142" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("142")) errors.push("A média deve ser 142");
                    if (!code.includes("for")) errors.push("Use um loop for");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 11 — O TORNEIO
    // ═══════════════════════════════════════════════════════
    {
        id: 14,
        title: "O Torneio",
        theme: "Ordenação",
        unlock: "Ranking da Guilda",
        unlockIcon: "[!]",
        character: "kael",
        xpReward: 160,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: RANKING" },
            { type: "character", name: "KAEL DRAVEN", role: "MESTRE DO ARSENAL", cssClass: "kael", text: "O Torneio da Guilda se aproxima. Precisamos ordenar os aventureiros por nível. Do mais fraco ao mais forte." },
            { type: "narrative", text: "Kael mostra a lista desordenada:\n[15] [8] [20] [12] [25]" },
            { type: "character", name: "KAEL DRAVEN", role: "MESTRE DO ARSENAL", cssClass: "kael", text: "No Torneio, o ranking decide quem enfrenta quem. Precisamos de algoritmos de <span class='highlight'>ORDENAÇÃO</span>." }
        ],
        concept: {
            title: "ORDENAÇÃO — Conceito",
            explanation: "Algoritmos de ordenação rearranjam elementos. Bolha compara vizinhos e troca. Seleção busca o menor e coloca na frente.",
            code: "// Bubble Sort\nfor (int i = 0; i < n-1; i++) {\n    for (int j = 0; j < n-1-i; j++) {\n        if (vet[j] > vet[j+1]) {\n            int temp = vet[j];\n            vet[j] = vet[j+1];\n            vet[j+1] = temp;\n        }\n    }\n}"
        },
        example: {
            title: "Exemplo — Bubble Sort",
            code: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {15, 8, 20, 12, 25};\n    int n = 5;\n    \n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-1-i; j++) {\n            if (vet[j] > vet[j+1]) {\n                int temp = vet[j];\n                vet[j] = vet[j+1];\n                vet[j+1] = temp;\n            }\n        }\n    }\n    \n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}",
            output: "8 12 15 20 25"
        },
        experiment: {
            title: "Experimente",
            description: "Altere os valores e observe como o bubble sort funciona.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {30, 5, 15, 10, 20};\n    int n = 5;\n    \n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-1-i; j++) {\n            if (vet[j] > vet[j+1]) {\n                int temp = vet[j];\n                vet[j] = vet[j+1];\n                vet[j+1] = temp;\n            }\n        }\n    }\n    \n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", vet[i]);\n    }\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Complete o bubble sort para ordenar os elementos:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[4] = {30, 10, 20, 5};\n    int n = 4;\n    \n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-1-i; j++) {\n            // Se vet[j] > vet[j+1], troque\n            \n        }\n    }\n    \n    for (int i = 0; i < n; i++) printf(\"%d \", vet[i]);\n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    int vet[4] = {30, 10, 20, 5};\n    int n = 4;\n    \n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-1-i; j++) {\n            if (vet[j] > vet[j+1]) {\n                int temp = vet[j];\n                vet[j] = vet[j+1];\n                vet[j+1] = temp;\n            }\n        }\n    }\n    \n    for (int i = 0; i < n; i++) printf(\"%d \", vet[i]);\n    return 0;\n}",
                    hint: "if (vet[j] > vet[j+1]) { int temp = vet[j]; vet[j] = vet[j+1]; vet[j+1] = temp; }"
                }
            ]
        },
        activities: [
            {
                id: "ch11_a1",
                title: "Bubble Sort",
                difficulty: "easy",
                description: "Implemente o Bubble Sort para ordenar <code>{30, 10, 20, 5, 15}</code> em ordem crescente.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {30, 10, 20, 5, 15};\n    int n = 5;\n    \n    // Implemente o bubble sort\n    \n    for (int i = 0; i < n; i++) printf(\"%d \", vet[i]);\n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use dois fors aninhados. O externo repete n-1 vezes, o interno compara vizinhos." },
                    { level: "II", text: "for (int i = 0; i < n-1; i++)\n    for (int j = 0; j < n-1-i; j++)\n        if (vet[j] > vet[j+1]) { /* troca */ }" },
                    { level: "III", text: "for (int i = 0; i < n-1; i++) {\n    for (int j = 0; j < n-1-i; j++) {\n        if (vet[j] > vet[j+1]) {\n            int temp = vet[j];\n            vet[j] = vet[j+1];\n            vet[j+1] = temp;\n        }\n    }\n}" }
                ],
                tests: [
                    { input: "", expected: "5 10 15 20 30", description: "Ordenação crescente" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    let parts = output.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
                    if (parts.length >= 5) {
                        let sorted = true;
                        for (let i = 1; i < parts.length; i++) {
                            if (parts[i] < parts[i-1]) sorted = false;
                        }
                        if (!sorted) errors.push("O vetor não está ordenado corretamente");
                    } else {
                        errors.push("Deve imprimir 5 valores");
                    }
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch11_a2",
                title: "Selection Sort",
                difficulty: "easy",
                description: "Implemente Selection Sort para ordenar <code>{25, 12, 8, 30, 15}</code>.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    int vet[5] = {25, 12, 8, 30, 15};\n    int n = 5;\n    \n    // Implemente o selection sort\n    \n    for (int i = 0; i < n; i++) printf(\"%d \", vet[i]);\n    return 0;\n}",
                hints: [
                    { level: "I", text: "Para cada posição, encontre o menor elemento restante e troque." },
                    { level: "II", text: "for (int i = 0; i < n-1; i++) {\n    int minIdx = i;\n    for (int j = i+1; j < n; j++)\n        if (vet[j] < vet[minIdx]) minIdx = j;\n    // troque vet[i] com vet[minIdx]\n}" },
                    { level: "III", text: "for (int i = 0; i < n-1; i++) {\n    int minIdx = i;\n    for (int j = i+1; j < n; j++) {\n        if (vet[j] < vet[minIdx]) minIdx = j;\n    }\n    int temp = vet[i];\n    vet[i] = vet[minIdx];\n    vet[minIdx] = temp;\n}" }
                ],
                tests: [
                    { input: "", expected: "8 12 15 25 30", description: "Selection sort correto" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    let parts = output.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
                    if (parts.length >= 5) {
                        let sorted = true;
                        for (let i = 1; i < parts.length; i++) {
                            if (parts[i] < parts[i-1]) sorted = false;
                        }
                        if (!sorted) errors.push("Vetor não está ordenado");
                    } else {
                        errors.push("Deve imprimir 5 valores");
                    }
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch11_a3",
                title: "Ordenar por Ouro",
                difficulty: "medium",
                description: "Dados nomes e ouro de 5 aventureiros, ordene por <strong>ouro (decrescente)</strong> usando Bubble Sort. Imprima o ranking.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    char nomes[5][20] = {\"Arion\", \"Lyra\", \"Kael\", \"Mira\", \"Orin\"};\n    int ouro[5] = {320, 150, 500, 200, 100};\n    int n = 5;\n    \n    // Ordene por ouro (decrescente)\n    // Se ouro[j] < ouro[j+1], troque ambos (nome e ouro)\n    \n    printf(\"Ranking por Ouro:\\n\");\n    for (int i = 0; i < n; i++) {\n        printf(\"%d. %s - %d ouro\\n\", i+1, nomes[i], ouro[i]);\n    }\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use Bubble Sort, mas troque TANTO o ouro quanto o nome quando houver inversão." },
                    { level: "II", text: "Ao trocar: também troque os nomes com a mesma lógica." },
                    { level: "III", text: "if (ouro[j] < ouro[j+1]) {\n    int tempO = ouro[j];\n    ouro[j] = ouro[j+1];\n    ouro[j+1] = tempO;\n    char tempN[20];\n    strcpy(tempN, nomes[j]);\n    strcpy(nomes[j], nomes[j+1]);\n    strcpy(nomes[j+1], tempN);\n}" }
                ],
                tests: [
                    { input: "", expected: "Kael - 500", description: "Kael no topo do ranking" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Kael")) errors.push("Kael deve estar no ranking");
                    if (!output.includes("500")) errors.push("Kael tem 500 de ouro");
                    if (!code.includes("for")) errors.push("Use um loop");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 12 — O LIVRO ETERNO
    // ═══════════════════════════════════════════════════════
    {
        id: 15,
        title: "O Livro Eterno",
        theme: "Arquivos",
        unlock: "Persistência",
        unlockIcon: "[|]",
        character: "elion",
        xpReward: 200,
        story: [
            { type: "system", text: "[ SISTEMA ] Iniciando reconstrução do módulo: PERSISTÊNCIA" },
            { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Tudo o que construímos... desaparece quando o sistema é desligado. Precisamos que os dados sobrevivam." },
            { type: "character", name: "ELION RAVEN", role: "MESTRE DOS REGISTROS", cssClass: "elion", text: "A solução são os <span class='highlight'>ARQUIVOS</span>. Precisamos gravar os dados em disco e poder lê-los novamente." },
            { type: "narrative", text: "Elion abre o terminal:\nguilda.dat → Criado\ninventario.dat → Criado\nmissoes.dat → Criado" },
            { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Finalmente... A Guilda não depende mais da memória de uma única pessoa. Você construiu um sistema que pode sobreviver a nós." },
            { type: "system", text: "[ SISTEMA ] PARABÉNS! Você completou todos os módulos e se tornou MESTRE DA GUILDA!" }
        ],
        concept: {
            title: "ARQUIVOS — Conceito",
            explanation: "Arquivos permitem salvar dados permanentemente. Use fopen para abrir, fprintf para escrever, fclose para fechar.",
            code: "FILE *arquivo = fopen(\"guilda.dat\", \"w\");\nfprintf(arquivo, \"Nome: Arkan\\n\");\nfprintf(arquivo, \"Nivel: 25\\n\");\nfclose(arquivo);"
        },
        example: {
            title: "Exemplo — Salvar e Ler Arquivo",
            code: "#include <stdio.h>\n\nint main() {\n    // Escrever\n    FILE *f = fopen(\"guilda.dat\", \"w\");\n    fprintf(f, \"Arkan:25\\n\");\n    fprintf(f, \"Lyra:8\\n\");\n    fclose(f);\n    \n    // Ler\n    FILE *r = fopen(\"guilda.dat\", \"r\");\n    char linha[100];\n    while (fgets(linha, 100, r) != NULL) {\n        printf(\"%s\", linha);\n    }\n    fclose(r);\n    \n    return 0;\n}",
            output: "Arkan:25\nLyra:8"
        },
        experiment: {
            title: "Experimente",
            description: "Modifique os dados gravados no arquivo.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"guilda.dat\", \"w\");\n    fprintf(f, \"Mestre: Arkan\\n\");\n    fprintf(f, \"Guilda: Nova Aurora\\n\");\n    fprintf(f, \"Membros: 4\\n\");\n    fclose(f);\n    \n    FILE *r = fopen(\"guilda.dat\", \"r\");\n    char linha[100];\n    while (fgets(linha, 100, r) != NULL) {\n        printf(\"%s\", linha);\n    }\n    fclose(r);\n    \n    return 0;\n}"
        },
        tutorial: {
            title: "Tutorial Guiado",
            steps: [
                {
                    instruction: "Crie um arquivo e grave dados nele:",
                    starterCode: "#include <stdio.h>\n\nint main() {\n    // Abra um arquivo \"guilda.dat\" para escrita\n    \n    // Escreva \"Mestre: Arkan\\n\"\n    \n    // Feche o arquivo\n    \n    // Reabra para leitura e imprima o conteudo\n    \n    return 0;\n}",
                    solution: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"guilda.dat\", \"w\");\n    fprintf(f, \"Mestre: Arkan\\n\");\n    fclose(f);\n    \n    FILE *r = fopen(\"guilda.dat\", \"r\");\n    char linha[100];\n    while (fgets(linha, 100, r) != NULL) {\n        printf(\"%s\", linha);\n    }\n    fclose(r);\n    \n    return 0;\n}",
                    hint: "FILE *f = fopen(\"guilda.dat\", \"w\"); fprintf(f, ...); fclose(f);"
                }
            ]
        },
        activities: [
            {
                id: "ch12_a1",
                title: "Salvar no Arquivo",
                difficulty: "easy",
                description: "Crie um arquivo chamado <code>guilda.dat</code> e grave 3 linhas de dados.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    // Abra guilda.dat para escrita\n    \n    // Escreva 3 linhas:\n    // Lider: Arkan\n    // Nivel: 25\n    // Rank: S\n    \n    // Feche o arquivo\n    \n    printf(\"Arquivo salvo com sucesso!\\n\");\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use fopen(\"guilda.dat\", \"w\"), fprintf e fclose." },
                    { level: "II", text: "FILE *f = fopen(\"guilda.dat\", \"w\");\nfprintf(f, \"Lider: Arkan\\n\");\nfprintf(f, \"Nivel: 25\\n\");\nfprintf(f, \"Rank: S\\n\");\nfclose(f);" },
                    { level: "III", text: "FILE *f = fopen(\"guilda.dat\", \"w\");\nif (f != NULL) {\n    fprintf(f, \"Lider: Arkan\\n\");\n    fprintf(f, \"Nivel: 25\\n\");\n    fprintf(f, \"Rank: S\\n\");\n    fclose(f);\n}" }
                ],
                tests: [
                    { input: "", expected: "Arquivo salvo com sucesso!", description: "Arquivo criado" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Arquivo salvo")) errors.push("Deve imprimir mensagem de sucesso");
                    if (!code.includes("fopen")) errors.push("Use fopen");
                    if (!code.includes("fprintf")) errors.push("Use fprintf");
                    if (!code.includes("fclose")) errors.push("Use fclose");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch12_a2",
                title: "Ler do Arquivo",
                difficulty: "easy",
                description: "Escreva 3 valores em um arquivo e depois leia e imprima cada linha.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    // Escreva no arquivo\n    FILE *f = fopen(\"dados.dat\", \"w\");\n    fprintf(f, \"Arion:12\\n\");\n    fprintf(f, \"Lyra:8\\n\");\n    fprintf(f, \"Kael:20\\n\");\n    fclose(f);\n    \n    // Leia e imprima\n    FILE *r = fopen(\"dados.dat\", \"r\");\n    // Use fgets para ler cada linha\n    \n    fclose(r);\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use fgets(linha, 100, r) para ler cada linha." },
                    { level: "II", text: "char linha[100];\nwhile (fgets(linha, 100, r) != NULL) {\n    printf(\"%s\", linha);\n}" },
                    { level: "III", text: "char linha[100];\nwhile (fgets(linha, 100, r) != NULL) {\n    printf(\"%s\", linha);\n}" }
                ],
                tests: [
                    { input: "", expected: "Arion:12", description: "Dados lidos corretamente" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Arion:12")) errors.push("Deve ler e imprimir Arion:12");
                    if (!output.includes("Lyra:8")) errors.push("Deve ler Lyra:8");
                    if (!code.includes("fgets") && !code.includes("fscanf")) errors.push("Use fgets ou fscanf para ler");
                    return { pass: errors.length === 0, errors };
                }
            },
            {
                id: "ch12_a3",
                title: "Persistência Completa",
                difficulty: "medium",
                description: "Salve os dados de 3 aventureiros (nome, nível, vida, ouro) em um arquivo, depois leia e imprima todos formatados como fichas.",
                starterCode: "#include <stdio.h>\n\nint main() {\n    // Salve os dados:\n    // Arion:12:150:320\n    // Lyra:8:100:150\n    // Kael:20:200:500\n    \n    // Leia e imprima como:\n    // [ AVENTUREIRO ]\n    // Nome: Arion\n    // Nivel: 12\n    // ...\n    \n    return 0;\n}",
                hints: [
                    { level: "I", text: "Use fprintf para salvar no formato nome:nivel:vida:ouro" },
                    { level: "II", text: "fprintf(f, \"%s:%d:%d:%d\\n\", nome, nivel, vida, ouro);" },
                    { level: "III", text: "// Salvar\nFILE *f = fopen(\"guilda.dat\", \"w\");\nfprintf(f, \"Arion:12:150:320\\n\");\nfprintf(f, \"Lyra:8:100:150\\n\");\nfprintf(f, \"Kael:20:200:500\\n\");\nfclose(f);\n// Ler\nFILE *r = fopen(\"guilda.dat\", \"r\");\nchar linha[100];\nwhile (fgets(linha, 100, r) != NULL) {\n    printf(\"[ DADO ] %s\", linha);\n}\nfclose(r);" }
                ],
                tests: [
                    { input: "", expected: "[ DADO ] Arion:12:150:320", description: "Dados persistidos e lidos" }
                ],
                validator: function(code, output) {
                    let errors = [];
                    if (!output.includes("Arion")) errors.push("Deve ler dados de Arion");
                    if (!output.includes("Kael")) errors.push("Deve ler dados de Kael");
                    if (!code.includes("fopen")) errors.push("Use fopen");
                    if (!code.includes("fprintf") || !code.includes("fgets")) errors.push("Use fprintf e fgets");
                    return { pass: errors.length === 0, errors };
                }
            }
        ]
    }
];

// Guild systems that get unlocked
const GUILD_SYSTEMS = [
    { id: "terminal", name: "Terminal Básico", icon: ">_", concept: "Fundamentos de C", chapter: 1 },
    { id: "command", name: "Sistema de Comando", icon: "[*]", concept: "Controle de Fluxo", chapter: 2 },
    { id: "writing", name: "Sistema de Escrita", icon: "{ }", concept: "Funções", chapter: 3 },
    { id: "inventory", name: "Inventário I", icon: "[ ]", concept: "Vetores", chapter: 4 },
    { id: "exploration", name: "Sistema de Exploração", icon: "< >", concept: "Recursividade", chapter: 5 },
    { id: "search", name: "Sistema de Busca", icon: "(?)", concept: "Busca Linear", chapter: 6 },
    { id: "arsenal", name: "Arsenal Organizado", icon: "{+}", concept: "Inserção", chapter: 7 },
    { id: "library", name: "Busca Avançada", icon: "{B}", concept: "Busca Binária", chapter: 8 },
    { id: "map", name: "Cartografia da Guilda", icon: "[#]", concept: "Matriz", chapter: 9 },
    { id: "records", name: "Cadastro de Registros", icon: "(...)" , concept: "Strings", chapter: 10 },
    { id: "memory", name: "Memória Expansível", icon: "[*]", concept: "Ponteiros", chapter: 11 },
    { id: "roster", name: "Cadastro de Aventureiros", icon: "{S}", concept: "Struct", chapter: 12 },
    { id: "database", name: "Banco de Aventureiros", icon: "[S]", concept: "Vetores de Struct", chapter: 13 },
    { id: "ranking", name: "Ranking da Guilda", icon: "#1", concept: "Ordenação", chapter: 14 },
    { id: "persistence", name: "Persistência", icon: "(>>)", concept: "Arquivos", chapter: 15 }
];
