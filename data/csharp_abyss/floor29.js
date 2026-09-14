/**
 * GUILDCODE — C# Unity Abyss Floor 29 Data (csharp_ch29)
 */
const CSHARP_ABYSS_FLOOR_29 = [
  {
    "id": "sq29_1",
    "title": "Câmara 29-1: Fila de Pooling com Queue",
    "difficulty": "medium",
    "chapterId": 29,
    "description": "Crie uma fila Queue<string> pool = new Queue<string>();. Adicione 'Projetil_1' usando .Enqueue('Projetil_1') e emita 'Pool Criado com: ' + pool.Count + ' item'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o pool com Queue e enfileire um item\n    }\n}",
    "solution": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_1\");\n        Debug.Log(\"Pool Criado com: \" + pool.Count + \" item\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Pool Criado com: 1 item"
      }
    ],
    "reward": {
      "exp": 390,
      "coins": 195
    },
    "tests": [
      {
        "input": "",
        "expected": "Pool Criado com: 1 item",
        "description": "Câmara 29-1: Fila de Pooling com Queue"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Queue<string> pool",
        ".Enqueue(",
        "pool.Count"
      ]
    }
  },
  {
    "id": "sq29_2",
    "title": "Câmara 29-2: Resgate de Instância (Dequeue)",
    "difficulty": "medium",
    "chapterId": 29,
    "description": "Adicione 'Projetil_A' e 'Projetil_B' na fila. Resgate o primeiro elemento com pool.Dequeue() e emita 'Item Reutilizado: ' + item.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Enfileire 2 itens e desinfileire 1\n    }\n}",
    "solution": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_A\");\n        pool.Enqueue(\"Projetil_B\");\n        string item = pool.Dequeue();\n        Debug.Log(\"Item Reutilizado: \" + item);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Item Reutilizado: Projetil_A"
      }
    ],
    "reward": {
      "exp": 390,
      "coins": 195
    },
    "tests": [
      {
        "input": "",
        "expected": "Item Reutilizado: Projetil_A",
        "description": "Câmara 29-2: Resgate de Instância (Dequeue)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Queue<string> pool",
        ".Dequeue()",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq29_3",
    "title": "Câmara 29-3: Reutilização Sem Garbage Collection",
    "difficulty": "medium",
    "chapterId": 29,
    "description": "Declare int objetosInstanciados = 10; e int gcAllocBytes = 0;. Emita no Console: 'Alocacao de GC Evitada: 0 bytes'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare gcAllocBytes e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int gcAllocBytes = 0;\n        Debug.Log(\"Alocacao de GC Evitada: \" + gcAllocBytes + \" bytes\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Alocacao de GC Evitada: 0 bytes"
      }
    ],
    "reward": {
      "exp": 390,
      "coins": 195
    },
    "tests": [
      {
        "input": "",
        "expected": "Alocacao de GC Evitada: 0 bytes",
        "description": "Câmara 29-3: Reutilização Sem Garbage Collection"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "gcAllocBytes",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq29_4",
    "title": "Câmara 29-4: Devolução de Objeto ao Pool (Desativação)",
    "difficulty": "medium",
    "chapterId": 29,
    "description": "Declare bool estaAtivo = false;. Emita no Console: 'Objeto Devolvido ao Pool (Ativo: False)'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure estaAtivo e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaAtivo = false;\n        Debug.Log(\"Objeto Devolvido ao Pool (Ativo: \" + estaAtivo + \")\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Objeto Devolvido ao Pool (Ativo: False)"
      }
    ],
    "reward": {
      "exp": 390,
      "coins": 195
    },
    "tests": [
      {
        "input": "",
        "expected": "Objeto Devolvido ao Pool (Ativo: False)",
        "description": "Câmara 29-4: Devolução de Objeto ao Pool (Desativação)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool estaAtivo",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq29_5",
    "title": "Câmara 29-5: Capacidade Máxima do Pool",
    "difficulty": "medium",
    "chapterId": 29,
    "description": "Declare int capacidadeMaxima = 50;. Emita no Console: 'Capacidade do Pool: 50 unidades'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare capacidadeMaxima e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int capacidadeMaxima = 50;\n        Debug.Log(\"Capacidade do Pool: \" + capacidadeMaxima + \" unidades\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Capacidade do Pool: 50 unidades"
      }
    ],
    "reward": {
      "exp": 390,
      "coins": 195
    },
    "tests": [
      {
        "input": "",
        "expected": "Capacidade do Pool: 50 unidades",
        "description": "Câmara 29-5: Capacidade Máxima do Pool"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int capacidadeMaxima",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_29 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_29 = CSHARP_ABYSS_FLOOR_29;
}
