/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: MASTER ORCHESTRATOR
   Coordenação geral entre Engine, UI, Multiplayer, Desafios e Áudio
   ═══════════════════════════════════════════════════════════════ */

class BossRaidManager {
    constructor() {
        this.currentChapterId = 0;
        this.currentBoss = null;
        this.turnEngine = new TurnEngine();
        this.challengeEngine = new RaidChallengeEngine();
        this.activeTurnEntity = null;
        this.currentBossAttack = null;
        this.playerReactions = {}; // uid -> reaction
        this.reactionTimer = null;
    }

    /**
     * Verifica os critérios de desbloqueio (Seção 2):
     * player.level >= 5 && player.subclass !== null && chapterCompleted
     */
    canAccessBoss(chapterId, playerState, engine) {
        if (!playerState) return false;
        const level = playerState.level || 1;
        const subclass = playerState.subclass || null;
        const isTeacher = (typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin()));

        // Professores / Mestres possuem bypass de teste
        if (isTeacher) return true;

        if (level < 5 || !subclass) return false;

        // Capítulo concluído no modo História
        if (engine && typeof engine.isChapterCompleted === 'function') {
            return engine.isChapterCompleted(chapterId);
        }

        return false;
    }

    /**
     * Abre o Lobby da Boss Raid para o capítulo informado
     */
    async openLobby(chapterId) {
        this.currentChapterId = Number(chapterId);
        this.currentBoss = BossDataManager.getBossByChapter(this.currentChapterId);

        const engine = (typeof app !== 'undefined' && app.engine) || window.engine;
        const playerState = engine ? engine.state : { level: 5, subclass: 'hardcoder', codePower: 1000 };

        // Validação de Requisitos
        if (!this.canAccessBoss(this.currentChapterId, playerState, engine)) {
            if (typeof app !== 'undefined' && app.ui && app.ui.showToast) {
                app.ui.showToast('Requer Nível 5+, Subclasse Despertada e Capítulo Concluído!', 'warning');
            } else {
                alert('Requer Nível 5+, Subclasse Despertada e Capítulo Concluído no modo História!');
            }
            return;
        }

        // Dados do Usuário Atual
        const currentUser = (typeof authManager !== 'undefined' && authManager.getCurrentUser()) || {
            uid: 'local_player',
            displayName: playerState.name || 'Codemancer',
            photoURL: 'assets/avatars/avatar_02.png'
        };

        const avatarId = (typeof getEquippedAvatarId === 'function') ? getEquippedAvatarId() : '02';
        const avatarData = (typeof AVATAR_SKILLS_DATA !== 'undefined') ? AVATAR_SKILLS_DATA[avatarId] : null;
        const combatStats = CombatFormulas.calculatePlayerStats(playerState, avatarData);

        const currentPlayerData = {
            uid: currentUser.uid,
            displayName: currentUser.displayName || playerState.name || 'Codemancer',
            photoURL: currentUser.photoURL || `assets/avatars/avatar_${avatarId}.png`,
            avatarId: avatarId,
            level: playerState.level || 1,
            codePower: playerState.codePower || 1000,
            subclass: playerState.subclass || 'hardcoder',
            ...combatStats
        };

        // Obtenção da Party Atual (se houver)
        let currentParty = null;
        if (typeof partyManager !== 'undefined' && partyManager.currentParty) {
            currentParty = partyManager.currentParty;
        }

        // Muda tela para Boss Raid
        if (typeof app !== 'undefined' && app.ui && app.ui.showScreen) {
            app.ui.showScreen('boss-raid');
        }

        // Registra callback de sincronização
        window.raidRealtime.onRaidUpdateCallback = (raidData) => this.handleRaidDataUpdate(raidData, currentUser);

        // Conecta ou cria sala
        const raidData = await window.raidRealtime.joinOrCreateRaidRoom(
            currentParty,
            this.currentChapterId,
            currentPlayerData,
            this.currentBoss
        );

        this.handleRaidDataUpdate(raidData, currentUser);
    }

    /**
     * Trata as atualizações recebidas da sala de Raid (Firestore ou Local)
     */
    handleRaidDataUpdate(raidData, currentUser) {
        if (!raidData) return;

        if (raidData.status === 'LOBBY') {
            window.raidUI.renderLobby(
                raidData,
                this.currentBoss,
                currentUser,
                () => window.raidRealtime.toggleReady(currentUser.uid),
                (avatarId, avData) => this.handleAvatarChange(currentUser.uid, avatarId, avData),
                () => this.leaveRaid(currentUser.uid)
            );

            // Verifica se todos estão prontos para disparar contagem
            const players = raidData.players || [];
            if (players.length > 0 && players.every(p => p.ready)) {
                if (window.raidRealtime.isHost && raidData.status !== 'COUNTDOWN') {
                    this.startCountdown(currentUser);
                }
            }
        } else if (raidData.status === 'ACTIVE' || raidData.status === 'PLAYER_TURN' || raidData.status === 'BOSS_TURN') {
            const timeline = this.turnEngine.previewTimeline(5);
            window.raidUI.renderBattleArena(
                raidData,
                this.currentBoss,
                currentUser,
                this.activeTurnEntity,
                timeline,
                (actionType) => this.handlePlayerAction(actionType, currentUser),
                (reactionType) => this.handleDefensiveReaction(reactionType, currentUser)
            );
        } else if (raidData.status === 'VICTORY') {
            window.raidUI.renderVictoryScreen(
                raidData,
                this.currentBoss,
                (xp, tokens, boss) => this.claimRewardsAndExit(xp, tokens, boss, currentUser)
            );
        } else if (raidData.status === 'DEFEAT') {
            window.raidUI.renderDefeatScreen(
                raidData,
                this.currentBoss,
                () => this.openLobby(this.currentChapterId),
                () => this.leaveRaid(currentUser.uid)
            );
        }
    }

    async handleAvatarChange(uid, avatarId, avatarData) {
        await window.raidRealtime.updatePlayerAvatar(uid, avatarId, avatarData);
    }

    /**
     * Inicia a contagem regressiva sincronizada 5..4..3..2..1
     */
    startCountdown(currentUser) {
        window.raidRealtime.updateRaidState({ status: 'COUNTDOWN' });

        let count = 5;
        const interval = setInterval(() => {
            window.raidUI.showCountdown(count, () => {
                if (count <= 0) {
                    clearInterval(interval);
                    this.startBattle(currentUser);
                }
            });
            count--;
            if (count < 0) {
                clearInterval(interval);
                this.startBattle(currentUser);
            }
        }, 1000);
    }

    /**
     * Inicia o combate
     */
    async startBattle(currentUser) {
        const raidData = window.raidRealtime.currentRaidData;
        const players = raidData.players || [];

        // Calcula stats escalonados do Boss
        const avgLvl = players.reduce((acc, p) => acc + (p.level || 1), 0) / Math.max(1, players.length);
        const bossStats = BossDataManager.calculateBossStats(this.currentBoss, players.length, avgLvl);

        // Inicializa o motor de turnos por velocidade
        this.activeTurnEntity = this.turnEngine.init(
            { id: this.currentBoss.id, name: this.currentBoss.name, speed: bossStats.speed },
            players
        );

        await window.raidRealtime.updateRaidState({
            status: 'ACTIVE',
            bossState: {
                ...this.currentBoss,
                ...bossStats
            },
            startedAt: Date.now()
        });

        this.processCurrentTurn(currentUser);
    }

    /**
     * Processa o turno atual baseado na entidade selecionada pelo TurnEngine
     */
    processCurrentTurn(currentUser) {
        const raidData = window.raidRealtime.currentRaidData;
        if (!raidData || raidData.status === 'VICTORY' || raidData.status === 'DEFEAT') return;

        if (this.selectionTimer) {
            clearInterval(this.selectionTimer);
            this.selectionTimer = null;
        }

        if (!this.activeTurnEntity) {
            this.activeTurnEntity = this.turnEngine.getNextTurn();
        }

        const timeline = this.turnEngine.previewTimeline(5);
        window.raidUI.renderBattleArena(
            raidData,
            this.currentBoss,
            currentUser,
            this.activeTurnEntity,
            timeline,
            (actionType) => this.handlePlayerAction(actionType, currentUser),
            (reactionType) => this.handleDefensiveReaction(reactionType, currentUser)
        );

        // Se for o turno do Jogador Atual, inicia contagem de 30s para escolher a ação
        const isMyTurn = this.activeTurnEntity && !this.activeTurnEntity.isBoss && this.activeTurnEntity.id === currentUser.uid;
        if (isMyTurn) {
            let selectTimeLeft = typeof RAID_SELECTION_TIMER !== 'undefined' ? RAID_SELECTION_TIMER : 30;
            window.raidUI.updateChallengeTimer(selectTimeLeft);

            this.selectionTimer = setInterval(() => {
                selectTimeLeft--;
                window.raidUI.updateChallengeTimer(selectTimeLeft);

                if (selectTimeLeft <= 0) {
                    clearInterval(this.selectionTimer);
                    this.selectionTimer = null;
                    // Timeout na seleção de ação = turno perdido
                    const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
                    if (heroCard && typeof RaidAnimations !== 'undefined') {
                        RaidAnimations.showFloatingText(heroCard, 'TEMPO ESGOTADO!', 'miss');
                        RaidAnimations.animateMiss(heroCard);
                    }
                    window.raidUI.closeChallengeModal();
                    this.advanceToNextTurn(currentUser);
                }
            }, 1000);
        }

        // Se for o turno do Chefe
        if (this.activeTurnEntity && this.activeTurnEntity.isBoss) {
            if (window.raidRealtime.isHost) {
                this.executeBossTurn(currentUser);
            }
        }
    }

    /**
     * Execução do Turno do Boss (Host autoritativo)
     */
    async executeBossTurn(currentUser) {
        const raidData = window.raidRealtime.currentRaidData;
        const players = raidData.players || [];
        const alive = players.filter(p => p.combatStatus !== 'DOWNED');

        if (alive.length === 0) {
            this.handleDefeat();
            return;
        }

        // Seleciona alvos e tipo de ataque
        const attackPlan = BossAI.decideAttack(this.currentBoss, players);
        this.currentBossAttack = attackPlan;
        this.playerReactions = {};

        // Marca jogadores alvos como TARGETED
        players.forEach(p => {
            if (attackPlan.targetUids.includes(p.uid)) {
                p.combatStatus = 'TARGETED';
            }
        });

        await window.raidRealtime.updateRaidState({
            players,
            status: 'BOSS_TURN'
        });

        if (window.raidAudio) window.raidAudio.playEvent('counter');

        // Janela de Reação Defensiva dos Alvos (15 segundos)
        let reactionTimeLeft = 15;
        this.reactionTimer = setInterval(async () => {
            reactionTimeLeft--;
            if (reactionTimeLeft <= 0) {
                clearInterval(this.reactionTimer);
                this.reactionTimer = null;
                await this.resolveBossAttack(currentUser);
            }
        }, 1000);
    }

    /**
     * Jogador seleciona e resolve sua reação defensiva
     */
    handleDefensiveReaction(reactionType, currentUser) {
        const challenge = this.challengeEngine.startChallenge(
            this.currentChapterId,
            reactionType,
            (seconds) => window.raidUI.updateChallengeTimer(seconds),
            () => {
                // Timeout = MISS
                window.raidUI.closeChallengeModal();
                this.playerReactions[currentUser.uid] = { reaction: reactionType, success: false };
                const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
                RaidAnimations.animateMiss(heroCard);
            }
        );

        window.raidUI.openChallengeModal(challenge, reactionType, (code) => {
            const result = this.challengeEngine.validateSubmission(code);
            const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);

            if (result.success) {
                this.playerReactions[currentUser.uid] = { reaction: reactionType, success: true };
                if (reactionType === 'dodge') {
                    if (window.raidAudio) window.raidAudio.playEvent('dodge');
                    RaidAnimations.showFloatingText(heroCard, 'ESQUIVOU! (0 DANO)', 'heal');
                } else if (reactionType === 'counter') {
                    if (window.raidAudio) window.raidAudio.playEvent('counter');
                    RaidAnimations.showFloatingText(heroCard, 'CONTRA-GOLPE!', 'crit');
                } else if (reactionType === 'item') {
                    RaidAnimations.animateHeal(heroCard, 150);
                }
            } else {
                this.playerReactions[currentUser.uid] = { reaction: reactionType, success: false };
                RaidAnimations.animateMiss(heroCard);
            }
        });
    }

    /**
     * Resolução do Ataque do Boss contra os alvos
     */
    async resolveBossAttack(currentUser) {
        if (this.reactionTimer) {
            clearInterval(this.reactionTimer);
            this.reactionTimer = null;
        }

        const raidData = window.raidRealtime.currentRaidData;
        const players = raidData.players || [];
        const bossArena = document.getElementById('boss-stage-area');
        const targetElements = [];
        const damageAmounts = [];

        for (const p of players) {
            if (this.currentBossAttack && this.currentBossAttack.targetUids.includes(p.uid)) {
                const reaction = this.playerReactions[p.uid];
                let finalDamage = 0;

                const baseDamage = CombatFormulas.calculateDamage(
                    raidData.bossState,
                    p,
                    this.currentBossAttack.multiplier
                ).finalDamage;

                if (reaction && reaction.success) {
                    if (reaction.reaction === 'dodge') {
                        finalDamage = 0; // Esquiva perfeita
                    } else if (reaction.reaction === 'counter') {
                        // Reduz dano recebido e causa contra-ataque no Boss
                        finalDamage = Math.round(baseDamage * 0.40);
                        const counterDmg = CombatFormulas.calculateDamage(p, raidData.bossState, 0.75).finalDamage;
                        raidData.bossState.currentHp = Math.max(0, raidData.bossState.currentHp - counterDmg);
                        p.damageDealt = (p.damageDealt || 0) + counterDmg;
                        p.successfulActions = (p.successfulActions || 0) + 1;
                        RaidAnimations.showFloatingText(bossArena, `-${counterDmg}`, 'crit');
                    } else if (reaction.reaction === 'item') {
                        finalDamage = Math.max(0, baseDamage - 120);
                        p.successfulActions = (p.successfulActions || 0) + 1;
                    }
                } else {
                    finalDamage = baseDamage;
                }

                p.currentHp = Math.max(0, (p.currentHp || 0) - finalDamage);
                p.damageTaken = (p.damageTaken || 0) + finalDamage;

                if (p.currentHp <= 0) {
                    p.combatStatus = 'DOWNED';
                    this.turnEngine.updateEntityStatus(p.uid, 'DOWNED');
                    if (window.raidAudio) window.raidAudio.playEvent('playerDown');
                } else {
                    p.combatStatus = 'ACTIVE';
                }

                const targetEl = document.getElementById(`hero-card-${p.uid}`);
                if (targetEl) {
                    targetElements.push(targetEl);
                    damageAmounts.push(finalDamage);
                }
            } else if (p.combatStatus !== 'DOWNED') {
                p.combatStatus = 'ACTIVE';
            }
        }

        // Executa animações de impacto do Boss
        await RaidAnimations.animateBossAttack(bossArena, targetElements, damageAmounts);

        this.currentBossAttack = null;
        this.playerReactions = {};

        // Checa se o Boss morreu pelo contra-ataque
        if (raidData.bossState.currentHp <= 0) {
            await this.handleVictory();
            return;
        }

        // Checa se todos caíram (Derrota)
        const stillAlive = players.filter(p => p.combatStatus !== 'DOWNED');
        if (stillAlive.length === 0) {
            await this.handleDefeat();
            return;
        }

        await window.raidRealtime.updateRaidState({
            players,
            bossState: raidData.bossState,
            status: 'ACTIVE'
        });

        // Passa o turno para o próximo combatente
        this.activeTurnEntity = this.turnEngine.getNextTurn();
        this.processCurrentTurn(currentUser);
    }

    /**
     * Ação ofensiva / de suporte do jogador em seu turno
     */
    handlePlayerAction(actionType, currentUser) {
        const raidData = window.raidRealtime.currentRaidData;
        const myPlayer = (raidData.players || []).find(p => p.uid === currentUser.uid);
        if (!myPlayer) return;

        // Limpa o timer de seleção de 30s pois a ação foi escolhida
        if (this.selectionTimer) {
            clearInterval(this.selectionTimer);
            this.selectionTimer = null;
        }

        const challenge = this.challengeEngine.startChallenge(
            this.currentChapterId,
            actionType,
            (seconds) => window.raidUI.updateChallengeTimer(seconds),
            () => {
                // Timeout = MISS (2 minutos expirados)
                window.raidUI.closeChallengeModal();
                const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
                RaidAnimations.animateMiss(heroCard);
                this.advanceToNextTurn(currentUser);
            }
        );

        window.raidUI.openChallengeModal(challenge, actionType, async (code) => {
            const result = this.challengeEngine.validateSubmission(code);
            const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
            const bossArena = document.getElementById('boss-stage-area');

            if (result.success) {
                myPlayer.successfulActions = (myPlayer.successfulActions || 0) + 1;

                if (actionType === 'attack') {
                    const dmg = CombatFormulas.calculateDamage(myPlayer, raidData.bossState, 1.0).finalDamage;
                    raidData.bossState.currentHp = Math.max(0, raidData.bossState.currentHp - dmg);
                    myPlayer.damageDealt = (myPlayer.damageDealt || 0) + dmg;

                    await RaidAnimations.animatePlayerAttack(heroCard, bossArena, dmg, false);
                } else if (actionType === 'item') {
                    const heal = CombatFormulas.calculateHeal(myPlayer);
                    myPlayer.currentHp = Math.min(myPlayer.maxHp || 1000, (myPlayer.currentHp || 0) + heal);
                    myPlayer.healingDone = (myPlayer.healingDone || 0) + heal;

                    RaidAnimations.animateHeal(heroCard, heal);
                } else if (actionType === 'revive') {
                    // Revive o primeiro jogador caído
                    const downed = (raidData.players || []).find(p => p.combatStatus === 'DOWNED');
                    if (downed) {
                        const reviveHp = CombatFormulas.calculateReviveHp(downed, myPlayer);
                        downed.currentHp = reviveHp;
                        downed.combatStatus = 'ACTIVE';
                        this.turnEngine.updateEntityStatus(downed.uid, 'ACTIVE');

                        myPlayer.revivesCount = (myPlayer.revivesCount || 0) + 1;
                        myPlayer.healingDone = (myPlayer.healingDone || 0) + reviveHp;

                        const downedEl = document.getElementById(`hero-card-${downed.uid}`);
                        RaidAnimations.animateRevive(downedEl, reviveHp);
                    }
                }

                // Sincroniza estado da sala
                await window.raidRealtime.updateRaidState({
                    players: raidData.players,
                    bossState: raidData.bossState
                });

                // Vitória
                if (raidData.bossState.currentHp <= 0) {
                    await this.handleVictory();
                    return;
                }
            } else {
                RaidAnimations.animateMiss(heroCard);
            }

            window.raidUI.closeChallengeModal();
            this.advanceToNextTurn(currentUser);
        });
    }

    advanceToNextTurn(currentUser) {
        if (this.selectionTimer) {
            clearInterval(this.selectionTimer);
            this.selectionTimer = null;
        }
        this.activeTurnEntity = this.turnEngine.getNextTurn();
        this.processCurrentTurn(currentUser);
    }

    /**
     * Encerramento com Vitória
     */
    async handleVictory() {
        if (window.raidAudio) window.raidAudio.playEvent('bossDefeat');
        await window.raidRealtime.updateRaidState({ status: 'VICTORY' });
    }

    /**
     * Encerramento com Derrota
     */
    async handleDefeat() {
        await window.raidRealtime.updateRaidState({ status: 'DEFEAT' });
    }

    /**
     * Resgata recompensas de vitória e persiste no perfil do jogador
     */
    async claimRewardsAndExit(baseXp, baseTokens, boss, currentUser) {
        const engine = (typeof app !== 'undefined' && app.engine) || window.engine;
        if (engine && engine.addXp && engine.addTokens) {
            engine.addXp(baseXp);
            engine.addTokens(baseTokens);

            // Marca boss derrotado no estado local
            if (!engine.state.bossesDefeated) engine.state.bossesDefeated = {};
            engine.state.bossesDefeated[boss.id] = {
                completedAt: Date.now(),
                chapterId: boss.chapterId
            };
            engine.save();
        }

        // Salva histórico da raid se Firebase estiver ativo
        if (typeof fbDB !== 'undefined' && currentUser && currentUser.uid) {
            try {
                await fbDB.collection('raid_history').add({
                    bossId: boss.id,
                    chapterId: boss.chapterId,
                    userId: currentUser.uid,
                    xpEarned: baseXp,
                    tokensEarned: baseTokens,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (e) {}
        }

        if (typeof app !== 'undefined' && app.ui) {
            app.ui.showToast(`+${baseXp} XP e +${baseTokens} Tokens da Guilda resgatados!`, 'success');
            app.ui.showScreen('dashboard');
            if (app.ui.renderDashboard) app.ui.renderDashboard();
        }
    }

    async leaveRaid(uid) {
        await window.raidRealtime.leaveRaid(uid);
        if (typeof app !== 'undefined' && app.ui && app.ui.showScreen) {
            app.ui.showScreen('dashboard');
            if (app.ui.renderDashboard) app.ui.renderDashboard();
        }
    }
}

window.BossRaidManager = BossRaidManager;
window.bossRaidManager = new BossRaidManager();
