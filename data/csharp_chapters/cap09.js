/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 09
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 09 — CAPÍTULO 09
// ═══════════════════════════════════════════════════════

const CAP_09 = {
    "id": 9,
    "artifactReward": null,
    "title": "Capítulo 09",
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
        "title": "TRANSFORM: POSIÇÃO, ROTAÇÃO E ESCALA NO ESPAÇO 3D",
        "explanation": "O <code>Transform</code> é o componente fundamental e obrigatório de todo GameObject no Unity:\n<ul>\n  <li><strong>Posição (<code>position</code>):</strong> Vetor 3D <code>(x, y, z)</code> indicando as coordenadas da entidade no espaço do mundo.</li>\n  <li><strong>Translação (<code>Translate</code>):</strong> Desloca o objeto somando um vetor de movimento (ex: <code>transform.Translate(Vector3.forward * velocidade)</code>).</li>\n  <li><strong>Escala (<code>localScale</code>):</strong> Altera as proporções de largura, altura e profundidade do modelo 3D.</li>\n  <li><strong>Eixos Fundamentais:</strong> <code>Vector3.forward (0,0,1)</code>, <code>Vector3.up (0,1,0)</code> e <code>Vector3.right (1,0,0)</code>.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploTransform : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 posInicial = new Vector3(0, 0, 0);\n        Vector3 deslocamento = new Vector3(0, 0, 5);\n        Vector3 posFinal = new Vector3(posInicial.x + deslocamento.x, posInicial.y + deslocamento.y, posInicial.z + deslocamento.z);\n\n        Debug.Log(\"Posicao Inicial: (\" + posInicial.x + \", \" + posInicial.y + \", \" + posInicial.z + \")\");\n        Debug.Log(\"Posicao Final apos Translate: (\" + posFinal.x + \", \" + posFinal.y + \", \" + posFinal.z + \")\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Movimentador de Entidades com Vetores",
        "code": "using UnityEngine;\n\npublic class MovimentadorTransform : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 posicao = new Vector3(10, 0, 20);\n        Vector3 velocidade = new Vector3(0, 0, 5);\n        Vector3 novaPosicao = new Vector3(posicao.x + velocidade.x, posicao.y + velocidade.y, posicao.z + velocidade.z);\n\n        Debug.Log(\"Posicao Heroi: (\" + novaPosicao.x + \", \" + novaPosicao.y + \", \" + novaPosicao.z + \")\");\n        Debug.Log(\"Deslocamento Z Aplicado: \" + velocidade.z);\n    }\n}",
        "output": "Posicao Heroi: (10, 0, 25)\nDeslocamento Z Aplicado: 5"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique as coordenadas do Vector3 e observe a translação resultante.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pos = new Vector3(5, 2, 8);\n        Debug.Log(\"Coordenadas: X=\" + pos.x + \" Y=\" + pos.y + \" Z=\" + pos.z);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Crie um Vector3 pos = new Vector3(0, 5, 10); e exiba a posição Y no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pos = new Vector3(0, 5, 10);\n        Debug.Log(\"Altura Y: \" + pos.y);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pos = new Vector3(0, 5, 10);\n        Debug.Log(\"Altura Y: \" + pos.y);\n    }\n}",
                "hint": "Altura Y: 5"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_9_1",
            "title": "Definindo Posição 3D com Vector3",
            "difficulty": "easy",
            "description": "Crie um Vector3 pos = new Vector3(12, 0, 25);. Emita no console: 'Spawn Heroi em: (' + pos.x + ', ' + pos.y + ', ' + pos.z + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 pos",
                    "new Vector3(12, 0, 25)",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o Vector3 e exiba a posição\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pos = new Vector3(12, 0, 25);\n        Debug.Log(\"Spawn Heroi em: (\" + pos.x + \", \" + pos.y + \", \" + pos.z + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Spawn Heroi em: (12, 0, 25)",
                    "description": "Criação de Vector3"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie com new Vector3(12, 0, 25)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Spawn Heroi em: (12, 0, 25)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 pos = new Vector3(12, 0, 25);\nDebug.Log(\"Spawn Heroi em: (\" + pos.x + \", \" + pos.y + \", \" + pos.z + \")\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 pos", "new Vector3(12, 0, 25)", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Spawn Heroi em: (12, 0, 25)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_9_2",
            "title": "Translação e Deslocamento Linear",
            "difficulty": "easy",
            "description": "Declare Vector3 posAtual = new Vector3(0, 0, 0); e Vector3 deslocamento = new Vector3(0, 0, 10);. Calcule a nova posição em Z e emita: 'Nova Posicao Z: ' + (posAtual.z + deslocamento.z).",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 posAtual",
                    "Vector3 deslocamento",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o deslocamento e emita o resultado\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 posAtual = new Vector3(0, 0, 0);\n        Vector3 deslocamento = new Vector3(0, 0, 10);\n        Debug.Log(\"Nova Posicao Z: \" + (posAtual.z + deslocamento.z));\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Nova Posicao Z: 10",
                    "description": "Cálculo de translação"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Some posAtual.z + deslocamento.z."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Nova Posicao Z: 10"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 posAtual = new Vector3(0, 0, 0);\nVector3 deslocamento = new Vector3(0, 0, 10);\nDebug.Log(\"Nova Posicao Z: \" + (posAtual.z + deslocamento.z));"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 posAtual", "Vector3 deslocamento", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Nova Posicao Z: 10";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_9_3",
            "title": "Multiplicação de Velocidade por Tempo",
            "difficulty": "medium",
            "description": "Crie a função de física: float velocidade = 6.0f; float deltaTempo = 0.5f; float distanciaPercorrida = velocidade * deltaTempo;. Emita no console: 'Distancia Percorrida no Frame: ' + distanciaPercorrida + 'm'.",
            "validationRules": {
                "requiredPatterns": [
                    "velocidade",
                    "deltaTempo",
                    "distanciaPercorrida",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule distanciaPercorrida e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float velocidade = 6.0f;\n        float deltaTempo = 0.5f;\n        float distanciaPercorrida = velocidade * deltaTempo;\n        Debug.Log(\"Distancia Percorrida no Frame: \" + distanciaPercorrida + \"m\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Distancia Percorrida no Frame: 3m",
                    "description": "Cálculo de deslocamento proporcional ao tempo"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Multiplique velocidade * deltaTempo."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Distancia Percorrida no Frame: 3m"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat velocidade = 6.0f;\nfloat deltaTempo = 0.5f;\nfloat distanciaPercorrida = velocidade * deltaTempo;\nDebug.Log(\"Distancia Percorrida no Frame: \" + distanciaPercorrida + \"m\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["velocidade", "deltaTempo", "distanciaPercorrida", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Distancia Percorrida no Frame: 3m";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_9_4",
            "title": "Escala Proporcional com localScale",
            "difficulty": "medium",
            "description": "Crie Vector3 escala = new Vector3(2, 2, 2);. Emita no console: 'Escala Ampliada: (' + escala.x + ', ' + escala.y + ', ' + escala.z + ') | Fator: 2x'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 escala",
                    "new Vector3(2, 2, 2)",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o Vector3 de escala e imprima\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 escala = new Vector3(2, 2, 2);\n        Debug.Log(\"Escala Ampliada: (\" + escala.x + \", \" + escala.y + \", \" + escala.z + \") | Fator: 2x\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Escala Ampliada: (2, 2, 2) | Fator: 2x",
                    "description": "Ajuste de escala"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina escala com new Vector3(2, 2, 2)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Escala Ampliada: (2, 2, 2) | Fator: 2x"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 escala = new Vector3(2, 2, 2);\nDebug.Log(\"Escala Ampliada: (\" + escala.x + \", \" + escala.y + \", \" + escala.z + \") | Fator: 2x\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 escala", "new Vector3(2, 2, 2)", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Escala Ampliada: (2, 2, 2) | Fator: 2x";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_9_5",
            "artifactReward": {
                "artifactId": "Ring_Phoenix",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Calculando Vetor Direcional para o Alvo",
            "difficulty": "medium",
            "description": "Crie a classe RastreadorAlvo com o método public float CalcularDistanciaZ(float posA, float posB) que retorna posB - posA. Instancie RastreadorAlvo, calcule para posA = 5 e posB = 35, e emita: 'Distancia Restante ate o Alvo: ' + distancia + ' unidades'.",
            "validationRules": {
                "requiredPatterns": [
                    "class RastreadorAlvo",
                    "CalcularDistanciaZ",
                    "new RastreadorAlvo()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class RastreadorAlvo\n{\n    public float CalcularDistanciaZ(float posA, float posB)\n    {\n        return posB - posA;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie RastreadorAlvo, calcule e emita a distância\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class RastreadorAlvo\n{\n    public float CalcularDistanciaZ(float posA, float posB)\n    {\n        return posB - posA;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        RastreadorAlvo rastreador = new RastreadorAlvo();\n        float distancia = rastreador.CalcularDistanciaZ(5, 35);\n        Debug.Log(\"Distancia Restante ate o Alvo: \" + distancia + \" unidades\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Distancia Restante ate o Alvo: 30 unidades",
                    "description": "Cálculo de distância linear"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Chame rastreador.CalcularDistanciaZ(5, 35)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Distancia Restante ate o Alvo: 30 unidades"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nRastreadorAlvo rastreador = new RastreadorAlvo();\nfloat distancia = rastreador.CalcularDistanciaZ(5, 35);\nDebug.Log(\"Distancia Restante ate o Alvo: \" + distancia + \" unidades\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class RastreadorAlvo", "CalcularDistanciaZ", "new RastreadorAlvo()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Distancia Restante ate o Alvo: 30 unidades";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_09, CAP_9: CAP_09 };
}
if (typeof window !== "undefined") {
    window.CAP_09 = CAP_09;
    window.CAP_9 = CAP_09;
}
