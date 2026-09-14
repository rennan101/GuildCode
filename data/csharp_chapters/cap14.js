/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 14
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 14 — CAPÍTULO 14
// ═══════════════════════════════════════════════════════

const CAP_14 = {
    "id": 14,
    "artifactReward": null,
    "title": "Capítulo 14",
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
        "title": "VETORES 3D & DISTÂNCIAS: MAGNITUDE, DISTANCE E ALCANCE DE COMBATE",
        "explanation": "A matemática vetorial é a espinha dorsal de distâncias e perseguição no Unity:\n<ul>\n  <li><strong>Vetor de Diferença (<code>alvo - origem</code>):</strong> Aponta na direção exata que vai do herói até o monstro.</li>\n  <li><strong>Distância Linear (<code>Vector3.Distance</code>):</strong> Retorna o comprimento em metros entre duas coordenadas 3D.</li>\n  <li><strong>Verificação de Alcance:</strong> Compara a distância com o raio de ataque (ex: <code>distancia &lt;= alcanceAtaque</code>).</li>\n  <li><strong>Normalização:</strong> Transforma o vetor em tamanho 1 (unitário) para guiar a velocidade sem acelerar na diagonal.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploVetores : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 heroi = new Vector3(0, 0, 0);\n        Vector3 monstro = new Vector3(0, 0, 8);\n        float alcance = 10.0f;\n        float distancia = monstro.z - heroi.z;\n\n        Debug.Log(\"Distancia ate o Inimigo: \" + distancia + \"m\");\n        if (distancia <= alcance)\n        {\n            Debug.Log(\"Inimigo dentro do Alcance de Ataque!\");\n        }\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Radar de Proximidade de Inimigos",
        "code": "using UnityEngine;\n\npublic class RadarInimigos : MonoBehaviour\n{\n    void Start()\n    {\n        float posX = 3.0f;\n        float posY = 4.0f;\n        // Teorema de Pitágoras no plano: 3^2 + 4^2 = 9 + 16 = 25 -> raiz = 5\n        float distLinear = 5.0f;\n\n        Debug.Log(\"Posicao Inimigo: (\" + posX + \", \" + posY + \")\");\n        Debug.Log(\"Distancia Radial Calculada: \" + distLinear + \" metros\");\n    }\n}",
        "output": "Posicao Inimigo: (3, 4)\nDistancia Radial Calculada: 5 metros"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os valores de alcance e verifique a condição de combate.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        float dist = 4.5f;\n        float alcanceMax = 5.0f;\n        Debug.Log(\"Alvo detectado? \" + (dist <= alcanceMax));\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Calcule a distância linear entre posA e posB e emita o log:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float posA = 2.0f;\n        float posB = 10.0f;\n        Debug.Log(\"Distancia: \" + (posB - posA) + \"m\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float posA = 2.0f;\n        float posB = 10.0f;\n        Debug.Log(\"Distancia: \" + (posB - posA) + \"m\");\n    }\n}",
                "hint": "Distancia: 8m"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_14_1",
            "title": "Cálculo de Distância Linear Unidimensional",
            "difficulty": "easy",
            "description": "Declare float posHeroi = 5.0f; e float posMonstro = 17.0f;. Calcule float dist = posMonstro - posHeroi; e emita: 'Distancia ate o Inimigo: ' + dist + 'm'.",
            "validationRules": {
                "requiredPatterns": [
                    "posHeroi",
                    "posMonstro",
                    "dist",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a distância e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float posHeroi = 5.0f;\n        float posMonstro = 17.0f;\n        float dist = posMonstro - posHeroi;\n        Debug.Log(\"Distancia ate o Inimigo: \" + dist + \"m\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Distancia ate o Inimigo: 12m",
                    "description": "Distância linear 1D"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Calcule dist = posMonstro - posHeroi."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Distancia ate o Inimigo: 12m"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat dist = posMonstro - posHeroi;\nDebug.Log(\"Distancia ate o Inimigo: \" + dist + \"m\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["posHeroi", "posMonstro", "dist", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Distancia ate o Inimigo: 12m";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_14_2",
            "title": "Verificação de Raio de Alcance de Ataque",
            "difficulty": "easy",
            "description": "Declare float distancia = 4.0f; e float alcanceAtaque = 6.0f;. Se distancia <= alcanceAtaque, emita: 'Alvo no Alcance: Ataque Liberado!'.",
            "validationRules": {
                "requiredPatterns": [
                    "distancia",
                    "alcanceAtaque",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique com if se o alvo está no alcance\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distancia = 4.0f;\n        float alcanceAtaque = 6.0f;\n        if (distancia <= alcanceAtaque)\n        {\n            Debug.Log(\"Alvo no Alcance: Ataque Liberado!\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Alvo no Alcance: Ataque Liberado!",
                    "description": "Checagem de raio de combate"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Faça if (distancia <= alcanceAtaque)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Alvo no Alcance: Ataque Liberado!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nif (distancia <= alcanceAtaque) {\n    Debug.Log(\"Alvo no Alcance: Ataque Liberado!\");\n}"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["distancia", "alcanceAtaque", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Alvo no Alcance: Ataque Liberado!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_14_3",
            "title": "Direção Unitária Normalizada",
            "difficulty": "medium",
            "description": "Declare Vector3 dir = new Vector3(0, 0, 1);. Emita no console: 'Vetor Direcional Normalizado: (' + dir.x + ', ' + dir.y + ', ' + dir.z + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 dir",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o vetor unitário e imprima\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 dir = new Vector3(0, 0, 1);\n        Debug.Log(\"Vetor Direcional Normalizado: (\" + dir.x + \", \" + dir.y + \", \" + dir.z + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Vetor Direcional Normalizado: (0, 0, 1)",
                    "description": "Vetor unitário"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina dir = new Vector3(0, 0, 1)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Vetor Direcional Normalizado: (0, 0, 1)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 dir = new Vector3(0, 0, 1);\nDebug.Log(\"Vetor Direcional Normalizado: (\" + dir.x + \", \" + dir.y + \", \" + dir.z + \")\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 dir", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Vetor Direcional Normalizado: (0, 0, 1)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_14_4",
            "title": "Verificação de Zona de Perigo por Proximidade",
            "difficulty": "medium",
            "description": "Crie a classe SensorProximidade com o método public bool EstaMuitoPerto(float dist, float limite) { return dist < limite; }. Instancie e teste para dist = 2.5f e limite = 3.0f. Se retornar true, emita: 'Alerta: Inimigo em Zona Critica!'.",
            "validationRules": {
                "requiredPatterns": [
                    "class SensorProximidade",
                    "EstaMuitoPerto",
                    "new SensorProximidade()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class SensorProximidade\n{\n    public bool EstaMuitoPerto(float dist, float limite)\n    {\n        return dist < limite;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e teste a proximidade\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class SensorProximidade\n{\n    public bool EstaMuitoPerto(float dist, float limite)\n    {\n        return dist < limite;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        SensorProximidade sensor = new SensorProximidade();\n        bool alerta = sensor.EstaMuitoPerto(2.5f, 3.0f);\n        if (alerta)\n        {\n            Debug.Log(\"Alerta: Inimigo em Zona Critica!\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Alerta: Inimigo em Zona Critica!",
                    "description": "Sensor de zona crítica"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie SensorProximidade sensor = new SensorProximidade(); e cheque o retorno."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Alerta: Inimigo em Zona Critica!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nSensorProximidade sensor = new SensorProximidade();\nif (sensor.EstaMuitoPerto(2.5f, 3.0f)) {\n    Debug.Log(\"Alerta: Inimigo em Zona Critica!\");\n}"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class SensorProximidade", "EstaMuitoPerto", "new SensorProximidade()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Alerta: Inimigo em Zona Critica!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_14_5",
            "artifactReward": {
                "artifactId": "Crown_Void",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Calculador Completo de Vetor e Distância 3D",
            "difficulty": "medium",
            "description": "Crie a classe CalculadorDistancia com o método public float ObterDistanciaTotal(float dx, float dy, float dz) { return dx + dy + dz; }. Instancie e calcule para dx = 3, dy = 4, dz = 5, emitindo: 'Distancia Manhattan Calculada: ' + distTotal + 'm'.",
            "validationRules": {
                "requiredPatterns": [
                    "class CalculadorDistancia",
                    "ObterDistanciaTotal",
                    "new CalculadorDistancia()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class CalculadorDistancia\n{\n    public float ObterDistanciaTotal(float dx, float dy, float dz)\n    {\n        return dx + dy + dz;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute para dx=3, dy=4, dz=5\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class CalculadorDistancia\n{\n    public float ObterDistanciaTotal(float dx, float dy, float dz)\n    {\n        return dx + dy + dz;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        CalculadorDistancia calc = new CalculadorDistancia();\n        float distTotal = calc.ObterDistanciaTotal(3, 4, 5);\n        Debug.Log(\"Distancia Manhattan Calculada: \" + distTotal + \"m\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Distancia Manhattan Calculada: 12m",
                    "description": "Cálculo vetorial tridimensional"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie CalculadorDistancia calc = new CalculadorDistancia(); e calcule com (3, 4, 5)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Distancia Manhattan Calculada: 12m"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nCalculadorDistancia calc = new CalculadorDistancia();\nfloat distTotal = calc.ObterDistanciaTotal(3, 4, 5);\nDebug.Log(\"Distancia Manhattan Calculada: \" + distTotal + \"m\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class CalculadorDistancia", "ObterDistanciaTotal", "new CalculadorDistancia()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Distancia Manhattan Calculada: 12m";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_14, CAP_14: CAP_14 };
}
if (typeof window !== "undefined") {
    window.CAP_14 = CAP_14;
    window.CAP_14 = CAP_14;
}
