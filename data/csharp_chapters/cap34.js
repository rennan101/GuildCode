/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 34
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 34 — DELEGATES E EVENTS DESACOPLADOS
// ═══════════════════════════════════════════════════════

const CAP_34 = {
    id: 34,
    artifactReward: { artifactId: "Anklet_Lightning", minStars: 5, maxStars: 6 },
    title: "Delegates e Events Desacoplados",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Arauto de Eventos",
    unlockIcon: "[EVENT]",
    character: "elion",
    xpReward: 410,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Abrindo a Rede de Mensagens Desacopladas. Padrão Observer, Delegates e Events ativos."
            },
            {
                    "type": "narrative",
                    "text": "Ecos de sinos transmitem avisos por todas as torres da Guilda sem que os guardas precisem conhecer uns aos outros. Elion Raven conecta emissores e ouvintes arcanos."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA & ANALISTA",
                    "cssClass": "elion",
                    "text": "Se o seu script do Jogador precisar conhecer o script do HUD, o script de Áudio, o script de Conquistas e o script de Partículas, seu código se tornará um monólito espaguete impossível de manter! A solução sagrada são **Events e Delegates**!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "O jogador apenas grita ao mundo: <code>onPlayerDied?.Invoke()</code>! Ele não sabe quem está ouvindo. O HUD se inscreve para atualizar a barra, o sistema de som toca a derrota e o VFX solta fumaça — múltiplos ouvintes (Multicast) via <code>+=</code>! E no <code>OnDisable</code>, cancelamos a inscrição com <code>-=</code> para evitar vazamentos de memória!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "O padrão Observer desacoplado é o alicerce da arquitetura profissional de qualquer jogo em C#. Complete as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "DELEGATES E EVENTS NO UNITY: ACTION, PADRÃO OBSERVER, MULTICAST E CANCELAMENTO (-=)",
        explanation: "Delegates são referências para métodos, permitindo a arquitetura desacoplada de Eventos:\n<ul>\n  <li><strong>Declaração de Action:</strong> A estrutura <code>System.Action</code> encapsula métodos sem retorno: <code>Action onPlayerDied = () => Debug.Log(\"Evento: \" + status);</code>.</li>\n  <li><strong>Delegate com Parâmetros:</strong> Passa informações no disparo do evento, como valor do dano sofrido (ex: <code>Action onTakeDamage</code> transmitindo <code>\"Dano Sofrido: 45\"</code>).</li>\n  <li><strong>Desacoplamento de UI e Lógica:</strong> O modelo de jogo nunca manipula a UI diretamente; ele apenas dispara eventos que o HUD escuta (ex: <code>\"HUD Notificado: Barra Atualizada\"</code>).</li>\n  <li><strong>Múltiplos Ouvintes (Multicast Event):</strong> Vários sistemas podem se conectar ao mesmo evento com o operador <code>+=</code> (ex: Ouvinte 1 toca o som, Ouvinte 2 ativa a partícula).</li>\n  <li><strong>Cancelamento de Inscrição (<code>-=</code>):</strong> Sempre desinscrever ouvintes no <code>OnDisable</code> ou <code>OnDestroy</code> para evitar fugas de memória e referências mortas.</li>\n</ul>",
        code: `using UnityEngine;
using System;

public class ExemploEventsDelegates : MonoBehaviour
{
    void Start()
    {
        // 1. Declaração e disparo de Action simples
        string status = "Jogador Derrotado";
        Action onPlayerDied = () => Debug.Log("Evento: " + status);
        onPlayerDied();

        // 2. Delegate com parâmetro de dano
        int danoRecebido = 45;
        Action onTakeDamage = () => Debug.Log("Dano Sofrido: " + danoRecebido);
        onTakeDamage();

        // 3. Notificação desacoplada da UI
        string eventoUi = "HUD Notificado: Barra Atualizada";
        Debug.Log(eventoUi);

        // 4. Múltiplos ouvintes multicast
        string o1 = "Ouvinte 1: Som Tocado";
        string o2 = "Ouvinte 2: Particula Ativada";
        Debug.Log(o1);
        Debug.Log(o2);

        // 5. Desinscrição segura no OnDisable
        string statusUnsub = "Inscricao Removida com -= no OnDisable";
        Debug.Log(statusUnsub);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Sistema de Eventos de Combate Desacoplado",
        code: `using UnityEngine;
using System;

public class CombatEventManager : MonoBehaviour
{
    void Start()
    {
        string st = "Jogador Derrotado";
        Action died = () => Debug.Log("Evento: " + st);
        died();

        int d = 45;
        Action dmg = () => Debug.Log("Dano Sofrido: " + d);
        dmg();

        Debug.Log("HUD Notificado: Barra Atualizada");
        Debug.Log("Ouvinte 1: Som Tocado");
        Debug.Log("Ouvinte 2: Particula Ativada");
        Debug.Log("Inscricao Removida com -= no OnDisable");
    }
}`,
        output: "Evento: Jogador Derrotado\nDano Sofrido: 45\nHUD Notificado: Barra Atualizada\nOuvinte 1: Som Tocado\nOuvinte 2: Particula Ativada\nInscricao Removida com -= no OnDisable"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Delegates e Events Desacoplados e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using System;

public class ExemploEventsDelegates : MonoBehaviour
{
    void Start()
    {
        // 1. Declaração e disparo de Action simples
        string status = "Jogador Derrotado";
        Action onPlayerDied = () => Debug.Log("Evento: " + status);
        onPlayerDied();

        // 2. Delegate com parâmetro de dano
        int danoRecebido = 45;
        Action onTakeDamage = () => Debug.Log("Dano Sofrido: " + danoRecebido);
        onTakeDamage();

        // 3. Notificação desacoplada da UI
        string eventoUi = "HUD Notificado: Barra Atualizada";
        Debug.Log(eventoUi);

        // 4. Múltiplos ouvintes multicast
        string o1 = "Ouvinte 1: Som Tocado";
        string o2 = "Ouvinte 2: Particula Ativada";
        Debug.Log(o1);
        Debug.Log(o2);

        // 5. Desinscrição segura no OnDisable
        string statusUnsub = "Inscricao Removida com -= no OnDisable";
        Debug.Log(statusUnsub);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Delegates e Events Desacoplados:",
                starterCode: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare status, Action e execute-a
    }
}`,
                solution: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string status = "Jogador Derrotado";
        Action onPlayerDied = () => Debug.Log("Evento: " + status);
        onPlayerDied();
    }
}`,
                hint: "Evento: Jogador Derrotado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_34_1",
            title: "Declaração e Disparo de Action",
            difficulty: "easy",
            description: "Declare string status = 'Jogador Derrotado'; e Action onPlayerDied = () => Debug.Log('Evento: ' + status);. Invoque onPlayerDied();.",
            validationRules: { requiredPatterns: ["string status","Action onPlayerDied","onPlayerDied()"] },
            starterCode: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare status, Action e execute-a
    }
}`,
            solution: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string status = "Jogador Derrotado";
        Action onPlayerDied = () => Debug.Log("Evento: " + status);
        onPlayerDied();
    }
}`,
            tests: [
                { input: "", expected: "Evento: Jogador Derrotado", description: "Action delegate simples" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string status, Action onPlayerDied" },
                { level: "II", text: "A saída no console deve conter exatamente: Evento: Jogador Derrotado" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        string status = \"Jogador Derrotado\";\n        Action onPlayerDied = () => Debug.Log(\"Evento: \" + status);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string status","Action onPlayerDied","onPlayerDied()"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Evento: Jogador Derrotado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_34_2",
            title: "Delegate com Parâmetro de Dano",
            difficulty: "easy",
            description: "Declare int danoRecebido = 45; e Action onTakeDamage = () => Debug.Log('Dano Sofrido: ' + danoRecebido);. Invoque onTakeDamage();.",
            validationRules: { requiredPatterns: ["int danoRecebido","onTakeDamage","onTakeDamage()"] },
            starterCode: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare danoRecebido e execute a Action
    }
}`,
            solution: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoRecebido = 45;
        Action onTakeDamage = () => Debug.Log("Dano Sofrido: " + danoRecebido);
        onTakeDamage();
    }
}`,
            tests: [
                { input: "", expected: "Dano Sofrido: 45", description: "Delegate com parâmetro" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int danoRecebido, onTakeDamage" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Sofrido: 45" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        int danoRecebido = 45;\n        Action onTakeDamage = () => Debug.Log(\"Dano Sofrido: \" + danoRecebido);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int danoRecebido","onTakeDamage","onTakeDamage()"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Sofrido: 45";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_34_3",
            title: "Desacoplamento de UI e Lógica",
            difficulty: "medium",
            description: "Declare string eventoUi = 'HUD Notificado: Barra Atualizada';. Emita no Console o valor de eventoUi.",
            validationRules: { requiredPatterns: ["string eventoUi","eventoUi","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare eventoUi e emita a notificacao do evento
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string eventoUi = "HUD Notificado: Barra Atualizada";
        Debug.Log(eventoUi);
    }
}`,
            tests: [
                { input: "", expected: "HUD Notificado: Barra Atualizada", description: "Evento desacoplado" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string eventoUi, eventoUi" },
                { level: "II", text: "A saída no console deve conter exatamente: HUD Notificado: Barra Atualizada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string eventoUi = \"HUD Notificado: Barra Atualizada\";\n        Debug.Log(eventoUi);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string eventoUi","eventoUi","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "HUD Notificado: Barra Atualizada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_34_4",
            title: "Múltiplos Ouvintes de Evento (Multicast)",
            difficulty: "medium",
            description: "Declare string o1 = 'Ouvinte 1: Som Tocado'; e string o2 = 'Ouvinte 2: Particula Ativada';. Emita ambas em linhas separadas.",
            validationRules: { requiredPatterns: ["string o1","string o2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o1 e o2 e emita as acoes dos dois ouvintes
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string o1 = "Ouvinte 1: Som Tocado";
        string o2 = "Ouvinte 2: Particula Ativada";
        Debug.Log(o1);
        Debug.Log(o2);
    }
}`,
            tests: [
                { input: "", expected: "Ouvinte 1: Som Tocado\nOuvinte 2: Particula Ativada", description: "Multicast event" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string o1, string o2" },
                { level: "II", text: "A saída no console deve conter exatamente: Ouvinte 1: Som Tocado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string o1 = \"Ouvinte 1: Som Tocado\";\n        string o2 = \"Ouvinte 2: Particula Ativada\";\n        Debug.Log(o1);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string o1","string o2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Ouvinte 1: Som Tocado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_34_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 5, maxStars: 6 },
            title: "Cancelamento de Inscrição (-=)",
            difficulty: "medium",
            description: "Declare string statusUnsub = 'Inscricao Removida com -= no OnDisable';. Emita no Console com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusUnsub","statusUnsub","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusUnsub e emita a remocao de inscricao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusUnsub = "Inscricao Removida com -= no OnDisable";
        Debug.Log(statusUnsub);
    }
}`,
            tests: [
                { input: "", expected: "Inscricao Removida com -= no OnDisable", description: "Unsubscribe de evento" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusUnsub, statusUnsub" },
                { level: "II", text: "A saída no console deve conter exatamente: Inscricao Removida com -= no OnDisable" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusUnsub = \"Inscricao Removida com -= no OnDisable\";\n        Debug.Log(statusUnsub);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusUnsub","statusUnsub","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Inscricao Removida com -= no OnDisable";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_34 };
}
if (typeof window !== "undefined") {
    window.CAP_34 = CAP_34;
}
