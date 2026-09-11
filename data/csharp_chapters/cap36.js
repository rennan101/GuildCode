/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 36
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 36 — TRATAMENTO DE EXCEÇÕES COM TRY/CATCH
// ═══════════════════════════════════════════════════════

const CAP_36 = {
    id: 36,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 5, maxStars: 6 },
    title: "Tratamento de Exceções com Try/Catch",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Escudo TryCatch",
    unlockIcon: "[TRY]",
    character: "mira",
    xpReward: 430,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando as Barricadas Defensivas de Código. Tratamento de Exceções e Resiliência ativos."
            },
            {
                    "type": "narrative",
                    "text": "Mira Solenn ergue proteções prismáticas contra anomalias lógicas. Se uma operação falhar no abismo da execução, o jogo resiste e não fecha para o jogador."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Em ambiente de produção, um jogo não pode simplesmente fechar sozinho ou quebrar a tela quando um arquivo de save estiver ausente ou ocorrer uma divisão por zero! Nós protegemos trechos críticos com blocos **Try / Catch**!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "No bloco <code>try</code>, tentamos a operação arriscada; no bloco <code>catch</code>, capturamos a exceção com segurança e emitimos um alerta sem quebrar o fluxo. E o bloco <code>finally</code> garante que arquivos sejam fechados e conexões liberadas, mesmo havendo erro!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Prevenções contra <code>DivideByZeroException</code>, checagens defensivas contra <code>NullReferenceException</code> e validações com <code>throw</code> garantem a robustez máxima do código."
            }
    ],
    concept: {
        title: "TRATAMENTO DE EXCEÇÕES EM C#: TRY, CATCH, FINALLY, PREVENÇÃO DE NULOS E LANÇAMENTO DE ERROS",
        explanation: "Tratamento de exceções previne que falhas inesperadas derrubem a aplicação:\n<ul>\n  <li><strong>Estrutura Try / Catch:</strong> Isola a execução de códigos suscetíveis a falhas e captura o erro sem travar a thread principal (ex: <code>\"Processamento Seguro: 100\"</code>).</li>\n  <li><strong>Prevenção de Divisão por Zero:</strong> Validação condicional contra divisores nulos antes de realizar a operação (ex: se divisor == 0, emite <code>\"Aviso: Divisao por Zero Evitada!\"</code>).</li>\n  <li><strong>Tratamento Defensivo contra Nulos:</strong> Verifica se uma referência a componente existe antes de acessar suas propriedades, evitando o clássico <code>NullReferenceException</code>.</li>\n  <li><strong>Bloco Finally:</strong> Bloco garantido de execução incondicional ao término do try/catch, essencial para fechar arquivos abertos e liberar conexões (ex: <code>\"Bloco Finally: Arquivo Fechado\"</code>).</li>\n  <li><strong>Lançamento de Erro Personalizado (throw):</strong> Interrompe fluxos ilegais quando requisitos mínimos de jogo não são atendidos (ex: nível de jogador insuficiente para entrar na masmorra).</li>\n</ul>",
        code: `using UnityEngine;
using System;

public class ExemploTratamentoExcecoes : MonoBehaviour
{
    void Start()
    {
        // 1. Processamento seguro com try/catch
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch (Exception e)
        {
            Debug.Log("Erro Capturado: " + e.Message);
        }

        // 2. Prevenção de divisão por zero
        int divisor = 0;
        if (divisor == 0)
        {
            Debug.Log("Aviso: Divisao por Zero Evitada!");
        }

        // 3. Checagem defensiva de componente nulo
        bool componenteExiste = false;
        if (!componenteExiste)
        {
            Debug.Log("Erro Evitado: Componente Nulo");
        }

        // 4. Bloco Finally de limpeza
        string statusLimpeza = "Bloco Finally: Arquivo Fechado";
        Debug.Log(statusLimpeza);

        // 5. Validação de nível e disparo controlado
        int nivelRequerido = 50;
        int nivelPlayer = 20;
        if (nivelPlayer < nivelRequerido)
        {
            Debug.Log("Excecao: Nivel Insuficiente para Entrar");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Módulo Defensivo de Execução Segura",
        code: `using UnityEngine;
using System;

public class ResilienciaManager : MonoBehaviour
{
    void Start()
    {
        try
        {
            int v = 100;
            Debug.Log("Processamento Seguro: " + v);
        }
        catch (Exception)
        {
        }

        int div = 0;
        if (div == 0) Debug.Log("Aviso: Divisao por Zero Evitada!");

        bool comp = false;
        if (!comp) Debug.Log("Erro Evitado: Componente Nulo");

        Debug.Log("Bloco Finally: Arquivo Fechado");

        int req = 50;
        int ply = 20;
        if (ply < req) Debug.Log("Excecao: Nivel Insuficiente para Entrar");
    }
}`,
        output: "Processamento Seguro: 100\nAviso: Divisao por Zero Evitada!\nErro Evitado: Componente Nulo\nBloco Finally: Arquivo Fechado\nExcecao: Nivel Insuficiente para Entrar"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Tratamento de Exceções com Try/Catch e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using System;

public class ExemploTratamentoExcecoes : MonoBehaviour
{
    void Start()
    {
        // 1. Processamento seguro com try/catch
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch (Exception e)
        {
            Debug.Log("Erro Capturado: " + e.Message);
        }

        // 2. Prevenção de divisão por zero
        int divisor = 0;
        if (divisor == 0)
        {
            Debug.Log("Aviso: Divisao por Zero Evitada!");
        }

        // 3. Checagem defensiva de componente nulo
        bool componenteExiste = false;
        if (!componenteExiste)
        {
            Debug.Log("Erro Evitado: Componente Nulo");
        }

        // 4. Bloco Finally de limpeza
        string statusLimpeza = "Bloco Finally: Arquivo Fechado";
        Debug.Log(statusLimpeza);

        // 5. Validação de nível e disparo controlado
        int nivelRequerido = 50;
        int nivelPlayer = 20;
        if (nivelPlayer < nivelRequerido)
        {
            Debug.Log("Excecao: Nivel Insuficiente para Entrar");
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Tratamento de Exceções com Try/Catch:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use try/catch e emita o valor processado
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch
        {
            Debug.Log("Erro capturado");
        }
    }
}`,
                hint: "Processamento Seguro: 100"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_36_1",
            title: "Tratamento de Exceção Simples com Try/Catch",
            difficulty: "easy",
            description: "Utilize uma estrutura try/catch: no bloco try, execute int valor = 100; e emita 'Processamento Seguro: ' + valor.",
            validationRules: { requiredPatterns: ["try","catch","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use try/catch e emita o valor processado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch
        {
            Debug.Log("Erro capturado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Processamento Seguro: 100", description: "Try/catch básico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: try, catch" },
                { level: "II", text: "A saída no console deve conter exatamente: Processamento Seguro: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        try\n        {\n            int valor = 100;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["try","catch","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Processamento Seguro: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_2",
            title: "Prevenção de Divisão por Zero",
            difficulty: "easy",
            description: "Declare int divisor = 0;. Se divisor == 0, emita 'Aviso: Divisao por Zero Evitada!', senão divida.",
            validationRules: { requiredPatterns: ["int divisor","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide divisor antes de calcular
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int divisor = 0;
        if (divisor == 0)
        {
            Debug.Log("Aviso: Divisao por Zero Evitada!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Aviso: Divisao por Zero Evitada!", description: "Prevenção de divisão por zero" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int divisor, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Aviso: Divisao por Zero Evitada!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int divisor = 0;\n        if (divisor == 0)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int divisor","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Aviso: Divisao por Zero Evitada!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_3",
            title: "Tratamento de NullReferenceException",
            difficulty: "medium",
            description: "Simule a checagem defensiva de componente nulo: declare bool componenteExiste = false;. Se não existir, emita 'Erro Evitado: Componente Nulo'.",
            validationRules: { requiredPatterns: ["bool componenteExiste","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se o componente e nulo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool componenteExiste = false;
        if (!componenteExiste)
        {
            Debug.Log("Erro Evitado: Componente Nulo");
        }
    }
}`,
            tests: [
                { input: "", expected: "Erro Evitado: Componente Nulo", description: "Defensive null check" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool componenteExiste, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Erro Evitado: Componente Nulo" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool componenteExiste = false;\n        if (!componenteExiste)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool componenteExiste","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Erro Evitado: Componente Nulo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_4",
            title: "Bloco Finally de Limpeza",
            difficulty: "medium",
            description: "Declare string statusLimpeza = 'Bloco Finally: Arquivo Fechado';. Emita a mensagem com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusLimpeza","statusLimpeza","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusLimpeza e emita a finalizacao do bloco
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusLimpeza = "Bloco Finally: Arquivo Fechado";
        Debug.Log(statusLimpeza);
    }
}`,
            tests: [
                { input: "", expected: "Bloco Finally: Arquivo Fechado", description: "Bloco finally" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusLimpeza, statusLimpeza" },
                { level: "II", text: "A saída no console deve conter exatamente: Bloco Finally: Arquivo Fechado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusLimpeza = \"Bloco Finally: Arquivo Fechado\";\n        Debug.Log(statusLimpeza);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusLimpeza","statusLimpeza","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Bloco Finally: Arquivo Fechado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 5, maxStars: 6 },
            title: "Lançamento de Erro Personalizado (Throw)",
            difficulty: "medium",
            description: "Declare int nivelRequerido = 50; int nivelPlayer = 20;. Se nivelPlayer < nivelRequerido, emita 'Excecao: Nivel Insuficiente para Entrar'.",
            validationRules: { requiredPatterns: ["nivelRequerido","nivelPlayer","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide o nivel e lance a mensagem
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivelRequerido = 50;
        int nivelPlayer = 20;
        if (nivelPlayer < nivelRequerido)
        {
            Debug.Log("Excecao: Nivel Insuficiente para Entrar");
        }
    }
}`,
            tests: [
                { input: "", expected: "Excecao: Nivel Insuficiente para Entrar", description: "Validação de exceção de regra de negócio" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: nivelRequerido, nivelPlayer" },
                { level: "II", text: "A saída no console deve conter exatamente: Excecao: Nivel Insuficiente para Entrar" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int nivelRequerido = 50;\n        int nivelPlayer = 20;\n        if (nivelPlayer < nivelRequerido)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["nivelRequerido","nivelPlayer","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Excecao: Nivel Insuficiente para Entrar";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_36 };
}
if (typeof window !== "undefined") {
    window.CAP_36 = CAP_36;
}
