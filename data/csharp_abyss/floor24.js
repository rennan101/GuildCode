/**
 * GUILDCODE — C# Unity Abyss Floor 24 Data (csharp_ch24)
 */
const CSHARP_ABYSS_FLOOR_24 = [
  {
    "id": "sq24_1",
    "title": "Câmara 24-1: Emissão de Efeito de Impacto",
    "difficulty": "medium",
    "chapterId": 24,
    "description": "Declare string efeito = 'Faíscas de Impacto';. Simule a emissão emitindo no Console: 'VFX Play: ' + efeito.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare efeito e emita a reproducao do VFX\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string efeito = \"Faíscas de Impacto\";\n        Debug.Log(\"VFX Play: \" + efeito);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "VFX Play: Faíscas de Impacto"
      }
    ],
    "reward": {
      "exp": 340,
      "coins": 170
    },
    "tests": [
      {
        "input": "",
        "expected": "VFX Play: Faíscas de Impacto",
        "description": "Câmara 24-1: Emissão de Efeito de Impacto"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string efeito",
        "efeito",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq24_2",
    "title": "Câmara 24-2: Taxa de Emissão de Partículas",
    "difficulty": "medium",
    "chapterId": 24,
    "description": "Declare int taxaEmissao = 50;. Emita no Console: 'Taxa de Emissao: 50 particulas/s'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare taxaEmissao e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int taxaEmissao = 50;\n        Debug.Log(\"Taxa de Emissao: \" + taxaEmissao + \" particulas/s\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Taxa de Emissao: 50 particulas/s"
      }
    ],
    "reward": {
      "exp": 340,
      "coins": 170
    },
    "tests": [
      {
        "input": "",
        "expected": "Taxa de Emissao: 50 particulas/s",
        "description": "Câmara 24-2: Taxa de Emissão de Partículas"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int taxaEmissao",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq24_3",
    "title": "Câmara 24-3: Tempo de Vida das Partículas (Lifetime)",
    "difficulty": "medium",
    "chapterId": 24,
    "description": "Declare float duracao = 2.5f;. Emita no Console: 'Tempo de Vida: 2.5s'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare duracao e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float duracao = 2.5f;\n        Debug.Log(\"Tempo de Vida: \" + duracao + \"s\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Tempo de Vida: 2.5s"
      }
    ],
    "reward": {
      "exp": 340,
      "coins": 170
    },
    "tests": [
      {
        "input": "",
        "expected": "Tempo de Vida: 2.5s",
        "description": "Câmara 24-3: Tempo de Vida das Partículas (Lifetime)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float duracao",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq24_4",
    "title": "Câmara 24-4: Efeito em Loop Contínuo",
    "difficulty": "medium",
    "chapterId": 24,
    "description": "Declare bool estaEmLoop = true;. Se for verdadeiro, emita 'VFX em Execucao Continua'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o efeito esta em loop\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaEmLoop = true;\n        if (estaEmLoop)\n        {\n            Debug.Log(\"VFX em Execucao Continua\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "VFX em Execucao Continua"
      }
    ],
    "reward": {
      "exp": 340,
      "coins": 170
    },
    "tests": [
      {
        "input": "",
        "expected": "VFX em Execucao Continua",
        "description": "Câmara 24-4: Efeito em Loop Contínuo"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool estaEmLoop",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq24_5",
    "title": "Câmara 24-5: Interrupção do Sistema de Partículas (Stop)",
    "difficulty": "medium",
    "chapterId": 24,
    "description": "Declare string statusVfx = 'VFX Stop: Emissao Encerrada';. Emita a mensagem com Debug.Log.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusVfx e emita\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusVfx = \"VFX Stop: Emissao Encerrada\";\n        Debug.Log(statusVfx);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "VFX Stop: Emissao Encerrada"
      }
    ],
    "reward": {
      "exp": 340,
      "coins": 170
    },
    "tests": [
      {
        "input": "",
        "expected": "VFX Stop: Emissao Encerrada",
        "description": "Câmara 24-5: Interrupção do Sistema de Partículas (Stop)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string statusVfx",
        "statusVfx",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_24 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_24 = CSHARP_ABYSS_FLOOR_24;
}
