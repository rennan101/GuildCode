/**
 * ACTS PART 2: Chapters 6 to 12
 * 6: Classes e Objetos (OOP)
 * 7: Herança e Polimorfismo
 * 8: GameObjects e Components
 * 9: Transform — Posição, Rotação e Escala
 * 10: Ciclo de Vida do MonoBehaviour
 * 11: Input System Moderno
 * 12: Input Actions & Mapeamento
 */

function buildPart2() {
    const acts = {};

    // 6: Classes e Objetos (OOP)
    acts[6] = [
        {
            title: "Instanciação de Objeto Simples", diff: "easy",
            desc: "Simule a criação de um item de inventário: crie um objeto com nome 'Espada' e poder 45. Emita no Console: 'Item: Espada | Poder: 45'.",
            reqs: ["string itemNome", "int itemPoder", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o item e imprima seu status\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string itemNome = "Espada";\n        int itemPoder = 45;\n        Debug.Log("Item: " + itemNome + " | Poder: " + itemPoder);\n    }\n}`,
            exp: "Item: Espada | Poder: 45", descTest: "Atributos de objeto"
        },
        {
            title: "Método Construtor e Inicialização", diff: "easy",
            desc: "Configure dois atributos de uma entidade: heroi 'Kael' e nivel 10. Emita no Console: 'Entidade: Kael | Nivel: 10'.",
            reqs: ["heroi", "nivel", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Defina heroi e nivel e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = "Kael";\n        int nivel = 10;\n        Debug.Log("Entidade: " + heroi + " | Nivel: " + nivel);\n    }\n}`,
            exp: "Entidade: Kael | Nivel: 10", descTest: "Inicialização de entidade"
        },
        {
            title: "Encapsulamento com Propriedades Get/Set", diff: "medium",
            desc: "Simule a alteração de vida de uma entidade: inicie vidaMaxima com 100 e vidaAtual com 75. Emita no Console: 'Vida: 75/100'.",
            reqs: ["int vidaMaxima", "int vidaAtual", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure vidaMaxima e vidaAtual\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vidaMaxima = 100;\n        int vidaAtual = 75;\n        Debug.Log("Vida: " + vidaAtual + "/" + vidaMaxima);\n    }\n}`,
            exp: "Vida: 75/100", descTest: "Formatação de vida e teto máximo"
        },
        {
            title: "Método de Instância de Ataque", diff: "medium",
            desc: "Invoque uma rotina de combate de objeto: calcule o danoCausado aplicando um danoBase de 30 multiplicado por forca de 2. Emita no Console: 'Ataque Desferido: 60'.",
            reqs: ["int danoBase", "int forca", "danoCausado", "*"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule danoCausado e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 30;\n        int forca = 2;\n        int danoCausado = danoBase * forca;\n        Debug.Log("Ataque Desferido: " + danoCausado);\n    }\n}`,
            exp: "Ataque Desferido: 60", descTest: "Cálculo de método de ataque"
        },
        {
            title: "Contagem de Instâncias", diff: "medium",
            desc: "Simule o rastreamento de entidades ativas na cena: inicie totalInimigos com 0, incremente duas vezes e emita 'Inimigos Ativos: ' + totalInimigos.",
            reqs: ["totalInimigos", "++", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalInimigos = 0;\n        // Incremente duas vezes e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalInimigos = 0;\n        totalInimigos++;\n        totalInimigos++;\n        Debug.Log("Inimigos Ativos: " + totalInimigos);\n    }\n}`,
            exp: "Inimigos Ativos: 2", descTest: "Incremento de instâncias"
        }
    ];

    // 7: Herança e Polimorfismo
    acts[7] = [
        {
            title: "Sobrescrita de Mensagem (Override)", diff: "easy",
            desc: "Declare string classe = 'Guerreiro'; e string arma = 'Espada';. Simule a ação herdada emitida com Debug.Log(classe + ' atacando com ' + arma + '!');.",
            reqs: ["string classe", "string arma", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare classe e arma e emita o ataque\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string classe = "Guerreiro";\n        string arma = "Espada";\n        Debug.Log(classe + " atacando com " + arma + "!");\n    }\n}`,
            exp: "Guerreiro atacando com Espada!", descTest: "Ação polimórfica"
        },
        {
            title: "Subclasse Mago com Habilidade Arcana", diff: "easy",
            desc: "Declare tipoInimigo como 'Mago' e magia como 'Bola de Fogo'. Emita no Console: 'Mago conjurando Bola de Fogo!'.",
            reqs: ["tipoInimigo", "magia", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure tipoInimigo e magia e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoInimigo = "Mago";\n        string magia = "Bola de Fogo";\n        Debug.Log(tipoInimigo + " conjurando " + magia + "!");\n    }\n}`,
            exp: "Mago conjurando Bola de Fogo!", descTest: "Especialização de subclasse"
        },
        {
            title: "Chamada de Método Base", diff: "medium",
            desc: "Declare string fase1 = 'Base: Inicializado'; e string fase2 = 'Derivado: Equipamento Carregado';. Emita ambas em linhas separadas no Console.",
            reqs: ["string fase1", "string fase2", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare fase1 e fase2 e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string fase1 = "Base: Inicializado";\n        string fase2 = "Derivado: Equipamento Carregado";\n        Debug.Log(fase1);\n        Debug.Log(fase2);\n    }\n}`,
            exp: "Base: Inicializado\nDerivado: Equipamento Carregado", descTest: "Sequência base e derivada"
        },
        {
            title: "Cálculo de Armadura Polimórfico", diff: "medium",
            desc: "Declare o danoRecebido como 50 e a reducaoArmadura como 15. Calcule o danoReal subtraindo a redução do dano e emita 'Dano Sofrido: ' + danoReal.",
            reqs: ["danoRecebido", "reducaoArmadura", "danoReal", "-"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o dano considerando a armadura\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoRecebido = 50;\n        int reducaoArmadura = 15;\n        int danoReal = danoRecebido - reducaoArmadura;\n        Debug.Log("Dano Sofrido: " + danoReal);\n    }\n}`,
            exp: "Dano Sofrido: 35", descTest: "Redução de dano por armadura"
        },
        {
            title: "Lista Polimórfica de Ações", diff: "medium",
            desc: "Crie um array com duas ações de combate: 'Arqueiro Dispara' e 'Guerreiro Golpeia'. Itere pelo array exibindo cada ação no Console.",
            reqs: ["string[] acoes", "for", "acoes.Length"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Percorra o array de acoes\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] acoes = new string[] { "Arqueiro Dispara", "Guerreiro Golpeia" };\n        for (int i = 0; i < acoes.Length; i++)\n        {\n            Debug.Log("Acao: " + acoes[i]);\n        }\n    }\n}`,
            exp: "Acao: Arqueiro Dispara\nAcao: Guerreiro Golpeia", descTest: "Lista de ações polimórficas"
        }
    ];

    // 8: GameObjects e Components
    acts[8] = [
        {
            title: "Identificação de GameObject", diff: "easy",
            desc: "Obtenha o nome do GameObject atual acessando a propriedade gameObject.name. Emita no Console: 'GameObject: Jogador'.",
            reqs: ["gameObject.name", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba o nome do GameObject\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("GameObject: " + gameObject.name);\n    }\n}`,
            exp: "GameObject: Jogador", descTest: "Acesso a gameObject.name"
        },
        {
            title: "Verificação de Tag", diff: "easy",
            desc: "Defina a variável string tag = 'Player';. Verifique com if se a tag é igual a 'Player' e emita 'Tag Valida: Player'.",
            reqs: ["tag", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tag = "Player";\n        // Cheque a tag e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tag = "Player";\n        if (tag == "Player")\n        {\n            Debug.Log("Tag Valida: " + tag);\n        }\n    }\n}`,
            exp: "Tag Valida: Player", descTest: "Checagem de tag"
        },
        {
            title: "Simulação de GetComponent", diff: "medium",
            desc: "Simule a busca de um componente Rigidbody: declare bool temRigidbody = true;. Se for verdadeiro, emita 'Componente Rigidbody Encontrado'.",
            reqs: ["bool temRigidbody", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temRigidbody = true;\n        // Cheque e emita a mensagem\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temRigidbody = true;\n        if (temRigidbody)\n        {\n            Debug.Log("Componente Rigidbody Encontrado");\n        }\n    }\n}`,
            exp: "Componente Rigidbody Encontrado", descTest: "Verificação de componente"
        },
        {
            title: "Estado Ativo de GameObject", diff: "medium",
            desc: "Declare a variável booleana estaAtivo = true;. Emita no Console: 'GameObject Ativo: True'.",
            reqs: ["bool estaAtivo", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare estaAtivo e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaAtivo = true;\n        Debug.Log("GameObject Ativo: " + estaAtivo);\n    }\n}`,
            exp: "GameObject Ativo: True", descTest: "Estado de ativação"
        },
        {
            title: "Contagem de Componentes", diff: "medium",
            desc: "Declare um array com os componentes do Player: 'Transform', 'MeshRenderer', 'Collider'. Exiba no Console: 'Total de Componentes: ' + componentes.Length.",
            reqs: ["string[] componentes", "componentes.Length", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o array de componentes e exiba o Length\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] componentes = new string[] { "Transform", "MeshRenderer", "Collider" };\n        Debug.Log("Total de Componentes: " + componentes.Length);\n    }\n}`,
            exp: "Total de Componentes: 3", descTest: "Contagem de componentes"
        }
    ];

    // 9: Transform
    acts[9] = [
        {
            title: "Leitura de Posição Inicial", diff: "easy",
            desc: "Acesse as coordenadas de posição inicial do transform e emita no Console: 'Posicao X: ' + transform.position.x.",
            reqs: ["transform.position.x", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba a coordenada X da posicao\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("Posicao X: " + transform.position.x);\n    }\n}`,
            exp: "Posicao X: 0", descTest: "Acesso a transform.position.x"
        },
        {
            title: "Deslocamento com Translate", diff: "easy",
            desc: "Simule um deslocamento: declare float vel = 5.0f e float dt = 0.016f. Calcule o deslocamento como vel * dt e emita 'Deslocamento: ' + deslocamento.",
            reqs: ["float vel", "float dt", "vel * dt", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vel = 5.0f;\n        float dt = 0.016f;\n        // Calcule o deslocamento e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vel = 5.0f;\n        float dt = 0.016f;\n        float deslocamento = vel * dt;\n        Debug.Log("Deslocamento: " + deslocamento);\n    }\n}`,
            exp: "Deslocamento: 0.08", descTest: "Cálculo de Translate"
        },
        {
            title: "Ajuste de Escala Local", diff: "medium",
            desc: "Simule a alteração da escala de um objeto: defina escalaX = 2.0f e escalaY = 2.0f. Emita no Console: 'Nova Escala: (2, 2)'.",
            reqs: ["float escalaX", "float escalaY", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure as escalas e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float escalaX = 2.0f;\n        float escalaY = 2.0f;\n        Debug.Log("Nova Escala: (" + escalaX + ", " + escalaY + ")");\n    }\n}`,
            exp: "Nova Escala: (2, 2)", descTest: "Escala local"
        },
        {
            title: "Rotação em Torno do Eixo Y", diff: "medium",
            desc: "Declare a velocidade de giro float velRotacao = 90.0f;. Emita no Console: 'Rotacao Y: ' + velRotacao + ' graus/s'.",
            reqs: ["float velRotacao", "velRotacao", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare velRotacao e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float velRotacao = 90.0f;\n        Debug.Log("Rotacao Y: " + velRotacao + " graus/s");\n    }\n}`,
            exp: "Rotacao Y: 90 graus/s", descTest: "Velocidade angular de rotação"
        },
        {
            title: "Vetor Forward de Direção", diff: "medium",
            desc: "Obtenha a coordenada z do vetor direcional transform.forward. Emita no Console: 'Direcao Z: ' + transform.forward.z.",
            reqs: ["transform.forward.z", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba o forward z\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("Direcao Z: " + transform.forward.z);\n    }\n}`,
            exp: "Direcao Z: 1", descTest: "Transform forward direction"
        }
    ];

    // 10: Ciclo de Vida
    acts[10] = [
        {
            title: "Ordem de Inicialização (Awake & Start)", diff: "easy",
            desc: "Implemente os métodos Awake() e Start() no script. Em Awake, emita '1. Awake' e em Start emita '2. Start'.",
            reqs: ["void Awake()", "void Start()", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    // Defina Awake e Start\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Awake()\n    {\n        Debug.Log("1. Awake");\n    }\n\n    void Start()\n    {\n        Debug.Log("2. Start");\n    }\n}`,
            exp: "1. Awake\n2. Start", descTest: "Awake antes de Start"
        },
        {
            title: "Simulação de Atualização de Quadro (Update)", diff: "easy",
            desc: "Declare int fps = 60;. Dentro de Start(), emita no Console: 'Update Ativo: ' + fps + ' FPS'.",
            reqs: ["int fps", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare int fps = 60 e imprima com Debug.Log\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int fps = 60;\n        Debug.Log("Update Ativo: " + fps + " FPS");\n    }\n}`,
            exp: "Update Ativo: 60 FPS", descTest: "Frequência de Update"
        },
        {
            title: "Física Síncrona com FixedUpdate", diff: "medium",
            desc: "Declare float fixedDeltaTime = 0.02f;. Emita no Console em Start o intervalo de física padrão do Unity: 'FixedUpdate Intervalo: ' + fixedDeltaTime + 's'.",
            reqs: ["float fixedDeltaTime", "0.02f", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare fixedDeltaTime e emita o intervalo de física\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float fixedDeltaTime = 0.02f;\n        Debug.Log("FixedUpdate Intervalo: " + fixedDeltaTime + "s");\n    }\n}`,
            exp: "FixedUpdate Intervalo: 0.02s", descTest: "Frequência fixa de física"
        },
        {
            title: "Ajuste de Câmera em LateUpdate", diff: "medium",
            desc: "Declare string faseCamera = 'LateUpdate: Posicionando Camera';. Emita no Console o valor de faseCamera com Debug.Log.",
            reqs: ["string faseCamera", "faseCamera", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare faseCamera e emita o log\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string faseCamera = "LateUpdate: Posicionando Camera";\n        Debug.Log(faseCamera);\n    }\n}`,
            exp: "LateUpdate: Posicionando Camera", descTest: "LateUpdate pós-movimento"
        },
        {
            title: "Limpeza de Recursos em OnDestroy", diff: "medium",
            desc: "Declare string statusDestruicao = 'OnDestroy: Recursos Liberados';. Emita a mensagem com Debug.Log.",
            reqs: ["string statusDestruicao", "statusDestruicao", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusDestruicao e emita o log\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusDestruicao = "OnDestroy: Recursos Liberados";\n        Debug.Log(statusDestruicao);\n    }\n}`,
            exp: "OnDestroy: Recursos Liberados", descTest: "Ciclo OnDestroy"
        }
    ];

    // 11: Input System Moderno
    acts[11] = [
        {
            title: "Detecção de Tecla com Keyboard.current", diff: "easy",
            desc: "Verifique o pressionamento da barra de espaço: avalie Keyboard.current.spaceKey.wasPressedThisFrame. Se for verdadeiro, emita 'Pulo Acionado!'.",
            reqs: ["Keyboard.current", "spaceKey", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Verifique o pulo no Keyboard.current\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current.spaceKey.wasPressedThisFrame)\n        {\n            Debug.Log("Pulo Acionado!");\n        }\n    }\n}`,
            exp: "Pulo Acionado!", descTest: "Detecção de spaceKey"
        },
        {
            title: "Leitura Contínua de Tecla de Movimento", diff: "easy",
            desc: "Verifique se a tecla W está sendo mantida pressionada usando Keyboard.current.wKey.isPressed. Se sim, emita 'Acelerando para Frente'.",
            reqs: ["Keyboard.current.wKey.isPressed", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque wKey.isPressed\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Keyboard.current.wKey.isPressed)\n        {\n            Debug.Log("Acelerando para Frente");\n        }\n    }\n}`,
            exp: "Acelerando para Frente", descTest: "isPressed contínuo"
        },
        {
            title: "Clique do Botão Esquerdo do Mouse", diff: "medium",
            desc: "Cheque o clique do botão esquerdo do mouse através de Mouse.current.leftButton.wasPressedThisFrame. Se verdadeiro, emita 'Disparo Efetuado!'.",
            reqs: ["Mouse.current.leftButton", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque o botao esquerdo do mouse\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        if (Mouse.current.leftButton.wasPressedThisFrame)\n        {\n            Debug.Log("Disparo Efetuado!");\n        }\n    }\n}`,
            exp: "Disparo Efetuado!", descTest: "Clique de mouse"
        },
        {
            title: "Leitura da Posição do Mouse", diff: "medium",
            desc: "Obtenha a coordenada X do ponteiro do mouse chamando Mouse.current.position.ReadValue().x. Emita no Console: 'Mouse X: ' + mouseX.",
            reqs: ["Mouse.current.position.ReadValue()", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Leia a posicao do mouse e imprima X\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mouseX = Mouse.current.position.ReadValue().x;\n        Debug.Log("Mouse X: " + mouseX);\n    }\n}`,
            exp: "Mouse X: 100", descTest: "Posição do cursor"
        },
        {
            title: "Suporte Multi-Dispositivo", diff: "medium",
            desc: "Simule a verificação de dispositivo conectado: declare bool tecladoConectado = true; e bool gamepadConectado = false;. Emita 'Dispositivo Principal: Teclado'.",
            reqs: ["bool tecladoConectado", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os dispositivos e emita o ativo\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool tecladoConectado = true;\n        if (tecladoConectado)\n        {\n            Debug.Log("Dispositivo Principal: Teclado");\n        }\n    }\n}`,
            exp: "Dispositivo Principal: Teclado", descTest: "Detecção de dispositivo"
        }
    ];

    // 12: Input Actions
    acts[12] = [
        {
            title: "Mapeamento de Ação de Pulo", diff: "easy",
            desc: "Simule a leitura de uma InputAction chamada 'Pular': declare bool acaoDisparada = true;. Se for verdadeira, emita 'InputAction: Pulo Registrado'.",
            reqs: ["bool acaoDisparada", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a acao de pulo\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool acaoDisparada = true;\n        if (acaoDisparada)\n        {\n            Debug.Log("InputAction: Pulo Registrado");\n        }\n    }\n}`,
            exp: "InputAction: Pulo Registrado", descTest: "Trigger de InputAction"
        },
        {
            title: "Leitura de Vetor de Movimento 2D", diff: "easy",
            desc: "Simule o valor de um joystick ou WASD: declare float horizontal = 1.0f e float vertical = 0.0f. Emita no Console: 'Movimento: (1, 0)'.",
            reqs: ["float horizontal", "float vertical", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure horizontal e vertical e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float horizontal = 1.0f;\n        float vertical = 0.0f;\n        Debug.Log("Movimento: (" + horizontal + ", " + vertical + ")");\n    }\n}`,
            exp: "Movimento: (1, 0)", descTest: "Eixo 2D composto"
        },
        {
            title: "Ação de Interação com Objeto", diff: "medium",
            desc: "Declare a string botaoInteragir = 'E' e a distância float dist = 1.5f. Se dist <= 2.0f, emita 'Pressione [' + botaoInteragir + '] para Interagir'.",
            reqs: ["botaoInteragir", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide a distancia e emita o prompt\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string botaoInteragir = "E";\n        float dist = 1.5f;\n        if (dist <= 2.0f)\n        {\n            Debug.Log("Pressione [" + botaoInteragir + "] para Interagir");\n        }\n    }\n}`,
            exp: "Pressione [E] para Interagir", descTest: "Prompt de interação"
        },
        {
            title: "Habilitação de Mapa de Ações", diff: "medium",
            desc: "Simule a ativação do Action Map 'Gameplay': declare string mapaAtivo = 'Gameplay';. Emita no Console: 'Mapa Ativado: Gameplay'.",
            reqs: ["string mapaAtivo", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Ative o mapa e emita no Console\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string mapaAtivo = "Gameplay";\n        Debug.Log("Mapa Ativado: " + mapaAtivo);\n    }\n}`,
            exp: "Mapa Ativado: Gameplay", descTest: "Ativação de ActionMap"
        },
        {
            title: "Troca Dinâmica para Mapa UI", diff: "medium",
            desc: "Quando o jogo é pausado, o mapa muda para UI: declare bool pausado = true. Se pausado, defina mapa = 'UI' e emita 'Contexto Atual: UI'.",
            reqs: ["bool pausado", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Troque o contexto para UI se pausado\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool pausado = true;\n        if (pausado)\n        {\n            string mapa = "UI";\n            Debug.Log("Contexto Atual: " + mapa);\n        }\n    }\n}`,
            exp: "Contexto Atual: UI", descTest: "Alternância de contexto de input"
        }
    ];

    return acts;
}

module.exports = { buildPart2 };
