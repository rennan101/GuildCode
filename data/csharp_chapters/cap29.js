/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 29
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 29 — OBJECT POOLING & OTIMIZAÇÃO DE GC
// ═══════════════════════════════════════════════════════

const CAP_29 = {
    id: 29,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
    title: "Object Pooling & Otimização de GC",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Reservatório Pool",
    unlockIcon: "[POOL]",
    character: "lyra",
    xpReward: 360,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando o Padrão de Reutilização Contínua. Object Pooling e Controle de GC ativados."
            },
            {
                    "type": "narrative",
                    "text": "Lyra Nex organiza esteiras circulares de projéteis e partículas. Nenhum recurso é descartado: tudo o que cumpre sua missão é reciclado instantaneamente."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Chamar <code>Instantiate</code> e <code>Destroy</code> centenas de vezes por minuto é o maior erro de novatos! Isso aloca memória na heap e faz o temido **Garbage Collector (GC)** congelar o jogo com travamentos perceptíveis (stutters)."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "A solução profissional é o padrão **Object Pooling**! Pré-alocamos uma fila (<code>Queue&lt;GameObject&gt;</code>) com a capacidade necessária. Quando precisamos de uma bala, resgatamos com <code>Dequeue()</code> e ativamos. Quando ela atinge o alvo, apenas desativamos com <code>SetActive(false)</code> e devolvemos ao pool!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Com Object Pooling, o consumo de alocação de GC é zero bytes! Conclua as 5 atividades deste capítulo para dominar a reciclagem limpa de objetos."
            }
    ],
    concept: {
        title: "OBJECT POOLING: REUSO DE INSTÂNCIAS COM QUEUE, ZERO GC ALLOC E CONTROLE DE CAPACIDADE",
        explanation: "Object Pooling elimina quedas de FPS causadas por coletas periódicas do Garbage Collector:\n<ul>\n  <li><strong>Fila de Pooling (<code>Queue&lt;T&gt;</code>):</strong> Coleção do tipo Primeiro a Entrar, Primeiro a Sair (FIFO) usada para armazenar objetos em repouso: <code>Debug.Log(\"Pool Inicializado com Fila\");</code>.</li>\n  <li><strong>Resgate de Instância (<code>Dequeue</code>):</strong> Retira um objeto inativo da fila para uso imediato: <code>Debug.Log(\"Objeto Resgatado com Dequeue\");</code>.</li>\n  <li><strong>Zero Alocação de GC:</strong> Ao reutilizar instâncias já existentes, a alocação de bytes na memória gerenciada é nula (ex: <code>int gcAllocBytes = 0;</code> emitindo <code>\"Alocacao de GC Evitada: 0 bytes\"</code>).</li>\n  <li><strong>Devolução ao Pool (Desativação):</strong> Em vez de chamar <code>Destroy</code>, o objeto apenas tem seu estado alterado para <code>estaAtivo = false</code> e retorna ao pool (ex: <code>\"Objeto Devolvido ao Pool (Ativo: False)\"</code>).</li>\n  <li><strong>Capacidade Máxima do Pool:</strong> Limite total de unidades pré-alocadas para a cena (ex: <code>int capacidadeMaxima = 50;</code> emitindo <code>\"Capacidade do Pool: 50 unidades\"</code>).</li>\n</ul>",
        code: `using UnityEngine;
using System.Collections.Generic;

public class ExemploObjectPooling : MonoBehaviour
{
    void Start()
    {
        // 1. Inicialização do pool com Queue
        Debug.Log("Pool Inicializado com Fila");

        // 2. Resgate de elemento do pool
        Debug.Log("Objeto Resgatado com Dequeue");

        // 3. Eficiência de memória com zero alocação de GC
        int objetosInstanciados = 10;
        int gcAllocBytes = 0;
        Debug.Log("Alocacao de GC Evitada: " + gcAllocBytes + " bytes");

        // 4. Devolução e desativação
        bool estaAtivo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + estaAtivo + ")");

        // 5. Capacidade máxima configurada
        int capacidadeMaxima = 50;
        Debug.Log("Capacidade do Pool: " + capacidadeMaxima + " unidades");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Ciclo de Vida sem Coleta de Lixo",
        code: `using UnityEngine;

public class PoolReciclador : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Pool Inicializado com Fila");
        Debug.Log("Objeto Resgatado com Dequeue");

        int gc = 0;
        Debug.Log("Alocacao de GC Evitada: " + gc + " bytes");

        bool ativo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + ativo + ")");

        int cap = 50;
        Debug.Log("Capacidade do Pool: " + cap + " unidades");
    }
}`,
        output: "Pool Inicializado com Fila\nObjeto Resgatado com Dequeue\nAlocacao de GC Evitada: 0 bytes\nObjeto Devolvido ao Pool (Ativo: False)\nCapacidade do Pool: 50 unidades"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Object Pooling & Otimização de GC e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using System.Collections.Generic;

public class ExemploObjectPooling : MonoBehaviour
{
    void Start()
    {
        // 1. Inicialização do pool com Queue
        Debug.Log("Pool Inicializado com Fila");

        // 2. Resgate de elemento do pool
        Debug.Log("Objeto Resgatado com Dequeue");

        // 3. Eficiência de memória com zero alocação de GC
        int objetosInstanciados = 10;
        int gcAllocBytes = 0;
        Debug.Log("Alocacao de GC Evitada: " + gcAllocBytes + " bytes");

        // 4. Devolução e desativação
        bool estaAtivo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + estaAtivo + ")");

        // 5. Capacidade máxima configurada
        int capacidadeMaxima = 50;
        Debug.Log("Capacidade do Pool: " + capacidadeMaxima + " unidades");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Object Pooling & Otimização de GC:",
                starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o pool com Queue e enfileire um item
    }
}`,
                solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_1");
        Debug.Log("Pool Criado com: " + pool.Count + " item");
    }
}`,
                hint: "Pool Criado com: 1 item"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_29_1",
            title: "Fila de Pooling com Queue",
            difficulty: "easy",
            description: "Crie uma fila Queue<string> pool = new Queue<string>();. Adicione 'Projetil_1' usando .Enqueue('Projetil_1') e emita 'Pool Criado com: ' + pool.Count + ' item'.",
            validationRules: { requiredPatterns: ["Queue<string> pool",".Enqueue(","pool.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o pool com Queue e enfileire um item
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_1");
        Debug.Log("Pool Criado com: " + pool.Count + " item");
    }
}`,
            tests: [
                { input: "", expected: "Pool Criado com: 1 item", description: "Fila de pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Queue<string> pool, .Enqueue(" },
                { level: "II", text: "A saída no console deve conter exatamente: Pool Criado com: 1 item" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_1\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool",".Enqueue(","pool.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pool Criado com: 1 item";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_2",
            title: "Resgate de Instância (Dequeue)",
            difficulty: "easy",
            description: "Adicione 'Projetil_A' e 'Projetil_B' na fila. Resgate o primeiro elemento com pool.Dequeue() e emita 'Item Reutilizado: ' + item.",
            validationRules: { requiredPatterns: ["Queue<string> pool",".Dequeue()","Debug.Log"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Enfileire 2 itens e desinfileire 1
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_A");
        pool.Enqueue("Projetil_B");
        string item = pool.Dequeue();
        Debug.Log("Item Reutilizado: " + item);
    }
}`,
            tests: [
                { input: "", expected: "Item Reutilizado: Projetil_A", description: "Dequeue do pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Queue<string> pool, .Dequeue()" },
                { level: "II", text: "A saída no console deve conter exatamente: Item Reutilizado: Projetil_A" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_A\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool",".Dequeue()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Item Reutilizado: Projetil_A";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_3",
            title: "Reutilização Sem Garbage Collection",
            difficulty: "medium",
            description: "Declare int objetosInstanciados = 10; e int gcAllocBytes = 0;. Emita no Console: 'Alocacao de GC Evitada: 0 bytes'.",
            validationRules: { requiredPatterns: ["gcAllocBytes","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare gcAllocBytes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int gcAllocBytes = 0;
        Debug.Log("Alocacao de GC Evitada: " + gcAllocBytes + " bytes");
    }
}`,
            tests: [
                { input: "", expected: "Alocacao de GC Evitada: 0 bytes", description: "Otimização de GC" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: gcAllocBytes, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Alocacao de GC Evitada: 0 bytes" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int gcAllocBytes = 0;\n        Debug.Log(\"Alocacao de GC Evitada: \" + gcAllocBytes + \" bytes\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["gcAllocBytes","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alocacao de GC Evitada: 0 bytes";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_4",
            title: "Devolução de Objeto ao Pool (Desativação)",
            difficulty: "medium",
            description: "Declare bool estaAtivo = false;. Emita no Console: 'Objeto Devolvido ao Pool (Ativo: False)'.",
            validationRules: { requiredPatterns: ["bool estaAtivo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure estaAtivo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaAtivo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + estaAtivo + ")");
    }
}`,
            tests: [
                { input: "", expected: "Objeto Devolvido ao Pool (Ativo: False)", description: "Desativação ao devolver ao pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaAtivo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Objeto Devolvido ao Pool (Ativo: False)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaAtivo = false;\n        Debug.Log(\"Objeto Devolvido ao Pool (Ativo: \" + estaAtivo + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaAtivo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Objeto Devolvido ao Pool (Ativo: False)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
            title: "Capacidade Máxima do Pool",
            difficulty: "medium",
            description: "Declare int capacidadeMaxima = 50;. Emita no Console: 'Capacidade do Pool: 50 unidades'.",
            validationRules: { requiredPatterns: ["int capacidadeMaxima","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare capacidadeMaxima e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int capacidadeMaxima = 50;
        Debug.Log("Capacidade do Pool: " + capacidadeMaxima + " unidades");
    }
}`,
            tests: [
                { input: "", expected: "Capacidade do Pool: 50 unidades", description: "Teto do pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int capacidadeMaxima, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Capacidade do Pool: 50 unidades" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int capacidadeMaxima = 50;\n        Debug.Log(\"Capacidade do Pool: \" + capacidadeMaxima + \" unidades\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int capacidadeMaxima","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Capacidade do Pool: 50 unidades";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_29 };
}
if (typeof window !== "undefined") {
    window.CAP_29 = CAP_29;
}
