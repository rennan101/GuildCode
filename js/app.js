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
                this.loadTheme();
        this.ui.showScreen('loading');
        authManager.onAuthChange = (user) => this.onAuthStateChanged(user);
        authManager.init();
    }

    async onAuthStateChanged(user) {
        if (user) {
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
            if (loaded && this.engine.state.initialized && this.engine.getPlayerName()) {
                setTimeout(() => {
                    this.ui.showScreen('dashboard');
                    this.ui.renderDashboard();
                    this.ui.showToast('Bem-vindo de volta, ' + this.engine.getPlayerName() + '!', 'info');
                }, 1500);
            } else {
                setTimeout(() => {
                    if (this.engine.state.initialized && this.engine.getPlayerName()) {
                        this.ui.showScreen('dashboard');
                        this.ui.renderDashboard();
                    } else if (!this.engine.isIntroCompleted()) {
                        this.startIntro();
                    } else {
                        this.ui.showScreen('name');
                        this.ui.setupNameEntry((name) => this.onNameConfirmed(name));
                    }
                }, 1500);
            }
        } else {
            setTimeout(() => { this.ui.showScreen('login'); }, 1500);
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
                if (!name || !email || !pass) { this.showLoginError('Preencha todos os campos.'); return; }
                if (pass !== pass2) { this.showLoginError('As senhas nao coincidem.'); return; }
                if (pass.length < 6) { this.showLoginError('Minimo 6 caracteres.'); return; }
                this.setLoginLoading(true);
                try { await authManager.registerWithEmail(email, pass, name); } catch (e) {
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
        await this.engine.saveToCloud();
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
        document.getElementById('btn-start').onclick = () => {
            this.ui.showScreen('name');
            this.ui.setupNameEntry((name) => this.onNameConfirmed(name));
        };
        document.getElementById('btn-back-dashboard').onclick = () => {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        };
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
        });
    }

    openChapter(chapterId) { this.ui.openChapter(chapterId); }
    startActivity(activityIndex) {
        this.ui.startActivity(activityIndex);
        this.ui.openEditor();
    }
    advanceDialogue() { this.ui.advanceDialogue(); }
    toggleAutoPlay() { this.ui.toggleAutoPlay(); }
    toggleEditor() { this.ui.toggleEditor(); }

    startExperiment() {
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
    // == CREATE TOURNAMENT WITH SUBJECT SELECTION ==
    async createTournament() {
        if (typeof tournamentManager === 'undefined') return;
        var content = document.getElementById('tournament-content');
        if (!content) return;
        var chapterChecks = CHAPTERS.map(function(ch) {
            return '<label style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem;border:1px solid var(--border-ghost);background:var(--bg-deep);cursor:pointer;margin-bottom:0.3rem">' +
            '<input type="checkbox" value="' + ch.id + '" class="tournament-chapter-check" style="accent-color:var(--purple-bright)">' +
            '<span style="color:var(--text-primary);font-size:0.8rem">CAP ' + String(ch.id).padStart(2, '0') + ' - ' + ch.title + '</span></label>';
        }).join('');
        content.innerHTML = '<div style="margin-bottom:1rem"><button class="glow-button" onclick="app.openTournaments()" style="font-size:0.7rem;padding:0.3rem 0.8rem">VOLTAR</button></div>' +
            '<div style="font-family:var(--font-display);font-size:0.55rem;letter-spacing:0.12em;color:var(--purple-bright);margin-bottom:0.5rem">CRIAR TORNEIO</div>' +
            '<div style="margin-bottom:1rem"><div class="settings-label">NOME DO TORNEIO</div><input type="text" id="tournament-name" class="settings-input" placeholder="Ex: Torneio Semana 1" maxlength="40"></div>' +
            '<div style="margin-bottom:1rem"><div class="settings-label">SELECIONAR ASSUNTOS</div>' + chapterChecks + '</div>' +
            '<div style="margin-bottom:1rem"><div class="settings-label">TEMPO LIMITE (MINUTOS)</div><input type="number" id="tournament-time" class="settings-input" value="15" min="5" max="120"></div>' +
            '<button class="glow-button primary pulse-action" onclick="app.submitCreateTournament()">CRIAR E INICIAR</button>';
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
            await tournamentManager.start(id);
            this.ui.showToast('Torneio criado! ' + id, 'success');
            this.openTournaments();
        } catch (e) { console.error(e); this.ui.showToast('Erro ao criar torneio', 'error'); }
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
                if (user) {
                    // Delete Firestore data
                    await fbDB.collection('users').doc(user.uid).delete();
                    // Delete Firebase Auth account
                    await user.delete();
                    // Sign out
                    await authManager.logout();
                    this.ui.showToast('Conta deletada.', 'info');
                    backdrop.classList.remove('active');
                    this.closeSettings();
                }
            } catch (e) {
                console.error('Delete account failed:', e);
                this.ui.showToast('Erro ao deletar conta: ' + e.message, 'error');
                backdrop.classList.remove('active');
            }
        };
    }
    
    // ═══ THEME LOADING ═══
    loadTheme() {
        const theme = this.engine.state.theme || 'sololeveling';
        document.body.className = theme === 'sololeveling' ? '' : 'theme-' + theme;
    }
    
    // ═══ ADMIN DASHBOARD ═══
    async openAdminDashboard() {
        if (typeof authManager === 'undefined' || !authManager.isTeacher()) {
            this.ui.showToast('Acesso restrito a professores', 'error');
            return;
        }
        try {
            const students = await authManager.getClassStudents();
            this.ui.renderAdminDashboard(students);
        } catch (e) {
            console.error('Failed to load admin dashboard:', e);
            this.ui.showToast('Erro ao carregar painel', 'error');
        }
    }
    
    // ═══ RANKED / CHALLENGES ═══
    async openRanked() {
        var challenges = [];
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
        var tournaments = [];
        try {
            if (typeof tournamentManager !== 'undefined') {
                tournaments = await tournamentManager.getActive();
            }
        } catch (e) {
            console.warn('Could not load tournaments:', e.message);
        }
        this.ui.renderTournamentsScreen(tournaments);
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
