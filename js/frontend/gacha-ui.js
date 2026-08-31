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
        modal.classList.add('active');
        this.renderPoolPreview();
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

    updateHeaderStats() {
        const tokenElem = document.getElementById('gacha-user-tokens');
        if (tokenElem && window.gameProgress) {
            tokenElem.textContent = window.gameProgress.tokens || 0;
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
                        <button class="gacha-btn single" onclick="window.gachaUI.handleSummon(1)">
                            <span class="gacha-btn-title">CONVOCAR 1x</span>
                            <span class="gacha-btn-cost">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                                150 TOKENS
                            </span>
                        </button>

                        <button class="gacha-btn multi" onclick="window.gachaUI.handleSummon(5)">
                            <span class="gacha-btn-badge">ECONOMIZE 50 TOKENS</span>
                            <span class="gacha-btn-title">CONVOCAR 5x</span>
                            <span class="gacha-btn-cost">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                                700 TOKENS
                            </span>
                        </button>
                    </div>

                    <!-- GALERIA / PREVIEW DE RARIDADES -->
                    <div class="gacha-pool-preview">
                        <div class="pool-header-tab">AVATARES & HABILIDADES DA TEMPORADA (02 A 24)</div>
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
        const unlocked = (window.gameProgress && window.gameProgress.unlockedAvatars) ? window.gameProgress.unlockedAvatars : ['02'];

        grid.innerHTML = pool.map(av => {
            const isUnlocked = unlocked.includes(av.id);
            const rInfo = AVATAR_RARITIES[av.rarity];
            const starText = '★'.repeat(rInfo.stars);
            return `
                <div class="pool-avatar-card ${isUnlocked ? 'unlocked' : 'locked'}" style="--tier-color:${rInfo.color}">
                    <div class="pool-avatar-img-box">
                        <img src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" loading="lazy" />
                        <span class="pool-avatar-rarity" style="color:${rInfo.color}">${starText}</span>
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
        const currentTokens = (window.gameProgress && window.gameProgress.tokens) || 0;
        const cost = amount === 1 ? window.gachaEngine.SINGLE_PULL_COST : window.gachaEngine.MULTI_PULL_COST;

        if (currentTokens < cost) {
            if (typeof showSystemNotice === 'function') {
                showSystemNotice(`Tokens insuficientes! Você precisa de ${cost} Tokens.`, 'warning');
            } else {
                alert(`Tokens insuficientes! Você precisa de ${cost} Tokens.`);
            }
            return;
        }

        this.isSummoning = true;
        
        // Deduz tokens
        window.gameProgress.tokens -= cost;
        this.updateHeaderStats();
        if (typeof updateTokensDisplay === 'function') updateTokensDisplay();

        // Obtém estado de pity
        if (!window.gameProgress.gachaState) {
            window.gameProgress.gachaState = { pityCounter: 0, totalPulls: 0 };
        }

        // Executa Invocação
        let pulls = [];
        if (amount === 1) {
            pulls = [window.gachaEngine.pullSingle(window.gameProgress.gachaState)];
        } else {
            const multiRes = window.gachaEngine.pullMulti(window.gameProgress.gachaState);
            pulls = multiRes.results;
        }

        // Processa Unlocks e Duplicatas em XP
        if (!window.gameProgress.unlockedAvatars) {
            window.gameProgress.unlockedAvatars = ['02'];
        }

        const processed = window.gachaEngine.processPulls(pulls, window.gameProgress.unlockedAvatars);
        
        // Adiciona novos desbloqueados
        processed.newUnlocks.forEach(id => {
            if (!window.gameProgress.unlockedAvatars.includes(id)) {
                window.gameProgress.unlockedAvatars.push(id);
            }
        });

        // Adiciona XP das duplicatas
        if (processed.totalXpGained > 0) {
            window.gameProgress.xp = (window.gameProgress.xp || 0) + processed.totalXpGained;
            if (typeof checkLevelUp === 'function') checkLevelUp();
        }

        // Salva progresso no backend / LocalStorage
        if (typeof saveProgressToBackend === 'function') {
            saveProgressToBackend();
        } else if (typeof saveProgressLocally === 'function') {
            saveProgressLocally();
        }

        // Efeito de animação do portal
        const portal = document.querySelector('.gacha-portal-orb');
        if (portal) {
            portal.classList.add('summoning');
        }

        setTimeout(() => {
            if (portal) portal.classList.remove('summoning');
            this.showResults(processed.processedResults, processed.totalXpGained);
            this.isSummoning = false;
        }, 1200);
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
