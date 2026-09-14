/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 32
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 32 — CAPÍTULO 32
// ═══════════════════════════════════════════════════════

const CAP_32 = {
    "id": 32,
    "artifactReward": null,
    "title": "Capítulo 32",
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
        "title": "SAVE E LOAD COM JSON: SERIALIZAÇÃO E ESTRUTURAS COMPLEXAS",
        "explanation": "O formato JSON permite salvar inventários, árvores de habilidades e progressos completos:\n<ul>\n  <li><strong>Serialização (<code>JsonUtility.ToJson</code>):</strong> Converte um objeto ou classe C# em uma string de texto estruturada.</li>\n  <li><strong>Desserialização (<code>JsonUtility.FromJson</code>):</strong> Reconstrói o objeto C# com todos os seus atributos a partir da string JSON.</li>\n  <li><strong>Classes com Atributo [System.Serializable]:</strong> Requisito para que o motor reconheça os campos na serialização.</li>\n  <li><strong>Persistência em Arquivos:</strong> Gravação do JSON com <code>File.WriteAllText</code> em <code>Application.persistentDataPath</code>.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class PlayerSaveData\n{\n    public string nome = \"Arkan\";\n    public int nivel = 12;\n    public int xp = 4500;\n}\n\npublic class ExemploJSON : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerSaveData save = new PlayerSaveData();\n        string json = \"{\"nome\":\"\" + save.nome + \"\",\"nivel\":\" + save.nivel + \"}\";\n\n        Debug.Log(\"Objeto Serializado para JSON: \" + json);\n        Debug.Log(\"Desserializando: Jogador \" + save.nome + \" restaurado no Nivel \" + save.nivel);\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Serializador de Inventário e Progresso",
        "code": "using UnityEngine;\n\npublic class SerializadorSave : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = \"Lyra\";\n        int capituloAtual = 6;\n        int cristais = 90;\n\n        string jsonOutput = \"{\"heroi\":\"\" + heroi + \"\",\"capitulo\":\" + capituloAtual + \",\"cristais\":\" + cristais + \"}\";\n\n        Debug.Log(\"Save JSON Gerado: \" + jsonOutput);\n        Debug.Log(\"Dados Prontos para Gravacao em Disco!\");\n    }\n}",
        "output": "Save JSON Gerado: {\"heroi\":\"Lyra\",\"capitulo\":6,\"cristais\":90}\nDados Prontos para Gravacao em Disco!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os valores dos campos salvos.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        string json = \"{\"hp\":100}\";\n        Debug.Log(\"JSON: \" + json);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Gere a string JSON e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string json = \"{\"heroi\":\"Arkan\",\"nvl\":10}\";\n        Debug.Log(\"Save: \" + json);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string json = \"{\"heroi\":\"Arkan\",\"nvl\":10}\";\n        Debug.Log(\"Save: \" + json);\n    }\n}",
                "hint": "Save: {\"heroi\":\"Arkan\",\"nvl\":10}"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_32_1",
            "title": "Montagem de String JSON de Progresso",
            "difficulty": "easy",
            "description": "Declare string nome = \"Arkan\"; int nivel = 15;. Monte a string JSON e emita no console: 'JSON: {\"nome\":\"' + nome + '\",\"nivel\":' + nivel + '}'.",
            "validationRules": {
                "requiredPatterns": [
                    "string nome",
                    "nivel",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Monte a string JSON e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nome = \"Arkan\";\n        int nivel = 15;\n        Debug.Log(\"JSON: {nome: \" + nome + \", nivel: \" + nivel + \"}\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "JSON: {nome: Arkan, nivel: 15}",
                    "description": "Montagem de JSON"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina nome = \"Arkan\" e nivel = 15."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: JSON: {\"nome\":\"Arkan\",\"nivel\":15}"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"JSON: {\\\"nome\\\":\\\"\" + nome + \"\\\",\\\"nivel\\\":\" + nivel + \"}\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string nome", "nivel", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "JSON: {nome: Arkan, nivel: 15}";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_32_2",
            "title": "Desserialização de Dados de Save",
            "difficulty": "easy",
            "description": "Declare string heroiCarregado = \"Elion\"; int xpCarregado = 3200;. Emita no console: 'Save Carregado: Heroi=' + heroiCarregado + ' | XP=' + xpCarregado + ' pts.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string heroiCarregado",
                    "xpCarregado",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis do save e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroiCarregado = \"Elion\";\n        int xpCarregado = 3200;\n        Debug.Log(\"Save Carregado: Heroi=\" + heroiCarregado + \" | XP=\" + xpCarregado + \" pts.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Save Carregado: Heroi=Elion | XP=3200 pts.",
                    "description": "Dados desserializados"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina heroiCarregado = \"Elion\" e xpCarregado = 3200."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Save Carregado: Heroi=Elion | XP=3200 pts."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Save Carregado: Heroi=\" + heroiCarregado + \" | XP=\" + xpCarregado + \" pts.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string heroiCarregado", "xpCarregado", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Save Carregado: Heroi=Elion | XP=3200 pts.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_32_3",
            "title": "Caminho Persistente de Gravação em Disco",
            "difficulty": "medium",
            "description": "Declare string caminho = \"AppData/Saves/savegame.json\";. Emita no console: 'Caminho do Arquivo JSON: ' + caminho + ' | Pronto para escrita.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string caminho",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare caminho e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string caminho = \"AppData/Saves/savegame.json\";\n        Debug.Log(\"Caminho do Arquivo JSON: \" + caminho + \" | Pronto para escrita.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Caminho do Arquivo JSON: AppData/Saves/savegame.json | Pronto para escrita.",
                    "description": "Caminho do arquivo"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina caminho = \"AppData/Saves/savegame.json\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Caminho do Arquivo JSON: AppData/Saves/savegame.json | Pronto para escrita."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Caminho do Arquivo JSON: \" + caminho + \" | Pronto para escrita.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string caminho", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Caminho do Arquivo JSON: AppData/Saves/savegame.json | Pronto para escrita.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_32_4",
            "title": "Formatador de Inventário em JSON",
            "difficulty": "medium",
            "description": "Crie a classe FormatadorSave com public string FormatarItemJSON(string item, int qtd) { return \"{\\\"item\\\":\\\"\" + item + \"\\\",\\\"qtd\\\":\" + qtd + \"}\"; }. Instancie e teste para item = \"Pocao_Vida\" e qtd = 5, emitindo: \"Item Serializado: \" + json.",
            "validationRules": {
                "requiredPatterns": [
                    "class FormatadorSave",
                    "FormatarItemJSON",
                    "new FormatadorSave()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class FormatadorSave\n{\n    public string FormatarItemJSON(string nomeItem, int qtd)\n    {\n        return \"{item: \" + nomeItem + \", qtd: \" + qtd + \"}\";\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie FormatadorSave e formate com (\"Pocao_Vida\", 5)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class FormatadorSave\n{\n    public string FormatarItemJSON(string nomeItem, int qtd)\n    {\n        return \"{item: \" + nomeItem + \", qtd: \" + qtd + \"}\";\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        FormatadorSave form = new FormatadorSave();\n        string json = form.FormatarItemJSON(\"Pocao_Vida\", 5);\n        Debug.Log(\"Item Serializado: \" + json);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Item Serializado: {item: Pocao_Vida, qtd: 5}",
                    "description": "Serialização de item de inventário"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie FormatadorSave form = new FormatadorSave(); e chame FormatarItemJSON(\"Pocao_Vida\", 5);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Item Serializado: {\"item\":\"Pocao_Vida\",\"qtd\":5}"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nFormatadorSave form = new FormatadorSave();\nstring json = form.FormatarItemJSON(\"Pocao_Vida\", 5);\nDebug.Log(\"Item Serializado: \" + json);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class FormatadorSave", "FormatarItemJSON", "new FormatadorSave()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Item Serializado: {item: Pocao_Vida, qtd: 5}";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_32_5",
            "artifactReward": {
                "artifactId": "Crown_Chronicle",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Gerenciador de Save e Load JSON Completo",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorJSON com public void SalvarPerfil(string perfil, int cap) { Debug.Log(\"Save JSON: Perfil [\" + perfil + \"] gravado no Capitulo \" + cap + \" com sucesso!\"); }. Instancie e execute para perfil = \"Mestre_Guilda\" e cap = 28.",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorJSON",
                    "SalvarPerfil",
                    "new GerenciadorJSON()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorJSON\n{\n    public void SalvarPerfil(string perfil, int cap)\n    {\n        Debug.Log(\"Save JSON: Perfil [\" + perfil + \"] gravado no Capitulo \" + cap + \" com sucesso!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e salve o perfil Mestre_Guilda no capítulo 28\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorJSON\n{\n    public void SalvarPerfil(string perfil, int cap)\n    {\n        Debug.Log(\"Save JSON: Perfil [\" + perfil + \"] gravado no Capitulo \" + cap + \" com sucesso!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorJSON gm = new GerenciadorJSON();\n        gm.SalvarPerfil(\"Mestre_Guilda\", 28);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Save JSON: Perfil [Mestre_Guilda] gravado no Capitulo 28 com sucesso!",
                    "description": "Save JSON de perfil"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorJSON gm = new GerenciadorJSON(); e chame SalvarPerfil(\"Mestre_Guilda\", 28);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Save JSON: Perfil [Mestre_Guilda] gravado no Capitulo 28 com sucesso!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorJSON gm = new GerenciadorJSON();\ngm.SalvarPerfil(\"Mestre_Guilda\", 28);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class GerenciadorJSON", "SalvarPerfil", "new GerenciadorJSON()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Save JSON: Perfil [Mestre_Guilda] gravado no Capitulo 28 com sucesso!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_32, CAP_32: CAP_32 };
}
if (typeof window !== "undefined") {
    window.CAP_32 = CAP_32;
    window.CAP_32 = CAP_32;
}
