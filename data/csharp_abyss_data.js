/**
 * GUILDCODE — C# Unity Abyss Chambers Data (38 Andares / 190 Câmaras)
 * Alinhado 1:1 com os 38 Capítulos Oficiais de C# e Unity 6.5.
 * Dificuldade Mediana por Andar focada em Lógica de Game Development.
 */
const CSHARP_SIDE_QUESTS = {
  "csharp_ch0": [
    {
      "id": "sq0_1",
      "title": "Câmara 0-1: Primeiro Log de Vida",
      "difficulty": "medium",
      "chapterId": 0,
      "description": "Declare no método Start uma variável inteira para armazenar a vida inicializada com 100 pontos. Em seguida, utilize Debug.Log para emitir no Console o texto de identificação concatenado com a vida.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare int vida = 100;\n        \n        // 2. Emita no Console: Vida: 100\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        Debug.Log(\"Vida: \" + vida);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Vida: 100"
        }
      ],
      "reward": {
        "exp": 100,
        "coins": 50
      },
      "tests": [
        {
          "input": "",
          "expected": "Vida: 100",
          "description": "Câmara 0-1: Primeiro Log de Vida"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int vida",
          "vida",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq0_2",
      "title": "Câmara 0-2: Velocidade Flutuante",
      "difficulty": "medium",
      "chapterId": 0,
      "description": "Configure o personagem declarando a variável string heroi com 'Kael' e a variável float velocidade com 7.5f (com sufixo f). Emita ambos em linhas separadas no Console.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare heroi e velocidade (7.5f)\n        \n        // Imprima os dois valores\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = \"Kael\";\n        float velocidade = 7.5f;\n        Debug.Log(\"Heroi: \" + heroi);\n        Debug.Log(\"Velocidade: \" + velocidade);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Heroi: Kael\nVelocidade: 7.5"
        }
      ],
      "reward": {
        "exp": 100,
        "coins": 50
      },
      "tests": [
        {
          "input": "",
          "expected": "Heroi: Kael\nVelocidade: 7.5",
          "description": "Câmara 0-2: Velocidade Flutuante"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float velocidade",
          "7.5f",
          "heroi",
          "Kael"
        ]
      }
    },
    {
      "id": "sq0_3",
      "title": "Câmara 0-3: Cálculo de Dano Total",
      "difficulty": "medium",
      "chapterId": 0,
      "description": "Declare as variáveis inteiras danoBase valendo 40 e multiplicador valendo 2, além de um bônus flutuante bonus valendo 5.5f. Calcule o danoTotal com (danoBase * multiplicador) + bonus e exiba no Console.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare danoBase, multiplicador e bonus\n        \n        // Calcule danoTotal e imprima com Debug.Log\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 40;\n        int multiplicador = 2;\n        float bonus = 5.5f;\n        float danoTotal = (danoBase * multiplicador) + bonus;\n        Debug.Log(\"Dano Total: \" + danoTotal);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Dano Total: 85.5"
        }
      ],
      "reward": {
        "exp": 100,
        "coins": 50
      },
      "tests": [
        {
          "input": "",
          "expected": "Dano Total: 85.5",
          "description": "Câmara 0-3: Cálculo de Dano Total"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "danoBase",
          "multiplicador",
          "bonus",
          "danoTotal",
          "*"
        ]
      }
    },
    {
      "id": "sq0_4",
      "title": "Câmara 0-4: Prontidão Booleana",
      "difficulty": "medium",
      "chapterId": 0,
      "description": "Declare a variável booleana estaPronto valendo true e a variável caractere simbolo valendo 'G'. Imprima o estado de prontidão e a classe no Console.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare estaPronto e simbolo\n        \n        // Emita no Console\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaPronto = true;\n        char simbolo = 'G';\n        Debug.Log(\"Pronto: \" + estaPronto + \" | Classe: \" + simbolo);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pronto: True | Classe: G"
        }
      ],
      "reward": {
        "exp": 100,
        "coins": 50
      },
      "tests": [
        {
          "input": "",
          "expected": "Pronto: True | Classe: G",
          "description": "Câmara 0-4: Prontidão Booleana"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool estaPronto",
          "char simbolo",
          "true",
          "'G'"
        ]
      }
    },
    {
      "id": "sq0_5",
      "title": "Câmara 0-5: Constante de Gravidade",
      "difficulty": "medium",
      "chapterId": 0,
      "description": "Declare a constante flutuante <code>const float GRAVIDADE = -10.0f;</code> e a variável inteira <code>int massa = 10;</code>. Em seguida, calcule a intensidade positiva da força peso declarando a variável <code>float peso = massa * 10.0f;</code> (ou <code>massa * -GRAVIDADE;</code>) e exiba no Console exatamente: <code>Gravidade: -10 | Peso: 100</code>.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare a constante GRAVIDADE e a variavel massa\n        \n        // 2. Declare float peso = massa * 10.0f; (ou massa * -GRAVIDADE;)\n        \n        // 3. Imprima: Gravidade: -10 | Peso: 100\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        const float GRAVIDADE = -10.0f;\n        int massa = 10;\n        float peso = massa * 10.0f;\n        Debug.Log(\"Gravidade: \" + GRAVIDADE + \" | Peso: \" + peso);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Gravidade: -10 | Peso: 100"
        }
      ],
      "reward": {
        "exp": 100,
        "coins": 50
      },
      "tests": [
        {
          "input": "",
          "expected": "Gravidade: -10 | Peso: 100",
          "description": "Câmara 0-5: Constante de Gravidade"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "const float GRAVIDADE",
          "-10.0f",
          "massa",
          "peso",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch1": [
    {
      "id": "sq1_1",
      "title": "Câmara 1-1: Dano Sofrido com Operador Composto",
      "difficulty": "medium",
      "chapterId": 1,
      "description": "Declare a variável inteira vida com 100 pontos e danoSofrido com 35 pontos. Aplique o operador de subtração composta (-=) para atualizar a vida e exiba a Vida Restante no Console.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        // Aplique -= e exiba: Vida Restante: 65\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        vida -= danoSofrido;\n        Debug.Log(\"Vida Restante: \" + vida);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Vida Restante: 65"
        }
      ],
      "reward": {
        "exp": 110,
        "coins": 55
      },
      "tests": [
        {
          "input": "",
          "expected": "Vida Restante: 65",
          "description": "Câmara 1-1: Dano Sofrido com Operador Composto"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int vida",
          "vida -=",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq1_2",
      "title": "Câmara 1-2: Média de Duas Notas",
      "difficulty": "medium",
      "chapterId": 1,
      "description": "Calcule a média aritmética de duas partidas: declare as notas inteiras p1 com 8 e p2 com 6. Calcule a média flutuante dividindo a soma por 2.0f e imprima no Console.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        // Calcule a media flutuante e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        float media = (p1 + p2) / 2.0f;\n        Debug.Log(\"Media: \" + media);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Media: 7"
        }
      ],
      "reward": {
        "exp": 110,
        "coins": 55
      },
      "tests": [
        {
          "input": "",
          "expected": "Media: 7",
          "description": "Câmara 1-2: Média de Duas Notas"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "p1",
          "p2",
          "media",
          "/"
        ]
      }
    },
    {
      "id": "sq1_3",
      "title": "Câmara 1-3: Controle de Turnos com Módulo (%)",
      "difficulty": "medium",
      "chapterId": 1,
      "description": "Declare a variável inteira frameAtual com 17 e ciclo com 4. Calcule o resto frameAtual % ciclo e exiba o Índice do Ciclo no Console.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        // Calcule o resto e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        int indice = frameAtual % ciclo;\n        Debug.Log(\"Indice do Ciclo: \" + indice);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Indice do Ciclo: 1"
        }
      ],
      "reward": {
        "exp": 110,
        "coins": 55
      },
      "tests": [
        {
          "input": "",
          "expected": "Indice do Ciclo: 1",
          "description": "Câmara 1-3: Controle de Turnos com Módulo (%)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "frameAtual",
          "ciclo",
          "%",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq1_4",
      "title": "Câmara 1-4: Combinação Lógica com E (&&)",
      "difficulty": "medium",
      "chapterId": 1,
      "description": "Declare o nível inteiro nivel com 15 e a booleana temChave com true. Crie a booleana podeAbrir avaliando se nivel >= 10 E temChave é verdadeiro, exibindo o status de Acesso Permitido.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        // Avalie com && e imprima: Acesso Permitido: True\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        bool podeAbrir = nivel >= 10 && temChave;\n        Debug.Log(\"Acesso Permitido: \" + podeAbrir);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Acesso Permitido: True"
        }
      ],
      "reward": {
        "exp": 110,
        "coins": 55
      },
      "tests": [
        {
          "input": "",
          "expected": "Acesso Permitido: True",
          "description": "Câmara 1-4: Combinação Lógica com E (&&)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "nivel",
          "temChave",
          "&&",
          "podeAbrir"
        ]
      }
    },
    {
      "id": "sq1_5",
      "title": "Câmara 1-5: Negação Lógica com OU (||)",
      "difficulty": "medium",
      "chapterId": 1,
      "description": "Declare a booleana temEscudo valendo false e estaInvisivel valendo true. Crie a booleana protegido avaliando se temEscudo OU estaInvisivel é verdadeiro, exibindo o status de Protegido.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        // Avalie com || e imprima: Protegido: True\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        bool protegido = temEscudo || estaInvisivel;\n        Debug.Log(\"Protegido: \" + protegido);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Protegido: True"
        }
      ],
      "reward": {
        "exp": 110,
        "coins": 55
      },
      "tests": [
        {
          "input": "",
          "expected": "Protegido: True",
          "description": "Câmara 1-5: Negação Lógica com OU (||)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "temEscudo",
          "estaInvisivel",
          "||",
          "protegido"
        ]
      }
    }
  ],
  "csharp_ch2": [
    {
      "id": "sq2_1",
      "title": "Câmara 2-1: Checagem de Sobrevivência",
      "difficulty": "medium",
      "chapterId": 2,
      "description": "Declare a variável inteira vida com 0 pontos. Utilize uma estrutura if/else: se vida > 0 exiba 'Status: Ativo', senão exiba 'Status: Game Over'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 0;\n        // Cheque com if/else e exiba o status\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 0;\n        if (vida > 0)\n        {\n            Debug.Log(\"Status: Ativo\");\n        }\n        else\n        {\n            Debug.Log(\"Status: Game Over\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Status: Game Over"
        }
      ],
      "reward": {
        "exp": 120,
        "coins": 60
      },
      "tests": [
        {
          "input": "",
          "expected": "Status: Game Over",
          "description": "Câmara 2-1: Checagem de Sobrevivência"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int vida",
          "if",
          "else",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq2_2",
      "title": "Câmara 2-2: Classificação por Dificuldade",
      "difficulty": "medium",
      "chapterId": 2,
      "description": "Declare a variável inteira nivel com 12. Se nivel < 10 exiba 'Dificuldade: Normal', caso contrário exiba 'Dificuldade: Heroica'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 12;\n        // Avalie o nivel com if/else\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 12;\n        if (nivel < 10)\n        {\n            Debug.Log(\"Dificuldade: Normal\");\n        }\n        else\n        {\n            Debug.Log(\"Dificuldade: Heroica\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Dificuldade: Heroica"
        }
      ],
      "reward": {
        "exp": 120,
        "coins": 60
      },
      "tests": [
        {
          "input": "",
          "expected": "Dificuldade: Heroica",
          "description": "Câmara 2-2: Classificação por Dificuldade"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int nivel",
          "if",
          "else",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq2_3",
      "title": "Câmara 2-3: Ramo Múltiplo com Else If",
      "difficulty": "medium",
      "chapterId": 2,
      "description": "Declare a variável inteira mana com 30. Use if/else if/else: se mana >= 50 exiba 'Magia: Suprema', senão se mana >= 25 exiba 'Magia: Basica', senão exiba 'Sem Mana'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 30;\n        // Aplique if, else if e else\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 30;\n        if (mana >= 50)\n        {\n            Debug.Log(\"Magia: Suprema\");\n        }\n        else if (mana >= 25)\n        {\n            Debug.Log(\"Magia: Basica\");\n        }\n        else\n        {\n            Debug.Log(\"Sem Mana\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Magia: Basica"
        }
      ],
      "reward": {
        "exp": 120,
        "coins": 60
      },
      "tests": [
        {
          "input": "",
          "expected": "Magia: Basica",
          "description": "Câmara 2-3: Ramo Múltiplo com Else If"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int mana",
          "else if",
          "if",
          "else"
        ]
      }
    },
    {
      "id": "sq2_4",
      "title": "Câmara 2-4: Seleção com Switch Case",
      "difficulty": "medium",
      "chapterId": 2,
      "description": "Declare a variável inteira idClasse valendo 2. Utilize a estrutura switch com cases 1 ('Guerreiro'), 2 ('Mago') e default ('Desconhecido'), emitindo a classe selecionada.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int idClasse = 2;\n        // Use switch para avaliar idClasse\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int idClasse = 2;\n        switch (idClasse)\n        {\n            case 1:\n                Debug.Log(\"Classe: Guerreiro\");\n                break;\n            case 2:\n                Debug.Log(\"Classe: Mago\");\n                break;\n            default:\n                Debug.Log(\"Classe: Desconhecido\");\n                break;\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Classe: Mago"
        }
      ],
      "reward": {
        "exp": 120,
        "coins": 60
      },
      "tests": [
        {
          "input": "",
          "expected": "Classe: Mago",
          "description": "Câmara 2-4: Seleção com Switch Case"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "switch",
          "case 1:",
          "case 2:",
          "break;"
        ]
      }
    },
    {
      "id": "sq2_5",
      "title": "Câmara 2-5: Operador Ternário",
      "difficulty": "medium",
      "chapterId": 2,
      "description": "Declare a variável inteira stamina valendo 60. Utilize o operador ternário (? :) para definir a string estado como (stamina >= 50 ? 'Descansado' : 'Exausto') e imprima o Estado no Console.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int stamina = 60;\n        // Use o operador ternario e exiba: Estado: Descansado\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int stamina = 60;\n        string estado = (stamina >= 50) ? \"Descansado\" : \"Exausto\";\n        Debug.Log(\"Estado: \" + estado);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Estado: Descansado"
        }
      ],
      "reward": {
        "exp": 120,
        "coins": 60
      },
      "tests": [
        {
          "input": "",
          "expected": "Estado: Descansado",
          "description": "Câmara 2-5: Operador Ternário"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "stamina",
          "?",
          ":",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch3": [
    {
      "id": "sq3_1",
      "title": "Câmara 3-1: Spawn Sequencial com For",
      "difficulty": "medium",
      "chapterId": 3,
      "description": "Dentro de Start, construa um laço for que itere de 1 até 3 emitindo as mensagens no Console com 'Inimigo #' + i + ' gerado'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Construa o laco for de 1 a 3\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Inimigo #\" + i + \" gerado\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado"
        }
      ],
      "reward": {
        "exp": 130,
        "coins": 65
      },
      "tests": [
        {
          "input": "",
          "expected": "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado",
          "description": "Câmara 3-1: Spawn Sequencial com For"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "for",
          "<=",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq3_2",
      "title": "Câmara 3-2: Contagem com While",
      "difficulty": "medium",
      "chapterId": 3,
      "description": "Declare a variável inteira timer com 3. Crie um laço while que execute enquanto timer > 0, imprimindo 'T-' + timer e decrementando a cada passo.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int timer = 3;\n        // Faca o laco while regressivo\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int timer = 3;\n        while (timer > 0)\n        {\n            Debug.Log(\"T-\" + timer);\n            timer--;\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "T-3\nT-2\nT-1"
        }
      ],
      "reward": {
        "exp": 130,
        "coins": 65
      },
      "tests": [
        {
          "input": "",
          "expected": "T-3\nT-2\nT-1",
          "description": "Câmara 3-2: Contagem com While"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int timer",
          "while",
          "timer > 0",
          "timer--"
        ]
      }
    },
    {
      "id": "sq3_3",
      "title": "Câmara 3-3: Somatório de Pontos",
      "difficulty": "medium",
      "chapterId": 3,
      "description": "Declare totalPontos inicializado com 0. Faça um for com i de 1 até 4 somando i * 10 a totalPontos e exiba no final 'Total Acumulado: ' + totalPontos.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalPontos = 0;\n        // Some os pontos no laco e imprima o total\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalPontos = 0;\n        for (int i = 1; i <= 4; i++)\n        {\n            totalPontos += i * 10;\n        }\n        Debug.Log(\"Total Acumulado: \" + totalPontos);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Total Acumulado: 100"
        }
      ],
      "reward": {
        "exp": 130,
        "coins": 65
      },
      "tests": [
        {
          "input": "",
          "expected": "Total Acumulado: 100",
          "description": "Câmara 3-3: Somatório de Pontos"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "totalPontos",
          "for",
          "+=",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq3_4",
      "title": "Câmara 3-4: Filtro de Pares com Continue",
      "difficulty": "medium",
      "chapterId": 3,
      "description": "Faça um laço for de 1 até 5. Se o resto da divisão por 2 for diferente de zero (i % 2 != 0), use continue para ignorar. Imprima os números pares encontrados com 'Par: ' + i.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Itere de 1 a 5 usando continue para impares\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 5; i++)\n        {\n            if (i % 2 != 0) continue;\n            Debug.Log(\"Par: \" + i);\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Par: 2\nPar: 4"
        }
      ],
      "reward": {
        "exp": 130,
        "coins": 65
      },
      "tests": [
        {
          "input": "",
          "expected": "Par: 2\nPar: 4",
          "description": "Câmara 3-4: Filtro de Pares com Continue"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "for",
          "continue",
          "%",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq3_5",
      "title": "Câmara 3-5: Interrupção com Break",
      "difficulty": "medium",
      "chapterId": 3,
      "description": "Simule a interrupção ao encontrar o alvo: itere de 1 até 10 com for. Quando i == 3, exiba 'Alvo Encontrado no passo 3' e execute break para interromper o laço.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Procure o alvo no laco e interrompa com break\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 10; i++)\n        {\n            if (i == 3)\n            {\n                Debug.Log(\"Alvo Encontrado no passo 3\");\n                break;\n            }\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alvo Encontrado no passo 3"
        }
      ],
      "reward": {
        "exp": 130,
        "coins": 65
      },
      "tests": [
        {
          "input": "",
          "expected": "Alvo Encontrado no passo 3",
          "description": "Câmara 3-5: Interrupção com Break"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "for",
          "break",
          "i == 3",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch4": [
    {
      "id": "sq4_1",
      "title": "Câmara 4-1: Método Void de Log",
      "difficulty": "medium",
      "chapterId": 4,
      "description": "Defina o método auxiliar void ExibirBoasVindas() que emite 'Bem-vindo ao Unity 6.5'. Invoque o método dentro de Start().",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame ExibirBoasVindas()\n    }\n    \n    // Crie o metodo void ExibirBoasVindas\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ExibirBoasVindas();\n    }\n\n    void ExibirBoasVindas()\n    {\n        Debug.Log(\"Bem-vindo ao Unity 6.5\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Bem-vindo ao Unity 6.5"
        }
      ],
      "reward": {
        "exp": 140,
        "coins": 70
      },
      "tests": [
        {
          "input": "",
          "expected": "Bem-vindo ao Unity 6.5",
          "description": "Câmara 4-1: Método Void de Log"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "void ExibirBoasVindas()",
          "ExibirBoasVindas()",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq4_2",
      "title": "Câmara 4-2: Função com Retorno Inteiro",
      "difficulty": "medium",
      "chapterId": 4,
      "description": "Crie a função int Dobrar(int valor) que retorna valor * 2. Em Start, declare int res = Dobrar(25); e imprima 'Resultado: ' + res.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame Dobrar com 25 e imprima o resultado\n    }\n    \n    // Crie o metodo Dobrar\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int res = Dobrar(25);\n        Debug.Log(\"Resultado: \" + res);\n    }\n\n    int Dobrar(int valor)\n    {\n        return valor * 2;\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Resultado: 50"
        }
      ],
      "reward": {
        "exp": 140,
        "coins": 70
      },
      "tests": [
        {
          "input": "",
          "expected": "Resultado: 50",
          "description": "Câmara 4-2: Função com Retorno Inteiro"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int Dobrar(int valor)",
          "return valor * 2",
          "Dobrar(25)"
        ]
      }
    },
    {
      "id": "sq4_3",
      "title": "Câmara 4-3: Função de Cálculo de Dano Crítico",
      "difficulty": "medium",
      "chapterId": 4,
      "description": "Crie a função int CalcularCritico(int dano, int multiplicador) que retorna dano * multiplicador. No Start, chame com (50, 3) e exiba 'Dano Critico: ' + resultado.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Invoque CalcularCritico e imprima\n    }\n    \n    // Defina CalcularCritico\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoFinal = CalcularCritico(50, 3);\n        Debug.Log(\"Dano Critico: \" + danoFinal);\n    }\n\n    int CalcularCritico(int dano, int multiplicador)\n    {\n        return dano * multiplicador;\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Dano Critico: 150"
        }
      ],
      "reward": {
        "exp": 140,
        "coins": 70
      },
      "tests": [
        {
          "input": "",
          "expected": "Dano Critico: 150",
          "description": "Câmara 4-3: Função de Cálculo de Dano Crítico"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int CalcularCritico(int dano, int multiplicador)",
          "CalcularCritico(50, 3)"
        ]
      }
    },
    {
      "id": "sq4_4",
      "title": "Câmara 4-4: Função Booleana de Verificação",
      "difficulty": "medium",
      "chapterId": 4,
      "description": "Crie a função bool EstaVivo(int vidaAtual) que retorna vidaAtual > 0. No Start, teste com 10 pontos e exiba 'Heroi Vivo: ' + EstaVivo(10).",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Teste EstaVivo com 10 e imprima\n    }\n    \n    // Defina EstaVivo\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool vivo = EstaVivo(10);\n        Debug.Log(\"Heroi Vivo: \" + vivo);\n    }\n\n    bool EstaVivo(int vidaAtual)\n    {\n        return vidaAtual > 0;\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Heroi Vivo: True"
        }
      ],
      "reward": {
        "exp": 140,
        "coins": 70
      },
      "tests": [
        {
          "input": "",
          "expected": "Heroi Vivo: True",
          "description": "Câmara 4-4: Função Booleana de Verificação"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool EstaVivo(int vidaAtual)",
          "return vidaAtual > 0",
          "EstaVivo(10)"
        ]
      }
    },
    {
      "id": "sq4_5",
      "title": "Câmara 4-5: Formatação de Nome de Jogador",
      "difficulty": "medium",
      "chapterId": 4,
      "description": "Crie a função string FormatarNome(string nome, int nivel) que retorna 'Player: ' + nome + ' [Lv ' + nivel + ']'. No Start, chame com ('Arkan', 20) e exiba o resultado.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame FormatarNome e imprima\n    }\n    \n    // Defina FormatarNome\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string rotulo = FormatarNome(\"Arkan\", 20);\n        Debug.Log(rotulo);\n    }\n\n    string FormatarNome(string nome, int nivel)\n    {\n        return \"Player: \" + nome + \" [Lv \" + nivel + \"]\";\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Player: Arkan [Lv 20]"
        }
      ],
      "reward": {
        "exp": 140,
        "coins": 70
      },
      "tests": [
        {
          "input": "",
          "expected": "Player: Arkan [Lv 20]",
          "description": "Câmara 4-5: Formatação de Nome de Jogador"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string FormatarNome(string nome, int nivel)",
          "FormatarNome(\"Arkan\", 20)"
        ]
      }
    }
  ],
  "csharp_ch5": [
    {
      "id": "sq5_1",
      "title": "Câmara 5-1: Acesso a Elemento de Array",
      "difficulty": "medium",
      "chapterId": 5,
      "description": "Declare um array de strings itens com três nomes: 'Espada', 'Escudo' e 'Pocao'. Acesse o primeiro item pelo índice 0 e exiba 'Item Equipado: ' + itens[0].",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o array itens e exiba o primeiro item\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] itens = new string[] { \"Espada\", \"Escudo\", \"Pocao\" };\n        Debug.Log(\"Item Equipado: \" + itens[0]);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Item Equipado: Espada"
        }
      ],
      "reward": {
        "exp": 150,
        "coins": 75
      },
      "tests": [
        {
          "input": "",
          "expected": "Item Equipado: Espada",
          "description": "Câmara 5-1: Acesso a Elemento de Array"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string[] itens",
          "itens[0]",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq5_2",
      "title": "Câmara 5-2: Iteração em Array com Foreach",
      "difficulty": "medium",
      "chapterId": 5,
      "description": "Declare um array de inteiros pontuacoes com os valores { 10, 20, 30 }. Utilize um laço foreach para iterar e exibir cada pontuação no formato 'Pontos: ' + valor.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o array pontuacoes e percorra usando foreach\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int[] pontuacoes = new int[] { 10, 20, 30 };\n        foreach (int p in pontuacoes)\n        {\n            Debug.Log(\"Pontos: \" + p);\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pontos: 10\nPontos: 20\nPontos: 30"
        }
      ],
      "reward": {
        "exp": 150,
        "coins": 75
      },
      "tests": [
        {
          "input": "",
          "expected": "Pontos: 10\nPontos: 20\nPontos: 30",
          "description": "Câmara 5-2: Iteração em Array com Foreach"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int[] pontuacoes",
          "foreach",
          "in pontuacoes"
        ]
      }
    },
    {
      "id": "sq5_3",
      "title": "Câmara 5-3: Adicionando Elementos em List<T>",
      "difficulty": "medium",
      "chapterId": 5,
      "description": "Instancie uma lista dinâmica List<string> inventario = new List<string>();. Adicione 'Elmo' e 'Bota' usando .Add(). Exiba a contagem final no Console com 'Total de Itens: ' + inventario.Count.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie a lista, adicione os itens e imprima o Count\n    }\n}",
      "solution": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        List<string> inventario = new List<string>();\n        inventario.Add(\"Elmo\");\n        inventario.Add(\"Bota\");\n        Debug.Log(\"Total de Itens: \" + inventario.Count);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Total de Itens: 2"
        }
      ],
      "reward": {
        "exp": 150,
        "coins": 75
      },
      "tests": [
        {
          "input": "",
          "expected": "Total de Itens: 2",
          "description": "Câmara 5-3: Adicionando Elementos em List<T>"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "List<string> inventario",
          ".Add(",
          "inventario.Count"
        ]
      }
    },
    {
      "id": "sq5_4",
      "title": "Câmara 5-4: Remoção de Item de Lista",
      "difficulty": "medium",
      "chapterId": 5,
      "description": "Crie uma List<string> poderes com 'Fogo' e 'Gelo'. Remova 'Fogo' usando .Remove('Fogo'). Exiba no Console o poder restante na posição 0 com 'Poder Ativo: ' + poderes[0].",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie a lista, remova 'Fogo' e imprima o item restante\n    }\n}",
      "solution": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        List<string> poderes = new List<string>();\n        poderes.Add(\"Fogo\");\n        poderes.Add(\"Gelo\");\n        poderes.Remove(\"Fogo\");\n        Debug.Log(\"Poder Ativo: \" + poderes[0]);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Poder Ativo: Gelo"
        }
      ],
      "reward": {
        "exp": 150,
        "coins": 75
      },
      "tests": [
        {
          "input": "",
          "expected": "Poder Ativo: Gelo",
          "description": "Câmara 5-4: Remoção de Item de Lista"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "List<string> poderes",
          ".Remove(",
          "poderes[0]"
        ]
      }
    },
    {
      "id": "sq5_5",
      "title": "Câmara 5-5: Maior Valor em Array",
      "difficulty": "medium",
      "chapterId": 5,
      "description": "Declare um array de inteiros valores com { 15, 82, 43 }. Determine o maior valor e exiba 'Maior: ' + maior. (Dica: compare com if em um laço).",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int[] valores = new int[] { 15, 82, 43 };\n        // Encontre o maior valor e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int[] valores = new int[] { 15, 82, 43 };\n        int maior = valores[0];\n        for (int i = 1; i < valores.Length; i++)\n        {\n            if (valores[i] > maior) maior = valores[i];\n        }\n        Debug.Log(\"Maior: \" + maior);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Maior: 82"
        }
      ],
      "reward": {
        "exp": 150,
        "coins": 75
      },
      "tests": [
        {
          "input": "",
          "expected": "Maior: 82",
          "description": "Câmara 5-5: Maior Valor em Array"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int[] valores",
          "for",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch6": [
    {
      "id": "sq6_1",
      "title": "Câmara 6-1: Instanciação de Objeto Simples",
      "difficulty": "medium",
      "chapterId": 6,
      "description": "Simule a criação de um item de inventário: crie um objeto com nome 'Espada' e poder 45. Emita no Console: 'Item: Espada | Poder: 45'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o item e imprima seu status\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string itemNome = \"Espada\";\n        int itemPoder = 45;\n        Debug.Log(\"Item: \" + itemNome + \" | Poder: \" + itemPoder);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Item: Espada | Poder: 45"
        }
      ],
      "reward": {
        "exp": 160,
        "coins": 80
      },
      "tests": [
        {
          "input": "",
          "expected": "Item: Espada | Poder: 45",
          "description": "Câmara 6-1: Instanciação de Objeto Simples"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string itemNome",
          "int itemPoder",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq6_2",
      "title": "Câmara 6-2: Método Construtor e Inicialização",
      "difficulty": "medium",
      "chapterId": 6,
      "description": "Configure dois atributos de uma entidade: heroi 'Kael' e nivel 10. Emita no Console: 'Entidade: Kael | Nivel: 10'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Defina heroi e nivel e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = \"Kael\";\n        int nivel = 10;\n        Debug.Log(\"Entidade: \" + heroi + \" | Nivel: \" + nivel);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Entidade: Kael | Nivel: 10"
        }
      ],
      "reward": {
        "exp": 160,
        "coins": 80
      },
      "tests": [
        {
          "input": "",
          "expected": "Entidade: Kael | Nivel: 10",
          "description": "Câmara 6-2: Método Construtor e Inicialização"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "heroi",
          "nivel",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq6_3",
      "title": "Câmara 6-3: Encapsulamento com Propriedades Get/Set",
      "difficulty": "medium",
      "chapterId": 6,
      "description": "Simule a alteração de vida de uma entidade: inicie vidaMaxima com 100 e vidaAtual com 75. Emita no Console: 'Vida: 75/100'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure vidaMaxima e vidaAtual\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vidaMaxima = 100;\n        int vidaAtual = 75;\n        Debug.Log(\"Vida: \" + vidaAtual + \"/\" + vidaMaxima);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Vida: 75/100"
        }
      ],
      "reward": {
        "exp": 160,
        "coins": 80
      },
      "tests": [
        {
          "input": "",
          "expected": "Vida: 75/100",
          "description": "Câmara 6-3: Encapsulamento com Propriedades Get/Set"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int vidaMaxima",
          "int vidaAtual",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq6_4",
      "title": "Câmara 6-4: Método de Instância de Ataque",
      "difficulty": "medium",
      "chapterId": 6,
      "description": "Invoque uma rotina de combate de objeto: calcule o danoCausado aplicando um danoBase de 30 multiplicado por forca de 2. Emita no Console: 'Ataque Desferido: 60'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule danoCausado e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 30;\n        int forca = 2;\n        int danoCausado = danoBase * forca;\n        Debug.Log(\"Ataque Desferido: \" + danoCausado);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Ataque Desferido: 60"
        }
      ],
      "reward": {
        "exp": 160,
        "coins": 80
      },
      "tests": [
        {
          "input": "",
          "expected": "Ataque Desferido: 60",
          "description": "Câmara 6-4: Método de Instância de Ataque"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int danoBase",
          "int forca",
          "danoCausado",
          "*"
        ]
      }
    },
    {
      "id": "sq6_5",
      "title": "Câmara 6-5: Contagem de Instâncias",
      "difficulty": "medium",
      "chapterId": 6,
      "description": "Simule o rastreamento de entidades ativas na cena: inicie totalInimigos com 0, incremente duas vezes e emita 'Inimigos Ativos: ' + totalInimigos.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalInimigos = 0;\n        // Incremente duas vezes e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalInimigos = 0;\n        totalInimigos++;\n        totalInimigos++;\n        Debug.Log(\"Inimigos Ativos: \" + totalInimigos);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Inimigos Ativos: 2"
        }
      ],
      "reward": {
        "exp": 160,
        "coins": 80
      },
      "tests": [
        {
          "input": "",
          "expected": "Inimigos Ativos: 2",
          "description": "Câmara 6-5: Contagem de Instâncias"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "totalInimigos",
          "++",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch7": [
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
  ],
  "csharp_ch8": [
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
  ],
  "csharp_ch9": [
    {
      "id": "sq9_1",
      "title": "Câmara 9-1: Leitura de Posição Inicial",
      "difficulty": "medium",
      "chapterId": 9,
      "description": "Acesse as coordenadas de posição inicial do transform e emita no Console: 'Posicao X: ' + transform.position.x.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba a coordenada X da posicao\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Posicao X: \" + transform.position.x);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Posicao X: 0"
        }
      ],
      "reward": {
        "exp": 190,
        "coins": 95
      },
      "tests": [
        {
          "input": "",
          "expected": "Posicao X: 0",
          "description": "Câmara 9-1: Leitura de Posição Inicial"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "transform.position.x",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq9_2",
      "title": "Câmara 9-2: Deslocamento com Translate",
      "difficulty": "medium",
      "chapterId": 9,
      "description": "Simule um deslocamento: declare float vel = 5.0f e float dt = 0.016f. Calcule o deslocamento como vel * dt e emita 'Deslocamento: ' + deslocamento.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vel = 5.0f;\n        float dt = 0.016f;\n        // Calcule o deslocamento e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vel = 5.0f;\n        float dt = 0.016f;\n        float deslocamento = vel * dt;\n        Debug.Log(\"Deslocamento: \" + deslocamento);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Deslocamento: 0.08"
        }
      ],
      "reward": {
        "exp": 190,
        "coins": 95
      },
      "tests": [
        {
          "input": "",
          "expected": "Deslocamento: 0.08",
          "description": "Câmara 9-2: Deslocamento com Translate"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float vel",
          "float dt",
          "vel * dt",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq9_3",
      "title": "Câmara 9-3: Ajuste de Escala Local",
      "difficulty": "medium",
      "chapterId": 9,
      "description": "Simule a alteração da escala de um objeto: defina escalaX = 2.0f e escalaY = 2.0f. Emita no Console: 'Nova Escala: (2, 2)'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure as escalas e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float escalaX = 2.0f;\n        float escalaY = 2.0f;\n        Debug.Log(\"Nova Escala: (\" + escalaX + \", \" + escalaY + \")\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Nova Escala: (2, 2)"
        }
      ],
      "reward": {
        "exp": 190,
        "coins": 95
      },
      "tests": [
        {
          "input": "",
          "expected": "Nova Escala: (2, 2)",
          "description": "Câmara 9-3: Ajuste de Escala Local"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float escalaX",
          "float escalaY",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq9_4",
      "title": "Câmara 9-4: Rotação em Torno do Eixo Y",
      "difficulty": "medium",
      "chapterId": 9,
      "description": "Declare a velocidade de giro float velRotacao = 90.0f;. Emita no Console: 'Rotacao Y: ' + velRotacao + ' graus/s'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare velRotacao e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float velRotacao = 90.0f;\n        Debug.Log(\"Rotacao Y: \" + velRotacao + \" graus/s\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Rotacao Y: 90 graus/s"
        }
      ],
      "reward": {
        "exp": 190,
        "coins": 95
      },
      "tests": [
        {
          "input": "",
          "expected": "Rotacao Y: 90 graus/s",
          "description": "Câmara 9-4: Rotação em Torno do Eixo Y"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float velRotacao",
          "velRotacao",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq9_5",
      "title": "Câmara 9-5: Vetor Forward de Direção",
      "difficulty": "medium",
      "chapterId": 9,
      "description": "Obtenha a coordenada z do vetor direcional transform.forward. Emita no Console: 'Direcao Z: ' + transform.forward.z.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba o forward z\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Direcao Z: \" + transform.forward.z);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Direcao Z: 1"
        }
      ],
      "reward": {
        "exp": 190,
        "coins": 95
      },
      "tests": [
        {
          "input": "",
          "expected": "Direcao Z: 1",
          "description": "Câmara 9-5: Vetor Forward de Direção"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "transform.forward.z",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch10": [
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
  ],
  "csharp_ch11": [
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
  ],
  "csharp_ch12": [
    {
      "id": "sq12_1",
      "title": "Câmara 12-1: Mapeamento de Ação de Pulo",
      "difficulty": "medium",
      "chapterId": 12,
      "description": "Simule a leitura de uma InputAction chamada 'Pular': declare bool acaoDisparada = true;. Se for verdadeira, emita 'InputAction: Pulo Registrado'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a acao de pulo\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool acaoDisparada = true;\n        if (acaoDisparada)\n        {\n            Debug.Log(\"InputAction: Pulo Registrado\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "InputAction: Pulo Registrado"
        }
      ],
      "reward": {
        "exp": 220,
        "coins": 110
      },
      "tests": [
        {
          "input": "",
          "expected": "InputAction: Pulo Registrado",
          "description": "Câmara 12-1: Mapeamento de Ação de Pulo"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool acaoDisparada",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq12_2",
      "title": "Câmara 12-2: Leitura de Vetor de Movimento 2D",
      "difficulty": "medium",
      "chapterId": 12,
      "description": "Simule o valor de um joystick ou WASD: declare float horizontal = 1.0f e float vertical = 0.0f. Emita no Console: 'Movimento: (1, 0)'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure horizontal e vertical e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float horizontal = 1.0f;\n        float vertical = 0.0f;\n        Debug.Log(\"Movimento: (\" + horizontal + \", \" + vertical + \")\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Movimento: (1, 0)"
        }
      ],
      "reward": {
        "exp": 220,
        "coins": 110
      },
      "tests": [
        {
          "input": "",
          "expected": "Movimento: (1, 0)",
          "description": "Câmara 12-2: Leitura de Vetor de Movimento 2D"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float horizontal",
          "float vertical",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq12_3",
      "title": "Câmara 12-3: Ação de Interação com Objeto",
      "difficulty": "medium",
      "chapterId": 12,
      "description": "Declare a string botaoInteragir = 'E' e a distância float dist = 1.5f. Se dist <= 2.0f, emita 'Pressione [' + botaoInteragir + '] para Interagir'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide a distancia e emita o prompt\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string botaoInteragir = \"E\";\n        float dist = 1.5f;\n        if (dist <= 2.0f)\n        {\n            Debug.Log(\"Pressione [\" + botaoInteragir + \"] para Interagir\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pressione [E] para Interagir"
        }
      ],
      "reward": {
        "exp": 220,
        "coins": 110
      },
      "tests": [
        {
          "input": "",
          "expected": "Pressione [E] para Interagir",
          "description": "Câmara 12-3: Ação de Interação com Objeto"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "botaoInteragir",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq12_4",
      "title": "Câmara 12-4: Habilitação de Mapa de Ações",
      "difficulty": "medium",
      "chapterId": 12,
      "description": "Simule a ativação do Action Map 'Gameplay': declare string mapaAtivo = 'Gameplay';. Emita no Console: 'Mapa Ativado: Gameplay'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Ative o mapa e emita no Console\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string mapaAtivo = \"Gameplay\";\n        Debug.Log(\"Mapa Ativado: \" + mapaAtivo);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Mapa Ativado: Gameplay"
        }
      ],
      "reward": {
        "exp": 220,
        "coins": 110
      },
      "tests": [
        {
          "input": "",
          "expected": "Mapa Ativado: Gameplay",
          "description": "Câmara 12-4: Habilitação de Mapa de Ações"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string mapaAtivo",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq12_5",
      "title": "Câmara 12-5: Troca Dinâmica para Mapa UI",
      "difficulty": "medium",
      "chapterId": 12,
      "description": "Quando o jogo é pausado, o mapa muda para UI: declare bool pausado = true. Se pausado, defina mapa = 'UI' e emita 'Contexto Atual: UI'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Troque o contexto para UI se pausado\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool pausado = true;\n        if (pausado)\n        {\n            string mapa = \"UI\";\n            Debug.Log(\"Contexto Atual: \" + mapa);\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Contexto Atual: UI"
        }
      ],
      "reward": {
        "exp": 220,
        "coins": 110
      },
      "tests": [
        {
          "input": "",
          "expected": "Contexto Atual: UI",
          "description": "Câmara 12-5: Troca Dinâmica para Mapa UI"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool pausado",
          "if",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch13": [
    {
      "id": "sq13_1",
      "title": "Câmara 13-1: Ponto no Espaço Tridimensional",
      "difficulty": "medium",
      "chapterId": 13,
      "description": "Declare um Vector3 pos = new Vector3(2, 5, 8);. Imprima no Console a coordenada X com 'Coord X: ' + pos.x.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare pos e emita Coord X\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pos = new Vector3(2, 5, 8);\n        Debug.Log(\"Coord X: \" + pos.x);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Coord X: 2"
        }
      ],
      "reward": {
        "exp": 230,
        "coins": 115
      },
      "tests": [
        {
          "input": "",
          "expected": "Coord X: 2",
          "description": "Câmara 13-1: Ponto no Espaço Tridimensional"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3",
          "pos.x",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq13_2",
      "title": "Câmara 13-2: Origem do Espaço Mundial (Vector3.zero)",
      "difficulty": "medium",
      "chapterId": 13,
      "description": "Obtenha a coordenada Y do vetor central Vector3.zero. Emita no Console: 'Origem Y: ' + Vector3.zero.y.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba a coordenada Y de Vector3.zero\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Origem Y: \" + Vector3.zero.y);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Origem Y: 0"
        }
      ],
      "reward": {
        "exp": 230,
        "coins": 115
      },
      "tests": [
        {
          "input": "",
          "expected": "Origem Y: 0",
          "description": "Câmara 13-2: Origem do Espaço Mundial (Vector3.zero)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3.zero",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq13_3",
      "title": "Câmara 13-3: Conversão de Espaço Local para Global",
      "difficulty": "medium",
      "chapterId": 13,
      "description": "Simule a translação de uma coordenada local para mundial somando um deslocamento: posMundial = posPai + offset. Com pai em 10 e offset em 3, emita 'Posicao Mundial: 13'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule e imprima posMundial\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int posPai = 10;\n        int offset = 3;\n        int posMundial = posPai + offset;\n        Debug.Log(\"Posicao Mundial: \" + posMundial);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Posicao Mundial: 13"
        }
      ],
      "reward": {
        "exp": 230,
        "coins": 115
      },
      "tests": [
        {
          "input": "",
          "expected": "Posicao Mundial: 13",
          "description": "Câmara 13-3: Conversão de Espaço Local para Global"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int posPai",
          "int offset",
          "posMundial",
          "+"
        ]
      }
    },
    {
      "id": "sq13_4",
      "title": "Câmara 13-4: Identificação dos Três Eixos",
      "difficulty": "medium",
      "chapterId": 13,
      "description": "Declare Vector3 eixos = new Vector3(1, 0, 0);. Se eixos.x == 1, emita 'Eixo Selecionado: X (Largura)'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare eixos e avalie\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 eixos = new Vector3(1, 0, 0);\n        if (eixos.x == 1)\n        {\n            Debug.Log(\"Eixo Selecionado: X (Largura)\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Eixo Selecionado: X (Largura)"
        }
      ],
      "reward": {
        "exp": 230,
        "coins": 115
      },
      "tests": [
        {
          "input": "",
          "expected": "Eixo Selecionado: X (Largura)",
          "description": "Câmara 13-4: Identificação dos Três Eixos"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "new Vector3(1, 0, 0)",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq13_5",
      "title": "Câmara 13-5: Espaço Unitário (Vector3.one)",
      "difficulty": "medium",
      "chapterId": 13,
      "description": "Declare Vector3 escala = Vector3.one;. Emita no Console: 'Escala Inicial: ' + escala.x + ', ' + escala.y + ', ' + escala.z.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare escala com Vector3.one e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 escala = Vector3.one;\n        Debug.Log(\"Escala Inicial: \" + escala.x + \", \" + escala.y + \", \" + escala.z);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Escala Inicial: 1, 1, 1"
        }
      ],
      "reward": {
        "exp": 230,
        "coins": 115
      },
      "tests": [
        {
          "input": "",
          "expected": "Escala Inicial: 1, 1, 1",
          "description": "Câmara 13-5: Espaço Unitário (Vector3.one)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3.one",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch14": [
    {
      "id": "sq14_1",
      "title": "Câmara 14-1: Cálculo de Distância Euclidiana",
      "difficulty": "medium",
      "chapterId": 14,
      "description": "Declare Vector3 a = new Vector3(0, 0, 0); e Vector3 b = new Vector3(3, 4, 0);. Calcule a distância com Vector3.Distance(a, b) e exiba 'Distancia: ' + dist.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a distancia entre a e b\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 a = new Vector3(0, 0, 0);\n        Vector3 b = new Vector3(3, 4, 0);\n        float dist = Vector3.Distance(a, b);\n        Debug.Log(\"Distancia: \" + dist);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Distancia: 5"
        }
      ],
      "reward": {
        "exp": 240,
        "coins": 120
      },
      "tests": [
        {
          "input": "",
          "expected": "Distancia: 5",
          "description": "Câmara 14-1: Cálculo de Distância Euclidiana"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3.Distance",
          "new Vector3",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq14_2",
      "title": "Câmara 14-2: Normalização de Vetor",
      "difficulty": "medium",
      "chapterId": 14,
      "description": "Declare Vector3 dir = new Vector3(5, 0, 0);. Calcule o vetor normalizado com Vector3.Normalize(dir) e exiba 'Dir X: ' + norm.x.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Normalize dir e exiba norm.x\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 dir = new Vector3(5, 0, 0);\n        var norm = Vector3.Normalize(dir);\n        Debug.Log(\"Dir X: \" + norm.x);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Dir X: 1"
        }
      ],
      "reward": {
        "exp": 240,
        "coins": 120
      },
      "tests": [
        {
          "input": "",
          "expected": "Dir X: 1",
          "description": "Câmara 14-2: Normalização de Vetor"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3.Normalize",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq14_3",
      "title": "Câmara 14-3: Produto Escalar (Vector3.Dot)",
      "difficulty": "medium",
      "chapterId": 14,
      "description": "Declare Vector3 frente = Vector3.forward; e Vector3 alvo = Vector3.forward;. Calcule o alinhamento com Vector3.Dot(frente, alvo) e exiba 'Alinhamento: ' + dot.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o produto escalar\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 frente = Vector3.forward;\n        Vector3 alvo = Vector3.forward;\n        float dot = Vector3.Dot(frente, alvo);\n        Debug.Log(\"Alinhamento: \" + dot);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alinhamento: 1"
        }
      ],
      "reward": {
        "exp": 240,
        "coins": 120
      },
      "tests": [
        {
          "input": "",
          "expected": "Alinhamento: 1",
          "description": "Câmara 14-3: Produto Escalar (Vector3.Dot)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3.Dot",
          "Vector3.forward",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq14_4",
      "title": "Câmara 14-4: Produto Vetorial (Vector3.Cross)",
      "difficulty": "medium",
      "chapterId": 14,
      "description": "Obtenha a normal perpendicular usando Vector3.Cross: declare Vector3 direito = Vector3.right; e Vector3 cima = Vector3.up;. Calcule Vector3.Cross(direito, cima) e emita 'Normal Z: ' + cross.z.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o cross product\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 direito = Vector3.right;\n        Vector3 cima = Vector3.up;\n        var cross = Vector3.Cross(direito, cima);\n        Debug.Log(\"Normal Z: \" + cross.z);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Normal Z: 1"
        }
      ],
      "reward": {
        "exp": 240,
        "coins": 120
      },
      "tests": [
        {
          "input": "",
          "expected": "Normal Z: 1",
          "description": "Câmara 14-4: Produto Vetorial (Vector3.Cross)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3.Cross",
          "Vector3.right",
          "Vector3.up"
        ]
      }
    },
    {
      "id": "sq14_5",
      "title": "Câmara 14-5: Alcance de Radar de Proximidade",
      "difficulty": "medium",
      "chapterId": 14,
      "description": "Calcule a distância entre o jogador em (0,0,0) e um inimigo em (0,0,8). Se a distância for menor que 10, emita 'Alvo no Radar: 8m'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a distancia e avalie o radar\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 player = Vector3.zero;\n        Vector3 enemy = new Vector3(0, 0, 8);\n        float dist = Vector3.Distance(player, enemy);\n        if (dist < 10)\n        {\n            Debug.Log(\"Alvo no Radar: \" + dist + \"m\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alvo no Radar: 8m"
        }
      ],
      "reward": {
        "exp": 240,
        "coins": 120
      },
      "tests": [
        {
          "input": "",
          "expected": "Alvo no Radar: 8m",
          "description": "Câmara 14-5: Alcance de Radar de Proximidade"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3.Distance",
          "if",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch15": [
    {
      "id": "sq15_1",
      "title": "Câmara 15-1: Disparo de Raycast Físico",
      "difficulty": "medium",
      "chapterId": 15,
      "description": "Execute um disparo de raio chamando Physics.Raycast(Vector3.zero, Vector3.forward, 10f). Emita no Console: 'Raio Disparado: True'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Execute Physics.Raycast\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);\n        Debug.Log(\"Raio Disparado: \" + acertou);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Raio Disparado: True"
        }
      ],
      "reward": {
        "exp": 250,
        "coins": 125
      },
      "tests": [
        {
          "input": "",
          "expected": "Raio Disparado: True",
          "description": "Câmara 15-1: Disparo de Raycast Físico"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Physics.Raycast",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq15_2",
      "title": "Câmara 15-2: Alcance Máximo de Detecção",
      "difficulty": "medium",
      "chapterId": 15,
      "description": "Defina a distância máxima de alcance float alcanceMax = 25.0f;. Emita no Console: 'Alcance do Raio: 25 metros'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare alcanceMax e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float alcanceMax = 25.0f;\n        Debug.Log(\"Alcance do Raio: \" + alcanceMax + \" metros\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alcance do Raio: 25 metros"
        }
      ],
      "reward": {
        "exp": 250,
        "coins": 125
      },
      "tests": [
        {
          "input": "",
          "expected": "Alcance do Raio: 25 metros",
          "description": "Câmara 15-2: Alcance Máximo de Detecção"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float alcanceMax",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq15_3",
      "title": "Câmara 15-3: Identificação de Objeto Atingido",
      "difficulty": "medium",
      "chapterId": 15,
      "description": "Simule os dados de um RaycastHit: declare string tagAtingida = 'Chao';. Se tagAtingida for 'Chao', emita 'Impacto no Solo Confirmado'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a tag atingida\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tagAtingida = \"Chao\";\n        if (tagAtingida == \"Chao\")\n        {\n            Debug.Log(\"Impacto no Solo Confirmado\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Impacto no Solo Confirmado"
        }
      ],
      "reward": {
        "exp": 250,
        "coins": 125
      },
      "tests": [
        {
          "input": "",
          "expected": "Impacto no Solo Confirmado",
          "description": "Câmara 15-3: Identificação de Objeto Atingido"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string tagAtingida",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq15_4",
      "title": "Câmara 15-4: Máscara de Colisão (LayerMask)",
      "difficulty": "medium",
      "chapterId": 15,
      "description": "Simule a filtragem por camada: declare int layerInimigo = 8;. Emita no Console: 'Mascara de Camada Ativa: 8'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare a layer e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int layerInimigo = 8;\n        Debug.Log(\"Mascara de Camada Ativa: \" + layerInimigo);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Mascara de Camada Ativa: 8"
        }
      ],
      "reward": {
        "exp": 250,
        "coins": 125
      },
      "tests": [
        {
          "input": "",
          "expected": "Mascara de Camada Ativa: 8",
          "description": "Câmara 15-4: Máscara de Colisão (LayerMask)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int layerInimigo",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq15_5",
      "title": "Câmara 15-5: Cálculo de Ponto de Impacto",
      "difficulty": "medium",
      "chapterId": 15,
      "description": "Declare a distância de impacto float distHit = 4.2f;. Emita no Console: 'Impacto a ' + distHit + ' metros'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare distHit e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distHit = 4.2f;\n        Debug.Log(\"Impacto a \" + distHit + \" metros\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Impacto a 4.2 metros"
        }
      ],
      "reward": {
        "exp": 250,
        "coins": 125
      },
      "tests": [
        {
          "input": "",
          "expected": "Impacto a 4.2 metros",
          "description": "Câmara 15-5: Cálculo de Ponto de Impacto"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float distHit",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch16": [
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
  ],
  "csharp_ch17": [
    {
      "id": "sq17_1",
      "title": "Câmara 17-1: Detecção de Colisão Sólida (OnCollisionEnter)",
      "difficulty": "medium",
      "chapterId": 17,
      "description": "Declare string outroObjeto = 'Parede';. Se for igual a 'Parede', emita no Console: 'Impacto com Parede Registrado'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a colisao solida\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string outroObjeto = \"Parede\";\n        if (outroObjeto == \"Parede\")\n        {\n            Debug.Log(\"Impacto com Parede Registrado\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Impacto com Parede Registrado"
        }
      ],
      "reward": {
        "exp": 270,
        "coins": 135
      },
      "tests": [
        {
          "input": "",
          "expected": "Impacto com Parede Registrado",
          "description": "Câmara 17-1: Detecção de Colisão Sólida (OnCollisionEnter)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "outroObjeto",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq17_2",
      "title": "Câmara 17-2: Gatilho de Zona (OnTriggerEnter)",
      "difficulty": "medium",
      "chapterId": 17,
      "description": "Declare bool isTrigger = true; e string zona = 'Checkpoint';. Se isTrigger for verdadeiro, emita 'Trigger Ativado: Checkpoint'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque o trigger e imprima a zona\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool isTrigger = true;\n        string zona = \"Checkpoint\";\n        if (isTrigger)\n        {\n            Debug.Log(\"Trigger Ativado: \" + zona);\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Trigger Ativado: Checkpoint"
        }
      ],
      "reward": {
        "exp": 270,
        "coins": 135
      },
      "tests": [
        {
          "input": "",
          "expected": "Trigger Ativado: Checkpoint",
          "description": "Câmara 17-2: Gatilho de Zona (OnTriggerEnter)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool isTrigger",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq17_3",
      "title": "Câmara 17-3: Coleta de Moeda por Gatilho",
      "difficulty": "medium",
      "chapterId": 17,
      "description": "Declare int moedas = 0;. Simule a coleta somando 1 a moedas e emita no Console: 'Moedas: ' + moedas.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Incremente as moedas coletadas\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 0;\n        moedas++;\n        Debug.Log(\"Moedas: \" + moedas);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Moedas: 1"
        }
      ],
      "reward": {
        "exp": 270,
        "coins": 135
      },
      "tests": [
        {
          "input": "",
          "expected": "Moedas: 1",
          "description": "Câmara 17-3: Coleta de Moeda por Gatilho"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int moedas",
          "++",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq17_4",
      "title": "Câmara 17-4: Filtro de Colisão por Tag",
      "difficulty": "medium",
      "chapterId": 17,
      "description": "Declare string colTag = 'Enemy';. Se colTag == 'Enemy', emita 'Dano Sofrido por Colisao!'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a tag do inimigo\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string colTag = \"Enemy\";\n        if (colTag == \"Enemy\")\n        {\n            Debug.Log(\"Dano Sofrido por Colisao!\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Dano Sofrido por Colisao!"
        }
      ],
      "reward": {
        "exp": 270,
        "coins": 135
      },
      "tests": [
        {
          "input": "",
          "expected": "Dano Sofrido por Colisao!",
          "description": "Câmara 17-4: Filtro de Colisão por Tag"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "colTag",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq17_5",
      "title": "Câmara 17-5: Gatilho de Saída (OnTriggerExit)",
      "difficulty": "medium",
      "chapterId": 17,
      "description": "Simule a saída de uma área segura: declare bool naAreaSegura = false;. Se não estiver na área segura (!naAreaSegura), emita 'Saiu da Area Segura!'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a saida da area segura\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool naAreaSegura = false;\n        if (!naAreaSegura)\n        {\n            Debug.Log(\"Saiu da Area Segura!\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Saiu da Area Segura!"
        }
      ],
      "reward": {
        "exp": 270,
        "coins": 135
      },
      "tests": [
        {
          "input": "",
          "expected": "Saiu da Area Segura!",
          "description": "Câmara 17-5: Gatilho de Saída (OnTriggerExit)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool naAreaSegura",
          "!",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch18": [
    {
      "id": "sq18_1",
      "title": "Câmara 18-1: Configuração de Alvo (Follow Target)",
      "difficulty": "medium",
      "chapterId": 18,
      "description": "Declare string alvoSeguido = 'Player';. Emita no Console: 'Cinemachine Seguindo: Player'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure alvoSeguido e emita\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string alvoSeguido = \"Player\";\n        Debug.Log(\"Cinemachine Seguindo: \" + alvoSeguido);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Cinemachine Seguindo: Player"
        }
      ],
      "reward": {
        "exp": 280,
        "coins": 140
      },
      "tests": [
        {
          "input": "",
          "expected": "Cinemachine Seguindo: Player",
          "description": "Câmara 18-1: Configuração de Alvo (Follow Target)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "alvoSeguido",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq18_2",
      "title": "Câmara 18-2: Distância Orbital da Câmera",
      "difficulty": "medium",
      "chapterId": 18,
      "description": "Declare float raioOrbital = 4.5f;. Emita no Console: 'Distancia Orbital: 4.5m'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare raioOrbital e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float raioOrbital = 4.5f;\n        Debug.Log(\"Distancia Orbital: \" + raioOrbital + \"m\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Distancia Orbital: 4.5m"
        }
      ],
      "reward": {
        "exp": 280,
        "coins": 140
      },
      "tests": [
        {
          "input": "",
          "expected": "Distancia Orbital: 4.5m",
          "description": "Câmara 18-2: Distância Orbital da Câmera"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float raioOrbital",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq18_3",
      "title": "Câmara 18-3: Amortecimento Suave (Damping)",
      "difficulty": "medium",
      "chapterId": 18,
      "description": "Declare float damping = 0.3f;. Emita no Console: 'Suavizacao Damping: 0.3'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare damping e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float damping = 0.3f;\n        Debug.Log(\"Suavizacao Damping: \" + damping);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Suavizacao Damping: 0.3"
        }
      ],
      "reward": {
        "exp": 280,
        "coins": 140
      },
      "tests": [
        {
          "input": "",
          "expected": "Suavizacao Damping: 0.3",
          "description": "Câmara 18-3: Amortecimento Suave (Damping)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float damping",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq18_4",
      "title": "Câmara 18-4: Transição Suave Entre Câmeras Virtuais",
      "difficulty": "medium",
      "chapterId": 18,
      "description": "Declare int prioridadeVcam1 = 10 e int prioridadeVcam2 = 20. Se prioridadeVcam2 > prioridadeVcam1, emita 'Vcam2 Ativa por Prioridade'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Compare as prioridades e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int prioridadeVcam1 = 10;\n        int prioridadeVcam2 = 20;\n        if (prioridadeVcam2 > prioridadeVcam1)\n        {\n            Debug.Log(\"Vcam2 Ativa por Prioridade\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Vcam2 Ativa por Prioridade"
        }
      ],
      "reward": {
        "exp": 280,
        "coins": 140
      },
      "tests": [
        {
          "input": "",
          "expected": "Vcam2 Ativa por Prioridade",
          "description": "Câmara 18-4: Transição Suave Entre Câmeras Virtuais"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "prioridadeVcam1",
          "prioridadeVcam2",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq18_5",
      "title": "Câmara 18-5: Zona Morta da Câmera (Dead Zone)",
      "difficulty": "medium",
      "chapterId": 18,
      "description": "Declare float deadZoneWidth = 0.1f;. Emita no Console: 'Largura Dead Zone: 0.1'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare deadZoneWidth e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float deadZoneWidth = 0.1f;\n        Debug.Log(\"Largura Dead Zone: \" + deadZoneWidth);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Largura Dead Zone: 0.1"
        }
      ],
      "reward": {
        "exp": 280,
        "coins": 140
      },
      "tests": [
        {
          "input": "",
          "expected": "Largura Dead Zone: 0.1",
          "description": "Câmara 18-5: Zona Morta da Câmera (Dead Zone)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float deadZoneWidth",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch19": [
    {
      "id": "sq19_1",
      "title": "Câmara 19-1: Sensibilidade do Mouse Look",
      "difficulty": "medium",
      "chapterId": 19,
      "description": "Declare float sensibilidade = 2.0f;. Emita no Console: 'Sensibilidade Mouse: 2'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare sensibilidade e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float sensibilidade = 2.0f;\n        Debug.Log(\"Sensibilidade Mouse: \" + sensibilidade);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Sensibilidade Mouse: 2"
        }
      ],
      "reward": {
        "exp": 290,
        "coins": 145
      },
      "tests": [
        {
          "input": "",
          "expected": "Sensibilidade Mouse: 2",
          "description": "Câmara 19-1: Sensibilidade do Mouse Look"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float sensibilidade",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq19_2",
      "title": "Câmara 19-2: Trava de Cursor no Centro da Tela",
      "difficulty": "medium",
      "chapterId": 19,
      "description": "Configure a trava do cursor acessando Cursor.lockState = 0;. Emita no Console: 'Cursor Bloqueado no Centro'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure Cursor.lockState e emita\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Cursor.lockState = 0;\n        Debug.Log(\"Cursor Bloqueado no Centro\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Cursor Bloqueado no Centro"
        }
      ],
      "reward": {
        "exp": 290,
        "coins": 145
      },
      "tests": [
        {
          "input": "",
          "expected": "Cursor Bloqueado no Centro",
          "description": "Câmara 19-2: Trava de Cursor no Centro da Tela"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Cursor.lockState",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq19_3",
      "title": "Câmara 19-3: Limite de Rotação Vertical (Clamp Pitch)",
      "difficulty": "medium",
      "chapterId": 19,
      "description": "Restrinja o ângulo vertical para não quebrar o pescoço do personagem: use Mathf.Clamp(95, -80, 80) e emita 'Angulo Travado: ' + angulo.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Aplique Mathf.Clamp entre -80 e 80\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float angulo = Mathf.Clamp(95, -80, 80);\n        Debug.Log(\"Angulo Travado: \" + angulo);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Angulo Travado: 80"
        }
      ],
      "reward": {
        "exp": 290,
        "coins": 145
      },
      "tests": [
        {
          "input": "",
          "expected": "Angulo Travado: 80",
          "description": "Câmara 19-3: Limite de Rotação Vertical (Clamp Pitch)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Mathf.Clamp",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq19_4",
      "title": "Câmara 19-4: Rotação Horizontal do Corpo",
      "difficulty": "medium",
      "chapterId": 19,
      "description": "Declare float mouseX = 15.0f;. Emita no Console: 'Giro Horizontal do Corpo: 15 graus'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare mouseX e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float mouseX = 15.0f;\n        Debug.Log(\"Giro Horizontal do Corpo: \" + mouseX + \" graus\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Giro Horizontal do Corpo: 15 graus"
        }
      ],
      "reward": {
        "exp": 290,
        "coins": 145
      },
      "tests": [
        {
          "input": "",
          "expected": "Giro Horizontal do Corpo: 15 graus",
          "description": "Câmara 19-4: Rotação Horizontal do Corpo"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float mouseX",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq19_5",
      "title": "Câmara 19-5: Campo de Visão (Field of View)",
      "difficulty": "medium",
      "chapterId": 19,
      "description": "Declare int fov = 60;. Quando o jogador mirar (bool mirando = true), reduza o fov para 40 e emita 'FOV Atual: ' + fov.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Reduza o FOV ao mirar e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int fov = 60;\n        bool mirando = true;\n        if (mirando) fov = 40;\n        Debug.Log(\"FOV Atual: \" + fov);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "FOV Atual: 40"
        }
      ],
      "reward": {
        "exp": 290,
        "coins": 145
      },
      "tests": [
        {
          "input": "",
          "expected": "FOV Atual: 40",
          "description": "Câmara 19-5: Campo de Visão (Field of View)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int fov",
          "bool mirando",
          "if",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch20": [
    {
      "id": "sq20_1",
      "title": "Câmara 20-1: Contagem de Vértices da Geometria",
      "difficulty": "medium",
      "chapterId": 20,
      "description": "Declare int totalVertices = 24;. Emita no Console: 'Vertices da Malha: 24'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare totalVertices e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalVertices = 24;\n        Debug.Log(\"Vertices da Malha: \" + totalVertices);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Vertices da Malha: 24"
        }
      ],
      "reward": {
        "exp": 300,
        "coins": 150
      },
      "tests": [
        {
          "input": "",
          "expected": "Vertices da Malha: 24",
          "description": "Câmara 20-1: Contagem de Vértices da Geometria"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int totalVertices",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq20_2",
      "title": "Câmara 20-2: Triângulos e Faces Poligonais",
      "difficulty": "medium",
      "chapterId": 20,
      "description": "Cada quad requer 2 triângulos. Para 6 faces de um cubo, calcule totalTriangulos = 6 * 2 e emita 'Total Triangulos: ' + totalTriangulos.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule totalTriangulos e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalTriangulos = 6 * 2;\n        Debug.Log(\"Total Triangulos: \" + totalTriangulos);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Total Triangulos: 12"
        }
      ],
      "reward": {
        "exp": 300,
        "coins": 150
      },
      "tests": [
        {
          "input": "",
          "expected": "Total Triangulos: 12",
          "description": "Câmara 20-2: Triângulos e Faces Poligonais"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "totalTriangulos",
          "6 * 2",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq20_3",
      "title": "Câmara 20-3: Mapeamento UV de Textura",
      "difficulty": "medium",
      "chapterId": 20,
      "description": "Declare Vector2 uv = new Vector2(0.5f, 0.5f);. Emita no Console: 'Centro UV: (0.5, 0.5)'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare uv e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 uv = new Vector2(0.5f, 0.5f);\n        Debug.Log(\"Centro UV: (\" + uv.x + \", \" + uv.y + \")\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Centro UV: (0.5, 0.5)"
        }
      ],
      "reward": {
        "exp": 300,
        "coins": 150
      },
      "tests": [
        {
          "input": "",
          "expected": "Centro UV: (0.5, 0.5)",
          "description": "Câmara 20-3: Mapeamento UV de Textura"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "new Vector2",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq20_4",
      "title": "Câmara 20-4: Recálculo de Normais da Malha",
      "difficulty": "medium",
      "chapterId": 20,
      "description": "Declare string statusNormais = 'Normais Recalculadas com Sucesso';. Emita no Console o valor de statusNormais.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusNormais e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusNormais = \"Normais Recalculadas com Sucesso\";\n        Debug.Log(statusNormais);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Normais Recalculadas com Sucesso"
        }
      ],
      "reward": {
        "exp": 300,
        "coins": 150
      },
      "tests": [
        {
          "input": "",
          "expected": "Normais Recalculadas com Sucesso",
          "description": "Câmara 20-4: Recálculo de Normais da Malha"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string statusNormais",
          "statusNormais",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq20_5",
      "title": "Câmara 20-5: Otimização de Submeshes",
      "difficulty": "medium",
      "chapterId": 20,
      "description": "Declare int submeshes = 1;. Se submeshes == 1, emita 'Malha Otimizada: Draw Call Unico'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque as submeshes\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int submeshes = 1;\n        if (submeshes == 1)\n        {\n            Debug.Log(\"Malha Otimizada: Draw Call Unico\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Malha Otimizada: Draw Call Unico"
        }
      ],
      "reward": {
        "exp": 300,
        "coins": 150
      },
      "tests": [
        {
          "input": "",
          "expected": "Malha Otimizada: Draw Call Unico",
          "description": "Câmara 20-5: Otimização de Submeshes"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int submeshes",
          "if",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch21": [
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
  ],
  "csharp_ch22": [
    {
      "id": "sq22_1",
      "title": "Câmara 22-1: Intensidade da Luz Direcional (Sol)",
      "difficulty": "medium",
      "chapterId": 22,
      "description": "Declare float intensidadeLuz = 1.2f;. Emita no Console: 'Intensidade Solar: 1.2 Lux'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare intensidadeLuz e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float intensidadeLuz = 1.2f;\n        Debug.Log(\"Intensidade Solar: \" + intensidadeLuz + \" Lux\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Intensidade Solar: 1.2 Lux"
        }
      ],
      "reward": {
        "exp": 320,
        "coins": 160
      },
      "tests": [
        {
          "input": "",
          "expected": "Intensidade Solar: 1.2 Lux",
          "description": "Câmara 22-1: Intensidade da Luz Direcional (Sol)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float intensidadeLuz",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq22_2",
      "title": "Câmara 22-2: Sombras em Tempo Real (Shadows)",
      "difficulty": "medium",
      "chapterId": 22,
      "description": "Declare string tipoSombra = 'SoftShadows';. Emita no Console: 'Tipo de Sombra: SoftShadows'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tipoSombra e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoSombra = \"SoftShadows\";\n        Debug.Log(\"Tipo de Sombra: \" + tipoSombra);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Tipo de Sombra: SoftShadows"
        }
      ],
      "reward": {
        "exp": 320,
        "coins": 160
      },
      "tests": [
        {
          "input": "",
          "expected": "Tipo de Sombra: SoftShadows",
          "description": "Câmara 22-2: Sombras em Tempo Real (Shadows)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "tipoSombra",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq22_3",
      "title": "Câmara 22-3: Sondas de Luz Adaptativas (APV)",
      "difficulty": "medium",
      "chapterId": 22,
      "description": "Declare int totalProbes = 250;. Emita no Console: 'Adaptive Probe Volumes: 250 probes'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare totalProbes e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalProbes = 250;\n        Debug.Log(\"Adaptive Probe Volumes: \" + totalProbes + \" probes\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Adaptive Probe Volumes: 250 probes"
        }
      ],
      "reward": {
        "exp": 320,
        "coins": 160
      },
      "tests": [
        {
          "input": "",
          "expected": "Adaptive Probe Volumes: 250 probes",
          "description": "Câmara 22-3: Sondas de Luz Adaptativas (APV)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int totalProbes",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq22_4",
      "title": "Câmara 22-4: Efeito Bloom de Pós-Processamento",
      "difficulty": "medium",
      "chapterId": 22,
      "description": "Declare bool bloomAtivo = true; e float intensidadeBloom = 0.8f;. Se bloomAtivo, emita 'Bloom Ativo com Intensidade: 0.8'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide e emita o Bloom\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool bloomAtivo = true;\n        float intensidadeBloom = 0.8f;\n        if (bloomAtivo)\n        {\n            Debug.Log(\"Bloom Ativo com Intensidade: \" + intensidadeBloom);\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Bloom Ativo com Intensidade: 0.8"
        }
      ],
      "reward": {
        "exp": 320,
        "coins": 160
      },
      "tests": [
        {
          "input": "",
          "expected": "Bloom Ativo com Intensidade: 0.8",
          "description": "Câmara 22-4: Efeito Bloom de Pós-Processamento"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool bloomAtivo",
          "float intensidadeBloom",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq22_5",
      "title": "Câmara 22-5: Color Grading e Vinheta",
      "difficulty": "medium",
      "chapterId": 22,
      "description": "Declare float vinhetaIntensidade = 0.35f;. Emita no Console: 'Vinheta Cinematica: 0.35'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare vinhetaIntensidade e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vinhetaIntensidade = 0.35f;\n        Debug.Log(\"Vinheta Cinematica: \" + vinhetaIntensidade);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Vinheta Cinematica: 0.35"
        }
      ],
      "reward": {
        "exp": 320,
        "coins": 160
      },
      "tests": [
        {
          "input": "",
          "expected": "Vinheta Cinematica: 0.35",
          "description": "Câmara 22-5: Color Grading e Vinheta"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float vinhetaIntensidade",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch23": [
    {
      "id": "sq23_1",
      "title": "Câmara 23-1: Atualização de Texto TextMeshPro",
      "difficulty": "medium",
      "chapterId": 23,
      "description": "Simule a atualização de um label de vida: declare string texto = 'HP: 100/100';. Emita no Console: 'HUD Texto: HP: 100/100'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o texto do HUD e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string texto = \"HP: 100/100\";\n        Debug.Log(\"HUD Texto: \" + texto);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "HUD Texto: HP: 100/100"
        }
      ],
      "reward": {
        "exp": 330,
        "coins": 165
      },
      "tests": [
        {
          "input": "",
          "expected": "HUD Texto: HP: 100/100",
          "description": "Câmara 23-1: Atualização de Texto TextMeshPro"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "texto",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq23_2",
      "title": "Câmara 23-2: Preenchimento de Barra de Mana (FillAmount)",
      "difficulty": "medium",
      "chapterId": 23,
      "description": "Declare float manaAtual = 75.0f; e float manaMax = 100.0f;. Calcule float fill = manaAtual / 100.0f; e emita 'Barra Fill: ' + fill.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o preenchimento da barra e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float manaAtual = 75.0f;\n        float manaMax = 100.0f;\n        float fill = manaAtual / 100.0f;\n        Debug.Log(\"Barra Fill: \" + fill);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Barra Fill: 0.75"
        }
      ],
      "reward": {
        "exp": 330,
        "coins": 165
      },
      "tests": [
        {
          "input": "",
          "expected": "Barra Fill: 0.75",
          "description": "Câmara 23-2: Preenchimento de Barra de Mana (FillAmount)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "manaAtual",
          "manaMax",
          "fill",
          "/"
        ]
      }
    },
    {
      "id": "sq23_3",
      "title": "Câmara 23-3: Visibilidade do Menu de Pause",
      "difficulty": "medium",
      "chapterId": 23,
      "description": "Declare bool menuPausaAtivo = true;. Se for verdadeiro, emita 'Painel de Pausa Visivel'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque menuPausaAtivo e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool menuPausaAtivo = true;\n        if (menuPausaAtivo)\n        {\n            Debug.Log(\"Painel de Pausa Visivel\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Painel de Pausa Visivel"
        }
      ],
      "reward": {
        "exp": 330,
        "coins": 165
      },
      "tests": [
        {
          "input": "",
          "expected": "Painel de Pausa Visivel",
          "description": "Câmara 23-3: Visibilidade do Menu de Pause"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool menuPausaAtivo",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq23_4",
      "title": "Câmara 23-4: Notificação Flutuante no HUD",
      "difficulty": "medium",
      "chapterId": 23,
      "description": "Declare string notificacao = '+100 XP';. Emita no Console: 'Toast Notificacao: +100 XP'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare notificacao e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string notificacao = \"+100 XP\";\n        Debug.Log(\"Toast Notificacao: \" + notificacao);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Toast Notificacao: +100 XP"
        }
      ],
      "reward": {
        "exp": 330,
        "coins": 165
      },
      "tests": [
        {
          "input": "",
          "expected": "Toast Notificacao: +100 XP",
          "description": "Câmara 23-4: Notificação Flutuante no HUD"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "notificacao",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq23_5",
      "title": "Câmara 23-5: Contador de Moedas na Tela",
      "difficulty": "medium",
      "chapterId": 23,
      "description": "Declare int moedas = 42;. Emita no Console formatado: 'Moedas Coletadas: 0042' usando moedas.ToString().",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure moedas e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 42;\n        Debug.Log(\"Moedas Coletadas: 00\" + moedas);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Moedas Coletadas: 0042"
        }
      ],
      "reward": {
        "exp": 330,
        "coins": 165
      },
      "tests": [
        {
          "input": "",
          "expected": "Moedas Coletadas: 0042",
          "description": "Câmara 23-5: Contador de Moedas na Tela"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int moedas",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch24": [
    {
      "id": "sq24_1",
      "title": "Câmara 24-1: Emissão de Efeito de Impacto",
      "difficulty": "medium",
      "chapterId": 24,
      "description": "Declare string efeito = 'Faíscas de Impacto';. Simule a emissão emitindo no Console: 'VFX Play: ' + efeito.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare efeito e emita a reproducao do VFX\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string efeito = \"Faíscas de Impacto\";\n        Debug.Log(\"VFX Play: \" + efeito);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "VFX Play: Faíscas de Impacto"
        }
      ],
      "reward": {
        "exp": 340,
        "coins": 170
      },
      "tests": [
        {
          "input": "",
          "expected": "VFX Play: Faíscas de Impacto",
          "description": "Câmara 24-1: Emissão de Efeito de Impacto"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string efeito",
          "efeito",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq24_2",
      "title": "Câmara 24-2: Taxa de Emissão de Partículas",
      "difficulty": "medium",
      "chapterId": 24,
      "description": "Declare int taxaEmissao = 50;. Emita no Console: 'Taxa de Emissao: 50 particulas/s'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare taxaEmissao e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int taxaEmissao = 50;\n        Debug.Log(\"Taxa de Emissao: \" + taxaEmissao + \" particulas/s\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Taxa de Emissao: 50 particulas/s"
        }
      ],
      "reward": {
        "exp": 340,
        "coins": 170
      },
      "tests": [
        {
          "input": "",
          "expected": "Taxa de Emissao: 50 particulas/s",
          "description": "Câmara 24-2: Taxa de Emissão de Partículas"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int taxaEmissao",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq24_3",
      "title": "Câmara 24-3: Tempo de Vida das Partículas (Lifetime)",
      "difficulty": "medium",
      "chapterId": 24,
      "description": "Declare float duracao = 2.5f;. Emita no Console: 'Tempo de Vida: 2.5s'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare duracao e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float duracao = 2.5f;\n        Debug.Log(\"Tempo de Vida: \" + duracao + \"s\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Tempo de Vida: 2.5s"
        }
      ],
      "reward": {
        "exp": 340,
        "coins": 170
      },
      "tests": [
        {
          "input": "",
          "expected": "Tempo de Vida: 2.5s",
          "description": "Câmara 24-3: Tempo de Vida das Partículas (Lifetime)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float duracao",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq24_4",
      "title": "Câmara 24-4: Efeito em Loop Contínuo",
      "difficulty": "medium",
      "chapterId": 24,
      "description": "Declare bool estaEmLoop = true;. Se for verdadeiro, emita 'VFX em Execucao Continua'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o efeito esta em loop\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaEmLoop = true;\n        if (estaEmLoop)\n        {\n            Debug.Log(\"VFX em Execucao Continua\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "VFX em Execucao Continua"
        }
      ],
      "reward": {
        "exp": 340,
        "coins": 170
      },
      "tests": [
        {
          "input": "",
          "expected": "VFX em Execucao Continua",
          "description": "Câmara 24-4: Efeito em Loop Contínuo"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool estaEmLoop",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq24_5",
      "title": "Câmara 24-5: Interrupção do Sistema de Partículas (Stop)",
      "difficulty": "medium",
      "chapterId": 24,
      "description": "Declare string statusVfx = 'VFX Stop: Emissao Encerrada';. Emita a mensagem com Debug.Log.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusVfx e emita\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusVfx = \"VFX Stop: Emissao Encerrada\";\n        Debug.Log(statusVfx);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "VFX Stop: Emissao Encerrada"
        }
      ],
      "reward": {
        "exp": 340,
        "coins": 170
      },
      "tests": [
        {
          "input": "",
          "expected": "VFX Stop: Emissao Encerrada",
          "description": "Câmara 24-5: Interrupção do Sistema de Partículas (Stop)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string statusVfx",
          "statusVfx",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch25": [
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
  ],
  "csharp_ch26": [
    {
      "id": "sq26_1",
      "title": "Câmara 26-1: Definição de Destino com SetDestination",
      "difficulty": "medium",
      "chapterId": 26,
      "description": "Simule o envio de um NPC para um destino: declare Vector3 destino = new Vector3(10, 0, 15);. Emita no Console: 'Destino NavMesh: (10, 0, 15)'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure destino e emita\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 destino = new Vector3(10, 0, 15);\n        Debug.Log(\"Destino NavMesh: (\" + destino.x + \", \" + destino.y + \", \" + destino.z + \")\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Destino NavMesh: (10, 0, 15)"
        }
      ],
      "reward": {
        "exp": 360,
        "coins": 180
      },
      "tests": [
        {
          "input": "",
          "expected": "Destino NavMesh: (10, 0, 15)",
          "description": "Câmara 26-1: Definição de Destino com SetDestination"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "new Vector3",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq26_2",
      "title": "Câmara 26-2: Velocidade de Navegação do Agente",
      "difficulty": "medium",
      "chapterId": 26,
      "description": "Declare float velocidadeAgente = 3.5f;. Emita no Console: 'Velocidade NavMeshAgent: 3.5'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare velocidadeAgente e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float velocidadeAgente = 3.5f;\n        Debug.Log(\"Velocidade NavMeshAgent: \" + velocidadeAgente);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Velocidade NavMeshAgent: 3.5"
        }
      ],
      "reward": {
        "exp": 360,
        "coins": 180
      },
      "tests": [
        {
          "input": "",
          "expected": "Velocidade NavMeshAgent: 3.5",
          "description": "Câmara 26-2: Velocidade de Navegação do Agente"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float velocidadeAgente",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq26_3",
      "title": "Câmara 26-3: Distância de Parada (StoppingDistance)",
      "difficulty": "medium",
      "chapterId": 26,
      "description": "Declare float distRestante = 0.8f; e float stopDist = 1.0f;. Se distRestante <= stopDist, emita 'NPC Chegou ao Destino'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide se o agente chegou\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distRestante = 0.8f;\n        float stopDist = 1.0f;\n        if (distRestante <= stopDist)\n        {\n            Debug.Log(\"NPC Chegou ao Destino\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "NPC Chegou ao Destino"
        }
      ],
      "reward": {
        "exp": 360,
        "coins": 180
      },
      "tests": [
        {
          "input": "",
          "expected": "NPC Chegou ao Destino",
          "description": "Câmara 26-3: Distância de Parada (StoppingDistance)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float distRestante",
          "float stopDist",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq26_4",
      "title": "Câmara 26-4: Patrulha Entre Pontos (Waypoints)",
      "difficulty": "medium",
      "chapterId": 26,
      "description": "Declare int indicePonto = 0; e int totalPontos = 3;. Avance para o próximo índice com (indicePonto + 1) % totalPontos e emita 'Proximo Ponto: ' + proximo.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Avance para o proximo waypoint\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int indicePonto = 0;\n        int totalPontos = 3;\n        int proximo = (indicePonto + 1) % totalPontos;\n        Debug.Log(\"Proximo Ponto: \" + proximo);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Proximo Ponto: 1"
        }
      ],
      "reward": {
        "exp": 360,
        "coins": 180
      },
      "tests": [
        {
          "input": "",
          "expected": "Proximo Ponto: 1",
          "description": "Câmara 26-4: Patrulha Entre Pontos (Waypoints)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "indicePonto",
          "totalPontos",
          "%",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq26_5",
      "title": "Câmara 26-5: Pausa para Observação no Ponto",
      "difficulty": "medium",
      "chapterId": 26,
      "description": "Declare float tempoEspera = 2.0f;. Emita no Console: 'Aguardando no Ponto: 2s'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoEspera e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoEspera = 2.0f;\n        Debug.Log(\"Aguardando no Ponto: \" + tempoEspera + \"s\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Aguardando no Ponto: 2s"
        }
      ],
      "reward": {
        "exp": 360,
        "coins": 180
      },
      "tests": [
        {
          "input": "",
          "expected": "Aguardando no Ponto: 2s",
          "description": "Câmara 26-5: Pausa para Observação no Ponto"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float tempoEspera",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch27": [
    {
      "id": "sq27_1",
      "title": "Câmara 27-1: Configuração de Cor Albedo PBR",
      "difficulty": "medium",
      "chapterId": 27,
      "description": "Declare string corBase = 'Vermelho_Carmim';. Emita no Console: 'Cor Albedo: Vermelho_Carmim'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare corBase e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string corBase = \"Vermelho_Carmim\";\n        Debug.Log(\"Cor Albedo: \" + corBase);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Cor Albedo: Vermelho_Carmim"
        }
      ],
      "reward": {
        "exp": 370,
        "coins": 185
      },
      "tests": [
        {
          "input": "",
          "expected": "Cor Albedo: Vermelho_Carmim",
          "description": "Câmara 27-1: Configuração de Cor Albedo PBR"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "corBase",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq27_2",
      "title": "Câmara 27-2: Grau Metálico (Metallic)",
      "difficulty": "medium",
      "chapterId": 27,
      "description": "Declare float metallic = 0.9f;. Emita no Console: 'Grau Metalico: 0.9'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare metallic e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float metallic = 0.9f;\n        Debug.Log(\"Grau Metalico: \" + metallic);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Grau Metalico: 0.9"
        }
      ],
      "reward": {
        "exp": 370,
        "coins": 185
      },
      "tests": [
        {
          "input": "",
          "expected": "Grau Metalico: 0.9",
          "description": "Câmara 27-2: Grau Metálico (Metallic)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float metallic",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq27_3",
      "title": "Câmara 27-3: Rugosidade e Suavidade (Smoothness)",
      "difficulty": "medium",
      "chapterId": 27,
      "description": "Declare float smoothness = 0.75f;. Emita no Console: 'Suavidade de Reflexo: 0.75'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare smoothness e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float smoothness = 0.75f;\n        Debug.Log(\"Suavidade de Reflexo: \" + smoothness);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Suavidade de Reflexo: 0.75"
        }
      ],
      "reward": {
        "exp": 370,
        "coins": 185
      },
      "tests": [
        {
          "input": "",
          "expected": "Suavidade de Reflexo: 0.75",
          "description": "Câmara 27-3: Rugosidade e Suavidade (Smoothness)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float smoothness",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq27_4",
      "title": "Câmara 27-4: Emissão de Luz Própria (Emission)",
      "difficulty": "medium",
      "chapterId": 27,
      "description": "Declare bool temEmissao = true; e float intensidadeEmissao = 2.0f;. Se temEmissao, emita 'Emissao Ativa: 2x'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se ha emissao de luz\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEmissao = true;\n        float intensidadeEmissao = 2.0f;\n        if (temEmissao)\n        {\n            Debug.Log(\"Emissao Ativa: \" + intensidadeEmissao + \"x\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Emissao Ativa: 2x"
        }
      ],
      "reward": {
        "exp": 370,
        "coins": 185
      },
      "tests": [
        {
          "input": "",
          "expected": "Emissao Ativa: 2x",
          "description": "Câmara 27-4: Emissão de Luz Própria (Emission)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool temEmissao",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq27_5",
      "title": "Câmara 27-5: Troca Dinâmica de Material",
      "difficulty": "medium",
      "chapterId": 27,
      "description": "Declare string materialAtual = 'Padrao';. Quando atingido (bool atingido = true), troque materialAtual para 'Dano_Flash' e emita 'Material: ' + materialAtual.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Troque o material em caso de dano\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string materialAtual = \"Padrao\";\n        bool atingido = true;\n        if (atingido)\n        {\n            materialAtual = \"Dano_Flash\";\n        }\n        Debug.Log(\"Material: \" + materialAtual);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Material: Dano_Flash"
        }
      ],
      "reward": {
        "exp": 370,
        "coins": 185
      },
      "tests": [
        {
          "input": "",
          "expected": "Material: Dano_Flash",
          "description": "Câmara 27-5: Troca Dinâmica de Material"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "materialAtual",
          "bool atingido",
          "if",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch28": [
    {
      "id": "sq28_1",
      "title": "Câmara 28-1: Criação Dinâmica de Entidade",
      "difficulty": "medium",
      "chapterId": 28,
      "description": "Simule o nascimento de um projétil na cena: declare string prefab = 'Projetil_Fogo';. Emita no Console: 'Instantiate: Projetil_Fogo gerado'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie o prefab e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string prefab = \"Projetil_Fogo\";\n        Debug.Log(\"Instantiate: \" + prefab + \" gerado\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Instantiate: Projetil_Fogo gerado"
        }
      ],
      "reward": {
        "exp": 380,
        "coins": 190
      },
      "tests": [
        {
          "input": "",
          "expected": "Instantiate: Projetil_Fogo gerado",
          "description": "Câmara 28-1: Criação Dinâmica de Entidade"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "prefab",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq28_2",
      "title": "Câmara 28-2: Instantiate com Posição e Rotação",
      "difficulty": "medium",
      "chapterId": 28,
      "description": "Declare Vector3 spawnPos = new Vector3(0, 1, 5);. Emita no Console: 'Spawn na Posicao: (0, 1, 5)'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare spawnPos e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 spawnPos = new Vector3(0, 1, 5);\n        Debug.Log(\"Spawn na Posicao: (\" + spawnPos.x + \", \" + spawnPos.y + \", \" + spawnPos.z + \")\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Spawn na Posicao: (0, 1, 5)"
        }
      ],
      "reward": {
        "exp": 380,
        "coins": 190
      },
      "tests": [
        {
          "input": "",
          "expected": "Spawn na Posicao: (0, 1, 5)",
          "description": "Câmara 28-2: Instantiate com Posição e Rotação"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "new Vector3",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq28_3",
      "title": "Câmara 28-3: Destruição com Temporizador (Delay)",
      "difficulty": "medium",
      "chapterId": 28,
      "description": "Declare float tempoVida = 3.0f;. Emita no Console: 'Objeto Destruido Apos: 3s'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoVida e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoVida = 3.0f;\n        Debug.Log(\"Objeto Destruido Apos: \" + tempoVida + \"s\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Objeto Destruido Apos: 3s"
        }
      ],
      "reward": {
        "exp": 380,
        "coins": 190
      },
      "tests": [
        {
          "input": "",
          "expected": "Objeto Destruido Apos: 3s",
          "description": "Câmara 28-3: Destruição com Temporizador (Delay)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float tempoVida",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq28_4",
      "title": "Câmara 28-4: Contagem de Objetos Instanciados",
      "difficulty": "medium",
      "chapterId": 28,
      "description": "Use um laço for de 1 até 3 gerando mensagens: 'Instancia #' + i + ' criada'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie 3 instancias no laco for\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Instancia #\" + i + \" criada\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Instancia #1 criada\nInstancia #2 criada\nInstancia #3 criada"
        }
      ],
      "reward": {
        "exp": 380,
        "coins": 190
      },
      "tests": [
        {
          "input": "",
          "expected": "Instancia #1 criada\nInstancia #2 criada\nInstancia #3 criada",
          "description": "Câmara 28-4: Contagem de Objetos Instanciados"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "for",
          "<=",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq28_5",
      "title": "Câmara 28-5: Destruição Imediata ao Contato",
      "difficulty": "medium",
      "chapterId": 28,
      "description": "Declare string colisor = 'Abismo';. Se colisor == 'Abismo', emita 'Destroy: Entidade Removida da Cena'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque o colisor e execute Destroy\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string colisor = \"Abismo\";\n        if (colisor == \"Abismo\")\n        {\n            Debug.Log(\"Destroy: Entidade Removida da Cena\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Destroy: Entidade Removida da Cena"
        }
      ],
      "reward": {
        "exp": 380,
        "coins": 190
      },
      "tests": [
        {
          "input": "",
          "expected": "Destroy: Entidade Removida da Cena",
          "description": "Câmara 28-5: Destruição Imediata ao Contato"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "colisor",
          "if",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch29": [
    {
      "id": "sq29_1",
      "title": "Câmara 29-1: Fila de Pooling com Queue",
      "difficulty": "medium",
      "chapterId": 29,
      "description": "Crie uma fila Queue<string> pool = new Queue<string>();. Adicione 'Projetil_1' usando .Enqueue('Projetil_1') e emita 'Pool Criado com: ' + pool.Count + ' item'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o pool com Queue e enfileire um item\n    }\n}",
      "solution": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_1\");\n        Debug.Log(\"Pool Criado com: \" + pool.Count + \" item\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pool Criado com: 1 item"
        }
      ],
      "reward": {
        "exp": 390,
        "coins": 195
      },
      "tests": [
        {
          "input": "",
          "expected": "Pool Criado com: 1 item",
          "description": "Câmara 29-1: Fila de Pooling com Queue"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Queue<string> pool",
          ".Enqueue(",
          "pool.Count"
        ]
      }
    },
    {
      "id": "sq29_2",
      "title": "Câmara 29-2: Resgate de Instância (Dequeue)",
      "difficulty": "medium",
      "chapterId": 29,
      "description": "Adicione 'Projetil_A' e 'Projetil_B' na fila. Resgate o primeiro elemento com pool.Dequeue() e emita 'Item Reutilizado: ' + item.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Enfileire 2 itens e desinfileire 1\n    }\n}",
      "solution": "using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_A\");\n        pool.Enqueue(\"Projetil_B\");\n        string item = pool.Dequeue();\n        Debug.Log(\"Item Reutilizado: \" + item);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Item Reutilizado: Projetil_A"
        }
      ],
      "reward": {
        "exp": 390,
        "coins": 195
      },
      "tests": [
        {
          "input": "",
          "expected": "Item Reutilizado: Projetil_A",
          "description": "Câmara 29-2: Resgate de Instância (Dequeue)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Queue<string> pool",
          ".Dequeue()",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq29_3",
      "title": "Câmara 29-3: Reutilização Sem Garbage Collection",
      "difficulty": "medium",
      "chapterId": 29,
      "description": "Declare int objetosInstanciados = 10; e int gcAllocBytes = 0;. Emita no Console: 'Alocacao de GC Evitada: 0 bytes'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare gcAllocBytes e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int gcAllocBytes = 0;\n        Debug.Log(\"Alocacao de GC Evitada: \" + gcAllocBytes + \" bytes\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alocacao de GC Evitada: 0 bytes"
        }
      ],
      "reward": {
        "exp": 390,
        "coins": 195
      },
      "tests": [
        {
          "input": "",
          "expected": "Alocacao de GC Evitada: 0 bytes",
          "description": "Câmara 29-3: Reutilização Sem Garbage Collection"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "gcAllocBytes",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq29_4",
      "title": "Câmara 29-4: Devolução de Objeto ao Pool (Desativação)",
      "difficulty": "medium",
      "chapterId": 29,
      "description": "Declare bool estaAtivo = false;. Emita no Console: 'Objeto Devolvido ao Pool (Ativo: False)'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure estaAtivo e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaAtivo = false;\n        Debug.Log(\"Objeto Devolvido ao Pool (Ativo: \" + estaAtivo + \")\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Objeto Devolvido ao Pool (Ativo: False)"
        }
      ],
      "reward": {
        "exp": 390,
        "coins": 195
      },
      "tests": [
        {
          "input": "",
          "expected": "Objeto Devolvido ao Pool (Ativo: False)",
          "description": "Câmara 29-4: Devolução de Objeto ao Pool (Desativação)"
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
      "id": "sq29_5",
      "title": "Câmara 29-5: Capacidade Máxima do Pool",
      "difficulty": "medium",
      "chapterId": 29,
      "description": "Declare int capacidadeMaxima = 50;. Emita no Console: 'Capacidade do Pool: 50 unidades'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare capacidadeMaxima e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int capacidadeMaxima = 50;\n        Debug.Log(\"Capacidade do Pool: \" + capacidadeMaxima + \" unidades\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Capacidade do Pool: 50 unidades"
        }
      ],
      "reward": {
        "exp": 390,
        "coins": 195
      },
      "tests": [
        {
          "input": "",
          "expected": "Capacidade do Pool: 50 unidades",
          "description": "Câmara 29-5: Capacidade Máxima do Pool"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int capacidadeMaxima",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch30": [
    {
      "id": "sq30_1",
      "title": "Câmara 30-1: Leitura de Atributos do ScriptableObject",
      "difficulty": "medium",
      "chapterId": 30,
      "description": "Simule a leitura de um arquivo de configuração: declare string nomePoder = 'Meteoro'; int custoMana = 40;. Emita: 'Habilidade: Meteoro | Custo: 40 Mana'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare os dados e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nomePoder = \"Meteoro\";\n        int custoMana = 40;\n        Debug.Log(\"Habilidade: \" + nomePoder + \" | Custo: \" + custoMana + \" Mana\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Habilidade: Meteoro | Custo: 40 Mana"
        }
      ],
      "reward": {
        "exp": 400,
        "coins": 200
      },
      "tests": [
        {
          "input": "",
          "expected": "Habilidade: Meteoro | Custo: 40 Mana",
          "description": "Câmara 30-1: Leitura de Atributos do ScriptableObject"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "nomePoder",
          "custoMana",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq30_2",
      "title": "Câmara 30-2: Ficha de Dados de Inimigo Modular",
      "difficulty": "medium",
      "chapterId": 30,
      "description": "Declare string tipoMonstro = 'Golem'; int hpBase = 500;. Emita no Console: 'Monstro: Golem | HP: 500'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os atributos e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoMonstro = \"Golem\";\n        int hpBase = 500;\n        Debug.Log(\"Monstro: \" + tipoMonstro + \" | HP: \" + hpBase);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Monstro: Golem | HP: 500"
        }
      ],
      "reward": {
        "exp": 400,
        "coins": 200
      },
      "tests": [
        {
          "input": "",
          "expected": "Monstro: Golem | HP: 500",
          "description": "Câmara 30-2: Ficha de Dados de Inimigo Modular"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "tipoMonstro",
          "hpBase",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq30_3",
      "title": "Câmara 30-3: Compartilhamento de Dados Entre Instâncias",
      "difficulty": "medium",
      "chapterId": 30,
      "description": "Simule duas instâncias lendo o mesmo danoBase = 25: calcule danoDuplo = danoBase * 2 e emita 'Dano Compartilhado: ' + danoDuplo.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o dano compartilhado\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 25;\n        int danoDuplo = danoBase * 2;\n        Debug.Log(\"Dano Compartilhado: \" + danoDuplo);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Dano Compartilhado: 50"
        }
      ],
      "reward": {
        "exp": 400,
        "coins": 200
      },
      "tests": [
        {
          "input": "",
          "expected": "Dano Compartilhado: 50",
          "description": "Câmara 30-3: Compartilhamento de Dados Entre Instâncias"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "danoBase",
          "danoDuplo",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq30_4",
      "title": "Câmara 30-4: Menu de Criação de Asset ([CreateAssetMenu])",
      "difficulty": "medium",
      "chapterId": 30,
      "description": "Declare string caminhoMenu = 'Assets/Create/Cartas/Item';. Emita no Console: 'Menu Ativo: ' + caminhoMenu.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare caminhoMenu e emita o caminho do CreateAssetMenu\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string caminhoMenu = \"Assets/Create/Cartas/Item\";\n        Debug.Log(\"Menu Ativo: \" + caminhoMenu);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Menu Ativo: Assets/Create/Cartas/Item"
        }
      ],
      "reward": {
        "exp": 400,
        "coins": 200
      },
      "tests": [
        {
          "input": "",
          "expected": "Menu Ativo: Assets/Create/Cartas/Item",
          "description": "Câmara 30-4: Menu de Criação de Asset ([CreateAssetMenu])"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string caminhoMenu",
          "caminhoMenu",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq30_5",
      "title": "Câmara 30-5: Economia Modular de Custo de Habilidade",
      "difficulty": "medium",
      "chapterId": 30,
      "description": "Declare int manaDisponivel = 80; int custo = 30;. Subtraia o custo e emita 'Mana Restante: ' + (manaDisponivel - custo).",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Desconte a mana consumida\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int manaDisponivel = 80;\n        int custo = 30;\n        int restante = manaDisponivel - custo;\n        Debug.Log(\"Mana Restante: \" + restante);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Mana Restante: 50"
        }
      ],
      "reward": {
        "exp": 400,
        "coins": 200
      },
      "tests": [
        {
          "input": "",
          "expected": "Mana Restante: 50",
          "description": "Câmara 30-5: Economia Modular de Custo de Habilidade"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "manaDisponivel",
          "custo",
          "-",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch31": [
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
  ],
  "csharp_ch32": [
    {
      "id": "sq32_1",
      "title": "Câmara 32-1: Serialização de Objeto para JSON",
      "difficulty": "medium",
      "chapterId": 32,
      "description": "Simule a serialização de dados de save: declare string json = '{\"fase\":3,\"moedas\":150}';. Emita no Console: 'JSON: ' + json.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure a string json e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string json = \"{\\\"fase\\\":3,\\\"moedas\\\":150}\";\n        Debug.Log(\"JSON: \" + json);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "JSON: {\"fase\":3,\"moedas\":150}"
        }
      ],
      "reward": {
        "exp": 420,
        "coins": 210
      },
      "tests": [
        {
          "input": "",
          "expected": "JSON: {\"fase\":3,\"moedas\":150}",
          "description": "Câmara 32-1: Serialização de Objeto para JSON"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "json",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq32_2",
      "title": "Câmara 32-2: Uso do JsonUtility.ToJson",
      "difficulty": "medium",
      "chapterId": 32,
      "description": "Simule a conversão de um vetor em JSON: chame JsonUtility.ToJson(Vector3.one). Emita no Console: 'Serializado com JsonUtility'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Use JsonUtility.ToJson\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string txt = JsonUtility.ToJson(Vector3.one);\n        Debug.Log(\"Serializado com JsonUtility\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Serializado com JsonUtility"
        }
      ],
      "reward": {
        "exp": 420,
        "coins": 210
      },
      "tests": [
        {
          "input": "",
          "expected": "Serializado com JsonUtility",
          "description": "Câmara 32-2: Uso do JsonUtility.ToJson"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "JsonUtility.ToJson",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq32_3",
      "title": "Câmara 32-3: Desserialização e Resgate de Valores",
      "difficulty": "medium",
      "chapterId": 32,
      "description": "Simule a extração de dados desserializados: declare int faseCarregada = 5; int vidaCarregada = 100;. Emita 'Save Carregado: Fase 5 (Vida: 100)'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os dados carregados e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int faseCarregada = 5;\n        int vidaCarregada = 100;\n        Debug.Log(\"Save Carregado: Fase \" + faseCarregada + \" (Vida: \" + vidaCarregada + \")\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Save Carregado: Fase 5 (Vida: 100)"
        }
      ],
      "reward": {
        "exp": 420,
        "coins": 210
      },
      "tests": [
        {
          "input": "",
          "expected": "Save Carregado: Fase 5 (Vida: 100)",
          "description": "Câmara 32-3: Desserialização e Resgate de Valores"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "faseCarregada",
          "vidaCarregada",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq32_4",
      "title": "Câmara 32-4: Anotação [System.Serializable]",
      "difficulty": "medium",
      "chapterId": 32,
      "description": "Declare string statusSerial = 'Estrutura Marcada como Serializavel';. Emita no Console o valor de statusSerial.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusSerial e emita o status de serializacao\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusSerial = \"Estrutura Marcada como Serializavel\";\n        Debug.Log(statusSerial);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Estrutura Marcada como Serializavel"
        }
      ],
      "reward": {
        "exp": 420,
        "coins": 210
      },
      "tests": [
        {
          "input": "",
          "expected": "Estrutura Marcada como Serializavel",
          "description": "Câmara 32-4: Anotação [System.Serializable]"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string statusSerial",
          "statusSerial",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq32_5",
      "title": "Câmara 32-5: Integridade de Arquivo de Save",
      "difficulty": "medium",
      "chapterId": 32,
      "description": "Declare bool saveValido = true;. Se for verdadeiro, emita 'Arquivo de Save Valido e Carregado'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide o save e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool saveValido = true;\n        if (saveValido)\n        {\n            Debug.Log(\"Arquivo de Save Valido e Carregado\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Arquivo de Save Valido e Carregado"
        }
      ],
      "reward": {
        "exp": 420,
        "coins": 210
      },
      "tests": [
        {
          "input": "",
          "expected": "Arquivo de Save Valido e Carregado",
          "description": "Câmara 32-5: Integridade de Arquivo de Save"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool saveValido",
          "if",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch33": [
    {
      "id": "sq33_1",
      "title": "Câmara 33-1: Execução Temporal com Delay",
      "difficulty": "medium",
      "chapterId": 33,
      "description": "Declare string p1 = 'Passo 1: Iniciado'; e string p2 = 'Passo 2: Concluido';. Emita ambas em linhas separadas no Console.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare p1 e p2 e emita os dois passos da corotina\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string p1 = \"Passo 1: Iniciado\";\n        string p2 = \"Passo 2: Concluido\";\n        Debug.Log(p1);\n        Debug.Log(p2);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Passo 1: Iniciado\nPasso 2: Concluido"
        }
      ],
      "reward": {
        "exp": 430,
        "coins": 215
      },
      "tests": [
        {
          "input": "",
          "expected": "Passo 1: Iniciado\nPasso 2: Concluido",
          "description": "Câmara 33-1: Execução Temporal com Delay"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string p1",
          "string p2",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq33_2",
      "title": "Câmara 33-2: Tempo de Espera (WaitForSeconds)",
      "difficulty": "medium",
      "chapterId": 33,
      "description": "Declare float tempoEspera = 1.5f;. Emita no Console: 'Aguardando: 1.5 segundos'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoEspera e imprima\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoEspera = 1.5f;\n        Debug.Log(\"Aguardando: \" + tempoEspera + \" segundos\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Aguardando: 1.5 segundos"
        }
      ],
      "reward": {
        "exp": 430,
        "coins": 215
      },
      "tests": [
        {
          "input": "",
          "expected": "Aguardando: 1.5 segundos",
          "description": "Câmara 33-2: Tempo de Espera (WaitForSeconds)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float tempoEspera",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq33_3",
      "title": "Câmara 33-3: Contagem Regressiva de Corotina",
      "difficulty": "medium",
      "chapterId": 33,
      "description": "Use um for de 3 até 1 simulando um timer assíncrono: imprima 'Timer: ' + i e ao final 'Lancamento!'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Faca a contagem regressiva e o lancamento\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 3; i >= 1; i--)\n        {\n            Debug.Log(\"Timer: \" + i);\n        }\n        Debug.Log(\"Lancamento!\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Timer: 3\nTimer: 2\nTimer: 1\nLancamento!"
        }
      ],
      "reward": {
        "exp": 430,
        "coins": 215
      },
      "tests": [
        {
          "input": "",
          "expected": "Timer: 3\nTimer: 2\nTimer: 1\nLancamento!",
          "description": "Câmara 33-3: Contagem Regressiva de Corotina"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "for",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq33_4",
      "title": "Câmara 33-4: Disparo com StartCoroutine",
      "difficulty": "medium",
      "chapterId": 33,
      "description": "Declare string statusCoro = 'StartCoroutine: Rotina Disparada';. Emita no Console o valor de statusCoro.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusCoro e emita a inicializacao da corotina\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusCoro = \"StartCoroutine: Rotina Disparada\";\n        Debug.Log(statusCoro);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "StartCoroutine: Rotina Disparada"
        }
      ],
      "reward": {
        "exp": 430,
        "coins": 215
      },
      "tests": [
        {
          "input": "",
          "expected": "StartCoroutine: Rotina Disparada",
          "description": "Câmara 33-4: Disparo com StartCoroutine"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string statusCoro",
          "statusCoro",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq33_5",
      "title": "Câmara 33-5: Interrupção com StopCoroutine",
      "difficulty": "medium",
      "chapterId": 33,
      "description": "Declare bool jogadorCancelou = true;. Se for verdadeiro, emita 'StopCoroutine: Execucao Interrompida'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o jogador cancelou a acao\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool jogadorCancelou = true;\n        if (jogadorCancelou)\n        {\n            Debug.Log(\"StopCoroutine: Execucao Interrompida\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "StopCoroutine: Execucao Interrompida"
        }
      ],
      "reward": {
        "exp": 430,
        "coins": 215
      },
      "tests": [
        {
          "input": "",
          "expected": "StopCoroutine: Execucao Interrompida",
          "description": "Câmara 33-5: Interrupção com StopCoroutine"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool jogadorCancelou",
          "if",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch34": [
    {
      "id": "sq34_1",
      "title": "Câmara 34-1: Declaração e Disparo de Action",
      "difficulty": "medium",
      "chapterId": 34,
      "description": "Declare string status = 'Jogador Derrotado'; e Action onPlayerDied = () => Debug.Log('Evento: ' + status);. Invoque onPlayerDied();.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare status, Action e execute-a\n    }\n}",
      "solution": "using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string status = \"Jogador Derrotado\";\n        Action onPlayerDied = () => Debug.Log(\"Evento: \" + status);\n        onPlayerDied();\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Evento: Jogador Derrotado"
        }
      ],
      "reward": {
        "exp": 440,
        "coins": 220
      },
      "tests": [
        {
          "input": "",
          "expected": "Evento: Jogador Derrotado",
          "description": "Câmara 34-1: Declaração e Disparo de Action"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string status",
          "Action onPlayerDied",
          "onPlayerDied()"
        ]
      }
    },
    {
      "id": "sq34_2",
      "title": "Câmara 34-2: Delegate com Parâmetro de Dano",
      "difficulty": "medium",
      "chapterId": 34,
      "description": "Declare int danoRecebido = 45; e Action onTakeDamage = () => Debug.Log('Dano Sofrido: ' + danoRecebido);. Invoque onTakeDamage();.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare danoRecebido e execute a Action\n    }\n}",
      "solution": "using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoRecebido = 45;\n        Action onTakeDamage = () => Debug.Log(\"Dano Sofrido: \" + danoRecebido);\n        onTakeDamage();\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Dano Sofrido: 45"
        }
      ],
      "reward": {
        "exp": 440,
        "coins": 220
      },
      "tests": [
        {
          "input": "",
          "expected": "Dano Sofrido: 45",
          "description": "Câmara 34-2: Delegate com Parâmetro de Dano"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int danoRecebido",
          "onTakeDamage",
          "onTakeDamage()"
        ]
      }
    },
    {
      "id": "sq34_3",
      "title": "Câmara 34-3: Desacoplamento de UI e Lógica",
      "difficulty": "medium",
      "chapterId": 34,
      "description": "Declare string eventoUi = 'HUD Notificado: Barra Atualizada';. Emita no Console o valor de eventoUi.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare eventoUi e emita a notificacao do evento\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string eventoUi = \"HUD Notificado: Barra Atualizada\";\n        Debug.Log(eventoUi);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "HUD Notificado: Barra Atualizada"
        }
      ],
      "reward": {
        "exp": 440,
        "coins": 220
      },
      "tests": [
        {
          "input": "",
          "expected": "HUD Notificado: Barra Atualizada",
          "description": "Câmara 34-3: Desacoplamento de UI e Lógica"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string eventoUi",
          "eventoUi",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq34_4",
      "title": "Câmara 34-4: Múltiplos Ouvintes de Evento (Multicast)",
      "difficulty": "medium",
      "chapterId": 34,
      "description": "Declare string o1 = 'Ouvinte 1: Som Tocado'; e string o2 = 'Ouvinte 2: Particula Ativada';. Emita ambas em linhas separadas.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o1 e o2 e emita as acoes dos dois ouvintes\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string o1 = \"Ouvinte 1: Som Tocado\";\n        string o2 = \"Ouvinte 2: Particula Ativada\";\n        Debug.Log(o1);\n        Debug.Log(o2);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Ouvinte 1: Som Tocado\nOuvinte 2: Particula Ativada"
        }
      ],
      "reward": {
        "exp": 440,
        "coins": 220
      },
      "tests": [
        {
          "input": "",
          "expected": "Ouvinte 1: Som Tocado\nOuvinte 2: Particula Ativada",
          "description": "Câmara 34-4: Múltiplos Ouvintes de Evento (Multicast)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string o1",
          "string o2",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq34_5",
      "title": "Câmara 34-5: Cancelamento de Inscrição (-=)",
      "difficulty": "medium",
      "chapterId": 34,
      "description": "Declare string statusUnsub = 'Inscricao Removida com -= no OnDisable';. Emita no Console com Debug.Log.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusUnsub e emita a remocao de inscricao\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusUnsub = \"Inscricao Removida com -= no OnDisable\";\n        Debug.Log(statusUnsub);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Inscricao Removida com -= no OnDisable"
        }
      ],
      "reward": {
        "exp": 440,
        "coins": 220
      },
      "tests": [
        {
          "input": "",
          "expected": "Inscricao Removida com -= no OnDisable",
          "description": "Câmara 34-5: Cancelamento de Inscrição (-=)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string statusUnsub",
          "statusUnsub",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch35": [
    {
      "id": "sq35_1",
      "title": "Câmara 35-1: Contrato de Dano (IDamageable)",
      "difficulty": "medium",
      "chapterId": 35,
      "description": "Simule uma entidade implementando IDamageable: declare int dano = 30;. Emita no Console: 'IDamageable: Tomou 30 de dano'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o dano e emita\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int dano = 30;\n        Debug.Log(\"IDamageable: Tomou \" + dano + \" de dano\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "IDamageable: Tomou 30 de dano"
        }
      ],
      "reward": {
        "exp": 450,
        "coins": 225
      },
      "tests": [
        {
          "input": "",
          "expected": "IDamageable: Tomou 30 de dano",
          "description": "Câmara 35-1: Contrato de Dano (IDamageable)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "dano",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq35_2",
      "title": "Câmara 35-2: Contrato de Interação (IInteractable)",
      "difficulty": "medium",
      "chapterId": 35,
      "description": "Simule a interação com um baú: declare string objeto = 'Bau';. Emita no Console: 'IInteractable: Interagiu com Bau'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare objeto e emita a interacao\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string objeto = \"Bau\";\n        Debug.Log(\"IInteractable: Interagiu com \" + objeto);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "IInteractable: Interagiu com Bau"
        }
      ],
      "reward": {
        "exp": 450,
        "coins": 225
      },
      "tests": [
        {
          "input": "",
          "expected": "IInteractable: Interagiu com Bau",
          "description": "Câmara 35-2: Contrato de Interação (IInteractable)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "objeto",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq35_3",
      "title": "Câmara 35-3: Polimorfismo Baseado em Interfaces",
      "difficulty": "medium",
      "chapterId": 35,
      "description": "Declare um array com 2 tipos que implementam IDamageable: 'Inimigo' e 'Barril'. Itere e emita para cada um: 'Entidade Danificavel: ' + nome.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Itere pelos alvos danificaveis\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] alvos = new string[] { \"Inimigo\", \"Barril\" };\n        for (int i = 0; i < alvos.Length; i++)\n        {\n            Debug.Log(\"Entidade Danificavel: \" + alvos[i]);\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Entidade Danificavel: Inimigo\nEntidade Danificavel: Barril"
        }
      ],
      "reward": {
        "exp": 450,
        "coins": 225
      },
      "tests": [
        {
          "input": "",
          "expected": "Entidade Danificavel: Inimigo\nEntidade Danificavel: Barril",
          "description": "Câmara 35-3: Polimorfismo Baseado em Interfaces"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string[] alvos",
          "for",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq35_4",
      "title": "Câmara 35-4: Checagem Segura com Operador 'is'",
      "difficulty": "medium",
      "chapterId": 35,
      "description": "Declare bool eDanificavel = true;. Se for verdadeiro, emita 'Alvo Implementa IDamageable'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se implementa a interface\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool eDanificavel = true;\n        if (eDanificavel)\n        {\n            Debug.Log(\"Alvo Implementa IDamageable\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alvo Implementa IDamageable"
        }
      ],
      "reward": {
        "exp": 450,
        "coins": 225
      },
      "tests": [
        {
          "input": "",
          "expected": "Alvo Implementa IDamageable",
          "description": "Câmara 35-4: Checagem Segura com Operador 'is'"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool eDanificavel",
          "if",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq35_5",
      "title": "Câmara 35-5: Múltiplas Interfaces em uma Classe",
      "difficulty": "medium",
      "chapterId": 35,
      "description": "Uma porta pode ser Danificável e Interagível: declare bool podeInteragir = true; bool podeDestruir = true;. Emita 'Porta: Interagivel e Destrutivel'.",
      "instructions": "No método Start(), implemente a lógica rúnica exigida e emita o resultado no Console da Unity com Debug.Log().",
      "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os estados e emita\n    }\n}",
      "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool podeInteragir = true;\n        bool podeDestruir = true;\n        Debug.Log(\"Porta: Interagivel e Destrutivel\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Porta: Interagivel e Destrutivel"
        }
      ],
      "reward": {
        "exp": 450,
        "coins": 225
      },
      "tests": [
        {
          "input": "",
          "expected": "Porta: Interagivel e Destrutivel",
          "description": "Câmara 35-5: Múltiplas Interfaces em uma Classe"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "bool podeInteragir",
          "bool podeDestruir",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch36": [
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
  ],
  "csharp_ch37": [
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
  ]
};

if (typeof module !== 'undefined') {
  module.exports = { CSHARP_SIDE_QUESTS };
}
if (typeof window !== 'undefined') {
  window.CSHARP_SIDE_QUESTS = CSHARP_SIDE_QUESTS;
}
