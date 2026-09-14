/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 08
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 08 — GAMEOBJECTS E COMPONENTS
// ═══════════════════════════════════════════════════════

const CAP_08 = {
    "id": 8,
    "artifactReward": null,
    "title": "GameObjects e Components",
    "theme": "Módulo 2 — Fundamentos do Unity",
    "unlock": "GameObject Rúnico",
    "unlockIcon": "[GO]",
    "character": "orin",
    "xpReward": 150,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Entrando no Módulo 2 — Fundamentos do Unity. Hierarquia da Cena e Componentes sincronizados."
        },
        {
            "type": "narrative",
            "text": "A arquitetura do mundo ganha profundidade espacial. Entidades deixam de ser simples classes de memória e se manifestam como GameObjects completos no cenário 3D."
        },
        {
            "type": "character",
            "name": "ORIN VALE",
            "role": "EXPLORADOR DE CENÁRIOS",
            "cssClass": "orin",
            "text": "No Unity, um <code>GameObject</code> é uma entidade vazia por si só — como um manequim. Seu poder vem dos <strong>Components</strong> anexados a ele! Um colisor dá solidez, um renderer dá aparência e um script dá inteligência."
        },
        {
            "type": "character",
            "name": "ARKAN VELOR",
            "role": "MESTRE DA GUILDA",
            "cssClass": "arkan",
            "text": "Podemos identificar qualquer entidade na cena lendo sua propriedade <code>gameObject.name</code> ou verificando sua etiqueta com <code>tag == 'Player'</code>. Para obter referência a outro componente acoplado ao objeto, utilizamos <code>GetComponent&lt;Rigidbody&gt;()</code>."
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "Um GameObject também pode ser ativado ou desativado com <code>SetActive(true/false)</code>, e inspecionado para saber o total de componentes que possui acoplados."
        }
    ],
    "concept": {
        "title": "GAMEOBJECTS E COMPONENTES: ARQUITETURA ENTITY-COMPONENT DO UNITY",
        "explanation": "No Unity, toda entidade na cena é um <code>GameObject</code> que obtém comportamentos através de <code>Component</code>:\n<ul>\n  <li><strong>Entidade Central (<code>GameObject</code>):</strong> Contêiner com nome, tag, camada e pelo menos um componente <code>Transform</code>.</li>\n  <li><strong>Composição de Comportamentos:</strong> Em vez de herança múltipla, objetos recebem scripts e módulos adicionais (ex: <code>Rigidbody</code>, <code>Collider</code>, <code>AudioSource</code>).</li>\n  <li><strong>Busca de Componentes (<code>GetComponent&lt;T&gt;</code>):</strong> Permite que scripts acessem outros componentes anexados ao mesmo GameObject.</li>\n  <li><strong>Controle de Ativação (<code>SetActive</code>):</strong> Habilita ou desabilita o GameObject e todos os seus componentes na cena.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploGameObject : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Identificação do GameObject\n        Debug.Log(\"Entidade: \" + gameObject.name + \" | Tag: \" + gameObject.tag);\n\n        // 2. Verificação de Componente\n        Rigidbody rb = GetComponent<Rigidbody>();\n        if (rb != null)\n        {\n            Debug.Log(\"Fisica Rigidbody ativa no GameObject!\");\n        }\n\n        // 3. Controle de Ativação\n        gameObject.SetActive(true);\n        Debug.Log(\"Status Ativo: \" + gameObject.activeSelf);\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Configuração de Entidade Inimiga",
        "code": "using UnityEngine;\n\npublic class ConfigInimigo : MonoBehaviour\n{\n    void Start()\n    {\n        string nomeObjeto = \"Goblin_Guerreiro\";\n        string tagObjeto = \"Enemy\";\n        bool ativo = true;\n\n        Debug.Log(\"GameObject Criado: \" + nomeObjeto);\n        Debug.Log(\"Tag Definida: \" + tagObjeto);\n        Debug.Log(\"Estado de Ativação: \" + ativo);\n    }\n}",
        "output": "GameObject Criado: Goblin_Guerreiro\nTag Definida: Enemy\nEstado de Ativação: True"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Altere as propriedades do GameObject e observe os logs gerados.",
        "starterCode": "using UnityEngine;\n\npublic class TesteObjeto : MonoBehaviour\n{\n    void Start()\n    {\n        string entidade = \"Bau_Tesouro\";\n        string tag = \"Interactable\";\n        Debug.Log(\"Objeto: \" + entidade + \" | Tag: \" + tag);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Configure o nome e a tag do GameObject e emita o status no Console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nome = \"Porta_Masmorra\";\n        string tag = \"Obstacle\";\n        Debug.Log(\"Entidade: \" + nome + \" | Tag: \" + tag);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nome = \"Porta_Masmorra\";\n        string tag = \"Obstacle\";\n        Debug.Log(\"Entidade: \" + nome + \" | Tag: \" + tag);\n    }\n}",
                "hint": "Entidade: Porta_Masmorra | Tag: Obstacle"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_8_1",
            "title": "Identificação de GameObject e Tag",
            "difficulty": "easy",
            "description": "Declare string nomeObjeto = \"Boss_Gargula\"; e string tagObjeto = \"Boss\";. Emita no console: 'Entidade Identificada: ' + nomeObjeto + ' | Tag: ' + tagObjeto.",
            "validationRules": {
                "requiredPatterns": [
                    "string nomeObjeto",
                    "string tagObjeto",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis e exiba a identificação\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nomeObjeto = \"Boss_Gargula\";\n        string tagObjeto = \"Boss\";\n        Debug.Log(\"Entidade Identificada: \" + nomeObjeto + \" | Tag: \" + tagObjeto);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Entidade Identificada: Boss_Gargula | Tag: Boss",
                    "description": "Configuração de GameObject"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina as strings nomeObjeto e tagObjeto."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Entidade Identificada: Boss_Gargula | Tag: Boss"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring nomeObjeto = \"Boss_Gargula\";\nstring tagObjeto = \"Boss\";\nDebug.Log(\"Entidade Identificada: \" + nomeObjeto + \" | Tag: \" + tagObjeto);"
                }
            ]
        },
        {
            "id": "cs_act_8_2",
            "title": "Busca de Componente com GetComponent",
            "difficulty": "easy",
            "description": "Crie a classe VidaComponent com public int vidaMaxima = 150;. No MonoBehaviour, instancie VidaComponent vidaComp = new VidaComponent(); e emita: 'Componente Vida Encontrado: ' + vidaComp.vidaMaxima + ' HP'.",
            "validationRules": {
                "requiredPatterns": [
                    "class VidaComponent",
                    "vidaMaxima",
                    "new VidaComponent()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class VidaComponent\n{\n    public int vidaMaxima = 150;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie VidaComponent e emita o valor de vidaMaxima\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class VidaComponent\n{\n    public int vidaMaxima = 150;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        VidaComponent vidaComp = new VidaComponent();\n        Debug.Log(\"Componente Vida Encontrado: \" + vidaComp.vidaMaxima + \" HP\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Componente Vida Encontrado: 150 HP",
                    "description": "Acesso a componente"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie VidaComponent vidaComp = new VidaComponent(); e acesse vidaComp.vidaMaxima."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Componente Vida Encontrado: 150 HP"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVidaComponent vidaComp = new VidaComponent();\nDebug.Log(\"Componente Vida Encontrado: \" + vidaComp.vidaMaxima + \" HP\");"
                }
            ]
        },
        {
            "id": "cs_act_8_3",
            "title": "Controle de Ativação com SetActive",
            "difficulty": "medium",
            "description": "Declare bool estaAtivo = true;. Alterne o valor para false (simulando desativação) e emita: 'GameObject Desativado da Cena. Ativo: ' + estaAtivo.",
            "validationRules": {
                "requiredPatterns": [
                    "estaAtivo",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Alterne o estado ativo e exiba a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaAtivo = true;\n        estaAtivo = false;\n        Debug.Log(\"GameObject Desativado da Cena. Ativo: \" + estaAtivo);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "GameObject Desativado da Cena. Ativo: False",
                    "description": "Desativação de objeto"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Declare estaAtivo = true, mude para false e imprima."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: GameObject Desativado da Cena. Ativo: False"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nbool estaAtivo = false;\nDebug.Log(\"GameObject Desativado da Cena. Ativo: \" + estaAtivo);"
                }
            ]
        },
        {
            "id": "cs_act_8_4",
            "title": "Verificação Segura de Componente Nulo",
            "difficulty": "medium",
            "description": "Crie a classe ArmaComponent com string tipo = \"Espada_Luz\";. Declare ArmaComponent arma = null;. Use if (arma != null) para checar; caso seja null, emita: 'Aviso: ArmaComponent nao encontrado!'.",
            "validationRules": {
                "requiredPatterns": [
                    "class ArmaComponent",
                    "arma == null",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ArmaComponent\n{\n    public string tipo = \"Espada_Luz\";\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ArmaComponent arma = null;\n        // Verifique com if/else e emita o aviso\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ArmaComponent\n{\n    public string tipo = \"Espada_Luz\";\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ArmaComponent arma = null;\n        if (arma == null)\n        {\n            Debug.Log(\"Aviso: ArmaComponent nao encontrado!\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Aviso: ArmaComponent nao encontrado!",
                    "description": "Checagem de componente nulo"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Faça if (arma == null) e emita o aviso de componente ausente."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Aviso: ArmaComponent nao encontrado!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nif (arma == null) {\n    Debug.Log(\"Aviso: ArmaComponent nao encontrado!\");\n}"
                }
            ]
        },
        {
            "id": "cs_act_8_5",
            "artifactReward": {
                "artifactId": "Crown_Frost",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Composição de Componentes em Entidade",
            "difficulty": "medium",
            "description": "Crie a classe EntidadeInimigo com campos string nome = \"Esqueleto\"; e int dano = 25;. Crie o método public void ExecutarAtaque() que emite: nome + ' ataca causando ' + dano + ' de dano!'. Instancie EntidadeInimigo e chame ExecutarAtaque().",
            "validationRules": {
                "requiredPatterns": [
                    "class EntidadeInimigo",
                    "ExecutarAtaque()",
                    "new EntidadeInimigo()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class EntidadeInimigo\n{\n    public string nome = \"Esqueleto\";\n    public int dano = 25;\n\n    public void ExecutarAtaque()\n    {\n        // Emita a mensagem de ataque\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e chame ExecutarAtaque()\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class EntidadeInimigo\n{\n    public string nome = \"Esqueleto\";\n    public int dano = 25;\n\n    public void ExecutarAtaque()\n    {\n        Debug.Log(nome + \" ataca causando \" + dano + \" pontos de ataque!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        EntidadeInimigo inimigo = new EntidadeInimigo();\n        inimigo.ExecutarAtaque();\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Esqueleto ataca causando 25 pontos de ataque!",
                    "description": "Composição de entidade e método de ataque"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie EntidadeInimigo inimigo = new EntidadeInimigo(); e chame inimigo.ExecutarAtaque();"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Esqueleto ataca causando 25 pontos de ataque!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nEntidadeInimigo inimigo = new EntidadeInimigo();\ninimigo.ExecutarAtaque();"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_08, CAP_8: CAP_08 };
}
