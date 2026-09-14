/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 34
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 34 — DELEGATES E EVENTS DESACOPLADOS
// ═══════════════════════════════════════════════════════

const CAP_34 = {
    "id": 34,
    "artifactReward": null,
    "title": "Delegates e Events Desacoplados",
    "theme": "Módulo 9 — Avançado (Tópicos PTS)",
    "unlock": "Arauto de Eventos",
    "unlockIcon": "[EVENT]",
    "character": "elion",
    "xpReward": 410,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Abrindo a Rede de Mensagens Desacopladas. Padrão Observer, Delegates e Events ativos."
        },
        {
            "type": "narrative",
            "text": "Ecos de sinos transmitem avisos por todas as torres da Guilda sem que os guardas precisem conhecer uns aos outros. Elion Raven conecta emissores e ouvintes arcanos."
        },
        {
            "type": "character",
            "name": "ELION RAVEN",
            "role": "ESTRATEGISTA & ANALISTA",
            "cssClass": "elion",
            "text": "Se o seu script do Jogador precisar conhecer o script do HUD, o script de Áudio, o script de Conquistas e o script de Partículas, seu código se tornará um monólito espaguete impossível de manter! A solução sagrada são **Events e Delegates**!"
        },
        {
            "type": "character",
            "name": "LYRA NEX",
            "role": "ARQUIVISTA",
            "cssClass": "lyra",
            "text": "O jogador apenas grita ao mundo: <code>onPlayerDied?.Invoke()</code>! Ele não sabe quem está ouvindo. O HUD se inscreve para atualizar a barra, o sistema de som toca a derrota e o VFX solta fumaça — múltiplos ouvintes (Multicast) via <code>+=</code>! E no <code>OnDisable</code>, cancelamos a inscrição com <code>-=</code> para evitar vazamentos de memória!"
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "O padrão Observer desacoplado é o alicerce da arquitetura profissional de qualquer jogo em C#. Complete as 5 atividades deste capítulo."
        }
    ],
    "concept": {
        "title": "DELEGATES E EVENTS DESACOPLADOS: ACTION, OBSERVER PATTERN E CALLBACKS",
        "explanation": "Delegates e Events eliminam o acoplamento direto entre sistemas no Unity:\n<ul>\n  <li><strong><code>System.Action</code>:</strong> Tipo de delegate padrão para encapsular métodos sem retorno (void).</li>\n  <li><strong>Padrão Observer (<code>event Action</code>):</strong> Quando um evento acontece (ex: <code>OnBossMorte</code>), todos os ouvintes registrados são notificados sem que o emissor conheça a UI ou o Áudio.</li>\n  <li><strong>Inscrição e Desinscrição:</strong> Operadores <code>+=</code> para ouvir e <code>-=</code> no <code>OnDisable</code> para prevenir vazamento de memória.</li>\n  <li><strong>Invocação Segura:</strong> <code>OnEvento?.Invoke()</code> dispara o callback somente se houver assinantes ativos.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploEvents : MonoBehaviour\n{\n    void Start()\n    {\n        string emissor = \"Boss_Gargula\";\n        string ouvinteUI = \"AtualizarHUD_Vitoria\";\n        string ouvinteAudio = \"TocarFanfarraVitoria\";\n\n        Debug.Log(\"Evento Disparado por: \" + emissor);\n        Debug.Log(\"Ouvinte Notificado: \" + ouvinteUI);\n        Debug.Log(\"Ouvinte Notificado: \" + ouvinteAudio);\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Sistema Desacoplado de Notificação de Morte de Chefe",
        "code": "using UnityEngine;\n\npublic class NotificadorBoss : MonoBehaviour\n{\n    void Start()\n    {\n        string evento = \"OnBossDefeated\";\n        int recompensaXP = 2500;\n\n        Debug.Log(\"1. Evento [\" + evento + \"] invocado pelo Chefe!\");\n        Debug.Log(\"2. Sistema de Recompensa: +\" + recompensaXP + \" XP concedido aos herois!\");\n    }\n}",
        "output": "1. Evento [OnBossDefeated] invocado pelo Chefe!\n2. Sistema de Recompensa: +2500 XP concedido aos herois!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique o nome do evento e os inscritos.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        string evt = \"OnPlayerLevelUp\";\n        Debug.Log(\"Evento: \" + evt);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o evento e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string evt = \"OnItemColetado\";\n        Debug.Log(\"Disparo de Evento: \" + evt);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string evt = \"OnItemColetado\";\n        Debug.Log(\"Disparo de Evento: \" + evt);\n    }\n}",
                "hint": "Disparo de Evento: OnItemColetado"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_34_1",
            "title": "Declaração de Callback de Ação (Action Delegate)",
            "difficulty": "easy",
            "description": "Declare string nomeAcao = \"OnPlayerDeath\";. Emita no console: 'Delegate Action: Callback [' + nomeAcao + '] registrado.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string nomeAcao",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare nomeAcao e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nomeAcao = \"OnPlayerDeath\";\n        Debug.Log(\"Delegate Action: Callback [\" + nomeAcao + \"] registrado.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Delegate Action: Callback [OnPlayerDeath] registrado.",
                    "description": "Registro de delegate"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina nomeAcao = \"OnPlayerDeath\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Delegate Action: Callback [OnPlayerDeath] registrado."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Delegate Action: Callback [\" + nomeAcao + \"] registrado.\");"
                }
            ]
        },
        {
            "id": "cs_act_34_2",
            "title": "Disparo de Evento com Múltiplos Ouvintes",
            "difficulty": "easy",
            "description": "Declare int totalOuvintes = 3; e string evento = \"OnWaveComplete\";. Emita: 'Evento ' + evento + ' disparado para ' + totalOuvintes + ' sistemas assinantes.'.",
            "validationRules": {
                "requiredPatterns": [
                    "totalOuvintes",
                    "string evento",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalOuvintes = 3;\n        string evento = \"OnWaveComplete\";\n        Debug.Log(\"Evento \" + evento + \" disparado para \" + totalOuvintes + \" sistemas assinantes.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Evento OnWaveComplete disparado para 3 sistemas assinantes.",
                    "description": "Disparo multicast de evento"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina totalOuvintes = 3 e evento = \"OnWaveComplete\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Evento OnWaveComplete disparado para 3 sistemas assinantes."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Evento \" + evento + \" disparado para \" + totalOuvintes + \" sistemas assinantes.\");"
                }
            ]
        },
        {
            "id": "cs_act_34_3",
            "title": "Desinscrição Segura para Prevenir Vazamento de Memória",
            "difficulty": "medium",
            "description": "Declare bool eventoDesinscrito = true;. Verifique com if (eventoDesinscrito) e emita: 'OnDisable: Evento desinscrito com sucesso (-=).'.",
            "validationRules": {
                "requiredPatterns": [
                    "eventoDesinscrito",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o evento foi desinscrito\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool eventoDesinscrito = true;\n        if (eventoDesinscrito)\n        {\n            Debug.Log(\"OnDisable: Evento desinscrito com sucesso (-=).\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "OnDisable: Evento desinscrito com sucesso (-=).",
                    "description": "Desinscrição de evento"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use if (eventoDesinscrito)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: OnDisable: Evento desinscrito com sucesso (-=)."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nbool eventoDesinscrito = true;\nif (eventoDesinscrito) {\n    Debug.Log(\"OnDisable: Evento desinscrito com sucesso (-=).\");\n}"
                }
            ]
        },
        {
            "id": "cs_act_34_4",
            "title": "Passagem de Parâmetro por Evento Genérico Action<T>",
            "difficulty": "medium",
            "description": "Crie a classe EmissorDano com public void DispararDano(int danoCausado) { Debug.Log(\"Action<int>: Evento de Dano disparou \" + danoCausado + \" pts!\"); }. Instancie e execute para danoCausado = 150.",
            "validationRules": {
                "requiredPatterns": [
                    "class EmissorDano",
                    "DispararDano",
                    "new EmissorDano()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class EmissorDano\n{\n    public void DispararDano(int danoCausado)\n    {\n        Debug.Log(\"Action<int>: Evento de Dano disparou \" + danoCausado + \" pts!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e dispare o dano de 150\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class EmissorDano\n{\n    public void DispararDano(int danoCausado)\n    {\n        Debug.Log(\"Action<int>: Evento de Dano disparou \" + danoCausado + \" pts!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        EmissorDano emissor = new EmissorDano();\n        emissor.DispararDano(150);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Action<int>: Evento de Dano disparou 150 pts!",
                    "description": "Evento com parâmetro genérico"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie EmissorDano emissor = new EmissorDano(); e chame DispararDano(150);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Action<int>: Evento de Dano disparou 150 pts!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nEmissorDano emissor = new EmissorDano();\nemissor.DispararDano(150);"
                }
            ]
        },
        {
            "id": "cs_act_34_5",
            "artifactReward": {
                "artifactId": "Crown_Echo",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Orquestrador de Eventos da Guilda Completo",
            "difficulty": "medium",
            "description": "Crie a classe HubEventos com public void NotificarMissao(string missaoNome) { Debug.Log(\"Hub Eventos: Missao [\" + missaoNome + \"] concluida com sucesso!\"); }. Instancie e execute para missaoNome = \"Cripta_Ancestral\".",
            "validationRules": {
                "requiredPatterns": [
                    "class HubEventos",
                    "NotificarMissao",
                    "new HubEventos()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class HubEventos\n{\n    public void NotificarMissao(string missaoNome)\n    {\n        Debug.Log(\"Hub Eventos: Missao [\" + missaoNome + \"] concluida com sucesso!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e notifique a missao Cripta_Ancestral\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class HubEventos\n{\n    public void NotificarMissao(string missaoNome)\n    {\n        Debug.Log(\"Hub Eventos: Missao [\" + missaoNome + \"] concluida com sucesso!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        HubEventos hub = new HubEventos();\n        hub.NotificarMissao(\"Cripta_Ancestral\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Hub Eventos: Missao [Cripta_Ancestral] concluida com sucesso!",
                    "description": "Hub desacoplado de eventos"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie HubEventos hub = new HubEventos(); e chame NotificarMissao(\"Cripta_Ancestral\");"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Hub Eventos: Missao [Cripta_Ancestral] concluida com sucesso!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nHubEventos hub = new HubEventos();\nhub.NotificarMissao(\"Cripta_Ancestral\");"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_34, CAP_34: CAP_34 };
}
