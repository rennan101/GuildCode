/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 03
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 03 — LOOPS (FOR, WHILE, FOREACH)
// ═══════════════════════════════════════════════════════

const CAP_03 = {
    id: 3,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 3, maxStars: 4 },
    title: "Loops (for, while, foreach)",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Anel do Laço",
    unlockIcon: "[LOOP]",
    character: "elion",
    xpReward: 100,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Inicializando o Motor de Repetição Contínua. Laços iterativos calibrados."
            },
            {
                    "type": "narrative",
                    "text": "Engrenagens colossais de mana giram em sincronia na torre central. Elion Raven analisa sequências numéricas que se repetem com precisão milimétrica."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "Em desenvolvimento de jogos, repetir código manualmente é o caminho mais rápido para corrupção de memória. Quando precisamos gerar ondas de inimigos, computar pontuações acumuladas ou vasculhar itens, usamos laços de repetição!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "O laço <code>for</code> é a ferramenta ideal quando sabemos a contagem exata de iterações. Já o <code>while</code> repousa sobre uma condição dinâmica, perfeito para contagens regressivas ou timers. Mas atenção: nunca esqueça de atualizar a variável de controle do while, ou causará um congelamento eterno!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Aprenda também a controlar o fluxo dos loops: <code>continue</code> pula imediatamente para a próxima iteração (ótimo para ignorar ímpares ao filtrar pares), enquanto <code>break</code> encerra o laço na hora em que o alvo for localizado."
            }
    ],
    concept: {
        title: "LAÇOS DE REPETIÇÃO: FOR, WHILE, BREAK E CONTINUE",
        explanation: "Loops executam blocos de código repetidas vezes até que uma condição de parada seja atingida:\n<ul>\n  <li><strong>Laço For Contado:</strong> Possui inicialização, condição de continuidade e incremento em sua declaração. Muito usado para spawns sequenciais: <code>for (int i = 1; i &lt;= 3; i++) Debug.Log(\"Inimigo #\" + i + \" gerado\");</code>.</li>\n  <li><strong>Laço While:</strong> Executa enquanto sua condição for avaliada como verdadeira. Essencial para contagens regressivas: <code>while (timer &gt; 0) { Debug.Log(\"T-\" + timer); timer--; }</code>.</li>\n  <li><strong>Acumulação em Laço:</strong> Podemos somar pontuações acumuladas declarando um acumulador antes do loop: <code>int totalPontos = 0; for (int i = 1; i &lt;= 4; i++) totalPontos += i * 10;</code>.</li>\n  <li><strong>Instrução Continue:</strong> Pula o restante do corpo do laço e avança direto para a próxima iteração. Útil para filtragem (ex: <code>if (i % 2 != 0) continue;</code> ignora ímpares e processa apenas pares).</li>\n  <li><strong>Instrução Break:</strong> Interrompe imediatamente a execução do loop, saindo do bloco mesmo que a condição principal ainda fosse verdadeira (ex: parar assim que encontrar o alvo no passo 3).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploLoops : MonoBehaviour
{
    void Start()
    {
        // 1. For: Spawn de ondas de monstros
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }

        // 2. While: Contagem regressiva
        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }

        // 3. Somatório acumulado
        int totalPontos = 0;
        for (int i = 1; i <= 4; i++)
        {
            totalPontos += i * 10;
        }
        Debug.Log("Total Acumulado: " + totalPontos);

        // 4. Continue: Filtrando apenas pares
        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }

        // 5. Break: Interrupção imediata
        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerenciador de Ondas e Temporizador",
        code: `using UnityEngine;

public class LoopManager : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }

        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }

        int total = 0;
        for (int i = 1; i <= 4; i++) total += i * 10;
        Debug.Log("Total Acumulado: " + total);

        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }

        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`,
        output: "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado\nT-3\nT-2\nT-1\nTotal Acumulado: 100\nPar: 2\nPar: 4\nAlvo Encontrado no passo 3"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Loops (for, while, foreach) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploLoops : MonoBehaviour
{
    void Start()
    {
        // 1. For: Spawn de ondas de monstros
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }

        // 2. While: Contagem regressiva
        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }

        // 3. Somatório acumulado
        int totalPontos = 0;
        for (int i = 1; i <= 4; i++)
        {
            totalPontos += i * 10;
        }
        Debug.Log("Total Acumulado: " + totalPontos);

        // 4. Continue: Filtrando apenas pares
        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }

        // 5. Break: Interrupção imediata
        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Loops (for, while, foreach):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Construa o laco for de 1 a 3
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }
    }
}`,
                hint: "Inimigo #1 gerado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_3_1",
            title: "Spawn Sequencial com For",
            difficulty: "easy",
            description: "Dentro de Start, construa um laço for que itere de 1 até 3 emitindo as mensagens no Console com 'Inimigo #' + i + ' gerado'.",
            validationRules: { requiredPatterns: ["for","<=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Construa o laco for de 1 a 3
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado", description: "Laço for sequencial" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, <=" },
                { level: "II", text: "A saída no console deve conter exatamente: Inimigo #1 gerado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Inimigo #\" + i + \" gerado\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","<=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Inimigo #1 gerado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_2",
            title: "Contagem com While",
            difficulty: "easy",
            description: "Declare a variável inteira timer com 3. Crie um laço while que execute enquanto timer > 0, imprimindo 'T-' + timer e decrementando a cada passo.",
            validationRules: { requiredPatterns: ["int timer","while","timer > 0","timer--"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int timer = 3;
        // Faca o laco while regressivo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }
    }
}`,
            tests: [
                { input: "", expected: "T-3\nT-2\nT-1", description: "While regressivo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int timer, while" },
                { level: "II", text: "A saída no console deve conter exatamente: T-3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int timer = 3;\n        while (timer > 0)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int timer","while","timer > 0","timer--"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "T-3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_3",
            title: "Somatório de Pontos",
            difficulty: "medium",
            description: "Declare totalPontos inicializado com 0. Faça um for com i de 1 até 4 somando i * 10 a totalPontos e exiba no final 'Total Acumulado: ' + totalPontos.",
            validationRules: { requiredPatterns: ["totalPontos","for","+=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalPontos = 0;
        // Some os pontos no laco e imprima o total
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalPontos = 0;
        for (int i = 1; i <= 4; i++)
        {
            totalPontos += i * 10;
        }
        Debug.Log("Total Acumulado: " + totalPontos);
    }
}`,
            tests: [
                { input: "", expected: "Total Acumulado: 100", description: "Somatório em loop" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: totalPontos, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Total Acumulado: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalPontos = 0;\n        for (int i = 1; i <= 4; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["totalPontos","for","+=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total Acumulado: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_4",
            title: "Filtro de Pares com Continue",
            difficulty: "medium",
            description: "Faça um laço for de 1 até 5. Se o resto da divisão por 2 for diferente de zero (i % 2 != 0), use continue para ignorar. Imprima os números pares encontrados com 'Par: ' + i.",
            validationRules: { requiredPatterns: ["for","continue","%","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Itere de 1 a 5 usando continue para impares
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }
    }
}`,
            tests: [
                { input: "", expected: "Par: 2\nPar: 4", description: "Comando continue" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, continue" },
                { level: "II", text: "A saída no console deve conter exatamente: Par: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 5; i++)\n        {\n            if (i % 2 != 0) continue;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","continue","%","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Par: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 3, maxStars: 4 },
            title: "Interrupção com Break",
            difficulty: "medium",
            description: "Simule a interrupção ao encontrar o alvo: itere de 1 até 10 com for. Quando i == 3, exiba 'Alvo Encontrado no passo 3' e execute break para interromper o laço.",
            validationRules: { requiredPatterns: ["for","break","i == 3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Procure o alvo no laco e interrompa com break
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`,
            tests: [
                { input: "", expected: "Alvo Encontrado no passo 3", description: "Comando break" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, break" },
                { level: "II", text: "A saída no console deve conter exatamente: Alvo Encontrado no passo 3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 10; i++)\n        {\n            if (i == 3)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","break","i == 3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alvo Encontrado no passo 3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_03 };
}
if (typeof window !== "undefined") {
    window.CAP_03 = CAP_03;
}
