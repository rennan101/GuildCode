/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — UI: Abyss, Subclasses & Party
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _Extension {

    // ─── O ABISMO DO CÓDIGO (SPIRAL ABYSS - DESAFIOS ESTILO GENSHIN IMPACT) ───
    renderAbyssScreen() {
        const container = document.getElementById('abyss-content');
        if (!container) return;

        const allChapters = this.getMapChapterData();
        const userLevel = this.engine.getLevel();

        // Mapeamento de gradiente de dificuldade por andar:
        // Andares 0 a 4 (Básico/Iniciante): Esmeralda/Cyan
        // Andares 5 a 9 (Intermediário): Âmbar/Dourado
        // Andares 10 a 15 (Avançado/Mestre): Púrpura/Carmesim
        const portalsHtml = allChapters.map(chap => {
            const isUnlocked = this.engine.isAbyssFloorUnlocked(chap.id);
            const progress = this.engine.getAbyssFloorProgress(chap.id);
            const isAllDone = progress.isAllDone;
            const isClaimed = progress.claimed;

            let difficultyTheme = 'diff-emerald';
            let diffLabel = 'INICIANTE';
            if (chap.id >= 5 && chap.id <= 9) {
                difficultyTheme = 'diff-amber';
                diffLabel = 'INTERMEDIÁRIO';
            } else if (chap.id >= 10) {
                difficultyTheme = 'diff-purple';
                diffLabel = 'MESTRE';
            }

            return `
                <div class="abyss-portal-card ${difficultyTheme} ${isUnlocked ? 'unlocked' : 'locked'} ${isClaimed ? 'claimed' : (isAllDone ? 'ready-reward' : '')}"
                     onclick="app.handleAbyssPortalClick(${chap.id})">
                    
                    <!-- Background Art do Capítulo -->
                    <div class="abyss-portal-bg" style="background-image: url('${chap.image}');"></div>
                    <div class="abyss-portal-overlay"></div>

                    <!-- Topo: Número do Andar -->
                    <div class="abyss-portal-top">
                        <div class="abyss-floor-circle">
                            <span class="abyss-floor-num">${String(chap.id).padStart(2, '0')}</span>
                        </div>
                        <span class="abyss-diff-tag">${diffLabel}</span>
                    </div>

                    <!-- Centro: Título e Tema -->
                    <div class="abyss-portal-center">
                        <h4 class="abyss-floor-title">${chap.title.toUpperCase()}</h4>
                        <span class="abyss-floor-theme">${chap.theme}</span>
                        
                        ${isUnlocked ? `
                            <div class="abyss-progress-pill">
                                <span class="abyss-stars-txt">${progress.completed} / ${progress.total} CÂMARAS</span>
                            </div>
                        ` : `
                            <div class="abyss-locked-pill">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <span>CONCLUA O CAP ${String(chap.id).padStart(2, '0')}</span>
                            </div>
                        `}
                    </div>

                    <!-- Base: Status do Baú de Recompensa -->
                    <div class="abyss-portal-bottom">
                        <div class="abyss-chest-diamond ${isClaimed ? 'is-claimed' : (isAllDone ? 'is-ready pulse-gold' : '')}">
                            <svg class="abyss-chest-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 12V8H4v4M2 6h20v6H2zM2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6H2zm10 1v2"/>
                            </svg>
                        </div>
                        <div class="abyss-status-caption">
                            ${!isUnlocked ? '<span style="color:var(--text-dim);">BLOQUEADO</span>' :
                              isClaimed ? '<span style="color:var(--green);font-weight:700;">✓ CONCLUÍDO</span>' :
                              isAllDone ? '<span style="color:var(--gold);font-weight:700;">★ PRONTO P/ RESGATE</span>' :
                              `<span style="color:var(--text-secondary);">${progress.completed}/5 DESAFIOS</span>`}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="abyss-space-particles" id="abyss-space-particles">
                <div class="abyss-cosmic-glow"></div>
                <div class="abyss-stars-layer" id="abyss-stars-layer"></div>
                <div class="abyss-floating-particles-layer" id="abyss-particles-layer"></div>
            </div>

            <div class="abyss-screen-header">
                <div>
                    <h2 style="font-family:var(--font-display);font-size:1.3rem;color:var(--purple-bright);margin:0;letter-spacing:0.08em;">
                        ESPIRAL DO ABISMO — DESAFIOS PRÁTICOS
                    </h2>
                    <p style="font-size:0.82rem;color:var(--text-secondary);margin:0.25rem 0 0 0;">
                        Cada Andar do Abismo corresponde a um Capítulo da Guilda com 5 desafios diretos (1 fácil + 4 medianos). Complete todas as câmaras para conquistar o Baú de Recompensas do Andar.
                    </p>
                </div>
            </div>

            <div class="abyss-portals-scroll-row" id="abyss-portals-scroll-row">
                ${portalsHtml}
            </div>
        `;

        this.initAbyssParticles();
        this.initAbyssDragToScroll();
    }

    initAbyssParticles() {
        const starsLayer = document.getElementById('abyss-stars-layer');
        const particlesLayer = document.getElementById('abyss-particles-layer');
        if (!starsLayer || !particlesLayer) return;

        starsLayer.innerHTML = '';
        particlesLayer.innerHTML = '';

        // Gera 45 estrelas azuis cintilantes com tempos de animação variados
        for (let i = 0; i < 45; i++) {
            const star = document.createElement('div');
            star.className = 'abyss-twinkle-star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 3 + 2; // 2px a 5px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${Math.random() * 4}s`;
            star.style.animationDuration = `${Math.random() * 2.5 + 1.5}s`;
            starsLayer.appendChild(star);
        }

        // Gera 25 partículas flutuantes cósmicas subindo suavemente
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'abyss-float-dust';
            p.style.left = `${Math.random() * 100}%`;
            p.style.bottom = `-${Math.random() * 20}%`;
            const size = Math.random() * 4 + 2;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.animationDelay = `${Math.random() * 6}s`;
            p.style.animationDuration = `${Math.random() * 8 + 6}s`;
            particlesLayer.appendChild(p);
        }
    }

    initAbyssDragToScroll() {
        const scrollRow = document.getElementById('abyss-portals-scroll-row');
        if (!scrollRow) return;

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let hasMoved = false;

        scrollRow.addEventListener('mousedown', (e) => {
            isDown = true;
            hasMoved = false;
            scrollRow.classList.add('is-dragging');
            startX = e.pageX - scrollRow.offsetLeft;
            scrollLeft = scrollRow.scrollLeft;
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            scrollRow.classList.remove('is-dragging');
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollRow.offsetLeft;
            const walk = (x - startX) * 1.6; // Multiplicador de fluidez no arraste
            if (Math.abs(walk) > 5) {
                hasMoved = true;
            }
            scrollRow.scrollLeft = scrollLeft - walk;
        });

        // Previne clique nos cards se houve arraste com o mouse
        scrollRow.addEventListener('click', (e) => {
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                hasMoved = false;
            }
        }, true);

        // Suporte a scroll com a roda do mouse (Wheel to Horizontal Scroll)
        scrollRow.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                scrollRow.scrollLeft += e.deltaY * 1.5;
            }
        }, { passive: false });

        // Suporte a toque para dispositivos touchscreen
        scrollRow.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - scrollRow.offsetLeft;
            scrollLeft = scrollRow.scrollLeft;
        }, { passive: true });

        scrollRow.addEventListener('touchend', () => {
            isDown = false;
        });

        scrollRow.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - scrollRow.offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollRow.scrollLeft = scrollLeft - walk;
        }, { passive: true });
    }

    renderAbyssFloorModal(chapterId) {
        const modalBody = document.getElementById('abyss-floor-modal-body');
        if (!modalBody) return;

        const allChapters = this.getMapChapterData();
        const chap = allChapters.find(c => c.id === chapterId);
        if (!chap) return;

        const isCSharp = this.isCSharpWorld();
        const quests = (typeof missionsManager !== 'undefined' ? missionsManager.getAbyssFloor(chapterId) : null) ||
                       (isCSharp && typeof CSHARP_SIDE_QUESTS !== 'undefined' ? (CSHARP_SIDE_QUESTS[`csharp_ch${chapterId}`] || CSHARP_SIDE_QUESTS[chapterId]) : null) ||
                       (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) || [];
        const progress = this.engine.getAbyssFloorProgress(chapterId);
        const isAllDone = progress.isAllDone;
        const isClaimed = progress.claimed;

        const isFloorConquered = isAllDone;

        const chambersHtml = quests.map((q, idx) => {
            const isCompleted = !!(this.engine.state.abyss && this.engine.state.abyss.completedChambers && this.engine.state.abyss.completedChambers[q.id]);
            const isEasy = q.difficulty === 'easy';
            const xpVal = isEasy ? 20 : 25;
            const tokenVal = isEasy ? 10 : 15;

            // Modelo Genshin Impact: O desafio do andar inicia SEMPRE e EXCLUSIVAMENTE na Câmara 1
            const isFirstChamber = idx === 0;

            let chamberActionHtml = '';
            if (isFirstChamber) {
                chamberActionHtml = `
                    <button class="glow-button ${isFloorConquered ? 'btn-replay' : 'primary pulse-action'}"
                            style="padding:0.45rem 1.1rem;font-size:0.75rem;"
                            onclick="app.startAbyssChamber(${chapterId}, 0)">
                        ${isFloorConquered ? 'REINICIAR ANDAR' : 'INICIAR ANDAR'}
                    </button>
                `;
            } else {
                // Câmaras 2, 3, 4 e 5: Não podem ser iniciadas individualmente.
                if (isCompleted) {
                    // Após a conclusão da câmara na marcha, as recompensas já foram creditadas: o botão fica inativo
                    chamberActionHtml = `
                        <button class="glow-button btn-claimed-inactive"
                                style="padding:0.45rem 0.95rem;font-size:0.72rem;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.3);color:var(--green);cursor:default;opacity:0.85;"
                                disabled
                                title="Recompensas desta câmara já foram creditadas">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:0.35rem;"><polyline points="20 6 9 17 4 12"/></svg>
                            RECOMPENSAS RESGATADAS
                        </button>
                    `;
                } else {
                    chamberActionHtml = `
                        <div class="chamber-locked-tag"
                             style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.45rem 0.9rem;border-radius:4px;background:rgba(255,255,255,0.03);border:1px solid var(--border-dim);color:var(--text-dim);font-size:0.72rem;font-family:var(--font-display);letter-spacing:0.04em;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            BLOQUEADA
                        </div>
                    `;
                }
            }

            return `
                <div class="abyss-chamber-item ${isCompleted ? 'completed' : ''}">
                    <div class="abyss-chamber-left">
                        <div class="abyss-chamber-badge">
                            CÂMARA ${idx + 1}
                        </div>
                        <div class="abyss-chamber-info">
                            <div class="abyss-chamber-title-row">
                                <span class="abyss-chamber-name">${q.title}</span>
                                <span class="activity-diff-badge ${isEasy ? 'diff-easy' : 'diff-medium'}">
                                    ${isEasy ? 'FÁCIL' : 'MÉDIO'}
                                </span>
                                ${isCompleted ? '<span style="font-size:0.68rem;color:var(--green);font-weight:700;margin-left:0.4rem;">✓ CONCLUÍDA</span>' : ''}
                            </div>
                            <p class="abyss-chamber-desc">${q.description}</p>
                            <div class="abyss-chamber-rewards">
                                <span class="activity-reward-pill">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                    ${isCompleted ? '0 XP (Já Obtido)' : `+${xpVal} XP (1ª Conclusão)`}
                                </span>
                                <span class="activity-reward-pill">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                                    ${isCompleted ? '0 Tokens (Já Obtido)' : `+${tokenVal} Tokens (1ª Conclusão)`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="abyss-chamber-right">
                        ${chamberActionHtml}
                    </div>
                </div>
            `;
        }).join('');

        modalBody.innerHTML = `
            <div class="abyss-modal-header" style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid var(--border-dim);padding-bottom:1rem;margin-bottom:1.2rem;padding-right:2rem;">
                <div>
                    <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.3rem;">
                        <span class="abyss-floor-badge-lg">ANDAR ${String(chapterId).padStart(2, '0')}</span>
                        <h3 style="margin:0;font-size:1.2rem;color:var(--text-primary);">${chap.title.toUpperCase()}</h3>
                    </div>
                    <p style="margin:0;font-size:0.8rem;color:var(--text-secondary);">
                        ⏱ <strong>Desafio Sequencial:</strong> Conclua todas as 5 câmaras com o mesmo cronômetro contínuo para conquistar o Andar! Se o tempo esgotar, o desafio do andar recomeça na 1ª câmara.
                    </p>
                </div>
            </div>

            <!-- Baú de Recompensa do Andar -->
            <div class="abyss-floor-chest-banner ${isClaimed ? 'claimed' : (isAllDone ? 'ready' : '')}">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <div class="abyss-chest-large-box ${isClaimed ? 'is-claimed' : (isAllDone ? 'is-ready pulse-gold' : '')}">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V8H4v4M2 6h20v6H2zM2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6H2zm10 1v2"/></svg>
                    </div>
                    <div>
                        <div style="font-family:var(--font-display);font-weight:700;font-size:0.95rem;color:var(--gold);">
                            ${isClaimed ? 'BAÚ DO ANDAR RESGATADO' : (isAllDone ? 'BAÚ DO ANDAR DESBLOQUEADO!' : 'BAÚ DO ANDAR (5/5 CÂMARAS)')}
                        </div>
                        <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:0.15rem;">
                            Bônus: <strong>+100 XP</strong> • <strong>+50 Tokens</strong> • <strong>+10 Renome PVP</strong>${(isCSharp && chapterId === 37) ? (() => {
                                const crystals = (typeof app !== 'undefined' && app.getCrystalRewardsConfig) ? (app.getCrystalRewardsConfig().lastAbyss ?? 1) : 1;
                                return crystals > 0 ? ` • <strong style="color:var(--gold);">+${crystals} Cristal${crystals > 1 ? 'is' : ''} de Ascensão (+${(crystals * 0.5).toFixed(1)} pt)</strong>` : '';
                            })() : ''}
                        </div>
                    </div>
                </div>
                <div>
                    ${isAllDone && !isClaimed ? `
                        <button class="glow-button primary pulse-action" onclick="app.handleClaimAbyssReward(${chapterId})" style="padding:0.45rem 1.2rem;font-size:0.75rem;">
                            RESGATAR BAÚ
                        </button>
                    ` : isClaimed ? `
                        <span style="font-size:0.75rem;color:var(--green);font-weight:700;">✓ CONCLUÍDO</span>
                    ` : `
                        <span style="font-size:0.75rem;color:var(--text-dim);font-family:var(--font-code);">${progress.completed}/5 Câmaras</span>
                    `}
                </div>
            </div>

            <!-- Lista de Câmaras -->
            <div class="abyss-chambers-list" style="display:flex;flex-direction:column;gap:0.8rem;overflow-y:auto;flex:1;padding-right:0.3rem;margin-top:1rem;">
                ${chambersHtml}
            </div>
        `;

        const modal = document.getElementById('modal-abyss-floor');
        if (modal) modal.classList.remove('hidden');
    }

    // ─── SUBCLASSES & SKILL TREE (NÍVEL 5+) ───
    renderSubclassAwakeningModal(selectedSubclass) {
        const container = document.getElementById('subclass-awakening-cards');
        if (!container || typeof SkillTreeManager === 'undefined') return;

        const currentSelected = selectedSubclass || 'hardcoder';
        const subclasses = SkillTreeManager.getAllSubclasses();
        let html = '';

        subclasses.forEach(sc => {
            const isSel = currentSelected === sc.id;

            let perksHtml = '';
            sc.skills.forEach(sk => {
                const isUlt = sk.tier === 4 || sk.type === 'ultimate';
                perksHtml += `
                    <div class="subclass-perk-item ${isUlt ? 'ultimate' : ''}" title="${sk.description}">
                        <div class="subclass-perk-icon-wrap">
                            <i class="fa-solid ${sk.icon}"></i>
                        </div>
                        <div class="subclass-perk-info">
                            <div class="subclass-perk-name">
                                <span>${sk.name}</span>
                                <span class="subclass-perk-tier">${isUlt ? '★ SUPREMA' : `T${sk.tier} • Nv${sk.minLevel}`}</span>
                            </div>
                            <div class="subclass-perk-desc">${sk.description}</div>
                        </div>
                    </div>
                `;
            });

            html += `
                <div class="subclass-card ${sc.id} ${isSel ? 'selected' : ''}" onclick="app.selectSubclassAwakening('${sc.id}')">
                    <div class="subclass-card-top">
                        <div class="subclass-card-icon">
                            <i class="fa-solid ${sc.bannerIcon}"></i>
                        </div>
                        <div class="subclass-card-headings">
                            <div class="subclass-card-name">${sc.name.toUpperCase()}</div>
                            <div class="subclass-card-title">${sc.title}</div>
                        </div>
                        <div class="subclass-card-select-badge">
                            ${isSel ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-regular fa-circle"></i>'}
                        </div>
                    </div>

                    <div class="subclass-card-desc">${sc.tagline}</div>

                    <!-- Bloco de Habilidades Sempre Visível / Expandido -->
                    <div class="subclass-card-perks-section">
                        <div class="subclass-perks-title">
                            <i class="fa-solid fa-wand-magic-sparkles"></i> 4 HABILIDADES ARCANAS
                        </div>
                        <div class="subclass-perks-list">
                            ${perksHtml}
                        </div>
                    </div>

                    <div class="subclass-card-footer">
                        <button type="button" class="subclass-card-action-btn ${isSel ? 'active' : ''}" onclick="event.stopPropagation(); app.selectSubclassAwakening('${sc.id}')">
                            ${isSel ? '✓ SELECIONADO' : `ESCOLHER ${sc.name.toUpperCase()}`}
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        const modal = document.getElementById('modal-subclass-awakening');
        if (modal) modal.classList.remove('hidden');
    }

    renderSkillTreeModal(state, user) {
        const modal = document.getElementById('modal-skill-tree');
        const nodesContainer = document.getElementById('skilltree-nodes-container');
        const badgeEl = document.getElementById('skilltree-class-badge');
        const nameEl = document.getElementById('skilltree-class-name');
        const titleEl = document.getElementById('skilltree-class-title');
        const pointsEl = document.getElementById('skilltree-points-count');

        if (!modal || !nodesContainer || typeof SkillTreeManager === 'undefined') return;

        const isTeacher = SkillTreeManager.isTeacher(user);
        const subId = isTeacher ? 'cheatcode' : (state.subclass || 'hardcoder');
        const sc = SUBCLASSES_DATA[subId];

        if (!sc) return;

        if (badgeEl) {
            badgeEl.innerHTML = `<i class="fa-solid ${sc.badge || sc.bannerIcon || 'fa-shield-halved'}" style="color:${sc.color};font-size:1.5rem;"></i>`;
        }
        if (nameEl) {
            nameEl.textContent = sc.name.toUpperCase();
            nameEl.style.color = sc.color;
        }
        if (titleEl) titleEl.textContent = sc.title;
        if (pointsEl) pointsEl.textContent = state.skillPoints || 0;

        if (isTeacher || subId === 'cheatcode') {
            let allTreesHtml = `
                <div style="grid-column: 1 / -1; margin-bottom: 1.5rem; text-align: center; padding: 1.5rem; background: rgba(234, 179, 8, 0.08); border: 1px solid var(--gold); border-radius: 8px;">
                    <div style="font-size: 2rem; color: var(--gold); margin-bottom: 0.5rem;">
                        <i class="fa-solid fa-crown"></i>
                    </div>
                    <h3 style="font-family: var(--font-display); color: var(--gold); margin: 0 0 0.4rem 0;">SUBCLASSE MASTER / CHEATCODE ATIVA</h3>
                    <p style="color: var(--text-secondary); font-size: 0.82rem; max-width: 600px; margin: 0 auto; line-height: 1.5;">
                        Como Mestre da Guilda, você possui acesso primordial absoluto: todas as 4 árvores de habilidades (Hardcoder, Analyst, Debugger e Reviewer) e todos os seus 16 talentos estão 100% ativos simultaneamente!
                    </p>
                </div>
            `;

            const allSubclasses = SkillTreeManager.getAllSubclasses();
            allSubclasses.forEach(scGroup => {
                allTreesHtml += `
                    <div style="grid-column: 1 / -1; margin-top: 1rem; border-bottom: 1px dashed ${scGroup.color}; padding-bottom: 0.4rem; display: flex; align-items: center; gap: 0.6rem;">
                        <i class="fa-solid ${scGroup.bannerIcon}" style="color: ${scGroup.color}; font-size: 1.1rem;"></i>
                        <h4 style="margin: 0; font-family: var(--font-display); color: ${scGroup.color}; font-size: 1rem; letter-spacing: 0.08em;">
                            ÁRVORE DE SKILLS: ${scGroup.name.toUpperCase()} (${scGroup.title})
                        </h4>
                    </div>
                `;

                scGroup.skills.forEach((sk, idx) => {
                    const isUltimate = sk.type === 'ultimate' || sk.tier === 4;
                    const isLast = idx === scGroup.skills.length - 1;
                    const iconSvg = typeof getSkillIconSvg === 'function' ? getSkillIconSvg(sk.id, scGroup.color) : `<i class="fa-solid ${sk.icon}" style="color:${scGroup.color};"></i>`;

                    allTreesHtml += `
                        <div class="skill-node-wrapper ${isLast ? 'is-last' : ''}">
                            <div class="skill-node-card unlocked ${isUltimate ? 'is-ultimate' : ''}" style="--node-accent:${scGroup.color};">
                                <div class="skill-node-header-row">
                                    <span class="skill-node-tier-badge ${isUltimate ? 'ultimate-tag' : ''}">
                                        ${isUltimate ? '★ SUPREMA • TIER 4' : `TIER ${sk.tier} • LV ${sk.minLevel}+`}
                                    </span>
                                    <span class="skill-node-type-badge">${sk.type === 'ultimate' ? 'HABILIDADE MÁXIMA' : (sk.type === 'active' ? 'ATIVA' : 'PASSIVA')}</span>
                                </div>
                                <div class="skill-node-icon-wrapper">
                                    <div class="skill-node-icon-shape" style="border-color:${scGroup.color}; background:rgba(0,0,0,0.6);">
                                        ${iconSvg}
                                    </div>
                                    <div class="skill-node-check-badge">✓</div>
                                </div>
                                <div class="skill-node-name">${sk.name}</div>
                                <div class="skill-node-desc">${sk.description}</div>
                                <div class="skill-node-action-box">
                                    <div class="skill-node-status-active" style="border-color:${scGroup.color}; color:${scGroup.color}; background:rgba(0,0,0,0.4);">
                                        <span class="pulse-dot" style="background:${scGroup.color}; box-shadow:0 0 8px ${scGroup.color};"></span>
                                        <span>MESTRE ATIVA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            });

            nodesContainer.innerHTML = allTreesHtml;
            modal.classList.remove('hidden');
            return;
        }

        let nodesHtml = '';
        const totalSkills = sc.skills.length;
        sc.skills.forEach((sk, idx) => {
            const isUnlocked = !!(state.skillsUnlocked && state.skillsUnlocked[sk.id]);
            const check = SkillTreeManager.canUnlockSkill(state, sk.id, user);
            const isAvailable = !isUnlocked && check.can;
            const statusClass = isUnlocked ? 'unlocked' : (isAvailable ? 'available' : 'locked');
            const isUltimate = sk.type === 'ultimate' || sk.tier === 4;
            const isLast = idx === totalSkills - 1;
            const iconSvg = typeof getSkillIconSvg === 'function' ? getSkillIconSvg(sk.id, sc.color) : `<i class="fa-solid ${sk.icon}"></i>`;

            nodesHtml += `
                <div class="skill-node-wrapper ${isLast ? 'is-last' : ''}">
                    <div class="skill-node-card ${statusClass} ${isUltimate ? 'is-ultimate' : ''}" style="--node-accent:${sc.color};">
                        <div class="skill-node-header-row">
                            <span class="skill-node-tier-badge ${isUltimate ? 'ultimate-tag' : ''}">
                                ${isUltimate ? '★ SUPREMA • TIER 4' : `TIER ${sk.tier} • LV ${sk.minLevel}+`}
                            </span>
                            <span class="skill-node-type-badge">${sk.type === 'ultimate' ? 'HABILIDADE MÁXIMA' : (sk.type === 'active' ? 'ATIVA' : 'PASSIVA')}</span>
                        </div>
                        <div class="skill-node-icon-wrapper">
                            <div class="skill-node-icon-shape">
                                ${iconSvg}
                            </div>
                            ${isUnlocked ? '<div class="skill-node-check-badge">✓</div>' : ''}
                        </div>
                        <div class="skill-node-name">${sk.name}</div>
                        <div class="skill-node-desc">${sk.description}</div>
                        <div class="skill-node-action-box">
                            ${isUnlocked ? `
                                <div class="skill-node-status-active">
                                    <span class="pulse-dot"></span>
                                    <span>HABILIDADE ATIVA</span>
                                </div>
                            ` : isAvailable ? `
                                <button class="glow-button primary pulse-action" onclick="app.handleUnlockSkill('${sk.id}')" style="padding:0.4rem 1rem;font-size:0.75rem;width:100%;">
                                    <span class="btn-text">APRENDER HABILIDADE</span>
                                    <span class="btn-glow"></span>
                                </button>
                            ` : `
                                <div class="skill-node-status-locked">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:0.3rem;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    <span>${check.reason || 'Bloqueado'}</span>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
        });

        nodesContainer.innerHTML = nodesHtml;
        modal.classList.remove('hidden');
    }

    // ─── PARTY SCREEN (ESQUADRÃO DE COOPERAÇÃO) ───
    renderPartyScreen(party, pendingInvites = [], guildParties = []) {
        this.showScreen('party');
        const container = document.getElementById('party-content');
        if (!container) return;

        const myUid = authManager.currentUser?.uid;

        // Se o usuário está em uma Party ativa
        if (party) {
            const members = party.members || [];
            const isLeader = party.leaderUid === myUid;
            const hasReviewerT3 = typeof partyManager !== 'undefined' && partyManager.hasPartyBuff('rv_party_leader');

            let slotsHtml = '';
            for (let i = 0; i < 4; i++) {
                const member = members[i];
                if (member) {
                    const isMemLeader = member.uid === party.leaderUid;
                    const subId = member.subclass || ((member.isTeacher || member.role === 'teacher') ? 'cheatcode' : null);
                    const subData = (typeof SUBCLASSES_DATA !== 'undefined' && subId) ? SUBCLASSES_DATA[subId] : null;
                    const canKick = isLeader && member.uid !== myUid;

                    slotsHtml += `
                        <div class="party-slot-card ${isMemLeader ? 'is-leader' : ''}">
                            ${isMemLeader ? `<div class="party-leader-tag">★ LÍDER</div>` : ''}
                            <div class="party-avatar-box" style="${subData ? `border-color:${subData.color};box-shadow:0 0 12px ${subData.color}40;` : ''}">
                                <img src="${member.photoURL || 'assets/avatars/avatar_02.png'}" alt="${member.displayName}" />
                            </div>
                            <strong class="party-member-name" style="font-size:0.95rem;margin-bottom:0.2rem;">${member.displayName || 'Aprendiz'}</strong>
                            <div style="font-size:0.75rem;color:var(--cyan);font-weight:700;margin-bottom:0.5rem;">LV. ${String(member.level || 1).padStart(2, '0')}</div>
                            ${subData ? `
                                <span class="subclass-profile-pill" style="color:${subData.color};border-color:${subData.color};font-size:0.65rem;padding:0.15rem 0.5rem;margin-bottom:0.6rem;font-weight:700;letter-spacing:0.06em;">
                                    ${subData.name.toUpperCase()}
                                </span>
                            ` : `<span style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.6rem;">Sem Subclasse</span>`}
                            <div style="font-size:0.68rem;color:var(--gold);margin-bottom:0.8rem;">${member.renome !== undefined ? member.renome : 100} ★ Renome</div>
                            ${canKick ? `
                                <button class="student-kick-btn" style="padding:0.25rem 0.6rem;font-size:0.65rem;width:100%;margin-top:auto;" onclick="app.handleKickPartyMember('${member.uid}', '${member.displayName}')">
                                    EXPULSAR
                                </button>
                            ` : ''}
                        </div>
                    `;
                } else {
                    slotsHtml += `
                        <div class="party-empty-slot" onclick="app.openPartyInviteModal()">
                            <div class="party-empty-icon">+</div>
                            <strong style="font-size:0.85rem;color:var(--text-primary);margin-bottom:0.3rem;">VAGA DISPONÍVEL</strong>
                            <p style="font-size:0.72rem;color:var(--text-dim);margin:0 0 0.8rem 0;">Slot livre para convidar um colega de guilda.</p>
                            <button class="glow-button primary" style="padding:0.3rem 0.75rem;font-size:0.68rem;">+ CONVIDAR</button>
                        </div>
                    `;
                }
            }

            container.innerHTML = `
                <div class="party-container">
                    <div class="party-hero-card">
                        <div class="party-hero-top">
                            <div>
                                <div class="party-name-title" style="display:flex;align-items:center;gap:0.6rem;">
                                    <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.4rem;color:var(--gold);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> ${party.name.toUpperCase()}</span>
                                    ${isLeader ? `
                                        <button class="glow-button" style="padding:0.2rem 0.55rem;font-size:0.65rem;border-color:rgba(255,255,255,0.2);color:var(--text-secondary);" title="Renomear Party" onclick="app.handleRenameParty()">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.2rem;"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg> Renomear
                                        </button>
                                    ` : ''}
                                </div>
                                <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:0.3rem;">
                                    Líder: <strong style="color:var(--gold);">${party.leaderName}</strong> • ${members.length}/4 Integrantes
                                </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:0.8rem;flex-wrap:wrap;">
                                <div class="party-code-badge">
                                    <span>${party.code || party.id}</span>
                                    <button class="glow-button primary" style="padding:0.25rem 0.55rem;font-size:0.65rem;" onclick="navigator.clipboard.writeText('${party.code || party.id}');app.ui.showToast('Código da Party copiado!', 'info')">
                                        COPIAR
                                    </button>
                                </div>
                                <button class="glow-button danger" style="padding:0.4rem 0.9rem;font-size:0.75rem;" onclick="app.handleLeaveParty()">
                                    ${isLeader && members.length === 1 ? 'DISSOLVER PARTY' : 'SAIR DA PARTY'}
                                </button>
                            </div>
                        </div>

                        <!-- Painel de Sinergia e Buffs Acumulados da Party -->
                        ${(() => {
                            const partyBuffs = [];
                            const avatarSkillsMap = (typeof AVATAR_SKILLS_DATA !== 'undefined') ? AVATAR_SKILLS_DATA : {};
                            const subclassesMap = (typeof SUBCLASSES_DATA !== 'undefined') ? SUBCLASSES_DATA : {};

                            // 1. Coleta e agrega passivas dos Avatares dos membros
                            members.forEach(m => {
                                const avMatch = (m.photoURL || '').match(/avatar_(\d+)\.png/);
                                const avId = m.avatarId || (avMatch ? avMatch[1] : '02');
                                const avSkill = avatarSkillsMap[avId];
                                if (avSkill) {
                                    partyBuffs.push({
                                        source: avSkill.name,
                                        member: m.displayName || 'Membro',
                                        title: avSkill.skillName,
                                        desc: avSkill.skillDesc,
                                        icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>',
                                        color: 'var(--cyan)'
                                    });
                                }
                            });

                            // 2. Coleta bônus de subclasses dos membros
                            members.forEach(m => {
                                const subId = m.subclass || ((m.isTeacher || m.role === 'teacher') ? 'cheatcode' : null);
                                const sub = subclassesMap[subId];
                                if (sub) {
                                    if (subId === 'cheatcode') {
                                        partyBuffs.push({
                                            source: 'CheatCode (Mestre)',
                                            member: m.displayName || 'Mestre',
                                            title: 'Aura Primordial da Guilda',
                                            desc: '+15% de bônus universal de XP, Tokens e Dano de Raid para a Party inteira.',
                                            icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
                                            color: 'var(--gold)'
                                        });
                                    } else if (subId === 'reviewer') {
                                        const isT3 = (m.level || 1) >= 10;
                                        partyBuffs.push({
                                            source: 'Reviewer',
                                            member: m.displayName || 'Membro',
                                            title: isT3 ? 'Inspiração da Party (T3 Ativo)' : 'Sintaxe Limpa & Arquitetura',
                                            desc: isT3 ? '+10% de XP & Tokens acumuláveis para todos os integrantes em missões e raids.' : '+10% de Tokens de prestígio ao concluir desafios.',
                                            icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
                                            color: '#a855f7'
                                        });
                                    } else if (subId === 'hardcoder') {
                                        partyBuffs.push({
                                            source: 'Hardcoder',
                                            member: m.displayName || 'Membro',
                                            title: 'Overclock de Sintonia',
                                            desc: 'Acelera a compilação e concede +15% de tolerância de ciclos e bônus de ataque coletivo.',
                                            icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
                                            color: '#f97316'
                                        });
                                    } else if (subId === 'analyst') {
                                        partyBuffs.push({
                                            source: 'Analyst',
                                            member: m.displayName || 'Membro',
                                            title: 'Oráculo Compartilhado',
                                            desc: 'Concede +15% de Tokens adicionais em baús do Abismo e testes de primeira tentativa.',
                                            icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>',
                                            color: '#06b6d4'
                                        });
                                    } else if (subId === 'debugger') {
                                        partyBuffs.push({
                                            source: 'Debugger',
                                            member: m.displayName || 'Membro',
                                            title: 'Resiliência de Mana da Party',
                                            desc: 'Proteção contra falhas consecutivas e bônus restaurador de XP e HP coletivo.',
                                            icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
                                            color: '#10b981'
                                        });
                                    }
                                }
                            });

                            return `
                                <div class="party-buff-box" style="display:flex;flex-direction:column;align-items:stretch;gap:0.75rem;padding:0.9rem 1.1rem;background:linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(14,12,26,0.9) 100%);border:1px solid rgba(168,85,247,0.35);border-radius:10px;margin-bottom:1.5rem;">
                                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:0.5rem;">
                                        <div style="display:flex;align-items:center;gap:0.5rem;">
                                            <span style="color:var(--gold);display:flex;align-items:center;">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                            </span>
                                            <strong style="font-size:0.88rem;color:var(--text-primary);letter-spacing:0.06em;text-transform:uppercase;">
                                                SINERGIA & BÔNUS CUMULATIVOS DA PARTY (${partyBuffs.length})
                                            </strong>
                                        </div>
                                        <span style="font-size:0.7rem;color:var(--green);font-weight:700;display:flex;align-items:center;gap:0.3rem;">
                                            <span style="width:6px;height:6px;border-radius:50%;background:var(--green);display:inline-block;box-shadow:0 0 6px var(--green);"></span>
                                            ATIVOS PARA TODOS OS INTEGRANTES
                                        </span>
                                    </div>
                                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:0.6rem;">
                                        ${partyBuffs.map(b => `
                                            <div style="background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.06);border-left:3px solid ${b.color};border-radius:6px;padding:0.55rem 0.75rem;display:flex;flex-direction:column;gap:0.2rem;">
                                                <div style="display:flex;align-items:center;justify-content:space-between;">
                                                    <span style="font-size:0.78rem;font-weight:700;color:${b.color};display:flex;align-items:center;gap:0.35rem;">
                                                        ${b.icon} ${b.title}
                                                    </span>
                                                    <span style="font-size:0.65rem;color:var(--text-dim);background:rgba(255,255,255,0.05);padding:0.1rem 0.4rem;border-radius:3px;">
                                                        ${b.member}
                                                    </span>
                                                </div>
                                                <div style="font-size:0.72rem;color:var(--text-secondary);line-height:1.35;">
                                                    ${b.desc}
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `;
                        })()}

                        <!-- Grid com os 4 Slots -->
                        <div class="party-slots-grid">
                            ${slotsHtml}
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        // Se o usuário NÃO está em uma Party
        let invitesHtml = '';
        if (pendingInvites && pendingInvites.length > 0) {
            invitesHtml = `
                <div style="margin-top:1.5rem;">
                    <h3 style="margin:0 0 0.8rem 0;font-size:0.85rem;color:var(--gold);letter-spacing:0.1em;display:flex;align-items:center;gap:0.4rem;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--gold);"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        CONVITES RECEBIDOS (${pendingInvites.length})
                    </h3>
                    <div style="display:flex;flex-direction:column;gap:0.6rem;">
                        ${pendingInvites.map(inv => `
                            <div class="party-invite-item">
                                <div>
                                    <strong class="party-invite-title" style="font-size:0.9rem;">${inv.partyName}</strong>
                                    <div style="font-size:0.72rem;color:var(--text-dim);">Convocado por <strong>${inv.invitedBy}</strong> • Código: <span style="color:var(--gold);font-family:var(--font-code);">${inv.partyCode}</span></div>
                                </div>
                                <div style="display:flex;gap:0.5rem;align-items:center;">
                                    <button class="glow-button primary" style="padding:0.35rem 0.9rem;font-size:0.72rem;" onclick="app.handleAcceptPartyInvite('${inv.partyCode}')">ACEITAR</button>
                                    <button class="glow-button danger" style="padding:0.35rem 0.9rem;font-size:0.72rem;background:rgba(239,68,68,0.12);border-color:#ef4444;color:#f87171;" onclick="app.handleDeclinePartyInvite('${inv.partyCode}')">RECUSAR</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        let openPartiesHtml = '';
        if (guildParties && guildParties.length > 0) {
            const availableParties = guildParties.filter(p => (p.members || []).length < 4);
            if (availableParties.length > 0) {
                openPartiesHtml = `
                    <div style="margin-top:1.5rem;">
                        <h3 style="margin:0 0 0.8rem 0;font-size:0.85rem;color:var(--cyan);letter-spacing:0.1em;display:flex;align-items:center;gap:0.4rem;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--cyan);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            PARTIES COM VAGAS NA SUA GUILDA (${availableParties.length})
                        </h3>
                        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:0.8rem;">
                            ${availableParties.map(p => `
                                <div class="party-open-card" style="background:var(--bg-panel);border:1px solid var(--border-dim);padding:1rem;border-radius:6px;display:flex;justify-content:space-between;align-items:center;">
                                    <div>
                                        <strong class="party-open-name" style="font-size:0.88rem;">${p.name}</strong>
                                        <div style="font-size:0.7rem;color:var(--text-dim);">Líder: ${p.leaderName}</div>
                                        <div style="font-size:0.68rem;color:var(--cyan);font-family:var(--font-code);">${(p.members || []).length}/4 Integrantes</div>
                                    </div>
                                    <button class="glow-button primary" style="padding:0.35rem 0.75rem;font-size:0.7rem;" onclick="app.handleJoinPartyCode('${p.code || p.id}')">
                                        INGRESSAR
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        }

        container.innerHTML = `
            <div class="party-container">
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <h2 class="party-main-heading" style="font-family:var(--font-display);font-size:1.6rem;margin:0 0 0.4rem 0;">FORJE SUA PARTY ARCANA</h2>
                    <p style="font-size:0.85rem;color:var(--text-secondary);max-width:600px;margin:0 auto;line-height:1.5;">
                        Junte até 4 aprendizes em uma Party cooperativa para compartilhar vantagens de subclasse e vencer os desafios da Guilda em sincronia.
                    </p>
                </div>

                <div class="party-auth-grid">
                    <!-- Criar Nova Party -->
                    <div class="party-auth-card">
                        <div style="color:var(--gold);display:flex;justify-content:center;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <h3 class="party-auth-title" style="margin:0;font-family:var(--font-display);font-size:1.1rem;">CRIAR NOVA PARTY</h3>
                        <p style="font-size:0.78rem;color:var(--text-secondary);margin:0;line-height:1.4;">
                            Torne-se o Líder de uma nova Party de até 4 aprendizes e receba um código exclusivo para convocar aliados.
                        </p>
                        <input type="text" id="input-create-party-name" class="name-input" placeholder="Nome da Party (ex: Caçadores de C)..." maxlength="25" style="width:100%;font-size:0.85rem;padding:0.5rem 0.8rem;" />
                        <button class="glow-button primary" onclick="app.handleCreateParty()" style="width:100%;">
                            <span class="btn-text">FORJAR PARTY</span>
                            <span class="btn-glow"></span>
                        </button>
                    </div>

                    <!-- Entrar por Código -->
                    <div class="party-auth-card">
                        <div style="color:var(--cyan);display:flex;justify-content:center;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-1.5 1.5L14 9l-3-3 1.5-1.5M3 21l9-9"/><path d="M15 6l3 3"/></svg>
                        </div>
                        <h3 class="party-auth-title" style="margin:0;font-family:var(--font-display);font-size:1.1rem;">ENTRAR POR CÓDIGO</h3>
                        <p style="font-size:0.78rem;color:var(--text-secondary);margin:0;line-height:1.4;">
                            Recebeu um código de convocação de um colega? Digite o código da Party para ingressar imediatamente.
                        </p>
                        <input type="text" id="input-join-party-code" class="name-input" placeholder="Código (ex: PT-7X9K2)..." maxlength="10" style="width:100%;font-size:0.85rem;font-family:var(--font-code);padding:0.5rem 0.8rem;text-transform:uppercase;" />
                        <button class="glow-button" onclick="app.handleJoinPartyCode(document.getElementById('input-join-party-code').value)" style="width:100%;border-color:var(--cyan);color:var(--cyan);">
                            <span class="btn-text">INGRESSAR NA PARTY</span>
                        </button>
                    </div>
                </div>

                ${invitesHtml}
                ${openPartiesHtml}
            </div>
        `;
    }

    renderPartyInviteModal(candidates = []) {
        const listEl = document.getElementById('party-invite-candidates-list');
        if (!listEl) return;

        if (!candidates || candidates.length === 0) {
            listEl.innerHTML = '<p class="pvp-empty" style="text-align:center;padding:2rem;">Nenhum colega disponível para convite na sua Guilda no momento.</p>';
            return;
        }

        listEl.innerHTML = candidates.map(c => {
            const gp = c.gameProgress || {};
            const subData = (typeof SUBCLASSES_DATA !== 'undefined' && gp.subclass) ? SUBCLASSES_DATA[gp.subclass] : null;
            const name = c.displayName || c.email?.split('@')[0] || 'Aprendiz';

            return `
                <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.35);border:1px solid var(--border-dim);padding:0.6rem 0.9rem;border-radius:6px;">
                    <div style="display:flex;align-items:center;gap:0.6rem;">
                        <div style="width:34px;height:34px;border-radius:50%;overflow:hidden;border:1px solid var(--border-bright);">
                            <img src="${c.photoURL || 'assets/avatars/avatar_02.png'}" style="width:100%;height:100%;object-fit:cover;" />
                        </div>
                        <div>
                            <strong style="font-size:0.85rem;color:#fff;">${name}</strong>
                            <div style="font-size:0.68rem;color:var(--text-dim);display:flex;align-items:center;gap:0.4rem;">
                                <span>LV. ${gp.level || 1}</span>
                                ${subData ? `<span style="color:${subData.color};font-weight:bold;">• ${subData.name}</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <button class="glow-button primary" style="padding:0.3rem 0.75rem;font-size:0.7rem;" onclick="app.handleInvitePartyMember('${c.uid}', '${name.replace(/'/g, "\\'")}')">
                        CONVIDAR
                    </button>
                </div>
            `;
        }).join('');

        const modal = document.getElementById('modal-party-invite');
        if (modal) modal.classList.remove('hidden');
    }

    // ─────────────────────────────────────────────────────────────
    // INVENTORY SCREEN
    // ─────────────────────────────────────────────────────────────

    
    }

    if (typeof UIRenderer !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_Extension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(UIRenderer.prototype, descriptors);
    }
})();
