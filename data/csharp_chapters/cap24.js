/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 24
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 24 — SISTEMAS DE PARTÍCULAS (VFX)
// ═══════════════════════════════════════════════════════

const CAP_24 = {
    id: 24,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
    title: "Sistemas de Partículas (VFX)",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Faísca VFX",
    unlockIcon: "[VFX]",
    character: "mira",
    xpReward: 310,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando os Emissores de Energia e Fluidos. Sistema de Partículas (VFX) ativo."
            },
            {
                    "type": "narrative",
                    "text": "Faíscas ardentes, brasas incandescentes e labaredas mágicas explodem em sincronia. Mira Solenn molda sistemas de partículas com propriedades dinâmicas de emissão."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Quando uma espada colide com um escudo ou uma magia explode, o impacto visual é garantido pelo **Particle System**! Ele gera centenas de partículas microscópicas com controle total de tempo de vida e velocidade."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Configuramos a taxa de emissão por segundo (<code>rateOverTime</code>), o tempo de vida (<code>lifetime</code>) antes de sumirem, e se o efeito deve rodar em looping contínuo (como uma tocha acesa) ou disparar uma única vez com <code>Play()</code> e <code>Stop()</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Um bom efeito visual fornece o feedback tátil e cinestésico do combate. Domine o controle de emissão, loop e encerramento de VFX neste capítulo."
            }
    ],
    concept: {
        title: "SISTEMAS DE PARTÍCULAS NO UNITY: EMISSÃO, LIFETIME, TAXAS E CONTROLE DE REPRODUÇÃO",
        explanation: "O <code>ParticleSystem</code> do Unity gera efeitos visuais de magia, fogo, fumaça e faíscas:\n<ul>\n  <li><strong>Emissão de Impacto (<code>Play</code>):</strong> Dispara o nascimento do efeito visual (ex: <code>string efeito = \"Faíscas de Impacto\";</code> emitindo <code>\"VFX Play: \" + efeito</code>).</li>\n  <li><strong>Taxa de Emissão (<code>emission.rateOverTime</code>):</strong> Quantidade de partículas geradas por segundo na simulação (ex: <code>int taxaEmissao = 50;</code> emitindo <code>\"Taxa de Emissao: 50 particulas/s\"</code>).</li>\n  <li><strong>Tempo de Vida (<code>startLifetime</code>):</strong> Quantos segundos cada partícula individual sobrevive no espaço antes de desvanecer (ex: <code>float duracao = 2.5f;</code> emitindo <code>\"Tempo de Vida: 2.5s\"</code>).</li>\n  <li><strong>Efeito em Loop Contínuo (<code>loop</code>):</strong> Propriedade booleana que mantém o emissor ativo indefinidamente (ex: tochas e auras).</li>\n  <li><strong>Interrupção do Sistema (<code>Stop</code>):</strong> Encerra a geração de novas partículas, permitindo que as partículas já vivas se dissipem naturalmente no ar (ex: <code>\"VFX Stop: Emissao Encerrada\"</code>).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploParticulas : MonoBehaviour
{
    void Start()
    {
        // 1. Disparo de efeito de impacto
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);

        // 2. Taxa de partículas por segundo
        int taxaEmissao = 50;
        Debug.Log("Taxa de Emissao: " + taxaEmissao + " particulas/s");

        // 3. Tempo de vida de cada partícula
        float duracao = 2.5f;
        Debug.Log("Tempo de Vida: " + duracao + "s");

        // 4. Estado de looping contínuo
        bool estaEmLoop = true;
        if (estaEmLoop)
        {
            Debug.Log("VFX em Execucao Continua");
        }

        // 5. Interrupção de emissão
        string statusVfx = "VFX Stop: Emissao Encerrada";
        Debug.Log(statusVfx);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Controlador de Efeito de Combate",
        code: `using UnityEngine;

public class VFXController : MonoBehaviour
{
    void Start()
    {
        Debug.Log("VFX Play: Faíscas de Impacto");

        int taxa = 50;
        Debug.Log("Taxa de Emissao: " + taxa + " particulas/s");

        float vida = 2.5f;
        Debug.Log("Tempo de Vida: " + vida + "s");

        bool loop = true;
        if (loop) Debug.Log("VFX em Execucao Continua");

        Debug.Log("VFX Stop: Emissao Encerrada");
    }
}`,
        output: "VFX Play: Faíscas de Impacto\nTaxa de Emissao: 50 particulas/s\nTempo de Vida: 2.5s\nVFX em Execucao Continua\nVFX Stop: Emissao Encerrada"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Sistemas de Partículas (VFX) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploParticulas : MonoBehaviour
{
    void Start()
    {
        // 1. Disparo de efeito de impacto
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);

        // 2. Taxa de partículas por segundo
        int taxaEmissao = 50;
        Debug.Log("Taxa de Emissao: " + taxaEmissao + " particulas/s");

        // 3. Tempo de vida de cada partícula
        float duracao = 2.5f;
        Debug.Log("Tempo de Vida: " + duracao + "s");

        // 4. Estado de looping contínuo
        bool estaEmLoop = true;
        if (estaEmLoop)
        {
            Debug.Log("VFX em Execucao Continua");
        }

        // 5. Interrupção de emissão
        string statusVfx = "VFX Stop: Emissao Encerrada";
        Debug.Log(statusVfx);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Sistemas de Partículas (VFX):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare efeito e emita a reproducao do VFX
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);
    }
}`,
                hint: "VFX Play: Faíscas de Impacto"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_24_1",
            title: "Emissão de Efeito de Impacto",
            difficulty: "easy",
            description: "Declare string efeito = 'Faíscas de Impacto';. Simule a emissão emitindo no Console: 'VFX Play: ' + efeito.",
            validationRules: { requiredPatterns: ["string efeito","efeito","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare efeito e emita a reproducao do VFX
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);
    }
}`,
            tests: [
                { input: "", expected: "VFX Play: Faíscas de Impacto", description: "Disparo de VFX" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string efeito, efeito" },
                { level: "II", text: "A saída no console deve conter exatamente: VFX Play: Faíscas de Impacto" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string efeito = \"Faíscas de Impacto\";\n        Debug.Log(\"VFX Play: \" + efeito);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string efeito","efeito","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "VFX Play: Faíscas de Impacto";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_2",
            title: "Taxa de Emissão de Partículas",
            difficulty: "easy",
            description: "Declare int taxaEmissao = 50;. Emita no Console: 'Taxa de Emissao: 50 particulas/s'.",
            validationRules: { requiredPatterns: ["int taxaEmissao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare taxaEmissao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int taxaEmissao = 50;
        Debug.Log("Taxa de Emissao: " + taxaEmissao + " particulas/s");
    }
}`,
            tests: [
                { input: "", expected: "Taxa de Emissao: 50 particulas/s", description: "Taxa de emissão" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int taxaEmissao, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Taxa de Emissao: 50 particulas/s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int taxaEmissao = 50;\n        Debug.Log(\"Taxa de Emissao: \" + taxaEmissao + \" particulas/s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int taxaEmissao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Taxa de Emissao: 50 particulas/s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_3",
            title: "Tempo de Vida das Partículas (Lifetime)",
            difficulty: "medium",
            description: "Declare float duracao = 2.5f;. Emita no Console: 'Tempo de Vida: 2.5s'.",
            validationRules: { requiredPatterns: ["float duracao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare duracao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float duracao = 2.5f;
        Debug.Log("Tempo de Vida: " + duracao + "s");
    }
}`,
            tests: [
                { input: "", expected: "Tempo de Vida: 2.5s", description: "Particle Lifetime" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float duracao, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Tempo de Vida: 2.5s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float duracao = 2.5f;\n        Debug.Log(\"Tempo de Vida: \" + duracao + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float duracao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Tempo de Vida: 2.5s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_4",
            title: "Efeito em Loop Contínuo",
            difficulty: "medium",
            description: "Declare bool estaEmLoop = true;. Se for verdadeiro, emita 'VFX em Execucao Continua'.",
            validationRules: { requiredPatterns: ["bool estaEmLoop","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se o efeito esta em loop
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaEmLoop = true;
        if (estaEmLoop)
        {
            Debug.Log("VFX em Execucao Continua");
        }
    }
}`,
            tests: [
                { input: "", expected: "VFX em Execucao Continua", description: "Looping VFX" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaEmLoop, if" },
                { level: "II", text: "A saída no console deve conter exatamente: VFX em Execucao Continua" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaEmLoop = true;\n        if (estaEmLoop)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaEmLoop","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "VFX em Execucao Continua";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
            title: "Interrupção do Sistema de Partículas (Stop)",
            difficulty: "medium",
            description: "Declare string statusVfx = 'VFX Stop: Emissao Encerrada';. Emita a mensagem com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusVfx","statusVfx","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusVfx e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusVfx = "VFX Stop: Emissao Encerrada";
        Debug.Log(statusVfx);
    }
}`,
            tests: [
                { input: "", expected: "VFX Stop: Emissao Encerrada", description: "Parada de partículas" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusVfx, statusVfx" },
                { level: "II", text: "A saída no console deve conter exatamente: VFX Stop: Emissao Encerrada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusVfx = \"VFX Stop: Emissao Encerrada\";\n        Debug.Log(statusVfx);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusVfx","statusVfx","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "VFX Stop: Emissao Encerrada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_24 };
}
if (typeof window !== "undefined") {
    window.CAP_24 = CAP_24;
}
