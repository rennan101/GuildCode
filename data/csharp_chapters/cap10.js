/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 10
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 10 — CICLO DE VIDA DO MONOBEHAVIOUR
// ═══════════════════════════════════════════════════════

const CAP_10 = {
    "id": 10,
    "artifactReward": null,
    "title": "Ciclo de Vida do MonoBehaviour",
    "theme": "Módulo 2 — Fundamentos do Unity",
    "unlock": "Ampulheta Update",
    "unlockIcon": "[CYCLE]",
    "character": "arkan",
    "xpReward": 170,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Conectando ao Clock Universal da Engine. Ciclo de vida de execução de scripts inicializado."
        },
        {
            "type": "narrative",
            "text": "O pulso rítmico da dimensão dita a frequência dos eventos. Arkan Velor desenha a linha do tempo sequencial dos métodos internos da Unity."
        },
        {
            "type": "character",
            "name": "ARKAN VELOR",
            "role": "MESTRE DA GUILDA",
            "cssClass": "arkan",
            "text": "Um script herdado de <code>MonoBehaviour</code> não possui uma função main() comum! A engine invoca automaticamente métodos específicos em cada fase da vida do objeto: nascimento, atualização de quadro, física e morte."
        },
        {
            "type": "character",
            "name": "LYRA NEX",
            "role": "ARQUIVISTA",
            "cssClass": "lyra",
            "text": "A ordem sagrada de nascimento é imutável: <code>Awake()</code> é chamado primeiro para autoinicialização, seguido de <code>Start()</code> para conexões com outros scripts. Depois vem o loop contínuo: <code>Update()</code> roda a cada frame gráfico, <code>FixedUpdate()</code> a cada 0.02s para física determinística e <code>LateUpdate()</code> para câmeras seguirem personagens após eles terem se movido!"
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "Quando uma entidade é destruída ou sai da cena, <code>OnDestroy()</code> é disparado para liberar recursos e cancelar assinaturas. Conhecer essa linha do tempo evita as armadilhas mais comuns de NullReferenceException em jogos."
        }
    ],
    "concept": {
        "title": "CICLO DE VIDA DO MONOBEHAVIOUR: AWAKE, START, UPDATE E FIXEDUPDATE",
        "explanation": "Scripts no Unity executam seus métodos em uma ordem estrita definida pelo loop do motor:\n<ul>\n  <li><strong><code>Awake()</code>:</strong> Executado uma única vez assim que o GameObject é instanciado, ideal para inicializar referências internas.</li>\n  <li><strong><code>Start()</code>:</strong> Executado no primeiro quadro antes de qualquer Update, quando todos os GameObjects já foram despertados.</li>\n  <li><strong><code>Update()</code>:</strong> Chamado a cada quadro de renderização, utilizado para leitura de inputs e lógica dinâmica.</li>\n  <li><strong><code>FixedUpdate()</code>:</strong> Chamado em passos fixos de física (padrão 50Hz/0.02s), essencial para aplicar forças em Rigidbody.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploCicloVida : MonoBehaviour\n{\n    void Awake()\n    {\n        Debug.Log(\"[1] Awake: Referencias internas inicializadas\");\n    }\n\n    void Start()\n    {\n        Debug.Log(\"[2] Start: Conexoes de gameplay estabelecidas\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Sequência de Inicialização de Entidade",
        "code": "using UnityEngine;\n\npublic class InicializadorEntidade : MonoBehaviour\n{\n    void Start()\n    {\n        string etapa1 = \"Awake: Carregando Atributos Base\";\n        string etapa2 = \"Start: Sincronizando com a Guilda\";\n        string etapa3 = \"Update: Escutando Acoes do Jogador\";\n\n        Debug.Log(\"Passo 1: \" + etapa1);\n        Debug.Log(\"Passo 2: \" + etapa2);\n        Debug.Log(\"Passo 3: \" + etapa3);\n    }\n}",
        "output": "Passo 1: Awake: Carregando Atributos Base\nPasso 2: Start: Sincronizando com a Guilda\nPasso 3: Update: Escutando Acoes do Jogador"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Ajuste os passos do ciclo de vida e visualize a ordem de execução.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"1. Awake -> 2. OnEnable -> 3. Start -> 4. Update\");\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Emita a mensagem de inicialização do método Awake:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Fase Awake: Sistema Carregado\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Fase Awake: Sistema Carregado\");\n    }\n}",
                "hint": "Fase Awake: Sistema Carregado"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_10_1",
            "title": "Fase de Despertar (Awake)",
            "difficulty": "easy",
            "description": "Crie a variável string status = \"Awake: Inicializando Memoria\"; e emita no console: 'Status Ciclo: ' + status.",
            "validationRules": {
                "requiredPatterns": [
                    "string status",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare status e emita a mensagem\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string status = \"Awake: Inicializando Memoria\";\n        Debug.Log(\"Status Ciclo: \" + status);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Status Ciclo: Awake: Inicializando Memoria",
                    "description": "Execução da fase Awake"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Declare status = \"Awake: Inicializando Memoria\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Status Ciclo: Awake: Inicializando Memoria"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring status = \"Awake: Inicializando Memoria\";\nDebug.Log(\"Status Ciclo: \" + status);"
                }
            ]
        },
        {
            "id": "cs_act_10_2",
            "title": "Fase de Início de Gameplay (Start)",
            "difficulty": "easy",
            "description": "Declare bool prontoParaJogar = true;. Emita no console: 'Fase Start: Gameplay Liberado (Pronto: ' + prontoParaJogar + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "bool prontoParaJogar",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure prontoParaJogar e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool prontoParaJogar = true;\n        Debug.Log(\"Fase Start: Gameplay Liberado (Pronto: \" + prontoParaJogar + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Fase Start: Gameplay Liberado (Pronto: True)",
                    "description": "Execução da fase Start"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina bool prontoParaJogar = true;"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Fase Start: Gameplay Liberado (Pronto: True)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nbool prontoParaJogar = true;\nDebug.Log(\"Fase Start: Gameplay Liberado (Pronto: \" + prontoParaJogar + \")\");"
                }
            ]
        },
        {
            "id": "cs_act_10_3",
            "title": "Simulação de Quadro Contínuo (Update Loop)",
            "difficulty": "medium",
            "description": "Utilizando um laço for (int frame = 1; frame <= 3; frame++), simule 3 quadros e emita em cada iteração: 'Processando Update no Frame #' + frame.",
            "validationRules": {
                "requiredPatterns": [
                    "for",
                    "frame <=",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Simule 3 frames com loop for\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int frame = 1; frame <= 3; frame++)\n        {\n            Debug.Log(\"Processando Update no Frame #\" + frame);\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Processando Update no Frame #1\nProcessando Update no Frame #2\nProcessando Update no Frame #3",
                    "description": "Execução de laço de atualização"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use for (int frame = 1; frame <= 3; frame++)."
                },
                {
                    "level": "II",
                    "text": "A saída terá 3 linhas numeradas de 1 a 3."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfor (int frame = 1; frame <= 3; frame++) {\n    Debug.Log(\"Processando Update no Frame #\" + frame);\n}"
                }
            ]
        },
        {
            "id": "cs_act_10_4",
            "title": "Passo Fixo de Física (FixedUpdate)",
            "difficulty": "medium",
            "description": "Declare float fixedDeltaTime = 0.02f; e int passos = 50;. Calcule a taxa de atualização por segundo (passos) e emita: 'FixedUpdate Taxa: 50Hz (Intervalo: ' + fixedDeltaTime + 's)'.",
            "validationRules": {
                "requiredPatterns": [
                    "fixedDeltaTime",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare fixedDeltaTime e emita a taxa\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float fixedDeltaTime = 0.02f;\n        int passos = 50;\n        Debug.Log(\"FixedUpdate Taxa: \" + passos + \"Hz (Intervalo: \" + fixedDeltaTime + \"s)\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "FixedUpdate Taxa: 50Hz (Intervalo: 0.02s)",
                    "description": "Configuração de passo fixo de física"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina float fixedDeltaTime = 0.02f; e emita a mensagem formatada."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: FixedUpdate Taxa: 50Hz (Intervalo: 0.02s)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nfloat fixedDeltaTime = 0.02f;\nDebug.Log(\"FixedUpdate Taxa: 50Hz (Intervalo: \" + fixedDeltaTime + \"s)\");"
                }
            ]
        },
        {
            "id": "cs_act_10_5",
            "artifactReward": {
                "artifactId": "Necklace_Starlight",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Orquestrador do Ciclo de Vida Completo",
            "difficulty": "medium",
            "description": "Crie a classe CicloManager com os métodos: public void ExecutarAwake() emitindo '1. Awake OK', public void ExecutarStart() emitindo '2. Start OK' e public void ExecutarUpdate() emitindo '3. Update OK'. Instancie CicloManager e chame os 3 métodos em ordem.",
            "validationRules": {
                "requiredPatterns": [
                    "class CicloManager",
                    "ExecutarAwake",
                    "ExecutarStart",
                    "ExecutarUpdate",
                    "new CicloManager()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class CicloManager\n{\n    public void ExecutarAwake() { Debug.Log(\"1. Awake OK\"); }\n    public void ExecutarStart() { Debug.Log(\"2. Start OK\"); }\n    public void ExecutarUpdate() { Debug.Log(\"3. Update OK\"); }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie CicloManager e execute os 3 passos\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class CicloManager\n{\n    public void ExecutarAwake() { Debug.Log(\"1. Awake OK\"); }\n    public void ExecutarStart() { Debug.Log(\"2. Start OK\"); }\n    public void ExecutarUpdate() { Debug.Log(\"3. Update OK\"); }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        CicloManager ciclo = new CicloManager();\n        ciclo.ExecutarAwake();\n        ciclo.ExecutarStart();\n        ciclo.ExecutarUpdate();\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "1. Awake OK\n2. Start OK\n3. Update OK",
                    "description": "Orquestração completa do ciclo de vida"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie CicloManager ciclo = new CicloManager(); e chame os 3 métodos sequencialmente."
                },
                {
                    "level": "II",
                    "text": "A saída terá 3 linhas: 1. Awake OK, 2. Start OK, 3. Update OK"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nCicloManager ciclo = new CicloManager();\nciclo.ExecutarAwake();\nciclo.ExecutarStart();\nciclo.ExecutarUpdate();"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_10, CAP_10: CAP_10 };
}
