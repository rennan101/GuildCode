/**
 * GUILDCODE - BASE DE DADOS DO GLOSSÁRIO DE C# E UNITY 6.5 (DIMENSÃO C# UNITY)
 * Contém categorias, sintaxe moderna, monoBehaviours, APIs matemáticas 3D,
 * física, ciclo de vida e sabedoria da Guilda para desenvolvimento de jogos.
 */

window.CSHARP_GLOSSARY_CATEGORIES = [
    { 
        id: 'all', 
        name: 'Todos os Tópicos', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>' 
    },
    { 
        id: 'csharp_basics', 
        name: 'Fundamentos C# & POO', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' 
    },
    { 
        id: 'unity_lifecycle', 
        name: 'Ciclo de Vida & Engine', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>' 
    },
    { 
        id: 'math3d', 
        name: 'Matemática 3D & Vetores', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' 
    },
    { 
        id: 'physics', 
        name: 'Física 3D & Colisões', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M10 15l5-3-5-3v6z"/></svg>' 
    },
    { 
        id: 'input_camera', 
        name: 'Input & Cinemachine', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' 
    },
    { 
        id: 'coroutines_events', 
        name: 'Coroutines, Events & Async', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>' 
    },
    { 
        id: 'optimization', 
        name: 'ScriptableObjects & Otimização', 
        svg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>' 
    }
];

window.CSHARP_GLOSSARY_DATA = [
    // ═══════════════════════════════════════════════════════════════
    // 1. FUNDAMENTOS C# & POO
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'cs-variables',
        title: 'Variáveis e Tipos Primitivos em C#',
        category: 'csharp_basics',
        level: 'Iniciante',
        summary: 'Armazenamento fortemente tipado de valores na memória com int, float, string, bool e char.',
        description: 'Em C#, todas as variáveis possuem tipo explícito ou inferido com var. No desenvolvimento de jogos com Unity, números decimais de precisão simples (float) são os mais comuns para representar posições, velocidades e temporizadores, exigindo o sufixo "f".',
        syntax: 'int vida = 100;\nfloat velocidade = 7.5f;\nstring nome = "Herói";\nbool estaVivo = true;',
        code: `using UnityEngine;

public class PlayerStatus : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        float velocidade = 8.5f;
        string nome = "Aventureiro";
        bool estaVivo = true;

        Debug.Log("Jogador: " + nome);
        Debug.Log("Vida: " + vida + " | Velocidade: " + velocidade);
        Debug.Log("Status Ativo: " + estaVivo);
    }
}`,
        output: "Jogador: Aventureiro\nVida: 100 | Velocidade: 8.5\nStatus Ativo: True",
        guildWisdom: 'Lembre-se sempre de colocar o "f" ao declarar literais do tipo float (ex: 5.0f). Se esquecer, o compilador C# assumirá double, gerando erro de compilação na Unity.',
        pitfalls: 'Tentar armazenar decimais em int resultará em perda de casas decimais (truncamento) ou erro de compilação se não houver cast explícito.'
    },
    {
        id: 'cs-classes-oop',
        title: 'Classes, Objetos e Encapsulamento',
        category: 'csharp_basics',
        level: 'Intermediário',
        summary: 'Modelagem de entidades orientadas a objetos com propriedades, métodos e construtores.',
        description: 'Classes são os moldes que definem dados e comportamentos. Em Unity, nem todas as classes herdam de MonoBehaviour — classes puras em C# são ideais para gerenciar inventários, cálculos matemáticos puros e dados de save.',
        syntax: 'public class Arma\n{\n    public string Nome { get; set; }\n    public int Dano { get; private set; }\n    public Arma(string nome, int dano) { Nome = nome; Dano = dano; }\n}',
        code: `using UnityEngine;

public class TesteArmas : MonoBehaviour
{
    public class ItemArma
    {
        public string nome;
        public int danoBase;

        public ItemArma(string n, int d)
        {
            nome = n;
            danoBase = d;
        }

        public void Disparar()
        {
            Debug.Log(nome + " causou " + danoBase + " de dano!");
        }
    }

    void Start()
    {
        ItemArma espada = new ItemArma("Lâmina Rúnica", 45);
        espada.Disparar();
    }
}`,
        output: "Lâmina Rúnica causou 45 de dano!",
        guildWisdom: 'Use [System.Serializable] em classes C# puras para que suas propriedades apareçam e possam ser editadas diretamente no Inspector da Unity!',
        pitfalls: 'Instanciar classes MonoBehaviour com "new MinhaClasse()" causará aviso severo no Unity. MonoBehaviours devem ser anexados com AddComponent<T>() ou instanciados como prefabs.'
    },

    // ═══════════════════════════════════════════════════════════════
    // 2. CICLO DE VIDA & ENGINE
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'unity-monobehaviour-lifecycle',
        title: 'Ciclo de Vida do MonoBehaviour (Awake, Start, Update)',
        category: 'unity_lifecycle',
        level: 'Fundamental',
        summary: 'A ordem exata de execução dos eventos invocados pela Game Engine da Unity.',
        description: 'O ciclo de vida da Unity orquestra a inicialização e os frames do jogo:\n- Awake: Chamado assim que o GameObject é instanciado na memória (mesmo se o componente estiver desativado).\n- OnEnable: Chamado quando o script é ativado.\n- Start: Chamado no primeiro frame antes do Update, ideal para dependências prontas.\n- Update: Executado uma vez a cada frame renderizado (tempo variável).\n- FixedUpdate: Executado em intervalos de tempo fixos (essencial para física com Rigidbody).\n- LateUpdate: Executado após todos os Updates (essencial para câmeras que seguem alvos).',
        syntax: 'void Awake() { /* Setup inicial */ }\nvoid Start() { /* Primeiro frame */ }\nvoid Update() { /* Lógica por frame */ }\nvoid FixedUpdate() { /* Física Rigidbody */ }',
        code: `using UnityEngine;

public class CicloVidaDemo : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("[1] Awake: Referências alocadas.");
    }

    void Start()
    {
        Debug.Log("[2] Start: Batalha iniciada!");
    }

    void Update()
    {
        // Executado a cada frame renderizado
    }

    void FixedUpdate()
    {
        // Intervalo fixo (Física 3D)
    }
}`,
        output: "[1] Awake: Referências alocadas.\n[2] Start: Batalha iniciada!",
        guildWisdom: 'Nunca aplique forças de física ou movimentação de Rigidbody dentro de Update(). Faça isso sempre no FixedUpdate() para manter consistência em qualquer taxa de quadros (FPS).',
        pitfalls: 'Tentar acessar outro GameObject no Awake() antes que ele tenha se inicializado pode gerar NullReferenceException. Deixe conexões entre objetos para o Start().'
    },
    {
        id: 'unity-gameobject-transform',
        title: 'GameObjects, Components e Transform 3D',
        category: 'unity_lifecycle',
        level: 'Iniciante',
        summary: 'A hierarquia fundamental de nós e componentes que compõem uma cena 3D.',
        description: 'Tudo em uma cena da Unity é um GameObject. Todo GameObject possui obrigatoriamente um Transform, que define sua posição (Vector3 position), rotação (Quaternion rotation) e escala (Vector3 localScale) no espaço 3D.',
        syntax: 'transform.position += Vector3.forward * velocidade * Time.deltaTime;\nGameObject inimigo = GameObject.FindWithTag("Enemy");\nRigidbody rb = GetComponent<Rigidbody>();',
        code: `using UnityEngine;

public class MovimentoSimples : MonoBehaviour
{
    public float velocidade = 5.0f;

    void Update()
    {
        // Move o objeto para frente no espaço local
        transform.Translate(Vector3.forward * velocidade * Time.deltaTime);
    }
}`,
        output: "Objeto movimentado continuamente no eixo Z!",
        guildWisdom: 'Sempre multiplique velocidades contínuas por Time.deltaTime no Update() para tornar o movimento independente da taxa de quadros (FPS).',
        pitfalls: 'Chamar GetComponent<T>() dentro do Update() a cada frame causa queda severa de performance. Guarde a referência em uma variável privada no Awake() ou Start().'
    },

    // ═══════════════════════════════════════════════════════════════
    // 3. MATEMÁTICA 3D & VETORES
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'unity-vector3-math',
        title: 'Vector3 e Matemática Espacial 3D',
        category: 'math3d',
        level: 'Intermediário',
        summary: 'Manipulação de coordenadas (x, y, z), direções normalizadas, distâncias e produtos vetoriais.',
        description: 'Vector3 representa pontos e direções no espaço tridimensional. Atalhos úteis incluem Vector3.forward (0,0,1), Vector3.up (0,1,0), Vector3.right (1,0,0) e Vector3.zero (0,0,0).',
        syntax: 'Vector3 direcao = (alvo.position - transform.position).normalized;\nfloat distancia = Vector3.Distance(transform.position, alvo.position);\nfloat dot = Vector3.Dot(transform.forward, direcao);',
        code: `using UnityEngine;

public class Vector3Demo : MonoBehaviour
{
    void Start()
    {
        Vector3 origem = new Vector3(0, 0, 0);
        Vector3 destino = new Vector3(3, 4, 0);

        float dist = Vector3.Distance(origem, destino);
        Vector3 dir = (destino - origem).normalized;

        Debug.Log("Distancia ate o alvo: " + dist);
        Debug.Log("Direcao normalizada: " + dir.ToString());
    }
}`,
        output: "Distancia ate o alvo: 5\nDirecao normalizada: (0.6, 0.8, 0.0)",
        guildWisdom: 'Para comparar distâncias sem custo de raiz quadrada, use (posA - posB).sqrMagnitude em vez de Vector3.Distance() dentro de laços pesados.',
        pitfalls: 'Esquecer de normalizar um vetor de direção fará com que o personagem se mova mais rápido ao andar na diagonal (ex: x=1, z=1 tem magnitude ~1.41).'
    },
    {
        id: 'unity-raycasting-3d',
        title: 'Raycasting e Detecção Espacial',
        category: 'math3d',
        level: 'Avançado',
        summary: 'Projeção de raios invisíveis no espaço 3D para detecção de chão, mira e visibilidade.',
        description: 'Physics.Raycast dispara um raio a partir de uma origem em determinada direção e retorna se houve impacto com algum Collider da cena, fornecendo dados como ponto de impacto e normal da superfície.',
        syntax: 'RaycastHit hit;\nif (Physics.Raycast(origem, direcao, out hit, distanciaMax, layerMask))\n{\n    Debug.Log("Atingiu: " + hit.collider.name);\n}',
        code: `using UnityEngine;

public class MiraLaser : MonoBehaviour
{
    void Update()
    {
        RaycastHit hit;
        if (Physics.Raycast(transform.position, transform.forward, out hit, 100f))
        {
            Debug.Log("Alvo na mira: " + hit.collider.name + " a " + hit.distance + "m");
            Debug.DrawLine(transform.position, hit.point, Color.red);
        }
    }
}`,
        output: "Alvo na mira: InimigoGolem a 12.4m",
        guildWisdom: 'Sempre passe uma LayerMask para o Raycast a fim de evitar testes desnecessários contra o próprio jogador ou partículas do ambiente.',
        pitfalls: 'Se a origem do Raycast estiver dentro do próprio Collider do objeto que o dispara, o raio pode colidir consigo mesmo imediatamente. Utilize offsets ou ignore o próprio collider.'
    },

    // ═══════════════════════════════════════════════════════════════
    // 4. FÍSICA 3D & COLISÕES
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'unity-rigidbody-physics',
        title: 'Rigidbody, Forças e Gravidade',
        category: 'physics',
        level: 'Intermediário',
        summary: 'Controle de corpos rígidos físicos, velocidade linear e modos de aplicação de força.',
        description: 'O componente Rigidbody coloca o GameObject sob o controle do motor de física PhysX da Unity. No Unity 6+, utilize rb.linearVelocity para consultar ou aplicar velocidades diretas, ou AddForce() para impulsos e forças contínuas.',
        syntax: 'Rigidbody rb = GetComponent<Rigidbody>();\nrb.AddForce(Vector3.up * forcaPulo, ForceMode.Impulse);\nrb.linearVelocity = new Vector3(movX, rb.linearVelocity.y, movZ);',
        code: `using UnityEngine;

public class PuloFisico : MonoBehaviour
{
    private Rigidbody rb;
    public float forcaPulo = 7.0f;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    public void Pular()
    {
        rb.AddForce(Vector3.up * forcaPulo, ForceMode.Impulse);
        Debug.Log("Força de pulo aplicada!");
    }
}`,
        output: "Força de pulo aplicada!",
        guildWisdom: 'Use ForceMode.Impulse para ações instantâneas (pulos, tiros, explosões) e ForceMode.Force para empurrões contínuos (vento, propulsão).',
        pitfalls: 'Mover a posição de um objeto com Rigidbody alterando diretamente transform.position quebra a detecção contínua de colisão. Use rb.MovePosition() ou altere a velocidade.'
    },
    {
        id: 'unity-collisions-triggers',
        title: 'Colisões Sólidas vs Triggers (Gatilhos)',
        category: 'physics',
        level: 'Iniciante',
        summary: 'Detecção de impacto físico com OnCollisionEnter e passagens invisíveis com OnTriggerEnter.',
        description: 'Colisores sólidos bloqueiam passagem e disparam eventos OnCollisionEnter/Stay/Exit. Quando a opção "Is Trigger" está marcada no Collider, ele se torna permeável (como portais, moedas e zonas de dano), disparando OnTriggerEnter/Stay/Exit.',
        syntax: 'void OnCollisionEnter(Collision collision) { /* Bateu em sólido */ }\nvoid OnTriggerEnter(Collider other) { /* Entrou no gatilho */ }',
        code: `using UnityEngine;

public class ColetavelMoeda : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            Debug.Log("Moeda coletada pelo aventureiro!");
            Destroy(gameObject);
        }
    }
}`,
        output: "Moeda coletada pelo aventureiro!",
        guildWisdom: 'Use sempre other.CompareTag("Player") em vez de other.tag == "Player". CompareTag é otimizado e não aloca lixo na memória.',
        pitfalls: 'Para que eventos de colisão ou trigger funcionem, pelo menos UM dos dois GameObjects envolvidos precisa obrigatoriamente possuir um componente Rigidbody.'
    },

    // ═══════════════════════════════════════════════════════════════
    // 5. INPUT & CINEMACHINE
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'unity-input-system',
        title: 'Input System Moderno & Input Actions',
        category: 'input_camera',
        level: 'Intermediário',
        summary: 'Captura moderna de teclado, mouse e gamepads com o novo Input System da Unity.',
        description: 'O novo pacote Input System substitui a API legada Input.GetKey(). Ele suporta mapeamentos reconfiguráveis (.inputactions) e leitura direta de dispositivos com Keyboard.current e Mouse.current.',
        syntax: 'if (Keyboard.current.spaceKey.wasPressedThisFrame) { Pular(); }\nVector2 move = Keyboard.current.wKey.isPressed ? Vector2.up : Vector2.zero;',
        code: `using UnityEngine;
using UnityEngine.InputSystem;

public class InputModernoDemo : MonoBehaviour
{
    void Update()
    {
        if (Keyboard.current != null && Keyboard.current.spaceKey.wasPressedThisFrame)
        {
            Debug.Log("Ação: Tecla Espaço acionada!");
        }
    }
}`,
        output: "Ação: Tecla Espaço acionada!",
        guildWisdom: 'Sempre verifique se Keyboard.current != null antes de ler teclas para evitar NullReference caso nenhum teclado esteja conectado.',
        pitfalls: 'Certifique-se de que o projeto esteja configurado para "Active Input Handling: Both" ou "Input System Package (New)" em Project Settings → Player.'
    },
    {
        id: 'unity-cinemachine-cameras',
        title: 'Cinemachine & Câmera Virtual 3ª/1ª Pessoa',
        category: 'input_camera',
        level: 'Intermediário',
        summary: 'Sistemas inteligentes de controle de câmera procedural para personagens e cutscenes.',
        description: 'Cinemachine permite criar Câmeras Virtuais (CinemachineVirtualCamera) que seguem o alvo (Follow) e olham na direção dele (LookAt) com amortecimento suave (Damping), evitando escrever código manual de interpolação para câmeras.',
        syntax: 'CinemachineVirtualCamera vcam = GetComponent<CinemachineVirtualCamera>();\nvcam.Follow = jogadorTransform;\nvcam.LookAt = jogadorTransform;',
        code: `using UnityEngine;

public class CameraTracker : MonoBehaviour
{
    public Transform alvo;

    void LateUpdate()
    {
        if (alvo != null)
        {
            // Câmera segue o alvo no LateUpdate para evitar tremores (jitter)
            transform.position = alvo.position + new Vector3(0, 3, -6);
            transform.LookAt(alvo);
        }
    }
}`,
        output: "Câmera alinhada e acompanhando o alvo com suavidade!",
        guildWisdom: 'Todo cálculo e movimentação de câmera deve ser realizado no LateUpdate() para garantir que os personagens já tenham completado seus movimentos do frame.',
        pitfalls: 'Atualizar a câmera no Update() enquanto o jogador se move no FixedUpdate() causará efeito de "engasgo" visual (camera jitter).'
    },

    // ═══════════════════════════════════════════════════════════════
    // 6. COROUTINES, EVENTS & ASYNC
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'unity-coroutines',
        title: 'Coroutines e Temporizadores com IEnumerator',
        category: 'coroutines_events',
        level: 'Avançado',
        summary: 'Execução assíncrona controlada quadro a quadro sem travar a thread principal do jogo.',
        description: 'Coroutines permitem pausar a execução de uma função e retornar o controle para o Unity até que uma condição (como tempo decorrido com WaitForSeconds ou fim do frame com null) seja satisfeita.',
        syntax: 'StartCoroutine(RotinaRecarga());\nIEnumerator RotinaRecarga()\n{\n    yield return new WaitForSeconds(3.0f);\n    Debug.Log("Recarregado!");\n}',
        code: `using System.Collections;
using UnityEngine;

public class CoroutineDemo : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(ContagemRegressiva());
    }

    IEnumerator ContagemRegressiva()
    {
        Debug.Log("Iniciando em 3...");
        yield return new WaitForSeconds(1.0f);
        Debug.Log("2...");
        yield return new WaitForSeconds(1.0f);
        Debug.Log("1... VAI!");
    }
}`,
        output: "Iniciando em 3...\n2...\n1... VAI!",
        guildWisdom: 'Armazene instâncias de WaitForSeconds em variáveis de classe para evitar que o "new WaitForSeconds()" crie alocação de lixo no Garbage Collector a cada chamada repetida.',
        pitfalls: 'Se o GameObject que iniciou a Coroutine for destruído ou desativado (gameObject.SetActive(false)), a execução da Coroutine será interrompida imediatamente.'
    },

    // ═══════════════════════════════════════════════════════════════
    // 7. SCRIPTABLEOBJECTS & OTIMIZAÇÃO
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'unity-scriptable-objects',
        title: 'ScriptableObjects — Contêineres de Dados Puros',
        category: 'optimization',
        level: 'Avançado',
        summary: 'Armazenamento de grandes volumes de dados compartilhados independentes de instâncias de cena.',
        description: 'ScriptableObjects são classes que não precisam ser anexadas a GameObjects. Elas são salvas como Assets (.asset) no projeto, perfeitas para tabelas de status de armas, itens, configurações de inimigos e sistemas modulares.',
        syntax: '[CreateAssetMenu(fileName = "NovoItem", menuName = "RPG/Item")]\npublic class ItemData : ScriptableObject\n{\n    public string nome;\n    public int valor;\n    public Sprite icone;\n}',
        code: `using UnityEngine;

[CreateAssetMenu(fileName = "InimigoConfig", menuName = "Config/Inimigo")]
public class InimigoConfig : ScriptableObject
{
    public string nomeInimigo = "Esqueleto Guerreiro";
    public int vidaMaxima = 150;
    public float velocidade = 4.2f;

    public void ExibirFicha()
    {
        Debug.Log("Ficha: " + nomeInimigo + " | HP: " + vidaMaxima);
    }
}`,
        output: "Ficha: Esqueleto Guerreiro | HP: 150",
        guildWisdom: 'Compartilhar um único ScriptableObject entre 1000 inimigos economiza muita memória RAM, pois todos lerão a mesma referência de configuração sem duplicar variáveis.',
        pitfalls: 'Modificar valores de um ScriptableObject durante o Play Mode no editor do Unity altera o arquivo salvo no disco permanentemente.'
    },
    {
        id: 'unity-object-pooling',
        title: 'Object Pooling — Reuso de Objetos e Anti-Lag',
        category: 'optimization',
        level: 'Mestre',
        summary: 'Padrão de projeto essencial para evitar chamadas de Instantiate/Destroy e travamentos de Garbage Collection.',
        description: 'Object Pooling pré-instancia um conjunto de GameObjects (projéteis, efeitos, inimigos) e os desativa. Quando necessário, o jogo apenas ativa um objeto da fila e o desativa após o uso, mantendo o framerate liso e constante.',
        syntax: 'Queue<GameObject> pool = new Queue<GameObject>();\nGameObject obj = pool.Dequeue();\nobj.SetActive(true);',
        code: `using System.Collections.Generic;
using UnityEngine;

public class PoolExemplo : MonoBehaviour
{
    private Queue<string> poolBalas = new Queue<string>();

    void Start()
    {
        // Pré-aloca 3 projéteis na pool
        poolBalas.Enqueue("Bala_01");
        poolBalas.Enqueue("Bala_02");
        poolBalas.Enqueue("Bala_03");

        // Dispara uma bala reaproveitada
        string balaAtiva = poolBalas.Dequeue();
        Debug.Log("Disparando projétil reciclado: " + balaAtiva);
    }
}`,
        output: "Disparando projétil reciclado: Bala_01",
        guildWisdom: 'No Unity 2021+, a engine já disponibiliza a classe nativa UnityEngine.Pool.ObjectPool<T>, pronta e altamente otimizada.',
        pitfalls: 'Chamar Instantiate() e Destroy() em alta frequência (ex: armas automáticas) sobrecarrega o coletor de lixo (GC), causando micro-travamentos (stuttering) constantes no jogo.'
    }
];
