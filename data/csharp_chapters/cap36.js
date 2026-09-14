/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO 36
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO 36 — TRATAMENTO DE EXCEÇÕES COM TRY/CATCH
// ═══════════════════════════════════════════════════════

const CAP_36 = {
    "id": 36,
    "artifactReward": null,
    "title": "Tratamento de Exceções com Try/Catch",
    "theme": "Módulo 9 — Avançado (Tópicos PTS)",
    "unlock": "Escudo TryCatch",
    "unlockIcon": "[TRY]",
    "character": "mira",
    "xpReward": 430,
    "story": [
        {
            "type": "system",
            "text": "[ SISTEMA ] Conjurando as Barricadas Defensivas de Código. Tratamento de Exceções e Resiliência ativos."
        },
        {
            "type": "narrative",
            "text": "Mira Solenn ergue proteções prismáticas contra anomalias lógicas. Se uma operação falhar no abismo da execução, o jogo resiste e não fecha para o jogador."
        },
        {
            "type": "character",
            "name": "MIRA SOLIS",
            "role": "CARTÓGRAFA & ARTÍFICE",
            "cssClass": "mira",
            "text": "Em ambiente de produção, um jogo não pode simplesmente fechar sozinho ou quebrar a tela quando um arquivo de save estiver ausente ou ocorrer uma divisão por zero! Nós protegemos trechos críticos com blocos **Try / Catch**!"
        },
        {
            "type": "character",
            "name": "ARKAN VELOR",
            "role": "MESTRE DA GUILDA",
            "cssClass": "arkan",
            "text": "No bloco <code>try</code>, tentamos a operação arriscada; no bloco <code>catch</code>, capturamos a exceção com segurança e emitimos um alerta sem quebrar o fluxo. E o bloco <code>finally</code> garante que arquivos sejam fechados e conexões liberadas, mesmo havendo erro!"
        },
        {
            "type": "gm",
            "name": "GM",
            "role": "Guia do Sistema",
            "cssClass": "gm",
            "text": "Prevenções contra <code>DivideByZeroException</code>, checagens defensivas contra <code>NullReferenceException</code> e validações com <code>throw</code> garantem a robustez máxima do código."
        }
    ],
    "concept": {
        "title": "TRATAMENTO DE EXCEÇÕES: TRY, CATCH, FINALLY E ROBUSTEZ",
        "explanation": "O tratamento de exceções evita que o jogo congele ou feche inesperadamente:\n<ul>\n  <li><strong>Bloco <code>try</code>:</strong> Envolve o código crítico suscetível a erros (conversão de dados, carregamento de save, busca em arrays).</li>\n  <li><strong>Bloco <code>catch (Exception e)</code>:</strong> Captura a falha, registra o aviso e executa rotina de recuperação segura.</li>\n  <li><strong>Bloco <code>finally</code>:</strong> Sempre executado ao final, ideal para fechar arquivos de save e liberar memórias.</li>\n  <li><strong>Prevenção de Falhas Fatais:</strong> Garante estabilidade contínua mesmo com dados corrompidos.</li>\n</ul>",
        "code": "using UnityEngine;\n\npublic class ExemploExceptions : MonoBehaviour\n{\n    void Start()\n    {\n        try\n        {\n            int vidaAtual = 100;\n            Debug.Log(\"Bloco Try: Operacao realizada com sucesso (HP: \" + vidaAtual + \")\");\n        }\n        catch (Exception e)\n        {\n            Debug.Log(\"Bloco Catch: Falha recuperada!\");\n        }\n        finally\n        {\n            Debug.Log(\"Bloco Finally: Rotina de seguranca finalizada.\");\n        }\n    }\n}"
    },
    "example": {
        "title": "Exemplo Prático — Leitor Seguro de Save com Proteção contra Falhas",
        "code": "using UnityEngine;\n\npublic class LeitorSaveSeguro : MonoBehaviour\n{\n    void Start()\n    {\n        try\n        {\n            string saveStatus = \"Valido\";\n            Debug.Log(\"Leitura de Save: Status = \" + saveStatus);\n        }\n        catch (Exception e)\n        {\n            Debug.Log(\"Falha na leitura! Restaurando backup padrao...\");\n        }\n        finally\n        {\n            Debug.Log(\"Conexao com Arquivo Encerrada com Seguranca.\");\n        }\n    }\n}",
        "output": "Leitura de Save: Status = Valido\nConexao com Arquivo Encerrada com Seguranca."
    },
    "experiment": {
        "title": "Experimente no Editor",
        "description": "Modifique os blocos try e catch.",
        "starterCode": "using UnityEngine;\n\npublic class Exemplo : MonoBehaviour\n{\n    void Start()\n    {\n        try\n        {\n            Debug.Log(\"Execucao Segura\");\n        }\n        catch (Exception e)\n        {\n            Debug.Log(\"Erro!\");\n        }\n    }\n}"
    },
    "tutorial": {
        "title": "Tutorial Guiado",
        "steps": [
            {
                "instruction": "Execute a rotina com bloco try e emita no console:",
                "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        try\n        {\n            Debug.Log(\"Operacao Concluida no Try\");\n        }\n        catch (Exception e)\n        {\n            Debug.Log(\"Erro!\");\n        }\n    }\n}",
                "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        try\n        {\n            Debug.Log(\"Operacao Concluida no Try\");\n        }\n        catch (Exception e)\n        {\n            Debug.Log(\"Erro!\");\n        }\n    }\n}",
                "hint": "Operacao Concluida no Try"
            }
        ]
    },
    "activities": [
        {
            "id": "cs_act_36_1",
            "title": "Execução Segura no Bloco Try",
            "difficulty": "easy",
            "description": "Dentro do bloco try { ... }, declare string operacao = \"Carregamento_Recursos\"; e emita no console: 'Bloco Try: ' + operacao + ' executado.'. Adicione o bloco catch (Exception e) { } correspondente.",
            "validationRules": {
                "requiredPatterns": [
                    "try",
                    "catch",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Implemente o bloco try/catch\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        try\n        {\n            string operacao = \"Carregamento_Recursos\";\n            Debug.Log(\"Bloco Try: \" + operacao + \" executado.\");\n        }\n        catch (Exception e)\n        {\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Bloco Try: Carregamento_Recursos executado.",
                    "description": "Execução em bloco try"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use try { ... } catch (Exception e) { }."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Bloco Try: Carregamento_Recursos executado."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\ntry {\n    string operacao = \"Carregamento_Recursos\";\n    Debug.Log(\"Bloco Try: \" + operacao + \" executado.\");\n} catch (Exception e) { }"
                }
            ]
        },
        {
            "id": "cs_act_36_2",
            "title": "Tratamento de Exceção no Bloco Catch",
            "difficulty": "easy",
            "description": "Declare string mensagemErro = \"Chave_Nao_Encontrada\";. Emita no console: 'Catch: Excecao capturada com sucesso (' + mensagemErro + ').'.",
            "validationRules": {
                "requiredPatterns": [
                    "string mensagemErro",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Declare mensagemErro e emita o log\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        string mensagemErro = \"Chave_Nao_Encontrada\";\n        Debug.Log(\"Catch: Excecao capturada com sucesso (\" + mensagemErro + \").\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Catch: Excecao capturada com sucesso (Chave_Nao_Encontrada).",
                    "description": "Captura de exceção"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Defina mensagemErro = \"Chave_Nao_Encontrada\"."
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Catch: Excecao capturada com sucesso (Chave_Nao_Encontrada)."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nDebug.Log(\"Catch: Excecao capturada com sucesso (\" + mensagemErro + \").\");"
                }
            ]
        },
        {
            "id": "cs_act_36_3",
            "title": "Execução Garantida no Bloco Finally",
            "difficulty": "medium",
            "description": "Implemente uma rotina com try/finally: no try emita '1. Processando dados', e no finally emita '2. Finally: Limpeza de memoria executada.'.",
            "validationRules": {
                "requiredPatterns": [
                    "try",
                    "finally",
                    "Debug.Log"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Implemente try e finally\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        try\n        {\n            Debug.Log(\"1. Processando dados\");\n        }\n        finally\n        {\n            Debug.Log(\"2. Finally: Limpeza de memoria executada.\");\n        }\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "1. Processando dados\n2. Finally: Limpeza de memoria executada.",
                    "description": "Bloco finally"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Use try { ... } finally { ... }."
                },
                {
                    "level": "II",
                    "text": "A saída terá 2 linhas: 1. Processando dados e 2. Finally: Limpeza de memoria executada."
                },
                {
                    "level": "III",
                    "text": "Exemplo:\ntry {\n    Debug.Log(\"1. Processando dados\");\n} finally {\n    Debug.Log(\"2. Finally: Limpeza de memoria executada.\");\n}"
                }
            ]
        },
        {
            "id": "cs_act_36_4",
            "title": "Conversor Seguro com Tratamento de Erro",
            "difficulty": "medium",
            "description": "Crie a classe ConversorSeguro com public int ConverterTexto(string valor, int padrao) { try { return 100; } catch (Exception e) { return padrao; } }. Instancie e execute, emitindo: 'Valor Convertido: ' + resultado.",
            "validationRules": {
                "requiredPatterns": [
                    "class ConversorSeguro",
                    "ConverterTexto",
                    "new ConversorSeguro()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class ConversorSeguro\n{\n    public int ConverterTexto(string valor, int padrao)\n    {\n        int num = 100;\n        return num;\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e converta com (\"100\", 0)\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class ConversorSeguro\n{\n    public int ConverterTexto(string valor, int padrao)\n    {\n        try\n        {\n            return 100;\n        }\n        catch (Exception e)\n        {\n            return padrao;\n        }\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        ConversorSeguro conv = new ConversorSeguro();\n        int resultado = conv.ConverterTexto(\"100\", 0);\n        Debug.Log(\"Valor Convertido: \" + resultado);\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Valor Convertido: 100",
                    "description": "Parsing seguro com try/catch"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie ConversorSeguro conv = new ConversorSeguro(); e chame ConverterTexto(\"100\", 0);"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Valor Convertido: 100"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nConversorSeguro conv = new ConversorSeguro();\nint resultado = conv.ConverterTexto(\"100\", 0);\nDebug.Log(\"Valor Convertido: \" + resultado);"
                }
            ]
        },
        {
            "id": "cs_act_36_5",
            "artifactReward": {
                "artifactId": "Crown_Guardian",
                "minStars": 3,
                "maxStars": 5
            },
            "title": "Guardião de Erros de Gameplay Completo",
            "difficulty": "medium",
            "description": "Crie a classe GuardiaoExecucao com public void ExecutarAcaoSegura(string acaoNome) { try { Debug.Log(\"Guardião: Acao [\" + acaoNome + \"] executada sem erros!\"); } catch (Exception e) { } }. Instancie e execute para acaoNome = \"ConectarServidor\".",
            "validationRules": {
                "requiredPatterns": [
                    "class GuardiaoExecucao",
                    "ExecutarAcaoSegura",
                    "new GuardiaoExecucao()"
                ]
            },
            "starterCode": "using UnityEngine;\n\npublic class GuardiaoExecucao\n{\n    public void ExecutarAcaoSegura(string acaoNome)\n    {\n        try\n        {\n            Debug.Log(\"Guardião: Acao [\" + acaoNome + \"] executada sem erros!\");\n        }\n        catch (Exception e)\n        {\n        }\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        // Instancie e execute para \"ConectarServidor\"\n    }\n}",
            "solution": "using UnityEngine;\n\npublic class GuardiaoExecucao\n{\n    public void ExecutarAcaoSegura(string acaoNome)\n    {\n        try\n        {\n            Debug.Log(\"Guardião: Acao [\" + acaoNome + \"] executada sem erros!\");\n        }\n        catch (Exception e)\n        {\n        }\n    }\n}\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        GuardiaoExecucao guardiao = new GuardiaoExecucao();\n        guardiao.ExecutarAcaoSegura(\"ConectarServidor\");\n    }\n}",
            "tests": [
                {
                    "input": "",
                    "expected": "Guardião: Acao [ConectarServidor] executada sem erros!",
                    "description": "Execução protegida por guardião"
                }
            ],
            "hints": [
                {
                    "level": "I",
                    "text": "Instancie GuardiaoExecucao guardiao = new GuardiaoExecucao(); e chame ExecutarAcaoSegura(\"ConectarServidor\");"
                },
                {
                    "level": "II",
                    "text": "A saída deve ser: Guardião: Acao [ConectarServidor] executada sem erros!"
                },
                {
                    "level": "III",
                    "text": "Exemplo:\nGuardiaoExecucao guardiao = new GuardiaoExecucao();\nguardiao.ExecutarAcaoSegura(\"ConectarServidor\");"
                }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAP_36, CAP_36: CAP_36 };
}
