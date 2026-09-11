/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 16
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 16 — RIGIDBODY E FÍSICA 3D
// ═══════════════════════════════════════════════════════

const CAP_16 = {
    id: 16,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 5 },
    title: "Rigidbody e Física 3D",
    theme: "Módulo 5 — Física 3D",
    unlock: "Massa Gravitacional",
    unlockIcon: "[PHYS]",
    character: "kael",
    xpReward: 230,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 5 — Física 3D. Motor dinâmico de corpos rígidos ativado."
            },
            {
                    "type": "narrative",
                    "text": "Blocos de granito e bigornas ganham massa, aceleração e gravidade sob o olhar atento de Kael Draven. O atrito e as forças newtonianas assumem o comando."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Quando queremos que um objeto seja governado por gravidade, impulsos e inércia real, anexamos a ele o componente <strong>Rigidbody</strong>! Jamais mova um corpo físico alterando o transform.position diretamente — você destruirá a simulação!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Para dar um salto ou empurrão explosivo, aplicamos forças com <code>AddForce()</code>. No Unity 6.5, a velocidade direta é manipulada através de <code>linearVelocity</code>, e podemos ligar ou desligar a gravidade com a chave booleana <code>useGravity</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Lembre-se sempre de que toda manipulação de Rigidbody deve ocorrer no método <code>FixedUpdate()</code> para manter a física matematicamente estável."
            }
    ],
    concept: {
        title: "O COMPONENTE RIGIDBODY: MASSA, FORÇAS, LINEARVELOCITY E GRAVIDADE NO UNITY 6.5",
        explanation: "O <code>Rigidbody</code> entrega uma entidade ao motor de física PhysX:\n<ul>\n  <li><strong>Massa (<code>mass</code>):</strong> Define a inércia do objeto em quilogramas (ex: <code>float massaObjeto = 5.0f;</code> emitindo <code>\"Massa do Rigidbody: 5kg\"</code>). Corpos mais pesados requerem maiores forças para acelerar.</li>\n  <li><strong>Aplicação de Impulso (<code>AddForce</code>):</strong> Adiciona uma força física vetorial empurrando o objeto na direção informada (ex: impulso vertical com <code>Vector3.up * 10f</code> emitindo <code>\"Forca Aplicada com AddForce\"</code>).</li>\n  <li><strong>Velocidade Linear (<code>linearVelocity</code>):</strong> No Unity 6.5, a propriedade <code>linearVelocity</code> substitui a antiga <code>velocity</code> para leitura e ajuste direto da velocidade em metros por segundo (ex: <code>float velLinear = 12.5f;</code>).</li>\n  <li><strong>Controle de Gravidade (<code>useGravity</code>):</strong> Define se o objeto sofre a atração natural do mundo físico (ex: <code>bool gravidadeAtiva = true;</code> emitindo <code>\"Gravidade Ativa: True\"</code>).</li>\n  <li><strong>Amortecimento de Arrasto (Drag):</strong> Coeficiente de atrito com o ar que desacelera o objeto suavemente com o tempo.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploRigidbody : MonoBehaviour
{
    void Start()
    {
        // 1. Configuração de massa inercial
        float massaObjeto = 5.0f;
        Debug.Log("Massa do Rigidbody: " + massaObjeto + "kg");

        // 2. Aplicação de força de impulso
        Debug.Log("Forca Aplicada com AddForce");

        // 3. Velocidade linear no Unity 6.5
        float velLinear = 12.5f;
        Debug.Log("Velocidade Linear: " + velLinear + " m/s");

        // 4. Controle booleano da gravidade
        bool gravidadeAtiva = true;
        Debug.Log("Gravidade Ativa: " + gravidadeAtiva);

        // 5. Coeficiente de arrasto (drag)
        float arrasto = 0.5f;
        Debug.Log("Arrasto Linear: " + arrasto);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Controlador Físico de Projétil",
        code: `using UnityEngine;

public class ProjetilFisico : MonoBehaviour
{
    void Start()
    {
        float m = 5.0f;
        Debug.Log("Massa do Rigidbody: " + m + "kg");

        Debug.Log("Forca Aplicada com AddForce");

        float vel = 12.5f;
        Debug.Log("Velocidade Linear: " + vel + " m/s");

        bool grav = true;
        Debug.Log("Gravidade Ativa: " + grav);

        float drag = 0.5f;
        Debug.Log("Arrasto Linear: " + drag);
    }
}`,
        output: "Massa do Rigidbody: 5kg\nForca Aplicada com AddForce\nVelocidade Linear: 12.5 m/s\nGravidade Ativa: True\nArrasto Linear: 0.5"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Rigidbody e Física 3D e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploRigidbody : MonoBehaviour
{
    void Start()
    {
        // 1. Configuração de massa inercial
        float massaObjeto = 5.0f;
        Debug.Log("Massa do Rigidbody: " + massaObjeto + "kg");

        // 2. Aplicação de força de impulso
        Debug.Log("Forca Aplicada com AddForce");

        // 3. Velocidade linear no Unity 6.5
        float velLinear = 12.5f;
        Debug.Log("Velocidade Linear: " + velLinear + " m/s");

        // 4. Controle booleano da gravidade
        bool gravidadeAtiva = true;
        Debug.Log("Gravidade Ativa: " + gravidadeAtiva);

        // 5. Coeficiente de arrasto (drag)
        float arrasto = 0.5f;
        Debug.Log("Arrasto Linear: " + arrasto);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Rigidbody e Física 3D:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare massa e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 75.0f;
        Debug.Log("Massa do Rigidbody: " + massa + "kg");
    }
}`,
                hint: "Massa do Rigidbody: 75kg"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_16_1",
            title: "Configuração de Massa Física",
            difficulty: "easy",
            description: "Declare a variável float massa = 75.0f;. Emita no Console: 'Massa do Rigidbody: 75kg'.",
            validationRules: { requiredPatterns: ["float massa","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare massa e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 75.0f;
        Debug.Log("Massa do Rigidbody: " + massa + "kg");
    }
}`,
            tests: [
                { input: "", expected: "Massa do Rigidbody: 75kg", description: "Configuração de massa" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float massa, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Massa do Rigidbody: 75kg" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float massa = 75.0f;\n        Debug.Log(\"Massa do Rigidbody: \" + massa + \"kg\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float massa","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Massa do Rigidbody: 75kg";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_2",
            title: "Aplicação de Impulso com AddForce",
            difficulty: "easy",
            description: "Simule a aplicação de um impulso de pulo: declare float forcaPulo = 10.0f;. Emita no Console: 'Forca Aplicada: 10N'.",
            validationRules: { requiredPatterns: ["float forcaPulo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare forcaPulo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float forcaPulo = 10.0f;
        Debug.Log("Forca Aplicada: " + forcaPulo + "N");
    }
}`,
            tests: [
                { input: "", expected: "Forca Aplicada: 10N", description: "Impulso físico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float forcaPulo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Forca Aplicada: 10N" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float forcaPulo = 10.0f;\n        Debug.Log(\"Forca Aplicada: \" + forcaPulo + \"N\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float forcaPulo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Forca Aplicada: 10N";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_3",
            title: "Velocidade Linear (linearVelocity)",
            difficulty: "medium",
            description: "No Unity 6.5, linearVelocity gerencia a velocidade direta do corpo. Declare Vector3 vel = new Vector3(0, 5, 0); e emita 'Velocidade Y: ' + vel.y.",
            validationRules: { requiredPatterns: ["new Vector3","vel.y","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure vel e imprima vel.y
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 vel = new Vector3(0, 5, 0);
        Debug.Log("Velocidade Y: " + vel.y);
    }
}`,
            tests: [
                { input: "", expected: "Velocidade Y: 5", description: "Velocidade linear" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3, vel.y" },
                { level: "II", text: "A saída no console deve conter exatamente: Velocidade Y: 5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 vel = new Vector3(0, 5, 0);\n        Debug.Log(\"Velocidade Y: \" + vel.y);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3","vel.y","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Velocidade Y: 5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_4",
            title: "Controle de Gravidade (useGravity)",
            difficulty: "medium",
            description: "Declare bool usaGravidade = true;. Se for verdadeiro, emita 'Gravidade Ativada no Corpo'.",
            validationRules: { requiredPatterns: ["bool usaGravidade","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque usaGravidade
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool usaGravidade = true;
        if (usaGravidade)
        {
            Debug.Log("Gravidade Ativada no Corpo");
        }
    }
}`,
            tests: [
                { input: "", expected: "Gravidade Ativada no Corpo", description: "Uso de gravidade" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool usaGravidade, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Gravidade Ativada no Corpo" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool usaGravidade = true;\n        if (usaGravidade)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool usaGravidade","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Gravidade Ativada no Corpo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 4, maxStars: 5 },
            title: "Resistência do Ar (Drag)",
            difficulty: "medium",
            description: "Declare float drag = 2.5f;. Emita no Console: 'Atrito do Ar (Drag): 2.5'.",
            validationRules: { requiredPatterns: ["float drag","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare drag e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float drag = 2.5f;
        Debug.Log("Atrito do Ar (Drag): " + drag);
    }
}`,
            tests: [
                { input: "", expected: "Atrito do Ar (Drag): 2.5", description: "Drag físico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float drag, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Atrito do Ar (Drag): 2.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float drag = 2.5f;\n        Debug.Log(\"Atrito do Ar (Drag): \" + drag);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float drag","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Atrito do Ar (Drag): 2.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_16 };
}
if (typeof window !== "undefined") {
    window.CAP_16 = CAP_16;
}
