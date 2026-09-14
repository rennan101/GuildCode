/**
 * GUILDCODE — C# Unity Abyss Floor 28 Data (csharp_ch28)
 */
const CSHARP_ABYSS_FLOOR_28 = [
  {
    "id": "sq28_1",
    "title": "Câmara 28-1: Criação Dinâmica de Entidade",
    "difficulty": "medium",
    "chapterId": 28,
    "description": "Simule o nascimento de um projétil na cena: declare string prefab = 'Projetil_Fogo';. Emita no Console: 'Instantiate: Projetil_Fogo gerado'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie o prefab e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string prefab = \"Projetil_Fogo\";\n        Debug.Log(\"Instantiate: \" + prefab + \" gerado\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Instantiate: Projetil_Fogo gerado"
      }
    ],
    "reward": {
      "exp": 380,
      "coins": 190
    },
    "tests": [
      {
        "input": "",
        "expected": "Instantiate: Projetil_Fogo gerado",
        "description": "Câmara 28-1: Criação Dinâmica de Entidade"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "prefab",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq28_2",
    "title": "Câmara 28-2: Instantiate com Posição e Rotação",
    "difficulty": "medium",
    "chapterId": 28,
    "description": "Declare Vector3 spawnPos = new Vector3(0, 1, 5);. Emita no Console: 'Spawn na Posicao: (0, 1, 5)'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare spawnPos e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 spawnPos = new Vector3(0, 1, 5);\n        Debug.Log(\"Spawn na Posicao: (\" + spawnPos.x + \", \" + spawnPos.y + \", \" + spawnPos.z + \")\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Spawn na Posicao: (0, 1, 5)"
      }
    ],
    "reward": {
      "exp": 380,
      "coins": 190
    },
    "tests": [
      {
        "input": "",
        "expected": "Spawn na Posicao: (0, 1, 5)",
        "description": "Câmara 28-2: Instantiate com Posição e Rotação"
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
    "id": "sq28_3",
    "title": "Câmara 28-3: Destruição com Temporizador (Delay)",
    "difficulty": "medium",
    "chapterId": 28,
    "description": "Declare float tempoVida = 3.0f;. Emita no Console: 'Objeto Destruido Apos: 3s'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoVida e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoVida = 3.0f;\n        Debug.Log(\"Objeto Destruido Apos: \" + tempoVida + \"s\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Objeto Destruido Apos: 3s"
      }
    ],
    "reward": {
      "exp": 380,
      "coins": 190
    },
    "tests": [
      {
        "input": "",
        "expected": "Objeto Destruido Apos: 3s",
        "description": "Câmara 28-3: Destruição com Temporizador (Delay)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float tempoVida",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq28_4",
    "title": "Câmara 28-4: Contagem de Objetos Instanciados",
    "difficulty": "medium",
    "chapterId": 28,
    "description": "Use um laço for de 1 até 3 gerando mensagens: 'Instancia #' + i + ' criada'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie 3 instancias no laco for\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Instancia #\" + i + \" criada\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Instancia #1 criada\nInstancia #2 criada\nInstancia #3 criada"
      }
    ],
    "reward": {
      "exp": 380,
      "coins": 190
    },
    "tests": [
      {
        "input": "",
        "expected": "Instancia #1 criada\nInstancia #2 criada\nInstancia #3 criada",
        "description": "Câmara 28-4: Contagem de Objetos Instanciados"
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
    "id": "sq28_5",
    "title": "Câmara 28-5: Destruição Imediata ao Contato",
    "difficulty": "medium",
    "chapterId": 28,
    "description": "Declare string colisor = 'Abismo';. Se colisor == 'Abismo', emita 'Destroy: Entidade Removida da Cena'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque o colisor e execute Destroy\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string colisor = \"Abismo\";\n        if (colisor == \"Abismo\")\n        {\n            Debug.Log(\"Destroy: Entidade Removida da Cena\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Destroy: Entidade Removida da Cena"
      }
    ],
    "reward": {
      "exp": 380,
      "coins": 190
    },
    "tests": [
      {
        "input": "",
        "expected": "Destroy: Entidade Removida da Cena",
        "description": "Câmara 28-5: Destruição Imediata ao Contato"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "colisor",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_28 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_28 = CSHARP_ABYSS_FLOOR_28;
}
