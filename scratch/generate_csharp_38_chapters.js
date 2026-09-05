/**
 * ═══════════════════════════════════════════════════════════════
 *  BUILDER SCRIPT: 38 CAPÍTULOS DE C# E UNITY 6.5 (GUILDCODE)
 *  Alinhado 1:1 com csharp/subjects.md
 *  Cada capítulo contém:
 *    - Narrativa imersiva com os guardiões da guilda
 *    - Conceito teórico detalhado
 *    - Exemplo de código
 *    - Experimento interativo
 *    - Tutorial guiado
 *    - 5 Atividades Práticas Didáticas com validação estrutural anti-cheat
 * ═══════════════════════════════════════════════════════════════
 */
const fs = require("fs");
const path = require("path");
const CSharpInterpreter = require("./csharp/interpreter.js");

// Definição dos 38 assuntos e metadados
const subjectsMeta = [
    // MÓDULO 1: Fundamentos de C# (0..7)
    {
        id: 0,
        num: 1,
        title: "Variáveis e Tipos de Dados em C#",
        theme: "Fundamentos C# & Console Unity",
        character: "arkan",
        xpReward: 70,
        unlock: "Console da Dimensão",
        unlockIcon: "[C#]",
        concept: {
            title: "VARIÁVEIS PRIMITIVAS & DEBUG.LOG",
            explanation: "Variáveis armazenam dados essenciais para o estado dos GameObjects. Em C#, utilizamos int para inteiros, float para números decimais (com sufixo 'f'), string para texto e bool para estados binários.",
            code: `using UnityEngine;\n\npublic class HeroiStatus : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        float velocidade = 7.5f;\n        string nome = "Kael";\n        bool vivo = true;\n        Debug.Log("Heroi: " + nome + " | Vida: " + vida);\n    }\n}`
        },
        example: {
            title: "Exemplo — Status no Console",
            code: `using UnityEngine;\n\npublic class ExemploVar : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 50;\n        Debug.Log("Moedas Coletadas: " + moedas);\n    }\n}`,
            output: "Moedas Coletadas: 50"
        },
        experiment: {
            title: "Experimento — Modificando Atributos",
            description: "Altere a velocidade e o nome do herói para verificar como os dados reagem no console.",
            starterCode: `using UnityEngine;\n\npublic class ExperimentoVar : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 80;\n        float regeneracao = 2.5f;\n        Debug.Log("Mana: " + mana + " | Regen: " + regeneracao);\n    }\n}`
        },
        tutorial: {
            title: "Tutorial — Declarando e Emitindo Dados",
            steps: [
                {
                    instruction: "Declare uma variável inteira 'armadura' com o valor 25 e emita no console.",
                    starterCode: `using UnityEngine;\n\npublic class Tut : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare int armadura = 25;\n    }\n}`,
                    solution: `using UnityEngine;\n\npublic class Tut : MonoBehaviour\n{\n    void Start()\n    {\n        int armadura = 25;\n        Debug.Log("Armadura: " + armadura);\n    }\n}`,
                    hint: "Use int armadura = 25; seguido de Debug.Log(\"Armadura: \" + armadura);"
                }
            ]
        },
        activities: [
            {
                id: "cs_act_0_1",
                title: "Inicializando a Vida do Herói",
                difficulty: "easy",
                description: "Crie uma variável para armazenar os pontos de vida do herói com o valor inteiro de 100. Em seguida, transmita para o Console da Engine no formato exato:<br><code>Vida: 100</code>",
                validationRules: { requiredPatterns: ["int vida", "100", "Debug.Log"] },
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare a variavel de vida com valor 100\n        \n        // 2. Exiba com Debug.Log\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        Debug.Log("Vida: " + vida);\n    }\n}`,
                tests: [{ input: "", expected: "Vida: 100", description: "Log de Vida no Console" }],
                hints: [
                    { level: "I", text: "Declare uma variável inteira com o identificador 'vida'." },
                    { level: "II", text: "Atribua 100 à variável: int vida = 100;" },
                    { level: "III", text: "Imprima usando Debug.Log(\"Vida: \" + vida);" }
                ]
            },
            {
                id: "cs_act_0_2",
                title: "Calibrando Velocidade e Flutuantes",
                difficulty: "easy",
                description: "Configure os dados iniciais do herói: declare uma variável textual <code>heroi</code> com o nome \"Kael\" e uma variável decimal <code>velocidade</code> valendo 7.5 (lembre-se do sufixo 'f' de float). Emita no Console em linhas separadas:<br><code>Heroi: Kael</code><br><code>Velocidade: 7.5</code>",
                validationRules: { requiredPatterns: ["string heroi", "Kael", "float velocidade", "7.5f", "Debug.Log"] },
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare string heroi e float velocidade\n        \n        // Emita as duas linhas com Debug.Log\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = "Kael";\n        float velocidade = 7.5f;\n        Debug.Log("Heroi: " + heroi);\n        Debug.Log("Velocidade: " + velocidade);\n    }\n}`,
                tests: [{ input: "", expected: "Heroi: Kael\nVelocidade: 7.5", description: "Nome e velocidade flutuante" }],
                hints: [
                    { level: "I", text: "Defina string heroi = \"Kael\"; e float velocidade = 7.5f;" },
                    { level: "II", text: "Faça duas chamadas de Debug.Log separadas." }
                ]
            },
            {
                id: "cs_act_0_3",
                title: "Cálculo de Dano Total",
                difficulty: "medium",
                description: "Simule o cálculo aritmético de ataque: declare inteiros <code>danoBase</code> valendo 40 e <code>multiplicador</code> valendo 2, e o flutuante <code>bonus</code> valendo 5.5f. Calcule o <code>danoTotal</code> aplicando a fórmula <code>(danoBase * multiplicador) + bonus</code> e exiba no Console:<br><code>Dano Total: 85.5</code>",
                validationRules: { requiredPatterns: ["danoBase", "multiplicador", "bonus", "danoTotal", "*", "+"] },
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variaveis e calcule danoTotal\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 40;\n        int multiplicador = 2;\n        float bonus = 5.5f;\n        float danoTotal = (danoBase * multiplicador) + bonus;\n        Debug.Log("Dano Total: " + danoTotal);\n    }\n}`,
                tests: [{ input: "", expected: "Dano Total: 85.5", description: "Cálculo (40 * 2) + 5.5 = 85.5" }],
                hints: [
                    { level: "I", text: "Guarde o resultado da expressão em float danoTotal." }
                ]
            },
            {
                id: "cs_act_0_4",
                title: "Verificação de Estado de Combate",
                difficulty: "easy",
                description: "Um herói precisa de um sinalizador de combate. Declare uma variável booleana <code>emCombate</code> inicializada como verdadeira e uma variável de caractere <code>classe</code> com o símbolo 'G'. Exiba no Console:<br><code>Em Combate: True</code><br><code>Classe: G</code>",
                validationRules: { requiredPatterns: ["bool emCombate", "true", "char classe", "'G'"] },
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare bool emCombate e char classe\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool emCombate = true;\n        char classe = 'G';\n        Debug.Log("Em Combate: " + emCombate);\n        Debug.Log("Classe: " + classe);\n    }\n}`,
                tests: [{ input: "", expected: "Em Combate: True\nClasse: G", description: "Estado booleano e char de classe" }],
                hints: [
                    { level: "I", text: "Lembre-se que char usa aspas simples ('G') e bool aceita true ou false." }
                ]
            },
            {
                id: "cs_act_0_5",
                title: "Ficha Intercalada de Personagem",
                difficulty: "medium",
                description: "Reúna as informações do aventureiro formatando uma ficha de RPG: declare o nome <code>\"Arthas\"</code>, o nível <code>3</code> e as moedas <code>150</code>. Formate uma única string interpolada ou concatenada e exiba no Console exatamente:<br><code>Heroi: Arthas | Nivel: 3 | Moedas: 150</code>",
                validationRules: { requiredPatterns: ["Arthas", "3", "150", "Debug.Log"] },
                starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variaveis e emita a ficha formatada\n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nome = "Arthas";\n        int nivel = 3;\n        int moedas = 150;\n        Debug.Log("Heroi: " + nome + " | Nivel: " + nivel + " | Moedas: " + moedas);\n    }\n}`,
                tests: [{ input: "", expected: "Heroi: Arthas | Nivel: 3 | Moedas: 150", description: "Ficha de personagem completa" }],
                hints: [
                    { level: "I", text: "Conecte os dados utilizando o operador + ou interpolação $\"\"." }
                ]
            }
        ]
    }
];

console.log("Metadados base inicializados.");
