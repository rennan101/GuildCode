/**
 * GUILDCODE — C# Unity Abyss Floor 9 Data (csharp_ch9)
 */
const CSHARP_ABYSS_FLOOR_09 = [
  {
    "id": "sq9_1",
    "title": "Câmara 9-1: Leitura de Posição Inicial",
    "difficulty": "medium",
    "chapterId": 9,
    "description": "Acesse as coordenadas de posição inicial do transform e emita no Console: 'Posicao X: ' + transform.position.x.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba a coordenada X da posicao\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Posicao X: \" + transform.position.x);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Posicao X: 0"
      }
    ],
    "reward": {
      "exp": 190,
      "coins": 95
    },
    "tests": [
      {
        "input": "",
        "expected": "Posicao X: 0",
        "description": "Câmara 9-1: Leitura de Posição Inicial"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "transform.position.x",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq9_2",
    "title": "Câmara 9-2: Deslocamento com Translate",
    "difficulty": "medium",
    "chapterId": 9,
    "description": "Simule um deslocamento: declare float vel = 5.0f e float dt = 0.016f. Calcule o deslocamento como vel * dt e emita 'Deslocamento: ' + deslocamento.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vel = 5.0f;\n        float dt = 0.016f;\n        // Calcule o deslocamento e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vel = 5.0f;\n        float dt = 0.016f;\n        float deslocamento = vel * dt;\n        Debug.Log(\"Deslocamento: \" + deslocamento);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Deslocamento: 0.08"
      }
    ],
    "reward": {
      "exp": 190,
      "coins": 95
    },
    "tests": [
      {
        "input": "",
        "expected": "Deslocamento: 0.08",
        "description": "Câmara 9-2: Deslocamento com Translate"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float vel",
        "float dt",
        "vel * dt",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq9_3",
    "title": "Câmara 9-3: Ajuste de Escala Local",
    "difficulty": "medium",
    "chapterId": 9,
    "description": "Simule a alteração da escala de um objeto: defina escalaX = 2.0f e escalaY = 2.0f. Emita no Console: 'Nova Escala: (2, 2)'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure as escalas e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float escalaX = 2.0f;\n        float escalaY = 2.0f;\n        Debug.Log(\"Nova Escala: (\" + escalaX + \", \" + escalaY + \")\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Nova Escala: (2, 2)"
      }
    ],
    "reward": {
      "exp": 190,
      "coins": 95
    },
    "tests": [
      {
        "input": "",
        "expected": "Nova Escala: (2, 2)",
        "description": "Câmara 9-3: Ajuste de Escala Local"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float escalaX",
        "float escalaY",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq9_4",
    "title": "Câmara 9-4: Rotação em Torno do Eixo Y",
    "difficulty": "medium",
    "chapterId": 9,
    "description": "Declare a velocidade de giro float velRotacao = 90.0f;. Emita no Console: 'Rotacao Y: ' + velRotacao + ' graus/s'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare velRotacao e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float velRotacao = 90.0f;\n        Debug.Log(\"Rotacao Y: \" + velRotacao + \" graus/s\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Rotacao Y: 90 graus/s"
      }
    ],
    "reward": {
      "exp": 190,
      "coins": 95
    },
    "tests": [
      {
        "input": "",
        "expected": "Rotacao Y: 90 graus/s",
        "description": "Câmara 9-4: Rotação em Torno do Eixo Y"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float velRotacao",
        "velRotacao",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq9_5",
    "title": "Câmara 9-5: Vetor Forward de Direção",
    "difficulty": "medium",
    "chapterId": 9,
    "description": "Obtenha a coordenada z do vetor direcional transform.forward. Emita no Console: 'Direcao Z: ' + transform.forward.z.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba o forward z\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Direcao Z: \" + transform.forward.z);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Direcao Z: 1"
      }
    ],
    "reward": {
      "exp": 190,
      "coins": 95
    },
    "tests": [
      {
        "input": "",
        "expected": "Direcao Z: 1",
        "description": "Câmara 9-5: Vetor Forward de Direção"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "transform.forward.z",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_09 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_09 = CSHARP_ABYSS_FLOOR_09;
}
