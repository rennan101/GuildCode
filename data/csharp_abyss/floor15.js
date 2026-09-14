/**
 * GUILDCODE — C# Unity Abyss Floor 15 Data (csharp_ch15)
 */
const CSHARP_ABYSS_FLOOR_15 = [
  {
    "id": "sq15_1",
    "title": "Câmara 15-1: Disparo de Raycast Físico",
    "difficulty": "medium",
    "chapterId": 15,
    "description": "Execute um disparo de raio chamando Physics.Raycast(Vector3.zero, Vector3.forward, 10f). Emita no Console: 'Raio Disparado: True'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Execute Physics.Raycast\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);\n        Debug.Log(\"Raio Disparado: \" + acertou);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Raio Disparado: True"
      }
    ],
    "reward": {
      "exp": 250,
      "coins": 125
    },
    "tests": [
      {
        "input": "",
        "expected": "Raio Disparado: True",
        "description": "Câmara 15-1: Disparo de Raycast Físico"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Physics.Raycast",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq15_2",
    "title": "Câmara 15-2: Alcance Máximo de Detecção",
    "difficulty": "medium",
    "chapterId": 15,
    "description": "Defina a distância máxima de alcance float alcanceMax = 25.0f;. Emita no Console: 'Alcance do Raio: 25 metros'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare alcanceMax e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float alcanceMax = 25.0f;\n        Debug.Log(\"Alcance do Raio: \" + alcanceMax + \" metros\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Alcance do Raio: 25 metros"
      }
    ],
    "reward": {
      "exp": 250,
      "coins": 125
    },
    "tests": [
      {
        "input": "",
        "expected": "Alcance do Raio: 25 metros",
        "description": "Câmara 15-2: Alcance Máximo de Detecção"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float alcanceMax",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq15_3",
    "title": "Câmara 15-3: Identificação de Objeto Atingido",
    "difficulty": "medium",
    "chapterId": 15,
    "description": "Simule os dados de um RaycastHit: declare string tagAtingida = 'Chao';. Se tagAtingida for 'Chao', emita 'Impacto no Solo Confirmado'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a tag atingida\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tagAtingida = \"Chao\";\n        if (tagAtingida == \"Chao\")\n        {\n            Debug.Log(\"Impacto no Solo Confirmado\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Impacto no Solo Confirmado"
      }
    ],
    "reward": {
      "exp": 250,
      "coins": 125
    },
    "tests": [
      {
        "input": "",
        "expected": "Impacto no Solo Confirmado",
        "description": "Câmara 15-3: Identificação de Objeto Atingido"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string tagAtingida",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq15_4",
    "title": "Câmara 15-4: Máscara de Colisão (LayerMask)",
    "difficulty": "medium",
    "chapterId": 15,
    "description": "Simule a filtragem por camada: declare int layerInimigo = 8;. Emita no Console: 'Mascara de Camada Ativa: 8'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare a layer e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int layerInimigo = 8;\n        Debug.Log(\"Mascara de Camada Ativa: \" + layerInimigo);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Mascara de Camada Ativa: 8"
      }
    ],
    "reward": {
      "exp": 250,
      "coins": 125
    },
    "tests": [
      {
        "input": "",
        "expected": "Mascara de Camada Ativa: 8",
        "description": "Câmara 15-4: Máscara de Colisão (LayerMask)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int layerInimigo",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq15_5",
    "title": "Câmara 15-5: Cálculo de Ponto de Impacto",
    "difficulty": "medium",
    "chapterId": 15,
    "description": "Declare a distância de impacto float distHit = 4.2f;. Emita no Console: 'Impacto a ' + distHit + ' metros'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare distHit e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distHit = 4.2f;\n        Debug.Log(\"Impacto a \" + distHit + \" metros\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Impacto a 4.2 metros"
      }
    ],
    "reward": {
      "exp": 250,
      "coins": 125
    },
    "tests": [
      {
        "input": "",
        "expected": "Impacto a 4.2 metros",
        "description": "Câmara 15-5: Cálculo de Ponto de Impacto"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float distHit",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_15 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_15 = CSHARP_ABYSS_FLOOR_15;
}
