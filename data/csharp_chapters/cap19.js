/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 19
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 19 — CAPÍTULO 19
// ═══════════════════════════════════════════════════════

const CAP_19 = {
    "id": 19,
    "artifactReward": null,
    "title": "Capítulo 19",
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
        "title": "CÂMERA 1ª PESSOA: FPS LOOK, SENSIBILIDADE E CLAMP DE PITCH",
        "explanation": "A visão em primeira pessoa (FPS) exige controle angular preciso e rotação de eixos desacoplados:\n<ul>\n  <li><strong>Eixo Horizontal (Yaw - Eixo Y):</strong> Gira o corpo inteiro do personagem para a esquerda e direita.</li>\n  <li><strong>Eixo Vertical (Pitch - Eixo X):</strong> Gira apenas a cabeça/câmera para cima e para baixo.</li>\n  <li><strong>Clamp de Ângulo (Trava de Olhar):</strong> Limita a rotação vertical (ex: <code>-80° a +80°</code>) para evitar que o jogador vire a cabeça ao contrário.</li>\n  <li><strong>Sensibilidade do Mouse:</strong> Multiplicador de suavização e velocidade de resposta.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploFPSLook : MonoBehaviour\n{\n    void Start()\n    {\n        float mouseX = 2.5f;\n        float mouseY = -1.2f;\n        float sensibilidade = 2.0f;\n\n        float rotacaoYaw = mouseX * sensibilidade;\n        float rotacaoPitch = mouseY * sensibilidade;\n\n        Debug.Log(\"Rotacao Horizontal (Yaw): \" + rotacaoYaw + \"°\");\n        Debug.Log(\"Rotacao Vertical (Pitch): \" + rotacaoPitch + \"°\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Controlador de Rotação de Olhar FPS",
        "code": "using UnityEngine;\n\npublic class ControladorOlharFPS : MonoBehaviour\n{\n    void Start()\n    {\n        float anguloPitch = 45.0f;\n        float clampMin = -80.0f;\n        float clampMax = 80.0f;\n\n        if (anguloPitch >= clampMin && anguloPitch <= clampMax)\n        {\n            Debug.Log(\"Inclinacao Vertical Valida: \" + anguloPitch + \" graus\");\n        }\n    }\n}",
        "output": "Inclinacao Vertical Valida: 45 graus"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os ângulos de rotação do mouse.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        float angulo = 60.0f;\n        Debug.Log(\"Angulo de Visao: \" + angulo + \" graus\");\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o ângulo vertical e emita a inclinação no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float pitch = 30.0f;\n        Debug.Log(\"Inclinacao da Camera: \" + pitch + \" graus\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float pitch = 30.0f;\n        Debug.Log(\"Inclinacao da Camera: \" + pitch + \" graus\");\n    }\n}",
                "hint": "Inclinacao da Camera: 30 graus"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_19_1",
            "title": "Sensibilidade e Rotação Horizontal (Yaw)",
            "difficulty": "easy",
            "description": "Declare float inputMouseX = 3.0f; e float sensibilidade = 1.5f;. Calcule float rotacao = inputMouseX * sensibilidade; e emita: 'Rotacao Yaw Aplicada: ' + rotacao + ' graus'.",
            "validationRules": {
                "requiredPatterns": [
                    "inputMouseX",
                    "sensibilidade",
                    "rotacao",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a rotação horizontal e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float inputMouseX = 3.0f;\n        float sensibilidade = 1.5f;\n        float rotacao = inputMouseX * sensibilidade;\n        Debug.Log(\"Rotacao Yaw Aplicada: \" + rotacao + \" graus\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Rotacao Yaw Aplicada: 4.5 graus",
                    "description": "Cálculo de Yaw"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Multiplique inputMouseX * sensibilidade."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Rotacao Yaw Aplicada: 4.5 graus"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat rotacao = inputMouseX * sensibilidade;\nDebug.Log(\"Rotacao Yaw Aplicada: \" + rotacao + \" graus\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["inputMouseX", "sensibilidade", "rotacao", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Rotacao Yaw Aplicada: 4.5 graus";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_19_2",
            "title": "Trava Angular de Visão (Clamp de Pitch)",
            "difficulty": "easy",
            "description": "Declare float angulo = 85.0f; float limiteMax = 80.0f;. Se angulo > limiteMax, defina angulo = limiteMax;. Emita: 'Angulo Vertical Limitado: ' + angulo + ' graus'.",
            "validationRules": {
                "requiredPatterns": [
                    "angulo",
                    "limiteMax",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Aplique o clamp no ângulo e exiba\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float angulo = 85.0f;\n        float limiteMax = 80.0f;\n        if (angulo > limiteMax)\n        {\n            angulo = limiteMax;\n        }\n        Debug.Log(\"Angulo Vertical Limitado: \" + angulo + \" graus\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Angulo Vertical Limitado: 80 graus",
                    "description": "Clamp de ângulo vertical"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Faça if (angulo > limiteMax) angulo = limiteMax;."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Angulo Vertical Limitado: 80 graus"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nif (angulo > limiteMax) angulo = limiteMax;\nDebug.Log(\"Angulo Vertical Limitado: \" + angulo + \" graus\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["angulo", "limiteMax", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Angulo Vertical Limitado: 80 graus";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_19_3",
            "title": "Bloqueio e Ocultação do Cursor do Mouse",
            "difficulty": "medium",
            "description": "Declare bool cursorBloqueado = true; bool cursorVisivel = false;. Emita: 'Modo FPS Ativo: Cursor Bloqueado (Lock: ' + cursorBloqueado + ' | Visivel: ' + cursorVisivel + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "cursorBloqueado",
                    "cursorVisivel",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o estado do cursor e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool cursorBloqueado = true;\n        bool cursorVisivel = false;\n        Debug.Log(\"Modo FPS Ativo: Cursor Bloqueado (Lock: \" + cursorBloqueado + \" | Visivel: \" + cursorVisivel + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Modo FPS Ativo: Cursor Bloqueado (Lock: True | Visivel: False)",
                    "description": "Cursor LockMode no FPS"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina cursorBloqueado = true e cursorVisivel = false."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Modo FPS Ativo: Cursor Bloqueado (Lock: True | Visivel: False)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Modo FPS Ativo: Cursor Bloqueado (Lock: \" + cursorBloqueado + \" | Visivel: \" + cursorVisivel + \")\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["cursorBloqueado", "cursorVisivel", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Modo FPS Ativo: Cursor Bloqueado (Lock: True | Visivel: False)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_19_4",
            "title": "Inversão de Eixo Vertical (Invert Y)",
            "difficulty": "medium",
            "description": "Crie a classe ConfiguracaoMouse com public float ProcessarEixoY(float inputY, bool inverter) { if (inverter) return -inputY; return inputY; }. Instancie e calcule para inputY = 2.0f e inverter = true, emitindo: 'Eixo Y Processado: ' + resultado.",
            "validationRules": {
                "requiredPatterns": [
                    "class ConfiguracaoMouse",
                    "ProcessarEixoY",
                    "new ConfiguracaoMouse()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ConfiguracaoMouse\n{\n    public float ProcessarEixoY(float inputY, bool inverter)\n    {\n        if (inverter) return -inputY;\n        return inputY;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e teste o eixo invertido\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ConfiguracaoMouse\n{\n    public float ProcessarEixoY(float inputY, bool inverter)\n    {\n        if (inverter) return -inputY;\n        return inputY;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ConfiguracaoMouse config = new ConfiguracaoMouse();\n        float resultado = config.ProcessarEixoY(2.0f, true);\n        Debug.Log(\"Eixo Y Processado: \" + resultado);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Eixo Y Processado: -2",
                    "description": "Inversão de eixo do mouse"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie ConfiguracaoMouse config = new ConfiguracaoMouse(); e calcule com (2.0f, true)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Eixo Y Processado: -2"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nConfiguracaoMouse config = new ConfiguracaoMouse();\nfloat resultado = config.ProcessarEixoY(2.0f, true);\nDebug.Log(\"Eixo Y Processado: \" + resultado);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class ConfiguracaoMouse", "ProcessarEixoY", "new ConfiguracaoMouse()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Eixo Y Processado: -2";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_19_5",
            "artifactReward": {
                "artifactId": "Crown_Zenith",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Orientador de Visão FPS Completo",
            "difficulty": "medium",
            "description": "Crie a classe OrientadorFPS com public void RotacionarCamera(float pitch, float yaw) { Debug.Log(\"Camera FPS Posicionada: Pitch=\" + pitch + \"° | Yaw=\" + yaw + \"°\"); }. Instancie e execute para pitch = 15.0f e yaw = 90.0f.",
            "validationRules": {
                "requiredPatterns": [
                    "class OrientadorFPS",
                    "RotacionarCamera",
                    "new OrientadorFPS()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class OrientadorFPS\n{\n    public void RotacionarCamera(float pitch, float yaw)\n    {\n        Debug.Log(\"Camera FPS Posicionada: Pitch=\" + pitch + \"° | Yaw=\" + yaw + \"°\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e rotacione com pitch=15.0f e yaw=90.0f\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class OrientadorFPS\n{\n    public void RotacionarCamera(float pitch, float yaw)\n    {\n        Debug.Log(\"Camera FPS Posicionada: Pitch=\" + pitch + \"° | Yaw=\" + yaw + \"°\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        OrientadorFPS ori = new OrientadorFPS();\n        ori.RotacionarCamera(15.0f, 90.0f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Camera FPS Posicionada: Pitch=15° | Yaw=90°",
                    "description": "Orientação completa em primeira pessoa"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie OrientadorFPS ori = new OrientadorFPS(); e chame ori.RotacionarCamera(15.0f, 90.0f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Camera FPS Posicionada: Pitch=15° | Yaw=90°"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nOrientadorFPS ori = new OrientadorFPS();\nori.RotacionarCamera(15.0f, 90.0f);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class OrientadorFPS", "RotacionarCamera", "new OrientadorFPS()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Camera FPS Posicionada: Pitch=15° | Yaw=90°";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_19, CAP_19: CAP_19 };
}
if (typeof window !== "undefined") {
    window.CAP_19 = CAP_19;
    window.CAP_19 = CAP_19;
}
