/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — C# & UNITY 6.5 CHAPTERS DATA (DIMENSÃO C# UNITY)
   9 Módulos estruturados de Game Development em C# e Unity 6.5.
   Personagens originais: ARKAN, LYRA, KAEL, MIRA, ORIN, ELION, GM.
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
            instructions: "Declare uma variável `int vida = 100;` e imprima no console exatamente `Vida: 100` usando `Debug.Log`.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Seu codigo aqui
    }
}`,
            expectedOutput: "Vida: 100",
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        Debug.Log("Vida: " + vida);
    }
}`,
            hints: ["Declare int vida = 100;", "Use Debug.Log(\"Vida: \" + vida);"]
        }
    ]
},

// ═══════════════════════════════════════════════════════
// CAPÍTULO 01 — CICLO DE VIDA DO MONOBEHAVIOUR & GAMEOBJECTS
// ═══════════════════════════════════════════════════════
{
    id: 1,
    title: "O Ciclo de Vida do MonoBehaviour",
    theme: "Awake, Start e Update",
    unlock: "Coração da Engine",
    unlockIcon: "[SYNC]",
    character: "lyra",
    xpReward: 85,
    story: [
        { type: "narrative", text: "As engrenagens invisíveis do tempo começam a bater no ritmo de 60 frames por segundo." },
        { type: "character", name: "LYRA NEX", role: "ARQUIVISTA", cssClass: "lyra", text: "Em Unity, tudo segue uma sequência sagrada. <code>Awake()</code> desperta as variáveis antes de tudo, <code>Start()</code> inicia a jornada no primeiro frame e <code>Update()</code> pulsa continuamente a cada renderização." },
        { type: "character", name: "KAEL", role: "FERREIRO DE CÓDIGO", cssClass: "kael", text: "Se colocarmos cálculos pesados de inicialização dentro do Update, o jogo travará e a taxa de quadros despencará! Respeite o ciclo de vida da Engine." },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: "Compreender a ordem de eventos é a chave para evitar referências nulas e criar comportamentos fluidos." }
    ],
    concept: {
        title: "AWAKE & START",
        explanation: "Awake() é chamado imediatamente quando o script é carregado na memória. Start() roda apenas uma vez no primeiro quadro ativo.",
        code: `using UnityEngine;

public class CicloExemplo : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("Awake: Componentes carregados.");
    }

    void Start()
    {
        Debug.Log("Start: Jogo iniciado.");
    }
}`
    },
    example: {
        title: "Exemplo — Sequência de Inicialização",
        code: `using UnityEngine;

public class SetupGame : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("[1] Memoria alocada.");
    }
    void Start()
    {
        Debug.Log("[2] Personagem pronto na cena.");
    }
}`,
        output: "[1] Memoria alocada.\n[2] Personagem pronto na cena."
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
            instructions: "Dentro de `Start()`, emita no console a mensagem `Iniciando Fase 1`.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Seu codigo aqui
    }
}`,
            expectedOutput: "Iniciando Fase 1",
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Iniciando Fase 1");
    }
}`,
            hints: ["Use Debug.Log(\"Iniciando Fase 1\");"]
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
            title: "Cálculo de Distância",
            difficulty: "medium",
            instructions: "Crie dois pontos `Vector3 p1 = new Vector3(0,0,0);` e `Vector3 p2 = new Vector3(6,8,0);`. Calcule a distância com `Vector3.Distance` e imprima `Distancia: 10`.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Seu codigo aqui
    }
}`,
            expectedOutput: "Distancia: 10",
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
            hints: ["float d = Vector3.Distance(p1, p2);", "Debug.Log(\"Distancia: \" + d);"]
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
            title: "Simulação de Impulso",
            difficulty: "easy",
            instructions: "Declare `float forcaSalto = 12.5f;` e imprima `Forca de Salto: 12.5`.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Seu codigo aqui
    }
}`,
            expectedOutput: "Forca de Salto: 12.5",
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        float forcaSalto = 12.5f;
        Debug.Log("Forca de Salto: " + forcaSalto);
    }
}`,
            hints: ["Debug.Log(\"Forca de Salto: \" + forcaSalto);"]
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
            title: "Detecção de Coleta",
            difficulty: "easy",
            instructions: "Se `int moedas = 1;`, exiba `Moeda Coletada: 1`.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int moedas = 1;
        // Seu codigo aqui
    }
}`,
            expectedOutput: "Moeda Coletada: 1",
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int moedas = 1;
        Debug.Log("Moeda Coletada: " + moedas);
    }
}`,
            hints: ["Debug.Log(\"Moeda Coletada: \" + moedas);"]
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
            difficulty: "medium",
            instructions: "Defina `string inimigo = \"Dragao\";` e `int hp = 500;`. Imprima `Inimigo: Dragao | HP: 500`.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Seu codigo aqui
    }
}`,
            expectedOutput: "Inimigo: Dragao | HP: 500",
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
            hints: ["Debug.Log(\"Inimigo: \" + inimigo + \" | HP: \" + hp);"]
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
            difficulty: "medium",
            instructions: "Imprima `Status: Recarregado` usando `Debug.Log`.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Seu codigo aqui
    }
}`,
            expectedOutput: "Status: Recarregado",
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Status: Recarregado");
    }
}`,
            hints: ["Debug.Log(\"Status: Recarregado\");"]
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
            title: "Eficiência de Memória",
            difficulty: "medium",
            instructions: "Declare `int poolCount = 50;` e imprima `Objetos em Pool: 50`.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Seu codigo aqui
    }
}`,
            expectedOutput: "Objetos em Pool: 50",
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int poolCount = 50;
        Debug.Log("Objetos em Pool: " + poolCount);
    }
}`,
            hints: ["Debug.Log(\"Objetos em Pool: \" + poolCount);"]
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
            difficulty: "hard",
            instructions: "Imprima `DIMENSAO UNITY 6.5 DOMINADA` no console.",
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Seu codigo aqui
    }
}`,
            expectedOutput: "DIMENSAO UNITY 6.5 DOMINADA",
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Debug.Log("DIMENSAO UNITY 6.5 DOMINADA");
    }
}`,
            hints: ["Debug.Log(\"DIMENSAO UNITY 6.5 DOMINADA\");"]
        }
    ]
}
];
