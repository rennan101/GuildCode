/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 35
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 35 — CAPÍTULO 35
// ═══════════════════════════════════════════════════════

const CAP_35 = {
    "id": 35,
    "artifactReward": null,
    "title": "Capítulo 35",
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
        "title": "INTERFACES E CONTRATOS DE CÓDIGO: IDAMAGEABLE, IINTERACTABLE E POLIMORFISMO",
        "explanation": "Interfaces definem contratos puros sem forçar hierarquias rígidas de herança:\n<ul>\n  <li><strong>Contrato (<code>interface IDamageable</code>):</strong> Obriga qualquer entidade (Jogador, Inimigo, Barril de Madeira) a implementar <code>TomarDano(int valor)</code>.</li>\n  <li><strong>Interação Genérica (<code>interface IInteractable</code>):</strong> Permite abrir Baús, Portas e conversar com NPCs usando o mesmo comando <code>Interagir()</code>.</li>\n  <li><strong>Múltiplas Interfaces:</strong> Uma classe pode implementar várias interfaces simultaneamente.</li>\n  <li><strong>Busca Polimórfica:</strong> <code>GetComponent&lt;IDamageable&gt;()</code> funciona sem se importar com a classe concreta da entidade.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class BarrilExplosivo\n{\n    public int vida = 50;\n\n    public void TomarDano(int dano)\n    {\n        vida = vida - dano;\n        Debug.Log(\"IDamageable: Barril atingido! Vida restante: \" + vida);\n    }\n}\n\npublic class ExemploInterfaces : MonoBehaviour\n{\n    void Start()\n    {\n        BarrilExplosivo barril = new BarrilExplosivo();\n        barril.TomarDano(20);\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Contrato de Interação com Baú da Masmorra",
        "code": "using UnityEngine;\n\npublic class BauTesouro\n{\n    public string conteudo = \"Espada_Lendaria\";\n    public bool estaAberto = false;\n\n    public void Interagir()\n    {\n        estaAberto = true;\n        Debug.Log(\"IInteractable: Bau Aberto! Recompensa encontrada: \" + conteudo + \"!\");\n    }\n}\n\npublic class GerenciadorInteracao : MonoBehaviour\n{\n    void Start()\n    {\n        BauTesouro bau = new BauTesouro();\n        bau.Interagir();\n    }\n}",
        "output": "IInteractable: Bau Aberto! Recompensa encontrada: Espada_Lendaria!"
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Teste a chamada de métodos da interface.",
        "starterCode": "using UnityEngine;\n\npublic class Inimigo\n{\n    public void ReceberDano(int d)\n    {\n        Debug.Log(\"Dano: \" + d);\n    }\n}\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        Inimigo i = new Inimigo();\n        i.ReceberDano(30);\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Instancie a entidade e execute a ação da interface:",
                "starterCode": "using UnityEngine;\n\npublic class Inimigo\n{\n    public void TomarDano(int dano)\n    {\n        Debug.Log(\"Tomou dano: \" + dano);\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Inimigo ini = new Inimigo();\n        ini.TomarDano(40);\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Inimigo\n{\n    public void TomarDano(int dano)\n    {\n        Debug.Log(\"Tomou dano: \" + dano);\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        Inimigo ini = new Inimigo();\n        ini.TomarDano(40);\n    }\n}",
                "hint": "Tomou dano: 40"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_35_1",
            "title": "Implementação da Interface IDamageable",
            "difficulty": "easy",
            "description": "Crie a classe MonstroSombrio com public void TomarDano(int dano) { Debug.Log(\"IDamageable: Monstro recebeu \" + dano + \" de dano!\"); }. Instancie e execute para dano = 60.",
            "validationRules": {
                "requiredPatterns": [
                    "class MonstroSombrio",
                    "TomarDano",
                    "new MonstroSombrio()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class MonstroSombrio\n{\n    public void TomarDano(int dano)\n    {\n        Debug.Log(\"IDamageable: Monstro recebeu \" + dano + \" de dano!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e chame TomarDano(60)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class MonstroSombrio\n{\n    public void TomarDano(int dano)\n    {\n        Debug.Log(\"IDamageable: Monstro recebeu \" + dano + \" de dano!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        MonstroSombrio monstro = new MonstroSombrio();\n        monstro.TomarDano(60);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "IDamageable: Monstro recebeu 60 de dano!",
                    "description": "Contrato IDamageable"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie MonstroSombrio monstro = new MonstroSombrio(); e chame monstro.TomarDano(60);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: IDamageable: Monstro recebeu 60 de dano!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nMonstroSombrio monstro = new MonstroSombrio();\nmonstro.TomarDano(60);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class MonstroSombrio", "TomarDano", "new MonstroSombrio()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "IDamageable: Monstro recebeu 60 de dano!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_35_2",
            "title": "Contrato de Interação IInteractable em Alavanca",
            "difficulty": "easy",
            "description": "Crie a classe AlavancaMasmorra com public void Interagir() { Debug.Log(\"IInteractable: Portao da Guilda Destrancado!\"); }. Instancie e execute o método Interagir().",
            "validationRules": {
                "requiredPatterns": [
                    "class AlavancaMasmorra",
                    "Interagir()",
                    "new AlavancaMasmorra()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class AlavancaMasmorra\n{\n    public void Interagir()\n    {\n        Debug.Log(\"IInteractable: Portao da Guilda Destrancado!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e chame Interagir()\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class AlavancaMasmorra\n{\n    public void Interagir()\n    {\n        Debug.Log(\"IInteractable: Portao da Guilda Destrancado!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        AlavancaMasmorra alavanca = new AlavancaMasmorra();\n        alavanca.Interagir();\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "IInteractable: Portao da Guilda Destrancado!",
                    "description": "Contrato IInteractable"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie AlavancaMasmorra alavanca = new AlavancaMasmorra(); e invoque alavanca.Interagir();"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: IInteractable: Portao da Guilda Destrancado!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nAlavancaMasmorra alavanca = new AlavancaMasmorra();\nalavanca.Interagir();"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class AlavancaMasmorra", "Interagir()", "new AlavancaMasmorra()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "IInteractable: Portao da Guilda Destrancado!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_35_3",
            "title": "Cálculo de Dano com Redução de Escudo via Interface",
            "difficulty": "medium",
            "description": "Crie a classe EscudoArcano com public int AbsorverImpacto(int dano, int absorcao) { return dano - absorcao; }. Instancie e calcule para dano = 80 e absorcao = 30, emitindo: 'Dano Penetrante: ' + danoFinal + ' HP'.",
            "validationRules": {
                "requiredPatterns": [
                    "class EscudoArcano",
                    "AbsorverImpacto",
                    "new EscudoArcano()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class EscudoArcano\n{\n    public int AbsorverImpacto(int dano, int absorcao)\n    {\n        return dano - absorcao;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e calcule com (80, 30)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class EscudoArcano\n{\n    public int AbsorverImpacto(int dano, int absorcao)\n    {\n        return dano - absorcao;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        EscudoArcano esc = new EscudoArcano();\n        int danoFinal = esc.AbsorverImpacto(80, 30);\n        Debug.Log(\"Dano Penetrante: \" + danoFinal + \" HP\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Dano Penetrante: 50 HP",
                    "description": "Absorção de dano"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie EscudoArcano esc = new EscudoArcano(); e calcule com (80, 30)."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Dano Penetrante: 50 HP"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nEscudoArcano esc = new EscudoArcano();\nint danoFinal = esc.AbsorverImpacto(80, 30);\nDebug.Log(\"Dano Penetrante: \" + danoFinal + \" HP\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class EscudoArcano", "AbsorverImpacto", "new EscudoArcano()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Dano Penetrante: 50 HP";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_35_4",
            "title": "Contrato de Coleta de Itens (ICollectable)",
            "difficulty": "medium",
            "description": "Crie a classe MoedaOuro com public void Coletar(string heroi) { Debug.Log(\"ICollectable: 100 Moedas coletadas por \" + heroi + \"!\"); }. Instancie e execute para heroi = \"Arkan\".",
            "validationRules": {
                "requiredPatterns": [
                    "class MoedaOuro",
                    "Coletar",
                    "new MoedaOuro()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class MoedaOuro\n{\n    public void Coletar(string heroi)\n    {\n        Debug.Log(\"ICollectable: 100 Moedas coletadas por \" + heroi + \"!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute Coletar(\"Arkan\")\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class MoedaOuro\n{\n    public void Coletar(string heroi)\n    {\n        Debug.Log(\"ICollectable: 100 Moedas coletadas por \" + heroi + \"!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        MoedaOuro moeda = new MoedaOuro();\n        moeda.Coletar(\"Arkan\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "ICollectable: 100 Moedas coletadas por Arkan!",
                    "description": "Contrato de item colecionável"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie MoedaOuro moeda = new MoedaOuro(); e chame moeda.Coletar(\"Arkan\");"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: ICollectable: 100 Moedas coletadas por Arkan!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nMoedaOuro moeda = new MoedaOuro();\nmoeda.Coletar(\"Arkan\");"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class MoedaOuro", "Coletar", "new MoedaOuro()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "ICollectable: 100 Moedas coletadas por Arkan!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        },
        {
            "id": "cs_act_35_5",
            "artifactReward": {
                "artifactId": "Crown_Sanctum",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Disparador de Ação Polimórfica por Interface",
            "difficulty": "medium",
            "description": "Crie a classe AtacantePolimorfico com public void ExecutarAtaque(string armaNome, int forca) { Debug.Log(\"Ataque por Interface: [\" + armaNome + \"] desferiu \" + forca + \" de dano!\"); }. Instancie e execute para armaNome = \"Martelo_Trovao\" e forca = 95.",
            "validationRules": {
                "requiredPatterns": [
                    "class AtacantePolimorfico",
                    "ExecutarAtaque",
                    "new AtacantePolimorfico()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class AtacantePolimorfico\n{\n    public void ExecutarAtaque(string armaNome, int forca)\n    {\n        Debug.Log(\"Ataque por Interface: [\" + armaNome + \"] desferiu \" + forca + \" de dano!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute com (\"Martelo_Trovao\", 95)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class AtacantePolimorfico\n{\n    public void ExecutarAtaque(string armaNome, int forca)\n    {\n        Debug.Log(\"Ataque por Interface: [\" + armaNome + \"] desferiu \" + forca + \" de dano!\");\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        AtacantePolimorfico atk = new AtacantePolimorfico();\n        atk.ExecutarAtaque(\"Martelo_Trovao\", 95);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Ataque por Interface: [Martelo_Trovao] desferiu 95 de dano!",
                    "description": "Ataque desacoplado por contrato"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie AtacantePolimorfico atk = new AtacantePolimorfico(); e chame ExecutarAtaque(\"Martelo_Trovao\", 95);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Ataque por Interface: [Martelo_Trovao] desferiu 95 de dano!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nAtacantePolimorfico atk = new AtacantePolimorfico();\natk.ExecutarAtaque(\"Martelo_Trovao\", 95);"
                }
            ],
            "validator": function(code, output) {
          let errors = [];
          const reqs = ["class AtacantePolimorfico", "ExecutarAtaque", "new AtacantePolimorfico()"];
          for (let r of reqs) {
            if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
          }
          const expFirst = "Ataque por Interface: [Martelo_Trovao] desferiu 95 de dano!";
          if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
          return { pass: errors.length === 0, errors };
        }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = { CAP_35, CAP_35: CAP_35 };
}
if (typeof window !== "undefined") {
    window.CAP_35 = CAP_35;
    window.CAP_35 = CAP_35;
}
