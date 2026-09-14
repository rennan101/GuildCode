/**
 * GUILDCODE — C# Unity Abyss Floor 34 Data (csharp_ch34)
 */
const CSHARP_ABYSS_FLOOR_34 = [
  {
    "id": "sq34_1",
    "title": "Câmara 34-1: Declaração e Disparo de Action",
    "difficulty": "medium",
    "chapterId": 34,
    "description": "Declare string status = 'Jogador Derrotado'; e Action onPlayerDied = () => Debug.Log('Evento: ' + status);. Invoque onPlayerDied();.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare status, Action e execute-a\n    }\n}",
    "solution": "using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string status = \"Jogador Derrotado\";\n        Action onPlayerDied = () => Debug.Log(\"Evento: \" + status);\n        onPlayerDied();\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Evento: Jogador Derrotado"
      }
    ],
    "reward": {
      "exp": 440,
      "coins": 220
    },
    "tests": [
      {
        "input": "",
        "expected": "Evento: Jogador Derrotado",
        "description": "Câmara 34-1: Declaração e Disparo de Action"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string status",
        "Action onPlayerDied",
        "onPlayerDied()"
      ]
    }
  },
  {
    "id": "sq34_2",
    "title": "Câmara 34-2: Delegate com Parâmetro de Dano",
    "difficulty": "medium",
    "chapterId": 34,
    "description": "Declare int danoRecebido = 45; e Action onTakeDamage = () => Debug.Log('Dano Sofrido: ' + danoRecebido);. Invoque onTakeDamage();.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare danoRecebido e execute a Action\n    }\n}",
    "solution": "using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoRecebido = 45;\n        Action onTakeDamage = () => Debug.Log(\"Dano Sofrido: \" + danoRecebido);\n        onTakeDamage();\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dano Sofrido: 45"
      }
    ],
    "reward": {
      "exp": 440,
      "coins": 220
    },
    "tests": [
      {
        "input": "",
        "expected": "Dano Sofrido: 45",
        "description": "Câmara 34-2: Delegate com Parâmetro de Dano"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int danoRecebido",
        "onTakeDamage",
        "onTakeDamage()"
      ]
    }
  },
  {
    "id": "sq34_3",
    "title": "Câmara 34-3: Desacoplamento de UI e Lógica",
    "difficulty": "medium",
    "chapterId": 34,
    "description": "Declare string eventoUi = 'HUD Notificado: Barra Atualizada';. Emita no Console o valor de eventoUi.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare eventoUi e emita a notificacao do evento\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string eventoUi = \"HUD Notificado: Barra Atualizada\";\n        Debug.Log(eventoUi);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "HUD Notificado: Barra Atualizada"
      }
    ],
    "reward": {
      "exp": 440,
      "coins": 220
    },
    "tests": [
      {
        "input": "",
        "expected": "HUD Notificado: Barra Atualizada",
        "description": "Câmara 34-3: Desacoplamento de UI e Lógica"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string eventoUi",
        "eventoUi",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq34_4",
    "title": "Câmara 34-4: Múltiplos Ouvintes de Evento (Multicast)",
    "difficulty": "medium",
    "chapterId": 34,
    "description": "Declare string o1 = 'Ouvinte 1: Som Tocado'; e string o2 = 'Ouvinte 2: Particula Ativada';. Emita ambas em linhas separadas.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o1 e o2 e emita as acoes dos dois ouvintes\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string o1 = \"Ouvinte 1: Som Tocado\";\n        string o2 = \"Ouvinte 2: Particula Ativada\";\n        Debug.Log(o1);\n        Debug.Log(o2);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Ouvinte 1: Som Tocado\nOuvinte 2: Particula Ativada"
      }
    ],
    "reward": {
      "exp": 440,
      "coins": 220
    },
    "tests": [
      {
        "input": "",
        "expected": "Ouvinte 1: Som Tocado\nOuvinte 2: Particula Ativada",
        "description": "Câmara 34-4: Múltiplos Ouvintes de Evento (Multicast)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string o1",
        "string o2",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq34_5",
    "title": "Câmara 34-5: Cancelamento de Inscrição (-=)",
    "difficulty": "medium",
    "chapterId": 34,
    "description": "Declare string statusUnsub = 'Inscricao Removida com -= no OnDisable';. Emita no Console com Debug.Log.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusUnsub e emita a remocao de inscricao\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusUnsub = \"Inscricao Removida com -= no OnDisable\";\n        Debug.Log(statusUnsub);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Inscricao Removida com -= no OnDisable"
      }
    ],
    "reward": {
      "exp": 440,
      "coins": 220
    },
    "tests": [
      {
        "input": "",
        "expected": "Inscricao Removida com -= no OnDisable",
        "description": "Câmara 34-5: Cancelamento de Inscrição (-=)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string statusUnsub",
        "statusUnsub",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_34 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_34 = CSHARP_ABYSS_FLOOR_34;
}
