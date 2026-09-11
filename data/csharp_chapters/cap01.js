/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 01
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 01 — OPERADORES E EXPRESSÕES
// ═══════════════════════════════════════════════════════

const CAP_01 = {
    id: 1,
    artifactReward: { artifactId: "Ring_Draco", minStars: 3, maxStars: 4 },
    title: "Operadores e Expressões",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Prisma Lógico",
    unlockIcon: "[OP]",
    character: "lyra",
    xpReward: 80,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando o Prisma Lógico da Dimensão C#. Subsistemas de cálculo e álgebra ativados."
            },
            {
                    "type": "narrative",
                    "text": "O brilho de glifos aritméticos preenche o observatório. Lyra Nex traça diagramas de fluxo enquanto cristais de mana ressoam ao redor."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Em combate ou na simulação física, um jogo calcula centenas de expressões por segundo! Quando um monstro atinge nosso herói, não recalculamos tudo do zero: aplicamos o operador composto de subtração <code>vida -= danoSofrido;</code>."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "E não se esqueça dos operadores lógicos e do operador de módulo <code>%</code>! Para alternar turnos ou ciclos de animação em intervalos regulares, o resto da divisão dita o ritmo exato. Já a lógica de combate exige checar se o guerreiro tem nível suficiente E a chave da masmorra: <code>nivel >= 10 && temChave</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Lembre-se da distinção: divisão inteira entre inteiros descarta as casas decimais; para obter médias com precisão flutuante, divida por um número decimal como <code>2.0f</code>. Domine as regras de operadores compostos, módulo, conjunção <code>&&</code> e disjunção <code>||</code>."
            }
    ],
    concept: {
        title: "OPERADORES ARITMÉTICOS, COMPOSTOS E LÓGICOS",
        explanation: "Os operadores permitem manipular variáveis, calcular atributos e criar condições lógicas na Unity:\n<ul>\n  <li><strong>Operadores de Atribuição Composta:</strong> Simplificam a atualização de valores. Em vez de <code>vida = vida - dano;</code>, escreve-se <code>vida -= danoSofrido;</code>. Da mesma forma existem <code>+=</code>, <code>*=</code>, <code>/=</code> e <code>%=</code>.</li>\n  <li><strong>Divisão Flutuante vs Inteira:</strong> Se você dividir dois inteiros (ex: <code>(8 + 6) / 2</code>), o resultado é inteiro. Para preservar a precisão decimal de médias ou taxas, garanta que pelo menos um operando seja float: <code>float media = (p1 + p2) / 2.0f;</code>.</li>\n  <li><strong>Operador de Módulo (<code>%</code>):</strong> Retorna o resto da divisão inteira. É fundamental em games para controlar turnos, ciclos de frames e repetições cíclicas (ex: <code>int indiceCiclo = frameAtual % ciclo;</code>).</li>\n  <li><strong>Operador Lógico E (<code>&&</code>):</strong> Retorna <code>true</code> apenas se <em>ambas</em> as expressões forem verdadeiras (ex: <code>bool podeAbrir = (nivel >= 10) && temChave;</code>).</li>\n  <li><strong>Operador Lógico OU (<code>||</code>):</strong> Retorna <code>true</code> se <em>pelo menos uma</em> das condições for verdadeira (ex: <code>bool protegido = temEscudo || estaInvisivel;</code>).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploOperadores : MonoBehaviour
{
    void Start()
    {
        // 1. Operador composto de redução de vida
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido; // vida agora é 65

        // 2. Média com divisor float para precisão
        int p1 = 8;
        int p2 = 6;
        float media = (p1 + p2) / 2.0f;

        // 3. Controle cíclico com módulo (%)
        int frameAtual = 17;
        int ciclo = 4;
        int indiceCiclo = frameAtual % ciclo; // 17 % 4 = 1

        // 4. Operador lógico E (&&)
        int nivel = 15;
        bool temChave = true;
        bool podeAbrir = (nivel >= 10) && temChave;

        // 5. Operador lógico OU (||)
        bool temEscudo = false;
        bool estaInvisivel = true;
        bool protegido = temEscudo || estaInvisivel;

        Debug.Log("Vida Restante: " + vida);
        Debug.Log("Media: " + media);
        Debug.Log("Indice do Ciclo: " + indiceCiclo);
        Debug.Log("Acesso Permitido: " + podeAbrir);
        Debug.Log("Protegido: " + protegido);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Cálculos de Combate e Lógica de Acesso",
        code: `using UnityEngine;

public class OperadoresEmJogo : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido;

        int p1 = 8;
        int p2 = 6;
        float media = (p1 + p2) / 2.0f;

        int frameAtual = 17;
        int ciclo = 4;
        int indice = frameAtual % ciclo;

        int nivel = 15;
        bool temChave = true;
        bool podeAbrir = nivel >= 10 && temChave;

        bool temEscudo = false;
        bool estaInvisivel = true;
        bool protegido = temEscudo || estaInvisivel;

        Debug.Log("Vida Restante: " + vida);
        Debug.Log("Media de Notas: " + media);
        Debug.Log("Indice do Ciclo: " + indice);
        Debug.Log("Acesso Permitido: " + podeAbrir);
        Debug.Log("Protegido: " + protegido);
    }
}`,
        output: "Vida Restante: 65\nMedia de Notas: 7\nIndice do Ciclo: 1\nAcesso Permitido: True\nProtegido: True"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Operadores e Expressões e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploOperadores : MonoBehaviour
{
    void Start()
    {
        // 1. Operador composto de redução de vida
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido; // vida agora é 65

        // 2. Média com divisor float para precisão
        int p1 = 8;
        int p2 = 6;
        float media = (p1 + p2) / 2.0f;

        // 3. Controle cíclico com módulo (%)
        int frameAtual = 17;
        int ciclo = 4;
        int indiceCiclo = frameAtual % ciclo; // 17 % 4 = 1

        // 4. Operador lógico E (&&)
        int nivel = 15;
        bool temChave = true;
        bool podeAbrir = (nivel >= 10) && temChave;

        // 5. Operador lógico OU (||)
        bool temEscudo = false;
        bool estaInvisivel = true;
        bool protegido = temEscudo || estaInvisivel;

        Debug.Log("Vida Restante: " + vida);
        Debug.Log("Media: " + media);
        Debug.Log("Indice do Ciclo: " + indiceCiclo);
        Debug.Log("Acesso Permitido: " + podeAbrir);
        Debug.Log("Protegido: " + protegido);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Operadores e Expressões:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        // Aplique -= e exiba: Vida Restante: 65
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido;
        Debug.Log("Vida Restante: " + vida);
    }
}`,
                hint: "Vida Restante: 65"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_1_1",
            title: "Dano Sofrido com Operador Composto",
            difficulty: "easy",
            description: "Declare a variável inteira vida com 100 pontos e danoSofrido com 35 pontos. Aplique o operador de subtração composta (-=) para atualizar a vida e exiba a Vida Restante no Console.",
            validationRules: { requiredPatterns: ["int vida","vida -=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        // Aplique -= e exiba: Vida Restante: 65
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido;
        Debug.Log("Vida Restante: " + vida);
    }
}`,
            tests: [
                { input: "", expected: "Vida Restante: 65", description: "Operador -=" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int vida, vida -=" },
                { level: "II", text: "A saída no console deve conter exatamente: Vida Restante: 65" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        vida -= danoSofrido;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int vida","vida -=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vida Restante: 65";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_2",
            title: "Média de Duas Notas",
            difficulty: "easy",
            description: "Calcule a média aritmética de duas partidas: declare as notas inteiras p1 com 8 e p2 com 6. Calcule a média flutuante dividindo a soma por 2.0f e imprima no Console.",
            validationRules: { requiredPatterns: ["p1","p2","media","/"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int p1 = 8;
        int p2 = 6;
        // Calcule a media flutuante e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int p1 = 8;
        int p2 = 6;
        float media = (p1 + p2) / 2.0f;
        Debug.Log("Media: " + media);
    }
}`,
            tests: [
                { input: "", expected: "Media: 7", description: "Cálculo de média" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: p1, p2" },
                { level: "II", text: "A saída no console deve conter exatamente: Media: 7" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        float media = (p1 + p2) / 2.0f;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["p1","p2","media","/"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Media: 7";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_3",
            title: "Controle de Turnos com Módulo (%)",
            difficulty: "medium",
            description: "Declare a variável inteira frameAtual com 17 e ciclo com 4. Calcule o resto frameAtual % ciclo e exiba o Índice do Ciclo no Console.",
            validationRules: { requiredPatterns: ["frameAtual","ciclo","%","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int frameAtual = 17;
        int ciclo = 4;
        // Calcule o resto e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int frameAtual = 17;
        int ciclo = 4;
        int indice = frameAtual % ciclo;
        Debug.Log("Indice do Ciclo: " + indice);
    }
}`,
            tests: [
                { input: "", expected: "Indice do Ciclo: 1", description: "Operador de resto" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: frameAtual, ciclo" },
                { level: "II", text: "A saída no console deve conter exatamente: Indice do Ciclo: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        int indice = frameAtual % ciclo;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["frameAtual","ciclo","%","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Indice do Ciclo: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_4",
            title: "Combinação Lógica com E (&&)",
            difficulty: "medium",
            description: "Declare o nível inteiro nivel com 15 e a booleana temChave com true. Crie a booleana podeAbrir avaliando se nivel >= 10 E temChave é verdadeiro, exibindo o status de Acesso Permitido.",
            validationRules: { requiredPatterns: ["nivel","temChave","&&","podeAbrir"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivel = 15;
        bool temChave = true;
        // Avalie com && e imprima: Acesso Permitido: True
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivel = 15;
        bool temChave = true;
        bool podeAbrir = nivel >= 10 && temChave;
        Debug.Log("Acesso Permitido: " + podeAbrir);
    }
}`,
            tests: [
                { input: "", expected: "Acesso Permitido: True", description: "Operador lógico &&" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: nivel, temChave" },
                { level: "II", text: "A saída no console deve conter exatamente: Acesso Permitido: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        bool podeAbrir = nivel >= 10 && temChave;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["nivel","temChave","&&","podeAbrir"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Acesso Permitido: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_5",
            artifactReward: { artifactId: "Ring_Draco", minStars: 3, maxStars: 4 },
            title: "Negação Lógica com OU (||)",
            difficulty: "medium",
            description: "Declare a booleana temEscudo valendo false e estaInvisivel valendo true. Crie a booleana protegido avaliando se temEscudo OU estaInvisivel é verdadeiro, exibindo o status de Protegido.",
            validationRules: { requiredPatterns: ["temEscudo","estaInvisivel","||","protegido"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temEscudo = false;
        bool estaInvisivel = true;
        // Avalie com || e imprima: Protegido: True
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temEscudo = false;
        bool estaInvisivel = true;
        bool protegido = temEscudo || estaInvisivel;
        Debug.Log("Protegido: " + protegido);
    }
}`,
            tests: [
                { input: "", expected: "Protegido: True", description: "Operador lógico ||" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: temEscudo, estaInvisivel" },
                { level: "II", text: "A saída no console deve conter exatamente: Protegido: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        bool protegido = temEscudo || estaInvisivel;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["temEscudo","estaInvisivel","||","protegido"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Protegido: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_01 };
}
if (typeof window !== "undefined") {
    window.CAP_01 = CAP_01;
}
