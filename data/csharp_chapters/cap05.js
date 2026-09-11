/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 05
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 05 — ARRAYS E LISTAS
// ═══════════════════════════════════════════════════════

const CAP_05 = {
    id: 5,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 3, maxStars: 5 },
    title: "Arrays e Listas",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Vetor de Armazenamento",
    unlockIcon: "[ARR]",
    character: "kael",
    xpReward: 120,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Despertando a Armaria e o Banco de Dados Contíguo. Coleções estruturadas ativas."
            },
            {
                    "type": "narrative",
                    "text": "Kael Thorn martela uma lâmina reluzente sobre a bigorna rúnica, organizando dezenas de peças forjadas em prateleiras demarcadas por índices."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Um guerreiro de respeito não carrega uma variável solta para cada item! Ele precisa de coleções ordenadas. Quando o tamanho é fixo e imutável, usamos Arrays como <code>string[] itens</code> ou <code>int[] pontuacoes</code>."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Mas no calor da aventura, o inventário muda constantemente: novas poções são coletadas com <code>.Add()</code> e pergaminhos usados são descartados com <code>.Remove()</code>. Para coleções dinâmicas, utilizamos <code>List&lt;T&gt;</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Lembre-se: em C#, coleções utilizam indexação baseada em zero (<code>itens[0]</code>). Arrays fixos possuem a propriedade <code>.Length</code>, enquanto listas dinâmicas utilizam <code>.Count</code>. Domine ambos para gerenciar inventários e ranqueamentos."
            }
    ],
    concept: {
        title: "COLEÇÕES EM C#: ARRAYS FIXOS, LAÇO FOREACH E LISTAS DINÂMICAS (LIST<T>)",
        explanation: "Coleções agrupam múltiplos elementos do mesmo tipo sob um único identificador organizado na memória:\n<ul>\n  <li><strong>Arrays Unidimensionais Fixos:</strong> Possuem tamanho imutável definido na criação. Cada elemento é acessado pelo índice que inicia em 0 até <code>tamanho - 1</code>: <code>string[] itens = { \"Espada\", \"Escudo\", \"Pocao\" };</code>. O primeiro item é obtido com <code>itens[0]</code> e o comprimento total é lido pela propriedade <code>itens.Length</code>.</li>\n  <li><strong>Laço Tradicional (<code>for</code>):</strong> Recomendado quando precisamos do índice numérico para manipular ou alterar posições específicas: <code>for (int i = 0; i &lt; pontuacoes.Length; i++)</code>.</li>\n  <li><strong>Laço Iterativo (<code>foreach</code>):</strong> A forma mais limpa, legível e segura em C# para percorrer coleções do início ao fim sem precisar gerenciar índices manuais. A sintaxe é <code>foreach (tipo elemento in colecao)</code>. Exemplo: <code>foreach (int p in pontuacoes) Debug.Log(\"Pontos: \" + p);</code>. O <code>foreach</code> é ideal para leitura sequencial de dados de jogo (inventários, pontos de vida de party, listas de inimigos).</li>\n  <li><strong>Listas Dinâmicas (<code>List&lt;T&gt;</code>):</strong> Importadas de <code>System.Collections.Generic</code>, podem expandir ou diminuir em tempo real durante a gameplay: <code>List&lt;string&gt; inventario = new List&lt;string&gt;();</code>.</li>\n  <li><strong>Métodos de Listas:</strong> Adicionamos novos elementos no fim da fila com <code>.Add(\"Elmo\")</code> e removemos instâncias com <code>.Remove(\"Fogo\")</code>. O número total de elementos armazenados em uma lista é lido com a propriedade <code>.Count</code> (diferente de arrays que usam <code>.Length</code>).</li>\n  <li><strong>Busca de Maior Valor em Coleções:</strong> Inicializamos uma variável comparadora com o primeiro elemento e percorremos o restante atualizando o ápice com <code>if (valor &gt; maior) maior = valor;</code>.</li>\n</ul>",
        code: `using UnityEngine;
using System.Collections.Generic;

public class ExemploColecoes : MonoBehaviour
{
    void Start()
    {
        // 1. Array fixo de textos indexado em zero
        string[] itens = { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]); // Acessa o primeiro elemento no índice 0

        // 2. Iteração com for tradicional usando a propriedade Length
        int[] pontuacoes = { 10, 20, 30 };
        for (int i = 0; i < pontuacoes.Length; i++)
        {
            Debug.Log("Pontos via For: " + pontuacoes[i]); // Acessa cada posição através do índice i
        }

        // 3. Iteração simplificada e segura com foreach (lê cada elemento diretamente)
        foreach (int ponto in pontuacoes)
        {
            Debug.Log("Pontos via Foreach: " + ponto); // Recebe o valor de cada item sem precisar de índice
        }

        // 4. Lista dinâmica que pode crescer durante o jogo
        List<string> inventario = new List<string>();
        inventario.Add("Elmo");  // Insere "Elmo" na primeira posição
        inventario.Add("Bota");  // Insere "Bota" na segunda posição
        Debug.Log("Total de Itens: " + inventario.Count); // Lê a contagem atual de elementos (2)

        // 5. Remoção de itens de uma List<T>
        List<string> poderes = new List<string>() { "Fogo", "Gelo" };
        poderes.Remove("Fogo"); // Remove a ocorrência de "Fogo", restando apenas "Gelo"
        Debug.Log("Poder Ativo: " + poderes[0]); // "Gelo" agora ocupa o índice 0

        // 6. Algoritmo para encontrar o maior valor em um array
        int[] valores = { 15, 82, 43 };
        int maior = valores[0]; // Assume provisoriamente o primeiro item como o maior
        foreach (int v in valores)
        {
            if (v > maior) maior = v; // Atualiza caso encontre um valor superior
        }
        Debug.Log("Maior Valor: " + maior); // Exibe o ápice encontrado (82)
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerenciamento de Inventário e Pontuações",
        code: `using UnityEngine;
using System.Collections.Generic;

public class InventarioManager : MonoBehaviour
{
    void Start()
    {
        // Criação de array de equipamentos fixos de início de jogo
        string[] equipamentos = { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + equipamentos[0]); // Exibe "Espada"

        // Array de pontuações de batalha
        int[] scores = { 10, 20, 30 };
        // Percorrendo o array de scores com foreach
        foreach (int s in scores)
        {
            Debug.Log("Pontos: " + s); // Imprime individualmente 10, 20 e 30
        }

        // Instanciação de lista dinâmica para a mochila do herói
        List<string> mochila = new List<string>();
        mochila.Add("Elmo"); // Adiciona o primeiro artefato
        mochila.Add("Bota"); // Adiciona o segundo artefato
        Debug.Log("Total de Itens: " + mochila.Count); // Total de itens: 2

        // Lista de magias ativas
        List<string> magias = new List<string>() { "Fogo", "Gelo" };
        magias.Remove("Fogo"); // Descarta "Fogo"
        Debug.Log("Poder Ativo: " + magias[0]); // Exibe a magia restante: "Gelo"

        // Busca do maior número usando foreach
        int[] numeros = { 15, 82, 43 };
        int maior = numeros[0];
        foreach (int num in numeros)
        {
            if (num > maior) maior = num; // Atualiza a maior pontuação
        }
        Debug.Log("Maior: " + maior); // Exibe 82
    }
}`,
        output: "Item Equipado: Espada\nPontos: 10\nPontos: 20\nPontos: 30\nTotal de Itens: 2\nPoder Ativo: Gelo\nMaior: 82"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Arrays e Listas e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using System.Collections.Generic;

public class ExemploColecoes : MonoBehaviour
{
    void Start()
    {
        // 1. Array fixo de textos indexado em zero
        string[] itens = { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]); // Acessa o primeiro elemento no índice 0

        // 2. Iteração com for tradicional usando a propriedade Length
        int[] pontuacoes = { 10, 20, 30 };
        for (int i = 0; i < pontuacoes.Length; i++)
        {
            Debug.Log("Pontos via For: " + pontuacoes[i]); // Acessa cada posição através do índice i
        }

        // 3. Iteração simplificada e segura com foreach (lê cada elemento diretamente)
        foreach (int ponto in pontuacoes)
        {
            Debug.Log("Pontos via Foreach: " + ponto); // Recebe o valor de cada item sem precisar de índice
        }

        // 4. Lista dinâmica que pode crescer durante o jogo
        List<string> inventario = new List<string>();
        inventario.Add("Elmo");  // Insere "Elmo" na primeira posição
        inventario.Add("Bota");  // Insere "Bota" na segunda posição
        Debug.Log("Total de Itens: " + inventario.Count); // Lê a contagem atual de elementos (2)

        // 5. Remoção de itens de uma List<T>
        List<string> poderes = new List<string>() { "Fogo", "Gelo" };
        poderes.Remove("Fogo"); // Remove a ocorrência de "Fogo", restando apenas "Gelo"
        Debug.Log("Poder Ativo: " + poderes[0]); // "Gelo" agora ocupa o índice 0

        // 6. Algoritmo para encontrar o maior valor em um array
        int[] valores = { 15, 82, 43 };
        int maior = valores[0]; // Assume provisoriamente o primeiro item como o maior
        foreach (int v in valores)
        {
            if (v > maior) maior = v; // Atualiza caso encontre um valor superior
        }
        Debug.Log("Maior Valor: " + maior); // Exibe o ápice encontrado (82)
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Arrays e Listas:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array itens e exiba o primeiro item
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] itens = new string[] { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);
    }
}`,
                hint: "Item Equipado: Espada"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_5_1",
            title: "Acesso a Elemento de Array",
            difficulty: "easy",
            description: "Declare um array de strings itens com três nomes: 'Espada', 'Escudo' e 'Pocao'. Acesse o primeiro item pelo índice 0 e exiba 'Item Equipado: ' + itens[0].",
            validationRules: { requiredPatterns: ["string[] itens","itens[0]","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array itens e exiba o primeiro item
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] itens = new string[] { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);
    }
}`,
            tests: [
                { input: "", expected: "Item Equipado: Espada", description: "Array index 0" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] itens, itens[0]" },
                { level: "II", text: "A saída no console deve conter exatamente: Item Equipado: Espada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] itens = new string[] { \"Espada\", \"Escudo\", \"Pocao\" };\n        Debug.Log(\"Item Equipado: \" + itens[0]);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] itens","itens[0]","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Item Equipado: Espada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_2",
            title: "Lendo Pontuacoes do Array",
            difficulty: "easy",
            description: "Declare um array de inteiros chamado pontuacoes com os valores 10, 20 e 30. Exiba o primeiro e o segundo elemento com Debug.Log no formato: Pontos: 10 e Pontos: 20.",
            validationRules: { requiredPatterns: ["pontuacoes", "Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // int[] pontuacoes = new int[] { 10, 20, 30 };
        // Debug.Log("Pontos: " + pontuacoes[0]);
        // Debug.Log("Pontos: " + pontuacoes[1]);
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int[] pontuacoes = new int[] { 10, 20, 30 };
        Debug.Log("Pontos: " + pontuacoes[0]);
        Debug.Log("Pontos: " + pontuacoes[1]);
    }
}`,
            tests: [
                { input: "", expected: "Pontos: 10", description: "Primeiro elemento do array" }
            ],
            hints: [
                { level: "I", text: "Arrays em C# guardam varios valores do mesmo tipo. O primeiro elemento fica no indice 0, o segundo no indice 1. Declare: int[] pontuacoes = new int[] { 10, 20, 30 };" },
                { level: "II", text: "Apos declarar o array, exiba os valores com:\n    Debug.Log(\"Pontos: \" + pontuacoes[0]);\n    Debug.Log(\"Pontos: \" + pontuacoes[1]);\nO resultado sera: Pontos: 10 e depois Pontos: 20." },
                { level: "III", text: "Codigo completo:\n    void Start()\n    {\n        int[] pontuacoes = new int[] { 10, 20, 30 };\n        Debug.Log(\"Pontos: \" + pontuacoes[0]);\n        Debug.Log(\"Pontos: \" + pontuacoes[1]);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Pontos: 10")) errors.push("A saida deve conter 'Pontos: 10'. Verifique se Debug.Log usa pontuacoes[0].");
                if (!output.includes("Pontos: 20")) errors.push("A saida deve conter 'Pontos: 20'. Verifique se Debug.Log usa pontuacoes[1].");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_3",
            title: "Adicionando Elementos em List<T>",
            difficulty: "medium",
            description: "Instancie uma lista dinâmica List<string> inventario = new List<string>();. Adicione 'Elmo' e 'Bota' usando .Add(). Exiba a contagem final no Console com 'Total de Itens: ' + inventario.Count.",
            validationRules: { requiredPatterns: ["List<string> inventario",".Add(","inventario.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie a lista, adicione os itens e imprima o Count
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        List<string> inventario = new List<string>();
        inventario.Add("Elmo");
        inventario.Add("Bota");
        Debug.Log("Total de Itens: " + inventario.Count);
    }
}`,
            tests: [
                { input: "", expected: "Total de Itens: 2", description: "List.Add e List.Count" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: List<string> inventario, .Add(" },
                { level: "II", text: "A saída no console deve conter exatamente: Total de Itens: 2" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        List<string> inventario = new List<string>();\n        inventario.Add(\"Elmo\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["List<string> inventario",".Add(","inventario.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total de Itens: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_4",
            title: "Contando Itens da Lista",
            difficulty: "medium",
            description: "Crie uma lista dinamica de strings chamada inventario. Adicione os itens Espada e Pocao usando .Add(). Exiba a contagem total com Debug.Log: Total: 2.",
            validationRules: { requiredPatterns: ["inventario", "Add", "Debug.Log"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // List<string> inventario = new List<string>();
        // inventario.Add("Espada");
        // inventario.Add("Pocao");
        // Debug.Log("Total: " + inventario.Count);
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        List<string> inventario = new List<string>();
        inventario.Add("Espada");
        inventario.Add("Pocao");
        Debug.Log("Total: " + inventario.Count);
    }
}`,
            tests: [
                { input: "", expected: "Total: 2", description: "Contagem de itens na lista" }
            ],
            hints: [
                { level: "I", text: "List<string> e uma colecao dinamica que cresce com .Add(). Crie a lista vazia com: List<string> inventario = new List<string>();. Depois adicione itens com inventario.Add(\"Espada\")." },
                { level: "II", text: "Apos adicionar 'Espada' e 'Pocao', a lista tem 2 itens. Use inventario.Count para obter a quantidade e exiba com:\n    Debug.Log(\"Total: \" + inventario.Count);" },
                { level: "III", text: "Codigo completo:\n    void Start()\n    {\n        List<string> inventario = new List<string>();\n        inventario.Add(\"Espada\");\n        inventario.Add(\"Pocao\");\n        Debug.Log(\"Total: \" + inventario.Count);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Total: 2")) errors.push("A saida deve ser 'Total: 2'. Adicione 2 itens com .Add() e use inventario.Count no Debug.Log.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 3, maxStars: 5 },
            title: "Maior Valor em Array",
            difficulty: "medium",
            description: "Declare um array de inteiros valores com { 15, 82, 43 }. Determine o maior valor e exiba 'Maior: ' + maior. (Dica: compare com if em um laço).",
            validationRules: { requiredPatterns: ["int[] valores","for","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int[] valores = new int[] { 15, 82, 43 };
        // Encontre o maior valor e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int[] valores = new int[] { 15, 82, 43 };
        int maior = valores[0];
        for (int i = 1; i < valores.Length; i++)
        {
            if (valores[i] > maior) maior = valores[i];
        }
        Debug.Log("Maior: " + maior);
    }
}`,
            tests: [
                { input: "", expected: "Maior: 82", description: "Busca de maior em array" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int[] valores, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Maior: 82" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int[] valores = new int[] { 15, 82, 43 };\n        int maior = valores[0];\n        for (int i = 1; i < valores.Length; i++)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int[] valores","for","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Maior: 82";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_05 };
}
if (typeof window !== "undefined") {
    window.CAP_05 = CAP_05;
}
