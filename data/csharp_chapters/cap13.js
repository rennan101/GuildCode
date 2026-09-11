/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 13
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 13 — SISTEMAS DE COORDENADAS 3D
// ═══════════════════════════════════════════════════════

const CAP_13 = {
    id: 13,
    artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 5 },
    title: "Sistemas de Coordenadas 3D",
    theme: "Módulo 4 — Matemática 3D",
    unlock: "Eixo Tridimensional",
    unlockIcon: "[3D]",
    character: "orin",
    xpReward: 200,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 4 — Matemática 3D. Sistema de Coordenadas Cartesiano Tridimensional ativado."
            },
            {
                    "type": "narrative",
                    "text": "O chão do santuário desvanece-se em uma grade infinita de luz tridimensional. Orin Vale ajusta bússolas arcanas orientadas nos eixos X, Y e Z."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "No espaço tridimensional do Unity, todo ponto existe nas coordenadas <code>(X, Y, Z)</code>! O eixo X representa a largura (esquerda/direita), Y a altura vertical (cima/baixo) e Z a profundidade (frente/trás)."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "A origem do universo é <code>Vector3.zero</code> (0, 0, 0), e o cubo unitário de referência é <code>Vector3.one</code> (1, 1, 1). Mas o maior segredo dos mundos 3D é diferenciar o espaço local do global: a posição mundial de um herói é a soma da posição do objeto-pai mais seu deslocamento local!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Compreender vetores tridimensionais é a fundação de todo o game development moderno. Pratique declarando vetores, lendo coordenadas isoladas e convertendo posições."
            }
    ],
    concept: {
        title: "ESPAÇO TRIDIMENSIONAL NO UNITY: VECTOR3, EIXOS CARTESIANOS E ESPAÇO LOCAL VS MUNDIAL",
        explanation: "O Unity utiliza um sistema de coordenadas cartesiano tridimensional com convenção de mão esquerda (Left-Handed):\n<ul>\n  <li><strong>Ponto no Espaço Tridimensional (<code>Vector3</code>):</strong> Uma estrutura que encapsula três floats: <code>pos.x</code>, <code>pos.y</code> e <code>pos.z</code> (ex: <code>Vector3 pos = new Vector3(2, 5, 8);</code> onde <code>pos.x</code> vale 2).</li>\n  <li><strong>Origem Mundial (<code>Vector3.zero</code>):</strong> Representa o centro exato do mundo <code>(0, 0, 0)</code>. Sua coordenada Y é obtida com <code>Vector3.zero.y</code>.</li>\n  <li><strong>Espaço Unitário (<code>Vector3.one</code>):</strong> Representa o vetor <code>(1, 1, 1)</code>, frequentemente utilizado como escala padrão inicial de objetos 3D.</li>\n  <li><strong>Espaço Local vs Global:</strong> Um objeto filho herda a posição de seu pai. A posição mundial final resulta da translação: <code>posMundial = posPai + offset;</code> (ex: pai em 10 somado a offset 3 resulta em <code>Posicao Mundial: 13</code>).</li>\n  <li><strong>Identificação dos Três Eixos:</strong> O eixo X (1,0,0) representa a largura lateral, o eixo Y (0,1,0) a elevação vertical e o eixo Z (0,0,1) a profundidade frontal.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploCoordenadas3D : MonoBehaviour
{
    void Start()
    {
        // 1. Ponto tridimensional e coordenada X
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);

        // 2. Origem do espaço mundial
        Debug.Log("Origem Y: " + Vector3.zero.y);

        // 3. Conversão de espaço local para global
        int posPai = 10;
        int offset = 3;
        int posMundial = posPai + offset;
        Debug.Log("Posicao Mundial: " + posMundial);

        // 4. Identificação dos eixos principais
        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1)
        {
            Debug.Log("Eixo Selecionado: X (Largura)");
        }

        // 5. Escala unitária tridimensional (Vector3.one)
        Vector3 escala = Vector3.one;
        Debug.Log("Escala Inicial: " + escala.x + ", " + escala.y + ", " + escala.z);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Cálculo de Posição Espacial 3D",
        code: `using UnityEngine;

public class Espaco3DManager : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);

        Debug.Log("Origem Y: " + Vector3.zero.y);

        int posPai = 10;
        int offset = 3;
        Debug.Log("Posicao Mundial: " + (posPai + offset));

        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1) Debug.Log("Eixo Selecionado: X (Largura)");

        Vector3 esc = Vector3.one;
        Debug.Log("Escala Inicial: " + esc.x + ", " + esc.y + ", " + esc.z);
    }
}`,
        output: "Coord X: 2\nOrigem Y: 0\nPosicao Mundial: 13\nEixo Selecionado: X (Largura)\nEscala Inicial: 1, 1, 1"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Sistemas de Coordenadas 3D e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploCoordenadas3D : MonoBehaviour
{
    void Start()
    {
        // 1. Ponto tridimensional e coordenada X
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);

        // 2. Origem do espaço mundial
        Debug.Log("Origem Y: " + Vector3.zero.y);

        // 3. Conversão de espaço local para global
        int posPai = 10;
        int offset = 3;
        int posMundial = posPai + offset;
        Debug.Log("Posicao Mundial: " + posMundial);

        // 4. Identificação dos eixos principais
        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1)
        {
            Debug.Log("Eixo Selecionado: X (Largura)");
        }

        // 5. Escala unitária tridimensional (Vector3.one)
        Vector3 escala = Vector3.one;
        Debug.Log("Escala Inicial: " + escala.x + ", " + escala.y + ", " + escala.z);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Sistemas de Coordenadas 3D:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare pos e emita Coord X
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);
    }
}`,
                hint: "Coord X: 2"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_13_1",
            title: "Ponto no Espaço Tridimensional",
            difficulty: "easy",
            description: "Declare um Vector3 pos = new Vector3(2, 5, 8);. Imprima no Console a coordenada X com 'Coord X: ' + pos.x.",
            validationRules: { requiredPatterns: ["Vector3","pos.x","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare pos e emita Coord X
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);
    }
}`,
            tests: [
                { input: "", expected: "Coord X: 2", description: "Coordenada X em Vector3" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3, pos.x" },
                { level: "II", text: "A saída no console deve conter exatamente: Coord X: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 pos = new Vector3(2, 5, 8);\n        Debug.Log(\"Coord X: \" + pos.x);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3","pos.x","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Coord X: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_2",
            title: "Origem do Espaço Mundial (Vector3.zero)",
            difficulty: "easy",
            description: "Obtenha a coordenada Y do vetor central Vector3.zero. Emita no Console: 'Origem Y: ' + Vector3.zero.y.",
            validationRules: { requiredPatterns: ["Vector3.zero","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada Y de Vector3.zero
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Origem Y: " + Vector3.zero.y);
    }
}`,
            tests: [
                { input: "", expected: "Origem Y: 0", description: "Acesso a Vector3.zero" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.zero, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Origem Y: 0" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"Origem Y: \" + Vector3.zero.y);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.zero","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Origem Y: 0";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_3",
            title: "Conversão de Espaço Local para Global",
            difficulty: "medium",
            description: "Simule a translação de uma coordenada local para mundial somando um deslocamento: posMundial = posPai + offset. Com pai em 10 e offset em 3, emita 'Posicao Mundial: 13'.",
            validationRules: { requiredPatterns: ["int posPai","int offset","posMundial","+"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule e imprima posMundial
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int posPai = 10;
        int offset = 3;
        int posMundial = posPai + offset;
        Debug.Log("Posicao Mundial: " + posMundial);
    }
}`,
            tests: [
                { input: "", expected: "Posicao Mundial: 13", description: "Soma de espaço local" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int posPai, int offset" },
                { level: "II", text: "A saída no console deve conter exatamente: Posicao Mundial: 13" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int posPai = 10;\n        int offset = 3;\n        int posMundial = posPai + offset;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int posPai","int offset","posMundial","+"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Posicao Mundial: 13";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_4",
            title: "Identificação dos Três Eixos",
            difficulty: "medium",
            description: "Declare Vector3 eixos = new Vector3(1, 0, 0);. Se eixos.x == 1, emita 'Eixo Selecionado: X (Largura)'.",
            validationRules: { requiredPatterns: ["new Vector3(1, 0, 0)","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare eixos e avalie
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1)
        {
            Debug.Log("Eixo Selecionado: X (Largura)");
        }
    }
}`,
            tests: [
                { input: "", expected: "Eixo Selecionado: X (Largura)", description: "Eixo X" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3(1, 0, 0), if" },
                { level: "II", text: "A saída no console deve conter exatamente: Eixo Selecionado: X (Largura)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 eixos = new Vector3(1, 0, 0);\n        if (eixos.x == 1)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3(1, 0, 0)","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Eixo Selecionado: X (Largura)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_5",
            artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 5 },
            title: "Espaço Unitário (Vector3.one)",
            difficulty: "medium",
            description: "Declare Vector3 escala = Vector3.one;. Emita no Console: 'Escala Inicial: ' + escala.x + ', ' + escala.y + ', ' + escala.z.",
            validationRules: { requiredPatterns: ["Vector3.one","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare escala com Vector3.one e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 escala = Vector3.one;
        Debug.Log("Escala Inicial: " + escala.x + ", " + escala.y + ", " + escala.z);
    }
}`,
            tests: [
                { input: "", expected: "Escala Inicial: 1, 1, 1", description: "Vector3.one" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.one, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Escala Inicial: 1, 1, 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 escala = Vector3.one;\n        Debug.Log(\"Escala Inicial: \" + escala.x + \", \" + escala.y + \", \" + escala.z);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.one","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Escala Inicial: 1, 1, 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_13 };
}
if (typeof window !== "undefined") {
    window.CAP_13 = CAP_13;
}
