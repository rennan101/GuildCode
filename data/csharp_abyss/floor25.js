/**
 * GUILDCODE — C# Unity Abyss Floor 25 Data (csharp_ch25)
 */
const CSHARP_ABYSS_FLOOR_25 = [
  {
    "id": "sq25_1",
    "title": "Câmara 25-1: Reprodução de Áudio com PlayOneShot",
    "difficulty": "medium",
    "chapterId": 25,
    "description": "Simule o disparo de um som único de golpe: declare string som = 'Espada_Hit';. Emita no Console: 'Audio Tocado: Espada_Hit'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o som e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string som = \"Espada_Hit\";\n        Debug.Log(\"Audio Tocado: \" + som);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Audio Tocado: Espada_Hit"
      }
    ],
    "reward": {
      "exp": 350,
      "coins": 175
    },
    "tests": [
      {
        "input": "",
        "expected": "Audio Tocado: Espada_Hit",
        "description": "Câmara 25-1: Reprodução de Áudio com PlayOneShot"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "som",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq25_2",
    "title": "Câmara 25-2: Atenuação de Volume Espacial (3D Blend)",
    "difficulty": "medium",
    "chapterId": 25,
    "description": "Declare float espacialBlend = 1.0f;. Emita no Console: 'Som 3D Completo: 1'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare espacialBlend e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float espacialBlend = 1.0f;\n        Debug.Log(\"Som 3D Completo: \" + espacialBlend);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Som 3D Completo: 1"
      }
    ],
    "reward": {
      "exp": 350,
      "coins": 175
    },
    "tests": [
      {
        "input": "",
        "expected": "Som 3D Completo: 1",
        "description": "Câmara 25-2: Atenuação de Volume Espacial (3D Blend)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float espacialBlend",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq25_3",
    "title": "Câmara 25-3: Distância Máxima de Audição (Max Distance)",
    "difficulty": "medium",
    "chapterId": 25,
    "description": "Declare float maxDist = 20.0f; e a distância atual float distOuvinte = 15.0f;. Se distOuvinte <= maxDist, emita 'Som Audivel'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide se o som e audivel\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float maxDist = 20.0f;\n        float distOuvinte = 15.0f;\n        if (distOuvinte <= maxDist)\n        {\n            Debug.Log(\"Som Audivel\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Som Audivel"
      }
    ],
    "reward": {
      "exp": 350,
      "coins": 175
    },
    "tests": [
      {
        "input": "",
        "expected": "Som Audivel",
        "description": "Câmara 25-3: Distância Máxima de Audição (Max Distance)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float maxDist",
        "float distOuvinte",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq25_4",
    "title": "Câmara 25-4: Controle de Volume Geral",
    "difficulty": "medium",
    "chapterId": 25,
    "description": "Declare float volume = 0.8f;. Emita no Console: 'Volume Master: 80%'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a porcentagem de volume e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float volume = 0.8f;\n        int pct = (int)(volume * 100);\n        Debug.Log(\"Volume Master: \" + pct + \"%\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Volume Master: 80%"
      }
    ],
    "reward": {
      "exp": 350,
      "coins": 175
    },
    "tests": [
      {
        "input": "",
        "expected": "Volume Master: 80%",
        "description": "Câmara 25-4: Controle de Volume Geral"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "float volume",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq25_5",
    "title": "Câmara 25-5: Trilha Sonora em Loop",
    "difficulty": "medium",
    "chapterId": 25,
    "description": "Declare string musica = 'Tema_Batalha'; e bool emLoop = true;. Se emLoop, emita 'BGM em Loop: Tema_Batalha'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se a musica esta em loop\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string musica = \"Tema_Batalha\";\n        bool emLoop = true;\n        if (emLoop)\n        {\n            Debug.Log(\"BGM em Loop: \" + musica);\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "BGM em Loop: Tema_Batalha"
      }
    ],
    "reward": {
      "exp": 350,
      "coins": 175
    },
    "tests": [
      {
        "input": "",
        "expected": "BGM em Loop: Tema_Batalha",
        "description": "Câmara 25-5: Trilha Sonora em Loop"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "musica",
        "bool emLoop",
        "if",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_25 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_25 = CSHARP_ABYSS_FLOOR_25;
}
