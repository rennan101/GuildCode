/**
 * ACTS PART 4: Chapters 21 to 28
 * 21: Terreno e Vegetação
 * 22: Iluminação, APV e Post-Processing
 * 23: Interface Gráfica (HUD e UI)
 * 24: Sistemas de Partículas (VFX)
 * 25: Efeitos Sonoros 3D e Áudio
 * 26: NavMesh e IA de Patrulha NPC
 * 27: Shaders Básicos e Materiais PBR
 * 28: Instantiate e Destroy Dinâmicos
 */

function buildPart4() {
    const acts = {};

    // 21: Terreno e Vegetação
    acts[21] = [
        {
            title: "Dimensões do Terreno", diff: "easy",
            desc: "Declare int tamanhoTerreno = 500;. Emita no Console: 'Area do Terreno: 500x500m'.",
            reqs: ["int tamanhoTerreno", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tamanhoTerreno e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int tamanhoTerreno = 500;\n        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");\n    }\n}`,
            exp: "Area do Terreno: 500x500m", descTest: "Dimensões do terreno"
        },
        {
            title: "Leitura de Altura do Mapa (Heightmap)", diff: "easy",
            desc: "Declare float alturaY = 24.5f;. Emita no Console: 'Elevacao no Ponto: 24.5m'.",
            reqs: ["float alturaY", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare alturaY e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float alturaY = 24.5f;\n        Debug.Log("Elevacao no Ponto: " + alturaY + "m");\n    }\n}`,
            exp: "Elevacao no Ponto: 24.5m", descTest: "Elevação de terreno"
        },
        {
            title: "Densidade de Vegetação e Árvores", diff: "medium",
            desc: "Declare int totalArvores = 1200;. Emita no Console: 'Instancias de Arvores: 1200'.",
            reqs: ["int totalArvores", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare totalArvores e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalArvores = 1200;\n        Debug.Log("Instancias de Arvores: " + totalArvores);\n    }\n}`,
            exp: "Instancias de Arvores: 1200", descTest: "Densidade vegetal"
        },
        {
            title: "Distância de Desenho de Grama", diff: "medium",
            desc: "Declare int distanciaDetalhes = 80;. Emita no Console: 'Distancia de Detalhes: 80m'.",
            reqs: ["int distanciaDetalhes", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare distanciaDetalhes e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int distanciaDetalhes = 80;\n        Debug.Log("Distancia de Detalhes: " + distanciaDetalhes + "m");\n    }\n}`,
            exp: "Distancia de Detalhes: 80m", descTest: "Detail distance"
        },
        {
            title: "Pintura de Camada de Textura (Splatmap)", diff: "medium",
            desc: "Declare string camadaAtiva = 'Grama_Rochosa';. Emita no Console: 'Camada de Textura: Grama_Rochosa'.",
            reqs: ["camadaAtiva", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare camadaAtiva e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string camadaAtiva = "Grama_Rochosa";\n        Debug.Log("Camada de Textura: " + camadaAtiva);\n    }\n}`,
            exp: "Camada de Textura: Grama_Rochosa", descTest: "Textura do terreno"
        }
    ];

    // 22: Iluminação, APV e Post-Processing
    acts[22] = [
        {
            title: "Intensidade da Luz Direcional (Sol)", diff: "easy",
            desc: "Declare float intensidadeLuz = 1.2f;. Emita no Console: 'Intensidade Solar: 1.2 Lux'.",
            reqs: ["float intensidadeLuz", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare intensidadeLuz e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float intensidadeLuz = 1.2f;\n        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");\n    }\n}`,
            exp: "Intensidade Solar: 1.2 Lux", descTest: "Intensidade de luz"
        },
        {
            title: "Sombras em Tempo Real (Shadows)", diff: "easy",
            desc: "Declare string tipoSombra = 'SoftShadows';. Emita no Console: 'Tipo de Sombra: SoftShadows'.",
            reqs: ["tipoSombra", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tipoSombra e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tipoSombra = "SoftShadows";\n        Debug.Log("Tipo de Sombra: " + tipoSombra);\n    }\n}`,
            exp: "Tipo de Sombra: SoftShadows", descTest: "Modo de sombras"
        },
        {
            title: "Sondas de Luz Adaptativas (APV)", diff: "medium",
            desc: "Declare int totalProbes = 250;. Emita no Console: 'Adaptive Probe Volumes: 250 probes'.",
            reqs: ["int totalProbes", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare totalProbes e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalProbes = 250;\n        Debug.Log("Adaptive Probe Volumes: " + totalProbes + " probes");\n    }\n}`,
            exp: "Adaptive Probe Volumes: 250 probes", descTest: "APV probes"
        },
        {
            title: "Efeito Bloom de Pós-Processamento", diff: "medium",
            desc: "Declare bool bloomAtivo = true; e float intensidadeBloom = 0.8f;. Se bloomAtivo, emita 'Bloom Ativo com Intensidade: 0.8'.",
            reqs: ["bool bloomAtivo", "float intensidadeBloom", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide e emita o Bloom\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool bloomAtivo = true;\n        float intensidadeBloom = 0.8f;\n        if (bloomAtivo)\n        {\n            Debug.Log("Bloom Ativo com Intensidade: " + intensidadeBloom);\n        }\n    }\n}`,
            exp: "Bloom Ativo com Intensidade: 0.8", descTest: "Post-Processing Bloom"
        },
        {
            title: "Color Grading e Vinheta", diff: "medium",
            desc: "Declare float vinhetaIntensidade = 0.35f;. Emita no Console: 'Vinheta Cinematica: 0.35'.",
            reqs: ["float vinhetaIntensidade", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare vinhetaIntensidade e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float vinhetaIntensidade = 0.35f;\n        Debug.Log("Vinheta Cinematica: " + vinhetaIntensidade);\n    }\n}`,
            exp: "Vinheta Cinematica: 0.35", descTest: "Vignette effect"
        }
    ];

    // 23: Interface Gráfica (HUD e UI)
    acts[23] = [
        {
            title: "Atualização de Texto TextMeshPro", diff: "easy",
            desc: "Simule a atualização de um label de vida: declare string texto = 'HP: 100/100';. Emita no Console: 'HUD Texto: HP: 100/100'.",
            reqs: ["texto", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure o texto do HUD e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string texto = "HP: 100/100";\n        Debug.Log("HUD Texto: " + texto);\n    }\n}`,
            exp: "HUD Texto: HP: 100/100", descTest: "Atualização de texto HUD"
        },
        {
            title: "Preenchimento de Barra de Mana (FillAmount)", diff: "easy",
            desc: "Declare float manaAtual = 75.0f; e float manaMax = 100.0f;. Calcule float fill = manaAtual / 100.0f; e emita 'Barra Fill: ' + fill.",
            reqs: ["manaAtual", "manaMax", "fill", "/"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o preenchimento da barra e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float manaAtual = 75.0f;\n        float manaMax = 100.0f;\n        float fill = manaAtual / 100.0f;\n        Debug.Log("Barra Fill: " + fill);\n    }\n}`,
            exp: "Barra Fill: 0.75", descTest: "Cálculo de FillAmount"
        },
        {
            title: "Visibilidade do Menu de Pause", diff: "medium",
            desc: "Declare bool menuPausaAtivo = true;. Se for verdadeiro, emita 'Painel de Pausa Visivel'.",
            reqs: ["bool menuPausaAtivo", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque menuPausaAtivo e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool menuPausaAtivo = true;\n        if (menuPausaAtivo)\n        {\n            Debug.Log("Painel de Pausa Visivel");\n        }\n    }\n}`,
            exp: "Painel de Pausa Visivel", descTest: "Painel de menu"
        },
        {
            title: "Notificação Flutuante no HUD", diff: "medium",
            desc: "Declare string notificacao = '+100 XP';. Emita no Console: 'Toast Notificacao: +100 XP'.",
            reqs: ["notificacao", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare notificacao e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string notificacao = "+100 XP";\n        Debug.Log("Toast Notificacao: " + notificacao);\n    }\n}`,
            exp: "Toast Notificacao: +100 XP", descTest: "Notificação HUD"
        },
        {
            title: "Contador de Moedas na Tela", diff: "medium",
            desc: "Declare int moedas = 42;. Emita no Console formatado: 'Moedas Coletadas: 0042' usando moedas.ToString().",
            reqs: ["int moedas", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure moedas e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 42;\n        Debug.Log("Moedas Coletadas: 00" + moedas);\n    }\n}`,
            exp: "Moedas Coletadas: 0042", descTest: "Contador HUD com zeros à esquerda"
        }
    ];

    // 24: Sistemas de Partículas (VFX)
    acts[24] = [
        {
            title: "Emissão de Efeito de Impacto", diff: "easy",
            desc: "Declare string efeito = 'Faíscas de Impacto';. Simule a emissão emitindo no Console: 'VFX Play: ' + efeito.",
            reqs: ["string efeito", "efeito", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare efeito e emita a reproducao do VFX\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string efeito = "Faíscas de Impacto";\n        Debug.Log("VFX Play: " + efeito);\n    }\n}`,
            exp: "VFX Play: Faíscas de Impacto", descTest: "Disparo de VFX"
        },
        {
            title: "Taxa de Emissão de Partículas", diff: "easy",
            desc: "Declare int taxaEmissao = 50;. Emita no Console: 'Taxa de Emissao: 50 particulas/s'.",
            reqs: ["int taxaEmissao", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare taxaEmissao e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int taxaEmissao = 50;\n        Debug.Log("Taxa de Emissao: " + taxaEmissao + " particulas/s");\n    }\n}`,
            exp: "Taxa de Emissao: 50 particulas/s", descTest: "Taxa de emissão"
        },
        {
            title: "Tempo de Vida das Partículas (Lifetime)", diff: "medium",
            desc: "Declare float duracao = 2.5f;. Emita no Console: 'Tempo de Vida: 2.5s'.",
            reqs: ["float duracao", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare duracao e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float duracao = 2.5f;\n        Debug.Log("Tempo de Vida: " + duracao + "s");\n    }\n}`,
            exp: "Tempo de Vida: 2.5s", descTest: "Particle Lifetime"
        },
        {
            title: "Efeito em Loop Contínuo", diff: "medium",
            desc: "Declare bool estaEmLoop = true;. Se for verdadeiro, emita 'VFX em Execucao Continua'.",
            reqs: ["bool estaEmLoop", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se o efeito esta em loop\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaEmLoop = true;\n        if (estaEmLoop)\n        {\n            Debug.Log("VFX em Execucao Continua");\n        }\n    }\n}`,
            exp: "VFX em Execucao Continua", descTest: "Looping VFX"
        },
        {
            title: "Interrupção do Sistema de Partículas (Stop)", diff: "medium",
            desc: "Declare string statusVfx = 'VFX Stop: Emissao Encerrada';. Emita a mensagem com Debug.Log.",
            reqs: ["string statusVfx", "statusVfx", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusVfx e emita\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusVfx = "VFX Stop: Emissao Encerrada";\n        Debug.Log(statusVfx);\n    }\n}`,
            exp: "VFX Stop: Emissao Encerrada", descTest: "Parada de partículas"
        }
    ];

    // 25: Efeitos Sonoros 3D e Áudio
    acts[25] = [
        {
            title: "Reprodução de Áudio com PlayOneShot", diff: "easy",
            desc: "Simule o disparo de um som único de golpe: declare string som = 'Espada_Hit';. Emita no Console: 'Audio Tocado: Espada_Hit'.",
            reqs: ["som", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o som e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string som = "Espada_Hit";\n        Debug.Log("Audio Tocado: " + som);\n    }\n}`,
            exp: "Audio Tocado: Espada_Hit", descTest: "PlayOneShot áudio"
        },
        {
            title: "Atenuação de Volume Espacial (3D Blend)", diff: "easy",
            desc: "Declare float espacialBlend = 1.0f;. Emita no Console: 'Som 3D Completo: 1'.",
            reqs: ["float espacialBlend", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare espacialBlend e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float espacialBlend = 1.0f;\n        Debug.Log("Som 3D Completo: " + espacialBlend);\n    }\n}`,
            exp: "Som 3D Completo: 1", descTest: "Spatial Blend 3D"
        },
        {
            title: "Distância Máxima de Audição (Max Distance)", diff: "medium",
            desc: "Declare float maxDist = 20.0f; e a distância atual float distOuvinte = 15.0f;. Se distOuvinte <= maxDist, emita 'Som Audivel'.",
            reqs: ["float maxDist", "float distOuvinte", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide se o som e audivel\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float maxDist = 20.0f;\n        float distOuvinte = 15.0f;\n        if (distOuvinte <= maxDist)\n        {\n            Debug.Log("Som Audivel");\n        }\n    }\n}`,
            exp: "Som Audivel", descTest: "Atenuação sonora por distância"
        },
        {
            title: "Controle de Volume Geral", diff: "medium",
            desc: "Declare float volume = 0.8f;. Emita no Console: 'Volume Master: 80%'.",
            reqs: ["float volume", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a porcentagem de volume e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float volume = 0.8f;\n        int pct = (int)(volume * 100);\n        Debug.Log("Volume Master: " + pct + "%");\n    }\n}`,
            exp: "Volume Master: 80%", descTest: "Volume de áudio"
        },
        {
            title: "Trilha Sonora em Loop", diff: "medium",
            desc: "Declare string musica = 'Tema_Batalha'; e bool emLoop = true;. Se emLoop, emita 'BGM em Loop: Tema_Batalha'.",
            reqs: ["musica", "bool emLoop", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se a musica esta em loop\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string musica = "Tema_Batalha";\n        bool emLoop = true;\n        if (emLoop)\n        {\n            Debug.Log("BGM em Loop: " + musica);\n        }\n    }\n}`,
            exp: "BGM em Loop: Tema_Batalha", descTest: "Loop musical"
        }
    ];

    // 26: NavMesh e NPC
    acts[26] = [
        {
            title: "Definição de Destino com SetDestination", diff: "easy",
            desc: "Simule o envio de um NPC para um destino: declare Vector3 destino = new Vector3(10, 0, 15);. Emita no Console: 'Destino NavMesh: (10, 0, 15)'.",
            reqs: ["new Vector3", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure destino e emita\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 destino = new Vector3(10, 0, 15);\n        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");\n    }\n}`,
            exp: "Destino NavMesh: (10, 0, 15)", descTest: "NavMesh destino"
        },
        {
            title: "Velocidade de Navegação do Agente", diff: "easy",
            desc: "Declare float velocidadeAgente = 3.5f;. Emita no Console: 'Velocidade NavMeshAgent: 3.5'.",
            reqs: ["float velocidadeAgente", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare velocidadeAgente e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float velocidadeAgente = 3.5f;\n        Debug.Log("Velocidade NavMeshAgent: " + velocidadeAgente);\n    }\n}`,
            exp: "Velocidade NavMeshAgent: 3.5", descTest: "NavMeshAgent speed"
        },
        {
            title: "Distância de Parada (StoppingDistance)", diff: "medium",
            desc: "Declare float distRestante = 0.8f; e float stopDist = 1.0f;. Se distRestante <= stopDist, emita 'NPC Chegou ao Destino'.",
            reqs: ["float distRestante", "float stopDist", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Valide se o agente chegou\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distRestante = 0.8f;\n        float stopDist = 1.0f;\n        if (distRestante <= stopDist)\n        {\n            Debug.Log("NPC Chegou ao Destino");\n        }\n    }\n}`,
            exp: "NPC Chegou ao Destino", descTest: "NavMesh stopping distance"
        },
        {
            title: "Patrulha Entre Pontos (Waypoints)", diff: "medium",
            desc: "Declare int indicePonto = 0; e int totalPontos = 3;. Avance para o próximo índice com (indicePonto + 1) % totalPontos e emita 'Proximo Ponto: ' + proximo.",
            reqs: ["indicePonto", "totalPontos", "%", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Avance para o proximo waypoint\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int indicePonto = 0;\n        int totalPontos = 3;\n        int proximo = (indicePonto + 1) % totalPontos;\n        Debug.Log("Proximo Ponto: " + proximo);\n    }\n}`,
            exp: "Proximo Ponto: 1", descTest: "Alternância de waypoints"
        },
        {
            title: "Pausa para Observação no Ponto", diff: "medium",
            desc: "Declare float tempoEspera = 2.0f;. Emita no Console: 'Aguardando no Ponto: 2s'.",
            reqs: ["float tempoEspera", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoEspera e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoEspera = 2.0f;\n        Debug.Log("Aguardando no Ponto: " + tempoEspera + "s");\n    }\n}`,
            exp: "Aguardando no Ponto: 2s", descTest: "Espera de patrulha"
        }
    ];

    // 27: Shaders Básicos
    acts[27] = [
        {
            title: "Configuração de Cor Albedo PBR", diff: "easy",
            desc: "Declare string corBase = 'Vermelho_Carmim';. Emita no Console: 'Cor Albedo: Vermelho_Carmim'.",
            reqs: ["corBase", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare corBase e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string corBase = "Vermelho_Carmim";\n        Debug.Log("Cor Albedo: " + corBase);\n    }\n}`,
            exp: "Cor Albedo: Vermelho_Carmim", descTest: "Cor Albedo do shader"
        },
        {
            title: "Grau Metálico (Metallic)", diff: "easy",
            desc: "Declare float metallic = 0.9f;. Emita no Console: 'Grau Metalico: 0.9'.",
            reqs: ["float metallic", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare metallic e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float metallic = 0.9f;\n        Debug.Log("Grau Metalico: " + metallic);\n    }\n}`,
            exp: "Grau Metalico: 0.9", descTest: "Propriedade Metallic"
        },
        {
            title: "Rugosidade e Suavidade (Smoothness)", diff: "medium",
            desc: "Declare float smoothness = 0.75f;. Emita no Console: 'Suavidade de Reflexo: 0.75'.",
            reqs: ["float smoothness", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare smoothness e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float smoothness = 0.75f;\n        Debug.Log("Suavidade de Reflexo: " + smoothness);\n    }\n}`,
            exp: "Suavidade de Reflexo: 0.75", descTest: "Propriedade Smoothness"
        },
        {
            title: "Emissão de Luz Própria (Emission)", diff: "medium",
            desc: "Declare bool temEmissao = true; e float intensidadeEmissao = 2.0f;. Se temEmissao, emita 'Emissao Ativa: 2x'.",
            reqs: ["bool temEmissao", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque se ha emissao de luz\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEmissao = true;\n        float intensidadeEmissao = 2.0f;\n        if (temEmissao)\n        {\n            Debug.Log("Emissao Ativa: " + intensidadeEmissao + "x");\n        }\n    }\n}`,
            exp: "Emissao Ativa: 2x", descTest: "Emission shader property"
        },
        {
            title: "Troca Dinâmica de Material", diff: "medium",
            desc: "Declare string materialAtual = 'Padrao';. Quando atingido (bool atingido = true), troque materialAtual para 'Dano_Flash' e emita 'Material: ' + materialAtual.",
            reqs: ["materialAtual", "bool atingido", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Troque o material em caso de dano\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string materialAtual = "Padrao";\n        bool atingido = true;\n        if (atingido)\n        {\n            materialAtual = "Dano_Flash";\n        }\n        Debug.Log("Material: " + materialAtual);\n    }\n}`,
            exp: "Material: Dano_Flash", descTest: "Troca dinâmica de material"
        }
    ];

    // 28: Instantiate e Destroy Dinâmicos
    acts[28] = [
        {
            title: "Criação Dinâmica de Entidade", diff: "easy",
            desc: "Simule o nascimento de um projétil na cena: declare string prefab = 'Projetil_Fogo';. Emita no Console: 'Instantiate: Projetil_Fogo gerado'.",
            reqs: ["prefab", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie o prefab e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string prefab = "Projetil_Fogo";\n        Debug.Log("Instantiate: " + prefab + " gerado");\n    }\n}`,
            exp: "Instantiate: Projetil_Fogo gerado", descTest: "Instantiate dinâmico"
        },
        {
            title: "Instantiate com Posição e Rotação", diff: "easy",
            desc: "Declare Vector3 spawnPos = new Vector3(0, 1, 5);. Emita no Console: 'Spawn na Posicao: (0, 1, 5)'.",
            reqs: ["new Vector3", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare spawnPos e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 spawnPos = new Vector3(0, 1, 5);\n        Debug.Log("Spawn na Posicao: (" + spawnPos.x + ", " + spawnPos.y + ", " + spawnPos.z + ")");\n    }\n}`,
            exp: "Spawn na Posicao: (0, 1, 5)", descTest: "Spawn com coordenadas"
        },
        {
            title: "Destruição com Temporizador (Delay)", diff: "medium",
            desc: "Declare float tempoVida = 3.0f;. Emita no Console: 'Objeto Destruido Apos: 3s'.",
            reqs: ["float tempoVida", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare tempoVida e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float tempoVida = 3.0f;\n        Debug.Log("Objeto Destruido Apos: " + tempoVida + "s");\n    }\n}`,
            exp: "Objeto Destruido Apos: 3s", descTest: "Destroy com delay"
        },
        {
            title: "Contagem de Objetos Instanciados", diff: "medium",
            desc: "Use um laço for de 1 até 3 gerando mensagens: 'Instancia #' + i + ' criada'.",
            reqs: ["for", "<=", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie 3 instancias no laco for\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log("Instancia #" + i + " criada");\n        }\n    }\n}`,
            exp: "Instancia #1 criada\nInstancia #2 criada\nInstancia #3 criada", descTest: "Spawn múltiplo"
        },
        {
            title: "Destruição Imediata ao Contato", diff: "medium",
            desc: "Declare string colisor = 'Abismo';. Se colisor == 'Abismo', emita 'Destroy: Entidade Removida da Cena'.",
            reqs: ["colisor", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque o colisor e execute Destroy\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string colisor = "Abismo";\n        if (colisor == "Abismo")\n        {\n            Debug.Log("Destroy: Entidade Removida da Cena");\n        }\n    }\n}`,
            exp: "Destroy: Entidade Removida da Cena", descTest: "Destroy imediato"
        }
    ];

    return acts;
}

module.exports = { buildPart4 };
