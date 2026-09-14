/**
 * GUILDCODE — C# Unity Abyss Floor 10 Data (csharp_ch10)
 */
const CSHARP_ABYSS_FLOOR_10 = [
  {
    "id": "sq10_1",
    "title": "Câmara 10-1: Ordem de Inicialização (Awake & Start)",
    "difficulty": "medium",
    "chapterId": 10,
    "description": "Implemente os métodos Awake() e Start() no script. Em Awake, emita '1. Awake' e em Start emita '2. Start'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    // Defina Awake e Start\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Awake()\n    {\n        Debug.Log(\"1. Awake\");\n    }\n\n    void Start()\n    {\n        Debug.Log(\"2. Start\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "1. Awake\n2. Start"
      }
    ],
    "reward": {
      "exp": 200,
      "coins": 100
    },
    "tests": [
      {
        "input": "",
        "expected": "1. Awake\n2. Start",
        "description": "Câmara 10-1: Ordem de Inicialização (Awake & Start)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "void Awake()",
        "void Start()",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq10_2",
    "title": "Câmara 10-2: Simulação de Atualização de Quadro (Update)",
    "difficulty": "medium",
    "chapterId": 10,
    "description": "Declare int fps = 60;. Dentro de Start(), emita no Console: 'Update Ativo: ' + fps + ' FPS'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare int fps = 60 e imprima com Debug.Log\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int fps = 60;\n        Debug.Log(\"Update Ativo: \" + fps + \" FPS\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Update Ativo: 60 FPS"
      }
    ],
    "reward": {
      "exp": 200,
      "coins": 100
    },
    "tests": [
      {
        "input": "",
        "expected": "Update Ativo: 60 FPS",
        "description": "Câmara 10-2: Simulação de Atualização de Quadro (Update)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int fps",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq10_3",
    "title": "Câmara 10-3: Física Síncrona com FixedUpdate",
    "difficulty": "medium",
    "chapterId": 10,
    "description": "Declare float fixedDeltaTime = 0.02f;. Emita no Console em Start o intervalo de física padrão do Unity: 'FixedUpdate Intervalo: ' + fixedDeltaTime + 's'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare fixedDeltaTime e emita o intervalo de física\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float fixedDeltaTime = 0.02f;\n        Debug.Log(\"FixedUpdate Intervalo: \" + fixedDeltaTime + \"s\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "FixedUpdate Intervalo: 0.02s"
      }
    ],
    "reward": {
      "exp": 200,
      "coins": 100
    },
    "tests": [
      {
        "input": "",
        "expected": "FixedUpdate Intervalo: 0.02s",
        "description": "Câmara 10-3: Física Síncrona com FixedUpdate"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float fixedDeltaTime",
        "0.02f",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq10_4",
    "title": "Câmara 10-4: Ajuste de Câmera em LateUpdate",
    "difficulty": "medium",
    "chapterId": 10,
    "description": "Declare string faseCamera = 'LateUpdate: Posicionando Camera';. Emita no Console o valor de faseCamera com Debug.Log.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare faseCamera e emita o log\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string faseCamera = \"LateUpdate: Posicionando Camera\";\n        Debug.Log(faseCamera);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "LateUpdate: Posicionando Camera"
      }
    ],
    "reward": {
      "exp": 200,
      "coins": 100
    },
    "tests": [
      {
        "input": "",
        "expected": "LateUpdate: Posicionando Camera",
        "description": "Câmara 10-4: Ajuste de Câmera em LateUpdate"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string faseCamera",
        "faseCamera",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq10_5",
    "title": "Câmara 10-5: Limpeza de Recursos em OnDestroy",
    "difficulty": "medium",
    "chapterId": 10,
    "description": "Declare string statusDestruicao = 'OnDestroy: Recursos Liberados';. Emita a mensagem com Debug.Log.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusDestruicao e emita o log\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusDestruicao = \"OnDestroy: Recursos Liberados\";\n        Debug.Log(statusDestruicao);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "OnDestroy: Recursos Liberados"
      }
    ],
    "reward": {
      "exp": 200,
      "coins": 100
    },
    "tests": [
      {
        "input": "",
        "expected": "OnDestroy: Recursos Liberados",
        "description": "Câmara 10-5: Limpeza de Recursos em OnDestroy"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string statusDestruicao",
        "statusDestruicao",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_10 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_10 = CSHARP_ABYSS_FLOOR_10;
}
