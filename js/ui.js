/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — UI Renderer
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
        input.addEventListener('input', () => {
            btn.disabled = input.value.trim().length === 0;
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim().length > 0) {
                onConfirm(input.value.trim());
            }
        });
        btn.addEventListener('click', () => {
            if (input.value.trim().length > 0) {
                onConfirm(input.value.trim());
            }
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
            el.style.marginBottom = '0.5rem';
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.3s ease';

            if (msg.type === 'system' || msg.type === 'sys') {
                el.className = 'sys-msg';
                el.style.fontFamily = 'var(--font-code)';
                el.style.color = msg.type === 'sys' ? '#fbbf24' : '#38bdf8';
                el.textContent = msg.text;
            } else if (msg.type === 'narrative') {
                el.className = 'narrative';
                el.textContent = msg.text;
            } else if (msg.type === 'character') {
                el.innerHTML = `<span style="color: var(--cyan); font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.1em;">[ ${msg.name} — ${msg.role} ]</span><br><span style="color: var(--text-primary);">${msg.text}</span>`;
            } else if (msg.type === 'quest') {
                el.className = 'quest-text';
                el.textContent = msg.text;
            }

            textContainer.appendChild(el);
            setTimeout(() => el.style.opacity = '1', 50);

            textContainer.scrollTop = textContainer.scrollHeight;
            setTimeout(showNext, msg.type === 'delay' ? 0 : 100);
        };
        showNext();
    }

    // ─── DASHBOARD ───
    renderDashboard() {
        const state = this.engine.state;

        document.getElementById('player-name-display').textContent = state.playerName;
        document.getElementById('player-level').textContent = `LV. ${String(state.level).padStart(2, '0')}`;
        document.getElementById('xp-text').textContent = `${state.xp} / ${this.engine.getXPToNextLevel()}`;
        document.getElementById('xp-fill').style.width = this.engine.getXPPercent() + '%';

        const unlocked = this.engine.getUnlockedSystemsCount();
        const completed = this.engine.getCompletedChaptersCount();
        document.getElementById('systems-count').textContent = `${unlocked}/12`;
        document.getElementById('chapters-count').textContent = `${completed}/12`;
        document.getElementById('stat-executions').textContent = state.stats.executions;
        document.getElementById('stat-activities').textContent = state.stats.activitiesCompleted;
        document.getElementById('stat-errors-fixed').textContent = state.stats.errorsFixed;
        document.getElementById('stat-power').textContent = this.engine.getGuildPower() + '%';

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
                    ${completed ? '✓' : unlocked ? '▶' : '🔒'}
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
            lines.push({ cls: 'character', text: '[ ARKAN ] Comece pelo Capítulo 01 para reconstruir o inventário.' });
        } else if (completed < 12) {
            lines.push({ cls: 'character', text: `[ ARKAN ] Progresso: ${completed}/12 módulos. Continue assim.` });
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

        document.getElementById('terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Terminal do capítulo inicializado.</div>';
    }

    renderChapterNarrative(ch) {
        const section = document.getElementById('narrative-section');
        section.innerHTML = '';

        // Story block
        const storyBlock = document.createElement('div');
        storyBlock.className = 'story-block';
        const storyHeader = document.createElement('div');
        storyHeader.className = 'step-indicator history';
        storyHeader.textContent = '01 — HISTÓRIA';
        storyBlock.appendChild(storyHeader);

        ch.story.forEach(s => {
            const el = document.createElement('div');
            if (s.type === 'character') {
                el.className = 'character-block';
                el.innerHTML = `
                    <div class="character-block-header ${s.cssClass}">${s.name} // ${s.role}</div>
                    <div class="character-block-body">${s.text}</div>
                `;
            } else if (s.type === 'narrative') {
                el.style.margin = '0.5rem 0';
                el.style.padding = '0.5rem 0.8rem';
                el.style.color = 'var(--text-secondary)';
                el.style.fontStyle = 'italic';
                el.textContent = s.text;
            } else if (s.type === 'system') {
                el.className = 'sys-msg';
                el.style.fontFamily = 'var(--font-code)';
                el.style.color = 'var(--cyan)';
                el.textContent = s.text;
                el.style.padding = '0.3rem 0.5rem';
            } else if (s.type === 'quest') {
                el.className = 'quest-text';
                el.textContent = s.text;
            }
            storyBlock.appendChild(el);
        });
        section.appendChild(storyBlock);

        // Concept block
        if (ch.concept) {
            const conceptBlock = document.createElement('div');
            conceptBlock.className = 'concept-block';
            conceptBlock.innerHTML = `
                <div class="step-indicator concept">02 — CONCEITO</div>
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
                <div class="step-indicator example">03 — EXEMPLO</div>
                <div class="example-block-title">${ch.example.title}</div>
                <pre>${ch.example.code}</pre>
                <div style="margin-top: 0.5rem; padding: 0.4rem; background: rgba(0,0,0,0.2); border-radius: 4px;">
                    <span style="color: var(--green); font-family: var(--font-code); font-size: 0.75rem;">Saída:</span>
                    <pre style="margin-top: 0.3rem; color: var(--text-primary); font-size: 0.8rem;">${ch.example.output}</pre>
                </div>
            `;
            section.appendChild(exampleBlock);
        }

        // Experiment block
        if (ch.experiment) {
            const expBlock = document.createElement('div');
            expBlock.style.cssText = 'margin: 1rem 0; padding: 1rem; border: 1px solid var(--orange, #fb923c); border-radius: 8px; background: rgba(251, 146, 60, 0.03);';
            expBlock.innerHTML = `
                <div class="step-indicator experiment">04 — EXPERIMENTE</div>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">${ch.experiment.description}</p>
                <button class="glow-button primary" onclick="app.startExperiment()" style="font-size: 0.75rem; padding: 0.4rem 1.2rem;">
                    <span class="btn-text">ABRIR NO EDITOR</span>
                </button>
            `;
            section.appendChild(expBlock);
        }

        // Tutorial block
        if (ch.tutorial) {
            const tutBlock = document.createElement('div');
            tutBlock.style.cssText = 'margin: 1rem 0; padding: 1rem; border: 1px solid var(--red-dim); border-radius: 8px; background: rgba(248, 113, 113, 0.03);';
            tutBlock.innerHTML = `
                <div class="step-indicator tutorial">05 — TUTORIAL</div>
                <p style="color: var(--text-secondary);">${ch.tutorial.title}</p>
                <button class="glow-button primary" onclick="app.startTutorial()" style="font-size: 0.75rem; padding: 0.4rem 1.2rem; margin-top: 0.5rem;">
                    <span class="btn-text">INICIAR TUTORIAL</span>
                </button>
            `;
            section.appendChild(tutBlock);
        }

        // Activities
        if (ch.activities) {
            const actBlock = document.createElement('div');
            actBlock.style.cssText = 'margin: 1rem 0;';
            actBlock.innerHTML = `
                <div class="step-indicator activity">06 — ATIVIDADES PRÁTICAS</div>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;">Complete as 3 atividades para desbloquear o sistema.</p>
            `;
            ch.activities.forEach((act, idx) => {
                const actEl = document.createElement('div');
                const completed = this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id][`act${idx + 1}`];
                actEl.className = `chapter-item ${completed ? 'completed' : ''}`;
                actEl.style.cursor = completed ? 'default' : 'pointer';
                actEl.innerHTML = `
                    <div class="chapter-number">ATV ${idx + 1}</div>
                    <div class="chapter-info">
                        <div class="chapter-item-title">${act.title}</div>
                        <div class="chapter-item-theme">${act.difficulty === 'easy' ? 'Fácil' : 'Médio'}</div>
                    </div>
                    <div class="chapter-status ${completed ? 'done' : 'available'}">${completed ? '✓' : '▶'}</div>
                `;
                if (!completed) {
                    actEl.onclick = () => app.startActivity(idx);
                }
                actBlock.appendChild(actEl);
            });
            section.appendChild(actBlock);
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
                        ${idx <= this.hintLevel ? 'Revelar' : '🔒'}
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
                if (btn && !btn.disabled) {
                    btn.onclick = () => {
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
                <span class="test-icon">${passed ? '✓' : (idx === 0 && !outputMatches ? '✗' : '✓')}</span>
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

    // ─── REWARD SCREEN ───
    showReward(chapter) {
        const ch = CHAPTERS.find(c => c.id === chapter);
        this.showScreen('reward');
        document.getElementById('reward-title').textContent = 'CAPÍTULO COMPLETO!';
        document.getElementById('reward-system-name').textContent = `${ch.unlockIcon} ${ch.unlock}`;
        document.getElementById('reward-xp-amount').textContent = `+${ch.xpReward}`;
    }

    // ─── MODAL ───
    showModal(title, text) {
        document.getElementById('modal-unlock-title').textContent = title;
        document.getElementById('modal-unlock-text').textContent = text;
        document.getElementById('modal-unlock').classList.remove('hidden');
    }

    hideModal() {
        document.getElementById('modal-unlock').classList.add('hidden');
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
}
