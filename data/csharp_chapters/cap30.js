/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 30
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 30 — SCRIPTABLEOBJECTS & ARQUITETURA MODULAR
// ═══════════════════════════════════════════════════════

const CAP_30 = {
    id: 30,
    artifactReward: { artifactId: "Ring_Draco", minStars: 5, maxStars: 6 },
    title: "ScriptableObjects & Arquitetura Modular",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Scriptable Cristal",
    unlockIcon: "[SO]",
    character: "elion",
    xpReward: 370,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Carregando a Arquitetura de Dados Modular. ScriptableObjects e Fichas Desacopladas ativos."
            },
            {
                    "type": "narrative",
                    "text": "Elion Raven manipula arquivos de dados que existem como assets puros no projeto, independentes de qualquer GameObject ou cena."
            },
            {
                    "type": "character",
                    "name": "ELION RAVEN",
                    "role": "ESTRATEGISTA & BIBLIOTECÁRIO",
                    "cssClass": "elion",
                    "text": "Nunca misture as fichas de atributos com a lógica dos monstros na cena! Se você tiver 500 Golems na fase, você não quer 500 cópias dos mesmos dados consumindo memória. Criamos **ScriptableObjects**!"
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Com a anotação <code>[CreateAssetMenu]</code>, criamos novas fichas de itens e inimigos com um clique no botão direito do editor! Centenas de instâncias na cena compartilham a mesma ficha central: se ajustarmos o dano base, todos os inimigos são balanceados simultaneamente!"
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "ScriptableObjects representam a melhor prática arquitetural para balanceamento de RPGs, tabelas de loot e custos de habilidades. Complete as 5 atividades deste capítulo."
            }
    ],
    concept: {
        title: "SCRIPTABLEOBJECTS NO UNITY: DADOS DESACOPLADOS, [CREATEASSETMENU] E COMPARTILHAMENTO EFICIENTE",
        explanation: "<code>ScriptableObject</code> é uma classe de dados que não precisa estar anexada a GameObjects da cena:\n<ul>\n  <li><strong>Leitura de Atributos:</strong> Lê fichas de dados compartilhadas (ex: <code>string nomePoder = \"Meteoro\"; int custoMana = 40;</code> emitindo <code>\"Habilidade: Meteoro | Custo: 40 Mana\"</code>).</li>\n  <li><strong>Ficha de Dados Modular de Inimigos:</strong> Armazena parâmetros base fora da cena (ex: monstro 'Golem' com 500 de HP base).</li>\n  <li><strong>Compartilhamento entre Instâncias:</strong> Múltiplas entidades na cena apontam para a mesma referência na memória, consumindo fração do espaço (ex: dobrar o dano compartilhado de 25 resulta em <code>\"Dano Compartilhado: 50\"</code>).</li>\n  <li><strong>Menu de Criação de Assets (<code>[CreateAssetMenu]</code>):</strong> Expõe o arquivo no menu de criação de assets do editor Unity (ex: <code>\"Assets/Create/Cartas/Item\"</code>).</li>\n  <li><strong>Economia e Desconto Modular:</strong> Lógicas de cálculo sobre a ficha (ex: subtrair custo de 30 da mana disponível de 80 informando <code>\"Mana Restante: 50\"</code>).</li>\n</ul>",
        code: `using UnityEngine;

// Definição de ScriptableObject
[CreateAssetMenu(fileName = "NovaHabilidade", menuName = "Assets/Create/Cartas/Item")]
public class HabilidadeData : ScriptableObject
{
    public string nomePoder;
    public int custoMana;
    public int danoBase;
}

public class ExemploScriptableObjects : MonoBehaviour
{
    void Start()
    {
        // 1. Leitura de dados de habilidade
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");

        // 2. Ficha de monstro
        string tipoMonstro = "Golem";
        int hpBase = 500;
        Debug.Log("Monstro: " + tipoMonstro + " | HP: " + hpBase);

        // 3. Compartilhamento de dados
        int danoBase = 25;
        int danoDuplo = danoBase * 2;
        Debug.Log("Dano Compartilhado: " + danoDuplo);

        // 4. Menu do editor
        string caminhoMenu = "Assets/Create/Cartas/Item";
        Debug.Log("Menu Ativo: " + caminhoMenu);

        // 5. Cálculo com base nos dados
        int manaDisponivel = 80;
        int custo = 30;
        int restante = manaDisponivel - custo;
        Debug.Log("Mana Restante: " + restante);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Consumo e Compartilhamento de Fichas de Dados",
        code: `using UnityEngine;

public class AssetDataLoader : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Habilidade: Meteoro | Custo: 40 Mana");
        Debug.Log("Monstro: Golem | HP: 500");

        int dano = 25 * 2;
        Debug.Log("Dano Compartilhado: " + dano);

        Debug.Log("Menu Ativo: Assets/Create/Cartas/Item");

        int m = 80 - 30;
        Debug.Log("Mana Restante: " + m);
    }
}`,
        output: "Habilidade: Meteoro | Custo: 40 Mana\nMonstro: Golem | HP: 500\nDano Compartilhado: 50\nMenu Ativo: Assets/Create/Cartas/Item\nMana Restante: 50"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de ScriptableObjects & Arquitetura Modular e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

// Definição de ScriptableObject
[CreateAssetMenu(fileName = "NovaHabilidade", menuName = "Assets/Create/Cartas/Item")]
public class HabilidadeData : ScriptableObject
{
    public string nomePoder;
    public int custoMana;
    public int danoBase;
}

public class ExemploScriptableObjects : MonoBehaviour
{
    void Start()
    {
        // 1. Leitura de dados de habilidade
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");

        // 2. Ficha de monstro
        string tipoMonstro = "Golem";
        int hpBase = 500;
        Debug.Log("Monstro: " + tipoMonstro + " | HP: " + hpBase);

        // 3. Compartilhamento de dados
        int danoBase = 25;
        int danoDuplo = danoBase * 2;
        Debug.Log("Dano Compartilhado: " + danoDuplo);

        // 4. Menu do editor
        string caminhoMenu = "Assets/Create/Cartas/Item";
        Debug.Log("Menu Ativo: " + caminhoMenu);

        // 5. Cálculo com base nos dados
        int manaDisponivel = 80;
        int custo = 30;
        int restante = manaDisponivel - custo;
        Debug.Log("Mana Restante: " + restante);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de ScriptableObjects & Arquitetura Modular:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os dados e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");
    }
}`,
                hint: "Habilidade: Meteoro | Custo: 40 Mana"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_30_1",
            title: "Leitura de Atributos do ScriptableObject",
            difficulty: "easy",
            description: "Simule a leitura de um arquivo de configuração: declare string nomePoder = 'Meteoro'; int custoMana = 40;. Emita: 'Habilidade: Meteoro | Custo: 40 Mana'.",
            validationRules: { requiredPatterns: ["nomePoder","custoMana","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os dados e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");
    }
}`,
            tests: [
                { input: "", expected: "Habilidade: Meteoro | Custo: 40 Mana", description: "Dados de ScriptableObject" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: nomePoder, custoMana" },
                { level: "II", text: "A saída no console deve conter exatamente: Habilidade: Meteoro | Custo: 40 Mana" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string nomePoder = \"Meteoro\";\n        int custoMana = 40;\n        Debug.Log(\"Habilidade: \" + nomePoder + \" | Custo: \" + custoMana + \" Mana\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["nomePoder","custoMana","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Habilidade: Meteoro | Custo: 40 Mana";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_30_2",
            title: "Ficha de Dados de Inimigo Modular",
            difficulty: "easy",
            description: "Declare string tipoMonstro = 'Golem'; int hpBase = 500;. Emita no Console: 'Monstro: Golem | HP: 500'.",
            validationRules: { requiredPatterns: ["tipoMonstro","hpBase","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os atributos e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tipoMonstro = "Golem";
        int hpBase = 500;
        Debug.Log("Monstro: " + tipoMonstro + " | HP: " + hpBase);
    }
}`,
            tests: [
                { input: "", expected: "Monstro: Golem | HP: 500", description: "Ficha de inimigo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tipoMonstro, hpBase" },
                { level: "II", text: "A saída no console deve conter exatamente: Monstro: Golem | HP: 500" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tipoMonstro = \"Golem\";\n        int hpBase = 500;\n        Debug.Log(\"Monstro: \" + tipoMonstro + \" | HP: \" + hpBase);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tipoMonstro","hpBase","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Monstro: Golem | HP: 500";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_30_3",
            title: "Compartilhamento de Dados Entre Instâncias",
            difficulty: "medium",
            description: "Simule duas instâncias lendo o mesmo danoBase = 25: calcule danoDuplo = danoBase * 2 e emita 'Dano Compartilhado: ' + danoDuplo.",
            validationRules: { requiredPatterns: ["danoBase","danoDuplo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o dano compartilhado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoBase = 25;
        int danoDuplo = danoBase * 2;
        Debug.Log("Dano Compartilhado: " + danoDuplo);
    }
}`,
            tests: [
                { input: "", expected: "Dano Compartilhado: 50", description: "Dados compartilhados" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: danoBase, danoDuplo" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Compartilhado: 50" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoBase = 25;\n        int danoDuplo = danoBase * 2;\n        Debug.Log(\"Dano Compartilhado: \" + danoDuplo);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["danoBase","danoDuplo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Compartilhado: 50";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_30_4",
            title: "Menu de Criação de Asset ([CreateAssetMenu])",
            difficulty: "medium",
            description: "Declare string caminhoMenu = 'Assets/Create/Cartas/Item';. Emita no Console: 'Menu Ativo: ' + caminhoMenu.",
            validationRules: { requiredPatterns: ["string caminhoMenu","caminhoMenu","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare caminhoMenu e emita o caminho do CreateAssetMenu
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string caminhoMenu = "Assets/Create/Cartas/Item";
        Debug.Log("Menu Ativo: " + caminhoMenu);
    }
}`,
            tests: [
                { input: "", expected: "Menu Ativo: Assets/Create/Cartas/Item", description: "CreateAssetMenu" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string caminhoMenu, caminhoMenu" },
                { level: "II", text: "A saída no console deve conter exatamente: Menu Ativo: Assets/Create/Cartas/Item" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string caminhoMenu = \"Assets/Create/Cartas/Item\";\n        Debug.Log(\"Menu Ativo: \" + caminhoMenu);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string caminhoMenu","caminhoMenu","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Menu Ativo: Assets/Create/Cartas/Item";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_30_5",
            artifactReward: { artifactId: "Ring_Draco", minStars: 5, maxStars: 6 },
            title: "Economia Modular de Custo de Habilidade",
            difficulty: "medium",
            description: "Declare int manaDisponivel = 80; int custo = 30;. Subtraia o custo e emita 'Mana Restante: ' + (manaDisponivel - custo).",
            validationRules: { requiredPatterns: ["manaDisponivel","custo","-","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Desconte a mana consumida
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int manaDisponivel = 80;
        int custo = 30;
        int restante = manaDisponivel - custo;
        Debug.Log("Mana Restante: " + restante);
    }
}`,
            tests: [
                { input: "", expected: "Mana Restante: 50", description: "Consumo de recurso modular" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: manaDisponivel, custo" },
                { level: "II", text: "A saída no console deve conter exatamente: Mana Restante: 50" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int manaDisponivel = 80;\n        int custo = 30;\n        int restante = manaDisponivel - custo;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["manaDisponivel","custo","-","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mana Restante: 50";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_30 };
}
if (typeof window !== "undefined") {
    window.CAP_30 = CAP_30;
}
