/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 37
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 37 — OTIMIZAÇÃO, PROFILING E DRAW CALLS
// ═══════════════════════════════════════════════════════

const CAP_37 = {
    id: 37,
    artifactReward: { artifactId: "Ring_Oroborus", minStars: 5, maxStars: 6 },
    title: "Otimização, Profiling e Draw Calls",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Códice Supremo da Engine",
    unlockIcon: "[OPT]",
    character: "arkan",
    xpReward: 450,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando o Ápice da Engenharia de Jogos. Profiling, Batching, Occlusion Culling e LODs ativados."
            },
            {
                    "type": "narrative",
                    "text": "O santuário ressoa em sua máxima capacidade computacional. Arkan Velor avalia o Profiler do Unity: a taxa de quadros é sólida como rocha e os draw calls despencam."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Chegamos ao último capítulo da Dimensão C#, Codemancer! Qualquer um pode programar um jogo que rode a 60 FPS com 5 objetos na tela. O verdadeiro Engenheiro de Jogos é aquele cujo mundo colossal, com milhares de entidades, roda fluido e estável em qualquer máquina!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Dominamos as quatro técnicas de ouro: **Batching** para agrupar 120 draw calls em apenas 25; **Occlusion Culling** para nunca renderizar o que está atrás de paredes; **LOD Groups** para reduzir a complexidade da malha quando a câmera está distante; e travamento de taxa de quadros estável com <code>Application.targetFrameRate</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Ao concluir estas 5 atividades finais, você terá dominado a teoria, os exemplos e a prática completa dos 38 capítulos de C# e Unity 6.5. O Santuário da GuildCode saúda sua maestria dimensional!"
            }
    ],
    concept: {
        title: "OTIMIZAÇÃO PROFISSIONAL NO UNITY: DRAW CALLS, BATCHING, OCCLUSION CULLING, LOD GROUPS E TARGETFRAMERATE",
        explanation: "A otimização transforma uma simulação pesada em um jogo leve, rápido e com framerate cravado:\n<ul>\n  <li><strong>Redução de Draw Calls com Batching:</strong> A CPU envia ordens de desenho (draw calls) para a GPU. Agrupar múltiplos objetos estáticos ou dinâmicos reduz as chamadas drasticamente (ex: de 120 para 25 chamadas).</li>\n  <li><strong>Ocultamento por Oclusão (Occlusion Culling):</strong> Desliga a renderização de qualquer geometria que esteja encoberta por outras paredes ou montanhas na visão da câmera (ex: renderizar apenas 150 de 1000 objetos na cena).</li>\n  <li><strong>Níveis de Detalhe (LOD Groups):</strong> Substitui malhas altamente detalhadas (LOD0) por malhas simplificadas (LOD1 e LOD2) à medida que o objeto se afasta da câmera (ex: a mais de 50 metros, ativa LOD2 baixo).</li>\n  <li><strong>Estabilidade de Taxa de Quadros (<code>Application.targetFrameRate</code>):</strong> Trava o framerate alvo (ex: 60 FPS) para evitar oscilações bruscas e aquecimento desnecessário de hardware.</li>\n  <li><strong>Monitoramento no Unity Profiler:</strong> Inspeciona a alocação de memória e tempo de CPU por quadro (ex: medir memória gerenciada em 450.5 MB).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploOtimizacao : MonoBehaviour
{
    void Start()
    {
        // 1. Otimização de draw calls via batching
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);

        // 2. Occlusion Culling (renderização apenas do visível)
        int objetosNaCena = 1000;
        int objetosRenderizados = 150;
        Debug.Log("Renderizados com Oclusao: " + objetosRenderizados + "/" + objetosNaCena);

        // 3. Nível de Detalhe (LOD Group) por distância
        float distanciaCamera = 60.0f;
        string lod = "LOD0 (Alto)";
        if (distanciaCamera >= 50.0f)
        {
            lod = "LOD2 (Baixo)";
        }
        Debug.Log("Malha Ativa: " + lod);

        // 4. Trava de taxa de quadros (targetFrameRate)
        int targetFps = 60;
        Debug.Log("Trava de FPS: " + targetFps + " FPS");

        // 5. Telemetria de memória no Profiler
        float memoriaUsadaMB = 450.5f;
        Debug.Log("Memoria Alocada: " + memoriaUsadaMB + " MB");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Painel de Profiling e Diagnóstico de Performance",
        code: `using UnityEngine;

public class ProfilerDashboard : MonoBehaviour
{
    void Start()
    {
        int antes = 120;
        int depois = 25;
        Debug.Log("Draw Calls Reduzidos de " + antes + " para " + depois);

        int total = 1000;
        int visiveis = 150;
        Debug.Log("Renderizados com Oclusao: " + visiveis + "/" + total);

        float dist = 60.0f;
        string l = dist >= 50.0f ? "LOD2 (Baixo)" : "LOD0 (Alto)";
        Debug.Log("Malha Ativa: " + l);

        int fps = 60;
        Debug.Log("Trava de FPS: " + fps + " FPS");

        float mem = 450.5f;
        Debug.Log("Memoria Alocada: " + mem + " MB");
    }
}`,
        output: "Draw Calls Reduzidos de 120 para 25\nRenderizados com Oclusao: 150/1000\nMalha Ativa: LOD2 (Baixo)\nTrava de FPS: 60 FPS\nMemoria Alocada: 450.5 MB"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Otimização, Profiling e Draw Calls e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploOtimizacao : MonoBehaviour
{
    void Start()
    {
        // 1. Otimização de draw calls via batching
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);

        // 2. Occlusion Culling (renderização apenas do visível)
        int objetosNaCena = 1000;
        int objetosRenderizados = 150;
        Debug.Log("Renderizados com Oclusao: " + objetosRenderizados + "/" + objetosNaCena);

        // 3. Nível de Detalhe (LOD Group) por distância
        float distanciaCamera = 60.0f;
        string lod = "LOD0 (Alto)";
        if (distanciaCamera >= 50.0f)
        {
            lod = "LOD2 (Baixo)";
        }
        Debug.Log("Malha Ativa: " + lod);

        // 4. Trava de taxa de quadros (targetFrameRate)
        int targetFps = 60;
        Debug.Log("Trava de FPS: " + targetFps + " FPS");

        // 5. Telemetria de memória no Profiler
        float memoriaUsadaMB = 450.5f;
        Debug.Log("Memoria Alocada: " + memoriaUsadaMB + " MB");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Otimização, Profiling e Draw Calls:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os valores e emita a reducao
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);
    }
}`,
                hint: "Draw Calls Reduzidos de 120 para 25"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_37_1",
            title: "Otimização de Draw Calls com Batching",
            difficulty: "easy",
            description: "Declare int drawCallsAntes = 120; int drawCallsDepois = 25;. Emita: 'Draw Calls Reduzidos de 120 para 25'.",
            validationRules: { requiredPatterns: ["drawCallsAntes","drawCallsDepois","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os valores e emita a reducao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);
    }
}`,
            tests: [
                { input: "", expected: "Draw Calls Reduzidos de 120 para 25", description: "Redução de draw calls" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: drawCallsAntes, drawCallsDepois" },
                { level: "II", text: "A saída no console deve conter exatamente: Draw Calls Reduzidos de 120 para 25" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int drawCallsAntes = 120;\n        int drawCallsDepois = 25;\n        Debug.Log(\"Draw Calls Reduzidos de \" + drawCallsAntes + \" para \" + drawCallsDepois);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["drawCallsAntes","drawCallsDepois","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Draw Calls Reduzidos de 120 para 25";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_2",
            title: "Ocultamento por Oclusão (Occlusion Culling)",
            difficulty: "easy",
            description: "Declare int objetosNaCena = 1000; int objetosRenderizados = 150;. Emita no Console: 'Renderizados com Oclusao: 150/1000'.",
            validationRules: { requiredPatterns: ["objetosNaCena","objetosRenderizados","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os objetos e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int objetosNaCena = 1000;
        int objetosRenderizados = 150;
        Debug.Log("Renderizados com Oclusao: " + objetosRenderizados + "/" + objetosNaCena);
    }
}`,
            tests: [
                { input: "", expected: "Renderizados com Oclusao: 150/1000", description: "Occlusion Culling" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: objetosNaCena, objetosRenderizados" },
                { level: "II", text: "A saída no console deve conter exatamente: Renderizados com Oclusao: 150/1000" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int objetosNaCena = 1000;\n        int objetosRenderizados = 150;\n        Debug.Log(\"Renderizados com Oclusao: \" + objetosRenderizados + \"/\" + objetosNaCena);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["objetosNaCena","objetosRenderizados","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Renderizados com Oclusao: 150/1000";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_3",
            title: "Níveis de Detalhe (LOD Group)",
            difficulty: "medium",
            description: "Declare float distanciaCamera = 60.0f;. Se distanciaCamera >= 50.0f, defina lod = 'LOD2 (Baixo)' e emita 'Malha Ativa: ' + lod.",
            validationRules: { requiredPatterns: ["distanciaCamera","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a distancia e selecione o LOD
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float distanciaCamera = 60.0f;
        if (distanciaCamera >= 50.0f)
        {
            string lod = "LOD2 (Baixo)";
            Debug.Log("Malha Ativa: " + lod);
        }
    }
}`,
            tests: [
                { input: "", expected: "Malha Ativa: LOD2 (Baixo)", description: "LOD Group" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: distanciaCamera, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Malha Ativa: LOD2 (Baixo)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float distanciaCamera = 60.0f;\n        if (distanciaCamera >= 50.0f)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["distanciaCamera","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Malha Ativa: LOD2 (Baixo)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_4",
            title: "Estabilidade de Taxa de Quadros (TargetFrameRate)",
            difficulty: "medium",
            description: "Declare int targetFps = 60;. Emita no Console: 'Trava de FPS: 60 FPS'.",
            validationRules: { requiredPatterns: ["int targetFps","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare targetFps e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int targetFps = 60;
        Debug.Log("Trava de FPS: " + targetFps + " FPS");
    }
}`,
            tests: [
                { input: "", expected: "Trava de FPS: 60 FPS", description: "TargetFrameRate" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int targetFps, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Trava de FPS: 60 FPS" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int targetFps = 60;\n        Debug.Log(\"Trava de FPS: \" + targetFps + \" FPS\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int targetFps","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Trava de FPS: 60 FPS";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_5",
            artifactReward: { artifactId: "Ring_Oroborus", minStars: 5, maxStars: 6 },
            title: "Monitoramento de Memória no Profiler",
            difficulty: "medium",
            description: "Declare float memoriaUsadaMB = 450.5f;. Emita no Console: 'Memoria Alocada: 450.5 MB'.",
            validationRules: { requiredPatterns: ["float memoriaUsadaMB","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare memoriaUsadaMB e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float memoriaUsadaMB = 450.5f;
        Debug.Log("Memoria Alocada: " + memoriaUsadaMB + " MB");
    }
}`,
            tests: [
                { input: "", expected: "Memoria Alocada: 450.5 MB", description: "Profiler de memória" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float memoriaUsadaMB, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Memoria Alocada: 450.5 MB" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float memoriaUsadaMB = 450.5f;\n        Debug.Log(\"Memoria Alocada: \" + memoriaUsadaMB + \" MB\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float memoriaUsadaMB","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Memoria Alocada: 450.5 MB";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_37 };
}
if (typeof window !== "undefined") {
    window.CAP_37 = CAP_37;
}
