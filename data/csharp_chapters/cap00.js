/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 00
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 00 — VARIÁVEIS E TIPOS DE DADOS
// ═══════════════════════════════════════════════════════

const CAP_00 = {
    id: 0,
    artifactReward: { artifactId: "Chalice_Seiva", minStars: 3, maxStars: 4 },
    title: "Variáveis e Tipos de Dados",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Console da Dimensão",
    unlockIcon: "[C#]",
    character: "arkan",
    xpReward: 70,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conexão dimensional estabelecida. Núcleo C# & Unity 6.5 sincronizado com o Santuário."
            },
            {
                    "type": "narrative",
                    "text": "Linhas prismáticas de código flutuam no ar do grande salão da GuildCode. A realidade desta dimensão é regida pela forte tipagem e pela engine gráfica."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Bem-vindo à Dimensão C#, Codemancer! Diferente dos ponteiros brutos da dimensão anterior, aqui cada dado possui um propósito sagrado e um tipo estrito. Se você tentar guardar a velocidade decimal de um herói num recipiente inteiro, a engine rejeitará a simulação."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Nossos registros antigos mostram que variáveis são como frascos alquímicos rotulados: <code>int</code> para inteiros como vida e moedas, <code>float</code> com o sufixo <code>f</code> para grandezas contínuas, <code>string</code> para nomes e diálogos, <code>bool</code> para estados de verdade e <code>const</code> para leis imutáveis como a gravidade."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "A engine Unity utiliza <code>Debug.Log()</code> para projetar mensagens no Console. Preste atenção no sufixo <code>f</code> obrigatório em literais float e no operador de concatenação <code>+</code>. Complete as 5 atividades deste capítulo para estabilizar os primeiros parâmetros vitais da Guilda!"
            }
    ],
    concept: {
        title: "VARIÁVEIS, TIPOS PRIMITIVOS E CONSTANTES EM C#",
        explanation: "Em C# e no ecossistema da Unity, toda variável precisa ter seu <strong>tipo de dado explicitamente declarado</strong> antes de ser utilizada. Os principais tipos primitivos do motor são:\n<ul>\n  <li><code>int</code>: Números inteiros positivos ou negativos (ex: <code>int vida = 100;</code>, <code>int danoBase = 40;</code>, <code>int multiplicador = 2;</code>). Usado para contadores, vida, atributos e índices.</li>\n  <li><code>float</code>: Números decimais de precisão simples. <strong>Obrigatório incluir o sufixo 'f'</strong> ao declarar literais (ex: <code>float velocidade = 7.5f;</code>, <code>float bonus = 5.5f;</code>, <code>float peso = massa * 10.0f;</code>). Se você esquecer o 'f', o compilador interpretará como <code>double</code> e gerará erro de conversão.</li>\n  <li><code>string</code>: Sequências de texto delimitadas por aspas duplas (ex: <code>string heroi = \"Kael\";</code>). Pode ser combinada com outros valores usando concatenação com <code>+</code>.</li>\n  <li><code>bool</code>: Valores lógicos booleanos, aceitando exclusivamente <code>true</code> ou <code>false</code> (ex: <code>bool estaPronto = true;</code>).</li>\n  <li><code>char</code>: Um único caractere alfanumérico delimitado por aspas simples (ex: <code>char simbolo = 'G';</code>).</li>\n  <li><code>const</code>: Modificador que define valores imutáveis em tempo de compilação (ex: <code>const float GRAVIDADE = -10.0f;</code>). Uma constante nunca pode ser reatribuída.</li>\n</ul>\nPara expressar cálculos no Unity, usamos operações aritméticas normais (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>) com parênteses para ditar a precedência: <code>float danoTotal = (danoBase * multiplicador) + bonus;</code>. A saída de mensagens é transmitida pelo método <code>Debug.Log(...)</code>.",
        code: `using UnityEngine;

public class ExemploVariaveis : MonoBehaviour
{
    void Start()
    {
        // 1. Tipos inteiros e decimais (float exige o sufixo f)
        int vida = 100;
        int danoBase = 40;
        int multiplicador = 2;
        float velocidade = 7.5f;
        float bonus = 5.5f;

        // 2. Textos e caracteres
        string heroi = "Kael";
        char classeRank = 'S';

        // 3. Estado booleano e constantes imutáveis
        bool estaVivo = true;
        const float GRAVIDADE = -10.0f;

        // 4. Expressões aritméticas mistas
        float danoTotal = (danoBase * multiplicador) + bonus;

        // 5. Exibição formatada no Console do Unity
        Debug.Log("Heroi: " + heroi + " | Rank: " + classeRank);
        Debug.Log("Vida: " + vida + " | Velocidade: " + velocidade);
        Debug.Log("Dano Total: " + danoTotal);
        Debug.Log("Pronto: " + estaVivo + " | Gravidade: " + GRAVIDADE);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Ficha de Status do Herói",
        code: `using UnityEngine;

public class StatusHeroi : MonoBehaviour
{
    void Start()
    {
        string heroi = "Kael";
        int vida = 100;
        float velocidade = 7.5f;
        bool estaPronto = true;
        char simbolo = 'G';

        int danoBase = 40;
        int multiplicador = 2;
        float bonus = 5.5f;
        float danoTotal = (danoBase * multiplicador) + bonus;

        const float GRAVIDADE = -10.0f;
        int massa = 10;
        float peso = massa * 10.0f;

        Debug.Log("Heroi: " + heroi);
        Debug.Log("Velocidade: " + velocidade);
        Debug.Log("Vida: " + vida);
        Debug.Log("Dano Total: " + danoTotal);
        Debug.Log("Pronto: " + estaPronto + " | Classe: " + simbolo);
        Debug.Log("Gravidade: " + GRAVIDADE + " | Peso: " + peso);
    }
}`,
        output: "Heroi: Kael\nVelocidade: 7.5\nVida: 100\nDano Total: 85.5\nPronto: True | Classe: G\nGravidade: -10 | Peso: 100"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Variáveis e Tipos de Dados e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploVariaveis : MonoBehaviour
{
    void Start()
    {
        // 1. Tipos inteiros e decimais (float exige o sufixo f)
        int vida = 100;
        int danoBase = 40;
        int multiplicador = 2;
        float velocidade = 7.5f;
        float bonus = 5.5f;

        // 2. Textos e caracteres
        string heroi = "Kael";
        char classeRank = 'S';

        // 3. Estado booleano e constantes imutáveis
        bool estaVivo = true;
        const float GRAVIDADE = -10.0f;

        // 4. Expressões aritméticas mistas
        float danoTotal = (danoBase * multiplicador) + bonus;

        // 5. Exibição formatada no Console do Unity
        Debug.Log("Heroi: " + heroi + " | Rank: " + classeRank);
        Debug.Log("Vida: " + vida + " | Velocidade: " + velocidade);
        Debug.Log("Dano Total: " + danoTotal);
        Debug.Log("Pronto: " + estaVivo + " | Gravidade: " + GRAVIDADE);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Variáveis e Tipos de Dados:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare int vida = 100;
        
        // 2. Emita no Console: Vida: 100
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        Debug.Log("Vida: " + vida);
    }
}`,
                hint: "Vida: 100"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_0_1",
            title: "Primeiro Log de Vida",
            difficulty: "easy",
            description: "Declare no método Start uma variável inteira para armazenar a vida inicializada com 100 pontos. Em seguida, utilize Debug.Log para emitir no Console o texto de identificação concatenado com a vida.",
            validationRules: { requiredPatterns: ["int vida","vida","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare int vida = 100;
        
        // 2. Emita no Console: Vida: 100
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        Debug.Log("Vida: " + vida);
    }
}`,
            tests: [
                { input: "", expected: "Vida: 100", description: "Log de vida inicial" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int vida, vida" },
                { level: "II", text: "A saída no console deve conter exatamente: Vida: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int vida = 100;\n        Debug.Log(\"Vida: \" + vida);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int vida","vida","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vida: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_2",
            title: "Velocidade Flutuante",
            difficulty: "easy",
            description: "Configure o personagem declarando a variável string heroi com 'Kael' e a variável float velocidade com 7.5f (com sufixo f). Emita ambos em linhas separadas no Console.",
            validationRules: { requiredPatterns: ["float velocidade","7.5f","heroi","Kael"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare heroi e velocidade (7.5f)
        
        // Imprima os dois valores
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string heroi = "Kael";
        float velocidade = 7.5f;
        Debug.Log("Heroi: " + heroi);
        Debug.Log("Velocidade: " + velocidade);
    }
}`,
            tests: [
                { input: "", expected: "Heroi: Kael\nVelocidade: 7.5", description: "Logs com float e string" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float velocidade, 7.5f" },
                { level: "II", text: "A saída no console deve conter exatamente: Heroi: Kael" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string heroi = \"Kael\";\n        float velocidade = 7.5f;\n        Debug.Log(\"Heroi: \" + heroi);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float velocidade","7.5f","heroi","Kael"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Heroi: Kael";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_3",
            title: "Cálculo de Dano Total",
            difficulty: "medium",
            description: "Declare as variáveis inteiras danoBase valendo 40 e multiplicador valendo 2, além de um bônus flutuante bonus valendo 5.5f. Calcule o danoTotal com (danoBase * multiplicador) + bonus e exiba no Console.",
            validationRules: { requiredPatterns: ["danoBase","multiplicador","bonus","danoTotal","*"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare danoBase, multiplicador e bonus
        
        // Calcule danoTotal e imprima com Debug.Log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoBase = 40;
        int multiplicador = 2;
        float bonus = 5.5f;
        float danoTotal = (danoBase * multiplicador) + bonus;
        Debug.Log("Dano Total: " + danoTotal);
    }
}`,
            tests: [
                { input: "", expected: "Dano Total: 85.5", description: "Aritmética mista int e float" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: danoBase, multiplicador" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Total: 85.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoBase = 40;\n        int multiplicador = 2;\n        float bonus = 5.5f;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["danoBase","multiplicador","bonus","danoTotal","*"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Total: 85.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_4",
            title: "Prontidão Booleana",
            difficulty: "easy",
            description: "Declare a variável booleana estaPronto valendo true e a variável caractere simbolo valendo 'G'. Imprima o estado de prontidão e a classe no Console.",
            validationRules: { requiredPatterns: ["bool estaPronto","char simbolo","true","'G'"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare estaPronto e simbolo
        
        // Emita no Console
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaPronto = true;
        char simbolo = 'G';
        Debug.Log("Pronto: " + estaPronto + " | Classe: " + simbolo);
    }
}`,
            tests: [
                { input: "", expected: "Pronto: True | Classe: G", description: "Uso de bool e char" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaPronto, char simbolo" },
                { level: "II", text: "A saída no console deve conter exatamente: Pronto: True | Classe: G" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaPronto = true;\n        char simbolo = 'G';\n        Debug.Log(\"Pronto: \" + estaPronto + \" | Classe: \" + simbolo);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaPronto","char simbolo","true","'G'"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pronto: True | Classe: G";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_5",
            artifactReward: { artifactId: "Chalice_Seiva", minStars: 3, maxStars: 4 },
            title: "Constante de Gravidade",
            difficulty: "medium",
            description: "Declare a constante flutuante <code>const float GRAVIDADE = -10.0f;</code> e a variável inteira <code>int massa = 10;</code>. Em seguida, calcule a intensidade positiva da força peso declarando a variável <code>float peso = massa * 10.0f;</code> (ou <code>massa * -GRAVIDADE;</code>) e exiba no Console exatamente: <code>Gravidade: -10 | Peso: 100</code>.",
            validationRules: { requiredPatterns: ["const float GRAVIDADE","-10.0f","massa","peso","Debug.Log"] },
            starterCode: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare a constante GRAVIDADE e a variavel massa\n        \n        // 2. Declare float peso = massa * 10.0f; (ou massa * -GRAVIDADE;)\n        \n        // 3. Imprima: Gravidade: -10 | Peso: 100\n    }\n}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        const float GRAVIDADE = -10.0f;
        int massa = 10;
        float peso = massa * 10.0f;
        Debug.Log("Gravidade: " + GRAVIDADE + " | Peso: " + peso);
    }
}`,
            tests: [
                { input: "", expected: "Gravidade: -10 | Peso: 100", description: "Constantes e cálculo físico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: const float GRAVIDADE, -10.0f" },
                { level: "II", text: "A saída no console deve conter exatamente: Gravidade: -10 | Peso: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        const float GRAVIDADE = -10.0f;\n        int massa = 10;\n        float peso = massa * 10.0f;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["const float GRAVIDADE","-10.0f","massa","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Gravidade: -10 | Peso: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_00 };
}
if (typeof window !== "undefined") {
    window.CAP_00 = CAP_00;
}
