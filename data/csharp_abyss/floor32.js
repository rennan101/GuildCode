/**
 * GUILDCODE — C# Unity Abyss Floor 32 Data (csharp_ch32)
 */
const CSHARP_ABYSS_FLOOR_32 = [
  {
    "id": "sq32_1",
    "title": "Câmara 32-1: Serialização de Objeto para JSON",
    "difficulty": "medium",
    "chapterId": 32,
    "description": "Simule a serialização de dados de save: declare string json = '{\"fase\":3,\"moedas\":150}';. Emita no Console: 'JSON: ' + json.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure a string json e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string json = \"{\\\"fase\\\":3,\\\"moedas\\\":150}\";\n        Debug.Log(\"JSON: \" + json);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "JSON: {\"fase\":3,\"moedas\":150}"
      }
    ],
    "reward": {
      "exp": 420,
      "coins": 210
    },
    "tests": [
      {
        "input": "",
        "expected": "JSON: {\"fase\":3,\"moedas\":150}",
        "description": "Câmara 32-1: Serialização de Objeto para JSON"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "json",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq32_2",
    "title": "Câmara 32-2: Uso do JsonUtility.ToJson",
    "difficulty": "medium",
    "chapterId": 32,
    "description": "Simule a conversão de um vetor em JSON: chame JsonUtility.ToJson(Vector3.one). Emita no Console: 'Serializado com JsonUtility'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Use JsonUtility.ToJson\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string txt = JsonUtility.ToJson(Vector3.one);\n        Debug.Log(\"Serializado com JsonUtility\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Serializado com JsonUtility"
      }
    ],
    "reward": {
      "exp": 420,
      "coins": 210
    },
    "tests": [
      {
        "input": "",
        "expected": "Serializado com JsonUtility",
        "description": "Câmara 32-2: Uso do JsonUtility.ToJson"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "JsonUtility.ToJson",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq32_3",
    "title": "Câmara 32-3: Desserialização e Resgate de Valores",
    "difficulty": "medium",
    "chapterId": 32,
    "description": "Simule a extração de dados desserializados: declare int faseCarregada = 5; int vidaCarregada = 100;. Emita 'Save Carregado: Fase 5 (Vida: 100)'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os dados carregados e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int faseCarregada = 5;\n        int vidaCarregada = 100;\n        Debug.Log(\"Save Carregado: Fase \" + faseCarregada + \" (Vida: \" + vidaCarregada + \")\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Save Carregado: Fase 5 (Vida: 100)"
      }
    ],
    "reward": {
      "exp": 420,
      "coins": 210
    },
    "tests": [
      {
        "input": "",
        "expected": "Save Carregado: Fase 5 (Vida: 100)",
        "description": "Câmara 32-3: Desserialização e Resgate de Valores"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "faseCarregada",
        "vidaCarregada",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq32_4",
    "title": "Câmara 32-4: Anotação [System.Serializable]",
    "difficulty": "medium",
    "chapterId": 32,
    "description": "Declare string statusSerial = 'Estrutura Marcada como Serializavel';. Emita no Console o valor de statusSerial.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusSerial e emita o status de serializacao\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusSerial = \"Estrutura Marcada como Serializavel\";\n        Debug.Log(statusSerial);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Estrutura Marcada como Serializavel"
      }
    ],
    "reward": {
      "exp": 420,
      "coins": 210
    },
    "tests": [
      {
        "input": "",
        "expected": "Estrutura Marcada como Serializavel",
        "description": "Câmara 32-4: Anotação [System.Serializable]"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string statusSerial",
        "statusSerial",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq32_5",
    "title": "Câmara 32-5: Integridade de Arquivo de Save",
    "difficulty": "medium",
    "chapterId": 32,
    "description": "Declare bool saveValido = true;. Se for verdadeiro, emita 'Arquivo de Save Valido e Carregado'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide o save e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool saveValido = true;\n        if (saveValido)\n        {\n            Debug.Log(\"Arquivo de Save Valido e Carregado\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Arquivo de Save Valido e Carregado"
      }
    ],
    "reward": {
      "exp": 420,
      "coins": 210
    },
    "tests": [
      {
        "input": "",
        "expected": "Arquivo de Save Valido e Carregado",
        "description": "Câmara 32-5: Integridade de Arquivo de Save"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool saveValido",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_32 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_32 = CSHARP_ABYSS_FLOOR_32;
}
