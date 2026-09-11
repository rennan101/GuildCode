/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 20
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 20 — GEOMETRIAS 3D E MESHES
// ═══════════════════════════════════════════════════════

const CAP_20 = {
    id: 20,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 6 },
    title: "Geometrias 3D e Meshes",
    theme: "Módulo 7 — Mundo 3D",
    unlock: "Malha Poligonal",
    unlockIcon: "[MESH]",
    character: "orin",
    xpReward: 270,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 7 — Mundo 3D. Topologia poligonal e malhas 3D sincronizadas."
            },
            {
                    "type": "narrative",
                    "text": "Estruturas de arame (wireframes) desenham-se no ar como constelações geométricas. Orin Vale esculpe vértices e triângulos de luz pura."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Tudo o que você enxerga em um jogo tridimensional — um monstro, uma rocha ou uma espada — é uma **Mesh**! Uma malha é formada por vértices no espaço, triângulos que ligam esses vértices e coordenadas de textura chamadas UVs."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Em computação gráfica, placas quadradas (quads) não existem na GPU: cada quad é obrigatoriamente formado por 2 triângulos! Um cubo simples de 6 faces, por exemplo, é composto por exatamente 12 triângulos poligonais."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Para que a iluminação reaja corretamente sobre a superfície, calculamos as normais da malha com <code>RecalculateNormals()</code>. Aprenda como a geometria 3D se estrutura neste capítulo."
            }
    ],
    concept: {
        title: "ANATOMIA DE UMA MESH 3D: VÉRTICES, TRIÂNGULOS, UV MAPPING E RECÁLCULO DE NORMAIS",
        explanation: "Uma <code>Mesh</code> é a estrutura geométrica básica renderizada pela GPU:\n<ul>\n  <li><strong>Vértices (<code>vertices</code>):</strong> Conjunto de pontos 3D que definem as pontas da geometria (ex: um cubo possui 24 vértices para preservar arestas afiadas).</li>\n  <li><strong>Triângulos (<code>triangles</code>):</strong> Índices de vértices agrupados de 3 em 3. Cada face quadrada (quad) é formada por 2 triângulos. Um cubo de 6 faces requer <code>6 * 2 = 12</code> triângulos.</li>\n  <li><strong>Mapeamento UV (<code>uv</code>):</strong> Coordenadas bidimensionais normalizadas de 0 a 1 que mapeiam a textura 2D sobre a malha 3D (ex: o centro da textura é <code>Vector2(0.5f, 0.5f)</code>).</li>\n  <li><strong>Recálculo de Normais (<code>RecalculateNormals</code>):</strong> As normais são vetores perpendiculares a cada vértice que dizem para qual direção a superfície está virada, essencial para o cálculo de luz e sombras.</li>\n  <li><strong>Submeshes e Draw Calls:</strong> Malhas divididas em múltiplas sub-partes consomem mais draw calls; unificar geometrias em uma submesh única otimiza o desempenho.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploMeshes : MonoBehaviour
{
    void Start()
    {
        // 1. Contagem de vértices da malha
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);

        // 2. Cálculo de triângulos para um cubo (6 faces * 2 triângulos)
        int facesCubo = 6;
        int totalTriangulos = facesCubo * 2;
        Debug.Log("Total Triangulos: " + totalTriangulos);

        // 3. Coordenada UV de textura
        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");

        // 4. Recálculo de normais da geometria
        string statusNormais = "Normais Recalculadas com Sucesso";
        Debug.Log(statusNormais);

        // 5. Verificação de submeshes otimizadas
        int submeshes = 1;
        if (submeshes == 1)
        {
            Debug.Log("Malha Otimizada: Draw Call Unico");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Inspeção de Dados de Geometria Tridimensional",
        code: `using UnityEngine;

public class InspecaoMesh : MonoBehaviour
{
    void Start()
    {
        int v = 24;
        Debug.Log("Vertices da Malha: " + v);

        int t = 6 * 2;
        Debug.Log("Total Triangulos: " + t);

        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");

        Debug.Log("Normais Recalculadas com Sucesso");

        int sub = 1;
        if (sub == 1) Debug.Log("Malha Otimizada: Draw Call Unico");
    }
}`,
        output: "Vertices da Malha: 24\nTotal Triangulos: 12\nCentro UV: (0.5, 0.5)\nNormais Recalculadas com Sucesso\nMalha Otimizada: Draw Call Unico"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Geometrias 3D e Meshes e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploMeshes : MonoBehaviour
{
    void Start()
    {
        // 1. Contagem de vértices da malha
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);

        // 2. Cálculo de triângulos para um cubo (6 faces * 2 triângulos)
        int facesCubo = 6;
        int totalTriangulos = facesCubo * 2;
        Debug.Log("Total Triangulos: " + totalTriangulos);

        // 3. Coordenada UV de textura
        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");

        // 4. Recálculo de normais da geometria
        string statusNormais = "Normais Recalculadas com Sucesso";
        Debug.Log(statusNormais);

        // 5. Verificação de submeshes otimizadas
        int submeshes = 1;
        if (submeshes == 1)
        {
            Debug.Log("Malha Otimizada: Draw Call Unico");
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Geometrias 3D e Meshes:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalVertices e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);
    }
}`,
                hint: "Vertices da Malha: 24"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_20_1",
            title: "Contagem de Vértices da Geometria",
            difficulty: "easy",
            description: "Declare int totalVertices = 24;. Emita no Console: 'Vertices da Malha: 24'.",
            validationRules: { requiredPatterns: ["int totalVertices","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalVertices e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);
    }
}`,
            tests: [
                { input: "", expected: "Vertices da Malha: 24", description: "Contagem de vértices" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int totalVertices, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Vertices da Malha: 24" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalVertices = 24;\n        Debug.Log(\"Vertices da Malha: \" + totalVertices);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int totalVertices","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vertices da Malha: 24";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_2",
            title: "Triângulos e Faces Poligonais",
            difficulty: "easy",
            description: "Cada quad requer 2 triângulos. Para 6 faces de um cubo, calcule totalTriangulos = 6 * 2 e emita 'Total Triangulos: ' + totalTriangulos.",
            validationRules: { requiredPatterns: ["totalTriangulos","6 * 2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule totalTriangulos e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalTriangulos = 6 * 2;
        Debug.Log("Total Triangulos: " + totalTriangulos);
    }
}`,
            tests: [
                { input: "", expected: "Total Triangulos: 12", description: "Triangulação de cubo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: totalTriangulos, 6 * 2" },
                { level: "II", text: "A saída no console deve conter exatamente: Total Triangulos: 12" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalTriangulos = 6 * 2;\n        Debug.Log(\"Total Triangulos: \" + totalTriangulos);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["totalTriangulos","6 * 2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total Triangulos: 12";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_3",
            title: "Mapeamento UV de Textura",
            difficulty: "medium",
            description: "Declare Vector2 uv = new Vector2(0.5f, 0.5f);. Emita no Console: 'Centro UV: (0.5, 0.5)'.",
            validationRules: { requiredPatterns: ["new Vector2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare uv e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");
    }
}`,
            tests: [
                { input: "", expected: "Centro UV: (0.5, 0.5)", description: "Coordenadas UV" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector2, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Centro UV: (0.5, 0.5)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector2 uv = new Vector2(0.5f, 0.5f);\n        Debug.Log(\"Centro UV: (\" + uv.x + \", \" + uv.y + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Centro UV: (0.5, 0.5)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_4",
            title: "Recálculo de Normais da Malha",
            difficulty: "medium",
            description: "Declare string statusNormais = 'Normais Recalculadas com Sucesso';. Emita no Console o valor de statusNormais.",
            validationRules: { requiredPatterns: ["string statusNormais","statusNormais","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusNormais e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusNormais = "Normais Recalculadas com Sucesso";
        Debug.Log(statusNormais);
    }
}`,
            tests: [
                { input: "", expected: "Normais Recalculadas com Sucesso", description: "RecalculateNormals" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusNormais, statusNormais" },
                { level: "II", text: "A saída no console deve conter exatamente: Normais Recalculadas com Sucesso" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusNormais = \"Normais Recalculadas com Sucesso\";\n        Debug.Log(statusNormais);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusNormais","statusNormais","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Normais Recalculadas com Sucesso";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 6 },
            title: "Otimização de Submeshes",
            difficulty: "medium",
            description: "Declare int submeshes = 1;. Se submeshes == 1, emita 'Malha Otimizada: Draw Call Unico'.",
            validationRules: { requiredPatterns: ["int submeshes","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque as submeshes
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int submeshes = 1;
        if (submeshes == 1)
        {
            Debug.Log("Malha Otimizada: Draw Call Unico");
        }
    }
}`,
            tests: [
                { input: "", expected: "Malha Otimizada: Draw Call Unico", description: "Submesh e draw call" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int submeshes, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Malha Otimizada: Draw Call Unico" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int submeshes = 1;\n        if (submeshes == 1)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int submeshes","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Malha Otimizada: Draw Call Unico";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_20 };
}
if (typeof window !== "undefined") {
    window.CAP_20 = CAP_20;
}
