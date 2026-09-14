/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 24
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 24 — CAPÍTULO 24
// ═══════════════════════════════════════════════════════

const CAP_24 = {
    "id": 24,
    "artifactReward": null,
    "title": "Capítulo 24",
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
        "title": "SISTEMAS DE PARTÍCULAS (VFX): EMISSÃO, TEMPO DE VIDA E EXPLOSÕES",
        "explanation": "O <code>ParticleSystem</code> dá vida a magias, explosões e rastros de armas:\n<ul>\n  <li><strong>Taxa de Emissão (<code>rateOverTime</code>):</strong> Quantidade contínua de partículas geradas por segundo.</li>\n  <li><strong>Explosões em Lote (Bursts):</strong> Emite dezenas ou centenas de partículas instantaneamente ao sofrer um impacto.</li>\n  <li><strong>Tempo de Vida (<code>startLifetime</code>):</strong> Duração em segundos antes de cada partícula desaparecer.</li>\n  <li><strong>Cor e Escala sobre Tempo:</strong> Modula brilho, esmaecimento (fade) e expansão.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploParticulas : MonoBehaviour\n{\n    void Start()\n    {\n        string efeito = \"Explosao_Magica\";\n        int contagemBurst = 50;\n        float duracao = 1.5f;\n\n        Debug.Log(\"VFX Disparado: \" + efeito);\n        Debug.Log(\"Burst Emitido: \" + contagemBurst + \" particulas por \" + duracao + \"s\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Disparador de Impacto de Projétil com Partículas",
        "code": "using UnityEngine;\n\npublic class ImpactoParticulas : MonoBehaviour\n{\n    void Start()\n    {\n        string nomeEfeito = \"Fagulhas_Fogo\";\n        int particulasAtivas = 30;\n\n        Debug.Log(\"ParticleSystem: \" + nomeEfeito + \" instanciado no ponto de impacto!\");\n        Debug.Log(\"Total Particulas em Voo: \" + particulasAtivas);\n    }\n}",
        "output": "ParticleSystem: Fagulhas_Fogo instanciado no ponto de impacto!\nTotal Particulas em Voo: 30"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique a contagem de partículas emitidas.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        int count = 100;\n        Debug.Log(\"Particulas Emitidas: \" + count);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o nome do efeito de partículas e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string vfx = \"Aura_Cura\";\n        Debug.Log(\"Efeito VFX: \" + vfx);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string vfx = \"Aura_Cura\";\n        Debug.Log(\"Efeito VFX: \" + vfx);\n    }\n}",
                "hint": "Efeito VFX: Aura_Cura"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_24_1",
            "title": "Emissão Contínua de Partículas por Segundo",
            "difficulty": "easy",
            "description": "Declare float taxaEmissao = 25.0f;. Emita no console: 'Taxa de Emissao: ' + taxaEmissao + ' particulas/segundo.'.",
            "validationRules": {
                "requiredPatterns": [
                    "taxaEmissao",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare taxaEmissao e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float taxaEmissao = 25.0f;\n        Debug.Log(\"Taxa de Emissao: \" + taxaEmissao + \" particulas/segundo.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Taxa de Emissao: 25 particulas/segundo.",
                    "description": "Emissão contínua de VFX"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina taxaEmissao = 25.0f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Taxa de Emissao: 25 particulas/segundo."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Taxa de Emissao: \" + taxaEmissao + \" particulas/segundo.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["taxaEmissao", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Taxa de Emissao: 25 particulas/segundo.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_24_2",
            "title": "Disparo Instantâneo em Lote (Burst VFX)",
            "difficulty": "easy",
            "description": "Declare int burstCount = 60; e string tipo = \"Faíscas_Eletricas\";. Emita: 'Burst Disparado: ' + burstCount + ' particulas de ' + tipo + '.'.",
            "validationRules": {
                "requiredPatterns": [
                    "burstCount",
                    "tipo",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int burstCount = 60;\n        string tipo = \"Faíscas_Eletricas\";\n        Debug.Log(\"Burst Disparado: \" + burstCount + \" particulas de \" + tipo + \".\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Burst Disparado: 60 particulas de Faíscas_Eletricas.",
                    "description": "Burst de partículas"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina burstCount = 60 e tipo = \"Faíscas_Eletricas\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Burst Disparado: 60 particulas de Faíscas_Eletricas."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Burst Disparado: \" + burstCount + \" particulas de \" + tipo + \".\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["burstCount", "tipo", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Burst Disparado: 60 particulas de Faíscas_Eletricas.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_24_3",
            "title": "Tempo de Vida e Velocidade Inicial",
            "difficulty": "medium",
            "description": "Declare float tempoVida = 2.0f; float velocidadeInicial = 8.0f;. Emita: 'Tempo de Vida: ' + tempoVida + 's | Velocidade Inicial: ' + velocidadeInicial + ' m/s'.",
            "validationRules": {
                "requiredPatterns": [
                    "tempoVida",
                    "velocidadeInicial",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoVida = 2.0f;\n        float velocidadeInicial = 8.0f;\n        Debug.Log(\"Tempo de Vida: \" + tempoVida + \"s | Velocidade Inicial: \" + velocidadeInicial + \" m/s\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Tempo de Vida: 2s | Velocidade Inicial: 8 m/s",
                    "description": "Tempo de vida de partículas"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina tempoVida = 2.0f e velocidadeInicial = 8.0f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Tempo de Vida: 2s | Velocidade Inicial: 8 m/s"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Tempo de Vida: \" + tempoVida + \"s | Velocidade Inicial: \" + velocidadeInicial + \" m/s\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["tempoVida", "velocidadeInicial", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Tempo de Vida: 2s | Velocidade Inicial: 8 m/s";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_24_4",
            "title": "Calculador de Partículas Totais no Ciclo",
            "difficulty": "medium",
            "description": "Crie a classe CalculadorVFX com public int ObterParticulasTotais(int taxa, int segundos) { return taxa * segundos; }. Instancie e calcule para taxa = 30 e segundos = 4, emitindo: 'Total de Particulas no Ciclo: ' + total.",
            "validationRules": {
                "requiredPatterns": [
                    "class CalculadorVFX",
                    "ObterParticulasTotais",
                    "new CalculadorVFX()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class CalculadorVFX\n{\n    public int ObterParticulasTotais(int taxa, int segundos)\n    {\n        return taxa * segundos;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule para taxa=30 e segundos=4\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class CalculadorVFX\n{\n    public int ObterParticulasTotais(int taxa, int segundos)\n    {\n        return taxa * segundos;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        CalculadorVFX vfx = new CalculadorVFX();\n        int total = vfx.ObterParticulasTotais(30, 4);\n        Debug.Log(\"Total de Particulas no Ciclo: \" + total);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Total de Particulas no Ciclo: 120",
                    "description": "Cálculo de emissão total"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie CalculadorVFX vfx = new CalculadorVFX(); e calcule com (30, 4)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Total de Particulas no Ciclo: 120"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nCalculadorVFX vfx = new CalculadorVFX();\nint total = vfx.ObterParticulasTotais(30, 4);\nDebug.Log(\"Total de Particulas no Ciclo: \" + total);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class CalculadorVFX", "ObterParticulasTotais", "new CalculadorVFX()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Total de Particulas no Ciclo: 120";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_24_5",
            "artifactReward": {
                "artifactId": "Crown_Aura",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Disparador de Efeito Visual Completo",
            "difficulty": "medium",
            "description": "Crie a classe DisparadorVFX com public void TocarEfeito(string nomeVFX) { Debug.Log(\"Efeito Especial [\" + nomeVFX + \"] ativado com sucesso!\"); }. Instancie e execute para nomeVFX = \"Lamina_Flamejante\".",
            "validationRules": {
                "requiredPatterns": [
                    "class DisparadorVFX",
                    "TocarEfeito",
                    "new DisparadorVFX()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class DisparadorVFX\n{\n    public void TocarEfeito(string nomeVFX)\n    {\n        Debug.Log(\"Efeito Especial [\" + nomeVFX + \"] ativado com sucesso!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute TocarEfeito(\"Lamina_Flamejante\")\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class DisparadorVFX\n{\n    public void TocarEfeito(string nomeVFX)\n    {\n        Debug.Log(\"Efeito Especial [\" + nomeVFX + \"] ativado com sucesso!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        DisparadorVFX vfx = new DisparadorVFX();\n        vfx.TocarEfeito(\"Lamina_Flamejante\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Efeito Especial [Lamina_Flamejante] ativado com sucesso!",
                    "description": "Invocação de efeito VFX"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie DisparadorVFX vfx = new DisparadorVFX(); e chame vfx.TocarEfeito(\"Lamina_Flamejante\");"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Efeito Especial [Lamina_Flamejante] ativado com sucesso!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDisparadorVFX vfx = new DisparadorVFX();\nvfx.TocarEfeito(\"Lamina_Flamejante\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class DisparadorVFX", "TocarEfeito", "new DisparadorVFX()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Efeito Especial [Lamina_Flamejante] ativado com sucesso!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_24, CAP_24: CAP_24 };
}
if (typeof window !== "undefined") {
    window.CAP_24 = CAP_24;
    window.CAP_24 = CAP_24;
}
