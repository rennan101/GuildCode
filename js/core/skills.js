/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Subclasses & Skill Tree System
   Definição das 4 Subclasses de Alunos + Subclasse do Professor (CheatCode)
   ═══════════════════════════════════════════════════════════════ */

const SUBCLASSES_DATA = {
    hardcoder: {
        id: "hardcoder",
        name: "Hardcoder",
        title: "Forjador de Código Rápido",
        tagline: "Poder bruto, otimização máxima e velocidade terminal.",
        color: "#f97316",
        accentColor: "#ef4444",
        badge: "fa-bolt",
        bannerIcon: "fa-bolt",
        skills: [
            {
                id: "hc_overclock_xp",
                name: "Overclock de XP",
                tier: 1,
                minLevel: 5,
                cost: 1,
                icon: "fa-fire",
                type: "passive",
                description: "+20% de XP em qualquer desafio concluído sem solicitar dicas."
            },
            {
                id: "hc_pure_struct",
                name: "Estrutura Pura",
                tier: 2,
                minLevel: 7,
                cost: 1,
                icon: "fa-microchip",
                type: "passive",
                description: "Terminal com 50% mais tolerância a ciclos e loops pesados."
            },
            {
                id: "hc_turbo_pvp",
                name: "Fúria do Compilador",
                tier: 3,
                minLevel: 10,
                cost: 1,
                icon: "fa-shield-halved",
                type: "passive",
                description: "Reduz pela metade a perda de Renome em derrotas no Coliseu PVP."
            },
            {
                id: "hc_legendary_code",
                name: "Código Lendário",
                tier: 4,
                minLevel: 15,
                cost: 2,
                icon: "fa-crown",
                type: "ultimate",
                description: "+100% de Tokens ao submeter uma atividade de primeira tentativa."
            }
        ]
    },
    analyst: {
        id: "analyst",
        name: "Analyst",
        title: "Arcanista da Lógica & Casos Limite",
        tagline: "Visão profunda de variáveis, oráculo de testes e precisão.",
        color: "#06b6d4",
        accentColor: "#3b82f6",
        badge: "fa-brain",
        bannerIcon: "fa-brain",
        skills: [
            {
                id: "an_spectral_tests",
                name: "Visão Espectral de Testes",
                tier: 1,
                minLevel: 5,
                cost: 1,
                icon: "fa-eye",
                type: "passive",
                description: "Exibe antecipadamente os casos de teste e entradas esperadas de desafios."
            },
            {
                id: "an_quick_templates",
                name: "Memória Expandida",
                tier: 2,
                minLevel: 7,
                cost: 1,
                icon: "fa-scroll",
                type: "active",
                description: "Atalhos rápidos para snippets de C puro (for, scanf, matriz) no editor."
            },
            {
                id: "an_precise_loot",
                name: "Cálculo Preciso",
                tier: 3,
                minLevel: 10,
                cost: 1,
                icon: "fa-coins",
                type: "passive",
                description: "+15% de Tokens adicionais em todos os Baús resgatados no Abismo."
            },
            {
                id: "an_algorithmic_oracle",
                name: "Oráculo Algorítmico",
                tier: 4,
                minLevel: 15,
                cost: 2,
                icon: "fa-wand-magic-sparkles",
                type: "ultimate",
                description: "Se um teste falhar, destaca a linha de saída divergente e a variável associada."
            }
        ]
    },
    debugger: {
        id: "debugger",
        name: "Debugger",
        title: "Guardião Resiliente & Caçador de Falhas",
        tagline: "Imunidade a erros fatais, diagnóstico didático e persistência inabalável.",
        color: "#10b981",
        accentColor: "#22c55e",
        badge: "fa-shield-halved",
        bannerIcon: "fa-bug-slash",
        skills: [
            {
                id: "db_error_shield",
                name: "Escudo de Diagnóstico",
                tier: 1,
                minLevel: 5,
                cost: 1,
                icon: "fa-book-medical",
                type: "passive",
                description: "Erros do compilador vêm com explicações didáticas detalhadas em português."
            },
            {
                id: "db_rebound_xp",
                name: "Refratário ao Fracasso",
                tier: 2,
                minLevel: 7,
                cost: 1,
                icon: "fa-arrow-trend-up",
                type: "passive",
                description: "Corrigir um erro após um teste falho concede +5 XP imediato (até 3x por desafio)."
            },
            {
                id: "db_streak_shield",
                name: "Ofensiva Blindada",
                tier: 3,
                minLevel: 10,
                cost: 1,
                icon: "fa-shield-heart",
                type: "passive",
                description: "Recebe 1 Congelamento de Ofensiva (Streak Freeze) grátis a cada 5 níveis."
            },
            {
                id: "db_live_inspect",
                name: "Depuração Instantânea",
                tier: 4,
                minLevel: 15,
                cost: 2,
                icon: "fa-magnifying-glass-chart",
                type: "ultimate",
                description: "Inspeciona o estado final de todas as variáveis no painel de saída após executar."
            }
        ]
    },
    reviewer: {
        id: "reviewer",
        name: "Reviewer",
        title: "Mestre da Arquitetura & Qualidade de Código",
        tagline: "Elegância estrutural, clareza cirúrgica e domínio de boas práticas.",
        color: "#a855f7",
        accentColor: "#eab308",
        badge: "fa-scroll",
        bannerIcon: "fa-award",
        skills: [
            {
                id: "rv_free_hints",
                name: "Dicas Econômicas",
                tier: 1,
                minLevel: 5,
                cost: 1,
                icon: "fa-lightbulb",
                type: "passive",
                description: "Desbloquear Dica I e Dica II nas atividades não aplica penalidade de bônus de XP."
            },
            {
                id: "rv_clean_syntax",
                name: "Sintaxe Limpa",
                tier: 2,
                minLevel: 7,
                cost: 1,
                icon: "fa-feather",
                type: "passive",
                description: "+10% de Tokens de prestígio ao concluir qualquer desafio com boa formatação."
            },
            {
                id: "rv_party_leader",
                name: "Inspiração da Party",
                tier: 3,
                minLevel: 10,
                cost: 1,
                icon: "fa-users-rays",
                type: "passive",
                description: "Concede +10% de bônus de XP e Tokens para você e todos os integrantes da sua Party ao concluir desafios."
            },
            {
                id: "rv_static_mastery",
                name: "Maestria do Grimório",
                tier: 4,
                minLevel: 15,
                cost: 2,
                icon: "fa-book-atlas",
                type: "ultimate",
                description: "Análise estática preventiva: alerta sobre variáveis não utilizadas e ponteiros perigosos."
            }
        ]
    },
    cheatcode: {
        id: "cheatcode",
        name: "CheatCode",
        title: "Administrador Primordial do Sistema",
        tagline: "Acesso absoluto à matrix da Guilda. Exclusivo para Mestres.",
        color: "#eab308",
        accentColor: "#f59e0b",
        badge: "fa-crown",
        bannerIcon: "fa-terminal",
        skills: [] // Engloba todas as skills automaticamente
    }
};

class SkillTreeManager {
    static getSubclass(subclassId) {
        return SUBCLASSES_DATA[subclassId] || null;
    }

    static getAllSubclasses() {
        return Object.values(SUBCLASSES_DATA).filter(s => s.id !== "cheatcode");
    }

    static isTeacher(user) {
        if (typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin())) return true;
        if (!user) return false;
        const email = (user.email || '').toLowerCase().trim();
        return user.role === 'teacher' || user.role === 'admin' || email === 'admin@guildcode.com' || email === 'rennan.raffaele@unicap.br';
    }

    static hasSkill(state, skillId, user) {
        if (!state) return false;
        // Professor com cheatcode possui todas as habilidades ativas
        if (state.subclass === 'cheatcode' || this.isTeacher(user)) return true;
        if (!state.subclass || !state.skillsUnlocked) return false;
        return !!state.skillsUnlocked[skillId];
    }

    static canUnlockSkill(state, skillId, user) {
        if (!state || !state.subclass) return { can: false, reason: "Escolha uma subclasse primeiro." };
        if (state.subclass === 'cheatcode' || this.isTeacher(user)) return { can: false, reason: "Classe CheatCode já possui todas as habilidades ativas." };

        const sc = SUBCLASSES_DATA[state.subclass];
        if (!sc) return { can: false, reason: "Subclasse inválida." };

        const skill = sc.skills.find(s => s.id === skillId);
        if (!skill) return { can: false, reason: "Habilidade não encontrada para esta classe." };

        if (state.skillsUnlocked && state.skillsUnlocked[skillId]) {
            return { can: false, reason: "Habilidade já desbloqueada." };
        }

        const playerLevel = state.level || 1;
        if (playerLevel < skill.minLevel) {
            return { can: false, reason: `Requer Nível ${skill.minLevel} (Seu nível: ${playerLevel}).` };
        }

        // Checar tier anterior
        if (skill.tier > 1) {
            const prevSkills = sc.skills.filter(s => s.tier < skill.tier);
            const hasPrev = prevSkills.some(s => state.skillsUnlocked && state.skillsUnlocked[s.id]);
            if (!hasPrev) {
                return { can: false, reason: `Desbloqueie uma habilidade de Tier ${skill.tier - 1} primeiro.` };
            }
        }

        return { can: true, skill };
    }

    static unlockSkill(state, skillId, user) {
        const check = this.canUnlockSkill(state, skillId, user);
        if (!check.can) return { success: false, reason: check.reason };

        if (!state.skillsUnlocked) state.skillsUnlocked = {};
        state.skillsUnlocked[skillId] = true;

        return { success: true, skill: check.skill };
    }

    static chooseSubclass(state, subclassId, user) {
        if (!state) return { success: false, reason: "Estado inválido." };

        // Se professor, concede cheatcode
        if (this.isTeacher(user)) {
            state.subclass = 'cheatcode';
            state.skillsUnlocked = {};
            return { success: true, subclass: SUBCLASSES_DATA.cheatcode };
        }

        if (subclassId === 'cheatcode') {
            return { success: false, reason: "Acesso negado à classe CheatCode." };
        }

        const playerLevel = state.level || 1;
        if (playerLevel < 5) {
            return { success: false, reason: "É necessário atingir o Nível 5 para escolher uma Especialização." };
        }

        const sc = SUBCLASSES_DATA[subclassId];
        if (!sc) return { success: false, reason: "Subclasse desconhecida." };

        state.subclass = subclassId;
        if (!state.skillsUnlocked) state.skillsUnlocked = {};

        // Desbloqueia automaticamente a habilidade de Tier 1 como dádiva de despertar
        const tier1 = sc.skills.find(s => s.tier === 1);
        if (tier1) {
            state.skillsUnlocked[tier1.id] = true;
        }

        return { success: true, subclass: sc };
    }
}

if (typeof window !== 'undefined') {
    window.SUBCLASSES_DATA = SUBCLASSES_DATA;
    window.SkillTreeManager = SkillTreeManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUBCLASSES_DATA, SkillTreeManager };
}
