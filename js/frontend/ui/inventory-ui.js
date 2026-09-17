/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — UI: Inventory, Artifacts & Navigation Badges
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _Extension {

    renderInventoryScreen() {
        const gameProgress = (window.app && window.app.engine && window.app.engine.state)
            ? window.app.engine.state
            : (window.gameProgress || {});

        const unlockedList = (gameProgress.unlockedAvatars && gameProgress.unlockedAvatars.length)
            ? gameProgress.unlockedAvatars
            : ['02'];

        const isTeacherOrAdmin = (typeof authManager !== 'undefined') && (
            (typeof authManager.isTeacher === 'function' && authManager.isTeacher()) ||
            (typeof authManager.isAdmin === 'function' && authManager.isAdmin()) ||
            (typeof authManager.isAdminEmail === 'function' && authManager.isAdminEmail(authManager.currentUser?.email || authManager.userData?.email))
        );

        const effectiveUnlocked = [...unlockedList];
        if (isTeacherOrAdmin && !effectiveUnlocked.includes('01')) {
            effectiveUnlocked.push('01');
        }

        const equippedId = gameProgress.currentAvatarId || gameProgress.avatarId || '02';

        // Seleciona o primeiro avatar desbloqueado para preview inicial
        const previewId = effectiveUnlocked.includes(equippedId) ? equippedId : (effectiveUnlocked[0] || '02');

        // Renderiza lista de avatares
        this._inventoryPreviewId = previewId;
        this._renderInventoryAvatarList(effectiveUnlocked, equippedId, previewId);

        // Renderiza card do avatar
        this.renderInventoryAvatarCard(previewId);

        // Renderiza grid com a aba padrão (crown)
        this.renderInventoryGrid('crown');

        // Inicializa partículas e estrelas cósmicas no fundo do inventário
        this.initInventoryParticles();
    }

    initInventoryParticles() {
        const starsLayer = document.getElementById('inv-stars-layer');
        const particlesLayer = document.getElementById('inv-particles-layer');
        if (!starsLayer || !particlesLayer) return;

        // Se já foram populadas, não recria para preservar animação suave
        if (starsLayer.children.length > 0) return;

        starsLayer.innerHTML = '';
        particlesLayer.innerHTML = '';

        // 60 estrelas cintilantes com variação de tamanho, cor e profundidade
        const colorClasses = ['', 'cyan', 'gold', 'purple'];
        for (let i = 0; i < 60; i++) {
            const star = document.createElement('div');
            const colorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
            star.className = `inv-twinkle-star ${colorClass}`.trim();
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 2.8 + 1.2; // 1.2px a 4.0px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            starsLayer.appendChild(star);
        }

        // 25 partículas de poeira cósmica flutuante
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'inv-float-dust';
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 4 + 2; // 2px a 6px
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.animationDelay = `${Math.random() * 7}s`;
            p.style.animationDuration = `${Math.random() * 6 + 7}s`; // 7s a 13s
            particlesLayer.appendChild(p);
        }
    }

    _renderInventoryAvatarList(unlockedList, equippedId, activeId) {
        const container = document.getElementById('inv-avatar-list');
        if (!container) return;

        const avatarData = (typeof AVATAR_SKILLS_DATA !== 'undefined') ? AVATAR_SKILLS_DATA : {};
        const isTeacherOrAdmin = (typeof authManager !== 'undefined') && (
            (typeof authManager.isTeacher === 'function' && authManager.isTeacher()) ||
            (typeof authManager.isAdmin === 'function' && authManager.isAdmin()) ||
            (typeof authManager.isAdminEmail === 'function' && authManager.isAdminEmail(authManager.currentUser?.email || authManager.userData?.email))
        );

        // Se for professor ou admin, garante que o avatar '01' (Shadow Coder) esteja na lista de desbloqueados
        const effectiveUnlocked = [...unlockedList];
        if (isTeacherOrAdmin && !effectiveUnlocked.includes('01')) {
            effectiveUnlocked.push('01');
        }

        // Pega TODOS os avatares do jogo (excluindo apenas teacherOnly se não for professor)
        const allAvatarIds = Object.keys(avatarData)
            .filter(id => !avatarData[id].teacherOnly || isTeacherOrAdmin)
            .sort((a, b) => parseInt(a) - parseInt(b));

        if (allAvatarIds.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = allAvatarIds.map(id => {
            const isUnlocked = effectiveUnlocked.includes(id);
            const isEquipped = id === equippedId;
            const isActive = id === activeId;
            let cls = 'inv-avatar-btn';
            if (isActive) cls += ' active';
            if (isEquipped) cls += ' equipped-avatar';
            if (!isUnlocked) cls += ' locked-avatar';

            return `
                <button class="${cls}" data-avatar-id="${id}"
                    ${isUnlocked ? `onclick="app.ui._selectInventoryAvatar('${id}')" ondblclick="app.selectAvatar('assets/avatars/avatar_${id}.png')"` : ''}
                    title="${isUnlocked ? ((avatarData[id] && avatarData[id].name) || id) + (isEquipped ? ' (Equipado)' : ' — Clique para ver / Duplo clique para equipar') : `[Bloqueado] ${(avatarData[id] && avatarData[id].name) || id}`}">
                    <img src="assets/avatars/avatar_${id}.png"
                         alt="${(avatarData[id] && avatarData[id].name) || id}"
                         onerror="this.style.opacity='0.3'">
                    ${!isUnlocked ? `
                        <div class="inv-avatar-lock-overlay">
                            <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                        </div>
                    ` : ''}
                </button>
            `;
        }).join('');
    }

    _selectInventoryAvatar(avatarId) {
        this._inventoryPreviewId = avatarId;

        // Atualiza estado ativo na lista
        document.querySelectorAll('.inv-avatar-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.avatarId === avatarId);
        });

        // Renderiza card com o novo avatar selecionado
        this.renderInventoryAvatarCard(avatarId);

        // Se o avatar for desbloqueado, equipa-o imediatamente como avatar ativo
        const avatarPath = `assets/avatars/avatar_${avatarId}.png`;
        if (window.app && typeof window.app.selectAvatar === 'function') {
            window.app.selectAvatar(avatarPath);
        }
    }

    renderInventoryAvatarCard(avatarId) {
        const card = document.getElementById('inv-avatar-card');
        const statsPanel = document.getElementById('inv-rpg-stats-panel');
        if (!card) return;

        const avatarData = (typeof AVATAR_SKILLS_DATA !== 'undefined') ? AVATAR_SKILLS_DATA : {};
        const data = avatarData[avatarId];

        if (!data) {
            card.innerHTML = `
                <div class="inv-avatar-card-rarity-bar"></div>
                <div class="inv-avatar-card-img-wrap">
                    <img class="inv-avatar-card-img" src="assets/avatars/avatar_${avatarId}.png" alt="Avatar">
                </div>
                <div class="inv-avatar-card-body">
                    <span class="inv-avatar-name">Avatar ${avatarId}</span>
                </div>
            `;
            if (statsPanel) statsPanel.innerHTML = '';
            return;
        }

        const rarityMap = {
            'COMMON':    { stars: 3, color: '#94a3b8', label: 'Comum' },
            'RARE':      { stars: 4, color: '#38bdf8', label: 'Raro' },
            'EPIC':      { stars: 5, color: '#c084fc', label: 'Épico' },
            'LEGENDARY': { stars: 6, color: '#fbbf24', label: 'Lendário' }
        };
        const rInfo = rarityMap[data.rarity] || rarityMap['COMMON'];
        const starSVG = (filled) => filled
            ? `<svg class="star-filled" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
            : `<svg class="star-empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
        const maxStars = 6;
        const starsHtml = Array.from({length: maxStars}, (_, i) => starSVG(i < rInfo.stars)).join('');

        const statIcon = (type) => {
            const icons = {
                hp:  `<svg class="inv-stat-icon" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
                atk: `<svg class="inv-stat-icon" viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 7 23 1 17 1"/><line x1="23" y1="1" x2="14" y2="10"/><path d="M1 23l6.5-6.5M9 17l4.5-4.5M17 11L11 17l-4 4"/></svg>`,
                def: `<svg class="inv-stat-icon" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
                spd: `<svg class="inv-stat-icon" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>`
            };
            return icons[type] || '';
        };

        // Stat points — lê do engine se disponível
        const engine = (window.app && window.app.engine) ? window.app.engine : null;
        const gameProgress = engine ? engine.state : (window.gameProgress || {});
        const equippedId = gameProgress.currentAvatarId || gameProgress.avatarId || '02';
        const isEquipped = avatarId === equippedId;
        const unlockedList = (gameProgress.unlockedAvatars && gameProgress.unlockedAvatars.length)
            ? gameProgress.unlockedAvatars
            : ['02'];
        const isTeacherOrAdmin = (typeof authManager !== 'undefined') && (
            (typeof authManager.isTeacher === 'function' && authManager.isTeacher()) ||
            (typeof authManager.isAdmin === 'function' && authManager.isAdmin()) ||
            (typeof authManager.isAdminEmail === 'function' && authManager.isAdminEmail(authManager.currentUser?.email || authManager.userData?.email))
        );
        const isUnlocked = isTeacherOrAdmin || avatarId === '02' || unlockedList.includes(avatarId);

        const availablePoints = engine ? engine.getAvatarAvailableStatPoints(avatarId) : 0;
        const totalPoints = engine ? engine.getTotalStatPoints() : 0;
        const allocated = engine ? engine.getAvatarStatPoints(avatarId) : { hp: 0, atk: 0, def: 0, spd: 0 };

        // Multiplicadores por ponto alocado
        const STAT_MULT = { hp: 15, atk: 8, def: 6, spd: 5 };

        const totalAllocated = (allocated.hp || 0) + (allocated.atk || 0) + (allocated.def || 0) + (allocated.spd || 0);

        // Bônus de artefatos equipados no avatar preview
        const artBonuses = engine ? engine.getAvatarArtifactBonuses(avatarId) : { hp_flat: 0, hp_pct: 0, atk_flat: 0, atk_pct: 0, def_flat: 0, def_pct: 0, spd_flat: 0, spd_pct: 0 };

        // Bônus passivos das Boss Skills despertadas
        const bossSkills = engine && typeof engine.getBossSkillsBonuses === 'function' 
            ? engine.getBossSkillsBonuses() 
            : { hp_flat: 0, atk_pct: 0, def_pct: 0, spd_flat: 0 };

        // Calcula stats finais: (base + pontos de status alocados + flat) * (1 + pct total)
        // Os bônus percentuais incidem sobre o valor total consolidado do avatar
        const calcFinalStat = (baseVal, allocPts, mult, pctBonus, flatBonus, bossPct = 0, bossFlat = 0) => {
            const totalFlat = (baseVal || 0) + ((allocPts || 0) * mult) + (flatBonus || 0) + (bossFlat || 0);
            const totalPct = (pctBonus || 0) + (bossPct || 0);
            return Math.round(totalFlat * (1 + totalPct / 100));
        };

        const finalHp  = calcFinalStat(data.baseHp || 0, allocated.hp, STAT_MULT.hp, artBonuses.hp_pct, artBonuses.hp_flat, 0, bossSkills.hp_flat);
        const finalAtk = calcFinalStat(data.baseAttack || 0, allocated.atk, STAT_MULT.atk, artBonuses.atk_pct, artBonuses.atk_flat, bossSkills.atk_pct, 0);
        const finalDef = calcFinalStat(data.baseDefense || 0, allocated.def, STAT_MULT.def, artBonuses.def_pct, artBonuses.def_flat, bossSkills.def_pct, 0);
        const finalSpd = calcFinalStat(data.baseSpeed || 0, allocated.spd, STAT_MULT.spd, artBonuses.spd_pct, artBonuses.spd_flat, 0, bossSkills.spd_flat);

        // Gera linha de stat points
        const spRow = (stat, label, baseVal, allocatedPts, finalVal) => {
            const pts = allocatedPts || 0;
            const hasPoints = pts > 0;
            const canAdd = availablePoints > 0;
            const avId = avatarId.replace(/'/g, "\\'");
            return `
                <div class="inv-sp-row">
                    <div class="inv-sp-row-info">
                        <span class="inv-sp-row-name">${label}</span>
                        <span class="inv-sp-row-total">${finalVal}</span>
                        <span class="inv-sp-row-base">Base ${baseVal}${pts > 0 ? ` +${pts * STAT_MULT[stat]}` : ''}</span>
                    </div>
                    <span class="inv-sp-points-badge ${pts === 0 ? 'zero-points' : ''}">+${pts}</span>
                    <button class="inv-sp-btn minus" onclick="app.handleStatPointDistribute('${avId}','${stat}',-1)" ${!hasPoints ? 'disabled' : ''} title="Remover ponto">&#8722;</button>
                    <button class="inv-sp-btn plus" onclick="app.handleStatPointDistribute('${avId}','${stat}',1)" ${!canAdd ? 'disabled' : ''} title="Adicionar ponto">+</button>
                </div>
            `;
        };

        const pointsZero = availablePoints <= 0;

        // Identifica imagem do verso de acordo com o mundo ativo (C ou C#)
        const isCSharp = (this.isCSharpWorld && this.isCSharpWorld()) || 
                         (engine && engine.state && engine.state.worldId === 'csharp_unity');
        const cardBackImg = isCSharp ? 'assets/BackCard_Csharp.png' : 'assets/backCard_C.png';

        // Renderiza o Card TCG 3D do Avatar com suporte a 2 faces (Flip 3D)
        card.style.setProperty('--rarity-color', rInfo.color);
        card.setAttribute('onclick', 'this.classList.toggle("is-flipped")');
        card.setAttribute('title', 'Clique para virar a carta');

        card.innerHTML = `
            <div class="tcg-card-inner">
                <!-- FACE FRONTAL (FRENTE) -->
                <div class="tcg-card-face tcg-card-front">
                    <div class="tcg-card-holo-frame"></div>
                    <div class="tcg-card-glare"></div>
                    <div class="tcg-card-holo-foil"></div>
                    <div class="inv-avatar-card-rarity-bar" style="background: linear-gradient(90deg, ${rInfo.color}, transparent);"></div>
                    <div class="inv-avatar-card-img-wrap">
                        <div class="tcg-geo-pattern"></div>
                        <div class="tcg-foil-sparkles"></div>
                        <img class="inv-avatar-card-ghost-aura" src="assets/avatars/avatar_${avatarId}.png" alt="" aria-hidden="true" onerror="this.style.display='none'">
                        <img class="inv-avatar-card-img" src="assets/avatars/avatar_${avatarId}.png" alt="${data.name}" onerror="this.style.opacity='0.3'">
                    </div>
                    <div class="inv-avatar-card-body">
                        <div class="tcg-card-top-row">
                            <div class="inv-avatar-stars">${starsHtml}</div>
                        </div>
                        <div class="tcg-card-identity">
                            <div class="inv-avatar-name">${data.name}</div>
                            <div class="inv-avatar-title">${data.title}</div>
                        </div>

                        <!-- Atributos Sucintos de Combate Integrados ao Card TCG -->
                        <div class="tcg-compact-stats">
                            <div class="tcg-cstat-pill hp" title="Pontos de Vida">
                                <span class="tcg-cstat-lbl">HP</span>
                                <span class="tcg-cstat-val">${finalHp || data.baseHp || '—'}</span>
                            </div>
                            <div class="tcg-cstat-pill atk" title="Poder de Ataque">
                                <span class="tcg-cstat-lbl">ATK</span>
                                <span class="tcg-cstat-val">${finalAtk || data.baseAttack || '—'}</span>
                            </div>
                            <div class="tcg-cstat-pill def" title="Defesa / Resistência">
                                <span class="tcg-cstat-lbl">DEF</span>
                                <span class="tcg-cstat-val">${finalDef || data.baseDefense || '—'}</span>
                            </div>
                            <div class="tcg-cstat-pill spd" title="Velocidade de Ação">
                                <span class="tcg-cstat-lbl">SPD</span>
                                <span class="tcg-cstat-val">${finalSpd || data.baseSpeed || '—'}</span>
                            </div>
                        </div>

                        <div class="inv-avatar-skill">
                            <span class="inv-avatar-skill-label">Habilidade Passiva</span>
                            <span class="inv-avatar-skill-name">${data.skillName}</span>
                            <span class="inv-avatar-skill-desc">${data.skillDesc}</span>
                        </div>
                    </div>
                    <div class="tcg-card-bottom-foil">
                        <span class="tcg-serial">NO. ${avatarId.padStart ? avatarId.padStart(3, '0') : avatarId} / CODE LEVELER TCG</span>
                        <span class="tcg-edition">1ST ED</span>
                    </div>
                </div>

                <!-- FACE TRASEIRA (VERSO / BACK CARD) -->
                <div class="tcg-card-face tcg-card-back">
                    <div class="tcg-card-holo-frame"></div>
                    <div class="tcg-card-glare"></div>
                    <div class="tcg-card-back-img-wrap">
                        <img class="tcg-card-back-img" src="${cardBackImg}" alt="Card Back" onerror="this.src='assets/backCard_C.png'">
                    </div>
                    <div class="tcg-card-back-footer">
                        <span class="tcg-back-brand">GUILDCODE TCG</span>
                        <span class="tcg-back-hint">Clique para desvirar</span>
                    </div>
                </div>
            </div>
        `;

        // Renderiza o Painel de Atributos e Distribuição de Pontos (lado esquerdo do card)
        if (statsPanel) {
            statsPanel.innerHTML = `
                <!-- Painel de Distribuição de Pontos de Status -->
                <div class="inv-stat-points-panel">
                    <div class="inv-sp-header">
                        <div class="inv-sp-title">Pontos de Status</div>
                        <div class="inv-sp-available ${pointsZero ? 'zero' : ''}">${availablePoints}/${totalPoints}</div>
                    </div>
                    <div class="inv-sp-rows">
                        ${spRow('hp',  'HP',  data.baseHp      || 0, allocated.hp,  finalHp)}
                        ${spRow('atk', 'ATK', data.baseAttack  || 0, allocated.atk, finalAtk)}
                        ${spRow('def', 'DEF', data.baseDefense || 0, allocated.def, finalDef)}
                        ${spRow('spd', 'SPD', data.baseSpeed   || 0, allocated.spd, finalSpd)}
                    </div>
                    <div class="inv-sp-footer" style="display:flex;gap:0.5rem;flex-direction:column;width:100%;">
                        ${!isEquipped && isUnlocked ? `
                            <button class="glow-button primary pulse-action" style="width:100%;padding:0.45rem 0.8rem;font-size:0.75rem;" onclick="app.selectAvatar('assets/avatars/avatar_${avatarId}.png')">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.35rem;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                EQUIPAR ESTE AVATAR
                            </button>
                        ` : !isEquipped && !isUnlocked ? `
                            <button class="glow-button" style="width:100%;padding:0.45rem 0.8rem;font-size:0.75rem;opacity:0.6;" disabled>
                                AVATAR BLOQUEADO
                            </button>
                        ` : ""}
                        <button class="inv-sp-reset-btn" onclick="app.handleStatPointReset('${avatarId.replace(/'/g, "\\'")}')" ${totalAllocated === 0 ? 'disabled' : ''} title="Resetar pontos deste avatar" style="width:100%;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.31"/></svg>
                            Reset Card
                        </button>
                    </div>
                </div>

                <!-- Painel de Boss Skills (Títulos e Buffs Passivos de Chefes Derrotados) -->
                ${this.renderBossSkillsSection(engine)}
            `;
        }

        // Configura o efeito 3D TCG com mousemove e reflexo holográfico
        this.initAvatarCard3DTilt(card);

        // Atualiza slots de artefatos do avatar
        this.renderAvatarArtifactSlots(avatarId);
    }
    /**
     * Renderiza a seção "Boss Skills" com accordions arcanos para os títulos de chefes obtidos.
     * Apenas skills já conquistadas são exibidas. Zero emojis e ícone RaidBoss oficial.
     */
    renderBossSkillsSection(engine) {
        if (typeof BossSkillsManager === 'undefined' || typeof BOSS_SKILLS_DATA === 'undefined') {
            return '';
        }

        const bossesDefeated = (engine && engine.state && engine.state.bossesDefeated) || {};
        const activeBonuses = BossSkillsManager.calculateActiveBonuses(bossesDefeated);
        const allSkills = Object.values(BOSS_SKILLS_DATA);

        // Filtra estritamente apenas as skills obtidas pelo jogador
        const unlockedSkills = allSkills.filter(skill => {
            const chId = skill.chapterId;
            const record = bossesDefeated[skill.id] || 
                           bossesDefeated[chId] || 
                           bossesDefeated[String(chId)] || 
                           bossesDefeated[`boss_${chId}`] || 
                           bossesDefeated[`boss_ch${chId}`];

            return !!(
                record === true || 
                (typeof record === 'number' && record > 0) ||
                (record && typeof record === 'object' && (record.tokensClaimed || record.completedAt || record.timesDefeated > 0 || record.crystalsClaimed))
            );
        });

        const chevronSvg = BossSkillsManager.getSvgIcon('chevron', 14);

        const accordionsHtml = unlockedSkills.length > 0 ? unlockedSkills.map(skill => {
            return `
                <div class="boss-skill-accordion-item unlocked" id="bs-item-${skill.id}">
                    <button class="boss-skill-accordion-header" type="button" onclick="app.ui.toggleBossSkillAccordion('${skill.id}')" aria-expanded="false">
                        <div class="boss-skill-header-left">
                            <span class="boss-skill-title-text">${skill.title}</span>
                        </div>
                        <div class="boss-skill-header-right">
                            <span class="boss-skill-chevron">${chevronSvg}</span>
                        </div>
                    </button>
                    <div class="boss-skill-accordion-body" id="bs-body-${skill.id}">
                        <div class="boss-skill-body-content">
                            <div class="boss-skill-boss-origin">
                                <span class="bs-origin-label">CHEFE DERROTADO:</span>
                                <span class="bs-origin-name">${skill.bossName}</span>
                            </div>
                            <div class="boss-skill-category-tag">
                                <span class="bs-tag-dot"></span>
                                ${skill.categoryLabel}
                            </div>
                            <p class="boss-skill-desc">${skill.fullDesc}</p>
                            <div class="boss-skill-bonus-highlight">
                                <span class="bs-bonus-label">EFEITO PASSIVO:</span>
                                <span class="bs-bonus-val">${skill.shortDesc}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('') : `
            <div class="boss-skills-empty-state">
                <p>Nenhuma Boss Skill conquistada ainda.</p>
                <span>Derrote chefes na Boss Raid para despertar títulos e buffs passivos permanentes.</span>
            </div>
        `;

        return `
            <div class="inv-boss-skills-panel">
                <div class="inv-bs-header">
                    <div class="inv-bs-title-wrap">
                        <span class="inv-bs-icon">
                            <img src="assets/icons/RaidBoss.svg" alt="Boss Skills" class="inv-bs-raidboss-icon" onerror="this.src='assets/icons/WhiteLogo.svg'">
                        </span>
                        <div class="inv-bs-heading">
                            <span class="inv-bs-title">BOSS SKILLS</span>
                            <span class="inv-bs-sub">Títulos & Buffs Passivos</span>
                        </div>
                    </div>
                    <span class="inv-bs-count-badge ${unlockedSkills.length > 0 ? 'has-skills' : ''}">
                        ${unlockedSkills.length} / ${activeBonuses.totalSkills}
                    </span>
                </div>
                <div class="inv-bs-accordions-list">
                    ${accordionsHtml}
                </div>
            </div>
        `;
    }

    toggleBossSkillAccordion(skillId) {
        const item = document.getElementById(`bs-item-${skillId}`);
        if (!item) return;

        const isOpen = item.classList.contains('open');
        const headerBtn = item.querySelector('.boss-skill-accordion-header');

        if (isOpen) {
            item.classList.remove('open');
            if (headerBtn) headerBtn.setAttribute('aria-expanded', 'false');
        } else {
            item.classList.add('open');
            if (headerBtn) headerBtn.setAttribute('aria-expanded', 'true');
        }
    }

    initAvatarCard3DTilt(cardEl) {
        if (!cardEl) return;
        const wrapper = cardEl.closest('.inv-avatar-tcg-wrapper') || cardEl.parentElement;
        if (!wrapper) return;

        // Limpa event listeners e RAF antigos se existirem
        if (wrapper._tcgState && wrapper._tcgState.rafId) {
            cancelAnimationFrame(wrapper._tcgState.rafId);
        }
        if (wrapper._tcgHandlers) {
            wrapper.removeEventListener('mousemove', wrapper._tcgHandlers.onMove);
            wrapper.removeEventListener('mouseleave', wrapper._tcgHandlers.onLeave);
            wrapper.removeEventListener('mouseenter', wrapper._tcgHandlers.onEnter);
        }

        // Estado físico da simulação LERP
        const state = {
            targetRX: 0,
            targetRY: 0,
            currentRX: 0,
            currentRY: 0,
            targetGlareX: 50,
            targetGlareY: 50,
            currentGlareX: 50,
            currentGlareY: 50,
            targetGlareOp: 0,
            currentGlareOp: 0,
            isHovering: false,
            rafId: null
        };
        wrapper._tcgState = state;

        const updatePhysics = () => {
            // Fator LERP: 0.12 para sensação suave, fluida e orgânica
            const lerpSpeed = state.isHovering ? 0.12 : 0.08;

            state.currentRX += (state.targetRX - state.currentRX) * lerpSpeed;
            state.currentRY += (state.targetRY - state.currentRY) * lerpSpeed;
            state.currentGlareX += (state.targetGlareX - state.currentGlareX) * lerpSpeed;
            state.currentGlareY += (state.targetGlareY - state.currentGlareY) * lerpSpeed;
            state.currentGlareOp += (state.targetGlareOp - state.currentGlareOp) * lerpSpeed;

            cardEl.style.setProperty('--tcg-rx', `${state.currentRX.toFixed(3)}deg`);
            cardEl.style.setProperty('--tcg-ry', `${state.currentRY.toFixed(3)}deg`);
            cardEl.style.setProperty('--tcg-glare-x', `${state.currentGlareX.toFixed(2)}%`);
            cardEl.style.setProperty('--tcg-glare-y', `${state.currentGlareY.toFixed(2)}%`);
            cardEl.style.setProperty('--tcg-glare-opacity', state.currentGlareOp.toFixed(3));

            // Continua o loop enquanto houver diferença perceptível ou enquanto o mouse estiver sobre o card
            const diff = Math.abs(state.targetRX - state.currentRX) + 
                         Math.abs(state.targetRY - state.currentRY) + 
                         Math.abs(state.targetGlareOp - state.currentGlareOp);

            if (state.isHovering || diff > 0.005) {
                state.rafId = requestAnimationFrame(updatePhysics);
            } else {
                state.rafId = null;
            }
        };

        const onMove = (e) => {
            const rect = cardEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;

            const px = Math.max(0, Math.min(1, x / width));
            const py = Math.max(0, Math.min(1, y / height));

            // Ângulos alvos calculados (-16 a +16 deg)
            state.targetRX = (py - 0.5) * -24;
            state.targetRY = (px - 0.5) * 24;
            state.targetGlareX = px * 100;
            state.targetGlareY = py * 100;
            state.targetGlareOp = 0.8;
            state.isHovering = true;

            if (!state.rafId) {
                state.rafId = requestAnimationFrame(updatePhysics);
            }
        };

        const onLeave = () => {
            state.isHovering = false;
            state.targetRX = 0;
            state.targetRY = 0;
            state.targetGlareOp = 0;
            cardEl.classList.remove('tcg-hovering');

            if (!state.rafId) {
                state.rafId = requestAnimationFrame(updatePhysics);
            }
        };

        const onEnter = () => {
            state.isHovering = true;
            cardEl.classList.add('tcg-hovering');
            if (!state.rafId) {
                state.rafId = requestAnimationFrame(updatePhysics);
            }
        };

        wrapper.addEventListener('mousemove', onMove);
        wrapper.addEventListener('mouseleave', onLeave);
        wrapper.addEventListener('mouseenter', onEnter);

        wrapper._tcgHandlers = { onMove, onLeave, onEnter };
    }

    // Exposição global para reuso universal em cards 3D (Gacha, Landing, Boss Lobby)
    static setupUniversalCard3D(cardEl, customWrapper) {
        if (!cardEl) return;
        const wrapper = customWrapper || cardEl.closest('.tcg-3d-perspective-wrapper') || cardEl.parentElement;
        if (!wrapper) return;

        if (wrapper._tcgState && wrapper._tcgState.rafId) {
            cancelAnimationFrame(wrapper._tcgState.rafId);
        }
        if (wrapper._tcgHandlers) {
            wrapper.removeEventListener('mousemove', wrapper._tcgHandlers.onMove);
            wrapper.removeEventListener('mouseleave', wrapper._tcgHandlers.onLeave);
            wrapper.removeEventListener('mouseenter', wrapper._tcgHandlers.onEnter);
        }

        const state = {
            targetRX: 0,
            targetRY: 0,
            currentRX: 0,
            currentRY: 0,
            targetGlareX: 50,
            targetGlareY: 50,
            currentGlareX: 50,
            currentGlareY: 50,
            targetGlareOp: 0,
            currentGlareOp: 0,
            isHovering: false,
            rafId: null
        };
        wrapper._tcgState = state;

        const updatePhysics = () => {
            const lerpSpeed = state.isHovering ? 0.12 : 0.08;
            state.currentRX += (state.targetRX - state.currentRX) * lerpSpeed;
            state.currentRY += (state.targetRY - state.currentRY) * lerpSpeed;
            state.currentGlareX += (state.targetGlareX - state.currentGlareX) * lerpSpeed;
            state.currentGlareY += (state.targetGlareY - state.currentGlareY) * lerpSpeed;
            state.currentGlareOp += (state.targetGlareOp - state.currentGlareOp) * lerpSpeed;

            cardEl.style.setProperty('--tcg-rx', `${state.currentRX.toFixed(3)}deg`);
            cardEl.style.setProperty('--tcg-ry', `${state.currentRY.toFixed(3)}deg`);
            cardEl.style.setProperty('--tcg-glare-x', `${state.currentGlareX.toFixed(2)}%`);
            cardEl.style.setProperty('--tcg-glare-y', `${state.currentGlareY.toFixed(2)}%`);
            cardEl.style.setProperty('--tcg-glare-opacity', state.currentGlareOp.toFixed(3));

            const diff = Math.abs(state.targetRX - state.currentRX) + 
                         Math.abs(state.targetRY - state.currentRY) + 
                         Math.abs(state.targetGlareOp - state.currentGlareOp);

            if (state.isHovering || diff > 0.005) {
                state.rafId = requestAnimationFrame(updatePhysics);
            } else {
                state.rafId = null;
            }
        };

        const onMove = (e) => {
            const rect = cardEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const px = Math.max(0, Math.min(1, x / rect.width));
            const py = Math.max(0, Math.min(1, y / rect.height));

            state.targetRX = (py - 0.5) * -22;
            state.targetRY = (px - 0.5) * 22;
            state.targetGlareX = px * 100;
            state.targetGlareY = py * 100;
            state.targetGlareOp = 0.8;
            state.isHovering = true;

            if (!state.rafId) state.rafId = requestAnimationFrame(updatePhysics);
        };

        const onLeave = () => {
            state.isHovering = false;
            state.targetRX = 0;
            state.targetRY = 0;
            state.targetGlareOp = 0;
            cardEl.classList.remove('tcg-hovering');
            if (!state.rafId) state.rafId = requestAnimationFrame(updatePhysics);
        };

        const onEnter = () => {
            state.isHovering = true;
            cardEl.classList.add('tcg-hovering');
            if (!state.rafId) state.rafId = requestAnimationFrame(updatePhysics);
        };

        wrapper.addEventListener('mousemove', onMove);
        wrapper.addEventListener('mouseleave', onLeave);
        wrapper.addEventListener('mouseenter', onEnter);

        wrapper._tcgHandlers = { onMove, onLeave, onEnter };
    }

    renderAvatarArtifactSlots(avatarId) {
        const slotsContainer = document.getElementById('inv-artifact-slots');
        if (!slotsContainer) return;

        const engine = (window.app && window.app.engine) ? window.app.engine : null;
        const equipped = engine ? engine.getEquippedArtifacts(avatarId) : { crown: null, chalice: null, ring: null, anklet: null };

        const defaultSvg = {
            crown:   `<img src="assets/icons/Crown.svg" alt="Coroa" class="inv-slot-type-icon">`,
            chalice: `<img src="assets/icons/Chalice.svg" alt="Cálice" class="inv-slot-type-icon">`,
            ring:    `<img src="assets/icons/Ring.svg" alt="Anel" class="inv-slot-type-icon">`,
            anklet:  `<img src="assets/icons/Ankle.svg" alt="Tornozeleira" class="inv-slot-type-icon">`
        };

        const titles = { crown: 'Coroa', chalice: 'Cálice', ring: 'Anel', anklet: 'Tornozeleira' };
        const slotKeys = ['crown', 'chalice', 'ring', 'anklet'];

        slotsContainer.innerHTML = slotKeys.map(slotKey => {
            const item = equipped[slotKey];
            if (item) {
                return `
                    <div class="inv-artifact-slot equipped" data-slot="${slotKey}"
                         onclick="app.ui.openArtifactDetailModal('${item.id}')"
                         title="${item.name} (${item.displayValue}) - Clique para detalhes">
                        <img src="${item.asset}" alt="${item.name}" class="inv-slot-artifact-img">
                        <span class="inv-artifact-slot-badge" style="background:${item.rarityColor || 'var(--gold)'};">${item.stars}★</span>
                    </div>
                `;
            } else {
                return `
                    <div class="inv-artifact-slot empty" data-slot="${slotKey}"
                         onclick="app.switchInventoryTab('${slotKey}')"
                         title="Slot de ${titles[slotKey]} vazio">
                        ${defaultSvg[slotKey]}
                    </div>
                `;
            }
        }).join('');
    }

    renderInventoryGrid(tab = 'crown') {
        const grid = document.getElementById('inv-grid');
        if (!grid) return;

        this._currentInventoryTab = tab;
        const engine = (window.app && window.app.engine) ? window.app.engine : null;
        const artifacts = engine ? engine.getArtifactsByType(tab) : [];
        const previewAvId = this._inventoryPreviewId || (engine ? (engine.state.currentAvatarId || '02') : '02');
        const maxSlots = 24;

        // Atualiza barra de capacidade da categoria
        const countEl = document.getElementById('inv-capacity-counts');
        const fillEl = document.getElementById('inv-capacity-fill');
        if (countEl && fillEl) {
            const count = artifacts.length;
            countEl.textContent = `${count} / ${maxSlots}`;
            const pct = Math.min(100, Math.round((count / maxSlots) * 100));
            fillEl.style.width = `${pct}%`;
            if (count >= maxSlots) {
                fillEl.classList.add('danger');
            } else {
                fillEl.classList.remove('danger');
            }
        }

        const slotSvg = {
            crown:   `<img src="assets/icons/Crown.svg" alt="Coroa" class="inv-slot-type-icon empty-grid-icon">`,
            chalice: `<img src="assets/icons/Chalice.svg" alt="Cálice" class="inv-slot-type-icon empty-grid-icon">`,
            ring:    `<img src="assets/icons/Ring.svg" alt="Anel" class="inv-slot-type-icon empty-grid-icon">`,
            anklet:  `<img src="assets/icons/Ankle.svg" alt="Tornozeleira" class="inv-slot-type-icon empty-grid-icon">`
        };
        const emptyIcon = slotSvg[tab] || slotSvg.crown;

        let itemsHtml = artifacts.map(art => {
            const equippedIn = engine ? engine.isArtifactEquipped(art.id) : null;
            const isEquippedCurrent = equippedIn === previewAvId;
            let badge = '';
            if (isEquippedCurrent) {
                badge = `<span class="inv-item-equipped-pill current">EQUIPADO</span>`;
            } else if (equippedIn) {
                badge = `<span class="inv-item-equipped-pill">OUTRO</span>`;
            }

            const isTransmuting = this._isTransmutingMode;
            const isTarget = isTransmuting && this._transmuteTargetId === art.id;
            const isSelectedMaterial = isTransmuting && (this._transmuteMaterialIds || []).includes(art.id);
            const isEquippedLocked = isTransmuting && equippedIn !== null && !isTarget;

            let extraClasses = '';
            if (isTarget) extraClasses += ' transmute-target';
            if (isSelectedMaterial) extraClasses += ' transmute-selected';
            if (isEquippedLocked) extraClasses += ' transmute-locked';

            const isSelected = !isTransmuting && this._selectedArtifactId === art.id;
            const levelBadge = (art.level > 0) ? `<span class="inv-item-level-badge">+${art.level}</span>` : '';
            const isNew = engine && typeof engine.isArtifactNew === 'function' && engine.isArtifactNew(art.id);
            const newDot = isNew ? `<span class="inv-artifact-new-dot" title="Novo Artefato!"></span>` : '';

            const clickHandler = isTransmuting
                ? `app.toggleTransmuteMaterial('${art.id}')`
                : `app.ui.openArtifactDetailModal('${art.id}')`;

            return `
                <div class="inv-item-slot has-artifact ${isSelected ? 'selected-artifact' : ''} ${extraClasses}" data-artifact-id="${art.id}" style="--rarity-color:${art.rarityColor || '#94a3b8'};"
                     onclick="${clickHandler}"
                     title="${art.name} (${art.displayValue})">
                    <img src="${art.asset}" alt="${art.name}" class="inv-item-img">
                    <span class="inv-item-stars">${art.stars}★</span>
                    ${levelBadge}
                    ${newDot}
                    <span class="inv-item-stat-badge">${art.displayValue}</span>
                    ${badge}
                </div>
            `;
        }).join('');

        // Preenche slots restantes vazios até 24
        const emptyCount = Math.max(0, maxSlots - artifacts.length);
        const emptySlotsHtml = Array.from({length: emptyCount}, () => `
            <div class="inv-item-slot empty">${emptyIcon}</div>
        `).join('');

        grid.innerHTML = itemsHtml + emptySlotsHtml;
    }

    openArtifactDetailModal(artifactId) {
        if (this._isTransmutingMode) {
            // Se estiver em modo de transmutação, não reabre detalhe comum, direciona para material toggle
            this.toggleTransmuteMaterial(artifactId);
            return;
        }

        const engine = (window.app && window.app.engine) ? window.app.engine : null;
        const art = engine ? engine.getArtifactById(artifactId) : null;
        if (!art) return;

        // Marca o artefato como visualizado e remove a bolinha vermelha dele e do botão do header se for o último
        if (engine && typeof engine.markArtifactAsSeen === 'function') {
            const wasMarked = engine.markArtifactAsSeen(artifactId);
            if (wasMarked) {
                // Remove o dot imediatamente do slot visual na grade
                const activeSlot = document.querySelector(`.inv-item-slot[data-artifact-id="${artifactId}"]`);
                if (activeSlot) {
                    const dot = activeSlot.querySelector('.inv-artifact-new-dot');
                    if (dot) dot.remove();
                }
                this.updateNavigationBadges();
            }
        }

        this._selectedArtifactId = artifactId;

        const previewAvId = this._inventoryPreviewId || (engine ? (engine.state.currentAvatarId || '02') : '02');
        const equippedIn = engine ? engine.isArtifactEquipped(art.id) : null;
        const isEquippedInPreview = equippedIn === previewAvId;

        const starsHtml = (typeof ArtifactsManager !== 'undefined')
            ? ArtifactsManager.renderStarsHtml(art.stars, 6)
            : `${art.stars}★`;

        const maxLvl = (typeof ArtifactsManager !== 'undefined') ? ArtifactsManager.getMaxLevel(art.stars) : 16;
        const currentLvl = art.level || 0;
        const isMaxLevel = currentLvl >= maxLvl;

        const contentHtml = `
            <div class="artifact-detail-header" style="--rarity-color:${art.rarityColor};">
                <span class="artifact-detail-type">${art.slotLabel.toUpperCase()} • ${art.rarityLabel.toUpperCase()}</span>
                <h3 class="artifact-detail-name">${art.name}</h3>
                <div class="artifact-detail-stars">${starsHtml}</div>
                <div class="artifact-detail-level-tag ${isMaxLevel ? 'max-level' : ''}">
                    NÍVEL +${currentLvl} / +${maxLvl} ${isMaxLevel ? '(POTENCIAL MÁXIMO)' : ''}
                </div>
            </div>

            <div class="artifact-detail-preview-wrap" style="--rarity-color:${art.rarityColor};">
                <img src="${art.asset}" alt="${art.name}" class="artifact-detail-img">
            </div>

            <div class="artifact-detail-stat-box">
                <span class="artifact-detail-stat-val">${art.displayValue}</span>
                <span class="artifact-detail-stat-name">Bônus Primário (${art.statName})</span>
            </div>

            ${Array.isArray(art.substats) && art.substats.length > 0 ? `
                <div class="artifact-substats-box">
                    <div class="artifact-substats-header">Substatus Secundários</div>
                    <div class="artifact-substats-list">
                        ${art.substats.map(sub => `
                            <div class="artifact-substat-row">
                                <span class="artifact-substat-bullet">•</span>
                                <span class="artifact-substat-name">${sub.statName}</span>
                                <span class="artifact-substat-val">${sub.displayValue}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <p class="artifact-detail-lore">${art.lore || ''}</p>

            <div class="artifact-detail-actions">
                ${!isMaxLevel ? `
                    <button class="glow-button primary btn-transmute-action" onclick="app.startArtifactTransmute('${art.id}')">
                        <span class="btn-text" style="display:inline-flex;align-items:center;gap:0.4rem;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            Transmutar / Aprimorar
                        </span>
                        <span class="btn-glow"></span>
                    </button>
                ` : ''}

                ${isEquippedInPreview ? `
                    <button class="glow-button" onclick="app.handleArtifactUnequip('${previewAvId}','${art.type}')">
                        <span class="btn-text">Desequipar</span>
                    </button>
                ` : `
                    <button class="glow-button primary pulse-action" onclick="app.handleArtifactEquip('${previewAvId}','${art.id}')">
                        <span class="btn-text">Equipar no Avatar</span>
                        <span class="btn-glow"></span>
                    </button>
                `}

                <button class="glow-button danger" onclick="app.handleArtifactDestroy('${art.id}')" ${equippedIn ? 'disabled title="Desequipe antes de destruir"' : ''}>
                    <span class="btn-text" style="display:inline-flex;align-items:center;gap:0.35rem;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        Destruir (+Espaço)
                    </span>
                </button>
            </div>
        `;

        // 1. Abre no painel lateral ao lado da grid de inventário (se presente na tela de inventário)
        const sidePanel = document.getElementById('inv-artifact-detail-panel');
        const sideContent = document.getElementById('inv-artifact-detail-content');
        if (sidePanel && sideContent) {
            sideContent.innerHTML = contentHtml;
            sidePanel.classList.add('open');

            // Destaca visualmente o slot selecionado na grid
            document.querySelectorAll('.inv-item-slot').forEach(slot => slot.classList.remove('selected-artifact'));
            const activeSlot = document.querySelector(`.inv-item-slot[data-artifact-id="${artifactId}"]`);
            if (activeSlot) activeSlot.classList.add('selected-artifact');
        }

        // 2. Popula também o modal como fallback
        const modal = document.getElementById('modal-artifact-detail');
        const body = document.getElementById('artifact-detail-body');
        if (body) {
            body.innerHTML = contentHtml;
        }

        // Se o painel lateral não existir, abre o modal tradicional
        if (!sidePanel && modal) {
            modal.classList.remove('hidden');
        }
    }

    // ─── CÂMARA DE TRANSMUTAÇÃO DE ARTEFATOS ───
    openTransmuteMode(targetId) {
        const engine = (window.app && window.app.engine) ? window.app.engine : null;
        const target = engine ? engine.getArtifactById(targetId) : null;
        if (!target) return;

        this._isTransmutingMode = true;
        this._transmuteTargetId = targetId;
        this._transmuteMaterialIds = [];

        // Atualiza grid para refletir estado de transmutação
        this.renderInventoryGrid(this._currentInventoryTab || target.type);
        this.renderTransmutePanel();
    }

    closeTransmuteMode() {
        this._isTransmutingMode = false;
        const targetId = this._transmuteTargetId;
        this._transmuteTargetId = null;
        this._transmuteMaterialIds = [];

        // Restaura grid e reabre o detalhe se o artefato ainda existir
        this.renderInventoryGrid(this._currentInventoryTab || 'crown');
        if (targetId) {
            this.openArtifactDetailModal(targetId);
        } else {
            this.closeArtifactDetailModal();
        }
    }

    toggleTransmuteMaterial(materialId) {
        if (!this._isTransmutingMode) return;
        if (materialId === this._transmuteTargetId) {
            if (this.showToast) this.showToast('O artefato principal não pode ser usado como material de si mesmo.', 'warning');
            return;
        }

        const engine = (window.app && window.app.engine) ? window.app.engine : null;
        if (engine && engine.isArtifactEquipped(materialId)) {
            if (this.showToast) this.showToast('Artefatos equipados em avatares não podem ser consumidos.', 'warning');
            return;
        }

        if (!this._transmuteMaterialIds) this._transmuteMaterialIds = [];
        const idx = this._transmuteMaterialIds.indexOf(materialId);
        if (idx !== -1) {
            this._transmuteMaterialIds.splice(idx, 1);
        } else {
            this._transmuteMaterialIds.push(materialId);
        }

        this.renderInventoryGrid(this._currentInventoryTab || 'crown');
        this.renderTransmutePanel();
    }

    renderTransmutePanel() {
        const sidePanel = document.getElementById('inv-artifact-detail-panel');
        const sideContent = document.getElementById('inv-artifact-detail-content');
        if (!sidePanel || !sideContent) return;

        const engine = (window.app && window.app.engine) ? window.app.engine : null;
        const target = engine ? engine.getArtifactById(this._transmuteTargetId) : null;
        if (!target) {
            this.closeTransmuteMode();
            return;
        }

        const selectedMaterials = (this._transmuteMaterialIds || []).map(id => engine.getArtifactById(id)).filter(Boolean);
        const preview = (typeof ArtifactsManager !== 'undefined')
            ? ArtifactsManager.previewTransmutation(target, selectedMaterials)
            : null;

        const starsHtml = (typeof ArtifactsManager !== 'undefined')
            ? ArtifactsManager.renderStarsHtml(target.stars, 6)
            : `${target.stars}★`;

        const userTokens = engine ? engine.getTokens() : 0;
        const hasEnoughTokens = userTokens >= (preview ? preview.totalTokenCost : 0);

        const currentLvl = target.level || 0;
        const nextLvl = preview ? preview.newLevel : currentLvl;
        const xpReq = preview ? preview.xpRequired : 150;
        const curXp = preview ? preview.newXp : (target.xp || 0);
        const xpPct = preview && preview.isMaxLevel ? 100 : Math.min(100, Math.round((curXp / (xpReq || 1)) * 100));

        sideContent.innerHTML = `
            <div class="transmute-panel-header" style="--rarity-color:${target.rarityColor};">
                <span class="transmute-tag">CÂMARA DE TRANSMUTAÇÃO</span>
                <h3 class="transmute-title">${target.name}</h3>
                <div class="artifact-detail-stars">${starsHtml}</div>
            </div>

            <div class="transmute-pedestal">
                <img src="${target.asset}" alt="${target.name}" class="transmute-target-img">
                <div class="transmute-level-evolution">
                    <span class="lvl-badge current">+${currentLvl}</span>
                    <span class="lvl-arrow">➔</span>
                    <span class="lvl-badge next ${preview && preview.levelsGained > 0 ? 'gained' : ''}">+${nextLvl}</span>
                </div>
            </div>

            <!-- BARRA DE XP DO ARTEFATO -->
            <div class="transmute-xp-container">
                <div class="transmute-xp-header">
                    <span>PROGRESSO DE TRANSMUTAÇÃO</span>
                    <span>${preview && preview.isMaxLevel ? 'MÁXIMO' : `${curXp} / ${xpReq} XP`}</span>
                </div>
                <div class="transmute-xp-track">
                    <div class="transmute-xp-fill" style="width: ${xpPct}%;"></div>
                </div>
            </div>

            <!-- COMPARAÇÃO DE STATS -->
            <div class="transmute-stat-preview">
                <div class="stat-row">
                    <span class="stat-label">Bônus Primário:</span>
                    <span class="stat-old">${preview ? preview.currentDisplay : target.displayValue}</span>
                </div>
                ${preview && preview.levelsGained > 0 ? `
                    <div class="stat-row highlight">
                        <span class="stat-label">Novo Primário:</span>
                        <span class="stat-new">${preview.newDisplay}</span>
                    </div>
                ` : `
                    <div class="stat-row dim">
                        <span class="stat-label">Novo Primário:</span>
                        <span>Selecione materiais na grade</span>
                    </div>
                `}
                ${preview && Array.isArray(preview.previewSubstats) && preview.previewSubstats.length > 0 ? `
                    <div class="transmute-substats-preview-divider">Substatus em Evolução</div>
                    ${preview.previewSubstats.map(sub => `
                        <div class="stat-row ${preview.levelsGained > 0 ? 'sub-highlight' : ''}">
                            <span class="stat-label">${sub.statName}:</span>
                            <span class="${preview.levelsGained > 0 ? 'stat-new' : 'stat-old'}">
                                ${preview.levelsGained > 0 ? `${sub.newDisplay} (+${sub.diff})` : sub.currentDisplay}
                            </span>
                        </div>
                    `).join('')}
                ` : ''}
            </div>

            <!-- MATERIAIS SELECIONADOS & CUSTO -->
            <div class="transmute-summary-box">
                <div class="summary-line">
                    <span>Materiais Selecionados:</span>
                    <strong>${selectedMaterials.length} artefatos</strong>
                </div>
                <div class="summary-line">
                    <span>XP Fornecido:</span>
                    <strong style="color:var(--cyan);">+${preview ? preview.totalXpGained : 0} XP</strong>
                </div>
                <div class="summary-line">
                    <span>Custo da Forja:</span>
                    <strong style="color:${hasEnoughTokens ? 'var(--gold-bright)' : '#f87171'};">
                        ${preview ? preview.totalTokenCost : 0} / ${userTokens} Tokens
                    </strong>
                </div>
            </div>

            <p class="transmute-hint">
                Clique nos artefatos da grade do inventário para adicioná-los como catalisadores de fusão.
            </p>

            <div class="artifact-detail-actions">
                <button class="glow-button primary btn-transmute-confirm" onclick="app.executeArtifactTransmute()"
                        ${selectedMaterials.length === 0 || !hasEnoughTokens ? 'disabled' : ''}>
                    <span class="btn-text">Confirmar Transmutação</span>
                    <span class="btn-glow"></span>
                </button>
                <button class="glow-button" onclick="app.cancelArtifactTransmute()">
                    <span class="btn-text">Cancelar</span>
                </button>
            </div>
        `;

        sidePanel.classList.add('open');
    }

    closeArtifactDetailModal() {
        if (this._isTransmutingMode) {
            this.closeTransmuteMode();
            return;
        }

        // Fecha o painel lateral ao lado da grid
        const sidePanel = document.getElementById('inv-artifact-detail-panel');
        if (sidePanel) {
            sidePanel.classList.remove('open');
            this._selectedArtifactId = null;
            document.querySelectorAll('.inv-item-slot').forEach(slot => slot.classList.remove('selected-artifact'));
        }

        // Fecha também o modal caso esteja aberto
        const modal = document.getElementById('modal-artifact-detail');
        if (modal) modal.classList.add('hidden');
    }

    // ─── NOTIFICAÇÕES VISUAIS DE ALERTA (RED DOTS) ───
    async updateNavigationBadges() {
        const engine = (window.app && window.app.engine) ? window.app.engine : this.engine;
        if (!engine) return;

        // 1. Botão de Inventário (#btn-inventory): bolinha vermelha se houver artefato não visualizado
        const hasUnseenArt = typeof engine.hasUnseenArtifacts === 'function' && engine.hasUnseenArtifacts();
        this._setNavDot(document.getElementById('btn-inventory'), hasUnseenArt, 'inv');

        // 2. Botão do Abismo (.nav-btn-abyss): bolinha vermelha se houver novo andar desbloqueado e ainda não visto
        const hasUnseenAbyss = typeof engine.hasUnseenAbyssFloors === 'function' && engine.hasUnseenAbyssFloors();
        this._setNavDot(document.querySelector('.nav-btn-abyss'), hasUnseenAbyss, 'abyss');

        // 3. Botão de PVP (.nav-btn-pvp): se houver desafios/convites pendentes de outros jogadores
        if (typeof rankedManager !== 'undefined' && typeof authManager !== 'undefined' && authManager.currentUser) {
            try {
                const pendingPvP = await rankedManager.getPendingChallenges();
                const hasPendingPvP = Array.isArray(pendingPvP) && pendingPvP.length > 0;
                this._setNavDot(document.querySelector('.nav-btn-pvp'), hasPendingPvP, 'pvp');
            } catch (e) {
                // Silencioso se offline/erro
            }
        }

        // 4. Botão de Party (.nav-btn-party): se houver convites pendentes de esquadrão
        if (typeof partyManager !== 'undefined' && typeof authManager !== 'undefined' && authManager.currentUser) {
            try {
                const pendingParty = await partyManager.getPendingInvitesForUser();
                const hasPendingParty = Array.isArray(pendingParty) && pendingParty.length > 0;
                this._setNavDot(document.querySelector('.nav-btn-party'), hasPendingParty, 'party');
            } catch (e) {
                // Silencioso se offline/erro
            }
        }
    }

    _setNavDot(targetEl, shouldShow, dotClass = 'default') {
        if (!targetEl) return;
        let dot = targetEl.querySelector(`.nav-notify-dot.dot-${dotClass}`);
        if (shouldShow) {
            if (!dot) {
                dot = document.createElement('span');
                dot.className = `nav-notify-dot dot-${dotClass}`;
                dot.setAttribute('title', 'Notificação pendente');
                targetEl.appendChild(dot);
            }
        } else if (dot) {
            dot.remove();
        }
    }
    
    }

    if (typeof UIRenderer !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_Extension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(UIRenderer.prototype, descriptors);
        if (_Extension.setupUniversalCard3D) {
            UIRenderer.setupUniversalCard3D = _Extension.setupUniversalCard3D;
        }
    }
})();
