/**
 * GUILDCODE — C# Unity Abyss Floor 36 Data (csharp_ch36)
 */
const CSHARP_ABYSS_FLOOR_36 = [
  {
    "id": "sq36_1",
    "title": "Câmara 36-1: Tratamento de Exceção Simples com Try/Catch",
    "difficulty": "medium",
    "chapterId": 36,
    "description": "Utilize uma estrutura try/catch: no bloco try, execute int valor = 100; e emita 'Processamento Seguro: ' + valor.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Use try/catch e emita o valor processado\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        try\n        {\n            int valor = 100;\n            Debug.Log(\"Processamento Seguro: \" + valor);\n        }\n        catch\n        {\n            Debug.Log(\"Erro capturado\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Processamento Seguro: 100"
      }
    ],
    "reward": {
      "exp": 460,
      "coins": 230
    },
    "tests": [
      {
        "input": "",
        "expected": "Processamento Seguro: 100",
        "description": "Câmara 36-1: Tratamento de Exceção Simples com Try/Catch"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "try",
        "catch",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq36_2",
    "title": "Câmara 36-2: Prevenção de Divisão por Zero",
    "difficulty": "medium",
    "chapterId": 36,
    "description": "Declare int divisor = 0;. Se divisor == 0, emita 'Aviso: Divisao por Zero Evitada!', senão divida.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide divisor antes de calcular\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int divisor = 0;\n        if (divisor == 0)\n        {\n            Debug.Log(\"Aviso: Divisao por Zero Evitada!\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Aviso: Divisao por Zero Evitada!"
      }
    ],
    "reward": {
      "exp": 460,
      "coins": 230
    },
    "tests": [
      {
        "input": "",
        "expected": "Aviso: Divisao por Zero Evitada!",
        "description": "Câmara 36-2: Prevenção de Divisão por Zero"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int divisor",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq36_3",
    "title": "Câmara 36-3: Tratamento de NullReferenceException",
    "difficulty": "medium",
    "chapterId": 36,
    "description": "Simule a checagem defensiva de componente nulo: declare bool componenteExiste = false;. Se não existir, emita 'Erro Evitado: Componente Nulo'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o componente e nulo\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool componenteExiste = false;\n        if (!componenteExiste)\n        {\n            Debug.Log(\"Erro Evitado: Componente Nulo\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Erro Evitado: Componente Nulo"
      }
    ],
    "reward": {
      "exp": 460,
      "coins": 230
    },
    "tests": [
      {
        "input": "",
        "expected": "Erro Evitado: Componente Nulo",
        "description": "Câmara 36-3: Tratamento de NullReferenceException"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool componenteExiste",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq36_4",
    "title": "Câmara 36-4: Bloco Finally de Limpeza",
    "difficulty": "medium",
    "chapterId": 36,
    "description": "Declare string statusLimpeza = 'Bloco Finally: Arquivo Fechado';. Emita a mensagem com Debug.Log.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusLimpeza e emita a finalizacao do bloco\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusLimpeza = \"Bloco Finally: Arquivo Fechado\";\n        Debug.Log(statusLimpeza);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Bloco Finally: Arquivo Fechado"
      }
    ],
    "reward": {
      "exp": 460,
      "coins": 230
    },
    "tests": [
      {
        "input": "",
        "expected": "Bloco Finally: Arquivo Fechado",
        "description": "Câmara 36-4: Bloco Finally de Limpeza"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string statusLimpeza",
        "statusLimpeza",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq36_5",
    "title": "Câmara 36-5: Lançamento de Erro Personalizado (Throw)",
    "difficulty": "medium",
    "chapterId": 36,
    "description": "Declare int nivelRequerido = 50; int nivelPlayer = 20;. Se nivelPlayer < nivelRequerido, emita 'Excecao: Nivel Insuficiente para Entrar'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide o nivel e lance a mensagem\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivelRequerido = 50;\n        int nivelPlayer = 20;\n        if (nivelPlayer < nivelRequerido)\n        {\n            Debug.Log(\"Excecao: Nivel Insuficiente para Entrar\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Excecao: Nivel Insuficiente para Entrar"
      }
    ],
    "reward": {
      "exp": 460,
      "coins": 230
    },
    "tests": [
      {
        "input": "",
        "expected": "Excecao: Nivel Insuficiente para Entrar",
        "description": "Câmara 36-5: Lançamento de Erro Personalizado (Throw)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "nivelRequerido",
        "nivelPlayer",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_36 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_36 = CSHARP_ABYSS_FLOOR_36;
}
