/**
 * GUILDCODE — C# Unity Abyss Floor 22 Data (csharp_ch22)
 */
const CSHARP_ABYSS_FLOOR_22 = [
  {
    "id": "sq22_1",
    "title": "Câmara 22-1: Intensidade da Luz Direcional (Sol)",
    "difficulty": "medium",
    "chapterId": 22,
    "description": "Declare float intensidadeLuz = 1.2f;. Emita no Console: 'Intensidade Solar: 1.2 Lux'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare intensidadeLuz e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float intensidadeLuz = 1.2f;\n        Debug.Log(\"Intensidade Solar: \" + intensidadeLuz + \" Lux\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Intensidade Solar: 1.2 Lux"
      }
    ],
    "reward": {
      "exp": 320,
      "coins": 160
    },
    "tests": [
      {
        "input": "",
        "expected": "Intensidade Solar: 1.2 Lux",
        "description": "Câmara 22-1: Intensidade da Luz Direcional (Sol)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float intensidadeLuz",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq22_2",
    "title": "Câmara 22-2: Sombras em Tempo Real (Shadows)",
    "difficulty": "medium",
    "chapterId": 22,
    "description": "Declare string tipoSombra = 'SoftShadows';. Emita no Console: 'Tipo de Sombra: SoftShadows'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tipoSombra e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoSombra = \"SoftShadows\";\n        Debug.Log(\"Tipo de Sombra: \" + tipoSombra);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Tipo de Sombra: SoftShadows"
      }
    ],
    "reward": {
      "exp": 320,
      "coins": 160
    },
    "tests": [
      {
        "input": "",
        "expected": "Tipo de Sombra: SoftShadows",
        "description": "Câmara 22-2: Sombras em Tempo Real (Shadows)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "tipoSombra",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq22_3",
    "title": "Câmara 22-3: Sondas de Luz Adaptativas (APV)",
    "difficulty": "medium",
    "chapterId": 22,
    "description": "Declare int totalProbes = 250;. Emita no Console: 'Adaptive Probe Volumes: 250 probes'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare totalProbes e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalProbes = 250;\n        Debug.Log(\"Adaptive Probe Volumes: \" + totalProbes + \" probes\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Adaptive Probe Volumes: 250 probes"
      }
    ],
    "reward": {
      "exp": 320,
      "coins": 160
    },
    "tests": [
      {
        "input": "",
        "expected": "Adaptive Probe Volumes: 250 probes",
        "description": "Câmara 22-3: Sondas de Luz Adaptativas (APV)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int totalProbes",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq22_4",
    "title": "Câmara 22-4: Efeito Bloom de Pós-Processamento",
    "difficulty": "medium",
    "chapterId": 22,
    "description": "Declare bool bloomAtivo = true; e float intensidadeBloom = 0.8f;. Se bloomAtivo, emita 'Bloom Ativo com Intensidade: 0.8'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide e emita o Bloom\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool bloomAtivo = true;\n        float intensidadeBloom = 0.8f;\n        if (bloomAtivo)\n        {\n            Debug.Log(\"Bloom Ativo com Intensidade: \" + intensidadeBloom);\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Bloom Ativo com Intensidade: 0.8"
      }
    ],
    "reward": {
      "exp": 320,
      "coins": 160
    },
    "tests": [
      {
        "input": "",
        "expected": "Bloom Ativo com Intensidade: 0.8",
        "description": "Câmara 22-4: Efeito Bloom de Pós-Processamento"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool bloomAtivo",
        "float intensidadeBloom",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq22_5",
    "title": "Câmara 22-5: Color Grading e Vinheta",
    "difficulty": "medium",
    "chapterId": 22,
    "description": "Declare float vinhetaIntensidade = 0.35f;. Emita no Console: 'Vinheta Cinematica: 0.35'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare vinhetaIntensidade e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vinhetaIntensidade = 0.35f;\n        Debug.Log(\"Vinheta Cinematica: \" + vinhetaIntensidade);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Vinheta Cinematica: 0.35"
      }
    ],
    "reward": {
      "exp": 320,
      "coins": 160
    },
    "tests": [
      {
        "input": "",
        "expected": "Vinheta Cinematica: 0.35",
        "description": "Câmara 22-5: Color Grading e Vinheta"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float vinhetaIntensidade",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_22 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_22 = CSHARP_ABYSS_FLOOR_22;
}
