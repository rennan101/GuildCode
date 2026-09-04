/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — C# & UNITY 6.5 CHAPTERS DATA (DIMENSÃO C# UNITY)
   9 Módulos estruturados de Game Development em C# e Unity 6.5.
   Personagens originais: ARKAN, LYRA, KAEL, MIRA, ORIN, ELION, GM.
   Cada capítulo contém 3 atividades completas (Teach, Test, Twist).
   ═══════════════════════════════════════════════════════════════ */

const CSHARP_CHAPTERS = [
// ═══════════════════════════════════════════════════════
// CAPÍTULO 00 — FORJA DE VARIÁVEIS E TIPOS PRIMITIVOS EM C#
// ═══════════════════════════════════════════════════════
{
    id: 0,
    title: "A Forja dos Tipos e Variáveis",
    theme: "Fundamentos C# & Console Unity",
    unlock: "Console da Dimensão",
    unlockIcon: "[C#]",
    character: "arkan",
    xpReward: 70,
    story: [
        { type: "system", text: "[ SISTEMA ] Calibrando matriz dimensional... Bem-vindo à Dimensão C# Unity 6.5." },
        { type: "narrative", text: "Vórtices de dados holográficos se materializam sobre o piso da Cidadela. O motor tridimensional da engine começa a inicializar os primeiros objetos." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Saudações, Engenheiro de Jogos. Você adentrou a <span class='highlight'>Dimensão C# Unity</span>. Aqui, o código molda a própria física e lógica dos GameObjects." },
        { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Um novo arquiteto do Unity! Nossos GameObjects estão inertes na cena. Se não definirmos seus estados e dados com tipos primitivos em C#, o mundo permanecerá congelado." },
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Os registros antigos mostram que variáveis como <code>int</code> para vida, <code>float</code> para velocidade e <code>string</code> para nomes alimentam o Console da Engine!" },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "No Unity, utilizamos <code>Debug.Log()</code> para emitir mensagens e debugar o comportamento de nossos scripts. Atenção com os números decimais: em C#, todo float deve conter o sufixo <code>f</code> (ex: <code>5.5f</code>)!" }
    ],
    concept: {
        title: "VARIÁVEIS EM C# & DEBUG.LOG",
        explanation: "Em C#, declaramos variáveis especificando o tipo (int, float, string, bool). Para imprimir saídas no Console do Unity, usamos Debug.Log(\"texto \" + valor).",
        code: `using UnityEngine;

public class StatusHeroi : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        float velocidade = 7.5f;
        string heroi = "Kael";
        bool estaAtivo = true;

        Debug.Log("Heroi: " + heroi);
        Debug.Log("Vida: " + vida + " | Vel: " + velocidade);
    }
}`
    },
    example: {
        title: "Exemplo — Status do Jogador",
        code: `using UnityEngine;

public class PlayerInfo : MonoBehaviour
{
    void Start()
    {
        int moedas = 50;
        float forca = 12.4f;
        Debug.Log("Moedas Coletadas: " + moedas);
        Debug.Log("Forca Atual: " + forca);
    }
}`,
        output: "Moedas Coletadas: 50\nForca Atual: 12.4"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Altere os valores de vida e velocidade, adicione novos Debug.Log e clique em Executar para visualizar a saída no Console Unity.",
        starterCode: `using UnityEngine;

public class TesteConsole : MonoBehaviour
{
    void Start()
    {
        int mana = 100;
        float regeneracao = 3.2f;
        Debug.Log("Mana: " + mana);
        Debug.Log("Regeneracao: " + regeneracao);
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Exiba no Console a mensagem 'DIMENSAO UNITY PRONTA' usando Debug.Log:",
                starterCode: `using UnityEngine;

public class Setup : MonoBehaviour
{
    void Start()
    {
        
    }
}`,
                solution: `using UnityEngine;

public class Setup : MonoBehaviour
{
    void Start()
    {
        Debug.Log("DIMENSAO UNITY PRONTA");
    }
}`,
                hint: 'Use: Debug.Log("DIMENSAO UNITY PRONTA");'
            },
            {
                instruction: "Declare int nivel = 10 e exiba com Debug.Log(\"Nivel: \" + nivel);",
                starterCode: `using UnityEngine;

public class NivelSetup : MonoBehaviour
{
    void Start()
    {
        int nivel = 10;
        
    }
}`,
                solution: `using UnityEngine;

public class NivelSetup : MonoBehaviour
{
    void Start()
    {
        int nivel = 10;
        Debug.Log("Nivel: " + nivel);
    }
}`,
                hint: 'Debug.Log("Nivel: " + nivel);'
            }
        ]
    },
    activities: [
        {
            id: "cs_act_0_1",
            title: "Primeiro Log no Console",
            difficulty: "easy",
            description: "No método <code>Start()</code>, declare uma variável <code>int vida = 100;</code> e emita no Console do Unity exatamente a mensagem <code>Vida: 100</code> usando <code>Debug.Log</code>.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare a variavel inteira vida com valor 100
        
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
                { input: "", expected: "Vida: 100", description: "Verificação do log de Vida no Console" }
            ],
            hints: [
                { level: "I", text: "Declare: int vida = 100;" },
                { level: "II", text: 'Use Debug.Log("Vida: " + vida);' },
                { level: "III", text: 'int vida = 100;\nDebug.Log("Vida: " + vida);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("Debug.Log")) errors.push("Utilize Debug.Log para emitir mensagens no console");
                if (!output.includes("Vida: 100")) errors.push("A saída deve conter 'Vida: 100'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_2",
            title: "Calibrando Velocidade e Flutuantes",
            difficulty: "easy",
            description: "Declare uma variável <code>float velocidade = 7.5f;</code> e uma variável <code>string heroi = \"Kael\";</code>. Emita no Console em duas linhas separadas:<br><code>Heroi: Kael</code><br><code>Velocidade: 7.5</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare string heroi e float velocidade (lembre-se do sufixo f)
        
        // 2. Emita as duas linhas com Debug.Log
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
                { input: "", expected: "Heroi: Kael\nVelocidade: 7.5", description: "Logs de Nome do Herói e Velocidade float" }
            ],
            hints: [
                { level: "I", text: 'Declare string heroi = "Kael"; e float velocidade = 7.5f;' },
                { level: "II", text: 'Faça dois Debug.Log separados, um para o herói e outro para a velocidade.' },
                { level: "III", text: 'Debug.Log("Heroi: " + heroi);\nDebug.Log("Velocidade: " + velocidade);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("7.5")) errors.push("Declare a velocidade com 7.5f");
                if (!output.includes("Heroi: Kael")) errors.push("Falta imprimir 'Heroi: Kael'");
                if (!output.includes("Velocidade: 7.5")) errors.push("Falta imprimir 'Velocidade: 7.5'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_0_3",
            title: "Cálculo de Dano Total em C#",
            difficulty: "medium",
            description: "Declare <code>int danoBase = 40;</code>, <code>int multiplicador = 2;</code> e <code>float bonus = 5.5f;</code>. Calcule o <code>float danoTotal = (danoBase * multiplicador) + bonus;</code> e exiba no Console exatamente:<br><code>Dano Total: 85.5</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare as variaveis: danoBase, multiplicador e bonus
        
        // 2. Calcule danoTotal e imprima com Debug.Log
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
                { input: "", expected: "Dano Total: 85.5", description: "Cálculo aritmético (40 * 2) + 5.5 = 85.5" }
            ],
            hints: [
                { level: "I", text: "Multiplique danoBase * multiplicador e some o bonus float." },
                { level: "II", text: 'float danoTotal = (danoBase * multiplicador) + bonus;' },
                { level: "III", text: 'Debug.Log("Dano Total: " + danoTotal);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Dano Total: 85.5")) errors.push("A saída deve ser 'Dano Total: 85.5'");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 01 — CONTROLE DE FLUXO, LOOPS & CICLO MONOBEHAVIOUR
// ═══════════════════════════════════════════════════════
{
    id: 1,
    title: "O Ciclo de Vida do MonoBehaviour",
    theme: "Awake, Start e Condicionais",
    unlock: "Coração da Engine",
    unlockIcon: "[SYNC]",
    character: "lyra",
    xpReward: 85,
    story: [
        { type: "narrative", text: "As engrenagens invisíveis do tempo começam a bater no ritmo de 60 frames por segundo." },
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Em Unity, tudo segue uma sequência sagrada. <code>Awake()</code> desperta as variáveis antes de tudo, <code>Start()</code> inicia a jornada no primeiro frame e <code>Update()</code> pulsa continuamente a cada renderização." },
        { type: "character", name: "KAEL", role: "FERREIRO DE CÓDIGO", cssClass: "kael", text: "Se colocarmos cálculos pesados de inicialização dentro do Update, o jogo travará e a taxa de quadros despencará! Respeite o ciclo de vida da Engine." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Compreender a ordem de eventos e o controle de fluxo com <code>if/else</code> e loops é a chave para criar comportamentos fluidos." }
    ],
    concept: {
        title: "AWAKE, START & CONDICIONAIS",
        explanation: "Awake() é chamado na instanciação. Start() roda antes do primeiro frame. Com if/else verificamos o estado dos GameObjects.",
        code: `using UnityEngine;

public class CicloExemplo : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("Awake: Componentes alocados.");
    }

    void Start()
    {
        int vida = 100;
        if (vida > 0)
        {
            Debug.Log("Status: Jogador Vivo");
        }
    }
}`
    },
    example: {
        title: "Exemplo — Sequência e Condição",
        code: `using UnityEngine;

public class SetupGame : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("[1] Memoria alocada.");
    }
    void Start()
    {
        int hp = 100;
        if (hp == 100)
        {
            Debug.Log("[2] Vida cheia.");
        }
    }
}`,
        output: "[1] Memoria alocada.\n[2] Vida cheia."
    },
    experiment: {
        title: "Experimente",
        description: "Adicione instruções dentro de Awake e Start e observe a ordem natural dos eventos.",
        starterCode: `using UnityEngine;

public class TesteCiclo : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("Fase 1");
    }
    void Start()
    {
        Debug.Log("Fase 2");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "No método Awake(), imprima 'Setup Concluido':",
                starterCode: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Awake()
    {
        
    }
}`,
                solution: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("Setup Concluido");
    }
}`,
                hint: 'Debug.Log("Setup Concluido");'
            }
        ]
    },
    activities: [
        {
            id: "cs_act_1_1",
            title: "Despertar do Script",
            difficulty: "easy",
            description: "No método <code>Awake()</code>, imprima <code>[1] Sistema Desperto</code>. No método <code>Start()</code>, imprima <code>[2] Jornada Iniciada</code>.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        // Seu log de Awake aqui
    }

    void Start()
    {
        // Seu log de Start aqui
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("[1] Sistema Desperto");
    }

    void Start()
    {
        Debug.Log("[2] Jornada Iniciada");
    }
}`,
            tests: [
                { input: "", expected: "[1] Sistema Desperto\n[2] Jornada Iniciada", description: "Ordem do ciclo de vida Awake antes de Start" }
            ],
            hints: [
                { level: "I", text: 'Coloque Debug.Log("[1] Sistema Desperto"); dentro de Awake()' },
                { level: "II", text: 'Coloque Debug.Log("[2] Jornada Iniciada"); dentro de Start()' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("[1] Sistema Desperto")) errors.push("Falta log do Awake");
                if (!output.includes("[2] Jornada Iniciada")) errors.push("Falta log do Start");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_2",
            title: "Checagem de Status com If/Else",
            difficulty: "easy",
            description: "Dentro de <code>Start()</code>, declare <code>int vida = 0;</code>. Se a vida for maior que 0, exiba <code>Status: Vivo</code>, senão exiba <code>Status: Game Over</code>.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 0;
        // Estruture o if/else para verificar a vida
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
            Debug.Log("Status: Vivo");
        }
        else
        {
            Debug.Log("Status: Game Over");
        }
    }
}`,
            tests: [
                { input: "", expected: "Status: Game Over", description: "Condicional com vida = 0 resultando em Game Over" }
            ],
            hints: [
                { level: "I", text: "Use if (vida > 0) { ... } else { ... }" },
                { level: "II", text: 'No bloco else, use Debug.Log("Status: Game Over");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Status: Game Over")) errors.push("A saída esperada é 'Status: Game Over'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_1_3",
            title: "Spawn de Inimigos com Loop For",
            difficulty: "medium",
            description: "Dentro de <code>Start()</code>, use um laço <code>for (int i = 1; i <= 3; i++)</code> para emitir no Console a sequência:<br><code>Inimigo #1 gerado</code><br><code>Inimigo #2 gerado</code><br><code>Inimigo #3 gerado</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Crie o laco for de 1 ate 3
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
                { input: "", expected: "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado", description: "Laço for de spawn sequencial de 1 a 3" }
            ],
            hints: [
                { level: "I", text: "Declare for (int i = 1; i <= 3; i++)" },
                { level: "II", text: 'Dentro do for: Debug.Log("Inimigo #" + i + " gerado");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("for")) errors.push("Utilize a estrutura de repeticao for");
                if (!output.includes("Inimigo #3 gerado")) errors.push("O laco deve gerar ate o Inimigo #3");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 02 — VETORES 3D & MATEMÁTICA ESPACIAL
// ═══════════════════════════════════════════════════════
{
    id: 2,
    title: "Matemática 3D & Vetores",
    theme: "Vector3, Distâncias e Direções",
    unlock: "Bússola Tridimensional",
    unlockIcon: "[V3]",
    character: "mira",
    xpReward: 95,
    story: [
        { type: "character", name: "MIRA", role: "CARTÓGRAFA DIMENSIONAL", cssClass: "mira", text: "O espaço da Dimensão Unity é governado por três eixos: X (largura), Y (altura) e Z (profundidade). Sem a matemática vetorial do <code>Vector3</code>, você não saberá para onde apontar ou caminhar!" },
        { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Calcular distâncias com <code>Vector3.Distance</code> e normalizar vetores para manter velocidades constantes é o que separa um código amador de uma movimentação refinada." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Dominar o Vector3 é essencial para deslocar transformações e direcionar feitiços e projéteis no espaço 3D." }
    ],
    concept: {
        title: "VECTOR3 & DISTÂNCIAS",
        explanation: "Vector3 guarda coordenadas (x, y, z). Vector3.Distance(a, b) calcula a distância linear euclidiana entre dois pontos no espaço.",
        code: `using UnityEngine;

public class CalculoEspacial : MonoBehaviour
{
    void Start()
    {
        Vector3 heroi = new Vector3(0, 0, 0);
        Vector3 inimigo = new Vector3(3, 4, 0);

        float dist = Vector3.Distance(heroi, inimigo);
        Debug.Log("Distancia: " + dist);
    }
}`
    },
    example: {
        title: "Exemplo — Distância no Espaço",
        code: `using UnityEngine;

public class Radar : MonoBehaviour
{
    void Start()
    {
        Vector3 origem = Vector3.zero;
        Vector3 alvo = new Vector3(0, 0, 10);
        float distancia = Vector3.Distance(origem, alvo);
        Debug.Log("Alvo a " + distancia + " metros");
    }
}`,
        output: "Alvo a 10 metros"
    },
    experiment: {
        title: "Experimente",
        description: "Mude as coordenadas dos vetores e calcule a distância entre eles.",
        starterCode: `using UnityEngine;

public class TesteVetor : MonoBehaviour
{
    void Start()
    {
        Vector3 a = new Vector3(1, 2, 3);
        Vector3 b = new Vector3(4, 6, 3);
        Debug.Log("Distancia: " + Vector3.Distance(a, b));
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Crie um Vector3 pos = new Vector3(0, 5, 0); e exiba no console:",
                starterCode: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        
    }
}`,
                solution: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(0, 5, 0);
        Debug.Log("Pos: " + pos);
    }
}`,
                hint: 'Debug.Log("Pos: " + pos);'
            }
        ]
    },
    activities: [
        {
            id: "cs_act_2_1",
            title: "Cálculo de Distância Euclidiana",
            difficulty: "easy",
            description: "Crie dois pontos <code>Vector3 p1 = new Vector3(0, 0, 0);</code> e <code>Vector3 p2 = new Vector3(6, 8, 0);</code>. Calcule a distância com <code>Vector3.Distance(p1, p2)</code> e exiba no Console exatamente:<br><code>Distancia: 10</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Instancie os dois pontos Vector3
        
        // 2. Calcule a distancia e emita: Distancia: 10
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 p1 = new Vector3(0, 0, 0);
        Vector3 p2 = new Vector3(6, 8, 0);
        float d = Vector3.Distance(p1, p2);
        Debug.Log("Distancia: " + d);
    }
}`,
            tests: [
                { input: "", expected: "Distancia: 10", description: "Distância 3D entre (0,0,0) e (6,8,0) = 10" }
            ],
            hints: [
                { level: "I", text: "Vector3 p1 = new Vector3(0, 0, 0); Vector3 p2 = new Vector3(6, 8, 0);" },
                { level: "II", text: 'float d = Vector3.Distance(p1, p2); Debug.Log("Distancia: " + d);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Distancia: 10")) errors.push("A saída deve ser 'Distancia: 10'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_2",
            title: "Deslocamento e Translação",
            difficulty: "medium",
            description: "Simule a movimentação de um GameObject. Declare <code>float velocidade = 5.0f;</code> e calcule o deslocamento horizontal <code>float deslocamento = velocidade * 2.0f;</code>. Imprima no Console:<br><code>Deslocamento Total: 10</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare a velocidade e calcule o deslocamento em 2 segundos
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float velocidade = 5.0f;
        float deslocamento = velocidade * 2.0f;
        Debug.Log("Deslocamento Total: " + deslocamento);
    }
}`,
            tests: [
                { input: "", expected: "Deslocamento Total: 10", description: "Cálculo de deslocamento escalar" }
            ],
            hints: [
                { level: "I", text: "float velocidade = 5.0f; float deslocamento = velocidade * 2.0f;" },
                { level: "II", text: 'Debug.Log("Deslocamento Total: " + deslocamento);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Deslocamento Total: 10")) errors.push("Falta 'Deslocamento Total: 10'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_2_3",
            title: "Normalização e Magnitude",
            difficulty: "medium",
            description: "Crie um vetor <code>Vector3 dir = new Vector3(0, 0, 5);</code>. Exiba no Console o comprimento do vetor original e em seguida a confirmação de vetor unitário:<br><code>Magnitude Original: 5</code><br><code>Vetor Normalizado Pronto</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare o vetor de direcao
        
        // 2. Emita os dois logs solicitados
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Vector3 dir = new Vector3(0, 0, 5);
        Debug.Log("Magnitude Original: 5");
        Debug.Log("Vetor Normalizado Pronto");
    }
}`,
            tests: [
                { input: "", expected: "Magnitude Original: 5\nVetor Normalizado Pronto", description: "Validação de magnitude e normalização" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("Magnitude Original: 5");' },
                { level: "II", text: 'Debug.Log("Vetor Normalizado Pronto");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Magnitude Original: 5")) errors.push("Falta log de magnitude");
                if (!output.includes("Vetor Normalizado Pronto")) errors.push("Falta log de normalizacao");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 03 — FÍSICA 3D, RIGIDBODY E FORÇAS
// ═══════════════════════════════════════════════════════
{
    id: 3,
    title: "Física 3D & Rigidbody",
    theme: "Física, Gravidade e Forças",
    unlock: "Núcleo Gravitacional",
    unlockIcon: "[PHYS]",
    character: "kael",
    xpReward: 100,
    story: [
        { type: "character", name: "KAEL", role: "FERREIRO DE CÓDIGO", cssClass: "kael", text: "Bem-vindo à forja da gravidade! O componente <code>Rigidbody</code> conecta seus objetos ao motor de física PhysX. Se você quer que algo caia, reaja a colisões ou seja arremessado, você precisará dele." },
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "E lembre-se: no Unity 6+, aplicamos forças com <code>AddForce(direcao * forca, ForceMode.Impulse)</code> e controlamos velocidades com <code>linearVelocity</code>." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "A física dá peso e credibilidade aos mundos virtuais. Vamos programar seu primeiro impulso de salto!" }
    ],
    concept: {
        title: "RIGIDBODY & ADDFORCE",
        explanation: "AddForce aplica um vetor de força ao corpo rígido. ForceMode.Impulse é utilizado para impulsos instantâneos como saltos ou tiros.",
        code: `using UnityEngine;

public class SaltoFisico : MonoBehaviour
{
    public Rigidbody rb;
    public float forca = 10f;

    void Pular()
    {
        rb.AddForce(Vector3.up * forca, ForceMode.Impulse);
        Debug.Log("Pulo aplicado!");
    }
}`
    },
    example: {
        title: "Exemplo — Impulso Físico",
        code: `using UnityEngine;

public class Propulsor : MonoBehaviour
{
    void Start()
    {
        float forcaImpulso = 15.0f;
        Debug.Log("Impulso configurado com forca: " + forcaImpulso);
    }
}`,
        output: "Impulso configurado com forca: 15"
    },
    experiment: {
        title: "Experimente",
        description: "Configure forças e modos de aplicação.",
        starterCode: `using UnityEngine;

public class TesteFisica : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Fisica ativada.");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Imprima no console 'Gravidade Ativa':",
                starterCode: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        
    }
}`,
                solution: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Gravidade Ativa");
    }
}`,
                hint: 'Debug.Log("Gravidade Ativa");'
            }
        ]
    },
    activities: [
        {
            id: "cs_act_3_1",
            title: "Simulação de Impulso de Salto",
            difficulty: "easy",
            description: "Declare <code>float forcaSalto = 12.5f;</code> e imprima no Console exatamente:<br><code>Forca de Salto: 12.5</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // 1. Declare forcaSalto com 12.5f
        
        // 2. Emita o log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float forcaSalto = 12.5f;
        Debug.Log("Forca de Salto: " + forcaSalto);
    }
}`,
            tests: [
                { input: "", expected: "Forca de Salto: 12.5", description: "Configuração de força de impulso vertical" }
            ],
            hints: [
                { level: "I", text: "float forcaSalto = 12.5f;" },
                { level: "II", text: 'Debug.Log("Forca de Salto: " + forcaSalto);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Forca de Salto: 12.5")) errors.push("A saída deve conter 'Forca de Salto: 12.5'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_2",
            title: "Configuração de Massa e Gravidade",
            difficulty: "easy",
            description: "Declare <code>float massa = 70.0f;</code> e <code>bool usarGravidade = true;</code>. Se <code>usarGravidade</code> for verdadeiro, emita:<br><code>Massa: 70 | Gravidade: Ativa</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 70.0f;
        bool usarGravidade = true;
        // Valide e exiba a configuracao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float massa = 70.0f;
        bool usarGravidade = true;
        if (usarGravidade)
        {
            Debug.Log("Massa: " + massa + " | Gravidade: Ativa");
        }
    }
}`,
            tests: [
                { input: "", expected: "Massa: 70 | Gravidade: Ativa", description: "Validação de propriedades de Rigidbody" }
            ],
            hints: [
                { level: "I", text: "Use if (usarGravidade) { ... }" },
                { level: "II", text: 'Debug.Log("Massa: " + massa + " | Gravidade: Ativa");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Gravidade: Ativa")) errors.push("A gravidade deve ser ativada na saída");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_3_3",
            title: "Limite de Velocidade Linear",
            difficulty: "medium",
            description: "Declare <code>float velAtual = 35.0f;</code> e <code>float velMax = 20.0f;</code>. Se <code>velAtual > velMax</code>, ajuste a velocidade para o valor máximo e exiba:<br><code>Velocidade Limitada: 20</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float velAtual = 35.0f;
        float velMax = 20.0f;
        // Aplique o clamp da velocidade
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float velAtual = 35.0f;
        float velMax = 20.0f;
        if (velAtual > velMax)
        {
            velAtual = velMax;
        }
        Debug.Log("Velocidade Limitada: " + velAtual);
    }
}`,
            tests: [
                { input: "", expected: "Velocidade Limitada: 20", description: "Limitador de velocidade física" }
            ],
            hints: [
                { level: "I", text: "if (velAtual > velMax) velAtual = velMax;" },
                { level: "II", text: 'Debug.Log("Velocidade Limitada: " + velAtual);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Velocidade Limitada: 20")) errors.push("A saída esperada é 'Velocidade Limitada: 20'");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 04 — COLISÕES E TRIGGERS (GATILHOS)
// ═══════════════════════════════════════════════════════
{
    id: 4,
    title: "Colisões e Gatilhos (Triggers)",
    theme: "OnCollisionEnter e OnTriggerEnter",
    unlock: "Detector de Impacto",
    unlockIcon: "[COL]",
    character: "orin",
    xpReward: 110,
    story: [
        { type: "character", name: "ORIN", role: "MENSAGEIRO DOS TRÊS PLANOS", cssClass: "orin", text: "Como o jogo sabe que uma flecha acertou um monstro ou que o herói atravessou um portal dimensional? Através dos eventos de colisão e gatilhos!" },
        { type: "character", name: "KAEL", role: "FERREIRO DE CÓDIGO", cssClass: "kael", text: "Colisores sólidos bloqueiam passagem com <code>OnCollisionEnter</code>. Quando ativamos <code>Is Trigger</code>, o objeto se torna etéreo e dispara <code>OnTriggerEnter</code>, ideal para coletar moedas e acionar armadilhas." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Use <code>other.CompareTag(\"Player\")</code> para verificar com eficiência quem acionou o gatilho sem desperdiçar memória." }
    ],
    concept: {
        title: "ONTRIGGERENTER & COMPARETAG",
        explanation: "OnTriggerEnter é acionado quando outro Collider entra no espaço do gatilho. CompareTag é a forma otimizada de checar a Tag do objeto colidido.",
        code: `using UnityEngine;

public class ItemColetavel : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            Debug.Log("Item coletado!");
            Destroy(gameObject);
        }
    }
}`
    },
    example: {
        title: "Exemplo — Detecção de Tag",
        code: `using UnityEngine;

public class SensorPortal : MonoBehaviour
{
    void Start()
    {
        string tagDetectada = "Player";
        if (tagDetectada == "Player")
        {
            Debug.Log("Acesso autorizado pelo portal.");
        }
    }
}`,
        output: "Acesso autorizado pelo portal."
    },
    experiment: {
        title: "Experimente",
        description: "Teste condições de validação de tags de GameObjects.",
        starterCode: `using UnityEngine;

public class TesteTrigger : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Trigger armado.");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Imprima 'Gatilho Acionado' quando a tag for 'Player':",
                starterCode: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        string tag = "Player";
        if (tag == "Player")
        {
            
        }
    }
}`,
                solution: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        string tag = "Player";
        if (tag == "Player")
        {
            Debug.Log("Gatilho Acionado");
        }
    }
}`,
                hint: 'Debug.Log("Gatilho Acionado");'
            }
        ]
    },
    activities: [
        {
            id: "cs_act_4_1",
            title: "Coleta de Moeda Dimensional",
            difficulty: "easy",
            description: "Declare <code>int moedasColetadas = 1;</code> e emita no Console do Unity exatamente a mensagem:<br><code>Moeda Coletada: 1</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int moedasColetadas = 1;
        // Emita o log da moeda coletada
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int moedasColetadas = 1;
        Debug.Log("Moeda Coletada: " + moedasColetadas);
    }
}`,
            tests: [
                { input: "", expected: "Moeda Coletada: 1", description: "Verificação de item coletado" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("Moeda Coletada: " + moedasColetadas);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Moeda Coletada: 1")) errors.push("A saída deve conter 'Moeda Coletada: 1'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_2",
            title: "Identificação de Tag do Inimigo",
            difficulty: "medium",
            description: "Declare <code>string tagObjeto = \"Enemy\";</code>. Se a tag for <code>\"Enemy\"</code>, exiba <code>Colisao com Inimigo! Sofrendo Dano</code>, senão exiba <code>Objeto Neutro</code>.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tagObjeto = "Enemy";
        // Faca a checagem com if/else
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tagObjeto = "Enemy";
        if (tagObjeto == "Enemy")
        {
            Debug.Log("Colisao com Inimigo! Sofrendo Dano");
        }
        else
        {
            Debug.Log("Objeto Neutro");
        }
    }
}`,
            tests: [
                { input: "", expected: "Colisao com Inimigo! Sofrendo Dano", description: "Detecção de tag Enemy" }
            ],
            hints: [
                { level: "I", text: 'if (tagObjeto == "Enemy") { Debug.Log("Colisao com Inimigo! Sofrendo Dano"); }' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Colisao com Inimigo! Sofrendo Dano")) errors.push("A mensagem correta de colisão deve ser emitida");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_4_3",
            title: "Destruição com Delay",
            difficulty: "medium",
            description: "Declare <code>float tempoDestruicao = 2.0f;</code> e imprima no Console em duas linhas:<br><code>GameObject Marcado</code><br><code>Destruindo em: 2 segundos</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoDestruicao = 2.0f;
        // Emita os dois logs
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoDestruicao = 2.0f;
        Debug.Log("GameObject Marcado");
        Debug.Log("Destruindo em: " + tempoDestruicao + " segundos");
    }
}`,
            tests: [
                { input: "", expected: "GameObject Marcado\nDestruindo em: 2 segundos", description: "Sequência de destruição temporizada" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("GameObject Marcado");' },
                { level: "II", text: 'Debug.Log("Destruindo em: " + tempoDestruicao + " segundos");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("GameObject Marcado")) errors.push("Falta log 'GameObject Marcado'");
                if (!output.includes("Destruindo em: 2 segundos")) errors.push("Falta log de destruição");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 05 — SCRIPTABLEOBJECTS & DADOS MODULARES
// ═══════════════════════════════════════════════════════
{
    id: 5,
    title: "ScriptableObjects & Arquitetura Modular",
    theme: "Dados Desacoplados da Cena",
    unlock: "Grimório de Dados",
    unlockIcon: "[SO]",
    character: "elion",
    xpReward: 120,
    story: [
        { type: "character", name: "ELION", role: "GRANDE BIBLIOTECÁRIO", cssClass: "elion", text: "Guardar estatísticas de armas e monstros diretamente em GameObjects na cena é uma heresia que consome memória! Os <code>ScriptableObjects</code> são os verdadeiros grimórios independentes de cena." },
        { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Com ScriptableObjects, podemos criar centenas de tipos de magias e inimigos como arquivos de dados no projeto, compartilhando a mesma fonte entre milhares de entidades sem duplicar nada." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "A anotação <code>[CreateAssetMenu]</code> permite gerar esses recipientes de dados direto pelo menu de contexto do Unity." }
    ],
    concept: {
        title: "SCRIPTABLEOBJECT",
        explanation: "Classes que herdam de ScriptableObject não precisam ser adicionadas a GameObjects e servem como repositórios de dados reutilizáveis.",
        code: `using UnityEngine;

[CreateAssetMenu(fileName = "NovoPoder", menuName = "Grimorio/Poder")]
public class PoderData : ScriptableObject
{
    public string nomePoder;
    public int custoMana;
    public int danoBase;
}`
    },
    example: {
        title: "Exemplo — Ficha de Item",
        code: `using UnityEngine;

public class ExibirItem : MonoBehaviour
{
    void Start()
    {
        string nome = "Lança do Trovão";
        int dano = 85;
        Debug.Log("Item: " + nome + " | Dano: " + dano);
    }
}`,
        output: "Item: Lança do Trovão | Dano: 85"
    },
    experiment: {
        title: "Experimente",
        description: "Simule a leitura de configurações a partir de um registro de dados.",
        starterCode: `using UnityEngine;

public class TesteItem : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Banco de itens carregado.");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Imprima a mensagem 'ScriptableObject Carregado':",
                starterCode: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        
    }
}`,
                solution: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        Debug.Log("ScriptableObject Carregado");
    }
}`,
                hint: 'Debug.Log("ScriptableObject Carregado");'
            }
        ]
    },
    activities: [
        {
            id: "cs_act_5_1",
            title: "Ficha de Dados do Inimigo",
            difficulty: "easy",
            description: "Defina <code>string inimigo = \"Dragao\";</code> e <code>int hp = 500;</code>. Imprima no Console exatamente:<br><code>Inimigo: Dragao | HP: 500</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare as variaveis do ScriptableObject e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string inimigo = "Dragao";
        int hp = 500;
        Debug.Log("Inimigo: " + inimigo + " | HP: " + hp);
    }
}`,
            tests: [
                { input: "", expected: "Inimigo: Dragao | HP: 500", description: "Leitura de propriedades de ScriptableObject" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("Inimigo: " + inimigo + " | HP: " + hp);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Inimigo: Dragao | HP: 500")) errors.push("A saída deve ser 'Inimigo: Dragao | HP: 500'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_2",
            title: "Catálogo de Armas Rúnicas",
            difficulty: "medium",
            description: "Declare <code>string arma = \"Espada Solar\";</code>, <code>int ataque = 120;</code> e <code>int raridade = 5;</code>. Exiba no Console:<br><code>Arma: Espada Solar (Raridade: 5) | ATK: 120</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure os dados da arma e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string arma = "Espada Solar";
        int ataque = 120;
        int raridade = 5;
        Debug.Log("Arma: " + arma + " (Raridade: " + raridade + ") | ATK: " + ataque);
    }
}`,
            tests: [
                { input: "", expected: "Arma: Espada Solar (Raridade: 5) | ATK: 120", description: "Formatação de dados de item de catálogo" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("Arma: " + arma + " (Raridade: " + raridade + ") | ATK: " + ataque);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Arma: Espada Solar (Raridade: 5) | ATK: 120")) errors.push("Formato incorreto na saída da arma");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_5_3",
            title: "Economia e Custo de Mana",
            difficulty: "medium",
            description: "Declare <code>int manaJogador = 100;</code> e <code>int custoMagia = 35;</code>. Se o jogador tiver mana suficiente, deduza a mana e imprima:<br><code>Magia Conjurada | Mana Restante: 65</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int manaJogador = 100;
        int custoMagia = 35;
        // Verifique e desconte o custo da magia
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int manaJogador = 100;
        int custoMagia = 35;
        if (manaJogador >= custoMagia)
        {
            manaJogador -= custoMagia;
            Debug.Log("Magia Conjurada | Mana Restante: " + manaJogador);
        }
    }
}`,
            tests: [
                { input: "", expected: "Magia Conjurada | Mana Restante: 65", description: "Consumo de mana a partir de dados modulares" }
            ],
            hints: [
                { level: "I", text: "manaJogador -= custoMagia;" },
                { level: "II", text: 'Debug.Log("Magia Conjurada | Mana Restante: " + manaJogador);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Mana Restante: 65")) errors.push("A mana restante deve ser 65");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 06 — COROUTINES E OPERAÇÕES ASSÍNCRONAS
// ═══════════════════════════════════════════════════════
{
    id: 6,
    title: "Coroutines e Fluxo Temporal",
    theme: "IEnumerator e WaitForSeconds",
    unlock: "Cronômetro Arcano",
    unlockIcon: "[TIME]",
    character: "lyra",
    xpReward: 130,
    story: [
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "No desenvolvimento de jogos, nem tudo acontece instantaneamente. Feitiços têm tempo de recarga, diálogos esperam segundos e cutscenes acontecem em passos." },
        { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "As <code>Coroutines</code> com <code>IEnumerator</code> nos permitem pausar uma função com <code>yield return new WaitForSeconds()</code> sem jamais congelar o jogo ou travar a thread principal." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Invocamos corotinas com <code>StartCoroutine(MinhaRotina())</code>." }
    ],
    concept: {
        title: "COROUTINES & YIELD",
        explanation: "Coroutines utilizam a palavra-chave yield para ceder a execução de volta para a engine da Unity e continuar no momento exato especificado.",
        code: `using System.Collections;
using UnityEngine;

public class RecargaFeitico : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(ExecutarRecarga());
    }

    IEnumerator ExecutarRecarga()
    {
        Debug.Log("Iniciando recarga...");
        yield return new WaitForSeconds(2.0f);
        Debug.Log("Recarga concluida!");
    }
}`
    },
    example: {
        title: "Exemplo — Sequência Temporal",
        code: `using UnityEngine;

public class AlertaTemporizado : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Contagem iniciada.");
        Debug.Log("Aguardando 1 segundo...");
        Debug.Log("Acao executada com sucesso!");
    }
}`,
        output: "Contagem iniciada.\nAguardando 1 segundo...\nAcao executada com sucesso!"
    },
    experiment: {
        title: "Experimente",
        description: "Simule rotinas de tempo e saídas no console.",
        starterCode: `using UnityEngine;

public class TesteTempo : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Rotina iniciada.");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Imprima 'Coroutine Pronta':",
                starterCode: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        
    }
}`,
                solution: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Coroutine Pronta");
    }
}`,
                hint: 'Debug.Log("Coroutine Pronta");'
            }
        ]
    },
    activities: [
        {
            id: "cs_act_6_1",
            title: "Simulação de Cooldown",
            difficulty: "easy",
            description: "No método <code>Start()</code>, emita no Console exatamente a mensagem:<br><code>Status: Recarregado</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Emita o log de recarga concluida
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Status: Recarregado");
    }
}`,
            tests: [
                { input: "", expected: "Status: Recarregado", description: "Notificação de recarga finalizada" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("Status: Recarregado");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Status: Recarregado")) errors.push("A saída deve conter 'Status: Recarregado'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_2",
            title: "Contagem Regressiva de Ativação",
            difficulty: "medium",
            description: "Emita no Console uma contagem sequencial de ativação em 3 etapas:<br><code>[1] Carregando Escudo</code><br><code>[2] Aguardando Sincronizacao</code><br><code>[3] Escudo 100% Ativo</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Emita as 3 etapas de inicializacao temporizada
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("[1] Carregando Escudo");
        Debug.Log("[2] Aguardando Sincronizacao");
        Debug.Log("[3] Escudo 100% Ativo");
    }
}`,
            tests: [
                { input: "", expected: "[1] Carregando Escudo\n[2] Aguardando Sincronizacao\n[3] Escudo 100% Ativo", description: "Sequência de etapas temporizadas" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("[1] Carregando Escudo");' },
                { level: "II", text: 'Debug.Log("[2] Aguardando Sincronizacao");' },
                { level: "III", text: 'Debug.Log("[3] Escudo 100% Ativo");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("[3] Escudo 100% Ativo")) errors.push("Falta a última etapa da contagem");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_6_3",
            title: "Temporizador de Respawn",
            difficulty: "medium",
            description: "Declare <code>float tempoEspera = 3.5f;</code>. Emita no Console:<br><code>Jogador Abatido</code><br><code>Respawn em: 3.5 segundos</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoEspera = 3.5f;
        // Emita os logs de respawn
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float tempoEspera = 3.5f;
        Debug.Log("Jogador Abatido");
        Debug.Log("Respawn em: " + tempoEspera + " segundos");
    }
}`,
            tests: [
                { input: "", expected: "Jogador Abatido\nRespawn em: 3.5 segundos", description: "Temporização de renascimento" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("Jogador Abatido");' },
                { level: "II", text: 'Debug.Log("Respawn em: " + tempoEspera + " segundos");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Jogador Abatido")) errors.push("Falta log 'Jogador Abatido'");
                if (!output.includes("Respawn em: 3.5 segundos")) errors.push("Falta log de tempo de respawn");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 07 — OBJECT POOLING E ALTA PERFORMANCE
// ═══════════════════════════════════════════════════════
{
    id: 7,
    title: "Object Pooling & Otimização",
    theme: "Reciclagem de Objetos e Garbage Collection",
    unlock: "Forja Infinita",
    unlockIcon: "[POOL]",
    character: "kael",
    xpReward: 150,
    story: [
        { type: "character", name: "KAEL", role: "FERREIRO DE CÓDIGO", cssClass: "kael", text: "Invocar <code>Instantiate()</code> e <code>Destroy()</code> centenas de vezes por segundo cria montes de lixo na memória RAM, invocando o terrível monstro do Garbage Collector que congela o jogo!" },
        { type: "character", name: "MIRA", role: "CARTÓGRAFA DIMENSIONAL", cssClass: "mira", text: "A técnica sagrada do <code>Object Pooling</code> mantém uma fila de projéteis e efeitos pré-alocados. Nós apenas os ativamos quando disparamos e os desativamos quando colidem." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Object Pooling é o padrão de excelência para jogos comerciais de alta performance com taxas de quadro estáveis." }
    ],
    concept: {
        title: "OBJECT POOLING COM QUEUE<T>",
        explanation: "Utilizamos uma Queue<GameObject> para armazenar objetos inativos. Quando precisamos de um novo objeto, fazemos Dequeue() e SetActive(true).",
        code: `using System.Collections.Generic;
using UnityEngine;

public class PoolProjeteis : MonoBehaviour
{
    public Queue<GameObject> pool = new Queue<GameObject>();

    public GameObject ObterProjetil()
    {
        if (pool.Count > 0)
        {
            GameObject p = pool.Dequeue();
            p.SetActive(true);
            return p;
        }
        return null;
    }
}`
    },
    example: {
        title: "Exemplo — Reuso de Balas",
        code: `using UnityEngine;

public class TestePool : MonoBehaviour
{
    void Start()
    {
        int balasNoPente = 10;
        int balasDisparadas = 3;
        int balasRecicladas = 3;
        Debug.Log("Balas Recicladas no Pool: " + balasRecicladas);
    }
}`,
        output: "Balas Recicladas no Pool: 3"
    },
    experiment: {
        title: "Experimente",
        description: "Teste a lógica de gerenciamento de contagem de pool de objetos.",
        starterCode: `using UnityEngine;

public class TestePoolExp : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Pool inicializada com sucesso.");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Imprima 'Pool Pronta: 20':",
                starterCode: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        int tamanho = 20;
        
    }
}`,
                solution: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        int tamanho = 20;
        Debug.Log("Pool Pronta: " + tamanho);
    }
}`,
                hint: 'Debug.Log("Pool Pronta: " + tamanho);'
            }
        ]
    },
    activities: [
        {
            id: "cs_act_7_1",
            title: "Eficiência de Memória e Capacidade",
            difficulty: "easy",
            description: "Declare <code>int poolCount = 50;</code> e imprima no Console do Unity exatamente:<br><code>Objetos em Pool: 50</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare a variavel e emita o log
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int poolCount = 50;
        Debug.Log("Objetos em Pool: " + poolCount);
    }
}`,
            tests: [
                { input: "", expected: "Objetos em Pool: 50", description: "Contagem de instâncias no Pool" }
            ],
            hints: [
                { level: "I", text: "int poolCount = 50;" },
                { level: "II", text: 'Debug.Log("Objetos em Pool: " + poolCount);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Objetos em Pool: 50")) errors.push("A saída deve conter 'Objetos em Pool: 50'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_2",
            title: "Reciclagem e Reuso de Balas",
            difficulty: "medium",
            description: "Declare <code>int totalBalas = 20;</code> e <code>int balasAtivas = 6;</code>. Calcule as <code>int balasDisponiveis = totalBalas - balasAtivas;</code> e exiba no Console:<br><code>Balas Disponiveis no Pool: 14</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalBalas = 20;
        int balasAtivas = 6;
        // Calcule as disponiveis e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int totalBalas = 20;
        int balasAtivas = 6;
        int balasDisponiveis = totalBalas - balasAtivas;
        Debug.Log("Balas Disponiveis no Pool: " + balasDisponiveis);
    }
}`,
            tests: [
                { input: "", expected: "Balas Disponiveis no Pool: 14", description: "Cálculo de balanço de instâncias no pool" }
            ],
            hints: [
                { level: "I", text: "int balasDisponiveis = totalBalas - balasAtivas;" },
                { level: "II", text: 'Debug.Log("Balas Disponiveis no Pool: " + balasDisponiveis);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Balas Disponiveis no Pool: 14")) errors.push("A saída esperada é 'Balas Disponiveis no Pool: 14'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_3",
            title: "Monitoramento de Garbage Collection",
            difficulty: "hard",
            description: "Emita no Console o relatório de taxa de quadros e alocações:<br><code>[GC] Coletas Zero: Taxa 60 FPS Estavel</code><br><code>Zero Alocacoes no Update</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Emita os logs de otimizacao
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("[GC] Coletas Zero: Taxa 60 FPS Estavel");
        Debug.Log("Zero Alocacoes no Update");
    }
}`,
            tests: [
                { input: "", expected: "[GC] Coletas Zero: Taxa 60 FPS Estavel\nZero Alocacoes no Update", description: "Validação de boas práticas de GC" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("[GC] Coletas Zero: Taxa 60 FPS Estavel");' },
                { level: "II", text: 'Debug.Log("Zero Alocacoes no Update");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Taxa 60 FPS Estavel")) errors.push("Falta log de FPS");
                if (!output.includes("Zero Alocacoes no Update")) errors.push("Falta log de alocações");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 08 — MAESTRIA DE DELEGATES, EVENTOS E ASCENSÃO
// ═══════════════════════════════════════════════════════
{
    id: 8,
    title: "Eventos, Delegates e a Grande Ascensão",
    theme: "Arquitetura Orientada a Eventos",
    unlock: "Mestre da Dimensão C# Unity",
    unlockIcon: "[ASC]",
    character: "arkan",
    xpReward: 200,
    story: [
        { type: "system", text: "[ SISTEMA ] Alerta de Ressonância Máxima! Todos os 9 Módulos foram assimilados pelo Aventureiro." },
        { type: "character", name: "ARKAN", role: "MESTRE DA GUILDA", cssClass: "arkan", text: "Você percorreu desde as variáveis primordiais até os sistemas de física, matemática 3D e otimização da Unity 6.5!" },
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Agora, com <code>event System.Action</code>, seus componentes conversam entre si com desacoplamento total e elegância arquitetural." },
        { type: "character", name: "KAEL", role: "FERREIRO DE CÓDIGO", cssClass: "kael", text: "Seus scripts agora têm performance, robustez e a beleza dos grandes jogos comerciais." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Receba o título de <span class='highlight'>Mestre Desenvolvedor da Dimensão C# Unity</span>!" }
    ],
    concept: {
        title: "ACTION & EVENTS",
        explanation: "System.Action permite criar assinaturas de eventos onde múltiplos scripts escutam a notificação sem depender diretamente de quem disparou.",
        code: `using System;
using UnityEngine;

public class PlayerVida : MonoBehaviour
{
    public static event Action OnPlayerMorreu;

    public void Morrer()
    {
        Debug.Log("Jogador abatido.");
        OnPlayerMorreu?.Invoke();
    }
}`
    },
    example: {
        title: "Exemplo — Invocação de Evento",
        code: `using UnityEngine;

public class EventoDemo : MonoBehaviour
{
    void Start()
    {
        Debug.Log("[EVENTO] Boss derrotado!");
        Debug.Log("[EVENTO] Recompensas distribuídas para a guilda.");
    }
}`,
        output: "[EVENTO] Boss derrotado!\n[EVENTO] Recompensas distribuídas para a guilda."
    },
    experiment: {
        title: "Experimente",
        description: "Celebre a conclusão da Dimensão C# Unity com mensagens de eventos.",
        starterCode: `using UnityEngine;

public class TesteFinal : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Ascensao concluida com exito!");
    }
}`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Imprima 'MAESTRIA ALCANCADA':",
                starterCode: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        
    }
}`,
                solution: `using UnityEngine;

public class Teste : MonoBehaviour
{
    void Start()
    {
        Debug.Log("MAESTRIA ALCANCADA");
    }
}`,
                hint: 'Debug.Log("MAESTRIA ALCANCADA");'
            }
        ]
    },
    activities: [
        {
            id: "cs_act_8_1",
            title: "O Grande Selo de Unity",
            difficulty: "easy",
            description: "No método <code>Start()</code>, emita no Console do Unity a proclamação oficial de maestria:<br><code>DIMENSAO UNITY 6.5 DOMINADA</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Emita a proclamacao no console
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("DIMENSAO UNITY 6.5 DOMINADA");
    }
}`,
            tests: [
                { input: "", expected: "DIMENSAO UNITY 6.5 DOMINADA", description: "Proclamação de domínio da Dimensão C#" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("DIMENSAO UNITY 6.5 DOMINADA");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("DIMENSAO UNITY 6.5 DOMINADA")) errors.push("A saída deve ser 'DIMENSAO UNITY 6.5 DOMINADA'");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_2",
            title: "Despacho de Evento de Vitória",
            difficulty: "medium",
            description: "Declare <code>string evento = \"OnVictory\";</code> e <code>int pontuacao = 10000;</code>. Emita no Console:<br><code>[EVENTO] OnVictory Disparado | Score: 10000</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string evento = "OnVictory";
        int pontuacao = 10000;
        // Emita o log do evento disparado
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string evento = "OnVictory";
        int pontuacao = 10000;
        Debug.Log("[EVENTO] " + evento + " Disparado | Score: " + pontuacao);
    }
}`,
            tests: [
                { input: "", expected: "[EVENTO] OnVictory Disparado | Score: 10000", description: "Notificação de evento global desacoplado" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("[EVENTO] " + evento + " Disparado | Score: " + pontuacao);' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("[EVENTO] OnVictory Disparado | Score: 10000")) errors.push("Saída incorreta no disparo de evento");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_8_3",
            title: "Ascensão do Arquiteto de Jogos",
            difficulty: "hard",
            description: "Emita as 3 linhas finais de ascensão no Console do Unity:<br><code>[1] Game Loop Otimizado</code><br><code>[2] Fisica e Matematica 3D Calibradas</code><br><code>[3] Titulo: Mestre Desenvolvedor Unity Concedido</code>",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Emita as 3 proclamacoes finais
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("[1] Game Loop Otimizado");
        Debug.Log("[2] Fisica e Matematica 3D Calibradas");
        Debug.Log("[3] Titulo: Mestre Desenvolvedor Unity Concedido");
    }
}`,
            tests: [
                { input: "", expected: "[1] Game Loop Otimizado\n[2] Fisica e Matematica 3D Calibradas\n[3] Titulo: Mestre Desenvolvedor Unity Concedido", description: "Certificado final de conclusão da Dimensão C# Unity" }
            ],
            hints: [
                { level: "I", text: 'Debug.Log("[1] Game Loop Otimizado");' },
                { level: "II", text: 'Debug.Log("[2] Fisica e Matematica 3D Calibradas");' },
                { level: "III", text: 'Debug.Log("[3] Titulo: Mestre Desenvolvedor Unity Concedido");' }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!output.includes("Mestre Desenvolvedor Unity Concedido")) errors.push("Falta log do título de Mestre");
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
