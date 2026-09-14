/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 28
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 28 — CAPÍTULO 28
// ═══════════════════════════════════════════════════════

const CAP_28 = {
    "id": 28,
    "artifactReward": null,
    "title": "Capítulo 28",
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
        "title": "INSTANTIATE E DESTROY DINÂMICOS: SPAWN, COORDENADAS E TEMPO DE VIDA",
        "explanation": "A geração e remoção de entidades em tempo de execução no Unity:\n<ul>\n  <li><strong><code>Instantiate(prefab, position, rotation)</code>:</strong> Clona o prefab nas coordenadas do mundo com rotação definida.</li>\n  <li><strong><code>Destroy(gameObject, delay)</code>:</strong> Agenda a destruição e liberação do objeto após o tempo informado.</li>\n  <li><strong>Parentesco no Spawn:</strong> Define um transform pai para organizar a hierarquia da cena.</li>\n  <li><strong>Limpeza Automática:</strong> Evita acúmulo de projéteis perdidos destruindo após o tempo de vida (LifeTime).</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploSpawn : MonoBehaviour\n{\n    void Start()\n    {\n        string prefab = \"Projetil_Fogo\";\n        Vector3 spawnPos = new Vector3(0, 1, 5);\n        float tempoVida = 3.0f;\n\n        Debug.Log(\"Instantiate: \" + prefab + \" gerado na posicao (\" + spawnPos.x + \", \" + spawnPos.y + \", \" + spawnPos.z + \")\");\n        Debug.Log(\"Destroy: Agendado para \" + tempoVida + \"s\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Gerador de Projéteis Dinâmicos com Spawn e Descarte",
        "code": "using UnityEngine;\n\npublic class GeradorProjeteis : MonoBehaviour\n{\n    void Start()\n    {\n        string prefabBala = \"Flecha_Magica\";\n        int quantidade = 3;\n\n        for (int i = 1; i <= quantidade; i++)\n        {\n            Debug.Log(\"Instantiate #\" + i + \": \" + prefabBala + \" gerado na cena!\");\n        }\n        Debug.Log(\"Rotina de Destruicao com Delay de 4s ativada.\");\n    }\n}",
        "output": "Instantiate #1: Flecha_Magica gerado na cena!\nInstantiate #2: Flecha_Magica gerado na cena!\nInstantiate #3: Flecha_Magica gerado na cena!\nRotina de Destruicao com Delay de 4s ativada."
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique a quantidade de prefabs instanciados.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        string prefab = \"Bomba_Arcana\";\n        Debug.Log(\"Spawn: \" + prefab);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o nome do prefab e a posição de spawn, emitindo no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string prefab = \"Mina_Terrestre\";\n        Debug.Log(\"Instantiate: \" + prefab);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string prefab = \"Mina_Terrestre\";\n        Debug.Log(\"Instantiate: \" + prefab);\n    }\n}",
                "hint": "Instantiate: Mina_Terrestre"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_28_1",
            "title": "Instanciação Dinâmica de Prefab",
            "difficulty": "easy",
            "description": "Declare string prefabNome = \"Projetil_Fogo\";. Emita no console: 'Instantiate: ' + prefabNome + ' gerado com sucesso.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string prefabNome",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare prefabNome e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string prefabNome = \"Projetil_Fogo\";\n        Debug.Log(\"Instantiate: \" + prefabNome + \" gerado com sucesso.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Instantiate: Projetil_Fogo gerado com sucesso.",
                    "description": "Instantiate básico"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina prefabNome = \"Projetil_Fogo\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Instantiate: Projetil_Fogo gerado com sucesso."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Instantiate: \" + prefabNome + \" gerado com sucesso.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string prefabNome", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Instantiate: Projetil_Fogo gerado com sucesso.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_28_2",
            "title": "Spawn com Posição Vector3 Específica",
            "difficulty": "easy",
            "description": "Declare Vector3 spawnPos = new Vector3(0, 1, 5);. Emita no console: 'Spawn na Posicao: (' + spawnPos.x + ', ' + spawnPos.y + ', ' + spawnPos.z + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 spawnPos",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o spawnPos e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 spawnPos = new Vector3(0, 1, 5);\n        Debug.Log(\"Spawn na Posicao: (\" + spawnPos.x + \", \" + spawnPos.y + \", \" + spawnPos.z + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Spawn na Posicao: (0, 1, 5)",
                    "description": "Posicionamento no spawn"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie spawnPos = new Vector3(0, 1, 5)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Spawn na Posicao: (0, 1, 5)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Spawn na Posicao: (\" + spawnPos.x + \", \" + spawnPos.y + \", \" + spawnPos.z + \")\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 spawnPos", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Spawn na Posicao: (0, 1, 5)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_28_3",
            "title": "Destruição com Temporizador (Delay)",
            "difficulty": "medium",
            "description": "Declare float tempoVida = 3.0f;. Emita no console: 'Destroy: Objeto Destruido Apos ' + tempoVida + 's.'.",
            "validationRules": {
                "requiredPatterns": [
                    "tempoVida",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoVida e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoVida = 3.0f;\n        Debug.Log(\"Destroy: Objeto Destruido Apos \" + tempoVida + \"s.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Destroy: Objeto Destruido Apos 3s.",
                    "description": "Destruição temporizada"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina tempoVida = 3.0f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Destroy: Objeto Destruido Apos 3s."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Destroy: Objeto Destruido Apos \" + tempoVida + \"s.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["tempoVida", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Destroy: Objeto Destruido Apos 3s.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_28_4",
            "title": "Spawn Sequencial de Projéteis em Laço",
            "difficulty": "medium",
            "description": "Utilizando um laço for (int i = 1; i <= 3; i++), gere 3 instâncias e emita em cada iteração: 'Instancia #' + i + ' criada na cena'.",
            "validationRules": {
                "requiredPatterns": [
                    "for",
                    "i <=",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Gere 3 instâncias com for\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Instancia #\" + i + \" criada na cena\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Instancia #1 criada na cena\nInstancia #2 criada na cena\nInstancia #3 criada na cena",
                    "description": "Spawn em lote com for"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use for (int i = 1; i <= 3; i++)."
                },
                {
                    "level": "II",
                    "text": "A saída terá 3 linhas numeradas de 1 a 3."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfor (int i = 1; i <= 3; i++) {\n    Debug.Log(\"Instancia #\" + i + \" criada na cena\");\n}"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["for", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Instancia #1 criada na cena";
          const expLast = "Instancia #3 criada na cena";
          if (!output.includes(expFirst) || !output.includes(expLast)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_28_5",
            "artifactReward": {
                "artifactId": "Crown_Spire",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Gerenciador de Spawn Dinâmico Completo",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorSpawn com public void SpawnarEntidade(string nomePrefab, float x, float z) { Debug.Log(\"Spawn Realizado: [\" + nomePrefab + \"] em (\" + x + \", \" + z + \")\"); }. Instancie e execute para nomePrefab = \"Lobo_Sombrio\", x = 12.0f e z = 24.0f.",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorSpawn",
                    "SpawnarEntidade",
                    "new GerenciadorSpawn()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorSpawn\n{\n    public void SpawnarEntidade(string nomePrefab, float x, float z)\n    {\n        Debug.Log(\"Spawn Realizado: [\" + nomePrefab + \"] em (\" + x + \", \" + z + \")\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute SpawnarEntidade\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorSpawn\n{\n    public void SpawnarEntidade(string nomePrefab, float x, float z)\n    {\n        Debug.Log(\"Spawn Realizado: [\" + nomePrefab + \"] em (\" + x + \", \" + z + \")\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorSpawn spawner = new GerenciadorSpawn();\n        spawner.SpawnarEntidade(\"Lobo_Sombrio\", 12.0f, 24.0f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Spawn Realizado: [Lobo_Sombrio] em (12, 24)",
                    "description": "Spawner de entidades dinâmicas"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorSpawn spawner = new GerenciadorSpawn(); e chame SpawnarEntidade(\"Lobo_Sombrio\", 12.0f, 24.0f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Spawn Realizado: [Lobo_Sombrio] em (12, 24)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorSpawn spawner = new GerenciadorSpawn();\nspawner.SpawnarEntidade(\"Lobo_Sombrio\", 12.0f, 24.0f);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class GerenciadorSpawn", "SpawnarEntidade", "new GerenciadorSpawn()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Spawn Realizado: [Lobo_Sombrio] em (12, 24)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_28, CAP_28: CAP_28 };
}
if (typeof window !== "undefined") {
    window.CAP_28 = CAP_28;
    window.CAP_28 = CAP_28;
}
