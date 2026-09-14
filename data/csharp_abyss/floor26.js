/**
 * GUILDCODE — C# Unity Abyss Floor 26 Data (csharp_ch26)
 */
const CSHARP_ABYSS_FLOOR_26 = [
  {
    "id": "sq26_1",
    "title": "Câmara 26-1: Definição de Destino com SetDestination",
    "difficulty": "medium",
    "chapterId": 26,
    "description": "Simule o envio de um NPC para um destino: declare Vector3 destino = new Vector3(10, 0, 15);. Emita no Console: 'Destino NavMesh: (10, 0, 15)'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure destino e emita\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 destino = new Vector3(10, 0, 15);\n        Debug.Log(\"Destino NavMesh: (\" + destino.x + \", \" + destino.y + \", \" + destino.z + \")\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Destino NavMesh: (10, 0, 15)"
      }
    ],
    "reward": {
      "exp": 360,
      "coins": 180
    },
    "tests": [
      {
        "input": "",
        "expected": "Destino NavMesh: (10, 0, 15)",
        "description": "Câmara 26-1: Definição de Destino com SetDestination"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "new Vector3",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq26_2",
    "title": "Câmara 26-2: Velocidade de Navegação do Agente",
    "difficulty": "medium",
    "chapterId": 26,
    "description": "Declare float velocidadeAgente = 3.5f;. Emita no Console: 'Velocidade NavMeshAgent: 3.5'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare velocidadeAgente e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float velocidadeAgente = 3.5f;\n        Debug.Log(\"Velocidade NavMeshAgent: \" + velocidadeAgente);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Velocidade NavMeshAgent: 3.5"
      }
    ],
    "reward": {
      "exp": 360,
      "coins": 180
    },
    "tests": [
      {
        "input": "",
        "expected": "Velocidade NavMeshAgent: 3.5",
        "description": "Câmara 26-2: Velocidade de Navegação do Agente"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float velocidadeAgente",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq26_3",
    "title": "Câmara 26-3: Distância de Parada (StoppingDistance)",
    "difficulty": "medium",
    "chapterId": 26,
    "description": "Declare float distRestante = 0.8f; e float stopDist = 1.0f;. Se distRestante <= stopDist, emita 'NPC Chegou ao Destino'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide se o agente chegou\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distRestante = 0.8f;\n        float stopDist = 1.0f;\n        if (distRestante <= stopDist)\n        {\n            Debug.Log(\"NPC Chegou ao Destino\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "NPC Chegou ao Destino"
      }
    ],
    "reward": {
      "exp": 360,
      "coins": 180
    },
    "tests": [
      {
        "input": "",
        "expected": "NPC Chegou ao Destino",
        "description": "Câmara 26-3: Distância de Parada (StoppingDistance)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float distRestante",
        "float stopDist",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq26_4",
    "title": "Câmara 26-4: Patrulha Entre Pontos (Waypoints)",
    "difficulty": "medium",
    "chapterId": 26,
    "description": "Declare int indicePonto = 0; e int totalPontos = 3;. Avance para o próximo índice com (indicePonto + 1) % totalPontos e emita 'Proximo Ponto: ' + proximo.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Avance para o proximo waypoint\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int indicePonto = 0;\n        int totalPontos = 3;\n        int proximo = (indicePonto + 1) % totalPontos;\n        Debug.Log(\"Proximo Ponto: \" + proximo);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Proximo Ponto: 1"
      }
    ],
    "reward": {
      "exp": 360,
      "coins": 180
    },
    "tests": [
      {
        "input": "",
        "expected": "Proximo Ponto: 1",
        "description": "Câmara 26-4: Patrulha Entre Pontos (Waypoints)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "indicePonto",
        "totalPontos",
        "%",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq26_5",
    "title": "Câmara 26-5: Pausa para Observação no Ponto",
    "difficulty": "medium",
    "chapterId": 26,
    "description": "Declare float tempoEspera = 2.0f;. Emita no Console: 'Aguardando no Ponto: 2s'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoEspera e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoEspera = 2.0f;\n        Debug.Log(\"Aguardando no Ponto: \" + tempoEspera + \"s\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Aguardando no Ponto: 2s"
      }
    ],
    "reward": {
      "exp": 360,
      "coins": 180
    },
    "tests": [
      {
        "input": "",
        "expected": "Aguardando no Ponto: 2s",
        "description": "Câmara 26-5: Pausa para Observação no Ponto"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float tempoEspera",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_26 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_26 = CSHARP_ABYSS_FLOOR_26;
}
