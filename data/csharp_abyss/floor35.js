/**
 * GUILDCODE — C# Unity Abyss Floor 35 Data (csharp_ch35)
 */
const CSHARP_ABYSS_FLOOR_35 = [
  {
    "id": "sq35_1",
    "title": "Câmara 35-1: Contrato de Dano (IDamageable)",
    "difficulty": "medium",
    "chapterId": 35,
    "description": "Simule uma entidade implementando IDamageable: declare int dano = 30;. Emita no Console: 'IDamageable: Tomou 30 de dano'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o dano e emita\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int dano = 30;\n        Debug.Log(\"IDamageable: Tomou \" + dano + \" de dano\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "IDamageable: Tomou 30 de dano"
      }
    ],
    "reward": {
      "exp": 450,
      "coins": 225
    },
    "tests": [
      {
        "input": "",
        "expected": "IDamageable: Tomou 30 de dano",
        "description": "Câmara 35-1: Contrato de Dano (IDamageable)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "dano",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq35_2",
    "title": "Câmara 35-2: Contrato de Interação (IInteractable)",
    "difficulty": "medium",
    "chapterId": 35,
    "description": "Simule a interação com um baú: declare string objeto = 'Bau';. Emita no Console: 'IInteractable: Interagiu com Bau'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare objeto e emita a interacao\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string objeto = \"Bau\";\n        Debug.Log(\"IInteractable: Interagiu com \" + objeto);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "IInteractable: Interagiu com Bau"
      }
    ],
    "reward": {
      "exp": 450,
      "coins": 225
    },
    "tests": [
      {
        "input": "",
        "expected": "IInteractable: Interagiu com Bau",
        "description": "Câmara 35-2: Contrato de Interação (IInteractable)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "objeto",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq35_3",
    "title": "Câmara 35-3: Polimorfismo Baseado em Interfaces",
    "difficulty": "medium",
    "chapterId": 35,
    "description": "Declare um array com 2 tipos que implementam IDamageable: 'Inimigo' e 'Barril'. Itere e emita para cada um: 'Entidade Danificavel: ' + nome.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Itere pelos alvos danificaveis\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] alvos = new string[] { \"Inimigo\", \"Barril\" };\n        for (int i = 0; i < alvos.Length; i++)\n        {\n            Debug.Log(\"Entidade Danificavel: \" + alvos[i]);\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Entidade Danificavel: Inimigo\nEntidade Danificavel: Barril"
      }
    ],
    "reward": {
      "exp": 450,
      "coins": 225
    },
    "tests": [
      {
        "input": "",
        "expected": "Entidade Danificavel: Inimigo\nEntidade Danificavel: Barril",
        "description": "Câmara 35-3: Polimorfismo Baseado em Interfaces"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string[] alvos",
        "for",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq35_4",
    "title": "Câmara 35-4: Checagem Segura com Operador 'is'",
    "difficulty": "medium",
    "chapterId": 35,
    "description": "Declare bool eDanificavel = true;. Se for verdadeiro, emita 'Alvo Implementa IDamageable'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se implementa a interface\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool eDanificavel = true;\n        if (eDanificavel)\n        {\n            Debug.Log(\"Alvo Implementa IDamageable\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Alvo Implementa IDamageable"
      }
    ],
    "reward": {
      "exp": 450,
      "coins": 225
    },
    "tests": [
      {
        "input": "",
        "expected": "Alvo Implementa IDamageable",
        "description": "Câmara 35-4: Checagem Segura com Operador 'is'"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool eDanificavel",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq35_5",
    "title": "Câmara 35-5: Múltiplas Interfaces em uma Classe",
    "difficulty": "medium",
    "chapterId": 35,
    "description": "Uma porta pode ser Danificável e Interagível: declare bool podeInteragir = true; bool podeDestruir = true;. Emita 'Porta: Interagivel e Destrutivel'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os estados e emita\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool podeInteragir = true;\n        bool podeDestruir = true;\n        Debug.Log(\"Porta: Interagivel e Destrutivel\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Porta: Interagivel e Destrutivel"
      }
    ],
    "reward": {
      "exp": 450,
      "coins": 225
    },
    "tests": [
      {
        "input": "",
        "expected": "Porta: Interagivel e Destrutivel",
        "description": "Câmara 35-5: Múltiplas Interfaces em uma Classe"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool podeInteragir",
        "bool podeDestruir",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_35 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_35 = CSHARP_ABYSS_FLOOR_35;
}
