/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 13
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 13 — CAPÍTULO 13
// ═══════════════════════════════════════════════════════

const CAP_13 = {
    "id": 13,
    "artifactReward": null,
    "title": "Capítulo 13",
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
        "title": "SISTEMAS DE COORDENADAS 3D: ESPAÇO LOCAL VS ESPAÇO GLOBAL",
        "explanation": "No motor 3D do Unity existem dois referenciais fundamentais de coordenadas:\n<ul>\n  <li><strong>Espaço Global (World Space):</strong> O centro absoluto do mundo 3D <code>(0, 0, 0)</code> compartilhado por toda a cena.</li>\n  <li><strong>Espaço Local (Local Space):</strong> Posição relativa ao objeto pai (Parent) na hierarquia.</li>\n  <li><strong>Eixos Locais (Forward/Right/Up):</strong> Direções que giram junto com a orientação do personagem.</li>\n  <li><strong>TransformPoint / TransformDirection:</strong> Converte pontos e direções entre os referenciais local e global.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploCoordenadas : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 posPaiGlobal = new Vector3(10, 0, 10);\n        Vector3 posFilhoLocal = new Vector3(0, 2, 0);\n        Vector3 posFilhoGlobal = new Vector3(posPaiGlobal.x + posFilhoLocal.x, posPaiGlobal.y + posFilhoLocal.y, posPaiGlobal.z + posFilhoLocal.z);\n\n        Debug.Log(\"Pai Global: (\" + posPaiGlobal.x + \", \" + posPaiGlobal.y + \", \" + posPaiGlobal.z + \")\");\n        Debug.Log(\"Filho Global Resultante: (\" + posFilhoGlobal.x + \", \" + posFilhoGlobal.y + \", \" + posFilhoGlobal.z + \")\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Cálculo de Posição de Arma no Braço do Herói",
        "code": "using UnityEngine;\n\npublic class EspacoLocalGlobal : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 heroiPos = new Vector3(20, 0, 50);\n        Vector3 armaOffsetLocal = new Vector3(1, 1, 0);\n        Vector3 armaPosMundo = new Vector3(heroiPos.x + armaOffsetLocal.x, heroiPos.y + armaOffsetLocal.y, heroiPos.z + armaOffsetLocal.z);\n\n        Debug.Log(\"Posicao Heroi: (\" + heroiPos.x + \", \" + heroiPos.y + \", \" + heroiPos.z + \")\");\n        Debug.Log(\"Posicao Arma no Mundo: (\" + armaPosMundo.x + \", \" + armaPosMundo.y + \", \" + armaPosMundo.z + \")\");\n    }\n}",
        "output": "Posicao Heroi: (20, 0, 50)\nPosicao Arma no Mundo: (21, 1, 50)"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Altere os valores de offset local e observe a transformação global.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 local = new Vector3(0, 1, 2);\n        Debug.Log(\"Offset Local: X=\" + local.x + \" Y=\" + local.y + \" Z=\" + local.z);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Some a posição do pai com o offset do filho e emita a posição global resultante:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pai = new Vector3(5, 0, 5);\n        Vector3 filho = new Vector3(0, 2, 0);\n        Debug.Log(\"Altura Global do Filho: \" + (pai.y + filho.y));\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pai = new Vector3(5, 0, 5);\n        Vector3 filho = new Vector3(0, 2, 0);\n        Debug.Log(\"Altura Global do Filho: \" + (pai.y + filho.y));\n    }\n}",
                "hint": "Altura Global do Filho: 2"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_13_1",
            "title": "Definição de Origem Global (World Center)",
            "difficulty": "easy",
            "description": "Crie Vector3 origem = new Vector3(0, 0, 0);. Emita no console: 'Centro do Mundo 3D: (' + origem.x + ', ' + origem.y + ', ' + origem.z + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 origem",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie a origem e exiba as coordenadas\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 origem = new Vector3(0, 0, 0);\n        Debug.Log(\"Centro do Mundo 3D: (\" + origem.x + \", \" + origem.y + \", \" + origem.z + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Centro do Mundo 3D: (0, 0, 0)",
                    "description": "Origem global"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie com new Vector3(0, 0, 0)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Centro do Mundo 3D: (0, 0, 0)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 origem = new Vector3(0, 0, 0);\nDebug.Log(\"Centro do Mundo 3D: (\" + origem.x + \", \" + origem.y + \", \" + origem.z + \")\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 origem", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Centro do Mundo 3D: (0, 0, 0)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_13_2",
            "title": "Calculando Posição Global a partir do Pai e Filho",
            "difficulty": "easy",
            "description": "Dado Vector3 pai = new Vector3(10, 0, 20); e Vector3 offset = new Vector3(2, 3, 0);, calcule a posição final em X e Y. Emita: 'Posicao Global Filho: X=' + (pai.x + offset.x) + ' Y=' + (pai.y + offset.y).",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 pai",
                    "Vector3 offset",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Some pai e offset e emita o resultado\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pai = new Vector3(10, 0, 20);\n        Vector3 offset = new Vector3(2, 3, 0);\n        Debug.Log(\"Posicao Global Filho: X=\" + (pai.x + offset.x) + \" Y=\" + (pai.y + offset.y));\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Posicao Global Filho: X=12 Y=3",
                    "description": "Posição relativa ao pai"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Some pai.x + offset.x e pai.y + offset.y."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Posicao Global Filho: X=12 Y=3"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 pai = new Vector3(10, 0, 20);\nVector3 offset = new Vector3(2, 3, 0);\nDebug.Log(\"Posicao Global Filho: X=\" + (pai.x + offset.x) + \" Y=\" + (pai.y + offset.y));"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 pai", "Vector3 offset", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Posicao Global Filho: X=12 Y=3";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_13_3",
            "title": "Eixo Frontal (Vector3 Forward)",
            "difficulty": "medium",
            "description": "Declare Vector3 frente = new Vector3(0, 0, 1);. Emita no console: 'Direcao Frontal (Forward): (' + frente.x + ', ' + frente.y + ', ' + frente.z + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 frente",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o vetor de direção frontal e imprima\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 frente = new Vector3(0, 0, 1);\n        Debug.Log(\"Direcao Frontal (Forward): (\" + frente.x + \", \" + frente.y + \", \" + frente.z + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Direcao Frontal (Forward): (0, 0, 1)",
                    "description": "Direção frontal padrão"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie com new Vector3(0, 0, 1)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Direcao Frontal (Forward): (0, 0, 1)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 frente = new Vector3(0, 0, 1);\nDebug.Log(\"Direcao Frontal (Forward): (\" + frente.x + \", \" + frente.y + \", \" + frente.z + \")\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 frente", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Direcao Frontal (Forward): (0, 0, 1)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_13_4",
            "title": "Offset de Posição de Câmera em Terceira Pessoa",
            "difficulty": "medium",
            "description": "Declare Vector3 alvoHeroi = new Vector3(0, 1, 0); e Vector3 offsetCamera = new Vector3(0, 2, -5);. Calcule a posição da câmera somando alvoHeroi + offsetCamera e emita: 'Posicao da Camera: Z=' + (alvoHeroi.z + offsetCamera.z).",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 alvoHeroi",
                    "Vector3 offsetCamera",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o offset de câmera em Z e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 alvoHeroi = new Vector3(0, 1, 0);\n        Vector3 offsetCamera = new Vector3(0, 2, -5);\n        Debug.Log(\"Posicao da Camera: Z=\" + (alvoHeroi.z + offsetCamera.z));\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Posicao da Camera: Z=-5",
                    "description": "Cálculo de offset de câmera"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Some alvoHeroi.z + offsetCamera.z."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Posicao da Camera: Z=-5"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 alvoHeroi = new Vector3(0, 1, 0);\nVector3 offsetCamera = new Vector3(0, 2, -5);\nDebug.Log(\"Posicao da Camera: Z=\" + (alvoHeroi.z + offsetCamera.z));"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 alvoHeroi", "Vector3 offsetCamera", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Posicao da Camera: Z=-5";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_13_5",
            "artifactReward": {
                "artifactId": "Crown_Sunburst",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Conversor de Coordenadas em Classe Utilitária",
            "difficulty": "medium",
            "description": "Crie a classe ConversorEspaco com o método public float CalcularPosicaoMundoX(float posX, float offsetX) { return posX + offsetX; }. Instancie e calcule para posX = 15 e offsetX = 5, emitindo: 'Posicao Final no Mundo X: ' + resultado.",
            "validationRules": {
                "requiredPatterns": [
                    "class ConversorEspaco",
                    "CalcularPosicaoMundoX",
                    "new ConversorEspaco()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ConversorEspaco\n{\n    public float CalcularPosicaoMundoX(float posX, float offsetX)\n    {\n        return posX + offsetX;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule posX + offsetX\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ConversorEspaco\n{\n    public float CalcularPosicaoMundoX(float posX, float offsetX)\n    {\n        return posX + offsetX;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ConversorEspaco conv = new ConversorEspaco();\n        float resultado = conv.CalcularPosicaoMundoX(15, 5);\n        Debug.Log(\"Posicao Final no Mundo X: \" + resultado);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Posicao Final no Mundo X: 20",
                    "description": "Cálculo de translação de espaço local para global"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie ConversorEspaco conv = new ConversorEspaco(); e chame conv.CalcularPosicaoMundoX(15, 5);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Posicao Final no Mundo X: 20"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nConversorEspaco conv = new ConversorEspaco();\nfloat resultado = conv.CalcularPosicaoMundoX(15, 5);\nDebug.Log(\"Posicao Final no Mundo X: \" + resultado);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class ConversorEspaco", "CalcularPosicaoMundoX", "new ConversorEspaco()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Posicao Final no Mundo X: 20";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_13, CAP_13: CAP_13 };
}
if (typeof window !== "undefined") {
    window.CAP_13 = CAP_13;
    window.CAP_13 = CAP_13;
}
