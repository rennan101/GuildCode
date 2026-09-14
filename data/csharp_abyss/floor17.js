/**
 * GUILDCODE — C# Unity Abyss Floor 17 Data (csharp_ch17)
 */
const CSHARP_ABYSS_FLOOR_17 = [
  {
    "id": "sq17_1",
    "title": "Câmara 17-1: Detecção de Colisão Sólida (OnCollisionEnter)",
    "difficulty": "medium",
    "chapterId": 17,
    "description": "Declare string outroObjeto = 'Parede';. Se for igual a 'Parede', emita no Console: 'Impacto com Parede Registrado'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a colisao solida\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string outroObjeto = \"Parede\";\n        if (outroObjeto == \"Parede\")\n        {\n            Debug.Log(\"Impacto com Parede Registrado\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Impacto com Parede Registrado"
      }
    ],
    "reward": {
      "exp": 270,
      "coins": 135
    },
    "tests": [
      {
        "input": "",
        "expected": "Impacto com Parede Registrado",
        "description": "Câmara 17-1: Detecção de Colisão Sólida (OnCollisionEnter)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "outroObjeto",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq17_2",
    "title": "Câmara 17-2: Gatilho de Zona (OnTriggerEnter)",
    "difficulty": "medium",
    "chapterId": 17,
    "description": "Declare bool isTrigger = true; e string zona = 'Checkpoint';. Se isTrigger for verdadeiro, emita 'Trigger Ativado: Checkpoint'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque o trigger e imprima a zona\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool isTrigger = true;\n        string zona = \"Checkpoint\";\n        if (isTrigger)\n        {\n            Debug.Log(\"Trigger Ativado: \" + zona);\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Trigger Ativado: Checkpoint"
      }
    ],
    "reward": {
      "exp": 270,
      "coins": 135
    },
    "tests": [
      {
        "input": "",
        "expected": "Trigger Ativado: Checkpoint",
        "description": "Câmara 17-2: Gatilho de Zona (OnTriggerEnter)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool isTrigger",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq17_3",
    "title": "Câmara 17-3: Coleta de Moeda por Gatilho",
    "difficulty": "medium",
    "chapterId": 17,
    "description": "Declare int moedas = 0;. Simule a coleta somando 1 a moedas e emita no Console: 'Moedas: ' + moedas.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Incremente as moedas coletadas\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 0;\n        moedas++;\n        Debug.Log(\"Moedas: \" + moedas);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Moedas: 1"
      }
    ],
    "reward": {
      "exp": 270,
      "coins": 135
    },
    "tests": [
      {
        "input": "",
        "expected": "Moedas: 1",
        "description": "Câmara 17-3: Coleta de Moeda por Gatilho"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int moedas",
        "++",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq17_4",
    "title": "Câmara 17-4: Filtro de Colisão por Tag",
    "difficulty": "medium",
    "chapterId": 17,
    "description": "Declare string colTag = 'Enemy';. Se colTag == 'Enemy', emita 'Dano Sofrido por Colisao!'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a tag do inimigo\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string colTag = \"Enemy\";\n        if (colTag == \"Enemy\")\n        {\n            Debug.Log(\"Dano Sofrido por Colisao!\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dano Sofrido por Colisao!"
      }
    ],
    "reward": {
      "exp": 270,
      "coins": 135
    },
    "tests": [
      {
        "input": "",
        "expected": "Dano Sofrido por Colisao!",
        "description": "Câmara 17-4: Filtro de Colisão por Tag"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "colTag",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq17_5",
    "title": "Câmara 17-5: Gatilho de Saída (OnTriggerExit)",
    "difficulty": "medium",
    "chapterId": 17,
    "description": "Simule a saída de uma área segura: declare bool naAreaSegura = false;. Se não estiver na área segura (!naAreaSegura), emita 'Saiu da Area Segura!'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a saida da area segura\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool naAreaSegura = false;\n        if (!naAreaSegura)\n        {\n            Debug.Log(\"Saiu da Area Segura!\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Saiu da Area Segura!"
      }
    ],
    "reward": {
      "exp": 270,
      "coins": 135
    },
    "tests": [
      {
        "input": "",
        "expected": "Saiu da Area Segura!",
        "description": "Câmara 17-5: Gatilho de Saída (OnTriggerExit)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool naAreaSegura",
        "!",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_17 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_17 = CSHARP_ABYSS_FLOOR_17;
}
