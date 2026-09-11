/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 25
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 25 — EFEITOS SONOROS 3D E ÁUDIO
// ═══════════════════════════════════════════════════════

const CAP_25 = {
    id: 25,
    artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 6 },
    title: "Efeitos Sonoros 3D e Áudio",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Sino Tridimensional",
    unlockIcon: "[SFX]",
    character: "kael",
    xpReward: 320,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Abrindo a Acústica Tridimensional. AudioSource, AudioListener e Atenuação Espacial ativados."
            },
            {
                    "type": "narrative",
                    "text": "Ecos de passos e o choque de lâminas reverberam nas paredes de pedra da masmorra. Kael Draven calibra as fontes sonoras espaciais."
            },
            {
                    "type": "character",
                    "name": "KAEL DRAVEN",
                    "role": "FERREIRO DE CÓDIGO",
                    "cssClass": "kael",
                    "text": "O som é metade da imersão de qualquer jogo! No Unity, o som é emitido por um **AudioSource** e captado pelos ouvidos virtuais do jogador no **AudioListener**."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Para efeitos rápidos de golpe, usamos <code>PlayOneShot()</code>, que permite múltiplos impactos simultâneos sem cortar o som anterior! E com o **Spatial Blend 3D** ajustado em 1.0f, o som atenua com a distância e respeita a direção de onde o monstro está vindo!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Controlar a distância máxima de audição (Max Distance) e loops para trilha sonora de fundo (BGM) completam o design acústico. Domine esses sistemas neste capítulo."
            }
    ],
    concept: {
        title: "ÁUDIO ESPACIAL NO UNITY: AUDIOSOURCE, PLAYONESHOT, 3D SPATIAL BLEND E ATENUAÇÃO",
        explanation: "O subsistema de áudio da Unity entrega posicionamento binaural e atenuação espacial:\n<ul>\n  <li><strong>Disparo com PlayOneShot:</strong> Executa um clipe de áudio uma única vez sem interromper outros sons em execução na mesma fonte (ex: <code>string som = \"Espada_Hit\";</code> emitindo <code>\"Audio Tocado: Espada_Hit\"</code>).</li>\n  <li><strong>Atenuação Espacial (Spatial Blend 3D):</strong> Varia de 0.0 (áudio 2D plano no fone) até 1.0f (áudio 3D imersivo completo, atenuado por distância e ângulo).</li>\n  <li><strong>Distância Máxima de Audição (Max Distance):</strong> Raio limite em metros a partir do qual o som se torna completamente inaudível (ex: se distância do ouvinte &lt;= 20m, o som é audível).</li>\n  <li><strong>Volume Master:</strong> Multiplicador de ganho geral de áudio (ex: <code>float volume = 0.8f;</code> emitindo <code>\"Volume Master: 80%\"</code>).</li>\n  <li><strong>Trilhas em Loop (BGM):</strong> Músicas de fundo e ambientes configuradas com a propriedade <code>loop = true</code> para execução contínua.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploAudio3D : MonoBehaviour
{
    void Start()
    {
        // 1. Reprodução de efeito sonoro único
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);

        // 2. Mixagem 3D completa (Spatial Blend)
        float espacialBlend = 1.0f;
        Debug.Log("Som 3D Completo: " + espacialBlend);

        // 3. Checagem de distância máxima audível
        float maxDist = 20.0f;
        float distOuvinte = 15.0f;
        if (distOuvinte <= maxDist)
        {
            Debug.Log("Som Audivel");
        }

        // 4. Volume master do mixer
        float volume = 0.8f;
        Debug.Log("Volume Master: 80%");

        // 5. Trilha de batalha em looping contínuo
        string musica = "Tema_Batalha";
        bool emLoop = true;
        if (emLoop)
        {
            Debug.Log("BGM em Loop: " + musica);
        }
    }
}`
    },
    example: {
        title: "Exemplo Prático — Gerenciador de Áudio Espacial e Música de Fundo",
        code: `using UnityEngine;

public class AudioManager : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Audio Tocado: Espada_Hit");

        float blend = 1.0f;
        Debug.Log("Som 3D Completo: " + blend);

        float max = 20.0f;
        float dist = 15.0f;
        if (dist <= max) Debug.Log("Som Audivel");

        Debug.Log("Volume Master: 80%");

        bool loop = true;
        if (loop) Debug.Log("BGM em Loop: Tema_Batalha");
    }
}`,
        output: "Audio Tocado: Espada_Hit\nSom 3D Completo: 1\nSom Audivel\nVolume Master: 80%\nBGM em Loop: Tema_Batalha"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Efeitos Sonoros 3D e Áudio e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploAudio3D : MonoBehaviour
{
    void Start()
    {
        // 1. Reprodução de efeito sonoro único
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);

        // 2. Mixagem 3D completa (Spatial Blend)
        float espacialBlend = 1.0f;
        Debug.Log("Som 3D Completo: " + espacialBlend);

        // 3. Checagem de distância máxima audível
        float maxDist = 20.0f;
        float distOuvinte = 15.0f;
        if (distOuvinte <= maxDist)
        {
            Debug.Log("Som Audivel");
        }

        // 4. Volume master do mixer
        float volume = 0.8f;
        Debug.Log("Volume Master: 80%");

        // 5. Trilha de batalha em looping contínuo
        string musica = "Tema_Batalha";
        bool emLoop = true;
        if (emLoop)
        {
            Debug.Log("BGM em Loop: " + musica);
        }
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Efeitos Sonoros 3D e Áudio:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o som e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);
    }
}`,
                hint: "Audio Tocado: Espada_Hit"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_25_1",
            title: "Reprodução de Áudio com PlayOneShot",
            difficulty: "easy",
            description: "Simule o disparo de um som único de golpe: declare string som = 'Espada_Hit';. Emita no Console: 'Audio Tocado: Espada_Hit'.",
            validationRules: { requiredPatterns: ["som","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o som e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);
    }
}`,
            tests: [
                { input: "", expected: "Audio Tocado: Espada_Hit", description: "PlayOneShot áudio" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: som, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Audio Tocado: Espada_Hit" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string som = \"Espada_Hit\";\n        Debug.Log(\"Audio Tocado: \" + som);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["som","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Audio Tocado: Espada_Hit";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_25_2",
            title: "Atenuação de Volume Espacial (3D Blend)",
            difficulty: "easy",
            description: "Declare float espacialBlend = 1.0f;. Emita no Console: 'Som 3D Completo: 1'.",
            validationRules: { requiredPatterns: ["float espacialBlend","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare espacialBlend e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float espacialBlend = 1.0f;
        Debug.Log("Som 3D Completo: " + espacialBlend);
    }
}`,
            tests: [
                { input: "", expected: "Som 3D Completo: 1", description: "Spatial Blend 3D" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float espacialBlend, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Som 3D Completo: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float espacialBlend = 1.0f;\n        Debug.Log(\"Som 3D Completo: \" + espacialBlend);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float espacialBlend","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Som 3D Completo: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_25_3",
            title: "Distância Máxima de Audição (Max Distance)",
            difficulty: "medium",
            description: "Declare float maxDist = 20.0f; e a distância atual float distOuvinte = 15.0f;. Se distOuvinte <= maxDist, emita 'Som Audivel'.",
            validationRules: { requiredPatterns: ["float maxDist","float distOuvinte","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide se o som e audivel
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float maxDist = 20.0f;
        float distOuvinte = 15.0f;
        if (distOuvinte <= maxDist)
        {
            Debug.Log("Som Audivel");
        }
    }
}`,
            tests: [
                { input: "", expected: "Som Audivel", description: "Atenuação sonora por distância" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float maxDist, float distOuvinte" },
                { level: "II", text: "A saída no console deve conter exatamente: Som Audivel" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float maxDist = 20.0f;\n        float distOuvinte = 15.0f;\n        if (distOuvinte <= maxDist)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float maxDist","float distOuvinte","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Som Audivel";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_25_4",
            title: "Controle de Volume Geral",
            difficulty: "medium",
            description: "Declare float volume = 0.8f;. Emita no Console: 'Volume Master: 80%'.",
            validationRules: { requiredPatterns: ["float volume","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a porcentagem de volume e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float volume = 0.8f;
        int pct = (int)(volume * 100);
        Debug.Log("Volume Master: " + pct + "%");
    }
}`,
            tests: [
                { input: "", expected: "Volume Master: 80%", description: "Volume de áudio" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float volume, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Volume Master: 80%" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float volume = 0.8f;\n        int pct = (int)(volume * 100);\n        Debug.Log(\"Volume Master: \" + pct + \"%\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float volume","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Volume Master: 80%";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_25_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 4, maxStars: 6 },
            title: "Trilha Sonora em Loop",
            difficulty: "medium",
            description: "Declare string musica = 'Tema_Batalha'; e bool emLoop = true;. Se emLoop, emita 'BGM em Loop: Tema_Batalha'.",
            validationRules: { requiredPatterns: ["musica","bool emLoop","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se a musica esta em loop
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string musica = "Tema_Batalha";
        bool emLoop = true;
        if (emLoop)
        {
            Debug.Log("BGM em Loop: " + musica);
        }
    }
}`,
            tests: [
                { input: "", expected: "BGM em Loop: Tema_Batalha", description: "Loop musical" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: musica, bool emLoop" },
                { level: "II", text: "A saída no console deve conter exatamente: BGM em Loop: Tema_Batalha" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string musica = \"Tema_Batalha\";\n        bool emLoop = true;\n        if (emLoop)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["musica","bool emLoop","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "BGM em Loop: Tema_Batalha";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_25 };
}
if (typeof window !== "undefined") {
    window.CAP_25 = CAP_25;
}
