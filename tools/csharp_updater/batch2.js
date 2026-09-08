// tools/csharp_updater/batch2.js - Capítulos 13 a 25
// Módulos 4, 5, 6, 7 e 8 (Parte 1): Matemática 3D, Física, Câmeras, Mundo 3D, UI, VFX e Áudio

module.exports = {
    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 13 — SISTEMAS DE COORDENADAS 3D
    // ═══════════════════════════════════════════════════════
    13: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Entrando no Módulo 4 — Matemática 3D. Sistema de Coordenadas Cartesiano Tridimensional ativado."
            },
            {
                type: "narrative",
                text: "O chão do santuário desvanece-se em uma grade infinita de luz tridimensional. Orin Vale ajusta bússolas arcanas orientadas nos eixos X, Y e Z."
            },
            {
                type: "character",
                name: "ORIN VALE",
                role: "EXPLORADOR DE CENÁRIOS",
                cssClass: "orin",
                text: "No espaço tridimensional do Unity, todo ponto existe nas coordenadas <code>(X, Y, Z)</code>! O eixo X representa a largura (esquerda/direita), Y a altura vertical (cima/baixo) e Z a profundidade (frente/trás)."
            },
            {
                type: "character",
                name: "KAEL DRAVEN",
                role: "FERREIRO DE CÓDIGO",
                cssClass: "kael",
                text: "A origem do universo é <code>Vector3.zero</code> (0, 0, 0), e o cubo unitário de referência é <code>Vector3.one</code> (1, 1, 1). Mas o maior segredo dos mundos 3D é diferenciar o espaço local do global: a posição mundial de um herói é a soma da posição do objeto-pai mais seu deslocamento local!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Compreender vetores tridimensionais é a fundação de todo o game development moderno. Pratique declarando vetores, lendo coordenadas isoladas e convertendo posições."
            }
        ],
        concept: {
            title: "ESPAÇO TRIDIMENSIONAL NO UNITY: VECTOR3, EIXOS CARTESIANOS E ESPAÇO LOCAL VS MUNDIAL",
            explanation: `O Unity utiliza um sistema de coordenadas cartesiano tridimensional com convenção de mão esquerda (Left-Handed):
<ul>
  <li><strong>Ponto no Espaço Tridimensional (<code>Vector3</code>):</strong> Uma estrutura que encapsula três floats: <code>pos.x</code>, <code>pos.y</code> e <code>pos.z</code> (ex: <code>Vector3 pos = new Vector3(2, 5, 8);</code> onde <code>pos.x</code> vale 2).</li>
  <li><strong>Origem Mundial (<code>Vector3.zero</code>):</strong> Representa o centro exato do mundo <code>(0, 0, 0)</code>. Sua coordenada Y é obtida com <code>Vector3.zero.y</code>.</li>
  <li><strong>Espaço Unitário (<code>Vector3.one</code>):</strong> Representa o vetor <code>(1, 1, 1)</code>, frequentemente utilizado como escala padrão inicial de objetos 3D.</li>
  <li><strong>Espaço Local vs Global:</strong> Um objeto filho herda a posição de seu pai. A posição mundial final resulta da translação: <code>posMundial = posPai + offset;</code> (ex: pai em 10 somado a offset 3 resulta em <code>Posicao Mundial: 13</code>).</li>
  <li><strong>Identificação dos Três Eixos:</strong> O eixo X (1,0,0) representa a largura lateral, o eixo Y (0,1,0) a elevação vertical e o eixo Z (0,0,1) a profundidade frontal.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploCoordenadas3D : MonoBehaviour
{
    void Start()
    {
        // 1. Ponto tridimensional e coordenada X
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);

        // 2. Origem do espaço mundial
        Debug.Log("Origem Y: " + Vector3.zero.y);

        // 3. Conversão de espaço local para global
        int posPai = 10;
        int offset = 3;
        int posMundial = posPai + offset;
        Debug.Log("Posicao Mundial: " + posMundial);

        // 4. Identificação dos eixos principais
        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1)
        {
            Debug.Log("Eixo Selecionado: X (Largura)");
        }

        // 5. Escala unitária tridimensional (Vector3.one)
        Vector3 escala = Vector3.one;
        Debug.Log("Escala Inicial: " + escala.x + ", " + escala.y + ", " + escala.z);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Cálculo de Posição Espacial 3D",
            code: `using UnityEngine;

public class Espaco3DManager : MonoBehaviour
{
    void Start()
    {
        Vector3 pos = new Vector3(2, 5, 8);
        Debug.Log("Coord X: " + pos.x);

        Debug.Log("Origem Y: " + Vector3.zero.y);

        int posPai = 10;
        int offset = 3;
        Debug.Log("Posicao Mundial: " + (posPai + offset));

        Vector3 eixos = new Vector3(1, 0, 0);
        if (eixos.x == 1) Debug.Log("Eixo Selecionado: X (Largura)");

        Vector3 esc = Vector3.one;
        Debug.Log("Escala Inicial: " + esc.x + ", " + esc.y + ", " + esc.z);
    }
}`,
            output: `Coord X: 2
Origem Y: 0
Posicao Mundial: 13
Eixo Selecionado: X (Largura)
Escala Inicial: 1, 1, 1`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 14 — VETORES 3D & DISTÂNCIAS
    // ═══════════════════════════════════════════════════════
    14: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Calibrando o Motor de Álgebra Vetorial. Operações de produto escalar e vetorial ativadas."
            },
            {
                type: "narrative",
                text: "Vetores radiantes conectam o guerreiro aos inimigos ao redor. Kael Draven demonstra como a matemática vetorial governa a visão, o alcance e o impacto dos golpes."
            },
            {
                type: "character",
                name: "KAEL DRAVEN",
                role: "FERREIRO DE CÓDIGO",
                cssClass: "kael",
                text: "Um vetor não é apenas uma posição: ele expressa uma <strong>direção</strong> e uma <strong>magnitude</strong>! Para saber a que distância um monstro está, usamos a distância euclidiana com <code>Vector3.Distance(a, b)</code>."
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "ARTÍFICE",
                cssClass: "mira",
                text: "E quando queremos apenas a pura direção sem interferência do tamanho, nós o normalizamos com <code>Vector3.Normalize()</code>. Já o Produto Escalar (<code>Vector3.Dot</code>) revela se um alvo está na frente ou atrás de nós, enquanto o Produto Vetorial (<code>Vector3.Cross</code>) calcula a normal perpendicular perfeita para superfícies e reflexos!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Radars de proximidade e inteligência artificial dependem diretamente dessas quatro operações vetoriais. Execute as 5 atividades deste capítulo com maestria geométrica."
            }
        ],
        concept: {
            title: "ÁLGEBRA VETORIAL 3D: DISTÂNCIA EUCLIDIANA, NORMALIZAÇÃO, DOT PRODUCT E CROSS PRODUCT",
            explanation: `Operações com vetores são essenciais para física, mira e inteligência artificial no Unity:
<ul>
  <li><strong>Distância Euclidiana (<code>Vector3.Distance</code>):</strong> Calcula o comprimento da linha reta entre dois pontos 3D no espaço (ex: entre <code>(0,0,0)</code> e <code>(3,4,0)</code> resulta em distância 5: <code>Debug.Log("Distancia: " + dist);</code>).</li>
  <li><strong>Normalização de Vetor (<code>Vector3.Normalize</code>):</strong> Transforma o vetor em um vetor unitário de comprimento igual a 1, preservando sua direção original (ex: normalizar <code>(5,0,0)</code> resulta em <code>dir.x = 1</code>).</li>
  <li><strong>Produto Escalar (<code>Vector3.Dot</code>):</strong> Multiplica dois vetores resultando em um escalar numérico. Se forem vetores unitários apontando na mesma direção (ex: <code>Vector3.forward</code> e <code>Vector3.forward</code>), o resultado é 1 (alinhamento total). Se forem perpendiculares, é 0; se opostos, é -1.</li>
  <li><strong>Produto Vetorial (<code>Vector3.Cross</code>):</strong> Gera um terceiro vetor perpendicular a ambos os vetores de entrada (ex: o produto vetorial entre <code>Vector3.right</code> (eixo X) e <code>Vector3.up</code> (eixo Y) gera a normal apontando no eixo Z: <code>Vector3.forward</code>).</li>
  <li><strong>Radar de Proximidade:</strong> Compara a distância calculada contra um raio de detecção (ex: se distância for menor que 10 metros, exibe <code>"Alvo no Radar: 8m"</code>).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploAlgebraVetorial : MonoBehaviour
{
    void Start()
    {
        // 1. Distância euclidiana entre dois pontos (3-4-5 triângulo clássico)
        Vector3 a = new Vector3(0, 0, 0);
        Vector3 b = new Vector3(3, 4, 0);
        float dist = Vector3.Distance(a, b);
        Debug.Log("Distancia: " + dist);

        // 2. Normalização de vetor para direção pura
        Vector3 dir = new Vector3(5, 0, 0);
        Vector3 norm = Vector3.Normalize(dir);
        Debug.Log("Dir X: " + norm.x);

        // 3. Produto escalar (Vector3.Dot) para alinhamento de visão
        Vector3 frente = Vector3.forward;
        Vector3 alvo = Vector3.forward;
        float dot = Vector3.Dot(frente, alvo);
        Debug.Log("Alinhamento: " + dot);

        // 4. Produto vetorial (Vector3.Cross) para normal perpendicular
        Vector3 direito = Vector3.right;
        Vector3 cima = Vector3.up;
        Vector3 cross = Vector3.Cross(direito, cima);
        Debug.Log("Normal Z: " + cross.z);

        // 5. Radar de proximidade
        Vector3 posPlayer = Vector3.zero;
        Vector3 posInimigo = new Vector3(0, 0, 8);
        float distRadar = Vector3.Distance(posPlayer, posInimigo);
        if (distRadar < 10)
        {
            Debug.Log("Alvo no Radar: 8m");
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Radar de Batalha e Alinhamento de Visão",
            code: `using UnityEngine;

public class CalculosCombate3D : MonoBehaviour
{
    void Start()
    {
        Vector3 p1 = Vector3.zero;
        Vector3 p2 = new Vector3(3, 4, 0);
        float d = Vector3.Distance(p1, p2);
        Debug.Log("Distancia: " + d);

        Vector3 v = new Vector3(5, 0, 0);
        Vector3 n = Vector3.Normalize(v);
        Debug.Log("Dir X: " + n.x);

        float dot = Vector3.Dot(Vector3.forward, Vector3.forward);
        Debug.Log("Alinhamento: " + dot);

        Vector3 c = Vector3.Cross(Vector3.right, Vector3.up);
        Debug.Log("Normal Z: " + c.z);

        float radar = Vector3.Distance(Vector3.zero, new Vector3(0, 0, 8));
        if (radar < 10) Debug.Log("Alvo no Radar: 8m");
    }
}`,
            output: `Distancia: 5
Dir X: 1
Alinhamento: 1
Normal Z: 1
Alvo no Radar: 8m`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 15 — PLANOS 3D E RAYCASTING
    // ═══════════════════════════════════════════════════════
    15: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Inicializando o Feixe Ocular Físico. Módulo de Raycasting e Projeções Geométricas ativado."
            },
            {
                type: "narrative",
                text: "Feixes laser invisíveis e arcos de detecção partem das mãos de Mira Solenn, mapeando a distância exata de cada obstáculo e superfície da masmorra."
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "CARTÓGRAFA & ARTÍFICE",
                cssClass: "mira",
                text: "Raycasting é como disparar um raio laser geométrico instantâneo! Usamos <code>Physics.Raycast</code> para saber onde uma bala acertou, se o pé do herói toca o chão ou se há uma parede bloqueando a visão do monstro."
            },
            {
                type: "character",
                name: "KAEL DRAVEN",
                role: "FERREIRO DE CÓDIGO",
                cssClass: "kael",
                text: "O raio retorna um recipiente chamado <code>RaycastHit</code> contendo a distância de impacto, o ponto exato da colisão e a etiqueta da superfície atingida (como 'Chao'). E para não acertar moedas ou o próprio herói, filtramos os alvos com máscaras de camada: <code>LayerMask</code>!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Definir alcances máximos de detecção evita processamento desnecessário na engine de física. Domine os parâmetros de Physics.Raycast neste capítulo."
            }
        ],
        concept: {
            title: "RAYCASTING NO UNITY: DISPARO FÍSICO, RAYCASTHIT, ALCANCE E LAYERMASKS",
            explanation: `Raycasting projeta uma linha geométrica através da simulação física para detectar colisores:
<ul>
  <li><strong>Disparo de Raycast Físico (<code>Physics.Raycast</code>):</strong> Recebe uma origem, uma direção e uma distância máxima: <code>Physics.Raycast(Vector3.zero, Vector3.forward, 10f);</code>. Retorna <code>true</code> se atingir qualquer colisor.</li>
  <li><strong>Alcance Máximo:</strong> Limita o comprimento do raio, economizando desempenho ao evitar varreduras infinitas (ex: <code>float alcanceMax = 25.0f;</code> emitindo <code>"Alcance do Raio: 25 metros"</code>).</li>
  <li><strong>Identificação de Objeto Atingido (<code>RaycastHit</code>):</strong> Quando há impacto, obtemos os dados da superfície (ex: verificar se <code>tagAtingida == "Chao"</code> para confirmar impacto no solo).</li>
  <li><strong>Máscaras de Camada (<code>LayerMask</code>):</strong> Permite que o raio interaja somente com certas camadas físicas da cena (ex: camada de inimigos <code>layerInimigo = 8</code>), ignorando gatilhos e o próprio jogador.</li>
  <li><strong>Ponto e Distância de Impacto:</strong> O struct <code>RaycastHit.distance</code> informa exatamente quão longe o impacto aconteceu (ex: <code>"Impacto a 4.2 metros"</code>).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploRaycasting : MonoBehaviour
{
    void Start()
    {
        // 1. Disparo de raio físico no espaço
        bool acertou = Physics.Raycast(Vector3.zero, Vector3.forward, 10f);
        Debug.Log("Raio Disparado: " + acertou);

        // 2. Configuração de alcance máximo
        float alcanceMax = 25.0f;
        Debug.Log("Alcance do Raio: " + alcanceMax + " metros");

        // 3. Checagem da superfície atingida (RaycastHit)
        string tagAtingida = "Chao";
        if (tagAtingida == "Chao")
        {
            Debug.Log("Impacto no Solo Confirmado");
        }

        // 4. Máscara de camada para filtragem
        int layerInimigo = 8;
        Debug.Log("Mascara de Camada Ativa: " + layerInimigo);

        // 5. Medição da distância de impacto
        float distHit = 4.2f;
        Debug.Log("Impacto a " + distHit + " metros");
    }
}`
        },
        example: {
            title: "Exemplo Prático — Sistema de Sensor Óptico de Solo e Parede",
            code: `using UnityEngine;

public class SensorRaycast : MonoBehaviour
{
    void Start()
    {
        bool hit = Physics.Raycast(Vector3.zero, Vector3.forward, 10f);
        Debug.Log("Raio Disparado: " + hit);

        float alcance = 25.0f;
        Debug.Log("Alcance do Raio: " + alcance + " metros");

        string tag = "Chao";
        if (tag == "Chao") Debug.Log("Impacto no Solo Confirmado");

        int layer = 8;
        Debug.Log("Mascara de Camada Ativa: " + layer);

        float dist = 4.2f;
        Debug.Log("Impacto a " + dist + " metros");
    }
}`,
            output: `Raio Disparado: True
Alcance do Raio: 25 metros
Impacto no Solo Confirmado
Mascara de Camada Ativa: 8
Impacto a 4.2 metros`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 16 — RIGIDBODY E FÍSICA 3D
    // ═══════════════════════════════════════════════════════
    16: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Entrando no Módulo 5 — Física 3D. Motor dinâmico de corpos rígidos ativado."
            },
            {
                type: "narrative",
                text: "Blocos de granito e bigornas ganham massa, aceleração e gravidade sob o olhar atento de Kael Draven. O atrito e as forças newtonianas assumem o comando."
            },
            {
                type: "character",
                name: "KAEL DRAVEN",
                role: "FERREIRO DE CÓDIGO",
                cssClass: "kael",
                text: "Quando queremos que um objeto seja governado por gravidade, impulsos e inércia real, anexamos a ele o componente <strong>Rigidbody</strong>! Jamais mova um corpo físico alterando o transform.position diretamente — você destruirá a simulação!"
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Para dar um salto ou empurrão explosivo, aplicamos forças com <code>AddForce()</code>. No Unity 6.5, a velocidade direta é manipulada através de <code>linearVelocity</code>, e podemos ligar ou desligar a gravidade com a chave booleana <code>useGravity</code>."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Lembre-se sempre de que toda manipulação de Rigidbody deve ocorrer no método <code>FixedUpdate()</code> para manter a física matematicamente estável."
            }
        ],
        concept: {
            title: "O COMPONENTE RIGIDBODY: MASSA, FORÇAS, LINEARVELOCITY E GRAVIDADE NO UNITY 6.5",
            explanation: `O <code>Rigidbody</code> entrega uma entidade ao motor de física PhysX:
<ul>
  <li><strong>Massa (<code>mass</code>):</strong> Define a inércia do objeto em quilogramas (ex: <code>float massaObjeto = 5.0f;</code> emitindo <code>"Massa do Rigidbody: 5kg"</code>). Corpos mais pesados requerem maiores forças para acelerar.</li>
  <li><strong>Aplicação de Impulso (<code>AddForce</code>):</strong> Adiciona uma força física vetorial empurrando o objeto na direção informada (ex: impulso vertical com <code>Vector3.up * 10f</code> emitindo <code>"Forca Aplicada com AddForce"</code>).</li>
  <li><strong>Velocidade Linear (<code>linearVelocity</code>):</strong> No Unity 6.5, a propriedade <code>linearVelocity</code> substitui a antiga <code>velocity</code> para leitura e ajuste direto da velocidade em metros por segundo (ex: <code>float velLinear = 12.5f;</code>).</li>
  <li><strong>Controle de Gravidade (<code>useGravity</code>):</strong> Define se o objeto sofre a atração natural do mundo físico (ex: <code>bool gravidadeAtiva = true;</code> emitindo <code>"Gravidade Ativa: True"</code>).</li>
  <li><strong>Amortecimento de Arrasto (Drag):</strong> Coeficiente de atrito com o ar que desacelera o objeto suavemente com o tempo.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploRigidbody : MonoBehaviour
{
    void Start()
    {
        // 1. Configuração de massa inercial
        float massaObjeto = 5.0f;
        Debug.Log("Massa do Rigidbody: " + massaObjeto + "kg");

        // 2. Aplicação de força de impulso
        Debug.Log("Forca Aplicada com AddForce");

        // 3. Velocidade linear no Unity 6.5
        float velLinear = 12.5f;
        Debug.Log("Velocidade Linear: " + velLinear + " m/s");

        // 4. Controle booleano da gravidade
        bool gravidadeAtiva = true;
        Debug.Log("Gravidade Ativa: " + gravidadeAtiva);

        // 5. Coeficiente de arrasto (drag)
        float arrasto = 0.5f;
        Debug.Log("Arrasto Linear: " + arrasto);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Controlador Físico de Projétil",
            code: `using UnityEngine;

public class ProjetilFisico : MonoBehaviour
{
    void Start()
    {
        float m = 5.0f;
        Debug.Log("Massa do Rigidbody: " + m + "kg");

        Debug.Log("Forca Aplicada com AddForce");

        float vel = 12.5f;
        Debug.Log("Velocidade Linear: " + vel + " m/s");

        bool grav = true;
        Debug.Log("Gravidade Ativa: " + grav);

        float drag = 0.5f;
        Debug.Log("Arrasto Linear: " + drag);
    }
}`,
            output: `Massa do Rigidbody: 5kg
Forca Aplicada com AddForce
Velocidade Linear: 12.5 m/s
Gravidade Ativa: True
Arrasto Linear: 0.5`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 17 — COLISÕES E TRIGGERS
    // ═══════════════════════════════════════════════════════
    17: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Inicializando a Intersecção de Malhas Físicas. Colisões sólidas e Gatilhos Triggers ativos."
            },
            {
                type: "narrative",
                text: "Arkan Velor conjura escudos e campos de força. Alguns repelem projéteis com estrondo metálico; outros deixam itens arcanos serem absorvidos suavemente."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "No Unity existem dois tipos fundamentais de contato físico: **Colisões Sólidas**, que impedem objetos de se atravessarem e disparam <code>OnCollisionEnter</code>, e **Gatilhos (Triggers)**, que agem como zonas fantasmas e disparam <code>OnTriggerEnter</code>!"
            },
            {
                type: "character",
                name: "KAEL DRAVEN",
                role: "FERREIRO DE CÓDIGO",
                cssClass: "kael",
                text: "Gatilhos são perfeitos para coletar moedas, abrir portas automáticas ou ativar checkpoints sem barrar a passagem do herói. E para saber quem entrou no gatilho, filtramos com <code>CompareTag('Inimigo')</code> ou <code>tag == 'Player'</code>!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Para que colisões ou triggers funcionem, ao menos uma das entidades participantes deve possuir um componente Rigidbody. Pratique as detecções neste capítulo."
            }
        ],
        concept: {
            title: "SISTEMA DE COLISÕES DO UNITY: ONCOLLISIONENTER VS ONTRIGGERENTER E FILTRAGEM POR TAG",
            explanation: `A intersecção de volumes colensores dita as reações de combate e exploração:
<ul>
  <li><strong>Colisão Sólida (<code>OnCollisionEnter</code>):</strong> Ocorre quando dois colisores sólidos se chocam, gerando impacto físico e impedindo a transposição (ex: receber um impacto sólido de espada).</li>
  <li><strong>Gatilho de Zona (<code>OnTriggerEnter</code>):</strong> Quando a opção <code>Is Trigger</code> do Collider está ativada, o objeto torna-se intangível. Objetos podem atravessá-lo, disparando eventos sem reação física contrária.</li>
  <li><strong>Coleta de Itens por Gatilho:</strong> É a mecânica clássica de absorver moedas, poções ou entrar em zonas de dano periódico (ex: <code>"Moeda Coletada via Trigger"</code>).</li>
  <li><strong>Filtragem por Tag (<code>CompareTag</code>):</strong> Garante que apenas o alvo correto ative a reação (ex: verificar se a tag é "Inimigo" antes de aplicar dano).</li>
  <li><strong>Resolução de Pontos de Contato:</strong> A estrutura <code>Collision</code> fornece informações detalhadas sobre a velocidade do choque e os pontos normais de contato na malha.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploColisoesTriggers : MonoBehaviour
{
    // Simulação do evento de colisão sólida
    void OnCollisionEnter(Collision collision)
    {
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");
    }

    // Simulação do evento de gatilho intangível
    void OnTriggerEnter(Collider other)
    {
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");
    }

    void Start()
    {
        // 1. Detecção de colisão sólida
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");

        // 2. Detecção de gatilho intangível
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");

        // 3. Coleta de item por trigger
        Debug.Log("Moeda Coletada via Trigger");

        // 4. Filtragem por tag de objeto
        string tagColisor = "Inimigo";
        if (tagColisor == "Inimigo")
        {
            Debug.Log("Contato com Inimigo Confirmado");
        }

        // 5. Total de colisores no gatilho
        int totalColisores = 1;
        Debug.Log("Colisores Ativos: " + totalColisores);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Reações Físicas de Contato e Coleta",
            code: `using UnityEngine;

public class GerenciadorColisoes : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Colisao Solida: OnCollisionEnter disparado");
        Debug.Log("Gatilho de Zona: OnTriggerEnter disparado");
        Debug.Log("Moeda Coletada via Trigger");

        string tag = "Inimigo";
        if (tag == "Inimigo") Debug.Log("Contato com Inimigo Confirmado");

        int ativos = 1;
        Debug.Log("Colisores Ativos: " + ativos);
    }
}`,
            output: `Colisao Solida: OnCollisionEnter disparado
Gatilho de Zona: OnTriggerEnter disparado
Moeda Coletada via Trigger
Contato com Inimigo Confirmado
Colisores Ativos: 1`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 18 — CÂMERA 3ª PESSOA (CINEMACHINE)
    // ═══════════════════════════════════════════════════════
    18: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Entrando no Módulo 6 — Câmeras. Suíte Cinemachine e Câmeras Virtuais ativadas."
            },
            {
                type: "narrative",
                text: "Lentes etéreas orbitam o campo de treinamento da guilda. Lyra Nex ajusta distâncias focais e curvas de amortecimento para enquadrar a ação perfeitamente."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "No passado, programadores passavam semanas escrevendo códigos de câmera com matemática complexa. Hoje, o pacote oficial **Cinemachine** do Unity gerencia Câmeras Virtuais (vcam) de forma inteligente e cinematográfica!"
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA",
                cssClass: "elion",
                text: "Configuramos o alvo do jogador com o <code>Follow Target</code> e definimos a distância orbital (como 5.0m). Para que a câmera não trema abruptamente quando o herói correr, aplicamos o amortecimento suave chamado <strong>Damping</strong>!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "A transição entre diferentes câmeras virtuais (como alternar de exploração para uma cutscene de boss) ocorre de forma fluida e automática pelo Cinemachine Brain. Complete as atividades para dominar a visão em 3ª pessoa."
            }
        ],
        concept: {
            title: "CINEMACHINE NO UNITY: CÂMERAS VIRTUAIS, FOLLOW TARGET, DAMPING E TRANSIÇÕES",
            explanation: `Cinemachine gerencia as lentes e pontos de vista do jogo através de Câmeras Virtuais:
<ul>
  <li><strong>Alvo de Acompanhamento (Follow Target):</strong> Aponta qual Transform a câmera deve seguir pelo cenário: <code>string alvoSeguido = "Heroi";</code> emitindo <code>"Cinemachine: Seguindo Heroi"</code>.</li>
  <li><strong>Distância Orbital da Câmera:</strong> Define o raio do orbitador em metros que separa a câmera do personagem (ex: <code>float distanciaOrbital = 5.0f;</code> emitindo <code>"Distancia da Camera: 5m"</code>).</li>
  <li><strong>Amortecimento Suave (Damping):</strong> Coeficiente que suaviza a resposta da câmera aos movimentos rápidos do herói, evitando solavancos na tela (ex: <code>float damping = 0.5f;</code>).</li>
  <li><strong>Transição entre Câmeras (Blend):</strong> O Cinemachine Brain interpola a posição e o ângulo suavemente quando alternamos entre câmeras virtuais (ex: <code>"Transicao Suave: 1.5s"</code>).</li>
  <li><strong>Prioridade de Câmera:</strong> A câmera virtual com maior valor numérico de Priority assume o controle da visão do jogador instantaneamente.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploCinemachine : MonoBehaviour
{
    void Start()
    {
        // 1. Configuração do alvo de seguimento
        string alvo = "Heroi";
        Debug.Log("Cinemachine: Seguindo " + alvo);

        // 2. Ajuste de distância orbital
        float dist = 5.0f;
        Debug.Log("Distancia da Camera: " + dist + "m");

        // 3. Fator de amortecimento (Damping)
        float damping = 0.5f;
        Debug.Log("Damping Suave: " + damping);

        // 4. Tempo de transição entre câmeras virtuais
        float tempoBlend = 1.5f;
        Debug.Log("Transicao Suave: " + tempoBlend + "s");

        // 5. Prioridade de ativação da lente
        int prioridade = 10;
        Debug.Log("Prioridade da VCam: " + prioridade);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Configuração de Câmera Virtual em Terceira Pessoa",
            code: `using UnityEngine;

public class Camera3rdPerson : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Cinemachine: Seguindo Heroi");

        float d = 5.0f;
        Debug.Log("Distancia da Camera: " + d + "m");

        float damp = 0.5f;
        Debug.Log("Damping Suave: " + damp);

        float blend = 1.5f;
        Debug.Log("Transicao Suave: " + blend + "s");

        int prio = 10;
        Debug.Log("Prioridade da VCam: " + prio);
    }
}`,
            output: `Cinemachine: Seguindo Heroi
Distancia da Camera: 5m
Damping Suave: 0.5
Transicao Suave: 1.5s
Prioridade da VCam: 10`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 19 — CÂMERA 1ª PESSOA (FPS LOOK)
    // ═══════════════════════════════════════════════════════
    19: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Calibrando a Visão em Primeira Pessoa. Mecanismo de Mouse Look e Pitch Clamp ativado."
            },
            {
                type: "narrative",
                text: "A perspectiva muda para dentro do elmo de combate. Elion Raven configura a rotação ocular direta e o travamento do cursor na tela."
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA & ANALISTA",
                cssClass: "elion",
                text: "Em jogos de tiro e exploração em primeira pessoa (FPS), o mouse dita para onde olhamos. A primeira regra é travar o cursor no centro da tela com <code>Cursor.lockState = CursorLockMode.Locked;</code> para que a seta do mouse não escape da janela!"
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "A rotação horizontal gira o corpo inteiro do personagem no eixo Y. Já a rotação vertical (olhar para cima e para baixo) gira apenas os olhos e precisa ser limitada entre -80° e +80° com <code>Mathf.Clamp</code>, para evitar que o pescoço do jogador dê uma volta de 360°!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Ajustar o Campo de Visão (Field of View / FOV) é o toque final de imersão, permitindo simular zoom ao mirar (como reduzir o FOV de 60 para 40). Domine a mecânica de FPS neste capítulo."
            }
        ],
        concept: {
            title: "CÂMERA FPS: SENSIBILIDADE DO MOUSE, CURSOR LOCK, CLAMP VERTICAL E CAMPO DE VISÃO (FOV)",
            explanation: `O controle de câmera em primeira pessoa divide a rotação em dois eixos independentes:
<ul>
  <li><strong>Sensibilidade do Mouse:</strong> Multiplicador que calibra a velocidade com que o movimento do mouse se converte em graus de giro (ex: <code>float sensibilidade = 2.5f;</code>).</li>
  <li><strong>Trava de Cursor (Cursor.lockState):</strong> Oculta e trava o ponteiro no centro da tela para navegação contínua (ex: emitir <code>"Cursor Travado no Centro"</code>).</li>
  <li><strong>Limite de Rotação Vertical (Clamp Pitch):</strong> Trava a inclinação vertical entre valores mínimos e máximos (ex: -80° e +80°) com <code>Mathf.Clamp</code>, impedindo inversão visual estranha.</li>
  <li><strong>Rotação Horizontal do Corpo:</strong> O movimento horizontal do mouse aplica rotação diretamente ao Transform do corpo do personagem (ex: girar 15 graus no eixo Y).</li>
  <li><strong>Campo de Visão (Field of View / FOV):</strong> Determina a amplitude angular da lente da câmera. Ao mirar (<code>bool mirando = true</code>), reduzir o FOV (ex: de 60 para 40) cria o clássico efeito de aproximação óptica/zoom.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploFPSLook : MonoBehaviour
{
    void Start()
    {
        // 1. Sensibilidade do mouse
        float sensibilidade = 2.5f;
        Debug.Log("Sensibilidade do Mouse: " + sensibilidade);

        // 2. Trava do cursor
        Debug.Log("Cursor Travado no Centro");

        // 3. Limite vertical (Clamp)
        float limiteVertical = 80.0f;
        Debug.Log("Limite Vertical Clamp: " + limiteVertical + " graus");

        // 4. Giro horizontal do corpo
        float mouseX = 15.0f;
        Debug.Log("Giro Horizontal do Corpo: " + mouseX + " graus");

        // 5. Ajuste de Campo de Visão (FOV) ao mirar
        int fov = 60;
        bool mirando = true;
        if (mirando)
        {
            fov = 40;
            Debug.Log("FOV Atual: " + fov);
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Controlador de Visão FPS com Zoom de Mira",
            code: `using UnityEngine;

public class FPSLookController : MonoBehaviour
{
    void Start()
    {
        float sens = 2.5f;
        Debug.Log("Sensibilidade do Mouse: " + sens);

        Debug.Log("Cursor Travado no Centro");

        float clamp = 80.0f;
        Debug.Log("Limite Vertical Clamp: " + clamp + " graus");

        float rotX = 15.0f;
        Debug.Log("Giro Horizontal do Corpo: " + rotX + " graus");

        int fov = 60;
        bool aim = true;
        if (aim) fov = 40;
        Debug.Log("FOV Atual: " + fov);
    }
}`,
            output: `Sensibilidade do Mouse: 2.5
Cursor Travado no Centro
Limite Vertical Clamp: 80 graus
Giro Horizontal do Corpo: 15 graus
FOV Atual: 40`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 20 — GEOMETRIAS 3D E MESHES
    // ═══════════════════════════════════════════════════════
    20: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Entrando no Módulo 7 — Mundo 3D. Topologia poligonal e malhas 3D sincronizadas."
            },
            {
                type: "narrative",
                text: "Estruturas de arame (wireframes) desenham-se no ar como constelações geométricas. Orin Vale esculpe vértices e triângulos de luz pura."
            },
            {
                type: "character",
                name: "ORIN VALE",
                role: "EXPLORADOR DE CENÁRIOS",
                cssClass: "orin",
                text: "Tudo o que você enxerga em um jogo tridimensional — um monstro, uma rocha ou uma espada — é uma **Mesh**! Uma malha é formada por vértices no espaço, triângulos que ligam esses vértices e coordenadas de textura chamadas UVs."
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "CARTÓGRAFA & ARTÍFICE",
                cssClass: "mira",
                text: "Em computação gráfica, placas quadradas (quads) não existem na GPU: cada quad é obrigatoriamente formado por 2 triângulos! Um cubo simples de 6 faces, por exemplo, é composto por exatamente 12 triângulos poligonais."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Para que a iluminação reaja corretamente sobre a superfície, calculamos as normais da malha com <code>RecalculateNormals()</code>. Aprenda como a geometria 3D se estrutura neste capítulo."
            }
        ],
        concept: {
            title: "ANATOMIA DE UMA MESH 3D: VÉRTICES, TRIÂNGULOS, UV MAPPING E RECÁLCULO DE NORMAIS",
            explanation: `Uma <code>Mesh</code> é a estrutura geométrica básica renderizada pela GPU:
<ul>
  <li><strong>Vértices (<code>vertices</code>):</strong> Conjunto de pontos 3D que definem as pontas da geometria (ex: um cubo possui 24 vértices para preservar arestas afiadas).</li>
  <li><strong>Triângulos (<code>triangles</code>):</strong> Índices de vértices agrupados de 3 em 3. Cada face quadrada (quad) é formada por 2 triângulos. Um cubo de 6 faces requer <code>6 * 2 = 12</code> triângulos.</li>
  <li><strong>Mapeamento UV (<code>uv</code>):</strong> Coordenadas bidimensionais normalizadas de 0 a 1 que mapeiam a textura 2D sobre a malha 3D (ex: o centro da textura é <code>Vector2(0.5f, 0.5f)</code>).</li>
  <li><strong>Recálculo de Normais (<code>RecalculateNormals</code>):</strong> As normais são vetores perpendiculares a cada vértice que dizem para qual direção a superfície está virada, essencial para o cálculo de luz e sombras.</li>
  <li><strong>Submeshes e Draw Calls:</strong> Malhas divididas em múltiplas sub-partes consomem mais draw calls; unificar geometrias em uma submesh única otimiza o desempenho.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploMeshes : MonoBehaviour
{
    void Start()
    {
        // 1. Contagem de vértices da malha
        int totalVertices = 24;
        Debug.Log("Vertices da Malha: " + totalVertices);

        // 2. Cálculo de triângulos para um cubo (6 faces * 2 triângulos)
        int facesCubo = 6;
        int totalTriangulos = facesCubo * 2;
        Debug.Log("Total Triangulos: " + totalTriangulos);

        // 3. Coordenada UV de textura
        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");

        // 4. Recálculo de normais da geometria
        string statusNormais = "Normais Recalculadas com Sucesso";
        Debug.Log(statusNormais);

        // 5. Verificação de submeshes otimizadas
        int submeshes = 1;
        if (submeshes == 1)
        {
            Debug.Log("Malha Otimizada: Draw Call Unico");
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Inspeção de Dados de Geometria Tridimensional",
            code: `using UnityEngine;

public class InspecaoMesh : MonoBehaviour
{
    void Start()
    {
        int v = 24;
        Debug.Log("Vertices da Malha: " + v);

        int t = 6 * 2;
        Debug.Log("Total Triangulos: " + t);

        Vector2 uv = new Vector2(0.5f, 0.5f);
        Debug.Log("Centro UV: (" + uv.x + ", " + uv.y + ")");

        Debug.Log("Normais Recalculadas com Sucesso");

        int sub = 1;
        if (sub == 1) Debug.Log("Malha Otimizada: Draw Call Unico");
    }
}`,
            output: `Vertices da Malha: 24
Total Triangulos: 12
Centro UV: (0.5, 0.5)
Normais Recalculadas com Sucesso
Malha Otimizada: Draw Call Unico`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 21 — TERRENO E VEGETAÇÃO
    // ═══════════════════════════════════════════════════════
    21: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Carregando o Módulo de Relevo e Biomas. Sistema de Terreno e Vegetação instanciado."
            },
            {
                type: "narrative",
                text: "Montanhas colossais, colinas verdejantes e florestas densas erguem-se a partir do piso dimensional. Mira Solenn pinta texturas de solo e espalha árvores com pincéis arcanos."
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "CARTÓGRAFA & ARTÍFICE",
                cssClass: "mira",
                text: "O componente **Terrain** do Unity permite criar mundos imensos sem modelar tudo no Blender! A elevação das montanhas é guiada por um mapa de alturas chamado <code>Heightmap</code>, que diz a elevação vertical exata em cada ponto."
            },
            {
                type: "character",
                name: "ORIN VALE",
                role: "EXPLORADOR DE CENÁRIOS",
                cssClass: "orin",
                text: "Para que uma floresta com milhares de árvores e grama não trave o jogo, o motor utiliza instanciamento em lote na GPU e define distâncias de corte (Detail Distance), renderizando pequenos arbustos somente perto do herói!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Camadas de pintura de solo (Splatmaps) misturam terra, rocha e grama de acordo com a inclinação do terreno. Complete as atividades para dominar a construção de biomas."
            }
        ],
        concept: {
            title: "O SISTEMA DE TERRENOS DO UNITY: DIMENSÕES, HEIGHTMAPS, VEGETAÇÃO E SPLATMAPS",
            explanation: `O sistema de <code>Terrain</code> do Unity é otimizado para gerar relevos massivos em tempo real:
<ul>
  <li><strong>Dimensões do Terreno:</strong> Define a área plana em metros quadrados abrangida pelo mapa (ex: <code>int tamanhoTerreno = 500;</code> emitindo <code>"Area do Terreno: 500x500m"</code>).</li>
  <li><strong>Leitura de Altura (Heightmap):</strong> A elevação Y do terreno em uma coordenada X/Z é amostrada a partir de uma matriz de alturas em tons de cinza (ex: elevação no ponto atingindo 24.5m).</li>
  <li><strong>Densidade de Vegetação e Árvores:</strong> Milhares de instâncias de árvores são renderizadas com billboarding e batching da GPU (ex: 1200 árvores instanciadas).</li>
  <li><strong>Distância de Desenho de Detalhes (Detail Distance):</strong> Raio esférico em metros a partir da câmera além do qual a grama 3D deixa de ser desenhada para economizar taxa de quadros (ex: 80 metros).</li>
  <li><strong>Pintura de Camadas (Splatmap):</strong> Camadas de textura (ex: 'Grama_Rochosa') que misturam diferentes materiais na superfície do terreno.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploTerrenos : MonoBehaviour
{
    void Start()
    {
        // 1. Dimensões da área de terreno
        int tamanhoTerreno = 500;
        Debug.Log("Area do Terreno: " + tamanhoTerreno + "x" + tamanhoTerreno + "m");

        // 2. Altura calculada pelo heightmap
        float alturaY = 24.5f;
        Debug.Log("Elevacao no Ponto: " + alturaY + "m");

        // 3. Contagem de árvores instanciadas
        int totalArvores = 1200;
        Debug.Log("Instancias de Arvores: " + totalArvores);

        // 4. Distância de corte de detalhes e grama
        int distanciaDetalhes = 80;
        Debug.Log("Distancia de Detalhes: " + distanciaDetalhes + "m");

        // 5. Camada ativa de textura do relevo
        string camadaAtiva = "Grama_Rochosa";
        Debug.Log("Camada de Textura: " + camadaAtiva);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Configuração de Bioma e Vegetação",
            code: `using UnityEngine;

public class BiomaController : MonoBehaviour
{
    void Start()
    {
        int area = 500;
        Debug.Log("Area do Terreno: " + area + "x" + area + "m");

        float h = 24.5f;
        Debug.Log("Elevacao no Ponto: " + h + "m");

        int arvores = 1200;
        Debug.Log("Instancias de Arvores: " + arvores);

        int d = 80;
        Debug.Log("Distancia de Detalhes: " + d + "m");

        Debug.Log("Camada de Textura: Grama_Rochosa");
    }
}`,
            output: `Area do Terreno: 500x500m
Elevacao no Ponto: 24.5m
Instancias de Arvores: 1200
Distancia de Detalhes: 80m
Camada de Textura: Grama_Rochosa`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 22 — ILUMINAÇÃO, APV E POST-PROCESSING
    // ═══════════════════════════════════════════════════════
    22: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Calibrando o Pipeline de Renderização Universal (URP). Iluminação global, APV e pós-processamento ativados."
            },
            {
                type: "narrative",
                text: "Feixes de luz dourada atravessam vitrais góticos. Sombras suaves desenham o relevo enquanto um brilho etéreo (bloom) envolve cristais de mana."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "A iluminação é a alma da atmosfera de um jogo! Uma **Directional Light** simula a luz do sol infinito projetando sombras suaves em tempo real com <code>SoftShadows</code>."
            },
            {
                type: "character",
                name: "ORIN VALE",
                role: "EXPLORADOR DE CENÁRIOS",
                cssClass: "orin",
                text: "No Unity moderno, o novo sistema de **Adaptive Probe Volumes (APV)** espalha milhares de sondas volumétricas de luz pela cena, iluminando personagens em movimento com precisão de iluminação global. E os volumes de **Post-Processing** adicionam efeitos cinematográficos como Bloom e Vinheta!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "O efeito Bloom faz superfícies luminosas transbordarem brilho nos olhos do jogador, enquanto o Color Grading dita o tom emocional da narrativa. Pratique esses parâmetros vitais."
            }
        ],
        concept: {
            title: "ILUMINAÇÃO NO UNITY: LUZ DIRECIONAL, SOFT SHADOWS, ADAPTIVE PROBE VOLUMES E BLOOM",
            explanation: `A iluminação e o pós-processamento transformam modelos simples em uma cena rica e cinematográfica:
<ul>
  <li><strong>Intensidade da Luz Solar (Directional Light):</strong> Modela a luz emitida a uma distância infinita, medida em Lux (ex: <code>float intensidadeLuz = 1.2f;</code> emitindo <code>"Intensidade Solar: 1.2 Lux"</code>).</li>
  <li><strong>Sombras em Tempo Real:</strong> As sombras suaves (<code>SoftShadows</code>) filtram as bordas da penumbra, conferindo realismo à projeção de corpos sólidos.</li>
  <li><strong>Adaptive Probe Volumes (APV):</strong> A tecnologia moderna de iluminação global que distribui sondas de luz volumétricas adaptáveis na cena (ex: 250 probes gravadas).</li>
  <li><strong>Efeito Bloom de Pós-Processamento:</strong> Simula o transbordamento óptico de luz intensa na lente da câmera quando ativado (ex: <code>"Bloom Ativo com Intensidade: 0.8"</code>).</li>
  <li><strong>Vinheta Cinematográfica:</strong> Efeito visual que escurece suavemente os cantos da tela, focando o olhar do jogador no centro da ação (ex: intensidade 0.35).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploIluminacao : MonoBehaviour
{
    void Start()
    {
        // 1. Intensidade solar
        float intensidadeLuz = 1.2f;
        Debug.Log("Intensidade Solar: " + intensidadeLuz + " Lux");

        // 2. Tipo de sombra
        string tipoSombra = "SoftShadows";
        Debug.Log("Tipo de Sombra: " + tipoSombra);

        // 3. Sondas volumétricas de luz (APV)
        int totalProbes = 250;
        Debug.Log("Adaptive Probe Volumes: " + totalProbes + " probes");

        // 4. Efeito Bloom
        bool bloomAtivo = true;
        float intensidadeBloom = 0.8f;
        if (bloomAtivo)
        {
            Debug.Log("Bloom Ativo com Intensidade: " + intensidadeBloom);
        }

        // 5. Vinheta de pós-processamento
        float vinhetaIntensidade = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinhetaIntensidade);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Painel de Iluminação e Atmosfera Visual",
            code: `using UnityEngine;

public class AtmosferaURP : MonoBehaviour
{
    void Start()
    {
        float lux = 1.2f;
        Debug.Log("Intensidade Solar: " + lux + " Lux");

        Debug.Log("Tipo de Sombra: SoftShadows");

        int probes = 250;
        Debug.Log("Adaptive Probe Volumes: " + probes + " probes");

        bool bloom = true;
        if (bloom) Debug.Log("Bloom Ativo com Intensidade: 0.8");

        float vinheta = 0.35f;
        Debug.Log("Vinheta Cinematica: " + vinheta);
    }
}`,
            output: `Intensidade Solar: 1.2 Lux
Tipo de Sombra: SoftShadows
Adaptive Probe Volumes: 250 probes
Bloom Ativo com Intensidade: 0.8
Vinheta Cinematica: 0.35`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 23 — INTERFACE GRÁFICA (HUD E UI)
    // ═══════════════════════════════════════════════════════
    23: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Entrando no Módulo 8 — Interface e Sistemas. Canvas dimensional e TextMeshPro ativados."
            },
            {
                type: "narrative",
                text: "Displays holográficos semitransparentes flutuam diante da visão do jogador. Elion Raven programa barras de vida, indicadores de mana e contadores numéricos."
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA & ANALISTA",
                cssClass: "elion",
                text: "O **HUD (Heads-Up Display)** é o elo direto entre os dados internos do jogo e a mente do jogador! Em Unity, toda interface gráfica repousa sobre um componente **Canvas** e utiliza textos de alta definição renderizados pelo **TextMeshPro**."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Barras de mana e vida suaves utilizam a propriedade <code>fillAmount</code> variando de 0.0f a 1.0f (calculada como <code>manaAtual / manaMax</code>). Menus de pause são ativados com um booleano de visibilidade, e notificações rápidas em estilo Toast alertam ganhos de XP!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Para contadores numéricos (como moedas coletadas), formate textos com formatação numérica como <code>moedas.ToString('D4')</code> gerando números no estilo '0042'. Complete as 5 atividades de UI."
            }
        ],
        concept: {
            title: "SISTEMA DE UI DO UNITY: CANVAS, TEXTMESHPRO, BARRAS DE FILLAMOUNT E NOTIFICAÇÕES HUD",
            explanation: `A interface de usuário comunica atributos e estados em tempo real:
<ul>
  <li><strong>Texto TextMeshPro (TMP):</strong> Renderiza tipografia nítida baseada em Signed Distance Fields (SDF): <code>string texto = "HP: 100/100";</code> emitindo <code>"HUD Texto: HP: 100/100"</code>.</li>
  <li><strong>Preenchimento de Barras (<code>fillAmount</code>):</strong> Uma imagem do tipo Filled varia sua máscara entre 0.0 e 1.0 dividindo o valor atual pelo valor máximo: <code>float fill = manaAtual / 100.0f;</code> (ex: 75 de mana gera fill 0.75).</li>
  <li><strong>Visibilidade de Menus de Pausa:</strong> Paineis de interface alternam seu estado com base em um booleano (ex: <code>if (menuPausaAtivo) Debug.Log("Painel de Pausa Visivel");</code>).</li>
  <li><strong>Notificação Flutuante (Toast):</strong> Mensagens breves de conquista ou progresso exibidas na tela (ex: <code>"Toast Notificacao: +100 XP"</code>).</li>
  <li><strong>Formatação de Contadores Numéricos:</strong> Exibir números com dígitos fixos (ex: formatar 42 moedas como '0042' através de formatação de string).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploInterfaceUI : MonoBehaviour
{
    void Start()
    {
        // 1. Atualização de texto TextMeshPro
        string textoHp = "HP: 100/100";
        Debug.Log("HUD Texto: " + textoHp);

        // 2. Preenchimento de barra de mana (fillAmount)
        float manaAtual = 75.0f;
        float manaMax = 100.0f;
        float fill = manaAtual / manaMax;
        Debug.Log("Barra Fill: " + fill);

        // 3. Painel de pausa
        bool menuPausaAtivo = true;
        if (menuPausaAtivo)
        {
            Debug.Log("Painel de Pausa Visivel");
        }

        // 4. Notificação no HUD
        string notificacao = "+100 XP";
        Debug.Log("Toast Notificacao: " + notificacao);

        // 5. Contador de moedas formatado
        int moedas = 42;
        Debug.Log("Moedas Coletadas: 00" + moedas);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Atualizador Dinâmico do HUD de Batalha",
            code: `using UnityEngine;

public class HUDController : MonoBehaviour
{
    void Start()
    {
        Debug.Log("HUD Texto: HP: 100/100");

        float mAtual = 75.0f;
        float mMax = 100.0f;
        Debug.Log("Barra Fill: " + (mAtual / mMax));

        bool pause = true;
        if (pause) Debug.Log("Painel de Pausa Visivel");

        Debug.Log("Toast Notificacao: +100 XP");

        int c = 42;
        Debug.Log("Moedas Coletadas: 00" + c);
    }
}`,
            output: `HUD Texto: HP: 100/100
Barra Fill: 0.75
Painel de Pausa Visivel
Toast Notificacao: +100 XP
Moedas Coletadas: 0042`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 24 — SISTEMAS DE PARTÍCULAS (VFX)
    // ═══════════════════════════════════════════════════════
    24: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conjurando os Emissores de Energia e Fluidos. Sistema de Partículas (VFX) ativo."
            },
            {
                type: "narrative",
                text: "Faíscas ardentes, brasas incandescentes e labaredas mágicas explodem em sincronia. Mira Solenn molda sistemas de partículas com propriedades dinâmicas de emissão."
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "CARTÓGRAFA & ARTÍFICE",
                cssClass: "mira",
                text: "Quando uma espada colide com um escudo ou uma magia explode, o impacto visual é garantido pelo **Particle System**! Ele gera centenas de partículas microscópicas com controle total de tempo de vida e velocidade."
            },
            {
                type: "character",
                name: "KAEL DRAVEN",
                role: "FERREIRO DE CÓDIGO",
                cssClass: "kael",
                text: "Configuramos a taxa de emissão por segundo (<code>rateOverTime</code>), o tempo de vida (<code>lifetime</code>) antes de sumirem, e se o efeito deve rodar em looping contínuo (como uma tocha acesa) ou disparar uma única vez com <code>Play()</code> e <code>Stop()</code>!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Um bom efeito visual fornece o feedback tátil e cinestésico do combate. Domine o controle de emissão, loop e encerramento de VFX neste capítulo."
            }
        ],
        concept: {
            title: "SISTEMAS DE PARTÍCULAS NO UNITY: EMISSÃO, LIFETIME, TAXAS E CONTROLE DE REPRODUÇÃO",
            explanation: `O <code>ParticleSystem</code> do Unity gera efeitos visuais de magia, fogo, fumaça e faíscas:
<ul>
  <li><strong>Emissão de Impacto (<code>Play</code>):</strong> Dispara o nascimento do efeito visual (ex: <code>string efeito = "Faíscas de Impacto";</code> emitindo <code>"VFX Play: " + efeito</code>).</li>
  <li><strong>Taxa de Emissão (<code>emission.rateOverTime</code>):</strong> Quantidade de partículas geradas por segundo na simulação (ex: <code>int taxaEmissao = 50;</code> emitindo <code>"Taxa de Emissao: 50 particulas/s"</code>).</li>
  <li><strong>Tempo de Vida (<code>startLifetime</code>):</strong> Quantos segundos cada partícula individual sobrevive no espaço antes de desvanecer (ex: <code>float duracao = 2.5f;</code> emitindo <code>"Tempo de Vida: 2.5s"</code>).</li>
  <li><strong>Efeito em Loop Contínuo (<code>loop</code>):</strong> Propriedade booleana que mantém o emissor ativo indefinidamente (ex: tochas e auras).</li>
  <li><strong>Interrupção do Sistema (<code>Stop</code>):</strong> Encerra a geração de novas partículas, permitindo que as partículas já vivas se dissipem naturalmente no ar (ex: <code>"VFX Stop: Emissao Encerrada"</code>).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploParticulas : MonoBehaviour
{
    void Start()
    {
        // 1. Disparo de efeito de impacto
        string efeito = "Faíscas de Impacto";
        Debug.Log("VFX Play: " + efeito);

        // 2. Taxa de partículas por segundo
        int taxaEmissao = 50;
        Debug.Log("Taxa de Emissao: " + taxaEmissao + " particulas/s");

        // 3. Tempo de vida de cada partícula
        float duracao = 2.5f;
        Debug.Log("Tempo de Vida: " + duracao + "s");

        // 4. Estado de looping contínuo
        bool estaEmLoop = true;
        if (estaEmLoop)
        {
            Debug.Log("VFX em Execucao Continua");
        }

        // 5. Interrupção de emissão
        string statusVfx = "VFX Stop: Emissao Encerrada";
        Debug.Log(statusVfx);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Controlador de Efeito de Combate",
            code: `using UnityEngine;

public class VFXController : MonoBehaviour
{
    void Start()
    {
        Debug.Log("VFX Play: Faíscas de Impacto");

        int taxa = 50;
        Debug.Log("Taxa de Emissao: " + taxa + " particulas/s");

        float vida = 2.5f;
        Debug.Log("Tempo de Vida: " + vida + "s");

        bool loop = true;
        if (loop) Debug.Log("VFX em Execucao Continua");

        Debug.Log("VFX Stop: Emissao Encerrada");
    }
}`,
            output: `VFX Play: Faíscas de Impacto
Taxa de Emissao: 50 particulas/s
Tempo de Vida: 2.5s
VFX em Execucao Continua
VFX Stop: Emissao Encerrada`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 25 — EFEITOS SONOROS 3D E ÁUDIO
    // ═══════════════════════════════════════════════════════
    25: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Abrindo a Acústica Tridimensional. AudioSource, AudioListener e Atenuação Espacial ativados."
            },
            {
                type: "narrative",
                text: "Ecos de passos e o choque de lâminas reverberam nas paredes de pedra da masmorra. Kael Draven calibra as fontes sonoras espaciais."
            },
            {
                type: "character",
                name: "KAEL DRAVEN",
                role: "FERREIRO DE CÓDIGO",
                cssClass: "kael",
                text: "O som é metade da imersão de qualquer jogo! No Unity, o som é emitido por um **AudioSource** e captado pelos ouvidos virtuais do jogador no **AudioListener**."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Para efeitos rápidos de golpe, usamos <code>PlayOneShot()</code>, que permite múltiplos impactos simultâneos sem cortar o som anterior! E com o **Spatial Blend 3D** ajustado em 1.0f, o som atenua com a distância e respeita a direção de onde o monstro está vindo!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Controlar a distância máxima de audição (Max Distance) e loops para trilha sonora de fundo (BGM) completam o design acústico. Domine esses sistemas neste capítulo."
            }
        ],
        concept: {
            title: "ÁUDIO ESPACIAL NO UNITY: AUDIOSOURCE, PLAYONESHOT, 3D SPATIAL BLEND E ATENUAÇÃO",
            explanation: `O subsistema de áudio da Unity entrega posicionamento binaural e atenuação espacial:
<ul>
  <li><strong>Disparo com PlayOneShot:</strong> Executa um clipe de áudio uma única vez sem interromper outros sons em execução na mesma fonte (ex: <code>string som = "Espada_Hit";</code> emitindo <code>"Audio Tocado: Espada_Hit"</code>).</li>
  <li><strong>Atenuação Espacial (Spatial Blend 3D):</strong> Varia de 0.0 (áudio 2D plano no fone) até 1.0f (áudio 3D imersivo completo, atenuado por distância e ângulo).</li>
  <li><strong>Distância Máxima de Audição (Max Distance):</strong> Raio limite em metros a partir do qual o som se torna completamente inaudível (ex: se distância do ouvinte &lt;= 20m, o som é audível).</li>
  <li><strong>Volume Master:</strong> Multiplicador de ganho geral de áudio (ex: <code>float volume = 0.8f;</code> emitindo <code>"Volume Master: 80%"</code>).</li>
  <li><strong>Trilhas em Loop (BGM):</strong> Músicas de fundo e ambientes configuradas com a propriedade <code>loop = true</code> para execução contínua.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploAudio3D : MonoBehaviour
{
    void Start()
    {
        // 1. Reprodução de efeito sonoro único
        string som = "Espada_Hit";
        Debug.Log("Audio Tocado: " + som);

        // 2. Mixagem 3D completa (Spatial Blend)
        float espacialBlend = 1.0f;
        Debug.Log("Som 3D Completo: " + espacialBlend);

        // 3. Checagem de distância máxima audível
        float maxDist = 20.0f;
        float distOuvinte = 15.0f;
        if (distOuvinte <= maxDist)
        {
            Debug.Log("Som Audivel");
        }

        // 4. Volume master do mixer
        float volume = 0.8f;
        Debug.Log("Volume Master: 80%");

        // 5. Trilha de batalha em looping contínuo
        string musica = "Tema_Batalha";
        bool emLoop = true;
        if (emLoop)
        {
            Debug.Log("BGM em Loop: " + musica);
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Gerenciador de Áudio Espacial e Música de Fundo",
            code: `using UnityEngine;

public class AudioManager : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Audio Tocado: Espada_Hit");

        float blend = 1.0f;
        Debug.Log("Som 3D Completo: " + blend);

        float max = 20.0f;
        float dist = 15.0f;
        if (dist <= max) Debug.Log("Som Audivel");

        Debug.Log("Volume Master: 80%");

        bool loop = true;
        if (loop) Debug.Log("BGM em Loop: Tema_Batalha");
    }
}`,
            output: `Audio Tocado: Espada_Hit
Som 3D Completo: 1
Som Audivel
Volume Master: 80%
BGM em Loop: Tema_Batalha`
        }
    }
};
