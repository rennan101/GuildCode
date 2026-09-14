/**
 * GUILDCODE — C# Unity Abyss Floor 16 Data (csharp_ch16)
 */
const CSHARP_ABYSS_FLOOR_16 = [
  {
    "id": "sq16_1",
    "title": "Câmara 16-1: Configuração de Massa Física",
    "difficulty": "medium",
    "chapterId": 16,
    "description": "Declare a variável float massa = 75.0f;. Emita no Console: 'Massa do Rigidbody: 75kg'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare massa e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float massa = 75.0f;\n        Debug.Log(\"Massa do Rigidbody: \" + massa + \"kg\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Massa do Rigidbody: 75kg"
      }
    ],
    "reward": {
      "exp": 260,
      "coins": 130
    },
    "tests": [
      {
        "input": "",
        "expected": "Massa do Rigidbody: 75kg",
        "description": "Câmara 16-1: Configuração de Massa Física"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float massa",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq16_2",
    "title": "Câmara 16-2: Aplicação de Impulso com AddForce",
    "difficulty": "medium",
    "chapterId": 16,
    "description": "Simule a aplicação de um impulso de pulo: declare float forcaPulo = 10.0f;. Emita no Console: 'Forca Aplicada: 10N'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare forcaPulo e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float forcaPulo = 10.0f;\n        Debug.Log(\"Forca Aplicada: \" + forcaPulo + \"N\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Forca Aplicada: 10N"
      }
    ],
    "reward": {
      "exp": 260,
      "coins": 130
    },
    "tests": [
      {
        "input": "",
        "expected": "Forca Aplicada: 10N",
        "description": "Câmara 16-2: Aplicação de Impulso com AddForce"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float forcaPulo",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq16_3",
    "title": "Câmara 16-3: Velocidade Linear (linearVelocity)",
    "difficulty": "medium",
    "chapterId": 16,
    "description": "No Unity 6.5, linearVelocity gerencia a velocidade direta do corpo. Declare Vector3 vel = new Vector3(0, 5, 0); e emita 'Velocidade Y: ' + vel.y.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure vel e imprima vel.y\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 vel = new Vector3(0, 5, 0);\n        Debug.Log(\"Velocidade Y: \" + vel.y);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Velocidade Y: 5"
      }
    ],
    "reward": {
      "exp": 260,
      "coins": 130
    },
    "tests": [
      {
        "input": "",
        "expected": "Velocidade Y: 5",
        "description": "Câmara 16-3: Velocidade Linear (linearVelocity)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "new Vector3",
        "vel.y",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq16_4",
    "title": "Câmara 16-4: Controle de Gravidade (useGravity)",
    "difficulty": "medium",
    "chapterId": 16,
    "description": "Declare bool usaGravidade = true;. Se for verdadeiro, emita 'Gravidade Ativada no Corpo'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque usaGravidade\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool usaGravidade = true;\n        if (usaGravidade)\n        {\n            Debug.Log(\"Gravidade Ativada no Corpo\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Gravidade Ativada no Corpo"
      }
    ],
    "reward": {
      "exp": 260,
      "coins": 130
    },
    "tests": [
      {
        "input": "",
        "expected": "Gravidade Ativada no Corpo",
        "description": "Câmara 16-4: Controle de Gravidade (useGravity)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool usaGravidade",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq16_5",
    "title": "Câmara 16-5: Resistência do Ar (Drag)",
    "difficulty": "medium",
    "chapterId": 16,
    "description": "Declare float drag = 2.5f;. Emita no Console: 'Atrito do Ar (Drag): 2.5'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare drag e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float drag = 2.5f;\n        Debug.Log(\"Atrito do Ar (Drag): \" + drag);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Atrito do Ar (Drag): 2.5"
      }
    ],
    "reward": {
      "exp": 260,
      "coins": 130
    },
    "tests": [
      {
        "input": "",
        "expected": "Atrito do Ar (Drag): 2.5",
        "description": "Câmara 16-5: Resistência do Ar (Drag)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float drag",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_16 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_16 = CSHARP_ABYSS_FLOOR_16;
}
