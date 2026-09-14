/**
 * GUILDCODE — C# Unity Abyss Floor 27 Data (csharp_ch27)
 */
const CSHARP_ABYSS_FLOOR_27 = [
  {
    "id": "sq27_1",
    "title": "Câmara 27-1: Configuração de Cor Albedo PBR",
    "difficulty": "medium",
    "chapterId": 27,
    "description": "Declare string corBase = 'Vermelho_Carmim';. Emita no Console: 'Cor Albedo: Vermelho_Carmim'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare corBase e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string corBase = \"Vermelho_Carmim\";\n        Debug.Log(\"Cor Albedo: \" + corBase);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Cor Albedo: Vermelho_Carmim"
      }
    ],
    "reward": {
      "exp": 370,
      "coins": 185
    },
    "tests": [
      {
        "input": "",
        "expected": "Cor Albedo: Vermelho_Carmim",
        "description": "Câmara 27-1: Configuração de Cor Albedo PBR"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "corBase",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq27_2",
    "title": "Câmara 27-2: Grau Metálico (Metallic)",
    "difficulty": "medium",
    "chapterId": 27,
    "description": "Declare float metallic = 0.9f;. Emita no Console: 'Grau Metalico: 0.9'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare metallic e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float metallic = 0.9f;\n        Debug.Log(\"Grau Metalico: \" + metallic);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Grau Metalico: 0.9"
      }
    ],
    "reward": {
      "exp": 370,
      "coins": 185
    },
    "tests": [
      {
        "input": "",
        "expected": "Grau Metalico: 0.9",
        "description": "Câmara 27-2: Grau Metálico (Metallic)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float metallic",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq27_3",
    "title": "Câmara 27-3: Rugosidade e Suavidade (Smoothness)",
    "difficulty": "medium",
    "chapterId": 27,
    "description": "Declare float smoothness = 0.75f;. Emita no Console: 'Suavidade de Reflexo: 0.75'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare smoothness e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float smoothness = 0.75f;\n        Debug.Log(\"Suavidade de Reflexo: \" + smoothness);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Suavidade de Reflexo: 0.75"
      }
    ],
    "reward": {
      "exp": 370,
      "coins": 185
    },
    "tests": [
      {
        "input": "",
        "expected": "Suavidade de Reflexo: 0.75",
        "description": "Câmara 27-3: Rugosidade e Suavidade (Smoothness)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float smoothness",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq27_4",
    "title": "Câmara 27-4: Emissão de Luz Própria (Emission)",
    "difficulty": "medium",
    "chapterId": 27,
    "description": "Declare bool temEmissao = true; e float intensidadeEmissao = 2.0f;. Se temEmissao, emita 'Emissao Ativa: 2x'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se ha emissao de luz\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEmissao = true;\n        float intensidadeEmissao = 2.0f;\n        if (temEmissao)\n        {\n            Debug.Log(\"Emissao Ativa: \" + intensidadeEmissao + \"x\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Emissao Ativa: 2x"
      }
    ],
    "reward": {
      "exp": 370,
      "coins": 185
    },
    "tests": [
      {
        "input": "",
        "expected": "Emissao Ativa: 2x",
        "description": "Câmara 27-4: Emissão de Luz Própria (Emission)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool temEmissao",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq27_5",
    "title": "Câmara 27-5: Troca Dinâmica de Material",
    "difficulty": "medium",
    "chapterId": 27,
    "description": "Declare string materialAtual = 'Padrao';. Quando atingido (bool atingido = true), troque materialAtual para 'Dano_Flash' e emita 'Material: ' + materialAtual.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Troque o material em caso de dano\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string materialAtual = \"Padrao\";\n        bool atingido = true;\n        if (atingido)\n        {\n            materialAtual = \"Dano_Flash\";\n        }\n        Debug.Log(\"Material: \" + materialAtual);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Material: Dano_Flash"
      }
    ],
    "reward": {
      "exp": 370,
      "coins": 185
    },
    "tests": [
      {
        "input": "",
        "expected": "Material: Dano_Flash",
        "description": "Câmara 27-5: Troca Dinâmica de Material"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "materialAtual",
        "bool atingido",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_27 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_27 = CSHARP_ABYSS_FLOOR_27;
}
