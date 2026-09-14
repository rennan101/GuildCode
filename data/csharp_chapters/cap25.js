/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 25
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 25 — EFEITOS SONOROS 3D E ÁUDIO
// ═══════════════════════════════════════════════════════

const CAP_25 = {
    "id": 25,
    "artifactReward": null,
    "title": "Efeitos Sonoros 3D e Áudio",
    "theme": "Módulo 8 — Interface e Sistemas",
    "unlock": "Sino Tridimensional",
    "unlockIcon": "[SFX]",
    "character": "kael",
    "xpReward": 320,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Abrindo a Acústica Tridimensional. AudioSource, AudioListener e Atenuação Espacial ativados."
        },
        {
            "type": "narrative",
            "text": "Ecos de passos e o choque de lâminas reverberam nas paredes de pedra da masmorra. Kael Draven calibra as fontes sonoras espaciais."
        },
        {
            "type": "character",
            "name": "KAEL DRAVEN",
            "role": "FERREIRO DE CÓDIGO",
            "cssClass": "kael",
            "text": "O som é metade da imersão de qualquer jogo! No Unity, o som é emitido por um **AudioSource** e captado pelos ouvidos virtuais do jogador no **AudioListener**."
        },
        {
            "type": "character",
            "name": "LYRA NEX",
            "role": "ARQUIVISTA",
            "cssClass": "lyra",
            "text": "Para efeitos rápidos de golpe, usamos <code>PlayOneShot()</code>, que permite múltiplos impactos simultâneos sem cortar o som anterior! E com o **Spatial Blend 3D** ajustado em 1.0f, o som atenua com a distância e respeita a direção de onde o monstro está vindo!"
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "Controlar a distância máxima de audição (Max Distance) e loops para trilha sonora de fundo (BGM) completam o design acústico. Domine esses sistemas neste capítulo."
        }
    ],
    "concept": {
        "title": "EFEITOS SONOROS 3D E ÁUDIO: AUDIOSOURCE, CLIP E ESPACIALIZAÇÃO",
        "explanation": "O sistema de áudio da Unity entrega imersão sonora tridimensional:\n<ul>\n  <li><strong><code>AudioSource</code>:</strong> O alto-falante acoplado ao GameObject que emite o som no espaço 3D.</li>\n  <li><strong><code>AudioClip</code>:</strong> O arquivo de áudio (.wav, .ogg, .mp3) contendo o efeito ou música.</li>\n  <li><strong><code>PlayOneShot</code>:</strong> Toca um som de efeito (tiro, passo, clique) sem interromper os áudios anteriores.</li>\n  <li><strong>Spatial Blend (Espacialização 3D):</strong> 0 = 2D puro (HUD/Música) e 1 = 3D com volume atenuado pela distância.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploAudio : MonoBehaviour\n{\n    void Start()\n    {\n        string clipNome = \"Som_Espada_Impacto\";\n        float volume = 0.8f;\n        float spatialBlend = 1.0f; // 3D\n\n        Debug.Log(\"AudioSource: \" + clipNome + \" preparado (Volume: \" + volume + \")\");\n        Debug.Log(\"Espacializacao 3D Ativa: \" + spatialBlend);\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Tocador de Som com PlayOneShot",
        "code": "using UnityEngine;\n\npublic class TocadorSom : MonoBehaviour\n{\n    void Start()\n    {\n        string somAtaque = \"Magia_Trovão\";\n        Debug.Log(\"PlayOneShot: Reproduzindo \" + somAtaque + \" na posicao do heroi!\");\n    }\n}",
        "output": "PlayOneShot: Reproduzindo Magia_Trovão na posicao do heroi!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique o volume e o tipo de som.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        float vol = 0.5f;\n        Debug.Log(\"Volume Som: \" + vol);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare o clipe de áudio e emita a mensagem de reprodução no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string clip = \"Passo_Grama\";\n        Debug.Log(\"Reproduzindo: \" + clip);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string clip = \"Passo_Grama\";\n        Debug.Log(\"Reproduzindo: \" + clip);\n    }\n}",
                "hint": "Reproduzindo: Passo_Grama"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_25_1",
            "title": "Configuração de Volume e Áudio 2D vs 3D",
            "difficulty": "easy",
            "description": "Declare string clipNome = \"Musica_Guilda\"; float volume = 0.7f; float spatialBlend = 0.0f;. Emita no console: 'AudioSource: ' + clipNome + ' | Volume: ' + volume + ' | 3D: ' + spatialBlend.",
            "validationRules": {
                "requiredPatterns": [
                    "string clipNome",
                    "volume",
                    "spatialBlend",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o AudioSource e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string clipNome = \"Musica_Guilda\";\n        float volume = 0.7f;\n        float spatialBlend = 0.0f;\n        Debug.Log(\"AudioSource: \" + clipNome + \" | Volume: \" + volume + \" | 3D: \" + spatialBlend);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "AudioSource: Musica_Guilda | Volume: 0.7 | 3D: 0",
                    "description": "Configuração do AudioSource"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina clipNome, volume e spatialBlend."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: AudioSource: Musica_Guilda | Volume: 0.7 | 3D: 0"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"AudioSource: \" + clipNome + \" | Volume: \" + volume + \" | 3D: \" + spatialBlend);"
                }
            ]
        },
        {
            "id": "cs_act_25_2",
            "title": "Disparo de Efeito Sonoro com PlayOneShot",
            "difficulty": "easy",
            "description": "Declare string sfx = \"Explosao_Gargula\";. Emita no console: 'PlayOneShot: Executando audio [' + sfx + '] sem interrupcao.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string sfx",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare sfx e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string sfx = \"Explosao_Gargula\";\n        Debug.Log(\"PlayOneShot: Executando audio [\" + sfx + \"] sem interrupcao.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "PlayOneShot: Executando audio [Explosao_Gargula] sem interrupcao.",
                    "description": "Execução com PlayOneShot"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina sfx = \"Explosao_Gargula\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: PlayOneShot: Executando audio [Explosao_Gargula] sem interrupcao."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"PlayOneShot: Executando audio [\" + sfx + \"] sem interrupcao.\");"
                }
            ]
        },
        {
            "id": "cs_act_25_3",
            "title": "Mudo e Controle de Master Volume",
            "difficulty": "medium",
            "description": "Declare bool estaMudo = true; float volumeMaster = 0.0f;. Emita: 'Status Audio Master: Volume=' + volumeMaster + ' (Mudo: ' + estaMudo + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "estaMudo",
                    "volumeMaster",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis de mudo e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaMudo = true;\n        float volumeMaster = 0.0f;\n        Debug.Log(\"Status Audio Master: Volume=\" + volumeMaster + \" (Mudo: \" + estaMudo + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Status Audio Master: Volume=0 (Mudo: True)",
                    "description": "Controle de áudio mudo"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina estaMudo = true e volumeMaster = 0.0f."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Status Audio Master: Volume=0 (Mudo: True)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Status Audio Master: Volume=\" + volumeMaster + \" (Mudo: \" + estaMudo + \")\");"
                }
            ]
        },
        {
            "id": "cs_act_25_4",
            "title": "Calculador de Atenuação de Distância Sonora",
            "difficulty": "medium",
            "description": "Crie a classe GerenciadorSom com public float ObterVolumePorDistancia(float dist, float alcanceMax) { if (dist >= alcanceMax) return 0.0f; return 1.0f - (dist / alcanceMax); }. Instancie e calcule para dist = 10 e alcanceMax = 20, emitindo: 'Volume Atenuado no Ouvinte: ' + vol.",
            "validationRules": {
                "requiredPatterns": [
                    "class GerenciadorSom",
                    "ObterVolumePorDistancia",
                    "new GerenciadorSom()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GerenciadorSom\n{\n    public float ObterVolumePorDistancia(float dist, float alcanceMax)\n    {\n        float fator = dist / alcanceMax;\n        return 1.0f - fator;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule o volume atenuado para (10, 20)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GerenciadorSom\n{\n    public float ObterVolumePorDistancia(float dist, float alcanceMax)\n    {\n        float ratio = dist / (alcanceMax + 0.0001f);\n        return 1.0f - ratio;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GerenciadorSom som = new GerenciadorSom();\n        float vol = som.ObterVolumePorDistancia(10.0f, 20.0f);\n        Debug.Log(\"Volume Atenuado no Ouvinte: \" + vol);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Volume Atenuado no Ouvinte: 0.5",
                    "description": "Atenuação de áudio 3D"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GerenciadorSom som = new GerenciadorSom(); e calcule com (10, 20)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Volume Atenuado no Ouvinte: 0.5"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGerenciadorSom som = new GerenciadorSom();\nfloat vol = som.ObterVolumePorDistancia(10, 20);\nDebug.Log(\"Volume Atenuado no Ouvinte: \" + vol);"
                }
            ]
        },
        {
            "id": "cs_act_25_5",
            "artifactReward": {
                "artifactId": "Crown_Sonic",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Tocador de Som Espacializado Completo",
            "difficulty": "medium",
            "description": "Crie a classe TocadorAudio com public void TocarSomPosicional(string nomeSom, float posX) { Debug.Log(\"Audio 3D [\" + nomeSom + \"] emitido na coordenada X=\" + posX); }. Instancie e execute para nomeSom = \"Grito_Monstro\" e posX = 15.0f.",
            "validationRules": {
                "requiredPatterns": [
                    "class TocadorAudio",
                    "TocarSomPosicional",
                    "new TocadorAudio()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class TocadorAudio\n{\n    public void TocarSomPosicional(string nomeSom, float posX)\n    {\n        Debug.Log(\"Audio 3D [\" + nomeSom + \"] emitido na coordenada X: \" + posX);\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute TocarSomPosicional(\"Grito_Monstro\", 15.0f)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class TocadorAudio\n{\n    public void TocarSomPosicional(string nomeSom, float posX)\n    {\n        Debug.Log(\"Audio 3D [\" + nomeSom + \"] emitido na coordenada X: \" + posX);\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        TocadorAudio tocador = new TocadorAudio();\n        tocador.TocarSomPosicional(\"Grito_Monstro\", 15.0f);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Audio 3D [Grito_Monstro] emitido na coordenada X: 15",
                    "description": "Áudio posicional 3D"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie TocadorAudio tocador = new TocadorAudio(); e chame TocarSomPosicional(\"Grito_Monstro\", 15.0f);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Audio 3D [Grito_Monstro] emitido na coordenada X: 15"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nTocadorAudio tocador = new TocadorAudio();\ntocador.TocarSomPosicional(\"Grito_Monstro\", 15.0f);"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_25, CAP_25: CAP_25 };
}
