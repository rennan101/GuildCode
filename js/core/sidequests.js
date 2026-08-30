/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Side Quests / O Abismo
   5 atividades exclusivas por capítulo (80 total, Andares 0 a 15)
   Estrutura: 1 Fácil + 4 Medianas
   ═══════════════════════════════════════════════════════════════ */

const SIDE_QUESTS = {
    // ─── ANDAR 00 — Entrada, Saída e Fundamentos (printf, scanf, máscaras) ───
    0: [
        {
            id: "sq0_1",
            title: "Câmara 0-1: Eco da Guilda",
            difficulty: "easy",
            xp: 20,
            description: "Leia um número inteiro de mana e imprima o triplo do valor no formato: <code>Mana Triplicada: X</code>.",
            starterCode: '#include <stdio.h>\n\nint main() {\n    int mana;\n    // Leia mana e imprima 3 * mana\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "Use scanf(\"%d\", &mana);" },
                { level: "II", text: "Multiplique por 3 no printf: printf(\"Mana Triplicada: %d\\n\", mana * 3);" },
                { level: "III", text: 'scanf("%d", &mana);\nprintf("Mana Triplicada: %d\\n", mana * 3);' }
            ],
            tests: [
                { input: "15", expected: "Mana Triplicada: 45", description: "15 * 3 = 45" },
                { input: "30", expected: "Mana Triplicada: 90", description: "30 * 3 = 90" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("scanf")) errors.push("Utilize scanf para leitura");
                if (!output.includes("Mana Triplicada:")) errors.push("Formato esperado: 'Mana Triplicada: X'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "sq0_2",
            title: "Câmara 0-2: Conversor de Moedas Arcanas",
            difficulty: "medium",
            xp: 25,
            description: "Leia um valor em moedas de ouro (int) e converta para fragmentos de cristal (float) dividindo por 2.5. Imprima com 2 casas decimais: <code>Cristais: Y.YY</code>.",
            starterCode: '#include <stdio.h>\n\nint main() {\n    int ouro;\n    // Leia ouro e imprima ouro / 2.5 formatado com %.2f\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "Use float cristais = ouro / 2.5f;" },
                { level: "II", text: "Formate com %.2f: printf(\"Cristais: %.2f\\n\", cristais);" },
                { level: "III", text: 'scanf("%d", &ouro);\nfloat cristais = ouro / 2.5f;\nprintf("Cristais: %.2f\\n", cristais);' }
            ],
            tests: [
                { input: "10", expected: "Cristais: 4.00", description: "10 / 2.5 = 4.00" },
                { input: "25", expected: "Cristais: 10.00", description: "25 / 2.5 = 10.00" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Cristais:")) errors.push("Saída deve conter 'Cristais:'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "sq0_3",
            title: "Câmara 0-3: Média Aritmética Rápida",
            difficulty: "medium",
            xp: 25,
            description: "Leia 3 números inteiros com scanf e imprima a média aritmética exata formatada com 1 casa decimal: <code>Media: M.M</code>.",
            starterCode: '#include <stdio.h>\n\nint main() {\n    int a, b, c;\n    // Leia 3 inteiros e calcule a media\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "scanf(\"%d %d %d\", &a, &b, &c);" },
                { level: "II", text: "Converta para float ao dividir por 3.0: float med = (a + b + c) / 3.0f;" },
                { level: "III", text: 'scanf("%d %d %d", &a, &b, &c);\nfloat med = (a + b + c) / 3.0f;\nprintf("Media: %.1f\\n", med);' }
            ],
            tests: [
                { input: "10 20 30", expected: "Media: 20.0", description: "(10+20+30)/3 = 20.0" },
                { input: "7 8 9", expected: "Media: 8.0", description: "(7+8+9)/3 = 8.0" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Media:")) errors.push("Saída deve conter 'Media:'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "sq0_4",
            title: "Câmara 0-4: Código ASCII do Conjurador",
            difficulty: "medium",
            xp: 25,
            description: "Leia um único caractere <code>char c</code> e imprima o caractere e seu código ASCII correspondente no formato: <code>Runa: X | Codigo: Y</code>.",
            starterCode: '#include <stdio.h>\n\nint main() {\n    char c;\n    // Leia um caractere e imprima seu char e seu decimal %d\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "Use scanf(\" %c\", &c);" },
                { level: "II", text: "Para imprimir o código ASCII, use %d passando a variável c: printf(\"Runa: %c | Codigo: %d\\n\", c, c);" },
                { level: "III", text: 'scanf(" %c", &c);\nprintf("Runa: %c | Codigo: %d\\n", c, c);' }
            ],
            tests: [
                { input: "A", expected: "Runa: A | Codigo: 65", description: "ASCII de 'A' = 65" },
                { input: "Z", expected: "Runa: Z | Codigo: 90", description: "ASCII de 'Z' = 90" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Runa:") || !output.includes("Codigo:")) errors.push("Formato esperado: 'Runa: X | Codigo: Y'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "sq0_5",
            title: "Câmara 0-5: Cálculo de Eficiência de Mana",
            difficulty: "medium",
            xp: 25,
            description: "Leia o dano causado (int) e o custo de mana (int). Calcule e imprima a eficiência (Dano / Mana) formatada com 2 casas decimais: <code>Eficiencia: E.EE</code>.",
            starterCode: '#include <stdio.h>\n\nint main() {\n    int dano, mana;\n    // Calcule dano / (float)mana\n    \n    return 0;\n}',
            hints: [
                { level: "I", text: "Faça o cast para float: (float)dano / mana;" },
                { level: "II", text: "printf(\"Eficiencia: %.2f\\n\", (float)dano / mana);" },
                { level: "III", text: 'scanf("%d %d", &dano, &mana);\nprintf("Eficiencia: %.2f\\n", (float)dano / mana);' }
            ],
            tests: [
                { input: "100 40", expected: "Eficiencia: 2.50", description: "100 / 40 = 2.50" },
                { input: "150 50", expected: "Eficiencia: 3.00", description: "150 / 50 = 3.00" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Eficiencia:")) errors.push("Saída deve conter 'Eficiencia:'");
                return { pass: errors.length === 0, errors };
            }
        }
    ],

    // ─── ANDAR 01 — Fundamentos de C (Tipos, Operadores, Atribuição) ───
    1: [
        { id: "sq1_1", title: "Tipos no Inventário", difficulty: "easy", xp: 15,
          description: "Declare uma variável de cada tipo: <code>int</code>, <code>char</code>, <code>float</code>. Imprima cada valor.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    // Declare int, char e float\n    \n    // Imprima cada valor\n    \n    return 0;\n}',
          hints: [{ level: "I", text: "int n = 10; char c = 'A'; float f = 3.14;" },
                  { level: "II", text: 'printf("%d %c %f", n, c, f);' },
                  { level: "III", text: 'int n = 10;\nchar c = \'A\';\nfloat f = 3.14;\nprintf("%d %c %f\\n", n, c, f);' }],
          tests: [{ input: "", expected: "10 A", description: "Valores impressos" }],
          validator: function(code, output) {
              let errors = [];
              if (!code.includes("int ")) errors.push("Declare uma variável int");
              if (!code.includes("char ")) errors.push("Declare uma variável char");
              if (!code.includes("float ")) errors.push("Declare uma variável float");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq1_2", title: "Operador Ternário", difficulty: "easy", xp: 15,
          description: "Use o operador ternário para definir o rank: se <code>nivel >= 10</code> imprima \"A\", senão \"B\".",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int nivel = 15;\n    \n    // Use operador ternário para definir rank\n    \n    return 0;\n}',
          hints: [{ level: "I", text: "Operador ternário: condição ? valorVerdadeiro : valorFalso" },
                  { level: "II", text: 'char rank = (nivel >= 10) ? \'A\' : \'B\';' },
                  { level: "III", text: 'char rank = (nivel >= 10) ? \'A\' : \'B\';\nprintf("Rank: %c\\n", rank);' }],
          tests: [{ input: "", expected: "Rank: A", description: "Rank correto" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("A")) errors.push("Rank deve ser A para nivel 15");
              if (!code.includes("?")) errors.push("Use operador ternário ?");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq1_3", title: "Conversão de Tipos", difficulty: "easy", xp: 15,
          description: "Crie uma variável <code>float resultado = 7.0 / 2</code> e imprima como inteiro e como decimal.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    // float resultado = 7.0 / 2\n    \n    // Imprima como int e como float\n    \n    return 0;\n}',
          hints: [{ level: "I", text: "7.0 / 2 = 3.5. Use %d para int e %f para float." },
                  { level: "II", text: 'int r1 = (int)resultado; printf("%d %f", r1, resultado);' },
                  { level: "III", text: 'float resultado = 7.0 / 2;\nprintf("Int: %d\\n", (int)resultado);\nprintf("Float: %f\\n", resultado);' }],
          tests: [{ input: "", expected: "Int: 3", description: "Conversão correta" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("3")) errors.push("Inteiro deve ser 3");
              if (!output.includes("3.5")) errors.push("Float deve ser 3.5");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq1_4", title: "Expressão Mista", difficulty: "medium", xp: 25,
          description: "Calcule: <code>a = 10</code>, <code>b = 3</code>. Imprima: soma, subtração, multiplicação, divisão inteira e módulo.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int b = 3;\n    \n    // Imprima: Soma, Sub, Mult, Div, Mod\n    \n    return 0;\n}',
          hints: [{ level: "I", text: "Use +, -, *, / e % para módulo." },
                  { level: "II", text: 'printf("Soma: %d\\n", a + b);\nprintf("Mod: %d\\n", a % b);' },
                  { level: "III", text: 'printf("Soma: %d\\n", a + b);\nprintf("Sub: %d\\n", a - b);\nprintf("Mult: %d\\n", a * b);\nprintf("Div: %d\\n", a / b);\nprintf("Mod: %d\\n", a % b);' }],
          tests: [{ input: "", expected: "Mod: 1", description: "Módulo correto" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("Soma: 13")) errors.push("Soma deve ser 13");
              if (!output.includes("Mod: 1")) errors.push("Módulo deve ser 1");
              if (!code.includes("%")) errors.push("Use operador % para módulo");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq1_5", title: "Mini Calculadora", difficulty: "medium", xp: 25,
          description: "Declare <code>x = 20, y = 6</code>. Calcule e imprima o resultado de: <code>(x + y) * 2 - x / y</code>.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int x = 20;\n    int y = 6;\n    \n    // Calcule: (x + y) * 2 - x / y\n    \n    return 0;\n}',
          hints: [{ level: "I", text: "Respeite a precedência: parênteses primeiro." },
                  { level: "II", text: "int r = (x + y) * 2 - x / y; printf(\"%d\", r);" },
                  { level: "III", text: "// (20+6)*2 = 52, 20/6 = 3, 52-3 = 49\nint r = (x + y) * 2 - x / y;\nprintf(\"Resultado: %d\\n\", r);" }],
          tests: [{ input: "", expected: "Resultado: 49", description: "Expressão correta" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("49")) errors.push("Resultado deve ser 49");
              return { pass: errors.length === 0, errors };
          }
        }
    ],

    // ─── CAP 02 — Controle de Fluxo ───
    2: [
        { id: "sq2_1", title: "Par ou Ímpar", difficulty: "easy", xp: 15,
          description: "Dado <code>n = 7</code>, use if/else para imprimir \"Par\" ou \"Ímpar\".",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int n = 7;\n    \n    // Verifique se n é par ou ímpar\n    \n    return 0;\n}',
          hints: [{ level: "I", text: "Use módulo: n % 2 == 0 significa par." },
                  { level: "II", text: 'if (n % 2 == 0) printf("Par"); else printf("Impar");' },
                  { level: "III", text: 'if (n % 2 == 0) {\n    printf("Par\\n");\n} else {\n    printf("Impar\\n");\n}' }],
          tests: [{ input: "", expected: "Impar", description: "7 é ímpar" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("Impar")) errors.push("Deve imprimir Impar");
              if (!code.includes("if")) errors.push("Use if/else");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq2_2", title: "Múltiplo de 3", difficulty: "easy", xp: 15,
          description: "Para cada número de 1 a 10, imprima se é múltiplo de 3.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        // Se i é múltiplo de 3, imprima i\n    }\n    return 0;\n}',
          hints: [{ level: "I", text: "Use i % 3 == 0 para verificar." },
                  { level: "II", text: 'if (i % 3 == 0) printf("%d ", i);' },
                  { level: "III", text: 'for (int i = 1; i <= 10; i++) {\n    if (i % 3 == 0) printf("%d ", i);\n}' }],
          tests: [{ input: "", expected: "3 6 9", description: "Múltiplos de 3" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("3") || !output.includes("6") || !output.includes("9"))
                  errors.push("Deve imprimir 3, 6 e 9");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq2_3", title: "Tabuada", difficulty: "easy", xp: 15,
          description: "Imprima a tabuada do 5: de 1 a 10.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int n = 5;\n    // Imprima: 5 x 1 = 5, 5 x 2 = 10, ...\n    return 0;\n}',
          hints: [{ level: "I", text: "Use for de 1 a 10 e multiplique." },
                  { level: "II", text: 'printf("%d x %d = %d\\n", n, i, n * i);' },
                  { level: "III", text: 'for (int i = 1; i <= 10; i++) {\n    printf("%d x %d = %d\\n", n, i, n * i);\n}' }],
          tests: [{ input: "", expected: "5 x 1 = 5", description: "Tabuada correta" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("5 x 10 = 50")) errors.push("Deve terminar com 5 x 10 = 50");
              if (!code.includes("for")) errors.push("Use um loop for");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq2_4", title: "FizzBuzz da Guilda", difficulty: "medium", xp: 25,
          description: "De 1 a 15: se múltiplo de 3 imprima \"GUILD\", se múltiplo de 5 imprima \"CODE\", se ambos \"GUILDCODE\", senão o número.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 15; i++) {\n        // FizzBuzz: GUILD (3), CODE (5), GUILDCODE (3 e 5)\n    }\n    return 0;\n}',
          hints: [{ level: "I", text: "Verifique i%3==0 e i%5==0, nessa ordem." },
                  { level: "II", text: 'if (i%3==0 && i%5==0) printf("GUILDCODE"); else if (i%3==0) printf("GUILD"); else if (i%5==0) printf("CODE"); else printf("%d", i);' },
                  { level: "III", text: 'if (i % 3 == 0 && i % 5 == 0) printf("GUILDCODE ");\nelse if (i % 3 == 0) printf("GUILD ");\nelse if (i % 5 == 0) printf("CODE ");\nelse printf("%d ", i);' }],
          tests: [{ input: "", expected: "GUILDCODE", description: "FizzBuzz correto" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("GUILDCODE")) errors.push("15 deve ser GUILDCODE");
              if (!output.includes("GUILD")) errors.push("Deve ter GUILD para múltiplos de 3");
              if (!output.includes("CODE")) errors.push("Deve ter CODE para múltiplos de 5");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq2_5", title: "Simulador de Nível", difficulty: "medium", xp: 25,
          description: "Simule 10 turnos. A cada turno, um número aleatório (use i*i % 7) determina dano. Imprima o dano de cada turno e o total.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int total = 0;\n    for (int i = 1; i <= 10; i++) {\n        int dano = (i * i) % 7;\n        // Imprima turno e some ao total\n    }\n    // Imprima total\n    return 0;\n}',
          hints: [{ level: "I", text: "Use printf para cada turno e some ao total." },
                  { level: "II", text: 'printf("Turno %d: %d\\n", i, dano); total += dano;' },
                  { level: "III", text: 'printf("Turno %d: %d\\n", i, dano);\ntotal += dano;\n// No final:\nprintf("Total: %d\\n", total);' }],
          tests: [{ input: "", expected: "Turno 1:", description: "Turnos impressos" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("Turno 1")) errors.push("Deve imprimir Turno 1");
              if (!output.includes("Total:")) errors.push("Deve imprimir total");
              if (!code.includes("for")) errors.push("Use um loop for");
              return { pass: errors.length === 0, errors };
          }
        }
    ],

    // ─── CAP 03 — Funções ───
    3: [
        { id: "sq3_1", title: "Função Absoluto", difficulty: "easy", xp: 15,
          description: "Crie <code>int absoluto(int n)</code> que retorne o valor absoluto (se negativo, retorna positivo).",
          starterCode: '#include <stdio.h>\n\n// Crie a funcao absoluto aqui\n\nint main() {\n    printf("%d\\n", absoluto(-10));\n    printf("%d\\n", absoluto(5));\n    return 0;\n}',
          hints: [{ level: "I", text: "Se n < 0, retorne -n. Senão, retorne n." },
                  { level: "II", text: "int absoluto(int n) { if (n < 0) return -n; return n; }" },
                  { level: "III", text: 'int absoluto(int n) {\n    if (n < 0) return -n;\n    return n;\n}' }],
          tests: [{ input: "", expected: "10\n5", description: "Absoluto correto" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("10")) errors.push("absoluto(-10) deve ser 10");
              if (!output.includes("5")) errors.push("absoluto(5) deve ser 5");
              if (!code.includes("int absoluto")) errors.push("Crie a função absoluto");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq3_2", title: "Função Maior", difficulty: "easy", xp: 15,
          description: "Crie <code>int maior(int a, int b)</code> que retorne o maior dos dois.",
          starterCode: '#include <stdio.h>\n\n// Crie a funcao maior aqui\n\nint main() {\n    printf("Maior: %d\\n", maior(10, 25));\n    printf("Maior: %d\\n", maior(30, 15));\n    return 0;\n}',
          hints: [{ level: "I", text: "Use um if para comparar." },
                  { level: "II", text: "int maior(int a, int b) { return (a > b) ? a : b; }" },
                  { level: "III", text: 'int maior(int a, int b) {\n    if (a > b) return a;\n    return b;\n}' }],
          tests: [{ input: "", expected: "Maior: 25", description: "Maior correto" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("25")) errors.push("maior(10,25) deve ser 25");
              if (!output.includes("30")) errors.push("maior(30,15) deve ser 30");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq3_3", title: "Função Potência", difficulty: "easy", xp: 15,
          description: "Crie <code>int potencia(int base, int exp)</code> que calcule base^exp.",
          starterCode: '#include <stdio.h>\n\n// Crie a funcao potencia aqui\n\nint main() {\n    printf("2^3 = %d\\n", potencia(2, 3));\n    printf("5^2 = %d\\n", potencia(5, 2));\n    return 0;\n}',
          hints: [{ level: "I", text: "Use um loop para multiplicar exp vezes." },
                  { level: "II", text: "int r = 1; for (int i = 0; i < exp; i++) r *= base; return r;" },
                  { level: "III", text: 'int potencia(int base, int exp) {\n    int r = 1;\n    for (int i = 0; i < exp; i++) r *= base;\n    return r;\n}' }],
          tests: [{ input: "", expected: "2^3 = 8", description: "Potência correta" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("8")) errors.push("2^3 deve ser 8");
              if (!output.includes("25")) errors.push("5^2 deve ser 25");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq3_4", title: "Função com Loop", difficulty: "medium", xp: 25,
          description: "Crie <code>void imprimirBarra(int n)</code> que imprima uma barra de progresso: <code>[XXXX.....]</code> com n X's e 10-n pontos.",
          starterCode: '#include <stdio.h>\n\n// Crie a funcao imprimirBarra aqui\n\nint main() {\n    imprimirBarra(3);\n    imprimirBarra(7);\n    imprimirBarra(10);\n    return 0;\n}',
          hints: [{ level: "I", text: "Imprima [ depois n X's depois 10-n pontos depois ]." },
                  { level: "II", text: 'printf("["); for (int i=0;i<n;i++) printf("X"); for (int i=n;i<10;i++) printf("."); printf("]\\n");' },
                  { level: "III", text: 'void imprimirBarra(int n) {\n    printf("[");\n    for (int i = 0; i < n; i++) printf("X");\n    for (int i = n; i < 10; i++) printf(".");\n    printf("]\\n");\n}' }],
          tests: [{ input: "", expected: "[XXX.......]", description: "Barra correta" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("[XXX.......]")) errors.push("Barra 3 deve ser [XXX.......]");
              if (!output.includes("[XXXXXXX...]")) errors.push("Barra 7 deve ser [XXXXXXX...]");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq3_5", title: "Combinar Funções", difficulty: "medium", xp: 25,
          description: "Crie <code>int calcularATK(int base, int nivel)</code> que retorne <code>base * nivel + nivel * 5</code>. Use ela para calcular o ataque de 3 aventureiros.",
          starterCode: '#include <stdio.h>\n\n// Crie calcularATK aqui\n\nint main() {\n    printf("Arion: %d\\n", calcularATK(10, 5));\n    printf("Lyra: %d\\n", calcularATK(15, 3));\n    printf("Kael: %d\\n", calcularATK(8, 8));\n    return 0;\n}',
          hints: [{ level: "I", text: "Retorne base * nivel + nivel * 5." },
                  { level: "II", text: "int calcularATK(int base, int nivel) { return base * nivel + nivel * 5; }" },
                  { level: "III", text: 'int calcularATK(int base, int nivel) {\n    return base * nivel + nivel * 5;\n}' }],
          tests: [{ input: "", expected: "Arion: 75", description: "ATK calculado" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("75")) errors.push("Arion ATK deve ser 75");
              if (!output.includes("60")) errors.push("Lyra ATK deve ser 60");
              if (!output.includes("104")) errors.push("Kael ATK deve ser 104");
              return { pass: errors.length === 0, errors };
          }
        }
    ],

    // ─── CAP 04 — Vetores ───
    4: [
        { id: "sq4_1", title: "Inverter Vetor", difficulty: "easy", xp: 15,
          description: "Dado <code>{1, 2, 3, 4, 5}</code>, imprima na ordem inversa: 5, 4, 3, 2, 1.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[5] = {1, 2, 3, 4, 5};\n    \n    // Imprima de tras pra frente\n    \n    return 0;\n}',
          hints: [{ level: "I", text: "Use um for decrescente de 4 até 0." },
                  { level: "II", text: 'for (int i = 4; i >= 0; i--) printf("%d ", vet[i]);' },
                  { level: "III", text: 'for (int i = 4; i >= 0; i--) {\n    printf("%d ", vet[i]);\n}' }],
          tests: [{ input: "", expected: "5 4 3 2 1", description: "Ordem inversa" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("5 4 3 2 1")) errors.push("Deve imprimir 5 4 3 2 1");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq4_2", title: "Maior e Menor", difficulty: "easy", xp: 15,
          description: "Encontre o maior e menor valor do vetor <code>{30, 10, 50, 5, 25}</code>.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[5] = {30, 10, 50, 5, 25};\n    \n    // Encontre maior e menor\n    \n    return 0;\n}',
          hints: [{ level: "I", text: "Assuma que vet[0] é o maior e menor, depois compare." },
                  { level: "II", text: "int maior = vet[0]; for ... if (vet[i] > maior) maior = vet[i];" },
                  { level: "III", text: 'int maior = vet[0], menor = vet[0];\nfor (int i = 1; i < 5; i++) {\n    if (vet[i] > maior) maior = vet[i];\n    if (vet[i] < menor) menor = vet[i];\n}\nprintf("Maior: %d Menor: %d\\n", maior, menor);' }],
          tests: [{ input: "", expected: "Maior: 50", description: "Maior encontrado" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("50")) errors.push("Maior deve ser 50");
              if (!output.includes("5")) errors.push("Menor deve ser 5");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq4_3", title: "Somar Pares", difficulty: "easy", xp: 15,
          description: "Some todos os números pares do vetor <code>{1, 2, 3, 4, 5, 6, 7, 8}</code>.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[8] = {1, 2, 3, 4, 5, 6, 7, 8};\n    int soma = 0;\n    \n    // Some os pares\n    \n    printf("Soma pares: %d\\n", soma);\n    return 0;\n}',
          hints: [{ level: "I", text: "Verifique se vet[i] % 2 == 0 antes de somar." },
                  { level: "II", text: 'if (vet[i] % 2 == 0) soma += vet[i];' },
                  { level: "III", text: 'for (int i = 0; i < 8; i++) {\n    if (vet[i] % 2 == 0) soma += vet[i];\n}' }],
          tests: [{ input: "", expected: "Soma pares: 20", description: "Soma dos pares" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("20")) errors.push("Soma deve ser 20 (2+4+6+8)");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq4_4", title: "Copiar e Duplicar", difficulty: "medium", xp: 25,
          description: "Dado <code>{10, 20, 30}</code>, crie um novo vetor com cada valor duplicado: <code>{20, 40, 60}</code>.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int orig[3] = {10, 20, 30};\n    int novo[3];\n    \n    // Duplique cada valor para novo\n    \n    for (int i = 0; i < 3; i++) printf("%d ", novo[i]);\n    return 0;\n}',
          hints: [{ level: "I", text: "novo[i] = orig[i] * 2;" },
                  { level: "II", text: 'for (int i = 0; i < 3; i++) novo[i] = orig[i] * 2;' },
                  { level: "III", text: 'for (int i = 0; i < 3; i++) {\n    novo[i] = orig[i] * 2;\n}' }],
          tests: [{ input: "", expected: "20 40 60", description: "Valores duplicados" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("20 40 60")) errors.push("Deve imprimir 20 40 60");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq4_5", title: "Filtrar Acima da Média", difficulty: "medium", xp: 25,
          description: "Dado <code>{10, 25, 30, 15, 20}</code>, calcule a média e imprima apenas os valores acima dela.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[5] = {10, 25, 30, 15, 20};\n    int soma = 0;\n    \n    // Calcule media, depois imprima acima da media\n    \n    return 0;\n}',
          hints: [{ level: "I", text: "Primeiro some tudo e divida por 5." },
                  { level: "II", text: "for soma += vet[i]; media = soma / 5; depois for se vet[i] > media imprima." },
                  { level: "III", text: 'for (int i = 0; i < 5; i++) soma += vet[i];\nint media = soma / 5;\nprintf("Media: %d\\n", media);\nfor (int i = 0; i < 5; i++) {\n    if (vet[i] > media) printf("%d ", vet[i]);\n}' }],
          tests: [{ input: "", expected: "Media: 20", description: "Média correta" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("20")) errors.push("Média deve ser 20");
              if (!output.includes("25") || !output.includes("30")) errors.push("Deve imprimir 25 e 30");
              return { pass: errors.length === 0, errors };
          }
        }
    ],

    // ─── CAP 05 — Recursividade ───
    5: [
        { id: "sq5_1", title: "Soma Recursiva", difficulty: "easy", xp: 15,
          description: "Crie <code>int soma(int n)</code> que retorne a soma de 1 até n recursivamente.",
          starterCode: '#include <stdio.h>\n\n// Crie soma recursiva\n\nint main() {\n    printf("Soma(5) = %d\\n", soma(5));\n    printf("Soma(10) = %d\\n", soma(10));\n    return 0;\n}',
          hints: [{ level: "I", text: "Caso base: se n == 0, retorne 0." },
                  { level: "II", text: "int soma(int n) { if (n == 0) return 0; return n + soma(n-1); }" },
                  { level: "III", text: 'int soma(int n) {\n    if (n == 0) return 0;\n    return n + soma(n - 1);\n}' }],
          tests: [{ input: "", expected: "Soma(5) = 15", description: "Soma recursiva" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("15")) errors.push("soma(5) deve ser 15");
              if (!output.includes("55")) errors.push("soma(10) deve ser 55");
              if (!code.includes("soma(") || !code.includes("soma(n")) errors.push("Use recursão");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq5_2", title: "Fibonacci", difficulty: "easy", xp: 15,
          description: "Crie <code>int fib(int n)</code> que retorne o n-ésimo número de Fibonacci.",
          starterCode: '#include <stdio.h>\n\n// Crie fibonacci recursivo\n\nint main() {\n    for (int i = 0; i < 8; i++) printf("%d ", fib(i));\n    return 0;\n}',
          hints: [{ level: "I", text: "fib(0)=0, fib(1)=1, fib(n)=fib(n-1)+fib(n-2)." },
                  { level: "II", text: "if (n <= 1) return n; return fib(n-1) + fib(n-2);" },
                  { level: "III", text: 'int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}' }],
          tests: [{ input: "", expected: "0 1 1 2 3 5 8 13", description: "Fibonacci correto" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("0 1 1 2 3 5 8 13")) errors.push("Sequência incorreta");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq5_3", title: "Potência Recursiva", difficulty: "easy", xp: 15,
          description: "Crie <code>int pot(int base, int exp)</code> recursiva para calcular base^exp.",
          starterCode: '#include <stdio.h>\n\n// Crie potencia recursiva\n\nint main() {\n    printf("2^10 = %d\\n", pot(2, 10));\n    printf("3^4 = %d\\n", pot(3, 4));\n    return 0;\n}',
          hints: [{ level: "I", text: "Caso base: se exp == 0, retorne 1." },
                  { level: "II", text: "return base * pot(base, exp - 1);" },
                  { level: "III", text: 'int pot(int base, int exp) {\n    if (exp == 0) return 1;\n    return base * pot(base, exp - 1);\n}' }],
          tests: [{ input: "", expected: "2^10 = 1024", description: "Potência recursiva" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("1024")) errors.push("2^10 deve ser 1024");
              if (!output.includes("81")) errors.push("3^4 deve ser 81");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq5_4", title: "Contar Digitos", difficulty: "medium", xp: 25,
          description: "Crie <code>int contarDigitos(int n)</code> que retorne quantos dígitos tem n (ex: 123 → 3).",
          starterCode: '#include <stdio.h>\n\n// Crie contarDigitos recursiva\n\nint main() {\n    printf("Digitos de 123: %d\\n", contarDigitos(123));\n    printf("Digitos de 7: %d\\n", contarDigitos(7));\n    printf("Digitos de 12345: %d\\n", contarDigitos(12345));\n    return 0;\n}',
          hints: [{ level: "I", text: "Se n < 10, tem 1 dígito. Senão, 1 + contarDigitos(n/10)." },
                  { level: "II", text: "if (n < 10) return 1; return 1 + contarDigitos(n / 10);" },
                  { level: "III", text: 'int contarDigitos(int n) {\n    if (n < 10) return 1;\n    return 1 + contarDigitos(n / 10);\n}' }],
          tests: [{ input: "", expected: "Digitos de 123: 3", description: "Contagem correta" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("3")) errors.push("123 deve ter 3 dígitos");
              if (!output.includes("1")) errors.push("7 deve ter 1 dígito");
              if (!output.includes("5")) errors.push("12345 deve ter 5 dígitos");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq5_5", title: "Torre de Hanói", difficulty: "medium", xp: 25,
          description: "Crie <code>void hanoi(int n, char origem, char destino, char aux)</code> que imprima os movimentos para resolver a Torre de Hanói com 3 discos.",
          starterCode: '#include <stdio.h>\n\n// Crie hanoi recursiva\n\nint main() {\n    hanoi(3, \'A\', \'C\', \'B\');\n    return 0;\n}',
          hints: [{ level: "I", text: "Mova n-1 do origem para aux, mova disco n, mova n-1 de aux para destino." },
                  { level: "II", text: "hanoi(n-1, origem, aux, destino); printf(...); hanoi(n-1, aux, destino, origem);" },
                  { level: "III", text: 'void hanoi(int n, char o, char d, char a) {\n    if (n == 1) {\n        printf("Mover disco 1 de %c para %c\\n", o, d);\n        return;\n    }\n    hanoi(n-1, o, a, d);\n    printf("Mover disco %d de %c para %c\\n", n, o, d);\n    hanoi(n-1, a, d, o);\n}' }],
          tests: [{ input: "", expected: "Mover disco 1 de A para C", description: "Hanói correto" }],
          validator: function(code, output) {
              let errors = [];
              let lines = output.split("\n").filter(l => l.includes("Mover"));
              if (lines.length < 7) errors.push("Deve ter 7 movimentos para 3 discos");
              if (!output.includes("Mover disco 3")) errors.push("Deve mover disco 3");
              return { pass: errors.length === 0, errors };
          }
        }
    ],

    // ─── CAP 06 — Busca em Vetor ───
    6: [
        { id: "sq6_1", title: "Contar Ocorrências", difficulty: "easy", xp: 15,
          description: " Conte quantas vezes o valor <code>3</code> aparece em <code>{3, 7, 3, 2, 3, 8, 3}</code>.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[7] = {3, 7, 3, 2, 3, 8, 3};\n    int cont = 0;\n    // Conte as ocorrencias de 3\n    printf("Ocorrencias: %d\\n", cont);\n    return 0;\n}',
          hints: [{ level: "I", text: "Se vet[i] == 3, incremente cont." },
                  { level: "II", text: 'for (int i = 0; i < 7; i++) if (vet[i] == 3) cont++;' },
                  { level: "III", text: 'for (int i = 0; i < 7; i++) {\n    if (vet[i] == 3) cont++;\n}' }],
          tests: [{ input: "", expected: "Ocorrencias: 4", description: "4 ocorrências" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("4")) errors.push("Deve encontrar 4 ocorrências");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq6_2", title: "Buscar e Contar", difficulty: "easy", xp: 15,
          description: "Dado um vetor e um valor alvo, retorne a quantidade e as posições.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[6] = {5, 10, 5, 20, 5, 30};\n    int alvo = 5;\n    int cont = 0;\n    // Busque alvo e imprima posicoes\n    printf("Encontrado %d vezes\\n", cont);\n    return 0;\n}',
          hints: [{ level: "I", text: "Use for + if para comparar cada elemento." },
                  { level: "II", text: 'if (vet[i] == alvo) { printf("pos %d ", i); cont++; }' },
                  { level: "III", text: 'for (int i = 0; i < 6; i++) {\n    if (vet[i] == alvo) { printf("pos %d ", i); cont++; }\n}' }],
          tests: [{ input: "", expected: "Encontrado 3 vezes", description: "3 ocorrências de 5" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("3")) errors.push("Deve encontrar 3 vezes");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq6_3", title: "Elemento Mais Frequente", difficulty: "easy", xp: 15,
          description: "Encontre o elemento mais frequente em <code>{1, 3, 2, 3, 1, 3, 2, 3}</code>.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[8] = {1, 3, 2, 3, 1, 3, 2, 3};\n    // Encontre o mais frequente\n    return 0;\n}',
          hints: [{ level: "I", text: "Para cada elemento, conte quantas vezes aparece." },
                  { level: "II", text: "Use dois loops: o externo pega cada elemento, o interno conta." },
                  { level: "III", text: 'int maisFreq = vet[0], maxCont = 0;\nfor (int i = 0; i < 8; i++) {\n    int cont = 0;\n    for (int j = 0; j < 8; j++) if (vet[j] == vet[i]) cont++;\n    if (cont > maxCont) { maxCont = cont; maisFreq = vet[i]; }\n}\nprintf("Mais frequente: %d (%d vezes)\\n", maisFreq, maxCont);' }],
          tests: [{ input: "", expected: "Mais frequente: 3", description: "3 é o mais frequente" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("3")) errors.push("Mais frequente deve ser 3");
              if (!output.includes("4")) errors.push("Deve aparecer 4 vezes");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq6_4", title: "Remover Duplicatas", difficulty: "medium", xp: 25,
          description: "Dado <code>{1, 2, 2, 3, 3, 3, 4}</code>, imprima apenas os valores únicos: <code>1 2 3 4</code>.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[7] = {1, 2, 2, 3, 3, 3, 4};\n    // Imprima apenas valores unicos\n    return 0;\n}',
          hints: [{ level: "I", text: "Para cada elemento, verifique se já apareceu antes." },
                  { level: "II", text: "Para cada vet[i], verifique se vet[j] == vet[i] para j < i. Se não encontrou, imprima." },
                  { level: "III", text: 'for (int i = 0; i < 7; i++) {\n    int duplicata = 0;\n    for (int j = 0; j < i; j++) {\n        if (vet[j] == vet[i]) duplicata = 1;\n    }\n    if (!duplicata) printf("%d ", vet[i]);\n}' }],
          tests: [{ input: "", expected: "1 2 3 4", description: "Únicos impressos" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("1 2 3 4")) errors.push("Deve imprimir 1 2 3 4");
              return { pass: errors.length === 0, errors };
          }
        },
        { id: "sq6_5", title: "Busca em Matriz", difficulty: "medium", xp: 25,
          description: "Dada uma matriz 3x3, encontre todas as posições (linha, coluna) do valor <code>7</code>.",
          starterCode: '#include <stdio.h>\n\nint main() {\n    int m[3][3] = {{7, 1, 7}, {2, 7, 3}, {4, 5, 7}};\n    // Encontre todas as posicoes do valor 7\n    return 0;\n}',
          hints: [{ level: "I", text: "Use for aninhado para percorrer a matriz." },
                  { level: "II", text: 'if (m[i][j] == 7) printf("pos (%d,%d)\\n", i, j);' },
                  { level: "III", text: 'for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (m[i][j] == 7) printf("pos (%d,%d)\\n", i, j);\n    }\n}' }],
          tests: [{ input: "", expected: "pos (0,0)", description: "Posição encontrada" }],
          validator: function(code, output) {
              let errors = [];
              if (!output.includes("pos (0,0)")) errors.push("Deve encontrar (0,0)");
              if (!output.includes("pos (0,2)")) errors.push("Deve encontrar (0,2)");
              if (!output.includes("pos (1,1)")) errors.push("Deve encontrar (1,1)");
              if (!output.includes("pos (2,2)")) errors.push("Deve encontrar (2,2)");
              return { pass: errors.length === 0, errors };
          }
        }
    ],

    // ─── CAPS 07-15 — Placeholder (identical pattern, activities follow same structure)
    7: [], 8: [], 9: [], 10: [], 11: [], 12: [], 13: [], 14: [], 15: []
};

// Generate side quests for chapters 7-15 programmatically
function generateSideQuests() {
    const templates = {
        7: [
            { id: "sq7_1", title: "Inserir no Início", difficulty: "easy", xp: 15, description: "Insira o valor 5 no início de {10, 20, 30}, deslocando todos.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[4] = {10, 20, 30};\n    int tam = 3;\n    // Insira 5 no início\n    for (int i = 0; i < tam; i++) printf("%d ", vet[i]);\n    return 0;\n}', hints: [{level:"I",text:"Desloque todos para a direita e coloque 5 na pos 0."},{level:"II",text:"for (int i=tam;i>0;i--) vet[i]=vet[i-1]; vet[0]=5; tam++;"},{level:"III",text:"for (int i = tam; i > 0; i--) vet[i] = vet[i-1];\nvet[0] = 5;\ntam++;"}], tests: [{input:"",expected:"5 10 20 30",description:"Inserção correta"}], validator: function(code,output){let e=[];if(!output.includes("5 10 20 30"))e.push("Deve ser 5 10 20 30");return{pass:e.length===0,errors:e};}},
            { id: "sq7_2", title: "Inserir Ordenado", difficulty: "easy", xp: 15, description: "Insira 25 em {10, 20, 30, 40} mantendo ordenação.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[5] = {10, 20, 30, 40};\n    int tam = 4;\n    // Insira 25 na posicao correta\n    for (int i = 0; i < tam; i++) printf("%d ", vet[i]);\n    return 0;\n}', hints: [{level:"I",text:"Encontre a posicao: 25 esta entre 20 e 30, logo pos=2."},{level:"II",text:"for(i=tam;i>2;i--) vet[i]=vet[i-1]; vet[2]=25; tam++;"},{level:"III",text:"for (int i = tam; i > 2; i--) vet[i] = vet[i-1];\nvet[2] = 25;\ntam++;"}], tests: [{input:"",expected:"10 20 25 30 40",description:"Inserção ordenada"}], validator: function(code,output){let e=[];if(!output.includes("10 20 25 30 40"))e.push("Deve ser 10 20 25 30 40");return{pass:e.length===0,errors:e};}},
            { id: "sq7_3", title: "Remover por Valor", difficulty: "easy", xp: 15, description: "Remova todas as ocorrências de 3 de {1, 3, 2, 3, 4}.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[5] = {1, 3, 2, 3, 4};\n    int tam = 5;\n    // Remova todos os 3\n    for (int i = 0; i < tam; i++) printf("%d ", vet[i]);\n    return 0;\n}', hints: [{level:"I",text:"Use dois loops: um para encontrar, outro para deslocar."},{level:"II",text:"Use flag encontrou e desloque para esquerda."},{level:"III",text:"int j = 0;\nfor (int i = 0; i < tam; i++) {\n    if (vet[i] != 3) vet[j++] = vet[i];\n}\ntam = j;"}], tests: [{input:"",expected:"1 2 4",description:"3 removido"}], validator: function(code,output){let e=[];if(output.includes("3"))e.push("3 nao deve aparecer");if(!output.includes("1 2 4"))e.push("Deve ser 1 2 4");return{pass:e.length===0,errors:e};}},
            { id: "sq7_4", title: "Mesclar Vetores", difficulty: "medium", xp: 25, description: "Dado {1, 3, 5} e {2, 4, 6}, crie um vetor mesclado ordenado {1, 2, 3, 4, 5, 6}.", starterCode: '#include <stdio.h>\n\nint main() {\n    int a[3] = {1, 3, 5};\n    int b[3] = {2, 4, 6};\n    int c[6];\n    // Mescle a e b em c (ordenado)\n    for (int i = 0; i < 6; i++) printf("%d ", c[i]);\n    return 0;\n}', hints: [{level:"I",text:"Use 3 indices: i para a, j para b, k para c."},{level:"II",text:"Compare a[i] e b[j], coloque o menor em c[k]."},{level:"III",text:"int i=0, j=0, k=0;\nwhile(i<3 && j<3) {\n    if(a[i]<b[j]) c[k++]=a[i++];\n    else c[k++]=b[j++];\n}\nwhile(i<3) c[k++]=a[i++];\nwhile(j<3) c[k++]=b[j++];"}], tests: [{input:"",expected:"1 2 3 4 5 6",description:"Mesclagem ordenada"}], validator: function(code,output){let e=[];if(!output.includes("1 2 3 4 5 6"))e.push("Deve ser 1 2 3 4 5 6");return{pass:e.length===0,errors:e};}},
            { id: "sq7_5", title: "Rotação à Direita", difficulty: "medium", xp: 25, description: "Rotacione {1, 2, 3, 4, 5} uma posição à direita: {5, 1, 2, 3, 4}.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[5] = {1, 2, 3, 4, 5};\n    int n = 5;\n    // Rotacione 1 posicao a direita\n    for (int i = 0; i < n; i++) printf("%d ", vet[i]);\n    return 0;\n}', hints: [{level:"I",text:"Salve o ultimo, desloque todos para a direita, coloque o ultimo na pos 0."},{level:"II",text:"int last = vet[n-1]; for(i=n-1;i>0;i--) vet[i]=vet[i-1]; vet[0]=last;"},{level:"III",text:"int last = vet[n-1];\nfor (int i = n-1; i > 0; i--) vet[i] = vet[i-1];\nvet[0] = last;"}], tests: [{input:"",expected:"5 1 2 3 4",description:"Rotação correta"}], validator: function(code,output){let e=[];if(!output.includes("5 1 2 3 4"))e.push("Deve ser 5 1 2 3 4");return{pass:e.length===0,errors:e};}}
        ],
        8: [
            { id: "sq8_1", title: "Meio do Vetor", difficulty: "easy", xp: 15, description: "Encontre o elemento do meio de um vetor ordenado ímpar.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[5] = {10, 20, 30, 40, 50};\n    int meio = 2; // calcule\n    printf("Meio: %d\\n", vet[meio]);\n    return 0;\n}', hints: [{level:"I",text:"meio = (inicio + fim) / 2."},{level:"II",text:"int meio = (0 + 4) / 2;"},{level:"III",text:"int meio = (0 + 4) / 2;\nprintf(\"Meio: %d\\n\", vet[meio]);"}], tests: [{input:"",expected:"Meio: 30",description:"Elemento do meio"}], validator: function(code,output){let e=[];if(!output.includes("30"))e.push("Meio deve ser 30");return{pass:e.length===0,errors:e};}},
            { id: "sq8_2", title: "Busca Binária Passo a Passo", difficulty: "easy", xp: 15, description: "Imprima cada passo da busca binária por 60 em {10,20,30,40,50,60,70}.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[7] = {10,20,30,40,50,60,70};\n    int alvo = 60;\n    int ini = 0, fim = 6;\n    // Imprima cada passo\n    return 0;\n}', hints: [{level:"I",text:"Dentro do while, imprima meio e o valor."},{level:"II",text:"printf(\"Meio: %d (valor %d)\\n\", meio, vet[meio]);"},{level:"III",text:"while (ini <= fim) {\n    int meio = (ini + fim) / 2;\n    printf(\"Verificando pos %d (valor %d)\\n\", meio, vet[meio]);\n    if (vet[meio] == alvo) { printf(\"Encontrado!\\n\"); break; }\n    else if (vet[meio] < alvo) ini = meio + 1;\n    else fim = meio - 1;\n}"}], tests: [{input:"",expected:"Encontrado!",description:"Encontrou"}], validator: function(code,output){let e=[];if(!output.includes("Encontrado"))e.push("Deve encontrar");return{pass:e.length===0,errors:e};}},
            { id: "sq8_3", title: "Contar Comparações", difficulty: "easy", xp: 15, description: "Implemente busca binária contando quantas comparações foram feitas.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[7] = {10,20,30,40,50,60,70};\n    int alvo = 40;\n    int ini = 0, fim = 6, comps = 0;\n    // Busca binaria contando comparacoes\n    printf("Comparacoes: %d\\n", comps);\n    return 0;\n}', hints: [{level:"I",text:"Incremente comps a cada comparação."},{level:"II",text:"comps++; antes de cada if."},{level:"III",text:"while (ini <= fim) {\n    int meio = (ini + fim) / 2;\n    comps++;\n    if (vet[meio] == alvo) break;\n    else if (vet[meio] < alvo) ini = meio + 1;\n    else fim = meio - 1;\n}"}], tests: [{input:"",expected:"Comparacoes: 1",description:"1 comparação"}], validator: function(code,output){let e=[];if(!output.includes("Comparacoes:"))e.push("Deve imprimir comparações");return{pass:e.length===0,errors:e};}},
            { id: "sq8_4", title: "Remover por Busca Binária", difficulty: "medium", xp: 25, description: "Encontre 30 por busca binária e remova, deslocando.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[7] = {10,20,30,40,50,60,70};\n    int tam = 7;\n    // Busque 30 e remova\n    for (int i = 0; i < tam; i++) printf("%d ", vet[i]);\n    return 0;\n}', hints: [{level:"I",text:"Primeiro encontre a pos com busca binária, depois desloque."},{level:"II",text:"for (int i=pos;i<tam-1;i++) vet[i]=vet[i+1]; tam--;"},{level:"III",text:"int ini = 0, fim = tam - 1, pos = -1;\nwhile (ini <= fim) {\n    int meio = (ini + fim) / 2;\n    if (vet[meio] == 30) { pos = meio; break; }\n    else if (vet[meio] < 30) ini = meio + 1;\n    else fim = meio - 1;\n}\nif (pos != -1) {\n    for (int i = pos; i < tam - 1; i++) vet[i] = vet[i+1];\n    tam--;\n}"}], tests: [{input:"",expected:"10 20 40 50 60 70",description:"30 removido"}], validator: function(code,output){let e=[];if(output.includes("30"))e.push("30 nao deve aparecer");if(!output.includes("40"))e.push("40 deve aparecer");return{pass:e.length===0,errors:e};}},
            { id: "sq8_5", title: "Inserir por Busca Binária", difficulty: "medium", xp: 25, description: "Encontre a posição correta para 35 e insira mantendo ordenação.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[6] = {10,20,30,40,50,60};\n    int tam = 6;\n    int valor = 35;\n    // Encontre posicao e insira\n    for (int i = 0; i < tam; i++) printf("%d ", vet[i]);\n    return 0;\n}', hints: [{level:"I",text:"Use busca binária para encontrar a posicao (35 entre 30 e 40, logo pos=3)."},{level:"II",text:"for(i=tam;i>pos;i--) vet[i]=vet[i-1]; vet[pos]=35; tam++;"},{level:"III",text:"int pos = 3;\nfor (int i = tam; i > pos; i--) vet[i] = vet[i-1];\nvet[pos] = valor;\ntam++;"}], tests: [{input:"",expected:"10 20 30 35 40 50 60",description:"Inserção correta"}], validator: function(code,output){let e=[];if(!output.includes("10 20 30 35 40 50 60"))e.push("Deve ser 10 20 30 35 40 50 60");return{pass:e.length===0,errors:e};}}
        ],
        9: [
            { id: "sq9_1", title: "Soma da Matriz", difficulty: "easy", xp: 15, description: "Some todos os elementos de uma matriz 3x3.", starterCode: '#include <stdio.h>\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int soma = 0;\n    // Some todos os elementos\n    printf("Soma: %d\\n", soma);\n    return 0;\n}', hints: [{level:"I",text:"Use for aninhado e some m[i][j]."},{level:"II",text:"for i for j soma += m[i][j];"},{level:"III",text:"for (int i=0;i<3;i++) for(int j=0;j<3;j++) soma+=m[i][j];"}], tests: [{input:"",expected:"Soma: 45",description:"Soma correta"}], validator: function(code,output){let e=[];if(!output.includes("45"))e.push("Soma deve ser 45");return{pass:e.length===0,errors:e};}},
            { id: "sq9_2", title: "Diagonal Principal", difficulty: "easy", xp: 15, description: "Imprima os elementos da diagonal principal (onde i==j).", starterCode: '#include <stdio.h>\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    // Imprima diagonal principal\n    return 0;\n}', hints: [{level:"I",text:"A diagonal tem i == j."},{level:"II",text:"if (i == j) printf(\"%d \", m[i][j]);"},{level:"III",text:"for (int i=0;i<3;i++) printf(\"%d \", m[i][i]);"}], tests: [{input:"",expected:"1 5 9",description:"Diagonal correta"}], validator: function(code,output){let e=[];if(!output.includes("1 5 9"))e.push("Diagonal deve ser 1 5 9");return{pass:e.length===0,errors:e};}},
            { id: "sq9_3", title: "Contar Acima da Média", difficulty: "easy", xp: 15, description: "Na matriz 3x3, conte quantos elementos são maiores que 5.", starterCode: '#include <stdio.h>\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int cont = 0;\n    // Conte maiores que 5\n    printf("Acima de 5: %d\\n", cont);\n    return 0;\n}', hints: [{level:"I",text:"Use for aninhado + if (m[i][j] > 5) cont++;"},{level:"II",text:"for i for j if (m[i][j]>5) cont++;"},{level:"III",text:"for (int i=0;i<3;i++) for(int j=0;j<3;j++) if(m[i][j]>5) cont++;"}], tests: [{input:"",expected:"Acima de 5: 4",description:"4 elementos"}], validator: function(code,output){let e=[];if(!output.includes("4"))e.push("Deve ser 4");return{pass:e.length===0,errors:e};}},
            { id: "sq9_4", title: "Soma das Linhas", difficulty: "medium", xp: 25, description: "Imprima a soma de cada linha de uma matriz 3x3.", starterCode: '#include <stdio.h>\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    // Imprima soma de cada linha\n    return 0;\n}', hints: [{level:"I",text:"Para cada linha i, some m[i][j] para j de 0 a 2."},{level:"II",text:"for i { soma=0; for j soma+=m[i][j]; printf(\"Linha %d: %d\\n\", i, soma); }"},{level:"III",text:"for (int i=0;i<3;i++) {\n    int soma = 0;\n    for (int j=0;j<3;j++) soma+=m[i][j];\n    printf(\"Linha %d: %d\\n\", i, soma);\n}"}], tests: [{input:"",expected:"Linha 0: 6",description:"Soma linha 0"}], validator: function(code,output){let e=[];if(!output.includes("6"))e.push("Linha 0 deve ser 6");if(!output.includes("15"))e.push("Linha 1 deve ser 15");if(!output.includes("24"))e.push("Linha 2 deve ser 24");return{pass:e.length===0,errors:e};}},
            { id: "sq9_5", title: "Transpor e Somar", difficulty: "medium", xp: 25, description: "Crie a transposta da matriz e some com a original, imprimindo o resultado.", starterCode: '#include <stdio.h>\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int r[3][3];\n    // r[i][j] = m[i][j] + m[j][i]\n    for (int i=0;i<3;i++) {\n        for (int j=0;j<3;j++) printf("%d ", r[i][j]);\n        printf("\\n");\n    }\n    return 0;\n}', hints: [{level:"I",text:"r[i][j] = m[i][j] + m[j][i];"},{level:"II",text:"for i for j r[i][j] = m[i][j] + m[j][i];"},{level:"III",text:"for (int i=0;i<3;i++)\n    for (int j=0;j<3;j++)\n        r[i][j] = m[i][j] + m[j][i];"}], tests: [{input:"",expected:"2 6 10",description:"Primeira linha correta"}], validator: function(code,output){let e=[];if(!output.includes("2 6 10"))e.push("Linha 0 deve ser 2 6 10");return{pass:e.length===0,errors:e};}}
        ],
        10: [
            { id: "sq10_1", title: "Comprimento da String", difficulty: "easy", xp: 15, description: "Imprima o comprimento de cada nome sem usar strlen.", starterCode: '#include <stdio.h>\n\nint main() {\n    char nome[20] = "Guilda";\n    // Calcule o comprimento\n    printf("Tam: %d\\n", 0);\n    return 0;\n}', hints: [{level:"I",text:"Use um while que percorre até \\0."},{level:"II",text:"int i=0; while(nome[i]!=\'\\0\') i++; printf(\"Tam: %d\", i);"},{level:"III",text:"int i = 0;\nwhile (nome[i] != '\\0') i++;\nprintf(\"Tam: %d\\n\", i);"}], tests: [{input:"",expected:"Tam: 6",description:"Comprimento correto"}], validator: function(code,output){let e=[];if(!output.includes("6"))e.push("Deve ser 6");return{pass:e.length===0,errors:e};}},
            { id: "sq10_2", title: "Inverter String", difficulty: "easy", xp: 15, description: "Inverta a string \"GUILD\" e imprima o resultado.", starterCode: '#include <stdio.h>\n\nint main() {\n    char s[20] = "GUILD";\n    // Inverta e imprima\n    return 0;\n}', hints: [{level:"I",text:"Encontre o tamanho, depois imprima de trás pra frente."},{level:"II",text:"for (int i=tam-1;i>=0;i--) printf(\"%c\", s[i]);"},{level:"III",text:"int tam = 0; while(s[tam]) tam++;\nfor (int i=tam-1;i>=0;i--) printf(\"%c\", s[i]);\nprintf(\"\\n\");"}], tests: [{input:"",expected:"DLIUG",description:"Invertida"}], validator: function(code,output){let e=[];if(!output.includes("DLIUG"))e.push("Deve ser DLIUG");return{pass:e.length===0,errors:e};}},
            { id: "sq10_3", title: "Contar Vogais", difficulty: "easy", xp: 15, description: "Conte as vogais em \"Programacao\".", starterCode: '#include <stdio.h>\n\nint main() {\n    char s[30] = "Programacao";\n    int cont = 0;\n    // Conte vogais\n    printf("Vogais: %d\\n", cont);\n    return 0;\n}', hints: [{level:"I",text:"Verifique se cada caractere é a,e,i,o,u (maiúscula ou minúscula)."},{level:"II",text:"char c = s[i]; if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u') cont++;"},{level:"III",text:"for (int i=0;s[i];i++) {\n    char c = s[i];\n    if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u') cont++;\n}"}], tests: [{input:"",expected:"Vogais: 5",description:"5 vogais"}], validator: function(code,output){let e=[];if(!output.includes("5"))e.push("Deve ser 5");return{pass:e.length===0,errors:e};}},
            { id: "sq10_4", title: "Palíndromo", difficulty: "medium", xp: 25, description: "Verifique se \"ovo\" é palíndromo (lê-se igual de trás pra frente).", starterCode: '#include <stdio.h>\n\nint main() {\n    char s[20] = "ovo";\n    // Verifique se eh palindromo\n    return 0;\n}', hints: [{level:"I",text:"Compare o primeiro com o último, o segundo com o penúltimo, etc."},{level:"II",text:"for (i=0;i<tam/2;i++) if(s[i]!=s[tam-1-i]) palindromo=0;"},{level:"III",text:"int pal = 1, tam = 0;\nwhile(s[tam]) tam++;\nfor (int i=0;i<tam/2;i++)\n    if(s[i]!=s[tam-1-i]) pal=0;\nprintf(\"%s %s\\n\", s, pal ? \"Sim\" : \"Nao\");"}], tests: [{input:"",expected:"Sim",description:"É palíndromo"}], validator: function(code,output){let e=[];if(!output.includes("Sim"))e.push("Deve ser Sim");return{pass:e.length===0,errors:e};}},
            { id: "sq10_5", title: "Concatenar Nomes", difficulty: "medium", xp: 25, description: "Dados primeiro=\"Arkan\" e ultimo=\"Velor\", crie o nome completo e imprima.", starterCode: '#include <stdio.h>\n\nint main() {\n    char primeiro[20] = "Arkan";\n    char ultimo[20] = "Velor";\n    char completo[50];\n    // Concatene: "Arkan Velor"\n    printf("%s\\n", completo);\n    return 0;\n}', hints: [{level:"I",text:"Copie o primeiro, adicione espaço, adicione o字符."},{level:"II",text:"int i=0; while(primeiro[i]) completo[k++]=primeiro[i++]; completo[k++]=' '; ..."},{level:"III",text:"int k=0, i=0;\nwhile(primeiro[i]) completo[k++]=primeiro[i++];\ncompleto[k++]=' ';\ni=0;\nwhile(ultimo[i]) completo[k++]=ultimo[i++];\ncompleto[k]='\\0';"}], tests: [{input:"",expected:"Arkan Velor",description:"Nome completo"}], validator: function(code,output){let e=[];if(!output.includes("Arkan Velor"))e.push("Deve ser Arkan Velor");return{pass:e.length===0,errors:e};}}
        ],
        11: [
            { id: "sq11_1", title: "Valor e Endereço", difficulty: "easy", xp: 15, description: "Declare int x=42 e mostre o valor e o endereço via ponteiro.", starterCode: '#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *p = &x;\n    printf("Valor: %d\\n", *p);\n    printf("Endereco via ponteiro: %d\\n", (int)p);\n    return 0;\n}', hints: [{level:"I",text:"Use *p para valor e (int)p para endereço (simulado)."},{level:"II",text:"int *p = &x; *p é o valor."},{level:"III",text:"int *p = &x;\nprintf(\"Valor: %d\\n\", *p);"}], tests: [{input:"",expected:"Valor: 42",description:"Valor correto"}], validator: function(code,output){let e=[];if(!output.includes("42"))e.push("Deve mostrar 42");return{pass:e.length===0,errors:e};}},
            { id: "sq11_2", title: "Modificar via Ponteiro", difficulty: "easy", xp: 15, description: "Use um ponteiro para alterar o valor de 10 para 99.", starterCode: '#include <stdio.h>\n\nint main() {\n    int x = 10;\n    int *p = &x;\n    // Altere x para 99 via ponteiro\n    printf("x = %d\\n", x);\n    return 0;\n}', hints: [{level:"I",text:"*p = 99;"},{level:"II",text:"*p = 99;"},{level:"III",text:"*p = 99;"}], tests: [{input:"",expected:"x = 99",description:"Valor alterado"}], validator: function(code,output){let e=[];if(!output.includes("99"))e.push("Deve ser 99");return{pass:e.length===0,errors:e};}},
            { id: "sq11_3", title: "Aritmética de Ponteiros", difficulty: "easy", xp: 15, description: "Dado um vetor, use ponteiro para acessar elementos.", starterCode: '#include <stdio.h>\n\nint main() {\n    int vet[3] = {10, 20, 30};\n    int *p = vet;\n    // Acesse vet[0], vet[1], vet[2] via p\n    return 0;\n}', hints: [{level:"I",text:"p aponta para vet[0]. *(p+1) é vet[1], *(p+2) é vet[2]."},{level:"II",text:"printf(\"%d %d %d\", *p, *(p+1), *(p+2));"},{level:"III",text:"printf(\"%d %d %d\\n\", *p, *(p+1), *(p+2));"}], tests: [{input:"",expected:"10 20 30",description:"Elementos acessados"}], validator: function(code,output){let e=[];if(!output.includes("10 20 30"))e.push("Deve ser 10 20 30");return{pass:e.length===0,errors:e};}},
            { id: "sq11_4", title: "Função com Ponteiros", difficulty: "medium", xp: 25, description: "Crie void incrementar(int *p) que some 10 ao valor apontado.", starterCode: '#include <stdio.h>\n\n// Crie incrementar aqui\n\nint main() {\n    int x = 5;\n    incrementar(&x);\n    printf("x = %d\\n", x);\n    return 0;\n}', hints: [{level:"I",text:"*p = *p + 10;"},{level:"II",text:"void incrementar(int *p) { *p += 10; }"},{level:"III",text:"void incrementar(int *p) {\n    *p += 10;\n}"}], tests: [{input:"",expected:"x = 15",description:"Incrementado"}], validator: function(code,output){let e=[];if(!output.includes("15"))e.push("Deve ser 15");return{pass:e.length===0,errors:e};}},
            { id: "sq11_5", title: "Maior via Ponteiro", difficulty: "medium", xp: 25, description: "Crie int* maiorPtr(int *a, int *b) que retorne ponteiro para o maior.", starterCode: '#include <stdio.h>\n\n// Crie maiorPtr aqui\n\nint main() {\n    int a = 10, b = 25;\n    int *r = maiorPtr(&a, &b);\n    printf("Maior: %d\\n", *r);\n    return 0;\n}', hints: [{level:"I",text:"Se *a > *b retorne a, senão retorne b."},{level:"II",text:"int* maiorPtr(int *a, int *b) { return (*a > *b) ? a : b; }"},{level:"III",text:"int* maiorPtr(int *a, int *b) {\n    if (*a > *b) return a;\n    return b;\n}"}], tests: [{input:"",expected:"Maior: 25",description:"Maior encontrado"}], validator: function(code,output){let e=[];if(!output.includes("25"))e.push("Deve ser 25");return{pass:e.length===0,errors:e};}}
        ],
        12: [
            { id: "sq12_1", title: "Struct Simples", difficulty: "easy", xp: 15, description: "Crie uma struct com nome, nivel e vida. Imprima a ficha.", starterCode: '#include <stdio.h>\n\nstruct Personagem {\n    char nome[20];\n    int nivel;\n    int vida;\n};\n\nint main() {\n    struct Personagem p;\n    // Preencha e imprima\n    return 0;\n}', hints: [{level:"I",text:"strcpy(p.nome, \"Arion\"); p.nivel = 10; p.vida = 100;"},{level:"II",text:"printf(\"%s Niv:%d Vida:%d\", p.nome, p.nivel, p.vida);"},{level:"III",text:"strcpy(p.nome, \"Arion\");\np.nivel = 10;\np.vida = 100;\nprintf(\"%s Niv:%d Vida:%d\\n\", p.nome, p.nivel, p.vida);"}], tests: [{input:"",expected:"Arion",description:"Ficha impressa"}], validator: function(code,output){let e=[];if(!output.includes("Arion"))e.push("Nome deve ser Arion");if(!code.includes("struct"))e.push("Use struct");return{pass:e.length===0,errors:e};}},
            { id: "sq12_2", title: "Struct com Comparação", difficulty: "easy", xp: 15, description: "Compare o nível de dois personagens e imprima quem é mais forte.", starterCode: '#include <stdio.h>\n\nstruct Personagem { char nome[20]; int nivel; };\n\nint main() {\n    struct Personagem a = {"Arion", 15};\n    struct Personagem b = {"Kael", 20};\n    // Compare e imprima quem eh mais forte\n    return 0;\n}', hints: [{level:"I",text:"if (a.nivel > b.nivel) imprime a, senão b."},{level:"II",text:"if (a.nivel > b.nivel) printf(\"%s\", a.nome); else printf(\"%s\", b.nome);"},{level:"III",text:"if (a.nivel > b.nivel)\n    printf(\"Mais forte: %s\\n\", a.nome);\nelse\n    printf(\"Mais forte: %s\\n\", b.nome);"}], tests: [{input:"",expected:"Mais forte: Kael",description:"Kael mais forte"}], validator: function(code,output){let e=[];if(!output.includes("Kael"))e.push("Deve ser Kael");return{pass:e.length===0,errors:e};}},
            { id: "sq12_3", title: "Struct com Função", difficulty: "easy", xp: 15, description: "Crie void imprimirFicha(struct Personagem p) que imprima nome e nível.", starterCode: '#include <stdio.h>\n\nstruct Personagem { char nome[20]; int nivel; };\n\n// Crie imprimirFicha\n\nint main() {\n    struct Personagem p = {"Lyra", 8};\n    imprimirFicha(p);\n    return 0;\n}', hints: [{level:"I",text:"void imprimirFicha(struct Personagem p) { printf(...); }"},{level:"II",text:"void imprimirFicha(struct Personagem p) { printf(\"%s (Niv %d)\\n\", p.nome, p.nivel); }"},{level:"III",text:"void imprimirFicha(struct Personagem p) {\n    printf(\"%s (Niv %d)\\n\", p.nome, p.nivel);\n}"}], tests: [{input:"",expected:"Lyra (Niv 8)",description:"Ficha correta"}], validator: function(code,output){let e=[];if(!output.includes("Lyra"))e.push("Deve imprimir Lyra");if(!output.includes("8"))e.push("Nível deve ser 8");return{pass:e.length===0,errors:e};}},
            { id: "sq12_4", title: "Múltiplas Structs", difficulty: "medium", xp: 25, description: "Crie 3 structs e encontre quem tem mais ouro.", starterCode: '#include <stdio.h>\n\nstruct Avent { char nome[20]; int ouro; };\n\nint main() {\n    struct Avent a[3] = {{"Arion", 300}, {"Lyra", 150}, {"Kael", 500}};\n    // Encontre quem tem mais ouro\n    return 0;\n}', hints: [{level:"I",text:"Use for + if para comparar ouro."},{level:"II",text:"int idx = 0; for (i=1;i<3;i++) if(a[i].ouro>a[idx].ouro) idx=i;"},{level:"III",text:"int idx = 0;\nfor (int i = 1; i < 3; i++) {\n    if (a[i].ouro > a[idx].ouro) idx = i;\n}\nprintf(\"Mais ouro: %s (%d)\\n\", a[idx].nome, a[idx].ouro);"}], tests: [{input:"",expected:"Mais ouro: Kael",description:"Kael tem mais"}], validator: function(code,output){let e=[];if(!output.includes("Kael"))e.push("Deve ser Kael");if(!output.includes("500"))e.push("Deve mostrar 500");return{pass:e.length===0,errors:e};}},
            { id: "sq12_5", title: "Atualizar Struct", difficulty: "medium", xp: 25, description: "Crie uma função que receba ponteiro para struct e atualize a vida.", starterCode: '#include <stdio.h>\n\nstruct Avent { char nome[20]; int vida; };\n\n// Crie curar(struct Avent *p, int qtd)\n\nint main() {\n    struct Avent a = {"Mira", 50};\n    curar(&a, 30);\n    printf("%s vida: %d\\n", a.nome, a.vida);\n    return 0;\n}', hints: [{level:"I",text:"p->vida += qtd;"},{level:"II",text:"void curar(struct Avent *p, int qtd) { p->vida += qtd; }"},{level:"III",text:"void curar(struct Avent *p, int qtd) {\n    p->vida += qtd;\n}"}], tests: [{input:"",expected:"vida: 80",description:"Vida atualizada"}], validator: function(code,output){let e=[];if(!output.includes("80"))e.push("Vida deve ser 80");return{pass:e.length===0,errors:e};}}
        ],
        13: [
            { id: "sq13_1", title: "Vetor de Structs", difficulty: "easy", xp: 15, description: "Crie um vetor de 3 aventureiros e imprima todos com for.", starterCode: '#include <stdio.h>\n\nstruct Avent { char nome[20]; int nivel; };\n\nint main() {\n    struct Avent g[3] = {{"Arion", 10}, {"Lyra", 8}, {"Kael", 15}};\n    // Imprima todos com for\n    return 0;\n}', hints: [{level:"I",text:"for (int i=0;i<3;i++) printf(\"%s: %d\\n\", g[i].nome, g[i].nivel);"},{level:"II",text:"for (int i=0;i<3;i++) printf(\"%s Niv:%d\\n\", g[i].nome, g[i].nivel);"},{level:"III",text:"for (int i = 0; i < 3; i++) {\n    printf(\"%s: %d\\n\", g[i].nome, g[i].nivel);\n}"}], tests: [{input:"",expected:"Arion: 10",description:"Todos impressos"}], validator: function(code,output){let e=[];if(!output.includes("Arion"))e.push("Deve listar Arion");if(!output.includes("Kael"))e.push("Deve listar Kael");return{pass:e.length===0,errors:e};}},
            { id: "sq13_2", title: "Buscar no Vetor de Structs", difficulty: "easy", xp: 15, description: "Busque um aventureiro por nome no vetor de structs.", starterCode: '#include <stdio.h>\n#include <string.h>\n\nstruct Avent { char nome[20]; int nivel; };\n\nint main() {\n    struct Avent g[3] = {{"Arion", 10}, {"Lyra", 8}, {"Kael", 15}};\n    char busca[20] = "Lyra";\n    // Busque por nome\n    return 0;\n}', hints: [{level:"I",text:"Compare g[i].nome com busca usando strcmp."},{level:"II",text:"for if (strcmp(g[i].nome,busca)==0) printf(...);"},{level:"III",text:"for (int i=0;i<3;i++) {\n    if (strcmp(g[i].nome, busca) == 0)\n        printf(\"Encontrado: %s Niv:%d\\n\", g[i].nome, g[i].nivel);\n}"}], tests: [{input:"",expected:"Encontrado: Lyra",description:"Lyra encontrada"}], validator: function(code,output){let e=[];if(!output.includes("Lyra"))e.push("Deve encontrar Lyra");if(!code.includes("strcmp"))e.push("Use strcmp");return{pass:e.length===0,errors:e};}},
            { id: "sq13_3", title: "Somar Ouro", difficulty: "easy", xp: 15, description: "Some todo o ouro de todos os aventureiros do vetor.", starterCode: '#include <stdio.h>\n\nstruct Avent { char nome[20]; int ouro; };\n\nint main() {\n    struct Avent g[3] = {{"Arion", 300}, {"Lyra", 150}, {"Kael", 500}};\n    int total = 0;\n    // Some todo o ouro\n    printf("Total: %d\\n", total);\n    return 0;\n}', hints: [{level:"I",text:"total += g[i].ouro;"},{level:"II",text:"for (int i=0;i<3;i++) total += g[i].ouro;"},{level:"III",text:"for (int i=0;i<3;i++) total += g[i].ouro;"}], tests: [{input:"",expected:"Total: 950",description:"Total correto"}], validator: function(code,output){let e=[];if(!output.includes("950"))e.push("Total deve ser 950");return{pass:e.length===0,errors:e};}},
            { id: "sq13_4", title: "Ordenar por Nível", difficulty: "medium", xp: 25, description: "Ordene o vetor de structs por nível (crescente) usando selection sort.", starterCode: '#include <stdio.h>\n\nstruct Avent { char nome[20]; int nivel; };\n\nint main() {\n    struct Avent g[3] = {{"Kael", 15}, {"Lyra", 8}, {"Arion", 10}};\n    int n = 3;\n    // Ordene por nivel crescente\n    for (int i=0;i<n;i++) printf("%s:%d ", g[i].nome, g[i].nivel);\n    return 0;\n}', hints: [{level:"I",text:"Use selection sort trocando structs inteiras."},{level:"II",text:"Selection sort: para cada pos, encontre o menor e troque."},{level:"III",text:"for (int i=0;i<n-1;i++) {\n    int min = i;\n    for (int j=i+1;j<n;j++) {\n        if (g[j].nivel < g[min].nivel) min = j;\n    }\n    struct Avent temp = g[i]; g[i] = g[min]; g[min] = temp;\n}"}], tests: [{input:"",expected:"Lyra:8 Arion:10 Kael:15",description:"Ordenado"}], validator: function(code,output){let e=[];if(!output.includes("Lyra:8"))e.push("Lyra deve ser primeiro");if(!output.includes("Kael:15"))e.push("Kael deve ser último");return{pass:e.length===0,errors:e};}},
            { id: "sq13_5", title: "Estatísticas da Guilda", difficulty: "medium", xp: 25, description: "Calcule média de nível, menor e maior nível do vetor de structs.", starterCode: '#include <stdio.h>\n\nstruct Avent { char nome[20]; int nivel; };\n\nint main() {\n    struct Avent g[4] = {{"Arion",10},{"Lyra",8},{"Kael",15},{"Mira",12}};\n    int n = 4;\n    // Media, menor, maior nivel\n    return 0;\n}', hints: [{level:"I",text:"Some todos os níveis, divida por 4. Compare para menor/maior."},{level:"II",text:"int soma=0, menor=g[0].nivel, maior=g[0].nivel; for..."},{level:"III",text:"int soma=0, menor=g[0].nivel, maior=g[0].nivel;\nfor (int i=0;i<n;i++) {\n    soma += g[i].nivel;\n    if (g[i].nivel < menor) menor = g[i].nivel;\n    if (g[i].nivel > maior) maior = g[i].nivel;\n}\nprintf(\"Media: %d Menor: %d Maior: %d\\n\", soma/n, menor, maior);"}], tests: [{input:"",expected:"Media: 11",description:"Média correta"}], validator: function(code,output){let e=[];if(!output.includes("11"))e.push("Média deve ser 11");if(!output.includes("8"))e.push("Menor deve ser 8");if(!output.includes("15"))e.push("Maior deve ser 15");return{pass:e.length===0,errors:e};}}
        ],
        14: [
            { id: "sq14_1", title: "Bubble Sort Simples", difficulty: "easy", xp: 15, description: "Ordene {5, 3, 8, 1, 2} com bubble sort.", starterCode: '#include <stdio.h>\n\nint main() {\n    int v[5] = {5, 3, 8, 1, 2};\n    int n = 5;\n    // Bubble sort\n    for (int i=0;i<n;i++) printf("%d ", v[i]);\n    return 0;\n}', hints: [{level:"I",text:"Dois fors: externo n-1 vezes, interno compara vizinhos."},{level:"II",text:"for i for j if(v[j]>v[j+1]) troca;"},{level:"III",text:"for (int i=0;i<n-1;i++) {\n    for (int j=0;j<n-1-i;j++) {\n        if(v[j]>v[j+1]) {\n            int t=v[j]; v[j]=v[j+1]; v[j+1]=t;\n        }\n    }\n}"}], tests: [{input:"",expected:"1 2 3 5 8",description:"Ordenado"}], validator: function(code,output){let e=[];if(!output.includes("1 2 3 5 8"))e.push("Deve ser 1 2 3 5 8");return{pass:e.length===0,errors:e};}},
            { id: "sq14_2", title: "Selection Sort", difficulty: "easy", xp: 15, description: "Ordene {20, 5, 15, 10} com selection sort.", starterCode: '#include <stdio.h>\n\nint main() {\n    int v[4] = {20, 5, 15, 10};\n    int n = 4;\n    // Selection sort\n    for (int i=0;i<n;i++) printf("%d ", v[i]);\n    return 0;\n}', hints: [{level:"I",text:"Para cada posição, encontre o menor restante e troque."},{level:"II",text:"minIdx=i; for j se v[j]<v[minIdx] minIdx=j; troca v[i] e v[minIdx];"},{level:"III",text:"for (int i=0;i<n-1;i++) {\n    int min=i;\n    for (int j=i+1;j<n;j++) {\n        if(v[j]<v[min]) min=j;\n    }\n    int t=v[i]; v[i]=v[min]; v[min]=t;\n}"}], tests: [{input:"",expected:"5 10 15 20",description:"Ordenado"}], validator: function(code,output){let e=[];if(!output.includes("5 10 15 20"))e.push("Deve ser 5 10 15 20");return{pass:e.length===0,errors:e};}},
            { id: "sq14_3", title: "Ordenar Decrescente", difficulty: "easy", xp: 15, description: "Modifique bubble sort para ordenar {3, 1, 4, 2} em ordem decrescente.", starterCode: '#include <stdio.h>\n\nint main() {\n    int v[4] = {3, 1, 4, 2};\n    int n = 4;\n    // Bubble sort decrescente\n    for (int i=0;i<n;i++) printf("%d ", v[i]);\n    return 0;\n}', hints: [{level:"I",text:"Troque > por < na comparação."},{level:"II",text:"if(v[j] < v[j+1]) troca;"},{level:"III",text:"for (int i=0;i<n-1;i++) {\n    for (int j=0;j<n-1-i;j++) {\n        if(v[j] < v[j+1]) {\n            int t=v[j]; v[j]=v[j+1]; v[j+1]=t;\n        }\n    }\n}"}], tests: [{input:"",expected:"4 3 2 1",description:"Decrescente"}], validator: function(code,output){let e=[];if(!output.includes("4 3 2 1"))e.push("Deve ser 4 3 2 1");return{pass:e.length===0,errors:e};}},
            { id: "sq14_4", title: "Contar Trocas", difficulty: "medium", xp: 25, description: "Ordene {4, 2, 1, 3} e conte quantas trocas foram feitas.", starterCode: '#include <stdio.h>\n\nint main() {\n    int v[4] = {4, 2, 1, 3};\n    int n = 4, trocas = 0;\n    // Bubble sort contando trocas\n    for (int i=0;i<n;i++) printf("%d ", v[i]);\n    printf("\\nTrocas: %d\\n", trocas);\n    return 0;\n}', hints: [{level:"I",text:"Incremente trocas a cada troca."},{level:"II",text:"trocas++ dentro do if da troca."},{level:"III",text:"for (int i=0;i<n-1;i++) {\n    for (int j=0;j<n-1-i;j++) {\n        if(v[j]>v[j+1]) {\n            int t=v[j]; v[j]=v[j+1]; v[j+1]=t;\n            trocas++;\n        }\n    }\n}"}], tests: [{input:"",expected:"Trocas: 4",description:"4 trocas"}], validator: function(code,output){let e=[];if(!output.includes("Trocas:"))e.push("Deve contar trocas");if(!output.includes("1 2 3 4"))e.push("Deve estar ordenado");return{pass:e.length===0,errors:e};}},
            { id: "sq14_5", title: "Ordenar Strings", difficulty: "medium", xp: 25, description: "Ordene alfabeticamente: {\"Kael\", \"Arion\", \"Lyra\"}.", starterCode: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char nomes[3][20] = {"Kael", "Arion", "Lyra"};\n    int n = 3;\n    // Ordene alfabeticamente\n    for (int i=0;i<n;i++) printf("%s ", nomes[i]);\n    return 0;\n}', hints: [{level:"I",text:"Use bubble sort com strcmp para comparar strings."},{level:"II",text:"if(strcmp(nomes[j],nomes[j+1])>0) troca com strcpy;"},{level:"III",text:"for (int i=0;i<n-1;i++) {\n    for (int j=0;j<n-1-i;j++) {\n        if(strcmp(nomes[j],nomes[j+1])>0) {\n            char t[20]; strcpy(t,nomes[j]);\n            strcpy(nomes[j],nomes[j+1]);\n            strcpy(nomes[j+1],t);\n        }\n    }\n}"}], tests: [{input:"",expected:"Arion Kael Lyra",description:"Ordem alfabética"}], validator: function(code,output){let e=[];if(!output.includes("Arion Kael Lyra"))e.push("Deve ser Arion Kael Lyra");if(!code.includes("strcmp"))e.push("Use strcmp");return{pass:e.length===0,errors:e};}}
        ],
        15: [
            { id: "sq15_1", title: "Criar e Escrever", difficulty: "easy", xp: 15, description: "Crie um arquivo \"teste.dat\" e escreva 3 linhas.", starterCode: '#include <stdio.h>\n\nint main() {\n    // Crie arquivo e escreva 3 linhas\n    printf("Arquivo criado!\\n");\n    return 0;\n}', hints: [{level:"I",text:"FILE *f = fopen(\"teste.dat\",\"w\"); fprintf(f,...); fclose(f);"},{level:"II",text:"fopen(\"teste.dat\",\"w\"); fprintf(f,\"Linha 1\\n\"); ... fclose(f);"},{level:"III",text:"FILE *f = fopen(\"teste.dat\", \"w\");\nfprintf(f, \"Linha 1\\n\");\nfprintf(f, \"Linha 2\\n\");\nfprintf(f, \"Linha 3\\n\");\nfclose(f);"}], tests: [{input:"",expected:"Arquivo criado!",description:"Arquivo criado"}], validator: function(code,output){let e=[];if(!output.includes("Arquivo criado"))e.push("Deve imprimir mensagem");if(!code.includes("fopen"))e.push("Use fopen");if(!code.includes("fprintf"))e.push("Use fprintf");if(!code.includes("fclose"))e.push("Use fclose");return{pass:e.length===0,errors:e};}},
            { id: "sq15_2", title: "Ler e Imprimir", difficulty: "easy", xp: 15, description: "Escreva dados em arquivo, leia e imprima.", starterCode: '#include <stdio.h>\n\nint main() {\n    // Escreva e leia de volta\n    return 0;\n}', hints: [{level:"I",text:"Escreva com fprintf, leia com fgets em loop."},{level:"II",text:"FILE *f=fopen(\"d.dat\",\"w\"); fprintf(f,\"Oi\\n\"); fclose(f);\nFILE *r=fopen(\"d.dat\",\"r\"); char l[100]; while(fgets(l,100,r)) printf(\"%s\",l); fclose(r);"},{level:"III",text:"FILE *f = fopen(\"d.dat\", \"w\");\nfprintf(f, \"Oi\\n\");\nfclose(f);\nFILE *r = fopen(\"d.dat\", \"r\");\nchar l[100];\nwhile(fgets(l, 100, r)) printf(\"%s\", l);\nfclose(r);"}], tests: [{input:"",expected:"Oi",description:"Dados lidos"}], validator: function(code,output){let e=[];if(!output.includes("Oi"))e.push("Deve ler dados");if(!code.includes("fgets") && !code.includes("fscanf"))e.push("Use fgets ou fscanf");return{pass:e.length===0,errors:e};}},
            { id: "sq15_3", title: "Append ao Arquivo", difficulty: "easy", xp: 15, description: "Crie um arquivo, escreva, reabra em modo append e adicione mais dados.", starterCode: '#include <stdio.h>\n\nint main() {\n    // Escreva, depois append\n    return 0;\n}', hints: [{level:"I",text:"Primeiro fopen com \"w\", depois com \"a\" (append)."},{level:"II",text:"FILE *f=fopen(\"d.dat\",\"w\"); fprintf(f,\"1\\n\"); fclose(f);\nf=fopen(\"d.dat\",\"a\"); fprintf(f,\"2\\n\"); fclose(f);"},{level:"III",text:"FILE *f = fopen(\"d.dat\", \"w\");\nfprintf(f, \"1\\n\");\nfclose(f);\nf = fopen(\"d.dat\", \"a\");\nfprintf(f, \"2\\n\");\nfclose(f);\nFILE *r = fopen(\"d.dat\", \"r\");\nchar l[100];\nwhile(fgets(l, 100, r)) printf(\"%s\", l);\nfclose(r);"}], tests: [{input:"",expected:"1",description:"Dados escritos"}], validator: function(code,output){let e=[];if(!code.includes("\"a\"") && !code.includes("'a'"))e.push("Use modo append 'a'");return{pass:e.length===0,errors:e};}},
            { id: "sq15_4", title: "Contar Linhas", difficulty: "medium", xp: 25, description: "Escreva 5 linhas no arquivo e conte quantas linhas tem.", starterCode: '#include <stdio.h>\n\nint main() {\n    // Escreva 5 linhas, depois conte\n    return 0;\n}', hints: [{level:"I",text:"Leia com fgets e incremente um contador."},{level:"II",text:"int cont=0; while(fgets(l,100,r)) cont++; printf(\"Linhas: %d\", cont);"},{level:"III",text:"FILE *f = fopen(\"linhas.dat\", \"w\");\nfor (int i=0;i<5;i++) fprintf(f, \"Linha %d\\n\", i+1);\nfclose(f);\nint cont = 0;\nFILE *r = fopen(\"linhas.dat\", \"r\");\nchar l[100];\nwhile(fgets(l, 100, r)) cont++;\nprintf(\"Linhas: %d\\n\", cont);\nfclose(r);"}], tests: [{input:"",expected:"Linhas: 5",description:"5 linhas"}], validator: function(code,output){let e=[];if(!output.includes("5"))e.push("Deve ser 5 linhas");return{pass:e.length===0,errors:e};}},
            { id: "sq15_5", title: "Backup de Dados", difficulty: "medium", xp: 25, description: "Leia dados de um arquivo e escreva em outro (backup).", starterCode: '#include <stdio.h>\n\nint main() {\n    // Crie dados, salve em original, copie para backup\n    return 0;\n}', hints: [{level:"I",text:"Abra original para leitura e backup para escrita, copie linha a linha."},{level:"II",text:"FILE *r=fopen(\"o.dat\",\"r\"); FILE *w=fopen(\"b.dat\",\"w\"); while(fgets(l,100,r)) fprintf(w,\"%s\",l);"},{level:"III",text:"FILE *r = fopen(\"o.dat\", \"r\");\nFILE *w = fopen(\"b.dat\", \"w\");\nchar l[100];\nwhile(fgets(l, 100, r)) fprintf(w, \"%s\", l);\nfclose(r);\nfclose(w);"}], tests: [{input:"",expected:"",description:"Backup criado"}], validator: function(code,output){let e=[];if(!code.includes("fopen"))e.push("Use fopen");if((code.match(/fopen/g)||[]).length < 2) e.push("Precisa de 2 arquivos");return{pass:e.length===0,errors:e};}}
        ]
    };

    for (const [chId, quests] of Object.entries(templates)) {
        if (SIDE_QUESTS[chId] && SIDE_QUESTS[chId].length === 0) {
            SIDE_QUESTS[chId] = quests;
        }
    }
}

generateSideQuests();
