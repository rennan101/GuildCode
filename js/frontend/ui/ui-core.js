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

        // Modo de Edição do Mapa (Professor), Coordenadas e Atribuição de Bosses
        this.isMapEditing = false;
        this.customMapPositions = { c_lang: null, csharp_unity: null };
        this.editedMapPositions = null; // Cópia de trabalho durante o arrasto
        this.customBossAssignments = { c_lang: null, csharp_unity: null };
        this.editedBossAssignments = null; // Cópia de trabalho da alocação de bosses durante edição
        this.draggedNodeId = null;
        this._nodeDragMouseMoveHandler = null;
        this._nodeDragMouseUpHandler = null;
    }

    isCSharpWorld(code = '') {
        const byEngine = Boolean(this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity');
        const byAuth = Boolean(typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        const isWorldCSharp = byEngine || byAuth;

        // Se o mundo ativo for C#, checa se a atividade/contexto não é explicitamente de C
        if (isWorldCSharp) {
            return true;
        }

        // Se o mundo ativo for C (padrão), só é C# se a atividade ou código tiver indicadores explícitos de C#
        const byActivity = Boolean(this.currentActivityData && String(this.currentActivityData.id || '').startsWith('cs_'));
        const byContext = Boolean(typeof app !== 'undefined' && app.activityContext && (
            (app.activityContext.data && String(app.activityContext.data.id || '').startsWith('cs_')) ||
            (app.activityContext.worldId === 'csharp_unity')
        ));
        const byCode = typeof code === 'string' && (/using\s+UnityEngine/i.test(code) || /MonoBehaviour/i.test(code) || /Debug\.Log/i.test(code) || /Vector3/i.test(code) || /GameObject/i.test(code) || /Transform/i.test(code));
        return Boolean(byActivity || byContext || byCode);
    }

    // ─── SCREEN MANAGEMENT COM TRANSIÇÃO SMOKE DISSOLVE ───
    showScreen(screenId) {
        const targetScreen = document.getElementById('screen-' + screenId);
        if (!targetScreen) return;

        // Overlay de Fumaça / Dissolve
        let smokeOverlay = document.getElementById('screen-transition-overlay');
        if (!smokeOverlay) {
            smokeOverlay = document.createElement('div');
            smokeOverlay.id = 'screen-transition-overlay';
            smokeOverlay.className = 'smoke-transition-overlay';
            document.body.appendChild(smokeOverlay);
        }

        // Se for carregamento inicial ou mesma tela, transiciona direto sem esperar fumaça
        const currentActiveScreen = document.querySelector('.screen.active');
        if (!currentActiveScreen || currentActiveScreen === targetScreen) {
            document.querySelectorAll('.screen').forEach(s => {
                s.classList.remove('active');
                s.classList.remove('auth-modal-mode');
            });
            targetScreen.classList.add('active');
            document.body.classList.toggle('map-screen-active', screenId === 'dashboard');
            this.engine.setScreen(screenId);
            this.updateMiniChatWidget(screenId);
            return;
        }

        // 1. Fade-in rápido do véu de fumaça (160ms)
        smokeOverlay.classList.remove('smoke-dissolve');
        smokeOverlay.classList.add('fade-in');

        setTimeout(() => {
            // 2. Troca as telas sob o manto de fumaça
            document.querySelectorAll('.screen').forEach(s => {
                s.classList.remove('active');
                s.classList.remove('auth-modal-mode');
            });
            targetScreen.classList.add('active');
            document.body.classList.toggle('map-screen-active', screenId === 'dashboard');
            this.engine.setScreen(screenId);
            this.updateMiniChatWidget(screenId);

            // 3. Efeito Smoke Dissolve (dissipação etérea)
            smokeOverlay.classList.remove('fade-in');
            smokeOverlay.classList.add('smoke-dissolve');

            setTimeout(() => {
                smokeOverlay.classList.remove('smoke-dissolve');
            }, 400);
        }, 160);
    }

    updateMiniChatWidget(screenId) {
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

    // ─── GAME FEEL: SCREEN SHAKE SUAVE ───
    triggerScreenShake() {
        const container = document.body;
        container.classList.remove('screen-shake-subtle');
        void container.offsetWidth; // Força reflow
        container.classList.add('screen-shake-subtle');
        setTimeout(() => {
            container.classList.remove('screen-shake-subtle');
        }, 320);
    }

    // ─── GAME FEEL: NÚMEROS FLUTUANTES (FLOATING XP / TOKENS) ───
    spawnFloatingStat(text, type = 'xp', x = null, y = null) {
        const el = document.createElement('div');
        el.className = `floating-game-stat ${type}`;
        el.textContent = text;

        const posX = x !== null ? x : (window.innerWidth / 2 + (Math.random() - 0.5) * 60);
        const posY = y !== null ? y : (window.innerHeight * 0.45 + (Math.random() - 0.5) * 40);

        el.style.left = `${posX}px`;
        el.style.top = `${posY}px`;

        document.body.appendChild(el);
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 1400);
    }

    // ─── GAME FEEL: CODE LINE SURGE GLOW NO EDITOR ───
    triggerCodeEditorSurge() {
        const currentEditor = document.querySelector('.screen.active .editor-wrapper, .screen.active .activity-editor-wrapper');
        if (currentEditor) {
            currentEditor.classList.remove('code-editor-surge');
            void currentEditor.offsetWidth;
            currentEditor.classList.add('code-editor-surge');
            setTimeout(() => {
                currentEditor.classList.remove('code-editor-surge');
            }, 500);
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

        // Atualiza badges de notificação visual (red dots) nos botões de navegação
        this.updateNavigationBadges();

        // Show admin & edit map button only for teachers
        const adminBtn = document.getElementById('btn-admin');
        if (adminBtn) {
            adminBtn.style.display = isMaster ? '' : 'none';
        }
        const editMapBtn = document.getElementById('btn-edit-map');
        if (editMapBtn) {
            editMapBtn.style.display = isMaster ? '' : 'none';
        }

        const mapBg = document.querySelector('.map-bg-layer');
        if (mapBg) {
            mapBg.classList.toggle('csharp-world', this.isCSharpWorld());
        }

        // Ajusta tooltip dinâmico do botão do Glossário na sidebar
        const glossaryNavBtn = document.querySelector('.nav-btn-glossary');
        if (glossaryNavBtn) {
            glossaryNavBtn.title = this.isCSharpWorld() ? 'Grimório C# & Unity (Glossário)' : 'Grimório C (Glossário)';
        }

        this.initInteractiveMap();
        this.renderMapConnections();
        this.renderMapSpotlightsAndNodes();
        
        // Garante enquadramento imediato no capítulo atual ou nó selecionado sem barras pretas laterais
        const chapters = this.getMapChapterData();
        const activeChapId = (this.mapState && this.mapState.selectedChapterId !== null)
            ? this.mapState.selectedChapterId
            : ((this.engine && this.engine.state && this.engine.state.currentChapter) || 0);
        const targetChap = (chapters && chapters.find(c => c.id === activeChapId)) || (chapters && chapters[0]);
        if (targetChap) {
            this.centerOnMapNode(targetChap);
        } else {
            this.updateMapPanTransform();
        }

        this.startMapAtmosphericEffects();
        
        // Re-calibra a escala precisa após o layout flex do browser estabilizar
        requestAnimationFrame(() => {
            if (targetChap) {
                this.centerOnMapNode(targetChap);
            } else {
                this.updateMapPanTransform();
            }
        });
    }

    // ─── EFEITOS ATMOSFÉRICOS DO MAPA (TROVÃO, RAIOS, NÉVOA & ÁGUA) ───
}

if (typeof module !== "undefined") {
  module.exports = { UIRenderer };
}
if (typeof window !== "undefined") {
  window.UIRenderer = UIRenderer;
}
