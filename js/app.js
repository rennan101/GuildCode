/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Main Application Controller
   Ties together engine, UI, auth, and handles all user interactions.
   ═══════════════════════════════════════════════════════════════ */

class GuildCodeApp {
    constructor() {
        this.engine = new GameEngine();
        this.ui = new UIRenderer(this.engine);
        this.tutorialStep = 0;
    }

    init() {
        this.ui.initParticles();
        this.bindGlobalEvents();
        this.bindAuthEvents();
        this.bindLoginEvents();

        // Loading screen → check auth state
        this.ui.showScreen('loading');
        authManager.onAuthChange = (user) => this.onAuthStateChanged(user);
        authManager.init();
    }

    // ─── AUTH STATE ───
    async onAuthStateChanged(user) {
        if (user) {
            // User is signed in — load cloud progress
            const loaded = await this.engine.loadFromCloud();
            if (loaded && this.engine.state.initialized && this.engine.getPlayerName()) {
                // Has saved game — go to dashboard
                setTimeout(() => {
                    this.ui.showScreen('dashboard');
                    this.ui.renderDashboard();
                    this.ui.showToast(`Bem-vindo de volta, ${this.engine.getPlayerName()}!`, 'info');
                }, 1500);
            } else {
                // New user or no save — check if name was already entered
                setTimeout(() => {
                    if (this.engine.state.initialized && this.engine.getPlayerName()) {
                        this.ui.showScreen('dashboard');
                        this.ui.renderDashboard();
                    } else {
                        this.ui.showScreen('name');
                        this.ui.setupNameEntry((name) => this.onNameConfirmed(name));
                    }
                }, 1500);
            }
        } else {
            // Not signed in — show login screen
            setTimeout(() => {
                this.ui.showScreen('login');
            }, 1500);
        }
    }

    // ─── LOGIN EVENTS ───
    bindLoginEvents() {
        // Google login
        const btnGoogle = document.getElementById('btn-login-google');
        if (btnGoogle) {
            btnGoogle.onclick = async () => {
                this.setLoginLoading(true);
                try {
                    await authManager.loginWithGoogle();
                    // onAuthStateChanged will handle redirect
                } catch (e) {
                    this.showLoginError(e.message);
                    this.setLoginLoading(false);
                }
            };
        }

        // Email login
        const btnEmailLogin = document.getElementById('btn-login-email');
        if (btnEmailLogin) {
            btnEmailLogin.onclick = async () => {
                const email = document.getElementById('login-email').value.trim();
                const pass = document.getElementById('login-password').value;
                if (!email || !pass) {
                    this.showLoginError('Preencha email e senha.');
                    return;
                }
                this.setLoginLoading(true);
                try {
                    await authManager.loginWithEmail(email, pass);
                } catch (e) {
                    this.showLoginError(this.translateAuthError(e.code));
                    this.setLoginLoading(false);
                }
            };
        }

        // Show register form
        const btnShowRegister = document.getElementById('btn-show-register');
        if (btnShowRegister) {
            btnShowRegister.onclick = () => {
                document.getElementById('login-form-area').style.display = 'none';
                document.getElementById('register-form-area').style.display = 'block';
                document.getElementById('login-error').textContent = '';
            };
        }

        // Show login form
        const btnShowLogin = document.getElementById('btn-show-login');
        if (btnShowLogin) {
            btnShowLogin.onclick = () => {
                document.getElementById('register-form-area').style.display = 'none';
                document.getElementById('login-form-area').style.display = 'block';
                document.getElementById('login-error').textContent = '';
            };
        }

        // Register
        const btnRegister = document.getElementById('btn-register');
        if (btnRegister) {
            btnRegister.onclick = async () => {
                const name = document.getElementById('reg-name').value.trim();
                const email = document.getElementById('reg-email').value.trim();
                const pass = document.getElementById('reg-password').value;
                const pass2 = document.getElementById('reg-password2').value;

                if (!name || !email || !pass) {
                    this.showLoginError('Preencha todos os campos.');
                    return;
                }
                if (pass !== pass2) {
                    this.showLoginError('As senhas não coincidem.');
                    return;
                }
                if (pass.length < 6) {
                    this.showLoginError('A senha deve ter pelo menos 6 caracteres.');
                    return;
                }

                this.setLoginLoading(true);
                try {
                    await authManager.registerWithEmail(email, pass, name);
                    // onAuthStateChanged will handle redirect
                } catch (e) {
                    this.showLoginError(this.translateAuthError(e.code));
                    this.setLoginLoading(false);
                }
            };
        }

        // Enter key on login fields
        const loginPass = document.getElementById('login-password');
        if (loginPass) {
            loginPass.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') document.getElementById('btn-login-email').click();
            });
        }
    }

    // ─── AUTH BUTTONS (logout etc) ───
    bindAuthEvents() {
        // Logout button on dashboard
        document.addEventListener('click', (e) => {
            if (e.target.id === 'btn-logout' || e.target.closest('#btn-logout')) {
                this.handleLogout();
            }
        });
    }

    async handleLogout() {
        // Save progress before logout
        await this.engine.saveToCloud();
        await authManager.logout();
        // onAuthStateChanged will show login screen
    }

    // ─── LOGIN HELPERS ───
    showLoginError(msg) {
        const el = document.getElementById('login-error');
        if (el) el.textContent = msg;
    }

    setLoginLoading(loading) {
        const btns = document.querySelectorAll('#screen-login .glow-button');
        btns.forEach(b => b.disabled = loading);
        const spinner = document.getElementById('login-spinner');
        if (spinner) spinner.style.display = loading ? 'block' : 'none';
    }

    translateAuthError(code) {
        const map = {
            'auth/user-not-found': 'Usuário não encontrado.',
            'auth/wrong-password': 'Senha incorreta.',
            'auth/email-already-in-use': 'Este email já está em uso.',
            'auth/invalid-email': 'Email inválido.',
            'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres).',
            'auth/too-many-requests': 'Muitas tentativas. Aguarde um momento.',
            'auth/popup-closed-by-user': 'Popup fechado. Tente novamente.',
            'auth/network-request-failed': 'Erro de rede. Verifique sua conexão.'
        };
        return map[code] || 'Erro ao autenticar. Tente novamente.';
    }

    // ─── GAME EVENTS ───
    bindGlobalEvents() {
        // Title screen
        document.getElementById('btn-start').onclick = () => {
            this.ui.showScreen('name');
            this.ui.setupNameEntry((name) => this.onNameConfirmed(name));
        };

        // Dashboard
        document.getElementById('btn-back-dashboard').onclick = () => {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        };

        // Chapter editor buttons
        document.getElementById('btn-run-code').onclick = () => {
            const code = document.getElementById('code-editor').value;
            this.ui.runCode(code, 'terminal-output');
        };

        document.getElementById('btn-reset-code').onclick = () => {
            const ch = this.ui.currentChapterData;
            if (ch && ch.experiment) {
                document.getElementById('code-editor').value = ch.experiment.starterCode;
                this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
            }
        };

        document.getElementById('btn-check-code').onclick = () => {
            const code = document.getElementById('code-editor').value;
            this.ui.runCode(code, 'terminal-output');
        };

        document.getElementById('btn-clear-terminal').onclick = () => {
            document.getElementById('terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Terminal limpo.</div>';
        };

        // Activity editor buttons
        document.getElementById('btn-run-activity').onclick = () => {
            const code = document.getElementById('activity-editor').value;
            this.ui.runCode(code, 'activity-terminal-output');
        };

        document.getElementById('btn-submit-activity').onclick = () => {
            const code = document.getElementById('activity-editor').value;
            const passed = this.ui.checkActivity(code);

            if (passed) {
                const ch = this.ui.currentChapterData;
                const actIdx = this.engine.state.currentActivity;
                this.engine.completeChapterStep(ch.id, `act${actIdx + 1}`);
                this.engine.addXP(ch.activities[actIdx].difficulty === 'easy' ? 30 : 50);
                this.ui.showToast(`+${ch.activities[actIdx].difficulty === 'easy' ? 30 : 50} XP`, 'xp');
                this.engine.incrementStat('activitiesCompleted');
                this.engine.saveToCloud(); // sync to Firestore

                const allDone = ch.activities.every((_, idx) =>
                    this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id][`act${idx + 1}`]
                );

                if (allDone) {
                    setTimeout(() => this.completeChapterReward(ch.id), 1000);
                } else {
                    setTimeout(() => {
                        this.ui.showToast('Atividade completada!', 'success');
                        setTimeout(() => {
                            this.ui.openChapter(ch.id);
                        }, 1500);
                    }, 500);
                }
            }
        };

        document.getElementById('btn-reset-activity').onclick = () => {
            const act = this.ui.currentActivityData;
            if (act) {
                document.getElementById('activity-editor').value = act.starterCode;
                this.ui.updateLineNumbers(document.getElementById('activity-editor'), 'activity-line-numbers');
            }
        };

        document.getElementById('btn-hint').onclick = () => {
            const tabs = document.querySelectorAll('.terminal-tab');
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.terminal-panel').forEach(p => p.classList.remove('active'));
            tabs[2].classList.add('active');
            document.getElementById('panel-hints').classList.add('active');
        };

        document.getElementById('btn-back-chapter').onclick = () => {
            if (this.ui.currentChapterData) {
                this.ui.openChapter(this.ui.currentChapterData.id);
            }
        };

        document.getElementById('btn-reward-continue').onclick = () => {
            this.engine.saveToCloud(); // sync after reward
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        };

        document.getElementById('btn-modal-close').onclick = () => {
            this.ui.hideModal();
        };

        document.querySelector('.modal-backdrop').onclick = () => {
            this.ui.hideModal();
        };
    }

    onNameConfirmed(name) {
        this.engine.setPlayerName(name);
        this.engine.saveToCloud();
        this.ui.showScreen('prologue');
        this.ui.playPrologue(name, () => {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
            this.ui.showToast(`Bem-vindo, ${name}!`, 'info');
        });
    }

    openChapter(chapterId) {
        this.ui.openChapter(chapterId);
    }

    startActivity(activityIndex) {
        this.ui.startActivity(activityIndex);
    }

    startExperiment() {
        const ch = this.ui.currentChapterData;
        if (ch && ch.experiment) {
            document.getElementById('code-editor').value = ch.experiment.starterCode;
            this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
            document.getElementById('terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Modo experimentação. Modifique e execute.</div>';
        }
    }

    startTutorial() {
        const ch = this.ui.currentChapterData;
        if (!ch || !ch.tutorial) return;
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
        document.getElementById('code-editor').value = step.starterCode;
        this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');

        const terminal = document.getElementById('terminal-output');
        terminal.innerHTML = `
            <div class="terminal-line system">[ TUTORIAL ] Passo ${this.tutorialStep + 1}/${steps.length}</div>
            <div class="terminal-line highlight">${step.instruction}</div>
            <div class="terminal-line info">Dica: ${step.hint}</div>
        `;

        const originalRun = document.getElementById('btn-run-code').onclick;
        document.getElementById('btn-run-code').onclick = () => {
            const code = document.getElementById('code-editor').value;
            const result = this.ui.runCode(code, 'terminal-output');
            const solution = step.solution.replace(/\s+/g, ' ').trim();
            const current = code.replace(/\s+/g, ' ').trim();
            if (current === solution || this.ui.checkActivity(code)) {
                this.engine.completeTutorialStep(ch.id, this.tutorialStep);
                this.tutorialStep++;
                this.engine.addXP(15);
                this.engine.saveToCloud();
                this.ui.showToast('Passo concluído! +15 XP', 'xp');
                setTimeout(() => this.showTutorialStep(ch), 1000);
            }
        };

        document.getElementById('btn-check-code').onclick = () => {
            document.getElementById('code-editor').value = step.solution;
            this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
        };
    }

    completeChapterReward(chapterId) {
        const ch = CHAPTERS.find(c => c.id === chapterId);
        if (!ch) return;

        this.engine.completeChapter(chapterId);
        this.engine.addXP(ch.xpReward);
        this.engine.saveToCloud();

        this.ui.showReward(chapterId);

        setTimeout(() => {
            this.ui.showModal(
                'SISTEMA DESBLOQUEADO',
                `${ch.unlockIcon} ${ch.unlock} foi restaurado na Guilda! Um novo módulo está operacional.`
            );
        }, 500);
    }
}

// ─── BOOT ───
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GuildCodeApp();
    app.init();
});
