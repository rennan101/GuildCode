/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — UI: IDE, Chapter & Code Runner
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _Extension {


    // ─── CHAPTER SCREEN ───
    openChapter(chapterId) {
        const isTeacherOrAdmin = (typeof authManager !== 'undefined') && (
            (typeof authManager.isTeacher === 'function' && authManager.isTeacher()) ||
            (typeof authManager.isAdmin === 'function' && authManager.isAdmin()) ||
            (typeof authManager.isAdminEmail === 'function' && authManager.isAdminEmail(authManager.currentUser?.email || authManager.userData?.email))
        );

        // Validação de Segurança Anti-Burla: Checa se o capítulo está legitimamente desbloqueado (professores têm bypass)
        const isUnlocked = this.engine.isChapterUnlocked(chapterId);
        if (!isUnlocked && !isTeacherOrAdmin) {
            this.showToast(`[ SISTEMA ] Acesso Negado! O Capítulo ${String(chapterId).padStart(2, '0')} está selado.`, 'error');
            this.showScreen('dashboard');
            this.renderDashboard();
            return;
        }

        this.engine.setCurrentChapter(chapterId);
        const isCSharp = this.isCSharpWorld();
        const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : CHAPTERS;
        this.currentChapterData = (typeof missionsManager !== 'undefined' && !isCSharp ? missionsManager.getChapter(chapterId) : null) || activeList.find(c => c.id === chapterId);
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
        const isCSharp = this.isCSharpWorld();
        const highlightFn = (code) => {
            if (isCSharp && typeof window.highlightCSharp === 'function') {
                return window.highlightCSharp(code);
            }
            return this.highlightCCode(code);
        };

        // Concept block
        if (ch.concept) {
            const conceptBlock = document.createElement('div');
            conceptBlock.className = 'concept-block';
            conceptBlock.innerHTML = `
                <div class="step-indicator concept">02 -- CONCEITO</div>
                <div class="concept-block-title">${ch.concept.title}</div>
                <div class="concept-explanation">${ch.concept.explanation}</div>
                <pre><code>${highlightFn(ch.concept.code)}</code></pre>
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
                <pre><code>${highlightFn(ch.example.code)}</code></pre>
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
                                ${(idx === ch.activities.length - 1) ? (() => {
                                    const artCfg = act.artifactReward || ch.artifactReward || null;
                                    let artInfo = null;
                                    let artStars = '';
                                    if (artCfg && typeof ARTIFACTS_CATALOG !== 'undefined') {
                                        const artId = artCfg.artifactId;
                                        if (artId && artId !== 'random' && ARTIFACTS_CATALOG[artId]) {
                                            artInfo = ARTIFACTS_CATALOG[artId];
                                        } else {
                                            artInfo = { name: 'Artefato Místico', asset: 'assets/artifacts/Crown_Cristal.svg', slotLabel: 'Aleatório', statName: 'Atributo Especial' };
                                        }
                                        const minS = artCfg.minStars || 3;
                                        const maxS = artCfg.maxStars || 6;
                                        artStars = minS === maxS ? `${minS}★` : `${minS}★-${maxS}★`;
                                    }
                                    if (artInfo) {
                                        return `
                                            <div class="activity-artifact-showcase-box" title="Drop da Missão Final: ${artInfo.name} (${artStars})">
                                                <div class="activity-artifact-showcase-thumb-wrap">
                                                    <img src="${artInfo.asset}" alt="${artInfo.name}" class="activity-artifact-showcase-img" />
                                                </div>
                                                <div class="activity-artifact-showcase-info">
                                                    <div class="activity-artifact-showcase-header">
                                                        <span class="activity-artifact-badge-label">${artInfo.slotLabel || 'Artefato'}</span>
                                                        <span class="activity-artifact-badge-stars">${artStars}</span>
                                                    </div>
                                                    <span class="activity-artifact-showcase-title">${artInfo.name}</span>
                                                    ${artInfo.statName ? `<span class="activity-artifact-showcase-stat">+${artInfo.statName} ${artInfo.isPercent ? '(%)' : ''}</span>` : ''}
                                                </div>
                                            </div>
                                        `;
                                    }
                                    return `
                                        <span class="activity-reward-pill" style="background:rgba(201,169,78,0.12);border-color:var(--gold);color:var(--gold);" title="Recompensa Final do Capítulo: Artefato Raro">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                                            Drop de Artefato
                                        </span>
                                    `;
                                })() : ''}
                            </div>
                        </div>
                    </div>
                    <div class="activity-card-right" style="display:flex;align-items:center;gap:0.5rem;">
                        ${(typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin())) ? `
                            <button class="glow-button" style="padding:0.45rem 0.8rem;font-size:0.75rem;" title="Editar esta Missão e Drop de Artefato" onclick="event.stopPropagation(); app.openAdminDashboard(); app.ui.renderAdminMissionsManagement('chapters'); app.ui.openEditActivityModal('chapter', ${ch.id}, ${idx});">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                <span>EDITAR</span>
                            </button>
                        ` : ''}
                        <button class="glow-button ${completed ? 'btn-replay' : 'primary pulse-action'}" style="padding:0.45rem 1.1rem;font-size:0.75rem;display:flex;align-items:center;gap:0.4rem;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                ${completed ? '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>' : '<polygon points="5 3 19 12 5 21 5 3"/>'}
                            </svg>
                            <span>${completed ? 'REJOGAR' : 'RESOLVER'}</span>
                        </button>
                    </div>
                `;
                const isLastAct = (idx === ch.activities.length - 1);
                actEl.onclick = () => app.startActivity(idx, isLastAct && completed);
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

    // ─── UNIVERSAL IDE CODE EDITOR ENHANCER (TAB & SYNTAX HIGHLIGHTING & 20+ UNDO/REDO) ───
    attachCodeEditor(editor, lineNumbersId, highlightId) {
        if (!editor) return;
        const lineNumbers = lineNumbersId ? document.getElementById(lineNumbersId) : null;
        const highlight = highlightId ? document.getElementById(highlightId) : null;

        const updateView = () => {
            if (lineNumbers) this.updateLineNumbers(editor, lineNumbersId);
            if (highlight) {
                const codeEl = highlight.querySelector('code') || highlight;
                const isCSharp = this.isCSharpWorld(editor.value);
                if (isCSharp && typeof window.highlightCSharp === 'function') {
                    codeEl.innerHTML = window.highlightCSharp(editor.value) + '\n';
                } else {
                    codeEl.innerHTML = this.highlightCCode(editor.value) + '\n';
                }
            }
        };

        const syncScroll = () => {
            if (lineNumbers) lineNumbers.scrollTop = editor.scrollTop;
            if (highlight) {
                highlight.scrollTop = editor.scrollTop;
                highlight.scrollLeft = editor.scrollLeft;
            }
        };

        // ─── PILHA DE HISTÓRICO DE DESFAZER / REFAZER (MÍNIMO 20 PASSOS, SUPORTA ATÉ 60) ───
        const MAX_HISTORY = 60;
        let history = [{
            value: editor.value,
            selectionStart: editor.selectionStart || 0,
            selectionEnd: editor.selectionEnd || 0
        }];
        let historyIndex = 0;
        let isPerformingUndoRedo = false;
        let typingTimeout = null;

        const recordState = (force = false) => {
            if (isPerformingUndoRedo) return;
            const currentVal = editor.value;
            const currentStart = editor.selectionStart;
            const currentEnd = editor.selectionEnd;
            const lastState = history[historyIndex];

            if (!force && lastState && lastState.value === currentVal) {
                lastState.selectionStart = currentStart;
                lastState.selectionEnd = currentEnd;
                return;
            }

            // Trunca estados posteriores se estávamos no meio do histórico
            if (historyIndex < history.length - 1) {
                history = history.slice(0, historyIndex + 1);
            }

            history.push({
                value: currentVal,
                selectionStart: currentStart,
                selectionEnd: currentEnd
            });

            if (history.length > MAX_HISTORY) {
                history.shift();
            }
            historyIndex = history.length - 1;
        };

        const doUndo = () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
                typingTimeout = null;
                recordState(true);
            }
            if (historyIndex > 0) {
                isPerformingUndoRedo = true;
                historyIndex--;
                const state = history[historyIndex];
                editor.value = state.value;
                editor.selectionStart = state.selectionStart;
                editor.selectionEnd = state.selectionEnd;
                updateView();
                syncScroll();
                editor.dispatchEvent(new Event('input', { bubbles: true }));
                isPerformingUndoRedo = false;
                if (window.soundFX && typeof window.soundFX.playMechanicalClick === 'function') {
                    window.soundFX.playMechanicalClick();
                }
                return true;
            }
            return false;
        };

        const doRedo = () => {
            if (historyIndex < history.length - 1) {
                isPerformingUndoRedo = true;
                historyIndex++;
                const state = history[historyIndex];
                editor.value = state.value;
                editor.selectionStart = state.selectionStart;
                editor.selectionEnd = state.selectionEnd;
                updateView();
                syncScroll();
                editor.dispatchEvent(new Event('input', { bubbles: true }));
                isPerformingUndoRedo = false;
                if (window.soundFX && typeof window.soundFX.playMechanicalClick === 'function') {
                    window.soundFX.playMechanicalClick();
                }
                return true;
            }
            return false;
        };

        editor._historyManager = {
            recordState,
            doUndo,
            doRedo,
            reset: (val) => {
                history = [{
                    value: typeof val === 'string' ? val : editor.value,
                    selectionStart: editor.selectionStart || 0,
                    selectionEnd: editor.selectionEnd || 0
                }];
                historyIndex = 0;
            }
        };

        editor.onscroll = syncScroll;
        editor.oninput = () => {
            updateView();
            syncScroll();
            if (!isPerformingUndoRedo) {
                if (typingTimeout) clearTimeout(typingTimeout);
                typingTimeout = setTimeout(() => {
                    recordState();
                }, 300);
            }
        };

        editor.addEventListener('paste', () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
                typingTimeout = null;
            }
            recordState(true);
            setTimeout(() => {
                recordState(true);
            }, 10);
        });

        let isComposing = false;
        editor.addEventListener('compositionstart', () => {
            isComposing = true;
        });
        editor.addEventListener('compositionend', () => {
            isComposing = false;
            updateView();
            syncScroll();
            recordState();
        });

        editor.onkeydown = (e) => {
            // Ignora se estiver em composição de caractere acentuado (IME ou dead key como ~, ^, ´)
            if (isComposing || e.isComposing || e.key === 'Dead' || e.keyCode === 229) {
                return;
            }

            // Ctrl+Z / Cmd+Z / Ctrl+Y / Cmd+Y / Ctrl+Shift+Z / Cmd+Shift+Z: Desfazer / Refazer (Histórico de 20+ passos)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
                e.preventDefault();
                e.stopPropagation();
                if (e.shiftKey) {
                    doRedo();
                } else {
                    doUndo();
                }
                return false;
            }

            if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
                e.preventDefault();
                e.stopPropagation();
                doRedo();
                return false;
            }

            // Efeito mecânico sutil de digitação para imersão de IDE
            if (window.soundFX && typeof window.soundFX.playMechanicalClick === 'function') {
                if (!['Control', 'Alt', 'Meta', 'Shift', 'CapsLock', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    window.soundFX.playMechanicalClick();
                }
            }

            if (e.key === 'Tab') {
                e.preventDefault();
                e.stopPropagation();
                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                    typingTimeout = null;
                    recordState(true);
                }
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;

                if (start !== end) {
                    // Seleção de múltiplas linhas ou bloco (VS Code multiline indent / unindent)
                    const lastNl = val.lastIndexOf('\n', start - 1);
                    const lineStart = lastNl === -1 ? 0 : lastNl + 1;
                    let lineEnd = val.indexOf('\n', end);
                    if (lineEnd === -1) lineEnd = val.length;

                    const block = val.substring(lineStart, lineEnd);
                    const lines = block.split('\n');

                    if (e.shiftKey) {
                        // Shift+Tab: Remove até 4 espaços do início de cada linha selecionada
                        let removedTotal = 0;
                        let firstLineRemoved = 0;
                        const newLines = lines.map((l, idx) => {
                            const spaces = l.match(/^ {1,4}/);
                            if (spaces) {
                                const count = spaces[0].length;
                                if (idx === 0) firstLineRemoved = count;
                                removedTotal += count;
                                return l.substring(count);
                            }
                            return l;
                        });
                        const newBlock = newLines.join('\n');
                        editor.value = val.substring(0, lineStart) + newBlock + val.substring(lineEnd);
                        editor.selectionStart = Math.max(lineStart, start - firstLineRemoved);
                        editor.selectionEnd = Math.max(lineStart, end - removedTotal);
                    } else {
                        // Tab: Adiciona 4 espaços no início de cada linha selecionada
                        const newLines = lines.map(l => '    ' + l);
                        const newBlock = newLines.join('\n');
                        editor.value = val.substring(0, lineStart) + newBlock + val.substring(lineEnd);
                        editor.selectionStart = start + 4;
                        editor.selectionEnd = end + (4 * lines.length);
                    }
                } else if (e.shiftKey) {
                    // Shift+Tab em linha única (sem seleção)
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
                    // Tab: Insere 4 espaços
                    editor.value = val.substring(0, start) + '    ' + val.substring(end);
                    editor.selectionStart = editor.selectionEnd = start + 4;
                }
                updateView();
                syncScroll();
                recordState(true);
                return false;
            }

            // Enter: Auto-indent e quebra inteligente de chaves estilo VS Code
            if (e.key === 'Enter') {
                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                    typingTimeout = null;
                    recordState(true);
                }
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;
                const lastNl = val.lastIndexOf('\n', start - 1);
                const line = val.substring(lastNl + 1, start);
                const indentMatch = line.match(/^[ \t]+/);
                const indent = indentMatch ? indentMatch[0] : '';
                
                const prevChar = val[start - 1];
                const nextChar = val[start];

                e.preventDefault();

                // Caso especial VS Code: Enter exatamente entre '{' e '}'
                if (prevChar === '{' && nextChar === '}') {
                    const insertText = '\n' + indent + '    \n' + indent;
                    editor.value = val.substring(0, start) + insertText + val.substring(end);
                    editor.selectionStart = editor.selectionEnd = start + indent.length + 5; // Posiciona o cursor indentado na linha do meio
                } else {
                    const extraIndent = line.trim().endsWith('{') ? '    ' : '';
                    const insertText = '\n' + indent + extraIndent;
                    editor.value = val.substring(0, start) + insertText + val.substring(end);
                    editor.selectionStart = editor.selectionEnd = start + insertText.length;
                }

                updateView();
                syncScroll();
                recordState(true);
                return false;
            }

            // Ctrl+Enter / Cmd+Enter: Executar ou Submeter de acordo com a tela ativa
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                if (e.shiftKey) {
                    // Ctrl+Shift+Enter: Submeter / Verificar prioritário
                    const actSubmitBtn = document.getElementById('btn-submit-activity');
                    const raidSubmitBtn = document.getElementById('btn-raid-editor-submit');
                    const checkCodeBtn = document.getElementById('btn-check-code');
                    if (actSubmitBtn && document.getElementById('screen-activity')?.classList.contains('active')) {
                        actSubmitBtn.click();
                    } else if (raidSubmitBtn && document.getElementById('screen-boss-raid')?.classList.contains('active')) {
                        raidSubmitBtn.click();
                    } else if (checkCodeBtn && document.getElementById('screen-chapter')?.classList.contains('active')) {
                        checkCodeBtn.click();
                    } else if (window.app) {
                        window.app.handleActivitySubmit ? window.app.handleActivitySubmit() : window.app.handleRunCode();
                    }
                } else {
                    // Ctrl+Enter: Executar código
                    const actRunBtn = document.getElementById('btn-run-activity');
                    const raidRunBtn = document.getElementById('btn-raid-editor-run');
                    const tournRunBtn = document.getElementById('btn-tournament-run');
                    const chapRunBtn = document.getElementById('btn-run-code');

                    if (actRunBtn && document.getElementById('screen-activity')?.classList.contains('active')) {
                        actRunBtn.click();
                    } else if (raidRunBtn && document.getElementById('screen-boss-raid')?.classList.contains('active')) {
                        raidRunBtn.click();
                    } else if (tournRunBtn && document.getElementById('tournament-code-editor')) {
                        if (window.app && window.app.runTournamentCode) window.app.runTournamentCode();
                    } else if (chapRunBtn && document.getElementById('screen-chapter')?.classList.contains('active')) {
                        chapRunBtn.click();
                    } else if (window.app) {
                        window.app.handleRunCode();
                    }
                }
                return false;
            }

            // Ctrl+S / Cmd+S: Prevenir salvar página e disparar Executar Código
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                e.stopPropagation();
                const actRunBtn = document.getElementById('btn-run-activity');
                const raidRunBtn = document.getElementById('btn-raid-editor-run');
                const chapRunBtn = document.getElementById('btn-run-code');

                if (actRunBtn && document.getElementById('screen-activity')?.classList.contains('active')) {
                    actRunBtn.click();
                } else if (raidRunBtn && document.getElementById('screen-boss-raid')?.classList.contains('active')) {
                    raidRunBtn.click();
                } else if (chapRunBtn && document.getElementById('screen-chapter')?.classList.contains('active')) {
                    chapRunBtn.click();
                } else if (window.app) {
                    window.app.handleRunCode();
                }
                return false;
            }

            // Ctrl+D / Cmd+D: Selecionar palavra atual ou duplicar seleção da palavra
            if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) {
                e.preventDefault();
                e.stopPropagation();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                const val = editor.value;

                if (start === end) {
                    // Seleciona a palavra inteira sob o cursor
                    let wordStart = start;
                    let wordEnd = start;
                    while (wordStart > 0 && /[a-zA-Z0-9_]/.test(val[wordStart - 1])) wordStart--;
                    while (wordEnd < val.length && /[a-zA-Z0-9_]/.test(val[wordEnd])) wordEnd++;
                    if (wordStart < wordEnd) {
                        editor.selectionStart = wordStart;
                        editor.selectionEnd = wordEnd;
                    }
                } else {
                    // Busca a próxima ocorrência da palavra selecionada
                    const selectedText = val.substring(start, end);
                    if (selectedText.length > 0) {
                        const nextIndex = val.indexOf(selectedText, end);
                        if (nextIndex !== -1) {
                            editor.selectionStart = nextIndex;
                            editor.selectionEnd = nextIndex + selectedText.length;
                        } else {
                            // Volta ao início do documento se não achar mais à frente
                            const firstIndex = val.indexOf(selectedText, 0);
                            if (firstIndex !== -1 && firstIndex < start) {
                                editor.selectionStart = firstIndex;
                                editor.selectionEnd = firstIndex + selectedText.length;
                            }
                        }
                    }
                }
                return false;
            }

            // Ctrl+/ or Cmd+/: Comentar / Descomentar linha(s) estilo VS Code
            if ((e.ctrlKey || e.metaKey) && (e.key === '/' || e.key === ';')) {
                e.preventDefault();
                e.stopPropagation();
                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                    typingTimeout = null;
                    recordState(true);
                }
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
                recordState(true);
                return false;
            }

            // Alt+Shift+Up / Alt+Shift+Down: Duplicar linha (VS Code shortcut)
            if (e.altKey && e.shiftKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
                e.preventDefault();
                e.stopPropagation();
                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                    typingTimeout = null;
                    recordState(true);
                }
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
                recordState(true);
                return false;
            }

            // Alt+ArrowUp / Alt+ArrowDown: Mover linha para cima/baixo (VS Code shortcut)
            if (e.altKey && !e.shiftKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();
                e.stopPropagation();
                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                    typingTimeout = null;
                    recordState(true);
                }
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
                recordState(true);
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
                    if (typingTimeout) {
                        clearTimeout(typingTimeout);
                        typingTimeout = null;
                        recordState(true);
                    }
                    e.preventDefault();
                    editor.value = val.substring(0, start - 1) + val.substring(start + 1);
                    editor.selectionStart = editor.selectionEnd = start - 1;
                    updateView();
                    syncScroll();
                    recordState(true);
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
                    if (typingTimeout) {
                        clearTimeout(typingTimeout);
                        typingTimeout = null;
                        recordState(true);
                    }
                    e.preventDefault();
                    const selectedText = val.substring(start, end);
                    editor.value = val.substring(0, start) + e.key + selectedText + pairs[e.key] + val.substring(end);
                    editor.selectionStart = start + 1;
                    editor.selectionEnd = end + 1;
                    updateView();
                    recordState(true);
                    return false;
                }

                // Aspas: não auto-fechar se o caractere anterior for uma letra/dígito (ex: d'água)
                if ((e.key === '"' || e.key === "'") && start > 0 && /[a-zA-Z0-9_]/.test(val[start - 1])) {
                    return;
                }

                const nextChar = val[start] || '';
                if (/\s|;|\)|}|\]|,|$/.test(nextChar)) {
                    if (typingTimeout) {
                        clearTimeout(typingTimeout);
                        typingTimeout = null;
                        recordState(true);
                    }
                    e.preventDefault();
                    editor.value = val.substring(0, start) + e.key + pairs[e.key] + val.substring(start);
                    editor.selectionStart = editor.selectionEnd = start + 1;
                    updateView();
                    recordState(true);
                    return false;
                }
            }
        };

        updateView();
        syncScroll();

        // Subclasse Analyst Perk: Visão Espectral IntelliSense
        this.setupSpectralIntelliSense(editor, updateView);
    }

    // ─── ANALYST PERK: VISÃO ESPECTRAL INTELLISENSE (AUTOCOMPLETE TIPO VS CODE) ───
    setupSpectralIntelliSense(editor, onCodeChange) {
        if (!editor) return;
        const wrapper = editor.closest('.editor-wrapper') || editor.parentElement;
        if (!wrapper) return;

        // Limpa popup anterior se existir
        let popup = wrapper.querySelector('.spectral-intellisense-popup');
        if (popup) popup.remove();

        const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
        const hasSkill = this.engine && this.engine.hasSkill('an_spectral_tests', user);

        popup = document.createElement('div');
        popup.className = 'spectral-intellisense-popup';
        popup.style.display = 'none';
        popup.innerHTML = `
            <div class="spectral-intellisense-header">
                <span style="display:flex;align-items:center;gap:0.35rem;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    VISÃO ESPECTRAL • INTELLISENSE
                </span>
                <span style="color:#858585;font-size:0.6rem;">Tab ou Enter para autocompletar</span>
            </div>
            <ul class="spectral-intellisense-list"></ul>
            <div class="spectral-item-desc" style="display:none;"></div>
        `;
        wrapper.appendChild(popup);

        const listEl = popup.querySelector('.spectral-intellisense-list');
        const descEl = popup.querySelector('.spectral-item-desc');
        let activeIndex = 0;
        let currentSuggestions = [];
        let currentWordPrefix = '';
        let currentWordStart = 0;

        const csharpKeywords = [
            { label: 'Debug.Log', insert: 'Debug.Log("");', type: 'method', icon: 'M', desc: 'Imprime mensagem no Console da Unity.' },
            { label: 'Debug.LogWarning', insert: 'Debug.LogWarning("");', type: 'method', icon: 'M', desc: 'Imprime aviso no Console.' },
            { label: 'Debug.LogError', insert: 'Debug.LogError("");', type: 'method', icon: 'M', desc: 'Imprime erro no Console.' },
            { label: 'void Start()', insert: 'void Start()\n    {\n        \n    }', type: 'method', icon: 'M', desc: 'Executado no primeiro frame do script Unity.' },
            { label: 'void Update()', insert: 'void Update()\n    {\n        \n    }', type: 'method', icon: 'M', desc: 'Executado a cada frame do jogo.' },
            { label: 'transform.position', insert: 'transform.position', type: 'keyword', icon: 'P', desc: 'Posição do GameObject no espaço 3D.' },
            { label: 'Vector3', insert: 'new Vector3(0, 0, 0)', type: 'type', icon: 'T', desc: 'Estrutura de vetor tridimensional.' },
            { label: 'Vector2', insert: 'new Vector2(0, 0)', type: 'type', icon: 'T', desc: 'Estrutura de vetor bidimensional.' },
            { label: 'Mathf.Clamp', insert: 'Mathf.Clamp(val, min, max)', type: 'method', icon: 'M', desc: 'Restringe um valor entre um mínimo e máximo.' },
            { label: 'GetComponent', insert: 'GetComponent<Component>()', type: 'method', icon: 'M', desc: 'Obtém referência de um componente do GameObject.' },
            { label: 'GameObject', insert: 'GameObject', type: 'type', icon: 'T', desc: 'Entidade base de todos os objetos na Unity.' },
            { label: 'MonoBehaviour', insert: 'MonoBehaviour', type: 'type', icon: 'T', desc: 'Classe base para scripts de comportamento na Unity.' },
            { label: 'public class', insert: 'public class ', type: 'keyword', icon: 'K', desc: 'Declaração de classe pública.' },
            { label: 'override', insert: 'override ', type: 'keyword', icon: 'K', desc: 'Sobrescreve método virtual ou abstrato da classe base.' },
            { label: 'virtual', insert: 'virtual ', type: 'keyword', icon: 'K', desc: 'Permite que um método seja sobrescrito em subclasses.' },
            { label: 'protected', insert: 'protected ', type: 'keyword', icon: 'K', desc: 'Acessível na própria classe e em suas subclasses.' },
            { label: 'Console.WriteLine', insert: 'Console.WriteLine("");', type: 'method', icon: 'M', desc: 'Imprime linha com quebra de linha.' },
            { label: 'int.Parse', insert: 'int.Parse()', type: 'method', icon: 'M', desc: 'Converte string para número inteiro.' },
            { label: 'string.Format', insert: 'string.Format("", )', type: 'method', icon: 'M', desc: 'Formata texto com argumentos.' },
            { label: 'foreach', insert: 'foreach (var item in collection)\n{\n    \n}', type: 'keyword', icon: 'K', desc: 'Laço de repetição iterador.' }
        ];

        const cKeywords = [
            { label: 'printf', insert: 'printf("");', type: 'method', icon: 'M', desc: 'Imprime texto formatado na saída padrão.' },
            { label: 'scanf', insert: 'scanf("%d", &);', type: 'method', icon: 'M', desc: 'Lê dados formatados da entrada padrão.' },
            { label: 'int main()', insert: 'int main() {\n    \n    return 0;\n}', type: 'method', icon: 'M', desc: 'Ponto de entrada do programa C.' },
            { label: 'malloc', insert: 'malloc(sizeof());', type: 'method', icon: 'M', desc: 'Aloca bloco de memória dinâmica no Heap.' },
            { label: 'free', insert: 'free();', type: 'method', icon: 'M', desc: 'Libera bloco de memória alocado dinamicamente.' },
            { label: 'for', insert: 'for (int i = 0; i < ; i++) {\n    \n}', type: 'keyword', icon: 'K', desc: 'Estrutura de repetição contada.' },
            { label: 'while', insert: 'while () {\n    \n}', type: 'keyword', icon: 'K', desc: 'Estrutura de repetição condicional.' },
            { label: 'struct', insert: 'struct Name {\n    \n};', type: 'type', icon: 'T', desc: 'Definição de estrutura de dados.' }
        ];

        const getOracleSuggestions = () => {
            const oracle = [];
            const act = this.currentActivityData || (this.chapterData && this.currentActivityIndex != null ? (this.chapterData.activities ? this.chapterData.activities[this.currentActivityIndex] : null) : null);
            if (act && act.tests && act.tests.length > 0) {
                act.tests.forEach((t, i) => {
                    if (t.expected) {
                        const cleanExp = String(t.expected).trim();
                        if (cleanExp.length > 0 && cleanExp.length < 80) {
                            oracle.push({
                                label: `[Teste ${i+1}] ${cleanExp.substring(0, 24)}${cleanExp.length > 24 ? '...' : ''}`,
                                insert: cleanExp,
                                type: 'oracle',
                                icon: '★',
                                desc: `Previsão Espectral: saída exata esperada pelo Teste ${i+1}.`
                            });
                        }
                    }
                });
            }
            return oracle;
        };

        const renderPopup = () => {
            if (currentSuggestions.length === 0) {
                popup.style.display = 'none';
                return;
            }
            listEl.innerHTML = currentSuggestions.map((s, idx) => `
                <li class="spectral-intellisense-item ${idx === activeIndex ? 'selected' : ''}" data-index="${idx}">
                    <div class="spectral-item-main">
                        <span class="spectral-item-icon ${s.type}">${s.icon}</span>
                        <span class="spectral-item-label">${s.label}</span>
                    </div>
                    <span class="spectral-item-badge">${s.type.toUpperCase()}</span>
                </li>
            `).join('');

            const selected = currentSuggestions[activeIndex];
            if (selected && selected.desc) {
                descEl.textContent = selected.desc;
                descEl.style.display = 'block';
            } else {
                descEl.style.display = 'none';
            }

            // Garante visibilidade no scroll da lista
            const activeItem = listEl.children[activeIndex];
            if (activeItem) {
                activeItem.scrollIntoView({ block: 'nearest' });
            }

            popup.style.display = 'flex';

            // Adiciona click nos itens
            Array.from(listEl.children).forEach((li) => {
                li.onclick = (ev) => {
                    ev.stopPropagation();
                    applySuggestion(parseInt(li.getAttribute('data-index'), 10));
                };
            });
        };

        const applySuggestion = (idx) => {
            const item = currentSuggestions[idx];
            if (!item) return;

            const val = editor.value;
            const before = val.substring(0, currentWordStart);
            const after = val.substring(editor.selectionStart);
            const insertText = item.insert || item.label;

            editor.value = before + insertText + after;
            const newCursor = currentWordStart + insertText.length;
            editor.selectionStart = editor.selectionEnd = newCursor;

            popup.style.display = 'none';
            currentSuggestions = [];

            if (typeof onCodeChange === 'function') onCodeChange();
            editor.focus();
        };

        const updateSuggestions = () => {
            // Se o usuário não possui a skill do Analyst, não ativa o autocomplete
            const activeUser = typeof authManager !== 'undefined' ? authManager.currentUser : null;
            if (!this.engine || !this.engine.hasSkill('an_spectral_tests', activeUser)) {
                popup.style.display = 'none';
                return;
            }

            const cursorPos = editor.selectionStart;
            const val = editor.value;
            let start = cursorPos - 1;
            while (start >= 0 && /[a-zA-Z0-9_\.]/.test(val[start])) {
                start--;
            }
            start++;
            currentWordStart = start;
            currentWordPrefix = val.substring(start, cursorPos).trim();

            if (currentWordPrefix.length < 2) {
                popup.style.display = 'none';
                currentSuggestions = [];
                return;
            }

            const isCSharp = this.isCSharpWorld(val);
            const pool = (isCSharp ? csharpKeywords : cKeywords).concat(getOracleSuggestions());
            const lowerPref = currentWordPrefix.toLowerCase();

            currentSuggestions = pool.filter(item => {
                const l = item.label.toLowerCase();
                const ins = (item.insert || '').toLowerCase();
                return l.includes(lowerPref) || ins.includes(lowerPref);
            }).slice(0, 6);

            activeIndex = 0;
            renderPopup();
        };

        editor.addEventListener('input', () => {
            updateSuggestions();
        });

        // Intercepta teclas de navegação no editor quando o popup estiver visível
        const origOnKeyDown = editor.onkeydown;
        editor.onkeydown = (e) => {
            if (popup.style.display === 'flex' && currentSuggestions.length > 0) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    e.stopPropagation();
                    activeIndex = (activeIndex + 1) % currentSuggestions.length;
                    renderPopup();
                    return false;
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    e.stopPropagation();
                    activeIndex = (activeIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
                    renderPopup();
                    return false;
                }
                if (e.key === 'Tab' || (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    applySuggestion(activeIndex);
                    return false;
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    popup.style.display = 'none';
                    return false;
                }
            }

            if (origOnKeyDown) {
                return origOnKeyDown.call(editor, e);
            }
        };

        // Fecha ao clicar fora
        document.addEventListener('click', (e) => {
            if (!popup.contains(e.target) && e.target !== editor) {
                popup.style.display = 'none';
            }
        });
    }

    // ─── C CODE FORMATTER & BEAUTIFIER (INDENTAÇÃO AUTOMÁTICA) ───
    formatCCode(code) {
        if (!code || typeof code !== 'string') return code;
        const lines = code.split('\n');
        let indentLevel = 0;
        const formatted = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if (!line) {
                formatted.push('');
                continue;
            }

            // Reduz o nível de indentação antes se a linha começar com fechamento de bloco
            if (line.startsWith('}') || line.startsWith(']')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }

            // Tratamento especial para case / default em switch
            let currentIndent = indentLevel;
            if (line.startsWith('case ') || line.startsWith('default:')) {
                currentIndent = Math.max(0, indentLevel - 1);
            }

            // Aplica os 4 espaços por nível de indentação
            const indentStr = '    '.repeat(currentIndent);
            formatted.push(indentStr + line);

            // Ajusta o nível de indentação para a próxima linha
            let opens = (line.match(/{/g) || []).length;
            let closes = (line.match(/}/g) || []).length;
            
            // Se já foi diminuído no início da linha, ignora no saldo final
            if (line.startsWith('}')) closes--;

            indentLevel = Math.max(0, indentLevel + (opens - closes));
        }

        return formatted.join('\n');
    }

    formatCurrentEditor() {
        const activeEditor = document.activeElement?.tagName === 'TEXTAREA' 
            ? document.activeElement 
            : (document.getElementById('activity-editor') || document.getElementById('code-editor') || document.getElementById('raid-code-editor') || document.getElementById('tournament-code-editor'));
        
        if (!activeEditor) return;
        
        const original = activeEditor.value;
        const formatted = this.formatCCode(original);
        if (original !== formatted) {
            if (activeEditor._historyManager) {
                activeEditor._historyManager.recordState(true);
            }
            activeEditor.value = formatted;
            if (activeEditor._historyManager) {
                activeEditor._historyManager.recordState(true);
            }
            activeEditor.dispatchEvent(new Event('input', { bubbles: true }));
            this.showToast('Código formatado com sucesso!', 'info');
        } else {
            this.showToast('O código já está bem formatado.', 'info');
        }
    }

    cleanStarterCode(code) {
        if (!code) return code;
        return code
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .split('\n')
            .map(line => {
                const idx = line.indexOf('//');
                return idx !== -1 ? line.slice(0, idx) : line;
            })
            .join('\n')
            .replace(/[ \t]+$/gm, '')
            .replace(/\n\s*\n\s*\n/g, '\n\n');
    }

    setupChapterEditor(ch) {
        const editor = document.getElementById('code-editor');
        if (!editor) return;
        const starterCode = ch.experiment ? ch.experiment.starterCode : (ch.example ? ch.example.code : (ch.concept ? ch.concept.code : ''));
        editor.value = starterCode || '';
        this.attachCodeEditor(editor, 'line-numbers', 'code-editor-highlight');
    }

    // ─── ACTIVITY SCREEN ───
    startActivity(activityIndex, forceNewVariant = false) {
        const ch = this.currentChapterData;
        const isCSharp = this.isCSharpWorld(ch?.theme || ch?.title || '');
        
        let act = ch.activities[activityIndex];
        if (typeof FarmingTemplatesManager !== 'undefined' && FarmingTemplatesManager.isFarmingActivity(ch, activityIndex)) {
            act = FarmingTemplatesManager.resolveActivityVariant(ch, activityIndex, isCSharp, forceNewVariant);
        }

        this.currentActivityData = act;
        this.engine.setCurrentActivity(activityIndex);
        this.hintLevel = 0;
        window._currentActivityFailed = false;

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
        const act = this.currentActivityData || ch.activities[activityIndex];
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
        let effectiveTests = act.tests;
        if ((!effectiveTests || effectiveTests.length === 0) && act.expectedOutput) {
            effectiveTests = [{ input: '', expected: act.expectedOutput, description: 'Verificação da saída do Console Unity' }];
        }

        let expectedOutputHtml = '';
        if (effectiveTests && effectiveTests.length > 0) {
            const hasMultipleLines = effectiveTests.some(t => String(t.expected).includes('\n'));
            const isSingleLine = !hasMultipleLines;

            const testExamplesHtml = effectiveTests.map((t, idx) => {
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
                        <span><strong>Atenção ao Formato:</strong> Imprima exatamente os caracteres, pontuações e quebras de linha mostrados acima.</span>
                    </div>
                </div>
            `;
        }

        // Problem description
        const problemSection = document.getElementById('problem-section');
        const descContent = act.description || act.instructions || 'Complete o objetivo solicitado no editor de código.';
        problemSection.innerHTML = `
            <h3>MISSÃO</h3>
            <div class="story-block" style="margin-bottom: 0.8rem;">
                <div class="character-block-header ${ch.character || 'system'}">${ch.story.find(s => s.type === 'character')?.name || 'SISTEMA'} // ${ch.story.find(s => s.type === 'character')?.role || 'MISSÃO'}</div>
                <div class="character-block-body">${descContent}</div>
            </div>
            ${expectedOutputHtml}
        `;

        // Editor with Syntax Highlighting & Tab handling
        const isCSharp = this.isCSharpWorld(act.starterCode || '');
        const editorTab = document.querySelector('#screen-activity .editor-tab');
        if (editorTab) {
            editorTab.textContent = isCSharp ? 'Script.cs' : 'main.c';
        }
        const chapEditorTab = document.querySelector('#screen-chapter .editor-tab');
        if (chapEditorTab) {
            chapEditorTab.textContent = isCSharp ? 'Script.cs' : 'main.c';
        }
        const cheatsheetTabSpan = document.querySelector('.terminal-tab[data-tab="cheatsheet"] span');
        if (cheatsheetTabSpan) {
            cheatsheetTabSpan.textContent = isCSharp ? 'Guia C#' : 'Guia C';
        }

        const editor = document.getElementById('activity-editor');
        if (editor) {
            const rawStarter = act.starterCode || (isCSharp ? 'using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        \n    }\n}' : '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}');
            editor.value = this.cleanStarterCode(rawStarter);
            this.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
        }

        // Reset panels
        document.getElementById('activity-terminal-output').innerHTML = `<div class="terminal-line system">[ SISTEMA ] ${isCSharp ? 'Console Unity pronto' : 'Terminal C pronto'}. Aguardando execução...</div>`;
        
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
                    const rawStarter = act.starterCode || (isCSharp ? 'using UnityEngine;\n\npublic class Exercicio : MonoBehaviour\n{\n    void Start()\n    {\n        \n    }\n}' : '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}');
                    editor.value = this.cleanStarterCode(rawStarter);
                    this.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
                }
            };
        }

        const submitBtn = document.getElementById('btn-submit-activity');
        if (submitBtn && typeof app !== 'undefined') {
            submitBtn.onclick = () => app.handleActivitySubmit();
        }

        // Subclasse Analyst Perk: Memória Expandida (an_quick_templates)
        this.setupAnalystSnippets(isCSharp, editor);

        document.getElementById('activity-hints').innerHTML = '';
        this.hintLevel = 0;
        this.renderHints(act);

        this.setupTerminalTabs();
        this.setupNotepad();
    }

    // ─── ANALYST PERK: MEMÓRIA EXPANDIDA (SNIPPETS RÁPIDOS) ───
    setupAnalystSnippets(isCSharp, editor) {
        const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
        const editorActions = document.querySelector('#screen-activity .editor-actions');
        if (!editorActions) return;

        // Remove botão/dropdown pré-existente
        const existingBtn = document.getElementById('btn-analyst-snippets');
        if (existingBtn) existingBtn.remove();
        const existingDropdown = document.getElementById('analyst-snippets-dropdown');
        if (existingDropdown) existingDropdown.remove();

        if (!this.engine || !this.engine.hasSkill('an_quick_templates', user)) {
            return;
        }

        const btn = document.createElement('button');
        btn.id = 'btn-analyst-snippets';
        btn.className = 'editor-btn glossary-btn';
        btn.title = 'Memória Expandida: Inserir Snippet Rápido';
        btn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>Snippets</span>
        `;

        const dropdown = document.createElement('div');
        dropdown.id = 'analyst-snippets-dropdown';
        dropdown.className = 'analyst-snippets-dropdown';

        const snippets = isCSharp ? [
            {
                name: 'Debug.Log()',
                desc: 'Debug.Log("Mensagem");',
                code: 'Debug.Log("");'
            },
            {
                name: 'MonoBehaviour Start/Update',
                desc: 'Métodos do ciclo de vida Unity',
                code: 'void Start()\n{\n    \n}\n\nvoid Update()\n{\n    \n}'
            },
            {
                name: 'Classe com Herança',
                desc: 'public class Filho : Pai',
                code: 'public class Derivada : Base\n{\n    public override void Executar()\n    {\n        base.Executar();\n    }\n}'
            },
            {
                name: 'Instanciação Vector3',
                desc: 'Vector3 pos = new Vector3(...)',
                code: 'Vector3 posicao = new Vector3(0, 0, 0);'
            },
            {
                name: 'Loop for',
                desc: 'for (int i = 0; i < n; i++)',
                code: 'for (int i = 0; i < 5; i++)\n{\n    Debug.Log(i);\n}'
            }
        ] : [
            {
                name: 'printf()',
                desc: 'printf("Mensagem\\n");',
                code: 'printf("\\n");'
            },
            {
                name: 'scanf()',
                desc: 'scanf("%d", &var);',
                code: 'scanf("%d", &);'
            },
            {
                name: 'Função main()',
                desc: 'int main() { return 0; }',
                code: 'int main() {\n    \n    return 0;\n}'
            },
            {
                name: 'Loop for',
                desc: 'for (int i = 0; i < n; i++)',
                code: 'for (int i = 0; i < 5; i++) {\n    printf("%d\\n", i);\n}'
            },
            {
                name: 'malloc() seguro',
                desc: 'int *ptr = (int*)malloc(...)',
                code: 'int *ptr = (int *)malloc(n * sizeof(int));\nif (ptr == NULL) return 1;\n// ...\nfree(ptr);'
            }
        ];

        let snippetsHtml = `
            <div class="analyst-snippets-title">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                MEMÓRIA EXPANDIDA • SNIPPETS
            </div>
        `;

        snippets.forEach((s, idx) => {
            snippetsHtml += `
                <div class="analyst-snippet-item" data-idx="${idx}">
                    <span class="analyst-snippet-name">${s.name}</span>
                    <span class="analyst-snippet-code">${s.desc}</span>
                </div>
            `;
        });
        dropdown.innerHTML = snippetsHtml;

        btn.onclick = (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        };

        dropdown.querySelectorAll('.analyst-snippet-item').forEach(item => {
            item.onclick = (e) => {
                e.stopPropagation();
                const idx = parseInt(item.getAttribute('data-idx'), 10);
                const snip = snippets[idx];
                if (snip && editor) {
                    const start = editor.selectionStart;
                    const end = editor.selectionEnd;
                    const val = editor.value;
                    editor.value = val.substring(0, start) + snip.code + val.substring(end);
                    editor.selectionStart = editor.selectionEnd = start + snip.code.length;
                    editor.dispatchEvent(new Event('input'));
                    editor.focus();
                }
                dropdown.classList.remove('show');
            };
        });

        // Insere o botão antes do botão Grimório
        const notepadBtn = document.getElementById('btn-toggle-activity-notepad');
        if (notepadBtn) {
            editorActions.insertBefore(btn, notepadBtn);
        } else {
            editorActions.appendChild(btn);
        }
        btn.style.position = 'relative';
        btn.appendChild(dropdown);

        // Fecha ao clicar fora
        document.addEventListener('click', (ev) => {
            if (!dropdown.contains(ev.target) && ev.target !== btn) {
                dropdown.classList.remove('show');
            }
        });
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

    // ─── ACTIVITY NOTEPAD DRAWER (GRIMÓRIO DE ANOTAÇÕES) ───
    toggleActivityNotepadDrawer() {
        const drawer = document.getElementById('activity-notepad-drawer');
        const btn = document.getElementById('btn-toggle-activity-notepad');
        if (!drawer) return;

        if (drawer.classList.contains('open')) {
            this.closeActivityNotepadDrawer();
        } else {
            this.openActivityNotepadDrawer();
        }
    }

    openActivityNotepadDrawer() {
        const drawer = document.getElementById('activity-notepad-drawer');
        const btn = document.getElementById('btn-toggle-activity-notepad');
        if (!drawer) return;

        drawer.classList.add('open');
        if (btn) btn.classList.add('active');

        this.setupNotepad();
        const input = document.getElementById('player-notepad-input');
        if (input) setTimeout(() => input.focus(), 150);
    }

    closeActivityNotepadDrawer() {
        const drawer = document.getElementById('activity-notepad-drawer');
        const btn = document.getElementById('btn-toggle-activity-notepad');
        if (drawer) drawer.classList.remove('open');
        if (btn) btn.classList.remove('active');
    }

    // ─── LINE NUMBERS & ERROR HIGHLIGHTING ───
    updateLineNumbers(textarea, lineNumbersId) {
        const lines = textarea.value.split('\n').length;
        const lineNumbers = document.getElementById(lineNumbersId);
        if (!lineNumbers) return;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) =>
            `<div id="${lineNumbersId}-line-${i + 1}" onclick="window.app.ui.gotoEditorLine(${i + 1})">${i + 1}</div>`
        ).join('');
    }

    highlightEditorErrorLine(lineNum) {
        const lineEls = document.querySelectorAll(`[id$="-line-${lineNum}"]`);
        lineEls.forEach(el => {
            el.classList.add('error-line');
        });
    }

    getActiveEditorElement() {
        // Retorna o editor visível na tela atual
        const activityScreen = document.getElementById('screen-activity');
        const chapterScreen = document.getElementById('screen-chapter');
        const raidScreen = document.getElementById('screen-boss-raid');

        if (activityScreen && activityScreen.classList.contains('active')) {
            return document.getElementById('activity-editor');
        }
        if (raidScreen && raidScreen.classList.contains('active')) {
            return document.getElementById('raid-code-editor');
        }
        if (document.getElementById('tournament-code-editor')) {
            return document.getElementById('tournament-code-editor');
        }
        if (chapterScreen && chapterScreen.classList.contains('active')) {
            return document.getElementById('code-editor');
        }
        return document.getElementById('activity-editor') || document.getElementById('code-editor') || document.getElementById('raid-code-editor') || document.getElementById('tournament-code-editor');
    }

    gotoEditorLine(lineNum) {
        const textarea = this.getActiveEditorElement();
        if (!textarea) return;

        const lines = textarea.value.split('\n');
        const targetLine = Math.max(1, Math.min(lineNum, lines.length));
        let charPos = 0;
        for (let i = 0; i < targetLine - 1; i++) {
            charPos += lines[i].length + 1; // +1 para \n
        }

        textarea.focus();
        textarea.setSelectionRange(charPos, charPos + (lines[targetLine - 1] ? lines[targetLine - 1].length : 0));

        // Rola o scroll suavemente até a linha centralizada no editor
        const lineHeight = 24; // px
        textarea.scrollTop = Math.max(0, (targetLine - 3) * lineHeight);

        // Feedback visual
        this.highlightEditorErrorLine(targetLine);
    }

    applyQuickFix(lineNum, encodedBad, encodedGood) {
        const textarea = this.getActiveEditorElement();
        if (!textarea) return;

        const bad = decodeURIComponent(encodedBad).trim();
        const good = decodeURIComponent(encodedGood).trim();
        const lines = textarea.value.split('\n');

        // Localiza o índice exato da linha a ser corrigida
        let targetIndex = -1;

        // 1. Verifica primeiro a linha indicada no diagnóstico
        if (lineNum >= 1 && lineNum <= lines.length) {
            const lineContent = lines[lineNum - 1].trim();
            if (bad && (lineContent === bad || lineContent.includes(bad) || bad.includes(lineContent))) {
                targetIndex = lineNum - 1;
            }
        }

        // 2. Se a linha mudou de posição (ex: usuário deu Enter antes), busca pelo conteúdo exato da linha com erro
        if (targetIndex === -1 && bad) {
            targetIndex = lines.findIndex(l => l.trim() === bad || (bad.length > 5 && l.trim().includes(bad)));
        }

        // 3. Fallback seguro para o lineNum original se dentro do range
        if (targetIndex === -1 && lineNum >= 1 && lineNum <= lines.length) {
            targetIndex = lineNum - 1;
        }

        if (targetIndex !== -1) {
            // Preserva a indentação original da linha
            const originalLine = lines[targetIndex];
            const indentMatch = originalLine.match(/^[ \t]+/);
            const indent = indentMatch ? indentMatch[0] : '';

            // Aplica a sugestão preservando a indentação
            lines[targetIndex] = indent + good;
            textarea.value = lines.join('\n');

            // Dispara evento 'input' para atualizar instantaneamente o overlay de syntax highlight
            textarea.dispatchEvent(new Event('input', { bubbles: true }));

            // Atualiza linha e gutter
            let lineNumbersId = 'line-numbers';
            let highlightId = 'code-editor-highlight';
            let outputId = 'terminal-output';

            if (textarea.id === 'activity-editor') {
                lineNumbersId = 'activity-line-numbers';
                highlightId = 'activity-editor-highlight';
                outputId = 'activity-terminal-output';
            } else if (textarea.id === 'raid-code-editor') {
                lineNumbersId = 'raid-line-numbers';
                highlightId = 'raid-editor-highlight';
                outputId = 'raid-terminal-output';
            } else if (textarea.id === 'tournament-code-editor') {
                lineNumbersId = 'tournament-line-numbers';
                highlightId = 'tournament-editor-highlight';
                outputId = 'tournament-terminal-output';
            }

            const highlightEl = document.getElementById(highlightId);
            if (highlightEl) {
                const codeEl = highlightEl.querySelector('code') || highlightEl;
                codeEl.innerHTML = this.highlightCCode(textarea.value) + '\n';
            }
            this.updateLineNumbers(textarea, lineNumbersId);

            // Remove o highlight de erro da linha
            document.querySelectorAll('.line-numbers div.error-line').forEach(el => el.classList.remove('error-line'));

            this.showToast(`Linha ${targetIndex + 1} corrigida com sucesso!`, 'success');

            // Re-executa e atualiza a saída do terminal de imediato
            this.runCode(textarea.value, outputId);
        }
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

        const isCSharp = this.isCSharpWorld();

        if (isCSharp) {
            container.innerHTML = `
                <div class="c-guide-container" style="padding:0.75rem;font-size:0.8rem;color:var(--text-primary);line-height:1.5;">
                    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:0.4rem;margin-bottom:0.6rem;">
                        <strong style="color:var(--cyan);font-size:0.88rem;display:flex;align-items:center;gap:0.4rem;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                            Guia de Consulta Rápida — C# & Unity 6.5
                        </strong>
                        <span style="font-size:0.7rem;color:var(--text-dim);">Referência de Game Dev & C#</span>
                    </div>

                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:0.75rem;">
                        <!-- 1. Tipos e Debug.Log -->
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:0.6rem;">
                            <h4 style="margin:0 0 0.35rem 0;color:var(--gold);font-size:0.78rem;display:flex;align-items:center;gap:0.35rem;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
                                1. Tipos Primitivos & Saída
                            </h4>
                            <div style="font-size:0.72rem;">
                                <p style="margin:0.2rem 0;">• <code>int vida = 100;</code> (Inteiro)</p>
                                <p style="margin:0.2rem 0;">• <code>float vel = 5.5f;</code> <span style="color:var(--cyan);">(Sufixo f obrigatório)</span></p>
                                <p style="margin:0.2rem 0;">• <code>string nome = "Kael";</code> | <code>bool vivo = true;</code></p>
                                <p style="margin:0.2rem 0;">• <strong>Imprimir:</strong> <code>Debug.Log("Vida: " + vida);</code></p>
                            </div>
                        </div>

                        <!-- 2. GameObjects e Transform -->
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:0.6rem;">
                            <h4 style="margin:0 0 0.35rem 0;color:var(--gold);font-size:0.78rem;display:flex;align-items:center;gap:0.35rem;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                                2. Ciclo de Vida & Transform
                            </h4>
                            <div style="font-size:0.72rem;">
                                <p style="margin:0.2rem 0;">• <code>void Start() { }</code> (1x no início)</p>
                                <p style="margin:0.2rem 0;">• <code>void Update() { }</code> (A cada frame)</p>
                                <p style="margin:0.2rem 0;">• <code>transform.Translate(Vector3.forward * vel * Time.deltaTime);</code></p>
                                <p style="margin:0.2rem 0;">• <code>transform.Rotate(0, 90 * Time.deltaTime, 0);</code></p>
                            </div>
                        </div>

                        <!-- 3. Vetores e Física -->
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:0.6rem;">
                            <h4 style="margin:0 0 0.35rem 0;color:var(--gold);font-size:0.78rem;display:flex;align-items:center;gap:0.35rem;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                                3. Vetores 3D & Rigidbody
                            </h4>
                            <div style="font-size:0.72rem;">
                                <p style="margin:0.2rem 0;">• <code>Vector3 pos = new Vector3(x, y, z);</code></p>
                                <p style="margin:0.2rem 0;">• <code>GetComponent&lt;Rigidbody&gt;().AddForce(Vector3.up * forca);</code></p>
                                <p style="margin:0.2rem 0;">• <code>void OnCollisionEnter(Collision col) { }</code></p>
                                <p style="margin:0.2rem 0;">• <code>void OnTriggerEnter(Collider other) { }</code></p>
                            </div>
                        </div>

                        <!-- 4. Instanciação e Coleções -->
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:0.6rem;">
                            <h4 style="margin:0 0 0.35rem 0;color:var(--gold);font-size:0.78rem;display:flex;align-items:center;gap:0.35rem;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                                4. Prefabs, Instanciação & Listas
                            </h4>
                            <div style="font-size:0.72rem;">
                                <p style="margin:0.2rem 0;">• <code>Instantiate(prefab, pos, rot);</code></p>
                                <p style="margin:0.2rem 0;">• <code>Destroy(gameObject, 2.0f);</code></p>
                                <p style="margin:0.2rem 0;">• <code>List&lt;string&gt; inventario = new List&lt;string&gt;();</code></p>
                                <p style="margin:0.2rem 0;">• <code>inventario.Add("Espada Rúnica");</code></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

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

        const isCSharp = this.isCSharpWorld(code);

        // Se stdin não foi pré-fornecido (ex: testes automáticos) e o código possui scanf em C, executa com captura inline no terminal
        if (!isCSharp && !stdin && typeof window !== 'undefined' && /\bscanf\s*\(/.test(code)) {
            return this.runCodeWithInteractiveTerminal(code, outputId);
        }

        let result;
        if (isCSharp && typeof window.CSharpInterpreter === 'function') {
            const csInterp = new window.CSharpInterpreter();
            result = csInterp.executeFormatted ? csInterp.executeFormatted(code) : csInterp.execute(code);
        } else if (isCSharp) {
            // C# world mas interpreter não carregado — retorna erro claro sem usar o C interpreter
            result = {
                output: '',
                errors: [{ type: 'error', title: 'Intérprete C# Indisponível', msg: 'Não foi possível carregar o motor Unity C#. Recarregue a página (F5).', line: 0, fix: null }],
                warnings: []
            };
        } else {
            this.interpreter.inputCallback = null;
            result = this.interpreter.execute(code, stdin);
        }

        // Normaliza output: CSharpInterpreter.execute retorna array; executeFormatted retorna string
        if (Array.isArray(result.output)) {
            result = Object.assign({}, result, { output: result.output.join('\n') });
        }
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

                // Limpa highlights de erro anteriores nas linhas do editor
                document.querySelectorAll('.line-numbers div.error-line').forEach(el => el.classList.remove('error-line'));

                result.errors.forEach(err => {
                    if (typeof err === 'object' && err !== null) {
                        // Diagnostic Card Rico
                        const card = document.createElement('div');
                        card.className = `terminal-diag-card ${err.type === 'warning' ? 'warning' : ''}`;

                        // Destaca a linha no editor se fornecida
                        if (err.line) {
                            this.highlightEditorErrorLine(err.line);
                        }

                        let fixHtml = '';
                        if (err.fix) {
                            fixHtml = `
                                <div class="diag-fix-box">
                                    <div class="diag-fix-row bad"><span>- Incorreto:</span> <code>${err.fix.bad.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></div>
                                    <div class="diag-fix-row good"><span>+ Sugestão:</span> <code>${err.fix.good.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></div>
                                </div>
                            `;
                        }

                        card.innerHTML = `
                            <div class="diag-header">
                                <div class="diag-title-row">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                    <span>${err.title || 'Diagnóstico de Sintaxe'}</span>
                                </div>
                                ${err.line ? `<span class="diag-line-badge" onclick="window.app.ui.gotoEditorLine(${err.line})">LINHA ${err.line} ↗</span>` : ''}
                            </div>
                            <div class="diag-msg">${err.msg}</div>
                            ${fixHtml}
                            <div class="diag-action-bar">
                                ${err.fix && err.line ? `<button type="button" class="diag-quickfix-btn" onclick="window.app.ui.applyQuickFix(${err.line}, \`${encodeURIComponent(err.fix.bad)}\`, \`${encodeURIComponent(err.fix.good)}\`)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> CORRIGIR LINHA</button>` : ''}
                                ${err.line ? `<button type="button" class="diag-goto-btn" onclick="window.app.ui.gotoEditorLine(${err.line})">Focar no Editor</button>` : ''}
                            </div>
                        `;
                        outputEl.appendChild(card);
                    } else {
                        const el = document.createElement('div');
                        el.className = 'terminal-line error';
                        el.innerHTML = '<span class="term-hl-error">[ ERRO ]</span> ' + this.formatTerminalLine(err);
                        outputEl.appendChild(el);
                    }

                    // Subclasse Debugger Perk: Escudo de Diagnóstico (db_error_shield)
                    if (hasShield) {
                        const tipEl = document.createElement('div');
                        tipEl.className = 'terminal-line hint';
                        tipEl.style.color = 'var(--green)';
                        tipEl.style.fontSize = '0.78rem';
                        tipEl.style.paddingLeft = '1rem';
                        const shieldMsg = isCSharp
                            ? '[ Diagnóstico Debugger ]: Verifique a sintaxe próxima ao erro acima, fechamento de chaves {} e ponto-e-vírgula (;) em C#.'
                            : '[ Diagnóstico Debugger ]: Verifique a sintaxe próxima ao erro acima, fechamento de chaves {} e ponto-e-vírgula (;).';
                        tipEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> <em>${shieldMsg}</em>`;
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
                if (isCSharp) {
                    // C# Unity: verifica anti-padrões de Unity
                    const csWarnings = [];
                    if (/GetComponent\s*</.test(code) && !/if\s*\(.*GetComponent/.test(code) && !/\?\s*\./.test(code)) {
                        csWarnings.push('Use <code>GetComponent&lt;T&gt;()</code> com verifica\u00e7\u00e3o de null: <code>if (rb != null)</code> antes de acessar o componente.');
                    }
                    if (/Destroy\s*\(/.test(code) && !/null/.test(code) && !/gameObject/.test(code)) {
                        csWarnings.push('Ao usar <code>Destroy()</code>, certifique-se que o objeto n\u00e3o \u00e9 nulo antes de destruir.');
                    }
                    if (/new\s+\w+\s*\(/.test(code) && !/MonoBehaviour/.test(code) && !/using/.test(code)) {
                        csWarnings.push('Evite <code>new</code> para MonoBehaviours. Use <code>Instantiate(prefab)</code> no Unity.');
                    }
                    csWarnings.forEach(msg => {
                        const warnEl = document.createElement('div');
                        warnEl.className = 'terminal-line warning';
                        warnEl.style.color = '#f59e0b';
                        warnEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> <strong>[ Reviewer C# Unity ]:</strong> ${msg}`;
                        outputEl.appendChild(warnEl);
                    });
                } else {
                    // C: verifica malloc sem free
                    if (code.includes('malloc') && !code.includes('free')) {
                        const warnEl = document.createElement('div');
                        warnEl.className = 'terminal-line warning';
                        warnEl.style.color = '#f59e0b';
                        warnEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> <strong>[ Reviewer - An\u00e1lise Est\u00e1tica ]:</strong> Foi detectada aloca\u00e7\u00e3o din\u00e2mica sem <code>free()</code> correspondente.`;
                        outputEl.appendChild(warnEl);
                    }
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
            
            // Renderiza cada caso de teste detalhadamente na aba de Testes com Diff Viewer
            if (testResults) {
                validation.testResults.forEach((t, idx) => {
                    const el = document.createElement('div');
                    el.className = `test-case ${t.pass ? 'pass' : 'fail'}`;
                    
                    let diffViewerHtml = '';
                    if (!t.pass && t.expected !== undefined && t.got !== undefined) {
                        diffViewerHtml = `
                            <div class="diff-viewer-card">
                                <div class="diff-row expected">
                                    <span class="diff-tag">ESPERADO:</span>
                                    <span class="diff-content">${t.expected.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
                                </div>
                                <div class="diff-row got">
                                    <span class="diff-tag">OBTIDO:</span>
                                    <span class="diff-content">${(t.got || '(vazio)').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
                                </div>
                            </div>
                        `;
                    }

                    el.innerHTML = `
                        <div style="width:100%;">
                            <div style="display:flex;align-items:center;gap:0.6rem;">
                                <span class="test-icon">${t.pass ? '[PASS]' : '[FAIL]'}</span>
                                <span>${t.description}</span>
                                <span class="test-detail">${idx + 1}/${validation.testResults.length}</span>
                            </div>
                            ${diffViewerHtml}
                        </div>
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
                        const firstFail = validation.testResults.find(r => !r.pass);
                        let detailHint = 'Revise os formatos de leitura/impressão e quebras de linha (\\n).';
                        if (firstFail && firstFail.expected !== undefined && firstFail.actual !== undefined) {
                            const exp = String(firstFail.expected);
                            const act = String(firstFail.actual);
                            if (act.toLowerCase() === exp.toLowerCase() && act !== exp) {
                                detailHint = 'Divergência de letras maiúsculas/minúsculas entre o esperado e a sua saída.';
                            } else if (act.replace(/\s+/g, '') === exp.replace(/\s+/g, '')) {
                                detailHint = 'Divergência apenas em espaços ou quebras de linha (\\n).';
                            } else {
                                detailHint = `Esperava receber "<code>${exp.replace(/</g, '&lt;')}</code>", mas o programa gerou "<code>${act.replace(/</g, '&lt;')}</code>".`;
                            }
                        }

                        const oracleEl = document.createElement('div');
                        oracleEl.className = 'terminal-line hint';
                        oracleEl.style.color = '#38bdf8';
                        oracleEl.style.background = 'rgba(56, 189, 248, 0.08)';
                        oracleEl.style.border = '1px solid rgba(56, 189, 248, 0.4)';
                        oracleEl.style.padding = '0.6rem 0.85rem';
                        oracleEl.style.borderRadius = '4px';
                        oracleEl.style.marginTop = '0.6rem';
                        oracleEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg> <strong>[ Oráculo Algorítmico ]:</strong> ${detailHint}`;
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
        const isCSharp = this.isCSharpWorld();
        const totalChapters = isCSharp ? 38 : 16;
        const langName = isCSharp ? 'C# e Unity 6.5' : 'Linguagem C';
        const glossaryTitle = isCSharp ? 'GRIMÓRIO C# & UNITY (GLOSSÁRIO)' : 'GRIMÓRIO C (GLOSSÁRIO)';
        const glossaryDesc = isCSharp
            ? 'Biblioteca de consulta com snippets, sintaxe de scripts em C#, ciclo de vida MonoBehaviour, física 3D, UI e comandos de Unity para sua jornada!'
            : 'Sua enciclopédia rápida com tabelas de tipos, ponteiros, estruturas, funções da biblioteca padrão do C e exemplos práticos para suas missões.';

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
                targetSelector: '#btn-inventory',
                badge: 'SISTEMA — ARTEFATOS & PODER',
                title: 'INVENTÁRIO & CÂMARA DE TRANSMUTAÇÃO',
                desc: 'Acesse seus equipamentos arcanos coletados em missões e boss raids (Coroas, Cálices, Anéis e Tornozeleiras). Equipe-os nos seus avatares, analise substatus secundários e aprimore o nível e potencial máximo na Câmara de Transmutação!'
            },
            {
                targetSelector: '.nav-btn-missions',
                badge: 'SESSÃO 1 — MAPA MÚNDI',
                title: `MAPA DA ASCENSÃO (${totalChapters} CAPÍTULOS)`,
                desc: `O núcleo da sua jornada de programação em ${langName}. Arraste pelo mapa interativo para desbloquear novos territórios e chefões conforme purifica cada capítulo com seu código. Você também vê onde cada membro da Guilda está posicionado!`
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
                targetSelector: '.nav-btn-glossary',
                badge: 'SESSÃO 10 — CONHECIMENTO ARCANO',
                title: glossaryTitle,
                desc: glossaryDesc
            },
            {
                targetSelector: '.mini-chat-widget',
                badge: 'SESSÃO 11 — COMUNICAÇÃO EM TEMPO REAL',
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
                // Se for o chat ou elemento fixo que possa estar oculto, garante visibilidade
                if (target.classList.contains('mini-chat-widget') || target.closest('.mini-chat-widget')) {
                    target.style.display = 'block';
                }

                target.classList.add('onboarding-target-highlight');
                
                const isFixed = window.getComputedStyle(target).position === 'fixed';
                if (!isFixed) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
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

                // Para o Mini Chat (fixado no canto inferior esquerdo)
                if (target.classList.contains('mini-chat-widget') || target.closest('.mini-chat-widget')) {
                    top = Math.max(16, rect.top - cardHeight - gap);
                    left = Math.max(16, rect.left);
                }
                // Para elementos da sidebar esquerda, prioriza posicionamento à direita
                else if (target.closest('.left-nav-sidebar')) {
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

    
    }

    if (typeof UIRenderer !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_Extension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(UIRenderer.prototype, descriptors);
    }
})();
