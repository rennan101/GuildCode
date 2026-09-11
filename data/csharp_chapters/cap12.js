/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 12
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 12 — INPUT ACTIONS & MAPEAMENTO
// ═══════════════════════════════════════════════════════

const CAP_12 = {
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
};

if (typeof module !== "undefined") {
    module.exports = { CAP_12 };
}
if (typeof window !== "undefined") {
    window.CAP_12 = CAP_12;
}
