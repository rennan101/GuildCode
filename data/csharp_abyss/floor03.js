/**
 * GUILDCODE — C# Unity Abyss Floor 3 Data (csharp_ch3)
 */
const CSHARP_ABYSS_FLOOR_03 = [
  {
    "id": "sq3_1",
    "title": "Câmara 3-1: Spawn Sequencial com For",
    "difficulty": "medium",
    "chapterId": 3,
    "description": "Dentro de Start, construa um laço for que itere de 1 até 3 emitindo as mensagens no Console com 'Inimigo #' + i + ' gerado'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Construa o laco for de 1 a 3\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Inimigo #\" + i + \" gerado\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado"
      }
    ],
    "reward": {
      "exp": 130,
      "coins": 65
    },
    "tests": [
      {
        "input": "",
        "expected": "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado",
        "description": "Câmara 3-1: Spawn Sequencial com For"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "for",
        "<=",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq3_2",
    "title": "Câmara 3-2: Contagem com While",
    "difficulty": "medium",
    "chapterId": 3,
    "description": "Declare a variável inteira timer com 3. Crie um laço while que execute enquanto timer > 0, imprimindo 'T-' + timer e decrementando a cada passo.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int timer = 3;\n        // Faca o laco while regressivo\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int timer = 3;\n        while (timer > 0)\n        {\n            Debug.Log(\"T-\" + timer);\n            timer--;\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "T-3\nT-2\nT-1"
      }
    ],
    "reward": {
      "exp": 130,
      "coins": 65
    },
    "tests": [
      {
        "input": "",
        "expected": "T-3\nT-2\nT-1",
        "description": "Câmara 3-2: Contagem com While"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int timer",
        "while",
        "timer > 0",
        "timer--"
      ]
    }
  },
  {
    "id": "sq3_3",
    "title": "Câmara 3-3: Somatório de Pontos",
    "difficulty": "medium",
    "chapterId": 3,
    "description": "Declare totalPontos inicializado com 0. Faça um for com i de 1 até 4 somando i * 10 a totalPontos e exiba no final 'Total Acumulado: ' + totalPontos.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalPontos = 0;\n        // Some os pontos no laco e imprima o total\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalPontos = 0;\n        for (int i = 1; i <= 4; i++)\n        {\n            totalPontos += i * 10;\n        }\n        Debug.Log(\"Total Acumulado: \" + totalPontos);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Total Acumulado: 100"
      }
    ],
    "reward": {
      "exp": 130,
      "coins": 65
    },
    "tests": [
      {
        "input": "",
        "expected": "Total Acumulado: 100",
        "description": "Câmara 3-3: Somatório de Pontos"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "totalPontos",
        "for",
        "+=",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq3_4",
    "title": "Câmara 3-4: Filtro de Pares com Continue",
    "difficulty": "medium",
    "chapterId": 3,
    "description": "Faça um laço for de 1 até 5. Se o resto da divisão por 2 for diferente de zero (i % 2 != 0), use continue para ignorar. Imprima os números pares encontrados com 'Par: ' + i.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Itere de 1 a 5 usando continue para impares\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 5; i++)\n        {\n            if (i % 2 != 0) continue;\n            Debug.Log(\"Par: \" + i);\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Par: 2\nPar: 4"
      }
    ],
    "reward": {
      "exp": 130,
      "coins": 65
    },
    "tests": [
      {
        "input": "",
        "expected": "Par: 2\nPar: 4",
        "description": "Câmara 3-4: Filtro de Pares com Continue"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "for",
        "continue",
        "%",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq3_5",
    "title": "Câmara 3-5: Interrupção com Break",
    "difficulty": "medium",
    "chapterId": 3,
    "description": "Simule a interrupção ao encontrar o alvo: itere de 1 até 10 com for. Quando i == 3, exiba 'Alvo Encontrado no passo 3' e execute break para interromper o laço.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Procure o alvo no laco e interrompa com break\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 10; i++)\n        {\n            if (i == 3)\n            {\n                Debug.Log(\"Alvo Encontrado no passo 3\");\n                break;\n            }\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Alvo Encontrado no passo 3"
      }
    ],
    "reward": {
      "exp": 130,
      "coins": 65
    },
    "tests": [
      {
        "input": "",
        "expected": "Alvo Encontrado no passo 3",
        "description": "Câmara 3-5: Interrupção com Break"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "for",
        "break",
        "i == 3",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_03 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_03 = CSHARP_ABYSS_FLOOR_03;
}
