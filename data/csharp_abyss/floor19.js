/**
 * GUILDCODE — C# Unity Abyss Floor 19 Data (csharp_ch19)
 */
const CSHARP_ABYSS_FLOOR_19 = [
  {
    "id": "sq19_1",
    "title": "Câmara 19-1: Sensibilidade do Mouse Look",
    "difficulty": "medium",
    "chapterId": 19,
    "description": "Declare float sensibilidade = 2.0f;. Emita no Console: 'Sensibilidade Mouse: 2'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare sensibilidade e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float sensibilidade = 2.0f;\n        Debug.Log(\"Sensibilidade Mouse: \" + sensibilidade);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Sensibilidade Mouse: 2"
      }
    ],
    "reward": {
      "exp": 290,
      "coins": 145
    },
    "tests": [
      {
        "input": "",
        "expected": "Sensibilidade Mouse: 2",
        "description": "Câmara 19-1: Sensibilidade do Mouse Look"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float sensibilidade",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq19_2",
    "title": "Câmara 19-2: Trava de Cursor no Centro da Tela",
    "difficulty": "medium",
    "chapterId": 19,
    "description": "Configure a trava do cursor acessando Cursor.lockState = 0;. Emita no Console: 'Cursor Bloqueado no Centro'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure Cursor.lockState e emita\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Cursor.lockState = 0;\n        Debug.Log(\"Cursor Bloqueado no Centro\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Cursor Bloqueado no Centro"
      }
    ],
    "reward": {
      "exp": 290,
      "coins": 145
    },
    "tests": [
      {
        "input": "",
        "expected": "Cursor Bloqueado no Centro",
        "description": "Câmara 19-2: Trava de Cursor no Centro da Tela"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Cursor.lockState",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq19_3",
    "title": "Câmara 19-3: Limite de Rotação Vertical (Clamp Pitch)",
    "difficulty": "medium",
    "chapterId": 19,
    "description": "Restrinja o ângulo vertical para não quebrar o pescoço do personagem: use Mathf.Clamp(95, -80, 80) e emita 'Angulo Travado: ' + angulo.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Aplique Mathf.Clamp entre -80 e 80\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float angulo = Mathf.Clamp(95, -80, 80);\n        Debug.Log(\"Angulo Travado: \" + angulo);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Angulo Travado: 80"
      }
    ],
    "reward": {
      "exp": 290,
      "coins": 145
    },
    "tests": [
      {
        "input": "",
        "expected": "Angulo Travado: 80",
        "description": "Câmara 19-3: Limite de Rotação Vertical (Clamp Pitch)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Mathf.Clamp",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq19_4",
    "title": "Câmara 19-4: Rotação Horizontal do Corpo",
    "difficulty": "medium",
    "chapterId": 19,
    "description": "Declare float mouseX = 15.0f;. Emita no Console: 'Giro Horizontal do Corpo: 15 graus'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare mouseX e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float mouseX = 15.0f;\n        Debug.Log(\"Giro Horizontal do Corpo: \" + mouseX + \" graus\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Giro Horizontal do Corpo: 15 graus"
      }
    ],
    "reward": {
      "exp": 290,
      "coins": 145
    },
    "tests": [
      {
        "input": "",
        "expected": "Giro Horizontal do Corpo: 15 graus",
        "description": "Câmara 19-4: Rotação Horizontal do Corpo"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float mouseX",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq19_5",
    "title": "Câmara 19-5: Campo de Visão (Field of View)",
    "difficulty": "medium",
    "chapterId": 19,
    "description": "Declare int fov = 60;. Quando o jogador mirar (bool mirando = true), reduza o fov para 40 e emita 'FOV Atual: ' + fov.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Reduza o FOV ao mirar e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int fov = 60;\n        bool mirando = true;\n        if (mirando) fov = 40;\n        Debug.Log(\"FOV Atual: \" + fov);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "FOV Atual: 40"
      }
    ],
    "reward": {
      "exp": 290,
      "coins": 145
    },
    "tests": [
      {
        "input": "",
        "expected": "FOV Atual: 40",
        "description": "Câmara 19-5: Campo de Visão (Field of View)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int fov",
        "bool mirando",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_19 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_19 = CSHARP_ABYSS_FLOOR_19;
}
