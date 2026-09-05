/**
 * GUILDCODE - C# Unity Abyss Chambers Data (45 Quests across 9 Floors)
 */
const CSHARP_SIDE_QUESTS = {
  "csharp_ch0": [
    {
      "id": "sq0_1",
      "title": "Câmara 1: Alocação de Memória Primitiva",
      "description": "Declare uma variável de número inteiro para contabilizar a pontuação inicial do guardião com o valor de 250 pontos. Exiba no Console exatamente: Pontos: 250",
      "instructions": "No método Start(), declare a variável int pontos com 250 e exiba via Debug.Log concatenando a pontuação.",
      "starterCode": "using UnityEngine;\n\npublic class Camara1 : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare pontos com 250 e imprima\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pontos: 250"
        }
      ],
      "reward": {
        "exp": 50,
        "coins": 25
      },
      "tests": [
        {
          "input": "",
          "expected": "Pontos: 250",
          "description": "Câmara 1: Alocação de Memória Primitiva"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int pontos",
          "pontos"
        ]
      }
    },
    {
      "id": "sq0_2",
      "title": "Câmara 2: Ponto Flutuante e Precisão",
      "description": "Na Unity, grandezas contínuas como velocidades e deltas utilizam números de ponto flutuante com sufixo f. Declare uma variável de velocidade com o valor de 7.5f e emita no Console: Velocidade: 7.5",
      "instructions": "Declare float velocidade = 7.5f; e use Debug.Log concatenando o valor.",
      "starterCode": "using UnityEngine;\n\npublic class Camara2 : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare velocidade como 7.5f e imprima\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Velocidade: 7.5"
        }
      ],
      "reward": {
        "exp": 60,
        "coins": 30
      },
      "tests": [
        {
          "input": "",
          "expected": "Velocidade: 7.5",
          "description": "Câmara 2: Ponto Flutuante e Precisão"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "float velocidade",
          "7.5f",
          "velocidade"
        ]
      }
    },
    {
      "id": "sq0_3",
      "title": "Câmara 3: Identificador do Guardião",
      "description": "Armazene os dados de identificação do guardião. Declare uma variável de texto para o nome contendo \"Kael\" e uma variável booleana para o status ativo com valor verdadeiro. Exiba no Console no formato: Guardião: Kael | Status: True",
      "instructions": "Declare string nome e bool ativo e exiba ambos concatenados no formato exigido.",
      "starterCode": "using UnityEngine;\n\npublic class Camara3 : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare nome e ativo e imprima no formato\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Guardião: Kael | Status: True"
        }
      ],
      "reward": {
        "exp": 70,
        "coins": 35
      },
      "tests": [
        {
          "input": "",
          "expected": "Guardião: Kael | Status: True",
          "description": "Câmara 3: Identificador do Guardião"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "string nome",
          "bool ativo",
          "nome",
          "ativo"
        ]
      }
    },
    {
      "id": "sq0_4",
      "title": "Câmara 4: Cálculos Aritméticos de Mana",
      "description": "Calcule o saldo de recursos após a compra de um elixir rúnico. Inicialize as moedas com 150 e o custo com 45. Subtraia o custo do saldo de moedas e exiba: Moedas Restantes: 105",
      "instructions": "Declare moedas e custo, calcule a diferença e exiba o resultado via Debug.Log.",
      "starterCode": "using UnityEngine;\n\npublic class Camara4 : MonoBehaviour\n{\n    void Start()\n    {\n        // Realize o cálculo e exiba a Mana Total\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Mana Total: 145"
        }
      ],
      "reward": {
        "exp": 80,
        "coins": 40
      },
      "tests": [
        {
          "input": "",
          "expected": "Mana Total: 145",
          "description": "Câmara 4: Cálculos Aritméticos de Mana"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "moedas",
          "custo",
          "-"
        ]
      }
    },
    {
      "id": "sq0_5",
      "title": "Câmara 5: Limiar da Sobrecarga",
      "description": "Calcule a vida máxima total de uma entidade somando a vida base de 100 com o bônus de equipamento de 35.5f. Exiba no Console exatamente: Vida Total: 135.5",
      "instructions": "Some vidaBase com bonusEquip e armazene na variável vidaTotal antes de emitir no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara5 : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique a energia\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Sobrecarga Ativada!"
        }
      ],
      "reward": {
        "exp": 100,
        "coins": 50
      },
      "tests": [
        {
          "input": "",
          "expected": "Sobrecarga Ativada!",
          "description": "Câmara 5: Limiar da Sobrecarga"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "vidaBase",
          "bonusEquip",
          "vidaTotal",
          "+"
        ]
      }
    }
  ],
  "csharp_ch1": [
    {
      "id": "sq1_1",
      "title": "Câmara 1: Despertar do Ciclo (Awake vs Start)",
      "description": "No ciclo de execução da Unity, o método Awake é disparado antes de qualquer inicialização em Start. Crie o método Awake() emitindo no Console a confirmação: Awake: Sistema Inicializado",
      "instructions": "Declare void Awake() e use Debug.Log para emitir o despertar do sistema.",
      "starterCode": "using UnityEngine;\n\npublic class Camara1_1 : MonoBehaviour\n{\n    // Defina o método Awake\n    void Awake()\n    {\n        \n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Awake: Sistema Inicializado"
        }
      ],
      "reward": {
        "exp": 90,
        "coins": 45
      },
      "tests": [
        {
          "input": "",
          "expected": "Awake: Sistema Inicializado",
          "description": "Câmara 1: Despertar do Ciclo (Awake vs Start)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "void Awake",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq1_2",
      "title": "Câmara 2: Portão das Condições",
      "description": "Avalie a permissão de acesso ao santuário dimensional. Declare o nível do jogador com 5. Através de uma estrutura if/else, se o nível for maior ou igual a 5 exiba \"Acesso ao Santuário Concedido\", caso contrário exiba \"Acesso Negado\".",
      "instructions": "Use if (nivel >= 5) para controlar a mensagem de saída.",
      "starterCode": "using UnityEngine;\n\npublic class Camara1_2 : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 5;\n        // Verifique o nível\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Acesso ao Santuário Concedido"
        }
      ],
      "reward": {
        "exp": 100,
        "coins": 50
      },
      "tests": [
        {
          "input": "",
          "expected": "Acesso ao Santuário Concedido",
          "description": "Câmara 2: Portão das Condições"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int nivel",
          "if",
          ">=",
          "else"
        ]
      }
    },
    {
      "id": "sq1_3",
      "title": "Câmara 3: Seleção de Elemento (Switch)",
      "description": "Implemente uma seleção elemental utilizando a estrutura switch. Declare uma variável string elemento com o valor \"Fogo\". Verifique se o elemento é \"Fogo\" e exiba no Console exatamente: Dano Ígneo Amplificado",
      "instructions": "Use switch(elemento) com case \"Fogo\": Debug.Log(\"Dano Ígneo Amplificado\"); break;",
      "starterCode": "using UnityEngine;\n\npublic class Camara1_3 : MonoBehaviour\n{\n    void Start()\n    {\n        string elemento = \"Fogo\";\n        // Trate o elemento\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Dano Ígneo Amplificado"
        }
      ],
      "reward": {
        "exp": 110,
        "coins": 55
      },
      "tests": [
        {
          "input": "",
          "expected": "Dano Ígneo Amplificado",
          "description": "Câmara 3: Seleção de Elemento (Switch)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "switch",
          "case",
          "break",
          "elemento"
        ]
      }
    },
    {
      "id": "sq1_4",
      "title": "Câmara 4: Pulso de Execução em Loop",
      "description": "Controle a taxa de regeneração contínua de mana em cada pulso de frame. Inicialize manaAtual com 80 e o limite de manaMaxima com 100. Se a mana atual for inferior à máxima, incremente 5 pontos de mana e exiba: Mana Regenerada: 85",
      "instructions": "Use if (manaAtual < manaMaxima) para aplicar o incremento e emitir o resultado.",
      "starterCode": "using UnityEngine;\n\npublic class Camara1_4 : MonoBehaviour\n{\n    void Start()\n    {\n        // Loop de pulsos 1 a 3\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pulso 1\nPulso 2\nPulso 3"
        }
      ],
      "reward": {
        "exp": 120,
        "coins": 60
      },
      "tests": [
        {
          "input": "",
          "expected": "Pulso 1\nPulso 2\nPulso 3",
          "description": "Câmara 4: Pulso de Execução em Loop"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "manaAtual",
          "manaMaxima",
          "if",
          "<"
        ]
      }
    },
    {
      "id": "sq1_5",
      "title": "Câmara 5: Sentinela de Estado",
      "description": "Implemente uma máquina de estados simples utilizando a estrutura switch. Declare o estado atual como \"Combat\". Se for \"Combat\", exiba no Console: Estado Ativo: Em Combate",
      "instructions": "Utilize switch(estado) com o caso correspondente a \"Combat\".",
      "starterCode": "using UnityEngine;\n\npublic class Camara1_5 : MonoBehaviour\n{\n    void Start()\n    {\n        bool combateAtivo = true;\n        int municao = 15;\n        // Verifique prontidão\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pronto para o Combate"
        }
      ],
      "reward": {
        "exp": 140,
        "coins": 70
      },
      "tests": [
        {
          "input": "",
          "expected": "Pronto para o Combate",
          "description": "Câmara 5: Sentinela de Estado"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "switch",
          "case",
          "break"
        ]
      }
    }
  ],
  "csharp_ch2": [
    {
      "id": "sq2_1",
      "title": "Câmara 1: Coordenadas no Espaço 3D",
      "description": "Posicione um GameObject no espaço tridimensional. Declare uma variável Vector3 chamada pos com x = 10, y = 0 e z = 5. Exiba no Console exatamente: Posição: (10, 0, 5)",
      "instructions": "Instancie Vector3 pos com as coordenadas informadas e exiba no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara2_1 : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o Vector3 e imprima suas coordenadas\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Posição: (10, 0, 5)"
        }
      ],
      "reward": {
        "exp": 130,
        "coins": 65
      },
      "tests": [
        {
          "input": "",
          "expected": "Posição: (10, 0, 5)",
          "description": "Câmara 1: Coordenadas no Espaço 3D"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3 pos",
          "new Vector3"
        ]
      }
    },
    {
      "id": "sq2_2",
      "title": "Câmara 2: Vetor de Direção Normalizada",
      "description": "Obtenha o vetor unitário que aponta para o horizonte frontal da engine utilizando o atalho Vector3.forward. Guarde na variável dir e exiba no Console: Direção: (0, 0, 1)",
      "instructions": "Declare Vector3 dir = Vector3.forward; e exiba as coordenadas no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara2_2 : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba a direção forward\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Direção: (0, 0, 1)"
        }
      ],
      "reward": {
        "exp": 140,
        "coins": 70
      },
      "tests": [
        {
          "input": "",
          "expected": "Direção: (0, 0, 1)",
          "description": "Câmara 2: Vetor de Direção Normalizada"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3 dir",
          "Vector3.forward"
        ]
      }
    },
    {
      "id": "sq2_3",
      "title": "Câmara 3: Medição de Distância Euclidiana",
      "description": "Calcule a distância euclidiana linear entre dois pontos p1 e p2 no espaço 3D. O ponto p1 deve ser a origem (0, 0, 0) e o ponto p2 deve estar em (0, 10, 0). Calcule a distância com Vector3.Distance(p1, p2) e exiba no Console exatamente: Distância: 10",
      "instructions": "Utilize Vector3.Distance(p1, p2) e exiba no Console concatenando o resultado.",
      "starterCode": "using UnityEngine;\n\npublic class Camara2_3 : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 p1 = Vector3.zero;\n        Vector3 p2 = new Vector3(0, 10, 0);\n        // Calcule e imprima a distância\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Distância: 10"
        }
      ],
      "reward": {
        "exp": 150,
        "coins": 75
      },
      "tests": [
        {
          "input": "",
          "expected": "Distância: 10",
          "description": "Câmara 3: Medição de Distância Euclidiana"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3.Distance",
          "p1",
          "p2"
        ]
      }
    },
    {
      "id": "sq2_4",
      "title": "Câmara 4: Interpolação Linear (Lerp)",
      "description": "Calcule o deslocamento escalar multiplicando a velocidade horizontal de 4.0f por um delta de tempo decorrido de 2.5f. Exiba no Console: Deslocamento: 10m",
      "instructions": "Multiplique vel por deltaTime e exiba o resultado concatenado com a unidade de medida.",
      "starterCode": "using UnityEngine;\n\npublic class Camara2_4 : MonoBehaviour\n{\n    void Start()\n    {\n        // Aplique Mathf.Lerp e imprima\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Resultado Lerp: 50"
        }
      ],
      "reward": {
        "exp": 160,
        "coins": 80
      },
      "tests": [
        {
          "input": "",
          "expected": "Resultado Lerp: 50",
          "description": "Câmara 4: Interpolação Linear (Lerp)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "vel",
          "deltaTime",
          "*"
        ]
      }
    },
    {
      "id": "sq2_5",
      "title": "Câmara 5: Translação no Espaço Global",
      "description": "Calcule a nova coordenada de um personagem somando o vetor de posição inicial (3, 1, 0) com o vetor de velocidade (2, 0, 0). Exiba no Console: Nova Posição: (5, 1, 0)",
      "instructions": "Some pos + vel e guarde na variável novaPos antes de exibir.",
      "starterCode": "using UnityEngine;\n\npublic class Camara2_5 : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pos = new Vector3(3, 1, 0);\n        Vector3 vel = new Vector3(2, 0, 0);\n        // Calcule e imprima\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Nova Posição: (5, 1, 0)"
        }
      ],
      "reward": {
        "exp": 180,
        "coins": 90
      },
      "tests": [
        {
          "input": "",
          "expected": "Nova Posição: (5, 1, 0)",
          "description": "Câmara 5: Translação no Espaço Global"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Vector3 pos",
          "Vector3 vel",
          "novaPos",
          "+"
        ]
      }
    }
  ],
  "csharp_ch3": [
    {
      "id": "sq3_1",
      "title": "Câmara 1: Obtenção de Componente Físico",
      "description": "Obtenha a referência do componente de física do GameObject através de GetComponent<Rigidbody>(). Verifique se o componente foi encontrado e exiba no Console: Rigidbody Conectado com Sucesso",
      "instructions": "Declare Rigidbody rb = GetComponent<Rigidbody>(); e verifique com if (rb != null).",
      "starterCode": "using UnityEngine;\n\npublic class Camara3_1 : MonoBehaviour\n{\n    void Start()\n    {\n        Rigidbody rb = GetComponent<Rigidbody>();\n        if (rb != null)\n        {\n            Debug.Log(\"Rigidbody Conectado com Sucesso\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Rigidbody Conectado com Sucesso"
        }
      ],
      "reward": {
        "exp": 170,
        "coins": 85
      },
      "tests": [
        {
          "input": "",
          "expected": "Rigidbody Conectado com Sucesso",
          "description": "Câmara 1: Obtenção de Componente Físico"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "GetComponent<Rigidbody>",
          "if"
        ]
      }
    },
    {
      "id": "sq3_2",
      "title": "Câmara 2: Aplicação de Força de Impulso",
      "description": "Aplique um vetor de impulso instantâneo vertical para simular um salto com a física da Unity, multiplicando Vector3.up por 10f com ForceMode.Impulse. Exiba no Console: Impulso Aplicado: 10N",
      "instructions": "Invoque rb.AddForce com Vector3.up e ForceMode.Impulse e emita a confirmação.",
      "starterCode": "using UnityEngine;\n\npublic class Camara3_2 : MonoBehaviour\n{\n    void Start()\n    {\n        Rigidbody rb = GetComponent<Rigidbody>();\n        // Aplique a força e imprima a confirmação\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Impulso Aplicado: 10N"
        }
      ],
      "reward": {
        "exp": 180,
        "coins": 90
      },
      "tests": [
        {
          "input": "",
          "expected": "Impulso Aplicado: 10N",
          "description": "Câmara 2: Aplicação de Força de Impulso"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "AddForce",
          "Vector3.up",
          "ForceMode.Impulse"
        ]
      }
    },
    {
      "id": "sq3_3",
      "title": "Câmara 3: Trava de Gravidade Cinética",
      "description": "Para fazer um objeto levitar ignorando o campo gravitacional do PhysX, desative a propriedade useGravity do componente Rigidbody. Exiba no Console: Gravidade Desativada",
      "instructions": "Defina rb.useGravity = false; e emita a confirmação no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara3_3 : MonoBehaviour\n{\n    void Start()\n    {\n        Rigidbody rb = GetComponent<Rigidbody>();\n        // Desative useGravity e imprima\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Gravidade Desativada"
        }
      ],
      "reward": {
        "exp": 190,
        "coins": 95
      },
      "tests": [
        {
          "input": "",
          "expected": "Gravidade Desativada",
          "description": "Câmara 3: Trava de Gravidade Cinética"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "useGravity",
          "false"
        ]
      }
    },
    {
      "id": "sq3_4",
      "title": "Câmara 4: Ajuste de Arrasto Linear (Drag)",
      "description": "Configure o atrito do ar (amortecimento linear) de um projétil ajustando a propriedade linearDamping (ou drag) do Rigidbody para 2.5f. Exiba no Console: Arrasto Linear: 2.5",
      "instructions": "Ajuste a propriedade de amortecimento linear e emita a mensagem.",
      "starterCode": "using UnityEngine;\n\npublic class Camara3_4 : MonoBehaviour\n{\n    void Start()\n    {\n        Rigidbody rb = GetComponent<Rigidbody>();\n        // Configure o amortecimento e imprima\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Arrasto Linear: 2.5"
        }
      ],
      "reward": {
        "exp": 200,
        "coins": 100
      },
      "tests": [
        {
          "input": "",
          "expected": "Arrasto Linear: 2.5",
          "description": "Câmara 4: Ajuste de Arrasto Linear (Drag)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "linearDamping",
          "2.5f"
        ]
      }
    },
    {
      "id": "sq3_5",
      "title": "Câmara 5: Ciclo Físico FixedUpdate",
      "description": "No ciclo da Unity, todos os cálculos e atualizações de física devem ocorrer sincronizados dentro de FixedUpdate(). Crie o método void FixedUpdate() e emita no Console: Passo Físico Sincronizado",
      "instructions": "Estruture o método void FixedUpdate() contendo o Debug.Log.",
      "starterCode": "using UnityEngine;\n\npublic class Camara3_5 : MonoBehaviour\n{\n    // Implemente FixedUpdate\n    void FixedUpdate()\n    {\n        \n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Passo Físico Sincronizado"
        }
      ],
      "reward": {
        "exp": 220,
        "coins": 110
      },
      "tests": [
        {
          "input": "",
          "expected": "Passo Físico Sincronizado",
          "description": "Câmara 5: Ciclo Físico FixedUpdate"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "void FixedUpdate",
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch4": [
    {
      "id": "sq4_1",
      "title": "Câmara 1: Detecção de Colisão Física",
      "description": "Implemente o callback que a Unity aciona no exato instante em que dois colisores sólidos se chocam: OnCollisionEnter(Collision collision). Dentro dele, emita no Console: Colisão Detectada com Inimigo",
      "instructions": "Declare o método void OnCollisionEnter(Collision collision) e emita o log.",
      "starterCode": "using UnityEngine;\n\npublic class Camara4_1 : MonoBehaviour\n{\n    void OnCollisionEnter(Collision collision)\n    {\n        // Imprima o log de colisão\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Colisão Detectada com Inimigo"
        }
      ],
      "reward": {
        "exp": 210,
        "coins": 105
      },
      "tests": [
        {
          "input": "",
          "expected": "Colisão Detectada com Inimigo",
          "description": "Câmara 1: Detecção de Colisão Física"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "void OnCollisionEnter",
          "Collision"
        ]
      }
    },
    {
      "id": "sq4_2",
      "title": "Câmara 2: Zona de Gatilho (IsTrigger)",
      "description": "Configure um gatilho de passagem etérea (IsTrigger) implementando o evento OnTriggerEnter(Collider other). Ao adentrar a área, emita no Console: Zona de Cura Ativada",
      "instructions": "Declare o método void OnTriggerEnter(Collider other) com o Debug.Log.",
      "starterCode": "using UnityEngine;\n\npublic class Camara4_2 : MonoBehaviour\n{\n    void OnTriggerEnter(Collider other)\n    {\n        // Imprima zona de cura ativada\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Zona de Cura Ativada"
        }
      ],
      "reward": {
        "exp": 220,
        "coins": 110
      },
      "tests": [
        {
          "input": "",
          "expected": "Zona de Cura Ativada",
          "description": "Câmara 2: Zona de Gatilho (IsTrigger)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "void OnTriggerEnter",
          "Collider"
        ]
      }
    },
    {
      "id": "sq4_3",
      "title": "Câmara 3: Filtragem por Tags",
      "description": "Filtre o colisor que entrou no gatilho testando se ele pertence à tag \"Player\" através de other.CompareTag(\"Player\"). Se for o jogador, exiba: Jogador Identificado",
      "instructions": "Use if (other.CompareTag(\"Player\")) para emitir o log.",
      "starterCode": "using UnityEngine;\n\npublic class Camara4_3 : MonoBehaviour\n{\n    void OnTriggerEnter(Collider other)\n    {\n        if (other.CompareTag(\"Player\"))\n        {\n            Debug.Log(\"Jogador Identificado\");\n        }\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Jogador Identificado"
        }
      ],
      "reward": {
        "exp": 230,
        "coins": 115
      },
      "tests": [
        {
          "input": "",
          "expected": "Jogador Identificado",
          "description": "Câmara 3: Filtragem por Tags"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "CompareTag",
          "\"Player\"",
          "if"
        ]
      }
    },
    {
      "id": "sq4_4",
      "title": "Câmara 4: Absorção de Projétil e Destruição",
      "description": "Simule a destruição de um projétil ou entidade no momento da colisão chamando Destroy(gameObject). Emita no Console: Projétil Destruído no Impacto",
      "instructions": "Invoque Destroy(gameObject) e exiba a notificação no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara4_4 : MonoBehaviour\n{\n    void OnCollisionEnter(Collision col)\n    {\n        // Destrua e registre no console\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Projétil Destruído no Impacto"
        }
      ],
      "reward": {
        "exp": 240,
        "coins": 120
      },
      "tests": [
        {
          "input": "",
          "expected": "Projétil Destruído no Impacto",
          "description": "Câmara 4: Absorção de Projétil e Destruição"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Destroy",
          "gameObject"
        ]
      }
    },
    {
      "id": "sq4_5",
      "title": "Câmara 5: Ponto de Impacto dos Guardiões",
      "description": "Acesse as informações físicas detalhadas do choque obtendo o primeiro ponto de contato através de collision.contacts[0].point. Exiba no Console a confirmação: Impacto no Ponto de Contato",
      "instructions": "Obtenha a coordenada de contato e emita a notificação de impacto.",
      "starterCode": "using UnityEngine;\n\npublic class Camara4_5 : MonoBehaviour\n{\n    void OnCollisionEnter(Collision collision)\n    {\n        // Emita o log do ponto de contato\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Impacto no Ponto de Contato"
        }
      ],
      "reward": {
        "exp": 260,
        "coins": 130
      },
      "tests": [
        {
          "input": "",
          "expected": "Impacto no Ponto de Contato",
          "description": "Câmara 5: Ponto de Impacto dos Guardiões"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "contacts",
          "point"
        ]
      }
    }
  ],
  "csharp_ch5": [
    {
      "id": "sq5_1",
      "title": "Câmara 1: Definição de ScriptableObject",
      "description": "Defina uma classe de dados independente de cena chamada ItemData herdando de ScriptableObject. No método Start(), exiba no Console: ScriptableObject Definido",
      "instructions": "Crie a classe ItemData : ScriptableObject e no Start() emita o log.",
      "starterCode": "using UnityEngine;\n\npublic class ItemData : ScriptableObject\n{\n    public string nomeItem;\n}\n\npublic class Camara5_1 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"ScriptableObject Definido\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "ScriptableObject Definido"
        }
      ],
      "reward": {
        "exp": 250,
        "coins": 125
      },
      "tests": [
        {
          "input": "",
          "expected": "ScriptableObject Definido",
          "description": "Câmara 1: Definição de ScriptableObject"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "ScriptableObject",
          "class ItemData"
        ]
      }
    },
    {
      "id": "sq5_2",
      "title": "Câmara 2: Atributo CreateAssetMenu",
      "description": "Habilite a criação de novos arquivos de dados através do menu de contexto da Unity adicionando o atributo [CreateAssetMenu] na classe. Exiba no Console: Menu de Criação Configurado",
      "instructions": "Decore a classe com [CreateAssetMenu] e exiba a confirmação no Start.",
      "starterCode": "using UnityEngine;\n\n[CreateAssetMenu(fileName = \"NovoItem\", menuName = \"Inventario/Item\")]\npublic class TesteItem : ScriptableObject {}\n\npublic class Camara5_2 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Menu de Criação Configurado\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Menu de Criação Configurado"
        }
      ],
      "reward": {
        "exp": 260,
        "coins": 130
      },
      "tests": [
        {
          "input": "",
          "expected": "Menu de Criação Configurado",
          "description": "Câmara 2: Atributo CreateAssetMenu"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "CreateAssetMenu",
          "ScriptableObject"
        ]
      }
    },
    {
      "id": "sq5_3",
      "title": "Câmara 3: Atributos de Inspector (Header e Range)",
      "description": "Configure atributos visuais de validação no Inspector da Unity: declare a variável inteira poder valendo 80 decorada com o atributo [Range(0, 100)]. Exiba no Console: Poder Configurado: 80",
      "instructions": "Decore a variável com [Range(0, 100)] e exiba seu valor no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara5_3 : MonoBehaviour\n{\n    [Range(0, 100)] public int poder = 80;\n\n    void Start()\n    {\n        Debug.Log(\"Poder Configurado: \" + poder);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Poder Configurado: 80"
        }
      ],
      "reward": {
        "exp": 270,
        "coins": 135
      },
      "tests": [
        {
          "input": "",
          "expected": "Poder Configurado: 80",
          "description": "Câmara 3: Atributos de Inspector (Header e Range)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Range",
          "poder",
          "80"
        ]
      }
    },
    {
      "id": "sq5_4",
      "title": "Câmara 4: Leitura de Tabela de Dados",
      "description": "Leia a estatística de poder de ataque armazenada em uma ficha de ScriptableObject. Declare a variável de dano valendo 45 e exiba no Console: Dano da Arma: 45",
      "instructions": "Declare a variável de dano e exiba no Console formatada.",
      "starterCode": "using UnityEngine;\n\npublic class Camara5_4 : MonoBehaviour\n{\n    void Start()\n    {\n        int dano = 45;\n        Debug.Log(\"Dano da Arma: \" + dano);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Dano da Arma: 45"
        }
      ],
      "reward": {
        "exp": 280,
        "coins": 140
      },
      "tests": [
        {
          "input": "",
          "expected": "Dano da Arma: 45",
          "description": "Câmara 4: Leitura de Tabela de Dados"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "int dano",
          "45"
        ]
      }
    },
    {
      "id": "sq5_5",
      "title": "Câmara 5: Instanciação em Runtime",
      "description": "Instancie dinamicamente uma cópia volátil de um ScriptableObject em memória durante a execução usando ScriptableObject.CreateInstance<ItemData>(). Exiba no Console: Instância Criada em Tempo de Execução",
      "instructions": "Invoque CreateInstance e emita o log de confirmação.",
      "starterCode": "using UnityEngine;\n\npublic class Camara5_5 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Instância Criada em Tempo de Execução\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Instância Criada em Tempo de Execução"
        }
      ],
      "reward": {
        "exp": 300,
        "coins": 150
      },
      "tests": [
        {
          "input": "",
          "expected": "Instância Criada em Tempo de Execução",
          "description": "Câmara 5: Instanciação em Runtime"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "CreateInstance",
          "ItemData"
        ]
      }
    }
  ],
  "csharp_ch6": [
    {
      "id": "sq6_1",
      "title": "Câmara 1: Rotina Temporal IEnumerator",
      "description": "Estruture uma rotina assíncrona temporizada da Unity utilizando a interface IEnumerator. Crie uma coroutine chamada Contagem() e emita no Console: Iniciando Coroutine Temporal",
      "instructions": "Declare IEnumerator Contagem() e dispare com StartCoroutine.",
      "starterCode": "using System.Collections;\nusing UnityEngine;\n\npublic class Camara6_1 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Iniciando Coroutine Temporal\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Iniciando Coroutine Temporal"
        }
      ],
      "reward": {
        "exp": 290,
        "coins": 145
      },
      "tests": [
        {
          "input": "",
          "expected": "Iniciando Coroutine Temporal",
          "description": "Câmara 1: Rotina Temporal IEnumerator"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "IEnumerator",
          "Contagem"
        ]
      }
    },
    {
      "id": "sq6_2",
      "title": "Câmara 2: Suspensão por WaitForSeconds",
      "description": "Suspenda a execução de uma coroutine por um intervalo de tempo real utilizando a instrução yield return new WaitForSeconds(1.0f). Emita no Console: Espera Concluída: 1.0s",
      "instructions": "Utilize yield return new WaitForSeconds(1.0f); dentro da coroutine.",
      "starterCode": "using System.Collections;\nusing UnityEngine;\n\npublic class Camara6_2 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Espera Concluída: 1.0s\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Espera Concluída: 1.0s"
        }
      ],
      "reward": {
        "exp": 300,
        "coins": 150
      },
      "tests": [
        {
          "input": "",
          "expected": "Espera Concluída: 1.0s",
          "description": "Câmara 2: Suspensão por WaitForSeconds"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "yield return",
          "WaitForSeconds"
        ]
      }
    },
    {
      "id": "sq6_3",
      "title": "Câmara 3: Espera por Fim de Quadro",
      "description": "Pause a execução de um script até o quadro seguinte da renderização com yield return null. Emita no Console: Próximo Quadro Atingido",
      "instructions": "Use yield return null; dentro do método assíncrono.",
      "starterCode": "using System.Collections;\nusing UnityEngine;\n\npublic class Camara6_3 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Próximo Quadro Atingido\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Próximo Quadro Atingido"
        }
      ],
      "reward": {
        "exp": 310,
        "coins": 155
      },
      "tests": [
        {
          "input": "",
          "expected": "Próximo Quadro Atingido",
          "description": "Câmara 3: Espera por Fim de Quadro"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "yield return",
          "null"
        ]
      }
    },
    {
      "id": "sq6_4",
      "title": "Câmara 4: Cancelamento com StopCoroutine",
      "description": "Interrompa com segurança uma rotina temporal em andamento invocando o comando StopCoroutine. Exiba no Console: Coroutine Interrompida com Segurança",
      "instructions": "Chame StopCoroutine e emita a mensagem de cancelamento.",
      "starterCode": "using System.Collections;\nusing UnityEngine;\n\npublic class Camara6_4 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Coroutine Interrompida com Segurança\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Coroutine Interrompida com Segurança"
        }
      ],
      "reward": {
        "exp": 320,
        "coins": 160
      },
      "tests": [
        {
          "input": "",
          "expected": "Coroutine Interrompida com Segurança",
          "description": "Câmara 4: Cancelamento com StopCoroutine"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "StopCoroutine"
        ]
      }
    },
    {
      "id": "sq6_5",
      "title": "Câmara 5: Escala de Tempo e Pausa",
      "description": "Implemente o efeito de congelamento temporal ou pausa geral do jogo configurando a propriedade estática Time.timeScale para 0f. Exiba no Console: Tempo Congelado: timeScale 0",
      "instructions": "Defina Time.timeScale = 0f; e emita a mensagem no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara6_5 : MonoBehaviour\n{\n    void Start()\n    {\n        Time.timeScale = 0f;\n        Debug.Log(\"Tempo Congelado: timeScale 0\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Tempo Congelado: timeScale 0"
        }
      ],
      "reward": {
        "exp": 350,
        "coins": 175
      },
      "tests": [
        {
          "input": "",
          "expected": "Tempo Congelado: timeScale 0",
          "description": "Câmara 5: Escala de Tempo e Pausa"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Time.timeScale",
          "0f"
        ]
      }
    }
  ],
  "csharp_ch7": [
    {
      "id": "sq7_1",
      "title": "Câmara 1: Estrutura da Fila de Objetos (Queue)",
      "description": "Estruture o repositório de reaproveitamento de instâncias (Object Pool) instanciando uma fila genérica Queue<int>. Insira 3 elementos com Enqueue e exiba no Console: Pool Inicializado com 3 Instâncias",
      "instructions": "Declare a fila Queue, insira elementos com Enqueue e exiba a contagem com pool.Count.",
      "starterCode": "using System.Collections.Generic;\nusing UnityEngine;\n\npublic class Camara7_1 : MonoBehaviour\n{\n    void Start()\n    {\n        Queue<int> pool = new Queue<int>();\n        pool.Enqueue(1);\n        pool.Enqueue(2);\n        pool.Enqueue(3);\n        Debug.Log($\"Pool Inicializado com {pool.Count} Instâncias\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pool Inicializado com 3 Instâncias"
        }
      ],
      "reward": {
        "exp": 330,
        "coins": 165
      },
      "tests": [
        {
          "input": "",
          "expected": "Pool Inicializado com 3 Instâncias",
          "description": "Câmara 1: Estrutura da Fila de Objetos (Queue)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Queue<int>",
          "Enqueue",
          "Count"
        ]
      }
    },
    {
      "id": "sq7_2",
      "title": "Câmara 2: Ativação Reutilizável (SetActive)",
      "description": "Reative uma entidade previamente reciclada no pool sem incorrer no custo de CPU do Instantiate, ativando sua hierarquia com SetActive(true). Exiba no Console: Objeto Reativado sem Alocação",
      "instructions": "Chame SetActive(true) no objeto e exiba a confirmação no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara7_2 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Objeto Reativado sem Alocação\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Objeto Reativado sem Alocação"
        }
      ],
      "reward": {
        "exp": 340,
        "coins": 170
      },
      "tests": [
        {
          "input": "",
          "expected": "Objeto Reativado sem Alocação",
          "description": "Câmara 2: Ativação Reutilizável (SetActive)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "SetActive",
          "true"
        ]
      }
    },
    {
      "id": "sq7_3",
      "title": "Câmara 3: Devolução ao Repositório",
      "description": "Ao finalizar o ciclo de vida de um projétil na cena, desative seu GameObject com SetActive(false) para devolvê-lo ao pool. Exiba no Console: Projétil Devolvido ao Repositório",
      "instructions": "Desative o elemento com SetActive(false) e registre no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara7_3 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Projétil Devolvido ao Repositório\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Projétil Devolvido ao Repositório"
        }
      ],
      "reward": {
        "exp": 350,
        "coins": 175
      },
      "tests": [
        {
          "input": "",
          "expected": "Projétil Devolvido ao Repositório",
          "description": "Câmara 3: Devolução ao Repositório"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "SetActive",
          "false"
        ]
      }
    },
    {
      "id": "sq7_4",
      "title": "Câmara 4: Supressão de Garbage Collection",
      "description": "Aplique as diretrizes de zero alocações na execução por quadro para prevenir pausas do Garbage Collector. Emita no Console a confirmação de estabilidade: Memória Otimizada sem Alocação no Frame",
      "instructions": "Emita a confirmação de performance no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara7_4 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Memória Otimizada sem Alocação no Frame\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Memória Otimizada sem Alocação no Frame"
        }
      ],
      "reward": {
        "exp": 360,
        "coins": 180
      },
      "tests": [
        {
          "input": "",
          "expected": "Memória Otimizada sem Alocação no Frame",
          "description": "Câmara 4: Supressão de Garbage Collection"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq7_5",
      "title": "Câmara 5: Unity 6 UnityEngine.Pool API",
      "description": "Utilize a API moderna de pooling da Unity 6 (UnityEngine.Pool.ObjectPool) obtendo uma entidade através do método pool.Get(). Exiba no Console: Entidade Obtida via Unity ObjectPool",
      "instructions": "Simule ou invoque pool.Get() e registre o sucesso no Console.",
      "starterCode": "using UnityEngine;\n\npublic class Camara7_5 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Entidade Obtida via Unity ObjectPool\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Entidade Obtida via Unity ObjectPool"
        }
      ],
      "reward": {
        "exp": 390,
        "coins": 195
      },
      "tests": [
        {
          "input": "",
          "expected": "Entidade Obtida via Unity ObjectPool",
          "description": "Câmara 5: Unity 6 UnityEngine.Pool API"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Debug.Log"
        ]
      }
    }
  ],
  "csharp_ch8": [
    {
      "id": "sq8_1",
      "title": "Câmara 1: Inscrição em Ações C# (System.Action)",
      "description": "Declare um evento estático desacoplado utilizando a assinatura de delegate System.Action chamado OnBossDerrotado. Inscreva um ouvinte, dispare o evento e exiba no Console: Alerta: Chefe do Andar Derrotado!",
      "instructions": "Declare public static event Action OnBossDerrotado; e invoque com Invoke().",
      "starterCode": "using System;\nusing UnityEngine;\n\npublic class Camara8_1 : MonoBehaviour\n{\n    public static event Action OnBossDerrotado;\n\n    void Start()\n    {\n        OnBossDerrotado += () => Debug.Log(\"Alerta: Chefe do Andar Derrotado!\");\n        OnBossDerrotado?.Invoke();\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alerta: Chefe do Andar Derrotado!"
        }
      ],
      "reward": {
        "exp": 400,
        "coins": 200
      },
      "tests": [
        {
          "input": "",
          "expected": "Alerta: Chefe do Andar Derrotado!",
          "description": "Câmara 1: Inscrição em Ações C# (System.Action)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "event",
          "Action",
          "OnBossDerrotado",
          "Invoke"
        ]
      }
    },
    {
      "id": "sq8_2",
      "title": "Câmara 2: UnityEvent e Desacoplamento",
      "description": "Configure e dispare uma notificação serializável de evento utilizando UnityEvent da biblioteca UnityEngine.Events. Emita no Console: Evento Desacoplado Disparado",
      "instructions": "Instancie UnityEvent, chame Invoke() e exiba a confirmação.",
      "starterCode": "using UnityEngine;\nusing UnityEngine.Events;\n\npublic class Camara8_2 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Evento Desacoplado Disparado\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Evento Desacoplado Disparado"
        }
      ],
      "reward": {
        "exp": 420,
        "coins": 210
      },
      "tests": [
        {
          "input": "",
          "expected": "Evento Desacoplado Disparado",
          "description": "Câmara 2: UnityEvent e Desacoplamento"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "UnityEvent",
          "Invoke"
        ]
      }
    },
    {
      "id": "sq8_3",
      "title": "Câmara 3: Desinscrição no OnDestroy (Prevenção de Leaks)",
      "description": "Previna vazamento de memória (Memory Leaks) removendo as inscrições de delegates estáticos quando o GameObject for finalizado em OnDestroy(). Exiba no Console: Ouvinte Removido no OnDestroy",
      "instructions": "Declare o método void OnDestroy() e emita o log de limpeza.",
      "starterCode": "using UnityEngine;\n\npublic class Camara8_3 : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Ouvinte Removido no OnDestroy\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Ouvinte Removido no OnDestroy"
        }
      ],
      "reward": {
        "exp": 440,
        "coins": 220
      },
      "tests": [
        {
          "input": "",
          "expected": "Ouvinte Removido no OnDestroy",
          "description": "Câmara 3: Desinscrição no OnDestroy (Prevenção de Leaks)"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "void OnDestroy",
          "Debug.Log"
        ]
      }
    },
    {
      "id": "sq8_4",
      "title": "Câmara 4: Delegates Genéricos com Parâmetros",
      "description": "Crie uma ação genérica que transporte dados para os ouvintes através de System.Action<int>. Invoque passando o valor de 1000 pontos e exiba no Console: Nova Pontuação Registrada: 1000",
      "instructions": "Declare Action<int>, invoque com o valor 1000 e emita a mensagem formatada.",
      "starterCode": "using System;\nusing UnityEngine;\n\npublic class Camara8_4 : MonoBehaviour\n{\n    void Start()\n    {\n        Action<int> pontuacao = (p) => Debug.Log(\"Nova Pontuação Registrada: \" + p);\n        pontuacao(1000);\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Nova Pontuação Registrada: 1000"
        }
      ],
      "reward": {
        "exp": 460,
        "coins": 230
      },
      "tests": [
        {
          "input": "",
          "expected": "Nova Pontuação Registrada: 1000",
          "description": "Câmara 4: Delegates Genéricos com Parâmetros"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
          "Action<int>",
          "1000"
        ]
      }
    },
    {
      "id": "sq8_5",
      "title": "Câmara 5: A Ascensão ao Pináculo do Abismo",
      "description": "Você atingiu o cume do Abismo Dimensional C# Unity! Execute o rito final de maestria selando a conquista de todas as 45 câmaras. Emita no Console com orgulho: ASCENSÃO CONCLUÍDA: Mestre do Abismo C# Unity!",
      "instructions": "No método Start(), emita a proclamação final de vitória no Abismo.",
      "starterCode": "using UnityEngine;\n\npublic class AscensaoAbismo : MonoBehaviour\n{\n    void Start()\n    {\n        // Conclua a grande ascensão do Abismo\n        Debug.Log(\"ASCENSÃO CONCLUÍDA: Mestre do Abismo C# Unity!\");\n    }\n}",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "ASCENSÃO CONCLUÍDA: Mestre do Abismo C# Unity!"
        }
      ],
      "reward": {
        "exp": 600,
        "coins": 350
      },
      "tests": [
        {
          "input": "",
          "expected": "ASCENSÃO CONCLUÍDA: Mestre do Abismo C# Unity!",
          "description": "Câmara 5: A Ascensão ao Pináculo do Abismo"
        }
      ],
      "validationRules": {
        "requiredPatterns": [
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
