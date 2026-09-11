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

        // Bônus de Pontos de Status Alocados (Sistema RPG: hp: 15, atk: 8, def: 6, spd: 5)
        const STAT_MULT = { hp: 15, atk: 8, def: 6, spd: 5 };
        let allocatedPts = playerData.avatarStats || playerData.allocatedPoints || null;
        const avId = (avatarData && avatarData.id) || playerData.currentAvatarId || playerData.avatarId || '02';
        if (!allocatedPts && typeof window !== 'undefined' && window.app && window.app.engine) {
            allocatedPts = window.app.engine.getAvatarStatPoints(avId);
        }
        allocatedPts = allocatedPts || { hp: 0, atk: 0, def: 0, spd: 0 };

        // Bônus de Artefatos Equipados
        let artBonuses = playerData.artifactBonuses || null;
        if (!artBonuses && typeof window !== 'undefined' && window.app && window.app.engine) {
            artBonuses = window.app.engine.getAvatarArtifactBonuses(avId);
        }
        artBonuses = artBonuses || { hp_flat: 0, hp_pct: 0, atk_flat: 0, atk_pct: 0, def_flat: 0, def_pct: 0, spd_flat: 0, spd_pct: 0 };

        // Bônus Passivos das Boss Skills conquistadas (Mundo C e C#)
        let bossSkills = playerData.bossSkillsBonuses || null;
        if (!bossSkills && typeof window !== 'undefined' && window.app && window.app.engine && typeof window.app.engine.getBossSkillsBonuses === 'function') {
            bossSkills = window.app.engine.getBossSkillsBonuses();
        }
        bossSkills = bossSkills || { hp_flat: 0, atk_pct: 0, def_pct: 0, spd_flat: 0, bossEncounterAtkPct: 0, bossEncounterDefPct: 0, raidDefPct: 0 };

        // Pontos de status adicionados
        const addedHpFromPts = (allocatedPts.hp || 0) * STAT_MULT.hp;
        const addedAtkFromPts = (allocatedPts.atk || 0) * STAT_MULT.atk;
        const addedDefFromPts = (allocatedPts.def || 0) * STAT_MULT.def;
        const addedSpdFromPts = (allocatedPts.spd || 0) * STAT_MULT.spd;

        // Bônus passivos das Boss Skills aplicados aos atributos base
        const bossHpFlat = bossSkills.hp_flat || 0;
        const bossAtkPct = (bossSkills.atk_pct || 0) + (bossSkills.bossEncounterAtkPct || 0);
        const bossDefPct = (bossSkills.def_pct || 0) + (bossSkills.raidDefPct || 0) + (bossSkills.bossEncounterDefPct || 0);
        const bossSpdFlat = bossSkills.spd_flat || 0;

        // Fórmula Oficial de HP com Artefatos, Pontos de Status e Boss Skills
        const effectiveBaseHp = (baseHp * (1 + (artBonuses.hp_pct || 0) / 100)) + (artBonuses.hp_flat || 0) + addedHpFromPts + bossHpFlat;
        const maxHp = Math.round(
            effectiveBaseHp *
            (1 + (level - 1) * 0.08) *
            cpHpMult
        );

        // Fórmula Oficial de Ataque com Artefatos, Pontos de Status e Boss Skills
        const effectiveBaseAtk = (baseAttack * (1 + ((artBonuses.atk_pct || 0) + bossAtkPct) / 100)) + (artBonuses.atk_flat || 0) + addedAtkFromPts;
        const attack = Math.round(
            effectiveBaseAtk *
            (1 + (level - 1) * 0.055) *
            cpCombatMult *
            (subMods.damageMultiplier || 1.0)
        );

        // Fórmula Oficial de Defesa com Artefatos, Pontos de Status e Boss Skills
        const effectiveBaseDef = (baseDefense * (1 + ((artBonuses.def_pct || 0) + bossDefPct) / 100)) + (artBonuses.def_flat || 0) + addedDefFromPts;
        const defense = Math.round(
            effectiveBaseDef *
            (1 + (level - 1) * 0.045) *
            cpCombatMult *
            (subMods.defenseMultiplier || 1.0)
        );

        // Fórmula Oficial de Velocidade com Artefatos, Pontos de Status e Boss Skills
        const effectiveBaseSpd = (baseSpeed * (1 + (artBonuses.spd_pct || 0) / 100)) + (artBonuses.spd_flat || 0) + addedSpdFromPts + bossSpdFlat;
        const speed = Math.round(
            effectiveBaseSpd +
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
     * Calcula o bônus de tempo em segundos para desafios de código e reações
     * com base no atributo Speed do avatar.
     * Fórmula balanceada: cada 10 de Speed acima de 90 concede +1.5s (limite de 15s).
     * @param {number} playerSpeed 
     * @returns {number} Tempo bônus em segundos
     */
    static getSpeedTimeBonus(playerSpeed = 100) {
        const spd = Number(playerSpeed) || 100;
        if (spd <= 90) return 0;
        const rawBonus = Math.floor((spd - 90) / 10) * 1.5;
        return Math.min(15, Math.max(0, Math.round(rawBonus)));
    }

    /**
     * Retorna o multiplicador de ataque concedido pelos Nightbloods ativos na party.
     * Cada Nightblood vivo (não DOWNED) acumula +25% de ataque para toda a party.
     * @param {Array} players - Array de jogadores com { avatarId, combatStatus }
     * @returns {number} Multiplicador (ex: 1.25 para 1 Nightblood, 1.5 para 2, etc.)
     */
    static getNightbloodPartyMultiplier(players = []) {
        if (!players || players.length === 0) return 1.0;
        const NIGHTBLOOD_AVATAR_ID = '23';
        const NIGHTBLOOD_BONUS = 0.25;
        let count = 0;
        for (const p of players) {
            if (
                p.combatStatus !== 'DOWNED' &&
                (p.currentHp || 0) > 0 &&
                p.avatarId === NIGHTBLOOD_AVATAR_ID
            ) {
                count++;
            }
        }
        return 1.0 + (count * NIGHTBLOOD_BONUS);
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
     * Cálculo de Cura de Item Individual (Poção de Vida):
     * Cura 45% do maxHp do usuário + bônus de subclasse (Reviewer)
     */
    static calculateHeal(user) {
        const subMods = user.subclassMods || this.getSubclassModifiers(user.subclass);
        const mult = (subMods.healMultiplier || 1.0);
        const baseHeal = (user.maxHp || 600) * 0.45;
        return Math.round(baseHeal * mult);
    }

    /**
     * Cálculo de Cura de Item Coletivo (Elixir da Party):
     * Cura 35% do maxHp de cada aliado da equipe
     */
    static calculateGroupHeal(target, user) {
        const subMods = (user && (user.subclassMods || this.getSubclassModifiers(user.subclass))) || {};
        const mult = (subMods.healMultiplier || 1.0);
        const baseHeal = (target.maxHp || 600) * 0.35;
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
