/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 27
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 27 — SHADERS BÁSICOS E MATERIAIS PBR
// ═══════════════════════════════════════════════════════

const CAP_27 = {
    id: 27,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 6 },
    title: "Shaders Básicos e Materiais PBR",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Shader Rúnico",
    unlockIcon: "[SHAD]",
    character: "arkan",
    xpReward: 340,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conectando aos Pipelines Gráficos da GPU. Materiais PBR e Shader Graph ativos."
            },
            {
                    "type": "narrative",
                    "text": "Superfícies de ouro polido, couro envelhecido e gemas luminescentes reagem realisticamente à luz. Arkan Velor ajusta propriedades físicas de materiais baseados em física real (PBR)."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Um shader é o programa que roda diretamente em cada pixel da placa de vídeo para calcular sua cor final! No modelo **PBR (Physically Based Rendering)**, usamos quatro canais sagrados: **Albedo** (a cor base pura), **Metallic** (se o material é condutor ou dielétrico), **Smoothness** (o polimento da reflexão) e **Emission** (luz própria que brilha no escuro)!"
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "ARTÍFICE",
                    "cssClass": "mira",
                    "text": "E para dar feedback dinâmico quando um inimigo leva um golpe, podemos trocar seu material em tempo de execução para um shader com brilho vermelho (Flash Damage)!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Compreender os parâmetros de materiais PBR capacita o desenvolvedor a criar gráficos de alta fidelidade visual. Complete as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "MATERIAIS PBR E SHADERS NO UNITY: ALBEDO, METALLIC, SMOOTHNESS E EMISSÃO",
        explanation: "Materiais PBR simulam como a luz interage com superfícies no mundo real:\n<ul>\n  <li><strong>Cor Albedo (Base Color):</strong> A cor difusa pura da superfície sem sombras embutidas (ex: <code>string corBase = \"Vermelho_Carmim\";</code> emitindo <code>\"Cor Albedo: Vermelho_Carmim\"</code>).</li>\n  <li><strong>Grau Metálico (<code>Metallic</code>):</strong> Flutuante de 0.0 (isolante como madeira ou pedra) a 1.0 (metal puro como ouro ou ferro) que define se os reflexos absorvem a cor do metal (ex: 0.9).</li>\n  <li><strong>Rugosidade e Suavidade (<code>Smoothness</code>):</strong> Define o micro-relevo da superfície. Quanto maior, mais nítido e espelhado é o reflexo da luz (ex: 0.75).</li>\n  <li><strong>Emissão de Luz Própria (<code>Emission</code>):</strong> Faz a superfície irradiar luz própria independente da iluminação ambiente (ex: <code>float intensidadeEmissao = 2.0f;</code> emitindo <code>\"Emissao Ativa: 2x\"</code>).</li>\n  <li><strong>Troca Dinâmica de Material:</strong> Alterna instâncias de material para efeitos de combate (ex: trocar de 'Padrao' para 'Dano_Flash' ao receber dano).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploShadersPBR : MonoBehaviour
{
    void Start()
    {
        // 1. Cor Albedo base
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);

        // 2. Grau metálico
        float metallic = 0.9f;
        Debug.Log("Grau Metalico: " + metallic);

        // 3. Suavidade de reflexo (Smoothness)
        float smoothness = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + smoothness);

        // 4. Emissão de luz radiante
        bool temEmissao = true;
        float intensidadeEmissao = 2.0f;
        if (temEmissao)
        {
            Debug.Log("Emissao Ativa: " + intensidadeEmissao + "x");
        }

        // 5. Troca dinâmica de material em dano
        string materialAtual = "Padrao";
        bool atingido = true;
        if (atingido)
        {
            materialAtual = "Dano_Flash";
            Debug.Log("Material: " + materialAtual);
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Ficha de Material PBR e Efeito de Dano",
        code: `using UnityEngine;

public class MaterialInspector : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Cor Albedo: Vermelho_Carmim");

        float m = 0.9f;
        Debug.Log("Grau Metalico: " + m);

        float s = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + s);

        bool emissao = true;
        if (emissao) Debug.Log("Emissao Ativa: 2x");

        string mat = "Dano_Flash";
        Debug.Log("Material: " + mat);
    }
}`,
        output: "Cor Albedo: Vermelho_Carmim\nGrau Metalico: 0.9\nSuavidade de Reflexo: 0.75\nEmissao Ativa: 2x\nMaterial: Dano_Flash"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Shaders Básicos e Materiais PBR e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploShadersPBR : MonoBehaviour
{
    void Start()
    {
        // 1. Cor Albedo base
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);

        // 2. Grau metálico
        float metallic = 0.9f;
        Debug.Log("Grau Metalico: " + metallic);

        // 3. Suavidade de reflexo (Smoothness)
        float smoothness = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + smoothness);

        // 4. Emissão de luz radiante
        bool temEmissao = true;
        float intensidadeEmissao = 2.0f;
        if (temEmissao)
        {
            Debug.Log("Emissao Ativa: " + intensidadeEmissao + "x");
        }

        // 5. Troca dinâmica de material em dano
        string materialAtual = "Padrao";
        bool atingido = true;
        if (atingido)
        {
            materialAtual = "Dano_Flash";
            Debug.Log("Material: " + materialAtual);
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Shaders Básicos e Materiais PBR:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare corBase e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);
    }
}`,
                hint: "Cor Albedo: Vermelho_Carmim"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_27_1",
            title: "Configuração de Cor Albedo PBR",
            difficulty: "easy",
            description: "Declare string corBase = 'Vermelho_Carmim';. Emita no Console: 'Cor Albedo: Vermelho_Carmim'.",
            validationRules: { requiredPatterns: ["corBase","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare corBase e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);
    }
}`,
            tests: [
                { input: "", expected: "Cor Albedo: Vermelho_Carmim", description: "Cor Albedo do shader" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: corBase, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Cor Albedo: Vermelho_Carmim" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string corBase = \"Vermelho_Carmim\";\n        Debug.Log(\"Cor Albedo: \" + corBase);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["corBase","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Cor Albedo: Vermelho_Carmim";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_2",
            title: "Grau Metálico (Metallic)",
            difficulty: "easy",
            description: "Declare float metallic = 0.9f;. Emita no Console: 'Grau Metalico: 0.9'.",
            validationRules: { requiredPatterns: ["float metallic","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare metallic e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float metallic = 0.9f;
        Debug.Log("Grau Metalico: " + metallic);
    }
}`,
            tests: [
                { input: "", expected: "Grau Metalico: 0.9", description: "Propriedade Metallic" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float metallic, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Grau Metalico: 0.9" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float metallic = 0.9f;\n        Debug.Log(\"Grau Metalico: \" + metallic);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float metallic","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Grau Metalico: 0.9";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_3",
            title: "Rugosidade e Suavidade (Smoothness)",
            difficulty: "medium",
            description: "Declare float smoothness = 0.75f;. Emita no Console: 'Suavidade de Reflexo: 0.75'.",
            validationRules: { requiredPatterns: ["float smoothness","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare smoothness e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float smoothness = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + smoothness);
    }
}`,
            tests: [
                { input: "", expected: "Suavidade de Reflexo: 0.75", description: "Propriedade Smoothness" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float smoothness, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Suavidade de Reflexo: 0.75" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float smoothness = 0.75f;\n        Debug.Log(\"Suavidade de Reflexo: \" + smoothness);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float smoothness","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Suavidade de Reflexo: 0.75";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_4",
            title: "Emissão de Luz Própria (Emission)",
            difficulty: "medium",
            description: "Declare bool temEmissao = true; e float intensidadeEmissao = 2.0f;. Se temEmissao, emita 'Emissao Ativa: 2x'.",
            validationRules: { requiredPatterns: ["bool temEmissao","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se ha emissao de luz
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temEmissao = true;
        float intensidadeEmissao = 2.0f;
        if (temEmissao)
        {
            Debug.Log("Emissao Ativa: " + intensidadeEmissao + "x");
        }
    }
}`,
            tests: [
                { input: "", expected: "Emissao Ativa: 2x", description: "Emission shader property" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool temEmissao, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Emissao Ativa: 2x" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool temEmissao = true;\n        float intensidadeEmissao = 2.0f;\n        if (temEmissao)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool temEmissao","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Emissao Ativa: 2x";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 6 },
            title: "Troca Dinâmica de Material",
            difficulty: "medium",
            description: "Declare string materialAtual = 'Padrao';. Quando atingido (bool atingido = true), troque materialAtual para 'Dano_Flash' e emita 'Material: ' + materialAtual.",
            validationRules: { requiredPatterns: ["materialAtual","bool atingido","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Troque o material em caso de dano
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string materialAtual = "Padrao";
        bool atingido = true;
        if (atingido)
        {
            materialAtual = "Dano_Flash";
        }
        Debug.Log("Material: " + materialAtual);
    }
}`,
            tests: [
                { input: "", expected: "Material: Dano_Flash", description: "Troca dinâmica de material" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: materialAtual, bool atingido" },
                { level: "II", text: "A saída no console deve conter exatamente: Material: Dano_Flash" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string materialAtual = \"Padrao\";\n        bool atingido = true;\n        if (atingido)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["materialAtual","bool atingido","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Material: Dano_Flash";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_27 };
}
if (typeof window !== "undefined") {
    window.CAP_27 = CAP_27;
}
