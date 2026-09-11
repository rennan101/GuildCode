/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 18
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 18 — CÂMERA 3ª PESSOA (CINEMACHINE)
// ═══════════════════════════════════════════════════════

const CAP_18 = {
    id: 18,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 5 },
    title: "Câmera 3ª Pessoa (Cinemachine)",
    theme: "Módulo 6 — Câmeras",
    unlock: "Lente Cinemachine",
    unlockIcon: "[CAM3]",
    character: "lyra",
    xpReward: 250,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 6 — Câmeras. Suíte Cinemachine e Câmeras Virtuais ativadas."
            },
            {
                    "type": "narrative",
                    "text": "Lentes etéreas orbitam o campo de treinamento da guilda. Lyra Nex ajusta distâncias focais e curvas de amortecimento para enquadrar a ação perfeitamente."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "No passado, programadores passavam semanas escrevendo códigos de câmera com matemática complexa. Hoje, o pacote oficial **Cinemachine** do Unity gerencia Câmeras Virtuais (vcam) de forma inteligente e cinematográfica!"
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "Configuramos o alvo do jogador com o <code>Follow Target</code> e definimos a distância orbital (como 5.0m). Para que a câmera não trema abruptamente quando o herói correr, aplicamos o amortecimento suave chamado <strong>Damping</strong>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "A transição entre diferentes câmeras virtuais (como alternar de exploração para uma cutscene de boss) ocorre de forma fluida e automática pelo Cinemachine Brain. Complete as atividades para dominar a visão em 3ª pessoa."
            }
    ],
    concept: {
        title: "CINEMACHINE NO UNITY: CÂMERAS VIRTUAIS, FOLLOW TARGET, DAMPING E TRANSIÇÕES",
        explanation: "Cinemachine gerencia as lentes e pontos de vista do jogo através de Câmeras Virtuais:\n<ul>\n  <li><strong>Alvo de Acompanhamento (Follow Target):</strong> Aponta qual Transform a câmera deve seguir pelo cenário: <code>string alvoSeguido = \"Heroi\";</code> emitindo <code>\"Cinemachine: Seguindo Heroi\"</code>.</li>\n  <li><strong>Distância Orbital da Câmera:</strong> Define o raio do orbitador em metros que separa a câmera do personagem (ex: <code>float distanciaOrbital = 5.0f;</code> emitindo <code>\"Distancia da Camera: 5m\"</code>).</li>\n  <li><strong>Amortecimento Suave (Damping):</strong> Coeficiente que suaviza a resposta da câmera aos movimentos rápidos do herói, evitando solavancos na tela (ex: <code>float damping = 0.5f;</code>).</li>\n  <li><strong>Transição entre Câmeras (Blend):</strong> O Cinemachine Brain interpola a posição e o ângulo suavemente quando alternamos entre câmeras virtuais (ex: <code>\"Transicao Suave: 1.5s\"</code>).</li>\n  <li><strong>Prioridade de Câmera:</strong> A câmera virtual com maior valor numérico de Priority assume o controle da visão do jogador instantaneamente.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploCinemachine : MonoBehaviour
{
    void Start()
    {
        // 1. Configuração do alvo de seguimento
        string alvo = "Heroi";
        Debug.Log("Cinemachine: Seguindo " + alvo);

        // 2. Ajuste de distância orbital
        float dist = 5.0f;
        Debug.Log("Distancia da Camera: " + dist + "m");

        // 3. Fator de amortecimento (Damping)
        float damping = 0.5f;
        Debug.Log("Damping Suave: " + damping);

        // 4. Tempo de transição entre câmeras virtuais
        float tempoBlend = 1.5f;
        Debug.Log("Transicao Suave: " + tempoBlend + "s");

        // 5. Prioridade de ativação da lente
        int prioridade = 10;
        Debug.Log("Prioridade da VCam: " + prioridade);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Configuração de Câmera Virtual em Terceira Pessoa",
        code: `using UnityEngine;

public class Camera3rdPerson : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Cinemachine: Seguindo Heroi");

        float d = 5.0f;
        Debug.Log("Distancia da Camera: " + d + "m");

        float damp = 0.5f;
        Debug.Log("Damping Suave: " + damp);

        float blend = 1.5f;
        Debug.Log("Transicao Suave: " + blend + "s");

        int prio = 10;
        Debug.Log("Prioridade da VCam: " + prio);
    }
}`,
        output: "Cinemachine: Seguindo Heroi\nDistancia da Camera: 5m\nDamping Suave: 0.5\nTransicao Suave: 1.5s\nPrioridade da VCam: 10"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Câmera 3ª Pessoa (Cinemachine) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploCinemachine : MonoBehaviour
{
    void Start()
    {
        // 1. Configuração do alvo de seguimento
        string alvo = "Heroi";
        Debug.Log("Cinemachine: Seguindo " + alvo);

        // 2. Ajuste de distância orbital
        float dist = 5.0f;
        Debug.Log("Distancia da Camera: " + dist + "m");

        // 3. Fator de amortecimento (Damping)
        float damping = 0.5f;
        Debug.Log("Damping Suave: " + damping);

        // 4. Tempo de transição entre câmeras virtuais
        float tempoBlend = 1.5f;
        Debug.Log("Transicao Suave: " + tempoBlend + "s");

        // 5. Prioridade de ativação da lente
        int prioridade = 10;
        Debug.Log("Prioridade da VCam: " + prioridade);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Câmera 3ª Pessoa (Cinemachine):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure alvoSeguido e emita
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string alvoSeguido = "Player";
        Debug.Log("Cinemachine Seguindo: " + alvoSeguido);
    }
}`,
                hint: "Cinemachine Seguindo: Player"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_18_1",
            title: "Configuração de Alvo (Follow Target)",
            difficulty: "easy",
            description: "Declare string alvoSeguido = 'Player';. Emita no Console: 'Cinemachine Seguindo: Player'.",
            validationRules: { requiredPatterns: ["alvoSeguido","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure alvoSeguido e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string alvoSeguido = "Player";
        Debug.Log("Cinemachine Seguindo: " + alvoSeguido);
    }
}`,
            tests: [
                { input: "", expected: "Cinemachine Seguindo: Player", description: "Cinemachine follow target" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: alvoSeguido, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Cinemachine Seguindo: Player" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string alvoSeguido = \"Player\";\n        Debug.Log(\"Cinemachine Seguindo: \" + alvoSeguido);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["alvoSeguido","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Cinemachine Seguindo: Player";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_2",
            title: "Distância Orbital da Câmera",
            difficulty: "easy",
            description: "Declare float raioOrbital = 4.5f;. Emita no Console: 'Distancia Orbital: 4.5m'.",
            validationRules: { requiredPatterns: ["float raioOrbital","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare raioOrbital e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float raioOrbital = 4.5f;
        Debug.Log("Distancia Orbital: " + raioOrbital + "m");
    }
}`,
            tests: [
                { input: "", expected: "Distancia Orbital: 4.5m", description: "Distância de câmera orbital" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float raioOrbital, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Distancia Orbital: 4.5m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float raioOrbital = 4.5f;\n        Debug.Log(\"Distancia Orbital: \" + raioOrbital + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float raioOrbital","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Distancia Orbital: 4.5m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_3",
            title: "Amortecimento Suave (Damping)",
            difficulty: "medium",
            description: "Declare float damping = 0.3f;. Emita no Console: 'Suavizacao Damping: 0.3'.",
            validationRules: { requiredPatterns: ["float damping","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare damping e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float damping = 0.3f;
        Debug.Log("Suavizacao Damping: " + damping);
    }
}`,
            tests: [
                { input: "", expected: "Suavizacao Damping: 0.3", description: "Damping da câmera" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float damping, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Suavizacao Damping: 0.3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float damping = 0.3f;\n        Debug.Log(\"Suavizacao Damping: \" + damping);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float damping","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Suavizacao Damping: 0.3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_4",
            title: "Transição Suave Entre Câmeras Virtuais",
            difficulty: "medium",
            description: "Declare int prioridadeVcam1 = 10 e int prioridadeVcam2 = 20. Se prioridadeVcam2 > prioridadeVcam1, emita 'Vcam2 Ativa por Prioridade'.",
            validationRules: { requiredPatterns: ["prioridadeVcam1","prioridadeVcam2","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Compare as prioridades e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int prioridadeVcam1 = 10;
        int prioridadeVcam2 = 20;
        if (prioridadeVcam2 > prioridadeVcam1)
        {
            Debug.Log("Vcam2 Ativa por Prioridade");
        }
    }
}`,
            tests: [
                { input: "", expected: "Vcam2 Ativa por Prioridade", description: "Prioridade de vcam" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: prioridadeVcam1, prioridadeVcam2" },
                { level: "II", text: "A saída no console deve conter exatamente: Vcam2 Ativa por Prioridade" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int prioridadeVcam1 = 10;\n        int prioridadeVcam2 = 20;\n        if (prioridadeVcam2 > prioridadeVcam1)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["prioridadeVcam1","prioridadeVcam2","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vcam2 Ativa por Prioridade";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 5 },
            title: "Zona Morta da Câmera (Dead Zone)",
            difficulty: "medium",
            description: "Declare float deadZoneWidth = 0.1f;. Emita no Console: 'Largura Dead Zone: 0.1'.",
            validationRules: { requiredPatterns: ["float deadZoneWidth","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare deadZoneWidth e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float deadZoneWidth = 0.1f;
        Debug.Log("Largura Dead Zone: " + deadZoneWidth);
    }
}`,
            tests: [
                { input: "", expected: "Largura Dead Zone: 0.1", description: "Dead zone da Cinemachine" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float deadZoneWidth, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Largura Dead Zone: 0.1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float deadZoneWidth = 0.1f;\n        Debug.Log(\"Largura Dead Zone: \" + deadZoneWidth);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float deadZoneWidth","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Largura Dead Zone: 0.1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_18 };
}
if (typeof window !== "undefined") {
    window.CAP_18 = CAP_18;
}
