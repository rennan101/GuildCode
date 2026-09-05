/**
 * ACTS PART 3: Chapters 13 to 20
 * 13: Sistemas de Coordenadas 3D
 * 14: Vetores 3D & Distâncias
 * 15: Planos 3D e Raycasting
 * 16: Rigidbody e Física 3D
 * 17: Colisões e Triggers
 * 18: Câmera 3ª Pessoa (Cinemachine)
 * 19: Câmera 1ª Pessoa (FPS Look)
 * 20: Geometrias 3D e Meshes
 */

function buildPart3() {
    const acts = {};

    // 13: Sistemas de Coordenadas 3D
    acts[13] = [
        {
            title: "Ponto no Espaço Tridimensional", diff: "easy",
            desc: "Declare um Vector3 pos = new Vector3(2, 5, 8);. Imprima no Console a coordenada X com 'Coord X: ' + pos.x.",
            reqs: ["Vector3", "pos.x", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare pos e emita Coord X\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 pos = new Vector3(2, 5, 8);\n        Debug.Log("Coord X: " + pos.x);\n    }\n}`,
            exp: "Coord X: 2", descTest: "Coordenada X em Vector3"
        },
        {
            title: "Origem do Espaço Mundial (Vector3.zero)", diff: "easy",
            desc: "Obtenha a coordenada Y do vetor central Vector3.zero. Emita no Console: 'Origem Y: ' + Vector3.zero.y.",
            reqs: ["Vector3.zero", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Exiba a coordenada Y de Vector3.zero\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("Origem Y: " + Vector3.zero.y);\n    }\n}`,
            exp: "Origem Y: 0", descTest: "Acesso a Vector3.zero"
        },
        {
            title: "Conversão de Espaço Local para Global", diff: "medium",
            desc: "Simule a translação de uma coordenada local para mundial somando um deslocamento: posMundial = posPai + offset. Com pai em 10 e offset em 3, emita 'Posicao Mundial: 13'.",
            reqs: ["int posPai", "int offset", "posMundial", "+"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule e imprima posMundial\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int posPai = 10;\n        int offset = 3;\n        int posMundial = posPai + offset;\n        Debug.Log("Posicao Mundial: " + posMundial);\n    }\n}`,
            exp: "Posicao Mundial: 13", descTest: "Soma de espaço local"
        },
        {
            title: "Identificação dos Três Eixos", diff: "medium",
            desc: "Declare Vector3 eixos = new Vector3(1, 0, 0);. Se eixos.x == 1, emita 'Eixo Selecionado: X (Largura)'.",
            reqs: ["new Vector3(1, 0, 0)", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare eixos e avalie\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 eixos = new Vector3(1, 0, 0);\n        if (eixos.x == 1)\n        {\n            Debug.Log("Eixo Selecionado: X (Largura)");\n        }\n    }\n}`,
            exp: "Eixo Selecionado: X (Largura)", descTest: "Eixo X"
        },
        {
            title: "Espaço Unitário (Vector3.one)", diff: "medium",
            desc: "Declare Vector3 escala = Vector3.one;. Emita no Console: 'Escala Inicial: ' + escala.x + ', ' + escala.y + ', ' + escala.z.",
            reqs: ["Vector3.one", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare escala com Vector3.one e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 escala = Vector3.one;\n        Debug.Log("Escala Inicial: " + escala.x + ", " + escala.y + ", " + escala.z);\n    }\n}`,
            exp: "Escala Inicial: 1, 1, 1", descTest: "Vector3.one"
        }
    ];

    // 14: Vetores 3D & Distâncias
    acts[14] = [
        {
            title: "Cálculo de Distância Euclidiana", diff: "easy",
            desc: "Declare Vector3 a = new Vector3(0, 0, 0); e Vector3 b = new Vector3(3, 4, 0);. Calcule a distância com Vector3.Distance(a, b) e exiba 'Distancia: ' + dist.",
            reqs: ["Vector3.Distance", "new Vector3", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a distancia entre a e b\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 a = new Vector3(0, 0, 0);\n        Vector3 b = new Vector3(3, 4, 0);\n        float dist = Vector3.Distance(a, b);\n        Debug.Log("Distancia: " + dist);\n    }\n}`,
            exp: "Distancia: 5", descTest: "Vector3.Distance"
        },
        {
            title: "Normalização de Vetor", diff: "easy",
            desc: "Declare Vector3 dir = new Vector3(5, 0, 0);. Calcule o vetor normalizado com Vector3.Normalize(dir) e exiba 'Dir X: ' + norm.x.",
            reqs: ["Vector3.Normalize", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Normalize dir e exiba norm.x\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 dir = new Vector3(5, 0, 0);\n        var norm = Vector3.Normalize(dir);\n        Debug.Log("Dir X: " + norm.x);\n    }\n}`,
            exp: "Dir X: 1", descTest: "Vector3.Normalize"
        },
        {
            title: "Produto Escalar (Vector3.Dot)", diff: "medium",
            desc: "Declare Vector3 frente = Vector3.forward; e Vector3 alvo = Vector3.forward;. Calcule o alinhamento com Vector3.Dot(frente, alvo) e exiba 'Alinhamento: ' + dot.",
            reqs: ["Vector3.Dot", "Vector3.forward", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o produto escalar\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 frente = Vector3.forward;\n        Vector3 alvo = Vector3.forward;\n        float dot = Vector3.Dot(frente, alvo);\n        Debug.Log("Alinhamento: " + dot);\n    }\n}`,
            exp: "Alinhamento: 1", descTest: "Vector3.Dot"
        },
        {
            title: "Produto Vetorial (Vector3.Cross)", diff: "medium",
            desc: "Obtenha a normal perpendicular usando Vector3.Cross: declare Vector3 direito = Vector3.right; e Vector3 cima = Vector3.up;. Calcule Vector3.Cross(direito, cima) e emita 'Normal Z: ' + cross.z.",
            reqs: ["Vector3.Cross", "Vector3.right", "Vector3.up"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule o cross product\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 direito = Vector3.right;\n        Vector3 cima = Vector3.up;\n        var cross = Vector3.Cross(direito, cima);\n        Debug.Log("Normal Z: " + cross.z);\n    }\n}`,
            exp: "Normal Z: 1", descTest: "Vector3.Cross"
        },
        {
            title: "Alcance de Radar de Proximidade", diff: "medium",
            desc: "Calcule a distância entre o jogador em (0,0,0) e um inimigo em (0,0,8). Se a distância for menor que 10, emita 'Alvo no Radar: 8m'.",
            reqs: ["Vector3.Distance", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule a distancia e avalie o radar\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 player = Vector3.zero;\n        Vector3 enemy = new Vector3(0, 0, 8);\n        float dist = Vector3.Distance(player, enemy);\n        if (dist < 10)\n        {\n            Debug.Log("Alvo no Radar: " + dist + "m");\n        }\n    }\n}`,
            exp: "Alvo no Radar: 8m", descTest: "Radar de proximidade com Vector3.Distance"
        }
    ];

    // 15: Planos 3D e Raycasting
    acts[15] = [
        {
            title: "Disparo de Raycast Físico", diff: "easy",
            desc: "Execute um disparo de raio chamando Physics.Raycast(Vector3.zero, Vector3.forward, 10f). Emita no Console: 'Raio Disparado: True'.",
            reqs: ["Physics.Raycast", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Execute Physics.Raycast\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10.0f);\n        Debug.Log("Raio Disparado: " + acertou);\n    }\n}`,
            exp: "Raio Disparado: True", descTest: "Physics.Raycast simples"
        },
        {
            title: "Alcance Máximo de Detecção", diff: "easy",
            desc: "Defina a distância máxima de alcance float alcanceMax = 25.0f;. Emita no Console: 'Alcance do Raio: 25 metros'.",
            reqs: ["float alcanceMax", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare alcanceMax e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float alcanceMax = 25.0f;\n        Debug.Log("Alcance do Raio: " + alcanceMax + " metros");\n    }\n}`,
            exp: "Alcance do Raio: 25 metros", descTest: "Alcance do Raycast"
        },
        {
            title: "Identificação de Objeto Atingido", diff: "medium",
            desc: "Simule os dados de um RaycastHit: declare string tagAtingida = 'Chao';. Se tagAtingida for 'Chao', emita 'Impacto no Solo Confirmado'.",
            reqs: ["string tagAtingida", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a tag atingida\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string tagAtingida = "Chao";\n        if (tagAtingida == "Chao")\n        {\n            Debug.Log("Impacto no Solo Confirmado");\n        }\n    }\n}`,
            exp: "Impacto no Solo Confirmado", descTest: "Hit detection"
        },
        {
            title: "Máscara de Colisão (LayerMask)", diff: "medium",
            desc: "Simule a filtragem por camada: declare int layerInimigo = 8;. Emita no Console: 'Mascara de Camada Ativa: 8'.",
            reqs: ["int layerInimigo", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare a layer e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int layerInimigo = 8;\n        Debug.Log("Mascara de Camada Ativa: " + layerInimigo);\n    }\n}`,
            exp: "Mascara de Camada Ativa: 8", descTest: "LayerMask"
        },
        {
            title: "Cálculo de Ponto de Impacto", diff: "medium",
            desc: "Declare a distância de impacto float distHit = 4.2f;. Emita no Console: 'Impacto a ' + distHit + ' metros'.",
            reqs: ["float distHit", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare distHit e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float distHit = 4.2f;\n        Debug.Log("Impacto a " + distHit + " metros");\n    }\n}`,
            exp: "Impacto a 4.2 metros", descTest: "Distância do ponto de impacto"
        }
    ];

    // 16: Rigidbody e Física 3D
    acts[16] = [
        {
            title: "Configuração de Massa Física", diff: "easy",
            desc: "Declare a variável float massa = 75.0f;. Emita no Console: 'Massa do Rigidbody: 75kg'.",
            reqs: ["float massa", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare massa e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float massa = 75.0f;\n        Debug.Log("Massa do Rigidbody: " + massa + "kg");\n    }\n}`,
            exp: "Massa do Rigidbody: 75kg", descTest: "Configuração de massa"
        },
        {
            title: "Aplicação de Impulso com AddForce", diff: "easy",
            desc: "Simule a aplicação de um impulso de pulo: declare float forcaPulo = 10.0f;. Emita no Console: 'Forca Aplicada: 10N'.",
            reqs: ["float forcaPulo", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare forcaPulo e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float forcaPulo = 10.0f;\n        Debug.Log("Forca Aplicada: " + forcaPulo + "N");\n    }\n}`,
            exp: "Forca Aplicada: 10N", descTest: "Impulso físico"
        },
        {
            title: "Velocidade Linear (linearVelocity)", diff: "medium",
            desc: "No Unity 6.5, linearVelocity gerencia a velocidade direta do corpo. Declare Vector3 vel = new Vector3(0, 5, 0); e emita 'Velocidade Y: ' + vel.y.",
            reqs: ["new Vector3", "vel.y", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure vel e imprima vel.y\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 vel = new Vector3(0, 5, 0);\n        Debug.Log("Velocidade Y: " + vel.y);\n    }\n}`,
            exp: "Velocidade Y: 5", descTest: "Velocidade linear"
        },
        {
            title: "Controle de Gravidade (useGravity)", diff: "medium",
            desc: "Declare bool usaGravidade = true;. Se for verdadeiro, emita 'Gravidade Ativada no Corpo'.",
            reqs: ["bool usaGravidade", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque usaGravidade\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool usaGravidade = true;\n        if (usaGravidade)\n        {\n            Debug.Log("Gravidade Ativada no Corpo");\n        }\n    }\n}`,
            exp: "Gravidade Ativada no Corpo", descTest: "Uso de gravidade"
        },
        {
            title: "Resistência do Ar (Drag)", diff: "medium",
            desc: "Declare float drag = 2.5f;. Emita no Console: 'Atrito do Ar (Drag): 2.5'.",
            reqs: ["float drag", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare drag e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float drag = 2.5f;\n        Debug.Log("Atrito do Ar (Drag): " + drag);\n    }\n}`,
            exp: "Atrito do Ar (Drag): 2.5", descTest: "Drag físico"
        }
    ];

    // 17: Colisões e Triggers
    acts[17] = [
        {
            title: "Detecção de Colisão Sólida (OnCollisionEnter)", diff: "easy",
            desc: "Declare string outroObjeto = 'Parede';. Se for igual a 'Parede', emita no Console: 'Impacto com Parede Registrado'.",
            reqs: ["outroObjeto", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a colisao solida\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string outroObjeto = "Parede";\n        if (outroObjeto == "Parede")\n        {\n            Debug.Log("Impacto com Parede Registrado");\n        }\n    }\n}`,
            exp: "Impacto com Parede Registrado", descTest: "Colisão sólida"
        },
        {
            title: "Gatilho de Zona (OnTriggerEnter)", diff: "easy",
            desc: "Declare bool isTrigger = true; e string zona = 'Checkpoint';. Se isTrigger for verdadeiro, emita 'Trigger Ativado: Checkpoint'.",
            reqs: ["bool isTrigger", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque o trigger e imprima a zona\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool isTrigger = true;\n        string zona = "Checkpoint";\n        if (isTrigger)\n        {\n            Debug.Log("Trigger Ativado: " + zona);\n        }\n    }\n}`,
            exp: "Trigger Ativado: Checkpoint", descTest: "Trigger de zona"
        },
        {
            title: "Coleta de Moeda por Gatilho", diff: "medium",
            desc: "Declare int moedas = 0;. Simule a coleta somando 1 a moedas e emita no Console: 'Moedas: ' + moedas.",
            reqs: ["int moedas", "++", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Incremente as moedas coletadas\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int moedas = 0;\n        moedas++;\n        Debug.Log("Moedas: " + moedas);\n    }\n}`,
            exp: "Moedas: 1", descTest: "Coleta de item por trigger"
        },
        {
            title: "Filtro de Colisão por Tag", diff: "medium",
            desc: "Declare string colTag = 'Enemy';. Se colTag == 'Enemy', emita 'Dano Sofrido por Colisao!'.",
            reqs: ["colTag", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a tag do inimigo\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string colTag = "Enemy";\n        if (colTag == "Enemy")\n        {\n            Debug.Log("Dano Sofrido por Colisao!");\n        }\n    }\n}`,
            exp: "Dano Sofrido por Colisao!", descTest: "Filtragem por Tag"
        },
        {
            title: "Gatilho de Saída (OnTriggerExit)", diff: "medium",
            desc: "Simule a saída de uma área segura: declare bool naAreaSegura = false;. Se não estiver na área segura (!naAreaSegura), emita 'Saiu da Area Segura!'.",
            reqs: ["bool naAreaSegura", "!", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque a saida da area segura\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool naAreaSegura = false;\n        if (!naAreaSegura)\n        {\n            Debug.Log("Saiu da Area Segura!");\n        }\n    }\n}`,
            exp: "Saiu da Area Segura!", descTest: "TriggerExit"
        }
    ];

    // 18: Câmera 3ª Pessoa (Cinemachine)
    acts[18] = [
        {
            title: "Configuração de Alvo (Follow Target)", diff: "easy",
            desc: "Declare string alvoSeguido = 'Player';. Emita no Console: 'Cinemachine Seguindo: Player'.",
            reqs: ["alvoSeguido", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure alvoSeguido e emita\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string alvoSeguido = "Player";\n        Debug.Log("Cinemachine Seguindo: " + alvoSeguido);\n    }\n}`,
            exp: "Cinemachine Seguindo: Player", descTest: "Cinemachine follow target"
        },
        {
            title: "Distância Orbital da Câmera", diff: "easy",
            desc: "Declare float raioOrbital = 4.5f;. Emita no Console: 'Distancia Orbital: 4.5m'.",
            reqs: ["float raioOrbital", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare raioOrbital e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float raioOrbital = 4.5f;\n        Debug.Log("Distancia Orbital: " + raioOrbital + "m");\n    }\n}`,
            exp: "Distancia Orbital: 4.5m", descTest: "Distância de câmera orbital"
        },
        {
            title: "Amortecimento Suave (Damping)", diff: "medium",
            desc: "Declare float damping = 0.3f;. Emita no Console: 'Suavizacao Damping: 0.3'.",
            reqs: ["float damping", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare damping e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float damping = 0.3f;\n        Debug.Log("Suavizacao Damping: " + damping);\n    }\n}`,
            exp: "Suavizacao Damping: 0.3", descTest: "Damping da câmera"
        },
        {
            title: "Transição Suave Entre Câmeras Virtuais", diff: "medium",
            desc: "Declare int prioridadeVcam1 = 10 e int prioridadeVcam2 = 20. Se prioridadeVcam2 > prioridadeVcam1, emita 'Vcam2 Ativa por Prioridade'.",
            reqs: ["prioridadeVcam1", "prioridadeVcam2", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Compare as prioridades e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int prioridadeVcam1 = 10;\n        int prioridadeVcam2 = 20;\n        if (prioridadeVcam2 > prioridadeVcam1)\n        {\n            Debug.Log("Vcam2 Ativa por Prioridade");\n        }\n    }\n}`,
            exp: "Vcam2 Ativa por Prioridade", descTest: "Prioridade de vcam"
        },
        {
            title: "Zona Morta da Câmera (Dead Zone)", diff: "medium",
            desc: "Declare float deadZoneWidth = 0.1f;. Emita no Console: 'Largura Dead Zone: 0.1'.",
            reqs: ["float deadZoneWidth", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare deadZoneWidth e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float deadZoneWidth = 0.1f;\n        Debug.Log("Largura Dead Zone: " + deadZoneWidth);\n    }\n}`,
            exp: "Largura Dead Zone: 0.1", descTest: "Dead zone da Cinemachine"
        }
    ];

    // 19: Câmera 1ª Pessoa (FPS Look)
    acts[19] = [
        {
            title: "Sensibilidade do Mouse Look", diff: "easy",
            desc: "Declare float sensibilidade = 2.0f;. Emita no Console: 'Sensibilidade Mouse: 2'.",
            reqs: ["float sensibilidade", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare sensibilidade e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float sensibilidade = 2.0f;\n        Debug.Log("Sensibilidade Mouse: " + sensibilidade);\n    }\n}`,
            exp: "Sensibilidade Mouse: 2", descTest: "Sensibilidade FPS"
        },
        {
            title: "Trava de Cursor no Centro da Tela", diff: "easy",
            desc: "Configure a trava do cursor acessando Cursor.lockState = 0;. Emita no Console: 'Cursor Bloqueado no Centro'.",
            reqs: ["Cursor.lockState", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Configure Cursor.lockState e emita\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Cursor.lockState = 0;\n        Debug.Log("Cursor Bloqueado no Centro");\n    }\n}`,
            exp: "Cursor Bloqueado no Centro", descTest: "Bloqueio do Cursor"
        },
        {
            title: "Limite de Rotação Vertical (Clamp Pitch)", diff: "medium",
            desc: "Restrinja o ângulo vertical para não quebrar o pescoço do personagem: use Mathf.Clamp(95, -80, 80) e emita 'Angulo Travado: ' + angulo.",
            reqs: ["Mathf.Clamp", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Aplique Mathf.Clamp entre -80 e 80\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float angulo = Mathf.Clamp(95, -80, 80);\n        Debug.Log("Angulo Travado: " + angulo);\n    }\n}`,
            exp: "Angulo Travado: 80", descTest: "Mathf.Clamp vertical"
        },
        {
            title: "Rotação Horizontal do Corpo", diff: "medium",
            desc: "Declare float mouseX = 15.0f;. Emita no Console: 'Giro Horizontal do Corpo: 15 graus'.",
            reqs: ["float mouseX", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare mouseX e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        float mouseX = 15.0f;\n        Debug.Log("Giro Horizontal do Corpo: " + mouseX + " graus");\n    }\n}`,
            exp: "Giro Horizontal do Corpo: 15 graus", descTest: "Giro horizontal"
        },
        {
            title: "Campo de Visão (Field of View)", diff: "medium",
            desc: "Declare int fov = 60;. Quando o jogador mirar (bool mirando = true), reduza o fov para 40 e emita 'FOV Atual: ' + fov.",
            reqs: ["int fov", "bool mirando", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Reduza o FOV ao mirar e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int fov = 60;\n        bool mirando = true;\n        if (mirando) fov = 40;\n        Debug.Log("FOV Atual: " + fov);\n    }\n}`,
            exp: "FOV Atual: 40", descTest: "Zoom com FOV"
        }
    ];

    // 20: Geometrias 3D e Meshes
    acts[20] = [
        {
            title: "Contagem de Vértices da Geometria", diff: "easy",
            desc: "Declare int totalVertices = 24;. Emita no Console: 'Vertices da Malha: 24'.",
            reqs: ["int totalVertices", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare totalVertices e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalVertices = 24;\n        Debug.Log("Vertices da Malha: " + totalVertices);\n    }\n}`,
            exp: "Vertices da Malha: 24", descTest: "Contagem de vértices"
        },
        {
            title: "Triângulos e Faces Poligonais", diff: "easy",
            desc: "Cada quad requer 2 triângulos. Para 6 faces de um cubo, calcule totalTriangulos = 6 * 2 e emita 'Total Triangulos: ' + totalTriangulos.",
            reqs: ["totalTriangulos", "6 * 2", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Calcule totalTriangulos e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalTriangulos = 6 * 2;\n        Debug.Log("Total Triangulos: " + totalTriangulos);\n    }\n}`,
            exp: "Total Triangulos: 12", descTest: "Triangulação de cubo"
        },
        {
            title: "Mapeamento UV de Textura", diff: "medium",
            desc: "Declare Vector2 uv = new Vector2(0.5f, 0.5f);. Emita no Console: 'Centro UV: (0.5, 0.5)'.",
            reqs: ["new Vector2", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare uv e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Vector2 uv = new Vector2(0.5f, 0.5f);\n        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");\n    }\n}`,
            exp: "Centro UV: (0.5, 0.5)", descTest: "Coordenadas UV"
        },
        {
            title: "Recálculo de Normais da Malha", diff: "medium",
            desc: "Declare string statusNormais = 'Normais Recalculadas com Sucesso';. Emita no Console o valor de statusNormais.",
            reqs: ["string statusNormais", "statusNormais", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare statusNormais e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string statusNormais = "Normais Recalculadas com Sucesso";\n        Debug.Log(statusNormais);\n    }\n}`,
            exp: "Normais Recalculadas com Sucesso", descTest: "RecalculateNormals"
        },
        {
            title: "Otimização de Submeshes", diff: "medium",
            desc: "Declare int submeshes = 1;. Se submeshes == 1, emita 'Malha Otimizada: Draw Call Unico'.",
            reqs: ["int submeshes", "if", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Cheque as submeshes\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int submeshes = 1;\n        if (submeshes == 1)\n        {\n            Debug.Log("Malha Otimizada: Draw Call Unico");\n        }\n    }\n}`,
            exp: "Malha Otimizada: Draw Call Unico", descTest: "Submesh e draw call"
        }
    ];

    return acts;
}

module.exports = { buildPart3 };
