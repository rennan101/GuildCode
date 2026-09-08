// tools/csharp_updater/batch3.js - Capítulos 26 a 37
// Módulos 8 (Parte 2) e 9: NavMesh, Shaders, Instantiate/Destroy, Pooling, ScriptableObjects, PlayerPrefs, JSON, Coroutines, Events, Interfaces, Try/Catch, Otimização

module.exports = {
    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 26 — NAVMESH E IA DE PATRULHA NPC
    // ═══════════════════════════════════════════════════════
    26: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conjurando a Malha de Navegação Inteligente. NavMesh e Agentes de IA ativados."
            },
            {
                type: "narrative",
                text: "Uma malha azul translúcida assenta-se sobre o chão da masmorra, desviando automaticamente de fossos e pilares de pedra. Orin Vale observa sentinelas mecânicas patrulharem rotas predefinidas."
            },
            {
                type: "character",
                name: "ORIN VALE",
                role: "EXPLORADOR DE CENÁRIOS",
                cssClass: "orin",
                text: "Fazer um monstro desviar de paredes manualmente seria uma loucura! O Unity fornece o **NavMesh**, uma malha de navegação assada na geometria do cenário onde o componente **NavMeshAgent** encontra o caminho mais curto usando o algoritmo A*!"
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA",
                cssClass: "elion",
                text: "Basta chamar <code>agent.SetDestination(alvo)</code>! O agente calcula as curvas, respeita a velocidade máxima e para exatamente na distância configurada em <code>stoppingDistance</code>. E para patrulhar entre marcos, alternamos os waypoints com a fórmula cíclica <code>(indice + 1) % total</code>!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Pausas para observação entre cada ponto de patrulha conferem naturalidade ao comportamento da inteligência artificial. Conclua as 5 atividades deste capítulo."
            }
        ],
        concept: {
            title: "INTELIGÊNCIA ARTIFICIAL E NAVEGAÇÃO: NAVMESH, NAVMESHAGENT, STOPPING DISTANCE E WAYPOINTS",
            explanation: `O sistema de <code>NavMesh</code> do Unity gerencia a locomoção inteligente de NPCs pela cena:
<ul>
  <li><strong>Definição de Destino (<code>SetDestination</code>):</strong> Informa ao <code>NavMeshAgent</code> para onde navegar: <code>Vector3 destino = new Vector3(10, 0, 15);</code> emitindo <code>"Destino NavMesh: (10, 0, 15)"</code>.</li>
  <li><strong>Velocidade de Navegação (<code>speed</code>):</strong> Velocidade máxima com que o agente percorre a malha de navegação (ex: <code>float velocidadeAgente = 3.5f;</code>).</li>
  <li><strong>Distância de Parada (<code>stoppingDistance</code>):</strong> Tolerância em metros para que o NPC pare antes de trombar no jogador ou no alvo (ex: se distância restante &lt;= 1.0f, emite <code>"NPC Chegou ao Destino"</code>).</li>
  <li><strong>Patrulha Cíclica Entre Waypoints:</strong> Alterna entre pontos de patrulha usando o operador de módulo: <code>int proximo = (indicePonto + 1) % totalPontos;</code> (ex: passar do ponto 0 para o ponto 1).</li>
  <li><strong>Pausa de Observação:</strong> Temporizador que faz o agente aguardar alguns segundos no ponto antes de retomar o deslocamento (ex: <code>"Aguardando no Ponto: 2s"</code>).</li>
</ul>`,
            code: `using UnityEngine;
using UnityEngine.AI;

public class ExemploNavMesh : MonoBehaviour
{
    void Start()
    {
        // 1. Definição de coordenadas de destino
        Vector3 destino = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + destino.x + ", " + destino.y + ", " + destino.z + ")");

        // 2. Velocidade de locomoção do agente
        float velocidadeAgente = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + velocidadeAgente);

        // 3. Checagem de stoppingDistance
        float distRestante = 0.8f;
        float stopDist = 1.0f;
        if (distRestante <= stopDist)
        {
            Debug.Log("NPC Chegou ao Destino");
        }

        // 4. Rotação cíclica de waypoints
        int indicePonto = 0;
        int totalPontos = 3;
        int proximo = (indicePonto + 1) % totalPontos;
        Debug.Log("Proximo Ponto: " + proximo);

        // 5. Tempo de espera no marco
        float tempoEspera = 2.0f;
        Debug.Log("Aguardando no Ponto: " + tempoEspera + "s");
    }
}`
        },
        example: {
            title: "Exemplo Prático — Controlador de Patrulha de Sentinela",
            code: `using UnityEngine;

public class PatrulhaSentinela : MonoBehaviour
{
    void Start()
    {
        Vector3 dest = new Vector3(10, 0, 15);
        Debug.Log("Destino NavMesh: (" + dest.x + ", " + dest.y + ", " + dest.z + ")");

        float vel = 3.5f;
        Debug.Log("Velocidade NavMeshAgent: " + vel);

        float d = 0.8f;
        if (d <= 1.0f) Debug.Log("NPC Chegou ao Destino");

        int i = 0;
        int total = 3;
        Debug.Log("Proximo Ponto: " + ((i + 1) % total));

        Debug.Log("Aguardando no Ponto: 2s");
    }
}`,
            output: `Destino NavMesh: (10, 0, 15)
Velocidade NavMeshAgent: 3.5
NPC Chegou ao Destino
Proximo Ponto: 1
Aguardando no Ponto: 2s`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 27 — SHADERS BÁSICOS E MATERIAIS PBR
    // ═══════════════════════════════════════════════════════
    27: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conectando aos Pipelines Gráficos da GPU. Materiais PBR e Shader Graph ativos."
            },
            {
                type: "narrative",
                text: "Superfícies de ouro polido, couro envelhecido e gemas luminescentes reagem realisticamente à luz. Arkan Velor ajusta propriedades físicas de materiais baseados em física real (PBR)."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Um shader é o programa que roda diretamente em cada pixel da placa de vídeo para calcular sua cor final! No modelo **PBR (Physically Based Rendering)**, usamos quatro canais sagrados: **Albedo** (a cor base pura), **Metallic** (se o material é condutor ou dielétrico), **Smoothness** (o polimento da reflexão) e **Emission** (luz própria que brilha no escuro)!"
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "ARTÍFICE",
                cssClass: "mira",
                text: "E para dar feedback dinâmico quando um inimigo leva um golpe, podemos trocar seu material em tempo de execução para um shader com brilho vermelho (Flash Damage)!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Compreender os parâmetros de materiais PBR capacita o desenvolvedor a criar gráficos de alta fidelidade visual. Complete as 5 atividades deste capítulo."
            }
        ],
        concept: {
            title: "MATERIAIS PBR E SHADERS NO UNITY: ALBEDO, METALLIC, SMOOTHNESS E EMISSÃO",
            explanation: `Materiais PBR simulam como a luz interage com superfícies no mundo real:
<ul>
  <li><strong>Cor Albedo (Base Color):</strong> A cor difusa pura da superfície sem sombras embutidas (ex: <code>string corBase = "Vermelho_Carmim";</code> emitindo <code>"Cor Albedo: Vermelho_Carmim"</code>).</li>
  <li><strong>Grau Metálico (<code>Metallic</code>):</strong> Flutuante de 0.0 (isolante como madeira ou pedra) a 1.0 (metal puro como ouro ou ferro) que define se os reflexos absorvem a cor do metal (ex: 0.9).</li>
  <li><strong>Rugosidade e Suavidade (<code>Smoothness</code>):</strong> Define o micro-relevo da superfície. Quanto maior, mais nítido e espelhado é o reflexo da luz (ex: 0.75).</li>
  <li><strong>Emissão de Luz Própria (<code>Emission</code>):</strong> Faz a superfície irradiar luz própria independente da iluminação ambiente (ex: <code>float intensidadeEmissao = 2.0f;</code> emitindo <code>"Emissao Ativa: 2x"</code>).</li>
  <li><strong>Troca Dinâmica de Material:</strong> Alterna instâncias de material para efeitos de combate (ex: trocar de 'Padrao' para 'Dano_Flash' ao receber dano).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploShadersPBR : MonoBehaviour
{
    void Start()
    {
        // 1. Cor Albedo base
        string corBase = "Vermelho_Carmim";
        Debug.Log("Cor Albedo: " + corBase);

        // 2. Grau metálico
        float metallic = 0.9f;
        Debug.Log("Grau Metalico: " + metallic);

        // 3. Suavidade de reflexo (Smoothness)
        float smoothness = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + smoothness);

        // 4. Emissão de luz radiante
        bool temEmissao = true;
        float intensidadeEmissao = 2.0f;
        if (temEmissao)
        {
            Debug.Log("Emissao Ativa: " + intensidadeEmissao + "x");
        }

        // 5. Troca dinâmica de material em dano
        string materialAtual = "Padrao";
        bool atingido = true;
        if (atingido)
        {
            materialAtual = "Dano_Flash";
            Debug.Log("Material: " + materialAtual);
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Ficha de Material PBR e Efeito de Dano",
            code: `using UnityEngine;

public class MaterialInspector : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Cor Albedo: Vermelho_Carmim");

        float m = 0.9f;
        Debug.Log("Grau Metalico: " + m);

        float s = 0.75f;
        Debug.Log("Suavidade de Reflexo: " + s);

        bool emissao = true;
        if (emissao) Debug.Log("Emissao Ativa: 2x");

        string mat = "Dano_Flash";
        Debug.Log("Material: " + mat);
    }
}`,
            output: `Cor Albedo: Vermelho_Carmim
Grau Metalico: 0.9
Suavidade de Reflexo: 0.75
Emissao Ativa: 2x
Material: Dano_Flash`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 28 — INSTANTIATE E DESTROY DINÂMICOS
    // ═══════════════════════════════════════════════════════
    28: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Entrando no Módulo 9 — Avançado (Tópicos PTS). Matriz de instanciação e descarte dinâmico ativada."
            },
            {
                type: "narrative",
                text: "Orin Vale comanda o círculo de invocação de prefabs. Entidades surgem do nada, cumprem suas missões e desaparecem com temporizadores precisos."
            },
            {
                type: "character",
                name: "ORIN VALE",
                role: "ARTÍFICE DE CENÁRIOS",
                cssClass: "orin",
                text: "Em jogos dinâmicos, nem tudo pode estar colocado na cena desde o início: flechas, magias, itens de drop e novos monstros precisam nascer em tempo de execução usando **Instantiate()**!"
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "E quando o objeto cumpre seu propósito, usamos **Destroy()** para não sobrecarregar a memória. Podemos passar um temporizador de delay (como <code>Destroy(obj, 3.0f)</code>) para que uma explosão desapareça após 3 segundos, ou destruir imediatamente ao tocar no abismo!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Dominar a criação com posição e rotação específica e o controle de tempo de vida é a base do ciclo dinâmico de prefabs. Complete as atividades."
            }
        ],
        concept: {
            title: "CRIAÇÃO E DESTRUIÇÃO DINÂMICA: INSTANTIATE, DESTROY COM DELAY E CICLO DE PREFABS",
            explanation: `Gerenciar o nascimento e descarte de GameObjects em tempo de execução:
<ul>
  <li><strong>Criação com Instantiate:</strong> Clona um prefab na cena durante o jogo (ex: <code>string prefab = "Projetil_Fogo";</code> emitindo <code>"Instantiate: Projetil_Fogo gerado"</code>).</li>
  <li><strong>Instantiate com Posição e Rotação:</strong> Define exatamente as coordenadas 3D de nascimento do objeto (ex: <code>Vector3 spawnPos = new Vector3(0, 1, 5);</code> emitindo <code>"Spawn na Posicao: (0, 1, 5)"</code>).</li>
  <li><strong>Destruição com Temporizador (Delay):</strong> O método <code>Destroy(gameObject, delay)</code> programa a remoção da entidade após decorridos os segundos informados (ex: <code>float tempoVida = 3.0f;</code> emitindo <code>"Objeto Destruido Apos: 3s"</code>).</li>
  <li><strong>Instanciação Sequencial em Laço:</strong> Gera ondas ou séries de objetos controladas por contadores (ex: criar instâncias de 1 a 3 sequencialmente).</li>
  <li><strong>Destruição Imediata por Contato:</strong> Remove o GameObject da cena no momento em que colide com zonas fatais (ex: ao tocar no 'Abismo', executa <code>Destroy</code> imediato).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploInstantiateDestroy : MonoBehaviour
{
    void Start()
    {
        // 1. Criação dinâmica de entidade
        string prefab = "Projetil_Fogo";
        Debug.Log("Instantiate: " + prefab + " gerado");

        // 2. Spawn em coordenadas específicas
        Vector3 spawnPos = new Vector3(0, 1, 5);
        Debug.Log("Spawn na Posicao: (" + spawnPos.x + ", " + spawnPos.y + ", " + spawnPos.z + ")");

        // 3. Destruição agendada por tempo de vida
        float tempoVida = 3.0f;
        Debug.Log("Objeto Destruido Apos: " + tempoVida + "s");

        // 4. Instanciação em lote
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Instancia #" + i + " criada");
        }

        // 5. Destruição imediata por colisor
        string colisor = "Abismo";
        if (colisor == "Abismo")
        {
            Debug.Log("Destroy: Entidade Removida da Cena");
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Gerador e Limpador de Projéteis",
            code: `using UnityEngine;

public class SpawnDestroyManager : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Instantiate: Projetil_Fogo gerado");

        Vector3 pos = new Vector3(0, 1, 5);
        Debug.Log("Spawn na Posicao: (" + pos.x + ", " + pos.y + ", " + pos.z + ")");

        float vida = 3.0f;
        Debug.Log("Objeto Destruido Apos: " + vida + "s");

        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Instancia #" + i + " criada");
        }

        string zona = "Abismo";
        if (zona == "Abismo") Debug.Log("Destroy: Entidade Removida da Cena");
    }
}`,
            output: `Instantiate: Projetil_Fogo gerado
Spawn na Posicao: (0, 1, 5)
Objeto Destruido Apos: 3s
Instancia #1 criada
Instancia #2 criada
Instancia #3 criada
Destroy: Entidade Removida da Cena`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 29 — OBJECT POOLING & OTIMIZAÇÃO DE GC
    // ═══════════════════════════════════════════════════════
    29: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Calibrando o Padrão de Reutilização Contínua. Object Pooling e Controle de GC ativados."
            },
            {
                type: "narrative",
                text: "Lyra Nex organiza esteiras circulares de projéteis e partículas. Nenhum recurso é descartado: tudo o que cumpre sua missão é reciclado instantaneamente."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Chamar <code>Instantiate</code> e <code>Destroy</code> centenas de vezes por minuto é o maior erro de novatos! Isso aloca memória na heap e faz o temido **Garbage Collector (GC)** congelar o jogo com travamentos perceptíveis (stutters)."
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA",
                cssClass: "elion",
                text: "A solução profissional é o padrão **Object Pooling**! Pré-alocamos uma fila (<code>Queue&lt;GameObject&gt;</code>) com a capacidade necessária. Quando precisamos de uma bala, resgatamos com <code>Dequeue()</code> e ativamos. Quando ela atinge o alvo, apenas desativamos com <code>SetActive(false)</code> e devolvemos ao pool!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Com Object Pooling, o consumo de alocação de GC é zero bytes! Conclua as 5 atividades deste capítulo para dominar a reciclagem limpa de objetos."
            }
        ],
        concept: {
            title: "OBJECT POOLING: REUSO DE INSTÂNCIAS COM QUEUE, ZERO GC ALLOC E CONTROLE DE CAPACIDADE",
            explanation: `Object Pooling elimina quedas de FPS causadas por coletas periódicas do Garbage Collector:
<ul>
  <li><strong>Fila de Pooling (<code>Queue&lt;T&gt;</code>):</strong> Coleção do tipo Primeiro a Entrar, Primeiro a Sair (FIFO) usada para armazenar objetos em repouso: <code>Debug.Log("Pool Inicializado com Fila");</code>.</li>
  <li><strong>Resgate de Instância (<code>Dequeue</code>):</strong> Retira um objeto inativo da fila para uso imediato: <code>Debug.Log("Objeto Resgatado com Dequeue");</code>.</li>
  <li><strong>Zero Alocação de GC:</strong> Ao reutilizar instâncias já existentes, a alocação de bytes na memória gerenciada é nula (ex: <code>int gcAllocBytes = 0;</code> emitindo <code>"Alocacao de GC Evitada: 0 bytes"</code>).</li>
  <li><strong>Devolução ao Pool (Desativação):</strong> Em vez de chamar <code>Destroy</code>, o objeto apenas tem seu estado alterado para <code>estaAtivo = false</code> e retorna ao pool (ex: <code>"Objeto Devolvido ao Pool (Ativo: False)"</code>).</li>
  <li><strong>Capacidade Máxima do Pool:</strong> Limite total de unidades pré-alocadas para a cena (ex: <code>int capacidadeMaxima = 50;</code> emitindo <code>"Capacidade do Pool: 50 unidades"</code>).</li>
</ul>`,
            code: `using UnityEngine;
using System.Collections.Generic;

public class ExemploObjectPooling : MonoBehaviour
{
    void Start()
    {
        // 1. Inicialização do pool com Queue
        Debug.Log("Pool Inicializado com Fila");

        // 2. Resgate de elemento do pool
        Debug.Log("Objeto Resgatado com Dequeue");

        // 3. Eficiência de memória com zero alocação de GC
        int objetosInstanciados = 10;
        int gcAllocBytes = 0;
        Debug.Log("Alocacao de GC Evitada: " + gcAllocBytes + " bytes");

        // 4. Devolução e desativação
        bool estaAtivo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + estaAtivo + ")");

        // 5. Capacidade máxima configurada
        int capacidadeMaxima = 50;
        Debug.Log("Capacidade do Pool: " + capacidadeMaxima + " unidades");
    }
}`
        },
        example: {
            title: "Exemplo Prático — Ciclo de Vida sem Coleta de Lixo",
            code: `using UnityEngine;

public class PoolReciclador : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Pool Inicializado com Fila");
        Debug.Log("Objeto Resgatado com Dequeue");

        int gc = 0;
        Debug.Log("Alocacao de GC Evitada: " + gc + " bytes");

        bool ativo = false;
        Debug.Log("Objeto Devolvido ao Pool (Ativo: " + ativo + ")");

        int cap = 50;
        Debug.Log("Capacidade do Pool: " + cap + " unidades");
    }
}`,
            output: `Pool Inicializado com Fila
Objeto Resgatado com Dequeue
Alocacao de GC Evitada: 0 bytes
Objeto Devolvido ao Pool (Ativo: False)
Capacidade do Pool: 50 unidades`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 30 — SCRIPTABLEOBJECTS & ARQUITETURA MODULAR
    // ═══════════════════════════════════════════════════════
    30: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Carregando a Arquitetura de Dados Modular. ScriptableObjects e Fichas Desacopladas ativos."
            },
            {
                type: "narrative",
                text: "Elion Raven manipula arquivos de dados que existem como assets puros no projeto, independentes de qualquer GameObject ou cena."
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA & BIBLIOTECÁRIO",
                cssClass: "elion",
                text: "Nunca misture as fichas de atributos com a lógica dos monstros na cena! Se você tiver 500 Golems na fase, você não quer 500 cópias dos mesmos dados consumindo memória. Criamos **ScriptableObjects**!"
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "ARTÍFICE",
                cssClass: "mira",
                text: "Com a anotação <code>[CreateAssetMenu]</code>, criamos novas fichas de itens e inimigos com um clique no botão direito do editor! Centenas de instâncias na cena compartilham a mesma ficha central: se ajustarmos o dano base, todos os inimigos são balanceados simultaneamente!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "ScriptableObjects representam a melhor prática arquitetural para balanceamento de RPGs, tabelas de loot e custos de habilidades. Complete as 5 atividades deste capítulo."
            }
        ],
        concept: {
            title: "SCRIPTABLEOBJECTS NO UNITY: DADOS DESACOPLADOS, [CREATEASSETMENU] E COMPARTILHAMENTO EFICIENTE",
            explanation: `<code>ScriptableObject</code> é uma classe de dados que não precisa estar anexada a GameObjects da cena:
<ul>
  <li><strong>Leitura de Atributos:</strong> Lê fichas de dados compartilhadas (ex: <code>string nomePoder = "Meteoro"; int custoMana = 40;</code> emitindo <code>"Habilidade: Meteoro | Custo: 40 Mana"</code>).</li>
  <li><strong>Ficha de Dados Modular de Inimigos:</strong> Armazena parâmetros base fora da cena (ex: monstro 'Golem' com 500 de HP base).</li>
  <li><strong>Compartilhamento entre Instâncias:</strong> Múltiplas entidades na cena apontam para a mesma referência na memória, consumindo fração do espaço (ex: dobrar o dano compartilhado de 25 resulta em <code>"Dano Compartilhado: 50"</code>).</li>
  <li><strong>Menu de Criação de Assets (<code>[CreateAssetMenu]</code>):</strong> Expõe o arquivo no menu de criação de assets do editor Unity (ex: <code>"Assets/Create/Cartas/Item"</code>).</li>
  <li><strong>Economia e Desconto Modular:</strong> Lógicas de cálculo sobre a ficha (ex: subtrair custo de 30 da mana disponível de 80 informando <code>"Mana Restante: 50"</code>).</li>
</ul>`,
            code: `using UnityEngine;

// Definição de ScriptableObject
[CreateAssetMenu(fileName = "NovaHabilidade", menuName = "Assets/Create/Cartas/Item")]
public class HabilidadeData : ScriptableObject
{
    public string nomePoder;
    public int custoMana;
    public int danoBase;
}

public class ExemploScriptableObjects : MonoBehaviour
{
    void Start()
    {
        // 1. Leitura de dados de habilidade
        string nomePoder = "Meteoro";
        int custoMana = 40;
        Debug.Log("Habilidade: " + nomePoder + " | Custo: " + custoMana + " Mana");

        // 2. Ficha de monstro
        string tipoMonstro = "Golem";
        int hpBase = 500;
        Debug.Log("Monstro: " + tipoMonstro + " | HP: " + hpBase);

        // 3. Compartilhamento de dados
        int danoBase = 25;
        int danoDuplo = danoBase * 2;
        Debug.Log("Dano Compartilhado: " + danoDuplo);

        // 4. Menu do editor
        string caminhoMenu = "Assets/Create/Cartas/Item";
        Debug.Log("Menu Ativo: " + caminhoMenu);

        // 5. Cálculo com base nos dados
        int manaDisponivel = 80;
        int custo = 30;
        int restante = manaDisponivel - custo;
        Debug.Log("Mana Restante: " + restante);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Consumo e Compartilhamento de Fichas de Dados",
            code: `using UnityEngine;

public class AssetDataLoader : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Habilidade: Meteoro | Custo: 40 Mana");
        Debug.Log("Monstro: Golem | HP: 500");

        int dano = 25 * 2;
        Debug.Log("Dano Compartilhado: " + dano);

        Debug.Log("Menu Ativo: Assets/Create/Cartas/Item");

        int m = 80 - 30;
        Debug.Log("Mana Restante: " + m);
    }
}`,
            output: `Habilidade: Meteoro | Custo: 40 Mana
Monstro: Golem | HP: 500
Dano Compartilhado: 50
Menu Ativo: Assets/Create/Cartas/Item
Mana Restante: 50`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 31 — SAVE E LOAD COM PLAYERPREFS
    // ═══════════════════════════════════════════════════════
    31: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conectando à Memória Não-Volátil do Dispositivo. Módulo de Persistência PlayerPrefs ativo."
            },
            {
                type: "narrative",
                text: "Mira Solenn grava números de pontuação, preferências de áudio e nomes de heróis em tábuas de cristal permanente."
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "CARTÓGRAFA & ARTÍFICE",
                cssClass: "mira",
                text: "Quando o jogador fecha o jogo e desliga o computador, a memória RAM é completamente apagada! Para salvar preferências simples como recordes, volume e apelido, o Unity oferece **PlayerPrefs**!"
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "O PlayerPrefs grava pares de chave e valor: <code>SetInt('HighScore', 2500)</code> para inteiros, <code>SetFloat('MasterVolume', 0.8f)</code> para decimais e <code>SetString()</code> para textos. Com <code>HasKey()</code> verificamos se o save existe antes de carregar, e com <code>PlayerPrefs.Save()</code> forçamos a gravação imediata no disco!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "PlayerPrefs é ideal para opções e pequenos registros. Complete as 5 atividades deste capítulo para dominar a persistência nativa."
            }
        ],
        concept: {
            title: "PERSISTÊNCIA SIMPLES COM PLAYERPREFS: SET/GET INT, FLOAT, STRING, HASKEY E SAVE",
            explanation: `<code>PlayerPrefs</code> grava dados leves de preferências no registro do sistema ou arquivos locais:
<ul>
  <li><strong>Gravando Inteiros (<code>SetInt</code> e <code>GetInt</code>):</strong> Armazena pontuações e fases (ex: <code>PlayerPrefs.SetInt("HighScore", 2500);</code> e leitura com valor padrão: <code>Debug.Log("HighScore Salvo: " + score);</code>).</li>
  <li><strong>Gravando Decimais (<code>SetFloat</code> e <code>GetFloat</code>):</strong> Armazena configurações de volume, sensibilidade e sliders (ex: volume mestre em 0.8f).</li>
  <li><strong>Gravando Strings (<code>SetString</code> e <code>GetString</code>):</strong> Armazena o nome do perfil do jogador (ex: <code>PlayerPrefs.SetString("NomePlayer", "Arkan");</code>).</li>
  <li><strong>Verificação de Chave Existente (<code>HasKey</code>):</strong> Retorna se uma determinada chave já foi salva anteriormente (ex: checar se 'TutorialVisto' existe; se não, emite <code>"Iniciar Tutorial"</code>).</li>
  <li><strong>Forçando Gravação no Disco (<code>Save</code>):</strong> Escreve imediatamente os dados da memória para o disco físico com <code>PlayerPrefs.Save();</code>.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploPlayerPrefs : MonoBehaviour
{
    void Start()
    {
        // 1. Salvar e resgatar inteiro
        int score = 2500;
        Debug.Log("HighScore Salvo: " + score);

        // 2. Salvar e resgatar float
        float vol = 0.8f;
        Debug.Log("Volume: " + vol);

        // 3. Salvar e resgatar string
        string nome = "Arkan";
        Debug.Log("Heroi Registrado: " + nome);

        // 4. Verificação de chave existente (HasKey)
        bool existe = false;
        if (!existe)
        {
            Debug.Log("Iniciar Tutorial");
        }

        // 5. Gravação forçada
        Debug.Log("Dados Gravados com Sucesso");
    }
}`
        },
        example: {
            title: "Exemplo Prático — Sistema de Configurações e Perfil com PlayerPrefs",
            code: `using UnityEngine;

public class SavePrefsManager : MonoBehaviour
{
    void Start()
    {
        int score = 2500;
        Debug.Log("HighScore Salvo: " + score);

        float vol = 0.8f;
        Debug.Log("Volume: " + vol);

        string nome = "Arkan";
        Debug.Log("Heroi Registrado: " + nome);

        bool existe = false;
        if (!existe) Debug.Log("Iniciar Tutorial");

        Debug.Log("Dados Gravados com Sucesso");
    }
}`,
            output: `HighScore Salvo: 2500
Volume: 0.8
Heroi Registrado: Arkan
Iniciar Tutorial
Dados Gravados com Sucesso`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 32 — SAVE E LOAD COM JSON E SERIALIZAÇÃO
    // ═══════════════════════════════════════════════════════
    32: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conjurando os Códices de Serialização Universal. JsonUtility e [System.Serializable] ativos."
            },
            {
                type: "narrative",
                text: "Lyra Nex transcreve árvores inteiras de objetos e inventários em cordões de texto estruturado em formato JSON. O estado do mundo torna-se portátil e perpétuo."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "PlayerPrefs é bom para um número solto, mas para salvar um RPG completo — com listas de itens, inventários complexos e histórico de missões — precisamos de **Serialização JSON**!"
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA",
                cssClass: "elion",
                text: "A regra de ouro da Unity: qualquer classe ou struct que vá ser convertida em texto precisa ser decorada com <code>[System.Serializable]</code>! Em seguida, usamos <code>JsonUtility.ToJson()</code> para transformar a instância em texto e <code>FromJson()</code> para reconstruir o objeto perfeitamente!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Validar a integridade do arquivo antes de desserializar evita travamentos por saves corrompidos. Domine a serialização completa neste capítulo."
            }
        ],
        concept: {
            title: "SERIALIZAÇÃO COM JSONUTILITY NO UNITY: [SYSTEM.SERIALIZABLE], TOJSON E FROMJSON",
            explanation: `A serialização transforma estruturas complexas da memória em strings textuais JSON:
<ul>
  <li><strong>Serialização para JSON (<code>JsonUtility.ToJson</code>):</strong> Converte um objeto serializável em uma string JSON compacta (ex: <code>JsonUtility.ToJson(Vector3.one)</code> emitindo <code>"Serializado com JsonUtility"</code> ou gerando <code>'{"fase":3,"moedas":150}'</code>).</li>
  <li><strong>Uso do JsonUtility.ToJson:</strong> Chamada oficial do motor para gerar a representação em texto.</li>
  <li><strong>Desserialização e Resgate de Valores (<code>FromJson</code>):</strong> Reconstrói o objeto a partir da string JSON, permitindo ler propriedades salvas (ex: fase carregada 5 e vida 100 emitindo <code>"Save Carregado: Fase 5 (Vida: 100)"</code>).</li>
  <li><strong>Anotação [System.Serializable]:</strong> Atributo obrigatório acima da declaração de classes personalizadas que indica ao motor que seus campos devem ser empacotados pela serialização.</li>
  <li><strong>Integridade do Arquivo de Save:</strong> Verificação booleana (<code>bool saveValido = true</code>) que valida se os dados não foram corrompidos antes de restaurar o progresso do jogador.</li>
</ul>`,
            code: `using UnityEngine;

// Classe com anotação serializável
[System.Serializable]
public class DadosJogador
{
    public int fase = 3;
    public int moedas = 150;
}

public class ExemploJSON : MonoBehaviour
{
    void Start()
    {
        // 1. Objeto serializado para texto JSON
        DadosJogador dados = new DadosJogador();
        string json = "{\"fase\":3,\"moedas\":150}";
        Debug.Log("JSON: " + json);

        // 2. Uso do JsonUtility
        string vetorJson = JsonUtility.ToJson(Vector3.one);
        Debug.Log("Serializado com JsonUtility");

        // 3. Desserialização e extração de valores
        int faseCarregada = 5;
        int vidaCarregada = 100;
        Debug.Log("Save Carregado: Fase " + faseCarregada + " (Vida: " + vidaCarregada + ")");

        // 4. Marcação como serializável
        string statusSerial = "Estrutura Marcada como Serializavel";
        Debug.Log(statusSerial);

        // 5. Verificação de integridade
        bool saveValido = true;
        if (saveValido)
        {
            Debug.Log("Arquivo de Save Valido e Carregado");
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Serializador e Desserializador de Save Game",
            code: `using UnityEngine;

public class JSONSaveManager : MonoBehaviour
{
    void Start()
    {
        Debug.Log("JSON: {\"fase\":3,\"moedas\":150}");
        Debug.Log("Serializado com JsonUtility");

        int f = 5;
        int v = 100;
        Debug.Log("Save Carregado: Fase " + f + " (Vida: " + v + ")");

        Debug.Log("Estrutura Marcada como Serializavel");

        bool valido = true;
        if (valido) Debug.Log("Arquivo de Save Valido e Carregado");
    }
}`,
            output: `JSON: {"fase":3,"moedas":150}
Serializado com JsonUtility
Save Carregado: Fase 5 (Vida: 100)
Estrutura Marcada como Serializavel
Arquivo de Save Valido e Carregado`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 33 — COROUTINES E FLUXO TEMPORAL
    // ═══════════════════════════════════════════════════════
    33: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conectando à Dimensão do Tempo Assíncrono. Coroutines e IEnumerators ativados."
            },
            {
                type: "narrative",
                text: "O fluxo do tempo desdobra-se em camadas paralelas. Orin Vale congela instantes temporais e programa ações que pausam e retomam com fluidez sem travar o jogo."
            },
            {
                type: "character",
                name: "ORIN VALE",
                role: "ARTÍFICE DE CENÁRIOS",
                cssClass: "orin",
                text: "Se você tentar fazer uma contagem de 3 segundos usando um loop comum com <code>Thread.Sleep</code>, o jogo inteiro congelará na tela! No Unity, operações com espera temporal usam **Coroutines** (corotinas) com retorno <code>IEnumerator</code>!"
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "A mágica está na expressão <code>yield return new WaitForSeconds(tempo)</code>! A função pausa sua execução no ponto exato, devolve o controle para a engine desenhar os próximos quadros e acorda automaticamente quando o tempo terminar!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Corotinas são iniciadas com <code>StartCoroutine()</code> e podem ser canceladas antecipadamente com <code>StopCoroutine()</code>. Domine o controle temporal assíncrono."
            }
        ],
        concept: {
            title: "COROUTINES NO UNITY: IENUMERATOR, YIELD RETURN, WAITFORSECONDS E CANCELAMENTO",
            explanation: `Coroutines permitem espalhar tarefas ao longo de múltiplos quadros sem bloquear a thread principal:
<ul>
  <li><strong>Execução com Atraso (Delay):</strong> Permite executar etapas separadas por intervalos de tempo sem interromper a renderização dos frames gráficos (ex: Passo 1 seguido do Passo 2).</li>
  <li><strong>Tempo de Espera (<code>WaitForSeconds</code>):</strong> Instrução de rendição (yield) que suspende a corotina pela duração em segundos especificada: <code>float tempoEspera = 1.5f;</code> emitindo <code>"Aguardando: 1.5 segundos"</code>.</li>
  <li><strong>Contagem Regressiva Assíncrona:</strong> Laço for decrementando (de 3 até 1) intercalado por waits simulando timers de lançamento: <code>"Timer: " + i</code> e ao final <code>"Lancamento!"</code>.</li>
  <li><strong>Disparo com StartCoroutine:</strong> Método do <code>MonoBehaviour</code> que registra a corotina no scheduler do motor (ex: <code>"StartCoroutine: Rotina Disparada"</code>).</li>
  <li><strong>Interrupção com StopCoroutine:</strong> Cancela uma corotina antes que termine, essencial quando o herói morre ou cancela uma ação (ex: <code>"StopCoroutine: Execucao Interrompida"</code>).</li>
</ul>`,
            code: `using UnityEngine;
using System.Collections;

public class ExemploCoroutines : MonoBehaviour
{
    void Start()
    {
        // 1. Passos sequenciais no tempo
        string p1 = "Passo 1: Iniciado";
        string p2 = "Passo 2: Concluido";
        Debug.Log(p1);
        Debug.Log(p2);

        // 2. Tempo de espera assíncrono
        float tempoEspera = 1.5f;
        Debug.Log("Aguardando: " + tempoEspera + " segundos");

        // 3. Contagem regressiva em corotina
        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");

        // 4. Disparo via StartCoroutine
        string statusCoro = "StartCoroutine: Rotina Disparada";
        Debug.Log(statusCoro);

        // 5. Interrupção controlada
        bool jogadorCancelou = true;
        if (jogadorCancelou)
        {
            Debug.Log("StopCoroutine: Execucao Interrompida");
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Temporizador Assíncrono de Habilidade",
            code: `using UnityEngine;

public class TemporizadorMagico : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Passo 1: Iniciado");
        Debug.Log("Passo 2: Concluido");

        float espera = 1.5f;
        Debug.Log("Aguardando: " + espera + " segundos");

        for (int i = 3; i >= 1; i--)
        {
            Debug.Log("Timer: " + i);
        }
        Debug.Log("Lancamento!");

        Debug.Log("StartCoroutine: Rotina Disparada");

        bool cancel = true;
        if (cancel) Debug.Log("StopCoroutine: Execucao Interrompida");
    }
}`,
            output: `Passo 1: Iniciado
Passo 2: Concluido
Aguardando: 1.5 segundos
Timer: 3
Timer: 2
Timer: 1
Lancamento!
StartCoroutine: Rotina Disparada
StopCoroutine: Execucao Interrompida`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 34 — DELEGATES E EVENTS DESACOPLADOS
    // ═══════════════════════════════════════════════════════
    34: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Abrindo a Rede de Mensagens Desacopladas. Padrão Observer, Delegates e Events ativos."
            },
            {
                type: "narrative",
                text: "Ecos de sinos transmitem avisos por todas as torres da Guilda sem que os guardas precisem conhecer uns aos outros. Elion Raven conecta emissores e ouvintes arcanos."
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA & ANALISTA",
                cssClass: "elion",
                text: "Se o seu script do Jogador precisar conhecer o script do HUD, o script de Áudio, o script de Conquistas e o script de Partículas, seu código se tornará um monólito espaguete impossível de manter! A solução sagrada são **Events e Delegates**!"
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "O jogador apenas grita ao mundo: <code>onPlayerDied?.Invoke()</code>! Ele não sabe quem está ouvindo. O HUD se inscreve para atualizar a barra, o sistema de som toca a derrota e o VFX solta fumaça — múltiplos ouvintes (Multicast) via <code>+=</code>! E no <code>OnDisable</code>, cancelamos a inscrição com <code>-=</code> para evitar vazamentos de memória!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "O padrão Observer desacoplado é o alicerce da arquitetura profissional de qualquer jogo em C#. Complete as 5 atividades deste capítulo."
            }
        ],
        concept: {
            title: "DELEGATES E EVENTS NO UNITY: ACTION, PADRÃO OBSERVER, MULTICAST E CANCELAMENTO (-=)",
            explanation: `Delegates são referências para métodos, permitindo a arquitetura desacoplada de Eventos:
<ul>
  <li><strong>Declaração de Action:</strong> A estrutura <code>System.Action</code> encapsula métodos sem retorno: <code>Action onPlayerDied = () => Debug.Log("Evento: " + status);</code>.</li>
  <li><strong>Delegate com Parâmetros:</strong> Passa informações no disparo do evento, como valor do dano sofrido (ex: <code>Action onTakeDamage</code> transmitindo <code>"Dano Sofrido: 45"</code>).</li>
  <li><strong>Desacoplamento de UI e Lógica:</strong> O modelo de jogo nunca manipula a UI diretamente; ele apenas dispara eventos que o HUD escuta (ex: <code>"HUD Notificado: Barra Atualizada"</code>).</li>
  <li><strong>Múltiplos Ouvintes (Multicast Event):</strong> Vários sistemas podem se conectar ao mesmo evento com o operador <code>+=</code> (ex: Ouvinte 1 toca o som, Ouvinte 2 ativa a partícula).</li>
  <li><strong>Cancelamento de Inscrição (<code>-=</code>):</strong> Sempre desinscrever ouvintes no <code>OnDisable</code> ou <code>OnDestroy</code> para evitar fugas de memória e referências mortas.</li>
</ul>`,
            code: `using UnityEngine;
using System;

public class ExemploEventsDelegates : MonoBehaviour
{
    void Start()
    {
        // 1. Declaração e disparo de Action simples
        string status = "Jogador Derrotado";
        Action onPlayerDied = () => Debug.Log("Evento: " + status);
        onPlayerDied();

        // 2. Delegate com parâmetro de dano
        int danoRecebido = 45;
        Action onTakeDamage = () => Debug.Log("Dano Sofrido: " + danoRecebido);
        onTakeDamage();

        // 3. Notificação desacoplada da UI
        string eventoUi = "HUD Notificado: Barra Atualizada";
        Debug.Log(eventoUi);

        // 4. Múltiplos ouvintes multicast
        string o1 = "Ouvinte 1: Som Tocado";
        string o2 = "Ouvinte 2: Particula Ativada";
        Debug.Log(o1);
        Debug.Log(o2);

        // 5. Desinscrição segura no OnDisable
        string statusUnsub = "Inscricao Removida com -= no OnDisable";
        Debug.Log(statusUnsub);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Sistema de Eventos de Combate Desacoplado",
            code: `using UnityEngine;
using System;

public class CombatEventManager : MonoBehaviour
{
    void Start()
    {
        string st = "Jogador Derrotado";
        Action died = () => Debug.Log("Evento: " + st);
        died();

        int d = 45;
        Action dmg = () => Debug.Log("Dano Sofrido: " + d);
        dmg();

        Debug.Log("HUD Notificado: Barra Atualizada");
        Debug.Log("Ouvinte 1: Som Tocado");
        Debug.Log("Ouvinte 2: Particula Ativada");
        Debug.Log("Inscricao Removida com -= no OnDisable");
    }
}`,
            output: `Evento: Jogador Derrotado
Dano Sofrido: 45
HUD Notificado: Barra Atualizada
Ouvinte 1: Som Tocado
Ouvinte 2: Particula Ativada
Inscricao Removida com -= no OnDisable`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 35 — INTERFACES E CONTRATOS DE CÓDIGO
    // ═══════════════════════════════════════════════════════
    35: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conjurando os Contratos Sagrados. Interfaces, Abstrações e Polimorfismo por Contrato ativos."
            },
            {
                type: "narrative",
                text: "Kael Draven analisa armas, baús e barris explosivos. Todos possuem naturezas distintas, mas alguns compartilham o mesmo dever sagrado de receber dano."
            },
            {
                type: "character",
                name: "KAEL DRAVEN",
                role: "FERREIRO DE CÓDIGO",
                cssClass: "kael",
                text: "Em C#, uma classe só pode herdar de um único pai. Mas e se um Barril, um Inimigo e uma Parede Destrutível puderem tomar dano da mesma espada? Nós usamos uma **Interface**, como <code>IDamageable</code>!"
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Uma interface é um contrato solene que diz 'o que deve ser feito', sem ditar 'como fazer'. Ao golpear um alvo, checamos <code>if (alvo is IDamageable)</code>! E o mais brilhante: uma classe pode implementar múltiplas interfaces, como uma Porta que é ao mesmo tempo <code>IDamageable</code> e <code>IInteractable</code>!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Contratos de interface mantêm o código desacoplado e escalável para dezenas de novos tipos de objetos. Complete as 5 atividades deste capítulo."
            }
        ],
        concept: {
            title: "INTERFACES EM C#: CONTRATOS IDAMAGEABLE, IINTERACTABLE, OPERADOR 'IS' E MÚLTIPLAS INTERFACES",
            explanation: `Interfaces estabelecem contratos de funcionalidade sem vínculos de herança rígida:
<ul>
  <li><strong>Contrato de Dano (<code>IDamageable</code>):</strong> Garante que qualquer entidade que a implemente possua um método para sofrer dano (ex: <code>"IDamageable: Tomou 30 de dano"</code>).</li>
  <li><strong>Contrato de Interação (<code>IInteractable</code>):</strong> Padroniza baús, portas e NPCs que reagem ao botão de interação (ex: <code>"IInteractable: Interagiu com Bau"</code>).</li>
  <li><strong>Polimorfismo Baseado em Interfaces:</strong> Um array de <code>IDamageable</code> pode conter tanto um 'Inimigo' quanto um 'Barril', iterando e tratando ambos de forma unificada (ex: <code>"Entidade Danificavel: " + nome</code>).</li>
  <li><strong>Checagem Segura com Operador 'is':</strong> Avalia se uma referência desconhecida cumpre determinado contrato antes de invocá-lo (ex: <code>if (alvo is IDamageable) Debug.Log("Alvo Implementa IDamageable");</code>).</li>
  <li><strong>Múltiplas Interfaces por Classe:</strong> Diferente da herança simples de classes, uma única classe pode implementar <code>IDamageable</code> E <code>IInteractable</code> simultaneamente (ex: uma porta destrutível e interagível).</li>
</ul>`,
            code: `using UnityEngine;

// Definição das interfaces
public interface IDamageable
{
    void TomarDano(int quantidade);
}

public interface IInteractable
{
    void Interagir();
}

public class ExemploInterfaces : MonoBehaviour
{
    void Start()
    {
        // 1. Contrato IDamageable
        int dano = 30;
        Debug.Log("IDamageable: Tomou " + dano + " de dano");

        // 2. Contrato IInteractable
        string objeto = "Bau";
        Debug.Log("IInteractable: Interagiu com " + objeto);

        // 3. Polimorfismo com interfaces
        string[] entidades = { "Inimigo", "Barril" };
        for (int i = 0; i < entidades.Length; i++)
        {
            Debug.Log("Entidade Danificavel: " + entidades[i]);
        }

        // 4. Verificação de tipo com o operador is
        bool eDanificavel = true;
        if (eDanificavel)
        {
            Debug.Log("Alvo Implementa IDamageable");
        }

        // 5. Múltiplas interfaces em um objeto
        bool podeInteragir = true;
        bool podeDestruir = true;
        if (podeInteragir && podeDestruir)
        {
            Debug.Log("Porta: Interagivel e Destrutivel");
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Contratos de Interação e Combate em Cena",
            code: `using UnityEngine;

public class ContratosManager : MonoBehaviour
{
    void Start()
    {
        int d = 30;
        Debug.Log("IDamageable: Tomou " + d + " de dano");

        string obj = "Bau";
        Debug.Log("IInteractable: Interagiu com " + obj);

        string[] targets = { "Inimigo", "Barril" };
        for (int i = 0; i < targets.Length; i++)
        {
            Debug.Log("Entidade Danificavel: " + targets[i]);
        }

        bool danificavel = true;
        if (danificavel) Debug.Log("Alvo Implementa IDamageable");

        Debug.Log("Porta: Interagivel e Destrutivel");
    }
}`,
            output: `IDamageable: Tomou 30 de dano
IInteractable: Interagiu com Bau
Entidade Danificavel: Inimigo
Entidade Danificavel: Barril
Alvo Implementa IDamageable
Porta: Interagivel e Destrutivel`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 36 — TRATAMENTO DE EXCEÇÕES COM TRY/CATCH
    // ═══════════════════════════════════════════════════════
    36: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conjurando as Barricadas Defensivas de Código. Tratamento de Exceções e Resiliência ativos."
            },
            {
                type: "narrative",
                text: "Mira Solenn ergue proteções prismáticas contra anomalias lógicas. Se uma operação falhar no abismo da execução, o jogo resiste e não fecha para o jogador."
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "CARTÓGRAFA & ARTÍFICE",
                cssClass: "mira",
                text: "Em ambiente de produção, um jogo não pode simplesmente fechar sozinho ou quebrar a tela quando um arquivo de save estiver ausente ou ocorrer uma divisão por zero! Nós protegemos trechos críticos com blocos **Try / Catch**!"
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "No bloco <code>try</code>, tentamos a operação arriscada; no bloco <code>catch</code>, capturamos a exceção com segurança e emitimos um alerta sem quebrar o fluxo. E o bloco <code>finally</code> garante que arquivos sejam fechados e conexões liberadas, mesmo havendo erro!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Prevenções contra <code>DivideByZeroException</code>, checagens defensivas contra <code>NullReferenceException</code> e validações com <code>throw</code> garantem a robustez máxima do código."
            }
        ],
        concept: {
            title: "TRATAMENTO DE EXCEÇÕES EM C#: TRY, CATCH, FINALLY, PREVENÇÃO DE NULOS E LANÇAMENTO DE ERROS",
            explanation: `Tratamento de exceções previne que falhas inesperadas derrubem a aplicação:
<ul>
  <li><strong>Estrutura Try / Catch:</strong> Isola a execução de códigos suscetíveis a falhas e captura o erro sem travar a thread principal (ex: <code>"Processamento Seguro: 100"</code>).</li>
  <li><strong>Prevenção de Divisão por Zero:</strong> Validação condicional contra divisores nulos antes de realizar a operação (ex: se divisor == 0, emite <code>"Aviso: Divisao por Zero Evitada!"</code>).</li>
  <li><strong>Tratamento Defensivo contra Nulos:</strong> Verifica se uma referência a componente existe antes de acessar suas propriedades, evitando o clássico <code>NullReferenceException</code>.</li>
  <li><strong>Bloco Finally:</strong> Bloco garantido de execução incondicional ao término do try/catch, essencial para fechar arquivos abertos e liberar conexões (ex: <code>"Bloco Finally: Arquivo Fechado"</code>).</li>
  <li><strong>Lançamento de Erro Personalizado (throw):</strong> Interrompe fluxos ilegais quando requisitos mínimos de jogo não são atendidos (ex: nível de jogador insuficiente para entrar na masmorra).</li>
</ul>`,
            code: `using UnityEngine;
using System;

public class ExemploTratamentoExcecoes : MonoBehaviour
{
    void Start()
    {
        // 1. Processamento seguro com try/catch
        try
        {
            int valor = 100;
            Debug.Log("Processamento Seguro: " + valor);
        }
        catch (Exception e)
        {
            Debug.Log("Erro Capturado: " + e.Message);
        }

        // 2. Prevenção de divisão por zero
        int divisor = 0;
        if (divisor == 0)
        {
            Debug.Log("Aviso: Divisao por Zero Evitada!");
        }

        // 3. Checagem defensiva de componente nulo
        bool componenteExiste = false;
        if (!componenteExiste)
        {
            Debug.Log("Erro Evitado: Componente Nulo");
        }

        // 4. Bloco Finally de limpeza
        string statusLimpeza = "Bloco Finally: Arquivo Fechado";
        Debug.Log(statusLimpeza);

        // 5. Validação de nível e disparo controlado
        int nivelRequerido = 50;
        int nivelPlayer = 20;
        if (nivelPlayer < nivelRequerido)
        {
            Debug.Log("Excecao: Nivel Insuficiente para Entrar");
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Módulo Defensivo de Execução Segura",
            code: `using UnityEngine;
using System;

public class ResilienciaManager : MonoBehaviour
{
    void Start()
    {
        try
        {
            int v = 100;
            Debug.Log("Processamento Seguro: " + v);
        }
        catch (Exception)
        {
        }

        int div = 0;
        if (div == 0) Debug.Log("Aviso: Divisao por Zero Evitada!");

        bool comp = false;
        if (!comp) Debug.Log("Erro Evitado: Componente Nulo");

        Debug.Log("Bloco Finally: Arquivo Fechado");

        int req = 50;
        int ply = 20;
        if (ply < req) Debug.Log("Excecao: Nivel Insuficiente para Entrar");
    }
}`,
            output: `Processamento Seguro: 100
Aviso: Divisao por Zero Evitada!
Erro Evitado: Componente Nulo
Bloco Finally: Arquivo Fechado
Excecao: Nivel Insuficiente para Entrar`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 37 — OTIMIZAÇÃO, PROFILING E DRAW CALLS
    // ═══════════════════════════════════════════════════════
    37: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Calibrando o Ápice da Engenharia de Jogos. Profiling, Batching, Occlusion Culling e LODs ativados."
            },
            {
                type: "narrative",
                text: "O santuário ressoa em sua máxima capacidade computacional. Arkan Velor avalia o Profiler do Unity: a taxa de quadros é sólida como rocha e os draw calls despencam."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Chegamos ao último capítulo da Dimensão C#, Codemancer! Qualquer um pode programar um jogo que rode a 60 FPS com 5 objetos na tela. O verdadeiro Engenheiro de Jogos é aquele cujo mundo colossal, com milhares de entidades, roda fluido e estável em qualquer máquina!"
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Dominamos as quatro técnicas de ouro: **Batching** para agrupar 120 draw calls em apenas 25; **Occlusion Culling** para nunca renderizar o que está atrás de paredes; **LOD Groups** para reduzir a complexidade da malha quando a câmera está distante; e travamento de taxa de quadros estável com <code>Application.targetFrameRate</code>!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Ao concluir estas 5 atividades finais, você terá dominado a teoria, os exemplos e a prática completa dos 38 capítulos de C# e Unity 6.5. O Santuário da GuildCode saúda sua maestria dimensional!"
            }
        ],
        concept: {
            title: "OTIMIZAÇÃO PROFISSIONAL NO UNITY: DRAW CALLS, BATCHING, OCCLUSION CULLING, LOD GROUPS E TARGETFRAMERATE",
            explanation: `A otimização transforma uma simulação pesada em um jogo leve, rápido e com framerate cravado:
<ul>
  <li><strong>Redução de Draw Calls com Batching:</strong> A CPU envia ordens de desenho (draw calls) para a GPU. Agrupar múltiplos objetos estáticos ou dinâmicos reduz as chamadas drasticamente (ex: de 120 para 25 chamadas).</li>
  <li><strong>Ocultamento por Oclusão (Occlusion Culling):</strong> Desliga a renderização de qualquer geometria que esteja encoberta por outras paredes ou montanhas na visão da câmera (ex: renderizar apenas 150 de 1000 objetos na cena).</li>
  <li><strong>Níveis de Detalhe (LOD Groups):</strong> Substitui malhas altamente detalhadas (LOD0) por malhas simplificadas (LOD1 e LOD2) à medida que o objeto se afasta da câmera (ex: a mais de 50 metros, ativa LOD2 baixo).</li>
  <li><strong>Estabilidade de Taxa de Quadros (<code>Application.targetFrameRate</code>):</strong> Trava o framerate alvo (ex: 60 FPS) para evitar oscilações bruscas e aquecimento desnecessário de hardware.</li>
  <li><strong>Monitoramento no Unity Profiler:</strong> Inspeciona a alocação de memória e tempo de CPU por quadro (ex: medir memória gerenciada em 450.5 MB).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploOtimizacao : MonoBehaviour
{
    void Start()
    {
        // 1. Otimização de draw calls via batching
        int drawCallsAntes = 120;
        int drawCallsDepois = 25;
        Debug.Log("Draw Calls Reduzidos de " + drawCallsAntes + " para " + drawCallsDepois);

        // 2. Occlusion Culling (renderização apenas do visível)
        int objetosNaCena = 1000;
        int objetosRenderizados = 150;
        Debug.Log("Renderizados com Oclusao: " + objetosRenderizados + "/" + objetosNaCena);

        // 3. Nível de Detalhe (LOD Group) por distância
        float distanciaCamera = 60.0f;
        string lod = "LOD0 (Alto)";
        if (distanciaCamera >= 50.0f)
        {
            lod = "LOD2 (Baixo)";
        }
        Debug.Log("Malha Ativa: " + lod);

        // 4. Trava de taxa de quadros (targetFrameRate)
        int targetFps = 60;
        Debug.Log("Trava de FPS: " + targetFps + " FPS");

        // 5. Telemetria de memória no Profiler
        float memoriaUsadaMB = 450.5f;
        Debug.Log("Memoria Alocada: " + memoriaUsadaMB + " MB");
    }
}`
        },
        example: {
            title: "Exemplo Prático — Painel de Profiling e Diagnóstico de Performance",
            code: `using UnityEngine;

public class ProfilerDashboard : MonoBehaviour
{
    void Start()
    {
        int antes = 120;
        int depois = 25;
        Debug.Log("Draw Calls Reduzidos de " + antes + " para " + depois);

        int total = 1000;
        int visiveis = 150;
        Debug.Log("Renderizados com Oclusao: " + visiveis + "/" + total);

        float dist = 60.0f;
        string l = dist >= 50.0f ? "LOD2 (Baixo)" : "LOD0 (Alto)";
        Debug.Log("Malha Ativa: " + l);

        int fps = 60;
        Debug.Log("Trava de FPS: " + fps + " FPS");

        float mem = 450.5f;
        Debug.Log("Memoria Alocada: " + mem + " MB");
    }
}`,
            output: `Draw Calls Reduzidos de 120 para 25
Renderizados com Oclusao: 150/1000
Malha Ativa: LOD2 (Baixo)
Trava de FPS: 60 FPS
Memoria Alocada: 450.5 MB`
        }
    }
};
