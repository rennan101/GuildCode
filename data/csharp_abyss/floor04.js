/**
 * GUILDCODE — C# Unity Abyss Floor 4 Data (csharp_ch4)
 */
const CSHARP_ABYSS_FLOOR_04 = [
  {
    "id": "sq4_1",
    "title": "Câmara 4-1: Método Void de Log",
    "difficulty": "medium",
    "chapterId": 4,
    "description": "Defina o método auxiliar void ExibirBoasVindas() que emite 'Bem-vindo ao Unity 6.5'. Invoque o método dentro de Start().",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame ExibirBoasVindas()\n    }\n    \n    // Crie o metodo void ExibirBoasVindas\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ExibirBoasVindas();\n    }\n\n    void ExibirBoasVindas()\n    {\n        Debug.Log(\"Bem-vindo ao Unity 6.5\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Bem-vindo ao Unity 6.5"
      }
    ],
    "reward": {
      "exp": 140,
      "coins": 70
    },
    "tests": [
      {
        "input": "",
        "expected": "Bem-vindo ao Unity 6.5",
        "description": "Câmara 4-1: Método Void de Log"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "void ExibirBoasVindas()",
        "ExibirBoasVindas()",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq4_2",
    "title": "Câmara 4-2: Função com Retorno Inteiro",
    "difficulty": "medium",
    "chapterId": 4,
    "description": "Crie a função int Dobrar(int valor) que retorna valor * 2. Em Start, declare int res = Dobrar(25); e imprima 'Resultado: ' + res.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame Dobrar com 25 e imprima o resultado\n    }\n    \n    // Crie o metodo Dobrar\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int res = Dobrar(25);\n        Debug.Log(\"Resultado: \" + res);\n    }\n\n    int Dobrar(int valor)\n    {\n        return valor * 2;\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Resultado: 50"
      }
    ],
    "reward": {
      "exp": 140,
      "coins": 70
    },
    "tests": [
      {
        "input": "",
        "expected": "Resultado: 50",
        "description": "Câmara 4-2: Função com Retorno Inteiro"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int Dobrar(int valor)",
        "return valor * 2",
        "Dobrar(25)"
      ]
    }
  },
  {
    "id": "sq4_3",
    "title": "Câmara 4-3: Função de Cálculo de Dano Crítico",
    "difficulty": "medium",
    "chapterId": 4,
    "description": "Crie a função int CalcularCritico(int dano, int multiplicador) que retorna dano * multiplicador. No Start, chame com (50, 3) e exiba 'Dano Critico: ' + resultado.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Invoque CalcularCritico e imprima\n    }\n    \n    // Defina CalcularCritico\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoFinal = CalcularCritico(50, 3);\n        Debug.Log(\"Dano Critico: \" + danoFinal);\n    }\n\n    int CalcularCritico(int dano, int multiplicador)\n    {\n        return dano * multiplicador;\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dano Critico: 150"
      }
    ],
    "reward": {
      "exp": 140,
      "coins": 70
    },
    "tests": [
      {
        "input": "",
        "expected": "Dano Critico: 150",
        "description": "Câmara 4-3: Função de Cálculo de Dano Crítico"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int CalcularCritico(int dano, int multiplicador)",
        "CalcularCritico(50, 3)"
      ]
    }
  },
  {
    "id": "sq4_4",
    "title": "Câmara 4-4: Função Booleana de Verificação",
    "difficulty": "medium",
    "chapterId": 4,
    "description": "Crie a função bool EstaVivo(int vidaAtual) que retorna vidaAtual > 0. No Start, teste com 10 pontos e exiba 'Heroi Vivo: ' + EstaVivo(10).",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Teste EstaVivo com 10 e imprima\n    }\n    \n    // Defina EstaVivo\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool vivo = EstaVivo(10);\n        Debug.Log(\"Heroi Vivo: \" + vivo);\n    }\n\n    bool EstaVivo(int vidaAtual)\n    {\n        return vidaAtual > 0;\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Heroi Vivo: True"
      }
    ],
    "reward": {
      "exp": 140,
      "coins": 70
    },
    "tests": [
      {
        "input": "",
        "expected": "Heroi Vivo: True",
        "description": "Câmara 4-4: Função Booleana de Verificação"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool EstaVivo(int vidaAtual)",
        "return vidaAtual > 0",
        "EstaVivo(10)"
      ]
    }
  },
  {
    "id": "sq4_5",
    "title": "Câmara 4-5: Formatação de Nome de Jogador",
    "difficulty": "medium",
    "chapterId": 4,
    "description": "Crie a função string FormatarNome(string nome, int nivel) que retorna 'Player: ' + nome + ' [Lv ' + nivel + ']'. No Start, chame com ('Arkan', 20) e exiba o resultado.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame FormatarNome e imprima\n    }\n    \n    // Defina FormatarNome\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string rotulo = FormatarNome(\"Arkan\", 20);\n        Debug.Log(rotulo);\n    }\n\n    string FormatarNome(string nome, int nivel)\n    {\n        return \"Player: \" + nome + \" [Lv \" + nivel + \"]\";\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Player: Arkan [Lv 20]"
      }
    ],
    "reward": {
      "exp": 140,
      "coins": 70
    },
    "tests": [
      {
        "input": "",
        "expected": "Player: Arkan [Lv 20]",
        "description": "Câmara 4-5: Formatação de Nome de Jogador"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string FormatarNome(string nome, int nivel)",
        "FormatarNome(\"Arkan\", 20)"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_04 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_04 = CSHARP_ABYSS_FLOOR_04;
}
