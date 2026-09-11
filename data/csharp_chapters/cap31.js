/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 31
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 31 — SAVE E LOAD COM PLAYERPREFS
// ═══════════════════════════════════════════════════════

const CAP_31 = {
    id: 31,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
    title: "Save e Load com PlayerPrefs",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Memória PlayerPrefs",
    unlockIcon: "[SAVE]",
    character: "mira",
    xpReward: 380,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conectando à Memória Não-Volátil do Dispositivo. Módulo de Persistência PlayerPrefs ativo."
            },
            {
                    "type": "narrative",
                    "text": "Mira Solenn grava números de pontuação, preferências de áudio e nomes de heróis em tábuas de cristal permanente."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Quando o jogador fecha o jogo e desliga o computador, a memória RAM é completamente apagada! Para salvar preferências simples como recordes, volume e apelido, o Unity oferece **PlayerPrefs**!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "O PlayerPrefs grava pares de chave e valor: <code>SetInt('HighScore', 2500)</code> para inteiros, <code>SetFloat('MasterVolume', 0.8f)</code> para decimais e <code>SetString()</code> para textos. Com <code>HasKey()</code> verificamos se o save existe antes de carregar, e com <code>PlayerPrefs.Save()</code> forçamos a gravação imediata no disco!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "PlayerPrefs é ideal para opções e pequenos registros. Complete as 5 atividades deste capítulo para dominar a persistência nativa."
            }
    ],
    concept: {
        title: "PERSISTÊNCIA SIMPLES COM PLAYERPREFS: SET/GET INT, FLOAT, STRING, HASKEY E SAVE",
        explanation: "<code>PlayerPrefs</code> grava dados leves de preferências no registro do sistema ou arquivos locais:\n<ul>\n  <li><strong>Gravando Inteiros (<code>SetInt</code> e <code>GetInt</code>):</strong> Armazena pontuações e fases (ex: <code>PlayerPrefs.SetInt(\"HighScore\", 2500);</code> e leitura com valor padrão: <code>Debug.Log(\"HighScore Salvo: \" + score);</code>).</li>\n  <li><strong>Gravando Decimais (<code>SetFloat</code> e <code>GetFloat</code>):</strong> Armazena configurações de volume, sensibilidade e sliders (ex: volume mestre em 0.8f).</li>\n  <li><strong>Gravando Strings (<code>SetString</code> e <code>GetString</code>):</strong> Armazena o nome do perfil do jogador (ex: <code>PlayerPrefs.SetString(\"NomePlayer\", \"Arkan\");</code>).</li>\n  <li><strong>Verificação de Chave Existente (<code>HasKey</code>):</strong> Retorna se uma determinada chave já foi salva anteriormente (ex: checar se 'TutorialVisto' existe; se não, emite <code>\"Iniciar Tutorial\"</code>).</li>\n  <li><strong>Forçando Gravação no Disco (<code>Save</code>):</strong> Escreve imediatamente os dados da memória para o disco físico com <code>PlayerPrefs.Save();</code>.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploPlayerPrefs : MonoBehaviour
{
    void Start()
    {
        // 1. Salvar e resgatar inteiro
        int score = 2500;
        Debug.Log("HighScore Salvo: " + score);

        // 2. Salvar e resgatar float
        float vol = 0.8f;
        Debug.Log("Volume: " + vol);

        // 3. Salvar e resgatar string
        string nome = "Arkan";
        Debug.Log("Heroi Registrado: " + nome);

        // 4. Verificação de chave existente (HasKey)
        bool existe = false;
        if (!existe)
        {
            Debug.Log("Iniciar Tutorial");
        }

        // 5. Gravação forçada
        Debug.Log("Dados Gravados com Sucesso");
    }
}`
    },
    example: {
        title: "Exemplo Prático — Sistema de Configurações e Perfil com PlayerPrefs",
        code: `using UnityEngine;

public class SavePrefsManager : MonoBehaviour
{
    void Start()
    {
        int score = 2500;
        Debug.Log("HighScore Salvo: " + score);

        float vol = 0.8f;
        Debug.Log("Volume: " + vol);

        string nome = "Arkan";
        Debug.Log("Heroi Registrado: " + nome);

        bool existe = false;
        if (!existe) Debug.Log("Iniciar Tutorial");

        Debug.Log("Dados Gravados com Sucesso");
    }
}`,
        output: "HighScore Salvo: 2500\nVolume: 0.8\nHeroi Registrado: Arkan\nIniciar Tutorial\nDados Gravados com Sucesso"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Save e Load com PlayerPrefs e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploPlayerPrefs : MonoBehaviour
{
    void Start()
    {
        // 1. Salvar e resgatar inteiro
        int score = 2500;
        Debug.Log("HighScore Salvo: " + score);

        // 2. Salvar e resgatar float
        float vol = 0.8f;
        Debug.Log("Volume: " + vol);

        // 3. Salvar e resgatar string
        string nome = "Arkan";
        Debug.Log("Heroi Registrado: " + nome);

        // 4. Verificação de chave existente (HasKey)
        bool existe = false;
        if (!existe)
        {
            Debug.Log("Iniciar Tutorial");
        }

        // 5. Gravação forçada
        Debug.Log("Dados Gravados com Sucesso");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Save e Load com PlayerPrefs:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere HighScore
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetInt("HighScore", 2500);
        int score = PlayerPrefs.GetInt("HighScore", 0);
        Debug.Log("HighScore Salvo: " + score);
    }
}`,
                hint: "HighScore Salvo: 2500"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_31_1",
            title: "Salvando Pontuação com SetInt",
            difficulty: "easy",
            description: "Armazene a pontuação chamando PlayerPrefs.SetInt('HighScore', 2500);. Em seguida, leia com PlayerPrefs.GetInt('HighScore', 0); e exiba 'HighScore Salvo: ' + score.",
            validationRules: { requiredPatterns: ["PlayerPrefs.SetInt","PlayerPrefs.GetInt","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere HighScore
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetInt("HighScore", 2500);
        int score = PlayerPrefs.GetInt("HighScore", 0);
        Debug.Log("HighScore Salvo: " + score);
    }
}`,
            tests: [
                { input: "", expected: "HighScore Salvo: 2500", description: "PlayerPrefs SetInt/GetInt" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.SetInt, PlayerPrefs.GetInt" },
                { level: "II", text: "A saída no console deve conter exatamente: HighScore Salvo: 2500" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        PlayerPrefs.SetInt(\"HighScore\", 2500);\n        int score = PlayerPrefs.GetInt(\"HighScore\", 0);\n        Debug.Log(\"HighScore Salvo: \" + score);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.SetInt","PlayerPrefs.GetInt","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "HighScore Salvo: 2500";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_31_2",
            title: "Persistência de Volume Flutuante (SetFloat)",
            difficulty: "easy",
            description: "Salve o volume usando PlayerPrefs.SetFloat('MasterVolume', 0.8f);. Recupere com GetFloat e exiba 'Volume: ' + vol.",
            validationRules: { requiredPatterns: ["PlayerPrefs.SetFloat","PlayerPrefs.GetFloat","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere o volume
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetFloat("MasterVolume", 0.8f);
        float vol = PlayerPrefs.GetFloat("MasterVolume", 1.0f);
        Debug.Log("Volume: " + vol);
    }
}`,
            tests: [
                { input: "", expected: "Volume: 0.8", description: "PlayerPrefs SetFloat" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.SetFloat, PlayerPrefs.GetFloat" },
                { level: "II", text: "A saída no console deve conter exatamente: Volume: 0.8" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        PlayerPrefs.SetFloat(\"MasterVolume\", 0.8f);\n        float vol = PlayerPrefs.GetFloat(\"MasterVolume\", 1.0f);\n        Debug.Log(\"Volume: \" + vol);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.SetFloat","PlayerPrefs.GetFloat","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Volume: 0.8";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_31_3",
            title: "Persistência do Nome do Jogador (SetString)",
            difficulty: "medium",
            description: "Salve o nome com PlayerPrefs.SetString('NomePlayer', 'Arkan');. Recupere e emita 'Heroi Registrado: ' + nome.",
            validationRules: { requiredPatterns: ["PlayerPrefs.SetString","PlayerPrefs.GetString","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere o nome
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetString("NomePlayer", "Arkan");
        string nome = PlayerPrefs.GetString("NomePlayer", "Anonimo");
        Debug.Log("Heroi Registrado: " + nome);
    }
}`,
            tests: [
                { input: "", expected: "Heroi Registrado: Arkan", description: "PlayerPrefs SetString" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.SetString, PlayerPrefs.GetString" },
                { level: "II", text: "A saída no console deve conter exatamente: Heroi Registrado: Arkan" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        PlayerPrefs.SetString(\"NomePlayer\", \"Arkan\");\n        string nome = PlayerPrefs.GetString(\"NomePlayer\", \"Anonimo\");\n        Debug.Log(\"Heroi Registrado: \" + nome);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.SetString","PlayerPrefs.GetString","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Heroi Registrado: Arkan";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_31_4",
            title: "Verificação de Chave Existente (HasKey)",
            difficulty: "medium",
            description: "Verifique se a chave de tutorial existe: bool existe = PlayerPrefs.HasKey('TutorialVisto');. Se falso, emita 'Iniciar Tutorial'.",
            validationRules: { requiredPatterns: ["PlayerPrefs.HasKey","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque com HasKey
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool existe = PlayerPrefs.HasKey("TutorialVisto");
        if (!existe)
        {
            Debug.Log("Iniciar Tutorial");
        }
    }
}`,
            tests: [
                { input: "", expected: "Iniciar Tutorial", description: "PlayerPrefs HasKey" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.HasKey, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Iniciar Tutorial" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool existe = PlayerPrefs.HasKey(\"TutorialVisto\");\n        if (!existe)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.HasKey","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Iniciar Tutorial";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_31_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 4, maxStars: 6 },
            title: "Gravação Forçada no Disco (Save)",
            difficulty: "medium",
            description: "Após configurar dados, chame PlayerPrefs.Save(); e emita 'Dados Gravados com Sucesso'.",
            validationRules: { requiredPatterns: ["PlayerPrefs.Save()","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute PlayerPrefs.Save()
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.Save();
        Debug.Log("Dados Gravados com Sucesso");
    }
}`,
            tests: [
                { input: "", expected: "Dados Gravados com Sucesso", description: "PlayerPrefs Save" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: PlayerPrefs.Save(), Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Dados Gravados com Sucesso" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        PlayerPrefs.Save();\n        Debug.Log(\"Dados Gravados com Sucesso\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["PlayerPrefs.Save()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dados Gravados com Sucesso";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_31 };
}
if (typeof window !== "undefined") {
    window.CAP_31 = CAP_31;
}
