/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — AVATAR SKILLS & GACHA SYSTEM DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */

const AVATAR_RARITIES = {
    COMMON: {
        stars: 3,
        label: "Comum",
        color: "#94a3b8",
        glow: "rgba(148, 163, 184, 0.4)",
        weight: 60, // 60% chance base
        duplicateXp: 150
    },
    RARE: {
        stars: 4,
        label: "Raro",
        color: "#38bdf8",
        glow: "rgba(56, 189, 248, 0.5)",
        weight: 28, // 28% chance base
        duplicateXp: 350
    },
    EPIC: {
        stars: 5,
        label: "Épico",
        color: "#c084fc",
        glow: "rgba(192, 132, 252, 0.6)",
        weight: 10, // 10% chance base
        duplicateXp: 750
    },
    LEGENDARY: {
        stars: 6,
        label: "Lendário",
        color: "#fbbf24",
        glow: "rgba(251, 191, 36, 0.7)",
        weight: 2, // 2% chance base
        duplicateXp: 1500
    }
};

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
        bonusValue: 1.0
    },
    '02': {
        id: '02',
        name: 'Neon Coder',
        title: 'Desperto Inicial',
        rarity: 'COMMON',
        skillName: 'Sintonia Neon',
        skillDesc: '+5% de XP em todas as missões concluídas com sucesso na primeira tentativa.',
        bonusType: 'xp_boost',
        bonusValue: 0.05
    },
    '03': {
        id: '03',
        name: 'Code Knight',
        title: 'Paladino da Sintaxe',
        rarity: 'RARE',
        skillName: 'Armadura Sintática',
        skillDesc: 'Reduz em 20% a perda de Renome em derrotas no Coliseu PVP.',
        bonusType: 'pvp_loss_shield',
        bonusValue: 0.20
    },
    '04': {
        id: '04',
        name: 'Rune Coder',
        title: 'Inscritor de Glifos',
        rarity: 'RARE',
        skillName: 'Gravação Arcana',
        skillDesc: 'Reduz em 20% o custo de Tokens para desbloquear dicas nos capítulos 00 a 05.',
        bonusType: 'hint_discount',
        bonusValue: 0.20
    },
    '05': {
        id: '05',
        name: 'SteamCore',
        title: 'Autômato a Vapor',
        rarity: 'RARE',
        skillName: 'Superaquecimento',
        skillDesc: 'Ganha +10% de Renome extra ao vencer duelos PVP em menos de 60 segundos.',
        bonusType: 'pvp_speed_bonus',
        bonusValue: 0.10
    },
    '06': {
        id: '06',
        name: 'Wild Coder',
        title: 'Rastreador Primitivo',
        rarity: 'COMMON',
        skillName: 'Faro para Bugs',
        skillDesc: 'Destaca no terminal com maior precisão dicas didáticas sobre erros sintáticos.',
        bonusType: 'debug_assist',
        bonusValue: 0.15
    },
    '07': {
        id: '07',
        name: 'Moon Compiler',
        title: 'Compilador Noturno',
        rarity: 'RARE',
        skillName: 'Refração Noturna',
        skillDesc: '+15% de XP em missões resolvidas durante a noite (18h às 06h) ou finais de semana.',
        bonusType: 'night_xp',
        bonusValue: 0.15
    },
    '08': {
        id: '08',
        name: 'Gearhead',
        title: 'Mecânico de Memória',
        rarity: 'COMMON',
        skillName: 'Engrenagens de Ouro',
        skillDesc: 'Concede +1 Token da Guilda extra em cada missão regular concluída.',
        bonusType: 'token_flat',
        bonusValue: 1
    },
    '09': {
        id: '09',
        name: 'Fox Coder',
        title: 'Espírito Astuto',
        rarity: 'RARE',
        skillName: 'Astúcia da Raposa',
        skillDesc: '15% de chance de duplicar os Tokens obtidos ao concluir um desafio sem consultar dicas.',
        bonusType: 'token_crit_chance',
        bonusValue: 0.15
    },
    '10': {
        id: '10',
        name: 'Code Prince',
        title: 'Herdeiro Real',
        rarity: 'EPIC',
        skillName: 'Herança Real',
        skillDesc: 'Começa todas as Masmorras do Abismo com +15 segundos adicionais de tempo limite.',
        bonusType: 'abyss_time_bonus',
        bonusValue: 15
    },
    '11': {
        id: '11',
        name: 'Bug Alchemist',
        title: 'Transmutador Lógico',
        rarity: 'RARE',
        skillName: 'Transmutação Lógica',
        skillDesc: 'Converte compilações com avisos (Warnings) tratados em +10 XP bônus.',
        bonusType: 'warning_xp',
        bonusValue: 10
    },
    '12': {
        id: '12',
        name: 'Dragon Coder',
        title: 'Conjurador Dracônico',
        rarity: 'EPIC',
        skillName: 'Fôlego do Dragão',
        skillDesc: '+12% de multiplicador em ações de dano de subclasses durante o Coliseu PVP.',
        bonusType: 'pvp_damage',
        bonusValue: 0.12
    },
    '13': {
        id: '13',
        name: 'ChronoBot',
        title: 'Guardião do Tempo',
        rarity: 'EPIC',
        skillName: 'Retorno Temporal',
        skillDesc: 'Concede 1 recarga diária para reiniciar Masmorras do Abismo sem penalidade.',
        bonusType: 'abyss_retry',
        bonusValue: 1
    },
    '14': {
        id: '14',
        name: 'Sakura Coder',
        title: 'Florescer da Mente',
        rarity: 'RARE',
        skillName: 'Pétalas da Calma',
        skillDesc: 'Protege a Ofensiva Diária (Streak) contra 1 dia de ausência na semana.',
        bonusType: 'streak_shield',
        bonusValue: 1
    },
    '15': {
        id: '15',
        name: 'NULL',
        title: 'Anomalia Dimensional',
        rarity: 'EPIC',
        skillName: 'Apagão de Ponteiro',
        skillDesc: 'Imunidade ao primeiro erro de execução (Crash) em dungeons do Abismo.',
        bonusType: 'crash_immunity',
        bonusValue: 1
    },
    '16': {
        id: '16',
        name: 'Princess.exe',
        title: 'Comandante Nobre',
        rarity: 'EPIC',
        skillName: 'Comando Soberano',
        skillDesc: 'Todos os colegas na mesma Party recebem +5% de XP compartilhado passivamente.',
        bonusType: 'party_xp_boost',
        bonusValue: 0.05
    },
    '17': {
        id: '17',
        name: 'Void Caster',
        title: 'Invocador do Vazio',
        rarity: 'EPIC',
        skillName: 'Sifão do Vazio',
        skillDesc: 'Converte 10% da pontuação do adversário derrotado no PVP em Tokens da Guilda.',
        bonusType: 'pvp_token_steal',
        bonusValue: 0.10
    },
    '18': {
        id: '18',
        name: 'Dark Loli',
        title: 'Maga do Abismo',
        rarity: 'EPIC',
        skillName: 'Pacto Obscuro',
        skillDesc: '+25% de XP em desafios de Masmorras do Abismo com 2 ou mais restrições ativas.',
        bonusType: 'abyss_xp_boost',
        bonusValue: 0.25
    },
    '19': {
        id: '19',
        name: 'Otaku Chan',
        title: 'Entusiasta Extrema',
        rarity: 'RARE',
        skillName: 'Hiperfoco',
        skillDesc: 'Aumenta o multiplicador de XP da Ofensiva Diária em +0.2x a cada 5 dias consecutivos.',
        bonusType: 'streak_mult_boost',
        bonusValue: 0.2
    },
    '20': {
        id: '20',
        name: 'Senpai Caster',
        title: 'Mentor Veterano',
        rarity: 'EPIC',
        skillName: 'Tutela Inspiradora',
        skillDesc: 'Concede 1 dica gratuita (Custo 0 Tokens) no primeiro desafio do dia.',
        bonusType: 'daily_free_hint',
        bonusValue: 1
    },
    '21': {
        id: '21',
        name: 'Stack Witch',
        title: 'Arquimaga da Pilha',
        rarity: 'LEGENDARY',
        skillName: 'Magia de Pilha Infinita',
        skillDesc: '+20% de Tokens da Guilda em todos os desafios que utilizam Ponteiros e Structs.',
        bonusType: 'pointers_token_boost',
        bonusValue: 0.20
    },
    '22': {
        id: '22',
        name: 'Nightwitch',
        title: 'Bruxa da Meia-Noite',
        rarity: 'LEGENDARY',
        skillName: 'Sombra Lunar',
        skillDesc: 'Reduz o tempo de recarga de habilidades de subclasse em duelos em 20%.',
        bonusType: 'skill_cooldown_red',
        bonusValue: 0.20
    },
    '23': {
        id: '23',
        name: 'Nightblood',
        title: 'Ceifador Rubro',
        rarity: 'LEGENDARY',
        skillName: 'Grito Carmesim',
        skillDesc: 'No PVP, sua taxa de pontuação aumenta em +25% nos últimos 45 segundos de partida.',
        bonusType: 'pvp_clutch_speed',
        bonusValue: 0.25
    },
    '24': {
        id: '24',
        name: 'Loremaster',
        title: 'Guardião do Grimório',
        rarity: 'LEGENDARY',
        skillName: 'Onisciência de Aethelgard',
        skillDesc: '+10% em TODOS os ganhos do jogo (XP, Tokens e Renome) e borda dourada exclusiva.',
        bonusType: 'universal_boost',
        bonusValue: 0.10
    }
};

window.AVATAR_RARITIES = AVATAR_RARITIES;
window.AVATAR_SKILLS_DATA = AVATAR_SKILLS_DATA;
