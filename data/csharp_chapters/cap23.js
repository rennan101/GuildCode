/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 23
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 23 — INTERFACE GRÁFICA (HUD E UI)
// ═══════════════════════════════════════════════════════

const CAP_23 = {
    id: 23,
    artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
    title: "Interface Gráfica (HUD e UI)",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Painel TextMeshPro",
    unlockIcon: "[UI]",
    character: "elion",
    xpReward: 300,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Entrando no Módulo 8 — Interface e Sistemas. Canvas dimensional e TextMeshPro ativados."
            },
            {
                    "type": "narrative",
                    "text": "Displays holográficos semitransparentes flutuam diante da visão do jogador. Elion Raven programa barras de vida, indicadores de mana e contadores numéricos."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA & ANALISTA",
                    "cssClass": "elion",
                    "text": "O **HUD (Heads-Up Display)** é o elo direto entre os dados internos do jogo e a mente do jogador! Em Unity, toda interface gráfica repousa sobre um componente **Canvas** e utiliza textos de alta definição renderizados pelo **TextMeshPro**."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Barras de mana e vida suaves utilizam a propriedade <code>fillAmount</code> variando de 0.0f a 1.0f (calculada como <code>manaAtual / manaMax</code>). Menus de pause são ativados com um booleano de visibilidade, e notificações rápidas em estilo Toast alertam ganhos de XP!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Para contadores numéricos (como moedas coletadas), formate textos com formatação numérica como <code>moedas.ToString('D4')</code> gerando números no estilo '0042'. Complete as 5 atividades de UI."
            }
    ],
    concept: {
        title: "SISTEMA DE UI DO UNITY: CANVAS, TEXTMESHPRO, BARRAS DE FILLAMOUNT E NOTIFICAÇÕES HUD",
        explanation: "A interface de usuário comunica atributos e estados em tempo real:\n<ul>\n  <li><strong>Texto TextMeshPro (TMP):</strong> Renderiza tipografia nítida baseada em Signed Distance Fields (SDF): <code>string texto = \"HP: 100/100\";</code> emitindo <code>\"HUD Texto: HP: 100/100\"</code>.</li>\n  <li><strong>Preenchimento de Barras (<code>fillAmount</code>):</strong> Uma imagem do tipo Filled varia sua máscara entre 0.0 e 1.0 dividindo o valor atual pelo valor máximo: <code>float fill = manaAtual / 100.0f;</code> (ex: 75 de mana gera fill 0.75).</li>\n  <li><strong>Visibilidade de Menus de Pausa:</strong> Paineis de interface alternam seu estado com base em um booleano (ex: <code>if (menuPausaAtivo) Debug.Log(\"Painel de Pausa Visivel\");</code>).</li>\n  <li><strong>Notificação Flutuante (Toast):</strong> Mensagens breves de conquista ou progresso exibidas na tela (ex: <code>\"Toast Notificacao: +100 XP\"</code>).</li>\n  <li><strong>Formatação de Contadores Numéricos:</strong> Exibir números com dígitos fixos (ex: formatar 42 moedas como '0042' através de formatação de string).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploInterfaceUI : MonoBehaviour
{
    void Start()
    {
        // 1. Atualização de texto TextMeshPro
        string textoHp = "HP: 100/100";
        Debug.Log("HUD Texto: " + textoHp);

        // 2. Preenchimento de barra de mana (fillAmount)
        float manaAtual = 75.0f;
        float manaMax = 100.0f;
        float fill = manaAtual / manaMax;
        Debug.Log("Barra Fill: " + fill);

        // 3. Painel de pausa
        bool menuPausaAtivo = true;
        if (menuPausaAtivo)
        {
            Debug.Log("Painel de Pausa Visivel");
        }

        // 4. Notificação no HUD
        string notificacao = "+100 XP";
        Debug.Log("Toast Notificacao: " + notificacao);

        // 5. Contador de moedas formatado
        int moedas = 42;
        Debug.Log("Moedas Coletadas: 00" + moedas);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Atualizador Dinâmico do HUD de Batalha",
        code: `using UnityEngine;

public class HUDController : MonoBehaviour
{
    void Start()
    {
        Debug.Log("HUD Texto: HP: 100/100");

        float mAtual = 75.0f;
        float mMax = 100.0f;
        Debug.Log("Barra Fill: " + (mAtual / mMax));

        bool pause = true;
        if (pause) Debug.Log("Painel de Pausa Visivel");

        Debug.Log("Toast Notificacao: +100 XP");

        int c = 42;
        Debug.Log("Moedas Coletadas: 00" + c);
    }
}`,
        output: "HUD Texto: HP: 100/100\nBarra Fill: 0.75\nPainel de Pausa Visivel\nToast Notificacao: +100 XP\nMoedas Coletadas: 0042"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Interface Gráfica (HUD e UI) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploInterfaceUI : MonoBehaviour
{
    void Start()
    {
        // 1. Atualização de texto TextMeshPro
        string textoHp = "HP: 100/100";
        Debug.Log("HUD Texto: " + textoHp);

        // 2. Preenchimento de barra de mana (fillAmount)
        float manaAtual = 75.0f;
        float manaMax = 100.0f;
        float fill = manaAtual / manaMax;
        Debug.Log("Barra Fill: " + fill);

        // 3. Painel de pausa
        bool menuPausaAtivo = true;
        if (menuPausaAtivo)
        {
            Debug.Log("Painel de Pausa Visivel");
        }

        // 4. Notificação no HUD
        string notificacao = "+100 XP";
        Debug.Log("Toast Notificacao: " + notificacao);

        // 5. Contador de moedas formatado
        int moedas = 42;
        Debug.Log("Moedas Coletadas: 00" + moedas);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Interface Gráfica (HUD e UI):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o texto do HUD e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string texto = "HP: 100/100";
        Debug.Log("HUD Texto: " + texto);
    }
}`,
                hint: "HUD Texto: HP: 100/100"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_23_1",
            title: "Atualização de Texto TextMeshPro",
            difficulty: "easy",
            description: "Simule a atualização de um label de vida: declare string texto = 'HP: 100/100';. Emita no Console: 'HUD Texto: HP: 100/100'.",
            validationRules: { requiredPatterns: ["texto","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o texto do HUD e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string texto = "HP: 100/100";
        Debug.Log("HUD Texto: " + texto);
    }
}`,
            tests: [
                { input: "", expected: "HUD Texto: HP: 100/100", description: "Atualização de texto HUD" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: texto, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: HUD Texto: HP: 100/100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string texto = \"HP: 100/100\";\n        Debug.Log(\"HUD Texto: \" + texto);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["texto","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "HUD Texto: HP: 100/100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_23_2",
            title: "Preenchimento de Barra de Mana (FillAmount)",
            difficulty: "easy",
            description: "Declare float manaAtual = 75.0f; e float manaMax = 100.0f;. Calcule float fill = manaAtual / 100.0f; e emita 'Barra Fill: ' + fill.",
            validationRules: { requiredPatterns: ["manaAtual","manaMax","fill","/"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o preenchimento da barra e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float manaAtual = 75.0f;
        float manaMax = 100.0f;
        float fill = manaAtual / 100.0f;
        Debug.Log("Barra Fill: " + fill);
    }
}`,
            tests: [
                { input: "", expected: "Barra Fill: 0.75", description: "Cálculo de FillAmount" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: manaAtual, manaMax" },
                { level: "II", text: "A saída no console deve conter exatamente: Barra Fill: 0.75" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float manaAtual = 75.0f;\n        float manaMax = 100.0f;\n        float fill = manaAtual / 100.0f;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["manaAtual","manaMax","fill","/"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Barra Fill: 0.75";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_23_3",
            title: "Visibilidade do Menu de Pause",
            difficulty: "medium",
            description: "Declare bool menuPausaAtivo = true;. Se for verdadeiro, emita 'Painel de Pausa Visivel'.",
            validationRules: { requiredPatterns: ["bool menuPausaAtivo","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque menuPausaAtivo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool menuPausaAtivo = true;
        if (menuPausaAtivo)
        {
            Debug.Log("Painel de Pausa Visivel");
        }
    }
}`,
            tests: [
                { input: "", expected: "Painel de Pausa Visivel", description: "Painel de menu" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool menuPausaAtivo, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Painel de Pausa Visivel" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool menuPausaAtivo = true;\n        if (menuPausaAtivo)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool menuPausaAtivo","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Painel de Pausa Visivel";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_23_4",
            title: "Notificação Flutuante no HUD",
            difficulty: "medium",
            description: "Declare string notificacao = '+100 XP';. Emita no Console: 'Toast Notificacao: +100 XP'.",
            validationRules: { requiredPatterns: ["notificacao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare notificacao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string notificacao = "+100 XP";
        Debug.Log("Toast Notificacao: " + notificacao);
    }
}`,
            tests: [
                { input: "", expected: "Toast Notificacao: +100 XP", description: "Notificação HUD" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: notificacao, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Toast Notificacao: +100 XP" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string notificacao = \"+100 XP\";\n        Debug.Log(\"Toast Notificacao: \" + notificacao);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["notificacao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Toast Notificacao: +100 XP";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_23_5",
            artifactReward: { artifactId: "Crown_Hollow", minStars: 4, maxStars: 6 },
            title: "Contador de Moedas na Tela",
            difficulty: "medium",
            description: "Declare int moedas = 42;. Emita no Console formatado: 'Moedas Coletadas: 0042' usando moedas.ToString().",
            validationRules: { requiredPatterns: ["int moedas","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure moedas e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int moedas = 42;
        Debug.Log("Moedas Coletadas: 00" + moedas);
    }
}`,
            tests: [
                { input: "", expected: "Moedas Coletadas: 0042", description: "Contador HUD com zeros à esquerda" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int moedas, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Moedas Coletadas: 0042" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int moedas = 42;\n        Debug.Log(\"Moedas Coletadas: 00\" + moedas);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int moedas","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Moedas Coletadas: 0042";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_23 };
}
if (typeof window !== "undefined") {
    window.CAP_23 = CAP_23;
}
