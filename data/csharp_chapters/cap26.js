/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 26
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 26 — NAVMESH E IA DE PATRULHA NPC
// ═══════════════════════════════════════════════════════

const CAP_26 = {
    id: 26,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 6 },
    title: "NavMesh e IA de Patrulha NPC",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Bússola NavMesh",
    unlockIcon: "[NAV]",
    character: "orin",
    xpReward: 330,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando a Malha de Navegação Inteligente. NavMesh e Agentes de IA ativados."
            },
            {
                    "type": "narrative",
                    "text": "Uma malha azul translúcida assenta-se sobre o chão da masmorra, desviando automaticamente de fossos e pilares de pedra. Orin Vale observa sentinelas mecânicas patrulharem rotas predefinidas."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Fazer um monstro desviar de paredes manualmente seria uma loucura! O Unity fornece o **NavMesh**, uma malha de navegação assada na geometria do cenário onde o componente **NavMeshAgent** encontra o caminho mais curto usando o algoritmo A*!"
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "Basta chamar <code>agent.SetDestination(alvo)</code>! O agente calcula as curvas, respeita a velocidade máxima e para exatamente na distância configurada em <code>stoppingDistance</code>. E para patrulhar entre marcos, alternamos os waypoints com a fórmula cíclica <code>(indice + 1) % total</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Pausas para observação entre cada ponto de patrulha conferem naturalidade ao comportamento da inteligência artificial. Conclua as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "INTELIGÊNCIA ARTIFICIAL E NAVEGAÇÃO: NAVMESH, NAVMESHAGENT, STOPPING DISTANCE E WAYPOINTS",
        explanation: "O sistema de <code>NavMesh</code> do Unity gerencia a locomoção inteligente de NPCs pela cena:\n<ul>\n  <li><strong>Definição de Destino (<code>SetDestination</code>):</strong> Informa ao <code>NavMeshAgent</code> para onde navegar: <code>Vector3 destino = new Vector3(10, 0, 15);</code> emitindo <code>\"Destino NavMesh: (10, 0, 15)\"</code>.</li>\n  <li><strong>Velocidade de Navegação (<code>speed</code>):</strong> Velocidade máxima com que o agente percorre a malha de navegação (ex: <code>float velocidadeAgente = 3.5f;</code>).</li>\n  <li><strong>Distância de Parada (<code>stoppingDistance</code>):</strong> Tolerância em metros para que o NPC pare antes de trombar no jogador ou no alvo (ex: se distância restante &lt;= 1.0f, emite <code>\"NPC Chegou ao Destino\"</code>).</li>\n  <li><strong>Patrulha Cíclica Entre Waypoints:</strong> Alterna entre pontos de patrulha usando o operador de módulo: <code>int proximo = (indicePonto + 1) % totalPontos;</code> (ex: passar do ponto 0 para o ponto 1).</li>\n  <li><strong>Pausa de Observação:</strong> Temporizador que faz o agente aguardar alguns segundos no ponto antes de retomar o deslocamento (ex: <code>\"Aguardando no Ponto: 2s\"</code>).</li>\n</ul>",
        code: `using UnityEngine;
using UnityEngine.AI;

public class ExemploNavMesh : MonoBehaviour
{
    void Start()
    {
        // 1. Definição de coordenadas de destino
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");

        // 2. Velocidade de locomoção do agente
        float velocidadeAgente = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + velocidadeAgente);

        // 3. Checagem de stoppingDistance
        float distRestante = 0.8f;
        float stopDist = 1.0f;
        if (distRestante <= stopDist)
        {
            Debug.Log("NPC Chegou ao Destino");
        }

        // 4. Rotação cíclica de waypoints
        int indicePonto = 0;
        int totalPontos = 3;
        int proximo = (indicePonto + 1) % totalPontos;
        Debug.Log("Proximo Ponto: " + proximo);

        // 5. Tempo de espera no marco
        float tempoEspera = 2.0f;
        Debug.Log("Aguardando no Ponto: " + tempoEspera + "s");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Controlador de Patrulha de Sentinela",
        code: `using UnityEngine;

public class PatrulhaSentinela : MonoBehaviour
{
    void Start()
    {
        Vector3 dest = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + dest.x + ", " + dest.y + ", " + dest.z + ")");

        float vel = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + vel);

        float d = 0.8f;
        if (d <= 1.0f) Debug.Log("NPC Chegou ao Destino");

        int i = 0;
        int total = 3;
        Debug.Log("Proximo Ponto: " + ((i + 1) % total));

        Debug.Log("Aguardando no Ponto: 2s");
    }
}`,
        output: "Destino NavMesh: (10, 0, 15)\nVelocidade NavMeshAgent: 3.5\nNPC Chegou ao Destino\nProximo Ponto: 1\nAguardando no Ponto: 2s"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de NavMesh e IA de Patrulha NPC e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using UnityEngine.AI;

public class ExemploNavMesh : MonoBehaviour
{
    void Start()
    {
        // 1. Definição de coordenadas de destino
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");

        // 2. Velocidade de locomoção do agente
        float velocidadeAgente = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + velocidadeAgente);

        // 3. Checagem de stoppingDistance
        float distRestante = 0.8f;
        float stopDist = 1.0f;
        if (distRestante <= stopDist)
        {
            Debug.Log("NPC Chegou ao Destino");
        }

        // 4. Rotação cíclica de waypoints
        int indicePonto = 0;
        int totalPontos = 3;
        int proximo = (indicePonto + 1) % totalPontos;
        Debug.Log("Proximo Ponto: " + proximo);

        // 5. Tempo de espera no marco
        float tempoEspera = 2.0f;
        Debug.Log("Aguardando no Ponto: " + tempoEspera + "s");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de NavMesh e IA de Patrulha NPC:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure destino e emita
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");
    }
}`,
                hint: "Destino NavMesh: (10, 0, 15)"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_26_1",
            title: "Definição de Destino com SetDestination",
            difficulty: "easy",
            description: "Simule o envio de um NPC para um destino: declare Vector3 destino = new Vector3(10, 0, 15);. Emita no Console: 'Destino NavMesh: (10, 0, 15)'.",
            validationRules: { requiredPatterns: ["new Vector3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure destino e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");
    }
}`,
            tests: [
                { input: "", expected: "Destino NavMesh: (10, 0, 15)", description: "NavMesh destino" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Destino NavMesh: (10, 0, 15)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 destino = new Vector3(10, 0, 15);\n        Debug.Log(\"Destino NavMesh: (\" + destino.x + \", \" + destino.y + \", \" + destino.z + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Destino NavMesh: (10, 0, 15)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_2",
            title: "Velocidade de Navegação do Agente",
            difficulty: "easy",
            description: "Declare float velocidadeAgente = 3.5f;. Emita no Console: 'Velocidade NavMeshAgent: 3.5'.",
            validationRules: { requiredPatterns: ["float velocidadeAgente","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare velocidadeAgente e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float velocidadeAgente = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + velocidadeAgente);
    }
}`,
            tests: [
                { input: "", expected: "Velocidade NavMeshAgent: 3.5", description: "NavMeshAgent speed" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float velocidadeAgente, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Velocidade NavMeshAgent: 3.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float velocidadeAgente = 3.5f;\n        Debug.Log(\"Velocidade NavMeshAgent: \" + velocidadeAgente);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float velocidadeAgente","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Velocidade NavMeshAgent: 3.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_3",
            title: "Distância de Parada (StoppingDistance)",
            difficulty: "medium",
            description: "Declare float distRestante = 0.8f; e float stopDist = 1.0f;. Se distRestante <= stopDist, emita 'NPC Chegou ao Destino'.",
            validationRules: { requiredPatterns: ["float distRestante","float stopDist","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide se o agente chegou
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float distRestante = 0.8f;
        float stopDist = 1.0f;
        if (distRestante <= stopDist)
        {
            Debug.Log("NPC Chegou ao Destino");
        }
    }
}`,
            tests: [
                { input: "", expected: "NPC Chegou ao Destino", description: "NavMesh stopping distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float distRestante, float stopDist" },
                { level: "II", text: "A saída no console deve conter exatamente: NPC Chegou ao Destino" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float distRestante = 0.8f;\n        float stopDist = 1.0f;\n        if (distRestante <= stopDist)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float distRestante","float stopDist","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "NPC Chegou ao Destino";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_4",
            title: "Patrulha Entre Pontos (Waypoints)",
            difficulty: "medium",
            description: "Declare int indicePonto = 0; e int totalPontos = 3;. Avance para o próximo índice com (indicePonto + 1) % totalPontos e emita 'Proximo Ponto: ' + proximo.",
            validationRules: { requiredPatterns: ["indicePonto","totalPontos","%","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Avance para o proximo waypoint
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int indicePonto = 0;
        int totalPontos = 3;
        int proximo = (indicePonto + 1) % totalPontos;
        Debug.Log("Proximo Ponto: " + proximo);
    }
}`,
            tests: [
                { input: "", expected: "Proximo Ponto: 1", description: "Alternância de waypoints" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: indicePonto, totalPontos" },
                { level: "II", text: "A saída no console deve conter exatamente: Proximo Ponto: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int indicePonto = 0;\n        int totalPontos = 3;\n        int proximo = (indicePonto + 1) % totalPontos;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["indicePonto","totalPontos","%","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Proximo Ponto: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 6 },
            title: "Pausa para Observação no Ponto",
            difficulty: "medium",
            description: "Declare float tempoEspera = 2.0f;. Emita no Console: 'Aguardando no Ponto: 2s'.",
            validationRules: { requiredPatterns: ["float tempoEspera","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tempoEspera e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoEspera = 2.0f;
        Debug.Log("Aguardando no Ponto: " + tempoEspera + "s");
    }
}`,
            tests: [
                { input: "", expected: "Aguardando no Ponto: 2s", description: "Espera de patrulha" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float tempoEspera, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Aguardando no Ponto: 2s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float tempoEspera = 2.0f;\n        Debug.Log(\"Aguardando no Ponto: \" + tempoEspera + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float tempoEspera","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Aguardando no Ponto: 2s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_26 };
}
if (typeof window !== "undefined") {
    window.CAP_26 = CAP_26;
}
