/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 15
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 15 — CAPÍTULO 15
// ═══════════════════════════════════════════════════════

const CAP_15 = {
    "id": 15,
    "artifactReward": null,
    "title": "Capítulo 15",
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
        "title": "PLANOS 3D E RAYCASTING: LINHA DE VISÃO E DETECÇÃO DE COLISÃO",
        "explanation": "O <code>Physics.Raycast</code> projeta um raio laser invisível no mundo 3D:\n<ul>\n  <li><strong>Origem e Direção (<code>Ray</code>):</strong> Define de onde o raio parte (ex: olhos do herói) e para onde aponta (ex: <code>Vector3.forward</code>).</li>\n  <li><strong>Distância Máxima:</strong> Comprimento limite do alcance do raio de detecção.</li>\n  <li><strong>RaycastHit (Resultado do Impacto):</strong> Retorna o ponto de impacto, a normal da superfície colidida e a entidade atingida.</li>\n  <li><strong>Linha de Visão de IA (Line of Sight):</strong> Checa se há paredes bloqueando a visão do monstro até o jogador.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploRaycast : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 origem = new Vector3(0, 1, 0);\n        Vector3 direcao = new Vector3(0, 0, 1);\n        float distanciaMax = 20.0f;\n        bool atingiuObstaculo = true;\n\n        Debug.Log(\"Raio disparado da origem: (\" + origem.x + \", \" + origem.y + \", \" + origem.z + \")\");\n        if (atingiuObstaculo)\n        {\n            Debug.Log(\"Raycast Hit: Obstaculo detectado a \" + distanciaMax + \"m!\");\n        }\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Detector de Chão para Pulo do Jogador",
        "code": "using UnityEngine;\n\npublic class SensorChao : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 origemPes = new Vector3(0, 0.1f, 0);\n        Vector3 dirBaixo = new Vector3(0, -1, 0);\n        float distChao = 0.2f;\n        bool estaNoChao = true;\n\n        Debug.Log(\"Direcao do Sensor: (\" + dirBaixo.x + \", \" + dirBaixo.y + \", \" + dirBaixo.z + \")\");\n        if (estaNoChao)\n        {\n            Debug.Log(\"Status: Heroi apoiado no solo (Grounded)!\");\n        }\n    }\n}",
        "output": "Direcao do Sensor: (0, -1, 0)\nStatus: Heroi apoiado no solo (Grounded)!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Altere a distância do raio e veja o resultado do sensor.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        float alcance = 15.0f;\n        Debug.Log(\"Alcance do Raycast: \" + alcance + \" metros\");\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare a distância do raio e emita a mensagem de colisão:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float dist = 25.0f;\n        Debug.Log(\"Raycast atingiu alvo a \" + dist + \"m\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float dist = 25.0f;\n        Debug.Log(\"Raycast atingiu alvo a \" + dist + \"m\");\n    }\n}",
                "hint": "Raycast atingiu alvo a 25m"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_15_1",
            "title": "Definindo Origem e Direção do Raio",
            "difficulty": "easy",
            "description": "Crie Vector3 origem = new Vector3(0, 1, 0); e Vector3 dir = new Vector3(0, 0, 1);. Emita no console: 'Raio Configurado: Origem (' + origem.x + ', ' + origem.y + ', ' + origem.z + ') -> Direcao (' + dir.x + ', ' + dir.y + ', ' + dir.z + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 origem",
                    "Vector3 dir",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie os vetores de origem e direção e exiba\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 origem = new Vector3(0, 1, 0);\n        Vector3 dir = new Vector3(0, 0, 1);\n        Debug.Log(\"Raio Configurado: Origem (\" + origem.x + \", \" + origem.y + \", \" + origem.z + \") -> Direcao (\" + dir.x + \", \" + dir.y + \", \" + dir.z + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Raio Configurado: Origem (0, 1, 0) -> Direcao (0, 0, 1)",
                    "description": "Configuração de raio"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie origem e dir com new Vector3(...)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Raio Configurado: Origem (0, 1, 0) -> Direcao (0, 0, 1)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 origem = new Vector3(0, 1, 0);\nVector3 dir = new Vector3(0, 0, 1);\nDebug.Log(\"Raio Configurado: Origem (\" + origem.x + \", \" + origem.y + \", \" + origem.z + \") -> Direcao (\" + dir.x + \", \" + dir.y + \", \" + dir.z + \")\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 origem", "Vector3 dir", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Raio Configurado: Origem (0, 1, 0) -> Direcao (0, 0, 1)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_15_2",
            "title": "Detecção de Impacto com RaycastHit",
            "difficulty": "easy",
            "description": "Declare string objetoAtingido = \"Parede_Pedra\"; e float distanciaImpacto = 7.5f;. Emita: 'Impacto Detectado em: ' + objetoAtingido + ' a ' + distanciaImpacto + 'm'.",
            "validationRules": {
                "requiredPatterns": [
                    "string objetoAtingido",
                    "distanciaImpacto",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string objetoAtingido = \"Parede_Pedra\";\n        float distanciaImpacto = 7.5f;\n        Debug.Log(\"Impacto Detectado em: \" + objetoAtingido + \" a \" + distanciaImpacto + \"m\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Impacto Detectado em: Parede_Pedra a 7.5m",
                    "description": "Informações de RaycastHit"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina objetoAtingido = \"Parede_Pedra\" e distanciaImpacto = 7.5f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Impacto Detectado em: Parede_Pedra a 7.5m"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring objetoAtingido = \"Parede_Pedra\";\nfloat distanciaImpacto = 7.5f;\nDebug.Log(\"Impacto Detectado em: \" + objetoAtingido + \" a \" + distanciaImpacto + \"m\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string objetoAtingido", "distanciaImpacto", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Impacto Detectado em: Parede_Pedra a 7.5m";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_15_3",
            "title": "Validação de Linha de Visão Desobstruída",
            "difficulty": "medium",
            "description": "Declare bool obstaculoNoCaminho = false;. Verifique com if (!obstaculoNoCaminho) e emita: 'Linha de Visao Livre: Disparo Autorizado!'.",
            "validationRules": {
                "requiredPatterns": [
                    "obstaculoNoCaminho",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se a linha de visão está desobstruída\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool obstaculoNoCaminho = false;\n        if (!obstaculoNoCaminho)\n        {\n            Debug.Log(\"Linha de Visao Livre: Disparo Autorizado!\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Linha de Visao Livre: Disparo Autorizado!",
                    "description": "Checagem de linha de visão"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use if (!obstaculoNoCaminho)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Linha de Visao Livre: Disparo Autorizado!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nbool obstaculoNoCaminho = false;\nif (!obstaculoNoCaminho) {\n    Debug.Log(\"Linha de Visao Livre: Disparo Autorizado!\");\n}"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["obstaculoNoCaminho", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Linha de Visao Livre: Disparo Autorizado!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_15_4",
            "title": "Sensor de Altura do Terreno (Ground Check)",
            "difficulty": "medium",
            "description": "Crie a classe SensorTerreno com public float ObterDistanciaChao(float alturaHeroi, float alturaSolo) { return alturaHeroi - alturaSolo; }. Instancie e calcule para alturaHeroi = 1.8f e alturaSolo = 0.0f, emitindo: 'Distancia ate o Solo: ' + dist + 'm'.",
            "validationRules": {
                "requiredPatterns": [
                    "class SensorTerreno",
                    "ObterDistanciaChao",
                    "new SensorTerreno()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class SensorTerreno\n{\n    public float ObterDistanciaChao(float alturaHeroi, float alturaSolo)\n    {\n        return alturaHeroi - alturaSolo;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule a distância do solo\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class SensorTerreno\n{\n    public float ObterDistanciaChao(float alturaHeroi, float alturaSolo)\n    {\n        return alturaHeroi - alturaSolo;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        SensorTerreno sensor = new SensorTerreno();\n        float dist = sensor.ObterDistanciaChao(1.8f, 0.0f);\n        Debug.Log(\"Distancia ate o Solo: \" + dist + \"m\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Distancia ate o Solo: 1.8m",
                    "description": "Sensor de solo vertical"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie SensorTerreno sensor = new SensorTerreno(); e calcule com (1.8f, 0.0f)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Distancia ate o Solo: 1.8m"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nSensorTerreno sensor = new SensorTerreno();\nfloat dist = sensor.ObterDistanciaChao(1.8f, 0.0f);\nDebug.Log(\"Distancia ate o Solo: \" + dist + \"m\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class SensorTerreno", "ObterDistanciaChao", "new SensorTerreno()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Distancia ate o Solo: 1.8m";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_15_5",
            "artifactReward": {
                "artifactId": "Crown_Apex",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Disparador de Mira Laser Completo",
            "difficulty": "medium",
            "description": "Crie a classe MiraLaser com public void Mirar(string alvo, float dist) { Debug.Log(\"Laser travado em [\" + alvo + \"] a \" + dist + \"m\"); }. Instancie e execute para alvo = \"Chefe_Orc\" e dist = 14.2f.",
            "validationRules": {
                "requiredPatterns": [
                    "class MiraLaser",
                    "Mirar",
                    "new MiraLaser()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class MiraLaser\n{\n    public void Mirar(string alvo, float dist)\n    {\n        Debug.Log(\"Laser travado em [\" + alvo + \"] a \" + dist + \"m\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute Mirar(\"Chefe_Orc\", 14.2f)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class MiraLaser\n{\n    public void Mirar(string alvo, float dist)\n    {\n        Debug.Log(\"Laser travado em [\" + alvo + \"] a \" + dist + \"m\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        MiraLaser mira = new MiraLaser();\n        mira.Mirar(\"Chefe_Orc\", 14.2f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Laser travado em [Chefe_Orc] a 14.2m",
                    "description": "Sistema de mira laser com Raycast"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie MiraLaser mira = new MiraLaser(); e chame mira.Mirar(\"Chefe_Orc\", 14.2f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Laser travado em [Chefe_Orc] a 14.2m"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nMiraLaser mira = new MiraLaser();\nmira.Mirar(\"Chefe_Orc\", 14.2f);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class MiraLaser", "Mirar", "new MiraLaser()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Laser travado em [Chefe_Orc] a 14.2m";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_15, CAP_15: CAP_15 };
}
if (typeof window !== "undefined") {
    window.CAP_15 = CAP_15;
    window.CAP_15 = CAP_15;
}
