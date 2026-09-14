/**
 * GUILDCODE — C# Unity Abyss Floor 20 Data (csharp_ch20)
 */
const CSHARP_ABYSS_FLOOR_20 = [
  {
    "id": "sq20_1",
    "title": "Câmara 20-1: Contagem de Vértices da Geometria",
    "difficulty": "medium",
    "chapterId": 20,
    "description": "Declare int totalVertices = 24;. Emita no Console: 'Vertices da Malha: 24'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare totalVertices e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalVertices = 24;\n        Debug.Log(\"Vertices da Malha: \" + totalVertices);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Vertices da Malha: 24"
      }
    ],
    "reward": {
      "exp": 300,
      "coins": 150
    },
    "tests": [
      {
        "input": "",
        "expected": "Vertices da Malha: 24",
        "description": "Câmara 20-1: Contagem de Vértices da Geometria"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int totalVertices",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq20_2",
    "title": "Câmara 20-2: Triângulos e Faces Poligonais",
    "difficulty": "medium",
    "chapterId": 20,
    "description": "Cada quad requer 2 triângulos. Para 6 faces de um cubo, calcule totalTriangulos = 6 * 2 e emita 'Total Triangulos: ' + totalTriangulos.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule totalTriangulos e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalTriangulos = 6 * 2;\n        Debug.Log(\"Total Triangulos: \" + totalTriangulos);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Total Triangulos: 12"
      }
    ],
    "reward": {
      "exp": 300,
      "coins": 150
    },
    "tests": [
      {
        "input": "",
        "expected": "Total Triangulos: 12",
        "description": "Câmara 20-2: Triângulos e Faces Poligonais"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "totalTriangulos",
        "6 * 2",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq20_3",
    "title": "Câmara 20-3: Mapeamento UV de Textura",
    "difficulty": "medium",
    "chapterId": 20,
    "description": "Declare Vector2 uv = new Vector2(0.5f, 0.5f);. Emita no Console: 'Centro UV: (0.5, 0.5)'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare uv e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 uv = new Vector2(0.5f, 0.5f);\n        Debug.Log(\"Centro UV: (\" + uv.x + \", \" + uv.y + \")\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Centro UV: (0.5, 0.5)"
      }
    ],
    "reward": {
      "exp": 300,
      "coins": 150
    },
    "tests": [
      {
        "input": "",
        "expected": "Centro UV: (0.5, 0.5)",
        "description": "Câmara 20-3: Mapeamento UV de Textura"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "new Vector2",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq20_4",
    "title": "Câmara 20-4: Recálculo de Normais da Malha",
    "difficulty": "medium",
    "chapterId": 20,
    "description": "Declare string statusNormais = 'Normais Recalculadas com Sucesso';. Emita no Console o valor de statusNormais.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusNormais e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusNormais = \"Normais Recalculadas com Sucesso\";\n        Debug.Log(statusNormais);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Normais Recalculadas com Sucesso"
      }
    ],
    "reward": {
      "exp": 300,
      "coins": 150
    },
    "tests": [
      {
        "input": "",
        "expected": "Normais Recalculadas com Sucesso",
        "description": "Câmara 20-4: Recálculo de Normais da Malha"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string statusNormais",
        "statusNormais",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq20_5",
    "title": "Câmara 20-5: Otimização de Submeshes",
    "difficulty": "medium",
    "chapterId": 20,
    "description": "Declare int submeshes = 1;. Se submeshes == 1, emita 'Malha Otimizada: Draw Call Unico'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque as submeshes\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int submeshes = 1;\n        if (submeshes == 1)\n        {\n            Debug.Log(\"Malha Otimizada: Draw Call Unico\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Malha Otimizada: Draw Call Unico"
      }
    ],
    "reward": {
      "exp": 300,
      "coins": 150
    },
    "tests": [
      {
        "input": "",
        "expected": "Malha Otimizada: Draw Call Unico",
        "description": "Câmara 20-5: Otimização de Submeshes"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int submeshes",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_20 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_20 = CSHARP_ABYSS_FLOOR_20;
}
