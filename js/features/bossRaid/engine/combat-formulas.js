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
    /**
     * Calcula os atributos completos de combate de um jogador
     * Contabiliza fielmente: Base do Avatar + Pontos Alocados + Artefatos (Flat e %) + Boss Skills + Subclasses + Sinergia da Party
     * @param {Object} playerData
     * @param {Object} [avatarData]
     * @param {Array} [allPlayersInRoom]
     * @returns {Object} Atributos de combate consolidados
     */
    static calculatePlayerStats(playerData = {}, avatarData = null, allPlayersInRoom = null) {
        const level = Math.max(1, Number(playerData.level) || 1);
        const codePower = Math.max(100, Number(playerData.codePower) || 1000);
        const subclass = playerData.subclass || null;
        const subMods = this.getSubclassModifiers(subclass);

        // Identificação do Avatar
        const avId = (avatarData && avatarData.id) 
            || playerData.avatarId 
            || playerData.currentAvatarId 
            || (playerData.photoURL && playerData.photoURL.match(/avatar_(\d+)\.png/) ? playerData.photoURL.match(/avatar_(\d+)\.png/)[1] : null)
            || ((typeof getEquippedAvatarId === 'function') ? getEquippedAvatarId() : '02');

        const avSkillsMap = (typeof AVATAR_SKILLS_DATA !== 'undefined') ? AVATAR_SKILLS_DATA : {};
        const avSkillInfo = (avatarData && avatarData.baseHp) ? avatarData : (avSkillsMap[avId] || {});

        const baseHp = avSkillInfo.baseHp || (avatarData && avatarData.baseHp) || 600;
        const baseAttack = avSkillInfo.baseAttack || (avatarData && avatarData.baseAttack) || 150;
        const baseDefense = avSkillInfo.baseDefense || (avatarData && avatarData.baseDefense) || 90;
        const baseSpeed = avSkillInfo.baseSpeed || (avatarData && avatarData.baseSpeed) || 100;

        const engine = (typeof app !== 'undefined' && app.engine) 
            || (typeof window !== 'undefined' && window.app && window.app.engine) 
            || (typeof window !== 'undefined' && window.engine);

        // Multiplicadores por ponto alocado (hp: 15, atk: 8, def: 6, spd: 5)
        const STAT_MULT = { hp: 15, atk: 8, def: 6, spd: 5 };

        // 1. Extração dos Pontos de Status Alocados
        let allocatedPts = null;
        if (playerData.avatarStats) {
            if (typeof playerData.avatarStats.hp === 'number') {
                allocatedPts = playerData.avatarStats;
            } else if (playerData.avatarStats[avId]) {
                allocatedPts = playerData.avatarStats[avId];
            }
        }
        if (!allocatedPts && playerData.allocatedPoints) {
            if (typeof playerData.allocatedPoints.hp === 'number') {
                allocatedPts = playerData.allocatedPoints;
            } else if (playerData.allocatedPoints[avId]) {
                allocatedPts = playerData.allocatedPoints[avId];
            }
        }
        if (!allocatedPts && engine && typeof engine.getAvatarStatPoints === 'function') {
            allocatedPts = engine.getAvatarStatPoints(avId);
        }
        allocatedPts = allocatedPts || { hp: 0, atk: 0, def: 0, spd: 0 };

        // 2. Extração dos Bônus de Artefatos Equipados
        let artBonuses = null;
        if (playerData.artifactBonuses && (playerData.artifactBonuses.hp_flat !== undefined || playerData.artifactBonuses.hp_pct !== undefined)) {
            artBonuses = playerData.artifactBonuses;
        } else if (engine && typeof engine.getAvatarArtifactBonuses === 'function') {
            artBonuses = engine.getAvatarArtifactBonuses(avId);
        }
        artBonuses = artBonuses || { hp_flat: 0, hp_pct: 0, atk_flat: 0, atk_pct: 0, def_flat: 0, def_pct: 0, spd_flat: 0, spd_pct: 0 };

        // 3. Extração dos Bônus Passivos das Boss Skills Conquistadas
        let bossSkills = null;
        if (playerData.bossSkillsBonuses && (playerData.bossSkillsBonuses.hp_flat !== undefined || playerData.bossSkillsBonuses.atk_pct !== undefined)) {
            bossSkills = playerData.bossSkillsBonuses;
        } else if (engine && typeof engine.getBossSkillsBonuses === 'function') {
            bossSkills = engine.getBossSkillsBonuses();
        }
        bossSkills = bossSkills || { hp_flat: 0, hp_pct: 0, atk_flat: 0, atk_pct: 0, def_flat: 0, def_pct: 0, spd_flat: 0, spd_pct: 0, bossEncounterAtkPct: 0, bossEncounterDefPct: 0, raidDefPct: 0 };

        // 4. Sinergia & Buffs Coletivos da Party
        let partyAtkPct = 0;
        let partyDefPct = 0;
        let partyHpPct = 0;
        let partyDmgMult = 1.0;

        const partyList = Array.isArray(allPlayersInRoom) ? allPlayersInRoom.filter(Boolean) : [];
        if (partyList.length > 0) {
            partyList.forEach(m => {
                const subId = m.subclass || ((m.isTeacher || m.role === 'teacher') ? 'cheatcode' : null);
                if (subId === 'cheatcode') {
                    partyDmgMult += 0.15; // +15% de Dano Universal de Raid
                } else if (subId === 'hardcoder') {
                    partyAtkPct += 15; // +15% Coletivo de Ataque
                }
            });
        }

        // Pontos de status adicionados
        const addedHpFromPts = (allocatedPts.hp || 0) * STAT_MULT.hp;
        const addedAtkFromPts = (allocatedPts.atk || 0) * STAT_MULT.atk;
        const addedDefFromPts = (allocatedPts.def || 0) * STAT_MULT.def;
        const addedSpdFromPts = (allocatedPts.spd || 0) * STAT_MULT.spd;

        // Bônus passivos das Boss Skills aplicados aos atributos
        const bossHpFlat = bossSkills.hp_flat || 0;
        const bossHpPct = bossSkills.hp_pct || 0;
        const bossAtkFlat = bossSkills.atk_flat || 0;
        const bossAtkPct = (bossSkills.atk_pct || 0) + (bossSkills.bossEncounterAtkPct || 0);
        const bossDefFlat = bossSkills.def_flat || 0;
        const bossDefPct = (bossSkills.def_pct || 0) + (bossSkills.raidDefPct || 0) + (bossSkills.bossEncounterDefPct || 0);
        const bossSpdFlat = bossSkills.spd_flat || 0;
        const bossSpdPct = bossSkills.spd_pct || 0;

        // Fórmula Fiel ao Card do Inventário com Sinergia: (base + pontos + flat) * (1 + pct / 100)
        const totalFlatHp = baseHp + addedHpFromPts + (artBonuses.hp_flat || 0) + bossHpFlat;
        const totalHpPct = (artBonuses.hp_pct || 0) + bossHpPct + partyHpPct;
        const maxHp = Math.round(totalFlatHp * (1 + totalHpPct / 100));

        // Fórmula de Ataque fiel com bônus de subclasse e sinergia de party
        const totalFlatAtk = baseAttack + addedAtkFromPts + (artBonuses.atk_flat || 0) + bossAtkFlat;
        const totalAtkPct = (artBonuses.atk_pct || 0) + bossAtkPct + partyAtkPct;
        const attack = Math.round(
            totalFlatAtk *
            (1 + totalAtkPct / 100) *
            (subMods.damageMultiplier || 1.0) *
            partyDmgMult
        );

        // Fórmula de Defesa com bônus de subclasse, perk Estrutura Pura e sinergia de party
        const totalFlatDef = baseDefense + addedDefFromPts + (artBonuses.def_flat || 0) + bossDefFlat;
        let pureStructDefMult = 1.0;
        const userObj = typeof authManager !== 'undefined' ? authManager.currentUser : null;
        if (engine && typeof engine.hasSkill === 'function') {
            if (engine.hasSkill('hc_pure_struct', userObj)) {
                pureStructDefMult = 1.10;
            }
        } else if (playerData && playerData.skillsUnlocked && playerData.skillsUnlocked['hc_pure_struct']) {
            pureStructDefMult = 1.10;
        }

        const totalDefPct = (artBonuses.def_pct || 0) + bossDefPct + partyDefPct;
        const defense = Math.round(
            totalFlatDef *
            (1 + totalDefPct / 100) *
            (subMods.defenseMultiplier || 1.0) *
            pureStructDefMult
        );

        // Fórmula de Velocidade fiel com bônus de subclasse
        const totalFlatSpd = baseSpeed + addedSpdFromPts + (artBonuses.spd_flat || 0) + bossSpdFlat;
        const totalSpdPct = (artBonuses.spd_pct || 0) + bossSpdPct;
        const speed = Math.round(
            (totalFlatSpd * (1 + totalSpdPct / 100)) +
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
