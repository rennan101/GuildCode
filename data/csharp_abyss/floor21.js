/**
 * GUILDCODE — C# Unity Abyss Floor 21 Data (csharp_ch21)
 */
const CSHARP_ABYSS_FLOOR_21 = [
  {
    "id": "sq21_1",
    "title": "Câmara 21-1: Dimensões do Terreno",
    "difficulty": "medium",
    "chapterId": 21,
    "description": "Declare int tamanhoTerreno = 500;. Emita no Console: 'Area do Terreno: 500x500m'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tamanhoTerreno e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int tamanhoTerreno = 500;\n        Debug.Log(\"Area do Terreno: \" + tamanhoTerreno + \"x\" + tamanhoTerreno + \"m\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Area do Terreno: 500x500m"
      }
    ],
    "reward": {
      "exp": 310,
      "coins": 155
    },
    "tests": [
      {
        "input": "",
        "expected": "Area do Terreno: 500x500m",
        "description": "Câmara 21-1: Dimensões do Terreno"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int tamanhoTerreno",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq21_2",
    "title": "Câmara 21-2: Leitura de Altura do Mapa (Heightmap)",
    "difficulty": "medium",
    "chapterId": 21,
    "description": "Declare float alturaY = 24.5f;. Emita no Console: 'Elevacao no Ponto: 24.5m'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare alturaY e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float alturaY = 24.5f;\n        Debug.Log(\"Elevacao no Ponto: \" + alturaY + \"m\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Elevacao no Ponto: 24.5m"
      }
    ],
    "reward": {
      "exp": 310,
      "coins": 155
    },
    "tests": [
      {
        "input": "",
        "expected": "Elevacao no Ponto: 24.5m",
        "description": "Câmara 21-2: Leitura de Altura do Mapa (Heightmap)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float alturaY",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq21_3",
    "title": "Câmara 21-3: Densidade de Vegetação e Árvores",
    "difficulty": "medium",
    "chapterId": 21,
    "description": "Declare int totalArvores = 1200;. Emita no Console: 'Instancias de Arvores: 1200'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare totalArvores e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalArvores = 1200;\n        Debug.Log(\"Instancias de Arvores: \" + totalArvores);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Instancias de Arvores: 1200"
      }
    ],
    "reward": {
      "exp": 310,
      "coins": 155
    },
    "tests": [
      {
        "input": "",
        "expected": "Instancias de Arvores: 1200",
        "description": "Câmara 21-3: Densidade de Vegetação e Árvores"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int totalArvores",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq21_4",
    "title": "Câmara 21-4: Distância de Desenho de Grama",
    "difficulty": "medium",
    "chapterId": 21,
    "description": "Declare int distanciaDetalhes = 80;. Emita no Console: 'Distancia de Detalhes: 80m'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare distanciaDetalhes e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int distanciaDetalhes = 80;\n        Debug.Log(\"Distancia de Detalhes: \" + distanciaDetalhes + \"m\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Distancia de Detalhes: 80m"
      }
    ],
    "reward": {
      "exp": 310,
      "coins": 155
    },
    "tests": [
      {
        "input": "",
        "expected": "Distancia de Detalhes: 80m",
        "description": "Câmara 21-4: Distância de Desenho de Grama"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int distanciaDetalhes",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq21_5",
    "title": "Câmara 21-5: Pintura de Camada de Textura (Splatmap)",
    "difficulty": "medium",
    "chapterId": 21,
    "description": "Declare string camadaAtiva = 'Grama_Rochosa';. Emita no Console: 'Camada de Textura: Grama_Rochosa'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare camadaAtiva e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string camadaAtiva = \"Grama_Rochosa\";\n        Debug.Log(\"Camada de Textura: \" + camadaAtiva);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Camada de Textura: Grama_Rochosa"
      }
    ],
    "reward": {
      "exp": 310,
      "coins": 155
    },
    "tests": [
      {
        "input": "",
        "expected": "Camada de Textura: Grama_Rochosa",
        "description": "Câmara 21-5: Pintura de Camada de Textura (Splatmap)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "camadaAtiva",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_21 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_21 = CSHARP_ABYSS_FLOOR_21;
}
