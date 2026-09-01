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
        this.renderPoolPreview();
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

        this.showSummonAnimation([pull], processed);
    }

    closeGachaModal() {
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

                <!-- ÁREA PRINCIPAL DO PORTAL / INVOCADOR -->
                <div id="gacha-portal-area" class="gacha-portal-container">
                    <div class="gacha-crystal-altar">
                        <div class="gacha-portal-orb">
                            <div class="portal-ring ring-1"></div>
                            <div class="portal-ring ring-2"></div>
                            <div class="portal-ring ring-3"></div>
                            <div class="portal-core">
                                <img src="assets/icons/WhiteLogo.svg" alt="Code Leveler" class="portal-logo-glow" />
                            </div>
                        </div>
                    </div>

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

                    <!-- GALERIA / PREVIEW DE RARIDADES -->
                    <div class="gacha-pool-preview">
                        <div class="pool-header-tab">CODEMANCERS DA TEMPORADA</div>
                        <div id="gacha-pool-grid" class="pool-avatars-grid"></div>
                    </div>
                </div>

                <!-- TELA DE REVELAÇÃO DOS RESULTADOS -->
                <div id="gacha-results-screen" class="gacha-results-container" style="display:none;">
                    <div class="gacha-reveal-header">
                        <span class="gacha-reveal-tag">RESULTADO DA CONVOCAÇÃO</span>
                        <h3 id="gacha-reveal-title" class="gacha-reveal-title">ECOS SINTONIZADOS</h3>
                    </div>
                    <div id="gacha-cards-display" class="gacha-cards-grid"></div>
                    <div class="gacha-results-footer">
                        <div id="gacha-duplicate-summary" class="gacha-dup-summary"></div>
                        <button class="glow-button primary" onclick="window.gachaUI.backToPortal()">
                            <span class="btn-text">CONCLUIR CONVOCAÇÃO</span>
                            <span class="btn-glow"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    renderPoolPreview() {
        const grid = document.getElementById('gacha-pool-grid');
        if (!grid) return;

        const pool = window.gachaEngine.getPool();
        const unlocked = (window.gameProgress && window.gameProgress.unlockedAvatars) 
            ? window.gameProgress.unlockedAvatars 
            : ((window.app && window.app.engine && window.app.engine.state && window.app.engine.state.unlockedAvatars) ? window.app.engine.state.unlockedAvatars : ['02']);

        grid.innerHTML = pool.map(av => {
            const isUnlocked = unlocked.includes(av.id);
            const rInfo = AVATAR_RARITIES[av.rarity];
            const starText = '★'.repeat(rInfo.stars);
            return `
                <div class="pool-avatar-card ${isUnlocked ? 'unlocked' : 'locked'}" style="--tier-color:${rInfo.color}">
                    <div class="pool-avatar-card-inner">
                        <div class="pool-avatar-img-box">
                            <img src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" loading="lazy" />
                        </div>
                        <div class="pool-avatar-rarity-row" style="color:${rInfo.color}">${starText}</div>
                    </div>
                    <div class="pool-avatar-info">
                        <span class="pool-avatar-name">${av.name}</span>
                        <span class="pool-avatar-skill-name" style="color:${rInfo.color}">✦ ${av.skillName}</span>
                        <span class="pool-avatar-skill-desc">${av.skillDesc}</span>
                    </div>
                </div>
            `;
        }).join('');
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

        if (!resultArea || !cardsGrid) return;

        portalArea.style.display = 'none';
        resultArea.style.display = 'flex';

        cardsGrid.innerHTML = results.map((item, index) => {
            const av = item.avatar;
            const rInfo = item.rarityInfo;
            const stars = '★'.repeat(rInfo.stars);
            return `
                <div class="gacha-result-card ${item.isDuplicate ? 'is-dup' : 'is-new'}" style="--glow-color:${rInfo.color}; animation-delay:${index * 0.15}s">
                    <div class="result-card-badge ${item.isDuplicate ? 'dup' : 'new'}">
                        ${item.isDuplicate ? `DUPLICATA (+${item.duplicateXp} XP)` : 'NOVO ECO!'}
                    </div>
                    <div class="result-avatar-frame" style="border-color:${rInfo.color}; box-shadow:0 0 20px ${rInfo.glow};">
                        <img src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" />
                    </div>
                    <div class="result-avatar-meta">
                        <span class="result-rarity-stars" style="color:${rInfo.color}">${stars}</span>
                        <h4 class="result-avatar-name">${av.name}</h4>
                        <span class="result-skill-badge" style="color:${rInfo.color}">✦ ${av.skillName}</span>
                        <p class="result-skill-desc">${av.skillDesc}</p>
                    </div>
                </div>
            `;
        }).join('');

        if (totalXpGained > 0) {
            summary.innerHTML = `
                <div class="xp-conversion-banner">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span>Duplicatas convertidas em <strong>+${totalXpGained} XP</strong> para seu Codemancer!</span>
                </div>
            `;
        } else {
            summary.innerHTML = '';
        }
    }

    backToPortal() {
        const portalArea = document.getElementById('gacha-portal-area');
        const resultArea = document.getElementById('gacha-results-screen');
        if (resultArea) resultArea.style.display = 'none';
        if (portalArea) portalArea.style.display = 'flex';
        this.renderPoolPreview();
        this.updateHeaderStats();
    }
}

window.gachaUI = new GachaUI();
