/* ═══════════════════════════════════════════════════════════════
   GUILDCODE / CODE LEVELER — Sound Synthesis Engine
   Web Audio API: clicks, sci-fi magic, code execution, validation
   ═══════════════════════════════════════════════════════════════ */
class SoundEffects {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }
    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }
    playTone(freq, duration = 0.08, type = 'sine', vol = 0.08) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {}
    }
    playClick() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            
            // ── Camada 1: Cristal Mágico (Dual Harmônico com Decaimento Rápido) ──
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(2200, now);
            osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.05);
            gain1.gain.setValueAtTime(0.09, now);
            gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
            osc1.connect(gain1);
            gain1.connect(this.ctx.destination);
            osc1.start(now);
            osc1.stop(now + 0.065);

            // ── Camada 2: Cyber Resonant Pulse (Ataque tecnológico afiado) ──
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(750, now);
            osc2.frequency.exponentialRampToValueAtTime(320, now + 0.035);
            gain2.gain.setValueAtTime(0.12, now);
            gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
            osc2.connect(gain2);
            gain2.connect(this.ctx.destination);
            osc2.start(now);
            osc2.stop(now + 0.045);

            // ── Camada 3: Shimmer de Mana (Micro ressonância aguda) ──
            const osc3 = this.ctx.createOscillator();
            const gain3 = this.ctx.createGain();
            osc3.type = 'sine';
            osc3.frequency.setValueAtTime(3500, now);
            osc3.frequency.exponentialRampToValueAtTime(4400, now + 0.03);
            gain3.gain.setValueAtTime(0.04, now);
            gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
            osc3.connect(gain3);
            gain3.connect(this.ctx.destination);
            osc3.start(now);
            osc3.stop(now + 0.045);
        } catch (e) {}
    }
    playRunCode() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            // Cyber spell casting / Code execution sound
            const now = this.ctx.currentTime;
            [440, 660, 880].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                const startTime = now + (idx * 0.04);
                osc.frequency.setValueAtTime(freq, startTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.5, startTime + 0.08);
                gain.gain.setValueAtTime(0.04, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.085);
            });
        } catch (e) {}
    }
    playCheckCodeSuccess() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            // Victory / Code verified chord
            const now = this.ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                const startTime = now + (idx * 0.05);
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.08, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.36);
            });
        } catch (e) {}
    }
    playCheckCodeFail() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            [300, 220].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                const startTime = now + (idx * 0.08);
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.08, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.16);
            });
        } catch (e) {}
    }
    playDanger() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(80, now + 0.6);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.6);
        } catch (e) {}
    }
    playMagic() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            [587.33, 739.99, 880, 1174.66, 1479.98].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                const startTime = now + (idx * 0.06);
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.08, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.52);
            });
        } catch (e) {}
    }
}
window.soundFX = new SoundEffects();

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
        this.loadTheme();
        this.ui.showScreen('loading');
        authManager.onAuthChange = (user) => this.onAuthStateChanged(user);
        authManager.init();
    }

    async onAuthStateChanged(user) {
        const updateLoadingText = (text, hasDots = false) => {
            const sub = document.querySelector('.loading-subtitle');
            if (sub) {
                if (hasDots) {
                    sub.innerHTML = `${text}<span class="loading-dots"></span>`;
                } else {
                    sub.textContent = text;
                }
            }
        };

        if (user) {
            updateLoadingText('Sincronizando dados com o servidor', true);
            const loaded = await this.engine.loadFromCloud();
            this.loadTheme();
            if (typeof authManager !== 'undefined' && authManager.isTeacher()) {
                try {
                    const classCode = authManager.getClassCode();
                    if (classCode) {
                        const classDoc = await fbDB.collection('classes').doc(classCode).get();
                        if (classDoc.exists && classDoc.data().chapterUnlocks) {
                            this.engine.setChapterUnlocks(classDoc.data().chapterUnlocks);
                        }
                    }
                } catch(e) { console.warn('Failed to load class chapter unlocks:', e); }
            }
            updateLoadingText('Sistema pronto.');
            const isCompleted = this.engine.isIntroCompleted() || this.engine.isOnboardingCompleted();

            if (isCompleted && hasName) {
                if (!this.engine.state.playerName && typeof authManager !== 'undefined') {
                    this.engine.setPlayerName(authManager.getDisplayName());
                }
                this.ui.showScreen('dashboard');
                this.ui.renderDashboard();
                this.ui.showToast('Bem-vindo de volta, ' + this.engine.getPlayerName() + '!', 'info');
            } else {
                // Primeira experiência obrigatória: Intro completa (História do Isekai -> Erro do Sistema -> Roleta de Classe -> Nome/Confirmação -> Orientação -> Onboarding Interativo)
                this.startIntro();
            }
        } else {
            this.setLoginLoading(false);
            updateLoadingText('Aguardando autenticação...');
            this.ui.showScreen('login');
        }
    }

    togglePasswordVisibility(inputId, btnEl) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        const eyeOpenSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        const eyeClosedSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

        if (input.type === 'password') {
            input.type = 'text';
            if (btnEl) btnEl.innerHTML = eyeOpenSvg;
        } else {
            input.type = 'password';
            if (btnEl) btnEl.innerHTML = eyeClosedSvg;
        }
    }

    resetAllPasswordFields() {
        const eyeClosedSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
        ['login-password', 'reg-password', 'reg-password2'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.type = 'password';
                el.classList.remove('input-error');
            }
        });
        document.querySelectorAll('.password-toggle-btn').forEach(btn => {
            btn.innerHTML = eyeClosedSvg;
        });
        ['login-email', 'reg-name', 'reg-email', 'reg-classcode'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('input-error');
        });
    }

    bindLoginEvents() {
        const btnGoogle = document.getElementById('btn-login-google');
        if (btnGoogle) {
            btnGoogle.onclick = async () => {
                this.setLoginLoading(true);
                try { await authManager.loginWithGoogle(); } catch (e) {
                    this.showLoginError(e.message, 'login'); this.setLoginLoading(false);
                }
            };
        }
        const btnEmailLogin = document.getElementById('btn-login-email');
        if (btnEmailLogin) {
            btnEmailLogin.onclick = async () => {
                this.resetAllPasswordFields();
                const emailEl = document.getElementById('login-email');
                const passEl = document.getElementById('login-password');
                const email = (emailEl?.value || '').trim();
                const pass = passEl?.value || '';

                if (!email && !pass) {
                    if (emailEl) emailEl.classList.add('input-error');
                    if (passEl) passEl.classList.add('input-error');
                    this.showLoginError('Informe o email e a senha.', 'login');
                    return;
                }
                if (!email) {
                    if (emailEl) { emailEl.classList.add('input-error'); emailEl.focus(); }
                    this.showLoginError('O campo Email está vazio.', 'login');
                    return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    if (emailEl) { emailEl.classList.add('input-error'); emailEl.focus(); }
                    this.showLoginError('Formato de email inválido.', 'login');
                    return;
                }
                if (!pass) {
                    if (passEl) { passEl.classList.add('input-error'); passEl.focus(); }
                    this.showLoginError('O campo Senha está vazio.', 'login');
                    return;
                }

                this.setLoginLoading(true);
                try {
                    await authManager.loginWithEmail(email, pass);
                } catch (e) {
                    if (e.code === 'auth/wrong-password') {
                        if (passEl) passEl.classList.add('input-error');
                        this.showLoginError('A senha informada está incorreta.', 'login');
                    } else if (e.code === 'auth/user-not-found') {
                        if (emailEl) emailEl.classList.add('input-error');
                        this.showLoginError('Nenhuma conta encontrada com este email.', 'login');
                    } else if (e.code === 'auth/invalid-email') {
                        if (emailEl) emailEl.classList.add('input-error');
                        this.showLoginError('O email digitado é inválido.', 'login');
                    } else {
                        this.showLoginError(this.translateAuthError(e.code), 'login');
                    }
                    this.setLoginLoading(false);
                }
            };
        }
        const btnShowRegister = document.getElementById('btn-show-register');
        if (btnShowRegister) {
            btnShowRegister.onclick = () => {
                this.resetAllPasswordFields();
                document.getElementById('login-form-area').style.display = 'none';
                document.getElementById('register-form-area').style.display = 'block';
                const err = document.getElementById('login-error');
                if (err) err.textContent = '';
                const errReg = document.getElementById('login-error-reg');
                if (errReg) errReg.textContent = '';
            };
        }
        const btnShowLogin = document.getElementById('btn-show-login');
        if (btnShowLogin) {
            btnShowLogin.onclick = () => {
                this.resetAllPasswordFields();
                document.getElementById('register-form-area').style.display = 'none';
                document.getElementById('login-form-area').style.display = 'block';
                const err = document.getElementById('login-error');
                if (err) err.textContent = '';
                const errReg = document.getElementById('login-error-reg');
                if (errReg) errReg.textContent = '';
            };
        }
        const btnRegister = document.getElementById('btn-register');
        if (btnRegister) {
            btnRegister.onclick = async () => {
                this.resetAllPasswordFields();
                const nameEl = document.getElementById('reg-name');
                const emailEl = document.getElementById('reg-email');
                const passEl = document.getElementById('reg-password');
                const pass2El = document.getElementById('reg-password2');

                const name = (nameEl?.value || '').trim();
                const email = (emailEl?.value || '').trim();
                const pass = passEl?.value || '';
                const pass2 = pass2El?.value || '';
                const classCode = (document.getElementById('reg-classcode')?.value || '').trim();

                if (!name) {
                    if (nameEl) { nameEl.classList.add('input-error'); nameEl.focus(); }
                    this.showLoginError('Informe seu Nome ou Codinome.', 'register');
                    return;
                }
                if (!email) {
                    if (emailEl) { emailEl.classList.add('input-error'); emailEl.focus(); }
                    this.showLoginError('Informe um Email válido.', 'register');
                    return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    if (emailEl) { emailEl.classList.add('input-error'); emailEl.focus(); }
                    this.showLoginError('O formato do Email é inválido.', 'register');
                    return;
                }
                if (!pass) {
                    if (passEl) { passEl.classList.add('input-error'); passEl.focus(); }
                    this.showLoginError('Crie uma Senha para sua conta.', 'register');
                    return;
                }
                if (pass.length < 6) {
                    if (passEl) { passEl.classList.add('input-error'); passEl.focus(); }
                    this.showLoginError('A Senha deve ter no mínimo 6 caracteres.', 'register');
                    return;
                }
                if (pass !== pass2) {
                    if (pass2El) { pass2El.classList.add('input-error'); pass2El.focus(); }
                    this.showLoginError('A confirmação de senha não coincide.', 'register');
                    return;
                }

                this.setLoginLoading(true);
                try {
                    await authManager.registerWithEmail(email, pass, name, classCode);
                } catch (e) {
                    if (e.code === 'auth/email-already-in-use') {
                        if (emailEl) emailEl.classList.add('input-error');
                        this.showLoginError('Este Email já está cadastrado em outra conta.', 'register');
                    } else if (e.code === 'auth/weak-password') {
                        if (passEl) passEl.classList.add('input-error');
                        this.showLoginError('A Senha é muito fraca (use letras e números).', 'register');
                    } else {
                        this.showLoginError(this.translateAuthError(e.code), 'register');
                    }
                    this.setLoginLoading(false);
                }
            };
        }
        const loginPass = document.getElementById('login-password');
        if (loginPass) {
            loginPass.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') document.getElementById('btn-login-email').click();
            });
        }
    }

    bindAuthEvents() {
        document.addEventListener('click', (e) => {
            // Settings panel and delete confirm handled separately
        });
    }

    async handleLogout() {
        this.resetAllPasswordFields();
        this.closeSettings();
        const delBackdrop = document.getElementById("delete-confirm-backdrop");
        if (delBackdrop) delBackdrop.classList.remove("active");
        try {
            await this.engine.saveToCloud();
        } catch (e) {}
        this.engine.resetGame();
        await authManager.logout();
    }

    showLoginError(msg, context = 'login') {
        const el = context === 'register' ? document.getElementById('login-error-reg') : document.getElementById('login-error');
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
            'auth/user-not-found': 'Usuario nao encontrado.',
            'auth/wrong-password': 'Senha incorreta.',
            'auth/email-already-in-use': 'Este email ja esta em uso.',
            'auth/invalid-email': 'Email invalido.',
            'auth/weak-password': 'Senha muito fraca (minimo 6 caracteres).',
            'auth/too-many-requests': 'Muitas tentativas. Aguarde.',
            'auth/popup-closed-by-user': 'Popup fechado. Tente novamente.',
            'auth/network-request-failed': 'Erro de rede.'
        };
        return map[code] || 'Erro ao autenticar.';
    }

    bindGlobalEvents() {
        // Universal magitech click sound & circular magic ripple effect for all clicks
        document.addEventListener('click', (e) => {
            if (window.soundFX) {
                window.soundFX.playClick();
            }
            this.createClickRipple(e.clientX, e.clientY);
        });

        document.getElementById('btn-start').onclick = () => {
            this.ui.showScreen('name');
            this.ui.setupNameEntry((name) => this.onNameConfirmed(name));
        };
        document.getElementById('btn-back-dashboard').onclick = () => {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        };
        document.getElementById('btn-run-code').onclick = () => {
            if (window.soundFX) window.soundFX.playRunCode();
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
            const code = document.getElementById('activity-editor').value;
            const passed = this.ui.checkActivity(code);
            if (passed) {
                if (window.soundFX) window.soundFX.playCheckCodeSuccess();
                const ch = this.ui.currentChapterData;
                const actIdx = this.engine.state.currentActivity;
                const wasAlreadyCompleted = !!(this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id]['act' + (actIdx + 1)]);
                
                this.engine.completeChapterStep(ch.id, 'act' + (actIdx + 1));
                
                if (!wasAlreadyCompleted) {
                    const xpGain = ch.activities[actIdx].difficulty === 'easy' ? 30 : 50;
                    const leveledUp = this.engine.addXP(xpGain);
                    this.ui.showToast('+' + xpGain + ' XP', 'xp');
                    if (leveledUp) {
                        this.ui.showLevelUpAnimation(this.engine.getLevel());
                    }
                    this.engine.incrementStat('activitiesCompleted');
                } else {
                    this.ui.showToast('Atividade concluída novamente! (Modo Treino - Sem XP adicional)', 'info');
                }
                
                this.engine.saveToCloud();
                const allDone = ch.activities.every((_, idx) =>
                    this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id]['act' + (idx + 1)]
                );
                if (allDone && !this.engine.isChapterCompleted(ch.id)) {
                    setTimeout(() => this.completeChapterReward(ch.id), 1000);
                } else {
                    setTimeout(() => {
                        this.ui.openChapter(ch.id);
                    }, 1200);
                }
            } else {
                if (window.soundFX) window.soundFX.playCheckCodeFail();
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
        const settingsSaveBtn = document.getElementById('settings-save-nick');
        if (settingsSaveBtn) settingsSaveBtn.onclick = () => { this.saveSettings(); };
        const settingsNicknameInput = document.getElementById('settings-nickname');
        if (settingsNicknameInput) {
            settingsNicknameInput.onkeydown = (e) => {
                if (e.key === 'Enter') this.saveSettings();
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
    }

    createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'magic-click-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        const innerRing = document.createElement('div');
        innerRing.className = 'magic-click-inner';
        ripple.appendChild(innerRing);

        const spark = document.createElement('div');
        spark.className = 'magic-click-spark';
        ripple.appendChild(spark);

        document.body.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 650);
    }

    completeChapterReward(chapterId) {
        const ch = CHAPTERS.find(c => c.id === chapterId);
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

    requireGuildForActivity() {
        if (typeof authManager === 'undefined') return true;
        if (authManager.isTeacher() || authManager.isAdmin()) return true;
        if (!authManager.hasGuild()) {
            this.ui.showJoinGuildModal('Você precisa estar vinculado a uma Guilda para realizar atividades.');
            return false;
        }
        return true;
    }

    startActivity(activityIndex) {
        if (!this.requireGuildForActivity()) return;
        this.ui.startActivity(activityIndex);
        this.ui.openEditor();
    }

    advanceDialogue() { this.ui.advanceDialogue(); }
    toggleAutoPlay() { this.ui.toggleAutoPlay(); }
    toggleEditor() { this.ui.toggleEditor(); }

    startExperiment() {
        if (!this.requireGuildForActivity()) return;
        const ch = this.ui.currentChapterData;
        if (ch && ch.experiment) {
            document.getElementById('code-editor').value = ch.experiment.starterCode;
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
        document.getElementById('code-editor').value = step.starterCode;
        this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
        const terminal = document.getElementById('terminal-output');
        terminal.innerHTML = '<div class="terminal-line system">[ TUTORIAL ] Passo ' + (this.tutorialStep + 1) + '/' + steps.length + '</div>' +
            '<div class="terminal-line highlight">' + step.instruction + '</div>' +
            '<div class="terminal-line info">Dica: ' + step.hint + '</div>';
        document.getElementById('btn-run-code').onclick = () => {
            const code = document.getElementById('code-editor').value;
            const result = this.ui.runCode(code, 'terminal-output');
            const solution = step.solution.replace(/s+/g, ' ').trim();
            const current = code.replace(/s+/g, ' ').trim();
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
            document.getElementById('code-editor').value = step.solution;
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
    showChallengeSelector() {
        if (typeof rankedManager === 'undefined') {
            this.ui.showToast('Sistema de desafios não disponível', 'error');
            return;
        }
        var content = document.getElementById('ranked-content');
        if (!content) return;
        var chapterList = CHAPTERS.map(function(ch) { 
            return '<div class="pvp-chapter-card" onclick="app.selectChallengeChapter(' + ch.id + ')">' +
            '<div class="chapter-number" style="font-size:0.75rem;min-width:65px;font-weight:700;color:var(--purple-bright);">CAP ' + String(ch.id).padStart(2, '0') + '</div>' +
            '<div class="chapter-info" style="flex:1;"><div class="chapter-item-title" style="font-size:0.9rem;font-weight:700;margin-bottom:0.2rem;color:var(--text-primary);">' + ch.title + '</div>' +
            '<div class="chapter-item-theme" style="font-size:0.72rem;color:var(--text-dim);">' + ch.theme + '</div></div>' +
            '<div style="color:var(--purple-bright);font-weight:700;font-size:0.8rem;">SELECIONAR ➔</div></div>';
        }).join('');

        content.innerHTML = '<div class="pvp-select-container">' +
            '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem;">' +
            '<button class="glow-button" onclick="app.openRanked()" style="font-size:0.75rem;padding:0.4rem 1.2rem;">◀ VOLTAR</button>' +
            '</div>' +
            '<div class="pvp-select-header-box">' +
            '<h3 class="pvp-select-title">SELECIONAR CAPÍTULO PARA O DUELO</h3>' +
            '<p class="pvp-select-subtitle">Escolha o capítulo base. Três desafios desse capítulo serão sorteados para o duelo assíncrono.</p>' +
            '</div>' +
            '<div class="pvp-chapter-grid">' + chapterList + '</div>' +
            '</div>';
    }
    async selectChallengeChapter(chapterId) {
        try {
            var players = await rankedManager.searchPlayers('');
            if (players.length === 0) { this.ui.showToast('Nenhum colega encontrado na sua guilda.', 'info'); return; }
            var content = document.getElementById('ranked-content');
            var chapter = CHAPTERS.find(function(c) { return c.id === chapterId; });
            var playerList = players.map(function(p) {
                var gp = p.gameProgress || {};
                var renome = gp.renome !== undefined ? gp.renome : 100;
                var cp = gp.codePower || 1000;
                var tier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(renome) : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' };
                var avatarSrc = p.photoURL;
                var level = gp.level || 1;
                var completedChapters = gp.chapters ? Object.values(gp.chapters).filter(function(c){ return c && c.completed; }).length : 0;
                var power = gp.stats?.guildPower || Math.round((completedChapters / 15) * 100);
                var email = p.email || 'aluno@guildcode.com';

                return '<div style="padding:0.85rem 1.2rem;margin-bottom:0.6rem;border:1px solid var(--border-dim);background:var(--bg-panel);display:flex;justify-content:space-between;align-items:center;border-radius:6px;gap:1rem;flex-wrap:wrap;">' +
                '<div style="display:flex;align-items:center;gap:0.9rem;flex:1;min-width:240px;">' +
                '<div style="width:38px;height:38px;border-radius:50%;border:1.5px solid ' + tier.color + ';overflow:hidden;background:var(--bg-deep);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                (avatarSrc ? '<img src="' + avatarSrc + '" style="width:100%;height:100%;object-fit:cover;">' : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--purple-bright)"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>') +
                '</div>' +
                '<div>' +
                '<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">' +
                '<span style="color:var(--text-primary);font-weight:700;font-size:0.92rem;">' + (p.displayName || 'Jogador') + '</span>' +
                '<span style="font-size:0.7rem;color:var(--text-dim);">' + email + '</span>' +
                '</div>' +
                '<div style="font-size:0.72rem;color:var(--text-dim);display:flex;gap:0.6rem;margin-top:0.2rem;flex-wrap:wrap;">' +
                '<span style="color:var(--cyan);font-weight:600;">LV. ' + String(level).padStart(2, '0') + '</span> &bull; ' +
                '<span>Cap: <strong style="color:var(--text-primary)">' + completedChapters + '/15</strong></span> &bull; ' +
                '<span style="color:var(--gold)">Power: <strong>' + power + '%</strong></span> &bull; ' +
                '<span style="color:' + tier.color + '">' + tier.icon + ' ' + tier.name + '</span> &bull; ' +
                '<span style="color:var(--purple-bright)">' + cp + ' CP</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<button class="glow-button primary" style="font-size:0.75rem;padding:0.45rem 1.2rem" onclick="app.sendChallenge(\'' + p.uid + '\', \'' + (p.displayName||'Jogador').replace(/'/g, "\\'") + '\', ' + chapterId + ')">DESAFIAR ⚔</button></div>';
            }).join('');

            content.innerHTML = '<div class="pvp-select-container">' +
                '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem;">' +
                '<button class="glow-button" onclick="app.showChallengeSelector()" style="font-size:0.75rem;padding:0.4rem 1.2rem">◀ VOLTAR</button>' +
                '</div>' +
                '<div class="pvp-select-header-box">' +
                '<h3 class="pvp-select-title">DESAFIAR EM: ' + (chapter ? chapter.title.toUpperCase() : '') + '</h3>' +
                '<p class="pvp-select-subtitle">Selecione o adversário para enviar o desafio de código:</p>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;width:100%;">' + (playerList || '<p class="pvp-empty">Nenhum colega encontrado.</p>') + '</div>' +
                '</div>';
        } catch (e) { console.error(e); this.ui.showToast('Erro ao buscar jogadores', 'error'); }
    }
    async sendChallenge(targetUid, targetName, chapterId) {
        try {
            await rankedManager.createChallenge(targetUid, targetName, chapterId);
            this.ui.showToast('Desafio enviado para ' + targetName + '!', 'success');
            this.openRanked();
        } catch (e) { console.error(e); this.ui.showToast('Erro ao enviar desafio', 'error'); }
    }
    async acceptChallenge(challengeId) {
        if (typeof rankedManager === 'undefined') return;
        try {
            var challenges = await rankedManager.getPendingChallenges();
            var challenge = challenges.find(function(c) { return c.id === challengeId; });
            if (!challenge) { this.ui.showToast('Desafio não encontrado', 'error'); return; }
            this.ui.showToast('Desafio aceito!', 'info');
            this.openChapter(challenge.chapterId);
        } catch (e) { console.error(e); this.ui.showToast('Erro ao aceitar desafio', 'error'); }
    }
    // == CREATE TOURNAMENT ==
    async createTournament() {
        if (typeof tournamentManager === 'undefined') return;
        var content = document.getElementById('tournament-content');
        if (!content) return;
        var chapterChecks = CHAPTERS.map(function(ch) {
            return '<label class="tournament-check-label" style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0.6rem;background:var(--bg-deep);border:1px solid var(--border-dim);border-radius:3px;font-size:0.75rem;cursor:pointer;">'
            + '<input type="checkbox" value="' + ch.id + '" class="tournament-chapter-check">'
            + '<span>CAP ' + String(ch.id).padStart(2, '0') + ' — ' + ch.title + ' (' + (ch.activities ? ch.activities.length : 3) + ' atv)</span>'
            + '</label>';
        }).join('');
        content.innerHTML = '<div class="tournament-screen">'
            + '<div class="tournament-header">'
            + '<div class="tournament-header-info">'
            + '<h2 class="tournament-title">FORJAR SALA DE TORNEIO</h2>'
            + '<p class="tournament-subtitle">Configure os parâmetros da batalha em tempo real para os membros da Guilda.</p>'
            + '</div>'
            + '<button class="glow-button tournament-back-btn" onclick="app.openTournaments()">◀ VOLTAR</button>'
            + '</div>'
            + '<div class="tournament-form hud-panel" style="display:flex;flex-direction:column;gap:1.2rem;max-width:800px;margin:0 auto;background:var(--bg-panel);border:1px solid var(--border-dim);padding:1.8rem;border-radius:4px;">'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">NOME DO TORNEIO</label>'
            + '<input type="text" id="tournament-name" class="settings-input" placeholder="Ex: Torneio Semanal — Batalha dos Algoritmos" maxlength="40">'
            + '</div>'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">SELECIONAR ASSUNTOS (CAPÍTULOS)</label>'
            + '<div class="tournament-checks" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:0.5rem;max-height:220px;overflow-y:auto;padding:0.6rem;background:var(--bg-deep);border:1px solid var(--border-ghost);border-radius:3px;">' + chapterChecks + '</div>'
            + '</div>'
            + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;">'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">TEMPO LIMITE (MINUTOS)</label>'
            + '<input type="number" id="tournament-time" class="settings-input" value="15" min="5" max="180">'
            + '</div>'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">DESAFIOS POR ASSUNTO</label>'
            + '<select id="tournament-challenges-count" class="settings-input" style="cursor:pointer;">'
            + '<option value="1">1 desafio por capítulo</option>'
            + '<option value="2" selected>2 desafios por capítulo</option>'
            + '<option value="3">Todos os desafios (3 por capítulo)</option>'
            + '</select>'
            + '</div>'
            + '</div>'
            + '<button class="glow-button primary pulse-action" style="padding:0.75rem;margin-top:0.5rem;font-weight:700;font-size:0.85rem;" onclick="app.submitCreateTournament()">⚔ CRIAR SALA DE TORNEIO</button>'
            + '</div>'
            + '</div>';
    }

    async submitCreateTournament() {
        var name = document.getElementById('tournament-name').value.trim();
        var timeLimit = parseInt(document.getElementById('tournament-time').value) || 15;
        var countPerCh = parseInt(document.getElementById('tournament-challenges-count').value) || 2;
        var checks = document.querySelectorAll('.tournament-chapter-check:checked');
        var chapterIds = Array.from(checks).map(function(c) { return parseInt(c.value); });
        if (!name) { this.ui.showToast('Digite um nome para o torneio', 'error'); return; }
        if (chapterIds.length === 0) { this.ui.showToast('Selecione pelo menos um capítulo', 'error'); return; }
        try {
            var id = await tournamentManager.create(name, chapterIds, timeLimit, countPerCh);
            this.ui.showToast('Sala de torneio criada!', 'success');
            this.openTournamentLobby(id);
        } catch (e) { console.error(e); this.ui.showToast('Erro ao criar torneio', 'error'); }
    }

    async openEditTournament(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        var content = document.getElementById('tournament-content');
        if (!content) return;
        this.ui.showScreen('tournament');

        const renderEditForm = (t) => {
            var selectedIds = t.chapterIds || [];
            var chapterChecks = CHAPTERS.map(function(ch) {
                var isChecked = selectedIds.includes(ch.id) ? 'checked' : '';
                return '<label class="tournament-check-label" style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0.6rem;background:var(--bg-deep);border:1px solid var(--border-dim);border-radius:3px;font-size:0.75rem;cursor:pointer;">'
                + '<input type="checkbox" value="' + ch.id + '" class="tournament-chapter-check-edit" ' + isChecked + '>'
                + '<span>CAP ' + String(ch.id).padStart(2, '0') + ' — ' + ch.title + ' (' + (ch.activities ? ch.activities.length : 3) + ' atv)</span>'
                + '</label>';
            }).join('');

            content.innerHTML = '<div class="tournament-screen">'
                + '<div class="tournament-header">'
                + '<div class="tournament-header-info">'
                + '<h2 class="tournament-title">EDITAR SALA DE TORNEIO</h2>'
                + '<p class="tournament-subtitle">Ajuste os assuntos, tempo limite e quantidade de desafios desta sala.</p>'
                + '</div>'
                + '<button class="glow-button tournament-back-btn" onclick="app.openTournaments()">◀ VOLTAR</button>'
                + '</div>'
                + '<div class="tournament-form hud-panel" style="display:flex;flex-direction:column;gap:1.2rem;max-width:800px;margin:0 auto;background:var(--bg-panel);border:1px solid var(--border-dim);padding:1.8rem;border-radius:4px;">'
                + '<div class="tournament-form-group">'
                + '<label class="settings-label">NOME DO TORNEIO</label>'
                + '<input type="text" id="tournament-edit-name" class="settings-input" value="' + (t.title || '').replace(/"/g, '&quot;') + '" maxlength="40">'
                + '</div>'
                + '<div class="tournament-form-group">'
                + '<label class="settings-label">SELECIONAR ASSUNTOS (CAPÍTULOS)</label>'
                + '<div class="tournament-checks" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:0.5rem;max-height:220px;overflow-y:auto;padding:0.6rem;background:var(--bg-deep);border:1px solid var(--border-ghost);border-radius:3px;">' + chapterChecks + '</div>'
                + '</div>'
                + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;">'
                + '<div class="tournament-form-group">'
                + '<label class="settings-label">TEMPO LIMITE (MINUTOS)</label>'
                + '<input type="number" id="tournament-edit-time" class="settings-input" value="' + (t.timeLimit || 15) + '" min="5" max="180">'
                + '</div>'
                + '<div class="tournament-form-group">'
                + '<label class="settings-label">DESAFIOS POR ASSUNTO</label>'
                + '<select id="tournament-edit-challenges-count" class="settings-input" style="cursor:pointer;">'
                + '<option value="1" ' + (t.challengeCountPerChapter === 1 ? 'selected' : '') + '>1 desafio por capítulo</option>'
                + '<option value="2" ' + (!t.challengeCountPerChapter || t.challengeCountPerChapter === 2 ? 'selected' : '') + '>2 desafios por capítulo</option>'
                + '<option value="3" ' + (t.challengeCountPerChapter === 3 ? 'selected' : '') + '>Todos os desafios (3 por capítulo)</option>'
                + '</select>'
                + '</div>'
                + '</div>'
                + '<div style="display:flex;gap:0.8rem;margin-top:0.5rem;">'
                + '<button class="glow-button primary pulse-action" style="flex:1;padding:0.75rem;font-weight:700;" onclick="app.submitEditTournament(\'' + tournamentId + '\')">💾 SALVAR ALTERAÇÕES</button>'
                + '<button class="glow-button" style="padding:0.75rem 1.8rem;" onclick="app.openTournaments()">CANCELAR</button>'
                + '</div>'
                + '</div>'
                + '</div>';
        };

        var cached = (this._cachedTournaments && this._cachedTournaments.find(tor => tor.id === tournamentId)) || tournamentManager.currentTournament;
        if (cached && cached.id === tournamentId) {
            renderEditForm(cached);
        } else {
            content.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--gold);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO DADOS DO TORNEIO...</div></div>';
            try {
                var doc = await fbDB.collection('tournaments').doc(tournamentId).get();
                if (!doc.exists) {
                    this.ui.showToast('Torneio não encontrado', 'error');
                    this.openTournaments();
                    return;
                }
                renderEditForm({ id: doc.id, ...doc.data() });
            } catch (e) {
                console.error(e);
                this.ui.showToast('Erro ao carregar dados do torneio', 'error');
                this.openTournaments();
            }
        }
    }

    async submitEditTournament(tournamentId) {
        var name = document.getElementById('tournament-edit-name').value.trim();
        var timeLimit = parseInt(document.getElementById('tournament-edit-time').value) || 15;
        var countPerCh = parseInt(document.getElementById('tournament-edit-challenges-count').value) || 2;
        var checks = document.querySelectorAll('.tournament-chapter-check-edit:checked');
        var chapterIds = Array.from(checks).map(function(c) { return parseInt(c.value); });
        if (!name) { this.ui.showToast('Digite um nome para o torneio', 'error'); return; }
        if (chapterIds.length === 0) { this.ui.showToast('Selecione pelo menos um capítulo', 'error'); return; }
        try {
            await tournamentManager.edit(tournamentId, name, chapterIds, timeLimit, countPerCh);
            this.ui.showToast('Torneio atualizado com sucesso!', 'success');
            this.openTournaments();
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao salvar alterações', 'error');
        }
    }

    async confirmDeleteTournament(tournamentId, title) {
        var ok = confirm('Tem certeza que deseja excluir o torneio "' + (title || 'Torneio') + '" permanentemente?');
        if (!ok) return;
        try {
            await tournamentManager.delete(tournamentId);
            this.ui.showToast('Torneio excluído com sucesso!', 'info');
            this.openTournaments();
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao excluir torneio', 'error');
        }
    }

    // == TOURNAMENT LOBBY ==
    async openTournamentLobby(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        var content = document.getElementById('tournament-content');
        if (!content) return;
        this.ui.showScreen('tournament');

        // 1. Instant 0ms render if data is in memory / cache
        var cached = (this._cachedTournaments && this._cachedTournaments.find(tor => tor.id === tournamentId)) || tournamentManager.currentTournament;
        if (cached && cached.id === tournamentId) {
            this.currentTournamentData = cached;
            tournamentManager.currentTournament = cached;
            this.renderTournamentLobby(cached);
        } else {
            content.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--gold);font-size:0.85rem;letter-spacing:0.12em;">ENTRANDO NA SALA DE BATALHA...</div></div>';
        }

        // 2. Real-time stream updates
        tournamentManager.listenLeaderboard(tournamentId, (data) => {
            this.currentTournamentData = data;
            this.renderTournamentLobby(data);
        });
    }

    renderTournamentLobby(t) {
        var content = document.getElementById('tournament-content');
        if (!content) return;
        var isTeacher = typeof authManager !== 'undefined' && authManager.isTeacher();
        var participants = t.participants || [];
        var statusLabel = t.status === 'waiting' ? 'AGUARDANDO INÍCIO' : t.status === 'active' ? 'BATALHA EM ANDAMENTO' : 'TORNEIO ENCERRADO';
        var statusClass = t.status === 'waiting' ? 'waiting' : t.status === 'active' ? 'active' : 'ended';

        // Clean up previous tournament interval if any
        if (this.tournamentTimerInterval) {
            clearInterval(this.tournamentTimerInterval);
            this.tournamentTimerInterval = null;
        }

        var participantsHtml = participants.map(function(p) {
            var avatarSrc = p.photoURL;
            var level = p.level || 1;
            var completedChapters = p.completedChapters || 0;
            var power = p.power !== undefined ? p.power : Math.round((completedChapters / 15) * 100);
            var email = p.email || 'aluno@guildcode.com';

            return '<div class="tournament-participant-card" style="padding:0.9rem 1.1rem;background:var(--bg-panel);border:1px solid var(--border-dim);border-radius:6px;display:flex;align-items:center;gap:0.9rem;justify-content:space-between;cursor:pointer;" onclick="app.openPlayerProfile(\'' + (p.uid || '') + '\')">'
                + '<div style="display:flex;align-items:center;gap:0.8rem;flex:1;min-width:0;">'
                + '<div style="width:36px;height:36px;border-radius:50%;border:1.5px solid var(--purple-bright);overflow:hidden;background:var(--bg-deep);display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
                + (avatarSrc ? '<img src="' + avatarSrc + '" style="width:100%;height:100%;object-fit:cover;">' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--purple-bright)"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>')
                + '</div>'
                + '<div style="min-width:0;flex:1;">'
                + '<div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">'
                + '<span class="tournament-participant-name" style="font-weight:700;color:var(--text-primary);font-size:0.9rem;">' + (p.name || 'Jogador') + '</span>'
                + '<span style="font-size:0.68rem;color:var(--text-dim);">' + email + '</span>'
                + '</div>'
                + '<div style="font-size:0.7rem;color:var(--text-dim);display:flex;gap:0.5rem;margin-top:0.15rem;flex-wrap:wrap;">'
                + '<span style="color:var(--cyan);font-weight:600;">LV. ' + String(level).padStart(2, '0') + '</span> &bull; '
                + '<span>Cap: <strong style="color:var(--text-primary)">' + completedChapters + '/15</strong></span> &bull; '
                + '<span style="color:var(--gold)">Power: <strong>' + power + '%</strong></span>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<span class="tournament-participant-score" style="color:var(--gold);font-family:var(--font-code);font-size:0.85rem;font-weight:700;margin-left:0.5rem;">' + (p.score || 0) + ' pts</span>'
                + '</div>';
        }).join('');

        // Se o torneio NÃO está ativo (aguardando ou encerrado), mostra o Lobby
        if (t.status !== 'active') {
            content.innerHTML = '<div class="tournament-lobby">'
                + '<div class="tournament-header">'
                + '<h2 class="tournament-lobby-title">' + (t.title || 'TORNEIO') + '</h2>'
                + '<span class="tournament-lobby-status ' + statusClass + '">' + statusLabel + '</span>'
                + '</div>'
                + '<div class="tournament-meta">'
                + '<span class="tournament-meta-item">Tempo Limite: ' + (t.timeLimit || 15) + ' min</span>'
                + '<span class="tournament-meta-item">Participantes: ' + participants.length + '</span>'
                + '</div>'
                + '<div class="tournament-participants-grid">'
                + (participants.length === 0 ? '<p class="tournament-empty">Aguardando jogadores entrarem...</p>' : participantsHtml)
                + '</div>'
                + (isTeacher && t.status === 'waiting' ? '<div class="tournament-teacher-actions" style="margin-top:1.5rem;"><button class="glow-button primary pulse-action" style="padding:0.7rem 2.5rem;" onclick="app.startTournament()">INICIAR TORNEIO AGORA</button></div>' : '')
                + '</div>';
            return;
        }

        // ══════════════════════════════════════════════════════════════
        // SE O TORNEIO ESTÁ ATIVO: EXIBE A ARENA COMPLETA DE CÓDIGO
        // ══════════════════════════════════════════════════════════════
        var challengesList = [];
        if (t.challenges && t.challenges.length > 0) {
            t.challenges.forEach(function(chGroup) {
                if (chGroup.activities) {
                    chGroup.activities.forEach(function(act) {
                        challengesList.push({
                            ...act,
                            chapterTitle: chGroup.chapterTitle || 'Desafio'
                        });
                    });
                }
            });
        }

        // Desafio atual do usuário
        if (this.currentTournamentActIdx === undefined || this.currentTournamentActIdx >= challengesList.length) {
            this.currentTournamentActIdx = 0;
        }
        var curChallenge = challengesList[this.currentTournamentActIdx] || {
            title: 'Desafio do Torneio',
            description: 'Resolva o problema para pontuar no torneio.',
            starterCode: '#include <stdio.h>\n\nint main() {\n    printf("Ola Mundo\\n");\n    return 0;\n}'
        };

        // Renderiza a Arena do Torneio
        content.innerHTML = `
            <div class="tournament-arena-container" style="display:flex;flex-direction:column;gap:1rem;width:100%;height:100%;">
                <!-- TOURNAMENT TOP BAR -->
                <div style="display:flex;align-items:center;justify-content:space-between;background:var(--bg-panel);border:1px solid var(--border-dim);padding:0.8rem 1.4rem;border-radius:4px;flex-wrap:wrap;gap:0.8rem;">
                    <div>
                        <span style="font-family:var(--font-display);color:var(--gold);font-size:0.95rem;font-weight:700;">⚔ ${t.title || 'BATALHA DE TORNEIO'}</span>
                        <span style="color:var(--text-dim);font-size:0.75rem;margin-left:0.6rem;">[ Desafio ${this.currentTournamentActIdx + 1}/${challengesList.length || 1} ]</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:1.2rem;">
                        <div id="tournament-timer-display" style="font-family:var(--font-code);font-size:1.1rem;font-weight:bold;color:var(--cyan);background:var(--bg-deep);padding:0.3rem 0.8rem;border:1px solid var(--border-bright);border-radius:3px;">
                            ⏱ --:--
                        </div>
                        <span class="panel-badge" style="background:rgba(239, 68, 68, 0.15);color:#f87171;border:1px solid #ef4444;font-size:0.75rem;">EM BATALHA</span>
                    </div>
                </div>

                <!-- TOURNAMENT MAIN SPLIT -->
                <div style="display:grid;grid-template-columns:minmax(280px, 1fr) minmax(380px, 1.4fr) minmax(220px, 0.8fr);gap:1rem;flex:1;min-height:550px;">
                    <!-- COL 1: PROBLEMA & DICAS -->
                    <div style="background:var(--bg-panel);border:1px solid var(--border-dim);padding:1.2rem;border-radius:4px;display:flex;flex-direction:column;overflow-y:auto;">
                        <h3 style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.9rem;margin-bottom:0.6rem;">${curChallenge.title}</h3>
                        <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;margin-bottom:1rem;">
                            ${curChallenge.description || 'Implemente a solução solicitada e valide no terminal.'}
                        </div>
                        ${curChallenge.hints && curChallenge.hints.length > 0 ? `
                            <div style="margin-top:auto;border-top:1px solid var(--border-ghost);padding-top:0.8rem;">
                                <div style="font-size:0.72rem;color:var(--text-dim);font-family:var(--font-display);margin-bottom:0.3rem;">DICA DO GM:</div>
                                <div style="font-size:0.78rem;color:var(--cyan);font-style:italic;">${curChallenge.hints[0].text || curChallenge.hints[0]}</div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- COL 2: IDE CODE EDITOR & TERMINAL -->
                    <div style="background:var(--bg-deep);border:1px solid var(--border-dim);border-radius:4px;display:flex;flex-direction:column;overflow:hidden;">
                        <!-- Editor Header -->
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.8rem;background:var(--bg-panel);border-bottom:1px solid var(--border-ghost);">
                            <span style="font-family:var(--font-code);font-size:0.75rem;color:var(--text-dim);">main.c</span>
                            <div style="display:flex;gap:0.5rem;">
                                <button class="glow-button" style="padding:0.3rem 0.8rem;font-size:0.68rem;" onclick="app.resetTournamentCode()">⟳ Reset</button>
                                <button class="glow-button primary" style="padding:0.3rem 1rem;font-size:0.68rem;" onclick="app.runTournamentCode()">▶ Executar</button>
                                <button class="glow-button primary pulse-action" style="padding:0.3rem 1.2rem;font-size:0.68rem;background:rgba(74, 222, 128, 0.15);border-color:#4ade80;color:#4ade80;" onclick="app.submitTournamentChallenge()">✓ Submeter</button>
                            </div>
                        </div>

                        <!-- Textarea & Line numbers with Syntax Highlighting -->
                        <div class="editor-wrapper" style="flex:1;min-height:260px;position:relative;background:#05050d;">
                            <div id="tournament-line-numbers" class="line-numbers" style="padding:0.8rem 0.5rem;font-size:0.88rem;">1</div>
                            <div class="editor-code-container" style="position:relative;flex:1;height:100%;">
                                <pre class="editor-highlight" id="tournament-editor-highlight" aria-hidden="true"><code></code></pre>
                                <textarea id="tournament-code-editor" class="code-editor" spellcheck="false">${curChallenge.starterCode}</textarea>
                            </div>
                        </div>

                        <!-- Mini Terminal Output -->
                        <div style="height:160px;background:#020205;border-top:1px solid var(--border-dim);display:flex;flex-direction:column;">
                            <div style="padding:0.3rem 0.8rem;font-size:0.65rem;color:var(--text-dim);font-family:var(--font-display);background:rgba(255,255,255,0.02);border-bottom:1px solid var(--border-ghost);">
                                ▸ TERMINAL DE EXECUÇÃO
                            </div>
                            <div id="tournament-terminal-output" style="flex:1;padding:0.6rem 0.8rem;font-family:var(--font-code);font-size:0.8rem;color:var(--text-secondary);overflow-y:auto;white-space:pre-wrap;">
[ SISTEMA ] Arena pronta. Digite seu código em C e clique em Executar ou Submeter.
                            </div>
                        </div>
                    </div>

                    <!-- COL 3: LEADERBOARD AO VIVO -->
                    <div style="background:var(--bg-panel);border:1px solid var(--border-dim);padding:1rem;border-radius:4px;display:flex;flex-direction:column;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.8rem;">
                            <h4 style="font-family:var(--font-display);color:var(--gold);font-size:0.78rem;letter-spacing:0.1em;">PLACAR AO VIVO</h4>
                            <span style="font-size:0.65rem;color:var(--cyan);font-family:var(--font-code);">● TEMPO REAL</span>
                        </div>
                        <div id="tournament-live-leaderboard" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:0.5rem;position:relative;">
                            ${(() => {
                                const prevRanks = this._prevTournamentRanks || {};
                                const currentRanks = {};
                                participants.forEach((p, i) => {
                                    currentRanks[p.uid] = i + 1;
                                });
                                
                                const html = participants.map((p, i) => {
                                    const rank = i + 1;
                                    const prevRank = prevRanks[p.uid];
                                    const isMe = p.uid === authManager.currentUser?.uid;
                                    const overtaked = prevRank !== undefined && rank < prevRank;
                                    const dropped = prevRank !== undefined && rank > prevRank;
                                    const overtakeBadge = overtaked ? `<span class="rank-overtake-badge" style="color:var(--green);font-size:0.68rem;margin-left:0.3rem;animation:pulseGlow 1s infinite;">▲ +${prevRank - rank}</span>` : (dropped ? `<span style="color:var(--red);font-size:0.68rem;margin-left:0.3rem;">▼</span>` : '');
                                    
                                    return '<div class="leaderboard-item-row ' + (overtaked ? 'row-overtake-anim' : '') + '" style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.7rem;background:' + (isMe ? 'rgba(139, 92, 246, 0.18)' : 'var(--bg-deep)') + ';border:1px solid ' + (overtaked ? 'var(--green)' : (isMe ? 'var(--purple-bright)' : 'var(--border-ghost)')) + ';border-radius:3px;font-size:0.75rem;transition:all 0.4s ease;box-shadow:' + (overtaked ? '0 0 15px rgba(74, 222, 128, 0.4)' : 'none') + ';">'
                                        + '<div style="display:flex;align-items:center;gap:0.3rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'
                                        + '<span style="font-weight:700;color:' + (rank === 1 ? 'var(--gold)' : (rank === 2 ? '#C0C0C0' : (rank === 3 ? '#CD7F32' : 'var(--text-dim)'))) + ';">' + rank + '°</span> '
                                        + '<span style="font-weight:600;color:' + (isMe ? 'var(--purple-bright)' : 'var(--text-primary)') + ';">' + (p.name || 'Jogador') + '</span>'
                                        + overtakeBadge
                                        + '</div>'
                                        + '<span style="font-family:var(--font-code);color:var(--gold);font-weight:bold;">' + (p.score || 0) + ' pts</span>'
                                        + '</div>';
                                }).join('');

                                // Save current ranks for next update
                                this._prevTournamentRanks = currentRanks;
                                return html;
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Update editor with Universal Code Editor (Syntax Highlighting & Tab Key)
        var editor = document.getElementById('tournament-code-editor');
        if (editor) {
            this.ui.attachCodeEditor(editor, 'tournament-line-numbers', 'tournament-editor-highlight');
        }

        // Inicia o Countdown Dinâmico
        this.startTournamentCountdown(t);
    }

    startTournamentCountdown(t) {
        var timerEl = document.getElementById('tournament-timer-display');
        if (!timerEl) return;

        var startedAtSec = t.startedAt ? (t.startedAt.seconds || Math.floor(Date.now() / 1000)) : Math.floor(Date.now() / 1000);
        var durationSec = (t.timeLimit || 15) * 60;
        var endAtSec = startedAtSec + durationSec;

        var updateTimer = () => {
            var nowSec = Math.floor(Date.now() / 1000);
            var remainSec = Math.max(0, endAtSec - nowSec);
            var m = Math.floor(remainSec / 60);
            var s = remainSec % 60;
            var timeStr = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
            
            var el = document.getElementById('tournament-timer-display');
            if (el) {
                el.textContent = '⏱ ' + timeStr;
                if (remainSec <= 60) {
                    el.style.color = '#ef4444';
                    el.style.borderColor = '#ef4444';
                }
            }

            if (remainSec <= 0) {
                if (this.tournamentTimerInterval) {
                    clearInterval(this.tournamentTimerInterval);
                    this.tournamentTimerInterval = null;
                }
                this.ui.showToast('Tempo de torneio encerrado!', 'info');
                this.ui.showTournamentEndResultModal(t);
            }
        };

        updateTimer();
        this.tournamentTimerInterval = setInterval(updateTimer, 1000);
    }

    runTournamentCode() {
        var editor = document.getElementById('tournament-code-editor');
        var term = document.getElementById('tournament-terminal-output');
        if (!editor || !term) return;

        var code = editor.value;
        term.innerHTML = '<span style="color:var(--cyan)">[ EXECUTANDO CÓDIGO... ]</span>\n';

        try {
            var interp = new CInterpreter();
            var res = interp.execute(code);
            if (res.output) {
                term.textContent = res.output;
            } else if (res.errors && res.errors.length > 0) {
                term.innerHTML = '<span style="color:#f87171;">[ ERRO NA COMPILAÇÃO/EXECUÇÃO ]\n' + res.errors.join('\n') + '</span>';
            } else {
                term.textContent = '[ CÓDIGO EXECUTADO COM SUCESSO (SEM SAÍDA) ]';
            }
        } catch (e) {
            term.innerHTML = '<span style="color:#f87171;">[ ERRO ] ' + e.message + '</span>';
        }
    }

    resetTournamentCode() {
        var t = this.currentTournamentData;
        if (!t || !t.challenges) return;
        var editor = document.getElementById('tournament-code-editor');
        if (!editor) return;
        
        var challengesList = [];
        t.challenges.forEach(function(chGroup) {
            if (chGroup.activities) {
                chGroup.activities.forEach(function(act) { challengesList.push(act); });
            }
        });
        var cur = challengesList[this.currentTournamentActIdx || 0];
        if (cur) {
            editor.value = cur.starterCode || '';
            this.ui.updateLineNumbers(editor, 'tournament-line-numbers');
            this.ui.showToast('Código restaurado.', 'info');
        }
    }

    async submitTournamentChallenge() {
        var t = this.currentTournamentData;
        if (!t) return;
        var editor = document.getElementById('tournament-code-editor');
        var term = document.getElementById('tournament-terminal-output');
        if (!editor) return;

        var code = editor.value;
        term.innerHTML = '<span style="color:var(--gold)">[ VALIDANDO SUBMISSÃO... ]</span>\n';

        var interp = new CInterpreter();
        var res = interp.execute(code);

        if (!res.success && res.errors && res.errors.length > 0) {
            term.innerHTML = '<span style="color:#f87171;">[ FALHA NA VALIDAÇÃO ]\nO código possui erros e não executou com sucesso:\n' + res.errors.join('\n') + '</span>';
            this.ui.showToast('O código possui erros!', 'error');
            return;
        }

        try {
            await tournamentManager.submitScore(t.id, this.currentTournamentActIdx || 0, code, true, 3000);
            this.ui.showToast('Desafio submetido com sucesso! +Pontos adicionados.', 'success');
            term.innerHTML = '<span style="color:#4ade80;">[ SUCESSO ] Código validado e pontuação computada!</span>\n' + (res.output || '');

            // Avança para o próximo desafio se houver
            var challengesList = [];
            if (t.challenges && t.challenges.length > 0) {
                t.challenges.forEach(function(chGroup) {
                    if (chGroup.activities) {
                        chGroup.activities.forEach(function(act) { challengesList.push(act); });
                    }
                });
            }

            this.currentTournamentActIdx = (this.currentTournamentActIdx || 0) + 1;
            
            if (this.currentTournamentActIdx >= challengesList.length && challengesList.length > 0) {
                this.ui.showToast('🏆 Parabéns! Você concluiu todos os desafios do torneio!', 'success');
                if (window.soundFX) window.soundFX.playFanfare();
                setTimeout(() => {
                    this.ui.showTournamentEndResultModal(this.currentTournamentData);
                }, 1000);
            } else {
                setTimeout(() => {
                    this.renderTournamentLobby(this.currentTournamentData);
                }, 1200);
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao enviar pontuação.', 'error');
        }
    }

    async startTournament() {
        var t = this.currentTournamentData;
        if (!t) return;
        try {
            await tournamentManager.start(t.id);
            this.ui.showToast('Torneio iniciado!', 'success');
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao iniciar torneio', 'error');
        }
    }

    async joinTournament(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        this.openTournamentLobby(tournamentId);
        try {
            var result = await tournamentManager.join(tournamentId);
            if (result) {
                this.ui.showToast('Inscrição confirmada!', 'success');
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao entrar no torneio', 'error');
        }
    }

    // ─── PROFILE NICKNAME EDIT ───
    async saveProfileNickname() {
        const input = document.getElementById('profile-edit-name-input');
        if (!input) return;
        const newName = input.value.trim();
        if (!newName) {
            this.ui.showToast('O nickname não pode estar vazio.', 'error');
            return;
        }
        try {
            this.engine.setPlayerName(newName);
            if (typeof authManager !== 'undefined') {
                await authManager.updateDisplayName(newName);
            }
            if (window.soundFX) window.soundFX.playCheckCodeSuccess();
            this.ui.showToast('Nickname atualizado com sucesso!', 'success');
            
            // Sync UI everywhere
            this.ui.renderDashboard();
            this.openMyProfile();
        } catch (e) {
            console.error('Error updating nickname:', e);
            this.ui.showToast('Erro ao atualizar nickname: ' + e.message, 'error');
        }
    }

    // ─── AVATAR SELECTION ───
    async selectAvatar(avatarPath) {
        if (!avatarPath) return;
        try {
            if (typeof authManager !== 'undefined') {
                await authManager.updateProfilePhoto(avatarPath);
            }
            if (window.soundFX) window.soundFX.playMagic();
            this.ui.showToast('Retrato de avatar atualizado!', 'success');
            
            // Re-render header & profile modal
            this.ui.renderDashboard();
            this.openMyProfile();
        } catch (e) {
            console.error('Error selecting avatar:', e);
            this.ui.showToast('Erro ao atualizar avatar', 'error');
        }
    }

    // ═══ SETTINGS PANEL ═══
    openSettings() {
        const backdrop = document.getElementById('settings-backdrop');
        const input = document.getElementById('settings-nickname');
        const themeBtns = document.querySelectorAll('.theme-option');
        
        // Set current values
        if (input) input.value = (typeof authManager !== 'undefined' && authManager.getDisplayName()) || this.engine.getPlayerName();
        const currentTheme = this.engine.state.theme || 'sololeveling';
        themeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === currentTheme);
        });
        
        if (backdrop) {
            backdrop.classList.remove('hidden');
            backdrop.classList.add('active');
        }
    }
    
    closeSettings() {
        const backdrop = document.getElementById('settings-backdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
            backdrop.classList.add('hidden');
        }
    }

    saveSettings() {
        const input = document.getElementById('settings-nickname');
        if (input) {
            const newName = input.value.trim();
            if (newName) {
                this.engine.setPlayerName(newName);
                const nameDisplay = document.getElementById('player-name-display');
                if (nameDisplay) nameDisplay.textContent = newName;
                if (typeof authManager !== 'undefined' && authManager.currentUser) {
                    authManager.currentUser.updateProfile({ displayName: newName }).catch(() => {});
                    if (authManager.userData) authManager.userData.displayName = newName;
                    if (typeof fbDB !== 'undefined') {
                        fbDB.collection('users').doc(authManager.currentUser.uid).update({ displayName: newName }).catch(() => {});
                    }
                }
            }
        }
        this.closeSettings();
        this.ui.showToast('Configurações salvas', 'success');
    }

    setTheme(themeName) {
        this.engine.setTheme(themeName);
        this.loadTheme();
        
        // Update active state in settings
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeName);
        });
    }

    showDeleteAccountModal() {
        const modal = document.getElementById('modal-delete-account');
        const input = document.getElementById('input-confirm-delete-account');
        const err = document.getElementById('delete-account-error');
        if (input) input.value = '';
        if (err) err.textContent = '';
        if (modal) modal.classList.remove('hidden');
    }

    hideDeleteAccountModal() {
        const modal = document.getElementById('modal-delete-account');
        if (modal) modal.classList.add('hidden');
    }

    async confirmDeleteAccount() {
        const input = document.getElementById('input-confirm-delete-account');
        const err = document.getElementById('delete-account-error');
        if (!input) return;
        const typed = input.value.trim();
        if (typed !== 'DELETAR MINHA CONTA') {
            if (err) err.textContent = 'Digite exatamente: DELETAR MINHA CONTA';
            return;
        }

        if (err) err.textContent = '';
        this.ui.showToast('Excluindo conta...', 'info');

        try {
            if (typeof authManager !== 'undefined') {
                await authManager.deleteAccount();
                this.hideDeleteAccountModal();
                this.closeSettings();
                this.ui.showToast('Conta excluída com sucesso.', 'info');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (e) {
            if (e.code === 'auth/requires-recent-login') {
                if (err) err.textContent = 'Por segurança, faça login novamente antes de deletar sua conta.';
            } else {
                console.error('Delete account failed:', e);
                this.ui.showToast('Erro ao deletar conta: ' + e.message, 'error');
            }
        };
    }
    
    // ═══ THEME LOADING ═══
    loadTheme() {
        const theme = this.engine.state.theme || 'sololeveling';
        document.body.className = theme === 'sololeveling' ? '' : 'theme-' + theme;
    }
    
    // ═══ ADMIN DASHBOARD (MULTI-GUILD) ═══
    async openAdminDashboard() {
        if (typeof authManager === 'undefined' || !authManager.isTeacher()) {
            this.ui.showToast('Acesso restrito a Mestres', 'error');
            return;
        }
        this.ui.showScreen('admin');

        // 1. Instant cache render (0ms response)
        if (this._cachedAdminData) {
            this.ui.renderAdminDashboard(
                this._cachedAdminData.guilds,
                this._cachedAdminData.currentGuild,
                this._cachedAdminData.students
            );
        } else {
            const container = document.getElementById('admin-content');
            if (container) {
                container.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO PAINEL DO MESTRE...</div></div>';
            }
        }

        // 2. Background sync
        try {
            const guilds = await authManager.getTeacherGuilds();
            let currentGuild = null;
            const currentCode = authManager.getClassCode();
            if (currentCode) {
                currentGuild = guilds.find(g => (g.classCode || g.guildCode || g.id) === currentCode) || null;
            }
            if (!currentGuild && guilds.length > 0) {
                currentGuild = guilds[0];
            }
            let students = [];
            if (currentGuild) {
                const code = currentGuild.classCode || currentGuild.guildCode || currentGuild.id;
                students = await authManager.getGuildStudents(code);
            }
            this._cachedAdminData = { guilds, currentGuild, students };
            this.ui.renderAdminDashboard(guilds, currentGuild, students);
        } catch (e) {
            console.warn('Could not load guild data for admin:', e);
            this.ui.showToast('Erro ao carregar dados do Painel', 'error');
        }
    }

    async switchAdminGuild(guildCode) {
        if (!guildCode) return;
        try {
            const guilds = await authManager.getTeacherGuilds();
            const currentGuild = guilds.find(g => (g.classCode || g.guildCode || g.id) === guildCode) || null;
            let students = [];
            if (currentGuild) {
                students = await authManager.getGuildStudents(guildCode);
            }
            this._cachedAdminData = { guilds, currentGuild, students };
            this.ui.renderAdminDashboard(guilds, currentGuild, students);
        } catch (e) {
            console.warn('Switch admin guild error:', e);
        }
    }

    async confirmKickStudent(studentUid, studentName, guildCode) {
        if (!confirm(`Deseja realmente expulsar o aluno "${studentName}" desta guilda?`)) {
            return;
        }
        try {
            await authManager.kickStudent(studentUid, guildCode);
            this.ui.showToast(`Aluno "${studentName}" removido da guilda.`, 'success');
            await this.switchAdminGuild(guildCode);
        } catch (e) {
            console.error('Kick student error:', e);
            this.ui.showToast('Erro ao expulsar aluno da guilda.', 'error');
        }
    }

    async createNewTeacherGuild() {
        const name = prompt('Digite o nome da nova Guilda (Turma):');
        if (!name || !name.trim()) return;
        try {
            const newCode = await authManager.createTeacherGuild(name.trim());
            this.ui.showToast(`Guilda "${name.trim()}" forjada com sucesso! Código: ${newCode}`, 'success');
            await this.openAdminDashboard();
        } catch (e) {
            console.error('Create teacher guild error:', e);
            this.ui.showToast('Erro ao forjar nova guilda: ' + e.message, 'error');
        }
    }

    async editGuildName(guildCode, currentName) {
        if (!guildCode) return;
        this.ui.showEditGuildModal(guildCode, currentName);
    }

    async submitEditGuildName() {
        const input = document.getElementById('input-edit-guild-name');
        const errEl = document.getElementById('edit-guild-error');
        if (!input) return;
        const guildCode = input.dataset.guildCode;
        const newName = input.value.trim();
        if (!newName) {
            if (errEl) errEl.textContent = 'Informe um nome válido para a guilda.';
            return;
        }
        try {
            await authManager.updateGuildName(guildCode, newName);
            this.ui.hideEditGuildModal();
            this.ui.showToast('Nome da guilda atualizado com sucesso!', 'success');
            await this.openAdminDashboard();
        } catch (e) {
            console.error('Edit guild name error:', e);
            if (errEl) errEl.textContent = 'Erro ao atualizar nome: ' + e.message;
        }
    }

    async confirmDeleteGuild(guildCode, guildName) {
        if (!guildCode) return;
        const ok = confirm(`ATENÇÃO: Deseja realmente excluir a guilda "${guildName || guildCode}"?\n\nTodos os vínculos desta guilda serão removidos permanentemente.`);
        if (!ok) return;
        try {
            await authManager.deleteGuild(guildCode);
            this.ui.showToast(`Guilda "${guildName || guildCode}" excluída.`, 'info');
            await this.openAdminDashboard();
        } catch (e) {
            console.error('Delete guild error:', e);
            this.ui.showToast('Erro ao excluir guilda: ' + e.message, 'error');
        }
    }

    // ─── GUILD SCREEN ───
    async openGuildScreen() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) {
            this.ui.showToast('Faça login para acessar a guilda.', 'info');
            return;
        }
        if (!authManager.hasGuild() && !authManager.isTeacher()) {
            this.ui.showJoinGuildModal('Vincule-se a uma guilda para visualizar seus membros.');
            return;
        }
        this.ui.showScreen('guild');
        await this.ui.renderGuildScreen();
    }

    // ─── PLAYER PROFILE (RN-15) ───
    openMyProfile() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) return;
        this.ui.showPlayerProfileModal(authManager.currentUser?.uid);
    }

    openPlayerProfile(uid) {
        if (typeof authManager === 'undefined') return;
        this.ui.showPlayerProfileModal(uid);
    }
    
    // ═══ RANKED / CHALLENGES ═══
    async openRanked() {
        this.ui.showScreen('ranked');
        
        // 1. Instant 0ms render if cached
        if (this._cachedRankedData) {
            this.ui.renderRankedScreen(this._cachedRankedData.challenges, this._cachedRankedData.leaderboard);
        } else {
            const container = document.getElementById('ranked-content');
            if (container) {
                container.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO ARENA PVP & RANKING...</div></div>';
            }
        }

        // 2. Parallel fetch in background
        try {
            if (typeof rankedManager !== 'undefined') {
                const [challenges, leaderboard] = await Promise.all([
                    rankedManager.getPendingChallenges(),
                    rankedManager.getGuildLeaderboard()
                ]);
                this._cachedRankedData = { challenges, leaderboard };
                this.ui.renderRankedScreen(challenges, leaderboard);
            }
        } catch (e) {
            console.warn('Could not load ranked data:', e.message);
        }
    }
    
    // ═══ TOURNAMENTS ═══
    async openTournaments() {
        this.ui.showScreen('tournament');
        
        // Stop any active lobby listeners
        if (typeof tournamentManager !== 'undefined') {
            tournamentManager.stopListening();
        }

        // 1. Instant cache render (0ms response)
        if (this._cachedTournaments && this._cachedTournaments.length > 0) {
            this.ui.renderTournamentsScreen(this._cachedTournaments);
        } else {
            const container = document.getElementById('tournament-content');
            if (container) {
                container.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--gold);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO TORNEIOS DA GUILDA...</div></div>';
            }
        }

        // 2. Fetch fresh tournaments and update UI seamlessly
        try {
            if (typeof tournamentManager !== 'undefined') {
                const tournaments = await tournamentManager.getActive();
                this._cachedTournaments = tournaments;
                this.ui.renderTournamentsScreen(tournaments);
            }
        } catch (e) {
            console.warn('Could not load tournaments:', e.message);
        }
    }
    
    // ═══ CHAPTER COMPLETION DIALOGUE ═══
    showCompletionDialogue(chapterId) {
        const ch = CHAPTERS.find(c => c.id === chapterId);
        if (!ch) return;
        
        const narrative = document.getElementById('narrative-section');
        if (!narrative) return;
        
        // Check if completion dialogue already shown
        if (document.querySelector('.completion-dialogue')) return;
        
        const completionDiv = document.createElement('div');
        completionDiv.className = 'completion-dialogue';
        
        // Get completion story from chapter or generate one
        const completionStory = ch.completionStory || this.getDefaultCompletionStory(ch);
        
        completionDiv.innerHTML = '<div class="dialogue-header">MISSAO COMPLETA</div>';
        
        const storyDiv = document.createElement('div');
        storyDiv.id = 'completion-dialogue';
        storyDiv.className = 'dialogue-container';
        completionDiv.appendChild(storyDiv);
        
        narrative.appendChild(completionDiv);
        
        // Use dialogue engine for completion
        const dialogue = new DialogueEngine('completion-dialogue', { autoPlayDelay: 2500 });
        dialogue.start(completionStory, () => {
            // After completion dialogue, scroll to show it
            completionDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
        
        // Scroll to the completion dialogue
        setTimeout(() => completionDiv.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
    
    getDefaultCompletionStory(ch) {
        const playerName = this.engine.getPlayerName();
        return [
            { type: 'gm', name: 'GM', role: 'Guia do Sistema', cssClass: 'gm', text: 'Parabens, ' + playerName + '! Voce completou as missões deste capitulo.' },
            { type: 'narrative', text: 'O modulo ' + ch.unlock + ' comeca a brilhar intensamente. Pecas de codigo se reconstituem no ar.' },
            { type: 'character', name: 'ARKAN', role: 'MESTRE DA GUILDA', cssClass: 'arkan', text: 'Incrivel. Mais um sistema restaurado. A Guilda esta mais forte por sua causa.' },
            { type: 'narrative', text: ch.unlock + ' foi restaurado com sucesso. Novos caminhos se abrem diante de voce.' },
            { type: 'gm', name: 'GM', role: 'Guia do Sistema', cssClass: 'gm', text: 'Continue explorando os proximos capitulos para restaurar o restante dos sistemas da Guilda.' }
        ];
    }
    
    // ═══ APPLY COMPLETION ON ACTIVITY SUBMIT ═══
    onChapterAllActivitiesComplete(chapterId) {
        this.completeChapterReward(chapterId);
        // Show completion dialogue after reward screen
        setTimeout(() => {
            this.showCompletionDialogue(chapterId);
        }, 500);
    }

}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GuildCodeApp();
    window.app = app;
    app.init();
});
