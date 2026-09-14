/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 30
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 30 — CAPÍTULO 30
// ═══════════════════════════════════════════════════════

const CAP_30 = {
    "id": 30,
    "artifactReward": null,
    "title": "Capítulo 30",
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
        "title": "SCRIPTABLEOBJECTS: ARQUITETURA MODULAR, CONTAINERS DE DADOS E EVENTOS",
        "explanation": "Os <code>ScriptableObject</code> são contêineres de dados que existem independentemente de cenas ou GameObjects:\n<ul>\n  <li><strong>Desacoplamento Total de Dados:</strong> Armazena atributos de itens, cartas, magias e inimigos em assets reutilizáveis.</li>\n  <li><strong>Economia de Memória:</strong> Centenas de instâncias na cena compartilham a mesma referência do asset sem duplicar valores.</li>\n  <li><strong>Edição em Tempo de Execução:</strong> Designers podem calibrar balanceamento de armas no editor sem recompilar código.</li>\n  <li><strong>Arquitetura Modular Baseada em Dados (Data-Driven):</strong> Facilita a criação de árvores de habilidades e inventários.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ItemData\n{\n    public string nomeItem = \"Espada_Draconica\";\n    public int danoBase = 45;\n    public int precoOuro = 300;\n}\n\npublic class ExemploScriptableObject : MonoBehaviour\n{\n    void Start()\n    {\n        ItemData espada = new ItemData();\n        Debug.Log(\"ScriptableObject Carregado: \" + espada.nomeItem);\n        Debug.Log(\"Atributos: Dano=\" + espada.danoBase + \" | Preco=\" + espada.precoOuro + \"G\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Catálogo de Dados de Armas da Guilda",
        "code": "using UnityEngine;\n\npublic class CatalogoArmas : MonoBehaviour\n{\n    void Start()\n    {\n        string nomeArma = \"Cajado_Celestial\";\n        int poderMagico = 80;\n        float pesoKg = 2.5f;\n\n        Debug.Log(\"Asset de Dados: \" + nomeArma);\n        Debug.Log(\"Poder Magico: \" + poderMagico + \" | Peso: \" + pesoKg + \"kg\");\n    }\n}",
        "output": "Asset de Dados: Cajado_Celestial\nPoder Magico: 80 | Peso: 2.5kg"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os dados do item.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        int dano = 55;\n        Debug.Log(\"Dano Asset: \" + dano);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare os dados do item e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string item = \"Escudo_Titan\";\n        int defesa = 40;\n        Debug.Log(\"Item: \" + item + \" | Defesa: \" + defesa);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string item = \"Escudo_Titan\";\n        int defesa = 40;\n        Debug.Log(\"Item: \" + item + \" | Defesa: \" + defesa);\n    }\n}",
                "hint": "Item: Escudo_Titan | Defesa: 40"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_30_1",
            "title": "Definindo Container de Dados de Item",
            "difficulty": "easy",
            "description": "Crie a classe ItemData com public string nome = \"Lança_Trovao\"; e public int dano = 65;. Instancie ItemData item = new ItemData(); e emita: 'ScriptableObject: ' + item.nome + ' | Dano: ' + item.dano.",
            "validationRules": {
                "requiredPatterns": [
                    "class ItemData",
                    "nome",
                    "dano",
                    "new ItemData()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ItemData\n{\n    public string nome = \"Lança_Trovao\";\n    public int dano = 65;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie ItemData e exiba os dados\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ItemData\n{\n    public string nome = \"Lança_Trovao\";\n    public int dano = 65;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ItemData item = new ItemData();\n        Debug.Log(\"ScriptableObject: \" + item.nome + \" | Dano: \" + item.dano);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "ScriptableObject: Lança_Trovao | Dano: 65",
                    "description": "Container de dados de item"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie ItemData item = new ItemData(); e acesse item.nome e item.dano."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: ScriptableObject: Lança_Trovao | Dano: 65"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nItemData item = new ItemData();\nDebug.Log(\"ScriptableObject: \" + item.nome + \" | Dano: \" + item.dano);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class ItemData", "nome", "dano", "new ItemData()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "ScriptableObject: Lança_Trovao | Dano: 65";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_30_2",
            "title": "Container de Estatísticas de Monstro",
            "difficulty": "easy",
            "description": "Crie a classe InimigoData com public string tipo = \"Dragao_Anciao\"; e public int vidaMaxima = 5000;. Instancie InimigoData boss = new InimigoData(); e emita: 'Dados do Boss: ' + boss.tipo + ' com ' + boss.vidaMaxima + ' HP.'.",
            "validationRules": {
                "requiredPatterns": [
                    "class InimigoData",
                    "tipo",
                    "vidaMaxima",
                    "new InimigoData()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class InimigoData\n{\n    public string tipo = \"Dragao_Anciao\";\n    public int vidaMaxima = 5000;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie InimigoData e emita os dados do boss\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class InimigoData\n{\n    public string tipo = \"Dragao_Anciao\";\n    public int vidaMaxima = 5000;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        InimigoData boss = new InimigoData();\n        Debug.Log(\"Dados do Boss: \" + boss.tipo + \" com \" + boss.vidaMaxima + \" HP.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Dados do Boss: Dragao_Anciao com 5000 HP.",
                    "description": "Dados de inimigo"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie InimigoData boss = new InimigoData(); e imprima os valores."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Dados do Boss: Dragao_Anciao com 5000 HP."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nInimigoData boss = new InimigoData();\nDebug.Log(\"Dados do Boss: \" + boss.tipo + \" com \" + boss.vidaMaxima + \" HP.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class InimigoData", "tipo", "vidaMaxima", "new InimigoData()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Dados do Boss: Dragao_Anciao com 5000 HP.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_30_3",
            "title": "Compartilhamento de Referência de Dados",
            "difficulty": "medium",
            "description": "Declare int precoItem = 250; int quantidade = 3;. Calcule o custo total e emita: 'Custo Total de Compra: ' + (precoItem * quantidade) + ' Tokens'.",
            "validationRules": {
                "requiredPatterns": [
                    "precoItem",
                    "quantidade",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o custo total e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int precoItem = 250;\n        int quantidade = 3;\n        Debug.Log(\"Custo Total de Compra: \" + (precoItem * quantidade) + \" Tokens\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Custo Total de Compra: 750 Tokens",
                    "description": "Cálculo baseado em dados de ScriptableObject"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Multiplique precoItem * quantidade."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Custo Total de Compra: 750 Tokens"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Custo Total de Compra: \" + (precoItem * quantidade) + \" Tokens\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["precoItem", "quantidade", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Custo Total de Compra: 750 Tokens";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_30_4",
            "title": "Calculador de Dano com Multiplicador de Rastreamento",
            "difficulty": "medium",
            "description": "Crie a classe CalculadorArma com public int ObterDanoCritico(int danoBase, int mult) { return danoBase * mult; }. Instancie e calcule para danoBase = 45 e mult = 2, emitindo: 'Dano Critico Calculado: ' + danoCrit.",
            "validationRules": {
                "requiredPatterns": [
                    "class CalculadorArma",
                    "ObterDanoCritico",
                    "new CalculadorArma()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class CalculadorArma\n{\n    public int ObterDanoCritico(int danoBase, int mult)\n    {\n        return danoBase * mult;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule com (45, 2)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class CalculadorArma\n{\n    public int ObterDanoCritico(int danoBase, int mult)\n    {\n        return danoBase * mult;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        CalculadorArma calc = new CalculadorArma();\n        int danoCrit = calc.ObterDanoCritico(45, 2);\n        Debug.Log(\"Dano Critico Calculado: \" + danoCrit);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Dano Critico Calculado: 90",
                    "description": "Multiplicador de dano"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie CalculadorArma calc = new CalculadorArma(); e calcule com (45, 2)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Dano Critico Calculado: 90"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nCalculadorArma calc = new CalculadorArma();\nint danoCrit = calc.ObterDanoCritico(45, 2);\nDebug.Log(\"Dano Critico Calculado: \" + danoCrit);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class CalculadorArma", "ObterDanoCritico", "new CalculadorArma()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Dano Critico Calculado: 90";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_30_5",
            "artifactReward": {
                "artifactId": "Crown_Aegis",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Carregador de ScriptableObject Completo",
            "difficulty": "medium",
            "description": "Crie a classe LeitorAsset com public void CarregarAsset(string nomeAsset, string raridade) { Debug.Log(\"Asset [\" + nomeAsset + \"] carregado com raridade: \" + raridade + \"!\"); }. Instancie e execute para nomeAsset = \"Elmo_Lendario\" e raridade = \"Mistica\".",
            "validationRules": {
                "requiredPatterns": [
                    "class LeitorAsset",
                    "CarregarAsset",
                    "new LeitorAsset()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class LeitorAsset\n{\n    public void CarregarAsset(string nomeAsset, string raridade)\n    {\n        Debug.Log(\"Asset [\" + nomeAsset + \"] carregado com raridade: \" + raridade + \"!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e carregue Elmo_Lendario com raridade Mistica\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class LeitorAsset\n{\n    public void CarregarAsset(string nomeAsset, string raridade)\n    {\n        Debug.Log(\"Asset [\" + nomeAsset + \"] carregado com raridade: \" + raridade + \"!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        LeitorAsset leitor = new LeitorAsset();\n        leitor.CarregarAsset(\"Elmo_Lendario\", \"Mistica\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Asset [Elmo_Lendario] carregado com raridade: Mistica!",
                    "description": "Carregamento de asset ScriptableObject"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie LeitorAsset leitor = new LeitorAsset(); e chame CarregarAsset(\"Elmo_Lendario\", \"Mistica\");"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Asset [Elmo_Lendario] carregado com raridade: Mistica!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nLeitorAsset leitor = new LeitorAsset();\nleitor.CarregarAsset(\"Elmo_Lendario\", \"Mistica\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class LeitorAsset", "CarregarAsset", "new LeitorAsset()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Asset [Elmo_Lendario] carregado com raridade: Mistica!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_30, CAP_30: CAP_30 };
}
if (typeof window !== "undefined") {
    window.CAP_30 = CAP_30;
    window.CAP_30 = CAP_30;
}
