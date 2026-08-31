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
    playTypewriter(charType = 'character') {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            
            // Frequências base distintas por arquétipo/personagem para voz única
            let baseFreq = 520;
            let oscType = 'sine';
            let vol = 0.025;

            if (charType === 'arkan' || charType === 'kael') {
                baseFreq = 340; // Voz mais grave/marcial
                oscType = 'triangle';
                vol = 0.03;
            } else if (charType === 'lyra' || charType === 'mira') {
                baseFreq = 680; // Voz mais suave/aguda
                oscType = 'sine';
                vol = 0.022;
            } else if (charType === 'gm' || charType === 'system') {
                baseFreq = 820; // Tom cyber/etéreo
                oscType = 'triangle';
                vol = 0.02;
            }

            // Micro-variação natural por letra (jitter de pitch)
            const jitter = (Math.random() - 0.5) * 45;
            const finalFreq = Math.max(120, baseFreq + jitter);

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = oscType;
            osc.frequency.setValueAtTime(finalFreq, now);
            osc.frequency.exponentialRampToValueAtTime(finalFreq * 0.85, now + 0.035);

            gain.gain.setValueAtTime(vol, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.042);
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

    // ─── DRAMATIC CINEMATIC SOUND EFFECTS (ISEKAI ACCIDENT) ───
    playTireScreech() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            
            // 1. Motor acelerando/ronco de aproximação de van pesada (Low Sawtooth)
            const engineOsc = this.ctx.createOscillator();
            const engineGain = this.ctx.createGain();
            engineOsc.type = 'sawtooth';
            engineOsc.frequency.setValueAtTime(85, now);
            engineOsc.frequency.exponentialRampToValueAtTime(210, now + 0.6);
            engineGain.gain.setValueAtTime(0.01, now);
            engineGain.gain.linearRampToValueAtTime(0.22, now + 0.35);
            engineGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
            engineOsc.connect(engineGain);
            engineGain.connect(this.ctx.destination);
            engineOsc.start(now);
            engineOsc.stop(now + 1.22);

            // 2. Fricção encorpada de pneus pesados no asfalto (Ruído filtrado em Lowpass)
            const bufferSize = this.ctx.sampleRate * 1.3;
            const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            const whiteNoise = this.ctx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(950, now);
            filter.frequency.linearRampToValueAtTime(1400, now + 0.4);
            filter.frequency.linearRampToValueAtTime(650, now + 1.1);
            filter.Q.setValueAtTime(3.5, now);

            const noiseGain = this.ctx.createGain();
            noiseGain.gain.setValueAtTime(0.01, now);
            noiseGain.gain.linearRampToValueAtTime(0.3, now + 0.35);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

            whiteNoise.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(this.ctx.destination);
            whiteNoise.start(now);
            whiteNoise.stop(now + 1.26);

            // 3. Cantar de derrapagem realista (frequência média aveludada, sem agudo estridente)
            const skidOsc = this.ctx.createOscillator();
            const skidGain = this.ctx.createGain();
            skidOsc.type = 'sine';
            skidOsc.frequency.setValueAtTime(800, now + 0.15);
            skidOsc.frequency.linearRampToValueAtTime(1150, now + 0.5);
            skidOsc.frequency.exponentialRampToValueAtTime(420, now + 1.1);
            skidGain.gain.setValueAtTime(0.001, now);
            skidGain.gain.setValueAtTime(0.01, now + 0.15);
            skidGain.gain.linearRampToValueAtTime(0.14, now + 0.45);
            skidGain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);
            skidOsc.connect(skidGain);
            skidGain.connect(this.ctx.destination);
            skidOsc.start(now + 0.15);
            skidOsc.stop(now + 1.16);
        } catch (e) {}
    }

    playCrashImpact() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;

            // Camada 1: Impacto Sub-Grave Ensurdecedor (Explosão de Metal)
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(160, now);
            osc1.frequency.exponentialRampToValueAtTime(25, now + 0.8);
            gain1.gain.setValueAtTime(0.4, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
            osc1.connect(gain1);
            gain1.connect(this.ctx.destination);
            osc1.start(now);
            osc1.stop(now + 0.86);

            // Camada 2: Metal contorcendo e estilhaço (Ruído metálico cortante)
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(450, now);
            osc2.frequency.linearRampToValueAtTime(110, now + 0.35);
            gain2.gain.setValueAtTime(0.35, now);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            osc2.connect(gain2);
            gain2.connect(this.ctx.destination);
            osc2.start(now);
            osc2.stop(now + 0.52);

            // Camada 3: Sub-bass boom
            const osc3 = this.ctx.createOscillator();
            const gain3 = this.ctx.createGain();
            osc3.type = 'sine';
            osc3.frequency.setValueAtTime(90, now);
            osc3.frequency.linearRampToValueAtTime(30, now + 1.2);
            gain3.gain.setValueAtTime(0.45, now);
            gain3.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
            osc3.connect(gain3);
            gain3.connect(this.ctx.destination);
            osc3.start(now);
            osc3.stop(now + 1.25);
        } catch (e) {}
    }

    playCosmicPulse() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            
            // Ressonância transcendental do Sistema (Convite Cósmico)
            [261.63, 329.63, 392.00, 523.25, 659.25, 1046.50].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                const startTime = now + (idx * 0.1);
                osc.frequency.setValueAtTime(freq, startTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.05, startTime + 1.2);
                gain.gain.setValueAtTime(0.08, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 1.45);
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
        this.activityContext = {
            mode: 'chapter', // 'chapter' | 'abyss' | 'tournament' | 'pvp'
            data: null
        };
    }

    async init() {
        this.ui.initParticles();
        this.bindGlobalEvents();
        this.bindAuthEvents();
        this.bindLoginEvents();
        this.loadTheme();
        this.ui.showScreen('loading');

        // Inicializa o gerenciador de missões (JSON local + Firestore)
        if (typeof missionsManager !== 'undefined') {
            await missionsManager.init();
        }

        authManager.onAuthChange = (user) => this.onAuthStateChanged(user);
        authManager.onConcurrentSessionTerminated = () => {
            this.ui.showModal(
                'SESSÃO ENCERRADA',
                'Sua conta foi conectada em outro computador, navegador ou aba. Por segurança, esta sessão anterior foi desconectada automaticamente.',
                '🛡️',
                () => { window.location.reload(); }
            );
        };
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
            try {
                // Carrega imediatamente o cache local do usuário logado para renderização instantânea
                this.engine.load();
                this.loadTheme();

                updateLoadingText('Entrando na Guilda', true);
                
                // Sincronização assíncrona com timeout curto (1.5s) para não travar a tela de loading
                const cloudSyncPromise = this.engine.loadFromCloud();
                
                if (typeof authManager !== 'undefined' && authManager.isTeacher()) {
                    if (this.engine.state.tokens === undefined || this.engine.state.tokens === null) {
                        this.engine.state.tokens = 9999;
                    }
                    const classCode = authManager.getClassCode();
                    if (classCode) {
                        fbDB.collection('classes').doc(classCode).get().then(classDoc => {
                            if (classDoc && classDoc.exists && classDoc.data().chapterUnlocks) {
                                this.engine.setChapterUnlocks(classDoc.data().chapterUnlocks);
                                if (this.ui.currentScreen === 'dashboard') this.ui.renderDashboard();
                            }
                        }).catch(() => {});
                    }
                }

                // Espera no máximo 1.2s se já houver cache local, garantindo entrada imediata
                await Promise.race([
                    cloudSyncPromise,
                    new Promise(resolve => setTimeout(resolve, 1200))
                ]);

                updateLoadingText('Sistema pronto.');

                const isMaster = (typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin()));
                const authDisplayName = typeof authManager !== 'undefined' ? authManager.getDisplayName() : '';
                const engineName = this.engine.getPlayerName();
                const validName = (engineName && engineName !== 'Aventureiro') ? engineName : authDisplayName;
                
                if (validName) {
                    this.engine.setPlayerName(validName);
                }

                const isIntroDone = this.engine.isIntroCompleted();
                const isOnboardingDone = this.engine.isOnboardingCompleted();

                // Fecha o modal de autenticação da landing se estiver aberto
                this.closeAuthModal();

                if (!isIntroDone && !isMaster) {
                    // Novo usuário que ainda não completou a introdução
                    this.startIntro();
                } else {
                    // Usuário já com intro realizada ou mestre
                    this.ui.showScreen('dashboard');
                    this.ui.renderDashboard();
                    this.checkSubclassAwakening();
                    if (typeof chatUI !== 'undefined') {
                        chatUI.init();
                    }

                    if (!isOnboardingDone && !isMaster) {
                        setTimeout(() => {
                            this.ui.startInteractiveOnboarding();
                        }, 800);
                    } else {
                        this.ui.showToast('Bem-vindo de volta, ' + this.engine.getPlayerName() + '!', 'info');
                    }
                }
            } catch (err) {
                console.error('[App] onAuthStateChanged error:', err);
                this.ui.showScreen('dashboard');
                this.ui.renderDashboard();
                if (typeof chatUI !== 'undefined') {
                    chatUI.init();
                }
            }
        } else {
            this.setLoginLoading(false);
            updateLoadingText('Aguardando autenticação...');
            this.ui.showScreen('landing');
            if (window.landingController) {
                window.landingController.init();
            }
        }
    }

    showAuthModal(mode = 'login') {
        const loginScreen = document.getElementById('screen-login');
        if (loginScreen) {
            loginScreen.classList.add('auth-modal-mode');
            loginScreen.classList.add('active');
        }
        if (mode === 'register') {
            this.showRegisterForm();
        } else {
            this.showLoginForm();
        }
    }

    closeAuthModal() {
        const loginScreen = document.getElementById('screen-login');
        if (loginScreen) {
            loginScreen.classList.remove('active');
            loginScreen.classList.remove('auth-modal-mode');
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
            btnShowRegister.onclick = (e) => {
                if (e) e.preventDefault();
                this.showRegisterForm();
            };
        }
        const btnShowLogin = document.getElementById('btn-show-login');
        if (btnShowLogin) {
            btnShowLogin.onclick = (e) => {
                if (e) e.preventDefault();
                this.showLoginForm();
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

    promptLogout() {
        const modal = document.getElementById("modal-confirm-logout");
        if (modal) {
            modal.classList.remove("hidden");
            modal.classList.add("active");
        }
        if (window.soundFX && typeof window.soundFX.playClick === 'function') {
            window.soundFX.playClick();
        }
    }

    closeLogoutModal() {
        const modal = document.getElementById("modal-confirm-logout");
        if (modal) {
            modal.classList.remove("active");
            modal.classList.add("hidden");
        }
    }

    async handleLogout() {
        this.closeLogoutModal();
        this.resetAllPasswordFields();
        this.closeSettings();
        const delBackdrop = document.getElementById("modal-delete-account");
        if (delBackdrop) delBackdrop.classList.add("hidden");
        try {
            await this.engine.saveToCloud();
        } catch (e) {}
        this.engine.resetGame();
        if (typeof partyManager !== 'undefined') {
            partyManager.resetPartySession();
        }
        this.setLoginLoading(false);
        await authManager.logout();
        this.ui.showScreen('landing');
        if (window.landingController) {
            window.landingController.init();
        }
    }

    showForgotPassword() {
        this.resetAllPasswordFields();
        const loginArea = document.getElementById('login-form-area');
        const regArea = document.getElementById('register-form-area');
        const forgotArea = document.getElementById('forgot-form-area');
        if (loginArea) loginArea.style.display = 'none';
        if (regArea) regArea.style.display = 'none';
        if (forgotArea) {
            forgotArea.style.display = 'block';
            const emailInput = document.getElementById('login-email');
            const forgotEmailInput = document.getElementById('forgot-email');
            if (forgotEmailInput && emailInput && emailInput.value) {
                forgotEmailInput.value = emailInput.value;
            }
            const msgEl = document.getElementById('forgot-msg');
            if (msgEl) msgEl.textContent = '';
        }
    }

    showRegisterForm() {
        this.resetAllPasswordFields();
        const loginArea = document.getElementById('login-form-area');
        const regArea = document.getElementById('register-form-area');
        const forgotArea = document.getElementById('forgot-form-area');
        if (loginArea) loginArea.style.display = 'none';
        if (regArea) regArea.style.display = 'block';
        if (forgotArea) forgotArea.style.display = 'none';
        const err = document.getElementById('login-error');
        if (err) err.textContent = '';
        const errReg = document.getElementById('login-error-reg');
        if (errReg) errReg.textContent = '';
    }

    showLoginForm() {
        this.resetAllPasswordFields();
        const loginArea = document.getElementById('login-form-area');
        const regArea = document.getElementById('register-form-area');
        const forgotArea = document.getElementById('forgot-form-area');
        if (loginArea) loginArea.style.display = 'block';
        if (regArea) regArea.style.display = 'none';
        if (forgotArea) forgotArea.style.display = 'none';
        const err = document.getElementById('login-error');
        if (err) err.textContent = '';
        const errReg = document.getElementById('login-error-reg');
        if (errReg) errReg.textContent = '';
    }

    async handleSendPasswordReset() {
        const input = document.getElementById('forgot-email');
        const msgEl = document.getElementById('forgot-msg');
        if (!input || !msgEl) return;
        
        const email = input.value.trim();
        if (!email) {
            msgEl.style.color = 'var(--red)';
            msgEl.textContent = 'Informe o seu e-mail cadastrado.';
            input.classList.add('input-error');
            input.focus();
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            msgEl.style.color = 'var(--red)';
            msgEl.textContent = 'Formato de e-mail inválido.';
            input.classList.add('input-error');
            input.focus();
            return;
        }

        msgEl.style.color = 'var(--cyan)';
        msgEl.textContent = 'Enviando link de recuperação...';

        try {
            await authManager.sendPasswordReset(email);
            msgEl.style.color = 'var(--green)';
            msgEl.textContent = '✓ Link de redefinição enviado! Verifique seu e-mail (inclusive na caixa de spam).';
            this.ui.showToast('Link de recuperação enviado com sucesso!', 'success');
        } catch (e) {
            msgEl.style.color = 'var(--red)';
            if (e.code === 'auth/user-not-found') {
                msgEl.textContent = 'Nenhuma conta encontrada com este e-mail.';
            } else {
                msgEl.textContent = 'Erro ao enviar e-mail: ' + (e.message || 'Tente novamente.');
            }
        }
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
            if (ch && ch.experiment) {
                document.getElementById('code-editor').value = ch.experiment.starterCode;
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
                document.getElementById('activity-editor').value = act.starterCode;
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
                + '<button class="glow-button primary pulse-action" style="flex:1;padding:0.75rem;font-weight:700;" onclick="app.submitEditTournament(\'' + tournamentId + '\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> SALVAR ALTERAÇÕES</button>'
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
                + '<div class="tournament-participants-list">'
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

        var isTeacher = typeof authManager !== 'undefined' && authManager.isTeacher();
        var isPaused = t.status === 'paused';

        const swordIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.4rem;color:var(--gold);"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 17.5L21 6V3h-3L6.5 14.5"/><path d="M11 19l-6-6"/><path d="M8 16l-4 4"/><path d="M5 21l-2-2"/></svg>`;

        // Renderiza a Arena do Torneio
        content.innerHTML = `
            <div class="tournament-arena-container" style="display:flex;flex-direction:column;gap:1rem;width:100%;height:100%;">
                <!-- TOURNAMENT TOP BAR -->
                <div style="display:flex;align-items:center;justify-content:space-between;background:var(--bg-panel);border:1px solid var(--border-dim);padding:0.8rem 1.4rem;border-radius:4px;flex-wrap:wrap;gap:0.8rem;">
                    <div style="display:flex;align-items:center;gap:0.8rem;flex-wrap:wrap;">
                        <span style="font-family:var(--font-display);color:var(--gold);font-size:0.95rem;font-weight:700;display:flex;align-items:center;">${swordIconSvg} ${t.title || 'BATALHA DE TORNEIO'}</span>
                        <span style="color:var(--text-dim);font-size:0.75rem;">[ Desafio ${this.currentTournamentActIdx + 1}/${challengesList.length || 1} ]</span>
                        
                        ${isTeacher ? `
                            <!-- CONTROLES DO PROFESSOR/MESTRE -->
                            <div style="display:inline-flex;gap:0.4rem;margin-left:0.5rem;">
                                <button class="glow-button btn-secondary-sm" style="padding:0.25rem 0.6rem;font-size:0.68rem;border-color:var(--gold);color:var(--gold);" onclick="app.toggleTournamentPause('${t.id}')">
                                    ${isPaused ? '▶ RETOMAR' : '⏸ PAUSAR TODOS'}
                                </button>
                                <button class="glow-button btn-secondary-sm" style="padding:0.25rem 0.6rem;font-size:0.68rem;border-color:var(--cyan);color:var(--cyan);" onclick="app.skipTournamentChallenge('${t.id}')">
                                    ⏭ PULAR DESAFIO
                                </button>
                            </div>
                        ` : ''}
                    </div>
                    <div style="display:flex;align-items:center;gap:1.2rem;">
                        <div id="tournament-timer-display" style="font-family:var(--font-code);font-size:1.1rem;font-weight:bold;color:${isPaused ? 'var(--gold)' : 'var(--cyan)'};background:var(--bg-deep);padding:0.3rem 0.8rem;border:1px solid var(--border-bright);border-radius:3px;">
                            --:--
                        </div>
                        <span class="panel-badge" style="background:${isPaused ? 'rgba(232, 197, 71, 0.15)' : 'rgba(239, 68, 68, 0.15)'};color:${isPaused ? 'var(--gold)' : '#f87171'};border:1px solid ${isPaused ? 'var(--gold)' : '#ef4444'};font-size:0.75rem;">
                            ${isPaused ? 'PAUSADO PELO MESTRE' : 'EM BATALHA'}
                        </span>
                    </div>
                </div>

                ${isPaused ? `
                    <div style="background:rgba(232, 197, 71, 0.1);border:1px dashed var(--gold);padding:0.6rem 1rem;border-radius:4px;color:var(--gold);font-family:var(--font-display);font-size:0.75rem;text-align:center;letter-spacing:0.08em;">
                        ⏸ O TORNEIO ESTÁ PAUSADO PELO PROFESSOR. O TEMPO E AS SUBMISSÕES ESTÃO CONGELADOS.
                    </div>
                ` : ''}

                <!-- TOURNAMENT MAIN SPLIT -->
                <div style="display:grid;grid-template-columns:minmax(280px, 1fr) minmax(380px, 1.4fr) minmax(220px, 0.8fr);gap:1rem;flex:1;min-height:550px;">
                    <!-- COL 1: PROBLEMA & DICAS & SAÍDA ESPERADA -->
                    <div style="background:var(--bg-panel);border:1px solid var(--border-dim);padding:1.2rem;border-radius:4px;display:flex;flex-direction:column;overflow-y:auto;">
                        <h3 style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.9rem;margin-bottom:0.6rem;">${curChallenge.title}</h3>
                        <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;margin-bottom:1rem;">
                            ${curChallenge.description || 'Implemente a solução solicitada e valide no terminal.'}
                        </div>

                        ${curChallenge.tests && curChallenge.tests.length > 0 ? `
                            <div class="expected-output-box" style="margin-bottom:1rem;">
                                <div class="expected-output-header">
                                    <div class="expected-output-title">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                        SAÍDA ESPERADA
                                    </div>
                                    <span class="expected-output-badge ${curChallenge.tests.some(t => String(t.expected).includes('\n')) ? 'multiline' : 'singleline'}">
                                        ${curChallenge.tests.some(t => String(t.expected).includes('\n')) ? '↵ LINHAS SEPARADAS (\\n)' : '➔ MESMA LINHA'}
                                    </span>
                                </div>
                                <div class="expected-tests-list">
                                    ${curChallenge.tests.map((t, idx) => {
                                        const isMulti = String(t.expected).includes('\n');
                                        const lineCt = String(t.expected).split('\n').length;
                                        return `
                                            <div class="expected-test-item">
                                                <div class="expected-test-meta">
                                                    <span><strong style="color:var(--cyan);">Caso ${idx + 1}:</strong> ${t.description || ''}</span>
                                                    ${t.input ? `<span>Entrada: <code>${t.input}</code></span>` : '<span>(sem entrada)</span>'}
                                                </div>
                                                <div style="font-size:0.68rem;color:var(--text-secondary);margin-bottom:0.15rem;">
                                                    📌 ${isMulti ? `Em <strong>${lineCt} linhas separadas</strong> (use \\n)` : 'Na <strong>mesma linha</strong>'}:
                                                </div>
                                                <pre class="expected-preview-pre">${t.expected}</pre>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        ` : ''}

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

        if (this.tournamentTimerInterval) {
            clearInterval(this.tournamentTimerInterval);
            this.tournamentTimerInterval = null;
        }

        if (t.status === 'paused') {
            timerEl.textContent = '⏸ PAUSADO';
            return;
        }

        var startedAtSec = t.startedAt ? (t.startedAt.seconds || Math.floor(Date.now() / 1000)) : Math.floor(Date.now() / 1000);
        var durationSec = (t.timeLimit || 15) * 60;
        var endAtSec = startedAtSec + durationSec;

        var updateTimer = () => {
            if (this.currentTournamentData && this.currentTournamentData.status === 'paused') {
                timerEl.textContent = '⏸ PAUSADO';
                return;
            }

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
                if (typeof tournamentManager !== 'undefined' && t && t.id) {
                    tournamentManager.finish(t.id, t).catch(e => console.warn('finish error:', e));
                }
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
                this.ui.showToast('Parabéns! Você concluiu todos os desafios do torneio!', 'success');
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

    async toggleTournamentPause(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        try {
            const newStatus = await tournamentManager.togglePause(tournamentId);
            if (newStatus === 'paused') {
                this.ui.showToast('⏸ Torneio pausado para todos os participantes!', 'info');
            } else {
                this.ui.showToast('▶ Torneio retomado com sucesso!', 'success');
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao alterar pausa do torneio', 'error');
        }
    }

    async skipTournamentChallenge(tournamentId) {
        if (typeof tournamentManager === 'undefined') return;
        var t = this.currentTournamentData;
        if (!t || !t.challenges) return;

        var challengesList = [];
        t.challenges.forEach(function(chGroup) {
            if (chGroup.activities) {
                chGroup.activities.forEach(function(act) { challengesList.push(act); });
            }
        });

        var nextIdx = (this.currentTournamentActIdx || 0) + 1;
        if (nextIdx >= challengesList.length) {
            this.ui.showToast('Este já é o último desafio do torneio!', 'info');
            return;
        }

        try {
            await tournamentManager.skipChallenge(tournamentId, nextIdx);
            this.currentTournamentActIdx = nextIdx;
            this.renderTournamentLobby(this.currentTournamentData);
            this.ui.showToast('⏭ Desafio pulado pelo Professor!', 'success');
        } catch (e) {
            console.error(e);
            this.ui.showToast('Erro ao pular desafio', 'error');
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

        // Extrai o ID do avatar (ex: '03')
        const match = avatarPath.match(/avatar_(\d+)\.png/);
        const avId = match ? match[1] : null;

        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        const unlockedList = (this.engine && this.engine.state && this.engine.state.unlockedAvatars) 
            || (window.gameProgress && window.gameProgress.unlockedAvatars) 
            || ['02'];

        // Verifica se o avatar é o inicial (02), se o usuário é mestre, ou se foi desbloqueado no gacha
        const isUnlocked = isMaster || avId === '02' || (avId && unlockedList.includes(avId));

        if (!isUnlocked) {
            this.ui.showToast('Este avatar está bloqueado! Obtenha-o na Câmara de Gacha.', 'warning');
            return;
        }

        try {
            if (typeof authManager !== 'undefined') {
                await authManager.updateProfilePhoto(avatarPath);
            }
            if (window.soundFX) window.soundFX.playMagic();

            const skillInfo = (typeof AVATAR_SKILLS_DATA !== 'undefined' && avId) ? AVATAR_SKILLS_DATA[avId] : null;
            if (skillInfo) {
                this.ui.showToast(`Retrato atualizado! Habilidade ativa: ${skillInfo.skillName}`, 'success');
            } else {
                this.ui.showToast('Retrato de avatar atualizado!', 'success');
            }
            
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
        const themeBtns = document.querySelectorAll('.theme-option');
        
        // Set current values
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
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }

    hideDeleteAccountModal() {
        const modal = document.getElementById('modal-delete-account');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('active');
        }
    }

    async confirmDeleteAccount() {
        const input = document.getElementById('input-confirm-delete-account');
        const err = document.getElementById('delete-account-error');
        if (!input) return;
        const typed = input.value.trim();
        if (typed !== 'DELETAR MINHA CONTA') {
            if (err) err.textContent = 'Digite exatamente: DELETAR MINHA CONTA';
            input.focus();
            return;
        }

        if (err) err.textContent = '';
        this.ui.showToast('Excluindo conta do servidor...', 'info');

        try {
            if (typeof authManager !== 'undefined') {
                await authManager.deleteAccount();
                this.hideDeleteAccountModal();
                this.closeSettings();
                this.engine.resetGame();
                this.ui.showToast('Conta excluída com sucesso.', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 700);
            }
        } catch (e) {
            console.error('[App] Delete account failed:', e);
            if (e && e.code === 'auth/requires-recent-login') {
                if (err) err.textContent = 'Por segurança do Firebase, faça login novamente antes de excluir a conta.';
                this.ui.showToast('Reautenticação necessária para excluir a conta.', 'error');
            } else {
                if (err) err.textContent = 'Erro ao excluir: ' + (e?.message || 'Erro desconhecido');
                this.ui.showToast('Erro ao excluir conta: ' + (e?.message || 'Falha'), 'error');
            }
        }
    }
    
    // ═══ THEME LOADING ═══
    loadTheme() {
        let theme = this.engine.state.theme || 'sololeveling';
        if (theme === 'sao') {
            theme = 'sololeveling';
            this.engine.state.theme = 'sololeveling';
        }
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
                this._cachedAdminData.students,
                this._cachedAdminData.parties || []
            );
        } else {
            const container = document.getElementById('admin-content');
            if (container) {
                container.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO PAINEL DO MESTRE...</div></div>';
            }
        }

        try {
            if (typeof authManager !== 'undefined' && !authManager.userData && authManager.currentUser) {
                await authManager.loadUserData();
            }

            const timeoutPromise = (promise, ms = 5000, fallback = null) => 
                Promise.race([promise, new Promise(res => setTimeout(() => res(fallback), ms))]);

            const guilds = (await timeoutPromise(authManager.getTeacherGuilds(), 5000, [])) || [];
            let currentGuild = null;
            let currentCode = authManager.getClassCode();
            if (!currentCode && authManager.getEffectiveGuildCode) {
                currentCode = await timeoutPromise(authManager.getEffectiveGuildCode(), 3000, '');
            }

            if (currentCode) {
                currentGuild = guilds.find(g => (g.classCode || g.guildCode || g.id) === currentCode) || null;
            }
            if (!currentGuild && guilds.length > 0) {
                currentGuild = guilds[0];
            }
            let students = [];
            let parties = [];
            if (currentGuild) {
                const code = currentGuild.classCode || currentGuild.guildCode || currentGuild.id;
                students = (await timeoutPromise(authManager.getGuildStudents(code), 5000, [])) || [];
                if (typeof partyManager !== 'undefined') {
                    parties = (await timeoutPromise(partyManager.getGuildParties(code), 5000, [])) || [];
                }
            }
            this._cachedAdminData = { guilds, currentGuild, students, parties };
            this.ui.renderAdminDashboard(guilds, currentGuild, students, parties);
        } catch (e) {
            console.warn('Could not load guild data for admin:', e);
            this.ui.renderAdminDashboard([], null, [], []);
        }
    }

    async switchAdminGuild(guildCode) {
        if (!guildCode) return;
        try {
            const guilds = await authManager.getTeacherGuilds();
            const currentGuild = guilds.find(g => (g.classCode || g.guildCode || g.id) === guildCode) || null;
            let students = [];
            let parties = [];
            if (currentGuild) {
                students = await authManager.getGuildStudents(guildCode);
                if (typeof partyManager !== 'undefined') {
                    parties = await partyManager.getGuildParties(guildCode);
                }
            }
            this._cachedAdminData = { guilds, currentGuild, students, parties };
            this.ui.renderAdminDashboard(guilds, currentGuild, students, parties);
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

    async handleJoinGuildSubmit() {
        const input = document.getElementById('input-guild-join-code');
        const errEl = document.getElementById('join-guild-error');
        const btn = document.getElementById('btn-confirm-join-guild');
        if (!input) return;

        const code = (input.value || '').trim();
        if (!code) {
            if (errEl) errEl.textContent = 'Por favor, informe o código da Guilda.';
            return;
        }

        if (errEl) errEl.textContent = '';
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span class="btn-text">Conectando...</span>';
        }

        try {
            const guildData = await authManager.joinGuild(code);
            this.ui.hideJoinGuildModal();
            this.ui.showToast(`Vinculado com sucesso à guilda "${guildData.name || code}"!`, 'success');
            
            // Invalida cache da tela de guilda e abre
            if (this.ui._cachedGuildScreenData) {
                this.ui._cachedGuildScreenData = null;
            }
            await this.openGuildScreen();
        } catch (e) {
            console.error('Join guild error:', e);
            if (errEl) errEl.textContent = e.message || 'Código de Guilda inválido ou não encontrado.';
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span class="btn-text">Ingressar</span><span class="btn-glow"></span>';
            }
        }
    }

    // ─── GUILD SCREEN ───
    async openGuildScreen() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) {
            this.ui.showToast('Faça login para acessar a guilda.', 'info');
            return;
        }

        if (!authManager.userData && authManager.currentUser) {
            await authManager.loadUserData();
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

        // 2. Parallel fetch in background com timeout de segurança
        try {
            if (typeof rankedManager !== 'undefined') {
                const timeoutPromise = (promise, ms = 3500, fallback = []) => 
                    Promise.race([promise, new Promise(res => setTimeout(() => res(fallback), ms))]);

                const [challenges, leaderboard] = await Promise.all([
                    timeoutPromise(rankedManager.getPendingChallenges(), 3500, []),
                    timeoutPromise(rankedManager.getGuildLeaderboard(), 3500, [])
                ]);
                this._cachedRankedData = { challenges, leaderboard };
                this.ui.renderRankedScreen(challenges || [], leaderboard || []);
            }
        } catch (e) {
            console.warn('Could not load ranked data:', e.message);
            this.ui.renderRankedScreen([], []);
        }
    }
    
    // ═══ TOURNAMENTS ═══
    async openTournaments() {
        this.ui.showScreen('tournament');
        
        // Interrompe escutas anteriores de lobby se houver
        if (typeof tournamentManager !== 'undefined') {
            tournamentManager.stopListening();
        }

        const container = document.getElementById('tournament-content');
        
        // Se já tiver cache em memória, exibe imediatamente para nunca ficar em branco
        if (typeof tournamentManager !== 'undefined' && tournamentManager.cachedActive && tournamentManager.cachedHallOfFame) {
            this.ui.renderTournamentsScreen(tournamentManager.cachedActive, tournamentManager.cachedHallOfFame);
        } else if (container) {
            container.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--gold);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO TORNEIOS & HALL DA FAMA...</div></div>';
        }

        // Busca dados atualizados em tempo real
        try {
            if (typeof tournamentManager !== 'undefined') {
                const data = await tournamentManager.getAllData();
                this.ui.renderTournamentsScreen(data.active || [], data.hallOfFame || []);
            }
        } catch (e) {
            console.warn('Could not load tournaments:', e.message);
            const active = (typeof tournamentManager !== 'undefined' && tournamentManager.cachedActive) || [];
            const hall = (typeof tournamentManager !== 'undefined' && tournamentManager.cachedHallOfFame) || [];
            this.ui.renderTournamentsScreen(active, hall);
        }
    }

    async handleRemoveFromHallOfFame(tournamentId, winnerName) {
        if (!confirm(`Deseja remover "${winnerName || 'este campeão'}" do Hall da Fama dos Torneios?`)) return;
        try {
            if (typeof tournamentManager !== 'undefined') {
                await tournamentManager.removeFromHallOfFame(tournamentId);
                this.ui.showToast('Campeão removido do Hall da Fama com sucesso.', 'success');
                await this.openTournaments();
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast(e.message || 'Erro ao remover do Hall da Fama.', 'error');
        }
    }

    // ═══ HINTS PURCHASE & REVELATION ═══
    handleBuyHint(actId, hintIdx) {
        const cost = [5, 10, 15][hintIdx] || 5;
        const isTeacher = typeof authManager !== 'undefined' && authManager.isTeacher();
        const hasFreeHints = typeof this.engine !== 'undefined' && this.engine.hasSkill && this.engine.hasSkill('rv_free_hints');
        
        let finalCost = (isTeacher || hasFreeHints) ? 0 : cost;

        // Bônus de Avatar para Dicas:
        if (finalCost > 0 && typeof getAvatarSkillBonus === 'function') {
            // Rune Coder (04) / Aether Mage (04): Desconto de dica
            const hintDiscount = getAvatarSkillBonus('hint_discount');
            if (hintDiscount > 0) {
                finalCost = Math.max(1, Math.round(finalCost * (1 - hintDiscount)));
            }

            // Senpai Caster (20): Primeira dica grátis por dia
            const freeHintBonus = getAvatarSkillBonus('daily_free_hint');
            if (freeHintBonus > 0 && !this._dailyHintUsedToday) {
                this._dailyHintUsedToday = true;
                finalCost = 0;
                this.ui.showToast('🎓 [Tutela Inspiradora]: Primeira dica do dia gratuita!', 'info');
            }
        }

        if (this.engine.isHintUnlocked(actId, hintIdx)) {
            return;
        }

        const currentTokens = this.engine.getTokens();
        if (finalCost > 0 && currentTokens < finalCost) {
            this.ui.showToast(`Tokens insuficientes! Você possui ${currentTokens} e precisa de ${finalCost} Tokens. Complete missões diárias ou mantenha seu streak para ganhar Tokens.`, 'error');
            return;
        }

        if (finalCost > 0) {
            if (!this.engine.spendTokens(finalCost)) {
                this.ui.showToast('Erro ao deduzir Tokens.', 'error');
                return;
            }
        }

        this.engine.unlockHint(actId, hintIdx);
        this.ui.updateTopBarTokens();

        if (this.ui.currentActivity) {
            this.ui.renderHints(this.ui.currentActivity);
        }

        this.ui.showToast(`Dica ${['I', 'II', 'III'][hintIdx]} desbloqueada!${finalCost > 0 ? ` (-${finalCost} Tokens)` : ' (Grátis)'}`, 'success');
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
    
    // ═══ STREAK DIÁRIO (OFENSIVA) & LOJA DA GUILDA ═══
    toggleStreakPopover() {
        const popover = document.getElementById('streak-popover');
        if (!popover) return;
        const isHidden = popover.classList.contains('hidden');
        if (isHidden) {
            // Fecha o drawer de missões se estiver aberto para evitar sobreposição
            if (this.ui && typeof this.ui.closeChapterDrawer === 'function') {
                this.ui.closeChapterDrawer();
            }
            this.ui.renderStreakPopover();
            popover.classList.remove('hidden');
        } else {
            popover.classList.add('hidden');
        }
    }

    openShopScreen() {
        this.ui.showScreen('shop');
        this.ui.renderGuildShop();
    }

    async handleBuyShopItem(itemId, cost, amountValue = 1) {
        try {
            const res = this.engine.redeemShopReward(itemId, cost, amountValue);
            if (res.success) {
                if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                    window.soundFX.playCheckCodeSuccess();
                }

                // Salva progresso na nuvem
                await this.engine.saveToCloud();

                // Atualiza a interface da loja e do topo
                this.ui.renderGuildShop();
                this.ui.renderDashboard();

                let msg = 'Item resgatado com sucesso!';
                if (itemId === 'absence') {
                    msg = `Pergaminho de Presença resgatado! Total: ${res.total}/${res.max} faltas abonadas no semestre.`;
                } else if (itemId === 'extra_point') {
                    msg = `Cristal de Ascensão resgatado! Total: +${res.total}/${res.max} pontos extras acumulados.`;
                } else if (itemId === 'streak_freeze') {
                    msg = `Escudo de Ofensiva ativado! Você possui ${res.freezes}/2 congelamentos estocados.`;
                }

                this.ui.showToast(msg, 'success');
            }
        } catch (err) {
            if (window.soundFX && typeof window.soundFX.playError === 'function') {
                window.soundFX.playError();
            }
            this.ui.showToast(err.message || 'Erro ao resgatar item.', 'error');
        }
    }

    // ─── O ABISMO DO CÓDIGO (CONTROLLERS) ───
    openAbyssScreen() {
        this.ui.showScreen('abyss');
        this.ui.renderAbyssScreen();
        this.startAbyssCountdownTimer();
    }

    closeAbyssFloorModal() {
        const modal = document.getElementById('modal-abyss-floor');
        if (modal) modal.classList.add('hidden');
    }

    handleAbyssPortalClick(chapterId) {
        const isUnlocked = this.engine.isAbyssFloorUnlocked(chapterId);
        if (!isUnlocked) {
            if (window.soundFX && typeof window.soundFX.playError === 'function') {
                window.soundFX.playError();
            }
            this.ui.showToast(`[ ABISMO ] O Andar ${String(chapterId).padStart(2, '0')} está selado! Conclua o Capítulo ${String(chapterId).padStart(2, '0')} na campanha para desbloquear.`, 'error');
            return;
        }

        this.ui.renderAbyssFloorModal(chapterId);
    }

    startAbyssChamber(chapterId, chamberIdx, isContinuation = false) {
        // Validação Anti-Cheat: Checa se o andar está legitimamente desbloqueado
        if (!this.engine.isAbyssFloorUnlocked(chapterId)) {
            this.ui.showToast(`[ ABISMO ] Acesso Negado! O Andar ${String(chapterId).padStart(2, '0')} está selado.`, 'error');
            this.openAbyssScreen();
            return;
        }

        const quests = (typeof missionsManager !== 'undefined' ? missionsManager.getAbyssFloor(chapterId) : null) || (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) || [];
        const quest = quests[chamberIdx];
        if (!quest) return;

        // Se o andar ainda não foi concluído por completo e o jogador tenta pular para câmara intermediária sem ser continuação, força início na câmara 0
        const floorProg = this.engine.getAbyssFloorProgress(chapterId);
        if (!floorProg.isAllDone && chamberIdx > 0 && !isContinuation && !this._abyssFloorRun) {
            this.ui.showToast(`[ ABISMO ] O Andar ${String(chapterId).padStart(2, '0')} deve ser conquistado sequencialmente. Iniciando na Câmara 1...`, 'info');
            chamberIdx = 0;
            return this.startAbyssChamber(chapterId, 0, false);
        }

        this.closeAbyssFloorModal();
        this.currentAbyssChamber = { chapterId, chamberIdx, quest };
        this.activityContext = {
            mode: 'abyss',
            chapterId,
            chamberIdx,
            data: quest
        };

        // Inicia ou mantém a corrida contínua do andar
        if (!isContinuation || !this._abyssFloorRun || this._abyssFloorRun.chapterId !== chapterId) {
            // Tempo total do Andar: 15 minutos (900s) + bônus de avatar
            let totalFloorSeconds = 900;
            if (typeof getAvatarSkillBonus === 'function') {
                const extraTime = getAvatarSkillBonus('abyss_time_bonus');
                if (extraTime > 0) totalFloorSeconds += extraTime;
            }
            this._abyssFloorRun = {
                chapterId,
                remainingSeconds: totalFloorSeconds,
                startedChamberIdx: chamberIdx
            };
        }

        // Prepara a tela de atividade para execução da câmara
        this.ui.showScreen('activity');
        this.setupAbyssActivityUI(quest, chapterId, chamberIdx);
    }

    setupAbyssActivityUI(quest, chapterId, chamberIdx) {
        this.activityContext = {
            mode: 'abyss',
            chapterId,
            chamberIdx,
            data: quest
        };
        document.getElementById('activity-title-display').textContent = `ANDAR ${String(chapterId).padStart(2, '0')} — ${quest.title.toUpperCase()}`;
        const diffBadge = document.getElementById('activity-difficulty');
        if (diffBadge) {
            diffBadge.textContent = quest.difficulty === 'easy' ? 'FÁCIL' : 'MÉDIO';
            diffBadge.className = `difficulty-badge ${quest.difficulty === 'easy' ? 'easy' : 'medium'}`;
        }

        // Cronômetro contínuo do Andar do Abismo
        const timerContainer = document.getElementById('activity-abyss-timer');
        const timerText = document.getElementById('activity-abyss-countdown-text');
        if (this._abyssActivityInterval) clearInterval(this._abyssActivityInterval);

        if (timerContainer && timerText && this._abyssFloorRun) {
            timerContainer.classList.remove('hidden');

            const updateTimerDisplay = () => {
                const secsLeft = this._abyssFloorRun ? this._abyssFloorRun.remainingSeconds : 0;
                const mins = Math.floor(secsLeft / 60);
                const secs = secsLeft % 60;
                timerText.textContent = `TEMPO DO ANDAR: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                if (secsLeft <= 90) {
                    timerContainer.style.borderColor = 'var(--red)';
                    timerContainer.style.color = 'var(--red)';
                } else {
                    timerContainer.style.borderColor = 'var(--purple-bright)';
                    timerContainer.style.color = 'var(--purple-bright)';
                }
            };
            
            updateTimerDisplay();
            this._abyssActivityInterval = setInterval(() => {
                if (!this._abyssFloorRun) return;
                this._abyssFloorRun.remainingSeconds--;
                if (this._abyssFloorRun.remainingSeconds <= 0) {
                    clearInterval(this._abyssActivityInterval);
                    this._abyssActivityInterval = null;
                    this._abyssFloorRun = null;
                    timerText.textContent = `TEMPO ESGOTADO!`;
                    this.showAbyssTimeoutModal();
                } else {
                    updateTimerDisplay();
                }
            }, 1000);
        }

        const backLabel = document.getElementById('btn-back-activity-label');
        if (backLabel) backLabel.textContent = 'ABISMO';

        // Monta o bloco didático de Saída Esperada no Abismo
        let abyssExpectedHtml = '';
        if (quest.tests && quest.tests.length > 0) {
            const hasMultipleLines = quest.tests.some(t => String(t.expected).includes('\n'));
            const isSingleLine = !hasMultipleLines;

            const testExamplesHtml = quest.tests.map((t, idx) => {
                const isMultilineOutput = String(t.expected).includes('\n');
                const lineCount = String(t.expected).split('\n').length;
                const lineAdvice = isMultilineOutput 
                    ? `Saída em <strong>${lineCount} linhas separadas</strong> (use <code>\\n</code> ao final de cada linha)` 
                    : `Saída na <strong>mesma linha</strong>`;

                return `
                    <div class="expected-test-item">
                        <div class="expected-test-meta">
                            <span><strong style="color:var(--cyan);">Câmara Caso ${idx + 1}:</strong> ${t.description || ''}</span>
                            ${t.input ? `<span>Entrada: <code style="color:#fff;background:rgba(255,255,255,0.08);padding:0.1rem 0.3rem;border-radius:3px;">${t.input}</code></span>` : '<span style="color:var(--text-dim);">(sem entrada)</span>'}
                        </div>
                        <div style="font-size:0.68rem;color:var(--text-secondary);margin-bottom:0.2rem;">
                            📌 ${lineAdvice}:
                        </div>
                        <pre class="expected-preview-pre">${t.expected}</pre>
                    </div>
                `;
            }).join('');

            abyssExpectedHtml = `
                <div class="expected-output-box" style="border-left-color:var(--purple-bright);">
                    <div class="expected-output-header">
                        <div class="expected-output-title" style="color:var(--purple-bright);">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            SAÍDA EXATA EXIGIDA PELO ABISMO
                        </div>
                        <span class="expected-output-badge ${isSingleLine ? 'singleline' : 'multiline'}">
                            ${isSingleLine ? '➔ MESMA LINHA' : '↵ LINHAS SEPARADAS (\\n)'}
                        </span>
                    </div>
                    <div class="expected-tests-list">
                        ${testExamplesHtml}
                    </div>
                    <div class="expected-format-note">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span><strong>Atenção:</strong> Respeite letras maiúsculas/minúsculas, pontuação e quebras de linha (<code>\\n</code>).</span>
                    </div>
                </div>
            `;
        }

        const probSection = document.getElementById('problem-section');
        if (probSection) {
            probSection.innerHTML = `
                <div class="problem-statement">
                    <div class="step-indicator abyss" style="color:var(--purple-bright);border-color:var(--purple-bright);padding:0.2rem 0.6rem;border:1px solid var(--purple-bright);display:inline-block;border-radius:3px;font-size:0.75rem;font-weight:700;">CÂMARA ${chamberIdx + 1} — DESAFIO DO ABISMO</div>
                    <div class="problem-title" style="margin-top:0.6rem;font-size:1.15rem;font-weight:700;color:var(--text-primary);">${quest.title}</div>
                    <p style="color:var(--text-secondary);margin:0.8rem 0;line-height:1.6;font-size:0.88rem;">${quest.description}</p>
                    ${abyssExpectedHtml}
                </div>
            `;
        }

        // Setup e Reset do Editor com o código inicial exclusivo do desafio do Abismo
        const editor = document.getElementById('activity-editor');
        if (editor) {
            editor.value = quest.starterCode || '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}';
            this.ui.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
        }

        // Reset dos terminais e Renderização das Dicas específicas da Câmara do Abismo
        document.getElementById('activity-terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Desafio do Abismo carregado. Digite seu código e clique em Executar ou Submeter.</div>';
        document.getElementById('activity-test-results').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Clique em "Submeter" para validar todos os casos de teste da Câmara.</div>';
        this.ui.hintLevel = 0;
        this.ui.renderHints(quest);
        this.ui.setupTerminalTabs();
        this.ui.setupNotepad();

        // Botão Reset específico da Câmara
        const resetBtn = document.getElementById('btn-reset-activity');
        if (resetBtn) {
            resetBtn.onclick = () => {
                if (editor) {
                    editor.value = quest.starterCode || '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}';
                    this.ui.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
                }
            };
        }

        // Override botão voltar para retornar ao Abismo
        const backBtn = document.getElementById('btn-back-chapter');
        if (backBtn) {
            backBtn.onclick = () => {
                if (this._abyssActivityInterval) clearInterval(this._abyssActivityInterval);
                this.openAbyssScreen();
            };
        }

        // Override botão submeter para validar a Câmara do Abismo
        const submitBtn = document.getElementById('btn-submit-activity');
        if (submitBtn) {
            submitBtn.onclick = () => this.handleSubmitAbyssChamber();
        }
    }

    handleActivitySubmit() {
        const code = document.getElementById('activity-editor').value;
        const passed = this.ui.checkActivity(code);
        if (passed) {
            if (window.soundFX) window.soundFX.playCheckCodeSuccess();
            const ch = this.ui.currentChapterData;
            const actIdx = this.engine.state.currentActivity;
            const wasAlreadyCompleted = !!(this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id]['act' + (actIdx + 1)]);
            
            this.engine.completeChapterStep(ch.id, 'act' + (actIdx + 1));
            
            if (!wasAlreadyCompleted) {
                let xpGain = ch.activities[actIdx].difficulty === 'easy' ? 30 : 50;
                let tokenGain = ch.activities[actIdx].difficulty === 'easy' ? 15 : 25;

                // PERKS DE SUBCLASSE
                const currentUser = typeof authManager !== 'undefined' ? authManager.currentUser : null;

                // Hardcoder Overclock: +20% XP quando sem usar dicas (ou se tiver Reviewer Dicas Econômicas)
                if (this.engine.hasSkill('hc_overclock_xp', currentUser)) {
                    const hintsUsed = this.ui.hintLevel || 0;
                    const hasFreeHints = this.engine.hasSkill('rv_free_hints', currentUser);
                    if (hintsUsed === 0 || hasFreeHints) {
                        xpGain = Math.round(xpGain * 1.2);
                    }
                }
                // Hardcoder Legendary Code: +100% Tokens
                if (this.engine.hasSkill('hc_legendary_code', currentUser)) {
                    tokenGain = tokenGain * 2;
                }
                // Reviewer Clean Syntax: +10% Tokens
                if (this.engine.hasSkill('rv_clean_syntax', currentUser)) {
                    tokenGain = Math.round(tokenGain * 1.1);
                }
                // Debugger Rebound: +5 XP bônus se corrigiu erro
                if (this.engine.hasSkill('db_rebound_xp', currentUser)) {
                    xpGain += 5;
                }
                // Reviewer Inspiração da Party: +10% XP e +10% Tokens para a party inteira
                if (this.engine.hasSkill('rv_party_leader', typeof authManager !== 'undefined' ? authManager.currentUser : null) || 
                    (typeof partyManager !== 'undefined' && partyManager.hasPartyBuff('rv_party_leader'))) {
                    xpGain = Math.round(xpGain * 1.1);
                    tokenGain = Math.round(tokenGain * 1.1);
                }

                // ── BÔNUS EXCLUSIVO DO AVATAR ATIVO ──
                if (typeof getAvatarSkillBonus === 'function') {
                    // Gearhead (08): +1 Token flat por missão regular
                    const flatTokens = getAvatarSkillBonus('token_flat');
                    if (flatTokens > 0) tokenGain += flatTokens;

                    // Moon Compiler (07): +15% XP de noite (18h-06h) ou finais de semana
                    const nightBonus = getAvatarSkillBonus('night_xp');
                    if (nightBonus > 0) {
                        const hr = new Date().getHours();
                        const day = new Date().getDay();
                        if (hr >= 18 || hr < 6 || day === 0 || day === 6) {
                            xpGain = Math.round(xpGain * (1 + nightBonus));
                        }
                    }

                    // Fox Coder (09): 15% de chance de duplicar tokens se completou sem dicas
                    const critChance = getAvatarSkillBonus('token_crit_chance');
                    if (critChance > 0 && (this.ui.hintLevel || 0) === 0) {
                        if (Math.random() < critChance) {
                            tokenGain = tokenGain * 2;
                            this.ui.showToast('🦊 [Astúcia da Raposa]: Tokens duplicados!', 'gold');
                        }
                    }

                    // Stack Witch (21): +20% Tokens em ponteiros e structs (Capítulos 09 a 15)
                    const pointersTokenBoost = getAvatarSkillBonus('pointers_token_boost');
                    if (pointersTokenBoost > 0 && ch && ch.id >= 9) {
                        tokenGain = Math.round(tokenGain * (1 + pointersTokenBoost));
                    }
                }

                const leveledUp = this.engine.addXP(xpGain);
                this.engine.addTokens(tokenGain);
                this.ui.showToast(`+${xpGain} XP & +${tokenGain} Tokens!`, 'xp');
                if (leveledUp) {
                    const newLevel = this.engine.getLevel();
                    this.ui.showLevelUpAnimation(newLevel);
                    
                    // Subclasse Debugger Perk: Ofensiva Blindada (db_streak_shield) - concede 1 congelamento a cada 5 níveis
                    if (this.engine.hasSkill('db_streak_shield', currentUser) && newLevel % 5 === 0) {
                        if (!this.engine.state.streak) this.engine.state.streak = { current: 0, best: 0, freezes: 0 };
                        this.engine.state.streak.freezes = (this.engine.state.streak.freezes || 0) + 1;
                        this.ui.showToast('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> [ Ofensiva Blindada ]: Você ganhou +1 Congelamento de Ofensiva!', 'success');
                    }

                    this.checkSubclassAwakening();
                }
                this.engine.incrementStat('activitiesCompleted');
            } else {
                this.ui.showToast('Atividade concluída novamente! (Modo Treino)', 'info');
            }

            // Dispara o avanço seguro da ofensiva diária (Streak)
            this.checkAndAdvanceDailyStreak();
            
            this.engine.saveToCloud();
            const allDone = ch.activities.every((_, idx) =>
                this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id]['act' + (idx + 1)]
            );
            if (allDone && !this.engine.isChapterCompleted(ch.id)) {
                this.engine.addTokens(50); // Bônus por capítulo finalizado
                setTimeout(() => this.completeChapterReward(ch.id), 1000);
            } else {
                setTimeout(() => {
                    this.ui.openChapter(ch.id);
                }, 1200);
            }
        } else {
            if (window.soundFX) window.soundFX.playCheckCodeFail();
        }
    }

    showAbyssTimeoutModal() {
        if (window.soundFX && typeof window.soundFX.playDanger === 'function') {
            window.soundFX.playDanger();
        }
        const modal = document.getElementById('modal-abyss-timeout');
        if (modal) modal.classList.remove('hidden');
    }

    handleAbyssTimeoutRetry() {
        const modal = document.getElementById('modal-abyss-timeout');
        if (modal) modal.classList.add('hidden');
        if (this._abyssActivityInterval) {
            clearInterval(this._abyssActivityInterval);
            this._abyssActivityInterval = null;
        }
        this._abyssFloorRun = null;
        if (this.currentAbyssChamber) {
            const { chapterId } = this.currentAbyssChamber;
            // Reinicia a marcha do andar do zero na Câmara 1
            this.startAbyssChamber(chapterId, 0, false);
        } else {
            this.openAbyssScreen();
        }
    }

    handleAbyssTimeoutExit() {
        const modal = document.getElementById('modal-abyss-timeout');
        if (modal) modal.classList.add('hidden');
        if (this._abyssActivityInterval) {
            clearInterval(this._abyssActivityInterval);
            this._abyssActivityInterval = null;
        }
        this._abyssFloorRun = null;
        this.openAbyssScreen();
    }

    async handleSubmitAbyssChamber() {
        if (!this.currentAbyssChamber) return;
        const { chapterId, chamberIdx, quest } = this.currentAbyssChamber;

        const code = document.getElementById('activity-editor').value;
        const outPanel = document.getElementById('activity-terminal-output');
        const testPanel = document.getElementById('activity-test-results');

        // Alterna e destaca automaticamente a aba Testes ao submeter
        this.ui.switchTerminalTab('tests');
        if (testPanel) testPanel.innerHTML = '';

        let allPassed = false;
        let validation = null;

        if (this.ui.missionValidator) {
            validation = this.ui.missionValidator.validateActivity(code, quest);
            allPassed = validation.pass;

            if (testPanel) {
                validation.testResults.forEach((t, idx) => {
                    const el = document.createElement('div');
                    el.className = `test-case ${t.pass ? 'pass' : 'fail'}`;
                    el.innerHTML = `
                        <span class="test-icon">${t.pass ? '[PASS]' : '[FAIL]'}</span>
                        <span>${t.description}</span>
                        <span class="test-detail">${idx + 1}/${validation.testResults.length}</span>
                    `;
                    testPanel.appendChild(el);
                });

                const summary = document.createElement('div');
                const passedCount = validation.testResults.filter(r => r.pass).length;
                summary.className = `test-summary ${allPassed ? 'pass' : 'fail'}`;
                summary.textContent = `Resultado: ${passedCount}/${validation.testResults.length} — ${allPassed ? 'APROVADO' : 'REPROVADO'}`;
                testPanel.appendChild(summary);

                if (!allPassed && validation.errors.length > 0) {
                    validation.errors.forEach(msg => {
                        const el = document.createElement('div');
                        el.className = 'terminal-line error';
                        el.textContent = `[ FALHA ] ${msg}`;
                        testPanel.appendChild(el);
                    });
                }
            }
        } else {
            // Fallback
            const defaultInput = (quest.tests && quest.tests.length > 0) ? (quest.tests[0].input || '') : '';
            const initialExec = this.ui.interpreter.execute(code, defaultInput);
            const norm = s => (s || '').split('\n').map(l => l.trim()).filter(Boolean).join('\n');
            allPassed = quest.tests && quest.tests.length > 0 ? norm(initialExec.output).includes(norm(quest.tests[0].expected)) : true;
        }

        if (allPassed) {
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }

            let xpGained = quest.xp || (quest.difficulty === 'easy' ? 20 : 35);
            let tokensGained = quest.difficulty === 'easy' ? 10 : 15;

            // Buff da Party / Reviewer T3 (Inspiração da Party)
            if (this.engine.hasSkill('rv_party_leader', typeof authManager !== 'undefined' ? authManager.currentUser : null) || 
                (typeof partyManager !== 'undefined' && partyManager.hasPartyBuff('rv_party_leader'))) {
                xpGained = Math.round(xpGained * 1.1);
                tokensGained = Math.round(tokensGained * 1.1);
            }

            // Conclui câmara no engine (somente concede XP e Tokens se for a primeira vez completada)
            const res = this.engine.completeAbyssChamber(quest.id, xpGained, tokensGained);
            await this.engine.saveToCloud();

            const successMsg = document.createElement('div');
            successMsg.className = 'terminal-line success';
            successMsg.style.marginTop = '0.5rem';
            if (res.firstTime) {
                successMsg.textContent = `[ SUCESSO ] Câmara ${chamberIdx + 1} superada com perfeição! +${res.xpGained} XP • +${res.tokensGained} Tokens`;
                this.ui.showToast(`CÂMARA CONCLUÍDA! +${res.xpGained} XP • +${res.tokensGained} Tokens`, 'success');
            } else {
                successMsg.textContent = `[ SUCESSO ] Câmara ${chamberIdx + 1} superada! (Recompensas desta câmara já foram obtidas na 1ª conclusão).`;
                this.ui.showToast(`CÂMARA SUPERADA!`, 'info');
            }
            if (testPanel) testPanel.appendChild(successMsg);
            
            // Verifica se completou todas as 5 câmaras do andar
            const prog = this.engine.getAbyssFloorProgress(chapterId);
            if (prog.isAllDone && !prog.claimed) {
                if (this._abyssActivityInterval) {
                    clearInterval(this._abyssActivityInterval);
                    this._abyssActivityInterval = null;
                }
                this._abyssFloorRun = null;
                setTimeout(() => {
                    this.ui.showToast(`★ TODAS AS 5 CÂMARAS DO ANDAR ${String(chapterId).padStart(2, '0')} CONCLUÍDAS! O Baú do Andar está disponível!`, 'success');
                }, 1200);
            }

            // Exibe o modal de avanço da câmara após pequeno delay
            setTimeout(() => {
                this.showAbyssSuccessModal(chapterId, chamberIdx, res);
            }, 800);
        } else {
            if (window.soundFX && typeof window.soundFX.playCheckCodeFail === 'function') {
                window.soundFX.playCheckCodeFail();
            }
            this.ui.showToast('Testes não passaram. Ajuste o código e tente novamente.', 'error');
        }
    }

    showAbyssSuccessModal(chapterId, chamberIdx, res) {
        const modal = document.getElementById('modal-abyss-success');
        if (!modal) return;

        const titleEl = document.getElementById('modal-abyss-success-title');
        const descEl = document.getElementById('modal-abyss-success-desc');
        const rewardsEl = document.getElementById('modal-abyss-success-rewards');
        const prevBtn = document.getElementById('btn-abyss-prev-chamber');
        const nextBtn = document.getElementById('btn-abyss-next-chamber');

        const quests = (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) 
            ? SIDE_QUESTS[chapterId] 
            : (typeof SIDEQUESTS !== 'undefined' ? (SIDEQUESTS[chapterId] || []) : []);

        const nextIdx = chamberIdx + 1;
        const prevIdx = chamberIdx - 1;
        const hasNext = nextIdx < quests.length;
        const hasPrev = prevIdx >= 0;

        if (titleEl) titleEl.textContent = `CÂMARA ${chamberIdx + 1} SUPERADA!`;
        if (descEl) {
            descEl.innerHTML = hasNext
                ? `Você superou a Câmara ${chamberIdx + 1} do Andar ${String(chapterId).padStart(2, '0')}. O cronômetro contínuo do andar continua rodando. Avance para a <strong>Câmara ${nextIdx + 1}</strong>!`
                : `★ PARABÉNS! Você superou todas as 5 câmaras sequenciais do Andar ${String(chapterId).padStart(2, '0')} dentro do tempo! O Baú de Recompensas do Andar foi liberado!`;
        }

        if (rewardsEl) {
            if (res.firstTime) {
                rewardsEl.innerHTML = `
                    <span class="activity-reward-pill" style="font-size:0.85rem;padding:0.4rem 0.8rem;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        +${res.xpGained} XP
                    </span>
                    <span class="activity-reward-pill" style="font-size:0.85rem;padding:0.4rem 0.8rem;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                        +${res.tokensGained} Tokens
                    </span>
                `;
            } else {
                rewardsEl.innerHTML = `
                    <span class="activity-reward-pill" style="font-size:0.8rem;padding:0.35rem 0.75rem;color:var(--text-dim);">
                        Recompensas de câmara já resgatadas na primeira vitória.
                    </span>
                `;
            }
        }

        if (prevBtn) {
            if (hasPrev) {
                prevBtn.style.display = '';
                prevBtn.innerHTML = `<span class="btn-text">◀ Câmara ${prevIdx + 1}</span>`;
            } else {
                prevBtn.style.display = 'none';
            }
        }

        if (nextBtn) {
            if (hasNext) {
                nextBtn.style.display = '';
                nextBtn.innerHTML = `<span class="btn-text">Marchar para Câmara ${nextIdx + 1} ➔</span><span class="btn-glow"></span>`;
            } else {
                nextBtn.style.display = '';
                nextBtn.innerHTML = `<span class="btn-text">Ver Baú do Andar ★</span><span class="btn-glow"></span>`;
            }
        }

        modal.classList.remove('hidden');
    }

    handleAbyssNextChamber() {
        const modal = document.getElementById('modal-abyss-success');
        if (modal) modal.classList.add('hidden');

        if (!this.currentAbyssChamber) {
            this.openAbyssScreen();
            return;
        }

        const { chapterId, chamberIdx } = this.currentAbyssChamber;
        const quests = (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) 
            ? SIDE_QUESTS[chapterId] 
            : (typeof SIDEQUESTS !== 'undefined' ? (SIDEQUESTS[chapterId] || []) : []);
        const nextIdx = chamberIdx + 1;

        if (nextIdx < quests.length) {
            // Continua a marcha sequencial mantendo o mesmo cronômetro do andar
            this.startAbyssChamber(chapterId, nextIdx, true);
        } else {
            this._abyssFloorRun = null;
            if (this._abyssActivityInterval) {
                clearInterval(this._abyssActivityInterval);
                this._abyssActivityInterval = null;
            }
            this.openAbyssScreen();
            this.ui.renderAbyssFloorModal(chapterId);
        }
    }

    handleAbyssPrevChamber() {
        const modal = document.getElementById('modal-abyss-success');
        if (modal) modal.classList.add('hidden');

        if (!this.currentAbyssChamber) {
            this.openAbyssScreen();
            return;
        }

        const { chapterId, chamberIdx } = this.currentAbyssChamber;
        const prevIdx = chamberIdx - 1;

        if (prevIdx >= 0) {
            this.startAbyssChamber(chapterId, prevIdx, true);
        } else {
            this.openAbyssScreen();
        }
    }

    handleAbyssSuccessReturn() {
        const modal = document.getElementById('modal-abyss-success');
        if (modal) modal.classList.add('hidden');
        if (this._abyssActivityInterval) {
            clearInterval(this._abyssActivityInterval);
            this._abyssActivityInterval = null;
        }
        this._abyssFloorRun = null;
        this.openAbyssScreen();
    }

    async handleClaimAbyssReward(chapterId) {
        try {
            const res = this.engine.claimAbyssFloorReward(chapterId);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }

            await this.engine.saveToCloud();
            this.ui.renderAbyssFloorModal(chapterId);
            this.ui.renderAbyssScreen();

            this.ui.showToast(`BAÚ DO ANDAR ${String(chapterId).padStart(2, '0')} RESGATADO! +${res.bonusXP} XP • +${res.bonusTokens} Tokens • +${res.bonusRenome} Renome!`, 'success');
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao resgatar baú.', 'error');
        }
    }

    startAbyssCountdownTimer() {
        const timerEl = document.getElementById('abyss-countdown-text');
        if (!timerEl) return;

        // Ciclo quinzenal de 15 dias baseado na data atual
        const now = new Date();
        const cycleDays = 15;
        const daysIntoYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const daysRemaining = cycleDays - (daysIntoYear % cycleDays);
        const hoursRemaining = 23 - now.getHours();
        const minsRemaining = 59 - now.getMinutes();

        timerEl.textContent = `TEMPORADA: ${daysRemaining}D ${String(hoursRemaining).padStart(2, '0')}H ${String(minsRemaining).padStart(2, '0')}M`;
    }

    // Registra atividade do aluno para manter e avançar a Ofensiva (Streak)
    checkAndAdvanceDailyStreak() {
        const res = this.engine.updateDailyStreak();
        if (res.updated) {
            this.engine.saveToCloud();
            this.ui.renderDashboard();
            if (res.protectedByFreeze) {
                this.ui.showToast('Seu Escudo de Ofensiva protegeu seu Streak Diário!', 'info');
            } else if (res.reset) {
                this.ui.showToast(`Ofensiva Diária iniciada! +${res.bonusTokens} Tokens recebidos!`, 'success');
            } else {
                this.ui.showToast(`OFENSIVA DE ${res.streak} DIAS! +${res.bonusTokens} Tokens de bônus!`, 'success');
            }
        }
    }

    // ─── SUBCLASSES & SKILL TREE (NÍVEL 5+) ───
    checkSubclassAwakening() {
        const isTeacher = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        if (isTeacher) {
            if (this.engine.state.subclass !== 'cheatcode') {
                this.engine.chooseSubclass('cheatcode', authManager.currentUser);
                this.engine.saveToCloud();
            }
            return;
        }

        const level = this.engine.state.level || 1;
        const subclass = this.engine.state.subclass;

        if (level >= 5 && !subclass) {
            this.selectedSubclassAwakening = 'hardcoder';
            this.expandedSubclassAwakening = 'hardcoder';
            this.ui.renderSubclassAwakeningModal(this.selectedSubclassAwakening, this.expandedSubclassAwakening);
        }
    }

    selectSubclassAwakening(subclassId) {
        this.selectedSubclassAwakening = subclassId;
        this.expandedSubclassAwakening = subclassId;
        if (window.soundFX && typeof window.soundFX.playClick === 'function') {
            window.soundFX.playClick();
        }
        this.ui.renderSubclassAwakeningModal(this.selectedSubclassAwakening, this.expandedSubclassAwakening);
    }

    toggleSubclassSkillsExpand(subclassId) {
        if (this.expandedSubclassAwakening === subclassId) {
            this.expandedSubclassAwakening = null; // Recolhe se já estiver aberto
        } else {
            this.expandedSubclassAwakening = subclassId;
        }
        if (window.soundFX && typeof window.soundFX.playClick === 'function') {
            window.soundFX.playClick();
        }
        this.ui.renderSubclassAwakeningModal(this.selectedSubclassAwakening || 'hardcoder', this.expandedSubclassAwakening);
    }

    async confirmSubclassChoice() {
        const subclassId = this.selectedSubclassAwakening || 'hardcoder';
        const res = this.engine.chooseSubclass(subclassId, typeof authManager !== 'undefined' ? authManager.currentUser : null);

        if (res.success) {
            await this.engine.saveToCloud();
            const modal = document.getElementById('modal-subclass-awakening');
            if (modal) modal.classList.add('hidden');

            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }

            const sc = res.subclass;
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> DESPERTAR CONCLUÍDO! Você agora é um ${sc.name.toUpperCase()} (${sc.title})!`, 'success');
            this.ui.renderDashboard();
        } else {
            this.ui.showToast(res.reason || 'Não foi possível selecionar a subclasse.', 'error');
        }
    }

    openSkillTreeModal() {
        const state = this.engine.state;
        const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
        const isTeacher = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());

        if (isTeacher) {
            this.engine.state.subclass = 'cheatcode';
        }

        if (!isTeacher && (!state.subclass || (state.level || 1) < 5)) {
            if ((state.level || 1) >= 5 && !state.subclass) {
                this.checkSubclassAwakening();
                return;
            }
            this.ui.showToast('A Árvore de Habilidades é liberada a partir do Nível 5!', 'info');
            return;
        }

        this.ui.renderSkillTreeModal(this.engine.state, user);
    }

    closeSkillTreeModal() {
        const modal = document.getElementById('modal-skill-tree');
        if (modal) modal.classList.add('hidden');
    }

    async handleUnlockSkill(skillId) {
        const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
        const res = this.engine.unlockSkill(skillId, user);

        if (res.success) {
            await this.engine.saveToCloud();
            this.ui.renderSkillTreeModal(this.engine.state, user);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.ui.showToast(`✦ Habilidade "${res.skill.name}" Desbloqueada!`, 'success');
        } else {
            this.ui.showToast(res.reason || 'Não foi possível desbloquear a habilidade.', 'error');
        }
    }

    // ─── PARTY SYSTEM (ESQUADRÃO DE 4 INTEGRANTES) ───
    async openPartyScreen() {
        if (typeof partyManager === 'undefined') {
            this.ui.showToast('Sistema de Party não inicializado.', 'error');
            return;
        }

        this.ui.showScreen('party');
        const container = document.getElementById('party-content');
        if (container) {
            container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:4rem;"><div class="spinner"></div></div>';
        }

        try {
            if (typeof authManager !== 'undefined' && !authManager.userData && authManager.currentUser) {
                await authManager.loadUserData();
            }

            const classCode = await authManager.getEffectiveGuildCode();
            const party = await partyManager.getUserParty(true);
            const invites = await partyManager.getPendingInvitesForUser();
            const guildParties = await partyManager.getGuildParties(classCode);

            // Inicia o listener de atualizações em tempo real
            if (party && party.id) {
                partyManager.startPartyListener(party.id, (updatedParty) => {
                    if (this.ui.currentScreen === 'party') {
                        this.ui.renderPartyScreen(updatedParty, invites, guildParties);
                    }
                });
            } else {
                partyManager.stopPartyListener();
            }

            this.ui.renderPartyScreen(party, invites, guildParties);
        } catch (e) {
            console.warn('[Party] Erro ao carregar tela de Party:', e);
            this.ui.renderPartyScreen(null, [], []);
        }
    }

    async handleCreateParty() {
        const input = document.getElementById('input-create-party-name');
        const name = input ? input.value.trim() : '';

        try {
            const party = await partyManager.createParty(name);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Party "${party.name}" forjada com sucesso!`, 'success');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao forjar Party.', 'error');
        }
    }

    async handleJoinPartyCode(partyCode) {
        if (!partyCode) {
            this.ui.showToast('Digite o código da Party para ingressar.', 'info');
            return;
        }

        try {
            const party = await partyManager.joinPartyByCode(partyCode);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Você ingressou na Party "${party.name}"!`, 'success');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao ingressar na Party.', 'error');
        }
    }

    async handleLeaveParty() {
        if (!confirm('Deseja realmente sair desta Party?')) return;

        try {
            await partyManager.leaveParty();
            this.ui.showToast('Você saiu da Party.', 'info');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao sair da Party.', 'error');
        }
    }

    async openPartyInviteModal() {
        const modal = document.getElementById('modal-party-invite');
        const listEl = document.getElementById('party-invite-candidates-list');
        if (!modal || !listEl) return;

        listEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;"><div class="spinner"></div></div>';
        modal.classList.remove('hidden');

        try {
            const classCode = await authManager.getEffectiveGuildCode();
            const allMembers = await authManager.getGuildMembers(classCode);
            const myUid = authManager.currentUser?.uid;
            const partyMemberUids = new Set((partyManager.currentParty?.members || []).map(m => m.uid));

            // Filtra colegas que não estão nesta party e não são o próprio usuário
            const candidates = allMembers.filter(m => m.uid !== myUid && !partyMemberUids.has(m.uid));
            this.ui.renderPartyInviteModal(candidates);
        } catch (e) {
            console.warn('[Party] Erro ao carregar candidatos para convite:', e);
            this.ui.renderPartyInviteModal([]);
        }
    }

    closePartyInviteModal() {
        const modal = document.getElementById('modal-party-invite');
        if (modal) modal.classList.add('hidden');
    }

    async handleInvitePartyMember(targetUid, targetName) {
        try {
            await partyManager.invitePlayer(targetUid, targetName);
            this.closePartyInviteModal();
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Convite de Party enviado para ${targetName}!`, 'success');
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao enviar convite.', 'error');
        }
    }

    async handleAcceptPartyInvite(partyCode) {
        try {
            const party = await partyManager.acceptInvite(partyCode);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Convite aceito! Bem-vindo à Party "${party.name}"!`, 'success');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao aceitar convite.', 'error');
        }
    }

    async handleDeclinePartyInvite(partyCode) {
        try {
            await partyManager.declineInvite(partyCode);
            this.ui.showToast('Convite recusado.', 'info');
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao recusar convite.', 'error');
        }
    }

    async handleKickPartyMember(targetUid, targetName) {
        if (!confirm(`Deseja realmente expulsar ${targetName} da Party?`)) return;

        try {
            await partyManager.kickMember(targetUid);
            this.ui.showToast(`${targetName} foi removido da Party.`, 'info');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao expulsar integrante.', 'error');
        }
    }

    openGachaModal() {
        if (window.gachaUI) {
            window.gachaUI.openGachaModal();
        }
    }

}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GuildCodeApp();
    window.app = app;
    app.init();
});
