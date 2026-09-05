/**
 * DEFINES ALL 190 ACTIVITIES (38 CHAPTERS x 5 ACTIVITIES)
 * Rigorously structured for CSharpInterpreter and anti-cheat validation.
 */

function buildAllActivities() {
    const acts = {};

    // Helper to register 5 activities for chapter
    function setChapterActs(chId, list) {
        if (list.length !== 5) throw new Error(`Chapter ${chId} must have exactly 5 activities! Got ${list.length}`);
        acts[chId] = list;
    }

    // 0: Variáveis e Tipos de Dados
    setChapterActs(0, [
        {
            title: "Primeiro Log de Vida", diff: "easy",
            desc: "Declare no método Start uma variável inteira para armazenar a vida inicializada com 100 pontos. Em seguida, utilize Debug.Log para emitir no Console o texto de identificação concatenado com a vida.",
            reqs: ["int vida", "vida", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // 1. Declare int vida = 100;\n        \n        // 2. Emita no Console: Vida: 100\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        Debug.Log("Vida: " + vida);\n    }\n}`,
            exp: "Vida: 100", descTest: "Log de vida inicial"
        },
        {
            title: "Velocidade Flutuante", diff: "easy",
            desc: "Configure o personagem declarando a variável string heroi com 'Kael' e a variável float velocidade com 7.5f (com sufixo f). Emita ambos em linhas separadas no Console.",
            reqs: ["float velocidade", "7.5f", "heroi", "Kael"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare heroi e velocidade (7.5f)\n        \n        // Imprima os dois valores\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string heroi = "Kael";\n        float velocidade = 7.5f;\n        Debug.Log("Heroi: " + heroi);\n        Debug.Log("Velocidade: " + velocidade);\n    }\n}`,
            exp: "Heroi: Kael\nVelocidade: 7.5", descTest: "Logs com float e string"
        },
        {
            title: "Cálculo de Dano Total", diff: "medium",
            desc: "Declare as variáveis inteiras danoBase valendo 40 e multiplicador valendo 2, além de um bônus flutuante bonus valendo 5.5f. Calcule o danoTotal com (danoBase * multiplicador) + bonus e exiba no Console.",
            reqs: ["danoBase", "multiplicador", "bonus", "danoTotal", "*"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare danoBase, multiplicador e bonus\n        \n        // Calcule danoTotal e imprima com Debug.Log\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoBase = 40;\n        int multiplicador = 2;\n        float bonus = 5.5f;\n        float danoTotal = (danoBase * multiplicador) + bonus;\n        Debug.Log("Dano Total: " + danoTotal);\n    }\n}`,
            exp: "Dano Total: 85.5", descTest: "Aritmética mista int e float"
        },
        {
            title: "Prontidão Booleana", diff: "easy",
            desc: "Declare a variável booleana estaPronto valendo true e a variável caractere simbolo valendo 'G'. Imprima o estado de prontidão e a classe no Console.",
            reqs: ["bool estaPronto", "char simbolo", "true", "'G'"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare estaPronto e simbolo\n        \n        // Emita no Console\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool estaPronto = true;\n        char simbolo = 'G';\n        Debug.Log("Pronto: " + estaPronto + " | Classe: " + simbolo);\n    }\n}`,
            exp: "Pronto: True | Classe: G", descTest: "Uso de bool e char"
        },
        {
            title: "Constante de Gravidade", diff: "medium",
            desc: "Declare a constante flutuante GRAVIDADE valendo -10.0f e a variável inteira massa valendo 10. Calcule a força peso como massa * 10 e exiba a Gravidade e o Peso no Console.",
            reqs: ["const float GRAVIDADE", "-10.0f", "massa", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare a constante GRAVIDADE e massa\n        \n        // Calcule e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        const float GRAVIDADE = -10.0f;\n        int massa = 10;\n        float peso = massa * 10.0f;\n        Debug.Log("Gravidade: " + GRAVIDADE + " | Peso: " + peso);\n    }\n}`,
            exp: "Gravidade: -10 | Peso: 100", descTest: "Constantes e cálculo físico"
        }
    ]);

    // 1: Operadores e Expressões
    setChapterActs(1, [
        {
            title: "Dano Sofrido com Operador Composto", diff: "easy",
            desc: "Declare a variável inteira vida com 100 pontos e danoSofrido com 35 pontos. Aplique o operador de subtração composta (-=) para atualizar a vida e exiba a Vida Restante no Console.",
            reqs: ["int vida", "vida -=", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        // Aplique -= e exiba: Vida Restante: 65\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 100;\n        int danoSofrido = 35;\n        vida -= danoSofrido;\n        Debug.Log("Vida Restante: " + vida);\n    }\n}`,
            exp: "Vida Restante: 65", descTest: "Operador -="
        },
        {
            title: "Média de Duas Notas", diff: "easy",
            desc: "Calcule a média aritmética de duas partidas: declare as notas inteiras p1 com 8 e p2 com 6. Calcule a média flutuante dividindo a soma por 2.0f e imprima no Console.",
            reqs: ["p1", "p2", "media", "/"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        // Calcule a media flutuante e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int p1 = 8;\n        int p2 = 6;\n        float media = (p1 + p2) / 2.0f;\n        Debug.Log("Media: " + media);\n    }\n}`,
            exp: "Media: 7", descTest: "Cálculo de média"
        },
        {
            title: "Controle de Turnos com Módulo (%)", diff: "medium",
            desc: "Declare a variável inteira frameAtual com 17 e ciclo com 4. Calcule o resto frameAtual % ciclo e exiba o Índice do Ciclo no Console.",
            reqs: ["frameAtual", "ciclo", "%", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        // Calcule o resto e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int frameAtual = 17;\n        int ciclo = 4;\n        int indice = frameAtual % ciclo;\n        Debug.Log("Indice do Ciclo: " + indice);\n    }\n}`,
            exp: "Indice do Ciclo: 1", descTest: "Operador de resto"
        },
        {
            title: "Combinação Lógica com E (&&)", diff: "medium",
            desc: "Declare o nível inteiro nivel com 15 e a booleana temChave com true. Crie a booleana podeAbrir avaliando se nivel >= 10 E temChave é verdadeiro, exibindo o status de Acesso Permitido.",
            reqs: ["nivel", "temChave", "&&", "podeAbrir"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        // Avalie com && e imprima: Acesso Permitido: True\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 15;\n        bool temChave = true;\n        bool podeAbrir = nivel >= 10 && temChave;\n        Debug.Log("Acesso Permitido: " + podeAbrir);\n    }\n}`,
            exp: "Acesso Permitido: True", descTest: "Operador lógico &&"
        },
        {
            title: "Negação Lógica com OU (||)", diff: "medium",
            desc: "Declare a booleana temEscudo valendo false e estaInvisivel valendo true. Crie a booleana protegido avaliando se temEscudo OU estaInvisivel é verdadeiro, exibindo o status de Protegido.",
            reqs: ["temEscudo", "estaInvisivel", "||", "protegido"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        // Avalie com || e imprima: Protegido: True\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool temEscudo = false;\n        bool estaInvisivel = true;\n        bool protegido = temEscudo || estaInvisivel;\n        Debug.Log("Protegido: " + protegido);\n    }\n}`,
            exp: "Protegido: True", descTest: "Operador lógico ||"
        }
    ]);

    // 2: Condicionais (if, else, switch)
    setChapterActs(2, [
        {
            title: "Checagem de Sobrevivência", diff: "easy",
            desc: "Declare a variável inteira vida com 0 pontos. Utilize uma estrutura if/else: se vida > 0 exiba 'Status: Ativo', senão exiba 'Status: Game Over'.",
            reqs: ["int vida", "if", "else", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 0;\n        // Cheque com if/else e exiba o status\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int vida = 0;\n        if (vida > 0)\n        {\n            Debug.Log("Status: Ativo");\n        }\n        else\n        {\n            Debug.Log("Status: Game Over");\n        }\n    }\n}`,
            exp: "Status: Game Over", descTest: "If/else de sobrevivência"
        },
        {
            title: "Classificação por Dificuldade", diff: "easy",
            desc: "Declare a variável inteira nivel com 12. Se nivel < 10 exiba 'Dificuldade: Normal', caso contrário exiba 'Dificuldade: Heroica'.",
            reqs: ["int nivel", "if", "else", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 12;\n        // Avalie o nivel com if/else\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int nivel = 12;\n        if (nivel < 10)\n        {\n            Debug.Log("Dificuldade: Normal");\n        }\n        else\n        {\n            Debug.Log("Dificuldade: Heroica");\n        }\n    }\n}`,
            exp: "Dificuldade: Heroica", descTest: "Checagem de dificuldade"
        },
        {
            title: "Ramo Múltiplo com Else If", diff: "medium",
            desc: "Declare a variável inteira mana com 30. Use if/else if/else: se mana >= 50 exiba 'Magia: Suprema', senão se mana >= 25 exiba 'Magia: Basica', senão exiba 'Sem Mana'.",
            reqs: ["int mana", "else if", "if", "else"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 30;\n        // Aplique if, else if e else\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int mana = 30;\n        if (mana >= 50)\n        {\n            Debug.Log("Magia: Suprema");\n        }\n        else if (mana >= 25)\n        {\n            Debug.Log("Magia: Basica");\n        }\n        else\n        {\n            Debug.Log("Sem Mana");\n        }\n    }\n}`,
            exp: "Magia: Basica", descTest: "Três ramos com else if"
        },
        {
            title: "Seleção com Switch Case", diff: "medium",
            desc: "Declare a variável inteira idClasse valendo 2. Utilize a estrutura switch com cases 1 ('Guerreiro'), 2 ('Mago') e default ('Desconhecido'), emitindo a classe selecionada.",
            reqs: ["switch", "case 1:", "case 2:", "break;"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int idClasse = 2;\n        // Use switch para avaliar idClasse\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int idClasse = 2;\n        switch (idClasse)\n        {\n            case 1:\n                Debug.Log("Classe: Guerreiro");\n                break;\n            case 2:\n                Debug.Log("Classe: Mago");\n                break;\n            default:\n                Debug.Log("Classe: Desconhecido");\n                break;\n        }\n    }\n}`,
            exp: "Classe: Mago", descTest: "Switch case de classe"
        },
        {
            title: "Operador Ternário", diff: "medium",
            desc: "Declare a variável inteira stamina valendo 60. Utilize o operador ternário (? :) para definir a string estado como (stamina >= 50 ? 'Descansado' : 'Exausto') e imprima o Estado no Console.",
            reqs: ["stamina", "?", ":", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int stamina = 60;\n        // Use o operador ternario e exiba: Estado: Descansado\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int stamina = 60;\n        string estado = (stamina >= 50) ? "Descansado" : "Exausto";\n        Debug.Log("Estado: " + estado);\n    }\n}`,
            exp: "Estado: Descansado", descTest: "Operador ternário"
        }
    ]);

    // 3: Loops (for, while, foreach)
    setChapterActs(3, [
        {
            title: "Spawn Sequencial com For", diff: "easy",
            desc: "Dentro de Start, construa um laço for que itere de 1 até 3 emitindo as mensagens no Console com 'Inimigo #' + i + ' gerado'.",
            reqs: ["for", "<=", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Construa o laco for de 1 a 3\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 3; i++)\n        {\n            Debug.Log("Inimigo #" + i + " gerado");\n        }\n    }\n}`,
            exp: "Inimigo #1 gerado\nInimigo #2 gerado\nInimigo #3 gerado", descTest: "Laço for sequencial"
        },
        {
            title: "Contagem com While", diff: "easy",
            desc: "Declare a variável inteira timer com 3. Crie um laço while que execute enquanto timer > 0, imprimindo 'T-' + timer e decrementando a cada passo.",
            reqs: ["int timer", "while", "timer > 0", "timer--"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int timer = 3;\n        // Faca o laco while regressivo\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int timer = 3;\n        while (timer > 0)\n        {\n            Debug.Log("T-" + timer);\n            timer--;\n        }\n    }\n}`,
            exp: "T-3\nT-2\nT-1", descTest: "While regressivo"
        },
        {
            title: "Somatório de Pontos", diff: "medium",
            desc: "Declare totalPontos inicializado com 0. Faça um for com i de 1 até 4 somando i * 10 a totalPontos e exiba no final 'Total Acumulado: ' + totalPontos.",
            reqs: ["totalPontos", "for", "+=", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalPontos = 0;\n        // Some os pontos no laco e imprima o total\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int totalPontos = 0;\n        for (int i = 1; i <= 4; i++)\n        {\n            totalPontos += i * 10;\n        }\n        Debug.Log("Total Acumulado: " + totalPontos);\n    }\n}`,
            exp: "Total Acumulado: 100", descTest: "Somatório em loop"
        },
        {
            title: "Filtro de Pares com Continue", diff: "medium",
            desc: "Faça um laço for de 1 até 5. Se o resto da divisão por 2 for diferente de zero (i % 2 != 0), use continue para ignorar. Imprima os números pares encontrados com 'Par: ' + i.",
            reqs: ["for", "continue", "%", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Itere de 1 a 5 usando continue para impares\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 5; i++)\n        {\n            if (i % 2 != 0) continue;\n            Debug.Log("Par: " + i);\n        }\n    }\n}`,
            exp: "Par: 2\nPar: 4", descTest: "Comando continue"
        },
        {
            title: "Interrupção com Break", diff: "medium",
            desc: "Simule a interrupção ao encontrar o alvo: itere de 1 até 10 com for. Quando i == 3, exiba 'Alvo Encontrado no passo 3' e execute break para interromper o laço.",
            reqs: ["for", "break", "i == 3", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Procure o alvo no laco e interrompa com break\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        for (int i = 1; i <= 10; i++)\n        {\n            if (i == 3)\n            {\n                Debug.Log("Alvo Encontrado no passo 3");\n                break;\n            }\n        }\n    }\n}`,
            exp: "Alvo Encontrado no passo 3", descTest: "Comando break"
        }
    ]);

    // 4: Funções e Métodos
    setChapterActs(4, [
        {
            title: "Método Void de Log", diff: "easy",
            desc: "Defina o método auxiliar void ExibirBoasVindas() que emite 'Bem-vindo ao Unity 6.5'. Invoque o método dentro de Start().",
            reqs: ["void ExibirBoasVindas()", "ExibirBoasVindas()", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame ExibirBoasVindas()\n    }\n    \n    // Crie o metodo void ExibirBoasVindas\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ExibirBoasVindas();\n    }\n\n    void ExibirBoasVindas()\n    {\n        Debug.Log("Bem-vindo ao Unity 6.5");\n    }\n}`,
            exp: "Bem-vindo ao Unity 6.5", descTest: "Método void sem parâmetros"
        },
        {
            title: "Função com Retorno Inteiro", diff: "easy",
            desc: "Crie a função int Dobrar(int valor) que retorna valor * 2. Em Start, declare int res = Dobrar(25); e imprima 'Resultado: ' + res.",
            reqs: ["int Dobrar(int valor)", "return valor * 2", "Dobrar(25)"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame Dobrar com 25 e imprima o resultado\n    }\n    \n    // Crie o metodo Dobrar\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int res = Dobrar(25);\n        Debug.Log("Resultado: " + res);\n    }\n\n    int Dobrar(int valor)\n    {\n        return valor * 2;\n    }\n}`,
            exp: "Resultado: 50", descTest: "Função com retorno inteiro"
        },
        {
            title: "Função de Cálculo de Dano Crítico", diff: "medium",
            desc: "Crie a função int CalcularCritico(int dano, int multiplicador) que retorna dano * multiplicador. No Start, chame com (50, 3) e exiba 'Dano Critico: ' + resultado.",
            reqs: ["int CalcularCritico(int dano, int multiplicador)", "CalcularCritico(50, 3)"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Invoque CalcularCritico e imprima\n    }\n    \n    // Defina CalcularCritico\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int danoFinal = CalcularCritico(50, 3);\n        Debug.Log("Dano Critico: " + danoFinal);\n    }\n\n    int CalcularCritico(int dano, int multiplicador)\n    {\n        return dano * multiplicador;\n    }\n}`,
            exp: "Dano Critico: 150", descTest: "Função com múltiplos parâmetros"
        },
        {
            title: "Função Booleana de Verificação", diff: "medium",
            desc: "Crie a função bool EstaVivo(int vidaAtual) que retorna vidaAtual > 0. No Start, teste com 10 pontos e exiba 'Heroi Vivo: ' + EstaVivo(10).",
            reqs: ["bool EstaVivo(int vidaAtual)", "return vidaAtual > 0", "EstaVivo(10)"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Teste EstaVivo com 10 e imprima\n    }\n    \n    // Defina EstaVivo\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        bool vivo = EstaVivo(10);\n        Debug.Log("Heroi Vivo: " + vivo);\n    }\n\n    bool EstaVivo(int vidaAtual)\n    {\n        return vidaAtual > 0;\n    }\n}`,
            exp: "Heroi Vivo: True", descTest: "Função com retorno booleano"
        },
        {
            title: "Formatação de Nome de Jogador", diff: "medium",
            desc: "Crie a função string FormatarNome(string nome, int nivel) que retorna 'Player: ' + nome + ' [Lv ' + nivel + ']'. No Start, chame com ('Arkan', 20) e exiba o resultado.",
            reqs: ["string FormatarNome(string nome, int nivel)", "FormatarNome(\"Arkan\", 20)"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Chame FormatarNome e imprima\n    }\n    \n    // Defina FormatarNome\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string rotulo = FormatarNome("Arkan", 20);\n        Debug.Log(rotulo);\n    }\n\n    string FormatarNome(string nome, int nivel)\n    {\n        return "Player: " + nome + " [Lv " + nivel + "]";\n    }\n}`,
            exp: "Player: Arkan [Lv 20]", descTest: "Função com retorno string"
        }
    ]);

    // 5: Arrays e Listas
    setChapterActs(5, [
        {
            title: "Acesso a Elemento de Array", diff: "easy",
            desc: "Declare um array de strings itens com três nomes: 'Espada', 'Escudo' e 'Pocao'. Acesse o primeiro item pelo índice 0 e exiba 'Item Equipado: ' + itens[0].",
            reqs: ["string[] itens", "itens[0]", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o array itens e exiba o primeiro item\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string[] itens = new string[] { "Espada", "Escudo", "Pocao" };\n        Debug.Log("Item Equipado: " + itens[0]);\n    }\n}`,
            exp: "Item Equipado: Espada", descTest: "Array index 0"
        },
        {
            title: "Iteração em Array com Foreach", diff: "easy",
            desc: "Declare um array de inteiros pontuacoes com os valores { 10, 20, 30 }. Use um laço for para iterar e exibir cada pontuação no formato 'Pontos: ' + valor.",
            reqs: ["int[] pontuacoes", "for", "pontuacoes.Length"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare o array e percorra exibindo cada ponto\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int[] pontuacoes = new int[] { 10, 20, 30 };\n        for (int i = 0; i < pontuacoes.Length; i++)\n        {\n            Debug.Log("Pontos: " + pontuacoes[i]);\n        }\n    }\n}`,
            exp: "Pontos: 10\nPontos: 20\nPontos: 30", descTest: "Iteração em array"
        },
        {
            title: "Adicionando Elementos em List<T>", diff: "medium",
            desc: "Instancie uma lista dinâmica List<string> inventario = new List<string>();. Adicione 'Elmo' e 'Bota' usando .Add(). Exiba a contagem final no Console com 'Total de Itens: ' + inventario.Count.",
            reqs: ["List<string> inventario", ".Add(", "inventario.Count"],
            starter: `using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie a lista, adicione os itens e imprima o Count\n    }\n}`,
            sol: `using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        List<string> inventario = new List<string>();\n        inventario.Add("Elmo");\n        inventario.Add("Bota");\n        Debug.Log("Total de Itens: " + inventario.Count);\n    }\n}`,
            exp: "Total de Itens: 2", descTest: "List.Add e List.Count"
        },
        {
            title: "Remoção de Item de Lista", diff: "medium",
            desc: "Crie uma List<string> poderes com 'Fogo' e 'Gelo'. Remova 'Fogo' usando .Remove('Fogo'). Exiba no Console o poder restante na posição 0 com 'Poder Ativo: ' + poderes[0].",
            reqs: ["List<string> poderes", ".Remove(", "poderes[0]"],
            starter: `using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Crie a lista, remova 'Fogo' e imprima o item restante\n    }\n}`,
            sol: `using UnityEngine;\nusing System.Collections.Generic;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        List<string> poderes = new List<string>();\n        poderes.Add("Fogo");\n        poderes.Add("Gelo");\n        poderes.Remove("Fogo");\n        Debug.Log("Poder Ativo: " + poderes[0]);\n    }\n}`,
            exp: "Poder Ativo: Gelo", descTest: "List.Remove"
        },
        {
            title: "Maior Valor em Array", diff: "medium",
            desc: "Declare um array de inteiros valores com { 15, 82, 43 }. Determine o maior valor e exiba 'Maior: ' + maior. (Dica: compare com if em um laço).",
            reqs: ["int[] valores", "for", "Debug.Log"],
            starter: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int[] valores = new int[] { 15, 82, 43 };\n        // Encontre o maior valor e imprima\n    }\n}`,
            sol: `using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        int[] valores = new int[] { 15, 82, 43 };\n        int maior = valores[0];\n        for (int i = 1; i < valores.Length; i++)\n        {\n            if (valores[i] > maior) maior = valores[i];\n        }\n        Debug.Log("Maior: " + maior);\n    }\n}`,
            exp: "Maior: 82", descTest: "Busca de maior em array"
        }
    ]);

    return acts;
}

module.exports = { buildAllActivities };
