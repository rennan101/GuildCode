/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 15
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 15 — PLANOS 3D E RAYCASTING
// ═══════════════════════════════════════════════════════

const CAP_15 = {
    id: 15,
    artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 6 },
    title: "Planos 3D e Raycasting",
    theme: "Módulo 4 — Matemática 3D",
    unlock: "Prisma Raycast",
    unlockIcon: "[RAY]",
    character: "mira",
    xpReward: 220,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Inicializando o Feixe Ocular Físico. Módulo de Raycasting e Projeções Geométricas ativado."
            },
            {
                    "type": "narrative",
                    "text": "Feixes laser invisíveis e arcos de detecção partem das mãos de Mira Solenn, mapeando a distância exata de cada obstáculo e superfície da masmorra."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Raycasting é como disparar um raio laser geométrico instantâneo! Usamos <code>Physics.Raycast</code> para saber onde uma bala acertou, se o pé do herói toca o chão ou se há uma parede bloqueando a visão do monstro."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "O raio retorna um recipiente chamado <code>RaycastHit</code> contendo a distância de impacto, o ponto exato da colisão e a etiqueta da superfície atingida (como 'Chao'). E para não acertar moedas ou o próprio herói, filtramos os alvos com máscaras de camada: <code>LayerMask</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Definir alcances máximos de detecção evita processamento desnecessário na engine de física. Domine os parâmetros de Physics.Raycast neste capítulo."
            }
    ],
    concept: {
        title: "RAYCASTING NO UNITY: DISPARO FÍSICO, RAYCASTHIT, ALCANCE E LAYERMASKS",
        explanation: "Raycasting projeta uma linha geométrica através da simulação física para detectar colisores:\n<ul>\n  <li><strong>Disparo de Raycast Físico (<code>Physics.Raycast</code>):</strong> Recebe uma origem, uma direção e uma distância máxima: <code>Physics.Raycast(Vector3.zero, Vector3.forward, 10f);</code>. Retorna <code>true</code> se atingir qualquer colisor.</li>\n  <li><strong>Alcance Máximo:</strong> Limita o comprimento do raio, economizando desempenho ao evitar varreduras infinitas (ex: <code>float alcanceMax = 25.0f;</code> emitindo <code>\"Alcance do Raio: 25 metros\"</code>).</li>\n  <li><strong>Identificação de Objeto Atingido (<code>RaycastHit</code>):</strong> Quando há impacto, obtemos os dados da superfície (ex: verificar se <code>tagAtingida == \"Chao\"</code> para confirmar impacto no solo).</li>\n  <li><strong>Máscaras de Camada (<code>LayerMask</code>):</strong> Permite que o raio interaja somente com certas camadas físicas da cena (ex: camada de inimigos <code>layerInimigo = 8</code>), ignorando gatilhos e o próprio jogador.</li>\n  <li><strong>Ponto e Distância de Impacto:</strong> O struct <code>RaycastHit.distance</code> informa exatamente quão longe o impacto aconteceu (ex: <code>\"Impacto a 4.2 metros\"</code>).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploRaycasting : MonoBehaviour
{
    void Start()
    {
        // 1. Disparo de raio físico no espaço
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10f);
        Debug.Log("Raio Disparado: " + acertou);

        // 2. Configuração de alcance máximo
        float alcanceMax = 25.0f;
        Debug.Log("Alcance do Raio: " + alcanceMax + " metros");

        // 3. Checagem da superfície atingida (RaycastHit)
        string tagAtingida = "Chao";
        if (tagAtingida == "Chao")
        {
            Debug.Log("Impacto no Solo Confirmado");
        }

        // 4. Máscara de camada para filtragem
        int layerInimigo = 8;
        Debug.Log("Mascara de Camada Ativa: " + layerInimigo);

        // 5. Medição da distância de impacto
        float distHit = 4.2f;
        Debug.Log("Impacto a " + distHit + " metros");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Sistema de Sensor Óptico de Solo e Parede",
        code: `using UnityEngine;

public class SensorRaycast : MonoBehaviour
{
    void Start()
    {
        bool hit = Physics.Raycast(Vector3.zero, Vector3.forward, 10f);
        Debug.Log("Raio Disparado: " + hit);

        float alcance = 25.0f;
        Debug.Log("Alcance do Raio: " + alcance + " metros");

        string tag = "Chao";
        if (tag == "Chao") Debug.Log("Impacto no Solo Confirmado");

        int layer = 8;
        Debug.Log("Mascara de Camada Ativa: " + layer);

        float dist = 4.2f;
        Debug.Log("Impacto a " + dist + " metros");
    }
}`,
        output: "Raio Disparado: True\nAlcance do Raio: 25 metros\nImpacto no Solo Confirmado\nMascara de Camada Ativa: 8\nImpacto a 4.2 metros"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Planos 3D e Raycasting e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploRaycasting : MonoBehaviour
{
    void Start()
    {
        // 1. Disparo de raio físico no espaço
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10f);
        Debug.Log("Raio Disparado: " + acertou);

        // 2. Configuração de alcance máximo
        float alcanceMax = 25.0f;
        Debug.Log("Alcance do Raio: " + alcanceMax + " metros");

        // 3. Checagem da superfície atingida (RaycastHit)
        string tagAtingida = "Chao";
        if (tagAtingida == "Chao")
        {
            Debug.Log("Impacto no Solo Confirmado");
        }

        // 4. Máscara de camada para filtragem
        int layerInimigo = 8;
        Debug.Log("Mascara de Camada Ativa: " + layerInimigo);

        // 5. Medição da distância de impacto
        float distHit = 4.2f;
        Debug.Log("Impacto a " + distHit + " metros");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Planos 3D e Raycasting:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute Physics.Raycast
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);
        Debug.Log("Raio Disparado: " + acertou);
    }
}`,
                hint: "Raio Disparado: True"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_15_1",
            title: "Disparo de Raycast Físico",
            difficulty: "easy",
            description: "Execute um disparo de raio chamando Physics.Raycast(Vector3.zero, Vector3.forward, 10f). Emita no Console: 'Raio Disparado: True'.",
            validationRules: { requiredPatterns: ["Physics.Raycast","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute Physics.Raycast
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);
        Debug.Log("Raio Disparado: " + acertou);
    }
}`,
            tests: [
                { input: "", expected: "Raio Disparado: True", description: "Physics.Raycast simples" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Physics.Raycast, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Raio Disparado: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);\n        Debug.Log(\"Raio Disparado: \" + acertou);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Physics.Raycast","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Raio Disparado: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_2",
            title: "Alcance Máximo de Detecção",
            difficulty: "easy",
            description: "Defina a distância máxima de alcance float alcanceMax = 25.0f;. Emita no Console: 'Alcance do Raio: 25 metros'.",
            validationRules: { requiredPatterns: ["float alcanceMax","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare alcanceMax e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float alcanceMax = 25.0f;
        Debug.Log("Alcance do Raio: " + alcanceMax + " metros");
    }
}`,
            tests: [
                { input: "", expected: "Alcance do Raio: 25 metros", description: "Alcance do Raycast" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float alcanceMax, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Alcance do Raio: 25 metros" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float alcanceMax = 25.0f;\n        Debug.Log(\"Alcance do Raio: \" + alcanceMax + \" metros\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float alcanceMax","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alcance do Raio: 25 metros";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_3",
            title: "Identificação de Objeto Atingido",
            difficulty: "medium",
            description: "Simule os dados de um RaycastHit: declare string tagAtingida = 'Chao';. Se tagAtingida for 'Chao', emita 'Impacto no Solo Confirmado'.",
            validationRules: { requiredPatterns: ["string tagAtingida","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a tag atingida
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tagAtingida = "Chao";
        if (tagAtingida == "Chao")
        {
            Debug.Log("Impacto no Solo Confirmado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Impacto no Solo Confirmado", description: "Hit detection" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string tagAtingida, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Impacto no Solo Confirmado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tagAtingida = \"Chao\";\n        if (tagAtingida == \"Chao\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string tagAtingida","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Impacto no Solo Confirmado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_4",
            title: "Máscara de Colisão (LayerMask)",
            difficulty: "medium",
            description: "Simule a filtragem por camada: declare int layerInimigo = 8;. Emita no Console: 'Mascara de Camada Ativa: 8'.",
            validationRules: { requiredPatterns: ["int layerInimigo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare a layer e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int layerInimigo = 8;
        Debug.Log("Mascara de Camada Ativa: " + layerInimigo);
    }
}`,
            tests: [
                { input: "", expected: "Mascara de Camada Ativa: 8", description: "LayerMask" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int layerInimigo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Mascara de Camada Ativa: 8" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int layerInimigo = 8;\n        Debug.Log(\"Mascara de Camada Ativa: \" + layerInimigo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int layerInimigo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mascara de Camada Ativa: 8";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 6 },
            title: "Cálculo de Ponto de Impacto",
            difficulty: "medium",
            description: "Declare a distância de impacto float distHit = 4.2f;. Emita no Console: 'Impacto a ' + distHit + ' metros'.",
            validationRules: { requiredPatterns: ["float distHit","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare distHit e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float distHit = 4.2f;
        Debug.Log("Impacto a " + distHit + " metros");
    }
}`,
            tests: [
                { input: "", expected: "Impacto a 4.2 metros", description: "Distância do ponto de impacto" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float distHit, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Impacto a 4.2 metros" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float distHit = 4.2f;\n        Debug.Log(\"Impacto a \" + distHit + \" metros\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float distHit","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Impacto a 4.2 metros";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_15 };
}
if (typeof window !== "undefined") {
    window.CAP_15 = CAP_15;
}
