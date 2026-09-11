/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 33
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 33 — COROUTINES E FLUXO TEMPORAL
// ═══════════════════════════════════════════════════════

const CAP_33 = {
    id: 33,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 6 },
    title: "Coroutines e Fluxo Temporal",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Fita Coroutine",
    unlockIcon: "[CORO]",
    character: "orin",
    xpReward: 400,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conectando à Dimensão do Tempo Assíncrono. Coroutines e IEnumerators ativados."
            },
            {
                    "type": "narrative",
                    "text": "O fluxo do tempo desdobra-se em camadas paralelas. Orin Vale congela instantes temporais e programa ações que pausam e retomam com fluidez sem travar o jogo."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "ARTÍFICE DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Se você tentar fazer uma contagem de 3 segundos usando um loop comum com <code>Thread.Sleep</code>, o jogo inteiro congelará na tela! No Unity, operações com espera temporal usam **Coroutines** (corotinas) com retorno <code>IEnumerator</code>!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "A mágica está na expressão <code>yield return new WaitForSeconds(tempo)</code>! A função pausa sua execução no ponto exato, devolve o controle para a engine desenhar os próximos quadros e acorda automaticamente quando o tempo terminar!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Corotinas são iniciadas com <code>StartCoroutine()</code> e podem ser canceladas antecipadamente com <code>StopCoroutine()</code>. Domine o controle temporal assíncrono."
            }
    ],
    concept: {
        title: "COROUTINES NO UNITY: IENUMERATOR, YIELD RETURN, WAITFORSECONDS E CANCELAMENTO",
        explanation: "Coroutines permitem espalhar tarefas ao longo de múltiplos quadros sem bloquear a thread principal:\n<ul>\n  <li><strong>Execução com Atraso (Delay):</strong> Permite executar etapas separadas por intervalos de tempo sem interromper a renderização dos frames gráficos (ex: Passo 1 seguido do Passo 2).</li>\n  <li><strong>Tempo de Espera (<code>WaitForSeconds</code>):</strong> Instrução de rendição (yield) que suspende a corotina pela duração em segundos especificada: <code>float tempoEspera = 1.5f;</code> emitindo <code>\"Aguardando: 1.5 segundos\"</code>.</li>\n  <li><strong>Contagem Regressiva Assíncrona:</strong> Laço for decrementando (de 3 até 1) intercalado por waits simulando timers de lançamento: <code>\"Timer: \" + i</code> e ao final <code>\"Lancamento!\"</code>.</li>\n  <li><strong>Disparo com StartCoroutine:</strong> Método do <code>MonoBehaviour</code> que registra a corotina no scheduler do motor (ex: <code>\"StartCoroutine: Rotina Disparada\"</code>).</li>\n  <li><strong>Interrupção com StopCoroutine:</strong> Cancela uma corotina antes que termine, essencial quando o herói morre ou cancela uma ação (ex: <code>\"StopCoroutine: Execucao Interrompida\"</code>).</li>\n</ul>",
        code: `using UnityEngine;
using System.Collections;

public class ExemploCoroutines : MonoBehaviour
{
    void Start()
    {
        // 1. Passos sequenciais no tempo
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);

        // 2. Tempo de espera assíncrono
        float tempoEspera = 1.5f;
        Debug.Log("Aguardando: " + tempoEspera + " segundos");

        // 3. Contagem regressiva em corotina
        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");

        // 4. Disparo via StartCoroutine
        string statusCoro = "StartCoroutine: Rotina Disparada";
        Debug.Log(statusCoro);

        // 5. Interrupção controlada
        bool jogadorCancelou = true;
        if (jogadorCancelou)
        {
            Debug.Log("StopCoroutine: Execucao Interrompida");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Temporizador Assíncrono de Habilidade",
        code: `using UnityEngine;

public class TemporizadorMagico : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Passo 1: Iniciado");
        Debug.Log("Passo 2: Concluido");

        float espera = 1.5f;
        Debug.Log("Aguardando: " + espera + " segundos");

        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");

        Debug.Log("StartCoroutine: Rotina Disparada");

        bool cancel = true;
        if (cancel) Debug.Log("StopCoroutine: Execucao Interrompida");
    }
}`,
        output: "Passo 1: Iniciado\nPasso 2: Concluido\nAguardando: 1.5 segundos\nTimer: 3\nTimer: 2\nTimer: 1\nLancamento!\nStartCoroutine: Rotina Disparada\nStopCoroutine: Execucao Interrompida"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Coroutines e Fluxo Temporal e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using System.Collections;

public class ExemploCoroutines : MonoBehaviour
{
    void Start()
    {
        // 1. Passos sequenciais no tempo
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);

        // 2. Tempo de espera assíncrono
        float tempoEspera = 1.5f;
        Debug.Log("Aguardando: " + tempoEspera + " segundos");

        // 3. Contagem regressiva em corotina
        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");

        // 4. Disparo via StartCoroutine
        string statusCoro = "StartCoroutine: Rotina Disparada";
        Debug.Log(statusCoro);

        // 5. Interrupção controlada
        bool jogadorCancelou = true;
        if (jogadorCancelou)
        {
            Debug.Log("StopCoroutine: Execucao Interrompida");
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Coroutines e Fluxo Temporal:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare p1 e p2 e emita os dois passos da corotina
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);
    }
}`,
                hint: "Passo 1: Iniciado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_33_1",
            title: "Execução Temporal com Delay",
            difficulty: "easy",
            description: "Declare string p1 = 'Passo 1: Iniciado'; e string p2 = 'Passo 2: Concluido';. Emita ambas em linhas separadas no Console.",
            validationRules: { requiredPatterns: ["string p1","string p2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare p1 e p2 e emita os dois passos da corotina
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);
    }
}`,
            tests: [
                { input: "", expected: "Passo 1: Iniciado\nPasso 2: Concluido", description: "Sequência temporal" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string p1, string p2" },
                { level: "II", text: "A saída no console deve conter exatamente: Passo 1: Iniciado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string p1 = \"Passo 1: Iniciado\";\n        string p2 = \"Passo 2: Concluido\";\n        Debug.Log(p1);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string p1","string p2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Passo 1: Iniciado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_2",
            title: "Tempo de Espera (WaitForSeconds)",
            difficulty: "easy",
            description: "Declare float tempoEspera = 1.5f;. Emita no Console: 'Aguardando: 1.5 segundos'.",
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
        float tempoEspera = 1.5f;
        Debug.Log("Aguardando: " + tempoEspera + " segundos");
    }
}`,
            tests: [
                { input: "", expected: "Aguardando: 1.5 segundos", description: "WaitForSeconds delay" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float tempoEspera, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Aguardando: 1.5 segundos" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float tempoEspera = 1.5f;\n        Debug.Log(\"Aguardando: \" + tempoEspera + \" segundos\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float tempoEspera","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Aguardando: 1.5 segundos";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_3",
            title: "Contagem Regressiva de Corotina",
            difficulty: "medium",
            description: "Use um for de 3 até 1 simulando um timer assíncrono: imprima 'Timer: ' + i e ao final 'Lancamento!'.",
            validationRules: { requiredPatterns: ["for","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Faca a contagem regressiva e o lancamento
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");
    }
}`,
            tests: [
                { input: "", expected: "Timer: 3\nTimer: 2\nTimer: 1\nLancamento!", description: "Contagem regressiva de corotina" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Timer: 3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 3; i >= 1; i--)\n        {\n            Debug.Log(\"Timer: \" + i);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Timer: 3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_4",
            title: "Disparo com StartCoroutine",
            difficulty: "medium",
            description: "Declare string statusCoro = 'StartCoroutine: Rotina Disparada';. Emita no Console o valor de statusCoro.",
            validationRules: { requiredPatterns: ["string statusCoro","statusCoro","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusCoro e emita a inicializacao da corotina
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusCoro = "StartCoroutine: Rotina Disparada";
        Debug.Log(statusCoro);
    }
}`,
            tests: [
                { input: "", expected: "StartCoroutine: Rotina Disparada", description: "StartCoroutine" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusCoro, statusCoro" },
                { level: "II", text: "A saída no console deve conter exatamente: StartCoroutine: Rotina Disparada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusCoro = \"StartCoroutine: Rotina Disparada\";\n        Debug.Log(statusCoro);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusCoro","statusCoro","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "StartCoroutine: Rotina Disparada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 6 },
            title: "Interrupção com StopCoroutine",
            difficulty: "medium",
            description: "Declare bool jogadorCancelou = true;. Se for verdadeiro, emita 'StopCoroutine: Execucao Interrompida'.",
            validationRules: { requiredPatterns: ["bool jogadorCancelou","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se o jogador cancelou a acao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool jogadorCancelou = true;
        if (jogadorCancelou)
        {
            Debug.Log("StopCoroutine: Execucao Interrompida");
        }
    }
}`,
            tests: [
                { input: "", expected: "StopCoroutine: Execucao Interrompida", description: "Interrupção de corotina" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool jogadorCancelou, if" },
                { level: "II", text: "A saída no console deve conter exatamente: StopCoroutine: Execucao Interrompida" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool jogadorCancelou = true;\n        if (jogadorCancelou)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool jogadorCancelou","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "StopCoroutine: Execucao Interrompida";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_33 };
}
if (typeof window !== "undefined") {
    window.CAP_33 = CAP_33;
}
