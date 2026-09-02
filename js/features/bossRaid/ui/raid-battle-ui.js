/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: BATTLE UI CONTROLLER
   Renderização do Lobby, Arena de Cenário Dimensional, HUD e Telas Finais
   ═══════════════════════════════════════════════════════════════ */

class RaidBattleUI {
    constructor() {
        this.container = null;
        this.activeChallenge = null;
    }

    init() {
        this.container = document.getElementById('screen-boss-raid');
    }

    /**
     * Renderiza o Lobby da Raid
     */
    renderLobby(raidData, boss, currentUser, onReadyToggle, onAvatarSelect, onLeave) {
        if (!this.container) this.init();
        if (!this.container) return;

        const players = raidData.players || [];
        const isMyReady = players.some(p => p.uid === currentUser.uid && p.ready);
        const allReady = players.length > 0 && players.every(p => p.ready);

        this.container.innerHTML = `
            <div class="boss-raid-wrapper lobby-mode">
                <!-- Cabeçalho do Lobby -->
                <div class="raid-header">
                    <button id="btn-leave-raid" class="icon-button" title="Voltar ao Mapa">
                        <span>◀</span><span class="btn-label">MAPA</span>
                    </button>
                    <div class="raid-header-title">
                        <span class="raid-tag">BOSS BATTLE RAID</span>
                        <h2>${boss.name.toUpperCase()}</h2>
                    </div>
                    <div class="raid-header-right">
                        <span class="party-status-badge">👥 ${players.length}/4 JOGADORES</span>
                    </div>
                </div>

                <!-- Conteúdo Principal do Lobby -->
                <div class="raid-lobby-grid">
                    <!-- Coluna do Chefe -->
                    <div class="boss-lobby-card">
                        <div class="boss-portrait-wrap">
                            <div class="boss-portrait-aura"></div>
                            <img src="${boss.spriteUrl}" alt="${boss.name}" class="boss-lobby-img" />
                            <div class="boss-difficulty-tag">CAPÍTULO ${boss.chapterId} • NV.${boss.recommendedLevel}+</div>
                        </div>
                        <div class="boss-lobby-details">
                            <h3 class="boss-card-title">${boss.name}</h3>
                            <div class="boss-card-subtitle">${boss.title}</div>
                            <p class="boss-card-desc">${boss.desc}</p>
                            <div class="boss-subject-tag">📚 Tópico: <strong>${boss.subject}</strong></div>
                            <div class="boss-stats-row">
                                <div class="boss-stat-item"><span>HP Base:</span> <strong>${boss.baseHp}</strong></div>
                                <div class="boss-stat-item"><span>ATK Base:</span> <strong>${boss.baseAttack}</strong></div>
                                <div class="boss-stat-item"><span>DEF Base:</span> <strong>${boss.baseDefense}</strong></div>
                                <div class="boss-stat-item"><span>SPD Base:</span> <strong>${boss.baseSpeed}</strong></div>
                            </div>
                        </div>
                    </div>

                    <!-- Coluna dos Jogadores (Até 4 Cards) -->
                    <div class="players-lobby-column">
                        <div class="players-cards-grid">
                            ${[0, 1, 2, 3].map(slot => {
                                const player = players[slot];
                                if (!player) {
                                    return `
                                        <div class="lobby-player-card empty-slot">
                                            <div class="empty-slot-icon">+</div>
                                            <div class="empty-slot-label">Aguardando Aliado...</div>
                                        </div>
                                    `;
                                }

                                const isSelf = player.uid === currentUser.uid;
                                const subClass = player.subclass || 'Aprendiz';
                                const avatarSrc = player.photoURL || `assets/avatars/avatar_${player.avatarId || '02'}.png`;

                                return `
                                    <div class="lobby-player-card ${player.ready ? 'is-ready' : ''} ${isSelf ? 'is-self' : ''}">
                                        <div class="card-ready-indicator">${player.ready ? 'PRONTO ✓' : 'PREPARANDO...'}</div>
                                        <div class="card-avatar-wrap">
                                            <img src="${avatarSrc}" alt="${player.displayName || 'Jogador'}" />
                                            ${isSelf && !player.ready ? `
                                                <button class="btn-change-avatar-lobby" id="btn-change-avatar-lobby" title="Trocar Avatar">
                                                    🔄
                                                </button>
                                            ` : ''}
                                        </div>
                                        <div class="card-player-info">
                                            <div class="card-player-name">${player.displayName || 'Codemancer'}</div>
                                            <div class="card-player-stats">Lv. ${player.level || 1} • ⚡ ${player.codePower || 1000} CP</div>
                                            <div class="card-player-subclass">${subClass.toUpperCase()}</div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        <!-- Barra de Ações do Lobby -->
                        <div class="lobby-action-bar">
                            <div class="lobby-status-text">
                                ${allReady ? 'Todos estão prontos! Iniciando contagem...' : 'Aguardando confirmação de prontidão dos jogadores.'}
                            </div>
                            <button id="btn-ready-toggle" class="glow-button ${isMyReady ? 'accent' : 'primary'}">
                                <span class="btn-text">${isMyReady ? 'CANCELAR PRONTO' : 'ESTOU PRONTO!'}</span>
                                <span class="btn-glow"></span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Modal de Troca de Avatar no Lobby -->
                <div id="modal-lobby-avatar-picker" class="modal hidden">
                    <div class="modal-backdrop" id="modal-backdrop-avatar"></div>
                    <div class="modal-content" style="max-width:560px;">
                        <h3 class="modal-title" style="color:var(--cyan);margin-bottom:1rem;">ESCOLHA SEU AVATAR PARA A RAID</h3>
                        <div class="lobby-avatar-selection-grid" id="lobby-avatar-selection-grid"></div>
                    </div>
                </div>
            </div>
        `;

        // Eventos do Lobby
        const btnLeave = document.getElementById('btn-leave-raid');
        if (btnLeave) btnLeave.onclick = () => onLeave();

        const btnReady = document.getElementById('btn-ready-toggle');
        if (btnReady) btnReady.onclick = () => onReadyToggle();

        const btnChangeAvatar = document.getElementById('btn-change-avatar-lobby');
        if (btnChangeAvatar) {
            btnChangeAvatar.onclick = () => this.openAvatarPicker(currentUser, onAvatarSelect);
        }

        const modalBackdrop = document.getElementById('modal-backdrop-avatar');
        if (modalBackdrop) {
            modalBackdrop.onclick = () => {
                const modal = document.getElementById('modal-lobby-avatar-picker');
                if (modal) modal.classList.add('hidden');
            };
        }
    }

    /**
     * Seletor de Avatar no Lobby
     */
    openAvatarPicker(currentUser, onAvatarSelect) {
        const modal = document.getElementById('modal-lobby-avatar-picker');
        const grid = document.getElementById('lobby-avatar-selection-grid');
        if (!modal || !grid) return;

        grid.innerHTML = '';
        const allAvatars = (typeof AVATAR_SKILLS_DATA !== 'undefined') ? Object.values(AVATAR_SKILLS_DATA) : [];
        const isTeacher = (typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin()));

        allAvatars.forEach(av => {
            if (av.teacherOnly && !isTeacher) return;
            const item = document.createElement('div');
            item.className = 'lobby-avatar-option-card';
            item.innerHTML = `
                <img src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" />
                <div class="avatar-option-name">${av.name}</div>
                <div class="avatar-option-stats">HP:${av.baseHp || 1200} | ATK:${av.baseAttack || 100} | SPD:${av.baseSpeed || 100}</div>
            `;
            item.onclick = () => {
                modal.classList.add('hidden');
                onAvatarSelect(av.id, av);
            };
            grid.appendChild(item);
        });

        modal.classList.remove('hidden');
    }

    /**
     * Exibe o overlay de contagem regressiva sincronizada 5..4..3..2..1
     */
    showCountdown(count, onComplete) {
        let overlay = document.getElementById('raid-countdown-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'raid-countdown-overlay';
            overlay.className = 'raid-countdown-overlay';
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `
            <div class="countdown-pulse-number">${count > 0 ? count : 'BATTLE START!'}</div>
        `;
        overlay.classList.add('active');

        if (window.raidAudio) window.raidAudio.playTone(count > 0 ? 440 : 880, 0.12, 'triangle', 0.2);

        if (count <= 0) {
            setTimeout(() => {
                overlay.classList.remove('active');
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                if (onComplete) onComplete();
            }, 800);
        }
    }

    /**
     * Renderiza o Cenário e Arena de Batalha Cinemática
     */
    renderBattleArena(raidData, boss, currentUser, activeTurnEntity, timeline = [], onActionSelect, onDefensiveReaction) {
        if (!this.container) this.init();
        if (!this.container) return;

        const bossState = raidData.bossState || boss;
        const players = raidData.players || [];
        const hpPct = Math.max(0, Math.min(100, (bossState.currentHp / bossState.maxHp) * 100)).toFixed(1);

        const isMyTurn = activeTurnEntity && !activeTurnEntity.isBoss && activeTurnEntity.id === currentUser.uid;
        const myPlayerData = players.find(p => p.uid === currentUser.uid) || players[0];
        const isTargeted = myPlayerData && myPlayerData.combatStatus === 'TARGETED';
        const hasDownedPlayers = players.some(p => p.combatStatus === 'DOWNED');

        this.container.innerHTML = `
            <div class="boss-raid-wrapper battle-mode">
                <!-- Barra Superior do Combate -->
                <div class="battle-top-bar">
                    <div class="battle-header-info">
                        <span class="battle-chapter-pill">CAPÍTULO ${boss.chapterId}</span>
                        <span class="battle-boss-title">${boss.name}</span>
                    </div>

                    <!-- Linha de Turnos (Timeline Dinâmica) -->
                    <div class="battle-turn-timeline" id="battle-turn-timeline">
                        <div class="timeline-label">ORDEM DE AÇÃO:</div>
                        <div class="timeline-chips">
                            ${timeline.slice(0, 5).map((t, idx) => `
                                <div class="timeline-chip ${t.isBoss ? 'is-boss' : 'is-hero'} ${idx === 0 ? 'current' : ''}">
                                    ${idx === 0 ? '▶ ' : ''}${t.isBoss ? 'BOSS' : t.name.substring(0, 8)}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Botão do Grimório de Anotações do Estudante -->
                    <div class="battle-top-actions">
                        <button id="btn-open-raid-notepad" class="glow-button secondary" title="Consultar Grimório de Anotações e Sintaxes de C">
                            <span class="btn-text">📖 GRIMÓRIO DE ANOTAÇÕES</span>
                        </button>
                    </div>
                </div>

                <!-- Alerta Vermelho de Mira do Boss -->
                <div id="boss-target-warning-banner" class="boss-target-warning-banner ${isTargeted ? 'active' : ''}">
                    ⚠ ALERTA: O BOSS FIXOU A MIRA EM VOCÊ! PREPARE SUA REAÇÃO DEFENSIVA!
                </div>

                <!-- Cenário Dimensional da Batalha (Battle Scenery Arena) -->
                <div class="boss-raid-arena" id="boss-raid-arena">
                    <div class="arena-background-rift"></div>
                    <div class="arena-dust-particles"></div>

                    <!-- 1. Camada Superior: Palco do Chefe -->
                    <div class="boss-stage-area" id="boss-stage-area">
                        <div class="boss-entity-wrap ${activeTurnEntity && activeTurnEntity.isBoss ? 'active-turn' : ''}" id="boss-entity-wrap">
                            <div class="boss-aura-ring"></div>
                            <img src="${boss.spriteUrl}" alt="${boss.name}" class="boss-battle-sprite" />
                            <div class="boss-hud-overlay">
                                <div class="boss-name-tag">${boss.name} <span class="boss-title-tag">${boss.title}</span></div>
                                <div class="boss-hp-bar-container">
                                    <div class="boss-hp-bar-fill" id="boss-hp-bar-fill" style="width: ${hpPct}%;"></div>
                                    <span class="boss-hp-text" id="boss-hp-text">${bossState.currentHp} / ${bossState.maxHp} (${hpPct}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Camada Central: Campo de Colisão e Efeitos -->
                    <div class="combat-clash-field" id="combat-clash-field"></div>

                    <!-- 3. Camada Inferior: Linha de Heróis (Party Row) -->
                    <div class="party-battle-row" id="party-battle-row">
                        ${players.map(p => {
                            const isCurrentHero = activeTurnEntity && !activeTurnEntity.isBoss && activeTurnEntity.id === p.uid;
                            const isDown = p.combatStatus === 'DOWNED';
                            const isHeroTargeted = p.combatStatus === 'TARGETED';
                            const pHpPct = Math.max(0, Math.min(100, ((p.currentHp || 1000) / (p.maxHp || 1000)) * 100)).toFixed(0);
                            const avatarSrc = p.photoURL || `assets/avatars/avatar_${p.avatarId || '02'}.png`;

                            return `
                                <div class="hero-battle-card ${isCurrentHero ? 'active-turn' : ''} ${isDown ? 'is-downed' : ''} ${isHeroTargeted ? 'is-targeted' : ''}" id="hero-card-${p.uid}">
                                    <div class="hero-pedestal"></div>
                                    <div class="hero-card-inner">
                                        <div class="hero-avatar-container">
                                            <img src="${avatarSrc}" alt="${p.displayName || 'Herói'}" class="hero-battle-avatar" />
                                            ${isHeroTargeted ? '<div class="target-crosshair">🎯</div>' : ''}
                                            ${isDown ? '<div class="downed-skull-badge">💀 CAÍDO</div>' : ''}
                                        </div>
                                        <div class="hero-name-label">${p.displayName || 'Codemancer'}</div>
                                        <div class="hero-subclass-label">${(p.subclass || 'Aprendiz').toUpperCase()}</div>
                                        <div class="hero-hp-bar-container">
                                            <div class="hero-hp-bar-fill" style="width: ${pHpPct}%;"></div>
                                            <span class="hero-hp-text">${p.currentHp || 0} / ${p.maxHp || 1000}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Dock de Ações do Turno do Jogador -->
                <div class="battle-action-dock" id="battle-action-dock">
                    ${isMyTurn ? `
                        <div class="action-buttons-group">
                            <button class="glow-button primary raid-action-btn" id="btn-action-attack">
                                <span class="btn-text">⚔ ATACAR</span>
                                <span class="btn-glow"></span>
                            </button>
                            <button class="glow-button secondary raid-action-btn" id="btn-action-item">
                                <span class="btn-text">🧪 USAR ITEM</span>
                            </button>
                            ${hasDownedPlayers ? `
                                <button class="glow-button accent raid-action-btn" id="btn-action-revive">
                                    <span class="btn-text">✨ AJUDAR AMIGO</span>
                                </button>
                            ` : ''}
                        </div>
                    ` : isTargeted ? `
                        <div class="action-buttons-group reaction-group">
                            <span class="reaction-prompt">ESCOLHA SUA REAÇÃO:</span>
                            <button class="glow-button accent raid-action-btn" id="btn-react-counter">
                                <span class="btn-text">⚔ CONTRA-GOLPE</span>
                            </button>
                            <button class="glow-button primary raid-action-btn" id="btn-react-dodge">
                                <span class="btn-text">💨 ESQUIVAR</span>
                            </button>
                            <button class="glow-button secondary raid-action-btn" id="btn-react-item">
                                <span class="btn-text">🧪 ITEM DEFENSIVO</span>
                            </button>
                        </div>
                    ` : `
                        <div class="waiting-turn-notice">
                            <span class="turn-owner-indicator">
                                TURNO ATUAL: <strong>${activeTurnEntity ? (activeTurnEntity.isBoss ? boss.name : activeTurnEntity.name) : 'Sincronizando...'}</strong>
                            </span>
                        </div>
                    `}
                </div>

                <!-- Modal de Mini-Desafio de Programação em C -->
                <div id="modal-raid-challenge" class="modal hidden">
                    <div class="modal-backdrop"></div>
                    <div class="modal-content raid-challenge-modal-content">
                        <div class="challenge-modal-header">
                            <div class="challenge-title-wrap">
                                <span class="challenge-action-badge" id="challenge-action-badge">AÇÃO</span>
                                <h3 id="challenge-modal-title">DESAFIO DE PROGRAMAÇÃO</h3>
                            </div>
                            <div class="challenge-header-right">
                                <!-- Botão Grimório no Modal de Desafio -->
                                <button id="btn-challenge-notepad" class="icon-button" title="Abrir Grimório de Anotações">
                                    📖 Grimório
                                </button>
                                <div class="challenge-timer-badge" id="challenge-timer-badge">25s</div>
                            </div>
                        </div>

                        <div class="challenge-instruction-box" id="challenge-instruction-box">
                            Instrução do desafio...
                        </div>

                        <div class="challenge-editor-container">
                            <textarea id="raid-code-editor" class="code-editor" spellcheck="false"></textarea>
                        </div>

                        <div class="challenge-modal-footer">
                            <button id="btn-challenge-reset" class="editor-btn">⟳ Resetar</button>
                            <button id="btn-challenge-submit" class="glow-button primary">
                                <span class="btn-text">✓ EXECUTAR & SUBMETER</span>
                                <span class="btn-glow"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Eventos da Batalha
        const btnNotepad = document.getElementById('btn-open-raid-notepad');
        if (btnNotepad && typeof app !== 'undefined' && app.ui && app.ui.toggleActivityNotepadDrawer) {
            btnNotepad.onclick = () => app.ui.toggleActivityNotepadDrawer();
        }

        const btnChallengeNotepad = document.getElementById('btn-challenge-notepad');
        if (btnChallengeNotepad && typeof app !== 'undefined' && app.ui && app.ui.toggleActivityNotepadDrawer) {
            btnChallengeNotepad.onclick = () => app.ui.toggleActivityNotepadDrawer();
        }

        // Ações Ofensivas
        const btnAtk = document.getElementById('btn-action-attack');
        if (btnAtk) btnAtk.onclick = () => onActionSelect('attack');

        const btnItem = document.getElementById('btn-action-item');
        if (btnItem) btnItem.onclick = () => onActionSelect('item');

        const btnRevive = document.getElementById('btn-action-revive');
        if (btnRevive) btnRevive.onclick = () => onActionSelect('revive');

        // Reações Defensivas
        const btnCounter = document.getElementById('btn-react-counter');
        if (btnCounter) btnCounter.onclick = () => onDefensiveReaction('counter');

        const btnDodge = document.getElementById('btn-react-dodge');
        if (btnDodge) btnDodge.onclick = () => onDefensiveReaction('dodge');

        const btnReactItem = document.getElementById('btn-react-item');
        if (btnReactItem) btnReactItem.onclick = () => onDefensiveReaction('item');
    }

    /**
     * Abre o modal do mini-desafio no editor
     */
    openChallengeModal(challenge, actionType, onCodeSubmit) {
        this.activeChallenge = challenge;
        const modal = document.getElementById('modal-raid-challenge');
        if (!modal) return;

        const badge = document.getElementById('challenge-action-badge');
        const title = document.getElementById('challenge-modal-title');
        const instruction = document.getElementById('challenge-instruction-box');
        const editor = document.getElementById('raid-code-editor');

        if (badge) badge.textContent = actionType.toUpperCase();
        if (title) title.textContent = challenge.title;
        if (instruction) instruction.textContent = challenge.instruction;
        if (editor) {
            editor.value = challenge.starterCode || '#include <stdio.h>\n\nint main() {\n    return 0;\n}';
        }

        const btnReset = document.getElementById('btn-challenge-reset');
        if (btnReset && editor) {
            btnReset.onclick = () => {
                editor.value = challenge.starterCode || '';
            };
        }

        const btnSubmit = document.getElementById('btn-challenge-submit');
        if (btnSubmit && editor) {
            btnSubmit.onclick = () => {
                const code = editor.value;
                modal.classList.add('hidden');
                onCodeSubmit(code);
            };
        }

        modal.classList.remove('hidden');
        if (editor) setTimeout(() => editor.focus(), 150);
    }

    closeChallengeModal() {
        const modal = document.getElementById('modal-raid-challenge');
        if (modal) modal.classList.add('hidden');
    }

    updateChallengeTimer(seconds) {
        const timerBadge = document.getElementById('challenge-timer-badge');
        if (timerBadge) {
            timerBadge.textContent = `${seconds}s`;
            if (seconds <= 5) {
                timerBadge.classList.add('danger');
            } else {
                timerBadge.classList.remove('danger');
            }
        }
    }

    /**
     * Renderiza a Tela de Vitória com cálculo oficial de MVP (Seção 21)
     */
    renderVictoryScreen(raidData, boss, onClaimRewards) {
        if (!this.container) this.init();
        if (!this.container) return;

        const players = raidData.players || [];

        // Cálculo do MVP (Fórmula oficial Seção 21):
        // mvpScore = totalDamageDealt * 1.0 + totalSupportScore * 0.8 + successfulActions * 50 + revives * 300
        let mvpPlayer = players[0];
        let maxMvpScore = -1;
        let topDamagePlayer = players[0];
        let maxDamage = -1;
        let topTankPlayer = players[0];
        let maxDamageTaken = -1;
        let topSupportPlayer = players[0];
        let maxSupportScore = -1;

        players.forEach(p => {
            const dmg = p.damageDealt || 0;
            const tank = p.damageTaken || 0;
            const heal = p.healingDone || 0;
            const rev = p.revivesCount || 0;
            const acts = p.successfulActions || 0;

            const supportScore = heal + rev * 500;
            const score = dmg * 1.0 + supportScore * 0.8 + acts * 50 + rev * 300;

            if (score > maxMvpScore) {
                maxMvpScore = score;
                mvpPlayer = p;
            }
            if (dmg > maxDamage) {
                maxDamage = dmg;
                topDamagePlayer = p;
            }
            if (tank > maxDamageTaken) {
                maxDamageTaken = tank;
                topTankPlayer = p;
            }
            if (supportScore > maxSupportScore) {
                maxSupportScore = supportScore;
                topSupportPlayer = p;
            }
        });

        const baseXp = boss.rewards?.baseXp || 350;
        const baseTokens = boss.rewards?.baseTokens || 40;

        this.container.innerHTML = `
            <div class="boss-raid-wrapper victory-mode">
                <div class="victory-banner-box">
                    <div class="victory-rays"></div>
                    <div class="victory-trophy-icon">🏆</div>
                    <h1 class="victory-headline">VITÓRIA ÉPICA!</h1>
                    <p class="victory-subline">O chefe <strong>${boss.name}</strong> foi subjugado pela sua Guilda!</p>

                    <!-- Painel de MVP e Destaques -->
                    <div class="mvp-highlight-card">
                        <div class="mvp-badge">★ MVP DA RAID ★</div>
                        <img src="${mvpPlayer?.photoURL || 'assets/avatars/avatar_02.png'}" class="mvp-avatar" />
                        <div class="mvp-name">${mvpPlayer?.displayName || 'Codemancer'}</div>
                        <div class="mvp-score-tag">Pontuação Geral de MVP: ${Math.round(maxMvpScore)} pts</div>
                    </div>

                    <!-- Quadro de Honra dos Jogadores -->
                    <div class="hall-of-fame-grid">
                        <div class="fame-item">
                            <span class="fame-icon">⚔</span>
                            <span class="fame-title">Maior Dano</span>
                            <strong class="fame-player">${topDamagePlayer?.displayName || 'Herói'}</strong>
                            <span class="fame-val">${topDamagePlayer?.damageDealt || 0} Dano (+10% XP)</span>
                        </div>
                        <div class="fame-item">
                            <span class="fame-icon">🛡️</span>
                            <span class="fame-title">Mais Dano Recebido</span>
                            <strong class="fame-player">${topTankPlayer?.displayName || 'Herói'}</strong>
                            <span class="fame-val">${topTankPlayer?.damageTaken || 0} Dano (+5% XP)</span>
                        </div>
                        <div class="fame-item">
                            <span class="fame-icon">💚</span>
                            <span class="fame-title">Maior Suporte</span>
                            <strong class="fame-player">${topSupportPlayer?.displayName || 'Herói'}</strong>
                            <span class="fame-val">${topSupportPlayer?.healingDone || 0} Cura / ${topSupportPlayer?.revivesCount || 0} Revives (+10% XP)</span>
                        </div>
                    </div>

                    <!-- Recompensas da Partida -->
                    <div class="victory-rewards-box">
                        <div class="reward-pill xp">⚡ +${baseXp} XP de Ascensão</div>
                        <div class="reward-pill tokens">🪙 +${baseTokens} Tokens da Guilda</div>
                        ${boss.rewards?.title ? `<div class="reward-pill title">🎖️ Título: "${boss.rewards.title}"</div>` : ''}
                    </div>

                    <button id="btn-claim-raid-rewards" class="glow-button primary" style="margin-top:1.5rem;font-size:1.1rem;padding:0.9rem 2.5rem;">
                        <span class="btn-text">RESGATAR RECOMPENSAS & CONTINUAR</span>
                        <span class="btn-glow"></span>
                    </button>
                </div>
            </div>
        `;

        if (window.raidAudio) window.raidAudio.playEvent('victory');

        const btnClaim = document.getElementById('btn-claim-raid-rewards');
        if (btnClaim) {
            btnClaim.onclick = () => onClaimRewards(baseXp, baseTokens, boss);
        }
    }

    /**
     * Renderiza a Tela de Derrota
     */
    renderDefeatScreen(raidData, boss, onRetry, onLeave) {
        if (!this.container) this.init();
        if (!this.container) return;

        const bossState = raidData.bossState || boss;
        const hpPct = Math.max(0, Math.min(100, (bossState.currentHp / bossState.maxHp) * 100)).toFixed(1);

        this.container.innerHTML = `
            <div class="boss-raid-wrapper defeat-mode">
                <div class="defeat-box">
                    <div class="defeat-icon">💀</div>
                    <h1 class="defeat-headline">TODOS OS HEROIS CAÍRAM</h1>
                    <p class="defeat-subline">A Party sucumbiu aos ataques de <strong>${boss.name}</strong>.</p>
                    <div class="defeat-boss-hp-tag">HP Restante do Chefe: <strong>${bossState.currentHp} / ${bossState.maxHp} (${hpPct}%)</strong></div>

                    <div class="defeat-tips-card">
                        <h4>💡 CONSELHO ESTRATÉGICO DA GUILDA</h4>
                        <p>Coordene com seus companheiros: utilize Esquiva em ataques individuais e Contra-Golpes quando a defesa permitir. Jogadores com subclasse <strong>Debugger</strong> possuem bônus passivo para reviver aliados caídos!</p>
                    </div>

                    <div class="defeat-buttons-row">
                        <button id="btn-defeat-retry" class="glow-button primary">
                            <span class="btn-text">⟳ TENTAR NOVAMENTE</span>
                            <span class="btn-glow"></span>
                        </button>
                        <button id="btn-defeat-leave" class="glow-button secondary">
                            <span class="btn-text">VOLTAR AO MAPA</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        if (window.raidAudio) window.raidAudio.playEvent('playerDown');

        const btnRetry = document.getElementById('btn-defeat-retry');
        if (btnRetry) btnRetry.onclick = () => onRetry();

        const btnLeave = document.getElementById('btn-defeat-leave');
        if (btnLeave) btnLeave.onclick = () => onLeave();
    }
}

window.RaidBattleUI = RaidBattleUI;
window.raidUI = new RaidBattleUI();
