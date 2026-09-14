/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App: navigation-events.js
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _AppExtension {
bindGlobalEvents() {
        // Universal magitech click sound & circular magic ripple effect for all clicks
        document.addEventListener('click', (e) => {
            if (window.soundFX) {
                window.soundFX.playClick();
            }
            this.createClickRipple(e.clientX, e.clientY);
        });

        // Proteção contra download/cópia de imagens: bloqueia botão direito e arraste
        document.addEventListener('contextmenu', (e) => {
            const isImage = e.target.closest && (
                e.target.closest('img') ||
                e.target.closest('picture') ||
                e.target.closest('svg') ||
                e.target.closest('canvas') ||
                e.target.closest('.inv-avatar-card-img-wrap') ||
                e.target.closest('.inv-avatar-card-img') ||
                e.target.closest('.hero-char-img') ||
                e.target.closest('.landing-hero-char-cutout') ||
                e.target.closest('.map-canvas') ||
                e.target.closest('.boss-portrait') ||
                e.target.closest('.gacha-card') ||
                e.target.closest('.tcg-card-3d')
            );
            if (isImage) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, { capture: true });

        document.addEventListener('dragstart', (e) => {
            if (e.target && (e.target.nodeName === 'IMG' || e.target.closest?.('img, svg, picture, canvas'))) {
                e.preventDefault();
                return false;
            }
        }, { capture: true });

        document.getElementById('btn-start').onclick = () => {
            this.ui.showScreen('name');
            this.ui.setupNameEntry((name) => this.onNameConfirmed(name));
        };
        document.getElementById('btn-back-dashboard').onclick = () => {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        };
        document.getElementById('btn-run-code').onclick = () => {
            const editorSection = document.querySelector(".editor-section");
            if (editorSection && editorSection.classList.contains("collapsed")) {
                this.ui.showToast('Abra o editor no experimento ou em uma atividade para programar!', 'info');
                return;
            }
            if (window.soundFX) window.soundFX.playRunCode();
            const code = document.getElementById('code-editor').value;
            this.ui.runCode(code, 'terminal-output');
        };
        document.getElementById('btn-reset-code').onclick = () => {
            const editorSection = document.querySelector(".editor-section");
            if (editorSection && editorSection.classList.contains("collapsed")) return;
            const ch = this.ui.currentChapterData;
            if (ch) {
                let code = '';
                if (ch.experiment && ch.experiment.starterCode && ch.experiment.starterCode.trim().length > 0) {
                    code = ch.experiment.starterCode;
                } else if (ch.concept && ch.concept.code) {
                    code = ch.concept.code;
                } else if (ch.example && ch.example.code) {
                    code = ch.example.code;
                }
                document.getElementById('code-editor').value = code;
                this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
            }
        };
        document.getElementById('btn-check-code').onclick = () => {
            const editorSection = document.querySelector(".editor-section");
            if (editorSection && editorSection.classList.contains("collapsed")) {
                this.ui.showToast('Abra o editor no experimento ou em uma atividade para programar!', 'info');
                return;
            }
            if (window.soundFX) window.soundFX.playRunCode();
            const code = document.getElementById('code-editor').value;
            const res = this.ui.runCode(code, 'terminal-output');
            if (res && (!res.errors || res.errors.length === 0) && res.output) {
                if (window.soundFX) window.soundFX.playCheckCodeSuccess();
            } else {
                if (window.soundFX) window.soundFX.playCheckCodeFail();
            }
        };
        document.getElementById('btn-clear-terminal').onclick = () => {
            document.getElementById('terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Terminal limpo.</div>';
        };
        document.getElementById('btn-run-activity').onclick = () => {
            if (window.soundFX) window.soundFX.playRunCode();
            const code = document.getElementById('activity-editor').value;
            this.ui.runCode(code, 'activity-terminal-output');
        };
        document.getElementById('btn-submit-activity').onclick = () => {
            this.handleActivitySubmit();
        };
        document.getElementById('btn-reset-activity').onclick = () => {
            const act = this.ui.currentActivityData;
            if (act) {
                const clean = this.ui.cleanStarterCode ? this.ui.cleanStarterCode(act.starterCode) : act.starterCode;
                document.getElementById('activity-editor').value = clean;
                this.ui.updateLineNumbers(document.getElementById('activity-editor'), 'activity-line-numbers');
            }
        };
        document.getElementById('btn-back-chapter').onclick = () => {
            if (this.ui.currentChapterData) {
                this.ui.openChapter(this.ui.currentChapterData.id);
            }
        };
        document.getElementById('btn-reward-continue').onclick = () => {
            this.engine.saveToCloud();
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        };
        const btnModalClose = document.getElementById('btn-modal-close');
        if (btnModalClose) btnModalClose.onclick = () => { this.ui.hideModal(); };
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) modalBackdrop.onclick = () => { this.ui.hideModal(); };

        // Settings Panel events
        const settingsCloseBtn = document.getElementById('settings-close');
        if (settingsCloseBtn) settingsCloseBtn.onclick = () => { this.closeSettings(); };
        const settingsBackdrop = document.getElementById('settings-backdrop');
        if (settingsBackdrop) {
            settingsBackdrop.onclick = (e) => {
                if (e.target === settingsBackdrop) this.closeSettings();
            };
        }
        const settingsLogoutBtn = document.getElementById('settings-logout');
        if (settingsLogoutBtn) settingsLogoutBtn.onclick = () => { this.handleLogout(); };
        const settingsDeleteBtn = document.getElementById('settings-delete-account');
        if (settingsDeleteBtn) settingsDeleteBtn.onclick = () => { this.showDeleteAccountModal(); };

        // Theme options in settings
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.onclick = () => {
                const themeName = opt.dataset.theme;
                if (themeName) this.setTheme(themeName);
            };
        });

        // ─── PERSISTÊNCIA CRÍTICA: Salva imediatamente ao fechar, trocar de aba ou recarregar ───
        window.addEventListener('beforeunload', () => {
            if (this.engine) {
                this.engine.save();
                this.engine.saveToCloud(true);
            }
        });
        window.addEventListener('pagehide', () => {
            if (this.engine) {
                this.engine.save();
                this.engine.saveToCloud(true);
            }
        });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden' && this.engine) {
                this.engine.save();
                this.engine.saveToCloud(true);
            }
        });
    }

    createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'magic-click-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.pointerEvents = 'none';

        const innerRing = document.createElement('div');
        innerRing.className = 'magic-click-inner';
        innerRing.style.pointerEvents = 'none';
        ripple.appendChild(innerRing);

        const spark = document.createElement('div');
        spark.className = 'magic-click-spark';
        spark.style.pointerEvents = 'none';
        ripple.appendChild(spark);

        document.body.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 650);
    }

    completeChapterReward(chapterId) {
        const isCSharp = (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        const activeList = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : CHAPTERS;
        const ch = activeList.find(c => c.id === chapterId);
        if (!ch) return;
        this.engine.completeChapter(chapterId);
        const leveledUp = this.engine.addXP(ch.xpReward);
        this.engine.saveToCloud();
        this.ui.showReward(chapterId);
        if (leveledUp) {
            this.ui.showLevelUpAnimation(this.engine.getLevel());
        }
        setTimeout(() => {
            this.ui.showModal('SISTEMA DESBLOQUEADO', ch.unlock + ' foi restaurado na Guilda!');
        }, 500);
    }

    startIntro() {
        if (this.ui && typeof this.ui.showScreen === 'function') {
            this.ui.showScreen('intro');
        }
        const intro = new IntroSequence((nick) => {
            this.engine.setPlayerName(nick);
            this.engine.completeIntro();
            this.engine.saveToCloud();
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
            this.ui.showToast('Bem-vindo, ' + nick + '!', 'info');
            setTimeout(() => {
                this.ui.startInteractiveOnboarding();
            }, 600);
        });
        intro.start();
    }

    onNameConfirmed(name) {
        this.engine.setPlayerName(name);
        this.engine.saveToCloud();
        this.ui.showScreen('prologue');
        this.ui.playPrologue(name, () => {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
            this.ui.showToast('Bem-vindo, ' + name + '!', 'info');
            setTimeout(() => {
                this.ui.startInteractiveOnboarding();
            }, 600);
        });
    }

    openChapter(chapterId) { 
        this.ui.openChapter(chapterId); 
    }

    startActivity(activityIndex, forceNewVariant = false) {
        this.ui.startActivity(activityIndex, forceNewVariant);
        this.ui.openEditor();
    }

    advanceDialogue() { this.ui.advanceDialogue(); }
    toggleAutoPlay() { this.ui.toggleAutoPlay(); }
    toggleEditor() { this.ui.toggleEditor(); }

    startExperiment() {
        const ch = this.ui.currentChapterData;
        if (ch) {
            let code = '';
            if (ch.experiment && ch.experiment.starterCode && ch.experiment.starterCode.trim().length > 0) {
                code = ch.experiment.starterCode;
            } else if (ch.concept && ch.concept.code) {
                code = ch.concept.code;
            } else if (ch.example && ch.example.code) {
                code = ch.example.code;
            }
            document.getElementById('code-editor').value = code;
            this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
            document.getElementById('terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Modo experimentacao. Modifique e execute.</div>';
            this.ui.openEditor();
        }
    }

    startTutorial() {
        const ch = this.ui.currentChapterData;
        if (!ch || !ch.tutorial) return;
        this.ui.openEditor();
        this.tutorialStep = this.engine.getTutorialStep(ch.id);
        this.showTutorialStep(ch);
    }

    showTutorialStep(ch) {
        const steps = ch.tutorial.steps;
        if (this.tutorialStep >= steps.length) {
            this.engine.completeChapterStep(ch.id, 'tutorial');
            this.engine.addXP(20);
            this.engine.saveToCloud();
            this.ui.showToast('Tutorial completo! +20 XP', 'xp');
            this.ui.openChapter(ch.id);
            return;
        }
        const step = steps[this.tutorialStep];
        document.getElementById('code-editor').value = this.ui.cleanStarterCode ? this.ui.cleanStarterCode(step.starterCode) : step.starterCode;
        this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
        const terminal = document.getElementById('terminal-output');
        terminal.innerHTML = '<div class="terminal-line system">[ TUTORIAL ] Passo ' + (this.tutorialStep + 1) + '/' + steps.length + '</div>' +
            '<div class="terminal-line highlight">' + step.instruction + '</div>' +
            '<div class="terminal-line info">Dica: ' + step.hint + '</div>';
        document.getElementById('btn-run-code').onclick = () => {
            const code = document.getElementById('code-editor').value;
            const result = this.ui.runCode(code, 'terminal-output');
            const solution = step.solution.replace(/\s+/g, ' ').trim();
            const current = code.replace(/\s+/g, ' ').trim();
            if (current === solution) {
                this.engine.completeTutorialStep(ch.id, this.tutorialStep);
                this.tutorialStep++;
                this.engine.addXP(15);
                this.engine.saveToCloud();
                this.ui.showToast('Passo concluido! +15 XP', 'xp');
                setTimeout(() => this.showTutorialStep(ch), 1000);
            }
        };
        document.getElementById('btn-check-code').onclick = () => {
            document.getElementById('code-editor').value = this.ui.cleanStarterCode ? this.ui.cleanStarterCode(step.solution) : step.solution;
            this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
        };
    }

    async toggleChapterUnlock(chapterId) {
        let unlocks = this.engine.getChapterUnlocks();
        if (chapterId === 0 || chapterId === 1) return;
        if (unlocks.includes(chapterId)) {
            unlocks = unlocks.filter(id => id !== chapterId);
        } else {
            unlocks.push(chapterId);
        }
        this.engine.setChapterUnlocks(unlocks);
        try {
            if (typeof authManager !== 'undefined' && authManager.isSignedIn()) {
                const classCode = authManager.getClassCode();
                if (classCode) {
                    await fbDB.collection('classes').doc(classCode).update({ chapterUnlocks: unlocks });
                }
            }
        } catch(e) { console.warn('Failed to save chapter unlocks:', e); }
        if (typeof authManager !== 'undefined' && authManager.isTeacher()) {
            const students = await authManager.getClassStudents();
            this.ui.renderAdminDashboard(students);
        }
        this.ui.showToast('Capitulos atualizados', 'info');
    }
// == CHALLENGE SELECTOR ==
    }

    if (typeof GuildCodeApp !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_AppExtension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(GuildCodeApp.prototype, descriptors);
    }
})();
