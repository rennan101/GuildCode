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
        title: "OBJECT POOLING EM UNITY: ARQUITETURA DE FILA (QUEUE), CICLO WARMUP/SPAWN/RECYCLE E ZERO ALOCAÇÃO DE GC",
        explanation: "Object Pooling substitui o ciclo destrutivo de <code>Instantiate</code> e <code>Destroy</code> pelo reúso contínuo de instâncias pré-alocadas:\n<ul>\n  <li><strong>1. Pré-aquecimento (Warmup):</strong> Durante a inicialização (<code>Start</code>), instâncias são criadas em lote e armazenadas desativadas numa fila <code>Queue&lt;string&gt;</code> usando <code>pool.Enqueue(\"Bala_\" + i)</code>.</li>\n  <li><strong>2. Resgate de Instância (Spawn com Dequeue):</strong> Em vez de chamar <code>Instantiate</code>, resgata-se um objeto inativo com <code>pool.Dequeue()</code> e ele é ativado na cena.</li>\n  <li><strong>3. Reciclagem e Devolução (Release com Enqueue):</strong> Ao atingir o alvo ou sair da tela, o objeto é desativado e reinserido na fila com <code>pool.Enqueue(objeto)</code>.</li>\n  <li><strong>4. Zero Alocação de Heap (Zero GC Alloc):</strong> Como nenhuma memória gerenciada é alocada durante o gameplay, evita-se os picos de processamento do Garbage Collector (stutters).</li>\n  <li><strong>5. Verificação de Disponibilidade:</strong> Antes de desinfileirar, valida-se <code>if (pool.Count &gt; 0)</code> para garantir que o reservatório possui projéteis disponíveis.</li>\n</ul>",
        code: `using UnityEngine;
using System.Collections.Generic;

public class ExemploObjectPooling : MonoBehaviour
{
    void Start()
    {
        // 1. Warmup: Inicializa o pool com 3 projéteis na fila
        Queue<string> pool = new Queue<string>();
        for (int i = 1; i <= 3; i++)
        {
            pool.Enqueue("Projetil_Fogo_" + i);
        }
        Debug.Log("Pool Aquecido: " + pool.Count + " projeteis na fila");

        // 2. Spawn: Resgata da fila sem alocar memória (sem Instantiate)
        if (pool.Count > 0)
        {
            string balaAtiva = pool.Dequeue();
            Debug.Log("Disparo Efetuado: " + balaAtiva + " | No Pool: " + pool.Count);

            // 3. Reciclagem: Devolve ao pool após impacto (sem Destroy)
            pool.Enqueue(balaAtiva);
            Debug.Log("Impacto Confirmado: " + balaAtiva + " reciclado | No Pool: " + pool.Count);
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerenciador de Disparo Contínuo com Pool Reciclável",
        code: `using UnityEngine;
using System.Collections.Generic;

public class GerenciadorPoolProjeteis : MonoBehaviour
{
    void Start()
    {
        Queue<string> poolBalas = new Queue<string>();

        // Warmup: Pré-carrega 4 projéteis na fila
        for (int i = 1; i <= 4; i++)
        {
            poolBalas.Enqueue("Bala_Laser_" + i);
        }
        Debug.Log("Pool Inicializado com Capacidade: " + poolBalas.Count);

        // Rajada: Dispara 2 projéteis resgatados da fila
        string tiro1 = poolBalas.Dequeue();
        string tiro2 = poolBalas.Dequeue();
        Debug.Log("Tiro 1 Ativo: " + tiro1 + " | Tiro 2 Ativo: " + tiro2);
        Debug.Log("Projeteis Restantes no Reservatorio: " + poolBalas.Count);

        // Reciclagem: Devolve os projéteis ao pool após colisão
        poolBalas.Enqueue(tiro1);
        poolBalas.Enqueue(tiro2);
        Debug.Log("Balas Recicladas no Pool. Total Pronto: " + poolBalas.Count);
    }
}`,
        output: "Pool Inicializado com Capacidade: 4\nTiro 1 Ativo: Bala_Laser_1 | Tiro 2 Ativo: Bala_Laser_2\nProjeteis Restantes no Reservatorio: 2\nBalas Recicladas no Pool. Total Pronto: 4"
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
        Queue<string> pool = new Queue<string>();
        int capacidade = 5;

        for (int i = 1; i <= capacidade; i++)
        {
            pool.Enqueue("Magia_" + i);
        }
        Debug.Log("Pool Aquecido: " + pool.Count + " magias");

        string lancada = pool.Dequeue();
        Debug.Log("Magia Lancada: " + lancada + " | Restantes: " + pool.Count);

        pool.Enqueue(lancada);
        Debug.Log("Magia Reciclada: " + lancada + " | Total no Pool: " + pool.Count);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Inicialize o pool com Queue<string> pool = new Queue<string>();, adicione 2 projéteis ('Bala_1' e 'Bala_2') com .Enqueue e emita a quantidade total com pool.Count:",
                starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Inicialize o pool e enfileire 2 projeteis
    }
}`,
                solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Bala_1");
        pool.Enqueue("Bala_2");
        Debug.Log("Pool Aquecido com: " + pool.Count + " projeteis");
    }
}`,
                hint: "Pool Aquecido com: 2 projeteis"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_29_1",
            title: "Pré-aquecimento do Pool (Warmup com Queue)",
            difficulty: "easy",
            description: "Crie uma fila Queue<string> pool = new Queue<string>();. Utilizando um laço for (int i = 1; i <= 3; i++), enfileire cada projétil com pool.Enqueue(\"Bala_\" + i);. Ao final, emita: 'Pool Aquecido: ' + pool.Count + ' projeteis'.",
            validationRules: { requiredPatterns: ["Queue<string> pool","for","pool.Enqueue(","pool.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o pool e faça o warmup de 3 projéteis com loop for
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        for (int i = 1; i <= 3; i++)
        {
            pool.Enqueue("Bala_" + i);
        }
        Debug.Log("Pool Aquecido: " + pool.Count + " projeteis");
    }
}`,
            tests: [
                { input: "", expected: "Pool Aquecido: 3 projeteis", description: "Warmup da fila de pool" }
            ],
            hints: [
                { level: "I", text: "Use Queue<string> pool = new Queue<string>(); e um loop for de 1 a 3." },
                { level: "II", text: "Dentro do loop, chame pool.Enqueue(\"Bala_\" + i);." },
                { level: "III", text: "Exemplo estrutural:\nQueue<string> pool = new Queue<string>();\nfor (int i = 1; i <= 3; i++) {\n    pool.Enqueue(\"Bala_\" + i);\n}\nDebug.Log(\"Pool Aquecido: \" + pool.Count + \" projeteis\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool","for","pool.Enqueue(","pool.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pool Aquecido: 3 projeteis";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_2",
            title: "Resgate de Instância Ativa (Spawn com Dequeue)",
            difficulty: "easy",
            description: "Inicialize o pool enfileirando 'Laser_A' e 'Laser_B'. Em seguida, resgate o primeiro projétil com string bala = pool.Dequeue(); e emita no console: 'Disparando: ' + bala + ' | Restantes no Pool: ' + pool.Count.",
            validationRules: { requiredPatterns: ["Queue<string> pool","pool.Enqueue(","pool.Dequeue()","pool.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Enfileire 2 lasers e resgate 1 com Dequeue
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Laser_A");
        pool.Enqueue("Laser_B");
        string bala = pool.Dequeue();
        Debug.Log("Disparando: " + bala + " | Restantes no Pool: " + pool.Count);
    }
}`,
            tests: [
                { input: "", expected: "Disparando: Laser_A | Restantes no Pool: 1", description: "Spawn e contagem com Dequeue" }
            ],
            hints: [
                { level: "I", text: "Enfileire os dois lasers com .Enqueue e retire o primeiro com pool.Dequeue()." },
                { level: "II", text: "A saída no console deve conter exatamente: Disparando: Laser_A | Restantes no Pool: 1" },
                { level: "III", text: "Exemplo estrutural:\nstring bala = pool.Dequeue();\nDebug.Log(\"Disparando: \" + bala + \" | Restantes no Pool: \" + pool.Count);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool","pool.Enqueue(","pool.Dequeue()","pool.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Disparando: Laser_A | Restantes no Pool: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_3",
            title: "Reciclagem Completa (Devolução ao Pool)",
            difficulty: "medium",
            description: "Crie a fila pool contendo 'Missil_1'. Resgate-o com string missil = pool.Dequeue(); e em seguida devolva-o ao pool com pool.Enqueue(missil);. Emita no Console: 'Missil Reciclado no Pool. Total Pronto: ' + pool.Count.",
            validationRules: { requiredPatterns: ["Queue<string> pool","pool.Dequeue()","pool.Enqueue(","pool.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Resgate Missil_1 do pool e recicle-o com Enqueue
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Missil_1");
        string missil = pool.Dequeue();
        pool.Enqueue(missil);
        Debug.Log("Missil Reciclado no Pool. Total Pronto: " + pool.Count);
    }
}`,
            tests: [
                { input: "", expected: "Missil Reciclado no Pool. Total Pronto: 1", description: "Ciclo de reciclagem sem GC" }
            ],
            hints: [
                { level: "I", text: "Use pool.Enqueue(\"Missil_1\"), retire com pool.Dequeue() e re-enfileire com pool.Enqueue(missil)." },
                { level: "II", text: "A saída no console deve conter: Missil Reciclado no Pool. Total Pronto: 1" },
                { level: "III", text: "Exemplo estrutural:\nstring missil = pool.Dequeue();\npool.Enqueue(missil);\nDebug.Log(\"Missil Reciclado no Pool. Total Pronto: \" + pool.Count);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool","pool.Dequeue()","pool.Enqueue(","pool.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Missil Reciclado no Pool. Total Pronto: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_4",
            title: "Segurança de Pool (Verificação com pool.Count)",
            difficulty: "medium",
            description: "Crie a fila pool e enfileire 'Flecha_Gelo'. Verifique com if (pool.Count > 0): se houver projétil, resgate com pool.Dequeue() e emita 'Disparo Seguro Efetuado: ' + bala. Caso contrário, emita 'Pool Vazio! Aguardando Reciclagem'.",
            validationRules: { requiredPatterns: ["Queue<string> pool","pool.Count > 0","pool.Dequeue()"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Enfileire 'Flecha_Gelo' e verifique pool.Count > 0 antes de disparar
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Flecha_Gelo");
        if (pool.Count > 0)
        {
            string bala = pool.Dequeue();
            Debug.Log("Disparo Seguro Efetuado: " + bala);
        }
        else
        {
            Debug.Log("Pool Vazio! Aguardando Reciclagem");
        }
    }
}`,
            tests: [
                { input: "", expected: "Disparo Seguro Efetuado: Flecha_Gelo", description: "Verificação segura de disponibilidade do pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de testar if (pool.Count > 0) antes de chamar pool.Dequeue()." },
                { level: "II", text: "A saída no console deve conter exatamente: Disparo Seguro Efetuado: Flecha_Gelo" },
                { level: "III", text: "Exemplo estrutural:\nif (pool.Count > 0) {\n    string bala = pool.Dequeue();\n    Debug.Log(\"Disparo Seguro Efetuado: \" + bala);\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool","pool.Count > 0","pool.Dequeue()"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Disparo Seguro Efetuado: Flecha_Gelo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
            title: "Ciclo Contínuo de Disparo e Reúso",
            difficulty: "medium",
            description: "Crie a fila pool enfileirando 'Esfera_1' e 'Esfera_2'. Resgate ambas com .Dequeue(), e depois recicle ambas devolvendo-as ao pool com .Enqueue(). Emita: 'Ciclo Completo: 2 disparos efetuados e ' + pool.Count + ' projeteis prontos'.",
            validationRules: { requiredPatterns: ["Queue<string> pool","pool.Dequeue()","pool.Enqueue(","pool.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Dispare 2 esferas com Dequeue e recicle ambas com Enqueue
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Esfera_1");
        pool.Enqueue("Esfera_2");
        string t1 = pool.Dequeue();
        string t2 = pool.Dequeue();
        pool.Enqueue(t1);
        pool.Enqueue(t2);
        Debug.Log("Ciclo Completo: 2 disparos efetuados e " + pool.Count + " projeteis prontos");
    }
}`,
            tests: [
                { input: "", expected: "Ciclo Completo: 2 disparos efetuados e 2 projeteis prontos", description: "Ciclo contínuo de pool sem alocação" }
            ],
            hints: [
                { level: "I", text: "Enfileire as duas esferas, resgate ambas com Dequeue() e reinisira-as com Enqueue()." },
                { level: "II", text: "A saída no console deve conter: Ciclo Completo: 2 disparos efetuados e 2 projeteis prontos" },
                { level: "III", text: "Exemplo estrutural:\nstring t1 = pool.Dequeue();\nstring t2 = pool.Dequeue();\npool.Enqueue(t1);\npool.Enqueue(t2);\nDebug.Log(\"Ciclo Completo: 2 disparos efetuados e \" + pool.Count + \" projeteis prontos\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool","pool.Dequeue()","pool.Enqueue(","pool.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Ciclo Completo: 2 disparos efetuados e 2 projeteis prontos";
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
