/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 22
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 22 — ILUMINAÇÃO, APV E POST-PROCESSING
// ═══════════════════════════════════════════════════════

const CAP_22 = {
    "id": 22,
    "artifactReward": null,
    "title": "Iluminação, APV e Post-Processing",
    "theme": "Módulo 7 — Mundo 3D",
    "unlock": "Luz Razoável APV",
    "unlockIcon": "[LIGHT]",
    "character": "lyra",
    "xpReward": 290,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Calibrando o Pipeline de Renderização Universal (URP). Iluminação global, APV e pós-processamento ativados."
        },
        {
            "type": "narrative",
            "text": "Feixes de luz dourada atravessam vitrais góticos. Sombras suaves desenham o relevo enquanto um brilho etéreo (bloom) envolve cristais de mana."
        },
        {
            "type": "character",
            "name": "LYRA NEX",
            "role": "ARQUIVISTA",
            "cssClass": "lyra",
            "text": "A iluminação é a alma da atmosfera de um jogo! Uma **Directional Light** simula a luz do sol infinito projetando sombras suaves em tempo real com <code>SoftShadows</code>."
        },
        {
            "type": "character",
            "name": "ORIN VALE",
            "role": "EXPLORADOR DE CENÁRIOS",
            "cssClass": "orin",
            "text": "No Unity moderno, o novo sistema de **Adaptive Probe Volumes (APV)** espalha milhares de sondas volumétricas de luz pela cena, iluminando personagens em movimento com precisão de iluminação global. E os volumes de **Post-Processing** adicionam efeitos cinematográficos como Bloom e Vinheta!"
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "O efeito Bloom faz superfícies luminosas transbordarem brilho nos olhos do jogador, enquanto o Color Grading dita o tom emocional da narrativa. Pratique esses parâmetros vitais."
        }
    ],
    "concept": {
        "title": "ILUMINAÇÃO, APV E POST-PROCESSING: ATMOSFERA E RENDERIZAÇÃO",
        "explanation": "A iluminação e o pós-processamento criam a identidade visual dos jogos:\n<ul>\n  <li><strong>Fontes de Luz (<code>Light</code>):</strong> Directional (sol), Point (tochas) e Spot (lanternas).</li>\n  <li><strong>Adaptive Probe Volumes (APV):</strong> Sondas de luz volumétricas que iluminam objetos dinâmicos com Global Illumination de alta performance.</li>\n  <li><strong>Post-Processing:</strong> Efeitos de câmera como Bloom (brilho mágico), Vignette (vinheta de foco) e Color Grading (tonalidade cinemática).</li>\n  <li><strong>Intensidade e Temperatura:</strong> Controle em Kelvin (luz quente/fria) e Lux/Lúmens.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploIluminacao : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoLuz = \"Directional\";\n        float intensidade = 1.2f;\n        string corLuz = \"Dourado_Solar\";\n\n        Debug.Log(\"Iluminacao Global: \" + tipoLuz + \" (Intensidade: \" + intensidade + \")\");\n        Debug.Log(\"Color Grading Ativo: \" + corLuz);\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Controlador de Atmosfera e Bloom da Masmorra",
        "code": "using UnityEngine;\n\npublic class ControladorAtmosfera : MonoBehaviour\n{\n    void Start()\n    {\n        float intensidadeBloom = 2.5f;\n        float exposicaoCamera = 1.0f;\n        string perfilPostProcess = \"Masmorra_Noturna\";\n\n        Debug.Log(\"Perfil Carregado: \" + perfilPostProcess);\n        Debug.Log(\"Bloom Mágico: \" + intensidadeBloom + \" | Exposicao: \" + exposicaoCamera);\n    }\n}",
        "output": "Perfil Carregado: Masmorra_Noturna\nBloom Mágico: 2.5 | Exposicao: 1"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Ajuste os parâmetros de luz e pós-processamento.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        float bloom = 3.0f;\n        Debug.Log(\"Brilho Bloom: \" + bloom);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o tipo de luz e a intensidade, emitindo no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipo = \"PointLight\";\n        float intensidade = 4.0f;\n        Debug.Log(\"Fonte: \" + tipo + \" com \" + intensidade + \" lumens\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipo = \"PointLight\";\n        float intensidade = 4.0f;\n        Debug.Log(\"Fonte: \" + tipo + \" com \" + intensidade + \" lumens\");\n    }\n}",
                "hint": "Fonte: PointLight com 4 lumens"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_22_1",
            "title": "Configuração de Luz Direcional (Sol)",
            "difficulty": "easy",
            "description": "Declare string tipoLuz = \"Directional\"; e float intensidade = 1.5f;. Emita no console: 'Luz Principal: ' + tipoLuz + ' | Intensidade: ' + intensidade + 'x'.",
            "validationRules": {
                "requiredPatterns": [
                    "string tipoLuz",
                    "intensidade",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as propriedades da luz e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoLuz = \"Directional\";\n        float intensidade = 1.5f;\n        Debug.Log(\"Luz Principal: \" + tipoLuz + \" | Intensidade: \" + intensidade + \"x\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Luz Principal: Directional | Intensidade: 1.5x",
                    "description": "Configuração de iluminação global"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina tipoLuz = \"Directional\" e intensidade = 1.5f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Luz Principal: Directional | Intensidade: 1.5x"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Luz Principal: \" + tipoLuz + \" | Intensidade: \" + intensidade + \"x\");"
                }
            ]
        },
        {
            "id": "cs_act_22_2",
            "title": "Ajuste de Efeito de Bloom no Pós-Processamento",
            "difficulty": "easy",
            "description": "Declare float limiarBloom = 1.0f; e float intensidadeBloom = 2.8f;. Emita: 'Bloom Configurado: Limiar=' + limiarBloom + ' | Intensidade=' + intensidadeBloom.",
            "validationRules": {
                "requiredPatterns": [
                    "limiarBloom",
                    "intensidadeBloom",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o Bloom e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float limiarBloom = 1.0f;\n        float intensidadeBloom = 2.8f;\n        Debug.Log(\"Bloom Configurado: Limiar=\" + limiarBloom + \" | Intensidade=\" + intensidadeBloom);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Bloom Configurado: Limiar=1 | Intensidade=2.8",
                    "description": "Parâmetros de Bloom"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina limiarBloom = 1.0f e intensidadeBloom = 2.8f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Bloom Configurado: Limiar=1 | Intensidade=2.8"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Bloom Configurado: Limiar=\" + limiarBloom + \" | Intensidade=\" + intensidadeBloom);"
                }
            ]
        },
        {
            "id": "cs_act_22_3",
            "title": "Iluminação Volumétrica com Sondas APV",
            "difficulty": "medium",
            "description": "Declare int totalSondasAPV = 64; e bool iluminacaoGlobalAtiva = true;. Emita: 'Adaptive Probe Volumes: ' + totalSondasAPV + ' sondas ativas (GI: ' + iluminacaoGlobalAtiva + ').'.",
            "validationRules": {
                "requiredPatterns": [
                    "totalSondasAPV",
                    "iluminacaoGlobalAtiva",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis de APV e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalSondasAPV = 64;\n        bool iluminacaoGlobalAtiva = true;\n        Debug.Log(\"Adaptive Probe Volumes: \" + totalSondasAPV + \" sondas ativas (GI: \" + iluminacaoGlobalAtiva + \").\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Adaptive Probe Volumes: 64 sondas ativas (GI: True).",
                    "description": "Configuração de APV"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina totalSondasAPV = 64 e iluminacaoGlobalAtiva = true."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Adaptive Probe Volumes: 64 sondas ativas (GI: True)."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Adaptive Probe Volumes: \" + totalSondasAPV + \" sondas ativas (GI: \" + iluminacaoGlobalAtiva + \").\");"
                }
            ]
        },
        {
            "id": "cs_act_22_4",
            "title": "Calculador de Atenuação de Luz Pontual",
            "difficulty": "medium",
            "description": "Crie a classe CalculadorLuz com public float ObterIntensidadePorDistancia(float intensidadeMax, float distancia) { return intensidadeMax - (distancia * 0.5f); }. Instancie e calcule para intensidadeMax = 10 e distancia = 6, emitindo: 'Intensidade Residual da Tocha: ' + resultado + ' lux'.",
            "validationRules": {
                "requiredPatterns": [
                    "class CalculadorLuz",
                    "ObterIntensidadePorDistancia",
                    "new CalculadorLuz()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class CalculadorLuz\n{\n    public float ObterIntensidadePorDistancia(float intensidadeMax, float distancia)\n    {\n        return intensidadeMax - (distancia * 0.5f);\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule a atenuação com (10, 6)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class CalculadorLuz\n{\n    public float ObterIntensidadePorDistancia(float intensidadeMax, float distancia)\n    {\n        return intensidadeMax - distancia;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        CalculadorLuz calc = new CalculadorLuz();\n        float resultado = calc.ObterIntensidadePorDistancia(10, 3);\n        Debug.Log(\"Intensidade Residual da Tocha: \" + resultado + \" lux\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Intensidade Residual da Tocha: 7 lux",
                    "description": "Atenuação de luz pontual"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie CalculadorLuz calc = new CalculadorLuz(); e calcule com (10, 6)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Intensidade Residual da Tocha: 7 lux"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nCalculadorLuz calc = new CalculadorLuz();\nfloat resultado = calc.ObterIntensidadePorDistancia(10, 6);\nDebug.Log(\"Intensidade Residual da Tocha: \" + resultado + \" lux\");"
                }
            ]
        },
        {
            "id": "cs_act_22_5",
            "artifactReward": {
                "artifactId": "Crown_Lumina",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Gerenciador de Atmosfera Dinâmica em Classe",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorIluminacao com public void AplicarPerfil(string nomePerfil, float exposicao) { Debug.Log(\"Perfil Visual [\" + nomePerfil + \"] aplicado com Exposicao=\" + exposicao); }. Instancie e execute para nomePerfil = \"Crepusculo_Magico\" e exposicao = 1.3f.",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorIluminacao",
                    "AplicarPerfil",
                    "new GerenciadorIluminacao()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorIluminacao\n{\n    public void AplicarPerfil(string nomePerfil, float exposicao)\n    {\n        Debug.Log(\"Perfil Visual [\" + nomePerfil + \"] aplicado com Exposicao: \" + exposicao);\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e aplique o perfil Crepusculo_Magico com 1.3f\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorIluminacao\n{\n    public void AplicarPerfil(string nomePerfil, float exposicao)\n    {\n        Debug.Log(\"Perfil Visual [\" + nomePerfil + \"] aplicado com Exposicao: \" + exposicao);\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorIluminacao gm = new GerenciadorIluminacao();\n        gm.AplicarPerfil(\"Crepusculo_Magico\", 1.3f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Perfil Visual [Crepusculo_Magico] aplicado com Exposicao: 1.3",
                    "description": "Aplicação de perfil visual de iluminação"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorIluminacao gm = new GerenciadorIluminacao(); e chame AplicarPerfil(\"Crepusculo_Magico\", 1.3f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Perfil Visual [Crepusculo_Magico] aplicado com Exposicao: 1.3"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorIluminacao gm = new GerenciadorIluminacao();\ngm.AplicarPerfil(\"Crepusculo_Magico\", 1.3f);"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_22, CAP_22: CAP_22 };
}
