/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 19
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 19 — CÂMERA 1ª PESSOA (FPS LOOK)
// ═══════════════════════════════════════════════════════

const CAP_19 = {
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
};

if (typeof module !== "undefined") {
    module.exports = { CAP_19 };
}
if (typeof window !== "undefined") {
    window.CAP_19 = CAP_19;
}
