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
        this.lastSyncedRound = 0;
        this.lastSyncedPhase = null;
        this._animatedPartyActions = {}; // round_uid -> true
        this._animatedPlayerReactions = {}; // round_uid -> true
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
        const avatarPath = (typeof authManager !== 'undefined' && authManager.getPhotoURL)
            ? authManager.getPhotoURL()
            : `assets/avatars/avatar_${avatarId}.png`;

        const avatarStats = (engine && typeof engine.getAvatarStatPoints === 'function')
            ? engine.getAvatarStatPoints(avatarId)
            : { hp: 0, atk: 0, def: 0, spd: 0 };
        const artifactBonuses = (engine && typeof engine.getAvatarArtifactBonuses === 'function')
            ? engine.getAvatarArtifactBonuses(avatarId)
            : null;

        const currentPlayerData = {
            uid: currentUser.uid,
            displayName: currentUser.displayName || playerState.name || 'Codemancer',
            photoURL: avatarPath,
            avatarId: avatarId,
            level: playerState.level || 1,
            codePower: playerState.codePower || 1000,
            subclass: playerState.subclass || 'hardcoder',
            avatarStats: avatarStats,
            artifactBonuses: artifactBonuses,
            ...combatStats
        };

        this._isBattleFinished = false;

        // Muda tela para Boss Raid IMEDIATAMENTE (sem travar à espera do Firestore)
        if (typeof app !== 'undefined' && app.ui && app.ui.showScreen) {
            app.ui.showScreen('boss-raid');
        }

        // Renderiza o Lobby imediatamente com o jogador atual em modo preliminar
        const initialPlayers = [{
            ...currentPlayerData,
            ready: false
        }];
        const preliminaryRaidData = {
            id: `raid_loading_${this.currentChapterId}`,
            status: 'LOBBY',
            chapterId: this.currentChapterId,
            bossState: {
                id: this.currentBoss.id,
                name: this.currentBoss.name,
                currentHp: this.currentBoss.maxHp,
                maxHp: this.currentBoss.maxHp
            },
            players: initialPlayers
        };

        if (window.raidUI && typeof window.raidUI.renderLobby === 'function') {
            window.raidUI.renderLobby(
                preliminaryRaidData,
                this.currentBoss,
                currentUser,
                () => window.raidRealtime.toggleReady(currentUser.uid),
                (avId, avData) => this.handleAvatarChange(currentUser.uid, avId, avData),
                () => this.leaveRaid(currentUser.uid)
            );
        }

        // Obtenção da Party Atual (inclui busca no Firestore se o cache estiver vazio)
        let currentParty = null;
        if (typeof partyManager !== 'undefined') {
            try {
                currentParty = partyManager.currentParty || await partyManager.getUserParty();
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

        // Registra callback de sincronização
        window.raidRealtime.onRaidUpdateCallback = (raidData) => this.handleRaidDataUpdate(raidData, currentUser);

        // Conecta ou cria sala de forma resiliente
        try {
            const raidData = await window.raidRealtime.joinOrCreateRaidRoom(
                currentParty,
                this.currentChapterId,
                currentPlayerData,
                this.currentBoss,
                guildCode
            );

            this.handleRaidDataUpdate(raidData, currentUser);
        } catch (err) {
            console.error('[BossRaidManager] Erro ao sincronizar sala com Firestore, usando modo local:', err);
            this.handleRaidDataUpdate(preliminaryRaidData, currentUser);
        }
    }

    /**
     * Trata as atualizações recebidas da sala de Raid (Firestore ou Local)
     */
    handleRaidDataUpdate(raidData, currentUser) {
        if (!raidData) return;

        // Se a batalha já venceu ou o boss foi derrotado, garante encerramento imediato com vitória
        if (raidData.status === 'VICTORY' || (raidData.bossState && raidData.bossState.currentHp <= 0)) {
            if (this.clearAllTimers) this.clearAllTimers();
            if (window.raidUI && window.raidUI.closeChallengeModal) window.raidUI.closeChallengeModal();
            this._isBattleFinished = true;
            if (window.raidAudio) {
                window.raidAudio.stopBattleMusic();
                window.raidAudio.playEvent('bossDefeat');
            }
            window.raidUI.renderVictoryScreen(
                raidData,
                this.currentBoss,
                (xp, tokens, boss) => this.claimRewardsAndExit(xp, tokens, boss, currentUser)
            );
            return;
        }

        if (raidData.status === 'LOBBY') {
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
            const allReady = players.length > 0 && players.every(p => p.ready);

            // Só reseta o flag de contagem se houver jogadores que ainda não estão prontos,
            // evitando que um snapshot tardio de LOBBY cancele a contagem já iniciada.
            if (!allReady) {
                this._countdownStarted = false;
            }

            if (allReady) {
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

            const isPartyPhase = raidData.status === 'PARTY_PHASE' || raidData.status === 'ACTIVE';
            const isBossPhase = raidData.status === 'BOSS_PHASE';
            const currentRound = raidData.round || 1;

            // Normaliza a fase para evitar falso positivo entre 'ACTIVE' e 'PARTY_PHASE'
            const currentPhaseKey = isPartyPhase ? 'PARTY_PHASE' : (isBossPhase ? 'BOSS_PHASE' : raidData.status);

            // Detecta transição de Fase ou Rodada para sincronizar estado local
            const phaseChanged = this.lastSyncedPhase !== currentPhaseKey;
            const roundChanged = this.lastSyncedRound !== currentRound;

            if (phaseChanged || roundChanged) {
                this.lastSyncedPhase = currentPhaseKey;
                this.lastSyncedRound = currentRound;
                this.clearAllTimers();
                window.raidUI.closeChallengeModal();

                if (isPartyPhase) {
                    this.hasActedInCurrentPartyPhase = false;
                    this.turnEngine.currentPhase = 'PARTY';
                    this.turnEngine.roundCount = currentRound;
                    this.turnEngine.resetActionsForNewRound();
                    this.playerReactions = {};
                } else if (isBossPhase) {
                    this.turnEngine.currentPhase = 'BOSS';
                    this.hasActedInCurrentPartyPhase = false;
                }
            }

            // Sincroniza quem já agiu na fase da Party a partir dos dados do Firestore/Realtime
            if (isPartyPhase) {
                const partyActions = raidData.partyActions || {};
                (raidData.players || []).forEach(p => {
                    const action = partyActions[p.uid];
                    if (action) {
                        this.turnEngine.markPlayerActed(p.uid);
                        if (p.uid === currentUser.uid) {
                            this.hasActedInCurrentPartyPhase = true;
                        }

                        // Animação de companheiro em tempo real para os outros jogadores da party
                        const actionKey = `${currentRound}_${p.uid}`;
                        if (!this._animatedPartyActions[actionKey]) {
                            this._animatedPartyActions[actionKey] = true;
                            // Se for o próprio jogador, a animação já tocou no submit local imediato
                            if (p.uid !== currentUser.uid) {
                                const heroCard = document.getElementById(`hero-card-${p.uid}`);
                                const bossArena = document.getElementById('boss-stage-area');
                                if (action.success) {
                                    if (action.actionType === 'attack') {
                                        const dmg = CombatFormulas.calculateDamage(p, raidData.bossState || this.currentBoss).finalDamage;
                                        if (heroCard && bossArena) {
                                            RaidAnimations.animatePlayerAttack(heroCard, bossArena, dmg, false);
                                        }
                                    } else if (action.actionType === 'item' || action.actionType === 'item_group') {
                                        if (heroCard) {
                                            const heal = CombatFormulas.calculateHeal(p);
                                            RaidAnimations.animateHeal(heroCard, heal);
                                        }
                                    } else if (action.actionType === 'revive') {
                                        const downed = (raidData.players || []).find(pl => pl.combatStatus === 'DOWNED' || (pl.currentHp || 0) <= 0);
                                        const downedCard = downed ? document.getElementById(`hero-card-${downed.uid}`) : heroCard;
                                        if (downedCard) {
                                            RaidAnimations.animateRevive(downedCard, 300);
                                        }
                                    }
                                } else {
                                    if (heroCard) RaidAnimations.animateMiss(heroCard);
                                }
                            }
                        }
                    }
                });

                // Se todos os jogadores ativos já agiram, o Host avança o turno imediatamente
                if (window.raidRealtime.isHost) {
                    this.checkAllPartyActionsDone(currentUser);
                }
            } else if (isBossPhase) {
                // Sincroniza reações do Boss Phase
                const playerReactions = raidData.playerReactions || {};
                Object.assign(this.playerReactions, playerReactions);

                // Anima reações dos aliados na fase do Boss
                (raidData.players || []).forEach(p => {
                    const reaction = playerReactions[p.uid];
                    if (reaction) {
                        const reactionKey = `${currentRound}_boss_${p.uid}`;
                        if (!this._animatedPlayerReactions[reactionKey]) {
                            this._animatedPlayerReactions[reactionKey] = true;
                            if (p.uid !== currentUser.uid) {
                                const heroCard = document.getElementById(`hero-card-${p.uid}`);
                                if (heroCard) {
                                    if (reaction.success) {
                                        if (reaction.reaction === 'dodge') {
                                            RaidAnimations.showFloatingText(heroCard, 'ESQUIVOU! (0 DANO)', 'heal');
                                            RaidAnimations.spawnImpactParticles(heroCard, 'miss', 8);
                                        } else if (reaction.reaction === 'counter') {
                                            RaidAnimations.showFloatingText(heroCard, 'CONTRA-GOLPE!', 'crit');
                                            RaidAnimations.spawnImpactParticles(heroCard, 'crit', 12);
                                        } else if (reaction.reaction === 'item') {
                                            RaidAnimations.animateHeal(heroCard, 150);
                                        }
                                    } else {
                                        RaidAnimations.animateMiss(heroCard);
                                    }
                                }
                            }
                        }
                    }
                });

                // Se todos os alvos responderam no Boss Phase, o Host avança imediatamente
                if (window.raidRealtime.isHost) {
                    this.checkAllReactionsDone(currentUser);
                }
            }

            const timeline = this.turnEngine.previewTimeline(5);
            window.raidUI.renderBattleArena(
                raidData,
                this.currentBoss,
                currentUser,
                { isPartyPhase, isBossPhase, round: currentRound },
                timeline,
                (actionType) => this.handlePlayerAction(actionType, currentUser),
                (reactionType) => this.handleDefensiveReaction(reactionType, currentUser),
                () => this.handleSurrender(currentUser)
            );

            // Gerencia os temporizadores locais sincronizados de cada fase
            if (isPartyPhase && !this.partyPhaseTimer) {
                this.startPartyPhaseTimer(currentUser);
            } else if (isBossPhase && !this.reactionTimer) {
                this.startBossPhaseTimer(currentUser);
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
        
        // Validação de segurança: apenas avatares desbloqueados, professor ou avatar inicial '02'
        const isTeacher = (typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin()));
        const unlockedList = (playerState.unlockedAvatars) 
            || (window.gameProgress && window.gameProgress.unlockedAvatars) 
            || ['02'];

        const isAllowed = isTeacher || avatarId === '02' || unlockedList.includes(avatarId);
        if (!isAllowed) {
            if (typeof app !== 'undefined' && app.ui && app.ui.showToast) {
                app.ui.showToast('Você não possui este personagem desbloqueado!', 'warning');
            }
            return;
        }

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
            partyActions: {},
            playerReactions: {},
            phaseStartedAt: Date.now(),
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
        this._isStartingBossPhase = false;
        this._isResolvingBossAttack = false;
        this.playerReactions = {};
        this.hasActedInCurrentPartyPhase = false;

        // Reseta status de alvo e flags de ação apenas para quem não está caído
        (raidData.players || []).forEach(p => {
            const hp = p.currentHp !== undefined ? p.currentHp : (p.baseHp || 1200);
            if (hp <= 0 || p.combatStatus === 'DOWNED') {
                p.combatStatus = 'DOWNED';
                p.currentHp = 0;
            } else {
                p.combatStatus = 'ACTIVE';
            }
        });

        if (window.raidRealtime.isHost) {
            await window.raidRealtime.updateRaidState({
                status: 'PARTY_PHASE',
                round: this.turnEngine.roundCount,
                players: raidData.players,
                partyActions: {},
                playerReactions: {},
                phaseStartedAt: Date.now()
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
     * Timer compartilhado para a fase de codificação da Party (3 minutos = 180s)
     */
    startPartyPhaseTimer(currentUser) {
        if (this.partyPhaseTimer) {
            clearInterval(this.partyPhaseTimer);
            this.partyPhaseTimer = null;
        }

        const raidData = window.raidRealtime.currentRaidData;
        const totalDuration = typeof RAID_PARTY_PHASE_TIMER !== 'undefined' ? RAID_PARTY_PHASE_TIMER : 180;
        let phaseTimeLeft = totalDuration;

        if (raidData && raidData.phaseStartedAt) {
            const elapsed = Math.max(0, Math.floor((Date.now() - raidData.phaseStartedAt) / 1000));
            phaseTimeLeft = Math.max(0, totalDuration - elapsed);
        }

        window.raidUI.updateChallengeTimer(phaseTimeLeft);

        this.partyPhaseTimer = setInterval(async () => {
            phaseTimeLeft--;
            window.raidUI.updateChallengeTimer(Math.max(0, phaseTimeLeft));

            if (phaseTimeLeft <= 0) {
                this.clearAllTimers();
                // Encerra modal se o jogador ainda estava programando
                window.raidUI.closeChallengeModal();
                
                // Se o jogador ainda não enviou ação nesta fase, marca e envia timeout (miss)
                if (!this.hasActedInCurrentPartyPhase) {
                    this.hasActedInCurrentPartyPhase = true;
                    this.turnEngine.markPlayerActed(currentUser.uid);
                    const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
                    if (heroCard) RaidAnimations.animateMiss(heroCard);
                    await window.raidRealtime.submitPlayerPartyAction(currentUser.uid, { actionType: 'timeout', success: false });
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
        this._isStartingBossPhase = false;
        this._isResolvingBossAttack = false;
        this.hasActedInCurrentPartyPhase = false;

        const raidData = window.raidRealtime.currentRaidData;
        if (this._isBattleFinished || (raidData && (raidData.status === 'VICTORY' || (raidData.bossState && raidData.bossState.currentHp <= 0)))) {
            if (!this._isBattleFinished) this.handleVictory();
            return;
        }

        this.turnEngine.advancePhase();

        const players = (raidData && raidData.players) || [];
        const alive = players.filter(p => {
            const hp = p.currentHp !== undefined ? p.currentHp : (p.baseHp || 1200);
            return hp > 0 && p.combatStatus !== 'DOWNED';
        });

        if (alive.length === 0) {
            this.handleDefeat();
            return;
        }

        // Host decide o ataque do boss (mira APENAS em jogadores vivos com HP > 0)
        const attackPlan = BossAI.decideAttack(this.currentBoss, players);
        this.currentBossAttack = attackPlan;
        this.playerReactions = {};

        // Marca jogadores como TARGETED ou ACTIVE/DOWNED
        players.forEach(p => {
            const hp = p.currentHp !== undefined ? p.currentHp : (p.baseHp || 1200);
            if (hp <= 0 || p.combatStatus === 'DOWNED') {
                p.combatStatus = 'DOWNED';
                p.currentHp = 0;
            } else if (attackPlan && attackPlan.targetUids && attackPlan.targetUids.includes(p.uid)) {
                p.combatStatus = 'TARGETED';
            } else {
                p.combatStatus = 'ACTIVE';
            }
        });

        // Atualiza imediatamente os dados locais para evitar qualquer renderização residual da Party Phase
        raidData.status = 'BOSS_PHASE';
        raidData.currentBossAttack = attackPlan;
        raidData.partyActions = {};
        raidData.playerReactions = {};

        if (window.raidRealtime.isHost) {
            await window.raidRealtime.updateRaidState({
                players,
                status: 'BOSS_PHASE',
                currentBossAttack: attackPlan,
                partyActions: {},
                playerReactions: {},
                phaseStartedAt: Date.now()
            });
        }

        if (window.raidAudio) window.raidAudio.playEvent('counter');

        const timeline = this.turnEngine.previewTimeline(5);
        window.raidUI.renderBattleArena(
            raidData,
            this.currentBoss,
            currentUser,
            { isPartyPhase: false, isBossPhase: true, round: raidData.round || this.turnEngine.roundCount },
            timeline,
            (actionType) => this.handlePlayerAction(actionType, currentUser),
            (reactionType) => this.handleDefensiveReaction(reactionType, currentUser),
            () => this.handleSurrender(currentUser)
        );

        this.startBossPhaseTimer(currentUser);
    }

    /**
     * Temporizador para a fase de reação defensiva do Boss (1.5 minutos = 90s)
     */
    startBossPhaseTimer(currentUser) {
        if (this.reactionTimer) {
            clearInterval(this.reactionTimer);
            this.reactionTimer = null;
        }

        const raidData = window.raidRealtime.currentRaidData;
        const totalDuration = typeof RAID_BOSS_REACTION_TIMER !== 'undefined' ? RAID_BOSS_REACTION_TIMER : 90;
        let reactionTimeLeft = totalDuration;

        if (raidData && raidData.phaseStartedAt) {
            const elapsed = Math.max(0, Math.floor((Date.now() - raidData.phaseStartedAt) / 1000));
            reactionTimeLeft = Math.max(0, totalDuration - elapsed);
        }

        window.raidUI.updateChallengeTimer(reactionTimeLeft);

        this.reactionTimer = setInterval(async () => {
            reactionTimeLeft--;
            window.raidUI.updateChallengeTimer(Math.max(0, reactionTimeLeft));

            if (reactionTimeLeft <= 0) {
                this.clearAllTimers();
                window.raidUI.closeChallengeModal();

                // Se o jogador atual foi alvejado e não respondeu antes do timeout, submete timeout
                const attackPlan = this.currentBossAttack || (raidData && raidData.currentBossAttack);
                const isTarget = attackPlan && attackPlan.targetUids && attackPlan.targetUids.includes(currentUser.uid);
                if (isTarget && !this.playerReactions[currentUser.uid]) {
                    const reactionData = { reaction: 'timeout', success: false };
                    this.playerReactions[currentUser.uid] = reactionData;
                    await window.raidRealtime.submitPlayerReaction(currentUser.uid, reactionData);
                }

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
        const challenge = this.challengeEngine.startChallenge(
            this.currentChapterId,
            reactionType
        );

        const raidData = window.raidRealtime.currentRaidData;
        const myPlayer = (raidData && raidData.players ? raidData.players.find(p => p.uid === currentUser.uid) : null) || {};
        const speedBonus = CombatFormulas.getSpeedTimeBonus(myPlayer.speed || 100);

        window.raidUI.openChallengeModal(challenge, reactionType, async (code) => {
            const result = this.challengeEngine.validateSubmission(code);
            const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
            const reactionData = { reaction: reactionType, success: result.success };

            if (result.success) {
                this.playerReactions[currentUser.uid] = reactionData;
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
                this.playerReactions[currentUser.uid] = reactionData;
                if (heroCard) RaidAnimations.animateMiss(heroCard);
            }

            await window.raidRealtime.submitPlayerReaction(currentUser.uid, reactionData);
            window.raidUI.closeChallengeModal();
            this.checkAllReactionsDone(currentUser);
        }, speedBonus);
    }

    async checkAllReactionsDone(currentUser) {
        if (!window.raidRealtime.isHost) return;
        if (this._isResolvingBossAttack) return;

        const raidData = window.raidRealtime.currentRaidData;
        if (this._isBattleFinished || !raidData || raidData.status !== 'BOSS_PHASE') return;
        if (raidData.status === 'VICTORY' || (raidData.bossState && raidData.bossState.currentHp <= 0)) {
            if (!this._isBattleFinished) this.handleVictory();
            return;
        }

        const attackPlan = this.currentBossAttack || (raidData && raidData.currentBossAttack);
        const targets = attackPlan ? (attackPlan.targetUids || []) : [];
        const syncedReactions = (raidData && raidData.playerReactions) || this.playerReactions || {};
        
        // Verifica apenas alvos que estão vivos e conectados
        const players = raidData.players || [];
        const aliveTargets = targets.filter(uid => {
            const p = players.find(x => x.uid === uid);
            return p && (p.currentHp || 0) > 0 && p.combatStatus !== 'DOWNED' && p.combatStatus !== 'DISCONNECTED';
        });

        const allReacted = aliveTargets.length === 0 || aliveTargets.every(uid => !!syncedReactions[uid] || !!this.playerReactions[uid]);

        if (allReacted) {
            this._isResolvingBossAttack = true;
            this.clearAllTimers();
            try {
                await this.resolveBossAttack(currentUser);
            } catch (err) {
                console.error('[BossRaidManager] Erro ao resolver ataque do Boss:', err);
                this._isResolvingBossAttack = false;
            }
        }
    }

    /**
     * Resolução do Ataque do Boss contra os alvos
     */
    async resolveBossAttack(currentUser) {
        this.clearAllTimers();

        const raidData = window.raidRealtime.currentRaidData;
        const players = raidData.players || [];
        const bossArena = document.getElementById('boss-stage-area');
        const targetElements = [];
        const damageAmounts = [];
        const counterAttacks = [];
        const attackPlan = this.currentBossAttack || (raidData && raidData.currentBossAttack);
        const syncedReactions = (raidData && raidData.playerReactions) || this.playerReactions || {};

        for (const p of players) {
            const isTarget = attackPlan && attackPlan.targetUids && attackPlan.targetUids.includes(p.uid);
            
            if (isTarget && p.combatStatus !== 'DOWNED' && (p.currentHp || 0) > 0) {
                const reaction = syncedReactions[p.uid] || this.playerReactions[p.uid];
                let finalDamage = 0;

                const baseDamage = CombatFormulas.calculateDamage(
                    raidData.bossState,
                    p,
                    attackPlan.multiplier || 1.0
                ).finalDamage;

                if (reaction && reaction.success) {
                    if (reaction.reaction === 'dodge') {
                        finalDamage = 0; // Esquiva perfeita
                    } else if (reaction.reaction === 'counter') {
                        // Anula o dano e devolve dano crítico duplo (+ buff Nightblood)
                        finalDamage = 0;
                        const subMods = CombatFormulas.getSubclassModifiers(p.subclass);
                        const nightbloodMult = CombatFormulas.getNightbloodPartyMultiplier(players);
                        const counterMultiplier = (subMods.counterMultiplier || 1.0) * 2.0 * nightbloodMult;
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
            } else if ((p.currentHp || 0) <= 0) {
                p.combatStatus = 'DOWNED';
            } else {
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
        const stillAlive = players.filter(p => p.combatStatus !== 'DOWNED' && (p.currentHp || 0) > 0);
        if (stillAlive.length === 0) {
            await this.handleDefeat();
            return;
        }

        // Avança para a próxima Fase da Party e incrementa rodada atomicamente no TurnEngine
        this.turnEngine.advancePhase();

        await window.raidRealtime.updateRaidState({
            players,
            bossState: raidData.bossState,
            status: 'PARTY_PHASE',
            round: this.turnEngine.roundCount,
            currentBossAttack: null,
            partyActions: {},
            playerReactions: {},
            phaseStartedAt: Date.now()
        });

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

        const challenge = this.challengeEngine.startChallenge(
            this.currentChapterId,
            actionType
        );

        const speedBonus = CombatFormulas.getSpeedTimeBonus(myPlayer.speed || 100);

        window.raidUI.openChallengeModal(challenge, actionType, async (code) => {
            const result = this.challengeEngine.validateSubmission(code);
            const heroCard = document.getElementById(`hero-card-${currentUser.uid}`);
            const bossArena = document.getElementById('boss-stage-area');

            if (result.success) {
                myPlayer.successfulActions = (myPlayer.successfulActions || 0) + 1;

                if (actionType === 'attack') {
                    const activePlayers = (raidData.players || []);
                    const nightbloodMult = CombatFormulas.getNightbloodPartyMultiplier(activePlayers);
                    const dmg = CombatFormulas.calculateDamage(myPlayer, raidData.bossState, nightbloodMult).finalDamage;
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
            await window.raidRealtime.submitPlayerPartyAction(currentUser.uid, { actionType, success: result.success });
            window.raidUI.closeChallengeModal();
            this.checkAllPartyActionsDone(currentUser);
        }, speedBonus);
    }

    async checkAllPartyActionsDone(currentUser) {
        if (!window.raidRealtime.isHost) return;
        if (this._isStartingBossPhase) return;

        const raidData = window.raidRealtime.currentRaidData;
        if (this._isBattleFinished || !raidData || (raidData.status !== 'PARTY_PHASE' && raidData.status !== 'ACTIVE')) return;
        if (raidData.status === 'VICTORY' || (raidData.bossState && raidData.bossState.currentHp <= 0)) {
            if (!this._isBattleFinished) this.handleVictory();
            return;
        }

        const partyActions = (raidData && raidData.partyActions) || {};
        const players = (raidData && raidData.players) || [];

        // Verifica se todos os jogadores vivos e conectados já realizaram ação
        const activePlayers = players.filter(p => {
            const hp = p.currentHp !== undefined ? p.currentHp : (p.baseHp || 1200);
            return hp > 0 && p.combatStatus !== 'DOWNED' && p.combatStatus !== 'DISCONNECTED';
        });

        if (activePlayers.length === 0) {
            await this.handleDefeat();
            return;
        }

        const allDone = activePlayers.every(p => !!partyActions[p.uid]);

        if (allDone) {
            this._isStartingBossPhase = true;
            this.clearAllTimers();
            try {
                await this.startBossPhase(currentUser);
            } catch (err) {
                console.error('[BossRaidManager] Erro ao iniciar Boss Phase:', err);
                this._isStartingBossPhase = false;
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
        if (this._isBattleFinished) return;
        this._isBattleFinished = true;
        this.clearAllTimers();

        // Para a música de batalha antes de tocar o evento de vitória
        if (window.raidAudio) window.raidAudio.stopBattleMusic();
        if (window.raidAudio) window.raidAudio.playEvent('bossDefeat');

        if (window.raidUI && window.raidUI.closeChallengeModal) {
            window.raidUI.closeChallengeModal();
        }

        const raidData = window.raidRealtime.currentRaidData;
        if (raidData) {
            raidData.status = 'VICTORY';
            if (raidData.bossState) raidData.bossState.currentHp = 0;
        }

        await window.raidRealtime.updateRaidState({ 
            status: 'VICTORY',
            bossState: raidData ? raidData.bossState : null
        });
    }

    /**
     * Encerramento com Derrota
     */
    async handleDefeat() {
        if (this._isBattleFinished) return;
        const currentData = window.raidRealtime.currentRaidData;
        if (currentData && (currentData.status === 'VICTORY' || (currentData.bossState && currentData.bossState.currentHp <= 0))) {
            return;
        }
        this._isBattleFinished = true;
        this.clearAllTimers();

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
        let awardedTokens = 0;

        if (engine && engine.addXp && engine.addTokens) {
            engine.addXp(baseXp);

            // Garante que a estrutura de chefes derrotados exista no estado
            if (!engine.state.bossesDefeated) engine.state.bossesDefeated = {};

            const bossRecord = engine.state.bossesDefeated[boss.id];
            const alreadyClaimed = bossRecord && bossRecord.tokensClaimed;

            // Tokens concedidos somente 1 única vez por boss
            if (!alreadyClaimed && baseTokens > 0) {
                awardedTokens = baseTokens;
                engine.addTokens(awardedTokens);
            }

            const isLastBoss = boss.id === 'boss_ch15' || Number(boss.chapterId) === 15;
            let awardedCrystals = 0;

            if (isLastBoss && !alreadyClaimed) {
                const isCSharp = (engine.state && engine.state.worldId === 'csharp_unity') ||
                                 (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
                const crystalConfig = (typeof app !== 'undefined' && app.getCrystalRewardsConfig)
                    ? app.getCrystalRewardsConfig()
                    : { shop: 1, lastAbyss: 1, tournament: 4, lastBoss: 2, pvp: 2 };

                awardedCrystals = isCSharp ? (crystalConfig.lastBoss ?? 2) : 0;
                if (awardedCrystals > 0) {
                    if (!engine.state.redeemedRewards) {
                        engine.state.redeemedRewards = { absences: 0, extraPoints: 0.0, history: [] };
                    }
                    const pointsToAdd = Math.round(awardedCrystals * 0.5 * 10) / 10;
                    const currentPoints = engine.state.redeemedRewards.extraPoints || 0.0;
                    engine.state.redeemedRewards.extraPoints = Math.round((currentPoints + pointsToAdd) * 10) / 10;
                    engine.state.redeemedRewards.history.push({
                        type: 'extra_point',
                        name: `Cristal de Ascensão Supremo (${awardedCrystals}x Derrota do Último Boss)`,
                        source: 'boss',
                        bossId: boss.id,
                        amount: pointsToAdd,
                        crystals: awardedCrystals,
                        cost: 0,
                        date: new Date().toISOString()
                    });
                }
            }

            engine.state.bossesDefeated[boss.id] = {
                completedAt: Date.now(),
                chapterId: boss.chapterId,
                tokensClaimed: true,
                crystalsClaimed: awardedCrystals > 0 ? true : ((bossRecord && bossRecord.crystalsClaimed) || false),
                timesDefeated: ((bossRecord && bossRecord.timesDefeated) || 0) + 1
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
                    tokensEarned: awardedTokens,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (e) {}
        }

        if (typeof app !== 'undefined' && app.ui) {
            let msg = '';
            if (awardedTokens > 0) {
                msg = `+${baseXp} XP e +${awardedTokens} Tokens da Guilda resgatados!`;
            } else {
                msg = `+${baseXp} XP resgatado! (Tokens deste Boss já haviam sido resgatados)`;
            }
            if (typeof awardedCrystals !== 'undefined' && awardedCrystals > 0) {
                msg += ` 👑 +${awardedCrystals} Cristal${awardedCrystals > 1 ? 'is' : ''} de Ascensão (+${(awardedCrystals * 0.5).toFixed(1)} pt na média)!`;
            }
            app.ui.showToast(msg, 'success');
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
