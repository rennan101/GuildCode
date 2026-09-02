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

/**
 * Retorna o ID do avatar atualmente equipado pelo usuário (ex: '02')
 */
function getEquippedAvatarId() {
    let photo = null;
    if (typeof authManager !== 'undefined' && authManager.getPhotoURL) {
        photo = authManager.getPhotoURL();
    }
    if (!photo && window.gameProgress && window.gameProgress.photoURL) {
        photo = window.gameProgress.photoURL;
    }
    if (!photo) return '02'; // Padrão
    const match = photo.match(/avatar_(\d+)\.png/);
    return match ? match[1] : '02';
}

/**
 * Retorna a ÚNICA habilidade ativa correspondente ao avatar equipado
 */
function getActiveAvatarSkill() {
    const avatarId = getEquippedAvatarId();
    return AVATAR_SKILLS_DATA[avatarId] || null;
}

/**
 * Verifica se o avatar equipado concede um bônus específico e retorna seu valor
 * @param {string} bonusType Tipo do bônus (ex: 'xp_boost', 'token_flat', 'universal_boost', etc.)
 */
function getAvatarSkillBonus(bonusType) {
    const activeSkill = getActiveAvatarSkill();
    if (!activeSkill) return 0;
    
    // Loremaster (24) concede 10% universal para XP, Tokens e Renome
    if (activeSkill.bonusType === 'universal_boost') {
        if (bonusType === 'xp_boost' || bonusType === 'token_mult' || bonusType === 'renome_mult') {
            return activeSkill.bonusValue;
        }
    }

    if (activeSkill.bonusType === bonusType) {
        return activeSkill.bonusValue || 0;
    }

    return 0;
}

window.AVATAR_RARITIES = AVATAR_RARITIES;
window.AVATAR_SKILLS_DATA = AVATAR_SKILLS_DATA;
window.getEquippedAvatarId = getEquippedAvatarId;
window.getActiveAvatarSkill = getActiveAvatarSkill;
window.getAvatarSkillBonus = getAvatarSkillBonus;

