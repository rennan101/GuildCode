/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 27
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 27 — SHADERS BÁSICOS E MATERIAIS PBR
// ═══════════════════════════════════════════════════════

const CAP_27 = {
    "id": 27,
    "artifactReward": null,
    "title": "Shaders Básicos e Materiais PBR",
    "theme": "Módulo 8 — Interface e Sistemas",
    "unlock": "Shader Rúnico",
    "unlockIcon": "[SHAD]",
    "character": "arkan",
    "xpReward": 340,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Conectando aos Pipelines Gráficos da GPU. Materiais PBR e Shader Graph ativos."
        },
        {
            "type": "narrative",
            "text": "Superfícies de ouro polido, couro envelhecido e gemas luminescentes reagem realisticamente à luz. Arkan Velor ajusta propriedades físicas de materiais baseados em física real (PBR)."
        },
        {
            "type": "character",
            "name": "ARKAN VELOR",
            "role": "MESTRE DA GUILDA",
            "cssClass": "arkan",
            "text": "Um shader é o programa que roda diretamente em cada pixel da placa de vídeo para calcular sua cor final! No modelo **PBR (Physically Based Rendering)**, usamos quatro canais sagrados: **Albedo** (a cor base pura), **Metallic** (se o material é condutor ou dielétrico), **Smoothness** (o polimento da reflexão) e **Emission** (luz própria que brilha no escuro)!"
        },
        {
            "type": "character",
            "name": "MIRA SOLIS",
            "role": "ARTÍFICE",
            "cssClass": "mira",
            "text": "E para dar feedback dinâmico quando um inimigo leva um golpe, podemos trocar seu material em tempo de execução para um shader com brilho vermelho (Flash Damage)!"
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "Compreender os parâmetros de materiais PBR capacita o desenvolvedor a criar gráficos de alta fidelidade visual. Complete as 5 atividades deste capítulo."
        }
    ],
    "concept": {
        "title": "SHADERS BÁSICOS E MATERIAIS PBR: ALBEDO, METALLIC E EMISSION",
        "explanation": "A renderização baseada em física (PBR - Physically Based Rendering) simula a interação real da luz com os materiais:\n<ul>\n  <li><strong>Albedo (Cor Base):</strong> A cor difusa pura do material sem iluminação ou sombras gravadas.</li>\n  <li><strong>Metallic & Smoothness:</strong> Controlam se a superfície se comporta como metal e o nível de polimento/reflexo especular.</li>\n  <li><strong>Emission (Emissão):</strong> Faz o material brilhar e iluminar o ambiente ao redor (ex: runas e lâminas de energia).</li>\n  <li><strong>Instanciação de Material:</strong> Alterar <code>renderer.material.color</code> cria uma instância única para não afetar os outros objetos da cena.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploMaterial : MonoBehaviour\n{\n    void Start()\n    {\n        string shaderNome = \"Universal Render Pipeline/Lit\";\n        float metallic = 0.9f;\n        float smoothness = 0.85f;\n\n        Debug.Log(\"Shader PBR: \" + shaderNome);\n        Debug.Log(\"Propriedades: Metallic=\" + metallic + \" | Smoothness=\" + smoothness);\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Mudança Dinâmica de Cor do Material ao Sofrer Dano",
        "code": "using UnityEngine;\n\npublic class TrocaCorDano : MonoBehaviour\n{\n    void Start()\n    {\n        string corNormal = \"Azul_Heroi\";\n        string corDano = \"Vermelho_Alerta\";\n\n        Debug.Log(\"Material Normal: \" + corNormal);\n        Debug.Log(\"Feedback Visual de Dano: Material alterado para \" + corDano + \"!\");\n    }\n}",
        "output": "Material Normal: Azul_Heroi\nFeedback Visual de Dano: Material alterado para Vermelho_Alerta!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os valores de metallic e smoothness.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        float metallic = 0.5f;\n        Debug.Log(\"Metallicidade: \" + metallic);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o nome do shader e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string shader = \"URP/Lit\";\n        Debug.Log(\"Shader: \" + shader);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string shader = \"URP/Lit\";\n        Debug.Log(\"Shader: \" + shader);\n    }\n}",
                "hint": "Shader: URP/Lit"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_27_1",
            "title": "Definição de Propriedades PBR (Metallic e Smoothness)",
            "difficulty": "easy",
            "description": "Declare float metallic = 0.8f; e float smoothness = 0.75f;. Emita no console: 'Propriedades PBR: Metallic=' + metallic + ' | Smoothness=' + smoothness.",
            "validationRules": {
                "requiredPatterns": [
                    "metallic",
                    "smoothness",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as propriedades e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float metallic = 0.8f;\n        float smoothness = 0.75f;\n        Debug.Log(\"Propriedades PBR: Metallic=\" + metallic + \" | Smoothness=\" + smoothness);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Propriedades PBR: Metallic=0.8 | Smoothness=0.75",
                    "description": "Configuração PBR"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina metallic = 0.8f e smoothness = 0.75f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Propriedades PBR: Metallic=0.8 | Smoothness=0.75"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Propriedades PBR: Metallic=\" + metallic + \" | Smoothness=\" + smoothness);"
                }
            ]
        },
        {
            "id": "cs_act_27_2",
            "title": "Ativação de Emissão de Luz em Runas Mágicas",
            "difficulty": "easy",
            "description": "Declare string corEmissao = \"Cyan_Brilhante\"; e float intensidadeEmissao = 3.5f;. Emita: 'Material Emissivo: ' + corEmissao + ' com Intensidade ' + intensidadeEmissao + 'x.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string corEmissao",
                    "intensidadeEmissao",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis de emissão e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string corEmissao = \"Cyan_Brilhante\";\n        float intensidadeEmissao = 3.5f;\n        Debug.Log(\"Material Emissivo: \" + corEmissao + \" com Intensidade \" + intensidadeEmissao + \"x.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Material Emissivo: Cyan_Brilhante com Intensidade 3.5x.",
                    "description": "Emissão de material"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina corEmissao = \"Cyan_Brilhante\" e intensidadeEmissao = 3.5f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Material Emissivo: Cyan_Brilhante com Intensidade 3.5x."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Material Emissivo: \" + corEmissao + \" com Intensidade \" + intensidadeEmissao + \"x.\");"
                }
            ]
        },
        {
            "id": "cs_act_27_3",
            "title": "Troca Dinâmica de Cor de Albedo",
            "difficulty": "medium",
            "description": "Declare string corAtual = \"Ouro_Polido\";. Alterne para \"Obsidiana_Negra\" e emita: 'Albedo Alterado com Sucesso para: ' + corAtual.",
            "validationRules": {
                "requiredPatterns": [
                    "corAtual",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Alterne a cor atual e exiba\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string corAtual = \"Ouro_Polido\";\n        corAtual = \"Obsidiana_Negra\";\n        Debug.Log(\"Albedo Alterado com Sucesso para: \" + corAtual);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Albedo Alterado com Sucesso para: Obsidiana_Negra",
                    "description": "Alteração dinâmica de albedo"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Mude corAtual para \"Obsidiana_Negra\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Albedo Alterado com Sucesso para: Obsidiana_Negra"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring corAtual = \"Obsidiana_Negra\";\nDebug.Log(\"Albedo Alterado com Sucesso para: \" + corAtual);"
                }
            ]
        },
        {
            "id": "cs_act_27_4",
            "title": "Calculador de Opacidade de Transparência (Alpha)",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorShader com public float ObterAlphaPorVida(int vidaAtual, int vidaMax) { return (float)vidaAtual / vidaMax; }. Instancie e calcule para vidaAtual = 60 e vidaMax = 120, emitindo: 'Alpha da Superficie: ' + alpha.",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorShader",
                    "ObterAlphaPorVida",
                    "new GerenciadorShader()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorShader\n{\n    public float ObterAlphaPorVida(int vidaAtual, int vidaMax)\n    {\n        return (float)vidaAtual / vidaMax;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule com (60, 120)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorShader\n{\n    public float ObterAlphaPorVida(float vidaAtual, float vidaMax)\n    {\n        float pct = (vidaAtual * 1.0f) / vidaMax;\n        return pct;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorShader shader = new GerenciadorShader();\n        float alpha = shader.ObterAlphaPorVida(60.0f, 120.0f);\n        Debug.Log(\"Alpha da Superficie: \" + alpha);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Alpha da Superficie: 0.5",
                    "description": "Cálculo de transparência alpha"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorShader shader = new GerenciadorShader(); e calcule com (60, 120)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Alpha da Superficie: 0.5"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorShader shader = new GerenciadorShader();\nfloat alpha = shader.ObterAlphaPorVida(60, 120);\nDebug.Log(\"Alpha da Superficie: \" + alpha);"
                }
            ]
        },
        {
            "id": "cs_act_27_5",
            "artifactReward": {
                "artifactId": "Crown_Chroma",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Aplicador de Material PBR Completo",
            "difficulty": "medium",
            "description": "Crie a classe AplicadorMaterial com public void ConfigurarMaterial(string nomeMat, float metal, float smooth) { Debug.Log(\"Material [\" + nomeMat + \"] ajustado: Metal=\" + metal + \" | Smooth=\" + smooth); }. Instancie e execute para nomeMat = \"Armadura_Titanio\", metal = 1.0f e smooth = 0.9f.",
            "validationRules": {
                "requiredPatterns": [
                    "class AplicadorMaterial",
                    "ConfigurarMaterial",
                    "new AplicadorMaterial()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class AplicadorMaterial\n{\n    public void ConfigurarMaterial(string nomeMat, float metal, float smooth)\n    {\n        Debug.Log(\"Material [\" + nomeMat + \"] ajustado: Metal=\" + metal + \" | Smooth=\" + smooth);\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e configure o material Armadura_Titanio\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class AplicadorMaterial\n{\n    public void ConfigurarMaterial(string nomeMat, float metal, float smooth)\n    {\n        Debug.Log(\"Material [\" + nomeMat + \"] ajustado: Metal=\" + metal + \" | Smooth=\" + smooth);\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        AplicadorMaterial appMat = new AplicadorMaterial();\n        appMat.ConfigurarMaterial(\"Armadura_Titanio\", 1.0f, 0.9f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Material [Armadura_Titanio] ajustado: Metal=1 | Smooth=0.9",
                    "description": "Configuração completa de material PBR"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie AplicadorMaterial appMat = new AplicadorMaterial(); e chame ConfigurarMaterial(\"Armadura_Titanio\", 1.0f, 0.9f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Material [Armadura_Titanio] ajustado: Metal=1 | Smooth=0.9"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nAplicadorMaterial appMat = new AplicadorMaterial();\nappMat.ConfigurarMaterial(\"Armadura_Titanio\", 1.0f, 0.9f);"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_27, CAP_27: CAP_27 };
}
