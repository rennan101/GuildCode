/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 18
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 18 — CÂMERA 3ª PESSOA (CINEMACHINE)
// ═══════════════════════════════════════════════════════

const CAP_18 = {
    "id": 18,
    "artifactReward": null,
    "title": "Câmera 3ª Pessoa (Cinemachine)",
    "theme": "Módulo 6 — Câmeras",
    "unlock": "Lente Cinemachine",
    "unlockIcon": "[CAM3]",
    "character": "lyra",
    "xpReward": 250,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Entrando no Módulo 6 — Câmeras. Suíte Cinemachine e Câmeras Virtuais ativadas."
        },
        {
            "type": "narrative",
            "text": "Lentes etéreas orbitam o campo de treinamento da guilda. Lyra Nex ajusta distâncias focais e curvas de amortecimento para enquadrar a ação perfeitamente."
        },
        {
            "type": "character",
            "name": "LYRA NEX",
            "role": "ARQUIVISTA",
            "cssClass": "lyra",
            "text": "No passado, programadores passavam semanas escrevendo códigos de câmera com matemática complexa. Hoje, o pacote oficial **Cinemachine** do Unity gerencia Câmeras Virtuais (vcam) de forma inteligente e cinematográfica!"
        },
        {
            "type": "character",
            "name": "ELION RAVEN",
            "role": "ESTRATEGISTA",
            "cssClass": "elion",
            "text": "Configuramos o alvo do jogador com o <code>Follow Target</code> e definimos a distância orbital (como 5.0m). Para que a câmera não trema abruptamente quando o herói correr, aplicamos o amortecimento suave chamado <strong>Damping</strong>!"
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "A transição entre diferentes câmeras virtuais (como alternar de exploração para uma cutscene de boss) ocorre de forma fluida e automática pelo Cinemachine Brain. Complete as atividades para dominar a visão em 3ª pessoa."
        }
    ],
    "concept": {
        "title": "CÂMERA 3ª PESSOA: CINEMACHINE, SEGUIMENTO E AMORTECIMENTO (DAMPING)",
        "explanation": "O Cinemachine revoluciona o controle de câmeras dinâmicas em jogos 3D:\n<ul>\n  <li><strong>Follow e LookAt:</strong> Define qual alvo a câmera segue em posição (Follow) e mira com orientação (LookAt).</li>\n  <li><strong>Damping (Amortecimento):</strong> Suaviza a aceleração e desaceleração da câmera ao acompanhar o herói.</li>\n  <li><strong>Offset de Órbita:</strong> Posiciona a câmera acima do ombro ou atrás do personagem (ex: <code>(0, 2.5, -4)</code>).</li>\n  <li><strong>Transições Cinemáticas:</strong> Interpolação suave (Blend) entre diferentes câmeras virtuais.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploCinemachine : MonoBehaviour\n{\n    void Start()\n    {\n        string alvo = \"Heroi_Arkan\";\n        float damping = 0.2f;\n        Vector3 offset = new Vector3(0, 2, -4);\n\n        Debug.Log(\"Cinemachine Seguir: \" + alvo);\n        Debug.Log(\"Offset da Camera: (\" + offset.x + \", \" + offset.y + \", \" + offset.z + \") | Damping: \" + damping);\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Câmera Seguidora de Terceira Pessoa",
        "code": "using UnityEngine;\n\npublic class CameraSeguidora : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 heroiPos = new Vector3(10, 0, 30);\n        Vector3 camOffset = new Vector3(0, 3, -6);\n        Vector3 camPos = new Vector3(heroiPos.x + camOffset.x, heroiPos.y + camOffset.y, heroiPos.z + camOffset.z);\n\n        Debug.Log(\"Posicao do Jogador: (\" + heroiPos.x + \", \" + heroiPos.y + \", \" + heroiPos.z + \")\");\n        Debug.Log(\"Posicao da Camera Virtual: (\" + camPos.x + \", \" + camPos.y + \", \" + camPos.z + \")\");\n    }\n}",
        "output": "Posicao do Jogador: (10, 0, 30)\nPosicao da Camera Virtual: (10, 3, 24)"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os offsets de altura e distância da câmera.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        float altura = 3.5f;\n        float distancia = 5.0f;\n        Debug.Log(\"Camera 3P: Altura=\" + altura + \" Dist=\" + distancia);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o offset da câmera em terceira pessoa e exiba no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 offset = new Vector3(0, 2.5f, -5.0f);\n        Debug.Log(\"Offset 3P: Z=\" + offset.z);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 offset = new Vector3(0, 2.5f, -5.0f);\n        Debug.Log(\"Offset 3P: Z=\" + offset.z);\n    }\n}",
                "hint": "Offset 3P: Z=-5"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_18_1",
            "title": "Configurando o Alvo Follow da Câmera",
            "difficulty": "easy",
            "description": "Declare string alvoNome = \"Player_Combatente\"; e float damping = 0.15f;. Emita no console: 'Camera Virtual: Seguindo ' + alvoNome + ' com Damping ' + damping + 's.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string alvoNome",
                    "damping",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string alvoNome = \"Player_Combatente\";\n        float damping = 0.15f;\n        Debug.Log(\"Camera Virtual: Seguindo \" + alvoNome + \" com Damping \" + damping + \"s.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Camera Virtual: Seguindo Player_Combatente com Damping 0.15s.",
                    "description": "Configuração de follow"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina alvoNome = \"Player_Combatente\" e damping = 0.15f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Camera Virtual: Seguindo Player_Combatente com Damping 0.15s."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring alvoNome = \"Player_Combatente\";\nfloat damping = 0.15f;\nDebug.Log(\"Camera Virtual: Seguindo \" + alvoNome + \" com Damping \" + damping + \"s.\");"
                }
            ]
        },
        {
            "id": "cs_act_18_2",
            "title": "Cálculo de Posição da Câmera Atrás do Alvo",
            "difficulty": "easy",
            "description": "Dado float heroiZ = 50.0f; e float recuoZ = -6.0f;, calcule a posição da câmera em Z. Emita: 'Posicao Camera Z: ' + (heroiZ + recuoZ).",
            "validationRules": {
                "requiredPatterns": [
                    "heroiZ",
                    "recuoZ",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule e emita a posição Z da câmera\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float heroiZ = 50.0f;\n        float recuoZ = -6.0f;\n        Debug.Log(\"Posicao Camera Z: \" + (heroiZ + recuoZ));\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Posicao Camera Z: 44",
                    "description": "Recuo da câmera em Z"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Some heroiZ + recuoZ."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Posicao Camera Z: 44"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat heroiZ = 50.0f;\nfloat recuoZ = -6.0f;\nDebug.Log(\"Posicao Camera Z: \" + (heroiZ + recuoZ));"
                }
            ]
        },
        {
            "id": "cs_act_18_3",
            "title": "Suavização de Movimento com Interpolação Linear",
            "difficulty": "medium",
            "description": "Declare float posAtual = 10.0f; float posAlvo = 20.0f; float t = 0.5f;. Calcule float posSuave = posAtual + (posAlvo - posAtual) * t; e emita: 'Posicao Suavizada (Lerp): ' + posSuave.",
            "validationRules": {
                "requiredPatterns": [
                    "posAtual",
                    "posAlvo",
                    "posSuave",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a interpolação suave\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float posAtual = 10.0f;\n        float posAlvo = 20.0f;\n        float t = 0.5f;\n        float posSuave = posAtual + (posAlvo - posAtual) * t;\n        Debug.Log(\"Posicao Suavizada (Lerp): \" + posSuave);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Posicao Suavizada (Lerp): 15",
                    "description": "Interpolação de câmera"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Calcule posSuave = posAtual + (posAlvo - posAtual) * t."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Posicao Suavizada (Lerp): 15"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat posSuave = posAtual + (posAlvo - posAtual) * t;\nDebug.Log(\"Posicao Suavizada (Lerp): \" + posSuave);"
                }
            ]
        },
        {
            "id": "cs_act_18_4",
            "title": "Controle de Campo de Visão (Field of View)",
            "difficulty": "medium",
            "description": "Crie a classe CameraFOV com public float ObterFOVAjustado(float fovPadrao, bool correndo) { if (correndo) return fovPadrao + 15; return fovPadrao; }. Instancie e execute para fovPadrao = 60 e correndo = true, emitindo: 'FOV Dinamico: ' + fovFinal + ' graus'.",
            "validationRules": {
                "requiredPatterns": [
                    "class CameraFOV",
                    "ObterFOVAjustado",
                    "new CameraFOV()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class CameraFOV\n{\n    public float fov;\n    public float ObterFOVAjustado(float fovPadrao, bool correndo)\n    {\n        this.fov = fovPadrao;\n        if (correndo)\n        {\n            this.fov = fovPadrao + 15;\n        }\n        return this.fov;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule o FOV correndo\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class CameraFOV\n{\n    public float ObterFOVAjustado(float fovPadrao, bool correndo)\n    {\n        if (correndo) return fovPadrao + 15;\n        return fovPadrao;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        CameraFOV cam = new CameraFOV();\n        float fovFinal = cam.ObterFOVAjustado(60, true);\n        Debug.Log(\"FOV Dinamico: \" + fovFinal + \" graus\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "FOV Dinamico: 75 graus",
                    "description": "Ajuste dinâmico de FOV"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie CameraFOV cam = new CameraFOV(); e calcule com (60, true)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: FOV Dinamico: 75 graus"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nCameraFOV cam = new CameraFOV();\nfloat fovFinal = cam.ObterFOVAjustado(60, true);\nDebug.Log(\"FOV Dinamico: \" + fovFinal + \" graus\");"
                }
            ]
        },
        {
            "id": "cs_act_18_5",
            "artifactReward": {
                "artifactId": "Crown_Horizon",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Transição de Câmeras Virtuais (Cinematic Blend)",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorCinematico com public void AtivarCamera(string nomeCam, float duracaoBlend) { Debug.Log(\"Blend para [\" + nomeCam + \"] em \" + duracaoBlend + \"s\"); }. Instancie e execute para nomeCam = \"Cam_Boss_Intro\" e duracaoBlend = 1.5f.",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorCinematico",
                    "AtivarCamera",
                    "new GerenciadorCinematico()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorCinematico\n{\n    public void AtivarCamera(string nomeCam, float duracaoBlend)\n    {\n        Debug.Log(\"Blend para [\" + nomeCam + \"] em \" + duracaoBlend + \"s\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e ative Cam_Boss_Intro com 1.5f de blend\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorCinematico\n{\n    public void AtivarCamera(string nomeCam, float duracaoBlend)\n    {\n        Debug.Log(\"Blend para [\" + nomeCam + \"] em \" + duracaoBlend + \"s\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorCinematico gc = new GerenciadorCinematico();\n        gc.AtivarCamera(\"Cam_Boss_Intro\", 1.5f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Blend para [Cam_Boss_Intro] em 1.5s",
                    "description": "Blend cinemático de câmera"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorCinematico gc = new GerenciadorCinematico(); e chame AtivarCamera(\"Cam_Boss_Intro\", 1.5f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Blend para [Cam_Boss_Intro] em 1.5s"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorCinematico gc = new GerenciadorCinematico();\ngc.AtivarCamera(\"Cam_Boss_Intro\", 1.5f);"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_18, CAP_18: CAP_18 };
}
