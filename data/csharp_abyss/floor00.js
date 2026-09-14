/**
 * GUILDCODE — C# Unity Abyss Floor 0 Data (csharp_ch0)
 */
const CSHARP_ABYSS_FLOOR_00 = [
  {
    "id": "sq0_1",
    "title": "Câmara 0-1: Primeiro Log de Vida",
    "difficulty": "medium",
    "chapterId": 0,
    "description": "Declare no método Start uma variável inteira para armazenar a vida inicializada com 100 pontos. Em seguida, utilize Debug.Log para emitir no Console o texto de identificação concatenado com a vida.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare int vida = 100;\n        \n        // 2. Emita no Console: Vida: 100\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        Debug.Log(\"Vida: \" + vida);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Vida: 100"
      }
    ],
    "reward": {
      "exp": 100,
      "coins": 50
    },
    "tests": [
      {
        "input": "",
        "expected": "Vida: 100",
        "description": "Câmara 0-1: Primeiro Log de Vida"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int vida",
        "vida",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq0_2",
    "title": "Câmara 0-2: Velocidade Flutuante",
    "difficulty": "medium",
    "chapterId": 0,
    "description": "Configure o personagem declarando a variável string heroi com 'Kael' e a variável float velocidade com 7.5f (com sufixo f). Emita ambos em linhas separadas no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare heroi e velocidade (7.5f)\n        \n        // Imprima os dois valores\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = \"Kael\";\n        float velocidade = 7.5f;\n        Debug.Log(\"Heroi: \" + heroi);\n        Debug.Log(\"Velocidade: \" + velocidade);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Heroi: Kael\nVelocidade: 7.5"
      }
    ],
    "reward": {
      "exp": 100,
      "coins": 50
    },
    "tests": [
      {
        "input": "",
        "expected": "Heroi: Kael\nVelocidade: 7.5",
        "description": "Câmara 0-2: Velocidade Flutuante"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float velocidade",
        "7.5f",
        "heroi",
        "Kael"
      ]
    }
  },
  {
    "id": "sq0_3",
    "title": "Câmara 0-3: Cálculo de Dano Total",
    "difficulty": "medium",
    "chapterId": 0,
    "description": "Declare as variáveis inteiras danoBase valendo 40 e multiplicador valendo 2, além de um bônus flutuante bonus valendo 5.5f. Calcule o danoTotal com (danoBase * multiplicador) + bonus e exiba no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare danoBase, multiplicador e bonus\n        \n        // Calcule danoTotal e imprima com Debug.Log\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 40;\n        int multiplicador = 2;\n        float bonus = 5.5f;\n        float danoTotal = (danoBase * multiplicador) + bonus;\n        Debug.Log(\"Dano Total: \" + danoTotal);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dano Total: 85.5"
      }
    ],
    "reward": {
      "exp": 100,
      "coins": 50
    },
    "tests": [
      {
        "input": "",
        "expected": "Dano Total: 85.5",
        "description": "Câmara 0-3: Cálculo de Dano Total"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "danoBase",
        "multiplicador",
        "bonus",
        "danoTotal",
        "*"
      ]
    }
  },
  {
    "id": "sq0_4",
    "title": "Câmara 0-4: Prontidão Booleana",
    "difficulty": "medium",
    "chapterId": 0,
    "description": "Declare a variável booleana estaPronto valendo true e a variável caractere simbolo valendo 'G'. Imprima o estado de prontidão e a classe no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare estaPronto e simbolo\n        \n        // Emita no Console\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaPronto = true;\n        char simbolo = 'G';\n        Debug.Log(\"Pronto: \" + estaPronto + \" | Classe: \" + simbolo);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Pronto: True | Classe: G"
      }
    ],
    "reward": {
      "exp": 100,
      "coins": 50
    },
    "tests": [
      {
        "input": "",
        "expected": "Pronto: True | Classe: G",
        "description": "Câmara 0-4: Prontidão Booleana"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool estaPronto",
        "char simbolo",
        "true",
        "'G'"
      ]
    }
  },
  {
    "id": "sq0_5",
    "title": "Câmara 0-5: Constante de Gravidade",
    "difficulty": "medium",
    "chapterId": 0,
    "description": "Declare a constante flutuante <code>const float GRAVIDADE = -10.0f;</code> e a variável inteira <code>int massa = 10;</code>. Em seguida, calcule a intensidade positiva da força peso declarando a variável <code>float peso = massa * 10.0f;</code> (ou <code>massa * -GRAVIDADE;</code>) e exiba no Console exatamente: <code>Gravidade: -10 | Peso: 100</code>.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare a constante GRAVIDADE e a variavel massa\n        \n        // 2. Declare float peso = massa * 10.0f; (ou massa * -GRAVIDADE;)\n        \n        // 3. Imprima: Gravidade: -10 | Peso: 100\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        const float GRAVIDADE = -10.0f;\n        int massa = 10;\n        float peso = massa * 10.0f;\n        Debug.Log(\"Gravidade: \" + GRAVIDADE + \" | Peso: \" + peso);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Gravidade: -10 | Peso: 100"
      }
    ],
    "reward": {
      "exp": 100,
      "coins": 50
    },
    "tests": [
      {
        "input": "",
        "expected": "Gravidade: -10 | Peso: 100",
        "description": "Câmara 0-5: Constante de Gravidade"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "const float GRAVIDADE",
        "-10.0f",
        "massa",
        "peso",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_00 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_00 = CSHARP_ABYSS_FLOOR_00;
}
