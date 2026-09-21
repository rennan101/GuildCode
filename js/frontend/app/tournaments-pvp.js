/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App: tournaments-pvp.js
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _AppExtension {
    openBossRaidSelector() {
        this.ui.showScreen('ranked');
        var content = document.getElementById('ranked-content');
        if (!content) return;

        const isCSharp = (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : CHAPTERS;

        const engine = this.engine || window.engine;
        const playerState = engine ? engine.state : { level: 5, subclass: 'hardcoder', codePower: 1000 };

        var bossCards = activeList.map(ch => {
            const boss = (typeof BossDataManager !== 'undefined' && typeof BossDataManager.getBossByChapter === 'function')
                ? BossDataManager.getBossByChapter(ch.id)
                : null;
            
            const bossName = boss ? boss.name : `Guardião do Cap. ${ch.id}`;
            const bossTitle = boss ? boss.title : 'Chefe de Fase';
            const bossDesc = boss ? boss.desc : 'Enfrente esta ameaça lendária em cooperação ou solo.';
            const bossSprite = boss ? boss.spriteUrl : `assets/bosses/boss_${ch.id}.png`;
            const maxHp = boss ? boss.baseHp || boss.maxHp || 6000 : 6000;
            const access = (window.bossRaidManager && typeof window.bossRaidManager.checkBossAccess === 'function')
                ? window.bossRaidManager.checkBossAccess(ch.id, playerState, engine)
                : { allowed: true };

            const isLocked = !access.allowed;
            const badgeClass = isLocked ? 'difficulty-badge hard' : 'difficulty-badge easy';
            const badgeText = isLocked ? 'BLOQUEADO' : 'LIBERADO';

            return `
                <div class="pvp-challenge-card" style="flex-direction:column;align-items:stretch;gap:0.9rem;border-left:4px solid ${isLocked ? 'var(--border-dim)' : 'var(--gold)'};opacity:${isLocked ? '0.7' : '1'};">
                    <div style="display:flex;gap:1rem;align-items:center;">
                        <div style="width:58px;height:58px;border-radius:6px;background:var(--bg-deep);border:1.5px solid ${isLocked ? 'var(--border-dim)' : 'var(--gold)'};overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                            <img src="${bossSprite}" onerror="this.src='assets/icons/WhiteLogo.svg'" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;">
                        </div>
                        <div style="flex:1;min-width:0;">
                            <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
                                <span class="${badgeClass}" style="font-size:0.65rem;padding:0.15rem 0.45rem;">${badgeText}</span>
                                <span style="font-size:0.75rem;font-family:var(--font-code);color:var(--cyan);">CAP. ${String(ch.id).padStart(2,'0')}</span>
                            </div>
                            <h4 style="margin:0.25rem 0 0.1rem 0;color:var(--text-primary);font-size:0.95rem;font-weight:700;">${bossName}</h4>
                            <div style="font-size:0.72rem;color:var(--gold);font-style:italic;">${bossTitle}</div>
                        </div>
                    </div>
                    <p style="margin:0;font-size:0.75rem;color:var(--text-dim);line-height:1.4;">${bossDesc}</p>
                    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:0.4rem;border-top:1px solid var(--border-ghost);flex-wrap:wrap;gap:0.5rem;">
                        <span style="font-size:0.75rem;color:var(--text-secondary);font-family:var(--font-code);">
                            HP: <strong style="color:var(--red);">${maxHp.toLocaleString()}</strong>
                        </span>
                        <button class="glow-button ${isLocked ? '' : 'primary'}" style="font-size:0.75rem;padding:0.45rem 1.2rem;display:inline-flex;align-items:center;gap:0.4rem;" onclick="${isLocked ? `app.ui.showToast('${access.message || 'Cumpra os requisitos anteriores'}', 'warning')` : `if(window.bossRaidManager){window.bossRaidManager.openLobby(${ch.id});}`}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.61 6.24 4.09 8.04.14.1.31.16.48.16.23 0 .46-.1.62-.28.29-.33.25-.83-.08-1.12C4.94 17.15 3.6 14.73 3.6 12c0-4.63 3.77-8.4 8.4-8.4s8.4 3.77 8.4 8.4c0 2.73-1.34 5.15-3.51 6.8-.33.29-.37.79-.08 1.12.16.18.39.28.62.28.17 0 .34-.06.48-.16C20.39 18.24 22 15.31 22 12c0-5.52-4.48-10-10-10zm-3 8c.83 0 1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5S8.17 10 9 10zm6 0c.83 0 1.5.67 1.5 1.5S15.83 13 15 13s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3 5c-1.66 0-3-1.34-3-3h6c0 1.66-1.34 3-3 3z"/></svg>
                            ${isLocked ? 'BLOQUEADO' : 'INICIAR RAID'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        content.innerHTML = `
            <div class="pvp-screen">
                <div class="pvp-header">
                    <div>
                        <h2 class="pvp-title">BOSS BATTLE RAIDS</h2>
                        <p class="pvp-subtitle">Convoque seus companheiros de guilda ou enfrente os 16 Chefes Guardiões de Código em batalhas por turnos com tempo real e lógica de programação.</p>
                    </div>
                    <div style="display:flex;align-items:center;gap:1.2rem;background:rgba(0,0,0,0.3);padding:0.6rem 1.2rem;border:1px solid var(--border-dim);border-radius:4px;">
                        <button class="glow-button" onclick="app.ui.showScreen('dashboard');app.ui.renderDashboard();" style="font-size:0.75rem;padding:0.4rem 1.2rem;">◀ MAPA</button>
                    </div>
                </div>
                <div class="pvp-section" style="margin-top:1.5rem;">
                    <h3 class="pvp-section-title">SELECIONE O GUARDIÃO PARA BATALHA</h3>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:1.2rem;margin-top:1rem;">
                        ${bossCards}
                    </div>
                </div>
            </div>
        `;
    }

showChallengeSelector() {
        if (typeof rankedManager === 'undefined') {
            this.ui.showToast('Sistema de desafios não disponível', 'error');
            return;
        }
        var content = document.getElementById('ranked-content');
        if (!content) return;
        const isCSharp = (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : CHAPTERS;

        var chapterList = activeList.map(function(ch) { 
            return '<div class="pvp-chapter-card" onclick="app.selectChallengeChapter(' + ch.id + ')">' +
            '<div class="chapter-number" style="font-size:0.75rem;min-width:65px;font-weight:700;color:var(--purple-bright);">CAP ' + String(ch.id).padStart(2, '0') + '</div>' +
            '<div class="chapter-info" style="flex:1;"><div class="chapter-item-title" style="font-size:0.9rem;font-weight:700;margin-bottom:0.2rem;color:var(--text-primary);">' + ch.title + '</div>' +
            '<div class="chapter-item-theme" style="font-size:0.72rem;color:var(--text-dim);">' + ch.theme + '</div></div>' +
            '<div style="color:var(--purple-bright);font-weight:700;font-size:0.8rem;">SELECIONAR ➔</div></div>';
        }).join('');

        content.innerHTML = '<div class="pvp-select-container">' +
            '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem;">' +
            '<button class="glow-button" onclick="app.openRanked()" style="font-size:0.75rem;padding:0.4rem 1.2rem;">◀ VOLTAR</button>' +
            '</div>' +
            '<div class="pvp-select-header-box">' +
            '<h3 class="pvp-select-title">SELECIONAR CAPÍTULO PARA O DUELO</h3>' +
            '<p class="pvp-select-subtitle">Escolha o capítulo base. Três desafios desse capítulo serão sorteados para o duelo assíncrono.</p>' +
            '</div>' +
            '<div class="pvp-chapter-grid">' + chapterList + '</div>' +
            '</div>';
    }
    async selectChallengeChapter(chapterId) {
        var content = document.getElementById('ranked-content');
        const isCSharp = (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : CHAPTERS;
        var chapter = activeList.find(function(c) { return c.id === chapterId; });

        // Feedback visual imediato de carregamento (0ms)
        if (content) {
            content.innerHTML = '<div class="pvp-select-container">' +
                '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem;">' +
                '<button class="glow-button" onclick="app.showChallengeSelector()" style="font-size:0.75rem;padding:0.4rem 1.2rem">◀ VOLTAR</button>' +
                '</div>' +
                '<div class="pvp-select-header-box">' +
                '<h3 class="pvp-select-title">DESAFIAR EM: ' + (chapter ? chapter.title.toUpperCase() : '') + '</h3>' +
                '<p class="pvp-select-subtitle">Buscando adversários disponíveis na sua guilda...</p>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 1rem;gap:1rem;">' +
                '<div class="spinner"></div>' +
                '<span style="font-family:var(--font-display);font-size:0.8rem;color:var(--purple-bright);letter-spacing:0.08em;">CONVOCANDO JOGADORES...</span>' +
                '</div>' +
                '</div>';
        }

        try {
            var players = await rankedManager.searchPlayers('');
            if (players.length === 0) {
                if (content) {
                    content.innerHTML = '<div class="pvp-select-container">' +
                        '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem;">' +
                        '<button class="glow-button" onclick="app.showChallengeSelector()" style="font-size:0.75rem;padding:0.4rem 1.2rem">◀ VOLTAR</button>' +
                        '</div>' +
                        '<div class="pvp-select-header-box">' +
                        '<h3 class="pvp-select-title">DESAFIAR EM: ' + (chapter ? chapter.title.toUpperCase() : '') + '</h3>' +
                        '<p class="pvp-select-subtitle">Nenhum outro jogador encontrado na guilda no momento.</p>' +
                        '</div>' +
                        '<p class="pvp-empty" style="text-align:center;padding:2rem;">Convide seus colegas de guilda para começarem a duelar!</p>' +
                        '</div>';
                }
                return;
            }
            var playerList = players.map(function(p) {
                var gp = p.gameProgress || {};
                var renome = gp.renome !== undefined ? gp.renome : 100;
                var cp = gp.codePower || 1000;
                var tier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(renome) : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' };
                var avatarSrc = p.photoURL;
                var level = gp.level || 1;
                var completedChapters = gp.chapters ? Object.values(gp.chapters).filter(function(c){ return c && c.completed; }).length : 0;
                var power = gp.stats?.guildPower || Math.round((completedChapters / 15) * 100);
                var email = p.email || 'aluno@guildcode.com';

                return '<div style="padding:0.85rem 1.2rem;margin-bottom:0.6rem;border:1px solid var(--border-dim);background:var(--bg-panel);display:flex;justify-content:space-between;align-items:center;border-radius:6px;gap:1rem;flex-wrap:wrap;">' +
                '<div style="display:flex;align-items:center;gap:0.9rem;flex:1;min-width:240px;">' +
                '<div style="width:38px;height:38px;border-radius:50%;border:1.5px solid ' + tier.color + ';overflow:hidden;background:var(--bg-deep);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                (avatarSrc ? '<img src="' + avatarSrc + '" style="width:100%;height:100%;object-fit:cover;">' : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--purple-bright)"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>') +
                '</div>' +
                '<div>' +
                '<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">' +
                '<span style="color:var(--text-primary);font-weight:700;font-size:0.92rem;">' + (p.displayName || 'Jogador') + '</span>' +
                '<span style="font-size:0.7rem;color:var(--text-dim);">' + email + '</span>' +
                '</div>' +
                '<div style="font-size:0.72rem;color:var(--text-dim);display:flex;gap:0.6rem;margin-top:0.2rem;flex-wrap:wrap;">' +
                '<span style="color:var(--cyan);font-weight:600;">LV. ' + String(level).padStart(2, '0') + '</span> &bull; ' +
                '<span>Cap: <strong style="color:var(--text-primary)">' + completedChapters + '/15</strong></span> &bull; ' +
                '<span style="color:var(--gold)">Power: <strong>' + power + '%</strong></span> &bull; ' +
                '<span style="color:' + tier.color + '">' + tier.icon + ' ' + tier.name + '</span> &bull; ' +
                '<span style="color:var(--purple-bright)">' + cp + ' MMR</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<button class="glow-button primary" style="font-size:0.75rem;padding:0.45rem 1.2rem;display:inline-flex;align-items:center;gap:0.4rem;" onclick="app.sendChallenge(\'' + p.uid + '\', \'' + (p.displayName||'Jogador').replace(/'/g, "\\'") + '\', ' + chapterId + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.7 2.3a1 1 0 0 0-1.4 0l-4.9 4.9-1.4-1.4a1 1 0 0 0-1.4 0l-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4-6.6 6.6-1.6-.5-.8.8 2.3 2.3-3.2 3.2 1.4 1.4 3.2-3.2 2.3 2.3.8-.8-.5-1.6 6.6-6.6 1.4 1.4a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 0 0 0-1.4l-1.4-1.4 4.9-4.9a1 1 0 0 0 0-1.4l-1.6-1.6zm-8.4 9.8l-1.4-1.4 3.5-3.5 1.4 1.4-3.5 3.5zM4.3 2.3a1 1 0 0 0-1.4 0l-1.6 1.6a1 1 0 0 0 0 1.4l4.9 4.9-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0l1.4-1.4 6.6 6.6-.5 1.6.8.8 2.3-2.3 3.2 3.2 1.4-1.4-3.2-3.2 2.3-2.3-.8-.8-1.6.5-6.6-6.6 1.4-1.4a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 0l-1.4 1.4-4.9-4.9zm5.6 5.6l1.4 1.4-3.5 3.5-1.4-1.4 3.5-3.5z"/></svg> DESAFIAR</button></div>';
            }).join('');

            content.innerHTML = '<div class="pvp-select-container">' +
                '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem;">' +
                '<button class="glow-button" onclick="app.showChallengeSelector()" style="font-size:0.75rem;padding:0.4rem 1.2rem">◀ VOLTAR</button>' +
                '</div>' +
                '<div class="pvp-select-header-box" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">' +
                '<div>' +
                '<h3 class="pvp-select-title">DESAFIAR EM: ' + (chapter ? chapter.title.toUpperCase() : '') + '</h3>' +
                '<p class="pvp-select-subtitle">Selecione o adversário ou inicie uma batalha rápida instantânea:</p>' +
                '</div>' +
                '<button class="glow-button accent" style="font-size:0.82rem;padding:0.6rem 1.4rem;display:inline-flex;align-items:center;gap:0.5rem;box-shadow:0 0 15px rgba(245,158,11,0.3);" onclick="app.sendRandomChallenge(' + chapterId + ')">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>' +
                'OPONENTE ALEATÓRIO</button>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;width:100%;">' + (playerList || '<p class="pvp-empty">Nenhum colega encontrado.</p>') + '</div>' +
                '</div>';
        } catch (e) { console.error(e); this.ui.showToast('Erro ao buscar jogadores', 'error'); }
    }

    async sendRandomChallenge(chapterId) {
        if (typeof rankedManager === 'undefined') return;
        try {
            this.ui.showToast('Sorteando oponente da guilda...', 'info');
            var players = await rankedManager.searchPlayers('');
            if (!players || players.length === 0) {
                this.ui.showToast('Nenhum colega disponível para duelo no momento.', 'error');
                return;
            }
            const randomIndex = Math.floor(Math.random() * players.length);
            const opponent = players[randomIndex];
            const targetUid = opponent.uid;
            const targetName = opponent.displayName || 'Jogador Misterioso';

            this.ui.showToast(`Adversário selecionado: ${targetName}! Iniciando Coliseu...`, 'success');
            await this.sendChallenge(targetUid, targetName, chapterId);
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao sortear oponente aleatório', 'error');
        }
    }

    async sendChallenge(targetUid, targetName, chapterId) {
        try {
            const challengeId = await rankedManager.createChallenge(targetUid, targetName, chapterId);
            if (!challengeId) {
                this.ui.showToast('Erro ao criar desafio', 'error');
                return;
            }
            this.ui.showToast('Desafio forjado! Inicie sua rodada contra o tempo!', 'info');
            await this.startPvPDuelRunner(challengeId, true);
        } catch (e) { console.error(e); this.ui.showToast('Erro ao enviar desafio', 'error'); }
    }

    async declineChallenge(challengeId) {
        if (typeof rankedManager === 'undefined') return;
        try {
            const ok = await rankedManager.declineChallenge(challengeId);
            if (ok) {
                this.ui.showToast('Desafio recusado e removido com sucesso.', 'info');
                this.openRanked();
            } else {
                this.ui.showToast('Não foi possível recusar o desafio.', 'error');
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao recusar desafio', 'error');
        }
    }

    async acceptChallenge(challengeId) {
        if (typeof rankedManager === 'undefined') return;
        try {
            var challenges = await rankedManager.getPendingChallenges();
            var challenge = challenges.find(function(c) { return c.id === challengeId; });
            if (!challenge && typeof fbDB !== 'undefined') {
                // Tenta buscar diretamente do banco Firestore
                const docSnap = await fbDB.collection('challenges').doc(challengeId).get();
                if (docSnap.exists) {
                    challenge = { id: docSnap.id, ...docSnap.data() };
                }
            }
            if (!challenge) { this.ui.showToast('Desafio não encontrado', 'error'); return; }
            this.ui.showToast('Duelo aceito! Resolva os desafios o mais rápido possível!', 'info');
            await this.startPvPDuelRunner(challengeId, false, challenge);
        } catch (e) { console.error(e); this.ui.showToast('Erro ao aceitar desafio', 'error'); }
    }

    // ═══ PVP DUEL RUNNER (ARENA DE DUELO ASSÍNCRONO) ═══
    async startPvPDuelRunner(challengeId, isChallenger, cachedChallenge = null) {
        let challenge = cachedChallenge;
        if (!challenge) {
            if (typeof fbDB !== 'undefined') {
                const docSnap = await fbDB.collection('challenges').doc(challengeId).get();
                if (docSnap.exists) {
                    challenge = { id: docSnap.id, ...docSnap.data() };
                }
            }
        }

        if (!challenge) {
            this.ui.showToast('Desafio não encontrado.', 'error');
            return;
        }

        let activities = challenge.activities || [];
        
        // Fallback dinâmico caso o desafio antigo/existente no Firestore não contenha o array 'activities'
        if (!activities || activities.length === 0) {
            const chapterId = challenge.chapterId || 1;
            const isCSharp = (challenge.worldId === 'csharp_unity') || 
                             (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                             (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
            const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
            const chapter = activeList.find(c => c.id === chapterId) || activeList[0] || { id: 1, title: 'Fundamentos', activities: [] };

            activities = [];
            const chActs = chapter.activities || [];
            for (let i = 0; i < Math.min(2, chActs.length); i++) {
                const a = chActs[i];
                activities.push({
                    id: a.id || `pvp_ch_${chapterId}_act_${i + 1}`,
                    title: a.title ? `[Capítulo] ${a.title}` : `Desafio ${i + 1}`,
                    description: a.description || 'Complete a tarefa de código.',
                    starterCode: a.starterCode || '',
                    tests: a.tests || [],
                    hints: a.hints || [],
                    source: 'chapter'
                });
            }

            let abyssQuest = null;
            if (typeof this.getAbyssQuestsForFloor === 'function') {
                const quests = this.getAbyssQuestsForFloor(chapterId);
                if (quests && quests.length > 0) abyssQuest = quests[0];
            } else if (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) {
                abyssQuest = SIDE_QUESTS[chapterId][0];
            }

            if (abyssQuest) {
                activities.push({
                    id: abyssQuest.id || `pvp_abyss_${chapterId}`,
                    title: `[Abismo] ${abyssQuest.title || 'Masmorra do Código'}`,
                    description: abyssQuest.description || 'Sobreviva ao teste do Abismo.',
                    starterCode: abyssQuest.starterCode || '',
                    tests: abyssQuest.tests || [],
                    hints: abyssQuest.hints || [],
                    source: 'abyss'
                });
            }

            if (activities.length === 0) {
                this.ui.showToast('Nenhum desafio encontrado para este duelo.', 'error');
                return;
            }
        }

        this.currentPvPChallenge = {
            challengeId: challenge.id || challengeId,
            isChallenger: !!isChallenger,
            data: challenge,
            activities: activities,
            currentIdx: 0,
            startTime: Date.now(),
            hits: 0,
            errors: 0,
            submittedCodes: []
        };

        this.renderPvPActivity();
    }

    renderPvPActivity() {
        const pvp = this.currentPvPChallenge;
        if (!pvp) return;

        const curAct = pvp.activities[pvp.currentIdx];
        if (!curAct) return;

        this.ui.showScreen('activity');

        this.activityContext = {
            mode: 'pvp',
            challengeId: pvp.challengeId,
            activityIndex: pvp.currentIdx,
            data: curAct,
            isChallenger: pvp.isChallenger
        };

        const isCSharp = (pvp.data && pvp.data.worldId === 'csharp_unity') ||
                         (this.ui && typeof this.ui.isCSharpWorld === 'function' && this.ui.isCSharpWorld(curAct.starterCode || ''));

        // Configura título do Duelo
        const opponentName = (pvp.isChallenger ? (pvp.data && pvp.data.targetName) : (pvp.data && pvp.data.challengerName)) || 'Oponente';
        const titleEl = document.getElementById('activity-title-display');
        if (titleEl) {
            titleEl.textContent = `DUELO PVP vs ${opponentName.toUpperCase()} — DESAFIO ${pvp.currentIdx + 1}/${pvp.activities.length}`;
        }

        // Badge de Dificuldade / Modo
        const diffBadge = document.getElementById('activity-difficulty');
        if (diffBadge) {
            diffBadge.textContent = curAct.source === 'abyss' ? 'ABISMO' : 'CAPÍTULO';
            diffBadge.className = `difficulty-badge ${curAct.source === 'abyss' ? 'hard' : 'medium'}`;
        }

        // Botão voltar com confirmação
        const backBtn = document.getElementById('btn-back-chapter');
        const backLabel = document.getElementById('btn-back-activity-label');
        if (backLabel) backLabel.textContent = 'DUELO PVP';
        if (backBtn) {
            backBtn.onclick = () => {
                if (confirm('Deseja desistir do duelo? Sair agora concederá a vitória ao seu oponente.')) {
                    if (this._pvpTimerInterval) {
                        clearInterval(this._pvpTimerInterval);
                        this._pvpTimerInterval = null;
                    }
                    if (typeof rankedManager !== 'undefined' && rankedManager.forfeitChallenge) {
                        rankedManager.forfeitChallenge(pvp.challengeId, typeof authManager !== 'undefined' && authManager.currentUser?.uid);
                    }
                    this.openRanked();
                }
            };
        }

        // Timer de duelo contínuo
        const timerContainer = document.getElementById('activity-abyss-timer');
        const timerText = document.getElementById('activity-abyss-countdown-text');
        if (timerContainer && timerText) {
            timerContainer.classList.remove('hidden');
            if (this._pvpTimerInterval) clearInterval(this._pvpTimerInterval);

            const updateTimerDisplay = () => {
                const elapsedSec = Math.floor((Date.now() - pvp.startTime) / 1000);
                const m = Math.floor(elapsedSec / 60);
                const s = elapsedSec % 60;
                timerText.textContent = `TEMPO DE DUELO: ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            };
            updateTimerDisplay();
            this._pvpTimerInterval = setInterval(updateTimerDisplay, 1000);
        }

        // Monta Saída Esperada (Casos de teste)
        let expectedHtml = '';
        if (curAct.tests && curAct.tests.length > 0) {
            const hasNewlines = curAct.tests.some(t => String(t.expected || '').includes('\n'));
            expectedHtml = `
                <div class="expected-output-box" style="border-left-color:var(--purple-bright);margin-top:1rem;">
                    <div class="expected-output-header">
                        <div class="expected-output-title" style="color:var(--purple-bright);">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            SAÍDA EXATA EXIGIDA PARA PONTUAR
                        </div>
                        <span class="expected-output-badge ${hasNewlines ? 'multiline' : 'singleline'}">
                            ${hasNewlines ? 'LINHAS SEPARADAS (\\n)' : 'MESMA LINHA'}
                        </span>
                    </div>
                    <div class="expected-tests-list">
                        ${curAct.tests.map((t, idx) => `
                            <div class="expected-test-item">
                                <div class="expected-test-meta">
                                    <span><strong style="color:var(--cyan);">Caso ${idx + 1}:</strong> ${t.description || ''}</span>
                                    ${t.input ? `<span>Entrada: <code style="color:#fff;background:rgba(255,255,255,0.08);padding:0.1rem 0.3rem;border-radius:3px;">${t.input}</code></span>` : '<span style="color:var(--text-dim);">(sem entrada)</span>'}
                                </div>
                                <pre class="expected-preview-pre">${t.expected}</pre>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Renderiza Statement do Problema
        const probSection = document.getElementById('problem-section');
        if (probSection) {
            probSection.innerHTML = `
                <div class="problem-statement">
                    <div class="step-indicator" style="color:var(--gold);border-color:var(--gold);padding:0.2rem 0.6rem;border:1px solid var(--gold);display:inline-block;border-radius:3px;font-size:0.75rem;font-weight:700;">
                        DUELO PVP — DESAFIO ${pvp.currentIdx + 1} DE ${pvp.activities.length} (${curAct.source === 'abyss' ? 'ABISMO' : 'CAPÍTULO'})
                    </div>
                    <div class="problem-title" style="margin-top:0.6rem;font-size:1.15rem;font-weight:700;color:var(--text-primary);">${curAct.title}</div>
                    <p style="color:var(--text-secondary);margin:0.8rem 0;line-height:1.6;font-size:0.88rem;">${curAct.description}</p>
                    ${expectedHtml}
                </div>
            `;
        }

        // Configura Editor de Código
        const defaultStarter = isCSharp
            ? 'using UnityEngine;\n\npublic class PvpChallenge : MonoBehaviour {\n    void Start() {\n        \n    }\n}'
            : '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}';

        const editorTab = document.querySelector('.activity-workspace-row .editor-tab');
        if (editorTab) {
            editorTab.textContent = isCSharp ? 'Script.cs' : 'main.c';
        }

        const editor = document.getElementById('activity-editor');
        if (editor) {
            editor.value = curAct.starterCode || defaultStarter;
            this.ui.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
        }

        // Terminal Prompt
        document.getElementById('activity-terminal-output').innerHTML = `<div class="terminal-line system">[ SISTEMA ] Arena PvP iniciada. Resolva o desafio ${pvp.currentIdx + 1}/${pvp.activities.length} o mais rápido possível!</div>`;
        document.getElementById('activity-test-results').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Clique em "Submeter" para validar todos os casos de teste e avançar.</div>';

        // Dicas do GM
        this.ui.hintLevel = 0;
        this.ui.renderHints(curAct);
        this.ui.setupTerminalTabs();
        this.ui.setupNotepad();

        // Botões Reset, Executar e Submeter
        const resetBtn = document.getElementById('btn-reset-activity');
        if (resetBtn) {
            resetBtn.onclick = () => {
                if (editor) {
                    editor.value = curAct.starterCode || defaultStarter;
                    this.ui.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
                }
            };
        }

        const runBtn = document.getElementById('btn-run-activity');
        if (runBtn) {
            runBtn.onclick = () => this.runPvPCode();
        }

        const submitBtn = document.getElementById('btn-submit-activity');
        if (submitBtn) {
            submitBtn.onclick = () => this.submitPvPActivity();
        }
    }

    runPvPCode() {
        const editor = document.getElementById('activity-editor');
        const term = document.getElementById('activity-terminal-output');
        if (!editor || !term) return;

        const code = editor.value;
        term.innerHTML = '<div class="terminal-line system">[ EXECUTANDO CÓDIGO NO COLISSEUM... ]</div>';

        try {
            const isCSharp = this.ui && typeof this.ui.isCSharpWorld === 'function' && this.ui.isCSharpWorld(code);
            let res = null;
            if (isCSharp && typeof CSharpInterpreter !== 'undefined') {
                const interp = new CSharpInterpreter();
                res = interp.execute(code);
            } else if (typeof CInterpreter !== 'undefined') {
                const interp = new CInterpreter();
                res = interp.execute(code);
            }

            if (res && res.output) {
                term.innerHTML = `<div class="terminal-line">${res.output}</div>`;
            } else if (res && res.errors && res.errors.length > 0) {
                term.innerHTML = `<div class="terminal-line error">[ ERRO ] ${res.errors.join('\n')}</div>`;
            } else {
                term.innerHTML = '<div class="terminal-line system">[ CÓDIGO EXECUTADO (SEM SAÍDA) ]</div>';
            }
        } catch (e) {
            term.innerHTML = `<div class="terminal-line error">[ ERRO ] ${e.message}</div>`;
        }
    }

    async submitPvPActivity() {
        const pvp = this.currentPvPChallenge;
        if (!pvp) return;

        const curAct = pvp.activities[pvp.currentIdx];
        const editor = document.getElementById('activity-editor');
        const term = document.getElementById('activity-terminal-output');
        const testResEl = document.getElementById('activity-test-results');
        if (!editor || !curAct) return;

        const code = editor.value;

        // Validação completa de casos de teste
        let passed = false;
        let errorsList = [];

        if (this.ui && this.ui.missionValidator && curAct.tests && curAct.tests.length > 0) {
            const vRes = this.ui.missionValidator.validateActivity(code, curAct);
            passed = vRes.pass;
            errorsList = vRes.errors || [];
        } else if (typeof this.ui.checkActivity === 'function') {
            passed = this.ui.checkActivity(code);
        }

        if (!passed) {
            pvp.errors = (pvp.errors || 0) + 1;
            if (window.soundFX && typeof window.soundFX.playCheckCodeError === 'function') {
                window.soundFX.playCheckCodeError();
            }
            if (testResEl) {
                testResEl.innerHTML = `
                    <div class="terminal-line error">[ FALHA NA VALIDAÇÃO ] O código não cumpriu todos os casos de teste:</div>
                    ${errorsList.map(err => `<div class="terminal-line error">▸ ${err}</div>`).join('')}
                `;
            }
            this.ui.showToast('Código incorreto! Corrija os erros para pontuar no duelo.', 'error');
            return;
        }

        // Acerto registrado!
        pvp.hits = (pvp.hits || 0) + 1;
        pvp.submittedCodes.push(code);

        if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
            window.soundFX.playCheckCodeSuccess();
        }

        if (testResEl) {
            testResEl.innerHTML = '<div class="terminal-line success">[ SUCESSO ] Desafio validado com perfeição!</div>';
        }

        this.ui.showToast(`Desafio ${pvp.currentIdx + 1}/${pvp.activities.length} concluído!`, 'success');

        // Avança para o próximo desafio do duelo
        pvp.currentIdx++;

        if (pvp.currentIdx < pvp.activities.length) {
            setTimeout(() => {
                this.renderPvPActivity();
            }, 800);
        } else {
            // Concluiu todos os desafios do Duelo!
            await this.completePvPDuel();
        }
    }

    async completePvPDuel() {
        const pvp = this.currentPvPChallenge;
        if (!pvp) return;

        if (this._pvpTimerInterval) {
            clearInterval(this._pvpTimerInterval);
            this._pvpTimerInterval = null;
        }

        const totalTimeMs = Math.max(1000, Date.now() - pvp.startTime);
        const allCodes = pvp.submittedCodes.join('\n\n// --- PROXIMO DESAFIO ---\n\n');
        const stats = {
            hits: pvp.hits || pvp.activities.length,
            errors: pvp.errors || 0
        };

        try {
            this.ui.showToast('Computando pontuação e finalizando duelo...', 'info');

            if (pvp.isChallenger) {
                // Desafiante concluiu sua rodada inicial
                const evalRes = await rankedManager.submitChallengerCode(pvp.challengeId, allCodes, totalTimeMs, stats);
                this.ui.showToast('Rodada enviada com sucesso! Aguarde o adversário aceitar o desafio.', 'success');
                
                // Exibe modal com estatísticas da rodada do desafiante
                this.showPvPEndResultModal({
                    mode: 'challenger_submitted',
                    challenge: pvp.data,
                    stats: evalRes,
                    timeMs: totalTimeMs,
                    hits: stats.hits,
                    errors: stats.errors
                });
            } else {
                // Desafiado concluiu -> Duelo resolvido e vencedor determinado
                const result = await rankedManager.submitTargetCode(pvp.challengeId, allCodes, totalTimeMs, stats);
                
                // Busca desafio atualizado
                const docSnap = await fbDB.collection('challenges').doc(pvp.challengeId).get();
                const updatedChallenge = docSnap.exists ? docSnap.data() : pvp.data;

                this.showPvPEndResultModal({
                    mode: 'duel_finished',
                    challenge: updatedChallenge,
                    result: result,
                    timeMs: totalTimeMs,
                    hits: stats.hits,
                    errors: stats.errors
                });
            }
        } catch (e) {
            console.error('completePvPDuel error:', e);
            this.ui.showToast('Erro ao submeter resultado do duelo', 'error');
            this.openRanked();
        } finally {
            this.currentPvPChallenge = null;
        }
    }

    showPvPEndResultModal(info) {
        let overlay = document.getElementById('modal-pvp-result-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'modal-pvp-result-overlay';
            overlay.className = 'tournament-result-overlay';
            document.body.appendChild(overlay);
        }

        const isFinished = info.mode === 'duel_finished';
        const won = isFinished ? (info.result && info.result.won) : true;
        const totalSec = Math.round((info.timeMs || 0) / 1000);
        const m = Math.floor(totalSec / 60);
        const s = totalSec % 60;
        const timeStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        if (isFinished && won) {
            if (window.soundFX && typeof window.soundFX.playFanfare === 'function') window.soundFX.playFanfare();
        } else if (isFinished && !won) {
            if (window.soundFX && typeof window.soundFX.playError === 'function') window.soundFX.playError();
        }

        const swordsSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;color:var(--gold);"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 17.5L21 6V3h-3L6.5 14.5"/><path d="M11 19l-6-6"/><path d="M8 16l-4 4"/><path d="M5 21l-2-2"/></svg>`;
        const trophySvg = `<svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 20px rgba(245,158,11,0.6));"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-2c-.55 0-1-.45-1-1v-2.34"/><path d="M6 4h12a2 2 0 0 1 2 2v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2z"/></svg>`;
        const defeatSvg = `<svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 20px rgba(239,68,68,0.6));"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 17.5L21 6V3h-3L6.5 14.5"/><path d="M11 19l-6-6"/><path d="M8 16l-4 4"/><path d="M5 21l-2-2"/></svg>`;

        overlay.innerHTML = `
            <div class="result-box ${(!isFinished || won) ? 'result-box-victory' : 'result-box-defeat'}">
                <div class="result-glow"></div>
                <div class="result-badge ${(!isFinished || won) ? 'victory' : 'defeat'}" style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
                    ${swordsSvg} <span>[ ${!isFinished ? 'DESAFIO ENVIADO' : (won ? 'VITÓRIA NO DUELO' : 'DERROTA NO DUELO')} ]</span> ${swordsSvg}
                </div>
                
                <div class="result-icon-container" style="display:flex;justify-content:center;align-items:center;margin:0.8rem 0;">
                    <div class="${(!isFinished || won) ? 'result-trophy-anim' : 'result-defeat-anim'}">
                        ${(!isFinished || won) ? trophySvg : defeatSvg}
                    </div>
                </div>

                <h2 class="result-main-title ${(!isFinished || won) ? 'gold-text' : 'red-text'}">
                    ${!isFinished ? 'RODADA CONCLUÍDA!' : (won ? 'VOCÊ VENCEU O DUELO!' : 'VOCÊ FOI SUPERADO!')}
                </h2>

                <p class="result-subtitle">
                    ${!isFinished 
                        ? `Seu tempo e código foram registrados. O desafio foi enviado para <b>${info.challenge.targetName || 'Adversário'}</b>!` 
                        : (won 
                            ? `Excelente velocidade e precisão de código! O Coliseu curva-se perante sua maestria.` 
                            : `Seu oponente foi mais veloz ou preciso nesta rodada. Treine no Abismo e desafie-o novamente!`)}
                </p>

                <div class="result-stats-card">
                    <div class="result-stat">
                        <span class="stat-lbl">ACERTOS</span>
                        <span class="stat-num green-text">${info.hits || 0}</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-lbl">ERROS / TENTATIVAS</span>
                        <span class="stat-num ${info.errors > 0 ? 'red-text' : 'cyan-text'}">${info.errors || 0}</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-lbl">TEMPO TOTAL</span>
                        <span class="stat-num gold-text">${timeStr}</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-lbl">STATUS</span>
                        <span class="stat-num ${(!isFinished || won) ? 'green-text' : 'red-text'}">${!isFinished ? 'ENVIADO' : (won ? 'VITÓRIA' : 'DERROTA')}</span>
                    </div>
                </div>

                <div class="result-actions" style="justify-content:center;margin-top:1.5rem;">
                    <button class="glow-button primary pulse-action" style="padding:0.7rem 2.2rem;" onclick="document.getElementById('modal-pvp-result-overlay').classList.remove('active');app.openRanked();">
                        RETORNAR AO COLISEU PVP
                    </button>
                </div>
            </div>
        `;

        overlay.classList.add('active');
    }

    // == CREATE TOURNAMENT ==
    async createTournament() {
        if (typeof tournamentManager === 'undefined') return;
        var content = document.getElementById('tournament-content');
        if (!content) return;
        const isCSharp = (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : CHAPTERS;

        var chapterChecks = activeList.map(function(ch) {
            return '<label class="tournament-check-label" style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0.6rem;background:var(--bg-deep);border:1px solid var(--border-dim);border-radius:3px;font-size:0.75rem;cursor:pointer;">'
            + '<input type="checkbox" value="' + ch.id + '" class="tournament-chapter-check">'
            + '<span>CAP ' + String(ch.id).padStart(2, '0') + ' — ' + ch.title + ' (' + (ch.activities ? ch.activities.length : 3) + ' atv)</span>'
            + '</label>';
        }).join('');
        content.innerHTML = '<div class="tournament-screen">'
            + '<div class="tournament-header">'
            + '<div class="tournament-header-info">'
            + '<h2 class="tournament-title">FORJAR SALA DE TORNEIO</h2>'
            + '<p class="tournament-subtitle">Configure os parâmetros da batalha em tempo real para os membros da Guilda.</p>'
            + '</div>'
            + '<button class="glow-button tournament-back-btn" onclick="app.openTournaments()">◀ VOLTAR</button>'
            + '</div>'
            + '<div class="tournament-form hud-panel" style="display:flex;flex-direction:column;gap:1.2rem;max-width:800px;margin:0 auto;background:var(--bg-panel);border:1px solid var(--border-dim);padding:1.8rem;border-radius:4px;">'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">NOME DO TORNEIO</label>'
            + '<input type="text" id="tournament-name" class="settings-input" placeholder="Ex: Torneio Semanal — Batalha dos Algoritmos" maxlength="40">'
            + '</div>'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">SELECIONAR ASSUNTOS (CAPÍTULOS)</label>'
            + '<div class="tournament-checks" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:0.5rem;max-height:220px;overflow-y:auto;padding:0.6rem;background:var(--bg-deep);border:1px solid var(--border-ghost);border-radius:3px;">' + chapterChecks + '</div>'
            + '</div>'
            + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;">'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">TEMPO LIMITE (MINUTOS)</label>'
            + '<input type="number" id="tournament-time" class="settings-input" value="15" min="5" max="180">'
            + '</div>'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">DESAFIOS POR ASSUNTO</label>'
            + '<select id="tournament-challenges-count" class="settings-input" style="cursor:pointer;">'
            + '<option value="1">1 desafio por capítulo</option>'
            + '<option value="2" selected>2 desafios por capítulo</option>'
            + '<option value="3">Todos os desafios (3 por capítulo)</option>'
            + '</select>'
            + '</div>'
            + '</div>'
            + '<button class="glow-button primary pulse-action" style="padding:0.75rem;margin-top:0.5rem;font-weight:700;font-size:0.85rem;" onclick="app.submitCreateTournament()">⚔ CRIAR SALA DE TORNEIO</button>'
            + '</div>'
            + '</div>';
    }

    async submitCreateTournament() {
        var name = document.getElementById('tournament-name').value.trim();
        var timeLimit = parseInt(document.getElementById('tournament-time').value) || 15;
        var countPerCh = parseInt(document.getElementById('tournament-challenges-count').value) || 2;
        var checks = document.querySelectorAll('.tournament-chapter-check:checked');
        var chapterIds = Array.from(checks).map(function(c) { return parseInt(c.value); });
        if (!name) { this.ui.showToast('Digite um nome para o torneio', 'error'); return; }
        if (chapterIds.length === 0) { this.ui.showToast('Selecione pelo menos um capítulo', 'error'); return; }
        try {
            const isCSharp = (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                             (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
            const worldId = isCSharp ? 'csharp_unity' : 'c_lang';
            var id = await tournamentManager.create(name, chapterIds, timeLimit, countPerCh, worldId);
            this.ui.showToast('Sala de torneio criada!', 'success');
            this.openTournamentLobby(id);
        } catch (e) { console.error(e); this.ui.showToast('Erro ao criar torneio', 'error'); }
    }

    async openEditTournament(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        var content = document.getElementById('tournament-content');
        if (!content) return;
        this.ui.showScreen('tournament');

        const renderEditForm = (t) => {
            var selectedIds = t.chapterIds || [];
            const isCSharp = (t.worldId === 'csharp_unity') ||
                             (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                             (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
            const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : CHAPTERS;

            var chapterChecks = activeList.map(function(ch) {
                var isChecked = selectedIds.includes(ch.id) ? 'checked' : '';
                return '<label class="tournament-check-label" style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0.6rem;background:var(--bg-deep);border:1px solid var(--border-dim);border-radius:3px;font-size:0.75rem;cursor:pointer;">'
                + '<input type="checkbox" value="' + ch.id + '" class="tournament-chapter-check-edit" ' + isChecked + '>'
                + '<span>CAP ' + String(ch.id).padStart(2, '0') + ' — ' + ch.title + ' (' + (ch.activities ? ch.activities.length : 3) + ' atv)</span>'
                + '</label>';
            }).join('');

            content.innerHTML = '<div class="tournament-screen">'
                + '<div class="tournament-header">'
                + '<div class="tournament-header-info">'
                + '<h2 class="tournament-title">EDITAR SALA DE TORNEIO</h2>'
                + '<p class="tournament-subtitle">Ajuste os assuntos, tempo limite e quantidade de desafios desta sala.</p>'
                + '</div>'
                + '<button class="glow-button tournament-back-btn" onclick="app.openTournaments()">◀ VOLTAR</button>'
                + '</div>'
                + '<div class="tournament-form hud-panel" style="display:flex;flex-direction:column;gap:1.2rem;max-width:800px;margin:0 auto;background:var(--bg-panel);border:1px solid var(--border-dim);padding:1.8rem;border-radius:4px;">'
                + '<div class="tournament-form-group">'
                + '<label class="settings-label">NOME DO TORNEIO</label>'
                + '<input type="text" id="tournament-edit-name" class="settings-input" value="' + (t.title || '').replace(/"/g, '&quot;') + '" maxlength="40">'
                + '</div>'
                + '<div class="tournament-form-group">'
                + '<label class="settings-label">SELECIONAR ASSUNTOS (CAPÍTULOS)</label>'
                + '<div class="tournament-checks" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:0.5rem;max-height:220px;overflow-y:auto;padding:0.6rem;background:var(--bg-deep);border:1px solid var(--border-ghost);border-radius:3px;">' + chapterChecks + '</div>'
                + '</div>'
                + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;">'
                + '<div class="tournament-form-group">'
                + '<label class="settings-label">TEMPO LIMITE (MINUTOS)</label>'
                + '<input type="number" id="tournament-edit-time" class="settings-input" value="' + (t.timeLimit || 15) + '" min="5" max="180">'
                + '</div>'
                + '<div class="tournament-form-group">'
                + '<label class="settings-label">DESAFIOS POR ASSUNTO</label>'
                + '<select id="tournament-edit-challenges-count" class="settings-input" style="cursor:pointer;">'
                + '<option value="1" ' + (t.challengeCountPerChapter === 1 ? 'selected' : '') + '>1 desafio por capítulo</option>'
                + '<option value="2" ' + (!t.challengeCountPerChapter || t.challengeCountPerChapter === 2 ? 'selected' : '') + '>2 desafios por capítulo</option>'
                + '<option value="3" ' + (t.challengeCountPerChapter === 3 ? 'selected' : '') + '>Todos os desafios (3 por capítulo)</option>'
                + '</select>'
                + '</div>'
                + '</div>'
                + '<div style="display:flex;gap:0.8rem;margin-top:0.5rem;">'
                + '<button class="glow-button primary pulse-action" style="flex:1;padding:0.75rem;font-weight:700;" onclick="app.submitEditTournament(\'' + tournamentId + '\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> SALVAR ALTERAÇÕES</button>'
                + '<button class="glow-button" style="padding:0.75rem 1.8rem;" onclick="app.openTournaments()">CANCELAR</button>'
                + '</div>'
                + '</div>'
                + '</div>';
        };

        var cached = (this._cachedTournaments && this._cachedTournaments.find(tor => tor.id === tournamentId)) || tournamentManager.currentTournament;
        if (cached && cached.id === tournamentId) {
            renderEditForm(cached);
        } else {
            content.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--gold);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO DADOS DO TORNEIO...</div></div>';
            try {
                var doc = await fbDB.collection('tournaments').doc(tournamentId).get();
                if (!doc.exists) {
                    this.ui.showToast('Torneio não encontrado', 'error');
                    this.openTournaments();
                    return;
                }
                renderEditForm({ id: doc.id, ...doc.data() });
            } catch (e) {
                console.error(e);
                this.ui.showToast('Erro ao carregar dados do torneio', 'error');
                this.openTournaments();
            }
        }
    }

    async submitEditTournament(tournamentId) {
        var name = document.getElementById('tournament-edit-name').value.trim();
        var timeLimit = parseInt(document.getElementById('tournament-edit-time').value) || 15;
        var countPerCh = parseInt(document.getElementById('tournament-edit-challenges-count').value) || 2;
        var checks = document.querySelectorAll('.tournament-chapter-check-edit:checked');
        var chapterIds = Array.from(checks).map(function(c) { return parseInt(c.value); });
        if (!name) { this.ui.showToast('Digite um nome para o torneio', 'error'); return; }
        if (chapterIds.length === 0) { this.ui.showToast('Selecione pelo menos um capítulo', 'error'); return; }
        try {
            await tournamentManager.edit(tournamentId, name, chapterIds, timeLimit, countPerCh);
            this.ui.showToast('Torneio atualizado com sucesso!', 'success');
            this.openTournaments();
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao salvar alterações', 'error');
        }
    }

    async confirmDeleteTournament(tournamentId, title) {
        var ok = confirm('Tem certeza que deseja excluir o torneio "' + (title || 'Torneio') + '" permanentemente?');
        if (!ok) return;
        try {
            await tournamentManager.delete(tournamentId);
            this.ui.showToast('Torneio excluído com sucesso!', 'info');
            this.openTournaments();
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao excluir torneio', 'error');
        }
    }

    // == TOURNAMENT LOBBY ==
    async openTournamentLobby(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        var content = document.getElementById('tournament-content');
        if (!content) return;
        this.ui.showScreen('tournament');

        // 1. Instant 0ms render if data is in memory / cache
        var cached = (this._cachedTournaments && this._cachedTournaments.find(tor => tor.id === tournamentId)) || tournamentManager.currentTournament;
        if (cached && cached.id === tournamentId) {
            this.currentTournamentData = cached;
            tournamentManager.currentTournament = cached;
            this.renderTournamentLobby(cached);
        } else {
            content.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--gold);font-size:0.85rem;letter-spacing:0.12em;">ENTRANDO NA SALA DE BATALHA...</div></div>';
        }

        // 2. Real-time stream updates
        tournamentManager.listenLeaderboard(tournamentId, (data) => {
            if (!data) return;
            this.currentTournamentData = data;

            // Se a arena do torneio já está renderizada e ativa na tela, NUNCA resetamos o DOM
            // Isso evita que a submissão ou pontuação de um participante apague o código digitado pelos outros!
            const editorEl = document.getElementById('tournament-code-editor');
            const arenaEl = document.querySelector('.tournament-arena-container');
            const isCurrentlyActiveScreen = (data.status === 'active' || data.status === 'paused') && arenaEl && editorEl;

            if (isCurrentlyActiveScreen && this._renderedTournamentId === data.id && this._renderedTournamentStatus === data.status) {
                const lbEl = document.getElementById('tournament-live-leaderboard');
                if (lbEl) {
                    lbEl.innerHTML = this.renderLiveLeaderboardHtml(data.participants || []);
                }
                return;
            }

            this._renderedTournamentId = data.id;
            this._renderedTournamentStatus = data.status;
            this.renderTournamentLobby(data);
        });
    }

    renderLiveLeaderboardHtml(participants) {
        const list = Array.isArray(participants) ? [...participants] : [];
        list.sort((a, b) => (b.score || 0) - (a.score || 0));

        const prevRanks = this._prevTournamentRanks || {};
        const currentRanks = {};
        list.forEach((p, i) => {
            currentRanks[p.uid] = i + 1;
        });

        const currentUid = typeof authManager !== 'undefined' ? authManager.currentUser?.uid : null;
        const html = list.map((p, i) => {
            const rank = i + 1;
            const prevRank = prevRanks[p.uid];
            const isMe = p.uid === currentUid;
            const overtaked = prevRank !== undefined && rank < prevRank;
            const dropped = prevRank !== undefined && rank > prevRank;
            const overtakeBadge = overtaked ? `<span class="rank-overtake-badge" style="color:var(--green);font-size:0.68rem;margin-left:0.3rem;animation:pulseGlow 1s infinite;">▲ +${prevRank - rank}</span>` : (dropped ? `<span style="color:var(--red);font-size:0.68rem;margin-left:0.3rem;">▼</span>` : '');
            
            return '<div class="leaderboard-item-row ' + (overtaked ? 'row-overtake-anim' : '') + '" style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.7rem;background:' + (isMe ? 'rgba(139, 92, 246, 0.18)' : 'var(--bg-deep)') + ';border:1px solid ' + (overtaked ? 'var(--green)' : (isMe ? 'var(--purple-bright)' : 'var(--border-ghost)')) + ';border-radius:3px;font-size:0.75rem;transition:all 0.4s ease;box-shadow:' + (overtaked ? '0 0 15px rgba(74, 222, 128, 0.4)' : 'none') + ';">'
                + '<div style="display:flex;align-items:center;gap:0.3rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'
                + '<span style="font-weight:700;color:' + (rank === 1 ? 'var(--gold)' : (rank === 2 ? '#C0C0C0' : (rank === 3 ? '#CD7F32' : 'var(--text-dim)'))) + ';">' + rank + '°</span> '
                + '<span style="font-weight:600;color:' + (isMe ? 'var(--purple-bright)' : 'var(--text-primary)') + ';">' + (p.name || 'Jogador') + '</span>'
                + overtakeBadge
                + '</div>'
                + '<span style="font-family:var(--font-code);color:var(--gold);font-weight:bold;">' + (p.score || 0) + ' pts</span>'
                + '</div>';
        }).join('');

        this._prevTournamentRanks = currentRanks;
        return html;
    }

    renderTournamentLobby(t) {
        var content = document.getElementById('tournament-content');
        if (!content) return;
        var isTeacher = typeof authManager !== 'undefined' && authManager.isTeacher();
        var participants = t.participants || [];
        var statusLabel = t.status === 'waiting' ? 'AGUARDANDO INÍCIO' : t.status === 'active' ? 'BATALHA EM ANDAMENTO' : 'TORNEIO ENCERRADO';
        var statusClass = t.status === 'waiting' ? 'waiting' : t.status === 'active' ? 'active' : 'ended';

        // Clean up previous tournament interval if any
        if (this.tournamentTimerInterval) {
            clearInterval(this.tournamentTimerInterval);
            this.tournamentTimerInterval = null;
        }

        var participantsHtml = participants.map(function(p) {
            var avatarSrc = p.photoURL;
            var level = p.level || 1;
            var completedChapters = p.completedChapters || 0;
            var power = p.power !== undefined ? p.power : Math.round((completedChapters / 15) * 100);
            var email = p.email || 'aluno@guildcode.com';

            return '<div class="tournament-participant-card" style="padding:0.9rem 1.1rem;background:var(--bg-panel);border:1px solid var(--border-dim);border-radius:6px;display:flex;align-items:center;gap:0.9rem;justify-content:space-between;cursor:pointer;" onclick="app.openPlayerProfile(\'' + (p.uid || '') + '\')">'
                + '<div style="display:flex;align-items:center;gap:0.8rem;flex:1;min-width:0;">'
                + '<div style="width:36px;height:36px;border-radius:50%;border:1.5px solid var(--purple-bright);overflow:hidden;background:var(--bg-deep);display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
                + (avatarSrc ? '<img src="' + avatarSrc + '" style="width:100%;height:100%;object-fit:cover;">' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--purple-bright)"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>')
                + '</div>'
                + '<div style="min-width:0;flex:1;">'
                + '<div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">'
                + '<span class="tournament-participant-name" style="font-weight:700;color:var(--text-primary);font-size:0.9rem;">' + (p.name || 'Jogador') + '</span>'
                + '<span style="font-size:0.68rem;color:var(--text-dim);">' + email + '</span>'
                + '</div>'
                + '<div style="font-size:0.7rem;color:var(--text-dim);display:flex;gap:0.5rem;margin-top:0.15rem;flex-wrap:wrap;">'
                + '<span style="color:var(--cyan);font-weight:600;">LV. ' + String(level).padStart(2, '0') + '</span> &bull; '
                + '<span>Cap: <strong style="color:var(--text-primary)">' + completedChapters + '/15</strong></span> &bull; '
                + '<span style="color:var(--gold)">Power: <strong>' + power + '%</strong></span>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<span class="tournament-participant-score" style="color:var(--gold);font-family:var(--font-code);font-size:0.85rem;font-weight:700;margin-left:0.5rem;">' + (p.score || 0) + ' pts</span>'
                + '</div>';
        }).join('');

        // Se o torneio NÃO está ativo (aguardando ou encerrado), mostra o Lobby
        if (t.status !== 'active') {
            content.innerHTML = '<div class="tournament-lobby">'
                + '<div class="tournament-header">'
                + '<h2 class="tournament-lobby-title">' + (t.title || 'TORNEIO') + '</h2>'
                + '<span class="tournament-lobby-status ' + statusClass + '">' + statusLabel + '</span>'
                + '</div>'
                + '<div class="tournament-meta">'
                + '<span class="tournament-meta-item">Tempo Limite: ' + (t.timeLimit || 15) + ' min</span>'
                + '<span class="tournament-meta-item">Participantes: ' + participants.length + '</span>'
                + '</div>'
                + '<div class="tournament-participants-list">'
                + (participants.length === 0 ? '<p class="tournament-empty">Aguardando jogadores entrarem...</p>' : participantsHtml)
                + '</div>'
                + (isTeacher && t.status === 'waiting' ? '<div class="tournament-teacher-actions" style="margin-top:1.5rem;"><button class="glow-button primary pulse-action" style="padding:0.7rem 2.5rem;" onclick="app.startTournament()">INICIAR TORNEIO AGORA</button></div>' : '')
                + '</div>';
            return;
        }

        // ══════════════════════════════════════════════════════════════
        // SE O TORNEIO ESTÁ ATIVO: EXIBE A ARENA COMPLETA DE CÓDIGO
        // ══════════════════════════════════════════════════════════════
        var challengesList = [];
        if (t.challenges && t.challenges.length > 0) {
            t.challenges.forEach(function(chGroup) {
                if (chGroup.activities) {
                    chGroup.activities.forEach(function(act) {
                        challengesList.push({
                            ...act,
                            chapterTitle: chGroup.chapterTitle || 'Desafio'
                        });
                    });
                }
            });
        }

        // Desafio atual do usuário
        if (this.currentTournamentActIdx === undefined || this.currentTournamentActIdx >= challengesList.length) {
            this.currentTournamentActIdx = 0;
        }
        var curChallenge = challengesList[this.currentTournamentActIdx] || {
            title: 'Desafio do Torneio',
            description: 'Resolva o problema para pontuar no torneio.',
            starterCode: '#include <stdio.h>\n\nint main() {\n    printf("Ola Mundo\\n");\n    return 0;\n}'
        };

        var isTeacher = typeof authManager !== 'undefined' && authManager.isTeacher();
        var isPaused = t.status === 'paused';
        const isCSharpTour = (t.worldId === 'csharp_unity') ||
                             (this.ui && typeof this.ui.isCSharpWorld === 'function' && this.ui.isCSharpWorld(curChallenge.starterCode || ''));

        const swordIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.4rem;color:var(--gold);"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 17.5L21 6V3h-3L6.5 14.5"/><path d="M11 19l-6-6"/><path d="M8 16l-4 4"/><path d="M5 21l-2-2"/></svg>`;

        // Renderiza a Arena do Torneio
        content.innerHTML = `
            <div class="tournament-arena-container" style="display:flex;flex-direction:column;gap:1rem;width:100%;height:100%;">
                <!-- TOURNAMENT TOP BAR -->
                <div style="display:flex;align-items:center;justify-content:space-between;background:var(--bg-panel);border:1px solid var(--border-dim);padding:0.8rem 1.4rem;border-radius:4px;flex-wrap:wrap;gap:0.8rem;">
                    <div style="display:flex;align-items:center;gap:0.8rem;flex-wrap:wrap;">
                        <span style="font-family:var(--font-display);color:var(--gold);font-size:0.95rem;font-weight:700;display:flex;align-items:center;">${swordIconSvg} ${t.title || 'BATALHA DE TORNEIO'}</span>
                        <span style="color:var(--text-dim);font-size:0.75rem;">[ Desafio ${this.currentTournamentActIdx + 1}/${challengesList.length || 1} ]</span>
                        
                        ${isTeacher ? `
                            <!-- CONTROLES DO PROFESSOR/MESTRE -->
                            <div style="display:inline-flex;gap:0.4rem;margin-left:0.5rem;">
                                <button class="glow-button btn-secondary-sm" style="padding:0.25rem 0.6rem;font-size:0.68rem;border-color:var(--gold);color:var(--gold);" onclick="app.toggleTournamentPause('${t.id}')">
                                    ${isPaused ? '▶ RETOMAR' : '⏸ PAUSAR TODOS'}
                                </button>
                                <button class="glow-button btn-secondary-sm" style="padding:0.25rem 0.6rem;font-size:0.68rem;border-color:var(--cyan);color:var(--cyan);" onclick="app.skipTournamentChallenge('${t.id}')">
                                    ⏭ PULAR DESAFIO
                                </button>
                            </div>
                        ` : ''}
                    </div>
                    <div style="display:flex;align-items:center;gap:1.2rem;">
                        <div id="tournament-timer-display" style="font-family:var(--font-code);font-size:1.1rem;font-weight:bold;color:${isPaused ? 'var(--gold)' : 'var(--cyan)'};background:var(--bg-deep);padding:0.3rem 0.8rem;border:1px solid var(--border-bright);border-radius:3px;">
                            --:--
                        </div>
                        <span class="panel-badge" style="background:${isPaused ? 'rgba(232, 197, 71, 0.15)' : 'rgba(239, 68, 68, 0.15)'};color:${isPaused ? 'var(--gold)' : '#f87171'};border:1px solid ${isPaused ? 'var(--gold)' : '#ef4444'};font-size:0.75rem;">
                            ${isPaused ? 'PAUSADO PELO MESTRE' : 'EM BATALHA'}
                        </span>
                    </div>
                </div>

                ${isPaused ? `
                    <div style="background:rgba(232, 197, 71, 0.1);border:1px dashed var(--gold);padding:0.6rem 1rem;border-radius:4px;color:var(--gold);font-family:var(--font-display);font-size:0.75rem;text-align:center;letter-spacing:0.08em;">
                        ⏸ O TORNEIO ESTÁ PAUSADO PELO PROFESSOR. O TEMPO E AS SUBMISSÕES ESTÃO CONGELADOS.
                    </div>
                ` : ''}

                <!-- TOURNAMENT MAIN SPLIT -->
                <div class="tournament-main-split" style="display:grid;grid-template-columns:minmax(280px, 1.1fr) minmax(420px, 2fr) minmax(220px, 0.9fr);gap:1rem;flex:1;min-height:0;">
                    <!-- COL 1: PROBLEMA & DICAS & SAÍDA ESPERADA -->
                    <div style="background:var(--bg-panel);border:1px solid var(--border-dim);padding:1.2rem;border-radius:4px;display:flex;flex-direction:column;overflow-y:auto;">
                        <h3 style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.9rem;margin-bottom:0.6rem;">${curChallenge.title}</h3>
                        <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;margin-bottom:1rem;">
                            ${curChallenge.description || 'Implemente a solução solicitada e valide no terminal.'}
                        </div>

                        ${curChallenge.tests && curChallenge.tests.length > 0 ? `
                            <div class="expected-output-box" style="margin-bottom:1rem;">
                                <div class="expected-output-header">
                                    <div class="expected-output-title">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                        SAÍDA ESPERADA
                                    </div>
                                    <span class="expected-output-badge ${curChallenge.tests.some(t => String(t.expected).includes('\n')) ? 'multiline' : 'singleline'}">
                                        ${curChallenge.tests.some(t => String(t.expected).includes('\n')) ? 'LINHAS SEPARADAS (\\n)' : 'MESMA LINHA'}
                                    </span>
                                </div>
                                <div class="expected-tests-list">
                                    ${curChallenge.tests.map((t, idx) => {
                                        const isMulti = String(t.expected).includes('\n');
                                        const lineCt = String(t.expected).split('\n').length;
                                        return `
                                            <div class="expected-test-item">
                                                <div class="expected-test-meta">
                                                    <span><strong style="color:var(--cyan);">Caso ${idx + 1}:</strong> ${t.description || ''}</span>
                                                    ${t.input ? `<span>Entrada: <code>${t.input}</code></span>` : '<span>(sem entrada)</span>'}
                                                </div>
                                                <div style="font-size:0.68rem;color:var(--text-secondary);margin-bottom:0.15rem;display:flex;align-items:center;gap:0.3rem;">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                                    <span>${isMulti ? `Em <strong>${lineCt} linhas separadas</strong> (use \\n)` : 'Na <strong>mesma linha</strong>'}:</span>
                                                </div>
                                                <pre class="expected-preview-pre">${t.expected}</pre>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${curChallenge.hints && curChallenge.hints.length > 0 ? `
                            <div style="margin-top:auto;border-top:1px solid var(--border-ghost);padding-top:0.8rem;">
                                <div style="font-size:0.72rem;color:var(--text-dim);font-family:var(--font-display);margin-bottom:0.3rem;">DICA DO GM:</div>
                                <div style="font-size:0.78rem;color:var(--cyan);font-style:italic;">${curChallenge.hints[0].text || curChallenge.hints[0]}</div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- COL 2: IDE CODE EDITOR & TERMINAL -->
                    <div style="background:var(--bg-deep);border:1px solid var(--border-dim);border-radius:4px;display:flex;flex-direction:column;overflow:hidden;">
                        <!-- Editor Header -->
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.8rem;background:var(--bg-panel);border-bottom:1px solid var(--border-ghost);">
                            <span style="font-family:var(--font-code);font-size:0.75rem;color:var(--text-dim);">${isCSharpTour ? 'Script.cs' : 'main.c'}</span>
                            <div style="display:flex;gap:0.5rem;">
                                <button class="glow-button" style="padding:0.3rem 0.8rem;font-size:0.68rem;" title="Formatar e Indentar Código" onclick="app.ui.formatCurrentEditor()">Formatar</button>
                                <button class="glow-button" style="padding:0.3rem 0.8rem;font-size:0.68rem;" onclick="app.resetTournamentCode()">Reset</button>
                                <button class="glow-button primary" style="padding:0.3rem 1rem;font-size:0.68rem;" title="Executar (Ctrl+Enter)" onclick="app.runTournamentCode()">▶ Executar</button>
                                <button class="glow-button primary pulse-action" style="padding:0.3rem 1.2rem;font-size:0.68rem;background:rgba(74, 222, 128, 0.15);border-color:#4ade80;color:#4ade80;" title="Submeter (Ctrl+Shift+Enter)" onclick="app.submitTournamentChallenge()">✓ Submeter</button>
                            </div>
                        </div>

                        <!-- Textarea & Line numbers with Syntax Highlighting -->
                        <div class="editor-wrapper" style="flex:1;min-height:260px;position:relative;background:#05050d;">
                            <div id="tournament-line-numbers" class="line-numbers" style="padding:0.8rem 0.5rem;font-size:0.88rem;">1</div>
                            <div class="editor-code-container" style="position:relative;flex:1;height:100%;">
                                <pre class="editor-highlight" id="tournament-editor-highlight" aria-hidden="true"><code></code></pre>
                                <textarea id="tournament-code-editor" class="code-editor" spellcheck="false">${curChallenge.starterCode}</textarea>
                            </div>
                        </div>

                        <!-- Mini Terminal Output -->
                        <div style="height:160px;background:#020205;border-top:1px solid var(--border-dim);display:flex;flex-direction:column;">
                            <div style="padding:0.3rem 0.8rem;font-size:0.65rem;color:var(--text-dim);font-family:var(--font-display);background:rgba(255,255,255,0.02);border-bottom:1px solid var(--border-ghost);">
                                ▸ TERMINAL DE EXECUÇÃO
                            </div>
                            <div id="tournament-terminal-output" style="flex:1;padding:0.6rem 0.8rem;font-family:var(--font-code);font-size:0.8rem;color:var(--text-secondary);overflow-y:auto;white-space:pre-wrap;">
[ SISTEMA ] Arena pronta. Digite seu código em ${isCSharpTour ? 'C# Unity' : 'C'} e clique em Executar ou Submeter.
                            </div>
                        </div>
                    </div>

                    <!-- COL 3: LEADERBOARD AO VIVO -->
                    <div style="background:var(--bg-panel);border:1px solid var(--border-dim);padding:1rem;border-radius:4px;display:flex;flex-direction:column;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.8rem;">
                            <h4 style="font-family:var(--font-display);color:var(--gold);font-size:0.78rem;letter-spacing:0.1em;">PLACAR AO VIVO</h4>
                            <span style="font-size:0.65rem;color:var(--cyan);font-family:var(--font-code);">● TEMPO REAL</span>
                        </div>
                        <div id="tournament-live-leaderboard" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:0.5rem;position:relative;">
                            ${this.renderLiveLeaderboardHtml(participants)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Update editor with Universal Code Editor (Syntax Highlighting & Tab Key)
        var editor = document.getElementById('tournament-code-editor');
        if (editor) {
            this.ui.attachCodeEditor(editor, 'tournament-line-numbers', 'tournament-editor-highlight');
        }

        // Inicia o Countdown Dinâmico
        this.startTournamentCountdown(t);
    }

    startTournamentCountdown(t) {
        var timerEl = document.getElementById('tournament-timer-display');
        if (!timerEl) return;

        if (this.tournamentTimerInterval) {
            clearInterval(this.tournamentTimerInterval);
            this.tournamentTimerInterval = null;
        }

        if (t.status === 'paused') {
            timerEl.textContent = '⏸ PAUSADO';
            return;
        }

        var startedAtSec = t.startedAt ? (t.startedAt.seconds || Math.floor(Date.now() / 1000)) : Math.floor(Date.now() / 1000);
        var durationSec = (t.timeLimit || 15) * 60;
        var endAtSec = startedAtSec + durationSec;

        var updateTimer = () => {
            if (this.currentTournamentData && this.currentTournamentData.status === 'paused') {
                timerEl.textContent = '⏸ PAUSADO';
                return;
            }

            var nowSec = Math.floor(Date.now() / 1000);
            var remainSec = Math.max(0, endAtSec - nowSec);
            var m = Math.floor(remainSec / 60);
            var s = remainSec % 60;
            var timeStr = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
            
            var el = document.getElementById('tournament-timer-display');
            if (el) {
                el.textContent = '⏱ ' + timeStr;
                if (remainSec <= 60) {
                    el.style.color = '#ef4444';
                    el.style.borderColor = '#ef4444';
                }
            }

            if (remainSec <= 0) {
                if (this.tournamentTimerInterval) {
                    clearInterval(this.tournamentTimerInterval);
                    this.tournamentTimerInterval = null;
                }
                this.ui.showToast('Tempo de torneio encerrado!', 'info');
                if (typeof tournamentManager !== 'undefined' && t && t.id) {
                    tournamentManager.finish(t.id, t).catch(e => console.warn('finish error:', e));
                }
                this.ui.showTournamentEndResultModal(t);
            }
        };

        updateTimer();
        this.tournamentTimerInterval = setInterval(updateTimer, 1000);
    }

    runTournamentCode() {
        var editor = document.getElementById('tournament-code-editor');
        var term = document.getElementById('tournament-terminal-output');
        if (!editor || !term) return;

        var code = editor.value;
        term.innerHTML = '<span style="color:var(--cyan)">[ EXECUTANDO CÓDIGO... ]</span>\n';

        try {
            const isCSharp = (this.currentTournamentData && this.currentTournamentData.worldId === 'csharp_unity') ||
                             (this.ui && typeof this.ui.isCSharpWorld === 'function' && this.ui.isCSharpWorld(code));
            
            var res = null;
            if (isCSharp && typeof CSharpInterpreter !== 'undefined') {
                var csInterp = new CSharpInterpreter();
                res = csInterp.execute(code);
            } else {
                var interp = new CInterpreter();
                res = interp.execute(code);
            }

            if (res.output) {
                term.textContent = res.output;
            } else if (res.errors && res.errors.length > 0) {
                term.innerHTML = '<span style="color:#f87171;">[ ERRO NA COMPILAÇÃO/EXECUÇÃO ]\n' + res.errors.join('\n') + '</span>';
            } else {
                term.textContent = '[ CÓDIGO EXECUTADO COM SUCESSO (SEM SAÍDA) ]';
            }
        } catch (e) {
            term.innerHTML = '<span style="color:#f87171;">[ ERRO ] ' + e.message + '</span>';
        }
    }

    resetTournamentCode() {
        var t = this.currentTournamentData;
        if (!t || !t.challenges) return;
        var editor = document.getElementById('tournament-code-editor');
        if (!editor) return;
        
        var challengesList = [];
        t.challenges.forEach(function(chGroup) {
            if (chGroup.activities) {
                chGroup.activities.forEach(function(act) { challengesList.push(act); });
            }
        });
        var cur = challengesList[this.currentTournamentActIdx || 0];
        if (cur) {
            editor.value = cur.starterCode || '';
            this.ui.updateLineNumbers(editor, 'tournament-line-numbers');
            this.ui.showToast('Código restaurado.', 'info');
        }
    }

    async submitTournamentChallenge() {
        var t = this.currentTournamentData;
        if (!t) return;
        var editor = document.getElementById('tournament-code-editor');
        var term = document.getElementById('tournament-terminal-output');
        if (!editor) return;

        var code = editor.value;
        term.innerHTML = '<span style="color:var(--gold)">[ VALIDANDO SUBMISSÃO... ]</span>\n';

        const isCSharp = (t.worldId === 'csharp_unity') ||
                         (this.ui && typeof this.ui.isCSharpWorld === 'function' && this.ui.isCSharpWorld(code));

        var res = null;
        if (isCSharp && typeof CSharpInterpreter !== 'undefined') {
            var csInterp = new CSharpInterpreter();
            res = csInterp.execute(code);
        } else {
            var interp = new CInterpreter();
            res = interp.execute(code);
        }

        // Obter atividade atual do torneio para validação completa
        var curChallenge = null;
        if (t.challenges && t.challenges.length > 0) {
            var flat = [];
            t.challenges.forEach(function(chGroup) {
                if (chGroup.activities) {
                    chGroup.activities.forEach(function(act) { flat.push(act); });
                }
            });
            curChallenge = flat[this.currentTournamentActIdx || 0];
        }

        if (this.ui && this.ui.missionValidator && curChallenge) {
            const vRes = this.ui.missionValidator.validateActivity(code, curChallenge);
            if (!vRes.pass) {
                const errText = vRes.errors.join('\n');
                term.innerHTML = '<span style="color:#f87171;">[ FALHA NA VALIDAÇÃO ]\n' + errText + '</span>';
                this.ui.showToast('Código não cumpriu os requisitos do desafio!', 'error');
                return;
            }
        } else if (!res.success && res.errors && res.errors.length > 0) {
            term.innerHTML = '<span style="color:#f87171;">[ FALHA NA VALIDAÇÃO ]\nO código possui erros e não executou com sucesso:\n' + res.errors.join('\n') + '</span>';
            this.ui.showToast('O código possui erros!', 'error');
            return;
        }

        try {
            await tournamentManager.submitScore(t.id, this.currentTournamentActIdx || 0, code, true, 3000);
            this.ui.showToast('Desafio submetido com sucesso! +Pontos adicionados.', 'success');
            term.innerHTML = '<span style="color:#4ade80;">[ SUCESSO ] Código validado e pontuação computada!</span>\n' + (res.output || '');

            // Avança para o próximo desafio se houver
            var challengesList = [];
            if (t.challenges && t.challenges.length > 0) {
                t.challenges.forEach(function(chGroup) {
                    if (chGroup.activities) {
                        chGroup.activities.forEach(function(act) { challengesList.push(act); });
                    }
                });
            }

            this.currentTournamentActIdx = (this.currentTournamentActIdx || 0) + 1;
            
            if (this.currentTournamentActIdx >= challengesList.length && challengesList.length > 0) {
                this.ui.showToast('Parabéns! Você concluiu todos os desafios do torneio!', 'success');
                if (window.soundFX) window.soundFX.playFanfare();
                setTimeout(() => {
                    this.ui.showTournamentEndResultModal(this.currentTournamentData);
                }, 1000);
            } else {
                setTimeout(() => {
                    this.renderTournamentLobby(this.currentTournamentData);
                }, 1200);
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao enviar pontuação.', 'error');
        }
    }

    async startTournament() {
        var t = this.currentTournamentData;
        if (!t) return;
        try {
            await tournamentManager.start(t.id);
            this.ui.showToast('Torneio iniciado!', 'success');
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao iniciar torneio', 'error');
        }
    }

    async toggleTournamentPause(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        try {
            const newStatus = await tournamentManager.togglePause(tournamentId);
            if (newStatus === 'paused') {
                this.ui.showToast('⏸ Torneio pausado para todos os participantes!', 'info');
            } else {
                this.ui.showToast('▶ Torneio retomado com sucesso!', 'success');
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao alterar pausa do torneio', 'error');
        }
    }

    async skipTournamentChallenge(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        var t = this.currentTournamentData;
        if (!t || !t.challenges) return;

        var challengesList = [];
        t.challenges.forEach(function(chGroup) {
            if (chGroup.activities) {
                chGroup.activities.forEach(function(act) { challengesList.push(act); });
            }
        });

        var nextIdx = (this.currentTournamentActIdx || 0) + 1;
        if (nextIdx >= challengesList.length) {
            this.ui.showToast('Este já é o último desafio do torneio!', 'info');
            return;
        }

        try {
            await tournamentManager.skipChallenge(tournamentId, nextIdx);
            this.currentTournamentActIdx = nextIdx;
            this.renderTournamentLobby(this.currentTournamentData);
            this.ui.showToast('⏭ Desafio pulado pelo Professor!', 'success');
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao pular desafio', 'error');
        }
    }

    async joinTournament(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        this.openTournamentLobby(tournamentId);
        try {
            var result = await tournamentManager.join(tournamentId);
            if (result) {
                this.ui.showToast('Inscrição confirmada!', 'success');
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao entrar no torneio', 'error');
        }
    }

    // ─── PROFILE NICKNAME EDIT ───
    }

    if (typeof GuildCodeApp !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_AppExtension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(GuildCodeApp.prototype, descriptors);
    }
})();
