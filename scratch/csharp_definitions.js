/**
 * ═══════════════════════════════════════════════════════════════════
 *  MODULES 1 TO 9 ALL 38 CHAPTER DEFINITIONS (0 TO 37)
 *  Derived from csharp/subjects.md, csharp/lessons, CurriculumGraphCS.js
 * ═══════════════════════════════════════════════════════════════════
 */

module.exports = [
    // 0: Variáveis e Tipos de Dados
    {
        id: 0, sub: 1, title: "A Forja dos Tipos e Variáveis", module: "Módulo 1 — Fundamentos de C#",
        character: "arkan", charName: "ARKAN VELOR", role: "MESTRE DA GUILDA", unlock: "Console da Dimensão", unlockIcon: "[C#]", xpReward: 70,
        conceptTitle: "VARIÁVEIS EM C# & DEBUG.LOG",
        conceptExpl: "Em C#, declaramos variáveis com tipos explícitos (int, float, string, bool, char). No Unity, usamos Debug.Log() para emitir mensagens no Console. Números float requerem o sufixo 'f' (ex: 5.5f).",
        conceptCode: `using UnityEngine;\n\npublic class StatusHeroi : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        float velocidade = 7.5f;\n        string heroi = "Kael";\n        bool estaVivo = true;\n        Debug.Log("Heroi: " + heroi + " | Vida: " + vida);\n    }\n}`,
        exampleTitle: "Exemplo — Status do Jogador",
        exampleCode: `using UnityEngine;\n\npublic class PlayerInfo : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 50;\n        float forca = 12.4f;\n        Debug.Log("Moedas: " + moedas);\n        Debug.Log("Forca: " + forca);\n    }\n}`,
        exampleOutput: "Moedas: 50\nForca: 12.4",
        experimentTitle: "Laboratório de Variáveis",
        experimentDesc: "Modifique os valores e teste o resultado no Console.",
        experimentCode: `using UnityEngine;\n\npublic class TesteConsole : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 100;\n        float regeneracao = 3.2f;\n        Debug.Log("Mana: " + mana);\n        Debug.Log("Regeneracao: " + regeneracao);\n    }\n}`,
        tutorialSteps: [
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
        ],
        acts: [
            {
                title: "Primeiro Log de Vida", diff: "easy",
                desc: "Declare no método Start uma variável inteira para armazenar a vida com 100 pontos. Em seguida, utilize Debug.Log para emitir no Console o identificador de vida concatenado com a variável.",
                reqs: ["int vida", "vida", "Debug.Log"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare int vida = 100;\n        \n        // 2. Emita no Console: Vida: 100\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        Debug.Log("Vida: " + vida);\n    }\n}`,
                exp: "Vida: 100", descTest: "Log de vida inicial"
            },
            {
                title: "Velocidade Flutuante", diff: "easy",
                desc: "Declare a variável string heroi com o nome Kael e a variável float velocidade com valor 7.5f. Emita ambos em linhas separadas no Console.",
                reqs: ["float velocidade", "7.5f", "heroi", "Kael"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare heroi e velocidade (7.5f)\n        \n        // Imprima os dois valores\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = "Kael";\n        float velocidade = 7.5f;\n        Debug.Log("Heroi: " + heroi);\n        Debug.Log("Velocidade: " + velocidade);\n    }\n}`,
                exp: "Heroi: Kael\nVelocidade: 7.5", descTest: "Logs de herói e velocidade com float"
            },
            {
                title: "Cálculo de Dano Total", diff: "medium",
                desc: "Declare as variáveis inteiras danoBase valendo 40 e multiplicador valendo 2, e o bônus flutuante bonus valendo 5.5f. Calcule o danoTotal com a expressão (danoBase * multiplicador) + bonus e exiba no Console.",
                reqs: ["danoBase", "multiplicador", "bonus", "danoTotal", "*"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare danoBase, multiplicador e bonus\n        \n        // Calcule danoTotal e imprima com Debug.Log\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 40;\n        int multiplicador = 2;\n        float bonus = 5.5f;\n        float danoTotal = (danoBase * multiplicador) + bonus;\n        Debug.Log("Dano Total: " + danoTotal);\n    }\n}`,
                exp: "Dano Total: 85.5", descTest: "Expressão com int e float"
            },
            {
                title: "Prontidão Booleana", diff: "easy",
                desc: "Declare a variável booleana estaPronto valendo true e a variável caractere simbolo valendo 'G'. Imprima o estado de prontidão e a classe no Console.",
                reqs: ["bool estaPronto", "char simbolo", "true", "'G'"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare estaPronto e simbolo\n        \n        // Emita no Console\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaPronto = true;\n        char simbolo = 'G';\n        Debug.Log("Pronto: " + estaPronto + " | Classe: " + simbolo);\n    }\n}`,
                exp: "Pronto: True | Classe: G", descTest: "Variáveis bool e char"
            },
            {
                title: "Constante Universal de Gravidade", diff: "medium",
                desc: "Declare a constante flutuante GRAVIDADE valendo -9.81f e a variável inteira massa valendo 10. Calcule a força peso com massa * 9.81f e exiba no Console os valores de Gravidade e Peso.",
                reqs: ["const float GRAVIDADE", "-9.81f", "massa", "Debug.Log"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare a constante GRAVIDADE e massa\n        \n        // Calcule e imprima\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        const float GRAVIDADE = -9.81f;\n        int massa = 10;\n        float peso = massa * 9.81f;\n        Debug.Log("Gravidade: " + GRAVIDADE + " | Peso: " + peso);\n    }\n}`,
                exp: "Gravidade: -9.81 | Peso: 98.1", descTest: "Constantes imutáveis e cálculo físico"
            }
        ]
    },

    // 1: Operadores e Expressões
    {
        id: 1, sub: 2, title: "Operadores e Expressões Aritméticas", module: "Módulo 1 — Fundamentos de C#",
        character: "lyra", charName: "LYRA NEX", role: "ARQUIVISTA", unlock: "Prisma Lógico", unlockIcon: "[OP]", xpReward: 80,
        conceptTitle: "OPERADORES EM C#",
        conceptExpl: "Operadores aritméticos (+, -, *, /, %), relacionais (==, !=, >, <) e lógicos (&&, ||, !) realizam transformações em variáveis. Operadores compostos como += e -= facilitam incrementos.",
        conceptCode: `using UnityEngine;\n\npublic class OperadoresDemo : MonoBehaviour\n{\n    void Start()\n    {\n        int hp = 100;\n        hp -= 20;\n        bool vivo = hp > 0;\n        Debug.Log("HP: " + hp + " | Vivo: " + vivo);\n    }\n}`,
        exampleTitle: "Exemplo — Atualização de Pontos",
        exampleCode: `using UnityEngine;\n\npublic class ExemploPontos : MonoBehaviour\n{\n    void Start()\n    {\n        int score = 500;\n        score += 150;\n        Debug.Log("Pontos: " + score);\n    }\n}`,
        exampleOutput: "Pontos: 650",
        experimentTitle: "Laboratório de Operadores",
        experimentDesc: "Experimente operadores lógicos e aritméticos.",
        experimentCode: `using UnityEngine;\n\npublic class TesteOp : MonoBehaviour\n{\n    void Start()\n    {\n        int a = 20;\n        int b = 6;\n        Debug.Log("Resto: " + (a % b));\n    }\n}`,
        tutorialSteps: [
            {
                instruction: "Some 50 pontos à variável pontos usando o operador += e exiba no Console:",
                starterCode: `using UnityEngine;\n\npublic class Teste : MonoBehaviour\n{\n    void Start()\n    {\n        int pontos = 100;\n        \n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Teste : MonoBehaviour\n{\n    void Start()\n    {\n        int pontos = 100;\n        pontos += 50;\n        Debug.Log("Pontos: " + pontos);\n    }\n}`,
                hint: 'pontos += 50;\nDebug.Log("Pontos: " + pontos);'
            }
        ],
        acts: [
            {
                title: "Dano Sofrido com Operador Composto", diff: "easy",
                desc: "Declare a variável inteira vida com 100 pontos e danoSofrido com 35 pontos. Aplique o operador de subtração composta (-=) para atualizar a vida e exiba a Vida Restante no Console.",
                reqs: ["int vida", "vida -=", "Debug.Log"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        // Aplique -= e exiba: Vida Restante: 65\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        vida -= danoSofrido;\n        Debug.Log("Vida Restante: " + vida);\n    }\n}`,
                exp: "Vida Restante: 65", descTest: "Atualização com -="
            },
            {
                title: "Média de Duas Notas", diff: "easy",
                desc: "Calcule a média aritmética de duas partidas: declare as notas inteiras p1 com 8 e p2 com 6. Calcule a média flutuante dividindo a soma por 2.0f e imprima no Console.",
                reqs: ["p1", "p2", "media", "/"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        // Calcule a media flutuante e imprima\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        float media = (p1 + p2) / 2.0f;\n        Debug.Log("Media: " + media);\n    }\n}`,
                exp: "Media: 7", descTest: "Cálculo de média"
            },
            {
                title: "Controle de Turnos com Módulo (%)", diff: "medium",
                desc: "Declare a variável inteira frameAtual com 17 e ciclo com 4. Calcule o resto frameAtual % ciclo e exiba o Índice do Ciclo no Console.",
                reqs: ["frameAtual", "ciclo", "%", "Debug.Log"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        // Calcule o resto e imprima\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        int indice = frameAtual % ciclo;\n        Debug.Log("Indice do Ciclo: " + indice);\n    }\n}`,
                exp: "Indice do Ciclo: 1", descTest: "Operador módulo"
            },
            {
                title: "Combinação Lógica com E (&&)", diff: "medium",
                desc: "Declare o nível inteiro nivel com 15 e a booleana temChave com true. Crie a booleana podeAbrir avaliando se nivel >= 10 E temChave é verdadeiro, exibindo o status de Acesso Permitido.",
                reqs: ["nivel", "temChave", "&&", "podeAbrir"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        // Avalie com && e imprima: Acesso Permitido: True\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        bool podeAbrir = nivel >= 10 && temChave;\n        Debug.Log("Acesso Permitido: " + podeAbrir);\n    }\n}`,
                exp: "Acesso Permitido: True", descTest: "Operador lógico &&"
            },
            {
                title: "Negação Lógica com OU (||)", diff: "medium",
                desc: "Declare a booleana temEscudo valendo false e estaInvisivel valendo true. Crie a booleana protegido avaliando se temEscudo OU estaInvisivel é verdadeiro, exibindo o status de Protegido.",
                reqs: ["temEscudo", "estaInvisivel", "||", "protegido"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        // Avalie com || e imprima: Protegido: True\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        bool protegido = temEscudo || estaInvisivel;\n        Debug.Log("Protegido: " + protegido);\n    }\n}`,
                exp: "Protegido: True", descTest: "Operador lógico ||"
            }
        ]
    },

    // 2: Condicionais (if, else, switch)
    {
        id: 2, sub: 3, title: "Condicionais e Tomada de Decisão", module: "Módulo 1 — Fundamentos de C#",
        character: "arkan", charName: "ARKAN VELOR", role: "MESTRE DA GUILDA", unlock: "Bússola de Fluxo", unlockIcon: "[IF]", xpReward: 90,
        conceptTitle: "CONTROLE DE FLUXO COM IF E SWITCH",
        conceptExpl: "Condicionais if/else e switch direcionam o fluxo de execução baseado em condições verdadeiras ou falsas.",
        conceptCode: `using UnityEngine;\n\npublic class CondicionaisDemo : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 50;\n        if (vida > 70) Debug.Log("Saudavel");\n        else if (vida > 20) Debug.Log("Alerta");\n        else Debug.Log("Perigo");\n    }\n}`,
        exampleTitle: "Exemplo — Estado de Combate",
        exampleCode: `using UnityEngine;\n\npublic class ExemploCombate : MonoBehaviour\n{\n    void Start()\n    {\n        int energia = 80;\n        if (energia >= 50) Debug.Log("Habilidade Pronta");\n        else Debug.Log("Recarregando");\n    }\n}`,
        exampleOutput: "Habilidade Pronta",
        experimentTitle: "Laboratório de Decisão",
        experimentDesc: "Teste ramos condicionais alterando os valores de teste.",
        experimentCode: `using UnityEngine;\n\npublic class TesteDecisao : MonoBehaviour\n{\n    void Start()\n    {\n        int estado = 2;\n        switch (estado) {\n            case 1: Debug.Log("Andando"); break;\n            case 2: Debug.Log("Correndo"); break;\n            default: Debug.Log("Parado"); break;\n        }\n    }\n}`,
        tutorialSteps: [
            {
                instruction: "Escreva um if que verifique se vida > 0 e exiba 'Personagem Vivo':",
                starterCode: `using UnityEngine;\n\npublic class Teste : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        \n    }\n}`,
                solution: `using UnityEngine;\n\npublic class Teste : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        if (vida > 0) Debug.Log("Personagem Vivo");\n    }\n}`,
                hint: 'if (vida > 0) Debug.Log("Personagem Vivo");'
            }
        ],
        acts: [
            {
                title: "Checagem de Vida e Sobrevivência", diff: "easy",
                desc: "Declare a variável inteira vida com 0 pontos. Utilize uma estrutura if/else: se vida > 0 exiba 'Status: Ativo', senão exiba 'Status: Game Over'.",
                reqs: ["int vida", "if", "else", "Debug.Log"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 0;\n        // Cheque com if/else e exiba o status\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 0;\n        if (vida > 0)\n        {\n            Debug.Log("Status: Ativo");\n        }\n        else\n        {\n            Debug.Log("Status: Game Over");\n        }\n    }\n}`,
                exp: "Status: Game Over", descTest: "Estrutura if/else de status"
            },
            {
                title: "Classificação por Escala de Dificuldade", diff: "easy",
                desc: "Declare a variável inteira nivel com 12. Se nivel < 10 exiba 'Dificuldade: Normal', caso contrário exiba 'Dificuldade: Heroica'.",
                reqs: ["int nivel", "if", "else", "Debug.Log"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 12;\n        // Avalie o nivel com if/else\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 12;\n        if (nivel < 10)\n        {\n            Debug.Log("Dificuldade: Normal");\n        }\n        else\n        {\n            Debug.Log("Dificuldade: Heroica");\n        }\n    }\n}`,
                exp: "Dificuldade: Heroica", descTest: "Comparação de dificuldade"
            },
            {
                title: "Ramo Múltiplo com Else If", diff: "medium",
                desc: "Declare a variável inteira mana com 30. Use if/else if/else: se mana >= 50 exiba 'Magia: Suprema', senão se mana >= 25 exiba 'Magia: Basica', senão exiba 'Sem Mana'.",
                reqs: ["int mana", "else if", "if", "else"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 30;\n        // Aplique if, else if e else\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 30;\n        if (mana >= 50)\n        {\n            Debug.Log("Magia: Suprema");\n        }\n        else if (mana >= 25)\n        {\n            Debug.Log("Magia: Basica");\n        }\n        else\n        {\n            Debug.Log("Sem Mana");\n        }\n    }\n}`,
                exp: "Magia: Basica", descTest: "Decisão com 3 ramos"
            },
            {
                title: "Seleção de Classe com Switch", diff: "medium",
                desc: "Declare a variável inteira idClasse valendo 2. Utilize a estrutura switch com cases 1 ('Guerreiro'), 2 ('Mago') e default ('Desconhecido'), emitindo a classe selecionada.",
                reqs: ["switch", "case 1:", "case 2:", "break;"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int idClasse = 2;\n        // Use switch para avaliar idClasse\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int idClasse = 2;\n        switch (idClasse)\n        {\n            case 1:\n                Debug.Log("Classe: Guerreiro");\n                break;\n            case 2:\n                Debug.Log("Classe: Mago");\n                break;\n            default:\n                Debug.Log("Classe: Desconhecido");\n                break;\n        }\n    }\n}`,
                exp: "Classe: Mago", descTest: "Switch case para classes"
            },
            {
                title: "Operador Ternário de Prontidão", diff: "medium",
                desc: "Declare a variável inteira stamina valendo 60. Utilize o operador ternário (? :) para definir a string estado como (stamina >= 50 ? 'Descansado' : 'Exausto') e imprima o Estado no Console.",
                reqs: ["stamina", "?", ":", "Debug.Log"],
                starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int stamina = 60;\n        // Use o operador ternario e exiba: Estado: Descansado\n    }\n}`,
                sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int stamina = 60;\n        string estado = (stamina >= 50) ? "Descansado" : "Exausto";\n        Debug.Log("Estado: " + estado);\n    }\n}`,
                exp: "Estado: Descansado", descTest: "Operador ternário"
            }
        ]
    }
];
