/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 22
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 22 — ILUMINAÇÃO, APV E POST-PROCESSING
// ═══════════════════════════════════════════════════════

const CAP_22 = {
    id: 22,
    artifactReward: { artifactId: "Ring_Draco", minStars: 4, maxStars: 6 },
    title: "Iluminação, APV e Post-Processing",
    theme: "Módulo 7 — Mundo 3D",
    unlock: "Luz Razoável APV",
    unlockIcon: "[LIGHT]",
    character: "lyra",
    xpReward: 290,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando o Pipeline de Renderização Universal (URP). Iluminação global, APV e pós-processamento ativados."
            },
            {
                    "type": "narrative",
                    "text": "Feixes de luz dourada atravessam vitrais góticos. Sombras suaves desenham o relevo enquanto um brilho etéreo (bloom) envolve cristais de mana."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "A iluminação é a alma da atmosfera de um jogo! Uma **Directional Light** simula a luz do sol infinito projetando sombras suaves em tempo real com <code>SoftShadows</code>."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "No Unity moderno, o novo sistema de **Adaptive Probe Volumes (APV)** espalha milhares de sondas volumétricas de luz pela cena, iluminando personagens em movimento com precisão de iluminação global. E os volumes de **Post-Processing** adicionam efeitos cinematográficos como Bloom e Vinheta!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "O efeito Bloom faz superfícies luminosas transbordarem brilho nos olhos do jogador, enquanto o Color Grading dita o tom emocional da narrativa. Pratique esses parâmetros vitais."
            }
    ],
    concept: {
        title: "ILUMINAÇÃO NO UNITY: LUZ DIRECIONAL, SOFT SHADOWS, ADAPTIVE PROBE VOLUMES E BLOOM",
        explanation: "A iluminação e o pós-processamento transformam modelos simples em uma cena rica e cinematográfica:\n<ul>\n  <li><strong>Intensidade da Luz Solar (Directional Light):</strong> Modela a luz emitida a uma distância infinita, medida em Lux (ex: <code>float intensidadeLuz = 1.2f;</code> emitindo <code>\"Intensidade Solar: 1.2 Lux\"</code>).</li>\n  <li><strong>Sombras em Tempo Real:</strong> As sombras suaves (<code>SoftShadows</code>) filtram as bordas da penumbra, conferindo realismo à projeção de corpos sólidos.</li>\n  <li><strong>Adaptive Probe Volumes (APV):</strong> A tecnologia moderna de iluminação global que distribui sondas de luz volumétricas adaptáveis na cena (ex: 250 probes gravadas).</li>\n  <li><strong>Efeito Bloom de Pós-Processamento:</strong> Simula o transbordamento óptico de luz intensa na lente da câmera quando ativado (ex: <code>\"Bloom Ativo com Intensidade: 0.8\"</code>).</li>\n  <li><strong>Vinheta Cinematográfica:</strong> Efeito visual que escurece suavemente os cantos da tela, focando o olhar do jogador no centro da ação (ex: intensidade 0.35).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploIluminacao : MonoBehaviour
{
    void Start()
    {
        // 1. Intensidade solar
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");

        // 2. Tipo de sombra
        string tipoSombra = "SoftShadows";
        Debug.Log("Tipo de Sombra: " + tipoSombra);

        // 3. Sondas volumétricas de luz (APV)
        int totalProbes = 250;
        Debug.Log("Adaptive Probe Volumes: " + totalProbes + " probes");

        // 4. Efeito Bloom
        bool bloomAtivo = true;
        float intensidadeBloom = 0.8f;
        if (bloomAtivo)
        {
            Debug.Log("Bloom Ativo com Intensidade: " + intensidadeBloom);
        }

        // 5. Vinheta de pós-processamento
        float vinhetaIntensidade = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinhetaIntensidade);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Painel de Iluminação e Atmosfera Visual",
        code: `using UnityEngine;

public class AtmosferaURP : MonoBehaviour
{
    void Start()
    {
        float lux = 1.2f;
        Debug.Log("Intensidade Solar: " + lux + " Lux");

        Debug.Log("Tipo de Sombra: SoftShadows");

        int probes = 250;
        Debug.Log("Adaptive Probe Volumes: " + probes + " probes");

        bool bloom = true;
        if (bloom) Debug.Log("Bloom Ativo com Intensidade: 0.8");

        float vinheta = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinheta);
    }
}`,
        output: "Intensidade Solar: 1.2 Lux\nTipo de Sombra: SoftShadows\nAdaptive Probe Volumes: 250 probes\nBloom Ativo com Intensidade: 0.8\nVinheta Cinematica: 0.35"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Iluminação, APV e Post-Processing e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploIluminacao : MonoBehaviour
{
    void Start()
    {
        // 1. Intensidade solar
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");

        // 2. Tipo de sombra
        string tipoSombra = "SoftShadows";
        Debug.Log("Tipo de Sombra: " + tipoSombra);

        // 3. Sondas volumétricas de luz (APV)
        int totalProbes = 250;
        Debug.Log("Adaptive Probe Volumes: " + totalProbes + " probes");

        // 4. Efeito Bloom
        bool bloomAtivo = true;
        float intensidadeBloom = 0.8f;
        if (bloomAtivo)
        {
            Debug.Log("Bloom Ativo com Intensidade: " + intensidadeBloom);
        }

        // 5. Vinheta de pós-processamento
        float vinhetaIntensidade = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinhetaIntensidade);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Iluminação, APV e Post-Processing:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare intensidadeLuz e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");
    }
}`,
                hint: "Intensidade Solar: 1.2 Lux"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_22_1",
            title: "Intensidade da Luz Direcional (Sol)",
            difficulty: "easy",
            description: "Declare float intensidadeLuz = 1.2f;. Emita no Console: 'Intensidade Solar: 1.2 Lux'.",
            validationRules: { requiredPatterns: ["float intensidadeLuz","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare intensidadeLuz e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");
    }
}`,
            tests: [
                { input: "", expected: "Intensidade Solar: 1.2 Lux", description: "Intensidade de luz" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float intensidadeLuz, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Intensidade Solar: 1.2 Lux" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float intensidadeLuz = 1.2f;\n        Debug.Log(\"Intensidade Solar: \" + intensidadeLuz + \" Lux\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float intensidadeLuz","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Intensidade Solar: 1.2 Lux";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_2",
            title: "Sombras em Tempo Real (Shadows)",
            difficulty: "easy",
            description: "Declare string tipoSombra = 'SoftShadows';. Emita no Console: 'Tipo de Sombra: SoftShadows'.",
            validationRules: { requiredPatterns: ["tipoSombra","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tipoSombra e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tipoSombra = "SoftShadows";
        Debug.Log("Tipo de Sombra: " + tipoSombra);
    }
}`,
            tests: [
                { input: "", expected: "Tipo de Sombra: SoftShadows", description: "Modo de sombras" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tipoSombra, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Tipo de Sombra: SoftShadows" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tipoSombra = \"SoftShadows\";\n        Debug.Log(\"Tipo de Sombra: \" + tipoSombra);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tipoSombra","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Tipo de Sombra: SoftShadows";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_3",
            title: "Sondas de Luz Adaptativas (APV)",
            difficulty: "medium",
            description: "Declare int totalProbes = 250;. Emita no Console: 'Adaptive Probe Volumes: 250 probes'.",
            validationRules: { requiredPatterns: ["int totalProbes","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalProbes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalProbes = 250;
        Debug.Log("Adaptive Probe Volumes: " + totalProbes + " probes");
    }
}`,
            tests: [
                { input: "", expected: "Adaptive Probe Volumes: 250 probes", description: "APV probes" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int totalProbes, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Adaptive Probe Volumes: 250 probes" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalProbes = 250;\n        Debug.Log(\"Adaptive Probe Volumes: \" + totalProbes + \" probes\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int totalProbes","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Adaptive Probe Volumes: 250 probes";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_4",
            title: "Efeito Bloom de Pós-Processamento",
            difficulty: "medium",
            description: "Declare bool bloomAtivo = true; e float intensidadeBloom = 0.8f;. Se bloomAtivo, emita 'Bloom Ativo com Intensidade: 0.8'.",
            validationRules: { requiredPatterns: ["bool bloomAtivo","float intensidadeBloom","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide e emita o Bloom
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool bloomAtivo = true;
        float intensidadeBloom = 0.8f;
        if (bloomAtivo)
        {
            Debug.Log("Bloom Ativo com Intensidade: " + intensidadeBloom);
        }
    }
}`,
            tests: [
                { input: "", expected: "Bloom Ativo com Intensidade: 0.8", description: "Post-Processing Bloom" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool bloomAtivo, float intensidadeBloom" },
                { level: "II", text: "A saída no console deve conter exatamente: Bloom Ativo com Intensidade: 0.8" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool bloomAtivo = true;\n        float intensidadeBloom = 0.8f;\n        if (bloomAtivo)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool bloomAtivo","float intensidadeBloom","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Bloom Ativo com Intensidade: 0.8";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_5",
            artifactReward: { artifactId: "Ring_Draco", minStars: 4, maxStars: 6 },
            title: "Color Grading e Vinheta",
            difficulty: "medium",
            description: "Declare float vinhetaIntensidade = 0.35f;. Emita no Console: 'Vinheta Cinematica: 0.35'.",
            validationRules: { requiredPatterns: ["float vinhetaIntensidade","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare vinhetaIntensidade e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float vinhetaIntensidade = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinhetaIntensidade);
    }
}`,
            tests: [
                { input: "", expected: "Vinheta Cinematica: 0.35", description: "Vignette effect" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float vinhetaIntensidade, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Vinheta Cinematica: 0.35" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float vinhetaIntensidade = 0.35f;\n        Debug.Log(\"Vinheta Cinematica: \" + vinhetaIntensidade);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float vinhetaIntensidade","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vinheta Cinematica: 0.35";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_22 };
}
if (typeof window !== "undefined") {
    window.CAP_22 = CAP_22;
}
