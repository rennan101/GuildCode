/**
 * GUILDCODE - C# Unity Abyss Chambers Data (45 Quests across 9 Floors)
 */
const CSHARP_SIDE_QUESTS = {
  "csharp_ch0": [
    {
      "id": "sq0_1",
      "title": "Câmara 1: Alocação de Memória Primitiva",
      "description": "Declare uma variável inteira chamada `pontos` com o valor `250` e imprima no console `Pontos: 250` usando `Debug.Log`.",
      "instructions": "No método `Start()`, declare `int pontos = 250;` e imprima `Debug.Log(\"Pontos: \" + pontos);`.",
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
      ]
    },
    {
      "id": "sq0_2",
      "title": "Câmara 2: Ponto Flutuante e Precisão",
      "description": "Na Unity, velocidades e deltas usam floats terminados em f. Declare um float `velocidade` com valor `7.5f` e imprima `Velocidade: 7.5`.",
      "instructions": "Declare `float velocidade = 7.5f;` e use `Debug.Log(\"Velocidade: \" + velocidade);`.",
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
      ]
    },
    {
      "id": "sq0_3",
      "title": "Câmara 3: Identificador do Guardião",
      "description": "Declare uma string `nome` com o valor `\"Kael\"` e um booleano `ativo` com valor `true`. Imprima `Guardião: Kael | Status: True`.",
      "instructions": "Declare `string nome = \"Kael\";` e `bool ativo = true;` e imprima `Debug.Log($\"Guardião: {nome} | Status: {ativo}\");`.",
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
      ]
    },
    {
      "id": "sq0_4",
      "title": "Câmara 4: Cálculos Aritméticos de Mana",
      "description": "Um mago possui `baseMana = 100` e ganha um bônus de `45`. Calcule o total e imprima `Mana Total: 145`.",
      "instructions": "Declare `int baseMana = 100; int bonus = 45; int total = baseMana + bonus;` e imprima `Debug.Log(\"Mana Total: \" + total);`.",
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
      ]
    },
    {
      "id": "sq0_5",
      "title": "Câmara 5: Limiar da Sobrecarga",
      "description": "Verifique se a energia ultrapassou 100. Declare `int energia = 120;`. Se `energia > 100`, imprima `Sobrecarga Ativada!`.",
      "instructions": "Declare `int energia = 120;` e faça `if (energia > 100) { Debug.Log(\"Sobrecarga Ativada!\"); }`.",
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
      ]
    }
  ],
  "csharp_ch1": [
    {
      "id": "sq1_1",
      "title": "Câmara 1: Despertar do Ciclo (Awake vs Start)",
      "description": "Em scripts da Unity, `Awake` ocorre antes de qualquer `Start`. Crie o método `void Awake()` e imprima `Awake: Sistema Inicializado`.",
      "instructions": "Implemente o método `void Awake()` e use `Debug.Log(\"Awake: Sistema Inicializado\");`.",
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
      ]
    },
    {
      "id": "sq1_2",
      "title": "Câmara 2: Portão das Condições",
      "description": "Declare `int nivel = 5;`. Se `nivel >= 5`, imprima `Acesso ao Santuário Concedido`, senão `Acesso Negado`.",
      "instructions": "Use `if (nivel >= 5) Debug.Log(\"Acesso ao Santuário Concedido\"); else Debug.Log(\"Acesso Negado\");`.",
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
      ]
    },
    {
      "id": "sq1_3",
      "title": "Câmara 3: Seleção de Elemento (Switch)",
      "description": "Declare `string elemento = \"Fogo\";`. Usando switch ou if, se for \"Fogo\", imprima `Dano Ígneo Amplificado`.",
      "instructions": "Verifique o elemento e exiba a mensagem correspondente.",
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
      ]
    },
    {
      "id": "sq1_4",
      "title": "Câmara 4: Pulso de Execução em Loop",
      "description": "Gere uma sequência de recarga de 1 a 3. Imprima `Pulso 1`, `Pulso 2`, `Pulso 3` usando um loop `for`.",
      "instructions": "Execute um `for (int i = 1; i <= 3; i++)` imprimindo `Debug.Log(\"Pulso \" + i);`.",
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
      ]
    },
    {
      "id": "sq1_5",
      "title": "Câmara 5: Sentinela de Estado",
      "description": "Declare `bool combateAtivo = true; int municao = 15;`. Se ambos forem válidos (`combateAtivo && municao > 0`), imprima `Pronto para o Combate`.",
      "instructions": "Faça a checagem lógica combinada com `&&` e imprima a mensagem.",
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
      ]
    }
  ],
  "csharp_ch2": [
    {
      "id": "sq2_1",
      "title": "Câmara 1: Coordenadas no Espaço 3D",
      "description": "Crie um `Vector3 pos = new Vector3(10f, 0f, 5f);` e imprima `Posição: (10, 0, 5)`.",
      "instructions": "Imprima `Debug.Log($\"Posição: ({pos.x}, {pos.y}, {pos.z})\");`.",
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
      ]
    },
    {
      "id": "sq2_2",
      "title": "Câmara 2: Vetor de Direção Normalizada",
      "description": "Crie um vetor `Vector3 dir = Vector3.forward;` e imprima `Direção: (0, 0, 1)`.",
      "instructions": "Instancie ou pegue `Vector3 dir = Vector3.forward;` e exiba suas coordenadas `Debug.Log($\"Direção: ({dir.x}, {dir.y}, {dir.z})\");`.",
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
      ]
    },
    {
      "id": "sq2_3",
      "title": "Câmara 3: Medição de Distância Euclidiana",
      "description": "Dados `Vector3 p1 = Vector3.zero;` e `Vector3 p2 = new Vector3(0, 10, 0);`, calcule a distância com `Vector3.Distance(p1, p2)` e imprima `Distância: 10`.",
      "instructions": "Calcule a distância com `Vector3.Distance` e imprima `Debug.Log(\"Distância: \" + dist);`.",
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
      ]
    },
    {
      "id": "sq2_4",
      "title": "Câmara 4: Interpolação Linear (Lerp)",
      "description": "Interpole de 0 a 100 com fator `0.5f` usando `Mathf.Lerp(0f, 100f, 0.5f)`. Imprima `Resultado Lerp: 50`.",
      "instructions": "Declare `float res = Mathf.Lerp(0f, 100f, 0.5f);` e imprima `Debug.Log(\"Resultado Lerp: \" + res);`.",
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
      ]
    },
    {
      "id": "sq2_5",
      "title": "Câmara 5: Translação no Espaço Global",
      "description": "Um objeto se desloca somando `Vector3 vel = new Vector3(2, 0, 0)` com `Vector3 pos = new Vector3(3, 1, 0)`. Calcule a nova posição e imprima `Nova Posição: (5, 1, 0)`.",
      "instructions": "Some os vetores e imprima `Debug.Log($\"Nova Posição: ({novaPos.x}, {novaPos.y}, {novaPos.z})\");`.",
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
      ]
    }
  ],
  "csharp_ch3": [
    {
      "id": "sq3_1",
      "title": "Câmara 1: Obtenção de Componente Físico",
      "description": "Em Unity, usamos `GetComponent<Rigidbody>()`. Simule verificando se `rb != null`. Se for, imprima `Rigidbody Conectado com Sucesso`.",
      "instructions": "Declare `Rigidbody rb = GetComponent<Rigidbody>();` e imprima a mensagem caso exista.",
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
      ]
    },
    {
      "id": "sq3_2",
      "title": "Câmara 2: Aplicação de Força de Impulso",
      "description": "Configure um impulso vertical aplicando `rb.AddForce(Vector3.up * 10f, ForceMode.Impulse);`. Imprima `Impulso Aplicado: 10N`.",
      "instructions": "Adicione a força e imprima `Debug.Log(\"Impulso Aplicado: 10N\");`.",
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
      ]
    },
    {
      "id": "sq3_3",
      "title": "Câmara 3: Trava de Gravidade Cinética",
      "description": "Para impedir que um guardião caia no abismo, defina `rb.useGravity = false;` e imprima `Gravidade Desativada`.",
      "instructions": "Desative a gravidade e imprima a mensagem correspondente no Console.",
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
      ]
    },
    {
      "id": "sq3_4",
      "title": "Câmara 4: Ajuste de Arrasto Linear (Drag)",
      "description": "Defina o arrasto linear do Rigidbody `rb.linearDamping = 2.5f;` (ou `drag`) e imprima `Arrasto Linear: 2.5`.",
      "instructions": "Configure o valor de arrasto e use `Debug.Log(\"Arrasto Linear: 2.5\");`.",
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
      ]
    },
    {
      "id": "sq3_5",
      "title": "Câmara 5: Ciclo Físico FixedUpdate",
      "description": "No ciclo da Unity, operações físicas pertencem a `FixedUpdate()`. Crie o método `void FixedUpdate()` e imprima `Passo Físico Sincronizado`.",
      "instructions": "Escreva o método `void FixedUpdate()` imprimindo `Debug.Log(\"Passo Físico Sincronizado\");`.",
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
      ]
    }
  ],
  "csharp_ch4": [
    {
      "id": "sq4_1",
      "title": "Câmara 1: Detecção de Colisão Física",
      "description": "Quando dois sólidos colidem, `OnCollisionEnter(Collision collision)` é invocado. Imprima `Colisão Detectada com Inimigo` ao colidir.",
      "instructions": "Implemente `void OnCollisionEnter(Collision col)` e imprima `Debug.Log(\"Colisão Detectada com Inimigo\");`.",
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
      ]
    },
    {
      "id": "sq4_2",
      "title": "Câmara 2: Zona de Gatilho (IsTrigger)",
      "description": "Gatilhos etéreos usam `OnTriggerEnter(Collider other)`. Imprima `Zona de Cura Ativada` ao entrar no trigger.",
      "instructions": "Implemente `void OnTriggerEnter(Collider other)` com o respectivo `Debug.Log`.",
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
      ]
    },
    {
      "id": "sq4_3",
      "title": "Câmara 3: Filtragem por Tags",
      "description": "Verifique se o colisor possui a tag `\"Player\"` com `other.CompareTag(\"Player\")`. Se positivo, imprima `Jogador Identificado`.",
      "instructions": "No método do gatilho ou Start, compare a tag e exiba a confirmação.",
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
      ]
    },
    {
      "id": "sq4_4",
      "title": "Câmara 4: Absorção de Projétil e Destruição",
      "description": "Ao destruir um projétil ao colidir, chama-se `Destroy(gameObject);`. Imprima `Projétil Destruído no Impacto`.",
      "instructions": "Simule a destruição e emita o log especificado.",
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
      ]
    },
    {
      "id": "sq4_5",
      "title": "Câmara 5: Ponto de Impacto dos Guardiões",
      "description": "Recupere o primeiro ponto de contato `Vector3 ponto = collision.contacts[0].point;`. Imprima `Impacto no Ponto de Contato`.",
      "instructions": "No método `OnCollisionEnter`, imprima `Debug.Log(\"Impacto no Ponto de Contato\");`.",
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
      ]
    }
  ],
  "csharp_ch5": [
    {
      "id": "sq5_1",
      "title": "Câmara 1: Definição de ScriptableObject",
      "description": "ScriptableObjects armazenam dados desacoplados da cena. Crie uma classe `ItemData` que herda de `ScriptableObject`. No Start de teste, imprima `ScriptableObject Definido`.",
      "instructions": "Declare a classe e no Start imprima `Debug.Log(\"ScriptableObject Definido\");`.",
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
      ]
    },
    {
      "id": "sq5_2",
      "title": "Câmara 2: Atributo CreateAssetMenu",
      "description": "Para criar assets pelo menu da Unity, decoramos a classe com `[CreateAssetMenu(fileName = \"NovoItem\", menuName = \"Inventario/Item\")]`. Imprima `Menu de Criação Configurado`.",
      "instructions": "Imprima a mensagem de sucesso no Start.",
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
      ]
    },
    {
      "id": "sq5_3",
      "title": "Câmara 3: Atributos de Inspector (Header e Range)",
      "description": "Configure atributos visuais como `[Header(\"Atributos\")]` e `[Range(0, 100)] public int poder;`. Imprima `Poder Configurado: 80`.",
      "instructions": "Declare o campo com Range e no Start exiba o valor formatado.",
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
      ]
    },
    {
      "id": "sq5_4",
      "title": "Câmara 4: Leitura de Tabela de Dados",
      "description": "Leia o dano base de uma arma contida num ScriptableObject `arma.dano = 45;`. Imprima `Dano da Arma: 45`.",
      "instructions": "Leia a variável de dano e imprima `Debug.Log(\"Dano da Arma: \" + dano);`.",
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
      ]
    },
    {
      "id": "sq5_5",
      "title": "Câmara 5: Instanciação em Runtime",
      "description": "Para clonar um ScriptableObject sem afetar o disco, usamos `ScriptableObject.CreateInstance<ItemData>()`. Imprima `Instância Criada em Tempo de Execução`.",
      "instructions": "Execute a instanciação ou simule e imprima a saída esperada.",
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
      ]
    }
  ],
  "csharp_ch6": [
    {
      "id": "sq6_1",
      "title": "Câmara 1: Rotina Temporal IEnumerator",
      "description": "Coroutines usam `IEnumerator`. Crie uma coroutine `IEnumerator Contagem()` que aguarda e imprima `Iniciando Coroutine Temporal`.",
      "instructions": "Inicie a Coroutine com `StartCoroutine(Contagem());` e imprima a mensagem inicial.",
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
      ]
    },
    {
      "id": "sq6_2",
      "title": "Câmara 2: Suspensão por WaitForSeconds",
      "description": "Use `yield return new WaitForSeconds(1.0f);` dentro de uma coroutine. Imprima `Espera Concluída: 1.0s`.",
      "instructions": "Emita o log indicando o término da espera temporal.",
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
      ]
    },
    {
      "id": "sq6_3",
      "title": "Câmara 3: Espera por Fim de Quadro",
      "description": "A instrução `yield return null;` aguarda exatamente um quadro (frame). Imprima `Próximo Quadro Atingido`.",
      "instructions": "Imprima a mensagem correspondente no console.",
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
      ]
    },
    {
      "id": "sq6_4",
      "title": "Câmara 4: Cancelamento com StopCoroutine",
      "description": "Para interromper loops infinitos assíncronos, chamamos `StopCoroutine(...)`. Imprima `Coroutine Interrompida com Segurança`.",
      "instructions": "Exiba no console o log de cancelamento da coroutine.",
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
      ]
    },
    {
      "id": "sq6_5",
      "title": "Câmara 5: Escala de Tempo e Pausa",
      "description": "Defina `Time.timeScale = 0f;` para pausar o jogo. Imprima `Tempo Congelado: timeScale 0`.",
      "instructions": "Configure o timeScale e imprima a mensagem exata.",
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
      ]
    }
  ],
  "csharp_ch7": [
    {
      "id": "sq7_1",
      "title": "Câmara 1: Estrutura da Fila de Objetos (Queue)",
      "description": "Em Object Pooling, usamos `Queue<GameObject> pool = new Queue<GameObject>();`. Adicione 3 elementos virtuais e imprima `Pool Inicializado com 3 Instâncias`.",
      "instructions": "Imprima `Debug.Log(\"Pool Inicializado com 3 Instâncias\");`.",
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
      ]
    },
    {
      "id": "sq7_2",
      "title": "Câmara 2: Ativação Reutilizável (SetActive)",
      "description": "Em vez de `Instantiate`, ativamos o item reciclado com `obj.SetActive(true);`. Imprima `Objeto Reativado sem Alocação`.",
      "instructions": "Imprima o log de reativação sem alocação.",
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
      ]
    },
    {
      "id": "sq7_3",
      "title": "Câmara 3: Devolução ao Repositório",
      "description": "Ao terminar de usar o projétil, desativamos com `SetActive(false)` e reinserimos na fila. Imprima `Projétil Devolvido ao Repositório`.",
      "instructions": "Imprima a mensagem de devolução ao repositório.",
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
      ]
    },
    {
      "id": "sq7_4",
      "title": "Câmara 4: Supressão de Garbage Collection",
      "description": "Concatenações em loop geram lixo para o GC. Use `System.Text.StringBuilder` ou loops otimizados. Imprima `Memória Otimizada sem Alocação no Frame`.",
      "instructions": "Imprima a mensagem no console.",
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
      ]
    },
    {
      "id": "sq7_5",
      "title": "Câmara 5: Unity 6 UnityEngine.Pool API",
      "description": "Unity moderna possui `UnityEngine.Pool.ObjectPool<T>`. Instancie ou simule a chamada `pool.Get()` e imprima `Entidade Obtida via Unity ObjectPool`.",
      "instructions": "Imprima a mensagem no console.",
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
      ]
    }
  ],
  "csharp_ch8": [
    {
      "id": "sq8_1",
      "title": "Câmara 1: Inscrição em Ações C# (System.Action)",
      "description": "Declare `public static event System.Action OnBossDerrotado;`. Crie um ouvinte que imprima `Alerta: Chefe do Andar Derrotado!`.",
      "instructions": "Dispare a ação ou invoque o ouvinte emitindo o log esperado.",
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
      ]
    },
    {
      "id": "sq8_2",
      "title": "Câmara 2: UnityEvent e Desacoplamento",
      "description": "Configure um `UnityEngine.Events.UnityEvent meuEvento;`. Invoque-o e imprima `Evento Desacoplado Disparado`.",
      "instructions": "Emita a mensagem de confirmação do evento.",
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
      ]
    },
    {
      "id": "sq8_3",
      "title": "Câmara 3: Desinscrição no OnDestroy (Prevenção de Leaks)",
      "description": "Para evitar vazamento de memória com delegates estáticos, desinscreva-se em `OnDestroy()` ou `OnDisable()`. Imprima `Ouvinte Removido no OnDestroy`.",
      "instructions": "Implemente o log no método correspondente ou Start de validação.",
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
      ]
    },
    {
      "id": "sq8_4",
      "title": "Câmara 4: Delegates Genéricos com Parâmetros",
      "description": "Crie uma `System.Action<int> OnPontuacaoAlterada;`. Invoque passando `1000` e imprima `Nova Pontuação Registrada: 1000`.",
      "instructions": "Invoque o delegate passando 1000 e imprima a mensagem exata.",
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
      ]
    },
    {
      "id": "sq8_5",
      "title": "Câmara 5: A Ascensão ao Pináculo do Abismo",
      "description": "Você alcançou a câmara final do Abismo C# Unity! Execute a rotina final de vitória invocando o selo do Guardião Mestre. Imprima `ASCENSÃO CONCLUÍDA: Mestre do Abismo C# Unity!`.",
      "instructions": "No método `Start()`, imprima `Debug.Log(\"ASCENSÃO CONCLUÍDA: Mestre do Abismo C# Unity!\");`.",
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
      ]
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CSHARP_SIDE_QUESTS };
}
