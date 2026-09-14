/**
 * GUILDCODE — C# Unity Abyss Floor 11 Data (csharp_ch11)
 */
const CSHARP_ABYSS_FLOOR_11 = [
  {
    "id": "sq11_1",
    "title": "Câmara 11-1: Detecção de Tecla com Keyboard.current",
    "difficulty": "medium",
    "chapterId": 11,
    "description": "Verifique o pressionamento da barra de espaço: avalie Keyboard.current.spaceKey.wasPressedThisFrame. Se for verdadeiro, emita 'Pulo Acionado!'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique o pulo no Keyboard.current\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current.spaceKey.wasPressedThisFrame)\n        {\n            Debug.Log(\"Pulo Acionado!\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Pulo Acionado!"
      }
    ],
    "reward": {
      "exp": 210,
      "coins": 105
    },
    "tests": [
      {
        "input": "",
        "expected": "Pulo Acionado!",
        "description": "Câmara 11-1: Detecção de Tecla com Keyboard.current"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Keyboard.current",
        "spaceKey",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq11_2",
    "title": "Câmara 11-2: Leitura Contínua de Tecla de Movimento",
    "difficulty": "medium",
    "chapterId": 11,
    "description": "Verifique se a tecla W está sendo mantida pressionada usando Keyboard.current.wKey.isPressed. Se sim, emita 'Acelerando para Frente'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque wKey.isPressed\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current.wKey.isPressed)\n        {\n            Debug.Log(\"Acelerando para Frente\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Acelerando para Frente"
      }
    ],
    "reward": {
      "exp": 210,
      "coins": 105
    },
    "tests": [
      {
        "input": "",
        "expected": "Acelerando para Frente",
        "description": "Câmara 11-2: Leitura Contínua de Tecla de Movimento"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Keyboard.current.wKey.isPressed",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq11_3",
    "title": "Câmara 11-3: Clique do Botão Esquerdo do Mouse",
    "difficulty": "medium",
    "chapterId": 11,
    "description": "Cheque o clique do botão esquerdo do mouse através de Mouse.current.leftButton.wasPressedThisFrame. Se verdadeiro, emita 'Disparo Efetuado!'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque o botao esquerdo do mouse\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Mouse.current.leftButton.wasPressedThisFrame)\n        {\n            Debug.Log(\"Disparo Efetuado!\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Disparo Efetuado!"
      }
    ],
    "reward": {
      "exp": 210,
      "coins": 105
    },
    "tests": [
      {
        "input": "",
        "expected": "Disparo Efetuado!",
        "description": "Câmara 11-3: Clique do Botão Esquerdo do Mouse"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Mouse.current.leftButton",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq11_4",
    "title": "Câmara 11-4: Leitura da Posição do Mouse",
    "difficulty": "medium",
    "chapterId": 11,
    "description": "Obtenha a coordenada X do ponteiro do mouse chamando Mouse.current.position.ReadValue().x. Emita no Console: 'Mouse X: ' + mouseX.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Leia a posicao do mouse e imprima X\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mouseX = Mouse.current.position.ReadValue().x;\n        Debug.Log(\"Mouse X: \" + mouseX);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Mouse X: 100"
      }
    ],
    "reward": {
      "exp": 210,
      "coins": 105
    },
    "tests": [
      {
        "input": "",
        "expected": "Mouse X: 100",
        "description": "Câmara 11-4: Leitura da Posição do Mouse"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "Mouse.current.position.ReadValue()",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq11_5",
    "title": "Câmara 11-5: Suporte Multi-Dispositivo",
    "difficulty": "medium",
    "chapterId": 11,
    "description": "Simule a verificação de dispositivo conectado: declare bool tecladoConectado = true; e bool gamepadConectado = false;. Emita 'Dispositivo Principal: Teclado'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os dispositivos e emita o ativo\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool tecladoConectado = true;\n        if (tecladoConectado)\n        {\n            Debug.Log(\"Dispositivo Principal: Teclado\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dispositivo Principal: Teclado"
      }
    ],
    "reward": {
      "exp": 210,
      "coins": 105
    },
    "tests": [
      {
        "input": "",
        "expected": "Dispositivo Principal: Teclado",
        "description": "Câmara 11-5: Suporte Multi-Dispositivo"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "bool tecladoConectado",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_11 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_11 = CSHARP_ABYSS_FLOOR_11;
}
