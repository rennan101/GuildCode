/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 28
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 28 — INSTANTIATE E DESTROY DINÂMICOS
// ═══════════════════════════════════════════════════════

const CAP_28 = {
    id: 28,
    artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 6 },
    title: "Instantiate e Destroy Dinâmicos",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Gerador Instantiate",
    unlockIcon: "[SPAWN]",
    character: "orin",
    xpReward: 350,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 9 — Avançado (Tópicos PTS). Matriz de instanciação e descarte dinâmico ativada."
            },
            {
                    "type": "narrative",
                    "text": "Orin Vale comanda o círculo de invocação de prefabs. Entidades surgem do nada, cumprem suas missões e desaparecem com temporizadores precisos."
            },
            {
                    "type": "character",
                    "name": "ORIN VALE",
                    "role": "ARTÍFICE DE CENÁRIOS",
                    "cssClass": "orin",
                    "text": "Em jogos dinâmicos, nem tudo pode estar colocado na cena desde o início: flechas, magias, itens de drop e novos monstros precisam nascer em tempo de execução usando **Instantiate()**!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "E quando o objeto cumpre seu propósito, usamos **Destroy()** para não sobrecarregar a memória. Podemos passar um temporizador de delay (como <code>Destroy(obj, 3.0f)</code>) para que uma explosão desapareça após 3 segundos, ou destruir imediatamente ao tocar no abismo!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Dominar a criação com posição e rotação específica e o controle de tempo de vida é a base do ciclo dinâmico de prefabs. Complete as atividades."
            }
    ],
    concept: {
        title: "CRIAÇÃO E DESTRUIÇÃO DINÂMICA: INSTANTIATE, DESTROY COM DELAY E CICLO DE PREFABS",
        explanation: "Gerenciar o nascimento e descarte de GameObjects em tempo de execução:\n<ul>\n  <li><strong>Criação com Instantiate:</strong> Clona um prefab na cena durante o jogo (ex: <code>string prefab = \"Projetil_Fogo\";</code> emitindo <code>\"Instantiate: Projetil_Fogo gerado\"</code>).</li>\n  <li><strong>Instantiate com Posição e Rotação:</strong> Define exatamente as coordenadas 3D de nascimento do objeto (ex: <code>Vector3 spawnPos = new Vector3(0, 1, 5);</code> emitindo <code>\"Spawn na Posicao: (0, 1, 5)\"</code>).</li>\n  <li><strong>Destruição com Temporizador (Delay):</strong> O método <code>Destroy(gameObject, delay)</code> programa a remoção da entidade após decorridos os segundos informados (ex: <code>float tempoVida = 3.0f;</code> emitindo <code>\"Objeto Destruido Apos: 3s\"</code>).</li>\n  <li><strong>Instanciação Sequencial em Laço:</strong> Gera ondas ou séries de objetos controladas por contadores (ex: criar instâncias de 1 a 3 sequencialmente).</li>\n  <li><strong>Destruição Imediata por Contato:</strong> Remove o GameObject da cena no momento em que colide com zonas fatais (ex: ao tocar no 'Abismo', executa <code>Destroy</code> imediato).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploInstantiateDestroy : MonoBehaviour
{
    void Start()
    {
        // 1. Criação dinâmica de entidade
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");

        // 2. Spawn em coordenadas específicas
        Vector3 spawnPos = new Vector3(0, 1, 5);
        Debug.Log("Spawn na Posicao: (" + spawnPos.x + ", " + spawnPos.y + ", " + spawnPos.z + ")");

        // 3. Destruição agendada por tempo de vida
        float tempoVida = 3.0f;
        Debug.Log("Objeto Destruido Apos: " + tempoVida + "s");

        // 4. Instanciação em lote
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Instancia #" + i + " criada");
        }

        // 5. Destruição imediata por colisor
        string colisor = "Abismo";
        if (colisor == "Abismo")
        {
            Debug.Log("Destroy: Entidade Removida da Cena");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerador e Limpador de Projéteis",
        code: `using UnityEngine;

public class SpawnDestroyManager : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Instantiate: Projetil_Fogo gerado");

        Vector3 pos = new Vector3(0, 1, 5);
        Debug.Log("Spawn na Posicao: (" + pos.x + ", " + pos.y + ", " + pos.z + ")");

        float vida = 3.0f;
        Debug.Log("Objeto Destruido Apos: " + vida + "s");

        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Instancia #" + i + " criada");
        }

        string zona = "Abismo";
        if (zona == "Abismo") Debug.Log("Destroy: Entidade Removida da Cena");
    }
}`,
        output: "Instantiate: Projetil_Fogo gerado\nSpawn na Posicao: (0, 1, 5)\nObjeto Destruido Apos: 3s\nInstancia #1 criada\nInstancia #2 criada\nInstancia #3 criada\nDestroy: Entidade Removida da Cena"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Instantiate e Destroy Dinâmicos e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploInstantiateDestroy : MonoBehaviour
{
    void Start()
    {
        // 1. Criação dinâmica de entidade
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");

        // 2. Spawn em coordenadas específicas
        Vector3 spawnPos = new Vector3(0, 1, 5);
        Debug.Log("Spawn na Posicao: (" + spawnPos.x + ", " + spawnPos.y + ", " + spawnPos.z + ")");

        // 3. Destruição agendada por tempo de vida
        float tempoVida = 3.0f;
        Debug.Log("Objeto Destruido Apos: " + tempoVida + "s");

        // 4. Instanciação em lote
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Instancia #" + i + " criada");
        }

        // 5. Destruição imediata por colisor
        string colisor = "Abismo";
        if (colisor == "Abismo")
        {
            Debug.Log("Destroy: Entidade Removida da Cena");
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Instantiate e Destroy Dinâmicos:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie o prefab e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");
    }
}`,
                hint: "Instantiate: Projetil_Fogo gerado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_28_1",
            title: "Criação Dinâmica de Entidade",
            difficulty: "easy",
            description: "Simule o nascimento de um projétil na cena: declare string prefab = 'Projetil_Fogo';. Emita no Console: 'Instantiate: Projetil_Fogo gerado'.",
            validationRules: { requiredPatterns: ["prefab","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie o prefab e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");
    }
}`,
            tests: [
                { input: "", expected: "Instantiate: Projetil_Fogo gerado", description: "Instantiate dinâmico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: prefab, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Instantiate: Projetil_Fogo gerado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string prefab = \"Projetil_Fogo\";\n        Debug.Log(\"Instantiate: \" + prefab + \" gerado\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["prefab","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Instantiate: Projetil_Fogo gerado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_28_2",
            title: "Instantiate com Posição e Rotação",
            difficulty: "easy",
            description: "Declare Vector3 spawnPos = new Vector3(0, 1, 5);. Emita no Console: 'Spawn na Posicao: (0, 1, 5)'.",
            validationRules: { requiredPatterns: ["new Vector3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare spawnPos e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 spawnPos = new Vector3(0, 1, 5);
        Debug.Log("Spawn na Posicao: (" + spawnPos.x + ", " + spawnPos.y + ", " + spawnPos.z + ")");
    }
}`,
            tests: [
                { input: "", expected: "Spawn na Posicao: (0, 1, 5)", description: "Spawn com coordenadas" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Spawn na Posicao: (0, 1, 5)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 spawnPos = new Vector3(0, 1, 5);\n        Debug.Log(\"Spawn na Posicao: (\" + spawnPos.x + \", \" + spawnPos.y + \", \" + spawnPos.z + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Spawn na Posicao: (0, 1, 5)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_28_3",
            title: "Destruição com Temporizador (Delay)",
            difficulty: "medium",
            description: "Declare float tempoVida = 3.0f;. Emita no Console: 'Objeto Destruido Apos: 3s'.",
            validationRules: { requiredPatterns: ["float tempoVida","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tempoVida e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoVida = 3.0f;
        Debug.Log("Objeto Destruido Apos: " + tempoVida + "s");
    }
}`,
            tests: [
                { input: "", expected: "Objeto Destruido Apos: 3s", description: "Destroy com delay" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float tempoVida, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Objeto Destruido Apos: 3s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float tempoVida = 3.0f;\n        Debug.Log(\"Objeto Destruido Apos: \" + tempoVida + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float tempoVida","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Objeto Destruido Apos: 3s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_28_4",
            title: "Contagem de Objetos Instanciados",
            difficulty: "medium",
            description: "Use um laço for de 1 até 3 gerando mensagens: 'Instancia #' + i + ' criada'.",
            validationRules: { requiredPatterns: ["for","<=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie 3 instancias no laco for
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Instancia #" + i + " criada");
        }
    }
}`,
            tests: [
                { input: "", expected: "Instancia #1 criada\nInstancia #2 criada\nInstancia #3 criada", description: "Spawn múltiplo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, <=" },
                { level: "II", text: "A saída no console deve conter exatamente: Instancia #1 criada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Instancia #\" + i + \" criada\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","<=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Instancia #1 criada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_28_5",
            artifactReward: { artifactId: "Chalice_Seiva", minStars: 4, maxStars: 6 },
            title: "Destruição Imediata ao Contato",
            difficulty: "medium",
            description: "Declare string colisor = 'Abismo';. Se colisor == 'Abismo', emita 'Destroy: Entidade Removida da Cena'.",
            validationRules: { requiredPatterns: ["colisor","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque o colisor e execute Destroy
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string colisor = "Abismo";
        if (colisor == "Abismo")
        {
            Debug.Log("Destroy: Entidade Removida da Cena");
        }
    }
}`,
            tests: [
                { input: "", expected: "Destroy: Entidade Removida da Cena", description: "Destroy imediato" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: colisor, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Destroy: Entidade Removida da Cena" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string colisor = \"Abismo\";\n        if (colisor == \"Abismo\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["colisor","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Destroy: Entidade Removida da Cena";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_28 };
}
if (typeof window !== "undefined") {
    window.CAP_28 = CAP_28;
}
