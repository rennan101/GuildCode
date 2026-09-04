/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: BOSS AI & TARGETING
   Seleção de ações do chefe e alvos (Seção 10 de CODE_LEVELER_BOSS_BATTLE_RAIDS.md)
   ═══════════════════════════════════════════════════════════════ */

class BossAI {
    /**
     * Sorteia o tipo de ação do Boss com base nos pesos configuráveis
     */
    static selectActionType(actionWeights = null) {
        const weights = actionWeights || BOSS_ACTION_WEIGHTS;
        const rand = Math.random();

        const singleWeight = weights.SINGLE_TARGET ?? 0.50;
        const multiWeight = weights.MULTI_TARGET ?? 0.35;

        if (rand < singleWeight) {
            return 'SINGLE_TARGET';
        } else if (rand < singleWeight + multiWeight) {
            return 'MULTI_TARGET';
        } else {
            return 'AOE';
        }
    }

    /**
     * Seleciona alvos vivos (ACTIVE / TARGETED) entre os jogadores
     */
    static chooseTargets(actionType, alivePlayers = []) {
        if (!alivePlayers || alivePlayers.length === 0) {
            return [];
        }

        // Embaralha jogadores vivos para seleção aleatória justa
        const shuffled = [...alivePlayers].sort(() => Math.random() - 0.5);

        if (actionType === 'SINGLE_TARGET' || alivePlayers.length === 1) {
            return [shuffled[0]];
        } else if (actionType === 'MULTI_TARGET') {
            const count = Math.min(alivePlayers.length, Math.random() < 0.6 ? 2 : 3);
            return shuffled.slice(0, count);
        } else { // AOE
            return [...alivePlayers];
        }
    }

    /**
     * Decide o ataque completo do Boss
     */
    static decideAttack(boss, players = []) {
        // Filtra APENAS jogadores verdadeiramente vivos (com HP > 0 e que não estejam caídos)
        const alive = players.filter(p => {
            const hp = p.currentHp !== undefined ? p.currentHp : (p.baseHp || 1200);
            return hp > 0 && p.combatStatus !== 'DOWNED' && p.combatStatus !== 'DISCONNECTED';
        });

        if (alive.length === 0) return null;

        const actionType = this.selectActionType(boss.actionWeights);
        const targets = this.chooseTargets(actionType, alive);

        let multiplier = 1.0;
        if (actionType === 'SINGLE_TARGET') {
            multiplier = boss.singleTargetMultiplier || 1.0;
        } else if (actionType === 'MULTI_TARGET') {
            multiplier = boss.multiTargetMultiplier || 0.80;
        } else {
            multiplier = boss.aoeMultiplier || 0.65;
        }

        return {
            actionType,
            targets,
            multiplier,
            targetUids: targets.map(t => t.uid || t.id)
        };
    }
}

window.BossAI = BossAI;
