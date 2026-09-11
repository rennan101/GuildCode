/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 10
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 10 — CICLO DE VIDA DO MONOBEHAVIOUR
// ═══════════════════════════════════════════════════════

const CAP_10 = {
    id: 10,
    artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 5 },
    title: "Ciclo de Vida do MonoBehaviour",
    theme: "Módulo 2 — Fundamentos do Unity",
    unlock: "Ampulheta Update",
    unlockIcon: "[CYCLE]",
    character: "arkan",
    xpReward: 170,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conectando ao Clock Universal da Engine. Ciclo de vida de execução de scripts inicializado."
            },
            {
                    "type": "narrative",
                    "text": "O pulso rítmico da dimensão dita a frequência dos eventos. Arkan Velor desenha a linha do tempo sequencial dos métodos internos da Unity."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Um script herdado de <code>MonoBehaviour</code> não possui uma função main() comum! A engine invoca automaticamente métodos específicos em cada fase da vida do objeto: nascimento, atualização de quadro, física e morte."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "A ordem sagrada de nascimento é imutável: <code>Awake()</code> é chamado primeiro para autoinicialização, seguido de <code>Start()</code> para conexões com outros scripts. Depois vem o loop contínuo: <code>Update()</code> roda a cada frame gráfico, <code>FixedUpdate()</code> a cada 0.02s para física determinística e <code>LateUpdate()</code> para câmeras seguirem personagens após eles terem se movido!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Quando uma entidade é destruída ou sai da cena, <code>OnDestroy()</code> é disparado para liberar recursos e cancelar assinaturas. Conhecer essa linha do tempo evita as armadilhas mais comuns de NullReferenceException em jogos."
            }
    ],
    concept: {
        title: "O CICLO DE VIDA DO MONOBEHAVIOUR: AWAKE, START, UPDATE, FIXEDUPDATE E LATEUPDATE",
        explanation: "Os métodos do ciclo de vida são chamados automaticamente pela Unity em momentos precisos:\n<ul>\n  <li><strong>Awake() vs Start():</strong> <code>Awake()</code> roda assim que o prefab/objeto nasce na memória, ideal para referências internas. <code>Start()</code> roda logo antes do primeiro frame, ideal para lógicas de inicialização compartilhada (ex: em Awake emite '1. Awake' e em Start emite '2. Start').</li>\n  <li><strong>Update():</strong> Executado uma vez por quadro gráfico renderizado (geralmente a 60 FPS ou mais). É o lar natural da leitura de inputs e lógicas visuais.</li>\n  <li><strong>FixedUpdate():</strong> Executado em intervalos de tempo fixos e regulares (por padrão a cada <code>0.02s</code> / 50Hz), desacoplado do framerate visual. É o único lugar seguro para cálculos de física e Rigidbody.</li>\n  <li><strong>LateUpdate():</strong> Executado após todos os métodos Update terem sido concluídos no frame. É perfeito para posicionar a câmera, garantindo que o herói já tenha terminado toda a sua movimentação no quadro atual.</li>\n  <li><strong>OnDestroy():</strong> Disparado quando o GameObject é removido da cena com Destroy, servindo para limpeza de memória, desativação de listeners e persistência de emergência.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploCicloDeVida : MonoBehaviour
{
    void Awake()
    {
        // 1. Inicialização prematura obrigatória
        Debug.Log("1. Awake");
    }

    void Start()
    {
        // 2. Inicialização antes do primeiro frame
        Debug.Log("2. Start");

        // Simulação de FPS em Update
        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");

        // Simulação do intervalo de física do FixedUpdate (0.02s padrão)
        float fixedDeltaTime = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDeltaTime + "s");

        // Simulação de posicionamento de câmera em LateUpdate
        string faseCamera = "LateUpdate: Posicionando Camera";
        Debug.Log(faseCamera);

        // Simulação de finalização em OnDestroy
        string statusDestruicao = "OnDestroy: Recursos Liberados";
        Debug.Log(statusDestruicao);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Sequenciador Temporal do Ciclo de Vida",
        code: `using UnityEngine;

public class SequenciadorCiclo : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");

        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");

        float fixedDelta = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDelta + "s");

        string camera = "LateUpdate: Posicionando Camera";
        Debug.Log(camera);

        string cleanup = "OnDestroy: Recursos Liberados";
        Debug.Log(cleanup);
    }
}`,
        output: "1. Awake\n2. Start\nUpdate Ativo: 60 FPS\nFixedUpdate Intervalo: 0.02s\nLateUpdate: Posicionando Camera\nOnDestroy: Recursos Liberados"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Ciclo de Vida do MonoBehaviour e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploCicloDeVida : MonoBehaviour
{
    void Awake()
    {
        // 1. Inicialização prematura obrigatória
        Debug.Log("1. Awake");
    }

    void Start()
    {
        // 2. Inicialização antes do primeiro frame
        Debug.Log("2. Start");

        // Simulação de FPS em Update
        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");

        // Simulação do intervalo de física do FixedUpdate (0.02s padrão)
        float fixedDeltaTime = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDeltaTime + "s");

        // Simulação de posicionamento de câmera em LateUpdate
        string faseCamera = "LateUpdate: Posicionando Camera";
        Debug.Log(faseCamera);

        // Simulação de finalização em OnDestroy
        string statusDestruicao = "OnDestroy: Recursos Liberados";
        Debug.Log(statusDestruicao);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Ciclo de Vida do MonoBehaviour:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    // Defina Awake e Start
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");
    }
}`,
                hint: "1. Awake"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_10_1",
            title: "Ordem de Inicialização (Awake & Start)",
            difficulty: "easy",
            description: "Implemente os métodos Awake() e Start() no script. Em Awake, emita '1. Awake' e em Start emita '2. Start'.",
            validationRules: { requiredPatterns: ["void Awake()","void Start()","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    // Defina Awake e Start
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");
    }
}`,
            tests: [
                { input: "", expected: "1. Awake\n2. Start", description: "Awake antes de Start" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: void Awake(), void Start()" },
                { level: "II", text: "A saída no console deve conter exatamente: 1. Awake" },
                { level: "III", text: "Exemplo estrutural:\n    void Awake()\n    {\n        Debug.Log(\"1. Awake\");\n    }\n" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["void Awake()","void Start()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "1. Awake";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_2",
            title: "Simulação de Atualização de Quadro (Update)",
            difficulty: "easy",
            description: "Declare int fps = 60;. Dentro de Start(), emita no Console: 'Update Ativo: ' + fps + ' FPS'.",
            validationRules: { requiredPatterns: ["int fps","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare int fps = 60 e imprima com Debug.Log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");
    }
}`,
            tests: [
                { input: "", expected: "Update Ativo: 60 FPS", description: "Frequência de Update" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int fps, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Update Ativo: 60 FPS" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int fps = 60;\n        Debug.Log(\"Update Ativo: \" + fps + \" FPS\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int fps","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Update Ativo: 60 FPS";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_3",
            title: "Física Síncrona com FixedUpdate",
            difficulty: "medium",
            description: "Declare float fixedDeltaTime = 0.02f;. Emita no Console em Start o intervalo de física padrão do Unity: 'FixedUpdate Intervalo: ' + fixedDeltaTime + 's'.",
            validationRules: { requiredPatterns: ["float fixedDeltaTime","0.02f","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare fixedDeltaTime e emita o intervalo de física
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float fixedDeltaTime = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDeltaTime + "s");
    }
}`,
            tests: [
                { input: "", expected: "FixedUpdate Intervalo: 0.02s", description: "Frequência fixa de física" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float fixedDeltaTime, 0.02f" },
                { level: "II", text: "A saída no console deve conter exatamente: FixedUpdate Intervalo: 0.02s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float fixedDeltaTime = 0.02f;\n        Debug.Log(\"FixedUpdate Intervalo: \" + fixedDeltaTime + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float fixedDeltaTime","0.02f","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "FixedUpdate Intervalo: 0.02s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_4",
            title: "Ajuste de Câmera em LateUpdate",
            difficulty: "medium",
            description: "Declare string faseCamera = 'LateUpdate: Posicionando Camera';. Emita no Console o valor de faseCamera com Debug.Log.",
            validationRules: { requiredPatterns: ["string faseCamera","faseCamera","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare faseCamera e emita o log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string faseCamera = "LateUpdate: Posicionando Camera";
        Debug.Log(faseCamera);
    }
}`,
            tests: [
                { input: "", expected: "LateUpdate: Posicionando Camera", description: "LateUpdate pós-movimento" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string faseCamera, faseCamera" },
                { level: "II", text: "A saída no console deve conter exatamente: LateUpdate: Posicionando Camera" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string faseCamera = \"LateUpdate: Posicionando Camera\";\n        Debug.Log(faseCamera);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string faseCamera","faseCamera","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "LateUpdate: Posicionando Camera";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_5",
            artifactReward: { artifactId: "Anklet_Wind", minStars: 4, maxStars: 5 },
            title: "Limpeza de Recursos em OnDestroy",
            difficulty: "medium",
            description: "Declare string statusDestruicao = 'OnDestroy: Recursos Liberados';. Emita a mensagem com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusDestruicao","statusDestruicao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusDestruicao e emita o log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusDestruicao = "OnDestroy: Recursos Liberados";
        Debug.Log(statusDestruicao);
    }
}`,
            tests: [
                { input: "", expected: "OnDestroy: Recursos Liberados", description: "Ciclo OnDestroy" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusDestruicao, statusDestruicao" },
                { level: "II", text: "A saída no console deve conter exatamente: OnDestroy: Recursos Liberados" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusDestruicao = \"OnDestroy: Recursos Liberados\";\n        Debug.Log(statusDestruicao);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusDestruicao","statusDestruicao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "OnDestroy: Recursos Liberados";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_10 };
}
if (typeof window !== "undefined") {
    window.CAP_10 = CAP_10;
}
