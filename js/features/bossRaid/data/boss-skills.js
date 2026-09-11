/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS SKILLS & PASSIVE BUFFS DATA
   Mapeamento canônico dos 16 títulos obtidos nos chefes de raid,
   seus buffs passivos permanentes e impacto nos modos de jogo.
   Zero emojis — apenas SVGs arcanos e tipografia limpa.
   ═══════════════════════════════════════════════════════════════ */

const BOSS_SKILLS_DATA = {
    boss_ch0: {
        id: 'boss_ch0',
        chapterId: 0,
        bossName: 'Buffer Overflow',
        title: 'Domador de Buffers',
        category: 'combat',
        categoryLabel: 'Boss Raid & PVP',
        shortDesc: '+5% de Defesa em Boss Raids e batalhas ranqueadas no PVP.',
        fullDesc: 'Canaliza o domínio das correntes de memória para fortalecer a blindagem elemental. Concede +5% de Defesa percentual permanente ao avatar em combates da Boss Raid e arenas PVP.',
        icon: 'shield',
        statModifiers: {
            pvpDefPct: 5,
            raidDefPct: 5
        }
    },
    boss_ch1: {
        id: 'boss_ch1',
        chapterId: 1,
        bossName: 'Gárgula de Tipos',
        title: 'Mestre da Tipagem',
        category: 'avatar',
        categoryLabel: 'Status de Avatar',
        shortDesc: '+3% de Poder de Ataque (ATK) universal para todos os Avatares.',
        fullDesc: 'A harmonia perfeita dos tipos primitivos e bytes canaliza força bruta aos ataques. Eleva o atributo ATK de todos os seus avatares em +3%.',
        icon: 'sword',
        statModifiers: {
            atk_pct: 3
        }
    },
    boss_ch2: {
        id: 'boss_ch2',
        chapterId: 2,
        bossName: 'Colosso de Boole',
        title: 'Inquisidor de Boole',
        category: 'abyss',
        categoryLabel: 'Espiral do Abismo',
        shortDesc: '+25s de tempo adicional para completar qualquer Andar do Abismo.',
        fullDesc: 'O discernimento lógico absoluto desacelera o cronômetro do Abismo. Garante 25 segundos extras no tempo total de desafio em todas as 5 câmaras do andar.',
        icon: 'clock',
        statModifiers: {
            abyssTimeBonus: 25
        }
    },
    boss_ch3: {
        id: 'boss_ch3',
        chapterId: 3,
        bossName: 'Lord das Bifurcações',
        title: 'Árbitro do Destino',
        category: 'boss',
        categoryLabel: 'Boss Raid',
        shortDesc: '+5% de chance de Acerto Crítico de dano na Boss Raid.',
        fullDesc: 'Prevê as ramificações de destino dos ataques, concedendo +5% de probabilidade de desferir acertos críticos devastadores contra qualquer Boss da Guilda.',
        icon: 'target',
        statModifiers: {
            raidCritChancePct: 5
        }
    },
    boss_ch4: {
        id: 'boss_ch4',
        chapterId: 4,
        bossName: 'Hidra dos Casos',
        title: 'Quebrador de Ramificações',
        category: 'boss',
        categoryLabel: 'Boss Raid',
        shortDesc: '+8% de dano adicional em submissões solo de combate.',
        fullDesc: 'Desfaz resistências elementais através de lógicas de seleção cirúrgicas. Acertos individuais de código desferem +8% de dano direto aos pontos vitais do chefe.',
        icon: 'zap',
        statModifiers: {
            soloActionDamagePct: 8
        }
    },
    boss_ch5: {
        id: 'boss_ch5',
        chapterId: 5,
        bossName: 'Nullus, o Corruptor',
        title: 'Senhor do Terminador Nulo',
        category: 'abyss',
        categoryLabel: 'Espiral do Abismo',
        shortDesc: '+15 Tokens da Guilda adicionais ao resgatar o Baú de qualquer Andar.',
        fullDesc: 'Purifica strings de tesouro corrompidas no Abismo. Ao completar e resgatar o Baú de qualquer Andar da Espiral, recebe +15 Tokens da Guilda extras.',
        icon: 'coin',
        statModifiers: {
            abyssFloorTokensBonus: 15
        }
    },
    boss_ch6: {
        id: 'boss_ch6',
        chapterId: 6,
        bossName: 'Autômato Iterativo',
        title: 'Engenheiro de Ciclos',
        category: 'party',
        categoryLabel: 'Party & Raid',
        shortDesc: '+5% de bônus de XP de Ascensão para toda a Party na Boss Raid.',
        fullDesc: 'A caldeira rúnica emana sabedoria compartilhada após o triunfo. Toda a equipe que participar da vitória da Boss Raid recebe +5% de XP adicional.',
        icon: 'users',
        statModifiers: {
            partyXpMultiplier: 1.05
        }
    },
    boss_ch7: {
        id: 'boss_ch7',
        chapterId: 7,
        bossName: 'Monólito de Iteração',
        title: 'Senhor dos Passos',
        category: 'avatar',
        categoryLabel: 'Status de Avatar',
        shortDesc: '+120 de Pontos de Vida (HP) base flat para todos os Avatares.',
        fullDesc: 'Passos consistentes moldam uma constituição inabalável. Adiciona permanentemente +120 de HP base à vitalidade de todos os seus avatares.',
        icon: 'heart',
        statModifiers: {
            hp_flat: 120
        }
    },
    boss_ch8: {
        id: 'boss_ch8',
        chapterId: 8,
        bossName: 'Vórtice do Loop Infinito',
        title: 'Rompedor de Vórtices',
        category: 'avatar',
        categoryLabel: 'Status de Avatar',
        shortDesc: '+5 de Velocidade de Ação (SPD) base para todos os Avatares.',
        fullDesc: 'Rompe o aprisionamento temporal das iterações infinitas. Concede permanentemente +5 pontos de Velocidade de Ação (SPD) para todos os seus avatares da conta.',
        icon: 'wind',
        statModifiers: {
            spd_flat: 5
        }
    },
    boss_ch9: {
        id: 'boss_ch9',
        chapterId: 9,
        bossName: 'Titã Matricial',
        title: 'Mapeador Dimensional',
        category: 'pvp',
        categoryLabel: 'PVP Ranqueado',
        shortDesc: '+10 pontos de Renome adicionais em vitórias de arena PVP.',
        fullDesc: 'O domínio sobre matrizes dimensionais garante maior prestígio e autoridade nas disputas competitivas. Cada vitória no PVP concede +10 de Renome.',
        icon: 'award',
        statModifiers: {
            pvpRenomeBonus: 10
        }
    },
    boss_ch10: {
        id: 'boss_ch10',
        chapterId: 10,
        bossName: 'Serpente Contígua',
        title: 'Encantador de Vetores',
        category: 'boss',
        categoryLabel: 'Boss Raid',
        shortDesc: '-8% de dano sofrido contra ataques em área (AoE) de Chefes.',
        fullDesc: 'Conhecendo a contiguidade das malhas de impacto, mitiga em 8% todo o dano recebido quando o Boss alveja a Party simultaneamente.',
        icon: 'shield-alert',
        statModifiers: {
            bossAoeMitigationPct: 8
        }
    },
    boss_ch11: {
        id: 'boss_ch11',
        chapterId: 11,
        bossName: 'Arquimago do Escopo',
        title: 'Mestre das Funções',
        category: 'party',
        categoryLabel: 'Party & Raid',
        shortDesc: '+10% de eficácia em habilidades de Cura e Suporte na Boss Raid.',
        fullDesc: 'A modulação impecável do escopo potencializa os efeitos restauradores. Todas as ações de cura e suporte de party executadas têm sua eficácia ampliada em +10%.',
        icon: 'sparkles',
        statModifiers: {
            raidSupportHealPct: 10
        }
    },
    boss_ch12: {
        id: 'boss_ch12',
        chapterId: 12,
        bossName: 'Sombra da Referência',
        title: 'Mestre da Referência',
        category: 'boss',
        categoryLabel: 'Boss Raid',
        shortDesc: '+5% de Ataque e +5% de Defesa durante confrontos contra Bosses.',
        fullDesc: 'Ao enfrentar qualquer chefe supremo da Guilda, a sintonia de valor e endereço concede +5% de Poder de Ataque e +5% de Defesa adicionais.',
        icon: 'flame',
        statModifiers: {
            bossEncounterAtkPct: 5,
            bossEncounterDefPct: 5
        }
    },
    boss_ch13: {
        id: 'boss_ch13',
        chapterId: 13,
        bossName: 'SegFault, o Devorador',
        title: 'Domador de Ponteiros',
        category: 'boss',
        categoryLabel: 'Boss Raid',
        shortDesc: '+5s de tempo extra em todos os turnos de combate da Boss Raid.',
        fullDesc: 'A imunidade ao pânico de desreferenciamento nulo expande a percepção do Codemancer. Concede 5 segundos adicionais em cada rodada de resolução de código na arena.',
        icon: 'hourglass',
        statModifiers: {
            raidTurnTimeBonus: 5
        }
    },
    boss_ch14: {
        id: 'boss_ch14',
        chapterId: 14,
        bossName: 'Monarca Estruturado',
        title: 'Arquiteto de Estruturas',
        category: 'avatar',
        categoryLabel: 'Equipamento & Artefatos',
        shortDesc: '+10% de bônus aos atributos fornecidos por todos os Artefatos.',
        fullDesc: 'A arquitetura perfeita de registros eleva a sinergia dos equipamentos. Todos os bônus de HP, ATK, DEF e SPD oriundos de Artefatos equipados são ampliados em +10%.',
        icon: 'gem',
        statModifiers: {
            artifactMultiplierPct: 10
        }
    },
    boss_ch15: {
        id: 'boss_ch15',
        chapterId: 15,
        bossName: 'Apex Kernel, o Flagelo de Heap',
        title: 'Mestre Absoluto do Kernel',
        category: 'universal',
        categoryLabel: 'Aura Suprema da Guilda',
        shortDesc: '+5% de Tokens da Guilda e +5% de XP em todas as atividades do jogo.',
        fullDesc: 'A consagração máxima no núcleo do sistema operacional da GuildCode. Uma aura primordial permanente amplifica os ganhos de XP e Tokens da Guilda em +5% em toda a plataforma.',
        icon: 'crown',
        statModifiers: {
            universalXpPct: 5,
            universalTokensPct: 5
        }
    }
};

class BossSkillsManager {
    static getAllSkills() {
        return BOSS_SKILLS_DATA;
    }

    static getSkill(bossId) {
        return BOSS_SKILLS_DATA[bossId] || null;
    }

    /**
     * Calcula o agregado de todos os buffs passivos acumulados a partir do
     * dicionário `bossesDefeated` do jogador.
     */
    static calculateActiveBonuses(bossesDefeated = {}) {
        const bonuses = {
            hp_flat: 0,
            atk_pct: 0,
            def_pct: 0,
            spd_flat: 0,
            artifactMultiplierPct: 0,
            abyssTimeBonus: 0,
            abyssFloorTokensBonus: 0,
            pvpDefPct: 0,
            pvpRenomeBonus: 0,
            raidDefPct: 0,
            raidCritChancePct: 0,
            soloActionDamagePct: 0,
            partyXpMultiplier: 1.0,
            bossAoeMitigationPct: 0,
            raidSupportHealPct: 0,
            bossEncounterAtkPct: 0,
            bossEncounterDefPct: 0,
            raidTurnTimeBonus: 0,
            universalXpPct: 0,
            universalTokensPct: 0,
            unlockedCount: 0,
            totalSkills: Object.keys(BOSS_SKILLS_DATA).length
        };

        if (!bossesDefeated || typeof bossesDefeated !== 'object') {
            return bonuses;
        }

        Object.keys(BOSS_SKILLS_DATA).forEach(bossId => {
            const skill = BOSS_SKILLS_DATA[bossId];
            const record = bossesDefeated[bossId];
            const isUnlocked = !!(record && (record.tokensClaimed || record.completedAt || record.timesDefeated > 0));

            if (isUnlocked && skill && skill.statModifiers) {
                bonuses.unlockedCount++;
                const mods = skill.statModifiers;

                if (mods.hp_flat) bonuses.hp_flat += mods.hp_flat;
                if (mods.atk_pct) bonuses.atk_pct += mods.atk_pct;
                if (mods.def_pct) bonuses.def_pct += mods.def_pct;
                if (mods.spd_flat) bonuses.spd_flat += mods.spd_flat;
                if (mods.artifactMultiplierPct) bonuses.artifactMultiplierPct += mods.artifactMultiplierPct;
                if (mods.abyssTimeBonus) bonuses.abyssTimeBonus += mods.abyssTimeBonus;
                if (mods.abyssFloorTokensBonus) bonuses.abyssFloorTokensBonus += mods.abyssFloorTokensBonus;
                if (mods.pvpDefPct) bonuses.pvpDefPct += mods.pvpDefPct;
                if (mods.pvpRenomeBonus) bonuses.pvpRenomeBonus += mods.pvpRenomeBonus;
                if (mods.raidDefPct) bonuses.raidDefPct += mods.raidDefPct;
                if (mods.raidCritChancePct) bonuses.raidCritChancePct += mods.raidCritChancePct;
                if (mods.soloActionDamagePct) bonuses.soloActionDamagePct += mods.soloActionDamagePct;
                if (mods.partyXpMultiplier) bonuses.partyXpMultiplier *= mods.partyXpMultiplier;
                if (mods.bossAoeMitigationPct) bonuses.bossAoeMitigationPct += mods.bossAoeMitigationPct;
                if (mods.raidSupportHealPct) bonuses.raidSupportHealPct += mods.raidSupportHealPct;
                if (mods.bossEncounterAtkPct) bonuses.bossEncounterAtkPct += mods.bossEncounterAtkPct;
                if (mods.bossEncounterDefPct) bonuses.bossEncounterDefPct += mods.bossEncounterDefPct;
                if (mods.raidTurnTimeBonus) bonuses.raidTurnTimeBonus += mods.raidTurnTimeBonus;
                if (mods.universalXpPct) bonuses.universalXpPct += mods.universalXpPct;
                if (mods.universalTokensPct) bonuses.universalTokensPct += mods.universalTokensPct;
            }
        });

        return bonuses;
    }

    /**
     * Retorna ícones SVG profissionais para a interface sem qualquer emoji
     */
    static getSvgIcon(iconName, size = 16) {
        const s = size;
        switch (iconName) {
            case 'shield':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
            case 'shield-alert':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
            case 'sword':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></svg>`;
            case 'heart':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
            case 'wind':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>`;
            case 'clock':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
            case 'hourglass':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`;
            case 'target':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
            case 'zap':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></polygon></svg>`;
            case 'users':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
            case 'award':
            case 'medal':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`;
            case 'coin':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1"/><path d="M12 6v2m0 8v2"/></svg>`;
            case 'sparkles':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/></svg>`;
            case 'flame':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
            case 'gem':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 18 3 22 9 12 22 2 9 6 3"/><polyline points="11 3 8 9 12 22 16 9 13 3"/></svg>`;
            case 'crown':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`;
            case 'lock':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
            case 'check':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
            case 'chevron':
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
            default:
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
        }
    }
}

if (typeof window !== 'undefined') {
    window.BOSS_SKILLS_DATA = BOSS_SKILLS_DATA;
    window.BossSkillsManager = BossSkillsManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BOSS_SKILLS_DATA, BossSkillsManager };
}
