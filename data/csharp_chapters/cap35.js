/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 35
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 35 — INTERFACES E CONTRATOS DE CÓDIGO
// ═══════════════════════════════════════════════════════

const CAP_35 = {
    id: 35,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 5, maxStars: 6 },
    title: "Interfaces e Contratos de Código",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Pacto de Interfaces",
    unlockIcon: "[ITF]",
    character: "kael",
    xpReward: 420,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando os Contratos Sagrados. Interfaces, Abstrações e Polimorfismo por Contrato ativos."
            },
            {
                    "type": "narrative",
                    "text": "Kael Draven analisa armas, baús e barris explosivos. Todos possuem naturezas distintas, mas alguns compartilham o mesmo dever sagrado de receber dano."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "Em C#, uma classe só pode herdar de um único pai. Mas e se um Barril, um Inimigo e uma Parede Destrutível puderem tomar dano da mesma espada? Nós usamos uma **Interface**, como <code>IDamageable</code>!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Uma interface é um contrato solene que diz 'o que deve ser feito', sem ditar 'como fazer'. Ao golpear um alvo, checamos <code>if (alvo is IDamageable)</code>! E o mais brilhante: uma classe pode implementar múltiplas interfaces, como uma Porta que é ao mesmo tempo <code>IDamageable</code> e <code>IInteractable</code>!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Contratos de interface mantêm o código desacoplado e escalável para dezenas de novos tipos de objetos. Complete as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "INTERFACES EM C#: CONTRATOS IDAMAGEABLE, IINTERACTABLE, OPERADOR 'IS' E MÚLTIPLAS INTERFACES",
        explanation: "Interfaces estabelecem contratos de funcionalidade sem vínculos de herança rígida:\n<ul>\n  <li><strong>Contrato de Dano (<code>IDamageable</code>):</strong> Garante que qualquer entidade que a implemente possua um método para sofrer dano (ex: <code>\"IDamageable: Tomou 30 de dano\"</code>).</li>\n  <li><strong>Contrato de Interação (<code>IInteractable</code>):</strong> Padroniza baús, portas e NPCs que reagem ao botão de interação (ex: <code>\"IInteractable: Interagiu com Bau\"</code>).</li>\n  <li><strong>Polimorfismo Baseado em Interfaces:</strong> Um array de <code>IDamageable</code> pode conter tanto um 'Inimigo' quanto um 'Barril', iterando e tratando ambos de forma unificada (ex: <code>\"Entidade Danificavel: \" + nome</code>).</li>\n  <li><strong>Checagem Segura com Operador 'is':</strong> Avalia se uma referência desconhecida cumpre determinado contrato antes de invocá-lo (ex: <code>if (alvo is IDamageable) Debug.Log(\"Alvo Implementa IDamageable\");</code>).</li>\n  <li><strong>Múltiplas Interfaces por Classe:</strong> Diferente da herança simples de classes, uma única classe pode implementar <code>IDamageable</code> E <code>IInteractable</code> simultaneamente (ex: uma porta destrutível e interagível).</li>\n</ul>",
        code: `using UnityEngine;

// Definição das interfaces
public interface IDamageable
{
    void TomarDano(int quantidade);
}

public interface IInteractable
{
    void Interagir();
}

public class ExemploInterfaces : MonoBehaviour
{
    void Start()
    {
        // 1. Contrato IDamageable
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");

        // 2. Contrato IInteractable
        string objeto = "Bau";
        Debug.Log("IInteractable: Interagiu com " + objeto);

        // 3. Polimorfismo com interfaces
        string[] entidades = { "Inimigo", "Barril" };
        for (int i = 0; i < entidades.Length; i++)
        {
            Debug.Log("Entidade Danificavel: " + entidades[i]);
        }

        // 4. Verificação de tipo com o operador is
        bool eDanificavel = true;
        if (eDanificavel)
        {
            Debug.Log("Alvo Implementa IDamageable");
        }

        // 5. Múltiplas interfaces em um objeto
        bool podeInteragir = true;
        bool podeDestruir = true;
        if (podeInteragir && podeDestruir)
        {
            Debug.Log("Porta: Interagivel e Destrutivel");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Contratos de Interação e Combate em Cena",
        code: `using UnityEngine;

public class ContratosManager : MonoBehaviour
{
    void Start()
    {
        int d = 30;
        Debug.Log("IDamageable: Tomou " + d + " de dano");

        string obj = "Bau";
        Debug.Log("IInteractable: Interagiu com " + obj);

        string[] targets = { "Inimigo", "Barril" };
        for (int i = 0; i < targets.Length; i++)
        {
            Debug.Log("Entidade Danificavel: " + targets[i]);
        }

        bool danificavel = true;
        if (danificavel) Debug.Log("Alvo Implementa IDamageable");

        Debug.Log("Porta: Interagivel e Destrutivel");
    }
}`,
        output: "IDamageable: Tomou 30 de dano\nIInteractable: Interagiu com Bau\nEntidade Danificavel: Inimigo\nEntidade Danificavel: Barril\nAlvo Implementa IDamageable\nPorta: Interagivel e Destrutivel"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Interfaces e Contratos de Código e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

// Definição das interfaces
public interface IDamageable
{
    void TomarDano(int quantidade);
}

public interface IInteractable
{
    void Interagir();
}

public class ExemploInterfaces : MonoBehaviour
{
    void Start()
    {
        // 1. Contrato IDamageable
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");

        // 2. Contrato IInteractable
        string objeto = "Bau";
        Debug.Log("IInteractable: Interagiu com " + objeto);

        // 3. Polimorfismo com interfaces
        string[] entidades = { "Inimigo", "Barril" };
        for (int i = 0; i < entidades.Length; i++)
        {
            Debug.Log("Entidade Danificavel: " + entidades[i]);
        }

        // 4. Verificação de tipo com o operador is
        bool eDanificavel = true;
        if (eDanificavel)
        {
            Debug.Log("Alvo Implementa IDamageable");
        }

        // 5. Múltiplas interfaces em um objeto
        bool podeInteragir = true;
        bool podeDestruir = true;
        if (podeInteragir && podeDestruir)
        {
            Debug.Log("Porta: Interagivel e Destrutivel");
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Interfaces e Contratos de Código:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o dano e emita
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");
    }
}`,
                hint: "IDamageable: Tomou 30 de dano"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_35_1",
            title: "Contrato de Dano (IDamageable)",
            difficulty: "easy",
            description: "Simule uma entidade implementando IDamageable: declare int dano = 30;. Emita no Console: 'IDamageable: Tomou 30 de dano'.",
            validationRules: { requiredPatterns: ["dano","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o dano e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");
    }
}`,
            tests: [
                { input: "", expected: "IDamageable: Tomou 30 de dano", description: "Interface IDamageable" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: dano, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: IDamageable: Tomou 30 de dano" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int dano = 30;\n        Debug.Log(\"IDamageable: Tomou \" + dano + \" de dano\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["dano","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "IDamageable: Tomou 30 de dano";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_35_2",
            title: "Contrato de Interação (IInteractable)",
            difficulty: "easy",
            description: "Simule a interação com um baú: declare string objeto = 'Bau';. Emita no Console: 'IInteractable: Interagiu com Bau'.",
            validationRules: { requiredPatterns: ["objeto","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare objeto e emita a interacao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string objeto = "Bau";
        Debug.Log("IInteractable: Interagiu com " + objeto);
    }
}`,
            tests: [
                { input: "", expected: "IInteractable: Interagiu com Bau", description: "Interface IInteractable" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: objeto, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: IInteractable: Interagiu com Bau" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string objeto = \"Bau\";\n        Debug.Log(\"IInteractable: Interagiu com \" + objeto);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["objeto","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "IInteractable: Interagiu com Bau";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_35_3",
            title: "Polimorfismo Baseado em Interfaces",
            difficulty: "medium",
            description: "Declare um array com 2 tipos que implementam IDamageable: 'Inimigo' e 'Barril'. Itere e emita para cada um: 'Entidade Danificavel: ' + nome.",
            validationRules: { requiredPatterns: ["string[] alvos","for","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Itere pelos alvos danificaveis
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] alvos = new string[] { "Inimigo", "Barril" };
        for (int i = 0; i < alvos.Length; i++)
        {
            Debug.Log("Entidade Danificavel: " + alvos[i]);
        }
    }
}`,
            tests: [
                { input: "", expected: "Entidade Danificavel: Inimigo\nEntidade Danificavel: Barril", description: "Coleção de interfaces" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] alvos, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Entidade Danificavel: Inimigo" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] alvos = new string[] { \"Inimigo\", \"Barril\" };\n        for (int i = 0; i < alvos.Length; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] alvos","for","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Entidade Danificavel: Inimigo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_35_4",
            title: "Checagem Segura com Operador 'is'",
            difficulty: "medium",
            description: "Declare bool eDanificavel = true;. Se for verdadeiro, emita 'Alvo Implementa IDamageable'.",
            validationRules: { requiredPatterns: ["bool eDanificavel","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se implementa a interface
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool eDanificavel = true;
        if (eDanificavel)
        {
            Debug.Log("Alvo Implementa IDamageable");
        }
    }
}`,
            tests: [
                { input: "", expected: "Alvo Implementa IDamageable", description: "Checagem de interface" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool eDanificavel, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Alvo Implementa IDamageable" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool eDanificavel = true;\n        if (eDanificavel)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool eDanificavel","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alvo Implementa IDamageable";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_35_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 5, maxStars: 6 },
            title: "Múltiplas Interfaces em uma Classe",
            difficulty: "medium",
            description: "Uma porta pode ser Danificável e Interagível: declare bool podeInteragir = true; bool podeDestruir = true;. Emita 'Porta: Interagivel e Destrutivel'.",
            validationRules: { requiredPatterns: ["bool podeInteragir","bool podeDestruir","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os estados e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool podeInteragir = true;
        bool podeDestruir = true;
        Debug.Log("Porta: Interagivel e Destrutivel");
    }
}`,
            tests: [
                { input: "", expected: "Porta: Interagivel e Destrutivel", description: "Múltiplas interfaces" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool podeInteragir, bool podeDestruir" },
                { level: "II", text: "A saída no console deve conter exatamente: Porta: Interagivel e Destrutivel" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool podeInteragir = true;\n        bool podeDestruir = true;\n        Debug.Log(\"Porta: Interagivel e Destrutivel\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool podeInteragir","bool podeDestruir","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Porta: Interagivel e Destrutivel";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_35 };
}
if (typeof window !== "undefined") {
    window.CAP_35 = CAP_35;
}
