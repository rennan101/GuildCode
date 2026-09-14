/**
 * GUILDCODE — C# Unity Abyss Floor 18 Data (csharp_ch18)
 */
const CSHARP_ABYSS_FLOOR_18 = [
  {
    "id": "sq18_1",
    "title": "Câmara 18-1: Configuração de Alvo (Follow Target)",
    "difficulty": "medium",
    "chapterId": 18,
    "description": "Declare string alvoSeguido = 'Player';. Emita no Console: 'Cinemachine Seguindo: Player'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure alvoSeguido e emita\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string alvoSeguido = \"Player\";\n        Debug.Log(\"Cinemachine Seguindo: \" + alvoSeguido);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Cinemachine Seguindo: Player"
      }
    ],
    "reward": {
      "exp": 280,
      "coins": 140
    },
    "tests": [
      {
        "input": "",
        "expected": "Cinemachine Seguindo: Player",
        "description": "Câmara 18-1: Configuração de Alvo (Follow Target)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "alvoSeguido",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq18_2",
    "title": "Câmara 18-2: Distância Orbital da Câmera",
    "difficulty": "medium",
    "chapterId": 18,
    "description": "Declare float raioOrbital = 4.5f;. Emita no Console: 'Distancia Orbital: 4.5m'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare raioOrbital e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float raioOrbital = 4.5f;\n        Debug.Log(\"Distancia Orbital: \" + raioOrbital + \"m\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Distancia Orbital: 4.5m"
      }
    ],
    "reward": {
      "exp": 280,
      "coins": 140
    },
    "tests": [
      {
        "input": "",
        "expected": "Distancia Orbital: 4.5m",
        "description": "Câmara 18-2: Distância Orbital da Câmera"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float raioOrbital",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq18_3",
    "title": "Câmara 18-3: Amortecimento Suave (Damping)",
    "difficulty": "medium",
    "chapterId": 18,
    "description": "Declare float damping = 0.3f;. Emita no Console: 'Suavizacao Damping: 0.3'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare damping e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float damping = 0.3f;\n        Debug.Log(\"Suavizacao Damping: \" + damping);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Suavizacao Damping: 0.3"
      }
    ],
    "reward": {
      "exp": 280,
      "coins": 140
    },
    "tests": [
      {
        "input": "",
        "expected": "Suavizacao Damping: 0.3",
        "description": "Câmara 18-3: Amortecimento Suave (Damping)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float damping",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq18_4",
    "title": "Câmara 18-4: Transição Suave Entre Câmeras Virtuais",
    "difficulty": "medium",
    "chapterId": 18,
    "description": "Declare int prioridadeVcam1 = 10 e int prioridadeVcam2 = 20. Se prioridadeVcam2 > prioridadeVcam1, emita 'Vcam2 Ativa por Prioridade'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Compare as prioridades e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int prioridadeVcam1 = 10;\n        int prioridadeVcam2 = 20;\n        if (prioridadeVcam2 > prioridadeVcam1)\n        {\n            Debug.Log(\"Vcam2 Ativa por Prioridade\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Vcam2 Ativa por Prioridade"
      }
    ],
    "reward": {
      "exp": 280,
      "coins": 140
    },
    "tests": [
      {
        "input": "",
        "expected": "Vcam2 Ativa por Prioridade",
        "description": "Câmara 18-4: Transição Suave Entre Câmeras Virtuais"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "prioridadeVcam1",
        "prioridadeVcam2",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq18_5",
    "title": "Câmara 18-5: Zona Morta da Câmera (Dead Zone)",
    "difficulty": "medium",
    "chapterId": 18,
    "description": "Declare float deadZoneWidth = 0.1f;. Emita no Console: 'Largura Dead Zone: 0.1'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare deadZoneWidth e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float deadZoneWidth = 0.1f;\n        Debug.Log(\"Largura Dead Zone: \" + deadZoneWidth);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Largura Dead Zone: 0.1"
      }
    ],
    "reward": {
      "exp": 280,
      "coins": 140
    },
    "tests": [
      {
        "input": "",
        "expected": "Largura Dead Zone: 0.1",
        "description": "Câmara 18-5: Zona Morta da Câmera (Dead Zone)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float deadZoneWidth",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_18 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_18 = CSHARP_ABYSS_FLOOR_18;
}
