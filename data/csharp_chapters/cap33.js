/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 33
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 33 — CAPÍTULO 33
// ═══════════════════════════════════════════════════════

const CAP_33 = {
    "id": 33,
    "artifactReward": null,
    "title": "Capítulo 33",
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
        "title": "COROUTINES E FLUXO TEMPORAL: IENUMERATOR, YIELD RETURN E TIMERS",
        "explanation": "Coroutines permitem pausar a execução de uma função e retomá-la em quadros futuros:\n<ul>\n  <li><strong>Tipo de Retorno <code>IEnumerator</code>:</strong> Permite iterar por instruções de pausa temporal.</li>\n  <li><strong><code>yield return new WaitForSeconds(delay)</code>:</strong> Suspende a execução da corrotina pelo tempo especificado em segundos.</li>\n  <li><strong><code>StartCoroutine(Rotina())</code>:</strong> Dispara a execução assíncrona na thread principal do motor.</li>\n  <li><strong>Casos de Uso:</strong> Cooldown de magias, contadores regressivos, buffs temporários e animações por código.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploCoroutine : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoEspera = 2.5f;\n        Debug.Log(\"Coroutine Iniciada: Aguardando \" + tempoEspera + \"s...\");\n        Debug.Log(\"Tempo Decorrido: Habilidade Liberada com Sucesso!\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Cooldown de Conjuração de Magia",
        "code": "using UnityEngine;\n\npublic class CooldownMagia : MonoBehaviour\n{\n    void Start()\n    {\n        string magia = \"Meteoro_Arcano\";\n        float cooldown = 3.0f;\n\n        Debug.Log(\"1. Magia [\" + magia + \"] conjurada!\");\n        Debug.Log(\"2. Coroutine: Pausa de \" + cooldown + \"s de recarga.\");\n        Debug.Log(\"3. Recarga Concluida: Magia pronta para novo disparo!\");\n    }\n}",
        "output": "1. Magia [Meteoro_Arcano] conjurada!\n2. Coroutine: Pausa de 3s de recarga.\n3. Recarga Concluida: Magia pronta para novo disparo!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique o tempo de cooldown da corrotina.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        float t = 4.0f;\n        Debug.Log(\"Espera: \" + t + \"s\");\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o tempo de espera da corrotina e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float delay = 1.5f;\n        Debug.Log(\"WaitForSeconds: \" + delay + \"s\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float delay = 1.5f;\n        Debug.Log(\"WaitForSeconds: \" + delay + \"s\");\n    }\n}",
                "hint": "WaitForSeconds: 1.5s"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_33_1",
            "title": "Declaração de Pausa Temporal (WaitForSeconds)",
            "difficulty": "easy",
            "description": "Declare float tempoEspera = 2.0f;. Emita no console: 'yield return new WaitForSeconds: ' + tempoEspera + ' segundos.'.",
            "validationRules": {
                "requiredPatterns": [
                    "tempoEspera",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoEspera e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoEspera = 2.0f;\n        Debug.Log(\"yield return new WaitForSeconds: \" + tempoEspera + \" segundos.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "yield return new WaitForSeconds: 2 segundos.",
                    "description": "Instrução de espera"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina tempoEspera = 2.0f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: yield return new WaitForSeconds: 2 segundos."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"yield return new WaitForSeconds: \" + tempoEspera + \" segundos.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["tempoEspera", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "yield return new WaitForSeconds: 2 segundos.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_33_2",
            "title": "Inicialização de Rotina Assíncrona (StartCoroutine)",
            "difficulty": "easy",
            "description": "Declare string nomeRotina = \"RecarregarEscudo\";. Emita no console: 'StartCoroutine: Rotina [' + nomeRotina + '] disparada com sucesso.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string nomeRotina",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare nomeRotina e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nomeRotina = \"RecarregarEscudo\";\n        Debug.Log(\"StartCoroutine: Rotina [\" + nomeRotina + \"] disparada com sucesso.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "StartCoroutine: Rotina [RecarregarEscudo] disparada com sucesso.",
                    "description": "Invocação de corrotina"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina nomeRotina = \"RecarregarEscudo\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: StartCoroutine: Rotina [RecarregarEscudo] disparada com sucesso."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"StartCoroutine: Rotina [\" + nomeRotina + \"] disparada com sucesso.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string nomeRotina", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "StartCoroutine: Rotina [RecarregarEscudo] disparada com sucesso.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_33_3",
            "title": "Buff Temporário com Duração Controlada",
            "difficulty": "medium",
            "description": "Declare string buff = \"Furia_Berserker\"; float duracao = 5.0f;. Emita: 'Buff [' + buff + '] ativo por ' + duracao + 's.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string buff",
                    "duracao",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare buff e duracao e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string buff = \"Furia_Berserker\";\n        float duracao = 5.0f;\n        Debug.Log(\"Buff [\" + buff + \"] ativo por \" + duracao + \"s.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Buff [Furia_Berserker] ativo por 5s.",
                    "description": "Buff temporário"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina buff = \"Furia_Berserker\" e duracao = 5.0f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Buff [Furia_Berserker] ativo por 5s."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Buff [\" + buff + \"] ativo por \" + duracao + \"s.\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["string buff", "duracao", "Debug.Log"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Buff [Furia_Berserker] ativo por 5s.";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_33_4",
            "title": "Calculador de Tempo de Recarga Residual",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorCooldown com public float ObterTempoRestante(float total, float decorrido) { return total - decorrido; }. Instancie e calcule para total = 8.0f e decorrido = 3.5f, emitindo: 'Cooldown Restante: ' + restante + 's'.",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorCooldown",
                    "ObterTempoRestante",
                    "new GerenciadorCooldown()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorCooldown\n{\n    public float ObterTempoRestante(float total, float decorrido)\n    {\n        return total - decorrido;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule o tempo restante com (8.0f, 3.5f)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorCooldown\n{\n    public float ObterTempoRestante(float total, float decorrido)\n    {\n        return total - decorrido;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorCooldown cd = new GerenciadorCooldown();\n        float restante = cd.ObterTempoRestante(8.0f, 3.5f);\n        Debug.Log(\"Cooldown Restante: \" + restante + \"s\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Cooldown Restante: 4.5s",
                    "description": "Cálculo de cooldown residual"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorCooldown cd = new GerenciadorCooldown(); e calcule com (8.0f, 3.5f)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Cooldown Restante: 4.5s"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorCooldown cd = new GerenciadorCooldown();\nfloat restante = cd.ObterTempoRestante(8.0f, 3.5f);\nDebug.Log(\"Cooldown Restante: \" + restante + \"s\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class GerenciadorCooldown", "ObterTempoRestante", "new GerenciadorCooldown()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Cooldown Restante: 4.5s";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_33_5",
            "artifactReward": {
                "artifactId": "Crown_Temporal",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Temporizador de Ciclo Assíncrono Completo",
            "difficulty": "medium",
            "description": "Crie a classe TemporizadorMagico com public void ExecutarAposTempo(string magia, float tempo) { Debug.Log(\"Efeito da magia [\" + magia + \"] acionado apos \" + tempo + \"s!\"); }. Instancie e execute para magia = \"Julgamento_Divino\" e tempo = 3.0f.",
            "validationRules": {
                "requiredPatterns": [
                    "class TemporizadorMagico",
                    "ExecutarAposTempo",
                    "new TemporizadorMagico()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class TemporizadorMagico\n{\n    public void ExecutarAposTempo(string magia, float tempo)\n    {\n        Debug.Log(\"Efeito da magia [\" + magia + \"] acionado apos \" + tempo + \"s!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute para \"Julgamento_Divino\" e 3.0f\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class TemporizadorMagico\n{\n    public void ExecutarAposTempo(string magia, float tempo)\n    {\n        Debug.Log(\"Efeito da magia [\" + magia + \"] acionado apos \" + tempo + \"s!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        TemporizadorMagico temp = new TemporizadorMagico();\n        temp.ExecutarAposTempo(\"Julgamento_Divino\", 3.0f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Efeito da magia [Julgamento_Divino] acionado apos 3s!",
                    "description": "Execução assíncrona temporizada"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie TemporizadorMagico temp = new TemporizadorMagico(); e chame ExecutarAposTempo(\"Julgamento_Divino\", 3.0f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Efeito da magia [Julgamento_Divino] acionado apos 3s!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nTemporizadorMagico temp = new TemporizadorMagico();\ntemp.ExecutarAposTempo(\"Julgamento_Divino\", 3.0f);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class TemporizadorMagico", "ExecutarAposTempo", "new TemporizadorMagico()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Efeito da magia [Julgamento_Divino] acionado apos 3s!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_33, CAP_33: CAP_33 };
}
if (typeof window !== "undefined") {
    window.CAP_33 = CAP_33;
    window.CAP_33 = CAP_33;
}
