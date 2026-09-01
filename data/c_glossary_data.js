/**
 * GUILDCODE - BASE DE DADOS DO GLOSSÁRIO DE LINGUAGEM C
 * Contém explicações didáticas, sintaxe formal, códigos de exemplo, saídas esperadas (output do terminal),
 * dicas práticas ("Guild Wisdom") e armadilhas comuns para aventureiros de código.
 */

window.C_GLOSSARY_CATEGORIES = [
    { 
        id: 'all', 
        name: 'Todos os Tópicos', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>' 
    },
    { 
        id: 'basics', 
        name: 'Fundamentos & Tipos', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' 
    },
    { 
        id: 'operators', 
        name: 'Operadores', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' 
    },
    { 
        id: 'control', 
        name: 'Controle de Fluxo', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' 
    },
    { 
        id: 'functions', 
        name: 'Funções & Modularização', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' 
    },
    { 
        id: 'arrays', 
        name: 'Vetores & Strings', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>' 
    },
    { 
        id: 'pointers', 
        name: 'Ponteiros & Memória', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>' 
    },
    { 
        id: 'structs', 
        name: 'Structs & Tipos Custom', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>' 
    },
    { 
        id: 'files', 
        name: 'Manipulação de Arquivos', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>' 
    }
];

window.C_GLOSSARY_DATA = [
    // ═══════════════════════════════════════════════════════════════
    // 1. FUNDAMENTOS & TIPOS
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'c-structure',
        title: 'Estrutura Básica de um Programa C',
        category: 'basics',
        level: 'Iniciante',
        summary: 'A anatomia essencial de qualquer código em C, com bibliotecas, a função principal main() e o retorno.',
        syntax: `#include <stdio.h>\n\nint main(void) {\n    // Seu código aqui\n    return 0;\n}`,
        description: `Todo programa C precisa de um ponto de entrada chamado <code>main()</code>. É aqui que o sistema operacional começa a executar suas instruções.\n\n• <code>#include &lt;stdio.h&gt;</code>: Importa o cabeçalho de Entrada/Saída padrão (Standard I/O), permitindo usar funções como <code>printf()</code> e <code>scanf()</code>.\n• <code>int main()</code>: Declara a função principal que retorna um número inteiro.\n• <code>return 0;</code>: Informa ao sistema operacional que o programa terminou com sucesso sem erros.`,
        code: `#include <stdio.h>

int main(void) {
    // Exibe uma mensagem épica na tela
    printf("Saudações, Guerreiro do GuildCode!\\n");
    printf("Sua jornada pelo mundo de C começa agora.\\n");
    
    return 0; // Código 0 = Execução bem-sucedida!
}`,
        output: `Saudações, Guerreiro do GuildCode!\nSua jornada pelo mundo de C começa agora.`,
        tips: 'Nunca se esqueça do ponto e vírgula (;) ao final das instruções! Quase todos os comandos em C exigem encerramento com ponto e vírgula.',
        pitfalls: 'Esquecer de incluir <code>#include &lt;stdio.h&gt;</code> fará com que o compilador não reconheça funções básicas como <code>printf</code>.',
        related: ['printf-scanf', 'variables-types']
    },
    {
        id: 'variables-types',
        title: 'Variáveis e Tipos Primitivos',
        category: 'basics',
        level: 'Iniciante',
        summary: 'Como declarar e armazenar inteiros, números decimais e caracteres na memória.',
        syntax: `tipo nome_da_variavel = valor_inicial;`,
        description: `Em C, toda variável precisa ter seu tipo rigidamente declarado antes de ser usada (linguagem tipada estaticamente).\n\nOs principais tipos primitivos são:\n• <code>int</code>: Números inteiros (ex: 10, -5, 42). Ocupa geralmente 4 bytes.\n• <code>float</code>: Números reais com ponto flutuante de precisão simples (ex: 3.14, -0.5). Ocupa 4 bytes.\n• <code>double</code>: Números reais com precisão dupla (maior exatidão em cálculos). Ocupa 8 bytes.\n• <code>char</code>: Um único caractere alfanumérico ou símbolo entre aspas simples (ex: 'A', '9', '!'). Ocupa 1 byte.\n• <code>void</code>: Representa ausência de tipo ou valor.`,
        code: `#include <stdio.h>

int main(void) {
    int nivel = 15;
    float mana = 87.5f;
    double ouro = 1250000.99;
    char classe = 'M'; // 'M' de Mago

    printf("Nível: %d\\n", nivel);
    printf("Mana: %.1f\\n", mana);
    printf("Ouro: %.2lf\\n", ouro);
    printf("Classe (código): %c\\n", classe);

    return 0;
}`,
        output: `Nível: 15\nMana: 87.5\nOuro: 1250000.99\nClasse (código): M`,
        tips: 'Para valores com casas decimais use <code>float</code> para consumo leve ou <code>double</code> para alta precisão matemática.',
        pitfalls: 'Aspas duplas <code>"A"</code> criam uma String (array com terminador), enquanto aspas simples <code>\'A\'</code> representam um único <code>char</code>.',
        related: ['type-modifiers', 'printf-scanf']
    },
    {
        id: 'type-modifiers',
        title: 'Modificadores de Tipo (unsigned, long, const)',
        category: 'basics',
        level: 'Intermediário',
        summary: 'Ajuste o tamanho, sinal numérico e imutabilidade das variáveis.',
        syntax: `unsigned int vida_positiva = 100;\nconst float PI = 3.14159f;\nlong long int xp_infinito = 9999999999LL;`,
        description: `Os modificadores alteram a capacidade de representação e comportamento dos tipos fundamentais:\n\n• <code>unsigned</code>: Remove valores negativos, dobrando a capacidade máxima positiva (ex: <code>unsigned int</code> vai de 0 até ~4.29 bilhões).\n• <code>signed</code>: Permite números positivos e negativos (comportamento padrão).\n• <code>short</code>: Reduz o tamanho de memória (ex: <code>short int</code> usa 2 bytes: -32.768 a 32.767).\n• <code>long</code> e <code>long long</code>: Aumentam a capacidade para números inteiros gigantescos (8 bytes).\n• <code>const</code>: Torna a variável uma constante de somente leitura (não pode ser modificada após a inicialização).`,
        code: `#include <stdio.h>

int main(void) {
    const int VIDA_MAXIMA = 1000; // Imutável
    unsigned int mana_positiva = 500; // Nunca será negativa
    long long int pontuacao_global = 9876543210123LL;

    printf("Vida Máxima Constante: %d\\n", VIDA_MAXIMA);
    printf("Mana: %u\\n", mana_positiva);
    printf("Pontuação Global: %lld\\n", pontuacao_global);

    return 0;
}`,
        output: `Vida Máxima Constante: 1000\nMana: 500\nPontuação Global: 9876543210123`,
        tips: 'Use <code>const</code> sempre que um valor for fixo em seu algoritmo, prevenindo bugs acidentais.',
        pitfalls: 'Subtrair além de zero em uma variável <code>unsigned</code> causará "underflow", fazendo o valor saltar para o número máximo suportado (ex: 4294967295)!',
        related: ['variables-types']
    },
    {
        id: 'printf-scanf',
        title: 'Entrada e Saída (printf e scanf)',
        category: 'basics',
        level: 'Iniciante',
        summary: 'Como exibir textos formatados no terminal e capturar dados digitados pelo usuário.',
        syntax: `printf("Texto com formato %especificador", variavel);\nscanf("%especificador", &variavel);`,
        description: `As funções de <code>&lt;stdio.h&gt;</code> são a porta de comunicação com o usuário:\n\n• <code>printf()</code>: Imprime mensagens formatadas. Usa <em>especificadores de formato</em> que são substituídos pelas variáveis correspondentes.\n• <code>scanf()</code>: Lê a entrada do teclado. Exige o operador de endereço <code>&amp;</code> antes do nome da variável para saber onde salvar o dado na memória.`,
        code: `#include <stdio.h>

int main(void) {
    int idade = 21;
    float poder = 9500.5f;

    printf("Poder Registrado: %.1f | Idade: %d anos\\n", poder, idade);

    return 0;
}`,
        output: `Poder Registrado: 9500.5 | Idade: 21 anos`,
        table: {
            title: 'Tabela dos Principais Especificadores de Formato',
            headers: ['Especificador', 'Tipo de Dado Correspondente', 'Exemplo'],
            rows: [
                ['%d ou %i', 'int (inteiro decimal com sinal)', 'printf("%d", 42);'],
                ['%u', 'unsigned int (inteiro sem sinal)', 'printf("%u", 3000);'],
                ['%f', 'float (ponto flutuante padrão)', 'printf("%.2f", 3.14);'],
                ['%lf', 'double (double precision float)', 'scanf("%lf", &valorDouble);'],
                ['%c', 'char (um único caractere)', 'printf("%c", \'X\');'],
                ['%s', 'string (vetor de caracteres)', 'printf("%s", "GuildCode");'],
                ['%p', 'ponteiro (endereço hexadecimal de memória)', 'printf("%p", (void*)&var);'],
                ['%lld', 'long long int (inteiro longo de 64 bits)', 'printf("%lld", numGrande);'],
                ['%%', 'Imprime o caractere literal %', 'printf("Taxa: 10%%");']
            ]
        },
        tips: 'Para limitar as casas decimais no printf, use <code>%.2f</code> (2 casas decimais) ou <code>%.4f</code> (4 casas).',
        pitfalls: 'O erro mais comum em C para iniciantes é esquecer o <code>&</code> no <code>scanf("%d", &var)</code>. Sem o <code>&</code>, o programa sofrerá Segmentation Fault e travará.',
        related: ['escape-sequences', 'pointers-basics']
    },
    {
        id: 'escape-sequences',
        title: 'Sequências de Escape (\\n, \\t, \\\\, \\0)',
        category: 'basics',
        level: 'Iniciante',
        summary: 'Caracteres especiais de formatação de texto e controle de linha no terminal.',
        syntax: `printf("Linha 1\\nLinha 2\\tTabulado");`,
        description: `Sequências de escape iniciam com uma barra invertida (<code>\\</code>) e informam ao compilador que o próximo caractere possui um significado especial de formatação.\n\nPrincipais sequências:\n• <code>\\n</code>: Quebra de linha (New Line).\n• <code>\\t</code>: Tabulação horizontal (Tab / espaçamento de coluna).\n• <code>\\\\</code>: Barra invertida literal.\n• <code>\\\"</code>: Aspas duplas dentro de uma string.\n• <code>\\0</code>: Caractere Nulo terminador de string.`,
        code: `#include <stdio.h>

int main(void) {
    printf("=== STATUS DA GUILDA ===\\n");
    printf("Item\\t\\tQtd\\tPreço\\n");
    printf("Poção de Cura\\t5\\t50G\\n");
    printf("Caminho do arquivo: C:\\\\Guilda\\\\Save.dat\\n");
    printf("O NPC disse: \\"Avance sem medo!\\"\\n");

    return 0;
}`,
        output: `=== STATUS DA GUILDA ===\nItem\t\tQtd\tPreço\nPoção de Cura\t5\t50G\nCaminho do arquivo: C:\\Guilda\\Save.dat\nO NPC disse: "Avance sem medo!"`,
        tips: 'Sempre adicione <code>\\n</code> ao final do seu último <code>printf</code> para que o cursor do terminal volte ao início da linha limpa.',
        pitfalls: 'Tentar imprimir uma barra como <code>"C:\\temp"</code> interpretará <code>\\t</code> como tabulação ao invés do caminho!',
        related: ['printf-scanf', 'strings-basics']
    },

    // ═══════════════════════════════════════════════════════════════
    // 2. OPERADORES & EXPRESSÕES
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'arithmetic-operators',
        title: 'Operadores Aritméticos e Módulo (%)',
        category: 'operators',
        level: 'Iniciante',
        summary: 'Operações matemáticas básicas: soma, subtração, multiplicação, divisão e resto da divisão inteira.',
        syntax: `int soma = a + b;\nint resto = a % b;`,
        description: `Permitem realizar cálculos numéricos:\n• <code>+</code>: Adição\n• <code>-</code>: Subtração\n• <code>*</code>: Multiplicação\n• <code>/</code>: Divisão (se ambos os operandos forem inteiros, o resultado é truncado sem casas decimais!)\n• <code>%</code>: Módulo / Resto da divisão inteira (muito usado para saber se um número é par/ímpar ou para ciclos).`,
        code: `#include <stdio.h>

int main(void) {
    int a = 17, b = 5;

    printf("Soma: %d\\n", a + b);           // 22
    printf("Subtração: %d\\n", a - b);      // 12
    printf("Multiplicação: %d\\n", a * b);  // 85
    printf("Divisão Inteira: %d\\n", a / b); // 3 (17 / 5 = 3)
    printf("Resto (Módulo): %d\\n", a % b);  // 2 (resto de 17/5)

    float divReal = (float)a / b;
    printf("Divisão Real: %.2f\\n", divReal); // 3.40

    return 0;
}`,
        output: `Soma: 22\nSubtração: 12\nMultiplicação: 85\nDivisão Inteira: 3\nResto (Módulo): 2\nDivisão Real: 3.40`,
        tips: 'Para obter casas decimais na divisão de duas variáveis inteiras, converta ao menos uma delas com <code>(float)a / b</code>.',
        pitfalls: 'O operador de resto <code>%</code> funciona APENAS com números inteiros (int). Tentar fazer <code>5.5 % 2</code> causa erro de compilação.',
        related: ['assignment-operators']
    },
    {
        id: 'relational-logical',
        title: 'Operadores Relacionais e Lógicos (&&, ||, !)',
        category: 'operators',
        level: 'Iniciante',
        summary: 'Comparações de igualdade, magnitude e combinação de condições lógicas booleanas.',
        syntax: `if (vida > 0 && mana >= 10) { ... }`,
        description: `Em C puro clássico, o valor <code>0</code> representa FALSO e qualquer valor diferente de zero (como <code>1</code>) representa VERDADEIRO.\n\n• Relacionais: <code>==</code> (igual a), <code>!=</code> (diferente de), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.\n• Lógicos:\n  - <code>&amp;&amp;</code> (E lógico - AND): Verdadeiro somente se ambas as condições forem verdadeiras.\n  - <code>||</code> (OU lógico - OR): Verdadeiro se pelo menos uma condição for verdadeira.\n  - <code>!</code> (NÃO lógico - NOT): Inverte o valor lógico (inverte 1 para 0 e vice-versa).`,
        code: `#include <stdio.h>

int main(void) {
    int nivel = 25;
    int possuiChaveDungeon = 1; // 1 = Verdadeiro, 0 = Falso
    int estaEnvenenado = 0;

    if (nivel >= 20 && possuiChaveDungeon && !estaEnvenenado) {
        printf("Acesso concedido ao Covil do Dragão!\\n");
    } else {
        printf("Requisitos não atendidos.\\n");
    }

    return 0;
}`,
        output: `Acesso concedido ao Covil do Dragão!`,
        tips: 'Operadores lógicos em C usam <em>curto-circuito</em>: em <code>A && B</code>, se A for falso, B nem sequer é avaliado.',
        pitfalls: 'CUIDADO: Nunca confunda <code>==</code> (comparação de igualdade) com <code>=</code> (atribuição). Fazer <code>if (x = 5)</code> atribui 5 a x e será sempre verdadeiro!',
        related: ['if-else-conditions']
    },
    {
        id: 'assignment-operators',
        title: 'Atribuição Composta e Incremento (++ / --)',
        category: 'operators',
        level: 'Iniciante',
        summary: 'Atalhos matemáticos para atualizar variáveis e a diferença entre pré-fixado e pós-fixado.',
        syntax: `x += 5;   // x = x + 5\nx++;      // x = x + 1 (Pós-incremento)\n++x;      // x = x + 1 (Pré-incremento)`,
        description: `Permitem modificar variáveis de forma concisa:\n• <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code>: Executam a operação e atribuem o resultado de volta.\n• <code>x++</code> (Pós-incremento): Usa o valor atual na expressão e só depois incrementa 1.\n• <code>++x</code> (Pré-incremento): Incrementa 1 primeiro e depois entrega o novo valor na expressão.`,
        code: `#include <stdio.h>

int main(void) {
    int xp = 100;
    xp += 50;
    printf("XP: %d\\n", xp);

    int a = 5;
    int b = a++;
    printf("Pós-incremento -> a: %d, b: %d\\n", a, b);

    int c = 5;
    int d = ++c;
    printf("Pré-incremento -> c: %d, d: %d\\n", c, d);

    return 0;
}`,
        output: `XP: 150\nPós-incremento -> a: 6, b: 5\nPré-incremento -> c: 6, d: 6`,
        tips: 'Em comandos isolados como dentro de um for (<code>i++</code>), não há diferença de resultado entre <code>i++</code> e <code>++i</code>.',
        pitfalls: 'Evite usar múltiplos incrementos na mesma linha como <code>x = x++ + ++x;</code> pois o comportamento é indefinido pelo padrão C.',
        related: ['for-loop']
    },
    {
        id: 'ternary-sizeof',
        title: 'Operador Ternário e sizeof',
        category: 'operators',
        level: 'Intermediário',
        summary: 'Condicional inline de uma linha e operador de medição de tamanho em bytes.',
        syntax: `condicao ? valor_se_verdadeiro : valor_se_falso;\nsizeof(tipo_ou_variavel);`,
        description: `Dois operadores extremamente poderosos e elegantes:\n\n• <code>? :</code> (Ternário): É uma estrutura condicional em formato de expressão. Retorna um valor diretamente com base na condição testada.\n• <code>sizeof()</code>: Operador em tempo de compilação que retorna a quantidade exata de bytes que um tipo ou variável ocupa na memória (retorna um <code>size_t</code>).`,
        code: `#include <stdio.h>

int main(void) {
    int hp = 100;
    const char* status = (hp > 0) ? "VIVO E PRONTO" : "DERROTADO";
    printf("Status do Herói: %s\\n\\n", status);

    printf("=== TAMANHO DOS TIPOS NA MEMÓRIA ===\\n");
    printf("char:   %zu byte\\n", sizeof(char));
    printf("int:    %zu bytes\\n", sizeof(int));
    printf("float:  %zu bytes\\n", sizeof(float));
    printf("double: %zu bytes\\n", sizeof(double));

    return 0;
}`,
        output: `Status do Herói: VIVO E PRONTO\n\n=== TAMANHO DOS TIPOS NA MEMÓRIA ===\nchar:   1 byte\nint:    4 bytes\nfloat:  4 bytes\ndouble: 8 bytes`,
        tips: '<code>sizeof</code> é fundamental para calcular a memória exata necessária ao usar <code>malloc</code>.',
        pitfalls: 'Aplicar <code>sizeof</code> num ponteiro retornará o tamanho do ponteiro (geralmente 8 bytes em 64 bits), e não o tamanho do bloco alocado.',
        related: ['dynamic-allocation', 'pointers-basics']
    },
    {
        id: 'bitwise-operators',
        title: 'Operadores Bit a Bit (Bitwise)',
        category: 'operators',
        level: 'Avançado',
        summary: 'Manipulação direta dos bits binários na memória: &, |, ^, ~, << e >>.',
        syntax: `int mascara = a & b;\nint deslocado = a << 2;`,
        description: `Trabalham diretamente na representação binária dos números:\n• <code>&amp;</code> (AND bit a bit): 1 apenas se ambos os bits forem 1.\n• <code>|</code> (OR bit a bit): 1 se qualquer bit for 1.\n• <code>^</code> (XOR bit a bit): 1 se os bits forem diferentes.\n• <code>~</code> (NOT bit a bit): Inverte todos os bits (0 vira 1, 1 vira 0).\n• <code>&lt;&lt;</code> (Deslocamento à esquerda): Multiplica por potências de 2.\n• <code>&gt;&gt;</code> (Deslocamento à direita): Divide por potências de 2.`,
        code: `#include <stdio.h>

#define FLAG_FOGO   (1 << 0) // 0001 (1)
#define FLAG_GELO   (1 << 1) // 0010 (2)
#define FLAG_VENENO (1 << 2) // 0100 (4)

int main(void) {
    unsigned char buffs = 0;
    buffs |= (FLAG_FOGO | FLAG_VENENO); // 0101 (5)

    if (buffs & FLAG_VENENO) {
        printf("Inimigo está envenenado!\\n");
    }

    buffs &= ~FLAG_FOGO;
    printf("Buffs atuais (decimal): %d\\n", buffs);

    return 0;
}`,
        output: `Inimigo está envenenado!\nBuffs atuais (decimal): 4`,
        tips: 'Manipulação bitwise é a base de sistemas embarcados, drivers de hardware, flags de permissão e motores de jogos para economia extrema de memória.',
        pitfalls: 'Não confunda <code>&amp;</code> (bitwise) com <code>&amp;&amp;</code> (lógico booleano) nem <code>|</code> com <code>||</code>.',
        related: ['type-modifiers']
    },

    // ═══════════════════════════════════════════════════════════════
    // 3. CONTROLE DE FLUXO
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'if-else-conditions',
        title: 'Condicionais if, else if e else',
        category: 'control',
        level: 'Iniciante',
        summary: 'Tomada de decisões no código com base em condições verdadeiras ou falsas.',
        syntax: `if (condicao1) {\n    // Bloco 1\n} else if (condicao2) {\n    // Bloco 2\n} else {\n    // Padrão\n}`,
        description: `A estrutura <code>if-else</code> bifurca a execução do programa dependendo do resultado lógico de uma expressão booleana.\n\nSe a primeira condição do <code>if</code> for verdadeira, seu bloco é executado e todo o restante da cadeia é ignorado. Caso contrário, testa os <code>else if</code> subsequentes até cair no <code>else</code> padrão (opcional).`,
        code: `#include <stdio.h>

int main(void) {
    int pontuacao = 85;

    if (pontuacao >= 90) {
        printf("Classificação: Rank S - Lendário!\\n");
    } else if (pontuacao >= 70) {
        printf("Classificação: Rank A - Veterano!\\n");
    } else {
        printf("Classificação: Rank F - Tente Novamente!\\n");
    }

    return 0;
}`,
        output: `Classificação: Rank A - Veterano!`,
        tips: 'Se o bloco do if tiver apenas uma linha, as chaves { } são opcionais, mas é BOA PRÁTICA sempre usá-las para evitar bugs de manutenção.',
        pitfalls: 'Cuidado com ponto e vírgula indevido após o if: <code>if (x > 10); { printf("Oi"); }</code> executará o printf sempre, pois o ; encerra o if imediatamente!',
        related: ['switch-case', 'relational-logical']
    },
    {
        id: 'switch-case',
        title: 'Seleção Múltipla com switch, case e default',
        category: 'control',
        level: 'Iniciante',
        summary: 'Estrutura otimizada para testar uma variável contra múltiplos valores constantes inteiros ou caracteres.',
        syntax: `switch (expressao_inteira) {\n    case VALOR1:\n        // comandos\n        break;\n    case VALOR2:\n        // comandos\n        break;\n    default:\n        // caso padrão\n}`,
        description: `O <code>switch</code> é uma alternativa mais limpa e veloz a múltiplos <code>if-else</code> encadeados quando se compara uma única variável contra valores inteiros ou caracteres constantes.\n\n• <code>case VALOR:</code>: Ponto de entrada se a variável for igual ao valor.\n• <code>break;</code>: Interrompe a execução do switch e pula para fora dele.\n• <code>default:</code>: Executado caso nenhum dos cases seja correspondente.`,
        code: `#include <stdio.h>

int main(void) {
    char opcao = '2';

    switch (opcao) {
        case '1':
            printf("Você escolheu: Cavaleiros (+Defesa)\\n");
            break;
        case '2':
            printf("Você escolheu: Magos (+Dano Mágico)\\n");
            break;
        default:
            printf("Opção Inválida!\\n");
            break;
    }

    return 0;
}`,
        output: `Você escolheu: Magos (+Dano Mágico)`,
        tips: 'Você pode agrupar múltiplos cases seguidos sem break para compartilhar o mesmo bloco de código (Fall-through proposital).',
        pitfalls: 'Esquecer o <code>break;</code> fará o programa continuar executando todos os cases seguintes em sequência até encontrar um break ou o fim do switch.',
        related: ['if-else-conditions']
    },
    {
        id: 'while-loop',
        title: 'Laços while e do-while',
        category: 'control',
        level: 'Iniciante',
        summary: 'Repetições baseadas em condições: execução de zero a N vezes ou ao menos uma vez.',
        syntax: `while (condicao) {\n    // Executa enquanto for verdadeiro\n}\n\ndo {\n    // Executa ao menos 1 vez\n} while (condicao);`,
        description: `Estruturas de repetição para quando não sabemos exatamente quantas vezes o laço irá rodar:\n\n• <code>while</code>: Testa a condição ANTES de entrar no bloco. Se for falsa logo no início, nunca executa.\n• <code>do-while</code>: Executa o bloco PRIMEIRO e só depois testa a condição. Garante ao menos UMA execução (ideal para menus de opções).`,
        code: `#include <stdio.h>

int main(void) {
    int vidaMonstro = 30;
    while (vidaMonstro > 0) {
        printf("Atacando! Vida do monstro: %d\\n", vidaMonstro);
        vidaMonstro -= 10;
    }
    printf("Monstro derrotado!\\n");

    return 0;
}`,
        output: `Atacando! Vida do monstro: 30\nAtacando! Vida do monstro: 20\nAtacando! Vida do monstro: 10\nMonstro derrotado!`,
        tips: 'Certifique-se de que a variável de controle da condição seja alterada dentro do loop para evitar loops infinitos.',
        pitfalls: 'Atenção com <code>do { ... } while (condicao);</code>: nunca esqueça o ponto e vírgula obrigatório no final do while!',
        related: ['for-loop', 'break-continue']
    },
    {
        id: 'for-loop',
        title: 'Laço for (Repetição Contada)',
        category: 'control',
        level: 'Iniciante',
        summary: 'A estrutura de repetição mais utilizada para contagens e iterações sobre vetores/coleções.',
        syntax: `for (inicializacao; condicao; incremento) {\n    // Código repetido\n}`,
        description: `O laço <code>for</code> condensa as 3 fases de uma iteração em uma única linha legível:\n1. <strong>Inicialização</strong>: Executada uma única vez antes do loop começar (ex: <code>int i = 0</code>).\n2. <strong>Condição</strong>: Avaliada antes de cada repetição. Se verdadeira, roda o bloco (ex: <code>i &lt; 10</code>).\n3. <strong>Incremento / Atualização</strong>: Executado logo após o término de cada iteração (ex: <code>i++</code>).`,
        code: `#include <stdio.h>

int main(void) {
    printf("Contagem regressiva:\\n");
    for (int i = 3; i > 0; i--) {
        printf("%d... ", i);
    }
    printf("FOGO!\\n");

    return 0;
}`,
        output: `Contagem regressiva:\n3... 2... 1... FOGO!`,
        tips: 'Desde o padrão C99, você pode declarar a variável contadora diretamente no for: <code>for (int i = 0; ...)</code>.',
        pitfalls: 'Cuidado com a condição de parada: se fizer <code>for (int i = 0; i >= 0; i++)</code>, o número sofrerá overflow após bilhões de ciclos.',
        related: ['while-loop', 'arrays-1d']
    },
    {
        id: 'break-continue',
        title: 'Controle de Salto: break, continue e return',
        category: 'control',
        level: 'Iniciante',
        summary: 'Interromper laços precocemente, pular iterações ou encerrar funções.',
        syntax: `break;      // Sai imediatamente do loop ou switch\ncontinue;   // Pula para a próxima iteração do loop\nreturn val; // Sai da função atual retornando um valor`,
        description: `Comandos para manipulação cirúrgica do fluxo:\n• <code>break</code>: Quebra e finaliza imediatamente o laço (for/while) ou switch mais interno.\n• <code>continue</code>: Pula o restante do bloco atual e vai direto para a próxima rodada do laço.\n• <code>return</code>: Encerra a função atual e retorna o controle (e opcionalmente um dado) para quem a chamou.`,
        code: `#include <stdio.h>

int main(void) {
    for (int sala = 1; sala <= 5; sala++) {
        if (sala == 2) {
            printf("Sala 2 vazia, pulando com continue...\\n");
            continue;
        }
        if (sala == 4) {
            printf("Baú encontrado na Sala 4! Parando com break.\\n");
            break;
        }
        printf("Explorando sala %d...\\n", sala);
    }

    return 0;
}`,
        output: `Explorando sala 1...\nSala 2 vazia, pulando com continue...\nExplorando sala 3...\nBaú encontrado na Sala 4! Parando com break.`,
        tips: 'Use <code>continue</code> para evitar níveis profundos de indentação com ifs aninhados dentro de loops.',
        pitfalls: 'Em loops aninhados (loop dentro de loop), o <code>break</code> quebra APENAS o loop interno onde ele está inserido.',
        related: ['for-loop', 'while-loop']
    },

    // ═══════════════════════════════════════════════════════════════
    // 4. FUNÇÕES & MODULARIZAÇÃO
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'functions-basics',
        title: 'Funções: Protótipos, Definição e Retorno',
        category: 'functions',
        level: 'Iniciante',
        summary: 'Como dividir seu programa em blocos reutilizáveis, organizados e modulares.',
        syntax: `tipo_retorno nome_da_funcao(tipo param1, tipo param2);\n\ntipo_retorno nome_da_funcao(tipo param1, tipo param2) {\n    // Instruções\n    return resultado;\n}`,
        description: `Funções permitem modularizar o código, evitando repetição e facilitando testes:\n\n• <strong>Protótipo (Declaração)</strong>: Informa ao compilador no topo do arquivo que a função existe, qual seu nome, parâmetros e retorno.\n• <strong>Definição</strong>: O corpo real da função com suas instruções.\n• <strong>Chamada</strong>: Execução da função passando os argumentos necessários.\n• Funções que não devolvem nenhum valor usam o tipo de retorno <code>void</code>.`,
        code: `#include <stdio.h>

int calcularDano(int ataqueBase, int multiplicadorCritico);

int main(void) {
    int danoFinal = calcularDano(150, 2);
    printf("Dano Crítico Causado: %d HP!\\n", danoFinal);
    return 0;
}

int calcularDano(int ataqueBase, int multiplicadorCritico) {
    return ataqueBase * multiplicadorCritico;
}`,
        output: `Dano Crítico Causado: 300 HP!`,
        tips: 'Sempre declare protótipos de funções antes da <code>main()</code> para organizar a leitura e permitir que funções chamem umas às outras livremente.',
        pitfalls: 'Se uma função declara um tipo de retorno (ex: <code>int</code>), todos os caminhos de execução dentro dela devem conter um <code>return</code> compatível.',
        related: ['pass-by-value-reference', 'recursion']
    },
    {
        id: 'pass-by-value-reference',
        title: 'Passagem por Valor vs Passagem por Referência',
        category: 'functions',
        level: 'Intermediário',
        summary: 'Entenda a cópia de dados vs modificação direta da variável original usando ponteiros.',
        syntax: `void porValor(int x);        // Recebe uma cópia isolada\nvoid porReferencia(int *x);  // Recebe o endereço original`,
        description: `Em C, todas as funções funcionam nativamente por <strong>Passagem por Valor</strong> (uma cópia do dado é enviada). Alterar o parâmetro não altera a variável original de quem chamou.\n\nPara modificar a variável original, usamos a <strong>Passagem por Referência</strong> (passando o endereço de memória através de um ponteiro).`,
        code: `#include <stdio.h>

void curarPorValor(int hp) {
    hp += 50; 
}

void curarPorReferencia(int *hp) {
    *hp += 50; 
}

int main(void) {
    int vida = 100;

    curarPorValor(vida);
    printf("Após curarPorValor: %d (Inalterado)\\n", vida);

    curarPorReferencia(&vida);
    printf("Após curarPorReferencia: %d (Alterado!)\\n", vida);

    return 0;
}`,
        output: `Após curarPorValor: 100 (Inalterado)\nApós curarPorReferencia: 150 (Alterado!)`,
        tips: 'Quando quiser que uma função retorne múltiplos resultados (ex: calcular mínimo e máximo ao mesmo tempo), use parâmetros por referência com ponteiros.',
        pitfalls: 'Passar uma variável sem o <code>&amp;</code> para uma função que espera ponteiro causará um aviso ou erro de compilação grave.',
        related: ['pointers-basics', 'functions-basics']
    },
    {
        id: 'recursion',
        title: 'Recursão (Funções que Chamam a Si Mesmas)',
        category: 'functions',
        level: 'Intermediário',
        summary: 'Resolução elegante de problemas dividindo-os em casos menores até atingir o caso base.',
        syntax: `int fatorial(int n) {\n    if (n <= 1) return 1; // Caso Base\n    return n * fatorial(n - 1); // Chamada Recursiva\n}`,
        description: `Uma função recursiva resolve uma tarefa chamando a si mesma com parâmetros progressivamente menores.\n\nToda recursão DEVE possuir dois componentes essenciais:\n1. <strong>Caso Base</strong>: A condição de parada que encerra a recursão sem fazer novas chamadas.\n2. <strong>Passo Recursivo</strong>: A chamada à própria função convergindo em direção ao caso base.`,
        code: `#include <stdio.h>

long long int fatorial(int n) {
    if (n <= 1) return 1;
    return n * fatorial(n - 1);
}

int main(void) {
    printf("Fatorial de 5! = %lld\\n", fatorial(5));
    return 0;
}`,
        output: `Fatorial de 5! = 120`,
        tips: 'Recursão é extremamente intuitiva para navegar em árvores, grafos, labirintos e algoritmos como QuickSort/MergeSort.',
        pitfalls: 'Esquecer ou errar o Caso Base causará <em>Stack Overflow</em> (estouro da pilha de memória do programa) e travamento.',
        related: ['functions-basics']
    },
    {
        id: 'preprocessor-directives',
        title: 'Diretivas de Pré-processador (#define, #include, Macros)',
        category: 'functions',
        level: 'Intermediário',
        summary: 'Comandos executados antes da compilação: inclusão de arquivos, constantes simbólicas e macros.',
        syntax: `#define NOME_CONSTANTE valor\n#define MACRO(x) ((x) * (x))\n#include <arquivo.h>`,
        description: `O pré-processador do C substitui textos no código-fonte antes de gerar o binário:\n\n• <code>#include &lt;biblioteca.h&gt;</code>: Inclui bibliotecas padrão do sistema.\n• <code>#include "meu_header.h"</code>: Inclui arquivos de cabeçalho do próprio projeto.\n• <code>#define</code>: Cria constantes textuais ou <em>macros</em> que são substituídas diretamente pelo compilador.\n• <code>#ifndef / #define / #endif</code>: Conhecidos como <em>Include Guards</em>, impedem que o mesmo header seja importado múltiplas vezes.`,
        code: `#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
    printf("Maior valor: %d\\n", MAX(45, 89));
    return 0;
}`,
        output: `Maior valor: 89`,
        tips: 'Em macros com parâmetros, SEMPRE envolva os parâmetros e a expressão inteira com parênteses para evitar problemas de precedência aritmética.',
        pitfalls: 'Macros não realizam verificação de tipos. Prefira funções normais ou <code>const</code> a menos que precise de substituição textual ou metaprogramação.',
        related: ['variables-types']
    },

    // ═══════════════════════════════════════════════════════════════
    // 5. VETORES, MATRIZES E STRINGS
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'arrays-1d',
        title: 'Vetores Unidimensionais (Arrays)',
        category: 'arrays',
        level: 'Iniciante',
        summary: 'Armazenamento de múltiplos dados do mesmo tipo em posições contíguas de memória.',
        syntax: `tipo nome_vetor[tamanho];\ntipo nome_vetor[] = { elem1, elem2, elem3 };`,
        description: `Um vetor é uma sequência de elementos homogêneos alocados lado a lado na memória.\n\n• O índice de acesso começa sempre em <code>0</code> e vai até <code>tamanho - 1</code>.\n• Acesso direto por colchetes: <code>vetor[0]</code> acessa o primeiro item.\n• O nome do vetor sem colchetes funciona como um ponteiro para o primeiro elemento.`,
        code: `#include <stdio.h>

int main(void) {
    int inventario[3] = {10, 25, 50};

    for (int i = 0; i < 3; i++) {
        printf("Slot [%d]: %d itens\\n", i, inventario[i]);
    }

    return 0;
}`,
        output: `Slot [0]: 10 itens\nSlot [1]: 25 itens\nSlot [2]: 50 itens`,
        tips: 'Para calcular a quantidade de elementos de um vetor estático automaticamente: <code>int total = sizeof(vetor) / sizeof(vetor[0]);</code>.',
        pitfalls: 'C não faz checagem de limites (bounds checking)! Acessar <code>inventario[10]</code> em um vetor de tamanho 5 lerá lixo de memória ou causará corrupção de dados.',
        related: ['matrices-2d', 'strings-basics', 'pointers-basics']
    },
    {
        id: 'matrices-2d',
        title: 'Matrizes Multidimensionais (Arrays 2D)',
        category: 'arrays',
        level: 'Intermediário',
        summary: 'Tabelas bidimensionais com linhas e colunas (perfeitas para mapas e grids de RPG).',
        syntax: `tipo matriz[linhas][colunas];\nint mapa[3][3] = { {1,0,0}, {0,1,0}, {0,0,1} };`,
        description: `Matrizes são vetores de vetores, estruturados em linhas e colunas.\n• O primeiro índice representa a <strong>linha</strong> e o segundo representa a <strong>coluna</strong>: <code>matriz[linha][coluna]</code>.\n• Para percorrer uma matriz completa, utiliza-se dois laços <code>for</code> aninhados.`,
        code: `#include <stdio.h>

int main(void) {
    int mapa[2][3] = {
        {1, 0, 2},
        {0, 1, 0}
    };

    for (int l = 0; l < 2; l++) {
        for (int c = 0; c < 3; c++) {
            printf("[%d] ", mapa[l][c]);
        }
        printf("\\n");
    }

    return 0;
}`,
        output: `[1] [0] [2] \n[0] [1] [0] `,
        tips: 'Na memória do computador, matrizes são armazenadas de forma linear linha após linha (Row-Major Order).',
        pitfalls: 'Ao passar uma matriz para uma função, você DEVE especificar obrigatoriamente a dimensão das colunas no parâmetro: <code>void desenhar(int mapa[][3]);</code>.',
        related: ['arrays-1d', 'for-loop']
    },
    {
        id: 'strings-basics',
        title: 'Strings em C e o Terminador \\0',
        category: 'arrays',
        level: 'Iniciante',
        summary: 'Vetores de caracteres terminados pelo caractere nulo obrigatório \\0.',
        syntax: `char nome[20] = "GuildCode";\nchar frase[] = "Aventura";`,
        description: `Diferente de linguagens modernas, C não possui um tipo nativo 'String'. Uma string em C é simplesmente um vetor de <code>char</code> que termina com o caractere nulo especial <code>'\\0'</code> (ASCII 0).\n\nO <code>'\\0'</code> indica para funções como <code>printf("%s")</code> onde o texto acaba na memória. Portanto, um vetor para guardar "GATO" (4 letras) precisa ter no mínimo 5 posições de tamanho.`,
        code: `#include <stdio.h>

int main(void) {
    char titulo[30] = "Mestre da Guilda";
    printf("Título: %s\\n", titulo);

    titulo[0] = 'm';
    printf("Modificado: %s\\n", titulo);

    return 0;
}`,
        output: `Título: Mestre da Guilda\nModificado: mestre da Guilda`,
        tips: 'Ao ler strings com espaços pelo teclado, prefira usar <code>fgets(buffer, tamanho, stdin)</code> em vez de <code>scanf("%s")</code>.',
        pitfalls: 'Se você criar um array de char sem espaço para o <code>\\0</code>, funções de impressão continuarão lendo a memória descontroladamente até encontrar um zero aleatório.',
        related: ['string-h-functions', 'arrays-1d']
    },
    {
        id: 'string-h-functions',
        title: 'Manipulação de Texto com <string.h>',
        category: 'arrays',
        level: 'Intermediário',
        summary: 'Principais funções para medição, cópia, concatenação e comparação de strings: strlen, strcpy, strcat e strcmp.',
        syntax: `#include <string.h>\n\nstrlen(str);\nstrcpy(destino, origem);\nstrcat(destino, sufixo);\nstrcmp(str1, str2);`,
        description: `A biblioteca <code>&lt;string.h&gt;</code> contém funções essenciais para manipular cadeias de caracteres:\n\n• <code>strlen(s)</code>: Retorna o comprimento da string (não conta o <code>\\0</code>).\n• <code>strcpy(dest, orig)</code>: Copia o texto de 'orig' para 'dest'.\n• <code>strcat(dest, sufixo)</code>: Concatena/junta 'sufixo' ao final de 'dest'.\n• <code>strcmp(s1, s2)</code>: Compara duas strings alfabeticamente. Retorna <code>0</code> se forem exatamente idênticas!`,
        code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char nome[50] = "Arkan";
    char sobrenome[] = " Velor";

    printf("Tamanho: %zu\\n", strlen(nome));
    strcat(nome, sobrenome);
    printf("Nome Completo: %s\\n", nome);

    if (strcmp(nome, "Arkan Velor") == 0) {
        printf("Identidade confirmada!\\n");
    }

    return 0;
}`,
        output: `Tamanho: 5\nNome Completo: Arkan Velor\nIdentidade confirmada!`,
        tips: 'Lembre-se: em C NUNCA compare strings usando <code>if (s1 == s2)</code>! Isso compara os endereços de memória, não o conteúdo. SEMPRE use <code>strcmp(s1, s2) == 0</code>.',
        pitfalls: 'Funções como <code>strcpy</code> e <code>strcat</code> não verificam se o destino tem espaço suficiente. Para segurança contra invasões/buffer overflow, use <code>strncpy</code> e <code>strncat</code>.',
        related: ['strings-basics']
    },

    // ═══════════════════════════════════════════════════════════════
    // 6. PONTEIROS & GESTÃO DE MEMÓRIA
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'pointers-basics',
        title: 'Ponteiros: Conceito, Endereços (&) e Desreferenciação (*)',
        category: 'pointers',
        level: 'Intermediário',
        summary: 'Variáveis que guardam endereços de memória. O maior superpoder e diferencial da linguagem C.',
        syntax: `int *ptr = &variavel; // Guarda o endereço de memoria de variavel\n*ptr = 99;            // Modifica o valor no endereço apontado`,
        description: `Um ponteiro é uma variável cujo valor é o <strong>endereço de memória</strong> de outra variável.\n\n• <code>&amp;</code> (Operador de Endereço): Obtém o endereço onde a variável está alocada na memória RAM (ex: <code>&amp;vida</code>).\n• <code>*</code> (Operador de Desreferenciação / Conteúdo): Acessa ou altera o valor que está guardado naquele endereço específico.`,
        code: `#include <stdio.h>

int main(void) {
    int mana = 100;
    int *ptrMana = &mana;

    printf("Valor inicial da mana: %d\\n", mana);

    *ptrMana = 250;
    printf("Novo valor após alteração via ponteiro: %d\\n", mana);

    return 0;
}`,
        output: `Valor inicial da mana: 100\nNovo valor após alteração via ponteiro: 250`,
        tips: 'Pense no ponteiro como uma "etiqueta com o número de um armário". O ponteiro diz qual é o armário; usar o * abre o armário e mexe no que está lá dentro.',
        pitfalls: 'Ponteiros não inicializados contêm endereços lixo aleatórios ("Ponteiros Selvagens"). Sempre inicialize com <code>NULL</code> se não tiver um endereço no momento.',
        related: ['null-void-pointers', 'dynamic-allocation', 'pass-by-value-reference']
    },
    {
        id: 'null-void-pointers',
        title: 'Ponteiros NULL, void* e Aritmética de Ponteiros',
        category: 'pointers',
        level: 'Avançado',
        summary: 'Ponteiros seguros, ponteiros genéricos e navegação direta na memória através de deslocamentos.',
        syntax: `int *ptr = NULL;\nvoid *generico = &algo;\nptr++; // Avança sizeof(tipo) bytes na memória`,
        description: `Técnicas avançadas com ponteiros:\n\n• <code>NULL</code>: Ponteiro que aponta explicitamente para o endereço zero (segurança contra acessos inválidos).\n• <code>void*</code>: Ponteiro genérico que pode apontar para qualquer tipo de dado (base para <code>malloc</code> e <code>qsort</code>).\n• <strong>Aritmética de Ponteiros</strong>: Somar <code>ptr + 1</code> não soma 1 byte, mas sim o tamanho em bytes do tipo apontado (ex: +4 bytes para int)!`,
        code: `#include <stdio.h>

int main(void) {
    int numeros[3] = {100, 200, 300};
    int *p = numeros;

    printf("Primeiro: %d\\n", *p);
    p++;
    printf("Segundo:  %d\\n", *p);

    int *seguro = NULL;
    if (seguro == NULL) {
        printf("Ponteiro está nulo e seguro.\\n");
    }

    return 0;
}`,
        output: `Primeiro: 100\nSegundo:  200\nPonteiro está nulo e seguro.`,
        tips: 'Sempre teste se um ponteiro é diferente de NULL antes de desreferenciá-lo com <code>if (ptr != NULL)</code>.',
        pitfalls: 'Desreferenciar um ponteiro NULL (<code>*NULL</code>) causa encerramento imediato do programa com "Segmentation Fault".',
        related: ['pointers-basics', 'dynamic-allocation']
    },
    {
        id: 'dynamic-allocation',
        title: 'Alocação Dinâmica de Memória (malloc, calloc, realloc, free)',
        category: 'pointers',
        level: 'Avançado',
        summary: 'Gerenciamento manual da memória Heap: solicite memória sob demanda em tempo de execução e libere-a.',
        syntax: `#include <stdlib.h>\n\ntipo *p = (tipo*) malloc(qtd * sizeof(tipo));\nfree(p);\np = NULL;`,
        description: `A alocação dinâmica aloca memória na região <strong>Heap</strong> durante a execução do programa, permitindo criar vetores de tamanho definido pelo usuário:\n\n• <code>malloc(bytes)</code>: Aloca a quantidade exata de bytes solicitada (contém lixo de memória inicial).\n• <code>calloc(qtd, tam)</code>: Aloca a memória e zera todos os bytes para 0.\n• <code>realloc(ptr, novo_tam)</code>: Redimensiona um bloco de memória já existente.\n• <code>free(ptr)</code>: Devolve a memória para o sistema operacional. OBRIGATÓRIO para evitar vazamento de memória (Memory Leak).`,
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *dungeonIds = (int*) malloc(2 * sizeof(int));
    if (dungeonIds == NULL) return 1;

    dungeonIds[0] = 101;
    dungeonIds[1] = 102;

    printf("Masmorras: %d e %d\\n", dungeonIds[0], dungeonIds[1]);

    free(dungeonIds);
    dungeonIds = NULL;
    printf("Memória liberada com sucesso!\\n");

    return 0;
}`,
        output: `Masmorras: 101 e 102\nMemória liberada com sucesso!`,
        tips: 'Toda chamada a <code>malloc</code> deve ter um <code>free</code> correspondente quando a memória não for mais necessária.',
        pitfalls: 'Nunca use um ponteiro após dar <code>free()</code> nele ("Dangling Pointer"). Aponte-o para <code>NULL</code> imediatamente após o free.',
        related: ['pointers-basics', 'ternary-sizeof']
    },

    // ═══════════════════════════════════════════════════════════════
    // 7. ESTRUTURAS PERSONALIZADAS & TIPOS
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'structs-basics',
        title: 'Estruturas (struct) e o Operador Seta (->)',
        category: 'structs',
        level: 'Intermediário',
        summary: 'Crie seus próprios tipos de dados compostos agrupando diferentes variáveis em um único registro.',
        syntax: `struct Heroi {\n    char nome[50];\n    int nivel;\n    float hp;\n};\n\nstruct Heroi h1;\nh1.nivel = 10;\nptrHeroi->nivel = 10;`,
        description: `Uma <code>struct</code> permite agrupar variáveis de tipos distintos sob um mesmo nome (a base da orientação a objetos em C).\n\n• Acesso direto via variável: usa o operador ponto (<code>heroi.nivel</code>).\n• Acesso via ponteiro de struct: usa o operador seta (<code>ptrHeroi-&gt;nivel</code>), que é um atalho elegante para <code>(*ptrHeroi).nivel</code>.`,
        code: `#include <stdio.h>
#include <string.h>

struct Personagem {
    char nome[30];
    int nivel;
};

void subirNivel(struct Personagem *p) {
    p->nivel += 1;
}

int main(void) {
    struct Personagem p1;
    strcpy(p1.nome, "Kael");
    p1.nivel = 1;

    subirNivel(&p1);
    printf("Herói: %s | Nível: %d\\n", p1.nome, p1.nivel);

    return 0;
}`,
        output: `Herói: Kael | Nível: 2`,
        tips: 'Passar structs grandes para funções via ponteiro (<code>const struct Tipo *obj</code>) economiza cópias custosas de memória na stack.',
        pitfalls: 'Esquecer o ponto e vírgula <code>;</code> após fechar a chave da declaração da struct: <code>struct Teste { int x; };</code>.',
        related: ['typedef-definition', 'pointers-basics']
    },
    {
        id: 'typedef-definition',
        title: 'Definição de Tipos com typedef',
        category: 'structs',
        level: 'Intermediário',
        summary: 'Crie apelidos legíveis e convenientes para tipos existentes e structs.',
        syntax: `typedef tipo_original NovoNome;\n\ntypedef struct {\n    int x, y;\n} Posicao;`,
        description: `O comando <code>typedef</code> cria sinônimos/apelidos para tipos de dados existentes. Ao combinar com <code>struct</code>, evita a necessidade de escrever a palavra-chave <code>struct</code> repetidamente ao declarar variáveis.`,
        code: `#include <stdio.h>

typedef struct {
    char nome[30];
    int defesa;
} Guerreiro;

int main(void) {
    Guerreiro g1 = {"Lyra", 180};
    printf("Guerreira: %s | Defesa: %d\\n", g1.nome, g1.defesa);
    return 0;
}`,
        output: `Guerreira: Lyra | Defesa: 180`,
        tips: 'Utilizar <code>typedef</code> torna o código muito mais expressivo e limpo, aproximando-o de linguagens modernas.',
        pitfalls: 'Não crie typedefs que ocultem se um tipo é um ponteiro sem necessidade, pois isso pode confundir outros programadores.',
        related: ['structs-basics', 'enums-unions']
    },
    {
        id: 'enums-unions',
        title: 'Enumerações (enum) e Uniões (union)',
        category: 'structs',
        level: 'Intermediário',
        summary: 'Criação de constantes nomeadas com enum e compartilhamento de mesmo espaço de memória com union.',
        syntax: `enum Elemento { FOGO, AGUA, TERRA, VENTO };\nunion Dado { int inteiro; float decimal; };`,
        description: `Dois recursos complementares para estruturas de dados em C:\n\n• <code>enum</code>: Define um conjunto de identificadores com valores inteiros sequenciais (iniciando em 0 por padrão). Excelente para máquinas de estados, tipos de itens e direções.\n• <code>union</code>: Permite guardar diferentes tipos de dados no MESMO espaço de memória. O tamanho da union é o tamanho do seu maior membro. Apenas um campo pode ser utilizado por vez.`,
        code: `#include <stdio.h>

typedef enum {
    ELEMENTO_FISICO, // 0
    ELEMENTO_FOGO,   // 1
    ELEMENTO_GELO    // 2
} Elemento;

int main(void) {
    Elemento danoArma = ELEMENTO_FOGO;
    printf("Código do Elemento de Fogo: %d\\n", danoArma);
    return 0;
}`,
        output: `Código do Elemento de Fogo: 1`,
        tips: 'Use <code>enum</code> para substituir "números mágicos" no código por nomes autoexplicativos.',
        pitfalls: 'Gravar em um membro da <code>union</code> sobrescreve os dados dos outros membros imediatamente.',
        related: ['typedef-definition', 'switch-case']
    },

    // ═══════════════════════════════════════════════════════════════
    // 8. MANIPULAÇÃO DE ARQUIVOS (FILE I/O)
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'file-io-basics',
        title: 'Arquivos: Abertura, Leitura e Escrita (fopen, fclose)',
        category: 'files',
        level: 'Avançado',
        summary: 'Persistência de dados em disco: salvar pontuações, carregar saves e ler relatórios.',
        syntax: `FILE *arq = fopen("save.txt", "w");\nfclose(arq);`,
        description: `A manipulação de arquivos em C é feita através do ponteiro <code>FILE*</code> definido em <code>&lt;stdio.h&gt;</code>:\n\n• <code>fopen(nome, modo)</code>: Abre o arquivo no modo especificado. Retorna <code>NULL</code> se houver erro.\n• <code>fclose(arq)</code>: Fecha o arquivo e garante que todos os dados do buffer foram gravados em disco.\n• Modos principais:\n  - <code>"r"</code> (Read): Abre para leitura (arquivo deve existir).\n  - <code>"w"</code> (Write): Cria para escrita (sobrescreve se já existir!).\n  - <code>"a"</code> (Append): Abre para adicionar conteúdo ao final sem apagar o existente.\n  - <code>"rb" / "wb"</code>: Modos binários para imagens, saves binários, etc.`,
        code: `#include <stdio.h>

int main(void) {
    FILE *arquivo = fopen("guild_save.txt", "w");
    if (arquivo == NULL) return 1;

    fprintf(arquivo, "Jogador: Arkan\\nNivel: 45\\n");
    fclose(arquivo);

    printf("Arquivo guild_save.txt gravado com sucesso!\\n");
    return 0;
}`,
        output: `Arquivo guild_save.txt gravado com sucesso!`,
        tips: 'Sempre confira se o ponteiro de arquivo retornado por <code>fopen</code> não é <code>NULL</code> antes de tentar ler ou escrever.',
        pitfalls: 'Esquecer de chamar <code>fclose()</code> pode deixar o arquivo corrompido, bloqueado pelo sistema operacional ou perder dados que estavam no buffer.',
        related: ['file-functions-advanced', 'pointers-basics']
    },
    {
        id: 'file-functions-advanced',
        title: 'Funções de Arquivos: fprintf, fscanf, fgets e binários (fread, fwrite)',
        category: 'files',
        level: 'Avançado',
        summary: 'Gravação e leitura formatada de texto e manipulação de arquivos binários de alta performance.',
        syntax: `fprintf(arq, "Formato: %d", num);\nfscanf(arq, "%d", &num);\nfwrite(ptr, tamanho, qtd, arq);\nfread(ptr, tamanho, qtd, arq);`,
        description: `• <code>fprintf / fscanf</code>: Equivalentes a printf e scanf, mas direcionados para fluxos de arquivos em texto.\n• <code>fgets(buffer, tam, arq)</code>: Lê uma linha de texto com segurança contra buffer overflow.\n• <code>fwrite / fread</code>: Escrevem e leem blocos binários inteiros de structs diretamente do disco em altíssima velocidade.`,
        code: `#include <stdio.h>

typedef struct {
    int id;
    int score;
} Recorde;

int main(void) {
    Recorde r1 = {101, 9999};

    FILE *fBin = fopen("rank.bin", "wb");
    if (fBin != NULL) {
        fwrite(&r1, sizeof(Recorde), 1, fBin);
        fclose(fBin);
        printf("Recorde Binário Gravado: ID %d | Score %d\\n", r1.id, r1.score);
    }

    return 0;
}`,
        output: `Recorde Binário Gravado: ID 101 | Score 9999`,
        tips: 'Arquivos binários são ideais para salvar structs completas com apenas 1 linha de código através do <code>fwrite</code>.',
        pitfalls: 'Salvar ponteiros com <code>fwrite</code> não salvará o conteúdo apontado, mas apenas o endereço de memória temporário que se tornará inválido após fechar o programa.',
        related: ['file-io-basics', 'structs-basics']
    }
];
