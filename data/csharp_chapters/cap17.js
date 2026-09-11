/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 17
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 17 — COLISÕES E TRIGGERS
// ═══════════════════════════════════════════════════════

const CAP_17 = {
    id: 17,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
    title: "Colisões e Triggers",
    theme: "Módulo 5 — Física 3D",
    unlock: "Gatilho de Impacto",
    unlockIcon: "[TRIG]",
    character: "arkan",
    xpReward: 240,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Inicializando a Intersecção de Malhas Físicas. Colisões sólidas e Gatilhos Triggers ativos."
            },
            {
                    "type": "narrative",
                    "text": "Arkan Velor conjura escudos e campos de força. Alguns repelem projéteis com estrondo metálico; outros deixam itens arcanos serem absorvidos suavemente."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "No Unity existem dois tipos fundamentais de contato físico: **Colisões Sólidas**, que impedem objetos de se atravessarem e disparam <code>OnCollisionEnter</code>, e **Gatilhos (Triggers)**, que agem como zonas fantasmas e disparam <code>OnTriggerEnter</code>!"
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Gatilhos são perfeitos para coletar moedas, abrir portas automáticas ou ativar checkpoints sem barrar a passagem do herói. E para saber quem entrou no gatilho, filtramos com <code>CompareTag('Inimigo')</code> ou <code>tag == 'Player'</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Para que colisões ou triggers funcionem, ao menos uma das entidades participantes deve possuir um componente Rigidbody. Pratique as detecções neste capítulo."
            }
    ],
    concept: {
        title: "SISTEMA DE COLISÕES DO UNITY: ONCOLLISIONENTER VS ONTRIGGERENTER E FILTRAGEM POR TAG",
        explanation: "A intersecção de volumes colensores dita as reações de combate e exploração:\n<ul>\n  <li><strong>Colisão Sólida (<code>OnCollisionEnter</code>):</strong> Ocorre quando dois colisores sólidos se chocam, gerando impacto físico e impedindo a transposição (ex: receber um impacto sólido de espada).</li>\n  <li><strong>Gatilho de Zona (<code>OnTriggerEnter</code>):</strong> Quando a opção <code>Is Trigger</code> do Collider está ativada, o objeto torna-se intangível. Objetos podem atravessá-lo, disparando eventos sem reação física contrária.</li>\n  <li><strong>Coleta de Itens por Gatilho:</strong> É a mecânica clássica de absorver moedas, poções ou entrar em zonas de dano periódico (ex: <code>\"Moeda Coletada via Trigger\"</code>).</li>\n  <li><strong>Filtragem por Tag (<code>CompareTag</code>):</strong> Garante que apenas o alvo correto ative a reação (ex: verificar se a tag é \"Inimigo\" antes de aplicar dano).</li>\n  <li><strong>Resolução de Pontos de Contato:</strong> A estrutura <code>Collision</code> fornece informações detalhadas sobre a velocidade do choque e os pontos normais de contato na malha.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploColisoesTriggers : MonoBehaviour
{
    // Simulação do evento de colisão sólida
    void OnCollisionEnter(Collision collision)
    {
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");
    }

    // Simulação do evento de gatilho intangível
    void OnTriggerEnter(Collider other)
    {
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");
    }

    void Start()
    {
        // 1. Detecção de colisão sólida
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");

        // 2. Detecção de gatilho intangível
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");

        // 3. Coleta de item por trigger
        Debug.Log("Moeda Coletada via Trigger");

        // 4. Filtragem por tag de objeto
        string tagColisor = "Inimigo";
        if (tagColisor == "Inimigo")
        {
            Debug.Log("Contato com Inimigo Confirmado");
        }

        // 5. Total de colisores no gatilho
        int totalColisores = 1;
        Debug.Log("Colisores Ativos: " + totalColisores);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Reações Físicas de Contato e Coleta",
        code: `using UnityEngine;

public class GerenciadorColisoes : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");
        Debug.Log("Moeda Coletada via Trigger");

        string tag = "Inimigo";
        if (tag == "Inimigo") Debug.Log("Contato com Inimigo Confirmado");

        int ativos = 1;
        Debug.Log("Colisores Ativos: " + ativos);
    }
}`,
        output: "Colisao Solida: OnCollisionEnter disparado\nGatilho de Zona: OnTriggerEnter disparado\nMoeda Coletada via Trigger\nContato com Inimigo Confirmado\nColisores Ativos: 1"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Colisões e Triggers e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploColisoesTriggers : MonoBehaviour
{
    // Simulação do evento de colisão sólida
    void OnCollisionEnter(Collision collision)
    {
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");
    }

    // Simulação do evento de gatilho intangível
    void OnTriggerEnter(Collider other)
    {
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");
    }

    void Start()
    {
        // 1. Detecção de colisão sólida
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");

        // 2. Detecção de gatilho intangível
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");

        // 3. Coleta de item por trigger
        Debug.Log("Moeda Coletada via Trigger");

        // 4. Filtragem por tag de objeto
        string tagColisor = "Inimigo";
        if (tagColisor == "Inimigo")
        {
            Debug.Log("Contato com Inimigo Confirmado");
        }

        // 5. Total de colisores no gatilho
        int totalColisores = 1;
        Debug.Log("Colisores Ativos: " + totalColisores);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Colisões e Triggers:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a colisao solida
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string outroObjeto = "Parede";
        if (outroObjeto == "Parede")
        {
            Debug.Log("Impacto com Parede Registrado");
        }
    }
}`,
                hint: "Impacto com Parede Registrado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_17_1",
            title: "Detecção de Colisão Sólida (OnCollisionEnter)",
            difficulty: "easy",
            description: "Declare string outroObjeto = 'Parede';. Se for igual a 'Parede', emita no Console: 'Impacto com Parede Registrado'.",
            validationRules: { requiredPatterns: ["outroObjeto","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a colisao solida
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string outroObjeto = "Parede";
        if (outroObjeto == "Parede")
        {
            Debug.Log("Impacto com Parede Registrado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Impacto com Parede Registrado", description: "Colisão sólida" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: outroObjeto, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Impacto com Parede Registrado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string outroObjeto = \"Parede\";\n        if (outroObjeto == \"Parede\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["outroObjeto","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Impacto com Parede Registrado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_2",
            title: "Gatilho de Zona (OnTriggerEnter)",
            difficulty: "easy",
            description: "Declare bool isTrigger = true; e string zona = 'Checkpoint';. Se isTrigger for verdadeiro, emita 'Trigger Ativado: Checkpoint'.",
            validationRules: { requiredPatterns: ["bool isTrigger","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque o trigger e imprima a zona
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool isTrigger = true;
        string zona = "Checkpoint";
        if (isTrigger)
        {
            Debug.Log("Trigger Ativado: " + zona);
        }
    }
}`,
            tests: [
                { input: "", expected: "Trigger Ativado: Checkpoint", description: "Trigger de zona" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool isTrigger, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Trigger Ativado: Checkpoint" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool isTrigger = true;\n        string zona = \"Checkpoint\";\n        if (isTrigger)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool isTrigger","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Trigger Ativado: Checkpoint";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_3",
            title: "Coleta de Moeda por Gatilho",
            difficulty: "medium",
            description: "Declare int moedas = 0;. Simule a coleta somando 1 a moedas e emita no Console: 'Moedas: ' + moedas.",
            validationRules: { requiredPatterns: ["int moedas","++","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Incremente as moedas coletadas
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int moedas = 0;
        moedas++;
        Debug.Log("Moedas: " + moedas);
    }
}`,
            tests: [
                { input: "", expected: "Moedas: 1", description: "Coleta de item por trigger" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int moedas, ++" },
                { level: "II", text: "A saída no console deve conter exatamente: Moedas: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int moedas = 0;\n        moedas++;\n        Debug.Log(\"Moedas: \" + moedas);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int moedas","++","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Moedas: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_4",
            title: "Filtro de Colisão por Tag",
            difficulty: "medium",
            description: "Declare string colTag = 'Enemy';. Se colTag == 'Enemy', emita 'Dano Sofrido por Colisao!'.",
            validationRules: { requiredPatterns: ["colTag","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a tag do inimigo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string colTag = "Enemy";
        if (colTag == "Enemy")
        {
            Debug.Log("Dano Sofrido por Colisao!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Dano Sofrido por Colisao!", description: "Filtragem por Tag" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: colTag, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Sofrido por Colisao!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string colTag = \"Enemy\";\n        if (colTag == \"Enemy\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["colTag","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Sofrido por Colisao!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
            title: "Gatilho de Saída (OnTriggerExit)",
            difficulty: "medium",
            description: "Simule a saída de uma área segura: declare bool naAreaSegura = false;. Se não estiver na área segura (!naAreaSegura), emita 'Saiu da Area Segura!'.",
            validationRules: { requiredPatterns: ["bool naAreaSegura","!","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a saida da area segura
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool naAreaSegura = false;
        if (!naAreaSegura)
        {
            Debug.Log("Saiu da Area Segura!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Saiu da Area Segura!", description: "TriggerExit" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool naAreaSegura, !" },
                { level: "II", text: "A saída no console deve conter exatamente: Saiu da Area Segura!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool naAreaSegura = false;\n        if (!naAreaSegura)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool naAreaSegura","!","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Saiu da Area Segura!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_17 };
}
if (typeof window !== "undefined") {
    window.CAP_17 = CAP_17;
}
