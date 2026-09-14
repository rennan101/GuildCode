/**
 * GUILDCODE — C# Unity Abyss Floor 30 Data (csharp_ch30)
 */
const CSHARP_ABYSS_FLOOR_30 = [
  {
    "id": "sq30_1",
    "title": "Câmara 30-1: Leitura de Atributos do ScriptableObject",
    "difficulty": "medium",
    "chapterId": 30,
    "description": "Simule a leitura de um arquivo de configuração: declare string nomePoder = 'Meteoro'; int custoMana = 40;. Emita: 'Habilidade: Meteoro | Custo: 40 Mana'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare os dados e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nomePoder = \"Meteoro\";\n        int custoMana = 40;\n        Debug.Log(\"Habilidade: \" + nomePoder + \" | Custo: \" + custoMana + \" Mana\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Habilidade: Meteoro | Custo: 40 Mana"
      }
    ],
    "reward": {
      "exp": 400,
      "coins": 200
    },
    "tests": [
      {
        "input": "",
        "expected": "Habilidade: Meteoro | Custo: 40 Mana",
        "description": "Câmara 30-1: Leitura de Atributos do ScriptableObject"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "nomePoder",
        "custoMana",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq30_2",
    "title": "Câmara 30-2: Ficha de Dados de Inimigo Modular",
    "difficulty": "medium",
    "chapterId": 30,
    "description": "Declare string tipoMonstro = 'Golem'; int hpBase = 500;. Emita no Console: 'Monstro: Golem | HP: 500'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os atributos e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoMonstro = \"Golem\";\n        int hpBase = 500;\n        Debug.Log(\"Monstro: \" + tipoMonstro + \" | HP: \" + hpBase);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Monstro: Golem | HP: 500"
      }
    ],
    "reward": {
      "exp": 400,
      "coins": 200
    },
    "tests": [
      {
        "input": "",
        "expected": "Monstro: Golem | HP: 500",
        "description": "Câmara 30-2: Ficha de Dados de Inimigo Modular"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "tipoMonstro",
        "hpBase",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq30_3",
    "title": "Câmara 30-3: Compartilhamento de Dados Entre Instâncias",
    "difficulty": "medium",
    "chapterId": 30,
    "description": "Simule duas instâncias lendo o mesmo danoBase = 25: calcule danoDuplo = danoBase * 2 e emita 'Dano Compartilhado: ' + danoDuplo.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o dano compartilhado\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 25;\n        int danoDuplo = danoBase * 2;\n        Debug.Log(\"Dano Compartilhado: \" + danoDuplo);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dano Compartilhado: 50"
      }
    ],
    "reward": {
      "exp": 400,
      "coins": 200
    },
    "tests": [
      {
        "input": "",
        "expected": "Dano Compartilhado: 50",
        "description": "Câmara 30-3: Compartilhamento de Dados Entre Instâncias"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "danoBase",
        "danoDuplo",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq30_4",
    "title": "Câmara 30-4: Menu de Criação de Asset ([CreateAssetMenu])",
    "difficulty": "medium",
    "chapterId": 30,
    "description": "Declare string caminhoMenu = 'Assets/Create/Cartas/Item';. Emita no Console: 'Menu Ativo: ' + caminhoMenu.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare caminhoMenu e emita o caminho do CreateAssetMenu\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string caminhoMenu = \"Assets/Create/Cartas/Item\";\n        Debug.Log(\"Menu Ativo: \" + caminhoMenu);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Menu Ativo: Assets/Create/Cartas/Item"
      }
    ],
    "reward": {
      "exp": 400,
      "coins": 200
    },
    "tests": [
      {
        "input": "",
        "expected": "Menu Ativo: Assets/Create/Cartas/Item",
        "description": "Câmara 30-4: Menu de Criação de Asset ([CreateAssetMenu])"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string caminhoMenu",
        "caminhoMenu",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq30_5",
    "title": "Câmara 30-5: Economia Modular de Custo de Habilidade",
    "difficulty": "medium",
    "chapterId": 30,
    "description": "Declare int manaDisponivel = 80; int custo = 30;. Subtraia o custo e emita 'Mana Restante: ' + (manaDisponivel - custo).",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Desconte a mana consumida\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int manaDisponivel = 80;\n        int custo = 30;\n        int restante = manaDisponivel - custo;\n        Debug.Log(\"Mana Restante: \" + restante);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Mana Restante: 50"
      }
    ],
    "reward": {
      "exp": 400,
      "coins": 200
    },
    "tests": [
      {
        "input": "",
        "expected": "Mana Restante: 50",
        "description": "Câmara 30-5: Economia Modular de Custo de Habilidade"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "manaDisponivel",
        "custo",
        "-",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_30 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_30 = CSHARP_ABYSS_FLOOR_30;
}
