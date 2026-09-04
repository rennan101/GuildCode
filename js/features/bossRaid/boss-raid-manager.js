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

        // Reseta estado da sessão anterior
        this._countdownStarted = false;
        this.activeTurnEntity = null;
        this.turnEngine = new TurnEngine();

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

        // Obtenção da Party Atual (inclui busca no Firestore se o cache estiver vazio)
        let currentParty = null;
        if (typeof partyManager !== 'undefined') {
            try {
                currentParty = await partyManager.getUserParty();
            } catch (e) {
                currentParty = partyManager.currentParty || null;
            }
        }

        // Obtenção do código da Guilda
        let guildCode = null;
        if (typeof authManager !== 'undefined') {
            guildCode = authManager.getClassCode();
            if (!guildCode && authManager.getEffectiveGuildCode) {
                try {
                    guildCode = await authManager.getEffectiveGuildCode();
                } catch (e) {}
            }
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
            this.currentBoss,
            guildCode
        );

        // Se criou a sala como Host, envia mensagem automática no chat da Party e da Guilda
        if (window.raidRealtime.isHost && typeof chatManager !== 'undefined') {
            const bossTitle = (this.currentBoss && this.currentBoss.name) || `Boss Cap. ${this.currentChapterId}`;
            const alertText = `⚔️ [RAID LOBBY] ${currentPlayerData.displayName} abriu uma sala contra "${bossTitle}"! Entrem na Boss Raid do Cap. ${this.currentChapterId} para lutar juntos!`;
            
            try {
                // Envia no chat da Party se estiver em party
                if (currentParty && currentParty.id) {
                    await chatManager.sendMessage(alertText, 'party');
                }
                // Envia no chat da Guilda para que membros saibam da Raid aberta
                if (guildCode) {
                    await chatManager.sendMessage(alertText, 'guild');
                }
            } catch (e) {
                console.warn('[BossRaidManager] Falha ao enviar aviso no chat:', e);
            }
        }

        this.handleRaidDataUpdate(raidData, currentUser);
    }

    /**
     * Trata as atualizações recebidas da sala de Raid (Firestore ou Local)
     */
    handleRaidDataUpdate(raidData, currentUser) {
        if (!raidData) return;

        if (raidData.status === 'LOBBY') {
            this._countdownStarted = false;
            window.raidUI.renderLobby(
                raidData,
                this.currentBoss,
                currentUser,
                () => window.raidRealtime.toggleReady(currentUser.uid),
                (avatarId, avData) => this.handleAvatarChange(currentUser.uid, avatarId, avData),
                () => this.leaveRaid(currentUser.uid)
            );

            // Verifica se todos estão prontos para disparar contagem (somente o Host inicia no Firestore)
            const players = raidData.players || [];
            if (players.length > 0 && players.every(p => p.ready)) {
                if (window.raidRealtime.isHost && !this._countdownStarted) {
                    this._countdownStarted = true;
                    this.startCountdown(currentUser);
                }
            }
        } else if (raidData.status === 'COUNTDOWN') {
            // Contagem sincronizada para não-hosts
            if (!this._countdownStarted && !window.raidRealtime.isHost) {
                this._countdownStarted = true;
                const startTime = raidData.countdownStartedAt || Date.now();
                const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
                let count = Math.max(0, 5 - elapsedSec);

                if (window.raidUI && typeof window.raidUI.showCountdown === 'function') {
                    window.raidUI.showCountdown(count);
                }

                if (this._clientCountdownInterval) clearInterval(this._clientCountdownInterval);
                this._clientCountdownInterval = setInterval(() => {
                    count--;
                    if (window.raidUI && typeof window.raidUI.showCountdown === 'function') {
                        window.raidUI.showCountdown(count);
                    }
                    if (count <= 0) {
                        clearInterval(this._clientCountdownInterval);
                        this._clientCountdownInterval = null;
                    }
                }, 1000);
            }
        } else if (raidData.status === 'ACTIVE' || raidData.status === 'PARTY_PHASE' || raidData.status === 'BOSS_PHASE' || raidData.status === 'PLAYER_TURN' || raidData.status === 'BOSS_TURN') {
            // Limpa qualquer overlay ou timer de countdown pendente
            if (this._clientCountdownInterval) {
                clearInterval(this._clientCountdownInterval);
                this._clientCountdownInterval = null;
            }
            const existingOverlay = document.getElementById('raid-countdown-overlay');
            if (existingOverlay && existingOverlay.parentNode) {
                existingOverlay.parentNode.removeChild(existingOverlay);
            }

            // Inicializa turnEngine se ainda não estiver pronto
            if (!this.turnEngine.isInitialized) {
                const players = raidData.players || [];
                this.turnEngine.init(
                    { id: (raidData.bossState && raidData.bossState.id) || this.currentBoss.id, name: (raidData.bossState && raidData.bossState.name) || this.currentBoss.name },
                    players
                );
                if (window.raidAudio) window.raidAudio.startBattleMusic();
            }

            const currentPhaseState = this.turnEngine.getCurrentPhaseState();
            const isPartyPhase = raidData.status === 'PARTY_PHASE' || raidData.status === 'ACTIVE' || (currentPhaseState && currentPhaseState.isPartyPhase);
            const isBossPhase = raidData.status === 'BOSS_PHASE' || (currentPhaseState && currentPhaseState.isBossPhase);

            const timeline = this.turnEngine.previewTimeline(5);
            window.raidUI.renderBattleArena(
                raidData,
                this.currentBoss,
                currentUser,
                { isPartyPhase, isBossPhase, round: raidData.round || this.turnEngine.roundCount },
                timeline,
                (actionType) => this.handlePlayerAction(actionType, currentUser),
                (reactionType) => this.handleDefensiveReaction(reactionType, currentUser),
                () => this.handleSurrender(currentUser)
            );

            // Se for PARTY_PHASE e o timer não estiver rodando localmente, gerencia a contagem da rodada
            if (isPartyPhase && !this.partyPhaseTimer && !this.selectionTimer) {
                this.startPartyPhaseTimer(currentUser);
            }
        } else if (raidData.status === 'VICTORY') {
            if (window.raidAudio) window.raidAudio.stopBattleMusic();
            if (window.raidAudio) window.raidAudio.playEvent('bossDefeat');
            window.raidUI.renderVictoryScreen(
                raidData,
                this.currentBoss,
                (xp, tokens, boss) => this.claimRewardsAndExit(xp, tokens, boss, currentUser)
            );
        } else if (raidData.status === 'DEFEAT') {
            if (window.raidAudio) window.raidAudio.stopBattleMusic();
            window.raidUI.renderDefeatScreen(
                raidData,
                this.currentBoss,
                () => this.openLobby(this.currentChapterId),
                () => this.leaveRaid(currentUser.uid)
            );
        }
    }

    async handleAvatarChange(uid, avatarId, avatarData) {
        const engine = (typeof app !== 'undefined' && app.engine) || window.engine;
        const playerState = (engine && engine.state) || {};
        const avData = avatarData || (typeof AVATAR_SKILLS_DATA !== 'undefined' ? AVATAR_SKILLS_DATA[avatarId] : null);
        const combatStats = CombatFormulas.calculatePlayerStats(playerState, avData);
        await window.raidRealtime.updatePlayerAvatar(uid, avatarId, avData, combatStats);
    }

    /**
     * Inicia a contagem regressiva sincronizada 5..4..3..2..1
     */
    startCountdown(currentUser) {
        window.raidRealtime.updateRaidState({ 
            status: 'COUNTDOWN',
            countdownStartedAt: Date.now()
        });

        let count = 5;
        if (window.raidUI && typeof window.raidUI.showCountdown === 'function') {
            window.raidUI.showCountdown(count);
        }

        const interval = setInterval(() => {
            count--;
            if (window.raidUI && typeof window.raidUI.showCountdown === 'function') {
                window.raidUI.showCountdown(count);
            }
            if (count <= 0) {
                clearInterval(interval);
                this.startBattle(currentUser);
            }
        }, 1000);
    }

    /**
     * Inicia o combate simultâneo (Host autoritativo)
     */
    async startBattle(currentUser) {
        const raidData = window.raidRealtime.currentRaidData;
        const players = raidData.players || [];

        // Calcula stats escalonados do Boss
        const avgLvl = players.reduce((acc, p) => acc + (p.level || 1), 0) / Math.max(1, players.length);
        const bossStats = BossDataManager.calculateBossStats(this.currentBoss, players.length, avgLvl);

        // Inicializa o motor de fases simultâneas
        this.turnEngine.init(
            { id: this.currentBoss.id, name: this.currentBoss.name },
            players
        );

        if (window.raidAudio) window.raidAudio.startBattleMusic();

        await window.raidRealtime.updateRaidState({
            status: 'PARTY_PHASE',
            round: 1,
            bossState: {
                ...this.currentBoss,
                ...bossStats
            },
            startedAt: Date.now()
        });

        this.startPartyPhase(currentUser);
    }

    /**
     * Inicia a Fase da Party (todos agem juntos)
     */
    async startPartyPhase(currentUser) {
        const raidData = window.raidRealtime.currentRaidData;
        if (!raidData || raidData.status === 'VICTORY' || raidData.status === 'DEFEAT') return;

        this.clearAllTimers();
        this.playerReactions = {};
        this.hasActedInCurrentPartyPhase = false;

        // Reseta status de alvo e flags de ação
        (raidData.players || []).forEach(p => {
            if (p.combatStatus !== 'DOWNED') {
                p.combatStatus = 'ACTIVE';
            }
        });

        if (window.raidRealtime.isHost) {
            await window.raidRealtime.updateRaidState({
                status: 'PARTY_PHASE',
                round: this.turnEngine.roundCount,
                players: raidData.players
            });
        }

        const timeline = this.turnEngine.previewTimeline(5);
        window.raidUI.renderBattleArena(
            raidData,
            this.currentBoss,
            currentUser,
            { isPartyPhase: true, isBossPhase: false, round: this.turnEngine.roundCount },
            timeline,
            (actionType) => this.handlePlayerAction(actionType, currentUser),
            (reactionType) => this.handleDefensiveReaction(reactionType, currentUser),
            () => this.handleSurrender(currentUser)
        );

        this.startPartyPhaseTimer(currentUser);
    }

    /**
     * Timer compartilhado para a fase da Party
     */
    startPartyPhaseTimer(currentUser) {
        this.clearAllTimers();

        let phaseTimeLeft = typeof RAID_SELECTION_TIMER !== 'undefined' ? RAID_SELECTION_TIMER : 45;
        window.raidUI.updateChallengeTimer(phaseTimeLeft);

        this.partyPhaseTimer = setInterval(async () => {
            phaseTimeLeft--;
            window.raidUI.updateChallengeTimer(phaseTimeLeft);

            if (phaseTimeLeft <= 0) {
                this.clearAllTimers();
                // Encerra modal se o jogador ainda estava programando
                window.raidUI.closeChallengeModal();
                
                // Se o jogador não agiu antes de zerar o tempo, marca miss
                if (!this.hasActedInCurrentPartyPhase) {
                    this.hasActedInCurrentPartyPhase = true;
                    this.turnEngine.markPlayerActed(currentUser.uid);
                    const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
                    if (heroCard) RaidAnimations.animateMiss(heroCard);
                }

                if (window.raidRealtime.isHost) {
                    await this.startBossPhase(currentUser);
                }
            }
        }, 1000);
    }

    /**
     * Inicia a Fase do Boss (Ataque + Reações Defensivas de Todos)
     */
    async startBossPhase(currentUser) {
        this.clearAllTimers();
        this.turnEngine.advancePhase();

        const raidData = window.raidRealtime.currentRaidData;
        const players = raidData.players || [];
        const alive = players.filter(p => p.combatStatus !== 'DOWNED');

        if (alive.length === 0) {
            this.handleDefeat();
            return;
        }

        // Host decide o ataque do boss (pode ser single, multi ou AOE)
        const attackPlan = BossAI.decideAttack(this.currentBoss, players);
        this.currentBossAttack = attackPlan;
        this.playerReactions = {};

        // Marca jogadores como TARGETED
        players.forEach(p => {
            if (attackPlan && attackPlan.targetUids && attackPlan.targetUids.includes(p.uid)) {
                p.combatStatus = 'TARGETED';
            } else if (p.combatStatus !== 'DOWNED') {
                p.combatStatus = 'ACTIVE';
            }
        });

        if (window.raidRealtime.isHost) {
            await window.raidRealtime.updateRaidState({
                players,
                status: 'BOSS_PHASE'
            });
        }

        if (window.raidAudio) window.raidAudio.playEvent('counter');

        const timeline = this.turnEngine.previewTimeline(5);
        window.raidUI.renderBattleArena(
            raidData,
            this.currentBoss,
            currentUser,
            { isPartyPhase: false, isBossPhase: true, round: this.turnEngine.roundCount },
            timeline,
            (actionType) => this.handlePlayerAction(actionType, currentUser),
            (reactionType) => this.handleDefensiveReaction(reactionType, currentUser),
            () => this.handleSurrender(currentUser)
        );

        // Janela de Reação Defensiva Simultânea (30s)
        let reactionTimeLeft = typeof RAID_SELECTION_TIMER !== 'undefined' ? RAID_SELECTION_TIMER : 30;
        window.raidUI.updateChallengeTimer(reactionTimeLeft);

        this.reactionTimer = setInterval(async () => {
            reactionTimeLeft--;
            window.raidUI.updateChallengeTimer(reactionTimeLeft);

            if (reactionTimeLeft <= 0) {
                this.clearAllTimers();
                window.raidUI.closeChallengeModal();
                if (window.raidRealtime.isHost) {
                    await this.resolveBossAttack(currentUser);
                }
            }
        }, 1000);
    }

    /**
     * Jogador seleciona e resolve sua reação defensiva na Fase do Boss
     */
    handleDefensiveReaction(reactionType, currentUser) {
        if (this.reactionTimer) {
            clearInterval(this.reactionTimer);
            this.reactionTimer = null;
        }

        const challenge = this.challengeEngine.startChallenge(
            this.currentChapterId,
            reactionType,
            (seconds) => window.raidUI.updateChallengeTimer(seconds),
            async () => {
                // Timeout = MISS
                window.raidUI.closeChallengeModal();
                this.playerReactions[currentUser.uid] = { reaction: reactionType, success: false };
                const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
                if (heroCard) RaidAnimations.animateMiss(heroCard);
                this.checkAllReactionsDone(currentUser);
            }
        );

        window.raidUI.openChallengeModal(challenge, reactionType, async (code) => {
            const result = this.challengeEngine.validateSubmission(code);
            const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);

            if (result.success) {
                this.playerReactions[currentUser.uid] = { reaction: reactionType, success: true };
                if (reactionType === 'dodge') {
                    if (window.raidAudio) window.raidAudio.playEvent('dodge');
                    if (heroCard) RaidAnimations.showFloatingText(heroCard, 'ESQUIVOU! (0 DANO)', 'heal');
                } else if (reactionType === 'counter') {
                    if (window.raidAudio) window.raidAudio.playEvent('counter');
                    if (heroCard) RaidAnimations.showFloatingText(heroCard, 'CONTRA-GOLPE!', 'crit');
                } else if (reactionType === 'item') {
                    if (heroCard) RaidAnimations.animateHeal(heroCard, 150);
                }
            } else {
                this.playerReactions[currentUser.uid] = { reaction: reactionType, success: false };
                if (heroCard) RaidAnimations.animateMiss(heroCard);
            }

            window.raidUI.closeChallengeModal();
            this.checkAllReactionsDone(currentUser);
        });
    }

    async checkAllReactionsDone(currentUser) {
        const raidData = window.raidRealtime.currentRaidData;
        const targets = this.currentBossAttack ? this.currentBossAttack.targetUids : [];
        const allReacted = targets.every(uid => !!this.playerReactions[uid]);

        if (allReacted || !window.raidRealtime.isHost) {
            if (window.raidRealtime.isHost) {
                this.clearAllTimers();
                await this.resolveBossAttack(currentUser);
            }
        }
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
        const counterAttacks = [];

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
                        // Anula o dano e devolve dano crítico duplo
                        finalDamage = 0;
                        const subMods = CombatFormulas.getSubclassModifiers(p.subclass);
                        const counterMultiplier = (subMods.counterMultiplier || 1.0) * 2.0;
                        const counterDmg = CombatFormulas.calculateDamage(p, raidData.bossState, counterMultiplier).finalDamage;
                        raidData.bossState.currentHp = Math.max(0, raidData.bossState.currentHp - counterDmg);
                        p.damageDealt = (p.damageDealt || 0) + counterDmg;
                        p.successfulActions = (p.successfulActions || 0) + 1;
                        counterAttacks.push({ player: p, damage: counterDmg });
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

        // Animações de impacto do Boss
        if (targetElements.length > 0) {
            await RaidAnimations.animateBossAttack(bossArena, targetElements, damageAmounts);
        }

        // Animações de contra-ataque
        for (const ca of counterAttacks) {
            const heroEl = document.getElementById(`hero-card-${ca.player.uid}`);
            await RaidAnimations.animatePlayerAttack(heroEl, bossArena, ca.damage, true);
        }

        this.currentBossAttack = null;
        this.playerReactions = {};

        // Checa Vitória por contra-ataque
        if (raidData.bossState.currentHp <= 0) {
            await this.handleVictory();
            return;
        }

        // Checa Derrota
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

        // Avança para a próxima Fase da Party (próxima rodada)
        this.turnEngine.advancePhase();
        this.startPartyPhase(currentUser);
    }

    /**
     * Ação ofensiva / de suporte do jogador na Fase da Party
     */
    handlePlayerAction(actionType, currentUser) {
        if (this.hasActedInCurrentPartyPhase) return;

        const raidData = window.raidRealtime.currentRaidData;
        const myPlayer = (raidData.players || []).find(p => p.uid === currentUser.uid);
        if (!myPlayer || myPlayer.combatStatus === 'DOWNED') return;

        if (this.partyPhaseTimer) {
            clearInterval(this.partyPhaseTimer);
            this.partyPhaseTimer = null;
        }

        const challenge = this.challengeEngine.startChallenge(
            this.currentChapterId,
            actionType,
            (seconds) => window.raidUI.updateChallengeTimer(seconds),
            () => {
                // Timeout = MISS
                window.raidUI.closeChallengeModal();
                const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
                if (heroCard) RaidAnimations.animateMiss(heroCard);
                this.hasActedInCurrentPartyPhase = true;
                this.turnEngine.markPlayerActed(currentUser.uid);
                this.checkAllPartyActionsDone(currentUser);
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
                    if (typeof app !== 'undefined' && app.engine && app.engine.state.raidInventory) {
                        if (app.engine.state.raidInventory.soloPotions > 0) {
                            app.engine.state.raidInventory.soloPotions--;
                            app.engine.save();
                        }
                    }

                    const heal = CombatFormulas.calculateHeal(myPlayer);
                    myPlayer.currentHp = Math.min(myPlayer.maxHp || 600, (myPlayer.currentHp || 0) + heal);
                    myPlayer.healingDone = (myPlayer.healingDone || 0) + heal;

                    if (heroCard) RaidAnimations.animateHeal(heroCard, heal);
                } else if (actionType === 'item_group') {
                    if (typeof app !== 'undefined' && app.engine && app.engine.state.raidInventory) {
                        if (app.engine.state.raidInventory.groupPotions > 0) {
                            app.engine.state.raidInventory.groupPotions--;
                            app.engine.save();
                        }
                    }

                    (raidData.players || []).forEach(player => {
                        if (player.combatStatus !== 'DOWNED') {
                            const heal = CombatFormulas.calculateGroupHeal(player, myPlayer);
                            player.currentHp = Math.min(player.maxHp || 600, (player.currentHp || 0) + heal);
                            myPlayer.healingDone = (myPlayer.healingDone || 0) + heal;
                            const card = document.getElementById(`hero-card-${player.uid}`);
                            if (card) RaidAnimations.animateHeal(card, heal);
                        }
                    });
                } else if (actionType === 'revive') {
                    const downed = (raidData.players || []).find(p => p.combatStatus === 'DOWNED');
                    if (downed) {
                        const reviveHp = CombatFormulas.calculateReviveHp(downed, myPlayer);
                        downed.currentHp = reviveHp;
                        downed.combatStatus = 'ACTIVE';
                        this.turnEngine.updateEntityStatus(downed.uid, 'ACTIVE');

                        myPlayer.revivesCount = (myPlayer.revivesCount || 0) + 1;
                        myPlayer.healingDone = (myPlayer.healingDone || 0) + reviveHp;

                        const downedEl = document.getElementById(`hero-card-${downed.uid}`);
                        if (downedEl) RaidAnimations.animateRevive(downedEl, reviveHp);
                    }
                }

                // Sincroniza estado da sala
                await window.raidRealtime.updateRaidState({
                    players: raidData.players,
                    bossState: raidData.bossState
                });

                // Checa Vitória
                if (raidData.bossState.currentHp <= 0) {
                    await this.handleVictory();
                    return;
                }
            } else {
                if (heroCard) RaidAnimations.animateMiss(heroCard);
            }

            this.hasActedInCurrentPartyPhase = true;
            this.turnEngine.markPlayerActed(currentUser.uid);
            window.raidUI.closeChallengeModal();
            this.checkAllPartyActionsDone(currentUser);
        });
    }

    async checkAllPartyActionsDone(currentUser) {
        if (this.turnEngine.haveAllAlivePlayersActed()) {
            if (window.raidRealtime.isHost) {
                if (this.partyPhaseTimer) {
                    clearInterval(this.partyPhaseTimer);
                    this.partyPhaseTimer = null;
                }
                await this.startBossPhase(currentUser);
            }
        }
    }

    clearAllTimers() {
        if (this.partyPhaseTimer) {
            clearInterval(this.partyPhaseTimer);
            this.partyPhaseTimer = null;
        }
        if (this.reactionTimer) {
            clearInterval(this.reactionTimer);
            this.reactionTimer = null;
        }
        if (this.selectionTimer) {
            clearInterval(this.selectionTimer);
            this.selectionTimer = null;
        }
        if (this.challengeEngine) {
            this.challengeEngine.stopTimer();
        }
    }


    /**
     * Encerramento com Vitória
     */
    async handleVictory() {
        // Para a música de batalha antes de tocar o evento de vitória
        if (window.raidAudio) window.raidAudio.stopBattleMusic();
        if (window.raidAudio) window.raidAudio.playEvent('bossDefeat');
        await window.raidRealtime.updateRaidState({ status: 'VICTORY' });
    }

    /**
     * Encerramento com Derrota
     */
    async handleDefeat() {
        if (window.raidAudio) window.raidAudio.stopBattleMusic();
        await window.raidRealtime.updateRaidState({ status: 'DEFEAT' });
    }

    /**
     * Desistência voluntária da Boss Battle Raid
     */
    async handleSurrender(currentUser) {
        if (this.selectionTimer) {
            clearInterval(this.selectionTimer);
            this.selectionTimer = null;
        }
        if (this.challengeEngine && this.challengeEngine.timer) {
            clearInterval(this.challengeEngine.timer);
            this.challengeEngine.timer = null;
        }

        if (window.raidUI && window.raidUI.closeChallengeModal) {
            window.raidUI.closeChallengeModal();
        }

        if (window.raidAudio) {
            window.raidAudio.stopBattleMusic();
            window.raidAudio.playTone(220, 0.3, 'sawtooth', 0.2);
        }

        if (currentUser && currentUser.uid) {
            await this.leaveRaid(currentUser.uid);
        } else if (typeof app !== 'undefined' && app.ui && app.ui.showScreen) {
            app.ui.showScreen('dashboard');
            if (app.ui.renderDashboard) app.ui.renderDashboard();
        }

        if (typeof app !== 'undefined' && app.ui && app.ui.showToast) {
            app.ui.showToast('Você recuou e desistiu da Boss Battle Raid.', 'warning');
        }
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
        if (window.raidAudio) {
            window.raidAudio.stopBattleMusic();
        }
        await window.raidRealtime.leaveRaid(uid);
        if (typeof app !== 'undefined' && app.ui && app.ui.showScreen) {
            app.ui.showScreen('dashboard');
            if (app.ui.renderDashboard) app.ui.renderDashboard();
        }
    }
}

window.BossRaidManager = BossRaidManager;
window.bossRaidManager = new BossRaidManager();
