/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 12
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 12 — LEITURA DIRETA: KEYBOARD & MOUSE (INPUT SYSTEM)
// ═══════════════════════════════════════════════════════

const CAP_12 = {
    "id": 12,
    "artifactReward": null,
    "title": "Input Actions & Mapeamento",
    "theme": "Módulo 3 — Input System Moderno",
    "unlock": "Mapa de Ações",
    "unlockIcon": "[MAP]",
    "character": "mira",
    "xpReward": 190,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Inicializando a interface direta de hardware do Input System. Dispositivos Keyboard.current e Mouse.current conectados."
        },
        {
            "type": "narrative",
            "text": "Sinais de sensores fluem instantaneamente da bancada de testes. Mira Solenn calibra a leitura de teclas, cliques e botões contínuos."
        },
        {
            "type": "character",
            "name": "MIRA SOLIS",
            "role": "CARTÓGRAFA & ARTÍFICE",
            "cssClass": "mira",
            "text": "No novo Input System da Unity (<code>UnityEngine.InputSystem</code>), nós acessamos o teclado diretamente através de <code>Keyboard.current[Key.Nome]</code> e o mouse por <code>Mouse.current</code>! É muito mais direto e limpo."
        },
        {
            "type": "character",
            "name": "ELION RAVEN",
            "role": "ESTRATEGISTA",
            "cssClass": "elion",
            "text": "A regra de ouro é diferenciar a intenção do jogador: para disparar ações instantâneas (como pular, atacar ou interagir uma única vez), usamos <code>wasPressedThisFrame</code>. Para ações contínuas (como andar enquanto segura W ou correr mantendo Shift), usamos <code>isPressed</code>!"
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "No Mouse, usamos <code>Mouse.current.leftButton</code> e <code>rightButton</code> seguindo as mesmas propriedades. Complete as 5 atividades deste capítulo para dominar a leitura de teclado e mouse!"
        }
    ],
    "concept": {
        "title": "LEITURA DE TECLADO E MOUSE NO INPUT SYSTEM MODERNO",
        "explanation": "No Unity Input System (com <code>using UnityEngine.InputSystem;</code>), interagimos diretamente com os periféricos do jogador:\n<ul>\n  <li><strong>Acesso a Teclas do Teclado:</strong> Usamos <code>Keyboard.current[Key.Space]</code> ou propriedades nomeadas como <code>Keyboard.current.spaceKey</code>.</li>\n  <li><strong>Disparo Único (Apenas Uma Vez):</strong> <code>.wasPressedThisFrame</code> retorna <code>true</code> somente no primeiro frame em que o botão/tecla é pressionado (ideal para pulo, tiro, pausa e interação).</li>\n  <li><strong>Estado Contínuo (Manter Pressionado):</strong> <code>.isPressed</code> retorna <code>true</code> enquanto a tecla ou botão estiver sendo mantido pressionado (ideal para movimentação contínua como W/A/S/D ou acelerar).</li>\n  <li><strong>Disparo na Liberação:</strong> <code>.wasReleasedThisFrame</code> detecta o frame exato em que a tecla é solta.</li>\n  <li><strong>Botões do Mouse:</strong> <code>Mouse.current.leftButton</code> (botão esquerdo) e <code>Mouse.current.rightButton</code> (botão direito) possuem as mesmas propriedades <code>wasPressedThisFrame</code> e <code>isPressed</code>.</li>\n</ul>",
        "code": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class ExemploKeyboardMouse : MonoBehaviour\n{\n    void Start()\n    {\n        // Disparo único: pressionou uma vez\n        if (Keyboard.current[Key.Space].wasPressedThisFrame)\n        {\n            Debug.Log(\"Pressionou Espaco uma vez!\");\n        }\n\n        // Manter pressionado: enquanto segura a tecla W\n        if (Keyboard.current[Key.W].isPressed)\n        {\n            Debug.Log(\"Mantendo W pressionado!\");\n        }\n\n        // Clique único no mouse\n        if (Mouse.current.leftButton.wasPressedThisFrame)\n        {\n            Debug.Log(\"Clique esquerdo do Mouse!\");\n        }\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Controle de Ações de Ataque e Corrida",
        "code": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class ControleAcoesHeroi : MonoBehaviour\n{\n    void Start()\n    {\n        // Ataque disparado apenas uma vez ao clicar com o botao esquerdo\n        if (Mouse.current.leftButton.wasPressedThisFrame)\n        {\n            Debug.Log(\"Ataque executado uma vez!\");\n        }\n\n        // Movimento continuo enquanto segura W\n        if (Keyboard.current[Key.W].isPressed)\n        {\n            Debug.Log(\"Movendo personagem continuamente para frente!\");\n        }\n    }\n}",
        "output": "Ataque executado uma vez!\nMovendo personagem continuamente para frente!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Teste diferentes verificações de teclas e botões de mouse usando Keyboard.current e Mouse.current.",
        "starterCode": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current[Key.Space].wasPressedThisFrame)\n        {\n            Debug.Log(\"Pulo disparado!\");\n        }\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Verifique se a barra de espaço foi pressionada uma única vez usando Keyboard.current[Key.Space].wasPressedThisFrame e emita a mensagem:",
                "starterCode": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current[Key.Space].wasPressedThisFrame)\n        {\n            Debug.Log(\"Pulo acionado uma vez!\");\n        }\n    }\n}",
                "solution": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current[Key.Space].wasPressedThisFrame)\n        {\n            Debug.Log(\"Pulo acionado uma vez!\");\n        }\n    }\n}",
                "hint": "Use if (Keyboard.current[Key.Space].wasPressedThisFrame)"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_12_1",
            "title": "Ação de Disparo Único com Teclado (wasPressedThisFrame)",
            "difficulty": "easy",
            "description": "Utilize if (Keyboard.current[Key.Space].wasPressedThisFrame) para verificar o acionamento único da tecla de espaço e emita no console: 'Pulo executado com sucesso!'.",
            "validationRules": {
                "requiredPatterns": [
                    "Keyboard.current",
                    "wasPressedThisFrame",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique o pressionamento de Key.Space uma vez e exiba a mensagem\n    }\n}",
            "solution": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current[Key.Space].wasPressedThisFrame)\n        {\n            Debug.Log(\"Pulo executado com sucesso!\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Pulo executado com sucesso!",
                    "description": "Detecção de disparo único de tecla"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Escreva a condição if (Keyboard.current[Key.Space].wasPressedThisFrame)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Pulo executado com sucesso!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nif (Keyboard.current[Key.Space].wasPressedThisFrame)\n{\n    Debug.Log(\"Pulo executado com sucesso!\");\n}"
                }
            ]
        },
        {
            "id": "cs_act_12_2",
            "title": "Manter Tecla Pressionada (isPressed)",
            "difficulty": "easy",
            "description": "Utilize if (Keyboard.current[Key.W].isPressed) para verificar se a tecla W está sendo mantida pressionada e emita no console: 'Movendo para frente continuamente'.",
            "validationRules": {
                "requiredPatterns": [
                    "Keyboard.current",
                    "isPressed",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique se Key.W esta mantido pressionado e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current[Key.W].isPressed)\n        {\n            Debug.Log(\"Movendo para frente continuamente\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Movendo para frente continuamente",
                    "description": "Detecção contínua de tecla pressionada"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Escreva a condição if (Keyboard.current[Key.W].isPressed)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Movendo para frente continuamente"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nif (Keyboard.current[Key.W].isPressed)\n{\n    Debug.Log(\"Movendo para frente continuamente\");\n}"
                }
            ]
        },
        {
            "id": "cs_act_12_3",
            "title": "Clique Único com Mouse.current (leftButton)",
            "difficulty": "medium",
            "description": "Verifique se o botão esquerdo do mouse foi clicado uma vez com if (Mouse.current.leftButton.wasPressedThisFrame) e emita no console: 'Ataque basico disparado pelo Mouse!'.",
            "validationRules": {
                "requiredPatterns": [
                    "Mouse.current",
                    "leftButton",
                    "wasPressedThisFrame",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique o clique unico no botao esquerdo do mouse\n    }\n}",
            "solution": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Mouse.current.leftButton.wasPressedThisFrame)\n        {\n            Debug.Log(\"Ataque basico disparado pelo Mouse!\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Ataque basico disparado pelo Mouse!",
                    "description": "Clique único do mouse"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Utilize if (Mouse.current.leftButton.wasPressedThisFrame)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Ataque basico disparado pelo Mouse!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nif (Mouse.current.leftButton.wasPressedThisFrame)\n{\n    Debug.Log(\"Ataque basico disparado pelo Mouse!\");\n}"
                }
            ]
        },
        {
            "id": "cs_act_12_4",
            "title": "Manter Botão do Mouse Pressionado (rightButton.isPressed)",
            "difficulty": "medium",
            "description": "Verifique se o jogador está mantendo o botão direito do mouse pressionado com if (Mouse.current.rightButton.isPressed) e emita: 'Modo de Mira Ativo (Zoom)'.",
            "validationRules": {
                "requiredPatterns": [
                    "Mouse.current",
                    "rightButton",
                    "isPressed",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique se o botao direito do mouse esta sendo mantido pressionado\n    }\n}",
            "solution": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Mouse.current.rightButton.isPressed)\n        {\n            Debug.Log(\"Modo de Mira Ativo (Zoom)\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Modo de Mira Ativo (Zoom)",
                    "description": "Botão do mouse mantido pressionado"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Utilize if (Mouse.current.rightButton.isPressed)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Modo de Mira Ativo (Zoom)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nif (Mouse.current.rightButton.isPressed)\n{\n    Debug.Log(\"Modo de Mira Ativo (Zoom)\");\n}"
                }
            ]
        },
        {
            "id": "cs_act_12_5",
            "artifactReward": {
                "artifactId": "Ring_Eclipse",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Combinação de Teclas de Aceleração (Shift + W)",
            "difficulty": "medium",
            "description": "Crie uma verificação combinada: se Keyboard.current[Key.LeftShift].isPressed E Keyboard.current[Key.W].isPressed forem ambos verdadeiros (usando operador &&), emita no console: 'Sprint Maximo: Heroi Correndo!'.",
            "validationRules": {
                "requiredPatterns": [
                    "Keyboard.current",
                    "isPressed",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique a combinacao de LeftShift e W mantidos pressionados\n    }\n}",
            "solution": "using UnityEngine;\nusing UnityEngine.InputSystem;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current[Key.LeftShift].isPressed && Keyboard.current[Key.W].isPressed)\n        {\n            Debug.Log(\"Sprint Maximo: Heroi Correndo!\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Sprint Maximo: Heroi Correndo!",
                    "description": "Combinação de teclas mantidas pressionadas"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use if (Keyboard.current[Key.LeftShift].isPressed && Keyboard.current[Key.W].isPressed)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Sprint Maximo: Heroi Correndo!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nif (Keyboard.current[Key.LeftShift].isPressed && Keyboard.current[Key.W].isPressed)\n{\n    Debug.Log(\"Sprint Maximo: Heroi Correndo!\");\n}"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_12, CAP_12: CAP_12 };
}
