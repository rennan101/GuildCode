/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 07
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 07 — CAPÍTULO 07
// ═══════════════════════════════════════════════════════

const CAP_07 = {
    "id": 7,
    "artifactReward": null,
    "title": "Capítulo 07",
    "theme": "",
    "unlock": "",
    "unlockIcon": "",
    "character": "",
    "xpReward": 100,
    "story": {
        "before": "",
        "after": ""
    },
    "concept": {
        "title": "HERANÇA E POLIMORFISMO: REUTILIZAÇÃO COM VIRTUAL, OVERRIDE E BASE",
        "explanation": "Herança e Polimorfismo são os pilares da arquitetura orientada a objetos em Unity:\n<ul>\n  <li><strong>Classe Base (Ancestral):</strong> Define o molde genérico e comportamentos padrão para entidades (ex: <code>public class Inimigo</code> com vida e método <code>virtual void Atacar()</code>).</li>\n  <li><strong>Classe Derivada (Herança):</strong> Herda membros com a sintaxe <code>public class Goblin : Inimigo</code> e especializa suas ações.</li>\n  <li><strong>Polimorfismo (<code>override</code>):</strong> A subclasse sobrescreve a implementação do pai com <code>public override void Atacar()</code> para executar comportamento próprio.</li>\n  <li><strong>Invocação da Base (<code>base.Metodo()</code>):</strong> Permite executar a lógica original do ancestral antes ou depois do código customizado.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class HeroiBase\n{\n    public string nome = \"Arkan\";\n    public int vida = 100;\n\n    public virtual void ExecutarAcao()\n    {\n        Debug.Log(nome + \" assume postura de combate (Vida: \" + vida + \")\");\n    }\n}\n\npublic class Paladino : HeroiBase\n{\n    public override void ExecutarAcao()\n    {\n        base.ExecutarAcao();\n        Debug.Log(nome + \" ergue o Escudo Sagrado!\");\n    }\n}\n\npublic class ExemploHeranca : MonoBehaviour\n{\n    void Start()\n    {\n        Paladino paladino = new Paladino();\n        paladino.ExecutarAcao();\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Hierarquia de Combatentes na Guilda",
        "code": "using UnityEngine;\n\npublic class Combatente\n{\n    public string nome;\n    public int poderAtaque;\n\n    public virtual void Atacar()\n    {\n        Debug.Log(nome + \" desfere um golpe basico com dano \" + poderAtaque);\n    }\n}\n\npublic class MagoArcano : Combatente\n{\n    public int bonusMagico = 20;\n\n    public override void Atacar()\n    {\n        int total = poderAtaque + bonusMagico;\n        Debug.Log(nome + \" conjura Lança Arcana com poder total \" + total);\n    }\n}\n\npublic class GerenciadorCombate : MonoBehaviour\n{\n    void Start()\n    {\n        MagoArcano mago = new MagoArcano();\n        mago.nome = \"Lyra\";\n        mago.poderAtaque = 30;\n        mago.Atacar();\n    }\n}",
        "output": "Lyra conjura Lança Arcana com poder total 50"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Instancie subclasses e teste a chamada de métodos polimórficos.",
        "starterCode": "using UnityEngine;\n\npublic class Entidade\n{\n    public virtual void Rugir()\n    {\n        Debug.Log(\"Som de monstro desconhecido\");\n    }\n}\n\npublic class Dragao : Entidade\n{\n    public override void Rugir()\n    {\n        Debug.Log(\"Dragao ruge cuspindo labaredas!\");\n    }\n}\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        Dragao d = new Dragao();\n        d.Rugir();\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Crie a classe Guerreiro derivada de Combatente e invoque o método Atacar:",
                "starterCode": "using UnityEngine;\n\npublic class Combatente\n{\n    public virtual void Atacar()\n    {\n        Debug.Log(\"Combatente ataca\");\n    }\n}\n\npublic class Guerreiro : Combatente\n{\n    public override void Atacar()\n    {\n        Debug.Log(\"Guerreiro golpeia com Espada\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Guerreiro g = new Guerreiro();\n        g.Atacar();\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Combatente\n{\n    public virtual void Atacar()\n    {\n        Debug.Log(\"Combatente ataca\");\n    }\n}\n\npublic class Guerreiro : Combatente\n{\n    public override void Atacar()\n    {\n        Debug.Log(\"Guerreiro golpeia com Espada\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Guerreiro g = new Guerreiro();\n        g.Atacar();\n    }\n}",
                "hint": "Guerreiro golpeia com Espada"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_7_1",
            "title": "Definindo a Classe Base Personagem",
            "difficulty": "easy",
            "description": "Crie uma classe chamada Personagem com dois campos públicos: string nome; e int vida;. Na classe MonoBehaviour, instancie um Personagem, atribua nome = \"Arkan\" e vida = 100, e emita: 'Personagem: ' + p.nome + ', Vida: ' + p.vida.",
            "validationRules": {
                "requiredPatterns": [
                    "class Personagem",
                    "string nome",
                    "int vida",
                    "new Personagem()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Personagem\n{\n    public string nome;\n    public int vida;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie Personagem, configure os campos e exiba os dados\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Personagem\n{\n    public string nome;\n    public int vida;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Personagem p = new Personagem();\n        p.nome = \"Arkan\";\n        p.vida = 100;\n        Debug.Log(\"Personagem: \" + p.nome + \", Vida: \" + p.vida);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Personagem: Arkan, Vida: 100",
                    "description": "Instanciação de classe base"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie com Personagem p = new Personagem(); e atribua p.nome e p.vida."
                },
                {
                    "level": "II",
                    "text": "Emita exatamente: Personagem: Arkan, Vida: 100"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nPersonagem p = new Personagem();\np.nome = \"Arkan\";\np.vida = 100;\nDebug.Log(\"Personagem: \" + p.nome + \", Vida: \" + p.vida);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class Personagem", "string nome", "int vida", "new Personagem()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Personagem: Arkan, Vida: 100";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_7_2",
            "title": "Herança com a Subclasse Guerreiro",
            "difficulty": "easy",
            "description": "Crie a classe base Personagem com public string nome;. Crie a classe derivada Guerreiro herdando de Personagem (class Guerreiro : Personagem) com o campo public string arma;. Instancie Guerreiro, defina nome = \"Elion\" e arma = \"Lança\", e emita: 'Guerreiro: ' + g.nome + ' | Arma: ' + g.arma.",
            "validationRules": {
                "requiredPatterns": [
                    "class Guerreiro : Personagem",
                    "new Guerreiro()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Personagem\n{\n    public string nome;\n}\n\npublic class Guerreiro : Personagem\n{\n    public string arma;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie Guerreiro, atribua nome e arma e imprima\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Personagem\n{\n    public string nome;\n}\n\npublic class Guerreiro : Personagem\n{\n    public string arma;\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Guerreiro g = new Guerreiro();\n        g.nome = \"Elion\";\n        g.arma = \"Lança\";\n        Debug.Log(\"Guerreiro: \" + g.nome + \" | Arma: \" + g.arma);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Guerreiro: Elion | Arma: Lança",
                    "description": "Herança de propriedades"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie Guerreiro g = new Guerreiro(); e preencha as propriedades herdadas."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Guerreiro: Elion | Arma: Lança"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGuerreiro g = new Guerreiro();\ng.nome = \"Elion\";\ng.arma = \"Lança\";\nDebug.Log(\"Guerreiro: \" + g.nome + \" | Arma: \" + g.arma);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class Guerreiro : Personagem", "new Guerreiro()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Guerreiro: Elion | Arma: Lança";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_7_3",
            "title": "Método Virtual e Sobrescrita com Override",
            "difficulty": "medium",
            "description": "Na classe base Heroi, crie public virtual void Atacar() emitindo 'Heroi desfere ataque'. Na classe Mago (derivada de Heroi), sobrescreva com public override void Atacar() emitindo 'Mago lanca Bola de Fogo'. Instancie Mago e chame m.Atacar().",
            "validationRules": {
                "requiredPatterns": [
                    "virtual void Atacar",
                    "override void Atacar",
                    "new Mago()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Heroi\n{\n    public virtual void Atacar()\n    {\n        Debug.Log(\"Heroi desfere ataque\");\n    }\n}\n\npublic class Mago : Heroi\n{\n    public override void Atacar()\n    {\n        Debug.Log(\"Mago lanca Bola de Fogo\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie Mago e chame Atacar()\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Heroi\n{\n    public virtual void Atacar()\n    {\n        Debug.Log(\"Heroi desfere ataque\");\n    }\n}\n\npublic class Mago : Heroi\n{\n    public override void Atacar()\n    {\n        Debug.Log(\"Mago lanca Bola de Fogo\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Mago m = new Mago();\n        m.Atacar();\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Mago lanca Bola de Fogo",
                    "description": "Polimorfismo com override"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie Mago m = new Mago(); e invoque m.Atacar();"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Mago lanca Bola de Fogo"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nMago m = new Mago();\nm.Atacar();"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["virtual void Atacar", "override void Atacar", "new Mago()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Mago lanca Bola de Fogo";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_7_4",
            "title": "Invocando o Comportamento Ancestral com base",
            "difficulty": "medium",
            "description": "Na classe base Entidade, o método Inicializar() emite 'Base: Atributos Carregados'. Na classe Paladino (derivada), o método Inicializar() chama Inicializar() e depois emite 'Paladino: Aura Sagrada Ativada'. Instancie Paladino e chame p.Inicializar().",
            "validationRules": {
                "requiredPatterns": [
                    "class Paladino : Entidade",
                    "Inicializar()",
                    "new Paladino()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Entidade\n{\n    public void CarregarBase()\n    {\n        Debug.Log(\"Base: Atributos Carregados\");\n    }\n}\n\npublic class Paladino : Entidade\n{\n    public void Inicializar()\n    {\n        this.CarregarBase();\n        Debug.Log(\"Paladino: Aura Sagrada Ativada\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie Paladino e chame Inicializar()\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Entidade\n{\n    public void CarregarBase()\n    {\n        Debug.Log(\"Base: Atributos Carregados\");\n    }\n}\n\npublic class Paladino : Entidade\n{\n    public void Inicializar()\n    {\n        this.CarregarBase();\n        Debug.Log(\"Paladino: Aura Sagrada Ativada\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Paladino p = new Paladino();\n        p.Inicializar();\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Base: Atributos Carregados\nPaladino: Aura Sagrada Ativada",
                    "description": "Invocação da base"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie Paladino p = new Paladino(); e chame p.Inicializar();"
                },
                {
                    "level": "II",
                    "text": "A saída terá 2 linhas: Base: Atributos Carregados e Paladino: Aura Sagrada Ativada"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nPaladino p = new Paladino();\np.Inicializar();"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class Paladino : Entidade", "Inicializar()", "new Paladino()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Base: Atributos Carregados";
          const expSecond = "Paladino: Aura Sagrada Ativada";
          if (!output.includes(expFirst) || !output.includes(expSecond)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_7_5",
            "artifactReward": {
                "artifactId": "Anklet_Lightning",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Cálculo de Dano Polimórfico com Armadura",
            "difficulty": "medium",
            "description": "Crie a classe DefesaHeroi com o método public int CalcularDano(int danoBruto, int armadura) que retorna danoBruto - armadura. Instancie DefesaHeroi, calcule o dano para 60 de dano e 15 de armadura, e emita: 'Dano Real Recebido: ' + danoFinal.",
            "validationRules": {
                "requiredPatterns": [
                    "class DefesaHeroi",
                    "int CalcularDano",
                    "new DefesaHeroi()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class DefesaHeroi\n{\n    public int CalcularDano(int danoBruto, int armadura)\n    {\n        return danoBruto - armadura;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie DefesaHeroi, calcule o dano e exiba o resultado\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class DefesaHeroi\n{\n    public int CalcularDano(int danoBruto, int armadura)\n    {\n        return danoBruto - armadura;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        DefesaHeroi def = new DefesaHeroi();\n        int danoFinal = def.CalcularDano(60, 15);\n        Debug.Log(\"Dano Real Recebido: \" + danoFinal);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Dano Real Recebido: 45",
                    "description": "Método com retorno de cálculo de combate"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Chame def.CalcularDano(60, 15) e guarde em danoFinal."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Dano Real Recebido: 45"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDefesaHeroi def = new DefesaHeroi();\nint danoFinal = def.CalcularDano(60, 15);\nDebug.Log(\"Dano Real Recebido: \" + danoFinal);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class DefesaHeroi", "int CalcularDano", "new DefesaHeroi()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Dano Real Recebido: 45";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_07, CAP_7: CAP_07 };
}
if (typeof window !== "undefined") {
    window.CAP_07 = CAP_07;
    window.CAP_7 = CAP_07;
}
