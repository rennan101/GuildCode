/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 11
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 11 — INPUT SYSTEM MODERNO
// ═══════════════════════════════════════════════════════

const CAP_11 = {
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
};

if (typeof module !== "undefined") {
    module.exports = { CAP_11 };
}
if (typeof window !== "undefined") {
    window.CAP_11 = CAP_11;
}
