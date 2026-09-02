# Code Leveler — Boss Battle Raids em Tempo Real

## Documento de Implementação para Antigravity IDE

> **Objetivo:** implementar o sistema completo de **Boss Battle Raids** do Code Leveler como um modo cooperativo online, sincronizado em tempo real, baseado em turnos, habilidades de programação e batalhas animadas.

---

# 1. Visão geral

As **Boss Battle Raids** são batalhas cooperativas contra chefes associadas aos capítulos do modo História.

Apesar de a sessão multiplayer ser sincronizada **em tempo real**, o combate utiliza um sistema de **turnos dinâmicos baseado em velocidade**.

A raid deve combinar:

- multiplayer em tempo real;
- parties de até 4 jogadores;
- turnos baseados em velocidade;
- desafios de programação no editor/terminal;
- combate cooperativo;
- escolhas estratégicas;
- subclasses;
- avatares;
- animações;
- sons;
- recompensas;
- estatísticas de performance.

A experiência visual deve parecer um verdadeiro modo de raid de RPG, e não uma tela administrativa.

---

# 2. Regras de desbloqueio

O jogador somente pode acessar Boss Battles quando cumprir **TODAS** as condições:

```ts
player.level >= 5 &&
player.subclass !== null
```

Além disso, cada Boss Battle individual é desbloqueada somente quando o capítulo correspondente for concluído no modo História.

## Indicador visual no mapa

Após concluir um capítulo:

- manter o ícone normal do capítulo/modo História;
- abaixo dele, exibir um novo botão/ícone de Boss;
- utilizar formato de losango;
- borda vermelha;
- utilizar SVG de caveira ou monstro;
- adicionar brilho/pulso discreto quando houver Boss disponível.

Exemplo conceitual:

```text
[ CAPÍTULO ]
     ↓
◇ 💀 ◇
BOSS RAID
```

O estado visual deve diferenciar:

- `LOCKED`
- `AVAILABLE`
- `COMPLETED`
- `IN_PROGRESS`

---

# 3. Estrutura principal do sistema

Criar uma arquitetura modular.

```text
src/
├── features/
│   └── bossRaid/
│       ├── components/
│       ├── screens/
│       ├── hooks/
│       ├── services/
│       ├── engine/
│       ├── utils/
│       ├── types/
│       ├── constants/
│       └── sounds/
│
├── data/
│   ├── bosses.ts
│   ├── avatars.ts
│   └── raidChallenges.ts
│
└── multiplayer/
    └── raidRealtime/
```

Separar claramente:

1. interface;
2. estado local;
3. sincronização multiplayer;
4. motor de combate;
5. geração/validação dos desafios;
6. cálculo de dano;
7. animações;
8. áudio.

Não colocar toda a lógica em um único componente React.

---

# 4. Lobby da Boss Raid

Ao clicar em um Boss Battle, abrir uma tela de lobby.

## Informações exibidas

Exibir:

- nome do Boss;
- capítulo associado;
- assunto/conteúdo do capítulo;
- descrição curta do desafio;
- nível recomendado;
- preview do Boss;
- dificuldade;
- número de jogadores conectados;
- status da party.

## Regra da Party

Somente membros da mesma Party podem participar da mesma raid.

Não exigir que todos os membros da Party estejam online.

Exemplos válidos:

- Party possui 4 membros e apenas 1 está online → raid pode iniciar.
- Party possui 4 membros e 2 entram → raid pode iniciar.
- Party possui 4 membros e todos entram → raid com 4 jogadores.

O máximo é sempre **4 jogadores**.

## Cards dos jogadores

Exibir até quatro cards.

Cada card deve mostrar:

- avatar;
- nome;
- nível;
- Code Power;
- subclasse;
- habilidades relevantes;
- status Ready/Not Ready;
- indicador de conexão.

Exemplo:

```text
┌─────────────────────┐
│       AVATAR        │
│ Rennan              │
│ Lv. 12              │
│ ⚡ 1.850 Code Power │
│ CODEMANCER          │
│ Subclasse: Debugger │
│ READY ✓             │
└─────────────────────┘
```

## Troca de avatar

No lobby, permitir que o jogador altere seu avatar antes de confirmar presença.

A troca:

- altera imediatamente os atributos utilizados na raid;
- deve sincronizar visualmente para todos;
- não pode alterar o avatar de outro jogador;
- deve ficar bloqueada após o início da batalha.

## Ready System

Cada jogador possui botão:

```text
PRONTO
```

Quando pressionado:

```ts
ready = true
```

Quando todos os jogadores presentes estiverem prontos:

1. bloquear entrada/saída de jogadores;
2. bloquear troca de avatar;
3. iniciar contador sincronizado;
4. mostrar:

```text
5
4
3
2
1
BATTLE START
```

Todos os clientes devem receber o mesmo timestamp de início.

---

# 5. Sincronização em tempo real

O servidor/backend deve ser a fonte autoritativa para:

- ordem dos turnos;
- HP;
- dano;
- defesa;
- ações;
- cooldowns;
- jogadores caídos;
- vitória;
- derrota;
- recompensas;
- estatísticas.

O cliente não deve ser responsável por decidir resultados críticos.

## Eventos sugeridos

```ts
RAID_CREATED
RAID_JOINED
RAID_LEFT
RAID_PLAYER_READY
RAID_COUNTDOWN_STARTED
RAID_STARTED

TURN_CHANGED

PLAYER_ACTION_SELECTED
PLAYER_CHALLENGE_STARTED
PLAYER_CHALLENGE_SUCCESS
PLAYER_CHALLENGE_FAILED

BOSS_TARGETS_SELECTED
BOSS_ACTION_STARTED
BOSS_DAMAGE_APPLIED

PLAYER_DAMAGED
PLAYER_DOWNED
PLAYER_REVIVED

RAID_VICTORY
RAID_DEFEAT
RAID_REWARD_GRANTED
```

Utilizar timestamps para sincronizar countdowns e animações.

---

# 6. Sistema de turnos por velocidade

Cada entidade possui velocidade.

```ts
type CombatSpeed = number;
```

Entidades:

- Boss;
- Player 1;
- Player 2;
- Player 3;
- Player 4.

Utilizar um sistema de barra de iniciativa.

## Modelo recomendado

Cada entidade possui:

```ts
initiative: number
speed: number
```

Em cada ciclo:

```ts
initiative += speed
```

Quando:

```ts
initiative >= 100
```

a entidade recebe turno e:

```ts
initiative -= 100
```

Isso permite que personagens mais rápidos joguem mais vezes.

## Velocidade recomendada

```ts
playerSpeed =
    avatar.baseSpeed +
    floor(player.level * 0.4) +
    subclassSpeedBonus

bossSpeed =
    boss.baseSpeed +
    boss.chapterScaling
```

O HUD deve mostrar claramente:

```text
TURNO ATUAL
→ RENNAN
```

ou:

```text
TURNO ATUAL
→ BOSS
```

O avatar/Boss ativo deve receber:

- glow;
- escala levemente maior;
- animação idle flutuante;
- destaque na timeline.

---

# 7. Layout da batalha

## Boss

Posição:

```text
TOPO CENTRAL
```

Exibir:

- ícone grande;
- nome;
- barra de HP muito maior;
- efeitos de status.

## Jogadores

Posição:

```text
PARTE INFERIOR
```

Os jogadores devem aparecer lado a lado.

Cada jogador exibe:

- avatar;
- nome;
- HP;
- estado;
- subclasse;
- status temporários.

Exemplo:

```text
                    [ BOSS ]
          ████████████████████████
                   78%

[P1]       [P2]       [P3]       [P4]
HP ████    HP ███     HP ██      HP ████
```

---

# 8. Turno do jogador

No turno do jogador, disponibilizar três ações principais.

## 8.1 Atacar

```text
⚔ ATACAR
```

O jogador seleciona uma ação ofensiva.

Após selecionar:

1. abrir mini desafio no editor;
2. iniciar countdown;
3. jogador escreve/completa código;
4. envia submissão;
5. backend valida.

Se correto:

```text
HIT
```

Aplicar dano.

Se incorreto ou o tempo acabar:

```text
MISS
```

Nenhum dano é aplicado.

---

## 8.2 Usar Item

```text
🧪 ITEM
```

Exemplo inicial:

- poção de cura.

Também exige mini desafio de programação.

Se correto:

```text
HEAL
```

Aplicar cura.

Se falhar:

```text
MISS
```

O item não deve ser consumido em caso de falha, salvo regra específica futura.

---

## 8.3 Ajudar amigo

Somente aparece se existir pelo menos um jogador:

```ts
status === 'DOWNED'
```

Fluxo:

1. selecionar jogador caído;
2. abrir mini desafio;
3. resolver;
4. submeter.

Sucesso:

```text
REVIVE
```

O jogador retorna com:

```ts
revivedHp = player.maxHp * 0.30
```

Falha:

```text
MISS
```

---

# 9. Sistema de desafios de programação

Cada ação deve possuir um desafio curto e contextualizado ao conteúdo do capítulo.

Os desafios precisam ser:

- rápidos;
- objetivos;
- possíveis de validar automaticamente;
- compatíveis com o conteúdo já estudado;
- escaláveis por dificuldade.

## Exemplo

Capítulo sobre `if/else`.

Ataque:

```c
// Corrija a condição para atacar o Boss
if (bossHP > 0) {
    attack();
}
```

Esquiva:

```c
// Complete a condição para evitar o ataque
if (incomingDamage > 50) {
    dodge();
}
```

## Countdown

Cada tipo de ação possui tempo diferente.

Sugestão inicial:

| Ação | Tempo |
|---|---:|
| Ataque | 25s |
| Contra-golpe | 20s |
| Esquiva | 15s |
| Item | 20s |
| Ajudar amigo | 30s |

Esses valores devem ficar centralizados em configuração.

```ts
const RAID_ACTION_TIMERS = {
    attack: 25,
    counter: 20,
    dodge: 15,
    item: 20,
    revive: 30
};
```

---

# 10. Comportamento do Boss

Quando chega o turno do Boss, ele deve selecionar uma ação.

Tipos:

```ts
type BossAction =
    | 'SINGLE_TARGET'
    | 'MULTI_TARGET'
    | 'AOE';
```

## Ataque individual

Selecionar:

```ts
1 jogador vivo
```

## Multi-target

Selecionar:

```ts
2 ou 3 jogadores vivos
```

## AoE

Selecionar:

```ts
todos os jogadores vivos
```

A escolha deve ser aleatória, mas configurável por pesos.

Exemplo:

```ts
const actionWeights = {
    SINGLE_TARGET: 0.50,
    MULTI_TARGET: 0.35,
    AOE: 0.15
};
```

Bosses futuros podem ter comportamentos próprios.

---

# 11. Aviso de alvo

Antes do dano do Boss:

1. selecionar os alvos;
2. destacar os jogadores;
3. mostrar alerta vermelho;
4. aguardar reação.

Exemplo visual:

```text
⚠ ALERTA
BOSS PREPARA ATAQUE
```

Nos jogadores afetados:

```text
Borda vermelha
Glow vermelho
Ícone de perigo
```

---

# 12. Reação defensiva

Somente jogadores selecionados como alvo podem reagir.

Três opções:

## Contra-golpe

```text
⚔ CONTRA-GOLPE
```

Sucesso:

- reduz dano recebido;
- causa dano no Boss.

Falha:

- recebe dano completo.

## Esquivar

```text
💨 ESQUIVAR
```

Sucesso:

```ts
damage = 0
```

Falha:

- recebe dano completo.

## Usar Item

```text
🧪 ITEM
```

Sucesso:

- executa efeito do item antes/de acordo com a resolução do golpe;
- pode reduzir o risco de ser derrubado.

Cada reação abre um mini desafio de programação.

Se falhar ou o tempo acabar:

```text
MISS
```

---

# 13. Jogador caído

Quando:

```ts
player.currentHp <= 0
```

o estado passa para:

```ts
status = 'DOWNED'
```

Consequências:

- não recebe turnos normais;
- não pode atacar;
- não pode usar item;
- não pode contra-atacar;
- não pode esquivar;
- aguarda ajuda.

Outro jogador deve usar:

```text
AJUDAR AMIGO
```

para revivê-lo.

Jogadores caídos ainda recebem recompensas caso a Party vença.

---

# 14. Sistema de atributos

Cada jogador possui:

- HP;
- Attack;
- Defense;
- Speed;
- Code Power;
- Level.

## Fórmula de HP

```ts
maxHp =
    avatar.baseHp *
    (1 + (player.level - 1) * 0.08) *
    codePowerHpMultiplier
```

Onde:

```ts
codePowerHpMultiplier =
    1 + ((player.codePower - 1000) / 10000)
```

Com mínimo:

```ts
codePowerHpMultiplier >= 1
```

## Fórmula de ataque

```ts
attack =
    avatar.baseAttack *
    (1 + (player.level - 1) * 0.055) *
    codePowerCombatMultiplier
```

## Fórmula de defesa

```ts
defense =
    avatar.baseDefense *
    (1 + (player.level - 1) * 0.045) *
    codePowerCombatMultiplier
```

## Code Power

Code Power inicia em:

```ts
1000
```

Para evitar escalonamento exagerado:

```ts
codePowerCombatMultiplier =
    1 + Math.min(
        Math.max((player.codePower - 1000) / 15000, 0),
        0.50
    );
```

Assim:

- 1000 Code Power = sem bônus;
- crescimento progressivo;
- bônus máximo de combate por Code Power = +50%.

---

# 15. Fórmula de dano

## Dano normal

```ts
rawDamage =
    attacker.attack * skillMultiplier
```

Redução de defesa:

```ts
defenseReduction =
    defender.defense /
    (defender.defense + 100)
```

Dano final:

```ts
finalDamage =
    Math.max(
        1,
        Math.round(
            rawDamage * (1 - defenseReduction)
        )
    )
```

## Multiplicadores

```ts
const RAID_ACTION_MULTIPLIERS = {
    attack: 1.0,
    counter: 0.75,
    bossSingle: 1.0,
    bossMulti: 0.80,
    bossAoe: 0.65
};
```

---

# 16. Influência das subclasses

As subclasses devem influenciar a raid.

A implementação precisa ser extensível.

Exemplo de interface:

```ts
interface SubclassRaidModifier {
    damageMultiplier?: number;
    defenseMultiplier?: number;
    healMultiplier?: number;
    reviveBonus?: number;
    counterMultiplier?: number;
    dodgeBonus?: number;
}
```

O sistema deve permitir adicionar modificadores sem alterar o motor central.

As subclasses devem oferecer papéis estratégicos:

- ofensivo;
- suporte;
- defesa;
- precisão;
- controle.

Não hardcodar subclasses diretamente no cálculo principal.

Usar configuração:

```ts
SUBCLASS_RAID_MODIFIERS
```

---

# 17. Atributos base dos 24 avatares

Adicionar ao objeto existente:

```ts
baseHp
baseAttack
baseDefense
baseSpeed
```

Distribuição geral:

- COMMON → atributos equilibrados.
- RARE → especialização moderada.
- EPIC → especialização forte.
- LEGENDARY → maior potencial, sem criar vantagem impossível de compensar.

O `teacherOnly` deve continuar sendo respeitado.

## Código atualizado

Substituir/adicionar os campos abaixo no `AVATAR_SKILLS_DATA`.

```ts
const AVATAR_SKILLS_DATA = {
    '01': {
        id: '01',
        name: 'Shadow Coder',
        title: 'Mestre das Sombras',
        rarity: 'LEGENDARY',
        teacherOnly: true,
        skillName: 'Onisciência do Mestre',
        skillDesc: 'Acesso total irrestrito à biblioteca de algoritmos e autoridade de moderação.',
        bonusType: 'admin',
        bonusValue: 1.0,
        baseHp: 1450,
        baseAttack: 145,
        baseDefense: 110,
        baseSpeed: 105
    },
    '02': {
        id: '02',
        name: 'Neon Coder',
        title: 'Desperto Inicial',
        rarity: 'COMMON',
        skillName: 'Sintonia Neon',
        skillDesc: '+5% de XP em todas as missões concluídas com sucesso na primeira tentativa.',
        bonusType: 'xp_boost',
        bonusValue: 0.05,
        baseHp: 1200,
        baseAttack: 105,
        baseDefense: 90,
        baseSpeed: 110
    },
    '03': {
        id: '03',
        name: 'Code Knight',
        title: 'Paladino da Sintaxe',
        rarity: 'RARE',
        skillName: 'Armadura Sintática',
        skillDesc: 'Reduz em 20% a perda de Renome em derrotas no Coliseu PVP.',
        bonusType: 'pvp_loss_shield',
        bonusValue: 0.20,
        baseHp: 1450,
        baseAttack: 100,
        baseDefense: 135,
        baseSpeed: 80
    },
    '04': {
        id: '04',
        name: 'Rune Coder',
        title: 'Inscritor de Glifos',
        rarity: 'RARE',
        skillName: 'Gravação Arcana',
        skillDesc: 'Reduz em 20% o custo de Tokens para desbloquear dicas nos capítulos 00 a 05.',
        bonusType: 'hint_discount',
        bonusValue: 0.20,
        baseHp: 1250,
        baseAttack: 125,
        baseDefense: 100,
        baseSpeed: 95
    },
    '05': {
        id: '05',
        name: 'SteamCore',
        title: 'Autômato a Vapor',
        rarity: 'RARE',
        skillName: 'Superaquecimento',
        skillDesc: 'Ganha +10% de Renome extra ao vencer duelos PVP em menos de 60 segundos.',
        bonusType: 'pvp_speed_bonus',
        bonusValue: 0.10,
        baseHp: 1400,
        baseAttack: 115,
        baseDefense: 125,
        baseSpeed: 85
    },
    '06': {
        id: '06',
        name: 'Wild Coder',
        title: 'Rastreador Primitivo',
        rarity: 'COMMON',
        skillName: 'Faro de Tesouro',
        skillDesc: '20% de chance de encontrar +10 Tokens adicionais ao submeter desafios de primeira tentativa.',
        bonusType: 'first_try_tokens',
        bonusValue: 10,
        baseHp: 1250,
        baseAttack: 115,
        baseDefense: 85,
        baseSpeed: 115
    },
    '07': {
        id: '07',
        name: 'Moon Compiler',
        title: 'Compilador Noturno',
        rarity: 'RARE',
        skillName: 'Refração Noturna',
        skillDesc: '+15% de XP em missões resolvidas durante a noite (18h às 06h) ou finais de semana.',
        bonusType: 'night_xp',
        bonusValue: 0.15,
        baseHp: 1150,
        baseAttack: 130,
        baseDefense: 85,
        baseSpeed: 120
    },
    '08': {
        id: '08',
        name: 'Gearhead',
        title: 'Mecânico de Memória',
        rarity: 'COMMON',
        skillName: 'Engrenagens de Ouro',
        skillDesc: 'Concede +4 Tokens da Guilda extras em cada missão de capítulo ou do Abismo concluída.',
        bonusType: 'token_flat',
        bonusValue: 4,
        baseHp: 1350,
        baseAttack: 105,
        baseDefense: 115,
        baseSpeed: 90
    },
    '09': {
        id: '09',
        name: 'Fox Coder',
        title: 'Espírito Astuto',
        rarity: 'RARE',
        skillName: 'Astúcia da Raposa',
        skillDesc: '20% de chance de duplicar os Tokens obtidos ao concluir um desafio sem consultar dicas.',
        bonusType: 'token_crit_chance',
        bonusValue: 0.20,
        baseHp: 1100,
        baseAttack: 120,
        baseDefense: 80,
        baseSpeed: 130
    },
    '10': {
        id: '10',
        name: 'Code Prince',
        title: 'Herdeiro Real',
        rarity: 'EPIC',
        skillName: 'Herança Real',
        skillDesc: 'Começa todas as Masmorras do Abismo com +30 segundos adicionais de tempo limite.',
        bonusType: 'abyss_time_bonus',
        bonusValue: 30,
        baseHp: 1350,
        baseAttack: 140,
        baseDefense: 105,
        baseSpeed: 100
    },
    '11': {
        id: '11',
        name: 'Bug Alchemist',
        title: 'Transmutador Lógico',
        rarity: 'RARE',
        skillName: 'Transmutação Lógica',
        skillDesc: 'Converte cada 150 XP ganhos em +15 Tokens adicionais para a Loja da Guilda.',
        bonusType: 'xp_to_tokens',
        bonusValue: 15,
        baseHp: 1200,
        baseAttack: 135,
        baseDefense: 90,
        baseSpeed: 100
    },
    '12': {
        id: '12',
        name: 'Dragon Coder',
        title: 'Conjurador Dracônico',
        rarity: 'EPIC',
        skillName: 'Fôlego do Dragão',
        skillDesc: '+12% de multiplicador em ações de dano de subclasses durante o Coliseu PVP.',
        bonusType: 'pvp_damage',
        bonusValue: 0.12,
        baseHp: 1450,
        baseAttack: 155,
        baseDefense: 95,
        baseSpeed: 95
    },
    '13': {
        id: '13',
        name: 'ChronoBot',
        title: 'Guardião do Tempo',
        rarity: 'EPIC',
        skillName: 'Retorno Temporal',
        skillDesc: 'Concede 1 recarga diária para reiniciar Masmorras do Abismo sem penalidade.',
        bonusType: 'abyss_retry',
        bonusValue: 1,
        baseHp: 1300,
        baseAttack: 125,
        baseDefense: 115,
        baseSpeed: 135
    },
    '14': {
        id: '14',
        name: 'Sakura Coder',
        title: 'Florescer da Mente',
        rarity: 'RARE',
        skillName: 'Pétalas da Calma',
        skillDesc: 'Protege a Ofensiva Diária (Streak) contra 1 dia de ausência na semana.',
        bonusType: 'streak_shield',
        bonusValue: 1,
        baseHp: 1300,
        baseAttack: 115,
        baseDefense: 110,
        baseSpeed: 110
    },
    '15': {
        id: '15',
        name: 'NULL',
        title: 'Anomalia Dimensional',
        rarity: 'EPIC',
        skillName: 'Apagão de Ponteiro',
        skillDesc: 'Imunidade ao primeiro erro de execução (Crash) em dungeons do Abismo.',
        bonusType: 'crash_immunity',
        bonusValue: 1,
        baseHp: 1150,
        baseAttack: 150,
        baseDefense: 85,
        baseSpeed: 125
    },
    '16': {
        id: '16',
        name: 'Princess.exe',
        title: 'Comandante Nobre',
        rarity: 'EPIC',
        skillName: 'Comando Soberano',
        skillDesc: 'Todos os colegas na mesma Party recebem +5% de XP compartilhado passivamente.',
        bonusType: 'party_xp_boost',
        bonusValue: 0.05,
        baseHp: 1450,
        baseAttack: 110,
        baseDefense: 125,
        baseSpeed: 105
    },
    '17': {
        id: '17',
        name: 'Void Caster',
        title: 'Invocador do Vazio',
        rarity: 'EPIC',
        skillName: 'Sifão do Vazio',
        skillDesc: 'Converte 10% da pontuação do adversário derrotado no PVP em Tokens da Guilda.',
        bonusType: 'pvp_token_steal',
        bonusValue: 0.10,
        baseHp: 1200,
        baseAttack: 160,
        baseDefense: 80,
        baseSpeed: 115
    },
    '18': {
        id: '18',
        name: 'Dark Loli',
        title: 'Maga do Abismo',
        rarity: 'EPIC',
        skillName: 'Pacto Obscuro',
        skillDesc: '+25% de XP em desafios de Masmorras do Abismo com 2 ou mais restrições ativas.',
        bonusType: 'abyss_xp_boost',
        bonusValue: 0.25,
        baseHp: 1250,
        baseAttack: 145,
        baseDefense: 90,
        baseSpeed: 120
    },
    '19': {
        id: '19',
        name: 'Otaku Chan',
        title: 'Entusiasta Extrema',
        rarity: 'RARE',
        skillName: 'Hiperfoco',
        skillDesc: 'Aumenta o multiplicador de XP da Ofensiva Diária em +0.2x a cada 5 dias consecutivos.',
        bonusType: 'streak_mult_boost',
        bonusValue: 0.2,
        baseHp: 1200,
        baseAttack: 130,
        baseDefense: 90,
        baseSpeed: 125
    },
    '20': {
        id: '20',
        name: 'Senpai Caster',
        title: 'Mentor Veterano',
        rarity: 'EPIC',
        skillName: 'Tutela Inspiradora',
        skillDesc: 'Concede 1 dica gratuita (Custo 0 Tokens) no primeiro desafio do dia.',
        bonusType: 'daily_free_hint',
        bonusValue: 1,
        baseHp: 1400,
        baseAttack: 120,
        baseDefense: 120,
        baseSpeed: 105
    },
    '21': {
        id: '21',
        name: 'Stack Witch',
        title: 'Arquimaga da Pilha',
        rarity: 'LEGENDARY',
        skillName: 'Magia de Pilha Infinita',
        skillDesc: '+20% de Tokens da Guilda em todos os desafios que utilizam Ponteiros e Structs.',
        bonusType: 'pointers_token_boost',
        bonusValue: 0.20,
        baseHp: 1250,
        baseAttack: 165,
        baseDefense: 100,
        baseSpeed: 120
    },
    '22': {
        id: '22',
        name: 'Nightwitch',
        title: 'Bruxa da Meia-Noite',
        rarity: 'LEGENDARY',
        skillName: 'Sombra Lunar',
        skillDesc: 'Reduz o tempo de recarga de habilidades de subclasse em duelos em 20%.',
        bonusType: 'skill_cooldown_red',
        bonusValue: 0.20,
        baseHp: 1300,
        baseAttack: 150,
        baseDefense: 105,
        baseSpeed: 140
    },
    '23': {
        id: '23',
        name: 'Nightblood',
        title: 'Ceifador Rubro',
        rarity: 'LEGENDARY',
        skillName: 'Grito Carmesim',
        skillDesc: 'No PVP, sua taxa de pontuação aumenta em +25% nos últimos 45 segundos de partida.',
        bonusType: 'pvp_clutch_speed',
        bonusValue: 0.25,
        baseHp: 1400,
        baseAttack: 170,
        baseDefense: 90,
        baseSpeed: 125
    },
    '24': {
        id: '24',
        name: 'Loremaster',
        title: 'Guardião do Grimório',
        rarity: 'LEGENDARY',
        skillName: 'Onisciência de Aethelgard',
        skillDesc: '+10% em TODOS os ganhos do jogo (XP, Tokens e Renome) e borda dourada exclusiva.',
        bonusType: 'universal_boost',
        bonusValue: 0.10,
        baseHp: 1500,
        baseAttack: 150,
        baseDefense: 120,
        baseSpeed: 110
    }
};
```

---

# 18. Boss Scaling

Cada Boss deve possuir:

```ts
interface BossDefinition {
    id: string;
    chapterId: string;
    name: string;
    subject: string;

    baseHp: number;
    baseAttack: number;
    baseDefense: number;
    baseSpeed: number;

    singleTargetMultiplier: number;
    multiTargetMultiplier: number;
    aoeMultiplier: number;

    rewards: BossReward;
}
```

O HP deve escalar pela quantidade de jogadores.

Sugestão:

```ts
bossMaxHp =
    boss.baseHp *
    (1 + (partySize - 1) * 0.65)
```

Exemplo:

| Jogadores | Multiplicador |
|---|---:|
| 1 | 1.00 |
| 2 | 1.65 |
| 3 | 2.30 |
| 4 | 2.95 |

Também considerar nível médio da Party.

```ts
averagePartyLevel =
    sum(player.level) / party.length
```

Aplicar:

```ts
levelScaling =
    1 + Math.max(
        0,
        (averagePartyLevel - recommendedLevel) * 0.05
    )
```

---

# 19. Animações

A batalha deve ser altamente visual.

## Jogador ativo

Aplicar:

```text
idle floating
```

Características:

- movimento vertical suave;
- pequena variação de escala;
- brilho;
- duração contínua durante o turno.

## Ataque do jogador

Sequência:

1. avatar avança até o Boss;
2. executar efeito de ataque;
3. Boss treme;
4. Boss pisca;
5. número de dano flutua;
6. barra de HP reduz animadamente;
7. avatar retorna.

## Boss atacando

Sequência:

1. Boss avança;
2. vai até jogador alvo;
3. impacto;
4. número de dano;
5. jogador pisca/treme;
6. Boss retorna.

Para múltiplos jogadores:

```text
Boss → Player A → retorno
Boss → Player B → retorno
Boss → Player C → retorno
```

Executar sequencialmente.

## Miss

Exibir:

```text
MISS
```

acima do personagem.

Adicionar animação:

- fade;
- subida;
- pequena rotação.

## Dano

Exemplo:

```text
-245
```

Usar número flutuante.

## Cura

Exemplo:

```text
+180
```

---

# 20. Sistema de áudio

Adicionar sons para:

```ts
RAID_SOUND_EVENTS = {
    attack: 'attack',
    damage: 'damage',
    item: 'item',
    dodge: 'dodge',
    counter: 'counter',
    revive: 'revive',
    playerDown: 'playerDown',
    bossDefeat: 'bossDefeat',
    victory: 'victory',
    miss: 'miss'
};
```

Evitar sobreposição excessiva de sons.

Criar um `RaidAudioManager`.

---

# 21. Tela de vitória

Quando:

```ts
boss.currentHp <= 0
```

bloquear novas ações e iniciar sequência de vitória.

Todos os jogadores devem receber a mesma tela.

Exibir:

```text
VICTORY
```

## Estatísticas

Calcular:

### MVP

Maior contribuição geral.

Fórmula sugerida:

```ts
mvpScore =
    totalDamageDealt * 1.0 +
    totalSupportScore * 0.8 +
    successfulActions * 50 +
    revives * 300
```

### Mais dano causado

```ts
max(totalDamageDealt)
```

### Mais dano recebido

```ts
max(totalDamageTaken)
```

### Maior suporte

```ts
max(
    totalHealing +
    revives * 500
)
```

---

# 22. Recompensas

Todos os jogadores participantes recebem recompensas.

Mesmo jogadores:

```text
DOWNED
```

recebem recompensas caso o Boss seja derrotado.

## Recompensa base

```ts
baseXp
baseTokens
```

## Bônus por performance

Exemplo:

```ts
MVP: +20% XP +10% Tokens
Maior dano: +10% XP
Mais dano recebido: +5% XP
Maior suporte: +10% XP
```

Os bônus devem ser cumulativos apenas quando configurado.

---

# 23. Tela de derrota

Se todos os jogadores estiverem:

```ts
DOWNED
```

a raid termina.

Exibir:

```text
DEFEAT
```

Mostrar:

- HP restante do Boss;
- estatísticas;
- tentativas;
- sugestões.

Não conceder recompensa completa.

Pode conceder XP de participação se o sistema econômico permitir.

---

# 24. Desconexões

Implementar tolerância a desconexão.

Se um jogador desconectar durante a batalha:

```ts
status = 'DISCONNECTED'
```

O servidor mantém o personagem por uma janela de reconexão.

Sugestão:

```ts
RECONNECT_WINDOW = 60_000
```

Durante esse período:

- jogador não recebe ações;
- pode ser alvo;
- pode ser curado/revivido;
- pode reconectar.

Após expirar, a raid continua sem ele.

Nunca quebrar a sessão inteira por causa de um cliente.

---

# 25. Estado da Raid

Utilizar máquina de estados.

```ts
type RaidStatus =
    | 'LOBBY'
    | 'COUNTDOWN'
    | 'ACTIVE'
    | 'BOSS_TURN'
    | 'PLAYER_TURN'
    | 'RESOLVING'
    | 'VICTORY'
    | 'DEFEAT'
    | 'FINISHED';
```

Para jogador:

```ts
type PlayerCombatStatus =
    | 'ACTIVE'
    | 'TARGETED'
    | 'DOWNED'
    | 'DISCONNECTED';
```

---

# 26. Segurança e anti-cheat

Nunca confiar em:

```ts
clientDamage
clientHp
clientTurn
clientReward
```

O cliente somente solicita ações.

Exemplo:

```ts
requestAttack(actionId)
```

O backend:

1. valida turno;
2. valida jogador;
3. valida desafio;
4. calcula dano;
5. atualiza HP;
6. transmite resultado.

---

# 27. Persistência

Salvar:

```ts
raidId
bossId
partyId
status
startedAt
endedAt

players
bossState
turnState

statistics
rewards
```

Também registrar:

- desafios resolvidos;
- desafios falhados;
- tempo médio de resposta;
- dano causado;
- dano recebido;
- cura;
- revives;
- misses.

Isso permitirá rankings futuros.

---

# 28. Critérios de aceitação

A implementação estará funcional quando:

- [ ] Boss Battles bloqueadas abaixo do nível 5.
- [ ] Boss Battles bloqueadas sem subclasse.
- [ ] Boss aparece após conclusão do capítulo.
- [ ] Ícone em losango vermelho é exibido.
- [ ] Apenas membros da mesma Party entram.
- [ ] Raid funciona com 1 a 4 jogadores.
- [ ] Lobby sincroniza entrada e saída.
- [ ] Jogadores podem trocar avatar antes da batalha.
- [ ] Ready System funciona.
- [ ] Countdown sincronizado funciona.
- [ ] Turnos são determinados por velocidade.
- [ ] Ações abrem mini desafios.
- [ ] Código correto gera ação.
- [ ] Código errado gera MISS.
- [ ] Timeout gera MISS.
- [ ] Boss escolhe ataques individuais e múltiplos.
- [ ] Alvos recebem alerta visual.
- [ ] Jogadores podem contra-atacar.
- [ ] Jogadores podem esquivar.
- [ ] Jogadores podem usar itens.
- [ ] Jogadores podem ficar DOWNED.
- [ ] Jogadores podem ser revividos.
- [ ] Jogadores caídos recebem recompensa em caso de vitória.
- [ ] HP e dano são calculados no servidor.
- [ ] Code Power influencia combate.
- [ ] Level influencia combate.
- [ ] Avatar influencia atributos.
- [ ] Animações de ataque funcionam.
- [ ] Barras de HP animam dinamicamente.
- [ ] Números de dano flutuam.
- [ ] Sons funcionam.
- [ ] Vitória calcula MVP.
- [ ] Estatísticas são persistidas.
- [ ] Recompensas são persistidas.
- [ ] Desconexão não encerra a raid.
- [ ] Cliente não consegue manipular dano.

---

# 29. Ordem de implementação obrigatória

Implementar nesta ordem:

## Fase 1 — Fundação

1. tipos;
2. modelos;
3. atributos dos avatares;
4. fórmulas;
5. motor de turnos;
6. motor de dano.

## Fase 2 — Boss Data

1. BossDefinition;
2. Boss por capítulo;
3. scaling;
4. recompensas.

## Fase 3 — Multiplayer

1. criação de sala;
2. Party validation;
3. entrada;
4. Ready System;
5. countdown;
6. reconexão.

## Fase 4 — Combate

1. turnos;
2. ataque;
3. Boss AI;
4. targeting;
5. defesa;
6. DOWNED;
7. revive.

## Fase 5 — Code Challenges

1. desafio por ação;
2. timer;
3. submissão;
4. validação;
5. HIT/MISS.

## Fase 6 — Interface

1. mapa;
2. Boss icon;
3. lobby;
4. HUD;
5. editor;
6. vitória;
7. derrota.

## Fase 7 — Polimento

1. animações;
2. efeitos;
3. sons;
4. transições;
5. feedback visual.

---

# 30. Diretriz final para Antigravity IDE

Antes de implementar, analisar a arquitetura atual do Code Leveler e reutilizar:

- sistema atual de autenticação;
- dados do jogador;
- Party existente;
- sistema de avatares;
- sistema de subclasses;
- editor de código;
- compilação/validação atual;
- sistema de XP;
- sistema de Tokens;
- sistema de Code Power;
- componentes visuais existentes.

Não criar sistemas duplicados quando já existir infraestrutura equivalente.

A implementação deve ser incremental e compatível com o projeto existente.

Priorizar:

1. funcionamento real;
2. sincronização multiplayer;
3. consistência dos dados;
4. segurança;
5. escalabilidade;
6. experiência visual.

Ao finalizar cada fase:

- verificar erros de TypeScript;
- testar estados inválidos;
- testar com 1 jogador;
- testar com 2 jogadores;
- testar com 4 jogadores;
- testar desconexões;
- testar jogadores caídos;
- testar vitória;
- testar derrota.

Não entregar apenas mocks visuais.

Implementar o fluxo funcional completo de ponta a ponta.
