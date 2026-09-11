/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 08
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 08 — GAMEOBJECTS E COMPONENTS
// ═══════════════════════════════════════════════════════

const CAP_08 = {
    id: 8,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 3, maxStars: 5 },
    title: "GameObjects e Components",
    theme: "Módulo 2 — Fundamentos do Unity",
    unlock: "GameObject Rúnico",
    unlockIcon: "[GO]",
    character: "orin",
    xpReward: 150,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 2 — Fundamentos do Unity. Hierarquia da Cena e Componentes sincronizados."
            },
            {
                    "type": "narrative",
                    "text": "A arquitetura do mundo ganha profundidade espacial. Entidades deixam de ser simples classes de memória e se manifestam como GameObjects completos no cenário 3D."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "EXPLORADOR DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "No Unity, um <code>GameObject</code> é uma entidade vazia por si só — como um manequim. Seu poder vem dos <strong>Components</strong> anexados a ele! Um colisor dá solidez, um renderer dá aparência e um script dá inteligência."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Podemos identificar qualquer entidade na cena lendo sua propriedade <code>gameObject.name</code> ou verificando sua etiqueta com <code>tag == 'Player'</code>. Para obter referência a outro componente acoplado ao objeto, utilizamos <code>GetComponent&lt;Rigidbody&gt;()</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Um GameObject também pode ser ativado ou desativado com <code>SetActive(true/false)</code>, e inspecionado para saber o total de componentes que possui acoplados."
            }
    ],
    concept: {
        title: "ARQUITETURA COMPONENTE-ENTIDADE DO UNITY: GAMEOBJECTS E COMPONENTS",
        explanation: "O Unity utiliza um modelo de Composição em vez de herança pura. Toda entidade na cena é um <code>GameObject</code>:\n<ul>\n  <li><strong>Nome do GameObject:</strong> Acessível através da propriedade <code>gameObject.name</code> (ex: verificar se o nome do jogador é \"Jogador\").</li>\n  <li><strong>Tags de Identificação:</strong> Tags categorizam GameObjects na cena. Comparar <code>tag == \"Player\"</code> permite saber se o objeto é o protagonista antes de executar lógicas sensíveis.</li>\n  <li><strong>Busca de Componentes com GetComponent:</strong> O método <code>GetComponent&lt;T&gt;()</code> pesquisa um componente do tipo especificado anexado ao mesmo GameObject (ex: verificar se existe um <code>Rigidbody</code> acoplado para aplicar forças físicas).</li>\n  <li><strong>Estado Ativo (<code>activeSelf</code> / <code>SetActive</code>):</strong> Determina se o GameObject está participando da simulação ou desativado em segundo plano (ex: <code>bool estaAtivo = true;</code>).</li>\n  <li><strong>Contagem e Conjuntos de Componentes:</strong> GameObjects contêm conjuntos de componentes essenciais (ex: <code>Transform</code>, <code>MeshRenderer</code>, <code>Collider</code>), cujo total pode ser verificado através da contagem de referências.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploGameObjects : MonoBehaviour
{
    void Start()
    {
        // 1. Identificação pelo nome do GameObject
        string nomeObjeto = gameObject.name;
        Debug.Log("GameObject: " + nomeObjeto);

        // 2. Verificação de Tag de categoria
        string tagObjeto = "Player";
        if (tagObjeto == "Player")
        {
            Debug.Log("Tag Valida: Player");
        }

        // 3. Simulação de busca com GetComponent<Rigidbody>
        bool temRigidbody = true;
        if (temRigidbody)
        {
            Debug.Log("Componente Rigidbody Encontrado");
        }

        // 4. Estado de ativação na cena
        bool estaAtivo = true;
        Debug.Log("GameObject Ativo: " + estaAtivo);

        // 5. Total de componentes estruturais
        string[] componentes = { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + componentes.Length);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Diagnóstico de Entidade na Cena Unity",
        code: `using UnityEngine;

public class DiagnosticoCena : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: Jogador");

        string tag = "Player";
        if (tag == "Player") Debug.Log("Tag Valida: Player");

        bool temRigidbody = true;
        if (temRigidbody) Debug.Log("Componente Rigidbody Encontrado");

        bool ativo = true;
        Debug.Log("GameObject Ativo: " + ativo);

        string[] comps = { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + comps.Length);
    }
}`,
        output: "GameObject: Jogador\nTag Valida: Player\nComponente Rigidbody Encontrado\nGameObject Ativo: True\nTotal de Componentes: 3"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de GameObjects e Components e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploGameObjects : MonoBehaviour
{
    void Start()
    {
        // 1. Identificação pelo nome do GameObject
        string nomeObjeto = gameObject.name;
        Debug.Log("GameObject: " + nomeObjeto);

        // 2. Verificação de Tag de categoria
        string tagObjeto = "Player";
        if (tagObjeto == "Player")
        {
            Debug.Log("Tag Valida: Player");
        }

        // 3. Simulação de busca com GetComponent<Rigidbody>
        bool temRigidbody = true;
        if (temRigidbody)
        {
            Debug.Log("Componente Rigidbody Encontrado");
        }

        // 4. Estado de ativação na cena
        bool estaAtivo = true;
        Debug.Log("GameObject Ativo: " + estaAtivo);

        // 5. Total de componentes estruturais
        string[] componentes = { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + componentes.Length);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de GameObjects e Components:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o nome do GameObject
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: " + gameObject.name);
    }
}`,
                hint: "GameObject: Jogador"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_8_1",
            title: "Identificação de GameObject",
            difficulty: "easy",
            description: "Obtenha o nome do GameObject atual acessando a propriedade gameObject.name. Emita no Console: 'GameObject: Jogador'.",
            validationRules: { requiredPatterns: ["gameObject.name","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o nome do GameObject
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: " + gameObject.name);
    }
}`,
            tests: [
                { input: "", expected: "GameObject: Jogador", description: "Acesso a gameObject.name" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: gameObject.name, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: GameObject: Jogador" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"GameObject: \" + gameObject.name);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["gameObject.name","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "GameObject: Jogador";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_2",
            title: "Verificação de Tag",
            difficulty: "easy",
            description: "Defina a variável string tag = 'Player';. Verifique com if se a tag é igual a 'Player' e emita 'Tag Valida: Player'.",
            validationRules: { requiredPatterns: ["tag","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tag = "Player";
        // Cheque a tag e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tag = "Player";
        if (tag == "Player")
        {
            Debug.Log("Tag Valida: " + tag);
        }
    }
}`,
            tests: [
                { input: "", expected: "Tag Valida: Player", description: "Checagem de tag" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tag, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Tag Valida: Player" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tag = \"Player\";\n        if (tag == \"Player\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tag","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Tag Valida: Player";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_3",
            title: "Simulação de GetComponent",
            difficulty: "medium",
            description: "Simule a busca de um componente Rigidbody: declare bool temRigidbody = true;. Se for verdadeiro, emita 'Componente Rigidbody Encontrado'.",
            validationRules: { requiredPatterns: ["bool temRigidbody","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temRigidbody = true;
        // Cheque e emita a mensagem
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temRigidbody = true;
        if (temRigidbody)
        {
            Debug.Log("Componente Rigidbody Encontrado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Componente Rigidbody Encontrado", description: "Verificação de componente" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool temRigidbody, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Componente Rigidbody Encontrado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool temRigidbody = true;\n        if (temRigidbody)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool temRigidbody","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Componente Rigidbody Encontrado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_4",
            title: "Estado Ativo de GameObject",
            difficulty: "medium",
            description: "Declare a variável booleana estaAtivo = true;. Emita no Console: 'GameObject Ativo: True'.",
            validationRules: { requiredPatterns: ["bool estaAtivo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare estaAtivo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaAtivo = true;
        Debug.Log("GameObject Ativo: " + estaAtivo);
    }
}`,
            tests: [
                { input: "", expected: "GameObject Ativo: True", description: "Estado de ativação" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaAtivo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: GameObject Ativo: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaAtivo = true;\n        Debug.Log(\"GameObject Ativo: \" + estaAtivo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaAtivo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "GameObject Ativo: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 3, maxStars: 5 },
            title: "Contagem de Componentes",
            difficulty: "medium",
            description: "Declare um array com os componentes do Player: 'Transform', 'MeshRenderer', 'Collider'. Exiba no Console: 'Total de Componentes: ' + componentes.Length.",
            validationRules: { requiredPatterns: ["string[] componentes","componentes.Length","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array de componentes e exiba o Length
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] componentes = new string[] { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + componentes.Length);
    }
}`,
            tests: [
                { input: "", expected: "Total de Componentes: 3", description: "Contagem de componentes" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] componentes, componentes.Length" },
                { level: "II", text: "A saída no console deve conter exatamente: Total de Componentes: 3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] componentes = new string[] { \"Transform\", \"MeshRenderer\", \"Collider\" };\n        Debug.Log(\"Total de Componentes: \" + componentes.Length);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] componentes","componentes.Length","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total de Componentes: 3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_08 };
}
if (typeof window !== "undefined") {
    window.CAP_08 = CAP_08;
}
