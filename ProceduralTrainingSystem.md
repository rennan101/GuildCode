# Code Leveler — Procedural Training System (PTS)

## 1. Finalidade

O **Procedural Training System (PTS)** existe exclusivamente para os **Boss Battles** do Code Leveler.

O PTS deve:

1. gerar atividades de programação proceduralmente;
2. selecionar o conteúdo adequado para cada jogador;
3. respeitar a dificuldade definida para a Guilda/Lobby;
4. adaptar a composição das atividades ao desempenho individual;
5. validar toda atividade antes de entregá-la;
6. registrar o desempenho do jogador;
7. atualizar o domínio dos conceitos após cada tentativa;
8. evitar repetições excessivas;
9. gerar atividades reproduzíveis por `seed`.

### Fora do escopo

O PTS **não** deve:

- controlar atividades normais da plataforma;
- usar atividades artesanais como fallback;
- possuir dashboard de professor;
- substituir o sistema geral de progressão do jogo;
- confiar no cliente para validar resultados ou progresso.

---

# 2. Regra principal

O PTS não deve armazenar milhares de perguntas completas.

A unidade principal é:

```text
CONCEITO
    ↓
REGRAS
    ↓
TEMPLATE
    ↓
PARÂMETROS
    ↓
GERAÇÃO
    ↓
VALIDAÇÃO
    ↓
ATIVIDADE
```

O conteúdo define **o que ensinar**.

O PTS decide:

```text
qual conceito praticar
qual tópico usar
qual dificuldade usar
qual template usar
quais parâmetros usar
qual atividade gerar
qual atividade evitar
```

---

# 3. Regras obrigatórias

Estas regras têm prioridade sobre qualquer implementação específica.

## 3.1. Determinismo

Toda atividade gerada deve possuir:

```text
seed
generatorVersion
topic
difficulty
```

A combinação:

```text
topic + difficulty + seed + generatorVersion
```

deve produzir a mesma atividade.

Não usar `Math.random()` para decisões importantes da geração.

Usar um gerador determinístico:

```js
const rng = new SeededRandom(seed);
```

---

## 3.2. Validação

Nenhuma atividade pode ser entregue sem validação.

O fluxo obrigatório é:

```text
GERAR
  ↓
VALIDAR ESTRUTURA
  ↓
VALIDAR PEDAGOGIA
  ↓
COMPILAR
  ↓
EXECUTAR TESTES
  ↓
APROVAR
```

Se qualquer etapa obrigatória falhar:

```text
DESCARTAR
↓
GERAR NOVA ATIVIDADE COM NOVA SEED
```

Nunca entregar uma atividade inválida ao jogador.

---

## 3.3. Limite de tentativas de geração

Definir:

```js
MAX_GENERATION_ATTEMPTS
```

Valor inicial recomendado:

```text
5
```

Nunca permitir loop infinito.

Se o limite for atingido sem gerar uma atividade válida:

```text
encerrar geração com erro controlado
```

Não usar atividade artesanal como fallback.

---

# 4. Currículo permitido

O PTS só pode gerar conceitos pertencentes ao currículo abaixo.

## Andar 00 — Fundamentos de entrada, saída e operações

- estrutura mínima de programa;
- `#include <stdio.h>`;
- `main`;
- `return 0`;
- `printf`;
- `scanf`;
- `int`;
- `float`;
- `char`;
- conversão;
- média;
- operações aritméticas;
- divisão inteira;
- divisão decimal;
- módulo;
- formatação de saída;
- ASCII.

## Andar 01 — Variáveis, tipos e operadores

- declaração;
- inicialização;
- `int`;
- `char`;
- `float`;
- `double`;
- atribuição;
- expressões;
- soma;
- subtração;
- multiplicação;
- divisão;
- módulo;
- precedência;
- conversão implícita;
- divisão inteira;
- operador ternário.

## Andar 02 — Condicionais e repetição

- `if`;
- `else`;
- condições;
- operadores relacionais;
- operadores lógicos;
- múltiplos;
- `for`;
- contadores;
- acumuladores;
- tabuada;
- repetição controlada;
- simulação de turnos;
- cálculo em loops.

## Andar 03 — Funções

- declaração;
- definição;
- parâmetros;
- retorno;
- `int`;
- `void`;
- chamada de função;
- reutilização;
- composição de funções;
- funções relacionadas a atributos do jogo.

## Andar 04 — Vetores

- declaração de arrays;
- inicialização;
- índices;
- leitura;
- escrita;
- `for` com vetor;
- maior valor;
- menor valor;
- soma;
- média;
- transformação;
- filtro;
- percurso reverso.

## Andar 05 — Recursividade

- função recursiva;
- caso base;
- caso recursivo;
- soma recursiva;
- Fibonacci;
- potência;
- contagem de dígitos;
- Torre de Hanói;
- profundidade de chamada.

## Andar 06 — Busca e ocorrência

- busca linear;
- contagem de ocorrências;
- posições;
- elemento mais frequente;
- valores únicos;
- busca em matriz;
- linha/coluna;
- comparação entre elementos.

## Andar 07 — Manipulação de vetores

- inserção;
- remoção;
- deslocamento;
- inserção ordenada;
- mesclagem;
- rotação;
- manutenção de ordenação.

## Andar 08 — Busca binária

- vetor ordenado;
- `left`;
- `right`;
- `mid`;
- comparação;
- redução do intervalo;
- busca binária;
- contagem de comparações;
- inserção por posição;
- remoção após busca.

## Andar 09 — Matrizes

- arrays bidimensionais;
- linhas;
- colunas;
- índices `i` e `j`;
- matriz `3x3`;
- soma;
- diagonal principal;
- filtros;
- soma por linha;
- transposta;
- operações entre matrizes.

## Andar 10 — Strings

- `char[]`;
- terminador `'\0'`;
- leitura;
- comprimento;
- percurso;
- inversão;
- vogais;
- comparação;
- manipulação de caracteres;
- busca em strings.

## Andar 11 — Ponteiros

- endereço;
- `&`;
- `*`;
- ponteiro;
- desreferenciação;
- alteração por referência;
- ponteiros e arrays;
- parâmetros por ponteiro;
- retorno de ponteiro.

## Andar 12 — Struct

- `struct`;
- campos;
- declaração;
- inicialização;
- acesso com `.`;
- passagem por valor;
- função recebendo `struct`;
- ponteiro para `struct`;
- atualização de dados.

## Andar 13 — Arrays de Struct

- vetor de structs;
- percurso;
- busca por campo;
- soma;
- média;
- menor;
- maior;
- ordenação por campo;
- seleção de registro.

## Andar 14 — Ordenação

- Bubble Sort;
- Selection Sort;
- crescente;
- decrescente;
- comparações;
- trocas;
- contagem de trocas;
- ordenação de strings;
- ordenação de registros.

## Andar 15 — Arquivos

- `FILE`;
- `fopen`;
- `fclose`;
- `fprintf`;
- `fscanf`;
- `fgets`;
- `fputs`;
- leitura;
- escrita;
- `append`;
- gravação;
- cópia/backup;
- contagem de linhas.

---

# 5. Tópicos e conceitos

Cada tópico deve possuir:

```js
{
    id,
    name,
    concepts,
    difficultyRange,
    prerequisites,
    templates
}
```

Exemplo:

```js
{
    id: "variaveis",
    name: "Variáveis e Tipos Primitivos",

    concepts: [
        "declaracao",
        "inicializacao",
        "int",
        "float",
        "double",
        "char"
    ],

    difficultyRange: [
        "easy",
        "medium",
        "hard"
    ],

    prerequisites: [],

    templates: [
        "declare",
        "initialize",
        "print",
        "convert",
        "combine"
    ]
}
```

Um conceito só pode ser usado se estiver liberado pelo grafo de pré-requisitos.

---

# 6. Templates

Um template define a estrutura pedagógica da atividade.

Ele deve permitir variações sem mudar o objetivo principal.

Exemplo:

```js
{
    id: "declare_int",

    concept: "declaracao",

    difficulty: "easy",

    instructionTemplates: [
        "Declare uma variável inteira chamada {variable} com valor {value}.",
        "Registre {value} pontos de {attribute} usando uma variável int."
    ]
}
```

Parâmetros:

```js
{
    variable: "vida",
    attribute: "vida",
    value: 100
}
```

O resultado é uma atividade concreta.

---

# 7. Geradores de parâmetros

Todo parâmetro deve possuir limites.

Exemplo:

```js
const PARAMS = {
    vida: {
        min: 50,
        max: 150,
        step: 10
    },

    mana: {
        min: 20,
        max: 120,
        step: 10
    },

    nivel: {
        min: 1,
        max: 20,
        step: 1
    }
};
```

Regras:

1. usar apenas valores permitidos;
2. usar valores compatíveis com o objetivo pedagógico;
3. não introduzir conceitos fora do escopo;
4. não criar casos ambíguos;
5. não criar casos sem solução válida.

Exemplo:

Uma atividade sobre divisão inteira não deve introduzir acidentalmente um problema de ponto flutuante se esse conceito não estiver sendo trabalhado.

---

# 8. Dificuldade

Existem duas camadas.

## 8.1. Dificuldade da Guilda

Valores válidos:

```text
easy
medium
hard
expert
```

A dificuldade global é definida pelo professor/admin para a Guilda/Lobby.

Ela define o limite do Boss Battle.

---

## 8.2. Adaptação individual

A dificuldade global nunca é removida.

Exemplo:

```text
Guilda = HARD
```

Todos os jogadores enfrentam:

```text
Boss = HARD
```

Porém, a composição das atividades pode variar.

Jogador com menor domínio:

```text
conceitos mais simples
+ reforço dos conceitos fracos
+ mais suporte
```

Jogador com maior domínio:

```text
maior complexidade
+ combinações de conceitos
+ menos suporte
```

A adaptação individual nunca pode ultrapassar os limites definidos pela Guilda.

---

# 9. Complexidade

A dificuldade deve considerar:

```text
complexidade do conceito
+ quantidade de conceitos
+ quantidade de etapas
+ quantidade de variáveis
+ necessidade de entrada
+ necessidade de saída
+ abstração
+ restrições
```

Referência:

### Easy

```text
1 conceito
1–2 variáveis
entrada simples
saída direta
sem combinação complexa
```

### Medium

```text
1–2 conceitos
2–4 variáveis
condição ou repetição
mais de uma etapa
```

### Hard

```text
2–4 conceitos
combinação de estruturas
mais etapas
restrições adicionais
```

### Expert

```text
múltiplos conceitos
composição de algoritmos
casos de borda
restrições fortes
abstração
```

---

# 10. Grafo de pré-requisitos

O currículo deve ser tratado como um grafo.

Exemplo:

```text
Variáveis
    ↓
Operadores
    ↓
Condicionais
    ↓
Loops
    ↓
Vetores
    ↓
Busca
    ↓
Busca Binária
```

Outros caminhos:

```text
Funções
    ↓
Recursividade
```

```text
Struct
    ↓
Arrays de Struct
    ↓
Ordenação de Structs
```

```text
Strings
    ↓
Ponteiros
```

O PTS nunca deve gerar um conceito antes dos seus pré-requisitos mínimos.

Bom desempenho em um conceito não libera automaticamente conceitos avançados de outro caminho.

---

# 11. Perfil de aprendizagem

O PTS deve manter um perfil de aprendizagem por jogador.

Dados mínimos:

```text
playerId
totalActivities
totalCorrect
totalErrors
averageTimeMs
averageAttempts
averageHints
```

Para cada conceito:

```text
mastery
attempts
correct
errors
averageTimeMs
averageHints
lastPracticedAt
```

Também registrar, quando disponível:

```text
tipo de erro
sequência de acertos
sequência de erros
dificuldade enfrentada
data da última prática
```

Esses dados existem para adaptar futuros Boss Battles.

---

# 12. Mastery Score

Cada conceito possui um valor:

```text
0.00–1.00
```

Escala:

```text
0.00           = não avaliado
0.01–0.29      = iniciante
0.30–0.49      = em desenvolvimento
0.50–0.69      = funcional
0.70–0.84      = dominado
0.85–1.00      = consolidado
```

O `Mastery Score` não pode depender somente de acertos.

Considerar:

```text
acurácia
+ consistência
+ velocidade relativa
+ uso de dicas
+ desempenho recente
+ dificuldade resolvida
```

Os pesos devem ser configuráveis.

---

# 13. Atualização do domínio

Cada tentativa gera um `Learning Event`.

Fluxo:

```text
tentativa
    ↓
avaliação
    ↓
Learning Event
    ↓
atualizar métricas
    ↓
atualizar mastery
    ↓
atualizar tendência
    ↓
selecionar próxima atividade
```

Tentativas não devem gerar punição permanente.

Elas são evidências para adaptação.

---

# 14. Tipos de erro

Quando possível, classificar o erro.

Valores:

```text
syntax_error
compile_error
runtime_error
wrong_output
wrong_algorithm
wrong_type
wrong_condition
wrong_loop
wrong_index
wrong_pointer
wrong_memory
wrong_string
wrong_struct
wrong_file_operation
timeout
empty_submission
```

Não registrar somente:

```text
wrong
```

---

# 15. Dicas

Registrar:

```text
hintLevel
hintCount
hintConcept
```

Referência:

```text
0 dicas = independência alta
1 dica   = suporte leve
2 dicas  = suporte moderado
3 dicas  = dependência alta
```

Uma resposta correta com muitas dicas não deve ter o mesmo peso de uma resposta correta sem dicas.

---

# 16. Tempo

O tempo deve ser comparado ao tempo esperado da atividade.

Fórmula:

```text
tempoRelativo =
tempoDoJogador / tempoEsperado
```

Referência:

```text
< 0.75x       = muito rápido
0.75x–1.25x   = esperado
1.25x–2x      = lento
> 2x          = muito lento
```

Os limites devem ser configuráveis.

Nunca comparar velocidade sem considerar a dificuldade.

---

# 17. Tentativas

Tentativas são evidência de domínio.

Exemplo:

```text
1 tentativa + acerto
→ evidência forte

3 tentativas + acerto
→ domínio parcial

5 tentativas + acerto
→ conceito possivelmente instável
```

Não aplicar uma penalidade permanente por quantidade de tentativas.

---

# 18. Seleção adaptativa

A seleção inicial recomendada é:

```text
40% → conceitos fracos
30% → conceitos em desenvolvimento
20% → conceitos dominados
10% → revisão aleatória
```

Os pesos devem ser configuráveis.

O objetivo é equilibrar:

```text
REMEDIAR
→ PRATICAR
→ CONSOLIDAR
→ DESAFIAR
→ REVISAR
```

Não repetir somente erros.

Não entregar somente conteúdo dominado.

---

# 19. Revisão espaçada

Conceitos dominados devem continuar sendo revisados.

Referência:

```text
1º domínio → revisar em 1 sessão
2º domínio → revisar em 2 sessões
3º domínio → revisar em 4 sessões
4º domínio → revisar em 8 sessões
```

Se houver falha na revisão:

```text
reduzir intervalo
```

---

# 20. Recuperação após erros

Se o jogador falhar em uma atividade difícil:

```text
erro
→ mesma ideia com parâmetros diferentes
```

Se falhar novamente:

```text
→ reduzir complexidade
```

Após acerto:

```text
→ dificuldade intermediária
```

Após acertos consistentes:

```text
→ retornar à dificuldade original
```

Não abandonar imediatamente o conceito que causou o erro.

---

# 21. Promoção e perda de domínio

## Promoção

Um conceito pode ser considerado `dominado` quando:

```text
mastery >= 0.70
+ número mínimo de tentativas
+ evidência recente
+ baixa dependência de dicas
```

`Consolidado`:

```text
mastery >= 0.85
+ revisões espaçadas bem-sucedidas
```

## Perda de domínio

O domínio pode sofrer `decay` controlado quando:

```text
muito tempo sem prática
+
falha em revisão
```

O sistema deve distinguir:

```text
não aprendeu
```

de:

```text
aprendeu e esqueceu parcialmente
```

---

# 22. Anti-repetição

O PTS deve evitar atividades excessivamente semelhantes.

Manter:

```text
recentActivityHashes
recentTemplates
recentParameters
recentConceptCombinations
```

Regra:

```text
se similaridade > limite
    → rejeitar
    → gerar novamente
```

A repetição não precisa ser bloqueada para sempre.

Uma atividade semelhante pode reaparecer posteriormente como revisão.

---

# 23. Geração de uma atividade

Fluxo obrigatório:

```text
1. Ler configuração da Guilda
2. Ler perfil do jogador
3. Verificar pré-requisitos
4. Identificar conceitos prioritários
5. Selecionar tópico
6. Selecionar dificuldade permitida
7. Selecionar template
8. Gerar parâmetros
9. Construir descrição
10. Construir starterCode
11. Construir hints
12. Construir tests
13. Construir validator
14. Validar estrutura
15. Validar pedagogia
16. Compilar
17. Executar testes
18. Verificar anti-repetição
19. Aprovar ou rejeitar
20. Entregar atividade válida
```

---

# 24. Validação estrutural

Verificar obrigatoriamente:

```text
id
title
description
starterCode
hints
tests
validator
topic
concepts
difficulty
seed
generatorVersion
```

Nenhum campo obrigatório pode estar ausente ou inválido.

---

# 25. Validação pedagógica

Verificar:

```text
conceitos pertencem ao currículo
dificuldade é compatível
pré-requisitos estão liberados
não existe conceito futuro não permitido
quantidade de etapas é compatível
instrução é clara
parâmetros não alteram o objetivo
```

---

# 26. Validação executável

Sempre que tecnicamente possível:

```text
gerar código esperado
    ↓
compilar
    ↓
executar
    ↓
testar saída
    ↓
testar casos de borda
```

Uma atividade que não possa ser validada não deve ser entregue.

---

# 27. Estrutura da atividade

O PTS deve manter compatibilidade com o formato atual:

```js
{
    id,
    title,
    difficulty,
    xp,
    description,
    starterCode,
    hints,
    tests,
    validator
}
```

Adicionar:

```js
{
    topic,
    concepts,
    seed,
    generatorVersion,
    prerequisites,
    estimatedTime,
    metadata
}
```

Exemplo:

```js
{
    id: "generated_92831",
    title: "O Guardião da Variável",
    difficulty: "medium",
    xp: 100,
    description: "...",
    starterCode: "...",
    hints: [],
    tests: [],
    validator: "...",

    topic: "variaveis",
    concepts: ["declaracao", "int"],
    seed: 92831,
    generatorVersion: "1.0.0",
    prerequisites: [],
    estimatedTime: 30,
    metadata: {}
}
```

---

# 28. Boss Battle

Um Boss Battle não deve ser uma lista aleatória.

Ele deve possuir fases pedagógicas.

Estrutura:

```text
BOSS
├── Fase 1 — Aquecimento
├── Fase 2 — Conceito principal
├── Fase 3 — Combinação
├── Fase 4 — Desafio
└── Fase 5 — Finalização
```

Exemplo para Vetores:

```text
Fase 1 → acesso por índice
Fase 2 → percurso com for
Fase 3 → busca
Fase 4 → transformação
Fase 5 → problema combinado
```

O conteúdo de cada fase deve ser adaptado ao jogador.

---

# 29. Configuração do Boss

Cada Boss pode possuir:

```js
{
    difficulty: "medium",
    minPlayerMastery: 0.40,
    maxComplexity: 3,
    stages: 5
}
```

A dificuldade global vem da Guilda.

A adaptação interna vem do perfil do jogador.

---

# 30. Configuração da Guilda/Lobby

A configuração deve ser armazenada por Guilda/Lobby.

Exemplo:

```js
{
    guildId: "guild_001",

    bossTraining: {
        difficulty: "medium",
        adaptiveLearning: true,
        allowIndividualAdaptation: true,
        minDifficulty: "easy",
        maxDifficulty: "medium"
    },

    updatedBy: "teacher_001",
    updatedAt: 1770000000000,
    version: 4
}
```

Valores válidos de dificuldade:

```text
easy
medium
hard
expert
```

---

# 31. Regra global da Guilda

Se o professor definir:

```text
Boss Difficulty = HARD
```

todos os jogadores daquela Guilda devem enfrentar:

```text
Boss = HARD
```

Não editar jogador por jogador.

A adaptação individual só pode alterar a composição interna das atividades.

---

# 32. Permissões

Somente usuários autorizados podem alterar a dificuldade global.

Referência:

```text
student      → não pode
player       → não pode
teacher      → pode
admin        → pode
guild_owner  → somente se autorizado pelo sistema
```

Toda alteração deve gerar log.

Exemplo:

```js
{
    guildId,
    changedBy,
    oldDifficulty,
    newDifficulty,
    timestamp,
    configVersion
}
```

---

# 33. Versionamento da configuração

A Guilda deve possuir:

```text
configVersion
```

Exemplo:

```text
12
```

Ao alterar:

```text
MEDIUM → HARD
```

incrementar:

```text
12 → 13
```

Novas sessões usam a versão 13.

Sessões já iniciadas continuam usando a configuração registrada no início.

---

# 34. Sessão de Boss Training

Cada sessão deve possuir:

```js
{
    sessionId,
    playerId,
    guildId,

    configVersion,
    bossDifficulty,

    startedAt,
    endedAt,

    activitiesCompleted,
    activitiesCorrect,

    conceptsPracticed,
    conceptsImproved
}
```

Estados:

```text
CREATED
→ ACTIVE
→ COMPLETED
```

Estados alternativos:

```text
ABANDONED
EXPIRED
CANCELLED
```

---

# 35. Learning Event

Cada tentativa deve gerar um evento.

Formato mínimo:

```js
{
    eventId,
    sessionId,
    playerId,
    guildId,

    activityId,
    generatorVersion,
    seed,

    topic,
    concepts,
    difficulty,

    result,
    attempts,
    timeMs,
    hintsUsed,

    compilerErrors,
    runtimeErrors,

    startedAt,
    submittedAt
}
```

---

# 36. Integridade do aprendizado

O progresso pedagógico deve ser derivado dos eventos.

Fluxo:

```text
Learning Events
    ↓
Aggregation
    ↓
Mastery Snapshot
```

O snapshot pode ser armazenado para performance.

Os eventos devem permanecer suficientes para reconstruir o estado do aprendizado.

Não depender exclusivamente de um valor manual como:

```js
player.mastery = 0.72;
```

---

# 37. Segurança

Nunca confiar no cliente para:

```text
resultado
XP
mastery
difficulty
configuração da Guilda
conclusão do Boss
```

O servidor deve validar:

```text
resultado
atividade
seed
generatorVersion
configVersion
permissões
```

---

# 38. Cache

Atividades podem ser armazenadas temporariamente.

Chave:

```text
generatorVersion
+
topic
+
difficulty
+
seed
```

O cache pode evitar regeneração.

O cache não substitui os dados de aprendizagem.

---

# 39. Performance

Evitar geração pesada em tempo real quando não for necessário.

Usar:

```text
pequena fila pré-gerada
+
cache
+
geração sob demanda
```

Exemplo:

```text
Fila:
[A] [B] [C]

Jogador termina A
        ↓
gerar D
```

---

# 40. Separação de responsabilidades

Não misturar responsabilidades.

```text
Evaluation Engine
→ verifica se a resposta está correta

Learning Engine
→ interpreta o resultado para o aprendizado

Difficulty Engine
→ calcula dificuldade permitida

Topic Selector
→ escolhe o conteúdo

Activity Generator
→ gera a atividade

Validator
→ verifica se a atividade é válida

Persistence
→ salva eventos e estado

Boss Training Manager
→ controla o fluxo do Boss Battle
```

---

# 41. Estrutura recomendada

```text
ProceduralTrainingSystem/
│
├── core/
│   ├── TrainingOrchestrator.js
│   ├── ActivityGenerator.js
│   ├── ActivityValidator.js
│   ├── DifficultyEngine.js
│   ├── AdaptationEngine.js
│   ├── TopicSelector.js
│   └── SeededRandom.js
│
├── content/
│   └── C/
│       ├── estrutura-basica.js
│       ├── entrada-saida.js
│       ├── variaveis.js
│       ├── operadores.js
│       ├── condicionais.js
│       ├── loops.js
│       ├── funcoes.js
│       ├── vetores.js
│       ├── recursividade.js
│       ├── busca.js
│       ├── manipulacao-vetores.js
│       ├── busca-binaria.js
│       ├── matrizes.js
│       ├── strings.js
│       ├── ponteiros.js
│       ├── structs.js
│       ├── arrays-struct.js
│       ├── ordenacao.js
│       └── arquivos.js
│
├── learning/
│   ├── PlayerLearningProfile.js
│   ├── MasteryEngine.js
│   └── LearningEvents.js
│
├── persistence/
│   ├── TrainingRepository.js
│   ├── PlayerRepository.js
│   └── GuildRepository.js
│
└── boss/
    ├── BossTrainingManager.js
    └── BossDifficultyConfig.js
```

---

# 42. Dados que devem ser mantidos

O PTS deve manter dados suficientes para adaptar o treinamento futuro.

### Por jogador

```text
desempenho
tentativas
tempo
dicas
erros
mastery por conceito
última prática
histórico recente
```

### Por atividade

```text
activityId
seed
generatorVersion
topic
concepts
difficulty
resultado
```

### Por sessão

```text
sessionId
playerId
guildId
configVersion
bossDifficulty
início
fim
```

### Por Guilda

Somente a configuração necessária ao Boss Training:

```text
guildId
bossDifficulty
minDifficulty
maxDifficulty
adaptiveLearning
allowIndividualAdaptation
configVersion
```

---

# 43. Métricas internas do gerador

Registrar para detectar problemas técnicos:

```text
generationSuccessRate
generationRetryRate
validationFailureRate
averageGenerationTime
cacheHitRate
retryRate
```

Essas métricas são de observabilidade técnica.

Não fazem parte do perfil pedagógico do jogador.

---

# 44. XP e aprendizado

Separar:

```text
XP
=
recompensa do jogo
```

de:

```text
Mastery
=
evidência de aprendizado
```

XP não deve ser usado como métrica principal de domínio.

---

# 45. Fairness

O PTS não deve:

- reduzir indefinidamente a dificuldade;
- aumentar a dificuldade como punição;
- comparar jogadores apenas por velocidade;
- considerar uma única questão como prova de domínio;
- permitir que adaptação individual ultrapasse a configuração global;
- gerar conteúdo sem pré-requisitos;
- penalizar permanentemente o jogador por tentativas.

---

# 46. Princípio de decisão

Ao escolher a próxima atividade, aplicar esta ordem:

```text
1. Respeitar configuração da Guilda
2. Respeitar pré-requisitos
3. Respeitar progressão curricular
4. Identificar conceitos prioritários
5. Escolher dificuldade permitida
6. Evitar repetição
7. Gerar
8. Validar
9. Entregar somente se válida
10. Registrar o resultado
```

Nunca inverter essa prioridade.

---

# 47. Exemplo de adaptação

Perfil:

```text
Variáveis       0.90
Condicionais    0.76
Loops           0.62
Vetores         0.35
```

Guilda:

```text
Boss Difficulty = HARD
```

O Boss continua:

```text
HARD
```

Mas a composição pode ser:

```text
Fase 1 → Vetores básico
Fase 2 → Vetores + loops
Fase 3 → Busca linear
Fase 4 → Busca + condição
Fase 5 → desafio combinado
```

Outro jogador:

```text
Vetores      0.88
Busca        0.82
Ordenação    0.76
```

Pode receber:

```text
Fase 1 → revisão rápida
Fase 2 → busca
Fase 3 → busca + ordenação
Fase 4 → maior complexidade
Fase 5 → desafio combinado
```

O Boss é o mesmo.

A experiência de treinamento é individual.

---

# 48. MVP de implementação

Implementar nesta ordem.

## Fase 1 — Núcleo

```text
Topic Registry
Concept Registry
Templates
SeededRandom
Activity Generator
Validator
```

## Fase 2 — Compatibilidade

Garantir o formato:

```text
id
title
difficulty
xp
description
starterCode
hints
tests
validator
```

## Fase 3 — Aprendizagem

```text
Learning Events
Mastery Score
Topic Selector
Difficulty Engine
Anti-Repetition
```

## Fase 4 — Boss Battle

```text
Boss Training Manager
Stages
Guild Difficulty
Adaptive Player Composition
```

## Fase 5 — Persistência

```text
Player Profile
Sessions
Events
Mastery
Guild Config
Audit Logs
```

Não implementar funcionalidades de dashboard de professor dentro do PTS.

---

# 49. Regra final para implementação por IA

Ao implementar ou alterar o PTS:

```text
NÃO INVENTAR NOVAS REGRAS
SEM NECESSIDADE.

NÃO GERAR CONTEÚDO FORA DO CURRÍCULO.

NÃO IGNORAR PRÉ-REQUISITOS.

NÃO ENTREGAR ATIVIDADE NÃO VALIDADA.

NÃO USAR Math.random() PARA DECISÕES IMPORTANTES.

NÃO USAR ATIVIDADE ARTESANAL COMO FALLBACK.

NÃO PERMITIR QUE O JOGADOR ALTERE A DIFICULDADE GLOBAL.

NÃO CONFIAR NO CLIENTE PARA RESULTADOS OU PROGRESSO.

NÃO MISTURAR AVALIAÇÃO, APRENDIZAGEM, GERAÇÃO E PERSISTÊNCIA.

NÃO APAGAR O HISTÓRICO DE APRENDIZAGEM DO JOGADOR.

SEMPRE RESPEITAR A CONFIGURAÇÃO DA GUILDA.

SEMPRE VALIDAR ANTES DE ENTREGAR.

SEMPRE REGISTRAR A SEED E A VERSÃO DO GERADOR.
```

## Resultado esperado

O PTS deve permitir que o Code Leveler gere uma grande variedade de atividades de Boss Battle a partir de um conjunto compacto de:

```text
conceitos
+
regras
+
templates
+
parâmetros
+
validadores
```

sem depender de milhares de perguntas armazenadas manualmente.

O sistema deve usar o histórico do jogador para decidir **o que praticar em seguida**, mantendo:

```text
progressão curricular
+
dificuldade da Guilda
+
adaptação individual
+
validação
+
reprodutibilidade
+
integridade do aprendizado
```
