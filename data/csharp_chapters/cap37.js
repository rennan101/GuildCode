/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 37
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 37 — OTIMIZAÇÃO, PROFILING E DRAW CALLS
// ═══════════════════════════════════════════════════════

const CAP_37 = {
    "id": 37,
    "artifactReward": null,
    "title": "Otimização, Profiling e Draw Calls",
    "theme": "Módulo 9 — Avançado (Tópicos PTS)",
    "unlock": "Códice Supremo da Engine",
    "unlockIcon": "[OPT]",
    "character": "arkan",
    "xpReward": 450,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Calibrando o Ápice da Engenharia de Jogos. Profiling, Batching, Occlusion Culling e LODs ativados."
        },
        {
            "type": "narrative",
            "text": "O santuário ressoa em sua máxima capacidade computacional. Arkan Velor avalia o Profiler do Unity: a taxa de quadros é sólida como rocha e os draw calls despencam."
        },
        {
            "type": "character",
            "name": "ARKAN VELOR",
            "role": "MESTRE DA GUILDA",
            "cssClass": "arkan",
            "text": "Chegamos ao último capítulo da Dimensão C#, Codemancer! Qualquer um pode programar um jogo que rode a 60 FPS com 5 objetos na tela. O verdadeiro Engenheiro de Jogos é aquele cujo mundo colossal, com milhares de entidades, roda fluido e estável em qualquer máquina!"
        },
        {
            "type": "character",
            "name": "LYRA NEX",
            "role": "ARQUIVISTA",
            "cssClass": "lyra",
            "text": "Dominamos as quatro técnicas de ouro: **Batching** para agrupar 120 draw calls em apenas 25; **Occlusion Culling** para nunca renderizar o que está atrás de paredes; **LOD Groups** para reduzir a complexidade da malha quando a câmera está distante; e travamento de taxa de quadros estável com <code>Application.targetFrameRate</code>!"
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "Ao concluir estas 5 atividades finais, você terá dominado a teoria, os exemplos e a prática completa dos 38 capítulos de C# e Unity 6.5. O Santuário da GuildCode saúda sua maestria dimensional!"
        }
    ],
    "concept": {
        "title": "OTIMIZAÇÃO, PROFILING E DRAW CALLS: BATCHING E 60 FPS CONSTANTE",
        "explanation": "A maestria na Unity é coroada com técnicas de otimização de alta performance:\n<ul>\n  <li><strong>Draw Calls (Chamadas de Desenho):</strong> Quantidade de comandos de renderização enviados da CPU para a GPU.</li>\n  <li><strong>Static & Dynamic Batching:</strong> Agrupa múltiplos objetos que compartilham o mesmo material em uma única Draw Call.</li>\n  <li><strong>Garbage Collection (GC Alloc):</strong> Eliminação de alocações desnecessárias por quadro para manter 60/120 FPS fixos.</li>\n  <li><strong>Profiler:</strong> Ferramenta para medir milissegundos por quadro e consumo de CPU, GPU e Memória.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploOtimizacao : MonoBehaviour\n{\n    void Start()\n    {\n        int drawCallsOriginais = 120;\n        int drawCallsOtimizadas = 15; // Redução por Static Batching\n        float framerateAlvo = 60.0f;\n\n        Debug.Log(\"Otimizacao de Draw Calls: \" + drawCallsOriginais + \" -> \" + drawCallsOtimizadas + \" batches\");\n        Debug.Log(\"Meta de Desempenho: \" + framerateAlvo + \" FPS constante!\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Relatório de Performance do Profiler da Masmorra",
        "code": "using UnityEngine;\n\npublic class RelatorioProfiler : MonoBehaviour\n{\n    void Start()\n    {\n        float frameTimeMs = 16.6f; // 60 FPS = 16.6ms por quadro\n        int drawCalls = 18;\n        string statusPerformance = \"Excelente (60 FPS)\";\n\n        Debug.Log(\"Profiler Status: \" + statusPerformance);\n        Debug.Log(\"Tempo por Quadro: \" + frameTimeMs + \"ms | Batches: \" + drawCalls);\n    }\n}",
        "output": "Profiler Status: Excelente (60 FPS)\nTempo por Quadro: 16.6ms | Batches: 18"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os valores de tempo de quadro e draw calls.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        int fps = 60;\n        Debug.Log(\"Taxa de Quadros: \" + fps + \" FPS\");\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare a taxa de quadros e emita o log de performance:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int fps = 60;\n        Debug.Log(\"Performance: \" + fps + \" FPS\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int fps = 60;\n        Debug.Log(\"Performance: \" + fps + \" FPS\");\n    }\n}",
                "hint": "Performance: 60 FPS"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_37_1",
            "title": "Otimização de Draw Calls com Batching",
            "difficulty": "easy",
            "description": "Declare int drawCallsAntes = 150; int drawCallsDepois = 12;. Calcule a redução e emita no console: 'Reducao de Batches: ' + (drawCallsAntes - drawCallsDepois) + ' draw calls eliminadas!'.",
            "validationRules": {
                "requiredPatterns": [
                    "drawCallsAntes",
                    "drawCallsDepois",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule as draw calls eliminadas\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int drawCallsAntes = 150;\n        int drawCallsDepois = 12;\n        Debug.Log(\"Reducao de Batches: \" + (drawCallsAntes - drawCallsDepois) + \" draw calls eliminadas!\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Reducao de Batches: 138 draw calls eliminadas!",
                    "description": "Otimização de batching"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Subtraia drawCallsAntes - drawCallsDepois."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Reducao de Batches: 138 draw calls eliminadas!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Reducao de Batches: \" + (drawCallsAntes - drawCallsDepois) + \" draw calls eliminadas!\");"
                }
            ]
        },
        {
            "id": "cs_act_37_2",
            "title": "Taxa de Quadros Alvo (Target FrameRate)",
            "difficulty": "easy",
            "description": "Declare int taxaQuadros = 60; float tempoQuadroMs = 16.6f;. Emita: 'Meta de Performance: ' + taxaQuadros + ' FPS (' + tempoQuadroMs + 'ms por quadro).'.",
            "validationRules": {
                "requiredPatterns": [
                    "taxaQuadros",
                    "tempoQuadroMs",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int taxaQuadros = 60;\n        float tempoQuadroMs = 16.6f;\n        Debug.Log(\"Meta de Performance: \" + taxaQuadros + \" FPS (\" + tempoQuadroMs + \"ms por quadro).\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Meta de Performance: 60 FPS (16.6ms por quadro).",
                    "description": "Meta de 60 FPS"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina taxaQuadros = 60 e tempoQuadroMs = 16.6f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Meta de Performance: 60 FPS (16.6ms por quadro)."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Meta de Performance: \" + taxaQuadros + \" FPS (\" + tempoQuadroMs + \"ms por quadro).\");"
                }
            ]
        },
        {
            "id": "cs_act_37_3",
            "title": "Otimização de Alocação de Memória (Zero GC)",
            "difficulty": "medium",
            "description": "Declare int gcAllocBytes = 0; bool semStutters = true;. Emita: 'Otimizacao de Memoria: ' + gcAllocBytes + ' bytes alocados (Estabilidade: ' + semStutters + ').'.",
            "validationRules": {
                "requiredPatterns": [
                    "gcAllocBytes",
                    "semStutters",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as propriedades e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int gcAllocBytes = 0;\n        bool semStutters = true;\n        Debug.Log(\"Otimizacao de Memoria: \" + gcAllocBytes + \" bytes alocados (Estabilidade: \" + semStutters + \").\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Otimizacao de Memoria: 0 bytes alocados (Estabilidade: True).",
                    "description": "Zero GC Alloc"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina gcAllocBytes = 0 e semStutters = true."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Otimizacao de Memoria: 0 bytes alocados (Estabilidade: True)."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Otimizacao de Memoria: \" + gcAllocBytes + \" bytes alocados (Estabilidade: \" + semStutters + \").\");"
                }
            ]
        },
        {
            "id": "cs_act_37_4",
            "title": "Calculador de FrameTime por FPS",
            "difficulty": "medium",
            "description": "Crie a classe ProfilerCalculador com public float ObterTempoMilissegundos(float fps) { return 1000.0f / fps; }. Instancie e calcule para fps = 50, emitindo: 'Tempo Limite do Quadro: ' + ms + 'ms'.",
            "validationRules": {
                "requiredPatterns": [
                    "class ProfilerCalculador",
                    "ObterTempoMilissegundos",
                    "new ProfilerCalculador()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ProfilerCalculador\n{\n    public float ObterTempoMilissegundos(float taxaFps)\n    {\n        return 1000.0f / taxaFps;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule para fps = 50\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ProfilerCalculador\n{\n    public float ObterTempoMilissegundos(float taxaFps)\n    {\n        return 1000.0f / taxaFps;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ProfilerCalculador calc = new ProfilerCalculador();\n        float ms = calc.ObterTempoMilissegundos(50.0f);\n        Debug.Log(\"Tempo Limite do Quadro: \" + ms + \"ms\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Tempo Limite do Quadro: 20ms",
                    "description": "Cálculo de milissegundos por quadro"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie ProfilerCalculador calc = new ProfilerCalculador(); e calcule com 50."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Tempo Limite do Quadro: 20ms"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nProfilerCalculador calc = new ProfilerCalculador();\nfloat ms = calc.ObterTempoMilissegundos(50);\nDebug.Log(\"Tempo Limite do Quadro: \" + ms + \"ms\");"
                }
            ]
        },
        {
            "id": "cs_act_37_5",
            "artifactReward": {
                "artifactId": "Crown_Apex",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Relatório de Maestria e Otimização Final",
            "difficulty": "medium",
            "description": "Crie a classe RelatorioMaestria com public void EmitirRelatorio(string modulo, int fps) { Debug.Log(\"Relatorio Final: [\" + modulo + \"] rodando a \" + fps + \" FPS cravados! Mestre da Guilda Consagrado!\"); }. Instancie e execute para modulo = \"Unity 6.5\" e fps = 60.",
            "validationRules": {
                "requiredPatterns": [
                    "class RelatorioMaestria",
                    "EmitirRelatorio",
                    "new RelatorioMaestria()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class RelatorioMaestria\n{\n    public void EmitirRelatorio(string modulo, int fps)\n    {\n        Debug.Log(\"Relatorio Final: [\" + modulo + \"] rodando a \" + fps + \" FPS cravados! Mestre da Guilda Consagrado!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e emita o relatório para \"Unity 6.5\" e 60\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class RelatorioMaestria\n{\n    public void EmitirRelatorio(string modulo, int fps)\n    {\n        Debug.Log(\"Relatorio Final: [\" + modulo + \"] rodando a \" + fps + \" FPS cravados! Mestre da Guilda Consagrado!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        RelatorioMaestria relatorio = new RelatorioMaestria();\n        relatorio.EmitirRelatorio(\"Unity 6.5\", 60);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Relatorio Final: [Unity 6.5] rodando a 60 FPS cravados! Mestre da Guilda Consagrado!",
                    "description": "Consagração do Mestre da Guilda"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie RelatorioMaestria relatorio = new RelatorioMaestria(); e chame EmitirRelatorio(\"Unity 6.5\", 60);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Relatorio Final: [Unity 6.5] rodando a 60 FPS cravados! Mestre da Guilda Consagrado!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nRelatorioMaestria relatorio = new RelatorioMaestria();\nrelatorio.EmitirRelatorio(\"Unity 6.5\", 60);"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_37, CAP_37: CAP_37 };
}
