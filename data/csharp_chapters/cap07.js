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
            title: "Sobrescrita de Mensagem (Override)",
            difficulty: "easy",
            description: "Declare string classe = 'Guerreiro'; e string arma = 'Espada';. Simule a ação herdada emitida com Debug.Log(classe + ' atacando com ' + arma + '!');.",
            validationRules: { requiredPatterns: ["string classe","string arma","Debug.Log"] },
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
            tests: [
                { input: "", expected: "Guerreiro atacando com Espada!", description: "Ação polimórfica" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string classe, string arma" },
                { level: "II", text: "A saída no console deve conter exatamente: Guerreiro atacando com Espada!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string classe = \"Guerreiro\";\n        string arma = \"Espada\";\n        Debug.Log(classe + \" atacando com \" + arma + \"!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string classe","string arma","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Guerreiro atacando com Espada!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_2",
            title: "Subclasse Mago com Habilidade Arcana",
            difficulty: "easy",
            description: "Declare tipoInimigo como 'Mago' e magia como 'Bola de Fogo'. Emita no Console: 'Mago conjurando Bola de Fogo!'.",
            validationRules: { requiredPatterns: ["tipoInimigo","magia","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Configure tipoInimigo e magia e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string tipoInimigo = "Mago";
        string magia = "Bola de Fogo";
        Debug.Log(tipoInimigo + " conjurando " + magia + "!");
    }
}`,
            tests: [
                { input: "", expected: "Mago conjurando Bola de Fogo!", description: "Especialização de subclasse" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: tipoInimigo, magia" },
                { level: "II", text: "A saída no console deve conter exatamente: Mago conjurando Bola de Fogo!" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string tipoInimigo = \"Mago\";\n        string magia = \"Bola de Fogo\";\n        Debug.Log(tipoInimigo + \" conjurando \" + magia + \"!\");" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["tipoInimigo","magia","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Mago conjurando Bola de Fogo!";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_3",
            title: "Chamada de Método Base",
            difficulty: "medium",
            description: "Declare string fase1 = 'Base: Inicializado'; e string fase2 = 'Derivado: Equipamento Carregado';. Emita ambas em linhas separadas no Console.",
            validationRules: { requiredPatterns: ["string fase1","string fase2","Debug.Log"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Declare fase1 e fase2 e imprima
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string fase1 = "Base: Inicializado";
        string fase2 = "Derivado: Equipamento Carregado";
        Debug.Log(fase1);
        Debug.Log(fase2);
    }
}`,
            tests: [
                { input: "", expected: "Base: Inicializado\nDerivado: Equipamento Carregado", description: "Sequência base e derivada" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string fase1, string fase2" },
                { level: "II", text: "A saída no console deve conter exatamente: Base: Inicializado" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string fase1 = \"Base: Inicializado\";\n        string fase2 = \"Derivado: Equipamento Carregado\";\n        Debug.Log(fase1);" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string fase1","string fase2","Debug.Log"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Base: Inicializado";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_4",
            title: "Cálculo de Armadura Polimórfico",
            difficulty: "medium",
            description: "Declare o danoRecebido como 50 e a reducaoArmadura como 15. Calcule o danoReal subtraindo a redução do dano e emita 'Dano Sofrido: ' + danoReal.",
            validationRules: { requiredPatterns: ["danoRecebido","reducaoArmadura","danoReal","-"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Calcule o dano considerando a armadura
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        int danoRecebido = 50;
        int reducaoArmadura = 15;
        int danoReal = danoRecebido - reducaoArmadura;
        Debug.Log("Dano Sofrido: " + danoReal);
    }
}`,
            tests: [
                { input: "", expected: "Dano Sofrido: 35", description: "Redução de dano por armadura" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: danoRecebido, reducaoArmadura" },
                { level: "II", text: "A saída no console deve conter exatamente: Dano Sofrido: 35" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        int danoRecebido = 50;\n        int reducaoArmadura = 15;\n        int danoReal = danoRecebido - reducaoArmadura;" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["danoRecebido","reducaoArmadura","danoReal","-"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Dano Sofrido: 35";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        },
        {
            id: "cs_act_7_5",
            artifactReward: { artifactId: "Anklet_Lightning", minStars: 3, maxStars: 5 },
            title: "Lista Polimórfica de Ações",
            difficulty: "medium",
            description: "Crie um array com duas ações de combate: 'Arqueiro Dispara' e 'Guerreiro Golpeia'. Itere pelo array exibindo cada ação no Console.",
            validationRules: { requiredPatterns: ["string[] acoes","for","acoes.Length"] },
            starterCode: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        // Percorra o array de acoes
    }
}`,
            solution: `using UnityEngine;

public class Exercicio : MonoBehaviour
{
    void Start()
    {
        string[] acoes = new string[] { "Arqueiro Dispara", "Guerreiro Golpeia" };
        for (int i = 0; i < acoes.Length; i++)
        {
            Debug.Log("Acao: " + acoes[i]);
        }
    }
}`,
            tests: [
                { input: "", expected: "Acao: Arqueiro Dispara\nAcao: Guerreiro Golpeia", description: "Lista de ações polimórficas" }
            ],
            hints: [
                { level: "I", text: "Certifique-se de usar a estrutura pedida: string[] acoes, for" },
                { level: "II", text: "A saída no console deve conter exatamente: Acao: Arqueiro Dispara" },
                { level: "III", text: "Exemplo estrutural:\n    void Start()\n    {\n        string[] acoes = new string[] { \"Arqueiro Dispara\", \"Guerreiro Golpeia\" };\n        for (int i = 0; i < acoes.Length; i++)\n        {" }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ["string[] acoes","for","acoes.Length"];
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = "Acao: Arqueiro Dispara";
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
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
