/**
 * ACTS PART 5: Chapters 29 to 37
 * 29: Object Pooling
 * 30: ScriptableObjects
 * 31: Save/Load com PlayerPrefs
 * 32: Save/Load com JSON
 * 33: Coroutines e IEnumerator
 * 34: Delegates e Events
 * 35: Interfaces
 * 36: Tratamento de Exceções (try/catch)
 * 37: Otimização
 */

function buildPart5() {
    const acts = {};

    // 29: Object Pooling
    acts[29] = [
        {
            title: "Fila de Pooling com Queue", diff: "easy",
            desc: "Crie uma fila Queue<string> pool = new Queue<string>();. Adicione 'Projetil_1' usando .Enqueue('Projetil_1') e emita 'Pool Criado com: ' + pool.Count + ' item'.",
            reqs: ["Queue<string> pool", ".Enqueue(", "pool.Count"],
            starter: `using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie o pool com Queue e enfileire um item\n    }\n}`,
            sol: `using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue("Projetil_1");\n        Debug.Log("Pool Criado com: " + pool.Count + " item");\n    }\n}`,
            exp: "Pool Criado com: 1 item", descTest: "Fila de pool"
        },
        {
            title: "Resgate de Instância (Dequeue)", diff: "easy",
            desc: "Adicione 'Projetil_A' e 'Projetil_B' na fila. Resgate o primeiro elemento com pool.Dequeue() e emita 'Item Reutilizado: ' + item.",
            reqs: ["Queue<string> pool", ".Dequeue()", "Debug.Log"],
            starter: `using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Enfileire 2 itens e desinfileire 1\n    }\n}`,
            sol: `using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Queue<string> pool = new Queue<string>();\n        pool.Enqueue("Projetil_A");\n        pool.Enqueue("Projetil_B");\n        string item = pool.Dequeue();\n        Debug.Log("Item Reutilizado: " + item);\n    }\n}`,
            exp: "Item Reutilizado: Projetil_A", descTest: "Dequeue do pool"
        },
        {
            title: "Reutilização Sem Garbage Collection", diff: "medium",
            desc: "Declare int objetosInstanciados = 10; e int gcAllocBytes = 0;. Emita no Console: 'Alocacao de GC Evitada: 0 bytes'.",
            reqs: ["gcAllocBytes", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare gcAllocBytes e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int gcAllocBytes = 0;\n        Debug.Log("Alocacao de GC Evitada: " + gcAllocBytes + " bytes");\n    }\n}`,
            exp: "Alocacao de GC Evitada: 0 bytes", descTest: "Otimização de GC"
        },
        {
            title: "Devolução de Objeto ao Pool (Desativação)", diff: "medium",
            desc: "Declare bool estaAtivo = false;. Emita no Console: 'Objeto Devolvido ao Pool (Ativo: False)'.",
            reqs: ["bool estaAtivo", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure estaAtivo e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaAtivo = false;\n        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + estaAtivo + ")");\n    }\n}`,
            exp: "Objeto Devolvido ao Pool (Ativo: False)", descTest: "Desativação ao devolver ao pool"
        },
        {
            title: "Capacidade Máxima do Pool", diff: "medium",
            desc: "Declare int capacidadeMaxima = 50;. Emita no Console: 'Capacidade do Pool: 50 unidades'.",
            reqs: ["int capacidadeMaxima", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare capacidadeMaxima e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int capacidadeMaxima = 50;\n        Debug.Log("Capacidade do Pool: " + capacidadeMaxima + " unidades");\n    }\n}`,
            exp: "Capacidade do Pool: 50 unidades", descTest: "Teto do pool"
        }
    ];

    // 30: ScriptableObjects
    acts[30] = [
        {
            title: "Leitura de Atributos do ScriptableObject", diff: "easy",
            desc: "Simule a leitura de um arquivo de configuração: declare string nomePoder = 'Meteoro'; int custoMana = 40;. Emita: 'Habilidade: Meteoro | Custo: 40 Mana'.",
            reqs: ["nomePoder", "custoMana", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare os dados e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string nomePoder = "Meteoro";\n        int custoMana = 40;\n        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");\n    }\n}`,
            exp: "Habilidade: Meteoro | Custo: 40 Mana", descTest: "Dados de ScriptableObject"
        },
        {
            title: "Ficha de Dados de Inimigo Modular", diff: "easy",
            desc: "Declare string tipoMonstro = 'Golem'; int hpBase = 500;. Emita no Console: 'Monstro: Golem | HP: 500'.",
            reqs: ["tipoMonstro", "hpBase", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os atributos e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoMonstro = "Golem";\n        int hpBase = 500;\n        Debug.Log("Monstro: " + tipoMonstro + " | HP: " + hpBase);\n    }\n}`,
            exp: "Monstro: Golem | HP: 500", descTest: "Ficha de inimigo"
        },
        {
            title: "Compartilhamento de Dados Entre Instâncias", diff: "medium",
            desc: "Simule duas instâncias lendo o mesmo danoBase = 25: calcule danoDuplo = danoBase * 2 e emita 'Dano Compartilhado: ' + danoDuplo.",
            reqs: ["danoBase", "danoDuplo", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o dano compartilhado\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 25;\n        int danoDuplo = danoBase * 2;\n        Debug.Log("Dano Compartilhado: " + danoDuplo);\n    }\n}`,
            exp: "Dano Compartilhado: 50", descTest: "Dados compartilhados"
        },
        {
            title: "Menu de Criação de Asset ([CreateAssetMenu])", diff: "medium",
            desc: "Declare string caminhoMenu = 'Assets/Create/Cartas/Item';. Emita no Console: 'Menu Ativo: ' + caminhoMenu.",
            reqs: ["string caminhoMenu", "caminhoMenu", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare caminhoMenu e emita o caminho do CreateAssetMenu\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string caminhoMenu = "Assets/Create/Cartas/Item";\n        Debug.Log("Menu Ativo: " + caminhoMenu);\n    }\n}`,
            exp: "Menu Ativo: Assets/Create/Cartas/Item", descTest: "CreateAssetMenu"
        },
        {
            title: "Economia Modular de Custo de Habilidade", diff: "medium",
            desc: "Declare int manaDisponivel = 80; int custo = 30;. Subtraia o custo e emita 'Mana Restante: ' + (manaDisponivel - custo).",
            reqs: ["manaDisponivel", "custo", "-", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Desconte a mana consumida\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int manaDisponivel = 80;\n        int custo = 30;\n        int restante = manaDisponivel - custo;\n        Debug.Log("Mana Restante: " + restante);\n    }\n}`,
            exp: "Mana Restante: 50", descTest: "Consumo de recurso modular"
        }
    ];

    // 31: Save e Load com PlayerPrefs
    acts[31] = [
        {
            title: "Salvando Pontuação com SetInt", diff: "easy",
            desc: "Armazene a pontuação chamando PlayerPrefs.SetInt('HighScore', 2500);. Em seguida, leia com PlayerPrefs.GetInt('HighScore', 0); e exiba 'HighScore Salvo: ' + score.",
            reqs: ["PlayerPrefs.SetInt", "PlayerPrefs.GetInt", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Salve e recupere HighScore\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerPrefs.SetInt("HighScore", 2500);\n        int score = PlayerPrefs.GetInt("HighScore", 0);\n        Debug.Log("HighScore Salvo: " + score);\n    }\n}`,
            exp: "HighScore Salvo: 2500", descTest: "PlayerPrefs SetInt/GetInt"
        },
        {
            title: "Persistência de Volume Flutuante (SetFloat)", diff: "easy",
            desc: "Salve o volume usando PlayerPrefs.SetFloat('MasterVolume', 0.8f);. Recupere com GetFloat e exiba 'Volume: ' + vol.",
            reqs: ["PlayerPrefs.SetFloat", "PlayerPrefs.GetFloat", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Salve e recupere o volume\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerPrefs.SetFloat("MasterVolume", 0.8f);\n        float vol = PlayerPrefs.GetFloat("MasterVolume", 1.0f);\n        Debug.Log("Volume: " + vol);\n    }\n}`,
            exp: "Volume: 0.8", descTest: "PlayerPrefs SetFloat"
        },
        {
            title: "Persistência do Nome do Jogador (SetString)", diff: "medium",
            desc: "Salve o nome com PlayerPrefs.SetString('NomePlayer', 'Arkan');. Recupere e emita 'Heroi Registrado: ' + nome.",
            reqs: ["PlayerPrefs.SetString", "PlayerPrefs.GetString", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Salve e recupere o nome\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerPrefs.SetString("NomePlayer", "Arkan");\n        string nome = PlayerPrefs.GetString("NomePlayer", "Anonimo");\n        Debug.Log("Heroi Registrado: " + nome);\n    }\n}`,
            exp: "Heroi Registrado: Arkan", descTest: "PlayerPrefs SetString"
        },
        {
            title: "Verificação de Chave Existente (HasKey)", diff: "medium",
            desc: "Verifique se a chave de tutorial existe: bool existe = PlayerPrefs.HasKey('TutorialVisto');. Se falso, emita 'Iniciar Tutorial'.",
            reqs: ["PlayerPrefs.HasKey", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque com HasKey\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool existe = PlayerPrefs.HasKey("TutorialVisto");\n        if (!existe)\n        {\n            Debug.Log("Iniciar Tutorial");\n        }\n    }\n}`,
            exp: "Iniciar Tutorial", descTest: "PlayerPrefs HasKey"
        },
        {
            title: "Gravação Forçada no Disco (Save)", diff: "medium",
            desc: "Após configurar dados, chame PlayerPrefs.Save(); e emita 'Dados Gravados com Sucesso'.",
            reqs: ["PlayerPrefs.Save()", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Execute PlayerPrefs.Save()\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        PlayerPrefs.Save();\n        Debug.Log("Dados Gravados com Sucesso");\n    }\n}`,
            exp: "Dados Gravados com Sucesso", descTest: "PlayerPrefs Save"
        }
    ];

    // 32: Save e Load com JSON
    acts[32] = [
        {
            title: "Serialização de Objeto para JSON", diff: "easy",
            desc: "Simule a serialização de dados de save: declare string json = '{\"fase\":3,\"moedas\":150}';. Emita no Console: 'JSON: ' + json.",
            reqs: ["json", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure a string json e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string json = "{\\"fase\\":3,\\"moedas\\":150}";\n        Debug.Log("JSON: " + json);\n    }\n}`,
            exp: "JSON: {\"fase\":3,\"moedas\":150}", descTest: "String JSON"
        },
        {
            title: "Uso do JsonUtility.ToJson", diff: "easy",
            desc: "Simule a conversão de um vetor em JSON: chame JsonUtility.ToJson(Vector3.one). Emita no Console: 'Serializado com JsonUtility'.",
            reqs: ["JsonUtility.ToJson", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Use JsonUtility.ToJson\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string txt = JsonUtility.ToJson(Vector3.one);\n        Debug.Log("Serializado com JsonUtility");\n    }\n}`,
            exp: "Serializado com JsonUtility", descTest: "JsonUtility ToJson"
        },
        {
            title: "Desserialização e Resgate de Valores", diff: "medium",
            desc: "Simule a extração de dados desserializados: declare int faseCarregada = 5; int vidaCarregada = 100;. Emita 'Save Carregado: Fase 5 (Vida: 100)'.",
            reqs: ["faseCarregada", "vidaCarregada", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os dados carregados e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int faseCarregada = 5;\n        int vidaCarregada = 100;\n        Debug.Log("Save Carregado: Fase " + faseCarregada + " (Vida: " + vidaCarregada + ")");\n    }\n}`,
            exp: "Save Carregado: Fase 5 (Vida: 100)", descTest: "Desserialização de save"
        },
        {
            title: "Anotação [System.Serializable]", diff: "medium",
            desc: "Declare string statusSerial = 'Estrutura Marcada como Serializavel';. Emita no Console o valor de statusSerial.",
            reqs: ["string statusSerial", "statusSerial", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusSerial e emita o status de serializacao\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusSerial = "Estrutura Marcada como Serializavel";\n        Debug.Log(statusSerial);\n    }\n}`,
            exp: "Estrutura Marcada como Serializavel", descTest: "System.Serializable"
        },
        {
            title: "Integridade de Arquivo de Save", diff: "medium",
            desc: "Declare bool saveValido = true;. Se for verdadeiro, emita 'Arquivo de Save Valido e Carregado'.",
            reqs: ["bool saveValido", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide o save e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool saveValido = true;\n        if (saveValido)\n        {\n            Debug.Log("Arquivo de Save Valido e Carregado");\n        }\n    }\n}`,
            exp: "Arquivo de Save Valido e Carregado", descTest: "Integridade do save"
        }
    ];

    // 33: Coroutines e IEnumerator
    acts[33] = [
        {
            title: "Execução Temporal com Delay", diff: "easy",
            desc: "Declare string p1 = 'Passo 1: Iniciado'; e string p2 = 'Passo 2: Concluido';. Emita ambas em linhas separadas no Console.",
            reqs: ["string p1", "string p2", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare p1 e p2 e emita os dois passos da corotina\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string p1 = "Passo 1: Iniciado";\n        string p2 = "Passo 2: Concluido";\n        Debug.Log(p1);\n        Debug.Log(p2);\n    }\n}`,
            exp: "Passo 1: Iniciado\nPasso 2: Concluido", descTest: "Sequência temporal"
        },
        {
            title: "Tempo de Espera (WaitForSeconds)", diff: "easy",
            desc: "Declare float tempoEspera = 1.5f;. Emita no Console: 'Aguardando: 1.5 segundos'.",
            reqs: ["float tempoEspera", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoEspera e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoEspera = 1.5f;\n        Debug.Log("Aguardando: " + tempoEspera + " segundos");\n    }\n}`,
            exp: "Aguardando: 1.5 segundos", descTest: "WaitForSeconds delay"
        },
        {
            title: "Contagem Regressiva de Corotina", diff: "medium",
            desc: "Use um for de 3 até 1 simulando um timer assíncrono: imprima 'Timer: ' + i e ao final 'Lancamento!'.",
            reqs: ["for", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Faca a contagem regressiva e o lancamento\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 3; i >= 1; i--)\n        {\n            Debug.Log("Timer: " + i);\n        }\n        Debug.Log("Lancamento!");\n    }\n}`,
            exp: "Timer: 3\nTimer: 2\nTimer: 1\nLancamento!", descTest: "Contagem regressiva de corotina"
        },
        {
            title: "Disparo com StartCoroutine", diff: "medium",
            desc: "Declare string statusCoro = 'StartCoroutine: Rotina Disparada';. Emita no Console o valor de statusCoro.",
            reqs: ["string statusCoro", "statusCoro", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusCoro e emita a inicializacao da corotina\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusCoro = "StartCoroutine: Rotina Disparada";\n        Debug.Log(statusCoro);\n    }\n}`,
            exp: "StartCoroutine: Rotina Disparada", descTest: "StartCoroutine"
        },
        {
            title: "Interrupção com StopCoroutine", diff: "medium",
            desc: "Declare bool jogadorCancelou = true;. Se for verdadeiro, emita 'StopCoroutine: Execucao Interrompida'.",
            reqs: ["bool jogadorCancelou", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o jogador cancelou a acao\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool jogadorCancelou = true;\n        if (jogadorCancelou)\n        {\n            Debug.Log("StopCoroutine: Execucao Interrompida");\n        }\n    }\n}`,
            exp: "StopCoroutine: Execucao Interrompida", descTest: "Interrupção de corotina"
        }
    ];

    // 34: Delegates e Events
    acts[34] = [
        {
            title: "Declaração e Disparo de Action", diff: "easy",
            desc: "Declare string status = 'Jogador Derrotado'; e Action onPlayerDied = () => Debug.Log('Evento: ' + status);. Invoque onPlayerDied();.",
            reqs: ["string status", "Action onPlayerDied", "onPlayerDied()"],
            starter: `using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare status, Action e execute-a\n    }\n}`,
            sol: `using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string status = "Jogador Derrotado";\n        Action onPlayerDied = () => Debug.Log("Evento: " + status);\n        onPlayerDied();\n    }\n}`,
            exp: "Evento: Jogador Derrotado", descTest: "Action delegate simples"
        },
        {
            title: "Delegate com Parâmetro de Dano", diff: "easy",
            desc: "Declare int danoRecebido = 45; e Action onTakeDamage = () => Debug.Log('Dano Sofrido: ' + danoRecebido);. Invoque onTakeDamage();.",
            reqs: ["int danoRecebido", "onTakeDamage", "onTakeDamage()"],
            starter: `using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare danoRecebido e execute a Action\n    }\n}`,
            sol: `using UnityEngine;\nusing System;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoRecebido = 45;\n        Action onTakeDamage = () => Debug.Log("Dano Sofrido: " + danoRecebido);\n        onTakeDamage();\n    }\n}`,
            exp: "Dano Sofrido: 45", descTest: "Delegate com parâmetro"
        },
        {
            title: "Desacoplamento de UI e Lógica", diff: "medium",
            desc: "Declare string eventoUi = 'HUD Notificado: Barra Atualizada';. Emita no Console o valor de eventoUi.",
            reqs: ["string eventoUi", "eventoUi", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare eventoUi e emita a notificacao do evento\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string eventoUi = "HUD Notificado: Barra Atualizada";\n        Debug.Log(eventoUi);\n    }\n}`,
            exp: "HUD Notificado: Barra Atualizada", descTest: "Evento desacoplado"
        },
        {
            title: "Múltiplos Ouvintes de Evento (Multicast)", diff: "medium",
            desc: "Declare string o1 = 'Ouvinte 1: Som Tocado'; e string o2 = 'Ouvinte 2: Particula Ativada';. Emita ambas em linhas separadas.",
            reqs: ["string o1", "string o2", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o1 e o2 e emita as acoes dos dois ouvintes\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string o1 = "Ouvinte 1: Som Tocado";\n        string o2 = "Ouvinte 2: Particula Ativada";\n        Debug.Log(o1);\n        Debug.Log(o2);\n    }\n}`,
            exp: "Ouvinte 1: Som Tocado\nOuvinte 2: Particula Ativada", descTest: "Multicast event"
        },
        {
            title: "Cancelamento de Inscrição (-=)", diff: "medium",
            desc: "Declare string statusUnsub = 'Inscricao Removida com -= no OnDisable';. Emita no Console com Debug.Log.",
            reqs: ["string statusUnsub", "statusUnsub", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusUnsub e emita a remocao de inscricao\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusUnsub = "Inscricao Removida com -= no OnDisable";\n        Debug.Log(statusUnsub);\n    }\n}`,
            exp: "Inscricao Removida com -= no OnDisable", descTest: "Unsubscribe de evento"
        }
    ];

    // 35: Interfaces
    acts[35] = [
        {
            title: "Contrato de Dano (IDamageable)", diff: "easy",
            desc: "Simule uma entidade implementando IDamageable: declare int dano = 30;. Emita no Console: 'IDamageable: Tomou 30 de dano'.",
            reqs: ["dano", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o dano e emita\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int dano = 30;\n        Debug.Log("IDamageable: Tomou " + dano + " de dano");\n    }\n}`,
            exp: "IDamageable: Tomou 30 de dano", descTest: "Interface IDamageable"
        },
        {
            title: "Contrato de Interação (IInteractable)", diff: "easy",
            desc: "Simule a interação com um baú: declare string objeto = 'Bau';. Emita no Console: 'IInteractable: Interagiu com Bau'.",
            reqs: ["objeto", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare objeto e emita a interacao\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string objeto = "Bau";\n        Debug.Log("IInteractable: Interagiu com " + objeto);\n    }\n}`,
            exp: "IInteractable: Interagiu com Bau", descTest: "Interface IInteractable"
        },
        {
            title: "Polimorfismo Baseado em Interfaces", diff: "medium",
            desc: "Declare um array com 2 tipos que implementam IDamageable: 'Inimigo' e 'Barril'. Itere e emita para cada um: 'Entidade Danificavel: ' + nome.",
            reqs: ["string[] alvos", "for", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Itere pelos alvos danificaveis\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] alvos = new string[] { "Inimigo", "Barril" };\n        for (int i = 0; i < alvos.Length; i++)\n        {\n            Debug.Log("Entidade Danificavel: " + alvos[i]);\n        }\n    }\n}`,
            exp: "Entidade Danificavel: Inimigo\nEntidade Danificavel: Barril", descTest: "Coleção de interfaces"
        },
        {
            title: "Checagem Segura com Operador 'is'", diff: "medium",
            desc: "Declare bool eDanificavel = true;. Se for verdadeiro, emita 'Alvo Implementa IDamageable'.",
            reqs: ["bool eDanificavel", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se implementa a interface\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool eDanificavel = true;\n        if (eDanificavel)\n        {\n            Debug.Log("Alvo Implementa IDamageable");\n        }\n    }\n}`,
            exp: "Alvo Implementa IDamageable", descTest: "Checagem de interface"
        },
        {
            title: "Múltiplas Interfaces em uma Classe", diff: "medium",
            desc: "Uma porta pode ser Danificável e Interagível: declare bool podeInteragir = true; bool podeDestruir = true;. Emita 'Porta: Interagivel e Destrutivel'.",
            reqs: ["bool podeInteragir", "bool podeDestruir", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os estados e emita\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool podeInteragir = true;\n        bool podeDestruir = true;\n        Debug.Log("Porta: Interagivel e Destrutivel");\n    }\n}`,
            exp: "Porta: Interagivel e Destrutivel", descTest: "Múltiplas interfaces"
        }
    ];

    // 36: Tratamento de Exceções (try/catch)
    acts[36] = [
        {
            title: "Tratamento de Exceção Simples com Try/Catch", diff: "easy",
            desc: "Utilize uma estrutura try/catch: no bloco try, execute int valor = 100; e emita 'Processamento Seguro: ' + valor.",
            reqs: ["try", "catch", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Use try/catch e emita o valor processado\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        try\n        {\n            int valor = 100;\n            Debug.Log("Processamento Seguro: " + valor);\n        }\n        catch\n        {\n            Debug.Log("Erro capturado");\n        }\n    }\n}`,
            exp: "Processamento Seguro: 100", descTest: "Try/catch básico"
        },
        {
            title: "Prevenção de Divisão por Zero", diff: "easy",
            desc: "Declare int divisor = 0;. Se divisor == 0, emita 'Aviso: Divisao por Zero Evitada!', senão divida.",
            reqs: ["int divisor", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide divisor antes de calcular\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int divisor = 0;\n        if (divisor == 0)\n        {\n            Debug.Log("Aviso: Divisao por Zero Evitada!");\n        }\n    }\n}`,
            exp: "Aviso: Divisao por Zero Evitada!", descTest: "Prevenção de divisão por zero"
        },
        {
            title: "Tratamento de NullReferenceException", diff: "medium",
            desc: "Simule a checagem defensiva de componente nulo: declare bool componenteExiste = false;. Se não existir, emita 'Erro Evitado: Componente Nulo'.",
            reqs: ["bool componenteExiste", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o componente e nulo\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool componenteExiste = false;\n        if (!componenteExiste)\n        {\n            Debug.Log("Erro Evitado: Componente Nulo");\n        }\n    }\n}`,
            exp: "Erro Evitado: Componente Nulo", descTest: "Defensive null check"
        },
        {
            title: "Bloco Finally de Limpeza", diff: "medium",
            desc: "Declare string statusLimpeza = 'Bloco Finally: Arquivo Fechado';. Emita a mensagem com Debug.Log.",
            reqs: ["string statusLimpeza", "statusLimpeza", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusLimpeza e emita a finalizacao do bloco\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusLimpeza = "Bloco Finally: Arquivo Fechado";\n        Debug.Log(statusLimpeza);\n    }\n}`,
            exp: "Bloco Finally: Arquivo Fechado", descTest: "Bloco finally"
        },
        {
            title: "Lançamento de Erro Personalizado (Throw)", diff: "medium",
            desc: "Declare int nivelRequerido = 50; int nivelPlayer = 20;. Se nivelPlayer < nivelRequerido, emita 'Excecao: Nivel Insuficiente para Entrar'.",
            reqs: ["nivelRequerido", "nivelPlayer", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide o nivel e lance a mensagem\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivelRequerido = 50;\n        int nivelPlayer = 20;\n        if (nivelPlayer < nivelRequerido)\n        {\n            Debug.Log("Excecao: Nivel Insuficiente para Entrar");\n        }\n    }\n}`,
            exp: "Excecao: Nivel Insuficiente para Entrar", descTest: "Validação de exceção de regra de negócio"
        }
    ];

    // 37: Otimização
    acts[37] = [
        {
            title: "Otimização de Draw Calls com Batching", diff: "easy",
            desc: "Declare int drawCallsAntes = 120; int drawCallsDepois = 25;. Emita: 'Draw Calls Reduzidos de 120 para 25'.",
            reqs: ["drawCallsAntes", "drawCallsDepois", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare os valores e emita a reducao\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int drawCallsAntes = 120;\n        int drawCallsDepois = 25;\n        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);\n    }\n}`,
            exp: "Draw Calls Reduzidos de 120 para 25", descTest: "Redução de draw calls"
        },
        {
            title: "Ocultamento por Oclusão (Occlusion Culling)", diff: "easy",
            desc: "Declare int objetosNaCena = 1000; int objetosRenderizados = 150;. Emita no Console: 'Renderizados com Oclusao: 150/1000'.",
            reqs: ["objetosNaCena", "objetosRenderizados", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure os objetos e emita\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int objetosNaCena = 1000;\n        int objetosRenderizados = 150;\n        Debug.Log("Renderizados com Oclusao: " + objetosRenderizados + "/" + objetosNaCena);\n    }\n}`,
            exp: "Renderizados com Oclusao: 150/1000", descTest: "Occlusion Culling"
        },
        {
            title: "Níveis de Detalhe (LOD Group)", diff: "medium",
            desc: "Declare float distanciaCamera = 60.0f;. Se distanciaCamera >= 50.0f, defina lod = 'LOD2 (Baixo)' e emita 'Malha Ativa: ' + lod.",
            reqs: ["distanciaCamera", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a distancia e selecione o LOD\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distanciaCamera = 60.0f;\n        if (distanciaCamera >= 50.0f)\n        {\n            string lod = "LOD2 (Baixo)";\n            Debug.Log("Malha Ativa: " + lod);\n        }\n    }\n}`,
            exp: "Malha Ativa: LOD2 (Baixo)", descTest: "LOD Group"
        },
        {
            title: "Estabilidade de Taxa de Quadros (TargetFrameRate)", diff: "medium",
            desc: "Declare int targetFps = 60;. Emita no Console: 'Trava de FPS: 60 FPS'.",
            reqs: ["int targetFps", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare targetFps e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int targetFps = 60;\n        Debug.Log("Trava de FPS: " + targetFps + " FPS");\n    }\n}`,
            exp: "Trava de FPS: 60 FPS", descTest: "TargetFrameRate"
        },
        {
            title: "Monitoramento de Memória no Profiler", diff: "medium",
            desc: "Declare float memoriaUsadaMB = 450.5f;. Emita no Console: 'Memoria Alocada: 450.5 MB'.",
            reqs: ["float memoriaUsadaMB", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare memoriaUsadaMB e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float memoriaUsadaMB = 450.5f;\n        Debug.Log("Memoria Alocada: " + memoriaUsadaMB + " MB");\n    }\n}`,
            exp: "Memoria Alocada: 450.5 MB", descTest: "Profiler de memória"
        }
    ];

    return acts;
}

module.exports = { buildPart5 };
