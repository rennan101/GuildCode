/**
 * GUILDCODE — C# Unity Abyss Floor 12 Data (csharp_ch12)
 */
const CSHARP_ABYSS_FLOOR_12 = [
  {
    "id": "sq12_1",
    "title": "Câmara 12-1: Mapeamento de Ação de Pulo",
    "difficulty": "medium",
    "chapterId": 12,
    "description": "Simule a leitura de uma InputAction chamada 'Pular': declare bool acaoDisparada = true;. Se for verdadeira, emita 'InputAction: Pulo Registrado'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a acao de pulo\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool acaoDisparada = true;\n        if (acaoDisparada)\n        {\n            Debug.Log(\"InputAction: Pulo Registrado\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "InputAction: Pulo Registrado"
      }
    ],
    "reward": {
      "exp": 220,
      "coins": 110
    },
    "tests": [
      {
        "input": "",
        "expected": "InputAction: Pulo Registrado",
        "description": "Câmara 12-1: Mapeamento de Ação de Pulo"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool acaoDisparada",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq12_2",
    "title": "Câmara 12-2: Leitura de Vetor de Movimento 2D",
    "difficulty": "medium",
    "chapterId": 12,
    "description": "Simule o valor de um joystick ou WASD: declare float horizontal = 1.0f e float vertical = 0.0f. Emita no Console: 'Movimento: (1, 0)'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure horizontal e vertical e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float horizontal = 1.0f;\n        float vertical = 0.0f;\n        Debug.Log(\"Movimento: (\" + horizontal + \", \" + vertical + \")\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Movimento: (1, 0)"
      }
    ],
    "reward": {
      "exp": 220,
      "coins": 110
    },
    "tests": [
      {
        "input": "",
        "expected": "Movimento: (1, 0)",
        "description": "Câmara 12-2: Leitura de Vetor de Movimento 2D"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float horizontal",
        "float vertical",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq12_3",
    "title": "Câmara 12-3: Ação de Interação com Objeto",
    "difficulty": "medium",
    "chapterId": 12,
    "description": "Declare a string botaoInteragir = 'E' e a distância float dist = 1.5f. Se dist <= 2.0f, emita 'Pressione [' + botaoInteragir + '] para Interagir'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide a distancia e emita o prompt\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string botaoInteragir = \"E\";\n        float dist = 1.5f;\n        if (dist <= 2.0f)\n        {\n            Debug.Log(\"Pressione [\" + botaoInteragir + \"] para Interagir\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Pressione [E] para Interagir"
      }
    ],
    "reward": {
      "exp": 220,
      "coins": 110
    },
    "tests": [
      {
        "input": "",
        "expected": "Pressione [E] para Interagir",
        "description": "Câmara 12-3: Ação de Interação com Objeto"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "botaoInteragir",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq12_4",
    "title": "Câmara 12-4: Habilitação de Mapa de Ações",
    "difficulty": "medium",
    "chapterId": 12,
    "description": "Simule a ativação do Action Map 'Gameplay': declare string mapaAtivo = 'Gameplay';. Emita no Console: 'Mapa Ativado: Gameplay'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Ative o mapa e emita no Console\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string mapaAtivo = \"Gameplay\";\n        Debug.Log(\"Mapa Ativado: \" + mapaAtivo);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Mapa Ativado: Gameplay"
      }
    ],
    "reward": {
      "exp": 220,
      "coins": 110
    },
    "tests": [
      {
        "input": "",
        "expected": "Mapa Ativado: Gameplay",
        "description": "Câmara 12-4: Habilitação de Mapa de Ações"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string mapaAtivo",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq12_5",
    "title": "Câmara 12-5: Troca Dinâmica para Mapa UI",
    "difficulty": "medium",
    "chapterId": 12,
    "description": "Quando o jogo é pausado, o mapa muda para UI: declare bool pausado = true. Se pausado, defina mapa = 'UI' e emita 'Contexto Atual: UI'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Troque o contexto para UI se pausado\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool pausado = true;\n        if (pausado)\n        {\n            string mapa = \"UI\";\n            Debug.Log(\"Contexto Atual: \" + mapa);\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Contexto Atual: UI"
      }
    ],
    "reward": {
      "exp": 220,
      "coins": 110
    },
    "tests": [
      {
        "input": "",
        "expected": "Contexto Atual: UI",
        "description": "Câmara 12-5: Troca Dinâmica para Mapa UI"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool pausado",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_12 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_12 = CSHARP_ABYSS_FLOOR_12;
}
