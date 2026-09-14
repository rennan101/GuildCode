/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 11
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 11 — INPUT SYSTEM MODERNO
// ═══════════════════════════════════════════════════════

const CAP_11 = {
    "id": 11,
    "artifactReward": null,
    "title": "Input System Moderno",
    "theme": "Módulo 3 — Input System Moderno",
    "unlock": "Manopla Input",
    "unlockIcon": "[IN]",
    "character": "elion",
    "xpReward": 180,
    "story": [
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
    "concept": {
        "title": "INPUT SYSTEM MODERNO: LEITURA DE AÇÕES E VETORES DE ENTRADA",
        "explanation": "O novo Input System da Unity é baseado em eventos e esquemas configuráveis:\n<ul>\n  <li><strong>Ações de Entrada (<code>InputAction</code>):</strong> Desacoplam o hardware (teclado, gamepad, mouse) da lógica de gameplay.</li>\n  <li><strong>Leitura de Eixos 2D (<code>Vector2</code>):</strong> Captura direções analógicas (ex: <code>Vector2 moveInput = new Vector2(1, 0)</code>).</li>\n  <li><strong>Mapeamento para o Mundo 3D:</strong> O vetor 2D <code>(x, y)</code> é convertido para o plano horizontal 3D <code>(x, 0, y)</code>.</li>\n  <li><strong>Ações de Botão (Trigger/Button):</strong> Leitura de comandos imediatos como Pulo, Esquiva e Ataque.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploInputSystem : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 inputMovimento = new Vector2(1.0f, 0.0f);\n        Vector3 direcaoMundo = new Vector3(inputMovimento.x, 0, inputMovimento.y);\n\n        Debug.Log(\"Input 2D Lido: (\" + inputMovimento.x + \", \" + inputMovimento.y + \")\");\n        Debug.Log(\"Direcao de Movimento 3D: (\" + direcaoMundo.x + \", \" + direcaoMundo.y + \", \" + direcaoMundo.z + \")\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Controlador de Entrada de Movimento",
        "code": "using UnityEngine;\n\npublic class ControladorInput : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 inputVetor = new Vector2(0.0f, 1.0f);\n        bool botaoPulo = true;\n\n        Debug.Log(\"Eixo Direcional: (\" + inputVetor.x + \", \" + inputVetor.y + \")\");\n        if (botaoPulo)\n        {\n            Debug.Log(\"Acao Executada: Pulo do Heroi!\");\n        }\n    }\n}",
        "output": "Eixo Direcional: (0, 1)\nAcao Executada: Pulo do Heroi!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Teste diferentes combinações de eixos de entrada e botões.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 input = new Vector2(-1, 1);\n        Debug.Log(\"Diagonal: X=\" + input.x + \" Y=\" + input.y);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Capture o vetor de entrada e emita a direção no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 input = new Vector2(1, 0);\n        Debug.Log(\"Movimento para a Direita: X=\" + input.x);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 input = new Vector2(1, 0);\n        Debug.Log(\"Movimento para a Direita: X=\" + input.x);\n    }\n}",
                "hint": "Movimento para a Direita: X=1"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_11_1",
            "title": "Leitura de Vetor de Movimento 2D",
            "difficulty": "easy",
            "description": "Crie Vector2 input = new Vector2(0.5f, 1.0f);. Emita no console: 'Entrada Direcional: (' + input.x + ', ' + input.y + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector2 input",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o Vector2 e exiba os eixos\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 input = new Vector2(0.5f, 1.0f);\n        Debug.Log(\"Entrada Direcional: (\" + input.x + \", \" + input.y + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Entrada Direcional: (0.5, 1)",
                    "description": "Leitura de Vector2 de entrada"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie com new Vector2(0.5f, 1.0f)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Entrada Direcional: (0.5, 1)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector2 input = new Vector2(0.5f, 1.0f);\nDebug.Log(\"Entrada Direcional: (\" + input.x + \", \" + input.y + \")\");"
                }
            ]
        },
        {
            "id": "cs_act_11_2",
            "title": "Conversão de Input 2D para Espaço 3D",
            "difficulty": "easy",
            "description": "Dado Vector2 move2D = new Vector2(1, 1);, converta para Vector3 move3D = new Vector3(move2D.x, 0, move2D.y);. Emita: 'Vetor 3D de Deslocamento: (' + move3D.x + ', ' + move3D.y + ', ' + move3D.z + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector2 move2D",
                    "Vector3 move3D",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Converta 2D para 3D no plano horizontal\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 move2D = new Vector2(1, 1);\n        Vector3 move3D = new Vector3(move2D.x, 0, move2D.y);\n        Debug.Log(\"Vetor 3D de Deslocamento: (\" + move3D.x + \", \" + move3D.y + \", \" + move3D.z + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Vetor 3D de Deslocamento: (1, 0, 1)",
                    "description": "Mapeamento 2D para 3D"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Crie Vector3 move3D com move2D.x em X e move2D.y em Z."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Vetor 3D de Deslocamento: (1, 0, 1)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector2 move2D = new Vector2(1, 1);\nVector3 move3D = new Vector3(move2D.x, 0, move2D.y);\nDebug.Log(\"Vetor 3D de Deslocamento: (\" + move3D.x + \", \" + move3D.y + \", \" + move3D.z + \")\");"
                }
            ]
        },
        {
            "id": "cs_act_11_3",
            "title": "Detecção de Botão Pressionado",
            "difficulty": "medium",
            "description": "Declare bool botaoAtaquePressionado = true;. Verifique com if (botaoAtaquePressionado) e emita: 'Acao de Ataque: Espada Desembainhada!'.",
            "validationRules": {
                "requiredPatterns": [
                    "botaoAtaquePressionado",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique o botão e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool botaoAtaquePressionado = true;\n        if (botaoAtaquePressionado)\n        {\n            Debug.Log(\"Acao de Ataque: Espada Desembainhada!\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Acao de Ataque: Espada Desembainhada!",
                    "description": "Disparo de ação por botão"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use if (botaoAtaquePressionado)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Acao de Ataque: Espada Desembainhada!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nbool botaoAtaquePressionado = true;\nif (botaoAtaquePressionado) {\n    Debug.Log(\"Acao de Ataque: Espada Desembainhada!\");\n}"
                }
            ]
        },
        {
            "id": "cs_act_11_4",
            "title": "Calculando Intensidade do Analógico",
            "difficulty": "medium",
            "description": "Crie a classe LeitorInput com o método public float ObterMagnitude(float x, float y) que retorna x + y;. Calcule para x = 0.6f e y = 0.4f, e emita: 'Magnitude da Entrada: ' + mag.",
            "validationRules": {
                "requiredPatterns": [
                    "class LeitorInput",
                    "ObterMagnitude",
                    "new LeitorInput()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class LeitorInput\n{\n    public float ObterMagnitude(float x, float y)\n    {\n        return x + y;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie LeitorInput e calcule a magnitude\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class LeitorInput\n{\n    public float ObterMagnitude(float x, float y)\n    {\n        return x + y;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        LeitorInput leitor = new LeitorInput();\n        float mag = leitor.ObterMagnitude(0.6f, 0.4f);\n        Debug.Log(\"Magnitude da Entrada: \" + mag);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Magnitude da Entrada: 1",
                    "description": "Magnitude de vetor de entrada"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Chame leitor.ObterMagnitude(0.6f, 0.4f)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Magnitude da Entrada: 1"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nLeitorInput leitor = new LeitorInput();\nfloat mag = leitor.ObterMagnitude(0.6f, 0.4f);\nDebug.Log(\"Magnitude da Entrada: \" + mag);"
                }
            ]
        },
        {
            "id": "cs_act_11_5",
            "artifactReward": {
                "artifactId": "Crown_Storm",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Processador de Esquiva e Corrida",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorAcoes com public string ProcessarAcao(bool segurandoShift, bool espaco) { if (segurandoShift) return \"Correndo\"; if (espaco) return \"Esquiva\"; return \"Parado\"; }. Instancie e execute para segurandoShift = true e espaco = false, emitindo: 'Estado Atual: ' + resultado.",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorAcoes",
                    "ProcessarAcao",
                    "new GerenciadorAcoes()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorAcoes\n{\n    public string ProcessarAcao(bool segurandoShift, bool espaco)\n    {\n        if (segurandoShift) return \"Correndo\";\n        if (espaco) return \"Esquiva\";\n        return \"Parado\";\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e chame ProcessarAcao(true, false)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorAcoes\n{\n    public string ProcessarAcao(bool segurandoShift, bool espaco)\n    {\n        if (segurandoShift) return \"Correndo\";\n        if (espaco) return \"Esquiva\";\n        return \"Parado\";\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorAcoes gm = new GerenciadorAcoes();\n        string resultado = gm.ProcessarAcao(true, false);\n        Debug.Log(\"Estado Atual: \" + resultado);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Estado Atual: Correndo",
                    "description": "Processamento de múltiplas entradas"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorAcoes gm = new GerenciadorAcoes(); e chame gm.ProcessarAcao(true, false);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Estado Atual: Correndo"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorAcoes gm = new GerenciadorAcoes();\nstring resultado = gm.ProcessarAcao(true, false);\nDebug.Log(\"Estado Atual: \" + resultado);"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_11, CAP_11: CAP_11 };
}
