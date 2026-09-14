/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 17
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 17 — CAPÍTULO 17
// ═══════════════════════════════════════════════════════

const CAP_17 = {
    "id": 17,
    "artifactReward": null,
    "title": "Capítulo 17",
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
        "title": "COLISÕES E TRIGGERS: ONCOLLISIONENTER VS ONTRIGGERENTER",
        "explanation": "No Unity, existem duas formas distintas de interação entre Colliders:\n<ul>\n  <li><strong>Colisão Física (<code>OnCollisionEnter</code>):</strong> Gera impacto sólido com resposta física (bloqueia passagem, rebate e calcula pontos de contato).</li>\n  <li><strong>Gatilho Invisível (<code>OnTriggerEnter</code>):</strong> O colisor possui <code>isTrigger = true</code> e permite atravessar, ideal para coletar moedas, checkpoints e portais.</li>\n  <li><strong>Filtragem por Tag:</strong> Valida se o objeto tocado é o herói ou um projétil (ex: <code>other.CompareTag(\"Player\")</code>).</li>\n  <li><strong>Zonas de Dano (Lava/Espinhos):</strong> Aplicam penalidades contínuas enquanto o jogador permanece dentro do trigger.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploColisoes : MonoBehaviour\n{\n    void Start()\n    {\n        string tagAlvo = \"Player\";\n        bool ehGatilho = true;\n\n        if (ehGatilho && tagAlvo == \"Player\")\n        {\n            Debug.Log(\"OnTriggerEnter: Coletavel de Cristais resgatado!\");\n        }\n        else\n        {\n            Debug.Log(\"OnCollisionEnter: Impacto solido contra a muralha!\");\n        }\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Portão de Checkpoint com Trigger",
        "code": "using UnityEngine;\n\npublic class CheckpointGate : MonoBehaviour\n{\n    void Start()\n    {\n        string tagEntidade = \"Player\";\n        int checkpointId = 3;\n\n        if (tagEntidade == \"Player\")\n        {\n            Debug.Log(\"OnTriggerEnter: Checkpoint #\" + checkpointId + \" Ativado!\");\n            Debug.Log(\"Progresso Salvo com Sucesso!\");\n        }\n    }\n}",
        "output": "OnTriggerEnter: Checkpoint #3 Ativado!\nProgresso Salvo com Sucesso!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Alterne as tags e observe as respostas de colisão.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        string tag = \"Player\";\n        Debug.Log(\"Entrou no Trigger: \" + (tag == \"Player\"));\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Emita a mensagem de disparo do evento OnTriggerEnter:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"OnTriggerEnter: Portal Arcana Aberto\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"OnTriggerEnter: Portal Arcana Aberto\");\n    }\n}",
                "hint": "OnTriggerEnter: Portal Arcana Aberto"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_17_1",
            "title": "Detecção de Colisão Sólida (OnCollisionEnter)",
            "difficulty": "easy",
            "description": "Declare string colisorNome = \"Muralha_Ferro\";. Emita no console: 'OnCollisionEnter: Impacto fisico contra ' + colisorNome + '.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string colisorNome",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare colisorNome e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string colisorNome = \"Muralha_Ferro\";\n        Debug.Log(\"OnCollisionEnter: Impacto fisico contra \" + colisorNome + \".\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "OnCollisionEnter: Impacto fisico contra Muralha_Ferro.",
                    "description": "Colisão física sólida"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina colisorNome = \"Muralha_Ferro\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: OnCollisionEnter: Impacto fisico contra Muralha_Ferro."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring colisorNome = \"Muralha_Ferro\";\nDebug.Log(\"OnCollisionEnter: Impacto fisico contra \" + colisorNome + \".\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string colisorNome", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "OnCollisionEnter: Impacto fisico contra Muralha_Ferro.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_17_2",
            "title": "Gatilho de Coleta de Item (OnTriggerEnter)",
            "difficulty": "easy",
            "description": "Declare string itemColetado = \"Pocao_Mana\"; e int valor = 50;. Emita no console: 'OnTriggerEnter: Item ' + itemColetado + ' (+ ' + valor + ' MP)'.",
            "validationRules": {
                "requiredPatterns": [
                    "string itemColetado",
                    "valor",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis do item e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string itemColetado = \"Pocao_Mana\";\n        int valor = 50;\n        Debug.Log(\"OnTriggerEnter: Item \" + itemColetado + \" (+ \" + valor + \" MP)\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "OnTriggerEnter: Item Pocao_Mana (+ 50 MP)",
                    "description": "Gatilho de coleta"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina itemColetado = \"Pocao_Mana\" e valor = 50."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: OnTriggerEnter: Item Pocao_Mana (+ 50 MP)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring itemColetado = \"Pocao_Mana\";\nint valor = 50;\nDebug.Log(\"OnTriggerEnter: Item \" + itemColetado + \" (+ \" + valor + \" MP)\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string itemColetado", "valor", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "OnTriggerEnter: Item Pocao_Mana (+ 50 MP)";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_17_3",
            "title": "Filtragem de Colisão por Tag",
            "difficulty": "medium",
            "description": "Declare string tagColidida = \"Player\";. Verifique com if (tagColidida == \"Player\") e emita: 'Acesso Liberado para o Jogador!'. Caso contrário, emita: 'Acesso Negado'.",
            "validationRules": {
                "requiredPatterns": [
                    "tagColidida == \"Player\"",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique a tag com if/else\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tagColidida = \"Player\";\n        if (tagColidida == \"Player\")\n        {\n            Debug.Log(\"Acesso Liberado para o Jogador!\");\n        }\n        else\n        {\n            Debug.Log(\"Acesso Negado\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Acesso Liberado para o Jogador!",
                    "description": "Filtragem de tag"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use if (tagColidida == \"Player\")."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Acesso Liberado para o Jogador!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring tagColidida = \"Player\";\nif (tagColidida == \"Player\") {\n    Debug.Log(\"Acesso Liberado para o Jogador!\");\n}"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["tagColidida == \"Player\"", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Acesso Liberado para o Jogador!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_17_4",
            "title": "Zona de Dano Contínuo por Lava",
            "difficulty": "medium",
            "description": "Crie a classe ZonaLava com public int AplicarDanoQueimadura(int vidaAtual, int danoLava) { return vidaAtual - danoLava; }. Instancie e calcule para vidaAtual = 100 e danoLava = 35, emitindo: 'Vida Apos Queimadura de Lava: ' + vidaRestante + ' HP'.",
            "validationRules": {
                "requiredPatterns": [
                    "class ZonaLava",
                    "AplicarDanoQueimadura",
                    "new ZonaLava()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ZonaLava\n{\n    public int AplicarDanoQueimadura(int vidaAtual, int danoLava)\n    {\n        return vidaAtual - danoLava;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e aplique o dano de lava\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ZonaLava\n{\n    public int AplicarDanoQueimadura(int vidaAtual, int danoLava)\n    {\n        return vidaAtual - danoLava;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ZonaLava lava = new ZonaLava();\n        int vidaRestante = lava.AplicarDanoQueimadura(100, 35);\n        Debug.Log(\"Vida Apos Queimadura de Lava: \" + vidaRestante + \" HP\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Vida Apos Queimadura de Lava: 65 HP",
                    "description": "Trigger de dano de ambiente"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie ZonaLava lava = new ZonaLava(); e calcule com (100, 35)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Vida Apos Queimadura de Lava: 65 HP"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nZonaLava lava = new ZonaLava();\nint vidaRestante = lava.AplicarDanoQueimadura(100, 35);\nDebug.Log(\"Vida Apos Queimadura de Lava: \" + vidaRestante + \" HP\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class ZonaLava", "AplicarDanoQueimadura", "new ZonaLava()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Vida Apos Queimadura de Lava: 65 HP";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_17_5",
            "artifactReward": {
                "artifactId": "Crown_Dominion",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Gerenciador de Trigger de Portal de Teleporte",
            "difficulty": "medium",
            "description": "Crie a classe PortalTeleporte com public void AtivarPortal(string destino, int andar) { Debug.Log(\"Teleporte acionado para [\" + destino + \"] no Andar \" + andar + \"!\"); }. Instancie e execute para destino = \"Abismo\" e andar = 12.",
            "validationRules": {
                "requiredPatterns": [
                    "class PortalTeleporte",
                    "AtivarPortal",
                    "new PortalTeleporte()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class PortalTeleporte\n{\n    public void AtivarPortal(string destino, int andar)\n    {\n        Debug.Log(\"Teleporte acionado para [\" + destino + \"] no Andar \" + andar + \"!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e ative o portal\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class PortalTeleporte\n{\n    public void AtivarPortal(string destino, int andar)\n    {\n        Debug.Log(\"Teleporte acionado para [\" + destino + \"] no Andar \" + andar + \"!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PortalTeleporte portal = new PortalTeleporte();\n        portal.AtivarPortal(\"Abismo\", 12);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Teleporte acionado para [Abismo] no Andar 12!",
                    "description": "Trigger de teletransporte"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie PortalTeleporte portal = new PortalTeleporte(); e chame portal.AtivarPortal(\"Abismo\", 12);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Teleporte acionado para [Abismo] no Andar 12!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nPortalTeleporte portal = new PortalTeleporte();\nportal.AtivarPortal(\"Abismo\", 12);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class PortalTeleporte", "AtivarPortal", "new PortalTeleporte()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Teleporte acionado para [Abismo] no Andar 12!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_17, CAP_17: CAP_17 };
}
if (typeof window !== "undefined") {
    window.CAP_17 = CAP_17;
    window.CAP_17 = CAP_17;
}
