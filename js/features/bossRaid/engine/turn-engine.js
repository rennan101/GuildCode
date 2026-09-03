/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: TURN ENGINE (SIMULTANEOUS MODE)
   Gerenciador de Fases Alternadas Simultâneas: Party Phase vs Boss Phase
   ═══════════════════════════════════════════════════════════════ */

class TurnEngine {
    constructor() {
        this.bossEntity = null;
        this.playerEntities = [];
        this.currentPhase = 'PARTY'; // 'PARTY' ou 'BOSS'
        this.roundCount = 1;
        this.isInitialized = false;
    }

    /**
     * Inicializa os combatentes para a batalha simultânea
     */
    init(bossEntity, playerEntities = []) {
        this.bossEntity = {
            id: bossEntity.id,
            name: bossEntity.name,
            isBoss: true,
            status: 'ACTIVE',
            ref: bossEntity
        };

        this.playerEntities = playerEntities.map(p => ({
            id: p.uid || p.id,
            name: p.name || p.displayName || 'Jogador',
            photoURL: p.photoURL || `assets/avatars/avatar_${p.avatarId || '02'}.png`,
            avatarId: p.avatarId || '02',
            isBoss: false,
            status: p.combatStatus || 'ACTIVE',
            hasActedThisRound: false,
            ref: p
        }));

        this.roundCount = 1;
        this.currentPhase = 'PARTY';
        this.isInitialized = true;

        return this.getCurrentPhaseState();
    }

    /**
     * Atualiza o status de combate de uma entidade (ex: DOWNED, ACTIVE)
     */
    updateEntityStatus(entityId, newStatus) {
        if (this.bossEntity && this.bossEntity.id === entityId) {
            this.bossEntity.status = newStatus;
        }
        const p = this.playerEntities.find(e => e.id === entityId);
        if (p) {
            p.status = newStatus;
        }
    }

    /**
     * Registra que um jogador concluiu sua ação no turno da Party
     */
    markPlayerActed(playerId) {
        const p = this.playerEntities.find(e => e.id === playerId);
        if (p) {
            p.hasActedThisRound = true;
        }
    }

    /**
     * Verifica se todos os jogadores vivos já agiram na rodada
     */
    haveAllAlivePlayersActed() {
        const alivePlayers = this.playerEntities.filter(p => p.status !== 'DOWNED' && p.status !== 'DISCONNECTED');
        if (alivePlayers.length === 0) return true;
        return alivePlayers.every(p => p.hasActedThisRound);
    }

    /**
     * Avança para a próxima fase (PARTY -> BOSS -> Próxima Rodada / PARTY)
     */
    advancePhase() {
        if (this.currentPhase === 'PARTY') {
            this.currentPhase = 'BOSS';
        } else {
            this.currentPhase = 'PARTY';
            this.roundCount++;
            // Reseta flags de ação para a nova rodada
            this.playerEntities.forEach(p => {
                p.hasActedThisRound = false;
            });
        }
        return this.getCurrentPhaseState();
    }

    /**
     * Retorna o estado atual da fase
     */
    getCurrentPhaseState() {
        return {
            phase: this.currentPhase,
            round: this.roundCount,
            isPartyPhase: this.currentPhase === 'PARTY',
            isBossPhase: this.currentPhase === 'BOSS',
            boss: this.bossEntity,
            players: this.playerEntities
        };
    }

    /**
     * Retorna uma representação de timeline de fases para a UI
     */
    previewTimeline(count = 5) {
        const timeline = [];
        let phase = this.currentPhase;
        let round = this.roundCount;

        for (let i = 0; i < count; i++) {
            if (phase === 'PARTY') {
                timeline.push({
                    id: `party_r${round}`,
                    name: `Party (Rodada ${round})`,
                    isBoss: false,
                    phase: 'PARTY',
                    round
                });
                phase = 'BOSS';
            } else {
                timeline.push({
                    id: `boss_r${round}`,
                    name: `${this.bossEntity ? this.bossEntity.name : 'Boss'}`,
                    isBoss: true,
                    phase: 'BOSS',
                    round
                });
                phase = 'PARTY';
                round++;
            }
        }
        return timeline;
    }
}

window.TurnEngine = TurnEngine;
