// tools/csharp_updater/batch1.js - Capítulos 00 a 12
// Módulos 1, 2 e 3: Fundamentos de C#, Unity Core e Input System

module.exports = {
    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 00 — VARIÁVEIS E TIPOS DE DADOS
    // ═══════════════════════════════════════════════════════
    0: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conexão dimensional estabelecida. Núcleo C# & Unity 6.5 sincronizado com o Santuário."
            },
            {
                type: "narrative",
                text: "Linhas prismáticas de código flutuam no ar do grande salão da GuildCode. A realidade desta dimensão é regida pela forte tipagem e pela engine gráfica."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Bem-vindo à Dimensão C#, Codemancer! Diferente dos ponteiros brutos da dimensão anterior, aqui cada dado possui um propósito sagrado e um tipo estrito. Se você tentar guardar a velocidade decimal de um herói num recipiente inteiro, a engine rejeitará a simulação."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Nossos registros antigos mostram que variáveis são como frascos alquímicos rotulados: <code>int</code> para inteiros como vida e moedas, <code>float</code> com o sufixo <code>f</code> para grandezas contínuas, <code>string</code> para nomes e diálogos, <code>bool</code> para estados de verdade e <code>const</code> para leis imutáveis como a gravidade."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "A engine Unity utiliza <code>Debug.Log()</code> para projetar mensagens no Console. Preste atenção no sufixo <code>f</code> obrigatório em literais float e no operador de concatenação <code>+</code>. Complete as 5 atividades deste capítulo para estabilizar os primeiros parâmetros vitais da Guilda!"
            }
        ],
        concept: {
            title: "VARIÁVEIS, TIPOS PRIMITIVOS E CONSTANTES EM C#",
            explanation: `Em C# e no ecossistema da Unity, toda variável precisa ter seu <strong>tipo de dado explicitamente declarado</strong> antes de ser utilizada. Os principais tipos primitivos do motor são:
<ul>
  <li><code>int</code>: Números inteiros positivos ou negativos (ex: <code>int vida = 100;</code>, <code>int danoBase = 40;</code>, <code>int multiplicador = 2;</code>). Usado para contadores, vida, atributos e índices.</li>
  <li><code>float</code>: Números decimais de precisão simples. <strong>Obrigatório incluir o sufixo 'f'</strong> ao declarar literais (ex: <code>float velocidade = 7.5f;</code>, <code>float bonus = 5.5f;</code>, <code>float peso = massa * 10.0f;</code>). Se você esquecer o 'f', o compilador interpretará como <code>double</code> e gerará erro de conversão.</li>
  <li><code>string</code>: Sequências de texto delimitadas por aspas duplas (ex: <code>string heroi = "Kael";</code>). Pode ser combinada com outros valores usando concatenação com <code>+</code>.</li>
  <li><code>bool</code>: Valores lógicos booleanos, aceitando exclusivamente <code>true</code> ou <code>false</code> (ex: <code>bool estaPronto = true;</code>).</li>
  <li><code>char</code>: Um único caractere alfanumérico delimitado por aspas simples (ex: <code>char simbolo = 'G';</code>).</li>
  <li><code>const</code>: Modificador que define valores imutáveis em tempo de compilação (ex: <code>const float GRAVIDADE = -10.0f;</code>). Uma constante nunca pode ser reatribuída.</li>
</ul>
Para expressar cálculos no Unity, usamos operações aritméticas normais (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>) com parênteses para ditar a precedência: <code>float danoTotal = (danoBase * multiplicador) + bonus;</code>. A saída de mensagens é transmitida pelo método <code>Debug.Log(...)</code>.`,
            code: `using UnityEngine;

public class ExemploVariaveis : MonoBehaviour
{
    void Start()
    {
        // 1. Tipos inteiros e decimais (float exige o sufixo f)
        int vida = 100;
        int danoBase = 40;
        int multiplicador = 2;
        float velocidade = 7.5f;
        float bonus = 5.5f;

        // 2. Textos e caracteres
        string heroi = "Kael";
        char classeRank = 'S';

        // 3. Estado booleano e constantes imutáveis
        bool estaVivo = true;
        const float GRAVIDADE = -10.0f;

        // 4. Expressões aritméticas mistas
        float danoTotal = (danoBase * multiplicador) + bonus;

        // 5. Exibição formatada no Console do Unity
        Debug.Log("Heroi: " + heroi + " | Rank: " + classeRank);
        Debug.Log("Vida: " + vida + " | Velocidade: " + velocidade);
        Debug.Log("Dano Total: " + danoTotal);
        Debug.Log("Pronto: " + estaVivo + " | Gravidade: " + GRAVIDADE);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Ficha de Status do Herói",
            code: `using UnityEngine;

public class StatusHeroi : MonoBehaviour
{
    void Start()
    {
        string heroi = "Kael";
        int vida = 100;
        float velocidade = 7.5f;
        bool estaPronto = true;
        char simbolo = 'G';

        int danoBase = 40;
        int multiplicador = 2;
        float bonus = 5.5f;
        float danoTotal = (danoBase * multiplicador) + bonus;

        const float GRAVIDADE = -10.0f;
        int massa = 10;
        float peso = massa * 10.0f;

        Debug.Log("Heroi: " + heroi);
        Debug.Log("Velocidade: " + velocidade);
        Debug.Log("Vida: " + vida);
        Debug.Log("Dano Total: " + danoTotal);
        Debug.Log("Pronto: " + estaPronto + " | Classe: " + simbolo);
        Debug.Log("Gravidade: " + GRAVIDADE + " | Peso: " + peso);
    }
}`,
            output: `Heroi: Kael
Velocidade: 7.5
Vida: 100
Dano Total: 85.5
Pronto: True | Classe: G
Gravidade: -10 | Peso: 100`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 01 — OPERADORES E EXPRESSÕES
    // ═══════════════════════════════════════════════════════
    1: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Calibrando o Prisma Lógico da Dimensão C#. Subsistemas de cálculo e álgebra ativados."
            },
            {
                type: "narrative",
                text: "O brilho de glifos aritméticos preenche o observatório. Lyra Nex traça diagramas de fluxo enquanto cristais de mana ressoam ao redor."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Em combate ou na simulação física, um jogo calcula centenas de expressões por segundo! Quando um monstro atinge nosso herói, não recalculamos tudo do zero: aplicamos o operador composto de subtração <code>vida -= danoSofrido;</code>."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "E não se esqueça dos operadores lógicos e do operador de módulo <code>%</code>! Para alternar turnos ou ciclos de animação em intervalos regulares, o resto da divisão dita o ritmo exato. Já a lógica de combate exige checar se o guerreiro tem nível suficiente E a chave da masmorra: <code>nivel >= 10 && temChave</code>."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Lembre-se da distinção: divisão inteira entre inteiros descarta as casas decimais; para obter médias com precisão flutuante, divida por um número decimal como <code>2.0f</code>. Domine as regras de operadores compostos, módulo, conjunção <code>&&</code> e disjunção <code>||</code>."
            }
        ],
        concept: {
            title: "OPERADORES ARITMÉTICOS, COMPOSTOS E LÓGICOS",
            explanation: `Os operadores permitem manipular variáveis, calcular atributos e criar condições lógicas na Unity:
<ul>
  <li><strong>Operadores de Atribuição Composta:</strong> Simplificam a atualização de valores. Em vez de <code>vida = vida - dano;</code>, escreve-se <code>vida -= danoSofrido;</code>. Da mesma forma existem <code>+=</code>, <code>*=</code>, <code>/=</code> e <code>%=</code>.</li>
  <li><strong>Divisão Flutuante vs Inteira:</strong> Se você dividir dois inteiros (ex: <code>(8 + 6) / 2</code>), o resultado é inteiro. Para preservar a precisão decimal de médias ou taxas, garanta que pelo menos um operando seja float: <code>float media = (p1 + p2) / 2.0f;</code>.</li>
  <li><strong>Operador de Módulo (<code>%</code>):</strong> Retorna o resto da divisão inteira. É fundamental em games para controlar turnos, ciclos de frames e repetições cíclicas (ex: <code>int indiceCiclo = frameAtual % ciclo;</code>).</li>
  <li><strong>Operador Lógico E (<code>&&</code>):</strong> Retorna <code>true</code> apenas se <em>ambas</em> as expressões forem verdadeiras (ex: <code>bool podeAbrir = (nivel >= 10) && temChave;</code>).</li>
  <li><strong>Operador Lógico OU (<code>||</code>):</strong> Retorna <code>true</code> se <em>pelo menos uma</em> das condições for verdadeira (ex: <code>bool protegido = temEscudo || estaInvisivel;</code>).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploOperadores : MonoBehaviour
{
    void Start()
    {
        // 1. Operador composto de redução de vida
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido; // vida agora é 65

        // 2. Média com divisor float para precisão
        int p1 = 8;
        int p2 = 6;
        float media = (p1 + p2) / 2.0f;

        // 3. Controle cíclico com módulo (%)
        int frameAtual = 17;
        int ciclo = 4;
        int indiceCiclo = frameAtual % ciclo; // 17 % 4 = 1

        // 4. Operador lógico E (&&)
        int nivel = 15;
        bool temChave = true;
        bool podeAbrir = (nivel >= 10) && temChave;

        // 5. Operador lógico OU (||)
        bool temEscudo = false;
        bool estaInvisivel = true;
        bool protegido = temEscudo || estaInvisivel;

        Debug.Log("Vida Restante: " + vida);
        Debug.Log("Media: " + media);
        Debug.Log("Indice do Ciclo: " + indiceCiclo);
        Debug.Log("Acesso Permitido: " + podeAbrir);
        Debug.Log("Protegido: " + protegido);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Cálculos de Combate e Lógica de Acesso",
            code: `using UnityEngine;

public class OperadoresEmJogo : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        int danoSofrido = 35;
        vida -= danoSofrido;

        int p1 = 8;
        int p2 = 6;
        float media = (p1 + p2) / 2.0f;

        int frameAtual = 17;
        int ciclo = 4;
        int indice = frameAtual % ciclo;

        int nivel = 15;
        bool temChave = true;
        bool podeAbrir = nivel >= 10 && temChave;

        bool temEscudo = false;
        bool estaInvisivel = true;
        bool protegido = temEscudo || estaInvisivel;

        Debug.Log("Vida Restante: " + vida);
        Debug.Log("Media de Notas: " + media);
        Debug.Log("Indice do Ciclo: " + indice);
        Debug.Log("Acesso Permitido: " + podeAbrir);
        Debug.Log("Protegido: " + protegido);
    }
}`,
            output: `Vida Restante: 65
Media de Notas: 7
Indice do Ciclo: 1
Acesso Permitido: True
Protegido: True`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 02 — CONDICIONAIS (IF, ELSE, SWITCH)
    // ═══════════════════════════════════════════════════════
    2: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Inicializando a Bifurcação das Decisões. Portas lógicas de fluxo de controle ativadas."
            },
            {
                type: "narrative",
                text: "Diante de você erguem-se arcos de pedra com runas que se iluminam alternadamente dependendo das escolhas tomadas."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Um jogo sem decisões é um mundo estático. Toda interação no gameplay depende de bifurcações: se a vida do jogador for maior que zero, ele continua ativo; se chegar a zero, a tela de Game Over surge!"
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Para múltiplos níveis de mana ou faixas de dificuldade, encadeamos <code>if / else if / else</code>. E quando precisamos selecionar uma classe ou item a partir de um identificador fixo, a estrutura <code>switch-case</code> oferece a sintaxe mais elegante e performática."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Não se esqueça do operador ternário <code>condicao ? valorSeVerdade : valorSeFalso</code>, excelente para atribuições rápidas em linha única, como definir se um herói está descansado ou exausto com base em sua estamina."
            }
        ],
        concept: {
            title: "ESTRUTURAS CONDICIONAIS: IF, ELSE, SWITCH E OPERADOR TERNÁRIO",
            explanation: `Estruturas condicionais desviam o fluxo de execução do código de acordo com o estado do jogo:
<ul>
  <li><strong>If / Else Básico:</strong> Testa uma condição booleana. Se for verdadeira, executa o bloco <code>if</code>; caso contrário, executa o bloco <code>else</code> (ex: <code>if (vida > 0) Debug.Log("Status: Ativo"); else Debug.Log("Status: Game Over");</code>).</li>
  <li><strong>Comparações Relacionais:</strong> Operadores como <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>==</code> e <code>!=</code> avaliam limites numéricos (ex: <code>if (nivel &lt; 10) Debug.Log("Dificuldade: Normal"); else Debug.Log("Dificuldade: Heroica");</code>).</li>
  <li><strong>Ramos Múltiplos com Else If:</strong> Permite testar várias faixas ordenadas em cascata (ex: checar se mana >= 50 para 'Magia: Suprema', senão se mana >= 25 para 'Magia: Basica', senão 'Sem Mana').</li>
  <li><strong>Seleção com Switch-Case:</strong> Ideal para comparar uma variável contra múltiplos valores constantes. Cada caso deve ser encerrado com a instrução <code>break;</code> e pode conter uma cláusula <code>default:</code> para valores não mapeados.</li>
  <li><strong>Operador Ternário (<code>? :</code>):</strong> Uma forma compacta de if/else para atribuição de valores em uma linha: <code>string estado = (stamina >= 50) ? "Descansado" : "Exausto";</code>.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploCondicionais : MonoBehaviour
{
    void Start()
    {
        // 1. Checagem de sobrevivência (if / else)
        int vida = 0;
        if (vida > 0)
        {
            Debug.Log("Status: Ativo");
        }
        else
        {
            Debug.Log("Status: Game Over");
        }

        // 2. Classificação de dificuldade por nível
        int nivel = 12;
        if (nivel < 10)
        {
            Debug.Log("Dificuldade: Normal");
        }
        else
        {
            Debug.Log("Dificuldade: Heroica");
        }

        // 3. Ramos múltiplos com else if (nível de mana)
        int mana = 30;
        if (mana >= 50)
        {
            Debug.Log("Magia: Suprema");
        }
        else if (mana >= 25)
        {
            Debug.Log("Magia: Basica");
        }
        else
        {
            Debug.Log("Sem Mana");
        }

        // 4. Seleção com switch case
        int idClasse = 2;
        switch (idClasse)
        {
            case 1:
                Debug.Log("Classe: Guerreiro");
                break;
            case 2:
                Debug.Log("Classe: Mago");
                break;
            default:
                Debug.Log("Classe: Desconhecido");
                break;
        }

        // 5. Operador ternário
        int stamina = 60;
        string estado = (stamina >= 50) ? "Descansado" : "Exausto";
        Debug.Log("Estado: " + estado);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Árvore de Decisão do Jogador",
            code: `using UnityEngine;

public class DecisoesGameplay : MonoBehaviour
{
    void Start()
    {
        int vida = 100;
        if (vida > 0) Debug.Log("Status: Ativo");
        else Debug.Log("Status: Game Over");

        int nivel = 12;
        if (nivel < 10) Debug.Log("Dificuldade: Normal");
        else Debug.Log("Dificuldade: Heroica");

        int mana = 30;
        if (mana >= 50) Debug.Log("Magia: Suprema");
        else if (mana >= 25) Debug.Log("Magia: Basica");
        else Debug.Log("Sem Mana");

        int idClasse = 2;
        switch (idClasse)
        {
            case 1: Debug.Log("Classe: Guerreiro"); break;
            case 2: Debug.Log("Classe: Mago"); break;
            default: Debug.Log("Classe: Desconhecido"); break;
        }

        int stamina = 60;
        string estado = (stamina >= 50) ? "Descansado" : "Exausto";
        Debug.Log("Estado: " + estado);
    }
}`,
            output: `Status: Ativo
Dificuldade: Heroica
Magia: Basica
Classe: Mago
Estado: Descansado`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 03 — LOOPS (FOR, WHILE, FOREACH)
    // ═══════════════════════════════════════════════════════
    3: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Inicializando o Motor de Repetição Contínua. Laços iterativos calibrados."
            },
            {
                type: "narrative",
                text: "Engrenagens colossais de mana giram em sincronia na torre central. Elion Raven analisa sequências numéricas que se repetem com precisão milimétrica."
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA",
                cssClass: "elion",
                text: "Em desenvolvimento de jogos, repetir código manualmente é o caminho mais rápido para corrupção de memória. Quando precisamos gerar ondas de inimigos, computar pontuações acumuladas ou vasculhar itens, usamos laços de repetição!"
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "O laço <code>for</code> é a ferramenta ideal quando sabemos a contagem exata de iterações. Já o <code>while</code> repousa sobre uma condição dinâmica, perfeito para contagens regressivas ou timers. Mas atenção: nunca esqueça de atualizar a variável de controle do while, ou causará um congelamento eterno!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Aprenda também a controlar o fluxo dos loops: <code>continue</code> pula imediatamente para a próxima iteração (ótimo para ignorar ímpares ao filtrar pares), enquanto <code>break</code> encerra o laço na hora em que o alvo for localizado."
            }
        ],
        concept: {
            title: "LAÇOS DE REPETIÇÃO: FOR, WHILE, BREAK E CONTINUE",
            explanation: `Loops executam blocos de código repetidas vezes até que uma condição de parada seja atingida:
<ul>
  <li><strong>Laço For Contado:</strong> Possui inicialização, condição de continuidade e incremento em sua declaração. Muito usado para spawns sequenciais: <code>for (int i = 1; i &lt;= 3; i++) Debug.Log("Inimigo #" + i + " gerado");</code>.</li>
  <li><strong>Laço While:</strong> Executa enquanto sua condição for avaliada como verdadeira. Essencial para contagens regressivas: <code>while (timer &gt; 0) { Debug.Log("T-" + timer); timer--; }</code>.</li>
  <li><strong>Acumulação em Laço:</strong> Podemos somar pontuações acumuladas declarando um acumulador antes do loop: <code>int totalPontos = 0; for (int i = 1; i &lt;= 4; i++) totalPontos += i * 10;</code>.</li>
  <li><strong>Instrução Continue:</strong> Pula o restante do corpo do laço e avança direto para a próxima iteração. Útil para filtragem (ex: <code>if (i % 2 != 0) continue;</code> ignora ímpares e processa apenas pares).</li>
  <li><strong>Instrução Break:</strong> Interrompe imediatamente a execução do loop, saindo do bloco mesmo que a condição principal ainda fosse verdadeira (ex: parar assim que encontrar o alvo no passo 3).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploLoops : MonoBehaviour
{
    void Start()
    {
        // 1. For: Spawn de ondas de monstros
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }

        // 2. While: Contagem regressiva
        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }

        // 3. Somatório acumulado
        int totalPontos = 0;
        for (int i = 1; i <= 4; i++)
        {
            totalPontos += i * 10;
        }
        Debug.Log("Total Acumulado: " + totalPontos);

        // 4. Continue: Filtrando apenas pares
        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }

        // 5. Break: Interrupção imediata
        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Gerenciador de Ondas e Temporizador",
            code: `using UnityEngine;

public class LoopManager : MonoBehaviour
{
    void Start()
    {
        for (int i = 1; i <= 3; i++)
        {
            Debug.Log("Inimigo #" + i + " gerado");
        }

        int timer = 3;
        while (timer > 0)
        {
            Debug.Log("T-" + timer);
            timer--;
        }

        int total = 0;
        for (int i = 1; i <= 4; i++) total += i * 10;
        Debug.Log("Total Acumulado: " + total);

        for (int i = 1; i <= 5; i++)
        {
            if (i % 2 != 0) continue;
            Debug.Log("Par: " + i);
        }

        for (int i = 1; i <= 10; i++)
        {
            if (i == 3)
            {
                Debug.Log("Alvo Encontrado no passo 3");
                break;
            }
        }
    }
}`,
            output: `Inimigo #1 gerado
Inimigo #2 gerado
Inimigo #3 gerado
T-3
T-2
T-1
Total Acumulado: 100
Par: 2
Par: 4
Alvo Encontrado no passo 3`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 04 — FUNÇÕES E MÉTODOS
    // ═══════════════════════════════════════════════════════
    4: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Abrindo a Matriz de Métodos e Funções Modulares. Encapsulamento lógico ativo."
            },
            {
                type: "narrative",
                text: "Lyra Nex posiciona cilindros rúnicos interconectados. Ao acionar uma runa-mestre, todas as ramificações executam suas sub-rotinas em harmonia."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Conjuradores novatos escrevem centenas de linhas repetidas dentro de um único bloco. Mestres de C#, por outro lado, dividem o problema em métodos reutilizáveis com responsabilidade única!"
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Existem dois tipos fundamentais de métodos: os procedimentos <code>void</code>, que realizam ações sem devolver nada (como exibir boas-vindas), e as funções com tipo de retorno específico, como <code>int Dobrar(int valor)</code>, <code>int CalcularCritico(int dano, int multiplicador)</code> ou <code>bool EstaVivo(int vidaAtual)</code>."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Métodos podem receber múltiplos parâmetros de tipos variados e retornar valores formatados, como <code>string FormatarNome(string nome, int nivel)</code>. Observe a instrução <code>return</code> obrigatória em métodos com retorno tipado."
            }
        ],
        concept: {
            title: "MÉTODOS EM C#: PROCEDIMENTOS VOID, PARÂMETROS E RETORNOS TIPADOS",
            explanation: `Métodos são blocos nomeados de instruções que executam uma tarefa e podem ser chamados repetidas vezes:
<ul>
  <li><strong>Método Void:</strong> Não devolve nenhum valor de volta ao invocador. É usado para desencadear ações e logs (ex: <code>void ExibirBoasVindas() { Debug.Log("Bem-vindo ao Unity 6.5"); }</code>).</li>
  <li><strong>Método com Retorno Primitivo:</strong> Declara o tipo que será retornado antes do nome do método. A palavra-chave <code>return</code> devolve o resultado para a variável que o chamou (ex: <code>int Dobrar(int valor) { return valor * 2; }</code>).</li>
  <li><strong>Múltiplos Parâmetros:</strong> Métodos podem receber dois ou mais argumentos separados por vírgula para cálculos complexos (ex: <code>int CalcularCritico(int dano, int multiplicador) { return dano * multiplicador; }</code>).</li>
  <li><strong>Retornos Booleanos:</strong> Avaliam condições lógicas e retornam <code>true</code> ou <code>false</code> (ex: <code>bool EstaVivo(int vidaAtual) { return vidaAtual &gt; 0; }</code>).</li>
  <li><strong>Formatação e Strings:</strong> Métodos podem combinar textos e atributos formatando cabeçalhos de jogo (ex: <code>string FormatarNome(string nome, int nivel) { return "Player: " + nome + " [Lv " + nivel + "]"; }</code>).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploFuncoes : MonoBehaviour
{
    // Método void sem retorno
    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }

    // Função que dobra um valor inteiro
    int Dobrar(int valor)
    {
        return valor * 2;
    }

    // Função de cálculo de dano crítico com 2 parâmetros
    int CalcularCritico(int dano, int multiplicador)
    {
        return dano * multiplicador;
    }

    // Função de checagem booleana
    bool EstaVivo(int vidaAtual)
    {
        return vidaAtual > 0;
    }

    // Função de formatação textual
    string FormatarNome(string nome, int nivel)
    {
        return "Player: " + nome + " [Lv " + nivel + "]";
    }

    void Start()
    {
        ExibirBoasVindas();

        int res = Dobrar(25);
        Debug.Log("Resultado: " + res);

        int crit = CalcularCritico(50, 3);
        Debug.Log("Dano Critico: " + crit);

        bool vivo = EstaVivo(10);
        Debug.Log("Heroi Vivo: " + vivo);

        string rotulo = FormatarNome("Arkan", 20);
        Debug.Log(rotulo);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Biblioteca de Fórmulas da Guilda",
            code: `using UnityEngine;

public class FormulasCombate : MonoBehaviour
{
    void ExibirBoasVindas()
    {
        Debug.Log("Bem-vindo ao Unity 6.5");
    }

    int Dobrar(int valor)
    {
        return valor * 2;
    }

    int CalcularCritico(int dano, int multiplicador)
    {
        return dano * multiplicador;
    }

    bool EstaVivo(int vidaAtual)
    {
        return vidaAtual > 0;
    }

    string FormatarNome(string nome, int nivel)
    {
        return "Player: " + nome + " [Lv " + nivel + "]";
    }

    void Start()
    {
        ExibirBoasVindas();
        Debug.Log("Resultado: " + Dobrar(25));
        Debug.Log("Dano Critico: " + CalcularCritico(50, 3));
        Debug.Log("Heroi Vivo: " + EstaVivo(10));
        Debug.Log(FormatarNome("Arkan", 20));
    }
}`,
            output: `Bem-vindo ao Unity 6.5
Resultado: 50
Dano Critico: 150
Heroi Vivo: True
Player: Arkan [Lv 20]`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 05 — ARRAYS E LISTAS
    // ═══════════════════════════════════════════════════════
    5: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Despertando a Armaria e o Banco de Dados Contíguo. Coleções estruturadas ativas."
            },
            {
                type: "narrative",
                text: "Kael Thorn martela uma lâmina reluzente sobre a bigorna rúnica, organizando dezenas de peças forjadas em prateleiras demarcadas por índices."
            },
            {
                type: "character",
                name: "KAEL DRAVEN",
                role: "FERREIRO DE CÓDIGO",
                cssClass: "kael",
                text: "Um guerreiro de respeito não carrega uma variável solta para cada item! Ele precisa de coleções ordenadas. Quando o tamanho é fixo e imutável, usamos Arrays como <code>string[] itens</code> ou <code>int[] pontuacoes</code>."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Mas no calor da aventura, o inventário muda constantemente: novas poções são coletadas com <code>.Add()</code> e pergaminhos usados são descartados com <code>.Remove()</code>. Para coleções dinâmicas, utilizamos <code>List&lt;T&gt;</code>!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Lembre-se: em C#, coleções utilizam indexação baseada em zero (<code>itens[0]</code>). Arrays fixos possuem a propriedade <code>.Length</code>, enquanto listas dinâmicas utilizam <code>.Count</code>. Domine ambos para gerenciar inventários e ranqueamentos."
            }
        ],
        concept: {
            title: "COLEÇÕES EM C#: ARRAYS FIXOS E LISTAS DINÂMICAS (LIST<T>)",
            explanation: `Coleções agrupam múltiplos elementos do mesmo tipo sob um único identificador:
<ul>
  <li><strong>Arrays Unidimensionais Fixos:</strong> Têm tamanho definido na criação. Acessam elementos pelo índice de 0 até tamanho - 1: <code>string[] itens = { "Espada", "Escudo", "Pocao" };</code>. O primeiro item é obtido com <code>itens[0]</code> e o total com <code>itens.Length</code>.</li>
  <li><strong>Iteração em Arrays:</strong> Podemos percorrer todos os valores com laços for ou foreach: <code>for (int i = 0; i &lt; pontuacoes.Length; i++) Debug.Log("Pontos: " + pontuacoes[i]);</code>.</li>
  <li><strong>Listas Dinâmicas (<code>List&lt;T&gt;</code>):</strong> Pertencem ao namespace <code>System.Collections.Generic</code> e podem crescer ou diminuir em tempo de execução: <code>List&lt;string&gt; inventario = new List&lt;string&gt;();</code>.</li>
  <li><strong>Adição e Remoção:</strong> Adicionamos itens com <code>.Add("Elmo")</code> e removemos com <code>.Remove("Fogo")</code>. O total de itens de uma lista é obtido pela propriedade <code>.Count</code>.</li>
  <li><strong>Busca de Maior Valor:</strong> Para descobrir o ápice de pontuação em um array, iniciamos uma variável auxiliar com o primeiro elemento e comparamos cada item subsequente dentro de um laço com <code>if (valores[i] &gt; maior) maior = valores[i];</code>.</li>
</ul>`,
            code: `using UnityEngine;
using System.Collections.Generic;

public class ExemploColecoes : MonoBehaviour
{
    void Start()
    {
        // 1. Array fixo de strings e acesso por índice
        string[] itens = { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + itens[0]);

        // 2. Iteração sobre array de números
        int[] pontuacoes = { 10, 20, 30 };
        for (int i = 0; i < pontuacoes.Length; i++)
        {
            Debug.Log("Pontos: " + pontuacoes[i]);
        }

        // 3. Lista dinâmica com Add e contagem .Count
        List<string> inventario = new List<string>();
        inventario.Add("Elmo");
        inventario.Add("Bota");
        Debug.Log("Total de Itens: " + inventario.Count);

        // 4. Remoção de elementos de List<T>
        List<string> poderes = new List<string>() { "Fogo", "Gelo" };
        poderes.Remove("Fogo");
        Debug.Log("Poder Ativo: " + poderes[0]);

        // 5. Determinação do maior elemento em array
        int[] valores = { 15, 82, 43 };
        int maior = valores[0];
        for (int i = 1; i < valores.Length; i++)
        {
            if (valores[i] > maior)
            {
                maior = valores[i];
            }
        }
        Debug.Log("Maior: " + maior);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Gerenciamento do Inventário do Herói",
            code: `using UnityEngine;
using System.Collections.Generic;

public class InventarioManager : MonoBehaviour
{
    void Start()
    {
        string[] equipamentos = { "Espada", "Escudo", "Pocao" };
        Debug.Log("Item Equipado: " + equipamentos[0]);

        int[] scores = { 10, 20, 30 };
        for (int i = 0; i < scores.Length; i++)
        {
            Debug.Log("Pontos: " + scores[i]);
        }

        List<string> mochila = new List<string>();
        mochila.Add("Elmo");
        mochila.Add("Bota");
        Debug.Log("Total de Itens: " + mochila.Count);

        List<string> magias = new List<string>() { "Fogo", "Gelo" };
        magias.Remove("Fogo");
        Debug.Log("Poder Ativo: " + magias[0]);

        int[] numeros = { 15, 82, 43 };
        int maior = numeros[0];
        for (int i = 1; i < numeros.Length; i++)
        {
            if (numeros[i] > maior) maior = numeros[i];
        }
        Debug.Log("Maior: " + maior);
    }
}`,
            output: `Item Equipado: Espada
Pontos: 10
Pontos: 20
Pontos: 30
Total de Itens: 2
Poder Ativo: Gelo
Maior: 82`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 06 — CLASSES E OBJETOS (OOP)
    // ═══════════════════════════════════════════════════════
    6: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conjurando os Pilares da Orientação a Objetos. Matriz de blueprints ativada."
            },
            {
                type: "narrative",
                text: "Mira Solenn projeta hologramas tridimensionais de construtos e entidades no centro do ateliê arcano. Cada molde gera instâncias vivas e autônomas."
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "CARTÓGRAFA & ARTÍFICE",
                cssClass: "mira",
                text: "Uma classe é o molde sagrado, a planta arquitetônica de uma entidade. Quando invocamos a palavra-chave <code>new</code>, damos vida a um objeto concreto que possui seus próprios dados e comportamentos!"
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Para inicializar um objeto com valores corretos desde o nascimento, utilizamos métodos construtores. Para proteger campos críticos contra alterações descontroladas, empregamos propriedades com <code>{ get; set; }</code>, garantindo o encapsulamento seguro."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Neste capítulo, você aprenderá a instanciar entidades, configurar atributos em construtores, trabalhar com métodos de instância para desferir ataques e rastrear a contagem de inimigos ativos na simulação."
            }
        ],
        concept: {
            title: "PROGRAMAÇÃO ORIENTADA A OBJETOS: CLASSES, CONSTRUTORES, PROPRIEDADES E INSTÂNCIAS",
            explanation: `A Programação Orientada a Objetos (OOP) modela o jogo em torno de entidades que combinam dados (campos e propriedades) e ações (métodos):
<ul>
  <li><strong>Classes e Instanciação:</strong> Uma classe define a estrutura. Criamos uma instância usando <code>new NomeDaClasse()</code>: <code>ItemEspada item = new ItemEspada(); item.nome = "Espada"; item.poder = 45;</code>.</li>
  <li><strong>Método Construtor:</strong> Método especial com o mesmo nome da classe, sem tipo de retorno, invocado automaticamente na criação: <code>public Entidade(string h, int n) { heroi = h; nivel = n; }</code>.</li>
  <li><strong>Encapsulamento com Propriedades (<code>{ get; set; }</code>):</strong> Protege e controla o acesso a variáveis internas, permitindo expor valores de forma segura (ex: <code>public int VidaAtual { get; set; }</code> e <code>public int VidaMaxima { get; set; }</code>).</li>
  <li><strong>Métodos de Instância:</strong> Métodos que operam sobre os dados da própria instância, como calcular danoCausado a partir de um danoBase multiplicado pela forca: <code>public int DesferirAtaque() { return danoBase * forca; }</code>.</li>
  <li><strong>Rastreamento de Instâncias:</strong> Controla a quantidade de entidades presentes na cena gerenciando contadores e geradores de instâncias.</li>
</ul>`,
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
            output: `Item: Espada | Poder: 45
Entidade: Kael | Nivel: 10
Vida: 75/100
Ataque Desferido: 60
Inimigos Ativos: 2`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 07 — HERANÇA E POLIMORFISMO
    // ═══════════════════════════════════════════════════════
    7: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Despertando as Linhagens e Especializações Arcanas. Herança e Polimorfismo sincronizados."
            },
            {
                type: "narrative",
                text: "O estandarte da GuildCode tremula no topo da muralha. Diferentes classes de guerreiros e arcanistas reúnem-se sob a mesma hierarquia de combate."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Todos os membros de nossa ordem descendem do mesmo arquétipo base de combatente. Mas quando um Mago conjura chamas e um Guerreiro empunha sua espada, cada um expressa sua vocação de forma única. Isso é Polimorfismo!"
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Em C#, uma classe derivada herda membros com a sintaxe <code>class Mago : Personagem</code>. Podemos sobrescrever métodos usando <code>virtual</code> na base e <code>override</code> na subclasse, invocando a lógica ancestral com <code>base.Metodo()</code>."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "O polimorfismo também nos permite tratar múltiplos guerreiros e arqueiros como uma lista de ações compartilhadas, além de aplicar cálculos dinâmicos de redução de dano por armadura."
            }
        ],
        concept: {
            title: "HERANÇA, POLIMORFISMO, OVERRIDE E REUTILIZAÇÃO DE CÓDIGO BASE",
            explanation: `Herança e polimorfismo permitem criar hierarquias extensíveis sem duplicar código:
<ul>
  <li><strong>Herança (<code>class Sub : Base</code>):</strong> Permite que uma classe filha herde atributos e métodos de uma classe pai (ex: um <code>Guerreiro</code> herdando características de <code>Personagem</code>).</li>
  <li><strong>Sobrescrita Polimórfica (<code>override</code>):</strong> Quando um método pai é declarado como <code>virtual</code>, a classe derivada pode reescrever seu comportamento com <code>override</code> (ex: emitir <code>classe + " atacando com " + arma + "!"</code>).</li>
  <li><strong>Especialização de Classes:</strong> Subclasses como <code>Mago</code> podem ter habilidades exclusivas (ex: tipoInimigo 'Mago' conjurando 'Bola de Fogo').</li>
  <li><strong>Chamada do Método Base (<code>base.Metodo()</code>):</strong> Garante que a inicialização original da classe pai seja executada antes de adicionar comportamentos da subclasse (ex: 'Base: Inicializado' seguido de 'Derivado: Equipamento Carregado').</li>
  <li><strong>Cálculo de Dano Polimórfico:</strong> Aplicações como redução de dano por armadura (<code>int danoReal = danoRecebido - reducaoArmadura;</code>) e listas polimórficas de ações de combate iteradas sequencialmente.</li>
</ul>`,
            code: `using UnityEngine;

// Classe ancestral
public class CombatenteBase
{
    public virtual void Atacar()
    {
        Debug.Log("Base: Inicializado");
    }

    public virtual int CalcularDanoReal(int dano, int armadura)
    {
        return dano - armadura;
    }
}

// Subclasse especializada
public class GuerreiroEspecialista : CombatenteBase
{
    public override void Atacar()
    {
        base.Atacar();
        Debug.Log("Derivado: Equipamento Carregado");
    }
}

public class ExemploHeranca : MonoBehaviour
{
    void Start()
    {
        // 1. Sobrescrita de ação de combate
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");

        // 2. Subclasse Mago com habilidade arcana
        string tipoInimigo = "Mago";
        string magia = "Bola de Fogo";
        Debug.Log(tipoInimigo + " conjurando " + magia + "!");

        // 3. Sequência Base e Derivado
        Debug.Log("Base: Inicializado");
        Debug.Log("Derivado: Equipamento Carregado");

        // 4. Cálculo de dano com redução de armadura
        int danoRecebido = 50;
        int reducaoArmadura = 15;
        int danoReal = danoRecebido - reducaoArmadura;
        Debug.Log("Dano Sofrido: " + danoReal);

        // 5. Lista polimórfica de ações
        string[] acoes = { "Arqueiro Dispara", "Guerreiro Golpeia" };
        for (int i = 0; i < acoes.Length; i++)
        {
            Debug.Log(acoes[i]);
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Batalha Polimórfica da Guilda",
            code: `using UnityEngine;

public class BatalhaPolimorfica : MonoBehaviour
{
    void Start()
    {
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");

        string tipoInimigo = "Mago";
        string magia = "Bola de Fogo";
        Debug.Log(tipoInimigo + " conjurando " + magia + "!");

        Debug.Log("Base: Inicializado");
        Debug.Log("Derivado: Equipamento Carregado");

        int dano = 50;
        int armadura = 15;
        int final = dano - armadura;
        Debug.Log("Dano Sofrido: " + final);

        string[] golpes = { "Arqueiro Dispara", "Guerreiro Golpeia" };
        for (int i = 0; i < golpes.Length; i++)
        {
            Debug.Log(golpes[i]);
        }
    }
}`,
            output: `Guerreiro atacando com Espada!
Mago conjurando Bola de Fogo!
Base: Inicializado
Derivado: Equipamento Carregado
Dano Sofrido: 35
Arqueiro Dispara
Guerreiro Golpeia`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 08 — GAMEOBJECTS E COMPONENTS
    // ═══════════════════════════════════════════════════════
    8: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Entrando no Módulo 2 — Fundamentos do Unity. Hierarquia da Cena e Componentes sincronizados."
            },
            {
                type: "narrative",
                text: "A arquitetura do mundo ganha profundidade espacial. Entidades deixam de ser simples classes de memória e se manifestam como GameObjects completos no cenário 3D."
            },
            {
                type: "character",
                name: "ORIN VALE",
                role: "EXPLORADOR DE CENÁRIOS",
                cssClass: "orin",
                text: "No Unity, um <code>GameObject</code> é uma entidade vazia por si só — como um manequim. Seu poder vem dos <strong>Components</strong> anexados a ele! Um colisor dá solidez, um renderer dá aparência e um script dá inteligência."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Podemos identificar qualquer entidade na cena lendo sua propriedade <code>gameObject.name</code> ou verificando sua etiqueta com <code>tag == 'Player'</code>. Para obter referência a outro componente acoplado ao objeto, utilizamos <code>GetComponent&lt;Rigidbody&gt;()</code>."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Um GameObject também pode ser ativado ou desativado com <code>SetActive(true/false)</code>, e inspecionado para saber o total de componentes que possui acoplados."
            }
        ],
        concept: {
            title: "ARQUITETURA COMPONENTE-ENTIDADE DO UNITY: GAMEOBJECTS E COMPONENTS",
            explanation: `O Unity utiliza um modelo de Composição em vez de herança pura. Toda entidade na cena é um <code>GameObject</code>:
<ul>
  <li><strong>Nome do GameObject:</strong> Acessível através da propriedade <code>gameObject.name</code> (ex: verificar se o nome do jogador é "Jogador").</li>
  <li><strong>Tags de Identificação:</strong> Tags categorizam GameObjects na cena. Comparar <code>tag == "Player"</code> permite saber se o objeto é o protagonista antes de executar lógicas sensíveis.</li>
  <li><strong>Busca de Componentes com GetComponent:</strong> O método <code>GetComponent&lt;T&gt;()</code> pesquisa um componente do tipo especificado anexado ao mesmo GameObject (ex: verificar se existe um <code>Rigidbody</code> acoplado para aplicar forças físicas).</li>
  <li><strong>Estado Ativo (<code>activeSelf</code> / <code>SetActive</code>):</strong> Determina se o GameObject está participando da simulação ou desativado em segundo plano (ex: <code>bool estaAtivo = true;</code>).</li>
  <li><strong>Contagem e Conjuntos de Componentes:</strong> GameObjects contêm conjuntos de componentes essenciais (ex: <code>Transform</code>, <code>MeshRenderer</code>, <code>Collider</code>), cujo total pode ser verificado através da contagem de referências.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploGameObjects : MonoBehaviour
{
    void Start()
    {
        // 1. Identificação pelo nome do GameObject
        string nomeObjeto = gameObject.name;
        Debug.Log("GameObject: " + nomeObjeto);

        // 2. Verificação de Tag de categoria
        string tagObjeto = "Player";
        if (tagObjeto == "Player")
        {
            Debug.Log("Tag Valida: Player");
        }

        // 3. Simulação de busca com GetComponent<Rigidbody>
        bool temRigidbody = true;
        if (temRigidbody)
        {
            Debug.Log("Componente Rigidbody Encontrado");
        }

        // 4. Estado de ativação na cena
        bool estaAtivo = true;
        Debug.Log("GameObject Ativo: " + estaAtivo);

        // 5. Total de componentes estruturais
        string[] componentes = { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + componentes.Length);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Diagnóstico de Entidade na Cena Unity",
            code: `using UnityEngine;

public class DiagnosticoCena : MonoBehaviour
{
    void Start()
    {
        Debug.Log("GameObject: Jogador");

        string tag = "Player";
        if (tag == "Player") Debug.Log("Tag Valida: Player");

        bool temRigidbody = true;
        if (temRigidbody) Debug.Log("Componente Rigidbody Encontrado");

        bool ativo = true;
        Debug.Log("GameObject Ativo: " + ativo);

        string[] comps = { "Transform", "MeshRenderer", "Collider" };
        Debug.Log("Total de Componentes: " + comps.Length);
    }
}`,
            output: `GameObject: Jogador
Tag Valida: Player
Componente Rigidbody Encontrado
GameObject Ativo: True
Total de Componentes: 3`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 09 — TRANSFORM — POSIÇÃO, ROTAÇÃO E ESCALA
    // ═══════════════════════════════════════════════════════
    9: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Alinhando os Eixos Espaciais. Componente Transform carregado na raiz de todas as entidades."
            },
            {
                type: "narrative",
                text: "Grid tridimensionais em azul (Z), vermelho (X) e verde (Y) desenham-se sobre a sala dimensional. Lyra Nex rotaciona prismas flutuantes com movimentos precisos."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "Existe um único componente que todo GameObject possui obrigatoriamente e nunca pode ser removido: o <strong>Transform</strong>! Ele define onde a entidade existe no espaço (position), para onde ela olha (rotation) e quão grande ela é (localScale)."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Para deslocar um personagem suavemente, usamos <code>transform.Translate()</code> multiplicando a velocidade pelo tempo decorrido (<code>dt</code>). Para girar, aplicamos rotações ao redor do eixo Y, e para saber a direção frontal do herói, lemos o vetor <code>transform.forward</code>."
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Entenda o cálculo de deslocamento: <code>velocidade * deltaTime</code> garante que a movimentação seja independente da taxa de quadros (framerate) do jogo."
            }
        ],
        concept: {
            title: "O COMPONENTE TRANSFORM: POSIÇÃO, DESLOCAMENTO, ESCALA E ROTAÇÃO",
            explanation: `O componente <code>Transform</code> gerencia a geometria e localização de qualquer entidade no espaço 3D:
<ul>
  <li><strong>Posição (<code>transform.position</code>):</strong> Um <code>Vector3</code> que guarda as coordenadas X (horizontal), Y (altura) e Z (profundidade). Podemos inspecionar coordenadas individuais com <code>transform.position.x</code>.</li>
  <li><strong>Deslocamento Suave (Translate):</strong> Em jogos, deslocamentos no tempo utilizam a fórmula clássica da física: <code>deslocamento = velocidade * deltaTime</code> (ex: <code>float vel = 5.0f; float dt = 0.016f; float deslocamento = vel * dt;</code>).</li>
  <li><strong>Escala Local (<code>transform.localScale</code>):</strong> Multiplicador de tamanho do objeto em relação ao seu modelo original (ex: redimensionar escalaX e escalaY para 2.0f gera a nova escala <code>(2, 2)</code>).</li>
  <li><strong>Rotação Angular:</strong> Rotação ao redor do eixo vertical Y em graus por segundo (ex: <code>float velRotacao = 90.0f;</code> girando o personagem 90 graus/s).</li>
  <li><strong>Vetor Direcional Forward (<code>transform.forward</code>):</strong> Vetor unitário que aponta exatamente para a frente de onde o objeto está olhando (sua coordenada <code>transform.forward.z</code> indica a orientação frontal).</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploTransform : MonoBehaviour
{
    void Start()
    {
        // 1. Leitura de coordenada de posição
        float posX = transform.position.x;
        Debug.Log("Posicao X: " + posX);

        // 2. Cálculo de deslocamento proporcional ao tempo
        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);

        // 3. Ajuste de escala local
        float escalaX = 2.0f;
        float escalaY = 2.0f;
        Debug.Log("Nova Escala: (" + escalaX + ", " + escalaY + ")");

        // 4. Rotação em torno do eixo Y
        float velRotacao = 90.0f;
        Debug.Log("Rotacao Y: " + velRotacao + " graus/s");

        // 5. Vetor direcional frontal (forward)
        float direcaoZ = transform.forward.z;
        Debug.Log("Direcao Z: " + direcaoZ);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Movimentação e Orientação Espacial",
            code: `using UnityEngine;

public class ControladorTransform : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Posicao X: " + transform.position.x);

        float vel = 5.0f;
        float dt = 0.016f;
        float deslocamento = vel * dt;
        Debug.Log("Deslocamento: " + deslocamento);

        float sx = 2.0f;
        float sy = 2.0f;
        Debug.Log("Nova Escala: (" + sx + ", " + sy + ")");

        float velRot = 90.0f;
        Debug.Log("Rotacao Y: " + velRot + " graus/s");

        Debug.Log("Direcao Z: " + transform.forward.z);
    }
}`,
            output: `Posicao X: 0
Deslocamento: 0.08
Nova Escala: (2, 2)
Rotacao Y: 90 graus/s
Direcao Z: 1`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 10 — CICLO DE VIDA DO MONOBEHAVIOUR
    // ═══════════════════════════════════════════════════════
    10: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Conectando ao Clock Universal da Engine. Ciclo de vida de execução de scripts inicializado."
            },
            {
                type: "narrative",
                text: "O pulso rítmico da dimensão dita a frequência dos eventos. Arkan Velor desenha a linha do tempo sequencial dos métodos internos da Unity."
            },
            {
                type: "character",
                name: "ARKAN VELOR",
                role: "MESTRE DA GUILDA",
                cssClass: "arkan",
                text: "Um script herdado de <code>MonoBehaviour</code> não possui uma função main() comum! A engine invoca automaticamente métodos específicos em cada fase da vida do objeto: nascimento, atualização de quadro, física e morte."
            },
            {
                type: "character",
                name: "LYRA NEX",
                role: "ARQUIVISTA",
                cssClass: "lyra",
                text: "A ordem sagrada de nascimento é imutável: <code>Awake()</code> é chamado primeiro para autoinicialização, seguido de <code>Start()</code> para conexões com outros scripts. Depois vem o loop contínuo: <code>Update()</code> roda a cada frame gráfico, <code>FixedUpdate()</code> a cada 0.02s para física determinística e <code>LateUpdate()</code> para câmeras seguirem personagens após eles terem se movido!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Quando uma entidade é destruída ou sai da cena, <code>OnDestroy()</code> é disparado para liberar recursos e cancelar assinaturas. Conhecer essa linha do tempo evita as armadilhas mais comuns de NullReferenceException em jogos."
            }
        ],
        concept: {
            title: "O CICLO DE VIDA DO MONOBEHAVIOUR: AWAKE, START, UPDATE, FIXEDUPDATE E LATEUPDATE",
            explanation: `Os métodos do ciclo de vida são chamados automaticamente pela Unity em momentos precisos:
<ul>
  <li><strong>Awake() vs Start():</strong> <code>Awake()</code> roda assim que o prefab/objeto nasce na memória, ideal para referências internas. <code>Start()</code> roda logo antes do primeiro frame, ideal para lógicas de inicialização compartilhada (ex: em Awake emite '1. Awake' e em Start emite '2. Start').</li>
  <li><strong>Update():</strong> Executado uma vez por quadro gráfico renderizado (geralmente a 60 FPS ou mais). É o lar natural da leitura de inputs e lógicas visuais.</li>
  <li><strong>FixedUpdate():</strong> Executado em intervalos de tempo fixos e regulares (por padrão a cada <code>0.02s</code> / 50Hz), desacoplado do framerate visual. É o único lugar seguro para cálculos de física e Rigidbody.</li>
  <li><strong>LateUpdate():</strong> Executado após todos os métodos Update terem sido concluídos no frame. É perfeito para posicionar a câmera, garantindo que o herói já tenha terminado toda a sua movimentação no quadro atual.</li>
  <li><strong>OnDestroy():</strong> Disparado quando o GameObject é removido da cena com Destroy, servindo para limpeza de memória, desativação de listeners e persistência de emergência.</li>
</ul>`,
            code: `using UnityEngine;

public class ExemploCicloDeVida : MonoBehaviour
{
    void Awake()
    {
        // 1. Inicialização prematura obrigatória
        Debug.Log("1. Awake");
    }

    void Start()
    {
        // 2. Inicialização antes do primeiro frame
        Debug.Log("2. Start");

        // Simulação de FPS em Update
        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");

        // Simulação do intervalo de física do FixedUpdate (0.02s padrão)
        float fixedDeltaTime = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDeltaTime + "s");

        // Simulação de posicionamento de câmera em LateUpdate
        string faseCamera = "LateUpdate: Posicionando Camera";
        Debug.Log(faseCamera);

        // Simulação de finalização em OnDestroy
        string statusDestruicao = "OnDestroy: Recursos Liberados";
        Debug.Log(statusDestruicao);
    }
}`
        },
        example: {
            title: "Exemplo Prático — Sequenciador Temporal do Ciclo de Vida",
            code: `using UnityEngine;

public class SequenciadorCiclo : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("1. Awake");
    }

    void Start()
    {
        Debug.Log("2. Start");

        int fps = 60;
        Debug.Log("Update Ativo: " + fps + " FPS");

        float fixedDelta = 0.02f;
        Debug.Log("FixedUpdate Intervalo: " + fixedDelta + "s");

        string camera = "LateUpdate: Posicionando Camera";
        Debug.Log(camera);

        string cleanup = "OnDestroy: Recursos Liberados";
        Debug.Log(cleanup);
    }
}`,
            output: `1. Awake
2. Start
Update Ativo: 60 FPS
FixedUpdate Intervalo: 0.02s
LateUpdate: Posicionando Camera
OnDestroy: Recursos Liberados`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 11 — INPUT SYSTEM MODERNO
    // ═══════════════════════════════════════════════════════
    11: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Entrando no Módulo 3 — Input System Moderno. Periféricos de controle e sensores ativados."
            },
            {
                type: "narrative",
                text: "Painéis hápticos, teclas flutuantes e ponteiros de mira sincronizam-se na câmara de testes. Elion Raven comanda a bancada de dispositivos de entrada."
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA & ANALISTA",
                cssClass: "elion",
                text: "O antigo Input Manager clássico do Unity ficou no passado. A nova arquitetura profissional do Unity Input System baseia-se em instâncias orientadas a dispositivos e eventos, como <code>Keyboard.current</code> e <code>Mouse.current</code>!"
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "ARTÍFICE",
                cssClass: "mira",
                text: "Isso nos dá precisão milimétrica: <code>spaceKey.wasPressedThisFrame</code> detecta o instante exato do pulo sem engasgos; <code>wKey.isPressed</code> checa a aceleração contínua, e o mouse informa cliques instantâneos e sua posição absoluta na tela!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Além de teclado e mouse, o sistema moderno suporta Gamepads e múltiplos controles simultâneos com a mesma interface limpa. Domine a leitura dos botões e posições neste capítulo."
            }
        ],
        concept: {
            title: "O NOVO INPUT SYSTEM DO UNITY: KEYBOARD, MOUSE E MULTI-DISPOSITIVOS",
            explanation: `O Unity Input System moderno (pacote <code>com.unity.inputsystem</code>) substitui as antigas funções estáticas por classes orientadas a periféricos ativos:
<ul>
  <li><strong>Disparo Único de Tecla (wasPressedThisFrame):</strong> Avalia se uma tecla foi pressionada exatamente no frame atual (ex: <code>if (Keyboard.current.spaceKey.wasPressedThisFrame) Debug.Log("Pulo Acionado!");</code>). Evita múltiplos pulos indesejados.</li>
  <li><strong>Estado Contínuo (isPressed):</strong> Retorna <code>true</code> enquanto a tecla estiver sendo mantida pressionada pelo jogador (ex: <code>if (Keyboard.current.wKey.isPressed) Debug.Log("Acelerando para Frente");</code>).</li>
  <li><strong>Clique do Mouse:</strong> Opera através de <code>Mouse.current.leftButton.wasPressedThisFrame</code> para acionar disparos ou golpes no momento exato do clique.</li>
  <li><strong>Posição do Cursor (ReadValue):</strong> Lê as coordenadas do ponteiro na tela com <code>float mouseX = Mouse.current.position.ReadValue().x;</code>.</li>
  <li><strong>Arquitetura Multi-Dispositivo:</strong> Permite consultar o periférico principal conectado (teclados, gamepads, telas de toque) de maneira transparente e unificada.</li>
</ul>`,
            code: `using UnityEngine;
using UnityEngine.InputSystem;

public class ExemploInputSystem : MonoBehaviour
{
    void Start()
    {
        // 1. Simulação de pulo com spaceKey
        bool pulou = Keyboard.current != null && Keyboard.current.spaceKey.wasPressedThisFrame;
        if (pulou)
        {
            Debug.Log("Pulo Acionado!");
        }

        // 2. Simulação de aceleração contínua com wKey
        bool acelerando = Keyboard.current != null && Keyboard.current.wKey.isPressed;
        if (acelerando)
        {
            Debug.Log("Acelerando para Frente");
        }

        // 3. Disparo com clique do mouse
        bool disparou = Mouse.current != null && Mouse.current.leftButton.wasPressedThisFrame;
        if (disparou)
        {
            Debug.Log("Disparo Efetuado!");
        }

        // 4. Leitura da posição X do mouse
        float mouseX = Mouse.current != null ? Mouse.current.position.ReadValue().x : 100.0f;
        Debug.Log("Mouse X: " + mouseX);

        // 5. Verificação de dispositivo ativo
        bool tecladoConectado = true;
        bool gamepadConectado = false;
        if (tecladoConectado)
        {
            Debug.Log("Dispositivo Principal: Teclado");
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Rastreamento de Controles Modernos",
            code: `using UnityEngine;
using UnityEngine.InputSystem;

public class TesteControles : MonoBehaviour
{
    void Start()
    {
        Debug.Log("Pulo Acionado!");
        Debug.Log("Acelerando para Frente");
        Debug.Log("Disparo Efetuado!");

        float x = 100.0f;
        Debug.Log("Mouse X: " + x);

        bool teclado = true;
        if (teclado) Debug.Log("Dispositivo Principal: Teclado");
    }
}`,
            output: `Pulo Acionado!
Acelerando para Frente
Disparo Efetuado!
Mouse X: 100
Dispositivo Principal: Teclado`
        }
    },

    // ═══════════════════════════════════════════════════════
    // CAPÍTULO 12 — INPUT ACTIONS & MAPEAMENTO
    // ═══════════════════════════════════════════════════════
    12: {
        story: [
            {
                type: "system",
                text: "[ SISTEMA ] Inicializando a Camada de Abstração de Ações. Action Maps e Vinculações reconfiguráveis ativos."
            },
            {
                type: "narrative",
                text: "Mapas conceituais ligam botões físicos a intenções puras de gameplay. Mira Solenn organiza esquemas de controle que operam sem hardcoding."
            },
            {
                type: "character",
                name: "MIRA SOLIS",
                role: "CARTÓGRAFA & ARTÍFICE",
                cssClass: "mira",
                text: "Nunca amarre o código do seu personagem a uma tecla física como 'Espaço' ou 'W'! Se o jogador quiser reconfigurar as teclas ou jogar com um controle de console, o jogo quebrará. Criamos **Input Actions**, mapeando a 'intenção' do jogador!"
            },
            {
                type: "character",
                name: "ELION RAVEN",
                role: "ESTRATEGISTA",
                cssClass: "elion",
                text: "Com Action Maps, dividimos os contextos do jogo em camadas limpas: quando o herói está em combate, o mapa ativo é <code>Gameplay</code> (com pulo, ataque e vetor 2D de movimento). Quando abre um menu ou pausa o jogo, o mapa alterna para <code>UI</code>!"
            },
            {
                type: "gm",
                name: "GM",
                role: "Guia do Sistema",
                cssClass: "gm",
                text: "Ações de interação contextual (como 'Pressione [E] para Interagir') avaliam a proximidade física do alvo antes de habilitar a ação. Conclua as 5 atividades deste capítulo para dominar os Action Maps."
            }
        ],
        concept: {
            title: "INPUT ACTIONS, ACTION MAPS E CONTROLE CONTEXTUAL DE GAMEPLAY E UI",
            explanation: `Input Actions desacoplam os comandos físicos do hardware da lógica do seu jogo:
<ul>
  <li><strong>Mapeamento de Ação (InputAction):</strong> Representa uma ação do jogo (como 'Pular', 'Atacar' ou 'Interagir'). Se a ação for acionada, ela registra o evento: <code>Debug.Log("InputAction: Pulo Registrado");</code>.</li>
  <li><strong>Vetor 2D de Movimento (Composite Vector2):</strong> Agrupa teclas WASD, setas direcionais ou o analógico do joystick em um vetor bidimensional <code>(horizontal, vertical)</code> (ex: <code>float horizontal = 1.0f; float vertical = 0.0f;</code> emite <code>Movimento: (1, 0)</code>).</li>
  <li><strong>Ação Contextual por Proximidade:</strong> Interações só ficam disponíveis quando o herói está próximo o suficiente do alvo (ex: se <code>dist &lt;= 2.0f</code>, exibe <code>"Pressione [" + botaoInteragir + "] para Interagir"</code>).</li>
  <li><strong>Habilitação de Action Maps:</strong> Grupos de ações são agrupados em mapas (ex: ativar o mapa <code>Gameplay</code> para movimentação de mundo).</li>
  <li><strong>Alternância Dinâmica para UI:</strong> Quando o jogo é pausado (<code>bool pausado = true</code>), o mapa muda de Gameplay para <code>UI</code> para navegar em menus sem mover o personagem acidentalmente.</li>
</ul>`,
            code: `using UnityEngine;
using UnityEngine.InputSystem;

public class ExemploInputActions : MonoBehaviour
{
    void Start()
    {
        // 1. Registro de ação de pulo desacoplada
        bool acaoDisparada = true;
        if (acaoDisparada)
        {
            Debug.Log("InputAction: Pulo Registrado");
        }

        // 2. Leitura de vetor de movimento 2D (WASD / D-Pad)
        float horizontal = 1.0f;
        float vertical = 0.0f;
        Debug.Log("Movimento: (" + horizontal + ", " + vertical + ")");

        // 3. Ação contextual de interação
        string botaoInteragir = "E";
        float dist = 1.5f;
        if (dist <= 2.0f)
        {
            Debug.Log("Pressione [" + botaoInteragir + "] para Interagir");
        }

        // 4. Habilitação de Action Map
        string mapaAtivo = "Gameplay";
        Debug.Log("Mapa Ativado: " + mapaAtivo);

        // 5. Troca dinâmica ao pausar
        bool pausado = true;
        if (pausado)
        {
            string mapa = "UI";
            Debug.Log("Contexto Atual: " + mapa);
        }
    }
}`
        },
        example: {
            title: "Exemplo Prático — Gerenciador de Ações e Contextos de Input",
            code: `using UnityEngine;

public class AcoesGameplayUI : MonoBehaviour
{
    void Start()
    {
        bool acao = true;
        if (acao) Debug.Log("InputAction: Pulo Registrado");

        float h = 1.0f;
        float v = 0.0f;
        Debug.Log("Movimento: (" + h + ", " + v + ")");

        string btn = "E";
        float dist = 1.5f;
        if (dist <= 2.0f) Debug.Log("Pressione [" + btn + "] para Interagir");

        Debug.Log("Mapa Ativado: Gameplay");

        bool pause = true;
        if (pause) Debug.Log("Contexto Atual: UI");
    }
}`,
            output: `InputAction: Pulo Registrado
Movimento: (1, 0)
Pressione [E] para Interagir
Mapa Ativado: Gameplay
Contexto Atual: UI`
        }
    }
};
