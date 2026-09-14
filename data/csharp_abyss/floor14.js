/**
 * GUILDCODE — C# Unity Abyss Floor 14 Data (csharp_ch14)
 */
const CSHARP_ABYSS_FLOOR_14 = [
  {
    "id": "sq14_1",
    "title": "Câmara 14-1: Cálculo de Distância Euclidiana",
    "difficulty": "medium",
    "chapterId": 14,
    "description": "Declare Vector3 a = new Vector3(0, 0, 0); e Vector3 b = new Vector3(3, 4, 0);. Calcule a distância com Vector3.Distance(a, b) e exiba 'Distancia: ' + dist.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a distancia entre a e b\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 a = new Vector3(0, 0, 0);\n        Vector3 b = new Vector3(3, 4, 0);\n        float dist = Vector3.Distance(a, b);\n        Debug.Log(\"Distancia: \" + dist);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Distancia: 5"
      }
    ],
    "reward": {
      "exp": 240,
      "coins": 120
    },
    "tests": [
      {
        "input": "",
        "expected": "Distancia: 5",
        "description": "Câmara 14-1: Cálculo de Distância Euclidiana"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Vector3.Distance",
        "new Vector3",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq14_2",
    "title": "Câmara 14-2: Normalização de Vetor",
    "difficulty": "medium",
    "chapterId": 14,
    "description": "Declare Vector3 dir = new Vector3(5, 0, 0);. Calcule o vetor normalizado com Vector3.Normalize(dir) e exiba 'Dir X: ' + norm.x.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Normalize dir e exiba norm.x\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 dir = new Vector3(5, 0, 0);\n        var norm = Vector3.Normalize(dir);\n        Debug.Log(\"Dir X: \" + norm.x);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dir X: 1"
      }
    ],
    "reward": {
      "exp": 240,
      "coins": 120
    },
    "tests": [
      {
        "input": "",
        "expected": "Dir X: 1",
        "description": "Câmara 14-2: Normalização de Vetor"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Vector3.Normalize",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq14_3",
    "title": "Câmara 14-3: Produto Escalar (Vector3.Dot)",
    "difficulty": "medium",
    "chapterId": 14,
    "description": "Declare Vector3 frente = Vector3.forward; e Vector3 alvo = Vector3.forward;. Calcule o alinhamento com Vector3.Dot(frente, alvo) e exiba 'Alinhamento: ' + dot.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o produto escalar\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 frente = Vector3.forward;\n        Vector3 alvo = Vector3.forward;\n        float dot = Vector3.Dot(frente, alvo);\n        Debug.Log(\"Alinhamento: \" + dot);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Alinhamento: 1"
      }
    ],
    "reward": {
      "exp": 240,
      "coins": 120
    },
    "tests": [
      {
        "input": "",
        "expected": "Alinhamento: 1",
        "description": "Câmara 14-3: Produto Escalar (Vector3.Dot)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Vector3.Dot",
        "Vector3.forward",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq14_4",
    "title": "Câmara 14-4: Produto Vetorial (Vector3.Cross)",
    "difficulty": "medium",
    "chapterId": 14,
    "description": "Obtenha a normal perpendicular usando Vector3.Cross: declare Vector3 direito = Vector3.right; e Vector3 cima = Vector3.up;. Calcule Vector3.Cross(direito, cima) e emita 'Normal Z: ' + cross.z.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o cross product\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 direito = Vector3.right;\n        Vector3 cima = Vector3.up;\n        var cross = Vector3.Cross(direito, cima);\n        Debug.Log(\"Normal Z: \" + cross.z);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Normal Z: 1"
      }
    ],
    "reward": {
      "exp": 240,
      "coins": 120
    },
    "tests": [
      {
        "input": "",
        "expected": "Normal Z: 1",
        "description": "Câmara 14-4: Produto Vetorial (Vector3.Cross)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Vector3.Cross",
        "Vector3.right",
        "Vector3.up"
      ]
    }
  },
  {
    "id": "sq14_5",
    "title": "Câmara 14-5: Alcance de Radar de Proximidade",
    "difficulty": "medium",
    "chapterId": 14,
    "description": "Calcule a distância entre o jogador em (0,0,0) e um inimigo em (0,0,8). Se a distância for menor que 10, emita 'Alvo no Radar: 8m'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a distancia e avalie o radar\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 player = Vector3.zero;\n        Vector3 enemy = new Vector3(0, 0, 8);\n        float dist = Vector3.Distance(player, enemy);\n        if (dist < 10)\n        {\n            Debug.Log(\"Alvo no Radar: \" + dist + \"m\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Alvo no Radar: 8m"
      }
    ],
    "reward": {
      "exp": 240,
      "coins": 120
    },
    "tests": [
      {
        "input": "",
        "expected": "Alvo no Radar: 8m",
        "description": "Câmara 14-5: Alcance de Radar de Proximidade"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Vector3.Distance",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_14 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_14 = CSHARP_ABYSS_FLOOR_14;
}
