/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: TURN ENGINE
   Sistema dinâmico de barra de iniciativa baseado em velocidade
   (Seção 6 de CODE_LEVELER_BOSS_BATTLE_RAIDS.md)
   ═══════════════════════════════════════════════════════════════ */

class TurnEngine {
    constructor() {
        this.entities = []; // { id, name, isBoss, speed, initiative, status }
        this.currentTurn = null;
        this.roundCount = 0;
    }

    /**
     * Inicializa os combatentes com iniciativa zerada
     */
    init(bossEntity, playerEntities = []) {
        this.entities = [];
        this.roundCount = 1;

        // Adiciona o Boss
        this.entities.push({
            id: bossEntity.id,
            name: bossEntity.name,
            isBoss: true,
            speed: Math.max(10, Number(bossEntity.speed) || 100),
            initiative: 0,
            status: 'ACTIVE',
            ref: bossEntity
        });

        // Adiciona os jogadores
        playerEntities.forEach(p => {
            this.entities.push({
                id: p.uid || p.id,
                name: p.name || p.displayName || 'Jogador',
                photoURL: p.photoURL || `assets/avatars/avatar_${p.avatarId || '02'}.png`,
                avatarId: p.avatarId || '02',
                isBoss: false,
                speed: Math.max(10, Number(p.speed) || 100),
                initiative: 0,
                status: p.combatStatus || 'ACTIVE',
                ref: p
            });
        });

        return this.getNextTurn();
    }

    /**
     * Atualiza o status de combate de uma entidade (ex: DOWNED, DISCONNECTED, ACTIVE)
     */
    updateEntityStatus(entityId, newStatus) {
        const ent = this.entities.find(e => e.id === entityId);
        if (ent) {
            ent.status = newStatus;
        }
    }

    /**
     * Atualiza a velocidade de uma entidade
     */
    updateEntitySpeed(entityId, newSpeed) {
        const ent = this.entities.find(e => e.id === entityId);
        if (ent) {
            ent.speed = Math.max(10, Number(newSpeed) || 10);
        }
    }

    /**
     * Ciclo de iniciativa: incrementa initiative += speed até que alguém atinja 100.
     * Retorna a entidade que recebeu o turno.
     */
    getNextTurn() {
        const eligible = () => this.entities.filter(e => e.status !== 'DOWNED' && e.status !== 'DISCONNECTED');

        // Loop de simulação até encontrar uma entidade pronta
        let safetyCounter = 0;
        while (safetyCounter < 500) {
            safetyCounter++;

            // Checa se alguém já está >= 100
            const readyEntities = eligible().filter(e => e.initiative >= 100);
            if (readyEntities.length > 0) {
                // Desempate por maior iniciativa acumulada
                readyEntities.sort((a, b) => b.initiative - a.initiative);
                const winner = readyEntities[0];
                winner.initiative -= 100;
                this.currentTurn = winner;
                return winner;
            }

            // Ninguém >= 100 ainda: avança o ciclo para todos os combatentes válidos
            const currentEligible = eligible();
            if (currentEligible.length === 0) {
                this.currentTurn = null;
                return null;
            }

            currentEligible.forEach(e => {
                e.initiative += e.speed;
            });
        }

        // Fallback de segurança
        return eligible()[0] || null;
    }

    /**
     * Prevê a timeline dos próximos N turnos sem alterar o estado atual
     */
    previewTimeline(count = 6) {
        const clone = this.entities
            .filter(e => e.status !== 'DOWNED' && e.status !== 'DISCONNECTED')
            .map(e => ({
                id: e.id,
                name: e.name,
                isBoss: e.isBoss,
                photoURL: e.photoURL,
                avatarId: e.avatarId,
                speed: e.speed,
                initiative: e.initiative
            }));

        const timeline = [];
        let safety = 0;

        while (timeline.length < count && safety < 600) {
            safety++;
            const ready = clone.filter(e => e.initiative >= 100);
            if (ready.length > 0) {
                ready.sort((a, b) => b.initiative - a.initiative);
                const winner = ready[0];
                winner.initiative -= 100;
                timeline.push({
                    id: winner.id,
                    name: winner.name,
                    isBoss: winner.isBoss,
                    photoURL: winner.photoURL,
                    avatarId: winner.avatarId
                });
            } else {
                clone.forEach(e => {
                    e.initiative += e.speed;
                });
            }
        }

        return timeline;
    }
}

window.TurnEngine = TurnEngine;

