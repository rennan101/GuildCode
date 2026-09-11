/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 14
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 14 — VETORES 3D & DISTÂNCIAS
// ═══════════════════════════════════════════════════════

const CAP_14 = {
    id: 14,
    artifactReward: { artifactId: "Ring_Oroborus", minStars: 4, maxStars: 5 },
    title: "Vetores 3D & Distâncias",
    theme: "Módulo 4 — Matemática 3D",
    unlock: "Vetor Direcional",
    unlockIcon: "[V3]",
    character: "kael",
    xpReward: 210,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Calibrando o Motor de Álgebra Vetorial. Operações de produto escalar e vetorial ativadas."
            },
            {
                    "type": "narrative",
                    "text": "Vetores radiantes conectam o guerreiro aos inimigos ao redor. Kael Draven demonstra como a matemática vetorial governa a visão, o alcance e o impacto dos golpes."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Um vetor não é apenas uma posição: ele expressa uma <strong>direção</strong> e uma <strong>magnitude</strong>! Para saber a que distância um monstro está, usamos a distância euclidiana com <code>Vector3.Distance(a, b)</code>."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "ARTÍFICE",
                    "cssClass": "mira",
                    "text": "E quando queremos apenas a pura direção sem interferência do tamanho, nós o normalizamos com <code>Vector3.Normalize()</code>. Já o Produto Escalar (<code>Vector3.Dot</code>) revela se um alvo está na frente ou atrás de nós, enquanto o Produto Vetorial (<code>Vector3.Cross</code>) calcula a normal perpendicular perfeita para superfícies e reflexos!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Radars de proximidade e inteligência artificial dependem diretamente dessas quatro operações vetoriais. Execute as 5 atividades deste capítulo com maestria geométrica."
            }
    ],
    concept: {
        title: "ÁLGEBRA VETORIAL 3D: DISTÂNCIA EUCLIDIANA, NORMALIZAÇÃO, DOT PRODUCT E CROSS PRODUCT",
        explanation: "Operações com vetores são essenciais para física, mira e inteligência artificial no Unity:\n<ul>\n  <li><strong>Distância Euclidiana (<code>Vector3.Distance</code>):</strong> Calcula o comprimento da linha reta entre dois pontos 3D no espaço (ex: entre <code>(0,0,0)</code> e <code>(3,4,0)</code> resulta em distância 5: <code>Debug.Log(\"Distancia: \" + dist);</code>).</li>\n  <li><strong>Normalização de Vetor (<code>Vector3.Normalize</code>):</strong> Transforma o vetor em um vetor unitário de comprimento igual a 1, preservando sua direção original (ex: normalizar <code>(5,0,0)</code> resulta em <code>dir.x = 1</code>).</li>\n  <li><strong>Produto Escalar (<code>Vector3.Dot</code>):</strong> Multiplica dois vetores resultando em um escalar numérico. Se forem vetores unitários apontando na mesma direção (ex: <code>Vector3.forward</code> e <code>Vector3.forward</code>), o resultado é 1 (alinhamento total). Se forem perpendiculares, é 0; se opostos, é -1.</li>\n  <li><strong>Produto Vetorial (<code>Vector3.Cross</code>):</strong> Gera um terceiro vetor perpendicular a ambos os vetores de entrada (ex: o produto vetorial entre <code>Vector3.right</code> (eixo X) e <code>Vector3.up</code> (eixo Y) gera a normal apontando no eixo Z: <code>Vector3.forward</code>).</li>\n  <li><strong>Radar de Proximidade:</strong> Compara a distância calculada contra um raio de detecção (ex: se distância for menor que 10 metros, exibe <code>\"Alvo no Radar: 8m\"</code>).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploAlgebraVetorial : MonoBehaviour
{
    void Start()
    {
        // 1. Distância euclidiana entre dois pontos (3-4-5 triângulo clássico)
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);

        // 2. Normalização de vetor para direção pura
        Vector3 dir = new Vector3(5, 0, 0);
        Vector3 norm = Vector3.Normalize(dir);
        Debug.Log("Dir X: " + norm.x);

        // 3. Produto escalar (Vector3.Dot) para alinhamento de visão
        Vector3 frente = Vector3.forward;
        Vector3 alvo = Vector3.forward;
        float dot = Vector3.Dot(frente, alvo);
        Debug.Log("Alinhamento: " + dot);

        // 4. Produto vetorial (Vector3.Cross) para normal perpendicular
        Vector3 direito = Vector3.right;
        Vector3 cima = Vector3.up;
        Vector3 cross = Vector3.Cross(direito, cima);
        Debug.Log("Normal Z: " + cross.z);

        // 5. Radar de proximidade
        Vector3 posPlayer = Vector3.zero;
        Vector3 posInimigo = new Vector3(0, 0, 8);
        float distRadar = Vector3.Distance(posPlayer, posInimigo);
        if (distRadar < 10)
        {
            Debug.Log("Alvo no Radar: 8m");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Radar de Batalha e Alinhamento de Visão",
        code: `using UnityEngine;

public class CalculosCombate3D : MonoBehaviour
{
    void Start()
    {
        Vector3 p1 = Vector3.zero;
        Vector3 p2 = new Vector3(3, 4, 0);
        float d = Vector3.Distance(p1, p2);
        Debug.Log("Distancia: " + d);

        Vector3 v = new Vector3(5, 0, 0);
        Vector3 n = Vector3.Normalize(v);
        Debug.Log("Dir X: " + n.x);

        float dot = Vector3.Dot(Vector3.forward, Vector3.forward);
        Debug.Log("Alinhamento: " + dot);

        Vector3 c = Vector3.Cross(Vector3.right, Vector3.up);
        Debug.Log("Normal Z: " + c.z);

        float radar = Vector3.Distance(Vector3.zero, new Vector3(0, 0, 8));
        if (radar < 10) Debug.Log("Alvo no Radar: 8m");
    }
}`,
        output: "Distancia: 5\nDir X: 1\nAlinhamento: 1\nNormal Z: 1\nAlvo no Radar: 8m"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Vetores 3D & Distâncias e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploAlgebraVetorial : MonoBehaviour
{
    void Start()
    {
        // 1. Distância euclidiana entre dois pontos (3-4-5 triângulo clássico)
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);

        // 2. Normalização de vetor para direção pura
        Vector3 dir = new Vector3(5, 0, 0);
        Vector3 norm = Vector3.Normalize(dir);
        Debug.Log("Dir X: " + norm.x);

        // 3. Produto escalar (Vector3.Dot) para alinhamento de visão
        Vector3 frente = Vector3.forward;
        Vector3 alvo = Vector3.forward;
        float dot = Vector3.Dot(frente, alvo);
        Debug.Log("Alinhamento: " + dot);

        // 4. Produto vetorial (Vector3.Cross) para normal perpendicular
        Vector3 direito = Vector3.right;
        Vector3 cima = Vector3.up;
        Vector3 cross = Vector3.Cross(direito, cima);
        Debug.Log("Normal Z: " + cross.z);

        // 5. Radar de proximidade
        Vector3 posPlayer = Vector3.zero;
        Vector3 posInimigo = new Vector3(0, 0, 8);
        float distRadar = Vector3.Distance(posPlayer, posInimigo);
        if (distRadar < 10)
        {
            Debug.Log("Alvo no Radar: 8m");
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Vetores 3D & Distâncias:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia entre a e b
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);
    }
}`,
                hint: "Distancia: 5"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_14_1",
            title: "Cálculo de Distância Euclidiana",
            difficulty: "easy",
            description: "Declare Vector3 a = new Vector3(0, 0, 0); e Vector3 b = new Vector3(3, 4, 0);. Calcule a distância com Vector3.Distance(a, b) e exiba 'Distancia: ' + dist.",
            validationRules: { requiredPatterns: ["Vector3.Distance","new Vector3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia entre a e b
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);
    }
}`,
            tests: [
                { input: "", expected: "Distancia: 5", description: "Vector3.Distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Distance, new Vector3" },
                { level: "II", text: "A saída no console deve conter exatamente: Distancia: 5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 a = new Vector3(0, 0, 0);\n        Vector3 b = new Vector3(3, 4, 0);\n        float dist = Vector3.Distance(a, b);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Distance","new Vector3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Distancia: 5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_2",
            title: "Normalização de Vetor",
            difficulty: "easy",
            description: "Declare Vector3 dir = new Vector3(5, 0, 0);. Calcule o vetor normalizado com Vector3.Normalize(dir) e exiba 'Dir X: ' + norm.x.",
            validationRules: { requiredPatterns: ["Vector3.Normalize","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Normalize dir e exiba norm.x
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 dir = new Vector3(5, 0, 0);
        var norm = Vector3.Normalize(dir);
        Debug.Log("Dir X: " + norm.x);
    }
}`,
            tests: [
                { input: "", expected: "Dir X: 1", description: "Vector3.Normalize" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Normalize, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Dir X: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 dir = new Vector3(5, 0, 0);\n        var norm = Vector3.Normalize(dir);\n        Debug.Log(\"Dir X: \" + norm.x);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Normalize","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dir X: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_3",
            title: "Produto Escalar (Vector3.Dot)",
            difficulty: "medium",
            description: "Declare Vector3 frente = Vector3.forward; e Vector3 alvo = Vector3.forward;. Calcule o alinhamento com Vector3.Dot(frente, alvo) e exiba 'Alinhamento: ' + dot.",
            validationRules: { requiredPatterns: ["Vector3.Dot","Vector3.forward","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o produto escalar
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 frente = Vector3.forward;
        Vector3 alvo = Vector3.forward;
        float dot = Vector3.Dot(frente, alvo);
        Debug.Log("Alinhamento: " + dot);
    }
}`,
            tests: [
                { input: "", expected: "Alinhamento: 1", description: "Vector3.Dot" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Dot, Vector3.forward" },
                { level: "II", text: "A saída no console deve conter exatamente: Alinhamento: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 frente = Vector3.forward;\n        Vector3 alvo = Vector3.forward;\n        float dot = Vector3.Dot(frente, alvo);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Dot","Vector3.forward","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alinhamento: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_4",
            title: "Produto Vetorial (Vector3.Cross)",
            difficulty: "medium",
            description: "Obtenha a normal perpendicular usando Vector3.Cross: declare Vector3 direito = Vector3.right; e Vector3 cima = Vector3.up;. Calcule Vector3.Cross(direito, cima) e emita 'Normal Z: ' + cross.z.",
            validationRules: { requiredPatterns: ["Vector3.Cross","Vector3.right","Vector3.up"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o cross product
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 direito = Vector3.right;
        Vector3 cima = Vector3.up;
        var cross = Vector3.Cross(direito, cima);
        Debug.Log("Normal Z: " + cross.z);
    }
}`,
            tests: [
                { input: "", expected: "Normal Z: 1", description: "Vector3.Cross" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Cross, Vector3.right" },
                { level: "II", text: "A saída no console deve conter exatamente: Normal Z: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 direito = Vector3.right;\n        Vector3 cima = Vector3.up;\n        var cross = Vector3.Cross(direito, cima);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Cross","Vector3.right","Vector3.up"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Normal Z: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_5",
            artifactReward: { artifactId: "Ring_Oroborus", minStars: 4, maxStars: 5 },
            title: "Alcance de Radar de Proximidade",
            difficulty: "medium",
            description: "Calcule a distância entre o jogador em (0,0,0) e um inimigo em (0,0,8). Se a distância for menor que 10, emita 'Alvo no Radar: 8m'.",
            validationRules: { requiredPatterns: ["Vector3.Distance","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia e avalie o radar
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 player = Vector3.zero;
        Vector3 enemy = new Vector3(0, 0, 8);
        float dist = Vector3.Distance(player, enemy);
        if (dist < 10)
        {
            Debug.Log("Alvo no Radar: " + dist + "m");
        }
    }
}`,
            tests: [
                { input: "", expected: "Alvo no Radar: 8m", description: "Radar de proximidade com Vector3.Distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Distance, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Alvo no Radar: 8m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 player = Vector3.zero;\n        Vector3 enemy = new Vector3(0, 0, 8);\n        float dist = Vector3.Distance(player, enemy);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Distance","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alvo no Radar: 8m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_14 };
}
if (typeof window !== "undefined") {
    window.CAP_14 = CAP_14;
}
