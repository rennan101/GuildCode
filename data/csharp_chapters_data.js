/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — C# & UNITY 6.5 CHAPTERS DATA (DIMENSÃO C# UNITY)
   38 Capítulos Oficiais estruturados de Game Development em C# e Unity 6.5.
   Mapeados 1:1 a partir de csharp/subjects.md (Módulos 1 a 9).
   Cada capítulo contém exatamente 5 atividades práticas completas (190 no total),
   com regras de anti-trapaça estruturais e descrições focadas em lógica.
   ═══════════════════════════════════════════════════════════════ */

const CSHARP_CHAPTERS = [
// ═══════════════════════════════════════════════════════
// CAPÍTULO 00 — VARIÁVEIS E TIPOS DE DADOS
// ═══════════════════════════════════════════════════════
{
    id: 0,
    title: "Variáveis e Tipos de Dados",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Console da Dimensão",
    unlockIcon: "[C#]",
    character: "arkan",
    xpReward: 70,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 1 — Fundamentos de C# — Assunto #1."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Variáveis e Tipos de Dados. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ARKAN VELOR",
                "role": "MESTRE DA GUILDA",
                "cssClass": "arkan",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Variáveis e Tipos de Dados</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "VARIÁVEIS E TIPOS DE DADOS",
        explanation: "Estudo aprofundado de Variáveis e Tipos de Dados no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        Debug.Log("Vida: " + vida);
    }
}`
    },
    example: {
        title: "Exemplo — Variáveis e Tipos de Dados",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        Debug.Log("Vida: " + vida);
    }
}`,
        output: "Vida: 100"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Variáveis e Tipos de Dados e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare int vida = 100;
        
        // 2. Emita no Console: Vida: 100
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Variáveis e Tipos de Dados:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare int vida = 100;
        
        // 2. Emita no Console: Vida: 100
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        Debug.Log("Vida: " + vida);
    }
}`,
                hint: "Vida: 100"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_0_1",
            title: "Primeiro Log de Vida",
            difficulty: "easy",
            description: "Declare no método Start uma variável inteira para armazenar a vida inicializada com 100 pontos. Em seguida, utilize Debug.Log para emitir no Console o texto de identificação concatenado com a vida.",
            validationRules: { requiredPatterns: ["int vida","vida","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare int vida = 100;
        
        // 2. Emita no Console: Vida: 100
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        Debug.Log("Vida: " + vida);
    }
}`,
            tests: [
                { input: "", expected: "Vida: 100", description: "Log de vida inicial" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int vida, vida" },
                { level: "II", text: "A saída no console deve conter exatamente: Vida: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int vida = 100;\n        Debug.Log(\"Vida: \" + vida);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int vida","vida","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vida: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_2",
            title: "Velocidade Flutuante",
            difficulty: "easy",
            description: "Configure o personagem declarando a variável string heroi com 'Kael' e a variável float velocidade com 7.5f (com sufixo f). Emita ambos em linhas separadas no Console.",
            validationRules: { requiredPatterns: ["float velocidade","7.5f","heroi","Kael"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare heroi e velocidade (7.5f)
        
        // Imprima os dois valores
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string heroi = "Kael";
        float velocidade = 7.5f;
        Debug.Log("Heroi: " + heroi);
        Debug.Log("Velocidade: " + velocidade);
    }
}`,
            tests: [
                { input: "", expected: "Heroi: Kael\nVelocidade: 7.5", description: "Logs com float e string" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float velocidade, 7.5f" },
                { level: "II", text: "A saída no console deve conter exatamente: Heroi: Kael" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string heroi = \"Kael\";\n        float velocidade = 7.5f;\n        Debug.Log(\"Heroi: \" + heroi);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float velocidade","7.5f","heroi","Kael"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Heroi: Kael";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_3",
            title: "Cálculo de Dano Total",
            difficulty: "medium",
            description: "Declare as variáveis inteiras danoBase valendo 40 e multiplicador valendo 2, além de um bônus flutuante bonus valendo 5.5f. Calcule o danoTotal com (danoBase * multiplicador) + bonus e exiba no Console.",
            validationRules: { requiredPatterns: ["danoBase","multiplicador","bonus","danoTotal","*"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare danoBase, multiplicador e bonus
        
        // Calcule danoTotal e imprima com Debug.Log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoBase = 40;
        int multiplicador = 2;
        float bonus = 5.5f;
        float danoTotal = (danoBase * multiplicador) + bonus;
        Debug.Log("Dano Total: " + danoTotal);
    }
}`,
            tests: [
                { input: "", expected: "Dano Total: 85.5", description: "Aritmética mista int e float" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: danoBase, multiplicador" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Total: 85.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoBase = 40;\n        int multiplicador = 2;\n        float bonus = 5.5f;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["danoBase","multiplicador","bonus","danoTotal","*"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Total: 85.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_4",
            title: "Prontidão Booleana",
            difficulty: "easy",
            description: "Declare a variável booleana estaPronto valendo true e a variável caractere simbolo valendo 'G'. Imprima o estado de prontidão e a classe no Console.",
            validationRules: { requiredPatterns: ["bool estaPronto","char simbolo","true","'G'"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare estaPronto e simbolo
        
        // Emita no Console
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaPronto = true;
        char simbolo = 'G';
        Debug.Log("Pronto: " + estaPronto + " | Classe: " + simbolo);
    }
}`,
            tests: [
                { input: "", expected: "Pronto: True | Classe: G", description: "Uso de bool e char" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaPronto, char simbolo" },
                { level: "II", text: "A saída no console deve conter exatamente: Pronto: True | Classe: G" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaPronto = true;\n        char simbolo = 'G';\n        Debug.Log(\"Pronto: \" + estaPronto + \" | Classe: \" + simbolo);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaPronto","char simbolo","true","'G'"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pronto: True | Classe: G";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_5",
            title: "Constante de Gravidade",
            difficulty: "medium",
            description: "Declare a constante flutuante GRAVIDADE valendo -10.0f e a variável inteira massa valendo 10. Calcule a força peso como massa * 10 e exiba a Gravidade e o Peso no Console.",
            validationRules: { requiredPatterns: ["const float GRAVIDADE","-10.0f","massa","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare a constante GRAVIDADE e massa
        
        // Calcule e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        const float GRAVIDADE = -10.0f;
        int massa = 10;
        float peso = massa * 10.0f;
        Debug.Log("Gravidade: " + GRAVIDADE + " | Peso: " + peso);
    }
}`,
            tests: [
                { input: "", expected: "Gravidade: -10 | Peso: 100", description: "Constantes e cálculo físico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: const float GRAVIDADE, -10.0f" },
                { level: "II", text: "A saída no console deve conter exatamente: Gravidade: -10 | Peso: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        const float GRAVIDADE = -10.0f;\n        int massa = 10;\n        float peso = massa * 10.0f;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["const float GRAVIDADE","-10.0f","massa","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Gravidade: -10 | Peso: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 01 — OPERADORES E EXPRESSÕES
// ═══════════════════════════════════════════════════════
{
    id: 1,
    title: "Operadores e Expressões",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Prisma Lógico",
    unlockIcon: "[OP]",
    character: "lyra",
    xpReward: 80,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 1 — Fundamentos de C# — Assunto #2."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Operadores e Expressões. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "LYRA NEX",
                "role": "ARQUIVISTA",
                "cssClass": "lyra",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Operadores e Expressões</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "OPERADORES E EXPRESSÕES",
        explanation: "Estudo aprofundado de Operadores e Expressões no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido;
        Debug.Log("Vida Restante: " + vida);
    }
}`
    },
    example: {
        title: "Exemplo — Operadores e Expressões",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido;
        Debug.Log("Vida Restante: " + vida);
    }
}`,
        output: "Vida Restante: 65"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Operadores e Expressões e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        // Aplique -= e exiba: Vida Restante: 65
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Operadores e Expressões:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        // Aplique -= e exiba: Vida Restante: 65
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido;
        Debug.Log("Vida Restante: " + vida);
    }
}`,
                hint: "Vida Restante: 65"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_1_1",
            title: "Dano Sofrido com Operador Composto",
            difficulty: "easy",
            description: "Declare a variável inteira vida com 100 pontos e danoSofrido com 35 pontos. Aplique o operador de subtração composta (-=) para atualizar a vida e exiba a Vida Restante no Console.",
            validationRules: { requiredPatterns: ["int vida","vida -=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        // Aplique -= e exiba: Vida Restante: 65
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido;
        Debug.Log("Vida Restante: " + vida);
    }
}`,
            tests: [
                { input: "", expected: "Vida Restante: 65", description: "Operador -=" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int vida, vida -=" },
                { level: "II", text: "A saída no console deve conter exatamente: Vida Restante: 65" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        vida -= danoSofrido;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int vida","vida -=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vida Restante: 65";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_2",
            title: "Média de Duas Notas",
            difficulty: "easy",
            description: "Calcule a média aritmética de duas partidas: declare as notas inteiras p1 com 8 e p2 com 6. Calcule a média flutuante dividindo a soma por 2.0f e imprima no Console.",
            validationRules: { requiredPatterns: ["p1","p2","media","/"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int p1 = 8;
        int p2 = 6;
        // Calcule a media flutuante e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int p1 = 8;
        int p2 = 6;
        float media = (p1 + p2) / 2.0f;
        Debug.Log("Media: " + media);
    }
}`,
            tests: [
                { input: "", expected: "Media: 7", description: "Cálculo de média" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: p1, p2" },
                { level: "II", text: "A saída no console deve conter exatamente: Media: 7" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        float media = (p1 + p2) / 2.0f;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["p1","p2","media","/"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Media: 7";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_3",
            title: "Controle de Turnos com Módulo (%)",
            difficulty: "medium",
            description: "Declare a variável inteira frameAtual com 17 e ciclo com 4. Calcule o resto frameAtual % ciclo e exiba o Índice do Ciclo no Console.",
            validationRules: { requiredPatterns: ["frameAtual","ciclo","%","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int frameAtual = 17;
        int ciclo = 4;
        // Calcule o resto e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int frameAtual = 17;
        int ciclo = 4;
        int indice = frameAtual % ciclo;
        Debug.Log("Indice do Ciclo: " + indice);
    }
}`,
            tests: [
                { input: "", expected: "Indice do Ciclo: 1", description: "Operador de resto" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: frameAtual, ciclo" },
                { level: "II", text: "A saída no console deve conter exatamente: Indice do Ciclo: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        int indice = frameAtual % ciclo;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["frameAtual","ciclo","%","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Indice do Ciclo: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_4",
            title: "Combinação Lógica com E (&&)",
            difficulty: "medium",
            description: "Declare o nível inteiro nivel com 15 e a booleana temChave com true. Crie a booleana podeAbrir avaliando se nivel >= 10 E temChave é verdadeiro, exibindo o status de Acesso Permitido.",
            validationRules: { requiredPatterns: ["nivel","temChave","&&","podeAbrir"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivel = 15;
        bool temChave = true;
        // Avalie com && e imprima: Acesso Permitido: True
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivel = 15;
        bool temChave = true;
        bool podeAbrir = nivel >= 10 && temChave;
        Debug.Log("Acesso Permitido: " + podeAbrir);
    }
}`,
            tests: [
                { input: "", expected: "Acesso Permitido: True", description: "Operador lógico &&" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: nivel, temChave" },
                { level: "II", text: "A saída no console deve conter exatamente: Acesso Permitido: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        bool podeAbrir = nivel >= 10 && temChave;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["nivel","temChave","&&","podeAbrir"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Acesso Permitido: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_5",
            title: "Negação Lógica com OU (||)",
            difficulty: "medium",
            description: "Declare a booleana temEscudo valendo false e estaInvisivel valendo true. Crie a booleana protegido avaliando se temEscudo OU estaInvisivel é verdadeiro, exibindo o status de Protegido.",
            validationRules: { requiredPatterns: ["temEscudo","estaInvisivel","||","protegido"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temEscudo = false;
        bool estaInvisivel = true;
        // Avalie com || e imprima: Protegido: True
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temEscudo = false;
        bool estaInvisivel = true;
        bool protegido = temEscudo || estaInvisivel;
        Debug.Log("Protegido: " + protegido);
    }
}`,
            tests: [
                { input: "", expected: "Protegido: True", description: "Operador lógico ||" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: temEscudo, estaInvisivel" },
                { level: "II", text: "A saída no console deve conter exatamente: Protegido: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        bool protegido = temEscudo || estaInvisivel;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["temEscudo","estaInvisivel","||","protegido"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Protegido: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 02 — CONDICIONAIS (IF, ELSE, SWITCH)
// ═══════════════════════════════════════════════════════
{
    id: 2,
    title: "Condicionais (if, else, switch)",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Bússola de Fluxo",
    unlockIcon: "[IF]",
    character: "arkan",
    xpReward: 90,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 1 — Fundamentos de C# — Assunto #3."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Condicionais (if, else, switch). Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ARKAN VELOR",
                "role": "MESTRE DA GUILDA",
                "cssClass": "arkan",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Condicionais (if, else, switch)</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "CONDICIONAIS (IF, ELSE, SWITCH)",
        explanation: "Estudo aprofundado de Condicionais (if, else, switch) no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

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
}`
    },
    example: {
        title: "Exemplo — Condicionais (if, else, switch)",
        code: `using UnityEngine;

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
        output: "Status: Game Over"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Condicionais (if, else, switch) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        // Cheque com if/else e exiba o status
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 03 — LOOPS (FOR, WHILE, FOREACH)
// ═══════════════════════════════════════════════════════
{
    id: 3,
    title: "Loops (for, while, foreach)",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Anel do Laço",
    unlockIcon: "[LOOP]",
    character: "elion",
    xpReward: 100,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 1 — Fundamentos de C# — Assunto #4."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Loops (for, while, foreach). Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ELION RAVEN",
                "role": "MESTRE ESCRIBA",
                "cssClass": "elion",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Loops (for, while, foreach)</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "LOOPS (FOR, WHILE, FOREACH)",
        explanation: "Estudo aprofundado de Loops (for, while, foreach) no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }
    }
}`
    },
    example: {
        title: "Exemplo — Loops (for, while, foreach)",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }
    }
}`,
        output: "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Loops (for, while, foreach) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Construa o laco for de 1 a 3
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Loops (for, while, foreach):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Construa o laco for de 1 a 3
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }
    }
}`,
                hint: "Inimigo #1 gerado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_3_1",
            title: "Spawn Sequencial com For",
            difficulty: "easy",
            description: "Dentro de Start, construa um laço for que itere de 1 até 3 emitindo as mensagens no Console com 'Inimigo #' + i + ' gerado'.",
            validationRules: { requiredPatterns: ["for","<=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Construa o laco for de 1 a 3
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado", description: "Laço for sequencial" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, <=" },
                { level: "II", text: "A saída no console deve conter exatamente: Inimigo #1 gerado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log(\"Inimigo #\" + i + \" gerado\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","<=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Inimigo #1 gerado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_2",
            title: "Contagem com While",
            difficulty: "easy",
            description: "Declare a variável inteira timer com 3. Crie um laço while que execute enquanto timer > 0, imprimindo 'T-' + timer e decrementando a cada passo.",
            validationRules: { requiredPatterns: ["int timer","while","timer > 0","timer--"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int timer = 3;
        // Faca o laco while regressivo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }
    }
}`,
            tests: [
                { input: "", expected: "T-3\nT-2\nT-1", description: "While regressivo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int timer, while" },
                { level: "II", text: "A saída no console deve conter exatamente: T-3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int timer = 3;\n        while (timer > 0)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int timer","while","timer > 0","timer--"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "T-3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_3",
            title: "Somatório de Pontos",
            difficulty: "medium",
            description: "Declare totalPontos inicializado com 0. Faça um for com i de 1 até 4 somando i * 10 a totalPontos e exiba no final 'Total Acumulado: ' + totalPontos.",
            validationRules: { requiredPatterns: ["totalPontos","for","+=","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalPontos = 0;
        // Some os pontos no laco e imprima o total
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalPontos = 0;
        for (int i = 1; i <= 4; i++)
        {
            totalPontos += i * 10;
        }
        Debug.Log("Total Acumulado: " + totalPontos);
    }
}`,
            tests: [
                { input: "", expected: "Total Acumulado: 100", description: "Somatório em loop" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: totalPontos, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Total Acumulado: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalPontos = 0;\n        for (int i = 1; i <= 4; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["totalPontos","for","+=","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total Acumulado: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_4",
            title: "Filtro de Pares com Continue",
            difficulty: "medium",
            description: "Faça um laço for de 1 até 5. Se o resto da divisão por 2 for diferente de zero (i % 2 != 0), use continue para ignorar. Imprima os números pares encontrados com 'Par: ' + i.",
            validationRules: { requiredPatterns: ["for","continue","%","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Itere de 1 a 5 usando continue para impares
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }
    }
}`,
            tests: [
                { input: "", expected: "Par: 2\nPar: 4", description: "Comando continue" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, continue" },
                { level: "II", text: "A saída no console deve conter exatamente: Par: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 5; i++)\n        {\n            if (i % 2 != 0) continue;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","continue","%","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Par: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_5",
            title: "Interrupção com Break",
            difficulty: "medium",
            description: "Simule a interrupção ao encontrar o alvo: itere de 1 até 10 com for. Quando i == 3, exiba 'Alvo Encontrado no passo 3' e execute break para interromper o laço.",
            validationRules: { requiredPatterns: ["for","break","i == 3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Procure o alvo no laco e interrompa com break
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`,
            tests: [
                { input: "", expected: "Alvo Encontrado no passo 3", description: "Comando break" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, break" },
                { level: "II", text: "A saída no console deve conter exatamente: Alvo Encontrado no passo 3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 1; i <= 10; i++)\n        {\n            if (i == 3)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","break","i == 3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alvo Encontrado no passo 3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 04 — FUNÇÕES E MÉTODOS
// ═══════════════════════════════════════════════════════
{
    id: 4,
    title: "Funções e Métodos",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Pergaminho de Métodos",
    unlockIcon: "[FN]",
    character: "lyra",
    xpReward: 110,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 1 — Fundamentos de C# — Assunto #5."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Funções e Métodos. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "LYRA NEX",
                "role": "ARQUIVISTA",
                "cssClass": "lyra",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Funções e Métodos</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "FUNÇÕES E MÉTODOS",
        explanation: "Estudo aprofundado de Funções e Métodos no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

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
}`
    },
    example: {
        title: "Exemplo — Funções e Métodos",
        code: `using UnityEngine;

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
        output: "Bem-vindo ao Unity 6.5"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Funções e Métodos e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Chame ExibirBoasVindas()
    }
    
    // Crie o metodo void ExibirBoasVindas
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 05 — ARRAYS E LISTAS
// ═══════════════════════════════════════════════════════
{
    id: 5,
    title: "Arrays e Listas",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Vetor de Armazenamento",
    unlockIcon: "[ARR]",
    character: "kael",
    xpReward: 120,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 1 — Fundamentos de C# — Assunto #6."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Arrays e Listas. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "KAEL DRAVEN",
                "role": "CAMPEÃO DE COMBATE",
                "cssClass": "kael",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Arrays e Listas</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "ARRAYS E LISTAS",
        explanation: "Estudo aprofundado de Arrays e Listas no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] itens = new string[] { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);
    }
}`
    },
    example: {
        title: "Exemplo — Arrays e Listas",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] itens = new string[] { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);
    }
}`,
        output: "Item Equipado: Espada"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Arrays e Listas e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array itens e exiba o primeiro item
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Arrays e Listas:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array itens e exiba o primeiro item
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] itens = new string[] { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);
    }
}`,
                hint: "Item Equipado: Espada"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_5_1",
            title: "Acesso a Elemento de Array",
            difficulty: "easy",
            description: "Declare um array de strings itens com três nomes: 'Espada', 'Escudo' e 'Pocao'. Acesse o primeiro item pelo índice 0 e exiba 'Item Equipado: ' + itens[0].",
            validationRules: { requiredPatterns: ["string[] itens","itens[0]","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array itens e exiba o primeiro item
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] itens = new string[] { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);
    }
}`,
            tests: [
                { input: "", expected: "Item Equipado: Espada", description: "Array index 0" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] itens, itens[0]" },
                { level: "II", text: "A saída no console deve conter exatamente: Item Equipado: Espada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] itens = new string[] { \"Espada\", \"Escudo\", \"Pocao\" };\n        Debug.Log(\"Item Equipado: \" + itens[0]);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] itens","itens[0]","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Item Equipado: Espada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_2",
            title: "Iteração em Array com Foreach",
            difficulty: "easy",
            description: "Declare um array de inteiros pontuacoes com os valores { 10, 20, 30 }. Use um laço for para iterar e exibir cada pontuação no formato 'Pontos: ' + valor.",
            validationRules: { requiredPatterns: ["int[] pontuacoes","for","pontuacoes.Length"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array e percorra exibindo cada ponto
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int[] pontuacoes = new int[] { 10, 20, 30 };
        for (int i = 0; i < pontuacoes.Length; i++)
        {
            Debug.Log("Pontos: " + pontuacoes[i]);
        }
    }
}`,
            tests: [
                { input: "", expected: "Pontos: 10\nPontos: 20\nPontos: 30", description: "Iteração em array" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int[] pontuacoes, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Pontos: 10" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int[] pontuacoes = new int[] { 10, 20, 30 };\n        for (int i = 0; i < pontuacoes.Length; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int[] pontuacoes","for","pontuacoes.Length"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pontos: 10";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_3",
            title: "Adicionando Elementos em List<T>",
            difficulty: "medium",
            description: "Instancie uma lista dinâmica List<string> inventario = new List<string>();. Adicione 'Elmo' e 'Bota' usando .Add(). Exiba a contagem final no Console com 'Total de Itens: ' + inventario.Count.",
            validationRules: { requiredPatterns: ["List<string> inventario",".Add(","inventario.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie a lista, adicione os itens e imprima o Count
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        List<string> inventario = new List<string>();
        inventario.Add("Elmo");
        inventario.Add("Bota");
        Debug.Log("Total de Itens: " + inventario.Count);
    }
}`,
            tests: [
                { input: "", expected: "Total de Itens: 2", description: "List.Add e List.Count" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: List<string> inventario, .Add(" },
                { level: "II", text: "A saída no console deve conter exatamente: Total de Itens: 2" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        List<string> inventario = new List<string>();\n        inventario.Add(\"Elmo\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["List<string> inventario",".Add(","inventario.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total de Itens: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_4",
            title: "Remoção de Item de Lista",
            difficulty: "medium",
            description: "Crie uma List<string> poderes com 'Fogo' e 'Gelo'. Remova 'Fogo' usando .Remove('Fogo'). Exiba no Console o poder restante na posição 0 com 'Poder Ativo: ' + poderes[0].",
            validationRules: { requiredPatterns: ["List<string> poderes",".Remove(","poderes[0]"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie a lista, remova 'Fogo' e imprima o item restante
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        List<string> poderes = new List<string>();
        poderes.Add("Fogo");
        poderes.Add("Gelo");
        poderes.Remove("Fogo");
        Debug.Log("Poder Ativo: " + poderes[0]);
    }
}`,
            tests: [
                { input: "", expected: "Poder Ativo: Gelo", description: "List.Remove" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: List<string> poderes, .Remove(" },
                { level: "II", text: "A saída no console deve conter exatamente: Poder Ativo: Gelo" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        List<string> poderes = new List<string>();\n        poderes.Add(\"Fogo\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["List<string> poderes",".Remove(","poderes[0]"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Poder Ativo: Gelo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_5",
            title: "Maior Valor em Array",
            difficulty: "medium",
            description: "Declare um array de inteiros valores com { 15, 82, 43 }. Determine o maior valor e exiba 'Maior: ' + maior. (Dica: compare com if em um laço).",
            validationRules: { requiredPatterns: ["int[] valores","for","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int[] valores = new int[] { 15, 82, 43 };
        // Encontre o maior valor e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int[] valores = new int[] { 15, 82, 43 };
        int maior = valores[0];
        for (int i = 1; i < valores.Length; i++)
        {
            if (valores[i] > maior) maior = valores[i];
        }
        Debug.Log("Maior: " + maior);
    }
}`,
            tests: [
                { input: "", expected: "Maior: 82", description: "Busca de maior em array" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int[] valores, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Maior: 82" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int[] valores = new int[] { 15, 82, 43 };\n        int maior = valores[0];\n        for (int i = 1; i < valores.Length; i++)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int[] valores","for","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Maior: 82";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 06 — CLASSES E OBJETOS (OOP)
// ═══════════════════════════════════════════════════════
{
    id: 6,
    title: "Classes e Objetos (OOP)",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Orbe Objeto",
    unlockIcon: "[OOP]",
    character: "mira",
    xpReward: 130,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 1 — Fundamentos de C# — Assunto #7."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Classes e Objetos (OOP). Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "MIRA SOLENN",
                "role": "CARTÓGRAFA DIMENSIONAL",
                "cssClass": "mira",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Classes e Objetos (OOP)</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "CLASSES E OBJETOS (OOP)",
        explanation: "Estudo aprofundado de Classes e Objetos (OOP) no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string itemNome = "Espada";
        int itemPoder = 45;
        Debug.Log("Item: " + itemNome + " | Poder: " + itemPoder);
    }
}`
    },
    example: {
        title: "Exemplo — Classes e Objetos (OOP)",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string itemNome = "Espada";
        int itemPoder = 45;
        Debug.Log("Item: " + itemNome + " | Poder: " + itemPoder);
    }
}`,
        output: "Item: Espada | Poder: 45"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Classes e Objetos (OOP) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o item e imprima seu status
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Classes e Objetos (OOP):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o item e imprima seu status
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string itemNome = "Espada";
        int itemPoder = 45;
        Debug.Log("Item: " + itemNome + " | Poder: " + itemPoder);
    }
}`,
                hint: "Item: Espada | Poder: 45"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_6_1",
            title: "Instanciação de Objeto Simples",
            difficulty: "easy",
            description: "Simule a criação de um item de inventário: crie um objeto com nome 'Espada' e poder 45. Emita no Console: 'Item: Espada | Poder: 45'.",
            validationRules: { requiredPatterns: ["string itemNome","int itemPoder","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o item e imprima seu status
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string itemNome = "Espada";
        int itemPoder = 45;
        Debug.Log("Item: " + itemNome + " | Poder: " + itemPoder);
    }
}`,
            tests: [
                { input: "", expected: "Item: Espada | Poder: 45", description: "Atributos de objeto" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string itemNome, int itemPoder" },
                { level: "II", text: "A saída no console deve conter exatamente: Item: Espada | Poder: 45" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string itemNome = \"Espada\";\n        int itemPoder = 45;\n        Debug.Log(\"Item: \" + itemNome + \" | Poder: \" + itemPoder);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string itemNome","int itemPoder","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Item: Espada | Poder: 45";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_2",
            title: "Método Construtor e Inicialização",
            difficulty: "easy",
            description: "Configure dois atributos de uma entidade: heroi 'Kael' e nivel 10. Emita no Console: 'Entidade: Kael | Nivel: 10'.",
            validationRules: { requiredPatterns: ["heroi","nivel","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Defina heroi e nivel e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string heroi = "Kael";
        int nivel = 10;
        Debug.Log("Entidade: " + heroi + " | Nivel: " + nivel);
    }
}`,
            tests: [
                { input: "", expected: "Entidade: Kael | Nivel: 10", description: "Inicialização de entidade" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: heroi, nivel" },
                { level: "II", text: "A saída no console deve conter exatamente: Entidade: Kael | Nivel: 10" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string heroi = \"Kael\";\n        int nivel = 10;\n        Debug.Log(\"Entidade: \" + heroi + \" | Nivel: \" + nivel);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["heroi","nivel","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Entidade: Kael | Nivel: 10";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_3",
            title: "Encapsulamento com Propriedades Get/Set",
            difficulty: "medium",
            description: "Simule a alteração de vida de uma entidade: inicie vidaMaxima com 100 e vidaAtual com 75. Emita no Console: 'Vida: 75/100'.",
            validationRules: { requiredPatterns: ["int vidaMaxima","int vidaAtual","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure vidaMaxima e vidaAtual
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vidaMaxima = 100;
        int vidaAtual = 75;
        Debug.Log("Vida: " + vidaAtual + "/" + vidaMaxima);
    }
}`,
            tests: [
                { input: "", expected: "Vida: 75/100", description: "Formatação de vida e teto máximo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int vidaMaxima, int vidaAtual" },
                { level: "II", text: "A saída no console deve conter exatamente: Vida: 75/100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int vidaMaxima = 100;\n        int vidaAtual = 75;\n        Debug.Log(\"Vida: \" + vidaAtual + \"/\" + vidaMaxima);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int vidaMaxima","int vidaAtual","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vida: 75/100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_4",
            title: "Método de Instância de Ataque",
            difficulty: "medium",
            description: "Invoque uma rotina de combate de objeto: calcule o danoCausado aplicando um danoBase de 30 multiplicado por forca de 2. Emita no Console: 'Ataque Desferido: 60'.",
            validationRules: { requiredPatterns: ["int danoBase","int forca","danoCausado","*"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule danoCausado e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoBase = 30;
        int forca = 2;
        int danoCausado = danoBase * forca;
        Debug.Log("Ataque Desferido: " + danoCausado);
    }
}`,
            tests: [
                { input: "", expected: "Ataque Desferido: 60", description: "Cálculo de método de ataque" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int danoBase, int forca" },
                { level: "II", text: "A saída no console deve conter exatamente: Ataque Desferido: 60" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoBase = 30;\n        int forca = 2;\n        int danoCausado = danoBase * forca;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int danoBase","int forca","danoCausado","*"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Ataque Desferido: 60";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_5",
            title: "Contagem de Instâncias",
            difficulty: "medium",
            description: "Simule o rastreamento de entidades ativas na cena: inicie totalInimigos com 0, incremente duas vezes e emita 'Inimigos Ativos: ' + totalInimigos.",
            validationRules: { requiredPatterns: ["totalInimigos","++","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalInimigos = 0;
        // Incremente duas vezes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalInimigos = 0;
        totalInimigos++;
        totalInimigos++;
        Debug.Log("Inimigos Ativos: " + totalInimigos);
    }
}`,
            tests: [
                { input: "", expected: "Inimigos Ativos: 2", description: "Incremento de instâncias" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: totalInimigos, ++" },
                { level: "II", text: "A saída no console deve conter exatamente: Inimigos Ativos: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalInimigos = 0;\n        totalInimigos++;\n        totalInimigos++;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["totalInimigos","++","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Inimigos Ativos: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 07 — HERANÇA E POLIMORFISMO
// ═══════════════════════════════════════════════════════
{
    id: 7,
    title: "Herança e Polimorfismo",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Selo Polimórfico",
    unlockIcon: "[POLY]",
    character: "arkan",
    xpReward: 140,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 1 — Fundamentos de C# — Assunto #8."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Herança e Polimorfismo. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ARKAN VELOR",
                "role": "MESTRE DA GUILDA",
                "cssClass": "arkan",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Herança e Polimorfismo</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "HERANÇA E POLIMORFISMO",
        explanation: "Estudo aprofundado de Herança e Polimorfismo no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");
    }
}`
    },
    example: {
        title: "Exemplo — Herança e Polimorfismo",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");
    }
}`,
        output: "Guerreiro atacando com Espada!"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Herança e Polimorfismo e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare classe e arma e emita o ataque
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Herança e Polimorfismo:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare classe e arma e emita o ataque
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");
    }
}`,
                hint: "Guerreiro atacando com Espada!"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_7_1",
            title: "Sobrescrita de Mensagem (Override)",
            difficulty: "easy",
            description: "Declare string classe = 'Guerreiro'; e string arma = 'Espada';. Simule a ação herdada emitida com Debug.Log(classe + ' atacando com ' + arma + '!');.",
            validationRules: { requiredPatterns: ["string classe","string arma","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare classe e arma e emita o ataque
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");
    }
}`,
            tests: [
                { input: "", expected: "Guerreiro atacando com Espada!", description: "Ação polimórfica" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string classe, string arma" },
                { level: "II", text: "A saída no console deve conter exatamente: Guerreiro atacando com Espada!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string classe = \"Guerreiro\";\n        string arma = \"Espada\";\n        Debug.Log(classe + \" atacando com \" + arma + \"!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string classe","string arma","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Guerreiro atacando com Espada!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_2",
            title: "Subclasse Mago com Habilidade Arcana",
            difficulty: "easy",
            description: "Declare tipoInimigo como 'Mago' e magia como 'Bola de Fogo'. Emita no Console: 'Mago conjurando Bola de Fogo!'.",
            validationRules: { requiredPatterns: ["tipoInimigo","magia","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure tipoInimigo e magia e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tipoInimigo = "Mago";
        string magia = "Bola de Fogo";
        Debug.Log(tipoInimigo + " conjurando " + magia + "!");
    }
}`,
            tests: [
                { input: "", expected: "Mago conjurando Bola de Fogo!", description: "Especialização de subclasse" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tipoInimigo, magia" },
                { level: "II", text: "A saída no console deve conter exatamente: Mago conjurando Bola de Fogo!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tipoInimigo = \"Mago\";\n        string magia = \"Bola de Fogo\";\n        Debug.Log(tipoInimigo + \" conjurando \" + magia + \"!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tipoInimigo","magia","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mago conjurando Bola de Fogo!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_3",
            title: "Chamada de Método Base",
            difficulty: "medium",
            description: "Declare string fase1 = 'Base: Inicializado'; e string fase2 = 'Derivado: Equipamento Carregado';. Emita ambas em linhas separadas no Console.",
            validationRules: { requiredPatterns: ["string fase1","string fase2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare fase1 e fase2 e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string fase1 = "Base: Inicializado";
        string fase2 = "Derivado: Equipamento Carregado";
        Debug.Log(fase1);
        Debug.Log(fase2);
    }
}`,
            tests: [
                { input: "", expected: "Base: Inicializado\nDerivado: Equipamento Carregado", description: "Sequência base e derivada" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string fase1, string fase2" },
                { level: "II", text: "A saída no console deve conter exatamente: Base: Inicializado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string fase1 = \"Base: Inicializado\";\n        string fase2 = \"Derivado: Equipamento Carregado\";\n        Debug.Log(fase1);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string fase1","string fase2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Base: Inicializado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_4",
            title: "Cálculo de Armadura Polimórfico",
            difficulty: "medium",
            description: "Declare o danoRecebido como 50 e a reducaoArmadura como 15. Calcule o danoReal subtraindo a redução do dano e emita 'Dano Sofrido: ' + danoReal.",
            validationRules: { requiredPatterns: ["danoRecebido","reducaoArmadura","danoReal","-"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o dano considerando a armadura
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoRecebido = 50;
        int reducaoArmadura = 15;
        int danoReal = danoRecebido - reducaoArmadura;
        Debug.Log("Dano Sofrido: " + danoReal);
    }
}`,
            tests: [
                { input: "", expected: "Dano Sofrido: 35", description: "Redução de dano por armadura" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: danoRecebido, reducaoArmadura" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Sofrido: 35" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoRecebido = 50;\n        int reducaoArmadura = 15;\n        int danoReal = danoRecebido - reducaoArmadura;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["danoRecebido","reducaoArmadura","danoReal","-"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Sofrido: 35";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_5",
            title: "Lista Polimórfica de Ações",
            difficulty: "medium",
            description: "Crie um array com duas ações de combate: 'Arqueiro Dispara' e 'Guerreiro Golpeia'. Itere pelo array exibindo cada ação no Console.",
            validationRules: { requiredPatterns: ["string[] acoes","for","acoes.Length"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Percorra o array de acoes
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] acoes = new string[] { "Arqueiro Dispara", "Guerreiro Golpeia" };
        for (int i = 0; i < acoes.Length; i++)
        {
            Debug.Log("Acao: " + acoes[i]);
        }
    }
}`,
            tests: [
                { input: "", expected: "Acao: Arqueiro Dispara\nAcao: Guerreiro Golpeia", description: "Lista de ações polimórficas" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] acoes, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Acao: Arqueiro Dispara" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] acoes = new string[] { \"Arqueiro Dispara\", \"Guerreiro Golpeia\" };\n        for (int i = 0; i < acoes.Length; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] acoes","for","acoes.Length"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Acao: Arqueiro Dispara";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 08 — GAMEOBJECTS E COMPONENTS
// ═══════════════════════════════════════════════════════
{
    id: 8,
    title: "GameObjects e Components",
    theme: "Módulo 2 — Fundamentos do Unity",
    unlock: "GameObject Rúnico",
    unlockIcon: "[GO]",
    character: "orin",
    xpReward: 150,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 2 — Fundamentos do Unity — Assunto #9."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de GameObjects e Components. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ORIN VALE",
                "role": "ARTÍFICE DE CENÁRIOS",
                "cssClass": "orin",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>GameObjects e Components</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "GAMEOBJECTS E COMPONENTS",
        explanation: "Estudo aprofundado de GameObjects e Components no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: " + gameObject.name);
    }
}`
    },
    example: {
        title: "Exemplo — GameObjects e Components",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: " + gameObject.name);
    }
}`,
        output: "GameObject: Jogador"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de GameObjects e Components e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o nome do GameObject
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de GameObjects e Components:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o nome do GameObject
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: " + gameObject.name);
    }
}`,
                hint: "GameObject: Jogador"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_8_1",
            title: "Identificação de GameObject",
            difficulty: "easy",
            description: "Obtenha o nome do GameObject atual acessando a propriedade gameObject.name. Emita no Console: 'GameObject: Jogador'.",
            validationRules: { requiredPatterns: ["gameObject.name","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o nome do GameObject
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: " + gameObject.name);
    }
}`,
            tests: [
                { input: "", expected: "GameObject: Jogador", description: "Acesso a gameObject.name" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: gameObject.name, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: GameObject: Jogador" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"GameObject: \" + gameObject.name);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["gameObject.name","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "GameObject: Jogador";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_2",
            title: "Verificação de Tag",
            difficulty: "easy",
            description: "Defina a variável string tag = 'Player';. Verifique com if se a tag é igual a 'Player' e emita 'Tag Valida: Player'.",
            validationRules: { requiredPatterns: ["tag","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tag = "Player";
        // Cheque a tag e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tag = "Player";
        if (tag == "Player")
        {
            Debug.Log("Tag Valida: " + tag);
        }
    }
}`,
            tests: [
                { input: "", expected: "Tag Valida: Player", description: "Checagem de tag" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tag, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Tag Valida: Player" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tag = \"Player\";\n        if (tag == \"Player\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tag","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Tag Valida: Player";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_3",
            title: "Simulação de GetComponent",
            difficulty: "medium",
            description: "Simule a busca de um componente Rigidbody: declare bool temRigidbody = true;. Se for verdadeiro, emita 'Componente Rigidbody Encontrado'.",
            validationRules: { requiredPatterns: ["bool temRigidbody","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temRigidbody = true;
        // Cheque e emita a mensagem
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temRigidbody = true;
        if (temRigidbody)
        {
            Debug.Log("Componente Rigidbody Encontrado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Componente Rigidbody Encontrado", description: "Verificação de componente" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool temRigidbody, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Componente Rigidbody Encontrado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool temRigidbody = true;\n        if (temRigidbody)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool temRigidbody","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Componente Rigidbody Encontrado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_4",
            title: "Estado Ativo de GameObject",
            difficulty: "medium",
            description: "Declare a variável booleana estaAtivo = true;. Emita no Console: 'GameObject Ativo: True'.",
            validationRules: { requiredPatterns: ["bool estaAtivo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare estaAtivo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaAtivo = true;
        Debug.Log("GameObject Ativo: " + estaAtivo);
    }
}`,
            tests: [
                { input: "", expected: "GameObject Ativo: True", description: "Estado de ativação" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaAtivo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: GameObject Ativo: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaAtivo = true;\n        Debug.Log(\"GameObject Ativo: \" + estaAtivo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaAtivo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "GameObject Ativo: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_5",
            title: "Contagem de Componentes",
            difficulty: "medium",
            description: "Declare um array com os componentes do Player: 'Transform', 'MeshRenderer', 'Collider'. Exiba no Console: 'Total de Componentes: ' + componentes.Length.",
            validationRules: { requiredPatterns: ["string[] componentes","componentes.Length","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o array de componentes e exiba o Length
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] componentes = new string[] { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + componentes.Length);
    }
}`,
            tests: [
                { input: "", expected: "Total de Componentes: 3", description: "Contagem de componentes" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] componentes, componentes.Length" },
                { level: "II", text: "A saída no console deve conter exatamente: Total de Componentes: 3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] componentes = new string[] { \"Transform\", \"MeshRenderer\", \"Collider\" };\n        Debug.Log(\"Total de Componentes: \" + componentes.Length);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] componentes","componentes.Length","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total de Componentes: 3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 09 — TRANSFORM — POSIÇÃO, ROTAÇÃO E ESCALA
// ═══════════════════════════════════════════════════════
{
    id: 9,
    title: "Transform — Posição, Rotação e Escala",
    theme: "Módulo 2 — Fundamentos do Unity",
    unlock: "Giz Espacial Transform",
    unlockIcon: "[TR]",
    character: "lyra",
    xpReward: 160,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 2 — Fundamentos do Unity — Assunto #10."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Transform — Posição, Rotação e Escala. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "LYRA NEX",
                "role": "ARQUIVISTA",
                "cssClass": "lyra",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Transform — Posição, Rotação e Escala</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "TRANSFORM — POSIÇÃO, ROTAÇÃO E ESCALA",
        explanation: "Estudo aprofundado de Transform — Posição, Rotação e Escala no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);
    }
}`
    },
    example: {
        title: "Exemplo — Transform — Posição, Rotação e Escala",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);
    }
}`,
        output: "Posicao X: 0"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Transform — Posição, Rotação e Escala e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada X da posicao
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Transform — Posição, Rotação e Escala:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada X da posicao
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);
    }
}`,
                hint: "Posicao X: 0"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_9_1",
            title: "Leitura de Posição Inicial",
            difficulty: "easy",
            description: "Acesse as coordenadas de posição inicial do transform e emita no Console: 'Posicao X: ' + transform.position.x.",
            validationRules: { requiredPatterns: ["transform.position.x","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada X da posicao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);
    }
}`,
            tests: [
                { input: "", expected: "Posicao X: 0", description: "Acesso a transform.position.x" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: transform.position.x, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Posicao X: 0" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"Posicao X: \" + transform.position.x);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["transform.position.x","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Posicao X: 0";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_2",
            title: "Deslocamento com Translate",
            difficulty: "easy",
            description: "Simule um deslocamento: declare float vel = 5.0f e float dt = 0.016f. Calcule o deslocamento como vel * dt e emita 'Deslocamento: ' + deslocamento.",
            validationRules: { requiredPatterns: ["float vel","float dt","vel * dt","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float vel = 5.0f;
        float dt = 0.016f;
        // Calcule o deslocamento e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);
    }
}`,
            tests: [
                { input: "", expected: "Deslocamento: 0.08", description: "Cálculo de Translate" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float vel, float dt" },
                { level: "II", text: "A saída no console deve conter exatamente: Deslocamento: 0.08" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float vel = 5.0f;\n        float dt = 0.016f;\n        float deslocamento = vel * dt;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float vel","float dt","vel * dt","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Deslocamento: 0.08";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_3",
            title: "Ajuste de Escala Local",
            difficulty: "medium",
            description: "Simule a alteração da escala de um objeto: defina escalaX = 2.0f e escalaY = 2.0f. Emita no Console: 'Nova Escala: (2, 2)'.",
            validationRules: { requiredPatterns: ["float escalaX","float escalaY","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure as escalas e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float escalaX = 2.0f;
        float escalaY = 2.0f;
        Debug.Log("Nova Escala: (" + escalaX + ", " + escalaY + ")");
    }
}`,
            tests: [
                { input: "", expected: "Nova Escala: (2, 2)", description: "Escala local" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float escalaX, float escalaY" },
                { level: "II", text: "A saída no console deve conter exatamente: Nova Escala: (2, 2)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float escalaX = 2.0f;\n        float escalaY = 2.0f;\n        Debug.Log(\"Nova Escala: (\" + escalaX + \", \" + escalaY + \")\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float escalaX","float escalaY","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Nova Escala: (2, 2)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_4",
            title: "Rotação em Torno do Eixo Y",
            difficulty: "medium",
            description: "Declare a velocidade de giro float velRotacao = 90.0f;. Emita no Console: 'Rotacao Y: ' + velRotacao + ' graus/s'.",
            validationRules: { requiredPatterns: ["float velRotacao","velRotacao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare velRotacao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float velRotacao = 90.0f;
        Debug.Log("Rotacao Y: " + velRotacao + " graus/s");
    }
}`,
            tests: [
                { input: "", expected: "Rotacao Y: 90 graus/s", description: "Velocidade angular de rotação" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float velRotacao, velRotacao" },
                { level: "II", text: "A saída no console deve conter exatamente: Rotacao Y: 90 graus/s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float velRotacao = 90.0f;\n        Debug.Log(\"Rotacao Y: \" + velRotacao + \" graus/s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float velRotacao","velRotacao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Rotacao Y: 90 graus/s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_9_5",
            title: "Vetor Forward de Direção",
            difficulty: "medium",
            description: "Obtenha a coordenada z do vetor direcional transform.forward. Emita no Console: 'Direcao Z: ' + transform.forward.z.",
            validationRules: { requiredPatterns: ["transform.forward.z","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba o forward z
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Direcao Z: " + transform.forward.z);
    }
}`,
            tests: [
                { input: "", expected: "Direcao Z: 1", description: "Transform forward direction" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: transform.forward.z, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Direcao Z: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"Direcao Z: \" + transform.forward.z);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["transform.forward.z","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Direcao Z: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 10 — CICLO DE VIDA DO MONOBEHAVIOUR
// ═══════════════════════════════════════════════════════
{
    id: 10,
    title: "Ciclo de Vida do MonoBehaviour",
    theme: "Módulo 2 — Fundamentos do Unity",
    unlock: "Ampulheta Update",
    unlockIcon: "[CYCLE]",
    character: "arkan",
    xpReward: 170,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 2 — Fundamentos do Unity — Assunto #11."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Ciclo de Vida do MonoBehaviour. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ARKAN VELOR",
                "role": "MESTRE DA GUILDA",
                "cssClass": "arkan",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Ciclo de Vida do MonoBehaviour</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "CICLO DE VIDA DO MONOBEHAVIOUR",
        explanation: "Estudo aprofundado de Ciclo de Vida do MonoBehaviour no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");
    }
}`
    },
    example: {
        title: "Exemplo — Ciclo de Vida do MonoBehaviour",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");
    }
}`,
        output: "1. Awake\n2. Start"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Ciclo de Vida do MonoBehaviour e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    // Defina Awake e Start
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Ciclo de Vida do MonoBehaviour:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    // Defina Awake e Start
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");
    }
}`,
                hint: "1. Awake"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_10_1",
            title: "Ordem de Inicialização (Awake & Start)",
            difficulty: "easy",
            description: "Implemente os métodos Awake() e Start() no script. Em Awake, emita '1. Awake' e em Start emita '2. Start'.",
            validationRules: { requiredPatterns: ["void Awake()","void Start()","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    // Defina Awake e Start
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");
    }
}`,
            tests: [
                { input: "", expected: "1. Awake\n2. Start", description: "Awake antes de Start" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: void Awake(), void Start()" },
                { level: "II", text: "A saída no console deve conter exatamente: 1. Awake" },
                { level: "III", text: "Exemplo estrutural:\n    void Awake()\n    {\n        Debug.Log(\"1. Awake\");\n    }\n" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["void Awake()","void Start()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "1. Awake";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_2",
            title: "Simulação de Atualização de Quadro (Update)",
            difficulty: "easy",
            description: "Declare int fps = 60;. Dentro de Start(), emita no Console: 'Update Ativo: ' + fps + ' FPS'.",
            validationRules: { requiredPatterns: ["int fps","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare int fps = 60 e imprima com Debug.Log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");
    }
}`,
            tests: [
                { input: "", expected: "Update Ativo: 60 FPS", description: "Frequência de Update" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int fps, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Update Ativo: 60 FPS" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int fps = 60;\n        Debug.Log(\"Update Ativo: \" + fps + \" FPS\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int fps","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Update Ativo: 60 FPS";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_3",
            title: "Física Síncrona com FixedUpdate",
            difficulty: "medium",
            description: "Declare float fixedDeltaTime = 0.02f;. Emita no Console em Start o intervalo de física padrão do Unity: 'FixedUpdate Intervalo: ' + fixedDeltaTime + 's'.",
            validationRules: { requiredPatterns: ["float fixedDeltaTime","0.02f","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare fixedDeltaTime e emita o intervalo de física
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float fixedDeltaTime = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDeltaTime + "s");
    }
}`,
            tests: [
                { input: "", expected: "FixedUpdate Intervalo: 0.02s", description: "Frequência fixa de física" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float fixedDeltaTime, 0.02f" },
                { level: "II", text: "A saída no console deve conter exatamente: FixedUpdate Intervalo: 0.02s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float fixedDeltaTime = 0.02f;\n        Debug.Log(\"FixedUpdate Intervalo: \" + fixedDeltaTime + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float fixedDeltaTime","0.02f","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "FixedUpdate Intervalo: 0.02s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_4",
            title: "Ajuste de Câmera em LateUpdate",
            difficulty: "medium",
            description: "Declare string faseCamera = 'LateUpdate: Posicionando Camera';. Emita no Console o valor de faseCamera com Debug.Log.",
            validationRules: { requiredPatterns: ["string faseCamera","faseCamera","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare faseCamera e emita o log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string faseCamera = "LateUpdate: Posicionando Camera";
        Debug.Log(faseCamera);
    }
}`,
            tests: [
                { input: "", expected: "LateUpdate: Posicionando Camera", description: "LateUpdate pós-movimento" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string faseCamera, faseCamera" },
                { level: "II", text: "A saída no console deve conter exatamente: LateUpdate: Posicionando Camera" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string faseCamera = \"LateUpdate: Posicionando Camera\";\n        Debug.Log(faseCamera);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string faseCamera","faseCamera","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "LateUpdate: Posicionando Camera";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_10_5",
            title: "Limpeza de Recursos em OnDestroy",
            difficulty: "medium",
            description: "Declare string statusDestruicao = 'OnDestroy: Recursos Liberados';. Emita a mensagem com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusDestruicao","statusDestruicao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusDestruicao e emita o log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusDestruicao = "OnDestroy: Recursos Liberados";
        Debug.Log(statusDestruicao);
    }
}`,
            tests: [
                { input: "", expected: "OnDestroy: Recursos Liberados", description: "Ciclo OnDestroy" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusDestruicao, statusDestruicao" },
                { level: "II", text: "A saída no console deve conter exatamente: OnDestroy: Recursos Liberados" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusDestruicao = \"OnDestroy: Recursos Liberados\";\n        Debug.Log(statusDestruicao);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusDestruicao","statusDestruicao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "OnDestroy: Recursos Liberados";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 11 — INPUT SYSTEM MODERNO
// ═══════════════════════════════════════════════════════
{
    id: 11,
    title: "Input System Moderno",
    theme: "Módulo 3 — Input System Moderno",
    unlock: "Manopla Input",
    unlockIcon: "[IN]",
    character: "elion",
    xpReward: 180,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 3 — Input System Moderno — Assunto #12."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Input System Moderno. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ELION RAVEN",
                "role": "MESTRE ESCRIBA",
                "cssClass": "elion",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Input System Moderno</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "INPUT SYSTEM MODERNO",
        explanation: "Estudo aprofundado de Input System Moderno no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Keyboard.current.spaceKey.wasPressedThisFrame)
        {
            Debug.Log("Pulo Acionado!");
        }
    }
}`
    },
    example: {
        title: "Exemplo — Input System Moderno",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Keyboard.current.spaceKey.wasPressedThisFrame)
        {
            Debug.Log("Pulo Acionado!");
        }
    }
}`,
        output: "Pulo Acionado!"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Input System Moderno e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Verifique o pulo no Keyboard.current
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Input System Moderno:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Verifique o pulo no Keyboard.current
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Keyboard.current.spaceKey.wasPressedThisFrame)
        {
            Debug.Log("Pulo Acionado!");
        }
    }
}`,
                hint: "Pulo Acionado!"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_11_1",
            title: "Detecção de Tecla com Keyboard.current",
            difficulty: "easy",
            description: "Verifique o pressionamento da barra de espaço: avalie Keyboard.current.spaceKey.wasPressedThisFrame. Se for verdadeiro, emita 'Pulo Acionado!'.",
            validationRules: { requiredPatterns: ["Keyboard.current","spaceKey","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Verifique o pulo no Keyboard.current
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Keyboard.current.spaceKey.wasPressedThisFrame)
        {
            Debug.Log("Pulo Acionado!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Pulo Acionado!", description: "Detecção de spaceKey" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Keyboard.current, spaceKey" },
                { level: "II", text: "A saída no console deve conter exatamente: Pulo Acionado!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        if (Keyboard.current.spaceKey.wasPressedThisFrame)\n        {\n            Debug.Log(\"Pulo Acionado!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Keyboard.current","spaceKey","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pulo Acionado!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_11_2",
            title: "Leitura Contínua de Tecla de Movimento",
            difficulty: "easy",
            description: "Verifique se a tecla W está sendo mantida pressionada usando Keyboard.current.wKey.isPressed. Se sim, emita 'Acelerando para Frente'.",
            validationRules: { requiredPatterns: ["Keyboard.current.wKey.isPressed","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque wKey.isPressed
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Keyboard.current.wKey.isPressed)
        {
            Debug.Log("Acelerando para Frente");
        }
    }
}`,
            tests: [
                { input: "", expected: "Acelerando para Frente", description: "isPressed contínuo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Keyboard.current.wKey.isPressed, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Acelerando para Frente" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        if (Keyboard.current.wKey.isPressed)\n        {\n            Debug.Log(\"Acelerando para Frente\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Keyboard.current.wKey.isPressed","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Acelerando para Frente";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_11_3",
            title: "Clique do Botão Esquerdo do Mouse",
            difficulty: "medium",
            description: "Cheque o clique do botão esquerdo do mouse através de Mouse.current.leftButton.wasPressedThisFrame. Se verdadeiro, emita 'Disparo Efetuado!'.",
            validationRules: { requiredPatterns: ["Mouse.current.leftButton","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque o botao esquerdo do mouse
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        if (Mouse.current.leftButton.wasPressedThisFrame)
        {
            Debug.Log("Disparo Efetuado!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Disparo Efetuado!", description: "Clique de mouse" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Mouse.current.leftButton, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Disparo Efetuado!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        if (Mouse.current.leftButton.wasPressedThisFrame)\n        {\n            Debug.Log(\"Disparo Efetuado!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Mouse.current.leftButton","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Disparo Efetuado!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_11_4",
            title: "Leitura da Posição do Mouse",
            difficulty: "medium",
            description: "Obtenha a coordenada X do ponteiro do mouse chamando Mouse.current.position.ReadValue().x. Emita no Console: 'Mouse X: ' + mouseX.",
            validationRules: { requiredPatterns: ["Mouse.current.position.ReadValue()","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Leia a posicao do mouse e imprima X
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int mouseX = Mouse.current.position.ReadValue().x;
        Debug.Log("Mouse X: " + mouseX);
    }
}`,
            tests: [
                { input: "", expected: "Mouse X: 100", description: "Posição do cursor" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Mouse.current.position.ReadValue(), Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Mouse X: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int mouseX = Mouse.current.position.ReadValue().x;\n        Debug.Log(\"Mouse X: \" + mouseX);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Mouse.current.position.ReadValue()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mouse X: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_11_5",
            title: "Suporte Multi-Dispositivo",
            difficulty: "medium",
            description: "Simule a verificação de dispositivo conectado: declare bool tecladoConectado = true; e bool gamepadConectado = false;. Emita 'Dispositivo Principal: Teclado'.",
            validationRules: { requiredPatterns: ["bool tecladoConectado","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os dispositivos e emita o ativo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool tecladoConectado = true;
        if (tecladoConectado)
        {
            Debug.Log("Dispositivo Principal: Teclado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Dispositivo Principal: Teclado", description: "Detecção de dispositivo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool tecladoConectado, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Dispositivo Principal: Teclado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool tecladoConectado = true;\n        if (tecladoConectado)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool tecladoConectado","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dispositivo Principal: Teclado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 12 — INPUT ACTIONS & MAPEAMENTO
// ═══════════════════════════════════════════════════════
{
    id: 12,
    title: "Input Actions & Mapeamento",
    theme: "Módulo 3 — Input System Moderno",
    unlock: "Mapa de Ações",
    unlockIcon: "[MAP]",
    character: "mira",
    xpReward: 190,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 3 — Input System Moderno — Assunto #13."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Input Actions & Mapeamento. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "MIRA SOLENN",
                "role": "CARTÓGRAFA DIMENSIONAL",
                "cssClass": "mira",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Input Actions & Mapeamento</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "INPUT ACTIONS & MAPEAMENTO",
        explanation: "Estudo aprofundado de Input Actions & Mapeamento no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acaoDisparada = true;
        if (acaoDisparada)
        {
            Debug.Log("InputAction: Pulo Registrado");
        }
    }
}`
    },
    example: {
        title: "Exemplo — Input Actions & Mapeamento",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acaoDisparada = true;
        if (acaoDisparada)
        {
            Debug.Log("InputAction: Pulo Registrado");
        }
    }
}`,
        output: "InputAction: Pulo Registrado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Input Actions & Mapeamento e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a acao de pulo
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Input Actions & Mapeamento:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a acao de pulo
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acaoDisparada = true;
        if (acaoDisparada)
        {
            Debug.Log("InputAction: Pulo Registrado");
        }
    }
}`,
                hint: "InputAction: Pulo Registrado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_12_1",
            title: "Mapeamento de Ação de Pulo",
            difficulty: "easy",
            description: "Simule a leitura de uma InputAction chamada 'Pular': declare bool acaoDisparada = true;. Se for verdadeira, emita 'InputAction: Pulo Registrado'.",
            validationRules: { requiredPatterns: ["bool acaoDisparada","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a acao de pulo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acaoDisparada = true;
        if (acaoDisparada)
        {
            Debug.Log("InputAction: Pulo Registrado");
        }
    }
}`,
            tests: [
                { input: "", expected: "InputAction: Pulo Registrado", description: "Trigger de InputAction" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool acaoDisparada, if" },
                { level: "II", text: "A saída no console deve conter exatamente: InputAction: Pulo Registrado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool acaoDisparada = true;\n        if (acaoDisparada)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool acaoDisparada","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "InputAction: Pulo Registrado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_12_2",
            title: "Leitura de Vetor de Movimento 2D",
            difficulty: "easy",
            description: "Simule o valor de um joystick ou WASD: declare float horizontal = 1.0f e float vertical = 0.0f. Emita no Console: 'Movimento: (1, 0)'.",
            validationRules: { requiredPatterns: ["float horizontal","float vertical","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure horizontal e vertical e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float horizontal = 1.0f;
        float vertical = 0.0f;
        Debug.Log("Movimento: (" + horizontal + ", " + vertical + ")");
    }
}`,
            tests: [
                { input: "", expected: "Movimento: (1, 0)", description: "Eixo 2D composto" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float horizontal, float vertical" },
                { level: "II", text: "A saída no console deve conter exatamente: Movimento: (1, 0)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float horizontal = 1.0f;\n        float vertical = 0.0f;\n        Debug.Log(\"Movimento: (\" + horizontal + \", \" + vertical + \")\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float horizontal","float vertical","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Movimento: (1, 0)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_12_3",
            title: "Ação de Interação com Objeto",
            difficulty: "medium",
            description: "Declare a string botaoInteragir = 'E' e a distância float dist = 1.5f. Se dist <= 2.0f, emita 'Pressione [' + botaoInteragir + '] para Interagir'.",
            validationRules: { requiredPatterns: ["botaoInteragir","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide a distancia e emita o prompt
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string botaoInteragir = "E";
        float dist = 1.5f;
        if (dist <= 2.0f)
        {
            Debug.Log("Pressione [" + botaoInteragir + "] para Interagir");
        }
    }
}`,
            tests: [
                { input: "", expected: "Pressione [E] para Interagir", description: "Prompt de interação" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: botaoInteragir, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Pressione [E] para Interagir" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string botaoInteragir = \"E\";\n        float dist = 1.5f;\n        if (dist <= 2.0f)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["botaoInteragir","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pressione [E] para Interagir";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_12_4",
            title: "Habilitação de Mapa de Ações",
            difficulty: "medium",
            description: "Simule a ativação do Action Map 'Gameplay': declare string mapaAtivo = 'Gameplay';. Emita no Console: 'Mapa Ativado: Gameplay'.",
            validationRules: { requiredPatterns: ["string mapaAtivo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Ative o mapa e emita no Console
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string mapaAtivo = "Gameplay";
        Debug.Log("Mapa Ativado: " + mapaAtivo);
    }
}`,
            tests: [
                { input: "", expected: "Mapa Ativado: Gameplay", description: "Ativação de ActionMap" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string mapaAtivo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Mapa Ativado: Gameplay" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string mapaAtivo = \"Gameplay\";\n        Debug.Log(\"Mapa Ativado: \" + mapaAtivo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string mapaAtivo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mapa Ativado: Gameplay";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_12_5",
            title: "Troca Dinâmica para Mapa UI",
            difficulty: "medium",
            description: "Quando o jogo é pausado, o mapa muda para UI: declare bool pausado = true. Se pausado, defina mapa = 'UI' e emita 'Contexto Atual: UI'.",
            validationRules: { requiredPatterns: ["bool pausado","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Troque o contexto para UI se pausado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool pausado = true;
        if (pausado)
        {
            string mapa = "UI";
            Debug.Log("Contexto Atual: " + mapa);
        }
    }
}`,
            tests: [
                { input: "", expected: "Contexto Atual: UI", description: "Alternância de contexto de input" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool pausado, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Contexto Atual: UI" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool pausado = true;\n        if (pausado)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool pausado","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Contexto Atual: UI";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 13 — SISTEMAS DE COORDENADAS 3D
// ═══════════════════════════════════════════════════════
{
    id: 13,
    title: "Sistemas de Coordenadas 3D",
    theme: "Módulo 4 — Matemática 3D",
    unlock: "Eixo Tridimensional",
    unlockIcon: "[3D]",
    character: "orin",
    xpReward: 200,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 4 — Matemática 3D — Assunto #14."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Sistemas de Coordenadas 3D. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ORIN VALE",
                "role": "ARTÍFICE DE CENÁRIOS",
                "cssClass": "orin",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Sistemas de Coordenadas 3D</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "SISTEMAS DE COORDENADAS 3D",
        explanation: "Estudo aprofundado de Sistemas de Coordenadas 3D no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);
    }
}`
    },
    example: {
        title: "Exemplo — Sistemas de Coordenadas 3D",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);
    }
}`,
        output: "Coord X: 2"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Sistemas de Coordenadas 3D e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare pos e emita Coord X
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Sistemas de Coordenadas 3D:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare pos e emita Coord X
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);
    }
}`,
                hint: "Coord X: 2"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_13_1",
            title: "Ponto no Espaço Tridimensional",
            difficulty: "easy",
            description: "Declare um Vector3 pos = new Vector3(2, 5, 8);. Imprima no Console a coordenada X com 'Coord X: ' + pos.x.",
            validationRules: { requiredPatterns: ["Vector3","pos.x","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare pos e emita Coord X
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);
    }
}`,
            tests: [
                { input: "", expected: "Coord X: 2", description: "Coordenada X em Vector3" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3, pos.x" },
                { level: "II", text: "A saída no console deve conter exatamente: Coord X: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 pos = new Vector3(2, 5, 8);\n        Debug.Log(\"Coord X: \" + pos.x);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3","pos.x","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Coord X: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_2",
            title: "Origem do Espaço Mundial (Vector3.zero)",
            difficulty: "easy",
            description: "Obtenha a coordenada Y do vetor central Vector3.zero. Emita no Console: 'Origem Y: ' + Vector3.zero.y.",
            validationRules: { requiredPatterns: ["Vector3.zero","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Exiba a coordenada Y de Vector3.zero
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Origem Y: " + Vector3.zero.y);
    }
}`,
            tests: [
                { input: "", expected: "Origem Y: 0", description: "Acesso a Vector3.zero" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.zero, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Origem Y: 0" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Debug.Log(\"Origem Y: \" + Vector3.zero.y);\n    }\n}" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.zero","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Origem Y: 0";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_3",
            title: "Conversão de Espaço Local para Global",
            difficulty: "medium",
            description: "Simule a translação de uma coordenada local para mundial somando um deslocamento: posMundial = posPai + offset. Com pai em 10 e offset em 3, emita 'Posicao Mundial: 13'.",
            validationRules: { requiredPatterns: ["int posPai","int offset","posMundial","+"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule e imprima posMundial
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int posPai = 10;
        int offset = 3;
        int posMundial = posPai + offset;
        Debug.Log("Posicao Mundial: " + posMundial);
    }
}`,
            tests: [
                { input: "", expected: "Posicao Mundial: 13", description: "Soma de espaço local" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int posPai, int offset" },
                { level: "II", text: "A saída no console deve conter exatamente: Posicao Mundial: 13" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int posPai = 10;\n        int offset = 3;\n        int posMundial = posPai + offset;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int posPai","int offset","posMundial","+"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Posicao Mundial: 13";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_4",
            title: "Identificação dos Três Eixos",
            difficulty: "medium",
            description: "Declare Vector3 eixos = new Vector3(1, 0, 0);. Se eixos.x == 1, emita 'Eixo Selecionado: X (Largura)'.",
            validationRules: { requiredPatterns: ["new Vector3(1, 0, 0)","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare eixos e avalie
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1)
        {
            Debug.Log("Eixo Selecionado: X (Largura)");
        }
    }
}`,
            tests: [
                { input: "", expected: "Eixo Selecionado: X (Largura)", description: "Eixo X" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3(1, 0, 0), if" },
                { level: "II", text: "A saída no console deve conter exatamente: Eixo Selecionado: X (Largura)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 eixos = new Vector3(1, 0, 0);\n        if (eixos.x == 1)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3(1, 0, 0)","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Eixo Selecionado: X (Largura)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_13_5",
            title: "Espaço Unitário (Vector3.one)",
            difficulty: "medium",
            description: "Declare Vector3 escala = Vector3.one;. Emita no Console: 'Escala Inicial: ' + escala.x + ', ' + escala.y + ', ' + escala.z.",
            validationRules: { requiredPatterns: ["Vector3.one","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare escala com Vector3.one e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 escala = Vector3.one;
        Debug.Log("Escala Inicial: " + escala.x + ", " + escala.y + ", " + escala.z);
    }
}`,
            tests: [
                { input: "", expected: "Escala Inicial: 1, 1, 1", description: "Vector3.one" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.one, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Escala Inicial: 1, 1, 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 escala = Vector3.one;\n        Debug.Log(\"Escala Inicial: \" + escala.x + \", \" + escala.y + \", \" + escala.z);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.one","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Escala Inicial: 1, 1, 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 14 — VETORES 3D & DISTÂNCIAS
// ═══════════════════════════════════════════════════════
{
    id: 14,
    title: "Vetores 3D & Distâncias",
    theme: "Módulo 4 — Matemática 3D",
    unlock: "Vetor Direcional",
    unlockIcon: "[V3]",
    character: "kael",
    xpReward: 210,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 4 — Matemática 3D — Assunto #15."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Vetores 3D & Distâncias. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "KAEL DRAVEN",
                "role": "CAMPEÃO DE COMBATE",
                "cssClass": "kael",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Vetores 3D & Distâncias</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "VETORES 3D & DISTÂNCIAS",
        explanation: "Estudo aprofundado de Vetores 3D & Distâncias no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);
    }
}`
    },
    example: {
        title: "Exemplo — Vetores 3D & Distâncias",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);
    }
}`,
        output: "Distancia: 5"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Vetores 3D & Distâncias e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia entre a e b
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Vetores 3D & Distâncias:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia entre a e b
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);
    }
}`,
                hint: "Distancia: 5"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_14_1",
            title: "Cálculo de Distância Euclidiana",
            difficulty: "easy",
            description: "Declare Vector3 a = new Vector3(0, 0, 0); e Vector3 b = new Vector3(3, 4, 0);. Calcule a distância com Vector3.Distance(a, b) e exiba 'Distancia: ' + dist.",
            validationRules: { requiredPatterns: ["Vector3.Distance","new Vector3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia entre a e b
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);
    }
}`,
            tests: [
                { input: "", expected: "Distancia: 5", description: "Vector3.Distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Distance, new Vector3" },
                { level: "II", text: "A saída no console deve conter exatamente: Distancia: 5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 a = new Vector3(0, 0, 0);\n        Vector3 b = new Vector3(3, 4, 0);\n        float dist = Vector3.Distance(a, b);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Distance","new Vector3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Distancia: 5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_2",
            title: "Normalização de Vetor",
            difficulty: "easy",
            description: "Declare Vector3 dir = new Vector3(5, 0, 0);. Calcule o vetor normalizado com Vector3.Normalize(dir) e exiba 'Dir X: ' + norm.x.",
            validationRules: { requiredPatterns: ["Vector3.Normalize","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Normalize dir e exiba norm.x
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 dir = new Vector3(5, 0, 0);
        var norm = Vector3.Normalize(dir);
        Debug.Log("Dir X: " + norm.x);
    }
}`,
            tests: [
                { input: "", expected: "Dir X: 1", description: "Vector3.Normalize" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Normalize, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Dir X: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 dir = new Vector3(5, 0, 0);\n        var norm = Vector3.Normalize(dir);\n        Debug.Log(\"Dir X: \" + norm.x);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Normalize","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dir X: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_3",
            title: "Produto Escalar (Vector3.Dot)",
            difficulty: "medium",
            description: "Declare Vector3 frente = Vector3.forward; e Vector3 alvo = Vector3.forward;. Calcule o alinhamento com Vector3.Dot(frente, alvo) e exiba 'Alinhamento: ' + dot.",
            validationRules: { requiredPatterns: ["Vector3.Dot","Vector3.forward","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o produto escalar
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 frente = Vector3.forward;
        Vector3 alvo = Vector3.forward;
        float dot = Vector3.Dot(frente, alvo);
        Debug.Log("Alinhamento: " + dot);
    }
}`,
            tests: [
                { input: "", expected: "Alinhamento: 1", description: "Vector3.Dot" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Dot, Vector3.forward" },
                { level: "II", text: "A saída no console deve conter exatamente: Alinhamento: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 frente = Vector3.forward;\n        Vector3 alvo = Vector3.forward;\n        float dot = Vector3.Dot(frente, alvo);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Dot","Vector3.forward","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alinhamento: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_4",
            title: "Produto Vetorial (Vector3.Cross)",
            difficulty: "medium",
            description: "Obtenha a normal perpendicular usando Vector3.Cross: declare Vector3 direito = Vector3.right; e Vector3 cima = Vector3.up;. Calcule Vector3.Cross(direito, cima) e emita 'Normal Z: ' + cross.z.",
            validationRules: { requiredPatterns: ["Vector3.Cross","Vector3.right","Vector3.up"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o cross product
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 direito = Vector3.right;
        Vector3 cima = Vector3.up;
        var cross = Vector3.Cross(direito, cima);
        Debug.Log("Normal Z: " + cross.z);
    }
}`,
            tests: [
                { input: "", expected: "Normal Z: 1", description: "Vector3.Cross" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Cross, Vector3.right" },
                { level: "II", text: "A saída no console deve conter exatamente: Normal Z: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 direito = Vector3.right;\n        Vector3 cima = Vector3.up;\n        var cross = Vector3.Cross(direito, cima);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Cross","Vector3.right","Vector3.up"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Normal Z: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_14_5",
            title: "Alcance de Radar de Proximidade",
            difficulty: "medium",
            description: "Calcule a distância entre o jogador em (0,0,0) e um inimigo em (0,0,8). Se a distância for menor que 10, emita 'Alvo no Radar: 8m'.",
            validationRules: { requiredPatterns: ["Vector3.Distance","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule a distancia e avalie o radar
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 player = Vector3.zero;
        Vector3 enemy = new Vector3(0, 0, 8);
        float dist = Vector3.Distance(player, enemy);
        if (dist < 10)
        {
            Debug.Log("Alvo no Radar: " + dist + "m");
        }
    }
}`,
            tests: [
                { input: "", expected: "Alvo no Radar: 8m", description: "Radar de proximidade com Vector3.Distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Vector3.Distance, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Alvo no Radar: 8m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 player = Vector3.zero;\n        Vector3 enemy = new Vector3(0, 0, 8);\n        float dist = Vector3.Distance(player, enemy);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Vector3.Distance","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alvo no Radar: 8m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 15 — PLANOS 3D E RAYCASTING
// ═══════════════════════════════════════════════════════
{
    id: 15,
    title: "Planos 3D e Raycasting",
    theme: "Módulo 4 — Matemática 3D",
    unlock: "Prisma Raycast",
    unlockIcon: "[RAY]",
    character: "mira",
    xpReward: 220,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 4 — Matemática 3D — Assunto #16."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Planos 3D e Raycasting. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "MIRA SOLENN",
                "role": "CARTÓGRAFA DIMENSIONAL",
                "cssClass": "mira",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Planos 3D e Raycasting</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "PLANOS 3D E RAYCASTING",
        explanation: "Estudo aprofundado de Planos 3D e Raycasting no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);
        Debug.Log("Raio Disparado: " + acertou);
    }
}`
    },
    example: {
        title: "Exemplo — Planos 3D e Raycasting",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);
        Debug.Log("Raio Disparado: " + acertou);
    }
}`,
        output: "Raio Disparado: True"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Planos 3D e Raycasting e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute Physics.Raycast
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Planos 3D e Raycasting:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute Physics.Raycast
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);
        Debug.Log("Raio Disparado: " + acertou);
    }
}`,
                hint: "Raio Disparado: True"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_15_1",
            title: "Disparo de Raycast Físico",
            difficulty: "easy",
            description: "Execute um disparo de raio chamando Physics.Raycast(Vector3.zero, Vector3.forward, 10f). Emita no Console: 'Raio Disparado: True'.",
            validationRules: { requiredPatterns: ["Physics.Raycast","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Execute Physics.Raycast
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);
        Debug.Log("Raio Disparado: " + acertou);
    }
}`,
            tests: [
                { input: "", expected: "Raio Disparado: True", description: "Physics.Raycast simples" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Physics.Raycast, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Raio Disparado: True" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);\n        Debug.Log(\"Raio Disparado: \" + acertou);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Physics.Raycast","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Raio Disparado: True";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_2",
            title: "Alcance Máximo de Detecção",
            difficulty: "easy",
            description: "Defina a distância máxima de alcance float alcanceMax = 25.0f;. Emita no Console: 'Alcance do Raio: 25 metros'.",
            validationRules: { requiredPatterns: ["float alcanceMax","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare alcanceMax e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float alcanceMax = 25.0f;
        Debug.Log("Alcance do Raio: " + alcanceMax + " metros");
    }
}`,
            tests: [
                { input: "", expected: "Alcance do Raio: 25 metros", description: "Alcance do Raycast" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float alcanceMax, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Alcance do Raio: 25 metros" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float alcanceMax = 25.0f;\n        Debug.Log(\"Alcance do Raio: \" + alcanceMax + \" metros\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float alcanceMax","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alcance do Raio: 25 metros";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_3",
            title: "Identificação de Objeto Atingido",
            difficulty: "medium",
            description: "Simule os dados de um RaycastHit: declare string tagAtingida = 'Chao';. Se tagAtingida for 'Chao', emita 'Impacto no Solo Confirmado'.",
            validationRules: { requiredPatterns: ["string tagAtingida","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a tag atingida
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tagAtingida = "Chao";
        if (tagAtingida == "Chao")
        {
            Debug.Log("Impacto no Solo Confirmado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Impacto no Solo Confirmado", description: "Hit detection" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string tagAtingida, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Impacto no Solo Confirmado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tagAtingida = \"Chao\";\n        if (tagAtingida == \"Chao\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string tagAtingida","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Impacto no Solo Confirmado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_4",
            title: "Máscara de Colisão (LayerMask)",
            difficulty: "medium",
            description: "Simule a filtragem por camada: declare int layerInimigo = 8;. Emita no Console: 'Mascara de Camada Ativa: 8'.",
            validationRules: { requiredPatterns: ["int layerInimigo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare a layer e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int layerInimigo = 8;
        Debug.Log("Mascara de Camada Ativa: " + layerInimigo);
    }
}`,
            tests: [
                { input: "", expected: "Mascara de Camada Ativa: 8", description: "LayerMask" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int layerInimigo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Mascara de Camada Ativa: 8" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int layerInimigo = 8;\n        Debug.Log(\"Mascara de Camada Ativa: \" + layerInimigo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int layerInimigo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mascara de Camada Ativa: 8";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_15_5",
            title: "Cálculo de Ponto de Impacto",
            difficulty: "medium",
            description: "Declare a distância de impacto float distHit = 4.2f;. Emita no Console: 'Impacto a ' + distHit + ' metros'.",
            validationRules: { requiredPatterns: ["float distHit","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare distHit e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float distHit = 4.2f;
        Debug.Log("Impacto a " + distHit + " metros");
    }
}`,
            tests: [
                { input: "", expected: "Impacto a 4.2 metros", description: "Distância do ponto de impacto" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float distHit, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Impacto a 4.2 metros" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float distHit = 4.2f;\n        Debug.Log(\"Impacto a \" + distHit + \" metros\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float distHit","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Impacto a 4.2 metros";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 16 — RIGIDBODY E FÍSICA 3D
// ═══════════════════════════════════════════════════════
{
    id: 16,
    title: "Rigidbody e Física 3D",
    theme: "Módulo 5 — Física 3D",
    unlock: "Massa Gravitacional",
    unlockIcon: "[PHYS]",
    character: "kael",
    xpReward: 230,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 5 — Física 3D — Assunto #17."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Rigidbody e Física 3D. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "KAEL DRAVEN",
                "role": "CAMPEÃO DE COMBATE",
                "cssClass": "kael",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Rigidbody e Física 3D</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "RIGIDBODY E FÍSICA 3D",
        explanation: "Estudo aprofundado de Rigidbody e Física 3D no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 75.0f;
        Debug.Log("Massa do Rigidbody: " + massa + "kg");
    }
}`
    },
    example: {
        title: "Exemplo — Rigidbody e Física 3D",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 75.0f;
        Debug.Log("Massa do Rigidbody: " + massa + "kg");
    }
}`,
        output: "Massa do Rigidbody: 75kg"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Rigidbody e Física 3D e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare massa e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Rigidbody e Física 3D:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare massa e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 75.0f;
        Debug.Log("Massa do Rigidbody: " + massa + "kg");
    }
}`,
                hint: "Massa do Rigidbody: 75kg"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_16_1",
            title: "Configuração de Massa Física",
            difficulty: "easy",
            description: "Declare a variável float massa = 75.0f;. Emita no Console: 'Massa do Rigidbody: 75kg'.",
            validationRules: { requiredPatterns: ["float massa","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare massa e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 75.0f;
        Debug.Log("Massa do Rigidbody: " + massa + "kg");
    }
}`,
            tests: [
                { input: "", expected: "Massa do Rigidbody: 75kg", description: "Configuração de massa" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float massa, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Massa do Rigidbody: 75kg" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float massa = 75.0f;\n        Debug.Log(\"Massa do Rigidbody: \" + massa + \"kg\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float massa","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Massa do Rigidbody: 75kg";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_2",
            title: "Aplicação de Impulso com AddForce",
            difficulty: "easy",
            description: "Simule a aplicação de um impulso de pulo: declare float forcaPulo = 10.0f;. Emita no Console: 'Forca Aplicada: 10N'.",
            validationRules: { requiredPatterns: ["float forcaPulo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare forcaPulo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float forcaPulo = 10.0f;
        Debug.Log("Forca Aplicada: " + forcaPulo + "N");
    }
}`,
            tests: [
                { input: "", expected: "Forca Aplicada: 10N", description: "Impulso físico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float forcaPulo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Forca Aplicada: 10N" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float forcaPulo = 10.0f;\n        Debug.Log(\"Forca Aplicada: \" + forcaPulo + \"N\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float forcaPulo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Forca Aplicada: 10N";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_3",
            title: "Velocidade Linear (linearVelocity)",
            difficulty: "medium",
            description: "No Unity 6.5, linearVelocity gerencia a velocidade direta do corpo. Declare Vector3 vel = new Vector3(0, 5, 0); e emita 'Velocidade Y: ' + vel.y.",
            validationRules: { requiredPatterns: ["new Vector3","vel.y","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure vel e imprima vel.y
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 vel = new Vector3(0, 5, 0);
        Debug.Log("Velocidade Y: " + vel.y);
    }
}`,
            tests: [
                { input: "", expected: "Velocidade Y: 5", description: "Velocidade linear" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3, vel.y" },
                { level: "II", text: "A saída no console deve conter exatamente: Velocidade Y: 5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 vel = new Vector3(0, 5, 0);\n        Debug.Log(\"Velocidade Y: \" + vel.y);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3","vel.y","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Velocidade Y: 5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_4",
            title: "Controle de Gravidade (useGravity)",
            difficulty: "medium",
            description: "Declare bool usaGravidade = true;. Se for verdadeiro, emita 'Gravidade Ativada no Corpo'.",
            validationRules: { requiredPatterns: ["bool usaGravidade","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque usaGravidade
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool usaGravidade = true;
        if (usaGravidade)
        {
            Debug.Log("Gravidade Ativada no Corpo");
        }
    }
}`,
            tests: [
                { input: "", expected: "Gravidade Ativada no Corpo", description: "Uso de gravidade" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool usaGravidade, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Gravidade Ativada no Corpo" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool usaGravidade = true;\n        if (usaGravidade)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool usaGravidade","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Gravidade Ativada no Corpo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_16_5",
            title: "Resistência do Ar (Drag)",
            difficulty: "medium",
            description: "Declare float drag = 2.5f;. Emita no Console: 'Atrito do Ar (Drag): 2.5'.",
            validationRules: { requiredPatterns: ["float drag","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare drag e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float drag = 2.5f;
        Debug.Log("Atrito do Ar (Drag): " + drag);
    }
}`,
            tests: [
                { input: "", expected: "Atrito do Ar (Drag): 2.5", description: "Drag físico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float drag, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Atrito do Ar (Drag): 2.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float drag = 2.5f;\n        Debug.Log(\"Atrito do Ar (Drag): \" + drag);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float drag","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Atrito do Ar (Drag): 2.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 17 — COLISÕES E TRIGGERS
// ═══════════════════════════════════════════════════════
{
    id: 17,
    title: "Colisões e Triggers",
    theme: "Módulo 5 — Física 3D",
    unlock: "Gatilho de Impacto",
    unlockIcon: "[TRIG]",
    character: "arkan",
    xpReward: 240,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 5 — Física 3D — Assunto #18."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Colisões e Triggers. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ARKAN VELOR",
                "role": "MESTRE DA GUILDA",
                "cssClass": "arkan",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Colisões e Triggers</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "COLISÕES E TRIGGERS",
        explanation: "Estudo aprofundado de Colisões e Triggers no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string outroObjeto = "Parede";
        if (outroObjeto == "Parede")
        {
            Debug.Log("Impacto com Parede Registrado");
        }
    }
}`
    },
    example: {
        title: "Exemplo — Colisões e Triggers",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string outroObjeto = "Parede";
        if (outroObjeto == "Parede")
        {
            Debug.Log("Impacto com Parede Registrado");
        }
    }
}`,
        output: "Impacto com Parede Registrado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Colisões e Triggers e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a colisao solida
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Colisões e Triggers:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a colisao solida
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string outroObjeto = "Parede";
        if (outroObjeto == "Parede")
        {
            Debug.Log("Impacto com Parede Registrado");
        }
    }
}`,
                hint: "Impacto com Parede Registrado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_17_1",
            title: "Detecção de Colisão Sólida (OnCollisionEnter)",
            difficulty: "easy",
            description: "Declare string outroObjeto = 'Parede';. Se for igual a 'Parede', emita no Console: 'Impacto com Parede Registrado'.",
            validationRules: { requiredPatterns: ["outroObjeto","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a colisao solida
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string outroObjeto = "Parede";
        if (outroObjeto == "Parede")
        {
            Debug.Log("Impacto com Parede Registrado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Impacto com Parede Registrado", description: "Colisão sólida" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: outroObjeto, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Impacto com Parede Registrado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string outroObjeto = \"Parede\";\n        if (outroObjeto == \"Parede\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["outroObjeto","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Impacto com Parede Registrado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_2",
            title: "Gatilho de Zona (OnTriggerEnter)",
            difficulty: "easy",
            description: "Declare bool isTrigger = true; e string zona = 'Checkpoint';. Se isTrigger for verdadeiro, emita 'Trigger Ativado: Checkpoint'.",
            validationRules: { requiredPatterns: ["bool isTrigger","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque o trigger e imprima a zona
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool isTrigger = true;
        string zona = "Checkpoint";
        if (isTrigger)
        {
            Debug.Log("Trigger Ativado: " + zona);
        }
    }
}`,
            tests: [
                { input: "", expected: "Trigger Ativado: Checkpoint", description: "Trigger de zona" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool isTrigger, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Trigger Ativado: Checkpoint" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool isTrigger = true;\n        string zona = \"Checkpoint\";\n        if (isTrigger)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool isTrigger","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Trigger Ativado: Checkpoint";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_3",
            title: "Coleta de Moeda por Gatilho",
            difficulty: "medium",
            description: "Declare int moedas = 0;. Simule a coleta somando 1 a moedas e emita no Console: 'Moedas: ' + moedas.",
            validationRules: { requiredPatterns: ["int moedas","++","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Incremente as moedas coletadas
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int moedas = 0;
        moedas++;
        Debug.Log("Moedas: " + moedas);
    }
}`,
            tests: [
                { input: "", expected: "Moedas: 1", description: "Coleta de item por trigger" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int moedas, ++" },
                { level: "II", text: "A saída no console deve conter exatamente: Moedas: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int moedas = 0;\n        moedas++;\n        Debug.Log(\"Moedas: \" + moedas);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int moedas","++","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Moedas: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_4",
            title: "Filtro de Colisão por Tag",
            difficulty: "medium",
            description: "Declare string colTag = 'Enemy';. Se colTag == 'Enemy', emita 'Dano Sofrido por Colisao!'.",
            validationRules: { requiredPatterns: ["colTag","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a tag do inimigo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string colTag = "Enemy";
        if (colTag == "Enemy")
        {
            Debug.Log("Dano Sofrido por Colisao!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Dano Sofrido por Colisao!", description: "Filtragem por Tag" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: colTag, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Sofrido por Colisao!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string colTag = \"Enemy\";\n        if (colTag == \"Enemy\")\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["colTag","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Sofrido por Colisao!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_17_5",
            title: "Gatilho de Saída (OnTriggerExit)",
            difficulty: "medium",
            description: "Simule a saída de uma área segura: declare bool naAreaSegura = false;. Se não estiver na área segura (!naAreaSegura), emita 'Saiu da Area Segura!'.",
            validationRules: { requiredPatterns: ["bool naAreaSegura","!","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a saida da area segura
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool naAreaSegura = false;
        if (!naAreaSegura)
        {
            Debug.Log("Saiu da Area Segura!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Saiu da Area Segura!", description: "TriggerExit" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool naAreaSegura, !" },
                { level: "II", text: "A saída no console deve conter exatamente: Saiu da Area Segura!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool naAreaSegura = false;\n        if (!naAreaSegura)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool naAreaSegura","!","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Saiu da Area Segura!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 18 — CÂMERA 3ª PESSOA (CINEMACHINE)
// ═══════════════════════════════════════════════════════
{
    id: 18,
    title: "Câmera 3ª Pessoa (Cinemachine)",
    theme: "Módulo 6 — Câmeras",
    unlock: "Lente Cinemachine",
    unlockIcon: "[CAM3]",
    character: "lyra",
    xpReward: 250,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 6 — Câmeras — Assunto #19."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Câmera 3ª Pessoa (Cinemachine). Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "LYRA NEX",
                "role": "ARQUIVISTA",
                "cssClass": "lyra",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Câmera 3ª Pessoa (Cinemachine)</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "CÂMERA 3ª PESSOA (CINEMACHINE)",
        explanation: "Estudo aprofundado de Câmera 3ª Pessoa (Cinemachine) no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string alvoSeguido = "Player";
        Debug.Log("Cinemachine Seguindo: " + alvoSeguido);
    }
}`
    },
    example: {
        title: "Exemplo — Câmera 3ª Pessoa (Cinemachine)",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string alvoSeguido = "Player";
        Debug.Log("Cinemachine Seguindo: " + alvoSeguido);
    }
}`,
        output: "Cinemachine Seguindo: Player"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Câmera 3ª Pessoa (Cinemachine) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure alvoSeguido e emita
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Câmera 3ª Pessoa (Cinemachine):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure alvoSeguido e emita
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string alvoSeguido = "Player";
        Debug.Log("Cinemachine Seguindo: " + alvoSeguido);
    }
}`,
                hint: "Cinemachine Seguindo: Player"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_18_1",
            title: "Configuração de Alvo (Follow Target)",
            difficulty: "easy",
            description: "Declare string alvoSeguido = 'Player';. Emita no Console: 'Cinemachine Seguindo: Player'.",
            validationRules: { requiredPatterns: ["alvoSeguido","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure alvoSeguido e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string alvoSeguido = "Player";
        Debug.Log("Cinemachine Seguindo: " + alvoSeguido);
    }
}`,
            tests: [
                { input: "", expected: "Cinemachine Seguindo: Player", description: "Cinemachine follow target" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: alvoSeguido, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Cinemachine Seguindo: Player" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string alvoSeguido = \"Player\";\n        Debug.Log(\"Cinemachine Seguindo: \" + alvoSeguido);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["alvoSeguido","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Cinemachine Seguindo: Player";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_2",
            title: "Distância Orbital da Câmera",
            difficulty: "easy",
            description: "Declare float raioOrbital = 4.5f;. Emita no Console: 'Distancia Orbital: 4.5m'.",
            validationRules: { requiredPatterns: ["float raioOrbital","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare raioOrbital e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float raioOrbital = 4.5f;
        Debug.Log("Distancia Orbital: " + raioOrbital + "m");
    }
}`,
            tests: [
                { input: "", expected: "Distancia Orbital: 4.5m", description: "Distância de câmera orbital" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float raioOrbital, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Distancia Orbital: 4.5m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float raioOrbital = 4.5f;\n        Debug.Log(\"Distancia Orbital: \" + raioOrbital + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float raioOrbital","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Distancia Orbital: 4.5m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_3",
            title: "Amortecimento Suave (Damping)",
            difficulty: "medium",
            description: "Declare float damping = 0.3f;. Emita no Console: 'Suavizacao Damping: 0.3'.",
            validationRules: { requiredPatterns: ["float damping","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare damping e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float damping = 0.3f;
        Debug.Log("Suavizacao Damping: " + damping);
    }
}`,
            tests: [
                { input: "", expected: "Suavizacao Damping: 0.3", description: "Damping da câmera" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float damping, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Suavizacao Damping: 0.3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float damping = 0.3f;\n        Debug.Log(\"Suavizacao Damping: \" + damping);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float damping","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Suavizacao Damping: 0.3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_4",
            title: "Transição Suave Entre Câmeras Virtuais",
            difficulty: "medium",
            description: "Declare int prioridadeVcam1 = 10 e int prioridadeVcam2 = 20. Se prioridadeVcam2 > prioridadeVcam1, emita 'Vcam2 Ativa por Prioridade'.",
            validationRules: { requiredPatterns: ["prioridadeVcam1","prioridadeVcam2","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Compare as prioridades e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int prioridadeVcam1 = 10;
        int prioridadeVcam2 = 20;
        if (prioridadeVcam2 > prioridadeVcam1)
        {
            Debug.Log("Vcam2 Ativa por Prioridade");
        }
    }
}`,
            tests: [
                { input: "", expected: "Vcam2 Ativa por Prioridade", description: "Prioridade de vcam" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: prioridadeVcam1, prioridadeVcam2" },
                { level: "II", text: "A saída no console deve conter exatamente: Vcam2 Ativa por Prioridade" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int prioridadeVcam1 = 10;\n        int prioridadeVcam2 = 20;\n        if (prioridadeVcam2 > prioridadeVcam1)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["prioridadeVcam1","prioridadeVcam2","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vcam2 Ativa por Prioridade";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_18_5",
            title: "Zona Morta da Câmera (Dead Zone)",
            difficulty: "medium",
            description: "Declare float deadZoneWidth = 0.1f;. Emita no Console: 'Largura Dead Zone: 0.1'.",
            validationRules: { requiredPatterns: ["float deadZoneWidth","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare deadZoneWidth e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float deadZoneWidth = 0.1f;
        Debug.Log("Largura Dead Zone: " + deadZoneWidth);
    }
}`,
            tests: [
                { input: "", expected: "Largura Dead Zone: 0.1", description: "Dead zone da Cinemachine" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float deadZoneWidth, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Largura Dead Zone: 0.1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float deadZoneWidth = 0.1f;\n        Debug.Log(\"Largura Dead Zone: \" + deadZoneWidth);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float deadZoneWidth","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Largura Dead Zone: 0.1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 19 — CÂMERA 1ª PESSOA (FPS LOOK)
// ═══════════════════════════════════════════════════════
{
    id: 19,
    title: "Câmera 1ª Pessoa (FPS Look)",
    theme: "Módulo 6 — Câmeras",
    unlock: "Visor em 1ª Pessoa",
    unlockIcon: "[FPS]",
    character: "elion",
    xpReward: 260,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 6 — Câmeras — Assunto #20."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Câmera 1ª Pessoa (FPS Look). Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ELION RAVEN",
                "role": "MESTRE ESCRIBA",
                "cssClass": "elion",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Câmera 1ª Pessoa (FPS Look)</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "CÂMERA 1ª PESSOA (FPS LOOK)",
        explanation: "Estudo aprofundado de Câmera 1ª Pessoa (FPS Look) no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float sensibilidade = 2.0f;
        Debug.Log("Sensibilidade Mouse: " + sensibilidade);
    }
}`
    },
    example: {
        title: "Exemplo — Câmera 1ª Pessoa (FPS Look)",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float sensibilidade = 2.0f;
        Debug.Log("Sensibilidade Mouse: " + sensibilidade);
    }
}`,
        output: "Sensibilidade Mouse: 2"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Câmera 1ª Pessoa (FPS Look) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare sensibilidade e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Câmera 1ª Pessoa (FPS Look):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare sensibilidade e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float sensibilidade = 2.0f;
        Debug.Log("Sensibilidade Mouse: " + sensibilidade);
    }
}`,
                hint: "Sensibilidade Mouse: 2"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_19_1",
            title: "Sensibilidade do Mouse Look",
            difficulty: "easy",
            description: "Declare float sensibilidade = 2.0f;. Emita no Console: 'Sensibilidade Mouse: 2'.",
            validationRules: { requiredPatterns: ["float sensibilidade","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare sensibilidade e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float sensibilidade = 2.0f;
        Debug.Log("Sensibilidade Mouse: " + sensibilidade);
    }
}`,
            tests: [
                { input: "", expected: "Sensibilidade Mouse: 2", description: "Sensibilidade FPS" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float sensibilidade, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Sensibilidade Mouse: 2" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float sensibilidade = 2.0f;\n        Debug.Log(\"Sensibilidade Mouse: \" + sensibilidade);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float sensibilidade","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Sensibilidade Mouse: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_19_2",
            title: "Trava de Cursor no Centro da Tela",
            difficulty: "easy",
            description: "Configure a trava do cursor acessando Cursor.lockState = 0;. Emita no Console: 'Cursor Bloqueado no Centro'.",
            validationRules: { requiredPatterns: ["Cursor.lockState","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure Cursor.lockState e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Cursor.lockState = 0;
        Debug.Log("Cursor Bloqueado no Centro");
    }
}`,
            tests: [
                { input: "", expected: "Cursor Bloqueado no Centro", description: "Bloqueio do Cursor" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Cursor.lockState, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Cursor Bloqueado no Centro" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Cursor.lockState = 0;\n        Debug.Log(\"Cursor Bloqueado no Centro\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Cursor.lockState","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Cursor Bloqueado no Centro";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_19_3",
            title: "Limite de Rotação Vertical (Clamp Pitch)",
            difficulty: "medium",
            description: "Restrinja o ângulo vertical para não quebrar o pescoço do personagem: use Mathf.Clamp(95, -80, 80) e emita 'Angulo Travado: ' + angulo.",
            validationRules: { requiredPatterns: ["Mathf.Clamp","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Aplique Mathf.Clamp entre -80 e 80
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float angulo = Mathf.Clamp(95, -80, 80);
        Debug.Log("Angulo Travado: " + angulo);
    }
}`,
            tests: [
                { input: "", expected: "Angulo Travado: 80", description: "Mathf.Clamp vertical" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Mathf.Clamp, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Angulo Travado: 80" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float angulo = Mathf.Clamp(95, -80, 80);\n        Debug.Log(\"Angulo Travado: \" + angulo);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Mathf.Clamp","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Angulo Travado: 80";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_19_4",
            title: "Rotação Horizontal do Corpo",
            difficulty: "medium",
            description: "Declare float mouseX = 15.0f;. Emita no Console: 'Giro Horizontal do Corpo: 15 graus'.",
            validationRules: { requiredPatterns: ["float mouseX","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare mouseX e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float mouseX = 15.0f;
        Debug.Log("Giro Horizontal do Corpo: " + mouseX + " graus");
    }
}`,
            tests: [
                { input: "", expected: "Giro Horizontal do Corpo: 15 graus", description: "Giro horizontal" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float mouseX, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Giro Horizontal do Corpo: 15 graus" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float mouseX = 15.0f;\n        Debug.Log(\"Giro Horizontal do Corpo: \" + mouseX + \" graus\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float mouseX","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Giro Horizontal do Corpo: 15 graus";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_19_5",
            title: "Campo de Visão (Field of View)",
            difficulty: "medium",
            description: "Declare int fov = 60;. Quando o jogador mirar (bool mirando = true), reduza o fov para 40 e emita 'FOV Atual: ' + fov.",
            validationRules: { requiredPatterns: ["int fov","bool mirando","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Reduza o FOV ao mirar e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int fov = 60;
        bool mirando = true;
        if (mirando) fov = 40;
        Debug.Log("FOV Atual: " + fov);
    }
}`,
            tests: [
                { input: "", expected: "FOV Atual: 40", description: "Zoom com FOV" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int fov, bool mirando" },
                { level: "II", text: "A saída no console deve conter exatamente: FOV Atual: 40" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int fov = 60;\n        bool mirando = true;\n        if (mirando) fov = 40;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int fov","bool mirando","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "FOV Atual: 40";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 20 — GEOMETRIAS 3D E MESHES
// ═══════════════════════════════════════════════════════
{
    id: 20,
    title: "Geometrias 3D e Meshes",
    theme: "Módulo 7 — Mundo 3D",
    unlock: "Malha Poligonal",
    unlockIcon: "[MESH]",
    character: "orin",
    xpReward: 270,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 7 — Mundo 3D — Assunto #21."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Geometrias 3D e Meshes. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ORIN VALE",
                "role": "ARTÍFICE DE CENÁRIOS",
                "cssClass": "orin",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Geometrias 3D e Meshes</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "GEOMETRIAS 3D E MESHES",
        explanation: "Estudo aprofundado de Geometrias 3D e Meshes no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);
    }
}`
    },
    example: {
        title: "Exemplo — Geometrias 3D e Meshes",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);
    }
}`,
        output: "Vertices da Malha: 24"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Geometrias 3D e Meshes e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalVertices e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Geometrias 3D e Meshes:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalVertices e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);
    }
}`,
                hint: "Vertices da Malha: 24"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_20_1",
            title: "Contagem de Vértices da Geometria",
            difficulty: "easy",
            description: "Declare int totalVertices = 24;. Emita no Console: 'Vertices da Malha: 24'.",
            validationRules: { requiredPatterns: ["int totalVertices","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalVertices e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);
    }
}`,
            tests: [
                { input: "", expected: "Vertices da Malha: 24", description: "Contagem de vértices" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int totalVertices, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Vertices da Malha: 24" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalVertices = 24;\n        Debug.Log(\"Vertices da Malha: \" + totalVertices);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int totalVertices","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vertices da Malha: 24";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_2",
            title: "Triângulos e Faces Poligonais",
            difficulty: "easy",
            description: "Cada quad requer 2 triângulos. Para 6 faces de um cubo, calcule totalTriangulos = 6 * 2 e emita 'Total Triangulos: ' + totalTriangulos.",
            validationRules: { requiredPatterns: ["totalTriangulos","6 * 2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule totalTriangulos e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalTriangulos = 6 * 2;
        Debug.Log("Total Triangulos: " + totalTriangulos);
    }
}`,
            tests: [
                { input: "", expected: "Total Triangulos: 12", description: "Triangulação de cubo" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: totalTriangulos, 6 * 2" },
                { level: "II", text: "A saída no console deve conter exatamente: Total Triangulos: 12" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalTriangulos = 6 * 2;\n        Debug.Log(\"Total Triangulos: \" + totalTriangulos);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["totalTriangulos","6 * 2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Total Triangulos: 12";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_3",
            title: "Mapeamento UV de Textura",
            difficulty: "medium",
            description: "Declare Vector2 uv = new Vector2(0.5f, 0.5f);. Emita no Console: 'Centro UV: (0.5, 0.5)'.",
            validationRules: { requiredPatterns: ["new Vector2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare uv e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");
    }
}`,
            tests: [
                { input: "", expected: "Centro UV: (0.5, 0.5)", description: "Coordenadas UV" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector2, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Centro UV: (0.5, 0.5)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector2 uv = new Vector2(0.5f, 0.5f);\n        Debug.Log(\"Centro UV: (\" + uv.x + \", \" + uv.y + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Centro UV: (0.5, 0.5)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_4",
            title: "Recálculo de Normais da Malha",
            difficulty: "medium",
            description: "Declare string statusNormais = 'Normais Recalculadas com Sucesso';. Emita no Console o valor de statusNormais.",
            validationRules: { requiredPatterns: ["string statusNormais","statusNormais","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusNormais e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusNormais = "Normais Recalculadas com Sucesso";
        Debug.Log(statusNormais);
    }
}`,
            tests: [
                { input: "", expected: "Normais Recalculadas com Sucesso", description: "RecalculateNormals" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusNormais, statusNormais" },
                { level: "II", text: "A saída no console deve conter exatamente: Normais Recalculadas com Sucesso" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusNormais = \"Normais Recalculadas com Sucesso\";\n        Debug.Log(statusNormais);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusNormais","statusNormais","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Normais Recalculadas com Sucesso";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_20_5",
            title: "Otimização de Submeshes",
            difficulty: "medium",
            description: "Declare int submeshes = 1;. Se submeshes == 1, emita 'Malha Otimizada: Draw Call Unico'.",
            validationRules: { requiredPatterns: ["int submeshes","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque as submeshes
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int submeshes = 1;
        if (submeshes == 1)
        {
            Debug.Log("Malha Otimizada: Draw Call Unico");
        }
    }
}`,
            tests: [
                { input: "", expected: "Malha Otimizada: Draw Call Unico", description: "Submesh e draw call" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int submeshes, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Malha Otimizada: Draw Call Unico" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int submeshes = 1;\n        if (submeshes == 1)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int submeshes","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Malha Otimizada: Draw Call Unico";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 21 — TERRENO E VEGETAÇÃO
// ═══════════════════════════════════════════════════════
{
    id: 21,
    title: "Terreno e Vegetação",
    theme: "Módulo 7 — Mundo 3D",
    unlock: "Semente do Terreno",
    unlockIcon: "[TERR]",
    character: "mira",
    xpReward: 280,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 7 — Mundo 3D — Assunto #22."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Terreno e Vegetação. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "MIRA SOLENN",
                "role": "CARTÓGRAFA DIMENSIONAL",
                "cssClass": "mira",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Terreno e Vegetação</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "TERRENO E VEGETAÇÃO",
        explanation: "Estudo aprofundado de Terreno e Vegetação no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");
    }
}`
    },
    example: {
        title: "Exemplo — Terreno e Vegetação",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");
    }
}`,
        output: "Area do Terreno: 500x500m"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Terreno e Vegetação e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tamanhoTerreno e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Terreno e Vegetação:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tamanhoTerreno e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");
    }
}`,
                hint: "Area do Terreno: 500x500m"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_21_1",
            title: "Dimensões do Terreno",
            difficulty: "easy",
            description: "Declare int tamanhoTerreno = 500;. Emita no Console: 'Area do Terreno: 500x500m'.",
            validationRules: { requiredPatterns: ["int tamanhoTerreno","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tamanhoTerreno e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");
    }
}`,
            tests: [
                { input: "", expected: "Area do Terreno: 500x500m", description: "Dimensões do terreno" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int tamanhoTerreno, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Area do Terreno: 500x500m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int tamanhoTerreno = 500;\n        Debug.Log(\"Area do Terreno: \" + tamanhoTerreno + \"x\" + tamanhoTerreno + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int tamanhoTerreno","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Area do Terreno: 500x500m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_2",
            title: "Leitura de Altura do Mapa (Heightmap)",
            difficulty: "easy",
            description: "Declare float alturaY = 24.5f;. Emita no Console: 'Elevacao no Ponto: 24.5m'.",
            validationRules: { requiredPatterns: ["float alturaY","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare alturaY e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float alturaY = 24.5f;
        Debug.Log("Elevacao no Ponto: " + alturaY + "m");
    }
}`,
            tests: [
                { input: "", expected: "Elevacao no Ponto: 24.5m", description: "Elevação de terreno" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float alturaY, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Elevacao no Ponto: 24.5m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float alturaY = 24.5f;\n        Debug.Log(\"Elevacao no Ponto: \" + alturaY + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float alturaY","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Elevacao no Ponto: 24.5m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_3",
            title: "Densidade de Vegetação e Árvores",
            difficulty: "medium",
            description: "Declare int totalArvores = 1200;. Emita no Console: 'Instancias de Arvores: 1200'.",
            validationRules: { requiredPatterns: ["int totalArvores","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalArvores e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalArvores = 1200;
        Debug.Log("Instancias de Arvores: " + totalArvores);
    }
}`,
            tests: [
                { input: "", expected: "Instancias de Arvores: 1200", description: "Densidade vegetal" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int totalArvores, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Instancias de Arvores: 1200" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalArvores = 1200;\n        Debug.Log(\"Instancias de Arvores: \" + totalArvores);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int totalArvores","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Instancias de Arvores: 1200";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_4",
            title: "Distância de Desenho de Grama",
            difficulty: "medium",
            description: "Declare int distanciaDetalhes = 80;. Emita no Console: 'Distancia de Detalhes: 80m'.",
            validationRules: { requiredPatterns: ["int distanciaDetalhes","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare distanciaDetalhes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int distanciaDetalhes = 80;
        Debug.Log("Distancia de Detalhes: " + distanciaDetalhes + "m");
    }
}`,
            tests: [
                { input: "", expected: "Distancia de Detalhes: 80m", description: "Detail distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int distanciaDetalhes, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Distancia de Detalhes: 80m" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int distanciaDetalhes = 80;\n        Debug.Log(\"Distancia de Detalhes: \" + distanciaDetalhes + \"m\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int distanciaDetalhes","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Distancia de Detalhes: 80m";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_21_5",
            title: "Pintura de Camada de Textura (Splatmap)",
            difficulty: "medium",
            description: "Declare string camadaAtiva = 'Grama_Rochosa';. Emita no Console: 'Camada de Textura: Grama_Rochosa'.",
            validationRules: { requiredPatterns: ["camadaAtiva","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare camadaAtiva e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string camadaAtiva = "Grama_Rochosa";
        Debug.Log("Camada de Textura: " + camadaAtiva);
    }
}`,
            tests: [
                { input: "", expected: "Camada de Textura: Grama_Rochosa", description: "Textura do terreno" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: camadaAtiva, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Camada de Textura: Grama_Rochosa" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string camadaAtiva = \"Grama_Rochosa\";\n        Debug.Log(\"Camada de Textura: \" + camadaAtiva);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["camadaAtiva","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Camada de Textura: Grama_Rochosa";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 22 — ILUMINAÇÃO, APV E POST-PROCESSING
// ═══════════════════════════════════════════════════════
{
    id: 22,
    title: "Iluminação, APV e Post-Processing",
    theme: "Módulo 7 — Mundo 3D",
    unlock: "Luz Razoável APV",
    unlockIcon: "[LIGHT]",
    character: "lyra",
    xpReward: 290,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 7 — Mundo 3D — Assunto #23."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Iluminação, APV e Post-Processing. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "LYRA NEX",
                "role": "ARQUIVISTA",
                "cssClass": "lyra",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Iluminação, APV e Post-Processing</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "ILUMINAÇÃO, APV E POST-PROCESSING",
        explanation: "Estudo aprofundado de Iluminação, APV e Post-Processing no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");
    }
}`
    },
    example: {
        title: "Exemplo — Iluminação, APV e Post-Processing",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");
    }
}`,
        output: "Intensidade Solar: 1.2 Lux"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Iluminação, APV e Post-Processing e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare intensidadeLuz e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Iluminação, APV e Post-Processing:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare intensidadeLuz e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");
    }
}`,
                hint: "Intensidade Solar: 1.2 Lux"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_22_1",
            title: "Intensidade da Luz Direcional (Sol)",
            difficulty: "easy",
            description: "Declare float intensidadeLuz = 1.2f;. Emita no Console: 'Intensidade Solar: 1.2 Lux'.",
            validationRules: { requiredPatterns: ["float intensidadeLuz","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare intensidadeLuz e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");
    }
}`,
            tests: [
                { input: "", expected: "Intensidade Solar: 1.2 Lux", description: "Intensidade de luz" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float intensidadeLuz, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Intensidade Solar: 1.2 Lux" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float intensidadeLuz = 1.2f;\n        Debug.Log(\"Intensidade Solar: \" + intensidadeLuz + \" Lux\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float intensidadeLuz","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Intensidade Solar: 1.2 Lux";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_2",
            title: "Sombras em Tempo Real (Shadows)",
            difficulty: "easy",
            description: "Declare string tipoSombra = 'SoftShadows';. Emita no Console: 'Tipo de Sombra: SoftShadows'.",
            validationRules: { requiredPatterns: ["tipoSombra","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tipoSombra e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tipoSombra = "SoftShadows";
        Debug.Log("Tipo de Sombra: " + tipoSombra);
    }
}`,
            tests: [
                { input: "", expected: "Tipo de Sombra: SoftShadows", description: "Modo de sombras" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tipoSombra, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Tipo de Sombra: SoftShadows" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tipoSombra = \"SoftShadows\";\n        Debug.Log(\"Tipo de Sombra: \" + tipoSombra);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tipoSombra","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Tipo de Sombra: SoftShadows";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_3",
            title: "Sondas de Luz Adaptativas (APV)",
            difficulty: "medium",
            description: "Declare int totalProbes = 250;. Emita no Console: 'Adaptive Probe Volumes: 250 probes'.",
            validationRules: { requiredPatterns: ["int totalProbes","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare totalProbes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalProbes = 250;
        Debug.Log("Adaptive Probe Volumes: " + totalProbes + " probes");
    }
}`,
            tests: [
                { input: "", expected: "Adaptive Probe Volumes: 250 probes", description: "APV probes" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int totalProbes, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Adaptive Probe Volumes: 250 probes" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int totalProbes = 250;\n        Debug.Log(\"Adaptive Probe Volumes: \" + totalProbes + \" probes\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int totalProbes","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Adaptive Probe Volumes: 250 probes";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_4",
            title: "Efeito Bloom de Pós-Processamento",
            difficulty: "medium",
            description: "Declare bool bloomAtivo = true; e float intensidadeBloom = 0.8f;. Se bloomAtivo, emita 'Bloom Ativo com Intensidade: 0.8'.",
            validationRules: { requiredPatterns: ["bool bloomAtivo","float intensidadeBloom","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide e emita o Bloom
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool bloomAtivo = true;
        float intensidadeBloom = 0.8f;
        if (bloomAtivo)
        {
            Debug.Log("Bloom Ativo com Intensidade: " + intensidadeBloom);
        }
    }
}`,
            tests: [
                { input: "", expected: "Bloom Ativo com Intensidade: 0.8", description: "Post-Processing Bloom" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool bloomAtivo, float intensidadeBloom" },
                { level: "II", text: "A saída no console deve conter exatamente: Bloom Ativo com Intensidade: 0.8" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool bloomAtivo = true;\n        float intensidadeBloom = 0.8f;\n        if (bloomAtivo)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool bloomAtivo","float intensidadeBloom","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Bloom Ativo com Intensidade: 0.8";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_22_5",
            title: "Color Grading e Vinheta",
            difficulty: "medium",
            description: "Declare float vinhetaIntensidade = 0.35f;. Emita no Console: 'Vinheta Cinematica: 0.35'.",
            validationRules: { requiredPatterns: ["float vinhetaIntensidade","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare vinhetaIntensidade e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float vinhetaIntensidade = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinhetaIntensidade);
    }
}`,
            tests: [
                { input: "", expected: "Vinheta Cinematica: 0.35", description: "Vignette effect" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float vinhetaIntensidade, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Vinheta Cinematica: 0.35" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float vinhetaIntensidade = 0.35f;\n        Debug.Log(\"Vinheta Cinematica: \" + vinhetaIntensidade);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float vinhetaIntensidade","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Vinheta Cinematica: 0.35";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 23 — INTERFACE GRÁFICA (HUD E UI)
// ═══════════════════════════════════════════════════════
{
    id: 23,
    title: "Interface Gráfica (HUD e UI)",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Painel TextMeshPro",
    unlockIcon: "[UI]",
    character: "elion",
    xpReward: 300,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 8 — Interface e Sistemas — Assunto #24."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Interface Gráfica (HUD e UI). Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ELION RAVEN",
                "role": "MESTRE ESCRIBA",
                "cssClass": "elion",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Interface Gráfica (HUD e UI)</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "INTERFACE GRÁFICA (HUD E UI)",
        explanation: "Estudo aprofundado de Interface Gráfica (HUD e UI) no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string texto = "HP: 100/100";
        Debug.Log("HUD Texto: " + texto);
    }
}`
    },
    example: {
        title: "Exemplo — Interface Gráfica (HUD e UI)",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string texto = "HP: 100/100";
        Debug.Log("HUD Texto: " + texto);
    }
}`,
        output: "HUD Texto: HP: 100/100"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Interface Gráfica (HUD e UI) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o texto do HUD e imprima
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 24 — SISTEMAS DE PARTÍCULAS (VFX)
// ═══════════════════════════════════════════════════════
{
    id: 24,
    title: "Sistemas de Partículas (VFX)",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Faísca VFX",
    unlockIcon: "[VFX]",
    character: "mira",
    xpReward: 310,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 8 — Interface e Sistemas — Assunto #25."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Sistemas de Partículas (VFX). Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "MIRA SOLENN",
                "role": "CARTÓGRAFA DIMENSIONAL",
                "cssClass": "mira",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Sistemas de Partículas (VFX)</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "SISTEMAS DE PARTÍCULAS (VFX)",
        explanation: "Estudo aprofundado de Sistemas de Partículas (VFX) no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);
    }
}`
    },
    example: {
        title: "Exemplo — Sistemas de Partículas (VFX)",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);
    }
}`,
        output: "VFX Play: Faíscas de Impacto"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Sistemas de Partículas (VFX) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare efeito e emita a reproducao do VFX
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Sistemas de Partículas (VFX):",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare efeito e emita a reproducao do VFX
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);
    }
}`,
                hint: "VFX Play: Faíscas de Impacto"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_24_1",
            title: "Emissão de Efeito de Impacto",
            difficulty: "easy",
            description: "Declare string efeito = 'Faíscas de Impacto';. Simule a emissão emitindo no Console: 'VFX Play: ' + efeito.",
            validationRules: { requiredPatterns: ["string efeito","efeito","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare efeito e emita a reproducao do VFX
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);
    }
}`,
            tests: [
                { input: "", expected: "VFX Play: Faíscas de Impacto", description: "Disparo de VFX" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string efeito, efeito" },
                { level: "II", text: "A saída no console deve conter exatamente: VFX Play: Faíscas de Impacto" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string efeito = \"Faíscas de Impacto\";\n        Debug.Log(\"VFX Play: \" + efeito);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string efeito","efeito","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "VFX Play: Faíscas de Impacto";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_2",
            title: "Taxa de Emissão de Partículas",
            difficulty: "easy",
            description: "Declare int taxaEmissao = 50;. Emita no Console: 'Taxa de Emissao: 50 particulas/s'.",
            validationRules: { requiredPatterns: ["int taxaEmissao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare taxaEmissao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int taxaEmissao = 50;
        Debug.Log("Taxa de Emissao: " + taxaEmissao + " particulas/s");
    }
}`,
            tests: [
                { input: "", expected: "Taxa de Emissao: 50 particulas/s", description: "Taxa de emissão" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int taxaEmissao, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Taxa de Emissao: 50 particulas/s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int taxaEmissao = 50;\n        Debug.Log(\"Taxa de Emissao: \" + taxaEmissao + \" particulas/s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int taxaEmissao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Taxa de Emissao: 50 particulas/s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_3",
            title: "Tempo de Vida das Partículas (Lifetime)",
            difficulty: "medium",
            description: "Declare float duracao = 2.5f;. Emita no Console: 'Tempo de Vida: 2.5s'.",
            validationRules: { requiredPatterns: ["float duracao","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare duracao e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float duracao = 2.5f;
        Debug.Log("Tempo de Vida: " + duracao + "s");
    }
}`,
            tests: [
                { input: "", expected: "Tempo de Vida: 2.5s", description: "Particle Lifetime" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float duracao, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Tempo de Vida: 2.5s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float duracao = 2.5f;\n        Debug.Log(\"Tempo de Vida: \" + duracao + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float duracao","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Tempo de Vida: 2.5s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_4",
            title: "Efeito em Loop Contínuo",
            difficulty: "medium",
            description: "Declare bool estaEmLoop = true;. Se for verdadeiro, emita 'VFX em Execucao Continua'.",
            validationRules: { requiredPatterns: ["bool estaEmLoop","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se o efeito esta em loop
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaEmLoop = true;
        if (estaEmLoop)
        {
            Debug.Log("VFX em Execucao Continua");
        }
    }
}`,
            tests: [
                { input: "", expected: "VFX em Execucao Continua", description: "Looping VFX" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaEmLoop, if" },
                { level: "II", text: "A saída no console deve conter exatamente: VFX em Execucao Continua" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaEmLoop = true;\n        if (estaEmLoop)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaEmLoop","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "VFX em Execucao Continua";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_24_5",
            title: "Interrupção do Sistema de Partículas (Stop)",
            difficulty: "medium",
            description: "Declare string statusVfx = 'VFX Stop: Emissao Encerrada';. Emita a mensagem com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusVfx","statusVfx","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusVfx e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusVfx = "VFX Stop: Emissao Encerrada";
        Debug.Log(statusVfx);
    }
}`,
            tests: [
                { input: "", expected: "VFX Stop: Emissao Encerrada", description: "Parada de partículas" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusVfx, statusVfx" },
                { level: "II", text: "A saída no console deve conter exatamente: VFX Stop: Emissao Encerrada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusVfx = \"VFX Stop: Emissao Encerrada\";\n        Debug.Log(statusVfx);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusVfx","statusVfx","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "VFX Stop: Emissao Encerrada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 25 — EFEITOS SONOROS 3D E ÁUDIO
// ═══════════════════════════════════════════════════════
{
    id: 25,
    title: "Efeitos Sonoros 3D e Áudio",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Sino Tridimensional",
    unlockIcon: "[SFX]",
    character: "kael",
    xpReward: 320,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 8 — Interface e Sistemas — Assunto #26."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Efeitos Sonoros 3D e Áudio. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "KAEL DRAVEN",
                "role": "CAMPEÃO DE COMBATE",
                "cssClass": "kael",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Efeitos Sonoros 3D e Áudio</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "EFEITOS SONOROS 3D E ÁUDIO",
        explanation: "Estudo aprofundado de Efeitos Sonoros 3D e Áudio no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);
    }
}`
    },
    example: {
        title: "Exemplo — Efeitos Sonoros 3D e Áudio",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);
    }
}`,
        output: "Audio Tocado: Espada_Hit"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Efeitos Sonoros 3D e Áudio e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare o som e imprima
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 26 — NAVMESH E IA DE PATRULHA NPC
// ═══════════════════════════════════════════════════════
{
    id: 26,
    title: "NavMesh e IA de Patrulha NPC",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Bússola NavMesh",
    unlockIcon: "[NAV]",
    character: "orin",
    xpReward: 330,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 8 — Interface e Sistemas — Assunto #27."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de NavMesh e IA de Patrulha NPC. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ORIN VALE",
                "role": "ARTÍFICE DE CENÁRIOS",
                "cssClass": "orin",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>NavMesh e IA de Patrulha NPC</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "NAVMESH E IA DE PATRULHA NPC",
        explanation: "Estudo aprofundado de NavMesh e IA de Patrulha NPC no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");
    }
}`
    },
    example: {
        title: "Exemplo — NavMesh e IA de Patrulha NPC",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");
    }
}`,
        output: "Destino NavMesh: (10, 0, 15)"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de NavMesh e IA de Patrulha NPC e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure destino e emita
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de NavMesh e IA de Patrulha NPC:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure destino e emita
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");
    }
}`,
                hint: "Destino NavMesh: (10, 0, 15)"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_26_1",
            title: "Definição de Destino com SetDestination",
            difficulty: "easy",
            description: "Simule o envio de um NPC para um destino: declare Vector3 destino = new Vector3(10, 0, 15);. Emita no Console: 'Destino NavMesh: (10, 0, 15)'.",
            validationRules: { requiredPatterns: ["new Vector3","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure destino e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");
    }
}`,
            tests: [
                { input: "", expected: "Destino NavMesh: (10, 0, 15)", description: "NavMesh destino" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: new Vector3, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Destino NavMesh: (10, 0, 15)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        Vector3 destino = new Vector3(10, 0, 15);\n        Debug.Log(\"Destino NavMesh: (\" + destino.x + \", \" + destino.y + \", \" + destino.z + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["new Vector3","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Destino NavMesh: (10, 0, 15)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_2",
            title: "Velocidade de Navegação do Agente",
            difficulty: "easy",
            description: "Declare float velocidadeAgente = 3.5f;. Emita no Console: 'Velocidade NavMeshAgent: 3.5'.",
            validationRules: { requiredPatterns: ["float velocidadeAgente","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare velocidadeAgente e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float velocidadeAgente = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + velocidadeAgente);
    }
}`,
            tests: [
                { input: "", expected: "Velocidade NavMeshAgent: 3.5", description: "NavMeshAgent speed" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float velocidadeAgente, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Velocidade NavMeshAgent: 3.5" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float velocidadeAgente = 3.5f;\n        Debug.Log(\"Velocidade NavMeshAgent: \" + velocidadeAgente);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float velocidadeAgente","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Velocidade NavMeshAgent: 3.5";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_3",
            title: "Distância de Parada (StoppingDistance)",
            difficulty: "medium",
            description: "Declare float distRestante = 0.8f; e float stopDist = 1.0f;. Se distRestante <= stopDist, emita 'NPC Chegou ao Destino'.",
            validationRules: { requiredPatterns: ["float distRestante","float stopDist","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide se o agente chegou
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float distRestante = 0.8f;
        float stopDist = 1.0f;
        if (distRestante <= stopDist)
        {
            Debug.Log("NPC Chegou ao Destino");
        }
    }
}`,
            tests: [
                { input: "", expected: "NPC Chegou ao Destino", description: "NavMesh stopping distance" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float distRestante, float stopDist" },
                { level: "II", text: "A saída no console deve conter exatamente: NPC Chegou ao Destino" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float distRestante = 0.8f;\n        float stopDist = 1.0f;\n        if (distRestante <= stopDist)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float distRestante","float stopDist","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "NPC Chegou ao Destino";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_4",
            title: "Patrulha Entre Pontos (Waypoints)",
            difficulty: "medium",
            description: "Declare int indicePonto = 0; e int totalPontos = 3;. Avance para o próximo índice com (indicePonto + 1) % totalPontos e emita 'Proximo Ponto: ' + proximo.",
            validationRules: { requiredPatterns: ["indicePonto","totalPontos","%","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Avance para o proximo waypoint
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int indicePonto = 0;
        int totalPontos = 3;
        int proximo = (indicePonto + 1) % totalPontos;
        Debug.Log("Proximo Ponto: " + proximo);
    }
}`,
            tests: [
                { input: "", expected: "Proximo Ponto: 1", description: "Alternância de waypoints" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: indicePonto, totalPontos" },
                { level: "II", text: "A saída no console deve conter exatamente: Proximo Ponto: 1" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int indicePonto = 0;\n        int totalPontos = 3;\n        int proximo = (indicePonto + 1) % totalPontos;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["indicePonto","totalPontos","%","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Proximo Ponto: 1";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_26_5",
            title: "Pausa para Observação no Ponto",
            difficulty: "medium",
            description: "Declare float tempoEspera = 2.0f;. Emita no Console: 'Aguardando no Ponto: 2s'.",
            validationRules: { requiredPatterns: ["float tempoEspera","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tempoEspera e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoEspera = 2.0f;
        Debug.Log("Aguardando no Ponto: " + tempoEspera + "s");
    }
}`,
            tests: [
                { input: "", expected: "Aguardando no Ponto: 2s", description: "Espera de patrulha" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float tempoEspera, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Aguardando no Ponto: 2s" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float tempoEspera = 2.0f;\n        Debug.Log(\"Aguardando no Ponto: \" + tempoEspera + \"s\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float tempoEspera","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Aguardando no Ponto: 2s";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 27 — SHADERS BÁSICOS E MATERIAIS PBR
// ═══════════════════════════════════════════════════════
{
    id: 27,
    title: "Shaders Básicos e Materiais PBR",
    theme: "Módulo 8 — Interface e Sistemas",
    unlock: "Shader Rúnico",
    unlockIcon: "[SHAD]",
    character: "arkan",
    xpReward: 340,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 8 — Interface e Sistemas — Assunto #28."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Shaders Básicos e Materiais PBR. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ARKAN VELOR",
                "role": "MESTRE DA GUILDA",
                "cssClass": "arkan",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Shaders Básicos e Materiais PBR</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "SHADERS BÁSICOS E MATERIAIS PBR",
        explanation: "Estudo aprofundado de Shaders Básicos e Materiais PBR no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);
    }
}`
    },
    example: {
        title: "Exemplo — Shaders Básicos e Materiais PBR",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);
    }
}`,
        output: "Cor Albedo: Vermelho_Carmim"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Shaders Básicos e Materiais PBR e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare corBase e imprima
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Shaders Básicos e Materiais PBR:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare corBase e imprima
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);
    }
}`,
                hint: "Cor Albedo: Vermelho_Carmim"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_27_1",
            title: "Configuração de Cor Albedo PBR",
            difficulty: "easy",
            description: "Declare string corBase = 'Vermelho_Carmim';. Emita no Console: 'Cor Albedo: Vermelho_Carmim'.",
            validationRules: { requiredPatterns: ["corBase","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare corBase e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);
    }
}`,
            tests: [
                { input: "", expected: "Cor Albedo: Vermelho_Carmim", description: "Cor Albedo do shader" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: corBase, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Cor Albedo: Vermelho_Carmim" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string corBase = \"Vermelho_Carmim\";\n        Debug.Log(\"Cor Albedo: \" + corBase);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["corBase","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Cor Albedo: Vermelho_Carmim";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_2",
            title: "Grau Metálico (Metallic)",
            difficulty: "easy",
            description: "Declare float metallic = 0.9f;. Emita no Console: 'Grau Metalico: 0.9'.",
            validationRules: { requiredPatterns: ["float metallic","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare metallic e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float metallic = 0.9f;
        Debug.Log("Grau Metalico: " + metallic);
    }
}`,
            tests: [
                { input: "", expected: "Grau Metalico: 0.9", description: "Propriedade Metallic" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float metallic, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Grau Metalico: 0.9" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float metallic = 0.9f;\n        Debug.Log(\"Grau Metalico: \" + metallic);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float metallic","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Grau Metalico: 0.9";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_3",
            title: "Rugosidade e Suavidade (Smoothness)",
            difficulty: "medium",
            description: "Declare float smoothness = 0.75f;. Emita no Console: 'Suavidade de Reflexo: 0.75'.",
            validationRules: { requiredPatterns: ["float smoothness","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare smoothness e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float smoothness = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + smoothness);
    }
}`,
            tests: [
                { input: "", expected: "Suavidade de Reflexo: 0.75", description: "Propriedade Smoothness" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float smoothness, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Suavidade de Reflexo: 0.75" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float smoothness = 0.75f;\n        Debug.Log(\"Suavidade de Reflexo: \" + smoothness);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float smoothness","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Suavidade de Reflexo: 0.75";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_4",
            title: "Emissão de Luz Própria (Emission)",
            difficulty: "medium",
            description: "Declare bool temEmissao = true; e float intensidadeEmissao = 2.0f;. Se temEmissao, emita 'Emissao Ativa: 2x'.",
            validationRules: { requiredPatterns: ["bool temEmissao","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se ha emissao de luz
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool temEmissao = true;
        float intensidadeEmissao = 2.0f;
        if (temEmissao)
        {
            Debug.Log("Emissao Ativa: " + intensidadeEmissao + "x");
        }
    }
}`,
            tests: [
                { input: "", expected: "Emissao Ativa: 2x", description: "Emission shader property" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool temEmissao, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Emissao Ativa: 2x" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool temEmissao = true;\n        float intensidadeEmissao = 2.0f;\n        if (temEmissao)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool temEmissao","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Emissao Ativa: 2x";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_27_5",
            title: "Troca Dinâmica de Material",
            difficulty: "medium",
            description: "Declare string materialAtual = 'Padrao';. Quando atingido (bool atingido = true), troque materialAtual para 'Dano_Flash' e emita 'Material: ' + materialAtual.",
            validationRules: { requiredPatterns: ["materialAtual","bool atingido","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Troque o material em caso de dano
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string materialAtual = "Padrao";
        bool atingido = true;
        if (atingido)
        {
            materialAtual = "Dano_Flash";
        }
        Debug.Log("Material: " + materialAtual);
    }
}`,
            tests: [
                { input: "", expected: "Material: Dano_Flash", description: "Troca dinâmica de material" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: materialAtual, bool atingido" },
                { level: "II", text: "A saída no console deve conter exatamente: Material: Dano_Flash" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string materialAtual = \"Padrao\";\n        bool atingido = true;\n        if (atingido)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["materialAtual","bool atingido","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Material: Dano_Flash";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 28 — INSTANTIATE E DESTROY DINÂMICOS
// ═══════════════════════════════════════════════════════
{
    id: 28,
    title: "Instantiate e Destroy Dinâmicos",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Gerador Instantiate",
    unlockIcon: "[SPAWN]",
    character: "orin",
    xpReward: 350,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #29."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Instantiate e Destroy Dinâmicos. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ORIN VALE",
                "role": "ARTÍFICE DE CENÁRIOS",
                "cssClass": "orin",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Instantiate e Destroy Dinâmicos</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "INSTANTIATE E DESTROY DINÂMICOS",
        explanation: "Estudo aprofundado de Instantiate e Destroy Dinâmicos no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");
    }
}`
    },
    example: {
        title: "Exemplo — Instantiate e Destroy Dinâmicos",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");
    }
}`,
        output: "Instantiate: Projetil_Fogo gerado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Instantiate e Destroy Dinâmicos e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie o prefab e imprima
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 29 — OBJECT POOLING & OTIMIZAÇÃO DE GC
// ═══════════════════════════════════════════════════════
{
    id: 29,
    title: "Object Pooling & Otimização de GC",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Reservatório Pool",
    unlockIcon: "[POOL]",
    character: "lyra",
    xpReward: 360,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #30."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Object Pooling & Otimização de GC. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "LYRA NEX",
                "role": "ARQUIVISTA",
                "cssClass": "lyra",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Object Pooling & Otimização de GC</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "OBJECT POOLING & OTIMIZAÇÃO DE GC",
        explanation: "Estudo aprofundado de Object Pooling & Otimização de GC no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_1");
        Debug.Log("Pool Criado com: " + pool.Count + " item");
    }
}`
    },
    example: {
        title: "Exemplo — Object Pooling & Otimização de GC",
        code: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_1");
        Debug.Log("Pool Criado com: " + pool.Count + " item");
    }
}`,
        output: "Pool Criado com: 1 item"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Object Pooling & Otimização de GC e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o pool com Queue e enfileire um item
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Object Pooling & Otimização de GC:",
                starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o pool com Queue e enfileire um item
    }
}`,
                solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_1");
        Debug.Log("Pool Criado com: " + pool.Count + " item");
    }
}`,
                hint: "Pool Criado com: 1 item"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_29_1",
            title: "Fila de Pooling com Queue",
            difficulty: "easy",
            description: "Crie uma fila Queue<string> pool = new Queue<string>();. Adicione 'Projetil_1' usando .Enqueue('Projetil_1') e emita 'Pool Criado com: ' + pool.Count + ' item'.",
            validationRules: { requiredPatterns: ["Queue<string> pool",".Enqueue(","pool.Count"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o pool com Queue e enfileire um item
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_1");
        Debug.Log("Pool Criado com: " + pool.Count + " item");
    }
}`,
            tests: [
                { input: "", expected: "Pool Criado com: 1 item", description: "Fila de pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Queue<string> pool, .Enqueue(" },
                { level: "II", text: "A saída no console deve conter exatamente: Pool Criado com: 1 item" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_1\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool",".Enqueue(","pool.Count"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Pool Criado com: 1 item";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_2",
            title: "Resgate de Instância (Dequeue)",
            difficulty: "easy",
            description: "Adicione 'Projetil_A' e 'Projetil_B' na fila. Resgate o primeiro elemento com pool.Dequeue() e emita 'Item Reutilizado: ' + item.",
            validationRules: { requiredPatterns: ["Queue<string> pool",".Dequeue()","Debug.Log"] },
            starterCode: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Enfileire 2 itens e desinfileire 1
    }
}`,
            solution: `using UnityEngine;
using System.Collections.Generic;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Queue<string> pool = new Queue<string>();
        pool.Enqueue("Projetil_A");
        pool.Enqueue("Projetil_B");
        string item = pool.Dequeue();
        Debug.Log("Item Reutilizado: " + item);
    }
}`,
            tests: [
                { input: "", expected: "Item Reutilizado: Projetil_A", description: "Dequeue do pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: Queue<string> pool, .Dequeue()" },
                { level: "II", text: "A saída no console deve conter exatamente: Item Reutilizado: Projetil_A" },
                { level: "III", text: "Exemplo estrutural:\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue(\"Projetil_A\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["Queue<string> pool",".Dequeue()","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Item Reutilizado: Projetil_A";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_3",
            title: "Reutilização Sem Garbage Collection",
            difficulty: "medium",
            description: "Declare int objetosInstanciados = 10; e int gcAllocBytes = 0;. Emita no Console: 'Alocacao de GC Evitada: 0 bytes'.",
            validationRules: { requiredPatterns: ["gcAllocBytes","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare gcAllocBytes e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int gcAllocBytes = 0;
        Debug.Log("Alocacao de GC Evitada: " + gcAllocBytes + " bytes");
    }
}`,
            tests: [
                { input: "", expected: "Alocacao de GC Evitada: 0 bytes", description: "Otimização de GC" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: gcAllocBytes, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Alocacao de GC Evitada: 0 bytes" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int gcAllocBytes = 0;\n        Debug.Log(\"Alocacao de GC Evitada: \" + gcAllocBytes + \" bytes\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["gcAllocBytes","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Alocacao de GC Evitada: 0 bytes";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_4",
            title: "Devolução de Objeto ao Pool (Desativação)",
            difficulty: "medium",
            description: "Declare bool estaAtivo = false;. Emita no Console: 'Objeto Devolvido ao Pool (Ativo: False)'.",
            validationRules: { requiredPatterns: ["bool estaAtivo","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure estaAtivo e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool estaAtivo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + estaAtivo + ")");
    }
}`,
            tests: [
                { input: "", expected: "Objeto Devolvido ao Pool (Ativo: False)", description: "Desativação ao devolver ao pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool estaAtivo, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Objeto Devolvido ao Pool (Ativo: False)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool estaAtivo = false;\n        Debug.Log(\"Objeto Devolvido ao Pool (Ativo: \" + estaAtivo + \")\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool estaAtivo","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Objeto Devolvido ao Pool (Ativo: False)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_29_5",
            title: "Capacidade Máxima do Pool",
            difficulty: "medium",
            description: "Declare int capacidadeMaxima = 50;. Emita no Console: 'Capacidade do Pool: 50 unidades'.",
            validationRules: { requiredPatterns: ["int capacidadeMaxima","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare capacidadeMaxima e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int capacidadeMaxima = 50;
        Debug.Log("Capacidade do Pool: " + capacidadeMaxima + " unidades");
    }
}`,
            tests: [
                { input: "", expected: "Capacidade do Pool: 50 unidades", description: "Teto do pool" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int capacidadeMaxima, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Capacidade do Pool: 50 unidades" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int capacidadeMaxima = 50;\n        Debug.Log(\"Capacidade do Pool: \" + capacidadeMaxima + \" unidades\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int capacidadeMaxima","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Capacidade do Pool: 50 unidades";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 30 — SCRIPTABLEOBJECTS & ARQUITETURA MODULAR
// ═══════════════════════════════════════════════════════
{
    id: 30,
    title: "ScriptableObjects & Arquitetura Modular",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Scriptable Cristal",
    unlockIcon: "[SO]",
    character: "elion",
    xpReward: 370,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #31."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de ScriptableObjects & Arquitetura Modular. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ELION RAVEN",
                "role": "MESTRE ESCRIBA",
                "cssClass": "elion",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>ScriptableObjects & Arquitetura Modular</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "SCRIPTABLEOBJECTS & ARQUITETURA MODULAR",
        explanation: "Estudo aprofundado de ScriptableObjects & Arquitetura Modular no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");
    }
}`
    },
    example: {
        title: "Exemplo — ScriptableObjects & Arquitetura Modular",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");
    }
}`,
        output: "Habilidade: Meteoro | Custo: 40 Mana"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de ScriptableObjects & Arquitetura Modular e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os dados e imprima
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 31 — SAVE E LOAD COM PLAYERPREFS
// ═══════════════════════════════════════════════════════
{
    id: 31,
    title: "Save e Load com PlayerPrefs",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Memória PlayerPrefs",
    unlockIcon: "[SAVE]",
    character: "mira",
    xpReward: 380,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #32."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Save e Load com PlayerPrefs. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "MIRA SOLENN",
                "role": "CARTÓGRAFA DIMENSIONAL",
                "cssClass": "mira",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Save e Load com PlayerPrefs</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "SAVE E LOAD COM PLAYERPREFS",
        explanation: "Estudo aprofundado de Save e Load com PlayerPrefs no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetInt("HighScore", 2500);
        int score = PlayerPrefs.GetInt("HighScore", 0);
        Debug.Log("HighScore Salvo: " + score);
    }
}`
    },
    example: {
        title: "Exemplo — Save e Load com PlayerPrefs",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        PlayerPrefs.SetInt("HighScore", 2500);
        int score = PlayerPrefs.GetInt("HighScore", 0);
        Debug.Log("HighScore Salvo: " + score);
    }
}`,
        output: "HighScore Salvo: 2500"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Save e Load com PlayerPrefs e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Salve e recupere HighScore
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 32 — SAVE E LOAD COM JSON E SERIALIZAÇÃO
// ═══════════════════════════════════════════════════════
{
    id: 32,
    title: "Save e Load com JSON e Serialização",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Registro JSON",
    unlockIcon: "[JSON]",
    character: "lyra",
    xpReward: 390,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #33."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Save e Load com JSON e Serialização. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "LYRA NEX",
                "role": "ARQUIVISTA",
                "cssClass": "lyra",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Save e Load com JSON e Serialização</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "SAVE E LOAD COM JSON E SERIALIZAÇÃO",
        explanation: "Estudo aprofundado de Save e Load com JSON e Serialização no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string json = "{\\"fase\\":3,\\"moedas\\":150}";
        Debug.Log("JSON: " + json);
    }
}`
    },
    example: {
        title: "Exemplo — Save e Load com JSON e Serialização",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string json = "{\\"fase\\":3,\\"moedas\\":150}";
        Debug.Log("JSON: " + json);
    }
}`,
        output: "JSON: {\"fase\":3,\"moedas\":150}"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Save e Load com JSON e Serialização e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure a string json e imprima
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 33 — COROUTINES E FLUXO TEMPORAL
// ═══════════════════════════════════════════════════════
{
    id: 33,
    title: "Coroutines e Fluxo Temporal",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Fita Coroutine",
    unlockIcon: "[CORO]",
    character: "orin",
    xpReward: 400,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #34."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Coroutines e Fluxo Temporal. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ORIN VALE",
                "role": "ARTÍFICE DE CENÁRIOS",
                "cssClass": "orin",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Coroutines e Fluxo Temporal</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "COROUTINES E FLUXO TEMPORAL",
        explanation: "Estudo aprofundado de Coroutines e Fluxo Temporal no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);
    }
}`
    },
    example: {
        title: "Exemplo — Coroutines e Fluxo Temporal",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);
    }
}`,
        output: "Passo 1: Iniciado\nPasso 2: Concluido"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Coroutines e Fluxo Temporal e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare p1 e p2 e emita os dois passos da corotina
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Coroutines e Fluxo Temporal:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare p1 e p2 e emita os dois passos da corotina
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);
    }
}`,
                hint: "Passo 1: Iniciado"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_33_1",
            title: "Execução Temporal com Delay",
            difficulty: "easy",
            description: "Declare string p1 = 'Passo 1: Iniciado'; e string p2 = 'Passo 2: Concluido';. Emita ambas em linhas separadas no Console.",
            validationRules: { requiredPatterns: ["string p1","string p2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare p1 e p2 e emita os dois passos da corotina
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);
    }
}`,
            tests: [
                { input: "", expected: "Passo 1: Iniciado\nPasso 2: Concluido", description: "Sequência temporal" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string p1, string p2" },
                { level: "II", text: "A saída no console deve conter exatamente: Passo 1: Iniciado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string p1 = \"Passo 1: Iniciado\";\n        string p2 = \"Passo 2: Concluido\";\n        Debug.Log(p1);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string p1","string p2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Passo 1: Iniciado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_2",
            title: "Tempo de Espera (WaitForSeconds)",
            difficulty: "easy",
            description: "Declare float tempoEspera = 1.5f;. Emita no Console: 'Aguardando: 1.5 segundos'.",
            validationRules: { requiredPatterns: ["float tempoEspera","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare tempoEspera e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoEspera = 1.5f;
        Debug.Log("Aguardando: " + tempoEspera + " segundos");
    }
}`,
            tests: [
                { input: "", expected: "Aguardando: 1.5 segundos", description: "WaitForSeconds delay" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float tempoEspera, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Aguardando: 1.5 segundos" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float tempoEspera = 1.5f;\n        Debug.Log(\"Aguardando: \" + tempoEspera + \" segundos\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float tempoEspera","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Aguardando: 1.5 segundos";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_3",
            title: "Contagem Regressiva de Corotina",
            difficulty: "medium",
            description: "Use um for de 3 até 1 simulando um timer assíncrono: imprima 'Timer: ' + i e ao final 'Lancamento!'.",
            validationRules: { requiredPatterns: ["for","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Faca a contagem regressiva e o lancamento
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");
    }
}`,
            tests: [
                { input: "", expected: "Timer: 3\nTimer: 2\nTimer: 1\nLancamento!", description: "Contagem regressiva de corotina" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: for, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Timer: 3" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        for (int i = 3; i >= 1; i--)\n        {\n            Debug.Log(\"Timer: \" + i);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["for","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Timer: 3";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_4",
            title: "Disparo com StartCoroutine",
            difficulty: "medium",
            description: "Declare string statusCoro = 'StartCoroutine: Rotina Disparada';. Emita no Console o valor de statusCoro.",
            validationRules: { requiredPatterns: ["string statusCoro","statusCoro","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusCoro e emita a inicializacao da corotina
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusCoro = "StartCoroutine: Rotina Disparada";
        Debug.Log(statusCoro);
    }
}`,
            tests: [
                { input: "", expected: "StartCoroutine: Rotina Disparada", description: "StartCoroutine" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusCoro, statusCoro" },
                { level: "II", text: "A saída no console deve conter exatamente: StartCoroutine: Rotina Disparada" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusCoro = \"StartCoroutine: Rotina Disparada\";\n        Debug.Log(statusCoro);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusCoro","statusCoro","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "StartCoroutine: Rotina Disparada";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_33_5",
            title: "Interrupção com StopCoroutine",
            difficulty: "medium",
            description: "Declare bool jogadorCancelou = true;. Se for verdadeiro, emita 'StopCoroutine: Execucao Interrompida'.",
            validationRules: { requiredPatterns: ["bool jogadorCancelou","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se o jogador cancelou a acao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool jogadorCancelou = true;
        if (jogadorCancelou)
        {
            Debug.Log("StopCoroutine: Execucao Interrompida");
        }
    }
}`,
            tests: [
                { input: "", expected: "StopCoroutine: Execucao Interrompida", description: "Interrupção de corotina" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool jogadorCancelou, if" },
                { level: "II", text: "A saída no console deve conter exatamente: StopCoroutine: Execucao Interrompida" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool jogadorCancelou = true;\n        if (jogadorCancelou)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool jogadorCancelou","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "StopCoroutine: Execucao Interrompida";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 34 — DELEGATES E EVENTS DESACOPLADOS
// ═══════════════════════════════════════════════════════
{
    id: 34,
    title: "Delegates e Events Desacoplados",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Arauto de Eventos",
    unlockIcon: "[EVENT]",
    character: "elion",
    xpReward: 410,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #35."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Delegates e Events Desacoplados. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ELION RAVEN",
                "role": "MESTRE ESCRIBA",
                "cssClass": "elion",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Delegates e Events Desacoplados</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "DELEGATES E EVENTS DESACOPLADOS",
        explanation: "Estudo aprofundado de Delegates e Events Desacoplados no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string status = "Jogador Derrotado";
        Action onPlayerDied = () => Debug.Log("Evento: " + status);
        onPlayerDied();
    }
}`
    },
    example: {
        title: "Exemplo — Delegates e Events Desacoplados",
        code: `using UnityEngine;
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
        output: "Evento: Jogador Derrotado"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Delegates e Events Desacoplados e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;
using System;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare status, Action e execute-a
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 35 — INTERFACES E CONTRATOS DE CÓDIGO
// ═══════════════════════════════════════════════════════
{
    id: 35,
    title: "Interfaces e Contratos de Código",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Pacto de Interfaces",
    unlockIcon: "[ITF]",
    character: "kael",
    xpReward: 420,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #36."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Interfaces e Contratos de Código. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "KAEL DRAVEN",
                "role": "CAMPEÃO DE COMBATE",
                "cssClass": "kael",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Interfaces e Contratos de Código</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "INTERFACES E CONTRATOS DE CÓDIGO",
        explanation: "Estudo aprofundado de Interfaces e Contratos de Código no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");
    }
}`
    },
    example: {
        title: "Exemplo — Interfaces e Contratos de Código",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");
    }
}`,
        output: "IDamageable: Tomou 30 de dano"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Interfaces e Contratos de Código e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure o dano e emita
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
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 36 — TRATAMENTO DE EXCEÇÕES COM TRY/CATCH
// ═══════════════════════════════════════════════════════
{
    id: 36,
    title: "Tratamento de Exceções com Try/Catch",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Escudo TryCatch",
    unlockIcon: "[TRY]",
    character: "mira",
    xpReward: 430,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #37."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Tratamento de Exceções com Try/Catch. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "MIRA SOLENN",
                "role": "CARTÓGRAFA DIMENSIONAL",
                "cssClass": "mira",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Tratamento de Exceções com Try/Catch</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "TRATAMENTO DE EXCEÇÕES COM TRY/CATCH",
        explanation: "Estudo aprofundado de Tratamento de Exceções com Try/Catch no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch
        {
            Debug.Log("Erro capturado");
        }
    }
}`
    },
    example: {
        title: "Exemplo — Tratamento de Exceções com Try/Catch",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch
        {
            Debug.Log("Erro capturado");
        }
    }
}`,
        output: "Processamento Seguro: 100"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Tratamento de Exceções com Try/Catch e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use try/catch e emita o valor processado
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Tratamento de Exceções com Try/Catch:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use try/catch e emita o valor processado
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch
        {
            Debug.Log("Erro capturado");
        }
    }
}`,
                hint: "Processamento Seguro: 100"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_36_1",
            title: "Tratamento de Exceção Simples com Try/Catch",
            difficulty: "easy",
            description: "Utilize uma estrutura try/catch: no bloco try, execute int valor = 100; e emita 'Processamento Seguro: ' + valor.",
            validationRules: { requiredPatterns: ["try","catch","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Use try/catch e emita o valor processado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch
        {
            Debug.Log("Erro capturado");
        }
    }
}`,
            tests: [
                { input: "", expected: "Processamento Seguro: 100", description: "Try/catch básico" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: try, catch" },
                { level: "II", text: "A saída no console deve conter exatamente: Processamento Seguro: 100" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        try\n        {\n            int valor = 100;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["try","catch","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Processamento Seguro: 100";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_2",
            title: "Prevenção de Divisão por Zero",
            difficulty: "easy",
            description: "Declare int divisor = 0;. Se divisor == 0, emita 'Aviso: Divisao por Zero Evitada!', senão divida.",
            validationRules: { requiredPatterns: ["int divisor","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide divisor antes de calcular
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int divisor = 0;
        if (divisor == 0)
        {
            Debug.Log("Aviso: Divisao por Zero Evitada!");
        }
    }
}`,
            tests: [
                { input: "", expected: "Aviso: Divisao por Zero Evitada!", description: "Prevenção de divisão por zero" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int divisor, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Aviso: Divisao por Zero Evitada!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int divisor = 0;\n        if (divisor == 0)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int divisor","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Aviso: Divisao por Zero Evitada!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_3",
            title: "Tratamento de NullReferenceException",
            difficulty: "medium",
            description: "Simule a checagem defensiva de componente nulo: declare bool componenteExiste = false;. Se não existir, emita 'Erro Evitado: Componente Nulo'.",
            validationRules: { requiredPatterns: ["bool componenteExiste","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque se o componente e nulo
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        bool componenteExiste = false;
        if (!componenteExiste)
        {
            Debug.Log("Erro Evitado: Componente Nulo");
        }
    }
}`,
            tests: [
                { input: "", expected: "Erro Evitado: Componente Nulo", description: "Defensive null check" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: bool componenteExiste, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Erro Evitado: Componente Nulo" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        bool componenteExiste = false;\n        if (!componenteExiste)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["bool componenteExiste","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Erro Evitado: Componente Nulo";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_4",
            title: "Bloco Finally de Limpeza",
            difficulty: "medium",
            description: "Declare string statusLimpeza = 'Bloco Finally: Arquivo Fechado';. Emita a mensagem com Debug.Log.",
            validationRules: { requiredPatterns: ["string statusLimpeza","statusLimpeza","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare statusLimpeza e emita a finalizacao do bloco
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string statusLimpeza = "Bloco Finally: Arquivo Fechado";
        Debug.Log(statusLimpeza);
    }
}`,
            tests: [
                { input: "", expected: "Bloco Finally: Arquivo Fechado", description: "Bloco finally" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string statusLimpeza, statusLimpeza" },
                { level: "II", text: "A saída no console deve conter exatamente: Bloco Finally: Arquivo Fechado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string statusLimpeza = \"Bloco Finally: Arquivo Fechado\";\n        Debug.Log(statusLimpeza);\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string statusLimpeza","statusLimpeza","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Bloco Finally: Arquivo Fechado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_36_5",
            title: "Lançamento de Erro Personalizado (Throw)",
            difficulty: "medium",
            description: "Declare int nivelRequerido = 50; int nivelPlayer = 20;. Se nivelPlayer < nivelRequerido, emita 'Excecao: Nivel Insuficiente para Entrar'.",
            validationRules: { requiredPatterns: ["nivelRequerido","nivelPlayer","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Valide o nivel e lance a mensagem
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int nivelRequerido = 50;
        int nivelPlayer = 20;
        if (nivelPlayer < nivelRequerido)
        {
            Debug.Log("Excecao: Nivel Insuficiente para Entrar");
        }
    }
}`,
            tests: [
                { input: "", expected: "Excecao: Nivel Insuficiente para Entrar", description: "Validação de exceção de regra de negócio" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: nivelRequerido, nivelPlayer" },
                { level: "II", text: "A saída no console deve conter exatamente: Excecao: Nivel Insuficiente para Entrar" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int nivelRequerido = 50;\n        int nivelPlayer = 20;\n        if (nivelPlayer < nivelRequerido)" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["nivelRequerido","nivelPlayer","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Excecao: Nivel Insuficiente para Entrar";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 37 — OTIMIZAÇÃO, PROFILING E DRAW CALLS
// ═══════════════════════════════════════════════════════
{
    id: 37,
    title: "Otimização, Profiling e Draw Calls",
    theme: "Módulo 9 — Avançado (Tópicos PTS)",
    unlock: "Códice Supremo da Engine",
    unlockIcon: "[OPT]",
    character: "arkan",
    xpReward: 450,
    story: [
        {
                "type": "system",
                "text": "[ SISTEMA ] Inicializando Protocolo do Módulo 9 — Avançado (Tópicos PTS) — Assunto #38."
        },
        {
                "type": "narrative",
                "text": "A Cidadela Dimensional calibra os subsistemas de Otimização, Profiling e Draw Calls. Os códigos da engine ganham densidade e forma."
        },
        {
                "type": "character",
                "name": "ARKAN VELOR",
                "role": "MESTRE DA GUILDA",
                "cssClass": "arkan",
                "text": "Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>Otimização, Profiling e Draw Calls</span>. Cada linha molda o comportamento e a estabilidade da simulação!"
        },
        {
                "type": "gm",
                "name": "GM",
                "role": "Guia do Sistema",
                "cssClass": "gm",
                "text": "Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional."
        }
],
    concept: {
        title: "OTIMIZAÇÃO, PROFILING E DRAW CALLS",
        explanation: "Estudo aprofundado de Otimização, Profiling e Draw Calls no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);
    }
}`
    },
    example: {
        title: "Exemplo — Otimização, Profiling e Draw Calls",
        code: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);
    }
}`,
        output: "Draw Calls Reduzidos de 120 para 25"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Otimização, Profiling e Draw Calls e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os valores e emita a reducao
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Otimização, Profiling e Draw Calls:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os valores e emita a reducao
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);
    }
}`,
                hint: "Draw Calls Reduzidos de 120 para 25"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_37_1",
            title: "Otimização de Draw Calls com Batching",
            difficulty: "easy",
            description: "Declare int drawCallsAntes = 120; int drawCallsDepois = 25;. Emita: 'Draw Calls Reduzidos de 120 para 25'.",
            validationRules: { requiredPatterns: ["drawCallsAntes","drawCallsDepois","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare os valores e emita a reducao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);
    }
}`,
            tests: [
                { input: "", expected: "Draw Calls Reduzidos de 120 para 25", description: "Redução de draw calls" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: drawCallsAntes, drawCallsDepois" },
                { level: "II", text: "A saída no console deve conter exatamente: Draw Calls Reduzidos de 120 para 25" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int drawCallsAntes = 120;\n        int drawCallsDepois = 25;\n        Debug.Log(\"Draw Calls Reduzidos de \" + drawCallsAntes + \" para \" + drawCallsDepois);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["drawCallsAntes","drawCallsDepois","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Draw Calls Reduzidos de 120 para 25";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_2",
            title: "Ocultamento por Oclusão (Occlusion Culling)",
            difficulty: "easy",
            description: "Declare int objetosNaCena = 1000; int objetosRenderizados = 150;. Emita no Console: 'Renderizados com Oclusao: 150/1000'.",
            validationRules: { requiredPatterns: ["objetosNaCena","objetosRenderizados","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os objetos e emita
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int objetosNaCena = 1000;
        int objetosRenderizados = 150;
        Debug.Log("Renderizados com Oclusao: " + objetosRenderizados + "/" + objetosNaCena);
    }
}`,
            tests: [
                { input: "", expected: "Renderizados com Oclusao: 150/1000", description: "Occlusion Culling" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: objetosNaCena, objetosRenderizados" },
                { level: "II", text: "A saída no console deve conter exatamente: Renderizados com Oclusao: 150/1000" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int objetosNaCena = 1000;\n        int objetosRenderizados = 150;\n        Debug.Log(\"Renderizados com Oclusao: \" + objetosRenderizados + \"/\" + objetosNaCena);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["objetosNaCena","objetosRenderizados","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Renderizados com Oclusao: 150/1000";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_3",
            title: "Níveis de Detalhe (LOD Group)",
            difficulty: "medium",
            description: "Declare float distanciaCamera = 60.0f;. Se distanciaCamera >= 50.0f, defina lod = 'LOD2 (Baixo)' e emita 'Malha Ativa: ' + lod.",
            validationRules: { requiredPatterns: ["distanciaCamera","if","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Cheque a distancia e selecione o LOD
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float distanciaCamera = 60.0f;
        if (distanciaCamera >= 50.0f)
        {
            string lod = "LOD2 (Baixo)";
            Debug.Log("Malha Ativa: " + lod);
        }
    }
}`,
            tests: [
                { input: "", expected: "Malha Ativa: LOD2 (Baixo)", description: "LOD Group" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: distanciaCamera, if" },
                { level: "II", text: "A saída no console deve conter exatamente: Malha Ativa: LOD2 (Baixo)" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float distanciaCamera = 60.0f;\n        if (distanciaCamera >= 50.0f)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["distanciaCamera","if","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Malha Ativa: LOD2 (Baixo)";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_4",
            title: "Estabilidade de Taxa de Quadros (TargetFrameRate)",
            difficulty: "medium",
            description: "Declare int targetFps = 60;. Emita no Console: 'Trava de FPS: 60 FPS'.",
            validationRules: { requiredPatterns: ["int targetFps","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare targetFps e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int targetFps = 60;
        Debug.Log("Trava de FPS: " + targetFps + " FPS");
    }
}`,
            tests: [
                { input: "", expected: "Trava de FPS: 60 FPS", description: "TargetFrameRate" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: int targetFps, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Trava de FPS: 60 FPS" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int targetFps = 60;\n        Debug.Log(\"Trava de FPS: \" + targetFps + \" FPS\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["int targetFps","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Trava de FPS: 60 FPS";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_37_5",
            title: "Monitoramento de Memória no Profiler",
            difficulty: "medium",
            description: "Declare float memoriaUsadaMB = 450.5f;. Emita no Console: 'Memoria Alocada: 450.5 MB'.",
            validationRules: { requiredPatterns: ["float memoriaUsadaMB","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare memoriaUsadaMB e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float memoriaUsadaMB = 450.5f;
        Debug.Log("Memoria Alocada: " + memoriaUsadaMB + " MB");
    }
}`,
            tests: [
                { input: "", expected: "Memoria Alocada: 450.5 MB", description: "Profiler de memória" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: float memoriaUsadaMB, Debug.Log" },
                { level: "II", text: "A saída no console deve conter exatamente: Memoria Alocada: 450.5 MB" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        float memoriaUsadaMB = 450.5f;\n        Debug.Log(\"Memoria Alocada: \" + memoriaUsadaMB + \" MB\");\n    }" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["float memoriaUsadaMB","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Memoria Alocada: 450.5 MB";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
}
];

if (typeof module !== 'undefined') {
    module.exports = { CSHARP_CHAPTERS };
}
if (typeof window !== 'undefined') {
    window.CSHARP_CHAPTERS = CSHARP_CHAPTERS;
}
