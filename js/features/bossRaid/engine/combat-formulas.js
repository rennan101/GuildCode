/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: COMBAT FORMULAS ENGINE
   Implementação estrita das fórmulas matemáticas de atributos e dano
   (Seções 14, 15 e 16 de CODE_LEVELER_BOSS_BATTLE_RAIDS.md)
   ═══════════════════════════════════════════════════════════════ */

class CombatFormulas {
    /**
     * Multiplicador de HP baseado no Code Power (Inicia em 1000 CP)
     */
    static getCodePowerHpMultiplier(codePower = 1000) {
        const cp = Number(codePower) || 1000;
        const mult = 1 + ((cp - 1000) / 10000);
        return Math.max(1, mult);
    }

    /**
     * Multiplicador de Combate baseado no Code Power (Max +50% bônus)
     */
    static getCodePowerCombatMultiplier(codePower = 1000) {
        const cp = Number(codePower) || 1000;
        const bonus = Math.min(
            Math.max((cp - 1000) / 15000, 0),
            0.50
        );
        return 1 + bonus;
    }

    /**
     * Retorna os modificadores da subclasse do jogador
     */
    static getSubclassModifiers(subclass) {
        if (!subclass || typeof SUBCLASS_RAID_MODIFIERS === 'undefined') {
            return {};
        }
        return SUBCLASS_RAID_MODIFIERS[subclass] || {};
    }

    /**
     * Calcula os atributos completos de combate de um jogador
     */
    static calculatePlayerStats(playerData, avatarData) {
        const level = Math.max(1, Number(playerData.level) || 1);
        const codePower = Math.max(100, Number(playerData.codePower) || 1000);
        const subclass = playerData.subclass || null;
        const subMods = this.getSubclassModifiers(subclass);

        const baseHp = (avatarData && avatarData.baseHp) || 1200;
        const baseAttack = (avatarData && avatarData.baseAttack) || 105;
        const baseDefense = (avatarData && avatarData.baseDefense) || 90;
        const baseSpeed = (avatarData && avatarData.baseSpeed) || 100;

        const cpHpMult = this.getCodePowerHpMultiplier(codePower);
        const cpCombatMult = this.getCodePowerCombatMultiplier(codePower);

        // Fórmula Oficial de HP (Seção 14)
        const maxHp = Math.round(
            baseHp *
            (1 + (level - 1) * 0.08) *
            cpHpMult
        );

        // Fórmula Oficial de Ataque
        const attack = Math.round(
            baseAttack *
            (1 + (level - 1) * 0.055) *
            cpCombatMult *
            (subMods.damageMultiplier || 1.0)
        );

        // Fórmula Oficial de Defesa
        const defense = Math.round(
            baseDefense *
            (1 + (level - 1) * 0.045) *
            cpCombatMult *
            (subMods.defenseMultiplier || 1.0)
        );

        // Fórmula Oficial de Velocidade (Seção 6)
        const speed = Math.round(
            baseSpeed +
            Math.floor(level * 0.4) +
            (subMods.speedBonus || 0)
        );

        return {
            maxHp,
            currentHp: maxHp,
            attack,
            defense,
            speed,
            codePower,
            level,
            subclass,
            subclassMods: subMods
        };
    }

    /**
     * Redução de dano pela defesa (Seção 15):
     * defenseReduction = defender.defense / (defender.defense + 100)
     */
    static getDefenseReduction(defense) {
        const def = Math.max(0, Number(defense) || 0);
        return def / (def + 100);
    }

    /**
     * Cálculo de Dano Final (Seção 15):
     * rawDamage = attacker.attack * skillMultiplier
     * finalDamage = Math.max(1, Math.round(rawDamage * (1 - defenseReduction)))
     */
    static calculateDamage(attacker, defender, skillMultiplier = 1.0) {
        const rawDamage = (attacker.attack || 100) * (Number(skillMultiplier) || 1.0);
        const defReduction = this.getDefenseReduction(defender.defense || 0);
        const finalDamage = Math.max(
            1,
            Math.round(rawDamage * (1 - defReduction))
        );
        return {
            rawDamage: Math.round(rawDamage),
            defenseReduction: defReduction,
            finalDamage: finalDamage
        };
    }

    /**
     * Cálculo de Cura de Item:
     * Por padrão cura 25% do maxHp do usuário + bônus de subclasse (Reviewer)
     */
    static calculateHeal(user) {
        const subMods = user.subclassMods || this.getSubclassModifiers(user.subclass);
        const mult = (subMods.healMultiplier || 1.0);
        const baseHeal = (user.maxHp || 1000) * 0.25;
        return Math.round(baseHeal * mult);
    }

    /**
     * Reviver jogador (Seção 8.3):
     * revivedHp = player.maxHp * 0.30 (+ bônus de subclasse Debugger)
     */
    static calculateReviveHp(downedPlayer, reviver = null) {
        let bonus = 0;
        if (reviver) {
            const mods = reviver.subclassMods || this.getSubclassModifiers(reviver.subclass);
            bonus = mods.reviveBonus || 0;
        }
        const pct = 0.30 + bonus;
        return Math.max(1, Math.round((downedPlayer.maxHp || 1000) * pct));
    }
}

window.CombatFormulas = CombatFormulas;
