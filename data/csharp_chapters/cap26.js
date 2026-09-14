/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 26
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 26 — CAPÍTULO 26
// ═══════════════════════════════════════════════════════

const CAP_26 = {
    "id": 26,
    "artifactReward": null,
    "title": "Capítulo 26",
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
        "title": "NAVMESH E IA DE PATRULHA NPC: NAVEGAÇÃO, SETDESTINATION E WAYPOINTS",
        "explanation": "O NavMesh da Unity permite que NPCs naveguem de forma autônoma e inteligente:\n<ul>\n  <li><strong>Malha Navegável (<code>NavMesh</code>):</strong> Geometria gerada (Bake) indicando onde os agentes podem andar.</li>\n  <li><strong>Agente de Navegação (<code>NavMeshAgent</code>):</strong> Componente que calcula caminhos e desvia de obstáculos.</li>\n  <li><strong>Definição de Destino (<code>SetDestination</code>):</strong> Informa as coordenadas para onde o NPC deve se mover.</li>\n  <li><strong>Patrulha por Waypoints:</strong> Alterna ciclicamente entre uma lista de pontos de patrulha.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploNavMesh : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 destino = new Vector3(25, 0, 40);\n        float velocidade = 3.5f;\n\n        Debug.Log(\"NavMeshAgent: Destino definido em (\" + destino.x + \", \" + destino.y + \", \" + destino.z + \")\");\n        Debug.Log(\"Velocidade de Deslocamento: \" + velocidade + \" m/s\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Ciclo de Patrulha do Guarda da Guilda",
        "code": "using UnityEngine;\n\npublic class PatrulhaGuarda : MonoBehaviour\n{\n    void Start()\n    {\n        int waypointAtual = 1;\n        int totalWaypoints = 4;\n        string estadoIA = \"Patrulhando\";\n\n        Debug.Log(\"IA Status: \" + estadoIA);\n        Debug.Log(\"Movendo para Waypoint #\" + waypointAtual + \" de \" + totalWaypoints);\n    }\n}",
        "output": "IA Status: Patrulhando\nMovendo para Waypoint #1 de 4"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique o waypoint de destino do agente.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        int wp = 2;\n        Debug.Log(\"Destino Waypoint: \" + wp);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o status de navegação do NavMeshAgent e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"NavMeshAgent: Rota Calculada com Sucesso\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"NavMeshAgent: Rota Calculada com Sucesso\");\n    }\n}",
                "hint": "NavMeshAgent: Rota Calculada com Sucesso"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_26_1",
            "title": "Definição de Destino com SetDestination",
            "difficulty": "easy",
            "description": "Declare Vector3 destino = new Vector3(10, 0, 30);. Emita no console: 'NavMeshAgent: SetDestination para (' + destino.x + ', ' + destino.y + ', ' + destino.z + ').'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 destino",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o destino e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 destino = new Vector3(10, 0, 30);\n        Debug.Log(\"NavMeshAgent: SetDestination para (\" + destino.x + \", \" + destino.y + \", \" + destino.z + \").\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "NavMeshAgent: SetDestination para (10, 0, 30).",
                    "description": "Destino no NavMesh"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie destino com new Vector3(10, 0, 30)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: NavMeshAgent: SetDestination para (10, 0, 30)."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"NavMeshAgent: SetDestination para (\" + destino.x + \", \" + destino.y + \", \" + destino.z + \").\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 destino", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "NavMeshAgent: SetDestination para (10, 0, 30).";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_26_2",
            "title": "Verificação de Distância Restante (remainingDistance)",
            "difficulty": "easy",
            "description": "Declare float distanciaRestante = 0.4f; float distanciaParada = 0.5f;. Se distanciaRestante <= distanciaParada, emita: 'Agente Chegou ao Destino!'.",
            "validationRules": {
                "requiredPatterns": [
                    "distanciaRestante",
                    "distanciaParada",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o agente chegou ao destino\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distanciaRestante = 0.4f;\n        float distanciaParada = 0.5f;\n        if (distanciaRestante <= distanciaParada)\n        {\n            Debug.Log(\"Agente Chegou ao Destino!\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Agente Chegou ao Destino!",
                    "description": "Checagem de parada do NavMeshAgent"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Faça if (distanciaRestante <= distanciaParada)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Agente Chegou ao Destino!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nif (distanciaRestante <= distanciaParada) {\n    Debug.Log(\"Agente Chegou ao Destino!\");\n}"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["distanciaRestante", "distanciaParada", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Agente Chegou ao Destino!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_26_3",
            "title": "Ciclo de Alternância de Waypoints",
            "difficulty": "medium",
            "description": "Declare int indiceWaypoint = 2; int totalWaypoints = 4;. Calcule o próximo com int proximo = (indiceWaypoint + 1) % totalWaypoints;. Emita: 'Indice Atual: ' + indiceWaypoint + ' -> Proximo Waypoint: ' + proximo.",
            "validationRules": {
                "requiredPatterns": [
                    "indiceWaypoint",
                    "totalWaypoints",
                    "proximo",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o próximo waypoint circular\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int indiceWaypoint = 2;\n        int totalWaypoints = 4;\n        int proximo = (indiceWaypoint + 1) % totalWaypoints;\n        Debug.Log(\"Indice Atual: \" + indiceWaypoint + \" -> Proximo Waypoint: \" + proximo);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Indice Atual: 2 -> Proximo Waypoint: 3",
                    "description": "Alternância circular de waypoints"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Calcule proximo = (indiceWaypoint + 1) % totalWaypoints."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Indice Atual: 2 -> Proximo Waypoint: 3"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nint proximo = (indiceWaypoint + 1) % totalWaypoints;\nDebug.Log(\"Indice Atual: \" + indiceWaypoint + \" -> Proximo Waypoint: \" + proximo);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["indiceWaypoint", "totalWaypoints", "proximo", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Indice Atual: 2 -> Proximo Waypoint: 3";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_26_4",
            "title": "Máquina de Estados de IA de Inimigo",
            "difficulty": "medium",
            "description": "Crie a classe InimigoIA com public string ObterEstado(float distHeroi) { if (distHeroi < 5) return \"Atacando\"; if (distHeroi < 15) return \"Perseguindo\"; return \"Patrulhando\"; }. Instancie e teste para distHeroi = 10.0f, emitindo: 'Comportamento IA: ' + estado.",
            "validationRules": {
                "requiredPatterns": [
                    "class InimigoIA",
                    "ObterEstado",
                    "new InimigoIA()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class InimigoIA\n{\n    public string ObterEstado(float distHeroi)\n    {\n        if (distHeroi < 5) return \"Atacando\";\n        if (distHeroi < 15) return \"Perseguindo\";\n        return \"Patrulhando\";\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e teste para distHeroi = 10.0f\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class InimigoIA\n{\n    public string ObterEstado(float distHeroi)\n    {\n        if (distHeroi < 5) return \"Atacando\";\n        if (distHeroi < 15) return \"Perseguindo\";\n        return \"Patrulhando\";\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        InimigoIA ia = new InimigoIA();\n        string estado = ia.ObterEstado(10.0f);\n        Debug.Log(\"Comportamento IA: \" + estado);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Comportamento IA: Perseguindo",
                    "description": "Transição de estados de IA"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie InimigoIA ia = new InimigoIA(); e calcule com 10.0f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Comportamento IA: Perseguindo"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nInimigoIA ia = new InimigoIA();\nstring estado = ia.ObterEstado(10.0f);\nDebug.Log(\"Comportamento IA: \" + estado);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class InimigoIA", "ObterEstado", "new InimigoIA()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Comportamento IA: Perseguindo";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_26_5",
            "artifactReward": {
                "artifactId": "Crown_Sentinel",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Controlador de Patrulha NPC Completo",
            "difficulty": "medium",
            "description": "Crie a classe ControladorPatrulha com public void IniciarPatrulha(string npcNome, int totalPontos) { Debug.Log(\"NPC [\" + npcNome + \"] patrulhando rota com \" + totalPontos + \" waypoints!\"); }. Instancie e execute para npcNome = \"Sentinela_Arkan\" e totalPontos = 5.",
            "validationRules": {
                "requiredPatterns": [
                    "class ControladorPatrulha",
                    "IniciarPatrulha",
                    "new ControladorPatrulha()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ControladorPatrulha\n{\n    public void IniciarPatrulha(string npcNome, int totalPontos)\n    {\n        Debug.Log(\"NPC [\" + npcNome + \"] patrulhando rota com \" + totalPontos + \" waypoints!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e inicie a patrulha\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ControladorPatrulha\n{\n    public void IniciarPatrulha(string npcNome, int totalPontos)\n    {\n        Debug.Log(\"NPC [\" + npcNome + \"] patrulhando rota com \" + totalPontos + \" waypoints!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ControladorPatrulha patrulha = new ControladorPatrulha();\n        patrulha.IniciarPatrulha(\"Sentinela_Arkan\", 5);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "NPC [Sentinela_Arkan] patrulhando rota com 5 waypoints!",
                    "description": "Controle autônomo de patrulha"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie ControladorPatrulha patrulha = new ControladorPatrulha(); e chame IniciarPatrulha(\"Sentinela_Arkan\", 5);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: NPC [Sentinela_Arkan] patrulhando rota com 5 waypoints!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nControladorPatrulha patrulha = new ControladorPatrulha();\npatrulha.IniciarPatrulha(\"Sentinela_Arkan\", 5);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class ControladorPatrulha", "IniciarPatrulha", "new ControladorPatrulha()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "NPC [Sentinela_Arkan] patrulhando rota com 5 waypoints!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_26, CAP_26: CAP_26 };
}
if (typeof window !== "undefined") {
    window.CAP_26 = CAP_26;
    window.CAP_26 = CAP_26;
}
