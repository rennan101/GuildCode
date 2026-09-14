/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — UI: Guild, Profile, PVP & Shop
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _Extension {

    // ─── GUILD SCREEN (TODOS OS MEMBROS) ───
    async renderGuildScreen() {
        this.showScreen('guild');
        const container = document.getElementById('guild-content');
        if (!container) return;

        if (this._cachedGuildScreenData) {
            this._renderGuildScreenHtml(container, this._cachedGuildScreenData.guildName, this._cachedGuildScreenData.displayCode, this._cachedGuildScreenData.members);
        } else {
            container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:3rem;"><div class="spinner"></div></div>';
        }
        
        try {
            const timeoutPromise = (promise, ms = 5000, fallback = null) => 
                Promise.race([promise, new Promise(res => setTimeout(() => res(fallback), ms))]);

            if (typeof authManager !== 'undefined') {
                if (!authManager.userData && authManager.currentUser) {
                    await authManager.loadUserData();
                }
            }

            let guildCode = authManager ? authManager.getClassCode() : '';
            if (!guildCode && authManager && authManager.getEffectiveGuildCode) {
                guildCode = await timeoutPromise(authManager.getEffectiveGuildCode(), 3500, '');
            }

            let guildInfo = null;

            if (!guildCode && authManager && authManager.isTeacher()) {
                const guilds = (await timeoutPromise(authManager.getTeacherGuilds(), 3500, [])) || [];
                if (guilds && guilds.length > 0) {
                    guildInfo = guilds[0];
                    guildCode = guildInfo.classCode || guildInfo.guildCode || guildInfo.id;
                    if (authManager.userData) {
                        authManager.userData.classCode = guildCode;
                        authManager.userData.guildCode = guildCode;
                    }
                }
            }

            if (!guildInfo && guildCode && authManager) {
                guildInfo = await timeoutPromise(authManager.getCurrentGuildInfo(), 3500, null);
            }

            let members = [];
            if (guildCode && authManager) {
                members = (await timeoutPromise(authManager.getGuildMembers(guildCode, (freshMembers) => {
                    const freshName = guildInfo ? (guildInfo.name || 'Guilda') : (freshMembers.length > 0 ? 'Guilda dos Codemancers' : 'Guilda');
                    const freshCode = guildCode || (guildInfo ? guildInfo.classCode : '---');
                    this._cachedGuildScreenData = { guildName: freshName, displayCode: freshCode, members: freshMembers };
                    const currentActiveScreen = document.querySelector('.screen.active');
                    if (currentActiveScreen && currentActiveScreen.id === 'screen-guild') {
                        this._renderGuildScreenHtml(container, freshName, freshCode, freshMembers);
                    }
                }), 6000, [])) || [];
            }

            const guildName = guildInfo ? (guildInfo.name || 'Guilda') : (members.length > 0 ? 'Guilda dos Codemancers' : 'Guilda');
            const displayCode = guildCode || (guildInfo ? guildInfo.classCode : '---');

            this._cachedGuildScreenData = { guildName, displayCode, members };
            this._renderGuildScreenHtml(container, guildName, displayCode, members);
        } catch (e) {
            console.error('[UI] renderGuildScreen error:', e);
            if (!this._cachedGuildScreenData) {
                container.innerHTML = '<p class="pvp-empty">Erro ao carregar os dados da guilda.</p>';
            }
        }
    }

    _renderGuildScreenHtml(container, guildName, displayCode, members) {
        const titleEl = document.getElementById('guild-screen-title');
        if (titleEl) titleEl.textContent = `GUILDA: ${guildName.toUpperCase()}`;

        let membersCards = '';
        if (!members || members.length === 0) {
            membersCards = `
                <div class="pvp-empty" style="grid-column:1/-1;text-align:center;padding:3rem 1rem;">
                    <p style="color:var(--text-secondary);margin-bottom:0.5rem;">Nenhum aprendiz vinculado a esta Guilda ainda.</p>
                    ${displayCode && displayCode !== '---' ? `<p style="font-size:0.8rem;color:var(--text-dim);">Compartilhe o código <strong style="color:var(--purple-bright);letter-spacing:0.08em;">${displayCode}</strong> com seus alunos.</p>` : ''}
                </div>
            `;
        } else {
            const currentUid = (typeof authManager !== 'undefined' && authManager.getCurrentUser()?.uid) || '';
            const currentEmail = (typeof authManager !== 'undefined' && authManager.getCurrentUser()?.email) || '';
            membersCards = members.map(m => {
                const isMe = (currentUid && m.uid === currentUid) || (currentEmail && m.email === currentEmail);
                const isRennanTeacher = (m.email === 'rennan.raffaele@unicap.br') || (isMe && currentEmail === 'rennan.raffaele@unicap.br');
                const gp = m.gameProgress || {};
                
                let lvl = gp.level || 1;
                if (isMe && this.engine && this.engine.state && this.engine.state.level) {
                    lvl = Math.max(lvl, this.engine.state.level);
                } else if (isRennanTeacher) {
                    lvl = Math.max(lvl, 5);
                }

                const renome = gp.renome !== undefined ? gp.renome : 100;
                const cp = gp.codePower || 1000;
                const tier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(renome) : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' };
                
                let completedChapters = gp.chapters ? Object.values(gp.chapters).filter(c => c && c.completed).length : 0;
                if (isMe && this.engine && this.engine.state && this.engine.state.chapters) {
                    const engineCompleted = Object.values(this.engine.state.chapters).filter(c => c && c.completed).length;
                    completedChapters = Math.max(completedChapters, engineCompleted);
                } else if (isRennanTeacher) {
                    completedChapters = Math.max(completedChapters, 6);
                }

                const isMestre = m.isTeacher || m.role === 'teacher';
                const avatarSrc = m.photoURL || 'assets/avatars/avatar_02.png';
                const subclass = gp.subclass && typeof SUBCLASSES_DATA !== 'undefined' && SUBCLASSES_DATA[gp.subclass] ? SUBCLASSES_DATA[gp.subclass] : null;

                return `
                    <div class="guild-member-card ${isMestre ? 'is-teacher-card' : ''}" onclick="app.openPlayerProfile('${m.uid}')">
                        <div class="guild-member-top-row">
                            <div class="guild-member-avatar" style="border-color:${isMestre ? 'var(--gold)' : tier.color}">
                                <img src="${avatarSrc}" alt="${m.displayName || 'Avatar'}">
                            </div>
                            <div class="guild-member-header-text">
                                <div class="guild-member-name-wrap">
                                    <h4 class="guild-member-name">${m.displayName || m.email?.split('@')[0] || 'Aprendiz'}</h4>
                                    ${isMestre ? '<span class="mestre-role-badge">MESTRE</span>' : ''}
                                </div>
                                <div class="guild-member-sub-tags">
                                    <span class="member-lvl-pill">LV. ${String(lvl).padStart(2, '0')}</span>
                                    ${subclass ? `<span class="member-subclass-pill" style="color:${subclass.color}; border-color:${subclass.color}40; background:${subclass.color}15;">${subclass.name}</span>` : ''}
                                </div>
                            </div>
                        </div>

                        <div class="guild-member-progress-row">
                            <div class="member-progress-info">
                                <span>Progresso na Campanha</span>
                                <strong style="color:var(--cyan);">${completedChapters} / 15 Capítulos</strong>
                            </div>
                            <div class="member-progress-track">
                                <div class="member-progress-bar" style="width:${Math.min(100, Math.round((completedChapters / 15) * 100))}%;"></div>
                            </div>
                        </div>

                        <div class="guild-member-bottom-stats">
                            <div class="member-stat-box">
                                <span class="stat-box-lbl">Elo / Tier</span>
                                <span class="stat-box-val" style="color:${tier.color}">${tier.icon} ${tier.name}</span>
                            </div>
                            <div class="member-stat-box">
                                <span class="stat-box-lbl">Renome</span>
                                <span class="stat-box-val" style="color:var(--gold);">${renome} ★</span>
                            </div>
                            <div class="member-stat-box">
                                <span class="stat-box-lbl">MMR</span>
                                <span class="stat-box-val" style="color:var(--purple-bright);">${cp} MMR</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        container.innerHTML = `
            <div class="guild-screen-container">
                <div class="guild-info-banner">
                    <div>
                        <h2 style="font-family:var(--font-display);color:var(--gold);font-size:1.1rem;margin-bottom:0.2rem;">${guildName}</h2>
                        <p style="color:var(--text-secondary);font-size:0.8rem;margin:0;">Código de Convocação: <span style="color:var(--purple-bright);font-family:var(--font-code);font-weight:700;letter-spacing:0.1em;">${displayCode}</span></p>
                    </div>
                    <div style="display:flex;align-items:center;gap:1rem;">
                        <span class="panel-badge" style="font-size:0.75rem;padding:0.3rem 0.8rem;">${(members || []).length} MEMBRO(S)</span>
                    </div>
                </div>
                <div class="guild-members-grid">
                    ${membersCards}
                </div>
            </div>
        `;
    }

    // ─── PLAYER PROFILE MODAL (RN-15) ───
    async showPlayerProfileModal(uid) {
        const modal = document.getElementById('modal-player-profile');
        const modalBody = document.getElementById('player-profile-modal-body');
        if (!modal || !modalBody) return;

        modalBody.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:3rem;"><div class="spinner"></div></div>';
        modal.classList.remove('hidden');

        try {
            let userData = null;
            let gameProgress = null;

            if (!uid || uid === authManager.currentUser?.uid) {
                userData = authManager.userData || {};
                userData.displayName = authManager.getDisplayName();
                userData.photoURL = authManager.getPhotoURL();
                gameProgress = this.engine.state;
            } else {
                userData = await authManager.getUserProfile(uid);
                gameProgress = userData?.gameProgress || {};
            }

            if (!userData) {
                modalBody.innerHTML = '<p class="pvp-empty">Perfil não encontrado.</p>';
                return;
            }

            const name = userData.displayName || userData.email?.split('@')[0] || 'Jogador';
            const email = userData.email || 'Não informado';
            const photoURL = userData.photoURL || '';
            const role = userData.role === 'teacher' ? 'Mestre' : 'Aprendiz';
            const level = gameProgress.level || 1;
            const xp = gameProgress.xp || 0;
            const renome = gameProgress.renome !== undefined ? gameProgress.renome : 100;
            const cp = gameProgress.codePower || 1000;
            const tier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(renome) : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' };
            const wins = gameProgress.pvpWins || 0;
            const losses = gameProgress.pvpLosses || 0;
            const totalMatches = wins + losses;
            const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 1000) / 10 : 0;
            const winStreak = gameProgress.winStreak || 0;

            const isOwnProfile = !uid || uid === authManager.currentUser?.uid;
            const isUserTeacher = userData.role === 'teacher' || (typeof authManager !== 'undefined' && authManager.isAdminEmail(userData.email));

            // Lista completa dos 24 avatares com seus nomes oficiais dos Spritesheets
            const ALL_AVATARS = [
                { id: '01', name: 'Shadow Coder', teacherOnly: true },
                { id: '02', name: 'Neon Coder' },
                { id: '03', name: 'Code Knight' },
                { id: '04', name: 'Rune Coder' },
                { id: '05', name: 'SteamCore' },
                { id: '06', name: 'Wild Coder' },
                { id: '07', name: 'Moon Compiler' },
                { id: '08', name: 'Gearhead' },
                { id: '09', name: 'Fox Coder' },
                { id: '10', name: 'Code Prince' },
                { id: '11', name: 'Bug Alchemist' },
                { id: '12', name: 'Dragon Coder' },
                { id: '13', name: 'ChronoBot' },
                { id: '14', name: 'Sakura Coder' },
                { id: '15', name: 'NULL' },
                { id: '16', name: 'Princess.exe' },
                { id: '17', name: 'Void Caster' },
                { id: '18', name: 'Dark Loli' },
                { id: '19', name: 'Otaku Chan' },
                { id: '20', name: 'Senpai Caster' },
                { id: '21', name: 'Stack Witch' },
                { id: '22', name: 'Nightwitch' },
                { id: '23', name: 'Nightblood' },
                { id: '24', name: 'Loremaster' }
            ];

            let avatarPickerHtml = '';
            if (isOwnProfile) {
                const unlockedList = (gameProgress && gameProgress.unlockedAvatars) ? gameProgress.unlockedAvatars : ['02'];
                const availableAvatars = ALL_AVATARS.filter(av => !av.teacherOnly || isUserTeacher);
                
                let avatarOptions = '';
                availableAvatars.forEach(av => {
                    const path = `assets/avatars/avatar_${av.id}.png`;
                    const isSelected = photoURL === path;
                    const isUnlocked = isUserTeacher || av.id === '02' || unlockedList.includes(av.id);
                    const sData = (typeof AVATAR_SKILLS_DATA !== 'undefined' && AVATAR_SKILLS_DATA[av.id]) ? AVATAR_SKILLS_DATA[av.id] : null;
                    const skillTooltip = sData ? `✦ ${sData.skillName}: ${sData.skillDesc}` : av.name;

                    if (isUnlocked) {
                        avatarOptions += `
                            <div class="avatar-select-item ${isSelected ? 'selected' : ''}" onclick="app.selectAvatar('${path}')" title="${av.name} (${skillTooltip})">
                                <img src="${path}" alt="${av.name}" loading="lazy" />
                            </div>
                        `;
                    } else {
                        avatarOptions += `
                            <div class="avatar-select-item locked" onclick="app.ui.showToast('Desbloqueie na Câmara de Convocação (Gacha)!', 'warning')" title="${av.name} [BLOQUEADO] - ${skillTooltip}">
                                <img src="${path}" alt="${av.name}" loading="lazy" />
                                <div class="avatar-lock-overlay">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                            </div>
                        `;
                    }
                });

                avatarPickerHtml = `
                    <div class="avatar-picker-section">
                        <div class="avatar-picker-header">
                            <span class="avatar-picker-title">ECO DE AVATAR & HABILIDADE EQUIPADA</span>
                            <span class="avatar-picker-subtitle">Selecione seu guardião para ativar sua habilidade passiva</span>
                        </div>
                        <div class="avatar-picker-grid">
                            ${avatarOptions}
                        </div>
                    </div>
                `;
            }

            modalBody.innerHTML = `
                <div class="profile-header-box">
                    <div class="profile-avatar-large" style="border-color:${tier.color}">
                        ${photoURL ? `<img src="${photoURL}" alt="Avatar">` : `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:${role === 'Mestre' ? 'var(--gold)' : 'var(--purple-bright)'}"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap;">
                            ${isOwnProfile ? `
                                <div class="profile-nickname-edit-wrap">
                                    <input type="text" id="profile-edit-name-input" class="profile-nickname-input" value="${name}" maxlength="25" placeholder="Seu nome..." />
                                    <button class="profile-nickname-save-btn" onclick="app.saveProfileNickname()" title="Salvar Nickname">Salvar</button>
                                </div>
                            ` : `
                                <h3 style="color:var(--text-primary);font-family:var(--font-display);font-size:1.1rem;margin:0;">${name}</h3>
                            `}
                        </div>
                        <p style="color:var(--text-dim);font-size:0.75rem;margin:0.35rem 0 0.4rem 0;">${role} &bull; ${email}</p>
                        <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
                            <span class="tier-badge" style="color:${tier.color};border-color:${tier.color};background:rgba(255,255,255,0.03);">${tier.icon} ${tier.name}</span>
                            ${(() => {
                                const currentAvMatch = photoURL ? photoURL.match(/avatar_(\d+)\.png/) : null;
                                const currentAvId = currentAvMatch ? currentAvMatch[1] : '02';
                                const currentAvSkill = (typeof AVATAR_SKILLS_DATA !== 'undefined') ? AVATAR_SKILLS_DATA[currentAvId] : null;
                                if (currentAvSkill) {
                                    const rInfo = AVATAR_RARITIES[currentAvSkill.rarity];
                                    return `<span class="tier-badge" style="color:${rInfo.color};border-color:${rInfo.color};background:rgba(255,255,255,0.03);" title="${currentAvSkill.skillDesc}">✦ ${currentAvSkill.skillName}</span>`;
                                }
                                return '';
                            })()}
                            ${gameProgress.subclass && typeof SUBCLASSES_DATA !== 'undefined' && SUBCLASSES_DATA[gameProgress.subclass] ? `
                                <span class="subclass-profile-pill" style="color:${SUBCLASSES_DATA[gameProgress.subclass].color};border-color:${SUBCLASSES_DATA[gameProgress.subclass].color};font-weight:700;letter-spacing:0.06em;">
                                    ${SUBCLASSES_DATA[gameProgress.subclass].name.toUpperCase()}
                                </span>
                            ` : ''}
                            ${isOwnProfile && level >= 5 ? `
                                <button class="glow-button" onclick="app.openSkillTreeModal()" style="padding:0.2rem 0.6rem;font-size:0.68rem;border-color:var(--gold);color:var(--gold);background:rgba(245,158,11,0.1);">
                                    ÁRVORE DE SKILLS ◈
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>

                ${avatarPickerHtml}

                <div class="profile-stat-grid">
                    <div class="profile-stat-card">
                        <div class="profile-stat-label">Nível & XP</div>
                        <div class="profile-stat-val" style="color:var(--cyan)">LV. ${String(level).padStart(2, '0')} <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:normal">(${xp} XP)</span></div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-label">Renome (Ranking)</div>
                        <div class="profile-stat-val" style="color:var(--gold)">${renome} ★</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-label">MMR</div>
                        <div class="profile-stat-val" style="color:var(--purple-bright)">${cp} MMR</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-label">Sequência de Vitórias</div>
                        <div class="profile-stat-val" style="color:var(--green)">${winStreak} W</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-label">Vitórias / Derrotas</div>
                        <div class="profile-stat-val">${wins}V <span style="color:var(--text-dim)">/</span> ${losses}D</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-label">Taxa de Vitória</div>
                        <div class="profile-stat-val" style="color:${winRate >= 50 ? 'var(--green)' : 'var(--text-secondary)'}">${winRate}%</div>
                    </div>
                </div>
            `;

            if (isOwnProfile) {
                const nameInput = document.getElementById('profile-edit-name-input');
                if (nameInput) {
                    nameInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') app.saveProfileNickname();
                    });
                }
            }
        } catch(e) {
            console.error('[UI] showPlayerProfileModal error:', e);
            modalBody.innerHTML = '<p class="pvp-empty">Erro ao abrir perfil do jogador.</p>';
        }
    }

    hidePlayerProfileModal() {
        const modal = document.getElementById('modal-player-profile');
        if (modal) modal.classList.add('hidden');
    }

    showEditGuildModal(guildCode, currentName) {
        const modal = document.getElementById('modal-edit-guild');
        const input = document.getElementById('input-edit-guild-name');
        const errEl = document.getElementById('edit-guild-error');
        if (errEl) errEl.textContent = '';
        if (input) {
            input.value = currentName || '';
            input.dataset.guildCode = guildCode || '';
        }
        if (modal) {
            modal.classList.remove('hidden');
            if (input) input.focus();
        }
    }

    hideEditGuildModal() {
        const modal = document.getElementById('modal-edit-guild');
        if (modal) modal.classList.add('hidden');
    }

    // ─── RANKED SCREEN (DESAFIOS + HISTÓRICO + RANKING DA GUILDA) ───
    async renderRankedScreen(challenges, cachedLeaderboard = null, cachedHistory = null) {
        this.showScreen('ranked');
        const container = document.getElementById('ranked-content');
        if (!container) return;

        let leaderboard = cachedLeaderboard;
        if (!leaderboard && typeof rankedManager !== 'undefined') {
            leaderboard = await rankedManager.getGuildLeaderboard();
        }
        if (!leaderboard) leaderboard = [];

        let history = cachedHistory;
        if (!history && typeof rankedManager !== 'undefined') {
            try {
                history = await rankedManager.getChallengeHistory();
            } catch (e) { history = []; }
        }
        if (!history) history = [];

        const myUid = (typeof authManager !== 'undefined' && authManager.currentUser?.uid) || '';
        const myRenome = (this.engine.state.renome !== undefined && this.engine.state.renome !== null) ? this.engine.state.renome : 80;
        const myTier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(myRenome) : (typeof PVP_TIERS !== 'undefined' ? PVP_TIERS[0] : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' });
        const myCP = this.engine.state.codePower || 1000;
        const tiersList = typeof PVP_TIERS !== 'undefined' ? PVP_TIERS : [];

        // Identifica o índice do elo atual e o próximo elo
        const currentTierIdx = tiersList.findIndex(t => t.name === myTier.name);
        const nextTier = (currentTierIdx >= 0 && currentTierIdx < tiersList.length - 1) ? tiersList[currentTierIdx + 1] : null;

        // Calcula porcentagem exata de progresso do elo atual até o próximo
        let progressPercent = 100;
        let progressSubtext = '';
        if (nextTier) {
            const range = nextTier.minRenome - myTier.minRenome;
            const currentPoints = Math.max(0, myRenome - myTier.minRenome);
            progressPercent = Math.min(100, Math.max(0, Math.round((currentPoints / range) * 100)));
            const needed = Math.max(0, nextTier.minRenome - myRenome);
            progressSubtext = `${needed} de Renome para alcançar ${nextTier.name}`;
        } else {
            progressPercent = 100;
            progressSubtext = 'Elo Máximo Atingido! Você está no topo da Guilda.';
        }

        const claimedMap = this.engine.state.pvpTierRewardsClaimed || {};

        const tiersOverviewHTML = `
            <div class="pvp-tiers-overview">
                <div class="pvp-tiers-overview-header">
                    <div>
                        <div class="pvp-overview-tag">PROGRESSÃO COMPETITIVA & ELOS DA GUILDA</div>
                        <div class="pvp-overview-title">CAMINHO DO CODEMANCER</div>
                        <div class="pvp-overview-desc">
                            Vença duelos para aumentar sua barra de <b>Renome PVP</b>. Em caso de derrota, o Renome é reduzido. Ao atingir cada Elo, resgate recompensas exclusivas de XP, Tokens e até o raro <b>Cristal de Ascensão</b>!
                        </div>
                    </div>
                    <div class="pvp-tier-current-highlight" style="border-color:${myTier.color};box-shadow: 0 0 20px ${myTier.color}33;">
                        <span class="pvp-current-icon" style="color:${myTier.color};">${myTier.icon}</span>
                        <div>
                            <span class="pvp-current-tier-label" style="color:var(--text-dim);">ELO ATUAL</span>
                            <span class="pvp-current-tier-name" style="color:${myTier.color};">${myTier.name}</span>
                        </div>
                    </div>
                </div>

                <!-- BARRA DE PROGRESSO DO ELO -->
                <div class="pvp-tier-progress-section">
                    <div class="pvp-tier-progress-meta">
                        <div class="pvp-meta-left">
                            <span class="pvp-meta-elo">${myTier.name} (${myTier.minRenome}★)</span>
                            <span class="pvp-meta-arrow">➔</span>
                            <span class="pvp-meta-next" style="color:${nextTier ? nextTier.color : 'var(--gold)'};">${nextTier ? `${nextTier.name} (${nextTier.minRenome}★)` : '★ Cume Lendário'}</span>
                        </div>
                        <div class="pvp-meta-right">
                            <span class="pvp-meta-subtext">${progressSubtext}</span>
                            <span class="pvp-meta-percent" style="color:${myTier.color};">${progressPercent}%</span>
                        </div>
                    </div>
                    <div class="pvp-tier-progress-track">
                        <div class="pvp-tier-progress-fill" style="width:${progressPercent}%;background:linear-gradient(90deg, ${myTier.color}, ${nextTier ? nextTier.color : '#fbbf24'});box-shadow: 0 0 16px ${myTier.color}aa;"></div>
                    </div>
                </div>

                <!-- GRADE DOS 8 ELOS COM REQUISITOS E RECOMPENSAS -->
                <div class="pvp-tiers-grid">
                    ${tiersList.map((tier, idx) => {
                        const isUnlocked = myRenome >= tier.minRenome;
                        const isCurrent = myTier.name === tier.name;
                        const isLegendary = !!tier.grantAscensionCrystal;

                        return `
                            <div class="pvp-tier-card ${isCurrent ? 'current' : ''} ${isUnlocked ? 'unlocked' : 'locked'} ${isLegendary ? 'legendary' : ''}" style="--tier-color:${tier.color};">
                                <div class="pvp-tier-card-glow"></div>
                                <div class="pvp-tier-card-head">
                                    <span class="pvp-tier-badge-icon">${tier.icon}</span>
                                    <span class="pvp-tier-badge-renome">${tier.minRenome}${tier.maxRenome !== Infinity ? `–${tier.maxRenome}` : '+'} ★</span>
                                </div>
                                <div class="pvp-tier-card-body">
                                    <div class="pvp-tier-name">${tier.name}</div>
                                    <div class="pvp-tier-req">${idx === 0 ? 'Elo Inicial' : `Requer ${tier.minRenome} Renome`}</div>
                                    <div class="pvp-tier-rewards-box">
                                        <span class="pvp-reward-chip xp">+${tier.rewardXP} XP</span>
                                        <span class="pvp-reward-chip tokens">+${tier.rewardTokens} Tokens</span>
                                        ${isLegendary ? (() => {
                                            const pvpCrystals = (typeof app !== 'undefined' && app.getCrystalRewardsConfig) ? (app.getCrystalRewardsConfig().pvp ?? 2) : 2;
                                            const pts = (pvpCrystals * 0.5).toFixed(1);
                                            return `<span class="pvp-reward-chip crystal" title="Concede +${pts} ponto(s) extra(s) na média final"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> +${pvpCrystals} Cristal${pvpCrystals > 1 ? 'is' : ''} de Ascensão</span>`;
                                        })() : ''}
                                    </div>
                                </div>
                                <div class="pvp-tier-card-footer">
                                    ${claimedMap[tier.name] 
                                        ? `<button class="pvp-tier-btn claimed" disabled><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> RESGATADO</button>`
                                        : isUnlocked 
                                            ? `<button class="pvp-tier-btn claim-ready glow-button" onclick="app.handleClaimPvPTierReward('${tier.name}')">✦ RESGATAR</button>`
                                            : `<button class="pvp-tier-btn locked" disabled><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> BLOQUEADO</button>`
                                    }
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        let leaderboardHTML = '';
        if (leaderboard.length === 0) {
            leaderboardHTML = '<p class="pvp-empty">Nenhum registro de ranking na guilda ainda.</p>';
        } else {
            leaderboardHTML = `
                <div style="overflow-x:auto;margin-top:1rem;">
                    <table style="width:100%;border-collapse:collapse;text-align:left;font-size:0.8rem;">
                        <thead>
                            <tr style="border-bottom:1px solid var(--border-dim);color:var(--text-dim);font-family:var(--font-display);font-size:0.68rem;letter-spacing:0.1em;">
                                <th style="padding:0.6rem 0.8rem;text-align:center;">#</th>
                                <th style="padding:0.6rem 0.8rem;">JOGADOR</th>
                                <th style="padding:0.6rem 0.8rem;">NÍVEL & CAP</th>
                                <th style="padding:0.6rem 0.8rem;">GUILD POWER</th>
                                <th style="padding:0.6rem 0.8rem;">TIER</th>
                                <th style="padding:0.6rem 0.8rem;text-align:right;">RENOME</th>
                                <th style="padding:0.6rem 0.8rem;text-align:right;">MMR</th>
                                <th style="padding:0.6rem 0.8rem;text-align:right;">V/D</th>
                                <th style="padding:0.6rem 0.8rem;text-align:right;">WIN RATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${leaderboard.map(item => {
                                const isMe = item.uid === authManager.currentUser?.uid;
                                const power = Math.round(((item.completedChapters || 0) / 15) * 100);
                                return `
                                    <tr style="border-bottom:1px solid var(--border-ghost);background:${isMe ? 'rgba(139, 92, 246, 0.12)' : 'transparent'};cursor:pointer;" onclick="app.openPlayerProfile('${item.uid}')">
                                        <td style="padding:0.7rem 0.8rem;text-align:center;font-weight:700;color:${item.position <= 3 ? 'var(--gold)' : 'var(--text-secondary)'}">${item.position <= 3 ? ['1°','2°','3°'][item.position-1] : item.position + '°'}</td>
                                        <td style="padding:0.7rem 0.8rem;display:flex;align-items:center;gap:0.7rem;">
                                            <div style="width:30px;height:30px;border-radius:50%;border:1.5px solid ${item.tier.color};overflow:hidden;background:var(--bg-deep);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                                ${item.photoURL ? `<img src="${item.photoURL}" style="width:100%;height:100%;object-fit:cover;">` : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:${item.isTeacher ? 'var(--gold)' : 'var(--purple-bright)'}"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`}
                                            </div>
                                            <div>
                                                <div style="font-weight:600;color:${isMe ? 'var(--purple-bright)' : 'var(--text-primary)'};font-size:0.85rem;">${item.displayName} ${isMe ? '(Você)' : ''} ${item.isTeacher ? '<span style="color:var(--gold);font-size:0.65rem;">[MESTRE]</span>' : ''}</div>
                                                <div style="font-size:0.68rem;color:var(--text-dim);">${item.email || 'aluno@guildcode.com'}</div>
                                            </div>
                                        </td>
                                        <td style="padding:0.7rem 0.8rem;">
                                            <span style="color:var(--cyan);font-weight:600;">LV. ${String(item.level || 1).padStart(2, '0')}</span>
                                            <span style="color:var(--text-dim);font-size:0.72rem;margin-left:0.3rem;">(Cap. ${item.completedChapters || 0}/15)</span>
                                        </td>
                                        <td style="padding:0.7rem 0.8rem;">
                                            <span style="color:var(--gold);font-weight:700;">${power}%</span>
                                        </td>
                                        <td style="padding:0.7rem 0.8rem;"><span class="tier-badge" style="color:${item.tier.color};border-color:${item.tier.color};">${item.tier.icon} ${item.tier.name}</span></td>
                                        <td style="padding:0.7rem 0.8rem;text-align:right;color:var(--gold);font-weight:700;">${item.renome}</td>
                                        <td style="padding:0.7rem 0.8rem;text-align:right;color:var(--purple-bright);font-family:var(--font-code);">${item.codePower} MMR</td>
                                        <td style="padding:0.7rem 0.8rem;text-align:right;">${item.wins}W / ${item.losses}L</td>
                                        <td style="padding:0.7rem 0.8rem;text-align:right;color:${item.winRate >= 50 ? 'var(--green)' : 'var(--text-dim)'}">${item.winRate}%</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        let historyHTML = '';
        if (!history || history.length === 0) {
            historyHTML = `
                <div style="padding:2rem;text-align:center;color:var(--text-ghost);background:var(--bg-deep);border:1px dashed var(--border-ghost);border-radius:4px;margin-top:1rem;">
                    Nenhum duelo concluído no seu histórico até o momento.
                </div>
            `;
        } else {
            historyHTML = `
                <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(340px, 1fr));gap:1rem;margin-top:1rem;">
                    ${history.map(c => {
                        const isChallenger = c.challengerUid === myUid;
                        const opponentName = isChallenger ? (c.targetName || 'Adversário') : (c.challengerName || 'Desafiante');
                        const won = c.winner === myUid;
                        const myScore = isChallenger ? (c.challengerScore || 0) : (c.targetScore || 0);
                        const oppScore = isChallenger ? (c.targetScore || 0) : (c.challengerScore || 0);
                        const myHits = isChallenger ? (c.challengerHits !== undefined ? c.challengerHits : 3) : (c.targetHits !== undefined ? c.targetHits : 3);
                        const myErrors = isChallenger ? (c.challengerErrors || 0) : (c.targetErrors || 0);
                        const myTimeSec = Math.round(((isChallenger ? c.challengerTime : c.targetTime) || 0) / 1000);
                        const oppTimeSec = Math.round(((isChallenger ? c.targetTime : c.challengerTime) || 0) / 1000);
                        
                        const myTimeStr = `${String(Math.floor(myTimeSec/60)).padStart(2,'0')}:${String(myTimeSec%60).padStart(2,'0')}`;
                        const oppTimeStr = `${String(Math.floor(oppTimeSec/60)).padStart(2,'0')}:${String(oppTimeSec%60).padStart(2,'0')}`;

                        let chapterLabel = 'Capítulo ' + (c.chapterId || '---');
                        if (c.chapterTitle) {
                            chapterLabel = (c.chapterId ? `Cap. ${String(c.chapterId).padStart(2, '0')} — ` : '') + c.chapterTitle;
                        } else if (c.chapterId) {
                            const isCSharp = (c.worldId === 'csharp_unity') || (this.isCSharpWorld && this.isCSharpWorld(''));
                            const activeChapters = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
                            const chFound = activeChapters.find(ch => ch.id === c.chapterId);
                            if (chFound) {
                                chapterLabel = `Cap. ${String(c.chapterId).padStart(2, '0')} — ${chFound.title}`;
                            }
                        }

                        return `
                            <div class="pvp-challenge-card" style="flex-direction:column;align-items:stretch;gap:0.8rem;border-left:4px solid ${won ? 'var(--green)' : 'var(--red)'};">
                                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
                                    <div style="display:flex;align-items:center;gap:0.5rem;">
                                        <span class="status-badge" style="background:${won ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)'};color:${won ? '#4ade80' : '#f87171'};border:1px solid ${won ? '#4ade80' : '#f87171'};font-size:0.7rem;font-weight:700;padding:0.2rem 0.5rem;border-radius:3px;">
                                            ${won ? 'VITÓRIA' : 'DERROTA'}
                                        </span>
                                        <span style="font-size:0.75rem;color:var(--text-dim);">vs <b style="color:var(--text-primary);">${opponentName}</b></span>
                                    </div>
                                    <span style="font-size:0.74rem;font-family:var(--font-code);color:var(--cyan);font-weight:600;">
                                        ${chapterLabel}
                                    </span>
                                </div>
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;background:rgba(0,0,0,0.25);padding:0.6rem 0.8rem;border-radius:4px;font-size:0.74rem;">
                                    <div>
                                        <span style="color:var(--text-dim);display:block;font-size:0.65rem;">SEU DESEMPENHO</span>
                                        <div style="color:var(--gold);font-weight:700;margin-top:0.1rem;">${myScore} pts &bull; ${myTimeStr}</div>
                                        <div style="font-size:0.68rem;color:var(--text-secondary);">${myHits} acertos / ${myErrors} erros</div>
                                    </div>
                                    <div>
                                        <span style="color:var(--text-dim);display:block;font-size:0.65rem;">OPONENTE</span>
                                        <div style="color:var(--purple-bright);font-weight:700;margin-top:0.1rem;">${oppScore} pts &bull; ${oppTimeStr}</div>
                                        <div style="font-size:0.68rem;color:var(--text-dim);">${isChallenger ? 'Desafiado' : 'Desafiante'}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        container.innerHTML = '<div class="pvp-screen">'
            + '<div class="pvp-header">'
            + '<div>'
            + '<h2 class="pvp-title">DUELOS PVP & RANKING DA GUILDA</h2>'
            + '<p class="pvp-subtitle">Duelos de código assíncronos: o desafiante resolve uma sequência de desafios primeiro; ao enviar, o adversário aceita e joga imediatamente contra o tempo. Quem resolver mais rápido e com código correto pontua mais alto e vence a partida!</p>'
            + '</div>'
            + '<div style="display:flex;align-items:center;gap:1.2rem;background:rgba(0,0,0,0.3);padding:0.6rem 1.2rem;border:1px solid var(--border-dim);border-radius:4px;">'
            + '<div><span style="font-size:0.65rem;color:var(--text-dim);display:block;">SEU TIER</span><span class="tier-badge" style="color:' + myTier.color + ';border-color:' + myTier.color + '">' + myTier.icon + ' ' + myTier.name + '</span></div>'
            + '<div><span style="font-size:0.65rem;color:var(--text-dim);display:block;">RENOME</span><span style="color:var(--gold);font-weight:700;font-size:0.9rem;">' + myRenome + ' ★</span></div>'
            + '<div><span style="font-size:0.65rem;color:var(--text-dim);display:block;">MMR</span><span style="color:var(--purple-bright);font-weight:700;font-size:0.9rem;">' + myCP + ' MMR</span></div>'
            + '</div>'
            + '</div>'
            + tiersOverviewHTML
            + '<div class="pvp-actions" style="margin-bottom:1.5rem;">'
            + '<button class="glow-button primary" onclick="app.showChallengeSelector()" style="display:inline-flex;align-items:center;gap:0.5rem;">'
            + '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.7 2.3a1 1 0 0 0-1.4 0l-4.9 4.9-1.4-1.4a1 1 0 0 0-1.4 0l-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4-6.6 6.6-1.6-.5-.8.8 2.3 2.3-3.2 3.2 1.4 1.4 3.2-3.2 2.3 2.3.8-.8-.5-1.6 6.6-6.6 1.4 1.4a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 0 0 0-1.4l-1.4-1.4 4.9-4.9a1 1 0 0 0 0-1.4l-1.6-1.6zm-8.4 9.8l-1.4-1.4 3.5-3.5 1.4 1.4-3.5 3.5zM4.3 2.3a1 1 0 0 0-1.4 0l-1.6 1.6a1 1 0 0 0 0 1.4l4.9 4.9-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0l1.4-1.4 6.6 6.6-.5 1.6.8.8 2.3-2.3 3.2 3.2 1.4-1.4-3.2-3.2 2.3-2.3-.8-.8-1.6.5-6.6-6.6 1.4-1.4a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 0l-1.4 1.4-4.9-4.9zm5.6 5.6l1.4 1.4-3.5 3.5-1.4-1.4 3.5-3.5z"/></svg>'
            + ' CRIAR NOVO DESAFIO</button>'
            + '</div>'
            + '<div class="pvp-section">'
            + '<h3 class="pvp-section-title">DESAFIOS PENDENTES (' + (challenges ? challenges.length : 0) + ')</h3>'
            + (!challenges || challenges.length === 0
                ? '<p class="pvp-empty">Nenhum desafio pendente no momento.</p>'
                : '<div class="pvp-challenge-list">' + challenges.map(c =>
                    '<div class="pvp-challenge-card" style="flex-direction:column;align-items:stretch;gap:0.9rem;">'
                    + '<div class="pvp-challenge-info">'
                    + '<div class="pvp-challenge-name" style="font-size:1rem;margin-bottom:0.35rem;">' + (c.challengerName || 'Jogador') + '</div>'
                    + '<div class="pvp-challenge-detail" style="font-size:0.82rem;word-break:break-word;">Capítulo ' + (c.chapterId ? String(c.chapterId).padStart(2, '0') + ' — ' + (c.chapterTitle || '---') : (c.chapterTitle || '---')) + '</div>'
                    + '</div>'
                    + '<div style="display:flex;align-items:center;justify-content:flex-end;gap:0.75rem;padding-top:0.6rem;border-top:1px solid var(--border-ghost);flex-wrap:wrap;">'
                    + '<button class="glow-button danger" style="padding:0.45rem 1.1rem;font-size:0.75rem;display:inline-flex;align-items:center;gap:0.35rem;" onclick="app.declineChallenge(\'' + c.id + '\')">'
                    + '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> RECUSAR</button>'
                    + '<button class="glow-button primary" style="padding:0.45rem 1.3rem;font-size:0.75rem;display:inline-flex;align-items:center;gap:0.35rem;" onclick="app.acceptChallenge(\'' + c.id + '\')">'
                    + '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> ACEITAR</button>'
                    + '</div>'
                    + '</div>'
                ).join('') + '</div>'
            )
            + '</div>'
            + '<div class="pvp-section" style="margin-top:2rem;">'
            + '<h3 class="pvp-section-title">HISTÓRICO DE DUELOS PVP (' + (history ? history.length : 0) + ')</h3>'
            + historyHTML
            + '</div>'
            + '<div class="pvp-section" style="margin-top:2rem;">'
            + '<h3 class="pvp-section-title">TABELA DE CLASSIFICAÇÃO DA GUILDA</h3>'
            + leaderboardHTML
            + '</div>'
            + '</div>';
    }

    // ─── TOURNAMENTS SCREEN ───
    renderTournamentsScreen(tournaments = [], hallOfFame = []) {
        this.showScreen('tournament');
        const container = document.getElementById('tournament-content');
        if (!container) return;
        const isTeacher = typeof authManager !== 'undefined' && authManager.isTeacher();
        
        // Render Hall of Fame Cards
        let hallHtml = '';
        if (!hallOfFame || hallOfFame.length === 0) {
            hallHtml = `
                <div class="hall-empty">
                    <p style="margin:0;color:var(--text-ghost);font-family:var(--font-display);letter-spacing:0.05em;">
                        NENHUM CAMPEÃO REGISTRADO AINDA NO HALL DA FAMA.
                    </p>
                    <span style="font-size:0.75rem;color:var(--text-dim);display:block;margin-top:0.3rem;">
                        Vença o primeiro lugar de um torneio para eternizar seu nome no Panteão da Guilda!
                    </span>
                </div>
            `;
        } else {
            hallHtml = `
                <div class="hall-of-fame-grid">
                    ${hallOfFame.map((t, idx) => {
                        const winner = t.winner || {};
                        const dateStr = t.finishedAt ? new Date(t.finishedAt.seconds * 1000).toLocaleDateString('pt-BR') : (t.createdAt ? new Date(t.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : '---');
                        const safeWinnerName = (winner.name || 'Campeão').replace(/'/g, "\\'");
                        const safeTitle = (t.title || 'Torneio').replace(/'/g, "\\'");

                        return `
                            <div class="hall-champion-card">
                                <div class="hall-champion-top">
                                    <div class="hall-champion-avatar-box">
                                        <img src="${winner.photoURL || 'assets/avatars/avatar_01.png'}" class="hall-champion-avatar" alt="${winner.name || 'Campeão'}" />
                                        <div class="hall-champion-crown-tag">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg>
                                            #1
                                        </div>
                                    </div>
                                    <div class="hall-champion-info">
                                        <div class="hall-champion-name">${winner.name || 'Campeão'}</div>
                                        <div class="hall-champion-sub">LV. ${String(winner.level || 1).padStart(2, '0')} • CAMPEÃO</div>
                                    </div>
                                    ${isTeacher ? `
                                        <button class="hall-remove-btn" onclick="app.handleRemoveFromHallOfFame('${t.id}', '${safeWinnerName}')" title="Remover do Hall da Fama">
                                            ✕ REMOVER
                                        </button>
                                    ` : ''}
                                </div>
                                <div class="hall-champion-tournament">
                                    <div style="font-weight:700;color:var(--text-primary);margin-bottom:0.15rem;">${t.title || 'Torneio da Guilda'}</div>
                                    <div style="font-size:0.7rem;color:var(--text-ghost);">Mestre: ${t.teacherName || 'Mestre da Guilda'}</div>
                                </div>
                                <div class="hall-champion-meta">
                                    <span>Vitória em: <strong>${dateStr}</strong></span>
                                    <span class="hall-champion-score">${winner.score || 0} PTS</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        container.innerHTML = `
            <div class="tournament-screen">
                <div class="tournament-header">
                    <div class="tournament-header-info">
                        <h2 class="tournament-title">TORNEIOS & HALL DA FAMA</h2>
                        <p class="tournament-subtitle">Batalhas de código em tempo real e o panteão dos maiores campeões da história da Guilda.</p>
                    </div>
                    ${isTeacher ? `
                        <div class="tournament-actions">
                            <button class="glow-button primary pulse-action" onclick="app.createTournament()">
                                <span>+ CRIAR NOVO TORNEIO</span>
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- ══════ HALL DA FAMA DOS CAMPEÕES ══════ -->
                <div class="hall-of-fame-section">
                    <div class="hall-of-fame-header">
                        <h3 class="hall-of-fame-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg>
                            <span>HALL DA FAMA • PANTEÃO DOS CAMPEÕES</span>
                        </h3>
                        <span style="font-size:0.75rem;color:var(--gold);font-family:var(--font-code);">${hallOfFame ? hallOfFame.length : 0} Campeão(ões) Eternizado(s)</span>
                    </div>
                    ${hallHtml}
                </div>

                <!-- ══════ TORNEIOS DISPONÍVEIS ══════ -->
                <div class="tournament-list-section">
                    <h3 class="tournament-section-title">
                        <span>TORNEIOS AO VIVO E DISPONÍVEIS (${tournaments ? tournaments.length : 0})</span>
                    </h3>

                    ${(!tournaments || tournaments.length === 0) ? `
                        <div class="tournament-empty">
                            <p>Nenhum torneio ativo no momento.</p>
                            <span style="font-size:0.78rem;color:var(--text-ghost);display:block;margin-top:0.4rem;">
                                ${isTeacher ? 'Clique em "+ CRIAR NOVO TORNEIO" acima para iniciar uma sessão de batalha.' : 'Aguarde o Mestre da sua Guilda abrir uma nova sala de torneio.'}
                            </span>
                        </div>
                    ` : `
                        <div class="tournament-card-list">
                            ${tournaments.map(t => {
                                const count = (t.participants && t.participants.length) ? t.participants.length : 0;
                                const statusText = t.status === 'active' ? 'EM ANDAMENTO' : (t.status === 'waiting' ? 'AGUARDANDO' : 'ENCERRADO');
                                const statusCls = t.status === 'active' ? 'active' : (t.status === 'waiting' ? 'waiting' : 'ended');
                                const challengesCount = (t.challenges && t.challenges.length) ? t.challenges.reduce((acc, c) => acc + (c.activities ? c.activities.length : 0), 0) : 0;
                                const safeTitle = (t.title || 'Torneio').replace(/'/g, "\\'");
                                
                                return `
                                    <div class="tournament-card">
                                        <div class="tournament-card-main">
                                            <div class="tournament-card-title-group">
                                                <span class="tournament-card-icon">⚔</span>
                                                <h4 class="tournament-card-name">${t.title || 'Torneio'}</h4>
                                            </div>
                                            
                                            <div class="tournament-card-status-row">
                                                <span class="tournament-status-badge ${statusCls}">${statusText}</span>
                                            </div>
                                            
                                            <div class="tournament-card-meta-chips">
                                                <span class="meta-chip" title="Tempo Limite">
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                                    <span>${t.timeLimit || 15} min</span>
                                                </span>
                                                <span class="meta-chip" title="Total de Participantes">
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--cyan);"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                                    <span>${count} participante(s)</span>
                                                </span>
                                                ${challengesCount ? `
                                                    <span class="meta-chip" title="Quantidade de Desafios">
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--purple-bright);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                                        <span>${challengesCount} desafios</span>
                                                    </span>
                                                ` : ''}
                                                <span class="meta-chip" title="Mestre Organizador">
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--gold);"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg>
                                                    <span>Mestre: <b style="color:var(--text-primary);">${t.teacherName || 'Mestre'}</b></span>
                                                </span>
                                            </div>

                                            <div class="tournament-card-actions">
                                                ${isTeacher ? `
                                                    <button class="glow-button btn-secondary-sm" onclick="event.stopPropagation();app.openEditTournament('${t.id}')" title="Editar configurações do torneio">
                                                        ✎ EDITAR
                                                    </button>
                                                    <button class="glow-button btn-danger-sm" onclick="event.stopPropagation();app.confirmDeleteTournament('${t.id}','${safeTitle}')" title="Excluir este torneio">
                                                        ✕ EXCLUIR
                                                    </button>
                                                ` : ''}
                                                <button class="glow-button primary tournament-join-btn" onclick="app.joinTournament('${t.id}')">
                                                    <span>ENTRAR ➔</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    // ─── DRAMATIC TOURNAMENT END RESULTS MODAL (VICTORY / DEFEAT) ───
    showTournamentEndResultModal(t) {
        if (!t) return;
        const currentUid = (typeof authManager !== 'undefined' && authManager.currentUser?.uid) || '';
        const myName = (typeof authManager !== 'undefined' && authManager.getDisplayName()) || this.engine.getPlayerName() || 'Jogador';
        const participants = (t.participants && Array.isArray(t.participants)) ? t.participants : [];
        
        // Find current player position
        const myIndex = participants.findIndex(p => (p.uid && p.uid === currentUid) || p.name === myName);
        const myRank = myIndex !== -1 ? (participants[myIndex].rank || (myIndex + 1)) : (participants.length > 0 ? participants.length : 1);
        const myScore = myIndex !== -1 ? (participants[myIndex].score || 0) : 0;
        const isWinner = myRank === 1 && participants.length > 0;
        const topWinner = participants[0] || { name: 'Campeão', score: 0 };

        let overlay = document.getElementById('modal-tournament-result-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'modal-tournament-result-overlay';
            overlay.className = 'tournament-result-overlay';
            document.body.appendChild(overlay);
        }

        if (isWinner) {
            if (window.soundFX && typeof window.soundFX.playFanfare === 'function') {
                window.soundFX.playFanfare();
            }
        } else {
            if (window.soundFX && typeof window.soundFX.playError === 'function') {
                window.soundFX.playError();
            }
        }

        const crownSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;color:var(--gold);"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg>`;
        const swordsSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;color:var(--cyan);"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 17.5L21 6V3h-3L6.5 14.5"/><path d="M11 19l-6-6"/><path d="M8 16l-4 4"/><path d="M5 21l-2-2"/></svg>`;
        const largeTrophySvg = `<svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="url(#trophyGoldGrad)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 20px rgba(245,158,11,0.6));"><defs><linearGradient id="trophyGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fef08a"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#b45309"/></linearGradient></defs><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-2c-.55 0-1-.45-1-1v-2.34"/><path d="M6 4h12a2 2 0 0 1 2 2v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2z"/></svg>`;
        const largeDefeatSwordsSvg = `<svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 20px rgba(239,68,68,0.6));"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 17.5L21 6V3h-3L6.5 14.5"/><path d="M11 19l-6-6"/><path d="M8 16l-4 4"/><path d="M5 21l-2-2"/></svg>`;
        const chartIconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.4rem;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;
        const dashboardIconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.4rem;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

        overlay.innerHTML = `
            <div class="result-box ${isWinner ? 'result-box-victory' : 'result-box-defeat'}">
                <div class="result-glow"></div>
                <div class="result-badge ${isWinner ? 'victory' : 'defeat'}" style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
                    ${isWinner ? `${crownSvg} <span>[ VITÓRIA SUPREMA ]</span> ${crownSvg}` : `${swordsSvg} <span>[ BATALHA CONCLUÍDA ]</span> ${swordsSvg}`}
                </div>
                
                <div class="result-icon-container" style="display:flex;justify-content:center;align-items:center;margin:0.8rem 0;">
                    <div class="${isWinner ? 'result-trophy-anim' : 'result-defeat-anim'}">
                        ${isWinner ? largeTrophySvg : largeDefeatSwordsSvg}
                    </div>
                </div>

                <h2 class="result-main-title ${isWinner ? 'gold-text' : 'red-text'}">
                    ${isWinner ? '1º LUGAR — CAMPEÃO DA GUILDA!' : `${myRank}º LUGAR NO TORNEIO`}
                </h2>

                <p class="result-subtitle">
                    ${isWinner 
                        ? 'Você superou todos os adversários com maestria de código e velocidade absoluta.' 
                        : `O duelo foi árduo. O campeão desta batalha foi <b>${topWinner.name}</b> com ${topWinner.score} pts.`}
                </p>

                <div class="result-stats-card">
                    <div class="result-stat">
                        <span class="stat-lbl">SUA CLASSIFICAÇÃO</span>
                        <span class="stat-num ${isWinner ? 'gold-text' : 'cyan-text'}">#${myRank} / ${participants.length || 1}</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-lbl">PONTUAÇÃO FINAL</span>
                        <span class="stat-num ${isWinner ? 'gold-text' : 'purple-text'}">${myScore} PTS</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-lbl">STATUS</span>
                        <span class="stat-num ${isWinner ? 'green-text' : 'red-text'}">${isWinner ? 'VITORIOSO' : 'DERROTADO'}</span>
                </div>

                ${isWinner ? (() => {
                    const isCSharp = this.isCSharpWorld();
                    const crystalConfig = (typeof app !== 'undefined' && app.getCrystalRewardsConfig)
                        ? app.getCrystalRewardsConfig()
                        : { shop: 1, lastAbyss: 1, tournament: 4, lastBoss: 2, pvp: 2 };
                    const tourCrystals = isCSharp ? (crystalConfig.tournament ?? 4) : 0;
                    const pts = (tourCrystals * 0.5).toFixed(1);

                    // Concede o cristal para o campeão se ainda não resgatado neste torneio
                    if (tourCrystals > 0 && this.engine && this.engine.state) {
                        if (!this.engine.state.tournamentsWon) this.engine.state.tournamentsWon = {};
                        if (!this.engine.state.tournamentsWon[t.id]) {
                            this.engine.state.tournamentsWon[t.id] = true;
                            if (!this.engine.state.redeemedRewards) {
                                this.engine.state.redeemedRewards = { absences: 0, extraPoints: 0.0, history: [] };
                            }
                            const currentPoints = this.engine.state.redeemedRewards.extraPoints || 0.0;
                            this.engine.state.redeemedRewards.extraPoints = Math.round((currentPoints + Number(pts)) * 10) / 10;
                            this.engine.state.redeemedRewards.history.push({
                                type: 'extra_point',
                                name: `Cristal de Ascensão Vitorioso (${tourCrystals}x Campeão de Torneio)`,
                                source: 'tournament',
                                tournamentId: t.id,
                                amount: Number(pts),
                                crystals: tourCrystals,
                                cost: 0,
                                date: new Date().toISOString()
                            });
                            this.engine.save();
                            this.engine.saveToCloud();
                        }
                    }

                    return tourCrystals > 0 ? `
                        <div style="background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(99,102,241,0.12));border:1px solid var(--gold);padding:0.8rem 1.2rem;border-radius:6px;margin-bottom:1rem;display:flex;align-items:center;gap:0.8rem;justify-content:center;">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span style="font-size:0.85rem;color:#fff;">Recompensa Suprema: <strong style="color:var(--gold);">+${tourCrystals} Cristais de Ascensão (+${pts} na Média Acadêmica)</strong></span>
                        </div>
                    ` : '';
                })() : ''}

                <div class="result-quote">
                    ${isWinner 
                        ? '"Aquele que reina sobre a lógica curva o próprio mundo à sua vontade."' 
                        : '"Levante-se... Cada erro na sintaxe é o prelúdio da compilação perfeita."'}
                </div>

                <div class="result-actions" style="justify-content:center;">
                    <button class="glow-button primary pulse-action" style="padding:0.7rem 2.2rem;" onclick="document.getElementById('modal-tournament-result-overlay').classList.remove('active');app.openTournaments();">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.4rem;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> RETORNAR AO TORNEIO
                    </button>
                </div>
            </div>
        `;

        overlay.classList.add('active');
    }

    // ─── TOAST (COM ÍCONES SVG PROFISSIONAIS E SEM EMOJIS) ───
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        // Remove emojis residuais da mensagem de texto
        let cleanMessage = String(message || '')
            .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{200D}\u{FE0F}]/gu, '')
            .replace(/\s{2,}/g, ' ')
            .trim();

        // SVGs profissionais para cada categoria de notificação
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="toast-svg-icon" style="color:var(--green);flex-shrink:0;"><path d="M20 6L9 17l-5-5"/></svg>`;
        } else if (type === 'error') {
            iconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="toast-svg-icon" style="color:var(--red);flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
        } else if (type === 'xp') {
            iconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-svg-icon" style="color:var(--gold);flex-shrink:0;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
        } else if (type === 'skill') {
            iconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-svg-icon" style="color:#c084fc;flex-shrink:0;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
        } else {
            // 'info' ou default
            iconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="toast-svg-icon" style="color:var(--cyan);flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `${iconSvg}<span class="toast-text">${cleanMessage}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
    }

    // ─── LEVEL UP ANIMATION MODAL ───
    showLevelUpAnimation(newLevel) {
        if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
            window.soundFX.playCheckCodeSuccess();
        }
        
        let overlay = document.getElementById('modal-level-up-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'modal-level-up-overlay';
            overlay.className = 'level-up-modal-overlay';
            document.body.appendChild(overlay);
        }

        const isCSharp = this.isCSharpWorld();
        const langLabel = isCSharp ? 'C# e Unity' : 'linguagem C';

        overlay.innerHTML = `
            <div class="level-up-card">
                <div class="level-up-badge-top">◆ EVOLUÇÃO DE CLASSE ◆</div>
                <h2 class="level-up-title">LEVEL UP!</h2>
                <div class="level-up-number">LV. ${String(newLevel).padStart(2, '0')}</div>
                <p class="level-up-desc">Sua maestria com ${langLabel} aumentou e novas habilidades foram destravadas.</p>
                <button class="glow-button primary pulse-action level-up-btn" onclick="app.ui.hideLevelUpAnimation()">CONTINUAR JORNADA</button>
            </div>
        `;

        setTimeout(() => overlay.classList.add('active'), 20);
    }

    hideLevelUpAnimation() {
        const overlay = document.getElementById('modal-level-up-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 350);
        }
    }

    // ─── STREAK POPOVER (OFENSIVA ESTILO DUOLINGO) ───
    renderStreakPopover() {
        const streak = this.engine.getStreak();
        const popover = document.getElementById('streak-popover');
        if (!popover) return;

        const badge = document.getElementById('streak-popover-status');
        if (badge) badge.textContent = `${streak.current || 0} DIAS`;

        const freezesEl = document.getElementById('streak-freezes-count');
        if (freezesEl) freezesEl.textContent = streak.freezes || 0;

        const grid = document.getElementById('streak-days-grid');
        if (grid) {
            const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
            const today = new Date();
            const currentDayIdx = today.getDay(); // 0 (Dom) a 6 (Sab)

            // Calcula o início da semana (último Domingo)
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - currentDayIdx);

            grid.innerHTML = '';
            for (let i = 0; i < 7; i++) {
                const dayDate = new Date(startOfWeek);
                dayDate.setDate(startOfWeek.getDate() + i);
                const isoStr = dayDate.toISOString().split('T')[0];
                const isCompleted = !!(streak.history && streak.history[isoStr]);
                const isToday = i === currentDayIdx;

                const dayEl = document.createElement('div');
                dayEl.className = `streak-day-item ${isCompleted ? 'active' : ''} ${isToday ? 'is-today' : ''}`;
                dayEl.innerHTML = `
                    <span class="streak-day-lbl">${dayNames[i]}</span>
                    <div class="streak-day-dot"></div>
                `;
                grid.appendChild(dayEl);
            }
        }
    }

    // ─── GUILD SHOP (TELA COMPLETA DO MERCADO DA GUILDA) ───
    renderGuildShop() {
        const userTokens = this.engine.getTokens();
        const redeemed = this.engine.state.redeemedRewards || { absences: 0, extraPoints: 0.0 };

        const screenTokensDisplay = document.getElementById('shop-screen-user-tokens');
        if (screenTokensDisplay) screenTokensDisplay.textContent = userTokens;

        const container = document.getElementById('shop-content');
        if (!container) return;

        const isCSharp = this.isCSharpWorld();
        const crystalConfig = (typeof app !== 'undefined' && app.getCrystalRewardsConfig) 
            ? app.getCrystalRewardsConfig() 
            : { shop: 1, lastAbyss: 1, tournament: 4, lastBoss: 2, pvp: 2 };

        const shopCrystalLimit = isCSharp ? (crystalConfig.shop || 1) : 3;
        const shopCrystalMaxPts = Math.round(shopCrystalLimit * 0.5 * 10) / 10;
        const totalCrystals = (crystalConfig.shop || 0) + (crystalConfig.lastAbyss || 0) + (crystalConfig.tournament || 0) + (crystalConfig.lastBoss || 0) + (crystalConfig.pvp || 0);
        const totalMaxPts = (totalCrystals * 0.5).toFixed(1);

        const shopCatalog = [
            {
                id: 'absence',
                type: 'academic',
                name: 'Pergaminho de Presença',
                subtitle: 'Abono de Falta em Aula',
                description: 'Justifica 1 falta no registro acadêmico oficial da disciplina. A solicitação é enviada e auditada pelo Mestre da Guilda.',
                cost: 400,
                current: redeemed.absences || 0,
                max: 12,
                unit: 'faltas',
                iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`
            },
            {
                id: 'extra_point',
                type: 'academic',
                name: 'Cristal de Ascensão',
                subtitle: '+0.5 Ponto Extra na Média',
                description: 'Concede +0.5 ponto adicional na média final das atividades práticas e laboratoriais do semestre letivo.',
                cost: isCSharp ? 1500 : 750,
                amountValue: 0.5,
                current: redeemed.extraPoints || 0.0,
                max: shopCrystalMaxPts,
                unit: 'pontos',
                iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
            },
            {
                id: 'streak_freeze',
                type: 'utility',
                name: 'Escudo de Ofensiva (Freeze)',
                subtitle: 'Proteção contra Perda de Streak',
                description: 'Preserva automaticamente sua sequência de dias consecutivos caso você não consiga programar por 1 dia.',
                cost: 150,
                current: (this.engine.state.streak && this.engine.state.streak.freezes) || 0,
                max: 2,
                unit: 'estocados',
                iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
            },
            {
                id: 'raid_potion',
                type: 'raid',
                name: 'Poção de Cura Individual',
                subtitle: 'Item para Boss Battle Raids',
                description: 'Restaura instantaneamente +45% do HP máximo do seu personagem durante as batalhas contra Chefes da Raid.',
                cost: 40,
                current: (this.engine.state.raidInventory && this.engine.state.raidInventory.soloPotions) || 0,
                max: 10,
                unit: 'poções',
                iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 19L14 8V4h1V2H9v2h1v4L5 19c-.55.88-.13 2 1 2h12c1.13 0 1.55-1.12 1-2z"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="12" y1="10" x2="12" y2="16"/></svg>`
            },
            {
                id: 'raid_group_potion',
                type: 'raid',
                name: 'Elixir de Cura Coletiva',
                subtitle: 'Item em Grupo para Boss Battle Raids',
                description: 'Restaura +35% de HP para TODOS os 4 combatentes da sua party simultaneamente durante as Boss Raids.',
                cost: 95,
                current: (this.engine.state.raidInventory && this.engine.state.raidInventory.groupPotions) || 0,
                max: 5,
                unit: 'elixires',
                iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M12 11l2 2 4-4"/></svg>`
            }
        ];

        const cardsHtml = shopCatalog.map(item => {
            const isMaxed = item.current >= item.max;
            const canAfford = userTokens >= item.cost;
            const progressPercent = Math.min(100, Math.round((item.current / item.max) * 100));

            return `
                <div class="shop-card-screen ${isMaxed ? 'maxed' : ''}">
                    <div class="shop-card-badge ${item.type}">
                        ${item.type === 'academic' ? 'RECOMPENSA ACADÊMICA' : item.type === 'raid' ? 'CONSUMÍVEL DE RAID' : 'ARTEFATO UTILITÁRIO'}
                    </div>

                    <div class="shop-item-icon-box-lg">
                        ${item.iconSvg}
                    </div>

                    <div class="shop-item-name-lg">${item.name}</div>
                    <div class="shop-item-sub-lg">${item.subtitle}</div>
                    <p class="shop-item-desc-lg">${item.description}</p>

                    <div class="shop-limit-bar-wrap-lg">
                        <div class="shop-limit-header">
                            <span>Limite Semestral / Capacidade:</span>
                            <strong style="color:${isMaxed ? 'var(--red)' : 'var(--text-primary)'};font-family:var(--font-code);">${item.current} / ${item.max} ${item.unit}</strong>
                        </div>
                        <div class="shop-limit-bar-bg">
                            <div class="shop-limit-bar-fill" style="width:${progressPercent}%;background:${isMaxed ? 'var(--red)' : 'var(--gold)'};"></div>
                        </div>
                    </div>

                    <div class="shop-card-action-row-lg">
                        <div class="shop-price-tag-lg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                            <span>${item.cost} Tokens</span>
                        </div>
                        <button class="glow-button ${canAfford && !isMaxed ? 'primary pulse-action' : ''}" 
                                style="padding:0.6rem 1.4rem;font-size:0.82rem;"
                                ${(!canAfford || isMaxed) ? 'disabled' : ''}
                                onclick="app.handleBuyShopItem('${item.id}', ${item.cost}, ${item.amountValue || 1})">
                            ${isMaxed ? 'LIMITE ATINGIDO' : (canAfford ? 'ADQUIRIR RECOMPENSA' : 'TOKENS INSUFICIENTES')}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        const isMaster = (typeof authManager !== 'undefined') && (
            (typeof authManager.isTeacher === 'function' && authManager.isTeacher()) ||
            (typeof authManager.isAdmin === 'function' && authManager.isAdmin()) ||
            (typeof authManager.isAdminEmail === 'function' && authManager.isAdminEmail(authManager.currentUser?.email || authManager.userData?.email))
        );

        container.innerHTML = `
            <div class="shop-screen-header-banner">
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
                    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                        <div class="shop-banner-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                        </div>
                        <div>
                            <h2 style="font-family:var(--font-display);font-size:1.35rem;color:var(--gold);margin:0;letter-spacing:0.08em;">MERCADO DE ARTEFATOS DA GUILDA</h2>
                            <p style="font-size:0.85rem;color:var(--text-secondary);margin:0.25rem 0 0 0;">Troque seus Tokens conquistados por abonos de falta, pontos extras na média e proteções de ofensiva.</p>
                        </div>
                    </div>
                    ${isMaster ? `
                        <button class="btn-teacher-crystal-config" onclick="app.openCrystalConfigModal()" title="Configurar a quantidade de Cristais de Ascensão concedidos no semestre">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                            <span>EDITAR CRISTAIS</span>
                        </button>
                    ` : ''}
                </div>
            </div>

            <!-- GUIA PEDAGÓGICO E EQUIVALÊNCIA DOS CRISTAIS DE ASCENSÃO -->
            <div class="shop-crystal-guide-card">
                <div class="crystal-guide-header">
                    <div class="crystal-guide-title-box">
                        <div class="crystal-guide-gem-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <div>
                            <h3 class="crystal-guide-title">GUIA DOS CRISTAIS DE ASCENSÃO</h3>
                            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:0.2rem;">
                                <strong>Regra de Equivalência:</strong> Cada <strong style="color:var(--gold);">1 Cristal de Ascensão equivale a +0.5 ponto na média acadêmica</strong>.
                            </div>
                        </div>
                    </div>
                    <div class="crystal-guide-badge">
                        <span>POTENCIAL MÁXIMO:</span>
                        <strong style="color:var(--gold);">${totalCrystals} Cristais (+${totalMaxPts} pts na média)</strong>
                    </div>
                </div>

                <div class="crystal-guide-grid">
                    <div class="crystal-source-item" title="Resgatável na Loja da Guilda acumulando Tokens">
                        <div class="crystal-source-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                        </div>
                        <div class="crystal-source-info">
                            <div class="crystal-source-name">Loja da Guilda</div>
                            <div class="crystal-source-val">${crystalConfig.shop || 1} Cristal (+${((crystalConfig.shop || 1) * 0.5).toFixed(1)} pt)</div>
                        </div>
                    </div>

                    <div class="crystal-source-item" title="Ao concluir todas as 5 Câmaras do último Andar do Abismo">
                        <div class="crystal-source-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                        </div>
                        <div class="crystal-source-info">
                            <div class="crystal-source-name">Último Abismo</div>
                            <div class="crystal-source-val">${crystalConfig.lastAbyss || 1} Cristal (+${((crystalConfig.lastAbyss || 1) * 0.5).toFixed(1)} pt)</div>
                        </div>
                    </div>

                    <div class="crystal-source-item" title="Concedido ao 1º colocado (Campeão) dos Torneios da Guilda">
                        <div class="crystal-source-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34c3.08-.85 5-3.3 5-6.66V4H6v4c0 3.36 1.92 5.81 5 6.66z"/></svg>
                        </div>
                        <div class="crystal-source-info">
                            <div class="crystal-source-name">Torneio da Guilda</div>
                            <div class="crystal-source-val">${crystalConfig.tournament || 4} Cristais (+${((crystalConfig.tournament || 4) * 0.5).toFixed(1)} pts)</div>
                        </div>
                    </div>

                    <div class="crystal-source-item" title="Ao derrotar o Chefe Supremo da Raid (Apex Kernel / Nul)">
                        <div class="crystal-source-icon">
                            <svg width="20" height="20" viewBox="0 0 1049 869" fill="currentColor"><path d="M524.195 182.468C537.341 175.946 596.606 151.705 607.821 154.982C639.72 164.3 684.075 201.796 712.045 221.497C723.432 229.515 736.472 234.69 748.271 241.795C750.573 243.181 762.857 244.723 766.659 245.597C769.055 249.355 773.341 256.431 774.914 261.151C785.18 291.886 796.288 325.66 797.496 358.199C797.569 360.164 795.744 368.857 795.306 371.378L789.971 401.603C788.518 409.688 788.292 417.071 786.773 425.196C810.277 428.256 835.633 434.007 859.157 438.16C869.828 440.044 881.328 443.737 892.324 445.978C864.559 471.687 835.779 505.437 812.805 535.805C805.141 546.522 798.512 558.015 791.099 568.892C786.521 575.614 780.223 581.732 775.657 588.514C773.68 591.454 769.878 595.635 768.384 598.614C759.552 616.206 748.795 632.358 738.636 649.154C729.604 664.091 721.276 679.851 712.901 695.041C712.417 695.917 711.906 695.652 711.096 695.625C704.109 686.534 699.192 661.257 694.925 649.605C692.124 641.954 688.879 634.906 685.588 627.454C684.062 648.994 682.004 668.298 683.119 690.031C683.909 705.459 683.511 731.147 680.691 746.317C668.115 758.222 654.087 768.003 640.789 778.972C622.553 794.003 604.775 808.648 585.724 822.65C580.368 793.074 576.466 765.886 566.672 737.431C564.124 746.443 561.874 781.381 560.925 792.616C559.505 810.725 558.423 828.012 555.51 845.956C545.171 853.262 534.561 861.271 524.242 868.757C513.744 861.331 503.38 853.706 493.165 845.896C491.196 838.258 489.892 820.991 489.224 812.763L485.212 763.564C484.509 755.375 483.927 745.255 481.908 737.425C471.848 766.172 468.517 792.762 462.734 822.498C445.243 810.798 425.976 793.671 409.413 780.379C397.664 770.943 377.285 756.165 367.394 745.693C366.479 733.987 364.231 714.564 365.036 703.217C366.935 676.441 364.744 654.077 362.907 627.5C359.46 635.105 356.016 643.121 353.125 650.952C350.546 657.933 342.085 694.384 336.529 695.778C335.188 694.922 285.511 607.686 280.386 598.767C275.947 591.043 262.196 576.404 257.965 569.675C230.273 525.639 194.692 481.014 156.033 446.012C168.036 443.892 179.536 439.954 191.003 437.86C213.863 433.685 238.778 428.65 261.67 425.293C260.369 418.249 260.146 410.435 258.874 403.227L253.859 375.141C253.185 371.463 250.849 360.071 251.029 356.646C252.751 323.983 263.677 289.563 274.493 258.772C275.832 254.963 279.669 248.801 281.671 245.59C286.412 244.25 296.407 243.628 300.074 241.751C312.014 235.638 324.821 228.442 336.356 221.52C340.724 218.898 348.113 212.104 352.438 209.136C371.62 195.975 420.923 157.813 441.451 154.558C472.845 159.539 495.362 169.39 524.195 182.468ZM316.939 448.92C319.44 453.732 326.834 469.118 329.235 472.667C339.468 487.785 357.954 508.219 371.802 520.16C387.708 534.046 406.591 547.75 424.275 559.575C419.063 509.428 410.47 459.354 410.929 408.853C411.215 377.497 415.854 346.888 416.987 315.659C417.462 302.557 417.788 289.695 419.051 276.637C419.396 273.074 420.798 263.185 420.42 260.444C403.66 280.074 392.139 298.225 378.814 320.357C370.03 334.947 361.394 348.415 353.615 363.772C347.382 376.077 341.339 388.228 335.266 400.66C329.81 411.832 322.451 423.211 318.409 435.095C317.249 438.503 317.118 445.179 316.939 448.92ZM540.174 541.087C542.696 561.28 543.698 581.095 542.437 601.454C541.535 616.053 542.218 630.088 543.194 644.654C551.747 642.046 558.191 637.262 564.674 631.197C569.153 626.857 574.741 621.044 579.917 617.839C570.182 598.634 561.283 579.058 551.004 560.146C548.456 555.454 543.247 545.009 540.174 541.087ZM505.555 644.88C505.698 635.663 506.799 623.353 506.59 614.945C506.198 599.178 505.204 584.752 505.629 568.806C505.78 563.145 508.382 544.637 507.975 541.107C500.637 554.206 493.575 567.458 486.792 580.856C480.887 592.741 474.825 606.325 468.545 617.772C474.149 621.468 478.335 626.518 483.49 631.011C491.356 638.012 495.611 641.363 505.555 644.88ZM731.489 448.822C731.349 445.354 731.316 437.683 729.929 434.611C717.215 406.536 702.377 378.633 688.136 351.291C680.233 336.119 670.564 322.428 661.924 307.759C653.695 295.115 638.678 269.739 627.623 260.3C630.848 280.678 630.496 301.118 631.657 321.566C633.675 357.053 638.877 392.086 637.583 427.796C635.984 472.004 628.485 515.733 624.298 559.681C640.443 547.896 664.213 532.281 678.202 518.454C691.626 507.088 709.013 487.359 719.006 472.786C722.63 467.496 728.098 454.983 731.489 448.822Z"/><path d="M262.749 0.696387C271.653 -0.633434 302.716 2.8285 312.49 4.31959C262.639 15.1468 224.359 39.9367 188.322 75.5597C169.98 94.0136 153.158 113.919 138.022 135.083C134.305 140.185 127.461 148.951 123.935 155.894C116.997 169.551 101.891 213.006 114.798 225.982C126.662 233.215 142.626 232.09 156.087 234.6C192.017 241.3 230.535 247.804 267.113 247.14C256.048 263.117 242.518 308.369 238.192 328.323C227.977 322.536 221.634 317.185 210.118 312.208C205.472 310.744 200.588 310.158 195.576 309.149C173.628 304.732 137.216 298.56 115.49 300.084C88.0788 302.008 69.4583 321.1 39.0956 308.077C22.2264 300.841 21.9039 298.845 13.2367 282.526C9.09518 275.279 3.90656 268.159 0 260.149C2.9218 242.522 6.71225 221.55 8.68245 203.967C9.98972 191.2 11.2247 178.426 12.388 165.645C15.1392 135.868 15.0974 135.891 34.7199 113.17C50.0091 95.745 66.7012 79.6024 84.6281 64.9051C121.44 34.7773 146.524 20.2804 194.282 8.95151C203.56 6.75037 213.226 3.95732 222.754 2.652C235.943 0.845022 249.442 1.67653 262.749 0.696387Z"/><path d="M770.859 0.708586C771.171 0.626953 771.483 0.52543 771.802 0.465043C778.65 -0.840225 787.098 1.00122 794.112 1.14854C803.94 1.35426 813.947 1.19036 823.715 2.36693C832.866 3.46916 841.831 5.882 850.776 8.06919C884.122 16.2274 914.282 27.7196 942.372 47.8981C965.02 64.1654 1024.54 116.176 1033.19 141.47C1035.37 147.869 1035.23 156.341 1035.87 163.107C1037.13 176.609 1038.27 190.145 1039.77 203.622C1041.87 222.572 1045.43 241.516 1048.55 260.326C1042.48 272.115 1034.51 282.548 1028.63 294.522C1023.27 305.443 1006.14 309.384 995.227 311.61C972.28 316.288 953.673 300.723 931.29 299.994C913.346 299.84 893.604 303.094 875.614 304.582C868.501 305.17 860.279 307.562 853.397 309.473C835.812 310.537 824.717 319.11 810.396 328.503C805.871 306.704 793.03 265.883 781.43 247.166C820.151 248.038 854.406 241.07 891.985 234.745C931.735 228.055 947.017 235.596 934.834 183.695C932.445 173.535 928.198 162.438 923.088 153.311C876.145 83.9346 820.662 24.1156 736.386 4.21504C747.793 2.57794 759.326 1.99596 770.859 0.708586Z"/></svg>
                        </div>
                        <div class="crystal-source-info">
                            <div class="crystal-source-name">Último Boss (Raid)</div>
                            <div class="crystal-source-val">${crystalConfig.lastBoss || 2} Cristais (+${((crystalConfig.lastBoss || 2) * 0.5).toFixed(1)} pts)</div>
                        </div>
                    </div>

                    <div class="crystal-source-item" title="Ao alcançar o Elo mais alto da Arena PVP Ranqueada (Legendary CodeMancer)">
                        <div class="crystal-source-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.7 2.3a1 1 0 0 0-1.4 0l-4.9 4.9-1.4-1.4a1 1 0 0 0-1.4 0l-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4-6.6 6.6-1.6-.5-.8.8 2.3 2.3-3.2 3.2 1.4 1.4 3.2-3.2 2.3 2.3.8-.8-.5-1.6 6.6-6.6 1.4 1.4a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 0 0 0-1.4l-1.4-1.4 4.9-4.9a1 1 0 0 0 0-1.4l-1.6-1.6zm-8.4 9.8l-1.4-1.4 3.5-3.5 1.4 1.4-3.5 3.5zM4.3 2.3a1 1 0 0 0-1.4 0l-1.6 1.6a1 1 0 0 0 0 1.4l4.9 4.9-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0l1.4-1.4 6.6 6.6-.5 1.6.8.8 2.3-2.3 3.2 3.2 1.4-1.4-3.2-3.2 2.3-2.3-.8-.8-1.6.5-6.6-6.6 1.4-1.4a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 0l-1.4 1.4-4.9-4.9zm5.6 5.6l1.4 1.4-3.5 3.5-1.4-1.4 3.5-3.5z"/></svg>
                        </div>
                        <div class="crystal-source-info">
                            <div class="crystal-source-name">Arena PVP Ranqueada</div>
                            <div class="crystal-source-val">${crystalConfig.pvp || 2} Cristais (+${((crystalConfig.pvp || 2) * 0.5).toFixed(1)} pts)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="shop-screen-grid">
                ${cardsHtml}
            </div>

            <div class="shop-screen-notice">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <span><strong>Regulamento Acadêmico:</strong> Todos os resgates de Abono de Falta (máx. 12) e Pontos Extras via Cristais são sincronizados em tempo real no Painel do Mestre/Professor para aplicação na pauta da disciplina.</span>
            </div>
        `;
    }

    
    }

    if (typeof UIRenderer !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_Extension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(UIRenderer.prototype, descriptors);
    }
})();
