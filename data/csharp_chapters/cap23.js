/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 23
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 23 — CAPÍTULO 23
// ═══════════════════════════════════════════════════════

const CAP_23 = {
    "id": 23,
    "artifactReward": null,
    "title": "Capítulo 23",
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
        "title": "INTERFACE GRÁFICA (HUD E UI): CANVAS, TEXTMESHPRO E BARRAS DE VIDA",
        "explanation": "A interface de usuário (UI) no Unity é estruturada sobre o <code>Canvas</code>:\n<ul>\n  <li><strong>Canvas:</strong> O contêiner de renderização 2D/Overlay na tela do jogador.</li>\n  <li><strong>TextMeshPro (TMP):</strong> Renderizador de textos nítidos baseados em SDF (Signed Distance Field).</li>\n  <li><strong>Barras de Vida (Slider):</strong> Preenchimento percentual <code>(vidaAtual / vidaMaxima)</code>.</li>\n  <li><strong>Âncoras e Pivôs:</strong> Mantêm os elementos fixados nos cantos da tela em diferentes resoluções (Full HD, 4K, Mobile).</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploUI : MonoBehaviour\n{\n    void Start()\n    {\n        int vidaAtual = 75;\n        int vidaMax = 100;\n        float percentual = (float)vidaAtual / vidaMax;\n\n        Debug.Log(\"TextMeshPro HP: \" + vidaAtual + \" / \" + vidaMax);\n        Debug.Log(\"Preenchimento Slider: \" + (percentual * 100) + \"%\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Atualizador de HUD de Combate",
        "code": "using UnityEngine;\n\npublic class AtualizadorHUD : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 250;\n        int nivel = 5;\n        string nomeHeroi = \"Arkan\";\n\n        Debug.Log(\"HUD Carregado: \" + nomeHeroi + \" (Nvl \" + nivel + \")\");\n        Debug.Log(\"Tokens Acumulados: \" + moedas + \"G\");\n    }\n}",
        "output": "HUD Carregado: Arkan (Nvl 5)\nTokens Acumulados: 250G"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Altere os valores exibidos na HUD.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        int hp = 100;\n        Debug.Log(\"HP HUD: \" + hp);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o valor de vida na interface e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int hp = 85;\n        Debug.Log(\"HUD Vida: \" + hp + \" HP\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int hp = 85;\n        Debug.Log(\"HUD Vida: \" + hp + \" HP\");\n    }\n}",
                "hint": "HUD Vida: 85 HP"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_23_1",
            "title": "Atualização de Texto TextMeshPro",
            "difficulty": "easy",
            "description": "Declare string textoTMP = \"Nivel 10 - Mestre da Guilda\";. Emita no console: 'TMP Text Renderizado: \"' + textoTMP + '\".'.",
            "validationRules": {
                "requiredPatterns": [
                    "string textoTMP",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare textoTMP e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string textoTMP = \"Nivel 10 - Mestre da Guilda\";\n        Debug.Log(\"TMP Text Renderizado: \" + textoTMP);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "TMP Text Renderizado: Nivel 10 - Mestre da Guilda",
                    "description": "Texto na interface"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina textoTMP = \"Nivel 10 - Mestre da Guilda\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: TMP Text Renderizado: Nivel 10 - Mestre da Guilda"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"TMP Text Renderizado: \\\"\" + textoTMP + \"\\\".\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string textoTMP", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "TMP Text Renderizado: Nivel 10 - Mestre da Guilda";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_23_2",
            "title": "Cálculo de Preenchimento da Barra de Vida (Slider)",
            "difficulty": "easy",
            "description": "Declare int vidaAtual = 80; int vidaMaxima = 100;. Calcule float preenchimento = 1.0f * vidaAtual / vidaMaxima;. Emita: 'Preenchimento Slider HP: ' + preenchimento.",
            "validationRules": {
                "requiredPatterns": [
                    "vidaAtual",
                    "vidaMaxima",
                    "preenchimento",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o preenchimento percentual da barra\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vidaAtual = 80.0f;\n        float vidaMaxima = 100.0f;\n        float preenchimento = 0.8f;\n        Debug.Log(\"Preenchimento Slider HP: \" + preenchimento);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Preenchimento Slider HP: 0.8",
                    "description": "Slider percentual de vida"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Faça preenchimento = (float)vidaAtual / vidaMaxima."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Preenchimento Slider HP: 0.8"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat preenchimento = 0.8f;\nDebug.Log(\"Preenchimento Slider HP: \" + preenchimento);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["vidaAtual", "vidaMaxima", "preenchimento", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Preenchimento Slider HP: 0.8";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_23_3",
            "title": "Exibição de Contador de Recursos na HUD",
            "difficulty": "medium",
            "description": "Declare int cristais = 45; int tokens = 1200;. Emita: 'HUD Recursos: ' + cristais + ' Cristais | ' + tokens + ' Tokens'.",
            "validationRules": {
                "requiredPatterns": [
                    "cristais",
                    "tokens",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int cristais = 45;\n        int tokens = 1200;\n        Debug.Log(\"HUD Recursos: \" + cristais + \" Cristais | \" + tokens + \" Tokens\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "HUD Recursos: 45 Cristais | 1200 Tokens",
                    "description": "Painel de recursos"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina cristais = 45 e tokens = 1200."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: HUD Recursos: 45 Cristais | 1200 Tokens"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"HUD Recursos: \" + cristais + \" Cristais | \" + tokens + \" Tokens\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["cristais", "tokens", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "HUD Recursos: 45 Cristais | 1200 Tokens";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_23_4",
            "title": "Formatador de Barra de Mana e Vida em Classe",
            "difficulty": "medium",
            "description": "Crie a classe FormatadorHUD com public string FormatarStatus(int atual, int max) { return atual + \"/\" + max; }. Instancie e formate para atual = 120 e max = 150, emitindo: 'Status HP Formatado: ' + texto.",
            "validationRules": {
                "requiredPatterns": [
                    "class FormatadorHUD",
                    "FormatarStatus",
                    "new FormatadorHUD()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class FormatadorHUD\n{\n    public string FormatarStatus(int atual, int max)\n    {\n        return atual + \"/\" + max;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e formate com (120, 150)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class FormatadorHUD\n{\n    public string FormatarStatus(int atual, int max)\n    {\n        return atual + \"/\" + max;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        FormatadorHUD hud = new FormatadorHUD();\n        string texto = hud.FormatarStatus(120, 150);\n        Debug.Log(\"Status HP Formatado: \" + texto);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Status HP Formatado: 120/150",
                    "description": "Formatação de texto de HUD"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie FormatadorHUD hud = new FormatadorHUD(); e chame FormatarStatus(120, 150)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Status HP Formatado: 120/150"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nFormatadorHUD hud = new FormatadorHUD();\nstring texto = hud.FormatarStatus(120, 150);\nDebug.Log(\"Status HP Formatado: \" + texto);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class FormatadorHUD", "FormatarStatus", "new FormatadorHUD()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Status HP Formatado: 120/150";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_23_5",
            "artifactReward": {
                "artifactId": "Crown_Nexus",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Gerenciador Completo de Canvas e Notificações UI",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorUI com public void ExibirNotificacao(string mensagem) { Debug.Log(\"UI Notificacao: [\" + mensagem + \"]\"); }. Instancie e execute para mensagem = \"Missao Concluida!\".",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorUI",
                    "ExibirNotificacao",
                    "new GerenciadorUI()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorUI\n{\n    public void ExibirNotificacao(string mensagem)\n    {\n        Debug.Log(\"UI Notificacao: [\" + mensagem + \"]\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e exiba a notificação \"Missao Concluida!\"\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorUI\n{\n    public void ExibirNotificacao(string mensagem)\n    {\n        Debug.Log(\"UI Notificacao: [\" + mensagem + \"]\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorUI ui = new GerenciadorUI();\n        ui.ExibirNotificacao(\"Missao Concluida!\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "UI Notificacao: [Missao Concluida!]",
                    "description": "Sistema de notificação de interface"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorUI ui = new GerenciadorUI(); e chame ExibirNotificacao(\"Missao Concluida!\");"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: UI Notificacao: [Missao Concluida!]"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorUI ui = new GerenciadorUI();\nui.ExibirNotificacao(\"Missao Concluida!\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class GerenciadorUI", "ExibirNotificacao", "new GerenciadorUI()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "UI Notificacao: [Missao Concluida!]";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_23, CAP_23: CAP_23 };
}
if (typeof window !== "undefined") {
    window.CAP_23 = CAP_23;
    window.CAP_23 = CAP_23;
}
