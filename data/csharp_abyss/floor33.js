/**
 * GUILDCODE — C# Unity Abyss Floor 33 Data (csharp_ch33)
 */
const CSHARP_ABYSS_FLOOR_33 = [
  {
    "id": "sq33_1",
    "title": "Câmara 33-1: Execução Temporal com Delay",
    "difficulty": "medium",
    "chapterId": 33,
    "description": "Declare string p1 = 'Passo 1: Iniciado'; e string p2 = 'Passo 2: Concluido';. Emita ambas em linhas separadas no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare p1 e p2 e emita os dois passos da corotina\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string p1 = \"Passo 1: Iniciado\";\n        string p2 = \"Passo 2: Concluido\";\n        Debug.Log(p1);\n        Debug.Log(p2);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Passo 1: Iniciado\nPasso 2: Concluido"
      }
    ],
    "reward": {
      "exp": 430,
      "coins": 215
    },
    "tests": [
      {
        "input": "",
        "expected": "Passo 1: Iniciado\nPasso 2: Concluido",
        "description": "Câmara 33-1: Execução Temporal com Delay"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string p1",
        "string p2",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq33_2",
    "title": "Câmara 33-2: Tempo de Espera (WaitForSeconds)",
    "difficulty": "medium",
    "chapterId": 33,
    "description": "Declare float tempoEspera = 1.5f;. Emita no Console: 'Aguardando: 1.5 segundos'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoEspera e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoEspera = 1.5f;\n        Debug.Log(\"Aguardando: \" + tempoEspera + \" segundos\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Aguardando: 1.5 segundos"
      }
    ],
    "reward": {
      "exp": 430,
      "coins": 215
    },
    "tests": [
      {
        "input": "",
        "expected": "Aguardando: 1.5 segundos",
        "description": "Câmara 33-2: Tempo de Espera (WaitForSeconds)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float tempoEspera",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq33_3",
    "title": "Câmara 33-3: Contagem Regressiva de Corotina",
    "difficulty": "medium",
    "chapterId": 33,
    "description": "Use um for de 3 até 1 simulando um timer assíncrono: imprima 'Timer: ' + i e ao final 'Lancamento!'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Faca a contagem regressiva e o lancamento\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 3; i >= 1; i--)\n        {\n            Debug.Log(\"Timer: \" + i);\n        }\n        Debug.Log(\"Lancamento!\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Timer: 3\nTimer: 2\nTimer: 1\nLancamento!"
      }
    ],
    "reward": {
      "exp": 430,
      "coins": 215
    },
    "tests": [
      {
        "input": "",
        "expected": "Timer: 3\nTimer: 2\nTimer: 1\nLancamento!",
        "description": "Câmara 33-3: Contagem Regressiva de Corotina"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "for",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq33_4",
    "title": "Câmara 33-4: Disparo com StartCoroutine",
    "difficulty": "medium",
    "chapterId": 33,
    "description": "Declare string statusCoro = 'StartCoroutine: Rotina Disparada';. Emita no Console o valor de statusCoro.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusCoro e emita a inicializacao da corotina\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusCoro = \"StartCoroutine: Rotina Disparada\";\n        Debug.Log(statusCoro);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "StartCoroutine: Rotina Disparada"
      }
    ],
    "reward": {
      "exp": 430,
      "coins": 215
    },
    "tests": [
      {
        "input": "",
        "expected": "StartCoroutine: Rotina Disparada",
        "description": "Câmara 33-4: Disparo com StartCoroutine"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string statusCoro",
        "statusCoro",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq33_5",
    "title": "Câmara 33-5: Interrupção com StopCoroutine",
    "difficulty": "medium",
    "chapterId": 33,
    "description": "Declare bool jogadorCancelou = true;. Se for verdadeiro, emita 'StopCoroutine: Execucao Interrompida'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o jogador cancelou a acao\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool jogadorCancelou = true;\n        if (jogadorCancelou)\n        {\n            Debug.Log(\"StopCoroutine: Execucao Interrompida\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "StopCoroutine: Execucao Interrompida"
      }
    ],
    "reward": {
      "exp": 430,
      "coins": 215
    },
    "tests": [
      {
        "input": "",
        "expected": "StopCoroutine: Execucao Interrompida",
        "description": "Câmara 33-5: Interrupção com StopCoroutine"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool jogadorCancelou",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_33 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_33 = CSHARP_ABYSS_FLOOR_33;
}
