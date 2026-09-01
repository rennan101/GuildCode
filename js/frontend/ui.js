/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — UI Renderer
   Handles all screen rendering, terminal, editor, animations.
   ═══════════════════════════════════════════════════════════════ */

class UIRenderer {
    constructor(engine) {
        this.engine = engine;
        this.interpreter = new CInterpreter();
        this.missionValidator = typeof MissionValidator !== 'undefined' ? new MissionValidator(this.interpreter) : null;
        this.currentChapterData = null;
        this.currentActivityData = null;
        this.hintLevel = 0;
        this.prologueTimeout = null;
    }

    // ─── SCREEN MANAGEMENT ───
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
            s.classList.remove('auth-modal-mode');
        });

        const screen = document.getElementById('screen-' + screenId);
        if (screen) {
            screen.classList.add('active');
            this.engine.setScreen(screenId);
        }

        const chatWidget = document.getElementById('mini-chat-widget');
        if (chatWidget) {
            if (screenId === 'dashboard') {
                chatWidget.style.display = 'block';
                if (typeof chatUI !== 'undefined') {
                    chatUI.refreshAccess();
                }
            } else {
                chatWidget.style.display = 'none';
            }
        }
    }

    // ─── PARTICLES ───
    initParticles() {
        const container = document.getElementById('particles-container');
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (8 + Math.random() * 15) + 's';
            p.style.animationDelay = Math.random() * 10 + 's';
            p.style.width = (1 + Math.random() * 2) + 'px';
            p.style.height = p.style.width;
            if (Math.random() > 0.7) {
                p.style.background = '#a78bfa';
            }
            container.appendChild(p);
        }
    }

    // ─── NAME ENTRY ───
    setupNameEntry(onConfirm) {
        const input = document.getElementById('input-name');
        const btn = document.getElementById('btn-confirm-name');
        if (!input || !btn) return;

        const checkValidity = () => {
            const val = (input.value || '').trim();
            btn.disabled = val.length === 0;
        };

        input.addEventListener('input', checkValidity);
        input.addEventListener('change', checkValidity);
        input.addEventListener('keyup', checkValidity);

        const handleConfirm = () => {
            const val = (input.value || '').trim();
            if (val.length > 0) {
                if (window.soundFX) window.soundFX.playClick();
                onConfirm(val);
            }
        };

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleConfirm();
            }
        });

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleConfirm();
        });

        setTimeout(() => input.focus(), 300);
    }

    // ─── PROLOGUE ───
    playPrologue(playerName, onEnd) {
        const textContainer = document.getElementById('prologue-text');
        const nextBtn = document.getElementById('btn-prologue-next');
        textContainer.innerHTML = '';
        nextBtn.classList.add('hidden');

        const messages = [
            { type: 'system', text: '[ SISTEMA INICIALIZADO ]' },
            { type: 'delay', ms: 600 },
            { type: 'system', text: '[ Usuário detectado ]' },
            { type: 'delay', ms: 400 },
            { type: 'system', text: '[ Origem: Mundo Exterior ]' },
            { type: 'delay', ms: 400 },
            { type: 'system', text: '[ Habilidade identificada: PROGRAMADOR ]' },
            { type: 'delay', ms: 800 },
            { type: 'narrative', text: 'Você abre os olhos. Uma luz estranha invade sua visão.' },
            { type: 'delay', ms: 1000 },
            { type: 'narrative', text: 'O chão é frio. O teto é alto. O ar cheira a velho pergaminho.' },
            { type: 'delay', ms: 600 },
            { type: 'sys', text: `[ SISTEMA ] Bem-vindo, ${playerName}.` },
            { type: 'delay', ms: 800 },
            { type: 'narrative', text: 'Uma voz grave ecoa pela sala.' },
            { type: 'delay', ms: 400 },
            { type: 'character', name: 'ARKAN', role: 'MESTRE DA GUILDA', cssClass: 'arkan',
              text: 'Então é verdade. Você é do outro mundo.' },
            { type: 'delay', ms: 600 },
            { type: 'character', name: 'ARKAN', role: 'MESTRE DA GUILDA', cssClass: 'arkan',
              text: 'O sistema da Guilda está em colapso. Nossos administradores foram incapacitados. Tudo o que construímos está se perdendo.' },
            { type: 'delay', ms: 600 },
            { type: 'character', name: 'ARKAN', role: 'MESTRE DA GUILDA', cssClass: 'arkan',
              text: 'Mas dizem que você sabe programar. Se isso for verdade, então prove.' },
            { type: 'delay', ms: 400 },
            { type: 'quest', text: 'MISSÃO: Reconstruir o Sistema da Guilda' },
            { type: 'delay', ms: 400 },
            { type: 'narrative', text: 'Para cada conceito de programação que você dominar, um novo sistema da Guilda será restaurado.' },
            { type: 'delay', ms: 400 },
            { type: 'narrative', text: 'Prepare-se. Sua jornada como Administrador começa agora.' },
            { type: 'delay', ms: 400 },
            { type: 'sys', text: `[ SISTEMA ] Iniciando interface...` }
        ];

        let i = 0;
        const showNext = () => {
            if (i >= messages.length) {
                nextBtn.classList.remove('hidden');
                nextBtn.onclick = onEnd;
                return;
            }
            const msg = messages[i];
            i++;

            if (msg.type === 'delay') {
                setTimeout(showNext, msg.ms);
                return;
            }

            const el = document.createElement('div');
            el.style.marginBottom = '0.8rem';
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.3s ease';

            if (msg.type === 'system' || msg.type === 'sys') {
                el.className = 'sys-msg';
                el.style.fontFamily = 'var(--font-code)';
                el.style.fontSize = '0.95rem';
                el.style.color = msg.type === 'sys' ? '#fbbf24' : '#38bdf8';
                el.textContent = msg.text;
            } else if (msg.type === 'narrative') {
                el.className = 'narrative';
                el.style.fontSize = '1.05rem';
                el.style.lineHeight = '1.6';
                el.textContent = msg.text;
            } else if (msg.type === 'character') {
                el.innerHTML = `<span style="color: var(--cyan); font-family: var(--font-display); font-size: 0.9rem; letter-spacing: 0.1em; font-weight:600;">[ ${msg.name} — ${msg.role} ]</span><br><span style="color: var(--text-primary); font-size: 1.05rem; line-height: 1.6;">${msg.text}</span>`;
            } else if (msg.type === 'quest') {
                el.className = 'quest-text';
                el.style.fontSize = '1.1rem';
                el.style.fontWeight = '700';
                el.textContent = msg.text;
            }

            textContainer.appendChild(el);
            setTimeout(() => el.style.opacity = '1', 50);

            textContainer.scrollTop = textContainer.scrollHeight;
            setTimeout(showNext, msg.type === 'delay' ? 0 : 350);
        };
        showNext();
    }

    // ─── DASHBOARD (MAPA DA ASCENSÃO) ───
    renderDashboard() {
        const state = this.engine.state;

        const displayName = (typeof authManager !== 'undefined' && authManager.getDisplayName()) || state.playerName;
        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        const roleLabel = isMaster ? 'MESTRE' : 'APRENDIZ';
        const photoURL = (typeof authManager !== 'undefined' && authManager.getPhotoURL()) || '';
        
        const nameEl = document.getElementById('player-name-display');
        if (nameEl) nameEl.textContent = displayName;
        
        const lvlEl = document.getElementById('player-level');
        if (lvlEl) lvlEl.innerHTML = `${roleLabel} &bull; LV. ${String(state.level).padStart(2, '0')}`;
        
        // Configura avatar do usuário no Header
        const avatarImg = document.getElementById('player-avatar-img');
        if (avatarImg) {
            const finalAvatar = photoURL || 'assets/avatars/avatar_02.png';
            avatarImg.src = finalAvatar;
            avatarImg.classList.remove('hidden');
        }

        const xpText = document.getElementById('xp-text');
        if (xpText) xpText.textContent = `${state.xp} / ${this.engine.getXPToNextLevel()} XP`;
        
        const xpFill = document.getElementById('xp-fill');
        if (xpFill) xpFill.style.width = this.engine.getXPPercent() + '%';

        // Atualiza Tokens no Header
        const tokensEl = document.getElementById('player-tokens-count');
        if (tokensEl) tokensEl.textContent = this.engine.getTokens();

        // Atualiza Streak no Header
        const streak = this.engine.getStreak();
        const streakEl = document.getElementById('streak-count-display');
        if (streakEl) streakEl.textContent = streak.current || 0;

        // Show admin button only for teachers
        const adminBtn = document.getElementById('btn-admin');
        if (adminBtn) {
            adminBtn.style.display = isMaster ? '' : 'none';
        }

        this.initInteractiveMap();
        this.renderMapConnections();
        this.renderMapSpotlightsAndNodes();
        this.updateMapPanTransform();
        
        // Re-calibra a escala precisa após o layout flex do browser estabilizar
        requestAnimationFrame(() => {
            this.updateMapPanTransform();
        });
    }

    initInteractiveMap() {
        if (this.mapInitialized) {
            this.updateMapPanTransform();
            return;
        }
        this.mapInitialized = true;

        const initialScale = this.calculateMapScale();
        this.mapState = {
            width: 2400,
            height: 1400,
            x: -200,
            y: -50,
            scale: initialScale,
            isDragging: false,
            startX: 0,
            startY: 0,
            selectedChapterId: null
        };

        const viewport = document.getElementById('map-viewport');
        if (!viewport) return;

        viewport.addEventListener('mousedown', (e) => {
            if (e.target.closest('.map-node')) return;
            this.mapState.isDragging = true;
            this.mapState.startX = e.clientX - this.mapState.x;
            this.mapState.startY = e.clientY - this.mapState.y;
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.mapState || !this.mapState.isDragging) return;
            this.mapState.x = e.clientX - this.mapState.startX;
            this.mapState.y = e.clientY - this.mapState.startY;
            this.updateMapPanTransform();
        });

        window.addEventListener('mouseup', () => {
            if (this.mapState) this.mapState.isDragging = false;
        });

        window.addEventListener('resize', () => {
            this.updateMapPanTransform();
        });
    }

    calculateMapScale() {
        const viewport = document.getElementById('map-viewport');
        if (!viewport) return 0.65;
        const vw = viewport.clientWidth;
        const vh = viewport.clientHeight;
        return Math.max(vw / 2400, vh / 1400, 0.62);
    }

    clampMapCoordinates(x, y, scale) {
        const viewport = document.getElementById('map-viewport');
        if (!viewport) return { x, y };
        const vw = viewport.clientWidth;
        const vh = viewport.clientHeight;
        
        const scaledWidth = 2400 * scale;
        const scaledHeight = 1400 * scale;

        let minX = vw - scaledWidth;
        let maxX = 0;
        if (scaledWidth < vw) {
            x = (vw - scaledWidth) / 2;
        } else {
            x = Math.min(maxX, Math.max(minX, x));
        }

        let minY = vh - scaledHeight;
        let maxY = 0;
        if (scaledHeight < vh) {
            y = (vh - scaledHeight) / 2;
        } else {
            y = Math.min(maxY, Math.max(minY, y));
        }

        return { x, y };
    }

    updateMapPanTransform() {
        if (!this.mapState) return;
        const panContainer = document.getElementById('map-pan-container');
        if (!panContainer) return;

        this.mapState.scale = this.calculateMapScale();
        const clamped = this.clampMapCoordinates(this.mapState.x, this.mapState.y, this.mapState.scale);
        this.mapState.x = clamped.x;
        this.mapState.y = clamped.y;

        panContainer.style.transform = `translate(${this.mapState.x}px, ${this.mapState.y}px) scale(${this.mapState.scale})`;
    }

    centerOnMapNode(chap) {
        const viewport = document.getElementById('map-viewport');
        if (!chap || !viewport || !this.mapState) return;
        const vw = viewport.clientWidth;
        const vh = viewport.clientHeight;
        this.mapState.x = vw / 2 - chap.x * this.mapState.scale;
        this.mapState.y = vh / 2 - chap.y * this.mapState.scale;
        this.updateMapPanTransform();
    }

    getMapChapterData() {
        // Coordenadas e dados ricos mapeados para os 16 Capítulos Oficiais
        const chapterPositions = [
            { id: 0, x: 410, y: 390, img: "assets/map/ch00_awakening_sanctuary_1787969712672.jpg", char: "Arkan Velor", xp: 70, gp: 10, item: "Grimório I/O" },
            { id: 1, x: 1120, y: 520, img: "assets/map/ch01_crystal_spire_1787969758611.jpg", char: "Lyra Nex", xp: 80, gp: 15, item: "Frasco de Mana" },
            { id: 2, x: 820, y: 510, img: "assets/map/ch02_mana_tree_1787969808602.jpg", char: "Arkan Velor", xp: 150, gp: 20, item: "Selo do Fluxo" },
            { id: 3, x: 1390, y: 520, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Elion Raven", xp: 110, gp: 25, item: "Pena do Escriba" },
            { id: 4, x: 290, y: 780, img: "assets/map/chapter_dungeon_card_1787956703908.jpg", char: "Lyra Nex", xp: 120, gp: 30, item: "Bolsa Dimensional" },
            { id: 5, x: 1290, y: 1050, img: "assets/map/chapter_dungeon_card_1787956703908.jpg", char: "Mira Solenn", xp: 130, gp: 35, item: "Amuleto do Infinito" },
            { id: 6, x: 2060, y: 1200, img: "assets/map/chapter_dungeon_card_1787956703908.jpg", char: "Lyra Nex", xp: 140, gp: 35, item: "Lente Arcana" },
            { id: 7, x: 650, y: 950, img: "assets/map/ch07_royal_armory_1787969863538.jpg", char: "Arkan Velor", xp: 150, gp: 40, item: "Espada Rúnica" },
            { id: 8, x: 1750, y: 530, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Lyra Nex", xp: 160, gp: 45, item: "Tomo Celestial" },
            { id: 9, x: 2130, y: 360, img: "assets/map/ch09_dimensional_portal_1787969922534.jpg", char: "Arkan Velor", xp: 170, gp: 50, item: "Bússola Dimensional" },
            { id: 10, x: 1960, y: 680, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Elion Raven", xp: 180, gp: 55, item: "Pena Encantada" },
            { id: 11, x: 1580, y: 920, img: "assets/map/ch01_crystal_spire_1787969758611.jpg", char: "Orin Vale", xp: 190, gp: 60, item: "Orbe de Teletransporte" },
            { id: 12, x: 950, y: 920, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Elion Raven", xp: 200, gp: 65, item: "Contrato de Herói" },
            { id: 13, x: 820, y: 1180, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Elion Raven", xp: 210, gp: 70, item: "Grande Tomo da Guilda" },
            { id: 14, x: 1680, y: 1220, img: "assets/map/ch14_arcane_colosseum_1787969986816.jpg", char: "Kael Draven", xp: 230, gp: 80, item: "Troféu do Campeão" },
            { id: 15, x: 2200, y: 920, img: "assets/map/ch15_eternal_book_1787970055553.jpg", char: "Arkan Velor", xp: 250, gp: 100, item: "Selo do Mestre Supremo" }
        ];

        return CHAPTERS.map(ch => {
            const extra = chapterPositions.find(p => p.id === ch.id) || { x: 500, y: 500, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Arkan Velor", xp: 100, gp: 20, item: "Relíquia da Guilda" };
            const unlocked = this.engine.isChapterUnlocked(ch.id);
            const completed = this.engine.isChapterCompleted(ch.id);
            
            const totalActs = ch.activities ? ch.activities.length : 3;
            let doneActs = 0;
            if (this.engine.state.chapters && this.engine.state.chapters[ch.id]) {
                for (let a = 1; a <= totalActs; a++) {
                    if (this.engine.state.chapters[ch.id]['act' + a]) doneActs++;
                }
            }
            if (completed) doneActs = totalActs;

            return {
                id: ch.id,
                numStr: `CAPÍTULO ${String(ch.id).padStart(2, '0')}`,
                title: ch.title,
                theme: ch.theme,
                status: completed ? 'completed' : unlocked ? 'unlocked' : 'locked',
                x: extra.x,
                y: extra.y,
                image: extra.img,
                character: extra.char,
                narrative: (ch.story && ch.story[0] && ch.story[0].text) || `A Guilda necessita que você domine ${ch.theme} para restaurar o sistema.`,
                summary: (ch.concept && ch.concept.title) || `Complete os desafios e compile o código sagrado.`,
                systems: (ch.concept && ch.concept.points) || [`Fundamentos e regras de ${ch.theme}`],
                missionsCount: totalActs,
                missionsDone: doneActs,
                rewards: { xp: extra.xp, gp: extra.gp, item: extra.item }
            };
        });
    }

    renderMapConnections() {
        const svgLayer = document.getElementById('map-svg-layer');
        if (!svgLayer) return;
        svgLayer.innerHTML = '';

        const connections = [
            { from: 0, to: 1, active: true },
            { from: 0, to: 4, active: true },
            { from: 1, to: 2, active: true },
            { from: 1, to: 3, active: true },
            { from: 2, to: 5, active: true },
            { from: 4, to: 7, active: false },
            { from: 7, to: 12, active: false },
            { from: 12, to: 13, active: false },
            { from: 5, to: 11, active: false },
            { from: 11, to: 14, active: false },
            { from: 5, to: 6, active: false },
            { from: 3, to: 8, active: false },
            { from: 8, to: 9, active: false },
            { from: 8, to: 10, active: false },
            { from: 10, to: 15, active: false },
            { from: 6, to: 15, active: false }
        ];

        const allChapters = this.getMapChapterData();

        connections.forEach(conn => {
            const nodeA = allChapters.find(c => c.id === conn.from);
            const nodeB = allChapters.find(c => c.id === conn.to);
            if (!nodeA || !nodeB) return;

            const midX = (nodeA.x + nodeB.x) / 2;
            const midY = (nodeA.y + nodeB.y) / 2 + (nodeA.x < nodeB.x ? 30 : -30);

            const isPathActive = nodeA.status !== 'locked' && nodeB.status !== 'locked';

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${nodeA.x} ${nodeA.y} Q ${midX} ${midY}, ${nodeB.x} ${nodeB.y}`);
            path.setAttribute('class', `path-line ${isPathActive ? 'active-path' : ''}`);
            svgLayer.appendChild(path);
        });
    }

    async fetchGuildMembersForMap() {
        if (this._fetchingGuildMembers) return;
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) return;
        
        this._fetchingGuildMembers = true;
        try {
            const members = await authManager.getGuildMembers();
            this.cachedGuildMembers = members || [];
            this.renderMapSpotlightsAndNodes();
        } catch (e) {
            console.warn('[UI] fetchGuildMembersForMap notice:', e);
        } finally {
            this._fetchingGuildMembers = false;
        }
    }

    renderMapSpotlightsAndNodes() {
        const spotlightsContainer = document.getElementById('spotlights-container');
        const nodesContainer = document.getElementById('nodes-container');
        if (!spotlightsContainer || !nodesContainer) return;

        // Se ainda não buscou os membros da guilda, dispara a busca
        if (!this.cachedGuildMembers && !this._fetchingGuildMembers) {
            this.fetchGuildMembersForMap();
        }

        spotlightsContainer.innerHTML = '';
        nodesContainer.innerHTML = '';

        const allChapters = this.getMapChapterData();
        const selectedId = this.mapState ? this.mapState.selectedChapterId : null;

        // Mapeia membros por capítulo atual (maior capítulo desbloqueado)
        const membersByChapter = {};
        const currentUserId = (typeof authManager !== 'undefined' && authManager.getCurrentUser()?.uid) || '';

        if (this.cachedGuildMembers && Array.isArray(this.cachedGuildMembers)) {
            this.cachedGuildMembers.forEach(mem => {
                const prog = mem.gameProgress;
                let lastChapterId = 0;

                if (prog && Array.isArray(prog.chapterUnlocks) && prog.chapterUnlocks.length > 0) {
                    lastChapterId = Math.max(...prog.chapterUnlocks);
                } else if (prog && prog.chapters && typeof prog.chapters === 'object') {
                    const doneIds = Object.keys(prog.chapters).map(Number).filter(n => !isNaN(n));
                    if (doneIds.length > 0) {
                        lastChapterId = Math.max(...doneIds);
                    }
                }

                // Limita ao range de capítulos existentes (0 a 15)
                lastChapterId = Math.max(0, Math.min(15, lastChapterId));

                if (!membersByChapter[lastChapterId]) {
                    membersByChapter[lastChapterId] = [];
                }
                membersByChapter[lastChapterId].push(mem);
            });
        }

        allChapters.forEach(chap => {
            const spot = document.createElement('div');
            spot.className = 'scenery-spotlight';
            spot.style.left = `${chap.x}px`;
            spot.style.top = `${chap.y - 70}px`;
            spot.style.width = '240px';
            spot.style.height = '240px';
            spotlightsContainer.appendChild(spot);

            const hasPending = chap.status === 'unlocked' && chap.missionsDone < chap.missionsCount;

            let symbolHTML = `<span class="node-symbol-inner symbol-new">!</span>`;
            if (chap.status === 'completed') {
                symbolHTML = `<div class="node-symbol-inner symbol-check"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>`;
            } else if (chap.status === 'locked') {
                symbolHTML = `<div class="node-symbol-inner symbol-lock"><svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></div>`;
            }

            // Renderiza avatares dos membros presentes neste capítulo
            const presentMembers = membersByChapter[chap.id] || [];
            let explorersHTML = '';
            if (presentMembers.length > 0) {
                const maxVisible = 3;
                const visibleMembers = presentMembers.slice(0, maxVisible);
                const extraCount = presentMembers.length - maxVisible;

                explorersHTML = `
                    <div class="node-guild-explorers" title="${presentMembers.length} membro(s) da guilda explorando este capítulo">
                        ${visibleMembers.map(m => {
                            const isMe = m.uid === currentUserId;
                            const avatarSrc = m.photoURL || 'assets/avatars/avatar_02.png';
                            const memberName = m.displayName || 'Aprendiz';
                            const memberRole = m.role === 'teacher' ? 'Mestre' : 'Aprendiz';
                            const memberLvl = (m.gameProgress && m.gameProgress.level) ? `Lv.${m.gameProgress.level}` : '';
                            return `
                                <div class="map-explorer-pin ${isMe ? 'is-self' : ''}" 
                                     onclick="event.stopPropagation(); app.openPlayerProfile('${m.uid}')" 
                                     title="${memberName} (${memberRole} ${memberLvl})">
                                    <img src="${avatarSrc}" alt="${memberName}" />
                                    ${isMe ? '<span class="self-marker-dot"></span>' : ''}
                                </div>
                            `;
                        }).join('')}
                        ${extraCount > 0 ? `
                            <div class="map-explorer-pin extra-counter" title="+${extraCount} outros colegas da guilda">
                                +${extraCount}
                            </div>
                        ` : ''}
                    </div>
                `;
            }

            const node = document.createElement('div');
            node.className = `map-node ${chap.status} ${chap.id === selectedId ? 'selected' : ''} ${hasPending ? 'pending-activities' : ''}`;
            node.style.left = `${chap.x}px`;
            node.style.top = `${chap.y}px`;
            node.setAttribute('tabindex', '0');

            node.innerHTML = `
                ${explorersHTML}
                <div class="node-icon-wrapper">
                    ${symbolHTML}
                </div>
                <div class="node-info-tag">
                    <div class="node-id-prefix">${chap.numStr}</div>
                    <div class="node-title">${chap.title}</div>
                    <div class="node-subtitle">${chap.theme}</div>
                    ${presentMembers.length > 0 ? `<div class="node-explorers-count">👥 ${presentMembers.length} explorando</div>` : ''}
                </div>
            `;

            node.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectMapChapter(chap.id);
            });

            nodesContainer.appendChild(node);
        });
    }

    selectMapChapter(id) {
        if (!this.mapState) return;
        this.mapState.selectedChapterId = id;
        this.renderMapSpotlightsAndNodes();
        this.renderChapterDrawer(id);
        this.openChapterDrawer();

        const allChapters = this.getMapChapterData();
        const chap = allChapters.find(c => c.id === id);
        setTimeout(() => {
            this.centerOnMapNode(chap);
        }, 50);
    }

    openChapterDrawer() {
        const streakPopover = document.getElementById('streak-popover');
        if (streakPopover && !streakPopover.classList.contains('hidden')) {
            streakPopover.classList.add('hidden');
        }

        const drawer = document.getElementById('chapter-drawer-right');
        if (drawer) {
            drawer.classList.add('open');
            setTimeout(() => this.updateMapPanTransform(), 360);
        }
    }

    closeChapterDrawer() {
        const drawer = document.getElementById('chapter-drawer-right');
        if (drawer) {
            drawer.classList.remove('open');
            if (this.mapState) this.mapState.selectedChapterId = null;
            this.renderMapSpotlightsAndNodes();
            setTimeout(() => this.updateMapPanTransform(), 360);
        }
    }

    renderChapterDrawer(id) {
        const allChapters = this.getMapChapterData();
        const chap = allChapters.find(c => c.id === id);
        const drawerBody = document.getElementById('drawer-content-body');
        if (!chap || !drawerBody) return;

        const progressPercent = Math.round((chap.missionsDone / chap.missionsCount) * 100);

        let buttonActionText = "INICIAR CAPÍTULO";
        let buttonClass = "btn-start-chapter";
        let buttonIcon = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;

        if (chap.status === 'locked') {
            buttonActionText = "CAPÍTULO BLOQUEADO";
            buttonClass = "btn-start-chapter locked-btn";
            buttonIcon = `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
        } else if (chap.status === 'completed') {
            buttonActionText = "REVISAR CAPÍTULO";
        }

        drawerBody.innerHTML = `
            <div class="drawer-header">
                <div class="chapter-number-tag">${chap.numStr}</div>
                <div class="chapter-main-title">${chap.title}</div>
                <div class="chapter-theme-sub">${chap.theme}</div>
            </div>

            <div class="chapter-image-banner">
                <img src="${chap.image}" alt="${chap.title}">
                <div class="chapter-image-overlay"></div>
                <div class="chapter-character-badge">
                    <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    <span>${chap.character}</span>
                </div>
            </div>

            <div class="drawer-section-title">DESAFIO</div>
            <div class="chapter-story-text">
                ${chap.narrative}
                <br><br>
                <span style="color: var(--purple-bright); font-weight: 600;">${chap.summary}</span>
            </div>

            <div class="drawer-section-title">Sistemas Abordados</div>
            <div class="systems-list">
                ${chap.systems.map(s => `
                    <div class="system-item-chip">
                        <svg viewBox="0 0 24 24"><path d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2 8.6 4.5 10 7 7.5 5.6zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14l-2.5 1.4zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5L22 2zM14.37 7.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.06 3.18l-1.41-1.41 1.41-1.41 1.41 1.41-1.41 1.41z"/></svg>
                        <span>${s}</span>
                    </div>
                `).join('')}
            </div>

            <div class="drawer-section-title">Progresso das Missões</div>
            <div class="progress-box">
                <div class="progress-header">
                    <span>MISSÕES CONCLUÍDAS</span>
                    <span style="color: var(--cyan);">${chap.missionsDone} / ${chap.missionsCount} (${progressPercent}%)</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill-drawer" style="width: ${progressPercent}%;"></div>
                </div>
            </div>

            <div class="drawer-section-title">Recompensas</div>
            <div class="rewards-grid">
                <div class="reward-card">
                    <div class="reward-icon-svg"><svg viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15L11 21z"/></svg></div>
                    <div class="reward-amount">+${chap.rewards.xp} XP</div>
                    <div class="reward-label">Experiência</div>
                </div>
                <div class="reward-card">
                    <div class="reward-icon-svg"><svg viewBox="0 0 24 24"><path d="M19 3H5L2 9l10 12L22 9l-3-6zM15.5 8h-7l1.5-3h4l1.5 3z"/></svg></div>
                    <div class="reward-amount">+${chap.rewards.gp} GP</div>
                    <div class="reward-label">Guild Points</div>
                </div>
                <div class="reward-card">
                    <div class="reward-icon-svg"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4h-5V6h5v2zm-7 0H4V6h9v2zm-2 2v3H9v-3h2zm-7 8v-6h5v1.18c-.6.3-1 .93-1 1.65 0 1.01.82 1.83 1.83 1.83.72 0 1.35-.4 1.65-1H11v2.34H4zm16 0h-7v-2.34h2.52c.3.6.93 1 1.65 1 1.01 0 1.83-.82 1.83-1.83 0-.72-.4-1.35-1-1.65V12h2v6z"/></svg></div>
                    <div class="reward-amount" style="font-size: 0.62rem;">${chap.rewards.item}</div>
                    <div class="reward-label">Recompensa</div>
                </div>
            </div>

            <button class="${buttonClass}" onclick="app.ui.handleChapterStartClick(${chap.id})">
                ${buttonIcon}
                <span>${buttonActionText}</span>
            </button>
        `;
    }

    handleChapterStartClick(id) {
        const allChapters = this.getMapChapterData();
        const chap = allChapters.find(c => c.id === id);
        if (!chap) return;

        if (chap.status === 'locked') {
            this.showToast(`[ SISTEMA ] O ${chap.numStr} ainda está selado.`);
        } else {
            this.showToast(`[ SISTEMA ] Entrando no ${chap.numStr}...`);
            this.closeChapterDrawer();
            app.openChapter(id);
        }
    }

    // ─── CHAPTER SCREEN ───
    openChapter(chapterId) {
        // Validação de Segurança Anti-Burla: Checa se o capítulo está legitimamente desbloqueado
        const isUnlocked = this.engine.isChapterUnlocked(chapterId);
        if (!isUnlocked) {
            this.showToast(`[ SISTEMA ] Acesso Negado! O Capítulo ${String(chapterId).padStart(2, '0')} está selado.`, 'error');
            this.showScreen('dashboard');
            this.renderDashboard();
            return;
        }

        this.engine.setCurrentChapter(chapterId);
        this.currentChapterData = (typeof missionsManager !== 'undefined' ? missionsManager.getChapter(chapterId) : null) || CHAPTERS.find(c => c.id === chapterId);
        this.showScreen('chapter');
        this.renderChapterUI(chapterId);
    }

    renderChapterUI(chapterId) {
        const ch = this.currentChapterData;
        document.getElementById('chapter-title-display').textContent = `CAP ${String(ch.id).padStart(2, '0')} — ${ch.title.toUpperCase()}`;

        const progress = this.engine.getChapterProgress(ch.id);
        const total = this.engine.getChapterTotalSteps();
        document.getElementById('chapter-progress-text').textContent = `${progress}/${total}`;
        document.getElementById('chapter-xp-fill').style.width = `${(progress / total) * 100}%`;

        this.renderChapterNarrative(ch);
        this.setupChapterEditor(ch);

        // Start editor collapsed
        const editorSection = document.querySelector(".editor-section");
        if (editorSection) editorSection.classList.add("collapsed");

        // Update Verificar visibility
        this.updateVerificarVisibility();

        document.getElementById('terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Terminal do capítulo inicializado.</div>';
    }

    renderChapterNarrative(ch) {
        const section = document.getElementById('narrative-section');
        section.innerHTML = '';

        const alreadyViewed = this.engine.isStoryViewed(ch.id);

        // ── Story block with dialogue ──
        const storyBlock = document.createElement('div');
        storyBlock.className = 'story-block';
        const storyHeader = document.createElement('div');
        storyHeader.className = 'step-indicator history';
        storyHeader.textContent = '01 -- HISTORIA' + (alreadyViewed ? ' (CONCLUÍDA)' : '');
        storyBlock.appendChild(storyHeader);

        // Dialogue container
        const dialogueDiv = document.createElement('div');
        dialogueDiv.id = 'chapter-dialogue';
        dialogueDiv.className = 'dialogue-container';
        storyBlock.appendChild(dialogueDiv);

        if (this.dialogueEngine) this.dialogueEngine.destroy();
        this.dialogueEngine = new DialogueEngine(dialogueDiv, { autoPlayDelay: 2500 });

        if (alreadyViewed) {
            section.appendChild(storyBlock);
            // Render all dialogue messages at once without typewriter delays
            this.dialogueEngine.renderAll(ch.story);
            this.renderChapterContent(ch);
            return;
        }

        // Dialogue controls for first-time viewing
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'dialogue-controls';
        controlsDiv.innerHTML = `
            <button class="dialogue-advance-btn pulse-action" id="btn-dialogue-next" onclick="app.advanceDialogue()">
                CONTINUAR
            </button>
            <button class="dialogue-auto-btn" id="btn-dialogue-auto" onclick="app.toggleAutoPlay()">
                AUTO: OFF
            </button>
            <span class="dialogue-hint">clique para avançar</span>
        `;
        storyBlock.appendChild(controlsDiv);
        section.appendChild(storyBlock);

        // Initialize progressive dialogue engine
        this.dialogueEngine.start(ch.story, () => {
            // Mark story as viewed so it remains completed
            this.engine.markStoryViewed(ch.id);
            this.engine.saveToCloud();
            // After story finishes, show concept/example/activities
            this.renderChapterContent(ch);
            // Hide advance button
            const advBtn = document.getElementById('btn-dialogue-next');
            if (advBtn) advBtn.style.display = 'none';
            const autoBtn = document.getElementById('btn-dialogue-auto');
            if (autoBtn) autoBtn.style.display = 'none';
            const hint = document.querySelector('.dialogue-hint');
            if (hint) hint.style.display = 'none';
        });
    }

    // ─── RENDER CHAPTER CONTENT (after dialogue finishes) ───
    renderChapterContent(ch) {
        const section = document.getElementById('narrative-section');

        // Concept block
        if (ch.concept) {
            const conceptBlock = document.createElement('div');
            conceptBlock.className = 'concept-block';
            conceptBlock.innerHTML = `
                <div class="step-indicator concept">02 -- CONCEITO</div>
                <div class="concept-block-title">${ch.concept.title}</div>
                <p style="margin-bottom: 0.8rem; color: var(--text-secondary);">${ch.concept.explanation}</p>
                <pre><code>${this.highlightCCode(ch.concept.code)}</code></pre>
            `;
            section.appendChild(conceptBlock);
        }

        // Example block
        if (ch.example) {
            const exampleBlock = document.createElement('div');
            exampleBlock.className = 'example-block';
            exampleBlock.innerHTML = `
                <div class="step-indicator example">03 -- EXEMPLO</div>
                <div class="example-block-title">${ch.example.title}</div>
                <pre><code>${this.highlightCCode(ch.example.code)}</code></pre>
                <div style="margin-top: 0.5rem; padding: 0.4rem; background: rgba(0,0,0,0.2);">
                    <span style="color: var(--green); font-family: var(--font-code); font-size: 0.75rem;">Saida:</span>
                    <pre style="margin-top: 0.3rem; color: var(--text-primary); font-size: 0.8rem;">${ch.example.output}</pre>
                </div>
            `;
            section.appendChild(exampleBlock);
        }

        // Experiment block
        if (ch.experiment) {
            const expBlock = document.createElement('div');
            expBlock.style.cssText = 'margin: 1rem 0; padding: 1rem; border: 1px solid var(--border-base); background: var(--bg-panel); position: relative;';
            expBlock.innerHTML = `
                <div class="step-indicator experiment">04 -- EXPERIMENTE</div>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">${ch.experiment.description}</p>
                <button class="glow-button primary pulse-action" onclick="app.startExperiment()" style="font-size: 0.75rem; padding: 0.4rem 1.2rem;">
                    <span class="btn-text">ABRIR NO EDITOR</span>
                </button>
            `;
            section.appendChild(expBlock);
        }

        // Activities Section
        if (ch.activities) {
            const actBlock = document.createElement('div');
            actBlock.className = 'chapter-activities-block';
            actBlock.style.cssText = 'margin: 1.5rem 0;';
            actBlock.innerHTML = `
                <div class="step-indicator activity">05 -- ATIVIDADES PRÁTICAS</div>
                <p style="color: var(--text-secondary); margin: 0.6rem 0 1.2rem 0; font-size: 0.85rem; line-height: 1.5;">
                    Resolva os desafios de programação abaixo para acumular <strong>XP</strong>, ganhar <strong>Tokens</strong> e restaurar o sistema da Guilda.
                </p>
            `;

            const actList = document.createElement('div');
            actList.style.cssText = 'display: flex; flex-direction: column; gap: 0.8rem;';

            ch.activities.forEach((act, idx) => {
                const actEl = document.createElement('div');
                const completed = this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id][`act${idx + 1}`];
                const isEasy = act.difficulty === 'easy';
                const xpGain = isEasy ? 30 : 50;
                const tokenGain = isEasy ? 15 : 25;

                actEl.className = `activity-card-row ${completed ? 'is-completed' : ''}`;
                actEl.innerHTML = `
                    <div class="activity-card-left">
                        <div class="activity-card-num-box">
                            <span class="activity-card-num-txt">#${idx + 1}</span>
                        </div>
                        <div class="activity-card-details">
                            <div class="activity-card-title-row">
                                <span class="activity-card-name">${act.title}</span>
                                ${completed ? `
                                    <span class="activity-done-pill">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                        CONCLUÍDO
                                    </span>
                                ` : ''}
                            </div>
                            <div class="activity-card-meta">
                                <span class="activity-diff-badge ${isEasy ? 'diff-easy' : 'diff-medium'}">
                                    ${isEasy ? 'FÁCIL' : 'MÉDIO'}
                                </span>
                                <span class="activity-reward-pill">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                    +${xpGain} XP
                                </span>
                                <span class="activity-reward-pill">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                                    +${tokenGain} Tokens
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="activity-card-right">
                        <button class="glow-button ${completed ? 'btn-replay' : 'primary pulse-action'}" style="padding:0.45rem 1.1rem;font-size:0.75rem;display:flex;align-items:center;gap:0.4rem;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                ${completed ? '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>' : '<polygon points="5 3 19 12 5 21 5 3"/>'}
                            </svg>
                            <span>${completed ? 'REJOGAR' : 'RESOLVER'}</span>
                        </button>
                    </div>
                `;
                actEl.onclick = () => app.startActivity(idx);
                actList.appendChild(actEl);
            });

            actBlock.appendChild(actList);
            section.appendChild(actBlock);
        }
    }

    // ─── EDITOR TOGGLE ───
    toggleEditor() {
        const editorSection = document.querySelector(".editor-section");
        const toggleBtn = document.getElementById("btn-toggle-editor");
        if (editorSection) {
            editorSection.classList.toggle("collapsed");
            if (toggleBtn) {
                const isCollapsed = editorSection.classList.contains("collapsed");
                toggleBtn.textContent = isCollapsed ? "ABRIR EDITOR" : "FECHAR EDITOR";
            }
        }
    }

    openEditor() {
        const editorSection = document.querySelector(".editor-section");
        const toggleBtn = document.getElementById("btn-toggle-editor");
        if (editorSection) {
            editorSection.classList.remove("collapsed");
            if (toggleBtn) toggleBtn.textContent = "FECHAR EDITOR";
        }
    }

    closeEditor() {
        const editorSection = document.querySelector(".editor-section");
        const toggleBtn = document.getElementById("btn-toggle-editor");
        if (editorSection) {
            editorSection.classList.add("collapsed");
            if (toggleBtn) toggleBtn.textContent = "ABRIR EDITOR";
        }
    }

    // ─── VERIFICAR BUTTON VISIBILITY ───
    updateVerificarVisibility() {
        const btn = document.getElementById("btn-check-code");
        if (!btn) return;
        const isTeacher = typeof authManager !== "undefined" && (authManager.isTeacher() || authManager.isAdmin());
        btn.style.display = isTeacher ? "" : "none";
    }

    // ─── DIALOGUE CONTROLS ───
    advanceDialogue() {
        if (this.dialogueEngine) this.dialogueEngine.advance();
    }

    toggleAutoPlay() {
        if (this.dialogueEngine) {
            const isActive = this.dialogueEngine.toggleAutoPlay();
            const btn = document.getElementById('btn-dialogue-auto');
            if (btn) {
                btn.textContent = isActive ? 'AUTO: ON' : 'AUTO: OFF';
                btn.classList.toggle('active', isActive);
            }
        }
    }

    // ─── C SYNTAX HIGHLIGHTER (VS CODE PALETTE & THEMES) ───
    highlightCCode(code) {
        if (!code) return '';
        let escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const tokens = [];
        const saveToken = (cls, text) => {
            const id = `\u0000__TOK_${tokens.length}__\u0000`;
            tokens.push(`<span class="${cls}">${text}</span>`);
            return id;
        };

        // 1. Strings & single-char literals
        escaped = escaped.replace(/(["'])(?:\\.|[^\\])*?\1/g, match => saveToken('syn-str', match));

        // 2. Comments //... and /* ... */
        escaped = escaped.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, match => saveToken('syn-comment', match));

        // 3. Preprocessors (#include <...>, #define, etc.)
        escaped = escaped.replace(/#(include|define|undef|ifdef|ifndef|endif|if|else|elif)\b(\s*(&lt;[^&]+&gt;))?/g, (match, prep, rest, header) => {
            if (header) {
                return saveToken('syn-prep', '#' + prep) + ' ' + saveToken('syn-header', header);
            }
            return saveToken('syn-prep', match);
        });

        // 4. Control Flow / Keywords (First, before types/functions so keywords followed by ( like if() / else() / sizeof() are prioritized)
        escaped = escaped.replace(/\b(return|if|else|for|while|do|switch|case|default|break|continue|struct|typedef|const|sizeof|static|enum|union|goto|extern|register|volatile)\b/g, match => saveToken('syn-kwd', match));

        // 5. Types
        escaped = escaped.replace(/\b(int|char|float|double|void|long|short|unsigned|signed|bool|size_t|FILE|uint8_t|uint16_t|uint32_t|int8_t|int16_t|int32_t)\b/g, match => saveToken('syn-type', match));

        // 6. Function calls / declarations (words followed by '(')
        escaped = escaped.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, match => saveToken('syn-func', match));

        // 7. Numbers (decimal, float, hex)
        escaped = escaped.replace(/\b(0x[0-9a-fA-F]+|\d+(\.\d+)?f?)\b/g, match => saveToken('syn-num', match));

        // Restore tokens in reverse order
        for (let i = tokens.length - 1; i >= 0; i--) {
            escaped = escaped.split(`\u0000__TOK_${i}__\u0000`).join(tokens[i]);
        }

        return escaped;
    }

    // ─── UNIVERSAL IDE CODE EDITOR ENHANCER (TAB & SYNTAX HIGHLIGHTING) ───
    attachCodeEditor(editor, lineNumbersId, highlightId) {
        if (!editor) return;
        const lineNumbers = lineNumbersId ? document.getElementById(lineNumbersId) : null;
        const highlight = highlightId ? document.getElementById(highlightId) : null;

        const updateView = () => {
            if (lineNumbers) this.updateLineNumbers(editor, lineNumbersId);
            if (highlight) {
                const codeEl = highlight.querySelector('code') || highlight;
                codeEl.innerHTML = this.highlightCCode(editor.value) + '\n';
            }
        };

        const syncScroll = () => {
            if (lineNumbers) lineNumbers.scrollTop = editor.scrollTop;
            if (highlight) {
                highlight.scrollTop = editor.scrollTop;
                highlight.scrollLeft = editor.scrollLeft;
            }
        };

        editor.onscroll = syncScroll;
        editor.oninput = () => {
            updateView();
            syncScroll();
        };

        editor.onkeydown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                e.stopPropagation();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;

                if (e.shiftKey) {
                    // Shift+Tab: Unindent current line
                    const lastNl = val.lastIndexOf('\n', start - 1);
                    const lineStart = lastNl === -1 ? 0 : lastNl + 1;
                    const linePrefix = val.substring(lineStart, lineStart + 4);
                    const spaces = linePrefix.match(/^ +/);
                    if (spaces && spaces[0].length > 0) {
                        const removeCount = Math.min(4, spaces[0].length);
                        editor.value = val.substring(0, lineStart) + val.substring(lineStart + removeCount);
                        editor.selectionStart = Math.max(lineStart, start - removeCount);
                        editor.selectionEnd = Math.max(lineStart, end - removeCount);
                    }
                } else {
                    // Tab: Insert 4 spaces
                    editor.value = val.substring(0, start) + '    ' + val.substring(end);
                    editor.selectionStart = editor.selectionEnd = start + 4;
                }
                updateView();
                syncScroll();
                return false;
            }

            // Enter: Auto-indent to match current line
            if (e.key === 'Enter') {
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;
                const lastNl = val.lastIndexOf('\n', start - 1);
                const line = val.substring(lastNl + 1, start);
                const indentMatch = line.match(/^[ \t]+/);
                const indent = indentMatch ? indentMatch[0] : '';
                const extraIndent = line.trim().endsWith('{') ? '    ' : '';
                
                e.preventDefault();
                const insertText = '\n' + indent + extraIndent;
                editor.value = val.substring(0, start) + insertText + val.substring(end);
                editor.selectionStart = editor.selectionEnd = start + insertText.length;
                updateView();
                syncScroll();
                return false;
            }

            // Ctrl+Enter / Cmd+Enter: Executar / Submeter
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                if (window.app) {
                    const activityScreen = document.getElementById('screen-activity');
                    if (activityScreen && activityScreen.classList.contains('active')) {
                        window.app.handleActivitySubmit();
                    } else {
                        window.app.handleRunCode();
                    }
                }
                return false;
            }

            // Ctrl+S / Cmd+S: Salvar / Executar (evita diálogo padrão do browser)
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                e.stopPropagation();
                if (window.app) {
                    const activityScreen = document.getElementById('screen-activity');
                    if (activityScreen && activityScreen.classList.contains('active')) {
                        window.app.handleActivityRun();
                    } else {
                        window.app.handleRunCode();
                    }
                }
                return false;
            }

            // Ctrl+/ or Cmd+/: Comentar / Descomentar linha(s) estilo VS Code
            if ((e.ctrlKey || e.metaKey) && (e.key === '/' || e.key === ';')) {
                e.preventDefault();
                e.stopPropagation();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;
                const lastNl = val.lastIndexOf('\n', start - 1);
                const lineStart = lastNl === -1 ? 0 : lastNl + 1;
                let lineEnd = val.indexOf('\n', end);
                if (lineEnd === -1) lineEnd = val.length;

                const lines = val.substring(lineStart, lineEnd).split('\n');
                const allCommented = lines.every(l => l.trim().startsWith('//') || l.trim().length === 0);

                const newLines = lines.map(l => {
                    if (allCommented) {
                        return l.replace(/(\s*)\/\/\s?/, '$1');
                    } else {
                        return l.length > 0 ? '// ' + l : l;
                    }
                });

                const replacedText = newLines.join('\n');
                editor.value = val.substring(0, lineStart) + replacedText + val.substring(lineEnd);
                editor.selectionStart = lineStart;
                editor.selectionEnd = lineStart + replacedText.length;
                updateView();
                syncScroll();
                return false;
            }

            // Alt+Shift+Up / Alt+Shift+Down: Duplicar linha (VS Code shortcut)
            if (e.altKey && e.shiftKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
                e.preventDefault();
                e.stopPropagation();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;
                const lastNl = val.lastIndexOf('\n', start - 1);
                const lineStart = lastNl === -1 ? 0 : lastNl + 1;
                let nextNl = val.indexOf('\n', end);
                if (nextNl === -1) nextNl = val.length;
                const currentLineBlock = val.substring(lineStart, nextNl);

                editor.value = val.substring(0, nextNl) + '\n' + currentLineBlock + val.substring(nextNl);
                if (e.key === 'ArrowDown') {
                    editor.selectionStart = start + currentLineBlock.length + 1;
                    editor.selectionEnd = end + currentLineBlock.length + 1;
                } else {
                    editor.selectionStart = start;
                    editor.selectionEnd = end;
                }
                updateView();
                syncScroll();
                return false;
            }

            // Alt+ArrowUp / Alt+ArrowDown: Mover linha para cima/baixo (VS Code shortcut)
            if (e.altKey && !e.shiftKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();
                e.stopPropagation();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;
                const lastNl = val.lastIndexOf('\n', start - 1);
                const lineStart = lastNl === -1 ? 0 : lastNl + 1;
                let nextNl = val.indexOf('\n', end);
                if (nextNl === -1) nextNl = val.length;
                const currentLineBlock = val.substring(lineStart, nextNl);

                if (e.key === 'ArrowUp' && lineStart > 0) {
                    const prevNl = val.lastIndexOf('\n', lineStart - 2);
                    const prevLineStart = prevNl === -1 ? 0 : prevNl + 1;
                    const prevLine = val.substring(prevLineStart, lineStart - 1);
                    editor.value = val.substring(0, prevLineStart) + currentLineBlock + '\n' + prevLine + val.substring(nextNl);
                    const diff = prevLine.length + 1;
                    editor.selectionStart = start - diff;
                    editor.selectionEnd = end - diff;
                } else if (e.key === 'ArrowDown' && nextNl < val.length) {
                    let afterNl = val.indexOf('\n', nextNl + 1);
                    if (afterNl === -1) afterNl = val.length;
                    const nextLine = val.substring(nextNl + 1, afterNl);
                    editor.value = val.substring(0, lineStart) + nextLine + '\n' + currentLineBlock + val.substring(afterNl);
                    const diff = nextLine.length + 1;
                    editor.selectionStart = start + diff;
                    editor.selectionEnd = end + diff;
                }
                updateView();
                syncScroll();
                return false;
            }

            // Backspace inteligente (apaga pares de parênteses/chaves)
            if (e.key === 'Backspace' && editor.selectionStart === editor.selectionEnd) {
                const start = editor.selectionStart;
                const val = editor.value;
                const prevChar = val[start - 1];
                const nextChar = val[start];
                const pairMap = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
                if (prevChar && pairMap[prevChar] === nextChar) {
                    e.preventDefault();
                    editor.value = val.substring(0, start - 1) + val.substring(start + 1);
                    editor.selectionStart = editor.selectionEnd = start - 1;
                    updateView();
                    syncScroll();
                    return false;
                }
            }

            // Auto-close brackets and quotes
            const pairs = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
            const closers = [')', '}', ']', '"', "'"];

            // Pular fechador se já estiver digitado na frente
            if (closers.includes(e.key) && editor.selectionStart === editor.selectionEnd) {
                const start = editor.selectionStart;
                const val = editor.value;
                if (val[start] === e.key) {
                    e.preventDefault();
                    editor.selectionStart = editor.selectionEnd = start + 1;
                    return false;
                }
            }

            if (pairs[e.key]) {
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;

                // Se houver texto selecionado, envolve o texto nos delimitadores (VS Code surround)
                if (start !== end) {
                    e.preventDefault();
                    const selectedText = val.substring(start, end);
                    editor.value = val.substring(0, start) + e.key + selectedText + pairs[e.key] + val.substring(end);
                    editor.selectionStart = start + 1;
                    editor.selectionEnd = end + 1;
                    updateView();
                    return false;
                }

                const nextChar = val[start] || '';
                if (/\s|;|\)|}|\]|,|$/.test(nextChar)) {
                    e.preventDefault();
                    editor.value = val.substring(0, start) + e.key + pairs[e.key] + val.substring(start);
                    editor.selectionStart = editor.selectionEnd = start + 1;
                    updateView();
                    return false;
                }
            }
        };

        updateView();
        syncScroll();
    }

    setupChapterEditor(ch) {
        const editor = document.getElementById('code-editor');
        if (!editor) return;
        const starterCode = ch.experiment ? ch.experiment.starterCode : (ch.example ? ch.example.code : '');
        editor.value = starterCode;
        this.attachCodeEditor(editor, 'line-numbers', 'code-editor-highlight');
    }

    // ─── ACTIVITY SCREEN ───
    startActivity(activityIndex) {
        const ch = this.currentChapterData;
        this.currentActivityData = ch.activities[activityIndex];
        this.engine.setCurrentActivity(activityIndex);
        this.hintLevel = 0;

        if (typeof app !== 'undefined') {
            app.activityContext = {
                mode: 'chapter',
                chapterId: ch.id,
                activityIndex: activityIndex,
                data: this.currentActivityData
            };
        }

        this.showScreen('activity');
        this.renderActivityUI(ch, activityIndex);
    }

    renderActivityUI(ch, activityIndex) {
        const act = ch.activities[activityIndex];
        document.getElementById('activity-title-display').textContent = act.title.toUpperCase();

        const diffBadge = document.getElementById('activity-difficulty');
        diffBadge.textContent = act.difficulty === 'easy' ? 'FÁCIL' : 'MÉDIO';
        diffBadge.className = `difficulty-badge ${act.difficulty === 'easy' ? 'easy' : 'medium'}`;

        // Garante que o timer e o intervalo do Abismo são sempre limpos em atividades de capítulo
        const timerContainer = document.getElementById('activity-abyss-timer');
        if (timerContainer) timerContainer.classList.add('hidden');
        // Cancela o intervalo de countdown do Abismo caso o jogador tenha saído do Abismo para um capítulo
        if (typeof app !== 'undefined' && app._abyssActivityInterval) {
            clearInterval(app._abyssActivityInterval);
            app._abyssActivityInterval = null;
        }
        const backLabel = document.getElementById('btn-back-activity-label');
        if (backLabel) backLabel.textContent = 'CAPÍTULO';

        // Monta o bloco didático de Saída Esperada (valores exatos, mesmo texto, mesma linha vs linhas diferentes)
        let expectedOutputHtml = '';
        if (act.tests && act.tests.length > 0) {
            const hasMultipleLines = act.tests.some(t => String(t.expected).includes('\n'));
            const isSingleLine = !hasMultipleLines;

            const testExamplesHtml = act.tests.map((t, idx) => {
                const isMultilineOutput = String(t.expected).includes('\n');
                const lineCount = String(t.expected).split('\n').length;
                const lineAdvice = isMultilineOutput 
                    ? `Saída em <strong>${lineCount} linhas separadas</strong> (use <code>\\n</code> ao final de cada linha)` 
                    : `Saída na <strong>mesma linha</strong>`;

                return `
                    <div class="expected-test-item">
                        <div class="expected-test-meta">
                            <span><strong style="color:var(--cyan);">Caso ${idx + 1}:</strong> ${t.description || ''}</span>
                            ${t.input ? `<span>Entrada: <code style="color:#fff;background:rgba(255,255,255,0.08);padding:0.1rem 0.3rem;border-radius:3px;">${t.input}</code></span>` : '<span style="color:var(--text-dim);">(sem entrada)</span>'}
                        </div>
                        <div style="font-size:0.68rem;color:var(--text-secondary);margin-bottom:0.2rem;display:flex;align-items:center;gap:0.3rem;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            <span>${lineAdvice}:</span>
                        </div>
                        <pre class="expected-preview-pre">${t.expected}</pre>
                    </div>
                `;
            }).join('');

            expectedOutputHtml = `
                <div class="expected-output-box">
                    <div class="expected-output-header">
                        <div class="expected-output-title">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            SAÍDA ESPERADA NO TERMINAL
                        </div>
                        <span class="expected-output-badge ${isSingleLine ? 'singleline' : 'multiline'}">
                            ${isSingleLine ? 'MESMA LINHA' : 'LINHAS SEPARADAS (\\n)'}
                        </span>
                    </div>
                    <div class="expected-tests-list">
                        ${testExamplesHtml}
                    </div>
                    <div class="expected-format-note">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span><strong>Atenção ao Formato:</strong> Imprima exatamente os caracteres, pontuações e quebras de linha (<code>\\n</code>) mostrados acima.</span>
                    </div>
                </div>
            `;
        }

        // Problem description
        const problemSection = document.getElementById('problem-section');
        problemSection.innerHTML = `
            <h3>MISSÃO</h3>
            <div class="story-block" style="margin-bottom: 0.8rem;">
                <div class="character-block-header ${ch.character || 'system'}">${ch.story.find(s => s.type === 'character')?.name || 'SISTEMA'} // ${ch.story.find(s => s.type === 'character')?.role || 'MISSÃO'}</div>
                <div class="character-block-body">${act.description}</div>
            </div>
            ${expectedOutputHtml}
        `;

        // Editor with Syntax Highlighting & Tab handling
        const editor = document.getElementById('activity-editor');
        if (editor) {
            editor.value = act.starterCode;
            this.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
        }

        // Reset panels
        document.getElementById('activity-terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Aguardando execução...</div>';
        
        const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
        const testPanel = document.getElementById('activity-test-results');

        // Subclasse Analyst Perk: Visão Espectral de Testes (an_spectral_tests)
        if (this.engine.hasSkill('an_spectral_tests', user) && act.tests && act.tests.length > 0) {
            let spectralHtml = '<div class="terminal-line system" style="color:var(--cyan);margin-bottom:0.5rem;"><i class="fa-solid fa-eye"></i> <strong>[ Visão Espectral de Testes Ativa ]:</strong></div>';
            act.tests.forEach((t, i) => {
                spectralHtml += `
                    <div style="background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);padding:0.35rem 0.6rem;border-radius:4px;margin-bottom:0.4rem;font-size:0.75rem;">
                        <span style="color:var(--cyan);font-weight:700;">Teste ${i+1}:</span> <span style="color:#fff;">${t.description}</span>
                        <div style="font-size:0.68rem;color:var(--text-dim);font-family:var(--font-code);margin-top:0.15rem;">Entrada: <code>${t.input || '(nenhuma)'}</code> • Esperado: <code style="color:var(--gold);">${t.expected}</code></div>
                    </div>
                `;
            });
            testPanel.innerHTML = spectralHtml;
        } else {
            testPanel.innerHTML = '<div class="terminal-line system">[ SISTEMA ] Clique em "Submeter" para validar.</div>';
        }

        // Re-vincula os botões da atividade do capítulo para evitar sobreposição de listeners do Abismo
        const backBtn = document.getElementById('btn-back-chapter');
        if (backBtn) {
            backBtn.onclick = () => {
                if (ch) {
                    this.openChapter(ch.id);
                } else {
                    this.showScreen('dashboard');
                    this.renderDashboard();
                }
            };
        }

        const resetBtn = document.getElementById('btn-reset-activity');
        if (resetBtn) {
            resetBtn.onclick = () => {
                if (editor) {
                    editor.value = act.starterCode || '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}';
                    this.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
                }
            };
        }

        const submitBtn = document.getElementById('btn-submit-activity');
        if (submitBtn && typeof app !== 'undefined') {
            submitBtn.onclick = () => app.handleActivitySubmit();
        }

        document.getElementById('activity-hints').innerHTML = '';
        this.hintLevel = 0;
        this.renderHints(act);

        this.setupTerminalTabs();
        this.setupNotepad();
    }

    setupNotepad() {
        const notepadInput = document.getElementById('player-notepad-input');
        const syncStatus = document.getElementById('notepad-sync-status');
        if (!notepadInput) return;

        // Carrega as anotações salvas na conta do jogador
        notepadInput.value = this.engine.getNotepad();

        let saveTimeout = null;
        notepadInput.oninput = () => {
            if (syncStatus) {
                syncStatus.textContent = 'Salvando...';
                syncStatus.style.color = 'var(--gold)';
            }
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                this.engine.setNotepad(notepadInput.value);
                if (syncStatus) {
                    syncStatus.textContent = 'Sincronizado na Conta ✓';
                    syncStatus.style.color = 'var(--green)';
                }
            }, 500);
        };
    }

    updateTopBarTokens() {
        const tokensVal = (typeof this.engine !== 'undefined' && this.engine.getTokens) ? this.engine.getTokens() : 0;
        const tokensEl = document.getElementById('player-tokens-count');
        if (tokensEl) tokensEl.textContent = tokensVal;
        const shopTokensEl = document.getElementById('shop-screen-user-tokens');
        if (shopTokensEl) shopTokensEl.textContent = tokensVal;
    }

    renderHints(act) {
        const container = document.getElementById('activity-hints');
        if (!container || !act) return;
        this.currentActivity = act;
        container.innerHTML = '';

        const actId = act.id || (act.title ? act.title.replace(/\s+/g, '_') : 'cur_act');
        const hintCosts = [5, 10, 15];
        const hints = act.hints || [];

        hints.forEach((hint, idx) => {
            const isUnlocked = this.engine.isHintUnlocked(actId, idx);
            const cost = hintCosts[idx] || 5;
            const isPrevUnlocked = idx === 0 || this.engine.isHintUnlocked(actId, idx - 1);
            const hintText = typeof hint === 'string' ? hint : (hint.text || '');

            const div = document.createElement('div');
            div.className = 'hint-level';
            div.innerHTML = `
                <div class="hint-level-header">
                    <span class="hint-level-title ${['i', 'ii', 'iii'][idx]}">DICA ${['I', 'II', 'III'][idx]}</span>
                    <button class="hint-reveal-btn ${isUnlocked ? 'revealed' : ''}" 
                            id="hint-btn-${idx}" 
                            ${(!isPrevUnlocked && !isUnlocked) ? 'disabled' : ''} 
                            style="${(!isPrevUnlocked && !isUnlocked) ? 'opacity: 0.35;' : ''}"
                            onclick="app.handleBuyHint('${actId}', ${idx})">
                        ${isUnlocked ? 'REVELADO' : `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2.5" style="display:inline-block;vertical-align:middle;margin-right:2px;"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg> REVELAR (-${cost} TOKENS)`}
                    </button>
                </div>
                <div class="hint-level-content" id="hint-content-${idx}" style="display: ${isUnlocked ? 'block' : 'none'}">
                    ${hintText}
                </div>
            `;
            container.appendChild(div);
        });
    }

    setupTerminalTabs() {
        const tabs = document.querySelectorAll('.terminal-tab');
        const panels = {
            output: document.getElementById('panel-output'),
            tests: document.getElementById('panel-tests'),
            hints: document.getElementById('panel-hints'),
            cheatsheet: document.getElementById('panel-cheatsheet'),
            notepad: document.getElementById('panel-notepad')
        };

        tabs.forEach(tab => {
            tab.onclick = () => {
                const tabKey = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                Object.values(panels).forEach(p => { if (p) p.classList.remove('active'); });
                tab.classList.add('active');
                if (panels[tabKey]) {
                    panels[tabKey].classList.add('active');
                    if (tabKey === 'cheatsheet') {
                        this.renderCheatsheet();
                    }
                }
            };
        });
    }

    // ─── LINE NUMBERS ───
    updateLineNumbers(textarea, lineNumbersId) {
        const lines = textarea.value.split('\n').length;
        const lineNumbers = document.getElementById(lineNumbersId);
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) =>
            `<div>${i + 1}</div>`
        ).join('');
    }

    // ─── CODE EXECUTION ───
    formatTerminalLine(line) {
        if (!line) return '';
        // Escape HTML
        let text = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const tokens = [];
        const saveTok = (cls, content) => {
            const id = `\u0000__TERM_TOK_${tokens.length}__\u0000`;
            tokens.push(`<span class="${cls}">${content}</span>`);
            return id;
        };

        // 1. Strings inside quotes
        text = text.replace(/(["'])(.*?)\1/g, (match) => saveTok('term-hl-str', match));

        // 2. System tags [ SISTEMA ] or [ GM ] or [ GUILDA ]
        text = text.replace(/\[\s*(SISTEMA|GM|GUILDA)\s*\]/gi, (match) => saveTok('term-hl-system', match));

        // 3. Success / Status markers [ SUCESSO ], [ OK ], [ PASS ]
        text = text.replace(/\[\s*(SUCESSO|OK|VALIDADO|PASS)\s*\]/gi, (match) => saveTok('term-hl-success', match));

        // 4. Error / Warning markers [ ERRO ], [ FALHA ], [ AVISO ], [ FAIL ]
        text = text.replace(/\[\s*(ERRO|FALHA|AVISO|FAIL)\s*\]/gi, (match) => saveTok('term-hl-error', match));

        // 5. Standalone numbers (decimals and ints)
        text = text.replace(/\b(\d+(?:\.\d+)?)\b/g, (match) => saveTok('term-hl-num', match));

        // Restore all tokens without corruption in reverse
        for (let i = tokens.length - 1; i >= 0; i--) {
            text = text.split(`\u0000__TERM_TOK_${i}__\u0000`).join(tokens[i]);
        }

        return text;
    }

    switchTerminalTab(tabName) {
        const tabs = document.querySelectorAll('.terminal-tab');
        const panels = {
            output: document.getElementById('panel-output'),
            tests: document.getElementById('panel-tests'),
            hints: document.getElementById('panel-hints'),
            cheatsheet: document.getElementById('panel-cheatsheet'),
            notepad: document.getElementById('panel-notepad')
        };
        tabs.forEach(t => {
            if (t.dataset.tab === tabName) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
        Object.keys(panels).forEach(k => {
            if (panels[k]) {
                if (k === tabName) {
                    panels[k].classList.add('active');
                } else {
                    panels[k].classList.remove('active');
                }
            }
        });

        if (tabName === 'cheatsheet') {
            this.renderCheatsheet();
        }
    }

    renderCheatsheet() {
        const container = document.getElementById('activity-cheatsheet-content');
        if (!container) return;

        container.innerHTML = `
            <div class="c-guide-container" style="padding:0.75rem;font-size:0.8rem;color:var(--text-primary);line-height:1.5;">
                <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:0.4rem;margin-bottom:0.6rem;">
                    <strong style="color:var(--cyan);font-size:0.88rem;display:flex;align-items:center;gap:0.4rem;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        Guia de Consulta Rápida — Sintaxe em C
                    </strong>
                    <span style="font-size:0.7rem;color:var(--text-dim);">Referência rápida de sintaxe e semântica</span>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:0.75rem;">
                    <!-- 1. Tipos e Máscaras -->
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:0.6rem;">
                        <h4 style="margin:0 0 0.35rem 0;color:var(--gold);font-size:0.78rem;display:flex;align-items:center;gap:0.35rem;">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
                            1. Tipos & Máscaras de Formatação
                        </h4>
                        <table style="width:100%;font-size:0.72rem;border-collapse:collapse;">
                            <tr style="color:var(--text-dim);border-bottom:1px solid rgba(255,255,255,0.05);"><th style="text-align:left;">Tipo</th><th style="text-align:left;">Uso</th><th style="text-align:left;">Máscara</th></tr>
                            <tr><td><code>int</code></td><td>Inteiro (ex: 42)</td><td><code style="color:var(--cyan);">%d</code></td></tr>
                            <tr><td><code>float</code></td><td>Decimal (ex: 3.14)</td><td><code style="color:var(--cyan);">%f</code> ou <code style="color:var(--cyan);">%.2f</code></td></tr>
                            <tr><td><code>char</code></td><td>1 caractere ('A')</td><td><code style="color:var(--cyan);">%c</code></td></tr>
                            <tr><td><code>char[]</code></td><td>Texto / String</td><td><code style="color:var(--cyan);">%s</code></td></tr>
                        </table>
                    </div>

                    <!-- 2. Entrada e Saída -->
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:0.6rem;">
                        <h4 style="margin:0 0 0.35rem 0;color:var(--gold);font-size:0.78rem;display:flex;align-items:center;gap:0.35rem;">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                            2. Entrada & Saída (printf / scanf)
                        </h4>
                        <div style="font-size:0.72rem;">
                            <p style="margin:0.2rem 0;">• <strong>Imprimir:</strong> <code>printf("Valor: %d\\n", x);</code></p>
                            <p style="margin:0.2rem 0;">• <strong>Ler do Teclado:</strong> <code>scanf("%d", &x);</code> <span style="color:#ef4444;">(Lembre do &)</span></p>
                            <p style="margin:0.2rem 0;">• <strong>Quebra de Linha:</strong> Use <code>\\n</code> ao final do texto.</p>
                            <p style="margin:0.2rem 0;">• <strong>2 Casas Decimais:</strong> Use <code>%.2f</code> para floats.</p>
                        </div>
                    </div>

                    <!-- 3. Condicionais e Loops -->
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:0.6rem;">
                        <h4 style="margin:0 0 0.35rem 0;color:var(--gold);font-size:0.78rem;display:flex;align-items:center;gap:0.35rem;">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                            3. Condicionais & Repetição
                        </h4>
                        <div style="font-size:0.72rem;">
                            <pre style="margin:0.2rem 0;background:rgba(0,0,0,0.3);padding:0.3rem;border-radius:4px;">if (vida &gt; 50) { ... }
else if (vida &gt; 0) { ... }
else { ... }</pre>
                            <pre style="margin:0.2rem 0;background:rgba(0,0,0,0.3);padding:0.3rem;border-radius:4px;">for (int i = 0; i &lt; 5; i++) { ... }
while (inicio &lt;= fim) { ... }</pre>
                        </div>
                    </div>

                    <!-- 4. Vetores, Ponteiros & Structs -->
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:0.6rem;">
                        <h4 style="margin:0 0 0.35rem 0;color:var(--gold);font-size:0.78rem;display:flex;align-items:center;gap:0.35rem;">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                            4. Vetores, Ponteiros & Structs
                        </h4>
                        <div style="font-size:0.72rem;">
                            <p style="margin:0.2rem 0;">• <strong>Vetor (0 a N-1):</strong> <code>int v[5]; v[0] = 10;</code></p>
                            <p style="margin:0.2rem 0;">• <strong>Ponteiro:</strong> <code>int *p = &x; *p = 50;</code></p>
                            <p style="margin:0.2rem 0;">• <strong>Comparar Strings:</strong> <code>if (strcmp(s1, s2) == 0)</code></p>
                            <p style="margin:0.2rem 0;">• <strong>Copiar String:</strong> <code>strcpy(destino, origem);</code></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    runCode(code, outputId, stdin = '') {
        this.engine.incrementStat('executions');
        
        // Se for na tela de atividade, garante que a aba Saída esteja selecionada e destacada
        if (outputId === 'activity-terminal-output') {
            this.switchTerminalTab('output');
        }

        // Se stdin não foi pré-fornecido (ex: testes automáticos) e o código possui scanf, executa com captura inline no terminal
        if (!stdin && typeof window !== 'undefined' && /\bscanf\s*\(/.test(code)) {
            return this.runCodeWithInteractiveTerminal(code, outputId);
        }

        this.interpreter.inputCallback = null;
        const result = this.interpreter.execute(code, stdin);
        const outputEl = document.getElementById(outputId);
        if (outputEl) {
            outputEl.innerHTML = '';

            if (result.output) {
                result.output.split('\n').forEach(line => {
                    if (line.trim().length === 0) return;
                    const el = document.createElement('div');
                    el.className = 'terminal-line narrative';
                    el.innerHTML = this.formatTerminalLine(line);
                    outputEl.appendChild(el);
                });
            }

            if (result.errors && result.errors.length > 0) {
                const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
                const hasShield = this.engine.hasSkill('db_error_shield', user);

                result.errors.forEach(err => {
                    const el = document.createElement('div');
                    el.className = 'terminal-line error';
                    el.innerHTML = '<span class="term-hl-error">[ ERRO ]</span> ' + this.formatTerminalLine(err);
                    outputEl.appendChild(el);

                    // Subclasse Debugger Perk: Escudo de Diagnóstico (db_error_shield)
                    if (hasShield) {
                        const tipEl = document.createElement('div');
                        tipEl.className = 'terminal-line hint';
                        tipEl.style.color = 'var(--green)';
                        tipEl.style.fontSize = '0.78rem';
                        tipEl.style.paddingLeft = '1rem';
                        tipEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> <em>[ Diagnóstico Debugger ]: Verifique a sintaxe próxima ao erro acima, fechamento de chaves {} e ponto-e-vírgula (;).</em>`;
                        outputEl.appendChild(tipEl);
                    }
                });
                this.engine.incrementStat('errorsFixed');
            } else if (result.output) {
                const el = document.createElement('div');
                el.className = 'terminal-line success';
                el.innerHTML = '<span class="term-hl-success">[ SISTEMA ]</span> Execução concluída com sucesso.';
                outputEl.appendChild(el);
            }

            const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;

            // Subclasse Debugger Suprema: Depuração Instantânea (db_live_inspect)
            if (this.engine.hasSkill('db_live_inspect', user) && result.env) {
                const vars = Object.keys(result.env).filter(k => !k.startsWith('_') && typeof result.env[k] !== 'function');
                if (vars.length > 0) {
                    const inspectEl = document.createElement('div');
                    inspectEl.className = 'terminal-line system';
                    inspectEl.style.color = '#38bdf8';
                    inspectEl.style.borderTop = '1px dashed rgba(56, 189, 248, 0.3)';
                    inspectEl.style.marginTop = '0.5rem';
                    inspectEl.style.paddingTop = '0.4rem';
                    inspectEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> <strong>[ Estado de Variáveis ]:</strong> ` + vars.map(v => `${v} = <span style="color:var(--gold)">${JSON.stringify(result.env[v])}</span>`).join(' • ');
                    outputEl.appendChild(inspectEl);
                }
            }

            // Subclasse Reviewer Suprema: Maestria do Grimório (rv_static_mastery)
            if (this.engine.hasSkill('rv_static_mastery', user)) {
                if (code.includes('malloc') && !code.includes('free')) {
                    const warnEl = document.createElement('div');
                    warnEl.className = 'terminal-line warning';
                    warnEl.style.color = '#f59e0b';
                    warnEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> <strong>[ Reviewer - Análise Estática ]:</strong> Foi detectada alocação dinâmica sem <code>free()</code> correspondente.`;
                    outputEl.appendChild(warnEl);
                }
            }
        }

        return result;
    }

    // ─── EXECUÇÃO INTERATIVA COM SCANF DIRETO NO TERMINAL (ESTILO VS CODE) ───
    runCodeWithInteractiveTerminal(code, outputId) {
        const outputEl = document.getElementById(outputId);
        if (!outputEl) return;

        outputEl.innerHTML = '';
        const initialLine = document.createElement('div');
        initialLine.className = 'terminal-line system';
        initialLine.innerHTML = '<span class="term-hl-system">[ SISTEMA ]</span> Programa em execução. Aguardando entradas necessárias...';
        outputEl.appendChild(initialLine);

        let accumulatedInputs = [];
        let maxPrompts = 12; // Trava de segurança para loops de scanf
        let currentPromptCount = 0;

        const executeStep = () => {
            currentPromptCount++;
            if (currentPromptCount > maxPrompts) {
                const limitEl = document.createElement('div');
                limitEl.className = 'terminal-line error';
                limitEl.innerHTML = '<span class="term-hl-error">[ ERRO ]</span> Limite máximo de entradas interativas atingido.';
                outputEl.appendChild(limitEl);
                return;
            }

            let pendingScanf = null;
            this.interpreter.inputCallback = (varName, spec) => {
                pendingScanf = { varName, spec };
                return null;
            };

            const stdinStr = accumulatedInputs.join(' ');
            const result = this.interpreter.execute(code, stdinStr);

            // Se o interpretador encontrou um scanf que ainda não tem entrada
            if (pendingScanf) {
                let typeName = 'um valor';
                if (pendingScanf.spec === '%d' || pendingScanf.spec === '%i' || pendingScanf.spec === '%ld') typeName = 'número inteiro';
                else if (pendingScanf.spec === '%f' || pendingScanf.spec === '%lf') typeName = 'número decimal (ex: 15.5)';
                else if (pendingScanf.spec === '%c') typeName = 'um caractere';
                else if (pendingScanf.spec === '%s') typeName = 'uma palavra / texto';

                // Mostra a saída parcial anterior se houver
                outputEl.innerHTML = '';
                if (result.output) {
                    result.output.split('\n').forEach(line => {
                        if (line.trim().length === 0) return;
                        const el = document.createElement('div');
                        el.className = 'terminal-line narrative';
                        el.innerHTML = this.formatTerminalLine(line);
                        outputEl.appendChild(el);
                    });
                }

                // Cria a linha de input interativa no terminal
                const promptRow = document.createElement('div');
                promptRow.className = 'terminal-prompt-row';
                promptRow.innerHTML = `
                    <div class="terminal-prompt-label">
                        <span style="color:#FDE047;">⌨</span> Digite ${typeName} para <code>${pendingScanf.varName || 'scanf'}</code>:
                    </div>
                    <input type="text" class="terminal-prompt-input" id="terminal-inline-input" autocomplete="off" spellcheck="false" placeholder="digite aqui e pressione Enter..." />
                    <button type="button" class="terminal-prompt-btn" id="btn-terminal-inline-send">ENVIAR ↵</button>
                `;
                outputEl.appendChild(promptRow);

                const inlineInput = promptRow.querySelector('#terminal-inline-input');
                const sendBtn = promptRow.querySelector('#btn-terminal-inline-send');

                const submitInput = () => {
                    const val = (inlineInput.value || '').trim();
                    if (val === '') return;
                    accumulatedInputs.push(val);
                    promptRow.remove();

                    // Echo visual da entrada no terminal (como no terminal real)
                    const echoEl = document.createElement('div');
                    echoEl.className = 'terminal-line highlight';
                    echoEl.innerHTML = `<span style="color:var(--text-dim);">▸</span> <span style="color:#FDE047;font-weight:700;">${val}</span>`;
                    outputEl.appendChild(echoEl);

                    // Continua a execução
                    executeStep();
                };

                sendBtn.onclick = submitInput;
                inlineInput.onkeydown = (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        submitInput();
                    }
                };

                setTimeout(() => inlineInput.focus(), 50);
            } else {
                // Execução concluída com todas as entradas resolvidas
                this.interpreter.inputCallback = null;
                outputEl.innerHTML = '';

                if (result.output) {
                    result.output.split('\n').forEach(line => {
                        if (line.trim().length === 0) return;
                        const el = document.createElement('div');
                        el.className = 'terminal-line narrative';
                        el.innerHTML = this.formatTerminalLine(line);
                        outputEl.appendChild(el);
                    });
                }

                if (result.errors && result.errors.length > 0) {
                    result.errors.forEach(err => {
                        const el = document.createElement('div');
                        el.className = 'terminal-line error';
                        el.innerHTML = '<span class="term-hl-error">[ ERRO ]</span> ' + this.formatTerminalLine(err);
                        outputEl.appendChild(el);
                    });
                } else {
                    const el = document.createElement('div');
                    el.className = 'terminal-line success';
                    el.innerHTML = '<span class="term-hl-success">[ SISTEMA ]</span> Execução concluída com sucesso.';
                    outputEl.appendChild(el);
                }
            }
        };

        executeStep();
        return { success: true };
    }

    // ─── ACTIVITY VALIDATION ───
    checkActivity(code, activityId) {
        // Alterna e destaca automaticamente a aba Testes ao submeter
        this.switchTerminalTab('tests');

        const act = this.currentActivityData;
        const testResults = document.getElementById('activity-test-results');
        if (testResults) testResults.innerHTML = '';

        if (!act) return false;

        // Se o missionValidator estiver ativo, executa validação unificada declarativa + anti-cheat
        if (this.missionValidator) {
            const validation = this.missionValidator.validateActivity(code, act);
            
            // Renderiza cada caso de teste detalhadamente na aba de Testes
            if (testResults) {
                validation.testResults.forEach((t, idx) => {
                    const el = document.createElement('div');
                    el.className = `test-case ${t.pass ? 'pass' : 'fail'}`;
                    el.innerHTML = `
                        <span class="test-icon">${t.pass ? '[PASS]' : '[FAIL]'}</span>
                        <span>${t.description}</span>
                        <span class="test-detail">${idx + 1}/${validation.testResults.length}</span>
                    `;
                    testResults.appendChild(el);
                });

                const summary = document.createElement('div');
                const passedCount = validation.testResults.filter(r => r.pass).length;
                summary.className = `test-summary ${validation.pass ? 'pass' : 'fail'}`;
                summary.textContent = `Resultado: ${passedCount}/${validation.testResults.length} — ${validation.pass ? 'APROVADO' : 'REPROVADO'}`;
                testResults.appendChild(summary);

                if (!validation.pass) {
                    if (validation.errors.length > 0) {
                        validation.errors.forEach(msg => {
                            const el = document.createElement('div');
                            el.className = 'terminal-line error';
                            el.textContent = `[ FALHA ] ${msg}`;
                            testResults.appendChild(el);
                        });
                    }

                    // Subclasse Analyst Suprema: Oráculo Algorítmico (an_algorithmic_oracle)
                    const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
                    if (this.engine && this.engine.hasSkill('an_algorithmic_oracle', user)) {
                        const oracleEl = document.createElement('div');
                        oracleEl.className = 'terminal-line hint';
                        oracleEl.style.color = '#38bdf8';
                        oracleEl.style.border = '1px solid rgba(56, 189, 248, 0.4)';
                        oracleEl.style.padding = '0.5rem 0.8rem';
                        oracleEl.style.borderRadius = '4px';
                        oracleEl.style.marginTop = '0.5rem';
                        oracleEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg> <strong>[ Oráculo Algorítmico ]:</strong> Divergência detectada nas saídas. Revise os formatos de leitura/impressão.`;
                        testResults.appendChild(oracleEl);
                    }
                }
            }

            return validation.pass;
        }

        return false;
    }



    // ─── MODAL CONTROLS ───
    showModal(title, text) {
        document.getElementById('modal-unlock-title').textContent = title;
        document.getElementById('modal-unlock-text').textContent = text;
        document.getElementById('modal-unlock').classList.remove('hidden');
    }

    hideModal() {
        document.getElementById('modal-unlock').classList.add('hidden');
    }

    showJoinGuildModal(errorMsg = '') {
        const modal = document.getElementById('modal-join-guild');
        if (modal) {
            modal.classList.remove('hidden');
            const errEl = document.getElementById('join-guild-error');
            if (errEl) errEl.textContent = errorMsg;
            const input = document.getElementById('input-guild-join-code');
            if (input) {
                input.value = '';
                input.focus();
            }
        }
    }

    hideJoinGuildModal() {
        const modal = document.getElementById('modal-join-guild');
        if (modal) modal.classList.add('hidden');
    }

    showCreateGuildModal(errorMsg = '') {
        const modal = document.getElementById('modal-create-guild');
        if (modal) {
            modal.classList.remove('hidden');
            const errEl = document.getElementById('create-guild-error');
            if (errEl) errEl.textContent = errorMsg;
            const input = document.getElementById('input-new-guild-name');
            if (input) {
                input.value = '';
                input.focus();
            }
        }
    }

    hideCreateGuildModal() {
        const modal = document.getElementById('modal-create-guild');
        if (modal) modal.classList.add('hidden');
    }

    // ─── INTERACTIVE SYSTEM ONBOARDING ───
    startInteractiveOnboarding() {
        const steps = [
            {
                targetSelector: '.top-bar-left',
                badge: 'SISTEMA — IDENTIFICAÇÃO & PERFIL',
                title: 'CONSCIÊNCIA & AVATAR',
                desc: 'Aqui você visualiza sua identidade no Sistema. Clique no seu Avatar ou Nome para abrir seu <strong>Perfil Completo</strong>, ver atributos arcanos, subclasse despertada, grimório de conquistas e títulos.'
            },
            {
                targetSelector: '.top-bar-center',
                badge: 'SISTEMA — MATRIX DE EXPERIÊNCIA',
                title: 'BARRA DE EXP & LEVEL UP',
                desc: 'Cada atividade resolvida, código executado e vitória concede XP de Ascensão. Ao preencher a barra, você sobe de Nível e desbloqueia novos privilégios e subclasses.'
            },
            {
                targetSelector: '.top-bar-right',
                badge: 'SISTEMA — RECURSOS & OFENSIVA',
                title: 'TOKENS, STREAK & AJUSTES',
                desc: 'Acompanhe seus <strong>Tokens da Guilda</strong> para compras na Loja e Convocação, sua <strong>Ofensiva Diária (Streak)</strong> com escudos de congelamento, configurações e controles de acesso.'
            },
            {
                targetSelector: '.nav-btn-missions',
                badge: 'SESSÃO 1 — MAPA MÚNDI',
                title: 'MAPA DA ASCENSÃO (16 CAPÍTULOS)',
                desc: 'O núcleo da sua jornada de programação em C. Arraste pelo mapa interativo para desbloquear novos territórios e chefões conforme purifica cada capítulo com seu código. Você também vê onde cada membro da Guilda está posicionado!'
            },
            {
                targetSelector: '.nav-btn-guild',
                badge: 'SESSÃO 2 — COLETIVIDADE',
                title: 'SALA DA GUILDA & MEMBROS',
                desc: 'Veja todos os companheiros de turma vinculados à sua Guilda, acompanhe o nível, subclasses despertadas, progresso na campanha e o ranking geral dos aprendizes.'
            },
            {
                targetSelector: '.nav-btn-gacha',
                badge: 'SESSÃO 3 — CONVOCAÇÃO ARCANO',
                title: 'PORTAL GACHA & AVATARES',
                desc: 'Invoque espíritos de código e desbloqueie avatares exclusivos de raridade Lendária, Épica e Rara no portal cósmico usando seus Tokens conquistados!'
            },
            {
                targetSelector: '.nav-btn-shop',
                badge: 'SESSÃO 4 — MERCADO ARCANO',
                title: 'LOJA DA GUILDA',
                desc: 'Gaste seus Tokens conquistados em missões e streaks para adquirir títulos cibernéticos, molduras holográficas, poções e vantagens do Sistema.'
            },
            {
                targetSelector: '.nav-btn-pvp',
                badge: 'SESSÃO 5 — DUELOS DE CÓDIGO',
                title: 'ARENA PVP & RANKED',
                desc: 'Enfrente outros Codemancers em batalhas de algoritmo em tempo real ou desafios assíncronos. Suba nos tiers de Bronze até Soberano e ganhe Renome.'
            },
            {
                targetSelector: '.nav-btn-tournament',
                badge: 'SESSÃO 6 — COMPETIÇÕES ÉPICAS',
                title: 'TORNEIOS EM TEMPO REAL',
                desc: 'Grandes eventos de batalha com chaveamento ao vivo, rounds eliminatórios e recompensas massivas em Tokens e XP para os grandes campeões da Guilda.'
            },
            {
                targetSelector: '.nav-btn-abyss',
                badge: 'SESSÃO 7 — ENDGAME & DESAFIO',
                title: 'O ABISMO DO CÓDIGO',
                desc: 'Uma espiral de andares e câmaras desafiadoras com tempo cronometrado e temporadas rotativas. Conclua todas as 5 câmaras de um andar para abrir o Baú do Abismo!'
            },
            {
                targetSelector: '.nav-btn-skills',
                badge: 'SESSÃO 8 — PROGRESSÃO DE PODER',
                title: 'ÁRVORE DE SKILLS & SUBCLASSES',
                desc: `No Nível 5 você desperta sua Subclasse (<span class="onboard-sub-chip hardcoder"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15L11 21z"/></svg> Hardcoder</span>, <span class="onboard-sub-chip analyst"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Analyst</span>, <span class="onboard-sub-chip debugger"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Debugger</span> ou <span class="onboard-sub-chip reviewer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Reviewer</span>). Invista seus Pontos de Skill para aprimorar passivas e bônus!`
            },
            {
                targetSelector: '.nav-btn-party',
                badge: 'SESSÃO 9 — COOPERAÇÃO',
                title: 'PARTY DA GUILDA',
                desc: 'Forme grupos táticos de até 4 aprendizes, envie convites para seus colegas e recebam bônus cooperativos de XP e Tokens enquanto exploram o Sistema.'
            },
            {
                targetSelector: '.mini-chat-widget',
                badge: 'SESSÃO 10 — COMUNICAÇÃO EM TEMPO REAL',
                title: 'MINI CHAT FLUTUANTE',
                desc: 'Converse com seus colegas de Guilda e membros da sua Party em tempo real diretamente pelo chat minimizado no canto da tela sem interromper sua jogatina!'
            }
        ];

        let currentStepIndex = 0;
        let overlay = document.querySelector('.onboarding-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'onboarding-overlay';
            document.body.appendChild(overlay);
        }

        let dialog = document.querySelector('.onboarding-dialog-card');
        if (!dialog) {
            dialog = document.createElement('div');
            dialog.className = 'onboarding-dialog-card';
            document.body.appendChild(dialog);
        }

        const cleanup = () => {
            if (typeof app !== 'undefined' && app.engine) {
                app.engine.completeOnboarding();
                app.engine.saveToCloud();
            }
            document.querySelectorAll('.onboarding-target-highlight').forEach(el => {
                el.classList.remove('onboarding-target-highlight');
            });
            if (overlay) overlay.classList.remove('active');
            if (dialog) dialog.remove();
            if (overlay) overlay.remove();
        };

        const renderStep = (idx) => {
            if (idx >= steps.length) {
                cleanup();
                this.showToast('Orientação concluída! Bom jogo, Codemancer.', 'success');
                return;
            }

            document.querySelectorAll('.onboarding-target-highlight').forEach(el => {
                el.classList.remove('onboarding-target-highlight');
            });

            const step = steps[idx];
            const target = document.querySelector(step.targetSelector);

            if (target) {
                target.classList.add('onboarding-target-highlight');
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            overlay.classList.add('active');

            dialog.innerHTML = `
                <div class="onboarding-step-badge">${step.badge}</div>
                <div class="onboarding-title">${step.title}</div>
                <div class="onboarding-desc">${step.desc}</div>
                <div class="onboarding-footer">
                    <button class="onboarding-btn-skip" id="btn-skip-onboard">Pular Tutorial</button>
                    <button class="glow-button primary onboarding-btn-next" id="btn-next-onboard">
                        <span class="btn-text">${idx === steps.length - 1 ? 'CONCLUIR' : 'PRÓXIMO ➔'}</span>
                        <span class="btn-glow"></span>
                    </button>
                </div>
            `;

            // Posiciona o card de forma inteligente sem cobrir o elemento
            if (target) {
                const rect = target.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const cardWidth = Math.min(440, windowWidth - 32);
                const cardHeight = dialog.offsetHeight || 220;
                const gap = 16;

                let top, left;

                // Para elementos da sidebar esquerda, prioriza posicionamento à direita
                if (target.closest('.left-nav-sidebar')) {
                    if (rect.right + gap + cardWidth <= windowWidth) {
                        top = Math.max(16, Math.min(rect.top - 20, windowHeight - cardHeight - 20));
                        left = rect.right + gap;
                    } else {
                        top = Math.max(16, rect.bottom + gap);
                        left = Math.max(16, rect.left);
                    }
                }
                // Tenta posicionar abaixo do elemento
                else if (rect.bottom + gap + cardHeight <= windowHeight) {
                    top = rect.bottom + gap;
                    left = rect.left;
                } 
                // Se não cabe abaixo, tenta posicionar acima
                else if (rect.top - gap - cardHeight >= 0) {
                    top = rect.top - gap - cardHeight;
                    left = rect.left;
                } 
                // Se não cabe nem acima nem abaixo, tenta na lateral
                else if (rect.right + gap + cardWidth <= windowWidth) {
                    top = Math.max(20, rect.top);
                    left = rect.right + gap;
                } else if (rect.left - gap - cardWidth >= 0) {
                    top = Math.max(20, rect.top);
                    left = rect.left - gap - cardWidth;
                } else {
                    // Fallback fixo na parte inferior da tela
                    top = windowHeight - cardHeight - 20;
                    left = (windowWidth - cardWidth) / 2;
                }

                // Garante que o card fique dentro dos limites horizontais da viewport
                if (left + cardWidth > windowWidth - 16) {
                    left = windowWidth - cardWidth - 16;
                }
                if (left < 16) left = 16;

                dialog.style.top = `${Math.round(top)}px`;
                dialog.style.left = `${Math.round(left)}px`;
                dialog.style.transform = 'none';
            } else {
                dialog.style.top = '50%';
                dialog.style.left = '50%';
                dialog.style.transform = 'translate(-50%, -50%)';
            }

            if (window.soundFX) window.soundFX.playTone(880, 0.06, 'sine', 0.05);

            document.getElementById('btn-next-onboard').onclick = () => {
                if (window.soundFX) window.soundFX.playClick();
                currentStepIndex++;
                renderStep(currentStepIndex);
            };

            document.getElementById('btn-skip-onboard').onclick = () => {
                if (window.soundFX) window.soundFX.playClick();
                cleanup();
            };
        };

        setTimeout(() => renderStep(0), 300);
    }

    // ─── ADMIN DASHBOARD (MULTI-GUILDA) ───
    renderAdminDashboard(guilds, currentGuild, students, parties = []) {
        this.showScreen('admin');
        const container = document.getElementById('admin-content');
        if (!container) return;

        const selectedGuildCode = currentGuild ? (currentGuild.classCode || currentGuild.guildCode || currentGuild.id) : '';
        const guildName = currentGuild ? currentGuild.name : 'Nenhuma Guilda Selecionada';

        let guildOptionsHtml = '';
        if (guilds && guilds.length > 0) {
            guildOptionsHtml = guilds.map(g => {
                const code = g.classCode || g.guildCode || g.id;
                const isSelected = code === selectedGuildCode ? 'selected' : '';
                return `<option value="${code}" ${isSelected}>${g.name} (${code})</option>`;
            }).join('');
        }

        // Mapeamento de UIDs para identificar alunos em party
        const partyMemberUids = new Set();
        (parties || []).forEach(p => {
            (p.members || []).forEach(m => partyMemberUids.add(m.uid));
        });

        container.innerHTML = `
            <div class="admin-header">
                <h2>PAINEL DO MESTRE (PROFESSOR)</h2>
                <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.3rem;">Gerencie suas Guildas, acompanhe os aprendizes, edite atividades pedagógicas e câmaras do Abismo.</p>
            </div>

            <!-- Abas do Painel do Professor -->
            <div class="admin-nav-tabs" style="display:flex;gap:0.8rem;margin:1rem 0;border-bottom:1px solid var(--border-dim);padding-bottom:0.6rem;">
                <button id="tab-admin-guilds" class="terminal-tab active" onclick="app.ui.switchAdminTab('guilds')" style="padding:0.4rem 1.2rem;font-size:0.85rem;display:inline-flex;align-items:center;gap:0.4rem;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span>MINHAS GUILDAS & APRENDIZES</span>
                </button>
                <button id="tab-admin-missions" class="terminal-tab" onclick="app.ui.switchAdminTab('missions')" style="padding:0.4rem 1.2rem;font-size:0.85rem;display:inline-flex;align-items:center;gap:0.4rem;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    <span>GESTÃO DE MISSÕES</span>
                </button>
            </div>

            <div id="admin-tab-content-missions" class="hidden">
                <!-- Preenchido dinamicamente por renderAdminMissionsManagement -->
            </div>

            <div id="admin-tab-content-guilds">
            <div class="admin-guild-selector-bar">
                <div style="flex:1;min-width:240px;">
                    <label style="display:block;font-size:0.7rem;color:var(--text-dim);margin-bottom:0.3rem;">SELECIONAR GUILDA ATIVA:</label>
                    <select id="select-admin-guild" class="name-input" style="width:100%;font-family:var(--font-code);font-size:0.85rem;" onchange="app.switchAdminGuild(this.value)">
                        ${guildOptionsHtml || '<option value="">Nenhuma Guilda criada</option>'}
                    </select>
                </div>
                <div>
                    <button class="glow-button primary" style="height:38px;margin-top:1rem;" onclick="app.ui.showCreateGuildModal()">
                        <span class="btn-text">+ FORJAR NOVA GUILDA</span>
                        <span class="btn-glow"></span>
                    </button>
                </div>
            </div>

            ${currentGuild ? `
                <div class="class-code-box" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.2rem;margin:1rem 0;padding:1rem 1.4rem;width:100%;background:var(--bg-panel);border:1px solid var(--border-dim);border-radius:4px;">
                    <div style="flex:1;min-width:240px;">
                        <div style="font-size:0.75rem;color:var(--text-dim);display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap;">
                            <span>GUILDA ATUAL: <strong style="color:var(--text-primary);font-size:0.95rem;">${guildName}</strong></span>
                            <button class="glow-button" style="padding:0.25rem 0.65rem;font-size:0.62rem;border-color:var(--purple-dim);" onclick="app.ui.showEditGuildModal('${selectedGuildCode}', '${guildName.replace(/'/g, "\\'")}')" title="Editar nome desta guilda">
                                ✎ EDITAR NOME
                            </button>
                            <button class="student-kick-btn" style="padding:0.25rem 0.65rem;font-size:0.62rem;" onclick="app.confirmDeleteGuild('${selectedGuildCode}', '${guildName.replace(/'/g, "\\'")}')" title="Excluir permanentemente esta guilda">
                                ✕ EXCLUIR GUILDA
                            </button>
                        </div>
                        <div class="system-text" style="font-size:0.75rem;margin-top:0.4rem;">CÓDIGO DE CONVOCAÇÃO DOS ALUNOS:</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.8rem;background:var(--bg-deep);padding:0.5rem 1rem;border:1px solid var(--purple-dim);border-radius:4px;">
                        <span class="accent-text" style="font-size:1.4rem;letter-spacing:0.12em;font-weight:bold;">${selectedGuildCode}</span>
                        <button class="glow-button primary" style="padding:0.35rem 0.85rem;font-size:0.68rem;" onclick="navigator.clipboard.writeText('${selectedGuildCode}');app.ui.showToast('Código copiado!', 'info')">COPIAR</button>
                    </div>
                </div>

                <div class="admin-stats">
                    <div class="stat-card">
                        <div class="stat-val">${students.length}</div>
                        <div class="stat-label">Aprendizes Inscritos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val">${(parties || []).length}</div>
                        <div class="stat-label">Parties Formadas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val">${students.filter(s => {
                            const gp = s.gameProgress || {};
                            return (gp.chapters && Object.keys(gp.chapters).length > 0) || (gp.xp && gp.xp > 0) || (gp.level && gp.level > 1);
                        }).length}</div>
                        <div class="stat-label">Ativos na Guilda</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val">${students.length > 0 ? Math.round(students.reduce((acc, s) => acc + ((s.gameProgress && s.gameProgress.xp) || 0), 0) / students.length) : 0}</div>
                        <div class="stat-label">Média de XP</div>
                    </div>
                </div>

                <!-- ════════ SEÇÃO DE PARTIES FORMADAS ════════ -->
                <div style="margin: 1.8rem 0 1.2rem 0;">
                    <h3 style="margin:0 0 0.6rem 0;color:var(--cyan);font-size:0.85rem;letter-spacing:0.1em;display:flex;justify-content:space-between;align-items:center;">
                        <span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.35rem;color:var(--cyan);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> PARTIES FORMADAS (${(parties || []).length})</span>
                    </h3>

                    ${(!parties || parties.length === 0) ? `
                        <div class="pvp-empty" style="text-align:center;padding:1.5rem;background:var(--bg-panel);border:1px dashed var(--border-dim);font-size:0.8rem;">
                            Nenhuma Party foi formada nesta Guilda ainda. Os aprendizes podem forjar grupos de até 4 integrantes pela aba PARTY.
                        </div>
                    ` : `
                        <div class="admin-party-grid">
                            ${parties.map(p => {
                                const members = p.members || [];
                                return `
                                    <div class="admin-party-card">
                                        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border-dim);padding-bottom:0.5rem;">
                                            <div>
                                                <strong style="font-family:var(--font-display);color:#fff;font-size:0.92rem;">${p.name}</strong>
                                                <div style="font-size:0.68rem;color:var(--text-dim);font-family:var(--font-code);">CÓDIGO: <span style="color:var(--gold);">${p.code || p.id}</span></div>
                                            </div>
                                            <span style="font-size:0.72rem;background:rgba(6,182,212,0.15);color:var(--cyan);border:1px solid var(--cyan);padding:0.15rem 0.5rem;border-radius:12px;font-weight:700;">
                                                ${members.length}/4 Integrantes
                                            </span>
                                        </div>
                                        <div style="display:flex;flex-direction:column;gap:0.4rem;">
                                            ${members.map(m => {
                                                const isLdr = m.uid === p.leaderUid;
                                                const subData = (typeof SUBCLASSES_DATA !== 'undefined' && m.subclass) ? SUBCLASSES_DATA[m.subclass] : null;
                                                return `
                                                    <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.25);padding:0.35rem 0.6rem;border-radius:4px;">
                                                        <div style="display:flex;align-items:center;gap:0.5rem;">
                                                            <div style="width:24px;height:24px;border-radius:50%;overflow:hidden;border:1px solid var(--border-bright);">
                                                                <img src="${m.photoURL || 'assets/avatars/avatar_02.png'}" style="width:100%;height:100%;object-fit:cover;" />
                                                            </div>
                                                            <span style="font-size:0.75rem;font-weight:600;color:var(--text-primary);">${m.displayName || 'Aprendiz'}</span>
                                                            ${isLdr ? `<span style="font-size:0.6rem;color:var(--gold);font-weight:bold;">[LÍDER]</span>` : ''}
                                                        </div>
                                                        <div style="display:flex;align-items:center;gap:0.4rem;">
                                                            <span style="font-size:0.68rem;color:var(--cyan);">LV. ${m.level || 1}</span>
                                                            ${subData ? `
                                                                <span style="font-size:0.62rem;color:${subData.color};background:rgba(0,0,0,0.4);border:1px solid ${subData.color};padding:0.05rem 0.35rem;border-radius:8px;">
                                                                    ${subData.badge} ${subData.name}
                                                                </span>
                                                            ` : ''}
                                                        </div>
                                                    </div>
                                                `;
                                            }).join('')}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `}
                </div>

                <div style="margin:1.8rem 0 0.8rem 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.8rem;">
                    <h3 style="margin:0;color:var(--purple-bright);font-size:0.85rem;letter-spacing:0.1em;display:flex;align-items:center;gap:0.4rem;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span>APRENDIZES DA GUILDA (${students.length})</span>
                    </h3>
                    <button class="glow-button primary" style="padding:0.35rem 0.9rem;font-size:0.75rem;" onclick="app.openAdminAddStudentModal('${selectedGuildCode}', '${guildName.replace(/'/g, "\\'")}')">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> + INSERIR APRENDIZ NA GUILDA
                    </button>
                </div>

                ${students.length === 0 ? `
                    <div class="pvp-empty" style="text-align:center;padding:2rem 1rem;background:var(--bg-panel);border:1px dashed var(--border-dim);">
                        Nenhum aprendiz ingressou nesta Guilda ainda.<br/>
                        Distribua o código <strong>${selectedGuildCode}</strong> para que os alunos possam se vincular.
                    </div>
                ` : `
                    <div class="student-list">
                        ${students.map(s => {
                            const gp = s.gameProgress || {};
                            const chapters = gp.chapters ? Object.values(gp.chapters).filter(c => c.completed).length : 0;
                            const level = gp.level || 1;
                            const xp = gp.xp || 0;
                            const name = s.displayName || s.email?.split('@')[0] || 'Aprendiz';
                            const email = s.email || 'aluno@guildcode.com';
                            const avatarSrc = s.photoURL || 'assets/avatars/avatar_02.png';
                            const renome = gp.renome !== undefined ? gp.renome : 100;
                            const tier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(renome) : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' };
                            const isInParty = partyMemberUids.has(s.uid);
                            const studentSubData = (typeof SUBCLASSES_DATA !== 'undefined' && gp.subclass) ? SUBCLASSES_DATA[gp.subclass] : null;
                            const absences = gp.redeemedRewards?.absences || 0;
                            const extraPts = gp.redeemedRewards?.extraPoints || 0.0;
                            const streakDays = gp.streak?.current || 0;
                            const tokensCount = gp.tokens !== undefined ? gp.tokens : 0;

                            return `
                                <div class="admin-student-card">
                                    <!-- Topo: Avatar, Nome, Email e Ação de Expulsar -->
                                    <div class="admin-student-header">
                                        <div class="admin-student-avatar" style="border-color:${tier.color}" onclick="app.openPlayerProfile('${s.uid}')" title="Ver Perfil">
                                            <img src="${avatarSrc}" alt="${name}">
                                        </div>
                                        <div class="admin-student-main-info">
                                            <div class="admin-student-name-row">
                                                <h4 class="admin-student-name" onclick="app.openPlayerProfile('${s.uid}')" title="Ver Perfil">${name}</h4>
                                                <span class="admin-student-tier" style="color:${tier.color}; border-color:${tier.color}40;">${tier.icon} ${tier.name}</span>
                                            </div>
                                            <span class="admin-student-email">${email}</span>
                                        </div>
                                        <button class="student-kick-btn" onclick="app.confirmKickStudent('${s.uid}', '${name.replace(/'/g, "\\'")}', '${selectedGuildCode}')" title="Expulsar aluno da Guilda">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                                <circle cx="8.5" cy="7" r="4"/>
                                                <line x1="18" y1="8" x2="23" y2="13"/>
                                                <line x1="23" y1="8" x2="18" y2="13"/>
                                            </svg>
                                            <span>REMOVER</span>
                                        </button>
                                    </div>

                                    <!-- Tags de Status e Arquétipo -->
                                    <div class="admin-student-tags-row">
                                        <span class="admin-lvl-badge">LV. ${String(level).padStart(2, '0')} (${xp} XP)</span>
                                        ${studentSubData ? `
                                            <span class="admin-subclass-badge" style="color:${studentSubData.color}; border-color:${studentSubData.color}40; background:${studentSubData.color}15;">
                                                ${studentSubData.badge} ${studentSubData.name}
                                            </span>
                                        ` : '<span class="admin-no-subclass">SEM SUBCLASSE</span>'}
                                        <span class="admin-party-status ${isInParty ? 'in-party' : 'solo'}">
                                            ${isInParty ? '👥 EM PARTY' : 'SOLO'}
                                        </span>
                                    </div>

                                    <!-- Barra de Progresso da Campanha -->
                                    <div class="admin-student-progress-box">
                                        <div class="admin-progress-labels">
                                            <span>Campanha Concluída</span>
                                            <strong>${chapters} / 15 Capítulos</strong>
                                        </div>
                                        <div class="admin-progress-track">
                                            <div class="admin-progress-fill" style="width:${Math.min(100, Math.round((chapters / 15) * 100))}%;"></div>
                                        </div>
                                    </div>

                                    <!-- Métricas & Auditoria Acadêmica -->
                                    <div class="admin-student-metrics-grid">
                                        <div class="admin-metric-chip" title="Saldo de Tokens da Guilda">
                                            <span class="metric-lbl">Tokens</span>
                                            <strong class="metric-val" style="color:var(--gold);">${tokensCount}</strong>
                                        </div>
                                        <div class="admin-metric-chip" title="Dias Consecutivos de Ofensiva">
                                            <span class="metric-lbl">Streak</span>
                                            <strong class="metric-val" style="color:#f97316;">${streakDays}d 🔥</strong>
                                        </div>
                                        <div class="admin-metric-chip" title="Faltas Justificadas no Semestre">
                                            <span class="metric-lbl">Faltas</span>
                                            <strong class="metric-val" style="color:var(--cyan);">${absences} / 12</strong>
                                        </div>
                                        <div class="admin-metric-chip" title="Pontos Extras Obtidos">
                                            <span class="metric-lbl">Pts Extras</span>
                                            <strong class="metric-val" style="color:var(--gold);">+${extraPts.toFixed(1)} / 4.0</strong>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            ` : `
                <div class="pvp-empty" style="text-align:center;padding:3rem 1rem;background:var(--bg-panel);border:1px dashed var(--border-dim);margin-top:1rem;">
                    Você ainda não possui nenhuma Guilda criada.<br/>
                    Clique em <strong>[ + FORJAR NOVA GUILDA ]</strong> acima para começar.
                </div>
            `}
            </div>
        `;
    }

    switchAdminTab(tabKey) {
        const tabGuildsBtn = document.getElementById('tab-admin-guilds');
        const tabMissionsBtn = document.getElementById('tab-admin-missions');
        const guildsContent = document.getElementById('admin-tab-content-guilds');
        const missionsContent = document.getElementById('admin-tab-content-missions');

        if (tabKey === 'missions') {
            if (tabGuildsBtn) tabGuildsBtn.classList.remove('active');
            if (tabMissionsBtn) tabMissionsBtn.classList.add('active');
            if (guildsContent) guildsContent.classList.add('hidden');
            if (missionsContent) {
                missionsContent.classList.remove('hidden');
                this.renderAdminMissionsManagement();
            }
        } else {
            if (tabGuildsBtn) tabGuildsBtn.classList.add('active');
            if (tabMissionsBtn) tabMissionsBtn.classList.remove('active');
            if (guildsContent) guildsContent.classList.remove('hidden');
            if (missionsContent) missionsContent.classList.add('hidden');
        }
    }

    renderAdminMissionsManagement(activeSubTab = 'chapters') {
        const container = document.getElementById('admin-tab-content-missions');
        if (!container) return;

        const chapters = (typeof missionsManager !== 'undefined') ? missionsManager.getChapters() : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
        const abyssFloors = (typeof missionsManager !== 'undefined') ? missionsManager.getAbyssFloors() : (typeof SIDE_QUESTS !== 'undefined' ? SIDE_QUESTS : {});

        let html = `
            <div style="background:var(--bg-panel);border:1px solid var(--border-dim);border-radius:6px;padding:1.2rem;margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;border-bottom:1px solid var(--border-dim);padding-bottom:0.8rem;">
                    <div style="display:flex;gap:0.6rem;">
                        <button class="glow-button ${activeSubTab === 'chapters' ? 'primary' : ''}" style="padding:0.35rem 1rem;font-size:0.75rem;" onclick="app.ui.renderAdminMissionsManagement('chapters')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> MISSÕES DA CAMPANHA (${chapters.length} CAPÍTULOS)
                        </button>
                        <button class="glow-button ${activeSubTab === 'abyss' ? 'primary' : ''}" style="padding:0.35rem 1rem;font-size:0.75rem;" onclick="app.ui.renderAdminMissionsManagement('abyss')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> CÂMARAS DO ABISMO (${Object.keys(abyssFloors).length} ANDARES)
                        </button>
                    </div>
                    <div style="font-size:0.72rem;color:var(--text-dim);font-family:var(--font-code);">
                        STATUS FIRESTORE: <span style="color:#22c55e;">● CONECTADO</span>
                    </div>
                </div>
        `;

        if (activeSubTab === 'chapters') {
            html += `
                <div style="display:flex;flex-direction:column;gap:1rem;">
                    ${chapters.map((ch, chIdx) => {
                        const acts = ch.activities || [];
                        return `
                            <div style="background:rgba(0,0,0,0.3);border:1px solid var(--border-dim);border-radius:4px;overflow:hidden;">
                                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.8rem 1rem;background:rgba(123,94,167,0.12);border-bottom:1px solid var(--border-dim);">
                                    <div>
                                        <span style="font-family:var(--font-code);color:var(--gold);font-size:0.75rem;font-weight:bold;">CAPÍTULO ${String(ch.id).padStart(2, '0')}</span>
                                        <strong style="margin-left:0.6rem;color:#fff;font-size:0.9rem;">${ch.title}</strong>
                                        <span style="margin-left:0.5rem;font-size:0.75rem;color:var(--text-dim);">(${ch.theme || 'Programação em C'})</span>
                                    </div>
                                    <button class="glow-button primary" style="padding:0.25rem 0.7rem;font-size:0.68rem;" onclick="app.ui.openCreateActivityModal('chapter', ${ch.id})">
                                        + ADICIONAR ATIVIDADE
                                    </button>
                                </div>
                                <div style="padding:0.6rem 1rem;display:flex;flex-direction:column;gap:0.5rem;">
                                    ${acts.length === 0 ? `<p style="font-size:0.75rem;color:var(--text-dim);margin:0.5rem 0;">Nenhuma atividade cadastrada neste capítulo.</p>` : ''}
                                    ${acts.map((act, actIdx) => `
                                        <div style="display:flex;justify-content:space-between;align-items:center;background:var(--bg-deep);padding:0.5rem 0.8rem;border:1px solid var(--border-dim);border-radius:4px;">
                                            <div style="display:flex;align-items:center;gap:0.8rem;">
                                                <span style="font-family:var(--font-code);font-size:0.7rem;color:var(--purple-bright);background:rgba(167,139,250,0.15);padding:0.1rem 0.4rem;border-radius:3px;">
                                                    ${act.id || `ch${ch.id}_a${actIdx+1}`}
                                                </span>
                                                <span style="font-size:0.82rem;font-weight:600;color:var(--text-primary);">${act.title}</span>
                                                <span class="difficulty-badge ${act.difficulty || 'easy'}" style="font-size:0.6rem;padding:0.1rem 0.4rem;">
                                                    ${(act.difficulty || 'easy').toUpperCase()}
                                                </span>
                                                <span style="font-size:0.7rem;color:var(--text-dim);">
                                                    ${(act.tests || []).length} caso(s) de teste
                                                </span>
                                            </div>
                                            <div style="display:flex;gap:0.4rem;">
                                                <button class="glow-button" style="padding:0.2rem 0.6rem;font-size:0.65rem;" onclick="app.ui.openEditActivityModal('chapter', ${ch.id}, ${actIdx})">
                                                    ✎ EDITAR
                                                </button>
                                                <button class="student-kick-btn" style="padding:0.2rem 0.6rem;font-size:0.65rem;" onclick="app.ui.confirmDeleteActivity('chapter', ${ch.id}, ${actIdx}, '${(act.title || '').replace(/'/g, "\\'")}')">
                                                    ✕ EXCLUIR
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } else {
            html += `
                <div style="display:flex;flex-direction:column;gap:1rem;">
                    ${Object.entries(abyssFloors).map(([floorKey, quests]) => {
                        const qList = Array.isArray(quests) ? quests : [];
                        return `
                            <div style="background:rgba(0,0,0,0.3);border:1px solid var(--border-dim);border-radius:4px;overflow:hidden;">
                                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.8rem 1rem;background:rgba(168,85,247,0.12);border-bottom:1px solid var(--border-dim);">
                                    <div>
                                        <span style="font-family:var(--font-code);color:var(--cyan);font-size:0.75rem;font-weight:bold;">ANDAR ${floorKey}</span>
                                        <strong style="margin-left:0.6rem;color:#fff;font-size:0.9rem;">Câmaras do Abismo</strong>
                                        <span style="margin-left:0.5rem;font-size:0.75rem;color:var(--text-dim);">(${qList.length} Desafios)</span>
                                    </div>
                                    <button class="glow-button primary" style="padding:0.25rem 0.7rem;font-size:0.68rem;" onclick="app.ui.openCreateActivityModal('abyss', '${floorKey}')">
                                        + ADICIONAR CÂMARA
                                    </button>
                                </div>
                                <div style="padding:0.6rem 1rem;display:flex;flex-direction:column;gap:0.5rem;">
                                    ${qList.length === 0 ? `<p style="font-size:0.75rem;color:var(--text-dim);margin:0.5rem 0;">Nenhuma câmara cadastrada neste andar.</p>` : ''}
                                    ${qList.map((q, qIdx) => `
                                        <div style="display:flex;justify-content:space-between;align-items:center;background:var(--bg-deep);padding:0.5rem 0.8rem;border:1px solid var(--border-dim);border-radius:4px;">
                                            <div style="display:flex;align-items:center;gap:0.8rem;">
                                                <span style="font-family:var(--font-code);font-size:0.7rem;color:var(--cyan);background:rgba(6,182,212,0.15);padding:0.1rem 0.4rem;border-radius:3px;">
                                                    ${q.id || `sq${floorKey}_${qIdx+1}`}
                                                </span>
                                                <span style="font-size:0.82rem;font-weight:600;color:var(--text-primary);">${q.title}</span>
                                                <span class="difficulty-badge ${q.difficulty || 'medium'}" style="font-size:0.6rem;padding:0.1rem 0.4rem;">
                                                    ${(q.difficulty || 'medium').toUpperCase()}
                                                </span>
                                                <span style="font-size:0.7rem;color:var(--text-dim);">
                                                    ⏱ ${q.timeLimit || 300}s | <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg> +${q.xp || 35} XP
                                                </span>
                                            </div>
                                            <div style="display:flex;gap:0.4rem;">
                                                <button class="glow-button" style="padding:0.2rem 0.6rem;font-size:0.65rem;" onclick="app.ui.openEditActivityModal('abyss', '${floorKey}', ${qIdx})">
                                                    ✎ EDITAR
                                                </button>
                                                <button class="student-kick-btn" style="padding:0.2rem 0.6rem;font-size:0.65rem;" onclick="app.ui.confirmDeleteActivity('abyss', '${floorKey}', ${qIdx}, '${(q.title || '').replace(/'/g, "\\'")}')">
                                                    ✕ EXCLUIR
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        html += `</div>`;
        container.innerHTML = html;
    }

    openEditActivityModal(mode, parentId, itemIdx) {
        const modal = document.getElementById('modal-edit-mission');
        const modalBody = document.getElementById('modal-mission-body');
        const titleEl = document.getElementById('modal-mission-title');
        const saveBtn = document.getElementById('btn-save-mission-editor');
        if (!modal || !modalBody) return;

        let act = null;
        if (mode === 'chapter') {
            act = missionsManager.getChapterActivity(parentId, itemIdx);
            titleEl.textContent = `EDITAR ATIVIDADE (CAPÍTULO ${parentId})`;
        } else {
            act = missionsManager.getAbyssChamber(parentId, itemIdx);
            titleEl.textContent = `EDITAR CÂMARA (ANDAR ${parentId})`;
        }

        if (!act) return;

        const testsJson = JSON.stringify(act.tests || [], null, 2);
        const reqPatterns = (act.validationRules?.requiredPatterns || []).join(', ');
        const forbPatterns = (act.validationRules?.forbiddenPatterns || []).join(', ');

        modalBody.innerHTML = `
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">ID DA ATIVIDADE (IMUTÁVEL):</label>
                <input id="edit-mission-id" class="name-input" type="text" value="${act.id || ''}" disabled style="width:100%;opacity:0.7;" />
            </div>
            <div style="display:flex;gap:1rem;">
                <div style="flex:2;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">TÍTULO DA MISSÃO:</label>
                    <input id="edit-mission-title" class="name-input" type="text" value="${act.title || ''}" style="width:100%;" />
                </div>
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">DIFICULDADE:</label>
                    <select id="edit-mission-diff" class="name-input" style="width:100%;">
                        <option value="easy" ${act.difficulty === 'easy' ? 'selected' : ''}>FÁCIL (Easy)</option>
                        <option value="medium" ${act.difficulty === 'medium' ? 'selected' : ''}>MÉDIO (Medium)</option>
                        <option value="hard" ${act.difficulty === 'hard' ? 'selected' : ''}>DIFÍCIL (Hard)</option>
                    </select>
                </div>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">ENUNCIADO / DESCRIÇÃO (HTML PERMITIDO):</label>
                <textarea id="edit-mission-desc" class="name-input" rows="4" style="width:100%;font-family:var(--font-main);font-size:0.8rem;resize:vertical;">${act.description || ''}</textarea>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">CÓDIGO INICIAL (STARTER CODE EM C):</label>
                <textarea id="edit-mission-starter" class="name-input" rows="5" style="width:100%;font-family:var(--font-code);font-size:0.8rem;resize:vertical;">${act.starterCode || ''}</textarea>
            </div>
            <div style="display:flex;gap:1rem;">
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">PALAVRAS-CHAVE OBRIGATÓRIAS (Separadas por vírgula):</label>
                    <input id="edit-mission-required" class="name-input" type="text" value="${reqPatterns}" placeholder="Ex: printf, scanf, if" style="width:100%;" />
                </div>
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">PALAVRAS PROIBIDAS (Separadas por vírgula):</label>
                    <input id="edit-mission-forbidden" class="name-input" type="text" value="${forbPatterns}" placeholder="Ex: goto" style="width:100%;" />
                </div>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">CASOS DE TESTE (JSON):</label>
                <textarea id="edit-mission-tests" class="name-input" rows="6" style="width:100%;font-family:var(--font-code);font-size:0.75rem;resize:vertical;">${testsJson}</textarea>
            </div>
        `;

        saveBtn.onclick = async () => {
            try {
                let parsedTests = [];
                try {
                    parsedTests = JSON.parse(document.getElementById('edit-mission-tests').value);
                } catch (e) {
                    this.showToast('Erro no formato JSON dos casos de teste!', 'error');
                    return;
                }

                const reqList = document.getElementById('edit-mission-required').value.split(',').map(s => s.trim()).filter(Boolean);
                const forbList = document.getElementById('edit-mission-forbidden').value.split(',').map(s => s.trim()).filter(Boolean);

                const updatedAct = {
                    ...act,
                    title: document.getElementById('edit-mission-title').value.trim(),
                    difficulty: document.getElementById('edit-mission-diff').value,
                    description: document.getElementById('edit-mission-desc').value,
                    starterCode: document.getElementById('edit-mission-starter').value,
                    tests: parsedTests,
                    validationRules: {
                        requiredPatterns: reqList,
                        forbiddenPatterns: forbList
                    }
                };

                saveBtn.disabled = true;
                saveBtn.innerHTML = '<span class="btn-text">SALVANDO...</span>';

                if (mode === 'chapter') {
                    await missionsManager.saveChapterActivity(parentId, itemIdx, updatedAct);
                } else {
                    await missionsManager.saveAbyssChamber(parentId, itemIdx, updatedAct);
                }

                this.showToast('Missão salva no Firestore com sucesso!', 'success');
                this.closeEditMissionModal();
                this.renderAdminMissionsManagement(mode === 'chapter' ? 'chapters' : 'abyss');
            } catch (err) {
                console.error('[UI] Erro ao salvar atividade:', err);
                this.showToast('Erro ao salvar no Firestore: ' + err.message, 'error');
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<span class="btn-text">SALVAR NO FIRESTORE</span><span class="btn-glow"></span>';
            }
        };

        modal.classList.remove('hidden');
    }

    openCreateActivityModal(mode, parentId) {
        const modal = document.getElementById('modal-edit-mission');
        const modalBody = document.getElementById('modal-mission-body');
        const titleEl = document.getElementById('modal-mission-title');
        const saveBtn = document.getElementById('btn-save-mission-editor');
        if (!modal || !modalBody) return;

        const newId = mode === 'chapter' ? `ch${parentId}_a${Date.now().toString().slice(-4)}` : `sq${parentId}_${Date.now().toString().slice(-4)}`;
        titleEl.textContent = mode === 'chapter' ? `NOVA ATIVIDADE (CAPÍTULO ${parentId})` : `NOVA CÂMARA (ANDAR ${parentId})`;

        modalBody.innerHTML = `
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">ID DA ATIVIDADE:</label>
                <input id="edit-mission-id" class="name-input" type="text" value="${newId}" style="width:100%;" />
            </div>
            <div style="display:flex;gap:1rem;">
                <div style="flex:2;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">TÍTULO DA MISSÃO:</label>
                    <input id="edit-mission-title" class="name-input" type="text" placeholder="Nome do desafio" style="width:100%;" />
                </div>
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">DIFICULDADE:</label>
                    <select id="edit-mission-diff" class="name-input" style="width:100%;">
                        <option value="easy">FÁCIL (Easy)</option>
                        <option value="medium">MÉDIO (Medium)</option>
                        <option value="hard">DIFÍCIL (Hard)</option>
                    </select>
                </div>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">ENUNCIADO / DESCRIÇÃO:</label>
                <textarea id="edit-mission-desc" class="name-input" rows="4" style="width:100%;font-family:var(--font-main);font-size:0.8rem;resize:vertical;" placeholder="Descreva o que o aluno deve programar..."></textarea>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">CÓDIGO INICIAL (STARTER CODE EM C):</label>
                <textarea id="edit-mission-starter" class="name-input" rows="5" style="width:100%;font-family:var(--font-code);font-size:0.8rem;resize:vertical;">#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}</textarea>
            </div>
            <div style="display:flex;gap:1rem;">
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">PALAVRAS-CHAVE OBRIGATÓRIAS:</label>
                    <input id="edit-mission-required" class="name-input" type="text" placeholder="Ex: printf, scanf" style="width:100%;" />
                </div>
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">PALAVRAS PROIBIDAS:</label>
                    <input id="edit-mission-forbidden" class="name-input" type="text" placeholder="Ex: goto" style="width:100%;" />
                </div>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">CASOS DE TESTE (JSON):</label>
                <textarea id="edit-mission-tests" class="name-input" rows="6" style="width:100%;font-family:var(--font-code);font-size:0.75rem;resize:vertical;">[
  {
    "input": "",
    "expected": "Saída esperada",
    "description": "Teste 1"
  }
]</textarea>
            </div>
        `;

        saveBtn.onclick = async () => {
            try {
                let parsedTests = [];
                try {
                    parsedTests = JSON.parse(document.getElementById('edit-mission-tests').value);
                } catch (e) {
                    this.showToast('Erro no formato JSON dos casos de teste!', 'error');
                    return;
                }

                const title = document.getElementById('edit-mission-title').value.trim();
                if (!title) {
                    this.showToast('Informe um título para a missão!', 'error');
                    return;
                }

                const reqList = document.getElementById('edit-mission-required').value.split(',').map(s => s.trim()).filter(Boolean);
                const forbList = document.getElementById('edit-mission-forbidden').value.split(',').map(s => s.trim()).filter(Boolean);

                const newAct = {
                    id: document.getElementById('edit-mission-id').value.trim() || newId,
                    title,
                    difficulty: document.getElementById('edit-mission-diff').value,
                    description: document.getElementById('edit-mission-desc').value,
                    starterCode: document.getElementById('edit-mission-starter').value,
                    hints: [],
                    tests: parsedTests,
                    validationRules: {
                        requiredPatterns: reqList,
                        forbiddenPatterns: forbList
                    }
                };

                if (mode === 'abyss') {
                    newAct.timeLimit = 300;
                    newAct.xp = newAct.difficulty === 'easy' ? 20 : 35;
                }

                saveBtn.disabled = true;
                saveBtn.innerHTML = '<span class="btn-text">CRIANDO...</span>';

                if (mode === 'chapter') {
                    await missionsManager.saveChapterActivity(parentId, -1, newAct);
                } else {
                    await missionsManager.saveAbyssChamber(parentId, -1, newAct);
                }

                this.showToast('Nova missão criada no Firestore com sucesso!', 'success');
                this.closeEditMissionModal();
                this.renderAdminMissionsManagement(mode === 'chapter' ? 'chapters' : 'abyss');
            } catch (err) {
                console.error('[UI] Erro ao criar atividade:', err);
                this.showToast('Erro ao criar no Firestore: ' + err.message, 'error');
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<span class="btn-text">SALVAR NO FIRESTORE</span><span class="btn-glow"></span>';
            }
        };

        modal.classList.remove('hidden');
    }

    async confirmDeleteActivity(mode, parentId, itemIdx, title) {
        if (!confirm(`Tem certeza que deseja excluir permanentemente a missão "${title}"?`)) return;

        try {
            if (mode === 'chapter') {
                await missionsManager.deleteChapterActivity(parentId, itemIdx);
            } else {
                await missionsManager.deleteAbyssChamber(parentId, itemIdx);
            }
            this.showToast('Missão excluída com sucesso!', 'info');
            this.renderAdminMissionsManagement(mode === 'chapter' ? 'chapters' : 'abyss');
        } catch (e) {
            console.error('[UI] Erro ao excluir missão:', e);
            this.showToast('Erro ao excluir: ' + e.message, 'error');
        }
    }

    closeEditMissionModal() {
        const modal = document.getElementById('modal-edit-mission');
        if (modal) modal.classList.add('hidden');
    }

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
            membersCards = members.map(m => {
                const gp = m.gameProgress || {};
                const lvl = gp.level || 1;
                const renome = gp.renome !== undefined ? gp.renome : 100;
                const cp = gp.codePower || 1000;
                const tier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(renome) : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' };
                const completedChapters = gp.chapters ? Object.values(gp.chapters).filter(c => c && c.completed).length : 0;
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
                                <span class="stat-box-lbl">Code Power</span>
                                <span class="stat-box-val" style="color:var(--purple-bright);">${cp} CP</span>
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
                        <div class="profile-stat-label">Code Power (MMR)</div>
                        <div class="profile-stat-val" style="color:var(--purple-bright)">${cp} CP</div>
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

    // ─── RANKED SCREEN (DESAFIOS + RANKING DA GUILDA) ───
    async renderRankedScreen(challenges, cachedLeaderboard = null) {
        this.showScreen('ranked');
        const container = document.getElementById('ranked-content');
        if (!container) return;

        let leaderboard = cachedLeaderboard;
        if (!leaderboard && typeof rankedManager !== 'undefined') {
            leaderboard = await rankedManager.getGuildLeaderboard();
        }
        if (!leaderboard) leaderboard = [];

        const myRenome = (this.engine.state.renome !== undefined) ? this.engine.state.renome : 100;
        const myTier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(myRenome) : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' };
        const myCP = this.engine.state.codePower || 1000;

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
                                <th style="padding:0.6rem 0.8rem;text-align:right;">CODE POWER</th>
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
                                        <td style="padding:0.7rem 0.8rem;text-align:right;color:var(--purple-bright);font-family:var(--font-code);">${item.codePower} CP</td>
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

        container.innerHTML = '<div class="pvp-screen">'
            + '<div class="pvp-header">'
            + '<div>'
            + '<h2 class="pvp-title">DUELOS PVP & RANKING DA GUILDA</h2>'
            + '<p class="pvp-subtitle">Duelos de código assíncronos: o desafiante resolve uma sequência de desafios primeiro; ao enviar, o adversário aceita e joga imediatamente contra o tempo. Quem resolver mais rápido e com código correto pontua mais alto e vence a partida!</p>'
            + '</div>'
            + '<div style="display:flex;align-items:center;gap:1.2rem;background:rgba(0,0,0,0.3);padding:0.6rem 1.2rem;border:1px solid var(--border-dim);border-radius:4px;">'
            + '<div><span style="font-size:0.65rem;color:var(--text-dim);display:block;">SEU TIER</span><span class="tier-badge" style="color:' + myTier.color + ';border-color:' + myTier.color + '">' + myTier.icon + ' ' + myTier.name + '</span></div>'
            + '<div><span style="font-size:0.65rem;color:var(--text-dim);display:block;">RENOME</span><span style="color:var(--gold);font-weight:700;font-size:0.9rem;">' + myRenome + ' ★</span></div>'
            + '<div><span style="font-size:0.65rem;color:var(--text-dim);display:block;">CODE POWER</span><span style="color:var(--purple-bright);font-weight:700;font-size:0.9rem;">' + myCP + ' CP</span></div>'
            + '</div>'
            + '</div>'
            + '<div class="pvp-actions" style="margin-bottom:1.5rem;">'
            + '<button class="glow-button primary" onclick="app.showChallengeSelector()">⚔ CRIAR NOVO DESAFIO</button>'
            + '</div>'
            + '<div class="pvp-section">'
            + '<h3 class="pvp-section-title">DESAFIOS PENDENTES (' + (challenges ? challenges.length : 0) + ')</h3>'
            + (!challenges || challenges.length === 0
                ? '<p class="pvp-empty">Nenhum desafio pendente no momento.</p>'
                : '<div class="pvp-challenge-list">' + challenges.map(c =>
                    '<div class="pvp-challenge-card">'
                    + '<div class="pvp-challenge-info">'
                    + '<div class="pvp-challenge-name">' + (c.challengerName || 'Jogador') + '</div>'
                    + '<div class="pvp-challenge-detail">Capítulo: ' + (c.chapterTitle || '---') + '</div>'
                    + '</div>'
                    + '<button class="glow-button primary pvp-challenge-btn" onclick="app.acceptChallenge(\'' + c.id + '\')">ACEITAR</button>'
                    + '</div>'
                ).join('') + '</div>'
            )
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
                </div>

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

        overlay.innerHTML = `
            <div class="level-up-card">
                <div class="level-up-badge-top">◆ EVOLUÇÃO DE CLASSE ◆</div>
                <h2 class="level-up-title">LEVEL UP!</h2>
                <div class="level-up-number">LV. ${String(newLevel).padStart(2, '0')}</div>
                <p class="level-up-desc">Sua maestria com a linguagem C aumentou e novas habilidades foram destravadas.</p>
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

        const shopCatalog = [
            {
                id: 'absence',
                type: 'academic',
                name: 'Pergaminho de Presença',
                subtitle: 'Abono de Falta em Aula',
                description: 'Justifica 1 falta no registro acadêmico oficial da disciplina. A solicitação é enviada e auditada pelo Mestre da Guilda.',
                cost: 300,
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
                cost: 600,
                amountValue: 0.5,
                current: redeemed.extraPoints || 0.0,
                max: 4.0,
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
            }
        ];

        const cardsHtml = shopCatalog.map(item => {
            const isMaxed = item.current >= item.max;
            const canAfford = userTokens >= item.cost;
            const progressPercent = Math.min(100, Math.round((item.current / item.max) * 100));

            return `
                <div class="shop-card-screen ${isMaxed ? 'maxed' : ''}">
                    <div class="shop-card-badge ${item.type}">
                        ${item.type === 'academic' ? 'RECOMPENSA ACADÊMICA' : 'ARTEFATO UTILITÁRIO'}
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

        container.innerHTML = `
            <div class="shop-screen-header-banner">
                <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                    <div class="shop-banner-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                    </div>
                    <div>
                        <h2 style="font-family:var(--font-display);font-size:1.35rem;color:var(--gold);margin:0;letter-spacing:0.08em;">MERCADO DE ARTEFATOS DA GUILDA</h2>
                        <p style="font-size:0.85rem;color:var(--text-secondary);margin:0.25rem 0 0 0;">Troque seus Tokens conquistados por abonos de falta, pontos extras na média e proteções de ofensiva.</p>
                    </div>
                </div>
            </div>

            <div class="shop-screen-grid">
                ${cardsHtml}
            </div>

            <div class="shop-screen-notice">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <span><strong>Regulamento Acadêmico:</strong> Todos os resgates de Abono de Falta (máx. 12) e Pontos Extras (máx. 4.0) são sincronizados em tempo real no Painel do Mestre/Professor para aplicação na pauta da disciplina.</span>
            </div>
        `;
    }

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

        const quests = (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) || [];
        const progress = this.engine.getAbyssFloorProgress(chapterId);
        const isAllDone = progress.isAllDone;
        const isClaimed = progress.claimed;

        const isFloorConquered = isAllDone;

        const chambersHtml = quests.map((q, idx) => {
            const isCompleted = !!(this.engine.state.abyss && this.engine.state.abyss.completedChambers && this.engine.state.abyss.completedChambers[q.id]);
            const isEasy = q.difficulty === 'easy';
            const xpVal = isEasy ? 20 : 25;
            const tokenVal = isEasy ? 10 : 15;

            // Se o andar já foi conquistado, permite rejogar qualquer câmara individualmente. Se não, incentiva o desafio sequencial.
            const isFirstChamber = idx === 0;

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
                        <button class="glow-button ${isCompleted ? 'btn-replay' : 'primary pulse-action'}"
                                style="padding:0.45rem 1.1rem;font-size:0.75rem;"
                                onclick="app.startAbyssChamber(${chapterId}, ${idx})">
                            ${isCompleted ? 'REJOGAR' : (isFirstChamber ? 'INICIAR ANDAR' : 'DESAFIAR')}
                        </button>
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
                            Bônus: <strong>+100 XP</strong> • <strong>+50 Tokens</strong> • <strong>+10 Renome PVP</strong>
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
    renderSubclassAwakeningModal(selectedSubclass, expandedSubclassId = null) {
        const container = document.getElementById('subclass-awakening-cards');
        if (!container || typeof SkillTreeManager === 'undefined') return;

        // Se nenhum estiver expandido explicitamente, expande a classe atualmente selecionada
        const currentExpanded = expandedSubclassId !== null ? expandedSubclassId : selectedSubclass;

        const subclasses = SkillTreeManager.getAllSubclasses();
        let html = '';

        subclasses.forEach(sc => {
            const isSel = selectedSubclass === sc.id;
            const isExp = currentExpanded === sc.id;

            let perksHtml = '';
            sc.skills.forEach(sk => {
                const isUlt = sk.tier === 4 || sk.type === 'ultimate';
                perksHtml += `
                    <div class="subclass-perk-item ${isUlt ? 'ultimate' : ''}">
                        <div class="subclass-perk-icon-wrap">
                            <i class="fa-solid ${sk.icon}"></i>
                        </div>
                        <div class="subclass-perk-info">
                            <div class="subclass-perk-name">
                                <span>${sk.name}</span>
                                <span class="subclass-perk-tier">${isUlt ? '★ TIER 4 SUPREMA' : `TIER ${sk.tier} • NV ${sk.minLevel}+`}</span>
                            </div>
                            <div class="subclass-perk-desc">${sk.description}</div>
                        </div>
                    </div>
                `;
            });

            html += `
                <div class="subclass-card ${sc.id} ${isSel ? 'selected' : ''} ${isExp ? 'expanded' : ''}">
                    <div class="subclass-card-top" onclick="app.selectSubclassAwakening('${sc.id}')">
                        <div class="subclass-card-icon">
                            <i class="fa-solid ${sc.bannerIcon}"></i>
                        </div>
                        <div class="subclass-card-headings">
                            <div class="subclass-card-name">${sc.name.toUpperCase()}</div>
                            <div class="subclass-card-title">${sc.title}</div>
                        </div>
                        <div class="subclass-card-select-badge">
                            ${isSel ? '<i class="fa-solid fa-circle-check"></i> SELECIONADO' : '<i class="fa-regular fa-circle"></i> ESCOLHER'}
                        </div>
                    </div>

                    <div class="subclass-card-desc">${sc.tagline}</div>

                    <!-- Botão para expandir/recolher habilidades -->
                    <div class="subclass-card-toggle-wrap">
                        <button type="button" class="subclass-skills-toggle-btn ${isExp ? 'active' : ''}" 
                                onclick="event.stopPropagation(); app.toggleSubclassSkillsExpand('${sc.id}')">
                            <span><i class="fa-solid ${isExp ? 'fa-eye-slash' : 'fa-eye'}"></i> ${isExp ? 'Ocultar Habilidades' : 'Ver 4 Habilidades'}</span>
                            <i class="fa-solid fa-chevron-down toggle-arrow"></i>
                        </button>
                    </div>

                    <!-- Bloco colapsável de Perks/Skills -->
                    <div class="subclass-card-perks-collapse ${isExp ? 'show' : ''}">
                        <div class="subclass-card-perks">
                            <div class="subclass-perks-title">
                                <i class="fa-solid fa-wand-magic-sparkles"></i> TALENTOS DO ARQUÉTIPO
                            </div>
                            ${perksHtml}
                        </div>
                    </div>

                    <div class="subclass-card-footer">
                        <button type="button" class="subclass-card-action-btn ${isSel ? 'active' : ''}" onclick="app.selectSubclassAwakening('${sc.id}')">
                            ${isSel ? '✓ ARQUÉTIPO SELECIONADO' : `SELECIONAR ${sc.name.toUpperCase()}`}
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
                            <strong style="font-size:0.95rem;color:#fff;margin-bottom:0.2rem;">${member.displayName || 'Aprendiz'}</strong>
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

                        <!-- Banner de Buffs Compartilhados -->
                        <div class="party-buff-box">
                            <i class="fa-solid fa-users-rays party-buff-icon"></i>
                            <div>
                                <div style="font-size:0.85rem;font-weight:700;color:${hasReviewerT3 ? 'var(--gold)' : 'var(--text-dim)'};">
                                    ${hasReviewerT3 ? '✦ INSPIRAÇÃO DA PARTY ATIVA (+10% XP & TOKENS)' : '✦ BUFFS DE SUBCLASSE DA PARTY'}
                                </div>
                                <div style="font-size:0.74rem;color:var(--text-secondary);margin-top:0.15rem;">
                                    ${hasReviewerT3 
                                        ? 'Um integrante Reviewer de Nível 10+ está fortalecendo a Party inteira com +10% de bônus em todos os desafios!'
                                        : 'Convide um colega da subclasse Reviewer de Nível 10+ para compartilhar o bônus passivo de +10% XP e Tokens com toda a Party.'}
                                </div>
                            </div>
                        </div>

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
                                    <strong style="font-size:0.9rem;color:#fff;">${inv.partyName}</strong>
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
                                <div style="background:var(--bg-panel);border:1px solid var(--border-dim);padding:1rem;border-radius:6px;display:flex;justify-content:space-between;align-items:center;">
                                    <div>
                                        <strong style="font-size:0.88rem;color:#fff;">${p.name}</strong>
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
                    <h2 style="font-family:var(--font-display);font-size:1.6rem;color:#fff;margin:0 0 0.4rem 0;">FORJE SUA PARTY ARCANO</h2>
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
                        <h3 style="margin:0;font-family:var(--font-display);font-size:1.1rem;color:#fff;">CRIAR NOVA PARTY</h3>
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
                        <h3 style="margin:0;font-family:var(--font-display);font-size:1.1rem;color:#fff;">ENTRAR POR CÓDIGO</h3>
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
}
