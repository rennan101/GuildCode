/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — C# & UNITY 6.5 CHAPTERS DATA (DIMENSÃO C# UNITY)
   38 Capítulos Oficiais estruturados de Game Development em C# e Unity 6.5.
   Mapeados 1:1 a partir de csharp/subjects.md (Módulos 1 a 9).
   Cada capítulo contém exatamente 5 atividades práticas completas (190 no total),
   com regras de anti-trapaça estruturais e descrições focadas em lógica.
   ═══════════════════════════════════════════════════════════════ */

const CSHARP_CHAPTERS = [
// ═══════════════════════════════════════════════════════
// CAPÍTULO 00 — VARIÁVEIS E TIPOS DE DADOS
// ═══════════════════════════════════════════════════════
{
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

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare int vida = 100;
        
        // 2. Emita no Console: Vida: 100
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
            description: "Declare a constante flutuante GRAVIDADE valendo -10.0f e a variável inteira massa valendo 10. Calcule a força peso como massa * 10 e exiba a Gravidade e o Peso no Console.",
            validationRules: { requiredPatterns: ["const float GRAVIDADE","-10.0f","massa","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare a constante GRAVIDADE e massa
        
        // Calcule e imprima
    }
}`,
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 01 — OPERADORES E EXPRESSÕES
// ═══════════════════════════════════════════════════════
{
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

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        // Aplique -= e exiba: Vida Restante: 65
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 02 — CONDICIONAIS (IF, ELSE, SWITCH)
// ═══════════════════════════════════════════════════════
{
    id: 2,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 3, maxStars: 4 },
    title: "Condicionais (if, else, switch)",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Bússola de Fluxo",
    unlockIcon: "[IF]",
    character: "arkan",
    xpReward: 90,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Inicializando a Bifurcação das Decisões. Portas lógicas de fluxo de controle ativadas."
            },
            {
                    "type": "narrative",
                    "text": "Diante de você erguem-se arcos de pedra com runas que se iluminam alternadamente dependendo das escolhas tomadas."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Um jogo sem decisões é um mundo estático. Toda interação no gameplay depende de bifurcações: se a vida do jogador for maior que zero, ele continua ativo; se chegar a zero, a tela de Game Over surge!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Para múltiplos níveis de mana ou faixas de dificuldade, encadeamos <code>if / else if / else</code>. E quando precisamos selecionar uma classe ou item a partir de um identificador fixo, a estrutura <code>switch-case</code> oferece a sintaxe mais elegante e performática."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Não se esqueça do operador ternário <code>condicao ? valorSeVerdade : valorSeFalso</code>, excelente para atribuições rápidas em linha única, como definir se um herói está descansado ou exausto com base em sua estamina."
            }
    ],
    concept: {
        title: "ESTRUTURAS CONDICIONAIS: IF, ELSE, SWITCH E OPERADOR TERNÁRIO",
        explanation: "Estruturas condicionais desviam o fluxo de execução do código de acordo com o estado do jogo:\n<ul>\n  <li><strong>If / Else Básico:</strong> Testa uma condição booleana. Se for verdadeira, executa o bloco <code>if</code>; caso contrário, executa o bloco <code>else</code> (ex: <code>if (vida > 0) Debug.Log(\"Status: Ativo\"); else Debug.Log(\"Status: Game Over\");</code>).</li>\n  <li><strong>Comparações Relacionais:</strong> Operadores como <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>==</code> e <code>!=</code> avaliam limites numéricos (ex: <code>if (nivel &lt; 10) Debug.Log(\"Dificuldade: Normal\"); else Debug.Log(\"Dificuldade: Heroica\");</code>).</li>\n  <li><strong>Ramos Múltiplos com Else If:</strong> Permite testar várias faixas ordenadas em cascata (ex: checar se mana >= 50 para 'Magia: Suprema', senão se mana >= 25 para 'Magia: Basica', senão 'Sem Mana').</li>\n  <li><strong>Seleção com Switch-Case:</strong> Ideal para comparar uma variável contra múltiplos valores constantes. Cada caso deve ser encerrado com a instrução <code>break;</code> e pode conter uma cláusula <code>default:</code> para valores não mapeados.</li>\n  <li><strong>Operador Ternário (<code>? :</code>):</strong> Uma forma compacta de if/else para atribuição de valores em uma linha: <code>string estado = (stamina >= 50) ? \"Descansado\" : \"Exausto\";</code>.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploCondicionais : MonoBehaviour
{
    void Start()
    {
        // 1. Checagem de sobrevivência (if / else)
        int vida = 0;
        if (vida > 0)
        {
            Debug.Log("Status: Ativo");
        }
        else
        {
            Debug.Log("Status: Game Over");
        }

        // 2. Classificação de dificuldade por nível
        int nivel = 12;
        if (nivel < 10)
        {
            Debug.Log("Dificuldade: Normal");
        }
        else
        {
            Debug.Log("Dificuldade: Heroica");
        }

        // 3. Ramos múltiplos com else if (nível de mana)
        int mana = 30;
        if (mana >= 50)
        {
            Debug.Log("Magia: Suprema");
        }
        else if (mana >= 25)
        {
            Debug.Log("Magia: Basica");
        }
        else
        {
            Debug.Log("Sem Mana");
        }

        // 4. Seleção com switch case
        int idClasse = 2;
        switch (idClasse)
        {
            case 1:
                Debug.Log("Classe: Guerreiro");
                break;
            case 2:
                Debug.Log("Classe: Mago");
                break;
            default:
                Debug.Log("Classe: Desconhecido");
                break;
        }

        // 5. Operador ternário
        int stamina = 60;
        string estado = (stamina >= 50) ? "Descansado" : "Exausto";
        Debug.Log("Estado: " + estado);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Árvore de Decisão do Jogador",
        code: `using UnityEngine;

public class DecisoesGameplay : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        if (vida > 0) Debug.Log("Status: Ativo");
        else Debug.Log("Status: Game Over");

        int nivel = 12;
        if (nivel < 10) Debug.Log("Dificuldade: Normal");
        else Debug.Log("Dificuldade: Heroica");

        int mana = 30;
        if (mana >= 50) Debug.Log("Magia: Suprema");
        else if (mana >= 25) Debug.Log("Magia: Basica");
        else Debug.Log("Sem Mana");

        int idClasse = 2;
        switch (idClasse)
        {
            case 1: Debug.Log("Classe: Guerreiro"); break;
            case 2: Debug.Log("Classe: Mago"); break;
            default: Debug.Log("Classe: Desconhecido"); break;
        }

        int stamina = 60;
        string estado = (stamina >= 50) ? "Descansado" : "Exausto";
        Debug.Log("Estado: " + estado);
    }
}`,
        output: "Status: Ativo\nDificuldade: Heroica\nMagia: Basica\nClasse: Mago\nEstado: Descansado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Condicionais (if, else, switch) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        // Cheque com if/else e exiba o status
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Condicionais (if, else, switch):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        // Cheque com if/else e exiba o status
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        if (vida > 0)
        {
            Debug.Log("Status: Ativo");
        }
        else
        {
            Debug.Log("Status: Game Over");
        }
    }
}`,
                hint: "Status: Game Over"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_2_1",
            title: "Checagem de Sobrevivência",
            difficulty: "easy",
            description: "Declare a variável inteira vida com 0 pontos. Utilize uma estrutura if/else: se vida > 0 exiba 'Status: Ativo', senão exiba 'Status: Game Over'.",
            validationRules: { requiredPatterns: ["int vida","if","else","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        // Cheque com if/else e exiba o status
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        if (vida > 0)
        {
            Debug.Log("Status: Ativo");
        }
        else
        {
            Debug.Log("Status: Game Over");
        }
    }
}`,
            tests: [
                { input: "", expected: "Status: Game Over", description: "If/else de sobrevivência" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int vida, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Status: Game Over" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int vida = 0;\n        if (vida > 0)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int vida","if","else","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Status: Game Over";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_2",
            title: "Classificação por Dificuldade",
            difficulty: "easy",
            description: "Declare a variável inteira nivel com 12. Se nivel < 10 exiba 'Dificuldade: Normal', caso contrário exiba 'Dificuldade: Heroica'.",
            validationRules: { requiredPatterns: ["int nivel","if","else","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivel = 12;
        // Avalie o nivel com if/else
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivel = 12;
        if (nivel < 10)
        {
            Debug.Log("Dificuldade: Normal");
        }
        else
        {
            Debug.Log("Dificuldade: Heroica");
        }
    }
}`,
            tests: [
                { input: "", expected: "Dificuldade: Heroica", description: "Checagem de dificuldade" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int nivel, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Dificuldade: Heroica" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int nivel = 12;\n        if (nivel < 10)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int nivel","if","else","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dificuldade: Heroica";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_3",
            title: "Ramo Múltiplo com Else If",
            difficulty: "medium",
            description: "Declare a variável inteira mana com 30. Use if/else if/else: se mana >= 50 exiba 'Magia: Suprema', senão se mana >= 25 exiba 'Magia: Basica', senão exiba 'Sem Mana'.",
            validationRules: { requiredPatterns: ["int mana","else if","if","else"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int mana = 30;
        // Aplique if, else if e else
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int mana = 30;
        if (mana >= 50)
        {
            Debug.Log("Magia: Suprema");
        }
        else if (mana >= 25)
        {
            Debug.Log("Magia: Basica");
        }
        else
        {
            Debug.Log("Sem Mana");
        }
    }
}`,
            tests: [
                { input: "", expected: "Magia: Basica", description: "Três ramos com else if" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int mana, else if" },
                { level: "II", text: "A saída no console deve conter exatamente: Magia: Basica" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int mana = 30;\n        if (mana >= 50)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int mana","else if","if","else"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Magia: Basica";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_4",
            title: "Seleção com Switch Case",
            difficulty: "medium",
            description: "Declare a variável inteira idClasse valendo 2. Utilize a estrutura switch com cases 1 ('Guerreiro'), 2 ('Mago') e default ('Desconhecido'), emitindo a classe selecionada.",
            validationRules: { requiredPatterns: ["switch","case 1:","case 2:","break;"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int idClasse = 2;
        // Use switch para avaliar idClasse
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int idClasse = 2;
        switch (idClasse)
        {
            case 1:
                Debug.Log("Classe: Guerreiro");
                break;
            case 2:
                Debug.Log("Classe: Mago");
                break;
            default:
                Debug.Log("Classe: Desconhecido");
                break;
        }
    }
}`,
            tests: [
                { input: "", expected: "Classe: Mago", description: "Switch case de classe" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: switch, case 1:" },
                { level: "II", text: "A saída no console deve conter exatamente: Classe: Mago" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int idClasse = 2;\n        switch (idClasse)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["switch","case 1:","case 2:","break;"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Classe: Mago";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 3, maxStars: 4 },
            title: "Operador Ternário",
            difficulty: "medium",
            description: "Declare a variável inteira stamina valendo 60. Utilize o operador ternário (? :) para definir a string estado como (stamina >= 50 ? 'Descansado' : 'Exausto') e imprima o Estado no Console.",
            validationRules: { requiredPatterns: ["stamina","?",":","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int stamina = 60;
        // Use o operador ternario e exiba: Estado: Descansado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int stamina = 60;
        string estado = (stamina >= 50) ? "Descansado" : "Exausto";
        Debug.Log("Estado: " + estado);
    }
}`,
            tests: [
                { input: "", expected: "Estado: Descansado", description: "Operador ternário" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: stamina, ?" },
                { level: "II", text: "A saída no console deve conter exatamente: Estado: Descansado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int stamina = 60;\n        string estado = (stamina >= 50) ? \"Descansado\" : \"Exausto\";\n        Debug.Log(\"Estado: \" + estado);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["stamina","?",":","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Estado: Descansado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 03 — LOOPS (FOR, WHILE, FOREACH)
// ═══════════════════════════════════════════════════════
{
    id: 3,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 3, maxStars: 4 },
    title: "Loops (for, while, foreach)",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Anel do Laço",
    unlockIcon: "[LOOP]",
    character: "elion",
    xpReward: 100,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Inicializando o Motor de Repetição Contínua. Laços iterativos calibrados."
            },
            {
                    "type": "narrative",
                    "text": "Engrenagens colossais de mana giram em sincronia na torre central. Elion Raven analisa sequências numéricas que se repetem com precisão milimétrica."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "Em desenvolvimento de jogos, repetir código manualmente é o caminho mais rápido para corrupção de memória. Quando precisamos gerar ondas de inimigos, computar pontuações acumuladas ou vasculhar itens, usamos laços de repetição!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "O laço <code>for</code> é a ferramenta ideal quando sabemos a contagem exata de iterações. Já o <code>while</code> repousa sobre uma condição dinâmica, perfeito para contagens regressivas ou timers. Mas atenção: nunca esqueça de atualizar a variável de controle do while, ou causará um congelamento eterno!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Aprenda também a controlar o fluxo dos loops: <code>continue</code> pula imediatamente para a próxima iteração (ótimo para ignorar ímpares ao filtrar pares), enquanto <code>break</code> encerra o laço na hora em que o alvo for localizado."
            }
    ],
    concept: {
        title: "LAÇOS DE REPETIÇÃO: FOR, WHILE, BREAK E CONTINUE",
        explanation: "Loops executam blocos de código repetidas vezes até que uma condição de parada seja atingida:\n<ul>\n  <li><strong>Laço For Contado:</strong> Possui inicialização, condição de continuidade e incremento em sua declaração. Muito usado para spawns sequenciais: <code>for (int i = 1; i &lt;= 3; i++) Debug.Log(\"Inimigo #\" + i + \" gerado\");</code>.</li>\n  <li><strong>Laço While:</strong> Executa enquanto sua condição for avaliada como verdadeira. Essencial para contagens regressivas: <code>while (timer &gt; 0) { Debug.Log(\"T-\" + timer); timer--; }</code>.</li>\n  <li><strong>Acumulação em Laço:</strong> Podemos somar pontuações acumuladas declarando um acumulador antes do loop: <code>int totalPontos = 0; for (int i = 1; i &lt;= 4; i++) totalPontos += i * 10;</code>.</li>\n  <li><strong>Instrução Continue:</strong> Pula o restante do corpo do laço e avança direto para a próxima iteração. Útil para filtragem (ex: <code>if (i % 2 != 0) continue;</code> ignora ímpares e processa apenas pares).</li>\n  <li><strong>Instrução Break:</strong> Interrompe imediatamente a execução do loop, saindo do bloco mesmo que a condição principal ainda fosse verdadeira (ex: parar assim que encontrar o alvo no passo 3).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploLoops : MonoBehaviour
{
    void Start()
    {
        // 1. For: Spawn de ondas de monstros
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }

        // 2. While: Contagem regressiva
        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }

        // 3. Somatório acumulado
        int totalPontos = 0;
        for (int i = 1; i <= 4; i++)
        {
            totalPontos += i * 10;
        }
        Debug.Log("Total Acumulado: " + totalPontos);

        // 4. Continue: Filtrando apenas pares
        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }

        // 5. Break: Interrupção imediata
        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerenciador de Ondas e Temporizador",
        code: `using UnityEngine;

public class LoopManager : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }

        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }

        int total = 0;
        for (int i = 1; i <= 4; i++) total += i * 10;
        Debug.Log("Total Acumulado: " + total);

        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }

        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`,
        output: "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado\nT-3\nT-2\nT-1\nTotal Acumulado: 100\nPar: 2\nPar: 4\nAlvo Encontrado no passo 3"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Loops (for, while, foreach) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Construa o laco for de 1 a 3
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Loops (for, while, foreach):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Construa o laco for de 1 a 3
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }
    }
}`,
                hint: "Inimigo #1 gerado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_3_1",
            title: "Spawn Sequencial com For",
            difficulty: "easy",
            description: "Dentro de Start, construa um laço for que itere de 1 até 3 emitindo as mensagens no Console com 'Inimigo #' + i + ' gerado'.",
            validationRules: { requiredPatterns: ["for","<=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Construa o laco for de 1 a 3
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado", description: "Laço for sequencial" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, <=" },
                { level: "II", text: "A saída no console deve conter exatamente: Inimigo #1 gerado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Inimigo #\" + i + \" gerado\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","<=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Inimigo #1 gerado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_2",
            title: "Contagem com While",
            difficulty: "easy",
            description: "Declare a variável inteira timer com 3. Crie um laço while que execute enquanto timer > 0, imprimindo 'T-' + timer e decrementando a cada passo.",
            validationRules: { requiredPatterns: ["int timer","while","timer > 0","timer--"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int timer = 3;
        // Faca o laco while regressivo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }
    }
}`,
            tests: [
                { input: "", expected: "T-3\nT-2\nT-1", description: "While regressivo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int timer, while" },
                { level: "II", text: "A saída no console deve conter exatamente: T-3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int timer = 3;\n        while (timer > 0)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int timer","while","timer > 0","timer--"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "T-3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_3",
            title: "Somatório de Pontos",
            difficulty: "medium",
            description: "Declare totalPontos inicializado com 0. Faça um for com i de 1 até 4 somando i * 10 a totalPontos e exiba no final 'Total Acumulado: ' + totalPontos.",
            validationRules: { requiredPatterns: ["totalPontos","for","+=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalPontos = 0;
        // Some os pontos no laco e imprima o total
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalPontos = 0;
        for (int i = 1; i <= 4; i++)
        {
            totalPontos += i * 10;
        }
        Debug.Log("Total Acumulado: " + totalPontos);
    }
}`,
            tests: [
                { input: "", expected: "Total Acumulado: 100", description: "Somatório em loop" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: totalPontos, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Total Acumulado: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalPontos = 0;\n        for (int i = 1; i <= 4; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["totalPontos","for","+=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total Acumulado: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_4",
            title: "Filtro de Pares com Continue",
            difficulty: "medium",
            description: "Faça um laço for de 1 até 5. Se o resto da divisão por 2 for diferente de zero (i % 2 != 0), use continue para ignorar. Imprima os números pares encontrados com 'Par: ' + i.",
            validationRules: { requiredPatterns: ["for","continue","%","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Itere de 1 a 5 usando continue para impares
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }
    }
}`,
            tests: [
                { input: "", expected: "Par: 2\nPar: 4", description: "Comando continue" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, continue" },
                { level: "II", text: "A saída no console deve conter exatamente: Par: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 5; i++)\n        {\n            if (i % 2 != 0) continue;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","continue","%","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Par: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 3, maxStars: 4 },
            title: "Interrupção com Break",
            difficulty: "medium",
            description: "Simule a interrupção ao encontrar o alvo: itere de 1 até 10 com for. Quando i == 3, exiba 'Alvo Encontrado no passo 3' e execute break para interromper o laço.",
            validationRules: { requiredPatterns: ["for","break","i == 3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Procure o alvo no laco e interrompa com break
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`,
            tests: [
                { input: "", expected: "Alvo Encontrado no passo 3", description: "Comando break" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, break" },
                { level: "II", text: "A saída no console deve conter exatamente: Alvo Encontrado no passo 3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 10; i++)\n        {\n            if (i == 3)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","break","i == 3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alvo Encontrado no passo 3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 04 — FUNÇÕES E MÉTODOS
// ═══════════════════════════════════════════════════════
{
    id: 4,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 3, maxStars: 5 },
    title: "Funções e Métodos",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Pergaminho de Métodos",
    unlockIcon: "[FN]",
    character: "lyra",
    xpReward: 110,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Abrindo a Matriz de Métodos e Funções Modulares. Encapsulamento lógico ativo."
            },
            {
                    "type": "narrative",
                    "text": "Lyra Nex posiciona cilindros rúnicos interconectados. Ao acionar uma runa-mestre, todas as ramificações executam suas sub-rotinas em harmonia."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Conjuradores novatos escrevem centenas de linhas repetidas dentro de um único bloco. Mestres de C#, por outro lado, dividem o problema em métodos reutilizáveis com responsabilidade única!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Existem dois tipos fundamentais de métodos: os procedimentos <code>void</code>, que realizam ações sem devolver nada (como exibir boas-vindas), e as funções com tipo de retorno específico, como <code>int Dobrar(int valor)</code>, <code>int CalcularCritico(int dano, int multiplicador)</code> ou <code>bool EstaVivo(int vidaAtual)</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Métodos podem receber múltiplos parâmetros de tipos variados e retornar valores formatados, como <code>string FormatarNome(string nome, int nivel)</code>. Observe a instrução <code>return</code> obrigatória em métodos com retorno tipado."
            }
    ],
    concept: {
        title: "MÉTODOS EM C#: PROCEDIMENTOS VOID, PARÂMETROS E RETORNOS TIPADOS",
        explanation: "Métodos são blocos nomeados de instruções que executam uma tarefa e podem ser chamados repetidas vezes:\n<ul>\n  <li><strong>Método Void:</strong> Não devolve nenhum valor de volta ao invocador. É usado para desencadear ações e logs (ex: <code>void ExibirBoasVindas() { Debug.Log(\"Bem-vindo ao Unity 6.5\"); }</code>).</li>\n  <li><strong>Método com Retorno Primitivo:</strong> Declara o tipo que será retornado antes do nome do método. A palavra-chave <code>return</code> devolve o resultado para a variável que o chamou (ex: <code>int Dobrar(int valor) { return valor * 2; }</code>).</li>\n  <li><strong>Múltiplos Parâmetros:</strong> Métodos podem receber dois ou mais argumentos separados por vírgula para cálculos complexos (ex: <code>int CalcularCritico(int dano, int multiplicador) { return dano * multiplicador; }</code>).</li>\n  <li><strong>Retornos Booleanos:</strong> Avaliam condições lógicas e retornam <code>true</code> ou <code>false</code> (ex: <code>bool EstaVivo(int vidaAtual) { return vidaAtual &gt; 0; }</code>).</li>\n  <li><strong>Formatação e Strings:</strong> Métodos podem combinar textos e atributos formatando cabeçalhos de jogo (ex: <code>string FormatarNome(string nome, int nivel) { return \"Player: \" + nome + \" [Lv \" + nivel + \"]\"; }</code>).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploFuncoes : MonoBehaviour
{
    // Método void sem retorno
    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }

    // Função que dobra um valor inteiro
    int Dobrar(int valor)
    {
        return valor * 2;
    }

    // Função de cálculo de dano crítico com 2 parâmetros
    int CalcularCritico(int dano, int multiplicador)
    {
        return dano * multiplicador;
    }

    // Função de checagem booleana
    bool EstaVivo(int vidaAtual)
    {
        return vidaAtual > 0;
    }

    // Função de formatação textual
    string FormatarNome(string nome, int nivel)
    {
        return "Player: " + nome + " [Lv " + nivel + "]";
    }

    void Start()
    {
        ExibirBoasVindas();

        int res = Dobrar(25);
        Debug.Log("Resultado: " + res);

        int crit = CalcularCritico(50, 3);
        Debug.Log("Dano Critico: " + crit);

        bool vivo = EstaVivo(10);
        Debug.Log("Heroi Vivo: " + vivo);

        string rotulo = FormatarNome("Arkan", 20);
        Debug.Log(rotulo);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Biblioteca de Fórmulas da Guilda",
        code: `using UnityEngine;

public class FormulasCombate : MonoBehaviour
{
    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }

    int Dobrar(int valor)
    {
        return valor * 2;
    }

    int CalcularCritico(int dano, int multiplicador)
    {
        return dano * multiplicador;
    }

    bool EstaVivo(int vidaAtual)
    {
        return vidaAtual > 0;
    }

    string FormatarNome(string nome, int nivel)
    {
        return "Player: " + nome + " [Lv " + nivel + "]";
    }

    void Start()
    {
        ExibirBoasVindas();
        Debug.Log("Resultado: " + Dobrar(25));
        Debug.Log("Dano Critico: " + CalcularCritico(50, 3));
        Debug.Log("Heroi Vivo: " + EstaVivo(10));
        Debug.Log(FormatarNome("Arkan", 20));
    }
}`,
        output: "Bem-vindo ao Unity 6.5\nResultado: 50\nDano Critico: 150\nHeroi Vivo: True\nPlayer: Arkan [Lv 20]"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Funções e Métodos e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame ExibirBoasVindas()
    }
    
    // Crie o metodo void ExibirBoasVindas
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Funções e Métodos:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame ExibirBoasVindas()
    }
    
    // Crie o metodo void ExibirBoasVindas
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        ExibirBoasVindas();
    }

    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }
}`,
                hint: "Bem-vindo ao Unity 6.5"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_4_1",
            title: "Método Void de Log",
            difficulty: "easy",
            description: "Defina o método auxiliar void ExibirBoasVindas() que emite 'Bem-vindo ao Unity 6.5'. Invoque o método dentro de Start().",
            validationRules: { requiredPatterns: ["void ExibirBoasVindas()","ExibirBoasVindas()","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame ExibirBoasVindas()
    }
    
    // Crie o metodo void ExibirBoasVindas
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        ExibirBoasVindas();
    }

    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }
}`,
            tests: [
                { input: "", expected: "Bem-vindo ao Unity 6.5", description: "Método void sem parâmetros" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: void ExibirBoasVindas(), ExibirBoasVindas()" },
                { level: "II", text: "A saída no console deve conter exatamente: Bem-vindo ao Unity 6.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        ExibirBoasVindas();\n    }\n" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["void ExibirBoasVindas()","ExibirBoasVindas()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Bem-vindo ao Unity 6.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_2",
            title: "Função com Retorno Inteiro",
            difficulty: "easy",
            description: "Crie a função int Dobrar(int valor) que retorna valor * 2. Em Start, declare int res = Dobrar(25); e imprima 'Resultado: ' + res.",
            validationRules: { requiredPatterns: ["int Dobrar(int valor)","return valor * 2","Dobrar(25)"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame Dobrar com 25 e imprima o resultado
    }
    
    // Crie o metodo Dobrar
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int res = Dobrar(25);
        Debug.Log("Resultado: " + res);
    }

    int Dobrar(int valor)
    {
        return valor * 2;
    }
}`,
            tests: [
                { input: "", expected: "Resultado: 50", description: "Função com retorno inteiro" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int Dobrar(int valor), return valor * 2" },
                { level: "II", text: "A saída no console deve conter exatamente: Resultado: 50" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int res = Dobrar(25);\n        Debug.Log(\"Resultado: \" + res);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int Dobrar(int valor)","return valor * 2","Dobrar(25)"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Resultado: 50";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_3",
            title: "Função de Cálculo de Dano Crítico",
            difficulty: "medium",
            description: "Crie a função int CalcularCritico(int dano, int multiplicador) que retorna dano * multiplicador. No Start, chame com (50, 3) e exiba 'Dano Critico: ' + resultado.",
            validationRules: { requiredPatterns: ["int CalcularCritico(int dano, int multiplicador)","CalcularCritico(50, 3)"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Invoque CalcularCritico e imprima
    }
    
    // Defina CalcularCritico
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoFinal = CalcularCritico(50, 3);
        Debug.Log("Dano Critico: " + danoFinal);
    }

    int CalcularCritico(int dano, int multiplicador)
    {
        return dano * multiplicador;
    }
}`,
            tests: [
                { input: "", expected: "Dano Critico: 150", description: "Função com múltiplos parâmetros" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int CalcularCritico(int dano, int multiplicador), CalcularCritico(50, 3)" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Critico: 150" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoFinal = CalcularCritico(50, 3);\n        Debug.Log(\"Dano Critico: \" + danoFinal);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int CalcularCritico(int dano, int multiplicador)","CalcularCritico(50, 3)"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Critico: 150";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_4",
            title: "Função Booleana de Verificação",
            difficulty: "medium",
            description: "Crie a função bool EstaVivo(int vidaAtual) que retorna vidaAtual > 0. No Start, teste com 10 pontos e exiba 'Heroi Vivo: ' + EstaVivo(10).",
            validationRules: { requiredPatterns: ["bool EstaVivo(int vidaAtual)","return vidaAtual > 0","EstaVivo(10)"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Teste EstaVivo com 10 e imprima
    }
    
    // Defina EstaVivo
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool vivo = EstaVivo(10);
        Debug.Log("Heroi Vivo: " + vivo);
    }

    bool EstaVivo(int vidaAtual)
    {
        return vidaAtual > 0;
    }
}`,
            tests: [
                { input: "", expected: "Heroi Vivo: True", description: "Função com retorno booleano" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool EstaVivo(int vidaAtual), return vidaAtual > 0" },
                { level: "II", text: "A saída no console deve conter exatamente: Heroi Vivo: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool vivo = EstaVivo(10);\n        Debug.Log(\"Heroi Vivo: \" + vivo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool EstaVivo(int vidaAtual)","return vidaAtual > 0","EstaVivo(10)"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Heroi Vivo: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 3, maxStars: 5 },
            title: "Formatação de Nome de Jogador",
            difficulty: "medium",
            description: "Crie a função string FormatarNome(string nome, int nivel) que retorna 'Player: ' + nome + ' [Lv ' + nivel + ']'. No Start, chame com ('Arkan', 20) e exiba o resultado.",
            validationRules: { requiredPatterns: ["string FormatarNome(string nome, int nivel)","FormatarNome(\"Arkan\", 20)"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame FormatarNome e imprima
    }
    
    // Defina FormatarNome
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string rotulo = FormatarNome("Arkan", 20);
        Debug.Log(rotulo);
    }

    string FormatarNome(string nome, int nivel)
    {
        return "Player: " + nome + " [Lv " + nivel + "]";
    }
}`,
            tests: [
                { input: "", expected: "Player: Arkan [Lv 20]", description: "Função com retorno string" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string FormatarNome(string nome, int nivel), FormatarNome(\"Arkan\", 20)" },
                { level: "II", text: "A saída no console deve conter exatamente: Player: Arkan [Lv 20]" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string rotulo = FormatarNome(\"Arkan\", 20);\n        Debug.Log(rotulo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string FormatarNome(string nome, int nivel)","FormatarNome(\"Arkan\", 20)"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Player: Arkan [Lv 20]";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 05 — ARRAYS E LISTAS
// ═══════════════════════════════════════════════════════
{
    id: 5,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 3, maxStars: 5 },
    title: "Arrays e Listas",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Vetor de Armazenamento",
    unlockIcon: "[ARR]",
    character: "kael",
    xpReward: 120,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Despertando a Armaria e o Banco de Dados Contíguo. Coleções estruturadas ativas."
            },
            {
                    "type": "narrative",
                    "text": "Kael Thorn martela uma lâmina reluzente sobre a bigorna rúnica, organizando dezenas de peças forjadas em prateleiras demarcadas por índices."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Um guerreiro de respeito não carrega uma variável solta para cada item! Ele precisa de coleções ordenadas. Quando o tamanho é fixo e imutável, usamos Arrays como <code>string[] itens</code> ou <code>int[] pontuacoes</code>."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Mas no calor da aventura, o inventário muda constantemente: novas poções são coletadas com <code>.Add()</code> e pergaminhos usados são descartados com <code>.Remove()</code>. Para coleções dinâmicas, utilizamos <code>List&lt;T&gt;</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Lembre-se: em C#, coleções utilizam indexação baseada em zero (<code>itens[0]</code>). Arrays fixos possuem a propriedade <code>.Length</code>, enquanto listas dinâmicas utilizam <code>.Count</code>. Domine ambos para gerenciar inventários e ranqueamentos."
            }
    ],
    concept: {
        title: "COLEÇÕES EM C#: ARRAYS FIXOS E LISTAS DINÂMICAS (LIST<T>)",
        explanation: "Coleções agrupam múltiplos elementos do mesmo tipo sob um único identificador:\n<ul>\n  <li><strong>Arrays Unidimensionais Fixos:</strong> Têm tamanho definido na criação. Acessam elementos pelo índice de 0 até tamanho - 1: <code>string[] itens = { \"Espada\", \"Escudo\", \"Pocao\" };</code>. O primeiro item é obtido com <code>itens[0]</code> e o total com <code>itens.Length</code>.</li>\n  <li><strong>Iteração em Arrays:</strong> Podemos percorrer todos os valores com laços for ou foreach: <code>for (int i = 0; i &lt; pontuacoes.Length; i++) Debug.Log(\"Pontos: \" + pontuacoes[i]);</code>.</li>\n  <li><strong>Listas Dinâmicas (<code>List&lt;T&gt;</code>):</strong> Pertencem ao namespace <code>System.Collections.Generic</code> e podem crescer ou diminuir em tempo de execução: <code>List&lt;string&gt; inventario = new List&lt;string&gt;();</code>.</li>\n  <li><strong>Adição e Remoção:</strong> Adicionamos itens com <code>.Add(\"Elmo\")</code> e removemos com <code>.Remove(\"Fogo\")</code>. O total de itens de uma lista é obtido pela propriedade <code>.Count</code>.</li>\n  <li><strong>Busca de Maior Valor:</strong> Para descobrir o ápice de pontuação em um array, iniciamos uma variável auxiliar com o primeiro elemento e comparamos cada item subsequente dentro de um laço com <code>if (valores[i] &gt; maior) maior = valores[i];</code>.</li>\n</ul>",
        code: `using UnityEngine;
using System.Collections.Generic;

public class ExemploColecoes : MonoBehaviour
{
    void Start()
    {
        // 1. Array fixo de strings e acesso por índice
        string[] itens = { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);

        // 2. Iteração sobre array de números
        int[] pontuacoes = { 10, 20, 30 };
        for (int i = 0; i < pontuacoes.Length; i++)
        {
            Debug.Log("Pontos: " + pontuacoes[i]);
        }

        // 3. Lista dinâmica com Add e contagem .Count
        List<string> inventario = new List<string>();
        inventario.Add("Elmo");
        inventario.Add("Bota");
        Debug.Log("Total de Itens: " + inventario.Count);

        // 4. Remoção de elementos de List<T>
        List<string> poderes = new List<string>() { "Fogo", "Gelo" };
        poderes.Remove("Fogo");
        Debug.Log("Poder Ativo: " + poderes[0]);

        // 5. Determinação do maior elemento em array
        int[] valores = { 15, 82, 43 };
        int maior = valores[0];
        for (int i = 1; i < valores.Length; i++)
        {
            if (valores[i] > maior)
            {
                maior = valores[i];
            }
        }
        Debug.Log("Maior: " + maior);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerenciamento do Inventário do Herói",
        code: `using UnityEngine;
using System.Collections.Generic;

public class InventarioManager : MonoBehaviour
{
    void Start()
    {
        string[] equipamentos = { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + equipamentos[0]);

        int[] scores = { 10, 20, 30 };
        for (int i = 0; i < scores.Length; i++)
        {
            Debug.Log("Pontos: " + scores[i]);
        }

        List<string> mochila = new List<string>();
        mochila.Add("Elmo");
        mochila.Add("Bota");
        Debug.Log("Total de Itens: " + mochila.Count);

        List<string> magias = new List<string>() { "Fogo", "Gelo" };
        magias.Remove("Fogo");
        Debug.Log("Poder Ativo: " + magias[0]);

        int[] numeros = { 15, 82, 43 };
        int maior = numeros[0];
        for (int i = 1; i < numeros.Length; i++)
        {
            if (numeros[i] > maior) maior = numeros[i];
        }
        Debug.Log("Maior: " + maior);
    }
}`,
        output: "Item Equipado: Espada\nPontos: 10\nPontos: 20\nPontos: 30\nTotal de Itens: 2\nPoder Ativo: Gelo\nMaior: 82"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Arrays e Listas e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array itens e exiba o primeiro item
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Arrays e Listas:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array itens e exiba o primeiro item
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] itens = new string[] { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);
    }
}`,
                hint: "Item Equipado: Espada"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_5_1",
            title: "Acesso a Elemento de Array",
            difficulty: "easy",
            description: "Declare um array de strings itens com três nomes: 'Espada', 'Escudo' e 'Pocao'. Acesse o primeiro item pelo índice 0 e exiba 'Item Equipado: ' + itens[0].",
            validationRules: { requiredPatterns: ["string[] itens","itens[0]","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array itens e exiba o primeiro item
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] itens = new string[] { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);
    }
}`,
            tests: [
                { input: "", expected: "Item Equipado: Espada", description: "Array index 0" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] itens, itens[0]" },
                { level: "II", text: "A saída no console deve conter exatamente: Item Equipado: Espada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] itens = new string[] { \"Espada\", \"Escudo\", \"Pocao\" };\n        Debug.Log(\"Item Equipado: \" + itens[0]);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] itens","itens[0]","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Item Equipado: Espada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_2",
            title: "Iteração em Array com Foreach",
            difficulty: "easy",
            description: "Declare um array de inteiros pontuacoes com os valores { 10, 20, 30 }. Use um laço for para iterar e exibir cada pontuação no formato 'Pontos: ' + valor.",
            validationRules: { requiredPatterns: ["int[] pontuacoes","for","pontuacoes.Length"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array e percorra exibindo cada ponto
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int[] pontuacoes = new int[] { 10, 20, 30 };
        for (int i = 0; i < pontuacoes.Length; i++)
        {
            Debug.Log("Pontos: " + pontuacoes[i]);
        }
    }
}`,
            tests: [
                { input: "", expected: "Pontos: 10\nPontos: 20\nPontos: 30", description: "Iteração em array" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int[] pontuacoes, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Pontos: 10" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int[] pontuacoes = new int[] { 10, 20, 30 };\n        for (int i = 0; i < pontuacoes.Length; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int[] pontuacoes","for","pontuacoes.Length"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pontos: 10";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_3",
            title: "Adicionando Elementos em List<T>",
            difficulty: "medium",
            description: "Instancie uma lista dinâmica List<string> inventario = new List<string>();. Adicione 'Elmo' e 'Bota' usando .Add(). Exiba a contagem final no Console com 'Total de Itens: ' + inventario.Count.",
            validationRules: { requiredPatterns: ["List<string> inventario",".Add(","inventario.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie a lista, adicione os itens e imprima o Count
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        List<string> inventario = new List<string>();
        inventario.Add("Elmo");
        inventario.Add("Bota");
        Debug.Log("Total de Itens: " + inventario.Count);
    }
}`,
            tests: [
                { input: "", expected: "Total de Itens: 2", description: "List.Add e List.Count" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: List<string> inventario, .Add(" },
                { level: "II", text: "A saída no console deve conter exatamente: Total de Itens: 2" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        List<string> inventario = new List<string>();\n        inventario.Add(\"Elmo\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["List<string> inventario",".Add(","inventario.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total de Itens: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_4",
            title: "Remoção de Item de Lista",
            difficulty: "medium",
            description: "Crie uma List<string> poderes com 'Fogo' e 'Gelo'. Remova 'Fogo' usando .Remove('Fogo'). Exiba no Console o poder restante na posição 0 com 'Poder Ativo: ' + poderes[0].",
            validationRules: { requiredPatterns: ["List<string> poderes",".Remove(","poderes[0]"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie a lista, remova 'Fogo' e imprima o item restante
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        List<string> poderes = new List<string>();
        poderes.Add("Fogo");
        poderes.Add("Gelo");
        poderes.Remove("Fogo");
        Debug.Log("Poder Ativo: " + poderes[0]);
    }
}`,
            tests: [
                { input: "", expected: "Poder Ativo: Gelo", description: "List.Remove" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: List<string> poderes, .Remove(" },
                { level: "II", text: "A saída no console deve conter exatamente: Poder Ativo: Gelo" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        List<string> poderes = new List<string>();\n        poderes.Add(\"Fogo\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["List<string> poderes",".Remove(","poderes[0]"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Poder Ativo: Gelo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 3, maxStars: 5 },
            title: "Maior Valor em Array",
            difficulty: "medium",
            description: "Declare um array de inteiros valores com { 15, 82, 43 }. Determine o maior valor e exiba 'Maior: ' + maior. (Dica: compare com if em um laço).",
            validationRules: { requiredPatterns: ["int[] valores","for","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int[] valores = new int[] { 15, 82, 43 };
        // Encontre o maior valor e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int[] valores = new int[] { 15, 82, 43 };
        int maior = valores[0];
        for (int i = 1; i < valores.Length; i++)
        {
            if (valores[i] > maior) maior = valores[i];
        }
        Debug.Log("Maior: " + maior);
    }
}`,
            tests: [
                { input: "", expected: "Maior: 82", description: "Busca de maior em array" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int[] valores, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Maior: 82" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int[] valores = new int[] { 15, 82, 43 };\n        int maior = valores[0];\n        for (int i = 1; i < valores.Length; i++)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int[] valores","for","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Maior: 82";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 06 — CLASSES E OBJETOS (OOP)
// ═══════════════════════════════════════════════════════
{
    id: 6,
    artifactReward: { artifactId: "Ring_Oroborus", minStars: 3, maxStars: 5 },
    title: "Classes e Objetos (OOP)",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Orbe Objeto",
    unlockIcon: "[OOP]",
    character: "mira",
    xpReward: 130,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando os Pilares da Orientação a Objetos. Matriz de blueprints ativada."
            },
            {
                    "type": "narrative",
                    "text": "Mira Solenn projeta hologramas tridimensionais de construtos e entidades no centro do ateliê arcano. Cada molde gera instâncias vivas e autônomas."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Uma classe é o molde sagrado, a planta arquitetônica de uma entidade. Quando invocamos a palavra-chave <code>new</code>, damos vida a um objeto concreto que possui seus próprios dados e comportamentos!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Para inicializar um objeto com valores corretos desde o nascimento, utilizamos métodos construtores. Para proteger campos críticos contra alterações descontroladas, empregamos propriedades com <code>{ get; set; }</code>, garantindo o encapsulamento seguro."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Neste capítulo, você aprenderá a instanciar entidades, configurar atributos em construtores, trabalhar com métodos de instância para desferir ataques e rastrear a contagem de inimigos ativos na simulação."
            }
    ],
    concept: {
        title: "PROGRAMAÇÃO ORIENTADA A OBJETOS: CLASSES, CONSTRUTORES, PROPRIEDADES E INSTÂNCIAS",
        explanation: "A Programação Orientada a Objetos (OOP) modela o jogo em torno de entidades que combinam dados (campos e propriedades) e ações (métodos):\n<ul>\n  <li><strong>Classes e Instanciação:</strong> Uma classe define a estrutura. Criamos uma instância usando <code>new NomeDaClasse()</code>: <code>ItemEspada item = new ItemEspada(); item.nome = \"Espada\"; item.poder = 45;</code>.</li>\n  <li><strong>Método Construtor:</strong> Método especial com o mesmo nome da classe, sem tipo de retorno, invocado automaticamente na criação: <code>public Entidade(string h, int n) { heroi = h; nivel = n; }</code>.</li>\n  <li><strong>Encapsulamento com Propriedades (<code>{ get; set; }</code>):</strong> Protege e controla o acesso a variáveis internas, permitindo expor valores de forma segura (ex: <code>public int VidaAtual { get; set; }</code> e <code>public int VidaMaxima { get; set; }</code>).</li>\n  <li><strong>Métodos de Instância:</strong> Métodos que operam sobre os dados da própria instância, como calcular danoCausado a partir de um danoBase multiplicado pela forca: <code>public int DesferirAtaque() { return danoBase * forca; }</code>.</li>\n  <li><strong>Rastreamento de Instâncias:</strong> Controla a quantidade de entidades presentes na cena gerenciando contadores e geradores de instâncias.</li>\n</ul>",
        code: `using UnityEngine;

// Definição da classe com construtor e propriedades
public class EntidadeCombate
{
    public string heroi;
    public int nivel;
    public int vidaMaxima { get; set; }
    public int vidaAtual { get; set; }
    public int danoBase;
    public int forca;

    public EntidadeCombate(string h, int n)
    {
        heroi = h;
        nivel = n;
        vidaMaxima = 100;
        vidaAtual = 75;
        danoBase = 30;
        forca = 2;
    }

    public int CalcularAtaque()
    {
        return danoBase * forca;
    }
}

public class ExemploOOP : MonoBehaviour
{
    void Start()
    {
        // 1. Instanciação e atribuição de campos
        string nomeItem = "Espada";
        int poderItem = 45;
        Debug.Log("Item: " + nomeItem + " | Poder: " + poderItem);

        // 2. Construtor inicializando entidade
        EntidadeCombate guerreiro = new EntidadeCombate("Kael", 10);
        Debug.Log("Entidade: " + guerreiro.heroi + " | Nivel: " + guerreiro.nivel);

        // 3. Acesso a propriedades encapsuladas
        Debug.Log("Vida: " + guerreiro.vidaAtual + "/" + guerreiro.vidaMaxima);

        // 4. Execução de método de instância
        int ataque = guerreiro.CalcularAtaque();
        Debug.Log("Ataque Desferido: " + ataque);

        // 5. Rastreamento de instâncias ativas
        int totalInimigos = 0;
        totalInimigos++;
        totalInimigos++;
        Debug.Log("Inimigos Ativos: " + totalInimigos);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Criando e Operando Entidades da Guilda",
        code: `using UnityEngine;

public class TesteEntidades : MonoBehaviour
{
    void Start()
    {
        string itemNome = "Espada";
        int itemPoder = 45;
        Debug.Log("Item: " + itemNome + " | Poder: " + itemPoder);

        string heroi = "Kael";
        int nivel = 10;
        Debug.Log("Entidade: " + heroi + " | Nivel: " + nivel);

        int vidaMax = 100;
        int vidaAtual = 75;
        Debug.Log("Vida: " + vidaAtual + "/" + vidaMax);

        int danoBase = 30;
        int forca = 2;
        int danoCausado = danoBase * forca;
        Debug.Log("Ataque Desferido: " + danoCausado);

        int totalInimigos = 0;
        totalInimigos++;
        totalInimigos++;
        Debug.Log("Inimigos Ativos: " + totalInimigos);
    }
}`,
        output: "Item: Espada | Poder: 45\nEntidade: Kael | Nivel: 10\nVida: 75/100\nAtaque Desferido: 60\nInimigos Ativos: 2"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Classes e Objetos (OOP) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o item e imprima seu status
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Classes e Objetos (OOP):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o item e imprima seu status
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string itemNome = "Espada";
        int itemPoder = 45;
        Debug.Log("Item: " + itemNome + " | Poder: " + itemPoder);
    }
}`,
                hint: "Item: Espada | Poder: 45"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_6_1",
            title: "Instanciação de Objeto Simples",
            difficulty: "easy",
            description: "Simule a criação de um item de inventário: crie um objeto com nome 'Espada' e poder 45. Emita no Console: 'Item: Espada | Poder: 45'.",
            validationRules: { requiredPatterns: ["string itemNome","int itemPoder","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o item e imprima seu status
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string itemNome = "Espada";
        int itemPoder = 45;
        Debug.Log("Item: " + itemNome + " | Poder: " + itemPoder);
    }
}`,
            tests: [
                { input: "", expected: "Item: Espada | Poder: 45", description: "Atributos de objeto" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string itemNome, int itemPoder" },
                { level: "II", text: "A saída no console deve conter exatamente: Item: Espada | Poder: 45" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string itemNome = \"Espada\";\n        int itemPoder = 45;\n        Debug.Log(\"Item: \" + itemNome + \" | Poder: \" + itemPoder);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string itemNome","int itemPoder","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Item: Espada | Poder: 45";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_2",
            title: "Método Construtor e Inicialização",
            difficulty: "easy",
            description: "Configure dois atributos de uma entidade: heroi 'Kael' e nivel 10. Emita no Console: 'Entidade: Kael | Nivel: 10'.",
            validationRules: { requiredPatterns: ["heroi","nivel","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Defina heroi e nivel e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string heroi = "Kael";
        int nivel = 10;
        Debug.Log("Entidade: " + heroi + " | Nivel: " + nivel);
    }
}`,
            tests: [
                { input: "", expected: "Entidade: Kael | Nivel: 10", description: "Inicialização de entidade" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: heroi, nivel" },
                { level: "II", text: "A saída no console deve conter exatamente: Entidade: Kael | Nivel: 10" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string heroi = \"Kael\";\n        int nivel = 10;\n        Debug.Log(\"Entidade: \" + heroi + \" | Nivel: \" + nivel);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["heroi","nivel","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Entidade: Kael | Nivel: 10";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_3",
            title: "Encapsulamento com Propriedades Get/Set",
            difficulty: "medium",
            description: "Simule a alteração de vida de uma entidade: inicie vidaMaxima com 100 e vidaAtual com 75. Emita no Console: 'Vida: 75/100'.",
            validationRules: { requiredPatterns: ["int vidaMaxima","int vidaAtual","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure vidaMaxima e vidaAtual
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vidaMaxima = 100;
        int vidaAtual = 75;
        Debug.Log("Vida: " + vidaAtual + "/" + vidaMaxima);
    }
}`,
            tests: [
                { input: "", expected: "Vida: 75/100", description: "Formatação de vida e teto máximo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int vidaMaxima, int vidaAtual" },
                { level: "II", text: "A saída no console deve conter exatamente: Vida: 75/100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int vidaMaxima = 100;\n        int vidaAtual = 75;\n        Debug.Log(\"Vida: \" + vidaAtual + \"/\" + vidaMaxima);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int vidaMaxima","int vidaAtual","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vida: 75/100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_4",
            title: "Método de Instância de Ataque",
            difficulty: "medium",
            description: "Invoque uma rotina de combate de objeto: calcule o danoCausado aplicando um danoBase de 30 multiplicado por forca de 2. Emita no Console: 'Ataque Desferido: 60'.",
            validationRules: { requiredPatterns: ["int danoBase","int forca","danoCausado","*"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule danoCausado e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoBase = 30;
        int forca = 2;
        int danoCausado = danoBase * forca;
        Debug.Log("Ataque Desferido: " + danoCausado);
    }
}`,
            tests: [
                { input: "", expected: "Ataque Desferido: 60", description: "Cálculo de método de ataque" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int danoBase, int forca" },
                { level: "II", text: "A saída no console deve conter exatamente: Ataque Desferido: 60" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoBase = 30;\n        int forca = 2;\n        int danoCausado = danoBase * forca;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int danoBase","int forca","danoCausado","*"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Ataque Desferido: 60";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_5",
            artifactReward: { artifactId: "Ring_Oroborus", minStars: 3, maxStars: 5 },
            title: "Contagem de Instâncias",
            difficulty: "medium",
            description: "Simule o rastreamento de entidades ativas na cena: inicie totalInimigos com 0, incremente duas vezes e emita 'Inimigos Ativos: ' + totalInimigos.",
            validationRules: { requiredPatterns: ["totalInimigos","++","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalInimigos = 0;
        // Incremente duas vezes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalInimigos = 0;
        totalInimigos++;
        totalInimigos++;
        Debug.Log("Inimigos Ativos: " + totalInimigos);
    }
}`,
            tests: [
                { input: "", expected: "Inimigos Ativos: 2", description: "Incremento de instâncias" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: totalInimigos, ++" },
                { level: "II", text: "A saída no console deve conter exatamente: Inimigos Ativos: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalInimigos = 0;\n        totalInimigos++;\n        totalInimigos++;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["totalInimigos","++","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Inimigos Ativos: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 07 — HERANÇA E POLIMORFISMO
// ═══════════════════════════════════════════════════════
{
    id: 7,
    artifactReward: { artifactId: "Anklet_Lightning", minStars: 3, maxStars: 5 },
    title: "Herança e Polimorfismo",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Selo Polimórfico",
    unlockIcon: "[POLY]",
    character: "arkan",
    xpReward: 140,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Despertando as Linhagens e Especializações Arcanas. Herança e Polimorfismo sincronizados."
            },
            {
                    "type": "narrative",
                    "text": "O estandarte da GuildCode tremula no topo da muralha. Diferentes classes de guerreiros e arcanistas reúnem-se sob a mesma hierarquia de combate."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Todos os membros de nossa ordem descendem do mesmo arquétipo base de combatente. Mas quando um Mago conjura chamas e um Guerreiro empunha sua espada, cada um expressa sua vocação de forma única. Isso é Polimorfismo!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Em C#, uma classe derivada herda membros com a sintaxe <code>class Mago : Personagem</code>. Podemos sobrescrever métodos usando <code>virtual</code> na base e <code>override</code> na subclasse, invocando a lógica ancestral com <code>base.Metodo()</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "O polimorfismo também nos permite tratar múltiplos guerreiros e arqueiros como uma lista de ações compartilhadas, além de aplicar cálculos dinâmicos de redução de dano por armadura."
            }
    ],
    concept: {
        title: "HERANÇA, POLIMORFISMO, OVERRIDE E REUTILIZAÇÃO DE CÓDIGO BASE",
        explanation: "Herança e polimorfismo permitem criar hierarquias extensíveis sem duplicar código:\n<ul>\n  <li><strong>Herança (<code>class Sub : Base</code>):</strong> Permite que uma classe filha herde atributos e métodos de uma classe pai (ex: um <code>Guerreiro</code> herdando características de <code>Personagem</code>).</li>\n  <li><strong>Sobrescrita Polimórfica (<code>override</code>):</strong> Quando um método pai é declarado como <code>virtual</code>, a classe derivada pode reescrever seu comportamento com <code>override</code> (ex: emitir <code>classe + \" atacando com \" + arma + \"!\"</code>).</li>\n  <li><strong>Especialização de Classes:</strong> Subclasses como <code>Mago</code> podem ter habilidades exclusivas (ex: tipoInimigo 'Mago' conjurando 'Bola de Fogo').</li>\n  <li><strong>Chamada do Método Base (<code>base.Metodo()</code>):</strong> Garante que a inicialização original da classe pai seja executada antes de adicionar comportamentos da subclasse (ex: 'Base: Inicializado' seguido de 'Derivado: Equipamento Carregado').</li>\n  <li><strong>Cálculo de Dano Polimórfico:</strong> Aplicações como redução de dano por armadura (<code>int danoReal = danoRecebido - reducaoArmadura;</code>) e listas polimórficas de ações de combate iteradas sequencialmente.</li>\n</ul>",
        code: `using UnityEngine;

// Classe ancestral
public class CombatenteBase
{
    public virtual void Atacar()
    {
        Debug.Log("Base: Inicializado");
    }

    public virtual int CalcularDanoReal(int dano, int armadura)
    {
        return dano - armadura;
    }
}

// Subclasse especializada
public class GuerreiroEspecialista : CombatenteBase
{
    public override void Atacar()
    {
        base.Atacar();
        Debug.Log("Derivado: Equipamento Carregado");
    }
}

public class ExemploHeranca : MonoBehaviour
{
    void Start()
    {
        // 1. Sobrescrita de ação de combate
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");

        // 2. Subclasse Mago com habilidade arcana
        string tipoInimigo = "Mago";
        string magia = "Bola de Fogo";
        Debug.Log(tipoInimigo + " conjurando " + magia + "!");

        // 3. Sequência Base e Derivado
        Debug.Log("Base: Inicializado");
        Debug.Log("Derivado: Equipamento Carregado");

        // 4. Cálculo de dano com redução de armadura
        int danoRecebido = 50;
        int reducaoArmadura = 15;
        int danoReal = danoRecebido - reducaoArmadura;
        Debug.Log("Dano Sofrido: " + danoReal);

        // 5. Lista polimórfica de ações
        string[] acoes = { "Arqueiro Dispara", "Guerreiro Golpeia" };
        for (int i = 0; i < acoes.Length; i++)
        {
            Debug.Log(acoes[i]);
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Batalha Polimórfica da Guilda",
        code: `using UnityEngine;

public class BatalhaPolimorfica : MonoBehaviour
{
    void Start()
    {
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");

        string tipoInimigo = "Mago";
        string magia = "Bola de Fogo";
        Debug.Log(tipoInimigo + " conjurando " + magia + "!");

        Debug.Log("Base: Inicializado");
        Debug.Log("Derivado: Equipamento Carregado");

        int dano = 50;
        int armadura = 15;
        int final = dano - armadura;
        Debug.Log("Dano Sofrido: " + final);

        string[] golpes = { "Arqueiro Dispara", "Guerreiro Golpeia" };
        for (int i = 0; i < golpes.Length; i++)
        {
            Debug.Log(golpes[i]);
        }
    }
}`,
        output: "Guerreiro atacando com Espada!\nMago conjurando Bola de Fogo!\nBase: Inicializado\nDerivado: Equipamento Carregado\nDano Sofrido: 35\nArqueiro Dispara\nGuerreiro Golpeia"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Herança e Polimorfismo e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare classe e arma e emita o ataque
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Herança e Polimorfismo:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare classe e arma e emita o ataque
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");
    }
}`,
                hint: "Guerreiro atacando com Espada!"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_7_1",
            title: "Sobrescrita de Mensagem (Override)",
            difficulty: "easy",
            description: "Declare string classe = 'Guerreiro'; e string arma = 'Espada';. Simule a ação herdada emitida com Debug.Log(classe + ' atacando com ' + arma + '!');.",
            validationRules: { requiredPatterns: ["string classe","string arma","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare classe e arma e emita o ataque
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");
    }
}`,
            tests: [
                { input: "", expected: "Guerreiro atacando com Espada!", description: "Ação polimórfica" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string classe, string arma" },
                { level: "II", text: "A saída no console deve conter exatamente: Guerreiro atacando com Espada!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string classe = \"Guerreiro\";\n        string arma = \"Espada\";\n        Debug.Log(classe + \" atacando com \" + arma + \"!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string classe","string arma","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Guerreiro atacando com Espada!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_2",
            title: "Subclasse Mago com Habilidade Arcana",
            difficulty: "easy",
            description: "Declare tipoInimigo como 'Mago' e magia como 'Bola de Fogo'. Emita no Console: 'Mago conjurando Bola de Fogo!'.",
            validationRules: { requiredPatterns: ["tipoInimigo","magia","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure tipoInimigo e magia e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tipoInimigo = "Mago";
        string magia = "Bola de Fogo";
        Debug.Log(tipoInimigo + " conjurando " + magia + "!");
    }
}`,
            tests: [
                { input: "", expected: "Mago conjurando Bola de Fogo!", description: "Especialização de subclasse" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tipoInimigo, magia" },
                { level: "II", text: "A saída no console deve conter exatamente: Mago conjurando Bola de Fogo!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tipoInimigo = \"Mago\";\n        string magia = \"Bola de Fogo\";\n        Debug.Log(tipoInimigo + \" conjurando \" + magia + \"!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tipoInimigo","magia","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mago conjurando Bola de Fogo!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_3",
            title: "Chamada de Método Base",
            difficulty: "medium",
            description: "Declare string fase1 = 'Base: Inicializado'; e string fase2 = 'Derivado: Equipamento Carregado';. Emita ambas em linhas separadas no Console.",
            validationRules: { requiredPatterns: ["string fase1","string fase2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare fase1 e fase2 e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string fase1 = "Base: Inicializado";
        string fase2 = "Derivado: Equipamento Carregado";
        Debug.Log(fase1);
        Debug.Log(fase2);
    }
}`,
            tests: [
                { input: "", expected: "Base: Inicializado\nDerivado: Equipamento Carregado", description: "Sequência base e derivada" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string fase1, string fase2" },
                { level: "II", text: "A saída no console deve conter exatamente: Base: Inicializado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string fase1 = \"Base: Inicializado\";\n        string fase2 = \"Derivado: Equipamento Carregado\";\n        Debug.Log(fase1);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string fase1","string fase2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Base: Inicializado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_4",
            title: "Cálculo de Armadura Polimórfico",
            difficulty: "medium",
            description: "Declare o danoRecebido como 50 e a reducaoArmadura como 15. Calcule o danoReal subtraindo a redução do dano e emita 'Dano Sofrido: ' + danoReal.",
            validationRules: { requiredPatterns: ["danoRecebido","reducaoArmadura","danoReal","-"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o dano considerando a armadura
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoRecebido = 50;
        int reducaoArmadura = 15;
        int danoReal = danoRecebido - reducaoArmadura;
        Debug.Log("Dano Sofrido: " + danoReal);
    }
}`,
            tests: [
                { input: "", expected: "Dano Sofrido: 35", description: "Redução de dano por armadura" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: danoRecebido, reducaoArmadura" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Sofrido: 35" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoRecebido = 50;\n        int reducaoArmadura = 15;\n        int danoReal = danoRecebido - reducaoArmadura;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["danoRecebido","reducaoArmadura","danoReal","-"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Sofrido: 35";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 3, maxStars: 5 },
            title: "Lista Polimórfica de Ações",
            difficulty: "medium",
            description: "Crie um array com duas ações de combate: 'Arqueiro Dispara' e 'Guerreiro Golpeia'. Itere pelo array exibindo cada ação no Console.",
            validationRules: { requiredPatterns: ["string[] acoes","for","acoes.Length"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Percorra o array de acoes
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] acoes = new string[] { "Arqueiro Dispara", "Guerreiro Golpeia" };
        for (int i = 0; i < acoes.Length; i++)
        {
            Debug.Log("Acao: " + acoes[i]);
        }
    }
}`,
            tests: [
                { input: "", expected: "Acao: Arqueiro Dispara\nAcao: Guerreiro Golpeia", description: "Lista de ações polimórficas" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] acoes, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Acao: Arqueiro Dispara" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] acoes = new string[] { \"Arqueiro Dispara\", \"Guerreiro Golpeia\" };\n        for (int i = 0; i < acoes.Length; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] acoes","for","acoes.Length"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Acao: Arqueiro Dispara";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 08 — GAMEOBJECTS E COMPONENTS
// ═══════════════════════════════════════════════════════
{
    id: 8,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 3, maxStars: 5 },
    title: "GameObjects e Components",
    theme: "Módulo 2 — Fundamentos do Unity",
    unlock: "GameObject Rúnico",
    unlockIcon: "[GO]",
    character: "orin",
    xpReward: 150,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 2 — Fundamentos do Unity. Hierarquia da Cena e Componentes sincronizados."
            },
            {
                    "type": "narrative",
                    "text": "A arquitetura do mundo ganha profundidade espacial. Entidades deixam de ser simples classes de memória e se manifestam como GameObjects completos no cenário 3D."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "No Unity, um <code>GameObject</code> é uma entidade vazia por si só — como um manequim. Seu poder vem dos <strong>Components</strong> anexados a ele! Um colisor dá solidez, um renderer dá aparência e um script dá inteligência."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Podemos identificar qualquer entidade na cena lendo sua propriedade <code>gameObject.name</code> ou verificando sua etiqueta com <code>tag == 'Player'</code>. Para obter referência a outro componente acoplado ao objeto, utilizamos <code>GetComponent&lt;Rigidbody&gt;()</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Um GameObject também pode ser ativado ou desativado com <code>SetActive(true/false)</code>, e inspecionado para saber o total de componentes que possui acoplados."
            }
    ],
    concept: {
        title: "ARQUITETURA COMPONENTE-ENTIDADE DO UNITY: GAMEOBJECTS E COMPONENTS",
        explanation: "O Unity utiliza um modelo de Composição em vez de herança pura. Toda entidade na cena é um <code>GameObject</code>:\n<ul>\n  <li><strong>Nome do GameObject:</strong> Acessível através da propriedade <code>gameObject.name</code> (ex: verificar se o nome do jogador é \"Jogador\").</li>\n  <li><strong>Tags de Identificação:</strong> Tags categorizam GameObjects na cena. Comparar <code>tag == \"Player\"</code> permite saber se o objeto é o protagonista antes de executar lógicas sensíveis.</li>\n  <li><strong>Busca de Componentes com GetComponent:</strong> O método <code>GetComponent&lt;T&gt;()</code> pesquisa um componente do tipo especificado anexado ao mesmo GameObject (ex: verificar se existe um <code>Rigidbody</code> acoplado para aplicar forças físicas).</li>\n  <li><strong>Estado Ativo (<code>activeSelf</code> / <code>SetActive</code>):</strong> Determina se o GameObject está participando da simulação ou desativado em segundo plano (ex: <code>bool estaAtivo = true;</code>).</li>\n  <li><strong>Contagem e Conjuntos de Componentes:</strong> GameObjects contêm conjuntos de componentes essenciais (ex: <code>Transform</code>, <code>MeshRenderer</code>, <code>Collider</code>), cujo total pode ser verificado através da contagem de referências.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploGameObjects : MonoBehaviour
{
    void Start()
    {
        // 1. Identificação pelo nome do GameObject
        string nomeObjeto = gameObject.name;
        Debug.Log("GameObject: " + nomeObjeto);

        // 2. Verificação de Tag de categoria
        string tagObjeto = "Player";
        if (tagObjeto == "Player")
        {
            Debug.Log("Tag Valida: Player");
        }

        // 3. Simulação de busca com GetComponent<Rigidbody>
        bool temRigidbody = true;
        if (temRigidbody)
        {
            Debug.Log("Componente Rigidbody Encontrado");
        }

        // 4. Estado de ativação na cena
        bool estaAtivo = true;
        Debug.Log("GameObject Ativo: " + estaAtivo);

        // 5. Total de componentes estruturais
        string[] componentes = { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + componentes.Length);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Diagnóstico de Entidade na Cena Unity",
        code: `using UnityEngine;

public class DiagnosticoCena : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: Jogador");

        string tag = "Player";
        if (tag == "Player") Debug.Log("Tag Valida: Player");

        bool temRigidbody = true;
        if (temRigidbody) Debug.Log("Componente Rigidbody Encontrado");

        bool ativo = true;
        Debug.Log("GameObject Ativo: " + ativo);

        string[] comps = { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + comps.Length);
    }
}`,
        output: "GameObject: Jogador\nTag Valida: Player\nComponente Rigidbody Encontrado\nGameObject Ativo: True\nTotal de Componentes: 3"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de GameObjects e Components e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o nome do GameObject
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de GameObjects e Components:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o nome do GameObject
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: " + gameObject.name);
    }
}`,
                hint: "GameObject: Jogador"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_8_1",
            title: "Identificação de GameObject",
            difficulty: "easy",
            description: "Obtenha o nome do GameObject atual acessando a propriedade gameObject.name. Emita no Console: 'GameObject: Jogador'.",
            validationRules: { requiredPatterns: ["gameObject.name","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o nome do GameObject
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: " + gameObject.name);
    }
}`,
            tests: [
                { input: "", expected: "GameObject: Jogador", description: "Acesso a gameObject.name" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: gameObject.name, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: GameObject: Jogador" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"GameObject: \" + gameObject.name);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["gameObject.name","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "GameObject: Jogador";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_2",
            title: "Verificação de Tag",
            difficulty: "easy",
            description: "Defina a variável string tag = 'Player';. Verifique com if se a tag é igual a 'Player' e emita 'Tag Valida: Player'.",
            validationRules: { requiredPatterns: ["tag","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tag = "Player";
        // Cheque a tag e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tag = "Player";
        if (tag == "Player")
        {
            Debug.Log("Tag Valida: " + tag);
        }
    }
}`,
            tests: [
                { input: "", expected: "Tag Valida: Player", description: "Checagem de tag" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tag, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Tag Valida: Player" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tag = \"Player\";\n        if (tag == \"Player\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tag","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Tag Valida: Player";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_3",
            title: "Simulação de GetComponent",
            difficulty: "medium",
            description: "Simule a busca de um componente Rigidbody: declare bool temRigidbody = true;. Se for verdadeiro, emita 'Componente Rigidbody Encontrado'.",
            validationRules: { requiredPatterns: ["bool temRigidbody","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temRigidbody = true;
        // Cheque e emita a mensagem
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temRigidbody = true;
        if (temRigidbody)
        {
            Debug.Log("Componente Rigidbody Encontrado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Componente Rigidbody Encontrado", description: "Verificação de componente" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool temRigidbody, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Componente Rigidbody Encontrado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool temRigidbody = true;\n        if (temRigidbody)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool temRigidbody","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Componente Rigidbody Encontrado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_4",
            title: "Estado Ativo de GameObject",
            difficulty: "medium",
            description: "Declare a variável booleana estaAtivo = true;. Emita no Console: 'GameObject Ativo: True'.",
            validationRules: { requiredPatterns: ["bool estaAtivo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare estaAtivo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaAtivo = true;
        Debug.Log("GameObject Ativo: " + estaAtivo);
    }
}`,
            tests: [
                { input: "", expected: "GameObject Ativo: True", description: "Estado de ativação" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaAtivo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: GameObject Ativo: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaAtivo = true;\n        Debug.Log(\"GameObject Ativo: \" + estaAtivo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaAtivo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "GameObject Ativo: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 3, maxStars: 5 },
            title: "Contagem de Componentes",
            difficulty: "medium",
            description: "Declare um array com os componentes do Player: 'Transform', 'MeshRenderer', 'Collider'. Exiba no Console: 'Total de Componentes: ' + componentes.Length.",
            validationRules: { requiredPatterns: ["string[] componentes","componentes.Length","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array de componentes e exiba o Length
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] componentes = new string[] { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + componentes.Length);
    }
}`,
            tests: [
                { input: "", expected: "Total de Componentes: 3", description: "Contagem de componentes" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] componentes, componentes.Length" },
                { level: "II", text: "A saída no console deve conter exatamente: Total de Componentes: 3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] componentes = new string[] { \"Transform\", \"MeshRenderer\", \"Collider\" };\n        Debug.Log(\"Total de Componentes: \" + componentes.Length);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] componentes","componentes.Length","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total de Componentes: 3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 09 — TRANSFORM — POSIÇÃO, ROTAÇÃO E ESCALA
// ═══════════════════════════════════════════════════════
{
    id: 9,
    artifactReward: { artifactId: "Ring_Draco", minStars: 3, maxStars: 5 },
    title: "Transform — Posição, Rotação e Escala",
    theme: "Módulo 2 — Fundamentos do Unity",
    unlock: "Giz Espacial Transform",
    unlockIcon: "[TR]",
    character: "lyra",
    xpReward: 160,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Alinhando os Eixos Espaciais. Componente Transform carregado na raiz de todas as entidades."
            },
            {
                    "type": "narrative",
                    "text": "Grid tridimensionais em azul (Z), vermelho (X) e verde (Y) desenham-se sobre a sala dimensional. Lyra Nex rotaciona prismas flutuantes com movimentos precisos."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Existe um único componente que todo GameObject possui obrigatoriamente e nunca pode ser removido: o <strong>Transform</strong>! Ele define onde a entidade existe no espaço (position), para onde ela olha (rotation) e quão grande ela é (localScale)."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Para deslocar um personagem suavemente, usamos <code>transform.Translate()</code> multiplicando a velocidade pelo tempo decorrido (<code>dt</code>). Para girar, aplicamos rotações ao redor do eixo Y, e para saber a direção frontal do herói, lemos o vetor <code>transform.forward</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Entenda o cálculo de deslocamento: <code>velocidade * deltaTime</code> garante que a movimentação seja independente da taxa de quadros (framerate) do jogo."
            }
    ],
    concept: {
        title: "O COMPONENTE TRANSFORM: POSIÇÃO, DESLOCAMENTO, ESCALA E ROTAÇÃO",
        explanation: "O componente <code>Transform</code> gerencia a geometria e localização de qualquer entidade no espaço 3D:\n<ul>\n  <li><strong>Posição (<code>transform.position</code>):</strong> Um <code>Vector3</code> que guarda as coordenadas X (horizontal), Y (altura) e Z (profundidade). Podemos inspecionar coordenadas individuais com <code>transform.position.x</code>.</li>\n  <li><strong>Deslocamento Suave (Translate):</strong> Em jogos, deslocamentos no tempo utilizam a fórmula clássica da física: <code>deslocamento = velocidade * deltaTime</code> (ex: <code>float vel = 5.0f; float dt = 0.016f; float deslocamento = vel * dt;</code>).</li>\n  <li><strong>Escala Local (<code>transform.localScale</code>):</strong> Multiplicador de tamanho do objeto em relação ao seu modelo original (ex: redimensionar escalaX e escalaY para 2.0f gera a nova escala <code>(2, 2)</code>).</li>\n  <li><strong>Rotação Angular:</strong> Rotação ao redor do eixo vertical Y em graus por segundo (ex: <code>float velRotacao = 90.0f;</code> girando o personagem 90 graus/s).</li>\n  <li><strong>Vetor Direcional Forward (<code>transform.forward</code>):</strong> Vetor unitário que aponta exatamente para a frente de onde o objeto está olhando (sua coordenada <code>transform.forward.z</code> indica a orientação frontal).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploTransform : MonoBehaviour
{
    void Start()
    {
        // 1. Leitura de coordenada de posição
        float posX = transform.position.x;
        Debug.Log("Posicao X: " + posX);

        // 2. Cálculo de deslocamento proporcional ao tempo
        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);

        // 3. Ajuste de escala local
        float escalaX = 2.0f;
        float escalaY = 2.0f;
        Debug.Log("Nova Escala: (" + escalaX + ", " + escalaY + ")");

        // 4. Rotação em torno do eixo Y
        float velRotacao = 90.0f;
        Debug.Log("Rotacao Y: " + velRotacao + " graus/s");

        // 5. Vetor direcional frontal (forward)
        float direcaoZ = transform.forward.z;
        Debug.Log("Direcao Z: " + direcaoZ);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Movimentação e Orientação Espacial",
        code: `using UnityEngine;

public class ControladorTransform : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);

        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);

        float sx = 2.0f;
        float sy = 2.0f;
        Debug.Log("Nova Escala: (" + sx + ", " + sy + ")");

        float velRot = 90.0f;
        Debug.Log("Rotacao Y: " + velRot + " graus/s");

        Debug.Log("Direcao Z: " + transform.forward.z);
    }
}`,
        output: "Posicao X: 0\nDeslocamento: 0.08\nNova Escala: (2, 2)\nRotacao Y: 90 graus/s\nDirecao Z: 1"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Transform — Posição, Rotação e Escala e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada X da posicao
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Transform — Posição, Rotação e Escala:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada X da posicao
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);
    }
}`,
                hint: "Posicao X: 0"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_9_1",
            title: "Leitura de Posição Inicial",
            difficulty: "easy",
            description: "Acesse as coordenadas de posição inicial do transform e emita no Console: 'Posicao X: ' + transform.position.x.",
            validationRules: { requiredPatterns: ["transform.position.x","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada X da posicao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);
    }
}`,
            tests: [
                { input: "", expected: "Posicao X: 0", description: "Acesso a transform.position.x" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: transform.position.x, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Posicao X: 0" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"Posicao X: \" + transform.position.x);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["transform.position.x","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Posicao X: 0";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_2",
            title: "Deslocamento com Translate",
            difficulty: "easy",
            description: "Simule um deslocamento: declare float vel = 5.0f e float dt = 0.016f. Calcule o deslocamento como vel * dt e emita 'Deslocamento: ' + deslocamento.",
            validationRules: { requiredPatterns: ["float vel","float dt","vel * dt","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float vel = 5.0f;
        float dt = 0.016f;
        // Calcule o deslocamento e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);
    }
}`,
            tests: [
                { input: "", expected: "Deslocamento: 0.08", description: "Cálculo de Translate" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float vel, float dt" },
                { level: "II", text: "A saída no console deve conter exatamente: Deslocamento: 0.08" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float vel = 5.0f;\n        float dt = 0.016f;\n        float deslocamento = vel * dt;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float vel","float dt","vel * dt","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Deslocamento: 0.08";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_3",
            title: "Ajuste de Escala Local",
            difficulty: "medium",
            description: "Simule a alteração da escala de um objeto: defina escalaX = 2.0f e escalaY = 2.0f. Emita no Console: 'Nova Escala: (2, 2)'.",
            validationRules: { requiredPatterns: ["float escalaX","float escalaY","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure as escalas e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float escalaX = 2.0f;
        float escalaY = 2.0f;
        Debug.Log("Nova Escala: (" + escalaX + ", " + escalaY + ")");
    }
}`,
            tests: [
                { input: "", expected: "Nova Escala: (2, 2)", description: "Escala local" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float escalaX, float escalaY" },
                { level: "II", text: "A saída no console deve conter exatamente: Nova Escala: (2, 2)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float escalaX = 2.0f;\n        float escalaY = 2.0f;\n        Debug.Log(\"Nova Escala: (\" + escalaX + \", \" + escalaY + \")\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float escalaX","float escalaY","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Nova Escala: (2, 2)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_4",
            title: "Rotação em Torno do Eixo Y",
            difficulty: "medium",
            description: "Declare a velocidade de giro float velRotacao = 90.0f;. Emita no Console: 'Rotacao Y: ' + velRotacao + ' graus/s'.",
            validationRules: { requiredPatterns: ["float velRotacao","velRotacao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare velRotacao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float velRotacao = 90.0f;
        Debug.Log("Rotacao Y: " + velRotacao + " graus/s");
    }
}`,
            tests: [
                { input: "", expected: "Rotacao Y: 90 graus/s", description: "Velocidade angular de rotação" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float velRotacao, velRotacao" },
                { level: "II", text: "A saída no console deve conter exatamente: Rotacao Y: 90 graus/s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float velRotacao = 90.0f;\n        Debug.Log(\"Rotacao Y: \" + velRotacao + \" graus/s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float velRotacao","velRotacao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Rotacao Y: 90 graus/s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_5",
            artifactReward: { artifactId: "Ring_Draco", minStars: 3, maxStars: 5 },
            title: "Vetor Forward de Direção",
            difficulty: "medium",
            description: "Obtenha a coordenada z do vetor direcional transform.forward. Emita no Console: 'Direcao Z: ' + transform.forward.z.",
            validationRules: { requiredPatterns: ["transform.forward.z","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o forward z
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Direcao Z: " + transform.forward.z);
    }
}`,
            tests: [
                { input: "", expected: "Direcao Z: 1", description: "Transform forward direction" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: transform.forward.z, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Direcao Z: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"Direcao Z: \" + transform.forward.z);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["transform.forward.z","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Direcao Z: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 10 — CICLO DE VIDA DO MONOBEHAVIOUR
// ═══════════════════════════════════════════════════════
{
    id: 10,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 5 },
    title: "Ciclo de Vida do MonoBehaviour",
    theme: "Módulo 2 — Fundamentos do Unity",
    unlock: "Ampulheta Update",
    unlockIcon: "[CYCLE]",
    character: "arkan",
    xpReward: 170,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conectando ao Clock Universal da Engine. Ciclo de vida de execução de scripts inicializado."
            },
            {
                    "type": "narrative",
                    "text": "O pulso rítmico da dimensão dita a frequência dos eventos. Arkan Velor desenha a linha do tempo sequencial dos métodos internos da Unity."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Um script herdado de <code>MonoBehaviour</code> não possui uma função main() comum! A engine invoca automaticamente métodos específicos em cada fase da vida do objeto: nascimento, atualização de quadro, física e morte."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "A ordem sagrada de nascimento é imutável: <code>Awake()</code> é chamado primeiro para autoinicialização, seguido de <code>Start()</code> para conexões com outros scripts. Depois vem o loop contínuo: <code>Update()</code> roda a cada frame gráfico, <code>FixedUpdate()</code> a cada 0.02s para física determinística e <code>LateUpdate()</code> para câmeras seguirem personagens após eles terem se movido!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Quando uma entidade é destruída ou sai da cena, <code>OnDestroy()</code> é disparado para liberar recursos e cancelar assinaturas. Conhecer essa linha do tempo evita as armadilhas mais comuns de NullReferenceException em jogos."
            }
    ],
    concept: {
        title: "O CICLO DE VIDA DO MONOBEHAVIOUR: AWAKE, START, UPDATE, FIXEDUPDATE E LATEUPDATE",
        explanation: "Os métodos do ciclo de vida são chamados automaticamente pela Unity em momentos precisos:\n<ul>\n  <li><strong>Awake() vs Start():</strong> <code>Awake()</code> roda assim que o prefab/objeto nasce na memória, ideal para referências internas. <code>Start()</code> roda logo antes do primeiro frame, ideal para lógicas de inicialização compartilhada (ex: em Awake emite '1. Awake' e em Start emite '2. Start').</li>\n  <li><strong>Update():</strong> Executado uma vez por quadro gráfico renderizado (geralmente a 60 FPS ou mais). É o lar natural da leitura de inputs e lógicas visuais.</li>\n  <li><strong>FixedUpdate():</strong> Executado em intervalos de tempo fixos e regulares (por padrão a cada <code>0.02s</code> / 50Hz), desacoplado do framerate visual. É o único lugar seguro para cálculos de física e Rigidbody.</li>\n  <li><strong>LateUpdate():</strong> Executado após todos os métodos Update terem sido concluídos no frame. É perfeito para posicionar a câmera, garantindo que o herói já tenha terminado toda a sua movimentação no quadro atual.</li>\n  <li><strong>OnDestroy():</strong> Disparado quando o GameObject é removido da cena com Destroy, servindo para limpeza de memória, desativação de listeners e persistência de emergência.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploCicloDeVida : MonoBehaviour
{
    void Awake()
    {
        // 1. Inicialização prematura obrigatória
        Debug.Log("1. Awake");
    }

    void Start()
    {
        // 2. Inicialização antes do primeiro frame
        Debug.Log("2. Start");

        // Simulação de FPS em Update
        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");

        // Simulação do intervalo de física do FixedUpdate (0.02s padrão)
        float fixedDeltaTime = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDeltaTime + "s");

        // Simulação de posicionamento de câmera em LateUpdate
        string faseCamera = "LateUpdate: Posicionando Camera";
        Debug.Log(faseCamera);

        // Simulação de finalização em OnDestroy
        string statusDestruicao = "OnDestroy: Recursos Liberados";
        Debug.Log(statusDestruicao);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Sequenciador Temporal do Ciclo de Vida",
        code: `using UnityEngine;

public class SequenciadorCiclo : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");

        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");

        float fixedDelta = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDelta + "s");

        string camera = "LateUpdate: Posicionando Camera";
        Debug.Log(camera);

        string cleanup = "OnDestroy: Recursos Liberados";
        Debug.Log(cleanup);
    }
}`,
        output: "1. Awake\n2. Start\nUpdate Ativo: 60 FPS\nFixedUpdate Intervalo: 0.02s\nLateUpdate: Posicionando Camera\nOnDestroy: Recursos Liberados"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Ciclo de Vida do MonoBehaviour e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    // Defina Awake e Start
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Ciclo de Vida do MonoBehaviour:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    // Defina Awake e Start
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");
    }
}`,
                hint: "1. Awake"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_10_1",
            title: "Ordem de Inicialização (Awake & Start)",
            difficulty: "easy",
            description: "Implemente os métodos Awake() e Start() no script. Em Awake, emita '1. Awake' e em Start emita '2. Start'.",
            validationRules: { requiredPatterns: ["void Awake()","void Start()","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    // Defina Awake e Start
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");
    }
}`,
            tests: [
                { input: "", expected: "1. Awake\n2. Start", description: "Awake antes de Start" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: void Awake(), void Start()" },
                { level: "II", text: "A saída no console deve conter exatamente: 1. Awake" },
                { level: "III", text: "Exemplo estrutural:\n    void Awake()\n    {\n        Debug.Log(\"1. Awake\");\n    }\n" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["void Awake()","void Start()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "1. Awake";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_2",
            title: "Simulação de Atualização de Quadro (Update)",
            difficulty: "easy",
            description: "Declare int fps = 60;. Dentro de Start(), emita no Console: 'Update Ativo: ' + fps + ' FPS'.",
            validationRules: { requiredPatterns: ["int fps","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare int fps = 60 e imprima com Debug.Log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");
    }
}`,
            tests: [
                { input: "", expected: "Update Ativo: 60 FPS", description: "Frequência de Update" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int fps, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Update Ativo: 60 FPS" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int fps = 60;\n        Debug.Log(\"Update Ativo: \" + fps + \" FPS\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int fps","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Update Ativo: 60 FPS";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_3",
            title: "Física Síncrona com FixedUpdate",
            difficulty: "medium",
            description: "Declare float fixedDeltaTime = 0.02f;. Emita no Console em Start o intervalo de física padrão do Unity: 'FixedUpdate Intervalo: ' + fixedDeltaTime + 's'.",
            validationRules: { requiredPatterns: ["float fixedDeltaTime","0.02f","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare fixedDeltaTime e emita o intervalo de física
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float fixedDeltaTime = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDeltaTime + "s");
    }
}`,
            tests: [
                { input: "", expected: "FixedUpdate Intervalo: 0.02s", description: "Frequência fixa de física" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float fixedDeltaTime, 0.02f" },
                { level: "II", text: "A saída no console deve conter exatamente: FixedUpdate Intervalo: 0.02s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float fixedDeltaTime = 0.02f;\n        Debug.Log(\"FixedUpdate Intervalo: \" + fixedDeltaTime + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float fixedDeltaTime","0.02f","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "FixedUpdate Intervalo: 0.02s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_4",
            title: "Ajuste de Câmera em LateUpdate",
            difficulty: "medium",
            description: "Declare string faseCamera = 'LateUpdate: Posicionando Camera';. Emita no Console o valor de faseCamera com Debug.Log.",
            validationRules: { requiredPatterns: ["string faseCamera","faseCamera","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare faseCamera e emita o log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string faseCamera = "LateUpdate: Posicionando Camera";
        Debug.Log(faseCamera);
    }
}`,
            tests: [
                { input: "", expected: "LateUpdate: Posicionando Camera", description: "LateUpdate pós-movimento" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string faseCamera, faseCamera" },
                { level: "II", text: "A saída no console deve conter exatamente: LateUpdate: Posicionando Camera" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string faseCamera = \"LateUpdate: Posicionando Camera\";\n        Debug.Log(faseCamera);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string faseCamera","faseCamera","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "LateUpdate: Posicionando Camera";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 5 },
            title: "Limpeza de Recursos em OnDestroy",
            difficulty: "medium",
            description: "Declare string statusDestruicao = 'OnDestroy: Recursos Liberados';. Emita a mensagem com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusDestruicao","statusDestruicao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusDestruicao e emita o log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusDestruicao = "OnDestroy: Recursos Liberados";
        Debug.Log(statusDestruicao);
    }
}`,
            tests: [
                { input: "", expected: "OnDestroy: Recursos Liberados", description: "Ciclo OnDestroy" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusDestruicao, statusDestruicao" },
                { level: "II", text: "A saída no console deve conter exatamente: OnDestroy: Recursos Liberados" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusDestruicao = \"OnDestroy: Recursos Liberados\";\n        Debug.Log(statusDestruicao);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusDestruicao","statusDestruicao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "OnDestroy: Recursos Liberados";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 11 — INPUT SYSTEM MODERNO
// ═══════════════════════════════════════════════════════
{
    id: 11,
    artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 5 },
    title: "Input System Moderno",
    theme: "Módulo 3 — Input System Moderno",
    unlock: "Manopla Input",
    unlockIcon: "[IN]",
    character: "elion",
    xpReward: 180,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 3 — Input System Moderno. Periféricos de controle e sensores ativados."
            },
            {
                    "type": "narrative",
                    "text": "Painéis hápticos, teclas flutuantes e ponteiros de mira sincronizam-se na câmara de testes. Elion Raven comanda a bancada de dispositivos de entrada."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA & ANALISTA",
                    "cssClass": "elion",
                    "text": "O antigo Input Manager clássico do Unity ficou no passado. A nova arquitetura profissional do Unity Input System baseia-se em instâncias orientadas a dispositivos e eventos, como <code>Keyboard.current</code> e <code>Mouse.current</code>!"
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Isso nos dá precisão milimétrica: <code>spaceKey.wasPressedThisFrame</code> detecta o instante exato do pulo sem engasgos; <code>wKey.isPressed</code> checa a aceleração contínua, e o mouse informa cliques instantâneos e sua posição absoluta na tela!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Além de teclado e mouse, o sistema moderno suporta Gamepads e múltiplos controles simultâneos com a mesma interface limpa. Domine a leitura dos botões e posições neste capítulo."
            }
    ],
    concept: {
        title: "O NOVO INPUT SYSTEM DO UNITY: KEYBOARD, MOUSE E MULTI-DISPOSITIVOS",
        explanation: "O Unity Input System moderno (pacote <code>com.unity.inputsystem</code>) substitui as antigas funções estáticas por classes orientadas a periféricos ativos:\n<ul>\n  <li><strong>Disparo Único de Tecla (wasPressedThisFrame):</strong> Avalia se uma tecla foi pressionada exatamente no frame atual (ex: <code>if (Keyboard.current.spaceKey.wasPressedThisFrame) Debug.Log(\"Pulo Acionado!\");</code>). Evita múltiplos pulos indesejados.</li>\n  <li><strong>Estado Contínuo (isPressed):</strong> Retorna <code>true</code> enquanto a tecla estiver sendo mantida pressionada pelo jogador (ex: <code>if (Keyboard.current.wKey.isPressed) Debug.Log(\"Acelerando para Frente\");</code>).</li>\n  <li><strong>Clique do Mouse:</strong> Opera através de <code>Mouse.current.leftButton.wasPressedThisFrame</code> para acionar disparos ou golpes no momento exato do clique.</li>\n  <li><strong>Posição do Cursor (ReadValue):</strong> Lê as coordenadas do ponteiro na tela com <code>float mouseX = Mouse.current.position.ReadValue().x;</code>.</li>\n  <li><strong>Arquitetura Multi-Dispositivo:</strong> Permite consultar o periférico principal conectado (teclados, gamepads, telas de toque) de maneira transparente e unificada.</li>\n</ul>",
        code: `using UnityEngine;
using UnityEngine.InputSystem;

public class ExemploInputSystem : MonoBehaviour
{
    void Start()
    {
        // 1. Simulação de pulo com spaceKey
        bool pulou = Keyboard.current != null && Keyboard.current.spaceKey.wasPressedThisFrame;
        if (pulou)
        {
            Debug.Log("Pulo Acionado!");
        }

        // 2. Simulação de aceleração contínua com wKey
        bool acelerando = Keyboard.current != null && Keyboard.current.wKey.isPressed;
        if (acelerando)
        {
            Debug.Log("Acelerando para Frente");
        }

        // 3. Disparo com clique do mouse
        bool disparou = Mouse.current != null && Mouse.current.leftButton.wasPressedThisFrame;
        if (disparou)
        {
            Debug.Log("Disparo Efetuado!");
        }

        // 4. Leitura da posição X do mouse
        float mouseX = Mouse.current != null ? Mouse.current.position.ReadValue().x : 100.0f;
        Debug.Log("Mouse X: " + mouseX);

        // 5. Verificação de dispositivo ativo
        bool tecladoConectado = true;
        bool gamepadConectado = false;
        if (tecladoConectado)
        {
            Debug.Log("Dispositivo Principal: Teclado");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Rastreamento de Controles Modernos",
        code: `using UnityEngine;
using UnityEngine.InputSystem;

public class TesteControles : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Pulo Acionado!");
        Debug.Log("Acelerando para Frente");
        Debug.Log("Disparo Efetuado!");

        float x = 100.0f;
        Debug.Log("Mouse X: " + x);

        bool teclado = true;
        if (teclado) Debug.Log("Dispositivo Principal: Teclado");
    }
}`,
        output: "Pulo Acionado!\nAcelerando para Frente\nDisparo Efetuado!\nMouse X: 100\nDispositivo Principal: Teclado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Input System Moderno e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Verifique o pulo no Keyboard.current
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Input System Moderno:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Verifique o pulo no Keyboard.current
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Keyboard.current.spaceKey.wasPressedThisFrame)
        {
            Debug.Log("Pulo Acionado!");
        }
    }
}`,
                hint: "Pulo Acionado!"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_11_1",
            title: "Detecção de Tecla com Keyboard.current",
            difficulty: "easy",
            description: "Verifique o pressionamento da barra de espaço: avalie Keyboard.current.spaceKey.wasPressedThisFrame. Se for verdadeiro, emita 'Pulo Acionado!'.",
            validationRules: { requiredPatterns: ["Keyboard.current","spaceKey","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Verifique o pulo no Keyboard.current
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Keyboard.current.spaceKey.wasPressedThisFrame)
        {
            Debug.Log("Pulo Acionado!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Pulo Acionado!", description: "Detecção de spaceKey" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Keyboard.current, spaceKey" },
                { level: "II", text: "A saída no console deve conter exatamente: Pulo Acionado!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        if (Keyboard.current.spaceKey.wasPressedThisFrame)\n        {\n            Debug.Log(\"Pulo Acionado!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Keyboard.current","spaceKey","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pulo Acionado!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_11_2",
            title: "Leitura Contínua de Tecla de Movimento",
            difficulty: "easy",
            description: "Verifique se a tecla W está sendo mantida pressionada usando Keyboard.current.wKey.isPressed. Se sim, emita 'Acelerando para Frente'.",
            validationRules: { requiredPatterns: ["Keyboard.current.wKey.isPressed","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque wKey.isPressed
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Keyboard.current.wKey.isPressed)
        {
            Debug.Log("Acelerando para Frente");
        }
    }
}`,
            tests: [
                { input: "", expected: "Acelerando para Frente", description: "isPressed contínuo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Keyboard.current.wKey.isPressed, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Acelerando para Frente" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        if (Keyboard.current.wKey.isPressed)\n        {\n            Debug.Log(\"Acelerando para Frente\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Keyboard.current.wKey.isPressed","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Acelerando para Frente";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_11_3",
            title: "Clique do Botão Esquerdo do Mouse",
            difficulty: "medium",
            description: "Cheque o clique do botão esquerdo do mouse através de Mouse.current.leftButton.wasPressedThisFrame. Se verdadeiro, emita 'Disparo Efetuado!'.",
            validationRules: { requiredPatterns: ["Mouse.current.leftButton","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque o botao esquerdo do mouse
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Mouse.current.leftButton.wasPressedThisFrame)
        {
            Debug.Log("Disparo Efetuado!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Disparo Efetuado!", description: "Clique de mouse" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Mouse.current.leftButton, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Disparo Efetuado!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        if (Mouse.current.leftButton.wasPressedThisFrame)\n        {\n            Debug.Log(\"Disparo Efetuado!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Mouse.current.leftButton","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Disparo Efetuado!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_11_4",
            title: "Leitura da Posição do Mouse",
            difficulty: "medium",
            description: "Obtenha a coordenada X do ponteiro do mouse chamando Mouse.current.position.ReadValue().x. Emita no Console: 'Mouse X: ' + mouseX.",
            validationRules: { requiredPatterns: ["Mouse.current.position.ReadValue()","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Leia a posicao do mouse e imprima X
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int mouseX = Mouse.current.position.ReadValue().x;
        Debug.Log("Mouse X: " + mouseX);
    }
}`,
            tests: [
                { input: "", expected: "Mouse X: 100", description: "Posição do cursor" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Mouse.current.position.ReadValue(), Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Mouse X: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int mouseX = Mouse.current.position.ReadValue().x;\n        Debug.Log(\"Mouse X: \" + mouseX);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Mouse.current.position.ReadValue()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mouse X: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_11_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 5 },
            title: "Suporte Multi-Dispositivo",
            difficulty: "medium",
            description: "Simule a verificação de dispositivo conectado: declare bool tecladoConectado = true; e bool gamepadConectado = false;. Emita 'Dispositivo Principal: Teclado'.",
            validationRules: { requiredPatterns: ["bool tecladoConectado","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os dispositivos e emita o ativo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool tecladoConectado = true;
        if (tecladoConectado)
        {
            Debug.Log("Dispositivo Principal: Teclado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Dispositivo Principal: Teclado", description: "Detecção de dispositivo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool tecladoConectado, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Dispositivo Principal: Teclado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool tecladoConectado = true;\n        if (tecladoConectado)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool tecladoConectado","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dispositivo Principal: Teclado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 12 — INPUT ACTIONS & MAPEAMENTO
// ═══════════════════════════════════════════════════════
{
    id: 12,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 5 },
    title: "Input Actions & Mapeamento",
    theme: "Módulo 3 — Input System Moderno",
    unlock: "Mapa de Ações",
    unlockIcon: "[MAP]",
    character: "mira",
    xpReward: 190,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Inicializando a Camada de Abstração de Ações. Action Maps e Vinculações reconfiguráveis ativos."
            },
            {
                    "type": "narrative",
                    "text": "Mapas conceituais ligam botões físicos a intenções puras de gameplay. Mira Solenn organiza esquemas de controle que operam sem hardcoding."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Nunca amarre o código do seu personagem a uma tecla física como 'Espaço' ou 'W'! Se o jogador quiser reconfigurar as teclas ou jogar com um controle de console, o jogo quebrará. Criamos **Input Actions**, mapeando a 'intenção' do jogador!"
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "Com Action Maps, dividimos os contextos do jogo em camadas limpas: quando o herói está em combate, o mapa ativo é <code>Gameplay</code> (com pulo, ataque e vetor 2D de movimento). Quando abre um menu ou pausa o jogo, o mapa alterna para <code>UI</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Ações de interação contextual (como 'Pressione [E] para Interagir') avaliam a proximidade física do alvo antes de habilitar a ação. Conclua as 5 atividades deste capítulo para dominar os Action Maps."
            }
    ],
    concept: {
        title: "INPUT ACTIONS, ACTION MAPS E CONTROLE CONTEXTUAL DE GAMEPLAY E UI",
        explanation: "Input Actions desacoplam os comandos físicos do hardware da lógica do seu jogo:\n<ul>\n  <li><strong>Mapeamento de Ação (InputAction):</strong> Representa uma ação do jogo (como 'Pular', 'Atacar' ou 'Interagir'). Se a ação for acionada, ela registra o evento: <code>Debug.Log(\"InputAction: Pulo Registrado\");</code>.</li>\n  <li><strong>Vetor 2D de Movimento (Composite Vector2):</strong> Agrupa teclas WASD, setas direcionais ou o analógico do joystick em um vetor bidimensional <code>(horizontal, vertical)</code> (ex: <code>float horizontal = 1.0f; float vertical = 0.0f;</code> emite <code>Movimento: (1, 0)</code>).</li>\n  <li><strong>Ação Contextual por Proximidade:</strong> Interações só ficam disponíveis quando o herói está próximo o suficiente do alvo (ex: se <code>dist &lt;= 2.0f</code>, exibe <code>\"Pressione [\" + botaoInteragir + \"] para Interagir\"</code>).</li>\n  <li><strong>Habilitação de Action Maps:</strong> Grupos de ações são agrupados em mapas (ex: ativar o mapa <code>Gameplay</code> para movimentação de mundo).</li>\n  <li><strong>Alternância Dinâmica para UI:</strong> Quando o jogo é pausado (<code>bool pausado = true</code>), o mapa muda de Gameplay para <code>UI</code> para navegar em menus sem mover o personagem acidentalmente.</li>\n</ul>",
        code: `using UnityEngine;
using UnityEngine.InputSystem;

public class ExemploInputActions : MonoBehaviour
{
    void Start()
    {
        // 1. Registro de ação de pulo desacoplada
        bool acaoDisparada = true;
        if (acaoDisparada)
        {
            Debug.Log("InputAction: Pulo Registrado");
        }

        // 2. Leitura de vetor de movimento 2D (WASD / D-Pad)
        float horizontal = 1.0f;
        float vertical = 0.0f;
        Debug.Log("Movimento: (" + horizontal + ", " + vertical + ")");

        // 3. Ação contextual de interação
        string botaoInteragir = "E";
        float dist = 1.5f;
        if (dist <= 2.0f)
        {
            Debug.Log("Pressione [" + botaoInteragir + "] para Interagir");
        }

        // 4. Habilitação de Action Map
        string mapaAtivo = "Gameplay";
        Debug.Log("Mapa Ativado: " + mapaAtivo);

        // 5. Troca dinâmica ao pausar
        bool pausado = true;
        if (pausado)
        {
            string mapa = "UI";
            Debug.Log("Contexto Atual: " + mapa);
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerenciador de Ações e Contextos de Input",
        code: `using UnityEngine;

public class AcoesGameplayUI : MonoBehaviour
{
    void Start()
    {
        bool acao = true;
        if (acao) Debug.Log("InputAction: Pulo Registrado");

        float h = 1.0f;
        float v = 0.0f;
        Debug.Log("Movimento: (" + h + ", " + v + ")");

        string btn = "E";
        float dist = 1.5f;
        if (dist <= 2.0f) Debug.Log("Pressione [" + btn + "] para Interagir");

        Debug.Log("Mapa Ativado: Gameplay");

        bool pause = true;
        if (pause) Debug.Log("Contexto Atual: UI");
    }
}`,
        output: "InputAction: Pulo Registrado\nMovimento: (1, 0)\nPressione [E] para Interagir\nMapa Ativado: Gameplay\nContexto Atual: UI"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Input Actions & Mapeamento e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a acao de pulo
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Input Actions & Mapeamento:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a acao de pulo
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acaoDisparada = true;
        if (acaoDisparada)
        {
            Debug.Log("InputAction: Pulo Registrado");
        }
    }
}`,
                hint: "InputAction: Pulo Registrado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_12_1",
            title: "Mapeamento de Ação de Pulo",
            difficulty: "easy",
            description: "Simule a leitura de uma InputAction chamada 'Pular': declare bool acaoDisparada = true;. Se for verdadeira, emita 'InputAction: Pulo Registrado'.",
            validationRules: { requiredPatterns: ["bool acaoDisparada","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a acao de pulo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acaoDisparada = true;
        if (acaoDisparada)
        {
            Debug.Log("InputAction: Pulo Registrado");
        }
    }
}`,
            tests: [
                { input: "", expected: "InputAction: Pulo Registrado", description: "Trigger de InputAction" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool acaoDisparada, if" },
                { level: "II", text: "A saída no console deve conter exatamente: InputAction: Pulo Registrado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool acaoDisparada = true;\n        if (acaoDisparada)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool acaoDisparada","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "InputAction: Pulo Registrado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_12_2",
            title: "Leitura de Vetor de Movimento 2D",
            difficulty: "easy",
            description: "Simule o valor de um joystick ou WASD: declare float horizontal = 1.0f e float vertical = 0.0f. Emita no Console: 'Movimento: (1, 0)'.",
            validationRules: { requiredPatterns: ["float horizontal","float vertical","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure horizontal e vertical e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float horizontal = 1.0f;
        float vertical = 0.0f;
        Debug.Log("Movimento: (" + horizontal + ", " + vertical + ")");
    }
}`,
            tests: [
                { input: "", expected: "Movimento: (1, 0)", description: "Eixo 2D composto" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float horizontal, float vertical" },
                { level: "II", text: "A saída no console deve conter exatamente: Movimento: (1, 0)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float horizontal = 1.0f;\n        float vertical = 0.0f;\n        Debug.Log(\"Movimento: (\" + horizontal + \", \" + vertical + \")\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float horizontal","float vertical","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Movimento: (1, 0)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_12_3",
            title: "Ação de Interação com Objeto",
            difficulty: "medium",
            description: "Declare a string botaoInteragir = 'E' e a distância float dist = 1.5f. Se dist <= 2.0f, emita 'Pressione [' + botaoInteragir + '] para Interagir'.",
            validationRules: { requiredPatterns: ["botaoInteragir","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide a distancia e emita o prompt
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string botaoInteragir = "E";
        float dist = 1.5f;
        if (dist <= 2.0f)
        {
            Debug.Log("Pressione [" + botaoInteragir + "] para Interagir");
        }
    }
}`,
            tests: [
                { input: "", expected: "Pressione [E] para Interagir", description: "Prompt de interação" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: botaoInteragir, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Pressione [E] para Interagir" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string botaoInteragir = \"E\";\n        float dist = 1.5f;\n        if (dist <= 2.0f)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["botaoInteragir","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pressione [E] para Interagir";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_12_4",
            title: "Habilitação de Mapa de Ações",
            difficulty: "medium",
            description: "Simule a ativação do Action Map 'Gameplay': declare string mapaAtivo = 'Gameplay';. Emita no Console: 'Mapa Ativado: Gameplay'.",
            validationRules: { requiredPatterns: ["string mapaAtivo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Ative o mapa e emita no Console
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string mapaAtivo = "Gameplay";
        Debug.Log("Mapa Ativado: " + mapaAtivo);
    }
}`,
            tests: [
                { input: "", expected: "Mapa Ativado: Gameplay", description: "Ativação de ActionMap" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string mapaAtivo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Mapa Ativado: Gameplay" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string mapaAtivo = \"Gameplay\";\n        Debug.Log(\"Mapa Ativado: \" + mapaAtivo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string mapaAtivo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mapa Ativado: Gameplay";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_12_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 5 },
            title: "Troca Dinâmica para Mapa UI",
            difficulty: "medium",
            description: "Quando o jogo é pausado, o mapa muda para UI: declare bool pausado = true. Se pausado, defina mapa = 'UI' e emita 'Contexto Atual: UI'.",
            validationRules: { requiredPatterns: ["bool pausado","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Troque o contexto para UI se pausado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool pausado = true;
        if (pausado)
        {
            string mapa = "UI";
            Debug.Log("Contexto Atual: " + mapa);
        }
    }
}`,
            tests: [
                { input: "", expected: "Contexto Atual: UI", description: "Alternância de contexto de input" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool pausado, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Contexto Atual: UI" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool pausado = true;\n        if (pausado)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool pausado","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Contexto Atual: UI";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 13 — SISTEMAS DE COORDENADAS 3D
// ═══════════════════════════════════════════════════════
{
    id: 13,
    artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 5 },
    title: "Sistemas de Coordenadas 3D",
    theme: "Módulo 4 — Matemática 3D",
    unlock: "Eixo Tridimensional",
    unlockIcon: "[3D]",
    character: "orin",
    xpReward: 200,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 4 — Matemática 3D. Sistema de Coordenadas Cartesiano Tridimensional ativado."
            },
            {
                    "type": "narrative",
                    "text": "O chão do santuário desvanece-se em uma grade infinita de luz tridimensional. Orin Vale ajusta bússolas arcanas orientadas nos eixos X, Y e Z."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "No espaço tridimensional do Unity, todo ponto existe nas coordenadas <code>(X, Y, Z)</code>! O eixo X representa a largura (esquerda/direita), Y a altura vertical (cima/baixo) e Z a profundidade (frente/trás)."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "A origem do universo é <code>Vector3.zero</code> (0, 0, 0), e o cubo unitário de referência é <code>Vector3.one</code> (1, 1, 1). Mas o maior segredo dos mundos 3D é diferenciar o espaço local do global: a posição mundial de um herói é a soma da posição do objeto-pai mais seu deslocamento local!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Compreender vetores tridimensionais é a fundação de todo o game development moderno. Pratique declarando vetores, lendo coordenadas isoladas e convertendo posições."
            }
    ],
    concept: {
        title: "ESPAÇO TRIDIMENSIONAL NO UNITY: VECTOR3, EIXOS CARTESIANOS E ESPAÇO LOCAL VS MUNDIAL",
        explanation: "O Unity utiliza um sistema de coordenadas cartesiano tridimensional com convenção de mão esquerda (Left-Handed):\n<ul>\n  <li><strong>Ponto no Espaço Tridimensional (<code>Vector3</code>):</strong> Uma estrutura que encapsula três floats: <code>pos.x</code>, <code>pos.y</code> e <code>pos.z</code> (ex: <code>Vector3 pos = new Vector3(2, 5, 8);</code> onde <code>pos.x</code> vale 2).</li>\n  <li><strong>Origem Mundial (<code>Vector3.zero</code>):</strong> Representa o centro exato do mundo <code>(0, 0, 0)</code>. Sua coordenada Y é obtida com <code>Vector3.zero.y</code>.</li>\n  <li><strong>Espaço Unitário (<code>Vector3.one</code>):</strong> Representa o vetor <code>(1, 1, 1)</code>, frequentemente utilizado como escala padrão inicial de objetos 3D.</li>\n  <li><strong>Espaço Local vs Global:</strong> Um objeto filho herda a posição de seu pai. A posição mundial final resulta da translação: <code>posMundial = posPai + offset;</code> (ex: pai em 10 somado a offset 3 resulta em <code>Posicao Mundial: 13</code>).</li>\n  <li><strong>Identificação dos Três Eixos:</strong> O eixo X (1,0,0) representa a largura lateral, o eixo Y (0,1,0) a elevação vertical e o eixo Z (0,0,1) a profundidade frontal.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploCoordenadas3D : MonoBehaviour
{
    void Start()
    {
        // 1. Ponto tridimensional e coordenada X
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);

        // 2. Origem do espaço mundial
        Debug.Log("Origem Y: " + Vector3.zero.y);

        // 3. Conversão de espaço local para global
        int posPai = 10;
        int offset = 3;
        int posMundial = posPai + offset;
        Debug.Log("Posicao Mundial: " + posMundial);

        // 4. Identificação dos eixos principais
        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1)
        {
            Debug.Log("Eixo Selecionado: X (Largura)");
        }

        // 5. Escala unitária tridimensional (Vector3.one)
        Vector3 escala = Vector3.one;
        Debug.Log("Escala Inicial: " + escala.x + ", " + escala.y + ", " + escala.z);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Cálculo de Posição Espacial 3D",
        code: `using UnityEngine;

public class Espaco3DManager : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);

        Debug.Log("Origem Y: " + Vector3.zero.y);

        int posPai = 10;
        int offset = 3;
        Debug.Log("Posicao Mundial: " + (posPai + offset));

        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1) Debug.Log("Eixo Selecionado: X (Largura)");

        Vector3 esc = Vector3.one;
        Debug.Log("Escala Inicial: " + esc.x + ", " + esc.y + ", " + esc.z);
    }
}`,
        output: "Coord X: 2\nOrigem Y: 0\nPosicao Mundial: 13\nEixo Selecionado: X (Largura)\nEscala Inicial: 1, 1, 1"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Sistemas de Coordenadas 3D e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare pos e emita Coord X
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Sistemas de Coordenadas 3D:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare pos e emita Coord X
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);
    }
}`,
                hint: "Coord X: 2"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_13_1",
            title: "Ponto no Espaço Tridimensional",
            difficulty: "easy",
            description: "Declare um Vector3 pos = new Vector3(2, 5, 8);. Imprima no Console a coordenada X com 'Coord X: ' + pos.x.",
            validationRules: { requiredPatterns: ["Vector3","pos.x","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare pos e emita Coord X
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);
    }
}`,
            tests: [
                { input: "", expected: "Coord X: 2", description: "Coordenada X em Vector3" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3, pos.x" },
                { level: "II", text: "A saída no console deve conter exatamente: Coord X: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 pos = new Vector3(2, 5, 8);\n        Debug.Log(\"Coord X: \" + pos.x);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3","pos.x","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Coord X: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_2",
            title: "Origem do Espaço Mundial (Vector3.zero)",
            difficulty: "easy",
            description: "Obtenha a coordenada Y do vetor central Vector3.zero. Emita no Console: 'Origem Y: ' + Vector3.zero.y.",
            validationRules: { requiredPatterns: ["Vector3.zero","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada Y de Vector3.zero
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Origem Y: " + Vector3.zero.y);
    }
}`,
            tests: [
                { input: "", expected: "Origem Y: 0", description: "Acesso a Vector3.zero" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.zero, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Origem Y: 0" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"Origem Y: \" + Vector3.zero.y);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.zero","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Origem Y: 0";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_3",
            title: "Conversão de Espaço Local para Global",
            difficulty: "medium",
            description: "Simule a translação de uma coordenada local para mundial somando um deslocamento: posMundial = posPai + offset. Com pai em 10 e offset em 3, emita 'Posicao Mundial: 13'.",
            validationRules: { requiredPatterns: ["int posPai","int offset","posMundial","+"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule e imprima posMundial
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int posPai = 10;
        int offset = 3;
        int posMundial = posPai + offset;
        Debug.Log("Posicao Mundial: " + posMundial);
    }
}`,
            tests: [
                { input: "", expected: "Posicao Mundial: 13", description: "Soma de espaço local" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int posPai, int offset" },
                { level: "II", text: "A saída no console deve conter exatamente: Posicao Mundial: 13" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int posPai = 10;\n        int offset = 3;\n        int posMundial = posPai + offset;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int posPai","int offset","posMundial","+"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Posicao Mundial: 13";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_4",
            title: "Identificação dos Três Eixos",
            difficulty: "medium",
            description: "Declare Vector3 eixos = new Vector3(1, 0, 0);. Se eixos.x == 1, emita 'Eixo Selecionado: X (Largura)'.",
            validationRules: { requiredPatterns: ["new Vector3(1, 0, 0)","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare eixos e avalie
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1)
        {
            Debug.Log("Eixo Selecionado: X (Largura)");
        }
    }
}`,
            tests: [
                { input: "", expected: "Eixo Selecionado: X (Largura)", description: "Eixo X" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3(1, 0, 0), if" },
                { level: "II", text: "A saída no console deve conter exatamente: Eixo Selecionado: X (Largura)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 eixos = new Vector3(1, 0, 0);\n        if (eixos.x == 1)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3(1, 0, 0)","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Eixo Selecionado: X (Largura)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_5",
            artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 5 },
            title: "Espaço Unitário (Vector3.one)",
            difficulty: "medium",
            description: "Declare Vector3 escala = Vector3.one;. Emita no Console: 'Escala Inicial: ' + escala.x + ', ' + escala.y + ', ' + escala.z.",
            validationRules: { requiredPatterns: ["Vector3.one","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare escala com Vector3.one e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 escala = Vector3.one;
        Debug.Log("Escala Inicial: " + escala.x + ", " + escala.y + ", " + escala.z);
    }
}`,
            tests: [
                { input: "", expected: "Escala Inicial: 1, 1, 1", description: "Vector3.one" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.one, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Escala Inicial: 1, 1, 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 escala = Vector3.one;\n        Debug.Log(\"Escala Inicial: \" + escala.x + \", \" + escala.y + \", \" + escala.z);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.one","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Escala Inicial: 1, 1, 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 14 — VETORES 3D & DISTÂNCIAS
// ═══════════════════════════════════════════════════════
{
    id: 14,
    artifactReward: { artifactId: "Ring_Oroborus", minStars: 4, maxStars: 5 },
    title: "Vetores 3D & Distâncias",
    theme: "Módulo 4 — Matemática 3D",
    unlock: "Vetor Direcional",
    unlockIcon: "[V3]",
    character: "kael",
    xpReward: 210,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando o Motor de Álgebra Vetorial. Operações de produto escalar e vetorial ativadas."
            },
            {
                    "type": "narrative",
                    "text": "Vetores radiantes conectam o guerreiro aos inimigos ao redor. Kael Draven demonstra como a matemática vetorial governa a visão, o alcance e o impacto dos golpes."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Um vetor não é apenas uma posição: ele expressa uma <strong>direção</strong> e uma <strong>magnitude</strong>! Para saber a que distância um monstro está, usamos a distância euclidiana com <code>Vector3.Distance(a, b)</code>."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "ARTÍFICE",
                    "cssClass": "mira",
                    "text": "E quando queremos apenas a pura direção sem interferência do tamanho, nós o normalizamos com <code>Vector3.Normalize()</code>. Já o Produto Escalar (<code>Vector3.Dot</code>) revela se um alvo está na frente ou atrás de nós, enquanto o Produto Vetorial (<code>Vector3.Cross</code>) calcula a normal perpendicular perfeita para superfícies e reflexos!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Radars de proximidade e inteligência artificial dependem diretamente dessas quatro operações vetoriais. Execute as 5 atividades deste capítulo com maestria geométrica."
            }
    ],
    concept: {
        title: "ÁLGEBRA VETORIAL 3D: DISTÂNCIA EUCLIDIANA, NORMALIZAÇÃO, DOT PRODUCT E CROSS PRODUCT",
        explanation: "Operações com vetores são essenciais para física, mira e inteligência artificial no Unity:\n<ul>\n  <li><strong>Distância Euclidiana (<code>Vector3.Distance</code>):</strong> Calcula o comprimento da linha reta entre dois pontos 3D no espaço (ex: entre <code>(0,0,0)</code> e <code>(3,4,0)</code> resulta em distância 5: <code>Debug.Log(\"Distancia: \" + dist);</code>).</li>\n  <li><strong>Normalização de Vetor (<code>Vector3.Normalize</code>):</strong> Transforma o vetor em um vetor unitário de comprimento igual a 1, preservando sua direção original (ex: normalizar <code>(5,0,0)</code> resulta em <code>dir.x = 1</code>).</li>\n  <li><strong>Produto Escalar (<code>Vector3.Dot</code>):</strong> Multiplica dois vetores resultando em um escalar numérico. Se forem vetores unitários apontando na mesma direção (ex: <code>Vector3.forward</code> e <code>Vector3.forward</code>), o resultado é 1 (alinhamento total). Se forem perpendiculares, é 0; se opostos, é -1.</li>\n  <li><strong>Produto Vetorial (<code>Vector3.Cross</code>):</strong> Gera um terceiro vetor perpendicular a ambos os vetores de entrada (ex: o produto vetorial entre <code>Vector3.right</code> (eixo X) e <code>Vector3.up</code> (eixo Y) gera a normal apontando no eixo Z: <code>Vector3.forward</code>).</li>\n  <li><strong>Radar de Proximidade:</strong> Compara a distância calculada contra um raio de detecção (ex: se distância for menor que 10 metros, exibe <code>\"Alvo no Radar: 8m\"</code>).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploAlgebraVetorial : MonoBehaviour
{
    void Start()
    {
        // 1. Distância euclidiana entre dois pontos (3-4-5 triângulo clássico)
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);

        // 2. Normalização de vetor para direção pura
        Vector3 dir = new Vector3(5, 0, 0);
        Vector3 norm = Vector3.Normalize(dir);
        Debug.Log("Dir X: " + norm.x);

        // 3. Produto escalar (Vector3.Dot) para alinhamento de visão
        Vector3 frente = Vector3.forward;
        Vector3 alvo = Vector3.forward;
        float dot = Vector3.Dot(frente, alvo);
        Debug.Log("Alinhamento: " + dot);

        // 4. Produto vetorial (Vector3.Cross) para normal perpendicular
        Vector3 direito = Vector3.right;
        Vector3 cima = Vector3.up;
        Vector3 cross = Vector3.Cross(direito, cima);
        Debug.Log("Normal Z: " + cross.z);

        // 5. Radar de proximidade
        Vector3 posPlayer = Vector3.zero;
        Vector3 posInimigo = new Vector3(0, 0, 8);
        float distRadar = Vector3.Distance(posPlayer, posInimigo);
        if (distRadar < 10)
        {
            Debug.Log("Alvo no Radar: 8m");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Radar de Batalha e Alinhamento de Visão",
        code: `using UnityEngine;

public class CalculosCombate3D : MonoBehaviour
{
    void Start()
    {
        Vector3 p1 = Vector3.zero;
        Vector3 p2 = new Vector3(3, 4, 0);
        float d = Vector3.Distance(p1, p2);
        Debug.Log("Distancia: " + d);

        Vector3 v = new Vector3(5, 0, 0);
        Vector3 n = Vector3.Normalize(v);
        Debug.Log("Dir X: " + n.x);

        float dot = Vector3.Dot(Vector3.forward, Vector3.forward);
        Debug.Log("Alinhamento: " + dot);

        Vector3 c = Vector3.Cross(Vector3.right, Vector3.up);
        Debug.Log("Normal Z: " + c.z);

        float radar = Vector3.Distance(Vector3.zero, new Vector3(0, 0, 8));
        if (radar < 10) Debug.Log("Alvo no Radar: 8m");
    }
}`,
        output: "Distancia: 5\nDir X: 1\nAlinhamento: 1\nNormal Z: 1\nAlvo no Radar: 8m"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Vetores 3D & Distâncias e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia entre a e b
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Vetores 3D & Distâncias:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia entre a e b
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);
    }
}`,
                hint: "Distancia: 5"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_14_1",
            title: "Cálculo de Distância Euclidiana",
            difficulty: "easy",
            description: "Declare Vector3 a = new Vector3(0, 0, 0); e Vector3 b = new Vector3(3, 4, 0);. Calcule a distância com Vector3.Distance(a, b) e exiba 'Distancia: ' + dist.",
            validationRules: { requiredPatterns: ["Vector3.Distance","new Vector3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia entre a e b
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);
    }
}`,
            tests: [
                { input: "", expected: "Distancia: 5", description: "Vector3.Distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Distance, new Vector3" },
                { level: "II", text: "A saída no console deve conter exatamente: Distancia: 5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 a = new Vector3(0, 0, 0);\n        Vector3 b = new Vector3(3, 4, 0);\n        float dist = Vector3.Distance(a, b);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Distance","new Vector3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Distancia: 5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_2",
            title: "Normalização de Vetor",
            difficulty: "easy",
            description: "Declare Vector3 dir = new Vector3(5, 0, 0);. Calcule o vetor normalizado com Vector3.Normalize(dir) e exiba 'Dir X: ' + norm.x.",
            validationRules: { requiredPatterns: ["Vector3.Normalize","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Normalize dir e exiba norm.x
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 dir = new Vector3(5, 0, 0);
        var norm = Vector3.Normalize(dir);
        Debug.Log("Dir X: " + norm.x);
    }
}`,
            tests: [
                { input: "", expected: "Dir X: 1", description: "Vector3.Normalize" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Normalize, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Dir X: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 dir = new Vector3(5, 0, 0);\n        var norm = Vector3.Normalize(dir);\n        Debug.Log(\"Dir X: \" + norm.x);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Normalize","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dir X: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_3",
            title: "Produto Escalar (Vector3.Dot)",
            difficulty: "medium",
            description: "Declare Vector3 frente = Vector3.forward; e Vector3 alvo = Vector3.forward;. Calcule o alinhamento com Vector3.Dot(frente, alvo) e exiba 'Alinhamento: ' + dot.",
            validationRules: { requiredPatterns: ["Vector3.Dot","Vector3.forward","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o produto escalar
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 frente = Vector3.forward;
        Vector3 alvo = Vector3.forward;
        float dot = Vector3.Dot(frente, alvo);
        Debug.Log("Alinhamento: " + dot);
    }
}`,
            tests: [
                { input: "", expected: "Alinhamento: 1", description: "Vector3.Dot" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Dot, Vector3.forward" },
                { level: "II", text: "A saída no console deve conter exatamente: Alinhamento: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 frente = Vector3.forward;\n        Vector3 alvo = Vector3.forward;\n        float dot = Vector3.Dot(frente, alvo);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Dot","Vector3.forward","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alinhamento: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_4",
            title: "Produto Vetorial (Vector3.Cross)",
            difficulty: "medium",
            description: "Obtenha a normal perpendicular usando Vector3.Cross: declare Vector3 direito = Vector3.right; e Vector3 cima = Vector3.up;. Calcule Vector3.Cross(direito, cima) e emita 'Normal Z: ' + cross.z.",
            validationRules: { requiredPatterns: ["Vector3.Cross","Vector3.right","Vector3.up"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o cross product
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 direito = Vector3.right;
        Vector3 cima = Vector3.up;
        var cross = Vector3.Cross(direito, cima);
        Debug.Log("Normal Z: " + cross.z);
    }
}`,
            tests: [
                { input: "", expected: "Normal Z: 1", description: "Vector3.Cross" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Cross, Vector3.right" },
                { level: "II", text: "A saída no console deve conter exatamente: Normal Z: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 direito = Vector3.right;\n        Vector3 cima = Vector3.up;\n        var cross = Vector3.Cross(direito, cima);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Cross","Vector3.right","Vector3.up"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Normal Z: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_5",
            artifactReward: { artifactId: "Ring_Oroborus", minStars: 4, maxStars: 5 },
            title: "Alcance de Radar de Proximidade",
            difficulty: "medium",
            description: "Calcule a distância entre o jogador em (0,0,0) e um inimigo em (0,0,8). Se a distância for menor que 10, emita 'Alvo no Radar: 8m'.",
            validationRules: { requiredPatterns: ["Vector3.Distance","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia e avalie o radar
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 player = Vector3.zero;
        Vector3 enemy = new Vector3(0, 0, 8);
        float dist = Vector3.Distance(player, enemy);
        if (dist < 10)
        {
            Debug.Log("Alvo no Radar: " + dist + "m");
        }
    }
}`,
            tests: [
                { input: "", expected: "Alvo no Radar: 8m", description: "Radar de proximidade com Vector3.Distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Distance, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Alvo no Radar: 8m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 player = Vector3.zero;\n        Vector3 enemy = new Vector3(0, 0, 8);\n        float dist = Vector3.Distance(player, enemy);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Distance","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alvo no Radar: 8m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 15 — PLANOS 3D E RAYCASTING
// ═══════════════════════════════════════════════════════
{
    id: 15,
    artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 6 },
    title: "Planos 3D e Raycasting",
    theme: "Módulo 4 — Matemática 3D",
    unlock: "Prisma Raycast",
    unlockIcon: "[RAY]",
    character: "mira",
    xpReward: 220,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Inicializando o Feixe Ocular Físico. Módulo de Raycasting e Projeções Geométricas ativado."
            },
            {
                    "type": "narrative",
                    "text": "Feixes laser invisíveis e arcos de detecção partem das mãos de Mira Solenn, mapeando a distância exata de cada obstáculo e superfície da masmorra."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Raycasting é como disparar um raio laser geométrico instantâneo! Usamos <code>Physics.Raycast</code> para saber onde uma bala acertou, se o pé do herói toca o chão ou se há uma parede bloqueando a visão do monstro."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "O raio retorna um recipiente chamado <code>RaycastHit</code> contendo a distância de impacto, o ponto exato da colisão e a etiqueta da superfície atingida (como 'Chao'). E para não acertar moedas ou o próprio herói, filtramos os alvos com máscaras de camada: <code>LayerMask</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Definir alcances máximos de detecção evita processamento desnecessário na engine de física. Domine os parâmetros de Physics.Raycast neste capítulo."
            }
    ],
    concept: {
        title: "RAYCASTING NO UNITY: DISPARO FÍSICO, RAYCASTHIT, ALCANCE E LAYERMASKS",
        explanation: "Raycasting projeta uma linha geométrica através da simulação física para detectar colisores:\n<ul>\n  <li><strong>Disparo de Raycast Físico (<code>Physics.Raycast</code>):</strong> Recebe uma origem, uma direção e uma distância máxima: <code>Physics.Raycast(Vector3.zero, Vector3.forward, 10f);</code>. Retorna <code>true</code> se atingir qualquer colisor.</li>\n  <li><strong>Alcance Máximo:</strong> Limita o comprimento do raio, economizando desempenho ao evitar varreduras infinitas (ex: <code>float alcanceMax = 25.0f;</code> emitindo <code>\"Alcance do Raio: 25 metros\"</code>).</li>\n  <li><strong>Identificação de Objeto Atingido (<code>RaycastHit</code>):</strong> Quando há impacto, obtemos os dados da superfície (ex: verificar se <code>tagAtingida == \"Chao\"</code> para confirmar impacto no solo).</li>\n  <li><strong>Máscaras de Camada (<code>LayerMask</code>):</strong> Permite que o raio interaja somente com certas camadas físicas da cena (ex: camada de inimigos <code>layerInimigo = 8</code>), ignorando gatilhos e o próprio jogador.</li>\n  <li><strong>Ponto e Distância de Impacto:</strong> O struct <code>RaycastHit.distance</code> informa exatamente quão longe o impacto aconteceu (ex: <code>\"Impacto a 4.2 metros\"</code>).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploRaycasting : MonoBehaviour
{
    void Start()
    {
        // 1. Disparo de raio físico no espaço
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10f);
        Debug.Log("Raio Disparado: " + acertou);

        // 2. Configuração de alcance máximo
        float alcanceMax = 25.0f;
        Debug.Log("Alcance do Raio: " + alcanceMax + " metros");

        // 3. Checagem da superfície atingida (RaycastHit)
        string tagAtingida = "Chao";
        if (tagAtingida == "Chao")
        {
            Debug.Log("Impacto no Solo Confirmado");
        }

        // 4. Máscara de camada para filtragem
        int layerInimigo = 8;
        Debug.Log("Mascara de Camada Ativa: " + layerInimigo);

        // 5. Medição da distância de impacto
        float distHit = 4.2f;
        Debug.Log("Impacto a " + distHit + " metros");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Sistema de Sensor Óptico de Solo e Parede",
        code: `using UnityEngine;

public class SensorRaycast : MonoBehaviour
{
    void Start()
    {
        bool hit = Physics.Raycast(Vector3.zero, Vector3.forward, 10f);
        Debug.Log("Raio Disparado: " + hit);

        float alcance = 25.0f;
        Debug.Log("Alcance do Raio: " + alcance + " metros");

        string tag = "Chao";
        if (tag == "Chao") Debug.Log("Impacto no Solo Confirmado");

        int layer = 8;
        Debug.Log("Mascara de Camada Ativa: " + layer);

        float dist = 4.2f;
        Debug.Log("Impacto a " + dist + " metros");
    }
}`,
        output: "Raio Disparado: True\nAlcance do Raio: 25 metros\nImpacto no Solo Confirmado\nMascara de Camada Ativa: 8\nImpacto a 4.2 metros"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Planos 3D e Raycasting e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute Physics.Raycast
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Planos 3D e Raycasting:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute Physics.Raycast
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);
        Debug.Log("Raio Disparado: " + acertou);
    }
}`,
                hint: "Raio Disparado: True"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_15_1",
            title: "Disparo de Raycast Físico",
            difficulty: "easy",
            description: "Execute um disparo de raio chamando Physics.Raycast(Vector3.zero, Vector3.forward, 10f). Emita no Console: 'Raio Disparado: True'.",
            validationRules: { requiredPatterns: ["Physics.Raycast","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute Physics.Raycast
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);
        Debug.Log("Raio Disparado: " + acertou);
    }
}`,
            tests: [
                { input: "", expected: "Raio Disparado: True", description: "Physics.Raycast simples" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Physics.Raycast, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Raio Disparado: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);\n        Debug.Log(\"Raio Disparado: \" + acertou);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Physics.Raycast","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Raio Disparado: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_2",
            title: "Alcance Máximo de Detecção",
            difficulty: "easy",
            description: "Defina a distância máxima de alcance float alcanceMax = 25.0f;. Emita no Console: 'Alcance do Raio: 25 metros'.",
            validationRules: { requiredPatterns: ["float alcanceMax","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare alcanceMax e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float alcanceMax = 25.0f;
        Debug.Log("Alcance do Raio: " + alcanceMax + " metros");
    }
}`,
            tests: [
                { input: "", expected: "Alcance do Raio: 25 metros", description: "Alcance do Raycast" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float alcanceMax, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Alcance do Raio: 25 metros" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float alcanceMax = 25.0f;\n        Debug.Log(\"Alcance do Raio: \" + alcanceMax + \" metros\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float alcanceMax","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alcance do Raio: 25 metros";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_3",
            title: "Identificação de Objeto Atingido",
            difficulty: "medium",
            description: "Simule os dados de um RaycastHit: declare string tagAtingida = 'Chao';. Se tagAtingida for 'Chao', emita 'Impacto no Solo Confirmado'.",
            validationRules: { requiredPatterns: ["string tagAtingida","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a tag atingida
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tagAtingida = "Chao";
        if (tagAtingida == "Chao")
        {
            Debug.Log("Impacto no Solo Confirmado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Impacto no Solo Confirmado", description: "Hit detection" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string tagAtingida, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Impacto no Solo Confirmado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tagAtingida = \"Chao\";\n        if (tagAtingida == \"Chao\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string tagAtingida","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Impacto no Solo Confirmado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_4",
            title: "Máscara de Colisão (LayerMask)",
            difficulty: "medium",
            description: "Simule a filtragem por camada: declare int layerInimigo = 8;. Emita no Console: 'Mascara de Camada Ativa: 8'.",
            validationRules: { requiredPatterns: ["int layerInimigo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare a layer e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int layerInimigo = 8;
        Debug.Log("Mascara de Camada Ativa: " + layerInimigo);
    }
}`,
            tests: [
                { input: "", expected: "Mascara de Camada Ativa: 8", description: "LayerMask" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int layerInimigo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Mascara de Camada Ativa: 8" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int layerInimigo = 8;\n        Debug.Log(\"Mascara de Camada Ativa: \" + layerInimigo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int layerInimigo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mascara de Camada Ativa: 8";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 6 },
            title: "Cálculo de Ponto de Impacto",
            difficulty: "medium",
            description: "Declare a distância de impacto float distHit = 4.2f;. Emita no Console: 'Impacto a ' + distHit + ' metros'.",
            validationRules: { requiredPatterns: ["float distHit","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare distHit e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float distHit = 4.2f;
        Debug.Log("Impacto a " + distHit + " metros");
    }
}`,
            tests: [
                { input: "", expected: "Impacto a 4.2 metros", description: "Distância do ponto de impacto" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float distHit, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Impacto a 4.2 metros" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float distHit = 4.2f;\n        Debug.Log(\"Impacto a \" + distHit + \" metros\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float distHit","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Impacto a 4.2 metros";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 16 — RIGIDBODY E FÍSICA 3D
// ═══════════════════════════════════════════════════════
{
    id: 16,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 5 },
    title: "Rigidbody e Física 3D",
    theme: "Módulo 5 — Física 3D",
    unlock: "Massa Gravitacional",
    unlockIcon: "[PHYS]",
    character: "kael",
    xpReward: 230,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 5 — Física 3D. Motor dinâmico de corpos rígidos ativado."
            },
            {
                    "type": "narrative",
                    "text": "Blocos de granito e bigornas ganham massa, aceleração e gravidade sob o olhar atento de Kael Draven. O atrito e as forças newtonianas assumem o comando."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Quando queremos que um objeto seja governado por gravidade, impulsos e inércia real, anexamos a ele o componente <strong>Rigidbody</strong>! Jamais mova um corpo físico alterando o transform.position diretamente — você destruirá a simulação!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Para dar um salto ou empurrão explosivo, aplicamos forças com <code>AddForce()</code>. No Unity 6.5, a velocidade direta é manipulada através de <code>linearVelocity</code>, e podemos ligar ou desligar a gravidade com a chave booleana <code>useGravity</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Lembre-se sempre de que toda manipulação de Rigidbody deve ocorrer no método <code>FixedUpdate()</code> para manter a física matematicamente estável."
            }
    ],
    concept: {
        title: "O COMPONENTE RIGIDBODY: MASSA, FORÇAS, LINEARVELOCITY E GRAVIDADE NO UNITY 6.5",
        explanation: "O <code>Rigidbody</code> entrega uma entidade ao motor de física PhysX:\n<ul>\n  <li><strong>Massa (<code>mass</code>):</strong> Define a inércia do objeto em quilogramas (ex: <code>float massaObjeto = 5.0f;</code> emitindo <code>\"Massa do Rigidbody: 5kg\"</code>). Corpos mais pesados requerem maiores forças para acelerar.</li>\n  <li><strong>Aplicação de Impulso (<code>AddForce</code>):</strong> Adiciona uma força física vetorial empurrando o objeto na direção informada (ex: impulso vertical com <code>Vector3.up * 10f</code> emitindo <code>\"Forca Aplicada com AddForce\"</code>).</li>\n  <li><strong>Velocidade Linear (<code>linearVelocity</code>):</strong> No Unity 6.5, a propriedade <code>linearVelocity</code> substitui a antiga <code>velocity</code> para leitura e ajuste direto da velocidade em metros por segundo (ex: <code>float velLinear = 12.5f;</code>).</li>\n  <li><strong>Controle de Gravidade (<code>useGravity</code>):</strong> Define se o objeto sofre a atração natural do mundo físico (ex: <code>bool gravidadeAtiva = true;</code> emitindo <code>\"Gravidade Ativa: True\"</code>).</li>\n  <li><strong>Amortecimento de Arrasto (Drag):</strong> Coeficiente de atrito com o ar que desacelera o objeto suavemente com o tempo.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploRigidbody : MonoBehaviour
{
    void Start()
    {
        // 1. Configuração de massa inercial
        float massaObjeto = 5.0f;
        Debug.Log("Massa do Rigidbody: " + massaObjeto + "kg");

        // 2. Aplicação de força de impulso
        Debug.Log("Forca Aplicada com AddForce");

        // 3. Velocidade linear no Unity 6.5
        float velLinear = 12.5f;
        Debug.Log("Velocidade Linear: " + velLinear + " m/s");

        // 4. Controle booleano da gravidade
        bool gravidadeAtiva = true;
        Debug.Log("Gravidade Ativa: " + gravidadeAtiva);

        // 5. Coeficiente de arrasto (drag)
        float arrasto = 0.5f;
        Debug.Log("Arrasto Linear: " + arrasto);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Controlador Físico de Projétil",
        code: `using UnityEngine;

public class ProjetilFisico : MonoBehaviour
{
    void Start()
    {
        float m = 5.0f;
        Debug.Log("Massa do Rigidbody: " + m + "kg");

        Debug.Log("Forca Aplicada com AddForce");

        float vel = 12.5f;
        Debug.Log("Velocidade Linear: " + vel + " m/s");

        bool grav = true;
        Debug.Log("Gravidade Ativa: " + grav);

        float drag = 0.5f;
        Debug.Log("Arrasto Linear: " + drag);
    }
}`,
        output: "Massa do Rigidbody: 5kg\nForca Aplicada com AddForce\nVelocidade Linear: 12.5 m/s\nGravidade Ativa: True\nArrasto Linear: 0.5"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Rigidbody e Física 3D e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare massa e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Rigidbody e Física 3D:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare massa e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 75.0f;
        Debug.Log("Massa do Rigidbody: " + massa + "kg");
    }
}`,
                hint: "Massa do Rigidbody: 75kg"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_16_1",
            title: "Configuração de Massa Física",
            difficulty: "easy",
            description: "Declare a variável float massa = 75.0f;. Emita no Console: 'Massa do Rigidbody: 75kg'.",
            validationRules: { requiredPatterns: ["float massa","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare massa e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 75.0f;
        Debug.Log("Massa do Rigidbody: " + massa + "kg");
    }
}`,
            tests: [
                { input: "", expected: "Massa do Rigidbody: 75kg", description: "Configuração de massa" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float massa, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Massa do Rigidbody: 75kg" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float massa = 75.0f;\n        Debug.Log(\"Massa do Rigidbody: \" + massa + \"kg\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float massa","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Massa do Rigidbody: 75kg";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_2",
            title: "Aplicação de Impulso com AddForce",
            difficulty: "easy",
            description: "Simule a aplicação de um impulso de pulo: declare float forcaPulo = 10.0f;. Emita no Console: 'Forca Aplicada: 10N'.",
            validationRules: { requiredPatterns: ["float forcaPulo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare forcaPulo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float forcaPulo = 10.0f;
        Debug.Log("Forca Aplicada: " + forcaPulo + "N");
    }
}`,
            tests: [
                { input: "", expected: "Forca Aplicada: 10N", description: "Impulso físico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float forcaPulo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Forca Aplicada: 10N" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float forcaPulo = 10.0f;\n        Debug.Log(\"Forca Aplicada: \" + forcaPulo + \"N\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float forcaPulo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Forca Aplicada: 10N";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_3",
            title: "Velocidade Linear (linearVelocity)",
            difficulty: "medium",
            description: "No Unity 6.5, linearVelocity gerencia a velocidade direta do corpo. Declare Vector3 vel = new Vector3(0, 5, 0); e emita 'Velocidade Y: ' + vel.y.",
            validationRules: { requiredPatterns: ["new Vector3","vel.y","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure vel e imprima vel.y
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 vel = new Vector3(0, 5, 0);
        Debug.Log("Velocidade Y: " + vel.y);
    }
}`,
            tests: [
                { input: "", expected: "Velocidade Y: 5", description: "Velocidade linear" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3, vel.y" },
                { level: "II", text: "A saída no console deve conter exatamente: Velocidade Y: 5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 vel = new Vector3(0, 5, 0);\n        Debug.Log(\"Velocidade Y: \" + vel.y);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3","vel.y","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Velocidade Y: 5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_4",
            title: "Controle de Gravidade (useGravity)",
            difficulty: "medium",
            description: "Declare bool usaGravidade = true;. Se for verdadeiro, emita 'Gravidade Ativada no Corpo'.",
            validationRules: { requiredPatterns: ["bool usaGravidade","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque usaGravidade
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool usaGravidade = true;
        if (usaGravidade)
        {
            Debug.Log("Gravidade Ativada no Corpo");
        }
    }
}`,
            tests: [
                { input: "", expected: "Gravidade Ativada no Corpo", description: "Uso de gravidade" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool usaGravidade, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Gravidade Ativada no Corpo" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool usaGravidade = true;\n        if (usaGravidade)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool usaGravidade","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Gravidade Ativada no Corpo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 5 },
            title: "Resistência do Ar (Drag)",
            difficulty: "medium",
            description: "Declare float drag = 2.5f;. Emita no Console: 'Atrito do Ar (Drag): 2.5'.",
            validationRules: { requiredPatterns: ["float drag","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare drag e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float drag = 2.5f;
        Debug.Log("Atrito do Ar (Drag): " + drag);
    }
}`,
            tests: [
                { input: "", expected: "Atrito do Ar (Drag): 2.5", description: "Drag físico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float drag, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Atrito do Ar (Drag): 2.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float drag = 2.5f;\n        Debug.Log(\"Atrito do Ar (Drag): \" + drag);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float drag","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Atrito do Ar (Drag): 2.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 17 — COLISÕES E TRIGGERS
// ═══════════════════════════════════════════════════════
{
    id: 17,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
    title: "Colisões e Triggers",
    theme: "Módulo 5 — Física 3D",
    unlock: "Gatilho de Impacto",
    unlockIcon: "[TRIG]",
    character: "arkan",
    xpReward: 240,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Inicializando a Intersecção de Malhas Físicas. Colisões sólidas e Gatilhos Triggers ativos."
            },
            {
                    "type": "narrative",
                    "text": "Arkan Velor conjura escudos e campos de força. Alguns repelem projéteis com estrondo metálico; outros deixam itens arcanos serem absorvidos suavemente."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "No Unity existem dois tipos fundamentais de contato físico: **Colisões Sólidas**, que impedem objetos de se atravessarem e disparam <code>OnCollisionEnter</code>, e **Gatilhos (Triggers)**, que agem como zonas fantasmas e disparam <code>OnTriggerEnter</code>!"
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Gatilhos são perfeitos para coletar moedas, abrir portas automáticas ou ativar checkpoints sem barrar a passagem do herói. E para saber quem entrou no gatilho, filtramos com <code>CompareTag('Inimigo')</code> ou <code>tag == 'Player'</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Para que colisões ou triggers funcionem, ao menos uma das entidades participantes deve possuir um componente Rigidbody. Pratique as detecções neste capítulo."
            }
    ],
    concept: {
        title: "SISTEMA DE COLISÕES DO UNITY: ONCOLLISIONENTER VS ONTRIGGERENTER E FILTRAGEM POR TAG",
        explanation: "A intersecção de volumes colensores dita as reações de combate e exploração:\n<ul>\n  <li><strong>Colisão Sólida (<code>OnCollisionEnter</code>):</strong> Ocorre quando dois colisores sólidos se chocam, gerando impacto físico e impedindo a transposição (ex: receber um impacto sólido de espada).</li>\n  <li><strong>Gatilho de Zona (<code>OnTriggerEnter</code>):</strong> Quando a opção <code>Is Trigger</code> do Collider está ativada, o objeto torna-se intangível. Objetos podem atravessá-lo, disparando eventos sem reação física contrária.</li>\n  <li><strong>Coleta de Itens por Gatilho:</strong> É a mecânica clássica de absorver moedas, poções ou entrar em zonas de dano periódico (ex: <code>\"Moeda Coletada via Trigger\"</code>).</li>\n  <li><strong>Filtragem por Tag (<code>CompareTag</code>):</strong> Garante que apenas o alvo correto ative a reação (ex: verificar se a tag é \"Inimigo\" antes de aplicar dano).</li>\n  <li><strong>Resolução de Pontos de Contato:</strong> A estrutura <code>Collision</code> fornece informações detalhadas sobre a velocidade do choque e os pontos normais de contato na malha.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploColisoesTriggers : MonoBehaviour
{
    // Simulação do evento de colisão sólida
    void OnCollisionEnter(Collision collision)
    {
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");
    }

    // Simulação do evento de gatilho intangível
    void OnTriggerEnter(Collider other)
    {
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");
    }

    void Start()
    {
        // 1. Detecção de colisão sólida
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");

        // 2. Detecção de gatilho intangível
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");

        // 3. Coleta de item por trigger
        Debug.Log("Moeda Coletada via Trigger");

        // 4. Filtragem por tag de objeto
        string tagColisor = "Inimigo";
        if (tagColisor == "Inimigo")
        {
            Debug.Log("Contato com Inimigo Confirmado");
        }

        // 5. Total de colisores no gatilho
        int totalColisores = 1;
        Debug.Log("Colisores Ativos: " + totalColisores);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Reações Físicas de Contato e Coleta",
        code: `using UnityEngine;

public class GerenciadorColisoes : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");
        Debug.Log("Moeda Coletada via Trigger");

        string tag = "Inimigo";
        if (tag == "Inimigo") Debug.Log("Contato com Inimigo Confirmado");

        int ativos = 1;
        Debug.Log("Colisores Ativos: " + ativos);
    }
}`,
        output: "Colisao Solida: OnCollisionEnter disparado\nGatilho de Zona: OnTriggerEnter disparado\nMoeda Coletada via Trigger\nContato com Inimigo Confirmado\nColisores Ativos: 1"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Colisões e Triggers e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a colisao solida
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Colisões e Triggers:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a colisao solida
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string outroObjeto = "Parede";
        if (outroObjeto == "Parede")
        {
            Debug.Log("Impacto com Parede Registrado");
        }
    }
}`,
                hint: "Impacto com Parede Registrado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_17_1",
            title: "Detecção de Colisão Sólida (OnCollisionEnter)",
            difficulty: "easy",
            description: "Declare string outroObjeto = 'Parede';. Se for igual a 'Parede', emita no Console: 'Impacto com Parede Registrado'.",
            validationRules: { requiredPatterns: ["outroObjeto","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a colisao solida
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string outroObjeto = "Parede";
        if (outroObjeto == "Parede")
        {
            Debug.Log("Impacto com Parede Registrado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Impacto com Parede Registrado", description: "Colisão sólida" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: outroObjeto, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Impacto com Parede Registrado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string outroObjeto = \"Parede\";\n        if (outroObjeto == \"Parede\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["outroObjeto","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Impacto com Parede Registrado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_2",
            title: "Gatilho de Zona (OnTriggerEnter)",
            difficulty: "easy",
            description: "Declare bool isTrigger = true; e string zona = 'Checkpoint';. Se isTrigger for verdadeiro, emita 'Trigger Ativado: Checkpoint'.",
            validationRules: { requiredPatterns: ["bool isTrigger","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque o trigger e imprima a zona
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool isTrigger = true;
        string zona = "Checkpoint";
        if (isTrigger)
        {
            Debug.Log("Trigger Ativado: " + zona);
        }
    }
}`,
            tests: [
                { input: "", expected: "Trigger Ativado: Checkpoint", description: "Trigger de zona" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool isTrigger, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Trigger Ativado: Checkpoint" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool isTrigger = true;\n        string zona = \"Checkpoint\";\n        if (isTrigger)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool isTrigger","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Trigger Ativado: Checkpoint";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_3",
            title: "Coleta de Moeda por Gatilho",
            difficulty: "medium",
            description: "Declare int moedas = 0;. Simule a coleta somando 1 a moedas e emita no Console: 'Moedas: ' + moedas.",
            validationRules: { requiredPatterns: ["int moedas","++","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Incremente as moedas coletadas
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int moedas = 0;
        moedas++;
        Debug.Log("Moedas: " + moedas);
    }
}`,
            tests: [
                { input: "", expected: "Moedas: 1", description: "Coleta de item por trigger" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int moedas, ++" },
                { level: "II", text: "A saída no console deve conter exatamente: Moedas: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int moedas = 0;\n        moedas++;\n        Debug.Log(\"Moedas: \" + moedas);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int moedas","++","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Moedas: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_4",
            title: "Filtro de Colisão por Tag",
            difficulty: "medium",
            description: "Declare string colTag = 'Enemy';. Se colTag == 'Enemy', emita 'Dano Sofrido por Colisao!'.",
            validationRules: { requiredPatterns: ["colTag","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a tag do inimigo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string colTag = "Enemy";
        if (colTag == "Enemy")
        {
            Debug.Log("Dano Sofrido por Colisao!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Dano Sofrido por Colisao!", description: "Filtragem por Tag" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: colTag, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Sofrido por Colisao!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string colTag = \"Enemy\";\n        if (colTag == \"Enemy\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["colTag","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Sofrido por Colisao!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
            title: "Gatilho de Saída (OnTriggerExit)",
            difficulty: "medium",
            description: "Simule a saída de uma área segura: declare bool naAreaSegura = false;. Se não estiver na área segura (!naAreaSegura), emita 'Saiu da Area Segura!'.",
            validationRules: { requiredPatterns: ["bool naAreaSegura","!","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a saida da area segura
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool naAreaSegura = false;
        if (!naAreaSegura)
        {
            Debug.Log("Saiu da Area Segura!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Saiu da Area Segura!", description: "TriggerExit" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool naAreaSegura, !" },
                { level: "II", text: "A saída no console deve conter exatamente: Saiu da Area Segura!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool naAreaSegura = false;\n        if (!naAreaSegura)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool naAreaSegura","!","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Saiu da Area Segura!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 18 — CÂMERA 3ª PESSOA (CINEMACHINE)
// ═══════════════════════════════════════════════════════
{
    id: 18,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 5 },
    title: "Câmera 3ª Pessoa (Cinemachine)",
    theme: "Módulo 6 — Câmeras",
    unlock: "Lente Cinemachine",
    unlockIcon: "[CAM3]",
    character: "lyra",
    xpReward: 250,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 6 — Câmeras. Suíte Cinemachine e Câmeras Virtuais ativadas."
            },
            {
                    "type": "narrative",
                    "text": "Lentes etéreas orbitam o campo de treinamento da guilda. Lyra Nex ajusta distâncias focais e curvas de amortecimento para enquadrar a ação perfeitamente."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "No passado, programadores passavam semanas escrevendo códigos de câmera com matemática complexa. Hoje, o pacote oficial **Cinemachine** do Unity gerencia Câmeras Virtuais (vcam) de forma inteligente e cinematográfica!"
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "Configuramos o alvo do jogador com o <code>Follow Target</code> e definimos a distância orbital (como 5.0m). Para que a câmera não trema abruptamente quando o herói correr, aplicamos o amortecimento suave chamado <strong>Damping</strong>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "A transição entre diferentes câmeras virtuais (como alternar de exploração para uma cutscene de boss) ocorre de forma fluida e automática pelo Cinemachine Brain. Complete as atividades para dominar a visão em 3ª pessoa."
            }
    ],
    concept: {
        title: "CINEMACHINE NO UNITY: CÂMERAS VIRTUAIS, FOLLOW TARGET, DAMPING E TRANSIÇÕES",
        explanation: "Cinemachine gerencia as lentes e pontos de vista do jogo através de Câmeras Virtuais:\n<ul>\n  <li><strong>Alvo de Acompanhamento (Follow Target):</strong> Aponta qual Transform a câmera deve seguir pelo cenário: <code>string alvoSeguido = \"Heroi\";</code> emitindo <code>\"Cinemachine: Seguindo Heroi\"</code>.</li>\n  <li><strong>Distância Orbital da Câmera:</strong> Define o raio do orbitador em metros que separa a câmera do personagem (ex: <code>float distanciaOrbital = 5.0f;</code> emitindo <code>\"Distancia da Camera: 5m\"</code>).</li>\n  <li><strong>Amortecimento Suave (Damping):</strong> Coeficiente que suaviza a resposta da câmera aos movimentos rápidos do herói, evitando solavancos na tela (ex: <code>float damping = 0.5f;</code>).</li>\n  <li><strong>Transição entre Câmeras (Blend):</strong> O Cinemachine Brain interpola a posição e o ângulo suavemente quando alternamos entre câmeras virtuais (ex: <code>\"Transicao Suave: 1.5s\"</code>).</li>\n  <li><strong>Prioridade de Câmera:</strong> A câmera virtual com maior valor numérico de Priority assume o controle da visão do jogador instantaneamente.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploCinemachine : MonoBehaviour
{
    void Start()
    {
        // 1. Configuração do alvo de seguimento
        string alvo = "Heroi";
        Debug.Log("Cinemachine: Seguindo " + alvo);

        // 2. Ajuste de distância orbital
        float dist = 5.0f;
        Debug.Log("Distancia da Camera: " + dist + "m");

        // 3. Fator de amortecimento (Damping)
        float damping = 0.5f;
        Debug.Log("Damping Suave: " + damping);

        // 4. Tempo de transição entre câmeras virtuais
        float tempoBlend = 1.5f;
        Debug.Log("Transicao Suave: " + tempoBlend + "s");

        // 5. Prioridade de ativação da lente
        int prioridade = 10;
        Debug.Log("Prioridade da VCam: " + prioridade);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Configuração de Câmera Virtual em Terceira Pessoa",
        code: `using UnityEngine;

public class Camera3rdPerson : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Cinemachine: Seguindo Heroi");

        float d = 5.0f;
        Debug.Log("Distancia da Camera: " + d + "m");

        float damp = 0.5f;
        Debug.Log("Damping Suave: " + damp);

        float blend = 1.5f;
        Debug.Log("Transicao Suave: " + blend + "s");

        int prio = 10;
        Debug.Log("Prioridade da VCam: " + prio);
    }
}`,
        output: "Cinemachine: Seguindo Heroi\nDistancia da Camera: 5m\nDamping Suave: 0.5\nTransicao Suave: 1.5s\nPrioridade da VCam: 10"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Câmera 3ª Pessoa (Cinemachine) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure alvoSeguido e emita
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Câmera 3ª Pessoa (Cinemachine):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure alvoSeguido e emita
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string alvoSeguido = "Player";
        Debug.Log("Cinemachine Seguindo: " + alvoSeguido);
    }
}`,
                hint: "Cinemachine Seguindo: Player"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_18_1",
            title: "Configuração de Alvo (Follow Target)",
            difficulty: "easy",
            description: "Declare string alvoSeguido = 'Player';. Emita no Console: 'Cinemachine Seguindo: Player'.",
            validationRules: { requiredPatterns: ["alvoSeguido","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure alvoSeguido e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string alvoSeguido = "Player";
        Debug.Log("Cinemachine Seguindo: " + alvoSeguido);
    }
}`,
            tests: [
                { input: "", expected: "Cinemachine Seguindo: Player", description: "Cinemachine follow target" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: alvoSeguido, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Cinemachine Seguindo: Player" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string alvoSeguido = \"Player\";\n        Debug.Log(\"Cinemachine Seguindo: \" + alvoSeguido);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["alvoSeguido","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Cinemachine Seguindo: Player";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_2",
            title: "Distância Orbital da Câmera",
            difficulty: "easy",
            description: "Declare float raioOrbital = 4.5f;. Emita no Console: 'Distancia Orbital: 4.5m'.",
            validationRules: { requiredPatterns: ["float raioOrbital","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare raioOrbital e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float raioOrbital = 4.5f;
        Debug.Log("Distancia Orbital: " + raioOrbital + "m");
    }
}`,
            tests: [
                { input: "", expected: "Distancia Orbital: 4.5m", description: "Distância de câmera orbital" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float raioOrbital, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Distancia Orbital: 4.5m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float raioOrbital = 4.5f;\n        Debug.Log(\"Distancia Orbital: \" + raioOrbital + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float raioOrbital","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Distancia Orbital: 4.5m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_3",
            title: "Amortecimento Suave (Damping)",
            difficulty: "medium",
            description: "Declare float damping = 0.3f;. Emita no Console: 'Suavizacao Damping: 0.3'.",
            validationRules: { requiredPatterns: ["float damping","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare damping e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float damping = 0.3f;
        Debug.Log("Suavizacao Damping: " + damping);
    }
}`,
            tests: [
                { input: "", expected: "Suavizacao Damping: 0.3", description: "Damping da câmera" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float damping, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Suavizacao Damping: 0.3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float damping = 0.3f;\n        Debug.Log(\"Suavizacao Damping: \" + damping);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float damping","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Suavizacao Damping: 0.3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_4",
            title: "Transição Suave Entre Câmeras Virtuais",
            difficulty: "medium",
            description: "Declare int prioridadeVcam1 = 10 e int prioridadeVcam2 = 20. Se prioridadeVcam2 > prioridadeVcam1, emita 'Vcam2 Ativa por Prioridade'.",
            validationRules: { requiredPatterns: ["prioridadeVcam1","prioridadeVcam2","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Compare as prioridades e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int prioridadeVcam1 = 10;
        int prioridadeVcam2 = 20;
        if (prioridadeVcam2 > prioridadeVcam1)
        {
            Debug.Log("Vcam2 Ativa por Prioridade");
        }
    }
}`,
            tests: [
                { input: "", expected: "Vcam2 Ativa por Prioridade", description: "Prioridade de vcam" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: prioridadeVcam1, prioridadeVcam2" },
                { level: "II", text: "A saída no console deve conter exatamente: Vcam2 Ativa por Prioridade" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int prioridadeVcam1 = 10;\n        int prioridadeVcam2 = 20;\n        if (prioridadeVcam2 > prioridadeVcam1)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["prioridadeVcam1","prioridadeVcam2","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vcam2 Ativa por Prioridade";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 5 },
            title: "Zona Morta da Câmera (Dead Zone)",
            difficulty: "medium",
            description: "Declare float deadZoneWidth = 0.1f;. Emita no Console: 'Largura Dead Zone: 0.1'.",
            validationRules: { requiredPatterns: ["float deadZoneWidth","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare deadZoneWidth e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float deadZoneWidth = 0.1f;
        Debug.Log("Largura Dead Zone: " + deadZoneWidth);
    }
}`,
            tests: [
                { input: "", expected: "Largura Dead Zone: 0.1", description: "Dead zone da Cinemachine" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float deadZoneWidth, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Largura Dead Zone: 0.1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float deadZoneWidth = 0.1f;\n        Debug.Log(\"Largura Dead Zone: \" + deadZoneWidth);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float deadZoneWidth","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Largura Dead Zone: 0.1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 19 — CÂMERA 1ª PESSOA (FPS LOOK)
// ═══════════════════════════════════════════════════════
{
    id: 19,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
    title: "Câmera 1ª Pessoa (FPS Look)",
    theme: "Módulo 6 — Câmeras",
    unlock: "Visor em 1ª Pessoa",
    unlockIcon: "[FPS]",
    character: "elion",
    xpReward: 260,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando a Visão em Primeira Pessoa. Mecanismo de Mouse Look e Pitch Clamp ativado."
            },
            {
                    "type": "narrative",
                    "text": "A perspectiva muda para dentro do elmo de combate. Elion Raven configura a rotação ocular direta e o travamento do cursor na tela."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA & ANALISTA",
                    "cssClass": "elion",
                    "text": "Em jogos de tiro e exploração em primeira pessoa (FPS), o mouse dita para onde olhamos. A primeira regra é travar o cursor no centro da tela com <code>Cursor.lockState = CursorLockMode.Locked;</code> para que a seta do mouse não escape da janela!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "A rotação horizontal gira o corpo inteiro do personagem no eixo Y. Já a rotação vertical (olhar para cima e para baixo) gira apenas os olhos e precisa ser limitada entre -80° e +80° com <code>Mathf.Clamp</code>, para evitar que o pescoço do jogador dê uma volta de 360°!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Ajustar o Campo de Visão (Field of View / FOV) é o toque final de imersão, permitindo simular zoom ao mirar (como reduzir o FOV de 60 para 40). Domine a mecânica de FPS neste capítulo."
            }
    ],
    concept: {
        title: "CÂMERA FPS: SENSIBILIDADE DO MOUSE, CURSOR LOCK, CLAMP VERTICAL E CAMPO DE VISÃO (FOV)",
        explanation: "O controle de câmera em primeira pessoa divide a rotação em dois eixos independentes:\n<ul>\n  <li><strong>Sensibilidade do Mouse:</strong> Multiplicador que calibra a velocidade com que o movimento do mouse se converte em graus de giro (ex: <code>float sensibilidade = 2.5f;</code>).</li>\n  <li><strong>Trava de Cursor (Cursor.lockState):</strong> Oculta e trava o ponteiro no centro da tela para navegação contínua (ex: emitir <code>\"Cursor Travado no Centro\"</code>).</li>\n  <li><strong>Limite de Rotação Vertical (Clamp Pitch):</strong> Trava a inclinação vertical entre valores mínimos e máximos (ex: -80° e +80°) com <code>Mathf.Clamp</code>, impedindo inversão visual estranha.</li>\n  <li><strong>Rotação Horizontal do Corpo:</strong> O movimento horizontal do mouse aplica rotação diretamente ao Transform do corpo do personagem (ex: girar 15 graus no eixo Y).</li>\n  <li><strong>Campo de Visão (Field of View / FOV):</strong> Determina a amplitude angular da lente da câmera. Ao mirar (<code>bool mirando = true</code>), reduzir o FOV (ex: de 60 para 40) cria o clássico efeito de aproximação óptica/zoom.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploFPSLook : MonoBehaviour
{
    void Start()
    {
        // 1. Sensibilidade do mouse
        float sensibilidade = 2.5f;
        Debug.Log("Sensibilidade do Mouse: " + sensibilidade);

        // 2. Trava do cursor
        Debug.Log("Cursor Travado no Centro");

        // 3. Limite vertical (Clamp)
        float limiteVertical = 80.0f;
        Debug.Log("Limite Vertical Clamp: " + limiteVertical + " graus");

        // 4. Giro horizontal do corpo
        float mouseX = 15.0f;
        Debug.Log("Giro Horizontal do Corpo: " + mouseX + " graus");

        // 5. Ajuste de Campo de Visão (FOV) ao mirar
        int fov = 60;
        bool mirando = true;
        if (mirando)
        {
            fov = 40;
            Debug.Log("FOV Atual: " + fov);
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Controlador de Visão FPS com Zoom de Mira",
        code: `using UnityEngine;

public class FPSLookController : MonoBehaviour
{
    void Start()
    {
        float sens = 2.5f;
        Debug.Log("Sensibilidade do Mouse: " + sens);

        Debug.Log("Cursor Travado no Centro");

        float clamp = 80.0f;
        Debug.Log("Limite Vertical Clamp: " + clamp + " graus");

        float rotX = 15.0f;
        Debug.Log("Giro Horizontal do Corpo: " + rotX + " graus");

        int fov = 60;
        bool aim = true;
        if (aim) fov = 40;
        Debug.Log("FOV Atual: " + fov);
    }
}`,
        output: "Sensibilidade do Mouse: 2.5\nCursor Travado no Centro\nLimite Vertical Clamp: 80 graus\nGiro Horizontal do Corpo: 15 graus\nFOV Atual: 40"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Câmera 1ª Pessoa (FPS Look) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare sensibilidade e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Câmera 1ª Pessoa (FPS Look):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare sensibilidade e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float sensibilidade = 2.0f;
        Debug.Log("Sensibilidade Mouse: " + sensibilidade);
    }
}`,
                hint: "Sensibilidade Mouse: 2"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_19_1",
            title: "Sensibilidade do Mouse Look",
            difficulty: "easy",
            description: "Declare float sensibilidade = 2.0f;. Emita no Console: 'Sensibilidade Mouse: 2'.",
            validationRules: { requiredPatterns: ["float sensibilidade","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare sensibilidade e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float sensibilidade = 2.0f;
        Debug.Log("Sensibilidade Mouse: " + sensibilidade);
    }
}`,
            tests: [
                { input: "", expected: "Sensibilidade Mouse: 2", description: "Sensibilidade FPS" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float sensibilidade, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Sensibilidade Mouse: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float sensibilidade = 2.0f;\n        Debug.Log(\"Sensibilidade Mouse: \" + sensibilidade);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float sensibilidade","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Sensibilidade Mouse: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_19_2",
            title: "Trava de Cursor no Centro da Tela",
            difficulty: "easy",
            description: "Configure a trava do cursor acessando Cursor.lockState = 0;. Emita no Console: 'Cursor Bloqueado no Centro'.",
            validationRules: { requiredPatterns: ["Cursor.lockState","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure Cursor.lockState e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Cursor.lockState = 0;
        Debug.Log("Cursor Bloqueado no Centro");
    }
}`,
            tests: [
                { input: "", expected: "Cursor Bloqueado no Centro", description: "Bloqueio do Cursor" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Cursor.lockState, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Cursor Bloqueado no Centro" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Cursor.lockState = 0;\n        Debug.Log(\"Cursor Bloqueado no Centro\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Cursor.lockState","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Cursor Bloqueado no Centro";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_19_3",
            title: "Limite de Rotação Vertical (Clamp Pitch)",
            difficulty: "medium",
            description: "Restrinja o ângulo vertical para não quebrar o pescoço do personagem: use Mathf.Clamp(95, -80, 80) e emita 'Angulo Travado: ' + angulo.",
            validationRules: { requiredPatterns: ["Mathf.Clamp","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Aplique Mathf.Clamp entre -80 e 80
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float angulo = Mathf.Clamp(95, -80, 80);
        Debug.Log("Angulo Travado: " + angulo);
    }
}`,
            tests: [
                { input: "", expected: "Angulo Travado: 80", description: "Mathf.Clamp vertical" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Mathf.Clamp, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Angulo Travado: 80" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float angulo = Mathf.Clamp(95, -80, 80);\n        Debug.Log(\"Angulo Travado: \" + angulo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Mathf.Clamp","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Angulo Travado: 80";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_19_4",
            title: "Rotação Horizontal do Corpo",
            difficulty: "medium",
            description: "Declare float mouseX = 15.0f;. Emita no Console: 'Giro Horizontal do Corpo: 15 graus'.",
            validationRules: { requiredPatterns: ["float mouseX","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare mouseX e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float mouseX = 15.0f;
        Debug.Log("Giro Horizontal do Corpo: " + mouseX + " graus");
    }
}`,
            tests: [
                { input: "", expected: "Giro Horizontal do Corpo: 15 graus", description: "Giro horizontal" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float mouseX, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Giro Horizontal do Corpo: 15 graus" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float mouseX = 15.0f;\n        Debug.Log(\"Giro Horizontal do Corpo: \" + mouseX + \" graus\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float mouseX","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Giro Horizontal do Corpo: 15 graus";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_19_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
            title: "Campo de Visão (Field of View)",
            difficulty: "medium",
            description: "Declare int fov = 60;. Quando o jogador mirar (bool mirando = true), reduza o fov para 40 e emita 'FOV Atual: ' + fov.",
            validationRules: { requiredPatterns: ["int fov","bool mirando","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Reduza o FOV ao mirar e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int fov = 60;
        bool mirando = true;
        if (mirando) fov = 40;
        Debug.Log("FOV Atual: " + fov);
    }
}`,
            tests: [
                { input: "", expected: "FOV Atual: 40", description: "Zoom com FOV" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int fov, bool mirando" },
                { level: "II", text: "A saída no console deve conter exatamente: FOV Atual: 40" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int fov = 60;\n        bool mirando = true;\n        if (mirando) fov = 40;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int fov","bool mirando","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "FOV Atual: 40";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 20 — GEOMETRIAS 3D E MESHES
// ═══════════════════════════════════════════════════════
{
    id: 20,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 6 },
    title: "Geometrias 3D e Meshes",
    theme: "Módulo 7 — Mundo 3D",
    unlock: "Malha Poligonal",
    unlockIcon: "[MESH]",
    character: "orin",
    xpReward: 270,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 7 — Mundo 3D. Topologia poligonal e malhas 3D sincronizadas."
            },
            {
                    "type": "narrative",
                    "text": "Estruturas de arame (wireframes) desenham-se no ar como constelações geométricas. Orin Vale esculpe vértices e triângulos de luz pura."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Tudo o que você enxerga em um jogo tridimensional — um monstro, uma rocha ou uma espada — é uma **Mesh**! Uma malha é formada por vértices no espaço, triângulos que ligam esses vértices e coordenadas de textura chamadas UVs."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Em computação gráfica, placas quadradas (quads) não existem na GPU: cada quad é obrigatoriamente formado por 2 triângulos! Um cubo simples de 6 faces, por exemplo, é composto por exatamente 12 triângulos poligonais."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Para que a iluminação reaja corretamente sobre a superfície, calculamos as normais da malha com <code>RecalculateNormals()</code>. Aprenda como a geometria 3D se estrutura neste capítulo."
            }
    ],
    concept: {
        title: "ANATOMIA DE UMA MESH 3D: VÉRTICES, TRIÂNGULOS, UV MAPPING E RECÁLCULO DE NORMAIS",
        explanation: "Uma <code>Mesh</code> é a estrutura geométrica básica renderizada pela GPU:\n<ul>\n  <li><strong>Vértices (<code>vertices</code>):</strong> Conjunto de pontos 3D que definem as pontas da geometria (ex: um cubo possui 24 vértices para preservar arestas afiadas).</li>\n  <li><strong>Triângulos (<code>triangles</code>):</strong> Índices de vértices agrupados de 3 em 3. Cada face quadrada (quad) é formada por 2 triângulos. Um cubo de 6 faces requer <code>6 * 2 = 12</code> triângulos.</li>\n  <li><strong>Mapeamento UV (<code>uv</code>):</strong> Coordenadas bidimensionais normalizadas de 0 a 1 que mapeiam a textura 2D sobre a malha 3D (ex: o centro da textura é <code>Vector2(0.5f, 0.5f)</code>).</li>\n  <li><strong>Recálculo de Normais (<code>RecalculateNormals</code>):</strong> As normais são vetores perpendiculares a cada vértice que dizem para qual direção a superfície está virada, essencial para o cálculo de luz e sombras.</li>\n  <li><strong>Submeshes e Draw Calls:</strong> Malhas divididas em múltiplas sub-partes consomem mais draw calls; unificar geometrias em uma submesh única otimiza o desempenho.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploMeshes : MonoBehaviour
{
    void Start()
    {
        // 1. Contagem de vértices da malha
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);

        // 2. Cálculo de triângulos para um cubo (6 faces * 2 triângulos)
        int facesCubo = 6;
        int totalTriangulos = facesCubo * 2;
        Debug.Log("Total Triangulos: " + totalTriangulos);

        // 3. Coordenada UV de textura
        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");

        // 4. Recálculo de normais da geometria
        string statusNormais = "Normais Recalculadas com Sucesso";
        Debug.Log(statusNormais);

        // 5. Verificação de submeshes otimizadas
        int submeshes = 1;
        if (submeshes == 1)
        {
            Debug.Log("Malha Otimizada: Draw Call Unico");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Inspeção de Dados de Geometria Tridimensional",
        code: `using UnityEngine;

public class InspecaoMesh : MonoBehaviour
{
    void Start()
    {
        int v = 24;
        Debug.Log("Vertices da Malha: " + v);

        int t = 6 * 2;
        Debug.Log("Total Triangulos: " + t);

        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");

        Debug.Log("Normais Recalculadas com Sucesso");

        int sub = 1;
        if (sub == 1) Debug.Log("Malha Otimizada: Draw Call Unico");
    }
}`,
        output: "Vertices da Malha: 24\nTotal Triangulos: 12\nCentro UV: (0.5, 0.5)\nNormais Recalculadas com Sucesso\nMalha Otimizada: Draw Call Unico"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Geometrias 3D e Meshes e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalVertices e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Geometrias 3D e Meshes:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalVertices e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);
    }
}`,
                hint: "Vertices da Malha: 24"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_20_1",
            title: "Contagem de Vértices da Geometria",
            difficulty: "easy",
            description: "Declare int totalVertices = 24;. Emita no Console: 'Vertices da Malha: 24'.",
            validationRules: { requiredPatterns: ["int totalVertices","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalVertices e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);
    }
}`,
            tests: [
                { input: "", expected: "Vertices da Malha: 24", description: "Contagem de vértices" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int totalVertices, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Vertices da Malha: 24" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalVertices = 24;\n        Debug.Log(\"Vertices da Malha: \" + totalVertices);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int totalVertices","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vertices da Malha: 24";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_2",
            title: "Triângulos e Faces Poligonais",
            difficulty: "easy",
            description: "Cada quad requer 2 triângulos. Para 6 faces de um cubo, calcule totalTriangulos = 6 * 2 e emita 'Total Triangulos: ' + totalTriangulos.",
            validationRules: { requiredPatterns: ["totalTriangulos","6 * 2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule totalTriangulos e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalTriangulos = 6 * 2;
        Debug.Log("Total Triangulos: " + totalTriangulos);
    }
}`,
            tests: [
                { input: "", expected: "Total Triangulos: 12", description: "Triangulação de cubo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: totalTriangulos, 6 * 2" },
                { level: "II", text: "A saída no console deve conter exatamente: Total Triangulos: 12" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalTriangulos = 6 * 2;\n        Debug.Log(\"Total Triangulos: \" + totalTriangulos);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["totalTriangulos","6 * 2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total Triangulos: 12";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_3",
            title: "Mapeamento UV de Textura",
            difficulty: "medium",
            description: "Declare Vector2 uv = new Vector2(0.5f, 0.5f);. Emita no Console: 'Centro UV: (0.5, 0.5)'.",
            validationRules: { requiredPatterns: ["new Vector2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare uv e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");
    }
}`,
            tests: [
                { input: "", expected: "Centro UV: (0.5, 0.5)", description: "Coordenadas UV" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector2, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Centro UV: (0.5, 0.5)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector2 uv = new Vector2(0.5f, 0.5f);\n        Debug.Log(\"Centro UV: (\" + uv.x + \", \" + uv.y + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Centro UV: (0.5, 0.5)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_4",
            title: "Recálculo de Normais da Malha",
            difficulty: "medium",
            description: "Declare string statusNormais = 'Normais Recalculadas com Sucesso';. Emita no Console o valor de statusNormais.",
            validationRules: { requiredPatterns: ["string statusNormais","statusNormais","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusNormais e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusNormais = "Normais Recalculadas com Sucesso";
        Debug.Log(statusNormais);
    }
}`,
            tests: [
                { input: "", expected: "Normais Recalculadas com Sucesso", description: "RecalculateNormals" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusNormais, statusNormais" },
                { level: "II", text: "A saída no console deve conter exatamente: Normais Recalculadas com Sucesso" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusNormais = \"Normais Recalculadas com Sucesso\";\n        Debug.Log(statusNormais);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusNormais","statusNormais","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Normais Recalculadas com Sucesso";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 6 },
            title: "Otimização de Submeshes",
            difficulty: "medium",
            description: "Declare int submeshes = 1;. Se submeshes == 1, emita 'Malha Otimizada: Draw Call Unico'.",
            validationRules: { requiredPatterns: ["int submeshes","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque as submeshes
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int submeshes = 1;
        if (submeshes == 1)
        {
            Debug.Log("Malha Otimizada: Draw Call Unico");
        }
    }
}`,
            tests: [
                { input: "", expected: "Malha Otimizada: Draw Call Unico", description: "Submesh e draw call" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int submeshes, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Malha Otimizada: Draw Call Unico" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int submeshes = 1;\n        if (submeshes == 1)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int submeshes","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Malha Otimizada: Draw Call Unico";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 21 — TERRENO E VEGETAÇÃO
// ═══════════════════════════════════════════════════════
{
    id: 21,
    artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 6 },
    title: "Terreno e Vegetação",
    theme: "Módulo 7 — Mundo 3D",
    unlock: "Semente do Terreno",
    unlockIcon: "[TERR]",
    character: "mira",
    xpReward: 280,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Carregando o Módulo de Relevo e Biomas. Sistema de Terreno e Vegetação instanciado."
            },
            {
                    "type": "narrative",
                    "text": "Montanhas colossais, colinas verdejantes e florestas densas erguem-se a partir do piso dimensional. Mira Solenn pinta texturas de solo e espalha árvores com pincéis arcanos."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "O componente **Terrain** do Unity permite criar mundos imensos sem modelar tudo no Blender! A elevação das montanhas é guiada por um mapa de alturas chamado <code>Heightmap</code>, que diz a elevação vertical exata em cada ponto."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Para que uma floresta com milhares de árvores e grama não trave o jogo, o motor utiliza instanciamento em lote na GPU e define distâncias de corte (Detail Distance), renderizando pequenos arbustos somente perto do herói!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Camadas de pintura de solo (Splatmaps) misturam terra, rocha e grama de acordo com a inclinação do terreno. Complete as atividades para dominar a construção de biomas."
            }
    ],
    concept: {
        title: "O SISTEMA DE TERRENOS DO UNITY: DIMENSÕES, HEIGHTMAPS, VEGETAÇÃO E SPLATMAPS",
        explanation: "O sistema de <code>Terrain</code> do Unity é otimizado para gerar relevos massivos em tempo real:\n<ul>\n  <li><strong>Dimensões do Terreno:</strong> Define a área plana em metros quadrados abrangida pelo mapa (ex: <code>int tamanhoTerreno = 500;</code> emitindo <code>\"Area do Terreno: 500x500m\"</code>).</li>\n  <li><strong>Leitura de Altura (Heightmap):</strong> A elevação Y do terreno em uma coordenada X/Z é amostrada a partir de uma matriz de alturas em tons de cinza (ex: elevação no ponto atingindo 24.5m).</li>\n  <li><strong>Densidade de Vegetação e Árvores:</strong> Milhares de instâncias de árvores são renderizadas com billboarding e batching da GPU (ex: 1200 árvores instanciadas).</li>\n  <li><strong>Distância de Desenho de Detalhes (Detail Distance):</strong> Raio esférico em metros a partir da câmera além do qual a grama 3D deixa de ser desenhada para economizar taxa de quadros (ex: 80 metros).</li>\n  <li><strong>Pintura de Camadas (Splatmap):</strong> Camadas de textura (ex: 'Grama_Rochosa') que misturam diferentes materiais na superfície do terreno.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploTerrenos : MonoBehaviour
{
    void Start()
    {
        // 1. Dimensões da área de terreno
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");

        // 2. Altura calculada pelo heightmap
        float alturaY = 24.5f;
        Debug.Log("Elevacao no Ponto: " + alturaY + "m");

        // 3. Contagem de árvores instanciadas
        int totalArvores = 1200;
        Debug.Log("Instancias de Arvores: " + totalArvores);

        // 4. Distância de corte de detalhes e grama
        int distanciaDetalhes = 80;
        Debug.Log("Distancia de Detalhes: " + distanciaDetalhes + "m");

        // 5. Camada ativa de textura do relevo
        string camadaAtiva = "Grama_Rochosa";
        Debug.Log("Camada de Textura: " + camadaAtiva);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Configuração de Bioma e Vegetação",
        code: `using UnityEngine;

public class BiomaController : MonoBehaviour
{
    void Start()
    {
        int area = 500;
        Debug.Log("Area do Terreno: " + area + "x" + area + "m");

        float h = 24.5f;
        Debug.Log("Elevacao no Ponto: " + h + "m");

        int arvores = 1200;
        Debug.Log("Instancias de Arvores: " + arvores);

        int d = 80;
        Debug.Log("Distancia de Detalhes: " + d + "m");

        Debug.Log("Camada de Textura: Grama_Rochosa");
    }
}`,
        output: "Area do Terreno: 500x500m\nElevacao no Ponto: 24.5m\nInstancias de Arvores: 1200\nDistancia de Detalhes: 80m\nCamada de Textura: Grama_Rochosa"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Terreno e Vegetação e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tamanhoTerreno e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Terreno e Vegetação:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tamanhoTerreno e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");
    }
}`,
                hint: "Area do Terreno: 500x500m"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_21_1",
            title: "Dimensões do Terreno",
            difficulty: "easy",
            description: "Declare int tamanhoTerreno = 500;. Emita no Console: 'Area do Terreno: 500x500m'.",
            validationRules: { requiredPatterns: ["int tamanhoTerreno","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tamanhoTerreno e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");
    }
}`,
            tests: [
                { input: "", expected: "Area do Terreno: 500x500m", description: "Dimensões do terreno" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int tamanhoTerreno, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Area do Terreno: 500x500m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int tamanhoTerreno = 500;\n        Debug.Log(\"Area do Terreno: \" + tamanhoTerreno + \"x\" + tamanhoTerreno + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int tamanhoTerreno","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Area do Terreno: 500x500m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_2",
            title: "Leitura de Altura do Mapa (Heightmap)",
            difficulty: "easy",
            description: "Declare float alturaY = 24.5f;. Emita no Console: 'Elevacao no Ponto: 24.5m'.",
            validationRules: { requiredPatterns: ["float alturaY","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare alturaY e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float alturaY = 24.5f;
        Debug.Log("Elevacao no Ponto: " + alturaY + "m");
    }
}`,
            tests: [
                { input: "", expected: "Elevacao no Ponto: 24.5m", description: "Elevação de terreno" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float alturaY, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Elevacao no Ponto: 24.5m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float alturaY = 24.5f;\n        Debug.Log(\"Elevacao no Ponto: \" + alturaY + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float alturaY","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Elevacao no Ponto: 24.5m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_3",
            title: "Densidade de Vegetação e Árvores",
            difficulty: "medium",
            description: "Declare int totalArvores = 1200;. Emita no Console: 'Instancias de Arvores: 1200'.",
            validationRules: { requiredPatterns: ["int totalArvores","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalArvores e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalArvores = 1200;
        Debug.Log("Instancias de Arvores: " + totalArvores);
    }
}`,
            tests: [
                { input: "", expected: "Instancias de Arvores: 1200", description: "Densidade vegetal" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int totalArvores, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Instancias de Arvores: 1200" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalArvores = 1200;\n        Debug.Log(\"Instancias de Arvores: \" + totalArvores);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int totalArvores","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Instancias de Arvores: 1200";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_4",
            title: "Distância de Desenho de Grama",
            difficulty: "medium",
            description: "Declare int distanciaDetalhes = 80;. Emita no Console: 'Distancia de Detalhes: 80m'.",
            validationRules: { requiredPatterns: ["int distanciaDetalhes","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare distanciaDetalhes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int distanciaDetalhes = 80;
        Debug.Log("Distancia de Detalhes: " + distanciaDetalhes + "m");
    }
}`,
            tests: [
                { input: "", expected: "Distancia de Detalhes: 80m", description: "Detail distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int distanciaDetalhes, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Distancia de Detalhes: 80m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int distanciaDetalhes = 80;\n        Debug.Log(\"Distancia de Detalhes: \" + distanciaDetalhes + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int distanciaDetalhes","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Distancia de Detalhes: 80m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_5",
            artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 6 },
            title: "Pintura de Camada de Textura (Splatmap)",
            difficulty: "medium",
            description: "Declare string camadaAtiva = 'Grama_Rochosa';. Emita no Console: 'Camada de Textura: Grama_Rochosa'.",
            validationRules: { requiredPatterns: ["camadaAtiva","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare camadaAtiva e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string camadaAtiva = "Grama_Rochosa";
        Debug.Log("Camada de Textura: " + camadaAtiva);
    }
}`,
            tests: [
                { input: "", expected: "Camada de Textura: Grama_Rochosa", description: "Textura do terreno" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: camadaAtiva, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Camada de Textura: Grama_Rochosa" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string camadaAtiva = \"Grama_Rochosa\";\n        Debug.Log(\"Camada de Textura: \" + camadaAtiva);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["camadaAtiva","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Camada de Textura: Grama_Rochosa";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 22 — ILUMINAÇÃO, APV E POST-PROCESSING
// ═══════════════════════════════════════════════════════
{
    id: 22,
    artifactReward: { artifactId: "Ring_Draco", minStars: 4, maxStars: 6 },
    title: "Iluminação, APV e Post-Processing",
    theme: "Módulo 7 — Mundo 3D",
    unlock: "Luz Razoável APV",
    unlockIcon: "[LIGHT]",
    character: "lyra",
    xpReward: 290,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando o Pipeline de Renderização Universal (URP). Iluminação global, APV e pós-processamento ativados."
            },
            {
                    "type": "narrative",
                    "text": "Feixes de luz dourada atravessam vitrais góticos. Sombras suaves desenham o relevo enquanto um brilho etéreo (bloom) envolve cristais de mana."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "A iluminação é a alma da atmosfera de um jogo! Uma **Directional Light** simula a luz do sol infinito projetando sombras suaves em tempo real com <code>SoftShadows</code>."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "No Unity moderno, o novo sistema de **Adaptive Probe Volumes (APV)** espalha milhares de sondas volumétricas de luz pela cena, iluminando personagens em movimento com precisão de iluminação global. E os volumes de **Post-Processing** adicionam efeitos cinematográficos como Bloom e Vinheta!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "O efeito Bloom faz superfícies luminosas transbordarem brilho nos olhos do jogador, enquanto o Color Grading dita o tom emocional da narrativa. Pratique esses parâmetros vitais."
            }
    ],
    concept: {
        title: "ILUMINAÇÃO NO UNITY: LUZ DIRECIONAL, SOFT SHADOWS, ADAPTIVE PROBE VOLUMES E BLOOM",
        explanation: "A iluminação e o pós-processamento transformam modelos simples em uma cena rica e cinematográfica:\n<ul>\n  <li><strong>Intensidade da Luz Solar (Directional Light):</strong> Modela a luz emitida a uma distância infinita, medida em Lux (ex: <code>float intensidadeLuz = 1.2f;</code> emitindo <code>\"Intensidade Solar: 1.2 Lux\"</code>).</li>\n  <li><strong>Sombras em Tempo Real:</strong> As sombras suaves (<code>SoftShadows</code>) filtram as bordas da penumbra, conferindo realismo à projeção de corpos sólidos.</li>\n  <li><strong>Adaptive Probe Volumes (APV):</strong> A tecnologia moderna de iluminação global que distribui sondas de luz volumétricas adaptáveis na cena (ex: 250 probes gravadas).</li>\n  <li><strong>Efeito Bloom de Pós-Processamento:</strong> Simula o transbordamento óptico de luz intensa na lente da câmera quando ativado (ex: <code>\"Bloom Ativo com Intensidade: 0.8\"</code>).</li>\n  <li><strong>Vinheta Cinematográfica:</strong> Efeito visual que escurece suavemente os cantos da tela, focando o olhar do jogador no centro da ação (ex: intensidade 0.35).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploIluminacao : MonoBehaviour
{
    void Start()
    {
        // 1. Intensidade solar
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");

        // 2. Tipo de sombra
        string tipoSombra = "SoftShadows";
        Debug.Log("Tipo de Sombra: " + tipoSombra);

        // 3. Sondas volumétricas de luz (APV)
        int totalProbes = 250;
        Debug.Log("Adaptive Probe Volumes: " + totalProbes + " probes");

        // 4. Efeito Bloom
        bool bloomAtivo = true;
        float intensidadeBloom = 0.8f;
        if (bloomAtivo)
        {
            Debug.Log("Bloom Ativo com Intensidade: " + intensidadeBloom);
        }

        // 5. Vinheta de pós-processamento
        float vinhetaIntensidade = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinhetaIntensidade);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Painel de Iluminação e Atmosfera Visual",
        code: `using UnityEngine;

public class AtmosferaURP : MonoBehaviour
{
    void Start()
    {
        float lux = 1.2f;
        Debug.Log("Intensidade Solar: " + lux + " Lux");

        Debug.Log("Tipo de Sombra: SoftShadows");

        int probes = 250;
        Debug.Log("Adaptive Probe Volumes: " + probes + " probes");

        bool bloom = true;
        if (bloom) Debug.Log("Bloom Ativo com Intensidade: 0.8");

        float vinheta = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinheta);
    }
}`,
        output: "Intensidade Solar: 1.2 Lux\nTipo de Sombra: SoftShadows\nAdaptive Probe Volumes: 250 probes\nBloom Ativo com Intensidade: 0.8\nVinheta Cinematica: 0.35"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Iluminação, APV e Post-Processing e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare intensidadeLuz e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Iluminação, APV e Post-Processing:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare intensidadeLuz e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");
    }
}`,
                hint: "Intensidade Solar: 1.2 Lux"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_22_1",
            title: "Intensidade da Luz Direcional (Sol)",
            difficulty: "easy",
            description: "Declare float intensidadeLuz = 1.2f;. Emita no Console: 'Intensidade Solar: 1.2 Lux'.",
            validationRules: { requiredPatterns: ["float intensidadeLuz","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare intensidadeLuz e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");
    }
}`,
            tests: [
                { input: "", expected: "Intensidade Solar: 1.2 Lux", description: "Intensidade de luz" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float intensidadeLuz, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Intensidade Solar: 1.2 Lux" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float intensidadeLuz = 1.2f;\n        Debug.Log(\"Intensidade Solar: \" + intensidadeLuz + \" Lux\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float intensidadeLuz","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Intensidade Solar: 1.2 Lux";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_2",
            title: "Sombras em Tempo Real (Shadows)",
            difficulty: "easy",
            description: "Declare string tipoSombra = 'SoftShadows';. Emita no Console: 'Tipo de Sombra: SoftShadows'.",
            validationRules: { requiredPatterns: ["tipoSombra","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tipoSombra e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tipoSombra = "SoftShadows";
        Debug.Log("Tipo de Sombra: " + tipoSombra);
    }
}`,
            tests: [
                { input: "", expected: "Tipo de Sombra: SoftShadows", description: "Modo de sombras" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tipoSombra, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Tipo de Sombra: SoftShadows" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tipoSombra = \"SoftShadows\";\n        Debug.Log(\"Tipo de Sombra: \" + tipoSombra);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tipoSombra","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Tipo de Sombra: SoftShadows";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_3",
            title: "Sondas de Luz Adaptativas (APV)",
            difficulty: "medium",
            description: "Declare int totalProbes = 250;. Emita no Console: 'Adaptive Probe Volumes: 250 probes'.",
            validationRules: { requiredPatterns: ["int totalProbes","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalProbes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalProbes = 250;
        Debug.Log("Adaptive Probe Volumes: " + totalProbes + " probes");
    }
}`,
            tests: [
                { input: "", expected: "Adaptive Probe Volumes: 250 probes", description: "APV probes" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int totalProbes, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Adaptive Probe Volumes: 250 probes" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalProbes = 250;\n        Debug.Log(\"Adaptive Probe Volumes: \" + totalProbes + \" probes\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int totalProbes","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Adaptive Probe Volumes: 250 probes";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_4",
            title: "Efeito Bloom de Pós-Processamento",
            difficulty: "medium",
            description: "Declare bool bloomAtivo = true; e float intensidadeBloom = 0.8f;. Se bloomAtivo, emita 'Bloom Ativo com Intensidade: 0.8'.",
            validationRules: { requiredPatterns: ["bool bloomAtivo","float intensidadeBloom","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide e emita o Bloom
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool bloomAtivo = true;
        float intensidadeBloom = 0.8f;
        if (bloomAtivo)
        {
            Debug.Log("Bloom Ativo com Intensidade: " + intensidadeBloom);
        }
    }
}`,
            tests: [
                { input: "", expected: "Bloom Ativo com Intensidade: 0.8", description: "Post-Processing Bloom" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool bloomAtivo, float intensidadeBloom" },
                { level: "II", text: "A saída no console deve conter exatamente: Bloom Ativo com Intensidade: 0.8" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool bloomAtivo = true;\n        float intensidadeBloom = 0.8f;\n        if (bloomAtivo)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool bloomAtivo","float intensidadeBloom","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Bloom Ativo com Intensidade: 0.8";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_5",
            artifactReward: { artifactId: "Ring_Draco", minStars: 4, maxStars: 6 },
            title: "Color Grading e Vinheta",
            difficulty: "medium",
            description: "Declare float vinhetaIntensidade = 0.35f;. Emita no Console: 'Vinheta Cinematica: 0.35'.",
            validationRules: { requiredPatterns: ["float vinhetaIntensidade","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare vinhetaIntensidade e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float vinhetaIntensidade = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinhetaIntensidade);
    }
}`,
            tests: [
                { input: "", expected: "Vinheta Cinematica: 0.35", description: "Vignette effect" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float vinhetaIntensidade, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Vinheta Cinematica: 0.35" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float vinhetaIntensidade = 0.35f;\n        Debug.Log(\"Vinheta Cinematica: \" + vinhetaIntensidade);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float vinhetaIntensidade","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vinheta Cinematica: 0.35";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 23 — INTERFACE GRÁFICA (HUD E UI)
// ═══════════════════════════════════════════════════════
{
    id: 23,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
    title: "Interface Gráfica (HUD e UI)",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Painel TextMeshPro",
    unlockIcon: "[UI]",
    character: "elion",
    xpReward: 300,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 8 — Interface e Sistemas. Canvas dimensional e TextMeshPro ativados."
            },
            {
                    "type": "narrative",
                    "text": "Displays holográficos semitransparentes flutuam diante da visão do jogador. Elion Raven programa barras de vida, indicadores de mana e contadores numéricos."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA & ANALISTA",
                    "cssClass": "elion",
                    "text": "O **HUD (Heads-Up Display)** é o elo direto entre os dados internos do jogo e a mente do jogador! Em Unity, toda interface gráfica repousa sobre um componente **Canvas** e utiliza textos de alta definição renderizados pelo **TextMeshPro**."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Barras de mana e vida suaves utilizam a propriedade <code>fillAmount</code> variando de 0.0f a 1.0f (calculada como <code>manaAtual / manaMax</code>). Menus de pause são ativados com um booleano de visibilidade, e notificações rápidas em estilo Toast alertam ganhos de XP!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Para contadores numéricos (como moedas coletadas), formate textos com formatação numérica como <code>moedas.ToString('D4')</code> gerando números no estilo '0042'. Complete as 5 atividades de UI."
            }
    ],
    concept: {
        title: "SISTEMA DE UI DO UNITY: CANVAS, TEXTMESHPRO, BARRAS DE FILLAMOUNT E NOTIFICAÇÕES HUD",
        explanation: "A interface de usuário comunica atributos e estados em tempo real:\n<ul>\n  <li><strong>Texto TextMeshPro (TMP):</strong> Renderiza tipografia nítida baseada em Signed Distance Fields (SDF): <code>string texto = \"HP: 100/100\";</code> emitindo <code>\"HUD Texto: HP: 100/100\"</code>.</li>\n  <li><strong>Preenchimento de Barras (<code>fillAmount</code>):</strong> Uma imagem do tipo Filled varia sua máscara entre 0.0 e 1.0 dividindo o valor atual pelo valor máximo: <code>float fill = manaAtual / 100.0f;</code> (ex: 75 de mana gera fill 0.75).</li>\n  <li><strong>Visibilidade de Menus de Pausa:</strong> Paineis de interface alternam seu estado com base em um booleano (ex: <code>if (menuPausaAtivo) Debug.Log(\"Painel de Pausa Visivel\");</code>).</li>\n  <li><strong>Notificação Flutuante (Toast):</strong> Mensagens breves de conquista ou progresso exibidas na tela (ex: <code>\"Toast Notificacao: +100 XP\"</code>).</li>\n  <li><strong>Formatação de Contadores Numéricos:</strong> Exibir números com dígitos fixos (ex: formatar 42 moedas como '0042' através de formatação de string).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploInterfaceUI : MonoBehaviour
{
    void Start()
    {
        // 1. Atualização de texto TextMeshPro
        string textoHp = "HP: 100/100";
        Debug.Log("HUD Texto: " + textoHp);

        // 2. Preenchimento de barra de mana (fillAmount)
        float manaAtual = 75.0f;
        float manaMax = 100.0f;
        float fill = manaAtual / manaMax;
        Debug.Log("Barra Fill: " + fill);

        // 3. Painel de pausa
        bool menuPausaAtivo = true;
        if (menuPausaAtivo)
        {
            Debug.Log("Painel de Pausa Visivel");
        }

        // 4. Notificação no HUD
        string notificacao = "+100 XP";
        Debug.Log("Toast Notificacao: " + notificacao);

        // 5. Contador de moedas formatado
        int moedas = 42;
        Debug.Log("Moedas Coletadas: 00" + moedas);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Atualizador Dinâmico do HUD de Batalha",
        code: `using UnityEngine;

public class HUDController : MonoBehaviour
{
    void Start()
    {
        Debug.Log("HUD Texto: HP: 100/100");

        float mAtual = 75.0f;
        float mMax = 100.0f;
        Debug.Log("Barra Fill: " + (mAtual / mMax));

        bool pause = true;
        if (pause) Debug.Log("Painel de Pausa Visivel");

        Debug.Log("Toast Notificacao: +100 XP");

        int c = 42;
        Debug.Log("Moedas Coletadas: 00" + c);
    }
}`,
        output: "HUD Texto: HP: 100/100\nBarra Fill: 0.75\nPainel de Pausa Visivel\nToast Notificacao: +100 XP\nMoedas Coletadas: 0042"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Interface Gráfica (HUD e UI) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o texto do HUD e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Interface Gráfica (HUD e UI):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o texto do HUD e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string texto = "HP: 100/100";
        Debug.Log("HUD Texto: " + texto);
    }
}`,
                hint: "HUD Texto: HP: 100/100"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_23_1",
            title: "Atualização de Texto TextMeshPro",
            difficulty: "easy",
            description: "Simule a atualização de um label de vida: declare string texto = 'HP: 100/100';. Emita no Console: 'HUD Texto: HP: 100/100'.",
            validationRules: { requiredPatterns: ["texto","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o texto do HUD e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string texto = "HP: 100/100";
        Debug.Log("HUD Texto: " + texto);
    }
}`,
            tests: [
                { input: "", expected: "HUD Texto: HP: 100/100", description: "Atualização de texto HUD" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: texto, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: HUD Texto: HP: 100/100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string texto = \"HP: 100/100\";\n        Debug.Log(\"HUD Texto: \" + texto);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["texto","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "HUD Texto: HP: 100/100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_23_2",
            title: "Preenchimento de Barra de Mana (FillAmount)",
            difficulty: "easy",
            description: "Declare float manaAtual = 75.0f; e float manaMax = 100.0f;. Calcule float fill = manaAtual / 100.0f; e emita 'Barra Fill: ' + fill.",
            validationRules: { requiredPatterns: ["manaAtual","manaMax","fill","/"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o preenchimento da barra e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float manaAtual = 75.0f;
        float manaMax = 100.0f;
        float fill = manaAtual / 100.0f;
        Debug.Log("Barra Fill: " + fill);
    }
}`,
            tests: [
                { input: "", expected: "Barra Fill: 0.75", description: "Cálculo de FillAmount" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: manaAtual, manaMax" },
                { level: "II", text: "A saída no console deve conter exatamente: Barra Fill: 0.75" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float manaAtual = 75.0f;\n        float manaMax = 100.0f;\n        float fill = manaAtual / 100.0f;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["manaAtual","manaMax","fill","/"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Barra Fill: 0.75";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_23_3",
            title: "Visibilidade do Menu de Pause",
            difficulty: "medium",
            description: "Declare bool menuPausaAtivo = true;. Se for verdadeiro, emita 'Painel de Pausa Visivel'.",
            validationRules: { requiredPatterns: ["bool menuPausaAtivo","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque menuPausaAtivo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool menuPausaAtivo = true;
        if (menuPausaAtivo)
        {
            Debug.Log("Painel de Pausa Visivel");
        }
    }
}`,
            tests: [
                { input: "", expected: "Painel de Pausa Visivel", description: "Painel de menu" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool menuPausaAtivo, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Painel de Pausa Visivel" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool menuPausaAtivo = true;\n        if (menuPausaAtivo)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool menuPausaAtivo","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Painel de Pausa Visivel";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_23_4",
            title: "Notificação Flutuante no HUD",
            difficulty: "medium",
            description: "Declare string notificacao = '+100 XP';. Emita no Console: 'Toast Notificacao: +100 XP'.",
            validationRules: { requiredPatterns: ["notificacao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare notificacao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string notificacao = "+100 XP";
        Debug.Log("Toast Notificacao: " + notificacao);
    }
}`,
            tests: [
                { input: "", expected: "Toast Notificacao: +100 XP", description: "Notificação HUD" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: notificacao, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Toast Notificacao: +100 XP" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string notificacao = \"+100 XP\";\n        Debug.Log(\"Toast Notificacao: \" + notificacao);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["notificacao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Toast Notificacao: +100 XP";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_23_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
            title: "Contador de Moedas na Tela",
            difficulty: "medium",
            description: "Declare int moedas = 42;. Emita no Console formatado: 'Moedas Coletadas: 0042' usando moedas.ToString().",
            validationRules: { requiredPatterns: ["int moedas","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure moedas e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int moedas = 42;
        Debug.Log("Moedas Coletadas: 00" + moedas);
    }
}`,
            tests: [
                { input: "", expected: "Moedas Coletadas: 0042", description: "Contador HUD com zeros à esquerda" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int moedas, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Moedas Coletadas: 0042" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int moedas = 42;\n        Debug.Log(\"Moedas Coletadas: 00\" + moedas);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int moedas","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Moedas Coletadas: 0042";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 24 — SISTEMAS DE PARTÍCULAS (VFX)
// ═══════════════════════════════════════════════════════
{
    id: 24,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
    title: "Sistemas de Partículas (VFX)",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Faísca VFX",
    unlockIcon: "[VFX]",
    character: "mira",
    xpReward: 310,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando os Emissores de Energia e Fluidos. Sistema de Partículas (VFX) ativo."
            },
            {
                    "type": "narrative",
                    "text": "Faíscas ardentes, brasas incandescentes e labaredas mágicas explodem em sincronia. Mira Solenn molda sistemas de partículas com propriedades dinâmicas de emissão."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Quando uma espada colide com um escudo ou uma magia explode, o impacto visual é garantido pelo **Particle System**! Ele gera centenas de partículas microscópicas com controle total de tempo de vida e velocidade."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Configuramos a taxa de emissão por segundo (<code>rateOverTime</code>), o tempo de vida (<code>lifetime</code>) antes de sumirem, e se o efeito deve rodar em looping contínuo (como uma tocha acesa) ou disparar uma única vez com <code>Play()</code> e <code>Stop()</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Um bom efeito visual fornece o feedback tátil e cinestésico do combate. Domine o controle de emissão, loop e encerramento de VFX neste capítulo."
            }
    ],
    concept: {
        title: "SISTEMAS DE PARTÍCULAS NO UNITY: EMISSÃO, LIFETIME, TAXAS E CONTROLE DE REPRODUÇÃO",
        explanation: "O <code>ParticleSystem</code> do Unity gera efeitos visuais de magia, fogo, fumaça e faíscas:\n<ul>\n  <li><strong>Emissão de Impacto (<code>Play</code>):</strong> Dispara o nascimento do efeito visual (ex: <code>string efeito = \"Faíscas de Impacto\";</code> emitindo <code>\"VFX Play: \" + efeito</code>).</li>\n  <li><strong>Taxa de Emissão (<code>emission.rateOverTime</code>):</strong> Quantidade de partículas geradas por segundo na simulação (ex: <code>int taxaEmissao = 50;</code> emitindo <code>\"Taxa de Emissao: 50 particulas/s\"</code>).</li>\n  <li><strong>Tempo de Vida (<code>startLifetime</code>):</strong> Quantos segundos cada partícula individual sobrevive no espaço antes de desvanecer (ex: <code>float duracao = 2.5f;</code> emitindo <code>\"Tempo de Vida: 2.5s\"</code>).</li>\n  <li><strong>Efeito em Loop Contínuo (<code>loop</code>):</strong> Propriedade booleana que mantém o emissor ativo indefinidamente (ex: tochas e auras).</li>\n  <li><strong>Interrupção do Sistema (<code>Stop</code>):</strong> Encerra a geração de novas partículas, permitindo que as partículas já vivas se dissipem naturalmente no ar (ex: <code>\"VFX Stop: Emissao Encerrada\"</code>).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploParticulas : MonoBehaviour
{
    void Start()
    {
        // 1. Disparo de efeito de impacto
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);

        // 2. Taxa de partículas por segundo
        int taxaEmissao = 50;
        Debug.Log("Taxa de Emissao: " + taxaEmissao + " particulas/s");

        // 3. Tempo de vida de cada partícula
        float duracao = 2.5f;
        Debug.Log("Tempo de Vida: " + duracao + "s");

        // 4. Estado de looping contínuo
        bool estaEmLoop = true;
        if (estaEmLoop)
        {
            Debug.Log("VFX em Execucao Continua");
        }

        // 5. Interrupção de emissão
        string statusVfx = "VFX Stop: Emissao Encerrada";
        Debug.Log(statusVfx);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Controlador de Efeito de Combate",
        code: `using UnityEngine;

public class VFXController : MonoBehaviour
{
    void Start()
    {
        Debug.Log("VFX Play: Faíscas de Impacto");

        int taxa = 50;
        Debug.Log("Taxa de Emissao: " + taxa + " particulas/s");

        float vida = 2.5f;
        Debug.Log("Tempo de Vida: " + vida + "s");

        bool loop = true;
        if (loop) Debug.Log("VFX em Execucao Continua");

        Debug.Log("VFX Stop: Emissao Encerrada");
    }
}`,
        output: "VFX Play: Faíscas de Impacto\nTaxa de Emissao: 50 particulas/s\nTempo de Vida: 2.5s\nVFX em Execucao Continua\nVFX Stop: Emissao Encerrada"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Sistemas de Partículas (VFX) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare efeito e emita a reproducao do VFX
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Sistemas de Partículas (VFX):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare efeito e emita a reproducao do VFX
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);
    }
}`,
                hint: "VFX Play: Faíscas de Impacto"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_24_1",
            title: "Emissão de Efeito de Impacto",
            difficulty: "easy",
            description: "Declare string efeito = 'Faíscas de Impacto';. Simule a emissão emitindo no Console: 'VFX Play: ' + efeito.",
            validationRules: { requiredPatterns: ["string efeito","efeito","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare efeito e emita a reproducao do VFX
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);
    }
}`,
            tests: [
                { input: "", expected: "VFX Play: Faíscas de Impacto", description: "Disparo de VFX" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string efeito, efeito" },
                { level: "II", text: "A saída no console deve conter exatamente: VFX Play: Faíscas de Impacto" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string efeito = \"Faíscas de Impacto\";\n        Debug.Log(\"VFX Play: \" + efeito);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string efeito","efeito","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "VFX Play: Faíscas de Impacto";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_2",
            title: "Taxa de Emissão de Partículas",
            difficulty: "easy",
            description: "Declare int taxaEmissao = 50;. Emita no Console: 'Taxa de Emissao: 50 particulas/s'.",
            validationRules: { requiredPatterns: ["int taxaEmissao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare taxaEmissao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int taxaEmissao = 50;
        Debug.Log("Taxa de Emissao: " + taxaEmissao + " particulas/s");
    }
}`,
            tests: [
                { input: "", expected: "Taxa de Emissao: 50 particulas/s", description: "Taxa de emissão" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int taxaEmissao, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Taxa de Emissao: 50 particulas/s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int taxaEmissao = 50;\n        Debug.Log(\"Taxa de Emissao: \" + taxaEmissao + \" particulas/s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int taxaEmissao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Taxa de Emissao: 50 particulas/s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_3",
            title: "Tempo de Vida das Partículas (Lifetime)",
            difficulty: "medium",
            description: "Declare float duracao = 2.5f;. Emita no Console: 'Tempo de Vida: 2.5s'.",
            validationRules: { requiredPatterns: ["float duracao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare duracao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float duracao = 2.5f;
        Debug.Log("Tempo de Vida: " + duracao + "s");
    }
}`,
            tests: [
                { input: "", expected: "Tempo de Vida: 2.5s", description: "Particle Lifetime" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float duracao, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Tempo de Vida: 2.5s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float duracao = 2.5f;\n        Debug.Log(\"Tempo de Vida: \" + duracao + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float duracao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Tempo de Vida: 2.5s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_4",
            title: "Efeito em Loop Contínuo",
            difficulty: "medium",
            description: "Declare bool estaEmLoop = true;. Se for verdadeiro, emita 'VFX em Execucao Continua'.",
            validationRules: { requiredPatterns: ["bool estaEmLoop","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se o efeito esta em loop
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaEmLoop = true;
        if (estaEmLoop)
        {
            Debug.Log("VFX em Execucao Continua");
        }
    }
}`,
            tests: [
                { input: "", expected: "VFX em Execucao Continua", description: "Looping VFX" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaEmLoop, if" },
                { level: "II", text: "A saída no console deve conter exatamente: VFX em Execucao Continua" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaEmLoop = true;\n        if (estaEmLoop)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaEmLoop","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "VFX em Execucao Continua";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
            title: "Interrupção do Sistema de Partículas (Stop)",
            difficulty: "medium",
            description: "Declare string statusVfx = 'VFX Stop: Emissao Encerrada';. Emita a mensagem com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusVfx","statusVfx","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusVfx e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusVfx = "VFX Stop: Emissao Encerrada";
        Debug.Log(statusVfx);
    }
}`,
            tests: [
                { input: "", expected: "VFX Stop: Emissao Encerrada", description: "Parada de partículas" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusVfx, statusVfx" },
                { level: "II", text: "A saída no console deve conter exatamente: VFX Stop: Emissao Encerrada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusVfx = \"VFX Stop: Emissao Encerrada\";\n        Debug.Log(statusVfx);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusVfx","statusVfx","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "VFX Stop: Emissao Encerrada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 25 — EFEITOS SONOROS 3D E ÁUDIO
// ═══════════════════════════════════════════════════════
{
    id: 25,
    artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 6 },
    title: "Efeitos Sonoros 3D e Áudio",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Sino Tridimensional",
    unlockIcon: "[SFX]",
    character: "kael",
    xpReward: 320,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Abrindo a Acústica Tridimensional. AudioSource, AudioListener e Atenuação Espacial ativados."
            },
            {
                    "type": "narrative",
                    "text": "Ecos de passos e o choque de lâminas reverberam nas paredes de pedra da masmorra. Kael Draven calibra as fontes sonoras espaciais."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "O som é metade da imersão de qualquer jogo! No Unity, o som é emitido por um **AudioSource** e captado pelos ouvidos virtuais do jogador no **AudioListener**."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Para efeitos rápidos de golpe, usamos <code>PlayOneShot()</code>, que permite múltiplos impactos simultâneos sem cortar o som anterior! E com o **Spatial Blend 3D** ajustado em 1.0f, o som atenua com a distância e respeita a direção de onde o monstro está vindo!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Controlar a distância máxima de audição (Max Distance) e loops para trilha sonora de fundo (BGM) completam o design acústico. Domine esses sistemas neste capítulo."
            }
    ],
    concept: {
        title: "ÁUDIO ESPACIAL NO UNITY: AUDIOSOURCE, PLAYONESHOT, 3D SPATIAL BLEND E ATENUAÇÃO",
        explanation: "O subsistema de áudio da Unity entrega posicionamento binaural e atenuação espacial:\n<ul>\n  <li><strong>Disparo com PlayOneShot:</strong> Executa um clipe de áudio uma única vez sem interromper outros sons em execução na mesma fonte (ex: <code>string som = \"Espada_Hit\";</code> emitindo <code>\"Audio Tocado: Espada_Hit\"</code>).</li>\n  <li><strong>Atenuação Espacial (Spatial Blend 3D):</strong> Varia de 0.0 (áudio 2D plano no fone) até 1.0f (áudio 3D imersivo completo, atenuado por distância e ângulo).</li>\n  <li><strong>Distância Máxima de Audição (Max Distance):</strong> Raio limite em metros a partir do qual o som se torna completamente inaudível (ex: se distância do ouvinte &lt;= 20m, o som é audível).</li>\n  <li><strong>Volume Master:</strong> Multiplicador de ganho geral de áudio (ex: <code>float volume = 0.8f;</code> emitindo <code>\"Volume Master: 80%\"</code>).</li>\n  <li><strong>Trilhas em Loop (BGM):</strong> Músicas de fundo e ambientes configuradas com a propriedade <code>loop = true</code> para execução contínua.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploAudio3D : MonoBehaviour
{
    void Start()
    {
        // 1. Reprodução de efeito sonoro único
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);

        // 2. Mixagem 3D completa (Spatial Blend)
        float espacialBlend = 1.0f;
        Debug.Log("Som 3D Completo: " + espacialBlend);

        // 3. Checagem de distância máxima audível
        float maxDist = 20.0f;
        float distOuvinte = 15.0f;
        if (distOuvinte <= maxDist)
        {
            Debug.Log("Som Audivel");
        }

        // 4. Volume master do mixer
        float volume = 0.8f;
        Debug.Log("Volume Master: 80%");

        // 5. Trilha de batalha em looping contínuo
        string musica = "Tema_Batalha";
        bool emLoop = true;
        if (emLoop)
        {
            Debug.Log("BGM em Loop: " + musica);
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerenciador de Áudio Espacial e Música de Fundo",
        code: `using UnityEngine;

public class AudioManager : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Audio Tocado: Espada_Hit");

        float blend = 1.0f;
        Debug.Log("Som 3D Completo: " + blend);

        float max = 20.0f;
        float dist = 15.0f;
        if (dist <= max) Debug.Log("Som Audivel");

        Debug.Log("Volume Master: 80%");

        bool loop = true;
        if (loop) Debug.Log("BGM em Loop: Tema_Batalha");
    }
}`,
        output: "Audio Tocado: Espada_Hit\nSom 3D Completo: 1\nSom Audivel\nVolume Master: 80%\nBGM em Loop: Tema_Batalha"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Efeitos Sonoros 3D e Áudio e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o som e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Efeitos Sonoros 3D e Áudio:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o som e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);
    }
}`,
                hint: "Audio Tocado: Espada_Hit"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_25_1",
            title: "Reprodução de Áudio com PlayOneShot",
            difficulty: "easy",
            description: "Simule o disparo de um som único de golpe: declare string som = 'Espada_Hit';. Emita no Console: 'Audio Tocado: Espada_Hit'.",
            validationRules: { requiredPatterns: ["som","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o som e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);
    }
}`,
            tests: [
                { input: "", expected: "Audio Tocado: Espada_Hit", description: "PlayOneShot áudio" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: som, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Audio Tocado: Espada_Hit" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string som = \"Espada_Hit\";\n        Debug.Log(\"Audio Tocado: \" + som);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["som","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Audio Tocado: Espada_Hit";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_25_2",
            title: "Atenuação de Volume Espacial (3D Blend)",
            difficulty: "easy",
            description: "Declare float espacialBlend = 1.0f;. Emita no Console: 'Som 3D Completo: 1'.",
            validationRules: { requiredPatterns: ["float espacialBlend","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare espacialBlend e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float espacialBlend = 1.0f;
        Debug.Log("Som 3D Completo: " + espacialBlend);
    }
}`,
            tests: [
                { input: "", expected: "Som 3D Completo: 1", description: "Spatial Blend 3D" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float espacialBlend, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Som 3D Completo: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float espacialBlend = 1.0f;\n        Debug.Log(\"Som 3D Completo: \" + espacialBlend);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float espacialBlend","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Som 3D Completo: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_25_3",
            title: "Distância Máxima de Audição (Max Distance)",
            difficulty: "medium",
            description: "Declare float maxDist = 20.0f; e a distância atual float distOuvinte = 15.0f;. Se distOuvinte <= maxDist, emita 'Som Audivel'.",
            validationRules: { requiredPatterns: ["float maxDist","float distOuvinte","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide se o som e audivel
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float maxDist = 20.0f;
        float distOuvinte = 15.0f;
        if (distOuvinte <= maxDist)
        {
            Debug.Log("Som Audivel");
        }
    }
}`,
            tests: [
                { input: "", expected: "Som Audivel", description: "Atenuação sonora por distância" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float maxDist, float distOuvinte" },
                { level: "II", text: "A saída no console deve conter exatamente: Som Audivel" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float maxDist = 20.0f;\n        float distOuvinte = 15.0f;\n        if (distOuvinte <= maxDist)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float maxDist","float distOuvinte","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Som Audivel";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_25_4",
            title: "Controle de Volume Geral",
            difficulty: "medium",
            description: "Declare float volume = 0.8f;. Emita no Console: 'Volume Master: 80%'.",
            validationRules: { requiredPatterns: ["float volume","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a porcentagem de volume e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float volume = 0.8f;
        int pct = (int)(volume * 100);
        Debug.Log("Volume Master: " + pct + "%");
    }
}`,
            tests: [
                { input: "", expected: "Volume Master: 80%", description: "Volume de áudio" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float volume, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Volume Master: 80%" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float volume = 0.8f;\n        int pct = (int)(volume * 100);\n        Debug.Log(\"Volume Master: \" + pct + \"%\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float volume","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Volume Master: 80%";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_25_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 6 },
            title: "Trilha Sonora em Loop",
            difficulty: "medium",
            description: "Declare string musica = 'Tema_Batalha'; e bool emLoop = true;. Se emLoop, emita 'BGM em Loop: Tema_Batalha'.",
            validationRules: { requiredPatterns: ["musica","bool emLoop","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se a musica esta em loop
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string musica = "Tema_Batalha";
        bool emLoop = true;
        if (emLoop)
        {
            Debug.Log("BGM em Loop: " + musica);
        }
    }
}`,
            tests: [
                { input: "", expected: "BGM em Loop: Tema_Batalha", description: "Loop musical" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: musica, bool emLoop" },
                { level: "II", text: "A saída no console deve conter exatamente: BGM em Loop: Tema_Batalha" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string musica = \"Tema_Batalha\";\n        bool emLoop = true;\n        if (emLoop)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["musica","bool emLoop","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "BGM em Loop: Tema_Batalha";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 26 — NAVMESH E IA DE PATRULHA NPC
// ═══════════════════════════════════════════════════════
{
    id: 26,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 6 },
    title: "NavMesh e IA de Patrulha NPC",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Bússola NavMesh",
    unlockIcon: "[NAV]",
    character: "orin",
    xpReward: 330,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando a Malha de Navegação Inteligente. NavMesh e Agentes de IA ativados."
            },
            {
                    "type": "narrative",
                    "text": "Uma malha azul translúcida assenta-se sobre o chão da masmorra, desviando automaticamente de fossos e pilares de pedra. Orin Vale observa sentinelas mecânicas patrulharem rotas predefinidas."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Fazer um monstro desviar de paredes manualmente seria uma loucura! O Unity fornece o **NavMesh**, uma malha de navegação assada na geometria do cenário onde o componente **NavMeshAgent** encontra o caminho mais curto usando o algoritmo A*!"
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "Basta chamar <code>agent.SetDestination(alvo)</code>! O agente calcula as curvas, respeita a velocidade máxima e para exatamente na distância configurada em <code>stoppingDistance</code>. E para patrulhar entre marcos, alternamos os waypoints com a fórmula cíclica <code>(indice + 1) % total</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Pausas para observação entre cada ponto de patrulha conferem naturalidade ao comportamento da inteligência artificial. Conclua as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "INTELIGÊNCIA ARTIFICIAL E NAVEGAÇÃO: NAVMESH, NAVMESHAGENT, STOPPING DISTANCE E WAYPOINTS",
        explanation: "O sistema de <code>NavMesh</code> do Unity gerencia a locomoção inteligente de NPCs pela cena:\n<ul>\n  <li><strong>Definição de Destino (<code>SetDestination</code>):</strong> Informa ao <code>NavMeshAgent</code> para onde navegar: <code>Vector3 destino = new Vector3(10, 0, 15);</code> emitindo <code>\"Destino NavMesh: (10, 0, 15)\"</code>.</li>\n  <li><strong>Velocidade de Navegação (<code>speed</code>):</strong> Velocidade máxima com que o agente percorre a malha de navegação (ex: <code>float velocidadeAgente = 3.5f;</code>).</li>\n  <li><strong>Distância de Parada (<code>stoppingDistance</code>):</strong> Tolerância em metros para que o NPC pare antes de trombar no jogador ou no alvo (ex: se distância restante &lt;= 1.0f, emite <code>\"NPC Chegou ao Destino\"</code>).</li>\n  <li><strong>Patrulha Cíclica Entre Waypoints:</strong> Alterna entre pontos de patrulha usando o operador de módulo: <code>int proximo = (indicePonto + 1) % totalPontos;</code> (ex: passar do ponto 0 para o ponto 1).</li>\n  <li><strong>Pausa de Observação:</strong> Temporizador que faz o agente aguardar alguns segundos no ponto antes de retomar o deslocamento (ex: <code>\"Aguardando no Ponto: 2s\"</code>).</li>\n</ul>",
        code: `using UnityEngine;
using UnityEngine.AI;

public class ExemploNavMesh : MonoBehaviour
{
    void Start()
    {
        // 1. Definição de coordenadas de destino
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");

        // 2. Velocidade de locomoção do agente
        float velocidadeAgente = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + velocidadeAgente);

        // 3. Checagem de stoppingDistance
        float distRestante = 0.8f;
        float stopDist = 1.0f;
        if (distRestante <= stopDist)
        {
            Debug.Log("NPC Chegou ao Destino");
        }

        // 4. Rotação cíclica de waypoints
        int indicePonto = 0;
        int totalPontos = 3;
        int proximo = (indicePonto + 1) % totalPontos;
        Debug.Log("Proximo Ponto: " + proximo);

        // 5. Tempo de espera no marco
        float tempoEspera = 2.0f;
        Debug.Log("Aguardando no Ponto: " + tempoEspera + "s");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Controlador de Patrulha de Sentinela",
        code: `using UnityEngine;

public class PatrulhaSentinela : MonoBehaviour
{
    void Start()
    {
        Vector3 dest = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + dest.x + ", " + dest.y + ", " + dest.z + ")");

        float vel = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + vel);

        float d = 0.8f;
        if (d <= 1.0f) Debug.Log("NPC Chegou ao Destino");

        int i = 0;
        int total = 3;
        Debug.Log("Proximo Ponto: " + ((i + 1) % total));

        Debug.Log("Aguardando no Ponto: 2s");
    }
}`,
        output: "Destino NavMesh: (10, 0, 15)\nVelocidade NavMeshAgent: 3.5\nNPC Chegou ao Destino\nProximo Ponto: 1\nAguardando no Ponto: 2s"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de NavMesh e IA de Patrulha NPC e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure destino e emita
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de NavMesh e IA de Patrulha NPC:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure destino e emita
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");
    }
}`,
                hint: "Destino NavMesh: (10, 0, 15)"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_26_1",
            title: "Definição de Destino com SetDestination",
            difficulty: "easy",
            description: "Simule o envio de um NPC para um destino: declare Vector3 destino = new Vector3(10, 0, 15);. Emita no Console: 'Destino NavMesh: (10, 0, 15)'.",
            validationRules: { requiredPatterns: ["new Vector3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure destino e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");
    }
}`,
            tests: [
                { input: "", expected: "Destino NavMesh: (10, 0, 15)", description: "NavMesh destino" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Destino NavMesh: (10, 0, 15)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 destino = new Vector3(10, 0, 15);\n        Debug.Log(\"Destino NavMesh: (\" + destino.x + \", \" + destino.y + \", \" + destino.z + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Destino NavMesh: (10, 0, 15)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_2",
            title: "Velocidade de Navegação do Agente",
            difficulty: "easy",
            description: "Declare float velocidadeAgente = 3.5f;. Emita no Console: 'Velocidade NavMeshAgent: 3.5'.",
            validationRules: { requiredPatterns: ["float velocidadeAgente","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare velocidadeAgente e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float velocidadeAgente = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + velocidadeAgente);
    }
}`,
            tests: [
                { input: "", expected: "Velocidade NavMeshAgent: 3.5", description: "NavMeshAgent speed" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float velocidadeAgente, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Velocidade NavMeshAgent: 3.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float velocidadeAgente = 3.5f;\n        Debug.Log(\"Velocidade NavMeshAgent: \" + velocidadeAgente);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float velocidadeAgente","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Velocidade NavMeshAgent: 3.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_3",
            title: "Distância de Parada (StoppingDistance)",
            difficulty: "medium",
            description: "Declare float distRestante = 0.8f; e float stopDist = 1.0f;. Se distRestante <= stopDist, emita 'NPC Chegou ao Destino'.",
            validationRules: { requiredPatterns: ["float distRestante","float stopDist","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide se o agente chegou
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float distRestante = 0.8f;
        float stopDist = 1.0f;
        if (distRestante <= stopDist)
        {
            Debug.Log("NPC Chegou ao Destino");
        }
    }
}`,
            tests: [
                { input: "", expected: "NPC Chegou ao Destino", description: "NavMesh stopping distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float distRestante, float stopDist" },
                { level: "II", text: "A saída no console deve conter exatamente: NPC Chegou ao Destino" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float distRestante = 0.8f;\n        float stopDist = 1.0f;\n        if (distRestante <= stopDist)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float distRestante","float stopDist","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "NPC Chegou ao Destino";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_4",
            title: "Patrulha Entre Pontos (Waypoints)",
            difficulty: "medium",
            description: "Declare int indicePonto = 0; e int totalPontos = 3;. Avance para o próximo índice com (indicePonto + 1) % totalPontos e emita 'Proximo Ponto: ' + proximo.",
            validationRules: { requiredPatterns: ["indicePonto","totalPontos","%","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Avance para o proximo waypoint
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int indicePonto = 0;
        int totalPontos = 3;
        int proximo = (indicePonto + 1) % totalPontos;
        Debug.Log("Proximo Ponto: " + proximo);
    }
}`,
            tests: [
                { input: "", expected: "Proximo Ponto: 1", description: "Alternância de waypoints" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: indicePonto, totalPontos" },
                { level: "II", text: "A saída no console deve conter exatamente: Proximo Ponto: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int indicePonto = 0;\n        int totalPontos = 3;\n        int proximo = (indicePonto + 1) % totalPontos;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["indicePonto","totalPontos","%","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Proximo Ponto: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 6 },
            title: "Pausa para Observação no Ponto",
            difficulty: "medium",
            description: "Declare float tempoEspera = 2.0f;. Emita no Console: 'Aguardando no Ponto: 2s'.",
            validationRules: { requiredPatterns: ["float tempoEspera","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tempoEspera e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoEspera = 2.0f;
        Debug.Log("Aguardando no Ponto: " + tempoEspera + "s");
    }
}`,
            tests: [
                { input: "", expected: "Aguardando no Ponto: 2s", description: "Espera de patrulha" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float tempoEspera, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Aguardando no Ponto: 2s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float tempoEspera = 2.0f;\n        Debug.Log(\"Aguardando no Ponto: \" + tempoEspera + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float tempoEspera","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Aguardando no Ponto: 2s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 27 — SHADERS BÁSICOS E MATERIAIS PBR
// ═══════════════════════════════════════════════════════
{
    id: 27,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 6 },
    title: "Shaders Básicos e Materiais PBR",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Shader Rúnico",
    unlockIcon: "[SHAD]",
    character: "arkan",
    xpReward: 340,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conectando aos Pipelines Gráficos da GPU. Materiais PBR e Shader Graph ativos."
            },
            {
                    "type": "narrative",
                    "text": "Superfícies de ouro polido, couro envelhecido e gemas luminescentes reagem realisticamente à luz. Arkan Velor ajusta propriedades físicas de materiais baseados em física real (PBR)."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Um shader é o programa que roda diretamente em cada pixel da placa de vídeo para calcular sua cor final! No modelo **PBR (Physically Based Rendering)**, usamos quatro canais sagrados: **Albedo** (a cor base pura), **Metallic** (se o material é condutor ou dielétrico), **Smoothness** (o polimento da reflexão) e **Emission** (luz própria que brilha no escuro)!"
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "ARTÍFICE",
                    "cssClass": "mira",
                    "text": "E para dar feedback dinâmico quando um inimigo leva um golpe, podemos trocar seu material em tempo de execução para um shader com brilho vermelho (Flash Damage)!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Compreender os parâmetros de materiais PBR capacita o desenvolvedor a criar gráficos de alta fidelidade visual. Complete as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "MATERIAIS PBR E SHADERS NO UNITY: ALBEDO, METALLIC, SMOOTHNESS E EMISSÃO",
        explanation: "Materiais PBR simulam como a luz interage com superfícies no mundo real:\n<ul>\n  <li><strong>Cor Albedo (Base Color):</strong> A cor difusa pura da superfície sem sombras embutidas (ex: <code>string corBase = \"Vermelho_Carmim\";</code> emitindo <code>\"Cor Albedo: Vermelho_Carmim\"</code>).</li>\n  <li><strong>Grau Metálico (<code>Metallic</code>):</strong> Flutuante de 0.0 (isolante como madeira ou pedra) a 1.0 (metal puro como ouro ou ferro) que define se os reflexos absorvem a cor do metal (ex: 0.9).</li>\n  <li><strong>Rugosidade e Suavidade (<code>Smoothness</code>):</strong> Define o micro-relevo da superfície. Quanto maior, mais nítido e espelhado é o reflexo da luz (ex: 0.75).</li>\n  <li><strong>Emissão de Luz Própria (<code>Emission</code>):</strong> Faz a superfície irradiar luz própria independente da iluminação ambiente (ex: <code>float intensidadeEmissao = 2.0f;</code> emitindo <code>\"Emissao Ativa: 2x\"</code>).</li>\n  <li><strong>Troca Dinâmica de Material:</strong> Alterna instâncias de material para efeitos de combate (ex: trocar de 'Padrao' para 'Dano_Flash' ao receber dano).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploShadersPBR : MonoBehaviour
{
    void Start()
    {
        // 1. Cor Albedo base
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);

        // 2. Grau metálico
        float metallic = 0.9f;
        Debug.Log("Grau Metalico: " + metallic);

        // 3. Suavidade de reflexo (Smoothness)
        float smoothness = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + smoothness);

        // 4. Emissão de luz radiante
        bool temEmissao = true;
        float intensidadeEmissao = 2.0f;
        if (temEmissao)
        {
            Debug.Log("Emissao Ativa: " + intensidadeEmissao + "x");
        }

        // 5. Troca dinâmica de material em dano
        string materialAtual = "Padrao";
        bool atingido = true;
        if (atingido)
        {
            materialAtual = "Dano_Flash";
            Debug.Log("Material: " + materialAtual);
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Ficha de Material PBR e Efeito de Dano",
        code: `using UnityEngine;

public class MaterialInspector : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Cor Albedo: Vermelho_Carmim");

        float m = 0.9f;
        Debug.Log("Grau Metalico: " + m);

        float s = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + s);

        bool emissao = true;
        if (emissao) Debug.Log("Emissao Ativa: 2x");

        string mat = "Dano_Flash";
        Debug.Log("Material: " + mat);
    }
}`,
        output: "Cor Albedo: Vermelho_Carmim\nGrau Metalico: 0.9\nSuavidade de Reflexo: 0.75\nEmissao Ativa: 2x\nMaterial: Dano_Flash"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Shaders Básicos e Materiais PBR e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare corBase e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Shaders Básicos e Materiais PBR:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare corBase e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);
    }
}`,
                hint: "Cor Albedo: Vermelho_Carmim"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_27_1",
            title: "Configuração de Cor Albedo PBR",
            difficulty: "easy",
            description: "Declare string corBase = 'Vermelho_Carmim';. Emita no Console: 'Cor Albedo: Vermelho_Carmim'.",
            validationRules: { requiredPatterns: ["corBase","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare corBase e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);
    }
}`,
            tests: [
                { input: "", expected: "Cor Albedo: Vermelho_Carmim", description: "Cor Albedo do shader" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: corBase, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Cor Albedo: Vermelho_Carmim" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string corBase = \"Vermelho_Carmim\";\n        Debug.Log(\"Cor Albedo: \" + corBase);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["corBase","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Cor Albedo: Vermelho_Carmim";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_2",
            title: "Grau Metálico (Metallic)",
            difficulty: "easy",
            description: "Declare float metallic = 0.9f;. Emita no Console: 'Grau Metalico: 0.9'.",
            validationRules: { requiredPatterns: ["float metallic","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare metallic e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float metallic = 0.9f;
        Debug.Log("Grau Metalico: " + metallic);
    }
}`,
            tests: [
                { input: "", expected: "Grau Metalico: 0.9", description: "Propriedade Metallic" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float metallic, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Grau Metalico: 0.9" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float metallic = 0.9f;\n        Debug.Log(\"Grau Metalico: \" + metallic);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float metallic","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Grau Metalico: 0.9";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_3",
            title: "Rugosidade e Suavidade (Smoothness)",
            difficulty: "medium",
            description: "Declare float smoothness = 0.75f;. Emita no Console: 'Suavidade de Reflexo: 0.75'.",
            validationRules: { requiredPatterns: ["float smoothness","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare smoothness e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float smoothness = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + smoothness);
    }
}`,
            tests: [
                { input: "", expected: "Suavidade de Reflexo: 0.75", description: "Propriedade Smoothness" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float smoothness, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Suavidade de Reflexo: 0.75" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float smoothness = 0.75f;\n        Debug.Log(\"Suavidade de Reflexo: \" + smoothness);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float smoothness","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Suavidade de Reflexo: 0.75";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_4",
            title: "Emissão de Luz Própria (Emission)",
            difficulty: "medium",
            description: "Declare bool temEmissao = true; e float intensidadeEmissao = 2.0f;. Se temEmissao, emita 'Emissao Ativa: 2x'.",
            validationRules: { requiredPatterns: ["bool temEmissao","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se ha emissao de luz
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temEmissao = true;
        float intensidadeEmissao = 2.0f;
        if (temEmissao)
        {
            Debug.Log("Emissao Ativa: " + intensidadeEmissao + "x");
        }
    }
}`,
            tests: [
                { input: "", expected: "Emissao Ativa: 2x", description: "Emission shader property" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool temEmissao, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Emissao Ativa: 2x" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool temEmissao = true;\n        float intensidadeEmissao = 2.0f;\n        if (temEmissao)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool temEmissao","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Emissao Ativa: 2x";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 6 },
            title: "Troca Dinâmica de Material",
            difficulty: "medium",
            description: "Declare string materialAtual = 'Padrao';. Quando atingido (bool atingido = true), troque materialAtual para 'Dano_Flash' e emita 'Material: ' + materialAtual.",
            validationRules: { requiredPatterns: ["materialAtual","bool atingido","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Troque o material em caso de dano
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string materialAtual = "Padrao";
        bool atingido = true;
        if (atingido)
        {
            materialAtual = "Dano_Flash";
        }
        Debug.Log("Material: " + materialAtual);
    }
}`,
            tests: [
                { input: "", expected: "Material: Dano_Flash", description: "Troca dinâmica de material" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: materialAtual, bool atingido" },
                { level: "II", text: "A saída no console deve conter exatamente: Material: Dano_Flash" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string materialAtual = \"Padrao\";\n        bool atingido = true;\n        if (atingido)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["materialAtual","bool atingido","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Material: Dano_Flash";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 28 — INSTANTIATE E DESTROY DINÂMICOS
// ═══════════════════════════════════════════════════════
{
    id: 28,
    artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 6 },
    title: "Instantiate e Destroy Dinâmicos",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Gerador Instantiate",
    unlockIcon: "[SPAWN]",
    character: "orin",
    xpReward: 350,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 9 — Avançado (Tópicos PTS). Matriz de instanciação e descarte dinâmico ativada."
            },
            {
                    "type": "narrative",
                    "text": "Orin Vale comanda o círculo de invocação de prefabs. Entidades surgem do nada, cumprem suas missões e desaparecem com temporizadores precisos."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "ARTÍFICE DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Em jogos dinâmicos, nem tudo pode estar colocado na cena desde o início: flechas, magias, itens de drop e novos monstros precisam nascer em tempo de execução usando **Instantiate()**!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "E quando o objeto cumpre seu propósito, usamos **Destroy()** para não sobrecarregar a memória. Podemos passar um temporizador de delay (como <code>Destroy(obj, 3.0f)</code>) para que uma explosão desapareça após 3 segundos, ou destruir imediatamente ao tocar no abismo!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Dominar a criação com posição e rotação específica e o controle de tempo de vida é a base do ciclo dinâmico de prefabs. Complete as atividades."
            }
    ],
    concept: {
        title: "CRIAÇÃO E DESTRUIÇÃO DINÂMICA: INSTANTIATE, DESTROY COM DELAY E CICLO DE PREFABS",
        explanation: "Gerenciar o nascimento e descarte de GameObjects em tempo de execução:\n<ul>\n  <li><strong>Criação com Instantiate:</strong> Clona um prefab na cena durante o jogo (ex: <code>string prefab = \"Projetil_Fogo\";</code> emitindo <code>\"Instantiate: Projetil_Fogo gerado\"</code>).</li>\n  <li><strong>Instantiate com Posição e Rotação:</strong> Define exatamente as coordenadas 3D de nascimento do objeto (ex: <code>Vector3 spawnPos = new Vector3(0, 1, 5);</code> emitindo <code>\"Spawn na Posicao: (0, 1, 5)\"</code>).</li>\n  <li><strong>Destruição com Temporizador (Delay):</strong> O método <code>Destroy(gameObject, delay)</code> programa a remoção da entidade após decorridos os segundos informados (ex: <code>float tempoVida = 3.0f;</code> emitindo <code>\"Objeto Destruido Apos: 3s\"</code>).</li>\n  <li><strong>Instanciação Sequencial em Laço:</strong> Gera ondas ou séries de objetos controladas por contadores (ex: criar instâncias de 1 a 3 sequencialmente).</li>\n  <li><strong>Destruição Imediata por Contato:</strong> Remove o GameObject da cena no momento em que colide com zonas fatais (ex: ao tocar no 'Abismo', executa <code>Destroy</code> imediato).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploInstantiateDestroy : MonoBehaviour
{
    void Start()
    {
        // 1. Criação dinâmica de entidade
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");

        // 2. Spawn em coordenadas específicas
        Vector3 spawnPos = new Vector3(0, 1, 5);
        Debug.Log("Spawn na Posicao: (" + spawnPos.x + ", " + spawnPos.y + ", " + spawnPos.z + ")");

        // 3. Destruição agendada por tempo de vida
        float tempoVida = 3.0f;
        Debug.Log("Objeto Destruido Apos: " + tempoVida + "s");

        // 4. Instanciação em lote
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Instancia #" + i + " criada");
        }

        // 5. Destruição imediata por colisor
        string colisor = "Abismo";
        if (colisor == "Abismo")
        {
            Debug.Log("Destroy: Entidade Removida da Cena");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerador e Limpador de Projéteis",
        code: `using UnityEngine;

public class SpawnDestroyManager : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Instantiate: Projetil_Fogo gerado");

        Vector3 pos = new Vector3(0, 1, 5);
        Debug.Log("Spawn na Posicao: (" + pos.x + ", " + pos.y + ", " + pos.z + ")");

        float vida = 3.0f;
        Debug.Log("Objeto Destruido Apos: " + vida + "s");

        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Instancia #" + i + " criada");
        }

        string zona = "Abismo";
        if (zona == "Abismo") Debug.Log("Destroy: Entidade Removida da Cena");
    }
}`,
        output: "Instantiate: Projetil_Fogo gerado\nSpawn na Posicao: (0, 1, 5)\nObjeto Destruido Apos: 3s\nInstancia #1 criada\nInstancia #2 criada\nInstancia #3 criada\nDestroy: Entidade Removida da Cena"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Instantiate e Destroy Dinâmicos e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie o prefab e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Instantiate e Destroy Dinâmicos:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie o prefab e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");
    }
}`,
                hint: "Instantiate: Projetil_Fogo gerado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_28_1",
            title: "Criação Dinâmica de Entidade",
            difficulty: "easy",
            description: "Simule o nascimento de um projétil na cena: declare string prefab = 'Projetil_Fogo';. Emita no Console: 'Instantiate: Projetil_Fogo gerado'.",
            validationRules: { requiredPatterns: ["prefab","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie o prefab e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");
    }
}`,
            tests: [
                { input: "", expected: "Instantiate: Projetil_Fogo gerado", description: "Instantiate dinâmico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: prefab, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Instantiate: Projetil_Fogo gerado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string prefab = \"Projetil_Fogo\";\n        Debug.Log(\"Instantiate: \" + prefab + \" gerado\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["prefab","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Instantiate: Projetil_Fogo gerado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_28_2",
            title: "Instantiate com Posição e Rotação",
            difficulty: "easy",
            description: "Declare Vector3 spawnPos = new Vector3(0, 1, 5);. Emita no Console: 'Spawn na Posicao: (0, 1, 5)'.",
            validationRules: { requiredPatterns: ["new Vector3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare spawnPos e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 spawnPos = new Vector3(0, 1, 5);
        Debug.Log("Spawn na Posicao: (" + spawnPos.x + ", " + spawnPos.y + ", " + spawnPos.z + ")");
    }
}`,
            tests: [
                { input: "", expected: "Spawn na Posicao: (0, 1, 5)", description: "Spawn com coordenadas" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Spawn na Posicao: (0, 1, 5)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 spawnPos = new Vector3(0, 1, 5);\n        Debug.Log(\"Spawn na Posicao: (\" + spawnPos.x + \", \" + spawnPos.y + \", \" + spawnPos.z + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Spawn na Posicao: (0, 1, 5)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_28_3",
            title: "Destruição com Temporizador (Delay)",
            difficulty: "medium",
            description: "Declare float tempoVida = 3.0f;. Emita no Console: 'Objeto Destruido Apos: 3s'.",
            validationRules: { requiredPatterns: ["float tempoVida","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tempoVida e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoVida = 3.0f;
        Debug.Log("Objeto Destruido Apos: " + tempoVida + "s");
    }
}`,
            tests: [
                { input: "", expected: "Objeto Destruido Apos: 3s", description: "Destroy com delay" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float tempoVida, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Objeto Destruido Apos: 3s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float tempoVida = 3.0f;\n        Debug.Log(\"Objeto Destruido Apos: \" + tempoVida + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float tempoVida","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Objeto Destruido Apos: 3s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_28_4",
            title: "Contagem de Objetos Instanciados",
            difficulty: "medium",
            description: "Use um laço for de 1 até 3 gerando mensagens: 'Instancia #' + i + ' criada'.",
            validationRules: { requiredPatterns: ["for","<=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie 3 instancias no laco for
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Instancia #" + i + " criada");
        }
    }
}`,
            tests: [
                { input: "", expected: "Instancia #1 criada\nInstancia #2 criada\nInstancia #3 criada", description: "Spawn múltiplo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, <=" },
                { level: "II", text: "A saída no console deve conter exatamente: Instancia #1 criada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Instancia #\" + i + \" criada\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","<=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Instancia #1 criada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_28_5",
            artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 6 },
            title: "Destruição Imediata ao Contato",
            difficulty: "medium",
            description: "Declare string colisor = 'Abismo';. Se colisor == 'Abismo', emita 'Destroy: Entidade Removida da Cena'.",
            validationRules: { requiredPatterns: ["colisor","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque o colisor e execute Destroy
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string colisor = "Abismo";
        if (colisor == "Abismo")
        {
            Debug.Log("Destroy: Entidade Removida da Cena");
        }
    }
}`,
            tests: [
                { input: "", expected: "Destroy: Entidade Removida da Cena", description: "Destroy imediato" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: colisor, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Destroy: Entidade Removida da Cena" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string colisor = \"Abismo\";\n        if (colisor == \"Abismo\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["colisor","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Destroy: Entidade Removida da Cena";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 29 — OBJECT POOLING & OTIMIZAÇÃO DE GC
// ═══════════════════════════════════════════════════════
{
    id: 29,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
    title: "Object Pooling & Otimização de GC",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Reservatório Pool",
    unlockIcon: "[POOL]",
    character: "lyra",
    xpReward: 360,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando o Padrão de Reutilização Contínua. Object Pooling e Controle de GC ativados."
            },
            {
                    "type": "narrative",
                    "text": "Lyra Nex organiza esteiras circulares de projéteis e partículas. Nenhum recurso é descartado: tudo o que cumpre sua missão é reciclado instantaneamente."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Chamar <code>Instantiate</code> e <code>Destroy</code> centenas de vezes por minuto é o maior erro de novatos! Isso aloca memória na heap e faz o temido **Garbage Collector (GC)** congelar o jogo com travamentos perceptíveis (stutters)."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "A solução profissional é o padrão **Object Pooling**! Pré-alocamos uma fila (<code>Queue&lt;GameObject&gt;</code>) com a capacidade necessária. Quando precisamos de uma bala, resgatamos com <code>Dequeue()</code> e ativamos. Quando ela atinge o alvo, apenas desativamos com <code>SetActive(false)</code> e devolvemos ao pool!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Com Object Pooling, o consumo de alocação de GC é zero bytes! Conclua as 5 atividades deste capítulo para dominar a reciclagem limpa de objetos."
            }
    ],
    concept: {
        title: "OBJECT POOLING: REUSO DE INSTÂNCIAS COM QUEUE, ZERO GC ALLOC E CONTROLE DE CAPACIDADE",
        explanation: "Object Pooling elimina quedas de FPS causadas por coletas periódicas do Garbage Collector:\n<ul>\n  <li><strong>Fila de Pooling (<code>Queue&lt;T&gt;</code>):</strong> Coleção do tipo Primeiro a Entrar, Primeiro a Sair (FIFO) usada para armazenar objetos em repouso: <code>Debug.Log(\"Pool Inicializado com Fila\");</code>.</li>\n  <li><strong>Resgate de Instância (<code>Dequeue</code>):</strong> Retira um objeto inativo da fila para uso imediato: <code>Debug.Log(\"Objeto Resgatado com Dequeue\");</code>.</li>\n  <li><strong>Zero Alocação de GC:</strong> Ao reutilizar instâncias já existentes, a alocação de bytes na memória gerenciada é nula (ex: <code>int gcAllocBytes = 0;</code> emitindo <code>\"Alocacao de GC Evitada: 0 bytes\"</code>).</li>\n  <li><strong>Devolução ao Pool (Desativação):</strong> Em vez de chamar <code>Destroy</code>, o objeto apenas tem seu estado alterado para <code>estaAtivo = false</code> e retorna ao pool (ex: <code>\"Objeto Devolvido ao Pool (Ativo: False)\"</code>).</li>\n  <li><strong>Capacidade Máxima do Pool:</strong> Limite total de unidades pré-alocadas para a cena (ex: <code>int capacidadeMaxima = 50;</code> emitindo <code>\"Capacidade do Pool: 50 unidades\"</code>).</li>\n</ul>",
        code: `using UnityEngine;
using System.Collections.Generic;

public class ExemploObjectPooling : MonoBehaviour
{
    void Start()
    {
        // 1. Inicialização do pool com Queue
        Debug.Log("Pool Inicializado com Fila");

        // 2. Resgate de elemento do pool
        Debug.Log("Objeto Resgatado com Dequeue");

        // 3. Eficiência de memória com zero alocação de GC
        int objetosInstanciados = 10;
        int gcAllocBytes = 0;
        Debug.Log("Alocacao de GC Evitada: " + gcAllocBytes + " bytes");

        // 4. Devolução e desativação
        bool estaAtivo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + estaAtivo + ")");

        // 5. Capacidade máxima configurada
        int capacidadeMaxima = 50;
        Debug.Log("Capacidade do Pool: " + capacidadeMaxima + " unidades");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Ciclo de Vida sem Coleta de Lixo",
        code: `using UnityEngine;

public class PoolReciclador : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Pool Inicializado com Fila");
        Debug.Log("Objeto Resgatado com Dequeue");

        int gc = 0;
        Debug.Log("Alocacao de GC Evitada: " + gc + " bytes");

        bool ativo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + ativo + ")");

        int cap = 50;
        Debug.Log("Capacidade do Pool: " + cap + " unidades");
    }
}`,
        output: "Pool Inicializado com Fila\nObjeto Resgatado com Dequeue\nAlocacao de GC Evitada: 0 bytes\nObjeto Devolvido ao Pool (Ativo: False)\nCapacidade do Pool: 50 unidades"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Object Pooling & Otimização de GC e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o pool com Queue e enfileire um item
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Object Pooling & Otimização de GC:",
                starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o pool com Queue e enfileire um item
    }
}`,
                solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_1");
        Debug.Log("Pool Criado com: " + pool.Count + " item");
    }
}`,
                hint: "Pool Criado com: 1 item"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_29_1",
            title: "Fila de Pooling com Queue",
            difficulty: "easy",
            description: "Crie uma fila Queue<string> pool = new Queue<string>();. Adicione 'Projetil_1' usando .Enqueue('Projetil_1') e emita 'Pool Criado com: ' + pool.Count + ' item'.",
            validationRules: { requiredPatterns: ["Queue<string> pool",".Enqueue(","pool.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o pool com Queue e enfileire um item
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_1");
        Debug.Log("Pool Criado com: " + pool.Count + " item");
    }
}`,
            tests: [
                { input: "", expected: "Pool Criado com: 1 item", description: "Fila de pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Queue<string> pool, .Enqueue(" },
                { level: "II", text: "A saída no console deve conter exatamente: Pool Criado com: 1 item" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_1\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool",".Enqueue(","pool.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pool Criado com: 1 item";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_2",
            title: "Resgate de Instância (Dequeue)",
            difficulty: "easy",
            description: "Adicione 'Projetil_A' e 'Projetil_B' na fila. Resgate o primeiro elemento com pool.Dequeue() e emita 'Item Reutilizado: ' + item.",
            validationRules: { requiredPatterns: ["Queue<string> pool",".Dequeue()","Debug.Log"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Enfileire 2 itens e desinfileire 1
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_A");
        pool.Enqueue("Projetil_B");
        string item = pool.Dequeue();
        Debug.Log("Item Reutilizado: " + item);
    }
}`,
            tests: [
                { input: "", expected: "Item Reutilizado: Projetil_A", description: "Dequeue do pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Queue<string> pool, .Dequeue()" },
                { level: "II", text: "A saída no console deve conter exatamente: Item Reutilizado: Projetil_A" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_A\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool",".Dequeue()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Item Reutilizado: Projetil_A";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_3",
            title: "Reutilização Sem Garbage Collection",
            difficulty: "medium",
            description: "Declare int objetosInstanciados = 10; e int gcAllocBytes = 0;. Emita no Console: 'Alocacao de GC Evitada: 0 bytes'.",
            validationRules: { requiredPatterns: ["gcAllocBytes","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare gcAllocBytes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int gcAllocBytes = 0;
        Debug.Log("Alocacao de GC Evitada: " + gcAllocBytes + " bytes");
    }
}`,
            tests: [
                { input: "", expected: "Alocacao de GC Evitada: 0 bytes", description: "Otimização de GC" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: gcAllocBytes, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Alocacao de GC Evitada: 0 bytes" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int gcAllocBytes = 0;\n        Debug.Log(\"Alocacao de GC Evitada: \" + gcAllocBytes + \" bytes\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["gcAllocBytes","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alocacao de GC Evitada: 0 bytes";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_4",
            title: "Devolução de Objeto ao Pool (Desativação)",
            difficulty: "medium",
            description: "Declare bool estaAtivo = false;. Emita no Console: 'Objeto Devolvido ao Pool (Ativo: False)'.",
            validationRules: { requiredPatterns: ["bool estaAtivo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure estaAtivo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaAtivo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + estaAtivo + ")");
    }
}`,
            tests: [
                { input: "", expected: "Objeto Devolvido ao Pool (Ativo: False)", description: "Desativação ao devolver ao pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaAtivo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Objeto Devolvido ao Pool (Ativo: False)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaAtivo = false;\n        Debug.Log(\"Objeto Devolvido ao Pool (Ativo: \" + estaAtivo + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaAtivo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Objeto Devolvido ao Pool (Ativo: False)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
            title: "Capacidade Máxima do Pool",
            difficulty: "medium",
            description: "Declare int capacidadeMaxima = 50;. Emita no Console: 'Capacidade do Pool: 50 unidades'.",
            validationRules: { requiredPatterns: ["int capacidadeMaxima","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare capacidadeMaxima e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int capacidadeMaxima = 50;
        Debug.Log("Capacidade do Pool: " + capacidadeMaxima + " unidades");
    }
}`,
            tests: [
                { input: "", expected: "Capacidade do Pool: 50 unidades", description: "Teto do pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int capacidadeMaxima, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Capacidade do Pool: 50 unidades" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int capacidadeMaxima = 50;\n        Debug.Log(\"Capacidade do Pool: \" + capacidadeMaxima + \" unidades\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int capacidadeMaxima","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Capacidade do Pool: 50 unidades";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 30 — SCRIPTABLEOBJECTS & ARQUITETURA MODULAR
// ═══════════════════════════════════════════════════════
{
    id: 30,
    artifactReward: { artifactId: "Ring_Draco", minStars: 5, maxStars: 6 },
    title: "ScriptableObjects & Arquitetura Modular",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Scriptable Cristal",
    unlockIcon: "[SO]",
    character: "elion",
    xpReward: 370,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Carregando a Arquitetura de Dados Modular. ScriptableObjects e Fichas Desacopladas ativos."
            },
            {
                    "type": "narrative",
                    "text": "Elion Raven manipula arquivos de dados que existem como assets puros no projeto, independentes de qualquer GameObject ou cena."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA & BIBLIOTECÁRIO",
                    "cssClass": "elion",
                    "text": "Nunca misture as fichas de atributos com a lógica dos monstros na cena! Se você tiver 500 Golems na fase, você não quer 500 cópias dos mesmos dados consumindo memória. Criamos **ScriptableObjects**!"
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Com a anotação <code>[CreateAssetMenu]</code>, criamos novas fichas de itens e inimigos com um clique no botão direito do editor! Centenas de instâncias na cena compartilham a mesma ficha central: se ajustarmos o dano base, todos os inimigos são balanceados simultaneamente!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "ScriptableObjects representam a melhor prática arquitetural para balanceamento de RPGs, tabelas de loot e custos de habilidades. Complete as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "SCRIPTABLEOBJECTS NO UNITY: DADOS DESACOPLADOS, [CREATEASSETMENU] E COMPARTILHAMENTO EFICIENTE",
        explanation: "<code>ScriptableObject</code> é uma classe de dados que não precisa estar anexada a GameObjects da cena:\n<ul>\n  <li><strong>Leitura de Atributos:</strong> Lê fichas de dados compartilhadas (ex: <code>string nomePoder = \"Meteoro\"; int custoMana = 40;</code> emitindo <code>\"Habilidade: Meteoro | Custo: 40 Mana\"</code>).</li>\n  <li><strong>Ficha de Dados Modular de Inimigos:</strong> Armazena parâmetros base fora da cena (ex: monstro 'Golem' com 500 de HP base).</li>\n  <li><strong>Compartilhamento entre Instâncias:</strong> Múltiplas entidades na cena apontam para a mesma referência na memória, consumindo fração do espaço (ex: dobrar o dano compartilhado de 25 resulta em <code>\"Dano Compartilhado: 50\"</code>).</li>\n  <li><strong>Menu de Criação de Assets (<code>[CreateAssetMenu]</code>):</strong> Expõe o arquivo no menu de criação de assets do editor Unity (ex: <code>\"Assets/Create/Cartas/Item\"</code>).</li>\n  <li><strong>Economia e Desconto Modular:</strong> Lógicas de cálculo sobre a ficha (ex: subtrair custo de 30 da mana disponível de 80 informando <code>\"Mana Restante: 50\"</code>).</li>\n</ul>",
        code: `using UnityEngine;

// Definição de ScriptableObject
[CreateAssetMenu(fileName = "NovaHabilidade", menuName = "Assets/Create/Cartas/Item")]
public class HabilidadeData : ScriptableObject
{
    public string nomePoder;
    public int custoMana;
    public int danoBase;
}

public class ExemploScriptableObjects : MonoBehaviour
{
    void Start()
    {
        // 1. Leitura de dados de habilidade
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");

        // 2. Ficha de monstro
        string tipoMonstro = "Golem";
        int hpBase = 500;
        Debug.Log("Monstro: " + tipoMonstro + " | HP: " + hpBase);

        // 3. Compartilhamento de dados
        int danoBase = 25;
        int danoDuplo = danoBase * 2;
        Debug.Log("Dano Compartilhado: " + danoDuplo);

        // 4. Menu do editor
        string caminhoMenu = "Assets/Create/Cartas/Item";
        Debug.Log("Menu Ativo: " + caminhoMenu);

        // 5. Cálculo com base nos dados
        int manaDisponivel = 80;
        int custo = 30;
        int restante = manaDisponivel - custo;
        Debug.Log("Mana Restante: " + restante);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Consumo e Compartilhamento de Fichas de Dados",
        code: `using UnityEngine;

public class AssetDataLoader : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Habilidade: Meteoro | Custo: 40 Mana");
        Debug.Log("Monstro: Golem | HP: 500");

        int dano = 25 * 2;
        Debug.Log("Dano Compartilhado: " + dano);

        Debug.Log("Menu Ativo: Assets/Create/Cartas/Item");

        int m = 80 - 30;
        Debug.Log("Mana Restante: " + m);
    }
}`,
        output: "Habilidade: Meteoro | Custo: 40 Mana\nMonstro: Golem | HP: 500\nDano Compartilhado: 50\nMenu Ativo: Assets/Create/Cartas/Item\nMana Restante: 50"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de ScriptableObjects & Arquitetura Modular e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os dados e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de ScriptableObjects & Arquitetura Modular:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os dados e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");
    }
}`,
                hint: "Habilidade: Meteoro | Custo: 40 Mana"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_30_1",
            title: "Leitura de Atributos do ScriptableObject",
            difficulty: "easy",
            description: "Simule a leitura de um arquivo de configuração: declare string nomePoder = 'Meteoro'; int custoMana = 40;. Emita: 'Habilidade: Meteoro | Custo: 40 Mana'.",
            validationRules: { requiredPatterns: ["nomePoder","custoMana","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os dados e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");
    }
}`,
            tests: [
                { input: "", expected: "Habilidade: Meteoro | Custo: 40 Mana", description: "Dados de ScriptableObject" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: nomePoder, custoMana" },
                { level: "II", text: "A saída no console deve conter exatamente: Habilidade: Meteoro | Custo: 40 Mana" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string nomePoder = \"Meteoro\";\n        int custoMana = 40;\n        Debug.Log(\"Habilidade: \" + nomePoder + \" | Custo: \" + custoMana + \" Mana\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["nomePoder","custoMana","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Habilidade: Meteoro | Custo: 40 Mana";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_30_2",
            title: "Ficha de Dados de Inimigo Modular",
            difficulty: "easy",
            description: "Declare string tipoMonstro = 'Golem'; int hpBase = 500;. Emita no Console: 'Monstro: Golem | HP: 500'.",
            validationRules: { requiredPatterns: ["tipoMonstro","hpBase","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os atributos e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tipoMonstro = "Golem";
        int hpBase = 500;
        Debug.Log("Monstro: " + tipoMonstro + " | HP: " + hpBase);
    }
}`,
            tests: [
                { input: "", expected: "Monstro: Golem | HP: 500", description: "Ficha de inimigo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tipoMonstro, hpBase" },
                { level: "II", text: "A saída no console deve conter exatamente: Monstro: Golem | HP: 500" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tipoMonstro = \"Golem\";\n        int hpBase = 500;\n        Debug.Log(\"Monstro: \" + tipoMonstro + \" | HP: \" + hpBase);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tipoMonstro","hpBase","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Monstro: Golem | HP: 500";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_30_3",
            title: "Compartilhamento de Dados Entre Instâncias",
            difficulty: "medium",
            description: "Simule duas instâncias lendo o mesmo danoBase = 25: calcule danoDuplo = danoBase * 2 e emita 'Dano Compartilhado: ' + danoDuplo.",
            validationRules: { requiredPatterns: ["danoBase","danoDuplo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o dano compartilhado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoBase = 25;
        int danoDuplo = danoBase * 2;
        Debug.Log("Dano Compartilhado: " + danoDuplo);
    }
}`,
            tests: [
                { input: "", expected: "Dano Compartilhado: 50", description: "Dados compartilhados" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: danoBase, danoDuplo" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Compartilhado: 50" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoBase = 25;\n        int danoDuplo = danoBase * 2;\n        Debug.Log(\"Dano Compartilhado: \" + danoDuplo);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["danoBase","danoDuplo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Compartilhado: 50";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_30_4",
            title: "Menu de Criação de Asset ([CreateAssetMenu])",
            difficulty: "medium",
            description: "Declare string caminhoMenu = 'Assets/Create/Cartas/Item';. Emita no Console: 'Menu Ativo: ' + caminhoMenu.",
            validationRules: { requiredPatterns: ["string caminhoMenu","caminhoMenu","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare caminhoMenu e emita o caminho do CreateAssetMenu
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string caminhoMenu = "Assets/Create/Cartas/Item";
        Debug.Log("Menu Ativo: " + caminhoMenu);
    }
}`,
            tests: [
                { input: "", expected: "Menu Ativo: Assets/Create/Cartas/Item", description: "CreateAssetMenu" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string caminhoMenu, caminhoMenu" },
                { level: "II", text: "A saída no console deve conter exatamente: Menu Ativo: Assets/Create/Cartas/Item" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string caminhoMenu = \"Assets/Create/Cartas/Item\";\n        Debug.Log(\"Menu Ativo: \" + caminhoMenu);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string caminhoMenu","caminhoMenu","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Menu Ativo: Assets/Create/Cartas/Item";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_30_5",
            artifactReward: { artifactId: "Ring_Draco", minStars: 5, maxStars: 6 },
            title: "Economia Modular de Custo de Habilidade",
            difficulty: "medium",
            description: "Declare int manaDisponivel = 80; int custo = 30;. Subtraia o custo e emita 'Mana Restante: ' + (manaDisponivel - custo).",
            validationRules: { requiredPatterns: ["manaDisponivel","custo","-","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Desconte a mana consumida
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int manaDisponivel = 80;
        int custo = 30;
        int restante = manaDisponivel - custo;
        Debug.Log("Mana Restante: " + restante);
    }
}`,
            tests: [
                { input: "", expected: "Mana Restante: 50", description: "Consumo de recurso modular" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: manaDisponivel, custo" },
                { level: "II", text: "A saída no console deve conter exatamente: Mana Restante: 50" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int manaDisponivel = 80;\n        int custo = 30;\n        int restante = manaDisponivel - custo;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["manaDisponivel","custo","-","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mana Restante: 50";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 31 — SAVE E LOAD COM PLAYERPREFS
// ═══════════════════════════════════════════════════════
{
    id: 31,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
    title: "Save e Load com PlayerPrefs",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Memória PlayerPrefs",
    unlockIcon: "[SAVE]",
    character: "mira",
    xpReward: 380,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conectando à Memória Não-Volátil do Dispositivo. Módulo de Persistência PlayerPrefs ativo."
            },
            {
                    "type": "narrative",
                    "text": "Mira Solenn grava números de pontuação, preferências de áudio e nomes de heróis em tábuas de cristal permanente."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Quando o jogador fecha o jogo e desliga o computador, a memória RAM é completamente apagada! Para salvar preferências simples como recordes, volume e apelido, o Unity oferece **PlayerPrefs**!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "O PlayerPrefs grava pares de chave e valor: <code>SetInt('HighScore', 2500)</code> para inteiros, <code>SetFloat('MasterVolume', 0.8f)</code> para decimais e <code>SetString()</code> para textos. Com <code>HasKey()</code> verificamos se o save existe antes de carregar, e com <code>PlayerPrefs.Save()</code> forçamos a gravação imediata no disco!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "PlayerPrefs é ideal para opções e pequenos registros. Complete as 5 atividades deste capítulo para dominar a persistência nativa."
            }
    ],
    concept: {
        title: "PERSISTÊNCIA SIMPLES COM PLAYERPREFS: SET/GET INT, FLOAT, STRING, HASKEY E SAVE",
        explanation: "<code>PlayerPrefs</code> grava dados leves de preferências no registro do sistema ou arquivos locais:\n<ul>\n  <li><strong>Gravando Inteiros (<code>SetInt</code> e <code>GetInt</code>):</strong> Armazena pontuações e fases (ex: <code>PlayerPrefs.SetInt(\"HighScore\", 2500);</code> e leitura com valor padrão: <code>Debug.Log(\"HighScore Salvo: \" + score);</code>).</li>\n  <li><strong>Gravando Decimais (<code>SetFloat</code> e <code>GetFloat</code>):</strong> Armazena configurações de volume, sensibilidade e sliders (ex: volume mestre em 0.8f).</li>\n  <li><strong>Gravando Strings (<code>SetString</code> e <code>GetString</code>):</strong> Armazena o nome do perfil do jogador (ex: <code>PlayerPrefs.SetString(\"NomePlayer\", \"Arkan\");</code>).</li>\n  <li><strong>Verificação de Chave Existente (<code>HasKey</code>):</strong> Retorna se uma determinada chave já foi salva anteriormente (ex: checar se 'TutorialVisto' existe; se não, emite <code>\"Iniciar Tutorial\"</code>).</li>\n  <li><strong>Forçando Gravação no Disco (<code>Save</code>):</strong> Escreve imediatamente os dados da memória para o disco físico com <code>PlayerPrefs.Save();</code>.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploPlayerPrefs : MonoBehaviour
{
    void Start()
    {
        // 1. Salvar e resgatar inteiro
        int score = 2500;
        Debug.Log("HighScore Salvo: " + score);

        // 2. Salvar e resgatar float
        float vol = 0.8f;
        Debug.Log("Volume: " + vol);

        // 3. Salvar e resgatar string
        string nome = "Arkan";
        Debug.Log("Heroi Registrado: " + nome);

        // 4. Verificação de chave existente (HasKey)
        bool existe = false;
        if (!existe)
        {
            Debug.Log("Iniciar Tutorial");
        }

        // 5. Gravação forçada
        Debug.Log("Dados Gravados com Sucesso");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Sistema de Configurações e Perfil com PlayerPrefs",
        code: `using UnityEngine;

public class SavePrefsManager : MonoBehaviour
{
    void Start()
    {
        int score = 2500;
        Debug.Log("HighScore Salvo: " + score);

        float vol = 0.8f;
        Debug.Log("Volume: " + vol);

        string nome = "Arkan";
        Debug.Log("Heroi Registrado: " + nome);

        bool existe = false;
        if (!existe) Debug.Log("Iniciar Tutorial");

        Debug.Log("Dados Gravados com Sucesso");
    }
}`,
        output: "HighScore Salvo: 2500\nVolume: 0.8\nHeroi Registrado: Arkan\nIniciar Tutorial\nDados Gravados com Sucesso"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Save e Load com PlayerPrefs e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere HighScore
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Save e Load com PlayerPrefs:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere HighScore
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetInt("HighScore", 2500);
        int score = PlayerPrefs.GetInt("HighScore", 0);
        Debug.Log("HighScore Salvo: " + score);
    }
}`,
                hint: "HighScore Salvo: 2500"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_31_1",
            title: "Salvando Pontuação com SetInt",
            difficulty: "easy",
            description: "Armazene a pontuação chamando PlayerPrefs.SetInt('HighScore', 2500);. Em seguida, leia com PlayerPrefs.GetInt('HighScore', 0); e exiba 'HighScore Salvo: ' + score.",
            validationRules: { requiredPatterns: ["PlayerPrefs.SetInt","PlayerPrefs.GetInt","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere HighScore
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetInt("HighScore", 2500);
        int score = PlayerPrefs.GetInt("HighScore", 0);
        Debug.Log("HighScore Salvo: " + score);
    }
}`,
            tests: [
                { input: "", expected: "HighScore Salvo: 2500", description: "PlayerPrefs SetInt/GetInt" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.SetInt, PlayerPrefs.GetInt" },
                { level: "II", text: "A saída no console deve conter exatamente: HighScore Salvo: 2500" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        PlayerPrefs.SetInt(\"HighScore\", 2500);\n        int score = PlayerPrefs.GetInt(\"HighScore\", 0);\n        Debug.Log(\"HighScore Salvo: \" + score);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.SetInt","PlayerPrefs.GetInt","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "HighScore Salvo: 2500";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_31_2",
            title: "Persistência de Volume Flutuante (SetFloat)",
            difficulty: "easy",
            description: "Salve o volume usando PlayerPrefs.SetFloat('MasterVolume', 0.8f);. Recupere com GetFloat e exiba 'Volume: ' + vol.",
            validationRules: { requiredPatterns: ["PlayerPrefs.SetFloat","PlayerPrefs.GetFloat","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere o volume
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetFloat("MasterVolume", 0.8f);
        float vol = PlayerPrefs.GetFloat("MasterVolume", 1.0f);
        Debug.Log("Volume: " + vol);
    }
}`,
            tests: [
                { input: "", expected: "Volume: 0.8", description: "PlayerPrefs SetFloat" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.SetFloat, PlayerPrefs.GetFloat" },
                { level: "II", text: "A saída no console deve conter exatamente: Volume: 0.8" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        PlayerPrefs.SetFloat(\"MasterVolume\", 0.8f);\n        float vol = PlayerPrefs.GetFloat(\"MasterVolume\", 1.0f);\n        Debug.Log(\"Volume: \" + vol);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.SetFloat","PlayerPrefs.GetFloat","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Volume: 0.8";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_31_3",
            title: "Persistência do Nome do Jogador (SetString)",
            difficulty: "medium",
            description: "Salve o nome com PlayerPrefs.SetString('NomePlayer', 'Arkan');. Recupere e emita 'Heroi Registrado: ' + nome.",
            validationRules: { requiredPatterns: ["PlayerPrefs.SetString","PlayerPrefs.GetString","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere o nome
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetString("NomePlayer", "Arkan");
        string nome = PlayerPrefs.GetString("NomePlayer", "Anonimo");
        Debug.Log("Heroi Registrado: " + nome);
    }
}`,
            tests: [
                { input: "", expected: "Heroi Registrado: Arkan", description: "PlayerPrefs SetString" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.SetString, PlayerPrefs.GetString" },
                { level: "II", text: "A saída no console deve conter exatamente: Heroi Registrado: Arkan" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        PlayerPrefs.SetString(\"NomePlayer\", \"Arkan\");\n        string nome = PlayerPrefs.GetString(\"NomePlayer\", \"Anonimo\");\n        Debug.Log(\"Heroi Registrado: \" + nome);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.SetString","PlayerPrefs.GetString","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Heroi Registrado: Arkan";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_31_4",
            title: "Verificação de Chave Existente (HasKey)",
            difficulty: "medium",
            description: "Verifique se a chave de tutorial existe: bool existe = PlayerPrefs.HasKey('TutorialVisto');. Se falso, emita 'Iniciar Tutorial'.",
            validationRules: { requiredPatterns: ["PlayerPrefs.HasKey","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque com HasKey
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool existe = PlayerPrefs.HasKey("TutorialVisto");
        if (!existe)
        {
            Debug.Log("Iniciar Tutorial");
        }
    }
}`,
            tests: [
                { input: "", expected: "Iniciar Tutorial", description: "PlayerPrefs HasKey" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.HasKey, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Iniciar Tutorial" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool existe = PlayerPrefs.HasKey(\"TutorialVisto\");\n        if (!existe)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.HasKey","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Iniciar Tutorial";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_31_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
            title: "Gravação Forçada no Disco (Save)",
            difficulty: "medium",
            description: "Após configurar dados, chame PlayerPrefs.Save(); e emita 'Dados Gravados com Sucesso'.",
            validationRules: { requiredPatterns: ["PlayerPrefs.Save()","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute PlayerPrefs.Save()
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.Save();
        Debug.Log("Dados Gravados com Sucesso");
    }
}`,
            tests: [
                { input: "", expected: "Dados Gravados com Sucesso", description: "PlayerPrefs Save" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.Save(), Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Dados Gravados com Sucesso" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        PlayerPrefs.Save();\n        Debug.Log(\"Dados Gravados com Sucesso\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.Save()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dados Gravados com Sucesso";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 32 — SAVE E LOAD COM JSON E SERIALIZAÇÃO
// ═══════════════════════════════════════════════════════
{
    id: 32,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 5, maxStars: 6 },
    title: "Save e Load com JSON e Serialização",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Registro JSON",
    unlockIcon: "[JSON]",
    character: "lyra",
    xpReward: 390,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando os Códices de Serialização Universal. JsonUtility e [System.Serializable] ativos."
            },
            {
                    "type": "narrative",
                    "text": "Lyra Nex transcreve árvores inteiras de objetos e inventários em cordões de texto estruturado em formato JSON. O estado do mundo torna-se portátil e perpétuo."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "PlayerPrefs é bom para um número solto, mas para salvar um RPG completo — com listas de itens, inventários complexos e histórico de missões — precisamos de **Serialização JSON**!"
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "A regra de ouro da Unity: qualquer classe ou struct que vá ser convertida em texto precisa ser decorada com <code>[System.Serializable]</code>! Em seguida, usamos <code>JsonUtility.ToJson()</code> para transformar a instância em texto e <code>FromJson()</code> para reconstruir o objeto perfeitamente!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Validar a integridade do arquivo antes de desserializar evita travamentos por saves corrompidos. Domine a serialização completa neste capítulo."
            }
    ],
    concept: {
        title: "SERIALIZAÇÃO COM JSONUTILITY NO UNITY: [SYSTEM.SERIALIZABLE], TOJSON E FROMJSON",
        explanation: "A serialização transforma estruturas complexas da memória em strings textuais JSON:\n<ul>\n  <li><strong>Serialização para JSON (<code>JsonUtility.ToJson</code>):</strong> Converte um objeto serializável em uma string JSON compacta (ex: <code>JsonUtility.ToJson(Vector3.one)</code> emitindo <code>\"Serializado com JsonUtility\"</code> ou gerando <code>'{\"fase\":3,\"moedas\":150}'</code>).</li>\n  <li><strong>Uso do JsonUtility.ToJson:</strong> Chamada oficial do motor para gerar a representação em texto.</li>\n  <li><strong>Desserialização e Resgate de Valores (<code>FromJson</code>):</strong> Reconstrói o objeto a partir da string JSON, permitindo ler propriedades salvas (ex: fase carregada 5 e vida 100 emitindo <code>\"Save Carregado: Fase 5 (Vida: 100)\"</code>).</li>\n  <li><strong>Anotação [System.Serializable]:</strong> Atributo obrigatório acima da declaração de classes personalizadas que indica ao motor que seus campos devem ser empacotados pela serialização.</li>\n  <li><strong>Integridade do Arquivo de Save:</strong> Verificação booleana (<code>bool saveValido = true</code>) que valida se os dados não foram corrompidos antes de restaurar o progresso do jogador.</li>\n</ul>",
        code: `using UnityEngine;

// Classe com anotação serializável
[System.Serializable]
public class DadosJogador
{
    public int fase = 3;
    public int moedas = 150;
}

public class ExemploJSON : MonoBehaviour
{
    void Start()
    {
        // 1. Objeto serializado para texto JSON
        DadosJogador dados = new DadosJogador();
        string json = "{"fase":3,"moedas":150}";
        Debug.Log("JSON: " + json);

        // 2. Uso do JsonUtility
        string vetorJson = JsonUtility.ToJson(Vector3.one);
        Debug.Log("Serializado com JsonUtility");

        // 3. Desserialização e extração de valores
        int faseCarregada = 5;
        int vidaCarregada = 100;
        Debug.Log("Save Carregado: Fase " + faseCarregada + " (Vida: " + vidaCarregada + ")");

        // 4. Marcação como serializável
        string statusSerial = "Estrutura Marcada como Serializavel";
        Debug.Log(statusSerial);

        // 5. Verificação de integridade
        bool saveValido = true;
        if (saveValido)
        {
            Debug.Log("Arquivo de Save Valido e Carregado");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Serializador e Desserializador de Save Game",
        code: `using UnityEngine;

public class JSONSaveManager : MonoBehaviour
{
    void Start()
    {
        Debug.Log("JSON: {"fase":3,"moedas":150}");
        Debug.Log("Serializado com JsonUtility");

        int f = 5;
        int v = 100;
        Debug.Log("Save Carregado: Fase " + f + " (Vida: " + v + ")");

        Debug.Log("Estrutura Marcada como Serializavel");

        bool valido = true;
        if (valido) Debug.Log("Arquivo de Save Valido e Carregado");
    }
}`,
        output: "JSON: {\"fase\":3,\"moedas\":150}\nSerializado com JsonUtility\nSave Carregado: Fase 5 (Vida: 100)\nEstrutura Marcada como Serializavel\nArquivo de Save Valido e Carregado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Save e Load com JSON e Serialização e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure a string json e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Save e Load com JSON e Serialização:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure a string json e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string json = "{\\"fase\\":3,\\"moedas\\":150}";
        Debug.Log("JSON: " + json);
    }
}`,
                hint: "JSON: {\"fase\":3,\"moedas\":150}"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_32_1",
            title: "Serialização de Objeto para JSON",
            difficulty: "easy",
            description: "Simule a serialização de dados de save: declare string json = '{\"fase\":3,\"moedas\":150}';. Emita no Console: 'JSON: ' + json.",
            validationRules: { requiredPatterns: ["json","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure a string json e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string json = "{\\"fase\\":3,\\"moedas\\":150}";
        Debug.Log("JSON: " + json);
    }
}`,
            tests: [
                { input: "", expected: "JSON: {\"fase\":3,\"moedas\":150}", description: "String JSON" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: json, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: JSON: {\"fase\":3,\"moedas\":150}" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string json = \"{\\\"fase\\\":3,\\\"moedas\\\":150}\";\n        Debug.Log(\"JSON: \" + json);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["json","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "JSON: {\"fase\":3,\"moedas\":150}";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_32_2",
            title: "Uso do JsonUtility.ToJson",
            difficulty: "easy",
            description: "Simule a conversão de um vetor em JSON: chame JsonUtility.ToJson(Vector3.one). Emita no Console: 'Serializado com JsonUtility'.",
            validationRules: { requiredPatterns: ["JsonUtility.ToJson","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use JsonUtility.ToJson
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string txt = JsonUtility.ToJson(Vector3.one);
        Debug.Log("Serializado com JsonUtility");
    }
}`,
            tests: [
                { input: "", expected: "Serializado com JsonUtility", description: "JsonUtility ToJson" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: JsonUtility.ToJson, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Serializado com JsonUtility" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string txt = JsonUtility.ToJson(Vector3.one);\n        Debug.Log(\"Serializado com JsonUtility\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["JsonUtility.ToJson","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Serializado com JsonUtility";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_32_3",
            title: "Desserialização e Resgate de Valores",
            difficulty: "medium",
            description: "Simule a extração de dados desserializados: declare int faseCarregada = 5; int vidaCarregada = 100;. Emita 'Save Carregado: Fase 5 (Vida: 100)'.",
            validationRules: { requiredPatterns: ["faseCarregada","vidaCarregada","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os dados carregados e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int faseCarregada = 5;
        int vidaCarregada = 100;
        Debug.Log("Save Carregado: Fase " + faseCarregada + " (Vida: " + vidaCarregada + ")");
    }
}`,
            tests: [
                { input: "", expected: "Save Carregado: Fase 5 (Vida: 100)", description: "Desserialização de save" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: faseCarregada, vidaCarregada" },
                { level: "II", text: "A saída no console deve conter exatamente: Save Carregado: Fase 5 (Vida: 100)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int faseCarregada = 5;\n        int vidaCarregada = 100;\n        Debug.Log(\"Save Carregado: Fase \" + faseCarregada + \" (Vida: \" + vidaCarregada + \")\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["faseCarregada","vidaCarregada","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Save Carregado: Fase 5 (Vida: 100)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_32_4",
            title: "Anotação [System.Serializable]",
            difficulty: "medium",
            description: "Declare string statusSerial = 'Estrutura Marcada como Serializavel';. Emita no Console o valor de statusSerial.",
            validationRules: { requiredPatterns: ["string statusSerial","statusSerial","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusSerial e emita o status de serializacao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusSerial = "Estrutura Marcada como Serializavel";
        Debug.Log(statusSerial);
    }
}`,
            tests: [
                { input: "", expected: "Estrutura Marcada como Serializavel", description: "System.Serializable" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusSerial, statusSerial" },
                { level: "II", text: "A saída no console deve conter exatamente: Estrutura Marcada como Serializavel" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusSerial = \"Estrutura Marcada como Serializavel\";\n        Debug.Log(statusSerial);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusSerial","statusSerial","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Estrutura Marcada como Serializavel";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_32_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 5, maxStars: 6 },
            title: "Integridade de Arquivo de Save",
            difficulty: "medium",
            description: "Declare bool saveValido = true;. Se for verdadeiro, emita 'Arquivo de Save Valido e Carregado'.",
            validationRules: { requiredPatterns: ["bool saveValido","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide o save e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool saveValido = true;
        if (saveValido)
        {
            Debug.Log("Arquivo de Save Valido e Carregado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Arquivo de Save Valido e Carregado", description: "Integridade do save" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool saveValido, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Arquivo de Save Valido e Carregado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool saveValido = true;\n        if (saveValido)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool saveValido","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Arquivo de Save Valido e Carregado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 33 — COROUTINES E FLUXO TEMPORAL
// ═══════════════════════════════════════════════════════
{
    id: 33,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 6 },
    title: "Coroutines e Fluxo Temporal",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Fita Coroutine",
    unlockIcon: "[CORO]",
    character: "orin",
    xpReward: 400,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conectando à Dimensão do Tempo Assíncrono. Coroutines e IEnumerators ativados."
            },
            {
                    "type": "narrative",
                    "text": "O fluxo do tempo desdobra-se em camadas paralelas. Orin Vale congela instantes temporais e programa ações que pausam e retomam com fluidez sem travar o jogo."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "ARTÍFICE DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Se você tentar fazer uma contagem de 3 segundos usando um loop comum com <code>Thread.Sleep</code>, o jogo inteiro congelará na tela! No Unity, operações com espera temporal usam **Coroutines** (corotinas) com retorno <code>IEnumerator</code>!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "A mágica está na expressão <code>yield return new WaitForSeconds(tempo)</code>! A função pausa sua execução no ponto exato, devolve o controle para a engine desenhar os próximos quadros e acorda automaticamente quando o tempo terminar!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Corotinas são iniciadas com <code>StartCoroutine()</code> e podem ser canceladas antecipadamente com <code>StopCoroutine()</code>. Domine o controle temporal assíncrono."
            }
    ],
    concept: {
        title: "COROUTINES NO UNITY: IENUMERATOR, YIELD RETURN, WAITFORSECONDS E CANCELAMENTO",
        explanation: "Coroutines permitem espalhar tarefas ao longo de múltiplos quadros sem bloquear a thread principal:\n<ul>\n  <li><strong>Execução com Atraso (Delay):</strong> Permite executar etapas separadas por intervalos de tempo sem interromper a renderização dos frames gráficos (ex: Passo 1 seguido do Passo 2).</li>\n  <li><strong>Tempo de Espera (<code>WaitForSeconds</code>):</strong> Instrução de rendição (yield) que suspende a corotina pela duração em segundos especificada: <code>float tempoEspera = 1.5f;</code> emitindo <code>\"Aguardando: 1.5 segundos\"</code>.</li>\n  <li><strong>Contagem Regressiva Assíncrona:</strong> Laço for decrementando (de 3 até 1) intercalado por waits simulando timers de lançamento: <code>\"Timer: \" + i</code> e ao final <code>\"Lancamento!\"</code>.</li>\n  <li><strong>Disparo com StartCoroutine:</strong> Método do <code>MonoBehaviour</code> que registra a corotina no scheduler do motor (ex: <code>\"StartCoroutine: Rotina Disparada\"</code>).</li>\n  <li><strong>Interrupção com StopCoroutine:</strong> Cancela uma corotina antes que termine, essencial quando o herói morre ou cancela uma ação (ex: <code>\"StopCoroutine: Execucao Interrompida\"</code>).</li>\n</ul>",
        code: `using UnityEngine;
using System.Collections;

public class ExemploCoroutines : MonoBehaviour
{
    void Start()
    {
        // 1. Passos sequenciais no tempo
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);

        // 2. Tempo de espera assíncrono
        float tempoEspera = 1.5f;
        Debug.Log("Aguardando: " + tempoEspera + " segundos");

        // 3. Contagem regressiva em corotina
        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");

        // 4. Disparo via StartCoroutine
        string statusCoro = "StartCoroutine: Rotina Disparada";
        Debug.Log(statusCoro);

        // 5. Interrupção controlada
        bool jogadorCancelou = true;
        if (jogadorCancelou)
        {
            Debug.Log("StopCoroutine: Execucao Interrompida");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Temporizador Assíncrono de Habilidade",
        code: `using UnityEngine;

public class TemporizadorMagico : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Passo 1: Iniciado");
        Debug.Log("Passo 2: Concluido");

        float espera = 1.5f;
        Debug.Log("Aguardando: " + espera + " segundos");

        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");

        Debug.Log("StartCoroutine: Rotina Disparada");

        bool cancel = true;
        if (cancel) Debug.Log("StopCoroutine: Execucao Interrompida");
    }
}`,
        output: "Passo 1: Iniciado\nPasso 2: Concluido\nAguardando: 1.5 segundos\nTimer: 3\nTimer: 2\nTimer: 1\nLancamento!\nStartCoroutine: Rotina Disparada\nStopCoroutine: Execucao Interrompida"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Coroutines e Fluxo Temporal e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare p1 e p2 e emita os dois passos da corotina
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Coroutines e Fluxo Temporal:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare p1 e p2 e emita os dois passos da corotina
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);
    }
}`,
                hint: "Passo 1: Iniciado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_33_1",
            title: "Execução Temporal com Delay",
            difficulty: "easy",
            description: "Declare string p1 = 'Passo 1: Iniciado'; e string p2 = 'Passo 2: Concluido';. Emita ambas em linhas separadas no Console.",
            validationRules: { requiredPatterns: ["string p1","string p2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare p1 e p2 e emita os dois passos da corotina
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);
    }
}`,
            tests: [
                { input: "", expected: "Passo 1: Iniciado\nPasso 2: Concluido", description: "Sequência temporal" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string p1, string p2" },
                { level: "II", text: "A saída no console deve conter exatamente: Passo 1: Iniciado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string p1 = \"Passo 1: Iniciado\";\n        string p2 = \"Passo 2: Concluido\";\n        Debug.Log(p1);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string p1","string p2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Passo 1: Iniciado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_2",
            title: "Tempo de Espera (WaitForSeconds)",
            difficulty: "easy",
            description: "Declare float tempoEspera = 1.5f;. Emita no Console: 'Aguardando: 1.5 segundos'.",
            validationRules: { requiredPatterns: ["float tempoEspera","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tempoEspera e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoEspera = 1.5f;
        Debug.Log("Aguardando: " + tempoEspera + " segundos");
    }
}`,
            tests: [
                { input: "", expected: "Aguardando: 1.5 segundos", description: "WaitForSeconds delay" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float tempoEspera, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Aguardando: 1.5 segundos" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float tempoEspera = 1.5f;\n        Debug.Log(\"Aguardando: \" + tempoEspera + \" segundos\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float tempoEspera","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Aguardando: 1.5 segundos";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_3",
            title: "Contagem Regressiva de Corotina",
            difficulty: "medium",
            description: "Use um for de 3 até 1 simulando um timer assíncrono: imprima 'Timer: ' + i e ao final 'Lancamento!'.",
            validationRules: { requiredPatterns: ["for","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Faca a contagem regressiva e o lancamento
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");
    }
}`,
            tests: [
                { input: "", expected: "Timer: 3\nTimer: 2\nTimer: 1\nLancamento!", description: "Contagem regressiva de corotina" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Timer: 3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 3; i >= 1; i--)\n        {\n            Debug.Log(\"Timer: \" + i);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Timer: 3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_4",
            title: "Disparo com StartCoroutine",
            difficulty: "medium",
            description: "Declare string statusCoro = 'StartCoroutine: Rotina Disparada';. Emita no Console o valor de statusCoro.",
            validationRules: { requiredPatterns: ["string statusCoro","statusCoro","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusCoro e emita a inicializacao da corotina
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusCoro = "StartCoroutine: Rotina Disparada";
        Debug.Log(statusCoro);
    }
}`,
            tests: [
                { input: "", expected: "StartCoroutine: Rotina Disparada", description: "StartCoroutine" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusCoro, statusCoro" },
                { level: "II", text: "A saída no console deve conter exatamente: StartCoroutine: Rotina Disparada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusCoro = \"StartCoroutine: Rotina Disparada\";\n        Debug.Log(statusCoro);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusCoro","statusCoro","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "StartCoroutine: Rotina Disparada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 6 },
            title: "Interrupção com StopCoroutine",
            difficulty: "medium",
            description: "Declare bool jogadorCancelou = true;. Se for verdadeiro, emita 'StopCoroutine: Execucao Interrompida'.",
            validationRules: { requiredPatterns: ["bool jogadorCancelou","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se o jogador cancelou a acao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool jogadorCancelou = true;
        if (jogadorCancelou)
        {
            Debug.Log("StopCoroutine: Execucao Interrompida");
        }
    }
}`,
            tests: [
                { input: "", expected: "StopCoroutine: Execucao Interrompida", description: "Interrupção de corotina" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool jogadorCancelou, if" },
                { level: "II", text: "A saída no console deve conter exatamente: StopCoroutine: Execucao Interrompida" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool jogadorCancelou = true;\n        if (jogadorCancelou)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool jogadorCancelou","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "StopCoroutine: Execucao Interrompida";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 34 — DELEGATES E EVENTS DESACOPLADOS
// ═══════════════════════════════════════════════════════
{
    id: 34,
    artifactReward: { artifactId: "Anklet_Lightning", minStars: 5, maxStars: 6 },
    title: "Delegates e Events Desacoplados",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Arauto de Eventos",
    unlockIcon: "[EVENT]",
    character: "elion",
    xpReward: 410,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Abrindo a Rede de Mensagens Desacopladas. Padrão Observer, Delegates e Events ativos."
            },
            {
                    "type": "narrative",
                    "text": "Ecos de sinos transmitem avisos por todas as torres da Guilda sem que os guardas precisem conhecer uns aos outros. Elion Raven conecta emissores e ouvintes arcanos."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA & ANALISTA",
                    "cssClass": "elion",
                    "text": "Se o seu script do Jogador precisar conhecer o script do HUD, o script de Áudio, o script de Conquistas e o script de Partículas, seu código se tornará um monólito espaguete impossível de manter! A solução sagrada são **Events e Delegates**!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "O jogador apenas grita ao mundo: <code>onPlayerDied?.Invoke()</code>! Ele não sabe quem está ouvindo. O HUD se inscreve para atualizar a barra, o sistema de som toca a derrota e o VFX solta fumaça — múltiplos ouvintes (Multicast) via <code>+=</code>! E no <code>OnDisable</code>, cancelamos a inscrição com <code>-=</code> para evitar vazamentos de memória!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "O padrão Observer desacoplado é o alicerce da arquitetura profissional de qualquer jogo em C#. Complete as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "DELEGATES E EVENTS NO UNITY: ACTION, PADRÃO OBSERVER, MULTICAST E CANCELAMENTO (-=)",
        explanation: "Delegates são referências para métodos, permitindo a arquitetura desacoplada de Eventos:\n<ul>\n  <li><strong>Declaração de Action:</strong> A estrutura <code>System.Action</code> encapsula métodos sem retorno: <code>Action onPlayerDied = () => Debug.Log(\"Evento: \" + status);</code>.</li>\n  <li><strong>Delegate com Parâmetros:</strong> Passa informações no disparo do evento, como valor do dano sofrido (ex: <code>Action onTakeDamage</code> transmitindo <code>\"Dano Sofrido: 45\"</code>).</li>\n  <li><strong>Desacoplamento de UI e Lógica:</strong> O modelo de jogo nunca manipula a UI diretamente; ele apenas dispara eventos que o HUD escuta (ex: <code>\"HUD Notificado: Barra Atualizada\"</code>).</li>\n  <li><strong>Múltiplos Ouvintes (Multicast Event):</strong> Vários sistemas podem se conectar ao mesmo evento com o operador <code>+=</code> (ex: Ouvinte 1 toca o som, Ouvinte 2 ativa a partícula).</li>\n  <li><strong>Cancelamento de Inscrição (<code>-=</code>):</strong> Sempre desinscrever ouvintes no <code>OnDisable</code> ou <code>OnDestroy</code> para evitar fugas de memória e referências mortas.</li>\n</ul>",
        code: `using UnityEngine;
using System;

public class ExemploEventsDelegates : MonoBehaviour
{
    void Start()
    {
        // 1. Declaração e disparo de Action simples
        string status = "Jogador Derrotado";
        Action onPlayerDied = () => Debug.Log("Evento: " + status);
        onPlayerDied();

        // 2. Delegate com parâmetro de dano
        int danoRecebido = 45;
        Action onTakeDamage = () => Debug.Log("Dano Sofrido: " + danoRecebido);
        onTakeDamage();

        // 3. Notificação desacoplada da UI
        string eventoUi = "HUD Notificado: Barra Atualizada";
        Debug.Log(eventoUi);

        // 4. Múltiplos ouvintes multicast
        string o1 = "Ouvinte 1: Som Tocado";
        string o2 = "Ouvinte 2: Particula Ativada";
        Debug.Log(o1);
        Debug.Log(o2);

        // 5. Desinscrição segura no OnDisable
        string statusUnsub = "Inscricao Removida com -= no OnDisable";
        Debug.Log(statusUnsub);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Sistema de Eventos de Combate Desacoplado",
        code: `using UnityEngine;
using System;

public class CombatEventManager : MonoBehaviour
{
    void Start()
    {
        string st = "Jogador Derrotado";
        Action died = () => Debug.Log("Evento: " + st);
        died();

        int d = 45;
        Action dmg = () => Debug.Log("Dano Sofrido: " + d);
        dmg();

        Debug.Log("HUD Notificado: Barra Atualizada");
        Debug.Log("Ouvinte 1: Som Tocado");
        Debug.Log("Ouvinte 2: Particula Ativada");
        Debug.Log("Inscricao Removida com -= no OnDisable");
    }
}`,
        output: "Evento: Jogador Derrotado\nDano Sofrido: 45\nHUD Notificado: Barra Atualizada\nOuvinte 1: Som Tocado\nOuvinte 2: Particula Ativada\nInscricao Removida com -= no OnDisable"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Delegates e Events Desacoplados e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare status, Action e execute-a
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Delegates e Events Desacoplados:",
                starterCode: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare status, Action e execute-a
    }
}`,
                solution: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string status = "Jogador Derrotado";
        Action onPlayerDied = () => Debug.Log("Evento: " + status);
        onPlayerDied();
    }
}`,
                hint: "Evento: Jogador Derrotado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_34_1",
            title: "Declaração e Disparo de Action",
            difficulty: "easy",
            description: "Declare string status = 'Jogador Derrotado'; e Action onPlayerDied = () => Debug.Log('Evento: ' + status);. Invoque onPlayerDied();.",
            validationRules: { requiredPatterns: ["string status","Action onPlayerDied","onPlayerDied()"] },
            starterCode: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare status, Action e execute-a
    }
}`,
            solution: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string status = "Jogador Derrotado";
        Action onPlayerDied = () => Debug.Log("Evento: " + status);
        onPlayerDied();
    }
}`,
            tests: [
                { input: "", expected: "Evento: Jogador Derrotado", description: "Action delegate simples" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string status, Action onPlayerDied" },
                { level: "II", text: "A saída no console deve conter exatamente: Evento: Jogador Derrotado" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        string status = \"Jogador Derrotado\";\n        Action onPlayerDied = () => Debug.Log(\"Evento: \" + status);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string status","Action onPlayerDied","onPlayerDied()"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Evento: Jogador Derrotado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_34_2",
            title: "Delegate com Parâmetro de Dano",
            difficulty: "easy",
            description: "Declare int danoRecebido = 45; e Action onTakeDamage = () => Debug.Log('Dano Sofrido: ' + danoRecebido);. Invoque onTakeDamage();.",
            validationRules: { requiredPatterns: ["int danoRecebido","onTakeDamage","onTakeDamage()"] },
            starterCode: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare danoRecebido e execute a Action
    }
}`,
            solution: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoRecebido = 45;
        Action onTakeDamage = () => Debug.Log("Dano Sofrido: " + danoRecebido);
        onTakeDamage();
    }
}`,
            tests: [
                { input: "", expected: "Dano Sofrido: 45", description: "Delegate com parâmetro" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int danoRecebido, onTakeDamage" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Sofrido: 45" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        int danoRecebido = 45;\n        Action onTakeDamage = () => Debug.Log(\"Dano Sofrido: \" + danoRecebido);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int danoRecebido","onTakeDamage","onTakeDamage()"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Sofrido: 45";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_34_3",
            title: "Desacoplamento de UI e Lógica",
            difficulty: "medium",
            description: "Declare string eventoUi = 'HUD Notificado: Barra Atualizada';. Emita no Console o valor de eventoUi.",
            validationRules: { requiredPatterns: ["string eventoUi","eventoUi","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare eventoUi e emita a notificacao do evento
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string eventoUi = "HUD Notificado: Barra Atualizada";
        Debug.Log(eventoUi);
    }
}`,
            tests: [
                { input: "", expected: "HUD Notificado: Barra Atualizada", description: "Evento desacoplado" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string eventoUi, eventoUi" },
                { level: "II", text: "A saída no console deve conter exatamente: HUD Notificado: Barra Atualizada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string eventoUi = \"HUD Notificado: Barra Atualizada\";\n        Debug.Log(eventoUi);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string eventoUi","eventoUi","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "HUD Notificado: Barra Atualizada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_34_4",
            title: "Múltiplos Ouvintes de Evento (Multicast)",
            difficulty: "medium",
            description: "Declare string o1 = 'Ouvinte 1: Som Tocado'; e string o2 = 'Ouvinte 2: Particula Ativada';. Emita ambas em linhas separadas.",
            validationRules: { requiredPatterns: ["string o1","string o2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o1 e o2 e emita as acoes dos dois ouvintes
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string o1 = "Ouvinte 1: Som Tocado";
        string o2 = "Ouvinte 2: Particula Ativada";
        Debug.Log(o1);
        Debug.Log(o2);
    }
}`,
            tests: [
                { input: "", expected: "Ouvinte 1: Som Tocado\nOuvinte 2: Particula Ativada", description: "Multicast event" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string o1, string o2" },
                { level: "II", text: "A saída no console deve conter exatamente: Ouvinte 1: Som Tocado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string o1 = \"Ouvinte 1: Som Tocado\";\n        string o2 = \"Ouvinte 2: Particula Ativada\";\n        Debug.Log(o1);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string o1","string o2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Ouvinte 1: Som Tocado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_34_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 5, maxStars: 6 },
            title: "Cancelamento de Inscrição (-=)",
            difficulty: "medium",
            description: "Declare string statusUnsub = 'Inscricao Removida com -= no OnDisable';. Emita no Console com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusUnsub","statusUnsub","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusUnsub e emita a remocao de inscricao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusUnsub = "Inscricao Removida com -= no OnDisable";
        Debug.Log(statusUnsub);
    }
}`,
            tests: [
                { input: "", expected: "Inscricao Removida com -= no OnDisable", description: "Unsubscribe de evento" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusUnsub, statusUnsub" },
                { level: "II", text: "A saída no console deve conter exatamente: Inscricao Removida com -= no OnDisable" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusUnsub = \"Inscricao Removida com -= no OnDisable\";\n        Debug.Log(statusUnsub);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusUnsub","statusUnsub","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Inscricao Removida com -= no OnDisable";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 35 — INTERFACES E CONTRATOS DE CÓDIGO
// ═══════════════════════════════════════════════════════
{
    id: 35,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 5, maxStars: 6 },
    title: "Interfaces e Contratos de Código",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Pacto de Interfaces",
    unlockIcon: "[ITF]",
    character: "kael",
    xpReward: 420,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando os Contratos Sagrados. Interfaces, Abstrações e Polimorfismo por Contrato ativos."
            },
            {
                    "type": "narrative",
                    "text": "Kael Draven analisa armas, baús e barris explosivos. Todos possuem naturezas distintas, mas alguns compartilham o mesmo dever sagrado de receber dano."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Em C#, uma classe só pode herdar de um único pai. Mas e se um Barril, um Inimigo e uma Parede Destrutível puderem tomar dano da mesma espada? Nós usamos uma **Interface**, como <code>IDamageable</code>!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Uma interface é um contrato solene que diz 'o que deve ser feito', sem ditar 'como fazer'. Ao golpear um alvo, checamos <code>if (alvo is IDamageable)</code>! E o mais brilhante: uma classe pode implementar múltiplas interfaces, como uma Porta que é ao mesmo tempo <code>IDamageable</code> e <code>IInteractable</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Contratos de interface mantêm o código desacoplado e escalável para dezenas de novos tipos de objetos. Complete as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "INTERFACES EM C#: CONTRATOS IDAMAGEABLE, IINTERACTABLE, OPERADOR 'IS' E MÚLTIPLAS INTERFACES",
        explanation: "Interfaces estabelecem contratos de funcionalidade sem vínculos de herança rígida:\n<ul>\n  <li><strong>Contrato de Dano (<code>IDamageable</code>):</strong> Garante que qualquer entidade que a implemente possua um método para sofrer dano (ex: <code>\"IDamageable: Tomou 30 de dano\"</code>).</li>\n  <li><strong>Contrato de Interação (<code>IInteractable</code>):</strong> Padroniza baús, portas e NPCs que reagem ao botão de interação (ex: <code>\"IInteractable: Interagiu com Bau\"</code>).</li>\n  <li><strong>Polimorfismo Baseado em Interfaces:</strong> Um array de <code>IDamageable</code> pode conter tanto um 'Inimigo' quanto um 'Barril', iterando e tratando ambos de forma unificada (ex: <code>\"Entidade Danificavel: \" + nome</code>).</li>\n  <li><strong>Checagem Segura com Operador 'is':</strong> Avalia se uma referência desconhecida cumpre determinado contrato antes de invocá-lo (ex: <code>if (alvo is IDamageable) Debug.Log(\"Alvo Implementa IDamageable\");</code>).</li>\n  <li><strong>Múltiplas Interfaces por Classe:</strong> Diferente da herança simples de classes, uma única classe pode implementar <code>IDamageable</code> E <code>IInteractable</code> simultaneamente (ex: uma porta destrutível e interagível).</li>\n</ul>",
        code: `using UnityEngine;

// Definição das interfaces
public interface IDamageable
{
    void TomarDano(int quantidade);
}

public interface IInteractable
{
    void Interagir();
}

public class ExemploInterfaces : MonoBehaviour
{
    void Start()
    {
        // 1. Contrato IDamageable
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");

        // 2. Contrato IInteractable
        string objeto = "Bau";
        Debug.Log("IInteractable: Interagiu com " + objeto);

        // 3. Polimorfismo com interfaces
        string[] entidades = { "Inimigo", "Barril" };
        for (int i = 0; i < entidades.Length; i++)
        {
            Debug.Log("Entidade Danificavel: " + entidades[i]);
        }

        // 4. Verificação de tipo com o operador is
        bool eDanificavel = true;
        if (eDanificavel)
        {
            Debug.Log("Alvo Implementa IDamageable");
        }

        // 5. Múltiplas interfaces em um objeto
        bool podeInteragir = true;
        bool podeDestruir = true;
        if (podeInteragir && podeDestruir)
        {
            Debug.Log("Porta: Interagivel e Destrutivel");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Contratos de Interação e Combate em Cena",
        code: `using UnityEngine;

public class ContratosManager : MonoBehaviour
{
    void Start()
    {
        int d = 30;
        Debug.Log("IDamageable: Tomou " + d + " de dano");

        string obj = "Bau";
        Debug.Log("IInteractable: Interagiu com " + obj);

        string[] targets = { "Inimigo", "Barril" };
        for (int i = 0; i < targets.Length; i++)
        {
            Debug.Log("Entidade Danificavel: " + targets[i]);
        }

        bool danificavel = true;
        if (danificavel) Debug.Log("Alvo Implementa IDamageable");

        Debug.Log("Porta: Interagivel e Destrutivel");
    }
}`,
        output: "IDamageable: Tomou 30 de dano\nIInteractable: Interagiu com Bau\nEntidade Danificavel: Inimigo\nEntidade Danificavel: Barril\nAlvo Implementa IDamageable\nPorta: Interagivel e Destrutivel"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Interfaces e Contratos de Código e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o dano e emita
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Interfaces e Contratos de Código:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o dano e emita
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");
    }
}`,
                hint: "IDamageable: Tomou 30 de dano"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_35_1",
            title: "Contrato de Dano (IDamageable)",
            difficulty: "easy",
            description: "Simule uma entidade implementando IDamageable: declare int dano = 30;. Emita no Console: 'IDamageable: Tomou 30 de dano'.",
            validationRules: { requiredPatterns: ["dano","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o dano e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");
    }
}`,
            tests: [
                { input: "", expected: "IDamageable: Tomou 30 de dano", description: "Interface IDamageable" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: dano, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: IDamageable: Tomou 30 de dano" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int dano = 30;\n        Debug.Log(\"IDamageable: Tomou \" + dano + \" de dano\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["dano","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "IDamageable: Tomou 30 de dano";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_35_2",
            title: "Contrato de Interação (IInteractable)",
            difficulty: "easy",
            description: "Simule a interação com um baú: declare string objeto = 'Bau';. Emita no Console: 'IInteractable: Interagiu com Bau'.",
            validationRules: { requiredPatterns: ["objeto","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare objeto e emita a interacao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string objeto = "Bau";
        Debug.Log("IInteractable: Interagiu com " + objeto);
    }
}`,
            tests: [
                { input: "", expected: "IInteractable: Interagiu com Bau", description: "Interface IInteractable" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: objeto, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: IInteractable: Interagiu com Bau" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string objeto = \"Bau\";\n        Debug.Log(\"IInteractable: Interagiu com \" + objeto);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["objeto","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "IInteractable: Interagiu com Bau";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_35_3",
            title: "Polimorfismo Baseado em Interfaces",
            difficulty: "medium",
            description: "Declare um array com 2 tipos que implementam IDamageable: 'Inimigo' e 'Barril'. Itere e emita para cada um: 'Entidade Danificavel: ' + nome.",
            validationRules: { requiredPatterns: ["string[] alvos","for","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Itere pelos alvos danificaveis
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] alvos = new string[] { "Inimigo", "Barril" };
        for (int i = 0; i < alvos.Length; i++)
        {
            Debug.Log("Entidade Danificavel: " + alvos[i]);
        }
    }
}`,
            tests: [
                { input: "", expected: "Entidade Danificavel: Inimigo\nEntidade Danificavel: Barril", description: "Coleção de interfaces" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] alvos, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Entidade Danificavel: Inimigo" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] alvos = new string[] { \"Inimigo\", \"Barril\" };\n        for (int i = 0; i < alvos.Length; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] alvos","for","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Entidade Danificavel: Inimigo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_35_4",
            title: "Checagem Segura com Operador 'is'",
            difficulty: "medium",
            description: "Declare bool eDanificavel = true;. Se for verdadeiro, emita 'Alvo Implementa IDamageable'.",
            validationRules: { requiredPatterns: ["bool eDanificavel","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se implementa a interface
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool eDanificavel = true;
        if (eDanificavel)
        {
            Debug.Log("Alvo Implementa IDamageable");
        }
    }
}`,
            tests: [
                { input: "", expected: "Alvo Implementa IDamageable", description: "Checagem de interface" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool eDanificavel, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Alvo Implementa IDamageable" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool eDanificavel = true;\n        if (eDanificavel)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool eDanificavel","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alvo Implementa IDamageable";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_35_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 5, maxStars: 6 },
            title: "Múltiplas Interfaces em uma Classe",
            difficulty: "medium",
            description: "Uma porta pode ser Danificável e Interagível: declare bool podeInteragir = true; bool podeDestruir = true;. Emita 'Porta: Interagivel e Destrutivel'.",
            validationRules: { requiredPatterns: ["bool podeInteragir","bool podeDestruir","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os estados e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool podeInteragir = true;
        bool podeDestruir = true;
        Debug.Log("Porta: Interagivel e Destrutivel");
    }
}`,
            tests: [
                { input: "", expected: "Porta: Interagivel e Destrutivel", description: "Múltiplas interfaces" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool podeInteragir, bool podeDestruir" },
                { level: "II", text: "A saída no console deve conter exatamente: Porta: Interagivel e Destrutivel" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool podeInteragir = true;\n        bool podeDestruir = true;\n        Debug.Log(\"Porta: Interagivel e Destrutivel\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool podeInteragir","bool podeDestruir","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Porta: Interagivel e Destrutivel";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 36 — TRATAMENTO DE EXCEÇÕES COM TRY/CATCH
// ═══════════════════════════════════════════════════════
{
    id: 36,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 5, maxStars: 6 },
    title: "Tratamento de Exceções com Try/Catch",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Escudo TryCatch",
    unlockIcon: "[TRY]",
    character: "mira",
    xpReward: 430,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando as Barricadas Defensivas de Código. Tratamento de Exceções e Resiliência ativos."
            },
            {
                    "type": "narrative",
                    "text": "Mira Solenn ergue proteções prismáticas contra anomalias lógicas. Se uma operação falhar no abismo da execução, o jogo resiste e não fecha para o jogador."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Em ambiente de produção, um jogo não pode simplesmente fechar sozinho ou quebrar a tela quando um arquivo de save estiver ausente ou ocorrer uma divisão por zero! Nós protegemos trechos críticos com blocos **Try / Catch**!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "No bloco <code>try</code>, tentamos a operação arriscada; no bloco <code>catch</code>, capturamos a exceção com segurança e emitimos um alerta sem quebrar o fluxo. E o bloco <code>finally</code> garante que arquivos sejam fechados e conexões liberadas, mesmo havendo erro!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Prevenções contra <code>DivideByZeroException</code>, checagens defensivas contra <code>NullReferenceException</code> e validações com <code>throw</code> garantem a robustez máxima do código."
            }
    ],
    concept: {
        title: "TRATAMENTO DE EXCEÇÕES EM C#: TRY, CATCH, FINALLY, PREVENÇÃO DE NULOS E LANÇAMENTO DE ERROS",
        explanation: "Tratamento de exceções previne que falhas inesperadas derrubem a aplicação:\n<ul>\n  <li><strong>Estrutura Try / Catch:</strong> Isola a execução de códigos suscetíveis a falhas e captura o erro sem travar a thread principal (ex: <code>\"Processamento Seguro: 100\"</code>).</li>\n  <li><strong>Prevenção de Divisão por Zero:</strong> Validação condicional contra divisores nulos antes de realizar a operação (ex: se divisor == 0, emite <code>\"Aviso: Divisao por Zero Evitada!\"</code>).</li>\n  <li><strong>Tratamento Defensivo contra Nulos:</strong> Verifica se uma referência a componente existe antes de acessar suas propriedades, evitando o clássico <code>NullReferenceException</code>.</li>\n  <li><strong>Bloco Finally:</strong> Bloco garantido de execução incondicional ao término do try/catch, essencial para fechar arquivos abertos e liberar conexões (ex: <code>\"Bloco Finally: Arquivo Fechado\"</code>).</li>\n  <li><strong>Lançamento de Erro Personalizado (throw):</strong> Interrompe fluxos ilegais quando requisitos mínimos de jogo não são atendidos (ex: nível de jogador insuficiente para entrar na masmorra).</li>\n</ul>",
        code: `using UnityEngine;
using System;

public class ExemploTratamentoExcecoes : MonoBehaviour
{
    void Start()
    {
        // 1. Processamento seguro com try/catch
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch (Exception e)
        {
            Debug.Log("Erro Capturado: " + e.Message);
        }

        // 2. Prevenção de divisão por zero
        int divisor = 0;
        if (divisor == 0)
        {
            Debug.Log("Aviso: Divisao por Zero Evitada!");
        }

        // 3. Checagem defensiva de componente nulo
        bool componenteExiste = false;
        if (!componenteExiste)
        {
            Debug.Log("Erro Evitado: Componente Nulo");
        }

        // 4. Bloco Finally de limpeza
        string statusLimpeza = "Bloco Finally: Arquivo Fechado";
        Debug.Log(statusLimpeza);

        // 5. Validação de nível e disparo controlado
        int nivelRequerido = 50;
        int nivelPlayer = 20;
        if (nivelPlayer < nivelRequerido)
        {
            Debug.Log("Excecao: Nivel Insuficiente para Entrar");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Módulo Defensivo de Execução Segura",
        code: `using UnityEngine;
using System;

public class ResilienciaManager : MonoBehaviour
{
    void Start()
    {
        try
        {
            int v = 100;
            Debug.Log("Processamento Seguro: " + v);
        }
        catch (Exception)
        {
        }

        int div = 0;
        if (div == 0) Debug.Log("Aviso: Divisao por Zero Evitada!");

        bool comp = false;
        if (!comp) Debug.Log("Erro Evitado: Componente Nulo");

        Debug.Log("Bloco Finally: Arquivo Fechado");

        int req = 50;
        int ply = 20;
        if (ply < req) Debug.Log("Excecao: Nivel Insuficiente para Entrar");
    }
}`,
        output: "Processamento Seguro: 100\nAviso: Divisao por Zero Evitada!\nErro Evitado: Componente Nulo\nBloco Finally: Arquivo Fechado\nExcecao: Nivel Insuficiente para Entrar"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Tratamento de Exceções com Try/Catch e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use try/catch e emita o valor processado
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Tratamento de Exceções com Try/Catch:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use try/catch e emita o valor processado
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch
        {
            Debug.Log("Erro capturado");
        }
    }
}`,
                hint: "Processamento Seguro: 100"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_36_1",
            title: "Tratamento de Exceção Simples com Try/Catch",
            difficulty: "easy",
            description: "Utilize uma estrutura try/catch: no bloco try, execute int valor = 100; e emita 'Processamento Seguro: ' + valor.",
            validationRules: { requiredPatterns: ["try","catch","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use try/catch e emita o valor processado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch
        {
            Debug.Log("Erro capturado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Processamento Seguro: 100", description: "Try/catch básico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: try, catch" },
                { level: "II", text: "A saída no console deve conter exatamente: Processamento Seguro: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        try\n        {\n            int valor = 100;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["try","catch","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Processamento Seguro: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_2",
            title: "Prevenção de Divisão por Zero",
            difficulty: "easy",
            description: "Declare int divisor = 0;. Se divisor == 0, emita 'Aviso: Divisao por Zero Evitada!', senão divida.",
            validationRules: { requiredPatterns: ["int divisor","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide divisor antes de calcular
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int divisor = 0;
        if (divisor == 0)
        {
            Debug.Log("Aviso: Divisao por Zero Evitada!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Aviso: Divisao por Zero Evitada!", description: "Prevenção de divisão por zero" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int divisor, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Aviso: Divisao por Zero Evitada!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int divisor = 0;\n        if (divisor == 0)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int divisor","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Aviso: Divisao por Zero Evitada!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_3",
            title: "Tratamento de NullReferenceException",
            difficulty: "medium",
            description: "Simule a checagem defensiva de componente nulo: declare bool componenteExiste = false;. Se não existir, emita 'Erro Evitado: Componente Nulo'.",
            validationRules: { requiredPatterns: ["bool componenteExiste","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se o componente e nulo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool componenteExiste = false;
        if (!componenteExiste)
        {
            Debug.Log("Erro Evitado: Componente Nulo");
        }
    }
}`,
            tests: [
                { input: "", expected: "Erro Evitado: Componente Nulo", description: "Defensive null check" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool componenteExiste, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Erro Evitado: Componente Nulo" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool componenteExiste = false;\n        if (!componenteExiste)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool componenteExiste","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Erro Evitado: Componente Nulo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_4",
            title: "Bloco Finally de Limpeza",
            difficulty: "medium",
            description: "Declare string statusLimpeza = 'Bloco Finally: Arquivo Fechado';. Emita a mensagem com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusLimpeza","statusLimpeza","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusLimpeza e emita a finalizacao do bloco
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusLimpeza = "Bloco Finally: Arquivo Fechado";
        Debug.Log(statusLimpeza);
    }
}`,
            tests: [
                { input: "", expected: "Bloco Finally: Arquivo Fechado", description: "Bloco finally" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusLimpeza, statusLimpeza" },
                { level: "II", text: "A saída no console deve conter exatamente: Bloco Finally: Arquivo Fechado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusLimpeza = \"Bloco Finally: Arquivo Fechado\";\n        Debug.Log(statusLimpeza);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusLimpeza","statusLimpeza","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Bloco Finally: Arquivo Fechado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 5, maxStars: 6 },
            title: "Lançamento de Erro Personalizado (Throw)",
            difficulty: "medium",
            description: "Declare int nivelRequerido = 50; int nivelPlayer = 20;. Se nivelPlayer < nivelRequerido, emita 'Excecao: Nivel Insuficiente para Entrar'.",
            validationRules: { requiredPatterns: ["nivelRequerido","nivelPlayer","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide o nivel e lance a mensagem
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivelRequerido = 50;
        int nivelPlayer = 20;
        if (nivelPlayer < nivelRequerido)
        {
            Debug.Log("Excecao: Nivel Insuficiente para Entrar");
        }
    }
}`,
            tests: [
                { input: "", expected: "Excecao: Nivel Insuficiente para Entrar", description: "Validação de exceção de regra de negócio" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: nivelRequerido, nivelPlayer" },
                { level: "II", text: "A saída no console deve conter exatamente: Excecao: Nivel Insuficiente para Entrar" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int nivelRequerido = 50;\n        int nivelPlayer = 20;\n        if (nivelPlayer < nivelRequerido)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["nivelRequerido","nivelPlayer","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Excecao: Nivel Insuficiente para Entrar";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 37 — OTIMIZAÇÃO, PROFILING E DRAW CALLS
// ═══════════════════════════════════════════════════════
{
    id: 37,
    artifactReward: { artifactId: "Ring_Oroborus", minStars: 5, maxStars: 6 },
    title: "Otimização, Profiling e Draw Calls",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Códice Supremo da Engine",
    unlockIcon: "[OPT]",
    character: "arkan",
    xpReward: 450,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando o Ápice da Engenharia de Jogos. Profiling, Batching, Occlusion Culling e LODs ativados."
            },
            {
                    "type": "narrative",
                    "text": "O santuário ressoa em sua máxima capacidade computacional. Arkan Velor avalia o Profiler do Unity: a taxa de quadros é sólida como rocha e os draw calls despencam."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Chegamos ao último capítulo da Dimensão C#, Codemancer! Qualquer um pode programar um jogo que rode a 60 FPS com 5 objetos na tela. O verdadeiro Engenheiro de Jogos é aquele cujo mundo colossal, com milhares de entidades, roda fluido e estável em qualquer máquina!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Dominamos as quatro técnicas de ouro: **Batching** para agrupar 120 draw calls em apenas 25; **Occlusion Culling** para nunca renderizar o que está atrás de paredes; **LOD Groups** para reduzir a complexidade da malha quando a câmera está distante; e travamento de taxa de quadros estável com <code>Application.targetFrameRate</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Ao concluir estas 5 atividades finais, você terá dominado a teoria, os exemplos e a prática completa dos 38 capítulos de C# e Unity 6.5. O Santuário da GuildCode saúda sua maestria dimensional!"
            }
    ],
    concept: {
        title: "OTIMIZAÇÃO PROFISSIONAL NO UNITY: DRAW CALLS, BATCHING, OCCLUSION CULLING, LOD GROUPS E TARGETFRAMERATE",
        explanation: "A otimização transforma uma simulação pesada em um jogo leve, rápido e com framerate cravado:\n<ul>\n  <li><strong>Redução de Draw Calls com Batching:</strong> A CPU envia ordens de desenho (draw calls) para a GPU. Agrupar múltiplos objetos estáticos ou dinâmicos reduz as chamadas drasticamente (ex: de 120 para 25 chamadas).</li>\n  <li><strong>Ocultamento por Oclusão (Occlusion Culling):</strong> Desliga a renderização de qualquer geometria que esteja encoberta por outras paredes ou montanhas na visão da câmera (ex: renderizar apenas 150 de 1000 objetos na cena).</li>\n  <li><strong>Níveis de Detalhe (LOD Groups):</strong> Substitui malhas altamente detalhadas (LOD0) por malhas simplificadas (LOD1 e LOD2) à medida que o objeto se afasta da câmera (ex: a mais de 50 metros, ativa LOD2 baixo).</li>\n  <li><strong>Estabilidade de Taxa de Quadros (<code>Application.targetFrameRate</code>):</strong> Trava o framerate alvo (ex: 60 FPS) para evitar oscilações bruscas e aquecimento desnecessário de hardware.</li>\n  <li><strong>Monitoramento no Unity Profiler:</strong> Inspeciona a alocação de memória e tempo de CPU por quadro (ex: medir memória gerenciada em 450.5 MB).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploOtimizacao : MonoBehaviour
{
    void Start()
    {
        // 1. Otimização de draw calls via batching
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);

        // 2. Occlusion Culling (renderização apenas do visível)
        int objetosNaCena = 1000;
        int objetosRenderizados = 150;
        Debug.Log("Renderizados com Oclusao: " + objetosRenderizados + "/" + objetosNaCena);

        // 3. Nível de Detalhe (LOD Group) por distância
        float distanciaCamera = 60.0f;
        string lod = "LOD0 (Alto)";
        if (distanciaCamera >= 50.0f)
        {
            lod = "LOD2 (Baixo)";
        }
        Debug.Log("Malha Ativa: " + lod);

        // 4. Trava de taxa de quadros (targetFrameRate)
        int targetFps = 60;
        Debug.Log("Trava de FPS: " + targetFps + " FPS");

        // 5. Telemetria de memória no Profiler
        float memoriaUsadaMB = 450.5f;
        Debug.Log("Memoria Alocada: " + memoriaUsadaMB + " MB");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Painel de Profiling e Diagnóstico de Performance",
        code: `using UnityEngine;

public class ProfilerDashboard : MonoBehaviour
{
    void Start()
    {
        int antes = 120;
        int depois = 25;
        Debug.Log("Draw Calls Reduzidos de " + antes + " para " + depois);

        int total = 1000;
        int visiveis = 150;
        Debug.Log("Renderizados com Oclusao: " + visiveis + "/" + total);

        float dist = 60.0f;
        string l = dist >= 50.0f ? "LOD2 (Baixo)" : "LOD0 (Alto)";
        Debug.Log("Malha Ativa: " + l);

        int fps = 60;
        Debug.Log("Trava de FPS: " + fps + " FPS");

        float mem = 450.5f;
        Debug.Log("Memoria Alocada: " + mem + " MB");
    }
}`,
        output: "Draw Calls Reduzidos de 120 para 25\nRenderizados com Oclusao: 150/1000\nMalha Ativa: LOD2 (Baixo)\nTrava de FPS: 60 FPS\nMemoria Alocada: 450.5 MB"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Otimização, Profiling e Draw Calls e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os valores e emita a reducao
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Otimização, Profiling e Draw Calls:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os valores e emita a reducao
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);
    }
}`,
                hint: "Draw Calls Reduzidos de 120 para 25"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_37_1",
            title: "Otimização de Draw Calls com Batching",
            difficulty: "easy",
            description: "Declare int drawCallsAntes = 120; int drawCallsDepois = 25;. Emita: 'Draw Calls Reduzidos de 120 para 25'.",
            validationRules: { requiredPatterns: ["drawCallsAntes","drawCallsDepois","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os valores e emita a reducao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);
    }
}`,
            tests: [
                { input: "", expected: "Draw Calls Reduzidos de 120 para 25", description: "Redução de draw calls" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: drawCallsAntes, drawCallsDepois" },
                { level: "II", text: "A saída no console deve conter exatamente: Draw Calls Reduzidos de 120 para 25" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int drawCallsAntes = 120;\n        int drawCallsDepois = 25;\n        Debug.Log(\"Draw Calls Reduzidos de \" + drawCallsAntes + \" para \" + drawCallsDepois);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["drawCallsAntes","drawCallsDepois","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Draw Calls Reduzidos de 120 para 25";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_2",
            title: "Ocultamento por Oclusão (Occlusion Culling)",
            difficulty: "easy",
            description: "Declare int objetosNaCena = 1000; int objetosRenderizados = 150;. Emita no Console: 'Renderizados com Oclusao: 150/1000'.",
            validationRules: { requiredPatterns: ["objetosNaCena","objetosRenderizados","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os objetos e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int objetosNaCena = 1000;
        int objetosRenderizados = 150;
        Debug.Log("Renderizados com Oclusao: " + objetosRenderizados + "/" + objetosNaCena);
    }
}`,
            tests: [
                { input: "", expected: "Renderizados com Oclusao: 150/1000", description: "Occlusion Culling" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: objetosNaCena, objetosRenderizados" },
                { level: "II", text: "A saída no console deve conter exatamente: Renderizados com Oclusao: 150/1000" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int objetosNaCena = 1000;\n        int objetosRenderizados = 150;\n        Debug.Log(\"Renderizados com Oclusao: \" + objetosRenderizados + \"/\" + objetosNaCena);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["objetosNaCena","objetosRenderizados","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Renderizados com Oclusao: 150/1000";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_3",
            title: "Níveis de Detalhe (LOD Group)",
            difficulty: "medium",
            description: "Declare float distanciaCamera = 60.0f;. Se distanciaCamera >= 50.0f, defina lod = 'LOD2 (Baixo)' e emita 'Malha Ativa: ' + lod.",
            validationRules: { requiredPatterns: ["distanciaCamera","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a distancia e selecione o LOD
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float distanciaCamera = 60.0f;
        if (distanciaCamera >= 50.0f)
        {
            string lod = "LOD2 (Baixo)";
            Debug.Log("Malha Ativa: " + lod);
        }
    }
}`,
            tests: [
                { input: "", expected: "Malha Ativa: LOD2 (Baixo)", description: "LOD Group" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: distanciaCamera, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Malha Ativa: LOD2 (Baixo)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float distanciaCamera = 60.0f;\n        if (distanciaCamera >= 50.0f)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["distanciaCamera","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Malha Ativa: LOD2 (Baixo)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_4",
            title: "Estabilidade de Taxa de Quadros (TargetFrameRate)",
            difficulty: "medium",
            description: "Declare int targetFps = 60;. Emita no Console: 'Trava de FPS: 60 FPS'.",
            validationRules: { requiredPatterns: ["int targetFps","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare targetFps e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int targetFps = 60;
        Debug.Log("Trava de FPS: " + targetFps + " FPS");
    }
}`,
            tests: [
                { input: "", expected: "Trava de FPS: 60 FPS", description: "TargetFrameRate" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int targetFps, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Trava de FPS: 60 FPS" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int targetFps = 60;\n        Debug.Log(\"Trava de FPS: \" + targetFps + \" FPS\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int targetFps","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Trava de FPS: 60 FPS";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_5",
            artifactReward: { artifactId: "Ring_Oroborus", minStars: 5, maxStars: 6 },
            title: "Monitoramento de Memória no Profiler",
            difficulty: "medium",
            description: "Declare float memoriaUsadaMB = 450.5f;. Emita no Console: 'Memoria Alocada: 450.5 MB'.",
            validationRules: { requiredPatterns: ["float memoriaUsadaMB","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare memoriaUsadaMB e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float memoriaUsadaMB = 450.5f;
        Debug.Log("Memoria Alocada: " + memoriaUsadaMB + " MB");
    }
}`,
            tests: [
                { input: "", expected: "Memoria Alocada: 450.5 MB", description: "Profiler de memória" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float memoriaUsadaMB, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Memoria Alocada: 450.5 MB" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float memoriaUsadaMB = 450.5f;\n        Debug.Log(\"Memoria Alocada: \" + memoriaUsadaMB + \" MB\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float memoriaUsadaMB","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Memoria Alocada: 450.5 MB";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
}
];

if (typeof module !== 'undefined') {
    module.exports = { CSHARP_CHAPTERS };
}
if (typeof window !== 'undefined') {
    window.CSHARP_CHAPTERS = CSHARP_CHAPTERS;
}
