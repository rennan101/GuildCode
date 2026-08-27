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
        const updateLoadingText = (text) => {
            const sub = document.querySelector('.loading-subtitle');
            if (sub) sub.textContent = text;
        };

        if (user) {
            updateLoadingText('Sincronizando dados com o servidor...');
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
            if (loaded && this.engine.state.initialized && this.engine.getPlayerName()) {
                this.ui.showScreen('dashboard');
                this.ui.renderDashboard();
                this.ui.showToast('Bem-vindo de volta, ' + this.engine.getPlayerName() + '!', 'info');
            } else {
                if (this.engine.state.initialized && this.engine.getPlayerName()) {
                    this.ui.showScreen('dashboard');
                    this.ui.renderDashboard();
                } else if (!this.engine.isIntroCompleted()) {
                    this.startIntro();
                } else {
                    this.ui.showScreen('name');
                    this.ui.setupNameEntry((name) => this.onNameConfirmed(name));
                }
            }
        } else {
            updateLoadingText('Aguardando autenticação...');
            this.ui.showScreen('login');
        }
    }

    bindLoginEvents() {
        const btnGoogle = document.getElementById('btn-login-google');
        if (btnGoogle) {
            btnGoogle.onclick = async () => {
                this.setLoginLoading(true);
                try { await authManager.loginWithGoogle(); } catch (e) {
                    this.showLoginError(e.message); this.setLoginLoading(false);
                }
            };
        }
        const btnEmailLogin = document.getElementById('btn-login-email');
        if (btnEmailLogin) {
            btnEmailLogin.onclick = async () => {
                const email = document.getElementById('login-email').value.trim();
                const pass = document.getElementById('login-password').value;
                if (!email || !pass) { this.showLoginError('Preencha email e senha.'); return; }
                this.setLoginLoading(true);
                try { await authManager.loginWithEmail(email, pass); } catch (e) {
                    this.showLoginError(this.translateAuthError(e.code)); this.setLoginLoading(false);
                }
            };
        }
        const btnShowRegister = document.getElementById('btn-show-register');
        if (btnShowRegister) {
            btnShowRegister.onclick = () => {
                document.getElementById('login-form-area').style.display = 'none';
                document.getElementById('register-form-area').style.display = 'block';
                document.getElementById('login-error').textContent = '';
            };
        }
        const btnShowLogin = document.getElementById('btn-show-login');
        if (btnShowLogin) {
            btnShowLogin.onclick = () => {
                document.getElementById('register-form-area').style.display = 'none';
                document.getElementById('login-form-area').style.display = 'block';
                document.getElementById('login-error').textContent = '';
            };
        }
        const btnRegister = document.getElementById('btn-register');
        if (btnRegister) {
            btnRegister.onclick = async () => {
                const name = document.getElementById('reg-name').value.trim();
                const email = document.getElementById('reg-email').value.trim();
                const pass = document.getElementById('reg-password').value;
                const pass2 = document.getElementById('reg-password2').value;
                const classCode = (document.getElementById('reg-classcode')?.value || '').trim();
                if (!name || !email || !pass) { this.showLoginError('Preencha todos os campos.'); return; }
                if (pass !== pass2) { this.showLoginError('As senhas nao coincidem.'); return; }
                if (pass.length < 6) { this.showLoginError('Minimo 6 caracteres.'); return; }
                this.setLoginLoading(true);
                try { await authManager.registerWithEmail(email, pass, name, classCode); } catch (e) {
                    this.showLoginError(this.translateAuthError(e.code)); this.setLoginLoading(false);
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
        this.closeSettings();
        const delBackdrop = document.getElementById("delete-confirm-backdrop");
        if (delBackdrop) delBackdrop.classList.remove("active");
        try {
            await this.engine.saveToCloud();
        } catch (e) {}
        this.engine.resetGame();
        await authManager.logout();
    }

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
                this.engine.completeChapterStep(ch.id, 'act' + (actIdx + 1));
                const xpGain = ch.activities[actIdx].difficulty === 'easy' ? 30 : 50;
                this.engine.addXP(xpGain);
                this.ui.showToast('+' + xpGain + ' XP', 'xp');
                this.engine.incrementStat('activitiesCompleted');
                this.engine.saveToCloud();
                const allDone = ch.activities.every((_, idx) =>
                    this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id]['act' + (idx + 1)]
                );
                if (allDone) {
                    setTimeout(() => this.completeChapterReward(ch.id), 1000);
                } else {
                    setTimeout(() => {
                        this.ui.showToast('Atividade completada!', 'success');
                        setTimeout(() => { this.ui.openChapter(ch.id); }, 1500);
                    }, 500);
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
        document.getElementById('btn-modal-close').onclick = () => { this.ui.hideModal(); };
        document.querySelector('.modal-backdrop').onclick = () => { this.ui.hideModal(); };
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

    startIntro() {
        const intro = new IntroSequence((nick) => {
            this.engine.setPlayerName(nick);
            this.engine.completeIntro();
            this.engine.saveToCloud();
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
            this.ui.showToast('Bem-vindo, ' + nick + '!', 'info');
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
        if (chapterId === 1) return;
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
            this.ui.showToast('Sistema de desafios nao disponivel', 'error');
            return;
        }
        var content = document.getElementById('ranked-content');
        if (!content) return;
        var chapterList = CHAPTERS.map(function(ch) { 
            return '<div class="chapter-item" style="cursor:pointer;margin-bottom:0.3rem;padding:0.5rem;border:1px solid var(--border-ghost);background:var(--bg-panel)" onclick="app.selectChallengeChapter(' + ch.id + ')">' +
            '<div class="chapter-number">CAP ' + String(ch.id).padStart(2, '0') + '</div>' +
            '<div class="chapter-info"><div class="chapter-item-title">' + ch.title + '</div>' +
            '<div class="chapter-item-theme">' + ch.theme + '</div></div></div>';
        }).join('');
        content.innerHTML = '<div style="margin-bottom:1rem"><button class="glow-button" onclick="app.openRanked()" style="font-size:0.7rem;padding:0.3rem 0.8rem">VOLTAR</button></div>' +
            '<div style="font-family:var(--font-display);font-size:0.55rem;letter-spacing:0.12em;color:var(--purple-bright);margin-bottom:0.5rem">SELECIONAR CAPITULO PARA DESAFIO</div>' +
            '<p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:1rem">Escolha o capitulo do desafio.</p>' + chapterList;
    }
    async selectChallengeChapter(chapterId) {
        try {
            var players = await rankedManager.searchPlayers('');
            if (players.length === 0) { this.ui.showToast('Nenhum colega na sua turma', 'info'); return; }
            var content = document.getElementById('ranked-content');
            var chapter = CHAPTERS.find(function(c) { return c.id === chapterId; });
            var playerList = players.map(function(p) {
                return '<div style="padding:0.5rem;margin-bottom:0.3rem;border:1px solid var(--border-ghost);background:var(--bg-panel);display:flex;justify-content:space-between;align-items:center">' +
                '<span style="color:var(--text-primary)">' + (p.displayName || 'Jogador') + '</span>' +
                '<button class="glow-button primary" style="font-size:0.65rem;padding:0.2rem 0.6rem" onclick="app.sendChallenge(\'' + p.uid + '\', \'' + (p.displayName||'Jogador') + '\', ' + chapterId + ')">DESAFIAR</button></div>';
            }).join('');
            content.innerHTML = '<div style="margin-bottom:1rem"><button class="glow-button" onclick="app.showChallengeSelector()" style="font-size:0.7rem;padding:0.3rem 0.8rem">VOLTAR</button></div>' +
                '<div style="font-family:var(--font-display);font-size:0.55rem;letter-spacing:0.12em;color:var(--purple-bright);margin-bottom:0.5rem">DESAFIAR EM: ' + chapter.title.toUpperCase() + '</div>' +
                '<p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:1rem">Selecione o adversario:</p>' +
                (playerList || '<p style="color:var(--text-dim)">Nenhum colega encontrado.</p>');
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
            if (!challenge) { this.ui.showToast('Desafio nao encontrado', 'error'); return; }
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
            return '<label class="tournament-check-label">'
            + '<input type="checkbox" value="' + ch.id + '" class="tournament-chapter-check">'
            + '<span>CAP ' + String(ch.id).padStart(2, '0') + ' — ' + ch.title + '</span>'
            + '</label>';
        }).join('');
        content.innerHTML = '<div class="tournament-screen">'
            + '<div class="tournament-header">'
            + '<button class="glow-button tournament-back-btn" onclick="app.openTournaments()">VOLTAR</button>'
            + '<h2 class="tournament-title">CRIAR TORNEIO</h2>'
            + '</div>'
            + '<div class="tournament-form">'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">NOME DO TORNEIO</label>'
            + '<input type="text" id="tournament-name" class="settings-input" placeholder="Ex: Torneio Semana 1" maxlength="40">'
            + '</div>'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">SELECIONAR ASSUNTOS</label>'
            + '<div class="tournament-checks">' + chapterChecks + '</div>'
            + '</div>'
            + '<div class="tournament-form-group">'
            + '<label class="settings-label">TEMPO LIMITE (MINUTOS)</label>'
            + '<input type="number" id="tournament-time" class="settings-input" value="15" min="5" max="120">'
            + '</div>'
            + '<button class="glow-button primary pulse-action" onclick="app.submitCreateTournament()">CRIAR SALA</button>'
            + '</div>'
            + '</div>';
    }

    async submitCreateTournament() {
        var name = document.getElementById('tournament-name').value.trim();
        var timeLimit = parseInt(document.getElementById('tournament-time').value) || 15;
        var checks = document.querySelectorAll('.tournament-chapter-check:checked');
        var chapterIds = Array.from(checks).map(function(c) { return parseInt(c.value); });
        if (!name) { this.ui.showToast('Digite um nome para o torneio', 'error'); return; }
        if (chapterIds.length === 0) { this.ui.showToast('Selecione pelo menos um capitulo', 'error'); return; }
        try {
            var id = await tournamentManager.create(name, chapterIds, timeLimit);
            this.ui.showToast('Sala criada!', 'success');
            this.openTournamentLobby(id);
        } catch (e) { console.error(e); this.ui.showToast('Erro ao criar torneio', 'error'); }
    }

    // == TOURNAMENT LOBBY ==
    async openTournamentLobby(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        var content = document.getElementById('tournament-content');
        if (!content) return;
        this.showScreen('tournament');

        // Render lobby UI immediately
        var t = tournamentManager.currentTournament || { title: 'Torneio', participants: [], status: 'waiting', timeLimit: 15 };
        this.renderTournamentLobby(t);

        // Listen for real-time updates
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
        var statusLabel = t.status === 'waiting' ? 'AGUARDANDO PARTICIPANTES' : t.status === 'active' ? 'EM ANDAMENTO' : 'ENCERRADO';
        var statusClass = t.status === 'waiting' ? 'waiting' : 'active';

        var participantsHtml = participants.map(function(p) {
            return '<div class="tournament-participant-card">'
                + '<span class="tournament-participant-name">' + (p.name || 'Jogador') + '</span>'
                + '<span class="tournament-participant-score">' + (p.score || 0) + ' pts</span>'
                + '</div>';
        }).join('');

        content.innerHTML = '<div class="tournament-lobby">'
            + '<div class="tournament-header">'
            + '<h2 class="tournament-lobby-title">' + (t.title || 'TORNEIO') + '</h2>'
            + '<span class="tournament-lobby-status ' + statusClass + '">' + statusLabel + '</span>'
            + '</div>'
            + '<div class="tournament-meta">'
            + '<span class="tournament-meta-item">Tempo: ' + (t.timeLimit || 15) + ' min</span>'
            + '<span class="tournament-meta-item">Participantes: ' + participants.length + '</span>'
            + '</div>'
            + '<div class="tournament-participants-grid">'
            + (participants.length === 0 ? '<p class="tournament-empty">Aguardando jogadores entrarem...</p>' : participantsHtml)
            + '</div>'
            + (isTeacher && t.status === 'waiting' ? '<div class="tournament-teacher-actions"><button class="glow-button primary pulse-action" onclick="app.startTournament()">INICIAR TORNEIO</button></div>' : '')
            + (t.status === 'active' ? '<div class="tournament-timer" id="tournament-countdown"></div>' : '')
            + '</div>';
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
        try {
            var result = await tournamentManager.join(tournamentId);
            if (result) {
                this.ui.showToast('Inscrito!', 'success');
                this.openTournamentLobby(tournamentId);
            } else {
                this.ui.showToast('Erro ao entrar no torneio', 'error');
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao entrar no torneio', 'error');
        }
    }

    // ═══ SETTINGS PANEL ═══
    openSettings() {
        const backdrop = document.getElementById('settings-backdrop');
        const input = document.getElementById('settings-nickname');
        const themeBtns = document.querySelectorAll('.theme-option');
        
        // Set current values
        if (input) input.value = this.engine.getPlayerName();
        
        // Highlight current theme
        const currentTheme = document.body.className || '';
        themeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === (currentTheme || 'sololeveling'));
        });
        
        // Bind close
        const closeBtn = document.getElementById('settings-close');
        if (closeBtn) closeBtn.onclick = () => this.closeSettings();
        
        // Bind nickname save
        const saveNickBtn = document.getElementById('settings-save-nick');
        if (saveNickBtn) saveNickBtn.onclick = () => {
            const newNick = input.value.trim();
            if (newNick && newNick !== this.engine.getPlayerName()) {
                this.engine.setPlayerName(newNick);
                this.engine.saveToCloud();
                this.ui.renderDashboard();
                this.closeSettings();
                this.ui.showToast('Nickname atualizado!', 'success');
            }
        };
        
        // Bind theme selection
        themeBtns.forEach(btn => {
            btn.onclick = () => {
                themeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const theme = btn.dataset.theme;
                document.body.className = theme === 'sololeveling' ? '' : 'theme-' + theme;
                this.engine.state.theme = theme;
                this.engine.save();
            };
        });
        
        // Bind logout
        const logoutBtn = document.getElementById('settings-logout');
        if (logoutBtn) logoutBtn.onclick = () => this.handleLogout();
        
        // Bind delete account
        const deleteBtn = document.getElementById('settings-delete-account');
        if (deleteBtn) deleteBtn.onclick = () => this.showDeleteConfirm();
        
        backdrop.classList.add('active');
    }
    
    closeSettings() {
        const backdrop = document.getElementById('settings-backdrop');
        if (backdrop) backdrop.classList.remove('active');
    }
    
    // ═══ DELETE ACCOUNT ═══
    showDeleteConfirm() {
        const backdrop = document.getElementById('delete-confirm-backdrop');
        if (backdrop) backdrop.classList.add('active');
        
        const cancelBtn = document.getElementById('delete-cancel');
        const confirmBtn = document.getElementById('delete-confirm');
        
        if (cancelBtn) cancelBtn.onclick = () => {
            backdrop.classList.remove('active');
        };
        if (confirmBtn) confirmBtn.onclick = async () => {
            try {
                const user = authManager.currentUser;
                if (!user) return;
                
                const passInput = document.getElementById('delete-confirm-password');
                const password = passInput ? passInput.value : '';

                // Se logado com senha e informou senha, reautenticar antes de deletar
                if (user.email && password) {
                    try {
                        const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
                        await user.reauthenticateWithCredential(credential);
                    } catch (authErr) {
                        this.ui.showToast('Senha incorreta para confirmação.', 'error');
                        return;
                    }
                }

                // Delete Firestore data
                try { await fbDB.collection('users').doc(user.uid).delete(); } catch(e) {}

                // Delete Firebase Auth account
                try {
                    await user.delete();
                } catch (delErr) {
                    if (delErr.code === 'auth/requires-recent-login') {
                        // Tenta reautenticar com Google Popup se o provedor for Google
                        const providerData = user.providerData || [];
                        const isGoogle = providerData.some(p => p.providerId === 'google.com');
                        if (isGoogle) {
                            const provider = new firebase.auth.GoogleAuthProvider();
                            await user.reauthenticateWithPopup(provider);
                            await user.delete();
                        } else {
                            this.ui.showToast('Por favor, informe sua senha atual para confirmar.', 'error');
                            return;
                        }
                    } else {
                        throw delErr;
                    }
                }

                // Sign out & clean state
                await authManager.logout();
                this.engine.resetGame();
                this.ui.showToast('Conta deletada com sucesso.', 'info');
                backdrop.classList.remove('active');
                this.closeSettings();
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } catch (e) {
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
            this.ui.renderAdminDashboard(guilds, currentGuild, students);
        } catch (e) {
            console.warn('Switch admin guild error:', e);
        }
    }

    async handleCreateGuildSubmit() {
        const input = document.getElementById('input-new-guild-name');
        const errEl = document.getElementById('create-guild-error');
        if (!input) return;
        const name = input.value.trim();
        if (!name) {
            if (errEl) errEl.textContent = 'Informe o nome da Guilda.';
            return;
        }
        try {
            if (errEl) errEl.textContent = 'Forjando guilda...';
            const newGuild = await authManager.createGuild(name);
            this.ui.hideCreateGuildModal();
            this.ui.showToast(`Guilda "${newGuild.name}" criada com código ${newGuild.classCode}!`, 'success');
            await this.openAdminDashboard();
        } catch (e) {
            if (errEl) errEl.textContent = e.message || 'Erro ao criar guilda.';
        }
    }

    async handleJoinGuildSubmit() {
        const input = document.getElementById('input-guild-join-code');
        const errEl = document.getElementById('join-guild-error');
        if (!input) return;
        const code = input.value.trim().toUpperCase();
        if (!code) {
            if (errEl) errEl.textContent = 'Digite o código da Guilda.';
            return;
        }
        try {
            if (errEl) errEl.textContent = 'Verificando com o Sistema...';
            const guildData = await authManager.joinGuild(code);
            this.ui.hideJoinGuildModal();
            this.ui.showToast(`Você ingressou na guilda "${guildData.name}"!`, 'success');
            this.ui.renderDashboard();
        } catch (e) {
            if (errEl) errEl.textContent = e.message || 'Código inválido ou guilda não encontrada.';
        }
    }
    
    // ═══ RANKED / CHALLENGES ═══
    async openRanked() {
        let challenges = [];
        try {
            if (typeof rankedManager !== 'undefined') {
                challenges = await rankedManager.getPendingChallenges();
            }
        } catch (e) {
            console.warn('Could not load challenges:', e.message);
        }
        this.ui.renderRankedScreen(challenges);
    }
    
    // ═══ TOURNAMENTS ═══
    async openTournaments() {
        let tournaments = [];
        try {
            if (typeof tournamentManager !== 'undefined') {
                tournaments = await tournamentManager.getActive();
            }
        } catch (e) {
            console.warn('Could not load tournaments:', e.message);
        }
        this.ui.renderTournamentsScreen(tournaments);
    }

    openTournamentLobby(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        this.showScreen('tournament');
        var content = document.getElementById('tournament-content');
        if (!content) return;

        // Fetch tournament data
        tournamentManager.getActive().then(function(tournaments) {
            var t = tournaments.find(function(tor) { return tor.id === tournamentId; });
            if (!t) {
                content.innerHTML = '<div class="tournament-screen"><p class="tournament-empty">Torneio nao encontrado.</p></div>';
                return;
            }
            tournamentManager.currentTournament = t;
            app.currentTournamentData = t;
            app.renderTournamentLobby(t);

            // Listen for real-time updates
            tournamentManager.listenLeaderboard(tournamentId, function(data) {
                app.currentTournamentData = data;
                app.renderTournamentLobby(data);
            });
        }).catch(function(e) {
            console.error('Failed to load tournament:', e);
            content.innerHTML = '<div class="tournament-screen"><p class="tournament-empty">Erro ao carregar torneio.</p></div>';
        });
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
