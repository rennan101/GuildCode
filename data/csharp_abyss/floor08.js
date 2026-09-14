/**
 * GUILDCODE — C# Unity Abyss Floor 8 Data (csharp_ch8)
 */
const CSHARP_ABYSS_FLOOR_08 = [
  {
    "id": "sq8_1",
    "title": "Câmara 8-1: Identificação de GameObject",
    "difficulty": "medium",
    "chapterId": 8,
    "description": "Obtenha o nome do GameObject atual acessando a propriedade gameObject.name. Emita no Console: 'GameObject: Jogador'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba o nome do GameObject\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"GameObject: \" + gameObject.name);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "GameObject: Jogador"
      }
    ],
    "reward": {
      "exp": 180,
      "coins": 90
    },
    "tests": [
      {
        "input": "",
        "expected": "GameObject: Jogador",
        "description": "Câmara 8-1: Identificação de GameObject"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "gameObject.name",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq8_2",
    "title": "Câmara 8-2: Verificação de Tag",
    "difficulty": "medium",
    "chapterId": 8,
    "description": "Defina a variável string tag = 'Player';. Verifique com if se a tag é igual a 'Player' e emita 'Tag Valida: Player'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tag = \"Player\";\n        // Cheque a tag e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tag = \"Player\";\n        if (tag == \"Player\")\n        {\n            Debug.Log(\"Tag Valida: \" + tag);\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Tag Valida: Player"
      }
    ],
    "reward": {
      "exp": 180,
      "coins": 90
    },
    "tests": [
      {
        "input": "",
        "expected": "Tag Valida: Player",
        "description": "Câmara 8-2: Verificação de Tag"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "tag",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq8_3",
    "title": "Câmara 8-3: Simulação de GetComponent",
    "difficulty": "medium",
    "chapterId": 8,
    "description": "Simule a busca de um componente Rigidbody: declare bool temRigidbody = true;. Se for verdadeiro, emita 'Componente Rigidbody Encontrado'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temRigidbody = true;\n        // Cheque e emita a mensagem\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temRigidbody = true;\n        if (temRigidbody)\n        {\n            Debug.Log(\"Componente Rigidbody Encontrado\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Componente Rigidbody Encontrado"
      }
    ],
    "reward": {
      "exp": 180,
      "coins": 90
    },
    "tests": [
      {
        "input": "",
        "expected": "Componente Rigidbody Encontrado",
        "description": "Câmara 8-3: Simulação de GetComponent"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool temRigidbody",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq8_4",
    "title": "Câmara 8-4: Estado Ativo de GameObject",
    "difficulty": "medium",
    "chapterId": 8,
    "description": "Declare a variável booleana estaAtivo = true;. Emita no Console: 'GameObject Ativo: True'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare estaAtivo e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaAtivo = true;\n        Debug.Log(\"GameObject Ativo: \" + estaAtivo);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "GameObject Ativo: True"
      }
    ],
    "reward": {
      "exp": 180,
      "coins": 90
    },
    "tests": [
      {
        "input": "",
        "expected": "GameObject Ativo: True",
        "description": "Câmara 8-4: Estado Ativo de GameObject"
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
    "id": "sq8_5",
    "title": "Câmara 8-5: Contagem de Componentes",
    "difficulty": "medium",
    "chapterId": 8,
    "description": "Declare um array com os componentes do Player: 'Transform', 'MeshRenderer', 'Collider'. Exiba no Console: 'Total de Componentes: ' + componentes.Length.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o array de componentes e exiba o Length\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] componentes = new string[] { \"Transform\", \"MeshRenderer\", \"Collider\" };\n        Debug.Log(\"Total de Componentes: \" + componentes.Length);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Total de Componentes: 3"
      }
    ],
    "reward": {
      "exp": 180,
      "coins": 90
    },
    "tests": [
      {
        "input": "",
        "expected": "Total de Componentes: 3",
        "description": "Câmara 8-5: Contagem de Componentes"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string[] componentes",
        "componentes.Length",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_08 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_08 = CSHARP_ABYSS_FLOOR_08;
}
