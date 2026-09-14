/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 31
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 31 — CAPÍTULO 31
// ═══════════════════════════════════════════════════════

const CAP_31 = {
    "id": 31,
    "artifactReward": null,
    "title": "Capítulo 31",
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
        "title": "SAVE E LOAD COM PLAYERPREFS: PERSISTÊNCIA SIMPLES E CHAVES DE REGISTRO",
        "explanation": "O <code>PlayerPrefs</code> grava dados primitivos no armazenamento persistente do sistema:\n<ul>\n  <li><strong>Tipos Suportados:</strong> <code>SetInt</code>, <code>SetFloat</code> e <code>SetString</code>.</li>\n  <li><strong>Recuperação com Valor Padrão:</strong> <code>GetInt(\"Recorde\", 0)</code> evita falhas caso a chave não exista.</li>\n  <li><strong>Verificação de Chave (<code>HasKey</code>):</strong> Checa se o jogador já possui um save prévio gravado.</li>\n  <li><strong>Gravação em Disco (<code>Save</code>):</strong> Grava os dados da memória imediatamente no disco rígido.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploPlayerPrefs : MonoBehaviour\n{\n    void Start()\n    {\n        string chaveNivel = \"NivelJogador\";\n        int nivelSalvo = 5;\n\n        Debug.Log(\"PlayerPrefs.SetInt: Salvando chave '\" + chaveNivel + \"' com valor \" + nivelSalvo);\n        Debug.Log(\"PlayerPrefs.GetInt: Nivel carregado com sucesso (\" + nivelSalvo + \")\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Gravador de Recorde e Moedas da Guilda",
        "code": "using UnityEngine;\n\npublic class SistemaSavePrefs : MonoBehaviour\n{\n    void Start()\n    {\n        int recordePontos = 14500;\n        int moedasOuro = 320;\n\n        Debug.Log(\"PlayerPrefs: Recorde Salvo = \" + recordePontos);\n        Debug.Log(\"PlayerPrefs: Moedas Salvas = \" + moedasOuro);\n        Debug.Log(\"PlayerPrefs.Save(): Dados persistidos no armazenamento!\");\n    }\n}",
        "output": "PlayerPrefs: Recorde Salvo = 14500\nPlayerPrefs: Moedas Salvas = 320\nPlayerPrefs.Save(): Dados persistidos no armazenamento!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os valores de recorde salvos.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        int pontos = 5000;\n        Debug.Log(\"Highscore: \" + pontos);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o recorde salvo e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int recorde = 12000;\n        Debug.Log(\"PlayerPrefs Recorde: \" + recorde);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int recorde = 12000;\n        Debug.Log(\"PlayerPrefs Recorde: \" + recorde);\n    }\n}",
                "hint": "PlayerPrefs Recorde: 12000"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_31_1",
            "title": "Gravando Inteiro no PlayerPrefs (SetInt)",
            "difficulty": "easy",
            "description": "Declare string chave = \"HighScore\"; int pontuacao = 9800;. Emita no console: 'PlayerPrefs.SetInt: Chave \"' + chave + '\" salva com ' + pontuacao + ' pontos.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string chave",
                    "pontuacao",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string chave = \"HighScore\";\n        int pontuacao = 9800;\n        Debug.Log(\"PlayerPrefs.SetInt: Chave [\" + chave + \"] salva com \" + pontuacao + \" pontos.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "PlayerPrefs.SetInt: Chave [HighScore] salva com 9800 pontos.",
                    "description": "Gravação de PlayerPrefs"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina chave = \"HighScore\" e pontuacao = 9800."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: PlayerPrefs.SetInt: Chave \"HighScore\" salva com 9800 pontos."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"PlayerPrefs.SetInt: Chave \\\"\" + chave + \"\\\" salva com \" + pontuacao + \" pontos.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string chave", "pontuacao", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "PlayerPrefs.SetInt: Chave [HighScore] salva com 9800 pontos.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_31_2",
            "title": "Carregando com Valor Padrão (Fallback)",
            "difficulty": "easy",
            "description": "Declare string chave = \"VolumeMusica\"; float volumeCarregado = 0.8f;. Emita: 'PlayerPrefs.GetFloat: \"' + chave + '\" carregado com valor ' + volumeCarregado + '.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string chave",
                    "volumeCarregado",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare chave e volumeCarregado e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string chave = \"VolumeMusica\";\n        float volumeCarregado = 0.8f;\n        Debug.Log(\"PlayerPrefs.GetFloat: [\" + chave + \"] carregado com valor \" + volumeCarregado + \".\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "PlayerPrefs.GetFloat: [VolumeMusica] carregado com valor 0.8.",
                    "description": "Leitura de PlayerPrefs"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina chave = \"VolumeMusica\" e volumeCarregado = 0.8f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: PlayerPrefs.GetFloat: \"VolumeMusica\" carregado com valor 0.8."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"PlayerPrefs.GetFloat: \\\"\" + chave + \"\\\" carregado com valor \" + volumeCarregado + \".\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string chave", "volumeCarregado", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "PlayerPrefs.GetFloat: [VolumeMusica] carregado com valor 0.8.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_31_3",
            "title": "Verificação de Existência de Save (HasKey)",
            "difficulty": "medium",
            "description": "Declare bool existeSave = true;. Verifique com if (existeSave) e emita: 'Save Encontrado: Carregando dados da Guilda...'.",
            "validationRules": {
                "requiredPatterns": [
                    "existeSave",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o save existe\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool existeSave = true;\n        if (existeSave)\n        {\n            Debug.Log(\"Save Encontrado: Carregando dados da Guilda...\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Save Encontrado: Carregando dados da Guilda...",
                    "description": "Checagem de chave existente"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use if (existeSave)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Save Encontrado: Carregando dados da Guilda..."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nbool existeSave = true;\nif (existeSave) {\n    Debug.Log(\"Save Encontrado: Carregando dados da Guilda...\");\n}"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["existeSave", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Save Encontrado: Carregando dados da Guilda...";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_31_4",
            "title": "Calculador de Novo Recorde Pessoal",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorRecorde com public int AtualizarRecorde(int atual, int novo) { if (novo > atual) return novo; return atual; }. Instancie e teste para atual = 5000 e novo = 7200, emitindo: 'Recorde Atualizado: ' + recordeFinal + ' pontos'.",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorRecorde",
                    "AtualizarRecorde",
                    "new GerenciadorRecorde()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorRecorde\n{\n    public int AtualizarRecorde(int atual, int novo)\n    {\n        if (novo > atual)\n        {\n            return novo;\n        }\n        else\n        {\n            return atual;\n        }\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e teste com (5000, 7200)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorRecorde\n{\n    public int AtualizarRecorde(int atual, int novo)\n    {\n        if (novo > atual) return novo;\n        return atual;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorRecorde rec = new GerenciadorRecorde();\n        int recordeFinal = rec.AtualizarRecorde(5000, 7200);\n        Debug.Log(\"Recorde Atualizado: \" + recordeFinal + \" pontos\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Recorde Atualizado: 7200 pontos",
                    "description": "Atualização de recorde"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorRecorde rec = new GerenciadorRecorde(); e calcule com (5000, 7200)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Recorde Atualizado: 7200 pontos"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorRecorde rec = new GerenciadorRecorde();\nint recordeFinal = rec.AtualizarRecorde(5000, 7200);\nDebug.Log(\"Recorde Atualizado: \" + recordeFinal + \" pontos\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class GerenciadorRecorde", "AtualizarRecorde", "new GerenciadorRecorde()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Recorde Atualizado: 7200 pontos";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_31_5",
            "artifactReward": {
                "artifactId": "Crown_Archive",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Persistência Completa com PlayerPrefs.Save()",
            "difficulty": "medium",
            "description": "Crie a classe GravadorPrefs com public void SalvarJogo(string jogador, int moedas) { Debug.Log(\"Save Completo: [\" + jogador + \"] com \" + moedas + \" moedas persistidas no disco!\"); }. Instancie e execute para jogador = \"Arkan\" e moedas = 1500.",
            "validationRules": {
                "requiredPatterns": [
                    "class GravadorPrefs",
                    "SalvarJogo",
                    "new GravadorPrefs()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GravadorPrefs\n{\n    public void SalvarJogo(string jogador, int moedas)\n    {\n        Debug.Log(\"Save Completo: [\" + jogador + \"] com \" + moedas + \" moedas persistidas no disco!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute SalvarJogo(\"Arkan\", 1500)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GravadorPrefs\n{\n    public void SalvarJogo(string jogador, int moedas)\n    {\n        Debug.Log(\"Save Completo: [\" + jogador + \"] com \" + moedas + \" moedas persistidas no disco!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GravadorPrefs gravador = new GravadorPrefs();\n        gravador.SalvarJogo(\"Arkan\", 1500);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Save Completo: [Arkan] com 1500 moedas persistidas no disco!",
                    "description": "Gravação final persistente"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GravadorPrefs gravador = new GravadorPrefs(); e chame SalvarJogo(\"Arkan\", 1500);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Save Completo: [Arkan] com 1500 moedas persistidas no disco!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGravadorPrefs gravador = new GravadorPrefs();\ngravador.SalvarJogo(\"Arkan\", 1500);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class GravadorPrefs", "SalvarJogo", "new GravadorPrefs()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Save Completo: [Arkan] com 1500 moedas persistidas no disco!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_31, CAP_31: CAP_31 };
}
if (typeof window !== "undefined") {
    window.CAP_31 = CAP_31;
    window.CAP_31 = CAP_31;
}
