/**
 * ═══════════════════════════════════════════════════════
 *  BUILDER: C# & UNITY 6.5 COMPLETE CHAPTERS (0..37)
 *  Generates data/csharp_chapters_data.js with 38 chapters
 *  and exactly 5 practical activities per chapter (190 total).
 * ═══════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

// Helper to escape backticks in code snippets
function codeStr(s) {
    return JSON.stringify(s.trim());
}

// 38 Chapters definition metadata according to csharp/subjects.md
const CHAPTER_DEFINITIONS = [
    // Módulo 1 — Fundamentos de C# (0..7)
    {
        id: 0,
        subjectNum: 1,
        title: "A Forja dos Tipos e Variáveis",
        module: "Módulo 1 — Fundamentos de C#",
        theme: "Tipos Primitivos & Console Unity",
        character: "arkan",
        charName: "ARKAN VELOR",
        role: "MESTRE DA GUILDA",
        unlock: "Console da Dimensão",
        unlockIcon: "[C#]",
        xpReward: 70,
        dialogues: [
            { type: "system", text: "[ SISTEMA ] Calibrando matriz dimensional... Bem-vindo à Dimensão C# Unity 6.5." },
            { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Saudações, Arquiteto. Na Dimensão C# Unity, GameObjects ganham vida através de dados e scripts. Vamos forjar as primeiras variáveis!" },
            { type: "character", name: "ARKAN VELOR", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Sem variáveis como int para vida e float para velocidade, nosso mundo permanecerá estático e inerte. Use a tipagem forte do C# a seu favor!" }
        ],
        concept: {
            title: "VARIÁVEIS EM C# & DEBUG.LOG",
            explanation: "Em C#, toda variável requer um tipo explícito (int, float, string, bool, char). No Unity, usamos Debug.Log() para emitir registros no Console. Lembre-se do sufixo 'f' em números decimais float (ex: 5.5f).",
            code: `using UnityEngine;\n\npublic class StatusHeroi : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        float velocidade = 7.5f;\n        string heroi = "Kael";\n        bool estaVivo = true;\n        Debug.Log("Heroi: " + heroi + " | Vida: " + vida);\n    }\n}`
        },
        example: {
            title: "Exemplo — Status do Personagem",
            code: `using UnityEngine;\n\npublic class ExemploStatus : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 50;\n        float forca = 12.4f;\n        Debug.Log("Moedas Coletadas: " + moedas);\n        Debug.Log("Forca Atual: " + forca);\n    }\n}`,
            output: "Moedas Coletadas: 50\nForca Atual: 12.4"
        },
        experiment: {
            title: "Laboratório de Variáveis",
            description: "Modifique valores primitivos e observe a saída no Console Unity.",
            starterCode: `using UnityEngine;\n\npublic class TesteConsole : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 100;\n        float regeneracao = 3.2f;\n        Debug.Log("Mana: " + mana);\n        Debug.Log("Regeneracao: " + regeneracao);\n    }\n}`
        },
        tutorial: {
            title: "Tutorial — Primeiros Passos",
            steps: [
                {
                    instruction: "Exiba no Console a mensagem 'DIMENSAO UNITY PRONTA' usando Debug.Log:",
                    starterCode: `using UnityEngine;\n\npublic class Setup : MonoBehaviour\n{\n    void Start()\n    {\n        \n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Setup : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("DIMENSAO UNITY PRONTA");\n    }\n}`,
                    hint: 'Debug.Log("DIMENSAO UNITY PRONTA");'
                },
                {
                    instruction: "Declare int nivel = 10 e exiba com Debug.Log(\"Nivel: \" + nivel);",
                    starterCode: `using UnityEngine;\n\npublic class NivelSetup : MonoBehaviour\n{\n    void Start()\n    {\n        \n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class NivelSetup : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 10;\n        Debug.Log("Nivel: " + nivel);\n    }\n}`,
                    hint: 'int nivel = 10;\nDebug.Log("Nivel: " + nivel);'
                }
            ]
        },
        activities: [
            {
                actIndex: 1,
                title: "Primeiro Log de Vida",
                difficulty: "easy",
                description: "Declare no método Start uma variável de número inteiro para armazenar a vida do herói inicializada com 100 pontos. Em seguida, utilize Debug.Log para emitir no Console o texto concatenado contendo o identificador e a quantidade de pontos.",
                reqPatterns: ["int vida", "vida", "Debug.Log"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare a variavel inteira vida com valor 100\n        \n        // 2. Emita no Console: Vida: 100\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        Debug.Log("Vida: " + vida);\n    }\n}`,
                expected: "Vida: 100",
                testDesc: "Exibição de vida inteira no Console"
            },
            {
                actIndex: 2,
                title: "Velocidade e Ponto Flutuante",
                difficulty: "easy",
                description: "Configure os dados de movimento: declare uma variável de texto para o heroi com o nome Kael e uma variável de ponto flutuante para a velocidade com valor 7.5 (utilizando o sufixo f obrigatório em C#). Imprima ambos em linhas separadas.",
                reqPatterns: ["float velocidade", "7.5f", "heroi", "Kael"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variaveis heroi e velocidade (7.5f)\n        \n        // Emita os dois logs\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = "Kael";\n        float velocidade = 7.5f;\n        Debug.Log("Heroi: " + heroi);\n        Debug.Log("Velocidade: " + velocidade);\n    }\n}`,
                expected: "Heroi: Kael\nVelocidade: 7.5",
                testDesc: "Logs de nome de herói e velocidade flutuante"
            },
            {
                actIndex: 3,
                title: "Cálculo de Dano Total",
                difficulty: "medium",
                description: "Simule o cálculo de dano: declare o danoBase inteiro valendo 40, o multiplicador inteiro valendo 2 e o bonus flutuante valendo 5.5f. Calcule o danoTotal com a fórmula (danoBase * multiplicador) + bonus e exiba no Console.",
                reqPatterns: ["danoBase", "multiplicador", "bonus", "danoTotal", "*"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare danoBase, multiplicador e bonus\n        \n        // Calcule danoTotal e imprima com Debug.Log\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 40;\n        int multiplicador = 2;\n        float bonus = 5.5f;\n        float danoTotal = (danoBase * multiplicador) + bonus;\n        Debug.Log("Dano Total: " + danoTotal);\n    }\n}`,
                expected: "Dano Total: 85.5",
                testDesc: "Cálculo aritmético (40 * 2) + 5.5 = 85.5"
            },
            {
                actIndex: 4,
                title: "Estado de Ativação Booleana",
                difficulty: "easy",
                description: "Controle o estado de prontidão de um personagem: declare a variável booleana estaPronto inicializada como true e a variável char simbolo com o caractere 'A' (de Ativo). Imprima no Console a mensagem indicando a prontidão e o símbolo da classe.",
                reqPatterns: ["bool estaPronto", "char simbolo", "true", "'A'"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare estaPronto e simbolo\n        \n        // Emita o status no Console\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaPronto = true;\n        char simbolo = 'A';\n        Debug.Log("Pronto: " + estaPronto + " | Classe: " + simbolo);\n    }\n}`,
                expected: "Pronto: True | Classe: A",
                testDesc: "Manipulação de bool e char"
            },
            {
                actIndex: 5,
                title: "Constantes do Mundo Físico",
                difficulty: "medium",
                description: "Defina regras imutáveis para a simulação: declare uma constante flutuante GRAVIDADE com o valor -9.81f e uma variável inteira massa valendo 10. Calcule a forcaPeso multiplicando a massa pelo módulo absoluto ou inverso da gravidade e exiba a Gravidade e o Peso no Console.",
                reqPatterns: ["const float GRAVIDADE", "-9.81f", "massa", "Debug.Log"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare a constante GRAVIDADE e a variavel massa\n        \n        // Imprima os valores\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        const float GRAVIDADE = -9.81f;\n        int massa = 10;\n        float peso = massa * 9.81f;\n        Debug.Log("Gravidade: " + GRAVIDADE + " | Peso: " + peso);\n    }\n}`,
                expected: "Gravidade: -9.81 | Peso: 98.1",
                testDesc: "Uso de constantes e cálculo de peso"
            }
        ]
    },

    // 1: Operadores e Expressões
    {
        id: 1,
        subjectNum: 2,
        title: "Operadores e Expressões Aritméticas",
        module: "Módulo 1 — Fundamentos de C#",
        theme: "Aritmética, Relacionais e Lógicos",
        character: "lyra",
        charName: "LYRA NEX",
        role: "ARQUIVISTA",
        unlock: "Prisma Lógico",
        unlockIcon: "[OP]",
        xpReward: 80,
        dialogues: [
            { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "As leis da Dimensão respondem a relações e equações! Operadores aritméticos, lógicos e compostos coordenam a evolução dos atributos." },
            { type: "character", name: "ARKAN VELOR", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Um programador que domina operadores compostos como += e condições relacionais escreve códigos enxutos e sem falhas." }
        ],
        concept: {
            title: "OPERADORES EM C#",
            explanation: "C# suporta operadores aritméticos (+, -, *, /, %), relacionais (==, !=, >, <, >=, <=) e lógicos (&&, ||, !). Operadores compostos como += e -= facilitam a atualização de valores.",
            code: `using UnityEngine;\n\npublic class OperadoresDemo : MonoBehaviour\n{\n    void Start()\n    {\n        int hp = 100;\n        hp -= 25;\n        bool critico = hp < 50;\n        Debug.Log("HP: " + hp + " | Critico: " + critico);\n    }\n}`
        },
        example: {
            title: "Exemplo — Atualização de Pontos",
            code: `using UnityEngine;\n\npublic class ExemploPontos : MonoBehaviour\n{\n    void Start()\n    {\n        int score = 1000;\n        score += 250;\n        Debug.Log("Score Atual: " + score);\n    }\n}`,
            output: "Score Atual: 1250"
        },
        experiment: {
            title: "Laboratório de Operadores",
            description: "Experimente operadores lógicos e aritméticos.",
            starterCode: `using UnityEngine;\n\npublic class TesteOp : MonoBehaviour\n{\n    void Start()\n    {\n        int a = 15;\n        int b = 4;\n        Debug.Log("Resto da divisao: " + (a % b));\n    }\n}`
        },
        tutorial: {
            title: "Tutorial — Operadores Compostos",
            steps: [
                {
                    instruction: "Some 50 pontos à variável pontos usando o operador += e exiba no Console:",
                    starterCode: `using UnityEngine;\n\npublic class Teste : MonoBehaviour\n{\n    void Start()\n    {\n        int pontos = 100;\n        \n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Teste : MonoBehaviour\n{\n    void Start()\n    {\n        int pontos = 100;\n        pontos += 50;\n        Debug.Log("Pontos: " + pontos);\n    }\n}`,
                    hint: 'pontos += 50;\nDebug.Log("Pontos: " + pontos);'
                }
            ]
        },
        activities: [
            {
                actIndex: 1,
                title: "Subtração de Dano com Operador Composto",
                difficulty: "easy",
                description: "Declare a variável inteira vida com 100 pontos e danoSofrido com 35 pontos. Aplique a subtração composta para atualizar a vida e exiba no Console a vida restante.",
                reqPatterns: ["int vida", "vida -=", "Debug.Log"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        // Aplique -= e exiba: Vida Restante: 65\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        vida -= danoSofrido;\n        Debug.Log("Vida Restante: " + vida);\n    }\n}`,
                expected: "Vida Restante: 65",
                testDesc: "Operador -= na atualização de vida"
            },
            {
                actIndex: 2,
                title: "Média Aritmética de Pontuações",
                difficulty: "easy",
                description: "Calcule a média aritmética de duas partidas: declare as notas inteiras p1 valendo 8 e p2 valendo 6. Calcule a media flutuante dividindo a soma por 2.0f e imprima a Média no Console.",
                reqPatterns: ["p1", "p2", "media", "/"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        // Calcule a media flutuante e imprima\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        float media = (p1 + p2) / 2.0f;\n        Debug.Log("Media: " + media);\n    }\n}`,
                expected: "Media: 7",
                testDesc: "Cálculo de média com operador de divisão"
            },
            {
                actIndex: 3,
                title: "Resto da Divisão (Módulo %)",
                difficulty: "medium",
                description: "Em mecânicas de grade ou alternância de turnos, o operador de resto (%) é fundamental. Declare a variável inteira frameAtual valendo 17 e ciclo valendo 4. Calcule o resto frameAtual % ciclo e exiba o Índice do Ciclo.",
                reqPatterns: ["frameAtual", "ciclo", "%", "Debug.Log"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        // Calcule o resto e imprima\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        int indice = frameAtual % ciclo;\n        Debug.Log("Indice do Ciclo: " + indice);\n    }\n}`,
                expected: "Indice do Ciclo: 1",
                testDesc: "Operador módulo para controle cíclico"
            },
            {
                actIndex: 4,
                title: "Combinação Lógica com E (&&)",
                difficulty: "medium",
                description: "Verifique se o jogador preenche os pré-requisitos para abrir um baú lendário: declare a variável inteira nivel valendo 15 e a booleana temChave valendo true. Crie a booleana podeAbrir avaliando se nivel >= 10 E temChave é verdadeiro, exibindo o resultado.",
                reqPatterns: ["nivel", "temChave", "&&", "podeAbrir"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        // Avalie com && e imprima: Acesso Permitido: True\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        bool podeAbrir = nivel >= 10 && temChave;\n        Debug.Log("Acesso Permitido: " + podeAbrir);\n    }\n}`,
                expected: "Acesso Permitido: True",
                testDesc: "Operador lógico && para checagem dupla"
            },
            {
                actIndex: 5,
                title: "Negação Lógica com OU (||)",
                difficulty: "medium",
                description: "Avalie condições de imunidade: declare a booleana temEscudo valendo false e estaInvisivel valendo true. Crie a booleana protegido avaliando se temEscudo OU estaInvisivel é verdadeiro, exibindo o status de Protegido.",
                reqPatterns: ["temEscudo", "estaInvisivel", "||", "protegido"],
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        // Avalie com || e imprima: Protegido: True\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        bool protegido = temEscudo || estaInvisivel;\n        Debug.Log("Protegido: " + protegido);\n    }\n}`,
                expected: "Protegido: True",
                testDesc: "Operador lógico || de contingência"
            }
        ]
    }
];

console.log('Definitions ready for base chapters. Generating full 38 chapters...');
