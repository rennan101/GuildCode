/**
 * GUILDCODE - BASE DE DADOS DO GLOSSÁRIO DE LINGUAGEM C
 * Contém explicações didáticas, sintaxe formal, códigos de exemplo,
 * dicas práticas ("Guild Wisdom") e armadilhas comuns para aventureiros de código.
 */

window.C_GLOSSARY_CATEGORIES = [
    { id: 'all', name: 'Todos os Tópicos', icon: '✦' },
    { id: 'basics', name: 'Fundamentos & Tipos', icon: '📦' },
    { id: 'operators', name: 'Operadores', icon: '⚡' },
    { id: 'control', name: 'Controle de Fluxo', icon: '🔀' },
    { id: 'functions', name: 'Funções & Modularização', icon: '🧩' },
    { id: 'arrays', name: 'Vetores & Strings', icon: '📜' },
    { id: 'pointers', name: 'Ponteiros & Memória', icon: '🔮' },
    { id: 'structs', name: 'Structs & Tipos Custom', icon: '🏛️' },
    { id: 'files', name: 'Manipulação de Arquivos', icon: '📂' }
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

    // VIDA_MAXIMA = 2000; // ERRO DE COMPILAÇÃO! const não pode mudar.

    return 0;
}`,
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
    int idade;
    float poder;

    printf("Digite o nível de poder do seu campeão: ");
    scanf("%f", &poder); // Note o & obrigatório

    printf("Digite sua idade: ");
    scanf("%d", &idade);

    printf("Poder Registrado: %.2f | Idade: %d anos\\n", poder, idade);

    return 0;
}`,
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
    printf("Espada Élfica\\t1\\t400G\\n");
    printf("Caminho do arquivo: C:\\\\Guilda\\\\Save.dat\\n");
    printf("O NPC disse: \\"Avance sem medo!\\"\\n");

    return 0;
}`,
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

    // Divisão com casas decimais (Casting para float)
    float divReal = (float)a / b;
    printf("Divisão Real: %.2f\\n", divReal); // 3.40

    return 0;
}`,
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

    // Operador AND (&&) e NOT (!)
    if (nivel >= 20 && possuiChaveDungeon && !estaEnvenenado) {
        printf("Acesso concedido ao Covil do Dragão!\\n");
    } else {
        printf("Requisitos não atendidos.\\n");
    }

    return 0;
}`,
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
    xp += 50; // Agora xp = 150
    printf("XP: %d\\n", xp);

    int a = 5;
    int b = a++; // b recebe 5, depois a vira 6
    printf("Pós-incremento -> a: %d, b: %d\\n", a, b);

    int c = 5;
    int d = ++c; // c vira 6 primeiro, depois d recebe 6
    printf("Pré-incremento -> c: %d, d: %d\\n", c, d);

    return 0;
}`,
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
    int hp = 0;
    
    // Operador Ternário:
    const char* status = (hp > 0) ? "VIVO E PRONTO" : "DERROTADO";
    printf("Status do Herói: %s\\n\\n", status);

    // Operador sizeof:
    printf("=== TAMANHO DOS TIPOS NA MEMÓRIA ===\\n");
    printf("char:   %zu byte\\n", sizeof(char));
    printf("int:    %zu bytes\\n", sizeof(int));
    printf("float:  %zu bytes\\n", sizeof(float));
    printf("double: %zu bytes\\n", sizeof(double));

    return 0;
}`,
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

    // Ativando Fogo e Veneno
    buffs |= (FLAG_FOGO | FLAG_VENENO); // 0101 (5)

    // Verificando se possui Veneno ativo
    if (buffs & FLAG_VENENO) {
        printf("Inimigo está envenenado!\\n");
    }

    // Removendo buff de Fogo
    buffs &= ~FLAG_FOGO;

    printf("Buffs atuais (binário decimal): %d\\n", buffs);

    return 0;
}`,
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
    } else if (pontuacao >= 50) {
        printf("Classificação: Rank B - Aventureiro.\\n");
    } else {
        printf("Classificação: Rank F - Tente Novamente!\\n");
    }

    return 0;
}`,
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

    printf("Selecione sua Guilda:\\n");
    printf("1 - Cavaleiros de Ferro\\n");
    printf("2 - Magos de Arcádia\\n");
    printf("3 - Sombras da Noite\\n");

    switch (opcao) {
        case '1':
            printf("Você escolheu: Cavaleiros (+Defesa)\\n");
            break;
        case '2':
            printf("Você escolheu: Magos (+Dano Mágico)\\n");
            break;
        case '3':
            printf("Você escolheu: Sombras (+Agilidade)\\n");
            break;
        default:
            printf("Opção Inválida!\\n");
            break;
    }

    return 0;
}`,
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
    // Exemplo 1: While clássico
    int vidaMonstro = 30;
    while (vidaMonstro > 0) {
        printf("Atacando! Vida do monstro: %d\\n", vidaMonstro);
        vidaMonstro -= 10;
    }
    printf("Monstro derrotado!\\n\\n");

    // Exemplo 2: Do-While para menu
    int comando = 0;
    do {
        printf("Menu: [1] Continuar | [0] Sair -> ");
        comando = 0; // Simulando escolha de saída
    } while (comando != 0);

    return 0;
}`,
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
    printf("Contagem regressiva para o ataque:\\n");

    // Contagem de 5 até 1
    for (int i = 5; i > 0; i--) {
        printf("%d... ", i);
    }
    printf("FOGO! 🔥\\n\\n");

    // Percorrendo valores pares
    printf("Multiplos de 2 até 10:\\n");
    for (int i = 2; i <= 10; i += 2) {
        printf("%d ", i);
    }
    printf("\\n");

    return 0;
}`,
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
    printf("Buscando o item lendário na masmorra...\\n");

    for (int sala = 1; sala <= 10; sala++) {
        if (sala == 4) {
            printf("Sala 4 inundada! Pulando com continue...\\n");
            continue; // Pula a sala 4
        }

        if (sala == 7) {
            printf("Baú Lendário encontrado na Sala 7! Parando com break.\\n");
            break; // Encerra o loop inteiro
        }

        printf("Explorando sala %d...\\n", sala);
    }

    return 0;
}`,
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

// 1. Protótipo da Função
int calcularDano(int ataqueBase, int multiplicadorCritico);
void saudarHeroi(char nome[]);

int main(void) {
    saudarHeroi("Arkan");

    int danoFinal = calcularDano(150, 2);
    printf("Dano Crítico Causado: %d HP!\\n", danoFinal);

    return 0;
}

// 2. Definições das Funções
int calcularDano(int ataqueBase, int multiplicadorCritico) {
    return ataqueBase * multiplicadorCritico;
}

void saudarHeroi(char nome[]) {
    printf("Saudações ao herói %s!\\n", nome);
}
`,
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

// Passagem por Valor (não altera o original)
void curarPorValor(int hp) {
    hp += 50; 
}

// Passagem por Referência (altera a variável original!)
void curarPorReferencia(int *hp) {
    *hp += 50; // Altera o conteúdo apontado
}

int main(void) {
    int vida = 100;

    curarPorValor(vida);
    printf("Após curarPorValor: %d (Inalterado)\\n", vida);

    curarPorReferencia(&vida); // Passamos o endereço com &
    printf("Após curarPorReferencia: %d (Alterado!)\\n", vida);

    return 0;
}`,
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

// Cálculo do Fatorial: n! = n * (n-1)!
long long int fatorial(int n) {
    if (n <= 1) {
        return 1; // Caso Base
    }
    return n * fatorial(n - 1); // Passo Recursivo
}

int main(void) {
    int num = 6;
    printf("Fatorial de %d! = %lld\\n", num, fatorial(num)); // 720
    return 0;
}`,
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

#define TAM_MAXIMO 100
#define QUADRADO(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
    printf("Capacidade Máxima: %d\\n", TAM_MAXIMO);
    printf("Quadrado de 7: %d\\n", QUADRADO(7));
    printf("Maior entre 45 e 89: %d\\n", MAX(45, 89));

    return 0;
}`,
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
    int inventario[5] = {10, 25, 50, 75, 100}; // Poções por slot

    printf("Item no Slot 0: %d\\n", inventario[0]);
    printf("Item no Slot 4 (Último): %d\\n\\n", inventario[4]);

    // Percorrendo todo o vetor com for
    printf("=== CONTEÚDO DO INVENTÁRIO ===\\n");
    for (int i = 0; i < 5; i++) {
        printf("Slot [%d]: %d itens\\n", i, inventario[i]);
    }

    return 0;
}`,
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
    // Mapa da Masmorra: 0 = Livre, 1 = Parede, 2 = Baú
    int mapa[3][4] = {
        {0, 1, 0, 2},
        {0, 1, 0, 0},
        {0, 0, 0, 1}
    };

    printf("=== MAPA DA MASMORRA (3x4) ===\\n");
    for (int l = 0; l < 3; l++) {
        for (int c = 0; c < 4; c++) {
            if (mapa[l][c] == 1) printf("[#] "); // Parede
            else if (mapa[l][c] == 2) printf("[B] "); // Baú
            else printf("[.] "); // Livre
        }
        printf("\\n");
    }

    return 0;
}`,
        tips: 'Na memória do computador, matrizes são armazenadas de forma linear linha após linha (Row-Major Order).',
        pitfalls: 'Ao passar uma matriz para uma função, você DEVE especificar obrigatoriamente a dimensão das colunas no parâmetro: <code>void desenhar(int mapa[][4]);</code>.',
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
    // Declarando e inicializando
    char titulo[30] = "Mestre da Guilda";
    
    // Mostrando a string completa
    printf("Título: %s\\n", titulo);

    // Manipulando caractere individual
    titulo[0] = 'm'; // Altera 'M' para 'm'
    printf("Modificado: %s\\n", titulo);

    return 0;
}`,
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

    // 1. Tamanho com strlen
    printf("Tamanho do nome: %zu letras\\n", strlen(nome));

    // 2. Concatenação com strcat
    strcat(nome, sobrenome);
    printf("Nome Completo: %s\\n", nome);

    // 3. Comparação com strcmp
    if (strcmp(nome, "Arkan Velor") == 0) {
        printf("Identidade confirmada com sucesso!\\n");
    }

    // 4. Cópia com strcpy
    char copia[50];
    strcpy(copia, nome);
    printf("Cópia de backup: %s\\n", copia);

    return 0;
}`,
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
    int *ptrMana = &mana; // ptrMana aponta para a variável mana

    printf("Valor da mana: %d\\n", mana);
    printf("Endereço de memória de mana: %p\\n", (void*)&mana);
    printf("Endereço guardado em ptrMana: %p\\n", (void*)ptrMana);
    printf("Valor acessado através do ponteiro (*ptrMana): %d\\n\\n", *ptrMana);

    // Alterando a mana através do ponteiro!
    *ptrMana = 250;
    printf("Novo valor de mana após *ptrMana = 250: %d\\n", mana);

    return 0;
}`,
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
    int *p = numeros; // Aponta para o primeiro elemento (numeros[0])

    // Navegando com aritmética de ponteiros
    printf("Primeiro: %d (no endereço %p)\\n", *p, (void*)p);
    
    p++; // Avança para o próximo int (4 bytes à frente)
    printf("Segundo:  %d (no endereço %p)\\n", *p, (void*)p);

    p++; // Avança mais um
    printf("Terceiro: %d (no endereço %p)\\n\\n", *p, (void*)p);

    // Ponteiro NULL seguro
    int *seguro = NULL;
    if (seguro == NULL) {
        printf("Ponteiro está nulo e seguro para não ser acessado indevidamente.\\n");
    }

    return 0;
}`,
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
    int n = 3;

    // 1. Alocando vetor dinâmico de 3 inteiros
    int *dungeonIds = (int*) malloc(n * sizeof(int));

    // Verificação de sucesso
    if (dungeonIds == NULL) {
        printf("Falha crítica: Memória insuficiente!\\n");
        return 1;
    }

    // Preenchendo dados
    dungeonIds[0] = 101;
    dungeonIds[1] = 102;
    dungeonIds[2] = 103;

    for (int i = 0; i < n; i++) {
        printf("Masmorra ID: %d\\n", dungeonIds[i]);
    }

    // 2. Liberando a memória alocada
    free(dungeonIds);
    dungeonIds = NULL; // Boa prática de segurança
    printf("Memória liberada com sucesso!\\n");

    return 0;
}`,
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
    int ataque;
};

// Função que recebe ponteiro para a struct
void subirNivel(struct Personagem *p) {
    p->nivel += 1;
    p->ataque += 15; // Operador seta acessa campos via ponteiro
}

int main(void) {
    struct Personagem p1;
    strcpy(p1.nome, "Kael Thorn");
    p1.nivel = 1;
    p1.ataque = 25;

    printf("Antes: %s (Nível %d | Dano %d)\\n", p1.nome, p1.nivel, p1.ataque);

    subirNivel(&p1);
    printf("Após Evolução: %s (Nível %d | Dano %d)\\n", p1.nome, p1.nivel, p1.ataque);

    return 0;
}`,
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

// Definindo um apelido 'Guerreiro' para a struct anônima
typedef struct {
    char nome[30];
    int defesa;
} Guerreiro;

typedef unsigned long long int uint64; // Apelido para tipo longo

int main(void) {
    Guerreiro g1 = {"Lyra Nex", 180}; // Não precisa escrever 'struct'
    uint64 idGuilda = 9988776655443322ULL;

    printf("Guerreira: %s | Armadura: %d\\n", g1.nome, g1.defesa);
    printf("ID da Guilda: %llu\\n", idGuilda);

    return 0;
}`,
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

// Enumeração de Elementos
typedef enum {
    ELEMENTO_FISICO, // 0
    ELEMENTO_FOGO,   // 1
    ELEMENTO_GELO,   // 2
    ELEMENTO_TROVAO  // 3
} Elemento;

// Union para valor de atributo flexível
typedef union {
    int valorInteiro;
    float valorPercentual;
} Atributo;

int main(void) {
    Elemento danoArma = ELEMENTO_FOGO;
    printf("Código do Elemento de Fogo: %d\\n", danoArma);

    Atributo bonus;
    bonus.valorPercentual = 15.5f; // Ocupa a memória da union
    printf("Bônus Mágico: %.1f%%\\n", bonus.valorPercentual);

    return 0;
}`,
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
    // 1. Gravando dados em arquivo
    FILE *arquivo = fopen("guild_save.txt", "w");
    if (arquivo == NULL) {
        printf("Erro ao criar o arquivo de save!\\n");
        return 1;
    }

    fprintf(arquivo, "Jogador: Arkan\\nNivel: 45\\nOuro: 8500\\n");
    fclose(arquivo);
    printf("Save gravado com sucesso!\\n\\n");

    // 2. Lendo dados do arquivo
    FILE *leitura = fopen("guild_save.txt", "r");
    if (leitura != NULL) {
        char linha[100];
        printf("=== CONTEÚDO DO SAVE ===\\n");
        while (fgets(linha, sizeof(linha), leitura) != NULL) {
            printf("%s", linha);
        }
        fclose(leitura);
    }

    return 0;
}`,
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
    char nome[20];
    int score;
} Recorde;

int main(void) {
    Recorde r1 = {1, "Rennan", 9999};

    // Gravando Struct Binária em disco com fwrite
    FILE *fBin = fopen("ranking.bin", "wb");
    if (fBin != NULL) {
        fwrite(&r1, sizeof(Recorde), 1, fBin);
        fclose(fBin);
    }

    // Lendo Struct Binária de volta com fread
    Recorde carregado;
    FILE *fLeitura = fopen("ranking.bin", "rb");
    if (fLeitura != NULL) {
        fread(&carregado, sizeof(Recorde), 1, fLeitura);
        fclose(fLeitura);
        printf("Recorde Carregado: ID %d | %s | Pontos: %d\\n", 
               carregado.id, carregado.nome, carregado.score);
    }

    return 0;
}`,
        tips: 'Arquivos binários são ideais para salvar structs completas com apenas 1 linha de código através do <code>fwrite</code>.',
        pitfalls: 'Salvar ponteiros com <code>fwrite</code> não salvará o conteúdo apontado, mas apenas o endereço de memória temporário que se tornará inválido após fechar o programa.',
        related: ['file-io-basics', 'structs-basics']
    }
];
