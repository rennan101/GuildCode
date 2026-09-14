/**
 * GUILDCODE — C# Unity Abyss Floor 31 Data (csharp_ch31)
 */
const CSHARP_ABYSS_FLOOR_31 = [
  {
    "id": "sq31_1",
    "title": "Câmara 31-1: Salvando Pontuação com SetInt",
    "difficulty": "medium",
    "chapterId": 31,
    "description": "Armazene a pontuação chamando PlayerPrefs.SetInt('HighScore', 2500);. Em seguida, leia com PlayerPrefs.GetInt('HighScore', 0); e exiba 'HighScore Salvo: ' + score.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Salve e recupere HighScore\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerPrefs.SetInt(\"HighScore\", 2500);\n        int score = PlayerPrefs.GetInt(\"HighScore\", 0);\n        Debug.Log(\"HighScore Salvo: \" + score);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "HighScore Salvo: 2500"
      }
    ],
    "reward": {
      "exp": 410,
      "coins": 205
    },
    "tests": [
      {
        "input": "",
        "expected": "HighScore Salvo: 2500",
        "description": "Câmara 31-1: Salvando Pontuação com SetInt"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "PlayerPrefs.SetInt",
        "PlayerPrefs.GetInt",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq31_2",
    "title": "Câmara 31-2: Persistência de Volume Flutuante (SetFloat)",
    "difficulty": "medium",
    "chapterId": 31,
    "description": "Salve o volume usando PlayerPrefs.SetFloat('MasterVolume', 0.8f);. Recupere com GetFloat e exiba 'Volume: ' + vol.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Salve e recupere o volume\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerPrefs.SetFloat(\"MasterVolume\", 0.8f);\n        float vol = PlayerPrefs.GetFloat(\"MasterVolume\", 1.0f);\n        Debug.Log(\"Volume: \" + vol);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Volume: 0.8"
      }
    ],
    "reward": {
      "exp": 410,
      "coins": 205
    },
    "tests": [
      {
        "input": "",
        "expected": "Volume: 0.8",
        "description": "Câmara 31-2: Persistência de Volume Flutuante (SetFloat)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "PlayerPrefs.SetFloat",
        "PlayerPrefs.GetFloat",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq31_3",
    "title": "Câmara 31-3: Persistência do Nome do Jogador (SetString)",
    "difficulty": "medium",
    "chapterId": 31,
    "description": "Salve o nome com PlayerPrefs.SetString('NomePlayer', 'Arkan');. Recupere e emita 'Heroi Registrado: ' + nome.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Salve e recupere o nome\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerPrefs.SetString(\"NomePlayer\", \"Arkan\");\n        string nome = PlayerPrefs.GetString(\"NomePlayer\", \"Anonimo\");\n        Debug.Log(\"Heroi Registrado: \" + nome);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Heroi Registrado: Arkan"
      }
    ],
    "reward": {
      "exp": 410,
      "coins": 205
    },
    "tests": [
      {
        "input": "",
        "expected": "Heroi Registrado: Arkan",
        "description": "Câmara 31-3: Persistência do Nome do Jogador (SetString)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "PlayerPrefs.SetString",
        "PlayerPrefs.GetString",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq31_4",
    "title": "Câmara 31-4: Verificação de Chave Existente (HasKey)",
    "difficulty": "medium",
    "chapterId": 31,
    "description": "Verifique se a chave de tutorial existe: bool existe = PlayerPrefs.HasKey('TutorialVisto');. Se falso, emita 'Iniciar Tutorial'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque com HasKey\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool existe = PlayerPrefs.HasKey(\"TutorialVisto\");\n        if (!existe)\n        {\n            Debug.Log(\"Iniciar Tutorial\");\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Iniciar Tutorial"
      }
    ],
    "reward": {
      "exp": 410,
      "coins": 205
    },
    "tests": [
      {
        "input": "",
        "expected": "Iniciar Tutorial",
        "description": "Câmara 31-4: Verificação de Chave Existente (HasKey)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "PlayerPrefs.HasKey",
        "if",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq31_5",
    "title": "Câmara 31-5: Gravação Forçada no Disco (Save)",
    "difficulty": "medium",
    "chapterId": 31,
    "description": "Após configurar dados, chame PlayerPrefs.Save(); e emita 'Dados Gravados com Sucesso'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Execute PlayerPrefs.Save()\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerPrefs.Save();\n        Debug.Log(\"Dados Gravados com Sucesso\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dados Gravados com Sucesso"
      }
    ],
    "reward": {
      "exp": 410,
      "coins": 205
    },
    "tests": [
      {
        "input": "",
        "expected": "Dados Gravados com Sucesso",
        "description": "Câmara 31-5: Gravação Forçada no Disco (Save)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "PlayerPrefs.Save()",
        "Debug.Log"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_31 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_31 = CSHARP_ABYSS_FLOOR_31;
}
