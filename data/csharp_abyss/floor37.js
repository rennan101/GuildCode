/**
 * GUILDCODE — C# Unity Abyss Floor 37 Data (csharp_ch37)
 */
const CSHARP_ABYSS_FLOOR_37 = [
  {
    "id": "sq37_1",
    "title": "Câmara 37-1: Otimização de Draw Calls com Batching",
    "difficulty": "medium",
    "chapterId": 37,
    "description": "Declare int drawCallsAntes = 120; int drawCallsDepois = 25;. Emita: 'Draw Calls Reduzidos de 120 para 25'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare os valores e emita a reducao\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int drawCallsAntes = 120;\n        int drawCallsDepois = 25;\n        Debug.Log(\"Draw Calls Reduzidos de \" + drawCallsAntes + \" para \" + drawCallsDepois);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Draw Calls Reduzidos de 120 para 25"
      }
    ],
    "reward": {
      "exp": 470,
      "coins": 235
    },
    "tests": [
      {
        "input": "",
        "expected": "Draw Calls Reduzidos de 120 para 25",
        "description": "Câmara 37-1: Otimização de Draw Calls com Batching"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "drawCallsAntes",
        "drawCallsDepois",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq37_2",
    "title": "Câmara 37-2: Ocultamento por Oclusão (Occlusion Culling)",
    "difficulty": "medium",
    "chapterId": 37,
    "description": "Declare int objetosNaCena = 1000; int objetosRenderizados = 150;. Emita no Console: 'Renderizados com Oclusao: 150/1000'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os objetos e emita\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int objetosNaCena = 1000;\n        int objetosRenderizados = 150;\n        Debug.Log(\"Renderizados com Oclusao: \" + objetosRenderizados + \"/\" + objetosNaCena);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Renderizados com Oclusao: 150/1000"
      }
    ],
    "reward": {
      "exp": 470,
      "coins": 235
    },
    "tests": [
      {
        "input": "",
        "expected": "Renderizados com Oclusao: 150/1000",
        "description": "Câmara 37-2: Ocultamento por Oclusão (Occlusion Culling)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "objetosNaCena",
        "objetosRenderizados",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq37_3",
    "title": "Câmara 37-3: Níveis de Detalhe (LOD Group)",
    "difficulty": "medium",
    "chapterId": 37,
    "description": "Declare float distanciaCamera = 60.0f;. Se distanciaCamera >= 50.0f, defina lod = 'LOD2 (Baixo)' e emita 'Malha Ativa: ' + lod.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a distancia e selecione o LOD\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distanciaCamera = 60.0f;\n        if (distanciaCamera >= 50.0f)\n        {\n            string lod = \"LOD2 (Baixo)\";\n            Debug.Log(\"Malha Ativa: \" + lod);\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Malha Ativa: LOD2 (Baixo)"
      }
    ],
    "reward": {
      "exp": 470,
      "coins": 235
    },
    "tests": [
      {
        "input": "",
        "expected": "Malha Ativa: LOD2 (Baixo)",
        "description": "Câmara 37-3: Níveis de Detalhe (LOD Group)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "distanciaCamera",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq37_4",
    "title": "Câmara 37-4: Estabilidade de Taxa de Quadros (TargetFrameRate)",
    "difficulty": "medium",
    "chapterId": 37,
    "description": "Declare int targetFps = 60;. Emita no Console: 'Trava de FPS: 60 FPS'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare targetFps e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int targetFps = 60;\n        Debug.Log(\"Trava de FPS: \" + targetFps + \" FPS\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Trava de FPS: 60 FPS"
      }
    ],
    "reward": {
      "exp": 470,
      "coins": 235
    },
    "tests": [
      {
        "input": "",
        "expected": "Trava de FPS: 60 FPS",
        "description": "Câmara 37-4: Estabilidade de Taxa de Quadros (TargetFrameRate)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "int targetFps",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq37_5",
    "title": "Câmara 37-5: Monitoramento de Memória no Profiler",
    "difficulty": "medium",
    "chapterId": 37,
    "description": "Declare float memoriaUsadaMB = 450.5f;. Emita no Console: 'Memoria Alocada: 450.5 MB'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare memoriaUsadaMB e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float memoriaUsadaMB = 450.5f;\n        Debug.Log(\"Memoria Alocada: \" + memoriaUsadaMB + \" MB\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Memoria Alocada: 450.5 MB"
      }
    ],
    "reward": {
      "exp": 470,
      "coins": 235
    },
    "tests": [
      {
        "input": "",
        "expected": "Memoria Alocada: 450.5 MB",
        "description": "Câmara 37-5: Monitoramento de Memória no Profiler"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float memoriaUsadaMB",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_37 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_37 = CSHARP_ABYSS_FLOOR_37;
}
