/**
 * GUILDCODE — C# Unity Abyss Floor 6 Data (csharp_ch6)
 */
const CSHARP_ABYSS_FLOOR_06 = [
  {
    "id": "sq6_1",
    "title": "Câmara 6-1: Instanciação de Objeto Simples",
    "difficulty": "medium",
    "chapterId": 6,
    "description": "Simule a criação de um item de inventário: crie um objeto com nome 'Espada' e poder 45. Emita no Console: 'Item: Espada | Poder: 45'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o item e imprima seu status\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string itemNome = \"Espada\";\n        int itemPoder = 45;\n        Debug.Log(\"Item: \" + itemNome + \" | Poder: \" + itemPoder);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Item: Espada | Poder: 45"
      }
    ],
    "reward": {
      "exp": 160,
      "coins": 80
    },
    "tests": [
      {
        "input": "",
        "expected": "Item: Espada | Poder: 45",
        "description": "Câmara 6-1: Instanciação de Objeto Simples"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string itemNome",
        "int itemPoder",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq6_2",
    "title": "Câmara 6-2: Método Construtor e Inicialização",
    "difficulty": "medium",
    "chapterId": 6,
    "description": "Configure dois atributos de uma entidade: heroi 'Kael' e nivel 10. Emita no Console: 'Entidade: Kael | Nivel: 10'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Defina heroi e nivel e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = \"Kael\";\n        int nivel = 10;\n        Debug.Log(\"Entidade: \" + heroi + \" | Nivel: \" + nivel);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Entidade: Kael | Nivel: 10"
      }
    ],
    "reward": {
      "exp": 160,
      "coins": 80
    },
    "tests": [
      {
        "input": "",
        "expected": "Entidade: Kael | Nivel: 10",
        "description": "Câmara 6-2: Método Construtor e Inicialização"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "heroi",
        "nivel",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq6_3",
    "title": "Câmara 6-3: Encapsulamento com Propriedades Get/Set",
    "difficulty": "medium",
    "chapterId": 6,
    "description": "Simule a alteração de vida de uma entidade: inicie vidaMaxima com 100 e vidaAtual com 75. Emita no Console: 'Vida: 75/100'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure vidaMaxima e vidaAtual\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vidaMaxima = 100;\n        int vidaAtual = 75;\n        Debug.Log(\"Vida: \" + vidaAtual + \"/\" + vidaMaxima);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Vida: 75/100"
      }
    ],
    "reward": {
      "exp": 160,
      "coins": 80
    },
    "tests": [
      {
        "input": "",
        "expected": "Vida: 75/100",
        "description": "Câmara 6-3: Encapsulamento com Propriedades Get/Set"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int vidaMaxima",
        "int vidaAtual",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq6_4",
    "title": "Câmara 6-4: Método de Instância de Ataque",
    "difficulty": "medium",
    "chapterId": 6,
    "description": "Invoque uma rotina de combate de objeto: calcule o danoCausado aplicando um danoBase de 30 multiplicado por forca de 2. Emita no Console: 'Ataque Desferido: 60'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule danoCausado e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 30;\n        int forca = 2;\n        int danoCausado = danoBase * forca;\n        Debug.Log(\"Ataque Desferido: \" + danoCausado);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Ataque Desferido: 60"
      }
    ],
    "reward": {
      "exp": 160,
      "coins": 80
    },
    "tests": [
      {
        "input": "",
        "expected": "Ataque Desferido: 60",
        "description": "Câmara 6-4: Método de Instância de Ataque"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int danoBase",
        "int forca",
        "danoCausado",
        "*"
      ]
    }
  },
  {
    "id": "sq6_5",
    "title": "Câmara 6-5: Contagem de Instâncias",
    "difficulty": "medium",
    "chapterId": 6,
    "description": "Simule o rastreamento de entidades ativas na cena: inicie totalInimigos com 0, incremente duas vezes e emita 'Inimigos Ativos: ' + totalInimigos.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalInimigos = 0;\n        // Incremente duas vezes e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalInimigos = 0;\n        totalInimigos++;\n        totalInimigos++;\n        Debug.Log(\"Inimigos Ativos: \" + totalInimigos);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Inimigos Ativos: 2"
      }
    ],
    "reward": {
      "exp": 160,
      "coins": 80
    },
    "tests": [
      {
        "input": "",
        "expected": "Inimigos Ativos: 2",
        "description": "Câmara 6-5: Contagem de Instâncias"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "totalInimigos",
        "++",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_06 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_06 = CSHARP_ABYSS_FLOOR_06;
}
