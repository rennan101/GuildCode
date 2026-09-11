/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 21
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 21 — TERRENO E VEGETAÇÃO
// ═══════════════════════════════════════════════════════

const CAP_21 = {
    id: 21,
    artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 6 },
    title: "Terreno e Vegetação",
    theme: "Módulo 7 — Mundo 3D",
    unlock: "Semente do Terreno",
    unlockIcon: "[TERR]",
    character: "mira",
    xpReward: 280,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Carregando o Módulo de Relevo e Biomas. Sistema de Terreno e Vegetação instanciado."
            },
            {
                    "type": "narrative",
                    "text": "Montanhas colossais, colinas verdejantes e florestas densas erguem-se a partir do piso dimensional. Mira Solenn pinta texturas de solo e espalha árvores com pincéis arcanos."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "O componente **Terrain** do Unity permite criar mundos imensos sem modelar tudo no Blender! A elevação das montanhas é guiada por um mapa de alturas chamado <code>Heightmap</code>, que diz a elevação vertical exata em cada ponto."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Para que uma floresta com milhares de árvores e grama não trave o jogo, o motor utiliza instanciamento em lote na GPU e define distâncias de corte (Detail Distance), renderizando pequenos arbustos somente perto do herói!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Camadas de pintura de solo (Splatmaps) misturam terra, rocha e grama de acordo com a inclinação do terreno. Complete as atividades para dominar a construção de biomas."
            }
    ],
    concept: {
        title: "O SISTEMA DE TERRENOS DO UNITY: DIMENSÕES, HEIGHTMAPS, VEGETAÇÃO E SPLATMAPS",
        explanation: "O sistema de <code>Terrain</code> do Unity é otimizado para gerar relevos massivos em tempo real:\n<ul>\n  <li><strong>Dimensões do Terreno:</strong> Define a área plana em metros quadrados abrangida pelo mapa (ex: <code>int tamanhoTerreno = 500;</code> emitindo <code>\"Area do Terreno: 500x500m\"</code>).</li>\n  <li><strong>Leitura de Altura (Heightmap):</strong> A elevação Y do terreno em uma coordenada X/Z é amostrada a partir de uma matriz de alturas em tons de cinza (ex: elevação no ponto atingindo 24.5m).</li>\n  <li><strong>Densidade de Vegetação e Árvores:</strong> Milhares de instâncias de árvores são renderizadas com billboarding e batching da GPU (ex: 1200 árvores instanciadas).</li>\n  <li><strong>Distância de Desenho de Detalhes (Detail Distance):</strong> Raio esférico em metros a partir da câmera além do qual a grama 3D deixa de ser desenhada para economizar taxa de quadros (ex: 80 metros).</li>\n  <li><strong>Pintura de Camadas (Splatmap):</strong> Camadas de textura (ex: 'Grama_Rochosa') que misturam diferentes materiais na superfície do terreno.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploTerrenos : MonoBehaviour
{
    void Start()
    {
        // 1. Dimensões da área de terreno
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");

        // 2. Altura calculada pelo heightmap
        float alturaY = 24.5f;
        Debug.Log("Elevacao no Ponto: " + alturaY + "m");

        // 3. Contagem de árvores instanciadas
        int totalArvores = 1200;
        Debug.Log("Instancias de Arvores: " + totalArvores);

        // 4. Distância de corte de detalhes e grama
        int distanciaDetalhes = 80;
        Debug.Log("Distancia de Detalhes: " + distanciaDetalhes + "m");

        // 5. Camada ativa de textura do relevo
        string camadaAtiva = "Grama_Rochosa";
        Debug.Log("Camada de Textura: " + camadaAtiva);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Configuração de Bioma e Vegetação",
        code: `using UnityEngine;

public class BiomaController : MonoBehaviour
{
    void Start()
    {
        int area = 500;
        Debug.Log("Area do Terreno: " + area + "x" + area + "m");

        float h = 24.5f;
        Debug.Log("Elevacao no Ponto: " + h + "m");

        int arvores = 1200;
        Debug.Log("Instancias de Arvores: " + arvores);

        int d = 80;
        Debug.Log("Distancia de Detalhes: " + d + "m");

        Debug.Log("Camada de Textura: Grama_Rochosa");
    }
}`,
        output: "Area do Terreno: 500x500m\nElevacao no Ponto: 24.5m\nInstancias de Arvores: 1200\nDistancia de Detalhes: 80m\nCamada de Textura: Grama_Rochosa"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Terreno e Vegetação e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploTerrenos : MonoBehaviour
{
    void Start()
    {
        // 1. Dimensões da área de terreno
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");

        // 2. Altura calculada pelo heightmap
        float alturaY = 24.5f;
        Debug.Log("Elevacao no Ponto: " + alturaY + "m");

        // 3. Contagem de árvores instanciadas
        int totalArvores = 1200;
        Debug.Log("Instancias de Arvores: " + totalArvores);

        // 4. Distância de corte de detalhes e grama
        int distanciaDetalhes = 80;
        Debug.Log("Distancia de Detalhes: " + distanciaDetalhes + "m");

        // 5. Camada ativa de textura do relevo
        string camadaAtiva = "Grama_Rochosa";
        Debug.Log("Camada de Textura: " + camadaAtiva);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Terreno e Vegetação:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tamanhoTerreno e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");
    }
}`,
                hint: "Area do Terreno: 500x500m"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_21_1",
            title: "Dimensões do Terreno",
            difficulty: "easy",
            description: "Declare int tamanhoTerreno = 500;. Emita no Console: 'Area do Terreno: 500x500m'.",
            validationRules: { requiredPatterns: ["int tamanhoTerreno","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tamanhoTerreno e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");
    }
}`,
            tests: [
                { input: "", expected: "Area do Terreno: 500x500m", description: "Dimensões do terreno" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int tamanhoTerreno, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Area do Terreno: 500x500m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int tamanhoTerreno = 500;\n        Debug.Log(\"Area do Terreno: \" + tamanhoTerreno + \"x\" + tamanhoTerreno + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int tamanhoTerreno","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Area do Terreno: 500x500m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_2",
            title: "Leitura de Altura do Mapa (Heightmap)",
            difficulty: "easy",
            description: "Declare float alturaY = 24.5f;. Emita no Console: 'Elevacao no Ponto: 24.5m'.",
            validationRules: { requiredPatterns: ["float alturaY","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare alturaY e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float alturaY = 24.5f;
        Debug.Log("Elevacao no Ponto: " + alturaY + "m");
    }
}`,
            tests: [
                { input: "", expected: "Elevacao no Ponto: 24.5m", description: "Elevação de terreno" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float alturaY, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Elevacao no Ponto: 24.5m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float alturaY = 24.5f;\n        Debug.Log(\"Elevacao no Ponto: \" + alturaY + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float alturaY","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Elevacao no Ponto: 24.5m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_3",
            title: "Densidade de Vegetação e Árvores",
            difficulty: "medium",
            description: "Declare int totalArvores = 1200;. Emita no Console: 'Instancias de Arvores: 1200'.",
            validationRules: { requiredPatterns: ["int totalArvores","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalArvores e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalArvores = 1200;
        Debug.Log("Instancias de Arvores: " + totalArvores);
    }
}`,
            tests: [
                { input: "", expected: "Instancias de Arvores: 1200", description: "Densidade vegetal" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int totalArvores, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Instancias de Arvores: 1200" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalArvores = 1200;\n        Debug.Log(\"Instancias de Arvores: \" + totalArvores);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int totalArvores","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Instancias de Arvores: 1200";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_4",
            title: "Distância de Desenho de Grama",
            difficulty: "medium",
            description: "Declare int distanciaDetalhes = 80;. Emita no Console: 'Distancia de Detalhes: 80m'.",
            validationRules: { requiredPatterns: ["int distanciaDetalhes","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare distanciaDetalhes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int distanciaDetalhes = 80;
        Debug.Log("Distancia de Detalhes: " + distanciaDetalhes + "m");
    }
}`,
            tests: [
                { input: "", expected: "Distancia de Detalhes: 80m", description: "Detail distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int distanciaDetalhes, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Distancia de Detalhes: 80m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int distanciaDetalhes = 80;\n        Debug.Log(\"Distancia de Detalhes: \" + distanciaDetalhes + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int distanciaDetalhes","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Distancia de Detalhes: 80m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_5",
            artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 6 },
            title: "Pintura de Camada de Textura (Splatmap)",
            difficulty: "medium",
            description: "Declare string camadaAtiva = 'Grama_Rochosa';. Emita no Console: 'Camada de Textura: Grama_Rochosa'.",
            validationRules: { requiredPatterns: ["camadaAtiva","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare camadaAtiva e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string camadaAtiva = "Grama_Rochosa";
        Debug.Log("Camada de Textura: " + camadaAtiva);
    }
}`,
            tests: [
                { input: "", expected: "Camada de Textura: Grama_Rochosa", description: "Textura do terreno" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: camadaAtiva, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Camada de Textura: Grama_Rochosa" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string camadaAtiva = \"Grama_Rochosa\";\n        Debug.Log(\"Camada de Textura: \" + camadaAtiva);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["camadaAtiva","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Camada de Textura: Grama_Rochosa";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_21 };
}
if (typeof window !== "undefined") {
    window.CAP_21 = CAP_21;
}
