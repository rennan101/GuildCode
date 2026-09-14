/**
 * GUILDCODE — C# Unity Abyss Floor 13 Data (csharp_ch13)
 */
const CSHARP_ABYSS_FLOOR_13 = [
  {
    "id": "sq13_1",
    "title": "Câmara 13-1: Ponto no Espaço Tridimensional",
    "difficulty": "medium",
    "chapterId": 13,
    "description": "Declare um Vector3 pos = new Vector3(2, 5, 8);. Imprima no Console a coordenada X com 'Coord X: ' + pos.x.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare pos e emita Coord X\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pos = new Vector3(2, 5, 8);\n        Debug.Log(\"Coord X: \" + pos.x);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Coord X: 2"
      }
    ],
    "reward": {
      "exp": 230,
      "coins": 115
    },
    "tests": [
      {
        "input": "",
        "expected": "Coord X: 2",
        "description": "Câmara 13-1: Ponto no Espaço Tridimensional"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Vector3",
        "pos.x",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq13_2",
    "title": "Câmara 13-2: Origem do Espaço Mundial (Vector3.zero)",
    "difficulty": "medium",
    "chapterId": 13,
    "description": "Obtenha a coordenada Y do vetor central Vector3.zero. Emita no Console: 'Origem Y: ' + Vector3.zero.y.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba a coordenada Y de Vector3.zero\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Origem Y: \" + Vector3.zero.y);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Origem Y: 0"
      }
    ],
    "reward": {
      "exp": 230,
      "coins": 115
    },
    "tests": [
      {
        "input": "",
        "expected": "Origem Y: 0",
        "description": "Câmara 13-2: Origem do Espaço Mundial (Vector3.zero)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Vector3.zero",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq13_3",
    "title": "Câmara 13-3: Conversão de Espaço Local para Global",
    "difficulty": "medium",
    "chapterId": 13,
    "description": "Simule a translação de uma coordenada local para mundial somando um deslocamento: posMundial = posPai + offset. Com pai em 10 e offset em 3, emita 'Posicao Mundial: 13'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule e imprima posMundial\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int posPai = 10;\n        int offset = 3;\n        int posMundial = posPai + offset;\n        Debug.Log(\"Posicao Mundial: \" + posMundial);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Posicao Mundial: 13"
      }
    ],
    "reward": {
      "exp": 230,
      "coins": 115
    },
    "tests": [
      {
        "input": "",
        "expected": "Posicao Mundial: 13",
        "description": "Câmara 13-3: Conversão de Espaço Local para Global"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int posPai",
        "int offset",
        "posMundial",
        "+"
      ]
    }
  },
  {
    "id": "sq13_4",
    "title": "Câmara 13-4: Identificação dos Três Eixos",
    "difficulty": "medium",
    "chapterId": 13,
    "description": "Declare Vector3 eixos = new Vector3(1, 0, 0);. Se eixos.x == 1, emita 'Eixo Selecionado: X (Largura)'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare eixos e avalie\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 eixos = new Vector3(1, 0, 0);\n        if (eixos.x == 1)\n        {\n            Debug.Log(\"Eixo Selecionado: X (Largura)\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Eixo Selecionado: X (Largura)"
      }
    ],
    "reward": {
      "exp": 230,
      "coins": 115
    },
    "tests": [
      {
        "input": "",
        "expected": "Eixo Selecionado: X (Largura)",
        "description": "Câmara 13-4: Identificação dos Três Eixos"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "new Vector3(1, 0, 0)",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq13_5",
    "title": "Câmara 13-5: Espaço Unitário (Vector3.one)",
    "difficulty": "medium",
    "chapterId": 13,
    "description": "Declare Vector3 escala = Vector3.one;. Emita no Console: 'Escala Inicial: ' + escala.x + ', ' + escala.y + ', ' + escala.z.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare escala com Vector3.one e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 escala = Vector3.one;\n        Debug.Log(\"Escala Inicial: \" + escala.x + \", \" + escala.y + \", \" + escala.z);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Escala Inicial: 1, 1, 1"
      }
    ],
    "reward": {
      "exp": 230,
      "coins": 115
    },
    "tests": [
      {
        "input": "",
        "expected": "Escala Inicial: 1, 1, 1",
        "description": "Câmara 13-5: Espaço Unitário (Vector3.one)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Vector3.one",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_13 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_13 = CSHARP_ABYSS_FLOOR_13;
}
