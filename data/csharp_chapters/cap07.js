/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 07
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 07 — HERANÇA E POLIMORFISMO
// ═══════════════════════════════════════════════════════

const CAP_07 = {
    id: 7,
    artifactReward: { artifactId: "Anklet_Lightning", minStars: 3, maxStars: 5 },
    title: "Herança e Polimorfismo",
    theme: "Módulo 1 — Fundamentos de C#",
    unlock: "Selo Polimórfico",
    unlockIcon: "[POLY]",
    character: "arkan",
    xpReward: 140,
    story: [
            {
                    "type": "system",
                    "text": "[ SISTEMA ] Despertando as Linhagens e Especializações Arcanas. Herança e Polimorfismo sincronizados."
            },
            {
                    "type": "narrative",
                    "text": "O estandarte da GuildCode tremula no topo da muralha. Diferentes classes de guerreiros e arcanistas reúnem-se sob a mesma hierarquia de combate."
            },
            {
                    "type": "character",
                    "name": "ARKAN VELOR",
                    "role": "MESTRE DA GUILDA",
                    "cssClass": "arkan",
                    "text": "Todos os membros de nossa ordem descendem do mesmo arquétipo base de combatente. Mas quando um Mago conjura chamas e um Guerreiro empunha sua espada, cada um expressa sua vocação de forma única. Isso é Polimorfismo!"
            },
            {
                    "type": "character",
                    "name": "LYRA NEX",
                    "role": "ARQUIVISTA",
                    "cssClass": "lyra",
                    "text": "Em C#, uma classe derivada herda membros com a sintaxe <code>class Mago : Personagem</code>. Podemos sobrescrever métodos usando <code>virtual</code> na base e <code>override</code> na subclasse, invocando a lógica ancestral com <code>base.Metodo()</code>."
            },
            {
                    "type": "gm",
                    "name": "GM",
                    "role": "Guia do Sistema",
                    "cssClass": "gm",
                    "text": "O polimorfismo também nos permite tratar múltiplos guerreiros e arqueiros como uma lista de ações compartilhadas, além de aplicar cálculos dinâmicos de redução de dano por armadura."
            }
    ],
    concept: {
        title: "HERANÇA, POLIMORFISMO, OVERRIDE E REUTILIZAÇÃO DE CÓDIGO BASE",
        explanation: "Herança e polimorfismo permitem criar hierarquias extensíveis sem duplicar código:\n<ul>\n  <li><strong>Herança (<code>class Sub : Base</code>):</strong> Permite que uma classe filha herde atributos e métodos de uma classe pai (ex: um <code>Guerreiro</code> herdando características de <code>Personagem</code>).</li>\n  <li><strong>Sobrescrita Polimórfica (<code>override</code>):</strong> Quando um método pai é declarado como <code>virtual</code>, a classe derivada pode reescrever seu comportamento com <code>override</code> (ex: emitir <code>classe + \" atacando com \" + arma + \"!\"</code>).</li>\n  <li><strong>Especialização de Classes:</strong> Subclasses como <code>Mago</code> podem ter habilidades exclusivas (ex: tipoInimigo 'Mago' conjurando 'Bola de Fogo').</li>\n  <li><strong>Chamada do Método Base (<code>base.Metodo()</code>):</strong> Garante que a inicialização original da classe pai seja executada antes de adicionar comportamentos da subclasse (ex: 'Base: Inicializado' seguido de 'Derivado: Equipamento Carregado').</li>\n  <li><strong>Cálculo de Dano Polimórfico:</strong> Aplicações como redução de dano por armadura (<code>int danoReal = danoRecebido - reducaoArmadura;</code>) e listas polimórficas de ações de combate iteradas sequencialmente.</li>\n</ul>",
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
        output: "Guerreiro atacando com Espada!\nMago conjurando Bola de Fogo!\nBase: Inicializado\nDerivado: Equipamento Carregado\nDano Sofrido: 35\nArqueiro Dispara\nGuerreiro Golpeia"
    },
    experiment: {
        title: "Experimente no Editor",
        description: "Modifique os parâmetros de Herança e Polimorfismo e observe as alterações no Console Unity.",
        starterCode: `using UnityEngine;

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
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: "Execute a rotina inicial de Herança e Polimorfismo:",
                starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare classe e arma e emita o ataque
    }
}`,
                solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string classe = "Guerreiro";
        string arma = "Espada";
        Debug.Log(classe + " atacando com " + arma + "!");
    }
}`,
                hint: "Guerreiro atacando com Espada!"
            }
        ]
    },
    activities: [
        {
            id: "cs_act_7_1",
            title: "Definindo a Classe Base Personagem",
            difficulty: "easy",
            description: "Crie uma classe chamada `Personagem` com dois campos públicos: `nome` (string) e `vida` (int). Na classe `MonoBehaviour`, instancie um `Personagem`, atribua os valores `nome = \"Arkan\"` e `vida = 100`, e imprima: `Personagem: Arkan, Vida: 100`.",
            validationRules: { requiredPatterns: ["class Personagem", "string nome", "int vida", "Debug.Log"] },
            starterCode: `using UnityEngine;

public class Personagem
{
    // Declare os campos: nome e vida
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie um Personagem, atribua nome e vida, e imprima
    }
}`,
            solution: `using UnityEngine;

public class Personagem
{
    public string nome;
    public int vida;
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Personagem p = new Personagem();
        p.nome = "Arkan";
        p.vida = 100;
        Debug.Log("Personagem: " + p.nome + ", Vida: " + p.vida);
    }
}`,
            tests: [
                { input: "", expected: "Personagem: Arkan, Vida: 100", description: "Instanciação da classe base" }
            ],
            hints: [
                { level: "I", text: "Declare os campos com os modificadores: public string nome; e public int vida;" },
                { level: "II", text: "Instancie com: Personagem p = new Personagem(); e depois atribua p.nome e p.vida." },
                { level: "III", text: "A saída deve ser exatamente: Personagem: Arkan, Vida: 100\nUse Debug.Log(\"Personagem: \" + p.nome + \", Vida: \" + p.vida);" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("class Personagem")) errors.push("Declare a classe Personagem.");
                if (!code.includes("string nome")) errors.push("A classe Personagem precisa ter o campo: string nome");
                if (!code.includes("int vida")) errors.push("A classe Personagem precisa ter o campo: int vida");
                if (!output.includes("Personagem: Arkan, Vida: 100")) errors.push("A saída deve ser: Personagem: Arkan, Vida: 100");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_2",
            title: "Herança: Guerreiro herda de Personagem",
            difficulty: "easy",
            description: "Crie a classe `Guerreiro` que herda de `Personagem` (usando `class Guerreiro : Personagem`). Adicione um campo `arma` (string). Instancie um `Guerreiro`, atribua `nome = \"Theron\"`, `vida = 150` e `arma = \"Machado\"`, e imprima: `Guerreiro: Theron | Arma: Machado | Vida: 150`.",
            validationRules: { requiredPatterns: ["class Guerreiro", "Personagem", "string arma", "Debug.Log"] },
            starterCode: `using UnityEngine;

public class Personagem
{
    public string nome;
    public int vida;
}

public class Guerreiro : Personagem
{
    // Adicione o campo arma
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie um Guerreiro e imprima seus dados
    }
}`,
            solution: `using UnityEngine;

public class Personagem
{
    public string nome;
    public int vida;
}

public class Guerreiro : Personagem
{
    public string arma;
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Guerreiro g = new Guerreiro();
        g.nome = "Theron";
        g.vida = 150;
        g.arma = "Machado";
        Debug.Log("Guerreiro: " + g.nome + " | Arma: " + g.arma + " | Vida: " + g.vida);
    }
}`,
            tests: [
                { input: "", expected: "Guerreiro: Theron | Arma: Machado | Vida: 150", description: "Subclasse herda campos da classe pai" }
            ],
            hints: [
                { level: "I", text: "Use a sintaxe: class Guerreiro : Personagem para indicar herança." },
                { level: "II", text: "Guerreiro herda nome e vida de Personagem. Adicione apenas o campo novo: public string arma;" },
                { level: "III", text: "A saída deve ser: Guerreiro: Theron | Arma: Machado | Vida: 150" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("class Guerreiro") || !code.includes("Personagem")) errors.push("Declare 'class Guerreiro : Personagem'.");
                if (!code.includes("string arma")) errors.push("Adicione o campo 'public string arma;' na classe Guerreiro.");
                if (!output.includes("Guerreiro: Theron | Arma: Machado | Vida: 150")) errors.push("A saída deve ser: Guerreiro: Theron | Arma: Machado | Vida: 150");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_3",
            title: "Override: Sobrescrevendo o Método Atacar",
            difficulty: "medium",
            description: "Crie a classe `Combatente` com um método `virtual` chamado `Atacar()` que imprime `Combatente atacou!`. Crie a classe `Arqueiro` que herda de `Combatente` e sobrescreve (`override`) o método `Atacar()` para imprimir `Arqueiro disparou uma flecha!`. Instancie um `Arqueiro` e chame seu `Atacar()`.",
            validationRules: { requiredPatterns: ["virtual", "override", "Atacar", "class Arqueiro"] },
            starterCode: `using UnityEngine;

public class Combatente
{
    public virtual void Atacar()
    {
        // Imprima: Combatente atacou!
    }
}

public class Arqueiro : Combatente
{
    public override void Atacar()
    {
        // Imprima: Arqueiro disparou uma flecha!
    }
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie um Arqueiro e chame Atacar()
    }
}`,
            solution: `using UnityEngine;

public class Combatente
{
    public virtual void Atacar()
    {
        Debug.Log("Combatente atacou!");
    }
}

public class Arqueiro : Combatente
{
    public override void Atacar()
    {
        Debug.Log("Arqueiro disparou uma flecha!");
    }
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Arqueiro a = new Arqueiro();
        a.Atacar();
    }
}`,
            tests: [
                { input: "", expected: "Arqueiro disparou uma flecha!", description: "Override substitui comportamento da classe base" }
            ],
            hints: [
                { level: "I", text: "O método da classe base deve ser marcado como 'public virtual void Atacar()'." },
                { level: "II", text: "O método da subclasse deve ser marcado como 'public override void Atacar()'." },
                { level: "III", text: "Instancie com: Arqueiro a = new Arqueiro(); e chame a.Atacar();\nA saída deve ser: Arqueiro disparou uma flecha!" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("virtual")) errors.push("Use a palavra-chave 'virtual' no método da classe base.");
                if (!code.includes("override")) errors.push("Use a palavra-chave 'override' no método da classe derivada.");
                if (!code.includes("Atacar")) errors.push("O método deve se chamar 'Atacar'.");
                if (!output.includes("Arqueiro disparou uma flecha!")) errors.push("A saída deve ser: Arqueiro disparou uma flecha!");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_4",
            title: "Hierarquia com Mago e Habilidade Especial",
            difficulty: "medium",
            description: "Crie a classe `Personagem` com o campo `nome` e um método `virtual` `UsarHabilidade()` que imprime `Habilidade Basica!`. Crie a classe `Mago` que herda de `Personagem` e adiciona o campo `magia` (string). Sobrescreva (`override`) o método `UsarHabilidade()` para imprimir `Mago conjura: ` + magia. Instancie um `Mago` com `nome = \"Lyra\"` e `magia = \"Relâmpago\"` e chame `UsarHabilidade()`.",
            validationRules: { requiredPatterns: ["class Mago", "Personagem", "override", "UsarHabilidade"] },
            starterCode: `using UnityEngine;

public class Personagem
{
    public string nome;
    public virtual void UsarHabilidade()
    {
        Debug.Log("Habilidade Basica!");
    }
}

public class Mago : Personagem
{
    public string magia;
    // Sobrescreva UsarHabilidade para imprimir: Mago conjura: <magia>
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie um Mago com nome e magia, depois chame UsarHabilidade()
    }
}`,
            solution: `using UnityEngine;

public class Personagem
{
    public string nome;
    public virtual void UsarHabilidade()
    {
        Debug.Log("Habilidade Basica!");
    }
}

public class Mago : Personagem
{
    public string magia;
    public override void UsarHabilidade()
    {
        Debug.Log("Mago conjura: " + magia);
    }
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Mago m = new Mago();
        m.nome = "Lyra";
        m.magia = "Relampago";
        m.UsarHabilidade();
    }
}`,
            tests: [
                { input: "", expected: "Mago conjura: Relampago", description: "Polimorfismo com método especializado" }
            ],
            hints: [
                { level: "I", text: "Adicione 'public override void UsarHabilidade()' dentro da classe Mago." },
                { level: "II", text: "Dentro do override, use: Debug.Log(\"Mago conjura: \" + magia);" },
                { level: "III", text: "Instancie: Mago m = new Mago();\nm.nome = \"Lyra\";\nm.magia = \"Relampago\";\nm.UsarHabilidade();" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("class Mago")) errors.push("Declare a classe Mago.");
                if (!(code.includes("Personagem") && code.includes("Mago"))) errors.push("Mago deve herdar de Personagem.");
                if (!code.includes("override")) errors.push("Use 'override' para sobrescrever UsarHabilidade.");
                if (!output.includes("Mago conjura:")) errors.push("A saída deve começar com: Mago conjura:");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 3, maxStars: 5 },
            title: "Polimorfismo: Duas Subclasses, Um Pai",
            difficulty: "hard",
            description: "Crie a classe `Unidade` com o método `virtual` `Apresentar()` que imprime `Unidade genérica`. Crie as subclasses `Cavaleiro` e `Feiticeiro`, ambas herdando de `Unidade`. `Cavaleiro.Apresentar()` imprime `Cavaleiro: escudo erguido!` e `Feiticeiro.Apresentar()` imprime `Feiticeiro: varinha pronta!`. Instancie as duas classes e chame `Apresentar()` em cada uma.",
            validationRules: { requiredPatterns: ["class Cavaleiro", "class Feiticeiro", "Unidade", "override"] },
            starterCode: `using UnityEngine;

public class Unidade
{
    public virtual void Apresentar()
    {
        Debug.Log("Unidade generica");
    }
}

public class Cavaleiro : Unidade
{
    // Override: imprima "Cavaleiro: escudo erguido!"
}

public class Feiticeiro : Unidade
{
    // Override: imprima "Feiticeiro: varinha pronta!"
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Instancie Cavaleiro e Feiticeiro e chame Apresentar() nos dois
    }
}`,
            solution: `using UnityEngine;

public class Unidade
{
    public virtual void Apresentar()
    {
        Debug.Log("Unidade generica");
    }
}

public class Cavaleiro : Unidade
{
    public override void Apresentar()
    {
        Debug.Log("Cavaleiro: escudo erguido!");
    }
}

public class Feiticeiro : Unidade
{
    public override void Apresentar()
    {
        Debug.Log("Feiticeiro: varinha pronta!");
    }
}

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        Cavaleiro c = new Cavaleiro();
        Feiticeiro f = new Feiticeiro();
        c.Apresentar();
        f.Apresentar();
    }
}`,
            tests: [
                { input: "", expected: "Cavaleiro: escudo erguido!\nFeiticeiro: varinha pronta!", description: "Duas subclasses com comportamentos polimórficos distintos" }
            ],
            hints: [
                { level: "I", text: "Crie 'class Cavaleiro : Unidade' e 'class Feiticeiro : Unidade' com override em Apresentar()." },
                { level: "II", text: "Instancie as duas: Cavaleiro c = new Cavaleiro(); Feiticeiro f = new Feiticeiro();" },
                { level: "III", text: "Chame c.Apresentar() e depois f.Apresentar().\nSaída esperada linha 1: Cavaleiro: escudo erguido!\nSaída esperada linha 2: Feiticeiro: varinha pronta!" }
            ],
            validator: function(code, output) {
                let errors = [];
                if (!code.includes("class Cavaleiro")) errors.push("Declare a classe Cavaleiro.");
                if (!code.includes("class Feiticeiro")) errors.push("Declare a classe Feiticeiro.");
                if ((code.match(/override/g) || []).length < 2) errors.push("Use 'override' nas duas subclasses.");
                if (!output.includes("Cavaleiro: escudo erguido!")) errors.push("A saída deve incluir: Cavaleiro: escudo erguido!");
                if (!output.includes("Feiticeiro: varinha pronta!")) errors.push("A saída deve incluir: Feiticeiro: varinha pronta!");
                return { pass: errors.length === 0, errors };
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_07 };
}
if (typeof window !== "undefined") {
    window.CAP_07 = CAP_07;
}
