/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 16
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 16 — CAPÍTULO 16
// ═══════════════════════════════════════════════════════

const CAP_16 = {
    "id": 16,
    "artifactReward": null,
    "title": "Capítulo 16",
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
        "title": "RIGIDBODY E FÍSICA 3D: MASSA, FORÇA, VELOCIDADE E GRAVIDADE",
        "explanation": "O <code>Rigidbody</code> coloca o GameObject sob o controle da simulação física da Unity:\n<ul>\n  <li><strong>Massa (<code>mass</code>):</strong> Peso do objeto em quilogramas que afeta inércia e colisões.</li>\n  <li><strong>Aplicação de Força (<code>AddForce</code>):</strong> Empurra o corpo utilizando modos contínuos (Force) ou instantâneos (Impulse).</li>\n  <li><strong>Velocidade Linear (<code>velocity</code>):</strong> Vetor que representa a direção e velocidade direta do corpo.</li>\n  <li><strong>Gravidade e Arrasto (Drag):</strong> Simula a queda natural e a resistência do ar.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploRigidbody : MonoBehaviour\n{\n    void Start()\n    {\n        float massa = 75.0f;\n        Vector3 forcaPulo = new Vector3(0, 300, 0);\n        bool usaGravidade = true;\n\n        Debug.Log(\"Massa do Corpo: \" + massa + \"kg | Gravidade: \" + usaGravidade);\n        Debug.Log(\"Impulso Aplicado: (\" + forcaPulo.x + \", \" + forcaPulo.y + \", \" + forcaPulo.z + \")\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Propulsor de Pulo Físico com Impulso",
        "code": "using UnityEngine;\n\npublic class PropulsorFisico : MonoBehaviour\n{\n    void Start()\n    {\n        float velocidadeAtualY = 0.0f;\n        float forcaImpulso = 12.0f;\n        float novaVelocidadeY = velocidadeAtualY + forcaImpulso;\n\n        Debug.Log(\"Velocidade Inicial Y: \" + velocidadeAtualY);\n        Debug.Log(\"Velocidade Pos-Impulso Y: \" + novaVelocidadeY + \" m/s\");\n    }\n}",
        "output": "Velocidade Inicial Y: 0\nVelocidade Pos-Impulso Y: 12 m/s"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os valores de massa e força aplicada.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        float massa = 50.0f;\n        Debug.Log(\"Peso do Rigidbody: \" + massa + \" kg\");\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare a força de impulso do Rigidbody e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float impulso = 15.0f;\n        Debug.Log(\"Forca de Impulso: \" + impulso + \"N\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float impulso = 15.0f;\n        Debug.Log(\"Forca de Impulso: \" + impulso + \"N\");\n    }\n}",
                "hint": "Forca de Impulso: 15N"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_16_1",
            "title": "Configuração de Massa e Gravidade no Rigidbody",
            "difficulty": "easy",
            "description": "Declare float massa = 80.0f; e bool usarGravidade = true;. Emita no console: 'Rigidbody Configurado: ' + massa + 'kg | Gravidade: ' + usarGravidade.",
            "validationRules": {
                "requiredPatterns": [
                    "massa",
                    "usarGravidade",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as propriedades e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float massa = 80.0f;\n        bool usarGravidade = true;\n        Debug.Log(\"Rigidbody Configurado: \" + massa + \"kg | Gravidade: \" + usarGravidade);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Rigidbody Configurado: 80kg | Gravidade: True",
                    "description": "Configuração do Rigidbody"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina massa = 80.0f e usarGravidade = true."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Rigidbody Configurado: 80kg | Gravidade: True"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat massa = 80.0f;\nbool usarGravidade = true;\nDebug.Log(\"Rigidbody Configurado: \" + massa + \"kg | Gravidade: \" + usarGravidade);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["massa", "usarGravidade", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Rigidbody Configurado: 80kg | Gravidade: True";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_16_2",
            "title": "Aplicação de Força de Impulso (AddForce)",
            "difficulty": "easy",
            "description": "Declare Vector3 forca = new Vector3(0, 250, 0);. Emita no console: 'Impulso Vertical de Pulo: (' + forca.x + ', ' + forca.y + ', ' + forca.z + ') Newtons'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 forca",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o vetor de força e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 forca = new Vector3(0, 250, 0);\n        Debug.Log(\"Impulso Vertical de Pulo: (\" + forca.x + \", \" + forca.y + \", \" + forca.z + \") Newtons\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Impulso Vertical de Pulo: (0, 250, 0) Newtons",
                    "description": "Força de salto"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie com new Vector3(0, 250, 0)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Impulso Vertical de Pulo: (0, 250, 0) Newtons"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 forca = new Vector3(0, 250, 0);\nDebug.Log(\"Impulso Vertical de Pulo: (\" + forca.x + \", \" + forca.y + \", \" + forca.z + \") Newtons\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["Vector3 forca", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Impulso Vertical de Pulo: (0, 250, 0) Newtons";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_16_3",
            "title": "Controle de Arrasto Linear (Drag)",
            "difficulty": "medium",
            "description": "Declare float dragAereo = 0.5f; e float dragSolo = 3.0f;. Emita: 'Friccao de Solo: ' + dragSolo + ' | Friccao no Ar: ' + dragAereo.",
            "validationRules": {
                "requiredPatterns": [
                    "dragAereo",
                    "dragSolo",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis de drag e exiba\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float dragAereo = 0.5f;\n        float dragSolo = 3.0f;\n        Debug.Log(\"Friccao de Solo: \" + dragSolo + \" | Friccao no Ar: \" + dragAereo);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Friccao de Solo: 3 | Friccao no Ar: 0.5",
                    "description": "Ajuste de fricção e drag"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina dragAereo e dragSolo e exiba os dois valores."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Friccao de Solo: 3 | Friccao no Ar: 0.5"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat dragAereo = 0.5f;\nfloat dragSolo = 3.0f;\nDebug.Log(\"Friccao de Solo: \" + dragSolo + \" | Friccao no Ar: \" + dragAereo);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["dragAereo", "dragSolo", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Friccao de Solo: 3 | Friccao no Ar: 0.5";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_16_4",
            "title": "Cálculo de Aceleração Dinâmica (F = m * a)",
            "difficulty": "medium",
            "description": "Crie a classe FisicaNewtoniana com public float CalcularAceleracao(float forcaN, float massaKg) { return forcaN / massaKg; }. Instancie e calcule para forcaN = 200 e massaKg = 50, emitindo: 'Aceleracao Resultante: ' + acel + ' m/s²'.",
            "validationRules": {
                "requiredPatterns": [
                    "class FisicaNewtoniana",
                    "CalcularAceleracao",
                    "new FisicaNewtoniana()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class FisicaNewtoniana\n{\n    public float CalcularAceleracao(float forcaN, float massaKg)\n    {\n        return forcaN / massaKg;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule a aceleração\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class FisicaNewtoniana\n{\n    public float CalcularAceleracao(float forcaN, float massaKg)\n    {\n        return forcaN / massaKg;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        FisicaNewtoniana fis = new FisicaNewtoniana();\n        float acel = fis.CalcularAceleracao(200, 50);\n        Debug.Log(\"Aceleracao Resultante: \" + acel + \" m/s²\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Aceleracao Resultante: 4 m/s²",
                    "description": "Segunda lei de Newton na física do jogo"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie FisicaNewtoniana fis = new FisicaNewtoniana(); e calcule com (200, 50)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Aceleracao Resultante: 4 m/s²"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nFisicaNewtoniana fis = new FisicaNewtoniana();\nfloat acel = fis.CalcularAceleracao(200, 50);\nDebug.Log(\"Aceleracao Resultante: \" + acel + \" m/s²\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class FisicaNewtoniana", "CalcularAceleracao", "new FisicaNewtoniana()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Aceleracao Resultante: 4 m/s²";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_16_5",
            "artifactReward": {
                "artifactId": "Crown_Glory",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Simulador de Impacto e Frenagem Físico",
            "difficulty": "medium",
            "description": "Crie a classe SimuladorFisico com public void AplicarFrenagem(float velAtual, float amortecimento) { Debug.Log(\"Velocidade Residual Apos Impacto: \" + (velAtual - amortecimento) + \" m/s\"); }. Instancie e execute para velAtual = 18.0f e amortecimento = 6.0f.",
            "validationRules": {
                "requiredPatterns": [
                    "class SimuladorFisico",
                    "AplicarFrenagem",
                    "new SimuladorFisico()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class SimuladorFisico\n{\n    public void AplicarFrenagem(float velAtual, float amortecimento)\n    {\n        Debug.Log(\"Velocidade Residual Apos Impacto: \" + (velAtual - amortecimento) + \" m/s\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute AplicarFrenagem(18.0f, 6.0f)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class SimuladorFisico\n{\n    public void AplicarFrenagem(float velAtual, float amortecimento)\n    {\n        Debug.Log(\"Velocidade Residual Apos Impacto: \" + (velAtual - amortecimento) + \" m/s\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        SimuladorFisico sim = new SimuladorFisico();\n        sim.AplicarFrenagem(18.0f, 6.0f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Velocidade Residual Apos Impacto: 12 m/s",
                    "description": "Simulação de amortecimento físico"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie SimuladorFisico sim = new SimuladorFisico(); e chame sim.AplicarFrenagem(18.0f, 6.0f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Velocidade Residual Apos Impacto: 12 m/s"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nSimuladorFisico sim = new SimuladorFisico();\nsim.AplicarFrenagem(18.0f, 6.0f);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class SimuladorFisico", "AplicarFrenagem", "new SimuladorFisico()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Velocidade Residual Apos Impacto: 12 m/s";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_16, CAP_16: CAP_16 };
}
if (typeof window !== "undefined") {
    window.CAP_16 = CAP_16;
    window.CAP_16 = CAP_16;
}
