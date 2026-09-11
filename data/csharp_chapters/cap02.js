/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 02
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 02 — CONDICIONAIS (IF, ELSE, SWITCH)
// ═══════════════════════════════════════════════════════

const CAP_02 = {
    id: 2,
    artifactReward: { artifactId: "Crown_Cristal", minStars: 3, maxStars: 4 },
    title: "Condicionais (if, else, switch)",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Bússola de Fluxo",
    unlockIcon: "[IF]",
    character: "arkan",
    xpReward: 90,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Inicializando a Bifurcação das Decisões. Portas lógicas de fluxo de controle ativadas."
            },
            {
                    "type": "narrative",
                    "text": "Diante de você erguem-se arcos de pedra com runas que se iluminam alternadamente dependendo das escolhas tomadas."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Um jogo sem decisões é um mundo estático. Toda interação no gameplay depende de bifurcações: se a vida do jogador for maior que zero, ele continua ativo; se chegar a zero, a tela de Game Over surge!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Para múltiplos níveis de mana ou faixas de dificuldade, encadeamos <code>if / else if / else</code>. E quando precisamos selecionar uma classe ou item a partir de um identificador fixo, a estrutura <code>switch-case</code> oferece a sintaxe mais elegante e performática."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Não se esqueça do operador ternário <code>condicao ? valorSeVerdade : valorSeFalso</code>, excelente para atribuições rápidas em linha única, como definir se um herói está descansado ou exausto com base em sua estamina."
            }
    ],
    concept: {
        title: "ESTRUTURAS CONDICIONAIS: IF, ELSE, SWITCH E OPERADOR TERNÁRIO",
        explanation: "Estruturas condicionais desviam o fluxo de execução do código de acordo com o estado do jogo:\n<ul>\n  <li><strong>If / Else Básico:</strong> Testa uma condição booleana. Se for verdadeira, executa o bloco <code>if</code>; caso contrário, executa o bloco <code>else</code> (ex: <code>if (vida > 0) Debug.Log(\"Status: Ativo\"); else Debug.Log(\"Status: Game Over\");</code>).</li>\n  <li><strong>Comparações Relacionais:</strong> Operadores como <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>==</code> e <code>!=</code> avaliam limites numéricos (ex: <code>if (nivel &lt; 10) Debug.Log(\"Dificuldade: Normal\"); else Debug.Log(\"Dificuldade: Heroica\");</code>).</li>\n  <li><strong>Ramos Múltiplos com Else If:</strong> Permite testar várias faixas ordenadas em cascata (ex: checar se mana >= 50 para 'Magia: Suprema', senão se mana >= 25 para 'Magia: Basica', senão 'Sem Mana').</li>\n  <li><strong>Seleção com Switch-Case:</strong> Ideal para comparar uma variável contra múltiplos valores constantes. Cada caso deve ser encerrado com a instrução <code>break;</code> e pode conter uma cláusula <code>default:</code> para valores não mapeados.</li>\n  <li><strong>Operador Ternário (<code>? :</code>):</strong> Uma forma compacta de if/else para atribuição de valores em uma linha: <code>string estado = (stamina >= 50) ? \"Descansado\" : \"Exausto\";</code>.</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploCondicionais : MonoBehaviour
{
    void Start()
    {
        // 1. Checagem de sobrevivência (if / else)
        int vida = 0;
        if (vida > 0)
        {
            Debug.Log("Status: Ativo");
        }
        else
        {
            Debug.Log("Status: Game Over");
        }

        // 2. Classificação de dificuldade por nível
        int nivel = 12;
        if (nivel < 10)
        {
            Debug.Log("Dificuldade: Normal");
        }
        else
        {
            Debug.Log("Dificuldade: Heroica");
        }

        // 3. Ramos múltiplos com else if (nível de mana)
        int mana = 30;
        if (mana >= 50)
        {
            Debug.Log("Magia: Suprema");
        }
        else if (mana >= 25)
        {
            Debug.Log("Magia: Basica");
        }
        else
        {
            Debug.Log("Sem Mana");
        }

        // 4. Seleção com switch case
        int idClasse = 2;
        switch (idClasse)
        {
            case 1:
                Debug.Log("Classe: Guerreiro");
                break;
            case 2:
                Debug.Log("Classe: Mago");
                break;
            default:
                Debug.Log("Classe: Desconhecido");
                break;
        }

        // 5. Operador ternário
        int stamina = 60;
        string estado = (stamina >= 50) ? "Descansado" : "Exausto";
        Debug.Log("Estado: " + estado);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Árvore de Decisão do Jogador",
        code: `using UnityEngine;

public class DecisoesGameplay : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        if (vida > 0) Debug.Log("Status: Ativo");
        else Debug.Log("Status: Game Over");

        int nivel = 12;
        if (nivel < 10) Debug.Log("Dificuldade: Normal");
        else Debug.Log("Dificuldade: Heroica");

        int mana = 30;
        if (mana >= 50) Debug.Log("Magia: Suprema");
        else if (mana >= 25) Debug.Log("Magia: Basica");
        else Debug.Log("Sem Mana");

        int idClasse = 2;
        switch (idClasse)
        {
            case 1: Debug.Log("Classe: Guerreiro"); break;
            case 2: Debug.Log("Classe: Mago"); break;
            default: Debug.Log("Classe: Desconhecido"); break;
        }

        int stamina = 60;
        string estado = (stamina >= 50) ? "Descansado" : "Exausto";
        Debug.Log("Estado: " + estado);
    }
}`,
        output: "Status: Ativo\nDificuldade: Heroica\nMagia: Basica\nClasse: Mago\nEstado: Descansado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Condicionais (if, else, switch) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploCondicionais : MonoBehaviour
{
    void Start()
    {
        // 1. Checagem de sobrevivência (if / else)
        int vida = 0;
        if (vida > 0)
        {
            Debug.Log("Status: Ativo");
        }
        else
        {
            Debug.Log("Status: Game Over");
        }

        // 2. Classificação de dificuldade por nível
        int nivel = 12;
        if (nivel < 10)
        {
            Debug.Log("Dificuldade: Normal");
        }
        else
        {
            Debug.Log("Dificuldade: Heroica");
        }

        // 3. Ramos múltiplos com else if (nível de mana)
        int mana = 30;
        if (mana >= 50)
        {
            Debug.Log("Magia: Suprema");
        }
        else if (mana >= 25)
        {
            Debug.Log("Magia: Basica");
        }
        else
        {
            Debug.Log("Sem Mana");
        }

        // 4. Seleção com switch case
        int idClasse = 2;
        switch (idClasse)
        {
            case 1:
                Debug.Log("Classe: Guerreiro");
                break;
            case 2:
                Debug.Log("Classe: Mago");
                break;
            default:
                Debug.Log("Classe: Desconhecido");
                break;
        }

        // 5. Operador ternário
        int stamina = 60;
        string estado = (stamina >= 50) ? "Descansado" : "Exausto";
        Debug.Log("Estado: " + estado);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Condicionais (if, else, switch):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        // Cheque com if/else e exiba o status
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        if (vida > 0)
        {
            Debug.Log("Status: Ativo");
        }
        else
        {
            Debug.Log("Status: Game Over");
        }
    }
}`,
                hint: "Status: Game Over"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_2_1",
            title: "Checagem de Sobrevivência",
            difficulty: "easy",
            description: "Declare a variável inteira vida com 0 pontos. Utilize uma estrutura if/else: se vida > 0 exiba 'Status: Ativo', senão exiba 'Status: Game Over'.",
            validationRules: { requiredPatterns: ["int vida","if","else","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        // Cheque com if/else e exiba o status
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        if (vida > 0)
        {
            Debug.Log("Status: Ativo");
        }
        else
        {
            Debug.Log("Status: Game Over");
        }
    }
}`,
            tests: [
                { input: "", expected: "Status: Game Over", description: "If/else de sobrevivência" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int vida, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Status: Game Over" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int vida = 0;\n        if (vida > 0)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int vida","if","else","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Status: Game Over";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_2",
            title: "Classificação por Dificuldade",
            difficulty: "easy",
            description: "Declare a variável inteira nivel com 12. Se nivel < 10 exiba 'Dificuldade: Normal', caso contrário exiba 'Dificuldade: Heroica'.",
            validationRules: { requiredPatterns: ["int nivel","if","else","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivel = 12;
        // Avalie o nivel com if/else
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivel = 12;
        if (nivel < 10)
        {
            Debug.Log("Dificuldade: Normal");
        }
        else
        {
            Debug.Log("Dificuldade: Heroica");
        }
    }
}`,
            tests: [
                { input: "", expected: "Dificuldade: Heroica", description: "Checagem de dificuldade" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int nivel, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Dificuldade: Heroica" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int nivel = 12;\n        if (nivel < 10)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int nivel","if","else","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dificuldade: Heroica";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_3",
            title: "Ramo Múltiplo com Else If",
            difficulty: "medium",
            description: "Declare a variável inteira mana com 30. Use if/else if/else: se mana >= 50 exiba 'Magia: Suprema', senão se mana >= 25 exiba 'Magia: Basica', senão exiba 'Sem Mana'.",
            validationRules: { requiredPatterns: ["int mana","else if","if","else"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int mana = 30;
        // Aplique if, else if e else
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int mana = 30;
        if (mana >= 50)
        {
            Debug.Log("Magia: Suprema");
        }
        else if (mana >= 25)
        {
            Debug.Log("Magia: Basica");
        }
        else
        {
            Debug.Log("Sem Mana");
        }
    }
}`,
            tests: [
                { input: "", expected: "Magia: Basica", description: "Três ramos com else if" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int mana, else if" },
                { level: "II", text: "A saída no console deve conter exatamente: Magia: Basica" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int mana = 30;\n        if (mana >= 50)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int mana","else if","if","else"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Magia: Basica";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_4",
            title: "Seleção com Switch Case",
            difficulty: "medium",
            description: "Declare a variável inteira idClasse valendo 2. Utilize a estrutura switch com cases 1 ('Guerreiro'), 2 ('Mago') e default ('Desconhecido'), emitindo a classe selecionada.",
            validationRules: { requiredPatterns: ["switch","case 1:","case 2:","break;"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int idClasse = 2;
        // Use switch para avaliar idClasse
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int idClasse = 2;
        switch (idClasse)
        {
            case 1:
                Debug.Log("Classe: Guerreiro");
                break;
            case 2:
                Debug.Log("Classe: Mago");
                break;
            default:
                Debug.Log("Classe: Desconhecido");
                break;
        }
    }
}`,
            tests: [
                { input: "", expected: "Classe: Mago", description: "Switch case de classe" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: switch, case 1:" },
                { level: "II", text: "A saída no console deve conter exatamente: Classe: Mago" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int idClasse = 2;\n        switch (idClasse)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["switch","case 1:","case 2:","break;"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Classe: Mago";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_5",
            artifactReward: { artifactId: "Crown_Cristal", minStars: 3, maxStars: 4 },
            title: "Operador Ternário",
            difficulty: "medium",
            description: "Declare a variável inteira stamina valendo 60. Utilize o operador ternário (? :) para definir a string estado como (stamina >= 50 ? 'Descansado' : 'Exausto') e imprima o Estado no Console.",
            validationRules: { requiredPatterns: ["stamina","?",":","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int stamina = 60;
        // Use o operador ternario e exiba: Estado: Descansado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int stamina = 60;
        string estado = (stamina >= 50) ? "Descansado" : "Exausto";
        Debug.Log("Estado: " + estado);
    }
}`,
            tests: [
                { input: "", expected: "Estado: Descansado", description: "Operador ternário" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: stamina, ?" },
                { level: "II", text: "A saída no console deve conter exatamente: Estado: Descansado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int stamina = 60;\n        string estado = (stamina >= 50) ? \"Descansado\" : \"Exausto\";\n        Debug.Log(\"Estado: \" + estado);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["stamina","?",":","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Estado: Descansado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_02 };
}
if (typeof window !== "undefined") {
    window.CAP_02 = CAP_02;
}
