/**
 * GUILDCODE — C# Unity Abyss Floor 2 Data (csharp_ch2)
 */
const CSHARP_ABYSS_FLOOR_02 = [
  {
    "id": "sq2_1",
    "title": "Câmara 2-1: Checagem de Sobrevivência",
    "difficulty": "medium",
    "chapterId": 2,
    "description": "Declare a variável inteira vida com 0 pontos. Utilize uma estrutura if/else: se vida > 0 exiba 'Status: Ativo', senão exiba 'Status: Game Over'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 0;\n        // Cheque com if/else e exiba o status\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 0;\n        if (vida > 0)\n        {\n            Debug.Log(\"Status: Ativo\");\n        }\n        else\n        {\n            Debug.Log(\"Status: Game Over\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Status: Game Over"
      }
    ],
    "reward": {
      "exp": 120,
      "coins": 60
    },
    "tests": [
      {
        "input": "",
        "expected": "Status: Game Over",
        "description": "Câmara 2-1: Checagem de Sobrevivência"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int vida",
        "if",
        "else",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq2_2",
    "title": "Câmara 2-2: Classificação por Dificuldade",
    "difficulty": "medium",
    "chapterId": 2,
    "description": "Declare a variável inteira nivel com 12. Se nivel < 10 exiba 'Dificuldade: Normal', caso contrário exiba 'Dificuldade: Heroica'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 12;\n        // Avalie o nivel com if/else\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 12;\n        if (nivel < 10)\n        {\n            Debug.Log(\"Dificuldade: Normal\");\n        }\n        else\n        {\n            Debug.Log(\"Dificuldade: Heroica\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dificuldade: Heroica"
      }
    ],
    "reward": {
      "exp": 120,
      "coins": 60
    },
    "tests": [
      {
        "input": "",
        "expected": "Dificuldade: Heroica",
        "description": "Câmara 2-2: Classificação por Dificuldade"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int nivel",
        "if",
        "else",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq2_3",
    "title": "Câmara 2-3: Ramo Múltiplo com Else If",
    "difficulty": "medium",
    "chapterId": 2,
    "description": "Declare a variável inteira mana com 30. Use if/else if/else: se mana >= 50 exiba 'Magia: Suprema', senão se mana >= 25 exiba 'Magia: Basica', senão exiba 'Sem Mana'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 30;\n        // Aplique if, else if e else\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 30;\n        if (mana >= 50)\n        {\n            Debug.Log(\"Magia: Suprema\");\n        }\n        else if (mana >= 25)\n        {\n            Debug.Log(\"Magia: Basica\");\n        }\n        else\n        {\n            Debug.Log(\"Sem Mana\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Magia: Basica"
      }
    ],
    "reward": {
      "exp": 120,
      "coins": 60
    },
    "tests": [
      {
        "input": "",
        "expected": "Magia: Basica",
        "description": "Câmara 2-3: Ramo Múltiplo com Else If"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int mana",
        "else if",
        "if",
        "else"
      ]
    }
  },
  {
    "id": "sq2_4",
    "title": "Câmara 2-4: Seleção com Switch Case",
    "difficulty": "medium",
    "chapterId": 2,
    "description": "Declare a variável inteira idClasse valendo 2. Utilize a estrutura switch com cases 1 ('Guerreiro'), 2 ('Mago') e default ('Desconhecido'), emitindo a classe selecionada.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int idClasse = 2;\n        // Use switch para avaliar idClasse\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int idClasse = 2;\n        switch (idClasse)\n        {\n            case 1:\n                Debug.Log(\"Classe: Guerreiro\");\n                break;\n            case 2:\n                Debug.Log(\"Classe: Mago\");\n                break;\n            default:\n                Debug.Log(\"Classe: Desconhecido\");\n                break;\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Classe: Mago"
      }
    ],
    "reward": {
      "exp": 120,
      "coins": 60
    },
    "tests": [
      {
        "input": "",
        "expected": "Classe: Mago",
        "description": "Câmara 2-4: Seleção com Switch Case"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "switch",
        "case 1:",
        "case 2:",
        "break;"
      ]
    }
  },
  {
    "id": "sq2_5",
    "title": "Câmara 2-5: Operador Ternário",
    "difficulty": "medium",
    "chapterId": 2,
    "description": "Declare a variável inteira stamina valendo 60. Utilize o operador ternário (? :) para definir a string estado como (stamina >= 50 ? 'Descansado' : 'Exausto') e imprima o Estado no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int stamina = 60;\n        // Use o operador ternario e exiba: Estado: Descansado\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int stamina = 60;\n        string estado = (stamina >= 50) ? \"Descansado\" : \"Exausto\";\n        Debug.Log(\"Estado: \" + estado);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Estado: Descansado"
      }
    ],
    "reward": {
      "exp": 120,
      "coins": 60
    },
    "tests": [
      {
        "input": "",
        "expected": "Estado: Descansado",
        "description": "Câmara 2-5: Operador Ternário"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "stamina",
        "?",
        ":",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_02 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_02 = CSHARP_ABYSS_FLOOR_02;
}
