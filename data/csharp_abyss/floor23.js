/**
 * GUILDCODE — C# Unity Abyss Floor 23 Data (csharp_ch23)
 */
const CSHARP_ABYSS_FLOOR_23 = [
  {
    "id": "sq23_1",
    "title": "Câmara 23-1: Atualização de Texto TextMeshPro",
    "difficulty": "medium",
    "chapterId": 23,
    "description": "Simule a atualização de um label de vida: declare string texto = 'HP: 100/100';. Emita no Console: 'HUD Texto: HP: 100/100'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o texto do HUD e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string texto = \"HP: 100/100\";\n        Debug.Log(\"HUD Texto: \" + texto);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "HUD Texto: HP: 100/100"
      }
    ],
    "reward": {
      "exp": 330,
      "coins": 165
    },
    "tests": [
      {
        "input": "",
        "expected": "HUD Texto: HP: 100/100",
        "description": "Câmara 23-1: Atualização de Texto TextMeshPro"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "texto",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq23_2",
    "title": "Câmara 23-2: Preenchimento de Barra de Mana (FillAmount)",
    "difficulty": "medium",
    "chapterId": 23,
    "description": "Declare float manaAtual = 75.0f; e float manaMax = 100.0f;. Calcule float fill = manaAtual / 100.0f; e emita 'Barra Fill: ' + fill.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o preenchimento da barra e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float manaAtual = 75.0f;\n        float manaMax = 100.0f;\n        float fill = manaAtual / 100.0f;\n        Debug.Log(\"Barra Fill: \" + fill);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Barra Fill: 0.75"
      }
    ],
    "reward": {
      "exp": 330,
      "coins": 165
    },
    "tests": [
      {
        "input": "",
        "expected": "Barra Fill: 0.75",
        "description": "Câmara 23-2: Preenchimento de Barra de Mana (FillAmount)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "manaAtual",
        "manaMax",
        "fill",
        "/"
      ]
    }
  },
  {
    "id": "sq23_3",
    "title": "Câmara 23-3: Visibilidade do Menu de Pause",
    "difficulty": "medium",
    "chapterId": 23,
    "description": "Declare bool menuPausaAtivo = true;. Se for verdadeiro, emita 'Painel de Pausa Visivel'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque menuPausaAtivo e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool menuPausaAtivo = true;\n        if (menuPausaAtivo)\n        {\n            Debug.Log(\"Painel de Pausa Visivel\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Painel de Pausa Visivel"
      }
    ],
    "reward": {
      "exp": 330,
      "coins": 165
    },
    "tests": [
      {
        "input": "",
        "expected": "Painel de Pausa Visivel",
        "description": "Câmara 23-3: Visibilidade do Menu de Pause"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool menuPausaAtivo",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq23_4",
    "title": "Câmara 23-4: Notificação Flutuante no HUD",
    "difficulty": "medium",
    "chapterId": 23,
    "description": "Declare string notificacao = '+100 XP';. Emita no Console: 'Toast Notificacao: +100 XP'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare notificacao e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string notificacao = \"+100 XP\";\n        Debug.Log(\"Toast Notificacao: \" + notificacao);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Toast Notificacao: +100 XP"
      }
    ],
    "reward": {
      "exp": 330,
      "coins": 165
    },
    "tests": [
      {
        "input": "",
        "expected": "Toast Notificacao: +100 XP",
        "description": "Câmara 23-4: Notificação Flutuante no HUD"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "notificacao",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq23_5",
    "title": "Câmara 23-5: Contador de Moedas na Tela",
    "difficulty": "medium",
    "chapterId": 23,
    "description": "Declare int moedas = 42;. Emita no Console formatado: 'Moedas Coletadas: 0042' usando moedas.ToString().",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure moedas e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 42;\n        Debug.Log(\"Moedas Coletadas: 00\" + moedas);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Moedas Coletadas: 0042"
      }
    ],
    "reward": {
      "exp": 330,
      "coins": 165
    },
    "tests": [
      {
        "input": "",
        "expected": "Moedas Coletadas: 0042",
        "description": "Câmara 23-5: Contador de Moedas na Tela"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int moedas",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_23 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_23 = CSHARP_ABYSS_FLOOR_23;
}
