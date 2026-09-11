/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 06
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 06 — CLASSES E OBJETOS (OOP)
// ═══════════════════════════════════════════════════════

const CAP_06 = {
    id: 6,
    artifactReward: { artifactId: "Ring_Oroborus", minStars: 3, maxStars: 5 },
    title: "Classes e Objetos (OOP)",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Orbe Objeto",
    unlockIcon: "[OOP]",
    character: "mira",
    xpReward: 130,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Conjurando os Pilares da Orientação a Objetos. Matriz de blueprints ativada."
            },
            {
                    "type": "narrative",
                    "text": "Mira Solenn projeta hologramas tridimensionais de construtos e entidades no centro do ateliê arcano. Cada molde gera instâncias vivas e autônomas."
            },
            {
                    "type": "character",
                    "name": "MIRA SOLIS",
                    "role": "CARTÓGRAFA & ARTÍFICE",
                    "cssClass": "mira",
                    "text": "Uma classe é o molde sagrado, a planta arquitetônica de uma entidade. Quando invocamos a palavra-chave <code>new</code>, damos vida a um objeto concreto que possui seus próprios dados e comportamentos!"
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Para inicializar um objeto com valores corretos desde o nascimento, utilizamos métodos construtores. Para proteger campos críticos contra alterações descontroladas, empregamos propriedades com <code>{ get; set; }</code>, garantindo o encapsulamento seguro."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "Neste capítulo, você aprenderá a instanciar entidades, configurar atributos em construtores, trabalhar com métodos de instância para desferir ataques e rastrear a contagem de inimigos ativos na simulação."
            }
    ],
    concept: {
        title: "PROGRAMAÇÃO ORIENTADA A OBJETOS: CLASSES, CONSTRUTORES, PROPRIEDADES E INSTÂNCIAS",
        explanation: "A Programação Orientada a Objetos (OOP) modela o jogo em torno de entidades que combinam dados (campos e propriedades) e ações (métodos):\n<ul>\n  <li><strong>Classes e Instanciação:</strong> Uma classe define a estrutura. Criamos uma instância usando <code>new NomeDaClasse()</code>: <code>ItemEspada item = new ItemEspada(); item.nome = \"Espada\"; item.poder = 45;</code>.</li>\n  <li><strong>Método Construtor:</strong> Método especial com o mesmo nome da classe, sem tipo de retorno, invocado automaticamente na criação: <code>public Entidade(string h, int n) { heroi = h; nivel = n; }</code>.</li>\n  <li><strong>Encapsulamento com Propriedades (<code>{ get; set; }</code>):</strong> Protege e controla o acesso a variáveis internas, permitindo expor valores de forma segura (ex: <code>public int VidaAtual { get; set; }</code> e <code>public int VidaMaxima { get; set; }</code>).</li>\n  <li><strong>Métodos de Instância:</strong> Métodos que operam sobre os dados da própria instância, como calcular danoCausado a partir de um danoBase multiplicado pela forca: <code>public int DesferirAtaque() { return danoBase * forca; }</code>.</li>\n  <li><strong>Rastreamento de Instâncias:</strong> Controla a quantidade de entidades presentes na cena gerenciando contadores e geradores de instâncias.</li>\n</ul>",
        code: `using UnityEngine;

// Definição da classe com construtor e propriedades
public class EntidadeCombate
{
    public string heroi;
    public int nivel;
    public int vidaMaxima { get; set; }
    public int vidaAtual { get; set; }
    public int danoBase;
    public int forca;

    public EntidadeCombate(string h, int n)
    {
        heroi = h;
        nivel = n;
        vidaMaxima = 100;
        vidaAtual = 75;
        danoBase = 30;
        forca = 2;
    }

    public int CalcularAtaque()
    {
        return danoBase * forca;
    }
}

public class ExemploOOP : MonoBehaviour
{
    void Start()
    {
        // 1. Instanciação e atribuição de campos
        string nomeItem = "Espada";
        int poderItem = 45;
        Debug.Log("Item: " + nomeItem + " | Poder: " + poderItem);

        // 2. Construtor inicializando entidade
        EntidadeCombate guerreiro = new EntidadeCombate("Kael", 10);
        Debug.Log("Entidade: " + guerreiro.heroi + " | Nivel: " + guerreiro.nivel);

        // 3. Acesso a propriedades encapsuladas
        Debug.Log("Vida: " + guerreiro.vidaAtual + "/" + guerreiro.vidaMaxima);

        // 4. Execução de método de instância
        int ataque = guerreiro.CalcularAtaque();
        Debug.Log("Ataque Desferido: " + ataque);

        // 5. Rastreamento de instâncias ativas
        int totalInimigos = 0;
        totalInimigos++;
        totalInimigos++;
        Debug.Log("Inimigos Ativos: " + totalInimigos);
    }
}`
    },
    example: {
        title: "Exemplo Prático — Criando e Operando Entidades da Guilda",
        code: `using UnityEngine;

public class TesteEntidades : MonoBehaviour
{
    void Start()
    {
        string itemNome = "Espada";
        int itemPoder = 45;
        Debug.Log("Item: " + itemNome + " | Poder: " + itemPoder);

        string heroi = "Kael";
        int nivel = 10;
        Debug.Log("Entidade: " + heroi + " | Nivel: " + nivel);

        int vidaMax = 100;
        int vidaAtual = 75;
        Debug.Log("Vida: " + vidaAtual + "/" + vidaMax);

        int danoBase = 30;
        int forca = 2;
        int danoCausado = danoBase * forca;
        Debug.Log("Ataque Desferido: " + danoCausado);

        int totalInimigos = 0;
        totalInimigos++;
        totalInimigos++;
        Debug.Log("Inimigos Ativos: " + totalInimigos);
    }
}`,
        output: "Item: Espada | Poder: 45\nEntidade: Kael | Nivel: 10\nVida: 75/100\nAtaque Desferido: 60\nInimigos Ativos: 2"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Classes e Objetos (OOP) e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

// Definição da classe com construtor e propriedades
public class EntidadeCombate
{
    public string heroi;
    public int nivel;
    public int vidaMaxima { get; set; }
    public int vidaAtual { get; set; }
    public int danoBase;
    public int forca;

    public EntidadeCombate(string h, int n)
    {
        heroi = h;
        nivel = n;
        vidaMaxima = 100;
        vidaAtual = 75;
        danoBase = 30;
        forca = 2;
    }

    public int CalcularAtaque()
    {
        return danoBase * forca;
    }
}

public class ExemploOOP : MonoBehaviour
{
    void Start()
    {
        // 1. Instanciação e atribuição de campos
        string nomeItem = "Espada";
        int poderItem = 45;
        Debug.Log("Item: " + nomeItem + " | Poder: " + poderItem);

        // 2. Construtor inicializando entidade
        EntidadeCombate guerreiro = new EntidadeCombate("Kael", 10);
        Debug.Log("Entidade: " + guerreiro.heroi + " | Nivel: " + guerreiro.nivel);

        // 3. Acesso a propriedades encapsuladas
        Debug.Log("Vida: " + guerreiro.vidaAtual + "/" + guerreiro.vidaMaxima);

        // 4. Execução de método de instância
        int ataque = guerreiro.CalcularAtaque();
        Debug.Log("Ataque Desferido: " + ataque);

        // 5. Rastreamento de instâncias ativas
        int totalInimigos = 0;
        totalInimigos++;
        totalInimigos++;
        Debug.Log("Inimigos Ativos: " + totalInimigos);
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
            description: "Declare a classe 'Item' com os campos públicos 'nome' (string) e 'poder' (int). Dentro de Start(), instancie um novo objeto com 'new Item()', configure 'nome' para 'Espada' e 'poder' para 45, e emita no Console: 'Item: Espada | Poder: 45'.",
            validationRules: { requiredPatterns: ["class Item", "string nome", "int poder", "new Item", "Debug.Log"] },
            starterCode: `using UnityEngine;

// 1. Declare a classe Item com os campos public string nome e public int poder
public class Item
{
    // Declare os campos publicos aqui
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 2. Instancie Item com new, atribua os valores e imprima
    }
}`,
            solution: `using UnityEngine;

public class Item
{
    public string nome;
    public int poder;
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Item espada = new Item();
        espada.nome = "Espada";
        espada.poder = 45;
        Debug.Log("Item: " + espada.nome + " | Poder: " + espada.poder);
    }
}`,
            tests: [
                { input: "", expected: "Item: Espada | Poder: 45", description: "Instanciação e atribuição de campos de classe" }
            ],
            hints: [
                {
                    level: "I",
                    text: "PASSO 1: Crie a classe Item antes de Exercicio com campos publicos:\nclasse Item {\n  campo publico string nome;\n  campo publico int poder;\n}"
                },
                {
                    level: "II",
                    text: "PASSO 2: Dentro do metodo Start(), instancie o objeto e atribua os valores:\nItem espada = new Item();\nespada.nome = \"Espada\";\nespada.poder = 45;"
                },
                {
                    level: "III",
                    text: "SOLUCAO COMPLETA (pseudo-codigo):\nclasse Item {\n  publico texto nome;\n  publico inteiro poder;\n}\nfuncao Start() {\n  Item espada = novo Item();\n  espada.nome = \"Espada\";\n  espada.poder = 45;\n  Imprimir(\"Item: \" + espada.nome + \" | Poder: \" + espada.poder);\n}"
                }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["class Item", "nome", "poder", "new Item", "Debug.Log"];
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
            description: "Defina a classe 'Entidade' com campos 'heroi' (string) e 'nivel' (int). Crie um construtor 'public Entidade(string h, int n)' que atribua os parâmetros aos campos. Em Start(), crie 'new Entidade(\"Kael\", 10)' e emita no Console: 'Entidade: Kael | Nivel: 10'.",
            validationRules: { requiredPatterns: ["class Entidade", "Entidade(", "new Entidade", "Debug.Log"] },
            starterCode: `using UnityEngine;

public class Entidade
{
    public string heroi;
    public int nivel;

    // Crie o metodo construtor que recebe (string h, int n)
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie Entidade passando "Kael" e 10 pelo construtor e imprima
    }
}`,
            solution: `using UnityEngine;

public class Entidade
{
    public string heroi;
    public int nivel;

    public Entidade(string h, int n)
    {
        this.heroi = h;
        this.nivel = n;
    }
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Entidade kael = new Entidade("Kael", 10);
        Debug.Log("Entidade: " + kael.heroi + " | Nivel: " + kael.nivel);
    }
}`,
            tests: [
                { input: "", expected: "Entidade: Kael | Nivel: 10", description: "Construtor com parâmetros" }
            ],
            hints: [
                {
                    level: "I",
                    text: "PASSO 1: O construtor tem o mesmo nome da classe e inicializa os campos:\npublico Entidade(texto h, inteiro n) {\n  heroi = h;\n  nivel = n;\n}"
                },
                {
                    level: "II",
                    text: "PASSO 2: Em Start(), instancie passando os argumentos requeridos:\nEntidade kael = new Entidade(\"Kael\", 10);"
                },
                {
                    level: "III",
                    text: "SOLUCAO COMPLETA (pseudo-codigo):\nclasse Entidade {\n  publico texto heroi;\n  publico inteiro nivel;\n  Entidade(texto h, inteiro n) {\n    heroi = h;\n    nivel = n;\n  }\n}\nfuncao Start() {\n  Entidade kael = novo Entidade(\"Kael\", 10);\n  Imprimir(\"Entidade: \" + kael.heroi + \" | Nivel: \" + kael.nivel);\n}"
                }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["class Entidade", "Entidade(", "new Entidade", "Debug.Log"];
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
            description: "Crie a classe 'Jogador' declarando propriedades auto-implementadas: 'public int vidaAtual { get; set; }' e 'public int vidaMaxima { get; set; }'. Em Start(), instancie o Jogador, defina vidaAtual = 75 e vidaMaxima = 100, e imprima: 'Vida: 75/100'.",
            validationRules: { requiredPatterns: ["class Jogador", "vidaAtual", "vidaMaxima", "new Jogador", "Debug.Log"] },
            starterCode: `using UnityEngine;

public class Jogador
{
    // Declare as propriedades vidaAtual e vidaMaxima usando { get; set; }
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie o Jogador, configure os valores e imprima
    }
}`,
            solution: `using UnityEngine;

public class Jogador
{
    public int vidaAtual { get; set; }
    public int vidaMaxima { get; set; }
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Jogador j = new Jogador();
        j.vidaAtual = 75;
        j.vidaMaxima = 100;
        Debug.Log("Vida: " + j.vidaAtual + "/" + j.vidaMaxima);
    }
}`,
            tests: [
                { input: "", expected: "Vida: 75/100", description: "Propriedades { get; set; }" }
            ],
            hints: [
                {
                    level: "I",
                    text: "PASSO 1: Declare as propriedades auto-implementadas dentro da classe Jogador:\npublico inteiro vidaAtual { get; set; }\npublico inteiro vidaMaxima { get; set; }"
                },
                {
                    level: "II",
                    text: "PASSO 2: Em Start(), crie o objeto e atribua valores as propriedades:\nJogador j = new Jogador();\nj.vidaAtual = 75;\nj.vidaMaxima = 100;"
                },
                {
                    level: "III",
                    text: "SOLUCAO COMPLETA (pseudo-codigo):\nclasse Jogador {\n  inteiro vidaAtual { get; set; }\n  inteiro vidaMaxima { get; set; }\n}\nfuncao Start() {\n  Jogador j = novo Jogador();\n  j.vidaAtual = 75;\n  j.vidaMaxima = 100;\n  Imprimir(\"Vida: \" + j.vidaAtual + \"/\" + j.vidaMaxima);\n}"
                }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["class Jogador", "vidaAtual", "vidaMaxima", "new Jogador", "Debug.Log"];
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
            description: "Defina a classe 'Arma' com campos 'public int danoBase;' e 'public int forca;'. Crie o método de instância 'public int CalcularAtaque()' que retorna o produto de 'danoBase * forca'. Em Start(), instancie Arma, atribua danoBase = 30 e forca = 2, invoque CalcularAtaque() e emita: 'Ataque Desferido: 60'.",
            validationRules: { requiredPatterns: ["class Arma", "CalcularAtaque", "return", "new Arma", "Debug.Log"] },
            starterCode: `using UnityEngine;

public class Arma
{
    public int danoBase;
    public int forca;

    // Crie o metodo public int CalcularAtaque() que retorna danoBase * forca
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie Arma, configure os valores, chame CalcularAtaque() e imprima
    }
}`,
            solution: `using UnityEngine;

public class Arma
{
    public int danoBase;
    public int forca;

    public int CalcularAtaque()
    {
        return this.danoBase * this.forca;
    }
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Arma arma = new Arma();
        arma.danoBase = 30;
        arma.forca = 2;
        int dano = arma.CalcularAtaque();
        Debug.Log("Ataque Desferido: " + dano);
    }
}`,
            tests: [
                { input: "", expected: "Ataque Desferido: 60", description: "Método de instância com retorno" }
            ],
            hints: [
                {
                    level: "I",
                    text: "PASSO 1: Crie o metodo CalcularAtaque dentro da classe Arma:\npublico inteiro CalcularAtaque() {\n  retornar danoBase * forca;\n}"
                },
                {
                    level: "II",
                    text: "PASSO 2: Em Start(), instancie Arma, configure os campos e chame o metodo:\nArma arma = new Arma();\narma.danoBase = 30;\narma.forca = 2;\ninteiro dano = arma.CalcularAtaque();"
                },
                {
                    level: "III",
                    text: "SOLUCAO COMPLETA (pseudo-codigo):\nclasse Arma {\n  inteiro danoBase; inteiro forca;\n  inteiro CalcularAtaque() {\n    retornar danoBase * forca;\n  }\n}\nfuncao Start() {\n  Arma arma = novo Arma();\n  arma.danoBase = 30;\n  arma.forca = 2;\n  inteiro total = arma.CalcularAtaque();\n  Imprimir(\"Ataque Desferido: \" + total);\n}"
                }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["class Arma", "CalcularAtaque", "return", "new Arma", "Debug.Log"];
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
            artifactReward: { artifactId: "Ring_Oroborus", minStars: 3, maxStars: 5 },
            title: "Contagem de Instâncias com Membro Estático",
            difficulty: "medium",
            description: "Crie a classe 'Inimigo' com um campo estático 'public static int totalInimigos = 0;'. No construtor 'public Inimigo()', incremente 'totalInimigos++'. Em Start(), crie duas instâncias com new Inimigo() e emita no Console: 'Inimigos Ativos: ' + Inimigo.totalInimigos.",
            validationRules: { requiredPatterns: ["class Inimigo", "static int totalInimigos", "totalInimigos++", "new Inimigo", "Debug.Log"] },
            starterCode: `using UnityEngine;

public class Inimigo
{
    // Declare o campo public static int totalInimigos = 0;
    
    // Crie o construtor public Inimigo() incrementando totalInimigos
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie dois inimigos com new e imprima Inimigo.totalInimigos
    }
}`,
            solution: `using UnityEngine;

public class Inimigo
{
    public static int totalInimigos = 0;

    public Inimigo()
    {
        totalInimigos++;
    }
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Inimigo i1 = new Inimigo();
        Inimigo i2 = new Inimigo();
        Debug.Log("Inimigos Ativos: " + Inimigo.totalInimigos);
    }
}`,
            tests: [
                { input: "", expected: "Inimigos Ativos: 2", description: "Rastreamento estático de instâncias" }
            ],
            hints: [
                {
                    level: "I",
                    text: "PASSO 1: Campos estáticos pertencem a classe:\nclasse Inimigo {\n  publico estatico inteiro totalInimigos = 0;\n  Inimigo() {\n    totalInimigos++;\n  }\n}"
                },
                {
                    level: "II",
                    text: "PASSO 2: Em Start(), crie duas instâncias chamando 'new Inimigo()' e acesse o contador através de 'Inimigo.totalInimigos'."
                },
                {
                    level: "III",
                    text: "SOLUCAO COMPLETA (pseudo-codigo):\nclasse Inimigo {\n  estatico inteiro totalInimigos = 0;\n  Inimigo() {\n    totalInimigos++;\n  }\n}\nfuncao Start() {\n  novo Inimigo();\n  novo Inimigo();\n  Imprimir(\"Inimigos Ativos: \" + Inimigo.totalInimigos);\n}"
                }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["class Inimigo", "totalInimigos", "new Inimigo", "Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Inimigos Ativos: 2";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_06 };
}
if (typeof window !== "undefined") {
    window.CAP_06 = CAP_06;
}
