/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — GACHA UI (CÂMARA DE CONVOCAÇÃO ARCANA)
   ═══════════════════════════════════════════════════════════════ */

class GachaUI {
    constructor() {
        this.isSummoning = false;
    }

    /**
     * Abre a interface da Câmara de Convocação
     */
    openGachaModal() {
        let modal = document.getElementById('modal-gacha');
        if (!modal) {
            this.createModalHtml();
            modal = document.getElementById('modal-gacha');
        }

        this.updateHeaderStats();
        this.updateFreePullButton();
        modal.classList.add('active');
        this.renderSeasonCarousel();
    }

    updateFreePullButton() {
        const freeBtn = document.getElementById('gacha-btn-free');
        if (!freeBtn) return;
        const gachaState = (window.app && window.app.engine && window.app.engine.state && window.app.engine.state.gachaState)
            || (window.gameProgress && window.gameProgress.gachaState)
            || { freePullClaimed: false };

        if (!gachaState.freePullClaimed) {
            freeBtn.style.display = 'flex';
        } else {
            freeBtn.style.display = 'none';
        }
    }

    async handleFreeSummon() {
        if (this.isSummoning) return;
        this.isSummoning = true;

        let gachaState = (window.app && window.app.engine && window.app.engine.state && window.app.engine.state.gachaState) 
            || (window.gameProgress && window.gameProgress.gachaState) 
            || { pityCounter: 0, totalPulls: 0, freePullClaimed: false };

        gachaState.freePullClaimed = true;

        if (window.app && window.app.engine && window.app.engine.state) {
            window.app.engine.state.gachaState = gachaState;
        }
        if (window.gameProgress) {
            window.gameProgress.gachaState = gachaState;
        }

        this.updateFreePullButton();

        // Executa Invocação Gratuita (1x)
        const pull = window.gachaEngine.pullSingle(gachaState);
        let currentUnlocked = (window.app && window.app.engine && window.app.engine.state && window.app.engine.state.unlockedAvatars)
            || (window.gameProgress && window.gameProgress.unlockedAvatars)
            || ['02'];

        const processed = window.gachaEngine.processPulls([pull], currentUnlocked);
        processed.newUnlocks.forEach(id => {
            if (!currentUnlocked.includes(id)) currentUnlocked.push(id);
        });

        if (window.app && window.app.engine && window.app.engine.state) {
            window.app.engine.state.unlockedAvatars = currentUnlocked;
        }
        if (window.gameProgress) {
            window.gameProgress.unlockedAvatars = currentUnlocked;
        }

        if (processed.totalXpGained > 0) {
            if (window.app && window.app.engine && typeof window.app.engine.addXP === 'function') {
                window.app.engine.addXP(processed.totalXpGained);
            }
        }

        if (window.app && window.app.engine && typeof window.app.engine.saveToCloud === 'function') {
            await window.app.engine.saveToCloud();
        }

        // Efeito Sonoro & Animação do portal
        if (window.soundFX && typeof window.soundFX.playMagic === 'function') {
            window.soundFX.playMagic();
        }

        const portal = document.querySelector('.gacha-portal-orb');
        if (portal) {
            portal.classList.add('summoning');
        }

        // Adiciona Flash Dimensional na tela
        setTimeout(() => {
            const flash = document.createElement('div');
            flash.className = 'gacha-screen-flash';
            document.body.appendChild(flash);
            if (window.soundFX && typeof window.soundFX.playRunCode === 'function') {
                window.soundFX.playRunCode();
            }
            setTimeout(() => {
                if (flash.parentNode) flash.parentNode.removeChild(flash);
            }, 800);
        }, 1300);

        setTimeout(() => {
            if (portal) portal.classList.remove('summoning');
            if (window.soundFX && typeof window.soundFX.playFanfare === 'function') {
                window.soundFX.playFanfare();
            } else if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.showResults(processed.processedResults, processed.totalXpGained);
            this.isSummoning = false;
        }, 1600);
    }

    closeGachaModal() {
        this.stopCarouselAutoplay();
        const modal = document.getElementById('modal-gacha');
        if (modal) {
            modal.classList.remove('active');
            const resultArea = document.getElementById('gacha-results-screen');
            if (resultArea) resultArea.style.display = 'none';
            const portalArea = document.getElementById('gacha-portal-area');
            if (portalArea) portalArea.style.display = 'flex';
        }
    }

    getUserTokens() {
        if (window.app && window.app.engine && window.app.engine.state) {
            return window.app.engine.state.tokens || 0;
        }
        if (window.gameProgress) {
            return window.gameProgress.tokens || 0;
        }
        return 0;
    }

    updateHeaderStats() {
        const tokenElem = document.getElementById('gacha-user-tokens');
        if (tokenElem) {
            tokenElem.textContent = this.getUserTokens();
        }
    }

    createModalHtml() {
        const modalHtml = `
        <div id="modal-gacha" class="modal-overlay">
            <div class="gacha-modal-card">
                <button class="gacha-close-btn" onclick="window.gachaUI.closeGachaModal()" title="Fechar">✕</button>
                
                <div class="gacha-header">
                    <div class="gacha-header-titles">
                        <span class="gacha-badge">PORTAL DIMENSIONAL</span>
                        <h2 class="gacha-title">CÂMARA DE <span class="text-gradient-purple">CONVOCAÇÃO ARCANA</span></h2>
                        <p class="gacha-subtitle">Sintonize com os Ecos de Codemancers ancestrais e desperte habilidades passivas únicas.</p>
                    </div>
                    <div class="gacha-user-balance">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                        <span id="gacha-user-tokens">0</span> <span class="tokens-label">TOKENS</span>
                    </div>
                </div>

                <!-- ÁREA PRINCIPAL DO PORTAL: CARROSSEL DE CODEMANCERS DA TEMPORADA -->
                <div id="gacha-portal-area" class="gacha-portal-container">
                    <div class="gacha-showcase-section">
                        <div class="gacha-showcase-header">
                            <span class="gacha-showcase-tag">ECOS EM DESTAQUE</span>
                            <h3 class="gacha-showcase-title">CODEMANCERS DA TEMPORADA</h3>
                            <p class="gacha-showcase-sub">Passe o mouse sobre os cards para inspecionar os guerreiros da invocação</p>
                        </div>
                        
                        <!-- CARROSSEL DE CARDS TCG EM DESTAQUE -->
                        <div class="gacha-featured-carousel-wrapper">
                            <div class="gacha-featured-carousel" id="gacha-featured-carousel">
                                <!-- Cards TCG 3D gerados dinamicamente via renderSeasonCarousel() -->
                            </div>
                        </div>
                    </div>

                    <!-- BOTÕES DE INVOCAR (ABAIXO DO CARROSSEL) -->
                    <div class="gacha-summon-actions">
                        <button id="gacha-btn-free" class="gacha-btn free pulse-action" style="display:none;background:linear-gradient(135deg, rgba(234,179,8,0.2), rgba(249,115,22,0.3));border-color:var(--gold);" onclick="window.gachaUI.handleFreeSummon()">
                            <span class="gacha-btn-badge" style="background:var(--gold);color:#000;">DÁDIVA DA TEMPORADA</span>
                            <span class="gacha-btn-title" style="color:var(--gold);">CONVOCAR GRATUITAMENTE</span>
                            <span class="gacha-btn-cost" style="color:#4ade80;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                                0 TOKENS
                            </span>
                        </button>

                        <button class="gacha-btn single" onclick="window.gachaUI.handleSummon(1)">
                            <span class="gacha-btn-title">CONVOCAR 1x</span>
                            <span class="gacha-btn-cost">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                                80 TOKENS
                            </span>
                        </button>

                        <button class="gacha-btn multi" onclick="window.gachaUI.handleSummon(5)">
                            <span class="gacha-btn-badge">ECONOMIZE 50 TOKENS</span>
                            <span class="gacha-btn-title">CONVOCAR 5x</span>
                            <span class="gacha-btn-cost">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                                350 TOKENS
                            </span>
                        </button>
                    </div>
                </div>

                <!-- TELA DE REVELAÇÃO DOS RESULTADOS (CARROSSEL MISTERIOSO COM FLIP) -->
                <div id="gacha-results-screen" class="gacha-results-container" style="display:none;">
                    <div class="gacha-reveal-header">
                        <span class="gacha-reveal-tag">RESULTADO DA CONVOCAÇÃO</span>
                        <h3 id="gacha-reveal-title" class="gacha-reveal-title">ECOS SINTONIZADOS</h3>
                        <p id="gacha-reveal-hint" class="gacha-reveal-hint">Escolha uma carta para canalizar sua essência e revelá-la</p>
                    </div>
                    <div id="gacha-cards-display" class="gacha-cards-grid"></div>
                    <div class="gacha-results-footer">
                        <div id="gacha-duplicate-summary" class="gacha-dup-summary"></div>
                        <div class="gacha-results-actions">
                            <button id="gacha-reveal-all-btn" class="glow-button secondary" onclick="window.gachaUI.revealAllCards()" style="display:none;">
                                <span class="btn-text">REVELAR TODOS</span>
                            </button>
                            <button class="glow-button primary" onclick="window.gachaUI.backToPortal()">
                                <span class="btn-text">CONCLUIR CONVOCAÇÃO</span>
                                <span class="btn-glow"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    renderSeasonCarousel() {
        const carousel = document.getElementById('gacha-featured-carousel');
        if (!carousel) return;

        const pool = window.gachaEngine.getPool();
        const unlocked = (window.gameProgress && window.gameProgress.unlockedAvatars) 
            ? window.gameProgress.unlockedAvatars 
            : ((window.app && window.app.engine && window.app.engine.state && window.app.engine.state.unlockedAvatars) ? window.app.engine.state.unlockedAvatars : ['02']);

        // Renderiza cada Codemancer como um Card TCG 3D individual de alta fidelidade
        carousel.innerHTML = pool.map((av, index) => {
            const isUnlocked = unlocked.includes(av.id);
            const rInfo = AVATAR_RARITIES[av.rarity] || AVATAR_RARITIES.COMMON;
            const starSVG = `<svg class="star-filled" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
            const starsHtml = Array.from({length: rInfo.stars || 3}, () => starSVG).join('');
            const cardId = `gacha-featured-card-${index}`;

            return `
                <div class="gacha-featured-card-item ${isUnlocked ? 'is-unlocked' : 'is-locked'}">
                    <div class="featured-card-unlock-pill ${isUnlocked ? 'owned' : 'unowned'}">
                        ${isUnlocked ? 'CONVOCADO' : 'BLOQUEADO'}
                    </div>
                    <div class="inv-avatar-card tcg-card-3d gacha-tcg-card" id="${cardId}" style="--rarity-color:${rInfo.color}">
                        <div class="tcg-card-inner">
                            <div class="tcg-card-face tcg-card-front">
                                <div class="tcg-card-holo-frame"></div>
                                <div class="tcg-card-glare"></div>
                                <div class="tcg-card-holo-foil"></div>
                                <div class="inv-avatar-card-rarity-bar" style="background: linear-gradient(90deg, ${rInfo.color}, transparent);"></div>
                                <div class="inv-avatar-card-img-wrap">
                                    <div class="tcg-geo-pattern"></div>
                                    <div class="tcg-foil-sparkles"></div>
                                    <img class="inv-avatar-card-ghost-aura" src="assets/avatars/avatar_${av.id}.png" alt="" aria-hidden="true" onerror="this.style.display='none'">
                                    <img class="inv-avatar-card-img" src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" onerror="this.style.opacity='0.3'">
                                </div>
                                <div class="inv-avatar-card-body">
                                    <div class="tcg-card-top-row">
                                        <div class="inv-avatar-stars">${starsHtml}</div>
                                    </div>
                                    <div class="tcg-card-identity">
                                        <div class="inv-avatar-name">${av.name}</div>
                                        <div class="inv-avatar-title">${av.title || 'Codemancer'}</div>
                                    </div>
                                    <div class="tcg-compact-stats">
                                        <div class="tcg-cstat-pill hp" title="HP"><span class="tcg-cstat-lbl">HP</span><span class="tcg-cstat-val">${av.baseHp || 100}</span></div>
                                        <div class="tcg-cstat-pill atk" title="ATK"><span class="tcg-cstat-lbl">ATK</span><span class="tcg-cstat-val">${av.baseAttack || 30}</span></div>
                                        <div class="tcg-cstat-pill def" title="DEF"><span class="tcg-cstat-lbl">DEF</span><span class="tcg-cstat-val">${av.baseDefense || 25}</span></div>
                                        <div class="tcg-cstat-pill spd" title="SPD"><span class="tcg-cstat-lbl">SPD</span><span class="tcg-cstat-val">${av.baseSpeed || 20}</span></div>
                                    </div>
                                    <div class="inv-avatar-skill">
                                        <span class="inv-avatar-skill-label">Habilidade Passiva</span>
                                        <span class="inv-avatar-skill-name">${av.skillName}</span>
                                        <span class="inv-avatar-skill-desc">${av.skillDesc}</span>
                                    </div>
                                </div>
                                <div class="tcg-card-bottom-foil">
                                    <span class="tcg-serial">NO. ${(av.id || '01').padStart(3, '0')} / CODE LEVELER TCG</span>
                                    <span class="tcg-edition">${rInfo.label.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Inicializa física 3D LERP em cada card do carrossel da temporada
        setTimeout(() => {
            pool.forEach((_, idx) => {
                const card = document.getElementById(`gacha-featured-card-${idx}`);
                if (card && typeof UIRenderer !== 'undefined' && UIRenderer.setupUniversalCard3D) {
                    UIRenderer.setupUniversalCard3D(card);
                }
            });
        }, 100);

        // Configura auto-scroll contínuo e suave com pausa ao passar o mouse
        this.startCarouselAutoplay();
    }

    scrollCarousel(direction) {
        const carousel = document.getElementById('gacha-featured-carousel');
        if (!carousel) return;
        const scrollAmount = 270;
        carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }

    startCarouselAutoplay() {
        if (this._carouselInterval) {
            clearInterval(this._carouselInterval);
            this._carouselInterval = null;
        }

        const carousel = document.getElementById('gacha-featured-carousel');
        if (!carousel) return;

        let isPaused = false;
        carousel.onmouseenter = () => { isPaused = true; };
        carousel.onmouseleave = () => { isPaused = false; };

        // Movimento automático suave e contínuo
        this._carouselInterval = setInterval(() => {
            if (isPaused || !document.getElementById('modal-gacha')?.classList.contains('active')) return;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScroll - 8) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: 270, behavior: 'smooth' });
            }
        }, 2500);
    }

    stopCarouselAutoplay() {
        if (this._carouselInterval) {
            clearInterval(this._carouselInterval);
            this._carouselInterval = null;
        }
    }

    async handleSummon(amount) {
        if (this.isSummoning) return;
        const currentTokens = this.getUserTokens();
        const cost = amount === 1 ? window.gachaEngine.SINGLE_PULL_COST : window.gachaEngine.MULTI_PULL_COST;

        if (currentTokens < cost) {
            if (typeof showSystemNotice === 'function') {
                showSystemNotice(`Tokens insuficientes! Você precisa de ${cost} Tokens.`, 'warning');
            } else if (window.app && window.app.ui && typeof window.app.ui.showToast === 'function') {
                window.app.ui.showToast(`Tokens insuficientes! Você precisa de ${cost} Tokens.`, 'warning');
            } else {
                alert(`Tokens insuficientes! Você precisa de ${cost} Tokens.`);
            }
            return;
        }

        this.isSummoning = true;
        
        // Deduz tokens do engine e de gameProgress
        if (window.app && window.app.engine && window.app.engine.state) {
            window.app.engine.state.tokens -= cost;
        }
        if (window.gameProgress) {
            window.gameProgress.tokens = (window.gameProgress.tokens || currentTokens) - cost;
        }

        this.updateHeaderStats();
        if (typeof updateTokensDisplay === 'function') updateTokensDisplay();
        if (window.app && window.app.ui && typeof window.app.ui.updateTokensDisplay === 'function') {
            window.app.ui.updateTokensDisplay();
        }

        // Obtém estado de pity
        let gachaState = (window.app && window.app.engine && window.app.engine.state && window.app.engine.state.gachaState) 
            || (window.gameProgress && window.gameProgress.gachaState) 
            || { pityCounter: 0, totalPulls: 0 };

        // Executa Invocação
        let pulls = [];
        if (amount === 1) {
            pulls = [window.gachaEngine.pullSingle(gachaState)];
        } else {
            const multiRes = window.gachaEngine.pullMulti(gachaState);
            pulls = multiRes.results;
        }

        // Atualiza gachaState
        if (window.app && window.app.engine && window.app.engine.state) {
            window.app.engine.state.gachaState = gachaState;
        }
        if (window.gameProgress) {
            window.gameProgress.gachaState = gachaState;
        }

        // Processa Unlocks e Duplicatas em XP
        let currentUnlocked = (window.app && window.app.engine && window.app.engine.state && window.app.engine.state.unlockedAvatars)
            || (window.gameProgress && window.gameProgress.unlockedAvatars)
            || ['02'];

        const processed = window.gachaEngine.processPulls(pulls, currentUnlocked);
        
        // Adiciona novos desbloqueados
        processed.newUnlocks.forEach(id => {
            if (!currentUnlocked.includes(id)) {
                currentUnlocked.push(id);
            }
        });

        if (window.app && window.app.engine && window.app.engine.state) {
            window.app.engine.state.unlockedAvatars = currentUnlocked;
        }
        if (window.gameProgress) {
            window.gameProgress.unlockedAvatars = currentUnlocked;
        }

        // Adiciona XP das duplicatas
        if (processed.totalXpGained > 0) {
            if (window.app && window.app.engine && typeof window.app.engine.addXP === 'function') {
                window.app.engine.addXP(processed.totalXpGained);
            } else if (window.gameProgress) {
                window.gameProgress.xp = (window.gameProgress.xp || 0) + processed.totalXpGained;
                if (typeof checkLevelUp === 'function') checkLevelUp();
            }
        }

        // Salva progresso na nuvem
        if (window.app && window.app.engine && typeof window.app.engine.saveToCloud === 'function') {
            await window.app.engine.saveToCloud();
        } else if (typeof saveProgressToBackend === 'function') {
            saveProgressToBackend();
        }

        // Efeito Sonoro & Animação do portal
        if (window.soundFX && typeof window.soundFX.playMagic === 'function') {
            window.soundFX.playMagic();
        }

        const portal = document.querySelector('.gacha-portal-orb');
        if (portal) {
            portal.classList.add('summoning');
        }

        // Adiciona Flash Dimensional na tela
        setTimeout(() => {
            const flash = document.createElement('div');
            flash.className = 'gacha-screen-flash';
            document.body.appendChild(flash);
            if (window.soundFX && typeof window.soundFX.playRunCode === 'function') {
                window.soundFX.playRunCode();
            }
            setTimeout(() => {
                if (flash.parentNode) flash.parentNode.removeChild(flash);
            }, 800);
        }, 1300);

        setTimeout(() => {
            if (portal) portal.classList.remove('summoning');
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.showResults(processed.processedResults, processed.totalXpGained);
            this.isSummoning = false;
        }, 1600);
    }

    showResults(results, totalXpGained) {
        const portalArea = document.getElementById('gacha-portal-area');
        const resultArea = document.getElementById('gacha-results-screen');
        const cardsGrid = document.getElementById('gacha-cards-display');
        const summary = document.getElementById('gacha-duplicate-summary');
        const revealAllBtn = document.getElementById('gacha-reveal-all-btn');
        const revealHint = document.getElementById('gacha-reveal-hint');

        if (!resultArea || !cardsGrid) return;

        // Armazena dados de invocação para revelação tardia
        this.currentResults = results;
        this.currentTotalXp = totalXpGained;
        this.revealedCardsCount = 0;

        portalArea.style.display = 'none';
        resultArea.style.display = 'flex';
        const modalCard = document.querySelector('.gacha-modal-card');
        if (modalCard) modalCard.classList.add('reveal-mode');

        if (revealHint) {
            revealHint.textContent = results.length > 1 
                ? 'Escolha as cartas misteriosas para revelar seus Codemancers!' 
                : 'Clique na carta misteriosa para canalizar sua energia e revelá-la!';
        }

        if (revealAllBtn) {
            revealAllBtn.style.display = results.length > 1 ? 'inline-flex' : 'none';
        }

        summary.innerHTML = '';

        // Determina imagem de verso conforme o mundo atual (C ou C#)
        const isCSharp = (window.app && window.app.ui && typeof window.app.ui.isCSharpWorld === 'function' && window.app.ui.isCSharpWorld()) ||
                         (window.app && window.app.engine && window.app.engine.state && window.app.engine.state.worldId === 'csharp_unity');
        const backCardImg = isCSharp ? 'assets/BackCard_Csharp.png' : 'assets/backCard_C.png';

        // Renderiza CARROSSEL de cartas misteriosas (viradas de costas, com borda NEUTRA sem spoiler de raridade)
        cardsGrid.innerHTML = results.map((_, index) => {
            const wrapId = `gacha-card-wrap-${index}`;
            const cardId = `gacha-tcg-card-${index}`;

            return `
                <div class="gacha-tcg-perspective-wrap mystery-mode" id="${wrapId}" style="animation-delay:${index * 0.12}s">
                    <div class="result-card-badge mystery" id="badge-${cardId}">
                        <span class="mystery-badge-txt">???</span>
                    </div>

                    <!-- CARD TCG COM SUPORTE A FLIP 3D E SUSPENSE -->
                    <div class="inv-avatar-card tcg-card-3d gacha-tcg-card gacha-mystery-card is-flipped" 
                         id="${cardId}" 
                         onclick="window.gachaUI.revealCard(${index})">
                        
                        <div class="tcg-card-inner">
                            <!-- FACE FRONTAL (Carregada sob demanda ao clicar) -->
                            <div class="tcg-card-face tcg-card-front" id="front-${cardId}">
                                <div class="gacha-card-loading-placeholder">
                                    <div class="gacha-rune-spinner"></div>
                                </div>
                            </div>

                            <!-- FACE TRASEIRA (VERSO NEUTRO) -->
                            <div class="tcg-card-face tcg-card-back gacha-neutral-back">
                                <div class="tcg-card-holo-frame neutral-frame"></div>
                                <div class="tcg-card-glare"></div>
                                <div class="tcg-card-back-img-wrap">
                                    <div class="tcg-mystery-glow"></div>
                                    <img class="tcg-card-back-img" src="${backCardImg}" alt="Carta Fechada" onerror="this.src='assets/backCard_C.png'">
                                </div>
                                <div class="tcg-card-back-footer">
                                    <span class="tcg-back-brand">GUILDCODE TCG</span>
                                    <span class="tcg-back-hint">CLIQUE PARA REVELAR</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Configura efeito de inclinação 3D sutil nas cartas fechadas
        setTimeout(() => {
            results.forEach((_, idx) => {
                const card = document.getElementById(`gacha-tcg-card-${idx}`);
                if (card && typeof UIRenderer !== 'undefined' && UIRenderer.setupUniversalCard3D) {
                    UIRenderer.setupUniversalCard3D(card);
                }
            });
        }, 100);

        // Habilita rolagem horizontal com a roda do mouse (wheel) e arraste (drag)
        this.setupCardsGridInteractions(cardsGrid);
    }

    /**
     * Configura interações de rolagem suave com a roda do mouse e drag-to-scroll para o container de cartas
     */
    setupCardsGridInteractions(cardsGrid) {
        if (!cardsGrid) return;

        // Limpa ouvintes anteriores se houver
        if (cardsGrid._cleanupGachaInteractions) {
            cardsGrid._cleanupGachaInteractions();
        }

        // 1. Scroll do Mouse (Wheel) -> Rola na horizontal
        const onWheel = (e) => {
            if (cardsGrid.scrollWidth <= cardsGrid.clientWidth) return;
            // Se o usuário rolou verticalmente ou horizontalmente
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            if (delta !== 0) {
                e.preventDefault();
                cardsGrid.scrollLeft += delta * 1.25;
            }
        };
        cardsGrid.addEventListener('wheel', onWheel, { passive: false });

        // 2. Drag to Scroll (Mouse e Touch)
        let isDown = false;
        let startX = 0;
        let scrollStartLeft = 0;
        let hasMoved = false;

        const onMouseDown = (e) => {
            if (e.button !== 0) return; // Apenas botão esquerdo
            isDown = true;
            hasMoved = false;
            cardsGrid.classList.add('is-dragging');
            startX = e.pageX - cardsGrid.offsetLeft;
            scrollStartLeft = cardsGrid.scrollLeft;
        };

        const onMouseMove = (e) => {
            if (!isDown) return;
            const x = e.pageX - cardsGrid.offsetLeft;
            const walk = x - startX;
            if (Math.abs(walk) > 5) {
                hasMoved = true;
                this._suppressCardClick = true;
            }
            cardsGrid.scrollLeft = scrollStartLeft - walk;
        };

        const onMouseUpOrLeave = () => {
            if (!isDown) return;
            isDown = false;
            cardsGrid.classList.remove('is-dragging');
            if (hasMoved) {
                // Pequeno delay para garantir que o click disparado pelo navegador seja ignorado
                setTimeout(() => {
                    this._suppressCardClick = false;
                }, 80);
            } else {
                this._suppressCardClick = false;
            }
        };

        cardsGrid.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUpOrLeave);

        // Suporte a Touch Drag para dispositivos móveis / tablets
        let touchStartX = 0;
        let touchScrollStart = 0;

        const onTouchStart = (e) => {
            if (e.touches.length !== 1) return;
            touchStartX = e.touches[0].pageX;
            touchScrollStart = cardsGrid.scrollLeft;
            hasMoved = false;
        };

        const onTouchMove = (e) => {
            if (e.touches.length !== 1) return;
            const currentX = e.touches[0].pageX;
            const diff = currentX - touchStartX;
            if (Math.abs(diff) > 6) {
                hasMoved = true;
                this._suppressCardClick = true;
            }
        };

        const onTouchEnd = () => {
            if (hasMoved) {
                setTimeout(() => {
                    this._suppressCardClick = false;
                }, 80);
            } else {
                this._suppressCardClick = false;
            }
        };

        cardsGrid.addEventListener('touchstart', onTouchStart, { passive: true });
        cardsGrid.addEventListener('touchmove', onTouchMove, { passive: true });
        cardsGrid.addEventListener('touchend', onTouchEnd, { passive: true });

        // Armazena função de limpeza para evitar memory leaks caso seja chamado novamente
        cardsGrid._cleanupGachaInteractions = () => {
            cardsGrid.removeEventListener('wheel', onWheel);
            cardsGrid.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUpOrLeave);
            cardsGrid.removeEventListener('touchstart', onTouchStart);
            cardsGrid.removeEventListener('touchmove', onTouchMove);
            cardsGrid.removeEventListener('touchend', onTouchEnd);
        };
    }

    /**
     * Revela uma carta específica ao clicar com suspense e injeção tardia de dados
     */
    revealCard(index) {
        if (this._suppressCardClick) return;
        if (!this.currentResults || !this.currentResults[index]) return;
        const item = this.currentResults[index];
        const card = document.getElementById(`gacha-tcg-card-${index}`);
        const wrap = document.getElementById(`gacha-card-wrap-${index}`);
        const badge = document.getElementById(`badge-gacha-tcg-card-${index}`);
        const frontFace = document.getElementById(`front-gacha-tcg-card-${index}`);

        if (!card || card.classList.contains('is-revealed') || card.classList.contains('suspense-phase')) return;

        // 1. Inicia fase de suspense com som e pulso
        card.classList.add('suspense-phase');
        if (wrap) wrap.classList.add('suspense-active');

        if (window.soundFX && typeof window.soundFX.playMagic === 'function') {
            window.soundFX.playMagic();
        }

        // 2. Tempo de suspense para carregar os dados e construir expectativa (550ms)
        setTimeout(() => {
            const av = item.avatar;
            const rInfo = item.rarityInfo;
            const starSVG = `<svg class="star-filled" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
            const starsHtml = Array.from({length: rInfo.stars || 3}, () => starSVG).join('');

            // Injeta dados do avatar na face frontal
            if (frontFace) {
                frontFace.innerHTML = `
                    <div class="tcg-card-holo-frame"></div>
                    <div class="tcg-card-glare"></div>
                    <div class="tcg-card-holo-foil"></div>
                    <div class="inv-avatar-card-rarity-bar" style="background: linear-gradient(90deg, ${rInfo.color}, transparent);"></div>
                    <div class="inv-avatar-card-img-wrap">
                        <div class="tcg-geo-pattern"></div>
                        <div class="tcg-foil-sparkles"></div>
                        <img class="inv-avatar-card-ghost-aura" src="assets/avatars/avatar_${av.id}.png" alt="" aria-hidden="true" onerror="this.style.display='none'">
                        <img class="inv-avatar-card-img" src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" onerror="this.style.opacity='0.3'">
                    </div>
                    <div class="inv-avatar-card-body">
                        <div class="tcg-card-top-row">
                            <div class="inv-avatar-stars">${starsHtml}</div>
                        </div>
                        <div class="tcg-card-identity">
                            <div class="inv-avatar-name">${av.name}</div>
                            <div class="inv-avatar-title">${av.title || 'Codemancer'}</div>
                        </div>
                        <div class="tcg-compact-stats">
                            <div class="tcg-cstat-pill hp" title="HP"><span class="tcg-cstat-lbl">HP</span><span class="tcg-cstat-val">${av.baseHp || 100}</span></div>
                            <div class="tcg-cstat-pill atk" title="ATK"><span class="tcg-cstat-lbl">ATK</span><span class="tcg-cstat-val">${av.baseAttack || 30}</span></div>
                            <div class="tcg-cstat-pill def" title="DEF"><span class="tcg-cstat-lbl">DEF</span><span class="tcg-cstat-val">${av.baseDefense || 25}</span></div>
                            <div class="tcg-cstat-pill spd" title="SPD"><span class="tcg-cstat-lbl">SPD</span><span class="tcg-cstat-val">${av.baseSpeed || 20}</span></div>
                        </div>
                        <div class="inv-avatar-skill">
                            <span class="inv-avatar-skill-label">Habilidade Passiva</span>
                            <span class="inv-avatar-skill-name">${av.skillName}</span>
                            <span class="inv-avatar-skill-desc">${av.skillDesc}</span>
                        </div>
                    </div>
                    <div class="tcg-card-bottom-foil">
                        <span class="tcg-serial">NO. ${(av.id || '01').padStart(3, '0')} / CODE LEVELER TCG</span>
                        <span class="tcg-edition">1ST ED</span>
                    </div>
                `;
            }

            // Atribui a cor de raridade agora que foi revelada
            card.style.setProperty('--rarity-color', rInfo.color);
            card.classList.remove('suspense-phase', 'is-flipped', 'gacha-mystery-card');
            card.classList.add('is-revealed');
            if (wrap) {
                wrap.classList.remove('mystery-mode', 'suspense-active');
                wrap.classList.add('card-revealed');
            }

            // Atualiza badge de novo ou duplicata
            if (badge) {
                badge.className = `result-card-badge ${item.isDuplicate ? 'dup' : 'new'}`;
                badge.innerHTML = item.isDuplicate ? `DUPLICATA (+${item.duplicateXp} XP)` : 'NOVO ECO!';
            }

            // Som de comemoração de acordo com a raridade
            if (rInfo.stars >= 5 && window.soundFX && typeof window.soundFX.playFanfare === 'function') {
                window.soundFX.playFanfare();
            } else if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }

            this.revealedCardsCount++;
            if (this.revealedCardsCount >= this.currentResults.length) {
                this.onAllCardsRevealed();
            }
        }, 550);
    }

    /**
     * Revela todos os cards em cascata rápida
     */
    revealAllCards() {
        if (!this.currentResults) return;
        this.currentResults.forEach((_, idx) => {
            setTimeout(() => {
                this.revealCard(idx);
            }, idx * 160);
        });
    }

    onAllCardsRevealed() {
        const revealAllBtn = document.getElementById('gacha-reveal-all-btn');
        if (revealAllBtn) revealAllBtn.style.display = 'none';

        const revealHint = document.getElementById('gacha-reveal-hint');
        if (revealHint) revealHint.textContent = 'Convocação concluída com sucesso!';

        const summary = document.getElementById('gacha-duplicate-summary');
        if (summary && this.currentTotalXp > 0) {
            summary.innerHTML = `
                <div class="xp-conversion-banner">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span>Duplicatas convertidas em <strong>+${this.currentTotalXp} XP</strong> para seu Codemancer!</span>
                </div>
            `;
        }
    }

    backToPortal() {
        const portalArea = document.getElementById('gacha-portal-area');
        const resultArea = document.getElementById('gacha-results-screen');
        if (resultArea) resultArea.style.display = 'none';
        if (portalArea) portalArea.style.display = 'flex';
        const modalCard = document.querySelector('.gacha-modal-card');
        if (modalCard) modalCard.classList.remove('reveal-mode');
        this.renderSeasonCarousel();
        this.updateHeaderStats();
    }
}

window.gachaUI = new GachaUI();
