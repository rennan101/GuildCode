/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: BOSS DEFINITIONS (0 a 15)
   Definições dos 16 chefes mapeados a partir de Boss_SpriteSheet.png
   ═══════════════════════════════════════════════════════════════ */

const BOSS_DEFINITIONS = [
    {
        id: 'boss_ch0',
        chapterId: 0,
        name: 'Buffer Overflow',
        title: 'Sentinela de Fluxo Corrompido',
        subject: 'Entrada, Saída e Fundamentos de I/O',
        desc: 'Um espectro necromântico encapuzado que desestabiliza buffers de memória com correntes arcanas de texto.',
        spriteUrl: 'assets/bosses/boss_0.png',
        recommendedLevel: 5,
        baseHp: 6500,
        baseAttack: 380,
        baseDefense: 75,
        baseSpeed: 85,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.55, MULTI_TARGET: 0.35, AOE: 0.10 },
        rewards: { baseXp: 280, baseTokens: 35, title: 'Domador de Buffers' }
    },
    {
        id: 'boss_ch1',
        chapterId: 1,
        name: 'Gárgula de Tipos',
        title: 'Guardião Petrificado dos Bytes',
        subject: 'Tipos Primitivos e Modificadores',
        desc: 'Monstro alado esculpido em granito rúnico que rejeita castings incompatíveis e esmaga variáveis instáveis.',
        spriteUrl: 'assets/bosses/boss_1.png',
        recommendedLevel: 5,
        baseHp: 7800,
        baseAttack: 400,
        baseDefense: 90,
        baseSpeed: 88,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.50, MULTI_TARGET: 0.35, AOE: 0.15 },
        rewards: { baseXp: 340, baseTokens: 40, title: 'Mestre da Tipagem' }
    },
    {
        id: 'boss_ch2',
        chapterId: 2,
        name: 'Colosso de Boole',
        title: 'Constructo dos Predicados',
        subject: 'Operadores Aritméticos, Relacionais e Lógicos',
        desc: 'Autômato blindado a vapor com olhos de mercúrio verde que avalia a verdade lógica sob punição implacável.',
        spriteUrl: 'assets/bosses/boss_2.png',
        recommendedLevel: 6,
        baseHp: 9200,
        baseAttack: 420,
        baseDefense: 100,
        baseSpeed: 90,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.50, MULTI_TARGET: 0.35, AOE: 0.15 },
        rewards: { baseXp: 400, baseTokens: 48, title: 'Inquisidor de Boole' }
    },
    {
        id: 'boss_ch3',
        chapterId: 3,
        name: 'Lord das Bifurcações',
        title: 'Soberano das Decisões Obscuras',
        subject: 'Estruturas Condicionais (if, else if, else)',
        desc: 'Aristocrata corrompido que manipula desvios condicionais na realidade para confundir atacantes desatentos.',
        spriteUrl: 'assets/bosses/boss_3.png',
        recommendedLevel: 7,
        baseHp: 10800,
        baseAttack: 440,
        baseDefense: 105,
        baseSpeed: 95,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.45, MULTI_TARGET: 0.40, AOE: 0.15 },
        rewards: { baseXp: 470, baseTokens: 55, title: 'Árbitro do Destino' }
    },
    {
        id: 'boss_ch4',
        chapterId: 4,
        name: 'Hidra dos Casos',
        title: 'Devoradora de Switches',
        subject: 'Seleção Múltipla com Switch-Case',
        desc: 'Criatura tricefálica dracônica com cabeças elementais que exigem branches precisos para interromper seus contra-ataques.',
        spriteUrl: 'assets/bosses/boss_4.png',
        recommendedLevel: 8,
        baseHp: 12500,
        baseAttack: 460,
        baseDefense: 110,
        baseSpeed: 96,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.40, MULTI_TARGET: 0.40, AOE: 0.20 },
        rewards: { baseXp: 540, baseTokens: 62, title: 'Quebrador de Ramificações' }
    },
    {
        id: 'boss_ch5',
        chapterId: 5,
        name: 'Vórtice do Loop Infinito',
        title: 'Anomalia Espiral Dimensional',
        subject: 'Laços de Repetição — While',
        desc: 'Singularidade cósmica girando eternamente em engrenagens de latão, aprisionando o fluxo temporal dos Codemancers.',
        spriteUrl: 'assets/bosses/boss_5.png',
        recommendedLevel: 9,
        baseHp: 14500,
        baseAttack: 480,
        baseDefense: 115,
        baseSpeed: 100,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.45, MULTI_TARGET: 0.35, AOE: 0.20 },
        rewards: { baseXp: 610, baseTokens: 70, title: 'Rompedor de Vórtices' }
    },
    {
        id: 'boss_ch6',
        chapterId: 6,
        name: 'Autômato Iterativo',
        title: 'Caldeira a Vapor Primordial',
        subject: 'Laços de Repetição — Do-While',
        desc: 'Máquina colossal que sempre executa seu primeiro golpe antes de qualquer checagem, liberando jatos cáusticos de vapor.',
        spriteUrl: 'assets/bosses/boss_6.png',
        recommendedLevel: 10,
        baseHp: 16500,
        baseAttack: 500,
        baseDefense: 125,
        baseSpeed: 92,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.50, MULTI_TARGET: 0.30, AOE: 0.20 },
        rewards: { baseXp: 690, baseTokens: 78, title: 'Engenheiro de Ciclos' }
    },
    {
        id: 'boss_ch7',
        chapterId: 7,
        name: 'Monólito de Iteração',
        title: 'Portal Dourado dos Passos Finitos',
        subject: 'Laços de Repetição — For',
        desc: 'Portal ancestral emoldurado por tubulações de ouro com cristal azul reluzente, sincronizando passos e contadores perfeitos.',
        spriteUrl: 'assets/bosses/boss_7.png',
        recommendedLevel: 11,
        baseHp: 18800,
        baseAttack: 520,
        baseDefense: 130,
        baseSpeed: 102,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.45, MULTI_TARGET: 0.35, AOE: 0.20 },
        rewards: { baseXp: 770, baseTokens: 86, title: 'Senhor dos Passos' }
    },
    {
        id: 'boss_ch8',
        chapterId: 8,
        name: 'Serpente Contígua',
        title: 'Víbora Mecânica de Índices',
        subject: 'Vetores Unidimensionais (Arrays)',
        desc: 'Serpente blindada com escamas contíguas de aço negro, rastejando velozmente através de índices sequenciais contínuos.',
        spriteUrl: 'assets/bosses/boss_8.png',
        recommendedLevel: 12,
        baseHp: 21500,
        baseAttack: 545,
        baseDefense: 135,
        baseSpeed: 110,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.40, MULTI_TARGET: 0.40, AOE: 0.20 },
        rewards: { baseXp: 860, baseTokens: 95, title: 'Encantador de Vetores' }
    },
    {
        id: 'boss_ch9',
        chapterId: 9,
        name: 'Titã Matricial',
        title: 'Colosso Rúnico dos Quadrantes',
        subject: 'Matrizes Bidimensionais',
        desc: 'Gigante construído por blocos cúbicos de obsidiana com runas púrpuras, alternando ataques em linhas e colunas.',
        spriteUrl: 'assets/bosses/boss_9.png',
        recommendedLevel: 13,
        baseHp: 24500,
        baseAttack: 570,
        baseDefense: 142,
        baseSpeed: 95,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.40, MULTI_TARGET: 0.35, AOE: 0.25 },
        rewards: { baseXp: 950, baseTokens: 105, title: 'Mapeador Dimensional' }
    },
    {
        id: 'boss_ch10',
        chapterId: 10,
        name: 'Nullus, o Corruptor',
        title: 'Bruxa da String Infinita',
        subject: 'Strings e Manipulação de Caracteres',
        desc: 'Feiticeira sombria de cabelos alvos e pele trincada em púrpura, capaz de dissolver delimitadores \\0 para causar estouros.',
        spriteUrl: 'assets/bosses/boss_10.png',
        recommendedLevel: 14,
        baseHp: 27800,
        baseAttack: 595,
        baseDefense: 148,
        baseSpeed: 108,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.45, MULTI_TARGET: 0.35, AOE: 0.20 },
        rewards: { baseXp: 1050, baseTokens: 115, title: 'Senhor do Terminador Nulo' }
    },
    {
        id: 'boss_ch11',
        chapterId: 11,
        name: 'Arquimago do Escopo',
        title: 'Conjurador das Pilhas Locais',
        subject: 'Funções e Escopo de Variáveis',
        desc: 'Mago encapuzado envolto em manto azul-profundo e olhos gélidos cintilantes, manipulando chamadas de funções e retornos.',
        spriteUrl: 'assets/bosses/boss_11.png',
        recommendedLevel: 15,
        baseHp: 31500,
        baseAttack: 620,
        baseDefense: 152,
        baseSpeed: 112,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.40, MULTI_TARGET: 0.40, AOE: 0.20 },
        rewards: { baseXp: 1160, baseTokens: 128, title: 'Mestre das Funções' }
    },
    {
        id: 'boss_ch12',
        chapterId: 12,
        name: 'Sombra da Referência',
        title: 'Entidade Dupla de Valor e Endereço',
        subject: 'Passagem por Valor vs Referência',
        desc: 'Gêmeos astrais entrelaçados (gelo celeste e fogo carmesim) que bifurcam dano direto contra cópias e originais.',
        spriteUrl: 'assets/bosses/boss_12.png',
        recommendedLevel: 16,
        baseHp: 35500,
        baseAttack: 645,
        baseDefense: 158,
        baseSpeed: 115,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.35, MULTI_TARGET: 0.45, AOE: 0.20 },
        rewards: { baseXp: 1280, baseTokens: 140, title: 'Mestre da Referência' }
    },
    {
        id: 'boss_ch13',
        chapterId: 13,
        name: 'SegFault, o Devorador',
        title: 'Leviatã das Profundezas de Memória',
        subject: 'Ponteiros e Aritmética de Endereços',
        desc: 'Serpente marinha ancestral metálica que emerge das marés abissais, devorando ponteiros nulos e referências selvagens.',
        spriteUrl: 'assets/bosses/boss_13.png',
        recommendedLevel: 17,
        baseHp: 40000,
        baseAttack: 675,
        baseDefense: 165,
        baseSpeed: 118,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.35, MULTI_TARGET: 0.40, AOE: 0.25 },
        rewards: { baseXp: 1410, baseTokens: 155, title: 'Domador de Ponteiros' }
    },
    {
        id: 'boss_ch14',
        chapterId: 14,
        name: 'Monarca Estruturado',
        title: 'Divindade Mecânica dos Registros',
        subject: 'Estruturas Heterogêneas (Structs)',
        desc: 'Divindade coroada em ouro arcano e cristais roxos radiantes, orquestrando campos heterogêneos com poder devastador.',
        spriteUrl: 'assets/bosses/boss_14.png',
        recommendedLevel: 18,
        baseHp: 45000,
        baseAttack: 710,
        baseDefense: 172,
        baseSpeed: 120,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.30, MULTI_TARGET: 0.45, AOE: 0.25 },
        rewards: { baseXp: 1550, baseTokens: 170, title: 'Arquiteto de Estruturas' }
    },
    {
        id: 'boss_ch15',
        chapterId: 15,
        name: 'Apex Kernel, o Flagelo de Heap',
        title: 'Soberano Primordial de Malloc & Free',
        subject: 'Alocação Dinâmica e Gerenciamento de Memória',
        desc: 'O núcleo consciente primordial da GuildCode. Controla toda a memória alocada dinamicamente e testa o limite máximo dos Codemancers.',
        spriteUrl: 'assets/bosses/boss_15.png',
        recommendedLevel: 20,
        baseHp: 52000,
        baseAttack: 760,
        baseDefense: 180,
        baseSpeed: 125,
        singleTargetMultiplier: 1.0,
        multiTargetMultiplier: 0.85,
        aoeMultiplier: 0.70,
        actionWeights: { SINGLE_TARGET: 0.30, MULTI_TARGET: 0.40, AOE: 0.30 },
        rewards: { baseXp: 1800, baseTokens: 200, title: 'Mestre Absoluto do Kernel' }
    }
];

class BossDataManager {
    static getAllBosses() {
        return BOSS_DEFINITIONS;
    }

    static getBossByChapter(chapterId) {
        const id = Number(chapterId);
        return BOSS_DEFINITIONS.find(b => b.chapterId === id) || BOSS_DEFINITIONS[0];
    }

    static getBossById(bossId) {
        return BOSS_DEFINITIONS.find(b => b.id === bossId) || BOSS_DEFINITIONS[0];
    }

    /**
     * Calcula o escalonamento do Boss baseado na quantidade de jogadores e nível médio da party
     * Conforme Seção 18:
     * bossMaxHp = boss.baseHp * (1 + (partySize - 1) * 0.75) * levelScaling
     */
    static calculateBossStats(boss, partySize = 1, averagePartyLevel = 5) {
        const safeSize = Math.max(1, Math.min(4, Number(partySize) || 1));
        const safeLvl = Math.max(1, Number(averagePartyLevel) || boss.recommendedLevel);

        const partyMultiplier = 1 + (safeSize - 1) * 0.75;
        const levelScaling = 1 + Math.max(0, (safeLvl - boss.recommendedLevel) * 0.06);

        const scaledHp = Math.round(boss.baseHp * partyMultiplier * levelScaling);
        const scaledAtk = Math.round(boss.baseAttack * (1 + (safeSize - 1) * 0.18) * levelScaling);
        const scaledDef = Math.round(boss.baseDefense * (1 + (safeSize - 1) * 0.12));
        const scaledSpd = Math.round(boss.baseSpeed + (safeLvl >= 10 ? 5 : 0));

        return {
            maxHp: scaledHp,
            currentHp: scaledHp,
            attack: scaledAtk,
            defense: scaledDef,
            speed: scaledSpd,
            partySize: safeSize,
            averageLevel: safeLvl
        };
    }
}

window.BOSS_DEFINITIONS = BOSS_DEFINITIONS;
window.BossDataManager = BossDataManager;
