/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 21
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 21 — CAPÍTULO 21
// ═══════════════════════════════════════════════════════

const CAP_21 = {
    "id": 21,
    "artifactReward": null,
    "title": "Capítulo 21",
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
        "title": "TERRENO E VEGETAÇÃO: HEIGHTMAP, ELEVAÇÃO E BIOMAS NO UNITY",
        "explanation": "O sistema de Terrain permite criar ambientes naturais de larga escala:\n<ul>\n  <li><strong>Heightmap (Mapa de Elevação):</strong> Matriz de alturas que esculpe vales, planícies e montanhas.</li>\n  <li><strong>Amostragem de Altura (<code>SampleHeight</code>):</strong> Posiciona entidades e árvores perfeitamente alinhadas ao relevo do solo.</li>\n  <li><strong>Pintura de Camadas (Terrain Layers):</strong> Texturas de grama, rocha, terra e areia mescladas com splatmaps.</li>\n  <li><strong>Vegetação e Detalhes:</strong> Geração procedural de árvores e arbustos com vento e densidade controlada.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploTerreno : MonoBehaviour\n{\n    void Start()\n    {\n        float posX = 50.0f;\n        float posZ = 120.0f;\n        float alturaTerreno = 15.4f;\n\n        Debug.Log(\"Ponto do Mapa: (\" + posX + \", \" + posZ + \")\");\n        Debug.Log(\"Altura Amostrada no Solo: \" + alturaTerreno + \"m\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Posicionador de Árvores no Terreno",
        "code": "using UnityEngine;\n\npublic class SpawnerVegetacao : MonoBehaviour\n{\n    void Start()\n    {\n        int arvoresGeradas = 80;\n        string bioma = \"Floresta_Arcana\";\n        float densidade = 0.85f;\n\n        Debug.Log(\"Bioma Ativo: \" + bioma);\n        Debug.Log(\"Vegetacao Instanciada: \" + arvoresGeradas + \" arvores (Densidade: \" + densidade + \")\");\n    }\n}",
        "output": "Bioma Ativo: Floresta_Arcana\nVegetacao Instanciada: 80 arvores (Densidade: 0.85)"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique a densidade e o tipo de bioma.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        string bioma = \"Deserto_Cristal\";\n        Debug.Log(\"Bioma Atual: \" + bioma);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o nome do bioma e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string bioma = \"Planicie_Dourada\";\n        Debug.Log(\"Regiao: \" + bioma);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string bioma = \"Planicie_Dourada\";\n        Debug.Log(\"Regiao: \" + bioma);\n    }\n}",
                "hint": "Regiao: Planicie_Dourada"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_21_1",
            "title": "Amostragem de Altura do Terreno (SampleHeight)",
            "difficulty": "easy",
            "description": "Declare float altitudeSolo = 22.5f;. Emita no console: 'Altitude do Terreno no Ponto: ' + altitudeSolo + ' metros'.",
            "validationRules": {
                "requiredPatterns": [
                    "altitudeSolo",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare altitudeSolo e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float altitudeSolo = 22.5f;\n        Debug.Log(\"Altitude do Terreno no Ponto: \" + altitudeSolo + \" metros\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Altitude do Terreno no Ponto: 22.5 metros",
                    "description": "Amostragem de relevo"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina altitudeSolo = 22.5f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Altitude do Terreno no Ponto: 22.5 metros"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat altitudeSolo = 22.5f;\nDebug.Log(\"Altitude do Terreno no Ponto: \" + altitudeSolo + \" metros\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["altitudeSolo", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Altitude do Terreno no Ponto: 22.5 metros";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_21_2",
            "title": "Geração em Lote de Árvores no Bioma",
            "difficulty": "easy",
            "description": "Declare int totalArvores = 150; e string tipoArvore = \"Carvalho_Magico\";. Emita: 'Bioma Povoado com ' + totalArvores + ' arvores do tipo ' + tipoArvore + '.'.",
            "validationRules": {
                "requiredPatterns": [
                    "totalArvores",
                    "tipoArvore",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis de vegetação e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalArvores = 150;\n        string tipoArvore = \"Carvalho_Magico\";\n        Debug.Log(\"Bioma Povoado com \" + totalArvores + \" arvores do tipo \" + tipoArvore + \".\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Bioma Povoado com 150 arvores do tipo Carvalho_Magico.",
                    "description": "Povoamento de vegetação"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina totalArvores = 150 e tipoArvore = \"Carvalho_Magico\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Bioma Povoado com 150 arvores do tipo Carvalho_Magico."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Bioma Povoado com \" + totalArvores + \" arvores do tipo \" + tipoArvore + \".\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["totalArvores", "tipoArvore", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Bioma Povoado com 150 arvores do tipo Carvalho_Magico.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_21_3",
            "title": "Cálculo de Desnível de Terreno",
            "difficulty": "medium",
            "description": "Declare float alturaBase = 10.0f; float alturaPico = 45.0f;. Calcule a diferença de elevação e emita: 'Inclinacao da Encosta: ' + (alturaPico - alturaBase) + 'm de desnivel'.",
            "validationRules": {
                "requiredPatterns": [
                    "alturaBase",
                    "alturaPico",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o desnível e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float alturaBase = 10.0f;\n        float alturaPico = 45.0f;\n        Debug.Log(\"Inclinacao da Encosta: \" + (alturaPico - alturaBase) + \"m de desnivel\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Inclinacao da Encosta: 35m de desnivel",
                    "description": "Cálculo de desnível do relevo"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Subtraia alturaPico - alturaBase."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Inclinacao da Encosta: 35m de desnivel"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Inclinacao da Encosta: \" + (alturaPico - alturaBase) + \"m de desnivel\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["alturaBase", "alturaPico", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Inclinacao da Encosta: 35m de desnivel";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_21_4",
            "title": "Detector de Bioma por Altitude",
            "difficulty": "medium",
            "description": "Crie a classe ClassificadorBioma com public string ObterBiomaPorAltitude(float altura) { if (altura > 30) return \"Pico_Nevado\"; return \"Vale_Verde\"; }. Instancie e teste para altura = 38.0f, emitindo: 'Bioma Detectado: ' + bioma.",
            "validationRules": {
                "requiredPatterns": [
                    "class ClassificadorBioma",
                    "ObterBiomaPorAltitude",
                    "new ClassificadorBioma()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ClassificadorBioma\n{\n    public string ObterBiomaPorAltitude(float altura)\n    {\n        if (altura > 30) return \"Pico_Nevado\";\n        return \"Vale_Verde\";\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e teste para altura = 38.0f\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ClassificadorBioma\n{\n    public string ObterBiomaPorAltitude(float altura)\n    {\n        if (altura > 30) return \"Pico_Nevado\";\n        return \"Vale_Verde\";\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ClassificadorBioma classif = new ClassificadorBioma();\n        string bioma = classif.ObterBiomaPorAltitude(38.0f);\n        Debug.Log(\"Bioma Detectado: \" + bioma);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Bioma Detectado: Pico_Nevado",
                    "description": "Classificação de biomas por altura"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie ClassificadorBioma classif = new ClassificadorBioma(); e chame com 38.0f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Bioma Detectado: Pico_Nevado"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nClassificadorBioma classif = new ClassificadorBioma();\nstring bioma = classif.ObterBiomaPorAltitude(38.0f);\nDebug.Log(\"Bioma Detectado: \" + bioma);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class ClassificadorBioma", "ObterBiomaPorAltitude", "new ClassificadorBioma()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Bioma Detectado: Pico_Nevado";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_21_5",
            "artifactReward": {
                "artifactId": "Crown_Terra",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Alinhador de Entidades no Terreno",
            "difficulty": "medium",
            "description": "Crie a classe AlinhadorSolo com public void AlinharObjeto(string nomeObjeto, float ySolo) { Debug.Log(\"Objeto [\" + nomeObjeto + \"] assentado na altura Y=\" + ySolo + \"m\"); }. Instancie e execute para nomeObjeto = \"Bau_Mistico\" e ySolo = 14.5f.",
            "validationRules": {
                "requiredPatterns": [
                    "class AlinhadorSolo",
                    "AlinharObjeto",
                    "new AlinhadorSolo()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class AlinhadorSolo\n{\n    public void AlinharObjeto(string nomeObjeto, float ySolo)\n    {\n        Debug.Log(\"Objeto [\" + nomeObjeto + \"] assentado na altura Y: \" + ySolo + \"m\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute AlinharObjeto(\"Bau_Mistico\", 14.5f)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class AlinhadorSolo\n{\n    public void AlinharObjeto(string nomeObjeto, float ySolo)\n    {\n        Debug.Log(\"Objeto [\" + nomeObjeto + \"] assentado na altura Y: \" + ySolo + \"m\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        AlinhadorSolo alinhador = new AlinhadorSolo();\n        alinhador.AlinharObjeto(\"Bau_Mistico\", 14.5f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Objeto [Bau_Mistico] assentado na altura Y: 14.5m",
                    "description": "Alinhamento procedural no terreno"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie AlinhadorSolo alinhador = new AlinhadorSolo(); e chame AlinharObjeto(\"Bau_Mistico\", 14.5f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Objeto [Bau_Mistico] assentado na altura Y: 14.5m"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nAlinhadorSolo alinhador = new AlinhadorSolo();\nalinhador.AlinharObjeto(\"Bau_Mistico\", 14.5f);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class AlinhadorSolo", "AlinharObjeto", "new AlinhadorSolo()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Objeto [Bau_Mistico] assentado na altura Y: 14.5m";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_21, CAP_21: CAP_21 };
}
if (typeof window !== "undefined") {
    window.CAP_21 = CAP_21;
    window.CAP_21 = CAP_21;
}
