/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 20
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 20 — GEOMETRIAS 3D E MESHES
// ═══════════════════════════════════════════════════════

const CAP_20 = {
    "id": 20,
    "artifactReward": null,
    "title": "Geometrias 3D e Meshes",
    "theme": "Módulo 7 — Mundo 3D",
    "unlock": "Malha Poligonal",
    "unlockIcon": "[MESH]",
    "character": "orin",
    "xpReward": 270,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Entrando no Módulo 7 — Mundo 3D. Topologia poligonal e malhas 3D sincronizadas."
        },
        {
            "type": "narrative",
            "text": "Estruturas de arame (wireframes) desenham-se no ar como constelações geométricas. Orin Vale esculpe vértices e triângulos de luz pura."
        },
        {
            "type": "character",
            "name": "ORIN VALE",
            "role": "EXPLORADOR DE CENÁRIOS",
            "cssClass": "orin",
            "text": "Tudo o que você enxerga em um jogo tridimensional — um monstro, uma rocha ou uma espada — é uma **Mesh**! Uma malha é formada por vértices no espaço, triângulos que ligam esses vértices e coordenadas de textura chamadas UVs."
        },
        {
            "type": "character",
            "name": "MIRA SOLIS",
            "role": "CARTÓGRAFA & ARTÍFICE",
            "cssClass": "mira",
            "text": "Em computação gráfica, placas quadradas (quads) não existem na GPU: cada quad é obrigatoriamente formado por 2 triângulos! Um cubo simples de 6 faces, por exemplo, é composto por exatamente 12 triângulos poligonais."
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "Para que a iluminação reaja corretamente sobre a superfície, calculamos as normais da malha com <code>RecalculateNormals()</code>. Aprenda como a geometria 3D se estrutura neste capítulo."
        }
    ],
    "concept": {
        "title": "GEOMETRIAS 3D E MESHES: VÉRTICES, TRIÂNGULOS E TOPOLOGIA",
        "explanation": "Modelos tridimensionais no Unity são construídos a partir de malhas poligonais (<code>Mesh</code>):\n<ul>\n  <li><strong>Vértices (<code>vertices</code>):</strong> Lista de pontos 3D que definem as quinas da geometria.</li>\n  <li><strong>Triângulos (<code>triangles</code>):</strong> Array de inteiros que agrupam vértices de 3 em 3 para formar as faces.</li>\n  <li><strong>Normais (<code>normals</code>):</strong> Vetores perpendiculares a cada face que determinam como a luz é refletida.</li>\n  <li><strong>MeshFilter e MeshRenderer:</strong> O MeshFilter armazena a geometria e o MeshRenderer desenha na tela.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploMesh : MonoBehaviour\n{\n    void Start()\n    {\n        int totalVertices = 8;\n        int totalTriangulos = 12; // Cubo = 6 faces * 2 triângulos\n\n        Debug.Log(\"Malha 3D Criada: \" + totalVertices + \" vertices e \" + totalTriangulos + \" triangulos\");\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Gerador Procedural de Plano Quadrado (Quad)",
        "code": "using UnityEngine;\n\npublic class GeradorQuad : MonoBehaviour\n{\n    void Start()\n    {\n        int verticesCount = 4;\n        int facesCount = 2;\n        string nomeMalha = \"Piso_Dungeon\";\n\n        Debug.Log(\"Mesh Gerada: \" + nomeMalha);\n        Debug.Log(\"Total Vertices: \" + verticesCount + \" | Triangulos: \" + facesCount);\n    }\n}",
        "output": "Mesh Gerada: Piso_Dungeon\nTotal Vertices: 4 | Triangulos: 2"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique a contagem de vértices e polígonos.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        int v = 24;\n        Debug.Log(\"Vertices do Cubo: \" + v);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Declare a contagem de vértices da malha e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vertices = 120;\n        Debug.Log(\"Malha Carregada: \" + vertices + \" vertices\");\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vertices = 120;\n        Debug.Log(\"Malha Carregada: \" + vertices + \" vertices\");\n    }\n}",
                "hint": "Malha Carregada: 120 vertices"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_20_1",
            "title": "Contagem de Vértices de um Modelo 3D",
            "difficulty": "easy",
            "description": "Declare string modelo = \"Escudo_Arcano\"; e int vertices = 48;. Emita: 'Modelo ' + modelo + ' possui ' + vertices + ' vertices.'.",
            "validationRules": {
                "requiredPatterns": [
                    "string modelo",
                    "vertices",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare as variáveis do modelo e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string modelo = \"Escudo_Arcano\";\n        int vertices = 48;\n        Debug.Log(\"Modelo \" + modelo + \" possui \" + vertices + \" vertices.\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Modelo Escudo_Arcano possui 48 vertices.",
                    "description": "Contagem de vértices da malha"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina modelo = \"Escudo_Arcano\" e vertices = 48."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Modelo Escudo_Arcano possui 48 vertices."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nstring modelo = \"Escudo_Arcano\";\nint vertices = 48;\nDebug.Log(\"Modelo \" + modelo + \" possui \" + vertices + \" vertices.\");"
                }
            ]
        },
        {
            "id": "cs_act_20_2",
            "title": "Cálculo de Triângulos a partir de Faces Quadrangulares",
            "difficulty": "easy",
            "description": "Dado int facesQuadradas = 6; (um cubo possui 6 faces e cada face tem 2 triângulos), calcule int totalTriangulos = facesQuadradas * 2;. Emita: 'Total de Triangulos do Cubo: ' + totalTriangulos.",
            "validationRules": {
                "requiredPatterns": [
                    "facesQuadradas",
                    "totalTriangulos",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule os triângulos do cubo e emita\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int facesQuadradas = 6;\n        int totalTriangulos = facesQuadradas * 2;\n        Debug.Log(\"Total de Triangulos do Cubo: \" + totalTriangulos);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Total de Triangulos do Cubo: 12",
                    "description": "Triangulação de polígonos"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Multiplique facesQuadradas * 2."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Total de Triangulos do Cubo: 12"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nint totalTriangulos = facesQuadradas * 2;\nDebug.Log(\"Total de Triangulos do Cubo: \" + totalTriangulos);"
                }
            ]
        },
        {
            "id": "cs_act_20_3",
            "title": "Verificação de Normal de Iluminação",
            "difficulty": "medium",
            "description": "Declare Vector3 normalFace = new Vector3(0, 1, 0);. Emita no console: 'Vetor Normal da Superficie: (' + normalFace.x + ', ' + normalFace.y + ', ' + normalFace.z + ')'.",
            "validationRules": {
                "requiredPatterns": [
                    "Vector3 normalFace",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o vetor normal e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 normalFace = new Vector3(0, 1, 0);\n        Debug.Log(\"Vetor Normal da Superficie: (\" + normalFace.x + \", \" + normalFace.y + \", \" + normalFace.z + \")\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Vetor Normal da Superficie: (0, 1, 0)",
                    "description": "Normal de superfície"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie normalFace = new Vector3(0, 1, 0)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Vetor Normal da Superficie: (0, 1, 0)"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nVector3 normalFace = new Vector3(0, 1, 0);\nDebug.Log(\"Vetor Normal da Superficie: (\" + normalFace.x + \", \" + normalFace.y + \", \" + normalFace.z + \")\");"
                }
            ]
        },
        {
            "id": "cs_act_20_4",
            "title": "Calculador de Índices de Triângulos",
            "difficulty": "medium",
            "description": "Crie a classe AnalisadorMalha com public int ObterTotalIndices(int numTriangulos) { return numTriangulos * 3; }. Instancie e calcule para numTriangulos = 50, emitindo: 'Total de Indices no Buffer: ' + totalIndices.",
            "validationRules": {
                "requiredPatterns": [
                    "class AnalisadorMalha",
                    "ObterTotalIndices",
                    "new AnalisadorMalha()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class AnalisadorMalha\n{\n    public int ObterTotalIndices(int numTriangulos)\n    {\n        return numTriangulos * 3;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule os índices para 50 triângulos\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class AnalisadorMalha\n{\n    public int ObterTotalIndices(int numTriangulos)\n    {\n        return numTriangulos * 3;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        AnalisadorMalha analise = new AnalisadorMalha();\n        int totalIndices = analise.ObterTotalIndices(50);\n        Debug.Log(\"Total de Indices no Buffer: \" + totalIndices);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Total de Indices no Buffer: 150",
                    "description": "Buffer de índices de vértices"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie AnalisadorMalha analise = new AnalisadorMalha(); e calcule com 50."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Total de Indices no Buffer: 150"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nAnalisadorMalha analise = new AnalisadorMalha();\nint totalIndices = analise.ObterTotalIndices(50);\nDebug.Log(\"Total de Indices no Buffer: \" + totalIndices);"
                }
            ]
        },
        {
            "id": "cs_act_20_5",
            "artifactReward": {
                "artifactId": "Crown_Genesis",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Construtor Procedural de Malha em Classe",
            "difficulty": "medium",
            "description": "Crie a classe ConstrutorMalha com public void GerarMalha(string nomeMesh, int numVertices) { Debug.Log(\"Malha Procedural [\" + nomeMesh + \"] gerada com \" + numVertices + \" vertices!\"); }. Instancie e execute para nomeMesh = \"Terreno_Montanha\" e numVertices = 256.",
            "validationRules": {
                "requiredPatterns": [
                    "class ConstrutorMalha",
                    "GerarMalha",
                    "new ConstrutorMalha()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ConstrutorMalha\n{\n    public void GerarMalha(string nomeMesh, int numVertices)\n    {\n        Debug.Log(\"Malha Procedural [\" + nomeMesh + \"] gerada com \" + numVertices + \" vertices!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e gere a malha Terreno_Montanha com 256 vértices\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ConstrutorMalha\n{\n    public void GerarMalha(string nomeMesh, int numVertices)\n    {\n        Debug.Log(\"Malha Procedural [\" + nomeMesh + \"] gerada com \" + numVertices + \" vertices!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ConstrutorMalha construtor = new ConstrutorMalha();\n        construtor.GerarMalha(\"Terreno_Montanha\", 256);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Malha Procedural [Terreno_Montanha] gerada com 256 vertices!",
                    "description": "Geração procedural de malha"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie ConstrutorMalha construtor = new ConstrutorMalha(); e chame GerarMalha(\"Terreno_Montanha\", 256);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Malha Procedural [Terreno_Montanha] gerada com 256 vertices!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nConstrutorMalha construtor = new ConstrutorMalha();\nconstrutor.GerarMalha(\"Terreno_Montanha\", 256);"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_20, CAP_20: CAP_20 };
}
