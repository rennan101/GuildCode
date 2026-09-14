/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 12
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 12 — CAPÍTULO 12
// ═══════════════════════════════════════════════════════

const CAP_12 = {
    "id": 12,
    "artifactReward": null,
    "title": "Capítulo 12",
    "theme": "",
    "unlock": "",
    "unlockIcon": "",
    "character": "",
    "xpReward": 100,
    "story": {
        "before": "",
        "after": ""
    },
    "concept": {
        "title": "INPUT ACTIONS & MAPEAMENTO: CALLBACKS PERFORMED, STARTED E CANCELED",
        "explanation": "O Input System gerencia o ciclo de vida dos eventos de hardware:\n<ul>\n  <li><strong><code>started</code>:</strong> Disparado no primeiro instante em que o botão ou tecla é pressionado.</li>\n  <li><strong><code>performed</code>:</strong> Disparado quando a ação atinge o limiar de acionamento ou execução completa.</li>\n  <li><strong><code>canceled</code>:</strong> Disparado no momento exato em que o botão é solto pelo jogador.</li>\n  <li><strong>Esquemas de Controle (Control Schemes):</strong> Mapeamento dinâmico entre Gamepad, Teclado/Mouse e Touch.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploInputActions : MonoBehaviour\n{\n    void Start()\n    {\n        string mapaAtual = \"Gameplay\";\n        string acao = \"AtaqueEspecial\";\n        string fase = \"performed\";\n\n        Debug.Log(\"Mapa Ativo: \" + mapaAtual);\n        Debug.Log(\"Evento: \" + acao + \" -> Fase: \" + fase);\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Ciclo de Ação de Carregamento de Tiro",
        "code": "using UnityEngine;\n\npublic class AcaoCarregarTiro : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"1. started: Pressionou gatilho de tiro\");\n        Debug.Log(\"2. performed: Tiro Carregado no Maximo!\");\n        Debug.Log(\"3. canceled: Soltou gatilho e disparou flecha\");\n    }\n}",
        "output": "1. started: Pressionou gatilho de tiro\n2. performed: Tiro Carregado no Maximo!\n3. canceled: Soltou gatilho e disparou flecha"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os estados das ações de entrada.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        string fase = \"performed\";\n        Debug.Log(\"Status da Acao: \" + fase);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Emita a mensagem de callback da ação performed:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Callback performed: Interacao Concluida\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Callback performed: Interacao Concluida\");\n    }\n}",
                "hint": "Callback performed: Interacao Concluida"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_12_1",
            "title": "Fase de Início da Ação (Started)",
            "difficulty": "easy",
            "description": "Declare string faseAcao = \"started\";. Emita no console: 'Input Callback: ' + faseAcao + ' (Botao Pressionado)'.",
            "validationRules": {
                "requiredPatterns": [
                    "string faseAcao",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare faseAcao e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string faseAcao = \"started\";\n        Debug.Log(\"Input Callback: \" + faseAcao + \" (Botao Pressionado)\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Input Callback: started (Botao Pressionado)",
                    "description": "Fase started"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina string faseAcao = \"started\";."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Input Callback: started (Botao Pressionado)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring faseAcao = \"started\";\nDebug.Log(\"Input Callback: \" + faseAcao + \" (Botao Pressionado)\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string faseAcao", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Input Callback: started (Botao Pressionado)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_12_2",
            "title": "Fase de Execução Completa (Performed)",
            "difficulty": "easy",
            "description": "Declare string acaoNome = \"Esquiva\"; e string fase = \"performed\";. Emita: 'Acao Executada: ' + acaoNome + ' | Fase: ' + fase.",
            "validationRules": {
                "requiredPatterns": [
                    "string acaoNome",
                    "string fase",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare acaoNome e fase e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string acaoNome = \"Esquiva\";\n        string fase = \"performed\";\n        Debug.Log(\"Acao Executada: \" + acaoNome + \" | Fase: \" + fase);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Acao Executada: Esquiva | Fase: performed",
                    "description": "Fase performed"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina acaoNome = \"Esquiva\" e fase = \"performed\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Acao Executada: Esquiva | Fase: performed"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring acaoNome = \"Esquiva\";\nstring fase = \"performed\";\nDebug.Log(\"Acao Executada: \" + acaoNome + \" | Fase: \" + fase);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string acaoNome", "string fase", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Acao Executada: Esquiva | Fase: performed";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_12_3",
            "title": "Fase de Cancelamento e Liberação (Canceled)",
            "difficulty": "medium",
            "description": "Declare bool botaoLiberado = true;. Verifique com if (botaoLiberado) e emita: 'Callback canceled: Botao Solto pelo Jogador'.",
            "validationRules": {
                "requiredPatterns": [
                    "botaoLiberado",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique botaoLiberado e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool botaoLiberado = true;\n        if (botaoLiberado)\n        {\n            Debug.Log(\"Callback canceled: Botao Solto pelo Jogador\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Callback canceled: Botao Solto pelo Jogador",
                    "description": "Fase canceled"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use if (botaoLiberado)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Callback canceled: Botao Solto pelo Jogador"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nbool botaoLiberado = true;\nif (botaoLiberado) {\n    Debug.Log(\"Callback canceled: Botao Solto pelo Jogador\");\n}"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["botaoLiberado", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Callback canceled: Botao Solto pelo Jogador";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_12_4",
            "title": "Esquema de Controle Ativo (Gamepad vs Teclado)",
            "difficulty": "medium",
            "description": "Declare string esquemaControle = \"Gamepad_Xbox\";. Emita: 'Esquema Ativo: ' + esquemaControle + ' | Mapeamento Carregado'.",
            "validationRules": {
                "requiredPatterns": [
                    "string esquemaControle",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare esquemaControle e exiba a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string esquemaControle = \"Gamepad_Xbox\";\n        Debug.Log(\"Esquema Ativo: \" + esquemaControle + \" | Mapeamento Carregado\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Esquema Ativo: Gamepad_Xbox | Mapeamento Carregado",
                    "description": "Esquema de controle"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina string esquemaControle = \"Gamepad_Xbox\";."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Esquema Ativo: Gamepad_Xbox | Mapeamento Carregado"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring esquemaControle = \"Gamepad_Xbox\";\nDebug.Log(\"Esquema Ativo: \" + esquemaControle + \" | Mapeamento Carregado\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string esquemaControle", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Esquema Ativo: Gamepad_Xbox | Mapeamento Carregado";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_12_5",
            "artifactReward": {
                "artifactId": "Ring_Eclipse",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Ciclo Completo de Input Action em Classe",
            "difficulty": "medium",
            "description": "Crie a classe AcaoInput com public void Disparar(string nomeAcao) { Debug.Log(\"Acao [\" + nomeAcao + \"] acionada com sucesso!\"); }. Instancie e execute para \"GolpePesado\".",
            "validationRules": {
                "requiredPatterns": [
                    "class AcaoInput",
                    "Disparar",
                    "new AcaoInput()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class AcaoInput\n{\n    public void Disparar(string nomeAcao)\n    {\n        Debug.Log(\"Acao [\" + nomeAcao + \"] acionada com sucesso!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e dispare GolpePesado\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class AcaoInput\n{\n    public void Disparar(string nomeAcao)\n    {\n        Debug.Log(\"Acao [\" + nomeAcao + \"] acionada com sucesso!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        AcaoInput input = new AcaoInput();\n        input.Disparar(\"GolpePesado\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Acao [GolpePesado] acionada com sucesso!",
                    "description": "Invocação de método de ação de input"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie AcaoInput input = new AcaoInput(); e chame input.Disparar(\"GolpePesado\");"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Acao [GolpePesado] acionada com sucesso!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nAcaoInput input = new AcaoInput();\ninput.Disparar(\"GolpePesado\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class AcaoInput", "Disparar", "new AcaoInput()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Acao [GolpePesado] acionada com sucesso!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_12, CAP_12: CAP_12 };
}
if (typeof window !== "undefined") {
    window.CAP_12 = CAP_12;
    window.CAP_12 = CAP_12;
}
