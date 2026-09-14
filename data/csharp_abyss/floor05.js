/**
 * GUILDCODE — C# Unity Abyss Floor 5 Data (csharp_ch5)
 */
const CSHARP_ABYSS_FLOOR_05 = [
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
];

if (typeof module !== "undefined") {
  module.exports = { CSHARP_ABYSS_FLOOR_05 };
}
if (typeof window !== "undefined") {
  window.CSHARP_ABYSS_FLOOR_05 = CSHARP_ABYSS_FLOOR_05;
}
