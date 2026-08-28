/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — UI Renderer
   Handles all screen rendering, terminal, editor, animations.
   ═══════════════════════════════════════════════════════════════ */

class UIRenderer {
    constructor(engine) {
        this.engine = engine;
        this.interpreter = new CInterpreter();
        this.currentChapterData = null;
        this.currentActivityData = null;
        this.hintLevel = 0;
        this.prologueTimeout = null;
    }

    // ─── SCREEN MANAGEMENT ───
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById('screen-' + screenId);
        if (screen) {
            screen.classList.add('active');
            this.engine.setScreen(screenId);
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

    // ─── DASHBOARD ───
    renderDashboard() {
        const state = this.engine.state;

        const displayName = (typeof authManager !== 'undefined' && authManager.getDisplayName()) || state.playerName;
        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        const roleLabel = isMaster ? 'MESTRE' : 'APRENDIZ';
        const photoURL = (typeof authManager !== 'undefined' && authManager.getPhotoURL()) || '';
        
        document.getElementById('player-name-display').textContent = displayName;
        document.getElementById('player-level').innerHTML = `${roleLabel} &bull; LV. ${String(state.level).padStart(2, '0')}`;
        
        // Configura avatar do Google
        const avatarImg = document.getElementById('player-avatar-img');
        const avatarFallback = document.getElementById('player-avatar-fallback');
        if (avatarImg && avatarFallback) {
            if (photoURL) {
                avatarImg.src = photoURL;
                avatarImg.classList.remove('hidden');
                avatarFallback.classList.add('hidden');
            } else {
                avatarImg.classList.add('hidden');
                avatarFallback.classList.remove('hidden');
            }
        }

        // Update logout button name
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) logoutBtn.title = 'Sair (' + state.playerName + ')';
        document.getElementById('xp-text').textContent = `${state.xp} / ${this.engine.getXPToNextLevel()}`;
        document.getElementById('xp-fill').style.width = this.engine.getXPPercent() + '%';

        const unlocked = this.engine.getUnlockedSystemsCount();
        const completed = this.engine.getCompletedChaptersCount();
        document.getElementById('systems-count').textContent = `${unlocked}/15`;
        document.getElementById('chapters-count').textContent = `${completed}/15`;
        document.getElementById('stat-executions').textContent = state.stats.executions;
        document.getElementById('stat-activities').textContent = state.stats.activitiesCompleted;
        document.getElementById('stat-errors-fixed').textContent = state.stats.errorsFixed;
        document.getElementById('stat-power').textContent = this.engine.getGuildPower() + '%';

        // Show admin button only for teachers
        const adminBtn = document.getElementById('btn-admin');
        if (adminBtn) {
            const isTeacher = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
            adminBtn.style.display = isTeacher ? '' : 'none';
        }

        this.renderGuildSystems();
        this.renderChapters();
        this.renderDashboardTerminal();
    }

    renderGuildSystems() {
        const container = document.getElementById('guild-systems-list');
        container.innerHTML = '';
        GUILD_SYSTEMS.forEach(sys => {
            const unlocked = this.engine.isSystemUnlocked(sys.id);
            const el = document.createElement('div');
            el.className = `system-item ${unlocked ? 'unlocked' : 'locked'}`;
            el.innerHTML = `
                <div class="system-icon">${sys.icon}</div>
                <div>
                    <div class="system-name">${sys.name}</div>
                    <div class="system-concept">${sys.concept}</div>
                </div>
            `;
            container.appendChild(el);
        });
    }

    renderChapters() {
        const container = document.getElementById('chapters-list');
        container.innerHTML = '';
        CHAPTERS.forEach(ch => {
            const unlocked = this.engine.isChapterUnlocked(ch.id);
            const completed = this.engine.isChapterCompleted(ch.id);
            const el = document.createElement('div');
            el.className = `chapter-item ${completed ? 'completed' : unlocked ? '' : 'locked'}`;
            el.innerHTML = `
                <div class="chapter-number">CAP ${String(ch.id).padStart(2, '0')}</div>
                <div class="chapter-info">
                    <div class="chapter-item-title">${ch.title}</div>
                    <div class="chapter-item-theme">${ch.theme}</div>
                </div>
                <div class="chapter-status ${completed ? 'done' : unlocked ? 'available' : 'locked'}">
                    ${completed ? '[OK]' : unlocked ? '[>]' : '[-]'}
                </div>
            `;
            if (unlocked) {
                el.onclick = () => app.openChapter(ch.id);
            }
            container.appendChild(el);
        });
    }

    renderDashboardTerminal() {
        const container = document.getElementById('dashboard-terminal');
        const name = this.engine.getPlayerName();
        const power = this.engine.getGuildPower();
        const completed = this.engine.getCompletedChaptersCount();

        container.innerHTML = '';
        const lines = [
            { cls: 'system', text: `[ SISTEMA ] Conexão estabelecida.` },
            { cls: 'narrative', text: `Bem-vindo de volta, ${name}.` },
        ];

        if (completed === 0) {
            lines.push({ cls: 'character', text: '[ ARKAN ] Comece pelo Capítulo 01 para restaurar os fundamentos da Guilda.' });
        } else if (completed < 15) {
            lines.push({ cls: 'character', text: `[ ARKAN ] Progresso: ${completed}/15 módulos. Continue assim.` });
            lines.push({ cls: 'info', text: `Poder da Guilda: ${power}%` });
        } else {
            lines.push({ cls: 'success', text: '[ ARKAN ] Parabéns, Mestre da Guilda!' });
        }

        lines.forEach(l => {
            const el = document.createElement('div');
            el.className = `terminal-line ${l.cls}`;
            el.textContent = l.text;
            container.appendChild(el);
        });
    }

    // ─── CHAPTER SCREEN ───
    openChapter(chapterId) {
        this.engine.setCurrentChapter(chapterId);
        this.currentChapterData = CHAPTERS.find(c => c.id === chapterId);
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

        // Check if story already viewed - skip dialogue
        if (this.engine.isStoryViewed(ch.id)) {
            this.renderChapterContent(ch);
            return;
        }

        // ── Story block with progressive dialogue ──
        const storyBlock = document.createElement('div');
        storyBlock.className = 'story-block';
        const storyHeader = document.createElement('div');
        storyHeader.className = 'step-indicator history';
        storyHeader.textContent = '01 -- HISTORIA';
        storyBlock.appendChild(storyHeader);

        // Dialogue container
        const dialogueDiv = document.createElement('div');
        dialogueDiv.id = 'chapter-dialogue';
        dialogueDiv.className = 'dialogue-container';
        storyBlock.appendChild(dialogueDiv);

        // Dialogue controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'dialogue-controls';
        controlsDiv.innerHTML = `
            <button class="dialogue-advance-btn pulse-action" id="btn-dialogue-next" onclick="app.advanceDialogue()">
                CONTINUAR
            </button>
            <button class="dialogue-auto-btn" id="btn-dialogue-auto" onclick="app.toggleAutoPlay()">
                AUTO: OFF
            </button>
            <span class="dialogue-hint">clique para avancar</span>
        `;
        storyBlock.appendChild(controlsDiv);
        section.appendChild(storyBlock);

        // Initialize dialogue engine
        if (this.dialogueEngine) this.dialogueEngine.destroy();
        this.dialogueEngine = new DialogueEngine('chapter-dialogue', { autoPlayDelay: 2500 });
        this.dialogueEngine.start(ch.story, () => {
            // Mark story as viewed so it doesn't replay
            this.engine.markStoryViewed(ch.id);
            // After story finishes, show concept/example/activities
            this.renderChapterContent(ch);
            // Remove pulse from advance button
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
                <pre>${ch.concept.code}</pre>
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
                <pre>${ch.example.code}</pre>
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

        // Activities
        if (ch.activities) {
            const actBlock = document.createElement('div');
            actBlock.style.cssText = 'margin: 1rem 0;';
            actBlock.innerHTML = `
                <div class="step-indicator activity">06 -- ATIVIDADES</div>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;">Complete as 3 atividades para desbloquear o sistema.</p>
            `;
            ch.activities.forEach((act, idx) => {
                const actEl = document.createElement('div');
                const completed = this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id][`act${idx + 1}`];
                actEl.className = `chapter-item ${completed ? 'completed' : ''}`;
                actEl.style.cursor = completed ? 'default' : 'pointer';
                const statusText = completed ? '[OK]' : '[>]';
                const diffText = act.difficulty === 'easy' ? 'Facil' : 'Medio';
                actEl.innerHTML = '<div class="chapter-number">ATV ' + (idx + 1) + '</div>' +
                    '<div class="chapter-info"><div class="chapter-item-title">' + act.title + '</div>' +
                    '<div class="chapter-item-theme">' + diffText + '</div></div>' +
                    '<div class="chapter-status ' + (completed ? 'done' : 'available') + '">' + statusText + '</div>';
                if (!completed) {
                    actEl.onclick = () => app.startActivity(idx);
                }
                actBlock.appendChild(actEl);
            });
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

    setupChapterEditor(ch) {
        const editor = document.getElementById('code-editor');
        const starterCode = ch.experiment ? ch.experiment.starterCode : (ch.example ? ch.example.code : '');
        editor.value = starterCode;
        this.updateLineNumbers(editor, 'line-numbers');

        editor.onscroll = () => {
            document.getElementById('line-numbers').scrollTop = editor.scrollTop;
        };
        editor.oninput = () => {
            this.updateLineNumbers(editor, 'line-numbers');
        };
        editor.onkeydown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 4;
            }
        };
    }

    // ─── ACTIVITY SCREEN ───
    startActivity(activityIndex) {
        const ch = this.currentChapterData;
        this.currentActivityData = ch.activities[activityIndex];
        this.engine.setCurrentActivity(activityIndex);
        this.hintLevel = 0;
        this.showScreen('activity');
        this.renderActivityUI(ch, activityIndex);
    }

    renderActivityUI(ch, activityIndex) {
        const act = ch.activities[activityIndex];
        document.getElementById('activity-title-display').textContent = act.title.toUpperCase();

        const diffBadge = document.getElementById('activity-difficulty');
        diffBadge.textContent = act.difficulty === 'easy' ? 'FÁCIL' : 'MÉDIO';
        diffBadge.className = `difficulty-badge ${act.difficulty === 'easy' ? 'easy' : 'medium'}`;

        // Problem description
        const problemSection = document.getElementById('problem-section');
        problemSection.innerHTML = `
            <h3>MISSÃO</h3>
            <div class="story-block" style="margin-bottom: 1rem;">
                <div class="character-block-header ${ch.character || 'system'}">${ch.story.find(s => s.type === 'character')?.name || 'SISTEMA'} // ${ch.story.find(s => s.type === 'character')?.role || 'MISSÃO'}</div>
                <div class="character-block-body">${act.description}</div>
            </div>
        `;

        // Editor
        const editor = document.getElementById('activity-editor');
        editor.value = act.starterCode;
        this.updateLineNumbers(editor, 'activity-line-numbers');

        editor.onscroll = () => {
            document.getElementById('activity-line-numbers').scrollTop = editor.scrollTop;
        };
        editor.oninput = () => {
            this.updateLineNumbers(editor, 'activity-line-numbers');
        };
        editor.onkeydown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 4;
            }
        };

        // Reset panels
        document.getElementById('activity-terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Aguardando execução...</div>';
        document.getElementById('activity-test-results').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Clique em "Submeter" para validar.</div>';
        document.getElementById('activity-hints').innerHTML = '';
        this.hintLevel = 0;
        this.renderHints(act);

        this.setupTerminalTabs();
    }

    renderHints(act) {
        const container = document.getElementById('activity-hints');
        container.innerHTML = '';

        act.hints.forEach((hint, idx) => {
            const div = document.createElement('div');
            div.className = 'hint-level';
            div.innerHTML = `
                <div class="hint-level-header">
                    <span class="hint-level-title ${['i', 'ii', 'iii'][idx]}">DICA ${['I', 'II', 'III'][idx]}</span>
                    <button class="hint-reveal-btn" id="hint-btn-${idx}" ${idx > this.hintLevel ? 'disabled' : ''} style="${idx > this.hintLevel ? 'opacity: 0.3' : ''}">
                        ${idx <= this.hintLevel ? 'Revelar' : '[?]'}
                    </button>
                </div>
                <div class="hint-level-content" id="hint-content-${idx}" style="display: ${idx <= this.hintLevel ? 'block' : 'none'}">
                    ${hint.text}
                </div>
            `;
            container.appendChild(div);
        });

        // Add reveal buttons
        setTimeout(() => {
            act.hints.forEach((hint, idx) => {
                const btn = document.getElementById(`hint-btn-${idx}`);
                if (btn) {
                    btn.onclick = () => {
                        if (btn.disabled) return;
                        document.getElementById(`hint-content-${idx}`).style.display = 'block';
                        btn.textContent = 'Revelado';
                        btn.disabled = true;
                        btn.style.opacity = '0.5';
                        this.hintLevel = Math.max(this.hintLevel, idx + 1);
                        // Enable next hint button
                        const nextBtn = document.getElementById(`hint-btn-${idx + 1}`);
                        if (nextBtn) {
                            nextBtn.disabled = false;
                            nextBtn.style.opacity = '1';
                            nextBtn.textContent = 'Revelar';
                        }
                    };
                }
            });
        }, 100);
    }

    setupTerminalTabs() {
        const tabs = document.querySelectorAll('.terminal-tab');
        const panels = {
            output: document.getElementById('panel-output'),
            tests: document.getElementById('panel-tests'),
            hints: document.getElementById('panel-hints')
        };

        tabs.forEach(tab => {
            tab.onclick = () => {
                tabs.forEach(t => t.classList.remove('active'));
                Object.values(panels).forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                panels[tab.dataset.tab].classList.add('active');
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
    runCode(code, outputId, autoCheck = false) {
        this.engine.incrementStat('executions');
        const result = this.interpreter.execute(code);
        const outputEl = document.getElementById(outputId);
        outputEl.innerHTML = '';

        if (result.output) {
            result.output.split('\n').forEach(line => {
                const el = document.createElement('div');
                el.className = 'terminal-line narrative';
                el.textContent = line;
                outputEl.appendChild(el);
            });
        }

        if (result.errors && result.errors.length > 0) {
            result.errors.forEach(err => {
                const el = document.createElement('div');
                el.className = 'terminal-line error';
                el.textContent = '[ ERRO ] ' + err;
                outputEl.appendChild(el);
            });
            this.engine.incrementStat('errorsFixed');
        } else if (result.output) {
            const el = document.createElement('div');
            el.className = 'terminal-line success';
            el.textContent = '[ SISTEMA ] Execução concluída com sucesso.';
            outputEl.appendChild(el);
        }

        return result;
    }

    // ─── ACTIVITY VALIDATION ───
    checkActivity(code, activityId) {
        const act = this.currentActivityData;
        const result = this.runCode(code, 'activity-test-results');
        const testResults = document.getElementById('activity-test-results');
        testResults.innerHTML = '';

        if (result.errors && result.errors.length > 0) {
            // Show errors as test failures
            const el = document.createElement('div');
            el.className = 'terminal-line error';
            el.textContent = '[ ERRO ] Código não compila: ' + result.errors.join('; ');
            testResults.appendChild(el);
            return false;
        }

        // Run custom validator
        let passed = false;
        let errorMessages = [];

        if (act.validator) {
            const validation = act.validator(code, result.output);
            passed = validation.pass;
            errorMessages = validation.errors;
        } else {
            // Fallback: check output against expected
            if (act.tests && act.tests.length > 0) {
                const expected = act.tests[0].expected;
                passed = result.output.trim().includes(expected.trim());
                if (!passed) errorMessages.push(`Esperado: ${expected}`);
            }
        }

        // Render test cases
        act.tests.forEach((test, idx) => {
            const outputMatches = result.output.trim().includes(test.expected.trim());
            const el = document.createElement('div');
            el.className = `test-case ${passed ? 'pass' : (idx === 0 && !outputMatches ? 'fail' : 'pass')}`;
            el.innerHTML = `
                <span class="test-icon">${passed ? '[PASS]' : (idx === 0 && !outputMatches ? '[FAIL]' : '[PASS]')}</span>
                <span>${test.description}</span>
                <span class="test-detail">${idx + 1}/${act.tests.length}</span>
            `;
            testResults.appendChild(el);
        });

        const summary = document.createElement('div');
        const passedTests = passed ? act.tests.length : 0;
        summary.className = `test-summary ${passed ? 'pass' : 'fail'}`;
        summary.textContent = `Resultado: ${passedTests}/${act.tests.length} — ${passed ? 'APROVADO' : 'REPROVADO'}`;
        testResults.appendChild(summary);

        if (!passed && errorMessages.length > 0) {
            errorMessages.forEach(msg => {
                const el = document.createElement('div');
                el.className = 'terminal-line error';
                el.textContent = msg;
                testResults.appendChild(el);
            });
        }

        return passed;
    }

    // ─── DASHBOARD ───
    renderDashboard() {
        const state = this.engine.state;

        const displayName = (typeof authManager !== 'undefined' && authManager.getDisplayName()) || state.playerName;
        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        const roleLabel = isMaster ? 'MESTRE' : 'APRENDIZ';
        const guildCode = typeof authManager !== 'undefined' ? authManager.getClassCode() : '';
        const photoURL = (typeof authManager !== 'undefined' && authManager.getPhotoURL()) || '';
        
        document.getElementById('player-name-display').textContent = displayName;
        document.getElementById('player-level').innerHTML = `${roleLabel} &bull; LV. ${String(state.level).padStart(2, '0')}`;
        
        // Configura avatar do usuário no Header
        const avatarImg = document.getElementById('player-avatar-img');
        const avatarFallback = document.getElementById('player-avatar-fallback');
        if (avatarImg && avatarFallback) {
            if (photoURL) {
                avatarImg.src = photoURL;
                avatarImg.classList.remove('hidden');
                avatarFallback.classList.add('hidden');
            } else {
                avatarImg.classList.add('hidden');
                avatarFallback.classList.remove('hidden');
            }
        }

        // Exibe Guilda ou botão para ingressar na barra central
        const topCenter = document.querySelector('.top-bar-center');
        if (topCenter) {
            if (isMaster) {
                topCenter.innerHTML = `<span class="system-text">[ PAINEL DO MESTRE — GUILDAS ]</span>`;
            } else if (guildCode) {
                topCenter.innerHTML = `<span class="system-text">[ GUILDA: <strong class="accent-text">${guildCode}</strong> ]</span>`;
            } else {
                topCenter.innerHTML = `<button class="guild-join-alert-btn" onclick="app.ui.showJoinGuildModal()" style="display:inline-flex;align-items:center;gap:0.4rem;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/>
                        <path d="M13 19l6-6"/>
                        <path d="M16 16l4 4"/>
                        <path d="M19 21l2-2"/>
                    </svg>
                    <span>INGRESSAR EM UMA GUILDA</span>
                </button>`;
            }
        }

        // Update logout button name
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) logoutBtn.title = 'Sair (' + state.playerName + ')';
        document.getElementById('xp-text').textContent = `${state.xp} / ${this.engine.getXPToNextLevel()}`;
        document.getElementById('xp-fill').style.width = this.engine.getXPPercent() + '%';

        const unlocked = this.engine.getUnlockedSystemsCount();
        const completed = this.engine.getCompletedChaptersCount();
        document.getElementById('systems-count').textContent = `${unlocked}/15`;
        document.getElementById('chapters-count').textContent = `${completed}/15`;
        document.getElementById('stat-executions').textContent = state.stats.executions;
        document.getElementById('stat-activities').textContent = state.stats.activitiesCompleted;
        document.getElementById('stat-errors-fixed').textContent = state.stats.errorsFixed;
        document.getElementById('stat-power').textContent = this.engine.getGuildPower() + '%';

        // Show admin button only for teachers
        const adminBtn = document.getElementById('btn-admin');
        if (adminBtn) {
            adminBtn.style.display = isMaster ? '' : 'none';
        }

        this.renderGuildSystems();
        this.renderChapters();
        this.renderDashboardTerminal();
    }

    renderGuildSystems() {
        const container = document.getElementById('guild-systems-list');
        container.innerHTML = '';
        GUILD_SYSTEMS.forEach(sys => {
            const unlocked = this.engine.isSystemUnlocked(sys.id);
            const el = document.createElement('div');
            el.className = `system-item ${unlocked ? 'unlocked' : 'locked'}`;
            el.innerHTML = `
                <div class="system-icon">${sys.icon}</div>
                <div>
                    <div class="system-name">${sys.name}</div>
                    <div class="system-concept">${sys.concept}</div>
                </div>
            `;
            container.appendChild(el);
        });
    }

    renderChapters() {
        const container = document.getElementById('chapters-list');
        container.innerHTML = '';
        CHAPTERS.forEach(ch => {
            const unlocked = this.engine.isChapterUnlocked(ch.id);
            const completed = this.engine.isChapterCompleted(ch.id);
            const el = document.createElement('div');
            el.className = `chapter-item ${completed ? 'completed' : unlocked ? '' : 'locked'}`;
            el.innerHTML = `
                <div class="chapter-number">CAP ${String(ch.id).padStart(2, '0')}</div>
                <div class="chapter-info">
                    <div class="chapter-item-title">${ch.title}</div>
                    <div class="chapter-item-theme">${ch.theme}</div>
                </div>
                <div class="chapter-status ${completed ? 'done' : unlocked ? 'available' : 'locked'}">
                    ${completed ? '[OK]' : unlocked ? '[>]' : '[-]'}
                </div>
            `;
            if (unlocked) {
                el.onclick = () => app.openChapter(ch.id);
            }
            container.appendChild(el);
        });
    }

    renderDashboardTerminal() {
        const container = document.getElementById('dashboard-terminal');
        const name = this.engine.getPlayerName();
        const completed = this.engine.getCompletedChaptersCount();
        const hasGuild = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.hasGuild());

        container.innerHTML = '';
        const lines = [
            { cls: 'system', text: `[ SISTEMA ] Conexão estabelecida.` },
            { cls: 'narrative', text: `Bem-vindo de volta, ${name}.` },
        ];

        if (!hasGuild) {
            lines.push({ cls: 'error', text: `[ ATENÇÃO ] Você ainda não está vinculado a uma Guilda. Solicite o código ao seu Mestre.` });
        } else if (completed === 0) {
            lines.push({ cls: 'character', text: '[ ARKAN ] Comece pelo Capítulo 01 para restaurar os fundamentos da Guilda.' });
        } else {
            lines.push({ cls: 'system', text: `[ STATUS ] ${completed}/15 Capítulos dominados. Continue evoluindo sua Code Skill.` });
        }

        lines.forEach(l => {
            const el = document.createElement('div');
            el.className = `terminal-line ${l.cls}`;
            el.textContent = l.text;
            container.appendChild(el);
        });
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
                badge: 'FASE 1 / 6 — IDENTIFICAÇÃO',
                title: 'CODE LEVELER & GUILDA',
                desc: 'Este é o emblema do Sistema. Aqui você sempre verifica o status de conexão da sua consciência com o mundo do jogo.'
            },
            {
                targetSelector: '.top-bar-right',
                badge: 'FASE 2 / 6 — COMANDOS DE MESTRE & PVP',
                title: 'CONTROLES DO JOGADOR',
                desc: 'Aqui você visualiza seu Nível, acessa os Duelos PVP de código, Torneios em Tempo Real e as Configurações de Tema Cyberpunk.'
            },
            {
                targetSelector: '.xp-bar-container',
                badge: 'FASE 3 / 6 — MATRIX DE EXPERIÊNCIA',
                title: 'BARRA DE XP & LEVEL UP',
                desc: 'Cada código executado com sucesso e atividade resolvida concede XP. Ao preencher a barra, seu Codemancer sobe de Nível.'
            },
            {
                targetSelector: '.chapters-panel',
                badge: 'FASE 4 / 6 — MISSÕES PRINCIPAIS',
                title: 'JORNADA DOS 15 CAPÍTULOS',
                desc: 'Aqui estão suas missões de código. Clique em um capítulo desbloqueado para aprender a história, conceitos de C e resolver atividades.'
            },
            {
                targetSelector: '.guild-systems-panel',
                badge: 'FASE 5 / 6 — PODER RESTAURADO',
                title: 'SISTEMAS DA GUILDA',
                desc: 'A cada capítulo que você vence, um sistema da Guilda é purificado e reativado, aumentando seu Guild Power total.'
            },
            {
                targetSelector: '.narrative-panel',
                badge: 'FASE 6 / 6 — COMUNICAÇÃO ARCANA',
                title: 'TERMINAL DA GUILDA',
                desc: 'Receba alertas ao vivo do Sistema, mensagens de NPCs e direcionamentos para derrotar o Rei Demônio e salvar este mundo.'
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
                const cardWidth = 420;
                const cardHeight = 220;
                const gap = 18;

                let top, left;

                // Tenta posicionar abaixo do elemento
                if (rect.bottom + gap + cardHeight <= windowHeight) {
                    top = rect.bottom + gap;
                    left = rect.left;
                } 
                // Se não cabe abaixo, tenta posicionar acima
                else if (rect.top - gap - cardHeight >= 0) {
                    top = rect.top - gap - cardHeight;
                    left = rect.left;
                } 
                // Se não cabe nem acima nem abaixo (ex: painéis verticais longos), tenta na lateral
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
                if (left + cardWidth > windowWidth - 20) {
                    left = windowWidth - cardWidth - 20;
                }
                if (left < 20) left = 20;

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

        setTimeout(() => renderStep(0), 400);
    }

    // ─── ADMIN DASHBOARD (MULTI-GUILDA) ───
    renderAdminDashboard(guilds, currentGuild, students) {
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

        container.innerHTML = `
            <div class="admin-header">
                <h2>PAINEL DO MESTRE (PROFESSOR)</h2>
                <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.3rem;">Gerencie suas Guildas, acompanhe os aprendizes e distribua códigos de convocação.</p>
            </div>

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
                        <div class="stat-val">${students.filter(s => s.gameProgress?.chapters).length}</div>
                        <div class="stat-label">Ativos no Sistema</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val">${Math.round(students.reduce((acc, s) => acc + (s.gameProgress?.xp || 0), 0) / (students.length || 1))}</div>
                        <div class="stat-label">Média de XP</div>
                    </div>
                </div>

                <h3 style="margin:1.2rem 0 0.6rem 0;color:var(--purple-bright);font-size:0.8rem;letter-spacing:0.1em;display:flex;justify-content:space-between;align-items:center;">
                    <span>APRENDIZES DA GUILDA (${students.length})</span>
                </h3>

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
                            const power = gp.stats?.guildPower || Math.round((chapters / 15) * 100);
                            const name = s.displayName || s.email?.split('@')[0] || 'Aprendiz';
                            return `
                                <div class="student-card">
                                    <div style="flex:1;min-width:0;">
                                        <div class="student-name" onclick="app.openPlayerProfile('${s.uid}')" style="cursor:pointer;" title="Ver Perfil Completo">${name}</div>
                                        <div class="student-info" style="text-align:left;margin-top:0.2rem;">LV.${level} | XP:${xp} | Cap:${chapters}/15 | Power:${power}%</div>
                                        <div class="student-bar"><div class="student-bar-fill" style="width:${(chapters / 15 * 100)}%"></div></div>
                                    </div>
                                    <button class="student-kick-btn" onclick="app.confirmKickStudent('${s.uid}', '${name.replace(/'/g, "\\'")}', '${selectedGuildCode}')" title="Expulsar aluno da Guilda">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                            <circle cx="8.5" cy="7" r="4"/>
                                            <line x1="18" y1="8" x2="23" y2="13"/>
                                            <line x1="23" y1="8" x2="18" y2="13"/>
                                        </svg>
                                        <span>EXPULSAR</span>
                                    </button>
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
        `;
    }

    // ─── GUILD SCREEN (TODOS OS MEMBROS) ───
    async renderGuildScreen() {
        this.showScreen('guild');
        const container = document.getElementById('guild-content');
        if (!container) return;

        container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:3rem;"><div class="spinner"></div></div>';
        
        try {
            const guildInfo = await authManager.getCurrentGuildInfo();
            const members = await authManager.getGuildMembers();
            const guildName = guildInfo ? (guildInfo.name || 'Guilda') : 'Guilda Sem Nome';
            const guildCode = guildInfo ? (guildInfo.classCode || authManager.getClassCode()) : '---';

            const titleEl = document.getElementById('guild-screen-title');
            if (titleEl) titleEl.textContent = `GUILDA: ${guildName.toUpperCase()}`;

            let membersCards = '';
            if (members.length === 0) {
                membersCards = '<p class="pvp-empty" style="grid-column:1/-1;">Nenhum membro registrado nesta Guilda até o momento.</p>';
            } else {
                membersCards = members.map(m => {
                    const gp = m.gameProgress || {};
                    const lvl = gp.level || 1;
                    const renome = gp.renome !== undefined ? gp.renome : 100;
                    const cp = gp.codePower || 1000;
                    const tier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(renome) : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' };
                    const completedChapters = gp.chapters ? Object.values(gp.chapters).filter(c => c && c.completed).length : 0;
                    const isMestre = m.isTeacher || m.role === 'teacher';
                    const avatarSrc = m.photoURL;

                    return `<div class="guild-member-card" onclick="app.openPlayerProfile('${m.uid}')">
                        <div class="guild-member-avatar" style="border-color:${tier.color}">
                            ${avatarSrc ? `<img src="${avatarSrc}" alt="Avatar">` : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:${isMestre ? 'var(--gold)' : 'var(--purple-bright)'}"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`}
                        </div>
                        <div class="guild-member-info">
                            <div class="guild-member-name">${m.displayName || m.email?.split('@')[0] || 'Membro'} ${isMestre ? '<span style="color:var(--gold);font-size:0.7rem;font-weight:700;letter-spacing:0.08em;">[MESTRE]</span>' : ''}</div>
                            <div class="guild-member-stats">
                                <span style="color:var(--text-primary);font-weight:700;">LV. ${String(lvl).padStart(2, '0')}</span>
                                <span style="color:var(--cyan);">CAP. ${completedChapters}/15</span>
                                <span style="color:${tier.color}">${tier.icon} ${tier.name}</span>
                            </div>
                            <div style="font-size:0.65rem;color:var(--text-dim);margin-top:0.2rem;display:flex;gap:0.6rem;">
                                <span>Renome: <b style="color:var(--gold)">${renome}</b></span>
                                <span>CP: <b style="color:var(--purple-bright)">${cp}</b></span>
                            </div>
                        </div>
                    </div>`;
                }).join('');
            }

            container.innerHTML = `
                <div class="guild-screen-container">
                    <div class="guild-info-banner">
                        <div>
                            <h2 style="font-family:var(--font-display);color:var(--gold);font-size:1.1rem;margin-bottom:0.2rem;">${guildName}</h2>
                            <p style="color:var(--text-secondary);font-size:0.8rem;margin:0;">Código de Convocação: <span style="color:var(--purple-bright);font-family:var(--font-code);font-weight:700;letter-spacing:0.1em;">${guildCode}</span></p>
                        </div>
                        <div style="display:flex;align-items:center;gap:1rem;">
                            <span class="panel-badge" style="font-size:0.75rem;padding:0.3rem 0.8rem;">${members.length} MEMBRO(S)</span>
                        </div>
                    </div>
                    <div class="guild-members-grid">
                        ${membersCards}
                    </div>
                </div>
            `;
        } catch (e) {
            console.error('[UI] renderGuildScreen error:', e);
            container.innerHTML = '<p class="pvp-empty">Erro ao carregar os dados da guilda.</p>';
        }
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

            modalBody.innerHTML = `
                <div class="profile-header-box">
                    <div class="profile-avatar-large" style="border-color:${tier.color}">
                        ${photoURL ? `<img src="${photoURL}" alt="Avatar">` : `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:${role === 'Mestre' ? 'var(--gold)' : 'var(--purple-bright)'}"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap;">
                            <h3 style="color:var(--text-primary);font-family:var(--font-display);font-size:1.1rem;margin:0;">${name}</h3>
                            <span class="tier-badge" style="color:${tier.color};border-color:${tier.color};background:rgba(255,255,255,0.03);">${tier.icon} ${tier.name}</span>
                        </div>
                        <p style="color:var(--text-dim);font-size:0.75rem;margin:0.2rem 0 0 0;">${role} &bull; ${email}</p>
                    </div>
                </div>

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
    async renderRankedScreen(challenges) {
        this.showScreen('ranked');
        const container = document.getElementById('ranked-content');
        if (!container) return;

        let leaderboard = [];
        if (typeof rankedManager !== 'undefined') {
            leaderboard = await rankedManager.getGuildLeaderboard();
        }

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
                                return `
                                    <tr style="border-bottom:1px solid var(--border-ghost);background:${isMe ? 'rgba(139, 92, 246, 0.12)' : 'transparent'};cursor:pointer;" onclick="app.openPlayerProfile('${item.uid}')">
                                        <td style="padding:0.7rem 0.8rem;text-align:center;font-weight:700;color:${item.position <= 3 ? 'var(--gold)' : 'var(--text-secondary)'}">${item.position <= 3 ? ['1°','2°','3°'][item.position-1] : item.position + '°'}</td>
                                        <td style="padding:0.7rem 0.8rem;display:flex;align-items:center;gap:0.6rem;">
                                            <div style="width:24px;height:24px;border-radius:50%;border:1px solid ${item.tier.color};overflow:hidden;background:var(--bg-deep);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                                ${item.photoURL ? `<img src="${item.photoURL}" style="width:100%;height:100%;object-fit:cover;">` : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:${item.isTeacher ? 'var(--gold)' : 'var(--purple-bright)'}"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`}
                                            </div>
                                            <span style="font-weight:600;color:${isMe ? 'var(--purple-bright)' : 'var(--text-primary)'}">${item.displayName} ${isMe ? '(Você)' : ''}</span>
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
            + '<p class="pvp-subtitle">Desafie seus colegas de guilda para duelos de código assíncronos. Ganhe Renome para subir de Tier e aumente seu Code Power (Elo MMR).</p>'
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
    renderTournamentsScreen(tournaments) {
        this.showScreen('tournament');
        const container = document.getElementById('tournament-content');
        if (!container) return;
        const isTeacher = typeof authManager !== 'undefined' && authManager.isTeacher();
        
        container.innerHTML = '<div class="tournament-screen">'
            + '<div class="tournament-header">'
            + '<h2 class="tournament-title">TORNEIOS DA GUILDA</h2>'
            + '<p class="tournament-subtitle">Batalha em tempo real: todos os concorrentes recebem os mesmos desafios para resolver com o menor tempo e melhor código.</p>'
            + '</div>'
            + (isTeacher ? '<div class="tournament-actions"><button class="glow-button primary pulse-action" onclick="app.createTournament()">CRIAR NOVO TORNEIO</button></div>' : '')
            + '<div class="tournament-list-section">'
            + '<h3 class="tournament-section-title">TORNEIOS DISPONÍVEIS (' + (tournaments ? tournaments.length : 0) + ')</h3>'
            + (!tournaments || tournaments.length === 0
                ? '<p class="tournament-empty">Nenhum torneio ativo no momento. Aguarde seu mestre iniciar uma sessão.</p>'
                : '<div class="tournament-card-list">' + tournaments.map(t => {
                    const count = (t.participants && t.participants.length) ? t.participants.length : 0;
                    const statusText = t.status === 'active' ? 'EM ANDAMENTO' : (t.status === 'waiting' ? 'AGUARDANDO' : 'ENCERRADO');
                    const statusCls = t.status === 'active' ? 'active' : (t.status === 'waiting' ? 'waiting' : 'ended');
                    return '<div class="tournament-card">'
                        + '<div class="tournament-card-left">'
                        + '<div class="tournament-card-name">' + (t.title || 'Torneio') + '</div>'
                        + '<div class="tournament-card-meta">' + count + ' participante(s) &bull; Mestre: ' + (t.teacherName || 'Mestre') + '</div>'
                        + '</div>'
                        + '<div class="tournament-card-right">'
                        + '<span class="tournament-status-badge ' + statusCls + '">' + statusText + '</span>'
                        + '<button class="glow-button primary tournament-join-btn" onclick="app.joinTournament(\'' + t.id + '\')">ENTRAR</button>'
                        + '</div>'
                        + '</div>';
                }).join('') + '</div>'
            )
            + '</div>'
            + '</div>';
    }

    // ─── TOAST ───
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
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
}
