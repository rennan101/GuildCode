/**
 * GUILDCODE — C# Unity Abyss Floor 7 Data (csharp_ch7)
 */
const CSHARP_ABYSS_FLOOR_07 = [
  {
    "id": "sq7_1",
    "title": "Câmara 7-1: Sobrescrita de Mensagem (Override)",
    "difficulty": "medium",
    "chapterId": 7,
    "description": "Declare string classe = 'Guerreiro'; e string arma = 'Espada';. Simule a ação herdada emitida com Debug.Log(classe + ' atacando com ' + arma + '!');.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare classe e arma e emita o ataque\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string classe = \"Guerreiro\";\n        string arma = \"Espada\";\n        Debug.Log(classe + \" atacando com \" + arma + \"!\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Guerreiro atacando com Espada!"
      }
    ],
    "reward": {
      "exp": 170,
      "coins": 85
    },
    "tests": [
      {
        "input": "",
        "expected": "Guerreiro atacando com Espada!",
        "description": "Câmara 7-1: Sobrescrita de Mensagem (Override)"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string classe",
        "string arma",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq7_2",
    "title": "Câmara 7-2: Subclasse Mago com Habilidade Arcana",
    "difficulty": "medium",
    "chapterId": 7,
    "description": "Declare tipoInimigo como 'Mago' e magia como 'Bola de Fogo'. Emita no Console: 'Mago conjurando Bola de Fogo!'.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure tipoInimigo e magia e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoInimigo = \"Mago\";\n        string magia = \"Bola de Fogo\";\n        Debug.Log(tipoInimigo + \" conjurando \" + magia + \"!\");\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Mago conjurando Bola de Fogo!"
      }
    ],
    "reward": {
      "exp": 170,
      "coins": 85
    },
    "tests": [
      {
        "input": "",
        "expected": "Mago conjurando Bola de Fogo!",
        "description": "Câmara 7-2: Subclasse Mago com Habilidade Arcana"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "tipoInimigo",
        "magia",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq7_3",
    "title": "Câmara 7-3: Chamada de Método Base",
    "difficulty": "medium",
    "chapterId": 7,
    "description": "Declare string fase1 = 'Base: Inicializado'; e string fase2 = 'Derivado: Equipamento Carregado';. Emita ambas em linhas separadas no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare fase1 e fase2 e imprima\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string fase1 = \"Base: Inicializado\";\n        string fase2 = \"Derivado: Equipamento Carregado\";\n        Debug.Log(fase1);\n        Debug.Log(fase2);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Base: Inicializado\nDerivado: Equipamento Carregado"
      }
    ],
    "reward": {
      "exp": 170,
      "coins": 85
    },
    "tests": [
      {
        "input": "",
        "expected": "Base: Inicializado\nDerivado: Equipamento Carregado",
        "description": "Câmara 7-3: Chamada de Método Base"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string fase1",
        "string fase2",
        "Debug.Log"
      ]
    }
  },
  {
    "id": "sq7_4",
    "title": "Câmara 7-4: Cálculo de Armadura Polimórfico",
    "difficulty": "medium",
    "chapterId": 7,
    "description": "Declare o danoRecebido como 50 e a reducaoArmadura como 15. Calcule o danoReal subtraindo a redução do dano e emita 'Dano Sofrido: ' + danoReal.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o dano considerando a armadura\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoRecebido = 50;\n        int reducaoArmadura = 15;\n        int danoReal = danoRecebido - reducaoArmadura;\n        Debug.Log(\"Dano Sofrido: \" + danoReal);\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Dano Sofrido: 35"
      }
    ],
    "reward": {
      "exp": 170,
      "coins": 85
    },
    "tests": [
      {
        "input": "",
        "expected": "Dano Sofrido: 35",
        "description": "Câmara 7-4: Cálculo de Armadura Polimórfico"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "danoRecebido",
        "reducaoArmadura",
        "danoReal",
        "-"
      ]
    }
  },
  {
    "id": "sq7_5",
    "title": "Câmara 7-5: Lista Polimórfica de Ações",
    "difficulty": "medium",
    "chapterId": 7,
    "description": "Crie um array com duas ações de combate: 'Arqueiro Dispara' e 'Guerreiro Golpeia'. Itere pelo array exibindo cada ação no Console.",
    "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
    "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Percorra o array de acoes\n    }\n}",
    "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] acoes = new string[] { \"Arqueiro Dispara\", \"Guerreiro Golpeia\" };\n        for (int i = 0; i < acoes.Length; i++)\n        {\n            Debug.Log(\"Acao: \" + acoes[i]);\n        }\n    }\n}",
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Acao: Arqueiro Dispara\nAcao: Guerreiro Golpeia"
      }
    ],
    "reward": {
      "exp": 170,
      "coins": 85
    },
    "tests": [
      {
        "input": "",
        "expected": "Acao: Arqueiro Dispara\nAcao: Guerreiro Golpeia",
        "description": "Câmara 7-5: Lista Polimórfica de Ações"
      }
    ],
    "validationRules": {
      "requiredPatterns": [
        "string[] acoes",
        "for",
        "acoes.Length"
      ]
    }
  }
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_07 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_07 = CSHARP_ABYSS_FLOOR_07;
}
