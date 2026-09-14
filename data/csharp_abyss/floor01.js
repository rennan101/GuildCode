/**
 * GUILDCODE — C# Unity Abyss Floor 1 Data (csharp_ch1)
 */
const CSHARP_ABYSS_FLOOR_01 = [
  {
    "id": "sq1_1",
    "title": "Câmara 1-1: Dano Sofrido com Operador Composto",
    "difficulty": "medium",
    "chapterId": 1,
    "description": "Declare a variável inteira vida com 100 pontos e danoSofrido com 35 pontos. Aplique o operador de subtração composta (-=) para atualizar a vida e exiba a Vida Restante no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        // Aplique -= e exiba: Vida Restante: 65\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        vida -= danoSofrido;\n        Debug.Log(\"Vida Restante: \" + vida);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Vida Restante: 65"
      }
    ],
    "reward": {
      "exp": 110,
      "coins": 55
    },
    "tests": [
      {
        "input": "",
        "expected": "Vida Restante: 65",
        "description": "Câmara 1-1: Dano Sofrido com Operador Composto"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int vida",
        "vida -=",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq1_2",
    "title": "Câmara 1-2: Média de Duas Notas",
    "difficulty": "medium",
    "chapterId": 1,
    "description": "Calcule a média aritmética de duas partidas: declare as notas inteiras p1 com 8 e p2 com 6. Calcule a média flutuante dividindo a soma por 2.0f e imprima no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        // Calcule a media flutuante e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        float media = (p1 + p2) / 2.0f;\n        Debug.Log(\"Media: \" + media);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Media: 7"
      }
    ],
    "reward": {
      "exp": 110,
      "coins": 55
    },
    "tests": [
      {
        "input": "",
        "expected": "Media: 7",
        "description": "Câmara 1-2: Média de Duas Notas"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "p1",
        "p2",
        "media",
        "/"
      ]
    }
  },
  {
    "id": "sq1_3",
    "title": "Câmara 1-3: Controle de Turnos com Módulo (%)",
    "difficulty": "medium",
    "chapterId": 1,
    "description": "Declare a variável inteira frameAtual com 17 e ciclo com 4. Calcule o resto frameAtual % ciclo e exiba o Índice do Ciclo no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        // Calcule o resto e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        int indice = frameAtual % ciclo;\n        Debug.Log(\"Indice do Ciclo: \" + indice);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Indice do Ciclo: 1"
      }
    ],
    "reward": {
      "exp": 110,
      "coins": 55
    },
    "tests": [
      {
        "input": "",
        "expected": "Indice do Ciclo: 1",
        "description": "Câmara 1-3: Controle de Turnos com Módulo (%)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "frameAtual",
        "ciclo",
        "%",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq1_4",
    "title": "Câmara 1-4: Combinação Lógica com E (&&)",
    "difficulty": "medium",
    "chapterId": 1,
    "description": "Declare o nível inteiro nivel com 15 e a booleana temChave com true. Crie a booleana podeAbrir avaliando se nivel >= 10 E temChave é verdadeiro, exibindo o status de Acesso Permitido.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        // Avalie com && e imprima: Acesso Permitido: True\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        bool podeAbrir = nivel >= 10 && temChave;\n        Debug.Log(\"Acesso Permitido: \" + podeAbrir);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Acesso Permitido: True"
      }
    ],
    "reward": {
      "exp": 110,
      "coins": 55
    },
    "tests": [
      {
        "input": "",
        "expected": "Acesso Permitido: True",
        "description": "Câmara 1-4: Combinação Lógica com E (&&)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "nivel",
        "temChave",
        "&&",
        "podeAbrir"
      ]
    }
  },
  {
    "id": "sq1_5",
    "title": "Câmara 1-5: Negação Lógica com OU (||)",
    "difficulty": "medium",
    "chapterId": 1,
    "description": "Declare a booleana temEscudo valendo false e estaInvisivel valendo true. Crie a booleana protegido avaliando se temEscudo OU estaInvisivel é verdadeiro, exibindo o status de Protegido.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        // Avalie com || e imprima: Protegido: True\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        bool protegido = temEscudo || estaInvisivel;\n        Debug.Log(\"Protegido: \" + protegido);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Protegido: True"
      }
    ],
    "reward": {
      "exp": 110,
      "coins": 55
    },
    "tests": [
      {
        "input": "",
        "expected": "Protegido: True",
        "description": "Câmara 1-5: Negação Lógica com OU (||)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "temEscudo",
        "estaInvisivel",
        "||",
        "protegido"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_01 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_01 = CSHARP_ABYSS_FLOOR_01;
}
