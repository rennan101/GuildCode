/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 09
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 09 — TRANSFORM — POSIÇÃO, ROTAÇÃO E ESCALA
// ═══════════════════════════════════════════════════════

const CAP_09 = {
    id: 9,
    artifactReward: { artifactId: "Ring_Draco", minStars: 3, maxStars: 5 },
    title: "Transform — Posição, Rotação e Escala",
    theme: "Módulo 2 — Fundamentos do Unity",
    unlock: "Giz Espacial Transform",
    unlockIcon: "[TR]",
    character: "lyra",
    xpReward: 160,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Alinhando os Eixos Espaciais. Componente Transform carregado na raiz de todas as entidades."
            },
            {
                    "type": "narrative",
                    "text": "Grid tridimensionais em azul (Z), vermelho (X) e verde (Y) desenham-se sobre a sala dimensional. Lyra Nex rotaciona prismas flutuantes com movimentos precisos."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Existe um único componente que todo GameObject possui obrigatoriamente e nunca pode ser removido: o <strong>Transform</strong>! Ele define onde a entidade existe no espaço (position), para onde ela olha (rotation) e quão grande ela é (localScale)."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Para deslocar um personagem suavemente, usamos <code>transform.Translate()</code> multiplicando a velocidade pelo tempo decorrido (<code>dt</code>). Para girar, aplicamos rotações ao redor do eixo Y, e para saber a direção frontal do herói, lemos o vetor <code>transform.forward</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Entenda o cálculo de deslocamento: <code>velocidade * deltaTime</code> garante que a movimentação seja independente da taxa de quadros (framerate) do jogo."
            }
    ],
    concept: {
        title: "O COMPONENTE TRANSFORM: POSIÇÃO, DESLOCAMENTO, ESCALA E ROTAÇÃO",
        explanation: "O componente <code>Transform</code> gerencia a geometria e localização de qualquer entidade no espaço 3D:\n<ul>\n  <li><strong>Posição (<code>transform.position</code>):</strong> Um <code>Vector3</code> que guarda as coordenadas X (horizontal), Y (altura) e Z (profundidade). Podemos inspecionar coordenadas individuais com <code>transform.position.x</code>.</li>\n  <li><strong>Deslocamento Suave (Translate):</strong> Em jogos, deslocamentos no tempo utilizam a fórmula clássica da física: <code>deslocamento = velocidade * deltaTime</code> (ex: <code>float vel = 5.0f; float dt = 0.016f; float deslocamento = vel * dt;</code>).</li>\n  <li><strong>Escala Local (<code>transform.localScale</code>):</strong> Multiplicador de tamanho do objeto em relação ao seu modelo original (ex: redimensionar escalaX e escalaY para 2.0f gera a nova escala <code>(2, 2)</code>).</li>\n  <li><strong>Rotação Angular:</strong> Rotação ao redor do eixo vertical Y em graus por segundo (ex: <code>float velRotacao = 90.0f;</code> girando o personagem 90 graus/s).</li>\n  <li><strong>Vetor Direcional Forward (<code>transform.forward</code>):</strong> Vetor unitário que aponta exatamente para a frente de onde o objeto está olhando (sua coordenada <code>transform.forward.z</code> indica a orientação frontal).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploTransform : MonoBehaviour
{
    void Start()
    {
        // 1. Leitura de coordenada de posição
        float posX = transform.position.x;
        Debug.Log("Posicao X: " + posX);

        // 2. Cálculo de deslocamento proporcional ao tempo
        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);

        // 3. Ajuste de escala local
        float escalaX = 2.0f;
        float escalaY = 2.0f;
        Debug.Log("Nova Escala: (" + escalaX + ", " + escalaY + ")");

        // 4. Rotação em torno do eixo Y
        float velRotacao = 90.0f;
        Debug.Log("Rotacao Y: " + velRotacao + " graus/s");

        // 5. Vetor direcional frontal (forward)
        float direcaoZ = transform.forward.z;
        Debug.Log("Direcao Z: " + direcaoZ);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Movimentação e Orientação Espacial",
        code: `using UnityEngine;

public class ControladorTransform : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);

        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);

        float sx = 2.0f;
        float sy = 2.0f;
        Debug.Log("Nova Escala: (" + sx + ", " + sy + ")");

        float velRot = 90.0f;
        Debug.Log("Rotacao Y: " + velRot + " graus/s");

        Debug.Log("Direcao Z: " + transform.forward.z);
    }
}`,
        output: "Posicao X: 0\nDeslocamento: 0.08\nNova Escala: (2, 2)\nRotacao Y: 90 graus/s\nDirecao Z: 1"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Transform — Posição, Rotação e Escala e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploTransform : MonoBehaviour
{
    void Start()
    {
        // 1. Leitura de coordenada de posição
        float posX = transform.position.x;
        Debug.Log("Posicao X: " + posX);

        // 2. Cálculo de deslocamento proporcional ao tempo
        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);

        // 3. Ajuste de escala local
        float escalaX = 2.0f;
        float escalaY = 2.0f;
        Debug.Log("Nova Escala: (" + escalaX + ", " + escalaY + ")");

        // 4. Rotação em torno do eixo Y
        float velRotacao = 90.0f;
        Debug.Log("Rotacao Y: " + velRotacao + " graus/s");

        // 5. Vetor direcional frontal (forward)
        float direcaoZ = transform.forward.z;
        Debug.Log("Direcao Z: " + direcaoZ);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Transform — Posição, Rotação e Escala:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada X da posicao
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);
    }
}`,
                hint: "Posicao X: 0"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_9_1",
            title: "Leitura de Posição Inicial",
            difficulty: "easy",
            description: "Acesse as coordenadas de posição inicial do transform e emita no Console: 'Posicao X: ' + transform.position.x.",
            validationRules: { requiredPatterns: ["transform.position.x","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada X da posicao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);
    }
}`,
            tests: [
                { input: "", expected: "Posicao X: 0", description: "Acesso a transform.position.x" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: transform.position.x, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Posicao X: 0" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"Posicao X: \" + transform.position.x);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["transform.position.x","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Posicao X: 0";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_2",
            title: "Deslocamento com Translate",
            difficulty: "easy",
            description: "Simule um deslocamento: declare float vel = 5.0f e float dt = 0.016f. Calcule o deslocamento como vel * dt e emita 'Deslocamento: ' + deslocamento.",
            validationRules: { requiredPatterns: ["float vel","float dt","vel * dt","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float vel = 5.0f;
        float dt = 0.016f;
        // Calcule o deslocamento e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);
    }
}`,
            tests: [
                { input: "", expected: "Deslocamento: 0.08", description: "Cálculo de Translate" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float vel, float dt" },
                { level: "II", text: "A saída no console deve conter exatamente: Deslocamento: 0.08" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float vel = 5.0f;\n        float dt = 0.016f;\n        float deslocamento = vel * dt;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float vel","float dt","vel * dt","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Deslocamento: 0.08";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_3",
            title: "Ajuste de Escala Local",
            difficulty: "medium",
            description: "Simule a alteração da escala de um objeto: defina escalaX = 2.0f e escalaY = 2.0f. Emita no Console: 'Nova Escala: (2, 2)'.",
            validationRules: { requiredPatterns: ["float escalaX","float escalaY","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure as escalas e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float escalaX = 2.0f;
        float escalaY = 2.0f;
        Debug.Log("Nova Escala: (" + escalaX + ", " + escalaY + ")");
    }
}`,
            tests: [
                { input: "", expected: "Nova Escala: (2, 2)", description: "Escala local" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float escalaX, float escalaY" },
                { level: "II", text: "A saída no console deve conter exatamente: Nova Escala: (2, 2)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float escalaX = 2.0f;\n        float escalaY = 2.0f;\n        Debug.Log(\"Nova Escala: (\" + escalaX + \", \" + escalaY + \")\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float escalaX","float escalaY","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Nova Escala: (2, 2)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_4",
            title: "Rotação em Torno do Eixo Y",
            difficulty: "medium",
            description: "Declare a velocidade de giro float velRotacao = 90.0f;. Emita no Console: 'Rotacao Y: ' + velRotacao + ' graus/s'.",
            validationRules: { requiredPatterns: ["float velRotacao","velRotacao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare velRotacao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float velRotacao = 90.0f;
        Debug.Log("Rotacao Y: " + velRotacao + " graus/s");
    }
}`,
            tests: [
                { input: "", expected: "Rotacao Y: 90 graus/s", description: "Velocidade angular de rotação" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float velRotacao, velRotacao" },
                { level: "II", text: "A saída no console deve conter exatamente: Rotacao Y: 90 graus/s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float velRotacao = 90.0f;\n        Debug.Log(\"Rotacao Y: \" + velRotacao + \" graus/s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float velRotacao","velRotacao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Rotacao Y: 90 graus/s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_5",
            artifactReward: { artifactId: "Ring_Draco", minStars: 3, maxStars: 5 },
            title: "Vetor Forward de Direção",
            difficulty: "medium",
            description: "Obtenha a coordenada z do vetor direcional transform.forward. Emita no Console: 'Direcao Z: ' + transform.forward.z.",
            validationRules: { requiredPatterns: ["transform.forward.z","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o forward z
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Direcao Z: " + transform.forward.z);
    }
}`,
            tests: [
                { input: "", expected: "Direcao Z: 1", description: "Transform forward direction" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: transform.forward.z, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Direcao Z: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"Direcao Z: \" + transform.forward.z);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["transform.forward.z","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Direcao Z: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_09 };
}
if (typeof window !== "undefined") {
    window.CAP_09 = CAP_09;
}
