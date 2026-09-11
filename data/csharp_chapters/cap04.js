/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 04
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 04 — FUNÇÕES E MÉTODOS
// ═══════════════════════════════════════════════════════

const CAP_04 = {
    id: 4,
    artifactReward: { artifactId: "Chalice_Vulcano", minStars: 3, maxStars: 5 },
    title: "Funções e Métodos",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Pergaminho de Métodos",
    unlockIcon: "[FN]",
    character: "lyra",
    xpReward: 110,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Abrindo a Matriz de Métodos e Funções Modulares. Encapsulamento lógico ativo."
            },
            {
                    "type": "narrative",
                    "text": "Lyra Nex posiciona cilindros rúnicos interconectados. Ao acionar uma runa-mestre, todas as ramificações executam suas sub-rotinas em harmonia."
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Conjuradores novatos escrevem centenas de linhas repetidas dentro de um único bloco. Mestres de C#, por outro lado, dividem o problema em métodos reutilizáveis com responsabilidade única!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Existem dois tipos fundamentais de métodos: os procedimentos <code>void</code>, que realizam ações sem devolver nada (como exibir boas-vindas), e as funções com tipo de retorno específico, como <code>int Dobrar(int valor)</code>, <code>int CalcularCritico(int dano, int multiplicador)</code> ou <code>bool EstaVivo(int vidaAtual)</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Métodos podem receber múltiplos parâmetros de tipos variados e retornar valores formatados, como <code>string FormatarNome(string nome, int nivel)</code>. Observe a instrução <code>return</code> obrigatória em métodos com retorno tipado."
            }
    ],
    concept: {
        title: "MÉTODOS EM C#: PROCEDIMENTOS VOID, PARÂMETROS E RETORNOS TIPADOS",
        explanation: "Métodos são blocos nomeados de instruções que executam uma tarefa e podem ser chamados repetidas vezes:\n<ul>\n  <li><strong>Método Void:</strong> Não devolve nenhum valor de volta ao invocador. É usado para desencadear ações e logs (ex: <code>void ExibirBoasVindas() { Debug.Log(\"Bem-vindo ao Unity 6.5\"); }</code>).</li>\n  <li><strong>Método com Retorno Primitivo:</strong> Declara o tipo que será retornado antes do nome do método. A palavra-chave <code>return</code> devolve o resultado para a variável que o chamou (ex: <code>int Dobrar(int valor) { return valor * 2; }</code>).</li>\n  <li><strong>Múltiplos Parâmetros:</strong> Métodos podem receber dois ou mais argumentos separados por vírgula para cálculos complexos (ex: <code>int CalcularCritico(int dano, int multiplicador) { return dano * multiplicador; }</code>).</li>\n  <li><strong>Retornos Booleanos:</strong> Avaliam condições lógicas e retornam <code>true</code> ou <code>false</code> (ex: <code>bool EstaVivo(int vidaAtual) { return vidaAtual &gt; 0; }</code>).</li>\n  <li><strong>Formatação e Strings:</strong> Métodos podem combinar textos e atributos formatando cabeçalhos de jogo (ex: <code>string FormatarNome(string nome, int nivel) { return \"Player: \" + nome + \" [Lv \" + nivel + \"]\"; }</code>).</li>\n</ul>",
        code: `using UnityEngine;

public class ExemploFuncoes : MonoBehaviour
{
    // Método void sem retorno
    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }

    // Função que dobra um valor inteiro
    int Dobrar(int valor)
    {
        return valor * 2;
    }

    // Função de cálculo de dano crítico com 2 parâmetros
    int CalcularCritico(int dano, int multiplicador)
    {
        return dano * multiplicador;
    }

    // Função de checagem booleana
    bool EstaVivo(int vidaAtual)
    {
        return vidaAtual > 0;
    }

    // Função de formatação textual
    string FormatarNome(string nome, int nivel)
    {
        return "Player: " + nome + " [Lv " + nivel + "]";
    }

    void Start()
    {
        ExibirBoasVindas();

        int res = Dobrar(25);
        Debug.Log("Resultado: " + res);

        int crit = CalcularCritico(50, 3);
        Debug.Log("Dano Critico: " + crit);

        bool vivo = EstaVivo(10);
        Debug.Log("Heroi Vivo: " + vivo);

        string rotulo = FormatarNome("Arkan", 20);
        Debug.Log(rotulo);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Biblioteca de Fórmulas da Guilda",
        code: `using UnityEngine;

public class FormulasCombate : MonoBehaviour
{
    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }

    int Dobrar(int valor)
    {
        return valor * 2;
    }

    int CalcularCritico(int dano, int multiplicador)
    {
        return dano * multiplicador;
    }

    bool EstaVivo(int vidaAtual)
    {
        return vidaAtual > 0;
    }

    string FormatarNome(string nome, int nivel)
    {
        return "Player: " + nome + " [Lv " + nivel + "]";
    }

    void Start()
    {
        ExibirBoasVindas();
        Debug.Log("Resultado: " + Dobrar(25));
        Debug.Log("Dano Critico: " + CalcularCritico(50, 3));
        Debug.Log("Heroi Vivo: " + EstaVivo(10));
        Debug.Log(FormatarNome("Arkan", 20));
    }
}`,
        output: "Bem-vindo ao Unity 6.5\nResultado: 50\nDano Critico: 150\nHeroi Vivo: True\nPlayer: Arkan [Lv 20]"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Funções e Métodos e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class ExemploFuncoes : MonoBehaviour
{
    // Método void sem retorno
    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }

    // Função que dobra um valor inteiro
    int Dobrar(int valor)
    {
        return valor * 2;
    }

    // Função de cálculo de dano crítico com 2 parâmetros
    int CalcularCritico(int dano, int multiplicador)
    {
        return dano * multiplicador;
    }

    // Função de checagem booleana
    bool EstaVivo(int vidaAtual)
    {
        return vidaAtual > 0;
    }

    // Função de formatação textual
    string FormatarNome(string nome, int nivel)
    {
        return "Player: " + nome + " [Lv " + nivel + "]";
    }

    void Start()
    {
        ExibirBoasVindas();

        int res = Dobrar(25);
        Debug.Log("Resultado: " + res);

        int crit = CalcularCritico(50, 3);
        Debug.Log("Dano Critico: " + crit);

        bool vivo = EstaVivo(10);
        Debug.Log("Heroi Vivo: " + vivo);

        string rotulo = FormatarNome("Arkan", 20);
        Debug.Log(rotulo);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Funções e Métodos:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame ExibirBoasVindas()
    }
    
    // Crie o metodo void ExibirBoasVindas
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        ExibirBoasVindas();
    }

    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }
}`,
                hint: "Bem-vindo ao Unity 6.5"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_4_1",
            title: "Método Void de Log",
            difficulty: "easy",
            description: "Defina o método auxiliar void ExibirBoasVindas() que emite 'Bem-vindo ao Unity 6.5'. Invoque o método dentro de Start().",
            validationRules: { requiredPatterns: ["void ExibirBoasVindas()","ExibirBoasVindas()","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame ExibirBoasVindas()
    }
    
    // Crie o metodo void ExibirBoasVindas
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        ExibirBoasVindas();
    }

    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }
}`,
            tests: [
                { input: "", expected: "Bem-vindo ao Unity 6.5", description: "Método void sem parâmetros" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: void ExibirBoasVindas(), ExibirBoasVindas()" },
                { level: "II", text: "A saída no console deve conter exatamente: Bem-vindo ao Unity 6.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        ExibirBoasVindas();\n    }\n" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["void ExibirBoasVindas()","ExibirBoasVindas()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Bem-vindo ao Unity 6.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_2",
            title: "Função com Retorno Inteiro",
            difficulty: "easy",
            description: "Crie a função int Dobrar(int valor) que retorna valor * 2. Em Start, declare int res = Dobrar(25); e imprima 'Resultado: ' + res.",
            validationRules: { requiredPatterns: ["int Dobrar(int valor)","return valor * 2","Dobrar(25)"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame Dobrar com 25 e imprima o resultado
    }
    
    // Crie o metodo Dobrar
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int res = Dobrar(25);
        Debug.Log("Resultado: " + res);
    }

    int Dobrar(int valor)
    {
        return valor * 2;
    }
}`,
            tests: [
                { input: "", expected: "Resultado: 50", description: "Função com retorno inteiro" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int Dobrar(int valor), return valor * 2" },
                { level: "II", text: "A saída no console deve conter exatamente: Resultado: 50" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int res = Dobrar(25);\n        Debug.Log(\"Resultado: \" + res);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int Dobrar(int valor)","return valor * 2","Dobrar(25)"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Resultado: 50";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_3",
            title: "Função de Cálculo de Dano Crítico",
            difficulty: "medium",
            description: "Crie a função int CalcularCritico(int dano, int multiplicador) que retorna dano * multiplicador. No Start, chame com (50, 3) e exiba 'Dano Critico: ' + resultado.",
            validationRules: { requiredPatterns: ["int CalcularCritico(int dano, int multiplicador)","CalcularCritico(50, 3)"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Invoque CalcularCritico e imprima
    }
    
    // Defina CalcularCritico
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoFinal = CalcularCritico(50, 3);
        Debug.Log("Dano Critico: " + danoFinal);
    }

    int CalcularCritico(int dano, int multiplicador)
    {
        return dano * multiplicador;
    }
}`,
            tests: [
                { input: "", expected: "Dano Critico: 150", description: "Função com múltiplos parâmetros" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int CalcularCritico(int dano, int multiplicador), CalcularCritico(50, 3)" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Critico: 150" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoFinal = CalcularCritico(50, 3);\n        Debug.Log(\"Dano Critico: \" + danoFinal);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int CalcularCritico(int dano, int multiplicador)","CalcularCritico(50, 3)"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Critico: 150";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_4",
            title: "Função Booleana de Verificação",
            difficulty: "medium",
            description: "Crie a função bool EstaVivo(int vidaAtual) que retorna vidaAtual > 0. No Start, teste com 10 pontos e exiba 'Heroi Vivo: ' + EstaVivo(10).",
            validationRules: { requiredPatterns: ["bool EstaVivo(int vidaAtual)","return vidaAtual > 0","EstaVivo(10)"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Teste EstaVivo com 10 e imprima
    }
    
    // Defina EstaVivo
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool vivo = EstaVivo(10);
        Debug.Log("Heroi Vivo: " + vivo);
    }

    bool EstaVivo(int vidaAtual)
    {
        return vidaAtual > 0;
    }
}`,
            tests: [
                { input: "", expected: "Heroi Vivo: True", description: "Função com retorno booleano" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool EstaVivo(int vidaAtual), return vidaAtual > 0" },
                { level: "II", text: "A saída no console deve conter exatamente: Heroi Vivo: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool vivo = EstaVivo(10);\n        Debug.Log(\"Heroi Vivo: \" + vivo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool EstaVivo(int vidaAtual)","return vidaAtual > 0","EstaVivo(10)"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Heroi Vivo: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_5",
            artifactReward: { artifactId: "Chalice_Vulcano", minStars: 3, maxStars: 5 },
            title: "Formatação de Nome de Jogador",
            difficulty: "medium",
            description: "Crie a função string FormatarNome(string nome, int nivel) que retorna 'Player: ' + nome + ' [Lv ' + nivel + ']'. No Start, chame com ('Arkan', 20) e exiba o resultado.",
            validationRules: { requiredPatterns: ["string FormatarNome(string nome, int nivel)","FormatarNome(\"Arkan\", 20)"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame FormatarNome e imprima
    }
    
    // Defina FormatarNome
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string rotulo = FormatarNome("Arkan", 20);
        Debug.Log(rotulo);
    }

    string FormatarNome(string nome, int nivel)
    {
        return "Player: " + nome + " [Lv " + nivel + "]";
    }
}`,
            tests: [
                { input: "", expected: "Player: Arkan [Lv 20]", description: "Função com retorno string" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string FormatarNome(string nome, int nivel), FormatarNome(\"Arkan\", 20)" },
                { level: "II", text: "A saída no console deve conter exatamente: Player: Arkan [Lv 20]" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string rotulo = FormatarNome(\"Arkan\", 20);\n        Debug.Log(rotulo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string FormatarNome(string nome, int nivel)","FormatarNome(\"Arkan\", 20)"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Player: Arkan [Lv 20]";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_04 };
}
if (typeof window !== "undefined") {
    window.CAP_04 = CAP_04;
}
