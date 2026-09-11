/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 32
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 32 — SAVE E LOAD COM JSON E SERIALIZAÇÃO
// ═══════════════════════════════════════════════════════

const CAP_32 = {
    id: 32,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 5, maxStars: 6 },
    title: "Save e Load com JSON e Serialização",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Registro JSON",
    unlockIcon: "[JSON]",
    character: "lyra",
    xpReward: 390,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando os Códices de Serialização Universal. JsonUtility e [System.Serializable] ativos."
            },
            {
                    "type": "narrative",
                    "text": "Lyra Nex transcreve árvores inteiras de objetos e inventários em cordões de texto estruturado em formato JSON. O estado do mundo torna-se portátil e perpétuo."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "PlayerPrefs é bom para um número solto, mas para salvar um RPG completo — com listas de itens, inventários complexos e histórico de missões — precisamos de **Serialização JSON**!"
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA",
                    "cssClass": "elion",
                    "text": "A regra de ouro da Unity: qualquer classe ou struct que vá ser convertida em texto precisa ser decorada com <code>[System.Serializable]</code>! Em seguida, usamos <code>JsonUtility.ToJson()</code> para transformar a instância em texto e <code>FromJson()</code> para reconstruir o objeto perfeitamente!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Validar a integridade do arquivo antes de desserializar evita travamentos por saves corrompidos. Domine a serialização completa neste capítulo."
            }
    ],
    concept: {
        title: "SERIALIZAÇÃO COM JSONUTILITY NO UNITY: [SYSTEM.SERIALIZABLE], TOJSON E FROMJSON",
        explanation: "A serialização transforma estruturas complexas da memória em strings textuais JSON:\n<ul>\n  <li><strong>Serialização para JSON (<code>JsonUtility.ToJson</code>):</strong> Converte um objeto serializável em uma string JSON compacta (ex: <code>JsonUtility.ToJson(Vector3.one)</code> emitindo <code>\"Serializado com JsonUtility\"</code> ou gerando <code>'{\"fase\":3,\"moedas\":150}'</code>).</li>\n  <li><strong>Uso do JsonUtility.ToJson:</strong> Chamada oficial do motor para gerar a representação em texto.</li>\n  <li><strong>Desserialização e Resgate de Valores (<code>FromJson</code>):</strong> Reconstrói o objeto a partir da string JSON, permitindo ler propriedades salvas (ex: fase carregada 5 e vida 100 emitindo <code>\"Save Carregado: Fase 5 (Vida: 100)\"</code>).</li>\n  <li><strong>Anotação [System.Serializable]:</strong> Atributo obrigatório acima da declaração de classes personalizadas que indica ao motor que seus campos devem ser empacotados pela serialização.</li>\n  <li><strong>Integridade do Arquivo de Save:</strong> Verificação booleana (<code>bool saveValido = true</code>) que valida se os dados não foram corrompidos antes de restaurar o progresso do jogador.</li>\n</ul>",
        code: `using UnityEngine;

// Classe com anotação serializável
[System.Serializable]
public class DadosJogador
{
    public int fase = 3;
    public int moedas = 150;
}

public class ExemploJSON : MonoBehaviour
{
    void Start()
    {
        // 1. Objeto serializado para texto JSON
        DadosJogador dados = new DadosJogador();
        string json = "{\\\"fase\\\":3,\\\"moedas\\\":150}";
        Debug.Log("JSON: " + json);

        // 2. Uso do JsonUtility
        string vetorJson = JsonUtility.ToJson(Vector3.one);
        Debug.Log("Serializado com JsonUtility");

        // 3. Desserialização e extração de valores
        int faseCarregada = 5;
        int vidaCarregada = 100;
        Debug.Log("Save Carregado: Fase " + faseCarregada + " (Vida: " + vidaCarregada + ")");

        // 4. Marcação como serializável
        string statusSerial = "Estrutura Marcada como Serializavel";
        Debug.Log(statusSerial);

        // 5. Verificação de integridade
        bool saveValido = true;
        if (saveValido)
        {
            Debug.Log("Arquivo de Save Valido e Carregado");
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Serializador e Desserializador de Save Game",
        code: `using UnityEngine;

public class JSONSaveManager : MonoBehaviour
{
    void Start()
    {
        Debug.Log("JSON: {\\\"fase\\\":3,\\\"moedas\\\":150}");
        Debug.Log("Serializado com JsonUtility");

        int f = 5;
        int v = 100;
        Debug.Log("Save Carregado: Fase " + f + " (Vida: " + v + ")");

        Debug.Log("Estrutura Marcada como Serializavel");

        bool valido = true;
        if (valido) Debug.Log("Arquivo de Save Valido e Carregado");
    }
}`,
        output: "JSON: {\"fase\":3,\"moedas\":150}\nSerializado com JsonUtility\nSave Carregado: Fase 5 (Vida: 100)\nEstrutura Marcada como Serializavel\nArquivo de Save Valido e Carregado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Save e Load com JSON e Serialização e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

// Classe com anotação serializável
[System.Serializable]
public class DadosJogador
{
    public int fase = 3;
    public int moedas = 150;
}

public class ExemploJSON : MonoBehaviour
{
    void Start()
    {
        // 1. Objeto serializado para texto JSON
        DadosJogador dados = new DadosJogador();
        string json = "{\\\"fase\\\":3,\\\"moedas\\\":150}";
        Debug.Log("JSON: " + json);

        // 2. Uso do JsonUtility
        string vetorJson = JsonUtility.ToJson(Vector3.one);
        Debug.Log("Serializado com JsonUtility");

        // 3. Desserialização e extração de valores
        int faseCarregada = 5;
        int vidaCarregada = 100;
        Debug.Log("Save Carregado: Fase " + faseCarregada + " (Vida: " + vidaCarregada + ")");

        // 4. Marcação como serializável
        string statusSerial = "Estrutura Marcada como Serializavel";
        Debug.Log(statusSerial);

        // 5. Verificação de integridade
        bool saveValido = true;
        if (saveValido)
        {
            Debug.Log("Arquivo de Save Valido e Carregado");
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Save e Load com JSON e Serialização:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure a string json e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string json = "{\\"fase\\":3,\\"moedas\\":150}";
        Debug.Log("JSON: " + json);
    }
}`,
                hint: "JSON: {\"fase\":3,\"moedas\":150}"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_32_1",
            title: "Serialização de Objeto para JSON",
            difficulty: "easy",
            description: "Simule a serialização de dados de save: declare string json = '{\"fase\":3,\"moedas\":150}';. Emita no Console: 'JSON: ' + json.",
            validationRules: { requiredPatterns: ["json","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure a string json e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string json = "{\\"fase\\":3,\\"moedas\\":150}";
        Debug.Log("JSON: " + json);
    }
}`,
            tests: [
                { input: "", expected: "JSON: {\"fase\":3,\"moedas\":150}", description: "String JSON" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: json, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: JSON: {\"fase\":3,\"moedas\":150}" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string json = \"{\\\"fase\\\":3,\\\"moedas\\\":150}\";\n        Debug.Log(\"JSON: \" + json);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["json","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "JSON: {\"fase\":3,\"moedas\":150}";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_32_2",
            title: "Uso do JsonUtility.ToJson",
            difficulty: "easy",
            description: "Simule a conversão de um vetor em JSON: chame JsonUtility.ToJson(Vector3.one). Emita no Console: 'Serializado com JsonUtility'.",
            validationRules: { requiredPatterns: ["JsonUtility.ToJson","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use JsonUtility.ToJson
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string txt = JsonUtility.ToJson(Vector3.one);
        Debug.Log("Serializado com JsonUtility");
    }
}`,
            tests: [
                { input: "", expected: "Serializado com JsonUtility", description: "JsonUtility ToJson" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: JsonUtility.ToJson, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Serializado com JsonUtility" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string txt = JsonUtility.ToJson(Vector3.one);\n        Debug.Log(\"Serializado com JsonUtility\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["JsonUtility.ToJson","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Serializado com JsonUtility";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_32_3",
            title: "Desserialização e Resgate de Valores",
            difficulty: "medium",
            description: "Simule a extração de dados desserializados: declare int faseCarregada = 5; int vidaCarregada = 100;. Emita 'Save Carregado: Fase 5 (Vida: 100)'.",
            validationRules: { requiredPatterns: ["faseCarregada","vidaCarregada","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os dados carregados e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int faseCarregada = 5;
        int vidaCarregada = 100;
        Debug.Log("Save Carregado: Fase " + faseCarregada + " (Vida: " + vidaCarregada + ")");
    }
}`,
            tests: [
                { input: "", expected: "Save Carregado: Fase 5 (Vida: 100)", description: "Desserialização de save" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: faseCarregada, vidaCarregada" },
                { level: "II", text: "A saída no console deve conter exatamente: Save Carregado: Fase 5 (Vida: 100)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int faseCarregada = 5;\n        int vidaCarregada = 100;\n        Debug.Log(\"Save Carregado: Fase \" + faseCarregada + \" (Vida: \" + vidaCarregada + \")\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["faseCarregada","vidaCarregada","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Save Carregado: Fase 5 (Vida: 100)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_32_4",
            title: "Anotação [System.Serializable]",
            difficulty: "medium",
            description: "Declare string statusSerial = 'Estrutura Marcada como Serializavel';. Emita no Console o valor de statusSerial.",
            validationRules: { requiredPatterns: ["string statusSerial","statusSerial","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusSerial e emita o status de serializacao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusSerial = "Estrutura Marcada como Serializavel";
        Debug.Log(statusSerial);
    }
}`,
            tests: [
                { input: "", expected: "Estrutura Marcada como Serializavel", description: "System.Serializable" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusSerial, statusSerial" },
                { level: "II", text: "A saída no console deve conter exatamente: Estrutura Marcada como Serializavel" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusSerial = \"Estrutura Marcada como Serializavel\";\n        Debug.Log(statusSerial);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusSerial","statusSerial","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Estrutura Marcada como Serializavel";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_32_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 5, maxStars: 6 },
            title: "Integridade de Arquivo de Save",
            difficulty: "medium",
            description: "Declare bool saveValido = true;. Se for verdadeiro, emita 'Arquivo de Save Valido e Carregado'.",
            validationRules: { requiredPatterns: ["bool saveValido","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide o save e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool saveValido = true;
        if (saveValido)
        {
            Debug.Log("Arquivo de Save Valido e Carregado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Arquivo de Save Valido e Carregado", description: "Integridade do save" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool saveValido, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Arquivo de Save Valido e Carregado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool saveValido = true;\n        if (saveValido)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool saveValido","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Arquivo de Save Valido e Carregado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_32 };
}
if (typeof window !== "undefined") {
    window.CAP_32 = CAP_32;
}
